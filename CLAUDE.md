# CLAUDE.md — Working agreement for Kathmandu Lens

> **Status:** DRAFT v0.1 (authored by Claude Code from the Phase 1 task message). Review and edit before any Phase 1 code is written. This file binds Claude's behaviour in this repo. The product brief is `docs/BRIEF.md` — read it first.

## 1. How to read this file

Everything in §3 is a **hard rule**. Breaking one is grounds for reverting the commit. Everything in §4 is a **convention** — break it only with a written reason in the commit message.

## 2. The two source-of-truth documents

1. `docs/BRIEF.md` — product, visual identity, engineering scope, phasing. The brief is the spec.
2. `CLAUDE.md` (this file) — how Claude works on this repo. Day-to-day operations.

When the brief and this file disagree, the brief wins. Surface the conflict; do not silently choose.

## 3. Hard rules

### 3.1 Stop before guessing

If a value referenced by the task isn't in the brief or codebase — palette, dependency version, copy text, file location — STOP and ASK. Never invent.

### 3.2 No silent dependency adds

Adding any package not in `BRIEF.md §9.2` requires explicit human approval in chat. This includes transitive package upgrades that change a major version, devDependencies, and "just for this commit" experiments.

### 3.3 No folder restructuring without approval

`BRIEF.md §9.1` is the source of truth for layout. Adding a new top-level folder, renaming an existing one, or moving a feature requires explicit approval.

### 3.4 No edits to `docs/BRIEF.md`

Claude does not edit the brief. The brief is edited by the human. Claude may *suggest* edits via PR comments only.

### 3.5 No hardcoded user-visible strings

Every string a user can read goes through `useTranslation()` or `i18next.t()`. Including placeholders, dev-only labels, and accessibility labels. The exception list is empty.

### 3.6 TypeScript discipline

- `strict: true` plus the flags listed in `BRIEF.md §9.3`. No relaxing them.
- No `any`. No `as any`. No `as unknown as Foo`.
- No `@ts-ignore`. `@ts-expect-error` is allowed only with a comment that links a GitHub issue.
- No `!` non-null assertions in production code. Tests may use `!` on values the test obviously controls.

### 3.7 Don't expand scope

A bug fix doesn't ship surrounding cleanup. A one-shot operation doesn't ship a helper. A task in Phase N doesn't pull forward Phase N+1 work. If you spot something worth fixing, write a TODO comment with a date and your initials, or open an issue — don't sneak it in.

### 3.8 Don't bypass safety

Never `--no-verify`, `--no-gpg-sign`, `git push --force` (force-with-lease only on personal branches, and only when explicitly asked), `rm -rf` outside the working directory, `git reset --hard`, `git clean -fd`. If a hook fails, fix the hook's complaint; don't skip it.

### 3.9 Env vars must no-op when absent

Any code path that reads an env var (`EXPO_PUBLIC_*`) MUST run cleanly when the var is undefined. The app must boot in dev with no `.env` file. Sentry/PostHog initialise to no-op stubs in that case.

### 3.10 Cultural posture

- The Kumari is never depicted in app imagery, screenshots, or test fixtures.
- Any copy describing living religious practice is reviewed by a native speaker before merge. Stub `[NE]`-prefixed strings are acceptable for development; they MUST be flagged in the changelog as "translation pending."
- No "playful" or "jokey" tone in cultural copy. Period.

## 4. Conventions

### 4.1 Commits

- One concern per commit. Phase 1 ships in nine commits as listed in the Phase 1 task brief: (a) bootstrap + tooling, (b) theme + fonts, (c) i18n, (d) storage + query, (e) observability, (f) app shell + tabs, (g) etiquette primer, (h) tests + Maestro, (i) docs + CI.
- Subject line: `<area>: <imperative summary>` (e.g. `theme: add unistyles tokens`).
- Body explains *why*, not *what*. The diff explains *what*.
- Every commit ends with the Claude trailer:
  ```
  https://claude.ai/code/session_01SEQyBo4RAaYABZvkThXbxv
  ```

### 4.2 Branches & PRs

- Develop on the branch named in the task. For Phase 1: `claude/kathmandu-lens-phase-1-wLXZ8`.
- Never push to `main` without explicit permission. (`main` may not exist yet — that's expected.)
- After pushing, open a draft PR if one doesn't exist (per harness rules). PR description follows the template in §4.3.
- Run `pnpm typecheck && pnpm test` after every commit before pushing. If anything is red, fix it before moving on.

### 4.3 PR template

```
## Summary
<2–3 bullets on what changed and why>

## Phase
Phase <N> — <name>. Brief: docs/BRIEF.md §<section>.

## Verification
- [ ] pnpm typecheck
- [ ] pnpm lint
- [ ] pnpm test (coverage: <X>% on src/lib, <Y>% on src/theme)
- [ ] npx expo-doctor
- [ ] Maestro smoke (iOS sim) — if applicable
- [ ] Manual smoke on iOS sim and Android emulator — if applicable

## Cultural review
- [ ] N/A
- [ ] Pending — strings affected: <list>
- [ ] Reviewed by <advisor name>

## Out of scope
<what you explicitly did not change>
```

### 4.4 Code style

- Biome handles lint + format. Run `pnpm format` before commit; lefthook enforces it.
- Imports: absolute via `@/` (src) and `@app/` (routes) per `tsconfig`. No `../../..` once you cross a feature boundary.
- File naming: `kebab-case.ts` for libs and modules; `PascalCase.tsx` for components; `useCamelCase.ts` for hooks. Tests are `<file>.test.ts(x)` next to the source.
- Barrel files (`index.ts`) only at folder boundaries listed in `BRIEF.md §9.1`. No deep barrels.
- No default exports except for `expo-router` route files (which require them).
- One component per file unless the helpers are < 20 lines and only used by that component.

### 4.5 Comments

Default to none. Write a comment only when the *why* is non-obvious — a hidden constraint, a workaround, an invariant a future reader would otherwise miss. Never explain *what* the code does. Never reference task IDs, PRs, or "added for X." Those go in the commit message.

### 4.6 Tests

- Jest + React Native Testing Library.
- Every public function in `src/lib` has a unit test.
- Every theme token resolves in all three themes (driven by a single test that walks the token tree).
- i18n: a test fails if `en` and `ne` keysets diverge or if any orphan keys are unused.
- Coverage targets are listed per phase in the task brief. Phase 1: ≥ 70 % on `src/lib` and `src/theme`.
- No flaky tests. If a test is flaky, fix the test or fix the code; do not retry-loop.

### 4.7 Tooling versions

- Node: per `.nvmrc`. Phase 1 starts on the latest LTS that Expo SDK 54 supports. `TODO(human): pin exact Node version once SDK 54 final patch is selected.`
- Package manager: pnpm only. No npm, no yarn, no bun.
- The CI workflow uses the same Node and pnpm versions as `.nvmrc` and `packageManager`.

### 4.8 Plan-then-execute

For any task spanning more than one file, Claude produces a written plan in chat first and waits for approval. The plan lists every file to be created or modified with a one-line purpose each. No code is written until the user replies "approved" (or equivalent).

### 4.9 One commit at a time

Within a phase, Claude commits incrementally as listed in §4.1. After each commit, Claude runs typecheck and tests and reports results before starting the next commit.

### 4.10 Asking the user

Claude uses the AskUserQuestion tool sparingly. A good question:

- batches related decisions into one prompt
- offers 2–4 options with one clearly recommended
- includes enough context that the user doesn't have to scroll back

Bad questions: "is this OK?", "should I proceed?", "should I run tests?" — those are decided by the rules in this file.

## 5. Definition of Done

See `docs/BRIEF.md §12`. A phase is not done until every box is ticked. Claim "done" only when every box is genuinely ticked — no half-ticks.

## 6. Exit criteria for this draft

Before any Phase 1 code is written, the human:

1. Reviews `docs/BRIEF.md` and resolves every `TODO(human)` block, OR explicitly defers each with a tracking note.
2. Reviews this file and edits any conventions that don't match preference.
3. Replies "approved — proceed to Phase 1 plan" in chat.

Then Claude produces the Phase 1 implementation plan (file-by-file) and waits again before writing code.
