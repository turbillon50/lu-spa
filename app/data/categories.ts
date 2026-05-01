import type { Category } from '../lib/types'

export const categories: Category[] = [
  {
    slug: 'faciales',
    name: 'Faciales',
    blurb: 'Limpieza, hidratación y glow inmediato.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85',
    count: 6
  },
  {
    slug: 'corporales',
    name: 'Corporales',
    blurb: 'Drenaje, tonificación y relajación profunda.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85',
    count: 5
  },
  {
    slug: 'aparatologia',
    name: 'Aparatología',
    blurb: 'Tecnología de última generación, resultados visibles.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=85',
    count: 4
  },
  {
    slug: 'masajes',
    name: 'Masajes',
    blurb: 'Aromaterapia, presión personalizada y descanso total.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85',
    count: 4
  },
  {
    slug: 'rituales',
    name: 'Rituales',
    blurb: 'Experiencias multisensoriales firmadas Lucienne.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
    count: 3
  }
]

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)
