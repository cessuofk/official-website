'use client';

import React from 'react';
import { Route, EventItem } from '../../lib/types';
import { PlaceholderImage } from '../PlaceholderImage';
import { Button, Badge } from '../CommonUI';

interface EventDetailViewProps {
  event: EventItem;
  onNavigate: (route: Route, slug?: string) => void;
  onOpenRegistration: (event: EventItem) => void;
  cardCovers: 'Photo' | 'None';
}

export function EventDetailView({
  event,
  onNavigate,
  onOpenRegistration,
  cardCovers,
}: EventDetailViewProps) {
  const showPhotos = cardCovers === 'Photo';
  const isClosed = event.status === 'Closed';
  const tone = event.status === 'Open' ? 'success' : event.status === 'Upcoming' ? 'info' : 'neutral';

  return (
    <div id={`event-detail-${event.slug}`}>
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
              onClick={() => onNavigate('events')}
              style={{ color: 'var(--gray-300)', borderColor: 'var(--fire-orange)' }}
            >
              ← Back to all events
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
            <Badge tone={tone}>{event.status}</Badge>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--gray-300)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {event.kind}
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
            {event.name}
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
              label={event.slotLabel}
              height="clamp(18rem, 40vw, 32rem)"
              theme="ink"
              src={event.image}
              alt={event.name}
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
                EVENT DATE
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {event.date}
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
                REGISTRATION CLOSES
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {event.regCloses}
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
                LOCATION
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {event.location}
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
                RUN BY
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 'var(--weight-headline)',
                  color: 'var(--foreground)',
                }}
              >
                {event.department}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Body Copy (70ch) + Sticky Aside CTA */}
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
                Description & Programme Details
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {event.content.map((p, idx) => (
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

            {/* Surface Aside (Sticky on desktop only) */}
            <aside
              id="event-detail-aside"
              className="sticky-aside-desktop"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-medium)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Badge tone={tone}>{event.status}</Badge>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  Deadline: {event.regCloses}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 'var(--weight-headline)',
                  fontSize: 'var(--text-h4)',
                  margin: 0,
                  color: 'var(--foreground)',
                }}
              >
                {isClosed ? 'Event closed' : 'Reserve your attendance'}
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-body-small)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {isClosed
                  ? 'Registration for this activity has concluded. Summary notes and documentation will be published on the society articles page.'
                  : 'Open to all Department of Civil Engineering undergraduates and affiliated faculty members. Spaces are allocated on verified index verification.'}
              </p>

              <div style={{ paddingTop: 'var(--space-2)' }}>
                {isClosed ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <Button variant="primary" fullWidth disabled>
                      Registration closed
                    </Button>
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => onNavigate('blogs')}
                    >
                      Read society articles
                    </Button>
                  </div>
                ) : (
                  <Button
                    id="open-event-reg-modal-btn"
                    variant="fire"
                    fullWidth
                    size="lg"
                    onClick={() => onOpenRegistration(event)}
                  >
                    Register for this event
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
