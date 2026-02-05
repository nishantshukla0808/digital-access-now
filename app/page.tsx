'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Partners Section */}
      <section className="py-12 md:py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm md:text-base font-bold text-gray-600 mb-8 tracking-wider">
            IN PARTNERSHIP WITH
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  Partner {i}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">245</div>
              <p className="text-lg md:text-xl font-medium">Communities Reached</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">89K+</div>
              <p className="text-lg md:text-xl font-medium">Digital Access Provided</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">52</div>
              <p className="text-lg md:text-xl font-medium">Countries Active</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">340K</div>
              <p className="text-lg md:text-xl font-medium">People Empowered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Digital Access Now is one of the world's largest digital equity organizations. We break barriers to digital access so every community can thrive.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Imagine a world where everyone has the digital tools and knowledge to succeed.</strong> Through our programs, we train youth leaders, connect communities, and advocate for digital equity at the global level.
              </p>
              <Link href="/about" className="inline-block mt-8 bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
                Learn More About Us
              </Link>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🗺️</div>
                <p>Impact Map Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Stories */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Program Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Building Digital Literacy in South Asia',
                description: 'Our programs trained 500+ youth leaders who now provide digital skills training to their communities.',
                icon: '📚',
              },
              {
                title: 'Connectivity for Remote Communities',
                description: 'Bringing internet access and devices to underserved regions, enabling educational opportunities.',
                icon: '🌐',
              },
              {
                title: 'Youth Leadership in Digital Advocacy',
                description: 'Young leaders advocate for digital equity policies at national and international levels.',
                icon: '🚀',
              },
            ].map((story, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl mb-4">{story.icon}</div>
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                <p className="text-gray-600 mb-6">{story.description}</p>
                <Link href="/impact/our-impact" className="text-red-accent font-bold hover:text-red-600 transition-all duration-300 inline-flex items-center gap-2">
                  Read Story <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            News
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { date: 'Jan 19, 2026', title: 'Digital Access Framework Released', image: '📋' },
              { date: 'Dec 1, 2025', title: 'Five Years of Impact Milestone', image: '🎉' },
              { date: 'Aug 12, 2025', title: 'New Partnership Announced', image: '🤝' },
              { date: 'Aug 4, 2025', title: 'New Executive Leadership', image: '👤' },
            ].map((news, i) => (
              <div key={i} className="bg-white border border-border-gray rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-40 bg-gray-100 flex items-center justify-center text-5xl">
                  {news.image}
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                  <h3 className="font-bold text-lg mb-4">{news.title}</h3>
                  <Link href="#" className="text-red-accent font-bold hover:text-red-600 transition-all duration-300 flex items-center gap-2">
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Donate', description: 'Support digital equity initiatives', action: 'Make an Impact' },
              { title: 'Join Programs', description: 'Become part of the movement', action: 'Get Involved' },
              { title: 'Stay Updated', description: 'Follow our latest updates', action: 'Subscribe' },
            ].map((cta, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3">{cta.title}</h3>
                <p className="text-gray-600 mb-6">{cta.description}</p>
                <button suppressHydrationWarning className="bg-red-accent hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-all duration-300">
                  {cta.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 md:py-24 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Follow Our Journey
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Stay connected with Digital Access Now on social media for the latest news, stories, and opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { platform: 'Instagram', icon: '📷', posts: '2.4K' },
              { platform: 'LinkedIn', icon: '💼', posts: '1.8K' },
              { platform: 'YouTube', icon: '▶️', posts: '450+' },
            ].map((social, i) => (
              <div key={i} className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
                <div className="text-4xl mb-3">{social.icon}</div>
                <h3 className="text-xl font-bold mb-2">{social.platform}</h3>
                <p className="text-gray-200">{social.posts} followers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Hero Carousel Component
function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  
  const slides = [
    {
      image: 'https://i.ibb.co/vxPNQ21P/IMG-0533.jpg',
      title: 'Bridging the Digital Divide Worldwide',
      subtitle: 'Provide Digital Access to underserved communities Globally'
    },
    {
      image: 'https://i.ibb.co/NgjX72yS/Screenshot-2026-01-22-at-7-16-54-PM.png',
      title: 'Digital Education',
      subtitle: 'Empowering students with essential tech skills'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Mark component as mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-advance carousel only after mount
  useEffect(() => {
    if (!isMounted) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide, isMounted, slides.length])

  return (
    <section className="pt-20 md:pt-24 relative">
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden relative">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-4" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.5)' }}>
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-center mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {slide.subtitle}
              </p>
              <div className="flex gap-4">
                <Link href="/volunteer" className="bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
                  Get Involved
                </Link>
                <Link href="/about" className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
          aria-label="Previous slide"
          suppressHydrationWarning
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
          aria-label="Next slide"
          suppressHydrationWarning
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              suppressHydrationWarning
            />
          ))}
        </div>
      </div>
    </section>
  )
}
