import { neon } from '@neondatabase/serverless'

// Cliente Neon compartido para todas las rutas API. Usa siempre el host
// -pooler (evita timeouts en serverless).
export const sql = neon(process.env.DATABASE_URL!)
