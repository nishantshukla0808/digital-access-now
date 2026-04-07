import { CalendarDays, FileText, FolderKanban, Upload } from 'lucide-react'

import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ChapterDashboardPage() {
  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/dashboard"
      badge="Chapter workspace"
      title="Run chapter operations with uploads, reports, and events in one dashboard."
      subtitle="This chapter view focuses on the workflows your chapters will actually use first: resource access, report submission, and document uploads that flow into admin review."
      navItems={chapterNavItems}
    >
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard label="Reports due" value="03" detail="Monthly and quarterly submissions in progress" icon={FileText} />
        <PortalStatCard label="Uploaded files" value="41" detail="Reports, data sheets, and supporting documents" icon={Upload} />
        <PortalStatCard label="Upcoming events" value="06" detail="Community sessions and chapter activities" icon={CalendarDays} />
        <PortalStatCard label="Resources" value="18" detail="Templates and approved materials available" icon={FolderKanban} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Chapter workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {[
              ['Upload reports and documents', 'Add chapter reports, impact data, and supporting files for admin review.'],
              ['Track approval status', 'See whether uploads are pending, approved, or need edits.'],
              ['Manage chapter events', 'Prepare event details and later sync them with backend event APIs.'],
              ['Access chapter resources', 'Download templates, guidance, and approved materials assigned to your role.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                <p className="font-bold text-gray-950">{title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Recent submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {[
              ['March outreach report', 'Pending review'],
              ['Volunteer attendance sheet', 'Approved'],
              ['Laptop distribution tracker', 'Needs revision'],
            ].map(([title, status]) => (
              <div key={title} className="flex items-center justify-between rounded-3xl border border-gray-200 p-4">
                <div>
                  <p className="font-semibold text-gray-950">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">Chapter-owned content</p>
                </div>
                <span className="rounded-full bg-primary-blue/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-blue">
                  {status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}