export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech: string[];
  link: string;
  repo?: string;
  images?: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
}
