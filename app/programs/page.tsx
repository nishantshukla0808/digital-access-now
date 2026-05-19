import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">CHAPTERS</div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">DEVICE ACCESS</div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">TRAINING</div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">LEADERSHIP</div>
        </div>
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div role="heading" aria-level={1} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            OUR PROGRAMS
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Empowering communities through digital access, education, and leadership development
          </p>
        </div>
      </section>

      {/* Chapters Program */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="heading" aria-level={2} className="text-xl md:text-2xl font-black mb-10 text-gray-900">
            CHAPTERS
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                <a href="https://wkf.ms/3OkUudk" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">APPLY NOW</button>
                </a>
                <a href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">LEARN MORE</button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://i.ibb.co/gZpd6L93/497859265-122095815776883922-6063565023698107666-n-Picsart-Ai-Image-Enhancer.jpg"
                  alt="Chapter Team"
                  className="w-full h-125 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Program */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="heading" aria-level={2} className="text-xl md:text-2xl font-black mb-10 text-gray-900">
            VOLUNTEER PROGRAM
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-125 group">
                <img
                  src="https://i.ibb.co/KjyXkY6y/Whats-App-Image-2026-04-26-at-23-49-02-Picsart-Ai-Image-Enhancer.jpg"
                  alt="DAN volunteer meeting"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-bold text-white bg-primary-blue/90 px-3 py-1 rounded-full mb-2 inline-block">Apr 7, 2026</span>
                  <p className="text-white font-semibold text-sm leading-snug mt-2">Met with Jeet Raut to explore AI tools for Digital Access Now projects</p>
                </div>
              </div>
            </div>
            {/* Right: Description */}
            <div className="space-y-6 order-1 lg:order-2">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Join our global network of volunteers working to bridge the digital divide. Whether you're a tech expert, educator, or community advocate, there's a role for you.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our volunteers contribute their skills in web development, digital literacy instruction, fundraising, grant writing, social media management, and content creation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Flexible commitment options allow you to volunteer remotely from anywhere in the world, making it easy to fit meaningful work into your schedule.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Gain valuable experience, build your portfolio, and connect with a passionate community of changemakers dedicated to digital equity.
              </p>
              <div className="flex gap-4 pt-6">
                <a href="https://wkf.ms/4aOVIFd" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">APPLY NOW</button>
                </a>
                <a href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">LEARN MORE</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ambassador Program */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="heading" aria-level={2} className="text-xl md:text-2xl font-black mb-10 text-gray-900">
            AMBASSADOR PROGRAM
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Description */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                A Digital Access Now Ambassador is an individual leader who promotes digital equity by raising awareness, organizing small-scale impact initiatives, and connecting underserved peers to technology resources.
              </p>
              <div className="space-y-4">
                <div role="heading" aria-level={3} className="text-lg md:text-xl font-bold text-gray-900">Ambassadors Create Impact By:</div>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex gap-3"><span className="font-semibold text-primary-blue">•</span><span><strong>Raising Awareness:</strong> Sharing information about digital equity through school announcements, social media, and community conversations</span></li>
                  <li className="flex gap-3"><span className="font-semibold text-primary-blue">•</span><span><strong>Supporting Device Drives:</strong> Helping collect used laptops and tablets for refurbishment and redistribution</span></li>
                  <li className="flex gap-3"><span className="font-semibold text-primary-blue">•</span><span><strong>Hosting Introductory Workshops:</strong> Leading or assisting with sessions on basic computer skills, internet safety, resume building, or digital tools</span></li>
                  <li className="flex gap-3"><span className="font-semibold text-primary-blue">•</span><span><strong>Connecting Students to Resources:</strong> Guiding peers toward programs, scholarships, and opportunities in the digital economy</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <div role="heading" aria-level={3} className="text-lg md:text-xl font-bold text-gray-900">Each Ambassador Must:</div>
                <ul className="space-y-2 text-lg text-gray-600">
                  <li className="flex gap-3"><span className="text-primary-blue">✓</span><span>Demonstrate leadership and a commitment to digital equity</span></li>
                  <li className="flex gap-3"><span className="text-primary-blue">✓</span><span>Complete at least one impact activity every three months</span></li>
                  <li className="flex gap-3"><span className="text-primary-blue">✓</span><span>Follow Digital Access Now's standards for responsible communication and community engagement</span></li>
                </ul>
              </div>
              <div className="flex gap-4 pt-6">
                <a href="https://wkf.ms/4b2zfpl" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">APPLY NOW</button>
                </a>
                <a href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">LEARN MORE</button>
                </a>
              </div>
            </div>
            {/* Right: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-125 group">
                <img
                  src="https://i.ibb.co/N203w4KR/Whats-App-Image-2026-04-26-at-23-49-56-Picsart-Ai-Image-Enhancer.jpg"
                  alt="India Business Conference"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-bold text-white bg-primary-blue/90 px-3 py-1 rounded-full mb-2 inline-block">Apr 4, 2026</span>
                  <p className="text-white font-semibold text-sm leading-snug mt-2">Attended the India Business Conference as an ambassador for digital equity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="heading" aria-level={2} className="text-2xl md:text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </div>
          <div className="space-y-4">
            {[
              { question: 'Who can participate in our programs?', answer: 'Our programs are designed for underserved communities with limited digital access. Eligibility varies by program, but we welcome individuals of all ages and backgrounds.' },
              { question: 'Is there a cost to participate?', answer: 'All our core programs are provided free of charge. We believe digital access should not be a barrier based on economic status.' },
              { question: 'How can I apply for our programs?', answer: 'Visit each program page or contact us directly. Applications are reviewed on a rolling basis, and we work to place participants quickly.' },
              { question: 'Do you offer virtual programs?', answer: 'Yes! We offer both in-person and virtual programs to maximize accessibility for participants in different regions.' },
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

      {/* Events CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-6">📅</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our chapters host digital literacy workshops, device drives, leadership summits, and community events year-round.
          </p>
          <Link href="/events" className="inline-flex items-center gap-3 bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Events
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
