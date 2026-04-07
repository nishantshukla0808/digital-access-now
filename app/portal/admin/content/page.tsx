import Link from 'next/link'
import { ArrowRight, Globe, HeartHandshake, ImageIcon, LayoutTemplate, Users } from 'lucide-react'

import { adminContentLinks, adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const sections = [
  {
    title: 'Team page',
    description: 'Manage team members, bios, profile photos, and homepage leadership highlights.',
    status: 'Needs CMS form',
    href: '/portal/admin/team',
    icon: Users,
  },
  {
    title: 'Donation experience',
    description: 'Control donation stats, campaign highlights, FAQ content, and giving impact messaging.',
    status: 'Prototype ready',
    href: '/portal/admin/fundraising',
    icon: HeartHandshake,
  },
  {
    title: 'Impact metrics',
    description: 'Update headline metrics like lives empowered, devices distributed, and country reach.',
    status: 'Frontend planned',
    href: '/portal/admin/content',
    icon: Globe,
  },
  {
    title: 'Resources and promos',
    description: 'Manage portal-facing resource blocks, city opportunity highlights, and public website links.',
    status: 'Frontend planned',
    href: '/portal/admin/content',
    icon: LayoutTemplate,
  },
]

export default function AdminContentPage() {
  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/content"
      badge="Website CMS"
      title="Admin frontend for public website content management."
      subtitle="This content hub is where admin workflows for public website sections can live before backend CRUD is connected. It focuses on real areas from the current site: team, fundraising, impact, and resources."
      navItems={adminNavItems}
    >
      <Tabs defaultValue="website" className="gap-6">
        <TabsList className="h-auto rounded-2xl bg-white p-2 shadow-sm">
          <TabsTrigger value="website" className="rounded-xl px-5 py-2.5">Website sections</TabsTrigger>
          <TabsTrigger value="publish" className="rounded-xl px-5 py-2.5">Publishing queue</TabsTrigger>
        </TabsList>

        <TabsContent value="website" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="border-primary-blue/15 bg-white py-0">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-2xl font-black text-gray-950">Content sections mapped to the live site</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <div key={section.title} className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-blue/12 text-primary-blue">
                          <Icon className="size-5" />
                        </div>
                        <Badge className="rounded-full bg-primary-blue/12 px-3 py-1 text-primary-blue hover:bg-primary-blue/12">{section.status}</Badge>
                      </div>
                      <p className="mt-4 text-lg font-bold text-gray-950">{section.title}</p>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{section.description}</p>
                      <Button asChild variant="outline" className="mt-5 rounded-full border-primary-blue/25 hover:bg-primary-blue/8">
                        <Link href={section.href}>
                          Open section
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-primary-blue/15 bg-gray-950 py-0 text-white">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-2xl font-black">Recommended admin modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                {adminContentLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href + item.label} href={item.href} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/8">
                      <span className="flex items-center gap-3 font-semibold text-white">
                        <span className="flex size-10 items-center justify-center rounded-2xl bg-white/10 text-primary-blue">
                          <Icon className="size-4" />
                        </span>
                        {item.label}
                      </span>
                      <ArrowRight className="size-4 text-primary-blue" />
                    </Link>
                  )
                })}

                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">Next content modules</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Impact metrics editor, homepage stats manager, resources list editor, and donation FAQ controls can be added into this hub in the same frontend pattern.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="publish">
          <Card className="border-primary-blue/15 bg-white py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-2xl font-black text-gray-950">Publishing queue prototype</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-6">
              {[
                ['Team roster refresh', 'Add two new directors and replace outdated photo links', 'Ready for review'],
                ['Donation page metrics', 'Update annual giving summary and community impact totals', 'Awaiting approval'],
                ['Impact cards', 'Replace hardcoded numbers on the public impact page', 'Draft'],
              ].map(([title, description, status]) => (
                <div key={title} className="flex flex-col gap-4 rounded-3xl border border-gray-200 p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-bold text-gray-950">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
                  </div>
                  <Badge className="rounded-full bg-primary-blue/12 px-4 py-1 text-primary-blue hover:bg-primary-blue/12">{status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  )
}