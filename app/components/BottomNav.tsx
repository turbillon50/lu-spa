'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CalendarHeart, ShoppingBag, Sparkles, User } from 'lucide-react'
import { cn } from '../lib/cn'

const tabs = [
  { href: '/home', label: 'Inicio', icon: Home },
  { href: '/services', label: 'Servicios', icon: Sparkles },
  { href: '/appointments', label: 'Citas', icon: CalendarHeart },
  { href: '/store', label: 'Tienda', icon: ShoppingBag },
  { href: '/profile', label: 'Perfil', icon: User }
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="pointer-events-auto mx-3 mb-3 grid w-full max-w-[412px] grid-cols-5 gap-1 rounded-3xl bg-white/85 p-2 shadow-lift backdrop-blur-xl">
        {tabs.map((t) => {
          const active = pathname === t.href || pathname.startsWith(t.href + '/')
          const Icon = t.icon
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn('nav-tab', active && 'nav-tab-active')}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={18} strokeWidth={1.7} />
              <span>{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
