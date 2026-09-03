'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { TopProgressBar } from './TopProgressBar';
import { PRIMARY_NAV_PATHS } from '../lib/navigation';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();

  // Prefetch only the small set of primary nav routes. Next.js's own
  // <Link> already prefetches individual detail-page links when they
  // scroll into view, so we don't need to eagerly warm every single
  // department/event/project/blog slug on every page load — doing that
  // on mount (and again on every hover/touch, as the previous version
  // did) is unnecessary network + memory pressure, especially on phones.
  useEffect(() => {
    PRIMARY_NAV_PATHS.forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

  // Register the caching Service Worker, and make sure that if a NEW
  // version of it takes over (e.g. after we ship a fix like this one),
  // any tab still running under an old/broken worker reloads itself
  // once to pick up the fix automatically. This is what lets phones
  // that are currently stuck on a bad cached build self-heal the next
  // time they open the site, without the user needing to manually
  // clear their cache.
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const handleControllerChange = () => {
      const lastReload = sessionStorage.getItem('sw-reload-timestamp');
      const now = Date.now();
      
      // Enforce a 30-second cooldown to prevent infinite reload loops
      if (lastReload && (now - parseInt(lastReload, 10)) < 30000) {
        return;
      }
      
      sessionStorage.setItem('sw-reload-timestamp', now.toString());
      window.location.reload();
    };
    
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    const registerSW = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          // Ask the browser to check for a new sw.js right away instead
          // of waiting for its normal (throttled) update check.
          registration.update().catch(() => {});
        })
        .catch((err) => {
          console.debug('[SW] registration notice:', err);
        });
    };

    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW, { once: true });
    }

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <TopProgressBar />
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
