import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This used to also compute custom ETags and set a long-lived
// "public, s-maxage=3600, stale-while-revalidate=86400" Cache-Control
// on every page response. That's a second caching layer stacked on top
// of the service worker, and it's the same shape of bug: a CDN/browser
// can hold onto stale HTML for up to an hour after a deploy. Next.js
// already handles its own build-output caching correctly, so this only
// keeps the security headers and lets page caching happen normally.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|sw\\.js|favicon\\.png|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)',
  ],
};
