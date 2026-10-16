import Link from 'next/link'
import { ArrowRight, FolderKanban, HandHelping, ShieldCheck } from 'lucide-react'

const dashboards = [
  {
    title: 'Admin',
    description: 'Review users, approvals, and resource visibility settings.',
    href: '/portal/admin/dashboard',
    icon: ShieldCheck,
  },
  {
    title: 'Chapter Lead',
    description: 'Upload reports, manage chapter activity, and monitor submissions.',
    href: '/portal/chapter/dashboard',
    icon: FolderKanban,
  },
  {
    title: 'Volunteer',
    description: 'Track hours, submit resources, and view upcoming events.',
    href: '/portal/volunteer/dashboard',
    icon: HandHelping,
  },
]

export default function PortalDashboardRouterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: '#FAFAF7' }}>
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <Link href="/portal">
            <img src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg" alt="Digital Access Now" className="mx-auto h-12 w-auto object-contain mb-6" style={{ mixBlendMode: 'normal' }} />
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: '#1F2933' }}>Select your workspace</h1>
          <p className="mt-2 text-sm max-w-md mx-auto" style={{ color: '#1F2933', opacity: 0.55 }}>
            Once auth is connected, this page will auto-redirect based on your role. For now, select a preview.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {dashboards.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title} href={href}
              className="group flex flex-col gap-4 rounded-xl p-6 transition-all duration-150 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}
            >
              <div className="flex size-11 items-center justify-center rounded-xl" style={{ background: 'rgba(15,93,94,0.08)' }}>
                <Icon className="size-5" style={{ color: '#0F5D5E' }} />
              </div>
              <div>
                <p className="font-bold" style={{ color: '#1F2933' }}>{title}</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.55 }}>{description}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold mt-auto" style={{ color: '#0F5D5E' }}>
                Open <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}