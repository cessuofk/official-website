/**
 * Cache Security & Invalidation Utilities
 * Provides cryptographic token generation, ETag hashing, and cookie contracts
 * for sub-40ms edge-cached and browser-cached delivery.
 */

export const CACHE_VERSION = '2026.09.03';
export const SECURE_CACHE_COOKIE = 'cess_sec_cache';
export const SYNC_CACHE_COOKIE = 'cess_cache_sync';

export const CACHE_CONTROL_PAGE = 'public, max-age=120, s-maxage=3600, stale-while-revalidate=86400';
export const CACHE_CONTROL_STATIC = 'public, max-age=31536000, immutable';

/**
 * Computes a fast deterministic ETag for a given route and build version.
 */
export async function computeRouteETag(pathname: string): Promise<string> {
  const normalized = pathname.toLowerCase().replace(/\/$/, '') || '/';
  const data = `${CACHE_VERSION}:${normalized}`;
  const encoded = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `W/"cess-${hex}"`;
}

/**
 * Generates a signed cryptographic token to store in a secure HttpOnly cookie.
 */
export async function generateSecureCacheToken(pathname: string): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const raw = `${CACHE_VERSION}|${pathname}|${timestamp}|cess_secret_salt_2026`;
  const encoded = new TextEncoder().encode(raw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const sig = hashArray.slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `v1.${timestamp}.${sig}`;
}

/**
 * Verifies if a secure cache token is well-formed and unexpired (max 30 days).
 */
export function isTokenValid(token?: string): boolean {
  if (!token || !token.startsWith('v1.')) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const timestamp = parseInt(parts[1], 10);
  if (isNaN(timestamp)) return false;
  const now = Math.floor(Date.now() / 1000);
  const age = now - timestamp;
  return age >= 0 && age < 30 * 86400;
}
