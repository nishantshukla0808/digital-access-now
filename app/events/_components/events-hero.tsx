import { ArrowRight } from 'lucide-react'

export function EventsHero({ subtitle }: { subtitle: string }) {
  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-20" style={{ background: '#FAFAF7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#4DB7E5' }}>
          Digital Access Now
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4" style={{ color: '#0F5D5E' }}>
              Events
            </h1>
            <p className="text-lg leading-relaxed max-w-prose" style={{ color: '#1F2933', opacity: 0.8 }}>
              {subtitle}
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="mailto:hello@digitalaccessnow.org"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm transition-all duration-200 hover:opacity-90 border-2"
              style={{ color: '#0F5D5E', borderColor: '#0F5D5E', background: 'transparent' }}
            >
              Host an event with DAN <ArrowRight size={15} />
            </a>
          </div>
        </div>
        {/* Thin divider */}
        <div className="mt-10 h-px" style={{ background: 'linear-gradient(to right, #4DB7E5, #0F5D5E, transparent)' }} />
      </div>
    </section>
  )
}
