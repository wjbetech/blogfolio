export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  image?: string;
  featured: boolean;
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
}
