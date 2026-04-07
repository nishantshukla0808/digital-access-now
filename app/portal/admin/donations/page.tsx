import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { DollarSign, TrendingUp, Target, CheckCircle } from 'lucide-react'

export default async function AdminDonationsPage() {
  const supabase = await createClient()

  const [{ data: donationsData }, { data: settings }] = await Promise.all([
    supabase
      .from('donations_log')
      .select('id, donor_name, donor_email, amount, currency, payment_method, status, created_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('donation_settings')
      .select('*')
      .single(),
  ])

  const completed = (donationsData ?? []).filter((d) => d.status === 'completed')
  const totalRaised = completed.reduce((sum, d) => sum + Number(d.amount), 0)
  const goalAmount = settings?.goal_amount ?? 10000

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/donations"
      badge="Donations Dashboard"
      title="Monitor all donation transactions and campaign health."
      subtitle="Live data from your donation campaigns. Configure preset amounts and goals in the settings."
      navItems={adminNavItems}
    >
      {/* Stats Row */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        <PortalStatCard label="Total Raised" value={`$${totalRaised.toLocaleString()}`} detail="Completed transactions" icon={DollarSign} />
        <PortalStatCard label="Campaign Goal" value={`$${goalAmount.toLocaleString()}`} detail={settings?.active_campaign_title ?? 'Active Campaign'} icon={Target} />
        <PortalStatCard label="Completed" value={`${completed.length}`} detail="Successful transactions" icon={CheckCircle} />
        <PortalStatCard label="Progress" value={`${Math.min(Math.round((totalRaised / goalAmount) * 100), 100)}%`} detail="Toward goal" icon={TrendingUp} />
      </div>

      {/* Progress Bar */}
      <Card className="border-primary-blue/15 bg-white mb-6">
        <CardContent className="px-6 py-6">
          <div className="flex items-center justify-between mb-3 text-sm font-semibold text-gray-700">
            <span>{settings?.active_campaign_title ?? 'Campaign'}</span>
            <span>${totalRaised.toLocaleString()} / ${goalAmount.toLocaleString()}</span>
          </div>
          <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary-blue to-primary-purple transition-all duration-700"
              style={{ width: `${Math.min((totalRaised / goalAmount) * 100, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-primary-blue/15 bg-white">
        <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <CardTitle className="text-2xl font-black text-gray-950">All Transactions</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Donor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Method</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {!donationsData || donationsData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                      No donation records yet. Once Stripe/PayPal integration is live, transactions will appear here automatically.
                    </td>
                  </tr>
                ) : (
                  donationsData.map((d) => (
                    <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{d.donor_name}</td>
                      <td className="px-6 py-4 text-gray-600">{d.donor_email}</td>
                      <td className="px-6 py-4 font-bold text-primary-blue">${Number(d.amount).toFixed(2)} {d.currency}</td>
                      <td className="px-6 py-4 text-gray-600">{d.payment_method || '—'}</td>
                      <td className="px-6 py-4">
                        <Badge className={`rounded-full text-xs font-bold border ${d.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : d.status === 'failed' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                          {d.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PortalShell>
  )
}
