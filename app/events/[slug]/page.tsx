import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getEventBySlug, getAllEventSlugs } from '../../../lib/data';
import { EventDetailClient } from './EventDetailClient';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) {
    return { title: 'Event Not Found — CESS UofK' };
  }

  return {
    title: `${event.name} — CESS UofK Events`,
    description: event.summary,
    openGraph: {
      title: `${event.name} — CESS UofK Events`,
      description: event.summary,
      type: 'website',
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <EventDetailClient event={event} />;
}
