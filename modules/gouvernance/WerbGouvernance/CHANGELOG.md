# Changelog — WerbGouvernance

Toutes les évolutions notables de WerbGouvernance sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).



## [1.8.0] — 2026-11

### Ajouts
- **Guide « Élaborer la politique de sécurité (PSSI) »** (`guides/2-Elaborer_la_PSSI.md`), dans ❓ Aide : démarche en quatre phases du guide d'élaboration de PSSI de l'ANSSI (DCSSI, 2004), reformulée et mise à jour (ISO/IEC 27001 et 27002:2022, NIS2, RGPD, CRA, IEC 62443) — organisation du projet et note de cadrage ; éléments stratégiques (périmètre, enjeux, obligations, échelle de besoins alignée sur l'échelle EBIOS, besoins par domaine d'activité, menaces retenues et non retenues) et note de stratégie ; catalogue de principes modernisé en 16 domaines (dont systèmes industriels et prestataires), rédaction de règles précises, applicables, vérifiables et graduées (essentiel, renforcé), synthèses des règles et des impacts ; finalisation (relecture, plan type, signature, diffusion, plan d'action) ; vie de la PSSI et déclinaison par site ; erreurs fréquentes et check-list. Exemples industriels ; renvois vers les modules WerbSMSI. Premier pas de l'assistant PSSI prévu (GOU-1 à GOU-5).

## [1.7.0] — 2026-11

### Ajouts
- **Guides d'accompagnement** (charte §7.4) : lecteur commun `guides.js` (guides 1.2.0) ; une entrée par guide dans **❓ Aide**, cartes dans la page *Guide du module* et sur l'accueil (lisibles sans base ouverte).
- **Guide de débutant « Piloter la sécurité du groupe sans être expert »** (`guides/1-Piloter_le_SMSI.md`) : le SMSI et sa roue (planifier, faire, vérifier, agir), les rôles, la politique et le périmètre, le socle de mesures, les procédures, la revue de direction et le plan d'actions, les questions que le dirigeant doit suivre, erreurs fréquentes, prise en main du module.

### Changements
- `module.json › sources` : `guides.js` ajouté.

### Développement
- Test `tests/test_guides.py`.

## [1.6.0] — 2026-10

### Ajouts
- **Formation et sensibilisation** (ACA-10) : indicateurs publiés par WerbAcademie (`groupe:formations`, aucun nom) lus dans l'espace — carte du tableau de bord (taux de formations à jour par site et du groupe, à renouveler, en retard, jamais suivies, dirigeants à jour, sessions de l'année).
- **Revue de direction** : les indicateurs sont proposés comme **élément d'entrée** (ISO/IEC 27001 § 9.3) et s'ajoutent en un clic aux éléments d'entrée de la revue la plus récente (journalisé) ; déjà ajoutés : signalé.

### Changements
- `groupe:formations` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_formation.py`.

## [1.5.0] — 2026-10

### Ajouts
- **Sélection multiple et archivage** (TRV-4, charte §7.7) dans les rôles, le socle de mesures, les prestataires, le catalogue des procédures, les revues de direction et le plan d'actions : case par ligne, « tout sélectionner », barre **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer**, **✕ Désélectionner**. Une ligne archivée est déplacée dans la réserve de la base (`archives`, date et auteur) : hors publication pour les sites (socle, rôles, prestataires), alertes, tableau de bord et compteurs ; une procédure archivée garde ses fiches.
- **Chercher / remplacer** (TRV-5) : colonne de texte libre choisie (ou toutes), aperçu avant d'appliquer ; identifiants, listes de choix et dates exclus.
- **Largeur des colonnes à la souris** (TRV-6) : poignée au bord des en-têtes, double-clic pour la largeur automatique ; largeurs enregistrées dans la base (`largeurs`), « ↔ Largeurs par défaut ».

### Changements
- Mentions de **WerbIEC62443** (ex-WerbTools_IEC62443, renommé pour suivre WerbNIS2) dans l'aide et la documentation.
- Socle 1.9.0 (au lieu de 1.8.0).

### Développement
- Test `tests/test_tables.py`.

## [1.4.0] — 2026-10

### Ajouts
- **Bandeau commun** (charte §7.6, socle 1.8.0, TRV-7) : **☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute la base : feuille Informations (organisation, politique), rôles, socle de mesures, prestataires, catalogue et fiches de procédure, revues, plan d'actions), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

### Changements
- Socle 1.8.0 (au lieu de 1.7.1).
- `xlsx.js` : version commune des modules WerbSMSI (dates au format date d'Excel, listes déroulantes, feuilles masquées).

### Développement
- Test `tests/test_bandeau.py` ; `tests/test_theme.py` : socle 1.8.0.

## [1.3.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5, socle 1.7.1) : bouton 🖥️ / ☀️ / 🌙 du bandeau — **Auto** (suit Windows, par défaut), **Clair**, **Sombre** ; thème reçu du portail WerbSMSI dans le lien d'ouverture. Rien n'est mémorisé ; impression et exports toujours en clair.

### Changements
- Socle 1.7.1 (au lieu de 1.5.0).
- `style.css` : les couleurs écrites en dur passent en variables. Variables communes complétées (`--navy-fond` pour le bandeau et le bouton principal, `--info-bg`, `--th`, `--champ`) ; variables propres au module avec leur valeur sombre : rubriques, encadrés, voile des fenêtres ; fiche de procédure sur la couleur des cartes ; notifications sur teintes fixes.
- Fenêtres : texte sur la couleur de la carte (lisible en sombre).

### Développement
- Test `tests/test_theme.py` : base d'exemple avec Windows en sombre puis en clair, chaque entrée du menu sans fond clair ni texte sombre en sombre, fiches de procédure, valeurs claires inchangées, cycle du bouton, impression en clair, rien dans le stockage du navigateur.

## [1.2.0] — 2026-10

### Ajouts
- **Verrou commun des bases** (socle 1.5.0, charte §5.7) : à l'ouverture d'une base déjà ouverte par un collègue, choix entre **lecture seule** et **prise de main** ; bandeau permanent « 🔒 Ouvert par Prénom NOM depuis 14:32 » dans l'en-tête. Le fichier est relu à chaque enregistrement, au retour sur l'onglet et chaque minute : si un collègue a pris la main, le bandeau l'indique et l'enregistrement demande confirmation avant de remplacer son travail. Le verrou est retiré à la fermeture et expire 12 h après le dernier enregistrement.
- En lecture seule, les modifications restent possibles en mémoire, mais l'enregistrement demande de reprendre la main (« Enregistrer sous » produit une copie).

### Développement
- `socle.js` 1.5.0 de la charte WerbSMSI.

## [1.1.0] — 2026-10

### Changements
- **Menu latéral commun WerbSMSI** (socle 1.3.0, `WerbSocle.menu`) : les vues sont rangées en catégories repliables, avec emoji, chevron et titre sur **fond de couleur**, comme dans WerbMap et les autres modules. Le repli vaut pour la session : rien n'est conservé dans le navigateur.
- `socle.js` 1.4.0 de la charte WerbSMSI.
- **Ouverture depuis le portail** : le portail WerbSMSI affiche une puce par site (et pour le groupe) sous chaque module ; un clic ouvre ce module avec un lien vers la base. Un bouton « Ouvrir … » demande alors un dossier (espace, site ou dossier du module, au choix) puis ouvre la base, enregistrée ensuite à sa place. Déclaré par `module.json › ouvertureParLien`.
- Catégories : 📊 Tableau de bord, 🏛️ Cadre, 📘 Documentation, 🎯 Pilotage, ⚙️ Base.

### Ajouts
- Menu **❓ Aide › Guide du module** : démarrage, enregistrement et emplacement de la base, intégration WerbSMSI, bon à savoir.
- Bouton **🧪 Base d'exemple** sur l'accueil, à côté de *Ouvrir* et *Nouvelle base* : ouvre en mémoire la base d'exemple intégrée au livrable.
- Base d'exemple étoffée et rattachée au groupe de l'espace de démonstration : politique, 5 rôles, 8 mesures du socle, 3 prestataires, 4 procédures et leurs étapes, 2 revues, 5 actions.

### Développement
- Dépôt source reconstitué depuis le paquet 1.0.0 publié (livrable reconstruit identique octet pour octet).
- `tests/test_menu.py` (Playwright pour Python, Edge) : menu commun et absence d'erreur.

## [1.0.0] — 2026-10

Première version : module **Gouvernance SMSI** de WerbSMSI, au niveau du groupe (charte 1.0).

### Ajouts
- Politique et périmètre, rôles, socle de mesures, prestataires sous contrat cadre, catalogue et fiches de procédure (version rédigée imprimable), revues de direction, plan d'actions, journal des modifications.
- Tableau de bord : indicateurs et points d'attention (revues échues, procédures incomplètes, actions en retard, mesures sans référence, rôles sans titulaire).
- Import des procédures et de leurs étapes depuis une base WerbMap (schémas 3 et 4).
- Intégration WerbSMSI : publication du socle de mesures, des rôles et des prestataires cadre ; lecture des synthèses de conformité et de risques des sites ; application du socle par site et création d'une action corrective depuis un écart.
- Base d'exemple fictive, test de parcours Playwright / Edge (24 contrôles).

### Format de données
- `WERBGOUVERNANCE`, schéma 1, enveloppe WerbSMSI.

---

WerbGouvernance — Développé par @WerbHat
