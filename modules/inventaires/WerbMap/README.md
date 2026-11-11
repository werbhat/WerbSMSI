# WerbMap

> Cartographie VLAN, adressage IP, actifs et flux d'un site, alignée sur le classeur **Base_Inventaires_actifs**
> Version **1.27.0** — Développé par **@WerbHat**

---

## Sommaire

1. [Pourquoi cet outil](#pourquoi-cet-outil)
2. [Contenu du paquet](#contenu-du-paquet)
3. [Démarrage rapide](#démarrage-rapide)
4. [Fonctionnalités](#fonctionnalités)
5. [Conventions de nommage et codes couleur](#conventions-de-nommage-et-codes-couleur)
6. [Exercices de prise en main](#exercices-de-prise-en-main)
7. [Mise en service](#mise-en-service)
8. [Comptes, rôles et versioning](#comptes-rôles-et-versioning)
9. [Import et export Excel](#import-et-export-excel)
10. [Questions fréquentes](#questions-fréquentes)
11. [Données et format](#données-et-format)
12. [Intégration WerbSMSI](#intégration-werbsmsi)
13. [Confidentialité et sécurité](#confidentialité-et-sécurité)
14. [Développement](#développement)
15. [Historique des versions](#historique-des-versions)

---

## Pourquoi cet outil

Le classeur **Base_Inventaires_actifs** décrit les VLAN, le plan d'adressage, les équipements et la matrice de flux d'un site. WerbMap en reprend la structure et ajoute ce qu'un classeur partagé ne garantit pas : calculs et contrôles de cohérence automatiques (chevauchements, doublons d'IP, TAG inconnus), comptes et rôles, versions commentées, journal champ par champ, chaîne d'intégrité et détection des conflits entre collègues.

Il tient dans **un seul fichier HTML**, sans installation ni connexion réseau. Le classeur reste utilisable : WerbMap l'importe et le remplit. Depuis la 1.2, c'est aussi le module **Inventaires ICS** de l'environnement WerbSMSI, au niveau site.

---

## Contenu du paquet

```
WerbMap/
├── README.md                                  ← ce guide
├── CHANGELOG.md                               ← historique des versions de WerbMap
├── SECURITY.md                                ← mesures de sécurité et limites
├── module.json                                ← manifeste lu par le portail WerbSMSI
├── WerbMap.sha256                             ← empreinte de l'outil
├── application/
│   └── WerbMap.html                           ← l'outil (un seul fichier, aucune installation)
├── sources/
│   ├── src/  (WerbMap.html, signature.js, socle.js, guides.js)
│   └── build.py                               ← assemblage de application/WerbMap.html
├── tests/
│   └── test_parcours.py, test_tag.py…         ← tests de non-régression dans Edge
├── exemples/
│   ├── WerbMap_DEMO.werbmap.json                      ← base de démonstration (schéma 5, 5 versions, 3 comptes, 4 fiches SI d'exemple)
│   ├── Exemple_Base_Inventaires_actifs_DEMO.xlsm  ← le classeur Excel rempli avec les données DEMO
│   └── Export_simple_DEMO.xlsx                ← export « simple » (anomalies, versions, journal)
├── guides/                                    ← guides pour débuter, lus dans ❓ Aide (1.20.0)
│   ├── 1-Les_actifs_et_leur_role.md
│   ├── 2-Les_etages_de_la_cybersecurite.md
│   └── 3-Les_mots_de_passe.md                  ← coffre-fort KeePass, types de comptes, Active Directory, partage (1.21.0)
├── docs/
│   └── captures/                              ← captures d'écran utilisées dans ce guide
├── .editorconfig · .gitattributes
└── .gitignore
```

> ⚠️ **Toutes les données DEMO sont fictives** (site « DEMO », « Usine Démo »). Les adresses IP, numéros de série et URL n'existent pas.

Le paquet publié dans WerbSMSI (`modules/inventaires/WerbMap/`) ne contient que la documentation, `module.json`, l'empreinte, `application/` et `exemples/`.

---

## Démarrage rapide

### Prérequis

| Élément | Exigence |
|---|---|
| Navigateur | **Microsoft Edge** ou **Google Chrome** récent (recommandé). Firefox fonctionne en mode dégradé (voir *Mise en service*). |
| Installation | Aucune. Le fichier `.html` s'ouvre par double-clic. |
| Connexion Internet | Non nécessaire. Tout fonctionne hors ligne. |
| Stockage partagé | Le dossier du site sur le drive protégé (espace WerbSMSI) ou une bibliothèque SharePoint **synchronisée** sur le poste, pour le travail à plusieurs. |
| Excel | Uniquement pour ouvrir les exports. L'outil lit et écrit les `.xlsx` / `.xlsm` lui-même. |

### Découverte en 10 minutes avec la base DEMO

#### Étape 1 — Ouvrir l'outil

Double-cliquez sur **`application/WerbMap.html`**.

![Écran d'accueil](docs/captures/01_accueil.png)

#### Étape 2 — Ouvrir la base de démonstration

1. Cliquez sur **🧪 Base de démonstration** (base intégrée à l'outil), ou sur **📂 Ouvrir une base…** puis sélectionnez **`exemples/WerbMap_DEMO.werbmap.json`**
2. Connectez-vous avec l'un des comptes de démonstration (rappelés à l'écran) :

| Identifiant | Mot de passe | Rôle | Ce qu'il peut faire |
|---|---|---|---|
| `admin.demo` | `Demo-Admin-2026` | Administrateur | Tout, y compris comptes et référentiels |
| `tech.demo` | `Demo-Tech-2026` | Éditeur | Modifier et enregistrer des versions |
| `audit.demo` | `Demo-Audit-2026` | Lecteur | Consulter, filtrer, exporter |

> 💡 La base de démonstration intégrée s'ouvre en mode téléchargement : l'enregistrement produit une copie, la démo reste intacte.
> 🔐 Ces mots de passe sont publics : **ne réutilisez jamais `WerbMap_DEMO.werbmap.json` comme base réelle.**

#### Étape 3 — Faire le tour

| Ordre | Onglet | À observer |
|---|---|---|
| 1 | **Tableau de bord** | Les compteurs, la synthèse par plage et les **9 anomalies** volontaires |
| 2 | **Matrice VLAN** | Les couleurs de criticité (lignes) et de statut (cases), et le bloc **Réseaux isolés** en bas |
| 3 | **Table IP VLAN** | Les calculs automatiques (CIDR, broadcast, plage, 1ʳᵉ/dernière IP, taux d'occupation) |
| 4 | **Plan IP** | Le filtre **ID VLAN**, le tri par colonne et le bouton **⟳** (prochaine IP libre) |
| 5 | **Actifs réseau / Machines** | La colonne **IP (ID VLAN)** qui relie chaque équipement à ses adresses |
| 6 | **Liste des SI** | 4 fiches d'exemple (supervision ligne 1, infrastructure IT, bureautique, sûreté) : tri, filtre, puis un clic sur une fiche — jauges D / I / C, VLAN en échange, RACI coloré, sauvegardes, redondance, risques, priorités P1 / P2, actifs calculés ; **⬇ Imprimer Word** |
| 7 | **Historique** | Les 5 versions (la 5ᵉ ajoute les fiches SI d'exemple) et le détail champ par champ des modifications |

![Tableau de bord](docs/captures/02_tableau_de_bord.png)

---

## Fonctionnalités

### Bandeau

Bandeau commun WerbSMSI (charte §7.6, socle 1.8.0) : **☰** masque ou réaffiche le menu ; **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📥 Import Excel**, **📊 Export Excel** (toute la base, au format du classeur), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**, ainsi que 🔄 Relire, 👤 Mot de passe, 🔒 Verrouiller. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

Les onglets sont rangés par catégorie dans le **menu latéral**, commun à tous les modules WerbSMSI : chaque catégorie a son emoji et son titre sur fond de couleur. Cliquez sur le titre d'une catégorie pour la replier ou la déplier (chevron ▾). Le bouton **☰** masque ou affiche le menu. **📑 Enregistrer sous…** écrit une nouvelle version dans un autre fichier. **❓ Aide** ouvre le guide du module. Ces choix valent pour la session : rien n'est conservé dans le navigateur.

| Catégorie | Onglet | Feuille Excel correspondante | Rôle |
|---|---|---|---|
| 📊 Pilotage | Tableau de bord | — | Indicateurs, en-tête des documents (organisation, site, référence), synthèse, contrôles de cohérence |
| 🌐 Réseau & adressage | Matrice VLAN | `VLAN` (ou `VLAN-xxx`) | Réservation des VLAN 100 à 499, criticité par plage, statut par case, réseaux isolés |
| | Table IP VLAN | `TableIP_VLAN` | **Générée automatiquement** depuis la matrice : adressage de chaque réseau |
| | Plan IP | `TableIP` | Une ligne par adresse : réseau, TAG, IP, MAC, port, actif aboutissant, migration, NAT |
| 🗄️ Inventaires | Coffrets | `Lst_Coffret` | Baies et coffrets informatiques |
| | Actifs réseau | `Lst_Actifs_RSX` | Équipements réseau et OT (hors PC et serveurs) |
| | Machines physiques | `Lst_MachinePhysique` | Serveurs, hyperviseurs, postes |
| | Machines virtuelles | `Lst_MachineVirtuelle` | VM rattachées à un hyperviseur |
| | Mots de passe | — | **Aucun secret dans WerbMap** (1.21.0) : arborescence proposée du coffre-fort (KeePass) calculée depuis la Liste des SI et les inventaires — un dossier par SI, un sous-dossier par TAG, *Hors SI*, *Domaine (Active Directory)* selon les OU — téléchargeable en .txt ; une fiche par compte et par type (utilisateur, administrateur, service, local, générique, bris de glace) avec le registre WerbExploitation correspondant ; règles d'échange des secrets ; lien vers le guide |
| 🔀 Routage & filtrage | Routes | `Routes` (export simple) | Routes déclarées sur une machine physique ou virtuelle |
| | NAT | `NAT` (export simple) | Règles de NAT portées par une machine physique ou virtuelle |
| | Matrice de flux | `MatriceFlux` | Règles pare-feu, export **CSV** par pare-feu |
| 📘 Procédures SMSI | Catalogue des procédures | `Procedures` (export simple) | Procédures du SMSI : code, domaine, version, statut, propriétaire, approbateur, revue, références |
| | Fiches de procédure | `Procedures_Etapes`, `MATRICE PLM` | Étapes par phase, et version rédigée exportable en Word ou en PDF |
| ⚙️ Administration | Référentiels | `TableauListeChoix`, `LEGENDE` | Listes déroulantes, abréviations de TAG, pare-feux, zones, types de NAT (administrateurs) |
| | Historique | — | Versions enregistrées et journal des modifications |
| | Utilisateurs | — | Gestion des comptes (administrateurs) |
| | Intégration WerbSMSI | — | Rattachement au site, SL-T des zones, publication des zones, conduits et actifs |
| ❓ Aide | Guide du module | — | Mode d'emploi de WerbMap, cartes des guides |
| | Les actifs d'un système et leur rôle | — | **Guide du débutant** (1.20.0) : chaque type d'actif de l'inventaire (réseau, serveurs et stockage, postes, OT, sûreté, équipements du quotidien), son rôle, s'il a une fonction de sécurité, ce qu'un attaquant peut en faire ; champs de WerbMap utiles à la sécurité ; pièges fréquents |
| | Les mots de passe | — | **Guide** (1.21.0) : pourquoi un coffre-fort, créer le coffre KeePass (mot de passe maître et fichier clé, emplacement, sauvegarde, réglages), structure SI › TAG › fiches, contenu d'une fiche, **qu'est-ce qu'un bon mot de passe** (un mot de passe par compte grâce au coffre, longueur et phrase de passe, changement sur compromission plutôt que périodique trop fréquent, d'après le NIST), types de comptes, Active Directory (OU, LAPS), registre WerbExploitation (comptes à privilège, comptes génériques, sans mot de passe), politique d'échange des secrets (interdit en clair par courriel, lien éphémère type Password Pusher, canaux séparés), **exigences et surveillance des prestataires** (dérives fréquentes, exigences à écrire au cahier des charges ou au plan d'assurance sécurité, contrôles à la réception, revues, journaux, tests d'intrusion ; NIS2, ISO 27001, IEC 62443-2-4), check-list |
| | Les étages de la cybersécurité | — | **Guide du débutant** (1.20.0) : défense en profondeur ; pour chaque outil (pare-feu, segmentation, DMZ, diode, VPN, NAC, annuaire, MFA, bastion, durcissement, correctifs, antivirus, EDR, liste blanche, chiffrement, sauvegardes, journaux, SIEM, SOC, sonde OT, veille, test d'intrusion) ce qu'il fait, **ce qu'il ne fait pas** et une image (le pare-feu est un douanier : un flux autorisé reste un chemin pour l'attaquant) ; idées reçues ; récapitulatif ; par où commencer |

### La matrice VLAN

![Matrice VLAN](docs/captures/03_matrice_vlan.png)

- **Saisir un nom de réseau** dans une case réserve le VLAN. Son numéro est le début de la plage plus le chiffre de la colonne (ligne 110–119, colonne xx5 → **VLAN 115**).
- **Vider la case** libère le VLAN. L'outil demande confirmation si des adresses IP y sont rattachées.
- Le **statut** se choisit sous le nom : *En service*, *Réservé* ou *En cours*.

### Les réseaux isolés (VLAN 1…)

![Réseaux isolés](docs/captures/04_reseaux_isoles.png)

Pour les réseaux non routés (switch autonome, VLAN 1 natif, bascule de pesage, GTB…) :
1. **Matrice VLAN** → en bas → **➕ Ajouter un réseau isolé**
2. Renseignez le nom (`RSX_…`), l'ID VLAN (1 par défaut), le périmètre et le statut.
3. Le réseau apparaît automatiquement dans la **Table IP VLAN** avec la mention *Isolé*, et devient sélectionnable dans le **Plan IP**.

Plusieurs réseaux isolés peuvent partager le même ID VLAN.

### Table IP VLAN

![Table IP VLAN](docs/captures/05_table_ip_vlan.png)

Saisissez seulement le **bloc d'adresse** et le **masque** (`255.255.255.0`, `/24` ou `24`). Tout le reste est calculé. Si la passerelle est laissée vide, c'est la première adresse du réseau.

### Plan IP

![Plan IP](docs/captures/06_plan_ip.png)

- **Filtrer** : champ de recherche, liste *ID VLAN*, liste *réseau*.
- **Trier** : cliquez sur un en-tête de colonne (▲ A→Z, ▼ Z→A, 3ᵉ clic : sans tri). Les adresses IP sont triées dans l'ordre numérique.
- **⟳** propose la première adresse libre du réseau choisi.
- Saisir un **TAG** connu complète automatiquement le type d'actif et le produit.
- Les cellules en **rouge** signalent une IP invalide, en double, hors du réseau ou égale à la passerelle.
- **Réseaux d'ID VLAN 1** (réseaux isolés) : ils réutilisent souvent le même adressage. Une adresse en ID VLAN 1 n'est **jamais en erreur** pour un doublon, ni sur la ligne ni dans les contrôles ; le doublon reste signalé en **information** dans les contrôles (« Doublon toléré en ID VLAN 1 »). Pour la saisie en masse, une adresse en ID VLAN 1 se rapproche par adresse **et** réseau.

### Actifs réseau : présentation

- Une ligne par actif : les liens (*Lien site MAJ FW*, *Lien fichier suivi gestion*) longs sont tronqués « … », visibles en entier au survol et ouverts par 🔗.
- La colonne **Modèle** (anciennement *Référence*) porte le modèle de l'équipement. Les classeurs et CSV avec l'ancien en-tête *Référence* s'importent toujours ; l'export dans un classeur d'origine remplit la colonne *Modèle* ou *Référence*, celle qui existe.
- Le **Modèle**, la **Version firmware** et le **Commentaire** sont publiés vers WerbSMSI (`site:actifs` : `modele`, `firmware`, `commentaire`) ; WerbAssets les affiche dans ses fiches et signale un écart.

### Outils des tables : sélection, archivage, chercher / remplacer, largeur des colonnes

Dans le Plan IP, les coffrets, actifs réseau, machines physiques et virtuelles, la matrice de flux, les routes, le NAT et les procédures (charte §7.7) :

- **Sélection multiple** : une case par ligne et « tout sélectionner » (lignes affichées) ; la barre propose **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer** (définitif, après confirmation) et **✕ Désélectionner** (éditeurs et administrateurs).
- **Archiver** déplace la ligne dans la réserve de la base (date et auteur) : elle **sort de la publication `site:actifs`, des contrôles, des TAG proposés, des fiches SI et des exports**, et se désarchive à l'identique. Case « Archivées (n) » pour l'afficher grisée. Les adresses du Plan IP d'un actif archivé restent réservées et sont signalées « TAG archivé » dans les contrôles ; un désarchivage est refusé si le TAG a été repris entre-temps. Les procédures ne s'archivent pas (suppression seulement).
- **🔁 Chercher / remplacer** : une colonne de texte libre (ou toutes), sur les lignes affichées, avec aperçu avant d'appliquer ; ni TAG, ni adresse IP, ni liste de choix, ni référence à un TAG (coffret, hyperviseur, aboutissant).
- **Largeur des colonnes** : glisser le bord d'un en-tête (sans trier la colonne), double-clic pour revenir à la largeur automatique ; largeurs enregistrées dans la base, « ↔ Largeurs par défaut » pour les effacer.
- Tout est tracé au journal.

### TAG d'un actif : identifiant stable

- Le **TAG** est la clé reprise par WerbAssets, WerbRecette, WerbPentest et WerbExploitation (publication `site:actifs`). Dans les tables *Actifs réseau*, *Machines physiques*, *Machines virtuelles* et *Coffrets*, il est **verrouillé** dès que la ligne est enregistrée : une ligne créée reste modifiable jusqu'au prochain 💾 Enregistrer, pour corriger une faute de frappe.
- Le **libellé** et l'**emplacement** restent modifiables.
- **✎ Renommer le TAG** (administrateur seulement, bouton à côté du TAG) : le nouveau TAG doit être libre (casse ignorée). Toutes les références de la base suivent : Plan IP (TAG et actif aboutissant), coffret des actifs et des machines, hyperviseur des VM, routes, règles de NAT et matrice de flux. La confirmation les dénombre ; le renommage et chaque référence sont tracés au journal.
- Les bases des autres modules ne sont pas modifiées : après l'enregistrement, **publiez l'inventaire** (Intégration WerbSMSI), puis reprenez le nouveau TAG dans chaque module qui cite l'ancien.

### Zone d'un actif réseau

- Colonne **Zone** de la table *Actifs réseau* : la zone saisie sur l'actif **fait foi**. Elle est publiée vers WerbSMSI (`site:actifs`) et reprise par WerbAssets, WerbRecette, WerbExploitation.
- Colonne **Zone (VLAN)** : zone(s) des VLAN de ses adresses IP (Plan IP → Matrice VLAN), calculée. **⚠ conflit** quand la zone saisie n'est pas l'une d'elles ; le conflit figure aussi dans les contrôles du tableau de bord. Rien n'est corrigé automatiquement : on corrige l'actif ou la Matrice VLAN.
- Sans zone saisie, la zone déduite des VLAN reste utilisée. **🧭 Zones proposées** renseigne en une fois les actifs sans zone dont tous les VLAN sont dans la même zone (confirmation, une ligne de journal par actif ; éditeurs et administrateurs).
- Saisie Excel : colonne *Zone*, liste des zones des Référentiels.

### Liste des SI et fiche de synthèse

![Liste des SI](docs/captures/11_liste_si.png)

**Inventaires › Liste des SI** : un tableau des systèmes d'information du site (VLAN, D / I / C, flux inter-VLAN, actifs, P1, score). **➕ Fiche SI** crée une fiche ; **➖ Fiche SI** supprime les fiches cochées (confirmation ; VLAN, flux et actifs ne sont pas touchés). Un clic sur un SI ouvre sa fiche :

- **Trier** : cliquez sur un en-tête de colonne (▲ A→Z, ▼ Z→A, 3ᵉ clic : sans tri) ; D / I / C, flux, actifs, P1, risque EBIOS et score se trient dans l'ordre numérique, une fiche sans valeur reste en fin de liste.
- **Filtrer** : champ 🔍 au-dessus de la liste, sur le nom, la fonction, le périmètre, les VLAN (ID et nom) et les TAG des actifs du SI ; « n SI sur N » indique le nombre affiché. « ➖ Fiche SI » ne supprime que les fiches cochées et affichées. Tri et filtre sont gardés le temps de la session, aussi pour un lecteur.

| Bloc | Origine |
|---|---|
| Nom, fonction, périmètre, commentaire | saisis |
| VLAN du SI (plusieurs) | choisis dans la **Table IP VLAN** |
| Disponibilité, Intégrité, Confidentialité (jauge et ★) | saisis sur l'**échelle de gravité d'EBIOS RM** (1 Mineure … 4 Critique) ; échelle reçue du groupe (`groupe:echelles`) à l'ouverture de l'espace, copiée dans la base |
| Risques EBIOS du SI, risque EBIOS le plus élevé (brut → résiduel) | 🔗 **reçus de WerbEBIOS** (`site:syntheseRisques`) : un risque concerne le SI quand un actif (TAG) de ses biens supports est un actif du SI ; affichés à côté de la synthèse saisie, non modifiables, avec la date de réception |
| Registre de sauvegardes | 🔗 **reçu de WerbExploitation** (`site:sauvegardes`, 1.18.0) : sauvegardes dont la **source** (`actifSource`) est un actif du SI — réf., données, catégorie, état, source, destination, périodicité, dernier test de restauration et statut ; repères *sauvegarde hors ligne (BCK_3) active* et *tests de restauration à jour* ; affiché sous le tableau saisi des sauvegardes, non modifiable |
| Remédiations des tests d'intrusion, indicateur *Remédiations ouvertes* | 🔗 **reçues de WerbPentest** (`site:remediations`, 1.19.0) : compteurs par mission et par actif du SI — vulnérabilités ouvertes critiques, élevées, moyennes, faibles, actions ouvertes, en retard, prochaine échéance ; repères *critiques ou élevées ouvertes*, *actions en retard*, *prochaine échéance* ; affichées sous les priorités saisies, non modifiables, sans aucun texte de vulnérabilité |
| Schémas d'architecture | 🔗 **reçus de WerbCartoSI** (`site:cartographies`, 1.24.0) : schémas en vigueur liés au SI ou à un de ses actifs — identifiant, titre, type, version, état (approuvé et à jour, revue dépassée, en cours), prochaine revue, exigences démontrées, lien (SI ou actif) ; schéma approuvé et à jour, revue dépassée et SI sans schéma signalés. Ni fichier ni chemin : les schémas restent dans le dossier du site |
| Nombre de VLAN, flux inter-VLAN, VLAN en échange, actifs du SI, priorités P1 | 🗄️ **calculés** depuis la Matrice de flux (flux autorisés ; un hôte est rattaché à son VLAN par le Plan IP) et le Plan IP, non modifiables |
| Score de risque brut (/100), niveau de maturité | saisis |
| RACI des tâches de gestion | propre au SI : tâches modifiables, acteurs pris dans **Référentiels › Rôles** ; R rouge, A bleu, C orange, I vert ; un seul A et au moins un R par tâche (signalé sinon, aussi dans les contrôles) ; un rôle retiré par le groupe mais employé reste, signalé ⚠ |
| Sauvegardes, redondance et continuité, synthèse des risques, priorités de remédiation (P1 / P2 / P3 / Conforme, délai) | saisis, lignes ajoutées ou retirées |

**⬇ Imprimer Word** produit la fiche en `.docx`, habillée du **modèle Word de l'entreprise** (charte §7.2 : *Modèle commun de l'espace* ou *Charger un modèle…* sous la liste ; le modèle est copié dans la base). Jauges en ★ et cases colorées, RACI et priorités en couleur. Disponible aussi en lecture seule.

### Routes et NAT

Chaque ligne est **rattachée à une machine** : choisissez son TAG dans la colonne **Actif (machine)**. La liste contient les machines physiques et les machines virtuelles. La colonne **Base** indique de laquelle il s'agit.

- **Routes** : saisissez la destination sous la forme `10.20.0.0` + masque `24` (ou `255.255.255.0`), `10.20.0.0/24`, ou `default`. Une adresse sans masque est une route d'hôte (`/32`). Le **CIDR** et le **VLAN de destination** sont calculés.
- **NAT** : choisissez le type (SNAT, DNAT, PAT…), puis renseignez les adresses et les ports d'origine et traduits. Une adresse peut être une IP, un réseau CIDR, une plage `a.b.c.d - e.f.g.h` ou `any`.
- Le filtre **Tous les actifs** n'affiche que les lignes d'une machine. **➕ Ajouter** rattache alors la nouvelle ligne à cette machine.
- Les onglets Machines physiques et Machines virtuelles affichent le nombre de routes et de règles NAT de chaque machine (colonne **Routes / NAT**).
- Si vous renommez le TAG d'une machine, ses routes et ses règles NAT suivent automatiquement.
- Le Tableau de bord signale les actifs inconnus, les destinations invalides, les routes en double et les passerelles situées hors des réseaux de la machine (d'après le Plan IP).

### Procédures SMSI

Chaque procédure se décrit à deux niveaux :

1. **Catalogue des procédures** : la fiche d'identité de la procédure (code `PRO-…`, titre, domaine, version, statut *Brouillon / En revue / Validée / Obsolète*, propriétaire, approbateur, date de validation, prochaine revue et fréquence). Elle contient aussi l'objet, le domaine d'application, les références (ISO 27001, ANSSI, IEC 62443…), les déclencheurs et le lien vers le document SMSI.
2. **Fiches de procédure** : les étapes. Chaque étape a une phase, une section, un responsable, des moyens, une preuve attendue et un lien.

**Créer une procédure** : *Catalogue* → choisissez un modèle → **➕ Depuis un modèle**. Modèles fournis :

| Modèle | Code | Phases |
|---|---|---|
| Cycle de vie des équipements (PLM) | `PRO-PLM-001` | Intégration, intervention, suppression |
| Mise à jour des systèmes (OS et firmware) | `PRO-MCS-001` | Veille et qualification, préparation, déploiement, vérification et traçabilité |
| Gestion du cycle de vie des certificats | `PRO-PKI-001` | Demande, émission, déploiement, surveillance et renouvellement, révocation |
| Gestion des licences logicielles | `PRO-LIC-001` | Acquisition, affectation, suivi, retrait |
| Maintien en condition opérationnelle | `PRO-MCO-001` | Planification, maintenance préventive, maintenance corrective, suivi |
| Procédure vierge | `PRO-XXX-001` | — |

Les modèles sont des **points de départ** : adaptez les étapes et les responsables, puis passez la procédure au statut *Validée*.

**Deux présentations** dans *Fiches de procédure* :
- **🗂 Par phase** : les étapes sont regroupées sous l'en-tête de leur phase. Les boutons ▲ ▼ changent l'ordre des étapes dans une phase. **➕ Ajouter** reprend la phase et la section de la dernière étape.
- **📄 Rédigée (SMSI)** : la procédure est mise en forme comme un document, prêt à intégrer au système documentaire : cartouche, 1. Objet, 2. Domaine d'application, 3. Références, 4. Déclencheurs, 5. Rôles et responsabilités (déduits des étapes), 6. Déroulement numéroté (6.1.1…), 7. Enregistrements et preuves. Exportez-la avec **⬇ Word (.doc)** ou **🖨 PDF**.

Le bouton **📄** du catalogue ouvre directement la version rédigée. Le Tableau de bord signale les procédures sans étape, sans approbateur alors qu'elles sont validées, dont la revue est échue ou non planifiée, et les étapes sans responsable. Les listes **Rôles** et **Domaines de procédure** se modifient dans les Référentiels.

### Matrice de flux

![Matrice de flux](docs/captures/08_matrice_flux.png)

**Flux reportés de WerbExploitation** (1.25.0) : les flux des demandes au statut Réalisée, publiés par WerbExploitation 1.10.0 (`site:fluxRealises`), sont **ajoutés automatiquement** à la matrice à l'ouverture de l'espace, au rattachement et par ⟳ Actualiser : règle active, `accept`, source, destination, protocole et port ; référence, projet et justification du besoin en commentaire, repère `[FLX-…#p.l]`, ticket, proxy et date de réalisation en commentaire 2. Le **pare-feu** reste à renseigner : la barre de la matrice signale les règles reportées qui n'en ont pas. Une règle identique (source, destination, port, protocole) déjà présente n'est pas dupliquée ; une règle reportée n'est jamais ajoutée deux fois, même modifiée ensuite. Chaque ajout est tracé au journal. La matrice reste la référence de ce qui est autorisé.

Le bouton **⬇ CSV règles** exporte les colonnes `#…` du pare-feu sélectionné dans le filtre. Vérifiez que ce format correspond à l'import de votre pare-feu avant tout chargement.

---

## Conventions de nommage et codes couleur

### Criticité des plages (couleur de la ligne)

| Couleur | Usage | Impact |
|---|---|---|
| 🟥 Rouge | Réseaux Process | Très fort impact sur la production |
| 🟧 Orange | Métiers critiques | Fort impact sur la production |
| 🟨 Jaune | Métiers non critiques et prestataires | Impact modéré |
| 🟩 Vert | Sûreté | Pas d'impact sur la production |

### Statut d'un VLAN (couleur de la case)

| Couleur | Statut |
|---|---|
| 🟩 Vert | VLAN configuré et en service |
| 🟥 Rouge | VLAN réservé, non configuré sur les switchs |
| 🟧 Orange | Configuration en cours sur les switchs |

### Noms de réseaux et de VLAN

- Réseaux : `RSX_PROC_…`, `RSX_WAN_…`, `RSX_ADMIN_…`, `RSX_IT_…`
- Le nom de VLAN est déduit automatiquement : `RSX_PROC_PESAGE` en VLAN 110 → **`VL110_PROC_PESAGE`**. Il peut être forcé dans la Table IP VLAN.

### Préfixes de TAG (extrait)

`SRV_` serveur · `SW_` switch · `OSM_` switch industriel · `PC_` poste · `API_` automate · `CAM_` caméra · `OND_` onduleur · `RG_` répartiteur général · `SR_` sous-répartiteur · `BOX_` boîtier WAN…
La liste complète est dans **Référentiels**. Un TAG hors liste est signalé à titre d'information.

---

## Exercices de prise en main

La base DEMO contient **des erreurs volontaires**. Retrouvez-les dans **Tableau de bord → Contrôles de cohérence**, puis corrigez-les.

| # | Anomalie | Où corriger | Piste |
|---|---|---|---|
| 1 | Chevauchement VLAN 400 / VLAN 401 | Table IP VLAN | Le VLAN 400 est en `/23` : passez-le en `/24`, puis réattribuez l'IP de `CAM_QUAI` (10.40.1.22) avec **⟳** |
| 2 | Réseau `RSX_PROC_SCADA` inexistant | Plan IP | Rattachez la ligne au réseau `112 – RSX_PROC_SNCC`, ou supprimez-la (elle est en double) |
| 3 | `10.40.2.30` hors du réseau du VLAN 401 | Plan IP | Utilisez **⟳** pour obtenir une IP valide |
| 4 | Doublon `10.10.12.30` | Plan IP | Conséquence de l'exercice 2 |
| 5 | Doublon `10.30.1.20` | Plan IP | Filtre ID VLAN = 301, puis **⟳** sur l'imprimante de l'atelier |
| 6 | Réseau isolé `RSX_CAM_PARKING_ISO` sans adressage | Table IP VLAN | Saisissez par exemple `192.168.30.0` / `24` |
| 7 | Hyperviseur `SRV_HYP03` inconnu | Machines virtuelles | Choisissez `SRV_HYP02` |
| 8 | TAG `LB_ENTREE` absent des inventaires | Actifs réseau | Ajoutez un lecteur de badge `LB_ENTREE`… |
| 9 | TAG `API_GTB01` absent des inventaires | Actifs réseau | …ou un automate `API_GTB01` |

Ensuite :
1. Cliquez sur **💾 Enregistrer**, avec un commentaire du type « Correction des anomalies DEMO ».
2. Ouvrez **Historique** pour voir vos modifications tracées champ par champ.
3. Faites **📊 Export Excel → Remplir mon classeur modèle** et ouvrez le fichier obtenu dans Excel.

![Historique](docs/captures/09_historique.png)

---

## Mise en service

### Principe

Dans l'environnement WerbSMSI, la base se range dans le dossier du site : `SMSI_<GROUPE>/sites/<CODE>/inventaires/WerbMap_<CODE>.werbmap.json`, sur le drive protégé. Hors WerbSMSI, le fonctionnement par bibliothèque SharePoint synchronisée reste identique :

```
 Poste A (Edge)  ─┐                                 ┌─ Poste B (Edge)
 WerbMap.html     ├─► dossier OneDrive synchronisé ◄┤  WerbMap.html
                  │   └── WerbMap_SITE.json         │
                  └──────────── SharePoint ─────────┘
```

La **base** est un fichier `.json` stocké dans une bibliothèque SharePoint synchronisée. L'outil l'ouvre et y écrit directement. OneDrive se charge de la synchronisation.

### Mise en place (administrateur)

1. Dans SharePoint, ouvrez la bibliothèque et cliquez sur **Synchroniser** (ou **Ajouter un raccourci à Mes fichiers**).
2. Ouvrez `WerbMap.html` dans **Edge**.
3. Cliquez sur **➕ Créer une nouvelle base…** et enregistrez-la dans le dossier synchronisé, par exemple `WerbMap_SITE1.werbmap.json`.
4. Créez votre compte **administrateur** (mot de passe de 10 caractères minimum).
5. Faites **📥 Import Excel** avec votre classeur actuel. L'outil reconnaît les feuilles `VLAN`, `VLAN-SITE1`, `TableIP_VLAN-SITE1`… et vous demande de choisir s'il y a plusieurs sites.
6. Contrôlez le résultat, puis **💾 Enregistrer** (version 1).
7. Dans **Utilisateurs**, créez les comptes des collègues avec un mot de passe provisoire. Ils le changent ensuite avec le bouton 👤.
8. Déposez `WerbMap.html` dans le même dossier SharePoint, ou sur les postes.

> 💡 **Une base par site** : `WerbMap_SITE1.werbmap.json`, `WerbMap_SITE2.werbmap.json`…

### Au quotidien

- La base est **redemandée à chaque session** : l'outil ne mémorise ni la dernière base ni ses données sur le poste.
- Si un collègue enregistre pendant que vous travaillez, un **bandeau** vous prévient. Si vous enregistrez quand même, l'outil **refuse d'écraser** son travail, télécharge vos modifications en **brouillon** et recharge la dernière version.
- Les modifications non enregistrées restent **en mémoire** : à la fermeture de la base, l'outil propose de les télécharger en brouillon ; en fermant l'onglet, le navigateur demande confirmation.
- La session se **verrouille après 15 minutes** d'inactivité.

### Mode dégradé (Firefox ou accès en écriture refusé)

Chaque enregistrement **télécharge** le fichier `.json`. Il faut alors le redéposer dans SharePoint en remplaçant l'ancien. Préférez Edge.

---

## Comptes, rôles et versioning

| Rôle | Consulter / exporter | Modifier / enregistrer | Comptes et référentiels |
|---|:-:|:-:|:-:|
| Lecteur | ✅ | — | — |
| Éditeur | ✅ | ✅ | — |
| Administrateur | ✅ | ✅ | ✅ |

- Chaque **💾 Enregistrer** crée une **version numérotée** avec un commentaire obligatoire.
- Le **journal** conserve, pour chaque modification : date, utilisateur, objet, élément, champ, valeur avant et valeur après.
- Chaque version reçoit une **empreinte d'intégrité** chaînée à la précédente. Si le fichier est modifié en dehors de l'outil, une alerte « ⚠ fichier modifié hors de l'outil » s'affiche.
- Il reste toujours au moins un administrateur actif.

---

## Import et export Excel

### 📥 Import Excel (`.xlsm` ou `.xlsx`)

- Les feuilles sont reconnues par leurs **en-têtes de colonnes**, quel que soit leur nom (`VLAN`, `VLAN-SITE1`…).
- Les couleurs de criticité et de statut de la matrice sont relues.
- Les lignes de la feuille VLAN situées **sous les plages 100-499** (début VLAN = 1…) deviennent des **réseaux isolés**.
- Les lignes vides qui ne contiennent que des formules (`#N/A` de RECHERCHEV) sont ignorées.
- Un compte rendu indique la feuille utilisée et le nombre de lignes pour chaque partie, **avant** toute modification.
- L'import remplace les données mais conserve les comptes, l'historique, le rattachement WerbSMSI et les SL-T des zones. Il est tracé et doit être enregistré.
- Si le classeur n'a pas de feuilles `Routes` et `NAT` (c'est le cas du classeur modèle), les routes et le NAT de la base sont **conservés**.
- **Procédures** : les feuilles `Procedures` et `Procedures_Etapes` d'un export simple sont réimportées, et les procédures sont reconnues par leur code. À défaut, la feuille `MATRICE PLM` alimente la procédure PLM, mais seulement si celle de la base n'a pas été modifiée. Les autres procédures de la base sont toujours conservées.

Pour essayer : importez `exemples/Exemple_Base_Inventaires_actifs_DEMO.xlsm` dans une base vide.

### 🧾 Saisie en masse (Plan IP, coffrets, actifs réseau, machines physiques et virtuelles)

Pour ajouter ou corriger beaucoup de lignes sans passer par le classeur complet :

1. **⇩ Modèle de saisie**, dans la barre de la table : un classeur `.xlsx` avec la feuille de saisie (mêmes titres de colonnes que le classeur d'inventaire), des **listes déroulantes** des valeurs de la base (réseaux, types d'actif et de machine, coffrets, hyperviseurs, TAG, Oui/Non) et une feuille **Mode d'emploi** qui décrit chaque colonne. Il est vierge, ou contient les lignes existantes pour les corriger en masse.
2. Remplir le classeur dans Excel (une autre valeur que celles des listes reste possible : elle sera signalée).
3. **⇧ Importer des lignes** : le classeur, ou un fichier `.csv` portant les mêmes titres (séparateur `;` ou `,`, UTF-8). Les colonnes sont reconnues par leur titre, dans n'importe quel ordre ; une colonne absente n'est pas modifiée.
4. Choisir le mode, puis lire le **rapport** : rien n'est modifié avant **Appliquer**.

| Mode | Effet |
|---|---|
| Ajouter et mettre à jour | Une ligne dont la clé existe déjà est mise à jour (une cellule vide ne change rien), les autres sont ajoutées. Clé : le **TAG** ; l'**adresse IP** pour le Plan IP. |
| Ajouter seulement | Une ligne dont la clé existe déjà est rejetée. |
| Remplacer toute la table | Les lignes de la table sont supprimées puis remplacées par celles du fichier (confirmation demandée). |

Lignes **rejetées**, avec leur numéro et leur motif : TAG manquant, doublon dans le fichier, TAG déjà utilisé par un autre type d'équipement, adresse IP invalide, réseau inconnu. **Avertissements** (la ligne est importée) : valeur hors des listes de la base, coffret ou hyperviseur absent, date non reconnue, adresse hors du réseau. Le rapport se télécharge en CSV pour corriger le fichier. Les dates sont acceptées en date Excel, `AAAA-MM-JJ` ou `JJ/MM/AAAA`. Chaque ajout et chaque champ modifié sont tracés au journal ; enregistrer ensuite une version.

### 📊 Export Excel

![Export Excel](docs/captures/10_export_excel.png)

| Option | Résultat |
|---|---|
| **Remplir mon classeur modèle** | Votre classeur `.xlsm` d'origine, rempli. Mise en forme, tableaux, listes déroulantes, cases à cocher, commentaires, formules, **macros** (si le modèle en contient), LEGENDE et MATRICE PLM sont conservés. Les tableaux s'agrandissent si nécessaire. |
| **Utiliser un autre modèle** | Pour un classeur qui a évolué ou un autre site. Le modèle choisi sert jusqu'à la fermeture de l'onglet ; il n'est pas conservé sur le poste. |
| **Classeur simple (.xlsx)** | Toutes les données, dont les feuilles *Routes*, *NAT*, *Procedures* et *Procedures_Etapes*, plus les feuilles *Anomalies*, *Versions* et *Journal*. |

> ℹ️ Le classeur modèle n'a pas de feuilles pour les routes et le NAT. Pour les exporter, utilisez le **Classeur simple**.

Un fichier exporté peut être **réimporté** tel quel.

> ℹ️ L'export *Classeur simple* porte la signature de WerbMap dans ses propriétés. L'export *Remplir mon classeur modèle* conserve les propriétés de votre modèle.

### 🖨 PDF

Imprime l'onglet courant (ou l'enregistre en PDF) avec un en-tête (organisation, site, référence, version) et un pied de page signé.

---

## Questions fréquentes

**Les données sont-elles enregistrées dans le fichier HTML ?**
Non. Elles sont dans le fichier `.json` de la base. Le fichier `WerbMap.html` ne contient que l'outil et le modèle Excel vierge.

**« Accès en écriture refusé » à l'ouverture**
Le navigateur demande l'autorisation d'écrire dans le fichier : acceptez. Si vous avez refusé, fermez la base (⏏) et rouvrez-la.

**Un collègue ne voit pas mes modifications**
Vérifiez que vous avez bien cliqué sur **Enregistrer** (le bouton orange indique des modifications en attente) et que OneDrive a fini de synchroniser. Le collègue clique ensuite sur 🔄.

**J'ai oublié mon mot de passe**
Un administrateur le réinitialise dans **Utilisateurs → 🔑**, puis enregistre une version.

**L'import ne trouve pas une feuille**
Le compte rendu indique « feuille non trouvée ». Vérifiez que la ligne d'en-têtes de la feuille contient bien les intitulés d'origine (`Debut VLAN`, `NOM_DU_RESEAU`, `Adresse IP` et `TAG Actif`, `TAG equipement`…).

**Des brouillons d'une ancienne version traînent sur le poste**
WerbMap 1.2 efface automatiquement, à l'ouverture, les brouillons, la base et le modèle mémorisés par WerbMap 1.1 ou antérieur. Le lien en bas de l'écran d'accueil le fait aussi à la demande. Les bases sur le drive ne sont pas touchées.

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression et les exports restent toujours en clair.

---

## Données et format

- Une base est un fichier **`*.werbmap.json`** à l'enveloppe commune WerbSMSI : `format` `WERBMAP`, **schéma 4**, `famille` `WERBSMSI`.
- `meta` : version de l'outil, `generateur` signé, date et auteur de la dernière version ; `portee`, `site` et `groupeId` quand la base est rattachée à un site WerbSMSI.
- `integrite` : empreintes SHA-256 de la dernière version et de la précédente (copie de la chaîne tenue dans `versions`).
- `data` :

| Clé | Contenu |
|---|---|
| `version`, `savedAt`, `savedBy` | Numéro, date et auteur de la dernière version enregistrée |
| `comptes` | Comptes : identifiant, nom, rôle, sel et empreinte PBKDF2-SHA256 du mot de passe, état |
| `inventaire` | Matrice VLAN, adressage, plan IP, coffrets, actifs, machines, VM, flux, routes, NAT, procédures, référentiels ; `meta.werbsmsi` (rattachement) et `meta.zonesSec` (nom publié et SL-T des zones) |
| `versions` | Une entrée par version : numéro, date, auteur, commentaire, nombre de modifications, **empreinte chaînée** |
| `journal` | Une entrée par modification : version, date, utilisateur, objet, élément, champ, avant, après |

- L'empreinte de chaque version porte sur `inventaire`, `comptes` et les entrées de journal de la version, enchaînée à la précédente. Ces objets sont repris **tels quels** dans l'enveloppe : la chaîne des bases antérieures reste valable.
- **Ancien format lu** : `werbhat-vlan-ipam` (schéma 3, WerbMap 1.0 et 1.1), converti au schéma 4 au prochain enregistrement. Le format 1.0 (`zones` à la racine) reste lu également.

---

## Intégration WerbSMSI

- Rubrique **Inventaires ICS**, niveau **site**. Onglet **Administration › Intégration WerbSMSI** :
  1. **Choisir l'espace** : le dossier `SMSI_<GROUPE>` du drive protégé, redemandé à chaque session.
  2. **Rattacher** la base à un site (tracé au journal, enregistré avec la version suivante).
  3. **Zones de sécurité** : les codes de zone de la matrice VLAN (*Référentiels › Zones*). Pour chacune, un nom publié et le **SL-T** issu de l'analyse de risques. La criticité publiée est la plus forte des plages de la zone.
  4. **Conduits** : déduits de la matrice de flux, un par couple de zones relié par au moins un flux autorisé.
  5. **Publier** (base enregistrée, rôle Éditeur ou Administrateur) : écrit `sites/<CODE>/publications/werbmap.json`.
6. Sans espace (poste isolé, Firefox) : **⬇ Exporter la publication** produit le même contenu dans un fichier, à importer dans WerbExploitation (*Inventaire WerbMap › Importer une publication WerbMap…*).

| Objet | Contenu publié |
|---|---|
| `site:zones` | code, nom, SL-T (si défini), criticité (`process`, `metier-critique`, `metier`, `surete`) |
| `site:conduits` | identifiant `C-<de>-<vers>`, zones source et cible, nombre de flux et pare-feux |
| `site:actifs` | TAG, type, famille (`reseau`, `physique`, `virtuelle`), zone (déduite du plan IP), libellé, criticité, emplacement, coffret, OS et version, hyperviseur (VM), fonction, marque |
| `site:si` | systèmes d'information : identifiant, nom, fonction, D / I / C, ID des VLAN, TAG des actifs (WerbEBIOS les reprend comme biens supports). Ni RACI, ni saisies de la fiche |

- Objets **lus** : **`site:inventaires`** (relevés d'inventaire des machines publiés par WerbExploitation 1.23.0 : colonne « Inventaire » des machines et consolidation proposée des champs système et matériel dans Intégration WerbSMSI, 1.27.0), `groupe:listes` (listes de choix), `groupe:echelles` (échelle D / I / C et niveaux de risque), **`site:sauvegardes`** (registre des sauvegardes de WerbExploitation, copié dans la base comme les risques), **`site:syntheseRisques`** (risques EBIOS du site, avec les actifs de leurs biens supports), `site:remediations` (WerbPentest), `site:evaluationsPrestataires` (WerbPresta), **`site:cartographies`** (schémas d'architecture de WerbCartoSI, 1.24.0), **`site:fluxRealises`** (flux des demandes réalisées de WerbExploitation, ajoutés à la matrice de flux, 1.25.0), **`site:plm`** (état PLM des matériels, logiciels et OS installés, de WerbExploitation : fiche SI, 1.26.0). Ils sont relus à l'ouverture de l'espace et au rattachement, ou par **Liste des SI › ⟳ Actualiser** (Éditeur, Administrateur), et **copiés dans la base** : les fiches SI restent complètes hors espace. Chaque réception qui change les données est tracée au journal.

- Les publications sont lues par **WerbIEC62443** (zones et conduits du projet), par **WerbExploitation** (actifs proposés dans les registres d'exploitation : mises à jour, certificats, licences, sauvegardes, interventions, comptes) et par **WerbEBIOS** (actifs reliés aux biens supports de l'analyse de risques du site) ; le portail les consolide.
- Licences, certificats, MCO et mises à jour des systèmes se gèrent dans **WerbExploitation** (rubrique Exploitation).
- Une zone publiée **sans SL-T** est ignorée par WerbIEC62443 : définissez-le avant de publier.
- **Listes de choix du groupe** (charte §5.9) : types d'actif, types de machine, abréviations des TAG, couches switch, types de NAT, rôles et domaines de procédure reçoivent les valeurs publiées par le groupe (`groupe:listes`, portail WerbSMSI). La fusion se fait après la connexion et à l'ouverture de l'espace ; dans *Référentiels*, les valeurs 🏢 du groupe sont affichées à part et ne se modifient pas, la zone de saisie contient les valeurs 📍 du site. Une valeur retirée par le groupe mais encore employée reste disponible, signalée ⚠ ; un renommage est proposé (*Remplacer*, sauf pour une abréviation). Zones, pare-feux et réseaux restent propres au site. Une copie des valeurs du groupe est gardée dans la base.
- Sans espace choisi, WerbMap fonctionne seul, comme avant.

- **Depuis le portail WerbSMSI** : sous ce module, une puce par site ouvre directement sa base. Le module demande alors un dossier (celui de l'espace, du site ou du module) puis ouvre la base, qui s'enregistre à sa place.

---

## Confidentialité et sécurité

- L'authentification est un **contrôle applicatif** (traçabilité, séparation des rôles), **pas une barrière de sécurité**. Toute personne qui a accès au fichier `.json` peut le lire.
- La **protection réelle** repose sur les **droits du dossier** (drive protégé du site ou bibliothèque SharePoint). Limitez l'accès en écriture aux personnes concernées.
- Le plan d'adressage et la matrice de flux sont des **informations sensibles** : ne les stockez pas dans un espace partagé largement.
- L'**historique des versions** du drive ou de SharePoint sert de sauvegarde supplémentaire de la base.
- Les mots de passe sont stockés sous forme d'empreinte (PBKDF2-SHA256, 150 000 itérations), jamais en clair.
- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante.
- **Rien dans le navigateur** depuis la 1.2 : ni brouillon (qui contenait les empreintes des mots de passe), ni base, ni modèle Excel mémorisés. La purge ne touche que les données de WerbMap, pas celles des autres modules WerbSMSI.
- **Publication maîtrisée** : seules les zones, les conduits et l'identité des actifs (TAG, type, famille, libellé, emplacement, OS, hyperviseur, fonction, marque) sont publiés vers le site, sur action explicite. Adresses IP, VLAN, numéros de série et matrice de flux restent dans la base.
- **Intégrité de l'outil** : comparer l'empreinte de `application/WerbMap.html` à celle de `WerbMap.sha256` :

```powershell
Get-FileHash .\application\WerbMap.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

- Le source principal reste **un seul fichier** écrit à la main : `sources/src/WerbMap.html` (HTML, CSS et JavaScript sans dépendance externe). Le modèle Excel vierge y est intégré en base64 (constante `TPL_B64`).
- `sources/build.py` assemble `application/WerbMap.html` : il y insère `signature.js` (identité : nom, version, format) et `socle.js` (fonctions communes WerbSMSI, copie conforme de la charte), le commentaire de build et la ligne de signature. Python 3.10 ou plus récent, rien d'autre.
- La version se règle dans `sources/src/signature.js` **et** `module.json`, qui doivent concorder. Notez chaque évolution dans `CHANGELOG.md`.
- **Menu latéral** : il est affiché par `WerbSocle.menu` (socle de la charte) à partir de la constante `MENU` (catégories, emoji, teinte `c`, onglets). Pour ajouter un onglet, ajoutez-le dans `MENU`, puis décrivez ses colonnes dans `TBL` (table générique : ajout, filtre, tri, journal, impression et export simple sont fournis) ou ajoutez une fonction de rendu dans `R`.
- **Compatibilité** : le modèle interne (`DB`) garde la forme du schéma 3 ; seul le fichier passe à l'enveloppe (fonctions `toFile` et `fromFile`). Ne modifiez jamais `chainHash` ni les objets qu'il couvre.

```powershell
python sources\build.py --date AAAA-MM-JJ
python tests\test_parcours.py                      # Playwright pour Python, Edge installé
python tests\test_theme.py
python tests\test_si_prestataires.py
python tests\test_si_cartographies.py
python tests\test_guides.py
python tests\test_zone.py
python tests\test_si.py
python tests\test_actifs.py
python tests\test_tag.py
python tests\test_si_liens.py
python tests\test_si_sauvegardes.py
python tests\test_flux_report.py
python tests\test_si_plm.py
python tests\test_plan_ip.py
python tests\test_si_tri.py
python tests\test_tables.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` contrôle : CSP, menu commun (catégories colorées, repli, entrée active), création de base et du compte administrateur, saisie d'actifs, enregistrement d'une version, rattachement au site, publication enrichie des actifs, absence de stockage navigateur. L'espace de démonstration de la charte est recopié dans le système de fichiers privé d'Edge (page servie sur `http://localhost` par Playwright, sans serveur).
- `tests/test_listes.py` contrôle les listes de choix du groupe : déclaration identique à `DEF_REFS`, fusion à l'ouverture de l'espace, valeurs du groupe non modifiables, abréviations en paires, valeur retirée mais employée, remplacement proposé, copie enregistrée avec la version.
- `tests/test_si_cartographies.py` contrôle les schémas d'architecture de la fiche SI (1.24.0) : `site:cartographies` copié au rattachement (une ligne par schéma, exigences regroupées, sans lien), rattachement au SI par le SI lié ou par un actif, schéma hors du SI écarté, repères (à jour, revue dépassée), SI sans schéma signalé, lecture seule, copie à l'enregistrement.
- `tests/test_si_prestataires.py` contrôle les prestataires de la fiche SI (1.22.0) : `site:evaluationsPrestataires` copié au rattachement (champs de l'objet seulement), rattachement au SI par le périmètre ou un actif couvert, prestataire hors du SI écarté, cadre en lecture seule (accès permanent, score faible, écarts en retard), copie enregistrée.
- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, criticités de la matrice VLAN dans les deux thèmes, bandeau foncé, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.
- `tests/test_zone.py` contrôle la zone d'un actif réseau (1.8.0) : colonnes, zone déduite des VLAN, zones proposées tracées au journal, conflit sur la ligne et dans les contrôles, Matrice VLAN inchangée, zone saisie publiée en priorité, modèle Excel, compte lecteur.
- `tests/test_si.py` contrôle les fiches SI (1.9.0) : liste, ➕ / ➖ Fiche SI, saisie, VLAN de la Table IP VLAN, échelle D / I / C d'EBIOS, données calculées non modifiables, RACI (couleurs, un seul A, rôle retiré conservé), priorités, fiche Word sans puis avec le modèle d'entreprise, relecture de la base, compte lecteur.
- `tests/test_actifs.py` contrôle la page Actifs réseau (1.10.0) : ligne avec lien long aussi haute qu'une ligne sans lien, cellules de lien restées des cellules de tableau, colonnes alignées, lien tronqué et entier au survol ; colonne « Modèle », import CSV avec « Modèle » ou l'ancien « Référence » ; publication de modèle, firmware et commentaire (1.11.0).
- `tests/demo_si.py` ajoute à la base DEMO les fiches SI d'exemple, par l'outil lui-même (nouvelle version enregistrée : la chaîne d'intégrité reste valide), puis reconstruire le livrable ; `tests/captures.py` produit aussi les captures de la Liste des SI et d'une fiche.
- `tests/test_tables.py` contrôle les outils des tables (1.17.0) : archivage d'un actif (réserve, publication, TAG, contrôles « archivé », journal, enregistrement), désarchivage et refus si le TAG est repris, suppression multiple, chercher / remplacer (colonnes proposées, aperçu, journal), largeur des colonnes (poignée sans tri, enregistrement, double-clic), lecteur.
- `tests/test_si_tri.py` contrôle le tri et le filtre de la Liste des SI (1.15.0) : tri A→Z / Z→A / sans tri, tri numérique, valeurs vides en dernier, filtre sur le nom, la fonction, le VLAN et le TAG, saisie conservée pendant la frappe, suppression limitée aux fiches affichées, lecteur.
- `tests/test_plan_ip.py` contrôle les doublons d'adresse en ID VLAN 1 (1.14.0) : tolérés sur la ligne et dans les contrôles, signalés en information, doublons des autres ID VLAN toujours en erreur, clé de la saisie en masse.
- `tests/test_si_liens.py` contrôle la fiche SI alimentée par les autres modules (1.13.0) : risques EBIOS reçus au rattachement et rattachés au SI par TAG, risque hors du SI écarté, tableau, indicateur, colonne de la liste, fiche Word, copie enregistrée, ⟳ Actualiser, publication `site:si` sans le contenu de la fiche, lecteur.
- `tests/test_si_sauvegardes.py` contrôle le registre des sauvegardes dans la fiche SI (1.18.0) : copie dans la base au rattachement, rattachement au SI par `actifSource`, sauvegarde d'un actif hors du SI écartée, repères (hors ligne, tests), lecture seule, fiche Word, copie relue, ⟳ Actualiser.
- `tests/test_inventaires_recus.py` contrôle les inventaires de machines (1.27.0) : copie de `site:inventaires` au rattachement (journal), colonne Inventaire des machines physiques et virtuelles, écarts proposés (système toujours, matériel si vide), Appliquer par ligne et pour tous (journal), copie enregistrée.
- `tests/test_si_plm.py` contrôle le cycle de vie dans la fiche SI (1.26.0) : copie de `site:plm` au rattachement, rattachement au SI par les TAG, tri par gravité, repères, lecture seule, référence d'un actif hors du SI écartée, copie enregistrée, ⟳ Actualiser.
- `tests/test_flux_report.py` contrôle le report des flux réalisés de WerbExploitation (1.25.0) : ajout à la matrice au rattachement (règle active, accept, protocole, port, repère et ticket en commentaire, pare-feu vide), règle identique non dupliquée, seconde réception sans ajout, journal, signalement des règles sans pare-feu.
- `tests/test_si_remediations.py` contrôle les remédiations dans la fiche SI (1.19.0) : copie dans la base au rattachement (champs de l'objet seulement), rattachement au SI par l'actif, deux missions, ligne d'un actif hors du SI écartée, totaux et repères, indicateur, lecture seule, fiche Word, copie relue, ⟳ Actualiser.
- `tests/test_guides.py` contrôle les guides (1.20.0, 1.21.0) et la page **Mots de passe** (dossier par SI, TAG, Hors SI, Domaine, aucun secret, .txt identique à l'écran, lien vers le guide) : intégrés à jour et signés, sans adresse IP ; une entrée de menu par guide, cartes dans le guide du module, lecture (étapes, sommaire, tableaux), lien relatif entre les guides, document suivant, compte administrateur et compte lecteur, rien dans le stockage du navigateur. `tests/test_theme.py` parcourt aussi les guides.
- `tests/test_tag.py` contrôle le TAG verrouillé (1.12.0) : lecture seule dans les quatre tables, libellé et emplacement modifiables, ligne nouvelle modifiable jusqu'à l'enregistrement, renommage par l'administrateur (Plan IP, aboutissants, coffrets, hyperviseurs, routes, NAT, matrice de flux, journal, publication), TAG déjà pris refusé, éditeur et lecteur sans renommage.
- Composants tiers, figés dans `sources/vendor/bibliotheques.js` (empreinte contrôlée par `sources/build.py`, identique à WerbPentest et WerbEBIOS) : **JSZip 3.10.1** et **docx 9.8.1** (licence MIT), pour la fiche Word ; `modele-word.js` : modèle Word d'entreprise commun (charte §7.2).
- `tests/captures.py` régénère les captures de ce guide (`docs/captures/`) à partir de la base DEMO.
- Le dépôt source a été reconstitué en octobre 2026 depuis le paquet 1.2.0 publié : le livrable reconstruit était identique octet pour octet.

---

## Historique des versions

Version courante : **1.27.0** de novembre 2026 — inventaires de machines reçus de WerbExploitation (`site:inventaires`) : colonne Inventaire, consolidation proposée. Versions précédentes : **1.26.0** de novembre 2026 — fiche SI : cycle de vie (PLM) des actifs du SI reçu de WerbExploitation (`site:plm`). Versions précédentes : **1.25.1** de novembre 2026 — justification des flux reportés de WerbExploitation reprise en commentaire. Versions précédentes : **1.25.0** de novembre 2026 — matrice de flux : flux des demandes réalisées reportés de WerbExploitation (`site:fluxRealises`). Versions précédentes : **1.24.0** de novembre 2026 — fiche SI : schémas d'architecture reçus de WerbCartoSI (`site:cartographies`). Versions précédentes : **1.23.0** de novembre 2026 — publication des VLAN du plan (`site:vlans`, sans adressage) pour les fiches pare-feu et switch de WerbAssets ; **1.22.1** d'octobre 2026 — correction de texte dans le guide « Les mots de passe ». Versions précédentes : **1.22.0** d'octobre 2026 — prestataires qui interviennent dans la fiche SI (site:evaluationsPrestataires, WerbPresta) ; **1.21.0** d'octobre 2026 — page **Mots de passe** dans les inventaires (arborescence du coffre-fort KeePass par SI et TAG, sans secret) et guide « Les mots de passe ». Versions précédentes : **1.20.0** d'octobre 2026 — guides pour débuter dans ❓ Aide : les actifs d'un système et leur rôle, les étages de la cybersécurité (charte §7.4) ; **1.19.0** d'octobre 2026 — remédiations des tests d'intrusion reçues de WerbPentest dans la fiche SI (site:remediations, MAP-7.4c) ; **1.18.0** d'octobre 2026 — registre des sauvegardes reçu de WerbExploitation dans la fiche SI (site:sauvegardes, MAP-7.4b) ; **1.17.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0) ; **1.16.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.15.1** d'octobre 2026 — fiches SI d'exemple dans la base de démonstration ; **1.15.0** d'octobre 2026 — tri et filtre de la Liste des SI (MAP-9) ; **1.14.0** d'octobre 2026 — doublons d'adresse tolérés en ID VLAN 1 (MAP-10) ; **1.13.0** d'octobre 2026 — fiche SI alimentée par WerbEBIOS, publication des SI (MAP-7.4) ; **1.12.0** d'octobre 2026 — TAG verrouillé après création, renommage par l'administrateur ; **1.11.0** d'octobre 2026 — modèle, version firmware et commentaire publiés pour WerbAssets ; **1.10.0** d'octobre 2026 — page Actifs réseau plus dense, « Référence » devient « Modèle » ; **1.9.0** d'octobre 2026 — liste des SI et fiche de synthèse, export Word au modèle d'entreprise, base au schéma 5 ; **1.8.0** d'octobre 2026 — zone d'un actif réseau ; **1.7.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.6.0** d'octobre 2026 — listes de choix reçues du groupe (charte §5.9). Auparavant : **1.5.0** d'octobre 2026 — saisie en masse (modèle de saisie et import de lignes avec rapport) sur le Plan IP, les coffrets, les actifs réseau et les machines. La 1.4.0 a apporté le verrou commun des bases. Auparavant : **1.4.0** d'octobre 2026 — verrou commun des bases (lecture seule ou prise de main, bandeau « Ouvert par … ») ; **1.3.0** — menu latéral commun WerbSMSI (catégories sur fond de couleur), registres d'exploitation transférés à WerbExploitation, actifs publiés enrichis. Détail de toutes les versions dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbMap** — Développé par **@WerbHat**
