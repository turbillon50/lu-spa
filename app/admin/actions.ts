'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { ADMIN_COOKIE, verifyAdminSession } from '../lib/admin-auth'
import { sql } from '../lib/db'

async function requireAdmin() {
  if (!await verifyAdminSession(cookies().get(ADMIN_COOKIE)?.value)) throw new Error('No autorizado')
}

const value = (form: FormData, key: string) => String(form.get(key) || '').trim()
const numeric = (form: FormData, key: string) => Number(value(form, key))
const nullableId = (form: FormData, key: string) => {
  const parsed = numeric(form, key)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

async function audit(action: string, entity: string, entityId?: string, detail: Record<string, unknown> = {}) {
  try {
    await sql`INSERT INTO admin_audit_log (accion, entidad, entidad_id, detalle) VALUES (${action}, ${entity}, ${entityId || null}, ${JSON.stringify(detail)}::jsonb)`
  } catch { /* Migration not applied yet. The business mutation remains valid. */ }
}

export async function updateReservation(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const status = value(form, 'estado')
  const validStatuses = ['pendiente', 'confirmada', 'en-curso', 'completada', 'cancelada', 'no-show']
  if (!Number.isInteger(id) || !validStatuses.includes(status)) throw new Error('Reserva inválida')
  const staffId = nullableId(form, 'staffId')
  const roomId = nullableId(form, 'roomId')
  await sql`UPDATE reservas SET estado=${status}, staff_id=${staffId}, cabina_id=${roomId}, updated_at=now() WHERE id=${id}`
  await audit('actualizar', 'reserva', String(id), { status, staffId, roomId })
  revalidatePath('/admin')
  revalidatePath('/admin/reservas')
}

export async function createReservation(form: FormData) {
  await requireAdmin()
  const clientId = nullableId(form, 'clienteId')
  const serviceId = nullableId(form, 'tratamientoId')
  const date = value(form, 'fecha')
  const time = value(form, 'hora')
  if (!clientId || !serviceId || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) throw new Error('Faltan datos de la cita')
  const inserted = await sql`
    INSERT INTO reservas (cliente_id, tratamiento_id, fecha, hora, estado, notas, staff_id, cabina_id, origen)
    VALUES (${clientId}, ${serviceId}, ${date}, ${time}, 'confirmada', ${value(form, 'notas') || null}, ${nullableId(form, 'staffId')}, ${nullableId(form, 'roomId')}, 'admin')
    RETURNING id
  `
  await audit('crear', 'reserva', String(inserted[0]?.id || ''), { date, time })
  revalidatePath('/admin')
  revalidatePath('/admin/reservas')
}

export async function createStaff(form: FormData) {
  await requireAdmin()
  const name = value(form, 'nombre')
  if (name.length < 2) throw new Error('Nombre requerido')
  const inserted = await sql`
    INSERT INTO staff (nombre, rol, especialidades, telefono, email)
    VALUES (${name}, ${value(form, 'rol') || 'terapeuta'}, string_to_array(${value(form, 'especialidades')}, ','), ${value(form, 'telefono') || null}, ${value(form, 'email') || null})
    RETURNING id
  `
  await audit('crear', 'staff', String(inserted[0]?.id || ''), { name })
  revalidatePath('/admin/equipo')
}

export async function createRoom(form: FormData) {
  await requireAdmin()
  const name = value(form, 'nombre')
  const capacity = Math.max(1, Math.round(numeric(form, 'capacidad') || 1))
  if (name.length < 2) throw new Error('Nombre requerido')
  const inserted = await sql`
    INSERT INTO cabinas (nombre, tipo, capacidad, notas)
    VALUES (${name}, ${value(form, 'tipo') || null}, ${capacity}, ${value(form, 'notas') || null})
    RETURNING id
  `
  await audit('crear', 'cabina', String(inserted[0]?.id || ''), { name, capacity })
  revalidatePath('/admin/equipo')
}

export async function toggleService(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  if (!Number.isInteger(id)) throw new Error('Servicio inválido')
  const result = await sql`UPDATE tratamientos SET activo=NOT COALESCE(activo,false) WHERE id=${id} RETURNING activo`
  await audit('cambiar_estado', 'tratamiento', String(id), { active: result[0]?.activo })
  revalidatePath('/admin/servicios')
  revalidatePath('/admin')
}

export async function updateService(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const name = value(form, 'nombre')
  const duration = Math.round(numeric(form, 'duracion'))
  const price = numeric(form, 'precio')
  if (!Number.isInteger(id) || name.length < 2 || duration < 5 || price < 0) throw new Error('Servicio inválido')
  if (form.has('descripcion')) {
    await sql`UPDATE tratamientos SET nombre=${name}, categoria=${value(form, 'categoria')}, duracion_min=${duration}, precio=${price}, descripcion=${value(form, 'descripcion') || null}, resumen=${value(form, 'resumen') || null}, imagen=${value(form, 'imagen') || null}, beneficios=string_to_array(${value(form, 'beneficios')}, ','), updated_at=now() WHERE id=${id}`
  } else {
    await sql`UPDATE tratamientos SET nombre=${name}, categoria=${value(form, 'categoria')}, duracion_min=${duration}, precio=${price} WHERE id=${id}`
  }
  await audit('actualizar', 'tratamiento', String(id), { name, duration, price })
  revalidatePath('/admin/servicios')
  revalidatePath('/admin/contenido')
  revalidatePath('/', 'layout')
}

export async function recordPayment(form: FormData) {
  await requireAdmin()
  const amount = numeric(form, 'monto')
  const type = value(form, 'tipo')
  const concept = value(form, 'concepto')
  if (!(amount > 0) || !['ingreso', 'egreso', 'reembolso'].includes(type) || concept.length < 2) throw new Error('Movimiento inválido')
  const inserted = await sql`
    INSERT INTO pagos (reserva_id, cliente_id, tipo, concepto, monto, metodo, referencia, notas)
    VALUES (${nullableId(form, 'reservaId')}, ${nullableId(form, 'clienteId')}, ${type}, ${concept}, ${amount}, ${value(form, 'metodo') || 'efectivo'}, ${value(form, 'referencia') || null}, ${value(form, 'notas') || null})
    RETURNING id
  `
  await audit('registrar', 'pago', String(inserted[0]?.id || ''), { type, amount })
  revalidatePath('/admin/caja')
  revalidatePath('/admin')
  revalidatePath('/admin/analytics')
}

export async function createInventoryProduct(form: FormData) {
  await requireAdmin()
  const name = value(form, 'nombre')
  if (name.length < 2) throw new Error('Nombre requerido')
  const inserted = await sql`
    INSERT INTO inventario_productos (nombre, sku, categoria, unidad, stock, stock_minimo, costo, precio)
    VALUES (${name}, ${value(form, 'sku') || null}, ${value(form, 'categoria') || null}, ${value(form, 'unidad') || 'pieza'}, ${numeric(form, 'stock') || 0}, ${numeric(form, 'minimo') || 0}, ${numeric(form, 'costo') || null}, ${numeric(form, 'precio') || null})
    RETURNING id
  `
  await audit('crear', 'inventario_producto', String(inserted[0]?.id || ''), { name })
  revalidatePath('/admin/inventario')
}

export async function adjustInventory(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const amount = numeric(form, 'cantidad')
  const reason = value(form, 'motivo')
  if (!Number.isInteger(id) || amount === 0 || reason.length < 2) throw new Error('Ajuste inválido')
  await sql`
    WITH updated AS (
      UPDATE inventario_productos SET stock=stock+${amount}, updated_at=now() WHERE id=${id} RETURNING id
    )
    INSERT INTO inventario_movimientos (producto_id, cantidad, motivo, referencia)
    SELECT id, ${amount}, ${reason}, ${value(form, 'referencia') || null} FROM updated
  `
  await audit('ajustar', 'inventario_producto', String(id), { amount, reason })
  revalidatePath('/admin/inventario')
  revalidatePath('/admin')
}

export async function updateClient(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  if (!Number.isInteger(id)) throw new Error('Clienta inválida')
  await sql`
    UPDATE clientes SET telefono=${value(form, 'telefono') || null}, alergias=${value(form, 'alergias') || null}, preferencias=${value(form, 'preferencias') || null}, notas_internas=${value(form, 'notas') || null}, updated_at=now()
    WHERE id=${id}
  `
  await audit('actualizar', 'cliente', String(id))
  revalidatePath('/admin/clientas')
}

export async function saveConfig(form: FormData) {
  await requireAdmin()
  const open = value(form, 'abre')
  const close = value(form, 'cierra')
  const days = form.getAll('dias').map(String)
  if (!/^\d{2}:\d{2}$/.test(open) || !/^\d{2}:\d{2}$/.test(close)) throw new Error('Horario inválido')
  await sql`
    INSERT INTO spa_config (clave, valor, updated_at)
    VALUES ('horario', ${JSON.stringify({ open, close, days })}::jsonb, now())
    ON CONFLICT (clave) DO UPDATE SET valor=excluded.valor, updated_at=now()
  `
  await audit('actualizar', 'configuracion', 'horario')
  revalidatePath('/admin/configuracion')
}

export async function createMembershipPlan(form: FormData) {
  await requireAdmin()
  const name = value(form, 'nombre')
  const price = numeric(form, 'precio')
  const sessions = Math.max(0, Math.round(numeric(form, 'sesiones') || 0))
  if (name.length < 2 || price < 0) throw new Error('Plan inválido')
  const inserted = await sql`
    INSERT INTO membresia_planes (nombre, precio_mensual, beneficios, sesiones_mes)
    VALUES (${name}, ${price}, string_to_array(${value(form, 'beneficios')}, ','), ${sessions}) RETURNING id
  `
  await audit('crear', 'membresia_plan', String(inserted[0]?.id || ''), { name })
  revalidatePath('/admin/membresias')
}

export async function updateMembershipPlan(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const name = value(form, 'nombre')
  const price = numeric(form, 'precio')
  const sessions = Math.max(0, Math.round(numeric(form, 'sesiones') || 0))
  if (!Number.isInteger(id) || name.length < 2 || price < 0) throw new Error('Plan inválido')
  await sql`UPDATE membresia_planes SET nombre=${name}, precio_mensual=${price}, sesiones_mes=${sessions}, beneficios=string_to_array(${value(form, 'beneficios')}, ',') WHERE id=${id}`
  await audit('actualizar', 'membresia_plan', String(id), { name, price, sessions })
  revalidatePath('/admin/membresias')
  revalidatePath('/admin/contenido')
  revalidatePath('/', 'layout')
}

export async function createMembershipSubscription(form: FormData) {
  await requireAdmin()
  const clientId = nullableId(form, 'clienteId')
  const planId = nullableId(form, 'planId')
  if (!clientId || !planId) throw new Error('Suscripción inválida')
  const inserted = await sql`
    INSERT INTO membresia_suscripciones (cliente_id, plan_id, inicio, renovacion, sesiones_disponibles)
    SELECT ${clientId}, id, CURRENT_DATE, ${value(form, 'renovacion') || null}::date, sesiones_mes FROM membresia_planes WHERE id=${planId}
    RETURNING id
  `
  await sql`UPDATE clientes SET membresia=(SELECT nombre FROM membresia_planes WHERE id=${planId}), membresia_desde=now() WHERE id=${clientId}`
  await audit('crear', 'membresia_suscripcion', String(inserted[0]?.id || ''), { clientId, planId })
  revalidatePath('/admin/membresias')
  revalidatePath('/admin/clientas')
}

export async function createGiftCard(form: FormData) {
  await requireAdmin()
  const amount = numeric(form, 'monto')
  if (!(amount > 0)) throw new Error('Monto inválido')
  const code = `LU-${crypto.randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase()}`
  const inserted = await sql`
    INSERT INTO gift_cards (codigo, monto, comprador_cliente_id, destinatario_nombre, destinatario_email, mensaje, estado)
    VALUES (${code}, ${amount}, ${nullableId(form, 'clienteId')}, ${value(form, 'destinatario') || null}, ${value(form, 'email') || null}, ${value(form, 'mensaje') || null}, 'activa') RETURNING id
  `
  await audit('crear', 'gift_card', String(inserted[0]?.id || ''), { amount, code })
  revalidatePath('/admin/membresias')
  revalidatePath('/admin/gift-cards')
}

const internalUrl = (raw: string) => !raw || (raw.startsWith('/') && !raw.startsWith('//'))
const slugPattern = /^[a-z0-9-]+$/

export async function saveCmsPage(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const slug = value(form, 'slug').toLowerCase()
  const title = value(form, 'titulo')
  const status = value(form, 'estado') || 'borrador'
  if (!slugPattern.test(slug) || title.length < 2 || !['borrador', 'publicada', 'archivada'].includes(status)) throw new Error('Página inválida')
  const seo = JSON.stringify({ title: value(form, 'seoTitle'), description: value(form, 'seoDescription') })
  const rows = Number.isInteger(id) && id > 0
    ? await sql`UPDATE cms_pages SET slug=${slug}, titulo=${title}, estado=${status}, seo=${seo}::jsonb, updated_at=now() WHERE id=${id} RETURNING id`
    : await sql`INSERT INTO cms_pages (slug, titulo, estado, seo) VALUES (${slug}, ${title}, ${status}, ${seo}::jsonb) ON CONFLICT (slug) DO UPDATE SET titulo=excluded.titulo, estado=excluded.estado, seo=excluded.seo, updated_at=now() RETURNING id`
  await audit('guardar', 'cms_page', String(rows[0]?.id || id), { slug, status })
  revalidatePath('/admin/contenido')
  revalidatePath('/admin/canvas')
  revalidatePath('/', 'layout')
}

export async function saveCmsBlock(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const pageId = numeric(form, 'pageId')
  const key = value(form, 'key').toLowerCase()
  const type = value(form, 'tipo') || 'contenido'
  const href = value(form, 'ctaHref')
  if (!Number.isInteger(pageId) || !slugPattern.test(key) || !internalUrl(href)) throw new Error('Bloque inválido')
  const content = JSON.stringify({ eyebrow: value(form, 'eyebrow'), title: value(form, 'title'), body: value(form, 'body'), ctaLabel: value(form, 'ctaLabel'), ctaHref: href, image: value(form, 'image') })
  const rows = Number.isInteger(id) && id > 0
    ? await sql`UPDATE cms_blocks SET block_key=${key}, tipo=${type}, contenido=${content}::jsonb, updated_at=now() WHERE id=${id} AND page_id=${pageId} RETURNING id`
    : await sql`INSERT INTO cms_blocks (page_id, block_key, tipo, contenido, orden) VALUES (${pageId}, ${key}, ${type}, ${content}::jsonb, COALESCE((SELECT max(orden)+1 FROM cms_blocks WHERE page_id=${pageId}),0)) ON CONFLICT (page_id, block_key) DO UPDATE SET tipo=excluded.tipo, contenido=excluded.contenido, updated_at=now() RETURNING id`
  await audit('guardar', 'cms_block', String(rows[0]?.id || id), { pageId, key })
  revalidatePath('/admin/canvas')
  revalidatePath('/', 'layout')
}

export async function setCmsBlockState(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const action = value(form, 'accion')
  if (!Number.isInteger(id) || !['up', 'down', 'toggle'].includes(action)) throw new Error('Acción inválida')
  if (action === 'toggle') await sql`UPDATE cms_blocks SET visible=NOT visible, updated_at=now() WHERE id=${id}`
  else await sql`UPDATE cms_blocks SET orden=orden+${action === 'up' ? -1 : 1}, updated_at=now() WHERE id=${id}`
  await audit(action, 'cms_block', String(id))
  revalidatePath('/admin/canvas')
  revalidatePath('/', 'layout')
}

export async function createNotification(form: FormData) {
  await requireAdmin()
  const title = value(form, 'titulo')
  const body = value(form, 'cuerpo')
  const type = value(form, 'tipo') || 'news'
  const audience = value(form, 'audiencia') || 'all'
  const status = value(form, 'estado') || 'borrador'
  const href = value(form, 'actionUrl')
  const publishAt = value(form, 'publicarAt')
  const expiresAt = value(form, 'expiraAt')
  if (title.length < 2 || body.length < 4 || !['reminder','promo','news','birthday'].includes(type) || !['all','members'].includes(audience) || !['borrador','programada','publicada'].includes(status) || !internalUrl(href)) throw new Error('Notificación inválida')
  const rows = await sql`INSERT INTO pwa_notificaciones (titulo, cuerpo, tipo, audiencia, action_url, estado, publicar_at, expira_at) VALUES (${title}, ${body}, ${type}, ${audience}, ${href || null}, ${status}, ${publishAt || null}::timestamptz, ${expiresAt || null}::timestamptz) RETURNING id`
  await audit('crear', 'pwa_notificacion', String(rows[0]?.id || ''), { type, audience, status })
  revalidatePath('/admin/notificaciones')
  revalidatePath('/', 'layout')
}

export async function updateNotificationStatus(form: FormData) {
  await requireAdmin()
  const id = numeric(form, 'id')
  const status = value(form, 'estado')
  if (!Number.isInteger(id) || !['borrador','programada','publicada','archivada'].includes(status)) throw new Error('Estado inválido')
  await sql`UPDATE pwa_notificaciones SET estado=${status}, publicar_at=CASE WHEN ${status}='publicada' THEN COALESCE(publicar_at,now()) ELSE publicar_at END, updated_at=now() WHERE id=${id}`
  await audit('cambiar_estado', 'pwa_notificacion', String(id), { status })
  revalidatePath('/admin/notificaciones')
  revalidatePath('/', 'layout')
}
