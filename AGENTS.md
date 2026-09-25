# Cedarline workshop working agreement

## Scope
- This is a **FICTIONAL / SYNTHETIC** classroom lab.
- Read `docs/PRD.md`, `docs/CONTEXT_HANDOFF.md`, `docs/EVAL_SPEC.md`, and `README.md` before editing.
- Keep the change to the review-first fixture workflow. Prefer existing files over new abstractions.
- The participant starter is intentionally incomplete only in the review-policy + review-action UI wiring that Lab 2 asks Codex to build.

## Hard boundaries
- Deterministic checked-in fixtures only; no live model or API key.
- No CRM/email/webhook write, stage/probability mutation, production data, authentication, database, RAG, agent, or multi-agent expansion.
- Do not add third-party runtime dependencies without explicit instructor approval.
- Local approval is local state only. Manual continuation must remain available.

## Verification
- Before edits: `npm run baseline` should pass.
- After implementing the lab target: run `npm test`, inspect the diff, and exercise one supported and one unsupported/contradictory UI path.
- Never report a skipped or blocked check as passed.

## Handoff
Report changed files, exact commands/results, skipped checks, assumptions, unresolved defects, and confirmation that no external side-effect path was added.
