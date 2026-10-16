'use client'

import { useState } from 'react'
import { chapterNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { CheckCircle2, Upload } from 'lucide-react'
import { submitChapterReport } from '@/app/portal/submissions'

// ─── shared input style ────────────────────────────────────────────────────────
const inp = 'w-full px-4 rounded-xl text-sm outline-none'
const inpStyle = { height: '44px', background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }

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
    if (result.error) { setError(result.error) } else { setSubmitted(true) }
  }

  return (
    <PortalShell
      role="chapter"
      currentPath="/portal/chapter/submit-report"
      badge="Chapter"
      title="Submit Report"
      subtitle="Your report will be reviewed by an admin before being published to the public website."
      navItems={chapterNavItems}
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <CheckCircle2 className="size-14 mb-4" style={{ color: '#0F5D5E' }} />
          <p className="text-lg font-bold mb-1" style={{ color: '#1F2933' }}>Report Submitted!</p>
          <p className="text-sm mb-5" style={{ color: '#1F2933', opacity: 0.55 }}>Your report is pending admin review.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-xl px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ background: 'rgba(15,93,94,0.08)', color: '#0F5D5E', border: '1px solid rgba(15,93,94,0.2)' }}
          >
            Submit another report
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-5" style={{ color: '#1F2933' }}>New Chapter Report</p>
          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="title">Report Title *</label>
                <input id="title" name="title" required placeholder="e.g. Digital Literacy Training in Lahore" className={inp} style={inpStyle} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="icon">Icon Emoji</label>
                <input id="icon" name="icon" placeholder="e.g. 📚 🌐 🚀" className={inp} style={inpStyle} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="excerpt">Short Description *</label>
              <input id="excerpt" name="excerpt" required placeholder="1-2 sentences summarising the report" className={inp} style={inpStyle} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="content">Full Content *</label>
              <textarea
                id="content" name="content" required rows={8}
                placeholder="Write your full report here. Describe the activities, outcomes, and impact..."
                className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              {loading ? 'Submitting…' : <><Upload className="size-4" /> Submit for Review</>}
            </button>
          </form>
        </div>
      )}
    </PortalShell>
  )
}
