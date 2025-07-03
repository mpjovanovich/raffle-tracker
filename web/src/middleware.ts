// import { verifyAuthToken } from '@raffle-tracker/auth';
import { COOKIE_NAMES } from '@/constants/constants';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
  '/_api',
  '/_next',
  '/favicon',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const loggedIn = request.cookies.get(COOKIE_NAMES.LOGGED_IN)?.value;

  // Skip middleware for API routes, static files, etc.
  if (PUBLIC_ROUTES.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!accessToken) {
    let redirectUrl = '/login';
    if (loggedIn === 'true') {
      // This is the case where the user was previously logged in, but their access
      // token has expired.
      redirectUrl += '?message=Login session expired. Please log in again.';
    }

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    response.cookies.set(COOKIE_NAMES.LOGGED_IN, '', {
      maxAge: 0,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return response;
  }

  try {
    // TODO: This is currently breaking because it runs in an edge function.
    // This means that it doesn't have access to the NodeJS environment.
    // Currently switching to Docker container to remove the need for the dotenv
    // dependency.  I think this will make the login patterns much cleaner.
    // We'll be able to move all of the auth checks into middleware.

    // It would still be nice to define attributes on the pages - not sure of
    // Node has a way to put in meta tags for the page functions?

    // const user = await verifyAuthToken(token);
    return NextResponse.next();
  } catch {
    // Clear both tokens and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.set(COOKIE_NAMES.ACCESS_TOKEN, '', { maxAge: 0 });
    response.cookies.set(COOKIE_NAMES.LOGGED_IN, '', { maxAge: 0 });
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
