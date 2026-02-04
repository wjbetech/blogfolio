export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  image?: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
}
