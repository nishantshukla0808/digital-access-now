import { createServiceClient } from '@/lib/supabase/service'
import { UsersClient } from './users-client'

export default async function AdminUsersPage() {
  const service = createServiceClient()

  const { data: users } = await service
    .from('users')
    .select('id, custom_id, email, full_name, role, created_at')
    .order('created_at', { ascending: false })

  return <UsersClient initialUsers={users ?? []} />
}
