import { createServiceClient } from '@/lib/supabase/service'
import { ContentClient } from './content-client'

export default async function AdminContentPage() {
  const service = createServiceClient()

  const [{ data: reports }, { data: events }, { data: resources }, { data: vlogs }] = await Promise.all([
    service.from('reports').select('id, title, excerpt_description, created_at').eq('status', 'published').order('created_at', { ascending: false }),
    service.from('events').select('id, title, description, start_date, location, created_at').eq('status', 'published').order('start_date', { ascending: true }),
    service.from('resources').select('id, title, description, category, created_at').eq('status', 'published').order('created_at', { ascending: false }),
    service.from('vlogs').select('id, title, description, video_url, created_at').eq('status', 'published').order('created_at', { ascending: false }),
  ])

  return (
    <ContentClient
      reports={(reports ?? []).map(r => ({ id: r.id, title: r.title, created_at: r.created_at, excerpt: r.excerpt_description }))}
      events={(events ?? []).map(e => ({ id: e.id, title: e.title, created_at: e.created_at, excerpt: e.description, location: e.location, start_date: e.start_date }))}
      resources={(resources ?? []).map(r => ({ id: r.id, title: r.title, created_at: r.created_at, excerpt: r.description, category: r.category }))}
      vlogs={(vlogs ?? []).map(v => ({ id: v.id, title: v.title, created_at: v.created_at, excerpt: v.description, video_url: v.video_url }))}
    />
  )
}