# Les Incassables — Site Média

## Le projet
Site média statique (HTML/CSS/JS, sans framework) pour "Les Incassables" — un
projet qui recense les histoires vérifiées de personnes atteintes de
pathologies rares ayant accompli des choses extraordinaires. Deux marques
séparées, une identité commune : ce site est UNIQUEMENT le média
(lesincassables.com). Le coaching individuel d'Erwan aura un site distinct,
relié plus tard par un lien croisé en bas de page (retiré pour l'instant,
pas de coaching lancé, mieux vaut ne pas pointer vers une page qui n'existe
pas encore).

## Identité visuelle
Palette : noir chaud (#0a0a0a), texte blanc cassé (#f0ece3), or (#c17a3a).
Typographie : Fraunces (titres/display), IBM Plex Sans (corps de texte),
IBM Plex Mono (étiquettes/données, effet "dossier d'archive"). Concept
central : le kintsugi, une fracture dorée qui traverse le site (voir
.thread en CSS, qui suit le scroll de la page). Ton : sobre, digne, jamais
misérabiliste ni "développement personnel".

## Structure du projet
index.html : page d'accueil, structure only, le contenu vient du JS.
css/style.css : tous les styles.
js/main.js : génère les cartes, filtres et stats depuis data/stories.json.
data/stories.json : les données des histoires, le seul fichier à modifier
pour ajouter ou éditer une histoire.
admin/index.html : bootstrap Decap CMS.
admin/config.yml : config Decap CMS, backend git-gateway vers Netlify Identity.

Historique : le 13/08/2026, le repo avait une structure cassée suite à un
upload manuel qui avait aplati les dossiers (admin/index.html avait écrasé
index.html à la racine, et css/js/data manquaient). Corrigé, voir commits
de cette date.

## Règle d'or : ajouter une histoire
Pour ajouter une histoire, on ajoute une entrée dans data/stories.json.
On ne touche JAMAIS index.html ou main.js pour ça. Champs requis :
id, name, pathologyLabel, pathologyFilter, country, hook, tint
(tint-1, tint-2 ou tint-3, à faire tourner). featured: true sur une seule
entrée à la fois pour la case "Dernière histoire" du hero. Les stats du hero
(nombre d'histoires, de pathologies, de pays) et les filtres sont calculés
automatiquement depuis ce fichier, rien à mettre à jour à la main.

## Photos, point sensible, ne jamais court-circuiter
Aucune vraie photo de personne réelle sans droits vérifiés (licence
Wikimedia Commons CC, kit presse officiel, ou photo obtenue lors d'une
interview). En attendant, chaque histoire utilise un portrait-silhouette
généré en CSS (.portrait-silhouette), ne jamais remplacer par une image
trouvée en ligne sans confirmation explicite d'Erwan sur les droits.

## Exactitude des faits, le cœur de la crédibilité du média
Le site se revendique "histoires vérifiées". Chaque entrée de
data/stories.json doit être vérifiable par une source fiable avant
publication. État au 13/08/2026 : 12 profils dans le fichier, seule
l'entrée Katie Ledecky a été corrigée (elle est diagnostiquée POTS, pas
Ehlers-Danlos, deux syndromes différents bien que parfois associés). Les
11 autres profils n'ont pas encore été repassés en vérification source par
Claude, à faire avant de les présenter publiquement comme "vérifiées".

## CMS (Decap CMS)
admin/index.html et admin/config.yml donnent à Erwan une interface web
pour ajouter ou éditer une histoire sans toucher au JSON à la main. Ça
nécessite côté Netlify : Identity activé et Git Gateway activé (deux
interrupteurs dans le dashboard Netlify, aucun code). data/stories.json est
structuré { "stories": [...] } spécifiquement pour être compatible avec le
widget "list" de Decap CMS, ne jamais revenir à un tableau JSON brut à la
racine.

## Prochaines étapes connues
Vérifier chaque profil existant avec une source fiable (voir section
"Exactitude des faits" ci-dessus). Étoffer data/stories.json avec d'autres
profils vérifiés. Créer une vraie page par histoire (story.html?id=... est
déjà référencé dans le lien du hero mais la page n'existe pas encore).
Domaine lesincassables.com (GoDaddy) à connecter au projet Netlify via DNS.
Le logo actuel est un mot-symbole texte temporaire, le vrai logo sera
fourni séparément et remplacera le wordmark CSS.

## Déploiement
Netlify, déployé automatiquement depuis GitHub (repo erwan-cmyk/lesincassables-site,
branche main) à chaque commit. Domaine cible : lesincassables.com (DNS chez GoDaddy).

## Style de travail avec Erwan
Propose toujours les changements avant de les appliquer (mode Manual).
Erwan n'est pas développeur, explique en langage simple ce que tu fais et
pourquoi, pas seulement le code.
