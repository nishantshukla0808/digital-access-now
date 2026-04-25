import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  FolderKanban,
  HandHelping,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { logout } from '@/app/portal/actions'
import { cn } from '@/lib/utils'

type PortalRole = 'admin' | 'chapter' | 'volunteer'

type NavItem = {
  href: string
  label: string
  icon?: LucideIcon
}

const roleConfig: Record<PortalRole, { label: string; icon: typeof ShieldCheck; accent: string }> = {
  admin: { label: 'Admin Portal', icon: ShieldCheck, accent: 'bg-primary-blue' },
  chapter: { label: 'Chapter Portal', icon: FolderKanban, accent: 'bg-primary-blue' },
  volunteer: { label: 'Volunteer Portal', icon: HandHelping, accent: 'bg-primary-blue' },
}

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
  navItems: NavItem[]
  children: ReactNode
}) {
  const config = roleConfig[role]
  const RoleIcon = config.icon

  return (
    <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#f0f9ff_0%,#e8f4fd_100%)]">
      {/* Sidebar — fixed height, never scrolls */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-none flex-col h-screen bg-[#04111f] text-white overflow-y-auto">
          {/* Logo */}
          <div className="border-b border-white/8 px-6 py-5">
            <Link href="/portal" className="flex items-center gap-3">
              <img
                src="https://i.ibb.co/F4fp0JSL/logo-DAN-removebg-preview-Picsart-Ai-Image-Enhancer.png"
                alt="Digital Access Now Logo"
                className="max-w-[140px] h-auto object-contain"
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Portal</p>
                <p className="text-sm font-bold text-white">Digital Access Now</p>
              </div>
            </Link>
          </div>

          {/* Role Badge */}
          <div className="px-5 py-4 border-b border-white/8">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary-blue/20">
                <RoleIcon className="size-4 text-primary-blue" />
              </div>
              <p className="text-sm font-semibold text-white">{config.label}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const active = currentPath === item.href
              const NavIcon = item.icon ?? LayoutDashboard
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                    active
                      ? 'bg-primary-blue text-[#04111f] font-semibold'
                      : 'text-white/60 hover:bg-white/6 hover:text-white',
                  )}
                >
                  <NavIcon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-white/8 px-3 py-4">
            <form>
              <button
                formAction={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 hover:bg-white/6 hover:text-white transition-all duration-150"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </form>
          </div>
      </aside>

      {/* Main Content — takes remaining width, scrolls independently */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          {/* Page Header */}
          <div className="border-b border-[#00BCD4]/15 bg-white px-6 py-6 sm:px-8 sm:py-7">
            <Badge className="rounded-full bg-primary-blue/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-primary-blue hover:bg-primary-blue/10 border-0">
              {badge}
            </Badge>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              {title}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
              {subtitle}
            </p>
          </div>

          {/* Page Body */}
          <div className="flex-1 p-6 sm:p-8">
            {children}
          </div>
      </main>
    </div>
  )
}