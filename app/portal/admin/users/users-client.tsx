'use client'

import { useState, useTransition } from 'react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { ShieldCheck, FolderKanban, HandHelping, Loader2 } from 'lucide-react'
import { changeUserRole } from '../admin-actions'

type User = {
  id: string
  custom_id: string | null
  email: string
  full_name: string | null
  role: string
  created_at: string
}

const roleIcon: Record<string, React.ElementType> = {
  ADMIN: ShieldCheck, CHAPTER: FolderKanban, VOLUNTEER: HandHelping,
}
const roleBadge: Record<string, { bg: string; color: string }> = {
  ADMIN:     { bg: 'rgba(220,38,38,0.08)',  color: '#dc2626' },
  CHAPTER:   { bg: 'rgba(15,93,94,0.1)',    color: '#0F5D5E' },
  VOLUNTEER: { bg: 'rgba(77,183,229,0.1)',  color: '#238C91' },
}

export function UsersClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers]             = useState(initialUsers)
  const [notice, setNotice]           = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition]  = useTransition()
  const [changingId, setChangingId]   = useState<string | null>(null)

  function handleRoleChange(userId: string, newRole: 'ADMIN' | 'CHAPTER' | 'VOLUNTEER') {
    setChangingId(userId)
    startTransition(async () => {
      setNotice(null)
      const result = await changeUserRole(userId, newRole)
      setChangingId(null)
      if (result.error) {
        setNotice({ type: 'err', msg: result.error })
      } else {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
        setNotice({ type: 'ok', msg: `Role updated to ${newRole}.` })
      }
    })
  }

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/users"
      badge="Admin"
      title={`Users (${users.length})`}
      subtitle="View and manage Admins, Chapter Leads, and Volunteers. Change roles using the dropdown."
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

      <div className="rounded-xl overflow-hidden" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
                {['Credential ID', 'Name', 'Email', 'Role', 'Change Role', 'Joined'].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center text-sm" style={{ color: '#1F2933', opacity: 0.4 }}>No users yet.</td></tr>
              ) : (
                users.map(user => {
                  const Icon = roleIcon[user.role] ?? HandHelping
                  const badge = roleBadge[user.role] ?? { bg: 'rgba(0,0,0,0.05)', color: '#6b7280' }
                  const isChanging = changingId === user.id && isPending
                  return (
                    <tr key={user.id} style={{ borderBottom: '1px solid rgba(15,93,94,0.05)' }}>
                      <td className="px-5 py-4 font-mono text-xs font-bold" style={{ color: '#0F5D5E' }}>{user.custom_id}</td>
                      <td className="px-5 py-4 font-semibold" style={{ color: '#1F2933' }}>{user.full_name || '—'}</td>
                      <td className="px-5 py-4" style={{ color: '#1F2933', opacity: 0.65 }}>{user.email}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: badge.bg, color: badge.color }}>
                          <Icon className="size-3" /> {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {isChanging ? (
                          <Loader2 className="size-4 animate-spin" style={{ color: '#0F5D5E' }} />
                        ) : (
                          <select
                            value={user.role}
                            disabled={isPending}
                            onChange={e => handleRoleChange(user.id, e.target.value as 'ADMIN' | 'CHAPTER' | 'VOLUNTEER')}
                            className="rounded-lg px-3 py-1.5 text-xs font-semibold outline-none disabled:opacity-50"
                            style={{ background: '#FAFAF7', border: '1.5px solid rgba(15,93,94,0.2)', color: '#1F2933' }}
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="CHAPTER">CHAPTER</option>
                            <option value="VOLUNTEER">VOLUNTEER</option>
                          </select>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>
                        {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  )
}
