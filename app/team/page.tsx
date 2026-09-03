'use client';

import React from 'react';
import { TeamView } from '../../components/views/TeamView';
import { useAppNavigation } from '../../lib/navigation';

export default function TeamPage() {
  const handleNavigate = useAppNavigation();

  return <TeamView onNavigate={handleNavigate} cardCovers="Photo" />;
}
