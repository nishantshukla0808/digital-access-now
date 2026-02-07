import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Digital Access Now - Bridging the Digital Divide',
  description: 'Empowering communities by bridging the digital divide through access, education, and opportunity',
  icons: {
    icon: '/favicon_DAN.png',
    apple: '/favicon_DAN.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-poppins: ${poppins.style.fontFamily};
            --font-montserrat: ${montserrat.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={`font-sans antialiased ${poppins.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
