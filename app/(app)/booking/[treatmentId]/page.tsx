'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { TopBar } from '../../../components/TopBar'
import { Calendar } from '../../../components/Calendar'
import { treatmentById } from '../../../data/treatments'
import { useStore } from '../../../lib/providers'
import { cn, formatPrice } from '../../../lib/cn'

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

export default function BookingPage({ params }: { params: { treatmentId: string } }) {
  const t = treatmentById(params.treatmentId)
  if (!t) notFound()
  const { addToCart } = useStore()
  const router = useRouter()
  const [date, setDate] = useState<string>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().slice(0, 10)
  })
  const [time, setTime] = useState<string>('11:00')
  const [code, setCode] = useState('')

  const continueToCart = () => {
    addToCart({ treatmentId: t.id, date, time: `${time} ${parseInt(time) >= 12 ? 'PM' : 'AM'}` })
    router.push('/cart')
  }

  return (
    <>
      <TopBar title="Reserva tu cita" />
      <section className="px-5 pt-3">
        <article className="card-soft flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
            <Image src={t.image} alt={t.name} fill sizes="60px" className="object-cover" unoptimized />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-[18px] leading-tight">{t.name}</h2>
            <p className="text-[12px] text-ink-500">
              {t.duration} min · {formatPrice(t.price)}
            </p>
          </div>
        </article>
      </section>

      <section className="px-5 pt-6">
        <h3 className="section-title mb-3">Selecciona fecha</h3>
        <Calendar value={date} onChange={setDate} />
      </section>

      <section className="px-5 pt-6">
        <h3 className="section-title mb-3">Selecciona horario</h3>
        <div className="grid grid-cols-4 gap-2">
          {TIMES.map((slot) => (
            <button
              key={slot}
              onClick={() => setTime(slot)}
              className={cn(
                'rounded-2xl border px-2 py-3 text-[13px] font-medium transition',
                time === slot
                  ? 'border-rose-300 bg-rose-300 text-white shadow-soft'
                  : 'border-rose-100 bg-white/80 text-ink-700'
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <h3 className="section-title mb-3">¿Tienes un código promocional?</h3>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="field"
            placeholder="Escribe tu código"
          />
          <button className="btn-ghost !w-auto px-5">Aplicar</button>
        </div>
      </section>

      <div className="safe-bottom sticky bottom-0 z-30 mt-8 border-t border-rose-100/70 bg-white/85 px-5 py-4 backdrop-blur-xl">
        <button onClick={continueToCart} className="btn-primary">
          Continuar
        </button>
      </div>
    </>
  )
}
