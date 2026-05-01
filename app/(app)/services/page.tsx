'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ChevronRight } from 'lucide-react'
import { TopBar } from '../../components/TopBar'
import { categories } from '../../data/categories'
import { treatments } from '../../data/treatments'
import { formatPrice, cn } from '../../lib/cn'

export default function ServicesPage() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<'all' | string>('all')

  const filtered = useMemo(() => {
    return treatments.filter((t) => {
      if (active !== 'all' && t.category !== active) return false
      if (query && !`${t.name} ${t.short}`.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [query, active])

  return (
    <>
      <TopBar title="Servicios" back={false} />

      <div className="px-5 pt-3">
        <div className="flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-3 shadow-soft">
          <Search size={18} className="text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tratamiento"
            className="flex-1 bg-transparent text-sm placeholder:text-ink-500 focus:outline-none"
          />
        </div>

        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 no-scrollbar">
          <button
            onClick={() => setActive('all')}
            className={cn('whitespace-nowrap', active === 'all' ? 'chip-active' : 'chip')}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={cn('whitespace-nowrap', active === c.slug ? 'chip-active' : 'chip')}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {active === 'all' && !query && (
        <section className="px-5 pt-6">
          <h2 className="section-title mb-3">Categorías</h2>
          <div className="grid gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className="flex items-center gap-4 rounded-3xl border border-rose-100 bg-white/85 p-3 shadow-soft"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                  <Image src={c.image} alt={c.name} fill sizes="80px" className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-[18px]">{c.name}</h3>
                  <p className="text-[12px] text-ink-500">{c.count} tratamientos</p>
                </div>
                <ChevronRight size={18} className="text-ink-500" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 pt-6">
        {(active !== 'all' || query) && (
          <h2 className="section-title mb-3">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </h2>
        )}
        <div className="grid gap-3">
          {filtered.map((t) => (
            <Link
              key={t.id}
              href={`/treatments/${t.id}`}
              className="flex items-center gap-3 rounded-3xl border border-rose-100 bg-white/85 p-3 shadow-soft"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                <Image src={t.image} alt={t.name} fill sizes="80px" className="object-cover" unoptimized />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[16px] leading-tight">{t.name}</h3>
                <p className="text-[12px] text-ink-500">{t.short}</p>
                <p className="mt-1 text-[12px] font-medium text-gold-600">
                  {formatPrice(t.price)} · {t.duration} min
                </p>
              </div>
              <ChevronRight size={18} className="text-ink-500" />
            </Link>
          ))}
        </div>
      </section>
      <div className="h-16" />
    </>
  )
}
