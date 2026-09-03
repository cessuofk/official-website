'use client';

import React from 'react';
import { DepartmentsView } from '../../components/views/DepartmentsView';
import { useAppNavigation } from '../../lib/navigation';

export default function DepartmentsPage() {
  const handleNavigate = useAppNavigation();

  return <DepartmentsView onNavigate={handleNavigate} cardCovers="Photo" />;
}
