# Design reference research

Research date: 24 October 2026. Companion to [the development-branch design review](./design-review-2026-10-24.md).

The source of truth for the site review is the development server at `http://127.0.0.1:4181`, served from `work/home-card-designs`, branch `feat/home-sidebar-redesign`, reviewed at commit `b5b27b8`. These notes supply external references and design recommendations; they make no observations about production layout. Current typography is verified in `src/app/layout.tsx`: Space Grotesk headings, IBM Plex Sans body, Geist Mono utilities. Earlier documentation naming Inter/Bricolage is stale.

## Relevant examples

| Primary source | What the source establishes | Application to Blogfolio (design judgment) |
| --- | --- | --- |
| [Paco Coursey: Redesign 2021](https://paco.me/writing/redesign-2021) | Coursey explicitly chose simplicity, performance, typography, and craft, and discusses the maintenance cost of elaborate personal-site concepts. | Raise quality through composition, typography, content, and exact interaction states. A memorable portfolio does not require a simulated operating system or heavy presentation framework. |
| [Maggie Appleton: Colophon](https://maggieappleton.com/colophon) | Appleton documents a fluid type scale, reusable MDX components, illustrations, callouts, and mostly CSS animation. Her site deliberately supports unfinished public notes. | Borrow the controlled component system and authored visual explanations. Keep Blogfolio's different publication policy: drafts remain private; do not copy the public unfinished-note model. |
| [Bartosz Ciechanowski: Mechanical Watch](https://ciechanow.ski/mechanical-watch/) | The explanation uses manipulable diagrams, sliders, consistent component colors, and a global animation pause control. | Make one flagship AI project understandable through an explanatory artifact: inspect retrieval evidence, compare an evaluation failure and repair, or step through a real inference pipeline. Keep controls and a readable static explanation. |
| [Josh W. Comeau: CSS Transitions](https://www.joshwcomeau.com/animation/css-transitions/) | The article teaches timing and interaction through live examples, discusses animation performance and motion preferences, and recommends explicitly naming transitioned properties. | Use motion to explain a state change or demonstrate engineering care. Start with small CSS transitions on project focus, disclosure, and controls; establish reduced-motion behavior before adding elaborate choreography. |

These are references for mechanisms and editorial decisions, not a claim that their visual styles should be reproduced. The proposed synthesis is a precise engineering publication with a few individually art-directed demonstrations.

## Typography and color direction

Keep the current three-family pairing for the first design pass. Hierarchy, width, line breaks, and spacing are more pressing than buying or adding fonts. Space Grotesk can supply identity; IBM Plex Sans can sustain reading; Geist Mono should remain selective. This is a recommendation based on the verified development implementation, not an external performance finding.

Useful alternatives if testing later exposes a specific need:

- [Instrument Sans, official repository](https://github.com/Instrument/instrument-sans): an open-source variable family with width, weight, italics, and stylistic alternatives. A candidate for a more neutral editorial heading system, tested against the same real titles and mobile widths.
- [IBM Plex, official repository](https://github.com/IBM/plex): an OFL family spanning Sans, Serif, Mono, and Sans Condensed. A coherent option if a future design needs a related editorial serif or condensed index treatment.
- [Commit Mono, official specimen](https://commitmono.com/): customizable programming type with a web-font option and variable source files. Consider only if technical annotation becomes a central brand feature; the existing Geist Mono already serves that role.

Color direction is a design proposal: one carefully resolved default light palette and one dark palette, each with a restrained signal color, plus optional personal themes. Separate decorative accent surfaces from text and control tokens so an attractive pale accent does not become unreadable metadata or button text.

## Quality requirements for the redesign

- **Readable color:** WCAG 2.2 AA requires at least 4.5:1 for ordinary text and 3:1 for qualifying large text, with specified exceptions. Validate actual foreground/background pairs across themes and interaction states; decorative palette swatches alone cannot demonstrate compliance. [W3C: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- **Controlled motion:** WCAG's Animation from Interactions criterion is Level AAA and allows disabling nonessential interaction-triggered animation. Supporting `prefers-reduced-motion` is an appropriate baseline design choice; it should not be misrepresented as a complete AA audit. [W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- **Measured performance:** Google's good Core Web Vitals thresholds are LCP at most 2.5 seconds, INP at most 200 ms, and CLS at most 0.1, assessed at the 75th percentile and segmented by mobile/desktop. These are acceptance goals for a redesigned site, not measured results for this checkout. Reserve dimensions for media and load optional interactive demonstrations deliberately. [Google: Web Vitals](https://web.dev/articles/vitals)
- **Useful sharing previews:** Open Graph defines title, type, image, and canonical URL metadata, plus image dimensions and alternative text. Next.js supports route-specific static and generated Open Graph/Twitter images. Design one recognizable template with a meaningful project diagram or result, a short title, and William's identity; ensure generated images use the existing published-content boundary. The recognizable template is a design inference, not a guarantee of higher engagement. [Open Graph protocol](https://ogp.me/), [Next.js image metadata conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)

## Recognition and distribution

Prioritize an artifact another engineer can use or explain: a small open-source demo, a concrete evaluation comparison, a reproducible experiment, or an unusually clear technical visual. Publish the substantial case study, a short demonstration clip, and a linked source repository together. This distribution strategy is a recommendation inferred from the explanation-led references above; no traffic or hiring result is guaranteed.

Use gallery submission as a later distribution experiment after responsive, accessibility, and performance review. Awwwards' current submission page lists a standard submission at EUR 65 for one site and describes its award categories and visibility offering. An entry purchases consideration, not an award or a predictable business outcome. [Awwwards: Submit your website](https://www.awwwards.com/submit/)

The Awwwards evaluation page could not be retrieved reliably during this research. Accordingly these notes do not assert current jury weights, score thresholds, or a formula for winning. Awards are a useful ambition; the practical goal remains a persuasive, distinctive portfolio that converts the right visitors.
