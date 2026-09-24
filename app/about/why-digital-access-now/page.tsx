import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Why Digital Access Matters | Digital Access Now',
  description:
    'Learn why connectivity alone is not enough, how digital skills and opportunity shape meaningful participation, and how Digital Access Now works across access, skills, and opportunity.',
}

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '2.2B', label: 'people remained offline in 2025' },
  { value: '74%', label: 'of the world\'s population was online in 2025' },
  { value: '96%+', label: 'covered by mobile broadband networks' },
]

const BARRIERS = [
  {
    label: 'Access',
    copy: 'A person may lack a device, stable power, affordable data, reliable broadband, or an appropriate place to learn.',
  },
  {
    label: 'Skills',
    copy: 'Having connectivity does not guarantee digital literacy, safe use, AI literacy, communication skills, or career-ready capabilities.',
  },
  {
    label: 'Application',
    copy: 'Learning that is not practiced through real projects often fails to translate into confidence or capability.',
  },
  {
    label: 'Opportunity',
    copy: 'Skills without mentorship, education pathways, leadership opportunities, employment, or networks may not change life outcomes.',
  },
  {
    label: 'Local Capacity',
    copy: 'Programs that rely entirely on outside staff are difficult to sustain or scale.',
  },
]

const PILLARS = [
  {
    label: 'Access',
    color: '#4DB7E5',
    copy: 'Reliable access to technology, connectivity, and digital resources.',
    examples: ['Shared labs or hubs', 'School hardware', 'Wi-Fi and connectivity', 'Mobile-first tools', 'Offline resources', 'Targeted device support'],
  },
  {
    label: 'Skills',
    color: '#238C91',
    copy: 'Practical digital, AI, communication, and career-ready capabilities.',
    examples: ['Digital foundations', 'Online safety', 'Productivity tools', 'Responsible AI', 'Communication', 'Applied digital skills'],
  },
  {
    label: 'Opportunity',
    color: '#0F5D5E',
    copy: 'Pathways where participants can apply learning and advance.',
    examples: ['Mentorship', 'Certifications', 'Competitions', 'Education resources', 'Leadership', 'Career pathways'],
  },
]

const SDGS = [
  { code: 'SDG 4', label: 'Quality Education' },
  { code: 'SDG 5', label: 'Gender Equality' },
  { code: 'SDG 8', label: 'Decent Work & Economic Growth' },
  { code: 'SDG 9', label: 'Industry, Innovation & Infrastructure' },
  { code: 'SDG 10', label: 'Reduced Inequalities' },
  { code: 'SDG 17', label: 'Partnerships for the Goals' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WhyDigitalAccessNow() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-0" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-14 md:py-20">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                Why Digital Access Now
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-6" style={{ color: '#0F5D5E' }}>
                Access is the beginning.<br />Opportunity is the goal.
              </h1>
              <p className="text-lg leading-relaxed mb-4 max-w-prose" style={{ color: '#1F2933', opacity: 0.8 }}>
                Technology shapes how young people learn, communicate, create, and prepare for their futures. But being connected does not necessarily mean being able to participate meaningfully.
              </p>
              <p className="text-lg leading-relaxed mb-8 max-w-prose" style={{ color: '#1F2933', opacity: 0.8 }}>
                Young people may still face barriers involving devices, connectivity, affordability, practical digital skills, safe technology use, mentorship, and pathways to education, leadership, or careers.
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                style={{ background: '#0F5D5E' }}
              >
                See How DAN Works <ArrowRight size={15} />
              </Link>
            </div>

            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://i.ibb.co/pvYZxKKt/Whats-App-Image-2026-04-26-at-23-50-20-Picsart-Ai-Image-Enhancer.jpg"
                alt="Building partnerships for digital equity"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.45) 0%, transparent 55%)' }} />
              <div
                className="absolute bottom-4 left-4 rounded-xl px-4 py-2.5"
                style={{ background: 'rgba(15,93,94,0.88)', backdropFilter: 'blur(6px)' }}
              >
                <p className="text-white text-sm font-semibold">Building partnerships to advance digital equity globally</p>
              </div>
            </div>
          </div>
          <div className="h-px" style={{ background: 'linear-gradient(to right, #4DB7E5, #0F5D5E, transparent)' }} />
        </div>
      </section>

      {/* ── 2. THE DIGITAL OPPORTUNITY GAP — STATS ──────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#0F5D5E' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                The Scale
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                The Digital Opportunity Gap
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.80)' }}>
                Global connectivity has expanded, but meaningful digital participation remains unequal.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Connectivity coverage alone does not solve barriers involving affordability, quality, devices, skills, security, or meaningful use.
              </p>
            </div>
            <div className="space-y-6">
              {STATS.map(({ value, label }) => (
                <div
                  key={value}
                  className="flex items-baseline gap-5 rounded-2xl px-8 py-6"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <span className="text-4xl md:text-5xl font-black text-white shrink-0">{value}</span>
                  <span className="text-base font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.78)' }}>{label}</span>
                </div>
              ))}
              <p className="text-xs pl-2" style={{ color: 'rgba(255,255,255,0.40)' }}>
                Source: ITU, Measuring Digital Development: Facts and Figures 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE PROBLEM IS BIGGER THAN CONNECTIVITY — BARRIERS ───────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
              The deeper challenge
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: '#1F2933' }}>
              The Problem Is Bigger Than Connectivity
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>
              Even when connectivity exists, people face multiple layers of barriers that prevent meaningful digital participation.
            </p>
          </div>

          {/* Vertical barrier list */}
          <div className="max-w-4xl space-y-0">
            {BARRIERS.map(({ label, copy }, i) => (
              <div
                key={label}
                className="flex gap-6 py-8"
                style={{ borderBottom: i < BARRIERS.length - 1 ? '1px solid #E7ECEF' : 'none' }}
              >
                <div className="shrink-0 pt-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: '#0F5D5E' }}
                  >
                    {i + 1}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-base mb-2" style={{ color: '#0F5D5E' }}>{label}</p>
                  <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FROM ACCESS TO OPPORTUNITY — PILLARS ─────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
              The DAN approach
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: '#1F2933' }}>
              From Access to Opportunity
            </h2>
            <p className="text-base leading-relaxed mb-3" style={{ color: '#1F2933', opacity: 0.8 }}>
              DAN approaches the digital divide as a pathway rather than a single problem. Every community has a different starting point, so the intervention should follow the local barrier.
            </p>
          </div>

          {/* Highlight statement */}
          <div className="rounded-2xl p-8 mb-10" style={{ background: '#EAF7FC' }}>
            <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#0F5D5E' }}>
              &ldquo;Start where the barrier is.&rdquo;
            </p>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#1F2933', opacity: 0.8 }}>
              If a community lacks access, DAN starts with access. If access already exists, DAN focuses on skills. If participants already have relevant skills, DAN focuses on opportunity. The model is sequential when needed, but not rigid.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map(({ label, color, copy, examples }) => (
              <div
                key={label}
                className="rounded-xl p-7"
                style={{ background: '#ffffff', border: '1px solid #E7ECEF', borderTop: `4px solid ${color}` }}
              >
                <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color }}>{label}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#1F2933', opacity: 0.8 }}>{copy}</p>
                <ul className="space-y-1.5">
                  {examples.map(ex => (
                    <li key={ex} className="flex items-center gap-2 text-sm" style={{ color: '#1F2933', opacity: 0.7 }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY THIS MATTERS FOR YOUNG PEOPLE ────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                Who we focus on
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: '#1F2933' }}>
                Why This Matters for Young People
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
                <p>
                  For the 2026–2027 pilot phase, DAN is primarily focused on structured programs for students above grade 8 in underserved or resource-constrained communities.
                </p>
                <p>
                  Some students may lack basic access to technology. Others may have phones or internet access but limited experience using digital tools productively. Others may already have relevant skills but lack mentorship, leadership opportunities, career guidance, or pathways to continue learning.
                </p>
                <p>
                  Different barriers require different responses.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
              <img
                src="https://i.ibb.co/NgjX72yS/Screenshot-2026-01-22-at-7-16-54-PM.png"
                alt="DAN student digital education program"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,93,94,0.45) 0%, transparent 55%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. HOW DAN RESPONDS — PATHWAY ───────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
              Our response
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight" style={{ color: '#1F2933' }}>
              How DAN Responds
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
              DAN works with schools, volunteers, partners, and local leaders to select the intervention that best fits the community rather than forcing every community into one fixed delivery model.
            </p>
          </div>

          {/* Pathway steps */}
          <div className="flex flex-wrap gap-2 items-center">
            {[
              'Identify the barrier',
              'Build access',
              'Develop skills',
              'Apply learning',
              'Connect opportunity',
              'Grow local leadership',
            ].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className="rounded-full px-5 py-2.5 text-sm font-bold text-white"
                  style={{ background: '#0F5D5E' }}
                >
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight size={16} style={{ color: '#4DB7E5' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. GLOBAL ALIGNMENT — SDGS ──────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
                Broader context
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ color: '#1F2933' }}>
                Part of a Global Challenge
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#1F2933', opacity: 0.8 }}>
                DAN&apos;s strategy aligns with broader international priorities around meaningful connectivity, digital skills, inclusive education, economic opportunity, and partnerships.
              </p>
              <div className="rounded-xl p-5 mb-6" style={{ background: '#EAF7FC' }}>
                <p className="text-sm font-bold mb-2" style={{ color: '#0F5D5E' }}>UN Global Digital Compact</p>
                <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
                  DAN&apos;s strategy aligns with the direction of the United Nations Global Digital Compact, including its emphasis on closing digital divides, expanding meaningful connectivity, and strengthening digital literacy, skills, and capacities.
                </p>
              </div>
              <p className="text-xs" style={{ color: '#1F2933', opacity: 0.45 }}>
                This is strategic alignment and does not imply United Nations affiliation or endorsement.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: '#4DB7E5' }}>
                Aligned with
              </p>
              <div className="space-y-3">
                {SDGS.map(({ code, label }) => (
                  <div
                    key={code}
                    className="flex items-center gap-4 rounded-xl px-5 py-3.5"
                    style={{ background: '#FAFAF7', border: '1px solid #E7ECEF' }}
                  >
                    <span className="text-xs font-black tracking-wide shrink-0" style={{ color: '#0F5D5E' }}>{code}</span>
                    <span className="text-sm font-medium" style={{ color: '#1F2933', opacity: 0.8 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F5D5E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Access Should Lead Somewhere.
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
            Digital access matters most when it enables people to learn, create, participate, lead, and pursue meaningful opportunities. DAN works beyond access by connecting technology, practical learning, and pathways forward.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{ background: '#ffffff', color: '#0F5D5E' }}
            >
              Explore Our Work <ArrowRight size={16} />
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
              href="/volunteer"
              className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.65)' }}
            >
              Volunteer with DAN
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
