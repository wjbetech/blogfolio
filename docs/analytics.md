# Analytics & KPI Guide

This project uses a privacy-first Plausible setup for page views and CTA tracking.

## Provider

- Provider: Plausible Analytics
- Script: `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC` (defaults to `https://plausible.io/js/script.manual.js`)
- Domain: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- Page views: sent from the root layout on route changes via `AnalyticsProvider`
- Custom events: sent from `trackAnalyticsEvent()` in `src/lib/analytics.ts`

If `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is not set, analytics stays disabled and the helpers no-op locally.

## Tracked events

### Automatic

- `pageview`
  - Sent for every route transition.
  - URL payload is normalized against `https://blogfolio.dev`.

### Custom

- `Project CTA Click`
  - `kind`: `github` or `demo`
  - `slug`: project slug
  - `surface`: `dev_primary`, `dev_secondary`, or `project_card`

- `Contact Click`
  - `surface`: `navbar_desktop`, `navbar_mobile`, `contact_email`, `contact_github`, `contact_linkedin`, `footer_github`, `footer_linkedin`
  - `target`: destination class for quick filtering in reports

## KPI definitions

- Most viewed posts
  - Report: top `pageview` URLs under `/blog/`
  - Cadence: review monthly and compare against the prior 30 days

- Project CTA click-through rate
  - Formula: `Project CTA Click` / page views on `/dev` and `/portfolio`
  - Segment by `kind` to compare GitHub intent vs demo intent

- Contact engagement rate
  - Formula: `Contact Click` / total site page views
  - Monitor `surface` to identify the best contact entry point

## Monthly review ritual

1. Export the top `/blog/` URLs by page views.
2. Compare `Project CTA Click` totals by `kind` and `surface`.
3. Review `Contact Click` totals by `surface`.
4. Identify one stale page to refresh and one high-performing page to amplify.
5. Add follow-up actions to `docs/todo.md` before the next content cycle.