import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { Clock, BarChart3 } from 'lucide-react'

export default async function VolunteerPerformancePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: hours } = await supabase
    .from('volunteer_attendance')
    .select('hours_logged, status, activity_description, date')
    .eq('volunteer_id', user?.id ?? '')
    .order('date', { ascending: false })

  const totalVerified = (hours ?? [])
    .filter((h) => h.status === 'verified')
    .reduce((sum, h) => sum + Number(h.hours_logged), 0)

  const pending = (hours ?? []).filter((h) => h.status === 'pending').length

  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/my-performance"
      badge="My Performance"
      title="Track your volunteer hours and contribution score."
      subtitle="Only admin-verified hours count toward Volunteer of the Month eligibility."
      navItems={volunteerNavItems}
    >
      <div className="grid gap-5 sm:grid-cols-3 mb-6">
        <Card className="border-primary-blue/15 bg-white">
          <CardContent className="px-6 py-6 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-blue/10">
              <Clock className="size-7 text-primary-blue" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-950">{totalVerified}h</p>
              <p className="text-sm text-gray-500">Verified Hours</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary-blue/15 bg-white">
          <CardContent className="px-6 py-6 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-yellow-50">
              <BarChart3 className="size-7 text-yellow-500" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-950">{pending}</p>
              <p className="text-sm text-gray-500">Pending Verification</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary-blue/15 bg-white">
          <CardContent className="px-6 py-6 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-blue/10">
              <BarChart3 className="size-7 text-primary-blue" />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-950">{hours?.length ?? 0}</p>
              <p className="text-sm text-gray-500">Total Sessions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary-blue/15 bg-white">
        <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <CardTitle className="text-2xl font-black text-gray-950">Hours History</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Activity</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {!hours || hours.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-16 text-center text-gray-400">No hours logged yet. Use the Log Hours page to submit your first entry.</td></tr>
                ) : (
                  hours.map((h, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 text-gray-500">{new Date(h.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-900">{h.activity_description}</td>
                      <td className="px-6 py-4 font-bold text-primary-blue">{h.hours_logged}h</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${h.status === 'verified' ? 'bg-green-50 text-green-700 border-green-200' : h.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                          {h.status}
                        </span>
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
