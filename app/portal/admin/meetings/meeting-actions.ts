'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import {
  computeAttendance,
  parseExpectedAttendees,
  parseIstDateTimeLocal,
  planImport,
  resolveExpectedList,
  type ComputedRow,
  type ExpectedAttendeeInput,
} from '@/lib/meeting-attendance'

// ─── Admin guard ────────────────────────────────────────────────────────────
// Same defence-in-depth idea as audit §10: the RLS policies on meetings /
// meeting_attendance are the backstop, and the action itself checks the
// caller is an admin first. ADMIN is accepted from EITHER role system
// because the live DB still carries both (audit §7.5) — roles[] is the
// future-proof half; drop the `role` half once the clean backend removes
// the single `role` column.
async function requireAdmin(): Promise<
  | { service: ReturnType<typeof createServiceClient>; userId: string }
  | { error: string }
> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  const service = createServiceClient()

  // Try roles[] first; fall back to the single role column if roles is
  // not in the live schema yet (same fallback pattern as the team page).
  let { data: profile, error } = await service
    .from('users')
    .select('role, roles')
    .eq('id', user.id)
    .single()
  if (error && /roles/.test(error.message)) {
    const fallback = await service.from('users').select('role').eq('id', user.id).single()
    profile = fallback.data as typeof profile
    error = fallback.error
  }
  if (error || !profile) return { error: 'Could not load your profile.' }
  const roles = (profile as { roles?: string[] | null }).roles ?? []
  const isAdmin = roles.includes('ADMIN') || (profile as { role?: string | null }).role === 'ADMIN'
  if (!isAdmin) return { error: 'Admin access required.' }
  return { service, userId: user.id }
}

// Row shape the client sends after parsing + previewing the CSV.
// Flags are NOT trusted from the client — they are recomputed here.
export type ImportRowInput = {
  name: string
  email: string
  firstJoin: string | null // ISO string
  lastLeave: string | null // ISO string
  totalMinutes: number | null
}

/** One ComputedRow as a meeting_attendance insert/update. is_absent is
 *  set by the caller: false for real CSV rows, true for Absent rows. */
function attendanceDbRow(meetingId: string, r: ComputedRow, isAbsent: boolean) {
  return {
    meeting_id: meetingId,
    name: r.name,
    email: r.email,
    first_join: r.firstJoin ? r.firstJoin.toISOString() : null,
    last_leave: r.lastLeave ? r.lastLeave.toISOString() : null,
    total_minutes: r.totalMinutes,
    is_late: r.isLate,
    left_early: r.leftEarly,
    minutes_late: r.minutesLate,
    is_absent: isAbsent,
  }
}

// ─── Create a meeting ───────────────────────────────────────────────────────
export async function createMeeting(formData: FormData): Promise<{ error?: string }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { service, userId } = guard

  const title = (formData.get('title') as string)?.trim()
  const startRaw = (formData.get('scheduled_start') as string) ?? ''
  const endRaw = (formData.get('scheduled_end') as string) ?? ''
  const meetLink = (formData.get('meet_link') as string)?.trim() || null
  // Optional expected-attendees list, one per line ("Name <email>" or a
  // bare email). Empty is fine — an empty textarea means "use the saved
  // default roster" (resolveExpectedList), and no typed list + no
  // defaults means the meeting behaves exactly as before. Parsed
  // server-side; lines without an email are skipped.
  const typedExpected = parseExpectedAttendees((formData.get('expected_attendees') as string) ?? '')

  if (!title) return { error: 'Title is required.' }
  const scheduledStart = parseIstDateTimeLocal(startRaw)
  const scheduledEnd = parseIstDateTimeLocal(endRaw)
  if (!scheduledStart || !scheduledEnd) {
    return { error: 'Pick a valid start and end time.' }
  }
  if (scheduledEnd <= scheduledStart) {
    return { error: 'End time must be after start time.' }
  }
  if (meetLink) {
    try {
      const url = new URL(meetLink)
      if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('bad protocol')
    } catch {
      return { error: 'Meet link must be a valid URL.' }
    }
  }

  const { data: created, error } = await service.from('meetings').insert({
    title,
    scheduled_start: scheduledStart.toISOString(),
    scheduled_end: scheduledEnd.toISOString(),
    meet_link: meetLink,
    created_by: userId,
  }).select('id').single()
  if (error) {
    // Tables missing = the SQL file has not been run yet.
    if (/relation .* does not exist|Could not find the table/i.test(error.message)) {
      return { error: 'Meetings tables are not in the database yet — run supabase/add-meeting-attendance.sql in the Supabase SQL Editor first.' }
    }
    return { error: error.message }
  }
  if (!created) return { error: 'Could not create the meeting.' }

  // Resolve the expected list: the typed list wins when given,
  // otherwise the saved default roster is copied in. Both empty →
  // no expected list, meeting behaves exactly as before.
  const defaults = typedExpected.length === 0 ? await loadDefaultExpected(service) : []
  const expected = resolveExpectedList(typedExpected, defaults)
  const fromDefaults = typedExpected.length === 0 && expected.length > 0

  if (expected.length > 0) {
    const { error: expectedError } = await service.from('meeting_expected_attendees').insert(
      expected.map((p) => ({
        meeting_id: created.id as string,
        email: p.email,
        full_name: p.full_name,
        from_defaults: fromDefaults,
      })),
    )
    if (expectedError) {
      // The meeting itself is created — the admin can add the expected
      // people on the meeting page once the SQL is run. Say so plainly
      // instead of pretending the whole create failed.
      if (/relation .* does not exist|Could not find the table/i.test(expectedError.message)) {
        return {
          error: fromDefaults
            ? 'Meeting created, but the default list could not be copied — run supabase/add-meeting-expected-attendees.sql in the Supabase SQL Editor first, then add the expected people on the meeting page.'
            : 'Meeting created, but the expected-attendees list could not be saved — run supabase/add-meeting-expected-attendees.sql in the Supabase SQL Editor first, then add the expected people on the meeting page.',
        }
      }
      return { error: expectedError.message }
    }
  }

  revalidatePath('/portal/admin/meetings')
  return {}
}

// ─── Expected attendees (the Absent feature) ────────────────────────────────

// ─── Default roster (saved once, copied into every new meeting) ────────────

/** Read the saved default roster. Returns [] — never an error — when
 *  the defaults table does not exist yet (SQL not run): the meeting
 *  must still be created, just with no expected list. Used by
 *  createMeeting and by getDefaultExpected below. */
async function loadDefaultExpected(
  service: ReturnType<typeof createServiceClient>,
): Promise<ExpectedAttendeeInput[]> {
  const { data, error } = await service
    .from('meeting_expected_defaults')
    .select('email, full_name')
    .order('email', { ascending: true })
  if (error || !data) return []
  return data.map((d) => ({
    email: (d.email as string).toLowerCase(),
    full_name: (d.full_name as string | null) ?? null,
  }))
}

export async function getDefaultExpected(): Promise<{
  defaults?: ExpectedAttendeeInput[]
  error?: string
}> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  return { defaults: await loadDefaultExpected(guard.service) }
}

// ─── Add one person to the default roster ───────────────────────────────────
// The client parses the one-line form with parseExpectedAttendees and
// passes a single email + name; this re-validates (plain error string,
// never throws) and dedupes by lowercase email. Removing a default
// never touches meetings already scheduled — those hold their own
// copies of the list.
export async function addDefaultExpected(
  input: { email: string; full_name?: string | null },
): Promise<{ error?: string; added?: boolean }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { service } = guard

  const email = (input.email ?? '').trim().toLowerCase()
  const fullName = (input.full_name ?? '').trim() || null
  if (!email || !email.includes('@')) {
    return { error: 'Enter a valid email address.' }
  }

  // Already on the roster? Nothing to do.
  const { data: already } = await service
    .from('meeting_expected_defaults')
    .select('id')
    .eq('email', email)
    .maybeSingle()
  if (already) return { added: false }

  const { error: insertError } = await service.from('meeting_expected_defaults').insert({
    email,
    full_name: fullName,
  })
  if (insertError) {
    if (/relation .* does not exist|Could not find the table/i.test(insertError.message)) {
      return { error: 'Default roster is not in the database yet — run supabase/add-meeting-expected-attendees.sql in the Supabase SQL Editor first.' }
    }
    // Unique-index race: someone added the same email a moment ago.
    if (/duplicate key/i.test(insertError.message)) return { added: false }
    return { error: insertError.message }
  }

  revalidatePath('/portal/admin/meetings')
  return { added: true }
}

// ─── Remove one person from the default roster ──────────────────────────────
// Only the roster row is deleted. Meetings already scheduled keep
// their own copied lists (and their Absent rows) untouched.
export async function removeDefaultExpected(
  email: string,
): Promise<{ error?: string; removed?: boolean }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { service } = guard

  const lowered = (email ?? '').trim().toLowerCase()
  if (!lowered) return { error: 'Email is required.' }

  const { data: deleted, error } = await service
    .from('meeting_expected_defaults')
    .delete()
    .eq('email', lowered)
    .select('id')
  if (error) {
    if (/relation .* does not exist|Could not find the table/i.test(error.message)) {
      return { error: 'Default roster is not in the database yet — run supabase/add-meeting-expected-attendees.sql in the Supabase SQL Editor first.' }
    }
    return { error: error.message }
  }

  revalidatePath('/portal/admin/meetings')
  return { removed: (deleted ?? []).length > 0 }
}

// ─── Add one expected attendee ──────────────────────────────────────────────
// If the CSV was already imported, an Absent row is created for them
// immediately when they have no attendance row — the list stays correct
// without a re-import. If they already attended, nothing is created.
export async function addExpectedAttendee(
  meetingId: string,
  input: { email: string; full_name?: string | null },
): Promise<{ error?: string; createdAbsent?: boolean; absentRowId?: string }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { service } = guard

  const email = (input.email ?? '').trim().toLowerCase()
  const fullName = (input.full_name ?? '').trim() || null
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: 'Enter a valid email address.' }
  }

  const { data: meeting, error: meetingError } = await service
    .from('meetings')
    .select('id')
    .eq('id', meetingId)
    .single()
  if (meetingError || !meeting) return { error: 'Meeting not found.' }

  // Already on the expected list? Nothing to do — any Absent row for
  // them is already there from the first add.
  const { data: already } = await service
    .from('meeting_expected_attendees')
    .select('id')
    .eq('meeting_id', meetingId)
    .eq('email', email)
    .maybeSingle()
  if (already) return {}

  const { error: insertError } = await service.from('meeting_expected_attendees').insert({
    meeting_id: meetingId,
    email,
    full_name: fullName,
  })
  if (insertError) {
    if (/relation .* does not exist|Could not find the table/i.test(insertError.message)) {
      return { error: 'Expected-attendees table is not in the database yet — run supabase/add-meeting-expected-attendees.sql in the Supabase SQL Editor first.' }
    }
    // Unique-index race: someone added the same email a moment ago.
    if (/duplicate key/i.test(insertError.message)) return {}
    return { error: insertError.message }
  }

  // They may already have attended (CSV imported before they were added
  // to the expected list) — then no Absent row. Otherwise create one now.
  const { data: attendance } = await service
    .from('meeting_attendance')
    .select('id, is_absent')
    .eq('meeting_id', meetingId)
    .eq('email', email)
    .maybeSingle()
  if (attendance) return {}

  const { data: absentRow, error: absentError } = await service
    .from('meeting_attendance')
    .insert({
      meeting_id: meetingId,
      name: fullName ?? email,
      email,
      first_join: null,
      last_leave: null,
      total_minutes: 0,
      is_late: false,
      left_early: false,
      minutes_late: 0,
      is_absent: true,
    })
    .select('id')
    .single()
  if (absentError) {
    if (/duplicate key/i.test(absentError.message)) return {}
    return { error: absentError.message }
  }

  revalidatePath(`/portal/admin/meetings/${meetingId}`)
  return { createdAbsent: true, absentRowId: absentRow?.id as string | undefined }
}

// ─── Remove one expected attendee ───────────────────────────────────────────
// Deletes their Absent row if they have one — and ONLY that. A real
// attendance row (is_absent = false) is never touched: someone who
// joined stays in the table even after leaving the expected list.
export async function removeExpectedAttendee(
  meetingId: string,
  email: string,
): Promise<{ error?: string; removedAbsent?: boolean }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { service } = guard

  const lowered = (email ?? '').trim().toLowerCase()
  if (!lowered) return { error: 'Email is required.' }

  const { error: expectedError } = await service
    .from('meeting_expected_attendees')
    .delete()
    .eq('meeting_id', meetingId)
    .eq('email', lowered)
  if (expectedError) return { error: expectedError.message }

  const { data: deleted, error: attendanceError } = await service
    .from('meeting_attendance')
    .delete()
    .eq('meeting_id', meetingId)
    .eq('email', lowered)
    .eq('is_absent', true)
    .select('id')
  if (attendanceError) return { error: attendanceError.message }

  revalidatePath(`/portal/admin/meetings/${meetingId}`)
  return { removedAbsent: (deleted ?? []).length > 0 }
}

// ─── Import attendance rows (idempotent) ────────────────────────────────────
export async function importMeetingAttendance(
  meetingId: string,
  inputRows: ImportRowInput[],
): Promise<{ imported?: number; skipped?: number; absent?: number; error?: string }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { service } = guard

  const { data: meeting, error: meetingError } = await service
    .from('meetings')
    .select('id, scheduled_start, scheduled_end')
    .eq('id', meetingId)
    .single()
  if (meetingError || !meeting) return { error: 'Meeting not found.' }

  const window = {
    scheduledStart: new Date(meeting.scheduled_start as string),
    scheduledEnd: new Date(meeting.scheduled_end as string),
  }

  // Recompute every flag server-side from the raw times.
  const computed: ComputedRow[] = []
  for (const r of inputRows) {
    const name = (r.name ?? '').trim()
    const email = (r.email ?? '').trim().toLowerCase()
    if (!name || !email) continue
    const firstJoin = r.firstJoin ? new Date(r.firstJoin) : null
    const lastLeave = r.lastLeave ? new Date(r.lastLeave) : null
    if ((r.firstJoin && Number.isNaN(firstJoin!.getTime())) || (r.lastLeave && Number.isNaN(lastLeave!.getTime()))) continue
    computed.push(computeAttendance(window, {
      name, email, firstJoin, lastLeave,
      totalMinutes: r.totalMinutes,
    }))
  }
  if (computed.length === 0) return { error: 'No valid rows to import.' }

  // What is already stored, and which of those rows are Absent placeholders.
  // (The unique index on (meeting_id, email) is the second line of
  // defence — a concurrent re-import still cannot duplicate a row.)
  const { data: existing, error: existingError } = await service
    .from('meeting_attendance')
    .select('email, is_absent')
    .eq('meeting_id', meetingId)
  if (existingError) return { error: existingError.message }

  // Expected attendees for this meeting. If the expected-attendees table
  // is not set up yet (new SQL not run), treat it as an empty list
  // instead of failing the import — the CSV import itself must keep
  // working on the old schema.
  const { data: expectedRows, error: expectedError } = await service
    .from('meeting_expected_attendees')
    .select('email, full_name')
    .eq('meeting_id', meetingId)
  const expected: ExpectedAttendeeInput[] = expectedError
    ? []
    : (expectedRows ?? []).map((e) => ({
        email: (e.email as string).toLowerCase(),
        full_name: (e.full_name as string | null) ?? null,
      }))

  const plan = planImport(
    (existing ?? []).map((e) => ({
      email: e.email as string,
      is_absent: (e.is_absent as boolean) ?? false,
    })),
    computed,
    expected,
  )

  if (plan.insert.length > 0) {
    const { error } = await service
      .from('meeting_attendance')
      .insert(plan.insert.map((r) => attendanceDbRow(meetingId, r, false)))
    if (error) return { error: error.message }
  }

  // A CSV row for someone currently marked Absent replaces the
  // placeholder with the real row (upsert on the (meeting_id, email)
  // unique index). Real rows already stored are never rewritten.
  if (plan.replaceAbsent.length > 0) {
    const { error } = await service
      .from('meeting_attendance')
      .upsert(
        plan.replaceAbsent.map((r) => attendanceDbRow(meetingId, r, false)),
        { onConflict: 'meeting_id,email' },
      )
    if (error) return { error: error.message }
  }

  // Expected people missing from the CSV get Absent rows. Idempotent:
  // planImport only lists people with no stored row at all, and the
  // upsert ignores duplicates as a second line of defence.
  let absentCreated = 0
  if (plan.absent.length > 0) {
    const { error } = await service
      .from('meeting_attendance')
      .upsert(
        plan.absent.map((r) => attendanceDbRow(meetingId, r, true)),
        { onConflict: 'meeting_id,email', ignoreDuplicates: true },
      )
    if (error) return { error: error.message }
    absentCreated = plan.absent.length
  }

  revalidatePath('/portal/admin/meetings')
  revalidatePath(`/portal/admin/meetings/${meetingId}`)
  return {
    imported: plan.insert.length + plan.replaceAbsent.length,
    skipped: plan.skipped,
    absent: absentCreated,
  }
}

// ─── Delete a meeting (attendance rows cascade) ─────────────────────────────
export async function deleteMeeting(meetingId: string): Promise<{ error?: string }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { error } = await guard.service.from('meetings').delete().eq('id', meetingId)
  if (error) return { error: error.message }
  revalidatePath('/portal/admin/meetings')
  return {}
}
