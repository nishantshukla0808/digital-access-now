import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, Phone, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-red-accent via-primary-purple to-primary-blue text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">
            CONNECT
          </div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">
            REACH OUT
          </div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">
            GET IN TOUCH
          </div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">
            LET'S TALK
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            CONTACT US
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Have questions? Want to partner with us? We'd love to hear from you. 
            Get in touch and let's bridge the digital divide together.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Email Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-red-accent">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-accent/10 p-4 rounded-full">
                  <Mail className="text-red-accent" size={32} />
                </div>
                <h3 className="text-2xl font-bold">Email Us</h3>
              </div>
              <p className="text-gray-600 mb-4">Send us an email anytime!</p>
              <a 
                href="mailto:hello@digitalaccessnow.org" 
                className="text-red-accent hover:text-red-600 font-bold text-lg transition-colors inline-flex items-center gap-2"
              >
                hello@digitalaccessnow.org
                <span>→</span>
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-primary-blue">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary-blue/10 p-4 rounded-full">
                  <Phone className="text-primary-blue" size={32} />
                </div>
                <h3 className="text-2xl font-bold">Call Us</h3>
              </div>
              <p className="text-gray-600 mb-4">We'd love to hear from you!</p>
              <a 
                href="tel:+14076195503" 
                className="text-primary-blue hover:text-blue-600 font-bold text-lg transition-colors inline-flex items-center gap-2"
              >
                +1 (407) 619-5503
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you as soon as possible</p>
          </div>

          <form className="bg-gray-50 p-8 md:p-12 rounded-2xl shadow-xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-accent transition-colors bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-accent transition-colors bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-accent transition-colors bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-accent transition-colors bg-white">
                <option>Select a subject</option>
                <option>General Inquiry</option>
                <option>Partnership Opportunity</option>
                <option>Program Support</option>
                <option>Volunteer Information</option>
                <option>Donation Question</option>
                <option>Press/Media Inquiry</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
              <textarea
                placeholder="Tell us how we can help you..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-accent transition-colors bg-white resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-accent hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Send Message
            </button>

            <p className="text-sm text-gray-500 text-center">
              Send your message to <a href="mailto:hello@digitalaccessnow.org" className="text-red-accent hover:text-red-600 font-semibold">hello@digitalaccessnow.org</a>
            </p>
          </form>
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
