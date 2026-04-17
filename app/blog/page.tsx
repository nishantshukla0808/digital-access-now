import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { Video, Play, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Blog & Vlogs | Digital Access Now',
  description: 'Watch vlogs and read stories from our volunteers working in the field.',
}

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    // YouTube
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return `https://www.youtube.com/embed/${v}`
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    }
    // Vimeo
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}`
    }
  } catch {}
  return null
}

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: vlogs } = await supabase
    .from('vlogs')
    .select('id, title, description, video_url, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">BLOG</div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">VLOGS</div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">STORIES</div>
        </div>
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 tracking-tight">
            BLOG & VLOGS
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Stories, insights, and videos from our volunteers in the field
          </p>
        </div>
      </section>

      {/* Vlogs Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="heading" aria-level={2} className="text-xl md:text-2xl font-black mb-4 text-gray-900">
            VOLUNTEER VLOGS
          </div>
          <p className="text-gray-500 mb-12">Videos shared by our volunteers and approved by the DAN team.</p>

          {(vlogs ?? []).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-24 text-center">
              <Video className="mx-auto mb-4 size-12 text-gray-300" />
              <p className="text-gray-400 font-semibold text-lg">No vlogs published yet.</p>
              <p className="text-gray-400 text-sm mt-2">Our volunteers are creating content — check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {(vlogs ?? []).map((v) => {
                const embed = getEmbedUrl(v.video_url)
                return (
                  <article key={v.id} className="flex flex-col bg-white rounded-2xl border border-primary-blue/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {embed ? (
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={embed}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    ) : (
                      <a href={v.video_url} target="_blank" rel="noopener noreferrer"
                        className="h-40 bg-linear-to-br from-primary-blue/10 to-cyan-50 flex flex-col items-center justify-center gap-2 hover:from-primary-blue/20 transition-colors">
                        <Play className="size-10 text-primary-blue" />
                        <span className="text-xs font-semibold text-primary-blue flex items-center gap-1">Watch Video <ExternalLink className="size-3" /></span>
                      </a>
                    )}
                    <div className="p-6 flex flex-col gap-2 flex-1">
                      <h3 className="text-base font-black text-gray-950 leading-snug">{v.title}</h3>
                      {v.description && <p className="text-sm text-gray-600 line-clamp-2 flex-1">{v.description}</p>}
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(v.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
