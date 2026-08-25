'use client';

import React from 'react';

// === BADGE ===
export type BadgeTone = 'neutral' | 'success' | 'info' | 'warning' | 'error' | 'ink' | 'fire';

interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  id?: string;
}

const BADGE_COLORS: Record<BadgeTone, { bg: string; color: string }> = {
  neutral: { bg: '#F3F3F3', color: '#525252' },
  success: { bg: '#E6F4EA', color: '#0F5C2B' },
  info: { bg: '#E8F0FE', color: '#1A4BB8' },
  warning: { bg: '#FEF3E2', color: '#8A4008' },
  error: { bg: '#FDECEC', color: '#A31C1C' },
  ink: { bg: '#111111', color: '#FFFFFF' },
  fire: { bg: '#FFF0E6', color: '#B23F00' },
};

export function Badge({ tone = 'neutral', children, id }: BadgeProps) {
  const { bg, color } = BADGE_COLORS[tone] || BADGE_COLORS.neutral;

  return (
    <span
      id={id}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.5rem',
        borderRadius: 'var(--radius-small)',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        background: bg,
        color: color,
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

// === BUTTON ===
export type ButtonVariant = 'primary' | 'fire' | 'secondary' | 'text' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  id?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  style = {},
  children,
  id,
  ...props
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);

  // Size styles
  let sizeStyle: React.CSSProperties = {
    padding: '0.75rem 1.25rem',
    fontSize: 'var(--text-body)',
    minHeight: '44px',
  };
  if (size === 'sm') {
    sizeStyle = {
      padding: '0.5rem 0.875rem',
      fontSize: 'var(--text-body-small)',
      minHeight: '36px',
    };
  } else if (size === 'lg') {
    sizeStyle = {
      padding: '1rem 1.75rem',
      fontSize: '1.125rem',
      minHeight: '52px',
    };
  }

  // Variant styles
  let variantStyle: React.CSSProperties = {};
  if (variant === 'primary') {
    variantStyle = {
      background: hover && !disabled ? 'var(--charcoal)' : 'var(--ink)',
      color: 'var(--paper)',
      borderColor: 'transparent',
    };
  } else if (variant === 'fire') {
    variantStyle = {
      background: hover && !disabled ? 'var(--fire-orange-hover)' : 'var(--fire-orange)',
      color: hover && !disabled ? 'var(--paper)' : 'var(--ink)',
      borderColor: 'transparent',
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      background: hover && !disabled ? 'var(--ink)' : 'transparent',
      color: hover && !disabled ? 'var(--paper)' : 'var(--foreground)',
      borderColor: 'var(--ink)',
    };
  } else if (variant === 'inverse') {
    variantStyle = {
      background: hover && !disabled ? 'var(--gray-300)' : 'var(--paper)',
      color: 'var(--ink)',
      borderColor: 'transparent',
    };
  } else if (variant === 'text') {
    variantStyle = {
      background: 'none',
      color: hover && !disabled ? 'var(--fire-orange-hover)' : 'var(--foreground)',
      paddingLeft: 0,
      paddingRight: 0,
      borderBottom: '2px solid var(--fire-orange)',
      borderRadius: 0,
      minHeight: 'auto',
    };
  }

  const baseStyle: React.CSSProperties = {
    appearance: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: variant === 'secondary' ? '1px solid var(--ink)' : '1px solid transparent',
    borderRadius: variant === 'text' ? '0' : 'var(--radius-small)',
    fontFamily: 'var(--font-label)',
    fontWeight: 'var(--weight-label)',
    letterSpacing: '0.01em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.45 : 1,
    transition:
      'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease)',
    ...sizeStyle,
    ...variantStyle,
    ...style,
  };

  return (
    <button
      id={id}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseStyle}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

// === TAG / FILTER CHIP ===
interface TagProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  id?: string;
}

export function Tag({ selected = false, onClick, children, id }: TagProps) {
  const [hover, setHover] = React.useState(false);

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.375rem 0.875rem',
    minHeight: '36px',
    borderRadius: 'var(--radius-pill)',
    border: selected
      ? '1px solid var(--ink)'
      : hover
      ? '1px solid var(--ink)'
      : '1px solid var(--border)',
    background: selected ? 'var(--ink)' : 'transparent',
    color: selected ? 'var(--paper)' : hover ? 'var(--foreground)' : 'var(--text-muted)',
    fontFamily: 'var(--font-label)',
    fontSize: 'var(--text-body-small)',
    fontWeight: 'var(--weight-label)',
    cursor: 'pointer',
    appearance: 'none',
    transition: 'all var(--dur-fast) var(--ease)',
  };

  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={style}
    >
      {children}
    </button>
  );
}

// === STAT ===
interface StatProps {
  value: string;
  label: string;
  mechanism: string;
  id?: string;
}

export function Stat({ value, label, mechanism, id }: StatProps) {
  return (
    <div id={id} style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--weight-display)',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          letterSpacing: 'var(--tracking-display)',
          lineHeight: 1,
          color: 'var(--foreground)',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: 'var(--text-label)',
          fontWeight: 'var(--weight-label)',
          letterSpacing: 'var(--tracking-eyebrow)',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginTop: 'var(--space-3)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 'var(--text-body-small)',
          color: 'var(--text-muted)',
          marginTop: 'var(--space-2)',
          maxWidth: '34ch',
          lineHeight: 1.5,
        }}
      >
        {mechanism}
      </div>
    </div>
  );
}

// === FORM FIELD ===
interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  id?: string;
}

export function Field({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
  id,
}: FieldProps) {
  return (
    <div
      id={id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        width: '100%',
      }}
    >
      <label
        htmlFor={htmlFor}
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: 'var(--text-body-small)',
          fontWeight: 'var(--weight-label)',
          color: 'var(--foreground)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {label}
        {required && (
          <span
            style={{
              color: 'var(--error)',
              marginLeft: '2px',
              fontWeight: 700,
            }}
          >
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <span
          style={{
            fontSize: 'var(--text-body-small)',
            color: 'var(--text-muted)',
          }}
        >
          {hint}
        </span>
      )}
      {error && (
        <span
          style={{
            fontSize: 'var(--text-body-small)',
            color: 'var(--error)',
            fontWeight: 500,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
