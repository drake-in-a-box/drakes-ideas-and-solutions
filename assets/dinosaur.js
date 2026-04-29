import {
  STORAGE_KEY,
  WATCH_CONFIG,
  defaultState,
  normalizeState,
  quoteForDate,
  spanishWordForDate,
  modeForDate,
  weatherForMode,
  fishingForMode,
  fishActivityForMode,
  summarizeWatch,
} from './dinosaur-state.js';

const state = {
  data: loadState(),
  activeWatchKind: null,
};

const $ = (id) => document.getElementById(id);

const noteIds = ['kira', 'parker', 'corbin'];

const elements = {
  asOf: $('as-of'),
  quoteText: $('quote-text'),
  spanishWord: $('spanish-word'),
  spanishMeta: $('spanish-meta'),
  calendarCopy: $('calendar-copy'),
  tempValue: $('temp-value'),
  weatherCondition: $('weather-condition'),
  weatherSubline: $('weather-subline'),
  weatherDetails: $('weather-details'),
  fishingSummary: $('fishing-summary'),
  fishingCopy: $('fishing-copy'),
  fishingDetailTide: $('fishing-detail-tide'),
  fishingDetailWindow: $('fishing-detail-window'),
  fishingDetailWater: $('fishing-detail-water'),
  fishingForecast: $('fishing-forecast'),
  fishActivity: $('fish-activity'),
  wallpaperImage: $('wallpaper-image'),
  buyStatus: $('buy-status'),
  buyCopy: $('buy-copy'),
  buyPills: $('buy-pills'),
  rentalStatus: $('rental-status'),
  rentalCopy: $('rental-copy'),
  rentalPills: $('rental-pills'),
  watchModal: $('watch-modal'),
  watchModalKicker: $('watch-modal-kicker'),
  watchModalTitle: $('watch-modal-title'),
  watchModalSubtitle: $('watch-modal-subtitle'),
  watchModalResults: $('watch-modal-results'),
  watchModalForm: $('watch-modal-form'),
  watchModalStatus: $('watch-modal-status'),
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
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function escapeHtml(text) {
  return String(text ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function formatAsOf(date = new Date()) {
  return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function setNoteStatus(name, message, tone = 'saved') {
  const el = $(`notes-status-${name}`);
  if (!el) return;
  el.textContent = message;
  el.dataset.tone = tone;
}

function renderTopBand(now, spanish) {
  elements.asOf.textContent = `Updated ${formatAsOf(now)}`;
  elements.quoteText.textContent = quoteForDate(now);
  elements.spanishWord.textContent = `${spanish.article} ${spanish.spanish}`;
  elements.spanishMeta.textContent = `${spanish.emoji} ${spanish.item}`;
  elements.calendarCopy.textContent = 'TV-model visual system on phone. Real shared sync can come later.';
}

function renderWeather(weather) {
  elements.tempValue.textContent = `${weather.temperatureF}°`;
  elements.weatherCondition.textContent = weather.condition;
  elements.weatherSubline.textContent = `High ${weather.highF}° • Low ${weather.lowF}° • Feels ${weather.feelsLikeF}°`;
  elements.weatherDetails.innerHTML = [
    ['Rain', `${weather.rainChance}%`],
    ['Wind', `${weather.windMph} mph`],
    ['Sunrise', weather.sunrise],
    ['Sunset', weather.sunset],
  ].map(([label, value]) => `<div class="mini-stat"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
}

function renderFishing(fishing) {
  elements.fishingSummary.textContent = `${fishing.label} • ${fishing.score}`;
  elements.fishingCopy.textContent = fishing.summary;
  elements.fishingDetailTide.textContent = fishing.nextTide;
  elements.fishingDetailWindow.textContent = fishing.bestWindow;
  elements.fishingDetailWater.textContent = `${fishing.waterTempF}° water`;
  elements.fishingForecast.innerHTML = fishing.next3Days.map((day) => `
    <div class="forecast-day ${escapeHtml(String(day.label || '').toLowerCase())}">
      <div class="forecast-day-label">${escapeHtml(day.day)}</div>
      <div class="forecast-day-score">${escapeHtml(day.score)}</div>
      <div class="forecast-day-copy">${escapeHtml(day.label)}</div>
    </div>
  `).join('');
}

function renderFishActivity(items) {
  elements.fishActivity.innerHTML = items.map((item) => `
    <div class="fish-card">
      <img class="fish-thumb" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
      <div class="fish-copy">
        <div class="fish-title-row">
          <h4>${escapeHtml(item.title)}</h4>
          <span class="status-pill ${escapeHtml(item.status.toLowerCase())}">${escapeHtml(item.status)}</span>
        </div>
        <p>${escapeHtml(item.copy)}</p>
      </div>
    </div>
  `).join('');
}

function renderWatchCard(kind) {
  const settings = kind === 'rental' ? state.data.rentalSettings : state.data.buySettings;
  const summary = summarizeWatch(settings, kind);
  const statusEl = kind === 'rental' ? elements.rentalStatus : elements.buyStatus;
  const copyEl = kind === 'rental' ? elements.rentalCopy : elements.buyCopy;
  const pillsEl = kind === 'rental' ? elements.rentalPills : elements.buyPills;
  statusEl.textContent = kind === 'rental' ? 'Rental watch ready' : 'Buy watch ready';
  copyEl.textContent = summary;
  pillsEl.innerHTML = [
    settings.sendMode.replaceAll('-', ' '),
    settings.sendTime,
    `${settings.maxResults} picks`,
  ].map((value) => `<span class="watch-pill">${escapeHtml(value)}</span>`).join('');
}

function renderWallpaper(mode, weather) {
  elements.wallpaperImage.src = weather.image;
  elements.wallpaperImage.alt = `Dinosaur wallpaper in ${mode} mode`;
  document.documentElement.style.setProperty('--wallpaper-height', weather.wallpaperHeight || '88vh');
  document.documentElement.style.setProperty('--wallpaper-center-x', window.innerWidth < 1180 ? '50%' : '42%');
  document.documentElement.style.setProperty('--wallpaper-center-y', window.innerWidth < 1180 ? '38%' : '57%');
}

function renderNotes() {
  for (const name of noteIds) {
    const field = $(`note-${name}`);
    field.value = state.data.notes[name] || '';
  }
}

function renderWatchModal() {
  const kind = state.activeWatchKind;
  if (!kind) {
    elements.watchModal.hidden = true;
    return;
  }

  const config = WATCH_CONFIG[kind];
  const settings = kind === 'rental' ? state.data.rentalSettings : state.data.buySettings;
  elements.watchModal.hidden = false;
  elements.watchModalKicker.textContent = config.kicker;
  elements.watchModalTitle.textContent = config.title;
  elements.watchModalSubtitle.textContent = config.subtitle;
  elements.watchModalResults.innerHTML = config.latest.map((item) => `
    <div class="watch-result-card">
      <div class="watch-result-title">${escapeHtml(item.title)}</div>
      <div class="watch-result-copy">${escapeHtml(item.copy)}</div>
      <div class="watch-result-meta">${escapeHtml(item.meta)}</div>
      <div class="watch-result-links">${item.links.map((link) => `<a class="watch-link-button" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join('')}</div>
    </div>
  `).join('');

  elements.watchModalForm.innerHTML = config.fields.map((field) => renderField(field, settings)).join('');
  elements.watchModalStatus.textContent = 'Ready';
}

function renderField(field, settings) {
  const value = settings[field.name];
  if (field.type === 'textarea') {
    return `<div class="watch-field ${field.full ? 'full' : ''}"><label for="watch-field-${field.name}">${escapeHtml(field.label)}</label><textarea id="watch-field-${field.name}" name="${escapeHtml(field.name)}">${escapeHtml(value || '')}</textarea></div>`;
  }
  if (field.type === 'select') {
    return `<div class="watch-field ${field.full ? 'full' : ''}"><label for="watch-field-${field.name}">${escapeHtml(field.label)}</label><select id="watch-field-${field.name}" name="${escapeHtml(field.name)}">${field.options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}</select></div>`;
  }
  if (field.type === 'checkboxes') {
    const current = Array.isArray(value) ? value : [];
    return `<div class="watch-field ${field.full ? 'full' : ''}"><label>${escapeHtml(field.label)}</label><div class="watch-checkboxes">${field.options.map((option) => `<label><input type="checkbox" name="${escapeHtml(field.name)}" value="${escapeHtml(option)}" ${current.includes(option) ? 'checked' : ''}> ${escapeHtml(option)}</label>`).join('')}</div></div>`;
  }
  return `<div class="watch-field ${field.full ? 'full' : ''}"><label for="watch-field-${field.name}">${escapeHtml(field.label)}</label><input id="watch-field-${field.name}" name="${escapeHtml(field.name)}" type="${escapeHtml(field.type)}" value="${escapeHtml(value || '')}" ${field.min ? `min="${escapeHtml(field.min)}"` : ''} ${field.max ? `max="${escapeHtml(field.max)}"` : ''}></div>`;
}

function render() {
  const now = new Date();
  const mode = modeForDate(now);
  const weather = weatherForMode(mode);
  const fishing = fishingForMode(mode);
  const spanish = spanishWordForDate(state.data, now);

  renderTopBand(now, spanish);
  renderWeather(weather);
  renderFishing(fishing);
  renderFishActivity(fishActivityForMode(mode));
  renderWatchCard('buy');
  renderWatchCard('rental');
  renderWallpaper(mode, weather);
  renderNotes();
  renderWatchModal();
}

function updateNotes(name, value) {
  state.data = normalizeState({
    ...state.data,
    notes: { ...state.data.notes, [name]: value },
  });
  saveState();
  setNoteStatus(name, 'Saved', 'saved');
}

function readModalForm(kind) {
  const config = WATCH_CONFIG[kind];
  const form = elements.watchModalForm;
  const payload = {};
  for (const field of config.fields) {
    if (field.type === 'checkboxes') {
      payload[field.name] = Array.from(form.querySelectorAll(`input[name="${field.name}"]:checked`)).map((input) => input.value);
      continue;
    }
    const input = form.elements.namedItem(field.name);
    payload[field.name] = input ? input.value : '';
  }
  return payload;
}

function saveModalForm() {
  const kind = state.activeWatchKind;
  if (!kind) return;
  const payload = readModalForm(kind);
  if (kind === 'rental') {
    state.data = normalizeState({ ...state.data, rentalSettings: payload });
  } else {
    state.data = normalizeState({ ...state.data, buySettings: payload });
  }
  saveState();
  elements.watchModalStatus.textContent = 'Saved locally on this phone';
  render();
}

function resetModalForm() {
  const kind = state.activeWatchKind;
  if (!kind) return;
  const defaults = defaultState();
  if (kind === 'rental') {
    state.data = normalizeState({ ...state.data, rentalSettings: defaults.rentalSettings });
  } else {
    state.data = normalizeState({ ...state.data, buySettings: defaults.buySettings });
  }
  saveState();
  elements.watchModalStatus.textContent = 'Reset to Dinosaur defaults';
  render();
}

function openWatchModal(kind) {
  state.activeWatchKind = kind;
  renderWatchModal();
}

function closeWatchModal() {
  state.activeWatchKind = null;
  elements.watchModal.hidden = true;
}

function wireEvents() {
  for (const name of noteIds) {
    const field = $(`note-${name}`);
    field.addEventListener('input', () => setNoteStatus(name, 'Saving…', 'saving'));
    field.addEventListener('change', () => updateNotes(name, field.value));
    field.addEventListener('blur', () => updateNotes(name, field.value));
  }

  ['buy', 'rental'].forEach((kind) => {
    $(`${kind}-open-button`).addEventListener('click', (event) => {
      event.stopPropagation();
      openWatchModal(kind);
    });
    $(`${kind}-edit-button`).addEventListener('click', (event) => {
      event.stopPropagation();
      openWatchModal(kind);
    });
    document.querySelector(`[data-watch-kind="${kind}"]`).addEventListener('click', () => openWatchModal(kind));
  });

  $('watch-modal-close').addEventListener('click', closeWatchModal);
  $('watch-modal-save').addEventListener('click', saveModalForm);
  $('watch-modal-reset').addEventListener('click', resetModalForm);
  elements.watchModal.addEventListener('click', (event) => {
    if (event.target === elements.watchModal) closeWatchModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeWatchModal();
  });
  window.addEventListener('resize', render);
}

wireEvents();
render();
window.setInterval(render, 60_000);
