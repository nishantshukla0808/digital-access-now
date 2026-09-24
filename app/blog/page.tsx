import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, Play, BookOpen, Video } from 'lucide-react'

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
  const featuredUrl = 'https://www.youtube.com/watch?v=L92pl5a5Cho'
  const featuredEmbed = getEmbedUrl(featuredUrl)

  const { data: vlogs } = await supabase
    .from('vlogs')
    .select('id, title, description, video_url, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const hasAny = (vlogs ?? []).length > 0

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
            Stories from the field
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4" style={{ color: '#0F5D5E' }}>
                Blog &amp; Vlogs
              </h1>
              <p className="text-lg leading-relaxed max-w-prose" style={{ color: '#1F2933', opacity: 0.8 }}>
                Stories, insights, and videos from our volunteers and chapters — documenting the real-world impact of digital access.
              </p>
            </div>
            <div className="flex md:justify-end">
              <a
                href="https://www.youtube.com/watch?v=L92pl5a5Cho"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all duration-200 hover:opacity-90 shadow-md"
                style={{ background: '#0F5D5E' }}
              >
                Watch on YouTube <ArrowRight size={15} />
              </a>
            </div>
          </div>
          <div className="mt-10 h-px" style={{ background: 'linear-gradient(to right, #4DB7E5, #0F5D5E, transparent)' }} />
        </div>
      </section>

      {/* ── 2. FEATURED VIDEO ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-6 rounded-full shrink-0" style={{ background: '#4DB7E5' }} aria-hidden="true" />
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#4DB7E5' }}>Featured Video</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ background: '#000' }}>
              {featuredEmbed ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={featuredEmbed}
                    title="Digital Access Now featured video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <div
                  className="h-64 flex flex-col items-center justify-center gap-4"
                  style={{ background: '#EAF7FC' }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#0F5D5E' }}>
                    <Play size={24} style={{ color: '#fff' }} />
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#0F5D5E' }}>Video unavailable</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1F2933' }}>
                Student workshop spotlight
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#1F2933', opacity: 0.75 }}>
                A look inside a Digital Access Now student workshop where learners build real-world digital skills, gain confidence, and connect with mentors in their community.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={featuredUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{ background: '#0F5D5E' }}
                >
                  Watch on YouTube <Play size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VLOGS GRID or COMING SOON ─────────────────────────────────── */}
      {hasAny ? (
        <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-6 rounded-full shrink-0" style={{ background: '#238C91' }} aria-hidden="true" />
              <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#238C91' }}>Volunteer Vlogs</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(vlogs ?? []).map((v) => {
                const embed = getEmbedUrl(v.video_url)
                return (
                  <div
                    key={v.id}
                    className="rounded-xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: '#ffffff', borderColor: '#E7ECEF' }}
                  >
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
                      <div className="h-40 flex items-center justify-center" style={{ background: '#EAF7FC' }}>
                        <Video size={32} strokeWidth={1.5} style={{ color: '#0F5D5E' }} />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs font-semibold mb-2" style={{ color: '#4DB7E5' }}>
                        {new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: '#1F2933' }}>{v.title}</h3>
                      {v.description && (
                        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#1F2933', opacity: 0.65 }}>{v.description}</p>
                      )}
                      <a
                        href={v.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold hover:opacity-70 transition-opacity"
                        style={{ color: '#0F5D5E' }}
                      >
                        Watch Video <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        /* ── 3b. Coming Soon placeholder ────── */
        <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {[
                {
                  Icon: BookOpen,
                  title: 'Written Stories',
                  desc: 'In-depth articles from volunteers, chapter leaders, and community members about their work and impact.',
                },
                {
                  Icon: Video,
                  title: 'Volunteer Vlogs',
                  desc: 'Short video dispatches from our volunteers around the world, documenting programs in action.',
                },
                {
                  Icon: Play,
                  title: 'Event Highlights',
                  desc: 'Recaps and recordings of DAN workshops, summits, and community events.',
                },
              ].map(({ Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 border-l-4 transition-all duration-200"
                  style={{ background: '#ffffff', borderColor: '#E7ECEF', borderLeftColor: '#0F5D5E' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: '#EAF7FC' }}>
                    <Icon size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#1F2933' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-10 text-center" style={{ background: '#EAF7FC' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#0F5D5E' }}>
                <BookOpen size={26} strokeWidth={1.75} style={{ color: '#ffffff' }} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#0F5D5E' }}>
                More stories coming soon
              </h2>
              <p className="text-base leading-relaxed max-w-lg mx-auto" style={{ color: '#1F2933', opacity: 0.75 }}>
                We&apos;ll be sharing articles, vlogs, and event highlights from our volunteers and chapters around the world. Stay tuned.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F5D5E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Want to share your story?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            If you&apos;re a DAN volunteer or chapter leader with a story, vlog, or reflection to share — reach out to us.
          </p>
          <a
            href="mailto:hello@digitalaccessnow.org"
            className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: '#ffffff', color: '#0F5D5E' }}
          >
            Get in Touch <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
