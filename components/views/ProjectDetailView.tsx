'use client';

import React from 'react';
import { Route, ProjectItem } from '../../lib/types';
import { PlaceholderImage } from '../PlaceholderImage';
import { Button, Badge } from '../CommonUI';

interface ProjectDetailViewProps {
  project: ProjectItem;
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function ProjectDetailView({ project, onNavigate, cardCovers }: ProjectDetailViewProps) {
  const showPhotos = cardCovers === 'Photo';
  const tone =
    project.status === 'Active'
      ? 'success'
      : project.status === 'Completed'
      ? 'ink'
      : 'warning';

  return (
    <div id={`project-detail-${project.slug}`}>
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
              onClick={() => onNavigate('projects')}
              style={{ color: 'var(--gray-300)', borderColor: 'var(--fire-orange)' }}
            >
              ← Back to all projects
            </Button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-3)',
            }}
          >
            <Badge tone={tone}>{project.status}</Badge>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--gray-300)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {project.department}
            </span>
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
              maxWidth: '48rem',
            }}
          >
            {project.name}
          </h1>
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
              label={project.slotLabel}
              height="clamp(18rem, 40vw, 32rem)"
              theme="ink"
              src={project.image}
              alt={project.name}
            />
          </div>
        </section>
      )}

      {/* 3. Four-Up Metadata Strip */}
      <section
        style={{
          background: 'var(--background)',
          borderBottom: '1px solid var(--border)',
          padding: 'var(--space-8) 0',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                STARTED
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {project.startDate}
              </div>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                ENDED / STATUS
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {project.endDate}
              </div>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                PROJECT STATUS
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {project.status}
              </div>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: 'var(--space-1)',
                }}
              >
                SECTION
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {project.department}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Body Copy + 2-column Gallery of 9rem slots */}
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
            {/* Body Copy */}
            <div style={{ maxWidth: '70ch' }}>
              <div
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Scope & Methodology
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {project.content.map((p, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: 'var(--text-body-large)',
                      lineHeight: 'var(--leading-body)',
                      color: 'var(--foreground)',
                      margin: 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Gallery (4 × 9rem slots) */}
            {showPhotos && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: 'var(--text-label)',
                    fontWeight: 'var(--weight-label)',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  PROJECT DOCUMENTATION & GALLERY
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--space-4)',
                  }}
                >
                  <PlaceholderImage
                    label="GALLERY 1"
                    height="9rem"
                    borderRadius="var(--radius-small)"
                    src={project.gallery?.[0]}
                    alt={`${project.name} - Gallery 1`}
                  />
                  <PlaceholderImage
                    label="GALLERY 2"
                    height="9rem"
                    borderRadius="var(--radius-small)"
                    src={project.gallery?.[1]}
                    alt={`${project.name} - Gallery 2`}
                  />
                  <PlaceholderImage
                    label="GALLERY 3"
                    height="9rem"
                    borderRadius="var(--radius-small)"
                    src={project.gallery?.[2]}
                    alt={`${project.name} - Gallery 3`}
                  />
                  <PlaceholderImage
                    label="GALLERY 4"
                    height="9rem"
                    borderRadius="var(--radius-small)"
                    src={project.gallery?.[3]}
                    alt={`${project.name} - Gallery 4`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
