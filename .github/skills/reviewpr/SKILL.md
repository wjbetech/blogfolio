---
name: reviewpr
description: "Analyze the Copilot review on the current open PR, fix valid issues, ignore or defer invalid ones, commit all fixes in one go, and report a summary back. Use when: reviewing PR, fix review comments, address copilot feedback, /reviewpr."
argument-hint: "optional PR number (defaults to current branch PR)"
---

# Review PR Skill

Analyze the GitHub Copilot review on the current open PR, apply valid fixes,
and produce a clean follow-up commit with a brief human-readable summary.

## When to Use

- User types `/reviewpr` or asks to "analyze the copilot review"
- After a PR is opened and Copilot has posted review comments
- To batch-address all review feedback in one pass before asking the user to re-review

## Procedure

### 1. Identify the PR

- If a PR number is provided as an argument, use that.
- Otherwise, check `git branch --show-current` to get the active branch,
  then find the open PR for that branch via GitHub tools.

### 2. Fetch all review threads

- Use `github-pull_request_read` with `method: "get_review_comments"` to retrieve
  all review threads on the PR.
- Ignore threads where `is_outdated: true` — the code has already moved past them.
- Focus only on threads where `is_resolved: false` and `is_outdated: false`.

### 3. Triage each comment

For each unresolved, non-outdated comment, classify it as one of:

| Decision | Criteria |
|----------|----------|
| **Fix** | Valid bug, invalid HTML, accessibility issue, logic error, or security concern |
| **Ignore** | Style preference, contradicts `docs/design-system.md` or `docs/roadmap.md`, or conflicts with the established architecture in `docs/architecture.md` |
| **Defer** | Valid but out of scope for this PR (belongs in a future branch per `docs/todo.md`) |

When in doubt, cross-reference `docs/` before deciding.
Do NOT make changes to the color system, theme tokens, or anything in `docs/design-system.md` marked as intentional.

### 4. Apply all "Fix" changes

- Make all fixes in the working tree on the current branch.
- Run `npm run build` (or `cmd /c "node_modules\.bin\next.cmd build"` on Windows) to confirm no regressions.
- Run `npm test` (or `cmd /c "node_modules\.bin\jest.cmd --no-coverage"` on Windows) to confirm all tests pass.
- If a fix breaks a test, update the test if the new behavior is correct, or reconsider the fix.

### 5. Resolve all threads

- For every thread actioned (Fixed, Ignored, or Deferred), call
  `github-pull_request_review_write` with `method: "resolve_thread"` to mark it resolved.
- Do this for ALL threads — do not leave outdated or ignored ones open.

### 6. Commit and push

- Stage only the files that were changed by the fixes.
- Commit with a message in the format:
  ```
  fix(<scope>): address PR review comments

  <bullet list of what was fixed>

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
  ```
- Push to the current branch.

### 7. Report summary to user

Reply with a compact table:

| # | Comment (short) | Decision | Reason |
|---|-----------------|----------|--------|
| 1 | Brief description | ✅ Fixed | one-line explanation |
| 2 | Brief description | ⏭️ Deferred | belongs in fix/xyz |
| 3 | Brief description | 🚫 Ignored | conflicts with design-system.md |

Then state: "Build ✅ · N/N tests pass · All threads resolved. PR is ready for your re-review."

## Key Rules

- Never change the color theme system or token names.
- Never refactor code outside the scope of the review comments.
- Always check `docs/` before overriding a Copilot suggestion.
- If all threads were already outdated/resolved, say so and skip the commit step.
