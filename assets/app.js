const ideas = window.ideasCatalog || [];
const grid = document.getElementById('ideas-grid');
const filterRow = document.getElementById('filter-row');
const modalShell = document.getElementById('modal-shell');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const focusLiveButton = document.getElementById('focus-live');

const filters = ['All', ...new Set(ideas.map((idea) => idea.category))];
let activeFilter = 'All';

function projectHref(idea) {
  return `./project.html?idea=${encodeURIComponent(idea.slug)}`;
}

function updateMetrics() {
  document.getElementById('metric-total').textContent = String(ideas.length);
  document.getElementById('metric-web-ready').textContent = String(
    ideas.filter((idea) => idea.webReady).length,
  );
  document.getElementById('metric-in-progress').textContent = String(
    ideas.filter((idea) => idea.stage.toLowerCase().includes('progress')).length,
  );
}

function createFilterButton(label) {
  const button = document.createElement('button');
  button.className = label === activeFilter ? 'filter-chip active' : 'filter-chip';
  button.textContent = label;
  button.type = 'button';
  button.addEventListener('click', () => {
    activeFilter = label;
    renderFilters();
    renderIdeas();
  });
  return button;
}

function renderFilters() {
  filterRow.innerHTML = '';
  filters.forEach((filter) => filterRow.appendChild(createFilterButton(filter)));
}

function ideaCard(idea) {
  const card = document.createElement('article');
  card.className = `idea-card accent-${idea.accent}`;
  card.innerHTML = `
    <div class="card-glow"></div>
    <div class="card-header">
      <span class="card-category">${idea.category}</span>
      <span class="card-priority">${idea.priority}</span>
    </div>
    <a class="card-link" href="${projectHref(idea)}" aria-label="Open ${idea.title} project page">
      <div class="card-body">
        <h3>${idea.title}</h3>
        <p>${idea.summary}</p>
      </div>
      <div class="card-footer">
        <span class="card-stage">${idea.stage}</span>
        <span class="card-ready">${idea.readiness}</span>
      </div>
    </a>
    <div class="card-actions">
      <a class="card-action-primary" href="${projectHref(idea)}">Open ${idea.targetLabel}</a>
      <button class="card-action-secondary" type="button">Quick view</button>
    </div>
  `;
  card.querySelector('.card-action-secondary').addEventListener('click', () => openModal(idea));
  return card;
}

function renderIdeas(preferWebReady = false) {
  grid.innerHTML = '';

  let filteredIdeas = ideas.filter((idea) =>
    activeFilter === 'All' ? true : idea.category === activeFilter,
  );

  if (preferWebReady) {
    filteredIdeas = filteredIdeas.filter((idea) => idea.webReady);
  }

  filteredIdeas.forEach((idea) => grid.appendChild(ideaCard(idea)));
}

function openModal(idea) {
  document.getElementById('modal-kicker').textContent = `${idea.category} // ${idea.priority} priority`;
  document.getElementById('modal-title').textContent = idea.title;
  document.getElementById('modal-summary').textContent = idea.summary;
  document.getElementById('modal-description').textContent = idea.description;
  document.getElementById('modal-value').textContent = idea.value;
  document.getElementById('modal-status').textContent = `${idea.stage} • ${idea.readiness} • Next: ${idea.nextAction}`;
  document.getElementById('modal-meta').innerHTML = `
    <span>${idea.stage}</span>
    <span>${idea.readiness}</span>
    <span>${idea.webReady ? 'Can live on the web' : 'Needs more than static hosting'}</span>
  `;
  modalShell.classList.remove('hidden');
  modalShell.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modalShell.classList.add('hidden');
  modalShell.setAttribute('aria-hidden', 'true');
}

focusLiveButton.addEventListener('click', () => {
  activeFilter = 'All';
  renderFilters();
  renderIdeas(true);
  document.getElementById('ideas-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

updateMetrics();
renderFilters();
renderIdeas();
