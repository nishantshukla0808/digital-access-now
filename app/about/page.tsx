'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function About() {
  // Team members data from our-people page
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  
  // Update items per view based on window size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          setItemsPerView(1)
        } else if (window.innerWidth < 1024) {
          setItemsPerView(2)
        } else {
          setItemsPerView(3)
        }
      }
    }
    
    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])
  
  // Reset currentIndex when itemsPerView changes to avoid out of bounds
  useEffect(() => {
    const maxIdx = Math.max(0, teamMembers.length - itemsPerView)
    if (currentIndex > maxIdx) {
      setCurrentIndex(maxIdx)
    }
  }, [itemsPerView, currentIndex, teamMembers.length])
  
  const maxIndex = Math.max(0, teamMembers.length - itemsPerView)
  
  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient & Image Placeholders */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-linear-to-r from-primary-blue via-primary-purple to-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                ABOUT DIGITAL ACCESS NOW
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-lg text-pretty">
                Our story, mission, and the global movement we're building together
              </p>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4 h-64">
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">🌍</div>
                  <p className="text-sm">Global Reach</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">🤝</div>
                  <p className="text-sm">Partnerships</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">📚</div>
                  <p className="text-sm">Education</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">💡</div>
                  <p className="text-sm">Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
            OUR STORY
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Digital Access Now was founded on a simple yet powerful belief: everyone deserves access to digital tools and knowledge, regardless of where they live or their economic circumstances.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                What started as a small initiative has grown into a global movement of thousands of youth leaders, volunteers, and partners working together to bridge the digital divide.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we operate in 52 countries across 6 continents, directly reaching over 340,000 people with digital access and education initiatives.
              </p>
            </div>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center overflow-hidden">
              <Image 
                src="/images/whatsapp-20image-202026-02-01-20at-2022.jpeg"
                alt="Our Story"
                width={400}
                height={384}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">🎯</span> Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower communities worldwide by providing equitable access to digital tools, education, and opportunities, ensuring that digital equity becomes a reality for all.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-3xl">💡</span> Our Values
              </h3>
              <ul className="text-gray-700 space-y-3">
                <li>• <strong>Equity:</strong> Prioritizing underserved communities</li>
                <li>• <strong>Innovation:</strong> Leveraging technology for good</li>
                <li>• <strong>Collaboration:</strong> Working with partners globally</li>
                <li>• <strong>Empowerment:</strong> Building local leadership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Carousel */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            MEET OUR TEAM
          </h2>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white hover:bg-red-accent text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
                aria-label="Previous team members"
                suppressHydrationWarning
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            {currentIndex < maxIndex && (
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white hover:bg-red-accent text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
                aria-label="Next team members"
                suppressHydrationWarning
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Carousel Track */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
                }}
              >
                {teamMembers.map((member, i) => (
                  <div 
                    key={i} 
                    className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-4"
                  >
                    <div className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 py-4">
                      {/* Rounded Image Container - Exact same styling as our-people page */}
                      <div className="mb-6 flex justify-center">
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-linear-to-br from-primary-blue to-primary-purple flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-gray-200 group-hover:border-red-accent transition-all duration-300 group-hover:shadow-3xl">
                          <img 
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black mb-2 uppercase tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                        {member.name}
                      </h3>
                      <p className="text-red-accent font-bold text-base md:text-lg mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed px-2">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i 
                      ? 'bg-red-accent w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                  suppressHydrationWarning
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/about/our-people" className="inline-block bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              Meet Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            EXPLORE MORE
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Why Digital Access Now?', link: '/about/why-digital-access-now', icon: '❓' },
              { title: 'Our People', link: '/about/our-people', icon: '👥' },
              { title: 'Press & Media', link: '/about/our-press', icon: '📰' },
              { title: 'Careers', link: '/about/our-careers', icon: '💼' },
            ].map((item, i) => (
              <Link key={i} href={item.link}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
