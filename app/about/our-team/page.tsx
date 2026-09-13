import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'

// Always read fresh member data — never serve stale cache
export const dynamic = 'force-dynamic'

// ─── Palette (matches volunteer page) ────────────────────────────────────────
const C = {
  bg:        '#FAFAF7',
  bgAlt:     '#ffffff',
  bgLight:   '#EAF7FC',
  teal:      '#0F5D5E',
  midTeal:   '#238C91',
  sky:       '#4DB7E5',
  text:      '#1F2933',
  border:    '#E7ECEF',
}

// ─── Fallback data (used only if DB has no team entries) ─────────────────────
const HARDCODED_TEAM = [
  { id: 'hc1',  name: 'Ritika Malik',           role_title: 'CEO and Founder',                bio: 'Student studying Neuroscience at Columbia University',                                      image_url: 'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png', member_type: 'team' },
  { id: 'hc2',  name: 'Awahan Sapkota',          role_title: 'Vice President',                 bio: 'Senior studying Chemical Engineering and Physics at the University of Pennsylvania',         image_url: 'https://i.ibb.co/jZwpDG3G/Awahan.jpg',                                            member_type: 'team' },
  { id: 'hc3',  name: 'Aayushi Shah',            role_title: 'Director of Human Resources',    bio: 'Leading human resources and team development initiatives',                                  image_url: 'https://i.ibb.co/5gmSJkvg/Aayushi-Shah-Picsart-Ai-Image-Enhancer.jpg',             member_type: 'team' },
  { id: 'hc5',  name: 'Nishu Shukla',            role_title: 'Website Director',               bio: 'Overseeing creative direction and brand development',                                       image_url: 'https://i.ibb.co/jPXXKSLg/photo-nishu.jpg',                                       member_type: 'team' },
  { id: 'hc6',  name: 'Suman',                   role_title: 'Director of Data & Technology',  bio: 'Managing data analytics and technology infrastructure',                                     image_url: 'https://i.ibb.co/V02X2YCP/suman1.png',                                            member_type: 'team' },
  { id: 'hc7',  name: 'Tejinderjit Singh',       role_title: 'Director of Student Engagement', bio: 'Leading student outreach and engagement initiatives',                                       image_url: 'https://i.ibb.co/7xN2gfhs/TJ.jpg',                                                member_type: 'team' },
  { id: 'hc8',  name: 'Yash Sharma',             role_title: 'Social Media Director',          bio: 'Driving digital presence and social media strategy across platforms',                       image_url: 'https://i.ibb.co/jvcmFJgQ/Yash-Picsart-Ai-Image-Enhancer.jpg',                    member_type: 'team' },
  { id: 'hc9',  name: 'Prof. Abirlal Mukherjee', role_title: 'Country Director, India',        bio: 'Leading operations and strategic initiatives in India',                                     image_url: 'https://i.ibb.co/39BNW2fR/Screenshot-2026-02-07-153447-Picsart-Ai-Image-Enhancer.png', member_type: 'team' },
  { id: 'hc10', name: 'Fashiba',                 role_title: 'Country Director, Pakistan',     bio: 'Leading operations and strategic initiatives in Pakistan',                                  image_url: 'https://i.ibb.co/KPp0qp3/Fashiba.jpg',                                            member_type: 'team' },
  { id: 'hc11', name: 'Stuti Jhunjhunwala',      role_title: 'Workshop Director',              bio: 'Designing and leading impactful digital literacy workshops for communities',                 image_url: 'https://i.ibb.co/qMDzmrhG/Whats-App-Image-2026-07-11-at-23-47-12-Picsart-Ai-Image-Enhancer.jpg', member_type: 'team' },
  { id: 'hc12', name: 'Christopher Ayisah',      role_title: 'Full Stack Developer',           bio: 'Building and maintaining the technical infrastructure that powers our mission',              image_url: 'https://i.ibb.co/fYVwLwYd/Whats-App-Image-2026-07-11-at-23-48-00-Picsart-Ai-Image-Enhancer.jpg', member_type: 'team' },
  { id: 'hc13', name: 'Shashi Bhushan',          role_title: 'Team Member',                    bio: 'Contributing to digital equity initiatives and community outreach programs',                 image_url: 'https://i.ibb.co/Fb35dvys/Whats-App-Image-2026-07-11-at-23-50-27-Picsart-Ai-Image-Enhancer.jpg', member_type: 'team' },
]

type MemberRow = { id: string; name: string; role_title: string; bio: string | null; image_url: string; member_type: string }

// ─── Member Card ──────────────────────────────────────────────────────────────
function MemberCard({ member, variant = 'team' }: { member: MemberRow; variant?: 'team' | 'advisory' }) {
  const ringColor  = variant === 'advisory' ? '#238C91' : '#0F5D5E'
  const roleColor  = variant === 'advisory' ? '#238C91' : '#0F5D5E'

  return (
    <div className="flex flex-col items-center text-center group">
      {/* Avatar */}
      <div
        className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden mb-4 shadow-md transition-transform duration-300 group-hover:scale-105 border-2"
        style={{ borderColor: ringColor }}
      >
        <img
          src={member.image_url}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-base mb-0.5 leading-snug" style={{ color: C.text }}>
        {member.name}
      </h3>
      <p className="text-sm font-medium" style={{ color: roleColor }}>
        {member.role_title}
      </p>
      {member.bio && (
        <p className="text-xs mt-2 leading-relaxed max-w-[180px]" style={{ color: C.text, opacity: 0.6 }}>
          {member.bio}
        </p>
      )}
    </div>
  )
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ text, color = C.sky }: { text: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-0.5 rounded-full" style={{ background: color }} />
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color }}>
        {text}
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function OurTeam() {
  const supabase = await createClient()

  // Try with member_type; fall back without it if column doesn't exist yet
  let { data: dbAll, error: dbError } = await supabase
    .from('team_members')
    .select('id, name, role_title, bio, image_url, member_type')
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  if (dbError) {
    const fallback = await supabase
      .from('team_members')
      .select('id, name, role_title, bio, image_url')
      .eq('status', 'active')
      .order('created_at', { ascending: true })
    dbAll = fallback.data
  }

  const allMembers: MemberRow[] = dbAll && dbAll.length > 0 ? dbAll : HARDCODED_TEAM
  const teamMembers     = allMembers.filter(m => m.member_type !== 'advisory')
  const advisoryMembers = allMembers.filter(m => m.member_type === 'advisory')

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20" style={{ background: C.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="Digital Access Now" color={C.sky} />
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4 max-w-3xl" style={{ color: C.teal }}>
            Meet the people behind the mission.
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: C.text, opacity: 0.75 }}>
            Passionate leaders, technologists, and community builders working together to bridge the digital divide across the globe.
          </p>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────────── */}
      <div style={{ background: C.border, height: 1 }} />

      {/* ── Core Team ─────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: C.bgAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel text="Core Team" color={C.sky} />
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: C.text }}>
              Our Core Team
            </h2>
            <p className="text-base" style={{ color: C.text, opacity: 0.6 }}>
              The dedicated individuals leading our mission every day.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-12">
            {teamMembers.map(m => (
              <div key={m.id} className="w-52 md:w-56">
                <MemberCard member={m} variant="team" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisory Board ────────────────────────────────────────────────────── */}
      {advisoryMembers.length > 0 && (
        <>
          <div style={{ background: C.border, height: 1 }} />
          <section className="py-16 md:py-24" style={{ background: C.bgLight }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <SectionLabel text="Advisory Board" color={C.midTeal} />
                <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: C.text }}>
                  Advisory Board
                </h2>
                <p className="text-base" style={{ color: C.text, opacity: 0.6 }}>
                  Distinguished advisors guiding our strategic vision and growth.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-12">
                {advisoryMembers.map(m => (
                  <div key={m.id} className="w-52 md:w-56">
                    <MemberCard member={m} variant="advisory" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24" style={{ background: C.teal }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: C.sky }}>
            Join us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Be part of the mission.
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            We&apos;re always looking for passionate people to help bridge the digital divide.
          </p>
          <a
            href="/volunteer"
            className="inline-block rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ background: '#ffffff', color: C.teal }}
          >
            Get Involved
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
