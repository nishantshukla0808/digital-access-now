'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  MapPin,
  Users,
  Laptop,
  Globe,
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Network,
  GraduationCap,
  Handshake,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const CHAPTER_FEATURES = [
  {
    Icon: MapPin,
    title: 'Community-Led',
    desc: 'Run by passionate local leaders already rooted in their communities.',
  },
  {
    Icon: Laptop,
    title: 'Infrastructure & Devices',
    desc: 'Access to devices, connectivity, and digital resources where they are missing.',
  },
  {
    Icon: Network,
    title: 'Global Network',
    desc: 'Exchange ideas and collaborate across borders with a worldwide peer network.',
  },
  {
    Icon: Handshake,
    title: 'Strategic Support',
    desc: 'Mentorship and strategic guidance from the DAN leadership team.',
  },
]

const VOLUNTEER_FEATURES = [
  {
    Icon: Globe,
    title: 'Remote & Local',
    desc: 'Volunteer from anywhere in the world — remote or in your local community.',
  },
  {
    Icon: BookOpen,
    title: 'Diverse Roles',
    desc: 'From web development and digital literacy to fundraising and content creation.',
  },
  {
    Icon: GraduationCap,
    title: 'Grow Your Skills',
    desc: 'Gain real-world experience, build your portfolio, and develop leadership.',
  },
  {
    Icon: Award,
    title: 'Recognized Impact',
    desc: 'Volunteer hours documentation available where applicable.',
  },
]

const CHAPTER_STEPS = [
  { n: '01', title: 'Apply', desc: 'Submit your chapter leader application and tell us about your community and goals.' },
  { n: '02', title: 'Get Vetted', desc: "Our team reviews your application and assesses fit with DAN's mission and standards." },
  { n: '03', title: 'Get Onboarded', desc: 'Receive training, resources, and your Chapter Starter Guide to set up your space.' },
  { n: '04', title: 'Launch & Lead', desc: 'Open your chapter, run programs, and connect with the global DAN network.' },
  { n: '05', title: 'Scale Impact', desc: 'Grow your chapter, expand your programs, and mentor emerging local leaders.' },
]

const STATS = [
  { value: '2+', label: 'Active Chapters' },
  { value: '5+', label: 'Countries Reached' },
  { value: '100+', label: 'Community Members Served' },
  { value: '20+', label: 'Volunteers Worldwide' },
]

const FAQS = [
  {
    q: 'Who can participate in DAN programs?',
    a: 'Our programs are designed for underserved communities with limited digital access. Eligibility varies by program, but we welcome individuals of all ages and backgrounds.',
  },
  {
    q: 'Is there a cost to participate?',
    a: 'All our core programs are provided free of charge. We believe digital access should not be a barrier based on economic status.',
  },
  {
    q: 'How can I apply for a Chapter or Volunteer role?',
    a: 'Visit the relevant program section and click the apply or learn more button. Applications are reviewed on a rolling basis.',
  },
  {
    q: 'Do you offer virtual programs?',
    a: 'Yes. We offer both in-person and virtual programs to maximize accessibility for participants in different regions.',
  },
  {
    q: 'Can I lead a chapter from outside the US?',
    a: 'Absolutely. DAN has an international presence and we actively encourage leaders from all countries to establish chapters.',
  },
]

// ─── Accordion ───────────────────────────────────────────────────────────────

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
        <span className="ml-4 shrink-0 text-[#0F5D5E]" aria-hidden="true">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-[#1F2933]/80 leading-relaxed text-base pr-8">{a}</p>
      )}
    </div>
  )
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({ Icon, title, desc }: { Icon: React.ElementType; title: string; desc: string }) {
  return (
    <div
      className="rounded-xl p-6 border-l-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
      style={{ background: '#ffffff', borderColor: '#E7ECEF', borderLeftColor: '#0F5D5E' }}
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: '#EAF7FC' }}>
        <Icon size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} aria-hidden="true" />
      </div>
      <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: '#1F2933' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>{desc}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Programs() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                Digital Access Now Programs
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-6" style={{ color: '#0F5D5E' }}>
                Programs that bridge the digital divide.
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-prose" style={{ color: '#1F2933' }}>
                Through community-led chapters and a global volunteer network, DAN is expanding digital access, building practical skills, and creating real pathways to opportunity for underserved communities worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{ background: '#0F5D5E' }}
                >
                  Explore Programs <ArrowRight size={16} />
                </a>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 border-2"
                  style={{ color: '#0F5D5E', borderColor: '#0F5D5E', background: 'transparent' }}
                >
                  Volunteer with Us
                </Link>
              </div>
              <p className="mt-4 text-sm" style={{ color: '#1F2933', opacity: 0.6 }}>
                Free programs · Global reach · Community-first
              </p>
            </div>

            {/* Right — hero image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="https://i.ibb.co/gZpd6L93/497859265-122095815776883922-6063565023698107666-n-Picsart-Ai-Image-Enhancer.jpg"
                alt="DAN chapter community members working together on digital access"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-3 flex items-center gap-3 backdrop-blur-sm"
                style={{ background: 'rgba(15, 93, 94, 0.88)' }}
              >
                <div className="w-2 h-8 rounded-full shrink-0" style={{ background: '#4DB7E5' }} aria-hidden="true" />
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Community-first approach</p>
                  <p className="text-white/60 text-xs mt-0.5">Chapters &amp; Volunteers · Across countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS BAR ──────────────────────────────────────────────────── */}
      <section className="py-12" style={{ background: '#0F5D5E' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-black text-white mb-1">{s.value}</p>
                <p className="text-sm font-medium uppercase tracking-widest" style={{ color: '#4DB7E5' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MISSION FLOW ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1F2933' }}>
            From access to lasting opportunity
          </h2>
          <p className="text-lg max-w-2xl mb-12" style={{ color: '#1F2933', opacity: 0.75 }}>
            DAN programs work across three dimensions — providing access, building skills, and opening pathways to real-world opportunity.
          </p>

          <div className="grid md:grid-cols-3 gap-0 relative">
            <div
              className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5"
              style={{ background: 'linear-gradient(to right, #4DB7E5, #238C91, #0F5D5E)' }}
            />
            {[
              {
                label: 'ACCESS',
                color: '#4DB7E5',
                desc: 'Device drives, connectivity initiatives, digital labs, and technology resources in underserved communities.',
              },
              {
                label: 'SKILLS',
                color: '#238C91',
                desc: 'Workshops on digital literacy, AI, communication, and career-ready skills for community members.',
              },
              {
                label: 'OPPORTUNITY',
                color: '#0F5D5E',
                desc: 'Pathways to education, mentorship, leadership, certifications, and career development.',
              },
            ].map((stage, i) => (
              <div key={i} className="flex flex-col items-start md:items-center md:text-center px-0 md:px-6 py-6 md:py-0 relative">
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
                  <div className="md:hidden w-0.5 h-8 my-2 self-start ml-7" style={{ background: stage.color }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CHAPTERS PROGRAM ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-6 rounded-full shrink-0" style={{ background: '#4DB7E5' }} aria-hidden="true" />
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#4DB7E5' }}>Program 01</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#0F5D5E' }}>
                Chapters Program
              </h2>
              <p className="text-lg leading-relaxed mb-5" style={{ color: '#1F2933', opacity: 0.85 }}>
                The Digital Access Now Chapters Program empowers local leaders to establish digital access centers in underserved communities — providing infrastructure, devices, and connectivity where they are limited or missing.
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: '#1F2933', opacity: 0.7 }}>
                Chapters are led by passionate individuals rooted in their communities, who bring deep local knowledge and a strong track record of social impact.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.7 }}>
                Each chapter operates independently within a school, community center, or local space — running programs that reflect unique local needs, while staying connected to a global peer network.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {CHAPTER_FEATURES.map((f, i) => (
                  <FeatureCard key={i} {...f} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  disabled
                  className="rounded-full px-8 py-4 font-bold text-base cursor-not-allowed opacity-50"
                  style={{ background: '#E7ECEF', color: '#1F2933' }}
                >
                  Applications Opening Soon
                </button>
                <a
                  href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 border-2"
                  style={{ color: '#0F5D5E', borderColor: '#0F5D5E', background: 'transparent' }}
                >
                  Chapter Starter Guide <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Right — image + timeline */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://i.ibb.co/N203w4KR/Whats-App-Image-2026-04-26-at-23-49-56-Picsart-Ai-Image-Enhancer.jpg"
                  alt="DAN chapter program in action"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.5) 0%, transparent 60%)' }} />
                <div
                  className="absolute bottom-4 left-4 rounded-xl px-4 py-3 backdrop-blur-sm"
                  style={{ background: 'rgba(15, 93, 94, 0.88)' }}
                >
                  <p className="text-white font-bold text-sm">Community-led impact</p>
                  <p className="text-white/60 text-xs mt-0.5">Local leaders · Global support</p>
                </div>
              </div>

              <div className="relative">
                <div
                  className="hidden md:block absolute left-[1.75rem] top-14 bottom-4 w-0.5"
                  style={{ background: 'linear-gradient(to bottom, #4DB7E5, #0F5D5E)' }}
                  aria-hidden="true"
                />
                <h3 className="font-bold text-lg mb-6" style={{ color: '#1F2933' }}>How a Chapter is started</h3>
                <div className="space-y-6">
                  {CHAPTER_STEPS.map((step, i) => (
                    <div key={i} className="flex gap-5 items-start relative">
                      <div
                        className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-black text-sm text-white z-10 shadow-md"
                        style={{ background: i === 0 ? '#4DB7E5' : i === 4 ? '#0F5D5E' : '#238C91' }}
                      >
                        {step.n}
                      </div>
                      <div className="pt-2">
                        <p className="font-bold text-base mb-0.5" style={{ color: '#0F5D5E' }}>{step.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. VOLUNTEER PROGRAM ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-6 rounded-full shrink-0" style={{ background: '#238C91' }} aria-hidden="true" />
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#238C91' }}>Program 02</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — image + tags */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://i.ibb.co/KjyXkY6y/Whats-App-Image-2026-04-26-at-23-49-02-Picsart-Ai-Image-Enhancer.jpg"
                  alt="DAN volunteer meeting and collaboration"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.5) 0%, transparent 60%)' }} />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold text-white rounded-full px-3 py-1 inline-block mb-2" style={{ background: 'rgba(77,183,229,0.9)' }}>
                    Apr 7, 2026
                  </span>
                  <p className="text-white font-semibold text-sm leading-snug">
                    Met with Jeet Raut to explore AI tools for Digital Access Now projects
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl" style={{ background: '#EAF7FC' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-5 rounded-full shrink-0" style={{ background: '#4DB7E5' }} aria-hidden="true" />
                  <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#0F5D5E' }}>We welcome</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    'Students', 'Educators', 'Tech Professionals',
                    'Designers & Creators', 'Community Advocates',
                    'Researchers & Writers', 'Mentors',
                  ].map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold"
                      style={{ background: '#ffffff', color: '#0F5D5E', border: '1.5px solid #238C91' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Remote', 'In Person', 'Project-Based', 'Event-Based', 'Recurring'].map(label => (
                    <span
                      key={label}
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
                      style={{ background: '#0F5D5E', color: '#ffffff' }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#0F5D5E' }}>
                Volunteer Program
              </h2>
              <p className="text-lg leading-relaxed mb-5" style={{ color: '#1F2933', opacity: 0.85 }}>
                Join our global network of volunteers working to bridge the digital divide. Whether you&apos;re a tech expert, educator, or community advocate — there&apos;s a meaningful role for you.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.7 }}>
                Volunteers contribute across web development, digital literacy instruction, fundraising, grant writing, social media management, curriculum design, and more. Flexible commitment options make it easy to fit meaningful work into your schedule.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {VOLUNTEER_FEATURES.map((f, i) => (
                  <FeatureCard key={i} {...f} />
                ))}
              </div>

              <div className="mb-10">
                <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#238C91' }}>
                  What you gain
                </p>
                <ul className="space-y-3">
                  {[
                    'Apply your skills to meaningful, real-world projects',
                    'Gain nonprofit and community-impact experience',
                    'Build leadership and communication skills',
                    'Collaborate across countries and communities',
                    'Exposure to digital equity, education & social impact',
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-base" style={{ color: '#1F2933' }}>
                      <CheckCircle size={18} strokeWidth={2} className="shrink-0 mt-0.5" style={{ color: '#0F5D5E' }} aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                style={{ background: '#0F5D5E' }}
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ────────────────────────────────────────────────────────── */}
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



      {/* ── 8. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F5D5E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Help turn digital access into lasting opportunity.
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you lead a chapter, volunteer your skills, or spread the word — every contribution helps someone move from access to skills to opportunity.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.notion.so/Digital-Access-Now-Chapter-Starter-Guide-Shareable-b0e3a0c08b244d5d87f1708ba3b0f77c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{ background: '#ffffff', color: '#0F5D5E' }}
            >
              Start a Chapter <ArrowRight size={16} />
            </a>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 border-2 border-white text-white"
            >
              Become a Volunteer <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
