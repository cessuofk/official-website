'use client';

import React from 'react';
import { Route } from '../../lib/types';
import { DEPARTMENTS } from '../../lib/data';
import { PlaceholderImage } from '../PlaceholderImage';

interface DepartmentsViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function DepartmentsView({ onNavigate, cardCovers }: DepartmentsViewProps) {
  const showPhotos = cardCovers === 'Photo';

  return (
    <div id="departments-index-view">
      <section
        style={{
          background: 'var(--paper)',
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
          {/* Header */}
          <div style={{ maxWidth: '44rem', marginBottom: 'var(--space-12)' }}>
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
              Organizational Pillars
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-display)',
                margin: '0 0 var(--space-4) 0',
                color: 'var(--foreground)',
              }}
            >
              The four sections
            </h1>
            <p
              style={{
                fontSize: 'var(--text-body-large)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              CESS UofK operates through four dedicated functional student sections, each focused on distinct aspects of undergraduate education, professional certification, cultural life, and athletics.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: 'var(--gutter)',
            }}
          >
            {DEPARTMENTS.map((dept, idx) => (
              <button
                key={dept.slug}
                type="button"
                id={`dept-index-card-${dept.slug}`}
                onClick={() => onNavigate('department', dept.slug)}
                style={{
                  appearance: 'none',
                  font: 'inherit',
                  color: 'inherit',
                  textAlign: 'left',
                  padding: 0,
                  cursor: 'pointer',
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-medium)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fire-orange)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-elevated)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {showPhotos && (
                  <PlaceholderImage
                    label={dept.slotLabel}
                    height="220px"
                    src={dept.image}
                    alt={dept.name}
                  />
                )}
                <div
                  style={{
                    padding: 'var(--space-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    SECTION 0{idx + 1}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 'var(--weight-headline)',
                      fontSize: 'var(--text-h3)',
                      lineHeight: 'var(--leading-tight)',
                      margin: '0 0 var(--space-3) 0',
                      color: 'var(--foreground)',
                    }}
                  >
                    {dept.name}
                  </h2>
                  <p
                    style={{
                      fontSize: 'var(--text-body)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      margin: '0 0 var(--space-6) 0',
                    }}
                  >
                    {dept.description}
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: 'var(--text-body-small)',
                        fontWeight: 'var(--weight-label)',
                        color: 'var(--foreground)',
                        borderBottom: '2px solid var(--fire-orange)',
                        display: 'inline-block',
                      }}
                    >
                      Open section →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
