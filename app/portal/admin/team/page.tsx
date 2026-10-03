import { createServiceClient } from '@/lib/supabase/service'
import { TeamClient } from './team-client'

// Always read fresh DB data — never serve stale cache
export const dynamic = 'force-dynamic'

export default async function AdminTeamPage() {
  const service = createServiceClient()

  // First try with member_type column
  let { data: members, error } = await service
    .from('team_members')
    .select('id, name, role_title, country, bio, image_url, status, member_type')
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  // If member_type column doesn't exist yet, fall back without it
  if (error) {
    const fallback = await service
      .from('team_members')
      .select('id, name, role_title, country, bio, image_url, status')
      .eq('status', 'active')
      .order('created_at', { ascending: true })
    members = fallback.data as typeof members
  }

  // Ensure every row has member_type so the UI never crashes
  const safeMembers = (members ?? []).map(m => ({
    ...m,
    member_type: (m as { member_type?: string }).member_type ?? 'team',
  }))

  return <TeamClient initialMembers={safeMembers} />
}