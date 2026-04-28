const ideas = window.ideasCatalog || [];
const params = new URLSearchParams(window.location.search);
const slug = params.get('idea');
const project = ideas.find((idea) => idea.slug === slug) || ideas[0];

const title = document.getElementById('project-title');
const category = document.getElementById('project-category');
const summary = document.getElementById('project-summary');
const description = document.getElementById('project-description');
const value = document.getElementById('project-value');
const nextAction = document.getElementById('project-next-action');
const readiness = document.getElementById('project-readiness');
const statusRow = document.getElementById('project-status-row');
const hero = document.getElementById('project-hero');

document.title = `${project.title} • Drake's Ideas and Solutions`;
title.textContent = project.title;
category.textContent = `${project.category} // ${project.priority} priority`;
summary.textContent = project.summary;
description.textContent = project.description;
value.textContent = project.value;
nextAction.textContent = project.nextAction;
readiness.textContent = project.webReady
  ? `This concept is a good web candidate. Current state: ${project.stage}. Readiness signal: ${project.readiness}.`
  : `This concept needs more than a static site before it becomes truly live. Current state: ${project.stage}. Readiness signal: ${project.readiness}.`;
hero.className = `project-hero accent-${project.accent}`;
statusRow.innerHTML = `
  <span class="project-status-pill">${project.stage}</span>
  <span class="project-status-pill">${project.readiness}</span>
  <span class="project-status-pill">${project.webReady ? 'Web candidate' : 'Needs deeper build path'}</span>
`;
