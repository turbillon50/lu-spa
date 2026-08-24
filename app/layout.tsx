import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from 'next/font/google'
import { Providers } from './lib/providers'
import { ServiceWorkerRegister } from './components/ServiceWorkerRegister'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  variable: '--font-pinyon',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Lucienne Beauty Spa', template: '%s · Lucienne' },
  description:
    'Spa boutique premium en Paseos del Pedregal, CDMX. Experiencias de bienestar que transforman cuerpo y mente.',
  manifest: '/manifest.json',
  applicationName: 'Lucienne',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lucienne',
  },
  icons: {
    icon: [{ url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', sizes: '180x180', type: 'image/svg+xml' }],
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: 'Lucienne Beauty Spa',
    description: 'Un espacio creado para desconectarte del exterior y reconectar contigo.',
    siteName: 'Lucienne Beauty Spa',
    locale: 'es_MX',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FEFCF8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable} ${pinyon.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <ServiceWorkerRegister />
      </body>
    </html>
  )
}
