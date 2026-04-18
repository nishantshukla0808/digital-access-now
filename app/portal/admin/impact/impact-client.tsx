'use client'

import { useState, useTransition } from 'react'
import { Globe2, MonitorSmartphone, Sparkles, Users2, Loader2, Save } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateSiteMetric } from '../admin-actions'

type Metrics = Record<string, string>

export function ImpactClient({ metrics }: { metrics: Metrics }) {
  const [values, setValues] = useState(metrics)
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleChange(key: string, value: string) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    startTransition(async () => {
      setNotice(null)
      const keys = ['lives_empowered', 'devices_distributed', 'communities_served', 'countries_active', 'impact_summary']
      const results = await Promise.all(keys.map(k => updateSiteMetric(k, values[k] ?? '')))
      const errors = results.filter(r => r.error)
      if (errors.length > 0) {
        setNotice({ type: 'err', msg: errors[0].error! })
      } else {
        setNotice({ type: 'ok', msg: 'Impact metrics saved and synced to the public website.' })
      }
    })
  }

  const m = values

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/impact"
      badge="Impact metrics"
      title="Control the public metrics shown across impact and homepage sections."
      subtitle="Changes here are immediately saved to the database and reflected on the public site."
      navItems={adminNavItems}
    >
      {notice && (
        <div className={`rounded-2xl px-5 py-3 text-sm font-medium mb-6 ${notice.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {notice.type === 'ok' ? '✓' : '⚠'} {notice.msg}
        </div>
      )}

      {/* Live preview of current values */}
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard label="Lives empowered" value={m.lives_empowered ?? '—'} detail="Main impact page headline stat" icon={Users2} />
        <PortalStatCard label="Devices distributed" value={m.devices_distributed ?? '—'} detail="Public devices impact metric" icon={MonitorSmartphone} />
        <PortalStatCard label="Communities served" value={m.communities_served ?? '—'} detail="Community reach shown on impact screens" icon={Globe2} />
        <PortalStatCard label="Countries active" value={m.countries_active ?? '—'} detail="Global reach figure across site content" icon={Sparkles} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        {/* Editable Form */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-2xl font-black text-gray-950">Metric editor</CardTitle>
              <Badge className="rounded-full bg-green-50 border border-green-200 px-4 py-1 text-green-700">Live DB</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Lives empowered</label>
                <Input value={m.lives_empowered ?? ''} onChange={e => handleChange('lives_empowered', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Devices distributed</label>
                <Input value={m.devices_distributed ?? ''} onChange={e => handleChange('devices_distributed', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Communities served</label>
                <Input value={m.communities_served ?? ''} onChange={e => handleChange('communities_served', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Countries active</label>
                <Input value={m.countries_active ?? ''} onChange={e => handleChange('countries_active', e.target.value)} className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Impact section summary</label>
              <Textarea value={m.impact_summary ?? ''} onChange={e => handleChange('impact_summary', e.target.value)} className="min-h-24 rounded-2xl border-gray-200 bg-gray-50" />
            </div>
            <Button onClick={handleSave} disabled={isPending} className="rounded-full bg-primary-blue text-white hover:bg-cyan-600 gap-2">
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {isPending ? 'Saving…' : 'Save & publish metrics'}
            </Button>
          </CardContent>
        </Card>

        {/* Info panel */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Where these appear</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {[
              ['Homepage stat strip', 'The headline numbers on the main landing page and About sections.'],
              ['Impact story cards', 'Figures shown on /impact/our-impact alongside chapter reports.'],
              ['Annual report highlights', 'Report-page feature metrics updated from this admin area.'],
              ['Recognition pages', 'Consistent numbers across all impact-related public sections.'],
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
