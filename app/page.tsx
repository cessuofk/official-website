'use client';

import React, { useState, useEffect } from 'react';
import { Route, EventItem, RhythmMode } from '../lib/types';
import {
  DEPARTMENTS,
  EVENTS,
  PROJECTS,
  BLOGS,
} from '../lib/data';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RegistrationDialog } from '../components/RegistrationDialog';

import { HomeView } from '../components/views/HomeView';
import { AboutView } from '../components/views/AboutView';
import { DepartmentsView } from '../components/views/DepartmentsView';
import { DepartmentDetailView } from '../components/views/DepartmentDetailView';
import { EventsView } from '../components/views/EventsView';
import { EventDetailView } from '../components/views/EventDetailView';
import { ProjectsView } from '../components/views/ProjectsView';
import { ProjectDetailView } from '../components/views/ProjectDetailView';
import { BlogsView } from '../components/views/BlogsView';
import { BlogDetailView } from '../components/views/BlogDetailView';
import { TeamView } from '../components/views/TeamView';
import { ContactView } from '../components/views/ContactView';

const INK_ROUTES: Route[] = ['home', 'event', 'project', 'department'];

export default function Page() {
  const [route, setRoute] = useState<Route>('home');
  const [slug, setSlug] = useState<string | null>(null);

  // Props & Controls
  const [cardCovers, setCardCovers] = useState<'Photo' | 'None'>('Photo');
  const [rhythm, setRhythm] = useState<RhythmMode>('Standard');

  // Registration Dialog State
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [activeRegEvent, setActiveRegEvent] = useState<EventItem | null>(null);

  // Sync section padding (rhythm) to :root CSS property
  useEffect(() => {
    const secYMap: Record<RhythmMode, string> = {
      Generous: '7rem',
      Standard: '6rem',
      Compact: '4rem',
    };
    document.documentElement.style.setProperty('--sec-y', secYMap[rhythm]);
  }, [rhythm]);

  const handleNavigate = (newRoute: Route, newSlug?: string) => {
    setRoute(newRoute);
    setSlug(newSlug || null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenRegistration = (event: EventItem) => {
    setActiveRegEvent(event);
    setRegModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setRegModalOpen(false);
  };

  const isInk = INK_ROUTES.includes(route);

  // Selected records for detail views
  const currentDepartment =
    DEPARTMENTS.find((d) => d.slug === slug) || DEPARTMENTS[0];
  const currentEvent =
    EVENTS.find((e) => e.slug === slug) || EVENTS[0];
  const currentProject =
    PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const currentBlog =
    BLOGS.find((b) => b.slug === slug) || BLOGS[0];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* 1. Global Sticky Header */}
      <Header
        currentRoute={route}
        onNavigate={handleNavigate}
        inkRoute={isInk}
      />

      {/* 3. Main Route Content */}
      <main style={{ flex: 1 }}>
        {route === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'departments' && (
          <DepartmentsView
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'department' && (
          <DepartmentDetailView
            department={currentDepartment}
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'events' && (
          <EventsView
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'event' && (
          <EventDetailView
            event={currentEvent}
            onNavigate={handleNavigate}
            onOpenRegistration={handleOpenRegistration}
            cardCovers={cardCovers}
          />
        )}

        {route === 'projects' && (
          <ProjectsView
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'project' && (
          <ProjectDetailView
            project={currentProject}
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'blogs' && (
          <BlogsView
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'blog' && (
          <BlogDetailView
            blog={currentBlog}
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'team' && (
          <TeamView
            onNavigate={handleNavigate}
            cardCovers={cardCovers}
          />
        )}

        {route === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* 4. Global Ink Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Registration Dialog Modal */}
      {activeRegEvent && (
        <RegistrationDialog
          isOpen={regModalOpen}
          event={activeRegEvent}
          onClose={handleCloseRegistration}
        />
      )}
    </div>
  );
}
