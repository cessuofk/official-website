'use client';

import React from 'react';
import { BlogsView } from '../../components/views/BlogsView';
import { useAppNavigation } from '../../lib/navigation';

export default function BlogsPage() {
  const handleNavigate = useAppNavigation();

  return <BlogsView onNavigate={handleNavigate} cardCovers="Photo" />;
}
