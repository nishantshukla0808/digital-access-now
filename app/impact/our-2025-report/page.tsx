import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-footer-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            OUR 2025 REPORT
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            A year of growth, innovation, and global impact
          </p>
        </div>
      </section>

      {/* Report Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">2025: A YEAR OF UNPRECEDENTED GROWTH</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Digital Access Now's 2025 Impact Report captures our journey of growth and our vision for the future. From expanding to new countries to deepening our impact in existing communities, 2025 represents a turning point in our mission to bridge the digital divide.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="bg-light-gray p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-bold mb-6">KEY HIGHLIGHTS</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { stat: '340K+', label: 'Lives Empowered' },
                { stat: '89K+', label: 'Devices Distributed' },
                { stat: '245', label: 'Communities Served' },
                { stat: '15K+', label: 'Active Volunteers' },
              ].map((highlight, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-red-accent">{highlight.stat}</div>
                  <div className="text-gray-700 font-semibold">{highlight.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-8 mb-12">
            {[
              {
                title: 'Expanding Global Reach',
                content: 'In 2025, we expanded operations to 12 new countries, reaching previously underserved regions and establishing local partnerships.',
              },
              {
                title: 'Innovative Programs',
                content: 'We launched three new flagship programs including AI Literacy Initiative, Digital Entrepreneurship, and Accessibility for All.',
              },
              {
                title: 'Youth Leadership',
                content: 'Our youth-led model continues to prove effective, with 15,000+ volunteers contributing over 2.1 million hours.',
              },
              {
                title: 'Strategic Partnerships',
                content: 'Strategic alliances with tech companies, governments, and NGOs accelerated our ability to scale solutions.',
              },
            ].map((section, i) => (
              <div key={i} className="border-l-4 border-red-accent pl-6">
                <h4 className="text-xl font-bold mb-2">{section.title}</h4>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Download */}
          <div className="bg-primary-blue text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">DOWNLOAD FULL REPORT</h3>
            <p className="mb-6">Access the complete 2025 Impact Report with detailed metrics, case studies, and insights.</p>
            <button className="bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
              Download PDF Report
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
