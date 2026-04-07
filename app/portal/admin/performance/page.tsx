import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { Trophy, Star, Clock } from 'lucide-react'

export default async function AdminPerformancePage() {
  const supabase = await createClient()

  // Aggregate volunteer hours by volunteer_id (only verified hours)
  const { data: hoursData } = await supabase
    .from('volunteer_attendance')
    .select('volunteer_id, hours_logged, status, date, activity_description')
    .eq('status', 'verified')
    .order('hours_logged', { ascending: false })

  // Get all volunteers
  const { data: volunteers } = await supabase
    .from('users')
    .select('id, custom_id, full_name, email')
    .eq('role', 'VOLUNTEER')

  // Aggregate hours per volunteer
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
      badge="Volunteer Performance"
      title="Track hours, sessions, and top contributors."
      subtitle="Volunteer of the Month is determined by total verified hours. Admin can verify submitted hours from this view."
      navItems={adminNavItems}
    >
      {topVolunteer && topVolunteer.hours > 0 && (
        <Card className="mb-6 border-0 bg-linear-to-r from-primary-blue to-primary-purple text-white overflow-hidden">
          <CardContent className="px-8 py-8 flex flex-wrap items-center gap-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-white/20 text-yellow-300">
              <Trophy className="size-10" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/70">🏆 Volunteer of the Month</p>
              <p className="text-3xl font-black mt-1">{topVolunteer.full_name || topVolunteer.email}</p>
              <p className="text-white/80 mt-1 font-mono text-sm">{topVolunteer.custom_id} · {topVolunteer.hours} verified hours · {topVolunteer.sessions} sessions</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary-blue/15 bg-white">
        <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <CardTitle className="text-2xl font-black text-gray-950">All Volunteers Ranked</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Credential ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Verified Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Sessions</th>
                </tr>
              </thead>
              <tbody>
                {ranked.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                      No volunteers yet or no verified attendance records.
                    </td>
                  </tr>
                ) : (
                  ranked.map((vol, i) => (
                    <tr key={vol.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4">
                        {i === 0 ? <span className="text-yellow-500 font-black text-lg">🥇</span>
                          : i === 1 ? <span className="text-gray-400 font-black">🥈</span>
                          : i === 2 ? <span className="text-amber-600 font-black">🥉</span>
                          : <span className="text-gray-400 font-semibold">#{i + 1}</span>}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs font-bold text-primary-blue">{vol.custom_id}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{vol.full_name || vol.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 font-bold text-primary-blue">
                          <Clock className="size-3.5" />{vol.hours}h
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{vol.sessions}</td>
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
