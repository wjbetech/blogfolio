# Design system

Blogfolio is a personal editorial site with two practical goals: communicate development capability and make language-service work easy to understand and contact. The visual system should feel precise, readable, professional, and personal rather than like a generic SaaS dashboard.

## Theme system

Themes are defined as data in `src/lib/themes.ts` — the single source of truth. There are currently **20 themes**.

The runtime mechanism is:

1. The root layout renders `<ThemeStyles />`, a server-generated `<style>` block containing one `[data-theme="<id>"]` rule per theme, generated directly from `themes.ts` (a `:root` rule mirrors welcome as the fallback default).
2. A tiny pre-paint script at the top of `<body>` reads the saved theme id from `localStorage` (`site:theme`) and sets the `data-theme` attribute on `<html>` before first paint, so there is no theme flash.
3. Selecting a theme (`useThemeHook` → `applyTheme.ts`) sets the `data-theme` attribute and persists the id to `localStorage`. Clearing reverts to the welcome default.
4. Components use Tailwind utilities whose colors resolve through the CSS variables.

The server does not participate in theme selection; `<html data-theme="welcome">` is the SSR default and carries `suppressHydrationWarning` because the pre-paint script may change it before hydration. There is no theme cookie. Do not add palette variables to `globals.css`; edit `themes.ts` instead.

## Color tokens

The active custom token groups are:

| Token | Typical utilities | Role |
| --- | --- | --- |
| `bg-100` | `bg-bg-100` | Page background |
| `bg-200` | `bg-bg-200` | Elevated surfaces and cards |
| `bg-300` | `bg-bg-300` | Additional contrast and controls |
| `headline` | `text-headline` | Headings and primary emphasis |
| `paragraph` | `text-paragraph` | Body and secondary text |
| `button` | `bg-button` | Primary action background |
| `buttonText` | `text-buttonText` | Primary action text |
| `link` | `text-link` | Links |
| `accent-100` | `text-accent-100`, `bg-accent-100` | Soft accent |
| `accent-200` | `text-accent-200`, `bg-accent-200` | Mid accent and highlights |
| `accent-300` | `text-accent-300`, `bg-accent-300` | Strong accent/decorative use |
| `palette-border` | `border-palette-border` | Active palette selection |

Use the custom tokens for site-level styling. Platform-specific controls, such as the GitHub action button and dark lightbox backdrop, currently use deliberate raw colors; they are not evidence that a general new color system is needed.

Several standard shadcn tokens are not defined by Blogfolio. Treat those as known cleanup work, not as a reason to introduce a second design system.

## Typography

Fonts are loaded in `src/app/layout.tsx`:

- Inter: body text, navigation, descriptions, UI labels
- Bricolage Grotesque: display headings and editorial titles
- Geist Mono: code and technical labels

Existing pages use an editorial scale rather than one globally enforced utility class. Current conventions include:

- large serif display headings for hero and project detail pages
- serif section headings
- Inter body copy with generous line height
- small metadata and labels
- monospace code and technical tags

The blog redesign should establish a more precise article scale, reading width, and spacing rhythm without forcing unrelated pages into the article layout.

## Layout and interaction

The root layout provides:

- horizontal `px-6` page padding
- a `max-w-7xl` main content wrapper
- shared navbar, theme drawer, and footer

Important existing interaction systems include:

- keyboard-aware mobile navigation
- keyboard and focus-aware theme drawer
- carousels with button and drag interaction
- project screenshot slider and lightbox
- client-side blog tag filtering and pagination

Preserve these interaction/accessibility behaviors when changing surrounding layouts.

## Current blog styling

The blog body renders through a controlled component map in `PostContent`, producing consistent styling for:

- headings with anchors (level-2 through level-6)
- paragraphs
- unordered/ordered lists
- links
- strong and emphasis
- inline and fenced code
- blockquotes
- thematic breaks (dividers)
- images

The article body uses a `max-w-3xl` reading measure. See [content.md](./content.md) for the exact list of supported elements.

Phase 4 (PR #97) added editorial polish on top of this system:

- drop cap on the first paragraph of an article
- responsive article title sizing and a reading-time badge
- richer blockquote treatment (accent background, rounded corner)

A scroll-spy table of contents (`BlogToc`) renders beside the article on `xl`+ viewports (PRs #101/#102).

The following editorial embellishments remain **future work**, not current capabilities:

- pull quotes and more elaborate blockquote treatments
- article-specific font variation
- figures with captions
- callouts
- related posts
- fully refined responsive article rhythm

When these are added, they should be designed as controlled Blogfolio article components, not scattered one-off classes in individual posts.

## Component conventions

- Prefer feature-oriented components under `src/components/`.
- Keep pure transformations in `src/lib/`.
- Use `TrackedLink` where an interaction should be sent to analytics.
- Use `cn` for conditional class composition.
- Keep public content rendering separate from client-only controls.
- Do not add a shadcn component merely because it exists in `src/components/ui`.
- Verify that a UI primitive's token classes are supported by the Blogfolio theme before using it.

## Future styling work

The blog is a supporting credibility surface for development and language-service work. Future article styling should optimize for:

1. professional readability
2. clear technical communication
3. visual evidence of care and craft
4. authoring simplicity
5. consistency across posts

The blog redesign phases (controlled renderer, editorial polish) are complete per `docs/roadmap.md`; remaining embellishments above are deferred refinements, not a pending redesign.
