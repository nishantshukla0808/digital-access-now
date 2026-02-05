'use client';

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Donate() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null)

  const faqItems = [
    {
      question: 'How can I donate to Digital Access Now?',
      answer: 'Digital Access Now is fiscally sponsored by Registration Nation, a registered 501(c)(3) organization. You can donate online via credit/debit card, by check, or via ACH transfer. Visit our online donation portal for quick and secure donations.'
    },
    {
      question: 'What is Digital Access Now\'s legal status?',
      answer: 'Digital Access Now is fiscally sponsored by Registration Nation, a registered 501(c)(3) organization, Tax ID (EIN) 87-3891341. This ensures all donations are tax-deductible and properly managed.'
    },
    {
      question: 'Is my donation tax deductible?',
      answer: 'Yes! All donations are tax deductible. Upon donation, you will receive a confirmation email with the necessary tax information. We provide all documentation needed for tax purposes.'
    },
    {
      question: 'How will my donation be used?',
      answer: 'Your donation directly supports our global network providing digital access to underserved communities. It funds digital literacy programs, infrastructure development, youth leadership training, and community education initiatives. Every dollar helps empower individuals worldwide.'
    },
    {
      question: 'Can I sponsor a specific project or initiative?',
      answer: 'Yes! If you\'re interested in funding a specific project, such as regional digital access initiatives, youth programs, or technology infrastructure, please contact us at support@digitalaccessnow.org to discuss partnership and sponsorship opportunities.'
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-primary-blue via-primary-purple to-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            Support Our Work
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl text-pretty">
            Your donation empowers communities worldwide with digital access and opportunity
          </p>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">WAYS TO DONATE</h2>
          
          <div className="space-y-8">
            {/* Online Donation */}
            <div className="border-2 border-light-gray rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💳</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Online Donation</h3>
                  <p className="text-gray-700 mb-4">
                    Donate with credit/debit card through our secure online donation portal. Quick, safe, and convenient.
                  </p>
                  <button className="bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
                    Donate Online
                  </button>
                </div>
              </div>
            </div>

            {/* Check Donation */}
            <div className="border-2 border-light-gray rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl">✉️</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Check (Tax-Deductible)</h3>
                  <p className="text-gray-700 mb-4">
                    Make checks payable to Registration Nation and mail to:
                  </p>
                  <div className="bg-light-gray p-4 rounded-lg mb-4 font-mono text-sm">
                    <p>Registration Nation</p>
                    <p>Fiscal Sponsor of Digital Access Now</p>
                    <p>Sophia Nelson</p>
                    <p>5883 Caribbean Blvd</p>
                    <p>West Palm Beach, FL 33407</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACH Transfer */}
            <div className="border-2 border-light-gray rounded-lg p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏦</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">ACH Transfer (Tax-Deductible)</h3>
                  <p className="text-gray-700 mb-4">
                    Send your donation directly to Registration Nation via ACH transfer:
                  </p>
                  <div className="bg-light-gray p-4 rounded-lg font-mono text-sm space-y-2">
                    <div>
                      <p className="font-bold">Account Number:</p>
                      <p>#81058155</p>
                    </div>
                    <div>
                      <p className="font-bold">Routing Number:</p>
                      <p>#026003379</p>
                    </div>
                    <div>
                      <p className="font-bold">Bank:</p>
                      <p>Amalgamated Bank</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Merchandise Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">BUY OUR MERCHANDISE</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-6xl">
                👕
              </div>
              <h3 className="text-xl font-bold mb-2">T-Shirts & Apparel</h3>
              <p className="text-gray-700 mb-4">Support our mission with official Digital Access Now merchandise.</p>
              <button className="text-red-accent font-bold hover:text-red-600 transition-all duration-300">
                Shop Now →
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-6xl">
                🎁
              </div>
              <h3 className="text-xl font-bold mb-2">Gift Items</h3>
              <p className="text-gray-700 mb-4">Unique gifts that support digital equity worldwide.</p>
              <button className="text-red-accent font-bold hover:text-red-600 transition-all duration-300">
                Shop Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Request Financial Documents */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-light-gray p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">REQUEST FINANCIAL DOCUMENTS</h2>
            <p className="text-gray-700 mb-6">
              Need documentation of your donation for tax purposes or other financial records? We can provide verification and financial statements upon request.
            </p>
            <a href="mailto:finance@digitalaccessnow.org" className="inline-block bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
              Request Documents
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-light-gray transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-left">{item.question}</h3>
                  <ChevronDown 
                    size={24} 
                    className={`transition-all duration-300 flex-shrink-0 ${expandedFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 py-4 bg-light-gray border-t border-border-gray">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-blue to-primary-purple text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">THANK YOU FOR YOUR SUPPORT</h2>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Your generosity makes a real difference in bridging the digital divide and empowering communities worldwide. Together, we're creating a more equitable digital future.
          </p>
          <button className="bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300">
            Donate Now
          </button>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 text-center">
            Digital Access Now is fiscally sponsored by Registration Nation, a registered 501(c)(3) organization, Tax ID (EIN) 87-3891341. All donations are tax-deductible to the extent permitted by law.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
