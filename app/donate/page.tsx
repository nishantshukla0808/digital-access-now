'use client';

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

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
      answer: 'Yes! All donations are tax deductible. Upon donation, you will receive a confirmation email with the necessary tax information. We provide all documentation needed for tax purposes.'
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section - Two Column Layout */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-center text-gray-900">
            Bridge the Digital Divide by Empowering<br />Communities to Access Technology
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Mission & Image */}
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://i.ibb.co/vxPNQ21P/IMG-0533.jpg"
                  alt="Digital Access Now Team"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              <div className="space-y-6 text-gray-700 text-lg">
                <div className="flex gap-3">
                  <span className="text-red-accent font-bold">•</span>
                  <p><strong>Empower 340,000+ lives</strong> to achieve digital equity and access essential online resources.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-accent font-bold">•</span>
                  <p><strong>Break barriers for underserved communities</strong> by providing devices, connectivity, and digital literacy training.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-accent font-bold">•</span>
                  <p><strong>Grow a high-impact, community-led movement</strong> with operations in 52 countries and partnerships with global organizations.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-accent font-bold">•</span>
                  <p><strong>Ensure economic status is never a barrier</strong> to participating in the digital economy.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Donation Widget */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                {/* Donation Type Toggle */}
                <div className="flex gap-3 mb-6">
                  <button
                    suppressHydrationWarning
                    onClick={() => setDonationType('one-time')}
                    className={`flex-1 py-3 px-6 rounded-full font-bold transition-all duration-300 ${
                      donationType === 'one-time'
                        ? 'bg-white border-2 border-red-accent text-red-accent'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    suppressHydrationWarning
                    onClick={() => setDonationType('monthly')}
                    className={`flex-1 py-3 px-6 rounded-full font-bold transition-all duration-300 ${
                      donationType === 'monthly'
                        ? 'bg-red-accent text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                </div>

                {donationType === 'monthly' && (
                  <div className="mb-6 p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm font-semibold text-blue-900">
                      Giving monthly has a greater impact
                    </p>
                  </div>
                )}

                {/* Preset Amount Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {donationAmounts.slice(0, 3).map((amount) => (
                    <button
                      suppressHydrationWarning
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount('')
                      }}
                      className={`py-4 px-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        selectedAmount === amount
                          ? 'bg-red-accent text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-accent hover:text-red-accent'
                      }`}
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
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount('')
                      }}
                      className={`py-4 px-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        selectedAmount === amount
                          ? 'bg-red-accent text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-accent hover:text-red-accent'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="mb-6">
                  <input
                    suppressHydrationWarning
                    type="number"
                    placeholder="$ Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                    className="w-full px-4 py-4 border-2 border-red-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-red-accent text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Donating in <strong>US Dollars</strong>
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold">
                    Apple Pay
                  </div>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold">
                    Google Pay
                  </div>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold">
                    VISA
                  </div>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold">
                    Mastercard
                  </div>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold">
                    Amex
                  </div>
                </div>suppressHydrationWarning 

                {/* Donate Button */}
                <button className="w-full bg-red-accent hover:bg-red-600 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-6">
                  Donate Now
                </button>

                <p className="text-xs text-gray-500 text-center italic">
                  Your donation supports digital literacy, device distribution, and outreach for community-led digital access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Donation Methods */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Other Ways to Give</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Check Donation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">✉️</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Donate by Check</h3>
                  <p className="text-gray-600 mb-4">
                    Make checks payable to <strong>Registration Nation</strong> and mail to:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm leading-relaxed text-gray-700">
                    <p className="font-semibold">Registration Nation</p>
                    <p>Fiscal Sponsor of Digital Access Now</p>
                    <p>Attn: Sophia Nelson</p>
                    <p>5883 Caribbean Blvd</p>
                    <p>West Palm Beach, FL 33407</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">🏦</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Bank Transfer (ACH)</h3>
                  <p className="text-gray-600 mb-4">
                    Transfer directly to Registration Nation:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2 text-gray-700">
                    <div>
                      <p className="font-semibold">Account Number:</p>
                      <p className="font-mono">#81058155</p>
                    </div>
                    <div>
                      <p className="font-semibold">Routing Number:</p>
                      <p className="font-mono">#026003379</p>
                    </div>
                    <div>
                      <p className="font-semibold">Bank:</p>
                      <p>Amalgamated Bank</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Documents */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold mb-3">Need Financial Documents?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We can provide donation receipts, financial statements, and tax documentation upon request.
            </p>
            <a 
              href="mailto:finance@digitalaccessnow.org" 
              className="inline-block bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300"
            >
              Request Documents
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-1">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-gray-200">
                <button
                  suppressHydrationWarning
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-0 py-6 flex items-center justify-between hover:text-red-accent transition-all duration-300 group"
                >
                  <h3 className="text-xl font-normal text-left text-gray-700 group-hover:text-red-accent transition-colors">
                    {item.question}
                  </h3>
                  <ChevronDown 
                    size={28} 
                    className={`transition-all duration-300 flex-shrink-0 text-gray-400 group-hover:text-red-accent ml-4 ${
                      expandedFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed text-lg">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center leading-relaxed">
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