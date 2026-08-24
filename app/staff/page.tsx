'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Puerta privada de administracion. No aparece en ningun menu ni liga
// publica -- separada a proposito del sistema de cuentas de clientas (Clerk).
export default function StaffAccess() {
  const router = useRouter()
  useEffect(() => {
    try { localStorage.setItem('lucienne::mode', 'admin') } catch {}
    router.replace('/admin')
  }, [router])

  return (
    <div style={{
      minHeight: '100dvh', background: '#0A0603',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(238,221,213,0.6)', fontFamily: 'var(--font-montserrat)',
      fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
    }}>
      Entrando al panel...
    </div>
  )
}
