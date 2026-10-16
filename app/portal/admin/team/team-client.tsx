'use client'

import { useRef, useState, useTransition } from 'react'
import { Loader2, Plus, Star, Trash2, Users } from 'lucide-react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
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
  const [members, setMembers]         = useState(initialMembers)
  const [isPending, startTransition]  = useTransition()
  const [notice, setNotice]           = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
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
        setNotice({ type: 'ok', msg: type === 'advisory' ? 'Advisory board member added.' : 'Team member added.' })
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

  const inputStyle = {
    width: '100%', height: '42px', paddingLeft: '12px', paddingRight: '12px',
    borderRadius: '10px', fontSize: '14px', outline: 'none',
    background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933',
  } as const

  function RosterGroup({ title, items, isAdvisory }: { title: string; items: Member[]; isAdvisory?: boolean }) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
          {isAdvisory ? <Star className="size-4" style={{ color: '#4DB7E5' }} /> : <Users className="size-4" style={{ color: '#0F5D5E' }} />}
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: isAdvisory ? '#4DB7E5' : '#0F5D5E' }}>{title}</p>
          <span className="ml-auto text-xs" style={{ color: '#1F2933', opacity: 0.4 }}>{items.length} members</span>
        </div>
        {items.length === 0 && (
          <p className="text-sm text-center py-4" style={{ color: '#1F2933', opacity: 0.4 }}>No members yet — add one below.</p>
        )}
        {items.map((member) => (
          <div key={member.id} className="flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between" style={{ background: '#FAFAF7', border: '1px solid rgba(15,93,94,0.08)' }}>
            <div className="flex items-center gap-3">
              <div className="size-12 overflow-hidden rounded-full shrink-0" style={{ border: '2px solid rgba(15,93,94,0.2)' }}>
                <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#1F2933' }}>{member.name}</p>
                <p className="text-xs font-semibold" style={{ color: '#0F5D5E' }}>{member.role_title}</p>
                <p className="text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>{member.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(15,93,94,0.1)', color: '#0F5D5E' }}>Live</span>
              <button
                disabled={isPending}
                onClick={() => handleRemove(member.id, member.name)}
                className="flex items-center justify-center size-8 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-40"
                style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
              >
                <Trash2 className="size-3.5" />
              </button>
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
      badge="Admin"
      title="Team Members"
      subtitle="Changes are reflected immediately on the public /about/our-team page."
      navItems={adminNavItems}
    >
      {notice && (
        <div className="rounded-xl px-5 py-3 text-sm font-medium mb-5"
          style={notice.type === 'ok'
            ? { background: 'rgba(15,93,94,0.08)', color: '#0F5D5E' }
            : { background: '#fef2f2', color: '#b91c1c' }}>
          {notice.msg}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        {/* Add member form */}
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <p className="text-sm font-bold mb-5" style={{ color: '#1F2933' }}>Add new member</p>
          <form action={handleAdd} className="space-y-4">
            {/* Member type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Member Type</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 rounded-xl p-3 cursor-pointer" style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)' }}>
                  <input type="radio" name="member_type" value="team" defaultChecked style={{ accentColor: '#0F5D5E' }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Core Team</p>
                    <p className="text-xs" style={{ color: '#1F2933', opacity: 0.5 }}>Staff & directors</p>
                  </div>
                </label>
                <label className="flex items-center gap-2 rounded-xl p-3 cursor-pointer" style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)' }}>
                  <input type="radio" name="member_type" value="advisory" style={{ accentColor: '#4DB7E5' }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Advisory Board</p>
                    <p className="text-xs" style={{ color: '#1F2933', opacity: 0.5 }}>Strategic advisors</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Full name *</label>
                <input name="name" required placeholder="Enter full name" style={inputStyle} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Role / Title *</label>
                <input name="role_title" required placeholder="e.g. Director of Education" style={inputStyle} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Country</label>
              <input name="country" placeholder="e.g. United States" style={inputStyle} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Short bio</label>
              <textarea
                name="bio"
                placeholder="Short public biography"
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl text-sm resize-none outline-none"
                style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold" style={{ color: '#1F2933' }}>Photo URL *</label>
              <input
                ref={imageInputRef}
                name="image_url"
                required
                placeholder="https://i.ibb.co/XXXXXXXX/photo.jpg"
                onChange={e => setImageUrlPreview(e.target.value)}
                style={inputStyle}
              />
              <div className="rounded-xl px-4 py-3 text-xs space-y-1" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', color: '#b45309' }}>
                <p className="font-bold">ImgBB: use the "Direct link" only</p>
                <p>Correct: <span className="font-mono">https://i.ibb.co/XXXX/photo.jpg</span></p>
                <p>Wrong: <span className="font-mono">https://ibb.co/XXXX</span></p>
              </div>
              {imageUrlPreview && (
                <div className="flex items-center gap-3 mt-2">
                  <div className="size-14 overflow-hidden rounded-full shrink-0" style={{ border: '2px solid rgba(15,93,94,0.2)' }}>
                    <img src={imageUrlPreview} alt="Preview" className="h-full w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.opacity = '0.2' }} onLoad={e => { (e.target as HTMLImageElement).style.opacity = '1' }} />
                  </div>
                  <p className="text-xs" style={{ color: '#1F2933', opacity: 0.5 }}>Live preview — broken = wrong URL.</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
              {isPending ? 'Saving...' : 'Add to page'}
            </button>
          </form>
        </div>

        {/* Live roster */}
        <div className="rounded-xl p-6 space-y-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold" style={{ color: '#1F2933' }}>Live roster</p>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#0B1A1A', color: '#ffffff' }}>{members.length} total</span>
          </div>
          <RosterGroup title="Core Team"      items={teamMembers}     />
          <RosterGroup title="Advisory Board" items={advisoryMembers} isAdvisory />
        </div>
      </div>
    </PortalShell>
  )
}
