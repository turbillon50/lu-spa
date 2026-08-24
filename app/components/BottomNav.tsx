'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z"/>
      <path d="M9 21v-9h6v9"/>
    </svg>
  )
}

function IconSparkle({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor"
      strokeWidth={active ? 0 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c.6 3.2 1.2 4.6 2.4 5.9 1.2 1.3 2.7 2 5.6 2.6-2.9.6-4.4 1.3-5.6 2.6-1.2 1.3-1.8 2.7-2.4 5.9-.6-3.2-1.2-4.6-2.4-5.9-1.2-1.3-2.7-2-5.6-2.6 2.9-.6 4.4-1.3 5.6-2.6C10.8 7.6 11.4 6.2 12 3z"/>
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
      <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  )
}

function IconDiamond({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3L12 22l9.3-11.7L17 3H7L2.7 10.3z"/>
      <path d="M7 3l5 7.3L17 3M2.7 10.3h18.6"/>
    </svg>
  )
}

function IconUser({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}

const tabs: {
  href: string
  label: string
  Icon: (p: { active: boolean }) => React.ReactElement
  center?: boolean
}[] = [
  { href: '/home', label: 'Inicio', Icon: IconHome },
  { href: '/experiencias', label: 'Experiencias', Icon: IconSparkle },
  { href: '/reservar', label: 'Reservar', Icon: IconCalendar, center: true },
  { href: '/membresia', label: 'Membresía', Icon: IconDiamond },
  { href: '/mi-lucienne', label: 'Mi Lucienne', Icon: IconUser },
]

function TabTransitionOverlay() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: '#0A0603',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'tabFadeIn 0.15s ease forwards',
    }}>
      <div style={{
        position: 'absolute', width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,117,96,0.22) 0%, rgba(201,160,140,0.10) 45%, transparent 70%)',
      }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/brand/logo-mark.png" alt=""
        style={{
          width: 64, height: 64, borderRadius: '50%', objectFit: 'cover',
          boxShadow: '0 0 32px rgba(201,160,140,0.28)',
          animation: 'tabLogoPulse 0.5s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes tabFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes tabLogoPulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.08) } }
      `}</style>
    </div>
  )
}

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [transitioning, setTransitioning] = useState(false)

  if (pathname.startsWith('/admin') || pathname === '/splash') return null

  const navigate = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === href || pathname.startsWith(href + '/')) return
    setTransitioning(true)
    window.setTimeout(() => {
      router.push(href)
      window.setTimeout(() => setTransitioning(false), 220)
    }, 200)
  }

  return (
    <nav
      className="lg:hidden"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'center',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div
        style={{
          background: 'rgba(250,245,240,0.88)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          /* Specular highlight (top 1px), gold hairline below it, ambient shadow */
          borderTop: 'none',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.70), ' +
            '0 -1px 0 rgba(201,160,140,0.14), ' +
            '0 -8px 32px rgba(44,31,23,0.07)',
          width: '100%',
          maxWidth: '600px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          padding: '8px 4px 10px',
          alignItems: 'end',
        }}
      >
        {tabs.map((tab) => {
          const active =
            pathname === tab.href || pathname.startsWith(tab.href + '/')

          if (tab.center) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={navigate(tab.href)}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 4,
                  textDecoration: 'none', marginTop: -20,
                }}
                aria-label="Reservar"
              >
                <div
                  style={{
                    background: '#E07560',
                    borderRadius: '50%',
                    width: 54, height: 54,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FEFCF8',
                    border: '2px solid rgba(201,160,140,0.35)',
                    animation: active ? 'none' : 'pulseGlow 3.5s ease-in-out infinite',
                    transition: 'transform 0.15s var(--spring)',
                  }}
                >
                  <IconCalendar />
                </div>
                <span style={{
                  fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-montserrat)',
                  color: active ? '#2C1F17' : '#8C7A6B',
                  fontWeight: 600,
                }}>
                  {tab.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              onClick={navigate(tab.href)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 4, padding: '6px 4px 4px', borderRadius: 12,
                textDecoration: 'none', position: 'relative',
                color: active ? '#2C1F17' : '#8C7A6B',
                transition: 'color 0.2s var(--spring)',
              }}
              aria-current={active ? 'page' : undefined}
            >
              <tab.Icon active={active} />
              <span style={{
                fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: active ? 600 : 400,
              }}>
                {tab.label}
              </span>
              {/* Active pill indicator */}
              {active && (
                <div style={{
                  position: 'absolute', bottom: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 18, height: 2, borderRadius: 1,
                  background: 'var(--espresso)',
                  animation: 'activePill 0.2s var(--spring) both',
                }} />
              )}
            </Link>
          )
        })}
      </div>
      {transitioning && <TabTransitionOverlay />}
    </nav>
  )
}
