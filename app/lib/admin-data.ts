import { sql } from './db'

export type AgendaItem = {
  id: number
  fecha: string
  hora: string
  estado: string
  notas: string | null
  origen: string
  clienteId: number | null
  clienta: string
  tratamiento: string
  duracion: number
  precio: number
  staffId: number | null
  terapeuta: string | null
  cabinaId: number | null
  cabina: string | null
}

export type StaffItem = { id: number; nombre: string; rol: string; especialidades: string[]; telefono: string | null; email: string | null; activo: boolean }
export type RoomItem = { id: number; nombre: string; tipo: string | null; capacidad: number; activa: boolean; notas: string | null }
export type ServiceItem = { id: number; slug: string; nombre: string; categoria: string; duracion: number; precio: number; activo: boolean }
export type ClientItem = { id: number; nombre: string; email: string | null; telefono: string | null; membresia: string | null; visitas: number; ultimaVisita: string | null; gasto: number; notas: string | null }
export type PaymentItem = { id: number; concepto: string; monto: number; tipo: string; metodo: string; pagadoAt: string; clienta: string | null; reservaId: number | null }
export type InventoryItem = { id: number; nombre: string; sku: string | null; categoria: string | null; unidad: string; stock: number; minimo: number; costo: number | null; precio: number | null }

async function optional<T>(work: () => Promise<T>, fallback: T): Promise<T> {
  try { return await work() } catch (error) {
    console.warn('Módulo administrativo aún no disponible:', error instanceof Error ? error.message : error)
    return fallback
  }
}

const asNumber = (value: unknown) => Number(value || 0)
const dateString = (value: unknown) => value ? String(value).slice(0, 10) : null
const timeString = (value: unknown) => String(value || '').slice(0, 5)

export async function getDashboardData() {
  const [base, agenda, payments, inventory, operations, recovery] = await Promise.all([
    sql`
      SELECT
        (SELECT count(*)::int FROM reservas WHERE fecha = CURRENT_DATE AND estado <> 'cancelada') AS reservas_hoy,
        (SELECT count(DISTINCT cliente_id)::int FROM reservas WHERE fecha >= CURRENT_DATE - 30 AND estado <> 'cancelada') AS clientas_activas,
        (SELECT count(*)::int FROM clientes WHERE membresia IS NOT NULL) AS membresias_activas,
        (SELECT count(*)::int FROM tratamientos WHERE activo IS TRUE) AS servicios_activos
    `,
    getAgenda(),
    optional(async () => sql`
      SELECT
        COALESCE(sum(CASE WHEN tipo = 'ingreso' THEN monto WHEN tipo IN ('egreso','reembolso') THEN -monto ELSE 0 END),0)::numeric AS ingresos_mes,
        COALESCE(sum(CASE WHEN pagado_at::date = CURRENT_DATE AND tipo = 'ingreso' THEN monto ELSE 0 END),0)::numeric AS ingresos_hoy,
        count(*) FILTER (WHERE pagado_at::date = CURRENT_DATE)::int AS movimientos_hoy
      FROM pagos
      WHERE date_trunc('month', pagado_at AT TIME ZONE 'America/Mexico_City') = date_trunc('month', now() AT TIME ZONE 'America/Mexico_City')
    `, []),
    optional(async () => sql`
      SELECT id, nombre, stock::numeric, stock_minimo::numeric
      FROM inventario_productos
      WHERE activo IS TRUE AND stock <= stock_minimo
      ORDER BY (stock - stock_minimo) ASC, nombre
      LIMIT 6
    `, []),
    optional(async () => sql`
      SELECT
        (SELECT count(*)::int FROM staff WHERE activo IS TRUE) AS staff_activo,
        (SELECT count(*)::int FROM cabinas WHERE activa IS TRUE) AS cabinas_activas,
        (SELECT count(*)::int FROM reservas WHERE fecha = CURRENT_DATE AND estado <> 'cancelada' AND staff_id IS NULL) AS sin_terapeuta,
        (SELECT count(*)::int FROM reservas WHERE fecha = CURRENT_DATE AND estado <> 'cancelada' AND cabina_id IS NULL) AS sin_cabina
    `, []),
    sql`
      SELECT count(*)::int AS n FROM clientes c
      WHERE EXISTS (SELECT 1 FROM reservas r WHERE r.cliente_id = c.id AND r.estado <> 'cancelada')
        AND NOT EXISTS (SELECT 1 FROM reservas r WHERE r.cliente_id = c.id AND r.estado <> 'cancelada' AND r.fecha >= CURRENT_DATE - 90)
    `,
  ])

  const baseRow = base[0] || {}
  const paymentRow = payments[0] || null
  const operationsRow = operations[0] || null
  return {
    reservasHoy: asNumber(baseRow.reservas_hoy),
    clientasActivas: asNumber(baseRow.clientas_activas),
    membresiasActivas: asNumber(baseRow.membresias_activas),
    serviciosActivos: asNumber(baseRow.servicios_activos),
    ingresosMes: paymentRow ? asNumber(paymentRow.ingresos_mes) : null,
    ingresosHoy: paymentRow ? asNumber(paymentRow.ingresos_hoy) : null,
    movimientosHoy: paymentRow ? asNumber(paymentRow.movimientos_hoy) : null,
    agenda: agenda.slice(0, 8),
    inventory: inventory.map((row) => ({ id: Number(row.id), nombre: String(row.nombre), stock: asNumber(row.stock), minimo: asNumber(row.stock_minimo) })),
    operations: operationsRow ? {
      staff: asNumber(operationsRow.staff_activo),
      rooms: asNumber(operationsRow.cabinas_activas),
      unassignedStaff: asNumber(operationsRow.sin_terapeuta),
      unassignedRoom: asNumber(operationsRow.sin_cabina),
    } : null,
    clientsToRecover: asNumber(recovery[0]?.n),
  }
}

export async function getAgenda(date?: string): Promise<AgendaItem[]> {
  const selectedDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null
  const rows = await optional(async () => sql`
    SELECT r.id, r.fecha, r.hora, r.estado, r.notas, r.origen,
           c.id AS cliente_id, concat_ws(' ', c.nombre, c.apellido) AS clienta,
           t.nombre AS tratamiento, t.duracion_min, t.precio,
           s.id AS staff_id, s.nombre AS terapeuta,
           cb.id AS cabina_id, cb.nombre AS cabina
    FROM reservas r
    LEFT JOIN clientes c ON c.id = r.cliente_id
    LEFT JOIN tratamientos t ON t.id = r.tratamiento_id
    LEFT JOIN staff s ON s.id = r.staff_id
    LEFT JOIN cabinas cb ON cb.id = r.cabina_id
    WHERE r.fecha = COALESCE(${selectedDate}::date, CURRENT_DATE)
    ORDER BY r.hora ASC
  `, null)

  const fallback = rows ?? await sql`
    SELECT r.id, r.fecha, r.hora, r.estado, r.notas,
           c.id AS cliente_id, concat_ws(' ', c.nombre, c.apellido) AS clienta,
           t.nombre AS tratamiento, t.duracion_min, t.precio
    FROM reservas r
    LEFT JOIN clientes c ON c.id = r.cliente_id
    LEFT JOIN tratamientos t ON t.id = r.tratamiento_id
    WHERE r.fecha = COALESCE(${selectedDate}::date, CURRENT_DATE)
    ORDER BY r.hora ASC
  `

  return fallback.map((row) => ({
    id: Number(row.id), fecha: String(row.fecha).slice(0, 10), hora: timeString(row.hora), estado: String(row.estado),
    notas: row.notas ? String(row.notas) : null, origen: row.origen ? String(row.origen) : 'app',
    clienteId: row.cliente_id ? Number(row.cliente_id) : null, clienta: String(row.clienta || 'Sin clienta'),
    tratamiento: String(row.tratamiento || 'Servicio sin asignar'), duracion: asNumber(row.duracion_min), precio: asNumber(row.precio),
    staffId: row.staff_id ? Number(row.staff_id) : null, terapeuta: row.terapeuta ? String(row.terapeuta) : null,
    cabinaId: row.cabina_id ? Number(row.cabina_id) : null, cabina: row.cabina ? String(row.cabina) : null,
  }))
}

export async function getStaffAndRooms() {
  const [staff, rooms] = await Promise.all([
    optional(async () => sql`SELECT id, nombre, rol, especialidades, telefono, email, activo FROM staff ORDER BY activo DESC, nombre`, []),
    optional(async () => sql`SELECT id, nombre, tipo, capacidad, activa, notas FROM cabinas ORDER BY activa DESC, nombre`, []),
  ])
  return {
    staff: staff.map((row) => ({ id: Number(row.id), nombre: String(row.nombre), rol: String(row.rol), especialidades: Array.isArray(row.especialidades) ? row.especialidades.map(String) : [], telefono: row.telefono ? String(row.telefono) : null, email: row.email ? String(row.email) : null, activo: Boolean(row.activo) })) as StaffItem[],
    rooms: rooms.map((row) => ({ id: Number(row.id), nombre: String(row.nombre), tipo: row.tipo ? String(row.tipo) : null, capacidad: asNumber(row.capacidad), activa: Boolean(row.activa), notas: row.notas ? String(row.notas) : null })) as RoomItem[],
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  const rows = await sql`SELECT id, slug, nombre, categoria, duracion_min, precio, activo FROM tratamientos ORDER BY categoria, nombre`
  return rows.map((row) => ({ id: Number(row.id), slug: String(row.slug), nombre: String(row.nombre), categoria: String(row.categoria), duracion: asNumber(row.duracion_min), precio: asNumber(row.precio), activo: Boolean(row.activo) }))
}

export async function getClients(): Promise<ClientItem[]> {
  const base = await sql`
    SELECT c.id, concat_ws(' ', c.nombre, c.apellido) AS nombre, c.email, c.membresia,
           count(r.id) FILTER (WHERE r.estado <> 'cancelada')::int AS visitas,
           max(r.fecha) FILTER (WHERE r.estado <> 'cancelada') AS ultima_visita
    FROM clientes c LEFT JOIN reservas r ON r.cliente_id = c.id
    GROUP BY c.id ORDER BY max(r.fecha) DESC NULLS LAST, c.created_at DESC
  `
  const extras = await optional(async () => sql`
    SELECT c.id, c.telefono, c.notas_internas,
           COALESCE(sum(CASE WHEN p.tipo = 'ingreso' THEN p.monto ELSE 0 END),0)::numeric AS gasto
    FROM clientes c LEFT JOIN pagos p ON p.cliente_id = c.id GROUP BY c.id
  `, [])
  const byId = new Map(extras.map((row) => [Number(row.id), row]))
  return base.map((row) => {
    const extra = byId.get(Number(row.id))
    return { id: Number(row.id), nombre: String(row.nombre || 'Sin nombre'), email: row.email ? String(row.email) : null, telefono: extra?.telefono ? String(extra.telefono) : null, membresia: row.membresia ? String(row.membresia) : null, visitas: asNumber(row.visitas), ultimaVisita: dateString(row.ultima_visita), gasto: asNumber(extra?.gasto), notas: extra?.notas_internas ? String(extra.notas_internas) : null }
  })
}

export async function getPayments() {
  const rows = await optional(async () => sql`
    SELECT p.id, p.concepto, p.monto, p.tipo, p.metodo, p.pagado_at, p.reserva_id,
           concat_ws(' ', c.nombre, c.apellido) AS clienta
    FROM pagos p LEFT JOIN clientes c ON c.id = p.cliente_id
    ORDER BY p.pagado_at DESC LIMIT 100
  `, [])
  const totals = await optional(async () => sql`
    SELECT
      COALESCE(sum(CASE WHEN tipo='ingreso' THEN monto ELSE 0 END),0)::numeric AS entradas,
      COALESCE(sum(CASE WHEN tipo IN ('egreso','reembolso') THEN monto ELSE 0 END),0)::numeric AS salidas,
      COALESCE(sum(CASE WHEN tipo='ingreso' THEN monto ELSE -monto END),0)::numeric AS balance
    FROM pagos WHERE pagado_at::date = CURRENT_DATE
  `, [])
  return {
    items: rows.map((row) => ({ id: Number(row.id), concepto: String(row.concepto), monto: asNumber(row.monto), tipo: String(row.tipo), metodo: String(row.metodo), pagadoAt: String(row.pagado_at), clienta: row.clienta ? String(row.clienta) : null, reservaId: row.reserva_id ? Number(row.reserva_id) : null })) as PaymentItem[],
    totals: totals[0] ? { entradas: asNumber(totals[0].entradas), salidas: asNumber(totals[0].salidas), balance: asNumber(totals[0].balance) } : null,
  }
}

export async function getInventory(): Promise<InventoryItem[]> {
  const rows = await optional(async () => sql`
    SELECT id, nombre, sku, categoria, unidad, stock, stock_minimo, costo, precio
    FROM inventario_productos WHERE activo IS TRUE ORDER BY (stock <= stock_minimo) DESC, nombre
  `, [])
  return rows.map((row) => ({ id: Number(row.id), nombre: String(row.nombre), sku: row.sku ? String(row.sku) : null, categoria: row.categoria ? String(row.categoria) : null, unidad: String(row.unidad), stock: asNumber(row.stock), minimo: asNumber(row.stock_minimo), costo: row.costo == null ? null : asNumber(row.costo), precio: row.precio == null ? null : asNumber(row.precio) }))
}

export async function getMemberships() {
  const [plans, subscriptions, giftCards] = await Promise.all([
    optional(async () => sql`SELECT id, nombre, precio_mensual, beneficios, sesiones_mes, activo FROM membresia_planes ORDER BY precio_mensual`, []),
    optional(async () => sql`
      SELECT ms.id, ms.estado, ms.inicio, ms.renovacion, ms.sesiones_disponibles,
             mp.nombre AS plan, concat_ws(' ', c.nombre, c.apellido) AS clienta
      FROM membresia_suscripciones ms JOIN membresia_planes mp ON mp.id=ms.plan_id JOIN clientes c ON c.id=ms.cliente_id
      ORDER BY ms.estado='activa' DESC, ms.renovacion NULLS LAST
    `, []),
    sql`SELECT id, codigo, monto, destinatario_nombre, destinatario_email, estado, created_at FROM gift_cards ORDER BY created_at DESC`,
  ])
  return { plans, subscriptions, giftCards }
}

export async function getAnalytics() {
  const [series, top, clients, payments] = await Promise.all([
    optional(async () => sql`
      SELECT d::date AS fecha, COALESCE(sum(CASE WHEN p.tipo='ingreso' THEN p.monto ELSE -p.monto END),0)::numeric AS total
      FROM generate_series(CURRENT_DATE - 29, CURRENT_DATE, interval '1 day') d
      LEFT JOIN pagos p ON p.pagado_at::date=d::date GROUP BY d ORDER BY d
    `, []),
    sql`
      SELECT t.nombre, count(*)::int AS sesiones
      FROM reservas r JOIN tratamientos t ON t.id=r.tratamiento_id
      WHERE r.fecha >= CURRENT_DATE - 30 AND r.estado <> 'cancelada'
      GROUP BY t.nombre ORDER BY sesiones DESC LIMIT 6
    `,
    sql`SELECT count(*)::int AS total, count(*) FILTER (WHERE created_at >= CURRENT_DATE - 30)::int AS nuevas FROM clientes`,
    optional(async () => sql`SELECT count(*)::int AS movimientos, COALESCE(sum(CASE WHEN tipo='ingreso' THEN monto ELSE -monto END),0)::numeric AS neto FROM pagos WHERE pagado_at >= CURRENT_DATE - 30`, []),
  ])
  return { series, top, clients: clients[0] || {}, payments: payments[0] || null }
}

export async function getConfig() {
  const rows = await optional(async () => sql`SELECT clave, valor, updated_at FROM spa_config ORDER BY clave`, [])
  return rows
}
