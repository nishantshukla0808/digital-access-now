'use client'

import { useState } from 'react'
import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Clock } from 'lucide-react'
import { logVolunteerHours } from '@/app/portal/submissions'

const activityTypes = ['Event Attendance', 'Training Session', 'Community Outreach', 'Content Creation', 'Admin Support', 'Other']

export default function VolunteerLogHoursPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await logVolunteerHours(formData)

    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setSubmitted(true)
    }
  }

  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/log-hours"
      badge="Log Hours"
      title="Log your volunteer hours for admin verification."
      subtitle="Verified hours count toward your total performance score and are used to determine the Volunteer of the Month."
      navItems={volunteerNavItems}
    >
      {submitted ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <CheckCircle2 className="size-16 text-green-500" />
            <p className="text-2xl font-black text-green-800">Hours Logged!</p>
            <p className="text-green-700">Your hours are pending admin verification.</p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-2 rounded-full border-green-300 text-green-700">Log more hours</Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary-blue/15 bg-white">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-950 flex items-center gap-3">
              <Clock className="size-6 text-primary-blue" /> Log Volunteer Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800" htmlFor="activity_type">Activity Type *</label>
                  <select id="activity_type" name="activity_type" required className="flex h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-primary-blue transition-colors">
                    <option value="">Select type</option>
                    {activityTypes.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800" htmlFor="date">Date *</label>
                  <Input id="date" name="date" type="date" required className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="hours_logged">Hours Spent *</label>
                <Input id="hours_logged" name="hours_logged" type="number" min="0.5" max="24" step="0.5" required placeholder="e.g. 2.5" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="activity_description">What did you do? *</label>
                <textarea
                  id="activity_description"
                  name="activity_description"
                  required
                  rows={4}
                  placeholder="Briefly describe the volunteer activity and your contribution..."
                  className="flex w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary-blue transition-colors resize-none"
                />
              </div>

              <Button type="submit" disabled={loading} className="h-12 w-full rounded-full bg-primary-blue text-base font-bold text-footer-black hover:bg-cyan-600">
                {loading ? 'Saving…' : 'Submit Hours for Verification'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </PortalShell>
  )
}
