'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMode } from '../lib/mode'
import { useEffect } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg> },
  { href: '/admin/reservas', label: 'Reservas', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg> },
  { href: '/admin/clientas', label: 'Clientas', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4"/><circle cx="17" cy="17" r="4"/><path d="M21 13v4l-2 2"/></svg> },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { mode } = useMode()
  const router = useRouter()

  useEffect(() => {
    if (mode !== 'admin') {
      router.replace('/home')
    }
  }, [mode, router])

  if (mode !== 'admin') return null

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', display: 'flex' }}>

      {/* Sidebar — desktop */}
      <aside style={{ width: 220, background: 'rgba(15,12,10,0.95)', borderRight: '1px solid rgba(201,169,107,0.1)', padding: '20px 0', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 20 }} className="hidden-mobile">
        <div style={{ padding: '16px 20px 24px' }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: '#FEFCF8', fontWeight: 400, letterSpacing: '0.04em' }}>Lucienne</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.6)', marginTop: 2 }}>Administración</p>
        </div>
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {navItems.map((item) => {
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, marginBottom: 4, textDecoration: 'none', background: active ? 'rgba(201,169,107,0.12)' : 'transparent', color: active ? '#C9A96B' : 'rgba(254,252,248,0.5)', transition: 'all 0.2s' }}>
                {item.icon}
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: active ? 600 : 400 }}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(201,169,107,0.1)' }}>
          <Link href="/home" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.35)', textDecoration: 'none', letterSpacing: '0.06em' }}>← Salir del admin</Link>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Mobile top nav */}
        <div style={{ background: 'rgba(15,12,10,0.98)', borderBottom: '1px solid rgba(201,169,107,0.1)', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#FEFCF8' }}>Lucienne <span style={{ color: 'rgba(201,169,107,0.6)', fontSize: 14, fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>Admin</span></p>
          <Link href="/home" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,169,107,0.6)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Salir</Link>
        </div>

        {/* Mobile bottom nav */}
        <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(10,8,20,0.97)', borderTop: '1px solid rgba(201,169,107,0.1)', display: 'flex', justifyContent: 'space-around', padding: '10px 0', paddingBottom: 'calc(10px + env(safe-area-inset-bottom))', zIndex: 100 }}>
          {navItems.map((item) => {
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none', color: active ? '#C9A96B' : 'rgba(254,252,248,0.35)', minWidth: 60 }}>
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
