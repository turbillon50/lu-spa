import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { sql } from '../../../lib/db'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  try {
    // Solo se puede cancelar una reserva que pertenece al cliente autenticado
    // -- el join valida que el clerk_user_id coincida antes de tocar la fila.
    const result = await sql`
      UPDATE reservas SET estado = 'cancelada'
      WHERE id = ${id}
        AND cliente_id = (SELECT id FROM clientes WHERE clerk_user_id = ${userId})
      RETURNING id
    `
    if (result.length === 0) {
      return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al cancelar' }, { status: 500 })
  }
}
