'use client';

import React from 'react';
import { ContactView } from '../../components/views/ContactView';
import { useAppNavigation } from '../../lib/navigation';

export default function ContactPage() {
  const handleNavigate = useAppNavigation();

  return <ContactView onNavigate={handleNavigate} />;
}
