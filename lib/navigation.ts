'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Route } from './types';

/**
 * Maps a logical route identifier and optional slug to an App Router URL path.
 */
export function routeToPath(route: Route, slug?: string): string {
  switch (route) {
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'departments':
      return '/departments';
    case 'department':
      return slug ? `/departments/${slug}` : '/departments';
    case 'events':
      return '/events';
    case 'event':
      return slug ? `/events/${slug}` : '/events';
    case 'projects':
      return '/projects';
    case 'project':
      return slug ? `/projects/${slug}` : '/projects';
    case 'blogs':
      return '/blogs';
    case 'blog':
      return slug ? `/blogs/${slug}` : '/blogs';
    case 'team':
      return '/team';
    case 'contact':
      return '/contact';
    case 'credits':
      return '/credits';
    default:
      return '/';
  }
}

/**
 * Maps a URL pathname to the corresponding Route identifier and ink background state.
 */
export function pathToRouteInfo(pathname: string): {
  route: Route;
  slug?: string;
  isInk: boolean;
} {
  const cleanPath = pathname.split('?')[0].replace(/\/$/, '') || '/';

  if (cleanPath === '/') {
    return { route: 'home', isInk: true };
  }

  if (cleanPath === '/about') {
    return { route: 'about', isInk: false };
  }

  if (cleanPath === '/departments') {
    return { route: 'departments', isInk: false };
  }

  if (cleanPath.startsWith('/departments/')) {
    const slug = cleanPath.replace('/departments/', '');
    return { route: 'department', slug, isInk: true };
  }

  if (cleanPath === '/events') {
    return { route: 'events', isInk: false };
  }

  if (cleanPath.startsWith('/events/')) {
    const slug = cleanPath.replace('/events/', '');
    return { route: 'event', slug, isInk: true };
  }

  if (cleanPath === '/projects') {
    return { route: 'projects', isInk: false };
  }

  if (cleanPath.startsWith('/projects/')) {
    const slug = cleanPath.replace('/projects/', '');
    return { route: 'project', slug, isInk: true };
  }

  if (cleanPath === '/blogs') {
    return { route: 'blogs', isInk: false };
  }

  if (cleanPath.startsWith('/blogs/')) {
    const slug = cleanPath.replace('/blogs/', '');
    return { route: 'blog', slug, isInk: false };
  }

  if (cleanPath === '/team') {
    return { route: 'team', isInk: false };
  }

  if (cleanPath === '/contact') {
    return { route: 'contact', isInk: false };
  }

  if (cleanPath === '/credits') {
    return { route: 'credits', isInk: false };
  }

  return { route: 'home', isInk: true };
}

export const PRIMARY_NAV_PATHS = [
  '/',
  '/about',
  '/departments',
  '/events',
  '/projects',
  '/blogs',
  '/team',
  '/contact',
  '/credits',
] as const;

/**
 * Hook providing a navigate function compatible with onNavigate(route, slug)
 */
export function useAppNavigation() {
  const router = useRouter();

  return (route: Route, slug?: string) => {
    const path = routeToPath(route, slug);
    // Trigger prefetch to ensure router cache hit
    router.prefetch(path);
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };
}
