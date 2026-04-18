import { CalendarDays, FileText, FolderKanban, Upload, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

const statusLabel: Record<string, string> = {
  published: 'Published',
  pending_verification: 'Pending review',
  rejected: 'Rejected',
  draft: 'Draft',
}
const statusStyle: Record<string, string> = {
  published: 'bg-green-50 text-green-700',
  pending_verification: 'bg-yellow-50 text-yellow-700',
  rejected: 'bg-red-50 text-red-600',
  draft: 'bg-gray-100 text-gray-600',
}

export default async function ChapterDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const uid = user?.id ?? ''

  const [
    { data: reports },
    { data: events },
    { data: resources },
  ] = await Promise.all([
    supabase.from('reports').select('id, title, status, created_at').eq('chapter_id', uid).order('created_at', { ascending: false }),
    supabase.from('events').select('id, title, status, start_date').eq('chapter_id', uid).order('start_date', { ascending: true }),
    supabase.from('resources').select('id, title, category').eq('status', 'published'),
  ])

  const pendingReports = (reports ?? []).filter(r => r.status === 'pending_verification').length
  const upcomingEvents = (events ?? []).filter(e => e.start_date && e.start_date >= new Date().toISOString()).length
  const recentSubmissions = [...(reports ?? []).slice(0, 3), ...(events ?? []).slice(0, 2)]
    .sort((a, b) => {
      const da = (a as any).created_at || (a as any).start_date || ''
      const db_ = (b as any).created_at || (b as any).start_date || ''
      return db_.localeCompare(da)
    })
    .slice(0, 5)

  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/dashboard"
      badge="Chapter workspace"
      title="Run chapter operations with uploads, reports, and events in one dashboard."
      subtitle="Track your submissions, monitor approval status, and manage your chapter events — all in real time."
      navItems={chapterNavItems}
    >
      {/* Stat Cards — live from DB */}
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard
          label="Pending reports"
          value={String(pendingReports).padStart(2, '0')}
          detail="Your reports awaiting admin review"
          icon={FileText}
        />
        <PortalStatCard
          label="Total reports"
          value={String((reports ?? []).length).padStart(2, '0')}
          detail="All reports submitted by your chapter"
          icon={Upload}
        />
        <PortalStatCard
          label="Upcoming events"
          value={String(upcomingEvents).padStart(2, '0')}
          detail="Your chapter events yet to occur"
          icon={CalendarDays}
        />
        <PortalStatCard
          label="Available resources"
          value={String((resources ?? []).length).padStart(2, '0')}
          detail="Published resources from the community"
          icon={FolderKanban}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {/* Quick Actions */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Chapter workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-6 pb-6">
            {[
              { title: 'Submit a report', description: 'Upload a new chapter impact report for admin review.', href: '/portal/chapter/submit-report' },
              { title: 'Submit an event', description: 'Add an upcoming chapter event to the public events calendar.', href: '/portal/chapter/submit-event' },
              { title: 'View my submissions', description: 'Track all your submitted reports and events and their approval status.', href: '/portal/chapter/my-submissions' },
              { title: 'Download resources', description: 'Browse approved templates and guidance materials.', href: '/resources' },
            ].map(({ title, description, href }) => (
              <Link key={title} href={href} className="flex items-start justify-between rounded-3xl border border-gray-200 bg-gray-50 p-5 hover:border-primary-blue/30 hover:bg-primary-blue/5 transition-all group">
                <div>
                  <p className="font-bold text-gray-950 group-hover:text-primary-blue transition-colors">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
                </div>
                <ArrowRight className="size-4 text-gray-400 group-hover:text-primary-blue mt-1 shrink-0 transition-colors" />
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Submissions — live */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-black text-gray-950">Recent submissions</CardTitle>
            <Link href="/portal/chapter/my-submissions" className="text-xs font-bold text-primary-blue hover:underline">
              View all →
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 px-6 pb-6">
            {recentSubmissions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">No submissions yet.</p>
                <Link href="/portal/chapter/submit-report" className="mt-3 inline-flex items-center gap-1 text-primary-blue text-sm font-bold hover:underline">
                  Submit your first report →
                </Link>
              </div>
            ) : (
              recentSubmissions.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-3xl border border-gray-200 p-4 gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-950 truncate">{item.title}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {'start_date' in item ? 'Event' : 'Report'} ·{' '}
                      {new Date((item as any).created_at || (item as any).start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide whitespace-nowrap shrink-0 ${statusStyle[item.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {statusLabel[item.status] ?? item.status}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}