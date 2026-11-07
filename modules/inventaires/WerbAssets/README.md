# WerbAssets

> Fiches de configuration des assets réseau d'un site : pare-feu, switch, brassage des baies et autres équipements
> Version **1.9.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

La configuration des équipements réseau d'un site industriel était tenue dans un classeur Excel, « Fiche configuration asset » : une feuille par pare-feu (accès WAN, interfaces, VLAN), une feuille par switch (administration, VLAN, ports, procédure de sécurisation), une feuille par baie pour le raccordement des bandeaux. Chaque fiche recopiait à la main le TAG, le libellé et l'emplacement des équipements, déjà connus dans la cartographie WerbMap.

WerbAssets reprend ces fiches dans l'environnement WerbSMSI :

- les assets viennent de l'**inventaire publié par WerbMap**, rangés **par type** (menu) et **par zone** (onglets) ;
- la configuration se saisit dans une fiche par asset, avec la **procédure de configuration et de sécurisation** pour les pare-feu et les switch ;
- le **brassage** des baies se décrit bandeau par bandeau, port par port ;
- un **classeur Excel par type** permet de saisir hors de l'outil puis de réimporter, avec un rapport avant application.

Aucune installation : une page HTML unique, hors ligne, dans Microsoft Edge.

---

## Contenu du paquet

```
WerbAssets/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── LICENSE                      ← licence MIT
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbAssets.sha256            ← empreinte de l'application
├── application/
│   └── WerbAssets.html          ← l'outil (fichier unique)
├── exemples/
│   └── Exemple_LYON.werbassets.json   ← base de démonstration fictive (site LYON de l'espace de démonstration)
├── guides/                      ← guides d'accompagnement (Markdown), lus dans ❓ Aide
│   └── 1-Maitriser_et_durcir_les_assets.md
├── sources/                     ← code de l'application (dépôt source)
└── tests/                       ← parcours Playwright (dépôt source)
```

---

## Démarrage rapide

1. Ouvrir `application/WerbAssets.html` avec **Microsoft Edge**, directement ou depuis le portail WerbSMSI (puce du site sous WerbAssets).
2. Saisir son nom (tracé dans le journal), puis **✨ Nouvelle base**.
3. **Intégration WerbSMSI** : choisir l'espace `SMSI_<GROUPE>`, le site, **Rattacher** : l'inventaire WerbMap du site est chargé.
4. Menu **Assets** : choisir un type, une zone, cliquer un asset pour ouvrir sa fiche.
5. **Enregistrer** (Ctrl+S) dans `SMSI_<GROUPE>\sites\<CODE>\inventaires\`.

> Pour essayer : sur l'accueil, **🧪 Base d'exemple** (site fictif LYON, intégré à l'outil). Le premier enregistrement demande où ranger la copie.
> Sans espace WerbSMSI : dans WerbMap, **⬇ Exporter la publication**, puis ici **Inventaire WerbMap › Importer une publication WerbMap…**
> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement.

---

## Fonctionnalités

### Outils des tables : sélection, archivage, chercher / remplacer, largeur des colonnes

Dans la liste des bandeaux d'une baie (Brassage) et les tableaux des fiches (interfaces, VLAN, ports, raccordements ; sélection et suppression, sans archivage) (charte §7.7) :

- **Sélection multiple** : une case par ligne et « tout sélectionner » ; la barre propose **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer** (définitif, après confirmation) et **✕ Désélectionner**.
- **Archiver** déplace la ligne dans la réserve de la base (date et auteur) : le bandeau archivé, avec ses raccordements, sort du brassage, de l'impression de la baie, des classeurs Excel et des listes ; son TAG reste réservé, et le désarchivage est refusé si un bandeau actif l'a repris. Les listes Pare-feu, Switch, Autres assets et Inventaire WerbMap reçoivent seulement le réglage des largeurs (les actifs viennent de WerbMap). Elle se désarchive à l'identique ; « Afficher les archivées » la montre grisée.
- **🔁 Chercher / remplacer** : une colonne de texte libre (ou toutes), avec aperçu avant d'appliquer ; ni identifiant, ni liste de choix, ni date.
- **Largeur des colonnes** : glisser le bord d'un en-tête, double-clic pour revenir à la largeur automatique ; largeurs enregistrées dans la base.
- Tout est tracé au journal.

### Bandeau

**☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute la base : les classeurs de saisie de chaque type réunis, une feuille par table, après une feuille Informations), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

### 🗂️ Assets par type et par zone

- Menu **Assets** : 🧱 Pare-feu, 🔀 Switch, 🔌 Brassage, 📟 Autres assets.
- Le **type WerbMap** décide de la page : « Pare-feu », « Firewall »… vont dans Pare-feu ; « Switch », « Commutateur »… dans Switch ; les autres **actifs réseau** (automates, IHM, caméras, onduleurs…) dans Autres assets. Les machines physiques et virtuelles n'y figurent pas. Une fiche peut imposer sa catégorie.
- **Onglets par zone** : les zones de sécurité publiées par WerbMap, dans leur ordre ; « Sans zone » regroupe les actifs absents du plan IP.
- Tableau de chaque zone : **TAG, libellé, emplacement**, marque, modèle, avancement de la fiche (à renseigner, partielle, complète) et, pour les pare-feu et switch, avancement de la sécurisation.
- **+ Asset hors inventaire** : fiche d'un équipement pas encore déclaré dans WerbMap.

### 🧱 Fiche pare-feu

- Identification reprise de WerbMap (site, TAG, libellé, emplacement, baie, zone, type, marque).
- Informations générales (modèle, version, n° de série, administrateur, commentaire), **accès WAN** (réseau public, IP publique, routeur, port et type WAN, passerelle), autres infos, filtrage URL.
- **Interfaces** : port, type (physique, VLAN, agrégat, virtuelle), affectation, DHCP, état, nom du réseau, nom et ID du VLAN, IP range / CIDR, masque (**déduit du CIDR**), IP passerelle, IP des actifs du réseau, commentaires. **Générer Ethernet 1…N** crée les ports physiques.

### 🔀 Fiche switch

- Informations générales, **interface d'administration** (IP, masque, passerelle), guide et documentation, annexes.
- **VLAN** configurés (ID, nom, commentaire).
- **Ports** : n°, libellé, type (RJ45, SFP…), état (ACTIF, BLOQUÉ), ID VLAN, U/T, repère câble, aboutissant (TAG proposés), commentaire, statut. **Générer les ports** d'après le nombre de ports RJ45 et SFP ; les nouveaux ports sont **bloqués** par défaut.
- Couleurs du classeur : vert en service, rouge réservé, orange en cours.

### ✅ Procédure de configuration et de sécurisation

Pour chaque pare-feu et switch, 23 points en 8 étapes : mise à jour firmware ; connexion à l'interface (type, authentification, compte d'usine supprimé, mot de passe par défaut remplacé, complexité, politique d'erreur) ; configuration réseau (antispoofing compris) ; services ; règles ; sauvegarde de la configuration ; analyses hors production (NMAP, Wireshark, CVE) et en production. Chaque point : **Fait**, **À faire** ou **Non applicable**, et une valeur ou un commentaire. Jamais de mot de passe.

### 📟 Autres assets

Fiche générique : informations générales, IP d'administration, mode d'accès, documentation, notes de configuration.

### 🔌 Brassage

- **Onglets par baie** : les coffrets cités par l'inventaire WerbMap et les baies créées ici (libellé, emplacement). Les actifs WerbMap rangés dans la baie sont rappelés.
- **Bandeaux** (TAG, libellé, position en U, nombre et type de ports : RJ45, fibre LC ou SC duplex…), créés avec leurs ports.
- **Raccordements** port par port : réseau ou usage, repère du câble de liaison, libellé tenant (bandeau d'en face), détail (couleur de fibre, type), repère câble, repère et raccordement de l'actif d'aboutissement.

### 📥 Saisie Excel

- Un **classeur par type** (Pare-feu, Switch, Brassage, Autres assets), dans **Saisie Excel** ou par le bouton de chaque page :
  - **⇩ Modèle de saisie** : une ligne par asset de l'inventaire (identité grisée), colonnes de configuration vides, points de sécurisation prêts à renseigner ;
  - **⇩ Exporter les fiches** : le même classeur avec les données saisies.
- Feuilles : fiche principale, tableaux (Interfaces ; VLAN et Ports ; Baies, Bandeaux et Raccordements), Sécurisation, **Mode d'emploi**. Listes déroulantes des valeurs attendues.
- **⇧ Importer un classeur** : colonnes reconnues par leur titre (ordre libre), rapprochement par TAG puis par port, VLAN ou code de contrôle. Deux modes : **compléter et mettre à jour** (cellule vide sans effet) ou **remplacer les tableaux** des assets présents.
- **Rapport avant application** : créations, mises à jour, lignes identiques, lignes rejetées avec leur motif (TAG manquant ou inconnu, TAG d'une autre catégorie, doublon, clé manquante, code inconnu), avertissements (valeur hors liste, nombre invalide, fiche orpheline créée, baie créée). Téléchargeable en CSV. Rien n'est modifié avant **Appliquer** ; chaque champ modifié est tracé au journal.

### 🖨 Impression

**Imprimer / PDF** d'une fiche ou d'un bandeau, **toutes les fiches d'un onglet** de zone, **tous les bandeaux d'une baie**. Mise en page A4, signée en pied de document.

### 📊 Tableau de bord et suivi

- Fiches complètes par type, bandeaux et baies, taux de points de sécurisation faits, fiches orphelines, inventaire chargé.
- Tableau **par zone** (pare-feu, switch, autres assets, fiches complètes).
- Points d'attention : inventaire absent ou ancien (plus de 90 jours), fiches orphelines, fiches à renseigner, points de sécurisation à faire.
- **Fiche orpheline** : quand un actif disparaît de WerbMap, sa fiche est **conservée** avec la dernière identité connue et marquée « orpheline ». **Effacer la fiche** la supprime.
- **Journal** de toutes les modifications (avant / après), enregistré dans la base.

### 🧰 Baies, ports et raccordements (1.4.0)

- **🗑 Supprimer baie** (rouge, entre « + Baie » et « + Bandeau ») : pour une baie **créée dans WerbAssets**, avec ses bandeaux et leurs raccordements, après une confirmation qui les dénombre ; tracé au journal. Un coffret de l'inventaire WerbMap ne se supprime pas ici : il se retire dans WerbMap.
- **Ports d'un switch** : la ligne est **vert clair** pour un port ACTIF et **rouge pâle** pour un port BLOQUÉ, à l'écran (thèmes clair et sombre) comme à l'impression ; la couleur suit tout changement d'état.
- Colonnes **N°** (ports, raccordements) étroites : la largeur d'un numéro jusqu'à 100.
- **Raccordements** : colonne **Repère fil/brin** après *Repère câble liaison*, à l'écran, à l'impression, dans le modèle de saisie, l'export et l'import Excel (un ancien classeur sans cette colonne s'importe sans erreur).

### 🗂 Versions de la base (1.9.0)

- **Chaque enregistrement crée une version** : numéro croissant, date, auteur, **commentaire obligatoire** et nombre de modifications. La fenêtre propose un résumé (« 3 modification(s) : SW_CORE01, FW_OT01 ») à compléter ou à valider (Entrée) ; un commentaire vide est refusé ; Annuler n'enregistre rien.
- **⚙️ Base › Historique** (comme dans WerbMap) : en haut, les **versions enregistrées** (la plus récente en haut, « ● en cours » pour les modifications non enregistrées) ; en dessous, le **journal des modifications**, avec la colonne Version, un filtre par version et une recherche. Un clic sur une version filtre le journal (second clic : toutes les versions).
- Export Excel de toute la base : feuille **Versions** ; version courante dans la feuille Informations.
- Une base antérieure démarre en version 0 ; son journal passé reste consultable, sans numéro.

### 📐 Position dans la baie et VLAN de WerbMap (1.8.0)

- **Position (U)** : colonne en fin de ligne des listes Pare-feu, Switch et Autres assets, saisie sur place (sans ouvrir la fiche) ou dans la fiche (*Informations générales*). Elle est imprimée, exportée et importée avec les classeurs Excel, et tracée au journal.
- **⇩ VLAN de WerbMap** : dans la fiche d'un switch (tableau VLAN) et d'un pare-feu (tableau Interfaces), une fenêtre propose les VLAN publiés par WerbMap (`site:vlans`) : ceux de la zone de l'asset en tête, ceux déjà présents grisés ; « Tout cocher ». Switch : ID et nom du VLAN, réseau et zone en commentaire. Pare-feu : une ligne d'interface de type VLAN (ID, nom du VLAN, réseau) ; le **CIDR et la passerelle restent à saisir**, WerbMap ne publiant aucun adressage. Une ligne de même ID VLAN est complétée (champs vides), jamais remplacée. L'ajout manuel reste possible.

### 🔗 Correspondance avec WerbMap

- L'identification de la fiche affiche, en lecture seule, le **Modèle**, la **Version firmware** et le **Commentaire** saisis dans WerbMap (publication `site:actifs`, WerbMap 1.11.0 ou plus récent) ; ils figurent aussi sur la fiche imprimée.
- WerbMap fait foi : quand le modèle ou la version de la fiche diffèrent de WerbMap, un encadré le signale ; **⇩ Reprendre de WerbMap** copie les valeurs dans la fiche (confirmation si une valeur saisie est remplacée, journal). La zone se corrige dans WerbMap, référence de la publication (charte, AST-3).
- Liste des assets : colonne Modèle de la fiche, à défaut celui de WerbMap.
- Une publication WerbMap antérieure, sans ces champs, reste lue.

### 📚 Guides d'accompagnement (1.7.0)

Dans **❓ Aide** (une entrée par guide), dans la page *Guide du module* et sur l'accueil, même sans base ouverte (lecteur commun, charte §7.4) :

- **Maîtriser et durcir les assets du site** : pourquoi une configuration ou un raccordement de baie mal connus allongent toujours la reprise (étapes du RTO, situations courantes, ordre de grandeur, cas d'une cyberattaque, ce que « connaître un asset en profondeur » veut dire) ; ce que signifie **durcir** un asset (domaines et mesures, particularités industrielles, références IEC 62443 et ANSSI) ; pourquoi durcir **dès la première configuration** plutôt qu'en production, et comment le faire quand même sur un équipement en service ; comment **tenir WerbAssets** (principes, check-list de mise en service, copie papier de la baie, saisie terrain, revue périodique, liens avec les autres modules).

Les guides sont des fichiers Markdown du dossier `guides/`, lisibles aussi hors de l'outil.

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression et les exports restent toujours en clair.

---

## Données et format

- Une base est un fichier **`*.werbassets.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBASSETS`, schéma 1, `famille` : `WERBSMSI`).
- Contenu de `data` :

| Clé | Type | Description |
|---|---|---|
| `site` | objet | `nom` du site |
| `inventaire` | objet | Copie de la publication WerbMap : `site`, `source`, `publieLe`, `chargeLe`, `actifs` (TAG, type, famille, zone, libellé, emplacement, coffret, marque…), `zones` (identifiant, nom, SL-T) |
| `fiches` | liste | Une fiche par asset : `tag`, `cat` (catégorie imposée, vide = selon le type WerbMap), `ref` (dernière identité connue), champs de configuration, `interfaces`, `vlans`, `ports`, `controles` (`{ code: { etat, valeur } }`) |
| `baies` | liste | Baies saisies ou complétées ici : `tag`, `libelle`, `emplacement` |
| `bandeaux` | liste | `baie`, `tag`, `libelle`, `position`, `nbPorts`, `typePort`, `commentaire`, `raccords` |
| `refs` | objet | listes de choix `typesPort`, `typesBandeau`, `typesWan` : valeurs du groupe puis valeurs propres au site |
| `listesGroupe` | objet | copie des valeurs publiées par le groupe, par liste : `{ valeurs, majLe }` (travail sans l'espace) |

- Une fiche sans aucune saisie n'est pas enregistrée (elle se recrée à l'ouverture), sauf si son asset est absent de l'inventaire.
- Formats anciens encore lisibles : *aucun*.

---

## Intégration WerbSMSI

- Rubrique : **Inventaires ICS** ; niveau d'utilisation : **site**.
- Objets **lus** : `site:actifs`, `site:zones` et `site:vlans` (publication WerbMap du site ; VLAN depuis WerbMap 1.23.0), `groupe:sites` (rattachement), `groupe:listes` (listes de choix du groupe, portail WerbSMSI 1.4 ou plus récent).
- **Listes de choix du groupe** (charte §5.9) : dans *⚙️ Base › Référentiels*, les types de port, de bandeau et de lien WAN reçoivent les valeurs publiées par le groupe, affichées 🏢 et non modifiables ; la zone de saisie contient les valeurs 📍 du site. Une valeur retirée par le groupe mais encore employée reste disponible, signalée ⚠ ; un renommage est proposé (*Remplacer*).
- Objets **publiés** : *aucun*. La configuration des équipements reste dans la base du site.
- Emplacement des bases : `SMSI_<GROUPE>\sites\<CODE>\inventaires\`.
- Ouverture depuis le portail (puce du site) : **📂 Ouvrir cette base**.
- L'inventaire est copié dans la base : le module fonctionne ensuite seul, sans le portail ni l'espace.

---

## Confidentialité et sécurité

- **La base contient la configuration des équipements** (adresses IP, VLAN, numéros de série, interconnexions) : c'est une information sensible pour un attaquant. Rangez-la dans le dossier du site, réservé à son équipe.
- **Ne saisissez jamais de mot de passe ni de clé** : la procédure de sécurisation indique seulement que le point est traité.
- Les **classeurs Excel** exportés contiennent les mêmes informations : mêmes droits que la base, copies supprimées après import.
- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante.
- **Rien dans le navigateur** : les données restent en mémoire puis dans votre fichier.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbAssets.sha256` :

```powershell
Get-FileHash .\application\WerbAssets.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

- Module créé avec `werb_charte.py nouveau` et assemblé par `werb_charte.py construire` : `sources/src/index.html` reçoit `style.css` et les scripts `signature.js`, `socle.js`, `guides.js`, `xlsx.js`, `app.js` (ordre fixé par `module.json › sources`), précédés des guides (`guides/*.md`, charte §7.4).
- Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder.
- `xlsx.js` (`WerbXlsx`) lit et écrit les classeurs `.xlsx` sans bibliothèque : archive ZIP compressée par le navigateur, cellules au format texte, listes déroulantes.
- Dans `app.js`, les fiches sont décrites par des constantes : `SECTIONS` (champs par catégorie), `TAB` (tableaux et clé de rapprochement), `CONTROLES` (procédure de sécurisation), `BANDEAU`. Un champ ajouté est édité, journalisé, imprimé, exporté et importé sans autre code.

```powershell
python <WerbSMSI>\charte\outils\werb_charte.py construire . --date AAAA-MM-JJ
python tests\test_parcours.py                      # Playwright pour Python, Edge installé
python tests\test_listes.py
python tests\test_theme.py
python tests\test_correspondance.py
python tests\test_lot_a.py
python tests\test_tables.py
python tests\test_vlans_position.py
python tests\test_versions.py
python tests\test_guides.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` sert la page sur `http://localhost` (routage Playwright, sans serveur), recopie l'espace de démonstration de la charte dans le système de fichiers privé d'Edge et contrôle : CSP, menu, rattachement et inventaire, onglets par zone, fiche pare-feu (masque déduit du CIDR, interfaces, sécurisation), génération des ports d'un switch, brassage, modèle et export Excel, import avec rapport (fiche orpheline, ligne rejetée), impression, enregistrement et réouverture, base d'exemple, absence de stockage navigateur.
- `tests/test_listes.py` contrôle les référentiels et les listes du groupe : déclaration identique à `REFS`, page Référentiels, fusion à l'ouverture de l'espace, valeurs du groupe non modifiables, valeur retirée mais employée, remplacement proposé, champs alimentés par les listes, copie enregistrée.
- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, fiche d'un pare-feu, contrôle « fait » de la procédure coloré dans les deux thèmes, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.
- `tests/test_correspondance.py` contrôle la correspondance avec WerbMap (1.3.0) : identification en lecture seule, écart signalé, reprise avec et sans confirmation, liste, fiche identique sans encadré, publication antérieure.
- `tests/test_lot_a.py` contrôle le lot A (1.4.0) : suppression d'une baie WerbAssets et refus pour un coffret WerbMap, colonnes N°, couleurs des ports (écran, changement d'état, impression), Repère fil/brin (saisie, impression, export, réimport, classeur sans la colonne).
- `tests/test_guides.py` contrôle les guides (1.7.0) : ouverture depuis l'accueil sans base, entrées du menu ❓ Aide, rendu Markdown (titres, tableaux, cases à cocher, citations), sommaire cliquable, signature, cartes de la page d'aide.
- `tests/test_versions.py` contrôle les versions de la base (1.9.0) : base antérieure en version 0, fenêtre du commentaire (résumé pré-rempli, annulation, commentaire vide refusé), versions 1 et 2 (numéro, auteur, commentaire, modifications), journal numéroté et filtré, réouverture (version suivante), feuille Versions de l'export Excel.
- `tests/test_vlans_position.py` contrôle la position dans la baie et les VLAN de WerbMap (1.8.0) : colonne des trois listes, saisie sans ouvrir la fiche, fiche créée, journal ; publication sans VLAN (bouton désactivé) puis avec VLAN : fenêtre (zone en tête, présents grisés), ajout au switch sans doublon, interface VLAN du pare-feu sans adressage, ajout manuel, enregistrement.
- `tests/test_tables.py` contrôle les outils des tables (1.6.0) : archivage d'un bandeau (case sans ouvrir la fiche, réserve avec raccordements, auteur, journal), « Afficher les archivés », désarchivage, suppression de ports sans archivage, chercher / remplacer (colonnes proposées, aperçu), largeur des colonnes enregistrée.

---

## Historique des versions

Version courante : **1.9.0** de novembre 2026 — versions de la base : commentaire obligatoire à chaque enregistrement, page Versions, journal par version. Versions précédentes : **1.8.0** de novembre 2026 — colonne « Position (U) » dans les listes d'assets ; VLAN de WerbMap importables dans les fiches pare-feu et switch. Versions précédentes : **1.7.0** de novembre 2026 — guide « Maîtriser et durcir les assets du site » et lecteur de guides (❓ Aide, accueil). Versions précédentes : **1.6.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0). Versions précédentes : **1.5.1** d'octobre 2026 — correctif : 🖨 PDF du bandeau ; **1.5.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.4.0** d'octobre 2026 — suppression d'une baie, colonnes N° étroites, couleur des ports selon l'état, repère fil/brin ; **1.3.0** d'octobre 2026 — modèle, version firmware et commentaire repris de WerbMap ; **1.2.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.1.0** d'octobre 2026 — page Référentiels (types de port, de bandeau, de lien WAN) et listes de choix reçues du groupe (charte §5.9) ; **1.0.0** d'octobre 2026 — première version : fiches pare-feu, switch et autres assets par type et par zone d'après l'inventaire WerbMap, procédure de sécurisation, brassage des baies, saisie Excel avec rapport d'import, impression. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbAssets** — Développé par **@WerbHat**
