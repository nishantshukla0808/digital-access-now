import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog & Vlogs | Digital Access Now',
  description: 'Watch vlogs and read stories from our volunteers working in the field.',
}

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return `https://www.youtube.com/embed/${v}`
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    }
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

  const hasAny = (vlogs ?? []).length > 0

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
          <div role="heading" aria-level={1} className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 tracking-tight">
            BLOG & VLOGS
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Stories, insights, and videos from our volunteers in the field
          </p>
        </div>
      </section>

      {/* No vlogs yet — placeholder */}
      {!hasAny && (
        <section className="py-24 bg-gray-50 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-6xl mb-6">🎥</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              We'll update the blog & vlogs here in the future
            </h2>
            <p className="text-lg text-gray-600">
              Stay tuned for exciting new stories and vlogs from our volunteers!
            </p>
          </div>
        </section>
      )}

      {/* Vlogs grid — only when there is content */}
      {hasAny && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
              Volunteer Vlogs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(vlogs ?? []).map((v) => {
                const embed = getEmbedUrl(v.video_url)
                return (
                  <div key={v.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                      <div className="h-40 bg-gray-100 flex items-center justify-center text-5xl">🎥</div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <h3 className="font-bold text-lg mb-3">{v.title}</h3>
                      {v.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{v.description}</p>
                      )}
                      <a
                        href={v.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-blue font-bold hover:text-cyan-600 transition-all duration-300 flex items-center gap-2 text-sm"
                      >
                        Watch Video <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
