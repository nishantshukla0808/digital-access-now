import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import Image from 'next/image'

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Background Text */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-red-accent text-white overflow-hidden">
        {/* Background Text Pattern */}
        <div className="absolute inset-0 opacity-20 select-none pointer-events-none">
          <div className="absolute top-10 left-0 text-6xl md:text-8xl font-black text-white transform -rotate-12">
            CHAPTERS
          </div>
          <div className="absolute top-32 right-0 text-6xl md:text-8xl font-black text-white transform rotate-12">
            DEVICE ACCESS
          </div>
          <div className="absolute bottom-32 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-6">
            TRAINING
          </div>
          <div className="absolute bottom-10 right-20 text-6xl md:text-8xl font-black text-white transform rotate-6">
            LEADERSHIP
          </div>
          <div className="absolute top-1/2 left-1/4 text-5xl md:text-7xl font-black text-white transform -rotate-3">
            CONNECTIVITY
          </div>
        </div>

        {/* Decorative Icons */}
        <div className="absolute top-20 left-12 opacity-30 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="3"/>
            <path d="M60 20 L70 50 L100 60 L70 70 L60 100 L50 70 L20 60 L50 50 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-12 opacity-30 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="3"/>
            <circle cx="60" cy="25" r="8" fill="currentColor"/>
            <circle cx="60" cy="60" r="8" fill="currentColor"/>
            <circle cx="60" cy="95" r="8" fill="currentColor"/>
            <circle cx="25" cy="60" r="8" fill="currentColor"/>
            <circle cx="95" cy="60" r="8" fill="currentColor"/>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            OUR PROGRAMS
          </h1>
        </div>
      </section>

      {/* Chapters Program */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            CHAPTERS
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Description */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                The Digital Access Now Chapters Program empowers local leaders to establish digital access centers in underserved communities by providing infrastructure, devices, and connectivity where they are limited or missing.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Chapters are led by passionate individuals already rooted in their communities, who bring deep local knowledge and a strong track record of social impact.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Each chapter operates independently within a school, community center, or local space, providing initiatives that reflect their unique local needs and context.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Chapter leaders receive mentorship, strategic support, and access to a global network of peers — allowing them to exchange ideas, learn from diverse experiences, and collaborate across borders.
              </p>

              <div className="flex gap-4 pt-6">
                <a href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c" target="_blank" rel="noopener noreferrer">
                  <button className="bg-red-accent hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    LEARN MORE
                  </button>
                </a>
                <a href="https://salt-desk-080.notion.site/758e6e871cfd4b129d2add9beec3e6e3?pvs=105" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    START A CHAPTER
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://i.ibb.co/gZpd6L93/497859265-122095815776883922-6063565023698107666-n-Picsart-Ai-Image-Enhancer.jpg"
                  alt="Chapter Team"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">50</div>
              <p className="text-lg md:text-xl font-medium">Laptops Distributed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">100+</div>
              <p className="text-lg md:text-xl font-medium">Student Kits</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">5</div>
              <p className="text-lg md:text-xl font-medium">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join our programs and help bridge the digital divide in communities around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/volunteer">
              <button className="bg-red-accent hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                BECOME A VOLUNTEER
              </button>
            </Link>
            <Link href="/contact-us">
              <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                CONTACT US
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Digital Literacy Training */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-16 text-gray-900">
            DIGITAL LITERACY TRAINING
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Description */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Our Digital Literacy Training Programs equip individuals with essential skills to navigate the digital world, from basic computer use to advanced technical competencies.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We offer curriculum designed for all ages and skill levels, delivered through in-person workshops, online courses, and hybrid learning models.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Training modules cover: basic computer operations, internet safety, online communication, digital citizenship, productivity software, coding fundamentals, and job-ready tech skills.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                All participants receive certificates upon completion and ongoing access to learning resources and mentorship opportunities.
              </p>

              <div className="flex gap-4 pt-6">
                <Link href="/programs/training">
                  <button className="bg-red-accent hover:bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    LEARN MORE
                  </button>
                </Link>
                <Link href="/programs/training/enroll">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    ENROLL NOW
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-[500px] bg-gradient-to-br from-primary-purple to-red-accent flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-8xl mb-4">📚</div>
                    <p className="text-2xl font-bold">340,000+ Lives</p>
                    <p className="text-xl">Empowered Through Training</p>
                  </div>
                </div>
                {/* Floating Labels */}
                <div className="absolute top-8 right-8 bg-primary-blue text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl transform rotate-3">
                  TRAINING
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'Who can participate in our programs?',
                answer: 'Our programs are designed for underserved communities with limited digital access. Eligibility varies by program, but we welcome individuals of all ages and backgrounds.',
              },
              {
                question: 'Is there a cost to participate?',
                answer: 'All our core programs are provided free of charge. We believe digital access should not be a barrier based on economic status.',
              },
              {
                question: 'How can I apply for our programs?',
                answer: 'Visit each program page or contact us directly. Applications are reviewed on a rolling basis, and we work to place participants quickly.',
              },
              {
                question: 'Do you offer virtual programs?',
                answer: 'Yes! We offer both in-person and virtual programs to maximize accessibility for participants in different regions.',
              },
            ].map((faq, i) => (
              <details key={i} className="border border-border-gray rounded-lg p-6 hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span>+</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
