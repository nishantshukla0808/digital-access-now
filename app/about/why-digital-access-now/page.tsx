import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Background Text */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-red-accent text-white overflow-hidden">
        {/* Background Text Pattern */}
        <div className="absolute inset-0 opacity-15 select-none pointer-events-none">
          <div className="absolute top-10 left-0 text-5xl md:text-7xl font-black text-white transform -rotate-12">
            EQUITY
          </div>
          <div className="absolute top-32 right-0 text-5xl md:text-7xl font-black text-white transform rotate-12">
            ACCESS
          </div>
          <div className="absolute bottom-32 left-10 text-5xl md:text-7xl font-black text-white transform -rotate-6">
            INCLUSION
          </div>
          <div className="absolute bottom-10 right-20 text-5xl md:text-7xl font-black text-white transform rotate-6">
            EMPOWERMENT
          </div>
          <div className="absolute top-1/2 left-1/4 text-4xl md:text-6xl font-black text-white transform -rotate-3">
            DIGITAL RIGHTS
          </div>
        </div>

        {/* Decorative Icons */}
        <div className="absolute top-16 left-12 opacity-25 hidden lg:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3"/>
            <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-16 right-12 opacity-25 hidden lg:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3"/>
            <circle cx="50" cy="20" r="6" fill="currentColor"/>
            <circle cx="50" cy="50" r="6" fill="currentColor"/>
            <circle cx="50" cy="80" r="6" fill="currentColor"/>
            <circle cx="20" cy="50" r="6" fill="currentColor"/>
            <circle cx="80" cy="50" r="6" fill="currentColor"/>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            WHY DIGITAL<br/>ACCESS NOW?
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
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
      <section className="py-16 md:py-24 bg-red-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">50</div>
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
