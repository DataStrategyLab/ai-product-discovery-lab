import test from 'node:test';
import assert from 'node:assert/strict';
import { loadCaseIndex, loadCase, validateFixture } from '../src/fixture-loader.js';
test('every fixture source span matches the canonical transcript slice', async()=>{for(const item of await loadCaseIndex()){const loaded=await loadCase(item.id);assert.equal(validateFixture(loaded),true)}});
test('all support/contradiction references resolve through fixture validation', async()=>{for(const item of await loadCaseIndex()) await assert.doesNotReject(()=>loadCase(item.id))});
