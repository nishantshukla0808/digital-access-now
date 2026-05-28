import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { EventsHero } from '../_components/events-hero'
import { EventsTabs } from '../_components/events-tabs'

export const metadata = {
  title: 'Past Events | Digital Access Now',
  description: 'Past events hosted by Digital Access Now chapters worldwide.',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function PastEventsPage() {
  const supabase = await createClient()
  const today = new Date().toISOString()

  const { data: events } = await supabase
    .from('events')
    .select('id, title, description, start_date, end_date, location')
    .eq('status', 'published')
    .order('start_date', { ascending: false })

  const past = (events ?? []).filter(e => e.start_date && e.start_date < today)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EventsHero subtitle="Past events hosted and organised by our chapters worldwide" />
      <EventsTabs active="past" />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
            Past Events
          </h2>
          <div className="rounded-2xl border border-primary-purple/20 bg-gradient-to-br from-white via-purple-50/50 to-sky-50 shadow-xl overflow-hidden mb-12">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 md:p-8">
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white p-4 border border-slate-100 shadow-lg">
                  <img
                    src="https://i.ibb.co/Y4tJZrg9/Whats-App-Image-2026-05-26-at-11-20-50-Picsart-Ai-Image-Enhancer.jpg"
                    alt="UDEI IC DEA 2026 poster"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-purple/10 text-primary-purple text-sm font-semibold">
                  Past Highlight · UDEI IC DEA 2026 · SDG 4
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  International Conference on Digital Education for All (Hybrid)
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Cohosted by Bahrain Polytechnic, Christ University (Bengaluru), and KIIT (Bhubaneswar). Speaker highlight: Ritika Malik, Founder of Digital Access Now.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-blue/10 text-primary-blue text-sm font-semibold">Hybrid</span>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://www.emeraldgrouppublishing.com/calls-for-papers/digital-education-all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary-blue text-white font-bold hover:bg-cyan-600 transition-colors"
                  >
                    View details
                  </a>
                </div>
              </div>
            </div>
          </div>
          {past.length > 0 && (
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
