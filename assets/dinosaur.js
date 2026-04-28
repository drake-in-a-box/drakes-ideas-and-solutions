const quotes = [
  'Small steady moves beat chaotic big promises.',
  'Make tonight simple, calm, and a little bit magical.',
  'The best family systems feel easy, not loud.',
  'One good evening is built from a few intentional choices.',
];

const spanishWords = [
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

const dinners = [
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

const rhythms = [
  'Dinner by 6:15',
  'Ten calm minutes together after dinner',
  'Quick reset before bedtime routine',
  'Spanish word recap before lights-out',
];

const today = new Date();
const seed = today.getDate() + today.getMonth();
const quote = quotes[seed % quotes.length];
const spanish = spanishWords[seed % spanishWords.length];
const dinner = dinners[seed % dinners.length];

const dateText = today.toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

document.getElementById('dino-date').textContent = dateText;
document.getElementById('dino-quote').textContent = quote;
document.getElementById('dino-spanish-word').textContent = `${spanish.word} — ${spanish.meaning}`;
document.getElementById('dino-spanish-meaning').textContent = 'Word of the day for the kids and the grownups.';
document.getElementById('dino-spanish-usage').textContent = spanish.usage;
document.getElementById('dino-dinner-title').textContent = dinner.title;
document.getElementById('dino-dinner-description').textContent = dinner.description;
document.getElementById('dino-rental-summary').textContent =
  'Rental watch is staged for premium daily summaries near Jacksonville. Live listing feeds are the next step, not fake links.';

document.getElementById('dino-dinner-list').innerHTML = dinner.items
  .map((item) => `<li>${item}</li>`)
  .join('');

document.getElementById('dino-rhythm-list').innerHTML = rhythms
  .map((item) => `<li>${item}</li>`)
  .join('');

document.getElementById('dinosaur-meta').innerHTML = `
  <span class="project-status-pill">${today.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
  <span class="project-status-pill">Quote + Spanish + dinner</span>
  <span class="project-status-pill">Safe public preview</span>
`;
