'use client';

import React, { useState } from 'react';
import { Route } from '../../lib/types';
import { BLOGS } from '../../lib/data';
import { Tag } from '../CommonUI';
import { PlaceholderImage } from '../PlaceholderImage';

interface BlogsViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function BlogsView({ onNavigate, cardCovers }: BlogsViewProps) {
  const [deptFilter, setDeptFilter] = useState('All');
  const showPhotos = cardCovers === 'Photo';

  const filterOptions = ['All', 'Academic', 'Professional practice', 'Social and cultural'];

  const filteredBlogs = BLOGS.filter((blog) => {
    if (deptFilter === 'All') return true;
    return blog.department === deptFilter;
  });

  return (
    <div id="blogs-index-view">
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
          <div style={{ maxWidth: '44rem', marginBottom: 'var(--space-8)' }}>
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
              Publications & Editorial
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
              Articles & notes
            </h1>
            <p
              style={{
                fontSize: 'var(--text-body-large)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Technical tutorials, field visit reflections, exchange guides, and student council governance perspectives.
            </p>
          </div>

          {/* Hairline-separated Filter Row */}
          <div
            style={{
              paddingTop: 'var(--space-4)',
              paddingBottom: 'var(--space-8)',
              borderTop: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              marginBottom: 'var(--space-12)',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginRight: 'var(--space-2)',
                textTransform: 'uppercase',
              }}
            >
              FILTER SECTION:
            </span>
            {filterOptions.map((opt) => (
              <Tag
                key={opt}
                id={`blog-filter-${opt}`}
                selected={deptFilter === opt}
                onClick={() => setDeptFilter(opt)}
              >
                {opt}
              </Tag>
            ))}
          </div>

          {/* Blogs Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
              gap: 'var(--gutter)',
            }}
          >
            {filteredBlogs.map((blog) => (
              <button
                key={blog.slug}
                type="button"
                id={`blog-card-${blog.slug}`}
                onClick={() => onNavigate('blog', blog.slug)}
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
                  transition:
                    'border-color var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease)',
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
                    label={blog.slotLabel}
                    height="190px"
                    src={blog.image}
                    alt={blog.title}
                  />
                )}
                <div
                  style={{
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  {/* Mono Row: Department and Nowrap Date */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'var(--space-2)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {blog.department}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {blog.date}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 'var(--weight-headline)',
                      fontSize: '1.25rem',
                      lineHeight: 'var(--leading-tight)',
                      margin: '0 0 var(--space-2) 0',
                      color: 'var(--foreground)',
                    }}
                  >
                    {blog.title}
                  </h2>

                  <p
                    style={{
                      fontSize: 'var(--text-body-small)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      margin: '0 0 var(--space-4) 0',
                    }}
                  >
                    {blog.summary}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
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
                      Read article →
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
