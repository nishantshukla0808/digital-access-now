import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-footer-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            CONTACT US
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with Digital Access Now for inquiries, partnerships, or support
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
                  <Mail className="text-red-accent" size={24} />
                  Email
                </h3>
                <p className="text-gray-700">
                  <a href="mailto:info@digitalaccessnow.org" className="hover:text-red-accent transition-colors">
                    info@digitalaccessnow.org
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
                  <Phone className="text-red-accent" size={24} />
                  Phone
                </h3>
                <p className="text-gray-700">
                  <a href="tel:+1234567890" className="hover:text-red-accent transition-colors">
                    +1 (234) 567-890
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
                  <MapPin className="text-red-accent" size={24} />
                  Address
                </h3>
                <address className="text-gray-700 not-italic leading-relaxed">
                  123 Digital Street<br />
                  Tech City, TC 12345<br />
                  United States
                </address>
              </div>

              <div className="bg-light-gray p-6 rounded-lg">
                <h4 className="font-bold mb-2">Business Hours</h4>
                <p className="text-gray-700 text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form className="bg-light-gray p-8 rounded-lg space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
                    required
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
                  required
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
                  required
                />

                <select className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue">
                  <option>Select Subject</option>
                  <option>General Inquiry</option>
                  <option>Partnership Opportunity</option>
                  <option>Program Support</option>
                  <option>Donation</option>
                  <option>Other</option>
                </select>

                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            FIND US ON THE MAP
          </h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-xl">Interactive Map - Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
