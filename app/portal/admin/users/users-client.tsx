'use client'

import { useState, useTransition } from 'react'
import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { ShieldCheck, FolderKanban, HandHelping, Loader2, Download } from 'lucide-react'
import { changeUserRole } from '../admin-actions'

type User = {
  id: string
  custom_id: string | null
  email: string
  full_name: string | null
  role: string
  created_at: string
  newsletter_opt_in: boolean
  newsletter_opt_in_at: string | null
}

const roleIcon: Record<string, React.ElementType> = {
  ADMIN: ShieldCheck, CHAPTER: FolderKanban, VOLUNTEER: HandHelping,
}
const roleBadge: Record<string, { bg: string; color: string }> = {
  ADMIN:     { bg: 'rgba(220,38,38,0.08)',  color: '#dc2626' },
  CHAPTER:   { bg: 'rgba(15,93,94,0.1)',    color: '#0F5D5E' },
  VOLUNTEER: { bg: 'rgba(77,183,229,0.1)',  color: '#238C91' },
}

export function UsersClient({ initialUsers, newsletterReady }: { initialUsers: User[]; newsletterReady: boolean }) {
  const [users, setUsers]             = useState(initialUsers)
  const [notice, setNotice]           = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [isPending, startTransition]  = useTransition()
  const [changingId, setChangingId]   = useState<string | null>(null)

  // Users who ticked "Send me The Bridge newsletter" at registration.
  const subscribers = users.filter((u) => u.newsletter_opt_in)

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

  // Weekly export for beehiiv (free tier has no API/webhooks): download a
  // CSV of opted-in emails and add new addresses to beehiiv manually.
  // CSV opens directly in Excel — no extra library needed.
  function downloadSubscribersCsv() {
    const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`
    const rows = subscribers.map((u) => [
      u.full_name || '',
      u.email,
      (u.newsletter_opt_in_at ? new Date(u.newsletter_opt_in_at) : new Date(u.created_at)).toISOString().slice(0, 10),
    ])
    const csv = [['Name', 'Email', 'Opted in on'], ...rows]
      .map((r) => r.map(escapeCell).join(','))
      .join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bridge-newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
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

      <div className="rounded-xl overflow-hidden mt-6" style={{ background: '#ffffff', border: '1px solid rgba(15,93,94,0.1)' }}>
        <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
          <div>
            <h2 className="text-sm font-bold" style={{ color: '#1F2933' }}>The Bridge newsletter — subscribers ({subscribers.length})</h2>
            <p className="text-xs mt-0.5" style={{ color: '#1F2933', opacity: 0.55 }}>
              Users who ticked “Send me The Bridge newsletter” at registration. Download the CSV each week and add new addresses to beehiiv manually.
            </p>
          </div>
          <button
            type="button"
            onClick={downloadSubscribersCsv}
            disabled={subscribers.length === 0}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
          >
            <Download className="size-3.5" /> Download CSV
          </button>
        </div>
        {!newsletterReady ? (
          <p className="px-5 py-6 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
            Newsletter columns are not in the database yet — run <span className="font-mono text-xs">supabase/add-newsletter-optin.sql</span> in the Supabase SQL Editor, then reload this page.
          </p>
        ) : subscribers.length === 0 ? (
          <p className="px-5 py-6 text-sm" style={{ color: '#1F2933', opacity: 0.4 }}>No subscribers yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#FAFAF7', borderBottom: '1px solid rgba(15,93,94,0.08)' }}>
                  {['Name', 'Email', 'Opted in on'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: '#1F2933', opacity: 0.45 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(15,93,94,0.05)' }}>
                    <td className="px-5 py-3.5 font-semibold" style={{ color: '#1F2933' }}>{u.full_name || '—'}</td>
                    <td className="px-5 py-3.5" style={{ color: '#1F2933', opacity: 0.65 }}>{u.email}</td>
                    <td className="px-5 py-3.5 text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>
                      {new Date(u.newsletter_opt_in_at ?? u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  )
}
