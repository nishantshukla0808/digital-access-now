import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { EventsHero } from '../_components/events-hero'
import { EventsTabs } from '../_components/events-tabs'
import { Bell, Globe, Users, Calendar } from 'lucide-react'

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
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />
      <EventsHero subtitle="Coming soon collaborations and announcements from the DAN team" />
      <EventsTabs active="coming-soon" />

      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {comingSoon.length === 0 ? (
            <>
              {/* What to expect cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                {[
                  { Icon: Globe, title: 'Global Events', desc: 'Chapter-hosted programs and community days across our 5+ country network.' },
                  { Icon: Users, title: 'Collaborations', desc: 'Partnerships with universities, corporations, and nonprofits for joint initiatives.' },
                  { Icon: Calendar, title: 'Workshops', desc: 'Digital literacy, AI, and career-readiness sessions for community members.' },
                  { Icon: Bell, title: 'Announcements', desc: 'New chapter launches, program expansions, and major milestones.' },
                ].map(({ Icon, title, desc }, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-6 border-l-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    style={{ background: '#ffffff', borderColor: '#E7ECEF', borderLeftColor: '#0F5D5E' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: '#EAF7FC' }}>
                      <Icon size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: '#1F2933' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>{desc}</p>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              <div className="rounded-2xl p-10 text-center" style={{ background: '#EAF7FC' }}>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: '#0F5D5E' }}
                >
                  <Bell size={26} strokeWidth={1.75} style={{ color: '#ffffff' }} />
                </div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: '#0F5D5E' }}>
                  New events coming soon
                </h2>
                <p className="text-base leading-relaxed max-w-lg mx-auto mb-6" style={{ color: '#1F2933', opacity: 0.75 }}>
                  New collaboration updates and event announcements will appear here. Follow us on social media to stay up to date.
                </p>
                <a
                  href="https://www.instagram.com/digitalaccessnow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-sm text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: '#0F5D5E' }}
                >
                  Follow @digitalaccessnow
                </a>
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {comingSoon.map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl p-6 border-l-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                  style={{ background: '#ffffff', borderColor: '#E7ECEF', borderLeftColor: '#4DB7E5' }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: '#EAF7FC', color: '#238C91' }}>
                    Coming Soon
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1F2933' }}>{e.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.7 }}>{e.description}</p>
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
