export const STORAGE_KEY = 'dinosaur-family-dashboard-v1';

export const quotes = [
  'Small steady moves beat chaotic big promises.',
  'Make tonight simple, calm, and a little bit magical.',
  'The best family systems feel easy, not loud.',
  'One good evening is built from a few intentional choices.',
];

export const spanishWords = [
  {
    word: 'alegría',
    meaning: 'joy',
    usage: 'Uso: “Traigamos alegría a la casa esta noche.”',
  },
  {
    word: 'playa',
    meaning: 'beach',
    usage: 'Uso: “La playa siempre parece una buena idea.”',
  },
  {
    word: 'familia',
    meaning: 'family',
    usage: 'Uso: “La familia es el centro de Dinosaur.”',
  },
  {
    word: 'calma',
    meaning: 'calm',
    usage: 'Uso: “Queremos una noche con calma.”',
  },
];

export const dinners = [
  {
    title: 'Crispy chicken tacos',
    description: 'Fast win. Crowd-friendly. Little cleanup.',
    items: ['Chicken tacos', 'Cut fruit', 'Cucumber slices'],
  },
  {
    title: 'Sheet-pan sausage and veggies',
    description: 'Low effort and no dumb complexity.',
    items: ['Sausage', 'Roasted potatoes', 'Peppers + carrots'],
  },
  {
    title: 'Breakfast-for-dinner',
    description: 'Easy family energy with basically no friction.',
    items: ['Scrambled eggs', 'Toast or waffles', 'Berries'],
  },
  {
    title: 'Simple pasta night',
    description: 'Reliable and kid-safe without being boring.',
    items: ['Butter noodles or red sauce', 'Garlic bread', 'Green beans'],
  },
];

export const checklistDefaults = [
  'Dinner by 6:15',
  'Ten calm minutes together after dinner',
  'Quick reset before bedtime routine',
  'Spanish word recap before lights-out',
];

export function defaultState() {
  return {
    dinnerTitle: '',
    dinnerSides: '',
    dinnerTime: '18:15',
    propertyArea: 'Jacksonville Beach, Ponte Vedra, St. Augustine',
    propertyBudget: '800',
    propertyMode: 'new-and-best',
    propertyNotes: '3 bedrooms, near the sand, under 2 hours',
    quickNote: '',
    focusMode: 'calm',
    checklist: checklistDefaults.map((label) => ({ label, done: false })),
    pinnedSpanishIndex: null,
  };
}

function sanitizeString(value, maxLength = 280) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normalizeChecklist(value) {
  const defaults = checklistDefaults.map((label) => ({ label, done: false }));
  if (!Array.isArray(value) || value.length !== defaults.length) {
    return defaults;
  }

  return defaults.map((item, index) => ({
    label: item.label,
    done: Boolean(value[index]?.done),
  }));
}

export function normalizeState(input = {}) {
  const base = defaultState();
  const propertyMode = ['new-and-best', 'new-only', 'planning'].includes(input.propertyMode)
    ? input.propertyMode
    : base.propertyMode;
  const focusMode = ['calm', 'reset', 'adventure', 'early-bed'].includes(input.focusMode)
    ? input.focusMode
    : base.focusMode;

  return {
    dinnerTitle: sanitizeString(input.dinnerTitle, 120),
    dinnerSides: sanitizeString(input.dinnerSides, 240),
    dinnerTime: /^\d{2}:\d{2}$/.test(String(input.dinnerTime || '')) ? String(input.dinnerTime) : base.dinnerTime,
    propertyArea: sanitizeString(input.propertyArea, 220) || base.propertyArea,
    propertyBudget: String(parseInt(input.propertyBudget, 10) || parseInt(base.propertyBudget, 10)),
    propertyMode,
    propertyNotes: sanitizeString(input.propertyNotes, 180) || base.propertyNotes,
    quickNote: sanitizeString(input.quickNote, 280),
    focusMode,
    checklist: normalizeChecklist(input.checklist),
    pinnedSpanishIndex:
      Number.isInteger(input.pinnedSpanishIndex) && input.pinnedSpanishIndex >= 0
        ? input.pinnedSpanishIndex % spanishWords.length
        : null,
  };
}

export function daySeed(date = new Date()) {
  return date.getDate() + date.getMonth();
}

export function pickQuote(date = new Date()) {
  return quotes[daySeed(date) % quotes.length];
}

export function pickSpanishWord(state, date = new Date()) {
  const index = Number.isInteger(state.pinnedSpanishIndex)
    ? state.pinnedSpanishIndex % spanishWords.length
    : daySeed(date) % spanishWords.length;
  return { ...spanishWords[index], index };
}

export function buildDinnerPlan(state, date = new Date()) {
  if (state.dinnerTitle) {
    const customItems = state.dinnerSides
      ? state.dinnerSides.split(',').map((item) => item.trim()).filter(Boolean)
      : [];
    return {
      title: state.dinnerTitle,
      description: 'Saved from your phone for tonight.',
      items: customItems.length ? customItems : ['Custom family plan'],
      custom: true,
    };
  }

  const suggestion = dinners[daySeed(date) % dinners.length];
  return { ...suggestion, custom: false };
}

export function summarizePropertyWatch(state) {
  const budget = Number.parseInt(state.propertyBudget, 10);
  const budgetText = Number.isFinite(budget) ? `$${budget}` : 'set a budget';
  const modeLabels = {
    'new-and-best': 'new + best picks',
    'new-only': 'only new matches',
    planning: 'planning mode',
  };

  return `${state.propertyArea} • ${budgetText} weekend cap • ${modeLabels[state.propertyMode]}`;
}

export function checklistProgress(state) {
  const done = state.checklist.filter((item) => item.done).length;
  return `${done}/${state.checklist.length} complete`;
}

export function focusLabel(value) {
  const labels = {
    calm: 'Calm evening',
    reset: 'Reset the house',
    adventure: 'Mini adventure',
    'early-bed': 'Early bedtime push',
  };
  return labels[value] || labels.calm;
}
