import Link from 'next/link'
import {
  ArrowRight,
  FolderKanban,
  HandHelping,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const roleCards = [
  {
    title: 'Admin Control Center',
    description:
      'Manage users, review chapter uploads, control resource visibility, and monitor portal activity from a single dashboard.',
    icon: ShieldCheck,
    href: '/portal/admin/dashboard',
    accent: 'from-primary-blue to-cyan-600',
  },
  {
    title: 'Chapter Workspace',
    description:
      'Upload reports, organize chapter operations, track submissions, and manage local programming needs.',
    icon: FolderKanban,
    href: '/portal/chapter/dashboard',
    accent: 'from-primary-purple to-primary-blue',
  },
  {
    title: 'Volunteer Workspace',
    description:
      'Access training materials, see upcoming opportunities, and log volunteer hours in a simple workflow.',
    icon: HandHelping,
    href: '/portal/volunteer/dashboard',
    accent: 'from-primary-blue to-primary-purple',
  },
]

export default function PortalLandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(102,51,204,0.12),_transparent_28%),linear-gradient(180deg,_#f8fcff_0%,_#eef7fb_58%,_#ffffff_100%)] text-gray-950">
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-16 text-6xl font-black text-primary-blue/25 sm:text-8xl">ACCESS</div>
          <div className="absolute right-12 top-32 text-6xl font-black text-primary-purple/20 sm:text-8xl">PORTAL</div>
          <div className="absolute bottom-12 left-20 text-5xl font-black text-primary-blue/20 sm:text-7xl">ROLES</div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.34em] text-primary-blue">Frontend Phase</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
                Build the Digital Access Now portal before wiring the backend.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
                This first frontend pass gives you a themed portal experience for admins, chapters, and volunteers, structured around the JWT-based backend plan you already approved.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="rounded-full bg-primary-blue px-8 py-6 text-base font-bold text-footer-black hover:bg-cyan-600">
                  <Link href="/portal/login">
                    Open portal login
                    <LockKeyhole className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-primary-blue/30 px-8 py-6 text-base font-bold text-gray-900 hover:bg-primary-blue/8">
                  <Link href="/portal/admin/dashboard">
                    Preview dashboards
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden border-primary-blue/15 bg-gray-950 py-0 text-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
              <CardHeader className="border-b border-white/10 px-8 py-7">
                <CardTitle className="text-2xl font-black">Portal readiness snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 px-8 py-8">
                {[
                  'Role-specific dashboards aligned to Admin, Chapter, and Volunteer workflows',
                  'Frontend patterns ready for JWT auth, route guards, and CRUD API wiring',
                  'Visual system matched to the current site theme with aqua/purple accents',
                  'Scaffold designed to support resource permissions and file visibility rules',
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-white/75">
                    <span className="mt-1 text-primary-blue">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-primary-purple">Role previews</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-950">Three role experiences, one portal foundation.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-gray-600">
              Each view is intentionally scoped so the frontend can later bind directly to your JWT tokens, ID system, and CRUD endpoints without redesign.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {roleCards.map((role) => {
              const Icon = role.icon
              return (
                <Card key={role.title} className="group overflow-hidden border-primary-blue/15 bg-white py-0 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                  <div className={`h-2 w-full bg-linear-to-r ${role.accent}`} />
                  <CardHeader className="px-6 pt-6">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-950 text-primary-blue shadow-lg">
                      <Icon className="size-6" />
                    </div>
                    <CardTitle className="pt-4 text-2xl font-black">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <p className="min-h-24 text-base leading-7 text-gray-600">{role.description}</p>
                    <Button asChild className="mt-6 w-full rounded-full bg-primary-blue text-footer-black hover:bg-cyan-600">
                      <Link href={role.href}>
                        Open preview
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}