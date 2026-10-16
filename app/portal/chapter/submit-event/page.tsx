'use client'

import { useState } from 'react'
import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { CalendarDays, CheckCircle2 } from 'lucide-react'
import { submitChapterEvent } from '@/app/portal/submissions'

const inp = 'w-full px-4 rounded-xl text-sm outline-none'
const inpStyle = { height: '44px', background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }

export default function ChapterSubmitEventPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const result = await submitChapterEvent(formData)
    setLoading(false)
    if (result.error) { setError(result.error) } else { setSubmitted(true) }
  }

  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/submit-event"
      badge="Chapter"
      title="Submit Event"
      subtitle="Events go through admin verification before being published to the public calendar."
      navItems={chapterNavItems}
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <CheckCircle2 className="size-14 mb-4" style={{ color: '#0F5D5E' }} />
          <p className="text-lg font-bold mb-1" style={{ color: '#1F2933' }}>Event Submitted!</p>
          <p className="text-sm mb-5" style={{ color: '#1F2933', opacity: 0.55 }}>Your event is pending admin review.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-xl px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ background: 'rgba(15,93,94,0.08)', color: '#0F5D5E', border: '1px solid rgba(15,93,94,0.2)' }}
          >
            Submit another event
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays className="size-4" style={{ color: '#0F5D5E' }} />
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>New Event</p>
          </div>
          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="title">Event Title *</label>
              {/* name="title" → events.title */}
              <input id="title" name="title" required placeholder="e.g. Digital Skills Workshop — Lahore" className={inp} style={inpStyle} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="description">Event Description *</label>
              {/* name="description" → events.description */}
              <textarea
                id="description" name="description" required rows={5}
                placeholder="Describe the event, target audience, agenda, and expected outcomes..."
                className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="start_date">Start Date &amp; Time *</label>
                {/* name="start_date" → events.start_date */}
                <input id="start_date" name="start_date" type="datetime-local" required className={inp} style={inpStyle} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="end_date">End Date &amp; Time *</label>
                {/* name="end_date" → events.end_date */}
                <input id="end_date" name="end_date" type="datetime-local" required className={inp} style={inpStyle} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="location">Location / Meeting Link *</label>
              {/* name="location" → events.location */}
              <input id="location" name="location" required placeholder="Physical address or Zoom/Meet link" className={inp} style={inpStyle} />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              {loading ? 'Submitting…' : 'Submit Event for Review'}
            </button>
          </form>
        </div>
      )}
    </PortalShell>
  )
}
