# AI-Native Product Discovery with Codex — Participant Lab

> **FICTIONAL / SYNTHETIC CLASSROOM CASE — NOT CUSTOMER RESEARCH**

This is the participant starter for the **7-minute ChatGPT → PRD handoff**, **11-minute Codex inspect/build/review lab**, and **7-minute test/repair/log lab**. It is intentionally runnable but incomplete in the exact portion participants ask Codex to build.

Canonical public repository: `DataStrategyLab/ai-product-discovery-lab`.

## Get the starter

```bash
git clone https://github.com/DataStrategyLab/ai-product-discovery-lab.git
cd ai-product-discovery-lab
npm ci
npm run baseline
npm start
```

Or use **GitHub → Code → Download ZIP**, unzip it, open the folder in a terminal, then run the same `npm ci`, `npm run baseline`, and `npm start` commands. The Git-based reset command below is available only in a clone with `.git` history.

Open `http://127.0.0.1:4173`.

If port 4173 is occupied:

```bash
PORT=4174 npm start
```

## What is complete at participant start

- Approved `docs/PRD.md`, `docs/CONTEXT_HANDOFF.md`, and `docs/EVAL_SPEC.md`.
- Five labeled synthetic transcript/draft fixtures.
- Fixture loading + integrity validation.
- No-dependency static server and a baseline UI shell that loads transcript/draft fixtures.
- Acceptance tests describing the review policy.
- Safe reset command tied to a checked-in workshop baseline marker.

## What is intentionally incomplete

Lab 2 implements only:

1. `src/review-policy.js`: derive `supported / unsupported / absent / contradicted / empty_input / edited_unverified` and local approval behavior.
2. `src/app.js` + minimal markup as needed: visible source/contradiction spans, derived status, local edit/reject/approve/manual actions, and approval blocking.

The starter therefore has two check levels:

- `npm run baseline` — **must pass before Lab 2**.
- `npm test` — **expected to fail review-policy acceptance tests at the untouched participant start** and should pass only after the approved slice is implemented correctly.

## Stack and verified preparation environment

- Zero-framework browser app.
- Node built-in HTTP server and `node:test`; no third-party packages.
- `package.json` requires Node **>=20**.
- Starter prepared/tested with Node **22.16.0**, npm **10.9.2**, Git **2.47.3**.

These versions document the preparation environment; participants do not need those exact patch versions unless a later rehearsal identifies a compatibility issue.

## Lab 2 — inspect first

Before editing, ask Codex to read:

- `AGENTS.md`
- `docs/PRD.md`
- `docs/CONTEXT_HANDOFF.md`
- `docs/EVAL_SPEC.md`
- this README
- existing `src/` and `tests/`

Approve only the smallest review-policy/UI change. Do not add a framework, live model, API key, CRM/email integration, database, RAG, agent, or multi-agent architecture.

## Lab 3 — checks

After implementation:

```bash
npm test
```

Then exercise at least:

- **Happy — supported action**
- **Unsupported commitment** or **Contradicted action**

Record exact results in `docs/EVAL_LOG.md`. A skipped check is `NOT RUN`, never `PASS`.

## Reset between rehearsals

For a Git clone, the commit that first adds `.workshop-starter-baseline` is the canonical participant starter baseline. Reset only this lab repository with:

```bash
npm run lab:reset
```

The reset script:

- verifies the exact repository root;
- resolves the commit that introduced `.workshop-starter-baseline` as the starter baseline;
- restores tracked files to that commit;
- removes only allow-listed generated lab artifacts (`docs/EVAL_LOG.md`, `.lab-tmp/`);
- never runs an unscoped `git clean -fd`.

**Warning:** `npm run lab:reset` intentionally discards tracked changes made during the lab. Do not use it in a repository containing work you want to keep.

## No-credential / no-integration fallback

The normal route itself requires no credentials. If Codex generation or the local runtime stalls, use the **separate instructor reference package/diff** prepared in the next production step, label it **REFERENCE — NOT PARTICIPANT BUILD**, inspect one supported and one blocked failure path, and mark unexecuted commands `NOT RUN`.

This participant starter intentionally does **not** include the completed instructor solution; including it would defeat the implementation lab.

## Evidence boundary

These fixtures can establish only observed deterministic behavior of this local app on supplied synthetic cases. They do **not** establish live-model quality, customer value/adoption, willingness to pay, commercial viability, or production safety.
