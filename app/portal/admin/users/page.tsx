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

  // Website subscribers live in a SEPARATE table (public.website_users,
  // supabase/add-website-users.sql) — website visitors are not portal
  // users. They are listed in the subscribers section below, merged with
  // the portal opt-ins and deduped by email in UsersClient.
  const { data: websiteUsers, error: websiteError } = await service
    .from('website_users')
    .select('id, email, full_name, newsletter_opt_in, newsletter_opt_in_at, created_at')
    .order('created_at', { ascending: false })

  const websiteSubscribers = (websiteError ? [] : (websiteUsers ?? []))
    .filter((u) => u.newsletter_opt_in)
    .map((u) => ({
      id: u.id,
      email: u.email,
      full_name: u.full_name,
      newsletter_opt_in_at: u.newsletter_opt_in_at as string | null,
      created_at: u.created_at as string,
    }))

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
    return (
      <UsersClient
        initialUsers={rows}
        newsletterReady={false}
        websiteSubscribers={websiteSubscribers}
        websiteReady={!websiteError}
      />
    )
  }

  return (
    <UsersClient
      initialUsers={users ?? []}
      newsletterReady={true}
      websiteSubscribers={websiteSubscribers}
      websiteReady={!websiteError}
    />
  )
}
