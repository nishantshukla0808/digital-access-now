import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight } from 'lucide-react'

export default async function OurImpactPage() {
  const supabase = await createClient()

  const { data: reports } = await supabase
    .from('reports')
    .select('id, title, excerpt_description, icon_emoji, cover_image_url, published_date, created_at')
    .eq('status', 'published')
    .order('published_date', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — same dark hero as existing impact sub-pages */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-footer-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            OUR IMPACT
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Measuring the real-world change we're making
          </p>
        </div>
      </section>

      {/* Impact Metrics — kept as-is, these are accurate org-level stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { number: '340K+', label: 'Lives Empowered' },
              { number: '89K+', label: 'Devices Distributed' },
              { number: '245', label: 'Communities Served' },
              { number: '52', label: 'Countries' },
            ].map((stat, i) => (
              <div key={i} className="bg-light-gray p-8 rounded-lg text-center">
                <div className="text-5xl font-bold text-primary-blue mb-2">{stat.number}</div>
                <p className="text-gray-700 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Change — live from DB */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">STORIES OF CHANGE</h2>

          {(reports ?? []).length === 0 ? (
            // Fallback hardcoded cards while DB is empty
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Sarah's Journey in Rural India", excerpt: 'From having no computer access to becoming a digital trainer helping 50+ students daily...', icon: '🌟' },
                { title: 'Community Tech Hub in Nigeria', excerpt: 'A once-isolated village now has internet access, creating new educational and economic opportunities...', icon: '🚀' },
                { title: 'Youth Leaders in Latin America', excerpt: 'Young advocates are now shaping digital policy in their countries and regions...', icon: '🌍' },
              ].map((story, i) => (
                <div key={i} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{story.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                  <p className="text-gray-700 mb-4">{story.excerpt}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {(reports ?? []).map((r) => (
                <div key={r.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {r.cover_image_url ? (
                    <div className="h-40 -mx-8 -mt-8 mb-4 overflow-hidden rounded-t-lg">
                      <img src={r.cover_image_url} alt={r.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="text-5xl mb-4">{r.icon_emoji || '📋'}</div>
                  )}
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(r.published_date || r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="text-xl font-bold mb-3">{r.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{r.excerpt_description}</p>
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
