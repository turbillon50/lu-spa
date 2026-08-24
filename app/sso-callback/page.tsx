'use client'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

// Clerk necesita esta ruta para cerrar el flujo de OAuth (Google, etc).
// Mismo fondo/identidad que el loading global para que no se sienta como
// una pantalla generica ajena a la marca mientras procesa.
export default function SSOCallbackPage() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0A0603',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/brand/logo-mark.png"
        alt="Lucienne Beauty Spa"
        style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', opacity: 0.9 }}
      />
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/home"
        signUpFallbackRedirectUrl="/home"
      />
    </div>
  )
}
