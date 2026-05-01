export type CategorySlug = 'faciales' | 'corporales' | 'aparatologia' | 'masajes' | 'rituales'

export type Category = {
  slug: CategorySlug
  name: string
  blurb: string
  image: string
  count: number
}

export type Treatment = {
  id: string
  name: string
  category: CategorySlug
  duration: number
  price: number
  short: string
  description: string
  includes: string[]
  benefits: string[]
  image: string
  featured?: boolean
}

export type Promotion = {
  id: string
  title: string
  subtitle: string
  discount: string
  validUntil: string
  image: string
  appliesTo?: string[]
}

export type Product = {
  id: string
  name: string
  category: 'skin-care' | 'corporal' | 'accesorios'
  price: number
  image: string
  short: string
  highlight?: boolean
}

export type CartItem = {
  treatmentId: string
  date: string
  time: string
}

export type Appointment = {
  id: string
  treatmentId: string
  date: string
  time: string
  status: 'confirmed' | 'completed' | 'cancelled'
  cabin?: string
  createdAt: number
}

export type AppNotification = {
  id: string
  title: string
  body: string
  date: string
  type: 'reminder' | 'promo' | 'news' | 'birthday'
  read: boolean
}

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  member: boolean
  preferences?: string
  joinedAt: number
}
