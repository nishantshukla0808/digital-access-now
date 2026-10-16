import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { createClient } from '@/lib/supabase/server'

const statusColor: Record<string, { bg: string; color: string }> = {
  published:            { bg: 'rgba(15,93,94,0.1)',   color: '#0F5D5E' },
  pending_verification: { bg: 'rgba(234,179,8,0.12)', color: '#b45309' },
  rejected:             { bg: 'rgba(220,38,38,0.08)', color: '#dc2626' },
  draft:                { bg: 'rgba(0,0,0,0.06)',     color: '#6b7280' },
}
const statusLabel: Record<string, string> = {
  published: 'Published', pending_verification: 'Pending review', rejected: 'Rejected', draft: 'Draft',
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

  const pendingReports  = (reports ?? []).filter(r => r.status === 'pending_verification').length
  const upcomingEvents  = (events ?? []).filter(e => e.start_date && e.start_date >= new Date().toISOString()).length
  const recentSubmissions = [...(reports ?? []).slice(0, 3), ...(events ?? []).slice(0, 2)]
    .sort((a, b) => {
      const da = (a as any).created_at || (a as any).start_date || ''
      const db_ = (b as any).created_at || (b as any).start_date || ''
      return db_.localeCompare(da)
    })
    .slice(0, 5)

  const quickActions = [
    { title: 'Submit a report', desc: 'Upload a chapter impact report for admin review.', href: '/portal/chapter/submit-report' },
    { title: 'Submit an event', desc: 'Add an event to the public events calendar.', href: '/portal/chapter/submit-event' },
    { title: 'My submissions', desc: 'Track all your submitted reports and events.', href: '/portal/chapter/my-submissions' },
    { title: 'Browse resources', desc: 'Download approved templates and materials.', href: '/resources' },
  ]

  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/dashboard"
      badge="Chapter"
      title="Dashboard"
      subtitle=""
      navItems={chapterNavItems}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard label="Pending reports"     value={String(pendingReports).padStart(2, '0')}                    detail="Awaiting admin review"                 icon="FileText"    />
        <PortalStatCard label="Total reports"       value={String((reports ?? []).length).padStart(2, '0')}            detail="All reports submitted"                icon="Upload"      />
        <PortalStatCard label="Upcoming events"     value={String(upcomingEvents).padStart(2, '0')}                    detail="Your chapter events coming up"        icon="CalendarDays"/>
        <PortalStatCard label="Available resources" value={String((resources ?? []).length).padStart(2, '0')}          detail="Published community resources"        icon="FolderKanban"/>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        {/* Quick actions */}
        <div className="rounded-xl p-5" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-4" style={{ color: '#1F2933' }}>Quick actions</p>
          <div className="space-y-2">
            {quickActions.map(({ title, desc, href }) => (
              <Link
                key={title} href={href}
                className="group flex items-center justify-between rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.08)' }}
              >
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1F2933' }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#1F2933', opacity: 0.55 }}>{desc}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: '#0F5D5E' }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent submissions */}
        <div className="rounded-xl p-5" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Recent submissions</p>
            <Link href="/portal/chapter/my-submissions" className="text-xs font-bold transition-opacity hover:opacity-70" style={{ color: '#0F5D5E' }}>View all →</Link>
          </div>
          {recentSubmissions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm mb-3" style={{ color: '#1F2933', opacity: 0.4 }}>No submissions yet.</p>
              <Link href="/portal/chapter/submit-report" className="text-sm font-bold" style={{ color: '#0F5D5E' }}>Submit your first report →</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentSubmissions.map((item) => {
                const s = statusColor[item.status] ?? { bg: 'rgba(0,0,0,0.05)', color: '#6b7280' }
                return (
                  <div key={item.id} className="flex items-center justify-between rounded-xl p-3 gap-3" style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.07)' }}>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: '#1F2933' }}>{item.title}</p>
                      <p className="mt-0.5 text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>
                        {'start_date' in item ? 'Event' : 'Report'} · {new Date((item as any).created_at || (item as any).start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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