'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { BrandEmblem } from '../components/BrandEmblem'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

type Mensaje = { id: number; remitente: 'cliente' | 'admin'; texto: string; created_at: string }

export default function MensajesPage() {
  const router = useRouter()
  const clerkUser = CLERK_KEY ? useUser() : null
  const [mensajes, setMensajes] = useState<Mensaje[] | null>(null)
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (CLERK_KEY && clerkUser && !clerkUser.isSignedIn) {
      router.replace('/login')
    }
  }, [clerkUser, router])

  const cargar = useCallback(() => {
    fetch('/api/mensajes')
      .then((r) => (r.ok ? r.json() : { mensajes: [] }))
      .then((data) => setMensajes(data.mensajes || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!CLERK_KEY || !clerkUser?.isSignedIn) return
    cargar()
    pollRef.current = setInterval(cargar, 4000)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [clerkUser?.isSignedIn, cargar])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const enviar = async () => {
    const t = texto.trim()
    if (!t || enviando) return
    setEnviando(true)
    setTexto('')
    setMensajes((prev) => [
      ...(prev || []),
      { id: Date.now(), remitente: 'cliente', texto: t, created_at: new Date().toISOString() },
    ])
    try {
      await fetch('/api/mensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: t }),
      })
      cargar()
    } finally {
      setEnviando(false)
    }
  }

  const fmtHora = (iso: string) => new Date(iso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })

  if (!CLERK_KEY || (clerkUser && !clerkUser.isSignedIn)) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', background: 'var(--ivory)' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)' }}>
          Inicia sesión con tu cuenta para escribirnos.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--ivory)' }}>
      <div style={{
        background: 'var(--espresso)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0,
      }}>
        <Link href="/mi-lucienne" style={{ color: '#FEFCF8', display: 'flex' }} aria-label="Volver">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </Link>
        <BrandEmblem size={38} decorative glow="soft" />
        <div>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: '#FEFCF8', lineHeight: 1.1 }}>Lucienne Beauty Spa</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,160,140,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Atención directa</p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {mensajes === null && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', textAlign: 'center', marginTop: 40 }}>Cargando...</p>
        )}
        {mensajes !== null && mensajes.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 40, padding: '0 20px' }}>
            <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 22, color: 'var(--gold-deep)', marginBottom: 8 }}>Hola</p>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.7 }}>
              Escríbenos por aquí para dudas, cambios de cita o lo que necesites. Te respondemos directo.
            </p>
          </div>
        )}
        {mensajes?.map((m) => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.remitente === 'cliente' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%', padding: '10px 14px', borderRadius: 18,
              borderBottomRightRadius: m.remitente === 'cliente' ? 4 : 18,
              borderBottomLeftRadius: m.remitente === 'admin' ? 4 : 18,
              background: m.remitente === 'cliente' ? '#E07560' : '#FFFFFF',
              border: m.remitente === 'admin' ? '1px solid rgba(201,160,140,0.25)' : 'none',
              boxShadow: '0 2px 8px rgba(44,31,23,0.06)',
            }}>
              <p style={{
                fontFamily: 'var(--font-montserrat)', fontSize: 14, lineHeight: 1.5,
                color: m.remitente === 'cliente' ? '#FEFCF8' : 'var(--espresso)',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>
                {m.texto}
              </p>
              <p style={{
                fontFamily: 'var(--font-montserrat)', fontSize: 9, marginTop: 4, textAlign: 'right',
                color: m.remitente === 'cliente' ? 'rgba(254,252,248,0.7)' : 'var(--taupe)',
              }}>
                {fmtHora(m.created_at)}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{
        display: 'flex', gap: 8, padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
        background: 'rgba(255,255,255,0.9)', borderTop: '1px solid rgba(201,160,140,0.18)', flexShrink: 0,
      }}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') enviar() }}
          placeholder="Escribe tu mensaje..."
          style={{
            flex: 1, padding: '12px 16px', borderRadius: 24, border: '1px solid rgba(196,160,140,0.3)',
            background: '#FFFFFF', fontFamily: 'var(--font-montserrat)', fontSize: 14,
            color: 'var(--espresso)', outline: 'none',
          }}
        />
        <button
          onClick={enviar}
          disabled={!texto.trim() || enviando}
          style={{
            width: 44, height: 44, borderRadius: '50%', border: 'none',
            background: texto.trim() ? '#E07560' : 'rgba(224,117,96,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: texto.trim() ? 'pointer' : 'not-allowed', flexShrink: 0,
          }}
          aria-label="Enviar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FEFCF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
