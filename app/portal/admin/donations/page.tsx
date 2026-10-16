import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDonationsPage() {
  const supabase = await createClient()

  const [{ data: donationsData }, { data: settings }] = await Promise.all([
    supabase
      .from('donations_log')
      .select('id, donor_name, donor_email, amount, currency, payment_method, status, created_at')
      .order('created_at', { ascending: false }),
    supabase.from('donation_settings').select('*').single(),
  ])

  const completed    = (donationsData ?? []).filter((d) => d.status === 'completed')
  const totalRaised  = completed.reduce((sum, d) => sum + Number(d.amount), 0)
  const goalAmount   = settings?.goal_amount ?? 10000
  const progress     = Math.min(Math.round((totalRaised / goalAmount) * 100), 100)

  const statusBadge = (status: string) => {
    if (status === 'completed') return { bg: 'rgba(15,93,94,0.1)',   color: '#0F5D5E' }
    if (status === 'failed')    return { bg: 'rgba(220,38,38,0.08)', color: '#dc2626' }
    return                               { bg: 'rgba(234,179,8,0.1)', color: '#b45309' }
  }

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/donations"
      badge="Admin"
      title="Donations"
      subtitle="Live data from your donation campaigns."
      navItems={adminNavItems}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-5">
        <PortalStatCard label="Total raised"   value={`$${totalRaised.toLocaleString()}`}                                        detail="Completed transactions"           icon="DollarSign"  />
        <PortalStatCard label="Campaign goal"  value={`$${goalAmount.toLocaleString()}`}                                          detail={settings?.active_campaign_title ?? 'Active campaign'} icon="Target" />
        <PortalStatCard label="Completed"      value={`${completed.length}`}                                                      detail="Successful transactions"         icon="CheckCircle" />
        <PortalStatCard label="Progress"       value={`${progress}%`}                                                             detail="Toward goal"                     icon="TrendingUp"  />
      </div>

      {/* Progress bar */}
      <div className="rounded-xl p-5 mb-5" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        <div className="flex items-center justify-between mb-3 text-sm font-semibold" style={{ color: '#1F2933' }}>
          <span>{settings?.active_campaign_title ?? 'Campaign'}</span>
          <span>${totalRaised.toLocaleString()} / ${goalAmount.toLocaleString()}</span>
        </div>
        <div className="h-3 w-full rounded-full overflow-hidden" style={{ background: 'rgba(15,93,94,0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #0F5D5E, #4DB7E5)' }}
          />
        </div>
      </div>

      {/* Transactions table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
                {['Donor', 'Email', 'Amount', 'Method', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!donationsData || donationsData.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center text-sm" style={{ color: '#1F2933', opacity: 0.4 }}>No donation records yet. Transactions will appear here once payment integration is live.</td></tr>
              ) : (
                donationsData.map((d) => {
                  const s = statusBadge(d.status)
                  return (
                    <tr key={d.id} style={{ borderBottom: '1px solid rgba(15,93,94,0.05)' }}>
                      <td className="px-5 py-4 font-semibold" style={{ color: '#1F2933' }}>{d.donor_name}</td>
                      <td className="px-5 py-4" style={{ color: '#1F2933', opacity: 0.65 }}>{d.donor_email}</td>
                      <td className="px-5 py-4 font-bold" style={{ color: '#0F5D5E' }}>${Number(d.amount).toFixed(2)} {d.currency}</td>
                      <td className="px-5 py-4" style={{ color: '#1F2933', opacity: 0.65 }}>{d.payment_method || '—'}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{d.status}</span>
                      </td>
                      <td className="px-5 py-4 text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>
                        {new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  )
}
