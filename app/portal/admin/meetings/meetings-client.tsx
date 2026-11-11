'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Loader2, Plus, Trash2, Video, CalendarDays } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { formatIst } from '@/lib/meeting-attendance'
import { createMeeting, deleteMeeting } from './meeting-actions'
import type { MeetingWithCounts } from './page'

const inputStyle = {
  width: '100%', height: '42px', paddingLeft: '12px', paddingRight: '12px',
  borderRadius: '10px', fontSize: '14px', outline: 'none',
  background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933',
} as const

export function MeetingsClient({
  initialMeetings,
  meetingsReady,
}: {
  initialMeetings: MeetingWithCounts[]
  meetingsReady: boolean
}) {
  const [meetings, setMeetings] = useState(initialMeetings)
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleCreate(formData: FormData) {
    startTransition(async () => {
      setNotice(null)
      const result = await createMeeting(formData)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        setNotice({ type: 'ok', msg: 'Meeting created. Open it to import the attendance CSV.' })
        window.location.reload()
      }
    })
  }

  function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}" and all its attendance rows?`)) return
    setDeletingId(id)
    startTransition(async () => {
      setNotice(null)
      const result = await deleteMeeting(id)
      setDeletingId(null)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        setMeetings((prev) => prev.filter((m) => m.id !== id))
        setNotice({ type: 'ok', msg: 'Meeting deleted.' })
      }
    })
  }

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/meetings"
      badge="Admin"
      title="Meeting Attendance"
      subtitle="Weekly / bi-weekly Google Meet attendance — who joined late, who left early."
      navItems={adminNavItems}
    >
      {notice && (
        <div className="rounded-xl px-5 py-3 text-sm font-medium mb-5"
          style={notice.type === 'ok'
            ? { background: 'rgba(15,93,94,0.08)', color: '#0F5D5E' }
            : { background: '#fef2f2', color: '#b91c1c' }}>
          {notice.msg}
        </div>
      )}

      {!meetingsReady ? (
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-2" style={{ color: '#1F2933' }}>Meetings tables are not in the database yet</p>
          <p className="text-sm" style={{ color: '#1F2933', opacity: 0.65 }}>
            Run <span className="font-mono text-xs">supabase/add-meeting-attendance.sql</span> in the
            Supabase SQL Editor, then reload this page. The file is additive and safe to re-run.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          {/* Create a meeting */}
          <div className="rounded-xl p-6 h-fit" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <p className="text-sm font-bold mb-5" style={{ color: '#1F2933' }}>Schedule a meeting</p>
            <form action={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Title *</label>
                <input name="title" required placeholder="e.g. Weekly Sync — 14 Nov 2026" style={inputStyle} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Start (IST) *</label>
                  <input name="scheduled_start" type="datetime-local" required style={inputStyle} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>End (IST) *</label>
                  <input name="scheduled_end" type="datetime-local" required style={inputStyle} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Google Meet link (optional)</label>
                <input name="meet_link" placeholder="https://meet.google.com/xxx-yyyy-zzz" style={inputStyle} />
              </div>
              <p className="text-xs" style={{ color: '#1F2933', opacity: 0.5 }}>
                Times are entered in IST. Late means joining more than 10 minutes after the
                scheduled start; leaving early means leaving more than 10 minutes before the end.
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
              >
                {isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                {isPending ? 'Saving...' : 'Create meeting'}
              </button>
            </form>
          </div>

          {/* Meetings list */}
          <div className="rounded-xl overflow-hidden h-fit" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
              <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Meetings</p>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#0B1A1A', color: '#ffffff' }}>{meetings.length} total</span>
            </div>
            {meetings.length === 0 ? (
              <p className="px-5 py-10 text-sm text-center" style={{ color: '#1F2933', opacity: 0.4 }}>
                No meetings yet — schedule one on the left, then open it to import the attendance CSV.
              </p>
            ) : (
              <div className="divide-y" style={{ borderColor: 'rgba(15,93,94,0.05)' }}>
                {meetings.map((m) => (
                  <div key={m.id} className="px-5 py-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="size-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: 'rgba(15,93,94,0.1)' }}>
                        <CalendarDays className="size-5" style={{ color: '#0F5D5E' }} />
                      </div>
                      <div className="min-w-0">
                        <Link href={`/portal/admin/meetings/${m.id}`} className="font-bold text-sm truncate block hover:underline" style={{ color: '#1F2933' }}>
                          {m.title}
                        </Link>
                        <p className="text-xs mt-0.5" style={{ color: '#1F2933', opacity: 0.55 }}>
                          {formatIst(new Date(m.scheduled_start))} – {formatIst(new Date(m.scheduled_end))}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: '#1F2933', opacity: 0.55 }}>
                          {m.total} attended · {m.late} late · {m.leftEarly} left early
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {m.meet_link && (
                        <a href={m.meet_link} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
                          style={{ background: 'rgba(77,183,229,0.1)', color: '#238C91' }}>
                          <Video className="size-3.5" /> Meet
                        </a>
                      )}
                      <Link href={`/portal/admin/meetings/${m.id}`}
                        className="rounded-lg px-3 py-1.5 text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}>
                        Open
                      </Link>
                      <button
                        disabled={deletingId === m.id}
                        onClick={() => handleDelete(m.id, m.title)}
                        className="flex items-center justify-center size-8 rounded-lg disabled:opacity-40"
                        style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
                        aria-label={`Delete ${m.title}`}
                      >
                        {deletingId === m.id ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </PortalShell>
  )
}
