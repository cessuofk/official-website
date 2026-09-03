'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { EventItem } from '../../../lib/types';
import { EventDetailView } from '../../../components/views/EventDetailView';
import { useAppNavigation } from '../../../lib/navigation';

const RegistrationDialog = dynamic(
  () => import('../../../components/RegistrationDialog').then((mod) => mod.RegistrationDialog),
  { ssr: false }
);

interface EventDetailClientProps {
  event: EventItem;
}

export function EventDetailClient({ event }: EventDetailClientProps) {
  const handleNavigate = useAppNavigation();
  const [regModalOpen, setRegModalOpen] = useState(false);

  return (
    <>
      <EventDetailView
        event={event}
        onNavigate={handleNavigate}
        onOpenRegistration={() => setRegModalOpen(true)}
        cardCovers="Photo"
      />
      {regModalOpen && (
        <RegistrationDialog
          event={event}
          isOpen={regModalOpen}
          onClose={() => setRegModalOpen(false)}
        />
      )}
    </>
  );
}
