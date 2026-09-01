'use client';

import React from 'react';
import { Route } from '../lib/types';
import { SOCIETY_INFO } from '../lib/data';

interface FooterProps {
  onNavigate: (route: Route, slug?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const navLinks: { label: string; route: Route }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About Society', route: 'about' },
    { label: 'Four Sections', route: 'departments' },
    { label: 'Events & Workshops', route: 'events' },
    { label: 'Projects & Research', route: 'projects' },
    { label: 'Articles & Notes', route: 'blogs' },
    { label: 'The Board', route: 'team' },
    { label: 'Talk to CESS', route: 'contact' },
  ];

  const partners = [
    { name: 'IACES LC Khartoum', desc: 'Sole local committee in Sudan' },
    { name: 'ICE UofK Student Chapter', desc: 'Institution of Civil Engineers (UK)' },
    { name: 'University of Khartoum', desc: 'Department of Civil Engineering' },
    { name: 'Faculty of Engineering', desc: 'Academic & Institutional Partner' },
  ];

  return (
    <footer
      id="main-footer"
      style={{
        background: 'var(--surface)',
        color: 'var(--ink)',
        paddingBottom: 'var(--space-8)',
      }}
    >
      {/* Decorative gradient bar to maintain the "reddish" site personality */}
      <div 
        style={{ 
          height: '6px', 
          width: '100%', 
          background: 'var(--titan-fire-gradient)' 
        }} 
      />

      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--pad-x) 0',
        }}
      >
        {/* 4-column main footer grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'var(--footer-cols)',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
        >
          {/* Column 1: Stacked Wordmark + Display Campaign + Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <img
                // Note: Update this to your dark-text logo file since the background is now light
                src="/cess-lockup-white.png" 
                alt="Civil Engineering Students Society — University of Khartoum"
                loading="eager"
                decoding="sync"
                style={{
                  height: '48px',
                  width: 'auto',
                  maxWidth: '220px',
                  display: 'block',
                  objectFit: 'contain',
                  marginBottom: 'var(--space-2)',
                }}
              />
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.75rem',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--ink)',
                marginTop: 'var(--space-4)',
              }}
            >
              LEARN • CONNECT • BUILD
            </div>

            <p
              style={{
                fontSize: 'var(--text-body-small)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '34ch',
                margin: 0,
              }}
            >
              Non-profit, student-run organization enhancing the university experience, engineering skills, and international opportunities for civil engineering students.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--weight-label)',
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--gray-700)',
                margin: '0 0 var(--space-4) 0',
              }}
            >
              NAVIGATE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  type="button"
                  id={`footer-nav-${link.route}`}
                  onClick={() => onNavigate(link.route)}
                  style={{
                    appearance: 'none',
                    background: 'none',
                    border: 0,
                    cursor: 'pointer',
                    padding: 'var(--space-2) 0',
                    minHeight: '38px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color var(--dur-fast) var(--ease)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fire-orange)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Organizations & Partners */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--weight-label)',
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--gray-700)',
                margin: '0 0 var(--space-4) 0',
              }}
            >
              ORGANIZATIONS & PARTNERS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 'var(--space-2) 0',
                    minHeight: '38px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-body-small)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                    }}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--weight-label)',
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--gray-700)',
                margin: '0 0 var(--space-4) 0',
              }}
            >
              CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              <a
                href={`mailto:${SOCIETY_INFO.email}`}
                style={{
                  padding: 'var(--space-2) 0',
                  minHeight: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-body-small)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--dur-fast) var(--ease)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fire-orange)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {SOCIETY_INFO.email}
              </a>

              {SOCIETY_INFO.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone}`}
                  style={{
                    padding: 'var(--space-2) 0',
                    minHeight: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color var(--dur-fast) var(--ease)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fire-orange)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {phone}
                </a>
              ))}

              <div
                style={{
                  padding: 'var(--space-2) 0',
                  minHeight: '38px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-body-small)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  {SOCIETY_INFO.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--gray-500)',
            }}
          >
            © 2013–2026 CESS UofK. Established 2013.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--gray-500)',
              letterSpacing: '0.04em',
            }}
          >
            CIVIL ENGINEERING STUDENTS SOCIETY · UNIVERSITY OF KHARTOUM
          </span>
        </div>
      </div>
    </footer>
  );
}
