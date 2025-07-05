import { COOKIE_NAMES } from '@/constants/constants';
import { verifyAuthToken } from '@raffle-tracker/auth';
import { ROLE } from '@raffle-tracker/dto';
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

// Define route patterns with their required roles
const ROUTE_PERMISSIONS = [
  {
    pattern: /^\/cashier$/,
    roles: [ROLE.EVENT_MANAGER, ROLE.CASHIER],
  },
  {
    pattern: /^\/events$/,
    roles: [ROLE.EVENT_MANAGER, ROLE.CASHIER, ROLE.SELLER, ROLE.VIEWER],
  },
  {
    pattern: /^\/events\/[^\/]+$/,
    roles: [ROLE.EVENT_MANAGER],
  },
  {
    pattern: /^\/events\/[^\/]+\/contests\/[^\/]+$/,
    roles: [ROLE.EVENT_MANAGER],
  },
  {
    pattern: /^\/events\/[^\/]+\/edit$/,
    roles: [ROLE.EVENT_MANAGER],
  },
  {
    pattern: /^\/events\/create$/,
    roles: [ROLE.EVENT_MANAGER],
  },
  {
    pattern: /^\/reports\/[^\/]+$/,
    roles: [ROLE.EVENT_MANAGER],
  },
  {
    pattern: /^\/tickets\/[^\/]+$/,
    roles: [ROLE.EVENT_MANAGER, ROLE.SELLER],
  },
] as const;

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
    const user = await verifyAuthToken(accessToken);

    if (!user.roles || user.roles.length === 0) {
      // TODO: Logging
      // User should never be in this state - someone needs to assign a role to the user.
      // User should at least have the VIEWER role.
      const response = NextResponse.redirect(
        new URL(
          '/login?message=User has no roles. Please contact an administrator.',
          request.url
        )
      );
      response.cookies.set(COOKIE_NAMES.LOGGED_IN, '', {
        maxAge: 0,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      return response;
    }

    // Find matching route pattern
    const matchingRoute = ROUTE_PERMISSIONS.find(route =>
      route.pattern.test(request.nextUrl.pathname)
    );

    if (
      // Admins can access all pages
      !user.roles.includes(ROLE.ADMIN) &&
      // User only needs to have one of the required roles if any are defined
      matchingRoute &&
      !matchingRoute.roles.some(role =>
        user.roles?.some(userRole => userRole === role)
      )
    ) {
      // If anyone tries to hit a page they don't have access to, redirect to the root page.
      // The root page (currently events) needs to allow VIEWER or this will loop endlessly!
      return NextResponse.redirect(new URL('/', request.url));
    }

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
