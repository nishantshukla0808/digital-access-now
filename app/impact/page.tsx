import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { BookOpen, Download, FileText, ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Impact Stories | Digital Access Now',
  description: 'Read real impact stories and reports from our chapters working to bridge the digital divide.',
}

export default async function ImpactPage() {
  const supabase = await createClient()

  const { data: reports } = await supabase
    .from('reports')
    .select('id, title, excerpt_description, content, icon_emoji, cover_image_url, published_date, created_at')
    .eq('status', 'published')
    .order('published_date', { ascending: false })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 tracking-tight">
            IMPACT STORIES
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Real stories of change from our chapters on the ground
          </p>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="heading" aria-level={2} className="text-xl md:text-2xl font-black mb-4 text-gray-900">
            CHAPTER REPORTS & STORIES
          </div>
          <p className="text-gray-500 mb-12">Published and verified stories from our global network of chapters.</p>

          {(reports ?? []).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-24 text-center">
              <BookOpen className="mx-auto mb-4 size-12 text-gray-300" />
              <p className="text-gray-400 font-semibold text-lg">No impact stories published yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon — our chapters are writing their stories.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {(reports ?? []).map((r) => (
                <article
                  key={r.id}
                  className="group flex flex-col bg-white rounded-2xl border border-primary-blue/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Cover or emoji banner */}
                  {r.cover_image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img src={r.cover_image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-32 bg-linear-to-br from-primary-blue/10 to-cyan-50 flex items-center justify-center">
                      <span className="text-5xl">{r.icon_emoji || '📋'}</span>
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-6 gap-3">
                    <h3 className="text-lg font-black text-gray-950 leading-snug">{r.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">{r.excerpt_description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.published_date || r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
