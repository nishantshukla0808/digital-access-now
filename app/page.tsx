import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Digital Access Now | Access, Skills & Opportunity',
  description:
    'Digital Access Now helps underserved young people gain technology access, build practical digital and career-ready skills, and connect to education, leadership, mentorship, and opportunity.',
}

// ─── Images used on this page (download links for reference) ───────────────
//
// Hero image:
//   https://i.ibb.co/NgjX72yS/Screenshot-2026-01-22-at-7-16-54-PM.png
//
// Program spotlight image:
//   https://i.ibb.co/kVPWnj1Z/498172294-122095796942883922-3614581082728561584-n-Picsart-Ai-Image-Enhancer.jpg
//
// Who We Are / wide editorial image:
//   https://i.ibb.co/Kp60vPFj/Whats-App-Image-2026-04-26-at-23-50-33-Picsart-Ai-Image-Enhancer.jpg
//
// Highlights gallery (preserved — for programs page future use):
//   https://i.ibb.co/QvVVTZFz/Whats-App-Image-2026-04-26-at-23-05-28-Picsart-Ai-Image-Enhancer.jpg  (Forbes 30u30)
//   https://i.ibb.co/BKrhF3Vm/Whats-App-Image-2026-04-26-at-23-02-53-Picsart-Ai-Image-Enhancer.jpg  (Wharton Biotech)
//   https://i.ibb.co/0VFTb5hQ/Whats-App-Image-2026-04-26-at-23-03-09-Picsart-Ai-Image-Enhancer.jpg  (Penn Biotech Dinner)
//   https://i.ibb.co/TDmJc0pb/Whats-App-Image-2026-04-26-at-23-07-12-Picsart-Ai-Image-Enhancer.jpg  (Mask Ball NYC)
//   https://i.ibb.co/Df08rPMw/Whats-App-Image-2026-04-26-at-23-08-23-Picsart-Ai-Image-Enhancer.jpg  (Ambassador Chris Lu)
//   https://i.ibb.co/nsdwW0rq/Whats-App-Image-2026-04-26-at-23-50-15-Picsart-Ai-Image-Enhancer.jpg  (Community engagement wide)
//
// Carousel slide images (preserved in code, carousel removed per brief):
//   https://i.ibb.co/vxPNQ21P/IMG-0533.jpg
//   https://i.ibb.co/27763Nj9/0b847d86-98de-4dce-a1f1-446394011ce7-Picsart-Ai-Image-Enhancer.jpg
//   https://i.ibb.co/pvYZxKKt/Whats-App-Image-2026-04-26-at-23-50-20-Picsart-Ai-Image-Enhancer.jpg
//
// Partner logos:
//   https://i.ibb.co/DHrcwKzv/image.png         (Apple)
//   https://i.ibb.co/8DWNf084/image.png         (Microsoft)
//   https://i.ibb.co/ynh0YHm5/image.png         (City of Philadelphia)
//   https://i.ibb.co/0VrvwdF9/image.png         (Power Up Tech)
//   https://i.ibb.co/399xsYCM/image.png         (Rotary International)
//   https://i.ibb.co/jvg811Lv/image.png         (Moinee)
//   https://i.ibb.co/hxwrXfZj/image.png         (Zonta)
// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-0" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 md:py-20">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                Digital Access Now
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-6" style={{ color: '#0F5D5E' }}>
                From digital access<br />to digital opportunity.
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-prose" style={{ color: '#1F2933', opacity: 0.8 }}>
                Digital Access Now helps underserved young people gain access to technology, build practical digital and career-ready skills, and connect those skills to education, leadership, mentorship, and future opportunities.
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
                  href="/volunteer"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm border-2 transition-all duration-200 hover:opacity-80"
                  style={{ color: '#0F5D5E', borderColor: '#0F5D5E' }}
                >
                  Get Involved <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Hero image — DAN field program photo */}
            {/* Image: https://i.ibb.co/vxPNQ21P/IMG-0533.jpg */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://i.ibb.co/vxPNQ21P/IMG-0533.jpg"
                alt="DAN team and community members at a digital access program"
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.5) 0%, transparent 55%)' }}
              />
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-2.5"
                style={{ background: 'rgba(15,93,94,0.88)', backdropFilter: 'blur(6px)' }}
              >
                <p className="text-white text-sm font-semibold">Nepal · India · Indonesia · Nigeria · United States</p>
              </div>
            </div>
          </div>

          <div className="h-px" style={{ background: 'linear-gradient(to right, #4DB7E5, #0F5D5E, transparent)' }} />
        </div>
      </section>

      {/* ── 2. ACCESS → SKILLS → OPPORTUNITY FRAMEWORK ──────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
              Our Framework
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: '#1F2933' }}>
              One pathway. Different starting points.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
              Every community faces different barriers. DAN starts where the need is and helps participants move toward meaningful digital opportunity.
            </p>
          </div>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-0 md:gap-0 relative">
            {[
              {
                step: 'Access',
                number: '01',
                color: '#4DB7E5',
                copy: 'Reliable access to technology, connectivity, and digital resources.',
                examples: ['Shared labs or hubs', 'School hardware', 'Wi-Fi and connectivity', 'Mobile-first tools', 'Offline resources', 'Targeted device support'],
              },
              {
                step: 'Skills',
                number: '02',
                color: '#238C91',
                copy: 'Practical digital, AI, communication, and career-ready capabilities.',
                examples: ['Digital foundations', 'Online safety', 'Productivity tools', 'Responsible AI', 'Communication', 'Applied digital skills'],
              },
              {
                step: 'Opportunity',
                number: '03',
                color: '#0F5D5E',
                copy: 'Pathways where participants can apply learning and advance.',
                examples: ['Mentorship', 'Certifications', 'Education resources', 'Competitions', 'Leadership', 'Career pathways'],
              },
            ].map(({ step, number, color, copy, examples }, i, arr) => (
              <div key={step} className="relative flex">
                <div
                  className="rounded-xl p-8 flex-1"
                  style={{
                    background: '#FAFAF7',
                    borderTop: `4px solid ${color}`,
                    margin: '0 6px',
                    border: `1px solid #E7ECEF`,
                    borderTopColor: color,
                    borderTopWidth: '4px',
                  }}
                >
                  <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color }}>
                    {number} — {step}
                  </p>
                  <p className="text-base leading-relaxed mb-5" style={{ color: '#1F2933', opacity: 0.8 }}>{copy}</p>
                  <ul className="space-y-1.5">
                    {examples.map(ex => (
                      <li key={ex} className="flex items-center gap-2 text-sm" style={{ color: '#1F2933', opacity: 0.65 }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={18} style={{ color: '#4DB7E5' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Highlight statement */}
          <div className="mt-10 rounded-2xl p-7 flex flex-col md:flex-row md:items-center gap-4" style={{ background: '#EAF7FC' }}>
            <p className="text-lg md:text-xl font-bold flex-1" style={{ color: '#0F5D5E' }}>
              &ldquo;Start where the barrier is.&rdquo;
            </p>
            <p className="text-sm leading-relaxed md:max-w-lg" style={{ color: '#1F2933', opacity: 0.8 }}>
              If access is the main challenge, DAN starts with access. If access already exists, the focus shifts to skills. If participants already have relevant skills, DAN focuses on opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. WHO WE ARE ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image — Ritika at a conference / presentation */}
            {/* Image: https://i.ibb.co/Kp60vPFj/Whats-App-Image-2026-04-26-at-23-50-33-Picsart-Ai-Image-Enhancer.jpg */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://i.ibb.co/Kp60vPFj/Whats-App-Image-2026-04-26-at-23-50-33-Picsart-Ai-Image-Enhancer.jpg"
                alt="DAN founder presenting at a digital equity conference"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.4) 0%, transparent 50%)' }} />
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: '#1F2933' }}>
                A digital opportunity organization.
              </h2>
              <div className="space-y-4 text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.8 }}>
                <p>
                  Digital Access Now is building a locally adaptable education and access platform that connects learning to opportunity.
                </p>
                <p>
                  Technology access remains essential, but DAN&apos;s work does not end when a device is delivered or someone gets online. Our focus is on whether young people can access technology, build useful skills, apply what they learn, and connect to meaningful next steps.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                style={{ background: '#0F5D5E' }}
              >
                Learn About DAN <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CURRENT FOCUS — 2026–2027 PILOT ─────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#0F5D5E' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                2026–2027
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-white">
                Our Current Focus
              </h2>
              <p className="text-lg font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Prove the model before scaling it.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.80)' }}>
                During the 2026–2027 pilot phase, DAN is developing and testing structured youth programs across five countries. The initial focus is on students above grade 8 in underserved or resource-constrained communities, while delivery adapts based on local needs, infrastructure, language, and partner capacity.
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                style={{ background: '#ffffff', color: '#0F5D5E' }}
              >
                Explore Our Programs <ArrowRight size={15} />
              </Link>
            </div>

            {/* Five pilot countries — clean typographic list */}
            <div className="divide-y" style={{ borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)', divideColor: 'rgba(255,255,255,0.12)' }}>
              {[
                'Nepal',
                'India',
                'Indonesia',
                'Nigeria',
                'United States',
              ].map((country, i) => (
                <div
                  key={country}
                  className="flex items-center gap-5 py-4"
                  style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}
                >
                  <span className="text-xs font-black tabular-nums shrink-0 w-5" style={{ color: '#4DB7E5' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-semibold text-white tracking-wide">{country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROGRAM SPOTLIGHT ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {/* Spotlight image — fills full height of right column */}
            {/* Image: https://i.ibb.co/NgjX72yS/Screenshot-2026-01-22-at-7-16-54-PM.png */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[420px]">
              <img
                src="https://i.ibb.co/NgjX72yS/Screenshot-2026-01-22-at-7-16-54-PM.png"
                alt="Students taking part in a DAN digital skills workshop"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.45) 0%, transparent 55%)' }} />
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-2"
                style={{ background: 'rgba(15,93,94,0.88)', backdropFilter: 'blur(6px)' }}
              >
                <p className="text-white text-xs font-semibold">DAN Student Workshop</p>
              </div>
            </div>

            <div>
              {/* Eyebrow moved inside text column so both columns top-align */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full shrink-0" style={{ background: '#4DB7E5' }} aria-hidden="true" />
                <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#4DB7E5' }}>In the Field</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: '#1F2933' }}>
                See the work in action.
              </h2>
              <div className="space-y-4 text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.8 }}>
                <p>
                  Students took part in a structured session focused on practical digital and AI skills, supported by DAN facilitators and local partners.
                </p>
                <p>
                  The workshop emphasized active learning, real-world application, and a clear next step beyond the session — building both capability and confidence.
                </p>
              </div>

              {/* Featured video block */}
              <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid #E7ECEF' }}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/L92pl5a5Cho"
                    title="Digital Access Now student workshop video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{ background: '#0F5D5E' }}
                >
                  See More of Our Work <ArrowRight size={15} />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm border-2 transition-all duration-200 hover:opacity-80"
                  style={{ color: '#0F5D5E', borderColor: '#0F5D5E' }}
                >
                  Blog &amp; Vlogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. HOW DAN DELIVERS ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
              How We Deliver
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1F2933' }}>
              Flexible delivery. Consistent purpose.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                number: '01',
                heading: 'School-Based Workshops',
                copy: 'Use existing classrooms, local technology, and school partnerships to deliver structured learning directly to students.',
              },
              {
                number: '02',
                heading: 'Online & Mobile-First Learning',
                copy: 'Flexible digital delivery where geography, hardware availability, or infrastructure makes in-person delivery difficult.',
              },
              {
                number: '03',
                heading: 'Local & Partner-Led Delivery',
                copy: 'Train volunteers, student leaders, chapters, schools, and partner organizations to help deliver and sustain programs locally.',
              },
            ].map(({ number, heading, copy }) => (
              <div
                key={heading}
                className="flex flex-col gap-4 py-8 pr-8"
                style={{ borderBottom: '2px solid #E7ECEF' }}
              >
                <p className="text-xs font-black tracking-widest" style={{ color: '#4DB7E5' }}>{number}</p>
                <h3 className="font-bold text-base leading-snug" style={{ color: '#1F2933' }}>{heading}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.72 }}>{copy}</p>
              </div>
            ))}
          </div>

          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm border-2 transition-all duration-200 hover:opacity-80"
            style={{ color: '#0F5D5E', borderColor: '#0F5D5E' }}
          >
            Explore All Programs <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── 7. PARTICIPANT JOURNEY ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
              The Participant Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1F2933' }}>
              From participation to possibility.
            </h2>
          </div>

          {/* Journey steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: 'Engage', copy: 'Recruit students through schools, partners, chapters, volunteers, and online outreach.' },
              { step: 'Learn', copy: 'Deliver structured workshops or cohorts using the technology available locally where possible.' },
              { step: 'Apply', copy: 'Participants complete a practical project, challenge, demonstration, or capstone.' },
              { step: 'Advance', copy: 'Connect participants to mentorship, certification, education, competitions, leadership, or careers.' },
              { step: 'Multiply', copy: 'Prepare selected participants to teach, mentor, organize, or lead future activities.' },
            ].map(({ step, copy }, i, arr) => (
              <div key={step} className="relative">
                <div
                  className="rounded-xl p-6 h-full"
                  style={{ background: '#FAFAF7', border: '1px solid #E7ECEF', borderTop: '3px solid #0F5D5E' }}
                >
                  <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: '#0F5D5E' }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="font-bold text-base mb-2" style={{ color: '#1F2933' }}>{step}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#1F2933', opacity: 0.65 }}>{copy}</p>
                </div>
                {/* Arrow connector — desktop only */}
                {i < arr.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 items-center justify-center">
                    <ArrowRight size={16} style={{ color: '#4DB7E5' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PARTNERSHIP / COLLABORATION ─────────────────────────────────── */}
      {/*
        COLLABORATION SECTION — Kept in code but hidden per user request.
        Uncomment when confirmed partner relationships are ready to display.

        <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-14">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>Partnership</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: '#1F2933' }}>
                  Built through collaboration.
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.8 }}>
                  DAN works with schools, communities, universities, companies, governments, funders, volunteers,
                  and local organizations to expand access, learning, mentorship, and local delivery.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm text-white
                             transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                  style={{ background: '#0F5D5E' }}
                >
                  Partner With DAN <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="space-y-12">
              // Corporate & Government Partners
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#1F2933', opacity: 0.45 }}>
                  Corporate & Government Partners
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center">
                  <img src="https://i.ibb.co/DHrcwKzv/image.png" alt="Apple" className="h-12 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
                  <img src="https://i.ibb.co/8DWNf084/image.png" alt="Microsoft" className="h-12 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
                  <img src="https://i.ibb.co/ynh0YHm5/image.png" alt="City of Philadelphia" className="h-12 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
                  <span className="text-sm text-gray-400 font-medium">PA State Government</span>
                </div>
              </div>
              // NGO / Nonprofit Partners
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#1F2933', opacity: 0.45 }}>
                  NGO & Nonprofit Partners
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center">
                  <img src="https://i.ibb.co/0VrvwdF9/image.png" alt="Power Up Tech" className="h-12 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
                  <img src="https://i.ibb.co/399xsYCM/image.png" alt="Rotary International" className="h-12 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
                  <img src="https://i.ibb.co/jvg811Lv/image.png" alt="Moinee" className="h-12 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
                  <img src="https://i.ibb.co/hxwrXfZj/image.png" alt="Zonta" className="h-12 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </section>
      */}

      {/* ── 9. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F5D5E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Help turn digital access into opportunity.
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
            Whether you are a student, volunteer, school, community organization, university, company, or funder, there is a way to contribute to DAN&apos;s work.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{ background: '#ffffff', color: '#0F5D5E' }}
            >
              Get Involved <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base text-white border-2 border-white transition-all duration-200 hover:opacity-80"
            >
              Partner With DAN <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-6">
            <Link
              href="/impact/donate"
              className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Support DAN
            </Link>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS GALLERY — Preserved for future use on Programs page ── */}
      {/*
        GALLERY CODE — kept but not rendered on homepage per brief.
        Move this block to /programs or /impact when ready.

        Images:
          https://i.ibb.co/QvVVTZFz/Whats-App-Image-2026-04-26-at-23-05-28-Picsart-Ai-Image-Enhancer.jpg  (Forbes 30u30)
          https://i.ibb.co/BKrhF3Vm/Whats-App-Image-2026-04-26-at-23-02-53-Picsart-Ai-Image-Enhancer.jpg  (Wharton Biotech)
          https://i.ibb.co/0VFTb5hQ/Whats-App-Image-2026-04-26-at-23-03-09-Picsart-Ai-Image-Enhancer.jpg  (Penn Biotech Dinner)
          https://i.ibb.co/TDmJc0pb/Whats-App-Image-2026-04-26-at-23-07-12-Picsart-Ai-Image-Enhancer.jpg  (Mask Ball NYC)
          https://i.ibb.co/Df08rPMw/Whats-App-Image-2026-04-26-at-23-08-23-Picsart-Ai-Image-Enhancer.jpg  (Ambassador Chris Lu)
          https://i.ibb.co/nsdwW0rq/Whats-App-Image-2026-04-26-at-23-50-15-Picsart-Ai-Image-Enhancer.jpg  (Community engagement wide)

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3 block">In the Field</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Recent Highlights</h2>
              </div>
              <p className="text-gray-500 max-w-md text-sm leading-relaxed">
                Our founder's recent engagements, conferences, and community partnerships across the globe.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{gridTemplateRows: '420px 420px'}}>
              <div className="md:row-span-2 relative rounded-2xl overflow-hidden group cursor-default">
                <img src="https://i.ibb.co/QvVVTZFz/Whats-App-Image-2026-04-26-at-23-05-28-Picsart-Ai-Image-Enhancer.jpg" alt="Forbes 30 Under 30 Summit" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 21, 2026</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-primary-blue text-xs font-bold uppercase tracking-wide mb-1">Forbes 30 Under 30</p>
                  <p className="text-white font-semibold text-base leading-snug">Ritika represented Digital Access Now at the Forbes 30 Under 30 Summit</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group cursor-default">
                <img src="https://i.ibb.co/BKrhF3Vm/Whats-App-Image-2026-04-26-at-23-02-53-Picsart-Ai-Image-Enhancer.jpg" alt="Wharton Biotech Conference" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 25, 2026</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">Networking at the Wharton Biotech Conference for Digital Access Now</p></div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group cursor-default">
                <img src="https://i.ibb.co/0VFTb5hQ/Whats-App-Image-2026-04-26-at-23-03-09-Picsart-Ai-Image-Enhancer.jpg" alt="Penn Biotech 25th Anniversary" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 25, 2026</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">DAN attended Penn Biotech Group's 25th anniversary dinner at UPenn</p></div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group cursor-default">
                <img src="https://i.ibb.co/TDmJc0pb/Whats-App-Image-2026-04-26-at-23-07-12-Picsart-Ai-Image-Enhancer.jpg" alt="Mask Ball NYC" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 10, 2026</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">Invited to the Mask Ball event at International House NYC</p></div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group cursor-default">
                <img src="https://i.ibb.co/Df08rPMw/Whats-App-Image-2026-04-26-at-23-08-23-Picsart-Ai-Image-Enhancer.jpg" alt="Meeting Ambassador Chris Lu" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 8, 2026</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">Ritika met Ambassador Chris Lu at the Rotary Club</p></div>
              </div>
            </div>
            <div className="mt-4 relative rounded-2xl overflow-hidden h-96 group cursor-default">
              <img src="https://i.ibb.co/nsdwW0rq/Whats-App-Image-2026-04-26-at-23-50-15-Picsart-Ai-Image-Enhancer.jpg" alt="Community engagement" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{objectPosition: 'center 30%'}} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-base md:text-lg max-w-xl">Community engagement and local partnerships — advancing digital equity at the grassroots level</p>
              </div>
            </div>
          </div>
        </section>
      */}

      <Footer />
    </div>
  )
}
