'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'

type IconName = 'today' | 'calendar' | 'clients' | 'messages' | 'team' | 'services'
  | 'cash' | 'inventory' | 'memberships' | 'analytics' | 'settings'
type NavItem = { href: string; label: string; icon: IconName; exact?: boolean }
type NavGroup = { label: string; items: NavItem[] }

const paths: Record<IconName, ReactNode> = {
  today: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M8 14h3v3H8z"/></>,
  clients: <><circle cx="9" cy="8" r="4"/><path d="M3 21v-2a5 5 0 015-5h2M16 11a3 3 0 100-6M14 21v-1a4 4 0 014-4h1"/></>,
  messages: <path d="M21 12a8 8 0 01-8 8 8.7 8.7 0 01-3.7-.8L3 21l1.8-5.4A8 8 0 1112 20"/>,
  team: <><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0114 0M19 5h2v6h-2M18 8h4"/></>,
  services: <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r=".5" fill="currentColor"/><circle cx="3.5" cy="12" r=".5" fill="currentColor"/><circle cx="3.5" cy="18" r=".5" fill="currentColor"/></>,
  cash: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M16 14h2"/></>,
  inventory: <><path d="M4 7l8-4 8 4-8 4-8-4zM4 7v10l8 4 8-4V7M12 11v10"/></>,
  memberships: <><path d="M3 8h18v12H3zM3 12h18M12 8v12M8 8c-2 0-3-1-3-2.5S6.2 3 7.5 3C10 3 12 8 12 8M16 8c2 0 3-1 3-2.5S17.8 3 16.5 3C14 3 12 8 12 8"/></>,
  analytics: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0015 6l-.3-2.6h-4L10.5 6A7 7 0 008.9 7L6.5 6.1l-2 3.4 2 1.5a7 7 0 000 2l-2 1.5 2 3.4 2.4-1a7 7 0 001.6 1l.2 2.6h4l.3-2.6a7 7 0 001.5-1l2.4 1 2-3.4-2-1.5a7 7 0 00.1-1z"/></>,
}

function Icon({ name }: { name: IconName }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const groups: NavGroup[] = [
  { label: 'Operación', items: [
    { href: '/admin', label: 'Hoy', icon: 'today' as const, exact: true },
    { href: '/admin/reservas', label: 'Agenda', icon: 'calendar' as const },
    { href: '/admin/clientas', label: 'Clientas', icon: 'clients' as const },
    { href: '/admin/mensajes', label: 'Mensajes', icon: 'messages' as const },
  ] },
  { label: 'Spa', items: [
    { href: '/admin/equipo', label: 'Equipo y cabinas', icon: 'team' as const },
    { href: '/admin/servicios', label: 'Servicios', icon: 'services' as const },
    { href: '/admin/caja', label: 'Caja', icon: 'cash' as const },
    { href: '/admin/inventario', label: 'Inventario', icon: 'inventory' as const },
    { href: '/admin/membresias', label: 'Membresías y regalos', icon: 'memberships' as const },
  ] },
  { label: 'Dirección', items: [
    { href: '/admin/analytics', label: 'Analytics', icon: 'analytics' as const },
    { href: '/admin/configuracion', label: 'Configuración', icon: 'settings' as const },
  ] },
]

function Navigation({ collapsed, embedded, pathname }: { collapsed: boolean; embedded: boolean; pathname: string }) {
  return (
    <>
      <div className="admin-brand">
        <Image src="/img/brand/logo-mark.png" width={40} height={40} alt="" className="admin-brand__mark" />
        <div className="admin-brand__copy"><strong>Lucienne</strong><span>Administración</span></div>
      </div>
      <nav className="admin-nav" aria-label="Administración">
        {groups.map((group) => (
          <div className="admin-nav__group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
              return (
                <Link href={`${item.href}${embedded ? '?embed=1' : ''}`} key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} title={collapsed ? item.label : undefined}>
                  <Icon name={item.icon} /><span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <div className="admin-sidebar__foot">
        {embedded ? <span className="admin-live-chip">VForge · live</span> : (
          <form action="/api/admin/session?logout=1" method="post"><button type="submit" className="admin-text-button">Cerrar sesión</button></form>
        )}
      </div>
    </>
  )
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const embedded = searchParams.get('embed') === '1' || searchParams.get('vforge') === '1'

  useEffect(() => setCollapsed(localStorage.getItem('lucienne-admin-collapsed') === '1'), [])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === 'Escape') { setSearchOpen(false); setDrawerOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { if (searchOpen) window.setTimeout(() => searchRef.current?.focus(), 30) }, [searchOpen])
  useEffect(() => setDrawerOpen(false), [pathname])

  const allItems = groups.flatMap((group) => group.items)
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return normalized ? allItems.filter((item) => item.label.toLowerCase().includes(normalized)) : allItems
  }, [query])
  const toggleCollapsed = () => setCollapsed((value) => {
    localStorage.setItem('lucienne-admin-collapsed', value ? '0' : '1')
    return !value
  })

  if (pathname === '/admin/acceso') return <>{children}</>

  return (
    <div className={`lu-admin ${collapsed ? 'is-collapsed' : ''}`}>
      <aside className="admin-sidebar"><Navigation collapsed={collapsed} embedded={embedded} pathname={pathname} /></aside>
      <button type="button" className={`admin-drawer-backdrop ${drawerOpen ? 'is-open' : ''}`} onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú" />
      <aside className={`admin-drawer ${drawerOpen ? 'is-open' : ''}`} aria-hidden={!drawerOpen}><Navigation collapsed={false} embedded={embedded} pathname={pathname} /></aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <button type="button" className="admin-icon-button admin-mobile-menu" onClick={() => setDrawerOpen(true)} aria-label="Abrir menú"><span/><span/><span/></button>
            <button type="button" className="admin-icon-button admin-collapse" onClick={toggleCollapsed} aria-label={collapsed ? 'Expandir navegación' : 'Contraer navegación'}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={collapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'}/></svg></button>
            <div><p className="admin-topbar__title">Centro operativo</p><p className="admin-topbar__date">{new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Mexico_City' }).format(new Date())}</p></div>
          </div>
          <div className="admin-topbar__actions">
            <button type="button" className="admin-search-trigger" onClick={() => setSearchOpen(true)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><span>Buscar</span><kbd>⌘K</kbd></button>
            <span className="admin-status"><i/> Operación conectada</span>
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>
      {searchOpen ? (
        <div className="admin-command" role="dialog" aria-modal="true" aria-label="Buscar en el panel" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false) }}>
          <div className="admin-command__panel">
            <label><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ir a una sección…" /></label>
            <div className="admin-command__results">
              {matches.map((item) => <Link href={item.href} key={item.href} onClick={() => setSearchOpen(false)}><Icon name={item.icon}/><span>{item.label}</span><small>Ir</small></Link>)}
              {!matches.length ? <p>No hay una sección con ese nombre.</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
