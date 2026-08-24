import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { sql } from '../../lib/db'

// Encuentra o crea la fila del cliente en Neon a partir de la sesion real
// de Clerk (nunca se confia en datos que mande el cliente para la identidad).
async function getOrCreateCliente(): Promise<number> {
  const { userId } = await auth()
  if (!userId) throw new Error('NO_AUTH')

  const existing = await sql`SELECT id FROM clientes WHERE clerk_user_id = ${userId}`
  if (existing.length > 0) return existing[0].id as number

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress || null
  const nombre = user?.firstName || null
  const apellido = user?.lastName || null

  const inserted = await sql`
    INSERT INTO clientes (clerk_user_id, nombre, apellido, email)
    VALUES (${userId}, ${nombre}, ${apellido}, ${email})
    ON CONFLICT (clerk_user_id) DO UPDATE SET email = EXCLUDED.email
    RETURNING id
  `
  return inserted[0].id as number
}

export async function GET() {
  try {
    const clienteId = await getOrCreateCliente()
    const rows = await sql`
      SELECT r.id, r.fecha, r.hora, r.estado, r.notas,
             t.nombre AS tratamiento, t.precio, t.duracion_min
      FROM reservas r
      JOIN tratamientos t ON t.id = r.tratamiento_id
      WHERE r.cliente_id = ${clienteId}
      ORDER BY r.fecha DESC, r.hora DESC
    `
    return NextResponse.json({ reservas: rows })
  } catch (err) {
    if (err instanceof Error && err.message === 'NO_AUTH') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Error al leer reservas' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const clienteId = await getOrCreateCliente()
    const body = await req.json()
    const { tratamientoSlug, fecha, hora, notas } = body as {
      tratamientoSlug: string; fecha: string; hora: string; notas?: string
    }

    if (!tratamientoSlug || !fecha || !hora) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })
    }

    const tratamiento = await sql`SELECT id FROM tratamientos WHERE slug = ${tratamientoSlug}`
    if (tratamiento.length === 0) {
      return NextResponse.json({ error: 'Tratamiento no encontrado' }, { status: 404 })
    }

    const inserted = await sql`
      INSERT INTO reservas (cliente_id, tratamiento_id, fecha, hora, notas, estado)
      VALUES (${clienteId}, ${tratamiento[0].id}, ${fecha}, ${hora}, ${notas || null}, 'confirmada')
      RETURNING id, fecha, hora, estado
    `
    return NextResponse.json({ reserva: inserted[0] }, { status: 201 })
  } catch (err) {
    if (err instanceof Error && err.message === 'NO_AUTH') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Error al crear la reserva' }, { status: 500 })
  }
}
