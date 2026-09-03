'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { TopProgressBar } from './TopProgressBar';
import { PRIMARY_NAV_PATHS } from '../lib/navigation';
import {
  getAllDepartmentSlugs,
  getAllEventSlugs,
  getAllProjectSlugs,
  getAllBlogSlugs,
} from '../lib/data';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();

  // Eager pre-warming of all application routes into Next.js router cache
  useEffect(() => {
    // 1. Immediately pre-warm primary top-level routes
    PRIMARY_NAV_PATHS.forEach((path) => {
      router.prefetch(path);
    });

    // 2. In background idle time, pre-warm dynamic detail routes
    const timer = setTimeout(() => {
      const detailPaths = [
        ...getAllDepartmentSlugs().map((slug) => `/departments/${slug}`),
        ...getAllEventSlugs().map((slug) => `/events/${slug}`),
        ...getAllProjectSlugs().map((slug) => `/projects/${slug}`),
        ...getAllBlogSlugs().map((slug) => `/blogs/${slug}`),
      ];

      detailPaths.forEach((path) => {
        router.prefetch(path);
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [router]);

  // Passive hover/pointer listener to prefetch any link or card before user finishes clicking
  useEffect(() => {
    const handlePointerOver = (e: MouseEvent | TouchEvent) => {
      const el = (e.target as HTMLElement)?.closest('a[href], button[data-route], [data-href]');
      if (!el) return;

      if (el instanceof HTMLAnchorElement && el.href) {
        try {
          const url = new URL(el.href, window.location.href);
          if (url.origin === window.location.origin) {
            router.prefetch(url.pathname);
          }
        } catch {
          // ignore invalid URLs
        }
      } else {
        const dataHref = el.getAttribute('data-href');
        if (dataHref) {
          router.prefetch(dataHref);
        }
      }
    };

    window.addEventListener('mouseover', handlePointerOver, { passive: true });
    window.addEventListener('touchstart', handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener('mouseover', handlePointerOver);
      window.removeEventListener('touchstart', handlePointerOver);
    };
  }, [router]);

  // Register high-performance Stale-While-Revalidate caching Service Worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerSW = () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .catch((err) => {
            console.debug('[SW] registration notice:', err);
          });
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW, { once: true });
      }
    }
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
