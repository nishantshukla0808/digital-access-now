'use client'

import { useState } from 'react'
import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CheckCircle2, Upload } from 'lucide-react'
import { submitChapterReport } from '@/app/portal/submissions'

export default function ChapterSubmitReportPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await submitChapterReport(formData)

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
      currentPath="/portal/chapter/submit-report"
      badge="Submit Report"
      title="Submit a chapter report for admin review."
      subtitle="Your report will be reviewed by an admin before being published to the public website under 'News' and 'Impact Stories'."
      navItems={chapterNavItems}
    >
      {submitted ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <CheckCircle2 className="size-16 text-green-500" />
            <p className="text-2xl font-black text-green-800">Report Submitted!</p>
            <p className="text-green-700">Your report is now pending admin review. You'll be notified once it's published.</p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-2 rounded-full border-green-300 text-green-700">
              Submit another report
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary-blue/15 bg-white">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-950">New Chapter Report</CardTitle>
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
                  <label className="text-sm font-semibold text-gray-800" htmlFor="title">Report Title *</label>
                  <Input id="title" name="title" required placeholder="e.g. Digital Literacy Training in Lahore" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800" htmlFor="icon">Icon Emoji</label>
                  <Input id="icon" name="icon" placeholder="e.g. 📚 🌐 🚀" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="excerpt">Short Description *</label>
                <Input id="excerpt" name="excerpt" required placeholder="1-2 sentences summarising the report (shown in cards on the site)" className="h-12 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800" htmlFor="content">Full Content *</label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows={8}
                  placeholder="Write your full report here. Describe the activities, outcomes, and impact..."
                  className="flex w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary-blue transition-colors resize-none"
                />
              </div>

              <Button type="submit" disabled={loading} className="h-12 w-full rounded-full bg-primary-blue text-base font-bold text-footer-black hover:bg-cyan-600 gap-2">
                {loading ? 'Submitting…' : <><Upload className="size-4" /> Submit for Review</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </PortalShell>
  )
}
