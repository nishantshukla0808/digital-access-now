'use client'

import { useRef, useState, useTransition } from 'react'
import { Loader2, Plus, Star, Trash2, Users } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { addTeamMember, removeTeamMember } from '../admin-actions'

type Member = {
  id: string
  name: string
  role_title: string
  country: string
  bio: string | null
  image_url: string
  status: string
  member_type: string
}

export function TeamClient({ initialMembers }: { initialMembers: Member[] }) {
  const [members, setMembers]       = useState(initialMembers)
  const [isPending, startTransition] = useTransition()
  const [notice, setNotice]         = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [imageUrlPreview, setImageUrlPreview] = useState('')
  const imageInputRef = useRef<HTMLInputElement>(null)

  const teamMembers     = members.filter(m => m.member_type !== 'advisory')
  const advisoryMembers = members.filter(m => m.member_type === 'advisory')

  function handleAdd(formData: FormData) {
    const imageUrl = (formData.get('image_url') as string | null)?.trim() ?? ''
    if (imageUrl && imageUrl.includes('ibb.co') && !imageUrl.includes('i.ibb.co')) {
      setNotice({ type: 'err', msg: 'Wrong ImgBB link! Use the "Direct link" (starts with https://i.ibb.co/...), not the viewer page link.' })
      return
    }
    startTransition(async () => {
      setNotice(null)
      const result = await addTeamMember(formData)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        const type = (formData.get('member_type') as string) || 'team'
        setNotice({ type: 'ok', msg: type === 'advisory' ? 'Advisory board member added!' : 'Team member added successfully!' })
        setImageUrlPreview('')
        if (imageInputRef.current) imageInputRef.current.value = ''
        window.location.reload()
      }
    })
  }

  function handleRemove(id: string, name: string) {
    if (!confirm(`Remove "${name}" from the team page?`)) return
    startTransition(async () => {
      setNotice(null)
      const result = await removeTeamMember(id)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        setMembers(prev => prev.filter(m => m.id !== id))
        setNotice({ type: 'ok', msg: `${name} removed.` })
      }
    })
  }

  function RosterGroup({ title, items, accent }: { title: string; items: Member[]; accent: 'blue' | 'purple' }) {
    const borderCol = accent === 'purple' ? 'border-primary-purple/25' : 'border-primary-blue/25'
    const textCol   = accent === 'purple' ? 'text-primary-purple'      : 'text-primary-blue'
    const badgeBg   = accent === 'purple' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-cyan-50 border-cyan-200 text-cyan-700'

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
          {accent === 'purple'
            ? <Star className="size-4 text-primary-purple" />
            : <Users className="size-4 text-primary-blue" />}
          <p className={`text-sm font-bold ${textCol} uppercase tracking-wider`}>{title}</p>
          <span className="text-xs text-gray-400 ml-auto">{items.length} members</span>
        </div>
        {items.length === 0 && (
          <p className="text-gray-400 text-sm py-4 text-center">No members yet — add one using the form.</p>
        )}
        {items.map((member) => (
          <div key={member.id} className="flex flex-col gap-4 rounded-3xl border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className={`flex size-14 items-center justify-center overflow-hidden rounded-full border-2 ${borderCol} bg-gray-100 shrink-0`}>
                <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-gray-950">{member.name}</p>
                <p className={`text-sm font-semibold ${textCol}`}>{member.role_title}</p>
                <p className="text-xs text-gray-400">{member.country}</p>
                {member.bio && <p className="mt-1 max-w-xs text-sm text-gray-600 line-clamp-2">{member.bio}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <Badge className={`rounded-full border px-3 py-1 text-xs ${badgeBg}`}>● Live</Badge>
              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={() => handleRemove(member.id, member.name)}
                className="rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/team"
      badge="Team management"
      title="Add, edit, and remove team members for the public team page."
      subtitle="Changes are immediately reflected on /about/our-team. Use the Member Type selector to add Advisory Board members."
      navItems={adminNavItems}
    >
      {notice && (
        <div className={`rounded-2xl px-5 py-3 text-sm font-medium mb-4 ${notice.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {notice.type === 'ok' ? '✓' : '⚠'} {notice.msg}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        {/* ── Add Member Form ────────────────────────────────────────── */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-2xl font-black text-gray-950">Add new member</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <form action={handleAdd} className="space-y-5">

              {/* Member type selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Member Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer hover:border-primary-blue/40 transition-colors has-[:checked]:border-primary-blue has-[:checked]:bg-cyan-50">
                    <input type="radio" name="member_type" value="team" defaultChecked className="accent-[#00BCD4]" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Core Team</p>
                      <p className="text-xs text-gray-500">Staff &amp; directors</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer hover:border-primary-purple/40 transition-colors has-[:checked]:border-primary-purple has-[:checked]:bg-purple-50">
                    <input type="radio" name="member_type" value="advisory" className="accent-[#6633CC]" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Advisory Board</p>
                      <p className="text-xs text-gray-500">Strategic advisors</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800">Full name *</label>
                  <Input name="name" required placeholder="Enter full name" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800">Role / Title *</label>
                  <Input name="role_title" required placeholder="e.g. Director of Education" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Country</label>
                <Input name="country" placeholder="e.g. United States, Pakistan" className="h-11 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Short bio</label>
                <Textarea name="bio" placeholder="Short public biography shown on the website" className="min-h-20 rounded-2xl border-gray-200 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800">Photo URL *</label>
                <Input
                  ref={imageInputRef}
                  name="image_url"
                  required
                  placeholder="https://i.ibb.co/XXXXXXXX/photo.jpg"
                  onChange={e => setImageUrlPreview(e.target.value)}
                  className="h-11 rounded-2xl border-gray-200 bg-gray-50"
                />
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 space-y-1">
                  <p className="font-bold">⚠ ImgBB: use the &quot;Direct link&quot; only</p>
                  <p>✅ Correct: <span className="font-mono">https://i.ibb.co/XXXX/photo.jpg</span></p>
                  <p>❌ Wrong: <span className="font-mono">https://ibb.co/XXXX</span> (viewer page)</p>
                </div>
                {imageUrlPreview && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="size-16 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100 shrink-0">
                      <img
                        src={imageUrlPreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2' }}
                        onLoad={e => { (e.target as HTMLImageElement).style.opacity = '1' }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Live preview — broken image = wrong URL.</p>
                  </div>
                )}
              </div>

              <Button type="submit" disabled={isPending} className="rounded-full bg-primary-blue text-white hover:bg-cyan-600">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                {isPending ? 'Saving...' : 'Add to page'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* ── Roster ────────────────────────────────────────────────── */}
        <Card className="border-primary-blue/15 bg-white py-0">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-2xl font-black text-gray-950">Live roster</CardTitle>
              <Badge className="rounded-full bg-gray-950 px-4 py-1 text-white hover:bg-gray-950">
                <Users className="mr-2 size-3.5" />
                {members.length} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6">
            <RosterGroup title="Core Team" items={teamMembers}     accent="blue"   />
            <RosterGroup title="Advisory Board" items={advisoryMembers} accent="purple" />
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
