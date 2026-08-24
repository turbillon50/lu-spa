'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function ClerkForm({ onDemoMode }: { onDemoMode: () => void }) {
  const { signIn } = useSignIn()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signIn) return
    setError('')
    setLoading(true)
    try {
      await signIn.create({ identifier: email, password })
      if (signIn.status === 'complete') {
        await signIn.finalize()
        router.replace('/home')
      }
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
      setError(msg || 'Credenciales incorrectas. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Correo electrónico</label>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          required autoComplete="email" className="input-lucienne" style={inputStyle}
          placeholder="tu@correo.com"
        />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Contraseña</label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          required autoComplete="current-password" className="input-lucienne" style={inputStyle}
          placeholder="••••••••"
        />
      </div>
      {error && <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#C04040', marginBottom: 16 }}>{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary" style={primaryBtnStyle(loading)}>
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
      <button type="button" onClick={onDemoMode} style={ghostBtnStyle}>
        Entrar en modo demo
      </button>
    </form>
  )
}

function DemoForm() {
  const router = useRouter()
  const login = () => {
    try { localStorage.setItem('lucienne::mode', 'user') } catch {}
    router.replace('/home')
  }
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button onClick={login} className="btn-primary" style={primaryBtnStyle(false)}>
        Entrar como Mariana Reyes
      </button>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-montserrat)',
  fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'var(--taupe)', marginBottom: 8,
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', borderRadius: 12,
  border: '1px solid rgba(196,160,140,0.25)',
  background: 'rgba(255,255,255,0.6)',
  fontFamily: 'var(--font-montserrat)', fontSize: 14,
  color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box',
}
const primaryBtnStyle = (disabled: boolean): React.CSSProperties => ({
  width: '100%', padding: '15px', borderRadius: 28,
  border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
  background: disabled ? 'rgba(224,117,96,0.5)' : '#E07560',
  color: '#FEFCF8', fontFamily: 'var(--font-montserrat)',
  fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
})
const ghostBtnStyle: React.CSSProperties = {
  width: '100%', marginTop: 10, padding: '13px', borderRadius: 28,
  border: '1px solid rgba(196,160,140,0.3)', background: 'transparent',
  cursor: 'pointer', fontFamily: 'var(--font-montserrat)',
  fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
  fontWeight: 500, color: 'var(--taupe)',
}

export default function LoginPage() {
  const [demoMode, setDemoMode] = useState(!CLERK_KEY)

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #FAF5F0 0%, #F6EBE4 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <Link href="/splash" style={{ display: 'block', marginBottom: 32, textDecoration: 'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/brand/logo-oficial.jpg" alt="Lucienne"
          style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
        />
      </Link>

      <h1 style={{
        fontFamily: 'var(--font-cormorant)', fontSize: 36, fontWeight: 300,
        color: 'var(--espresso)', textAlign: 'center', marginBottom: 6, letterSpacing: '-0.01em',
      }}>
        {demoMode ? 'Selecciona tu perfil' : 'Bienvenida de regreso'}
      </h1>
      <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 22, color: 'var(--taupe)', textAlign: 'center', marginBottom: 36 }}>
        {demoMode ? 'Modo demo' : 'The Lucienne Experience'}
      </p>

      <div style={{
        width: '100%', maxWidth: 420,
        background: 'rgba(255,255,255,0.72)', borderRadius: 20, padding: '32px 28px',
        border: '1px solid rgba(201,160,140,0.18)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 40px rgba(44,31,23,0.08)',
      }}>
        {CLERK_KEY && !demoMode
          ? <ClerkForm onDemoMode={() => setDemoMode(true)} />
          : <DemoForm />
        }
      </div>

      {!demoMode && CLERK_KEY && (
        <p style={{ marginTop: 24, fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', textAlign: 'center' }}>
          ¿Primera vez?{' '}
          <Link href="/register" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
            Crea tu cuenta
          </Link>
        </p>
      )}

      {demoMode && CLERK_KEY && (
        <button
          onClick={() => setDemoMode(false)}
          style={{ marginTop: 20, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', textDecoration: 'underline' }}
        >
          Iniciar sesión con mi cuenta
        </button>
      )}
    </div>
  )
}
