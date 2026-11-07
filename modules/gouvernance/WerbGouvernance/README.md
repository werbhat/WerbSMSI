# WerbGouvernance

> Gouvernance du SMSI du groupe : politique, rôles, socle de mesures, procédures, revues et plan d'actions
> Version **1.8.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

Dans un groupe à plusieurs sites industriels, la gouvernance du SMSI se décide au niveau du groupe : la politique, les rôles, le socle de mesures que chaque site doit appliquer, les procédures, les revues de direction et le plan d'actions. Ces éléments vivaient jusqu'ici dans des documents dispersés et dans l'onglet *Procédures SMSI* de WerbMap, outil d'un site.

WerbGouvernance les réunit dans une base unique au niveau du groupe. Il **publie** le socle, les rôles et les prestataires cadre pour tous les sites, et **lit** ce que les sites remontent : l'état du socle sur chaque site, leur conformité et leurs risques résiduels. Un écart au socle devient une action du plan en un clic.

Comme les autres modules WerbSMSI : un seul fichier HTML, aucune installation, aucune connexion réseau, rien dans le navigateur.

---

## Contenu du paquet

```
WerbGouvernance/
├── README.md · CHANGELOG.md · SECURITY.md
├── module.json                       ← manifeste lu par le portail WerbSMSI
├── WerbGouvernance.sha256            ← empreinte de l'application
├── application/
│   └── WerbGouvernance.html          ← l'outil (fichier unique, ~65 Ko, sans bibliothèque externe)
├── exemples/
│   └── Exemple.werbgouvernance.json  ← base de démonstration fictive (aussi intégrée à l'outil : bouton « Base d'exemple »)
├── guides/                      ← guides d'accompagnement (Markdown), lus dans ❓ Aide
│   ├── 1-Piloter_le_SMSI.md
│   └── 2-Elaborer_la_PSSI.md
├── sources/src/                      ← index.html, style.css, signature.js, socle.js, guides.js, xlsx.js, app.js
└── tests/                            ← test_menu.py (menu commun, Edge)
    └── test_parcours.py              ← parcours de non-régression dans Edge
```

Le paquet publié dans WerbSMSI (`modules/gouvernance/WerbGouvernance/`) ne contient que la documentation, `module.json`, l'empreinte, `application/` et `exemples/`.

---

## Démarrage rapide

1. Ouvrez `application/WerbGouvernance.html` dans **Microsoft Edge** (ou Chrome), directement ou depuis le portail WerbSMSI.
2. Saisissez votre nom : il est tracé dans le journal de la base.
3. **📂 Ouvrir une base** (par exemple `exemples/Exemple.werbgouvernance.json`) ou **✨ Nouvelle base**.
4. **Enregistrer** (Ctrl+S) : la base est un fichier `.werbgouvernance.json`, à ranger dans `SMSI_<GROUPE>/groupe/gouvernance/` sur le drive protégé.

> Sous Firefox, l'outil passe en mode compatibilité : l'enregistrement produit un téléchargement, et l'intégration WerbSMSI n'est pas disponible.

---

## Fonctionnalités

### Outils des tables : sélection, archivage, chercher / remplacer, largeur des colonnes

Dans les rôles, le socle de mesures, les prestataires, le catalogue des procédures, les revues de direction et le plan d'actions (charte §7.7) :

- **Sélection multiple** : une case par ligne et « tout sélectionner » ; la barre propose **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer** (définitif, après confirmation) et **✕ Désélectionner**.
- **Archiver** déplace la ligne dans la réserve de la base (date et auteur) : hors publication pour les sites (socle, rôles, prestataires), alertes, tableau de bord et compteurs ; une procédure archivée garde ses fiches. Elle se désarchive à l'identique ; « Afficher les archivées » la montre grisée.
- **🔁 Chercher / remplacer** : une colonne de texte libre (ou toutes), avec aperçu avant d'appliquer ; ni identifiant, ni liste de choix, ni date.
- **Largeur des colonnes** : glisser le bord d'un en-tête, double-clic pour revenir à la largeur automatique ; largeurs enregistrées dans la base.
- Tout est tracé au journal.

### Bandeau

**☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute la base : feuille Informations (organisation, politique), rôles, socle de mesures, prestataires, catalogue et fiches de procédure, revues, plan d'actions), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

| Écran | Contenu |
|---|---|
| **Tableau de bord** | Indicateurs, points d'attention (revue de politique ou de procédure échue, procédure validée sans approbateur ou sans étape, action en retard, mesure sans référence, rôle du groupe sans titulaire), application du socle par site, conformité et risques résiduels des sites |
| **Politique et périmètre** | Organisation, périmètre du SMSI, politique : référence, version, approbation, prochaine revue, engagements |
| **Rôles** | Rôles du groupe et rôles attendus sur chaque site, titulaires, missions |
| **Socle de mesures** | Mesures exigées sur tous les sites, domaine, caractère obligatoire, références normatives, preuve attendue |
| **Prestataires cadre** | Contrats négociés par le groupe, échéances |
| **Procédures** | Catalogue (code, version, statut, propriétaire, approbateur, revue) ; **import depuis une base WerbMap** |
| **Fiches de procédure** | Objet, domaine d'application, références, déclencheurs ; étapes par phase (ordre modifiable) ; **version rédigée** imprimable en PDF |
| **Revues de direction** | Date, participants, éléments d'entrée, décisions (ISO/IEC 27001 § 9.3) |
| **Plan d'actions** | Origine, site, responsable, échéance, statut ; actions créées depuis les écarts au socle |
| **Journal** | Chaque modification : date, auteur, objet, champ, avant, après |

**Références normatives du socle** : écrivez-les sous la forme `IEC62443-3-3:SR 1.1`, `ISO27001:A.5.16`, séparées par des virgules. WerbIEC62443 reconnaît les références `IEC62443-3-3:` et en déduit, pour chaque projet de site, si la mesure est appliquée.

**Procédures venant de WerbMap** : *Procédures › Importer les procédures d'une base WerbMap…* reprend le catalogue et les étapes d'une base WerbMap (1.0 à 1.2). Les procédures dont le code existe déjà sont ignorées.

### 📚 Guides d'accompagnement

Dans **❓ Aide**, dans la page *Guide du module* et sur l'accueil, même sans base ouverte (lecteur commun, charte §7.4). Le premier guide, **« Piloter la sécurité du groupe sans être expert »** (1.7.0), explique le sujet à un débutant : le SMSI et sa roue (planifier, faire, vérifier, agir), les rôles, la politique et le périmètre, le socle de mesures, les procédures, la revue de direction et le plan d'actions, les questions que le dirigeant doit suivre, erreurs fréquentes, prise en main du module.

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression et les exports restent toujours en clair.

---

## Données et format

- Une base est un fichier **`*.werbgouvernance.json`** à l'enveloppe commune WerbSMSI : `format` `WERBGOUVERNANCE`, **schéma 1**, `famille` `WERBSMSI`.
- `meta` : version de l'outil, `generateur` signé, dates et auteur ; `portee` `groupe` et `groupeId` quand la base est rattachée à l'espace.
- `journal` : `date`, `par`, `action`, `objet`, `element`, `champ`, `avant`, `apres`.
- `data` :

| Clé | Contenu |
|---|---|
| `organisation` | `nom`, `perimetre`, `politique` (titre, référence, version, approbateur, dateApprobation, prochaineRevue, lien, resume) |
| `roles` | `id` (R-nn), nom, niveau (`groupe` / `site`), titulaire, suppléant, missions |
| `mesures` | `id` (MS-nn), titre, domaine, obligatoire, `references` (liste), preuve |
| `prestataires` | `id` (PC-nn), nom, rôle, contrat, échéance, contact |
| `procedures` | `id`, code, titre, domaine, version, statut, propriétaire, approbateur, dateValid, revue, fréquence, objet, périmètre, références, déclencheurs, lien |
| `etapes` | `id`, `pid` (procédure), phase, section, étape, responsable, moyens, preuve, lien |
| `revues` | `id` (RD-nn), date, participants, éléments d'entrée, décisions |
| `actions` | `id` (A-nnn), titre, origine, site, responsable, échéance, statut, commentaire |

---

## Intégration WerbSMSI

- Rubrique **Gouvernance SMSI**, niveau **groupe**. Écran **Intégration WerbSMSI** : choisir l'espace `SMSI_<GROUPE>` (redemandé à chaque session), rattacher la base au groupe, publier.

| Objet | Sens | Contenu |
|---|---|---|
| `groupe:mesuresSocle` | publié | id, titre, domaine, obligatoire, références |
| `groupe:roles` | publié | id, nom, niveau, missions (sans titulaire) |
| `groupe:prestataires` | publié | id, nom, rôle, contrat (sans contact) |
| `site:syntheseConformite` | lu | taux, écarts, mesures du socle non appliquées (WerbIEC62443) |
| `site:syntheseRisques` | lu | risques résiduels des sites (WerbEBIOS) |
| `groupe:formations` | lu (1.6.0) | indicateurs de formation de WerbAcademie, sans nom : carte « Formation et sensibilisation » du tableau de bord (taux par site et du groupe, en retard, jamais suivies, dirigeants à jour) ; **élément d'entrée de la revue de direction** (ISO/IEC 27001 § 9.3), ajouté en un clic à la revue la plus récente |

- La publication écrit `publications/werbgouvernance.json`, **lisible par tous les sites** : rien de confidentiel. Elle demande une base enregistrée et est tracée au journal.
- Les sites dont le dossier est absent ou fermé par les droits du drive sont signalés « non accessible ».
- Sans espace choisi, WerbGouvernance fonctionne seul.

- **Depuis le portail WerbSMSI** : sous ce module, une puce par site ouvre directement sa base. Le module demande alors un dossier (celui de l'espace, du site ou du module) puis ouvre la base, qui s'enregistre à sa place.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : aucune bibliothèque externe ; la politique de sécurité (CSP) bloque toute connexion sortante, sans `'unsafe-eval'`.
- **Rien dans le navigateur** : la base vit en mémoire et dans son fichier. La purge ne touche que les clés `werb.werbgouvernance.`.
- **Publication maîtrisée** : action explicite, base enregistrée, auteur tracé ; ni titulaires de rôles ni contacts de prestataires.
- **Intégrité** : comparez l'empreinte de `application/WerbGouvernance.html` à celle de `WerbGouvernance.sha256` :

```powershell
Get-FileHash .\application\WerbGouvernance.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

- Module créé avec `werb_charte.py nouveau` et assemblé par `werb_charte.py construire` : `sources/src/index.html` reçoit `style.css` et les scripts `signature.js`, `socle.js`, `app.js` (ordre fixé par `module.json › sources`).
- La version se règle dans `sources/src/signature.js` **et** `module.json`, qui doivent concorder.
- Les tableaux (rôles, mesures, prestataires, procédures, revues, actions) sont décrits par la constante `TABLES` de `app.js` : pour ajouter une colonne, ajoutez-la à la table, elle est éditée, normalisée et journalisée automatiquement.
- Le menu latéral est affiché par `WerbSocle.menu` (socle de la charte) à partir de la constante `MENU` de `app.js` : catégories, emoji, teinte (`c`) et vues.
- Le dépôt source a été reconstitué en octobre 2026 depuis le paquet 1.0.0 publié (livrable reconstruit identique octet pour octet). Le test de parcours d'origine (24 contrôles) n'a pas été conservé : `tests/test_menu.py` contrôle le menu commun.

```powershell
python <WerbSMSI>\charte\outils\werb_charte.py construire . --date AAAA-MM-JJ
python tests\test_menu.py                          # Playwright pour Python, Edge installé
python tests\test_guides.py
python tests\test_theme.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_formation.py` contrôle les indicateurs de formation de WerbAcademie (1.6.0) : rien sans espace ouvert ; carte du tableau de bord (sites, groupe, dirigeants) ; élément d'entrée proposé, ajouté à la revue la plus récente, signalé « déjà », journalisé et enregistré.
- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.

---

## Historique des versions

Version courante : **1.8.0** de novembre 2026 — guide « Élaborer la politique de sécurité (PSSI) ». Versions précédentes : **1.7.0** de novembre 2026 — guide de débutant « Piloter la sécurité du groupe sans être expert ». Versions précédentes : **1.6.0** d'octobre 2026 — indicateurs de formation de WerbAcademie au tableau de bord et en élément d'entrée de la revue de direction. Versions précédentes : **1.5.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0) ; **1.4.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.3.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.2.0** d'octobre 2026 — verrou commun des bases (lecture seule ou prise de main, bandeau « Ouvert par … ») ; **1.1.0** — menu latéral commun WerbSMSI (catégories repliables sur fond de couleur). Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbGouvernance** — Développé par **@WerbHat**
