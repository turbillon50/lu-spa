import { neon } from '@neondatabase/serverless'

// Cliente Neon compartido para todas las rutas API. Usa siempre el host
// -pooler (evita timeouts en serverless).
// fetchOptions cache:'no-store' es obligatorio -- Next.js parchea el fetch
// global y cachea las llamadas HTTP del driver de Neon aunque la ruta tenga
// dynamic='force-dynamic'. Sin esto, GET /api/admin/conversaciones (y
// cualquier otra ruta que lea seguido) puede devolver datos viejos.
export const sql = neon(process.env.DATABASE_URL!, {
  fetchOptions: { cache: 'no-store' },
})

// --- Compartido para rutas de referidos (no toca getOrCreateCliente que ya
// vive inline en app/api/reservas/route.ts -- mismo patron, sin duplicar el
// riesgo de tocar ese archivo mientras otro agente pudiera estar en el). ---
import { auth, currentUser } from '@clerk/nextjs/server'

export async function getOrCreateClienteId(): Promise<number> {
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

function generarCodigoReferido(nombre: string | null): string {
  const base = (nombre || 'LUCIENNE').toUpperCase().normalize('NFD').replace(/[^A-Z]/g, '').slice(0, 6) || 'LC'
  const suf = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${base}${suf}`
}

export async function ensureReferralCode(clienteId: number, nombre: string | null): Promise<string> {
  const existing = await sql`SELECT referral_code FROM clientes WHERE id = ${clienteId}`
  if (existing[0]?.referral_code) return existing[0].referral_code as string

  for (let i = 0; i < 6; i++) {
    const code = generarCodigoReferido(nombre)
    try {
      await sql`UPDATE clientes SET referral_code = ${code} WHERE id = ${clienteId}`
      return code
    } catch {
      // colision de codigo unico, reintenta con otro
    }
  }
  throw new Error('No se pudo generar un codigo de referido')
}
