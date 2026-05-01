import { Logo } from '../components/Logo'

export default function OfflinePage() {
  return (
    <main className="app-shell flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo size="md" tone="gold" />
      <h1 className="hero-title text-[28px]">Sin conexión</h1>
      <p className="text-[13px] text-ink-500">
        No hay conexión a internet. Tus citas guardadas siguen disponibles. Vuelve a intentarlo en un momento.
      </p>
    </main>
  )
}
