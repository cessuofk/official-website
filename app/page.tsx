'use client';

import React from 'react';
import { HomeView } from '../components/views/HomeView';
import { useAppNavigation } from '../lib/navigation';

export default function HomePage() {
  const handleNavigate = useAppNavigation();

  return <HomeView onNavigate={handleNavigate} cardCovers="Photo" />;
}
