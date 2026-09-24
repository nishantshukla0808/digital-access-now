import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { UpcomingEventsView } from '../_components/upcoming-events-view'

export const metadata = {
  title: 'Past Events | Digital Access Now',
  description: 'Past events hosted by Digital Access Now chapters worldwide.',
}

export default async function PastEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <UpcomingEventsView />
      <Footer />
    </div>
  )
}
