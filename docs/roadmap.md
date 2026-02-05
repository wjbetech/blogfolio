# Current Status

Phase 2 - CMS Data Layer
Current Task - Setting up Prisma DB

# Phase 1: Foundational Frontend

## 1.1 Layout & Navigation

- [x] Create the main layout in `src/app/layout.tsx`.
- [x] Build a Header component with navigation (Home/Blog, Portfolio, Admin\*).
- [x] Build a Footer component with external navigations, icons, etc.
- [x] Setup Tailwind styling and Tailwind workflow with suitable documentation
  - [x] Fix the styles in the ThemeDrawer components.
- [x] Add a responsive mobile menu.
- [x] Standardize and centralize theme variable names.
- [x] Fix the carousel arrows to be useful and accessible.
- [x] Add thick underline affects to the 'See all [...]' links.
- [x] Fix some odd colorings in some themes.

### 1.1.1 Initial Unit Testing

- [x] Build unit tests for the applyTheme logic.

### 1.1.2 UI Improvements & Accessibility

- [x] Take a look at Tailwind pseudo-classes again
  - [ ] Optimize for DX and overall re-useability/readability
- [ ] Ensure keyboard accessibility and clear focus states
- [x] Add a canonical useTheme hook (src/lib/useTheme.ts) that exposes theme
- [x] Replace remaining cookie/localStorage calls with useTheme for a single source of truth
  - [x] Need evaluation of how this will work for new users/existing users
- [ ] Fix palette cards to be fully fixed-width
- [ ] CSS snap for carousels (scroll-snap-type)\*
- [x] Look into a Changelog for the entire app that can export to Webcomments or other automatic updater in the app HTML.

  #### 1.1.2
  - [ ] Theme toggle button should have aria-expanded and aria-controls atts.
  - [ ] Drawer role should be "dialog" and aria-modal when overlaying.
  - [ ] Mobile nav should trap focus and restore focus on close.
  - [ ] Links should use aria-current="page" for active nav items.

## 1.2 Blog Pages

- [x] Create a blog list page at `src/app/blog/page.tsx`
- [x] Create the BlogCard component
- [ ] Create a dynamic blog detail page at `src/app/blog/[slug]/page.tsx`
- [x] Build some mock data for testing purposes

## 1.3 Portfolio Page

- [x] Create a static portfolio page at `src/app/portfolio/page.tsx`
- [x] Build project showcase components
  - [x] PortfolioItem component with re-useable structure?
- [ ] Add project images and descriptions
  - [ ] Host the images somewhere else if needed

# Phase 2: CMS Data Layer

## 2.1 Prisma + Database (SQLite dev, Postgres prod)

- [ ] Install `prisma` and `@prisma/client`
- [ ] Initialize Prisma schema and SQLite dev DB
- [ ] Add Postgres connection for production
- [ ] Create DB utility in `src/lib/db.ts`
- [ ] Setup env variables in `.env.local`

## 2.2 Content Models (Posts + Projects)

- [ ] Define Post model: title, slug, date, tags, coverImage, bodyMDX, status (draft/published)
- [ ] Define Project model: title, slug, date, tags, coverImage, bodyMDX, status
- [ ] Add metadata fields: createdAt, updatedAt, publishedAt
- [ ] Add audit log model (action, entity, user, timestamp)
- [ ] Add types in `src/app/types/index.ts`

## 2.3 Media Storage

- [ ] Choose media storage (S3 or Cloudinary)
- [ ] Implement presigned upload flow
- [ ] Store media references on posts/projects

# Phase 3: API Routing + Validation

## 3.1 CRUD (Posts + Projects)

- [ ] GET `/api/posts` + `/api/projects` (list, single, filters)
- [ ] POST `/api/posts` + `/api/projects` (protected)
- [ ] PUT `/api/posts/[id]` + `/api/projects/[id]` (protected)
- [ ] DELETE `/api/posts/[id]` + `/api/projects/[id]` (protected)

## 3.2 Validation + Sanitization

- [ ] Server-side validation (Zod or similar)
- [ ] Sanitize MDX/HTML input
- [ ] Rate limiting for admin routes

## 3.3 Preview + Publishing

- [ ] Draft vs published workflow
- [ ] Preview mode for draft content
- [ ] Incremental revalidation on publish/update

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
- [ ] Build projects list view with edit/delete actions
- [ ] Create a post/project editor with Markdown/MDX support
- [ ] Add image upload functionality (S3/Cloudinary)
- [ ] Build preview mode for drafts
- [ ] Add audit log viewer for admin actions

# Phase 6: Build Plan (Incremental)

## 6.1 Schema + API + Tests

- [ ] Implement Prisma schema and migrations
- [ ] Build CRUD endpoints for posts/projects
- [ ] Add basic API tests for create/read/update/delete

## 6.2 Admin UI + Editor

- [ ] Build admin list views + editor form
- [ ] Add Markdown/MDX editor with preview
- [ ] Add status controls (draft/published)

## 6.3 Media + Deploy

- [ ] Add presigned uploads + media storage
- [ ] Store coverImage/media references in DB
- [ ] Deploy with environment configs

## 6.4 Polish

- [ ] Roles/permissions
- [ ] Backups
- [ ] UX improvements
