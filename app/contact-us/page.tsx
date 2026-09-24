'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, MapPin, Instagram, Linkedin, Youtube, ArrowRight, Send, ChevronDown, ChevronUp } from 'lucide-react'

const CONTACT_REASONS = [
  'General Inquiry',
  'Partnership Opportunity',
  'Program Support',
  'Volunteer Information',
  'Donation Question',
  'Press / Media Inquiry',
  'Other',
]

const FAQS = [
  {
    q: 'How quickly do you respond to emails?',
    a: 'We aim to respond to all inquiries within 3–5 business days. For urgent matters, please indicate that in your subject line.',
  },
  {
    q: 'Can I partner with DAN for a program or event?',
    a: 'Absolutely. We welcome partnership proposals from nonprofits, educational institutions, corporations, and government bodies. Select "Partnership Opportunity" in the form above.',
  },
  {
    q: 'How do I apply for a volunteer or chapter role?',
    a: 'Visit the Volunteer or Programs page to find the right opportunity and apply directly through the linked forms.',
  },
  {
    q: 'Are you open to press and media inquiries?',
    a: 'Yes. We welcome journalists, researchers, and media professionals. Use the contact form and select "Press / Media Inquiry".',
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E7ECEF]">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left font-semibold text-lg hover:text-[#0F5D5E] transition-colors duration-200 focus:outline-none rounded"
        style={{ color: '#1F2933' }}
      >
        <span>{q}</span>
        <span className="ml-4 shrink-0" style={{ color: '#0F5D5E' }} aria-hidden="true">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {open && (
        <p className="pb-5 leading-relaxed text-base pr-8" style={{ color: '#1F2933', opacity: 0.75 }}>{a}</p>
      )}
    </div>
  )
}

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7', color: '#1F2933' }}>
      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
            Get in Touch
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4" style={{ color: '#0F5D5E' }}>
                Contact Us
              </h1>
              <p className="text-lg leading-relaxed max-w-prose" style={{ color: '#1F2933', opacity: 0.8 }}>
                Have a question, partnership idea, or want to get involved? We&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex md:justify-end">
              <a
                href="mailto:hello@digitalaccessnow.org"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm text-white transition-all duration-200 hover:opacity-90 shadow-md"
                style={{ background: '#0F5D5E' }}
              >
                hello@digitalaccessnow.org <ArrowRight size={15} />
              </a>
            </div>
          </div>
          <div className="mt-10 h-px" style={{ background: 'linear-gradient(to right, #4DB7E5, #0F5D5E, transparent)' }} />
        </div>
      </section>

      {/* ── 2. CONTACT INFO + FORM ────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left sidebar — contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1F2933' }}>
                  How to reach us
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: '#1F2933', opacity: 0.7 }}>
                  Whether you want to partner, volunteer, donate, or just learn more — we&apos;re here to help.
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#EAF7FC' }}>
                  <Mail size={20} strokeWidth={1.75} style={{ color: '#0F5D5E' }} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide mb-1" style={{ color: '#238C91' }}>Email</p>
                  <a
                    href="mailto:hello@digitalaccessnow.org"
                    className="text-base font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: '#0F5D5E' }}
                  >
                    hello@digitalaccessnow.org
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-start">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#EAF7FC' }}>
                  <MapPin size={20} strokeWidth={1.75} style={{ color: '#0F5D5E' }} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wide mb-1" style={{ color: '#238C91' }}>Based in</p>
                  <p className="text-base font-semibold" style={{ color: '#1F2933' }}>
                    Philadelphia, PA, USA
                  </p>
                  <p className="text-sm" style={{ color: '#1F2933', opacity: 0.6 }}>Operating globally across 5+ countries</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="font-bold text-sm uppercase tracking-wide mb-4" style={{ color: '#238C91' }}>Follow us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/digitalaccessnow/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    style={{ background: '#EAF7FC' }}
                    aria-label="Instagram"
                  >
                    <Instagram size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/digital-access-now/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    style={{ background: '#EAF7FC' }}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    style={{ background: '#EAF7FC' }}
                    aria-label="YouTube (coming soon)"
                  >
                    <Youtube size={18} strokeWidth={1.75} style={{ color: '#0F5D5E' }} />
                  </a>
                </div>
              </div>

            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl p-12 text-center" style={{ background: '#EAF7FC' }}>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: '#0F5D5E' }}
                  >
                    <Send size={28} strokeWidth={1.75} style={{ color: '#ffffff' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#0F5D5E' }}>Message sent!</h3>
                  <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.75 }}>
                    Thank you for reaching out. We&apos;ll get back to you within 3–5 business days.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-bold underline"
                    style={{ color: '#0F5D5E' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1F2933' }}>
                      Send us a message
                    </h2>
                    <p className="text-base" style={{ color: '#1F2933', opacity: 0.6 }}>
                      Fill out the form and we&apos;ll be in touch.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2933' }}>First Name *</label>
                      <input
                        type="text"
                        placeholder="Jane"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none transition-colors bg-white"
                        style={{ borderColor: '#E7ECEF', color: '#1F2933' }}
                        onFocus={e => (e.target.style.borderColor = '#0F5D5E')}
                        onBlur={e => (e.target.style.borderColor = '#E7ECEF')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2933' }}>Last Name *</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none transition-colors bg-white"
                        style={{ borderColor: '#E7ECEF', color: '#1F2933' }}
                        onFocus={e => (e.target.style.borderColor = '#0F5D5E')}
                        onBlur={e => (e.target.style.borderColor = '#E7ECEF')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2933' }}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="jane.doe@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none transition-colors bg-white"
                      style={{ borderColor: '#E7ECEF', color: '#1F2933' }}
                      onFocus={e => (e.target.style.borderColor = '#0F5D5E')}
                      onBlur={e => (e.target.style.borderColor = '#E7ECEF')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2933' }}>Subject *</label>
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none transition-colors bg-white appearance-none"
                      style={{ borderColor: '#E7ECEF', color: '#1F2933' }}
                      onFocus={e => (e.target.style.borderColor = '#0F5D5E')}
                      onBlur={e => (e.target.style.borderColor = '#E7ECEF')}
                    >
                      <option value="">Select a subject</option>
                      {CONTACT_REASONS.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2933' }}>Message *</label>
                    <textarea
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 text-base focus:outline-none transition-colors bg-white resize-none"
                      style={{ borderColor: '#E7ECEF', color: '#1F2933' }}
                      onFocus={e => (e.target.style.borderColor = '#0F5D5E')}
                      onBlur={e => (e.target.style.borderColor = '#E7ECEF')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-white text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                    style={{ background: '#0F5D5E' }}
                  >
                    Send Message <Send size={16} />
                  </button>

                  <p className="text-xs" style={{ color: '#1F2933', opacity: 0.5 }}>
                    Or email us directly at{' '}
                    <a href="mailto:hello@digitalaccessnow.org" className="underline" style={{ color: '#0F5D5E' }}>
                      hello@digitalaccessnow.org
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: '#1F2933' }}>
            Frequently asked questions
          </h2>
          <div>
            {FAQS.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0F5D5E' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Let&apos;s bridge the digital divide — together.
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you want to partner, volunteer, donate, or just learn more — we&apos;re ready to connect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:hello@digitalaccessnow.org"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{ background: '#ffffff', color: '#0F5D5E' }}
            >
              Email Us <ArrowRight size={16} />
            </a>
            <a
              href="https://www.instagram.com/digitalaccessnow/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-base transition-all duration-200 hover:opacity-90 border-2 border-white text-white"
            >
              Follow on Instagram <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
