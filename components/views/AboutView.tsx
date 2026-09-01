'use client';

import React from 'react';
import { Route } from '../../lib/types';
import { SOCIETY_INFO, GOALS } from '../../lib/data';
import { PlaceholderImage } from '../PlaceholderImage';

interface AboutViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function AboutView({ cardCovers }: AboutViewProps) {
  const showPhotos = cardCovers === 'Photo';

  return (
    <div id="about-view">
      {/* 1. Header Band (Ink) */}
      <section
        id="about-header-band"
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
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
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--text-label)',
              fontWeight: 'var(--weight-label)',
              letterSpacing: 'var(--tracking-eyebrow)',
              textTransform: 'uppercase',
              color: 'var(--gray-300)',
              marginBottom: 'var(--space-2)',
            }}
          >
            History & Background
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--weight-display)',
              letterSpacing: 'var(--tracking-display)',
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--leading-display)',
              margin: '0 0 var(--space-4) 0',
              color: 'var(--paper)',
            }}
          >
            Our story
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-large)',
              lineHeight: 'var(--leading-body)',
              color: 'var(--gray-300)',
              maxWidth: '56ch',
              margin: 0,
            }}
          >
            Established in 2013, the Civil Engineering Students Society at the University of Khartoum (CESS UofK) is a non-profit, student-run body dedicated to enriching the academic, professional, and cultural life of civil engineering undergraduates.
          </p>
        </div>
      </section>

      {/* 2. Narrative + Seated Group Portrait */}
      <section
        id="about-narrative-section"
        style={{
          background: 'var(--background)',
          padding: 'var(--sec-y) 0',
          borderBottom: '1px solid var(--border)',
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
              alignItems: 'center',
            }}
          >
            {/* 3 brochure paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <p
                style={{
                  fontSize: 'var(--text-body-large)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--foreground)',
                  margin: 0,
                }}
              >
                The Civil Engineering Students Society (CESS UofK) was founded in 2013 at the Department of Civil Engineering, Faculty of Engineering, University of Khartoum. Operating as an autonomous, non-profit student society, it represents civil engineering students across all academic levels.
              </p>
              <p
                style={{
                  fontSize: 'var(--text-body-large)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--foreground)',
                  margin: 0,
                }}
              >
                The society delivers technical training, academic archives, English language modules, and industry expeditions. Through global recognition as the sole local committee in Sudan for the International Association of Civil Engineering Students (IACES LC Khartoum) and an official student chapter of the Institution of Civil Engineers (ICE, UK), CESS connects Khartoum students with international delegations and professional standards.
              </p>
              <p
                style={{
                  fontSize: 'var(--text-body-large)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--foreground)',
                  margin: 0,
                }}
              >
                Structured across four key sections—Academic, Professional Practice, Social & Cultural, and Sports—CESS coordinates student governance, academic council reforms, and technical conferences to prepare students for impactful engineering careers.
              </p>
            </div>

            {/* Photo slot */}
            {showPhotos && (
              <PlaceholderImage
                label=""
                minHeight="24rem"
                borderRadius="var(--radius-medium)"
                src="/images/about.jpg"
                alt="CESS UofK Seated Group Portrait"
              />
            )}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision (Facing cards on surface) */}
      <section
        id="mission-vision-section"
        style={{
          background: 'var(--surface)',
          padding: 'var(--sec-y) 0',
          borderBottom: '1px solid var(--border)',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 24rem), 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {/* Mission Card (Paper with hairline) */}
            <div
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-medium)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
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
                MISSION
              </span>
              <h3
                id="about-mission-statement"
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
                  lineHeight: 1.45,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  color: 'var(--foreground)',
                }}
              >
                {SOCIETY_INFO.mission}
              </h3>
            </div>

            {/* Vision Card (Ink) */}
            <div
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                borderRadius: 'var(--radius-medium)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--gray-300)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                VISION
              </span>
              <h3
                id="about-vision-statement"
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
                  lineHeight: 1.45,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  color: 'var(--paper)',
                }}
              >
                {SOCIETY_INFO.vision}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Goals (5 goals verbatim on a ruled 5rem 1fr list) */}
      <section
        id="goals-section"
        style={{
          background: 'var(--paper)',
          padding: 'var(--sec-y) 0',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 var(--pad-x)',
          }}
        >
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
              Guiding Charter
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 'var(--weight-headline)',
                letterSpacing: 'var(--tracking-headline)',
                fontSize: 'var(--text-h2)',
                lineHeight: 'var(--leading-headline)',
                margin: 0,
                color: 'var(--foreground)',
              }}
            >
              Core society goals
            </h2>
            <p
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginTop: 'var(--space-3)',
                marginBottom: 0,
              }}
            >
              The five foundational objectives established in the CESS constitution guiding activities, partnerships, and academic reform.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid var(--border)',
            }}
          >
            {GOALS.map((goal, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(3rem, 5rem) 1fr',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-6) 0',
                  borderBottom: '1px solid var(--border)',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.25rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  0{idx + 1}
                </span>
                <p
                  style={{
                    fontSize: 'var(--text-body-large)',
                    lineHeight: 'var(--leading-body)',
                    color: 'var(--foreground)',
                    margin: 0,
                  }}
                >
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
