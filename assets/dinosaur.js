import {
  STORAGE_KEY,
  defaultState,
  normalizeState,
  pickQuote,
  pickSpanishWord,
  buildDinnerPlan,
  summarizePropertyWatch,
  checklistProgress,
  focusLabel,
} from './dinosaur-state.js';

let state = loadState();

const elements = {
  date: document.getElementById('dino-date'),
  quote: document.getElementById('dino-quote'),
  spanishWord: document.getElementById('dino-spanish-word'),
  spanishMeaning: document.getElementById('dino-spanish-meaning'),
  spanishUsage: document.getElementById('dino-spanish-usage'),
  dinnerTitle: document.getElementById('dino-dinner-title'),
  dinnerDescription: document.getElementById('dino-dinner-description'),
  dinnerList: document.getElementById('dino-dinner-list'),
  rentalSummary: document.getElementById('dino-rental-summary'),
  meta: document.getElementById('dinosaur-meta'),
  checklist: document.getElementById('dino-checklist'),
  dinnerTimeDisplay: document.getElementById('dino-dinner-time-display'),
  focusDisplay: document.getElementById('dino-focus-display'),
  checklistProgress: document.getElementById('dino-checklist-progress'),
  propertySummaryShort: document.getElementById('dino-property-summary-short'),
  notePreview: document.getElementById('dino-note-preview'),
  dinnerForm: document.getElementById('dino-dinner-form'),
  propertyForm: document.getElementById('dino-property-form'),
  noteForm: document.getElementById('dino-note-form'),
  refreshSpanishButton: document.getElementById('dino-refresh-spanish'),
  resetDinnerButton: document.getElementById('dino-reset-dinner'),
  resetChecklistButton: document.getElementById('dino-reset-checklist'),
  dinnerInput: document.getElementById('dino-dinner-input'),
  dinnerSidesInput: document.getElementById('dino-dinner-sides-input'),
  dinnerTimeInput: document.getElementById('dino-dinner-time-input'),
  propertyAreaInput: document.getElementById('dino-property-area-input'),
  propertyBudgetInput: document.getElementById('dino-property-budget-input'),
  propertyModeInput: document.getElementById('dino-property-mode-input'),
  propertyNotesInput: document.getElementById('dino-property-notes-input'),
  noteInput: document.getElementById('dino-note-input'),
  focusInput: document.getElementById('dino-focus-input'),
};

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return normalizeState(defaultState());
    return normalizeState(JSON.parse(raw));
  } catch {
    return normalizeState(defaultState());
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(timeValue) {
  if (!/^\d{2}:\d{2}$/.test(timeValue || '')) return '6:15 PM';
  const [hours, minutes] = timeValue.split(':').map((part) => parseInt(part, 10));
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderChecklist() {
  elements.checklist.innerHTML = state.checklist
    .map(
      (item, index) => `
        <label class="dino-check-item">
          <input data-check-index="${index}" type="checkbox" ${item.done ? 'checked' : ''} />
          <span>${escapeHtml(item.label)}</span>
        </label>
      `,
    )
    .join('');
}

function render() {
  const now = new Date();
  const spanish = pickSpanishWord(state, now);
  const dinner = buildDinnerPlan(state, now);

  elements.date.textContent = formatDate(now);
  elements.quote.textContent = pickQuote(now);
  elements.spanishWord.textContent = `${spanish.word} — ${spanish.meaning}`;
  elements.spanishMeaning.textContent = 'Word of the day for the kids and the grownups.';
  elements.spanishUsage.textContent = spanish.usage;

  elements.dinnerTitle.textContent = dinner.title;
  elements.dinnerDescription.textContent = dinner.description;
  elements.dinnerList.innerHTML = dinner.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');

  const propertySummary = summarizePropertyWatch(state);
  elements.rentalSummary.textContent = `${propertySummary}. Real feed automation is the next step; these are the saved settings that should drive it.`;
  elements.dinnerTimeDisplay.textContent = formatTime(state.dinnerTime);
  elements.focusDisplay.textContent = focusLabel(state.focusMode);
  elements.checklistProgress.textContent = checklistProgress(state);
  elements.propertySummaryShort.textContent = `${state.propertyMode.replaceAll('-', ' ')} mode`;
  elements.meta.innerHTML = `
    <span class="project-status-pill">${now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
    <span class="project-status-pill">${focusLabel(state.focusMode)}</span>
    <span class="project-status-pill">Dinner ${formatTime(state.dinnerTime)}</span>
    <span class="project-status-pill">Checklist ${checklistProgress(state)}</span>
  `;

  elements.notePreview.innerHTML = state.quickNote
    ? `<strong>Saved note:</strong> ${escapeHtml(state.quickNote)}`
    : '<strong>Saved note:</strong> Nothing saved yet. Keep it simple tonight.';

  elements.dinnerInput.value = state.dinnerTitle;
  elements.dinnerSidesInput.value = state.dinnerSides;
  elements.dinnerTimeInput.value = state.dinnerTime;
  elements.propertyAreaInput.value = state.propertyArea;
  elements.propertyBudgetInput.value = state.propertyBudget;
  elements.propertyModeInput.value = state.propertyMode;
  elements.propertyNotesInput.value = state.propertyNotes;
  elements.noteInput.value = state.quickNote;
  elements.focusInput.value = state.focusMode;

  renderChecklist();
}

function wireEvents() {
  elements.dinnerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    state = normalizeState({
      ...state,
      dinnerTitle: elements.dinnerInput.value,
      dinnerSides: elements.dinnerSidesInput.value,
      dinnerTime: elements.dinnerTimeInput.value,
    });
    saveState();
    render();
  });

  elements.propertyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    state = normalizeState({
      ...state,
      propertyArea: elements.propertyAreaInput.value,
      propertyBudget: elements.propertyBudgetInput.value,
      propertyMode: elements.propertyModeInput.value,
      propertyNotes: elements.propertyNotesInput.value,
    });
    saveState();
    render();
  });

  elements.noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    state = normalizeState({
      ...state,
      quickNote: elements.noteInput.value,
      focusMode: elements.focusInput.value,
    });
    saveState();
    render();
  });

  elements.refreshSpanishButton.addEventListener('click', () => {
    state = normalizeState({
      ...state,
      pinnedSpanishIndex: ((state.pinnedSpanishIndex ?? 0) + 1) % 4,
    });
    saveState();
    render();
  });

  elements.resetDinnerButton.addEventListener('click', () => {
    state = normalizeState({
      ...state,
      dinnerTitle: '',
      dinnerSides: '',
    });
    saveState();
    render();
  });

  elements.resetChecklistButton.addEventListener('click', () => {
    state = normalizeState({
      ...state,
      checklist: defaultState().checklist,
    });
    saveState();
    render();
  });

  elements.checklist.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const index = parseInt(target.dataset.checkIndex || '-1', 10);
    if (Number.isNaN(index) || index < 0 || index >= state.checklist.length) return;

    const nextChecklist = state.checklist.map((item, itemIndex) =>
      itemIndex === index ? { ...item, done: target.checked } : item,
    );
    state = normalizeState({ ...state, checklist: nextChecklist });
    saveState();
    render();
  });
}

wireEvents();
render();
window.setInterval(render, 60_000);
