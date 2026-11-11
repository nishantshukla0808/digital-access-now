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
        meetingsReady={false}
      />
    )
  }

  const { data: rows } = await service
    .from('meeting_attendance')
    .select('id, name, email, first_join, last_leave, total_minutes, is_late, left_early, minutes_late')
    .eq('meeting_id', id)
    .order('first_join', { ascending: true, nullsFirst: false })

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
  }))

  return <MeetingClient meeting={detail} initialRows={attendance} meetingsReady={true} />
}
