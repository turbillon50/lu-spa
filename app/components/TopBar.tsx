'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Logo } from './Logo'
import { ModeSelector } from './ModeSelector'
import { useMode } from '../lib/mode'

const desktopNav = [
  { href: '/home', label: 'Inicio' },
  { href: '/experiencias', label: 'Experiencias' },
  { href: '/relajate', label: 'Tratamientos' },
  { href: '/transforma', label: 'Aparatología' },
  { href: '/membresia', label: 'Membresías' },
  { href: '/gift-cards', label: 'Gift Cards' },
  { href: '/conocenos', label: 'Conócenos' },
  { href: '/journal', label: 'Journal' },
  { href: '/contacto', label: 'Contacto' },
]

function AvatarButton({ onClick, mode }: { onClick: () => void; mode: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 34, height: 34, borderRadius: '50%',
        background: mode === 'client' ? '#2C1F17' : mode === 'admin' ? '#C9A96B' : '#EDE6D9',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontFamily: 'var(--font-montserrat)', fontWeight: 700,
        color: mode === 'client' ? '#FEFCF8' : mode === 'admin' ? '#1A1209' : '#8C7A6B',
        transition: 'all 0.25s cubic-bezier(.22,1,.36,1)',
        flexShrink: 0,
      }}
      aria-label="Cambiar modo de demo"
    >
      {mode === 'client' ? 'MR' : mode === 'admin' ? 'A' : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      )}
    </button>
  )
}

export function TopBar({
  title,
  back,
  action,
}: {
  title?: React.ReactNode
  back?: boolean | string
  action?: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { mode } = useMode()
  const [modeOpen, setModeOpen] = useState(false)

  if (pathname === '/splash') return null

  const modeLabel = mode === 'client' ? 'CLIENTE' : mode === 'admin' ? 'ADMIN' : null

  const handleBack = () => {
    if (typeof back === 'string') router.push(back)
    else router.back()
  }

  const isDetailPage = !!title

  if (isDetailPage) {
    return (
      <>
        <header style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(254,252,248,0.92)',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          borderBottom: '1px solid rgba(201,169,107,0.12)',
          paddingTop: 'env(safe-area-inset-top)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px', gap: 12,
          }}>
            {back ? (
              <button
                onClick={handleBack}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none',
                  background: 'rgba(237,230,217,0.6)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#2C1F17', flexShrink: 0,
                }}
                aria-label="Volver"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            ) : <div style={{ width: 36 }} />}

            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: 'var(--font-cormorant)', fontSize: 18,
              color: '#2C1F17', fontWeight: 500,
            }}>
              {title}
            </div>

            {action ?? <div style={{ width: 36 }} />}
          </div>
        </header>
        <ModeSelector open={modeOpen} onClose={() => setModeOpen(false)} />
      </>
    )
  }

  return (
    <>
      {/* Mobile */}
      <header
        className="lg:hidden"
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(254,252,248,0.90)',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          borderBottom: '1px solid rgba(201,169,107,0.15)',
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 20px', gap: 8,
        }}>
          <Link href="/home" style={{ textDecoration: 'none' }}>
            <Logo size="sm" tone="dark" />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {modeLabel && (
              <span style={{
                fontSize: 9, letterSpacing: '0.15em', fontFamily: 'var(--font-montserrat)',
                fontWeight: 700, color: '#C9A96B',
                background: 'rgba(201,169,107,0.1)', padding: '3px 8px', borderRadius: 20,
                border: '1px solid rgba(201,169,107,0.3)',
              }}>
                {modeLabel}
              </span>
            )}
            <Link href="/buscar" style={{ color: '#6B5B4E', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>
            <AvatarButton onClick={() => setModeOpen(true)} mode={mode} />
          </div>
        </div>
      </header>

      {/* Desktop */}
      <header
        className="hidden lg:flex"
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(254,252,248,0.95)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          borderBottom: '1px solid rgba(201,169,107,0.15)',
          flexDirection: 'column',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 48px', maxWidth: 1440, margin: '0 auto', width: '100%',
        }}>
          <Link href="/home" style={{ textDecoration: 'none' }}>
            <Logo size="sm" tone="dark" />
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {desktopNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: 'none', fontSize: 11, letterSpacing: '0.08em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-montserrat)',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#2C1F17' : '#6B5B4E',
                    borderBottom: active ? '1px solid #C9A96B' : '1px solid transparent',
                    paddingBottom: 2, transition: 'all 0.2s',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {modeLabel && (
              <span style={{
                fontSize: 9, letterSpacing: '0.15em', fontFamily: 'var(--font-montserrat)',
                fontWeight: 700, color: '#C9A96B',
                border: '1px solid rgba(201,169,107,0.4)', padding: '3px 10px', borderRadius: 20,
              }}>
                {modeLabel}
              </span>
            )}
            <Link href="/buscar" style={{ color: '#6B5B4E', textDecoration: 'none', display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>
            <Link
              href="/reservar"
              style={{
                background: '#2C1F17', color: '#FEFCF8',
                padding: '9px 22px', borderRadius: 24,
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: 'var(--font-montserrat)', fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Reserva tu espacio
            </Link>
            <AvatarButton onClick={() => setModeOpen(true)} mode={mode} />
          </div>
        </div>
      </header>

      <ModeSelector open={modeOpen} onClose={() => setModeOpen(false)} />
    </>
  )
}
