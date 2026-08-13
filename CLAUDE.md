# Les Incassables — Site Média

## Le projet
Site média statique (HTML/CSS/JS, sans framework) pour "Les Incassables" — un
projet qui recense les histoires vérifiées de personnes atteintes de
pathologies rares ayant accompli des choses extraordinaires. Deux marques
séparées, une identité commune : ce site est UNIQUEMENT le média
(lesincassables.com). Le coaching individuel d'Erwan aura un site distinct,
relié par un lien croisé en bas de page.

## Identité visuelle
- Palette : noir chaud (#0a0a0a), texte blanc cassé (#f0ece3), or (#c17a3a)
- Typographie : Fraunces (titres/display), IBM Plex Sans (corps de texte),
  IBM Plex Mono (étiquettes/données, effet "dossier d'archive")
- Concept central : le kintsugi — une fracture dorée qui traverse le site
  (voir `.thread` en CSS, qui suit le scroll de la page)
- Ton : sobre, digne, jamais misérabiliste ni "développement personnel"

## Structure du projet
```
index.html          → page d'accueil, structure only (le contenu vient du JS)
css/style.css        → tous les styles
js/main.js           → génère les cartes et filtres depuis data/stories.json
data/stories.json    → LES DONNÉES DES HISTOIRES — c'est le seul fichier à
                        modifier pour ajouter/éditer une histoire
```

## Règle d'or : ajouter une histoire
Pour ajouter une histoire, on ajoute une entrée dans `data/stories.json`.
On ne touche JAMAIS index.html ou main.js pour ça. Champs requis :
`id`, `name`, `pathologyLabel`, `pathologyFilter`, `country`, `hook`, `tint`
(tint-1, tint-2 ou tint-3, à faire tourner). `featured: true` sur une seule
entrée à la fois pour la case "Dernière histoire" du hero.

## Photos — point sensible, ne jamais court-circuiter
Aucune vraie photo de personne réelle sans droits vérifiés (licence
Wikimedia Commons CC, kit presse officiel, ou photo obtenue lors d'une
interview). En attendant, chaque histoire utilise un portrait-silhouette
généré en CSS (`.portrait-silhouette`) — ne jamais remplacer par une image
trouvée en ligne sans confirmation explicite d'Erwan sur les droits.

## CMS (Decap CMS)
`admin/index.html` + `admin/config.yml` donnent à Erwan une interface web
pour ajouter/éditer une histoire sans toucher au JSON à la main. Ça nécessite
côté Netlify : Identity activé + Git Gateway activé (deux interrupteurs dans
le dashboard Netlify, aucun code). data/stories.json est structuré
`{ "stories": [...] }` spécifiquement pour être compatible avec le widget
"list" de Decap CMS — ne jamais revenir à un tableau JSON brut à la racine.

## Prochaines étapes connues
- Étoffer data/stories.json avec le reste de la base (123 profils au total,
  disponible dans le Drive du projet)
- Créer une vraie page par histoire (story.html?id=... est déjà référencé
  dans le lien du hero mais la page n'existe pas encore)
- Connecter le domaine lesincassables.com (acheté sur GoDaddy) une fois
  déployé sur Vercel
- Le logo actuel est un mot-symbole texte temporaire — le vrai logo sera
  fourni séparément et remplacera le wordmark CSS

## Style de travail avec Erwan
Propose toujours les changements avant de les appliquer (mode Manual).
Erwan n'est pas développeur — explique en langage simple ce que tu fais et
pourquoi, pas seulement le code.
