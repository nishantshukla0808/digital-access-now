import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Volunteer() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-primary-purple to-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            VOLUNTEER WITH US
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Join thousands of volunteers making a real difference in digital equity
          </p>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            VOLUNTEER OPPORTUNITIES
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Digital Skills Trainer',
                commitment: '5-10 hours/week',
                description: 'Teach digital literacy classes to communities in your area or online. No prior teaching experience necessary.',
                requirements: ['Basic computer skills', 'Passion for teaching', 'Flexible schedule'],
              },
              {
                title: 'Community Coordinator',
                commitment: '8-15 hours/week',
                description: 'Organize local events, manage volunteer teams, and coordinate program logistics in your community.',
                requirements: ['Strong organizational skills', 'Community connections', 'Leadership experience'],
              },
              {
                title: 'Social Media Ambassador',
                commitment: '3-8 hours/week',
                description: 'Help spread awareness of our mission through social media content creation and community engagement.',
                requirements: ['Social media expertise', 'Creative skills', 'Strong communication'],
              },
              {
                title: 'Tech Support Volunteer',
                commitment: '4-10 hours/week',
                description: 'Provide technical support to program participants and help troubleshoot device and connectivity issues.',
                requirements: ['Technical knowledge', 'Problem-solving skills', 'Patience and empathy'],
              },
            ].map((opp, i) => (
              <div key={i} className="bg-light-gray p-8 rounded-lg shadow-md hover-lift">
                <h3 className="text-2xl font-bold mb-2">{opp.title}</h3>
                <p className="text-red-accent font-semibold mb-4">{opp.commitment}</p>
                <p className="text-gray-700 mb-6">{opp.description}</p>
                <p className="text-sm font-semibold text-gray-600 mb-3">Requirements:</p>
                <ul className="text-sm text-gray-700 space-y-1 mb-6">
                  {opp.requirements.map((req, j) => (
                    <li key={j}>✓ {req}</li>
                  ))}
                </ul>
                <button className="w-full bg-red-accent hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Stats */}
      <section className="py-16 md:py-24 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15K+</div>
              <p className="text-lg">Active Volunteers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2.1M</div>
              <p className="text-lg">Volunteer Hours</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">52</div>
              <p className="text-lg">Countries</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">340K</div>
              <p className="text-lg">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Signup Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            READY TO MAKE A DIFFERENCE?
          </h2>
          <form className="bg-light-gray p-8 rounded-lg shadow-md space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
            />
            <select className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue">
              <option>Select Volunteer Role</option>
              <option>Digital Skills Trainer</option>
              <option>Community Coordinator</option>
              <option>Social Media Ambassador</option>
              <option>Tech Support Volunteer</option>
            </select>
            <textarea
              placeholder="Tell us about yourself and your volunteer interests"
              rows={5}
              className="w-full px-4 py-3 border border-border-gray rounded-lg focus:outline-none focus:border-primary-blue"
            />
            <button
              type="submit"
              className="w-full bg-red-accent hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
