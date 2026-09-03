'use client';

import React from 'react';
import { CreditsView } from '../../components/views/CreditsView';
import { useAppNavigation } from '../../lib/navigation';

export default function CreditsPage() {
  const handleNavigate = useAppNavigation();

  return <CreditsView onNavigate={handleNavigate} />;
}
