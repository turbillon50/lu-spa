'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronRight,
  CalendarHeart,
  CreditCard,
  Heart,
  Bell,
  Users,
  LogOut,
  ShieldCheck,
  Pencil
} from 'lucide-react'
import { TopBar } from '../../components/TopBar'
import { useStore } from '../../lib/providers'

export default function ProfilePage() {
  const { user, signOut, favorites, appointments } = useStore()
  const router = useRouter()

  const items = [
    { icon: <CalendarHeart size={18} />, label: 'Mis citas', sub: `${appointments.length} en total`, href: '/appointments' },
    { icon: <Heart size={18} />, label: 'Mis favoritos', sub: `${favorites.length} guardados`, href: '/services' },
    { icon: <CreditCard size={18} />, label: 'Métodos de pago', sub: 'Tarjeta · Apple Pay', href: '/checkout' },
    { icon: <Bell size={18} />, label: 'Notificaciones', sub: 'Preferencias y alertas', href: '/notifications' },
    { icon: <Users size={18} />, label: 'Referidos', sub: 'Comparte y gana', href: '/promotions' },
    { icon: <ShieldCheck size={18} />, label: 'Privacidad', sub: 'Aviso y términos', href: '/profile' }
  ]

  return (
    <>
      <TopBar title="Perfil" back={false} />

      <section className="px-5 pt-3">
        <article className="card-soft flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-rose-200">
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-[20px] text-white">{(user?.name ?? 'U')[0]}</span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-[20px] leading-tight">{user?.name}</h2>
            <p className="text-[12px] text-ink-500">{user?.email}</p>
            {user?.member && <span className="chip mt-2 text-rose-700">Lucienne Club</span>}
          </div>
          <button aria-label="Editar" className="grid h-10 w-10 place-items-center rounded-full bg-rose-50 text-rose-600">
            <Pencil size={16} />
          </button>
        </article>
      </section>

      <section className="px-5 pt-5">
        <p className="eyebrow mb-2">Mis datos</p>
        <div className="grid gap-2">
          {items.map((it) => (
            <Link
              key={it.label}
              href={it.href}
              className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/85 p-3 shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-50 text-rose-600">
                {it.icon}
              </span>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-ink-900">{it.label}</p>
                <p className="text-[11px] text-ink-500">{it.sub}</p>
              </div>
              <ChevronRight size={18} className="text-ink-500" />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <p className="eyebrow mb-2">Preferencias</p>
        <article className="card-soft">
          <p className="text-[13px] text-ink-700/80">{user?.preferences ?? 'Aún no has configurado tus preferencias.'}</p>
        </article>
      </section>

      <div className="px-5 pt-6 pb-12">
        <button
          onClick={() => {
            signOut()
            router.replace('/login')
          }}
          className="btn-ghost inline-flex items-center justify-center gap-2 text-rose-600"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>
      </div>
    </>
  )
}
