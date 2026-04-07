import { BarChart3, CircleDollarSign, HeartHandshake, Target, TrendingUp } from 'lucide-react'

import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function AdminFundraisingPage() {
  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/fundraising"
      badge="Fundraising control"
      title="Manage donation stats, giving impact, and campaign messaging."
      subtitle="This frontend gives admins a dedicated workspace for public fundraising content so donation metrics and campaign highlights can eventually be updated without touching the codebase."
      navItems={adminNavItems}
    >
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard label="Raised" value="$128K" detail="Current campaign total shown across fundraising views" icon={CircleDollarSign} />
        <PortalStatCard label="Donors" value="1,426" detail="Supporters contributing across one-time and monthly giving" icon={HeartHandshake} />
        <PortalStatCard label="Monthly goal" value="82%" detail="Progress toward recurring giving target" icon={Target} />
        <PortalStatCard label="Growth" value="+18%" detail="Increase versus last campaign period" icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Donation page content controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Headline total</label>
                <Input defaultValue="$128,400" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Lives impacted</label>
                <Input defaultValue="340,000+" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Primary campaign message</label>
              <Textarea
                defaultValue="Bridge the digital divide by empowering communities to access technology."
                className="min-h-24 rounded-2xl border-gray-200 bg-gray-50"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Monthly giving goal</label>
                <Input defaultValue="$25,000" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Devices funded</label>
                <Input defaultValue="89,000+" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-full bg-primary-blue text-footer-black hover:bg-cyan-600">
                Save fundraising draft
              </Button>
              <Button variant="outline" className="rounded-full border-primary-blue/25 hover:bg-primary-blue/8">
                Preview donation page
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-primary-blue/15 bg-white py-0">
            <CardHeader className="px-6 pt-6">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-2xl font-black text-gray-950">Donation metrics to externalize</CardTitle>
                <Badge className="rounded-full bg-primary-blue/12 px-4 py-1 text-primary-blue hover:bg-primary-blue/12">
                  <BarChart3 className="mr-2 size-3.5" />
                  CMS-ready list
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {[
                ['Hero totals', 'Top-level fundraising numbers and impact statements on the donation page.'],
                ['Preset amounts', 'Suggested donation values and monthly/one-time defaults.'],
                ['Alternative giving info', 'Check and ACH details shown in secondary donation blocks.'],
                ['FAQ content', 'Answer text for tax deductibility, donation usage, and legal status.'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                  <p className="font-bold text-gray-950">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary-blue/15 bg-gray-950 py-0 text-white">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-2xl font-black">Campaign snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {[
                ['Spring campaign', '82% to monthly goal'],
                ['Corporate matching outreach', '4 prospects under review'],
                ['Philadelphia funding opportunities', '2 local opportunities flagged for follow-up'],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-white/65">{detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  )
}