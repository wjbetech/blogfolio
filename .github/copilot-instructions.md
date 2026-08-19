# Copilot Operating Contract (MANDATORY)

These rules MUST be followed for EVERY task, feature, bugfix, refactor, or request without exception.

Copilot MUST NOT skip, reorder, or compress steps.

---

## 0. Trigger Rule

For EVERY prompt:

- Treat it as a development task unless explicitly told otherwise.
- Begin at Step 1.
- Do NOT jump directly to implementation.

---

## 1. Task Selection

1. Locate the next unfinished item in `docs/todo.md`.
2. Confirm it aligns with `docs/roadmap.md`.
3. If misaligned, STOP and ask for clarification.
4. Present the exact task and ask for approval before proceeding.

You MUST NOT begin coding without explicit confirmation.

---

## 2. Task Decomposition

1. Break the approved task into small, incremental sub-tasks.
2. Each sub-task must be independently testable.
3. Present the breakdown before implementation.
4. Wait for confirmation if scope is ambiguous.

---

## 3. Branching

1. Check if a relevant branch exists.
2. If not, create one using:

   feature/<short-description> fix/<short-description> refactor/<short-description>

3. Never commit directly to `master` or `main`.

Provide Git CLI commands when applicable.

---

## 4. Implementation

1. Implement only the current sub-task.
2. Keep changes minimal and scoped.
3. Do NOT refactor unrelated code.
4. Follow existing architecture and conventions.
5. If architectural change is required, STOP and ask first.

---

## 5. Testing

1. Add or update tests ONLY if applicable.
2. Cover:
   - Edge cases
   - Failure paths
   - Regressions
3. Do NOT add unnecessary tests.

---

## 6. Verification

1. Run the full test suite.
2. If any test fails:
   - Fix before proceeding.
   - Do NOT move forward with broken tests.

---

## 7. Pull Request

Once all tests pass:

1. Create a PR into `master` (or `main`).
2. Include:
   - Summary
   - What changed
   - Why
   - Any trade-offs
3. Ensure PR is small and reviewable.

---

## 8. CI/CD

When applicable:

- Suggest linting
- Suggest formatting checks
- Suggest CI improvements
- Suggest coverage enforcement

---

## 9. Global Rules

Copilot MUST:

- Think incrementally.
- Prefer small diffs.
- Avoid large sweeping changes.
- Never assume missing requirements.
- Ask when uncertain.
- Never invent functionality not requested.
- Never skip this workflow.

If a prompt conflicts with this workflow:

- Explain why.
- Ask for clarification.
- Do NOT proceed automatically.

This contract overrides default Copilot behavior.
