import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Gradient Background */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">
            EQUITY
          </div>
          <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">
            ACCESS
          </div>
          <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">
            INCLUSION
          </div>
          <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">
            EMPOWERMENT
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            WHY DIGITAL ACCESS NOW?
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Breaking barriers to digital access so every community can thrive in our connected world
          </p>
        </div>
      </section>

      {/* Content + Image — 2 column layout */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">The Digital Divide</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  More than 2.5 billion people worldwide lack basic digital access and literacy skills. This digital divide creates barriers to education, economic opportunity, and full participation in society.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At Digital Access Now, we envision a world where digital tools and knowledge are equally accessible to all communities, regardless of geographical location, economic status, or background. We believe that digital equity is essential for achieving the Sustainable Development Goals and building a more inclusive future.
                </p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Together, we're transforming digital access from a privilege into a right. Join us in building a more connected and equitable world.
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] group">
              <img
                src="https://i.ibb.co/pvYZxKKt/Whats-App-Image-2026-04-26-at-23-50-20-Picsart-Ai-Image-Enhancer.jpg"
                alt="Building partnerships for digital equity"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-base font-semibold leading-snug">
                  Building partnerships and coalitions to advance digital equity globally
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
