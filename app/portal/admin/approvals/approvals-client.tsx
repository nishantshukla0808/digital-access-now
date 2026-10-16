'use client'

import { useState, useTransition } from 'react'
import { CheckCircle2, XCircle, FileText, CalendarDays, BookOpen, Video, Clock } from 'lucide-react'
import { approveOrReject } from '@/app/portal/admin/admin-actions'
import type { PendingItem } from './page'

const typeConfig = {
  report:   { icon: FileText,    badge: 'Chapter Report',      bg: 'rgba(15,93,94,0.08)',    color: '#0F5D5E' },
  event:    { icon: CalendarDays, badge: 'Chapter Event',      bg: 'rgba(77,183,229,0.1)',   color: '#238C91' },
  resource: { icon: BookOpen,    badge: 'Volunteer Resource',  bg: 'rgba(15,93,94,0.08)',    color: '#0F5D5E' },
  vlog:     { icon: Video,       badge: 'Volunteer Vlog',      bg: 'rgba(234,179,8,0.1)',    color: '#b45309' },
  hours:    { icon: Clock,       badge: 'Hours Log',           bg: 'rgba(234,179,8,0.1)',    color: '#b45309' },
}

export function ApprovalsClient({ initialItems }: { initialItems: PendingItem[] }) {
  const [items, setItems] = useState(initialItems)
  const [reviewedCount, setReviewedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleAction(item: PendingItem, action: 'published' | 'rejected' | 'verified') {
    startTransition(async () => {
      setError(null)
      const result = await approveOrReject(item.table, item.id, action)
      if (result.error) { setError(result.error); return }
      setItems((prev) => prev.filter((i) => i.id !== item.id))
      setReviewedCount((c) => c + 1)
    })
  }

  return (
    <div className="space-y-3">
      {reviewedCount > 0 && (
        <div className="rounded-xl px-5 py-3 text-sm font-medium" style={{ background: 'rgba(15,93,94,0.08)', color: '#0F5D5E' }}>
          {reviewedCount} item{reviewedCount > 1 ? 's' : ''} reviewed and updated.
        </div>
      )}
      {error && (
        <div className="rounded-xl px-5 py-3 text-sm font-medium" style={{ background: '#fef2f2', color: '#b91c1c' }}>
          Error: {error}
        </div>
      )}

      {items.map((item) => {
        const cfg = typeConfig[item.type as keyof typeof typeConfig]
        const Icon = cfg?.icon ?? CheckCircle2
        const approveAction = item.type === 'hours' ? 'verified' : 'published'

        return (
          <div
            key={item.id}
            className="flex flex-col lg:flex-row overflow-hidden rounded-xl"
            style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}
          >
            {/* Content */}
            <div className="flex-1 p-5">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: cfg?.bg, color: cfg?.color }}>
                  <Icon className="size-3" /> {cfg?.badge}
                </span>
                <span className="text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>
                  by {item.submittedBy} · {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: '#1F2933' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#1F2933', opacity: 0.6 }}>{item.excerpt}</p>
            </div>

            {/* Actions */}
            <div
              className="flex flex-row lg:flex-col items-center justify-center gap-2 p-4 lg:border-l"
              style={{ background: '#FAFAF7', borderColor: 'rgba(15,93,94,0.08)' }}
            >
              <button
                onClick={() => handleAction(item, approveAction)}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: '#0F5D5E' }}
              >
                <CheckCircle2 className="size-4" />
                {item.type === 'hours' ? 'Verify' : 'Publish'}
              </button>
              <button
                onClick={() => handleAction(item, 'rejected')}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
              >
                <XCircle className="size-4" /> Reject
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
