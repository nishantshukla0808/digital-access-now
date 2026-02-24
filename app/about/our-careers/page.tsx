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
            CAREERS
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Join our team and help us bridge the digital divide
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">OPEN POSITIONS</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Senior Program Manager',
                location: 'Remote',
                type: 'Full-time',
                description: 'Lead and expand our digital literacy programs across multiple regions.',
              },
              {
                title: 'Community Engagement Officer',
                location: 'Regional Offices',
                type: 'Full-time',
                description: 'Build and maintain partnerships with local communities and organizations.',
              },
              {
                title: 'Data & Impact Analytics Specialist',
                location: 'Remote',
                type: 'Full-time',
                description: 'Measure and communicate the impact of our programs globally.',
              },
              {
                title: 'Content & Marketing Manager',
                location: 'Remote',
                type: 'Full-time',
                description: 'Tell our stories and amplify our mission through creative content.',
              },
            ].map((job, i) => (
              <div key={i} className="bg-light-gray p-8 rounded-lg border border-border-gray hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>📍 {job.location}</span>
                      <span>⏱️ {job.type}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <button className="bg-primary-blue hover:bg-cyan-600 text-white px-6 py-2 rounded-full font-bold transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">WHY JOIN US?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🌍', title: 'Global Impact', desc: 'Make a difference for 340K+ people worldwide' },
              { icon: '💼', title: 'Growth', desc: 'Develop your skills in a mission-driven organization' },
              { icon: '🤝', title: 'Community', desc: 'Work with passionate, dedicated colleagues' },
              { icon: '💰', title: 'Benefits', desc: 'Competitive compensation and benefits package' },
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-6 rounded-lg">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
