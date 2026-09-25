# EVAL_SPEC.md — Cedarline Deterministic Fixture Checks

> **FICTIONAL / SYNTHETIC CLASSROOM CASE**
> **Execution status:** specified checks are not passes until actually executed against the repository state.

## Purpose
Test deterministic application behavior for the review-first Cedarline slice. This does **not** evaluate a live language model.

Core policy: a material next action may be approved locally only when it has visible, valid supporting transcript span(s), no contradictory span, and has not been edited away from the fixture-supported text. No review action performs an external write.

## Derived states
`empty_input`, `absent`, `contradicted`, `unsupported`, `supported`, `edited_unverified`.

Suggested precedence:
1. empty/invalid transcript → `empty_input`
2. blank next-action text → `absent`
3. edited next action differs from loaded fixture → `edited_unverified`
4. valid contradiction span exists → `contradicted`
5. material/commitment action with no valid support → `unsupported`
6. otherwise, with >=1 valid support span → `supported`

`Approve locally` is enabled only for `supported`; all other states must remain blocked.

## Required cases
| Case | Expected behavior |
|---|---|
| Happy | Note + next action render; support span visible; state `supported`; local approval succeeds; receipt says no external write. |
| Unsupported commitment | Label unsupported; no supporting span; local approval blocked; reject/edit/manual continuation available. |
| Absent action | Show `No supported next action`; do not invent an action; approval blocked; manual route available. |
| Contradiction | Label contradicted; contradiction span visible; approval blocked; reject/edit/manual route available. |
| Empty input | Clear validation state; no reviewable action; approval unavailable; app does not crash. |
| Attempted external write | Supported local approval still performs zero external writes; external-write boundary returns/throws `SIDE_EFFECTS_DISABLED` or equivalent. |

## Cross-cutting checks
- Unsupported, absent, contradicted, empty, and edited-unverified states can never transition to `approved_local`.
- Editing a supported next action invalidates inherited support.
- Missing span IDs and mismatched quote/offset pairs fail fixture validation.
- Base code has no configured CRM/email/webhook client.

## Commands
Before Lab 2:
```bash
npm run baseline
```
After Lab 2 implementation:
```bash
npm test
```

## Participant path
Within Lab 3, manually inspect one supported case and one meaningful failure case. The automated suite covers all required cases.

## Evidence boundary
These checks can establish deterministic state transitions, fixture integrity, visible span linkage, approval blocking rules, local review actions, and absence of an exercised external-write path in checked behavior.

They cannot establish live-model semantic accuracy, hallucination frequency, latency/cost, generalization to real transcripts, customer value/adoption, commercial viability, or production safety.

## Release rule
A case may be marked **PASS** only after its specified automated/manual check is actually executed against that repository state. Otherwise status is **NOT RUN**.
