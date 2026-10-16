import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { createClient } from '@/lib/supabase/server'
import { Clock, BarChart3 } from 'lucide-react'

const statusBadge = (status: string) => {
  if (status === 'verified') return { bg: 'rgba(15,93,94,0.1)',   color: '#0F5D5E' }
  if (status === 'rejected') return { bg: 'rgba(220,38,38,0.08)', color: '#dc2626' }
  return                              { bg: 'rgba(234,179,8,0.1)', color: '#b45309' }
}

export default async function VolunteerPerformancePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // DB query preserved exactly
  const { data: hours } = await supabase
    .from('volunteer_attendance')
    .select('hours_logged, status, activity_description, date')
    .eq('volunteer_id', user?.id ?? '')
    .order('date', { ascending: false })

  const totalVerified = (hours ?? [])
    .filter((h) => h.status === 'verified')
    .reduce((sum, h) => sum + Number(h.hours_logged), 0)

  const pending = (hours ?? []).filter((h) => h.status === 'pending').length

  const statCards = [
    { label: 'Verified Hours', value: `${totalVerified}h`, icon: Clock,     iconBg: 'rgba(15,93,94,0.1)',   iconColor: '#0F5D5E' },
    { label: 'Pending',        value: `${pending}`,       icon: BarChart3,  iconBg: 'rgba(234,179,8,0.1)', iconColor: '#b45309' },
    { label: 'Total Sessions', value: `${hours?.length ?? 0}`, icon: BarChart3, iconBg: 'rgba(15,93,94,0.1)', iconColor: '#0F5D5E' },
  ]

  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/my-performance"
      badge="Volunteer"
      title="My Performance"
      subtitle="Only admin-verified hours count toward Volunteer of the Month eligibility."
      navItems={volunteerNavItems}
    >
      <div className="grid gap-4 sm:grid-cols-3 mb-5">
        {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="rounded-xl p-5 flex items-center gap-4" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <div className="flex size-12 items-center justify-center rounded-xl shrink-0" style={{ background: iconBg }}>
              <Icon className="size-6" style={{ color: iconColor }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: '#1F2933' }}>{value}</p>
              <p className="text-xs" style={{ color: '#1F2933', opacity: 0.55 }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
                {['Date', 'Activity', 'Hours', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!hours || hours.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-16 text-center text-sm" style={{ color: '#1F2933', opacity: 0.4 }}>No hours logged yet. Use the Log Hours page to submit your first entry.</td></tr>
              ) : (
                hours.map((h, i) => {
                  const s = statusBadge(h.status)
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(15,93,94,0.05)' }}>
                      <td className="px-5 py-4 text-xs" style={{ color: '#1F2933', opacity: 0.5 }}>{new Date(h.date).toLocaleDateString()}</td>
                      <td className="px-5 py-4" style={{ color: '#1F2933' }}>{h.activity_description}</td>
                      <td className="px-5 py-4 font-bold" style={{ color: '#0F5D5E' }}>{h.hours_logged}h</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{h.status}</span>
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
