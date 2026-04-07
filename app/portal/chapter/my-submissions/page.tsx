import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { FileText, CalendarDays } from 'lucide-react'

const statusColor: Record<string, string> = {
  published: 'bg-green-50 text-green-700 border-green-200',
  pending_verification: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  draft: 'bg-gray-50 text-gray-700 border-gray-200',
}

export default async function ChapterMySubmissionsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: reports }, { data: events }] = await Promise.all([
    supabase.from('reports').select('id, title, status, created_at').eq('chapter_id', user?.id ?? '').order('created_at', { ascending: false }),
    supabase.from('events').select('id, title, status, start_date').eq('chapter_id', user?.id ?? '').order('start_date', { ascending: false }),
  ])

  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/my-submissions"
      badge="My Submissions"
      title="Track your chapter reports and events."
      subtitle="View the approval status of everything your chapter has submitted."
      navItems={chapterNavItems}
    >
      <div className="space-y-8">
        <Card className="border-primary-blue/15 bg-white">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-950">
              <FileText className="size-6 text-primary-blue" /> Reports ({reports?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {!reports || reports.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">No reports submitted yet.</td></tr>
                ) : reports.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/80">
                    <td className="px-6 py-4 font-semibold text-gray-900">{r.title}</td>
                    <td className="px-6 py-4"><Badge className={`rounded-full border text-xs font-bold ${statusColor[r.status] || ''}`}>{r.status.replace('_', ' ')}</Badge></td>
                    <td className="px-6 py-4 text-gray-500">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-primary-blue/15 bg-white">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-gray-950">
              <CalendarDays className="size-6 text-primary-blue" /> Events ({events?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Event Date</th>
                </tr>
              </thead>
              <tbody>
                {!events || events.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">No events submitted yet.</td></tr>
                ) : events.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50/80">
                    <td className="px-6 py-4 font-semibold text-gray-900">{e.title}</td>
                    <td className="px-6 py-4"><Badge className={`rounded-full border text-xs font-bold ${statusColor[e.status] || ''}`}>{e.status.replace('_', ' ')}</Badge></td>
                    <td className="px-6 py-4 text-gray-500">{new Date(e.start_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
