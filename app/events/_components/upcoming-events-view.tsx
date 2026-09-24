import { createClient } from '@/lib/supabase/server'
import { EventsHero } from './events-hero'
import { EventsTabs } from './events-tabs'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
}

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export async function UpcomingEventsView() {
  const supabase = await createClient()
  const today = new Date().toISOString()

  const { data: events } = await supabase
    .from('events')
    .select('id, title, description, start_date, end_date, location')
    .eq('status', 'published')
    .order('start_date', { ascending: false })

  // All DB events now treated as past (no upcoming DB events)
  const past = (events ?? []).filter(e => e.start_date && e.start_date < today)

  return (
    <>
      <EventsHero subtitle="Past events hosted and organised by our chapters worldwide" />
      <EventsTabs active="past" />

      {/* Hardcoded past event — NY Tech Week (June 1, 2026) */}
      <section className="py-12 md:py-16" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border shadow-xl" style={{ borderColor: '#E7ECEF', background: 'linear-gradient(135deg, #ffffff 0%, #FAFAF7 50%, #EAF7FC 100%)' }}>
            <div className="relative p-6 md:p-8 lg:p-10">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-white p-4 border shadow-lg" style={{ borderColor: '#E7ECEF' }}>
                    <div className="rounded-xl p-3" style={{ background: '#FAFAF7' }}>
                      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
                        <div className="min-w-full snap-center flex items-center justify-center">
                          <img
                            src="https://i.ibb.co/TB2MY29c/Whats-App-Image-2026-05-23-at-22-21-39-Picsart-Ai-Image-Enhancer.jpg"
                            alt="Event poster with registration QR code"
                            className="w-full h-[520px] object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-full snap-center flex items-center justify-center">
                          <img
                            src="https://i.ibb.co/9kRzShzv/Whats-App-Image-2026-05-23-at-22-21-42-Picsart-Ai-Image-Enhancer.jpg"
                            alt="Event hosts poster"
                            className="w-full h-[520px] object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: '#EAF7FC', color: '#238C91' }}>
                    Past Event · #NYTechWeek
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight" style={{ color: '#1F2933' }}>
                    Rewriting the Script: South Asians Building the Next Wave of Tech, Media &amp; Community &amp; AI
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>
                    A room for South Asian founders, operators, investors, and creatives to talk about building in the AI-native economy.
                    Panel discussion followed by open networking and a DJ set.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-xl border bg-white px-4 py-2 shadow-sm" style={{ borderColor: '#E7ECEF' }}>
                      <p className="text-sm font-semibold" style={{ color: '#1F2933' }}>June 1, 2026 | 6:00 PM</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: '#EAF7FC', color: '#0F5D5E' }}>Panel + Networking</span>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: '#EAF7FC', color: '#238C91' }}>DJ Set</span>
                  </div>
                  <a
                    href="https://partiful.com/e/0xML5T8sg8hOEKSOgMcv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-full font-bold transition-colors"
                    style={{ background: '#0F5D5E', color: '#ffffff' }}
                  >
                    More info and RSVP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardcoded past event — UDEI IC DEA 2026 */}
      <section className="py-8 md:py-12" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border shadow-xl overflow-hidden" style={{ borderColor: '#EAF7FC', background: 'linear-gradient(135deg, #ffffff 0%, #FAFAF7 60%, #EAF7FC 100%)' }}>
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 md:p-8">
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white p-4 border shadow-lg" style={{ borderColor: '#E7ECEF' }}>
                  <img
                    src="https://i.ibb.co/Y4tJZrg9/Whats-App-Image-2026-05-26-at-11-20-50-Picsart-Ai-Image-Enhancer.jpg"
                    alt="UDEI IC DEA 2026 poster"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: '#EAF7FC', color: '#238C91' }}>
                  Past Highlight · UDEI IC DEA 2026 · SDG 4
                </div>
                <h3 className="text-2xl md:text-3xl font-black leading-tight" style={{ color: '#1F2933' }}>
                  International Conference on Digital Education for All (Hybrid)
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>
                  Cohosted by Bahrain Polytechnic, Christ University (Bengaluru), and KIIT (Bhubaneswar). Speaker highlight: Ritika Malik, Founder of Digital Access Now.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: '#EAF7FC', color: '#0F5D5E' }}>Hybrid</span>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://www.emeraldgrouppublishing.com/calls-for-papers/digital-education-all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold transition-colors"
                    style={{ background: '#0F5D5E', color: '#ffffff' }}
                  >
                    View details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional past events from DB */}
      {past.length > 0 && (
        <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12" style={{ color: '#1F2933' }}>
              More Past Events
            </h2>
            <div className="space-y-6">
              {past.map(e => (
                <div key={e.id} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4" style={{ borderTopColor: '#0F5D5E' }}>
                  <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#1F2933' }}>{e.title}</h3>
                      <p className="text-lg leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>{e.description}</p>
                    </div>
                    <div className="rounded-2xl p-6 border-2 space-y-4" style={{ background: '#FAFAF7', borderColor: '#E7ECEF' }}>
                      <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#E7ECEF' }}>
                        <p className="font-semibold mb-1" style={{ color: '#1F2933' }}>Date</p>
                        <p style={{ color: '#1F2933', opacity: 0.7 }}>{formatDate(e.start_date)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#E7ECEF' }}>
                        <p className="font-semibold mb-1" style={{ color: '#1F2933' }}>Time</p>
                        <p style={{ color: '#1F2933', opacity: 0.7 }}>
                          {formatTime(e.start_date)}{e.end_date ? ` – ${formatTime(e.end_date)}` : ''}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border" style={{ borderColor: '#E7ECEF' }}>
                        <p className="font-semibold mb-1" style={{ color: '#1F2933' }}>Location</p>
                        <p className="font-bold" style={{ color: '#0F5D5E' }}>{e.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
