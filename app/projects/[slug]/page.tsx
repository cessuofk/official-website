import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getAllProjectSlugs } from '../../../lib/data';
import { ProjectDetailClient } from './ProjectDetailClient';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Project Not Found — CESS UofK' };
  }

  return {
    title: `${project.name} — CESS UofK Projects`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — CESS UofK Projects`,
      description: project.summary,
      type: 'website',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
