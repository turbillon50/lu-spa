import { NextResponse } from 'next/server'
import { sql } from '../../../lib/db'

export const dynamic = 'force-dynamic'

// Mismo nivel de apertura que el resto de /api/admin (sin Clerk, a peticion
// de Luis). Si algun dia se blinda el admin, esta ruta se protege junto con
// las demas.
export async function GET() {
  try {
    const rows = await sql`
      SELECT
        c.id, c.cliente_id, c.ultimo_mensaje_at,
        cl.nombre, cl.apellido, cl.email,
        (SELECT texto FROM mensajes m WHERE m.conversacion_id = c.id ORDER BY m.created_at DESC LIMIT 1) AS ultimo_texto,
        (SELECT count(*)::int FROM mensajes m WHERE m.conversacion_id = c.id AND m.remitente = 'cliente' AND m.leido_por_admin = false) AS no_leidos
      FROM conversaciones c
      JOIN clientes cl ON cl.id = c.cliente_id
      ORDER BY c.ultimo_mensaje_at DESC
    `
    return NextResponse.json({ conversaciones: rows })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al leer conversaciones' }, { status: 500 })
  }
}
