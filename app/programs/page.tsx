import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { CalendarDays, MapPin, Clock, ArrowUpRight } from 'lucide-react'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })
}
function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default async function Programs() {
  const supabase = await createClient()
  const today = new Date().toISOString()

  const { data: events } = await supabase
    .from('events')
    .select('id, title, description, start_date, end_date, location')
    .eq('status', 'published')
    .order('start_date', { ascending: true })

  const upcoming = (events ?? []).filter(e => e.start_date >= today)
  const past = (events ?? []).filter(e => e.start_date < today).reverse()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">
            CHAPTERS
          </div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">
            DEVICE ACCESS
          </div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">
            TRAINING
          </div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">
            LEADERSHIP
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div role="heading" aria-level={1} className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 tracking-tight">
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
                <a href="https://wkf.ms/3OkUudk" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    APPLY NOW
                  </button>
                </a>
                <a href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    LEARN MORE
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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 h-125">
                {/* Image placeholder */}
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
                  <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    APPLY NOW
                  </button>
                </a>
                <a href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    LEARN MORE
                  </button>
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
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary-blue">•</span>
                    <span><strong>Raising Awareness:</strong> Sharing information about digital equity through school announcements, social media, and community conversations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary-blue">•</span>
                    <span><strong>Supporting Device Drives:</strong> Helping collect used laptops and tablets for refurbishment and redistribution</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary-blue">•</span>
                    <span><strong>Hosting Introductory Workshops:</strong> Leading or assisting with sessions on basic computer skills, internet safety, resume building, or digital tools</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-semibold text-primary-blue">•</span>
                    <span><strong>Connecting Students to Resources:</strong> Guiding peers toward programs, scholarships, and opportunities in the digital economy</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div role="heading" aria-level={3} className="text-lg md:text-xl font-bold text-gray-900">Each Ambassador Must:</div>
                <ul className="space-y-2 text-lg text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-primary-blue">✓</span>
                    <span>Demonstrate leadership and a commitment to digital equity</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-blue">✓</span>
                    <span>Complete at least one impact activity every three months</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary-blue">✓</span>
                    <span>Follow Digital Access Now's standards for responsible communication and community engagement</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 pt-6">
                <a href="https://wkf.ms/4b2zfpl" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    APPLY NOW
                  </button>
                </a>
                <a href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c" target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    LEARN MORE
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 h-125">
                {/* Image placeholder */}
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

      {/* ─── DAN Community Events (Live from DB) ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="heading" aria-level={2} className="text-xl md:text-2xl font-black mb-4 text-gray-900">
            DAN COMMUNITY EVENTS
          </div>
          <p className="text-gray-500 mb-12 text-base">Events submitted by our chapters and approved by the DAN team.</p>

          {/* Upcoming */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-bold text-green-700">● Upcoming</span>
            </div>
            {upcoming.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                <CalendarDays className="mx-auto mb-3 size-10 text-gray-300" />
                <p className="text-gray-400 font-medium">No upcoming events scheduled yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {upcoming.map(e => (
                  <div key={e.id} className="rounded-2xl border border-primary-blue/15 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary-blue/10 px-2.5 py-0.5 text-xs font-bold text-primary-blue">Upcoming</span>
                    </div>
                    <h3 className="text-lg font-black text-gray-950 leading-snug">{e.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 flex-1">{e.description}</p>
                    <div className="space-y-1.5 text-sm text-gray-500">
                      <div className="flex items-center gap-2"><CalendarDays className="size-4 text-primary-blue shrink-0" />{formatDate(e.start_date)}</div>
                      <div className="flex items-center gap-2"><Clock className="size-4 text-primary-blue shrink-0" />{formatTime(e.start_date)} – {formatTime(e.end_date)}</div>
                      <div className="flex items-center gap-2"><MapPin className="size-4 text-primary-blue shrink-0" />{e.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Events */}
          {past.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 border border-gray-200 px-3 py-1 text-xs font-bold text-gray-500">● Past</span>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {past.map(e => (
                  <div key={e.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col gap-4 opacity-75">
                    <h3 className="text-lg font-black text-gray-700 leading-snug">{e.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 flex-1">{e.description}</p>
                    <div className="space-y-1.5 text-sm text-gray-400">
                      <div className="flex items-center gap-2"><CalendarDays className="size-4 shrink-0" />{formatDate(e.start_date)}</div>
                      <div className="flex items-center gap-2"><MapPin className="size-4 shrink-0" />{e.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
