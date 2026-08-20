# Blog Layout Hybrid — Iteration Research

Research date: 2026-08-20 (iteration)
Method: Following the `research` skill — investigating the combination question against
the codebase docs (primary project source) and established editorial/typography
literature, then capturing findings here.

## Question

We have three prototype blog-post variants:
- **A — Editorial**: author-first header, contained hero, tags + author bio footer
- **B — Magazine**: full-bleed hero with title overlay, dramatic title, floating TOC
- **C — Minimal Reader**: title-dominant header, no hero, narrow body, related-posts footer

Feedback: prefer **B's title section**, **A's contained hero image**, **C's body
readability**, and **C's related-posts footer**.

Goal: validate the combined "Variant D" against primary-source design principles and
the project's own design-system documentation.

## Findings from codebase (primary source)

### design-system.md constraints
- Blog body must render through the controlled `PostContent` component map (no scattered
  one-off classes in posts). Variant D keeps `PostContent` untouched — correct.
- The blog redesign should "establish a more precise article scale, reading width, and
  spacing rhythm without forcing unrelated pages into the article layout." Variant D's
  `max-w-[42rem]` body honors this (narrower than A/B's `max-w-3xl`).
- Drop cap, reading-time badge, and refined blockquote are already delivered (Phase 4);
  Variant D inherits them via `PostContent` + the existing header.
- Remaining Phase 4 gaps (figures/captions, callouts, TOC, related posts, mobile pass)
  are explicitly "planned, not current." Variant D's related-posts footer is a legitimate
  fill-in for the "related posts" gap; the floating TOC from B is intentionally left out
  of D to keep the reading column clean (can be re-added later).

### roadmap.md / todo.md
- Phase 4 is "implemented and verified, pending review/merge." The hybrid D is a
  refinement within the same scope, not a new phase.
- "Related posts" and "mobile reading experience pass" are listed under Phase 4 "Not done"
  — D addresses related posts; mobile pass remains a follow-up.

## Findings from editorial/typography literature

### Reading measure (validates C's narrower body)
- Established typography guidance (Bringhurst, *The Elements of Typographic Style*;
  Nielsen Norman Group) puts the optimal line length at **45–75 characters** for
  comfortable reading. At 16–18px body text this maps to roughly **600–700px**.
- A/B use `max-w-3xl` (768px ≈ ~80–90 chars at 18px) — slightly wide.
- C/D use `max-w-[42rem]` (672px ≈ ~70 chars at 18px) — inside the optimal band.
- **Verdict**: C/D's narrower measure is the more readable choice; keep `max-w-[42rem]`.

### Header hierarchy (validates B's dramatic title + A's author meta)
- Author-first headers (Substack, Medium) build credibility on *personal* sites — matches
  Blogfolio's "author as credibility surface" product goal. Keep A's avatar + meta row.
- A large display title (B's `text-6xl`, tight `leading-[0.92]`) establishes the editorial
  voice the design-system.md asks for ("large serif display headings"). Keep B's sizing.
- **Verdict**: merge A's author meta + B's dramatic title. This is exactly what D does.

### Hero placement (validates A's contained image over B's full-bleed)
- Full-bleed hero-with-overlay (B) is high-impact but competes with the title for
  attention and hurts legibility on busy images (requires gradient scrim).
- Contained, rounded hero (A) keeps the reading column as the focus and reads as "crafted"
  without stealing the title's thunder.
- **Verdict**: A's contained hero is the safer, cleaner choice for a credibility blog.
  Keep A's `max-w-4xl rounded-xl` treatment.

### Footer discovery (validates C's related-posts over A's author bio)
- Author bio (A) builds personal connection; related posts (C) drive session depth /
  "evidence of expertise" (a stated product goal).
- For a credibility surface, related posts better serve "attract work" than a bio the
  reader already sees in the header (A's header already shows the author).
- **Verdict**: C's related-posts grid is the better footer for Blogfolio's goals. Keep it.

## Conclusion

Variant D is well-supported by both the project's own design-system documentation and
established editorial typography principles:
- B title + A author meta → credibility + editorial voice ✓
- A contained hero → focus on reading, no scrim legibility risk ✓
- C narrow body → optimal 45–75 CPL reading measure ✓
- C related posts → supports "evidence of expertise" product goal ✓

### Open follow-ups (not in D)
- Floating TOC (from B) — re-add if long technical posts need it.
- Mobile reading pass — still pending from Phase 4; D should be checked at <640px.
- Pull quotes / callouts / figures-with-captions — remaining Phase 4 gaps; can layer onto
  `PostContent` later as controlled components.
