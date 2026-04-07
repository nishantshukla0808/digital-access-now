import Link from 'next/link'
import { ArrowRight, FolderKanban, HandHelping, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const dashboards = [
  {
    title: 'Admin dashboard',
    description: 'Review users, approvals, and resource visibility settings.',
    href: '/portal/admin/dashboard',
    icon: ShieldCheck,
  },
  {
    title: 'Chapter dashboard',
    description: 'Upload reports, manage chapter activity, and monitor submissions.',
    href: '/portal/chapter/dashboard',
    icon: FolderKanban,
  },
  {
    title: 'Volunteer dashboard',
    description: 'Open assigned materials, event opportunities, and hour tracking.',
    href: '/portal/volunteer/dashboard',
    icon: HandHelping,
  },
]

export default function PortalDashboardRouterPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fcff_0%,#eef7fb_100%)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-primary-blue">Portal dashboard</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-gray-950">Role redirect placeholder for the frontend phase.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Once JWT auth is connected, this route can inspect the signed-in user role and redirect automatically. For now, choose a dashboard preview below.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon
            return (
              <Card key={dashboard.title} className="border-primary-blue/15 bg-white py-0 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                <CardHeader className="px-6 pt-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-blue/12 text-primary-blue">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="pt-4 text-2xl font-black text-gray-950">{dashboard.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="min-h-24 text-sm leading-7 text-gray-600">{dashboard.description}</p>
                  <Button asChild className="mt-6 w-full rounded-full bg-primary-blue text-footer-black hover:bg-cyan-600">
                    <Link href={dashboard.href}>
                      Open preview
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}