export type Route =
  | 'home'
  | 'about'
  | 'departments'
  | 'department'
  | 'events'
  | 'event'
  | 'projects'
  | 'project'
  | 'blogs'
  | 'blog'
  | 'team'
  | 'contact';

export type EventStatus = 'Open' | 'Upcoming' | 'Closed';
export type ProjectStatus = 'Active' | 'Completed' | 'Pending';
export type RhythmMode = 'Generous' | 'Standard' | 'Compact';

export interface Department {
  slug: string;
  name: string;
  description: string;
  objectives: string[];
  head: string;
  email: string;
  phone: string;
  slotLabel: string;
  image?: string;
}

export interface EventItem {
  slug: string;
  name: string;
  kind: string;
  date: string;
  regCloses: string;
  location: string;
  department: string;
  deptSlug: string;
  status: EventStatus;
  summary: string;
  content: string[];
  slotLabel: string;
  image?: string;
  gallery?: string[];
  schedule?: { day: string; title: string; time: string; speaker?: string; hall?: string }[];
}

export interface ProjectItem {
  slug: string;
  name: string;
  department: string;
  deptSlug: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  dateRange: string;
  summary: string;
  content: string[];
  slotLabel: string;
  image?: string;
  gallery?: string[];
  paths?: { name: string; titleAr?: string; description: string; highlights: string[] }[];
}

export interface BlogItem {
  slug: string;
  title: string;
  department: string;
  deptSlug: string;
  author: string;
  date: string;
  summary: string;
  content: string[];
  slotLabel: string;
  image?: string;
}

export interface HighlightItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  department: string;
  slug?: string;
  route?: Route;
}

export interface BoardPosition {
  title: string;
  scope: string;
  image?: string;
}

export interface BoardMember {
  id: number;
  name: string;
  role: string;
  category: 'Executive' | 'Secretariat' | 'Council' | 'Honorary';
  department?: string;
  scope?: string;
  image?: string;
}
