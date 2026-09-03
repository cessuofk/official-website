import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDepartmentBySlug, getAllDepartmentSlugs } from '../../../lib/data';
import { DepartmentDetailClient } from './DepartmentDetailClient';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDepartmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) {
    return { title: 'Department Not Found — CESS UofK' };
  }

  return {
    title: `${department.name} Section — CESS UofK`,
    description: department.description,
    openGraph: {
      title: `${department.name} Section — CESS UofK`,
      description: department.description,
      type: 'website',
    },
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);

  if (!department) {
    notFound();
  }

  return <DepartmentDetailClient department={department} />;
}
