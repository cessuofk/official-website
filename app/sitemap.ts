import { MetadataRoute } from 'next';
import {
  getAllDepartmentSlugs,
  getAllEventSlugs,
  getAllProjectSlugs,
  getAllBlogSlugs,
} from '../lib/data';

const BASE_URL = 'https://www.cessuofk.site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/departments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/credits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const departmentRoutes: MetadataRoute.Sitemap = getAllDepartmentSlugs().map((slug) => ({
    url: `${BASE_URL}/departments/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const eventRoutes: MetadataRoute.Sitemap = getAllEventSlugs().map((slug) => ({
    url: `${BASE_URL}/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...departmentRoutes,
    ...eventRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}
