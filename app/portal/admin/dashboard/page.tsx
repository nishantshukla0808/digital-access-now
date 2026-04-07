import { Activity, FileCheck2, ShieldCheck, Users } from 'lucide-react'

import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboardPage() {
  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/dashboard"
      badge="Admin operations"
      title="Control users, resources, and role visibility from one place."
      subtitle="This admin dashboard frontend is structured around the backend plan: JWT-based auth, user lifecycle control, document approvals, and per-role access rules."
      navItems={adminNavItems}
    >
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard label="Users" value="128" detail="Across admins, chapter leads, and volunteers" icon={Users} />
        <PortalStatCard label="Pending approvals" value="14" detail="Documents and reports awaiting review" icon={FileCheck2} />
        <PortalStatCard label="Visibility rules" value="9" detail="Role-scoped resource groups configured" icon={ShieldCheck} />
        <PortalStatCard label="Activity today" value="62" detail="Uploads, downloads, and status changes" icon={Activity} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Admin feature map</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['User management', 'Create users with role-specific credential IDs and status controls.'],
                ['Website content control', 'Manage team members, donation metrics, and impact blocks shown on the public site.'],
                ['Document moderation', 'Approve uploads, reject invalid files, and assign visibility per role.'],
                ['Audit trail', 'Review sign-ins, downloads, and content changes through activity logs.'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                  <p className="font-bold text-gray-950">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary-blue/15 bg-gray-950 py-0 text-white">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black">Recent review queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {[
              ['Pakistan chapter monthly report', 'Needs admin review', 'Review'],
              ['Volunteer onboarding packet', 'Visibility pending', 'Permissions'],
              ['Philadelphia event recap', 'Waiting for approval', 'Approve'],
            ].map(([title, status, action]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-white/60">{status}</p>
                  </div>
                  <Badge className="rounded-full bg-primary-blue/16 px-3 py-1 text-primary-blue hover:bg-primary-blue/16">{action}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}