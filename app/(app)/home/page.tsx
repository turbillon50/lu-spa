'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Bell, ChevronRight, Search } from 'lucide-react'
import { useStore } from '../../lib/providers'
import { categories } from '../../data/categories'
import { featuredTreatments, treatmentById } from '../../data/treatments'
import { promotions } from '../../data/promotions'
import { formatPrice, formatLongDate } from '../../lib/cn'

export default function HomePage() {
  const { user, appointments, notifications } = useStore()
  const featured = featuredTreatments()
  const next = appointments.find((a) => a.status === 'confirmed' && new Date(a.date) >= startOfToday())
  const nextTreatment = next ? treatmentById(next.treatmentId) : null
  const unread = notifications.filter((n) => !n.read).length

  return (
    <>
      <header className="safe-top px-5 pt-5">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-rose-200">
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-[20px] text-white">{(user?.name ?? 'U')[0]}</span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-[0.28em] text-gold-600">Hola,</p>
            <p className="font-display text-[22px] leading-tight text-ink-900">
              {user?.name?.split(' ')[0] ?? 'Bienvenida'}
            </p>
          </div>
          <Link
            href="/notifications"
            aria-label="Notificaciones"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white/85 text-ink-700 shadow-soft"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
            )}
          </Link>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-3 shadow-soft">
          <Search size={18} className="text-ink-500" />
          <Link href="/services" className="flex-1 text-left text-sm text-ink-500">
            Buscar tratamiento o promoción
          </Link>
        </div>
      </header>

      <section className="px-5 pt-6">
        {next && nextTreatment ? (
          <Link href="/appointments" className="block">
            <article className="card-dark relative overflow-hidden">
              <div className="absolute inset-0 opacity-25">
                <Image
                  src={nextTreatment.image}
                  alt=""
                  fill
                  sizes="440px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="relative">
                <p className="eyebrow text-gold-300">Tu próxima cita</p>
                <h2 className="mt-2 font-display text-[26px] text-cream-100">{nextTreatment.name}</h2>
                <p className="mt-1 text-[13px] text-cream-100/80 capitalize">
                  {formatLongDate(next.date)} · {next.time}
                </p>
                <p className="mt-1 text-[12px] text-cream-100/60">{next.cabin}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-gold-300">
                  Ver detalles <ChevronRight size={14} />
                </span>
              </div>
            </article>
          </Link>
        ) : (
          <Link href="/services" className="block">
            <article className="card-dark">
              <p className="eyebrow text-gold-300">Reserva tu próxima experiencia</p>
              <h2 className="mt-2 font-display text-[24px] text-cream-100">Tu spa, siempre contigo</h2>
              <p className="mt-1 text-[13px] text-cream-100/80">
                Explora rituales personalizados y reserva en segundos.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-gold-300">
                Reservar ahora <ChevronRight size={14} />
              </span>
            </article>
          </Link>
        )}
      </section>

      <section className="px-5 pt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="section-title">Reservar servicio</h2>
          <Link href="/services" className="btn-link">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/services/${c.slug}`}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/80 p-2 shadow-soft"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image src={c.image} alt={c.name} fill sizes="60px" className="object-cover" unoptimized />
              </div>
              <span className="text-[11px] font-medium text-ink-700">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pt-7">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="section-title">Tratamientos destacados</h2>
          <Link href="/services" className="btn-link">
            Ver todos
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
          {featured.map((t) => (
            <Link
              key={t.id}
              href={`/treatments/${t.id}`}
              className="relative w-[220px] flex-shrink-0 overflow-hidden rounded-3xl bg-white shadow-soft"
            >
              <div className="relative h-32 w-full">
                <Image src={t.image} alt={t.name} fill sizes="220px" className="object-cover" unoptimized />
              </div>
              <div className="p-4">
                <h3 className="font-display text-[18px] leading-tight">{t.name}</h3>
                <p className="mt-1 text-[12px] text-ink-500">{t.short}</p>
                <p className="mt-2 text-[13px] font-medium text-gold-600">{formatPrice(t.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pt-7">
        <h2 className="section-title mb-3">Promociones para ti</h2>
        <Link href={`/promotions`} className="block">
          <article className="relative overflow-hidden rounded-3xl shadow-soft">
            <div className="relative h-44 w-full">
              <Image src={promotions[0].image} alt={promotions[0].title} fill sizes="440px" className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-700/70 via-rose-400/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
              <p className="eyebrow text-cream-100">{promotions[0].discount}</p>
              <h3 className="font-display text-[26px] leading-tight">{promotions[0].title}</h3>
              <p className="text-[13px] text-cream-100/85">{promotions[0].subtitle}</p>
              <span className="mt-2 text-[12px] uppercase tracking-[0.28em] text-cream-100/75">
                {promotions[0].validUntil}
              </span>
            </div>
          </article>
        </Link>
      </section>

      <section className="px-5 pt-7">
        <Link href="/membership" className="card-soft flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-rose-gradient text-white font-display italic">Lc</div>
          <div className="flex-1">
            <p className="eyebrow">Lucienne Club</p>
            <h3 className="font-display text-[20px]">Membresía privada</h3>
            <p className="text-[12px] text-ink-500">Beneficios exclusivos cada mes.</p>
          </div>
          <ChevronRight size={18} className="text-ink-500" />
        </Link>
      </section>

      <div className="h-16" />
    </>
  )
}

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}
