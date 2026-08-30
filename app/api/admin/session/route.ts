import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, createAdminSession, validAdminCredentials } from '../../../lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (request.nextUrl.searchParams.get('logout') === '1') {
    const response = NextResponse.redirect(new URL('/admin/acceso', request.url), 303)
    response.cookies.set(ADMIN_COOKIE, '', { expires: new Date(0), path: '/' })
    return response
  }

  const form = await request.formData()
  const email = String(form.get('email') || '')
  const password = String(form.get('password') || '')
  if (!validAdminCredentials(email, password)) {
    return NextResponse.redirect(new URL('/admin/acceso?error=credenciales', request.url), 303)
  }

  const response = NextResponse.redirect(new URL('/admin', request.url), 303)
  response.cookies.set(ADMIN_COOKIE, await createAdminSession(email), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12,
    path: '/',
  })
  return response
}
