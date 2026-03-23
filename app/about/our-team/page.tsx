import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'

export default function OurTeam() {
  const teamMembers = [
    {
      name: 'Ritika Malik',
      role: 'CEO and Founder',
      bio: 'Student studying Neuroscience at Columbia University',
      image: 'https://i.ibb.co/KxGZGXN4/rs-w-730-h-730-cg-true-Picsart-Ai-Image-Enhancer.png',
    },
    {
      name: 'Awahan Sapkota',
      role: 'Vice President',
      bio: 'Senior studying Chemical Engineering and Physics at the University of Pennsylvania',
      image: 'https://i.ibb.co/jZwpDG3G/Awahan.jpg',
    },
    {
      name: 'Aayushi Shah',
      role: 'Director of Human Resources',
      bio: 'Leading human resources and team development initiatives',
      image: 'https://i.ibb.co/5gmSJkvg/Aayushi-Shah-Picsart-Ai-Image-Enhancer.jpg',
    },
    {
      name: 'Ishita',
      role: 'Director of Education Systems',
      bio: 'Developing educational programs and curriculum frameworks',
      image: 'https://i.ibb.co/DDnVbWXY/Ishita.png',
    },
    {
      name: 'Nishu Shukla',
      role: 'Website Director',
      bio: 'Overseeing creative direction and brand development',
      image: 'https://i.ibb.co/jPXXKSLg/photo-nishu.jpg',
    },
    {
      name: 'Suman',
      role: 'Director of Data & Technology',
      bio: 'Managing data analytics and technology infrastructure',
      image: 'https://i.ibb.co/V02X2YCP/suman1.png',
    },
    {
      name: 'Tejinderjit Singh',
      role: 'Director of Student Engagement',
      bio: 'Leading student outreach and engagement initiatives',
      image: 'https://i.ibb.co/7xN2gfhs/TJ.jpg',
    },
    // {
    //   name: 'Yash',
    //   role: 'Social Media Director',
    //   bio: 'Building digital presence and managing social media strategy',
    //   image: 'https://i.ibb.co/ycD3wQWy/Yash.jpg',
    // },
    {
      name: 'Prof. Abirlal Mukherjee',
      role: 'Country Director, India',
      bio: 'Leading operations and strategic initiatives in India',
      image: 'https://i.ibb.co/39BNW2fR/Screenshot-2026-02-07-153447-Picsart-Ai-Image-Enhancer.png',
    },
    {
      name: 'Fashiba',
      role: 'Country Director, Pakistan',
      bio: 'Leading operations and strategic initiatives in Pakistan',
      image: 'https://i.ibb.co/KPp0qp3/Fashiba.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">
            LEADERS
          </div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">
            INNOVATORS
          </div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">
            CHANGEMAKERS
          </div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">
            VISIONARIES
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
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
          {/* First Row - 3 Members */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {teamMembers.slice(0, 3).map((member, i) => (
              <div key={i} className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
                {/* Rounded Image Container */}
                <div className="mb-6 flex justify-center">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-linear-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-primary-blue transition-all duration-300 group-hover:shadow-3xl">
                    <img 
                      src={member.image}
                      alt={member.name}
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{member.name}</h3>
                <p className="text-primary-blue font-bold text-lg mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Second Row - 3 Members */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {teamMembers.slice(3, 6).map((member, i) => (
              <div key={i} className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
                {/* Rounded Image Container */}
                <div className="mb-6 flex justify-center">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-linear-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-primary-blue transition-all duration-300 group-hover:shadow-3xl">
                    <img 
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{member.name}</h3>
                <p className="text-primary-blue font-bold text-lg mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Third Row - 4 Members */}
          <div className="grid md:grid-cols-4 gap-12">
            {teamMembers.slice(6, 10).map((member, i) => (
              <div key={i} className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
                {/* Rounded Image Container */}
                <div className="mb-6 flex justify-center">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-linear-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-primary-blue transition-all duration-300 group-hover:shadow-3xl">
                    <img 
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{member.name}</h3>
                <p className="text-primary-blue font-bold text-lg mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
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
