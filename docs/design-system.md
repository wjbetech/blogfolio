# Design system

Blogfolio is a personal editorial site with two practical goals: communicate development capability and make language-service work easy to understand and contact. The visual system should feel precise, readable, professional, and personal rather than like a generic SaaS dashboard.

## Theme system

Themes are defined as data in `src/lib/themes.ts`. There are currently **20 themes**.

The runtime mechanism is:

1. `useThemeHook` loads the saved theme ID in the browser.
2. `applyTheme` writes the selected token values as inline CSS variables on `document.documentElement`.
3. The selection is stored in `localStorage` and in a `site-theme` cookie.
4. Components use Tailwind utilities whose colors resolve through the CSS variables.

The `data-theme` attribute exists on `<html>` but is not the mechanism that supplies all theme values. The server does not currently read the theme cookie, so the server-rendered initial palette is the welcome theme until the client applies the saved choice.

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

There is a likely `bg-300` registration typo in `globals.css` and several standard shadcn tokens are not defined by Blogfolio. Treat those as known cleanup work, not as a reason to introduce a second design system.

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

The current/working-tree blog renderer provides only a partial styling contract. It includes styling for some links, lists, inline code, and fenced code, and maps headings to the existing `HeadingAnchor` component.

It does not yet constitute the professional editorial system you want. In particular, the following are planned rather than guaranteed current capabilities:

- enlarged first letters
- section dividers and thematic-break treatments
- article-specific font variation
- polished blockquotes and pull quotes
- figures and captions
- callouts
- tables and task lists
- table of contents
- related posts
- fully refined responsive article rhythm

These should be designed as controlled Blogfolio components, not scattered one-off classes in individual posts.

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

The full blog redesign is planned in `docs/roadmap.md`; it is not complete.
