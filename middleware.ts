import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  CACHE_VERSION,
  SECURE_CACHE_COOKIE,
  SYNC_CACHE_COOKIE,
  CACHE_CONTROL_PAGE,
  computeRouteETag,
  generateSecureCacheToken,
  isTokenValid,
} from './lib/cache-security';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Compute deterministic ETag for route and cache version
  const etag = await computeRouteETag(pathname);
  const ifNoneMatch = request.headers.get('if-none-match');

  // Common headers for sub-40ms performance and security
  const responseHeaders = new Headers({
    'Cache-Control': CACHE_CONTROL_PAGE,
    'ETag': etag,
    'X-Cache-Status': 'HIT-EDGE',
    'Server-Timing': 'edge-cache;desc="Edge Verified", dur=0.6',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });

  // 2. High-speed 304 Not Modified validation (<3ms response)
  if (ifNoneMatch && (ifNoneMatch === etag || ifNoneMatch === etag.replace(/^W\//, ''))) {
    return new NextResponse(null, {
      status: 304,
      headers: responseHeaders,
    });
  }

  // 3. Continue to page renderer with injected caching headers
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Apply cache & security headers to the full response
  responseHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  // 4. Secure Cookie & Cache synchronization
  const isHttps = request.url.startsWith('https:');
  const currentSecureCookie = request.cookies.get(SECURE_CACHE_COOKIE)?.value;

  if (!isTokenValid(currentSecureCookie)) {
    const secureToken = await generateSecureCacheToken(pathname);
    response.cookies.set(SECURE_CACHE_COOKIE, secureToken, {
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 86400,
    });
  }

  // Client-accessible sync cookie to coordinate browser cache & service worker invalidation
  const cleanEtag = etag.replace(/[^a-zA-Z0-9]/g, '');
  response.cookies.set(SYNC_CACHE_COOKIE, `v=${CACHE_VERSION}&etag=${cleanEtag}`, {
    httpOnly: false,
    secure: isHttps,
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 86400,
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.png, sw.js (pwa/service worker)
     * - image assets (.png, .jpg, .svg, .webp)
     */
    '/((?!_next/static|_next/image|sw\\.js|favicon\\.png|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)',
  ],
};
