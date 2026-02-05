import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient & Image Placeholders */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-primary-blue via-primary-purple to-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                ABOUT DIGITAL ACCESS NOW
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-lg text-pretty">
                Our story, mission, and the global movement we're building together
              </p>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4 h-64">
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">🌍</div>
                  <p className="text-sm">Global Reach</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">🤝</div>
                  <p className="text-sm">Partnerships</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">📚</div>
                  <p className="text-sm">Education</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">💡</div>
                  <p className="text-sm">Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
            OUR STORY
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Digital Access Now was founded on a simple yet powerful belief: everyone deserves access to digital tools and knowledge, regardless of where they live or their economic circumstances.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                What started as a small initiative has grown into a global movement of thousands of youth leaders, volunteers, and partners working together to bridge the digital divide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we operate in 52 countries across 6 continents, directly reaching over 340,000 people with digital access and education initiatives.
              </p>
            </div>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center overflow-hidden">
              <Image 
                src="/images/whatsapp-20image-202026-02-01-20at-2022.jpeg"
                alt="Our Story"
                width={400}
                height={384}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🎯</span> Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower communities worldwide by providing equitable access to digital tools, education, and opportunities, ensuring that digital equity becomes a reality for all.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">💡</span> Our Values
              </h3>
              <ul className="text-gray-700 space-y-3">
                <li>• <strong>Equity:</strong> Prioritizing underserved communities</li>
                <li>• <strong>Innovation:</strong> Leveraging technology for good</li>
                <li>• <strong>Collaboration:</strong> Working with partners globally</li>
                <li>• <strong>Empowerment:</strong> Building local leadership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            MEET OUR TEAM
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Executive Director',
                bio: 'Leading global digital equity initiatives with 15+ years of nonprofit experience',
              },
              {
                name: 'Raj Patel',
                role: 'Chief Programs Officer',
                bio: 'Designing and implementing scalable digital literacy programs across continents',
              },
              {
                name: 'Maria Garcia',
                role: 'Director of Partnerships',
                bio: 'Building strategic partnerships to amplify our reach and impact',
              },
            ].map((member, i) => (
              <div key={i} className="bg-light-gray p-8 rounded-lg text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-purple to-red-accent rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl">
                  👤
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-red-accent font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/about/our-people" className="inline-block bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
              Meet Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            EXPLORE MORE
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Why Digital Access Now?', link: '/about/why-digital-access-now', icon: '❓' },
              { title: 'Our People', link: '/about/our-people', icon: '👥' },
              { title: 'Press & Media', link: '/about/our-press', icon: '📰' },
              { title: 'Careers', link: '/about/our-careers', icon: '💼' },
            ].map((item, i) => (
              <Link key={i} href={item.link}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
