'use client'

import { useState } from 'react'
import { volunteerNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { BookOpen, CheckCircle2 } from 'lucide-react'
import { uploadVolunteerResource } from '@/app/portal/submissions'

const categories = ['Digital Literacy', 'Device Training', 'Internet Safety', 'Software Tools', 'Leadership', 'Other']
const inp = 'w-full px-4 rounded-xl text-sm outline-none'
const inpStyle = { height: '44px', background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }

export default function VolunteerSubmitResourcePage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const result = await uploadVolunteerResource(formData)
    setLoading(false)
    if (result.error) { setError(result.error) } else { setSubmitted(true) }
  }

  return (
    <PortalShell
      role="volunteer"
      currentPath="/portal/volunteer/submit-resource"
      badge="Volunteer"
      title="Submit Resource"
      subtitle="Your resource will be reviewed by an admin before being published to the resources library."
      navItems={volunteerNavItems}
    >
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <CheckCircle2 className="size-14 mb-4" style={{ color: '#0F5D5E' }} />
          <p className="text-lg font-bold mb-1" style={{ color: '#1F2933' }}>Resource Submitted!</p>
          <p className="text-sm mb-5" style={{ color: '#1F2933', opacity: 0.55 }}>Your resource is pending admin review.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-xl px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ background: 'rgba(15,93,94,0.08)', color: '#0F5D5E', border: '1px solid rgba(15,93,94,0.2)' }}
          >
            Submit another
          </button>
        </div>
      ) : (
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="size-4" style={{ color: '#0F5D5E' }} />
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>New Resource</p>
          </div>
          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="title">Resource Title *</label>
              {/* name="title" → resources.title */}
              <input id="title" name="title" required placeholder="e.g. Digital Literacy Starter Guide" className={inp} style={inpStyle} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="category">Category *</label>
              {/* name="category" → resources.category */}
              <select id="category" name="category" required className="w-full px-4 rounded-xl text-sm outline-none" style={inpStyle}>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="description">Description</label>
              {/* name="description" → resources.description */}
              <textarea
                id="description" name="description" rows={4}
                placeholder="Briefly describe what this resource covers and who it's for..."
                className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }} htmlFor="file">Upload File (PDF, DOCX, PPTX — max 10MB) *</label>
              {/* name="file" → file upload, preserved accept types */}
              <input id="file" name="file" type="file" required accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-2 file:text-xs file:font-bold file:cursor-pointer rounded-xl px-3 py-2.5"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full h-11 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              {loading ? 'Uploading…' : 'Submit Resource for Review'}
            </button>
          </form>
        </div>
      )}
    </PortalShell>
  )
}
