import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'

// Always-available fallback — preserves the existing team if DB has no entries yet
const HARDCODED_TEAM = [
  { id: 'hc1', name: 'Ritika Malik', role_title: 'CEO and Founder', bio: 'Student studying Neuroscience at Columbia University', image_url: 'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png' },
  { id: 'hc2', name: 'Awahan Sapkota', role_title: 'Vice President', bio: 'Senior studying Chemical Engineering and Physics at the University of Pennsylvania', image_url: 'https://i.ibb.co/jZwpDG3G/Awahan.jpg' },
  { id: 'hc3', name: 'Aayushi Shah', role_title: 'Director of Human Resources', bio: 'Leading human resources and team development initiatives', image_url: 'https://i.ibb.co/5gmSJkvg/Aayushi-Shah-Picsart-Ai-Image-Enhancer.jpg' },
  { id: 'hc4', name: 'Ishita', role_title: 'Director of Education Systems', bio: 'Developing educational programs and curriculum frameworks', image_url: 'https://i.ibb.co/DDnVbWXY/Ishita.png' },
  { id: 'hc5', name: 'Nishu Shukla', role_title: 'Website Director', bio: 'Overseeing creative direction and brand development', image_url: 'https://i.ibb.co/jPXXKSLg/photo-nishu.jpg' },
  { id: 'hc6', name: 'Suman', role_title: 'Director of Data & Technology', bio: 'Managing data analytics and technology infrastructure', image_url: 'https://i.ibb.co/V02X2YCP/suman1.png' },
  { id: 'hc7', name: 'Tejinderjit Singh', role_title: 'Director of Student Engagement', bio: 'Leading student outreach and engagement initiatives', image_url: 'https://i.ibb.co/7xN2gfhs/TJ.jpg' },
  { id: 'hc8', name: 'Yash Sharma', role_title: 'Social Media Director', bio: 'Driving digital presence and social media strategy across platforms', image_url: 'https://i.ibb.co/jvcmFJgQ/Yash-Picsart-Ai-Image-Enhancer.jpg' },
  { id: 'hc9', name: 'Prof. Abirlal Mukherjee', role_title: 'Country Director, India', bio: 'Leading operations and strategic initiatives in India', image_url: 'https://i.ibb.co/39BNW2fR/Screenshot-2026-02-07-153447-Picsart-Ai-Image-Enhancer.png' },
  { id: 'hc10', name: 'Fashiba', role_title: 'Country Director, Pakistan', bio: 'Leading operations and strategic initiatives in Pakistan', image_url: 'https://i.ibb.co/KPp0qp3/Fashiba.jpg' },
  { id: 'hc11', name: 'Stuti Jhunjhunwala', role_title: 'Workshop Director', bio: 'Designing and leading impactful digital literacy workshops for communities', image_url: 'https://i.ibb.co/qMDzmrhG/Whats-App-Image-2026-07-11-at-23-47-12-Picsart-Ai-Image-Enhancer.jpg' },
  { id: 'hc12', name: 'Christopher Ayisah', role_title: 'Full Stack Developer', bio: 'Building and maintaining the technical infrastructure that powers our mission', image_url: 'https://i.ibb.co/fYVwLwYd/Whats-App-Image-2026-07-11-at-23-48-00-Picsart-Ai-Image-Enhancer.jpg' },
  { id: 'hc13', name: 'Shashi Bhushan', role_title: 'Team Member', bio: 'Contributing to digital equity initiatives and community outreach programs', image_url: 'https://i.ibb.co/Fb35dvys/Whats-App-Image-2026-07-11-at-23-50-27-Picsart-Ai-Image-Enhancer.jpg' },
]

function MemberCard({ member, priority = false }: { member: typeof HARDCODED_TEAM[0]; priority?: boolean }) {
  return (
    <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="mb-6 flex justify-center">
        <div className="w-full aspect-square rounded-full bg-linear-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-primary-blue transition-all duration-300">
          <img
            src={member.image_url}
            alt={member.name}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
        {member.name}
      </h3>
      <p className="text-primary-blue font-bold text-lg mb-3">{member.role_title}</p>
      {member.bio && <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>}
    </div>
  )
}

export default async function OurTeam() {
  const supabase = await createClient()
  const { data: dbMembers } = await supabase
    .from('team_members')
    .select('id, name, role_title, bio, image_url')
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  // If DB has members, use them; otherwise show the hardcoded team (never empty)
  const teamMembers = dbMembers && dbMembers.length > 0 ? dbMembers : HARDCODED_TEAM

  // No row-splitting needed — flex-wrap handles any count automatically

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
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

      {/* Team Members Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-14">
            {teamMembers.map((m, i) => (
              <div key={m.id} className="w-56 md:w-64">
                <MemberCard member={m} priority={i < 4} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-linear-to-r from-primary-blue to-primary-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our mission of bridging the digital divide.
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
