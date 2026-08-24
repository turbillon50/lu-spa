import { NextResponse } from 'next/server'
import { sql } from '../../../lib/db'

// Mismo nivel de apertura que la pagina /admin (sin Clerk, a peticion de
// Luis -- ver decision del 24-ago). Si en algun momento se quiere blindar,
// esta es la ruta a proteger.
export async function GET() {
  try {
    const hoy = new Date().toISOString().slice(0, 10)

    const [reservasHoy] = await sql`SELECT count(*)::int AS n FROM reservas WHERE fecha = ${hoy} AND estado != 'cancelada'`
    const [clientesActivos] = await sql`
      SELECT count(DISTINCT cliente_id)::int AS n FROM reservas
      WHERE fecha >= (current_date - interval '30 days') AND estado != 'cancelada'
    `
    const [ingresos] = await sql`
      SELECT COALESCE(sum(t.precio), 0)::numeric AS total
      FROM reservas r JOIN tratamientos t ON t.id = r.tratamiento_id
      WHERE date_trunc('month', r.fecha) = date_trunc('month', current_date)
        AND r.estado != 'cancelada'
    `
    const [membresias] = await sql`SELECT count(*)::int AS n FROM clientes WHERE membresia IS NOT NULL`

    const topTratamientos = await sql`
      SELECT t.nombre, count(*)::int AS sesiones
      FROM reservas r JOIN tratamientos t ON t.id = r.tratamiento_id
      WHERE r.estado != 'cancelada'
      GROUP BY t.nombre ORDER BY sesiones DESC LIMIT 5
    `

    const reservasDeHoy = await sql`
      SELECT r.id, r.hora, r.estado, t.nombre AS tratamiento,
             c.nombre AS cliente_nombre, c.apellido AS cliente_apellido
      FROM reservas r
      JOIN tratamientos t ON t.id = r.tratamiento_id
      JOIN clientes c ON c.id = r.cliente_id
      WHERE r.fecha = ${hoy} AND r.estado != 'cancelada'
      ORDER BY r.hora ASC
    `

    const clientesRecientes = await sql`
      SELECT c.nombre, c.apellido, c.membresia, count(r.id)::int AS visitas, max(r.fecha) AS ultima_visita
      FROM clientes c LEFT JOIN reservas r ON r.cliente_id = c.id AND r.estado != 'cancelada'
      GROUP BY c.id, c.nombre, c.apellido, c.membresia
      ORDER BY max(r.fecha) DESC NULLS LAST
      LIMIT 6
    `

    return NextResponse.json({
      reservasHoy: reservasHoy.n,
      clientesActivos: clientesActivos.n,
      ingresosMes: Number(ingresos.total),
      membresiasActivas: membresias.n,
      topTratamientos,
      reservasDeHoy,
      clientesRecientes,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al leer estadisticas' }, { status: 500 })
  }
}
