'use client';

import React, { useState } from 'react';
import { Route, EventStatus } from '../../lib/types';
import { EVENTS } from '../../lib/data';
import { Badge, Tag } from '../CommonUI';
import { PlaceholderImage } from '../PlaceholderImage';

interface EventsViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function EventsView({ onNavigate, cardCovers }: EventsViewProps) {
  const [filter, setFilter] = useState<'All' | EventStatus>('All');
  const showPhotos = cardCovers === 'Photo';

  const filterOptions: ('All' | EventStatus)[] = ['All', 'Open', 'Upcoming', 'Closed'];

  const filteredEvents = EVENTS.filter((evt) => {
    if (filter === 'All') return true;
    return evt.status === filter;
  });

  return (
    <div id="events-index-view">
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
              Calendar & Programmes
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
              Events & activities
            </h1>
            <p
              style={{
                fontSize: 'var(--text-body-large)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Academic workshops, international student exchange information sessions, technical conferences, and field expeditions.
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
              FILTER:
            </span>
            {filterOptions.map((opt) => (
              <Tag
                key={opt}
                id={`event-filter-${opt}`}
                selected={filter === opt}
                onClick={() => setFilter(opt)}
              >
                {opt}
              </Tag>
            ))}
          </div>

          {/* Events Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
              gap: 'var(--gutter)',
            }}
          >
            {filteredEvents.map((evt) => {
              const tone =
                evt.status === 'Open'
                  ? 'success'
                  : evt.status === 'Upcoming'
                  ? 'info'
                  : 'neutral';

              return (
                <button
                  key={evt.slug}
                  type="button"
                  id={`event-card-${evt.slug}`}
                  onClick={() => onNavigate('event', evt.slug)}
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
                      label={evt.slotLabel}
                      height="230px"
                      src={evt.image}
                      alt={evt.name}
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
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <Badge tone={tone}>{evt.status}</Badge>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {evt.date}
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
                      {evt.name}
                    </h2>

                    <p
                      style={{
                        fontSize: 'var(--text-body-small)',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        margin: '0 0 var(--space-4) 0',
                      }}
                    >
                      {evt.summary}
                    </p>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                          }}
                        >
                          LOC:
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            color: 'var(--foreground)',
                          }}
                        >
                          {evt.location}
                        </span>
                      </div>

                      <div style={{ paddingTop: 'var(--space-2)' }}>
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
                          Event details →
                        </span>
                      </div>
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
