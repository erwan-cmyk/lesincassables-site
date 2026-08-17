// ============================================================
// UNBREAKABLE — main.js (English edition of Les Incassables)
// Loads data/stories.json and generates the "latest story" card
// in the hero + the full archive grid. To add a story: add an
// entry to en/data/stories.json, nothing to touch here or in
// en/index.html.
// ============================================================

async function loadStories() {
const res = await fetch('/en/data/stories.json');
const data = await res.json();
return data.stories;
}

function portraitHTML(tint) {
return `
<div class="portrait-silhouette ${tint}">
<div class="bust"></div>
<div class="head"></div>
<div class="crack-line"></div>
</div>`;
}

function renderFeatured(story) {
const el = document.getElementById('featured-story');
if (!story) { el.style.display = 'none'; return; }
el.innerHTML = `
<div class="featured-eyebrow">Latest story</div>
<div class="featured-portrait">${portraitHTML(story.tint)}</div>
<h3 class="display">${story.name}</h3>
<p>${story.featuredHook || story.hook}</p>
<div class="featured-read">Read the story →</div>
`;
el.href = `story.html?id=${story.id}`;
}

function renderGrid(stories) {
const grid = document.getElementById('grid');
grid.innerHTML = stories.map(s => `
<a class="card" data-cat="${s.pathologyFilter}" href="story.html?id=${s.id}">
<div class="card-tag mono">${s.pathologyLabel}</div>
<div class="card-portrait">${portraitHTML(s.tint)}</div>
<h3 class="display">${s.name}</h3>
<p>${s.hook}</p>
<div class="card-footer">
<span class="card-country mono">${s.country}</span>
<span class="card-arrow">→</span>
</div>
</a>
`).join('');
}

function renderFilters(stories) {
const filterBar = document.getElementById('filters');
const seen = new Map();
stories.forEach(s => seen.set(s.pathologyFilter, s.pathologyLabel));

let html = `<button class="filter-chip active" data-filter="all">All</button>`;
seen.forEach((label, key) => {
html += `<button class="filter-chip" data-filter="${key}">${label}</button>`;
});
filterBar.innerHTML = html;

const chips = filterBar.querySelectorAll('.filter-chip');
chips.forEach(chip => {
chip.addEventListener('click', () => {
chips.forEach(c => c.classList.remove('active'));
chip.classList.add('active');
const filter = chip.dataset.filter;
document.querySelectorAll('.card').forEach(card => {
card.style.display = (filter === 'all' || card.dataset.cat === filter) ? 'flex' : 'none';
});
});
});
}

function renderStats(stories) {
const pathologies = new Set(stories.map(s => s.pathologyFilter)).size;
const countries = new Set(stories.map(s => s.country)).size;
document.getElementById('stat-stories').textContent = stories.length;
document.getElementById('stat-pathologies').textContent = pathologies;
document.getElementById('stat-countries').textContent = countries;
}

function setupScrollThread() {
const thread = document.querySelector('.thread');
window.addEventListener('scroll', () => {
const scrolled = window.scrollY;
const max = document.body.scrollHeight - window.innerHeight;
const progress = Math.min(scrolled / max, 1);
thread.style.height = (progress * 100) + 'vh';
});
}

async function init() {
const stories = await loadStories();
const featured = stories.find(s => s.featured) || stories[0];

renderFeatured(featured);
renderFilters(stories);
renderGrid(stories);
renderStats(stories);
setupScrollThread();

document.getElementById('archive-count').textContent = `${stories.length} verified profiles`;
}

document.addEventListener('DOMContentLoaded', init);
