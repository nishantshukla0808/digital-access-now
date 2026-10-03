'use client'

import Link from 'next/link'
import { Instagram, Linkedin, Mail } from 'lucide-react'

const NAV = [
  {
    heading: 'Organization',
    links: [
      { label: 'About DAN',          href: '/about' },
      { label: 'Why Digital Access', href: '/about/why-digital-access-now' },
      { label: 'Our Team',           href: '/about/our-team' },
      { label: 'Impact',             href: '/impact/our-impact' },
    ],
  },
  {
    heading: 'Work',
    links: [
      { label: 'Programs',     href: '/programs' },
      { label: 'Events',       href: '/events' },
      { label: 'Blog & Vlogs', href: '/blog' },
      { label: 'Volunteer',    href: '/volunteer' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Partner With Us', href: '/contact-us' },
      { label: 'Contact',         href: '/contact-us' },
    ],
  },
]

const SOCIAL = [
  {
    label: 'Email',
    href: 'mailto:hello@digitalaccessnow.org',
    icon: <Mail size={18} />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/digitalaccessnow/',
    icon: <Instagram size={18} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/digital-access-now/',
    icon: <Linkedin size={18} />,
  },
]

export function Footer() {
  return (
    <footer style={{ background: '#0B1A1A', color: '#FAFAF7' }}>

      {/* Top teal accent bar */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, #4DB7E5, #0F5D5E)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 32px 40px' }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', marginBottom: '56px' }}
          className="footer-grid"
        >

          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <img
              src="https://i.ibb.co/xKnvQK05/logo-DAN.jpg"
              alt="Digital Access Now"
              style={{ height: '90px', width: 'auto', objectFit: 'contain', marginBottom: '20px', mixBlendMode: 'screen' }}
            />
            <p style={{ fontSize: '13px', lineHeight: '1.75', color: 'rgba(250,250,247,0.55)', marginBottom: '24px', maxWidth: '240px' }}>
              Helping underserved young people gain technology access, build practical digital skills, and connect to opportunity.
            </p>
            {/* Official tagline per brief */}
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4DB7E5' }}>
              Access. Skills. Opportunity.
            </p>
          </div>

          {/* Nav columns */}
          {NAV.map(({ heading, links }) => (
            <div key={heading}>
              <p style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(250,250,247,0.85)',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                paddingBottom: '12px',
              }}>
                {heading}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{ fontSize: '14px', color: 'rgba(250,250,247,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#FAFAF7')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,250,247,0.55)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(250,250,247,0.30)' }}>
            © {new Date().getFullYear()} Digital Access Now, Inc. All rights reserved.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {SOCIAL.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                style={{ color: 'rgba(250,250,247,0.40)', transition: 'color 0.15s', display: 'flex' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#4DB7E5')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,250,247,0.40)')}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Responsive style override for mobile */}
      <style>{`
        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 639px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
