import type { Product } from '../lib/types'

export const products: Product[] = [
  {
    id: 'serum-vit-c',
    name: 'Sérum Vitamina C',
    category: 'skin-care',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
    short: 'Antioxidante + iluminador',
    highlight: true
  },
  {
    id: 'crema-hidratante',
    name: 'Crema Hidratante',
    category: 'skin-care',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
    short: 'Hidratación 48h',
    highlight: true
  },
  {
    id: 'aceite-corporal',
    name: 'Aceite Corporal Lucienne',
    category: 'corporal',
    price: 980,
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=900&q=85',
    short: 'Aroma signature'
  },
  {
    id: 'exfoliante-corporal',
    name: 'Exfoliante de Sales',
    category: 'corporal',
    price: 720,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85',
    short: 'Pulido sedoso'
  },
  {
    id: 'rodillo-jade',
    name: 'Rodillo de Jade',
    category: 'accesorios',
    price: 540,
    image: 'https://images.unsplash.com/photo-1571907480495-c1faff2fa4c0?auto=format&fit=crop&w=900&q=85',
    short: 'Drenaje en casa'
  },
  {
    id: 'gua-sha',
    name: 'Gua Sha rosa',
    category: 'accesorios',
    price: 480,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=85',
    short: 'Lifting natural'
  }
]

export const productById = (id: string) => products.find((p) => p.id === id)
