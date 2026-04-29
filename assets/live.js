const ideas = window.ideasCatalog || [];
const params = new URLSearchParams(window.location.search);
const slug = params.get('idea');
const project = ideas.find((idea) => idea.slug === slug) || ideas[0];

const title = document.getElementById('live-title');
const kicker = document.getElementById('live-kicker');
const summary = document.getElementById('live-summary');
const statusRow = document.getElementById('live-status-row');
const hero = document.getElementById('live-hero');
const briefLink = document.getElementById('live-brief-link');
const primaryAction = document.getElementById('live-primary-action');
const liveNowCopy = document.getElementById('live-now-copy');
const honestyCopy = document.getElementById('live-honesty-copy');
const valueCopy = document.getElementById('live-value-copy');
const livePills = document.getElementById('live-pills');
const checklist = document.getElementById('live-checklist');
const actionsList = document.getElementById('live-actions-list');

const liveCopyBySlug = {
  'job-hunting-tool': {
    now: 'This public mobile surface is live as a project command page. The real backend workflow still belongs on a hosted app or private deployment, not fake browser-only claims.',
    honesty: 'No public resume-writing backend is wired here yet. What is live now is a clean mobile launch surface and project brief, not a made-up production app.',
    checklist: [
      'Public mobile surface is live now',
      'Project brief is one tap away',
      'Next real step: host API plus phone-safe frontend',
    ],
  },
  'ops-billing-tool': {
    now: 'This mobile surface is live right now as the customer-facing launch page. The actual workflow should point to a hosted demo or production instance once you want outside use.',
    honesty: 'No browser-side fake data entry flow is being claimed here. It is a clean live entrypoint until you attach a real instance.',
    checklist: [
      'Phone entrypoint is live now',
      'Can become a hosted demo next',
      'Good fit for a proper PWA later',
    ],
  },
  'sports-card-valuation-dashboard': {
    now: 'This is the first live mobile launch surface for the card tool. It makes the concept tappable now while keeping the real camera/comps workflow honest about not existing publicly yet.',
    honesty: 'There is no fake camera pricing engine in this static site. The live piece is the phone surface and project launch path.',
    checklist: [
      'Phone-facing concept surface is live',
      'Ready for camera intake prototype next',
      'Would benefit from real comps + image pipeline later',
    ],
  },
  'beach-house-hunter': {
    now: 'This mobile surface is live as the public-facing deal-board shell. The real search feeds and ranking logic still need a proper data layer.',
    honesty: 'No pretend listing feed is running in-browser. This is an honest shell and launch surface until the actual watch pipeline is connected.',
    checklist: [
      'Deal-board shell is live now',
      'Saved filter UX can layer on next',
      'Needs real source-aware feed plumbing',
    ],
  },
  'founder-coo-second-brain': {
    now: 'This is the live phone command surface for the broader system: a clean way to tap into the project universe from your phone without exposing private internals.',
    honesty: 'This is not pretending to be your private second-brain database. It is the public front door and mobile launcher.',
    checklist: [
      'Public mobile command surface is live',
      'Acts as an installable front door',
      'Private systems stay private until deliberately exposed',
    ],
  },
  'ai-media-voice-lab': {
    now: 'This mobile surface is live as a polished showcase entrypoint. It is built to become a gallery of experiments, samples, and tool launches as those get published.',
    honesty: 'No fake playable voice lab is claimed yet. This is the live showcase shell, not the final creative stack.',
    checklist: [
      'Showcase surface is live now',
      'Good fit for sample gallery next',
      'Can grow into tappable experiment cards later',
    ],
  },
  inflatagift: {
    now: 'This mobile surface is live now as the public entrypoint for the InflataGift product system, so you can reach it directly from the app instead of hunting through repos.',
    honesty: 'The old homepage URL on the repo points to a dead backend path, so this hub-hosted surface is the honest working website entry right now.',
    checklist: [
      'InflataGift is now reachable from the app',
      'Product brief stays one tap away',
      'Next real step: ship the dedicated marketing site publicly',
    ],
  },
  deadspace: {
    now: 'This mobile surface is live now as the public Deadspace entrypoint, giving the concept an actual website path from the app instead of leaving it as a floating idea.',
    honesty: 'Deadspace has a standalone repo landing page concept, but this app-hosted route is the cleanest guaranteed access path from your command hub right now.',
    checklist: [
      'Deadspace is now reachable from the app',
      'Project brief stays one tap away',
      'Next real step: decide whether to promote the dedicated standalone site too',
    ],
  },
};

const defaultCopy = {
  now: 'This project now has a live phone surface instead of a dead tile. It is meant to be honest, tappable, and ready for the next real build step.',
  honesty: 'This page only claims what is actually live. If the backend is not public yet, it says so.',
  checklist: [
    'Mobile surface is live now',
    'Project brief stays one tap away',
    'Next move is a real deployed workflow',
  ],
};

const copy = liveCopyBySlug[project.slug] || defaultCopy;
const briefHref = `./project.html?idea=${encodeURIComponent(project.slug)}`;

document.title = `${project.title} • Live Mobile Surface`;
hero.className = `live-hero accent-${project.accent}`;
kicker.textContent = `${project.category} // ${project.priority} priority mobile surface`;
title.textContent = project.title;
summary.textContent = project.summary;
statusRow.innerHTML = `
  <span class="project-status-pill">${project.stage}</span>
  <span class="project-status-pill">${project.readiness}</span>
  <span class="project-status-pill">${project.webReady ? 'Live on phone now' : 'Needs deeper build path'}</span>
`;

briefLink.href = briefHref;
if (project.slug === 'dinosaur-dashboard') {
  primaryAction.textContent = 'Open Dinosaur';
  primaryAction.href = './dinosaur.html';
} else {
  primaryAction.textContent = 'Open project brief';
  primaryAction.href = briefHref;
}

liveNowCopy.textContent = copy.now;
honestyCopy.textContent = `${copy.honesty} Next move: ${project.nextAction}`;
valueCopy.textContent = project.value;
livePills.innerHTML = [project.category, project.stage, project.readiness, project.targetLabel]
  .map((item) => `<span class="live-pill">${item}</span>`)
  .join('');
checklist.innerHTML = copy.checklist
  .map((item) => `<div class="live-check-item"><span>•</span><div>${item}</div></div>`)
  .join('');
actionsList.innerHTML = [
  `<a class="live-action-card" href="${briefHref}"><strong>Project brief</strong><span>Context, value, and next action.</span></a>`,
  `<a class="live-action-card" href="./index.html#ideas-grid"><strong>Back to hub</strong><span>Jump to all live and in-progress ideas.</span></a>`,
].join('');
