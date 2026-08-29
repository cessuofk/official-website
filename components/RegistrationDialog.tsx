'use client';

import React, { useState, useEffect } from 'react';
import { EventItem } from '../lib/types';
import { Button, Field, Badge } from './CommonUI';

interface RegistrationDialogProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationDialog({ event, isOpen, onClose }: RegistrationDialogProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    university: 'University of Khartoum',
    studentId: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passCode, setPassCode] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.university.trim()) {
      newErrors.university = 'University is required';
    }
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID / Index number is required';
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length < 8) {
      newErrors.phone = 'Phone number must contain at least 8 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    const sheetEventName = event.name; 
    
    // Make sure to replace this with the NEW deployment URL if it changed
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLh4PxeEvAKjQACqlhaV4FFA9eYNhw5rZEGMqSMIVXwMGjd17u5_kutdYayi793CIO/exec';

    try {
      // Added mode: 'no-cors' to bypass browser blocking
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          eventName: sheetEventName,
          formData: formData,
        }),
      });

      // Since 'no-cors' prevents reading the response, we trigger success directly
      setPassCode(`CESS-DEL-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
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
    <div
      id="registration-dialog-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'var(--overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <div
        id="registration-dialog-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius-medium)',
          boxShadow: 'var(--shadow-elevated)',
          width: '100%',
          maxWidth: '40rem',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <Badge tone="fire">EVENT REGISTRATION</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              {event.date}
            </span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-headline)',
              fontWeight: 'var(--weight-headline)',
              letterSpacing: 'var(--tracking-headline)',
              fontSize: 'var(--text-h3)',
              lineHeight: 'var(--leading-tight)',
              margin: 0,
              color: 'var(--foreground)',
            }}
          >
            {event.name}
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-body-small)',
              margin: 'var(--space-2) 0 0 0',
            }}
          >
            Location: {event.location} · Deadline: {event.regCloses}
          </p>
        </div>

        {isSuccess ? (
          <div
            id="registration-success-view"
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
              <h4
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: 'var(--text-h4)',
                  margin: 0,
                  color: '#0F5C2B',
                }}
              >
                Registration Confirmed
              </h4>
            </div>

            <p style={{ margin: 0, fontSize: 'var(--text-body-small)', color: '#0F5C2B', lineHeight: 1.5 }}>
              Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Your registration for <em>{event.name}</em> has been recorded for <strong>{formData.university}</strong> (Index: {formData.studentId}).
            </p>
            
            <div style={{ padding: 'var(--space-3)', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-small)', border: '1px dashed #0F5C2B' }}>
              <p style={{ margin: 0, fontSize: 'var(--text-body-small)', color: '#0F5C2B', fontWeight: 'bold' }}>
                Your Passcode: {passCode}
              </p>
            </div>

            <p style={{ margin: 0, fontSize: 'var(--text-body-small)', color: '#0F5C2B', lineHeight: 1.5 }}>
              Confirmation and preparation details will be dispatched to <strong>{formData.email}</strong> prior to {event.date}.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
              <Button id="registration-done-btn" variant="primary" onClick={onClose}>
                Close Dialog
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              <Field label="First name" htmlFor="reg-first-name" required error={errors.firstName}>
                <input
                  id="reg-first-name"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  style={inputStyle(!!errors.firstName)}
                  placeholder="First name"
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Last name" htmlFor="reg-last-name" required error={errors.lastName}>
                <input
                  id="reg-last-name"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  style={inputStyle(!!errors.lastName)}
                  placeholder="Last name"
                  disabled={isSubmitting}
                />
              </Field>
            </div>

            <Field label="Email address" htmlFor="reg-email" required error={errors.email} hint="Confirmation details will be sent here">
              <input
                id="reg-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle(!!errors.email)}
                placeholder="e.g. student@uofk.edu"
                disabled={isSubmitting}
              />
            </Field>

            <Field label="University" htmlFor="reg-university" required error={errors.university}>
              <input
                id="reg-university"
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                style={inputStyle(!!errors.university)}
                disabled={isSubmitting}
              />
            </Field>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              <Field label="Student ID" htmlFor="reg-student-id" required hint="Index number" error={errors.studentId}>
                <input
                  id="reg-student-id"
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  style={inputStyle(!!errors.studentId)}
                  placeholder="e.g. 19-CE-042"
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Phone number" htmlFor="reg-phone" required error={errors.phone}>
                <input
                  id="reg-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle(!!errors.phone)}
                  placeholder="e.g. 0912345678"
                  disabled={isSubmitting}
                />
              </Field>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                justifyContent: 'flex-end',
                marginTop: 'var(--space-4)',
              }}
            >
              <Button type="button" variant="secondary" onClick={onClose} id="reg-cancel-btn" disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="fire" id="reg-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
