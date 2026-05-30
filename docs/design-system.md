# Design System

Reference for blogfolio's theme tokens, typography, spacing, and component conventions. **This document describes the current system. No code changes should be made without going through the review process in `roadmap.md`.**

---

## Guiding aesthetic

Professional, clean, minimalistic — with character. The site serves three audiences simultaneously: software/tech readers, translation clients, and general visitors. The design should feel like a thoughtful developer's personal space: precise, readable, with small moments of personality (the theme system, subtle hover effects). Never flashy.

---

## Theme system

### How it works

1. `src/lib/themes.ts` defines every theme as a plain object with named token keys.
2. `src/app/globals.css` registers those tokens as CSS custom properties under each `[data-theme="id"]` selector.
3. `src/app/globals.css` also maps each CSS variable to a Tailwind color utility via `@theme inline`, so `bg-bg-100`, `text-headline`, `text-paragraph`, etc. all work in JSX class names.
4. The root `<html>` element carries a `data-theme` attribute. Switching theme = one DOM write. No re-render, no class toggling.

### Token reference

| Token            | Tailwind class                      | Role                                                  |
| ---------------- | ----------------------------------- | ----------------------------------------------------- |
| `bg-100`         | `bg-bg-100`                         | Page background (lightest)                            |
| `bg-200`         | `bg-bg-200`                         | Card backgrounds, elevated surfaces                   |
| `bg-300`         | `bg-bg-300`                         | Input backgrounds, dividers, subtle contrast          |
| `headline`       | `text-headline`                     | All headings (h1–h4), labels, primary emphasis        |
| `paragraph`      | `text-paragraph`                    | Body text, descriptions, secondary content            |
| `button`         | `bg-button`                         | Primary button background                             |
| `button-text`    | `text-buttonText`                   | Primary button label                                  |
| `link`           | `text-link`                         | Inline text links                                     |
| `accent-100`     | `text-accent-100` / `bg-accent-100` | Soft accent, tag backgrounds, image placeholder fills |
| `accent-200`     | `text-accent-200` / `bg-accent-200` | Mid accent, hover states, highlights                  |
| `accent-300`     | `text-accent-300` / `bg-accent-300` | Strong accent, decorative elements                    |
| `palette-border` | `border-palette-border`             | Active/selected border in the palette picker          |

### Rule: never hardcode colours

Every colour used in a component must come from one of the tokens above. No raw hex values, no Tailwind named colours (`blue-500`, `gray-200`), no `opacity-` hacks to fake a colour. If the existing tokens don't cover a use case, add a new token to `themes.ts` and `globals.css` for all 14 themes before using it.

### Available themes (14 total)

| ID         | Name               | Character                   |
| ---------- | ------------------ | --------------------------- |
| `welcome`  | Welcome Theme      | Soft teal/green — default   |
| `gnome`    | Tree Gnome Village | Warm cream, forest green    |
| `kiln`     | Blackrock Kiln     | Dark warm, fire orange      |
| `flax`     | Flax Fields        | Deep teal dark, gold        |
| `silk`     | Proudmoore Silk    | Dark navy, soft pink        |
| `dunes`    | Kharidian Dunes    | Sandy warm light            |
| `demon`    | Demon Hunter       | Near-black, electric purple |
| `camelot`  | Merlin's Camelot   | Bright light, cobalt/gold   |
| `rellekka` | Rellekka           | Pale aqua, steel blue       |
| `ardougne` | Ardougne           | Parchment, rich purple      |
| `jungle`   | Jungle Remedy      | Muted green, amber          |
| `tinker`   | Tinkertown         | Light grey, slate blue      |
| `lich`     | The Lich King      | Near-black, electric blue   |
| `sunwell`  | The Sunwell        | Warm ivory, crimson         |

---

## Typography

### Font stack

| Variable            | Font                | Used for                                       |
| ------------------- | ------------------- | ---------------------------------------------- |
| `--font-sans`       | Inter               | Body text, UI labels, navigation, descriptions |
| `--font-serif`      | Bricolage Grotesque | Headings (h1–h3), hero text, display titles    |
| `--font-geist-mono` | Geist Mono          | Code blocks, inline code, technical labels     |

Applied in `src/app/layout.tsx` via Next.js Google Fonts loader. All three fonts are subset to Latin and injected as CSS variables on `<html>`.

### Heading scale (current — to be documented precisely in Phase C)

The heading scale is applied ad-hoc across pages right now. As part of Phase C typography cleanup, it should be standardised to a consistent scale:

| Level          | Suggested class                      | Example use                      |
| -------------- | ------------------------------------ | -------------------------------- |
| Display / Hero | `text-5xl font-bold` (Bricolage)     | Page hero titles                 |
| H1             | `text-4xl font-bold` (Bricolage)     | Post titles, page titles         |
| H2             | `text-2xl font-semibold` (Bricolage) | Section headings                 |
| H3             | `text-xl font-semibold` (Inter)      | Card titles, subsections         |
| H4             | `text-base font-semibold` (Inter)    | Labels, sidebar sections         |
| Body           | `text-base` (Inter)                  | Default paragraph text           |
| Small / Meta   | `text-sm` (Inter)                    | Dates, tags, read-time, captions |
| Code           | `text-sm font-mono` (Geist Mono)     | Inline code, code blocks         |

> **Phase C action:** audit every page and component for heading inconsistencies and standardise to this scale.

---

## Spacing conventions

The layout is contained by two wrappers in `src/app/layout.tsx`:

- Outer horizontal padding: `px-6` on the content wrapper
- Max content width: `max-w-7xl mx-auto` on `<main>`

Page-level vertical rhythm (current pattern, should be standardised):

- Section spacing: `py-12` to `py-16`
- Card gaps in carousels: `gap-4`
- Internal card padding: provided by the shadcn `Card` primitive

---

## Component conventions

### Cards (BlogPostCard + ProjectPostCard)

Current structure (both cards):

```
Card (w-92 shrink-0 h-110)
  ├── Image area (h-48 / h-40)
  ├── Title (text-headline, font-semibold, line-clamp-2)
  ├── Snippet / description (text-paragraph, text-sm, line-clamp-3)
  └── CTA link (text-link, "View")
```

**Known issues to address in Phase C (card redesign):**

- Fixed pixel widths (`w-92`, `h-110`) can cause layout issues at edge breakpoints
- "View" CTA is bare text with no visual affordance — looks unfinished
- No hover state on the card itself (only on the project card title)
- Blog card CTA doesn't link to the post title — two separate tap targets where one would do
- No visual distinction between "blog" and "project" card types
- No tag/category display on blog cards

**Planned card redesign goals (Phase C):**

- Full card as a single click target (wrap entire card in `<Link>`)
- Replace bare "View" text with a styled CTA chip using `accent-100` background

### Buttons

Primary button pattern:

```html
<button
  class="bg-button text-buttonText font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"></button>
```

Use `bg-button` / `text-buttonText` — never hardcoded colours.

### Links

Inline text links: `text-link hover:underline` Navigation links: `text-paragraph hover:text-headline transition-colors`

### Borders and dividers

Use `border-accent2/20` for subtle dividers (currently used in contact page). Use `border-palette-border` only for the theme palette picker's active state.

---

## What not to touch

- The token names in `themes.ts` — changing a key name requires updating `globals.css`, all 14 `[data-theme]` blocks, and every component that uses that Tailwind class.
- The `data-theme` switching mechanism in `ThemeAside` — it works perfectly.
- The `:root` defaults in `globals.css` — they mirror the `welcome` theme and ensure no flash of un-themed content on first load.
- The `@theme inline` block in `globals.css` — this is what makes the CSS variables available as Tailwind utilities. Removing or reordering entries breaks all colour classes.
