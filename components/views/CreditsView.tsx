'use client';

import React from 'react';
import { Route } from '../../lib/types';
import { WEBSITE_CREDIT_MEMBERS, WebsiteCreditMember } from '../../lib/data';
import { Badge } from '../CommonUI';
import { PlaceholderImage } from '../PlaceholderImage';
import { ArrowLeft, Code2, Heart, Sparkles, Layout, Database, PenTool, Mail } from 'lucide-react';

interface CreditsViewProps {
  onNavigate: (route: Route, slug?: string) => void;
}

const CATEGORY_TONE_MAP: Record<WebsiteCreditMember['category'], 'fire' | 'warning' | 'info' | 'success' | 'ink'> = {
  'Project Management': 'fire',
  'Design & UX': 'warning',
  'Frontend Engineering': 'info',
  'Backend Engineering': 'success',
  'Content & Drafting': 'ink',
};

const CATEGORY_ICON_MAP: Record<WebsiteCreditMember['category'], React.ReactNode> = {
  'Project Management': <Sparkles size={14} />,
  'Design & UX': <Layout size={14} />,
  'Frontend Engineering': <Code2 size={14} />,
  'Backend Engineering': <Database size={14} />,
  'Content & Drafting': <PenTool size={14} />,
};

export function CreditsView({ onNavigate }: CreditsViewProps) {
  return (
    <div id="credits-view">
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
          {/* Top Breadcrumb / Back Button */}
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <button
              type="button"
              id="back-to-home-btn"
              onClick={() => onNavigate('home')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: 'var(--space-1) 0',
                transition: 'color var(--dur-fast) var(--ease)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fire-orange)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ArrowLeft size={14} /> Back to Overview
            </button>
          </div>

          {/* Header Banner */}
          <div
            style={{
              marginBottom: 'var(--space-10)',
              paddingBottom: 'var(--space-8)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '48rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--weight-label)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--fire-orange)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                <span>Engineering & Design Portfolio</span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Built with <Heart size={13} fill="var(--fire-orange)" color="var(--fire-orange)" /> by CESS Team
                </span>
              </div>
              <h1
                id="credits-page-title"
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
                Website Development Team
              </h1>
              <p
                style={{
                  fontSize: 'var(--text-body-large)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}
              >
                Meet the students and engineers behind the official Civil Engineering Students Society digital portal at the University of Khartoum.
              </p>
            </div>
          </div>

          {/* 5-Member Grid matching The Board template */}
          <div
            id="credit-members-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 18rem), 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-10)',
            }}
          >
            {WEBSITE_CREDIT_MEMBERS.map((member) => {
              const tone = CATEGORY_TONE_MAP[member.category] || 'neutral';
              const icon = CATEGORY_ICON_MAP[member.category];
              const contactEmail = member.email || 'contact@cess-uofk.org';

              return (
                <div
                  key={member.id}
                  id={`credit-member-card-${member.id}`}
                  style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-medium)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
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
                  {/* Photo Slot or Monogram Initials */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 3.8',
                      maxHeight: '16rem',
                      background: 'var(--surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      borderBottom: '1px solid var(--border)',
                      overflow: 'hidden',
                    }}
                  >
                    {member.image ? (
                      <PlaceholderImage
                        label=""
                        src={member.image}
                        alt={member.name}
                        height="100%"
                        showLabelBadge={false}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '5.5rem',
                          height: '5.5rem',
                          borderRadius: 'var(--radius-small)',
                          background: 'var(--paper)',
                          border: '1px solid var(--border-strong)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 'var(--weight-display)',
                          fontSize: '1.75rem',
                          color: 'var(--foreground)',
                          letterSpacing: '0.06em',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        {member.initials}
                      </div>
                    )}

                    {/* Subtle Corner Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(4px)',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-small)',
                        border: '1px solid var(--border)',
                        zIndex: 2,
                      }}
                    >
                      {icon}
                      <span>{member.category}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      padding: 'var(--space-6)',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    {/* Category Tone Badge */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-3)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Badge tone={tone}>{member.category}</Badge>
                    </div>

                    {/* Member Full Name */}
                    <h2
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontWeight: 'var(--weight-headline)',
                        fontSize: '1.25rem',
                        lineHeight: 'var(--leading-tight)',
                        margin: '0 0 var(--space-1) 0',
                        color: 'var(--foreground)',
                      }}
                    >
                      {member.name}
                    </h2>

                    {/* Member Role */}
                    <div
                      style={{
                        fontFamily: 'var(--font-label)',
                        fontWeight: 'var(--weight-label)',
                        fontSize: 'var(--text-body-small)',
                        color: 'var(--fire-orange)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {member.role}
                    </div>

                    {/* Scope Narrative */}
                    <p
                      style={{
                        fontSize: 'var(--text-body-small)',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        margin: '0 0 var(--space-4) 0',
                        flex: 1,
                      }}
                    >
                      {member.scope}
                    </p>

                    {/* Skills & Responsibilities Chips */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        paddingTop: 'var(--space-3)',
                        marginBottom: 'var(--space-4)',
                        borderTop: '1px solid var(--border)',
                      }}
                    >
                      {member.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            padding: '2px 6px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '3px',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Contact Mailto Button */}
                    <a
                      id={`contact-member-btn-${member.id}`}
                      href={`mailto:${contactEmail}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-2)',
                        width: '100%',
                        padding: 'var(--space-2) var(--space-4)',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-small)',
                        fontFamily: 'var(--font-label)',
                        fontSize: '12px',
                        fontWeight: 'var(--weight-label)',
                        letterSpacing: '0.02em',
                        color: 'var(--foreground)',
                        textDecoration: 'none',
                        transition: 'background var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--fire-orange)';
                        e.currentTarget.style.borderColor = 'var(--fire-orange)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--surface)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--foreground)';
                      }}
                    >
                      <Mail size={13} />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
