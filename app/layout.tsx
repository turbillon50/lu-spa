import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { Providers } from './lib/providers'
import { ServiceWorkerRegister } from './components/ServiceWorkerRegister'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Lucienne Beauty Spa',
  description:
    'Spa boutique premium en El Pedregal. Reserva tratamientos faciales, corporales y experiencias privadas.',
  manifest: '/manifest.json',
  applicationName: 'Lucienne',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lucienne'
  },
  icons: {
    icon: [{ url: '/lucienne-logo.jpg', type: 'image/jpeg' }],
    apple: [{ url: '/lucienne-logo.jpg', type: 'image/jpeg' }]
  },
  formatDetection: { telephone: false }
}

export const viewport: Viewport = {
  themeColor: '#c9a36a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${montserrat.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
