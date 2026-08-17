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
propose.html / merci.html : formulaire "Proposer une histoire" (voir
  section Formulaire ci-dessous) et sa page de remerciement.
css/style.css : tous les styles, y compris le bloc "Story page" pour
  story.html, le sélecteur de langue (.lang-switch) et le formulaire
  (.propose-page, .propose-form, .thanks-page). Fichier CSS PARTAGÉ entre
  le site FR (racine) et le site EN (en/) — une seule feuille de style.
js/main.js : génère les cartes, filtres et stats de la page d'accueil
  depuis data/stories.json.
js/story.js : logique de story.html (lecture de l'id dans l'URL, fetch de
  stories.json + de l'article, rendu, + lien dynamique vers la version EN
  de la même histoire via setLangSwitch()).
data/stories.json : les métadonnées de chaque histoire (carte, filtres),
  LE SEUL fichier à modifier pour ajouter une nouvelle entrée à l'archive.
data/articles/<id>.txt : le texte complet de l'article biographique de
  chaque histoire, un fichier par personne, paragraphes séparés par une
  ligne vide (pas de HTML, pas de markdown). État au 17/08/2026 : les 50
  profils de stories.json ont chacun leur article complet en français.
admin/index.html : bootstrap Decap CMS.
admin/config.yml : config Decap CMS, backend git-gateway vers Netlify Identity.
  Ne couvre pour l'instant que stories.json (les cartes), pas encore les
  articles complets — à étendre plus tard si Git Gateway finit par
  fonctionner (voir section CMS ci-dessous).

Historique : le 13/08/2026, le repo avait une structure cassée suite à un
upload manuel qui avait aplati les dossiers (admin/index.html avait écrasé
index.html à la racine, et css/js/data manquaient). Corrigé, voir commits
de cette date.

## Site anglais "Unbreakable" (en/, depuis le 17/08/2026)
Version anglaise du site, sous-dossier /en/ du MÊME domaine
(lesincassables.com/en/), pas un nom de domaine séparé — décision prise
pour rester réversible et ne pas engager d'achat de domaine sans
validation d'Erwan. Marque : "Unbreakable" (au lieu de "Les Incassables").
Structure en miroir de la racine FR :
en/index.html, en/story.html, en/propose.html, en/thanks.html : pages EN,
  utilisent des chemins ABSOLUS (/css/style.css, /en/js/main.js, etc.) car
  imbriquées un niveau plus bas, contrairement aux pages FR à la racine qui
  gardent des chemins relatifs.
en/js/main.js, en/js/story.js : logique EN, quasi-identique aux versions
  FR mais fetch en/data/stories.json et en/data/articles/<id>.txt.
en/data/stories.json : métadonnées traduites (pathologyLabel, country,
  hook) pour les 50 histoires. id/tint/pathologyFilter/featured identiques
  à la version FR (ne JAMAIS les traduire, ce sont des clés techniques).
en/data/articles/<id>.txt : articles traduits. État au 17/08/2026 :
  15/50 traduits (mckenzie-coan, stephen-hawking, michael-j-fox,
  richard-branson, stevie-wonder, andrea-bocelli, ludwig-van-beethoven,
  joni-mitchell, neil-young, john-nash, temple-grandin, nick-vujicic,
  aimee-mullins, sam-berns, bebe-vio). Pour les 35 autres, story.js EN
  affiche le hook + un message "the English translation is on its way,
  read it in French" — jamais d'erreur ni de page blanche.
Sélecteur de langue : lien "EN"/"FR" dans la nav (.lang-switch). Sur
  index.html/en/index.html il pointe simplement vers l'autre accueil. Sur
  story.html/en/story.html (id="lang-switch"), il est réécrit en JS pour
  pointer vers la MÊME histoire dans l'autre langue (deep-link), voir
  setLangSwitch() dans story.js.
Règle d'or pour ajouter une traduction : traduire l'entrée correspondante
  dans en/data/stories.json (garder id/tint/pathologyFilter/featured
  identiques au FR) + créer en/data/articles/<id>.txt. Rien d'autre à
  toucher.

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

## Formulaire "Proposer une histoire" (Netlify Forms, depuis le 17/08/2026)
propose.html (FR) et en/propose.html (EN) sont des formulaires statiques
utilisant Netlify Forms — pas de backend, pas de JS pour la soumission :
Netlify détecte le formulaire au moment du build grâce à l'attribut
data-netlify="true" sur la balise <form>, plus un champ caché
name="form-name" qui doit correspondre à l'attribut name du formulaire, et
un champ honeypot (netlify-honeypot="bot-field") pour filtrer les bots.
Les deux formulaires ont des noms distincts (proposition / proposition-en)
pour apparaître séparément dans le tableau de bord Netlify.
IMPORTANT — la détection de formulaires était DÉSACTIVÉE par défaut sur ce
site Netlify (option "Enable form detection", Site settings → Forms). Il a
fallu l'activer manuellement puis déclencher un redéploiement ("Deploy
project without cache") pour que Netlify analyse les pages déjà publiées
et détecte les deux formulaires. Si un futur formulaire n'apparaît pas
dans le tableau de bord Netlify après publication, vérifier d'abord que
cette option est toujours activée.
Notification email : configurée dans Netlify → Project configuration →
Notifications → Form submission notifications, une règle "Email
drouetcrp@gmail.com on new submission from any form" (couvre les deux
formulaires FR et EN avec une seule règle). Vérifié end-to-end le
17/08/2026 par une soumission test réelle (reçue dans le tableau de bord
Netlify).

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
État au 17/08/2026 : 50/50 profils de stories.json ont un article complet
et sourcé en français. Plusieurs premiers jets ont été rejetés ou refaits
après vérification insuffisante (ex : Anthony Robles et Zion Clark, une
première tentative limitée à une seule source a été entièrement refaite).
Traduction anglaise (en/data/articles/) : traduction fidèle du texte
français déjà vérifié, pas une nouvelle recherche. Règle de citation :
quand l'article français avait déjà conservé la citation originale en
anglais (cas fréquent pour les personnalités anglophones, ex. Michael J.
Fox, Stevie Wonder), on restitue cette citation originale telle quelle
plutôt que de la traduire depuis le français — évite une double
traduction qui dériverait du mot pour mot. Sinon, traduction directe du
français en anglais, présentée avec les mêmes guillemets.

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
Étoffer data/stories.json avec de nouveaux profils vérifiés au-delà des 50
actuels, vers l'objectif de 100+ histoires (voir crédits Netlify
ci-dessus — vérifier l'état du quota avant de publier un nouveau lot).
Continuer la traduction anglaise au-delà des 15 premiers articles.
Retenter Git Gateway périodiquement. Étendre admin/config.yml pour
permettre l'édition des articles complets (pas seulement des cartes) une
fois Git Gateway fonctionnel. Domaine lesincassables.com connecté et
fonctionnel (DNS GoDaddy → Netlify, SSL provisionné). Le logo actuel est
un mot-symbole texte temporaire, le vrai logo sera fourni séparément et
remplacera le wordmark CSS.

## Déploiement
Netlify, déployé automatiquement depuis GitHub (repo erwan-cmyk/lesincassables-site,
branche main) à chaque commit. Domaine lesincassables.com (DNS chez GoDaddy) —
connecté et fonctionnel.

## ⚠️ Crédits Netlify épuisés (découvert le 17/08/2026) — bloquant pour la suite
Le compte Netlify (plan gratuit, 300 crédits/mois) a atteint son quota le
17/08/2026 : 315 crédits déjà consommés sur la période du 13/08 au
12/09/2026, quasi entièrement par les déploiements de production (21
déploiements = 315 crédits, soit environ 15 crédits par déploiement —
chaque commit publié via l'upload GitHub déclenche un déploiement complet).
Conséquence concrète : Netlify est passé en "crédits opérationnels" (30
crédits accordés le 17/08, expirant le 13/09) qui maintiennent le site
DÉJÀ publié en ligne, mais ne peuvent PAS financer de nouveaux
déploiements de production tant que le quota n'est pas renouvelé. Le site
actuel (au 17/08/2026, avec le formulaire et les 15 premiers articles
anglais) reste donc bien en ligne et fonctionnel — vérifié en direct — mais
**tout nouveau commit publié ne se déploiera plus automatiquement** jusqu'à
ce qu'Erwan choisisse l'une de ces deux options : (a) passer à un plan
payant Netlify (Site → Project configuration → Billing → "Upgrade team"),
ou (b) attendre le renouvellement du cycle gratuit le 12-13/09/2026.
Ceci est une décision de paiement qui appartient uniquement à Erwan — ne
jamais l'engager côté Claude. En attendant sa décision, le travail de
recherche/rédaction peut continuer normalement (sauvegarde dans le projet
Claude), mais la PUBLICATION de nouvelles histoires ou traductions doit
être mise en pause, ou groupée en un minimum de commits pour économiser
les crédits une fois le quota renouvelé.

## Style de travail avec Erwan
Erwan n'est pas développeur, explique en langage simple ce que tu fais et
pourquoi, pas seulement le code. Depuis le 14/08/2026, Erwan a explicitement
demandé de ne plus être sollicité pour des autorisations répétées sur ce
type de tâche (ajout d'histoires, publication) — travailler en autonomie
sur ce périmètre précis, mais rester transparent sur les décisions prises
(sources, choix éditoriaux, limites de vérification rencontrées).
