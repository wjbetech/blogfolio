# Blog Layout Pattern Research

Research date: 2026-08-20

## Question

What are the strongest editorial blog post layout patterns for a personal site that uses blog as a credibility surface (not a publishing platform)?

## Sources and patterns

### 1. Substack / Craft pattern (current footer reference)

**Source:** Substack post pages, Craft publishing platform

- Author-first header: avatar + name + date + reading time above the title
- Title is the dominant element (large serif or bold sans)
- Optional deck/subtitle below title
- Thin rule separating header from body
- Body at comfortable reading width (~680px / max-w-3xl)
- Inline images with captions below
- Tags/topics at the bottom, not top
- Author bio card at the end with links to other work

**Strengths:** Establishes author credibility immediately; familiar reader pattern; clean separation of meta and content.

### 2. Quartz / Garden pattern (current hero reference)

**Source:** Quartz (jwenora.github.io/quartz), digital gardens

- Hero image bleeds wider than the body column
- Content sits in a narrow, focused column
- Backlinks and related content inline or in a sidebar
- Table of contents often floating or sidebar-mounted
- Less author-prominent, more content-first

**Strengths:** Content-first; good for technical/reference content; related content discovery.

### 3. Linear / Vercel blog pattern

**Source:** linear.app/blog, vercel.com/blog

- Full-bleed hero image or gradient at top
- Title overlaid on or below the hero
- Very clean sans-serif typography
- Generous whitespace, large text size
- Minimal meta (date, reading time small and subtle)
- No author avatar in header (brand-first, not author-first)
- Code blocks and images full-width within the reading column
- Simple single-column, no sidebar

**Strengths:** Modern, polished, high-production feel; good for brand credibility.

### 4. Hey Designer / Magazine editorial pattern

**Source:** Magazine layouts, Cereal magazine, Kinfolk

- Dramatic full-bleed hero
- Title in large display type, sometimes overlapping the image
- Pull quotes with large accent typography
- Multi-column text for shorter sections
- Generous image margins and figure/caption styling
- Drop caps on first paragraph
- Strong typographic hierarchy with varied weights

**Strengths:** High visual impact; feels crafted and intentional; good for personality.

### 5. Stripe / Technical editorial pattern

**Source:** stripe.com/blog, tailwindcss.com/blog

- Clean, wide layout
- Author avatar small, inline with date
- Title is large but not dramatic
- Very generous code block styling (full-width, syntax highlighted)
- Technical diagrams and images given prominence
- Related posts at bottom in a grid
- Minimal decorative elements; let the content speak

**Strengths:** Professional, technical credibility; no-nonsense; good for developer audiences.

## Key design axes for Blogfolio

Based on the research, the meaningful variation axes are:

1. **Header hierarchy:** Author-first (Substack) vs. Title-first (Linear) vs. Brand-first (Vercel)
2. **Hero treatment:** Bleed image (Quartz) vs. contained image vs. no hero / text-only
3. **Body width:** Narrow (~680px) vs. medium (~768px) vs. wide (~896px)
4. **Image integration:** Full-width figures vs. contained with captions vs. inline with text wrap
5. **Footer elements:** Author bio + tags vs. related posts vs. TOC
6. **Typography voice:** Serif editorial vs. clean sans vs. mixed

## Recommendation for Blogfolio

Since Blogfolio is author-first (personal credibility site), the strongest patterns are:

- **Substack/Craft** for the header structure (author + meta + title + rule)
- **Quartz** for the hero bleed (content-focused but visually engaging)
- **Magazine** for the body embellishments (drop caps, pull quotes, figures)

The current implementation already blends these. The remaining Phase 4 work (figures/captions, callouts, TOC, related posts, mobile pass) is about filling in the body and footer gaps.
