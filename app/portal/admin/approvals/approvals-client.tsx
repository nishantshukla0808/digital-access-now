'use client'

import { useState, useTransition } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, XCircle, FileText, CalendarDays, BookOpen, Video, Clock } from 'lucide-react'
import { approveOrReject } from '@/app/portal/admin/admin-actions'
import type { PendingItem } from './page'

const typeConfig = {
  report: { icon: FileText, color: 'bg-blue-50 text-blue-700 border-blue-200', badge: 'Chapter Report' },
  event: { icon: CalendarDays, color: 'bg-green-50 text-green-700 border-green-200', badge: 'Chapter Event' },
  resource: { icon: BookOpen, color: 'bg-primary-blue/10 text-primary-blue border-primary-blue/20', badge: 'Volunteer Resource' },
  vlog: { icon: Video, color: 'bg-orange-50 text-orange-700 border-orange-200', badge: 'Volunteer Vlog' },
  hours: { icon: Clock, color: 'bg-yellow-50 text-yellow-700 border-yellow-200', badge: 'Hours Log' },
}

export function ApprovalsClient({
  initialItems,
}: {
  initialItems: PendingItem[]
}) {
  const [items, setItems] = useState(initialItems)
  const [reviewedCount, setReviewedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleAction(item: PendingItem, action: 'published' | 'rejected' | 'verified') {
    startTransition(async () => {
      setError(null)
      const result = await approveOrReject(item.table, item.id, action)
      if (result.error) {
        setError(result.error)
        return
      }
      setItems((prev) => prev.filter((i) => i.id !== item.id))
      setReviewedCount((c) => c + 1)
    })
  }

  return (
    <div className="space-y-4">
      {reviewedCount > 0 && (
        <div className="rounded-2xl bg-green-50 border border-green-200 px-5 py-3 text-sm font-medium text-green-700">
          ✓ {reviewedCount} item(s) reviewed and updated in the database.
        </div>
      )}
      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 px-5 py-3 text-sm font-medium text-red-700">
          Error: {error}
        </div>
      )}

      {items.map((item) => {
        const cfg = typeConfig[item.type]
        const Icon = cfg?.icon ?? CheckCircle2
        // Hours need 'verified' status, others need 'published'
        const approveAction = item.type === 'hours' ? 'verified' : 'published'

        return (
          <Card key={item.id} className="border-primary-blue/15 bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-0">
              <CardContent className="flex-1 px-6 py-6">
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <Badge className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${cfg?.color ?? ''}`}>
                    <Icon className="size-3" />
                    {cfg?.badge}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    by {item.submittedBy} · {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-lg font-black text-gray-950 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{item.excerpt}</p>
              </CardContent>
              <div className="flex flex-row lg:flex-col items-center justify-center gap-3 px-6 py-6 lg:border-l border-t lg:border-t-0 border-gray-100 bg-gray-50/60">
                <Button
                  onClick={() => handleAction(item, approveAction)}
                  disabled={isPending}
                  className="rounded-2xl bg-green-600 text-white hover:bg-green-700 gap-2"
                >
                  <CheckCircle2 className="size-4" />
                  {item.type === 'hours' ? 'Verify' : 'Publish'}
                </Button>
                <Button
                  onClick={() => handleAction(item, 'rejected')}
                  disabled={isPending}
                  variant="outline"
                  className="rounded-2xl border-red-200 text-red-600 hover:bg-red-50 gap-2"
                >
                  <XCircle className="size-4" /> Reject
                </Button>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
