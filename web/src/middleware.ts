// middleware.js
import { getCurrentUser } from '@/utils/authUtility';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  const userCookie = request.cookies.get('user');

  // If no tokens, redirect to login
  if (!accessToken || !refreshToken || !userCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const user = await getCurrentUser();
  if (!user || !user.roles) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check if user has required role for this route
  const requiredRoles = getRequiredRoles(pathname);
  if (requiredRoles && !hasRequiredRole(user.roles, requiredRoles)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

function getRequiredRoles(pathname: string) {
  const roleMap: Record<string, string[]> = {
    '/events': ['admin'],
    '/contests': ['admin'],
    '/horses': ['admin'],
    '/orders': ['admin'],
    '/tickets': ['admin'],
    '/users': ['admin'],
    '/cashier': ['admin'],
  };
  return roleMap[pathname];
}

function hasRequiredRole(
  userRoles: string[],
  requiredRoles: string[]
): boolean {
  return userRoles.some(role => requiredRoles.includes(role));
}

// Everything should be protected except auth routes.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.*|login|signup|resetPassword).*)',
  ],
};
