'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function TopProgressBar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const finishTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When pathname changes, complete bar and fade out
  useEffect(() => {
    if (barRef.current && containerRef.current) {
      barRef.current.style.transition = 'width 140ms ease-out, opacity 180ms ease-out';
      barRef.current.style.width = '100%';
      barRef.current.style.opacity = '0';

      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
      }

      finishTimeoutRef.current = setTimeout(() => {
        if (barRef.current && containerRef.current) {
          containerRef.current.style.display = 'none';
          barRef.current.style.width = '0%';
          barRef.current.style.opacity = '1';
        }
      }, 200);
    }

    return () => {
      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
      }
    };
  }, [pathname]);

  // Intercept navigation clicks to show instant optical feedback (0ms perceived latency)
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href]');
      if (anchor instanceof HTMLAnchorElement) {
        try {
          const targetUrl = new URL(anchor.href, window.location.href);
          if (
            targetUrl.origin === window.location.origin &&
            targetUrl.pathname !== window.location.pathname &&
            !anchor.hasAttribute('download') &&
            anchor.target !== '_blank'
          ) {
            if (barRef.current && containerRef.current) {
              containerRef.current.style.display = 'block';
              barRef.current.style.transition = 'none';
              barRef.current.style.width = '0%';
              barRef.current.style.opacity = '1';

              requestAnimationFrame(() => {
                if (barRef.current) {
                  barRef.current.style.transition = 'width 250ms ease-out';
                  barRef.current.style.width = '40%';

                  setTimeout(() => {
                    if (barRef.current && barRef.current.style.width === '40%') {
                      barRef.current.style.transition = 'width 600ms ease-in-out';
                      barRef.current.style.width = '80%';
                    }
                  }, 120);
                }
              });
            }
          }
        } catch {
          // ignore invalid URLs
        }
      }
    };

    window.addEventListener('click', handleNavClick, { capture: true, passive: true });
    return () => window.removeEventListener('click', handleNavClick, { capture: true });
  }, []);

  return (
    <div
      ref={containerRef}
      id="global-route-progress-bar"
      aria-hidden="true"
      style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 999999,
        pointerEvents: 'none',
        background: 'rgba(224, 90, 43, 0.12)',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'var(--fire-orange)',
          boxShadow: '0 0 10px rgba(224, 90, 43, 0.8), 0 0 4px var(--fire-orange)',
          opacity: 1,
        }}
      />
    </div>
  );
}
