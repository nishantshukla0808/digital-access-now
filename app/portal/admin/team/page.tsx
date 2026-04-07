import { Camera, GripVertical, Plus, UploadCloud, Users } from 'lucide-react'

import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const teamMembers = [
  {
    name: 'Ritika Malik',
    role: 'CEO and Founder',
    bio: 'Student studying Neuroscience at Columbia University',
    image: 'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png',
    status: 'Published',
  },
  {
    name: 'Awahan Sapkota',
    role: 'Vice President',
    bio: 'Senior studying Chemical Engineering and Physics at the University of Pennsylvania',
    image: 'https://i.ibb.co/jZwpDG3G/Awahan.jpg',
    status: 'Published',
  },
  {
    name: 'Aayushi Shah',
    role: 'Director of Human Resources',
    bio: 'Leading human resources and team development initiatives',
    image: 'https://i.ibb.co/5gmSJkvg/Aayushi-Shah-Picsart-Ai-Image-Enhancer.jpg',
    status: 'Draft update',
  },
]

export default function AdminTeamPage() {
  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/team"
      badge="Team management"
      title="Add team members, photos, and bios for the public team page."
      subtitle="This frontend is shaped around the current team page structure so admins can eventually create, update, reorder, and publish team member records without editing code."
      navItems={adminNavItems}
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-2xl font-black text-gray-950">Add or edit team member</CardTitle>
              <Badge className="rounded-full bg-primary-blue/12 px-4 py-1 text-primary-blue hover:bg-primary-blue/12">Frontend form</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-6 pb-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Full name</label>
                <Input placeholder="Enter team member name" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Role / title</label>
                <Input placeholder="Director of ..." className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Bio</label>
              <Textarea placeholder="Short public biography shown on the website" className="min-h-28 rounded-2xl border-gray-200 bg-gray-50" />
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_180px]">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Photo URL</label>
                <Input placeholder="Paste image link or connect upload later" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Display order</label>
                <Input placeholder="1" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-primary-blue/30 bg-primary-blue/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary-blue shadow-sm">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-950">Future image upload slot</p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Backend phase can replace raw photo URLs with upload handling, image validation, and CDN-backed storage.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="rounded-full bg-primary-blue text-footer-black hover:bg-cyan-600">
                <Plus className="size-4" />
                Save member draft
              </Button>
              <Button variant="outline" className="rounded-full border-primary-blue/25 hover:bg-primary-blue/8">
                <Camera className="size-4" />
                Preview on team page
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-2xl font-black text-gray-950">Current team roster</CardTitle>
              <Badge className="rounded-full bg-gray-950 px-4 py-1 text-white hover:bg-gray-950">
                <Users className="mr-2 size-3.5" />
                10 members live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="flex flex-col gap-4 rounded-3xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <button className="rounded-2xl border border-gray-200 p-2 text-gray-400">
                    <GripVertical className="size-4" />
                  </button>
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border-2 border-primary-blue/25 bg-gray-100">
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-950">{member.name}</p>
                    <p className="text-sm font-semibold text-primary-blue">{member.role}</p>
                    <p className="mt-1 max-w-xl text-sm leading-6 text-gray-600">{member.bio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <Badge className="rounded-full bg-primary-blue/12 px-3 py-1 text-primary-blue hover:bg-primary-blue/12">{member.status}</Badge>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}