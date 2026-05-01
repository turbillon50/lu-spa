'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TopBar } from '../../components/TopBar'
import { promotions } from '../../data/promotions'
import { cn } from '../../lib/cn'

const tabs = ['Para ti', 'Todos', 'Paquetes', 'Membresías'] as const

export default function PromotionsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Para ti')

  return (
    <>
      <TopBar title="Promociones" />
      <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn('whitespace-nowrap', tab === t ? 'chip-active' : 'chip')}
          >
            {t}
          </button>
        ))}
      </div>

      <section className="grid gap-4 px-5 pt-5">
        {promotions.map((p, idx) => (
          <Link key={p.id} href="/services" className="block">
            <article className="relative overflow-hidden rounded-3xl shadow-soft">
              <div className="relative h-48 w-full">
                <Image src={p.image} alt={p.title} fill sizes="440px" className="object-cover" unoptimized />
                <div
                  className={cn(
                    'absolute inset-0',
                    idx % 2 === 0
                      ? 'bg-gradient-to-tr from-rose-700/75 via-rose-400/35 to-transparent'
                      : 'bg-gradient-to-tr from-ink-900/75 via-ink-700/30 to-transparent'
                  )}
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <p className="eyebrow text-cream-100">{p.discount}</p>
                <h3 className="font-display text-[26px] leading-tight">{p.title}</h3>
                <p className="text-[13px] text-cream-100/85">{p.subtitle}</p>
                <span className="mt-2 text-[11px] uppercase tracking-[0.32em] text-cream-100/75">
                  {p.validUntil}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>
      <div className="h-16" />
    </>
  )
}
