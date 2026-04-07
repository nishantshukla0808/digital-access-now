'use client'

import { useState } from 'react'
import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CalendarDays, CheckCircle2 } from 'lucide-react'
import { submitChapterEvent } from '@/app/portal/submissions'

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
    if (result.error) {
      setError(result.error)
    } else {
      setSubmitted(true)
    }
  }

  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/submit-event"
      badge="Submit Event"
      title="Propose an event for your chapter."
      subtitle="Events go through admin verification before being published to the public website calendar."
      navItems={chapterNavItems}
    >
      {submitted ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <CheckCircle2 className="size-16 text-green-500" />
            <p className="text-2xl font-black text-green-800">Event Submitted!</p>
            <p className="text-green-700">Your event is pending admin review.</p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-2 rounded-full border-green-300 text-green-700">
              Submit another event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary-blue/15 bg-white">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-950 flex items-center gap-3">
              <CalendarDays className="size-6 text-primary-blue" /> New Event
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="title">Event Title *</label>
                <Input id="title" name="title" required placeholder="e.g. Digital Skills Workshop — Lahore" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="description">Event Description *</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  placeholder="Describe the event, target audience, agenda, and expected outcomes..."
                  className="flex w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary-blue transition-colors resize-none"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800" htmlFor="start_date">Start Date & Time *</label>
                  <Input id="start_date" name="start_date" type="datetime-local" required className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800" htmlFor="end_date">End Date & Time *</label>
                  <Input id="end_date" name="end_date" type="datetime-local" required className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="location">Location / Meeting Link *</label>
                <Input id="location" name="location" required placeholder="Physical address or Zoom/Meet link" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <Button type="submit" disabled={loading} className="h-12 w-full rounded-full bg-primary-blue text-base font-bold text-footer-black hover:bg-cyan-600">
                {loading ? 'Submitting…' : 'Submit Event for Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </PortalShell>
  )
}
