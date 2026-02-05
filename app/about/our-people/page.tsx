import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'

export default function OurPeople() {
  const teamMembers = [
    {
      name: 'Awahan Sapkota',
      role: 'Chief of Operation Officer',
      bio: 'Senior studying Chemical Engineering and Physics at the University of Pennsylvania',
      image: 'https://i.ibb.co/jZwpDG3G/Awahan.jpg',
    },
    {
      name: 'Ritika Malik',
      role: 'Founder & CEO',
      bio: 'Student studying Neuroscience at Columbia University',
      image: 'https://i.ibb.co/wFqRmQYQ/Ritika.jpg',
    },
    {
      name: 'Aayushi Shah',
      role: 'HR Manager',
      bio: 'Leading human resources and team development initiatives',
      image: 'https://i.ibb.co/WW7b3Hmk/Aayushi-Shah.jpg',
    },
    {
      name: 'Nishu Shukla',
      role: 'Website Director',
      bio: 'Overseeing creative direction and brand development',
      image: 'https://i.ibb.co/jPXXKSLg/photo-nishu.jpg',
    },
    {
      name: 'Suman',
      role: 'Grant Director',
      bio: 'Managing grant applications and funding opportunities',
      image: 'https://i.ibb.co/V02X2YCP/suman1.png',
    },
    {
      name: 'Ishita',
      role: 'Education System Director',
      bio: 'Developing educational programs and curriculum frameworks',
      image: 'https://i.ibb.co/DDnVbWXY/Ishita.png',
    },
    {
      name: 'Fashiba',
      role: 'Chief Financial Officer',
      bio: 'Managing financial operations and strategic planning',
      image: 'https://i.ibb.co/KPp0qp3/Fashiba.jpg',
    },
    {
      name: 'Yash',
      role: 'Technology Lead',
      bio: 'Building and maintaining technical infrastructure and digital solutions',
      image: 'https://i.ibb.co/ycD3wQWy/Yash.jpg',
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
          
          {/* First Row - 2 Members */}
          <div className="grid md:grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">
            {teamMembers.slice(0, 2).map((member, i) => (
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
            {teamMembers.slice(2, 5).map((member, i) => (
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

          {/* Third Row - 3 Members */}
          <div className="grid md:grid-cols-3 gap-12">
            {teamMembers.slice(5, 8).map((member, i) => (
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

      {/* Team Stats */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Our Global Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: '500+', label: 'Team Members Worldwide' },
              { stat: '52', label: 'Countries Represented' },
              { stat: '95%', label: 'Team Satisfaction Rate' },
              { stat: '20+', label: 'Years Avg Experience' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-blue mb-3">{item.stat}</div>
                <p className="text-gray-700 font-medium">{item.label}</p>
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
