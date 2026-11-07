# Changelog — WerbNIS2

Toutes les évolutions notables de WerbNIS2 sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).



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
