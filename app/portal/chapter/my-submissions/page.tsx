import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { createClient } from '@/lib/supabase/server'
import { FileText, CalendarDays } from 'lucide-react'

const statusColor: Record<string, { bg: string; color: string }> = {
  published:            { bg: 'rgba(15,93,94,0.1)',   color: '#0F5D5E' },
  pending_verification: { bg: 'rgba(234,179,8,0.1)',  color: '#b45309' },
  rejected:             { bg: 'rgba(220,38,38,0.08)', color: '#dc2626' },
  draft:                { bg: 'rgba(0,0,0,0.05)',     color: '#6b7280' },
}

export default async function ChapterMySubmissionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Queries preserved exactly
  const [{ data: reports }, { data: events }] = await Promise.all([
    supabase.from('reports').select('id, title, status, created_at').eq('chapter_id', user?.id ?? '').order('created_at', { ascending: false }),
    supabase.from('events').select('id, title, status, start_date').eq('chapter_id', user?.id ?? '').order('start_date', { ascending: false }),
  ])

  const thStyle = 'px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest'
  const thColor = { color: '#1F2933', opacity: 0.45 } as const
  const tableStyle = { background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }
  const theadStyle = { background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }

  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/my-submissions"
      badge="Chapter"
      title="My Submissions"
      subtitle="View the approval status of everything your chapter has submitted."
      navItems={chapterNavItems}
    >
      <div className="space-y-5">
        {/* Reports table */}
        <div className="rounded-xl overflow-hidden" style={tableStyle}>
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
            <FileText className="size-4" style={{ color: '#0F5D5E' }} />
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Reports ({reports?.length ?? 0})</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={theadStyle}>
                  {['Title', 'Status', 'Submitted'].map(h => <th key={h} className={thStyle} style={thColor}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {!reports || reports.length === 0 ? (
                  <tr><td colSpan={3} className="px-5 py-12 text-center text-sm" style={{ color: '#1F2933', opacity: 0.4 }}>No reports submitted yet.</td></tr>
                ) : reports.map((r) => {
                  const s = statusColor[r.status] ?? { bg: 'rgba(0,0,0,0.05)', color: '#6b7280' }
                  return (
                    <tr key={r.id} style={{ borderBottom: '1px solid rgba(15,93,94,0.04)' }}>
                      <td className="px-5 py-4 font-semibold" style={{ color: '#1F2933' }}>{r.title}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{r.status.replace('_', ' ')}</span>
                      </td>
                      <td className="px-5 py-4 text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>{new Date(r.created_at).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Events table */}
        <div className="rounded-xl overflow-hidden" style={tableStyle}>
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
            <CalendarDays className="size-4" style={{ color: '#0F5D5E' }} />
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Events ({events?.length ?? 0})</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={theadStyle}>
                  {['Title', 'Status', 'Event Date'].map(h => <th key={h} className={thStyle} style={thColor}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {!events || events.length === 0 ? (
                  <tr><td colSpan={3} className="px-5 py-12 text-center text-sm" style={{ color: '#1F2933', opacity: 0.4 }}>No events submitted yet.</td></tr>
                ) : events.map((e) => {
                  const s = statusColor[e.status] ?? { bg: 'rgba(0,0,0,0.05)', color: '#6b7280' }
                  return (
                    <tr key={e.id} style={{ borderBottom: '1px solid rgba(15,93,94,0.04)' }}>
                      <td className="px-5 py-4 font-semibold" style={{ color: '#1F2933' }}>{e.title}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{e.status.replace('_', ' ')}</span>
                      </td>
                      <td className="px-5 py-4 text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>{new Date(e.start_date).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalShell>
  )
}
