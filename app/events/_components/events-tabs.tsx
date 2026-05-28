import Link from 'next/link'

type EventsTab = 'coming-soon' | 'upcoming' | 'past'

export function EventsTabs({ active }: { active: EventsTab }) {
  const tabs: { key: EventsTab; label: string; href: string }[] = [
    { key: 'coming-soon', label: 'Coming Soon', href: '/events/coming-soon' },
    { key: 'upcoming', label: 'Upcoming Events', href: '/events/upcoming' },
    { key: 'past', label: 'Past Events', href: '/events/past' },
  ]

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center -mt-8">
          <div className="inline-flex rounded-full border border-slate-200 bg-white/90 backdrop-blur shadow-lg p-1">
            {tabs.map((tab) => {
              const isActive = tab.key === active
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-blue text-white shadow-sm'
                      : 'text-gray-600 hover:text-primary-blue hover:bg-primary-blue/10'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
