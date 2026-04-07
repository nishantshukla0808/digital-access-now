import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, FileText, CalendarDays, BookOpen, Video, Clock } from 'lucide-react'
import { ApprovalsClient } from './approvals-client'

const typeConfig = {
  report: { icon: FileText, color: 'bg-blue-50 text-blue-700 border-blue-200', badge: 'Chapter Report' },
  event: { icon: CalendarDays, color: 'bg-green-50 text-green-700 border-green-200', badge: 'Chapter Event' },
  resource: { icon: BookOpen, color: 'bg-primary-blue/10 text-primary-blue border-primary-blue/20', badge: 'Volunteer Resource' },
  vlog: { icon: Video, color: 'bg-orange-50 text-orange-700 border-orange-200', badge: 'Volunteer Vlog' },
  hours: { icon: Clock, color: 'bg-yellow-50 text-yellow-700 border-yellow-200', badge: 'Hours Log' },
}

export type PendingItem = {
  id: string
  title: string
  type: keyof typeof typeConfig
  table: 'reports' | 'events' | 'resources' | 'vlogs' | 'volunteer_attendance'
  submittedBy: string
  excerpt: string
  date: string
}

export default async function AdminApprovalsPage() {
  const supabase = await createClient()

  // Fetch all pending items across tables in parallel
  const [{ data: reports }, { data: events }, { data: resources }, { data: vlogs }, { data: hours }] = await Promise.all([
    supabase.from('reports').select('id, title, excerpt_description, created_at, chapter_id').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    supabase.from('events').select('id, title, description, created_at, chapter_id').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    supabase.from('resources').select('id, title, description, created_at, volunteer_id, category').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    supabase.from('vlogs').select('id, title, description, video_url, created_at, volunteer_id').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    supabase.from('volunteer_attendance').select('id, activity_description, hours_logged, date, created_at, volunteer_id').eq('status', 'pending').order('created_at', { ascending: false }),
  ])

  // Collect all user IDs to fetch names
  const userIds = new Set<string>()
  reports?.forEach((r) => r.chapter_id && userIds.add(r.chapter_id))
  events?.forEach((e) => e.chapter_id && userIds.add(e.chapter_id))
  resources?.forEach((r) => r.volunteer_id && userIds.add(r.volunteer_id))
  vlogs?.forEach((v) => v.volunteer_id && userIds.add(v.volunteer_id))
  hours?.forEach((h) => h.volunteer_id && userIds.add(h.volunteer_id))

  const { data: users } = await supabase
    .from('users')
    .select('id, custom_id, full_name')
    .in('id', Array.from(userIds))

  const userMap = new Map(users?.map((u) => [u.id, u.custom_id || u.full_name || 'Unknown']) ?? [])

  // Normalize to unified array
  const pending: PendingItem[] = [
    ...(reports ?? []).map((r) => ({
      id: r.id, title: r.title, type: 'report' as const, table: 'reports' as const,
      submittedBy: userMap.get(r.chapter_id ?? '') ?? '—',
      excerpt: r.excerpt_description ?? '—',
      date: r.created_at,
    })),
    ...(events ?? []).map((e) => ({
      id: e.id, title: e.title, type: 'event' as const, table: 'events' as const,
      submittedBy: userMap.get(e.chapter_id ?? '') ?? '—',
      excerpt: e.description ?? '—',
      date: e.created_at,
    })),
    ...(resources ?? []).map((r) => ({
      id: r.id, title: r.title, type: 'resource' as const, table: 'resources' as const,
      submittedBy: userMap.get(r.volunteer_id ?? '') ?? '—',
      excerpt: `${r.category ?? ''} — ${r.description ?? ''}`,
      date: r.created_at,
    })),
    ...(vlogs ?? []).map((v) => ({
      id: v.id, title: v.title, type: 'vlog' as const, table: 'vlogs' as const,
      submittedBy: userMap.get(v.volunteer_id ?? '') ?? '—',
      excerpt: v.video_url ?? v.description ?? '—',
      date: v.created_at,
    })),
    ...(hours ?? []).map((h) => ({
      id: h.id, title: `${h.hours_logged}h logged`, type: 'hours' as const, table: 'volunteer_attendance' as const,
      submittedBy: userMap.get(h.volunteer_id ?? '') ?? '—',
      excerpt: h.activity_description ?? '—',
      date: h.created_at,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/approvals"
      badge="Pending Approvals"
      title="Review & publish chapter and volunteer submissions."
      subtitle="Approved content is immediately published to the public website. Rejected items are removed from the queue."
      navItems={adminNavItems}
    >
      {pending.length === 0 ? (
        <Card className="border-primary-blue/15 bg-white">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle2 className="size-16 text-green-400 mb-4" />
            <p className="text-xl font-black text-gray-950">All caught up!</p>
            <p className="text-gray-500 mt-2">No pending submissions to review.</p>
          </CardContent>
        </Card>
      ) : (
        <ApprovalsClient initialItems={pending} typeConfig={typeConfig} />
      )}
    </PortalShell>
  )
}
