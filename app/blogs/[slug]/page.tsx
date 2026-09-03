import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogBySlug, getAllBlogSlugs } from '../../../lib/data';
import { BlogDetailClient } from './BlogDetailClient';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) {
    return { title: 'Article Not Found — CESS UofK' };
  }

  return {
    title: `${blog.title} — CESS UofK Articles`,
    description: blog.summary,
    openGraph: {
      title: `${blog.title} — CESS UofK Articles`,
      description: blog.summary,
      type: 'article',
      authors: [blog.author],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
