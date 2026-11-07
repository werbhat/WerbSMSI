# Changelog — WerbTools_IEC62443

Toutes les évolutions notables de WerbTools_IEC62443 sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [1.7.0] — 2026-10-25

### Ajouts
- **Verrou commun des bases** (socle 1.5.0, charte §5.7) : à l'ouverture d'une base déjà ouverte par un collègue, choix entre **lecture seule** et **prise de main** ; bandeau permanent « 🔒 Ouvert par Prénom NOM depuis 14:32 » dans l'en-tête. Le fichier est relu à chaque enregistrement, au retour sur l'onglet et chaque minute : si un collègue a pris la main, le bandeau l'indique et l'enregistrement demande confirmation avant de remplacer son travail. Le verrou est retiré à la fermeture et expire 12 h après le dernier enregistrement.
- Remplace le verrou propre au module (même format : les projets existants sont relus) ; la lecture seule bloque toujours l'édition.

### Développement
- `socle.js` 1.5.0 de la charte WerbSMSI.

## [1.6.0] — 2026-10-25

### Ajouts
- **🎯 Cadrage › Note de cadrage** (phase 1 du plan de mise en œuvre) : objectifs, objet de l'évaluation et rôle évalué, parties de la norme visées, livrables et critères d'acceptation, périmètre inclus et exclu, interfaces externes, fiche d'identification du système et contraintes (guide *Modèles et registres* §2), RACI prérempli avec les neuf rôles du plan de mise en œuvre, règles de gestion documentaire. Liste d'avancement et approbation tracée au journal ; un cadrage modifié après approbation est signalé « à approuver de nouveau ».
- **✅ Exigences › Plan de traitement** (phase 5) : actions avec exigence, zones, risque associé, priorité P1 à P4, responsable, ressources, échéance, critère de réussite, et les huit états du modèle de plan de traitement. Clôture refusée sans critère de réussite (date et auteur de clôture tracés), abandon refusé sans justification.
- **Proposer les actions des écarts** : une action par exigence requise au statut « Non supporté » sans action existante ; priorité déduite du SL-T le plus élevé des zones en écart, critère repris des preuves attendues, prestataire repris s'il est unique.
- Fiche d'exigence : bloc *Plan de traitement* avec les actions de l'exigence et « + Action pour cette exigence ».
- Tableau de bord : contrôle qualité « Actions du plan de traitement en retard ».
- Excel : onglets **Cadrage**, **RACI** et **Plan_traitement**, à l'export et à l'import.
- **Note de cadrage en Word et en PDF**, depuis *🎯 Cadrage* ou *Imports / exports* : page de garde avec état d'approbation, objectifs, objet de l'évaluation et parties visées, périmètre (zones et conduits), système étudié, contraintes, RACI, gestion documentaire. Même rendu que le cahier d'exigences : modèle Word de l'entreprise (en-tête, pied de page, marges, balises ; `{{PRESTATAIRE}}` vaut « Équipe projet »), numérotation des pages, signature. Référence `<référence>-CADRAGE`.

### Changements
- Fichier projet : nouvelles clés `data.cadrage` et `data.actions`, ajoutées à l'ouverture des projets existants (schéma 2 inchangé).
- Projet d'exemple : cadrage renseigné et trois actions.

### Développement
- Composant `guides.js` 1.1.0 de la charte WerbSMSI (copie conforme) : sous-dossiers et liens relatifs entre guides ; sans effet sur les guides plats du module.
- `tests/test_cadrage_plan.py` : cadrage, plan de traitement, exports Excel, Word et PDF de la note (31 contrôles).

## [1.5.0] — 2026-10-24

### Ajouts
- **Guides d'accompagnement** dans le menu **❓ Aide** (charte §7.4) : guide de la série IEC 62443, checklist d'audit, plan de mise en œuvre, modèles et registres. Chacun s'affiche en mode lecture : étapes numérotées, sommaire cliquable, tableaux, cases à cocher, document précédent et suivant. Les guides sont aussi présentés sur la page *Guide du module* et sur l'écran d'accueil, sans projet ouvert.
- Accueil : les trois choix (nouveau, ouvrir, exemple) restent dans la largeur de la page.
- Les guides sont les fichiers Markdown du dossier `guides/` du module : les modifier, en ajouter ou en retirer, puis reconstruire (`python sources/build.py`). L'ordre suit le nom des fichiers (`1-…`, `2-…`).

### Développement
- Composant `guides.js` 1.0.0 de la charte WerbSMSI (copie conforme auditée).

## [1.4.0] — 2026-10-24

### Changements
- **Menu latéral commun WerbSMSI** (socle 1.3.0, `WerbSocle.menu`) : les vues sont rangées en catégories repliables, avec emoji, chevron et titre sur **fond de couleur**, comme dans WerbMap et les autres modules. Le repli vaut pour la session : rien n'est conservé dans le navigateur.
- `socle.js` 1.4.0 de la charte WerbSMSI.
- **Ouverture depuis le portail** : le portail WerbSMSI affiche une puce par site (et pour le groupe) sous chaque module ; un clic ouvre ce module avec un lien vers la base. Un bouton « Ouvrir … » demande alors un dossier (espace, site ou dossier du module, au choix) puis ouvre la base, enregistrée ensuite à sa place. Déclaré par `module.json › ouvertureParLien`.
- Catégories : 📊 Pilotage, ✅ Exigences, 🧱 Périmètre, 📚 Bibliothèque, ⚙️ Projet.

### Ajouts
- **Modèle Word commun de l'espace** (charte §7.2) : bouton « ⇩ Modèle commun de l'espace » qui reprend `SMSI_<SIGLE>/modeles/Modele_entete.docx` ; balises communes `{{ORGANISATION}}` et `{{MODULE}}` ; une balise sans valeur est vidée.
- Menu **❓ Aide › Guide du module** : démarrage, enregistrement et emplacement de la base, intégration WerbSMSI, bon à savoir.
- **Niveau groupe** : un projet peut être rattaché au **groupe** (choix « 🏢 Groupe » dans *Intégration WerbSMSI*) pour un référentiel d'exigences commun, rangé dans `groupe/conformite/`. Il affiche l'état du socle de mesures et ne publie rien : la synthèse de conformité reste un objet de site, les prestataires du groupe appartiennent à WerbGouvernance (un seul propriétaire par objet). `portees` : `["groupe", "site"]`.

### Développement
- Dépôt source reconstitué depuis le paquet 1.3.1 publié (livrable reconstruit identique octet pour octet). Les bibliothèques embarquées sont regroupées dans `sources/vendor/bibliotheques.js` (empreinte contrôlée par `build.py`) ; le référentiel embarqué est `sources/src/referentiel.json`.
- `tests/test_menu.py` (Playwright pour Python, Edge) : menu commun sur le projet d'exemple et absence d'erreur.

## [1.3.1] — 2026-10-23

### Corrections
- Import des zones publiées par WerbMap : une zone **sans SL-T** n'est plus importée au niveau SL 1 par défaut, ce qui faussait l'exigibilité des exigences. Elle est signalée (« SL-T non défini : ignorée ») et écartée, avec les conduits qui la concernent ; l'import est tracé au journal avec la liste des zones ignorées.

### Changements
- `socle.js` 1.2.0 de la charte WerbSMSI (publication d'objets uniques, sans effet sur ce module).
- Test de parcours : 30 contrôles (zone sans SL-T, version lue dans `module.json`).

## [1.3.0] — 2026-10-23

Intégration à l'environnement WerbSMSI (charte 1.0), module **Conformité & exigences** au niveau site.

### Ajouts
- Écran **Intégration WerbSMSI** : choix de l'espace `SMSI_<GROUPE>`, rattachement du projet à un site, import des zones et conduits publiés par WerbMap, état du socle de mesures du groupe, bouton **Publier**.
- Publication dans `sites/<CODE>/publications/werbtools-iec62443.json` : prestataires (identifiant, nom, rôle) et synthèse de conformité (taux, compteurs, mesures du socle non appliquées). Seuls les objets du projet publié sont remplacés.
- Indicateur « Site » dans la barre supérieure pour un projet rattaché.
- `module.json`, `CHANGELOG.md`, `SECURITY.md` ; `socle.js` 1.0.0 de la charte WerbSMSI.
- Test de parcours `tests/test_parcours.py` (Playwright pour Python, Edge installé) : 28 contrôles.

### Changements
- Assemblage en **Python seul** : `sources/build.py` n'utilise plus Node.js, npm ni esbuild. Les bibliothèques sont les fichiers officiels figés dans `sources/vendor/`, vérifiés par SHA-256 à chaque assemblage. Le livrable passe de 0,85 à 1,6 Mo (docx n'est plus minifié).
- Le livrable est produit directement dans `application/`, et le projet d'exemple dans `exemples/`.
- `outils_python/` devient `outils/`. L'empreinte est publiée dans `WerbTools_IEC62443.sha256`.
- `meta generator` du livrable porte la version.
- Tous les fichiers sources portent l'en-tête de signature.
- `tests/audit_signature.py` utilise les chemins du dépôt.

### Sécurité
- CSP : `'unsafe-eval'` retiré. Les exports Word, Excel et modèle d'entreprise sont vérifiés sans.
- La purge ne vide plus tout le stockage du navigateur (`localStorage.clear()`, toutes les bases IndexedDB, tous les caches) : elle ne touche que les clés `werb.werbtools-iec62443.`. En `file://`, l'ancienne purge effaçait les données des autres outils ouverts dans le même navigateur.

### Format de données
- **Schéma 2** : enveloppe WerbSMSI (`famille`, `meta`, `verrou`, `journal`, contenu sous `data`). Le journal utilise `date`, `par`, `action`, `objet`, `detail`.
- `meta.portee`, `meta.site`, `meta.groupeId` pour un projet rattaché à un site.
- Les projets au schéma 1 et au format `IEC62443-EXIGENCES` restent lisibles et sont convertis au premier enregistrement.

### Suppressions
- `sources/package.json` et les tests Node.js (`tests/*.mjs`), remplacés par `tests/test_parcours.py`.

## [1.2.0] — 2026-09-20

### Ajouts
- Renommage en **WerbTools_IEC62443** ; identité centralisée dans `signature.js` ; signature dans tous les exports (Word, PDF, Excel, fichier projet) et dans leurs propriétés ; page *À propos* ; audit de signature automatisé.

### Format de données
- Nouveau format de fichier projet `WERBTOOLS-IEC62443` ; les anciens projets restent lisibles.

## [1.1.0] — 2026-08-02

### Ajouts
- Modèle Word d'entreprise (en-tête, pied de page, marges, styles, balises) ; export PDF ; signature @WerbHat.

## [1.0.0] — 2026-08-01

### Ajouts
- Application HTML autonome : fiches détaillées, sources publiques, registre des documents avec empreinte, verrou multi-utilisateur, journal, exports Word et Excel.

## [0.1] — 2026-07-22

### Ajouts
- Classeur Excel et générateur Word en Python.

---

WerbTools_IEC62443 — Développé par @WerbHat
