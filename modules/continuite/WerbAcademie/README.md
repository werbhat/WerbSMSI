# WerbAcademie

> Formation et sensibilisation des collaborateurs du groupe : catalogue de formations, slides, liens, quiz, suivi des sessions et des renouvellements
> Version **1.5.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

Les référentiels demandent de **sensibiliser et former** le personnel à la sécurité, et d'en garder la **preuve** : ISO 27001 (A.6.3, 7.2, 7.3), NIS2 (article 20 : formation des dirigeants ; article 21 g : cyberhygiène et formation), IEC 62443-2-1 (formation du personnel d'exploitation et des prestataires), guide d'hygiène de l'ANSSI. Les supports dorment souvent dans des présentations éparses, et les feuilles de présence dans des classeurs.

WerbAcademie réunit, **pour tout le groupe**, le catalogue des formations (contenu structuré, liens vers des vidéos et des sites, quiz) et le suivi des personnes formées, site par site. Comme les autres modules : un seul fichier HTML, hors ligne, aucune installation, rien dans le navigateur.

La 1.0.0 apporte le **catalogue** (éditeur, cinq formations de départ) et les **personnes** ; la 1.1.0 la **génération des slides** (présentation HTML autonome et PowerPoint modifiable, avec le logo de l'entreprise) ; la 1.2.0 les **sessions** (présences, scores du quiz, réussite calculée), l'**éditeur du quiz**, la **feuille d'émargement** et le **quiz papier** en Word ; la 1.3.0 le **suivi des formations** (formations exigées par population, renouvellements, synthèses par site et par population, dirigeants), une **formation des dirigeants** (NIS2) et la **purge** des personnes au-delà de la durée de conservation ; la 1.4.0 la **publication des indicateurs**, sans aucun nom (`groupe:formations`), lus par le portail, WerbPCR, WerbNIS2 et WerbGouvernance.

---

## Contenu du paquet

```
WerbAcademie/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbAcademie.sha256           ← empreinte de l'application
├── application/
│   └── WerbAcademie.html         ← l'outil (fichier unique)
├── exemples/
│   └── Exemple_GROUPE.werbacademie.json  ← académie d'exemple fictive (intégrée au livrable)
├── guides/
│   └── 1-Mettre_en_place_l_academie.md   ← guide lu dans ❓ Aide
├── outils/
│   └── exemples.py              ← produit l'académie d'exemple (et la range dans l'espace de démonstration)
├── sources/
│   ├── build.py                 ← assemblage du livrable
│   ├── src/                     ← index.html, style.css, scripts (dont slides.js : slides HTML et PowerPoint ; documents.js : émargement et quiz papier Word), formations_defaut.json (formations de départ)
│   └── vendor/                  ← bibliotheques.js (JSZip, docx) et pptxgen.bundle.js (PptxGenJS 4.0.1, licence dans LICENSE-pptxgenjs.txt), figés, empreintes contrôlées
└── tests/                       ← tests Playwright dans Microsoft Edge
```

---

## Démarrage rapide

1. Copier `application/WerbAcademie.html` sur le poste ou sur un partage en lecture seule.
2. L'ouvrir avec **Microsoft Edge** (ou Google Chrome), directement ou depuis le portail WerbSMSI.
3. **📂 Ouvrir une académie**, ou **✨ Nouvelle académie** (avec les six formations proposées), puis *Intégration WerbSMSI* › rattacher au groupe, et **💾 Enregistrer** (Ctrl+S) dans `groupe/continuite/` de l'espace.
4. **🧪 Académie d'exemple** : un groupe industriel fictif, pour découvrir l'outil.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier.

---

## Fonctionnalités

| Menu | Contenu |
|---|---|
| 📊 Pilotage › Tableau de bord | Formations publiées, diapos, questions de quiz, personnes, sites ; points d'attention (académie non rattachée, aucune personne, personne sans site, formation publiée sans diapo, lien invalide, question sans bonne réponse, session réalisée avec des scores à saisir ou sans présence, formations en retard ou jamais suivies, dirigeants pas à jour, durée de conservation dépassée) ; taux de formations à jour, dirigeants à jour (1.3.0), sessions réalisées, formations réussies ; **formations à jour par site** ; personnes par population et par site |
| 📊 Pilotage › Identification | Nom de l'académie, organisation, responsable des formations ; **logo des slides** (PNG ou JPEG, 2 Mo au plus) : ⇩ logo commun du dossier `modeles/` de l'espace ou fichier chargé, copié dans la base (1.1.0) |
| 🎓 Formations › Catalogue | Formations du groupe : code, titre, publics, durée, chapitres, diapos, liens, quiz, version, statut (brouillon, publiée, retirée), renouvellement ; **➕ Formation**, **⧉ Dupliquer**, **✕ Supprimer** (confirmation), **↺ Ajouter les formations proposées manquantes** |
| 🎓 Formation (ouverte) › Slides | Générées depuis la structure (1.1.0) : page de titre, objectif et publics, programme, une diapo de section par chapitre, une diapo par diapo saisie (points clés, **notes de l'animateur**), pour aller plus loin (liens), quiz (une diapo par question), fin. **🖥️ Présentation HTML** : un fichier autonome qui s'ouvre hors ligne (CSP stricte, rien dans le navigateur), flèches et clic pour naviguer, **F** plein écran, **N** mode animateur (notes, chronomètre), **R** réponse du quiz révélée, impression en PDF une diapo par page. **📊 PowerPoint (.pptx)** modifiable : masque (bandeau, logo, pied de page, numéro), notes dans les notes PowerPoint, liens cliquables, quiz puis **corrigé** ; options : inclure le quiz, corrigé à la fin |
| 🎓 Formation (ouverte) | **Éditeur** : présentation (objectif, durée, publics visés, renouvellement en mois), **chapitres** et **diapos** (titre, points clés un par ligne, notes de l'animateur ; ↑ ↓), **liens** (vidéo, site, document ; adresse http ou https, ouverture dans un nouvel onglet, jamais intégrée), **⬆ Nouvelle version** |
| 🎓 Formation (ouverte) › Quiz | **Éditeur** (1.2.0) : questions, choix (un par ligne), **une ou plusieurs bonnes réponses** (elles suivent leur texte quand les choix changent), explication, ↑ ↓, seuil de réussite (80 % par défaut) ; **📝 Quiz papier (Word)** à distribuer (nom, date, cases à cocher), avec en option le **corrigé** réservé à l'animateur |
| 🎓 Formations › Sessions | Sessions (1.2.0) : formation, **version suivie**, seuil et nombre de questions gardés à la création ; date, site (ou plusieurs sites), format (présentiel, distanciel, e-learning externe), durée, animateur, lieu ou outil, notes ; état (planifiée, réalisée, scores à saisir) ; filtres par formation et par site |
| 🎓 Session (ouverte) | **Participants** : ➕ personnes concernées du site (population visée par la formation), ajout une à une, retrait ; **📄 feuille d'émargement (Word)** (une ligne de signature par inscrit et 5 lignes libres) ; **présence** (✓ tous présents) et **nombre de bonnes réponses** saisi par l'animateur ; résultat calculé : réussi (présent et score au moins égal au seuil ; sans quiz, la présence suffit), échec, score à saisir, absent ; bilan inscrits, présents, réussis |
| 👥 Personnes | **📄 Attestation de formation** (1.5.0) par personne, en Word : formations réussies (version, date, format, durée, résultat, validité) et, pour une personne présente, situation au regard des formations exigées ; bouton désactivé sans formation réussie. Nom, service ou fonction, population (collaborateurs, administrateurs, dirigeants, prestataires, opérateurs OT), site du groupe ou « Groupe (siège) », présente, date de départ ; **import CSV** (en-tête facultatif, `;` ou `,`, aperçu avant d'appliquer : ajoutées, mises à jour par le nom, ignorées, valeurs inconnues ; autres colonnes ignorées), **⬇ Modèle CSV** ; filtres (texte, population, site, personnes parties) ; **durée de conservation** indiquée et réglable (36 mois après le départ), personnes à supprimer signalées ; **🧹 purge** (1.3.0) : suppression des personnes parties au-delà de la durée, participations gardées sans nom, nom retiré du journal |
| 👥 Suivi des formations | (1.3.0) **Formations exigées** de chaque personne présente : les formations **publiées** qui visent sa population ; **échéance** = dernière session réussie + délai de renouvellement de la formation (24 mois par défaut) ; état **à jour**, **à renouveler** (échéance dans moins de 2 mois), **en retard**, **jamais suivie** ; inscription à une session à venir signalée ; indicateurs (taux à jour, à renouveler, en retard, jamais, dirigeants à jour) ; **dirigeants** mis en avant (NIS2, article 20) ; synthèses **par site** et **par population** ; matrice par personne, filtres (site, population, état) ; **➕ session de rattrapage** par formation pour les personnes affichées pas à jour et pas encore inscrites |
| ⚙️ Base | Intégration WerbSMSI (rattachement au groupe, sites reçus, ⟳ Actualiser ; **📤 publication des indicateurs** `groupe:formations` avec aperçu par site, action explicite après enregistrement, tracée au journal, 1.4.0), **modèle Word** de l'entreprise (en-tête, pied de page, styles ; ⇩ modèle commun du dossier `modeles/` de l'espace ou fichier, copié dans la base ; 1.2.0), journal, à propos |
| ❓ Aide | Guide du module, guide « Mettre en place l'académie du groupe » |

Bandeau commun : 📂 Ouvrir, 💾 Enregistrer, 📑 Enregistrer sous…, 📊 Export Excel (informations, formations, diapos, liens, quiz, personnes, sessions, participations, suivi), 🖨 PDF, ⏏ Fermer.

### Les formations de départ

| Code | Formation | Diapos de contenu | Questions |
|---|---|:-:|:-:|
| ACA-HYG | Hygiène numérique : les bons réflexes au quotidien | 7 | 5 |
| ACA-IA | Usage de l'intelligence artificielle | 5 | 5 |
| ACA-USB | Usage des clés USB et supports amovibles | 4 | 4 |
| ACA-QR | Usage des QR codes | 3 | 3 |
| ACA-MDP | Gestion des mots de passe | 5 | 5 |
| ACA-DIR | Cybersécurité : le rôle des dirigeants (dirigeants seulement ; NIS2, articles 20, 21 et 23 ; 1.3.0) | 6 | 4 |

Contenu générique (`sources/src/formations_defaut.json`), à adapter : contacts de signalement, outils autorisés, procédures du site. Les liens pointent vers des sites publics de référence (Cybermalveillance.gouv.fr, ANSSI, CNIL, KeePass, EUR-Lex).

---

## Données et format

- Une base est un fichier **`*.werbacademie.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBACADEMIE`, schéma 1).
- Contenu de `data` :

| Clé | Type | Description |
|---|---|---|
| `academie` | objet | `nom`, `organisation`, `responsable` |
| `formations` | tableau | `id`, `code`, `titre`, `objectif`, `populations` (`tous`, `collaborateurs`, `administrateurs`, `dirigeants`, `prestataires`, `operateurs`), `duree` (minutes), `version`, `statut` (`brouillon`, `publiee`, `retiree`), `periodiciteMois`, `chapitres` [{ `titre`, `diapos` [{ `titre`, `points`, `notes` }], `liens` [{ `libelle`, `url`, `type` }] }], `quiz` { `seuil`, `questions` [{ `texte`, `choix`, `bonnes`, `explication` }] } ; absent : formations proposées |
| `personnes` | tableau | `id`, `nom`, `fonction`, `population`, `site` (code du site ou `GROUPE`), `actif`, `sortieLe` |
| `sessions` | tableau | (1.2.0) `id`, `formation` (identifiant), `code`, `titre`, `version`, `seuil`, `nbQuestions` (gardés à la création), `date`, `site` (code, `GROUPE` ou vide : plusieurs sites), `animateur`, `format` (`presentiel`, `distanciel`, `elearning`), `duree`, `lieu`, `notes`, `participants` [{ `personne` (identifiant), `present`, `score` (nombre de bonnes réponses ou `null`) ; personne supprimée : `anonyme`, `population`, `site`, sans nom }] |
| `parametres` | objet | `conservationMois` (durée de conservation après le départ, 36 par défaut) |
| `modeles` | objet | `word` : modèle Word de l'entreprise (1.2.0 ; nom, taille, contenu en base64, `ajouteLe`, `ajoutePar`) |
| `logo` | objet | logo des slides (1.1.0) : `nom`, `type` (`image/png`, `image/jpeg`), `base64`, `ajouteLe`, `ajoutePar` ; absent : pas de logo |
| `recus.sites` | objet | copie de `groupe:sites` (`items` : `code`, `nom` ; `majLe`) |
| `largeurs` | objet | largeurs de colonnes (réservé) |

- Formats anciens encore lisibles : *aucun*.

---

## Intégration WerbSMSI

- Rubrique : **continuite**
- Niveau(x) d'utilisation : **groupe**
- Objets **publiés** (`publications/werbacademie.json` du groupe, sur action *Publier*) : `groupe:formations` (1.4.0), objet unique — catalogue publié (code, titre, version, publics, renouvellement, durée) ; indicateurs `global`, `dirigeants`, `parSite`, `indicateurs` (par site × population) : personnes, personnes à jour, formations exigées, à jour, à renouveler, en retard, jamais, taux ; `sessions12Mois`, `reussites12Mois`. **Aucun nom ni identifiant de personne.** Lu par le portail (tableau du groupe), WerbPCR (objectif R#1), WerbNIS2 (articles 20 et 21) et WerbGouvernance (revue de direction). Sur un petit effectif, une ligne site × population peut correspondre à une seule personne.
- Objets **lus** : `groupe:sites` (sites du groupe, depuis `werbsmsi.groupe.json`).
- Emplacement de la base : `groupe/continuite/` (une seule base pour le groupe).
- Le module fonctionne seul, sans le portail ni l'espace WerbSMSI.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante.
- **Rien dans le navigateur** : les données restent en mémoire puis dans votre fichier. Le stockage du navigateur propre au module est purgé à l'ouverture et à la fermeture.
- **La protection réelle est celle du dossier** où vous rangez la base : limitez les droits d'accès du drive.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbAcademie.sha256` :

```powershell
Get-FileHash .\application\WerbAcademie.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder.

```powershell
python outils\exemples.py --demo                                   # académie d'exemple, rangée aussi dans l'espace de démonstration
python sources\build.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_parcours.py                                      # Playwright pour Python et Microsoft Edge
python tests\test_slides.py
python tests\test_sessions.py
python tests\test_suivi.py
python tests\test_attestation.py
python tests\test_publication.py                                  # --ecrire-demo : recopie la publication dans l'espace de démonstration
python tests\test_theme.py
python tests\test_bandeau.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` : nouvelle académie avec les cinq formations de départ, rattachement au groupe et sites reçus, éditeur de formation (présentation, publics, chapitre, diapo et points clés, lien valide en nouvel onglet, lien non http refusé, ordre, nouvelle version), duplication, suppression, formations proposées rétablies, personnes (saisie, import CSV avec valeurs inconnues, doublon, mise à jour, colonne en trop ignorée, filtres, départ, durée de conservation), enregistrement et relecture, académie d'exemple, rien dans le navigateur.
- `tests/test_slides.py` (1.1.0) : PptxGenJS figé intégré ; logo commun de l'espace chargé et copié dans la base ; présentation HTML (CSP stricte, aucune ressource externe, déroulé complet, notes, logo, échappement), ouverte dans Edge (navigation, mode animateur, réponse du quiz, impression une diapo par page, rien dans le stockage), sans quiz ; PowerPoint (nombre de diapos, notes, logo, lien cliquable, corrigé, propriétés) ; aucune requête externe.
- `tests/test_sessions.py` (1.2.0) : sessions de l'exemple (états, bilans, réussi, échec, absent) ; nouvelle session (version, seuil et nombre de questions gardés), personnes concernées du site, ajout et retrait, présences, bonnes réponses et réussite calculée ; feuille d'émargement Word (échappement) ; éditeur du quiz (plusieurs bonnes réponses qui suivent leur texte, seuil, ordre, suppression) ; quiz papier sans et avec le corrigé ; modèle Word de l'entreprise ; personne supprimée comptée sans son nom ; Excel ; enregistrement et relecture.
- `tests/test_attestation.py` (1.5.0) : bouton actif seulement avec une formation réussie, attestation Word d'une personne présente (identité, formations réussies, résultat, validité, formations exigées, responsable) et d'une personne partie, journal.
- `tests/test_suivi.py` (1.3.0) : états attendus recalculés à la date du jour depuis l'exemple (matrice complète, formation des dirigeants exigée d'eux seuls), indicateurs, dirigeants, synthèses par site et par population, filtres ; session de rattrapage, inscription à venir, session réussie qui remet à jour ; formation en brouillon hors des obligations ; tableau de bord ; purge (participations gardées sans nom, nom retiré du journal et du fichier) ; Excel ; enregistrement.
- `tests/test_publication.py` (1.4.0) : objet déclaré (charte, schéma, outil) ; publication impossible avant l'enregistrement ; fichier `publications/werbacademie.json` ; source et date ; champs conformes au schéma ; catalogue ; indicateurs recalculés à la date du jour (global, dirigeants, par site, par site × population, sessions de l'année) ; aucun nom ni identifiant ; republication qui remplace l'objet.
- `tests/test_theme.py` et `tests/test_bandeau.py` : thème sombre et clair (menu et éditeur de formation), bandeau commun et export Excel.
- Composants tiers figés dans `sources/vendor/bibliotheques.js` (identique aux autres modules) : JSZip 3.10.1 et docx 9.8.1 (licence MIT), pour les documents Word (émargement, quiz papier) ; **PptxGenJS 4.0.1** (licence MIT, `sources/vendor/pptxgen.bundle.js`, téléchargé une fois depuis le registre npm officiel, intégrité SHA-512 vérifiée, empreinte SHA-256 contrôlée par `sources/build.py` ; son commentaire de carte des sources est retiré à l'assemblage) pour les slides PowerPoint. `socle.js`, `guides.js` et `modele-word.js` sont des copies conformes de la charte ; `xlsx.js` est la version commune des modules.

---

## Historique des versions

Version courante : **1.5.0** de novembre 2026 — attestation individuelle de formation (Word). Versions précédentes : **1.4.0** d'octobre 2026 — publication des indicateurs de formation du groupe, sans nom (`groupe:formations`), lus par le portail, WerbPCR, WerbNIS2 et WerbGouvernance. Versions précédentes : **1.3.0** — suivi des formations et des renouvellements (formations exigées par population, à jour / à renouveler / en retard / jamais, synthèses par site et par population, dirigeants, session de rattrapage), formation des dirigeants (NIS2), purge au-delà de la durée de conservation ; **1.2.0** — sessions, éditeur du quiz, émargement et quiz papier Word ; **1.1.0** — slides HTML et PowerPoint, logo de l'entreprise ; **1.0.0** d'octobre 2026 — première version : catalogue de formations et éditeur (chapitres, diapos, notes, liens), cinq formations de départ, personnes (import CSV, durée de conservation), intégration au groupe. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbAcademie** — Développé par **@WerbHat**
