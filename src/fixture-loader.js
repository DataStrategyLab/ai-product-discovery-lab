import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');

export async function loadCaseIndex() {
  return JSON.parse(await readFile(path.join(DATA, 'cases.json'), 'utf8'));
}

export async function loadCase(caseId) {
  const cases = await loadCaseIndex();
  const entry = cases.find((item) => item.id === caseId);
  if (!entry) throw new Error(`Unknown fixture case: ${caseId}`);
  if (entry.synthetic !== true) throw new Error(`${caseId}: fixture must be explicitly labeled synthetic`);

  const [transcript, draftText] = await Promise.all([
    readFile(path.join(DATA, 'transcripts', entry.transcript), 'utf8'),
    readFile(path.join(DATA, 'drafts', entry.draft), 'utf8')
  ]);
  const draft = JSON.parse(draftText);
  validateFixture({ transcript, draft, caseId });
  return { ...entry, transcript, draft };
}

export function validateFixture({ transcript, draft, caseId = 'unknown' }) {
  if (typeof transcript !== 'string') throw new Error(`${caseId}: transcript must be a string`);
  if (!draft || typeof draft !== 'object') throw new Error(`${caseId}: draft must be an object`);
  if (!draft.note || !draft.nextAction || !Array.isArray(draft.sourceSpans)) throw new Error(`${caseId}: missing required draft fields`);
  const spanMap = new Map();
  for (const span of draft.sourceSpans) {
    if (!span?.id || !Number.isInteger(span.start) || !Number.isInteger(span.end) || typeof span.quote !== 'string') throw new Error(`${caseId}: malformed source span`);
    if (!(0 <= span.start && span.start < span.end && span.end <= transcript.length)) throw new Error(`${caseId}: span ${span.id} is out of bounds`);
    if (transcript.slice(span.start, span.end) !== span.quote) throw new Error(`${caseId}: span ${span.id} quote does not match transcript offsets`);
    spanMap.set(span.id, span);
  }
  const referenced = [...(draft.note.supportSpanIds ?? []), ...(draft.nextAction.supportSpanIds ?? []), ...(draft.nextAction.contradictionSpanIds ?? [])];
  for (const id of referenced) if (!spanMap.has(id)) throw new Error(`${caseId}: referenced span ${id} does not exist`);
  return true;
}
