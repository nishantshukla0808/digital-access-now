import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { createServiceClient } from '@/lib/supabase/service'

export default async function AdminDashboardPage() {
  const service = createServiceClient()

  const [
    { count: totalUsers },
    { data: pendingReports },
    { data: pendingEvents },
    { data: pendingVlogs },
    { data: pendingResources },
    { data: pendingHours },
  ] = await Promise.all([
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('reports').select('id, title, created_at').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    service.from('events').select('id, title, created_at').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    service.from('vlogs').select('id, title, created_at').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    service.from('resources').select('id, title, created_at').eq('status', 'pending_verification').order('created_at', { ascending: false }),
    service.from('volunteer_attendance').select('id, activity_description, hours_logged, created_at').eq('status', 'pending').order('created_at', { ascending: false }),
  ])

  const recentPending = [
    ...(pendingReports ?? []).map(r => ({ id: r.id, title: r.title, date: r.created_at, type: 'Report' })),
    ...(pendingEvents ?? []).map(e => ({ id: e.id, title: e.title, date: e.created_at, type: 'Event' })),
    ...(pendingVlogs ?? []).map(v => ({ id: v.id, title: v.title, date: v.created_at, type: 'Vlog' })),
    ...(pendingResources ?? []).map(r => ({ id: r.id, title: r.title, date: r.created_at, type: 'Resource' })),
    ...(pendingHours ?? []).map(h => ({ id: h.id, title: `${h.hours_logged}h — ${h.activity_description?.slice(0, 40) ?? 'Activity'}`, date: h.created_at, type: 'Hours' })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  const totalPending =
    (pendingReports?.length ?? 0) +
    (pendingEvents?.length ?? 0) +
    (pendingVlogs?.length ?? 0) +
    (pendingResources?.length ?? 0)

  const quickActions = [
    { title: 'Review approvals', desc: 'Approve or reject pending reports, events, vlogs and resources.', href: '/portal/admin/approvals', badge: `${totalPending} pending` },
    { title: 'Manage users', desc: 'View registered users and their roles.', href: '/portal/admin/users', badge: `${totalUsers ?? 0} users` },
    { title: 'Team members', desc: 'Add or remove members shown on the public team page.', href: '/portal/admin/team', badge: 'Live' },
    { title: 'Content manager', desc: 'View, unpublish, or delete published content.', href: '/portal/admin/content', badge: 'Live' },
  ]

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/dashboard"
      badge="Admin"
      title="Dashboard"
      subtitle=""
      navItems={adminNavItems}
    >
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard label="Total users"       value={String(totalUsers ?? 0)}                    detail="Registered across all roles"                  icon="Users"      />
        <PortalStatCard label="Pending approvals" value={String(totalPending).padStart(2, '0')}      detail="Across reports, events, vlogs, resources"     icon="FileCheck2" />
        <PortalStatCard label="Pending reports"   value={String(pendingReports?.length ?? 0).padStart(2, '0')} detail="Chapter reports awaiting review"     icon="ShieldCheck"/>
        <PortalStatCard label="Pending events"    value={String(pendingEvents?.length ?? 0).padStart(2, '0')}  detail="Events awaiting publish approval"    icon="Activity"   />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">

        {/* Quick actions */}
        <div className="rounded-xl p-5" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-4" style={{ color: '#1F2933' }}>Quick actions</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map(({ title, desc, href, badge }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col gap-2 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.08)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm" style={{ color: '#1F2933' }}>{title}</p>
                  <span
                    className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(15,93,94,0.1)', color: '#0F5D5E' }}
                  >
                    {badge}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#1F2933', opacity: 0.55 }}>{desc}</p>
                <span className="flex items-center gap-1 text-xs font-bold" style={{ color: '#0F5D5E' }}>
                  Open <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Pending queue */}
        <div className="rounded-xl p-5" style={{ background: '#0B1A1A' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-white">Pending review</p>
            <Link
              href="/portal/admin/approvals"
              className="text-xs font-bold transition-opacity hover:opacity-70"
              style={{ color: '#4DB7E5' }}
            >
              View all →
            </Link>
          </div>

          {recentPending.length === 0 ? (
            <p className="text-center text-sm py-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
              No pending items — all clear.
            </p>
          ) : (
            <div className="space-y-2">
              {recentPending.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-lg p-3"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate max-w-[200px]">{item.title}</p>
                    <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {item.type} · {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(234,179,8,0.15)', color: '#fbbf24' }}
                  >
                    Pending
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  )
}