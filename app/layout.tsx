import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lucienne Beauty Spa',
  description: 'Spa boutique premium en Pedregal',
  manifest: '/manifest.json',
  themeColor: '#f2d7d0',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
