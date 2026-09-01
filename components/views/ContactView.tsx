'use client';

import React, { useState } from 'react';
import { Route } from '../../lib/types';
import { SOCIETY_INFO } from '../../lib/data';
import { Button, Field } from '../CommonUI';
import { Code2, Heart, ArrowRight } from 'lucide-react';

interface ContactViewProps {
  onNavigate?: (route: Route, slug?: string) => void;
}

export function ContactView({ onNavigate }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General enquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your message';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General enquiry',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    minHeight: '44px',
    padding: '0.625rem 0.875rem',
    border: `1px solid ${hasError ? 'var(--error)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-small)',
    background: 'var(--background)',
    color: 'var(--foreground)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-body)',
    outline: 'none',
  });

  return (
    <div id="contact-view">
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
            {/* Left Column: Direct contact details */}
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
                Inquiries & Partnerships
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
                Talk to CESS
              </h1>

              <p
                style={{
                  fontSize: 'var(--text-body-large)',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--text-muted)',
                  maxWidth: '48ch',
                  margin: '0 0 var(--space-8) 0',
                }}
              >
                Have questions regarding academic tutorials, IACES exchange delegations, conference participation, or society membership? Reach out directly to our team.
              </p>

              {/* Hairline-topped <dl> */}
              <dl
                style={{
                  margin: 0,
                  paddingTop: 'var(--space-8)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-6)',
                }}
              >
                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    OFFICIAL INBOX
                  </dt>
                  <dd style={{ margin: 0 }}>
                    <a
                      href={`mailto:${SOCIETY_INFO.email}`}
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: 'var(--text-h4)',
                        fontWeight: 'var(--weight-headline)',
                        color: 'var(--foreground)',
                        textDecoration: 'underline',
                      }}
                    >
                      {SOCIETY_INFO.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    TELEPHONE NUMBERS
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {SOCIETY_INFO.phones.map((phone, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-body-large)',
                          color: 'var(--foreground)',
                        }}
                      >
                        {phone}
                      </span>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    POSTAL ADDRESS
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-body)',
                      color: 'var(--foreground)',
                      lineHeight: 1.5,
                      maxWidth: '38ch',
                    }}
                  >
                    {SOCIETY_INFO.address}
                  </dd>
                </div>

                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    COMMUNITY CHANNELS
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--space-3)',
                    }}
                  >
                    {SOCIETY_INFO.socialLinks.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        style={{
                          fontFamily: 'var(--font-label)',
                          fontSize: 'var(--text-body-small)',
                          fontWeight: 'var(--weight-label)',
                          color: 'var(--foreground)',
                          borderBottom: '1px solid var(--border-strong)',
                        }}
                      >
                        {s.name}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>

              {/* Website Team Credits Section Card */}
              {onNavigate && (
                <div
                  id="contact-website-credits-box"
                  style={{
                    marginTop: 'var(--space-8)',
                    padding: 'var(--space-6)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-small)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <Code2 size={13} color="var(--fire-orange)" />
                    <span>DIGITAL PLATFORM CREDITS</span>
                  </div>

                  <p
                    style={{
                      margin: 'var(--space-1) 0 var(--space-3) 0',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-body-small)',
                      color: 'var(--foreground)',
                      lineHeight: 1.5,
                    }}
                  >
                    Designed and built with ❤️ by CESS website team
                  </p>

                  <div>
                    <button
                      type="button"
                      id="contact-to-credits-btn"
                      onClick={() => onNavigate('credits')}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontFamily: 'var(--font-label)',
                        fontSize: '13px',
                        fontWeight: 'var(--weight-label)',
                        color: 'var(--fire-orange)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      <span>View website team portfolio</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Surface Panel Form */}
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-medium)',
                padding: 'var(--space-8)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 'var(--weight-headline)',
                  fontSize: 'var(--text-h3)',
                  lineHeight: 'var(--leading-tight)',
                  margin: '0 0 var(--space-2) 0',
                  color: 'var(--foreground)',
                }}
              >
                Send a message
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-body-small)',
                  color: 'var(--text-muted)',
                  margin: '0 0 var(--space-6) 0',
                }}
              >
                All inquiries are reviewed and routed to the corresponding student section lead.
              </p>

              {submitted ? (
                /* Success State */
                <div
                  id="contact-success-state"
                  style={{
                    background: '#E6F4EA',
                    border: '1px solid #0F5C2B',
                    borderRadius: 'var(--radius-small)',
                    padding: 'var(--space-6)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'var(--success)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      ✓
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-headline)',
                        fontSize: 'var(--text-h4)',
                        margin: 0,
                        color: '#0F5C2B',
                      }}
                    >
                      Message Sent
                    </h3>
                  </div>

                  <p style={{ margin: 0, fontSize: 'var(--text-body-small)', color: '#0F5C2B', lineHeight: 1.5 }}>
                    Thank you, <strong>{formData.name}</strong>. Your message regarding <em>{formData.subject}</em> has been received. Our executive committee will respond to <strong>{formData.email}</strong> shortly.
                  </p>

                  <div style={{ marginTop: 'var(--space-2)' }}>
                    <Button variant="primary" size="sm" onClick={resetForm}>
                      Send another message
                    </Button>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <Field label="Your name" htmlFor="contact-name" required error={errors.name}>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle(!!errors.name)}
                      placeholder="e.g. Tariq Ahmed"
                    />
                  </Field>

                  <Field label="Email address" htmlFor="contact-email" required error={errors.email}>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle(!!errors.email)}
                      placeholder="e.g. tariq@uofk.edu"
                    />
                  </Field>

                  <Field label="Subject" htmlFor="contact-subject">
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        ...inputStyle(false),
                        cursor: 'pointer',
                      }}
                    >
                      <option value="General enquiry">General enquiry</option>
                      <option value="Academic Section">Academic Section & Resources</option>
                      <option value="Professional Practice & IACES">Professional Practice & IACES Exchange</option>
                      <option value="Social and Cultural">Social and Cultural Events</option>
                      <option value="Sports Section">Sports Tournaments</option>
                    </select>
                  </Field>

                  <Field label="Your message" htmlFor="contact-message" required error={errors.message}>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        ...inputStyle(!!errors.message),
                        minHeight: '110px',
                        resize: 'vertical',
                        paddingTop: '0.75rem',
                      }}
                      placeholder="Write your enquiry or feedback here..."
                    />
                  </Field>

                  <div style={{ marginTop: 'var(--space-2)' }}>
                    <Button id="contact-submit-btn" type="submit" variant="primary" fullWidth size="lg">
                      Send message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
