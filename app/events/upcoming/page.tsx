import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { UpcomingEventsView } from '../_components/upcoming-events-view'

export const metadata = {
  title: 'Upcoming Events | Digital Access Now',
  description: 'Upcoming events hosted by Digital Access Now chapters worldwide.',
}

export default async function UpcomingEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <UpcomingEventsView />
      <Footer />
    </div>
  )
}
