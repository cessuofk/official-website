'use client';

import React, { useState } from 'react';
import { Route, ProjectStatus } from '../../lib/types';
import { PROJECTS } from '../../lib/data';
import { Badge, Tag } from '../CommonUI';
import { PlaceholderImage } from '../PlaceholderImage';

interface ProjectsViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function ProjectsView({ onNavigate, cardCovers }: ProjectsViewProps) {
  const [filter, setFilter] = useState<'All' | ProjectStatus>('All');
  const showPhotos = cardCovers === 'Photo';

  const filterOptions: ('All' | ProjectStatus)[] = ['All', 'Active', 'Completed', 'Pending'];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'All') return true;
    return proj.status === filter;
  });

  return (
    <div id="projects-index-view">
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
              Research & Initiatives
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
              Projects & initiatives
            </h1>
            <p
              style={{
                fontSize: 'var(--text-body-large)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Student research investigations, academic exam archives, orientation publications, and technical curriculum development projects.
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
              FILTER STATUS:
            </span>
            {filterOptions.map((opt) => (
              <Tag
                key={opt}
                id={`project-filter-${opt}`}
                selected={filter === opt}
                onClick={() => setFilter(opt)}
              >
                {opt}
              </Tag>
            ))}
          </div>

          {/* Rectangular Split Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 32rem), 1fr))',
              gap: 'var(--gutter)',
            }}
          >
            {filteredProjects.map((proj) => {
              const tone =
                proj.status === 'Active'
                  ? 'success'
                  : proj.status === 'Completed'
                  ? 'ink'
                  : 'warning';

              return (
                <button
                  key={proj.slug}
                  type="button"
                  id={`project-card-${proj.slug}`}
                  onClick={() => onNavigate('project', proj.slug)}
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
                    display: 'grid',
                    gridTemplateColumns: showPhotos ? 'var(--edit-split)' : '1fr',
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
                      label={proj.slotLabel}
                      minHeight="200px"
                      style={{ height: '100%' }}
                      src={proj.image}
                      alt={proj.name}
                    />
                  )}
                  <div
                    style={{
                      padding: 'var(--space-8)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 'var(--space-4)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 'var(--space-2)',
                          marginBottom: 'var(--space-3)',
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <Badge tone={tone}>{proj.status}</Badge>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {proj.department}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontFamily: 'var(--font-headline)',
                          fontWeight: 'var(--weight-headline)',
                          fontSize: 'var(--text-h4)',
                          lineHeight: 'var(--leading-tight)',
                          margin: '0 0 var(--space-2) 0',
                          color: 'var(--foreground)',
                        }}
                      >
                        {proj.name}
                      </h2>

                      <p
                        style={{
                          fontSize: 'var(--text-body-small)',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {proj.summary}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 'var(--space-2)',
                        borderTop: '1px solid var(--border)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {proj.dateRange}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-label)',
                          fontSize: 'var(--text-body-small)',
                          fontWeight: 'var(--weight-label)',
                          color: 'var(--foreground)',
                        }}
                      >
                        Details →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
