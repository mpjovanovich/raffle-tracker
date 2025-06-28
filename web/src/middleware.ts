import { verifyAuthToken } from '@raffle-tracker/auth';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
  '/_api',
  '/_next',
  '/favicon',
  '/login',
  '/signup',
  '/reset-password',
];

export async function middleware(request: NextRequest) {
  // Skip middleware for API routes, static files, etc.
  if (PUBLIC_ROUTES.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('accessToken')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const user = await verifyAuthToken(token);
    //   // Check if token expires within 10 minutes
    //   const tokenExp = user.exp * 1000;
    //   const now = Date.now();
    //   const tenMinutes = 10 * 60 * 1000;
    //   if (tokenExp - now < tenMinutes) {
    //     // Refresh token
    //     const newToken = generateAuthToken(user, TOKEN_TYPE.AUTH);
    //     const response = NextResponse.next();
    //     response.cookies.set('accessToken', newToken, {
    //       httpOnly: true,
    //       secure: config.nodeEnv === 'production',
    //       sameSite: 'lax',
    //       maxAge: config.jwtAuthTokenExpiresIn.expiresInSeconds,
    //     });
    //     return response;
    //   }
    return NextResponse.next();
  } catch {
    //   // Clear invalid token and redirect to login
    //   const response = NextResponse.redirect(new URL('/login', request.url));
    //   response.cookies.set('accessToken', '', { maxAge: 0 });
    //   return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
