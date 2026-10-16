'use client'

import { useState, useTransition } from 'react'
import { CircleDollarSign, HeartHandshake, Target, TrendingUp, Loader2, Save } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { updateSiteMetric } from '../admin-actions'

type Metrics = Record<string, string>

const inp = 'w-full px-4 rounded-xl text-sm outline-none'
const inpStyle = { height: '42px', background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }

export function FundraisingClient({ metrics }: { metrics: Metrics }) {
  const [values, setValues] = useState(metrics)
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleChange(key: string, value: string) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  // All metric keys preserved exactly for DB mapping
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
      badge="Admin"
      title="Fundraising"
      subtitle="Changes are saved to the database and update the public donation page immediately."
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

      <div className="grid gap-4 xl:grid-cols-4 mb-5">
        {/* PortalStatCard values are display-only, keys preserved for reference */}
        <PortalStatCard label="Raised"        value={m.donation_raised ?? '—'} detail="Campaign total"          icon="CircleDollarSign" />
        <PortalStatCard label="Donors"        value={m.donor_count ?? '—'}    detail="Total supporters"         icon="HeartHandshake"   />
        <PortalStatCard label="Monthly goal"  value={m.monthly_goal ?? '—'}   detail="Monthly giving target"   icon="Target"           />
        <PortalStatCard label="Devices funded" value={m.devices_funded ?? '—'} detail="Devices from donations"  icon="TrendingUp"       />
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Editor — all keys (donation_raised, donor_count, monthly_goal, devices_funded, campaign_message) preserved */}
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Donation page content</p>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(15,93,94,0.1)', color: '#0F5D5E' }}>Live DB</span>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { key: 'donation_raised', label: 'Headline total raised' },
                { key: 'donor_count',     label: 'Total donors' },
                { key: 'monthly_goal',    label: 'Monthly giving goal' },
                { key: 'devices_funded',  label: 'Devices funded' },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>{label}</label>
                  <input value={m[key] ?? ''} onChange={e => handleChange(key, e.target.value)} className={inp} style={inpStyle} />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Primary campaign message</label>
              {/* key="campaign_message" preserved */}
              <textarea
                value={m.campaign_message ?? ''}
                onChange={e => handleChange('campaign_message', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>
            <button
              onClick={handleSave} disabled={isPending}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {isPending ? 'Saving…' : 'Save fundraising metrics'}
            </button>
          </div>
        </div>

        {/* Info panel */}
        <div className="rounded-xl p-6" style={{ background: '#0B1A1A' }}>
          <p className="text-sm font-bold text-white mb-5">What these control</p>
          <div className="space-y-3">
            {[
              ['Hero totals', 'Top-level fundraising numbers and impact statements on the donation page.'],
              ['Preset amounts', 'Suggested donation values and monthly/one-time defaults.'],
              ['Campaign message', 'The primary call-to-action text shown to donors.'],
              ['Devices funded', 'Displayed on the donation and impact pages.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="font-semibold text-sm text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PortalShell>
  )
}
