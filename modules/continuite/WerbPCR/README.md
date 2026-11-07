# WerbPCR

> Plan de cybersécurité et de reprise d'un site : PCI (périmètre métier EBIOS, approche systémique, SI, fiches par SI, plan d'actions) et PRI (bilan d'impact, RTO / RPO, dépendances, ordre et procédures de reprise, contrôle des sauvegardes)
> Version **1.6.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

L'analyse de risques EBIOS du site dit **ce qui peut arriver** et **à quoi cela porte atteinte**. Il reste à écrire, système par système, **comment on s'en protège et comment on redémarre** : c'est le plan de cybersécurité et de reprise (PCI, puis plan de reprise informatique PRI).

WerbPCR construit ce plan à partir de ce que les autres modules publient déjà : les événements redoutés de l'analyse EBIOS du site (WerbEBIOS) et les systèmes d'information de l'inventaire (WerbMap). Rien n'est ressaisi : seules les analyses propres au plan se rédigent ici.

Le plan de cybersécurité et de reprise réunit **deux plans distincts**, nommés de la même façon dans le module, le guide et le document Word, pour que la gouvernance sache toujours duquel elle parle :

| Plan | Objet | Dans WerbPCR |
|---|---|---|
| **PCI — Plan de continuité informatique** | Permettre aux systèmes d'information du site de **continuer à fonctionner** malgré les menaces : périmètre métier, analyse de chaque système, prévention, préparation de la reprise, plan d'actions | Menu **🛟 Plan PCI**, volets 1 à 5 ; partie 1 du document Word |
| **PRI — Plan de reprise informatique** | **Redémarrer** un système après un incident majeur : bilan d'impact, RTO, RPO, dépendances, ordre et procédures de reprise | Menu **🔁 Plan PRI** (1.2.0), partie 2 du document |

La 1.2.0 couvre le **Plan PCI** et le **Plan PRI**, et leur document Word. Suivront la publication `site:continuite` (PCR-10), puis la crise et les exercices.

---

## Contenu du paquet

```
WerbPCR/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbPCR.sha256               ← empreinte de l'application
├── application/
│   └── WerbPCR.html             ← l'outil (fichier unique)
├── exemples/                    ← plan d'exemple fictif (site LYON)
└── guides/                      ← guides d'accompagnement (menu ❓ Aide)
    ├── 0-Continuite_et_reprise_en_clair.md ← guide de débutant, lu dans ❓ Aide
    ├── 1-Etablir_le_plan.md
    └── 2-Etablir_le_PRI.md
```

---

## Démarrage rapide

1. Ouvrir `application/WerbPCR.html` avec **Microsoft Edge**, directement ou depuis le portail WerbSMSI (rubrique Continuité & résilience).
2. **✨ Nouveau plan**, puis *⚙️ Base › Intégration WerbSMSI* : choisir l'espace, rattacher le plan à son site. Les événements redoutés, les systèmes d'information et les échelles du groupe sont reçus.
3. Compléter les volets, puis **💾 Enregistrer** (Ctrl+S) dans `sites/<CODE>/continuite/`.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier.

---

## Fonctionnalités

| Menu | Contenu |
|---|---|
| 📊 Pilotage | **Tableau de bord** (avec les définitions du PCI et du PRI) : valeurs métier, événements redoutés, descriptions saisies, systèmes d'information, points d'attention (données non reçues, ER sans critère ou sans besoin, descriptions orphelines). **Identification du plan** : intitulé, référence, organisation, site, version, date, rédacteur, approbateur, classification |
| 🛟 Plan PCI › 1. Périmètre métier | Un tableau par **valeur métier** : événement redouté, ID, **critères de sécurité** (D, I, C, T), **besoin de sécurité**, impacts, **gravité**, repris de l'analyse EBIOS du site (🔗, lecture seule, date de réception) ; **description** saisie librement par événement, gardée à chaque nouvelle réception. Une description dont l'événement n'est plus publié est signalée et peut être supprimée |
| 🛟 Plan PCI › 2. Approche systémique | Le **fil conducteur** du plan : pourquoi et comment chaque système est analysé (description, responsables, événements redoutés, risques, mesures de prévention, mesures de continuité ; la reprise au fonctionnement normal renvoie au PRI). Texte proposé, modifiable pour le site (titres, puces, gras), **↺ Rétablir le texte proposé** |
| 🛟 Plan PCI › 3. Systèmes d'information | Liste des SI publiés par WerbMap (🔗) : nom, fonction, besoins D / I / C sur l'échelle de gravité du groupe, VLAN, actifs ; **➕ Créer** ou **📝 Ouvrir** la fiche |
| 🛟 Plan PCI › 4. Fiches par SI | Une fiche d'analyse systémique par SI (1.1.0) : **a** description (fonction, VLAN, actifs reçus + saisie), **b** responsables (rôle proposé parmi ceux du groupe, nom, rôle pendant une crise, suppléant), **c** valeurs métier portées par le SI (1.6.0) — celles des biens supports EBIOS qui contiennent un actif du SI sont **proposées** et cochées à la création ; saisie libre sans analyse EBIOS —, **d** événements redoutés à cocher — ceux des valeurs métier cochées d'abord, les autres affichables ; ceux qu'un risque EBIOS relie à un actif du SI sont **proposés** et cochés à la création —, **e** risques identifiés (type, description) avec les risques EBIOS visant le SI, **f** mitigation (mesure, état, référence de suivi), **g** mesures de continuité — réponse immédiate et mode dégradé (1.5.0) : ordre, type (alerte et décision, confinement, bascule sur un secours, mode dégradé, contournement manuel, déclenchement du PRI), mesure, délai de mise en œuvre, responsable, référence de suivi ; en dessous, **renvoi au Plan PRI** en lecture seule (RTO, RPO, mode dégradé du bilan d'impact, rang dans l'ordre de reprise, procédure, état des sauvegardes). Fiche d'un SI retiré de WerbMap : gardée, signalée, supprimable |
| 🛟 Plan PCI › 5. Plan d'actions | Objectifs proposés **R#1 à R#10** (responsabilités et sensibilisation … audit et contrôle), modifiables, réordonnables, supprimables, ajoutables ; chaque objectif se développe en **rubriques** (titre, ID plan d'action, description, lien de l'élément de suivi dans WerbSMSI) proposées par défaut ; **↺** rétablit les objectifs proposés manquants ; sous l'objectif **R#1** (responsabilités et sensibilisation), carte **🎓 Formation et sensibilisation du site** : indicateurs reçus de WerbAcademie (1.4.0) — personnes, formations exigées, à jour, à renouveler, en retard, jamais, taux, par population et pour le groupe, sans nom — repris dans le document Word |
| 🔁 Plan PRI › 1. Bilan d'impact (BIA) | Par SI (1.2.0) : besoins D / I / C et gravité la plus forte des ER de la fiche PCI (repères), **RTO** et **RPO** saisis en durées (« 4 h », « 2 j », « 30 min », « 1 sem », « 1 mois »), impact d'un arrêt, mode dégradé ; PRI d'un SI retiré de WerbMap signalé, supprimable |
| 🔁 Plan PRI › 2. Dépendances | Par SI : **SI du site dont il dépend** (cases), **dépendances externes** (type, nom, commentaire, sans secret) ; SI dépendant d'un SI au RTO plus long signalé |
| 🔁 Plan PRI › 3. Ordre de reprise | **Calculé** : vagues de dépendances, RTO le plus court d'abord ; **rétabli au plus tôt** (procédure + plus longue chaîne de dépendances) comparé au RTO ; boucle de dépendances ; points d'attention par SI |
| 🔁 Plan PRI › 4. Procédures de reprise | Par SI, dans l'ordre de reprise : déclenchement, **étapes** (action, responsable avec les rôles du groupe, durée, vérification ; ↑ ↓), durée totale, retour à la normale ; rappel des mesures de reprise de la fiche PCI et des sauvegardes du SI |
| 🔁 Plan PRI › 5. Contrôle des sauvegardes | **RPO ↔ sauvegardes reçues** (WerbExploitation) : sauvegarde la plus fréquente du SI (périodicités du registre ou durée libre) au plus égale au RPO, dernier test de restauration de moins d'un an ; conforme, à vérifier, non couvert |
| 📄 Document › Document Word | Page de garde, **définitions du PCI et du PRI**, puis le **Plan PCI** en partie 1 (chapitres PCI 1 à PCI 5, une section par fiche SI et par objectif), habillé du **modèle Word de l'entreprise** (modèle commun de l'espace ou fichier) ; le PRI viendra en partie 2 |
| ⚙️ Base | Intégration WerbSMSI (rattachement, ⟳ Actualiser, état des données reçues), journal, à propos |
| ❓ Aide | Guide du module (avec les définitions du PCI et du PRI), guides « Établir le Plan PCI (plan de continuité informatique) » et « Établir le Plan PRI (plan de reprise informatique) » (1.2.0) |

Bandeau commun : 📂 Ouvrir, 💾 Enregistrer, 📑 Enregistrer sous…, 📊 Export Excel (toute la base : informations, périmètre métier, SI, fil conducteur, fiches SI, plan d'actions), 🖨 PDF, ⏏ Fermer.

---

### 📚 Guides d'accompagnement

Dans **❓ Aide**, dans la page *Guide du module* et sur l'accueil, même sans base ouverte (lecteur commun, charte §7.4). Le premier guide, **« Continuité et reprise en clair »** (1.6.0), explique le sujet à un débutant : PCA, PCI, PRI et gestion de crise, chronologie d'un incident, RTO, RPO et mode dégradé avec des exemples industriels, bilan d'impact, ce qui se prépare avant, erreurs fréquentes, les deux plans dans WerbPCR.

## Données et format

- Une base est un fichier **`*.werbpcr.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBPCR`, schéma 1).
- Contenu de `data` :

| Clé | Type | Description |
|---|---|---|
| `plan` | objet | identification : `nom`, `reference`, `organisation`, `site`, `version`, `date`, `redacteur`, `approbateur`, `classification` |
| `perimetre.descriptions` | objet | description saisie par événement redouté : `{ "<id publié>": "texte" }` |
| `systemique.texte` | texte | fil conducteur (mise en forme légère : `###` titre, `-` puce, `**gras**`) ; absent : texte proposé |
| `fiches` | objet | fiche par SI (clé : identifiant du SI publié) : `description`, `responsables`, `vms` (identifiants des valeurs métier cochées, 1.6.0), `vmLibres` (valeurs métier saisies, 1.6.0), `ers` (identifiants des ER cochés), `risques`, `mitigation`, `remediation` (1.1.0 ; depuis la 1.5.0, mesures de continuité, champ `type` ajouté) |
| `pri.sis` | objet | PRI par SI (clé : identifiant du SI publié, 1.2.0) : `rto`, `rpo` (heures, `null` : non défini), `impact`, `degrade`, `amont` (identifiants des SI dont il dépend), `externes` (`type`, `nom`, `commentaire`), `declenchement`, `etapes` (`action`, `responsable`, `duree`, `verification`), `retour` ; absent : PRI vide |
| `objectifs` | tableau | objectifs du plan d'actions : `code`, `titre`, `rubriques` (`titre`, `idAction`, `description`, `lien`) ; absent : objectifs proposés R#1 à R#10 (1.1.0) |
| `recus` | objet | copie des publications reçues : `evenementsRedoutes`, `si`, `risques`, `sauvegardes`, `roles` (`{ items, majLe, source }`), `echelles` (`gravite`, `besoins`, `majLe`) |
| `modeles.word` | objet | modèle Word de l'entreprise (charte §7.2) |
| `largeurs` | objet | largeurs de colonnes (réservé) |

- Formats anciens encore lisibles : *aucun*.

---

## Intégration WerbSMSI

- Rubrique **Continuité & résilience**, niveau **site** ; bases dans `sites/<CODE>/continuite/` ; ouverture depuis le portail (`ouvertureParLien`).
- Objets **lus** :

| Objet | Publié par | Usage |
|---|---|---|
| `site:evenementsRedoutes` | WerbEBIOS du site (1.7.0 ou plus récent) | volet 1 « Périmètre métier » |
| `site:si` | WerbMap | volet 3 « Systèmes d'information », fiches |
| `site:valeursMetier` | WerbEBIOS du site (1.9.0 ou plus récent) | fiches : valeurs métier du site (rubrique c) ; à défaut, celles des événements redoutés |
| `site:biensSupports` | WerbEBIOS du site (1.9.0 ou plus récent pour les valeurs métier portées) | fiches : valeurs métier proposées (biens supports qui contiennent un actif du SI) |
| `site:syntheseRisques` | WerbEBIOS du site | fiches : risques visant le SI (rubrique e), événements redoutés proposés (rubrique d) |
| `site:sauvegardes` | WerbExploitation | fiches : état des sauvegardes du SI (renvoi au PRI, rubrique g) ; PRI : contrôle du RPO |
| `groupe:roles` | WerbGouvernance | fiches : rôles proposés (rubrique b) |
| `groupe:echelles` | WerbEBIOS du groupe | libellés de la gravité et du besoin de sécurité |
| `groupe:formations` | WerbAcademie (1.4.0 ou plus récent) | objectif R#1 : indicateurs de formation du site (ligne du site, populations, groupe ; aucun nom), copiés dans la base (`recus.formations`) ; document Word |
| `groupe:sites` | portail | rattachement |

- Les données reçues sont **copiées dans le plan** à l'ouverture de l'espace, au rattachement et sur **⟳ Actualiser** (tracé au journal) : le plan reste complet hors espace. Une donnée reçue se corrige dans le module qui la publie.
- Objets **publiés** : *aucun* en 1.0.0 (`site:continuite` est prévu avec le PRI).
- Le module fonctionne seul, sans le portail ni l'espace WerbSMSI.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante.
- **Rien dans le navigateur** : les données restent en mémoire puis dans votre fichier. Le stockage du navigateur propre au module est purgé à l'ouverture et à la fermeture.
- **La protection réelle est celle du dossier** où vous rangez la base : limitez les droits d'accès du drive.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbPCR.sha256` :

```powershell
Get-FileHash .\application\WerbPCR.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder.

```powershell
python outils\exemples.py --demo                                   # plan d'exemple, rangé aussi dans l'espace de démonstration
python sources\build.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_parcours.py                                      # Playwright pour Python et Microsoft Edge
python tests\test_guides.py
python tests\test_fiches.py
python tests\test_pri.py
python tests\test_theme.py
python tests\test_pri_prestataires.py
python tests\test_formation.py
python tests\test_bandeau.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` contrôle, dans l'espace de démonstration : CSP stricte, nouveau plan, rattachement au site LYON et réception (événements redoutés, SI, échelles), volet 1 groupé par valeur métier (critères, besoin, gravité libellés), description saisie gardée après une nouvelle réception, description orpheline signalée puis supprimée, fil conducteur modifié puis rétabli, volet 3, enregistrement et relecture, plan d'exemple, ouverture hors espace, export Excel, lecture seule, journal.
- `tests/test_pri.py` contrôle le Plan PRI (1.2.0) sur l'espace de démonstration complété de deux SI fictifs : RTO et RPO (durées lues, normalisées, illisible refusée), dépendances (SI amont, externe, boucle, RTO amont plus long), ordre de reprise (vagues, RTO), procédures (étapes, ordre, durée, reprise au-delà du RTO dépendances comprises), contrôle des sauvegardes (non couvert, à vérifier, conforme, aucune sauvegarde), tableau de bord, Word (partie 2), Excel, enregistrement et relecture, PRI d'un SI retiré.
- `tests/test_fiches.py` contrôle les fiches par SI, le plan d'actions et le document Word (1.1.0) : réception des risques, sauvegardes et rôles ; fiche créée avec l'ER proposé ; rubriques b à f (ajout, modification, retrait) ; rubrique f « mesures de continuité » (type de mesure, renvoi au PRI, plus de sauvegardes dans la fiche, 1.5.0, rubrique g depuis la 1.6.0) ; rubrique c « valeurs métier » (proposées par les biens supports, cochées à la création, saisie libre, filtre des événements redoutés, Word, Excel, 1.6.0) ; objectifs R#1 à R#10 (rubriques, ordre, suppression, rétablissement) ; document Word (cinq volets, mise en forme, avec et sans modèle d'entreprise) ; enregistrement et relecture ; fiche d'un SI retiré signalée puis supprimée.
- `tests/test_formation.py` contrôle les indicateurs de formation reçus de WerbAcademie (1.4.0) : réception et copie dans la base (aucun nom), carte sous l'objectif R#1 seulement, phrase dans le document Word.
- `tests/test_pri_prestataires.py` contrôle les prestataires proposés en dépendances externes du PRI (1.3.0) : réception, proposition sur le SI dont le périmètre ou un actif est concerné, ajout (type déduit, commentaire sans numéro), « déjà en dépendance », enregistrement.
- `tests/test_theme.py` contrôle le thème sombre et clair ; `tests/test_bandeau.py` le bandeau commun.
- Composants tiers figés dans `sources/vendor/bibliotheques.js` (empreinte contrôlée par `sources/build.py`, identique aux autres modules) : JSZip 3.10.1 et docx 9.8.1 (licence MIT), pour le document Word (`rapport.js`). `socle.js`, `guides.js`, `modele-word.js` sont des copies conformes de la charte ; `xlsx.js` est la version commune des modules.

---

## Historique des versions

Version courante : **1.6.0** de novembre 2026 — guide de débutant « Continuité et reprise en clair » ; rubrique **c — Valeurs métier** dans les fiches par SI (proposées depuis les biens supports de l'analyse EBIOS, saisie libre), rubriques renumérotées a à g. Versions précédentes : **1.5.0** de novembre 2026 — rubrique f du PCI recentrée sur les **mesures de continuité** (réponse immédiate et mode dégradé), renvoi au PRI pour le retour au fonctionnement normal ; guides PCI et PRI : « qui fait quoi ». Versions précédentes : **1.4.0** d'octobre 2026 — indicateurs de formation du site reçus de WerbAcademie sous l'objectif R#1 et dans le document Word ; **1.3.0** — prestataires de WerbPresta proposés en dépendances externes du PRI ; **1.2.0** d'octobre 2026 — **Plan PRI** (plan de reprise informatique, PCR-7) : bilan d'impact (RTO, RPO, mode dégradé), dépendances, ordre de reprise calculé, procédures de reprise, contrôle RPO ↔ sauvegardes ; partie 2 du document Word ; guide « Établir le Plan PRI ». Version précédente : **1.1.1** d'octobre 2026 — PCI (plan de continuité informatique) et PRI (plan de reprise informatique) distingués : menu « Plan PCI », définitions dans le tableau de bord, l'aide, le guide et le document Word. Versions précédentes : **1.1.0** d'octobre 2026 — fiches d'analyse par SI, plan d'actions R#1 à R#10, document Word ; **1.0.0** d'octobre 2026 — première version : périmètre métier (événements redoutés de l'analyse EBIOS du site), approche systémique, systèmes d'information (WerbMap). Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbPCR** — Développé par **@WerbHat**
