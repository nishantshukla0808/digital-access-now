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
            OUR THEORY OF CHANGE
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            How we create systemic change in digital equity
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">HOW WE CREATE CHANGE</h2>

          <div className="space-y-12">
            {[
              {
                stage: 'ACCESS',
                description: 'Provide devices and internet connectivity to underserved communities, removing the primary barrier to digital participation.',
              },
              {
                stage: 'EDUCATION',
                description: 'Build digital literacy through targeted training programs that teach relevant, practical skills for education and employment.',
              },
              {
                stage: 'EMPOWERMENT',
                description: 'Foster local leadership by training youth as educators and advocates who can sustain and scale impact in their communities.',
              },
              {
                stage: 'ADVOCACY',
                description: 'Influence policy and systemic change by elevating voices from communities most affected by the digital divide.',
              },
            ].map((stage, i) => (
              <div key={i} className="border-l-4 border-primary-blue pl-8">
                <h3 className="text-3xl font-bold text-primary-blue mb-2">{stage.stage}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-light-gray p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">OUR IMPACT LOGIC</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-primary-blue">245</div>
                <p className="text-sm text-gray-700">Communities</p>
              </div>
              <div className="text-2xl text-primary-blue hidden md:block">→</div>
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-primary-purple">89K+</div>
                <p className="text-sm text-gray-700">Devices</p>
              </div>
              <div className="text-2xl text-primary-blue hidden md:block">→</div>
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-primary-blue">340K+</div>
                <p className="text-sm text-gray-700">Lives Empowered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
