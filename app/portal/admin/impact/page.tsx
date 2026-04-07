import { Globe2, MonitorSmartphone, Sparkles, Users2 } from 'lucide-react'

import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function AdminImpactPage() {
  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/impact"
      badge="Impact metrics"
      title="Control the public metrics shown across impact and homepage sections."
      subtitle="This frontend is mapped to the currently hardcoded website stats so admins can later manage impact totals, summaries, and stories through CRUD APIs instead of code edits."
      navItems={adminNavItems}
    >
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard label="Lives empowered" value="340K+" detail="Main impact page headline stat" icon={Users2} />
        <PortalStatCard label="Devices distributed" value="89K+" detail="Public devices impact metric" icon={MonitorSmartphone} />
        <PortalStatCard label="Communities served" value="245" detail="Community reach shown on impact screens" icon={Globe2} />
        <PortalStatCard label="Countries active" value="52" detail="Global reach figure across site content" icon={Sparkles} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-2xl font-black text-gray-950">Metric editor</CardTitle>
              <Badge className="rounded-full bg-primary-blue/12 px-4 py-1 text-primary-blue hover:bg-primary-blue/12">Public website data</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Lives empowered</label>
                <Input defaultValue="340K+" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Devices distributed</label>
                <Input defaultValue="89K+" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Communities served</label>
                <Input defaultValue="245" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Countries</label>
                <Input defaultValue="52" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Impact section summary</label>
              <Textarea
                defaultValue="Measuring the real-world change we're making through digital access, devices, and community-led leadership."
                className="min-h-24 rounded-2xl border-gray-200 bg-gray-50"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-full bg-primary-blue text-footer-black hover:bg-cyan-600">
                Save impact draft
              </Button>
              <Button variant="outline" className="rounded-full border-primary-blue/25 hover:bg-primary-blue/8">
                Preview impact page
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Stories and homepage stat blocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {[
              ['Homepage stat strip', 'Sync headline metrics used on landing and about pages.'],
              ['Impact story cards', 'Replace static stories with manageable story records and CTAs.'],
              ['Annual report highlights', 'Update report-page feature metrics from one admin area.'],
              ['Recognition and theory pages', 'Share consistent numbers across impact-related public sections.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                <p className="font-bold text-gray-950">{title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}