'use client';

import React from 'react';
import { AboutView } from '../../components/views/AboutView';
import { useAppNavigation } from '../../lib/navigation';

export default function AboutPage() {
  const handleNavigate = useAppNavigation();

  return <AboutView onNavigate={handleNavigate} cardCovers="Photo" />;
}
