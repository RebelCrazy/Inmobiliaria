import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger rutas del admin (excepto la página de login)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const token = request.cookies.get('elite_admin_token')?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  // Proteger API routes del admin
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('elite_admin_token')?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
