'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-footer-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg" 
                alt="Digital Access Now Logo" 
                className="h-16 w-auto object-cover"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering communities by bridging the digital divide through access, education, and opportunity.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-red-accent transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-red-accent transition-colors">About</Link></li>
              <li><Link href="/programs" className="hover:text-red-accent transition-colors">Programs</Link></li>
              <li><Link href="/volunteer" className="hover:text-red-accent transition-colors">Volunteer</Link></li>
              <li><Link href="/services" className="hover:text-red-accent transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">CONTACT</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex gap-2">
                <Mail size={18} className="text-red-accent flex-shrink-0 mt-0.5" />
                <a href="mailto:info@digitalaccessnow.org" className="hover:text-red-accent transition-colors">
                  info@digitalaccessnow.org
                </a>
              </div>
              <div className="flex gap-2">
                <Phone size={18} className="text-red-accent flex-shrink-0 mt-0.5" />
                <a href="tel:+1234567890" className="hover:text-red-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex gap-2">
                <MapPin size={18} className="text-red-accent flex-shrink-0 mt-0.5" />
                <address className="not-italic">
                  123 Digital Street<br />
                  Tech City, TC 12345<br />
                  USA
                </address>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">NEWSLETTER</h4>
            <p className="text-gray-300 text-sm mb-4">
              Stay updated with our latest news and opportunities.
            </p>
            <div className="flex flex-col gap-2">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-red-accent focus:outline-none transition-colors"
              />
              <button suppressHydrationWarning className="bg-red-accent hover:bg-red-600 text-white px-4 py-2 rounded font-bold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © 2026 Digital Access Now. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-red-accent transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/digitalaccessnow/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-accent transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/digital-access-now/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-accent transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-accent transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
