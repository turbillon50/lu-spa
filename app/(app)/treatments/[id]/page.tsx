'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Check, Clock, Sparkles, ShieldCheck } from 'lucide-react'
import { TopBar } from '../../../components/TopBar'
import { treatmentById } from '../../../data/treatments'
import { useStore } from '../../../lib/providers'
import { formatPrice, cn } from '../../../lib/cn'
import { notFound } from 'next/navigation'

export default function TreatmentPage({ params }: { params: { id: string } }) {
  const t = treatmentById(params.id)
  if (!t) notFound()
  const { favorites, toggleFavorite } = useStore()
  const router = useRouter()
  const fav = favorites.includes(t.id)

  return (
    <>
      <TopBar
        title="Detalle del servicio"
        action={
          <button
            aria-label="Favorito"
            onClick={() => toggleFavorite(t.id)}
            className={cn(
              'grid h-10 w-10 place-items-center rounded-full bg-white/80 shadow-soft',
              fav ? 'text-rose-600' : 'text-ink-500'
            )}
          >
            <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
          </button>
        }
      />

      <div className="px-5 pt-3">
        <div className="relative h-64 w-full overflow-hidden rounded-3xl shadow-soft">
          <Image src={t.image} alt={t.name} fill sizes="440px" className="object-cover" unoptimized />
        </div>
      </div>

      <section className="px-5 pt-6">
        <p className="eyebrow capitalize">{t.category}</p>
        <h1 className="hero-title mt-1 text-[34px]">{t.name}</h1>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat icon={<Clock size={16} />} label={`${t.duration} min`} sub="Duración" />
          <Stat icon={<Sparkles size={16} />} label={formatPrice(t.price)} sub="Precio" />
          <Stat icon={<ShieldCheck size={16} />} label="Inmediatos" sub="Resultados" />
        </div>

        <h2 className="mt-7 section-title">Descripción</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-700/85">{t.description}</p>

        <h2 className="mt-7 section-title">Incluye</h2>
        <ul className="mt-2 grid gap-2">
          {t.includes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[14px] text-ink-700/85">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-100 text-rose-600">
                <Check size={14} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-7 section-title">Beneficios</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.benefits.map((b) => (
            <span key={b} className="chip">{b}</span>
          ))}
        </div>
      </section>

      <div className="safe-bottom sticky bottom-0 z-30 mt-8 border-t border-rose-100/70 bg-white/85 px-5 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-500">Desde</p>
            <p className="price text-[22px]">{formatPrice(t.price)}</p>
          </div>
          <button
            onClick={() => router.push(`/booking/${t.id}`)}
            className="btn-primary !w-auto px-8"
          >
            Reservar ahora
          </button>
        </div>
      </div>
    </>
  )
}

function Stat({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white/80 p-3 text-center shadow-soft">
      <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-rose-100 text-rose-600">
        {icon}
      </span>
      <p className="mt-2 text-[13px] font-semibold text-ink-900">{label}</p>
      <p className="text-[10px] uppercase tracking-widest text-ink-500">{sub}</p>
    </div>
  )
}
