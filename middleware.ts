import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

/*
  DEMO MODE (no Clerk keys):
  Routes are open; /mi-lucienne and /admin are protected client-side
  via the mode context (useMode hook + demo selector).

  TO ACTIVATE CLERK PROTECTION:
  1. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to .env.local
  2. Replace this middleware with the Clerk version below:

  import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
  const isProtectedRoute = createRouteMatcher(['/mi-lucienne(.*)', '/admin(.*)'])
  export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
  })
  export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'] }
*/
export default function middleware(_req: NextRequest) {
  return NextResponse.next()
}
