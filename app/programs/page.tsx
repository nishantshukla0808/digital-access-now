import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-footer-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            OUR PROGRAMS
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming lives through digital access, connectivity, and education
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Device Access Initiative',
                description: 'Distributing refurbished computers and tablets to underserved communities, ensuring everyone has the tools to access digital resources.',
                icon: '💻',
              },
              {
                title: 'Connectivity Programs',
                description: 'Bringing reliable internet access to remote areas through partnerships with telecom providers and community networks.',
                icon: '📡',
              },
              {
                title: 'Digital Literacy Academy',
                description: 'Comprehensive training programs teaching essential digital skills from basic computer use to advanced technical competencies.',
                icon: '📚',
              },
            ].map((program, i) => (
              <div key={i} className="bg-light-gray p-8 rounded-lg shadow-md hover-lift">
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{program.description}</p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-red-accent hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold transition-colors text-sm">
                    Learn More
                  </button>
                  <button className="flex-1 border-2 border-red-accent text-red-accent hover:bg-red-accent hover:text-white px-4 py-2 rounded-full font-bold transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Impact */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            PROGRAM IMPACT
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '89K+', label: 'Devices Distributed' },
              { number: '245', label: 'Communities Served' },
              { number: '52', label: 'Countries' },
              { number: '340K', label: 'Lives Touched' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-primary-blue mb-2">{stat.number}</div>
                <p className="text-gray-700 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'Who can participate in our programs?',
                answer: 'Our programs are designed for underserved communities with limited digital access. Eligibility varies by program, but we welcome individuals of all ages and backgrounds.',
              },
              {
                question: 'Is there a cost to participate?',
                answer: 'All our core programs are provided free of charge. We believe digital access should not be a barrier based on economic status.',
              },
              {
                question: 'How can I apply for our programs?',
                answer: 'Visit each program page or contact us directly. Applications are reviewed on a rolling basis, and we work to place participants quickly.',
              },
              {
                question: 'Do you offer virtual programs?',
                answer: 'Yes! We offer both in-person and virtual programs to maximize accessibility for participants in different regions.',
              },
            ].map((faq, i) => (
              <details key={i} className="border border-border-gray rounded-lg p-6 hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span>+</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
