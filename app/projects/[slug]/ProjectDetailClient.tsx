'use client';

import React from 'react';
import { ProjectItem } from '../../../lib/types';
import { ProjectDetailView } from '../../../components/views/ProjectDetailView';
import { useAppNavigation } from '../../../lib/navigation';

interface ProjectDetailClientProps {
  project: ProjectItem;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const handleNavigate = useAppNavigation();

  return (
    <ProjectDetailView
      project={project}
      onNavigate={handleNavigate}
      cardCovers="Photo"
    />
  );
}
