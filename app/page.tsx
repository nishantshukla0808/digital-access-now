'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChaptersMap } from '@/components/chapters-map'
import { ArrowRight, ChevronLeft, ChevronRight, Instagram, Linkedin, Youtube } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />



      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Partners Section */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl md:text-2xl font-bold text-gray-700 mb-16 tracking-wide uppercase">
            IN COLLABORATION WITH
          </h2>
          
          <div className="space-y-16">
            {/* Corporate & Government Partners */}
            <div>
              <h3 className="text-center text-sm font-semibold text-gray-500 mb-8 uppercase tracking-wide">
                Corporate & Government Partners
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center max-w-6xl mx-auto">
                <img 
                  src="https://i.ibb.co/DHrcwKzv/image.png"
                  alt="Apple"
                  className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <img 
                  src="https://i.ibb.co/8DWNf084/image.png"
                  alt="Microsoft"
                  className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <img 
                  src="https://i.ibb.co/ynh0YHm5/image.png"
                  alt="City of Philadelphia"
                  className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="text-gray-400 text-sm text-center">PA State Govt</div>
              </div>
            </div>
            
            {/* NGO/Nonprofit Partners */}
            <div>
              <h3 className="text-center text-sm font-semibold text-gray-500 mb-8 uppercase tracking-wide">
                NGO/Nonprofit Partners
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center max-w-6xl mx-auto">
                <img 
                  src="https://i.ibb.co/0VrvwdF9/image.png"
                  alt="Power Up Tech"
                  className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <img 
                  src="https://i.ibb.co/399xsYCM/image.png"
                  alt="Rotary International"
                  className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <img 
                  src="https://i.ibb.co/jvg811Lv/image.png"
                  alt="Moinee"
                  className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
                <img 
                  src="https://i.ibb.co/hxwrXfZj/image.png"
                  alt="Zonta"
                  className="h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">1000+</div>
              <p className="text-lg md:text-xl font-medium">Laptops Distributed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">100+</div>
              <p className="text-lg md:text-xl font-medium">Student Kits</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">5</div>
              <p className="text-lg md:text-xl font-medium">Countries Reached</p>
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
              <Link href="/about" className="inline-block mt-8 bg-primary-blue hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
                Learn More About Us
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Chapters Map</h3>
              <ChaptersMap />
              <p className="text-sm text-gray-600 text-center">
                Our chapters in 4 countries bringing digital access to communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-16 md:py-24 bg-[#f7fbfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative w-full overflow-hidden rounded-2xl border border-primary-blue/20 bg-white shadow-xl">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/L92pl5a5Cho"
                  title="Digital Access Now featured video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">Featured Video</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Student workshop spotlight
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A look inside a Digital Access Now student workshop where learners build real-world digital skills, gain confidence, and connect with mentors in their community.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="https://www.youtube.com/watch?v=L92pl5a5Cho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-blue px-6 py-3 text-sm font-bold text-white hover:bg-cyan-600 transition-all duration-300"
                >
                  Watch on YouTube <ArrowRight size={16} />
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-blue/30 px-6 py-3 text-sm font-bold text-primary-blue hover:bg-primary-blue/10 transition-all duration-300"
                >
                  More blogs and vlogs
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Want more stories? Visit the Blog & Vlogs page for the full library.
              </p>
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
                <Link href="/impact/our-impact" className="text-primary-blue font-bold hover:text-cyan-600 transition-all duration-300 inline-flex items-center gap-2">
                  Read Story <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Highlights Gallery */}
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

          {/* Bento Grid — col 1 tall (Forbes), cols 2-3 stacked pairs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{gridTemplateRows: '420px 420px'}}>

            {/* Image 3 — Forbes 30u30 — tall left card spanning 2 rows */}
            <div className="md:row-span-2 relative rounded-2xl overflow-hidden group cursor-default">
              <img src="https://i.ibb.co/QvVVTZFz/Whats-App-Image-2026-04-26-at-23-05-28-Picsart-Ai-Image-Enhancer.jpg" alt="Forbes 30 Under 30 Summit" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 21, 2026</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-primary-blue text-xs font-bold uppercase tracking-wide mb-1">Forbes 30 Under 30</p>
                <p className="text-white font-semibold text-base leading-snug">Ritika represented Digital Access Now at the Forbes 30 Under 30 Summit</p>
              </div>
            </div>

            {/* Image 1 — Wharton Biotech — top middle */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default">
              <img src="https://i.ibb.co/BKrhF3Vm/Whats-App-Image-2026-04-26-at-23-02-53-Picsart-Ai-Image-Enhancer.jpg" alt="Wharton Biotech Conference" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 25, 2026</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">Networking at the Wharton Biotech Conference for Digital Access Now</p></div>
            </div>

            {/* Image 2 — Penn Biotech Dinner — top right */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default">
              <img src="https://i.ibb.co/0VFTb5hQ/Whats-App-Image-2026-04-26-at-23-03-09-Picsart-Ai-Image-Enhancer.jpg" alt="Penn Biotech 25th Anniversary" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 25, 2026</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">DAN attended Penn Biotech Group's 25th anniversary dinner at UPenn</p></div>
            </div>

            {/* Image 4 — Mask Ball — bottom middle */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default">
              <img src="https://i.ibb.co/TDmJc0pb/Whats-App-Image-2026-04-26-at-23-07-12-Picsart-Ai-Image-Enhancer.jpg" alt="Mask Ball NYC" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 10, 2026</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">Invited to the Mask Ball event at International House NYC</p></div>
            </div>

            {/* Image 5 — Ambassador Chris Lu — bottom right */}
            <div className="relative rounded-2xl overflow-hidden group cursor-default">
              <img src="https://i.ibb.co/Df08rPMw/Whats-App-Image-2026-04-26-at-23-08-23-Picsart-Ai-Image-Enhancer.jpg" alt="Meeting Ambassador Chris Lu" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4"><span className="text-xs font-bold text-white bg-primary-blue px-3 py-1 rounded-full">Apr 8, 2026</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-semibold text-sm leading-snug">Ritika met Ambassador Chris Lu at the Rotary Club</p></div>
            </div>
          </div>


          {/* Image 8 — wide landscape card below */}
          <div className="mt-4 relative rounded-2xl overflow-hidden h-96 group cursor-default">
            <img src="https://i.ibb.co/nsdwW0rq/Whats-App-Image-2026-04-26-at-23-50-15-Picsart-Ai-Image-Enhancer.jpg" alt="Community engagement" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{objectPosition: 'center 30%'}} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-semibold text-base md:text-lg max-w-xl">Community engagement and local partnerships — advancing digital equity at the grassroots level</p>
            </div>
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
                <button suppressHydrationWarning className="bg-primary-blue hover:bg-cyan-600 text-white px-6 py-2 rounded-full font-bold transition-all duration-300">
                  {cta.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section className="py-16 md:py-24 bg-linear-to-r from-primary-blue to-primary-purple text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Follow Our Journey
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Stay connected with Digital Access Now on social media for the latest updates, 
            stories, and opportunities to get involved.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="https://www.instagram.com/digitalaccessnow/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div className="mb-4 flex justify-center">
                <Instagram size={56} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Instagram</h3>
              <p className="text-white/80 mb-4">Follow our daily updates</p>
              <span className="text-white font-bold">@digitalaccessnow</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/company/digital-access-now/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div className="mb-4 flex justify-center">
                <Linkedin size={56} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-2">LinkedIn</h3>
              <p className="text-white/80 mb-4">Connect professionally</p>
              <span className="text-white font-bold">Digital Access Now</span>
            </a>
            
            <a 
              href="#" 
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 border border-white/20"
            >
              <div className="mb-4 flex justify-center">
                <Youtube size={56} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-2">YouTube</h3>
              <p className="text-white/80 mb-4">Watch our impact stories</p>
              <span className="text-white font-bold">Coming Soon</span>
            </a>
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
      image: 'https://i.ibb.co/Kp60vPFj/Whats-App-Image-2026-04-26-at-23-50-33-Picsart-Ai-Image-Enhancer.jpg',
      title: 'Driving Conversations on Digital Equity',
      subtitle: 'Presenting at conferences and summits to advocate for universal access'
    },
    {
      image: 'https://i.ibb.co/NgjX72yS/Screenshot-2026-01-22-at-7-16-54-PM.png',
      title: 'Digital Education',
      subtitle: 'Empowering students with essential tech skills'
    },
    {
      image: 'https://i.ibb.co/kVPWnj1Z/498172294-122095796942883922-3614581082728561584-n-Picsart-Ai-Image-Enhancer.jpg',
      title: 'Building Digital Literacy',
      subtitle: 'Creating engaging learning environments for all'
    },
    {
      image: 'https://i.ibb.co/27763Nj9/0b847d86-98de-4dce-a1f1-446394011ce7-Picsart-Ai-Image-Enhancer.jpg',
      title: 'Global Impact & Recognition',
      subtitle: 'Representing youth voices on the world stage'
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
    <section className="pt-28 md:pt-28 -mt-px relative">
      <div className="w-full h-100 md:h-125 lg:h-150 overflow-hidden relative">
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
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/30" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-4" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.5)' }}>
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-center mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                {slide.subtitle}
              </p>
              <div className="flex gap-4">
                <Link href="/volunteer" className="bg-primary-blue hover:bg-cyan-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
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
