import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { createClient } from '@/lib/supabase/server'

const statusColor: Record<string, { bg: string; color: string }> = {
  verified:             { bg: 'rgba(15,93,94,0.1)',  color: '#0F5D5E' },
  published:            { bg: 'rgba(15,93,94,0.1)',  color: '#0F5D5E' },
  pending:              { bg: 'rgba(234,179,8,0.12)', color: '#b45309' },
  pending_verification: { bg: 'rgba(234,179,8,0.12)', color: '#b45309' },
  rejected:             { bg: 'rgba(220,38,38,0.08)', color: '#dc2626' },
}
const statusLabel: Record<string, string> = {
  verified: 'Verified', published: 'Published',
  pending: 'Pending', pending_verification: 'Pending review', rejected: 'Rejected',
}

export default async function VolunteerDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const uid = user?.id ?? ''

  const [
    { data: hours },
    { data: resources },
    { data: vlogs },
    { data: upcomingEvents },
  ] = await Promise.all([
    supabase.from('volunteer_attendance').select('id, hours_logged, status, activity_description, date').eq('volunteer_id', uid).order('date', { ascending: false }),
    supabase.from('resources').select('id, title, status, created_at').eq('volunteer_id', uid).order('created_at', { ascending: false }),
    supabase.from('vlogs').select('id, title, status, created_at').eq('volunteer_id', uid).order('created_at', { ascending: false }),
    supabase.from('events').select('id, title, start_date, status').eq('status', 'published').gte('start_date', new Date().toISOString()).order('start_date', { ascending: true }).limit(5),
  ])

  const verifiedHours = (hours ?? []).filter(h => h.status === 'verified').reduce((sum, h) => sum + Number(h.hours_logged), 0)

  const recentActivity = [
    ...(hours ?? []).slice(0, 3).map(h => ({ id: h.id, title: `${h.hours_logged}h — ${h.activity_description?.slice(0, 50) ?? 'Activity'}`, status: h.status, date: h.date, type: 'Hours' })),
    ...(resources ?? []).slice(0, 2).map(r => ({ id: r.id, title: r.title, status: r.status, date: r.created_at, type: 'Resource' })),
    ...(vlogs ?? []).slice(0, 2).map(v => ({ id: v.id, title: v.title, status: v.status, date: v.created_at, type: 'Vlog' })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  const quickActions = [
    { title: 'Log volunteer hours', desc: 'Submit time for admin verification.', href: '/portal/volunteer/log-hours' },
    { title: 'Submit a resource', desc: 'Share training materials for publishing.', href: '/portal/volunteer/submit-resource' },
    { title: 'Submit a vlog', desc: 'Share your impact story for the blog.', href: '/portal/volunteer/submit-vlog' },
    { title: 'My performance', desc: 'View your verified hours and contributions.', href: '/portal/volunteer/my-performance' },
  ]

  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/dashboard"
      badge="Volunteer"
      title="Dashboard"
      subtitle=""
      navItems={volunteerNavItems}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard label="Verified hours"   value={`${verifiedHours}h`}                                                                              detail="Admin-verified time"              icon="Timer"        />
        <PortalStatCard label="Pending entries"  value={String((hours ?? []).filter(h => h.status === 'pending').length).padStart(2, '0')}                detail="Awaiting admin verification"     icon="HandHelping"  />
        <PortalStatCard label="Upcoming events"  value={String((upcomingEvents ?? []).length).padStart(2, '0')}                                            detail="Published events coming up"      icon="CalendarClock"/>
        <PortalStatCard label="Submissions"      value={String((resources ?? []).length + (vlogs ?? []).length).padStart(2, '0')}                         detail="Resources and vlogs submitted"   icon="BookOpen"     />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        {/* Quick actions */}
        <div className="rounded-xl p-5" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-4" style={{ color: '#1F2933' }}>Quick actions</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map(({ title, desc, href }) => (
              <Link
                key={title} href={href}
                className="group flex flex-col gap-2 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.08)' }}
              >
                <p className="font-semibold text-sm" style={{ color: '#1F2933' }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#1F2933', opacity: 0.55 }}>{desc}</p>
                <span className="flex items-center gap-1 text-xs font-bold" style={{ color: '#0F5D5E' }}>
                  Go <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl p-5" style={{ background: '#0B1A1A' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-white">Recent activity</p>
            <Link href="/portal/volunteer/my-performance" className="text-xs font-bold transition-opacity hover:opacity-70" style={{ color: '#4DB7E5' }}>View all →</Link>
          </div>
          {recentActivity.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>No activity yet.</p>
              <Link href="/portal/volunteer/log-hours" className="text-sm font-bold" style={{ color: '#4DB7E5' }}>Log your first hours →</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentActivity.map(item => {
                const s = statusColor[item.status] ?? { bg: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }
                return (
                  <div key={item.id} className="flex items-start justify-between gap-3 rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate max-w-[200px]">{item.title}</p>
                      <p className="mt-0.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {item.type} · {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>
                      {statusLabel[item.status] ?? item.status}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  )
}