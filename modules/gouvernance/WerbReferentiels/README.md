# WerbReferentiels

> Référentiels cyber par nature d'exigence : réglementation (NIS2, CRA, RGPD), normes (ISO 27001, IEC 62443), guides (ANSSI, NIST) — cartes, correspondances
> Version **1.7.2** — Développé par **@WerbHat**

---

## Pourquoi cet outil

Un SMSI s'appuie sur plusieurs référentiels à la fois : la directive NIS2 impose, ISO/IEC 27001 structure, le NIST CSF décrit, IEC 62443 précise l'industriel, l'ANSSI recommande. Les avoir côte à côte, **reliés entre eux**, évite de traiter chaque texte isolément et prépare l'audit : « telle mesure couvre telle exigence ».

WerbReferentiels est un **module de lecture** : il n'a pas de base de données à saisir, seulement du contenu à lire. Tous les référentiels vivent dans un seul module, un dossier par référentiel. Ajouter DORA ou la LPM revient à ajouter un dossier puis à reconstruire, sans créer de nouveau module, de nouveau dépôt ni de nouvelle version de chaque côté.

---

## Contenu du paquet

```
WerbReferentiels/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbReferentiels.sha256      ← empreinte de l'application
├── application/
│   └── WerbReferentiels.html    ← l'outil (fichier unique, pages intégrées)
└── referentiels/                ← les pages Markdown, lisibles aussi dans Obsidian
    │                  ⚖️ Réglementation (obligatoire)
    ├── 1-NIS2/        0-carte.md · 1-obligations.md · sources.md
    ├── 2-CRA/         0-carte.md · 1-Comprendre… · 2-Qui_est_concerne · 3-Exigences… · 4-…fabricant · 5-Acheteur… · 6-Modeles… · 7-Resume_des_articles · sources.md
    ├── 3-RGPD/        0-carte.md · 1-Comprendre… · 2-Principes… · 3-Droits… · 4-Obligations… · 5-Securite… · 6-Cas_industriels · 7-Modeles… · sources.md
    │                  📐 Normes (volontaires, certifiables)
    ├── 4-ISO_27001/   0-carte.md · 1-Guide_ISO_IEC_27000.md · sources.md
    ├── 5-IEC_62443/   0-carte.md · 1-Guide_IEC_62443.md · 2-checklist… · 3-plan… · 4-modeles… · sources.md
    │                  🧰 Guides et cadres (recommandés)
    ├── 6-ANSSI/       0-carte.md · 1-hygiene_informatique.md · 2-systemes_industriels.md · sources.md
    ├── 7-NIST/        0-carte.md · 1-Guide_NIST.md · 2-checklist… · 3-plan… · 4-modeles… · sources.md
    └── correspondances.md       ← tableau croisé NIS2 ↔ ISO 27001 ↔ NIST ↔ IEC 62443 ↔ ANSSI
```

Le dépôt source contient en plus `sources/` (code) et `tests/`.

---

## Démarrage rapide

1. Ouvrir `application/WerbReferentiels.html` avec **Microsoft Edge** (ou Google Chrome), directement ou depuis le portail WerbSMSI (rubrique Gouvernance).
2. Choisir un référentiel dans le menu ou sur l'accueil, et commencer par sa **carte**.
3. Ouvrir le **Tableau de correspondances** (catégorie 🧭 Référentiels) pour relier les exigences entre elles.
4. Chercher un mot dans toutes les pages avec la zone 🔎 du bandeau.

Rien n'est à enregistrer : le module ne lit ni n'écrit aucun fichier.

---

## Fonctionnalités

### Bandeau

**☰** à droite du logo masque ou réaffiche le menu latéral ; **🖨 PDF** imprime la page affichée ou l'enregistre en PDF (module de lecture : ni base à ouvrir, ni export Excel). Recherche et thème restent dans le bandeau.

- **Trois sections, selon la nature des exigences** (1.7.0) : **⚖️ Réglementation** — obligatoire (NIS2, CRA, RGPD) ; **📐 Normes** — volontaires et certifiables (ISO/IEC 27001, IEC 62443) ; **🧰 Guides et cadres** — recommandés (ANSSI, NIST). L'accueil s'ouvre sur ces trois natures (un clic mène à la section), chaque section rappelle sa portée et la question à se poser ; le menu porte les mêmes en-têtes.
- **Menu par référentiel** : une catégorie par dossier de `referentiels/` (🇪🇺 NIS2, 🇪🇺 CRA, 🇪🇺 RGPD, 🌐 ISO 27001, 🏭 IEC 62443, 🇫🇷 ANSSI, 🇺🇸 NIST), ses pages dedans ; les pages de la racine (correspondances) dans la catégorie 🧭 Référentiels.
- **Carte de chaque référentiel** (`0-carte.md`, liste Markdown imbriquée) affichée au choix en **carte mentale**, en **arborescence** ou en liste. Exemple : les six fonctions du NIST CSF 2.0 (Gouverner, Identifier, Protéger, Détecter, Répondre, Rétablir), leurs 22 catégories, puis les liens vers les pages. Aucune bibliothèque : CSS seul, hors ligne.
- **Lecture** avec le lecteur commun des modules WerbSMSI (`guides.js`) : sommaire cliquable, tableaux, pages précédente et suivante dans le référentiel, signature de chaque page.
- **Liens entre pages** : les liens Markdown relatifs (`[Plan](3-plan.md)`, `[Carte NIST](../7-NIST/0-carte.md)`) ouvrent la page dans le module ; le bouton Précédent du navigateur ramène à la page d'avant.
- **Sources officielles** (`sources.md`) : liens vers cyber.gouv.fr, nist.gov, EUR-Lex, iso.org, ouverts dans un nouvel onglet.
- **Tableau de correspondances** : chaque exigence NIS2 (art. 20, 21 a à j, 23) reliée aux mesures ISO/IEC 27001:2022, aux catégories du NIST CSF 2.0, aux exigences IEC 62443, aux mesures d'hygiène de l'ANSSI et au module WerbSMSI où se trouve la preuve.
- **🔀 Réf. croisée WerbSMSI** (bouton de l'accueil, menu 🧭 Référentiels) : où chaque exigence est utilisée dans les modules WerbSMSI — NIS2, annexe A d'ISO/IEC 27001:2022, IEC 62443-3-3 et 3-2, hygiène ANSSI, catégories `EX-…` de WerbCartoSI. Vue d'ensemble modules × référentiels (carte de chaleur), part des exigences reprises par référentiel, matrice exigences × modules (◆ référentiel embarqué, ● citation déclarée, ○ repère cité dans un texte) avec filtres et détail des fichiers.
- **Recherche plein texte** dans toutes les pages, sans tenir compte des accents, mots surlignés.

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression reste toujours en clair.

---

## Données et format

WerbReferentiels est un **module de lecture** (charte §4) : `module.json` ne déclare pas de `donnees`. Il n'ouvre et n'enregistre aucune base, ne publie rien et ne lit aucune publication.

Le contenu est un ensemble de fichiers Markdown (UTF-8) dans `referentiels/`, intégrés au livrable à la construction (`window.WERB_GUIDES`) :

| Élément | Règle |
|---|---|
| Dossier `<n>-<NOM>/` | Un référentiel ; le nom sans numéro devient la catégorie du menu et fixe sa section (DORA, LPM → réglementation ; ISO, IEC → normes ; ANSSI, NIST → guides ; sinon « Autres référentiels ») ; le numéro fixe l'ordre, à garder dans l'ordre des sections. Les identifiants de page (`#guide:3-rgpd-0-carte`) contiennent ce numéro : renuméroter impose de mettre à jour les liens des autres modules (`werb_charte.py exigences` les signale) |
| `0-carte.md` | Carte du référentiel : une liste imbriquée (domaines → thèmes → liens) ; son premier paragraphe sert de présentation sur l'accueil |
| `1-….md`, `2-….md` | Pages numérotées dans l'ordre de lecture |
| `sources.md` | Liens officiels ; rangé en dernier (nom sans numéro) |
| Fichier à la racine | Page transverse (correspondances) |
| Ligne 1 de chaque page | `<!-- WerbReferentiels – Développé par @WerbHat -->` (contrôlée par l'audit) |

Les pages restent lisibles dans Obsidian ou tout lecteur Markdown : listes, tableaux et liens relatifs y fonctionnent aussi.

---

## Intégration WerbSMSI

- Rubrique : **gouvernance**, niveau **groupe** (le contenu est le même pour tous les sites).
- Objets **publiés** : *aucun*. Objets **lus** : *aucun*.
- Le portail affiche le module avec un bouton *Ouvrir*, sans puce de base (portail 1.1.1 ou plus récent).
- Le tableau de correspondances renvoie vers les modules où se tiennent les preuves : WerbGouvernance, WerbEBIOS, WerbMap, WerbExploitation, WerbIEC62443.
- La **réf. croisée** vient de la table des exigences de la charte WerbSMSI (§5.10) : `werb_charte.py exigences` produit `sources/src/croisee.js`, intégré à la construction. Après la publication d'un module qui cite de nouvelles exigences, relancer `exigences`, puis reconstruire et publier WerbReferentiels (l'audit le signale).

---

## Droits d'auteur sur les référentiels

- Le module contient des **synthèses rédigées pour WerbSMSI**, jamais les textes normatifs ISO/IEC, qui sont protégés par le droit d'auteur.
- Les guides de l'ANSSI publiés sous **Licence Ouverte** (Etalab) peuvent être repris plus largement, avec mention de la source : la page sur l'hygiène informatique reprend les intitulés des 42 mesures du guide de 2017.
- Les textes européens (EUR-Lex) et les publications du NIST sont librement consultables ; le module renvoie vers eux.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante ; les liens des sources s'ouvrent dans un nouvel onglet, uniquement sur clic.
- **Rien dans le navigateur** : aucune donnée, aucune préférence enregistrée. La page affichée est dans l'adresse (`#guide:…`), ce qui suffit pour le bouton Précédent.
- **Aucune donnée sensible** : le module ne contient que du contenu générique, sans nom de site ni de personne.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbReferentiels.sha256` :

```powershell
Get-FileHash .\application\WerbReferentiels.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder. Le livrable est assemblé par l'outil de la charte (`module.json › sources`), qui intègre aussi les pages de `referentiels/` (`module.json › guides`).

```powershell
python <WerbSMSI>\charte\outils\werb_charte.py construire .
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_referentiels.py          # Playwright pour Python et Microsoft Edge
python tests\test_theme.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, carte mentale et arborescence, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.

`croisee.js` est **produit** par `werb_charte.py exigences` : ne pas le modifier à la main.

`socle.js` et `guides.js` sont des copies conformes de la charte (guides 1.1.0 : regroupement par dossier, liens entre pages) : ne pas les modifier dans le module.

---

## Historique des versions

Version courante : **1.7.2** de novembre 2026 — réf. croisée : citations de WerbCyberArcade 1.8.0 (mesures d'hygiène, NIS2 4.2-EI/EE de l'attestation de sensibilisation). Précédente : **1.7.1** de novembre 2026 — réf. croisée : mesures d'hygiène de l'ANSSI reprises par WerbCyberArcade. Précédente : **1.7.0** de novembre 2026 — référentiels rangés en trois sections (réglementation, normes, guides et cadres) ; nouveau référentiel **IEC 62443** après ISO/IEC 27001 (carte, guide complet, checklist d'audit, plan de mise en œuvre, modèles et registres, sources). Précédente : **1.6.3** de novembre 2026 — réf. croisée : citations des catégories de schémas de WerbCartoSI par WerbIEC62443. Avant : **1.6.2** de novembre 2026 — réf. croisée : référentiel affiché « NIS2 », sans version. Précédente : **1.6.1** de novembre 2026 — réf. croisée : référentiel nommé **NIS2**. Précédente : **1.6.0** de novembre 2026 — bouton **🔀 Réf. croisée WerbSMSI** : table visuelle exigences × modules (NIS2, ISO/IEC 27001, IEC 62443, hygiène ANSSI, catégories EX-…), produite par la table des exigences de la charte. Versions précédentes : **1.5.1** de novembre 2026 — résumé des articles du CRA : un sous-titre par article. Versions précédentes : **1.5.0** de novembre 2026 — CRA : guide « Résumé des articles » (8 chapitres, 71 articles, 8 annexes, articles clés pour un site industriel). Versions précédentes : **1.4.0** de novembre 2026 — nouveau référentiel **RGPD** : carte, sept guides (comprendre le RGPD, principes et bases légales, droits des personnes, obligations du responsable, sécurité et cybersécurité, cas industriels, modèles et check-lists), sources. Versions précédentes : **1.3.0** de novembre 2026 — référentiel **CRA** (Cyber Resilience Act) : carte, cinq guides pour le comprendre et le mettre en œuvre (fabricant, acheteur et exploitant), modèles et check-lists, sources ; socle 1.9.0. Versions précédentes : **1.2.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7). Versions précédentes : **1.1.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.0.0** d'octobre 2026. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbReferentiels** — Développé par **@WerbHat**
