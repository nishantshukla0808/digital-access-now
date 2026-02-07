import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'

export default function OurPeople() {
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
    {
      name: 'Yash',
      role: 'Social Media Director',
      bio: 'Building digital presence and managing social media strategy',
      image: 'https://i.ibb.co/ycD3wQWy/Yash.jpg',
    },
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

      {/* Hero Section with Gradient */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-primary-blue via-primary-purple to-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Our People
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl text-pretty">
            Meet the dedicated team and leaders driving digital equity worldwide
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-20 uppercase tracking-tight" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.2)' }}>
            OUR TEAM
          </h2>
          
          {/* First Row - 3 Members */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {teamMembers.slice(0, 3).map((member, i) => (
              <div key={i} className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
                {/* Rounded Image Container */}
                <div className="mb-6 flex justify-center">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-red-accent transition-all duration-300 group-hover:shadow-3xl">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{member.name}</h3>
                <p className="text-red-accent font-bold text-lg mb-3">{member.role}</p>
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
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-red-accent transition-all duration-300 group-hover:shadow-3xl">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{member.name}</h3>
                <p className="text-red-accent font-bold text-lg mb-3">{member.role}</p>
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
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-red-accent transition-all duration-300 group-hover:shadow-3xl">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>{member.name}</h3>
                <p className="text-red-accent font-bold text-lg mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-blue to-primary-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our mission of bridging the digital divide.
          </p>
          <a href="/about/our-careers" className="inline-block bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
            Explore Careers
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
