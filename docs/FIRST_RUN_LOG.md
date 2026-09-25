# FIRST_RUN_LOG — Cedarline participant starter

**Checked:** 2026-09-24 in the build environment used to prepare this starter.

| Check | Observed result | Status |
|---|---|---|
| `npm ci --ignore-scripts` | 1 package audited; 0 vulnerabilities; no third-party packages | PASS |
| `npm run baseline` | 5 tests passed; 0 failed | PASS |
| untouched `npm test` | 12 total: 6 pass, 6 fail on intentionally unimplemented review-policy cases | EXPECTED INCOMPLETE |
| local HTTP start | server started and root/fixture endpoints returned HTTP 200 | PASS |
| reset rehearsal | tracked edit restored and allow-listed eval log removed | PASS |

Environment observed: Node 22.16.0, npm 10.9.2, Git 2.47.3.

Not established: no human-timed 11-minute Codex rehearsal, instructor reference solution, account navigation rehearsal, or external CRM/email/Linear/model integration was executed in this C1 step.
