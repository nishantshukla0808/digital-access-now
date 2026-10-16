'use client'

import { useState } from 'react'
import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { CheckCircle2, Clock } from 'lucide-react'
import { logVolunteerHours } from '@/app/portal/submissions'

const activityTypes = ['Event Attendance', 'Training Session', 'Community Outreach', 'Content Creation', 'Admin Support', 'Other']
const inp = 'w-full px-4 rounded-xl text-sm outline-none'
const inpStyle = { height: '44px', background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }

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
    if (result.error) { setError(result.error) } else { setSubmitted(true) }
  }

  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/log-hours"
      badge="Volunteer"
      title="Log Hours"
      subtitle="Verified hours count toward your performance score and Volunteer of the Month."
      navItems={volunteerNavItems}
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <CheckCircle2 className="size-14 mb-4" style={{ color: '#0F5D5E' }} />
          <p className="text-lg font-bold mb-1" style={{ color: '#1F2933' }}>Hours Logged!</p>
          <p className="text-sm mb-5" style={{ color: '#1F2933', opacity: 0.55 }}>Your hours are pending admin verification.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-xl px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ background: 'rgba(15,93,94,0.08)', color: '#0F5D5E', border: '1px solid rgba(15,93,94,0.2)' }}
          >
            Log more hours
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <div className="flex items-center gap-2 mb-5">
            <Clock className="size-4" style={{ color: '#0F5D5E' }} />
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Log Volunteer Hours</p>
          </div>
          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="activity_type">Activity Type *</label>
                {/* name="activity_type" preserved for DB mapping */}
                <select id="activity_type" name="activity_type" required className="w-full px-4 rounded-xl text-sm outline-none" style={inpStyle}>
                  <option value="">Select type</option>
                  {activityTypes.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="date">Date *</label>
                {/* name="date" preserved */}
                <input id="date" name="date" type="date" required className={inp} style={inpStyle} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="hours_logged">Hours Spent *</label>
              {/* name="hours_logged" preserved for DB column */}
              <input id="hours_logged" name="hours_logged" type="number" min="0.5" max="24" step="0.5" required placeholder="e.g. 2.5" className={inp} style={inpStyle} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="activity_description">What did you do? *</label>
              {/* name="activity_description" preserved */}
              <textarea
                id="activity_description" name="activity_description" required rows={4}
                placeholder="Briefly describe the volunteer activity and your contribution..."
                className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              {loading ? 'Saving…' : 'Submit Hours for Verification'}
            </button>
          </form>
        </div>
      )}
    </PortalShell>
  )
}
