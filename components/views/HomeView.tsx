'use client';

import React from 'react';
import { Route } from '../../lib/types';
import { STATS, AFFILIATIONS, DEPARTMENTS, EVENTS, PROJECTS, HIGHLIGHTS } from '../../lib/data';
import { Button, Badge, Stat } from '../CommonUI';
import { PlaceholderImage } from '../PlaceholderImage';

interface HomeViewProps {
  onNavigate: (route: Route, slug?: string) => void;
  cardCovers: 'Photo' | 'None';
}

export function HomeView({ onNavigate, cardCovers }: HomeViewProps) {
  const showPhotos = cardCovers === 'Photo';
  const featuredEvents = EVENTS.slice(0, 3);
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div id="home-view">
      {/* 1. HERO SECTION (Full-width ink section) */}
      <section
        id="hero-section"
        style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Absolute image slot on right (desktop) & full-bleed background (tablet/mobile) */}
        {showPhotos && (
          <div
            id="hero-photo-slot"
            className="hero-photo-slot-responsive"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <PlaceholderImage
              label=""
              theme="ink"
              src="/images/HomeCenter.png"
              alt="CESS UofK Student Group"
              style={{
                height: '100%',
                width: '100%',
                borderRight: 0,
                borderTop: 0,
                borderBottom: 0,
              }}
            />
            <div className="hero-photo-overlay-mobile" />
          </div>
        )}

        {/* Text container */}
        <div
          style={{
            width: '100%',
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 var(--pad-x)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            className="hero-text-container-responsive"
            style={{
              minHeight: 'var(--hero-min)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'var(--sec-y) 0',
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
                marginBottom: 'var(--space-4)',
              }}
            >
              University of Khartoum · Faculty of Engineering
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 'var(--weight-display)',
                letterSpacing: 'var(--tracking-display)',
                fontSize: 'var(--text-display-large)',
                lineHeight: 'var(--leading-display)',
                margin: '0 0 var(--space-6) 0',
                color: 'var(--paper)',
              }}
            >
              Civil Engineering Students Society
            </h1>

            <p
              style={{
                fontSize: 'var(--text-body-large)',
                lineHeight: 'var(--leading-body)',
                color: 'var(--gray-300)',
                maxWidth: '44ch',
                margin: '0 0 var(--space-8) 0',
              }}
            >
              Non-profit, student-run organization enhancing the academic experience, engineering competence, and international pathways for students at the University of Khartoum since 2013.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <Button
                id="hero-explore-events-btn"
                variant="fire"
                size="lg"
                onClick={() => onNavigate('events')}
              >
                Explore Events & Activities
              </Button>
              <Button
                id="hero-about-btn"
                variant="inverse"
                size="lg"
                onClick={() => onNavigate('about')}
              >
                About the Society
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECOGNITION BAND (Paper, statistics & affiliations) */}
      <section
        id="recognition-band"
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
          {/* Eyebrow */}
          <h2
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--text-label)',
              fontWeight: 'var(--weight-label)',
              letterSpacing: 'var(--tracking-eyebrow)',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              margin: '0 0 var(--space-8) 0',
            }}
          >
            Recognition & Institutional Standing
          </h2>

          {/* Three Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 15rem), 1fr))',
              gap: 'var(--space-8)',
              paddingBottom: 'var(--space-12)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {STATS.map((stat, idx) => (
              <Stat key={idx} value={stat.value} label={stat.label} mechanism={stat.mechanism} />
            ))}
          </div>

          {/* Three Affiliations */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
              gap: 'var(--space-8)',
              paddingTop: 'var(--space-12)',
            }}
          >
            {AFFILIATIONS.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {item.name}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontWeight: 'var(--weight-headline)',
                    fontSize: '1.25rem',
                    lineHeight: 'var(--leading-tight)',
                    margin: '0 0 var(--space-2) 0',
                    color: 'var(--foreground)',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    maxWidth: '36ch',
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTIONS (Surface background, 4 cover cards) */}
      <section
        id="sections-overview"
        style={{
          background: 'var(--surface)',
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
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-12)',
            }}
          >
            <div style={{ maxWidth: '42rem' }}>
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
                Departmental Structure
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
                Four sections, one student body
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
                Dedicated student committees directing academic resources, industrial placements, cultural conferences, and faculty tournaments.
              </p>
            </div>

            <Button
              id="view-all-sections-btn"
              variant="secondary"
              size="md"
              onClick={() => onNavigate('departments')}
            >
              All sections
            </Button>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
              gap: 'var(--gutter)',
            }}
          >
            {DEPARTMENTS.map((dept, idx) => (
              <button
                key={dept.slug}
                type="button"
                id={`home-dept-card-${dept.slug}`}
                onClick={() => onNavigate('department', dept.slug)}
                style={{
                  height: '100%',
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
                    height="180px"
                    src={dept.image}
                    alt={dept.name}
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
                  <h3
                    style={{
                      fontFamily: 'var(--font-headline)',
                      fontWeight: 'var(--weight-headline)',
                      fontSize: 'var(--text-h4)',
                      lineHeight: 'var(--leading-tight)',
                      margin: '0 0 var(--space-2) 0',
                      color: 'var(--foreground)',
                    }}
                  >
                    {dept.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-body-small)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {dept.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHTS (Full ink section, sticky left, ruled right list) */}
      <section
        id="highlights-section"
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
              display: 'grid',
              gridTemplateColumns: 'var(--split)',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Left Column (Sticky on desktop only, static on tablets/mobiles to prevent overlap) */}
            <div id="highlights-left-column" className="sticky-highlights-desktop">
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
                Society Updates
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 'var(--weight-headline)',
                  letterSpacing: 'var(--tracking-headline)',
                  fontSize: 'var(--text-h2)',
                  lineHeight: 'var(--leading-headline)',
                  margin: '0 0 var(--space-4) 0',
                  color: 'var(--paper)',
                }}
              >
                Highlights
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-body)',
                  color: 'var(--gray-300)',
                  lineHeight: 1.6,
                  maxWidth: '40ch',
                  margin: '0 0 var(--space-8) 0',
                }}
              >
                Key technical workshops, research bulletins, exchange briefings, and upcoming department forums.
              </p>
              <Button
                id="highlights-blog-btn"
                variant="inverse"
                size="md"
                onClick={() => onNavigate('blogs')}
              >
                Read society articles
              </Button>
            </div>

            {/* Right Column (Ruled list) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid var(--border-inverse)',
              }}
            >
              {HIGHLIGHTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  id={`highlight-row-${item.id}`}
                  onClick={() => {
                    if (item.route && item.slug) {
                      onNavigate(item.route, item.slug);
                    }
                  }}
                  style={{
                    appearance: 'none',
                    background: 'none',
                    border: 0,
                    borderBottom: '1px solid var(--border-inverse)',
                    padding: 'var(--space-6) 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(6rem, 9rem) 1fr',
                    gap: 'var(--space-4)',
                    alignItems: 'baseline',
                    transition: 'color var(--dur-fast) var(--ease)',
                  }}
                  onMouseEnter={(e) => {
                    const title = e.currentTarget.querySelector('.highlight-title') as HTMLElement;
                    if (title) title.style.color = 'var(--fire-orange)';
                  }}
                  onMouseLeave={(e) => {
                    const title = e.currentTarget.querySelector('.highlight-title') as HTMLElement;
                    if (title) title.style.color = 'var(--paper)';
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--gray-300)',
                    }}
                  >
                    {item.date}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--gray-300)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {item.department}
                    </span>
                    <h3
                      className="highlight-title"
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontWeight: 'var(--weight-headline)',
                        fontSize: '1.25rem',
                        lineHeight: 'var(--leading-tight)',
                        margin: 0,
                        color: 'var(--paper)',
                        transition: 'color var(--dur-fast) var(--ease)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--text-body-small)',
                        color: 'var(--gray-300)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.summary}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED EVENTS (Paper) */}
      <section
        id="featured-events-section"
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
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-12)',
            }}
          >
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
                Calendar & Training
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
                Featured events
              </h2>
            </div>

            <Button
              id="all-events-btn"
              variant="secondary"
              size="md"
              onClick={() => onNavigate('events')}
            >
              All events
            </Button>
          </div>

          {/* 3 Event Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
              gap: 'var(--gutter)',
            }}
          >
            {featuredEvents.map((evt) => {
              const tone = evt.status === 'Open' ? 'success' : evt.status === 'Upcoming' ? 'info' : 'neutral';
              return (
                <button
                  key={evt.slug}
                  type="button"
                  id={`featured-event-card-${evt.slug}`}
                  onClick={() => onNavigate('event', evt.slug)}
                  style={{
                    height: '100%',
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

                    <h3
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
                    </h3>

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
                        Event details →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FEATURE PROJECTS (Surface background) */}
      <section
        id="featured-projects-section"
        style={{
          background: 'var(--surface)',
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
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-12)',
            }}
          >
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
                Initiatives & Archival
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
                Featured projects
              </h2>
            </div>

            <Button
              id="all-projects-btn"
              variant="secondary"
              size="md"
              onClick={() => onNavigate('projects')}
            >
              All projects
            </Button>
          </div>

          {/* 3 Project Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 19rem), 1fr))',
              gap: 'var(--gutter)',
            }}
          >
            {featuredProjects.map((proj) => {
              const tone = proj.status === 'Active' ? 'success' : proj.status === 'Completed' ? 'ink' : 'warning';
              return (
                <button
                  key={proj.slug}
                  type="button"
                  id={`featured-proj-card-${proj.slug}`}
                  onClick={() => onNavigate('project', proj.slug)}
                  style={{
                    height: '100%',
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
                      label={proj.slotLabel}
                      height="200px"
                      src={proj.image}
                      alt={proj.name}
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

                    <h3
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontWeight: 'var(--weight-headline)',
                        fontSize: '1.25rem',
                        lineHeight: 'var(--leading-tight)',
                        margin: '0 0 var(--space-2) 0',
                        color: 'var(--foreground)',
                      }}
                    >
                      {proj.name}
                    </h3>

                    <p
                      style={{
                        fontSize: 'var(--text-body-small)',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        margin: '0 0 var(--space-4) 0',
                      }}
                    >
                      {proj.summary}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {proj.dateRange}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA (Titan Fire Gradient — exactly once on site) */}
      <section
        id="closing-cta-section"
        style={{
          background: 'var(--titan-fire-gradient)',
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
              display: 'grid',
              gridTemplateColumns: 'var(--split)',
              gap: 'var(--space-8)',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
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
                LEARN • CONNECT • BUILD
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-body-large)',
                  lineHeight: 'var(--leading-body)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  margin: 0,
                  maxWidth: '48ch',
                }}
              >
                Get involved with CESS UofK across academic archives, international exchanges through IACES and ICE, and departmental activities.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                justifyContent: 'flex-start',
              }}
            >
              <Button
                id="cta-join-events-btn"
                variant="inverse"
                size="lg"
                onClick={() => onNavigate('events')}
              >
                View upcoming events
              </Button>
              <Button
                id="cta-contact-btn"
                variant="inverse"
                size="lg"
                onClick={() => onNavigate('contact')}
              >
                Talk to CESS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}