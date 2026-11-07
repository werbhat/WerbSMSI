# WerbEBIOS

> Analyse de risques EBIOS Risk Manager (ANSSI) du groupe et des sites : 5 ateliers, MITRE ATT&CK, rapport Word
> Version **1.9.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

L'analyse de risques du SMSI se fait avec la méthode **EBIOS Risk Manager** de l'ANSSI : une analyse d'entreprise au niveau du groupe, déclinée par chaque site. WerbEBIOS la conduit dans **un seul fichier HTML**, hors ligne, avec les règles de l'environnement WerbSMSI : rien dans le navigateur, une analyse = un fichier sur le drive protégé, menu commun, publication explicite vers le groupe et les sites, ouverture depuis le portail.

C'est le module de la rubrique **Analyse des risques** de WerbSMSI.

---

## Contenu du paquet

```
WerbEBIOS/
├── README.md · CHANGELOG.md · SECURITY.md
├── module.json                                   ← manifeste lu par le portail WerbSMSI
├── WerbEBIOS.sha256                              ← empreinte de l'application
├── application/
│   └── WerbEBIOS.html                            ← l'outil (fichier unique, ~1,4 Mo dont 1,3 Mo de bibliothèques Word)
├── exemples/
│   ├── Exemple_Site_Industriel.werbebios.json    ← site LYON fictif, 5 ateliers (intégré : bouton « Analyse d'exemple »)
│   └── Exemple_Groupe.werbebios.json             ← analyse d'entreprise fictive (ateliers 1 et 2)
├── guides/                                       ← 8 guides d'accompagnement (Markdown), lus dans ❓ Aide
├── sources/
│   ├── src/  (index.html, style.css, signature.js, socle.js, guides.js, modele-word.js, referentiels.js, rapport.js, app.js)
│   ├── vendor/bibliotheques.js                   ← JSZip 3.10.1 et docx 9.8.1, figés (empreinte contrôlée)
│   └── build.py
├── outils/exemples.py                            ← produit les analyses d'exemple
└── tests/                                        ← test_parcours.py (parcours dans Edge), test_guides.py (guides)
```

Le paquet publié dans WerbSMSI (`modules/risques/WerbEBIOS/`) ne contient que la documentation, `module.json`, l'empreinte, `application/`, `exemples/` et `guides/`.

---

## Démarrage rapide

1. Ouvrir `application/WerbEBIOS.html` dans **Microsoft Edge**, ou cliquer une puce de WerbEBIOS dans le portail WerbSMSI.
2. Saisir votre nom (tracé dans le journal), puis **✨ Nouvelle analyse**, **📂 Ouvrir** ou **🧪 Analyse d'exemple**.
3. Dérouler les ateliers dans l'ordre du menu ; **Enregistrer** (Ctrl+S) dans `groupe/risques/` ou `sites/<CODE>/risques/`.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement.

---

## Fonctionnalités

### Outils des tables : sélection, archivage, chercher / remplacer, largeur des colonnes

Dans les tableaux des ateliers 1 à 5 (valeurs métier, biens supports, événements redoutés, sources de risque, parties prenantes, scénarios stratégiques et opérationnels, mesures…) et la vue « Risques et traitement » (charte §7.7) :

- **Sélection multiple** : une case par ligne et « tout sélectionner » ; la barre propose **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer** (définitif, après confirmation) et **✕ Désélectionner**.
- **Archiver** déplace la ligne dans la réserve de la base (date et auteur) : hors cartographie, risques publiés (`site:syntheseRisques`), biens supports publiés, tableau de bord et rapport ; ses liens sont gardés et reviennent au désarchivage. La vue « Risques et traitement » partage les données des scénarios opérationnels et n'offre pas la suppression. Elle se désarchive à l'identique ; « Afficher les archivées » la montre grisée.
- **🔁 Chercher / remplacer** : une colonne de texte libre (ou toutes), avec aperçu avant d'appliquer ; ni identifiant, ni liste de choix, ni date.
- **Largeur des colonnes** : glisser le bord d'un en-tête, double-clic pour revenir à la largeur automatique ; largeurs enregistrées dans la base.
- Tout est tracé au journal.

### Bandeau

**☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute l'analyse : feuille Informations puis une feuille par tableau des ateliers (missions, valeurs métier, biens supports, événements redoutés, socle, couples SR/OV, parties prenantes, scénarios, risques, mesures…)), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

| Menu | Contenu |
|---|---|
| 📊 Pilotage | Tableau de bord (indicateurs, risques bruts et résiduels par niveau, points d'attention), cartographies des risques avant et après traitement |
| 1️⃣ Atelier 1 | Étude et périmètre, missions, valeurs métier, biens supports (reliés aux **actifs WerbMap**), événements redoutés (**critères de sécurité** D / I / C / T, **besoin de sécurité**, impacts, gravité), socle de sécurité et écarts |
| 2️⃣ Atelier 2 | Échelles de motivation, ressources et activité ; catalogues des sources de risque et objectifs visés (prédéfinis ANSSI, complétables) ; création de couples par objectifs cochés ; **pertinence** (moyenne arrondie), couples retenus ; liaison événements redoutés ↔ couples |
| 3️⃣ Atelier 3 | Parties prenantes : **menace** = (dépendance × pénétration) / (maturité × confiance), zones de danger, de contrôle et de veille, cartographie de l'écosystème ; scénarios stratégiques (gravité = la plus forte des événements redoutés visés) |
| 4️⃣ Atelier 4 | Scénarios opérationnels : biens supports visés, séquence **Connaître / Rentrer / Trouver / Exploiter** avec les techniques **MITRE ATT&CK** (Enterprise et ICS, plus de 110 techniques), vraisemblance ; référentiel MITRE consultable |
| 5️⃣ Atelier 5 | Un risque par scénario opérationnel : niveau brut (matrice gravité × vraisemblance), traitement (réduire, accepter, transférer, éviter), mesures, cotation et niveau résiduels ; mesures du PACS (type, responsable, échéance, statut) |
| 📄 Rapport | **Rapport Word** complet et signé (page de garde, 5 ateliers, cartographies, plan de traitement, risques résiduels), habillé au besoin du **modèle Word d'entreprise commun** (`SMSI_<SIGLE>/modeles/Modele_entete.docx`, ou un fichier) ; exports CSV de chaque tableau |
| ⚙️ Base | Échelles (gravité, vraisemblance, niveaux de risque, **besoin de sécurité**), matrice de risque et seuils de l'écosystème modifiables ; intégration WerbSMSI ; journal ; à propos |
| ❓ Aide | Guide du module ; base de connaissances (référentiels ANSSI et échelles de l'analyse réunis sur une page) ; **guides d'accompagnement** de l'étude, en mode lecture |

- Identifiants automatiques (`VM-01`, `ER-01`, `SROV-01`, `SO-01`…), édition dans le tableau, **✎** pour la fiche complète (listes à cocher, séquence d'attaque).
- Supprimer un élément retire aussi les liens qui le citent (le module prévient avant).
- Les éléments repris du groupe portent leur **référence groupe** (colonne « Réf. groupe »).

### Guides d'accompagnement
Le menu **❓ Aide** donne accès à huit guides, dans l'ordre de l'étude : guide méthodologique, cadrage de l'analyse, matrices des ateliers, évaluation du socle de sécurité, rapport d'analyse, plan de traitement, registre des risques et checklist qualité. Chacun s'affiche en mode lecture, avec un sommaire cliquable et des boutons pour passer au document précédent ou suivant. Ils sont aussi proposés sur l'écran d'accueil, avant d'ouvrir une analyse.

Ce sont les fichiers Markdown du dossier `guides/`, dont la première ligne porte la signature (`<!-- WerbEBIOS – Développé par @WerbHat -->`). Pour les faire évoluer, modifier, ajouter ou retirer un fichier `.md`, puis reconstruire (`python sources/build.py`) : la page les intègre au moment de l'assemblage. L'ordre suit le nom du fichier (`1-…`, `2-…`).

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression et les exports restent toujours en clair.

---

## Données et format

- Une analyse est un fichier **`*.werbebios.json`** à l'enveloppe commune WerbSMSI : `format` `WERBEBIOS`, schéma 1, `meta.portee` `groupe` ou `site`.
- Contenu de `data` :

| Clé | Contenu |
|---|---|
| `etude` | nom, référence (préfixe des publications), organisation, périmètre, objectifs, participants, version, date, classification |
| `echelles` | `gravite`, `vraisemblance`, `niveauxRisque` (4 niveaux), `matrice[V-1][G-1]`, `seuilDanger`, `seuilControle` |
| `missions`, `vm`, `bs`, `er`, `socle` | atelier 1 ; `rg` = référence de l'élément repris du groupe ; `bs[].actifs` = TAG WerbMap |
| `srov` | atelier 2 (cotations 1 à 4, `retenu`) |
| `pp`, `ss` | atelier 3 |
| `so` | atelier 4 (`actions` : `phase`, `technique`, `description`) et atelier 5 (`traitement`, `mesures`, `gRes`, `vRes`, `justification`) |
| `mesures` | PACS |
| `inventaire` | copie des actifs publiés par WerbMap pour le site |

- Formats anciens lus : *aucun*.

---

## Intégration WerbSMSI

- Rubrique **Analyse des risques**, niveaux **groupe** et **site** ; écran **Base › Intégration WerbSMSI**.
- **Groupe** (`groupe/risques/`) : publie dans `publications/werbebios.json`, lisible par tous les sites :

| Objet | Contenu |
|---|---|
| `groupe:echelles` | gravité, vraisemblance, niveaux de risque, besoins de sécurité (`besoins`) |
| `groupe:valeursMetier` | identifiant, nom, description |
| `groupe:evenementsRedoutes` | identifiant, événement, valeur métier, gravité, impacts, critères de sécurité, besoin de sécurité |
| `groupe:sourcesRisque` | couples retenus : source, objectif, pertinence |

- **Site** (`sites/<CODE>/risques/`) :
  1. **⇩ Reprendre du groupe** : échelles (y compris le besoin de sécurité), valeurs métier, événements redoutés (avec leurs critères et leur besoin), couples SR/OV et socle de mesures de WerbGouvernance (ajout, ou mise à jour des éléments déjà repris : le groupe fait foi ; rien n'est supprimé) ;
  2. **⟳ Charger les actifs et les SI** publiés par WerbMap (`site:actifs`, `site:si`) : les actifs se relient aux biens supports ; chaque **système d'information** peut devenir un bien support de type *Système (ensemble)* (**Créer le bien support** : nom, actifs et référence du SI ; **Mettre à jour** quand le SI a changé, écart signalé, trace au journal) ;
  3. **Publier** dans `sites/<CODE>/publications/werbebios.json` : `site:evenementsRedoutes` (1.7.0 : valeur métier, description, critères et besoin de sécurité, impacts, gravité, référence du groupe — repris par WerbPCR dans le périmètre métier du plan ; ER archivés exclus), `site:valeursMetier` (1.9.0 : nom, nature, description), `site:biensSupports` (nom, actifs ; **valeurs métier portées** depuis la 1.9.0 — WerbPCR en déduit les valeurs métier de chaque SI) et `site:syntheseRisques` (un risque par scénario opérationnel : événement redouté du groupe, gravité, vraisemblance, niveaux brut et résiduel, traitement, **biens supports visés et leurs actifs** — WerbMap rattache ainsi chaque risque aux fiches SI qui contiennent ces actifs), sous le préfixe de la référence de l'étude. Les scénarios détaillés restent dans l'analyse.
- Le portail et WerbGouvernance consolident les synthèses des sites. Depuis le portail, une puce 🏢 / 📍 ouvre directement l'analyse.
- Sans espace choisi, WerbEBIOS fonctionne seul.

- **Depuis le portail WerbSMSI** : sous ce module, une puce par site ouvre directement sa base. Le module demande alors un dossier (celui de l'espace, du site ou du module) puis ouvre la base, qui s'enregistre à sa place.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) bloque toute connexion sortante ; pas de `'unsafe-eval'`.
- **Rien dans le navigateur** : l'analyse reste en mémoire puis dans votre fichier.
- **Une analyse de risques est sensible** : réservez `groupe/risques/` à l'équipe SMSI et `sites/<CODE>/risques/` à l'équipe du site. Seuls des niveaux remontent au groupe.
- **Intégrité** : comparer l'empreinte du fichier à celle de `WerbEBIOS.sha256` :

```powershell
Get-FileHash .\application\WerbEBIOS.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

- `sources/build.py` assemble `application/WerbEBIOS.html` : squelette, style, bibliothèques figées (empreinte contrôlée), scripts (`signature.js`, `socle.js`, `referentiels.js`, `rapport.js`, `app.js`) et analyse d'exemple (`module.json › exemple`). Python 3.10 ou plus récent, rien d'autre.
- Les tableaux sont décrits par la constante `TABLES` de `app.js` (types `id`, `text`, `area`, `select`, `niv`, `cot`, `multi`, `calc`…) : une colonne ajoutée est éditée, normalisée, journalisée et exportée automatiquement. Les calculs de la méthode sont en tête de `app.js` (`pertinence`, `menace`, `zone`, `graviteSS`, `niveauBrut`, `niveauResiduel`).
- `referentiels.js` : base de connaissances (sources de risque, objectifs visés, impacts, types…) et sélection MITRE ATT&CK, avec la phase EBIOS de chaque tactique.

```powershell
python outils\exemples.py --demo <WerbSMSI>\demo\SMSI_GROUPE_DEMO
python sources\build.py --date AAAA-MM-JJ
python tests\test_parcours.py                      # Playwright pour Python, Edge installé
python tests\test_theme.py
python tests\test_prestataires.py
python tests\test_tables.py
python tests\test_evenements.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_tables.py` contrôle les outils des tables (1.6.0) : archivage d'un scénario depuis la vue Risques (réserve, auteur, compteurs), « Afficher les archivées », désarchivage, suppression multiple avec retrait des liens, chercher / remplacer (colonnes proposées, aperçu), largeur des colonnes enregistrée.
- `tests/test_evenements.py` contrôle les critères et le besoin de sécurité des événements redoutés (1.7.0) dans l'espace de démonstration : échelle « Besoin de sécurité » modifiable, saisie d'un ER (critères D et I, besoin), publication du groupe (échelle et ER), reprise au site, publication de `site:evenementsRedoutes` (préfixe de l'étude, valeur métier, ER archivé exclu ; 1.9.0 : `site:valeursMetier` et valeurs métier des biens supports, ni scénario ni justification), rapport Word, analyse antérieure ouverte sans perte.
- `tests/test_prestataires.py` contrôle les prestataires de WerbPresta dans l'atelier 3 (1.8.0) : reçus avec l'inventaire, seuls les évalués proposés, maturité et confiance calculées, rien d'appliqué sans action, partie prenante créée (catégorie déduite) ou existante mise à jour, journal, enregistrement.
- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, cartographie des risques et de l'écosystème dans les deux thèmes, pastilles de niveau inchangées, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.

---

## Méthode, référentiels et crédits

- **EBIOS Risk Manager** : méthode de l'ANSSI (guide publié sous Licence Ouverte). Les libellés de la base de connaissances en sont tirés.
- **MITRE ATT&CK®** : sélection de techniques Enterprise et ICS, © The MITRE Corporation, reproduite avec attribution conformément aux conditions d'utilisation d'ATT&CK.
- Bibliothèques embarquées : **JSZip** 3.10.1 et **docx** 9.8.1 (licence MIT).

---

## Historique des versions

Version courante : **1.9.0** de novembre 2026 — publication au site des valeurs métier et des valeurs métier portées par chaque bien support (WerbPCR). Versions précédentes : **1.8.0** d'octobre 2026 — maturité et confiance des parties prenantes proposées depuis WerbPresta ; **1.7.0** d'octobre 2026 — critères et besoin de sécurité des événements redoutés, échelle « Besoin de sécurité », publication `site:evenementsRedoutes` pour WerbPCR (EBI-1). Versions précédentes : **1.6.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0) ; **1.5.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.4.0** d'octobre 2026 — SI de WerbMap repris comme biens supports, risques publiés avec leurs actifs (MAP-7.4) ; **1.3.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.2.0** d'octobre 2026 — verrou commun des bases (lecture seule ou prise de main, bandeau « Ouvert par … ») ; **1.1.0** — guides d'accompagnement en mode lecture dans le menu ❓ Aide. La 1.0.0 était la première version : 5 ateliers, MITRE ATT&CK, rapport Word, intégration groupe / sites. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbEBIOS** — Développé par **@WerbHat**
