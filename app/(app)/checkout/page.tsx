'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Wallet, ShieldCheck, Apple } from 'lucide-react'
import { TopBar } from '../../components/TopBar'
import { useStore } from '../../lib/providers'
import { treatmentById } from '../../data/treatments'
import { formatPrice, cn } from '../../lib/cn'

type Method = 'card' | 'paypal' | 'apple'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, bookFromCart } = useStore()
  const items = cart.map((c) => treatmentById(c.treatmentId)).filter(Boolean)
  const subtotal = items.reduce((acc, t) => acc + (t?.price ?? 0), 0)
  const discount = items.length > 1 ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount

  const [method, setMethod] = useState<Method>('card')
  const [card, setCard] = useState({ number: '4242 4242 4242 4242', exp: '12/27', cvv: '123', name: '' })

  const pay = () => {
    if (!cart.length) {
      router.push('/services')
      return
    }
    bookFromCart()
    router.push('/checkout/confirm')
  }

  return (
    <>
      <TopBar title="Pago" />

      <section className="px-5 pt-3">
        <article className="card-soft">
          <p className="eyebrow">Resumen de tu compra</p>
          <p className="mt-2 text-[14px] text-ink-700">
            {items.length} tratamiento{items.length !== 1 ? 's' : ''}
          </p>
          <p className="mt-1 price">{formatPrice(total)}</p>
        </article>
      </section>

      <section className="px-5 pt-6">
        <h3 className="section-title mb-3">Método de pago</h3>
        <div className="grid gap-2">
          <Option active={method === 'card'} onClick={() => setMethod('card')} icon={<CreditCard size={18} />} label="Tarjeta de crédito/débito" />
          <Option active={method === 'paypal'} onClick={() => setMethod('paypal')} icon={<Wallet size={18} />} label="PayPal" />
          <Option active={method === 'apple'} onClick={() => setMethod('apple')} icon={<Apple size={18} />} label="Apple Pay" />
        </div>
      </section>

      {method === 'card' && (
        <section className="px-5 pt-6">
          <label className="block">
            <span className="eyebrow mb-1 block">Número de tarjeta</span>
            <input
              className="field"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              inputMode="numeric"
            />
          </label>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="eyebrow mb-1 block">MM/AA</span>
              <input className="field" value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} />
            </label>
            <label className="block">
              <span className="eyebrow mb-1 block">CVV</span>
              <input className="field" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
            </label>
          </div>
          <label className="mt-3 block">
            <span className="eyebrow mb-1 block">Nombre en la tarjeta</span>
            <input className="field" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Mariana López" />
          </label>
        </section>
      )}

      <div className="safe-bottom sticky bottom-0 z-30 mt-8 border-t border-rose-100/70 bg-white/85 px-5 py-4 backdrop-blur-xl">
        <p className="mb-2 flex items-center justify-center gap-1 text-[12px] text-ink-500">
          <ShieldCheck size={14} className="text-rose-600" /> Pago 100% seguro
        </p>
        <button onClick={pay} className="btn-primary">
          Pagar {formatPrice(total)}
        </button>
      </div>
    </>
  )
}

function Option({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[14px] transition',
        active ? 'border-rose-300 bg-rose-50 text-ink-900 shadow-soft' : 'border-rose-100 bg-white/80 text-ink-700'
      )}
    >
      <span
        className={cn(
          'grid h-9 w-9 place-items-center rounded-full',
          active ? 'bg-rose-300 text-white' : 'bg-rose-50 text-rose-600'
        )}
      >
        {icon}
      </span>
      <span className="flex-1 font-medium">{label}</span>
      <span className={cn('h-4 w-4 rounded-full border-2', active ? 'border-rose-500 bg-rose-500' : 'border-rose-200')} />
    </button>
  )
}
