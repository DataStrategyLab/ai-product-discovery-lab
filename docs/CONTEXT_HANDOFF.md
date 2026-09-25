# CONTEXT_HANDOFF.md — Cedarline Review-First Lab

> **FICTIONAL / SYNTHETIC CLASSROOM CASE**

## Objective
Implement/inspect the smallest local review-first slice that displays a source-supported call note and next action from synthetic fixtures and preserves a human approval boundary.

## Decision to inform
Whether this bounded slice is technically coherent enough to support a later real-customer workflow experiment.

## Established for this classroom story
- Reps already use call-recording/CRM AI and still review/edit outputs.
- A fictional manager opposes automatic stage/probability changes.
- A fictional reviewer treats visible transcript support as important for a proposed next action.
- Review-first local behavior is the approved teaching scope.

## Strongest alternative
Existing call-recording AI + CRM features/templates + human verification/editing.

## Still unknown
Real customer permission/value, prevalence, repeated use, switching, purchase, correction burden, production reliability, safety, and economics.

## Approved scope / non-goals
Scope: synthetic transcript → note + next-action draft → visible support → edit/reject/approve locally → manual continuation.

Non-goals: no live CRM/email side effects; no stage/probability mutation; no production data; no multi-agent system.

## Local repository state
- Relevant files: `AGENTS.md`, `docs/PRD.md`, `docs/CONTEXT_HANDOFF.md`, `docs/EVAL_SPEC.md`, `src/`, `tests/`.
- Baseline check: `npm run baseline`.
- Target check after Lab 2: `npm test`.

## Evaluation
Core classroom paths: one supported next-action fixture and one missing/unsupported/contradictory-support fixture. These fixtures do not estimate live-model error rate, latency, cost, adoption, willingness to pay, or production safety.

## Permission boundary
No live CRM write or sending. Approval is local/simulated only.

## Next action in Codex
Read the lab files and inspect the starter repository without editing. Return the smallest end-to-end change, likely files, checks to run, and any blocker that would change the approved scope.

## Stop or ask when
Stop if implementation would require an external side effect, production credentials/data, stage/probability mutation, multi-agent expansion, or a scope change not supported by the approved PRD.
