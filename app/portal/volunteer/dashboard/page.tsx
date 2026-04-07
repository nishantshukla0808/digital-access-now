import { BookOpen, CalendarClock, HandHelping, Timer } from 'lucide-react'

import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { PortalStatCard } from '@/components/portal/portal-stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function VolunteerDashboardPage() {
  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/dashboard"
      badge="Volunteer workspace"
      title="Keep volunteers focused on resources, events, and logged impact."
      subtitle="This role stays intentionally simple so volunteers can find what they need fast while the backend later enforces permissions through JWT and role-aware APIs."
      navItems={volunteerNavItems}
    >
      <div className="grid gap-5 xl:grid-cols-4">
        <PortalStatCard label="Training items" value="12" detail="Assigned onboarding and resource materials" icon={BookOpen} />
        <PortalStatCard label="Upcoming events" value="04" detail="Volunteer opportunities in the pipeline" icon={CalendarClock} />
        <PortalStatCard label="Hours logged" value="27.5" detail="Tracked contribution time this quarter" icon={Timer} />
        <PortalStatCard label="Engagement" value="High" detail="Consistent participation across current activities" icon={HandHelping} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Volunteer actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-2">
            {[
              ['View assigned resources', 'See training documents and event support materials approved for volunteers.'],
              ['Register for events', 'Join upcoming events once backend scheduling is connected.'],
              ['Log volunteer hours', 'Submit time entries for later admin verification and reporting.'],
              ['Track progress', 'Monitor participation, materials completed, and future opportunities.'],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                <p className="font-bold text-gray-950">{title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary-blue/15 bg-gray-950 py-0 text-white">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black">This week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {[
              ['Digital literacy prep session', 'Thursday, 4:00 PM'],
              ['Resource packet review', '2 new files available'],
              ['Hours reminder', 'Submit this week before Sunday'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-white/60">{detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}