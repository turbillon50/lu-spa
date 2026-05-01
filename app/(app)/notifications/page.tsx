'use client'
import { Bell, BellRing, Cake, Sparkles, Tag } from 'lucide-react'
import { TopBar } from '../../components/TopBar'
import { EmptyState } from '../../components/EmptyState'
import { useStore } from '../../lib/providers'
import { cn } from '../../lib/cn'

const ICONS = {
  reminder: BellRing,
  promo: Tag,
  news: Sparkles,
  birthday: Cake
} as const

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore()

  return (
    <>
      <TopBar
        title="Notificaciones"
        action={
          notifications.some((n) => !n.read) ? (
            <button
              aria-label="Marcar todas"
              onClick={markAllNotificationsRead}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink-700 shadow-soft"
            >
              <Bell size={18} />
            </button>
          ) : null
        }
      />

      <section className="px-5 pt-3">
        {notifications.length === 0 ? (
          <EmptyState title="Sin notificaciones" body="Te avisaremos cuando tengamos novedades." />
        ) : (
          <div className="grid gap-3">
            {notifications.map((n) => {
              const Icon = ICONS[n.type]
              return (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-3xl border p-4 text-left transition',
                    n.read ? 'border-rose-100 bg-white/70' : 'border-rose-200 bg-white shadow-soft'
                  )}
                >
                  <span
                    className={cn(
                      'grid h-10 w-10 place-items-center rounded-full',
                      n.read ? 'bg-rose-50 text-rose-500' : 'bg-rose-gradient text-white'
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[16px] leading-tight">{n.title}</h3>
                      {!n.read && <span className="mt-2 h-2 w-2 rounded-full bg-rose-500" />}
                    </div>
                    <p className="mt-1 text-[13px] text-ink-500">{n.body}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-widest text-ink-500/70">{n.date}</p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </section>
      <div className="h-16" />
    </>
  )
}
