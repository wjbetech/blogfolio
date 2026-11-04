# Blogfolio: design review and proposed direction

Reviewed 24 October 2026. The Working notebook direction is selected; its first implementation pass is now on the development branch. The homepage introduction now reads “AI Engineer. / Seoul, Korea.”, omits the eyebrow and hero action row, and gives the desktop profile navigation more vertical separation; mobile navigation keeps its compact spacing.

## Basis and verdict

The source of truth for this review is the running development site at **http://127.0.0.1:4181**, served from `C:/WebDev/blogfolio/work/home-card-designs`, branch `feat/home-sidebar-redesign`, HEAD `b5b27b8`, **including its existing uncommitted edits**. The root checkout (`fix/dev-sidepanel`) and the production homepage are different versions and are excluded from the conclusions below.

The development site has a promising identity: a personal profile sidebar, quiet layouts, Space Grotesk headings, IBM Plex Sans reading text, restrained project tiles, and a playful palette collection. Preserve that character. Its current limitation is that the main content does not yet have the hierarchy, evidence, or art direction to match the strength of the shell.

My recommendation is **a working notebook for language and intelligent systems**. Keep the sense that this is one thoughtful engineer's space. Add complexity through well-composed project evidence, diagrams, typographic contrast, and a small number of meaningful interactions. The visual signature should come from the intersection of language and systems, which is specific to William's background.

The largest strategic gap is evidence. The six published projects demonstrate product and interface work, but their current case-study text does not establish an AI systems practice: no documented evaluation, model behavior, retrieval decisions, failure handling, or measured AI outcome. Styling those projects more impressively will help, but an AI engineering portfolio needs at least one substantive, verifiable AI case study. Using AI to help write software and engineering an AI system are different capabilities; describe both accurately.

## What was inspected

Browser review covered the five main pages, all six published project detail pages, all six published articles, `/card-designs`, `/font-playground`, a legacy project redirect, and the missing-page experience. The main templates were inspected at desktop and 390px mobile sizes; article layout was also measured at 1440px. This is a design and source review, not a complete accessibility or production performance audit. Contact messages were not submitted and external project applications were not functionally tested.

Source inspection included the actual frame and homepage CSS modules, App Router templates, theme module, content schema and publication filter, metadata, MDX renderer, image gallery, project data, blog sorting/filtering, and current role component. Several documentation descriptions lag the implementation; code and rendered behavior take precedence.

### First fix the composition constraints

| Observed issue | Evidence in this development build | Design consequence and proposed response |
| --- | --- | --- |
| Article overflow at a common desktop width | At a 1280px browser viewport, article document width measured about 1333px. The article body was 768px and its TOC extended to approximately x=1333. | The persistent profile sidebar and older article layout compete for width. Replace the spacer/body/TOC flex arrangement with a grid that fits the available content area. Show the side TOC only when the container can actually accommodate it. Keep the existing collapsible TOC below that threshold. |
| Main project cards squeezed between two sidebars | `/dev` reserves 240px for an internal index plus two large flex gaps, inside a frame that already reserves 200px for the profile. Each remaining card is then split approximately in half. | Screenshots become small and descriptions wrap into tall columns. Use full-width project compositions inside the content area. Offer the project index as a compact local navigation row or collapsible control. Retain a side index only at widths that leave a useful project canvas. |
| Mobile gallery hides most of an image | On `/dev/wordweb` at 390px, an image rendered approximately 900px wide within a roughly 312px visible gallery. The screenshot was visibly cropped at both sides. | `ProjectImageSlider` gallery uses a fixed 440px height and `max-w-[900px]` on its image. Fit the entire screenshot to the available inline size, with a responsive aspect ratio and `object-contain`; reserve deliberate detail crops for separate, captioned figures. |
| Mobile identity consumes the first screen | The frame has 102px top padding, a profile/navigation/GitHub block, then additional content spacing. The homepage's first project heading appeared around the bottom of an 844px-high viewport. | Compact the mobile identity area. Put portrait/name and menu/theme actions on one row, then a short navigation row. Aim for page-specific content to begin around 150–190px from the top, subject to text scaling. Return the 36px permanently reserved right rail space to reading content. |
| Default palette loses actionable text | The Welcome palette's `accent-200` (`#f2cc8f`) against `bg-100` (`#eaf4f4`) has a computed contrast ratio of **1.36:1**. Its opaque button text/background pairing is **2.61:1**. These tokens are used on homepage actions and contact controls. | Pastel accents can remain as surfaces. Give action text and button labels independent, sufficiently dark/light tokens. Evaluate real rendered combinations, including opacity, hover, and focus. |
| Page identity is hidden | `/dev`, `/blog`, `/language-services`, and `/contact` use visually hidden page headings. | Restore a visible page title or a clear page-specific thesis. The sidebar's active item alone should not carry the whole visual hierarchy. |

Contrast ratios above were calculated from palette hex values using relative sRGB luminance. They are token-pair measurements, not a claim that every rendered element was audited. The initially selected Skyborne theme had a body/page ratio of 6.20:1; its `accent-200`/page ratio was 4.13:1. The interface should not assume that every accent is suitable for small text. WCAG's normal-text minimum is 4.5:1; large-text minimum is 3:1. [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

## An identity worth developing

The site can say, in substance: **William East builds useful software and AI systems, and brings a language specialist's care to their interfaces and explanations.** Seoul, translation, teaching, and personal interests provide an individual voice. Engineering work should still be immediately findable and dominant.

Use one characteristic visual device: **paired representations of the same idea**. For example, a word and its semantic graph; a user request and an annotated execution trace; a source sentence and a carefully edited translation; a system diagram and the interface it produces. This can connect the homepage, case studies, articles, and social images without adding unrelated decoration.

The first honest example can be Wordweb: vocabulary becomes an explorable structure. A future AI example can show a real task, the decisions made by the system, and the observed result. Label recorded examples as recorded. Use measured values only when there is a reproducible basis. A visitor should be able to understand the example without running an expensive service.

Keep one such interactive example prominent. Surround it with quiet content. An interaction that reveals reasoning gives the site both visual richness and something another developer can share. Bartosz Ciechanowski's articles and Josh Comeau's interactive explanations are useful references for that principle; reproduce the care and explanatory purpose, not their visual identity. [Bartosz's mechanical explanations](https://ciechanow.ski/mechanical-watch/), [Josh's animation explanation](https://www.joshwcomeau.com/animation/css-transitions/)

### Type, color, and physical rhythm

**Keep the actual current type pairing for the first pass.** `src/app/layout.tsx` loads Space Grotesk, IBM Plex Sans, and Geist Mono. Space Grotesk gives enough engineered character; IBM Plex Sans carries long explanations comfortably. A stronger scale will do more than a fourth font. Use mono for code, dates, specimen labels, and genuine technical information. Do not make every paragraph or button monospaced.

| Role | Proposed starting specification |
| --- | --- |
| Main homepage thesis | Space Grotesk 500–600, roughly 48–64px desktop / 34–40px mobile, line-height 1.05–1.12, width about 16–20ch |
| Page and article titles | Space Grotesk 600, responsive 34–56px; allow 1.08–1.15 line-height for long titles instead of the current 0.92–0.95 |
| Section titles | Space Grotesk 500–600, 24–30px; fewer competing uppercase labels |
| Reading text | IBM Plex Sans 400, 17–18px desktop / 16–17px mobile, line-height 1.7–1.8; test a 62–70ch measure |
| Metadata / captions | IBM Plex Sans or Geist Mono, generally 12–14px; keep enough contrast rather than relying on low opacity |
| Code | Geist Mono, 13–14px, horizontally scrollable within its own frame |

Use the existing font playground to compare real long titles, code, Korean text, and mobile navigation. Its current three pairings already provide a sufficient experiment. IBM Plex Serif with Plex Sans is a reasonable alternate if a stronger literary voice is desired; use it selectively for an essay title or quotation. Do not introduce another font merely to make the site look redesigned. Rename the misleading `--font-serif` to `--font-display` when touching the typography system, updating its consumers together. [Space Grotesk](https://github.com/floriankarsten/space-grotesk), [IBM Plex](https://github.com/IBM/plex)

For the primary identity, refine **Skyborne** into a less saturated canvas with a stronger ink color. This retains an existing preference and the cool atmosphere, while giving screenshots more separation. Proposed art-direction values—not yet a validated replacement theme:

| Name | Light | Dark companion | Intended use |
| --- | --- | --- | --- |
| Air / night | `#F2F5F8` | `#171E27` | Main canvas |
| Plate | `#E4EBF2` | `#222D3A` | Diagram and media surfaces |
| Ink | `#243654` | `#E7EEF7` | Headings and strong labels |
| Graphite | `#45546B` | `#B9C7D8` | Body copy |
| Signal | `#356F82` | `#8BC4D3` | Links, selected paths, focus |
| Annotation | `#87552C` | `#DDB28B` | Restrained secondary emphasis |

Keep the game-inspired palettes as an optional personal feature. Present a polished light and dark starting choice, with the full collection in a secondary view. Do not make visitors navigate 23 palettes to understand the site. Define text, surface, border, and focus roles separately; all themes should share those responsibilities even when their colors vary. In this branch the data belongs in `src/lib/theme/palettes.ts`, not the deprecated `src/lib/themes.ts` re-export or `globals.css`.

Use an 8px spacing rhythm, with 4px for close relationships: 16–24px within a content unit, 32–40px between associated units, 72–96px between major desktop sections, and 48–64px on mobile. These are starting constraints, not a reason to preserve a large gap that hides the next useful thing. Keep 6–10px media corners, quieter borders, and shadows only where a control or image plate benefits from separation.

## Page-by-page changes

### Home `/`

The sidebar and concise recent writing list are good. The 27px greeting, animated building indicator, and two paragraphs currently dominate before the project grid. Six equally weighted square crops then show fragments of product homepages, often without a visible title until hover.

Proposed order:

1. A concise two-line thesis and a two-sentence explanation. Keep "Hi, I'm Will" as an introduction rather than the whole hero. The current thesis is “AI Engineer. / Seoul, Korea.”
2. Let the selected work immediately below the introduction carry the next action. The current homepage omits hero buttons and relies on the persistent navigation and project links; keep personal interests as a short note farther down.
3. One large selected-work plate with an informative screenshot or diagram, a plain-language purpose, and one engineering decision. Wordweb can bridge the language and software story immediately. An AI case study should take this position once it is substantive.
4. Two complementary project summaries with always-visible names and short purpose statements. Link to the complete six-project index.
5. Three selected/recent articles, with a one-line description where it helps a reader choose. The text-first treatment can stay.
6. A small contact invitation and RSS link; the current frame no longer renders the earlier global footer, so account for this intentionally.

The signature plate can have an input/output reveal or a two-state annotation. A subtle transformation on explicit interaction is enough. The current rolling blocks already respect reduced motion; preserve that care. Consider letting the ornament settle after a short introduction so the work holds attention.

### Work index `/dev`

Keep the public route. The navigation label can remain Projects; a visible title such as "Selected work" is clearer than the hidden "Dev" heading. Lead with what the work solves. The current role accordion is useful context, but it is too dominant relative to the actual projects; reduce it to a compact summary above or below the selected work.

Use one primary project and a consistent set of secondary projects. At ordinary desktop widths give each project the full content column: a substantial 16:10 image followed by, or paired with, a purpose and decision. At larger widths use a balanced image/text arrangement only if each side remains comfortable. Stop alternating the image side simply because an index is odd or even; use a stable scan path.

Move the full stack list below the purpose. Show at most three useful stack labels in the index; the details page can carry the rest. "16 technologies" is a weak proof point compared with one clear technical tradeoff, so use that space for evidence or remove it. Keep the changelog as a quieter final section or disclosure, preserving access to it.

Make **Read case study** the primary action where the case study deserves it; keep source and live application available as secondary links. Preserve tracked events and meaningful keyboard focus. Avoid competing card sheen, glowing atmosphere, rotating icons, and raised buttons on the same item.

### Project pages `/dev/[slug]`

All six currently put the title, two dates, full stack, and links before the gallery, followed by a short "About" paragraph. The current detail template omits the project's description beneath its title. A first-time visitor consequently encounters implementation metadata before understanding the product.

Use: **name → clear purpose → role/status/context → usable product image → problem → decisions → evidence → limitations/next step**. Put dates and the complete stack in a quiet end note or compact metadata line. Replace the tall four-column metadata strip. Use a coherent image sequence: one establishing view, one close view of the important interaction, one architecture or decision diagram when justified. Every figure should explain something.

| Page | Most useful evidence to add | Visual treatment |
| --- | --- | --- |
| `/dev/orbit` | A complete planning workflow and the reasoning behind combining tasks and notes; show what is actually working. | Lead with a populated workspace or Kanban view rather than the product's marketing homepage. Use an annotated task-to-note sequence. |
| `/dev/wordweb` | How expansion and graph readability work; identify the actual source of word relationships before making claims about it. | Give the graph the largest canvas. Pair a word with a legible small graph; add a focused expansion example. This is the strongest immediate bridge to the language identity. |
| `/dev/picme` | One playable round, configuration choices, and state behavior across modes. | A clue → guess → revealed answer sequence. The elephant landing page is pleasant but does not explain the engineering. |
| `/dev/atomology` | A round with clues, feedback, and mode changes; the game-state decisions. | Use the periodic table and a meaningful answer state rather than an oversized logo screenshot. Keep it clearly a game case study. |
| `/dev/wowcomps` | A real composition decision, buff coverage, expansion differences, and drag/drop constraints. | Show one completed composition with an annotation pointing to the useful consequence. Domain complexity can become attractive visual evidence. |
| `/dev/cabin-chat` | The boundary between shipped behavior and planned authentication/messaging/uploads, plus Go/PostgreSQL/Docker decisions. | Use an honest development-status line and a small deployment/message-flow diagram. Its current body explicitly says features are being wired in phases; the description should not imply all are complete. |

Keep `/portfolio` redirects and `/dev/[slug]` canonicals intact. Do not turn private or unfinished work into apparent public proof. Where outcomes cannot be measured, explain a decision and demonstrate its behavior instead of inventing a metric.

### Writing index `/blog`

The text-led list is appropriate for a small, personal publication. It does not need magazine-scale navigation. Add a visible "Writing" heading and a concise editorial description. Preserve the deliberate featured introduction, but make it a compact "Start here" item rather than the largest repeated card. Give a recent engineering essay more visual emphasis when the goal is AI engineering credibility.

Remove the second boxed sidebar at ordinary widths. Put a short wrapping topic list above the articles so filtering is available on mobile too. Consolidate duplicate terminology such as "Web Dev" and "Web Development". An archive can be a compact disclosure or year label; there are currently six posts in one year.

There is also a source-level filtering issue to address during implementation: the featured post is removed before tags are filtered, so it cannot appear in matching tag results. Filter the complete published set, then decide whether a featured treatment applies. Related posts on detail pages currently take the first three other posts; rank by actual subject relevance instead.

### Articles `/blog/[slug]`

Keep the controlled MDX renderer, heading anchors, mobile TOC, syntax highlighting, figures, and readable body styles. **Figures/captions and related posts already exist in this branch**; some docs describe them as future work. Refine them instead of adding parallel mechanisms.

Align the title, lede, media, and reading column to a consistent axis. Let the media occasionally exceed the reading width for a reason. Put the excerpt beneath the title as a real lede instead of packing it into the date/read-time bar. Reduce the enormous image-first interruption on technical essays, and use a compact diagram or a useful visual summary where appropriate. Make cover images optional in the editorial composition rather than displaying a missing-image frame.

| Article | Specific improvement |
| --- | --- |
| `introductions` | Keep it as an accessible entry point to the person. A real portrait or personal Seoul photograph is more distinctive than a generic scenic cover. Link the transition into engineering to current work. |
| `mechanical-keyboard-obsession` | Use an original labeled photograph of the actual keyboard collection, with a concise comparison. It is a good personal-interest article; it need not be disguised as an AI essay. |
| `verbosity-translating-coding` | This is a strong differentiator. Add a short code comparison with annotations that connect a teaching/translation choice to a code-reading choice. Give its long title more line-height. |
| `cafe-hopping-in-south-korea` | Personal photography and specific captions can provide the atmosphere. Keep this visual voice distinct within the same typography system. |
| `build-real-life-projects` | Replace or supplement the generic workstation cover with a problem → built tool → actual behavior diagram using the projects already discussed. Link directly to the corresponding case-study evidence. |
| `state-of-models-agentic-coding` | The stock "AI" tablet image is the weakest visual match for a technical claim. Use an authored model-routing or review-loop illustration, and distinguish dated observations from repeatable measurements. Add an update note when model-specific claims materially change. |

For code, the current `github-light` highlighting and raw light surface are deliberately consistent but visually abrupt under dark site themes. Either document a stable light code specimen as an intentional exception or add a coherent light/dark syntax pair. The mobile code wrapper's negative margins should be recalibrated against the new frame, rather than assuming the old article gutters.

Do not use image alt text as an automatic visible caption: the current renderer does this. Alternative text and editorial captions serve different purposes. Add a small controlled figure component with separate caption/credit fields, while retaining plain Markdown for simple images.

### Language `/language-services`

The restrained service rows are a good base. Give the page a visible, specific thesis, such as "Korean ↔ English, with technical precision," followed by the actual audiences and deliverables. Add one genuine, publishable before/after editing or translation example. A labeled source/edited pair can use the same paired-representation system as the technical work.

Keep translation and editing expertise substantive. The connection to AI can be an optional capability, not a reframing of every language service. Use real Korean where it communicates, with suitable font coverage and `lang="ko"`; avoid ornamental Hangul or a language switch that does not lead to translated content.

Give each service a short outcome, suitable material, and next step. Condense the experience timeline around a few representative examples; name clients only where that existing public usage is appropriate. End with **Discuss language work**, linking to the existing contact route with harmless contextual prefill if implemented. Remove the full icon rotation; precise hover/focus emphasis is more in character.

### Contact `/contact`

Restore a visible heading and reduce the additional `py-16` offset inside the already padded frame. Make the public email available near the introduction, with the form immediately following. Keep the existing three-field form and honeypot; a portfolio enquiry does not need a booking application.

The 500-character message limit is restrictive for a substantive enquiry. Consider a larger bounded limit, changing both client and server validation together. Optional enquiry buttons can prefill a useful subject without adding required fields. Give success and error states the same typography and spacing care as the initial form; announce them accessibly. Publish a response-time expectation only if it is a commitment William can actually keep.

### Supporting experiences

The default 404 rendered with a black canvas and dark theme text during the review, losing the site's polish. Add a small theme-aware missing-page view, a useful explanation, and links to Projects and Writing. Check the page in both browser color schemes as well as site palettes.

`/card-designs` is already noindex and useful for comparison. Keep it a design tool rather than another public destination. `/font-playground` currently inherits ordinary site metadata and had no robots meta in the observed DOM; apply the same noindex treatment and omit it from public navigation/sitemap. These are refinements to existing experiments, not reasons to build a second design sandbox.

## Implementation shape and order

The current Next.js/Contentlayer/CSS stack is sufficient. No animation framework, CMS migration, WebGL layer, or runtime AI dependency is necessary for this direction. Keep content shaping on the server and pass small interactive examples to client components. Existing CSS modules, controlled MDX components, and static SVG diagrams are enough for the first release.

| Order | Work | Main files | Completion evidence |
| --- | --- | --- | --- |
| Foundation | Fit each template within the sidebar frame; fix mobile galleries; restore visible titles; correct actionable contrast | `SiteFrame.module.css`, `dev/page.tsx`, `ProjectImageSlider.tsx`, `BlogPostView.tsx`, theme palette data | No page-level horizontal scrolling at 320/390/768/1024/1280/1440px; complete gallery images; usable keyboard/focus and reduced-motion states; contrast checked on actual combinations |
| Identity | Establish type scale, spacing, media rules, refined primary light/dark palettes, and a more useful mobile header | Root typography configuration, frame and homepage styles | Cohesive home/work/article/contact views in both primary themes; long titles and Korean specimens fit |
| Proof | Rewrite one flagship case study and create its artifact sequence; curate the homepage | Content sources, schema only where needed, homepage card shaping, project template | Visitor can identify the problem, William's contribution, a technical decision, and demonstrated behavior without leaving the page |
| Signature | Build one small paired-representation interaction and share its visual grammar across article figures and OG images | One focused component plus controlled article components and metadata | Useful initial static rendering; full keyboard/touch access; recorded or real behavior clearly identified; optional interaction does not block reading |
| Release and circulation | Finish contact/404, share images, colophon, RSS placement, launch material, and measurement | Metadata, supporting pages, existing analytics | Valid previews, clear attribution, direct links to useful work, documented release checks |

Do not design all six projects as equally deep case studies before publishing an improved site. First make one excellent example, then extend the pattern where the material supports it. Any new showcase selection must operate on **published content first**; preserve `src/lib/content.ts` as the publication boundary for pages, JSON-LD, RSS, sitemap, and client data.

Documentation cleanup can happen with the implementation: the design-system doc still names earlier fonts and contains old navbar/footer assumptions; `public/fonts/README.md` describes local Bricolage files that the actual layout does not load; one theme instruction points to the deprecated compatibility file. Correct these when the corresponding decision lands, without treating this proposal as an accepted roadmap.

## Making the site worth passing around

Give a visitor one useful object to share, not just a homepage to admire. Good candidates are an interactive explanation of readable AI-generated code, a real model-routing/evaluation case study, or a language-aware interface experiment. Pick a subject where William has evidence and a point of view. Josh Comeau and Bartosz's sites show how a specific explanation can be the thing that earns the link; this is a design inference, not a promise of traffic.

Create a coherent set of 1200×630 share images: clear title, William East, restrained site identifier, and the same project/diagram fragment used on the destination. The root metadata currently falls back to `placeholder.png` and the generic title "BlogFolio". Give the homepage a descriptive personal identity, and give project/article images deliberate composition and dimensions. Next.js provides file-based Open Graph image conventions; implement those with the existing stack rather than adding a design service. [Next.js image metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)

Keep RSS easy to find. Add a brief colophon explaining the type, palette, content system, homelab context where appropriate, and the reasoning behind the interactive artifact. Paco Coursey's emphasis on craft and Maggie Appleton's account of her reusable visual components are particularly useful references for this kind of small, authored site. [Paco](https://paco.me/), [Maggie's colophon](https://maggieappleton.com/colophon)

For launch, prepare one short capture of the signature interaction, a useful technical write-up with a diagram, and links to the source where it is public. Share each piece in the engineering or Korean/English community for which it is actually relevant; use the existing GitHub profile and professional profiles to point to the strongest work. Prefer a specific question or explained decision over a generic "portfolio redesigned" announcement. These are suggested future actions; nothing was posted or submitted during this review.

Treat design-gallery recognition as a later outcome. Compare a finished release against the award's current criteria, test it on real devices, and submit only when the mobile experience, original content, and interaction are equally strong. A visually ambitious homepage alone cannot establish that a site will win an award. Check current terms and fees when deciding to submit. [Awwwards submissions](https://www.awwwards.com/submit/)

Use the existing analytics path to answer practical questions: which case study people open, whether they reach its evidence, whether they visit the live work/source, and whether contact follows. Add only events that inform a real decision. Establish a baseline, then compare over a meaningful period; do not manufacture a target conversion rate without data. For performance, measure a production build rather than inferring speed from the development server. Aim for good Core Web Vitals at the 75th percentile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. [web.dev thresholds](https://web.dev/articles/vitals)

## Review delivery and checks

This review began as a design proposal; its selected first pass and the homepage refinements recorded above have since been implemented on the development branch. No publication, dependency change, contact submission, or award submission was made. Browser viewport and the initially selected theme were restored after inspection.

Required repository checks are recorded below after execution. Passing application checks does not validate a proposed visual design or remove the measured layout issues.

| Check | Result |
| --- | --- |
| `pnpm run validate:content` | Passed: 6 posts and 6 projects |
| `pnpm test --runInBand` | Passed: 28 suites, 151 tests |
| `pnpm run build` | Passed using the branch's existing webpack build; warnings about Windows Contentlayer support and multiple lockfiles/workspace-root inference |
| `pnpm exec tsc --noEmit` | Passed |
| `pnpm run lint` | Passed |

See [primary-source reference notes](./design-reference-research.md) for additional typography, portfolio, accessibility, and discovery references.
