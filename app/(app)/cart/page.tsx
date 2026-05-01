'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { TopBar } from '../../components/TopBar'
import { EmptyState } from '../../components/EmptyState'
import { useStore } from '../../lib/providers'
import { treatmentById } from '../../data/treatments'
import { formatPrice, formatLongDate } from '../../lib/cn'

export default function CartPage() {
  const { cart, removeFromCart } = useStore()
  const router = useRouter()
  const items = cart.map((c) => ({ cart: c, treatment: treatmentById(c.treatmentId) })).filter((i) => i.treatment)
  const subtotal = items.reduce((acc, i) => acc + (i.treatment?.price ?? 0), 0)
  const discount = items.length > 1 ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  return (
    <>
      <TopBar
        title="Carrito"
        action={items.length > 0 ? <span className="text-sm text-rose-600">{items.length}</span> : null}
      />

      <section className="px-5 pt-3">
        {items.length === 0 ? (
          <EmptyState
            title="Tu carrito está vacío"
            body="Explora nuestros tratamientos y agenda tu próxima experiencia."
            action={
              <Link href="/services" className="btn-rose !w-auto px-6">
                Explorar servicios
              </Link>
            }
          />
        ) : (
          <div className="grid gap-3">
            {items.map(({ cart: c, treatment: t }) => (
              <article key={c.treatmentId} className="card-soft flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                  <Image src={t!.image} alt={t!.name} fill sizes="80px" className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[16px] leading-tight">{t!.name}</h3>
                  <p className="text-[12px] capitalize text-ink-500">
                    {formatLongDate(c.date)} · {c.time}
                  </p>
                  <p className="mt-1 text-[13px] font-medium text-gold-600">{formatPrice(t!.price)}</p>
                </div>
                <button
                  aria-label="Eliminar"
                  onClick={() => removeFromCart(c.treatmentId)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-rose-50 text-rose-600"
                >
                  <Trash2 size={16} />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {items.length > 0 && (
        <section className="px-5 pt-6">
          <article className="card-soft">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Descuento" value={discount ? `- ${formatPrice(discount)}` : '—'} muted />
            <div className="divider" />
            <Row label="Total" value={formatPrice(total)} bold />
          </article>
          <button onClick={() => router.push('/checkout')} className="btn-primary mt-5">
            Continuar a pago
          </button>
        </section>
      )}
      <div className="h-20" />
    </>
  )
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className={muted ? 'text-[13px] text-ink-500' : 'text-[14px] text-ink-700'}>{label}</span>
      <span
        className={
          bold
            ? 'font-display text-[20px] text-ink-900'
            : muted
              ? 'text-[13px] text-ink-500'
              : 'text-[14px] font-medium text-ink-900'
        }
      >
        {value}
      </span>
    </div>
  )
}
