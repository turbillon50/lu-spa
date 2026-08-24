'use client'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useMode, type DemoMode } from '../lib/mode'

const modes: { id: DemoMode; name: string; sub: string; initials: string; bg: string; textColor: string }[] = [
  {
    id: 'guest',
    name: 'Invitada',
    sub: 'Experiencia pública',
    initials: '?',
    bg: '#EFE1D9',
    textColor: '#6B5B4E',
  },
  {
    id: 'client',
    name: 'Mariana Reyes',
    sub: 'Membresía Signature activa',
    initials: 'MR',
    bg: '#2C1F17',
    textColor: '#FEFCF8',
  },
  {
    id: 'admin',
    name: 'Administración',
    sub: 'Gestión completa del spa',
    initials: 'A',
    bg: '#C9A08C',
    textColor: '#1A1209',
  },
]

export function ModeSelector({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { mode, setMode } = useMode()
  const router = useRouter()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const handleSelect = (m: DemoMode) => {
    setMode(m)
    onClose()
    if (m === 'admin') router.push('/admin')
    else if (m === 'client') router.push('/mi-lucienne')
    else router.push('/home')
  }

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(26,18,9,0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        style={{
          background: '#FEFCF8',
          borderRadius: '24px 24px 0 0',
          padding: '28px 24px 40px',
          width: '100%', maxWidth: 480,
          boxShadow: '0 -8px 40px rgba(44,31,23,0.18)',
          animation: 'slideUp 0.3s cubic-bezier(.22,1,.36,1)',
          border: '1px solid rgba(201,160,140,0.15)',
          borderBottom: 'none',
        }}
      >
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: '#D4C5B0', margin: '0 auto 24px',
        }} />

        <p style={{
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: 'var(--font-montserrat)', color: '#8C7A6B', fontWeight: 500,
          marginBottom: 20, textAlign: 'center',
        }}>
          Modo demo — selecciona una cuenta
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {modes.map((m) => {
            const active = mode === m.id
            return (
              <button
                key={m.id}
                onClick={() => handleSelect(m.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 16, border: 'none',
                  background: active ? 'rgba(201,160,140,0.08)' : 'transparent',
                  cursor: 'pointer', width: '100%', textAlign: 'left',
                  outline: active ? '1px solid rgba(201,160,140,0.35)' : 'none',
                  transition: 'all 0.2s cubic-bezier(.22,1,.36,1)',
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: m.bg, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontFamily: 'var(--font-montserrat)', fontWeight: 700,
                  color: m.textColor,
                }}>
                  {m.id === 'guest' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={m.textColor} strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  ) : m.initials}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-montserrat)', fontSize: 14,
                    fontWeight: 600, color: '#2C1F17', letterSpacing: '-0.01em',
                  }}>
                    {m.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-montserrat)', fontSize: 12,
                    color: '#8C7A6B', marginTop: 2,
                  }}>
                    {m.sub}
                  </div>
                </div>

                {active && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A08C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
    </div>,
    document.body
  )
}
