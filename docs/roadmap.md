# Current Status

Phase 1 - Layout & Navigation Next Step: Standardize and centralize theme variable names.

# Phase 1: Foundational Frontend

## 1.1 Layout & Navigation

- [x] Create the main layout in `src/app/layout.tsx`.
- [x] Build a Header component with navigation (Home/Blog, Portfolio, Admin\*).
- [x] Build a Footer component with external navigations, icons, etc.
- [x] Setup Tailwind styling and Tailwind workflow with suitable documentation
  - [x] Fix the styles in the ThemeDrawer components.
- [x] Add a responsive mobile menu.
- [x] Standardize and centralize theme variable names.
- [ ] Fix the carousel arrows to be useful and accessible.

### 1.1.1 Initial Unit Testing

- [ ] Build unit tests for the applyTheme logic.

### 1.1.2 UI Improvements & Accessibility

- [ ] Take a look at Tailwind pseudo-classes again
  - [ ] Optimize for DX and overall re-useability/readability
- [ ] Ensure keyboard accessibility and clear focus states
- [ ] Add a canonical useTheme hook (src/lib/useTheme.ts) that exposes theme
- [ ] Replace remaining cookie/localStorage calls with useTheme for a single source of truth
  - [ ] Need evaluation of how this will work for new users/existing users
- [ ] Fix palette cards to be fully fixed-width
- [ ] CSS snap for carousels (scroll-snap-type)\*
- [ ] Look into a Changelog for the entire app that can export to Webcomments or other automatic updater in the app HTML.

  #### 1.1.2
  - [ ] Theme toggle button should have aria-expanded and aria-controls atts.
  - [ ] Drawer role should be "dialog" and aria-modal when overlaying.
  - [ ] Mobile nav should trap focus and restore focus on close.
  - [ ] Links should use aria-current="page" for active nav items.

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
