'use client'

import { useState } from 'react'
import { BookOpen, Laptop, Users, Code2, Megaphone, BarChart3 } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

// ─── Data ────────────────────────────────────────────────────────────────────

const CONTRIBUTION_AREAS = [
  {
    title: 'Program & Workshop Support',
    desc: 'Assist with digital literacy, AI, career-readiness, communication, and technology workshops.',
    Icon: BookOpen,
  },
  {
    title: 'Community & Device Initiatives',
    desc: 'Support device drives, preparation, distribution, labs, connectivity initiatives, and local events.',
    Icon: Laptop,
  },
  {
    title: 'Mentorship & Student Support',
    desc: 'Mentor participants, review projects, support competitions, or help students explore education and career opportunities.',
    Icon: Users,
  },
  {
    title: 'Technology & Digital Projects',
    desc: "Support DAN's website, internal technology, digital platforms, data systems, and technical projects.",
    Icon: Code2,
  },
  {
    title: 'Communications & Outreach',
    desc: 'Help document impact, create content, support outreach, social media, storytelling, and community awareness.',
    Icon: Megaphone,
  },
  {
    title: 'Research, Fundraising & Operations',
    desc: 'Support grants, partnerships, research, program planning, data, and nonprofit operations.',
    Icon: BarChart3,
  },
]

const VOLUNTEER_ACTIONS = [
  { verb: 'Teach', desc: 'Co-facilitate an AI or digital-skills workshop.' },
  { verb: 'Mentor', desc: 'Guide a student through a project or learning goal.' },
  { verb: 'Build', desc: 'Help create technology, curriculum, resources, or program infrastructure.' },
  { verb: 'Organize', desc: 'Support a community event, chapter initiative, or device drive.' },
  { verb: 'Connect', desc: 'Help participants discover education, leadership, and career opportunities.' },
  { verb: 'Lead', desc: 'Take responsibility for a project or help train future volunteers.' },
]

const PROCESS_STEPS = [
  { n: '01', title: 'Apply', desc: 'Tell us about your interests, skills, location, and availability.' },
  { n: '02', title: 'Get Matched', desc: 'We identify opportunities based on current DAN programs and organizational needs.' },
  { n: '03', title: 'Get Oriented', desc: 'Receive the guidance, materials, or training needed for your role.' },
  { n: '04', title: 'Contribute', desc: 'Support a DAN project, workshop, event, chapter, or team.' },
  { n: '05', title: 'Grow Your Impact', desc: 'Experienced volunteers may mentor others, lead initiatives, or support future programs.' },
]

const BENEFITS = [
  'Apply your skills to meaningful projects',
  'Gain nonprofit and community-impact experience',
  'Build leadership and communication skills',
  'Collaborate across countries and communities',
  'Gain exposure to digital equity, education, technology, and social impact',
]

const AUDIENCE = [
  'Students', 'Educators', 'Technology professionals',
  'Designers and creators', 'Community advocates',
  'Researchers and writers', 'Professionals willing to mentor',
  'Anyone committed to digital equity',
]

const FAQS = [
  {
    q: 'Do I need technical experience?',
    a: 'No. Some roles require specialized skills, while many program and community roles do not.',
  },
  {
    q: 'Can I volunteer remotely?',
    a: 'Yes. DAN offers both remote and local opportunities depending on current programs and organizational needs.',
  },
  {
    q: 'How much time do I need to commit?',
    a: 'Commitment varies by opportunity. Some projects are one-time or event-based, while others involve recurring participation.',
  },
  {
    q: 'Can students volunteer?',
    a: 'Yes, subject to the requirements of the specific opportunity.',
  },
  {
    q: 'Can I volunteer from another country?',
    a: 'Remote opportunities may be available globally, while local opportunities depend on DAN\'s active programs and partners.',
  },
]

const FORM_URL = 'https://forms.gle/M4iYgssUCxRX2M3s6'

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E7ECEF]">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left text-[#1F2933] font-semibold text-lg hover:text-[#0F5D5E] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5D5E] rounded"
      >
        <span>{q}</span>
        <span className="ml-4 shrink-0 text-[#0F5D5E] text-2xl leading-none" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[#1F2933]/80 leading-relaxed text-base pr-8">{a}</p>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Volunteer() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: '#4DB7E5' }}
              >
                Volunteer with Digital Access Now
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-6"
                style={{ color: '#0F5D5E' }}
              >
                Turn your skills into digital opportunity.
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-prose" style={{ color: '#1F2933' }}>
                Support young people and communities by helping expand access to technology, build practical digital skills, and create pathways to education, leadership, and opportunity.
              </p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full px-8 py-4 font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                style={{ background: '#0F5D5E' }}
              >
                Become a Volunteer
              </a>
              <p className="mt-4 text-sm" style={{ color: '#1F2933', opacity: 0.6 }}>
                Remote &amp; local opportunities · Flexible roles · Global community
              </p>
            </div>

            {/* Right — hero image with inner overlay badge */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="/volunteer-hero.png"
                alt="A volunteer mentor helping a student learn digital skills on a laptop"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge — sits inside the image, no overflow gap */}
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-3 flex items-center gap-3 backdrop-blur-sm"
                style={{ background: 'rgba(15, 93, 94, 0.88)' }}
              >
                <div
                  className="w-2 h-8 rounded-full shrink-0"
                  style={{ background: '#4DB7E5' }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Global community</p>
                  <p className="text-white/60 text-xs mt-0.5">Remote &amp; local · Across countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ACCESS → SKILLS → OPPORTUNITY ────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1F2933' }}>
            Help turn access into opportunity
          </h2>
          <p className="text-lg max-w-2xl mb-12" style={{ color: '#1F2933', opacity: 0.75 }}>
            Digital equity takes more than devices. DAN volunteers help communities move from access to practical skills and onward to meaningful opportunities.
          </p>

          {/* Horizontal flow */}
          <div className="grid md:grid-cols-3 gap-0 relative">
            {/* Connector line (desktop only) */}
            <div
              className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5"
              style={{ background: 'linear-gradient(to right, #4DB7E5, #238C91, #0F5D5E)' }}
            />

            {[
              {
                label: 'ACCESS',
                color: '#4DB7E5',
                bg: '#EAF7FC',
                desc: 'Support device initiatives, connectivity efforts, digital resources, and community technology programs.',
              },
              {
                label: 'SKILLS',
                color: '#238C91',
                bg: '#d4eff5',
                desc: 'Help students build practical digital, AI, communication, and career-ready skills.',
              },
              {
                label: 'OPPORTUNITY',
                color: '#0F5D5E',
                bg: '#c2e6ed',
                desc: 'Connect learning to mentorship, education, leadership, certifications, competitions, and career pathways.',
              },
            ].map((stage, i) => (
              <div key={i} className="flex flex-col items-start md:items-center md:text-center px-0 md:px-6 py-6 md:py-0 relative">
                {/* Dot */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-sm tracking-widest mb-5 z-10 shadow-md"
                  style={{ background: stage.color }}
                >
                  {i + 1}
                </div>
                <p className="text-xs font-black tracking-widest mb-2 uppercase" style={{ color: stage.color }}>
                  {stage.label}
                </p>
                <p className="text-base leading-relaxed max-w-xs" style={{ color: '#1F2933', opacity: 0.8 }}>
                  {stage.desc}
                </p>
                {i < 2 && (
                  <div
                    className="md:hidden w-0.5 h-8 my-2 self-start ml-7"
                    style={{ background: stage.color }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WAYS YOU CAN CONTRIBUTE ───────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1F2933' }}>
            Ways You Can Contribute
          </h2>
          <p className="text-lg mb-12 max-w-2xl" style={{ color: '#1F2933', opacity: 0.7 }}>
            Volunteer opportunities vary by program, location, and current organizational needs.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {CONTRIBUTION_AREAS.map((area, i) => {
              const { Icon } = area
              return (
                <div
                  key={i}
                  className="group rounded-xl p-6 border-l-4 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                  style={{
                    background: '#ffffff',
                    borderColor: '#E7ECEF',
                    borderLeftColor: '#0F5D5E',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: '#EAF7FC' }}
                  >
                    <Icon size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: '#1F2933' }}>
                    {area.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>
                    {area.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 border-2"
              style={{ color: '#0F5D5E', borderColor: '#0F5D5E', background: 'transparent' }}
            >
              View Volunteer Application
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT VOLUNTEERING CAN LOOK LIKE ───────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#1F2933' }}>
            What volunteering with DAN can look like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {VOLUNTEER_ACTIONS.map((action, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span
                  className="shrink-0 mt-0.5 font-black text-sm w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ background: '#4DB7E5' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-base mb-1" style={{ color: '#0F5D5E' }}>
                    {action.verb}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>
                    {action.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHO CAN VOLUNTEER ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#EAF7FC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0F5D5E' }}>
                You don&apos;t have to be a expert.
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
                We welcome people with different backgrounds, experiences, and skills.
              </p>
              {/* Flexible labels */}
              <div className="mb-8">
                <p className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: '#238C91' }}>
                  Flexible ways to contribute
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Remote', 'In Person', 'Project-Based', 'Event-Based', 'Recurring'].map(label => (
                    <span
                      key={label}
                      className="px-3 py-1 rounded-full text-sm font-semibold border"
                      style={{ borderColor: '#238C91', color: '#238C91', background: '#ffffff' }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>
                Some roles require specific experience, while others only require reliability, willingness to learn, and commitment to DAN&apos;s mission.
              </p>
            </div>

            {/* Right column — pushed further right */}
            <div className="md:pl-16 lg:pl-28">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-6 rounded-full shrink-0" style={{ background: '#4DB7E5' }} aria-hidden="true" />
                <p className="text-lg font-bold uppercase tracking-widest" style={{ color: '#0F5D5E' }}>
                  We welcome
                </p>
              </div>
              <ul className="space-y-5">
                {AUDIENCE.map(person => (
                  <li key={person} className="flex items-center gap-3 text-lg font-medium" style={{ color: '#1F2933' }}>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: '#0F5D5E' }}
                      aria-hidden="true"
                    />
                    {person}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#1F2933' }}>
            How it works
          </h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="hidden md:block absolute left-[2.25rem] top-4 bottom-4 w-0.5"
              style={{ background: 'linear-gradient(to bottom, #4DB7E5, #0F5D5E)' }}
              aria-hidden="true"
            />

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex gap-6 md:gap-10 items-start relative">
                  {/* Step number */}
                  <div
                    className="shrink-0 w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center font-black text-lg text-white z-10 shadow-md"
                    style={{
                      background: i === 0 ? '#4DB7E5' : i === 4 ? '#0F5D5E' : '#238C91',
                    }}
                  >
                    {step.n}
                  </div>
                  <div className="pt-3">
                    <p className="font-bold text-xl mb-1" style={{ color: '#0F5D5E' }}>
                      {step.title}
                    </p>
                    <p className="text-base leading-relaxed max-w-lg" style={{ color: '#1F2933', opacity: 0.75 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. GROW WHILE YOU GIVE BACK ──────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1F2933' }}>
                Grow while you give back
              </h2>
              <ul className="space-y-4">
                {BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-base" style={{ color: '#1F2933' }}>
                    <span
                      className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: '#0F5D5E' }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm" style={{ color: '#1F2933', opacity: 0.55 }}>
                Volunteer or service hours may be available where applicable.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: '#EAF7FC' }}
            >
              <p className="text-5xl mb-4" aria-hidden="true">🌱</p>
              <p className="font-bold text-xl mb-2" style={{ color: '#0F5D5E' }}>
                Real-world impact, real experience
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#238C91' }}>
                Volunteers contribute to meaningful community programs while building skills and networks that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: '#1F2933' }}>
            Frequently asked questions
          </h2>
          <div>
            {FAQS.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F5D5E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Help turn digital access into possibility.
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you teach a workshop, mentor a student, organize a community initiative, build technology, or support DAN behind the scenes, your contribution can help someone move from access to skills to opportunity.
          </p>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: '#ffffff', color: '#0F5D5E' }}
          >
            Become a DAN Volunteer
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
