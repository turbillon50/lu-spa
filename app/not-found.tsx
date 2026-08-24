import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ background: 'var(--ivory)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 72, color: 'var(--espresso)', lineHeight: 1, marginBottom: 16, fontVariantNumeric: 'tabular-nums' }}>404</p>
      <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 24, color: 'var(--taupe)', marginBottom: 8 }}>Página no encontrada</p>
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 32 }}>La experiencia que buscas no existe aquí.</p>
      <Link href="/home" style={{ background: 'var(--espresso)', color: '#FEFCF8', padding: '13px 28px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
        Volver al inicio
      </Link>
    </main>
  )
}
