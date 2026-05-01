'use client'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TopBar } from '../../components/TopBar'
import { EmptyState } from '../../components/EmptyState'
import { useStore } from '../../lib/providers'
import { treatmentById } from '../../data/treatments'
import { formatLongDate, cn } from '../../lib/cn'

type Tab = 'upcoming' | 'history'

export default function AppointmentsPage() {
  const { appointments, cancelAppointment } = useStore()
  const [tab, setTab] = useState<Tab>('upcoming')

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const list = appointments.filter((a) => {
    const ad = new Date(a.date)
    if (tab === 'upcoming') return a.status === 'confirmed' && ad >= today
    return a.status !== 'confirmed' || ad < today
  })

  return (
    <>
      <TopBar title="Mis citas" back={false} />
      <div className="px-5 pt-3">
        <div className="grid grid-cols-2 gap-1 rounded-full bg-white/80 p-1 shadow-soft">
          <button
            onClick={() => setTab('upcoming')}
            className={cn(
              'rounded-full py-2 text-[13px] font-medium',
              tab === 'upcoming' ? 'bg-rose-300 text-white shadow-soft' : 'text-ink-500'
            )}
          >
            Próximas
          </button>
          <button
            onClick={() => setTab('history')}
            className={cn(
              'rounded-full py-2 text-[13px] font-medium',
              tab === 'history' ? 'bg-rose-300 text-white shadow-soft' : 'text-ink-500'
            )}
          >
            Historial
          </button>
        </div>
      </div>

      <section className="px-5 pt-5">
        {list.length === 0 ? (
          <EmptyState
            title={tab === 'upcoming' ? 'Sin citas próximas' : 'Sin historial todavía'}
            body={tab === 'upcoming' ? 'Reserva tu próxima experiencia.' : 'Cuando completes una cita aparecerá aquí.'}
            action={
              <Link href="/services" className="btn-rose !w-auto px-6">
                Ver servicios
              </Link>
            }
          />
        ) : (
          <div className="grid gap-3">
            {list.map((a) => {
              const t = treatmentById(a.treatmentId)
              if (!t) return null
              return (
                <article key={a.id} className="card-soft flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                    <Image src={t.image} alt={t.name} fill sizes="80px" className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[16px] leading-tight">{t.name}</h3>
                    <p className="text-[12px] capitalize text-ink-500">
                      {formatLongDate(a.date)} · {a.time}
                    </p>
                    <p className="text-[11px] text-ink-500">{a.cabin}</p>
                    <div className="mt-2 flex gap-2">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest',
                          a.status === 'confirmed' && 'bg-rose-100 text-rose-700',
                          a.status === 'completed' && 'bg-gold-300/40 text-gold-700',
                          a.status === 'cancelled' && 'bg-ink-500/20 text-ink-700'
                        )}
                      >
                        {a.status === 'confirmed' && 'Confirmada'}
                        {a.status === 'completed' && 'Completada'}
                        {a.status === 'cancelled' && 'Cancelada'}
                      </span>
                      {tab === 'upcoming' && a.status === 'confirmed' && (
                        <button
                          onClick={() => cancelAppointment(a.id)}
                          className="text-[11px] font-medium text-rose-600 underline-offset-4 hover:underline"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
      <div className="h-16" />
    </>
  )
}
