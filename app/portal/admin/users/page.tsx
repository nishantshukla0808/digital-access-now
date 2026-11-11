import { createServiceClient } from '@/lib/supabase/service'
import { UsersClient } from './users-client'

export default async function AdminUsersPage() {
  const service = createServiceClient()

  // Newsletter columns come from supabase/add-newsletter-optin.sql.
  // If that SQL hasn't been run yet, fall back to the base columns so
  // the users page keeps working (same pattern as the team page's
  // member_type fallback).
  const { data: users, error } = await service
    .from('users')
    .select('id, custom_id, email, full_name, role, created_at, newsletter_opt_in, newsletter_opt_in_at')
    .order('created_at', { ascending: false })

  if (error) {
    const { data: fallbackUsers } = await service
      .from('users')
      .select('id, custom_id, email, full_name, role, created_at')
      .order('created_at', { ascending: false })
    const rows = (fallbackUsers ?? []).map((u) => ({
      ...u,
      newsletter_opt_in: false,
      newsletter_opt_in_at: null as string | null,
    }))
    return <UsersClient initialUsers={rows} newsletterReady={false} />
  }

  return <UsersClient initialUsers={users ?? []} newsletterReady={true} />
}
