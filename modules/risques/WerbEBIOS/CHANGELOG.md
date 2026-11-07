# Changelog — WerbEBIOS

Toutes les évolutions notables de WerbEBIOS sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).


## [1.9.0] — 2026-11

### Ajouts
- **Publication au site** (EBI-2, pour WerbPCR PCR-14) : `site:valeursMetier` (identifiant préfixé par la référence de l'étude, nom, nature, description courte) et, pour chaque bien support de `site:biensSupports`, les **valeurs métier qu'il porte** (`valeursMetier`, identifiants préfixés). WerbPCR en déduit les valeurs métier de chaque système d'information : celles des biens supports qui contiennent un actif du SI.

### Changements
- `site:valeursMetier` ajouté aux objets publiés (`module.json`) ; textes de la publication du site complétés.

### Format de données
- Publication du site : objet `valeursMetier` et champ `valeursMetier` des biens supports ajoutés (additif). La base de l'analyse ne change pas.

## [1.8.0] — 2026-10

### Ajouts
- **Atelier 3 › Parties prenantes** : les prestataires évalués dans WerbPresta (`site:evaluationsPrestataires`, PRE-8), reçus avec l'inventaire du site, **proposent** la **maturité cyber** (score ≥ 80 % : niveau maximal ; ≥ 60 % : un cran dessous ; ≥ 40 % : deux crans ; sinon 1) et la **confiance** (écart en retard : 1 ; certifié sans écart ouvert : maximal ; ≤ 2 écarts ouverts : un cran dessous ; sinon deux crans) ; **Appliquer** à la partie prenante choisie (proposée par son nom) ou **créer** la partie prenante (catégorie déduite du type) ; rien n'est appliqué sans action ; origine tracée au journal.
- Intégration WerbSMSI : *Charger les actifs et les SI publiés par WerbMap et les prestataires de WerbPresta* (`inventaire.prestataires`).

### Changements
- `site:evaluationsPrestataires` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_prestataires.py`.

## [1.7.0] — 2026-10

### Ajouts
- **Critères de sécurité** d'un événement redouté (Disponibilité, Intégrité, Confidentialité, Traçabilité ; plusieurs) et **besoin de sécurité**, coté sur une nouvelle échelle **« Besoin de sécurité »** (Base › Échelles et matrice : 1 Faible, 2 Modéré, 3 Fort, 4 Très fort, libellés et descriptions modifiables). Colonnes du tableau, de la fiche, du rapport Word (2.4) et de l'export Excel (EBI-1).
- **Publication au site de `site:evenementsRedoutes`** : identifiant préfixé par l'étude, valeur métier (identifiant et nom), description, critères, besoin, impacts, gravité, référence du groupe ; ER archivés exclus ; ni scénario, ni chemin d'attaque, ni justification. Lu par WerbPCR (périmètre métier du plan de cybersécurité et de reprise).
- Au groupe, l'échelle `besoins` est publiée avec les autres échelles, et chaque ER avec ses critères et son besoin ; **⇩ Reprendre du groupe** les reprend au site (le groupe fait foi ; un ER du groupe sans critères garde la saisie du site).

### Format de données
- Champs `criteres` et `besoin` des ER, échelle `echelles.besoins` ; schéma inchangé (1). Une analyse antérieure s'ouvre sans perte : échelle par défaut, champs vides.

### Développement
- Test `tests/test_evenements.py` ; analyses d'exemple et générateur `outils/exemples.py` complétés (critères et besoins, données fictives).


## [1.6.0] — 2026-10

### Ajouts
- **Sélection multiple et archivage** (TRV-4, charte §7.7) dans les tableaux des ateliers 1 à 5 (valeurs métier, biens supports, événements redoutés, sources de risque, parties prenantes, scénarios stratégiques et opérationnels, mesures…) et la vue « Risques et traitement » : case par ligne, « tout sélectionner », barre **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer**, **✕ Désélectionner**. Une ligne archivée est déplacée dans la réserve de la base (`archives`, date et auteur) : hors cartographie, risques publiés (`site:syntheseRisques`), biens supports publiés, tableau de bord et rapport ; ses liens sont gardés et reviennent au désarchivage. La vue « Risques et traitement » partage les données des scénarios opérationnels et n'offre pas la suppression.
- **Chercher / remplacer** (TRV-5) : colonne de texte libre choisie (ou toutes), aperçu avant d'appliquer ; identifiants, listes de choix et dates exclus.
- **Largeur des colonnes à la souris** (TRV-6) : poignée au bord des en-têtes, double-clic pour la largeur automatique ; largeurs enregistrées dans la base (`largeurs`), « ↔ Largeurs par défaut ».

### Changements
- Mentions de **WerbIEC62443** (ex-WerbTools_IEC62443, renommé pour suivre WerbNIS2) dans l'aide et la documentation.
- Socle 1.9.0 (au lieu de 1.8.0).

### Développement
- Test `tests/test_tables.py`.

## [1.5.0] — 2026-10

### Ajouts
- **Bandeau commun** (charte §7.6, socle 1.8.0, TRV-7) : **☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute l'analyse : feuille Informations puis une feuille par tableau des ateliers (missions, valeurs métier, biens supports, événements redoutés, socle, couples SR/OV, parties prenantes, scénarios, risques, mesures…)), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

### Changements
- Socle 1.8.0 (au lieu de 1.7.1).
- `xlsx.js` : version commune des modules WerbSMSI (dates au format date d'Excel, listes déroulantes, feuilles masquées).

### Développement
- Test `tests/test_bandeau.py` ; `tests/test_theme.py` : socle 1.8.0.

## [1.4.0] — 2026-10

### Ajouts
- **Systèmes d'information de WerbMap** (MAP-7.4, objet `site:si`) : chargés avec les actifs (**⟳ Charger les actifs et les SI publiés par WerbMap**) et copiés dans l'analyse. Carte « Systèmes d'information (WerbMap) » d'Intégration WerbSMSI : D / I / C et actifs de chaque SI, **Créer le bien support** (type *Système (ensemble)*, nom, actifs et description repris du SI, référence du SI gardée) puis **Mettre à jour** quand le nom ou les actifs du SI ont changé (écart signalé « à mettre à jour »). Création et mise à jour tracées au journal. Fiche d'un bien support : champ « SI WerbMap ».

### Changements
- **Publication `site:syntheseRisques`** : chaque risque porte les **biens supports visés** (`biensSupports`, identifiants publiés) et les **TAG de leurs actifs** (`actifs`). WerbMap 1.13 rattache ainsi les risques à ses fiches SI. Les scénarios restent dans l'analyse.

### Développement
- `tests/test_parcours.py` : SI listé, bien support créé depuis le SI (enregistré avec sa référence, journal), risques publiés avec leurs biens supports et leurs actifs.

## [1.3.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5, socle 1.7.1) : bouton 🖥️ / ☀️ / 🌙 du bandeau — **Auto** (suit Windows, par défaut), **Clair**, **Sombre** ; thème reçu du portail WerbSMSI dans le lien d'ouverture. Rien n'est mémorisé ; impression et exports toujours en clair.

### Changements
- Socle 1.7.1 (au lieu de 1.5.0) et lecteur de guides 1.2.0 (thème sombre du lecteur, charte §7.4).
- `style.css` : les 72 couleurs écrites en dur passent en variables, avec leur valeur sombre. Tons de risque 1 (vert) à 4 (rouge) en fond, bordure et texte (`--r1-bg` … `--r4-t`) : cases de la cartographie, bandeaux de gravité et de vraisemblance, tuiles d'échelle, jalons, phases d'attaque ; textes de niveau, étiquettes, planning, pastilles. Variables communes complétées (`--navy-fond`, `--info-bg`, `--th`, `--champ`) ; notifications sur teintes fixes.
- Pastilles de niveau (1 à 4, sous texte blanc) : couleurs inchangées dans les deux thèmes, en variables (`--niv1` … `--niv4`).
- Cartographie de l'écosystème (SVG) : zones et libellés sur les tons de risque, lisibles en sombre ; points des parties prenantes inchangés.
- Titres colorés des catalogues et de la base de connaissances : `WerbSocle.teinteCss`, qui suit le thème, au lieu de `WerbSocle.TEINTES`.

### Développement
- Test `tests/test_theme.py` : analyse d'exemple avec Windows en sombre puis en clair, les 31 entrées du menu (guides compris) sans fond clair ni texte sombre en sombre, case de niveau 1 de la cartographie et zone de veille de l'écosystème dans les deux thèmes, pastilles de niveau inchangées, valeurs claires inchangées, cycle du bouton, impression en clair, rien dans le stockage du navigateur.

## [1.2.0] — 2026-10

### Ajouts
- **Verrou commun des bases** (socle 1.5.0, charte §5.7) : à l'ouverture d'une base déjà ouverte par un collègue, choix entre **lecture seule** et **prise de main** ; bandeau permanent « 🔒 Ouvert par Prénom NOM depuis 14:32 » dans l'en-tête. Le fichier est relu à chaque enregistrement, au retour sur l'onglet et chaque minute : si un collègue a pris la main, le bandeau l'indique et l'enregistrement demande confirmation avant de remplacer son travail. Le verrou est retiré à la fermeture et expire 12 h après le dernier enregistrement.
- En lecture seule, les modifications restent possibles en mémoire, mais l'enregistrement demande de reprendre la main (« Enregistrer sous » produit une copie).

### Développement
- `socle.js` 1.5.0 de la charte WerbSMSI.
- `guides.js` 1.1.0 de la charte (copie conforme) : sans effet sur les guides plats du module.

## [1.1.0] — 2026-10

### Ajouts
- **Guides d'accompagnement** dans le menu **❓ Aide** (charte §7.4) : guide méthodologique EBIOS RM, cadrage de l'analyse, matrices des ateliers, évaluation du socle de sécurité, rapport d'analyse, plan de traitement, registre des risques, checklist qualité. Chacun s'affiche en mode lecture : étapes numérotées, sommaire cliquable, tableaux, cases à cocher, document précédent et suivant. Les guides sont aussi présentés sur la page *Guide du module* et sur l'écran d'accueil, sans analyse ouverte.
- Les guides sont les fichiers Markdown du dossier `guides/` du module, signés en première ligne : les modifier, en ajouter ou en retirer, puis reconstruire (`python sources/build.py`). L'ordre suit le nom des fichiers (`1-…`, `2-…`).

### Développement
- Composant `guides.js` 1.0.0 de la charte WerbSMSI (copie conforme auditée).

## [1.0.0] — 2026-10

Première version : module **Analyse des risques** de WerbSMSI, aux niveaux groupe et site (charte 1.0).

### Ajouts
- Les **5 ateliers EBIOS Risk Manager** : cadrage, missions, valeurs métier, biens supports, événements redoutés, socle ; couples SR/OV et pertinence ; parties prenantes (menace, zones), cartographie de l'écosystème, scénarios stratégiques ; scénarios opérationnels avec séquence Connaître / Rentrer / Trouver / Exploiter ; traitement, mesures du PACS, risques résiduels.
- Référentiel **MITRE ATT&CK** Enterprise et ICS (plus de 110 techniques, rattachées aux phases EBIOS), consultable et proposé dans les séquences d'attaque.
- Page **Couples SR/OV** : échelles de motivation, ressources et activité en tuiles ; catalogues numérotés des sources de risque (SR) et objectifs visés (OV), prédéfinis et complétables ; création de plusieurs couples d'un coup (un par objectif coché, doublons refusés) ; récapitulatif ; liaison événements redoutés ↔ couples.
- Page **Parties prenantes** : bandeau des échelles de dépendance, pénétration, maturité et confiance, et formule de menace avec les seuils de l'analyse ; libellés des cotations dans le tableau et dans Base › Échelles.
- Page **Scénarios opérationnels** : modes opératoires (Connaître → Rentrer → Trouver → Exploiter) et bandeau de l'échelle de vraisemblance (V1 à V4, nombre de scénarios par niveau).
- Page **Risques et traitement** : cartographie compacte gravité × vraisemblance avec la liste des risques (bascule brut / résiduel) et échelle des jalons du PACS (J1 court terme, J2 moyen terme, J3 long terme) ; champ **Jalon** des mesures, repris dans le rapport Word.
- Page **Aide › Base de connaissances** : sources de risque, objectifs visés, types de valeurs métier (liste enrichie, proposée dans le champ Nature), échelles de gravité, vraisemblance, parties prenantes et couples SR/OV, types d'impacts, de biens supports, de parties prenantes, phases d'attaque, types de mesures et jalons du PACS.
- Page Événements redoutés : bandeau de l'échelle de gravité (G1 Mineure à G4 Critique, description au survol, nombre d'événements par niveau).
- Échelles, matrice de risque et seuils de l'écosystème modifiables ; cartographies des risques avant / après traitement ; tableau de bord et points d'attention.
- **Rapport Word** complet et signé (bibliothèque docx embarquée), exports CSV ; habillage par le **modèle Word d'entreprise** (en-tête, pied de page, logo, marges, styles, balises `{{…}}`), commun aux modules : repris du dossier `modeles/` de l'espace ou chargé depuis un fichier, et copié dans l'analyse.
- Intégration WerbSMSI : publication du groupe (échelles, valeurs métier, événements redoutés, couples retenus) ; au site, reprise du groupe et du socle de WerbGouvernance, biens supports reliés aux actifs WerbMap, publication des biens supports et de la synthèse des risques.
- Menu latéral commun (socle 1.4.0), menu ❓ Aide, ouverture depuis le portail (`ouvertureParLien`), analyse d'exemple intégrée.
- Analyses d'exemple fictives (groupe et site LYON), test de parcours Playwright / Edge (36 contrôles).

### Format de données
- `WERBEBIOS`, schéma 1, enveloppe WerbSMSI.

---

WerbEBIOS — Développé par @WerbHat
