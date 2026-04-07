'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

// ─── Helper ────────────────────────────────────────────────────────────────
async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

// ─── CHAPTER: Submit Report ─────────────────────────────────────────────────
export async function submitChapterReport(formData: FormData): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const excerpt_description = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const icon_emoji = (formData.get('icon') as string) || null

  if (!title || !content || !excerpt_description) return { error: 'Please fill in all required fields.' }

  const { error } = await supabase.from('reports').insert({
    chapter_id: user.id,
    title,
    excerpt_description,
    content,
    icon_emoji,
    status: 'pending_verification',
  })

  if (error) return { error: error.message }

  revalidatePath('/portal/chapter/my-submissions')
  return {}
}

// ─── CHAPTER: Submit Event ──────────────────────────────────────────────────
export async function submitChapterEvent(formData: FormData): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const start_date = formData.get('start_date') as string
  const end_date = formData.get('end_date') as string
  const location = formData.get('location') as string

  if (!title || !description || !start_date || !end_date || !location) {
    return { error: 'Please fill in all required fields.' }
  }

  const { error } = await supabase.from('events').insert({
    chapter_id: user.id,
    title,
    description,
    start_date: new Date(start_date).toISOString(),
    end_date: new Date(end_date).toISOString(),
    location,
    status: 'pending_verification',
  })

  if (error) return { error: error.message }

  revalidatePath('/portal/chapter/my-submissions')
  return {}
}

// ─── VOLUNTEER: Submit Vlog ─────────────────────────────────────────────────
export async function submitVolunteerVlog(formData: FormData): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const video_url = formData.get('video_url') as string
  const description = (formData.get('description') as string) || null

  if (!title || !video_url) return { error: 'Title and Video URL are required.' }

  // Basic URL validation
  try { new URL(video_url) } catch { return { error: 'Please enter a valid video URL.' } }

  const { error } = await supabase.from('vlogs').insert({
    volunteer_id: user.id,
    title,
    video_url,
    description,
    status: 'pending_verification',
  })

  if (error) return { error: error.message }

  revalidatePath('/portal/volunteer/my-performance')
  return {}
}

// ─── VOLUNTEER: Log Hours ───────────────────────────────────────────────────
export async function logVolunteerHours(formData: FormData): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { error: 'Not authenticated' }

  const activity_type = formData.get('activity_type') as string
  const hours_logged = parseFloat(formData.get('hours_logged') as string)
  const date = formData.get('date') as string
  const activity_description = formData.get('activity_description') as string

  if (!activity_type || !hours_logged || !date || !activity_description) {
    return { error: 'Please fill in all required fields.' }
  }
  if (hours_logged <= 0 || hours_logged > 24) {
    return { error: 'Hours must be between 0.5 and 24.' }
  }

  const { error } = await supabase.from('volunteer_attendance').insert({
    volunteer_id: user.id,
    activity_description: `[${activity_type}] ${activity_description}`,
    hours_logged,
    date: new Date(date).toISOString(),
    status: 'pending',
  })

  if (error) return { error: error.message }

  revalidatePath('/portal/volunteer/my-performance')
  return {}
}

// ─── VOLUNTEER: Upload Resource (file → Supabase Storage) ──────────────────
export async function uploadVolunteerResource(formData: FormData): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { error: 'Not authenticated' }

  const title = formData.get('title') as string
  const category = formData.get('category') as string
  const description = (formData.get('description') as string) || null
  const file = formData.get('file') as File | null

  if (!title || !category || !file) return { error: 'Title, category, and file are required.' }
  if (file.size > 10 * 1024 * 1024) return { error: 'File must be under 10MB.' }

  // Upload to Supabase Storage
  const ext = file.name.split('.').pop()
  const filePath = `${user.id}/${Date.now()}.${ext}`
  const { error: uploadError } = await supabase.storage
    .from('resources_bucket')
    .upload(filePath, file, { contentType: file.type, upsert: false })

  if (uploadError) return { error: `Upload failed: ${uploadError.message}` }

  // Get public URL
  const { data: urlData } = supabase.storage.from('resources_bucket').getPublicUrl(filePath)

  // Insert metadata into DB
  const { error } = await supabase.from('resources').insert({
    volunteer_id: user.id,
    title,
    category,
    description,
    file_url: urlData.publicUrl,
    status: 'pending_verification',
  })

  if (error) return { error: error.message }

  revalidatePath('/portal/volunteer/my-performance')
  return {}
}

// ─── ADMIN: Verify / Reject submission ─────────────────────────────────────
export async function verifySubmission(
  table: 'reports' | 'events' | 'resources' | 'vlogs' | 'volunteer_attendance',
  id: string,
  action: 'published' | 'rejected' | 'verified'
): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()
  if (!user) return { error: 'Not authenticated' }

  const updateData: Record<string, string> = { status: action }
  // For reports, stamp who verified it and when
  if (table === 'reports' && action === 'published') {
    updateData.verified_by = user.id
    updateData.published_date = new Date().toISOString()
  }

  const { error } = await supabase.from(table).update(updateData).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/portal/admin/approvals')
  revalidatePath('/portal/admin/users')
  return {}
}
