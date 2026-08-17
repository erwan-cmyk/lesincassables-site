// ============================================================
// UNBREAKABLE — story.js (English edition of Les Incassables)
// Displays an individual story page (story.html?id=...). Looks up
// the matching entry in en/data/stories.json for name/pathology/
// portrait, then tries to load the full article from
// en/data/articles/<id>.txt (paragraphs separated by a blank
// line). If that file doesn't exist yet, shows the short hook
// with a "translation coming soon" note.
// To add a story's full English article: create
// en/data/articles/<id>.txt with the text. Nothing else to change.
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
<div class="story-eyebrow mono">Story not found</div>
<h1 class="display">This page doesn't exist.</h1>
<a href="/en/#archive" class="story-back">← Back to the archive</a>
</div>`;
document.title = "Unbreakable — Story not found";
}

function setLangSwitch(id) {
const el = document.getElementById('lang-switch');
if (!el) return;
el.href = id ? `/story.html?id=${id}` : '/';
}

async function loadArticleText(id) {
try {
const res = await fetch(`/en/data/articles/${id}.txt`);
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
<a href="/en/#archive" class="story-back">← Back to the archive</a>
<div class="story-head">
<div class="story-eyebrow mono">${story.pathologyLabel} — ${story.country}</div>
<h1 class="display">${story.name}</h1>
</div>
<div class="story-portrait">${portraitHTML(story.tint)}</div>
<div class="story-body">
${articleText ? paragraphsHTML(articleText) : `<p class="story-hook-only">${story.hook}</p><p class="story-soon mono">— The English translation of this story is on its way. Read it in French now via the FR switch above.</p>`}
</div>
`;
document.title = `${story.name} — Unbreakable`;
}

async function init() {
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
try {
const res = await fetch('/en/data/stories.json');
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
