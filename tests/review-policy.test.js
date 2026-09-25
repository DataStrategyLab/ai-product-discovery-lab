import test from 'node:test';
import assert from 'node:assert/strict';
import { loadCase } from '../src/fixture-loader.js';
import { deriveReviewState, attemptLocalApproval, requestExternalWrite } from '../src/review-policy.js';
async function inputFor(caseId,editedText){const loaded=await loadCase(caseId);return{transcript:loaded.transcript,draft:loaded.draft,currentNextActionText:editedText??loaded.draft.nextAction.text}}
test('happy fixture is supported and locally approvable',async()=>{const input=await inputFor('happy');assert.equal(deriveReviewState(input),'supported');assert.deepEqual(attemptLocalApproval(input),{ok:true,state:'approved_local',message:'Approved locally — no external write performed.'})});
test('unsupported commitment blocks local approval',async()=>{const input=await inputFor('unsupported');assert.equal(deriveReviewState(input),'unsupported');assert.equal(attemptLocalApproval(input).ok,false)});
test('absent action does not invent an action and blocks approval',async()=>{const input=await inputFor('absent');assert.equal(deriveReviewState(input),'absent');assert.equal(attemptLocalApproval(input).ok,false)});
test('contradiction blocks approval',async()=>{const input=await inputFor('contradiction');assert.equal(deriveReviewState(input),'contradicted');assert.equal(attemptLocalApproval(input).ok,false)});
test('empty input is not reviewable',async()=>{const input=await inputFor('empty');assert.equal(deriveReviewState(input),'empty_input');assert.equal(attemptLocalApproval(input).ok,false)});
test('editing a supported next action invalidates inherited support',async()=>{const input=await inputFor('happy','Send the security questionnaire next month.');assert.equal(deriveReviewState(input),'edited_unverified');assert.equal(attemptLocalApproval(input).ok,false)});
test('external write boundary is disabled',()=>{assert.throws(()=>requestExternalWrite(),/SIDE_EFFECTS_DISABLED/)});
