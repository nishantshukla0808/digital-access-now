import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Impact Stories | Digital Access Now',
  description: 'Read real impact stories and reports from our chapters working to bridge the digital divide.',
}

export default async function ImpactStoriesPage() {
  const supabase = await createClient()

  const { data: reports } = await supabase
    .from('reports')
    .select('id, title, excerpt_description, content, icon_emoji, cover_image_url, published_date, created_at')
    .eq('status', 'published')
    .order('published_date', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero — same gradient as all other pages */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">IMPACT</div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">STORIES</div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">CHANGE</div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">CONNECT</div>
        </div>
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div role="heading" aria-level={1} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            IMPACT STORIES
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Real stories of change from our chapters around the world
          </p>
        </div>
      </section>

      {/* No reports yet — placeholder matching events/blog style */}
      {(reports ?? []).length === 0 && (
        <section className="py-24 bg-light-gray text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-6xl mb-6">📋</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              We'll update the impact stories here in the future
            </h2>
            <p className="text-lg text-gray-600">
              Stay tuned — our chapters are writing their stories of change.
            </p>
          </div>
        </section>
      )}

      {/* Program Stories — only shown when there is content */}
      {(reports ?? []).length > 0 && (
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
              Program Stories
            </h2>
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
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
