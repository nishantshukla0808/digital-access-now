import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner Image */}
      <section className="pt-20 md:pt-24">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden relative">
          <img 
            src="https://i.ibb.co/j9QC0wMF/banner.png"
            alt="Digital Access Now Banner"
            className="w-full h-full object-cover object-center"
          />
          {/* Centered Title Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center px-4" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.5)' }}>
              WHY DIGITAL ACCESS NOW?
            </h1>
          </div>
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

            <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              {[
                { number: '340K+', label: 'Lives Empowered' },
                { number: '89K+', label: 'Devices Distributed' },
                { number: '52', label: 'Countries Reached' },
              ].map((stat, i) => (
                <div key={i} className="bg-light-gray p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-red-accent mb-2">{stat.number}</div>
                  <p className="text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>

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
