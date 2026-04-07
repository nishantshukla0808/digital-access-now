import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portal | Digital Access Now',
  description: 'Digital Access Now multi-role operations portal frontend',
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children
}