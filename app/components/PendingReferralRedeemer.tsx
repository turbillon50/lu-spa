'use client'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

// Componente invisible: si llegaste a /home con un ?ref=CODIGO pendiente
// (guardado en el register al hacer clic en un link de invitacion), lo
// canjea aqui automatico -- cubre correo, Google y passkey por igual porque
// TODOS los flujos de registro terminan aterrizando en /home.
export function PendingReferralRedeemer() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const clerkUser = CLERK_KEY ? useUser() : null

  useEffect(() => {
    if (!CLERK_KEY || !clerkUser?.isSignedIn) return
    let pending: string | null = null
    try { pending = sessionStorage.getItem('lucienne::pendingRef') } catch { return }
    if (!pending) return

    try { sessionStorage.removeItem('lucienne::pendingRef') } catch {}

    fetch('/api/referidos/canjear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo: pending }),
    }).catch(() => {})
  }, [clerkUser?.isSignedIn])

  return null
}
