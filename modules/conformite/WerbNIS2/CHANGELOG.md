# Changelog — WerbNIS2

Toutes les évolutions notables de WerbNIS2 sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).







## [1.12.2] — 2026-11

### Changements
- Le référentiel s'affiche « NIS2 », sans numéro de version : titre de la grille « Grille d'audit NIS2 », libellé « NIS2 (17/03/2026) », À propos, reprise de la grille 2025, guides ; nouvelles bases enregistrées avec `"referentiel": "NIS2"` (les bases existantes s'ouvrent sans changement).

## [1.12.1] — 2026-11

### Changements
- Le référentiel est désormais nommé **NIS2** partout : grille, tableau de bord, rapport, aide, guides, base d'exemple (`"referentiel": "NIS2"`). Les bases déjà enregistrées s'ouvrent sans reprise (seule la présence du champ `referentiel` est contrôlée).
- Titre de la grille : « Grille d'audit NIS2 » ; libellé du référentiel sans l'éditeur.

### Développement
- Outil d'extraction renommé `outils/extraire_nis2.py`, test du référentiel renommé `tests/test_referentiel.py`.

## [1.12.0] — 2026-11

### Modifications
- **Référentiel NIS2** (17/03/2026, document de travail) à la place de la grille 2025 (classeur « Règles et audits NIS2 ») : **20 objectifs de sécurité** (pilier, articles de la directive NIS2, rappel de l'objectif, moyen de s'en prévaloir, justification et risques) et **152 moyens acceptables de conformité** en 28 rubriques, avec leurs identifiants officiels (`1.1-EI/EE`, `5.B.1-EE`…).
- **Attendu d'une EI / d'une EE** pour chaque mesure (colonnes du référentiel NIS2) : étiquettes **EI ✓ / ✗** et **EE ✓ / ✗** ; le **statut** de l'entité fixe les mesures applicables (76 pour une entité importante, 152 pour une entité essentielle) ; une mesure non attendue est grisée, sans cotation et exclue de la couverture. Objectifs 16 à 20 marqués « EE seulement ». Deux mesures dont l'identifiant ne concorde pas avec les colonnes (12.6-EI/EE, 14.5-EE) : la colonne fait foi, signalé (⚠).
- **Filtre d'applicabilité** dans la grille : applicables à l'entité, attendues d'une EI, attendues d'une EE, réservées aux EE, non applicables. Recherche insensible aux ligatures (« coeur » trouve « cœur »).
- **Reprise des bases de la grille 2025** à l'ouverture : 146 points sur 152 reportés sur la mesure NIS2 correspondante (textes appariés un pour un, relus), état des règles sur l'objectif correspondant, actions suivant leur point ; cotations sans correspondance gardées dans **Base › Reprise de la grille 2025** (à reporter, « Marquer comme traité »), exportées en Excel ; reprise tracée au journal.
- Éléments de preuve reçus (WerbCartoSI, WerbExploitation, WerbAcademie) rattachés aux mesures NIS2 équivalentes (5.A.1, 7.A.x, 13.1 à 13.3, 4.2, 2.A.1, 15.1…).
- Export Excel : rubrique, « Attendu d'une EI / d'une EE », applicabilité ; feuille **Objectifs** (pilier, entités, articles NIS2).
- Base d'exemple : entité importante, objectifs 1 à 12 audités, 13 à 15 planifiés.

### Développement
- `outils/extraire_nis2.py` (PDF du référentiel NIS2 → `referentiel.js` : objectifs, rubriques, mesures ; lignes de tableau délimitées par les filets) et `outils/migration_grille2025.json` ; schéma de données **2** ; test `tests/test_referentiel.py`.

## [1.11.0] — 2026-11

### Modifications
- **Nommage des fichiers exportés** (socle 1.12.0, charte §7.8) : les rapports, classeurs, documents, CSV et PDF produits par le module commencent par le code du groupe et celui du site, « SIGLE-SITE_ » (« SIGLE_ » pour une base du groupe), par exemple `GDI-LYON_…` ; les codes déjà présents dans le nom ne sont pas répétés. Les fichiers de base gardent leur nom ; hors espace (sigle inconnu), les noms ne changent pas. Titres (page, classeur, rapport Word, feuille Informations) : **nom du site** plutôt que son code.

### Développement
- Socle 1.12.0 (`WerbSocle.nommage` : `contexte`, `fichier`, `nomSite`, `libelleSite`, `nomGroupe`).

## [1.10.0] — 2026-11

### Modifications
- **Ouverture directe de la base demandée par le portail** (socle 1.11.0, charte §5.5) : ouvert depuis la puce d'une base du portail WerbSMSI, l'espace étant chargé dans le portail (🔗 Raccourcis), le module ouvre la base aussitôt, sans le bouton « 📂 Ouvrir … ». Si l'espace n'est pas accessible sans fenêtre (raccourci désactivé, autorisation d'Edge à donner), le bouton reste proposé comme avant.

### Développement
- Socle 1.11.0 (`WerbSocle.lien.ouvrirSansClic()`).

## [1.9.0] — 2026-11

### Modifications
- **Identification unique depuis le portail** (socle 1.10.0, charte §5.5) : ouvert depuis le portail WerbSMSI 1.16.0 (bouton *Ouvrir* ou puce d'une base), le module reprend le nom saisi une fois dans le portail ; l'écran « Votre nom » ne s'affiche plus, le journal, les publications et le verrou de la base reçoivent ce nom. Ouvert seul, le module demande le nom comme avant.

### Développement
- Socle 1.10.0 (`WerbSocle.lien.utilisateur()`, nom transmis dans le lien `#werbsmsi=…`, champ `u`).

## [1.8.1] — 2026-11

### Modifications
- **Schémas d'architecture non applicables** : une catégorie d'exigence déclarée non applicable par WerbCartoSI 1.7.0 (état `na` de `site:cartographies`) est lue avec sa décision (justification, fonction, date de décision et de revue) ; l'élément de preuve l'affiche et la citation la reprend ; elle n'est plus signalée « couverture incomplète ». Données reçues : nombre de catégories non applicables.

### Développement
- Lecteur de guides 1.3.0 (composant de la charte : images dans les guides).

## [1.8.0] — 2026-11

### Ajouts
- **Registre des sauvegardes en preuve** (NIS-1) : base de site — `site:sauvegardes` (WerbExploitation) lu au rattachement et sur ⟳ Actualiser, copié dans la base (sans chemin, support, chiffrement ni procédure), réception tracée au journal ; données reçues complétées. Encadré « Élément de preuve reçu » sous CONTINUITE_ACTIVITE.a (sauvegardes actives), .c (tests de restauration de moins d'un an) et .d (copie hors ligne, catégorie BCK_3), à côté de la couverture du schéma EX-REPRISE ; élément incomplet et publication de plus de 12 mois signalés ; bouton « Citer dans les preuves ». Aucune cotation automatique ; rien au niveau du groupe.

### Changements
- `site:sauvegardes` ajouté aux objets lus (`module.json`).

## [1.7.0] — 2026-11

### Ajouts
- **Schémas d'architecture en preuve** (CSI-11) : base de site — `site:cartographies` (WerbCartoSI 1.3.0) lu au rattachement et sur ⟳ Actualiser, copié dans la base, réception tracée au journal ; données reçues complétées. Sous 18 points de la grille (table de correspondance fixe, validée en novembre 2026 : CARTOGRAPHIE.a ; CLOISONNEMENT.a à d, g, h ; FILTRAGE.a, b ; ECOSYSTEME.a ; ACCES_DISTANTS.a ; ADMINISTRATION.a, g, h ; CONTINUITE_ACTIVITE.a, d, f ; ACCES_PHYSIQUES.b), encadré « Élément de preuve reçu » : état de couverture et schémas datés, couverture incomplète et publication de plus de 12 mois signalées, bouton « Citer dans les preuves ». Aucune cotation automatique ; rien au niveau du groupe.

### Changements
- `site:cartographies` ajouté aux objets lus (`module.json`).

## [1.6.0] — 2026-11

### Ajouts
- **Guide de débutant « NIS2 en clair »** (`guides/0-NIS2_en_clair.md`) : pourquoi NIS2, qui est concerné (secteurs, taille, entité essentielle ou importante), mesures de gestion des risques, déclaration des incidents (24 h, 72 h, 1 mois), engagement de la direction, sanctions, par où commencer, idées reçues ; renvoi vers le guide d'audit.

### Développement
- Test `tests/test_guides.py`.

## [1.5.0] — 2026-10

### Ajouts
- **Indicateurs de formation reçus de WerbAcademie** (`groupe:formations`, ACA-10) : lus au rattachement à l'espace et sur ⟳ Actualiser (*Intégration WerbSMSI › Données reçues*) — base de groupe : indicateurs du groupe ; base de site : ligne du site et dirigeants du site — et copiés dans la base (`recus.formations`, aucun nom).
- **Élément de preuve** sous les points **RH.b** (programme de sensibilisation), **ROLE.a** (dirigeant ; formation exigée par l'article 20 de la directive) et **EXERCICES.a** de la grille d'audit : taux de formations à jour, personnes, en retard, jamais suivies, dirigeants à jour, catalogue ; **Citer dans les preuves** ajoute le texte aux preuves du point (journalisé).

### Changements
- `groupe:formations` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_formation.py`.

## [1.4.0] — 2026-10

### Ajouts
- **Sélection multiple et archivage** (TRV-4, charte §7.7) dans le plan d'actions (la grille de 152 points est normative : ni sélection ni archivage) : case par ligne, « tout sélectionner », barre **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer**, **✕ Désélectionner**. Une ligne archivée est déplacée dans la réserve de la base (`archives`, date et auteur) : hors plan d'actions, tableau de bord, compteur du menu, rapport d'audit et export Excel ; son identifiant n'est jamais réattribué. Chercher / remplacer : action, responsable, commentaire.
- **Chercher / remplacer** (TRV-5) : colonne de texte libre choisie (ou toutes), aperçu avant d'appliquer ; identifiants, listes de choix et dates exclus.
- **Largeur des colonnes à la souris** (TRV-6) : poignée au bord des en-têtes, double-clic pour la largeur automatique ; largeurs enregistrées dans la base (`largeurs`), « ↔ Largeurs par défaut ».

### Changements
- Mentions de **WerbIEC62443** (ex-WerbTools_IEC62443, renommé pour suivre WerbNIS2) dans l'aide et la documentation.
- Socle 1.9.0 (au lieu de 1.8.0).

### Développement
- Test `tests/test_tables.py`.

## [1.3.0] — 2026-10

### Ajouts
- **Bandeau commun** (charte §7.6, socle 1.8.0, TRV-7) : **☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute la base : feuille Informations (entité, audit), évaluation de chaque point avec cotation et preuves, règles, plan d'actions), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

### Changements
- Socle 1.8.0 (au lieu de 1.7.1).
- `xlsx.js` : version commune des modules WerbSMSI (dates au format date d'Excel, listes déroulantes, feuilles masquées).

### Développement
- Test `tests/test_bandeau.py` ; `tests/test_theme.py` : socle 1.8.0.

## [1.2.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5, socle 1.7.1) : bouton 🖥️ / ☀️ / 🌙 du bandeau — **Auto** (suit Windows, par défaut), **Clair**, **Sombre** ; thème reçu du portail WerbSMSI dans le lien d'ouverture. Rien n'est mémorisé ; impression et exports toujours en clair.

### Changements
- Socle 1.7.1 (au lieu de 1.5.0) et lecteur de guides 1.2.0 (thème sombre du lecteur, charte §7.4).
- `style.css` : les couleurs écrites en dur passent en variables. Variables communes complétées (`--navy-fond` pour le bandeau et le bouton principal, `--info-bg`, `--th`, `--champ`) ; variables propres au module avec leur valeur sombre : titres de thématique (dégradé sous texte blanc, `--degrade-fin`, pastilles `--bandeau-puce`), mention « EE » (`--ee-bg`, `--ee`), description des règles (`--desc-bg`), boutons de cotation, fiches de points, barres ; notifications sur teintes fixes.
- Cotations OK / PL+ / PL− / NC / N/A : couleurs inchangées dans les deux thèmes, sous texte blanc.
- Pourcentages de couverture : texte sur les couleurs d'état communes (`--ok`, `--warn`, `--ko`), lisibles en sombre.
- Fenêtres : texte sur la couleur de la carte (lisible en sombre).

### Développement
- Test `tests/test_theme.py` : base d'exemple avec Windows en sombre puis en clair, chaque entrée du menu (guide compris) sans fond clair ni texte sombre en sombre, cotations inchangées, valeurs claires inchangées, cycle du bouton, impression en clair, rien dans le stockage du navigateur.

## [1.1.0] — 2026-10

### Ajouts
- **Verrou commun des bases** (socle 1.5.0, charte §5.7) : à l'ouverture d'une base déjà ouverte par un collègue, choix entre **lecture seule** et **prise de main** ; bandeau permanent « 🔒 Ouvert par Prénom NOM depuis 14:32 » dans l'en-tête. Le fichier est relu à chaque enregistrement, au retour sur l'onglet et chaque minute : si un collègue a pris la main, le bandeau l'indique et l'enregistrement demande confirmation avant de remplacer son travail. Le verrou est retiré à la fermeture et expire 12 h après le dernier enregistrement.
- En lecture seule, les modifications restent possibles en mémoire, mais l'enregistrement demande de reprendre la main (« Enregistrer sous » produit une copie).

### Développement
- `socle.js` 1.5.0 de la charte WerbSMSI.

## [1.0.0] — 2026-10

### Ajouts
- Création du module (rubrique Conformité & exigences, niveaux groupe et site) à partir du classeur « Règles et audits NIS2 » : 20 règles NIS2 (lien NIS1, objet), 28 thématiques et 152 points de contrôle, dont 16 propres aux entités essentielles.
- Fiche **Entité et site** (statut NIS2, secteur, contacts, activités, SIR, exclusions, audit) ; **20 règles** avec état actuel et reste à faire ; **grille d'audit** cotée OK / PL + / PL − / NC / N/A avec commentaire et preuves ; **couverture** par thématique et par règle ; **plan d'actions** ; **rapport** imprimable ; journal.
- Rattachement à l'espace WerbSMSI (groupe ou site), ouverture depuis le portail, base d'exemple fictive (site LYON).
- Outils : `outils/extraire_referentiel.py` (référentiel depuis le classeur, sans les évaluations), `outils/exemples.py` ; test Playwright `tests/test_parcours.py`.

### Format de données
- `WERBNIS2`, schéma 1.

---

WerbNIS2 — Développé par @WerbHat
