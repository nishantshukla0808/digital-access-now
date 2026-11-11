import { createServiceClient } from '@/lib/supabase/service'
import type { ExpectedAttendeeInput } from '@/lib/meeting-attendance'
import { MeetingsClient } from './meetings-client'

// Always read fresh DB data — never serve stale cache
export const dynamic = 'force-dynamic'

export type MeetingWithCounts = {
  id: string
  title: string
  scheduled_start: string
  scheduled_end: string
  meet_link: string | null
  created_at: string
  total: number
  late: number
  leftEarly: number
  /** Absent rows (expected but never joined). total includes them, so
   *  "attended" on the list is total - absent. */
  absent: number
}

export default async function AdminMeetingsPage() {
  const service = createServiceClient()

  // If the meetings tables don't exist yet (SQL file not run), the query
  // errors — show the setup note instead of an error page.
  const { data: meetings, error } = await service
    .from('meetings')
    .select('id, title, scheduled_start, scheduled_end, meet_link, created_at')
    .order('scheduled_start', { ascending: false })

  if (error) {
    return <MeetingsClient initialMeetings={[]} meetingsReady={false} initialDefaults={[]} defaultsReady={false} />
  }

  const ids = (meetings ?? []).map((m) => m.id)
  let counts = new Map<string, { total: number; late: number; leftEarly: number; absent: number }>()
  if (ids.length > 0) {
    // is_absent comes from the Absent-feature SQL. If that file has not
    // been run yet the column does not exist — fall back to the old
    // select so the list still shows the real counts (absent = 0).
    const { data: rowsWithAbsent } = await service
      .from('meeting_attendance')
      .select('meeting_id, is_late, left_early, is_absent')
      .in('meeting_id', ids)
    let rows = rowsWithAbsent
    if (!rows) {
      const { data: rowsLegacy } = await service
        .from('meeting_attendance')
        .select('meeting_id, is_late, left_early')
        .in('meeting_id', ids)
      rows = rowsLegacy as typeof rowsWithAbsent
    }
    for (const r of rows ?? []) {
      const c = counts.get(r.meeting_id as string) ?? { total: 0, late: 0, leftEarly: 0, absent: 0 }
      c.total += 1
      if ((r.is_absent as boolean)) c.absent += 1
      if (r.is_late) c.late += 1
      if (r.left_early) c.leftEarly += 1
      counts.set(r.meeting_id as string, c)
    }
  }

  const withCounts: MeetingWithCounts[] = (meetings ?? []).map((m) => ({
    id: m.id as string,
    title: m.title as string,
    scheduled_start: m.scheduled_start as string,
    scheduled_end: m.scheduled_end as string,
    meet_link: (m.meet_link as string | null) ?? null,
    created_at: m.created_at as string,
    total: counts.get(m.id as string)?.total ?? 0,
    late: counts.get(m.id as string)?.late ?? 0,
    leftEarly: counts.get(m.id as string)?.leftEarly ?? 0,
    absent: counts.get(m.id as string)?.absent ?? 0,
  }))

  // The saved default roster (copied into every new meeting unless the
  // admin types a list instead). If the defaults table does not exist
  // yet (SQL not run), the query errors — the page still works with an
  // empty roster, and the client shows the setup note in the defaults
  // section.
  const { data: defaultRows, error: defaultsError } = await service
    .from('meeting_expected_defaults')
    .select('email, full_name')
    .order('email', { ascending: true })
  const defaults: ExpectedAttendeeInput[] = defaultsError
    ? []
    : (defaultRows ?? []).map((d) => ({
        email: (d.email as string).toLowerCase(),
        full_name: (d.full_name as string | null) ?? null,
      }))

  return <MeetingsClient initialMeetings={withCounts} meetingsReady={true} initialDefaults={defaults} defaultsReady={!defaultsError} />
}
