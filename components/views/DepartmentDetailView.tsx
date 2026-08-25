'use client';

import React from 'react';
import { Route, Department } from '../../lib/types';
import { PlaceholderImage } from '../PlaceholderImage';
import { Button } from '../CommonUI';

interface DepartmentDetailViewProps {
  department: Department;
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function DepartmentDetailView({ department, onNavigate, cardCovers }: DepartmentDetailViewProps) {
  const showPhotos = cardCovers === 'Photo';

  return (
    <div id={`department-detail-${department.slug}`}>
      {/* 1. Ink Header */}
      <section
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          padding: 'var(--sec-y) 0 var(--space-12) 0',
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
              onClick={() => onNavigate('departments')}
              style={{ color: 'var(--gray-300)', borderColor: 'var(--fire-orange)' }}
            >
              ← Back to all sections
            </Button>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--gray-300)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-2)',
            }}
          >
            DEPARTMENT SECTION
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              letterSpacing: 'var(--tracking-display)',
              fontSize: 'var(--text-display-large)',
              lineHeight: 'var(--leading-display)',
              margin: '0 0 var(--space-4) 0',
              color: 'var(--paper)',
            }}
          >
            {department.name}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-body-large)',
              lineHeight: 'var(--leading-body)',
              color: 'var(--gray-300)',
              maxWidth: '52ch',
              margin: 0,
            }}
          >
            {department.description}
          </p>
        </div>
      </section>

      {/* 2. Full-Bleed Cover Slot */}
      {showPhotos && (
        <section style={{ width: '100%', background: 'var(--ink)' }}>
          <div
            style={{
              maxWidth: 'var(--max-width)',
              margin: '0 auto',
              padding: '0 var(--pad-x)',
            }}
          >
            <PlaceholderImage
              label={department.slotLabel}
              height="clamp(18rem, 38vw, 30rem)"
              theme="ink"
              src={department.image}
              alt={department.name}
            />
          </div>
        </section>
      )}

      {/* 3. Two Columns: Objectives + Aside */}
      <section
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
              display: 'grid',
              gridTemplateColumns: 'var(--split)',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Left: Objectives list */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Key Mandates
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 'var(--weight-headline)',
                  fontSize: 'var(--text-h2)',
                  lineHeight: 'var(--leading-headline)',
                  margin: '0 0 var(--space-8) 0',
                  color: 'var(--foreground)',
                }}
              >
                Section objectives
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {department.objectives.map((obj, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.5rem 1fr',
                      gap: 'var(--space-3)',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '2px',
                        background: 'var(--fire-orange)',
                        display: 'inline-block',
                        marginTop: '6px',
                      }}
                    />
                    <p
                      style={{
                        fontSize: 'var(--text-body-large)',
                        lineHeight: 'var(--leading-body)',
                        color: 'var(--foreground)',
                        margin: 0,
                      }}
                    >
                      {obj}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Surface Aside with <dl> */}
            <aside
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-medium)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 'var(--weight-headline)',
                  fontSize: 'var(--text-h4)',
                  margin: 0,
                  color: 'var(--foreground)',
                }}
              >
                Section leadership & contact
              </h3>

              <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    HEAD OF SECTION
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-body)',
                      fontWeight: 600,
                      color: 'var(--foreground)',
                    }}
                  >
                    {department.head}
                  </dd>
                </div>

                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    OFFICIAL INBOX
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <a
                      href={`mailto:${department.email}`}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-body)',
                        color: 'var(--foreground)',
                        textDecoration: 'underline',
                      }}
                    >
                      {department.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    TELEPHONE
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-body)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {department.phone}
                  </dd>
                </div>
              </dl>

              <div style={{ paddingTop: 'var(--space-2)' }}>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => onNavigate('contact')}
                >
                  Message this section
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
