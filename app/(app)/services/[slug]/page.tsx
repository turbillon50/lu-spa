import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { TopBar } from '../../../components/TopBar'
import { categoryBySlug, categories } from '../../../data/categories'
import { treatmentsByCategory } from '../../../data/treatments'
import { formatPrice } from '../../../lib/cn'

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categoryBySlug(params.slug)
  if (!cat) notFound()
  const items = treatmentsByCategory(cat.slug)

  return (
    <>
      <TopBar title={cat.name} back="/services" />
      <section className="px-5 pt-3">
        <div className="relative h-40 w-full overflow-hidden rounded-3xl shadow-soft">
          <Image src={cat.image} alt={cat.name} fill sizes="440px" className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="eyebrow text-cream-100">{cat.count} tratamientos</p>
            <h2 className="font-display text-[28px] leading-tight">{cat.name}</h2>
            <p className="text-[13px] text-cream-100/85">{cat.blurb}</p>
          </div>
        </div>
      </section>

      <section className="px-5 pt-6">
        <div className="grid gap-3">
          {items.map((t) => (
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
