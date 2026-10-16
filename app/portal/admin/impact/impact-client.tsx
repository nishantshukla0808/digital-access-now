'use client'

import { useState, useTransition } from 'react'
import { Globe2, MonitorSmartphone, Sparkles, Users2, Loader2, Save } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { updateSiteMetric } from '../admin-actions'

type Metrics = Record<string, string>

const inputStyle = {
  width: '100%', height: '42px', paddingLeft: '12px', paddingRight: '12px',
  borderRadius: '10px', fontSize: '14px', outline: 'none',
  background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933',
} as const

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
      badge="Admin"
      title="Impact Metrics"
      subtitle="Changes are saved to the database and reflected on the public site immediately."
      navItems={adminNavItems}
    >
      {notice && (
        <div className="rounded-xl px-5 py-3 text-sm font-medium mb-5"
          style={notice.type === 'ok'
            ? { background: 'rgba(15,93,94,0.08)', color: '#0F5D5E' }
            : { background: '#fef2f2', color: '#b91c1c' }}>
          {notice.msg}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <PortalStatCard label="Lives empowered"    value={m.lives_empowered ?? '—'}    detail="Headline stat on impact page"     icon="Users2"          />
        <PortalStatCard label="Devices distributed" value={m.devices_distributed ?? '—'} detail="Public devices impact metric"    icon="MonitorSmartphone"/>
        <PortalStatCard label="Communities served" value={m.communities_served ?? '—'} detail="Community reach shown on site"    icon="Globe2"           />
        <PortalStatCard label="Countries active"   value={m.countries_active ?? '—'}   detail="Global reach figure"             icon="Sparkles"         />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Editor */}
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Metric editor</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(15,93,94,0.1)', color: '#0F5D5E' }}>Live DB</span>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { key: 'lives_empowered', label: 'Lives empowered' },
                { key: 'devices_distributed', label: 'Devices distributed' },
                { key: 'communities_served', label: 'Communities served' },
                { key: 'countries_active', label: 'Countries active' },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>{label}</label>
                  <input value={m[key] ?? ''} onChange={e => handleChange(key, e.target.value)} style={inputStyle} />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Impact summary</label>
              <textarea
                value={m.impact_summary ?? ''}
                onChange={e => handleChange('impact_summary', e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl text-sm resize-none outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {isPending ? 'Saving…' : 'Save & publish'}
            </button>
          </div>
        </div>

        {/* Info panel */}
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-5" style={{ color: '#1F2933' }}>Where these appear</p>
          <div className="space-y-3">
            {[
              ['Homepage stat strip', 'The headline numbers on the main landing page and About sections.'],
              ['Impact story cards', 'Figures shown on /impact/our-impact alongside chapter reports.'],
              ['Annual report highlights', 'Report-page feature metrics updated from this admin area.'],
              ['Recognition pages', 'Consistent numbers across all impact-related public sections.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.08)' }}>
                <p className="font-semibold text-sm" style={{ color: '#1F2933' }}>{title}</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: '#1F2933', opacity: 0.55 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  )
}
