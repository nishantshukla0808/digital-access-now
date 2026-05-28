export function EventsHero({ subtitle }: { subtitle: string }) {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-br from-primary-blue via-primary-purple to-cyan-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl md:text-8xl font-black text-white transform -rotate-12">EVENTS</div>
        <div className="absolute top-32 right-10 text-6xl md:text-8xl font-black text-white transform rotate-12">CHAPTERS</div>
        <div className="absolute bottom-20 left-20 text-6xl md:text-8xl font-black text-white transform -rotate-6">CONNECT</div>
        <div className="absolute bottom-10 right-32 text-5xl md:text-7xl font-black text-white transform rotate-6">COMMUNITY</div>
      </div>
      <div className="absolute top-20 right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-12 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div role="heading" aria-level={1} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
          EVENTS
        </div>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
