export default function OfflinePage() {
  return (
    <main style={{
      background: 'var(--ivory)',
      minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 28px', textAlign: 'center',
    }}>
      {/* Hairline gold ring with wifi off */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        border: '1px solid rgba(201,169,107,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28, background: 'rgba(237,230,217,0.4)',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="var(--taupe)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"/>
          <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0"/>
          <circle cx="12" cy="20" r="1" fill="var(--taupe)"/>
        </svg>
      </div>

      <p style={{
        fontFamily: 'var(--font-pinyon)',
        fontSize: 28, color: 'var(--taupe)', opacity: 0.8, marginBottom: 12,
      }}>
        Sin conexión.
      </p>

      <h1 style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: 'clamp(26px, 5vw, 36px)',
        color: 'var(--espresso)', fontWeight: 300,
        lineHeight: 1.15, letterSpacing: '-0.01em',
        marginBottom: 16,
      }}>
        El bienestar no necesita señal.
      </h1>

      <p style={{
        fontFamily: 'var(--font-montserrat)',
        fontSize: 13, color: 'var(--taupe)',
        lineHeight: 1.75, maxWidth: '32ch',
        marginBottom: 32,
      }}>
        Tus reservas guardadas siguen disponibles. Vuelve cuando tengas conexión y seguimos.
      </p>

      <div style={{
        width: 48, height: 1,
        background: 'var(--gold)', opacity: 0.4,
        marginBottom: 28,
      }} />

      <p style={{
        fontFamily: 'var(--font-montserrat)',
        fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--sand)', fontWeight: 500,
      }}>
        Lucienne Beauty Spa
      </p>
    </main>
  )
}
