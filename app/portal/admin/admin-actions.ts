'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'

// ─── Add Team Member ────────────────────────────────────────────────────────
export async function addTeamMember(formData: FormData): Promise<{ error?: string }> {
  const service = createServiceClient()
  const name       = (formData.get('name')       as string)?.trim()
  const role_title = (formData.get('role_title') as string)?.trim()
  const country    = (formData.get('country')    as string)?.trim() || 'Global'
  const bio        = (formData.get('bio')        as string)?.trim() || null
  const image_url  = (formData.get('image_url')  as string)?.trim()
  const member_type = ((formData.get('member_type') as string)?.trim() || 'team') === 'advisory' ? 'advisory' : 'team'

  if (!name || !role_title || !image_url) {
    return { error: 'Name, role, and photo URL are required.' }
  }

  // Try inserting with member_type first
  const { error } = await service
    .from('team_members')
    .insert({ name, role_title, country, bio, image_url, status: 'active', member_type })

  if (error) {
    // If the column is missing from Supabase schema cache, insert without it
    if (error.message.includes('member_type')) {
      const { error: fallbackError } = await service
        .from('team_members')
        .insert({ name, role_title, country, bio, image_url, status: 'active' })

      if (fallbackError) return { error: fallbackError.message }

      revalidatePath('/portal/admin/team')
      revalidatePath('/about/our-team')
      // Warn admin that member_type column is missing
      return { error: "⚠ Member added as Core Team, but Advisory Board support requires the member_type column in Supabase. Run: ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS member_type text NOT NULL DEFAULT 'team' CHECK (member_type IN ('team', 'advisory')); — then reload the schema cache." }
    }
    return { error: error.message }
  }

  revalidatePath('/portal/admin/team')
  revalidatePath('/about/our-team')
  return {}
}

// ─── Remove Team Member ─────────────────────────────────────────────────────
export async function removeTeamMember(id: string): Promise<{ error?: string }> {
  const service = createServiceClient()
  const { error } = await service.from('team_members').update({ status: 'inactive' }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/portal/admin/team')
  revalidatePath('/about/our-team')
  return {}
}

// ─── Delete Published Content ───────────────────────────────────────────────
export async function deleteContent(
  table: 'reports' | 'events' | 'resources' | 'vlogs',
  id: string
): Promise<{ error?: string }> {
  const service = createServiceClient()
  const { error } = await service.from(table).delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/portal/admin/content')
  revalidatePath('/portal/admin/approvals')
  return {}
}

// ─── Unpublish Content (set back to pending) ────────────────────────────────
export async function unpublishContent(
  table: 'reports' | 'events' | 'resources' | 'vlogs',
  id: string
): Promise<{ error?: string }> {
  const service = createServiceClient()
  const { error } = await service.from(table).update({ status: 'pending_verification' }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/portal/admin/content')
  revalidatePath('/portal/admin/approvals')
  return {}
}

// ─── Approve / Reject submission (uses service client to bypass RLS) ────────
export async function approveOrReject(
  table: 'reports' | 'events' | 'resources' | 'vlogs' | 'volunteer_attendance',
  id: string,
  action: 'published' | 'rejected' | 'verified'
): Promise<{ error?: string }> {
  const service = createServiceClient()

  const updateData: Record<string, string> = { status: action }
  if (table === 'reports' && action === 'published') {
    updateData.published_date = new Date().toISOString()
  }
  if (table === 'volunteer_attendance' && action === 'verified') {
    updateData.status = 'verified'
  }

  const { error } = await service.from(table).update(updateData).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/portal/admin/approvals')
  revalidatePath('/portal/admin/performance')
  revalidatePath('/portal/admin/dashboard')
  revalidatePath('/impact/our-impact')
  revalidatePath('/events')
  revalidatePath('/resources')
  revalidatePath('/blog')
  return {}
}

// ─── Update a Site Metric (impact/fundraising figures) ─────────────────────
export async function updateSiteMetric(
  key: string,
  value: string
): Promise<{ error?: string }> {
  const service = createServiceClient()
  const { error } = await service
    .from('site_metrics')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) return { error: error.message }
  // Revalidate all pages that show public metrics
  revalidatePath('/portal/admin/impact')
  revalidatePath('/portal/admin/fundraising')
  revalidatePath('/impact')
  revalidatePath('/')
  return {}
}

// ─── Change a user's role ────────────────────────────────────────────────────
export async function changeUserRole(
  userId: string,
  newRole: 'ADMIN' | 'CHAPTER' | 'VOLUNTEER'
): Promise<{ error?: string }> {
  const service = createServiceClient()
  const { error } = await service
    .from('users')
    .update({ role: newRole })
    .eq('id', userId)
  if (error) return { error: error.message }
  revalidatePath('/portal/admin/users')
  return {}
}
