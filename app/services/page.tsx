import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-footer-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            OUR SERVICES
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive solutions for digital equity and inclusion
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tailored Solutions for Digital Transformation
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We partner with governments, NGOs, and private sector organizations to design and implement comprehensive digital access and literacy programs.
              </p>
              <button className="bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors">
                Partner With Us
              </button>
            </div>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🤝</div>
                <p>Services Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            REACH OUT ABOUT OUR SERVICES
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'Digital Infrastructure Solutions',
                description: 'Assessment and implementation of technology infrastructure to support digital access initiatives.',
                details: ['Network assessment', 'Hardware procurement', 'Device setup', 'Technical support'],
              },
              {
                title: 'Training & Capacity Building',
                description: 'Comprehensive training programs designed for specific communities and organizational needs.',
                details: ['Curriculum development', 'Trainer certification', 'Workshop delivery', 'Ongoing support'],
              },
              {
                title: 'Program Sponsorship',
                description: 'Financial and operational support to scale digital equity programs in underserved regions.',
                details: ['Full program funding', 'Monitoring & evaluation', 'Impact reporting', 'Sustainability planning'],
              },
              {
                title: 'Consulting & Advisory',
                description: 'Expert guidance on digital equity strategy and implementation for organizations.',
                details: ['Strategic planning', 'Best practices guidance', 'Policy development', 'Peer learning networks'],
              },
            ].map((service, i) => (
              <details key={i} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <summary className="font-bold text-lg flex justify-between items-center">
                  {service.title}
                  <span className="text-primary-blue">+</span>
                </summary>
                <div className="mt-4 pt-4 border-t border-border-gray">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {service.details.map((detail, j) => (
                      <div key={j} className="text-sm text-gray-600">
                        ✓ {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Digital Equity in Your Community?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Contact our services team to discuss how we can support your organization's digital access goals.
          </p>
          <button className="bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors mr-4">
            Schedule a Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
