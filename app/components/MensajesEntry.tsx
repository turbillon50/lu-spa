'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Tarjeta de entrada al chat, arriba en el perfil -- Luis la quiere elevada,
// no escondida como una notificacion mas.
export function MensajesEntry() {
  const [ultimo, setUltimo] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/mensajes')
      .then((r) => (r.ok ? r.json() : { mensajes: [] }))
      .then((data) => {
        const msgs = data.mensajes || []
        setUltimo(msgs.length > 0 ? msgs[msgs.length - 1].texto : null)
      })
      .catch(() => {})
  }, [])

  return (
    <Link href="/mensajes" style={{
      margin: '0 24px 28px', display: 'flex', alignItems: 'center', gap: 14,
      background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(201,160,140,0.22)',
      borderRadius: 18, padding: '16px 18px', textDecoration: 'none',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
        background: 'var(--espresso)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A08C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', fontWeight: 500, marginBottom: 2 }}>
          Escríbenos
        </p>
        <p style={{
          fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {ultimo || 'Dudas, cambios de cita o lo que necesites'}
        </p>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="2" style={{ flexShrink: 0 }}>
        <path d="M9 6l6 6-6 6"/>
      </svg>
    </Link>
  )
}
