// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get('refreshToken');
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // // Get user data to check roles
  // try {
  //   const { user } = await getUserFromRefreshToken(refreshToken.value);

  //   // Check if user has required role for this route
  //   const requiredRoles = getRequiredRoles(pathname);
  //   if (requiredRoles && !hasRequiredRole(user.roles, requiredRoles)) {
  //     return NextResponse.redirect(new URL('/unauthorized', request.url));
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   // Invalid refresh token
  //   const response = NextResponse.redirect(new URL('/login', request.url));
  //   response.cookies.delete('refreshToken');
  //   return response;
  // }
}

async function getUserFromRefreshToken(refreshToken: string) {
  // const response = await fetch('http://localhost:3001/auth/refresh', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${refreshToken}` },
  // });
  // if (!response.ok) throw new Error('Invalid refresh token');
  // return await response.json();
}

// TODO: Add role checking.
function getRequiredRoles(pathname: string) {
  const roleMap = {
    '/events': ['admin'],
    '/contests': ['admin'],
    '/horses': ['admin'],
    '/orders': ['admin'],
    '/tickets': ['admin'],
    '/users': ['admin'],
  };
  return roleMap[pathname as keyof typeof roleMap];
}

// Everything should be protected except auth routes.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.*|login|signup|resetPassword).*)',
  ],
};
