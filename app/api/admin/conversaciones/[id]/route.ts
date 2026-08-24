import { NextRequest, NextResponse } from 'next/server'
import { sql } from '../../../../lib/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const convId = parseInt(params.id, 10)
    if (!convId) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const mensajes = await sql`
      SELECT id, remitente, texto, created_at
      FROM mensajes WHERE conversacion_id = ${convId}
      ORDER BY created_at ASC
    `
    await sql`UPDATE mensajes SET leido_por_admin = true WHERE conversacion_id = ${convId} AND remitente = 'cliente'`

    return NextResponse.json({ mensajes })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al leer la conversación' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const convId = parseInt(params.id, 10)
    if (!convId) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

    const body = await req.json()
    const texto = String(body?.texto || '').trim().slice(0, 2000)
    if (!texto) return NextResponse.json({ error: 'Mensaje vacío' }, { status: 400 })

    const inserted = await sql`
      INSERT INTO mensajes (conversacion_id, remitente, texto, leido_por_cliente)
      VALUES (${convId}, 'admin', ${texto}, false)
      RETURNING id, remitente, texto, created_at
    `
    await sql`UPDATE conversaciones SET ultimo_mensaje_at = now() WHERE id = ${convId}`

    return NextResponse.json({ mensaje: inserted[0] }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al enviar mensaje' }, { status: 500 })
  }
}
