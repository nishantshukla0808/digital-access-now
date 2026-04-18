'use client'

import { useState, useTransition } from 'react'
import { CircleDollarSign, HeartHandshake, Target, TrendingUp, Loader2, Save } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { updateSiteMetric } from '../admin-actions'

type Metrics = Record<string, string>

export function FundraisingClient({ metrics }: { metrics: Metrics }) {
  const [values, setValues] = useState(metrics)
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleChange(key: string, value: string) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    startTransition(async () => {
      setNotice(null)
      const keys = ['donation_raised', 'donor_count', 'monthly_goal', 'devices_funded', 'campaign_message']
      const results = await Promise.all(keys.map(k => updateSiteMetric(k, values[k] ?? '')))
      const errors = results.filter(r => r.error)
      if (errors.length > 0) {
        setNotice({ type: 'err', msg: errors[0].error! })
      } else {
        setNotice({ type: 'ok', msg: 'Fundraising metrics saved and synced to the public donation page.' })
      }
    })
  }

  const m = values

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/fundraising"
      badge="Fundraising control"
      title="Manage donation stats, giving impact, and campaign messaging."
      subtitle="Changes here are saved to the database and update the public donation page immediately."
      navItems={adminNavItems}
    >
      {notice && (
        <div className={`rounded-2xl px-5 py-3 text-sm font-medium mb-6 ${notice.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {notice.type === 'ok' ? '✓' : '⚠'} {notice.msg}
        </div>
      )}

      {/* Live stat preview */}
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard label="Raised" value={m.donation_raised ?? '—'} detail="Current campaign total shown across fundraising views" icon={CircleDollarSign} />
        <PortalStatCard label="Donors" value={m.donor_count ?? '—'} detail="Supporters contributing across one-time and monthly giving" icon={HeartHandshake} />
        <PortalStatCard label="Monthly goal" value={m.monthly_goal ?? '—'} detail="Monthly giving target for the current campaign" icon={Target} />
        <PortalStatCard label="Devices funded" value={m.devices_funded ?? '—'} detail="Devices purchased through donations" icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        {/* Editable form */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-2xl font-black text-gray-950">Donation page content</CardTitle>
              <Badge className="rounded-full bg-green-50 border border-green-200 px-4 py-1 text-green-700">Live DB</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Headline total raised</label>
                <Input value={m.donation_raised ?? ''} onChange={e => handleChange('donation_raised', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Total donors</label>
                <Input value={m.donor_count ?? ''} onChange={e => handleChange('donor_count', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Monthly giving goal</label>
                <Input value={m.monthly_goal ?? ''} onChange={e => handleChange('monthly_goal', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Devices funded</label>
                <Input value={m.devices_funded ?? ''} onChange={e => handleChange('devices_funded', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Primary campaign message</label>
              <Textarea value={m.campaign_message ?? ''} onChange={e => handleChange('campaign_message', e.target.value)} className="min-h-24 rounded-2xl border-gray-200 bg-gray-50" />
            </div>
            <Button onClick={handleSave} disabled={isPending} className="rounded-full bg-primary-blue text-white hover:bg-cyan-600 gap-2">
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {isPending ? 'Saving…' : 'Save fundraising metrics'}
            </Button>
          </CardContent>
        </Card>

        {/* Right info panel */}
        <Card className="border-primary-blue/15 bg-gray-950 py-0 text-white">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black">What these control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {[
              ['Hero totals', 'Top-level fundraising numbers and impact statements on the donation page.'],
              ['Preset amounts', 'Suggested donation values and monthly/one-time defaults.'],
              ['Alternative giving info', 'Check and ACH details shown in secondary donation blocks.'],
              ['FAQ content', 'Answer text for tax deductibility, donation usage, and legal status.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-white/65 leading-relaxed">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
