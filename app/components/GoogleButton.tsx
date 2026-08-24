'use client'

// Boton de Google en la linea visual de Lucienne (pill, borde suave, tipografia
// Montserrat) -- el icono "G" conserva sus colores oficiales, eso lo exige Google,
// pero el chrome del boton es 100% nuestro.
export function GoogleButton({
  onClick,
  loading,
  label = 'Continuar con Google',
}: {
  onClick: () => void
  loading?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        width: '100%',
        padding: '13px 16px',
        borderRadius: 28,
        border: '1px solid rgba(196,160,140,0.3)',
        background: 'rgba(255,255,255,0.85)',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        fontFamily: 'var(--font-montserrat)',
        fontSize: 12,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 500,
        color: 'var(--espresso)',
        opacity: loading ? 0.6 : 1,
      }}
    >
      <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.87 2.69-6.64z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"/>
        <path fill="#FBBC05" d="M3.97 10.7c-.18-.54-.28-1.11-.28-1.7s.1-1.16.28-1.7V4.96H.96A8.996 8.996 0 000 9c0 1.45.35 2.83.96 4.04l3.01-2.34z"/>
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"/>
      </svg>
      <span>{loading ? 'Redirigiendo...' : label}</span>
    </button>
  )
}

export function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(196,160,140,0.25)' }} />
      <span style={{
        fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--taupe)', opacity: 0.75, whiteSpace: 'nowrap',
      }}>
        o continúa con
      </span>
      <div style={{ flex: 1, height: 1, background: 'rgba(196,160,140,0.25)' }} />
    </div>
  )
}


export function PasskeyButton({
  onClick,
  loading,
}: {
  onClick: () => void
  loading?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        width: '100%',
        marginTop: 10,
        padding: '13px 16px',
        borderRadius: 28,
        border: '1px solid rgba(196,160,140,0.3)',
        background: 'rgba(255,255,255,0.85)',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        fontFamily: 'var(--font-montserrat)',
        fontSize: 12,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 500,
        color: 'var(--espresso)',
        opacity: loading ? 0.6 : 1,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="1.7" aria-hidden="true">
        <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
        <path d="M8 10v6a4 4 0 0 0 8 0v-6" />
        <path d="M12 14v6" />
        <path d="M9 20c1 .6 2 1 3 1s2-.4 3-1" />
      </svg>
      <span>{loading ? 'Verificando...' : 'Entrar con Passkey / Face ID'}</span>
    </button>
  )
}
