import { execFileSync } from 'node:child_process';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EXPECTED_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE_MARKER = '.workshop-starter-baseline';
const ALLOWLIST = ['docs/EVAL_LOG.md', '.lab-tmp'];

function git(...args) {
  return execFileSync('git', args, { cwd: EXPECTED_ROOT, encoding: 'utf8' }).trim();
}

const actualRoot = path.resolve(git('rev-parse', '--show-toplevel'));
if (actualRoot !== EXPECTED_ROOT) {
  throw new Error(`Refusing reset: expected repo root ${EXPECTED_ROOT}, got ${actualRoot}`);
}

const baselineHistory = git('log', '--diff-filter=A', '--format=%H', '--', BASELINE_MARKER)
  .split(/\s+/)
  .filter(Boolean);
if (baselineHistory.length !== 1) {
  throw new Error(`Refusing reset: expected one commit introducing ${BASELINE_MARKER}, found ${baselineHistory.length}.`);
}
const baseline = baselineHistory[0];

console.log(`Repo: ${actualRoot}`);
console.log(`Baseline marker: ${BASELINE_MARKER}`);
console.log(`Baseline commit: ${baseline}`);
console.log(`Before reset: ${git('status', '--short') || '[clean]'}`);
console.log('WARNING: restoring tracked lab files to the canonical workshop starter commit.');
git('reset', '--hard', baseline);
for (const relative of ALLOWLIST) {
  const target = path.resolve(EXPECTED_ROOT, relative);
  if (!target.startsWith(EXPECTED_ROOT + path.sep)) throw new Error(`Unsafe allowlist path: ${relative}`);
  await rm(target, { recursive: true, force: true });
}
console.log(`After reset: ${git('status', '--short') || '[clean]'}`);
