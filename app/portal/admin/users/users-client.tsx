'use client'

import { useState, useTransition } from 'react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  ADMIN: ShieldCheck,
  CHAPTER: FolderKanban,
  VOLUNTEER: HandHelping,
}
const roleColors: Record<string, string> = {
  ADMIN: 'bg-red-50 text-red-700 border-red-200',
  CHAPTER: 'bg-primary-blue/10 text-primary-blue border-primary-blue/20',
  VOLUNTEER: 'bg-primary-purple/10 text-primary-purple border-primary-purple/20',
}

export function UsersClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [changingId, setChangingId] = useState<string | null>(null)

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
      badge="User Management"
      title={`All registered users (${users.length})`}
      subtitle="View and manage Admins, Chapter Leads, and Volunteers. Change roles using the dropdown per user."
      navItems={adminNavItems}
    >
      {notice && (
        <div className={`rounded-2xl px-5 py-3 text-sm font-medium mb-6 ${notice.type === 'ok' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {notice.type === 'ok' ? '✓' : '⚠'} {notice.msg}
        </div>
      )}

      <Card className="border-primary-blue/15 bg-white">
        <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <CardTitle className="text-2xl font-black text-gray-950">
            Users ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Credential ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Change Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                      No users yet.
                    </td>
                  </tr>
                ) : (
                  users.map(user => {
                    const Icon = roleIcon[user.role] ?? HandHelping
                    const isChanging = changingId === user.id && isPending
                    return (
                      <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs font-bold text-primary-blue">{user.custom_id}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{user.full_name || '—'}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <Badge className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${roleColors[user.role] || ''}`}>
                            <Icon className="size-3" />
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {isChanging ? (
                            <Loader2 className="size-4 animate-spin text-primary-blue" />
                          ) : (
                            <select
                              value={user.role}
                              disabled={isPending}
                              onChange={e => handleRoleChange(user.id, e.target.value as 'ADMIN' | 'CHAPTER' | 'VOLUNTEER')}
                              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-primary-blue transition-colors disabled:opacity-50"
                            >
                              <option value="ADMIN">ADMIN</option>
                              <option value="CHAPTER">CHAPTER</option>
                              <option value="VOLUNTEER">VOLUNTEER</option>
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PortalShell>
  )
}
