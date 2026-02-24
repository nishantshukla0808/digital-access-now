'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

// Dynamic import to avoid SSR issues with Leaflet
const MapContent = dynamic(() => import('./map-content'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
})

export function ChaptersMap() {
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg isolate" style={{ zIndex: 1 }}>
      <MapContent />
    </div>
  )
}
