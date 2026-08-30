import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, verifyAdminSession } from './app/lib/admin-auth'

// Solo /mi-lucienne (cuenta de cliente) depende de Clerk.
// /admin queda fuera a proposito -- Luis lo quiere separado, con su propio
// candado, sin mezclarse con el sistema de cuentas de clientas.
const isProtectedRoute = createRouteMatcher(['/mi-lucienne(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname
  const adminPublic = pathname === '/admin/acceso' || pathname === '/api/admin/session'
  const adminProtected = pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/')

  if (adminProtected && !adminPublic) {
    const valid = await verifyAdminSession(req.cookies.get(ADMIN_COOKIE)?.value)
    if (!valid) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/acceso', req.url))
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL('/login', req.url).toString(),
    })
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
