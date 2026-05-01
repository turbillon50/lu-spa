import type { Promotion } from '../lib/types'

export const promotions: Promotion[] = [
  {
    id: 'glow-season',
    title: 'Glow Season',
    subtitle: '20% OFF en faciales y aparatología',
    discount: '20% OFF',
    validUntil: 'Válido todo mayo',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85',
    appliesTo: ['hydrafacial', 'oxigeno-anti-edad', 'radiofrecuencia']
  },
  {
    id: 'paquete-reafirmante',
    title: 'Paquete Reafirmante',
    subtitle: '3 sesiones de Radiofrecuencia',
    discount: '$7,200',
    validUntil: 'Antes $8,400',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=85',
    appliesTo: ['radiofrecuencia']
  },
  {
    id: 'paquete-glow',
    title: 'Paquete Glow',
    subtitle: '3 sesiones de Hydrafacial',
    discount: '20% OFF',
    validUntil: 'Vigente este mes',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    appliesTo: ['hydrafacial']
  },
  {
    id: 'refer-amiga',
    title: 'Refer a una amiga',
    subtitle: 'Ambas reciben 15% OFF',
    discount: '15% OFF',
    validUntil: 'Sin caducidad',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85'
  }
]

export const promotionById = (id: string) => promotions.find((p) => p.id === id)
