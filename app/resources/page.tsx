import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Wifi } from 'lucide-react'

export default function Resources() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">
            WIFI
          </div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">
            ACCESS
          </div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">
            DIGITAL
          </div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">
            CONNECT
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            RESOURCES
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Essential tools and solutions for digital equity and inclusion
          </p>
        </div>
      </section>

      {/* WiFi Finder Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            FREE WIFI FINDER
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-primary-blue">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
                  Find free WiFi hotspots across Philadelphia. Access the internet at over 1,000 locations including libraries, community centers, parks, and public spaces.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>1,000+ free WiFi locations across Philadelphia</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Interactive map with real-time availability</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Free access at libraries, parks, and community centers</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>No registration or login required</span>
                  </li>
                </ul>
                <a 
                  href="https://www.phila.gov/wifi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Wifi className="w-6 h-6" />
                  Find Free WiFi
                </a>
              </div>
              <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                  <div className="text-center space-y-6">
                    <div className="text-7xl">📡</div>
                    <h3 className="text-2xl font-bold text-gray-900">Philadelphia WiFi Network</h3>
                    <div className="space-y-4 text-left">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Network Name (SSID)</p>
                        <p className="text-gray-600">PHLWiFi</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Coverage Areas</p>
                        <p className="text-gray-600">Libraries, Parks, Community Centers</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Cost</p>
                        <p className="text-primary-blue font-bold">100% FREE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Solutions Overview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            DIGITAL SOLUTIONS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                We partner with governments, NGOs, and private sector organizations to design and implement comprehensive digital access and literacy programs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our tailored solutions address the unique challenges faced by underserved communities, ensuring sustainable impact through infrastructure, training, and ongoing support.
              </p>
              <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Partner With Us
              </button>
            </div>
            <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center shadow-lg">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🤝</div>
                <p>Resources Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Breakdown */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            OUR SERVICES
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
              <details key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-primary-blue">
                <summary className="font-bold text-xl md:text-2xl flex justify-between items-center text-gray-900">
                  {service.title}
                  <span className="text-primary-blue text-2xl">+</span>
                </summary>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.details.map((detail, j) => (
                      <div key={j} className="text-gray-600 flex items-center gap-2">
                        <span className="text-primary-blue font-bold">✓</span>
                        {detail}
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
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            Ready to Transform Digital Equity in Your Community?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Contact our team to discuss how we can support your organization's digital access goals.
          </p>
          <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Schedule a Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
