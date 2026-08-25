'use client';

import React from 'react';

interface SampleNoticeProps {
  onDismiss: () => void;
}

export function SampleNotice({ onDismiss }: SampleNoticeProps) {
  return (
    <div
      id="prototype-notice-bar"
      style={{
        background: 'var(--charcoal)',
        borderBottom: '1px solid var(--border-inverse)',
        padding: '0.375rem var(--pad-x)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 25,
      }}
    >
      <div style={{ flex: 1, textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--gray-300)',
            letterSpacing: '0.02em',
          }}
        >
          PROTOTYPE NOTICE — Events, projects and articles are sample records for layout review. Real content connects via Decap CMS.
        </span>
      </div>
      <button
        type="button"
        id="dismiss-prototype-notice"
        onClick={onDismiss}
        aria-label="Dismiss prototype notice"
        style={{
          appearance: 'none',
          background: 'none',
          border: 0,
          color: 'var(--gray-300)',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '0.25rem 0.5rem',
          minHeight: '38px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}
