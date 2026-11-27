# WerbEBIOS

> Analyse de risques EBIOS Risk Manager (ANSSI) du groupe et des sites : 5 ateliers, MITRE ATT&CK, rapport Word
> Version **1.22.0** — Développé par **@WerbHat**

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
3. Dérouler les ateliers dans l'ordre du menu (chaque menu d'atelier s'ouvre sur une page **Présentation** reprenant le guide de l'ANSSI ; chaque page porte une note **💡 Aide à la saisie**, réductible par **−**) ; **Enregistrer** (Ctrl+S) dans `groupe/risques/` ou `sites/<CODE>/risques/`.

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
| 🗂️ Analyses | **Portefeuille et KPI** : une vignette par analyse du groupe et des sites (lue dans `groupe/risques/` et `sites/<CODE>/risques/`, sous-dossiers compris), identifiée par sa **référence** ; filtres périmètre et statut ; **📂 Ouvrir** ; **⧉ Dupliquer** pour la revue suivante (nouvelle référence, fichier créé dans le même dossier, origine tracée, cotations à réévaluer en option) ; **évolution des KPI** des analyses successives d'un périmètre (▲ ▼ amélioration / dégradation). Aussi accessible depuis l'accueil |
| 📊 Pilotage | Tableau de bord (indicateurs, risques bruts et résiduels par niveau, points d'attention), cartographies des risques avant et après traitement |
| 1️⃣ Atelier 1 | Étude et périmètre, missions, valeurs métier, biens supports (reliés aux **actifs WerbMap**), événements redoutés (**critères de sécurité** D / I / C / T, **besoin de sécurité**, impacts, gravité), socle de sécurité et écarts |
| 2️⃣ Atelier 2 | Échelles de motivation, ressources et activité ; catalogues des sources de risque et objectifs visés (prédéfinis ANSSI, complétables) ; création de couples par objectifs cochés ; **pertinence** (moyenne arrondie), couples retenus ; liaison événements redoutés ↔ couples ; **cartographie des sources de risque** (secteurs par source, anneaux de pertinence) |
| 3️⃣ Atelier 3 | Parties prenantes : **menace** = (dépendance × pénétration) / (maturité × confiance), zones de danger, de contrôle et de veille, cartographie de l'écosystème ; scénarios stratégiques (gravité = la plus forte des événements redoutés visés) ; **mesures sur l'écosystème** et **menace résiduelle** des parties prenantes, cartographies initiale et résiduelle |
| 4️⃣ Atelier 4 | Scénarios opérationnels : biens supports visés, séquence **Connaître / Rentrer / Trouver / Exploiter** avec les techniques **MITRE ATT&CK** (Enterprise et ICS, plus de 110 techniques), vraisemblance ; référentiel MITRE consultable ; **méthodes de cotation** du guide (expresse, vraisemblances élémentaires V1 à V4) et avancée (probabilité de succès × difficulté technique, complément du module), **modes opératoires** alternatifs et vraisemblance proposée sur le mode opératoire de moindre effort ; **graphe d'attaque** |
| 5️⃣ Atelier 5 | Un risque par scénario opérationnel : niveau brut (matrice gravité × vraisemblance), traitement (réduire, accepter, transférer, éviter), mesures, cotation et niveau résiduels ; mesures du PACS (type, responsable, échéance, statut) ; **propriétaire du risque**, **acceptation formelle** des risques résiduels, **cadre de suivi des risques** (instance, périodicité, revues, indicateurs) |
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
  2. **⟳ Charger les actifs et les SI** publiés par WerbMap (`site:actifs`, `site:si`) : les actifs se relient aux biens supports ; chaque **système d'information** peut devenir un bien support de type *Système (ensemble)* (**Créer le bien support** : nom, actifs et référence du SI ; **Mettre à jour** quand le SI a changé, écart signalé, trace au journal) ; avec eux, depuis la 1.20.0, la **difficulté de mise à jour** des actifs évaluée dans WerbExploitation (`site:difficultesMaj` : niveau N1 très facile à N5 très difficile, score sur 55), affichée dans la colonne *Difficulté MAJ* des biens supports et *Difficulté MAJ des biens visés* des scénarios opérationnels (niveau le plus difficile, actif, score, actifs évalués ; N4 et N5 en alerte). C'est une **aide à la cotation** de la vraisemblance — un actif difficile à mettre à jour reste exposé longtemps après un correctif — et un **complément du module, hors guide** : elle ne modifie ni la vraisemblance proposée ni la cotation ;
  3. **Publier** dans `sites/<CODE>/publications/werbebios.json` : `site:evenementsRedoutes` (1.7.0 : valeur métier, description, critères et besoin de sécurité, impacts, gravité, référence du groupe — repris par WerbPCR dans le périmètre métier du plan ; ER archivés exclus), `site:valeursMetier` (1.9.0 : nom, nature, description), `site:biensSupports` (nom, actifs ; **valeurs métier portées** depuis la 1.9.0 — WerbPCR en déduit les valeurs métier de chaque SI) et `site:syntheseRisques` (un risque par scénario opérationnel : événement redouté du groupe, gravité, vraisemblance, niveaux brut et résiduel, traitement, **gravité et vraisemblance résiduelles** et **état de l'acceptation** du risque résiduel avec ses dates (1.21.0, sans le nom de la personne : tableau de bord GRC du portail), **biens supports visés et leurs actifs** — WerbMap rattache ainsi chaque risque aux fiches SI qui contiennent ces actifs), sous le préfixe de la référence de l'étude. Les scénarios détaillés restent dans l'analyse.
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

- `sources/src/calculs.js` (`EbiosCalculs`) regroupe les calculs EBIOS RM, sans état : chaque fonction reçoit l'analyse en paramètre (pertinence, menace et zones, gravité, niveaux de risque, vraisemblance proposée, acceptation, points d'attention, KPI) ; date du jour injectable. `app.js` les applique à l'analyse ouverte, le portefeuille aux analyses lues dans l'espace.
- `sources/build.py` assemble `application/WerbEBIOS.html` : squelette, style, bibliothèques figées (empreinte contrôlée), figures de `sources/figures/` (URI `data:`), scripts (`signature.js`, `socle.js`, `referentiels.js`, `rapport.js`, `app.js`) et analyse d'exemple (`module.json › exemple`). Python 3.10 ou plus récent, rien d'autre.
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
- `tests/test_portefeuille.py` contrôle le portefeuille des analyses (1.15.0) dans l'espace de démonstration complété d'une analyse LYON 2025 rangée dans `risques/archives/` : accès depuis l'accueil, lecture de l'espace, vignettes par périmètre, filtres, évolution des KPI et tendances, ouverture depuis une vignette, menu « Analyses », duplication (référence proposée, référence prise refusée, fichier `EBIOS_LYON_<référence>`, origine, statut, cotations effacées, journal), analyse d'origine inchangée.
- `tests/test_guide_ebios.py` contrôle les compléments du guide EBIOS RM (1.16.0) sur l'analyse d'exemple : cartographie des sources de risque, mesures sur l'écosystème et menace résiduelle (cartographies initiale et résiduelle, point d'attention levé), méthode avancée (vraisemblance proposée, application, graphe d'attaque, grille), propriétaire, acceptation (acceptée, expirée), cadre de suivi et revue, enregistrement, rapport Word.
- `tests/test_calculs.py` contrôle les calculs seuls (1.17.0), sur une analyse construite à la main et une date fixée : pertinence, menace et zones, gravité, niveaux, vraisemblance proposée, acceptation, points d'attention datés, KPI, isolation entre analyses.
- `tests/test_maj_mitre.py` contrôle l'outil MITRE (1.17.0) sur des bundles STIX synthétiques : pas de réseau sans `--telecharger`, rapport, écriture, mode complet, fichier réécrit exécutable.
- `tests/test_mitre_import.py` contrôle les liens vers attack.mitre.org et la mise à jour du référentiel dans le module (1.18.0) : fichier non STIX refusé, rapport, application à la session, retour au référentiel embarqué, enregistrement dans l'espace, reprise à l'ouverture de l'espace, référentiel d'espace plus ancien ignoré.
- `tests/test_difficulte_maj.py` contrôle la difficulté de mise à jour reçue de WerbExploitation (1.20.0) dans l'espace de démonstration : rien avant le chargement, chargement avec l'inventaire, colonnes des biens supports et des scénarios opérationnels (niveau le plus difficile, actifs évalués, N4 en alerte), vraisemblance proposée inchangée, analyse enregistrée sans détail des évaluations.
- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, cartographie des risques et de l'écosystème dans les deux thèmes, pastilles de niveau inchangées, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.

---

## Méthode, référentiels et crédits

- **EBIOS Risk Manager** : méthode de l'ANSSI (guide publié sous Licence Ouverte). Les libellés de la base de connaissances en sont tirés.
- **MITRE ATT&CK®** : sélection de techniques Enterprise et ICS, © The MITRE Corporation, reproduite avec attribution conformément aux conditions d'utilisation d'ATT&CK.
- Bibliothèques embarquées : **JSZip** 3.10.1 et **docx** 9.8.1 (licence MIT).

---

## Historique des versions

Version courante : **1.22.0** de novembre 2026 — comptes de l'espace : connexion, lecture seule selon le rôle (socle 1.14.0). Précédente : **1.21.0** de novembre 2026 — cotation résiduelle et acceptation publiées dans la synthèse des risques (tableau de bord GRC du portail). Précédente : **1.20.0** de novembre 2026 — difficulté de mise à jour des actifs reçue de WerbExploitation, affichée dans les biens supports et les scénarios opérationnels comme aide à la cotation (sans effet sur la vraisemblance). Précédente : **1.19.1** de novembre 2026 — composant guides 1.3.0 de la charte. Précédente : **1.19.0** de novembre 2026 — atelier 4 vérifié sur le guide EBIOS RM v1.5 (2024) : vraisemblances élémentaires sur l'échelle V1 à V4, modes opératoires et mode opératoire de moindre effort, méthode avancée signalée comme complément du module, rapprochement vraisemblance / pertinence. Précédente : **1.18.0** de novembre 2026 — liens vers attack.mitre.org, mise à jour du référentiel MITRE dans le module (import des fichiers STIX, session ou espace WerbSMSI), référentiel embarqué en ATT&CK v20.1. Précédente : **1.17.0** de novembre 2026 — calculs extraits dans `calculs.js` (fonctions sans état, testées seules), portefeuille plus rapide (cache de session, lectures parallèles), version du référentiel MITRE ATT&CK affichée et outil `outils/maj_mitre.py`. Précédente : **1.16.0** de novembre 2026 — compléments du guide EBIOS RM : cartographie des sources de risque, menace résiduelle de l'écosystème, méthodes de cotation standard et avancée avec graphe d'attaque, cadre de suivi et acceptation des risques résiduels. Précédente : **1.15.0** de novembre 2026 — portefeuille des analyses (vignettes par référence, ouverture, duplication pour la revue annuelle, évolution des KPI), statut et origine de l'analyse, fichier nommé avec la référence. Précédente : **1.14.0** de novembre 2026 — note « 💡 Aide à la saisie » réductible sous le titre de chaque page, figure 3 du guide EBIOS RM à l'atelier 5. Précédente : **1.13.0** de novembre 2026 — page « Présentation » en tête de chaque menu d'atelier (descriptif et notes du guide EBIOS Risk Manager de l'ANSSI, lien entre les ateliers à l'atelier 5). Précédente : **1.12.0** de novembre 2026 — fichiers exportés nommés « SIGLE-SITE_… », nom du site dans les titres (socle 1.12.0). Précédente : **1.11.0** de novembre 2026 — base demandée par le portail ouverte directement quand l'espace est chargé dans le portail (socle 1.11.0). Précédente : **1.10.0** de novembre 2026 — identification unique : ouvert depuis le portail WerbSMSI, le module reprend le nom saisi dans le portail, sans écran « Votre nom » (socle 1.10.0). Précédente : **1.9.0** de novembre 2026 — publication au site des valeurs métier et des valeurs métier portées par chaque bien support (WerbPCR). Versions précédentes : **1.8.0** d'octobre 2026 — maturité et confiance des parties prenantes proposées depuis WerbPresta ; **1.7.0** d'octobre 2026 — critères et besoin de sécurité des événements redoutés, échelle « Besoin de sécurité », publication `site:evenementsRedoutes` pour WerbPCR (EBI-1). Versions précédentes : **1.6.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0) ; **1.5.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.4.0** d'octobre 2026 — SI de WerbMap repris comme biens supports, risques publiés avec leurs actifs (MAP-7.4) ; **1.3.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.2.0** d'octobre 2026 — verrou commun des bases (lecture seule ou prise de main, bandeau « Ouvert par … ») ; **1.1.0** — guides d'accompagnement en mode lecture dans le menu ❓ Aide. La 1.0.0 était la première version : 5 ateliers, MITRE ATT&CK, rapport Word, intégration groupe / sites. Détail dans [CHANGELOG.md](CHANGELOG.md).

## Mettre à jour le référentiel MITRE ATT&CK

**Dans le module** (page *Référentiel MITRE ATT&CK*, liens vers attack.mitre.org en tête de page) : téléchargez `enterprise-attack.json` et `ics-attack.json` depuis github.com/mitre-attack/attack-stix-data, puis **📥 Choisir les fichiers STIX…** : le rapport des changements s'affiche, puis le référentiel s'applique à la session ou s'enregistre dans l'espace WerbSMSI (`modeles/WerbEBIOS_mitre-attack.json`) pour toutes les analyses ; il remplace le référentiel embarqué à l'ouverture de l'espace s'il est plus récent.

**Dans le module livré** (administrateur), avec l'outil en ligne de commande, mêmes règles :

Le module embarque une sélection de techniques MITRE ATT&CK (Enterprise et ICS) rangées par tactique et par phase EBIOS. Sa version est affichée en tête de la page *Référentiel MITRE ATT&CK*, dans *À propos* et dans le rapport Word. Pour la mettre à jour :

```
python outils/maj_mitre.py --telecharger                 # rapport : versions, techniques renommées, retirées
python outils/maj_mitre.py --telecharger --ecrire        # met à jour sources/src/referentiels.js
python sources/build.py                                  # reconstruit le module, puis lancer les tests
```

- Sans `--telecharger`, l'outil n'accède pas au réseau : donnez les fichiers STIX téléchargés au préalable avec `--enterprise enterprise-attack.json --ics ics-attack.json` (dépôt github.com/mitre-attack/attack-stix-data).
- Par défaut (*sélection*), les techniques présentes gardent leur place : leur nom est mis à jour ; une technique révoquée est remplacée à la même place par celle que MITRE indique (parfois une sous-technique) ; une technique dépréciée sans remplaçante est retirée. `--complet` reprend toutes les techniques actives de chaque tactique (sans sous-technique).
- Les tactiques, leur nom affiché et leur phase EBIOS restent ceux du module. L'outil ne réécrit que le bloc compris entre `// <mitre:debut>` et `// <mitre:fin>` de `referentiels.js`.
- Les analyses existantes ne sont pas modifiées : une technique retirée du référentiel reste écrite telle quelle dans les séquences d'attaque.


---

**WerbEBIOS** — Développé par **@WerbHat**
