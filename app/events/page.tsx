'use client';

import React from 'react';
import { EventsView } from '../../components/views/EventsView';
import { useAppNavigation } from '../../lib/navigation';

export default function EventsPage() {
  const handleNavigate = useAppNavigation();

  return <EventsView onNavigate={handleNavigate} cardCovers="Photo" />;
}
