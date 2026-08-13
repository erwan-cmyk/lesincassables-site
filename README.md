# Les Incassables — Site Média

Site statique (HTML/CSS/JS, sans framework), déployé automatiquement sur
Netlify à chaque commit sur main.

## Structure
index.html : structure de la page.
css/style.css : tous les styles.
js/main.js : logique, lit data/stories.json, génère les cartes, filtres et stats.
data/stories.json : le seul fichier à modifier pour ajouter une histoire.
admin/index.html et admin/config.yml : interface Decap CMS, un formulaire web
pour éditer data/stories.json sans toucher au code, une fois Netlify Identity
et Git Gateway activés.
CLAUDE.md : contexte du projet pour Claude.

## Déploiement
Netlify, connecté à ce repo GitHub. Domaine cible : lesincassables.com (DNS chez GoDaddy).
