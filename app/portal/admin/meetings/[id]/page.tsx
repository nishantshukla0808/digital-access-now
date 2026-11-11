import { createServiceClient } from '@/lib/supabase/service'
import { MeetingClient } from './meeting-client'

// Always read fresh DB data — never serve stale cache
export const dynamic = 'force-dynamic'

export type MeetingDetail = {
  id: string
  title: string
  scheduled_start: string
  scheduled_end: string
  meet_link: string | null
}

export type AttendanceRow = {
  id: string
  name: string
  email: string
  first_join: string | null
  last_leave: string | null
  total_minutes: number
  is_late: boolean
  left_early: boolean
  minutes_late: number
  /** True for an Absent placeholder row (expected, never joined). */
  is_absent: boolean
}

export type ExpectedAttendeeRow = {
  id: string
  email: string
  full_name: string | null
  /** True when this row was copied from the default roster at scheduling. */
  from_defaults: boolean
}

export default async function AdminMeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = createServiceClient()

  // If the meetings tables don't exist yet (SQL file not run), the query
  // errors — show the setup note instead of an error page.
  const { data: meeting, error: meetingError } = await service
    .from('meetings')
    .select('id, title, scheduled_start, scheduled_end, meet_link')
    .eq('id', id)
    .single()

  if (meetingError || !meeting) {
    return (
      <MeetingClient
        meeting={null}
        initialRows={[]}
        initialExpected={[]}
        meetingsReady={false}
        expectedReady={false}
      />
    )
  }

  // is_absent comes from the Absent-feature SQL. If that file has not
  // been run yet the column does not exist — fall back to the old
  // select so the table still renders (everyone shows as attended).
  const { data: rowsWithAbsent } = await service
    .from('meeting_attendance')
    .select('id, name, email, first_join, last_leave, total_minutes, is_late, left_early, minutes_late, is_absent')
    .eq('meeting_id', id)
    .order('first_join', { ascending: true, nullsFirst: false })
  let rows = rowsWithAbsent
  if (!rows) {
    const { data: rowsLegacy } = await service
      .from('meeting_attendance')
      .select('id, name, email, first_join, last_leave, total_minutes, is_late, left_early, minutes_late')
      .eq('meeting_id', id)
      .order('first_join', { ascending: true, nullsFirst: false })
    rows = rowsLegacy as typeof rowsWithAbsent
  }

  // Expected attendees for this meeting. If the expected-attendees
  // table is not set up yet (new SQL not run), the query errors —
  // the page still works with an empty expected list, and the client
  // shows the setup note in the expected-attendees section.
  // from_defaults comes from the same SQL file as the table, so it
  // exists whenever the table does.
  const { data: expectedRows, error: expectedError } = await service
    .from('meeting_expected_attendees')
    .select('id, email, full_name, from_defaults')
    .eq('meeting_id', id)
    .order('email', { ascending: true })

  const detail: MeetingDetail = {
    id: meeting.id as string,
    title: meeting.title as string,
    scheduled_start: meeting.scheduled_start as string,
    scheduled_end: meeting.scheduled_end as string,
    meet_link: (meeting.meet_link as string | null) ?? null,
  }
  const attendance: AttendanceRow[] = (rows ?? []).map((r) => ({
    id: r.id as string,
    name: r.name as string,
    email: r.email as string,
    first_join: (r.first_join as string | null) ?? null,
    last_leave: (r.last_leave as string | null) ?? null,
    total_minutes: (r.total_minutes as number) ?? 0,
    is_late: (r.is_late as boolean) ?? false,
    left_early: (r.left_early as boolean) ?? false,
    minutes_late: (r.minutes_late as number) ?? 0,
    is_absent: (r.is_absent as boolean) ?? false,
  }))
  const expected: ExpectedAttendeeRow[] = (expectedRows ?? []).map((e) => ({
    id: e.id as string,
    email: e.email as string,
    full_name: (e.full_name as string | null) ?? null,
    from_defaults: (e.from_defaults as boolean) ?? false,
  }))

  return (
    <MeetingClient
      meeting={detail}
      initialRows={attendance}
      initialExpected={expected}
      meetingsReady={true}
      expectedReady={!expectedError}
    />
  )
}
