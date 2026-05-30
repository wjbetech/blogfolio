# Maintenance

Routine tasks to keep blogfolio healthy, accurate, and up to date.

---

## Monthly sweep (automated reminder)

A GitHub Actions workflow runs on the 1st of every month and opens a GitHub Issue on this repository. GitHub emails you a notification for new issues automatically, so you don't need to remember — the reminder comes to your inbox.

**Workflow file:** `.github/workflows/monthly-maintenance.yml` (to create in Phase B)

```yaml
# .github/workflows/monthly-maintenance.yml  (target -- not yet written)
name: Monthly maintenance reminder

on:
  schedule:
    - cron: "0 9 1 * *" # 09:00 UTC on the 1st of every month

jobs:
  remind:
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: Open maintenance issue
        uses: actions/github-script@v7
        with:
          script: |
            const { data: issue } = await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `🗓️ Monthly maintenance sweep — ${new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}`,
              body: [
                "## Monthly maintenance checklist",
                "",
                "Work through each item and check it off.",
                "",
                "### Content",
                "- [ ] Review `docs/todo.md` — are all items still accurate?",
                "- [ ] Check for any draft posts or projects that are ready to publish",
                "- [ ] Update `updatedAt` on any posts that received meaningful edits",
                "",
                "### Dependencies",
                "- [ ] Run `npm outdated` — note any major version bumps",
                "- [ ] Run `npm audit` — fix any high/critical vulnerabilities",
                "- [ ] Check for a new Contentlayer release (known issue: stuck on 0.3.x)",
                "",
                "### SEO & health",
                "- [ ] Open `https://williameast.com/sitemap.xml` — verify no 404s in the list",
                "- [ ] Check Google Search Console for crawl errors (once site is live)",
                "- [ ] Confirm `robots.txt` and RSS feed resolve correctly",
                "",
                "### Docs",
                "- [ ] Scan `docs/` — is anything stale or inaccurate after this month's changes?",
                "- [ ] Update `docs/roadmap.md` if any Phase items were completed",
                "",
                "### Hosting (once live)",
                "- [ ] Check homelab uptime / Cloudflare Tunnel health",
                "- [ ] Review disk usage in `public/images/` — remove unused assets",
                "",
                "Close this issue when done.",
              ].join("\\n"),
              labels: ["maintenance"]
            });
            console.log(`Created issue #${issue.number}: ${issue.html_url}`);
```

**Setup required (one-time):**

1. Create a `maintenance` label on the GitHub repo (Settings → Labels → New label → name: `maintenance`, colour of your choice)
2. GitHub notifications for new issues must be enabled on your account (GitHub → Settings → Notifications → Issues → check "Email")

After that, no further setup is needed. The workflow runs automatically.

---

## Changelog flow

Every commit pushed to `master` is processed by the `update-changelog.yml` workflow, which appends an entry to `changelog/entries.json`. This file powers the changelog sidebar on the `/dev` page.

**You don't need to manually update the changelog.** Just write good commit messages.

Commit message conventions for clear changelog entries:

| Prefix      | Meaning                               |
| ----------- | ------------------------------------- |
| `feat:`     | New feature or page                   |
| `fix:`      | Bug fix                               |
| `docs:`     | Documentation changes                 |
| `chore:`    | Tooling, config, dependencies         |
| `refactor:` | Code restructure, no behaviour change |
| `style:`    | Visual / CSS tweaks                   |
| `content:`  | New or updated blog post / project    |

Example: `content: publish post "Cafe Hopping in South Korea"`

---

## Dependency updates

Do not update dependencies mid-feature. Do it on a dedicated branch:

```bash
git checkout master
git pull
git checkout -b chore/dependency-updates-YYYY-MM
npm outdated          # see what's behind
npm update            # update within semver ranges
npm audit fix         # fix known vulnerabilities
npm run ci            # validate + test + build must pass before committing
git add package.json package-lock.json
git commit -m "chore: update dependencies YYYY-MM"
```

**Known constraint:** Contentlayer is currently stuck at `0.3.x`. Do not attempt to upgrade it until the ecosystem catches up with Next.js App Router / React 19. Watch [contentlayerdev/contentlayer](https://github.com/contentlayerdev/contentlayer) for release notes.

---

## Docs audit

Run this whenever a significant code change is made:

1. Open `docs/architecture.md` — are all routes still accurate?
2. Open `docs/content.md` — does the frontmatter schema match `contentlayer.config.ts`?
3. Open `docs/seo.md` — are all "gaps to fix" items still open, or have some been resolved?
4. Open `docs/roadmap.md` — mark any newly completed items as done

The monthly issue checklist includes a docs review item as a reminder.

---

## Image housekeeping

Over time `public/images/` will accumulate unused assets. Periodically:

```bash
# Find all image paths referenced in content frontmatter
grep -r "images:" content/ | grep -oP '(?<=- ).*'

# Compare against files in public/images/
# Delete anything in public/images/ that isn't referenced in content/
```

The content validation script (`npm run validate:content`) catches the opposite problem (frontmatter references a file that doesn't exist) but does not catch orphaned files.
