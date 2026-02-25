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

      {/* DigitalEquityPHL Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            DIGITAL EQUITY PHL
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-primary-blue">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
                  DigitalEquityPHL, led by the City of Philadelphia's Office of Innovation and Technology (OIT), works to ensure that every resident has access to reliable internet, modern devices, and the digital skills needed to thrive.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Partnerships with community organizations</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Addressing unaffordable internet barriers</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Modern device access programs</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Coordinated citywide strategies</span>
                  </li>
                </ul>
                <a 
                  href="https://www.phila.gov/programs/digitalequityphl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Visit DigitalEquityPHL
                </a>
              </div>
              <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Bridging Philadelphia's Digital Divide</h3>
                    <div className="space-y-4 text-left">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Mission</p>
                        <p className="text-gray-600">Ensure every resident has reliable internet access</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Led By</p>
                        <p className="text-gray-600">City of Philadelphia's Office of Innovation and Technology</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Focus</p>
                        <p className="text-primary-blue font-bold">Building a Connected, Inclusive Philadelphia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philadelphia Programs & Events Portal Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            PHILADELPHIA CITY PROGRAMS & EVENTS
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-primary-blue">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
                  Explore programs and events from the City of Philadelphia. As an organization based in Philadelphia, we stay connected to local opportunities, partnerships, and funding initiatives.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Discover city programs and initiatives</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Find upcoming community events</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Explore partnership opportunities</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Stay informed about funding initiatives</span>
                  </li>
                </ul>
                <a 
                  href="https://login.microsoftonline.com/2046864f-68ea-497d-af34-a6629a6cd700/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=E3BA51F9041E43F52A1DA4F3312D320F4CAFFA8210D79E6A%2D2811DCE781420E6E1E8A7EA3F252CBE4EBED65239BB050546D4D9CFF38FEC10F&redirect%5Furi=https%3A%2F%2Fphila%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=f280faa1%2D50fc%2Db000%2Df9c8%2D59f0c5c11613&sso_reload=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore City Events
                </a>
              </div>
              <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">City of Philadelphia</h3>
                    <div className="space-y-4 text-left">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Local Programs</p>
                        <p className="text-gray-600">Browse Philadelphia initiatives</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Community Events</p>
                        <p className="text-gray-600">Discover upcoming opportunities</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Partnerships</p>
                        <p className="text-primary-blue font-bold">Funding & Collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Northstar Digital Literacy Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            NORTHSTAR DIGITAL LITERACY
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-primary-blue">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
                  Provide constituents with tools to master the digital skills needed to work, learn, and participate fully in daily life. Northstar Digital Literacy offers comprehensive online learning modules.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Access online digital skills learning modules</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Moderate and track learner progress</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Advance your own digital skills</span>
                  </li>
                  <li className="flex items-start gap-3 text-lg text-gray-600">
                    <span className="text-primary-blue font-bold mt-1">✓</span>
                    <span>Industry-recognized assessment and certification</span>
                  </li>
                </ul>
                <a 
                  href="https://www.digitalliteracyassessment.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Northstar
                </a>
              </div>
              <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Digital Skills Platform</h3>
                    <div className="space-y-4 text-left">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Learning Modules</p>
                        <p className="text-gray-600">Comprehensive online courses</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Progress Tracking</p>
                        <p className="text-gray-600">Monitor and assess learning</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <p className="font-semibold mb-1 text-gray-900">Certification</p>
                        <p className="text-primary-blue font-bold">Industry-Recognized Standards</p>
                      </div>
                    </div>
                  </div>
                </div>
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
