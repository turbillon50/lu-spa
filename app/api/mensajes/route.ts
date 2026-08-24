import { NextRequest, NextResponse } from 'next/server'
import { sql, getOrCreateClienteId } from '../../lib/db'

async function getOrCreateConversacion(clienteId: number): Promise<number> {
  const existing = await sql`SELECT id FROM conversaciones WHERE cliente_id = ${clienteId}`
  if (existing.length > 0) return existing[0].id as number
  const inserted = await sql`INSERT INTO conversaciones (cliente_id) VALUES (${clienteId}) RETURNING id`
  return inserted[0].id as number
}

export async function GET() {
  try {
    const clienteId = await getOrCreateClienteId()
    const convId = await getOrCreateConversacion(clienteId)

    const mensajes = await sql`
      SELECT id, remitente, texto, created_at
      FROM mensajes WHERE conversacion_id = ${convId}
      ORDER BY created_at ASC
    `
    await sql`UPDATE mensajes SET leido_por_cliente = true WHERE conversacion_id = ${convId} AND remitente = 'admin'`

    return NextResponse.json({ mensajes })
  } catch (err) {
    if (err instanceof Error && err.message === 'NO_AUTH') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Error al leer mensajes' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const clienteId = await getOrCreateClienteId()
    const convId = await getOrCreateConversacion(clienteId)
    const body = await req.json()
    const texto = String(body?.texto || '').trim().slice(0, 2000)

    if (!texto) return NextResponse.json({ error: 'Mensaje vacío' }, { status: 400 })

    const inserted = await sql`
      INSERT INTO mensajes (conversacion_id, remitente, texto, leido_por_admin)
      VALUES (${convId}, 'cliente', ${texto}, false)
      RETURNING id, remitente, texto, created_at
    `
    await sql`UPDATE conversaciones SET ultimo_mensaje_at = now() WHERE id = ${convId}`

    return NextResponse.json({ mensaje: inserted[0] }, { status: 201 })
  } catch (err) {
    if (err instanceof Error && err.message === 'NO_AUTH') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Error al enviar mensaje' }, { status: 500 })
  }
}
