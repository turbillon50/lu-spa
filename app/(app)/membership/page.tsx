'use client'
import { useRouter } from 'next/navigation'
import { Check, Sparkles } from 'lucide-react'
import { TopBar } from '../../components/TopBar'
import { membership } from '../../data/membership'
import { useStore } from '../../lib/providers'
import { formatPrice } from '../../lib/cn'

export default function MembershipPage() {
  const router = useRouter()
  const { user } = useStore()

  return (
    <>
      <TopBar title="Membresía" />

      <section className="px-5 pt-3">
        <article className="card-dark relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/30 blur-3xl" />
          <p className="eyebrow text-gold-300">Membresía privada</p>
          <h1 className="hero-title mt-2 text-[32px] text-cream-100">{membership.name}</h1>
          <p className="mt-2 text-[13px] text-cream-100/80">{membership.tagline}</p>

          <ul className="mt-5 grid gap-2 text-[13px] text-cream-100/90">
            {membership.perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-500/20 text-gold-300">
                  <Check size={12} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="font-display text-[28px] text-cream-100">{formatPrice(membership.price)}</p>
              <p className="text-[12px] text-cream-100/70">por {membership.cycle}</p>
            </div>
            <Sparkles size={28} className="text-gold-300" />
          </div>
        </article>
      </section>

      <section className="px-5 pt-6">
        <h3 className="section-title mb-3">Cómo funciona</h3>
        <div className="grid gap-3">
          <Step n="1" title="Solicita tu acceso" body="Completa tu perfil y selecciona tu cabina favorita." />
          <Step n="2" title="Disfruta beneficios" body="Cada mes recibirás tu ritual de bienvenida y promociones exclusivas." />
          <Step n="3" title="Acumula puntos" body="Cada visita suma puntos que se transforman en regalos Lucienne." />
        </div>
      </section>

      <div className="safe-bottom mt-8 px-5 pb-6">
        <button onClick={() => router.push('/checkout')} className="btn-primary">
          {user?.member ? 'Renovar membresía' : 'Quiero ser parte'}
        </button>
      </div>
    </>
  )
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <article className="card-soft flex items-start gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-gradient text-white font-display">
        {n}
      </span>
      <div>
        <h4 className="font-display text-[16px] leading-tight">{title}</h4>
        <p className="text-[12px] text-ink-500">{body}</p>
      </div>
    </article>
  )
}
