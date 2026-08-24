import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { sql, getOrCreateClienteId, ensureReferralCode } from '../../lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const clienteId = await getOrCreateClienteId()
    const user = await currentUser()
    const code = await ensureReferralCode(clienteId, user?.firstName || null)

    const row = await sql`SELECT puntos FROM clientes WHERE id = ${clienteId}`
    const referidos = await sql`
      SELECT c.nombre, c.apellido, r.puntos_otorgados, r.created_at
      FROM referidos r
      JOIN clientes c ON c.id = r.referred_cliente_id
      WHERE r.referrer_cliente_id = ${clienteId}
      ORDER BY r.created_at DESC
    `
    const yaCanjeo = await sql`SELECT 1 FROM referidos WHERE referred_cliente_id = ${clienteId}`

    return NextResponse.json({
      codigo: code,
      puntos: row[0]?.puntos ?? 0,
      totalReferidos: referidos.length,
      referidos,
      yaCanjeoUnCodigo: yaCanjeo.length > 0,
    })
  } catch (err) {
    if (err instanceof Error && err.message === 'NO_AUTH') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Error al leer referidos' }, { status: 500 })
  }
}
