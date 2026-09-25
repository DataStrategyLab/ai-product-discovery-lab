/**
 * PARTICIPANT LAB TARGET — intentionally incomplete.
 * Implement the deterministic review policy from docs/EVAL_SPEC.md and docs/PRD.md during Lab 2.
 */
export function deriveReviewState(_input) { return 'not_implemented'; }
export function attemptLocalApproval(_input) { return { ok:false, state:'not_implemented', reason:'Participant starter: review policy not implemented yet.' }; }
export function requestExternalWrite() { const error = new Error('SIDE_EFFECTS_DISABLED'); error.code='SIDE_EFFECTS_DISABLED'; throw error; }
