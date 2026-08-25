'use client';

import React from 'react';
import { Route, BlogItem } from '../../lib/types';
import { PlaceholderImage } from '../PlaceholderImage';
import { Button } from '../CommonUI';

interface BlogDetailViewProps {
  blog: BlogItem;
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function BlogDetailView({ blog, onNavigate, cardCovers }: BlogDetailViewProps) {
  const showPhotos = cardCovers === 'Photo';

  return (
    <div id={`blog-detail-${blog.slug}`}>
      {/* 1. Paper Header */}
      <section
        style={{
          background: 'var(--paper)',
          padding: 'var(--sec-y) 0 var(--space-8) 0',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 var(--pad-x)',
          }}
        >
          {/* Back button */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <Button
              variant="text"
              size="sm"
              onClick={() => onNavigate('blogs')}
              style={{ color: 'var(--foreground)', borderColor: 'var(--fire-orange)' }}
            >
              ← Back to all articles
            </Button>
          </div>

          <div style={{ maxWidth: '52rem' }}>
            {/* Mono meta line */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-3)',
              }}
            >
              {blog.department} · {blog.date} · {blog.author}
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-headline)',
                margin: '0 0 var(--space-4) 0',
                color: 'var(--foreground)',
              }}
            >
              {blog.title}
            </h1>

            <p
              style={{
                fontSize: 'var(--text-body-large)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              {blog.summary}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Full-Bleed Cover Slot */}
      {showPhotos && (
        <section style={{ width: '100%', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div
            style={{
              maxWidth: 'var(--max-width)',
              margin: '0 auto',
              padding: '0 var(--pad-x)',
            }}
          >
            <PlaceholderImage
              label={blog.slotLabel}
              height="clamp(18rem, 38vw, 30rem)"
            />
          </div>
        </section>
      )}

      {/* 3. Body Copy (68ch single column, left-aligned) */}
      <article
        style={{
          background: 'var(--background)',
          padding: 'var(--sec-y) 0',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 var(--pad-x)',
          }}
        >
          <div
            style={{
              maxWidth: '68ch',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
            }}
          >
            {blog.content.map((para, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: 'var(--text-body-large)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--foreground)',
                  margin: 0,
                }}
              >
                {para}
              </p>
            ))}

            <div
              style={{
                marginTop: 'var(--space-8)',
                paddingTop: 'var(--space-6)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  WRITTEN BY
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: 'var(--text-body)',
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    marginTop: '2px',
                  }}
                >
                  {blog.author}
                </span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('blogs')}
              >
                More articles
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
