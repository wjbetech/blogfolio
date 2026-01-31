# Phase 1: Foundational Frontend

## 1.1 Layout & Navigation

- [x] Create the main layout in `src/app/layout.tsx`
- [x] Build a Header component with navigation (Home/Blog, Portfolio, Admin\*)
- [ ] Build a Footer component with external navigations, icons, etc.
- [ ] Setup Tailwind styling and Tailwind workflow with suitable documentation
- [ ] Add a responsive mobile menu

## 1.2 Blog Pages

- [ ] Create a blog list page at `src/app/blog/page.tsx`
- [ ] Create the BlogCard component
- [ ] Create a dynamic blog detail page at `src/app/blog/[slug]/page.tsx`
- [ ] Build some mock data for testing purposes

## 1.3 Portfolio Page

- [ ] Create a static portfolio page at `src/app/portfolio/page.tsx`
- [ ] Build project showcase components
  - [ ] PortfolioItem component with re-useable structure?
- [ ] Add project images and descriptions
  - [ ] Host the images somewhere else if needed

# Phase 2: DB & Models

## 2.1 MongoDB

- [ ] Install `mongodb` and `mongoose` packages
- [ ] Create MongoDB connection utility in `src/lib/mongodb.ts`
- [ ] Setup env variables in `.env.local`

## 2.2 Data Models

- [ ] Define the Post schema in `src/models/post.ts`
  - [ ] Define texts, images, etc
- [ ] Add types in `src/app/types/index.ts`

# Phase 3: API Routing

## 3.1 CRUD

- [ ] GET via `/api/posts`
  - [ ] List all posts, a single post, post by category(?)
- [ ] POST via `/api/posts`
  - [ ] A protected API route for creating a new blog post
- [ ] PUT via `/api/posts/[id]`
  - [ ] A protected API route for updating a blog post
- [ ] DELETE via `/api/posts/[id]`
  - [ ] A protect API route for deleting a blog post

# Phase 4: Auth

## 4.1 Auth.js Setup

- [ ] Install `next-auth`
- [ ] Create an authentication configuration
- [ ] Setup a credentials provider (most likely Google)
- [ ] Create a login page
- [ ] Add session management

# Phase 5: Admin Dashboard

## 5.1 Admin UI

- [ ] Create the admin page UI at `src/app/admin/layout.tsx`
- [ ] Build posts list view with edit/delete actions for the authenticated admin user
- [ ] Create a post editor with rich text support
- [ ] Add image upload functionality\*
  - [ ] This depends on whether you store images via uploadthing or in mongoDB
- [ ] Build the preview mode

# Current Status

Phase 1 - Layout & Navigation Next Step: Build the main layout and header component.
