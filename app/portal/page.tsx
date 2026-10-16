import Link from 'next/link'
import { ArrowRight, FolderKanban, HandHelping, ShieldCheck } from 'lucide-react'

const roleCards = [
  {
    title: 'Admin Portal',
    description: 'Manage users, review chapter submissions, control content visibility, and monitor portal activity.',
    icon: ShieldCheck,
    href: '/portal/login',
  },
  {
    title: 'Chapter Portal',
    description: 'Submit reports and events, track your submissions, and manage local chapter activity.',
    icon: FolderKanban,
    href: '/portal/login',
  },
  {
    title: 'Volunteer Portal',
    description: 'Log volunteer hours, submit vlogs and resources, and track your contributions.',
    icon: HandHelping,
    href: '/portal/login',
  },
]

export default function PortalLandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFAF7' }}>

      {/* Header */}
      <header className="flex items-center px-6 py-5" style={{ background: '#0B1A1A' }}>
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg"
            alt="Digital Access Now"
            className="h-10 w-auto object-contain"
            style={{ mixBlendMode: 'screen' }}
          />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.35)' }}>Portal</p>
            <p className="text-sm font-bold text-white">Digital Access Now</p>
          </div>
        </Link>
        <div className="ml-auto">
          <Link
            href="/portal/login"
            className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-opacity hover:opacity-80"
            style={{ background: '#0F5D5E' }}
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 rounded-full" style={{ background: '#4DB7E5' }} />
          <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#4DB7E5' }}>Member Portal</p>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: '#1F2933' }}>
          Welcome to the<br />
          <span style={{ color: '#0F5D5E' }}>DAN Portal</span>
        </h1>
        <p className="max-w-md text-base mb-12" style={{ color: '#1F2933', opacity: 0.6 }}>
          A private workspace for admins, chapter leads, and volunteers. Sign in to access your dashboard.
        </p>

        {/* Role cards */}
        <div className="grid gap-5 sm:grid-cols-3 max-w-4xl w-full">
          {roleCards.map(({ title, description, icon: Icon, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col items-start gap-4 rounded-xl p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.12)' }}
            >
              <div
                className="flex size-11 items-center justify-center rounded-xl"
                style={{ background: 'rgba(15,93,94,0.08)' }}
              >
                <Icon className="size-5" style={{ color: '#0F5D5E' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-base mb-1.5" style={{ color: '#1F2933' }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.6 }}>{description}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold" style={{ color: '#0F5D5E' }}>
                Sign in <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-xs" style={{ color: '#1F2933', opacity: 0.35 }}>
        &copy; {new Date().getFullYear()} Digital Access Now. All rights reserved.
      </footer>
    </div>
  )
}