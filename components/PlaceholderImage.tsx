'use client';

import React from 'react';

interface PlaceholderImageProps {
  label: string;
  src?: string;
  alt?: string;
  height?: string | number;
  minHeight?: string | number;
  width?: string | number;
  className?: string;
  theme?: 'light' | 'ink';
  borderRadius?: string;
  style?: React.CSSProperties;
  id?: string;
  showLabelBadge?: boolean;
}

export function PlaceholderImage({
  label,
  src,
  alt,
  height,
  minHeight,
  width = '100%',
  className = '',
  theme = 'light',
  borderRadius = 'var(--radius-none)',
  style = {},
  id,
  showLabelBadge = true,
}: PlaceholderImageProps) {
  const isInk = theme === 'ink';
  const [imgError, setImgError] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    background: isInk ? 'var(--charcoal)' : 'var(--gray-100)',
    border: isInk ? '1px solid var(--border-inverse)' : '1px solid var(--border)',
    borderRadius,
    display: 'flex',
    alignItems: 'flex-end',
    padding: src && !imgError ? 0 : 'var(--space-4)',
    width,
    height: height ? height : undefined,
    minHeight: minHeight ? minHeight : undefined,
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none',
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: isInk ? 'var(--gray-300)' : 'var(--text-muted)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    fontWeight: 400,
    lineHeight: 1.2,
    zIndex: 1,
  };

  if (src && !imgError) {
    return (
      <div id={id} style={containerStyle} className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || label}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {showLabelBadge && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'var(--space-2) var(--space-3)',
              background: 'linear-gradient(to top, rgba(17,17,17,0.75), transparent)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--paper)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id={id} style={containerStyle} className={className}>
      <span style={labelStyle}>{label}</span>
    </div>
  );
}
