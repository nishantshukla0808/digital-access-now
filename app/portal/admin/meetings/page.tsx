import { createServiceClient } from '@/lib/supabase/service'
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
    return <MeetingsClient initialMeetings={[]} meetingsReady={false} />
  }

  const ids = (meetings ?? []).map((m) => m.id)
  let counts = new Map<string, { total: number; late: number; leftEarly: number }>()
  if (ids.length > 0) {
    const { data: rows } = await service
      .from('meeting_attendance')
      .select('meeting_id, is_late, left_early')
      .in('meeting_id', ids)
    for (const r of rows ?? []) {
      const c = counts.get(r.meeting_id as string) ?? { total: 0, late: 0, leftEarly: 0 }
      c.total += 1
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
  }))

  return <MeetingsClient initialMeetings={withCounts} meetingsReady={true} />
}
