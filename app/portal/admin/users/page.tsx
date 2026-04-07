import { adminNavItems } from '@/components/portal/portal-nav'
import { PortalShell } from '@/components/portal/portal-shell'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { ShieldCheck, FolderKanban, HandHelping, Search } from 'lucide-react'

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

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('users')
    .select('id, custom_id, email, full_name, role, created_at')
    .order('created_at', { ascending: false })

  return (
    <PortalShell
      role="admin"
      currentPath="/portal/admin/users"
      badge="User Management"
      title="All registered users across every role."
      subtitle="View, search and manage all Admins, Chapter Leads, and Volunteers. New users are auto-assigned a unique credential ID on signup."
      navItems={adminNavItems}
    >
      <Card className="border-primary-blue/15 bg-white">
        <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="text-2xl font-black text-gray-950">
              Users ({users?.length ?? 0})
            </CardTitle>
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2">
              <Search className="size-4 text-gray-400" />
              <span className="text-sm text-gray-400">Search coming soon</span>
            </div>
          </div>
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
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody>
                {!users || users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                      No users yet. Run the Supabase schema SQL to set up the database.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const Icon = roleIcon[user.role] ?? HandHelping
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
