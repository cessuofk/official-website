'use client';

import React from 'react';
import { BlogItem } from '../../../lib/types';
import { BlogDetailView } from '../../../components/views/BlogDetailView';
import { useAppNavigation } from '../../../lib/navigation';

interface BlogDetailClientProps {
  blog: BlogItem;
}

export function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const handleNavigate = useAppNavigation();

  return (
    <BlogDetailView
      blog={blog}
      onNavigate={handleNavigate}
      cardCovers="Photo"
    />
  );
}
