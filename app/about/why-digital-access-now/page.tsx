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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
            WHY DIGITAL ACCESS NOW?
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Breaking barriers to digital access so every community can thrive in our connected world
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6">The Digital Divide</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              More than 2.5 billion people worldwide lack basic digital access and literacy skills. This digital divide creates barriers to education, economic opportunity, and full participation in society.
            </p>

            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Digital Access Now, we envision a world where digital tools and knowledge are equally accessible to all communities, regardless of geographical location, economic status, or background. We believe that digital equity is essential for achieving the Sustainable Development Goals and building a more inclusive future.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">1000+</div>
              <p className="text-lg md:text-xl font-medium">Laptops Distributed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">100+</div>
              <p className="text-lg md:text-xl font-medium">Student Kits</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">5</div>
              <p className="text-lg md:text-xl font-medium">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              Together, we're transforming digital access from a privilege into a right. Join us in building a more connected and equitable world.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
