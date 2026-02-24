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
            INTERNSHIPS
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Launch your career with Digital Access Now
          </p>
        </div>
      </section>

      {/* Internship Opportunities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">INTERNSHIP PROGRAMS</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Program Development Intern',
                duration: '3-6 months',
                type: 'Remote',
                description: 'Support the design and implementation of digital literacy curriculum.',
                requirements: ['Currently enrolled in college', 'Interest in education & technology', 'Strong communication skills'],
              },
              {
                title: 'Data & Research Intern',
                duration: '3-6 months',
                type: 'Remote',
                description: 'Analyze program data and contribute to impact reporting.',
                requirements: ['Background in data science or statistics', 'Excel & Python experience', 'Attention to detail'],
              },
              {
                title: 'Communications & Content Intern',
                duration: '3-6 months',
                type: 'Remote',
                description: 'Create compelling stories about our programs and impact.',
                requirements: ['Creative writing skills', 'Social media savvy', 'Passion for storytelling'],
              },
            ].map((internship, i) => (
              <div key={i} className="bg-light-gray p-8 rounded-lg border border-border-gray">
                <h3 className="text-2xl font-bold mb-2">{internship.title}</h3>
                <div className="flex gap-6 text-sm text-gray-600 mb-4">
                  <span>⏰ {internship.duration}</span>
                  <span>📍 {internship.type}</span>
                </div>
                <p className="text-gray-700 mb-4">{internship.description}</p>
                <p className="text-sm font-semibold text-gray-600 mb-3">Requirements:</p>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  {internship.requirements.map((req, j) => (
                    <li key={j}>✓ {req}</li>
                  ))}
                </ul>
                <button className="bg-primary-blue hover:bg-cyan-600 text-white px-6 py-2 rounded-full font-bold transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Intern */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">WHY INTERN WITH US?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎓', title: 'Real Experience', desc: 'Gain hands-on experience in nonprofit work' },
              { icon: '🌟', title: 'Mentorship', desc: 'Learn from dedicated professionals' },
              { icon: '🌍', title: 'Global Impact', desc: 'Contribute to international change' },
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-700 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
