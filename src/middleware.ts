import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que no requieren autenticación
const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Si es una ruta pública, permitir acceso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Verificar el estado de autenticación desde localStorage
  const authData = request.cookies.get('auth_data');

  // Si no hay datos de autenticación, redirigir al login
  if (!authData) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { expiresAt } = JSON.parse(authData.value);
    
    // Si la sesión ha expirado, redirigir al login
    if (Date.now() > expiresAt) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configurar qué rutas deben ser protegidas
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas API)
     * 2. /_next (archivos Next.js)
     * 3. /_static (archivos estáticos)
     * 4. /favicon.ico, /sitemap.xml (archivos del sistema)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml).*)',
  ],
};
