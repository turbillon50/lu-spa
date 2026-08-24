'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignUp } from '@clerk/nextjs'
import { GoogleButton, OrDivider } from '../../components/GoogleButton'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function ClerkRegisterForm() {
  const { signUp } = useSignUp()
  const router = useRouter()
  const [step, setStep] = useState<'form' | 'verify'>('form')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleGoogle = async () => {
    if (!signUp) return
    setGoogleLoading(true)
    try {
      await signUp.sso({
        strategy: 'oauth_google',
        redirectUrl: '/home',
        redirectCallbackUrl: '/sso-callback',
      })
    } catch {
      setGoogleLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signUp) return
    setError('')
    setLoading(true)
    try {
      await signUp.create({ emailAddress: email, password, firstName, lastName })
      await signUp.verifications.sendEmailCode()
      setStep('verify')
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
      setError(msg || 'Error al crear la cuenta. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signUp) return
    setError('')
    setLoading(true)
    try {
      await signUp.verifications.verifyEmailCode({ code })
      if (signUp.status === 'complete') {
        await signUp.finalize()
        router.replace('/home')
      }
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
      setError(msg || 'Código incorrecto. Revisa tu correo e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'verify') {
    return (
      <form onSubmit={handleVerify} style={{ width: '100%' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 24, lineHeight: 1.7 }}>
          Enviamos un código de 6 dígitos a <strong style={{ color: 'var(--espresso)' }}>{email}</strong>.
        </p>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Código de verificación</label>
          <input
            type="text" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required maxLength={6} className="input-lucienne"
            style={{ ...inputStyle, fontSize: 22, letterSpacing: '0.4em', textAlign: 'center' }}
            placeholder="000000" autoFocus
          />
        </div>
        {error && <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#C04040', marginBottom: 16 }}>{error}</p>}
        <button type="submit" disabled={loading || code.length < 6} className="btn-primary" style={primaryBtnStyle(loading)}>
          {loading ? 'Verificando...' : 'Verificar y entrar'}
        </button>
        <button
          type="button"
          onClick={() => signUp?.verifications.sendEmailCode()}
          style={{ ...ghostBtnStyle, marginTop: 10 }}
        >
          Reenviar código
        </button>
      </form>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <GoogleButton onClick={handleGoogle} loading={googleLoading} label="Crear cuenta con Google" />

      <OrDivider label="o con tu correo" />

      <form onSubmit={handleRegister} style={{ width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="input-lucienne" style={inputStyle} placeholder="Mariana" />
          </div>
          <div>
            <label style={labelStyle}>Apellido</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="input-lucienne" style={inputStyle} placeholder="Reyes" />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Correo electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="input-lucienne" style={inputStyle} placeholder="tu@correo.com" />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" className="input-lucienne" style={inputStyle} placeholder="Mínimo 8 caracteres" />
        </div>
        {error && <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#C04040', marginBottom: 16 }}>{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary" style={primaryBtnStyle(loading)}>
          {loading ? 'Creando cuenta...' : 'Crear mi cuenta'}
        </button>
      </form>
    </div>
  )
}

function DemoForm() {
  const router = useRouter()
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.75, marginBottom: 24 }}>
        El registro requiere las llaves de Clerk. Entra en modo demo para explorar la app.
      </p>
      <button
        onClick={() => { try { localStorage.setItem('lucienne::mode', 'user') } catch {} router.replace('/home') }}
        className="btn-primary"
        style={primaryBtnStyle(false)}
      >
        Explorar en modo demo
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
  width: '100%', padding: '13px', borderRadius: 28,
  border: '1px solid rgba(196,160,140,0.3)', background: 'transparent',
  cursor: 'pointer', fontFamily: 'var(--font-montserrat)',
  fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
  fontWeight: 500, color: 'var(--taupe)',
}

export default function RegisterPage() {
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
        Crea tu cuenta
      </h1>
      <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 22, color: 'var(--taupe)', textAlign: 'center', marginBottom: 36 }}>
        Únete a Lucienne
      </p>

      <div style={{
        width: '100%', maxWidth: 440,
        background: 'rgba(255,255,255,0.72)', borderRadius: 20, padding: '32px 28px',
        border: '1px solid rgba(201,160,140,0.18)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 40px rgba(44,31,23,0.08)',
      }}>
        {CLERK_KEY ? <ClerkRegisterForm /> : <DemoForm />}
      </div>

      {CLERK_KEY && (
        <p style={{ marginTop: 24, fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', textAlign: 'center' }}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
            Inicia sesión
          </Link>
        </p>
      )}
    </div>
  )
}
