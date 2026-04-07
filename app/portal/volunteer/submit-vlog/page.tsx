'use client'

import { useState } from 'react'
import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Video } from 'lucide-react'
import { submitVolunteerVlog } from '@/app/portal/submissions'

export default function VolunteerSubmitVlogPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await submitVolunteerVlog(formData)

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
      currentPath="/portal/volunteer/submit-vlog"
      badge="Submit Vlog"
      title="Share impact stories through video."
      subtitle="Submit a YouTube video or direct link to your impact vlog. An admin will review and publish it to the website."
      navItems={volunteerNavItems}
    >
      {submitted ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <CheckCircle2 className="size-16 text-green-500" />
            <p className="text-2xl font-black text-green-800">Vlog Submitted!</p>
            <p className="text-green-700">Your vlog is pending admin review.</p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-2 rounded-full border-green-300 text-green-700">Submit another</Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary-blue/15 bg-white">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-950 flex items-center gap-3">
              <Video className="size-6 text-primary-blue" /> New Vlog
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
                <label className="text-sm font-semibold text-gray-800" htmlFor="title">Vlog Title *</label>
                <Input id="title" name="title" required placeholder="e.g. Impact Stories from the Pakistan Chapter" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="video_url">Video URL (YouTube / Drive) *</label>
                <Input id="video_url" name="video_url" type="url" required placeholder="https://youtube.com/watch?v=..." className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Summarise the story in your vlog and why it matters..."
                  className="flex w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary-blue transition-colors resize-none"
                />
              </div>

              <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl bg-primary-blue text-sm font-bold text-[#04111f] hover:bg-cyan-500">
                {loading ? 'Submitting…' : 'Submit Vlog for Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </PortalShell>
  )
}
