export const STORAGE_KEY = 'dinosaur-tv-port-v1';

export const quotes = [
  'Do the useful thing first.',
  'Small steady moves beat chaotic big promises.',
  'Make tonight simple, calm, and a little bit magical.',
  'The best family systems feel easy, not loud.',
];

export const spanishWords = [
  { item: 'Umbrella', spanish: 'paraguas', article: 'el', emoji: '☔' },
  { item: 'Backpack', spanish: 'mochila', article: 'la', emoji: '🎒' },
  { item: 'Beach', spanish: 'playa', article: 'la', emoji: '🏖️' },
  { item: 'Family', spanish: 'familia', article: 'la', emoji: '👨‍👩‍👦' },
];

export const weatherModes = {
  sun: {
    image: './assets/custom/family-sun.jpg',
    wallpaperHeight: '88vh',
    temperatureF: 83,
    feelsLikeF: 89,
    highF: 86,
    lowF: 72,
    condition: 'Sunny and bright',
    rainChance: 8,
    windMph: 9,
    sunrise: '6:48 AM',
    sunset: '7:58 PM',
  },
  cold: {
    image: './assets/custom/family-cold.jpg',
    wallpaperHeight: '88vh',
    temperatureF: 66,
    feelsLikeF: 64,
    highF: 69,
    lowF: 54,
    condition: 'Cool and clear',
    rainChance: 10,
    windMph: 12,
    sunrise: '6:51 AM',
    sunset: '7:46 PM',
  },
  rain: {
    image: './assets/custom/family-rain.jpg',
    wallpaperHeight: '88vh',
    temperatureF: 74,
    feelsLikeF: 77,
    highF: 78,
    lowF: 68,
    condition: 'Rain showers around',
    rainChance: 65,
    windMph: 15,
    sunrise: '6:49 AM',
    sunset: '7:53 PM',
  },
};

export const fishingModes = {
  sun: {
    label: 'Good',
    score: 8,
    summary: 'Clean weather and manageable wind make this a solid beach-window setup.',
    nextTide: '7:40 PM incoming',
    bestWindow: 'Sunset into dusk',
    waterTempF: 77,
    next3Days: [
      { day: 'Tue', score: 8, label: 'Good' },
      { day: 'Wed', score: 7, label: 'Good' },
      { day: 'Thu', score: 6, label: 'Fair' },
    ],
  },
  cold: {
    label: 'Fair',
    score: 6,
    summary: 'Cooler air keeps the board honest. Good enough, not magic.',
    nextTide: '6:10 PM outgoing',
    bestWindow: 'Late afternoon',
    waterTempF: 69,
    next3Days: [
      { day: 'Tue', score: 6, label: 'Fair' },
      { day: 'Wed', score: 7, label: 'Good' },
      { day: 'Thu', score: 5, label: 'Slow' },
    ],
  },
  rain: {
    label: 'Slow',
    score: 4,
    summary: 'Storm texture makes this more of a scouting day than a hero day.',
    nextTide: '8:05 PM incoming',
    bestWindow: 'After the band passes',
    waterTempF: 75,
    next3Days: [
      { day: 'Tue', score: 4, label: 'Slow' },
      { day: 'Wed', score: 5, label: 'Fair' },
      { day: 'Thu', score: 7, label: 'Good' },
    ],
  },
};

export const fishActivityByMode = {
  sun: [
    { key: 'redfish', title: 'Redfish', status: 'Good', image: './assets/custom/fish-redfish.jpg', copy: 'Cruisers and edges. Good family-story fish if you get the timing right.' },
    { key: 'trout', title: 'Trout', status: 'Fair', image: './assets/custom/fish-trout.jpg', copy: 'More selective, but still reasonable if the water stays clean.' },
    { key: 'flounder', title: 'Flounder', status: 'Good', image: './assets/custom/fish-flounder.jpg', copy: 'A patient option when you want lower chaos and more intent.' },
  ],
  cold: [
    { key: 'redfish', title: 'Redfish', status: 'Fair', image: './assets/custom/fish-redfish.jpg', copy: 'Still worth watching, but less automatic than warm-mode days.' },
    { key: 'trout', title: 'Trout', status: 'Good', image: './assets/custom/fish-trout.jpg', copy: 'Cooler setup improves their story if the bait stays organized.' },
    { key: 'flounder', title: 'Flounder', status: 'Slow', image: './assets/custom/fish-flounder.jpg', copy: 'Possible, not exciting. Keep expectations adult-sized.' },
  ],
  rain: [
    { key: 'redfish', title: 'Redfish', status: 'Slow', image: './assets/custom/fish-redfish.jpg', copy: 'More of a watch-the-window fish when weather gets stupid.' },
    { key: 'trout', title: 'Trout', status: 'Fair', image: './assets/custom/fish-trout.jpg', copy: 'Can improve if the rain breaks and the water settles back down.' },
    { key: 'flounder', title: 'Flounder', status: 'Fair', image: './assets/custom/fish-flounder.jpg', copy: 'Still a viable grind if you want patient, low-drama fishing.' },
  ],
};

export const WATCH_CONFIG = {
  rental: {
    title: 'Beach house rental watch',
    kicker: 'Rental command center',
    subtitle: 'Change locations, budget, dates, and delivery settings.',
    fields: [
      { name: 'areas', label: 'Locations', type: 'textarea', full: true },
      { name: 'budget', label: 'Budget', type: 'text' },
      { name: 'bedrooms', label: 'Bedrooms', type: 'text' },
      { name: 'dates', label: 'Dates', type: 'text' },
      { name: 'guests', label: 'Guests', type: 'text' },
      { name: 'sendTime', label: 'Send time', type: 'time' },
      { name: 'sendMode', label: 'Send mode', type: 'select', options: ['new-and-best', 'best-current', 'new-only'] },
      { name: 'maxResults', label: 'Top picks', type: 'number', min: 1, max: 15 },
      { name: 'mustHaves', label: 'Must haves', type: 'textarea', full: true },
      { name: 'sites', label: 'Sites', type: 'checkboxes', full: true, options: ['airbnb', 'vrbo'] },
    ],
    latest: [
      {
        title: 'Jacksonville corridor watch',
        copy: 'Saved settings are ready for a real daily digest. This public version stays honest and local-first.',
        meta: 'Actionable next step: wire real Airbnb + VRBO generation behind these filters.',
        links: [
          { label: 'Roadmap', href: './project.html?idea=beach-house-hunter' },
          { label: 'Hub', href: './index.html' },
        ],
      },
    ],
  },
  buy: {
    title: 'Beach house buy watch',
    kicker: 'For-sale command center',
    subtitle: 'Manage corridor coverage and buying filters across saved search logic.',
    fields: [
      { name: 'areas', label: 'Locations', type: 'textarea', full: true },
      { name: 'budget', label: 'Budget', type: 'text' },
      { name: 'bedrooms', label: 'Bedrooms', type: 'text' },
      { name: 'homeType', label: 'Home type', type: 'select', options: ['house', 'condo', 'townhome', 'mixed'] },
      { name: 'sendTime', label: 'Send time', type: 'time' },
      { name: 'sendMode', label: 'Send mode', type: 'select', options: ['new-and-best', 'best-current', 'new-only'] },
      { name: 'maxResults', label: 'Top areas', type: 'number', min: 1, max: 25 },
      { name: 'mustHaves', label: 'Must haves', type: 'textarea', full: true },
      { name: 'sites', label: 'Sites', type: 'checkboxes', full: true, options: ['zillow', 'realtor', 'redfin'] },
    ],
    latest: [
      {
        title: 'Palm Coast to St. Augustine buy watch',
        copy: 'The TV-style card now has the same command-center posture on phone. Real ingestion is the next layer.',
        meta: 'Honest status: saved filters, polished surface, no fake inventory.',
        links: [
          { label: 'Roadmap', href: './project.html?idea=beach-house-hunter' },
          { label: 'Dinosaur brief', href: './project.html?idea=dinosaur-dashboard' },
        ],
      },
    ],
  },
};

export function defaultState() {
  return {
    notes: { kira: '', parker: '', corbin: '' },
    rentalSettings: {
      areas: 'Jacksonville Beach, Ponte Vedra, St. Augustine',
      budget: 'Weekend under $800',
      bedrooms: '3 bedrooms',
      dates: 'Any weekend',
      guests: 'Family flexible',
      sendTime: '08:00',
      sendMode: 'new-and-best',
      maxResults: '5',
      mustHaves: 'Near the sand, weekend-friendly, kid-safe area',
      sites: ['airbnb', 'vrbo'],
    },
    buySettings: {
      areas: 'Palm Coast, Flagler Beach, St. Augustine Beach',
      budget: 'Under $650,000',
      bedrooms: '3 bedrooms',
      homeType: 'house',
      sendTime: '08:00',
      sendMode: 'new-and-best',
      maxResults: '7',
      mustHaves: 'Walk to beach, strong value, low compromise',
      sites: ['zillow', 'realtor', 'redfin'],
    },
    pinnedSpanishIndex: null,
  };
}

function sanitizeString(value, maxLength = 280) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normalizeSites(value, allowed) {
  const picked = Array.isArray(value) ? value.filter((site) => allowed.includes(site)) : [];
  return picked.length ? picked : [...allowed];
}

function normalizeWatchSettings(input, defaults, allowedSites, allowedHomeTypes = []) {
  const normalized = { ...defaults };
  for (const [key, value] of Object.entries(defaults)) {
    if (key === 'sites') {
      normalized.sites = normalizeSites(input.sites, allowedSites);
      continue;
    }
    if (key === 'homeType') {
      normalized.homeType = allowedHomeTypes.includes(input.homeType) ? input.homeType : defaults.homeType;
      continue;
    }
    if (key === 'sendMode') {
      normalized.sendMode = ['new-and-best', 'best-current', 'new-only'].includes(input.sendMode)
        ? input.sendMode
        : defaults.sendMode;
      continue;
    }
    normalized[key] = sanitizeString(input[key], 240) || value;
  }
  return normalized;
}

export function normalizeState(input = {}) {
  const base = defaultState();
  return {
    notes: {
      kira: sanitizeString(input.notes?.kira, 400),
      parker: sanitizeString(input.notes?.parker, 400),
      corbin: sanitizeString(input.notes?.corbin, 400),
    },
    rentalSettings: normalizeWatchSettings(input.rentalSettings || {}, base.rentalSettings, ['airbnb', 'vrbo']),
    buySettings: normalizeWatchSettings(input.buySettings || {}, base.buySettings, ['zillow', 'realtor', 'redfin'], ['house', 'condo', 'townhome', 'mixed']),
    pinnedSpanishIndex:
      Number.isInteger(input.pinnedSpanishIndex) && input.pinnedSpanishIndex >= 0
        ? input.pinnedSpanishIndex % spanishWords.length
        : null,
  };
}

export function daySeed(date = new Date()) {
  return date.getDate() + date.getMonth();
}

export function quoteForDate(date = new Date()) {
  return quotes[daySeed(date) % quotes.length];
}

export function spanishWordForDate(state, date = new Date()) {
  const index = Number.isInteger(state.pinnedSpanishIndex)
    ? state.pinnedSpanishIndex % spanishWords.length
    : daySeed(date) % spanishWords.length;
  return { ...spanishWords[index], index };
}

export function modeForDate(date = new Date()) {
  const modes = ['sun', 'cold', 'rain'];
  return modes[daySeed(date) % modes.length];
}

export function weatherForMode(mode) {
  return weatherModes[mode] || weatherModes.sun;
}

export function fishingForMode(mode) {
  return fishingModes[mode] || fishingModes.sun;
}

export function fishActivityForMode(mode) {
  return fishActivityByMode[mode] || fishActivityByMode.sun;
}

export function summarizeWatch(settings, kind) {
  const area = settings.areas.split(',')[0]?.trim() || 'Set an area';
  const budget = settings.budget || 'Set budget';
  const sites = Array.isArray(settings.sites) ? settings.sites.join(' + ') : '';
  return `${area} • ${budget} • ${kind === 'rental' ? 'rental' : 'buy'} watch${sites ? ` • ${sites}` : ''}`;
}
