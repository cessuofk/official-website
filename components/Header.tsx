'use client';

import React, { useState } from 'react';
import { Route } from '../lib/types';
import { Button } from './CommonUI';

interface HeaderProps {
  currentRoute: Route;
  onNavigate: (route: Route, slug?: string) => void;
  inkRoute: boolean;
}

export function Header({ currentRoute, onNavigate, inkRoute }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map detail subroutes to their parent category for active indicator
  const activeCategory: Record<string, string> = {
    home: 'home',
    about: 'about',
    departments: 'departments',
    department: 'departments',
    events: 'events',
    event: 'events',
    projects: 'projects',
    project: 'projects',
    blogs: 'blogs',
    blog: 'blogs',
    team: 'team',
    contact: 'contact',
  };

  const currentTab = activeCategory[currentRoute] || currentRoute;

  const navItems: { label: string; route: Route; key: string }[] = [
    { label: 'Home', route: 'home', key: 'home' },
    { label: 'About', route: 'about', key: 'about' },
    { label: 'Departments', route: 'departments', key: 'departments' },
    { label: 'Events', route: 'events', key: 'events' },
    { label: 'Projects', route: 'projects', key: 'projects' },
    { label: 'Blogs', route: 'blogs', key: 'blogs' },
  ];

  return (
    <header
      id="main-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: inkRoute ? 'var(--ink)' : 'var(--background)',
        borderBottom: inkRoute ? '1px solid var(--border-inverse)' : '1px solid var(--border)',
        transition: 'background var(--dur-base) var(--ease), border-color var(--dur-base) var(--ease)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-8)',
          height: '76px',
          padding: '0 var(--pad-x)',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
        }}
      >
        {/* Logo / Wordmark */}
        <button
          type="button"
          id="header-wordmark-btn"
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          style={{
            appearance: 'none',
            background: 'none',
            border: 0,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            textAlign: 'left',
          }}
        >
          <img
            src={inkRoute ? '/cess-nav-white.png' : '/cess-nav-ink.png'}
            alt="CESS UofK"
            style={{
              height: '36px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav
          id="desktop-nav"
          className="nav-desktop-links"
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                id={`nav-link-${item.key}`}
                onClick={() => onNavigate(item.route)}
                style={{
                  appearance: 'none',
                  background: 'none',
                  border: 0,
                  cursor: 'pointer',
                  padding: 'var(--space-3) var(--space-4)',
                  minHeight: '44px',
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-body-small)',
                  fontWeight: 'var(--weight-label)',
                  color: isActive
                    ? inkRoute
                      ? 'var(--paper)'
                      : 'var(--foreground)'
                    : inkRoute
                    ? 'var(--gray-300)'
                    : 'var(--text-muted)',
                  boxShadow: isActive ? 'inset 0 -2px 0 var(--fire-orange)' : 'none',
                  transition: 'all var(--dur-fast) var(--ease)',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Button
            id="nav-contact-action-btn"
            variant={inkRoute ? 'inverse' : 'primary'}
            size="sm"
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
          >
            Talk to CESS
          </Button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="nav-mobile-toggle"
            style={{
              appearance: 'none',
              background: 'none',
              border: `1px solid ${inkRoute ? 'var(--border-inverse)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-small)',
              padding: '0.5rem',
              color: inkRoute ? 'var(--paper)' : 'var(--foreground)',
              cursor: 'pointer',
              minHeight: '44px',
              minWidth: '44px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileMenuOpen ? (
                <path
                  d="M4 4L16 16M4 16L16 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 5H17M3 10H17M3 15H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="nav-mobile-dropdown"
          style={{
            background: inkRoute ? 'var(--charcoal)' : 'var(--surface)',
            borderTop: inkRoute ? '1px solid var(--border-inverse)' : '1px solid var(--border)',
            padding: 'var(--space-4) var(--pad-x)',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                id={`mobile-nav-link-${item.key}`}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                style={{
                  appearance: 'none',
                  background: isActive
                    ? inkRoute
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(0,0,0,0.04)'
                    : 'none',
                  border: 0,
                  borderRadius: 'var(--radius-small)',
                  cursor: 'pointer',
                  padding: 'var(--space-3) var(--space-4)',
                  minHeight: '44px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-label)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 'var(--weight-label)',
                  color: isActive
                    ? 'var(--fire-orange)'
                    : inkRoute
                    ? 'var(--paper)'
                    : 'var(--foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--fire-orange)',
                    }}
                  />
                )}
              </button>
            );
          })}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              style={{
                borderColor: inkRoute ? 'var(--gray-300)' : 'var(--ink)',
                color: inkRoute ? 'var(--paper)' : 'var(--foreground)',
              }}
              onClick={() => {
                onNavigate('team');
                setMobileMenuOpen(false);
              }}
            >
              The Board
            </Button>
            <Button
              variant="fire"
              size="sm"
              fullWidth
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
