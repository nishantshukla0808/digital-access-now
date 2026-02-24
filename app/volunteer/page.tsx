import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Volunteer() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">
            VOLUNTEER
          </div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">
            IMPACT
          </div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">
            SERVE
          </div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">
            GIVE BACK
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            VOLUNTEER WITH US
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of volunteers making a real difference in bridging the digital divide worldwide
          </p>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            VOLUNTEER OPPORTUNITIES
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose a role that matches your skills and passion. All positions are flexible and remote-friendly.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Web Developer',
                description: 'Help build and maintain our digital platforms, develop new features, and improve user experience. Work with modern web technologies to create impactful solutions.',
                requirements: ['HTML, CSS, JavaScript knowledge', 'Experience with React/Next.js preferred', 'Problem-solving mindset'],
              },
              {
                title: 'Digital Skills Instructor',
                description: 'Teach digital literacy classes to communities in your area or online. Share your knowledge and empower others with essential technology skills.',
                requirements: ['Basic computer proficiency', 'Passion for teaching', 'Patience and communication skills'],
              },
              {
                title: 'Fundraising & Grant Writing',
                description: 'Research funding opportunities, write compelling grant proposals, and help secure resources to expand our programs and reach more communities.',
                requirements: ['Strong writing skills', 'Research experience', 'Understanding of nonprofit sector'],
              },
              {
                title: 'Social Media & Content',
                description: 'Create engaging content, manage social media channels, and help spread awareness of our mission. Tell our story and connect with our global community.',
                requirements: ['Social media expertise', 'Content creation skills', 'Creative and strategic thinking'],
              },
            ].map((opp, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-primary-blue">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{opp.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{opp.description}</p>
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-600 mb-3">What You'll Need:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {opp.requirements.map((req, j) => (
                      <li key={j} className="flex items-start">
                        <span className="text-primary-blue mr-2">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href="https://wkf.ms/4aOVIFd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-primary-blue hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg text-center"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
