// ============================================================
// LES INCASSABLES — story.js
// Affiche la page d'une histoire individuelle (story.html?id=...).
// Cherche l'entrée correspondante dans data/stories.json pour le
// nom/pathologie/portrait, puis essaie de charger l'article complet
// depuis data/articles/<id>.txt (paragraphes séparés par une ligne
// vide). Si ce fichier n'existe pas encore, affiche l'accroche
// courte avec une mention "à paraître".
// Pour ajouter l'article complet d'une histoire : crée le fichier
// data/articles/<id>.txt avec le texte. Rien d'autre à modifier.
// ============================================================

function portraitHTML(tint) {
return `
<div class="portrait-silhouette ${tint}">
<div class="bust"></div>
<div class="head"></div>
<div class="crack-line"></div>
</div>`;
}

function paragraphsHTML(text) {
return text
.split(/\n\s*\n/)
.map(p => p.trim())
.filter(Boolean)
.map(p => `<p>${p}</p>`)
.join('');
}

function renderNotFound() {
const root = document.getElementById('story-root');
root.innerHTML = `
<div class="story-missing">
<div class="story-eyebrow mono">Histoire introuvable</div>
<h1 class="display">Cette page n'existe pas.</h1>
<a href="/#archive" class="story-back">← Retour à l'archive</a>
</div>`;
document.title = "Les Incassables — Histoire introuvable";
}

function setLangSwitch(id) {
const el = document.getElementById('lang-switch');
if (!el) return;
el.href = id ? `/en/story.html?id=${id}` : '/en/';
}

async function loadArticleText(id) {
try {
const res = await fetch(`data/articles/${id}.txt`);
if (!res.ok) return null;
const text = await res.text();
return text.trim() ? text : null;
} catch (e) {
return null;
}
}

async function renderStory(story) {
const root = document.getElementById('story-root');
const articleText = await loadArticleText(story.id);

root.innerHTML = `
<a href="/#archive" class="story-back">← Retour à l'archive</a>
<div class="story-head">
<div class="story-eyebrow mono">${story.pathologyLabel} — ${story.country}</div>
<h1 class="display">${story.name}</h1>
</div>
<div class="story-portrait">${portraitHTML(story.tint)}</div>
<div class="story-body">
${articleText ? paragraphsHTML(articleText) : `<p class="story-hook-only">${story.hook}</p><p class="story-soon mono">— Le récit complet de cette histoire est en cours de rédaction.</p>`}
</div>
`;
document.title = `${story.name} — Les Incassables`;
}

async function init() {
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
try {
const res = await fetch('data/stories.json');
const data = await res.json();
const story = data.stories.find(s => s.id === id);
if (!story) { renderNotFound(); setLangSwitch(null); return; }
await renderStory(story);
setLangSwitch(story.id);
} catch (e) {
renderNotFound();
setLangSwitch(null);
}
}

document.addEventListener('DOMContentLoaded', init);
