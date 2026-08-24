import { NextRequest, NextResponse } from 'next/server'
import { sql, getOrCreateClienteId } from '../../../lib/db'

const PUNTOS_REFERIDOR = 100
const PUNTOS_BIENVENIDA = 50

export async function POST(req: NextRequest) {
  try {
    const clienteId = await getOrCreateClienteId()
    const body = await req.json()
    const codigo = String(body?.codigo || '').trim().toUpperCase()

    if (!codigo) {
      return NextResponse.json({ error: 'Ingresa un código' }, { status: 400 })
    }

    const yaCanjeo = await sql`SELECT 1 FROM referidos WHERE referred_cliente_id = ${clienteId}`
    if (yaCanjeo.length > 0) {
      return NextResponse.json({ error: 'Ya usaste un código de referido antes' }, { status: 409 })
    }

    const referrer = await sql`SELECT id FROM clientes WHERE referral_code = ${codigo}`
    if (referrer.length === 0) {
      return NextResponse.json({ error: 'Ese código no existe' }, { status: 404 })
    }
    const referrerId = referrer[0].id as number

    if (referrerId === clienteId) {
      return NextResponse.json({ error: 'No puedes usar tu propio código' }, { status: 400 })
    }

    await sql`
      INSERT INTO referidos (referrer_cliente_id, referred_cliente_id, puntos_otorgados)
      VALUES (${referrerId}, ${clienteId}, ${PUNTOS_REFERIDOR})
    `
    await sql`UPDATE clientes SET puntos = puntos + ${PUNTOS_REFERIDOR} WHERE id = ${referrerId}`
    await sql`UPDATE clientes SET puntos = puntos + ${PUNTOS_BIENVENIDA} WHERE id = ${clienteId}`

    return NextResponse.json({ ok: true, puntosGanados: PUNTOS_BIENVENIDA })
  } catch (err) {
    if (err instanceof Error && err.message === 'NO_AUTH') {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }
    console.error(err)
    return NextResponse.json({ error: 'Error al canjear el código' }, { status: 500 })
  }
}
