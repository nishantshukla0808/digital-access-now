'use client';

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Donate() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null)
  const [donationType, setDonationType] = React.useState<'one-time' | 'monthly'>('one-time')
  const [selectedAmount, setSelectedAmount] = React.useState<number | null>(null)
  const [customAmount, setCustomAmount] = React.useState('')

  const donationAmounts = [100, 50, 25, 15, 10]

  const faqItems = [
    {
      question: 'How will my donation be used?',
      answer: 'Your donation directly supports our global network providing digital access to underserved communities. It funds digital literacy programs, infrastructure development, youth leadership training, and community education initiatives. Every dollar helps empower individuals worldwide.'
    },
    {
      question: 'Is my donation tax deductible?',
      answer: 'Yes. All donations are tax deductible. Upon donation, you will receive a confirmation email with the necessary tax information. We provide all documentation needed for tax purposes.'
    },
    {
      question: 'How do I send donations?',
      answer: 'Digital Access Now is fiscally sponsored by Registration Nation, a registered 501(c)(3) organization. You can donate online via credit/debit card, by check, or via ACH transfer. Visit our online donation portal for quick and secure donations.'
    },
    {
      question: 'What is our Legal Status?',
      answer: 'Digital Access Now is fiscally sponsored by Registration Nation, a registered 501(c)(3) organization, Tax ID (EIN) 87-3891341. This ensures all donations are tax-deductible and properly managed.'
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF7' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24" style={{ background: '#FAFAF7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-5 rounded-full" style={{ background: '#4DB7E5' }} />
            <p className="text-xs font-black tracking-widest uppercase" style={{ color: '#4DB7E5' }}>Support Our Mission</p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center leading-tight" style={{ color: '#1F2933' }}>
            Bridge the Digital Divide.<br />
            <span style={{ color: '#0F5D5E' }}>Empower Communities.</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column — Mission & Image */}
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://i.ibb.co/vxPNQ21P/IMG-0533.jpg"
                  alt="Digital Access Now Team"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              <div className="space-y-5">
                {[
                  { bold: 'Empower 340,000+ lives', text: ' to achieve digital equity and access essential online resources.' },
                  { bold: 'Break barriers for underserved communities', text: ' by providing devices, connectivity, and digital literacy training.' },
                  { bold: 'Grow a high-impact, community-led movement', text: ' with operations across 5 pilot countries and global partnerships.' },
                  { bold: 'Ensure economic status is never a barrier', text: ' to participating in the digital economy.' },
                ].map(({ bold, text }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: '#4DB7E5' }} />
                    <p className="text-base leading-relaxed" style={{ color: '#1F2933', opacity: 0.8 }}>
                      <strong style={{ color: '#0F5D5E' }}>{bold}</strong>{text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Donation Widget */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-white rounded-2xl shadow-xl p-8 border" style={{ borderColor: 'rgba(15,93,94,0.12)' }}>

                {/* Donation Type Toggle */}
                <div className="flex gap-3 mb-6">
                  <button
                    suppressHydrationWarning
                    onClick={() => setDonationType('one-time')}
                    className="flex-1 py-3 px-6 rounded-full font-bold transition-all duration-200 text-sm"
                    style={donationType === 'one-time'
                      ? { background: 'white', border: '2px solid #0F5D5E', color: '#0F5D5E' }
                      : { background: '#f5f5f0', border: '2px solid transparent', color: '#6b7280' }}
                  >
                    One-time
                  </button>
                  <button
                    suppressHydrationWarning
                    onClick={() => setDonationType('monthly')}
                    className="flex-1 py-3 px-6 rounded-full font-bold transition-all duration-200 text-sm"
                    style={donationType === 'monthly'
                      ? { background: '#0F5D5E', color: 'white', border: '2px solid #0F5D5E' }
                      : { background: '#f5f5f0', border: '2px solid transparent', color: '#6b7280' }}
                  >
                    Monthly
                  </button>
                </div>

                {donationType === 'monthly' && (
                  <div className="mb-6 p-3 rounded-lg text-center" style={{ background: 'rgba(15,93,94,0.06)' }}>
                    <p className="text-sm font-semibold" style={{ color: '#0F5D5E' }}>
                      Giving monthly has a greater long-term impact
                    </p>
                  </div>
                )}

                {/* Preset Amount Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {donationAmounts.slice(0, 3).map((amount) => (
                    <button
                      suppressHydrationWarning
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount('') }}
                      className="py-4 px-4 rounded-xl font-bold text-lg transition-all duration-200"
                      style={selectedAmount === amount
                        ? { background: '#0F5D5E', color: 'white', transform: 'scale(1.05)', boxShadow: '0 4px 16px rgba(15,93,94,0.3)' }
                        : { background: 'white', border: '2px solid #e5e7eb', color: '#1F2933' }}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {donationAmounts.slice(3, 5).map((amount) => (
                    <button
                      suppressHydrationWarning
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount('') }}
                      className="py-4 px-4 rounded-xl font-bold text-lg transition-all duration-200"
                      style={selectedAmount === amount
                        ? { background: '#0F5D5E', color: 'white', transform: 'scale(1.05)', boxShadow: '0 4px 16px rgba(15,93,94,0.3)' }
                        : { background: 'white', border: '2px solid #e5e7eb', color: '#1F2933' }}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <input
                    suppressHydrationWarning
                    type="number"
                    placeholder="$ Enter custom amount"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null) }}
                    className="w-full px-4 py-4 rounded-xl text-lg focus:outline-none transition-all"
                    style={{ border: '2px solid #0F5D5E', color: '#1F2933' }}
                  />
                  <p className="text-xs text-gray-400 mt-2 text-center">Donating in <strong>US Dollars</strong></p>
                </div>

                {/* Payment Methods */}
                <div className="flex justify-center gap-2 mb-6 flex-wrap">
                  {['Apple Pay', 'Google Pay', 'VISA', 'Mastercard', 'Amex'].map(m => (
                    <div key={m} className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-gray-500" style={{ background: '#f9fafb', borderColor: '#e5e7eb' }}>
                      {m}
                    </div>
                  ))}
                </div>

                {/* Donate Button */}
                <button
                  className="w-full text-white py-4 rounded-full font-bold text-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 shadow-lg mb-5"
                  style={{ background: 'linear-gradient(135deg, #0F5D5E, #238C91)' }}
                >
                  Donate Now
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Your donation supports digital literacy, device distribution, and outreach for community-led digital access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: '#1F2933' }}>
            Frequently Asked Questions
          </h2>
          <div className="divide-y" style={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
            {faqItems.map((item, i) => (
              <div key={i}>
                <button
                  suppressHydrationWarning
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-0 py-6 flex items-center justify-between text-left group"
                >
                  <h3 className="text-base font-semibold pr-6 transition-colors group-hover:text-[#0F5D5E]" style={{ color: '#1F2933' }}>
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-all duration-300 ${expandedFaq === i ? 'rotate-180' : ''}`}
                    style={{ color: '#0F5D5E' }}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="pb-6">
                    <p className="leading-relaxed text-sm" style={{ color: '#1F2933', opacity: 0.75 }}>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="py-12" style={{ background: '#FAFAF7' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-center leading-relaxed" style={{ color: '#1F2933', opacity: 0.45 }}>
            Digital Access Now is fiscally sponsored by <strong>Registration Nation</strong>, a registered 501(c)(3) organization,
            Tax ID (EIN) 87-3891341. All donations are tax-deductible to the extent permitted by law.
            Thank you for your support in bridging the digital divide.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}