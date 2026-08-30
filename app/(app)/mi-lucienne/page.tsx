'use client'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { RealAccountView } from '../../components/RealAccountView'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function ClerkAccountPage() {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return (
      <div
        className="page-enter"
        style={{
          background: 'var(--ivory)', minHeight: '70dvh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px 24px', textAlign: 'center',
        }}
      >
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)' }}>
          Cargando tu cuenta…
        </p>
      </div>
    )
  }

  if (isSignedIn) return <RealAccountView />

  return (
    <div
      className="page-enter"
      style={{
        background: 'var(--ivory)', minHeight: '70dvh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', textAlign: 'center',
      }}
    >
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        border: '1px solid rgba(201,160,140,0.25)',
        background: 'rgba(237,230,217,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </div>
      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, color: 'var(--espresso)', marginBottom: 12, fontWeight: 300 }}>
        Mi Lucienne
      </h1>
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75, marginBottom: 28, maxWidth: '32ch' }}>
        Inicia sesión para consultar tus reservas y administrar tu cuenta.
      </p>
      <Link
        href="/login"
        className="btn-primary"
        style={{
          background: '#E07560', color: '#FEFCF8', padding: '14px 28px', borderRadius: 24,
          textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12,
          letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
        }}
      >
        Iniciar sesión
      </Link>
    </div>
  )
}

function AccountUnavailable() {
  return (
    <div
      className="page-enter"
      style={{
        background: 'var(--ivory)', minHeight: '70dvh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', textAlign: 'center',
      }}
    >
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)' }}>
        El acceso a cuentas no está disponible en este momento.
      </p>
    </div>
  )
}

export default function MiLuciennePage() {
  return CLERK_KEY ? <ClerkAccountPage /> : <AccountUnavailable />
}
