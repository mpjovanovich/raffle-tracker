import { NextResponse, type NextRequest } from 'next/server';

// TODO: may need a bypass flag, like with the API

export function middleware(request: NextRequest) {
  // Get refresh token from cookie
  const refreshToken = request.cookies.get('refreshToken');
  console.error('Refresh Token: ' + refreshToken);

  if (!refreshToken) {
    // TODO
    // Redirect to login
    // return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.next();
  }

  // Add auth header to all API requests
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${refreshToken.value}`);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/events/:path*',
    '/tickets/:path*',
    '/cashier/:path*',
    '/report/:path*',
  ],
};
