'use client';

import React, { useState } from 'react';

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
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const hasFailed = Boolean(src && failedSrc === src);

  const containerStyle: React.CSSProperties = {
    background: isInk ? 'var(--charcoal)' : 'var(--gray-100)',
    border: isInk ? '1px solid var(--border-inverse)' : '1px solid var(--border)',
    borderRadius,
    display: 'flex',
    alignItems: 'flex-end',
    padding: src && !hasFailed ? 0 : 'var(--space-4)',
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

  if (src && !hasFailed) {
    return (
      <div id={id} style={containerStyle} className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={src}
          src={src}
          alt={alt || label}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 1,
          }}
        />
      </div>
    );
  }

  return (
    <div id={id} style={containerStyle} className={className}>
      <span style={labelStyle}>{label}</span>
    </div>
  );
}

