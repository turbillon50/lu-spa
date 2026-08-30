import { membershipTiers, type MembershipTier } from '../data/membership'
import { treatments as treatmentFallbacks } from '../data/treatments'
import type { Treatment } from './types'
import { sql } from './db'
import { cache } from 'react'

export type CmsBlockContent = {
  eyebrow?: string
  title?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  image?: string
}

export type CmsBlock = {
  id: number
  key: string
  type: string
  order: number
  visible: boolean
  content: CmsBlockContent
}

export type PublicNotification = {
  id: string
  title: string
  body: string
  type: 'reminder' | 'promo' | 'news' | 'birthday'
  actionUrl: string | null
  publishedAt: string
}

export type SiteContent = {
  treatments: Treatment[]
  memberships: MembershipTier[]
  pages: Record<string, CmsBlock[]>
  notifications: PublicNotification[]
}

async function optional<T>(work: () => Promise<T>, fallback: T): Promise<T> {
  try { return await work() } catch { return fallback }
}

const arrayOfStrings = (value: unknown) => Array.isArray(value) ? value.map(String) : []

async function getPublicTreatments(): Promise<Treatment[]> {
  const richRows = await optional(async () => sql`
    SELECT slug, nombre, categoria, duracion_min, precio, descripcion, resumen, imagen,
           incluye, beneficios, destacado, activo
    FROM tratamientos WHERE activo IS TRUE ORDER BY categoria, nombre
  `, null)
  const rows = richRows ?? await optional(async () => sql`
    SELECT slug, nombre, categoria, duracion_min, precio, activo
    FROM tratamientos WHERE activo IS TRUE ORDER BY categoria, nombre
  `, [])
  if (!rows.length) return treatmentFallbacks

  const fallbacks = new Map(treatmentFallbacks.map((item) => [item.id, item]))
  return rows.map((row) => {
    const slug = String(row.slug)
    const fallback = fallbacks.get(slug)
    return {
      id: slug,
      name: String(row.nombre || fallback?.name || slug),
      category: String(row.categoria || fallback?.category || 'rituales') as Treatment['category'],
      duration: Number(row.duracion_min || fallback?.duration || 60),
      price: Number(row.precio || 0),
      short: String(row.resumen || fallback?.short || ''),
      description: String(row.descripcion || fallback?.description || ''),
      includes: arrayOfStrings(row.incluye).length ? arrayOfStrings(row.incluye) : fallback?.includes || [],
      benefits: arrayOfStrings(row.beneficios).length ? arrayOfStrings(row.beneficios) : fallback?.benefits || [],
      image: String(row.imagen || fallback?.image || '/img/hero-home.jpg'),
      featured: row.destacado == null ? fallback?.featured : Boolean(row.destacado),
    }
  })
}

async function getPublicMemberships(): Promise<MembershipTier[]> {
  const rows = await optional(async () => sql`
    SELECT id, nombre, precio_mensual, beneficios, sesiones_mes
    FROM membresia_planes WHERE activo IS TRUE ORDER BY precio_mensual
  `, [])
  if (!rows.length) return membershipTiers
  return rows.slice(0, membershipTiers.length).map((row, index) => {
    const base = membershipTiers[Math.min(index, membershipTiers.length - 1)]
    const monthly = Number(row.precio_mensual || 0)
    return {
      ...base,
      name: String(row.nombre),
      priceMonthly: monthly,
      priceAnnual: monthly * 10,
      features: arrayOfStrings(row.beneficios),
      freeSessions: Number(row.sesiones_mes || 0),
    }
  })
}

async function getPublishedPages(): Promise<Record<string, CmsBlock[]>> {
  const rows = await optional(async () => sql`
    SELECT p.slug, b.id, b.block_key, b.tipo, b.contenido, b.orden, b.visible
    FROM cms_pages p JOIN cms_blocks b ON b.page_id=p.id
    WHERE p.estado='publicada' AND b.visible IS TRUE
    ORDER BY p.slug, b.orden, b.id
  `, [])
  return rows.reduce<Record<string, CmsBlock[]>>((pages, row) => {
    const slug = String(row.slug)
    pages[slug] ||= []
    pages[slug].push({
      id: Number(row.id), key: String(row.block_key), type: String(row.tipo),
      order: Number(row.orden), visible: Boolean(row.visible),
      content: (row.contenido || {}) as CmsBlockContent,
    })
    return pages
  }, {})
}

async function getPublishedNotifications(): Promise<PublicNotification[]> {
  const rows = await optional(async () => sql`
    SELECT id, titulo, cuerpo, tipo, action_url, COALESCE(publicar_at, created_at) AS published_at
    FROM pwa_notificaciones
    WHERE estado IN ('publicada','programada')
      AND COALESCE(publicar_at, created_at) <= now()
      AND (expira_at IS NULL OR expira_at > now())
      AND audiencia IN ('all','members')
    ORDER BY COALESCE(publicar_at, created_at) DESC LIMIT 30
  `, [])
  return rows.map((row) => ({
    id: String(row.id), title: String(row.titulo), body: String(row.cuerpo),
    type: String(row.tipo) as PublicNotification['type'],
    actionUrl: row.action_url ? String(row.action_url) : null,
    publishedAt: String(row.published_at),
  }))
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const [treatments, memberships, pages, notifications] = await Promise.all([
    getPublicTreatments(), getPublicMemberships(), getPublishedPages(), getPublishedNotifications(),
  ])
  return { treatments, memberships, pages, notifications }
})
