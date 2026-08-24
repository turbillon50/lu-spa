'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMode } from '../lib/mode'
import { useEffect, useState } from 'react'

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    exact: true,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
  },
  {
    href: '/admin/mensajes',
    label: 'Mensajes',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
  },
  {
    href: '/admin/reservas',
    label: 'Reservas',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>
  },
  {
    href: '/admin/clientas',
    label: 'Clientas',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4"/><circle cx="17" cy="17" r="4"/><path d="M21 13v4l-2 2"/></svg>
  },
  {
    href: '/admin/servicios',
    label: 'Servicios',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
  },
  {
    href: '/admin/membresias',
    label: 'Membresías',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M2.7 10.3L12 22l9.3-11.7L17 3H7L2.7 10.3z"/><path d="M7 3l5 7.3L17 3M2.7 10.3h18.6"/></svg>
  },
  {
    href: '/admin/gift-cards',
    label: 'Gift Cards',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V21M3 13h18M8 8c0-2 1.5-4 4-4s4 2 4 4"/></svg>
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { mode } = useMode()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && mode !== 'admin') {
      router.replace('/home')
    }
  }, [mode, router, mounted])

  if (!mounted) return <div style={{ background: '#0A0814', minHeight: '100dvh' }} />
  if (mode !== 'admin') return null

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', display: 'flex' }}>

      {/* Sidebar — desktop only */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          width: 220,
          background: 'rgba(15,12,10,0.95)',
          borderRight: '1px solid rgba(201,160,140,0.1)',
          padding: '20px 0',
          flexShrink: 0,
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 20,
        }}
      >
        <div style={{ padding: '16px 20px 24px' }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: '#FEFCF8', fontWeight: 400, letterSpacing: '0.04em' }}>Lucienne</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.6)', marginTop: 2 }}>Administración</p>
        </div>
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10, marginBottom: 4,
                  textDecoration: 'none',
                  background: active ? 'rgba(201,160,140,0.12)' : 'transparent',
                  color: active ? '#C9A08C' : 'rgba(250,245,240,0.5)',
                  transition: 'all 0.2s',
                }}
              >
                {item.icon}
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: active ? 600 : 400 }}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(201,160,140,0.1)' }}>
          <Link href="/home" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.35)', textDecoration: 'none', letterSpacing: '0.06em' }}>← Salir del admin</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-[220px]" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Mobile top nav */}
        <div
          className="lg:hidden"
          style={{
            background: 'rgba(15,12,10,0.98)',
            borderBottom: '1px solid rgba(201,160,140,0.1)',
            padding: '14px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'sticky', top: 0, zIndex: 10,
          }}
        >
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#FEFCF8' }}>
            Lucienne <span style={{ color: 'rgba(201,160,140,0.6)', fontSize: 14, fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>Admin</span>
          </p>
          <Link href="/home" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,160,140,0.6)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Salir</Link>
        </div>

        {/* Desktop header */}
        <div
          className="hidden lg:flex"
          style={{
            background: 'rgba(15,12,10,0.98)',
            borderBottom: '1px solid rgba(201,160,140,0.1)',
            padding: '16px 32px',
            alignItems: 'center', justifyContent: 'space-between',
            position: 'sticky', top: 0, zIndex: 10,
          }}
        >
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: '#FEFCF8' }}>
            Panel de administración
          </p>
          <Link href="/home" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(201,160,140,0.6)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Salir del admin →
          </Link>
        </div>

        {/* Mobile bottom nav */}
        <nav
          className="lg:hidden"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            background: 'rgba(10,8,20,0.97)',
            borderTop: '1px solid rgba(201,160,140,0.1)',
            display: 'flex', justifyContent: 'space-around',
            padding: '10px 0', paddingBottom: 'calc(10px + env(safe-area-inset-bottom))',
            zIndex: 100,
          }}
        >
          {navItems.slice(0, 5).map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  textDecoration: 'none',
                  color: active ? '#C9A08C' : 'rgba(250,245,240,0.35)',
                  minWidth: 52,
                }}
              >
                {item.icon}
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <main style={{ flex: 1, padding: '0 0 calc(80px + env(safe-area-inset-bottom))' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
