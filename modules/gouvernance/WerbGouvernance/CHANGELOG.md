# Changelog — WerbGouvernance

Toutes les évolutions notables de WerbGouvernance sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).



## [1.13.0] — 2026-11

### Ajouts
- **Guide « Les rôles de la sécurité : qui fait quoi, et comment »** (`guides/4-Les_roles_de_la_securite.md`) : principes de conduite communs (la sécurité au service de l'entreprise, les personnes d'abord, décider selon le risque, le risque appartient à la direction ; disponibilité, intégrité, confidentialité, défense en profondeur, moindre privilège, besoin d'en connaître, séparation des tâches, sécurité dès la conception ; prudence, diligence et preuve ; NIS2 article 20 ; quatre façons de traiter un risque et qui décide ; déontologie) ; pour chaque rôle du groupe (direction, comité de sécurité, RSSI, DPO, acheteur, RH), du site (directeur, correspondant, exploitation OT, administrateurs, propriétaire d'un système, utilisateurs) et transverse (propriétaire de procédure, responsable d'action, auditeur interne, cellule de crise) : mission, tâches clés par rythme, décisions, pièges, outils de WerbSMSI ; cumuls à éviter ; matrice RACI des activités clés.
- Écran **🏛️ Cadre › Rôles** : renvoi au guide ; guide « Piloter la sécurité du groupe » : renvoi au guide.

## [1.12.1] — 2026-11

### Changements
- Assistant PSSI, phase 2 : le **choix du mode** (essentiel ou complet) est mis en évidence en tête de la phase (encadré « Quels principes afficher ? », deux cartes) ; en mode essentiel, un bandeau indique le nombre de principes masqués, dont ceux ajoutés d'après l'ANSSI ; badge **« nouveau · ANSSI »** sur les 10 principes ajoutés en 1.12.0.

## [1.12.0] — 2026-11

### Ajouts
- **Catalogue PSSI confronté au référentiel de principes de l'ANSSI** (*Guide pour l'élaboration d'une PSSI*, section 3, DCSSI, 3 mars 2004 : 166 principes en 16 domaines) : chaque principe du catalogue porte ses **références ANSSI**, affichées dans l'assistant (phase 2), le document PSSI (règles de la partie II, annexe B) et l'export Excel. **161 principes de l'ANSSI repris, 5 écartés avec justification** (secret de défense, agrément, signaux compromettants TEMPEST) ; contrôle automatique à la génération du catalogue.
- **10 principes ajoutés** d'après l'ANSSI, proposés en mode complet (catalogue : 61 principes, mode essentiel inchangé à 28) : documentation de sécurité (GOV-5), vérification et homologation avant mise en service (RSK-4), conservation et destruction des informations (INV-4), postes sensibles (RH-4), verrouillage des sessions (ACC-5), procédures d'exploitation et de maintenance (SYS-6), messagerie (SYS-7), veille sur les menaces et vulnérabilités (LOG-3), visiteurs (PHY-3), réseaux sans fil (NET-4) ; règles aux niveaux essentiel et renforcé, références ISO/IEC 27001:2022, NIS2, IEC 62443-3-3.
- Guide « Élaborer la PSSI » : tableau de correspondance par domaine de l'ANSSI, principes non repris et leur justification.

### Format de données
- Aucun changement : les décisions des bases existantes sont conservées ; les nouveaux principes apparaissent « à décider » en mode complet.

## [1.11.1] — 2026-11

### Changements
- **Guides PSSI complétés d'après le texte de l'ANSSI** (*Guide pour l'élaboration d'une PSSI*, DCSSI, section 2 « Méthodologie », 3 mars 2004) :
  - « Accompagner chaque phase de la PSSI » : conditions de réussite de la démarche ; pour chaque phase, la fiche de synthèse de l'ANSSI (objectifs, acteurs, entrées, sorties, tâches, validateurs) ; le détail de chaque tâche (étape préliminaire du projet, contenu du référentiel, échelle de 0 à 4 et 1 à 3 impacts, valeur la plus élevée retenue, caractérisation des menaces, quatre filtres du choix des principes, consolidation des règles avec les responsables de la mise en œuvre, deux notes de synthèse, revue de cohérence en quatre points, contenu d'une action du plan) ; conseils et écueils de l'ANSSI ; les quatre suites d'une PSSI. Ce qui relève de l'ANSSI et ce qui est proposé par WerbSMSI (durées, exemples, questions, critères) est distingué.
  - « Élaborer la PSSI » : le plan type de l'ANSSI a deux parties, la partie III est présentée comme un complément ; révision : au moins tous les cinq ans selon l'ANSSI (2004), revue annuelle recommandée ; plan d'action : modalités de validation et deux volets ; quatre filtres du choix des principes ; caractérisation des menaces.
- Assistant, phase 3 : texte du plan type corrigé (plan type de l'ANSSI en deux parties, complété d'une partie III).

## [1.11.0] — 2026-11

### Ajouts
- **❓ Aide de la phase** dans l'assistant PSSI : bouton en haut à droite de chaque phase et de la charte utilisateur ; ouvre, dans une fenêtre à part placée sur la phase en cours, le nouveau guide **« Accompagner chaque phase de la PSSI »** (`guides/3-…`) : but et livrable, qui et combien de temps, pas à pas dans l'assistant, animation de l'atelier, exemple industriel, pièges, critères de validation. Même fenêtre réutilisée d'une phase à l'autre ; document autonome sans script ; panneau de repli si la fenêtre est bloquée.

## [1.10.0] — 2026-11

### Ajouts
- **Finalisation de la PSSI** (GOU-4, phase 3) : document PSSI selon le **plan type** du guide (page de garde, historique des validations, partie I éléments stratégiques, partie II règles par domaine avec leur niveau, partie III vie de la politique, annexes : principes écartés, correspondance avec le socle ; bloc de signature), en aperçu, en **PDF** et en **Word** habillés du **modèle de l'entreprise**.
- Partie III éditable (organisation, dérogations, diffusion, révision, documents d'application ; textes proposés), **relecture** en 5 points, **approbation** (phases 0 à 2 validées et relecture complète exigées) inscrite dans **Politique et périmètre** (référence, version, approbateur, date, prochaine revue à un an).
- **Plan d'actions** : chaque règle retenue qui n'est pas « déjà en place » devient une action (nouvelle origine **PSSI**), échéance déduite des impacts (« 6 mois », « 1 an », date) ; alerte si une règle n'est ni en place ni planifiée après l'approbation.
- **Charte utilisateur** (GOU-5, PSSI › Charte utilisateur) : engagements à la première personne tirés des règles retenues qui concernent les utilisateurs (catalogue 1.1), sections communes modifiables, bloc d'engagement ; PDF et Word au modèle ; diffusion avec WerbAcademie conseillée.
- **Modèle de l'entreprise** : carte de chargement (modèle commun de l'espace ou fichier), copié dans la base.
- Composants : `modele-word.js` (charte §7.2), `impression.js` (PDF au modèle), `pssi-document.js` (contenu commun aperçu / PDF / Word), bibliothèques JSZip 3.10.1 et docx 9.8.1 embarquées (`sources/vendor/`).

### Format de données
- Ajouts sans changement de schéma : `pssi.finalisation`, `pssi.charte`, `items[].applique`, `items[].actionId`, `modeles.word`. Les bases 1.9.0 s'ouvrent avec les textes proposés.

## [1.9.0] — 2026-11

### Ajouts
- **Assistant PSSI** (GOU-1 à GOU-3, lots A et B) : nouvelle catégorie **📜 PSSI** (Assistant PSSI, Synthèses des règles). Quatre phases selon la méthode du guide de l'ANSSI, barre de progression, validation de chaque phase par le comité (qui, quand, commentaire ; modification après validation signalée).
- Phase 0 **cadrage** (organisation du projet, référentiel documentaire) et phase 1 **éléments stratégiques** (périmètre et OT, enjeux, obligations, échelle de besoins, besoins D / I / C, origines des menaces), **pré-remplies** : périmètre et rôles de la base, échelle de gravité et sources de risque publiées par WerbEBIOS (`groupe:echelles`, `groupe:sourcesRisque`). Notes de cadrage et de stratégie rédigées, imprimables.
- Phase 2 **principes et règles** : catalogue de 51 principes en 16 domaines (`pssi-catalogue.js`, reformulé et aligné sur ISO/IEC 27001:2022, NIS2, IEC 62443-3-3), mode essentiel (28) ou complet, décision par principe (retenu, écarté avec justification obligatoire, déjà couvert), règle à deux niveaux modifiable, impacts ; synthèses des règles et des impacts imprimables.
- **Règle → socle de mesures**, règle par règle ou envoi groupé, avec mise à jour de la mesure quand la règle change.
- Alertes du tableau de bord, feuille Excel « PSSI principes et règles », rubrique d'aide.

### Format de données
- Ajout sans changement de schéma : `pssi`.

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
