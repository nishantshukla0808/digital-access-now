'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  FolderKanban,
  HandHelping,
  LayoutDashboard,
  LineChart,
  LogOut,
  PiggyBank,
  ShieldCheck,
  Trophy,
  Upload,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react'

import { logout } from '@/app/portal/actions'

type PortalRole = 'admin' | 'chapter' | 'volunteer'

type NavItem = {
  href: string
  label: string
}

// ─── Icon map — resolved on the CLIENT only (never crosses Server→Client boundary) ─
const ICON_MAP: Record<string, LucideIcon> = {
  '/portal/admin/dashboard':         LayoutDashboard,
  '/portal/admin/users':             Users,
  '/portal/admin/approvals':         CheckCircle2,
  '/portal/admin/team':              ShieldCheck,
  '/portal/admin/performance':       Trophy,
  '/portal/admin/donations':         PiggyBank,
  '/portal/admin/impact':            LineChart,
  '/portal/admin/content':           LayoutDashboard,
  '/portal/admin/fundraising':       PiggyBank,
  '/portal/chapter/dashboard':       FolderKanban,
  '/portal/chapter/submit-report':   Upload,
  '/portal/chapter/submit-event':    CalendarDays,
  '/portal/chapter/my-submissions':  CheckCircle2,
  '/portal/volunteer/dashboard':     HandHelping,
  '/portal/volunteer/submit-resource': BookOpen,
  '/portal/volunteer/submit-vlog':   Video,
  '/portal/volunteer/log-hours':     Clock,
  '/portal/volunteer/my-performance': BarChart3,
}

// ─── Role badge config ─────────────────────────────────────────────────────────
const roleConfig: Record<PortalRole, { label: string; icon: LucideIcon }> = {
  admin:     { label: 'Admin Portal',     icon: ShieldCheck  },
  chapter:   { label: 'Chapter Portal',   icon: FolderKanban },
  volunteer: { label: 'Volunteer Portal', icon: HandHelping  },
}

// ─── Teal theme tokens ─────────────────────────────────────────────────────────
const SIDEBAR_BG  = '#0B1A1A'
const SIDEBAR_BDR = 'rgba(255,255,255,0.07)'
const ACTIVE_BG   = '#0F5D5E'
const ACTIVE_TEXT = '#ffffff'
const INACTIVE    = 'rgba(255,255,255,0.5)'
const ACCENT      = '#4DB7E5'
const MAIN_BG     = '#FAFAF7'

export function PortalShell({
  role,
  currentPath,
  title,
  subtitle,
  badge,
  navItems,
  children,
}: {
  role: PortalRole
  currentPath: string
  title: string
  subtitle: string
  badge: string
  navItems: NavItem[]   // ← plain strings only, no LucideIcon
  children: ReactNode
}) {
  const config = roleConfig[role]
  const RoleIcon = config.icon

  return (
    <div className="min-h-screen" style={{ background: MAIN_BG }}>
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside
          className="flex flex-col lg:w-64 lg:flex-none lg:min-h-screen"
          style={{ background: SIDEBAR_BG }}
        >
          {/* Logo — transparent, no background */}
          <div className="px-5 py-5" style={{ borderBottom: `1px solid ${SIDEBAR_BDR}` }}>
            <Link href="/portal" className="flex items-center gap-3">
              <img
                src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg"
                alt="Digital Access Now"
                className="h-10 w-auto object-contain"
                style={{ mixBlendMode: 'screen', filter: 'brightness(1.2)' }}
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Portal</p>
                <p className="text-sm font-bold text-white leading-tight">Digital Access Now</p>
              </div>
            </Link>
          </div>

          {/* Role badge */}
          <div className="px-4 py-3" style={{ borderBottom: `1px solid ${SIDEBAR_BDR}` }}>
            <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="flex size-7 items-center justify-center rounded-md" style={{ background: 'rgba(77,183,229,0.15)' }}>
                <RoleIcon className="size-4" style={{ color: ACCENT }} />
              </div>
              <p className="text-sm font-semibold text-white">{config.label}</p>
            </div>
          </div>

          {/* Nav — icons resolved from ICON_MAP on the client */}
          <nav className="flex-1 space-y-0.5 px-3 py-4">
            {navItems.map((item) => {
              const active = currentPath === item.href
              const NavIcon = ICON_MAP[item.href] ?? LayoutDashboard
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                  style={{
                    background: active ? ACTIVE_BG : 'transparent',
                    color: active ? ACTIVE_TEXT : INACTIVE,
                  }}
                >
                  <NavIcon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Sign out */}
          <div className="px-3 py-4" style={{ borderTop: `1px solid ${SIDEBAR_BDR}` }}>
            <form>
              <button
                formAction={logout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                style={{ color: INACTIVE }}
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* ── Main ────────────────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Page header */}
          <div
            className="px-6 py-5 sm:px-8"
            style={{ background: '#ffffff', borderBottom: '1px solid rgba(15,93,94,0.1)' }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>{badge}</p>
            <h1 className="mt-1.5 text-xl font-bold tracking-tight sm:text-2xl" style={{ color: '#1F2933' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>{subtitle}</p>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 p-6 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}