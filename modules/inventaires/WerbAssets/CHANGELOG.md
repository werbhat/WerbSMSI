# Changelog — WerbAssets

Toutes les évolutions notables de WerbAssets sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).




## [1.9.0] — 2026-11

### Ajouts
- **Versions de la base** : chaque enregistrement crée une version (numéro croissant, date, auteur, **commentaire obligatoire**, nombre de modifications). Fenêtre du commentaire pré-remplie avec le résumé des modifications (nombre et TAG concernés), à compléter ou valider ; commentaire vide refusé ; annulation sans écriture ; échec d'enregistrement : version et numérotation annulées.
- **⚙️ Base › Historique**, qui remplace l'entrée Journal (même présentation que WerbMap) : versions enregistrées (« ● en cours » pour les modifications non enregistrées), puis journal des modifications avec colonne Version, filtre par version et recherche ; un clic sur une version filtre le journal.
- Export Excel de toute la base : feuille Versions ; version courante dans la feuille Informations.

### Format de données
- Additif : `versions` (`v`, `date`, `par`, `commentaire`, `changements`) dans les données, `version` sur les entrées du journal. Une base antérieure s'ouvre en version 0, sans migration.

### Développement
- Test `tests/test_versions.py` ; les tests qui enregistrent valident la fenêtre du commentaire.

## [1.8.0] — 2026-11

### Ajouts
- **Position dans la baie (U)** : nouveau champ de la fiche (*Informations générales*) et colonne « Position (U) » en fin de ligne des listes Pare-feu, Switch et Autres assets, saisie sur place sans ouvrir la fiche (fiche créée au besoin) ; imprimée, exportée et importée avec les classeurs Excel ; journal.
- **⇩ VLAN de WerbMap** dans les fiches switch (VLAN configurés) et pare-feu (interfaces de type VLAN) : choix dans une fenêtre (VLAN de la zone de l'asset en tête, VLAN déjà présents grisés, tout cocher) ; une ligne de même ID VLAN est complétée, jamais remplacée ; pare-feu : CIDR et passerelle à saisir (WerbMap ne publie pas l'adressage). L'ajout manuel reste possible.
- Intégration WerbSMSI : `site:vlans` (WerbMap 1.23.0) reçu avec l'inventaire et copié dans la base ; une publication antérieure, sans VLAN, reste lue (bouton désactivé).

### Changements
- `site:vlans` ajouté aux objets lus (`module.json`).

### Format de données
- Additif : `inventaire.vlans` (ID, nom, réseau, zone, statut, couche, isolé) et champ `positionU` des fiches.

### Développement
- Test `tests/test_vlans_position.py`.

## [1.7.0] — 2026-11

### Ajouts
- **Guides d'accompagnement** (charte §7.4) : lecteur commun `guides.js` (guides 1.2.0) ; une entrée par guide dans **❓ Aide**, cartes dans la page *Guide du module* et sur l'accueil (lisibles sans base ouverte).
- **Guide « Maîtriser et durcir les assets du site »** (AST-7) : une configuration ou un raccordement de baie mal connus allongent toujours le RTO (étapes de la reprise, situations courantes, ordre de grandeur illustratif, cas d'une cyberattaque, ce que « connaître un asset en profondeur » veut dire) ; ce que signifie durcir un asset (domaines et mesures, particularités industrielles, IEC 62443-4-2 et 3-3, guides ANSSI) ; durcir dès la première configuration (comparaison mise en service / production, procédure en 8 étapes reliée à la procédure de sécurisation des fiches, exigence envers les intégrateurs, durcissement d'un équipement déjà en production) ; bien tenir WerbAssets (principes, check-list de mise en service, copie papier de la baie, saisie terrain, revue périodique, liens avec WerbMap, WerbPCR, WerbExploitation, WerbRecette, WerbPresta).

### Changements
- `module.json › sources` : `guides.js` ajouté.

### Développement
- Test `tests/test_guides.py`.

## [1.6.0] — 2026-10

### Ajouts
- **Sélection multiple et archivage** (TRV-4, charte §7.7) dans la liste des bandeaux d'une baie (Brassage) et les tableaux des fiches (interfaces, VLAN, ports, raccordements ; sélection et suppression, sans archivage) : case par ligne, « tout sélectionner », barre **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer**, **✕ Désélectionner**. Une ligne archivée est déplacée dans la réserve de la base (`archives`, date et auteur) : le bandeau archivé, avec ses raccordements, sort du brassage, de l'impression de la baie, des classeurs Excel et des listes ; son TAG reste réservé, et le désarchivage est refusé si un bandeau actif l'a repris. Les listes Pare-feu, Switch, Autres assets et Inventaire WerbMap reçoivent seulement le réglage des largeurs (les actifs viennent de WerbMap).
- **Chercher / remplacer** (TRV-5) : colonne de texte libre choisie (ou toutes), aperçu avant d'appliquer ; identifiants, listes de choix et dates exclus.
- **Largeur des colonnes à la souris** (TRV-6) : poignée au bord des en-têtes, double-clic pour la largeur automatique ; largeurs enregistrées dans la base (`largeurs`), « ↔ Largeurs par défaut ».

### Changements
- Socle 1.9.0 (au lieu de 1.8.0).

### Développement
- Test `tests/test_tables.py`.

## [1.5.1] — 2026-10

### Corrections
- **🖨 PDF du bandeau** : imprimait une page blanche. La feuille d'impression masquait toujours l'application pour n'imprimer que les fiches et étiquettes préparés ; elle n'imprime plus ceux-ci que s'ils existent, sinon la page affichée (sans bandeau, menu ni boutons).

### Développement
- `tests/test_bandeau.py` : impression contrôlée en mode impression (page affichée visible, rapport préparé seul imprimé).

## [1.5.0] — 2026-10

### Ajouts
- **Bandeau commun** (charte §7.6, socle 1.8.0, TRV-7) : **☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute la base : les classeurs de saisie de chaque type réunis, une feuille par table, après une feuille Informations), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

### Changements
- Socle 1.8.0 (au lieu de 1.7.1).
- `xlsx.js` : version commune des modules WerbSMSI (dates au format date d'Excel, listes déroulantes, feuilles masquées).

### Développement
- Test `tests/test_bandeau.py` ; `tests/test_theme.py` : socle 1.8.0.

## [1.4.0] — 2026-10

### Ajouts
- **Supprimer une baie** (AST-1) : bouton rouge « 🗑 Supprimer baie » entre « + Baie » et « + Bandeau », pour une baie créée dans WerbAssets, **avec ses bandeaux et leurs raccordements** ; confirmation qui les dénombre, journal (une ligne par bandeau et pour la baie). Désactivé pour un coffret de l'inventaire WerbMap (à retirer dans WerbMap) et en lecture seule. Remplace l'ancien bouton, réservé aux baies vides.
- **Repère fil/brin** (AST-6) : colonne des raccordements après « Repère câble liaison » ; écran, impression, modèle de saisie, export et import Excel ; un classeur sans cette colonne s'importe sans erreur.

### Changements
- **Ports d'un switch** (AST-4) : fond de ligne vert clair (ACTIF) ou rouge pâle (BLOQUÉ) au lieu du gris des ports bloqués ; variables `--ok-bg` / `--ko-bg` (thèmes clair et sombre), à l'impression aussi ; légende sous le tableau.
- **Colonnes N°** des ports et des raccordements (AST-2) : largeur d'un numéro jusqu'à 100 (environ 50 px au lieu de 92).
- Identification de la fiche : mention « en lecture seule : zone, baie, marque, modèle se corrigent dans WerbMap » (AST-3).

### Format de données
- Champ `repereFil` facultatif sur les raccordements ; schéma inchangé, les bases existantes s'ouvrent sans modification.

### Développement
- Test `tests/test_lot_a.py`.

## [1.3.0] — 2026-10

### Ajouts
- **Correspondance avec WerbMap** (MAP-6) : modèle, version firmware et commentaire de l'inventaire WerbMap (`site:actifs` : `modele`, `firmware`, `commentaire`, WerbMap 1.11.0) affichés en lecture seule dans l'identification de la fiche et sur la fiche imprimée, copiés avec l'identité pour les fiches orphelines.
- Écart entre la fiche (Modèle, Version / firmware) et WerbMap signalé dans un encadré ; **⇩ Reprendre de WerbMap** copie les valeurs dans la fiche, avec confirmation quand une valeur saisie est remplacée, une ligne de journal par champ.
- Liste des assets : Modèle de la fiche, à défaut celui de WerbMap.

### Développement
- Test `tests/test_correspondance.py`.

## [1.2.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5, socle 1.7.1) : bouton 🖥️ / ☀️ / 🌙 du bandeau — **Auto** (suit Windows, par défaut), **Clair**, **Sombre** ; thème reçu du portail WerbSMSI dans le lien d'ouverture. Rien n'est mémorisé ; impression et exports toujours en clair.

### Changements
- Socle 1.7.1 (au lieu de 1.6.0).
- `style.css` : les couleurs écrites en dur passent en variables. Variables communes complétées (`--navy-fond` pour le bandeau et le bouton principal, `--info-bg`, `--th`, `--champ`) ; variables propres au module avec leur valeur sombre : onglets de zone et de baie, survol des listes, port bloqué, rubriques, encadrés, voile des fenêtres ; notifications sur teintes fixes.
- Repères d'état des interfaces et des ports (en service, réservé, en cours) : couleurs du classeur inchangées dans les deux thèmes, en variables (`--etat-service`, `--etat-reserve`, `--etat-cours`), légende comprise.
- Procédure de sécurisation : les contrôles fait / à faire / sans objet gardent leur couleur en sombre (socle 1.7.1).
- Fenêtres : texte sur la couleur de la carte (lisible en sombre).

### Développement
- Test `tests/test_theme.py` : base d'exemple avec Windows en sombre puis en clair, chaque entrée du menu et la fiche d'un pare-feu sans fond clair ni texte sombre en sombre, contrôle « fait » de la procédure coloré dans les deux thèmes, valeurs claires inchangées, cycle du bouton, impression en clair, rien dans le stockage du navigateur.
- Règle `.logo` inutilisée retirée (le logo vient du socle).

## [1.1.0] — 2026-10

### Ajouts
- **⚙️ Base › Référentiels** : les listes de choix des types de port des switch, des types de port des bandeaux et des types de lien WAN, auparavant écrites dans le code, se modifient dans la base (une valeur par ligne, modifications au journal). Elles alimentent les champs des fiches, la création d'un bandeau et les listes déroulantes des classeurs Excel.
- **Listes de choix du groupe** (charte §5.9, socle 1.6.0) : ces trois listes sont déclarées dans `module.json › listes` et reçoivent les valeurs publiées par le groupe (`groupe:listes`, portail WerbSMSI 1.4.0).
  - Fusion **automatique** à l'ouverture de la base, au rattachement au site, à l'actualisation de l'inventaire et à l'ouverture de l'espace : valeurs ajoutées par le groupe, valeurs propres au site conservées, valeur retirée par le groupe mais employée (ports, bandeaux, fiches pare-feu) conservée et signalée ⚠ avec son nombre d'emplois.
  - Valeurs 🏢 du groupe affichées à part, **non modifiables** ; la zone de saisie ne contient que les valeurs 📍 propres au site ; une liste ne peut pas être vidée.
  - **Remplacements proposés** (valeur renommée par le groupe, autre écriture d'une valeur du groupe) : bouton *Remplacer*, emploi par emploi au journal.
  - Copie des valeurs du groupe gardée dans la base (`data.listesGroupe`) pour travailler sans l'espace.

### Développement
- `socle.js` 1.6.0 de la charte WerbSMSI.
- Test `tests/test_listes.py`.

## [1.0.0] — 2026-10

Première version, module **Inventaires ICS** au niveau site, d'après le classeur « Fiche configuration asset ».

### Ajouts
- **Assets par type et par zone** : menu Pare-feu, Switch, Brassage, Autres assets ; onglets par zone publiée par WerbMap (« Sans zone » en dernier) ; tableau TAG, libellé, emplacement, marque, modèle, avancement de la fiche et de la sécurisation. Catégorie déduite du type WerbMap, modifiable fiche par fiche. Assets hors inventaire.
- **Fiche pare-feu** : informations générales, accès WAN, interfaces et VLAN (masque déduit du CIDR, génération Ethernet 1…N), autres infos, filtrage URL.
- **Fiche switch** : interface d'administration, VLAN, ports (génération d'après le nombre de ports RJ45 et SFP, ports bloqués par défaut), guide et annexes.
- **Procédure de configuration et de sécurisation** (23 points en 8 étapes) pour les pare-feu et les switch : fait, à faire, non applicable, valeur ou commentaire.
- **Fiche générique** des autres actifs réseau.
- **Brassage** : onglets par baie (coffrets WerbMap et baies saisies), bandeaux RJ45 et fibre, raccordement port par port.
- **Saisie Excel** : un classeur par type (modèle de saisie ou export des fiches), feuille « Mode d'emploi », listes déroulantes ; import avec rapport (créations, mises à jour, rejets motivés, avertissements, CSV) en mode « compléter » ou « remplacer les tableaux ».
- **Impression / PDF** d'une fiche, des fiches d'un onglet de zone, d'un bandeau ou d'une baie.
- **Fiches orphelines** : la fiche d'un actif retiré de WerbMap est conservée avec la dernière identité connue.
- Tableau de bord (par type, par zone, points d'attention), journal, intégration WerbSMSI (rattachement au site, chargement de l'inventaire depuis l'espace ou d'un fichier de publication), ouverture depuis le portail, base d'exemple fictive LYON.

### Développement
- `xlsx.js` : lecture et écriture `.xlsx` sans bibliothèque.
- `tests/test_parcours.py` (Playwright, Edge) : 43 contrôles.

### Format de données
- `WERBASSETS`, schéma 1.

---

WerbAssets — Développé par @WerbHat
