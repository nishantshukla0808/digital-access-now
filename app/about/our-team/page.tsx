import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'

// Always read fresh member data — never serve stale cache
export const dynamic = 'force-dynamic'

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

// ─── Member Card — variant controls accent colour ────────────────────────────
function MemberCard({
  member,
  priority = false,
  variant = 'team',
}: {
  member: MemberRow
  priority?: boolean
  variant?: 'team' | 'advisory'
}) {
  const hoverBorder  = variant === 'advisory' ? 'group-hover:border-primary-purple' : 'group-hover:border-primary-blue'
  const gradient     = variant === 'advisory' ? 'from-primary-purple to-cyan-600'   : 'from-primary-blue to-primary-purple'
  const roleColour   = variant === 'advisory' ? 'text-primary-purple'               : 'text-primary-blue'

  return (
    <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="mb-6 flex justify-center">
        <div className={`w-full aspect-square rounded-full bg-linear-to-br ${gradient} flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 ${hoverBorder} transition-all duration-300`}>
          <img
            src={member.image_url}
            alt={member.name}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <h3 className="text-xl font-black mb-1 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.08)' }}>
        {member.name}
      </h3>
      <p className={`${roleColour} font-bold text-base mb-2`}>{member.role_title}</p>
      {member.bio && <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>}
    </div>
  )
}

// ─── Section divider / heading ────────────────────────────────────────────────
function SectionHeading({ title, subtitle, accent = 'blue' }: { title: string; subtitle: string; accent?: 'blue' | 'purple' }) {
  const bar = accent === 'purple' ? 'bg-primary-purple' : 'bg-primary-blue'
  const text = accent === 'purple' ? 'text-primary-purple' : 'text-primary-blue'
  return (
    <div className="text-center mb-16">
      <div className={`inline-block h-1 w-16 ${bar} rounded-full mb-6`} />
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">{title}</h2>
      <p className={`${text} font-semibold text-lg max-w-2xl mx-auto`}>{subtitle}</p>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
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

  // Split by member_type. Fall back to hardcoded if DB is empty.
  const allMembers: MemberRow[] = dbAll && dbAll.length > 0 ? dbAll : HARDCODED_TEAM
  const teamMembers     = allMembers.filter(m => m.member_type !== 'advisory')
  const advisoryMembers = allMembers.filter(m => m.member_type === 'advisory')

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">LEADERS</div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">INNOVATORS</div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">CHANGEMAKERS</div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">VISIONARIES</div>
        </div>
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            MEET OUR TEAM
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Passionate leaders and innovators driving digital equity across the globe
          </p>
        </div>
      </section>

      {/* ── Core Team ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Core Team"
            subtitle="The dedicated individuals leading our mission every day"
            accent="blue"
          />
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
            {teamMembers.map((m, i) => (
              <div key={m.id} className="w-52 md:w-60">
                <MemberCard member={m} priority={i < 4} variant="team" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisory Board ────────────────────────────────────────────────── */}
      {advisoryMembers.length > 0 && (
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Advisory Board"
              subtitle="Distinguished advisors guiding our strategic vision"
              accent="purple"
            />
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
              {advisoryMembers.map((m, i) => (
                <div key={m.id} className="w-52 md:w-60">
                  <MemberCard member={m} priority={i < 4} variant="advisory" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Call to Action ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-linear-to-r from-primary-blue to-primary-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for passionate individuals to join our mission of bridging the digital divide.
          </p>
          <a href="/volunteer" className="inline-block bg-white text-primary-blue hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-all duration-300">
            Get Involved
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
