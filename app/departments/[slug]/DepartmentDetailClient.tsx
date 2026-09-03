'use client';

import React from 'react';
import { Department } from '../../../lib/types';
import { DepartmentDetailView } from '../../../components/views/DepartmentDetailView';
import { useAppNavigation } from '../../../lib/navigation';

interface DepartmentDetailClientProps {
  department: Department;
}

export function DepartmentDetailClient({ department }: DepartmentDetailClientProps) {
  const handleNavigate = useAppNavigation();

  return (
    <DepartmentDetailView
      department={department}
      onNavigate={handleNavigate}
      cardCovers="Photo"
    />
  );
}
