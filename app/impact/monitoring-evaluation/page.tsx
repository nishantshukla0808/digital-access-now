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
            MONITORING & EVALUATION
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            How we measure and track our impact
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">OUR M&E FRAMEWORK</h2>

          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-3">Evaluation Approach</h3>
              <p className="text-gray-700 leading-relaxed">
                Digital Access Now employs a comprehensive monitoring and evaluation framework that combines quantitative metrics with qualitative insights. We track program outcomes, measure community-level impact, and continuously learn to improve our work.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">Key Metrics</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { metric: 'Device Access', measure: 'Devices distributed and actively used' },
                  { metric: 'Digital Skills', measure: 'Participants achieving certification' },
                  { metric: 'Community Reach', measure: 'Number of people reached' },
                  { metric: 'Sustainability', measure: 'Local programs maintained independently' },
                ].map((item, i) => (
                  <div key={i} className="bg-light-gray p-6 rounded-lg">
                    <h4 className="font-bold mb-2">{item.metric}</h4>
                    <p className="text-gray-700 text-sm">{item.measure}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">Data Collection Methods</h3>
              <ul className="text-gray-700 space-y-2">
                <li>✓ Pre/post program surveys and assessments</li>
                <li>✓ Focus group discussions with participants</li>
                <li>✓ Community-level interviews and observations</li>
                <li>✓ Digital platforms for real-time data tracking</li>
                <li>✓ Annual external impact evaluations</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary-blue text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">TRANSPARENCY IN ACTION</h3>
            <p className="mb-6">
              We're committed to transparency and accountability. View our latest M&E report for detailed findings.
            </p>
            <button className="bg-primary-blue hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
              Download M&E Report
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
