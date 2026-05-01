import Link from 'next/link'
import { Logo } from './components/Logo'

export default function NotFound() {
  return (
    <main className="app-shell flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo size="md" tone="gold" />
      <h1 className="hero-title text-[32px]">404</h1>
      <p className="text-[13px] text-ink-500">No encontramos la pantalla que buscas.</p>
      <Link href="/home" className="btn-rose !w-auto px-6">Volver al inicio</Link>
    </main>
  )
}
