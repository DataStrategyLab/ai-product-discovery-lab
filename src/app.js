const select = document.querySelector('#case-select');
const transcriptEl = document.querySelector('#transcript');
const noteEl = document.querySelector('#note');
const nextActionEl = document.querySelector('#next-action');
const statusEl = document.querySelector('#load-status');

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function getText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
}

async function loadEntry(entry) {
  statusEl.textContent = `Loaded ${entry.label}`;
  const [transcript, draft] = await Promise.all([
    getText(`/data/transcripts/${entry.transcript}`),
    getJson(`/data/drafts/${entry.draft}`)
  ]);
  transcriptEl.textContent = transcript || '[empty transcript fixture]';
  noteEl.value = draft.note?.text ?? '';
  nextActionEl.value = draft.nextAction?.text ?? '';

  // LAB 2 TARGET:
  // - import/use src/review-policy.js
  // - render visible support/contradiction chips and exact transcript highlighting
  // - derive supported/unsupported/absent/contradicted/empty/edited-unverified state
  // - wire Edit/Save, Reject, Approve locally, Continue manually
  // - keep approval local and blocked unless state is supported
}

async function boot() {
  try {
    const cases = await getJson('/data/cases.json');
    for (const entry of cases) {
      const option = document.createElement('option');
      option.value = entry.id;
      option.textContent = entry.label;
      select.append(option);
    }
    select.addEventListener('change', () => loadEntry(cases.find((item) => item.id === select.value)));
    await loadEntry(cases[0]);
  } catch (error) {
    statusEl.textContent = `Baseline load failed: ${error.message}`;
  }
}

boot();
