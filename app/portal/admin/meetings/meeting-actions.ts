'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import {
  computeAttendance,
  parseIstDateTimeLocal,
  type ComputedRow,
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

// ─── Create a meeting ───────────────────────────────────────────────────────
export async function createMeeting(formData: FormData): Promise<{ error?: string }> {
  const guard = await requireAdmin()
  if ('error' in guard) return { error: guard.error }
  const { service, userId } = guard

  const title = (formData.get('title') as string)?.trim()
  const startRaw = (formData.get('scheduled_start') as string) ?? ''
  const endRaw = (formData.get('scheduled_end') as string) ?? ''
  const meetLink = (formData.get('meet_link') as string)?.trim() || null

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

  const { error } = await service.from('meetings').insert({
    title,
    scheduled_start: scheduledStart.toISOString(),
    scheduled_end: scheduledEnd.toISOString(),
    meet_link: meetLink,
    created_by: userId,
  })
  if (error) {
    // Tables missing = the SQL file has not been run yet.
    if (/relation .* does not exist|Could not find the table/i.test(error.message)) {
      return { error: 'Meetings tables are not in the database yet — run supabase/add-meeting-attendance.sql in the Supabase SQL Editor first.' }
    }
    return { error: error.message }
  }
  revalidatePath('/portal/admin/meetings')
  return {}
}

// ─── Import attendance rows (idempotent) ────────────────────────────────────
export async function importMeetingAttendance(
  meetingId: string,
  inputRows: ImportRowInput[],
): Promise<{ imported?: number; skipped?: number; error?: string }> {
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

  // Idempotency: rows already in the DB for this meeting are skipped.
  // (The unique index on (meeting_id, email) is the second line of
  // defence — a concurrent re-import still cannot duplicate a row.)
  const { data: existing, error: existingError } = await service
    .from('meeting_attendance')
    .select('email')
    .eq('meeting_id', meetingId)
  if (existingError) return { error: existingError.message }
  const existingEmails = new Set((existing ?? []).map((e) => (e.email as string).toLowerCase()))
  const fresh = computed.filter((r) => !existingEmails.has(r.email))
  const skipped = computed.length - fresh.length
  if (fresh.length === 0) return { imported: 0, skipped }

  const { error } = await service.from('meeting_attendance').insert(
    fresh.map((r) => ({
      meeting_id: meetingId,
      name: r.name,
      email: r.email,
      first_join: r.firstJoin ? r.firstJoin.toISOString() : null,
      last_leave: r.lastLeave ? r.lastLeave.toISOString() : null,
      total_minutes: r.totalMinutes,
      is_late: r.isLate,
      left_early: r.leftEarly,
      minutes_late: r.minutesLate,
    })),
  )
  if (error) return { error: error.message }

  revalidatePath('/portal/admin/meetings')
  revalidatePath(`/portal/admin/meetings/${meetingId}`)
  return { imported: fresh.length, skipped }
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
