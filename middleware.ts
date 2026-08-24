import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Solo /mi-lucienne (cuenta de cliente) depende de Clerk.
// /admin queda fuera a proposito -- Luis lo quiere separado, con su propio
// candado, sin mezclarse con el sistema de cuentas de clientas.
const isProtectedRoute = createRouteMatcher(['/mi-lucienne(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL('/login', req.url).toString(),
    })
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
