import Link from 'next/link'

type EventsTab = 'coming-soon' | 'upcoming' | 'past'

export function EventsTabs({ active }: { active: EventsTab }) {
  const tabs: { key: EventsTab; label: string; href: string }[] = [
    { key: 'coming-soon', label: 'Coming Soon', href: '/events/coming-soon' },
    // 'upcoming' tab hidden — no current upcoming events; /events/upcoming redirects to /events/past
    { key: 'past', label: 'Past Events', href: '/events/past' },
  ]

  return (
    <section style={{ background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center -mt-8">
          <div
            className="inline-flex rounded-full p-1"
            style={{
              border: '1px solid #E7ECEF',
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 4px 24px rgba(15,93,94,0.10)',
            }}
          >
            {tabs.map((tab) => {
              const isActive = tab.key === active
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? { background: '#0F5D5E', color: '#ffffff' }
                      : { color: '#1F2933' }
                  }
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
