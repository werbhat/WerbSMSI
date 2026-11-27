# WerbNIS2

> Conformité NIS2 d'une entité ou d'un site selon le référentiel NIS2 : 20 objectifs, 152 mesures EI / EE, couverture, plan d'actions, rapport
> Version **1.13.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

L'audit NIS2 se tenait dans un classeur Excel (« Règles et audits NIS2 ») : les 20 règles, une grille de points de contrôle cotés OK / PL + / PL − / N/A et un calcul de couverture par thématique. WerbNIS2 reprend ce référentiel dans un outil WerbSMSI : une base par entité ou par site, rangée dans l'espace du groupe, avec la fiche de l'entité et du site, le journal des modifications, un plan d'actions et un rapport signé. Rien n'est installé, tout fonctionne hors ligne.

**Référentiel (1.12.0)** : la grille suit désormais le **référentiel NIS2** (17/03/2026, document de travail) : **20 objectifs de sécurité** (leur atteinte est obligatoire) et **152 moyens acceptables de conformité** en 28 rubriques, avec leurs identifiants officiels (`1.1-EI/EE`, `5.B.1-EE`…). Pour chaque mesure, le référentiel indique si elle est **attendue d'une entité importante (EI)** et **d'une entité essentielle (EE)** : 76 mesures sont attendues des deux, 76 sont réservées aux EE (dont tous les moyens des objectifs 16 à 20). Le statut de l'entité fixe les mesures applicables ; un filtre d'applicabilité les montre.

---

## Contenu du paquet

```
WerbNIS2/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── LICENSE                      ← licence MIT
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbNIS2.sha256              ← empreinte de l'application
├── application/
│   └── WerbNIS2.html            ← l'outil (fichier unique)
├── exemples/
│   └── Exemple_LYON.werbnis2.json   ← audit fictif du site LYON (aussi intégré : bouton « Base d'exemple »)
└── guides/
    ├── 0-NIS2_en_clair.md ← guide de débutant, lu dans ❓ Aide
    └── 1-Conduire_audit_NIS2.md ← méthode et cotation, lu dans ❓ Aide
```

Le dépôt source contient en plus `sources/`, `outils/` (extraction du référentiel, base d'exemple) et `tests/`.

---

## Démarrage rapide

1. Ouvrir `application/WerbNIS2.html` avec **Microsoft Edge**, directement ou depuis le portail WerbSMSI (rubrique Conformité & exigences).
2. Saisir son nom, puis **Nouvelle base**, **Ouvrir une base** ou **Base d'exemple**.
3. Renseigner **Entité et site** (le statut essentielle / importante fixe les mesures applicables : 76 pour une EI, 152 pour une EE), puis coter la **Grille d'audit**.
4. **Enregistrer** (Ctrl+S) dans `groupe/conformite/` ou `sites/<CODE>/conformite/` sur le drive protégé.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier.

---

## Fonctionnalités

### Outils des tables : sélection, archivage, chercher / remplacer, largeur des colonnes

Dans le plan d'actions (la grille des 152 moyens acceptables est normative : ni sélection ni archivage) (charte §7.7) :

- **Sélection multiple** : une case par ligne et « tout sélectionner » ; la barre propose **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer** (définitif, après confirmation) et **✕ Désélectionner**.
- **Archiver** déplace la ligne dans la réserve de la base (date et auteur) : hors plan d'actions, tableau de bord, compteur du menu, rapport d'audit et export Excel ; son identifiant n'est jamais réattribué. Chercher / remplacer : action, responsable, commentaire. Elle se désarchive à l'identique ; « Afficher les archivées » la montre grisée.
- **🔁 Chercher / remplacer** : une colonne de texte libre (ou toutes), avec aperçu avant d'appliquer ; ni identifiant, ni liste de choix, ni date.
- **Largeur des colonnes** : glisser le bord d'un en-tête, double-clic pour revenir à la largeur automatique ; largeurs enregistrées dans la base.
- Tout est tracé au journal.

### Bandeau

**☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute la base : feuille Informations (entité, audit), évaluation de chaque point avec cotation et preuves, règles, plan d'actions), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

- **Tableau de bord** : couverture NIS2, mesures applicables évaluées (selon le statut), mesures non attendues, écarts, actions ouvertes et en retard, alertes (statut à déterminer, point de contact ANSSI, SIR non recensés, écarts sans action), répartition des cotes et couverture des 28 rubriques ; reprise de la grille 2025 à reporter, le cas échéant.
- **Entité et site** (demande de la feuille Cover du classeur) : identification, assujettissement (statut, annexe, secteur, déclaration), gouvernance et contacts (dirigeant, conseiller, point de contact ANSSI), périmètre (activités, SIR, exclusions justifiées), fiche de l'audit.
- **Les 20 objectifs** : pilier (gouvernance, protection, défense, résilience), articles de la directive NIS2, rappel de l'objectif, moyen de s'en prévaloir (qualification, certification), justification et risques, couverture des moyens acceptables qui le déclinent, **État actuel** et **Reste à faire** ; « EE seulement » pour les objectifs 16 à 20, hors périmètre d'une entité importante.
- **Grille d'audit** : 152 moyens acceptables en 28 rubriques, étiquettes **EI ✓ / ✗** et **EE ✓ / ✗** sur chaque mesure (⚠ pour les deux mesures dont l'identifiant ne concorde pas avec les colonnes du référentiel NIS2 : 12.6-EI/EE, 14.5-EE), mesure non attendue de l'entité grisée et sans cotation, cotation OK / PL + / PL − / NC / N/A en un clic, commentaire et preuves par mesure, filtres (rubrique, cote, non évaluées, écarts) et **filtre d'applicabilité** (applicables à l'entité, attendues d'une EI, attendues d'une EE, réservées aux EE, non applicables), recherche (identifiant, texte ; « coeur » trouve « cœur »).
- **Schémas d'architecture en preuve** (base de site, 1.7.0) : la couverture publiée par WerbCartoSI (`site:cartographies`) est proposée sous 18 mesures de la grille, d'après une table de correspondance fixe — 5.A.1 (EX-CARTO, EX-RESEAU) ; 7.A.1 à 7.A.4, 7.B.1 et 7.B.2 (EX-ZONES, EX-FLUX) ; 3.A.1, 7.A.7, 7.A.8, 8.1 (EX-ACCES) ; 19.1, 19.7, 19.8 (EX-ADMIN) ; 13.1, 13.3, 13.6 (EX-REPRISE) ; 6.2 (EX-LOCAUX) : état de couverture et schémas en vigueur, jamais une cotation ; « Citer dans les preuves » ajoute le texte daté.
- **Registre des sauvegardes en preuve** (base de site, 1.8.0, NIS-1) : le registre publié par WerbExploitation (`site:sauvegardes`) est proposé sous **13.1-EI/EE** (sauvegardes actives : données, source → destination, catégorie, périodicité, mode), **13.2-EI/EE** (tests de restauration : à jour depuis moins d'un an, de plus d'un an, jamais testées) et **13.3-EI/EE** (copie hors ligne : catégorie BCK_3). Le schéma EX-REPRISE de WerbCartoSI prouve la conception, le registre le fonctionnement : les deux s'affichent côte à côte. Élément incomplet (aucune sauvegarde active, test manquant ou ancien, pas de copie hors ligne) et publication de plus de 12 mois signalés ; « Citer dans les preuves » ; aucune cotation automatique ; rien au niveau du groupe. Copie dans la base sans chemin, support, chiffrement ni procédure (jamais publiés).
- **Couverture des rubriques** : détail des cotes par rubrique, mesures non attendues de l'entité exclues.
- **Reprise de la grille 2025** (menu Base) : cotations d'une ancienne base sans mesure NIS2 correspondante, à reporter, avec « Marquer comme traité ».
- **Plan d'actions** : action par écart (un clic depuis le point ou en lot), responsable, échéance, statut.
- **Rapport d'audit** imprimable : contexte, synthèse, couverture, constats, plan d'actions, signature du module.
- **Journal** de chaque modification (avant / après), enregistré avec la base.

### Différences avec le classeur

| Classeur | WerbNIS2 |
|---|---|
| Cotes OK, PL +, PL −, N/A | Ajout de **NC** (non conforme) pour distinguer une mesure absente d'une mise en œuvre partielle |
| Couverture = (OK + PL +) / tous les points de la thématique | Les mesures **N/A** et celles non attendues de l'entité selon son statut (colonnes « Attendu » du référentiel NIS2) sont exclues du dénominateur |
| Couverture « Cartographie de l'écosystème » calculée sur d'autres cellules | Calcul identique pour toutes les thématiques |
| Commentaires et sources dans la grille | Repris par point, dans la base de chaque entité ; ceux du classeur ne sont pas importés |

### 📚 Guides d'accompagnement

Dans **❓ Aide**, dans la page *Guide du module* et sur l'accueil, même sans base ouverte (lecteur commun, charte §7.4). Le premier guide, **« NIS2 en clair »** (1.6.0), explique le sujet à un débutant : pourquoi NIS2, qui est concerné (secteurs, taille, entité essentielle ou importante), mesures de gestion des risques, déclaration des incidents (24 h, 72 h, 1 mois), engagement de la direction, sanctions, par où commencer, idées reçues ; renvoi vers le guide d'audit.

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression et les exports restent toujours en clair.

---

## Données et format

- Une base est un fichier **`*.werbnis2.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBNIS2`, schéma 1).
- Contenu de `data` :

| Clé | Type | Description |
|---|---|---|
| `entite` | objet | raison sociale, SIREN, site, statut NIS2, annexe, secteur, contacts, activités, SIR, exclusions |
| `audit` | objet | référence, objet, auditeur(s), dates, classification, périmètre, conclusion |
| `referentiel` | texte | référentiel de la base : `NIS2` (1.12.2) ; absent dans une base de la grille 2025, reprise à l'ouverture |
| `regles` | objet | par numéro d'objectif de sécurité (1 à 20) : `etat`, `resteAFaire` (et `origine` après une reprise) |
| `evaluations` | objet | par identifiant de mesure NIS2 (`2.A.2-EE`, `7.B.3-EI/EE`…) : `statut` (`OK`, `PL+`, `PL-`, `NC`, `NA`), `commentaire`, `preuves`, `majLe`, `par` |
| `actions` | liste | `id`, `point` (identifiant de mesure), `titre`, `responsable`, `echeance`, `statut`, `commentaire` |
| `migration` | objet | après la reprise d'une base de la grille 2025 : `le`, `depuis`, `repris`, `traiteLe`, `nonRepris` (ancien point, texte, cotation, commentaire, preuves) |

- Le référentiel (objectifs, rubriques, mesures) n'est pas dans la base : il est intégré au livrable (`sources/src/referentiel.js`), produit par `outils/extraire_nis2.py` depuis le PDF du référentiel NIS2 (PyMuPDF, outil de développement).
- Schéma **2** (1.12.0). Une base de schéma 1 (grille 2025) est reprise à l'ouverture : chaque cotation passe sur la mesure NIS2 correspondante (`outils/migration_grille2025.json` : 146 points sur 152, textes appariés un pour un et relus), l'état des règles sur l'objectif correspondant, les actions suivent leur point ; les cotations sans correspondance sont gardées (`migration.nonRepris`). Enregistrer la base conserve la reprise.

---

## Intégration WerbSMSI

- Rubrique : **conformite**, niveaux **groupe** et **site**.
- Objet **publié** (1.13.0, base de site seulement) : `site:syntheseNis2` dans `sites/<CODE>/publications/werbnis2.json` — référentiel, statut (EI, EE), couverture ((OK + PL +) / mesures applicables), compteurs par cotation, couverture et non-conformités par objectif, actions ouvertes et en retard, prochaine échéance, date de la dernière évaluation. Bouton **📤 Publier** de *Intégration WerbSMSI*, actif une fois la base enregistrée. Ne sont jamais publiés : commentaires, preuves, intitulés et responsables des actions. Lu par le **tableau de bord GRC** du portail. Une base du groupe ne publie rien.
- Objets **lus** : `site:sauvegardes` (WerbExploitation, 1.8.0 : base de site seulement ; registre des sauvegardes copié dans la base, lu au rattachement et sur ⟳ Actualiser) ; `site:cartographies` (WerbCartoSI 1.3.0, 1.7.0 : base de site seulement ; couverture des schémas d'architecture copiée dans la base, lue au rattachement et sur ⟳ Actualiser) ; `groupe:organisation` et `groupe:sites` (rattachement à l'espace : raison sociale et site repris dans la fiche) ; `groupe:formations` (WerbAcademie 1.4.0 ou plus récent, 1.5.0) : indicateurs de formation du groupe ou du site rattaché (taux de formations à jour, personnes, en retard, jamais suivies, dirigeants à jour, catalogue ; aucun nom), lus au rattachement et sur ⟳ Actualiser, copiés dans la base (`recus.formations`) et proposés comme **élément de preuve** sous les points **RH.b** (programme de sensibilisation), **ROLE.a** (dirigeant, formation exigée par l'article 20 de la directive) et **EXERCICES.a** — bouton « Citer dans les preuves ».
- Emplacement des bases : `groupe/conformite/` au niveau groupe, `sites/<CODE>/conformite/` au niveau site. Le portail ouvre la base depuis sa puce (`ouvertureParLien`).
- Le module fonctionne seul, sans le portail ni l'espace WerbSMSI.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante.
- **Rien dans le navigateur** : les données restent en mémoire puis dans votre fichier. Le stockage du navigateur propre au module est purgé à l'ouverture et à la fermeture.
- **La protection réelle est celle du dossier** où vous rangez la base : un audit NIS2 décrit les faiblesses de l'entité, limitez les droits d'accès du drive.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbNIS2.sha256` :

```powershell
Get-FileHash .\application\WerbNIS2.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder.

```powershell
python outils\extraire_nis2.py "<chemin>\<PDF du référentiel NIS2>.pdf"     # seulement si le référentiel NIS2 change (python -m pip install pymupdf)
python outils\exemples.py --demo <WerbSMSI>\demo\SMSI_GROUPE_DEMO
python <WerbSMSI>\charte\outils\werb_charte.py construire .
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_parcours.py                                                 # Playwright pour Python et Microsoft Edge
python tests\test_guides.py
python tests\test_theme.py
python tests\test_tables.py
python tests\test_formation.py
python tests\test_cartographies.py
python tests\test_sauvegardes.py
python tests\test_referentiel.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, cotations inchangées dans les deux thèmes, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.
- `tests/test_cartographies.py` contrôle les schémas d'architecture reçus de WerbCartoSI (1.7.0) : réception au rattachement du site, élément de preuve sous les 18 mesures de la table seulement, couverture incomplète signalée, citation datée sans cotation, publication de plus de 12 mois signalée, rien au niveau du groupe, copie sans lien ni chemin.
- `tests/test_publication.py` contrôle la publication de `site:syntheseNis2` (1.13.0) : rien à publier sans rattachement ni au niveau groupe, publication désactivée tant que la base n'est pas enregistrée, compteurs, couverture par objectif, actions en retard, ni preuve ni intitulé ni responsable d'action publiés, journal.
- `tests/test_sauvegardes.py` contrôle le registre des sauvegardes reçu de WerbExploitation (1.8.0) : réception au rattachement du site, élément de preuve sous 13.1, 13.2 et 13.3 seulement, test de restauration manquant et absence de copie hors ligne signalés, copie hors ligne reconnue, citation datée sans cotation, copie dans la base sans chemin ni chiffrement, rien au niveau du groupe.
- `tests/test_formation.py` contrôle les indicateurs de formation reçus de WerbAcademie (1.5.0) : réception au rattachement (site, puis groupe), élément de preuve sous 4.2, 2.A.1 et 15.1 seulement, citation dans les preuves (journal), copie dans la base sans nom.
- `tests/test_referentiel.py` contrôle le référentiel NIS2 (1.12.0) : 20 objectifs, 28 rubriques, 152 mesures aux identifiants officiels, colonnes « Attendu d'une EI / d'une EE » (76 / 152), anomalies du document, objectifs 16 à 20 réservés aux EE ; étiquettes EI / EE, mesures applicables d'une entité importante puis essentielle, filtre d'applicabilité ; page des objectifs ; reprise d'une base de la grille 2025 (`tests/donnees/Grille2025_LYON.werbnis2.json` : cotations reportées, cotations sans correspondance gardées, journal, « Marquer comme traité »).
- `tests/test_tables.py` contrôle les outils du plan d'actions (1.4.0) : archivage (compteur, rapport, réserve, auteur, journal), identifiant non réattribué, « Afficher les archivées », désarchivage, suppression multiple, chercher / remplacer, largeur des colonnes enregistrée.

L'extraction ne reprend que le référentiel (objectifs, rubriques, mesures, colonnes « Attendu ») ; le PDF n'est pas versionné. L'ancien outil `outils/extraire_referentiel.py` (classeur « Règles et audits NIS2 », grille 2025) est retiré.

---

## Historique des versions

Version courante : **1.13.0** de novembre 2026 — synthèse NIS2 du site publiée (`site:syntheseNis2`) pour le tableau de bord GRC du portail. Précédente : **1.12.2** de novembre 2026 — référentiel affiché « NIS2 », sans numéro de version. Précédente : **1.12.1** de novembre 2026 — référentiel nommé **NIS2** partout (grille, rapport, aide, guides) ; outils et tests renommés. Précédente : **1.12.0** de novembre 2026 — référentiel **NIS2** : 20 objectifs, 152 moyens acceptables marqués « Attendu d'une EI / d'une EE », mesures applicables selon le statut, filtre d'applicabilité, reprise des bases de la grille 2025. Précédente : **1.11.0** de novembre 2026 — fichiers exportés nommés « SIGLE-SITE_… », nom du site dans les titres (socle 1.12.0). Précédente : **1.10.0** de novembre 2026 — base demandée par le portail ouverte directement quand l'espace est chargé dans le portail (socle 1.11.0). Précédente : **1.9.0** de novembre 2026 — identification unique : ouvert depuis le portail WerbSMSI, le module reprend le nom saisi dans le portail, sans écran « Votre nom » (socle 1.10.0). Précédente : **1.8.1** de novembre 2026 — catégorie de schéma déclarée non applicable par WerbCartoSI lue avec sa justification. **1.8.0** : registre des sauvegardes de WerbExploitation proposé en preuve de la continuité (CONTINUITE_ACTIVITE.a, c, d). Versions précédentes : **1.7.0** de novembre 2026 — couverture des schémas d'architecture de WerbCartoSI proposée en preuve. Versions précédentes : **1.6.0** de novembre 2026 — guide de débutant « NIS2 en clair » ; **1.5.0** d'octobre 2026 — indicateurs de formation de WerbAcademie reçus et proposés comme preuves (RH.b, ROLE.a, EXERCICES.a). Versions précédentes : **1.4.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0) ; **1.3.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.2.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.1.0** d'octobre 2026 — verrou commun des bases (lecture seule ou prise de main, bandeau « Ouvert par … ») ; **1.0.0**. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbNIS2** — Développé par **@WerbHat**
