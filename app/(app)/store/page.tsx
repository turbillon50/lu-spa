'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, Heart } from 'lucide-react'
import { TopBar } from '../../components/TopBar'
import { products } from '../../data/products'
import { cn, formatPrice } from '../../lib/cn'
import { useStore } from '../../lib/providers'

const tabs = [
  { key: 'destacados', label: 'Destacados' },
  { key: 'skin-care', label: 'Skin Care' },
  { key: 'corporal', label: 'Corporal' },
  { key: 'accesorios', label: 'Accesorios' }
] as const

export default function StorePage() {
  const { favorites, toggleFavorite } = useStore()
  const [tab, setTab] = useState<(typeof tabs)[number]['key']>('destacados')
  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    let list = products
    if (tab === 'destacados') list = list.filter((p) => p.highlight)
    else list = list.filter((p) => p.category === tab)
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    return list
  }, [tab, query])

  return (
    <>
      <TopBar title="Tienda" back={false} />

      <div className="px-5 pt-3">
        <div className="flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-3 shadow-soft">
          <Search size={18} className="text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos"
            className="flex-1 bg-transparent text-sm placeholder:text-ink-500 focus:outline-none"
          />
        </div>

        <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn('whitespace-nowrap', tab === t.key ? 'chip-active' : 'chip')}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 px-5 pt-5">
        {items.map((p) => {
          const fav = favorites.includes(p.id)
          return (
            <article key={p.id} className="overflow-hidden rounded-3xl border border-rose-100 bg-white/85 shadow-soft">
              <div className="relative h-36 w-full">
                <Image src={p.image} alt={p.name} fill sizes="220px" className="object-cover" unoptimized />
                <button
                  aria-label="Favorito"
                  onClick={() => toggleFavorite(p.id)}
                  className={cn(
                    'absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-soft',
                    fav ? 'text-rose-500' : 'text-ink-500'
                  )}
                >
                  <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-display text-[15px] leading-tight">{p.name}</h3>
                <p className="text-[11px] text-ink-500">{p.short}</p>
                <p className="mt-2 text-[13px] font-semibold text-gold-600">{formatPrice(p.price)}</p>
              </div>
            </article>
          )
        })}
      </section>
      <div className="h-16" />
    </>
  )
}
