'use client'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { BrandEmblem } from '../components/BrandEmblem'

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
      <BrandEmblem size={116} priority glow="strong" />
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/home"
        signUpFallbackRedirectUrl="/home"
      />
    </div>
  )
}
