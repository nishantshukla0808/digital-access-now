import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Events | Digital Access Now',
  description: 'Upcoming and past events hosted by Digital Access Now chapters worldwide.',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
}
function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default async function EventsPage() {
  const supabase = await createClient()
  const today = new Date().toISOString()

  const { data: events } = await supabase
    .from('events')
    .select('id, title, description, start_date, end_date, location')
    .eq('status', 'published')
    .order('start_date', { ascending: true })

  const upcoming = (events ?? []).filter(e => e.start_date >= today)
  const past = (events ?? []).filter(e => e.start_date < today).reverse()
  const hasAny = (events ?? []).length > 0

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — matches all other pages */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">EVENTS</div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">CHAPTERS</div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">CONNECT</div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">COMMUNITY</div>
        </div>
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div role="heading" aria-level={1} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            EVENTS
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Events hosted and organised by our chapters — verified by the DAN team
          </p>
        </div>
      </section>

      {/* Featured Upcoming Event */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 shadow-xl">
            <div className="relative p-6 md:p-8 lg:p-10">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-blue/10 text-primary-blue text-sm font-semibold">
                    Upcoming Featured Event
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                    Rewriting the Script: South Asians Building the Next Wave of Tech, Media & Community & AI - #NYTechWeek
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A room for South Asian founders, operators, investors, and creatives to talk about building in the AI-native economy.
                    Panel discussion followed by open networking and a DJ set.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">June 1, 2026 | 6:00 PM</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary-blue/10 text-primary-blue text-sm font-semibold">Panel + Networking</span>
                    <span className="px-3 py-1 rounded-full bg-primary-purple/10 text-primary-purple text-sm font-semibold">DJ Set</span>
                  </div>
                  <a
                    href="https://partiful.com/e/0xML5T8sg8hOEKSOgMcv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-full bg-primary-blue text-white font-bold hover:bg-cyan-600 transition-colors"
                  >
                    More info and RSVP
                  </a>
                </div>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/90 p-4 border border-slate-100 shadow-lg">
                  <div className="rounded-xl bg-slate-50 p-3 flex items-center justify-center">
                    <img
                      src="https://i.ibb.co/TB2MY29c/Whats-App-Image-2026-05-23-at-22-21-39-Picsart-Ai-Image-Enhancer.jpg"
                      alt="Event poster with registration QR code"
                      className="w-full max-h-[460px] sm:max-h-[420px] md:max-h-[460px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Poster with registration QR</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 border border-slate-100 shadow-lg">
                  <div className="rounded-xl bg-slate-50 p-3 flex items-center justify-center">
                    <img
                      src="https://i.ibb.co/9kRzShzv/Whats-App-Image-2026-05-23-at-22-21-42-Picsart-Ai-Image-Enhancer.jpg"
                      alt="Event hosts poster"
                      className="w-full max-h-[460px] sm:max-h-[420px] md:max-h-[460px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Hosts and speakers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
              Upcoming Events
            </h2>
            <div className="space-y-6">
              {upcoming.map(e => (
                <div key={e.id} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-primary-blue">
                  <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
                    {/* Left: Title + Description */}
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{e.title}</h3>
                      <p className="text-lg text-gray-700 leading-relaxed">{e.description}</p>
                    </div>
                    {/* Right: Info Panel */}
                    <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100 space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Date</p>
                        <p className="text-gray-600">{formatDate(e.start_date)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Time</p>
                        <p className="text-gray-600">{formatTime(e.start_date)} – {formatTime(e.end_date)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold text-gray-900 mb-1">Location</p>
                        <p className="text-primary-blue font-bold">{e.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      {past.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
              Past Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {past.map(e => (
                <div key={e.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="h-40 bg-gray-100 flex items-center justify-center text-5xl">📅</div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(e.start_date)} · {e.location}
                    </p>
                    <h3 className="font-bold text-lg mb-3 text-gray-900">{e.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
