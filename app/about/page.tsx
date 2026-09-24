'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

// Note: metadata must be in a Server Component — use a layout.tsx in /about/ if needed

// ─── Data ────────────────────────────────────────────────────────────────────

const LEADERSHIP = [
  {
    name: 'Ritika Malik',
    role: 'CEO & Founder',
    bio: 'Neuroscience student at Columbia University; Forbes 30 Under 30 honoree.',
    image: 'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png',
    objectPosition: 'center top',
  },
  {
    name: 'Awahan Sapkota',
    role: 'Vice President',
    bio: 'Chemical Engineering & Physics at the University of Pennsylvania.',
    image: 'https://i.ibb.co/jZwpDG3G/Awahan.jpg',
    objectPosition: 'center 20%',
  },
  {
    name: 'Suman',
    role: 'Director of Data & Technology',
    bio: 'Managing data analytics and technology infrastructure.',
    image: 'https://i.ibb.co/V02X2YCP/suman1.png',
    objectPosition: 'center top',
  },
  {
    name: 'Prof. Abirlal Mukherjee',
    role: 'Country Director, India',
    bio: 'Leading operations and strategic initiatives in India.',
    image: 'https://i.ibb.co/39BNW2fR/Screenshot-2026-02-07-153447-Picsart-Ai-Image-Enhancer.png',
    objectPosition: 'center top',
  },
]

const VALUES = [
  {
    label: 'Equity',
    copy: 'Prioritize people and communities facing the greatest digital barriers, and design around realities such as access, affordability, language, geography, gender, and infrastructure.',
  },
  {
    label: 'Innovation',
    copy: 'Use technology thoughtfully, including emerging tools such as AI, while adapting delivery to local realities rather than pursuing technology for its own sake.',
  },
  {
    label: 'Collaboration',
    copy: 'Build with schools, communities, volunteers, universities, governments, companies, funders, and local organizations.',
  },
  {
    label: 'Empowerment',
    copy: 'Develop local leadership so knowledge, program delivery, and opportunity can continue beyond DAN\'s direct presence.',
  },
]

const HOW_WE_WORK = [
  {
    heading: 'Start where the barrier is',
    copy: 'If a community lacks access, DAN starts with access. If access already exists, DAN focuses on skills. If participants already have relevant skills, DAN focuses on opportunity.',
  },
  {
    heading: 'Standardize the framework. Localize the delivery.',
    copy: 'The framework, participant journey, measurement approach, safeguarding expectations, and reporting standards remain consistent while curriculum, language, technology, delivery format, and partner structure adapt locally.',
  },
  {
    heading: 'Build local ownership',
    copy: 'Schools, chapters, student leaders, volunteers, teachers, local coordinators, and community partners should increasingly be able to support and lead programs locally.',
  },
]

const EXPLORE = [
  { label: 'Why Digital Access Matters', href: '/about/why-digital-access-now' },
  { label: 'Our Work', href: '/programs' },
  { label: 'Impact', href: '/impact/our-impact' },
  { label: 'Partner With Us', href: '/contact-us' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function About() {
  const [idx, setIdx] = useState(0)
  const [perView, setPerView] = useState(3)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const max = Math.max(0, LEADERSHIP.length - perView)
    if (idx > max) setIdx(max)
  }, [perView, idx])

  const maxIdx = Math.max(0, LEADERSHIP.length - perView)

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-0" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top eyebrow + headline */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 md:py-20">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                About Digital Access Now
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-6" style={{ color: '#0F5D5E' }}>
                From digital access<br />to digital opportunity.
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-prose" style={{ color: '#1F2933', opacity: 0.8 }}>
                Digital Access Now is a nonprofit organization working to expand technology access, digital literacy, educational opportunity, and pathways that help underserved students and communities participate more fully in an increasingly digital world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{ background: '#0F5D5E' }}
                >
                  Explore Our Work <ArrowRight size={15} />
                </Link>
                <Link
                  href="/about/our-team"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm border-2 transition-all duration-200 hover:opacity-80"
                  style={{ color: '#0F5D5E', borderColor: '#0F5D5E' }}
                >
                  Meet Our Team <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://i.ibb.co/MytKDQR3/Screenshot-2026-02-16-at-8-04-14-PM-Picsart-Ai-Image-Enhancer.png"
                alt="Digital Access Now at United Nations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.45) 0%, transparent 55%)' }} />
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-2.5"
                style={{ background: 'rgba(15,93,94,0.88)', backdropFilter: 'blur(6px)' }}
              >
                <p className="text-white text-sm font-semibold">Representing DAN at the United Nations</p>
              </div>
            </div>
          </div>

          {/* Gradient divider */}
          <div className="h-px" style={{ background: 'linear-gradient(to right, #4DB7E5, #0F5D5E, transparent)' }} />
        </div>
      </section>

      {/* ── 2. OUR STORY ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-3">
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: '#1F2933' }}>
                Our Story
              </h2>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
                <p>
                  Digital Access Now began with a simple belief: geography or economic circumstance should not determine whether a young person can participate in an increasingly digital world.
                </p>
                <p>
                  Our early work focused heavily on addressing technology access barriers. As DAN continued to learn from communities, schools, volunteers, and partners, one thing became increasingly clear: access alone is not enough.
                </p>
                <p>
                  A young person may have access to a device but lack practical digital skills. They may build skills but still lack opportunities to apply them through projects, mentorship, leadership, education, or career pathways.
                </p>
                <p>
                  Technology access remains essential, but DAN&apos;s work should not end when equipment is delivered or someone gets online.
                </p>
              </div>
            </div>

            {/* Framework callout */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div className="rounded-2xl p-8" style={{ background: '#EAF7FC' }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#0F5D5E' }}>
                  Our framework
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.8 }}>
                  Today, DAN is evolving into a digital opportunity organization built around a simple organization-wide framework:
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {['Access', 'Skills', 'Opportunity'].map((s, i, arr) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="rounded-full px-5 py-2.5 font-bold text-sm text-white" style={{ background: '#0F5D5E' }}>
                        {s}
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight size={16} style={{ color: '#4DB7E5' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION + VISION ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-10" style={{ color: '#4DB7E5' }}>
            Who we are
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="rounded-2xl p-8 md:p-10" style={{ background: '#ffffff', borderLeft: '4px solid #0F5D5E' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#0F5D5E' }}>Our Mission</p>
              <p className="text-xl md:text-2xl font-bold leading-snug mb-5" style={{ color: '#1F2933' }}>
                Our Mission
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
                Digital Access Now, Inc. is a nonprofit organization dedicated to providing technology, digital literacy, and educational access to underserved students and communities to promote equity and opportunity.
              </p>
            </div>
            {/* Vision */}
            <div className="rounded-2xl p-8 md:p-10" style={{ background: '#0F5D5E' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#4DB7E5' }}>Our Vision</p>
              <p className="text-xl md:text-2xl font-bold leading-snug mb-5 text-white">
                Our Vision
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                A world where every young person, regardless of geography or economic circumstance, has a reliable pathway to digital access, practical skills, and opportunities to build a better future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT DAN IS — FRAMEWORK ──────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>What DAN Is</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: '#1F2933' }}>
              A Digital Opportunity Organization
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
              DAN is building a locally adaptable education and access platform that connects learning to opportunity. Technology, connectivity, labs, devices, and shared infrastructure remain important, but they are tools within a broader pathway. DAN&apos;s defining outcome is whether participants gain access, build useful skills, apply what they learn, and connect to meaningful opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: 'Access',
                color: '#4DB7E5',
                copy: 'Reliable access to technology, connectivity, and digital resources.',
              },
              {
                step: 'Skills',
                color: '#238C91',
                copy: 'Practical digital, AI, communication, and career-ready capabilities.',
              },
              {
                step: 'Opportunity',
                color: '#0F5D5E',
                copy: 'Pathways to mentorship, education, leadership, certification, competitions, and careers.',
              },
            ].map(({ step, color, copy }) => (
              <div
                key={step}
                className="rounded-xl p-7 border-t-4"
                style={{ background: '#FAFAF7', borderTopColor: color, borderLeft: 'none', border: `1px solid #E7ECEF`, borderTop: `4px solid ${color}` }}
              >
                <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color }}>
                  {step}
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>What guides us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-tight" style={{ color: '#1F2933' }}>
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ label, copy }) => (
              <div
                key={label}
                className="rounded-xl p-7"
                style={{ background: '#ffffff', border: '1px solid #E7ECEF' }}
              >
                <p className="font-bold text-base mb-3" style={{ color: '#0F5D5E' }}>{label}</p>
                <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HOW WE WORK ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>Our approach</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-tight" style={{ color: '#1F2933' }}>
            How We Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_WE_WORK.map(({ heading, copy }, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: '#0F5D5E' }}
                >
                  {i + 1}
                </div>
                <h3 className="font-bold text-base leading-snug" style={{ color: '#1F2933' }}>{heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.72 }}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. LEADERSHIP PREVIEW ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#4DB7E5' }}>People</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1F2933' }}>
                Our Team
              </h2>
              <p className="mt-3 text-base max-w-xl" style={{ color: '#1F2933', opacity: 0.75 }}>
                DAN brings together students, educators, professionals, volunteers, and local leaders who support program delivery, community partnerships, technology access, learning, and organizational development.
              </p>
            </div>
            <Link
              href="/about/our-team"
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm border-2 transition-all duration-200 hover:opacity-80"
              style={{ color: '#0F5D5E', borderColor: '#0F5D5E' }}
            >
              Meet Full Team <ArrowRight size={15} />
            </Link>
          </div>

          {/* Carousel */}
          <div className="relative">
            {idx > 0 && (
              <button
                onClick={() => setIdx(p => Math.max(p - 1, 0))}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-10 z-10 p-3 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1/2 hover:shadow-xl"
                style={{ background: '#ffffff', border: '1.5px solid #E7ECEF' }}
                aria-label="Previous"
              >
                <ChevronLeft size={22} style={{ color: '#0F5D5E' }} />
              </button>
            )}
            {idx < maxIdx && (
              <button
                onClick={() => setIdx(p => Math.min(p + 1, maxIdx))}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-10 z-10 p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
                style={{ background: '#ffffff', border: '1.5px solid #E7ECEF' }}
                aria-label="Next"
              >
                <ChevronRight size={22} style={{ color: '#0F5D5E' }} />
              </button>
            )}

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${idx * (100 / perView)}%)` }}
              >
                {LEADERSHIP.map((m, i) => (
                  <div
                    key={i}
                    className="shrink-0 px-4"
                    style={{ width: `${100 / perView}%` }}
                  >
                    <div className="rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md" style={{ background: '#ffffff', border: '1px solid #E7ECEF' }}>
                      <div className="h-56 w-full overflow-hidden" style={{ background: '#EAF7FC' }}>
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="p-5">
                        <p className="font-bold text-base mb-0.5" style={{ color: '#1F2933' }}>{m.name}</p>
                        <p className="text-sm font-semibold mb-2" style={{ color: '#0F5D5E' }}>{m.role}</p>
                        <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>{m.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: idx === i ? '2rem' : '0.6rem',
                    background: idx === i ? '#0F5D5E' : '#E7ECEF',
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. EXPLORE MORE ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">
            {/* Left — label + heading */}
            <div className="lg:col-span-1">
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>Keep exploring</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: '#1F2933' }}>Explore More</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.7 }}>
                Dig deeper into DAN&apos;s work, programs, impact, and how you can get involved.
              </p>
              <Link
                href="/about/our-team"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                style={{ background: '#0F5D5E' }}
              >
                Meet Our Team <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right — 2-col link tiles */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Why Digital Access Matters', href: '/about/why-digital-access-now', desc: 'The evidence and reasoning behind DAN\'s mission and approach.' },
                { label: 'Our Work', href: '/programs', desc: 'Chapter programs, volunteer opportunities, and how we deliver.' },
                { label: 'Impact', href: '/impact/our-impact', desc: 'How we measure progress and what we\'ve achieved so far.' },
                { label: 'Partner With Us', href: '/contact-us', desc: 'Collaborate with DAN as a school, company, or organization.' },
              ].map(({ label, href, desc }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex flex-col justify-between rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: '#ffffff', border: '1px solid #E7ECEF' }}
                >
                  <div>
                    <p className="font-bold text-sm mb-2" style={{ color: '#1F2933' }}>{label}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>{desc}</p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: '#0F5D5E' }}>
                    Explore <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
