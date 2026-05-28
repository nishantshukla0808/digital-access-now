import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { EventsHero } from '../_components/events-hero'
import { EventsTabs } from '../_components/events-tabs'

export const metadata = {
  title: 'Coming Soon Events | Digital Access Now',
  description: 'Coming soon events and collaboration announcements from Digital Access Now.',
}

export default async function ComingSoonEventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('id, title, description, start_date, end_date, location')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const comingSoon = (events ?? []).filter(e => !e.start_date)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <EventsHero subtitle="Coming soon collaborations and announcements from the DAN team" />
      <EventsTabs active="coming-soon" />

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
            Coming Soon
          </h2>
          {comingSoon.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-gray-600">
              New collaboration updates will appear here soon.
            </div>
          )}
          {comingSoon.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8">
              {comingSoon.map((e) => (
                <div key={e.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{e.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{e.description}</p>
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
