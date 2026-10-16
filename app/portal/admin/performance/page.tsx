import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { createClient } from '@/lib/supabase/server'
import { Trophy, Clock } from 'lucide-react'

export default async function AdminPerformancePage() {
  const supabase = await createClient()

  const { data: hoursData } = await supabase
    .from('volunteer_attendance')
    .select('volunteer_id, hours_logged, status, date, activity_description')
    .eq('status', 'verified')
    .order('hours_logged', { ascending: false })

  const { data: volunteers } = await supabase
    .from('users')
    .select('id, custom_id, full_name, email')
    .eq('role', 'VOLUNTEER')

  const volunteerMap = new Map<string, { total: number; sessions: number }>()
  hoursData?.forEach((row) => {
    const existing = volunteerMap.get(row.volunteer_id) ?? { total: 0, sessions: 0 }
    volunteerMap.set(row.volunteer_id, {
      total: existing.total + Number(row.hours_logged),
      sessions: existing.sessions + 1,
    })
  })

  const ranked = (volunteers ?? [])
    .map((v) => ({
      ...v,
      hours: volunteerMap.get(v.id)?.total ?? 0,
      sessions: volunteerMap.get(v.id)?.sessions ?? 0,
    }))
    .sort((a, b) => b.hours - a.hours)

  const topVolunteer = ranked[0]

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/performance"
      badge="Admin"
      title="Volunteer Performance"
      subtitle="Ranked by total verified hours. Top contributor is highlighted."
      navItems={adminNavItems}
    >
      {/* Volunteer of the Month */}
      {topVolunteer && topVolunteer.hours > 0 && (
        <div className="rounded-xl p-6 mb-5 flex flex-wrap items-center gap-5" style={{ background: '#0B1A1A' }}>
          <div className="flex size-16 items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <Trophy className="size-8 text-yellow-400" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Top Contributor</p>
            <p className="text-2xl font-bold text-white">{topVolunteer.full_name || topVolunteer.email}</p>
            <p className="text-sm mt-0.5 font-mono" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {topVolunteer.custom_id} · {topVolunteer.hours}h verified · {topVolunteer.sessions} sessions
            </p>
          </div>
        </div>
      )}

      {/* Ranked table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
                {['Rank', 'Credential ID', 'Name', 'Verified Hours', 'Sessions'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranked.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-16 text-center text-sm" style={{ color: '#1F2933', opacity: 0.4 }}>No volunteers or verified hours yet.</td></tr>
              ) : (
                ranked.map((vol, i) => (
                  <tr key={vol.id} style={{ borderBottom: '1px solid rgba(15,93,94,0.05)' }}>
                    <td className="px-5 py-4 font-semibold">
                      {i === 0 ? <span className="text-yellow-500 font-black">1st</span>
                        : i === 1 ? <span className="font-black" style={{ color: '#94a3b8' }}>2nd</span>
                        : i === 2 ? <span className="font-black" style={{ color: '#b45309' }}>3rd</span>
                        : <span style={{ color: '#1F2933', opacity: 0.5 }}>#{i + 1}</span>}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs font-bold" style={{ color: '#0F5D5E' }}>{vol.custom_id}</td>
                    <td className="px-5 py-4 font-semibold" style={{ color: '#1F2933' }}>{vol.full_name || vol.email}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 font-bold text-sm" style={{ color: '#0F5D5E' }}>
                        <Clock className="size-3.5" />{vol.hours}h
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: '#1F2933', opacity: 0.6 }}>{vol.sessions}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  )
}
