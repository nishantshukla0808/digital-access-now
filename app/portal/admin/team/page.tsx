import { createServiceClient } from '@/lib/supabase/service'
import { TeamClient } from './team-client'

export default async function AdminTeamPage() {
  const service = createServiceClient()

  const { data: members } = await service
    .from('team_members')
    .select('id, name, role_title, country, bio, image_url, status')
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  return <TeamClient initialMembers={members ?? []} />
}