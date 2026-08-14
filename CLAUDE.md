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

## Directive éditoriale (14/08/2026, instruction explicite d'Erwan)
Chaque histoire doit être rédigée comme un article biographique complet
(700-900 mots), style journalistique — jamais un texte clinique centré sur
la pathologie. On ouvre toujours sur une scène ou un fait concret de la vie
de la personne, jamais sur le diagnostic. La pathologie est tissée dans le
récit de vie, pas le sujet principal. Objectif à terme : 100+ histoires
vérifiées et rédigées dans ce format, en autonomie (Erwan n'a pas à être
consulté par histoire).

## Identité visuelle
Palette : noir chaud (#0a0a0a), texte blanc cassé (#f0ece3), or (#c17a3a).
Typographie : Fraunces (titres/display), IBM Plex Sans (corps de texte),
IBM Plex Mono (étiquettes/données, effet "dossier d'archive"). Concept
central : le kintsugi, une fracture dorée qui traverse le site (voir
.thread en CSS, qui suit le scroll de la page). Ton : sobre, digne, jamais
misérabiliste ni "développement personnel".

## Structure du projet
index.html : page d'accueil, structure only, le contenu vient du JS.
story.html : page individuelle d'une histoire (story.html?id=...). Charge
  les métadonnées depuis data/stories.json (nom, pathologie, portrait) et
  le texte complet depuis data/articles/<id>.txt. Si l'article n'existe pas
  encore, affiche l'accroche courte (hook) + une mention "en cours de
  rédaction" plutôt que de planter.
css/style.css : tous les styles, y compris le bloc "Story page" pour
  story.html.
js/main.js : génère les cartes, filtres et stats de la page d'accueil
  depuis data/stories.json.
js/story.js : logique de story.html (lecture de l'id dans l'URL, fetch de
  stories.json + de l'article, rendu).
data/stories.json : les métadonnées de chaque histoire (carte, filtres),
  LE SEUL fichier à modifier pour ajouter une nouvelle entrée à l'archive.
data/articles/<id>.txt : le texte complet de l'article biographique de
  chaque histoire, un fichier par personne, paragraphes séparés par une
  ligne vide (pas de HTML, pas de markdown). État au 14/08/2026 : les 27
  profils de stories.json ont chacun leur article complet.
admin/index.html : bootstrap Decap CMS.
admin/config.yml : config Decap CMS, backend git-gateway vers Netlify Identity.
  Ne couvre pour l'instant que stories.json (les cartes), pas encore les
  articles complets — à étendre plus tard si Git Gateway finit par
  fonctionner (voir section CMS ci-dessous).

Historique : le 13/08/2026, le repo avait une structure cassée suite à un
upload manuel qui avait aplati les dossiers (admin/index.html avait écrasé
index.html à la racine, et css/js/data manquaient). Corrigé, voir commits
de cette date.

## Règle d'or : ajouter une histoire
1. Ajouter une entrée dans data/stories.json (id, name, pathologyLabel,
   pathologyFilter, country, hook, tint en tint-1/2/3 à faire tourner,
   featured: true sur une seule entrée à la fois). On ne touche JAMAIS
   index.html ou main.js pour ça — les stats et filtres du hero sont
   calculés automatiquement depuis ce fichier.
2. Créer data/articles/<id>.txt avec le texte complet de l'article (voir
   directive éditoriale ci-dessus). Rien d'autre à modifier — story.html
   et story.js s'en chargent automatiquement.

## Méthode de publication (important, contournement documenté)
Le push git direct depuis l'environnement Claude est bloqué par le proxy
d'autorisation de la session ("repository not in this session's authorized
set"). Solution qui fonctionne de façon fiable : utiliser l'upload web de
GitHub (https://github.com/erwan-cmyk/lesincassables-site/upload/main/<dossier>)
via l'outil file_upload du navigateur, qui permet d'envoyer plusieurs
fichiers en un seul commit, en passant directement les fichiers écrits en
local (pas de risque de corruption du texte, contrairement à la saisie
caractère par caractère dans l'éditeur web GitHub, qui reste fragile sur du
texte français accentué et a corrompu du contenu par le passé).

## Photos, point sensible, ne jamais court-circuiter
Aucune vraie photo de personne réelle sans droits vérifiés (licence
Wikimedia Commons CC, kit presse officiel, ou photo obtenue lors d'une
interview). En attendant, chaque histoire utilise un portrait-silhouette
généré en CSS (.portrait-silhouette), ne jamais remplacer par une image
trouvée en ligne sans confirmation explicite d'Erwan sur les droits.

## Exactitude des faits, le cœur de la crédibilité du média
Le site se revendique "histoires vérifiées". Chaque article est rédigé par
un agent de recherche dédié (recherche web multi-sources), avec consigne
stricte : citations directes uniquement si vérifiées mot pour mot et
attribuées, jamais de paraphrase présentée comme citation, formulation
prudente en cas de chiffre non confirmé entre sources. Les listes de
sources par article sont conservées (voir le projet Claude, doc sources).
État au 14/08/2026 : 27/27 profils de stories.json ont un article complet
et sourcé. Plusieurs premiers jets ont été rejetés ou refaits après
vérification insuffisante (ex : Anthony Robles et Zion Clark, une première
tentative limitée à une seule source a été entièrement refaite).

## CMS (Decap CMS)
admin/index.html et admin/config.yml donnent à Erwan une interface web
pour ajouter ou éditer une histoire sans toucher au JSON à la main. Ça
nécessite côté Netlify : Identity activé (fait, Erwan invité) et Git
Gateway activé. Git Gateway a échoué à 3 reprises (bouton bloqué sur
"Enabling..." puis se réinitialise sans jamais confirmer) — cause non
identifiée, pas d'action à mener côté Erwan pour l'instant, à retenter
périodiquement. data/stories.json est structuré { "stories": [...] }
spécifiquement pour être compatible avec le widget "list" de Decap CMS, ne
jamais revenir à un tableau JSON brut à la racine.

## Prochaines étapes connues
Étoffer data/stories.json avec de nouveaux profils vérifiés au-delà des 27
actuels, vers l'objectif de 100+ histoires. Retenter Git Gateway
périodiquement. Étendre admin/config.yml pour permettre l'édition des
articles complets (pas seulement des cartes) une fois Git Gateway
fonctionnel. Domaine lesincassables.com connecté et fonctionnel (DNS
GoDaddy → Netlify, SSL provisionné). Le logo actuel est un mot-symbole
texte temporaire, le vrai logo sera fourni séparément et remplacera le
wordmark CSS.

## Déploiement
Netlify, déployé automatiquement depuis GitHub (repo erwan-cmyk/lesincassables-site,
branche main) à chaque commit. Domaine lesincassables.com (DNS chez GoDaddy) —
connecté et fonctionnel.

## Style de travail avec Erwan
Erwan n'est pas développeur, explique en langage simple ce que tu fais et
pourquoi, pas seulement le code. Depuis le 14/08/2026, Erwan a explicitement
demandé de ne plus être sollicité pour des autorisations répétées sur ce
type de tâche (ajout d'histoires, publication) — travailler en autonomie
sur ce périmètre précis, mais rester transparent sur les décisions prises
(sources, choix éditoriaux, limites de vérification rencontrées).
