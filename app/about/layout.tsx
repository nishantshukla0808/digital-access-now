import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Digital Access Now | Access, Skills & Opportunity',
  description:
    "Learn about Digital Access Now's mission, vision, values, and evolution into a digital opportunity organization helping underserved students and communities access technology, build practical skills, and connect to opportunity.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
