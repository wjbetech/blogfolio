# Todo Execution Guidelines

This document explains the playbook for completing the outstanding items in [docs/todo.md](./todo.md). The goal is to stay autonomous: pick the next unchecked item, run through the scripted workflow, and open a PR that can auto-merge once the checks pass. Follow the numbered steps below for every todo entry.

1. **Locate and verify the next todo.**
   - Open [docs/todo.md](./todo.md) and find the first unchecked checkbox. Treat the list as ordered priority; you should never skip to a lower section unless higher ones are complete.
   - Confirm alignment with the corresponding phase in [docs/roadmap.md](./roadmap.md). If the todo spans phases (e.g., a Contentlayer task that touches UI), mention both sections in your notes.

2. **Decide on the scope.**
   - Decide whether the todo is small enough to ship in one commit or if it needs multiple sub-tasks. If you split it, aim for no more than three incremental subtasks—each should have its own branch/PR if needed, but keep the big-picture todo item in mind.
   - Document the planned subtasks in the PR description so reviewers know what to expect.

3. **Create a branch.**
   - Always start from a clean `master` (fetch/pull first). Branch naming should follow the policy: `feature/<short-name>` for new work, `fix/<short-name>` for bug fixes, and `refactor/<short-name>` for rework or cleanup tasks.
   - Include the todo reference in the branch name when helpful (e.g., `feature/content-ops-guidelines` for C1 work).

4. **Implement the todo.**
   - Make the code, docs, asset, or content updates required by the item. Keep the diff focused; if the change affects UX, include reasoning for design/behavior updates inline (e.g., as comments or PR bullet points).
   - When a todo mentions documentation or proof, update the relevant docs directory and/or include screenshots or test output in your PR.

5. **Add or update tests.**
   - Add tests for new logic or regressions. For Contentlayer work, rerun `npm run contentlayer:generate` whenever schema/frontmatter changes, then run the Jest suites that cover the affected area (e.g., `npm run test -- __tests__/content/posts.test.ts`).
   - For UI-only or docs-only tasks, tests may not be necessary, but consider running `npm run lint` if any code files changed.

6. **Run verification commands.**
   - Run the relevant commands (`npm run test`, `npm run lint`, `npm run contentlayer:generate`, `npm run dev`, etc.) and capture their success so you can list them in the PR template.
   - Document the commands you ran under the “Testing” section of the PR.

7. **Open an auto-merging PR.**
   - Use the standard PR template and reference the todo item(s). Include the tests that were executed, mention any Contentlayer rebuilds, and explain any user-facing changes.
   - Tag the PR with the relevant roadmap phase (e.g., Contentlayer, Editorial Workflow) so it is traceable.

8. **Close the loop in the todo list.**
   - After the PR merges, update [docs/todo.md](./todo.md) by checking off the completed item and adding a short note containing the PR number and proof (tests run, screenshot location, etc.).
   - If you split the todo into sub-items, only mark the top-level checkbox complete when all related PRs are merged.

9. **Repeat.**
   - Return to step 1 and start again with the next unchecked item. Keep an eye on [docs/roadmap.md](./roadmap.md) for priority shifts or newly added items.

By following this guide, future work on the todo list becomes a predictable sequence: inspect, branch, build, verify, open a PR, and update the checklist. Let me know when you’d like me to start on the next unchecked checkbox (C1).
