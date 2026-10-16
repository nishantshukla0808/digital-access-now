import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { createServiceClient } from '@/lib/supabase/service'
import { CheckCircle2 } from 'lucide-react'
import { ApprovalsClient } from './approvals-client'

export type PendingItem = {
  id: string
  title: string
  type: 'report' | 'event' | 'resource' | 'vlog' | 'hours'
  table: 'reports' | 'events' | 'resources' | 'vlogs' | 'volunteer_attendance'
  submittedBy: string
  excerpt: string
  date: string
}

export default async function AdminApprovalsPage() {
  const supabase = createServiceClient()

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
      badge="Admin"
      title="Pending Approvals"
      subtitle="Approved content is immediately published. Rejected items are removed from the queue."
      navItems={adminNavItems}
    >
      {pending.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <CheckCircle2 className="size-14 mb-4" style={{ color: '#0F5D5E' }} />
          <p className="text-lg font-bold" style={{ color: '#1F2933' }}>All caught up!</p>
          <p className="text-sm mt-1" style={{ color: '#1F2933', opacity: 0.5 }}>No pending submissions to review.</p>
        </div>
      ) : (
        <ApprovalsClient initialItems={pending} />
      )}
    </PortalShell>
  )
}
