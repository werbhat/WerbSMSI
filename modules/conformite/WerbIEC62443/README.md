# WerbIEC62443

> Gestion des exigences de cybersécurité **IEC 62443** pour les projets OT / systèmes industriels
> Version **1.11.0** — Développé par **@WerbHat**

---

> **Renommé en 1.10.0** : ex-**WerbTools_IEC62443**, sur le modèle de WerbNIS2 (identifiant `werbiec62443`, format `WERBIEC62443`, bases `.werbiec62443.json`). Les projets `.werbtools-iec62443.json` s'ouvrent toujours et s'enregistrent au nouveau format ; la publication du site est reprise à la première publication.

## Pourquoi cet outil

Sur les projets d'automatisme et de contrôle-commande, je gérais les exigences IEC 62443 dans des tableaux Excel. Ça fonctionne au début. Puis on veut détailler chaque exigence, citer un guide ANSSI, rattacher les preuves d'un prestataire, garder une trace de qui a changé quoi, et envoyer à chaque intégrateur un cahier propre qui ne contient que son périmètre. Là, Excel ne suit plus.

J'ai donc construit **WerbIEC62443**, avec trois contraintes non négociables :

- **Aucune installation.** Il doit tourner sur des postes à droits limités, sans passer par la DSI pour installer un logiciel.
- **Aucune donnée qui sort.** C'est un outil hors ligne : pas de cloud, pas d'appel réseau, rien de conservé dans le navigateur.
- **Des exports présentables.** Le Word et le PDF que je donne à un prestataire doivent pouvoir être signés tels quels, avec l'en-tête et le pied de page de l'entreprise.

Le résultat tient dans **un seul fichier HTML** qu'on ouvre dans Edge ou Chrome. Depuis la 1.3.0, c'est aussi le module **Conformité & exigences** de l'environnement WerbSMSI, au niveau site.

---

## Contenu du paquet

```
WerbIEC62443/
├── README.md                                 ← ce fichier
├── CHANGELOG.md                              ← historique des versions
├── SECURITY.md                               ← mesures de sécurité, limites, composants tiers
├── module.json                               ← manifeste lu par le portail WerbSMSI
├── WerbIEC62443.sha256                 ← empreinte de l'application
├── application/
│   └── WerbIEC62443.html               ← l'outil (fichier unique, ~1,6 Mo)
├── exemples/
│   ├── Projet_exemple.werbiec62443.json   ← projet de démonstration
│   ├── Modele_entete_exemple.docx               ← modèle Word d'en-tête / pied de page
│   └── Exemple_export_P01_avec_modele.pdf       ← cahier généré pour un prestataire
├── guides/                                   ← guides d'accompagnement (Markdown), lus dans ❓ Aide
│   ├── 1-Guide IEC62443.md
│   ├── 2-checklist_audit_iec62443.md
│   ├── 3-plan_de_mise_en_oeuvre_iec62443.md
│   └── 4-modeles_et_registres_iec62443.md
├── sources/                                  ← code de l'application et assemblage
│   ├── src/  (index.html, style.css, signature.js, socle.js, guides.js, xlsx-lite.js, cahier.js, app.js, referentiel.json)
│   ├── vendor/bibliotheques.js               ← JSZip 3.10.1 et docx 9.8.1, figés (empreinte contrôlée)
│   └── build.py
└── tests/test_menu.py                        ← contrôle du menu commun dans Edge
```

Le paquet publié dans WerbSMSI (`modules/conformite/WerbIEC62443/`) ne contient que les fichiers de documentation, `module.json`, l'empreinte, `application/`, `exemples/` et `guides/`.

---

## Démarrage rapide

1. Copier `application/WerbIEC62443.html` sur le poste ou sur un partage réseau en lecture seule.
2. L'ouvrir avec **Microsoft Edge** (ou Google Chrome).
3. Saisir son nom : il sert à tracer les modifications dans le journal.
4. Choisir **Projet d'exemple** pour découvrir l'outil, ou **Nouveau projet** pour démarrer.
5. Enregistrer avec **Ctrl+S**. Le projet est un fichier `.werbiec62443.json` que l'on place où l'on veut. Dans WerbSMSI : `sites/<CODE>/conformite/`.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier projet, et l'intégration WerbSMSI n'est pas disponible. Edge reste le navigateur recommandé.

---

## Fonctionnalités

### Outils des tables : sélection, archivage, chercher / remplacer, largeur des colonnes

Dans le plan de traitement et les prestataires (sélection, archivage, suppression), les zones et conduits (chercher / remplacer) ; largeurs aussi dans les documents et les sources (le référentiel, normatif, n'a pas ces outils) (charte §7.7) :

- **Sélection multiple** : une case par ligne et « tout sélectionner » ; la barre propose **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer** (définitif, après confirmation) et **✕ Désélectionner**.
- **Archiver** déplace la ligne dans la réserve de la base (date et auteur) : hors indicateurs, compteur du menu, publication au site (`site:prestataires`, synthèse), cahier et exports ; son identifiant n'est jamais réattribué. Un prestataire archivé reste dans les lignes de matrice qui le citent (proposé « (archivé) ») ; un prestataire supprimé en est retiré. Elle se désarchive à l'identique ; « Afficher les archivées » la montre grisée.
- **🔁 Chercher / remplacer** : une colonne de texte libre (ou toutes), avec aperçu avant d'appliquer ; ni identifiant, ni liste de choix, ni date.
- **Largeur des colonnes** : glisser le bord d'un en-tête, double-clic pour revenir à la largeur automatique ; largeurs enregistrées dans la base.
- Tout est tracé au journal.

### Bandeau

**☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📥 Import Excel** (désactivé en lecture seule), **📊 Export Excel** (classeur complet du projet, réimportable ; nommé `<projet>_WerbIEC62443_<date>.xlsx`), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**, et **🧹 Purger** (propre au module). Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

### Référentiel
- Les **100 exigences de l'IEC 62443-3-3** (51 SR et 49 RE), regroupées par exigence fondamentale (FR1 à FR7).
- Pour chacune : le niveau SL-C minimal, les preuves attendues, la correspondance **indicative** avec l'IEC 62443-4-2 et l'identifiant **ISASecure SSA-311** (FSA-S).
- Les textes sont **mes reformulations**, pas le texte normatif (voir *Droits d'auteur sur les normes*).

### Fiche détaillée par exigence
- Interprétation propre au projet, guide de mise en œuvre et critères de vérification.
- Notes internes, **jamais exportées**.
- **Sources publiques** liées à la fiche, avec la précision du chapitre ou de la mesure. Sont préchargés : les guides systèmes industriels de l'ANSSI, le référentiel ANSSI pour les prestataires d'intégration et de maintenance, le NIST SP 800-82 rév. 3, ISASecure SSA-311 et l'IEC 62443-3-3.
- **Documents projet** (preuves privées) : référence, version, classification, emplacement dans la GED et **empreinte SHA-256** calculée localement. Le document lui-même n'est jamais copié dans le projet. Le bouton *Vérifier* prouve qu'un fichier est bien celui qui a été référencé.

### Cadrage (phase 1)
- **Note de cadrage** : objectifs, objet de l'évaluation (programme de l'exploitant, prestataire, architecture, système, composant, développement produit), rôle évalué, parties de la norme visées, livrables et critères d'acceptation.
- Périmètre inclus et exclu, interfaces externes.
- **Fiche d'identification du système** et **contraintes** (disponibilité, sûreté de fonctionnement, maintenance, fenêtres de changement, exigences réglementaires), d'après le modèle du guide *Modèles et registres*.
- **RACI** prérempli avec les rôles du plan de mise en œuvre, à nommer.
- Liste d'avancement, puis **approbation** tracée au journal. Si le cadrage change après l'approbation, il est signalé « à approuver de nouveau ».
- **Export Word et PDF** de la note de cadrage, avec le modèle Word de l'entreprise.

### Plan de traitement (phase 5)
- Actions avec exigence et zones traitées, risque associé, priorité (P1 à P4), responsable, ressources, échéance et **critère de réussite**.
- Les huit états du modèle de plan de traitement, de « À planifier » à « Clôturée ». Une action ne se clôture qu'avec un critère de réussite (date et auteur de la clôture tracés), et ne s'abandonne qu'avec une justification.
- **Proposer les actions des écarts** : une action par exigence requise au statut « Non supporté », avec la priorité déduite du SL-T des zones et les preuves attendues comme critère de réussite.
- Filtres (état, priorité, en retard, sans responsable, sans échéance, sans critère) ; les actions d'une exigence apparaissent aussi sur sa fiche.

### Périmètre et allocation
- Zones avec leur **SL-T**, et conduits entre zones (ou vers l'extérieur). Ils peuvent être repris des zones publiées par WerbMap pour le site.
- Prestataires : intégrateurs, fournisseurs de composants, mainteneurs.
- **Matrice exigence × zone** : l'exigibilité est calculée automatiquement (SL-T de la zone ≥ SL-C de l'exigence). On y gère le prestataire, le statut, les preuves, l'échéance et la validation. Filtres et actions groupées sont disponibles.
- **Tableau de bord** : conformité par zone et par prestataire, et sept contrôles qualité (exigence sans prestataire, non-applicabilité non justifiée, statut « Supporté » sans preuve, échéance dépassée, action du plan de traitement en retard, etc.).

### Traçabilité et travail à plusieurs
- **Journal** de chaque modification : auteur, date, ancienne valeur, nouvelle valeur.
- **Verrou** : si un collègue a déjà ouvert le projet, on le voit (« ouvert par X depuis… ») et on choisit entre lecture seule et prise de main.
- **Détection de conflit** : si le fichier a été modifié par ailleurs, l'outil demande confirmation avant d'écraser.

### Exports
| Format | Contenu |
|---|---|
| **Word** | Cahier des exigences par prestataire (et par zone si besoin) : page de garde, bloc d'approbation, suivi des versions, références, périmètre, synthèse, exigences détaillées, modalités de réponse, et en annexe le tableau de réponse du prestataire, les non-applicabilités et les documents référencés avec leur empreinte. |
| **PDF** | Même contenu, via l'impression d'Edge (« Enregistrer au format PDF »). |
| **Note de cadrage** (Word et PDF) | Page de garde et approbation, objectifs, objet de l'évaluation, périmètre, système étudié, contraintes, RACI et gestion documentaire, avec le même modèle d'en-tête que le cahier. |
| **Excel** | Export complet du projet ; l'import accepte aussi le classeur de la v1. |
| **JSON** | Copie du fichier projet. |

On choisit ce qui part chez le prestataire : interprétation, mise en œuvre, sources, et le **niveau maximal de classification** des documents cités. Les chemins réseau internes ne sortent jamais.

### Guides d'accompagnement
Le menu **❓ Aide** donne accès à quatre guides, à lire dans l'ordre des étapes du projet : le **guide de la série IEC 62443**, la **checklist d'audit**, le **plan de mise en œuvre**, puis les **modèles et registres**. Chacun s'affiche en mode lecture, avec un sommaire cliquable et des boutons pour passer au document précédent ou suivant. Ils sont aussi proposés sur l'écran d'accueil, avant d'ouvrir un projet.

Ce sont les fichiers Markdown du dossier `guides/`. Pour les faire évoluer, modifier, ajouter ou retirer un fichier `.md`, puis reconstruire (`python sources/build.py`) : la page les intègre au moment de l'assemblage, car une page ouverte en `file://` ne peut pas lire un fichier voisin. L'ordre d'affichage suit le nom du fichier (`1-…`, `2-…`) ; le titre est celui du premier titre `#` du document, sinon le nom du fichier.

### Modèle Word d'entreprise
On charge un `.docx` ou un `.dotx` qui contient l'en-tête et le pied de page de l'entreprise (logo, tableaux, numéros de page). Les exports Word et PDF reprennent cet en-tête, ce pied de page, les marges et les styles. Ces balises sont remplacées automatiquement :

`{{TITRE}}` `{{PROJET}}` `{{SITE}}` `{{MOA}}` `{{REFERENCE}}` `{{VERSION}}` `{{DATE}}` `{{CLASSIFICATION}}` `{{PRESTATAIRE}}`

> Pour un PDF strictement identique au Word, ouvrir le Word généré puis faire *Enregistrer sous → PDF*. L'export PDF intégré ne reprend pas les images EMF/WMF ni les zones de texte flottantes de l'en-tête.

---

## Outils en ligne de commande (optionnel)

Les outils Python de la v1 (classeur Excel de référence, génération de cahiers Word en ligne de commande) ne sont plus livrés : ils ont été perdus lors de la suppression des dépôts sources en octobre 2026. L'application couvre ces usages (import et export Excel, cahiers Word par prestataire).

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression et les exports restent toujours en clair.

---

## Données et format

- Un projet est un fichier **`*.werbiec62443.json`** à l'enveloppe commune WerbSMSI : `format` `WERBIEC62443`, **schéma 2**, `famille` `WERBSMSI`.
- `meta` : produit, version de l'outil, `generateur` signé, dates et auteur de la dernière modification ; `portee`, `site` et `groupeId` quand le projet est rattaché à un site WerbSMSI.
- `verrou` : utilisateur et date d'ouverture en écriture. `journal` : `date`, `par`, `action`, `objet`, `detail`.
- `data` :

| Clé | Contenu |
|---|---|
| `projet` | Nom, site, maître d'ouvrage, référence, version, classification, approbateurs, délai, contact |
| `referentiel` | Exigences SR / RE (identifiant, FR, SL-C, texte, preuves attendues, correspondances) |
| `fiches` | Fiche détaillée par exigence (interprétation, mise en œuvre, vérification, notes, sources, documents) |
| `sources`, `documents` | Sources publiques ; registre des documents projet avec empreinte SHA-256 |
| `zones`, `conduits` | Périmètre et SL-T |
| `prestataires` | Intégrateurs, fournisseurs, mainteneurs |
| `matrice` | Une ligne par exigence × zone : applicabilité, prestataire, statut, preuves, échéance, validation |
| `historique`, `modeles` | Versions du cahier ; modèle Word d'entreprise (encodé dans le fichier) |

- **Anciens formats lus** : le schéma 1 de WerbIEC62443 (fichier à plat) et le format `IEC62443-EXIGENCES` d'avant le renommage. Ils sont convertis au schéma 2 au premier enregistrement.

---

## Intégration WerbSMSI

- Rubrique **Conformité & exigences**, niveaux **groupe** et **site**.
- **Deux niveaux** : un projet se rattache à un **site** (`sites/<CODE>/conformite/` : reprise des zones publiées par WerbMap, publication de la synthèse de conformité) ou au **groupe** (`groupe/conformite/` : référentiel d'exigences commun, état du socle de mesures, aucune publication).
- Écran **Intégration WerbSMSI** (menu *Projet*) :
  1. **Choisir l'espace** : le dossier `SMSI_<GROUPE>` du drive protégé, redemandé à chaque session.
  2. **Rattacher** le projet à un site : `meta.portee`, `meta.site` et `meta.groupeId` sont enregistrés dans le projet.
  3. **Zones et conduits** publiés par WerbMap pour le site : comparaison avec le projet et import (mise à jour du nom et du SL-T, ajout des zones absentes, rien n'est supprimé). Une zone publiée **sans SL-T** est signalée et **ignorée**, avec ses conduits : définissez son SL-T dans WerbMap puis republiez.
  4. **Socle de mesures du groupe** : pour chaque mesure qui cite une exigence IEC 62443-3-3 (`IEC62443-3-3:SR 1.1`), état calculé depuis la matrice (appliquée, partielle, non appliquée).
  5. **Publier** : écrit `sites/<CODE>/publications/werbiec62443.json`.

| Objet | Sens | Contenu |
|---|---|---|
| `site:zones`, `site:conduits` | lu (WerbMap) | identifiant, nom, SL-T ; zones source et cible |
| `groupe:mesuresSocle` | lu (WerbGouvernance) | mesures du socle et exigences citées |
| `site:prestataires` | publié | identifiant `<référence>/<ID>`, nom, rôle — ni contact ni contrat |
| `site:syntheseConformite` | publié | taux, exigences, conformes, écarts « Non supporté », mesures du socle non appliquées |

- Plusieurs projets IEC 62443 peuvent coexister sur un site : chaque publication ne remplace que les objets de sa propre référence documentaire.
- Sans espace choisi, l'outil fonctionne seul, comme avant.

- **Depuis le portail WerbSMSI** : sous ce module, une puce par site ouvre directement sa base. Le module demande alors un dossier (celui de l'espace, du site ou du module) puis ouvre la base, qui s'enregistre à sa place.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : une politique de sécurité (CSP) intégrée à la page bloque toute connexion sortante. Depuis la 1.3.0, elle n'autorise plus `'unsafe-eval'`.
- **Rien dans le navigateur** : les données stockées par la page sont purgées à l'ouverture et à la fermeture de l'onglet, et le bouton **Purger** le fait à la demande. La purge ne touche que les clés de l'outil (`werb.werbiec62443.`), pas celles des autres modules WerbSMSI.
- **Les données sont dans votre fichier projet**, à l'endroit que vous choisissez. Pensez à le sauvegarder.
- **Publication maîtrisée** : rien ne part vers le groupe sans clic sur *Publier*, et seuls des taux et des compteurs sont publiés.
- **Intégrité** : pour éviter toute modification de l'outil, je le dépose sur un partage en lecture seule et je publie son empreinte. Pour la vérifier, sous Windows et sans droits administrateur :

```powershell
Get-FileHash .\application\WerbIEC62443.html -Algorithm SHA256
```

L'empreinte attendue figure dans `WerbIEC62443.sha256` et dans `module.json`.

Prérequis côté DSI : autoriser l'ouverture des fichiers HTML locaux et ne pas bloquer l'écriture de fichiers par une page (stratégie Edge `DefaultFileSystemWriteGuardSetting`).

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le fichier HTML est assemblé à partir de `sources/`. Prérequis : **Python 3.10 ou plus récent**, rien d'autre (Node.js n'est plus nécessaire depuis la 1.3.0).

```bash
python sources/build.py --date AAAA-MM-JJ   # → application/WerbIEC62443.html
```

- L'assemblage est reproductible : à sources et date identiques, on obtient la même empreinte.
- `sources/vendor/bibliotheques.js` regroupe JSZip 3.10.1 et docx 9.8.1 tels qu'embarqués dans la 1.3.1. `build.py` vérifie son SHA-256 avant d'assembler.
- Le menu latéral est affiché par `WerbSocle.menu` (socle de la charte) à partir de la constante `MENU` de `app.js`.
- Le dépôt source a été reconstitué en octobre 2026 depuis le paquet 1.3.1 publié (livrable reconstruit identique octet pour octet). Le classeur `excel/`, les outils en ligne de commande, la génération du projet d'exemple et les tests d'origine n'ont pas pu être reconstitués : le projet d'exemple publié est conservé tel quel dans `exemples/`.
- Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et dans `module.json`, qui doivent concorder. `sources/src/socle.js` est la copie conforme du socle de la charte WerbSMSI : il ne se modifie pas ici.

Publier une version (depuis la racine du dépôt) :

```powershell
python sources\build.py --date AAAA-MM-JJ
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_menu.py
python tests\test_theme.py
python tests\test_tables.py
python tests\test_renommage.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
git tag vX.Y.Z
```

### Tests
- `tests/test_menu.py` : ouvre le projet d'exemple dans Edge avec Playwright pour Python (`pip install playwright`, aucun navigateur à télécharger) et contrôle le menu commun (catégories, repli, navigation), la CSP et l'absence d'erreur JavaScript. Le parcours complet d'origine (30 contrôles) est à réécrire.
- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, niveau SL actif sous texte blanc, statut conforme coloré dans les deux thèmes, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.
- `tests/test_tables.py` contrôle les outils des tables (1.10.0) : archivage d'une action (réserve, auteur, compteur, journal, enregistrement, identifiant), désarchivage, prestataire archivé gardé dans la matrice, suppression, chercher / remplacer dans les zones, largeurs enregistrées.
- `tests/test_renommage.py` contrôle la compatibilité du renommage (1.10.0) : projet à l'ancienne extension et à l'ancien format ouvert puis enregistré au nouveau format, publication du site reprise depuis `publications/werbtools-iec62443.json` sans perte, ancien fichier vidé, aucun conflit.

---

## Droits d'auteur sur les normes

Les intitulés et descriptions des exigences sont **des reformulations rédigées pour un usage contractuel**. Ils ne reproduisent pas le texte des normes IEC / ISA, qui est protégé par le droit d'auteur. **Le texte des normes fait foi.** Chaque partie doit l'acquérir auprès de l'IEC, de l'ISA ou d'AFNOR. La correspondance avec l'IEC 62443-4-2 est indicative et doit être confirmée avec la norme.

**État des éditions de référence (octobre 2026) :**

| Norme | Objet | Édition |
|---|---|---|
| IEC 62443-3-3 | Exigences de sécurité système et niveaux de sécurité | 2013 + corrigendum 2014 (révision en préparation) |
| IEC 62443-4-2 | Exigences techniques des composants | 2019 |
| IEC 62443-4-1 | Cycle de vie de développement sécurisé | 2018 |
| IEC 62443-2-4 | Exigences pour les prestataires de services | 2023 (éd. 2.0) |
| IEC 62443-2-1 | Programme de sécurité du propriétaire d'actifs | 2024 (éd. 2.0) |
| IEC 62443-3-2 | Évaluation des risques et conception du système | 2020 |

---

## Composants tiers

L'application embarque, sans modification, les fichiers officiels suivants :

| Bibliothèque | Version | Fichier | Licence | Rôle |
|---|---|---|---|---|
| [docx](https://github.com/dolanmiu/docx) | 9.8.1 | `dist/index.iife.js` | MIT | Génération des fichiers Word |
| [JSZip](https://github.com/Stuk/jszip) | 3.10.1 | `dist/jszip.min.js` | MIT (ou GPLv3, au choix) | Lecture et écriture des archives Office |

Empreintes et provenance : voir [SECURITY.md](SECURITY.md).

---

## Feuille de route

- Signature cryptographique des exports, pour prouver qu'un cahier n'a pas été modifié après sa génération.
- Onglet dédié aux exigences de processus de l'IEC 62443-2-4 pour les intégrateurs.
- Alimentation des SL-T depuis l'analyse de risques WerbEBIOS du site (biens supports publiés dans WerbSMSI).

---

## Historique des versions

Version courante : **1.11.0** d'octobre 2026 — le cahier d'exigences renvoie au cahier d'exigences cyber de WerbPresta. Version précédente : **1.10.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0). Versions précédentes : **1.9.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.8.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.7.0** d'octobre 2026 — verrou commun des bases (lecture seule ou prise de main, bandeau « Ouvert par … ») ; **1.6.0** — note de cadrage (objectifs, périmètre, fiche système, contraintes, RACI, approbation) et plan de traitement (actions, priorités, critères de réussite, proposition depuis les écarts). La 1.5.0 a apporté les guides d'accompagnement en mode lecture dans le menu ❓ Aide. La 1.4.0 a apporté le menu latéral commun WerbSMSI, le niveau groupe et le modèle Word commun de l'espace. La 1.3.1 ignore les zones publiées sans SL-T ; la 1.3.0 a apporté l'intégration à WerbSMSI, le format de fichier au schéma 2, la CSP sans `'unsafe-eval'` et l'assemblage en Python seul. Détail de toutes les versions dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbIEC62443** — Développé par **@WerbHat**
