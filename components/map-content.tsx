'use client'

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'

// Custom location pin icon
const locationIcon = L.divIcon({
  className: 'custom-location-marker',
  html: `
    <div style="position: relative;">
      <svg width="32" height="42" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
        <path d="M12 0C7.589 0 4 3.589 4 8C4 14 12 24 12 24C12 24 20 14 20 8C20 3.589 16.411 0 12 0Z" fill="#00BCD4"/>
        <circle cx="12" cy="8" r="3" fill="white"/>
      </svg>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  tooltipAnchor: [0, -42],
})

// Chapter locations data - USA, India, Nepal, Pakistan
const chapters = [
  { id: 1, country: 'USA', lat: 37.0902, lng: -95.7129 },
  { id: 2, country: 'India', lat: 20.5937, lng: 78.9629 },
  { id: 3, country: 'Nepal', lat: 28.3949, lng: 84.1240 },
  { id: 4, country: 'Pakistan', lat: 30.3753, lng: 69.3451 },
]

function MapController() {
  const map = useMap()
  
  useEffect(() => {
    // Fit map to show all markers
    const bounds = L.latLngBounds(chapters.map(c => [c.lat, c.lng]))
    map.fitBounds(bounds, { padding: [20, 20] })
  }, [map])
  
  return null
}

export default function MapContent() {
  return (
    <MapContainer
      center={[25, 50]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      minZoom={2}
      maxZoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController />
      {chapters.map((chapter) => (
        <Marker
          key={chapter.id}
          position={[chapter.lat, chapter.lng]}
          icon={locationIcon}
        >
          <Tooltip 
            permanent 
            direction="top" 
            className="country-label-tooltip"
            opacity={1}
          >
            <div className="font-bold text-sm">{chapter.country}</div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}
