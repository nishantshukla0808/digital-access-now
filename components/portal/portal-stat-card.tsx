import type { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export function PortalStatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
}) {
  return (
    <Card className="border-primary-blue/15 bg-white py-0 shadow-[0_12px_32px_rgba(0,188,212,0.10)]">
      <CardContent className="flex items-start justify-between gap-4 p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gray-500">{label}</p>
          <p className="mt-3 text-3xl font-black text-gray-950">{value}</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">{detail}</p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-blue/12 text-primary-blue">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  )
}