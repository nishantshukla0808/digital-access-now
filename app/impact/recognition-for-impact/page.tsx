import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-footer-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            RECOGNITION FOR IMPACT
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Awards and recognition for our work in digital equity
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">AWARDS & RECOGNITION</h2>
          <div className="space-y-8">
            {[
              {
                year: '2025',
                award: 'Global Digital Equity Leader',
                organization: 'International Tech Alliance',
                description: 'Recognition for transformative impact in bridging the digital divide across continents.',
              },
              {
                year: '2024',
                award: 'Youth-Led Organization of the Year',
                organization: 'UN SDG Partners',
                description: 'Honored for effective use of youth leadership to create sustainable change.',
              },
              {
                year: '2024',
                award: 'Innovation in Education',
                organization: 'Global Education Foundation',
                description: 'Award for innovative approaches to digital literacy education.',
              },
              {
                year: '2023',
                award: 'Best NGO Partnership',
                organization: 'Tech for Good Coalition',
                description: 'Recognition for collaborative approach and impact multiplication.',
              },
            ].map((award, i) => (
              <div key={i} className="bg-light-gray p-8 rounded-lg border-l-4 border-primary-blue">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{award.award}</h3>
                    <p className="text-primary-blue font-semibold">{award.organization}</p>
                  </div>
                  <span className="text-primary-blue font-bold text-lg">{award.year}</span>
                </div>
                <p className="text-gray-700">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">TESTIMONIALS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: 'Digital Access Now has transformed our community. Young people now have skills and opportunities they never had before.',
                author: 'Community Leader, Nepal',
              },
              {
                quote: 'Their youth-led model is inspiring. We\'ve learned so much from how they empower local teams to lead change.',
                author: 'NGO Director, Kenya',
              },
              {
                quote: 'The impact is undeniable. We\'ve seen real economic and social transformation in the communities we work with.',
                author: 'Government Official, India',
              },
              {
                quote: 'Working with them has amplified our reach and effectiveness. They truly understand digital equity.',
                author: 'Tech Company Executive',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-bold text-primary-blue">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
