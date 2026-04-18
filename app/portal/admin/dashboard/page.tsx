import { Activity, FileCheck2, ShieldCheck, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createServiceClient } from '@/lib/supabase/service'

export default async function AdminDashboardPage() {
  const service = createServiceClient()

  const [
    { count: totalUsers },
    { data: pendingReports },
    { data: pendingEvents },
    { data: pendingVlogs },
    { data: pendingResources },
    { data: recentPending },
  ] = await Promise.all([
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('reports').select('id').eq('status', 'pending_verification'),
    service.from('events').select('id').eq('status', 'pending_verification'),
    service.from('vlogs').select('id').eq('status', 'pending_verification'),
    service.from('resources').select('id').eq('status', 'pending_verification'),
    service.from('reports')
      .select('id, title, status, created_at')
      .eq('status', 'pending_verification')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const totalPending =
    (pendingReports?.length ?? 0) +
    (pendingEvents?.length ?? 0) +
    (pendingVlogs?.length ?? 0) +
    (pendingResources?.length ?? 0)

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/dashboard"
      badge="Admin operations"
      title="Control users, content, and approvals from one place."
      subtitle="Live overview of your portal — all counts are pulled directly from the database."
      navItems={adminNavItems}
    >
      {/* Stat Cards — all live */}
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard
          label="Total users"
          value={String(totalUsers ?? 0)}
          detail="Registered across all roles"
          icon={Users}
        />
        <PortalStatCard
          label="Pending approvals"
          value={String(totalPending).padStart(2, '0')}
          detail="Across reports, events, vlogs, resources"
          icon={FileCheck2}
        />
        <PortalStatCard
          label="Pending reports"
          value={String(pendingReports?.length ?? 0).padStart(2, '0')}
          detail="Chapter reports awaiting review"
          icon={ShieldCheck}
        />
        <PortalStatCard
          label="Pending events"
          value={String(pendingEvents?.length ?? 0).padStart(2, '0')}
          detail="Events awaiting publish approval"
          icon={Activity}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Admin Links */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Admin actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 px-6 pb-6">
            {[
              { title: 'Review approvals', description: 'Approve or reject pending reports, events, vlogs and resources.', href: '/portal/admin/approvals', badge: `${totalPending} pending` },
              { title: 'Manage users', description: 'View registered users, their roles, and custom DAN IDs.', href: '/portal/admin/users', badge: `${totalUsers ?? 0} users` },
              { title: 'Team members CMS', description: 'Add, edit, or remove members shown on the public team page.', href: '/portal/admin/team', badge: 'Live' },
              { title: 'Content manager', description: 'View, unpublish, or delete any published content across the site.', href: '/portal/admin/content', badge: 'Live' },
            ].map(({ title, description, href, badge }) => (
              <Link key={title} href={href} className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-gray-50 p-5 hover:border-primary-blue/30 hover:bg-primary-blue/5 transition-all group">
                <div className="flex items-start justify-between">
                  <p className="font-bold text-gray-950 group-hover:text-primary-blue transition-colors">{title}</p>
                  <span className="rounded-full bg-primary-blue/10 px-2 py-0.5 text-xs font-bold text-primary-blue whitespace-nowrap">{badge}</span>
                </div>
                <p className="text-sm leading-6 text-gray-500">{description}</p>
                <span className="flex items-center gap-1 text-xs font-bold text-primary-blue">
                  Open <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Real Pending Queue */}
        <Card className="border-primary-blue/15 bg-gray-950 py-0 text-white">
          <CardHeader className="px-6 pt-6 flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-black">Pending review</CardTitle>
            <Link href="/portal/admin/approvals" className="text-xs font-bold text-primary-blue hover:underline">
              Review all →
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 px-6 pb-6">
            {(recentPending ?? []).length === 0 ? (
              <p className="text-white/40 text-sm py-8 text-center">No pending items — all clear! ✓</p>
            ) : (
              (recentPending ?? []).map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white truncate max-w-[200px]">{item.title}</p>
                      <p className="mt-1 text-xs text-white/50">
                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <Badge className="rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/20 text-xs shrink-0">
                      Pending
                    </Badge>
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