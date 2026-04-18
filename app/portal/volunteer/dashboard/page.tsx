import { BookOpen, CalendarClock, HandHelping, Timer, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

const statusStyle: Record<string, string> = {
  verified: 'bg-green-50 text-green-700',
  pending: 'bg-yellow-50 text-yellow-700',
  rejected: 'bg-red-50 text-red-600',
  published: 'bg-green-50 text-green-700',
  pending_verification: 'bg-yellow-50 text-yellow-700',
}
const statusLabel: Record<string, string> = {
  verified: 'Verified',
  pending: 'Pending',
  rejected: 'Rejected',
  published: 'Published',
  pending_verification: 'Pending review',
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
    supabase
      .from('volunteer_attendance')
      .select('id, hours_logged, status, activity_description, date')
      .eq('volunteer_id', uid)
      .order('date', { ascending: false }),
    supabase.from('resources').select('id, title, status, created_at').eq('volunteer_id', uid).order('created_at', { ascending: false }),
    supabase.from('vlogs').select('id, title, status, created_at').eq('volunteer_id', uid).order('created_at', { ascending: false }),
    supabase.from('events').select('id, title, start_date, status').eq('status', 'published').gte('start_date', new Date().toISOString()).order('start_date', { ascending: true }).limit(5),
  ])

  const verifiedHours = (hours ?? [])
    .filter(h => h.status === 'verified')
    .reduce((sum, h) => sum + Number(h.hours_logged), 0)

  // Recent activity: last 5 items across hours, resources, vlogs
  const recentActivity = [
    ...(hours ?? []).slice(0, 3).map(h => ({
      id: h.id, title: `${h.hours_logged}h — ${h.activity_description?.slice(0, 50) ?? 'Activity'}`,
      status: h.status, date: h.date, type: 'Hours'
    })),
    ...(resources ?? []).slice(0, 2).map(r => ({ id: r.id, title: r.title, status: r.status, date: r.created_at, type: 'Resource' })),
    ...(vlogs ?? []).slice(0, 2).map(v => ({ id: v.id, title: v.title, status: v.status, date: v.created_at, type: 'Vlog' })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/dashboard"
      badge="Volunteer workspace"
      title="Track your contributions, hours, and upcoming opportunities."
      subtitle="Log hours, submit resources, and share your impact stories — all in one place."
      navItems={volunteerNavItems}
    >
      {/* Live Stat Cards */}
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard
          label="Verified hours"
          value={`${verifiedHours}h`}
          detail="Total admin-verified contribution time"
          icon={Timer}
        />
        <PortalStatCard
          label="Pending entries"
          value={String((hours ?? []).filter(h => h.status === 'pending').length).padStart(2, '0')}
          detail="Hours awaiting admin verification"
          icon={HandHelping}
        />
        <PortalStatCard
          label="Upcoming events"
          value={String((upcomingEvents ?? []).length).padStart(2, '0')}
          detail="Published community events coming up"
          icon={CalendarClock}
        />
        <PortalStatCard
          label="Submissions"
          value={String((resources ?? []).length + (vlogs ?? []).length).padStart(2, '0')}
          detail="Resources and vlogs you've submitted"
          icon={BookOpen}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        {/* Quick Actions */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Volunteer actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 px-6 pb-6 md:grid-cols-2">
            {[
              { title: 'Log volunteer hours', description: 'Submit time for admin verification and your performance record.', href: '/portal/volunteer/log-hours' },
              { title: 'Submit a resource', description: 'Share training materials for review and publishing.', href: '/portal/volunteer/submit-resource' },
              { title: 'Submit a vlog', description: 'Share your impact story video for the public blog.', href: '/portal/volunteer/submit-vlog' },
              { title: 'My performance', description: 'View your verified hours history and contribution score.', href: '/portal/volunteer/my-performance' },
            ].map(({ title, description, href }) => (
              <Link key={title} href={href} className="flex flex-col gap-2 rounded-3xl border border-gray-200 bg-gray-50 p-5 hover:border-primary-blue/30 hover:bg-primary-blue/5 transition-all group">
                <p className="font-bold text-gray-950 group-hover:text-primary-blue transition-colors">{title}</p>
                <p className="text-sm leading-6 text-gray-500">{description}</p>
                <span className="flex items-center gap-1 text-xs font-bold text-primary-blue mt-auto">
                  Go <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity — live */}
        <Card className="border-primary-blue/15 bg-gray-950 py-0 text-white">
          <CardHeader className="px-6 pt-6 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-black">Recent activity</CardTitle>
            <Link href="/portal/volunteer/my-performance" className="text-xs font-bold text-primary-blue hover:underline">
              View all →
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 px-6 pb-6">
            {recentActivity.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-white/40 text-sm">No activity yet.</p>
                <Link href="/portal/volunteer/log-hours" className="mt-3 inline-flex items-center gap-1 text-primary-blue text-sm font-bold hover:underline">
                  Log your first hours →
                </Link>
              </div>
            ) : (
              recentActivity.map(item => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{item.title}</p>
                      <p className="mt-0.5 text-xs text-white/50">
                        {item.type} · {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap shrink-0 ${statusStyle[item.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {statusLabel[item.status] ?? item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}