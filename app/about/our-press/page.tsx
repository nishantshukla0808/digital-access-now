import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'

export default function Press() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient & Image Placeholders */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-primary-blue via-primary-purple to-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                PRESS & MEDIA
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-lg text-pretty">
                Latest news, press releases, and media coverage of our global impact
              </p>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4 h-64">
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">📰</div>
                  <p className="text-sm">Press Releases</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">📺</div>
                  <p className="text-sm">Media Coverage</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">🎥</div>
                  <p className="text-sm">Videos</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">🗂️</div>
                  <p className="text-sm">Media Kit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">PRESS RELEASES</h2>
          <div className="space-y-8">
            {[
              {
                date: 'January 19, 2026',
                title: 'Digital Access Now Releases Global Framework on Digital Equity',
                excerpt: 'New comprehensive framework provides actionable guidance for organizations worldwide seeking to bridge the digital divide...',
              },
              {
                date: 'December 1, 2025',
                title: 'Five Years in, Digital Access Now Proves Youth Leadership Works',
                excerpt: 'Organization celebrates milestone with 340K+ lives empowered across 52 countries, demonstrating the power of local leadership...',
              },
              {
                date: 'August 12, 2025',
                title: 'Digital Access Now Partners with Tech Leaders for Scale',
                excerpt: 'Strategic partnerships announced to accelerate digital access initiatives globally and reach underserved communities...',
              },
              {
                date: 'August 4, 2025',
                title: 'Emma Shockley Named Chief Programs Officer',
                excerpt: 'Experienced leader joins organization to expand program reach and impact across all regions of operation...',
              },
            ].map((press, i) => (
              <div key={i} className="border-b border-border-gray pb-8 last:border-b-0 hover:bg-light-gray p-4 rounded transition-all duration-300">
                <p className="text-red-accent font-semibold mb-2">{press.date}</p>
                <h3 className="text-2xl font-bold mb-3">{press.title}</h3>
                <p className="text-gray-700 mb-4">{press.excerpt}</p>
                <a href="#" className="text-primary-blue font-bold hover:text-primary-purple transition-all duration-300">
                  Read Full Release →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">IN THE NEWS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                publication: 'Global Tech Times',
                headline: 'How Digital Access Now is Bridging the Global Digital Divide',
              },
              {
                publication: 'International Development Review',
                headline: 'Youth Leaders Transforming Digital Equity Across Africa',
              },
              {
                publication: 'Tech for Social Good',
                headline: 'Scaling Digital Literacy Programs: A 5-Year Impact Study',
              },
              {
                publication: 'World Leaders Magazine',
                headline: 'Meet the Organizations Changing Global Access to Technology',
              },
            ].map((article, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <p className="text-red-accent font-semibold text-sm mb-2">{article.publication}</p>
                <h3 className="text-lg font-bold mb-4">{article.headline}</h3>
                <a href="#" className="text-primary-blue font-bold hover:text-primary-purple transition-all duration-300">
                  Read Article →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">MEDIA KIT</h2>
          <div className="bg-light-gray p-8 rounded-lg shadow-md">
            <p className="text-gray-700 mb-6 text-lg">
              Download our comprehensive media kit for logos, brand guidelines, leadership bios, high-resolution images, and fact sheets.
            </p>
            <button className="bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
              Download Media Kit (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-blue to-primary-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Have a Press Inquiry?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Contact our media relations team for interviews, quotes, or media requests.
          </p>
          <a href="mailto:press@digitalaccessnow.org" className="inline-block bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
            Contact Press Team
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
