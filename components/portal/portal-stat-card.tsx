'use client'

import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarClock,
  CalendarDays,
  CheckCircle,
  CircleDollarSign,
  Clock,
  DollarSign,
  FileCheck2,
  FileText,
  FolderKanban,
  Globe2,
  HandHelping,
  HeartHandshake,
  LineChart,
  MonitorSmartphone,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Upload,
  Users,
  Users2,
  type LucideIcon,
} from 'lucide-react'

// ─── Icon registry — icons never cross the Server→Client boundary ─────────────
const ICONS: Record<string, LucideIcon> = {
  Activity, BarChart3, BookOpen, CalendarClock, CalendarDays,
  CheckCircle, CircleDollarSign, Clock, DollarSign, FileCheck2,
  FileText, FolderKanban, Globe2, HandHelping, HeartHandshake,
  LineChart, MonitorSmartphone, PiggyBank, ShieldCheck, Sparkles,
  Target, Timer, TrendingUp, Upload, Users, Users2,
}

export function PortalStatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string
  value: string
  detail: string
  icon: string          // ← plain string key, safe across Server→Client
}) {
  const Icon = ICONS[icon] ?? Activity
  return (
    <div
      className="flex items-start justify-between gap-4 rounded-xl p-5"
      style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: '#1F2933', opacity: 0.45 }}>{label}</p>
        <p className="mt-2.5 text-3xl font-black" style={{ color: '#0F5D5E' }}>{value}</p>
        <p className="mt-1.5 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>{detail}</p>
      </div>
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-xl"
        style={{ background: 'rgba(15,93,94,0.08)' }}
      >
        <Icon className="size-5" style={{ color: '#0F5D5E' }} />
      </div>
    </div>
  )
}