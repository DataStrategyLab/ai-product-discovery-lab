# Cedarline Review-First Drafting Slice — PRD

> **FICTIONAL / SYNTHETIC CLASSROOM CASE**

## Customer / context
Sales rep immediately after a customer call. Desired outcome: finish accurate post-call notes and next-action capture with less avoidable rework while preserving human control over consequential records.

## Strongest current alternative
Existing call-recording AI produces transcript/summary/action items; the rep edits them and uses current CRM tools/templates.

## Evidence for this bounded experiment
- Observation inside the fiction: reps already use AI-generated summaries but still verify/edit before recording commitments.
- Counterevidence: the fictional manager opposes automatic stage/probability changes.
- Observation inside the fiction: visible source support affects whether a proposed next action is accepted for review.
- Design choice: narrow from autonomous action to draft-for-review.

## Decision to inform
Is a review-first, source-visible drafting slice technically coherent enough to take into a later real-customer workflow test?

## Approved scope
1. Select a synthetic transcript fixture.
2. Display a draft call note and next action.
3. Show transcript span(s) supporting each material next-action/commitment claim.
4. Allow edit, reject, or approve **locally**; retain a manual continuation path.

## Failure behavior
If a material next action has no visible support, is contradicted by the transcript, or introduces an unsupported commitment, mark it unsupported/contradicted and block local approval until edited/rejected or handled manually.

## Non-goals
- No real CRM write.
- No opportunity-stage/probability mutation.
- No email sending.
- No production customer data.
- No multi-agent orchestration.
- No pricing, adoption, or production rollout logic.

## Acceptance checks
1. Supported fixture shows note + next action + visible source span.
2. Missing/contradictory support is visibly flagged and cannot be approved as supported.
3. User can edit/reject/approve locally or continue manually.
4. No code path in the base lab performs external CRM/email/stage side effects.

## Still unknown
Real customer permission, relative workflow value, correction burden, repeated use, switching, willingness to pay, live-model reliability, production safety, and economics.

## Evidence limit
The classroom can establish only behavior observed on supplied synthetic fixtures once code is actually run. It cannot establish customer demand, adoption, purchasing, retention, or production safety.
