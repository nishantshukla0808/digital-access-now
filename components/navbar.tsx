'use client'

import React from "react"
import Link from 'next/link'
import { Menu, X, ChevronDown, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  return (
    <nav style={{ background: '#0B1A1A' }} className="fixed w-full text-white z-50 shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center h-28">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center py-3">
              <img
                src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg"
                alt="Digital Access Now Logo"
                className="h-16 sm:h-18 lg:h-20 w-auto object-cover"
                style={{ mixBlendMode: 'screen' }}
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-1 flex-1 mx-4">
            {/* ABOUT Dropdown */}
            <div className="relative group">
              <button suppressHydrationWarning className="px-3 xl:px-4 py-2 rounded transition-all duration-300 flex items-center gap-1 text-base font-medium whitespace-nowrap hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.85)' }}>
                ABOUT <ChevronDown size={18} />
              </button>
              <div className="absolute left-0 mt-0 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-b-xl overflow-hidden shadow-xl" style={{ background: '#0B1A1A', borderTop: '2px solid #4DB7E5' }}>
                <Link href="/about" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>About Us</Link>
                <Link href="/about/why-digital-access-now" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Why Digital Access Now?</Link>
                <Link href="/about/our-team" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Our Team</Link>
                <Link href="/about/our-press" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Our Press</Link>
              </div>
            </div>

            <Link href="/volunteer" className="px-3 xl:px-4 py-2 rounded transition-all duration-300 text-base font-medium whitespace-nowrap hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              VOLUNTEER
            </Link>
            <Link href="/programs" className="px-3 xl:px-4 py-2 rounded transition-all duration-300 text-base font-medium whitespace-nowrap hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              PROGRAMS
            </Link>
            <Link href="/events" className="px-3 xl:px-4 py-2 rounded transition-all duration-300 text-base font-medium whitespace-nowrap hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              EVENTS
            </Link>

            {/* IMPACT Dropdown */}
            <div className="relative group">
              <button suppressHydrationWarning className="px-3 xl:px-4 py-2 rounded transition-all duration-300 flex items-center gap-1 text-base font-medium whitespace-nowrap hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.85)' }}>
                IMPACT <ChevronDown size={18} />
              </button>
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-b-xl overflow-hidden shadow-xl" style={{ background: '#0B1A1A', borderTop: '2px solid #4DB7E5' }}>
                <Link href="/impact/our-2025-report" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Our 2025 Report</Link>
                <Link href="/impact/our-impact" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Our Impact</Link>
                <Link href="/impact/our-theory-of-change" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Our Theory of Change</Link>
                <Link href="/impact/monitoring-evaluation" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Monitoring & Evaluation</Link>
                <Link href="/impact/recognition-for-impact" className="block px-4 py-3 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.75)' }}>Recognition for Impact</Link>
              </div>
            </div>

            {/* RESOURCES link hidden — page content preserved, re-enable when ready */}
            <Link href="/blog" className="px-3 xl:px-4 py-2 rounded transition-all duration-300 text-base font-medium whitespace-nowrap hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              BLOG
            </Link>
            <Link href="/contact-us" className="px-3 xl:px-4 py-2 rounded transition-all duration-300 text-base font-medium whitespace-nowrap hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              CONTACT US
            </Link>
          </div>

          {/* Right: Social Icons & Donate Button */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0 ml-auto">
            <a href="https://www.instagram.com/digitalaccessnow/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#4DB7E5')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <Instagram size={22} />
            </a>
            <a href="https://www.linkedin.com/company/digital-access-now/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#4DB7E5')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <Linkedin size={22} />
            </a>
            <a href="#" aria-label="YouTube"
              className="transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#4DB7E5')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              <Youtube size={22} />
            </a>
            <Link
              href="/donate"
              className="ml-2 px-6 xl:px-8 py-2.5 rounded-full font-bold text-base whitespace-nowrap text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              DONATE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded transition-all duration-300 ml-auto hover:text-[#4DB7E5]"
            aria-label="Toggle menu"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ background: '#0D1F1F', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="px-4 py-4 space-y-1">
            {/* Mobile ABOUT Dropdown */}
            <button
              onClick={() => handleDropdown('about')}
              className="w-full text-left px-4 py-3 rounded flex justify-between items-center text-sm font-medium transition-colors hover:text-[#4DB7E5]"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              ABOUT <ChevronDown size={16} className={openDropdown === 'about' ? 'rotate-180' : ''} />
            </button>
            {openDropdown === 'about' && (
              <div className="pl-4 space-y-1" style={{ borderLeft: '2px solid #4DB7E5' }}>
                <Link href="/about" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>About Us</Link>
                <Link href="/about/why-digital-access-now" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Why Digital Access Now?</Link>
                <Link href="/about/our-team" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Our Team</Link>
                <Link href="/about/our-press" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Our Press</Link>
              </div>
            )}

            <Link href="/volunteer" className="block px-4 py-3 rounded text-sm font-medium transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.8)' }}>VOLUNTEER</Link>
            <Link href="/programs" className="block px-4 py-3 rounded text-sm font-medium transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.8)' }}>PROGRAMS</Link>
            <Link href="/events" className="block px-4 py-3 rounded text-sm font-medium transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.8)' }}>EVENTS</Link>

            {/* Mobile IMPACT Dropdown */}
            <button
              onClick={() => handleDropdown('impact')}
              className="w-full text-left px-4 py-3 rounded flex justify-between items-center text-sm font-medium transition-colors hover:text-[#4DB7E5]"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              IMPACT <ChevronDown size={16} className={openDropdown === 'impact' ? 'rotate-180' : ''} />
            </button>
            {openDropdown === 'impact' && (
              <div className="pl-4 space-y-1" style={{ borderLeft: '2px solid #4DB7E5' }}>
                <Link href="/impact/our-2025-report" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Our 2025 Report</Link>
                <Link href="/impact/our-impact" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Our Impact</Link>
                <Link href="/impact/our-theory-of-change" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Our Theory of Change</Link>
                <Link href="/impact/monitoring-evaluation" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Monitoring & Evaluation</Link>
                <Link href="/impact/recognition-for-impact" className="block px-4 py-2 text-sm transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.65)' }}>Recognition for Impact</Link>
              </div>
            )}

            {/* RESOURCES link hidden — page content preserved, re-enable when ready */}
            <Link href="/blog" className="block px-4 py-3 rounded text-sm font-medium transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.8)' }}>BLOG</Link>
            <Link href="/contact-us" className="block px-4 py-3 rounded text-sm font-medium transition-colors hover:text-[#4DB7E5]" style={{ color: 'rgba(255,255,255,0.8)' }}>CONTACT US</Link>

            <div className="pt-4 flex gap-5 px-4 mb-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <a href="https://www.instagram.com/digitalaccessnow/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#4DB7E5')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              ><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/digital-access-now/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#4DB7E5')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              ><Linkedin size={20} /></a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#4DB7E5')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              ><Youtube size={20} /></a>
            </div>

            <Link
              href="/donate"
              className="block text-center text-white font-bold py-3 rounded-full transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
            >
              DONATE
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
