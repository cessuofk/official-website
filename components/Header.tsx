'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Calendar, FolderGit2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Route } from '../lib/types';
import { pathToRouteInfo, useAppNavigation, routeToPath } from '../lib/navigation';
import { Button } from './CommonUI';

interface HeaderProps {
  currentRoute?: Route;
  onNavigate?: (route: Route, slug?: string) => void;
  inkRoute?: boolean;
}

export function Header({ currentRoute: propRoute, onNavigate, inkRoute: propInkRoute }: HeaderProps) {
  const pathname = usePathname();
  const appNavigate = useAppNavigation();
  const routeInfo = pathToRouteInfo(pathname || '/');

  const currentRoute = propRoute || routeInfo.route;
  const inkRoute = propInkRoute !== undefined ? propInkRoute : routeInfo.isInk;

  const handleNav = (targetRoute: Route, slug?: string) => {
    if (onNavigate) {
      onNavigate(targetRoute, slug);
    } else {
      appNavigate(targetRoute, slug);
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  const isActivitiesActive = ['events', 'projects', 'blogs'].includes(currentTab);

  // Activities sub-items sorted alphabetically: Blogs, Events, Projects
  const activityItems: { label: string; route: Route; key: string; description: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }[] = [
    {
      label: 'Blogs',
      route: 'blogs',
      key: 'blogs',
      description: 'Technical articles, research notes & student writing',
      icon: BookOpen,
    },
    {
      label: 'Events',
      route: 'events',
      key: 'events',
      description: 'Workshops, field visits, seminars & competitions',
      icon: Calendar,
    },
    {
      label: 'Projects',
      route: 'projects',
      key: 'projects',
      description: 'Engineering initiatives, research & software tools',
      icon: FolderGit2,
    },
  ];

  // Close desktop dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActivitiesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActivitiesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActivitiesDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      id="main-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
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
        <Link
          href="/"
          prefetch={true}
          id="header-wordmark-btn"
          onClick={() => {
            if (onNavigate) onNavigate('home');
            setMobileMenuOpen(false);
            setActivitiesDropdownOpen(false);
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
            textDecoration: 'none',
          }}
        >
          <Image
            src={inkRoute ? '/cess-nav-white.png' : '/cess-nav-ink.png'}
            alt="CESS UofK"
            width={160}
            height={36}
            priority
            referrerPolicy="no-referrer"
            style={{
              height: '36px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          id="desktop-nav"
          className="nav-desktop-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
          }}
        >
          {/* Home */}
          <Link
            href="/"
            prefetch={true}
            id="nav-link-home"
            onClick={() => {
              if (onNavigate) onNavigate('home');
            }}
            style={{
              appearance: 'none',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-4)',
              minHeight: '44px',
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--text-body-small)',
              fontWeight: 'var(--weight-label)',
              color: currentTab === 'home'
                ? inkRoute ? 'var(--paper)' : 'var(--foreground)'
                : inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
              boxShadow: currentTab === 'home' ? 'inset 0 -2px 0 var(--fire-orange)' : 'none',
              transition: 'all var(--dur-fast) var(--ease)',
            }}
          >
            Home
          </Link>

          {/* About */}
          <Link
            href="/about"
            prefetch={true}
            id="nav-link-about"
            onClick={() => {
              if (onNavigate) onNavigate('about');
            }}
            style={{
              appearance: 'none',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-4)',
              minHeight: '44px',
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--text-body-small)',
              fontWeight: 'var(--weight-label)',
              color: currentTab === 'about'
                ? inkRoute ? 'var(--paper)' : 'var(--foreground)'
                : inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
              boxShadow: currentTab === 'about' ? 'inset 0 -2px 0 var(--fire-orange)' : 'none',
              transition: 'all var(--dur-fast) var(--ease)',
            }}
          >
            About
          </Link>

          {/* Departments */}
          <Link
            href="/departments"
            prefetch={true}
            id="nav-link-departments"
            onClick={() => {
              if (onNavigate) onNavigate('departments');
            }}
            style={{
              appearance: 'none',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-4)',
              minHeight: '44px',
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--text-body-small)',
              fontWeight: 'var(--weight-label)',
              color: currentTab === 'departments'
                ? inkRoute ? 'var(--paper)' : 'var(--foreground)'
                : inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
              boxShadow: currentTab === 'departments' ? 'inset 0 -2px 0 var(--fire-orange)' : 'none',
              transition: 'all var(--dur-fast) var(--ease)',
            }}
          >
            Departments
          </Link>

          {/* Activities Dropdown */}
          <div
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
          >
            <button
              type="button"
              id="nav-link-activities"
              onClick={() => setActivitiesDropdownOpen((prev) => !prev)}
              aria-expanded={activitiesDropdownOpen}
              aria-haspopup="true"
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
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: isActivitiesActive
                  ? inkRoute ? 'var(--paper)' : 'var(--foreground)'
                  : inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
                boxShadow: isActivitiesActive ? 'inset 0 -2px 0 var(--fire-orange)' : 'none',
                transition: 'all var(--dur-fast) var(--ease)',
              }}
            >
              <span>Activities</span>
              <ChevronDown
                size={14}
                style={{
                  transform: activitiesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--dur-fast) var(--ease)',
                  color: isActivitiesActive ? 'var(--fire-orange)' : 'currentColor',
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {activitiesDropdownOpen && (
              <div
                id="activities-dropdown-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  marginTop: '4px',
                  width: '280px',
                  background: inkRoute ? 'var(--charcoal)' : 'var(--surface)',
                  border: `1px solid ${inkRoute ? 'var(--border-inverse)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-small)',
                  boxShadow: 'var(--shadow-elevated)',
                  padding: 'var(--space-2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 40,
                }}
              >
                {activityItems.map((item) => {
                  const isActive = currentTab === item.key;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.key}
                      href={routeToPath(item.route)}
                      prefetch={true}
                      id={`dropdown-link-${item.key}`}
                      onClick={() => {
                        if (onNavigate) onNavigate(item.route);
                        setActivitiesDropdownOpen(false);
                      }}
                      style={{
                        appearance: 'none',
                        textDecoration: 'none',
                        background: isActive
                          ? inkRoute ? 'rgba(255,255,255,0.08)' : 'rgba(224,90,43,0.08)'
                          : 'transparent',
                        border: 0,
                        borderRadius: 'var(--radius-small)',
                        padding: 'var(--space-2-5) var(--space-3)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        transition: 'background var(--dur-fast) var(--ease)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = inkRoute
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(0,0,0,0.04)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div
                        style={{
                          marginTop: '2px',
                          color: isActive ? 'var(--fire-orange)' : inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-label)',
                            fontSize: 'var(--text-body-small)',
                            fontWeight: 'var(--weight-label)',
                            color: isActive
                              ? 'var(--fire-orange)'
                              : inkRoute ? 'var(--paper)' : 'var(--foreground)',
                            lineHeight: 1.2,
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
                            lineHeight: 1.3,
                            marginTop: '2px',
                          }}
                        >
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Board */}
          <Link
            href="/team"
            prefetch={true}
            id="nav-link-board"
            onClick={() => {
              if (onNavigate) onNavigate('team');
            }}
            style={{
              appearance: 'none',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-3) var(--space-4)',
              minHeight: '44px',
              fontFamily: 'var(--font-label)',
              fontSize: 'var(--text-body-small)',
              fontWeight: 'var(--weight-label)',
              color: currentTab === 'team'
                ? inkRoute ? 'var(--paper)' : 'var(--foreground)'
                : inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
              boxShadow: currentTab === 'team' ? 'inset 0 -2px 0 var(--fire-orange)' : 'none',
              transition: 'all var(--dur-fast) var(--ease)',
            }}
          >
            Board
          </Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Link
            href="/contact"
            prefetch={true}
            id="nav-contact-action-btn-link"
            style={{ textDecoration: 'none' }}
            onClick={() => {
              if (onNavigate) onNavigate('contact');
              setMobileMenuOpen(false);
            }}
          >
            <Button
              id="nav-contact-action-btn"
              variant={inkRoute ? 'inverse' : 'primary'}
              size="sm"
            >
              Talk to CESS
            </Button>
          </Link>

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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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

      {/* Mobile Menu Dropdown matching Desktop Vibe */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="nav-mobile-dropdown"
          style={{
            background: inkRoute ? 'var(--charcoal)' : 'var(--surface)',
            borderTop: inkRoute ? '1px solid var(--border-inverse)' : '1px solid var(--border)',
            padding: 'var(--space-4) var(--pad-x) var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          {/* Home */}
          <Link
            href="/"
            prefetch={true}
            id="mobile-nav-link-home"
            onClick={() => {
              if (onNavigate) onNavigate('home');
              setMobileMenuOpen(false);
            }}
            style={{
              appearance: 'none',
              textDecoration: 'none',
              background: currentTab === 'home'
                ? inkRoute ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
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
              color: currentTab === 'home'
                ? 'var(--fire-orange)'
                : inkRoute ? 'var(--paper)' : 'var(--foreground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Home</span>
            {currentTab === 'home' && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--fire-orange)',
                }}
              />
            )}
          </Link>

          {/* About */}
          <Link
            href="/about"
            prefetch={true}
            id="mobile-nav-link-about"
            onClick={() => {
              if (onNavigate) onNavigate('about');
              setMobileMenuOpen(false);
            }}
            style={{
              appearance: 'none',
              textDecoration: 'none',
              background: currentTab === 'about'
                ? inkRoute ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
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
              color: currentTab === 'about'
                ? 'var(--fire-orange)'
                : inkRoute ? 'var(--paper)' : 'var(--foreground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>About</span>
            {currentTab === 'about' && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--fire-orange)',
                }}
              />
            )}
          </Link>

          {/* Departments */}
          <Link
            href="/departments"
            prefetch={true}
            id="mobile-nav-link-departments"
            onClick={() => {
              if (onNavigate) onNavigate('departments');
              setMobileMenuOpen(false);
            }}
            style={{
              appearance: 'none',
              textDecoration: 'none',
              background: currentTab === 'departments'
                ? inkRoute ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
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
              color: currentTab === 'departments'
                ? 'var(--fire-orange)'
                : inkRoute ? 'var(--paper)' : 'var(--foreground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Departments</span>
            {currentTab === 'departments' && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--fire-orange)',
                }}
              />
            )}
          </Link>

          {/* Activities (Collapsible Accordion) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: isActivitiesActive
                ? inkRoute ? 'rgba(255,255,255,0.04)' : 'rgba(224,90,43,0.04)'
                : 'none',
              borderRadius: 'var(--radius-small)',
              border: isActivitiesActive
                ? `1px solid ${inkRoute ? 'rgba(255,255,255,0.1)' : 'rgba(224,90,43,0.15)'}`
                : 'none',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              id="mobile-nav-link-activities-toggle"
              onClick={() => setMobileActivitiesOpen(!mobileActivitiesOpen)}
              style={{
                appearance: 'none',
                background: 'none',
                border: 0,
                cursor: 'pointer',
                padding: 'var(--space-3) var(--space-4)',
                minHeight: '44px',
                textAlign: 'left',
                fontFamily: 'var(--font-label)',
                fontSize: 'var(--text-body)',
                fontWeight: 'var(--weight-label)',
                color: isActivitiesActive
                  ? 'var(--fire-orange)'
                  : inkRoute ? 'var(--paper)' : 'var(--foreground)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Activities</span>
                {isActivitiesActive && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--fire-orange)',
                      color: 'var(--paper)',
                    }}
                  >
                    Active
                  </span>
                )}
              </div>
              <ChevronDown
                size={16}
                style={{
                  transform: mobileActivitiesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--dur-fast) var(--ease)',
                  color: isActivitiesActive ? 'var(--fire-orange)' : 'currentColor',
                }}
              />
            </button>

            {mobileActivitiesOpen && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0 var(--space-2) var(--space-3) var(--space-4)',
                  gap: '2px',
                }}
              >
                {activityItems.map((item) => {
                  const isActive = currentTab === item.key;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.key}
                      href={routeToPath(item.route)}
                      prefetch={true}
                      id={`mobile-nav-link-${item.key}`}
                      onClick={() => {
                        if (onNavigate) onNavigate(item.route);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        appearance: 'none',
                        textDecoration: 'none',
                        background: isActive
                          ? inkRoute ? 'rgba(255,255,255,0.08)' : 'rgba(224,90,43,0.1)'
                          : 'none',
                        border: 0,
                        borderRadius: 'var(--radius-small)',
                        cursor: 'pointer',
                        padding: 'var(--space-2-5) var(--space-3)',
                        minHeight: '40px',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2-5)' }}>
                        <Icon
                          size={15}
                          style={{
                            color: isActive ? 'var(--fire-orange)' : inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-label)',
                            fontSize: 'var(--text-body-small)',
                            fontWeight: 'var(--weight-label)',
                            color: isActive
                              ? 'var(--fire-orange)'
                              : inkRoute ? 'var(--paper)' : 'var(--foreground)',
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      {isActive ? (
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: 'var(--fire-orange)',
                          }}
                        />
                      ) : (
                        <ChevronRight
                          size={14}
                          style={{
                            color: inkRoute ? 'var(--gray-300)' : 'var(--text-muted)',
                            opacity: 0.5,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Board */}
          <Link
            href="/team"
            prefetch={true}
            id="mobile-nav-link-board"
            onClick={() => {
              if (onNavigate) onNavigate('team');
              setMobileMenuOpen(false);
            }}
            style={{
              appearance: 'none',
              textDecoration: 'none',
              background: currentTab === 'team'
                ? inkRoute ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
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
              color: currentTab === 'team'
                ? 'var(--fire-orange)'
                : inkRoute ? 'var(--paper)' : 'var(--foreground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Board</span>
            {currentTab === 'team' && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--fire-orange)',
                }}
              />
            )}
          </Link>

          {/* Mobile Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
            <Link
              href="/contact"
              prefetch={true}
              id="mobile-contact-action-link"
              style={{ textDecoration: 'none', width: '100%' }}
              onClick={() => {
                if (onNavigate) onNavigate('contact');
                setMobileMenuOpen(false);
              }}
            >
              <Button
                variant="fire"
                size="sm"
                fullWidth
              >
                Talk to CESS
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
