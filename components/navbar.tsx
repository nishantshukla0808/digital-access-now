'use client'

import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  return (
    <nav className="fixed w-full bg-footer-black text-white z-50 shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center h-28">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center py-3">
              <img 
                src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg" 
                alt="Digital Access Now Logo" 
                className="h-16 sm:h-18 lg:h-20 w-auto object-cover"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-1 flex-1 mx-4">
            {/* ABOUT Dropdown */}
            <div className="relative group">
              <button suppressHydrationWarning className="px-3 xl:px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300 flex items-center gap-1 text-base font-medium whitespace-nowrap">
                ABOUT <ChevronDown size={18} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-footer-black border-t-2 border-primary-blue opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/about" className="block px-4 py-3 hover:bg-gray-800">About Us</Link>
                <Link href="/about/why-digital-access-now" className="block px-4 py-3 hover:bg-gray-800">Why Digital Access Now?</Link>
                <Link href="/about/our-team" className="block px-4 py-3 hover:bg-gray-800">Our Team</Link>
                <Link href="/about/our-press" className="block px-4 py-3 hover:bg-gray-800">Our Press</Link>
              </div>
            </div>

            <Link href="/volunteer" className="px-3 xl:px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300 text-base font-medium whitespace-nowrap">
              VOLUNTEER
            </Link>
            <Link href="/programs" className="px-3 xl:px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300 text-base font-medium whitespace-nowrap">
              PROGRAMS
            </Link>
            <Link href="/events" className="px-3 xl:px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300 text-base font-medium whitespace-nowrap">
              EVENTS
            </Link>

            {/* IMPACT Dropdown */}
            <div className="relative group">
              <button suppressHydrationWarning className="px-3 xl:px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300 flex items-center gap-1 text-base font-medium whitespace-nowrap">
                IMPACT <ChevronDown size={18} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-footer-black border-t-2 border-primary-blue opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/impact/our-2025-report" className="block px-4 py-3 hover:bg-gray-800">Our 2025 Report</Link>
                <Link href="/impact/our-impact" className="block px-4 py-3 hover:bg-gray-800">Our Impact</Link>
                <Link href="/impact/our-theory-of-change" className="block px-4 py-3 hover:bg-gray-800">Our Theory of Change</Link>
                <Link href="/impact/monitoring-evaluation" className="block px-4 py-3 hover:bg-gray-800">Monitoring & Evaluation</Link>
                <Link href="/impact/recognition-for-impact" className="block px-4 py-3 hover:bg-gray-800">Recognition for Impact</Link>
              </div>
            </div>

            {/* RESOURCES link hidden — page content preserved, re-enable when ready */}
            <Link href="/blog" className="px-3 xl:px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300 text-base font-medium whitespace-nowrap">
              BLOG
            </Link>
            <Link href="/contact-us" className="px-3 xl:px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300 text-base font-medium whitespace-nowrap">
              CONTACT US
            </Link>
          </div>

          {/* Right: Social Icons & Donate Button */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0 ml-auto">
            <a href="https://www.instagram.com/digitalaccessnow/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue transition-all duration-300" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/digital-access-now/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue transition-all duration-300" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="#" className="hover:text-primary-blue transition-all duration-300" aria-label="YouTube">
              <Youtube size={24} />
            </a>
            <Link href="/donate" className="bg-primary-blue hover:bg-cyan-600 text-white px-6 xl:px-8 py-2.5 rounded-full font-bold transition-all duration-300 ml-2 text-base whitespace-nowrap">
              DONATE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-gray-800 rounded transition-all duration-300 ml-auto"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile ABOUT Dropdown */}
            <button
              onClick={() => handleDropdown('about')}
              className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded flex justify-between items-center"
            >
              ABOUT <ChevronDown size={16} className={openDropdown === 'about' ? 'rotate-180' : ''} />
            </button>
            {openDropdown === 'about' && (
              <div className="pl-4 space-y-2">
                <Link href="/about" className="block px-4 py-3 hover:bg-gray-800">About Us</Link>
                <Link href="/about/why-digital-access-now" className="block px-4 py-3 hover:bg-gray-800">Why Digital Access Now?</Link>
                <Link href="/about/our-team" className="block px-4 py-3 hover:bg-gray-800">Our Team</Link>
                <Link href="/about/our-press" className="block px-4 py-3 hover:bg-gray-800">Our Press</Link>
              </div>
            )}

            <Link href="/volunteer" className="block px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300">
              VOLUNTEER
            </Link>
            <Link href="/programs" className="block px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300">
              PROGRAMS
            </Link>
            <Link href="/events" className="block px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300">
              EVENTS
            </Link>

            {/* Mobile IMPACT Dropdown */}
            <button
              onClick={() => handleDropdown('impact')}
              className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded flex justify-between items-center"
            >
              IMPACT <ChevronDown size={16} className={openDropdown === 'impact' ? 'rotate-180' : ''} />
            </button>
            {openDropdown === 'impact' && (
              <div className="pl-4 space-y-2">
                <Link href="/impact/our-2025-report" className="block px-4 py-3 hover:bg-gray-800">Our 2025 Report</Link>
                <Link href="/impact/our-impact" className="block px-4 py-3 hover:bg-gray-800">Our Impact</Link>
                <Link href="/impact/our-theory-of-change" className="block px-4 py-3 hover:bg-gray-800">Our Theory of Change</Link>
                <Link href="/impact/monitoring-evaluation" className="block px-4 py-3 hover:bg-gray-800">Monitoring & Evaluation</Link>
                <Link href="/impact/recognition-for-impact" className="block px-4 py-3 hover:bg-gray-800">Recognition for Impact</Link>
              </div>
            )}

            {/* RESOURCES link hidden — page content preserved, re-enable when ready */}
            <Link href="/blog" className="block px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300">
              BLOG
            </Link>
            <Link href="/contact-us" className="block px-4 py-2 hover:bg-gray-800 rounded transition-all duration-300">
              CONTACT US
            </Link>

            <div className="pt-4 border-t border-gray-800 flex gap-4 mb-4">
              <a href="#" className="hover:text-primary-blue transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-blue transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary-blue transition-all duration-300">
                <Youtube size={20} />
              </a>
            </div>

            <Link href="/donate" className="w-full bg-primary-blue hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 block text-center">
              DONATE
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
