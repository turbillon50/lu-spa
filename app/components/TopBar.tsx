'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { ModeSelector } from './ModeSelector'
import { useMode } from '../lib/mode'

const menuSections = [
  {
    items: [
      { href: '/home', label: 'Inicio' },
      { href: '/experiencias', label: 'Experiencias' },
      { href: '/relajate', label: 'Masajes & Rituales' },
      { href: '/renueva', label: 'Faciales' },
      { href: '/transforma', label: 'Aparatología' },
      { href: '/membresia', label: 'Membresías' },
    ],
  },
  {
    items: [
      { href: '/para-dos', label: 'Para Dos' },
      { href: '/gift-cards', label: 'Gift Cards' },
      { href: '/galeria', label: 'Galería' },
      { href: '/conocenos', label: 'Conócenos' },
      { href: '/journal', label: 'Journal' },
      { href: '/faq', label: 'Preguntas frecuentes' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
]

const desktopNavPrimary = [
  { href: '/home', label: 'Inicio' },
  { href: '/experiencias', label: 'Experiencias' },
  { href: '/relajate', label: 'Tratamientos' },
  { href: '/transforma', label: 'Aparatología' },
  { href: '/membresia', label: 'Membresías' },
]

const desktopNavMore = [
  { href: '/gift-cards', label: 'Gift Cards' },
  { href: '/para-dos', label: 'Para Dos' },
  { href: '/galeria', label: 'Galería' },
  { href: '/conocenos', label: 'Conócenos' },
  { href: '/journal', label: 'Journal' },
  { href: '/contacto', label: 'Contacto' },
]

function HamburgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <line x1="4" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <line x1="8" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )
}

function FullScreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  let itemIndex = 0

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'var(--ivory-warm)',
        animation: 'menuFadeIn 0.22s ease both',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* Top row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(201,169,107,0.1)',
      }}>
        <Link href="/home" onClick={onClose} style={{ textDecoration: 'none' }}>
          <Logo size="sm" tone="dark" />
        </Link>
        <button
          onClick={onClose}
          style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'rgba(44,31,23,0.07)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--espresso)',
          }}
          aria-label="Cerrar menú"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Nav sections */}
      <div style={{ flex: 1, padding: '32px 28px 24px' }}>
        {menuSections.map((section, si) => (
          <div key={si} style={{ marginBottom: si === 0 ? 32 : 0 }}>
            {section.items.map((item) => {
              const delay = itemIndex++ * 55
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'block',
                    fontFamily: si === 0 ? 'var(--font-cormorant)' : 'var(--font-montserrat)',
                    fontSize: si === 0 ? 'clamp(30px, 7vw, 40px)' : 13,
                    fontWeight: si === 0 ? 300 : 400,
                    letterSpacing: si === 0 ? '0.01em' : '0.1em',
                    textTransform: si === 0 ? 'none' : 'uppercase',
                    color: active ? 'var(--espresso)' : si === 0 ? 'var(--cocoa)' : 'var(--taupe)',
                    textDecoration: 'none',
                    paddingBottom: si === 0 ? '14px' : '10px',
                    borderBottom: `1px solid rgba(201,169,107,${si === 0 ? '0.1' : '0.07'})`,
                    marginBottom: si === 0 ? '0' : '0',
                    animation: `menuItemIn 0.35s cubic-bezier(.22,1,.36,1) ${delay}ms both`,
                    opacity: 0,
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Bottom — script phrase + reservar */}
      <div style={{ padding: '0 28px calc(32px + env(safe-area-inset-bottom))' }}>
        <p style={{
          fontFamily: 'var(--font-pinyon)',
          fontSize: 26, color: 'var(--taupe)', opacity: 0.7,
          marginBottom: 20,
          animation: 'menuItemIn 0.35s cubic-bezier(.22,1,.36,1) 600ms both',
        }}>
          Tu momento.
        </p>
        <Link
          href="/reservar"
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--espresso)', color: '#FEFCF8',
            padding: '14px', borderRadius: 22, textDecoration: 'none',
            fontFamily: 'var(--font-montserrat)', fontSize: 11,
            letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
            animation: 'menuItemIn 0.35s cubic-bezier(.22,1,.36,1) 640ms both',
          }}
        >
          Reserva tu espacio
        </Link>
      </div>
    </div>
  )
}

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
        transition: 'all 0.25s var(--spring)',
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

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
          background: 'rgba(254,252,248,0.94)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
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
                  transition: 'background 0.2s',
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
      {/* Mobile header */}
      <header
        className="lg:hidden"
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(254,252,248,0.92)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          borderBottom: '1px solid rgba(201,169,107,0.13)',
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
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                width: 36, height: 36, background: 'none', border: 'none',
                cursor: 'pointer', color: 'var(--espresso)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8,
              }}
              aria-label="Abrir menú"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop header */}
      <header
        className="hidden lg:flex"
        style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(254,252,248,0.96)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          borderBottom: '1px solid rgba(201,169,107,0.13)',
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

          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {desktopNavPrimary.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: 'none', fontSize: 11, letterSpacing: '0.09em',
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

            {/* Más dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-montserrat)', fontWeight: 400, color: '#6B5B4E',
                  display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s',
                  paddingBottom: 2, borderBottom: '1px solid transparent',
                }}
              >
                Más
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {moreOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                  background: '#FEFCF8', borderRadius: 14,
                  border: '1px solid rgba(201,169,107,0.15)',
                  boxShadow: '0 8px 40px rgba(44,31,23,0.1)',
                  minWidth: 180, padding: '8px 0',
                  zIndex: 60, animation: 'menuFadeIn 0.15s ease both',
                }}>
                  {desktopNavMore.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: 'block', padding: '9px 18px',
                        fontFamily: 'var(--font-montserrat)', fontSize: 12,
                        letterSpacing: '0.06em', color: '#6B5B4E',
                        textDecoration: 'none', transition: 'background 0.15s',
                      }}
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
                textDecoration: 'none', transition: 'all 0.25s var(--spring)',
              }}
            >
              Reserva tu espacio
            </Link>
            <AvatarButton onClick={() => setModeOpen(true)} mode={mode} />
          </div>
        </div>
      </header>

      <ModeSelector open={modeOpen} onClose={() => setModeOpen(false)} />
      <FullScreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
