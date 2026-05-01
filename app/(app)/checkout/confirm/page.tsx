'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Check, CalendarPlus } from 'lucide-react'
import { TopBar } from '../../../components/TopBar'
import { useStore } from '../../../lib/providers'
import { treatmentById } from '../../../data/treatments'
import { formatLongDate } from '../../../lib/cn'

export default function ConfirmPage() {
  const { appointments } = useStore()
  const recent = [...appointments].sort((a, b) => b.createdAt - a.createdAt).slice(0, 2)

  return (
    <>
      <TopBar title="Confirmación" back="/home" />

      <section className="flex flex-col items-center px-5 pt-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-rose-100 text-rose-600 shadow-soft">
          <Check size={36} strokeWidth={2.4} />
        </div>
        <h1 className="hero-title mt-4 text-[28px]">¡Reserva confirmada!</h1>
        <p className="mt-2 text-[13px] text-ink-500">
          Hemos enviado los detalles a tu correo y WhatsApp con recomendaciones previas.
        </p>
      </section>

      <section className="px-5 pt-6">
        <div className="grid gap-3">
          {recent.map((a) => {
            const t = treatmentById(a.treatmentId)
            if (!t) return null
            return (
              <article key={a.id} className="card-soft flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
                  <Image src={t.image} alt={t.name} fill sizes="60px" className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[16px] leading-tight">{t.name}</h3>
                  <p className="text-[12px] capitalize text-ink-500">
                    {formatLongDate(a.date)} · {a.time}
                  </p>
                  <p className="text-[11px] text-ink-500">{a.cabin}</p>
                </div>
              </article>
            )
          })}
        </div>

        <button className="btn-ghost mt-4 inline-flex items-center justify-center gap-2">
          <CalendarPlus size={16} /> Agregar a mi calendario
        </button>
      </section>

      <div className="safe-bottom mt-8 px-5 pb-6">
        <Link href="/appointments" className="btn-rose">
          Ir a mis citas
        </Link>
      </div>
    </>
  )
}
