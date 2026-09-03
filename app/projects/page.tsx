'use client';

import React from 'react';
import { ProjectsView } from '../../components/views/ProjectsView';
import { useAppNavigation } from '../../lib/navigation';

export default function ProjectsPage() {
  const handleNavigate = useAppNavigation();

  return <ProjectsView onNavigate={handleNavigate} cardCovers="Photo" />;
}
