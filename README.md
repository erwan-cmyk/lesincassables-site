# Les Incassables — Site Média

Site statique, aucune installation requise pour le tester en local :
ouvre `index.html` dans un navigateur (ou utilise un petit serveur local,
voir plus bas — nécessaire pour que le chargement de `data/stories.json`
fonctionne correctement).

## Tester en local
Les navigateurs bloquent parfois le chargement de fichiers JSON en local
simple (`file://`). Le plus simple avec Claude Code : lui demander de lancer
un serveur local, par exemple `python3 -m http.server 8000`, puis ouvrir
`http://localhost:8000`.

## Structure
- `index.html` — structure de la page
- `css/style.css` — tous les styles
- `js/main.js` — logique (lit data/stories.json, génère les cartes)
- `data/stories.json` — **le seul fichier à modifier pour ajouter une histoire**
- `CLAUDE.md` — contexte du projet pour Claude Code (lu automatiquement)

## Déploiement prévu
Vercel, connecté au domaine lesincassables.com (DNS chez GoDaddy).
