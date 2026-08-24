export default function OfflinePage() {
  return (
    <main style={{ background: 'var(--ivory)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.25" style={{ marginBottom: 20 }}>
        <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
      </svg>
      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: 'var(--espresso)', marginBottom: 12 }}>Sin conexión</h1>
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.7, maxWidth: 280 }}>
        No hay conexión a internet. Tus reservas guardadas siguen disponibles. Vuelve a intentarlo en un momento.
      </p>
    </main>
  )
}
