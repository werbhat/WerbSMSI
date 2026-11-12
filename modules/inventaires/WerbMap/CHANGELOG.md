# Changelog — WerbMap

Toutes les évolutions notables de WerbMap sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [1.29.1] — 2026-11

### Changements
- Renvois vers WerbExploitation mis à jour après la réorganisation de son menu (1.28.0) : *Parc & cycle de vie › Inventaires de machines* et *Parc & cycle de vie › Actifs du site (WerbMap) › Importer une publication WerbMap…*.

## [1.29.0] — 2026-11

### Ajouts
- **Relevés de machines** (MAP-17) : *Intégration WerbSMSI › Relevés de machines* — **📥 Importer un relevé de machine (JSON)** : le fichier du script d'inventaire de WerbExploitation (1.27.0) est lu directement (rien de réseau ne passe par l'espace), rattaché au TAG par le hostname (ou saisi), et WerbMap n'en garde que le **matériel**, les **interfaces**, les **routes**, les **ports en écoute** et l'**heure** — jamais les comptes, la licence, les applications ni le durcissement. **Écarts proposés** : processeur, mémoire et disques des machines physiques et virtuelles (champs vides), **adresses IP absentes du plan d'adressage** (VLAN déduit du sous-réseau), **MAC manquantes**, **routes absentes** de la table Routes (route par défaut exclue) ; Appliquer par ligne ou tous, journalisé « (relevé d'inventaire) » ; un nouveau relevé de la même machine remplace le précédent.
- **Ports et heure face à la matrice de flux** (MAP-18) : pour chaque machine relevée, ports en écoute (hors boucle locale) couverts ou non par un flux autorisé vers la machine (TAG, nom de réseau ou de VLAN, adresse, CIDR ; port en numéro, plage ou nom de service) — « aucun : service à justifier ou à fermer » ; **flux NTP** (UDP/123 ou flux marqué NTP) déclaré ou non entre la machine et sa source de temps (TAG retrouvé par l'adresse ou le nom).

### Format de données
- `releves` : un relevé par machine (`tag`, `hostname`, `collecteLe`, `materiel`, `interfaces`, `routes`, `ports`, `heure`, `fichier`, `importeLe`, `importePar`). Schéma inchangé.

## [1.28.0] — 2026-11

### Ajouts
- **Publications relues sans fermer la page** (MAP-16) : au **retour sur la page** (après avoir publié dans un autre onglet) et **toutes les minutes**, WerbMap compare la date de chaque fichier `publications/*.json` du site à celle de la dernière lecture ; une publication plus récente est **relue** (copie dans la base, journal) et annoncée dans le bandeau d'état — plus besoin de fermer et rouvrir WerbMap. Rien n'est relu si rien n'a changé ; en lecture seule, la publication est signalée sans être copiée. *Intégration WerbSMSI* : panneau **Données reçues des autres modules** avec une **note explicative** (ce qui est reçu, quand la relecture a lieu, enregistrer une version ensuite), le bouton **⟳ Actualiser les données reçues** et la liste des publications lues (module, date, auteur).

## [1.27.0] — 2026-11

### Ajouts
- **Inventaires de machines reçus de WerbExploitation** (MAP-15) : `site:inventaires` (WerbExploitation 1.23.0) est copié dans la base à l'ouverture de l'espace, au rattachement et par ⟳ Actualiser. Colonne **Inventaire** (✓ et date du relevé) dans les listes *Machines physiques* et *Machines virtuelles*, par le TAG.
- **Consolidation proposée** (*Administration › Intégration WerbSMSI › Inventaires de machines*) : écarts entre le relevé et la fiche — Système OS et Version OS toujours, Marque, Modèle et N° série seulement quand le champ est vide — avec **Appliquer** par ligne ou pour tous ; chaque modification est journalisée (champ « … (relevé d'inventaire) »). Rien n'est modifié sans action.
- `site:inventaires` ajouté aux objets lus (`module.json`). Test `tests/test_inventaires_recus.py`.

## [1.26.0] — 2026-11

### Ajouts
- **Fiche SI : cycle de vie (PLM)** (MAP-14) : `site:plm`, publié par WerbExploitation 1.18.0, est copié dans la base à l'ouverture de l'espace, au rattachement et par ⟳ Actualiser. Dans la fiche SI, nouveau cadre « Cycle de vie (PLM) » : matériels, logiciels et systèmes d'exploitation dont un TAG est un actif du SI, triés par gravité (hors support en tête) — nature, fabricant ou éditeur, produit, version, statut, fin de support (et support étendu), fin de vie, version cible, actifs du SI ; repères « hors support ou en fin de vie » et « à surveiller ». Lecture seule ; réception tracée au journal.
- `site:plm` ajouté aux objets lus (`module.json`). Test `tests/test_si_plm.py`.

## [1.25.1] — 2026-11

### Changements
- Matrice de flux : le **commentaire** d'un flux réalisé de WerbExploitation 1.12.0 (justification du besoin) est repris dans le commentaire de la règle reportée, après la référence et le projet.

## [1.25.0] — 2026-11

### Ajouts
- **Matrice de flux : report des demandes réalisées** (MAP-13) : `site:fluxRealises`, publié par WerbExploitation 1.10.0, est lu à l'ouverture de l'espace, au rattachement et par ⟳ Actualiser ; chaque flux nouveau devient une règle de la matrice (active, accept, source, destination, protocole, port ; référence, projet, repère `[FLX-…#p.l]`, ticket, proxy et date de réalisation en commentaires ; pare-feu à renseigner). Pas de doublon : repère déjà présent ou règle identique (source, destination, port, protocole). Ajouts tracés au journal.
- Barre de la matrice : nombre de règles reportées sans pare-feu.
- `site:fluxRealises` ajouté aux objets lus (`module.json`). Test `tests/test_flux_report.py`.

## [1.24.0] — 2026-11

### Ajouts
- **Fiche SI : schémas d'architecture** (CSI-10) reçus de WerbCartoSI (`site:cartographies`, copiés dans la base à l'ouverture de l'espace, au rattachement ou par ⟳ Actualiser, réception tracée au journal) : schémas en vigueur liés au SI ou à un de ses actifs (TAG), avec type, version, état (approuvé et à jour, revue dépassée, en cours), prochaine revue, exigences démontrées et lien (SI ou actif). Repères : schéma approuvé et à jour, revues dépassées ; SI sans schéma signalé. Lecture seule ; ni fichier ni chemin.

### Changements
- `site:cartographies` ajouté aux objets lus (`module.json`).

## [1.23.0] — 2026-11

### Ajouts
- **Intégration WerbSMSI** : la publication du site porte les **VLAN du plan** (`site:vlans` : identifiant, ID VLAN, nom du VLAN, nom du réseau, zone, statut, couche, réseau isolé), matrice et réseaux isolés compris. WerbAssets les propose dans les fiches pare-feu (interfaces de type VLAN) et switch (VLAN configurés). **Aucun adressage** (bloc IP, masque, passerelle) ni commentaire n'est publié. Aussi dans le fichier de publication exporté sans espace.

### Changements
- `site:vlans` ajouté aux objets publiés (`module.json`).

## [1.22.1] — 2026-10

### Corrections
- Guide « Les mots de passe » (§ Active Directory) : « un AD compromis, c'est tout le système qui est compromis » (retouche du texte reportée dans les sources et le livrable).

## [1.22.0] — 2026-10

### Ajouts
- **Prestataires qui interviennent** dans la fiche SI (PRE-8) : `site:evaluationsPrestataires`, publié par WerbPresta 1.3.0, est copié dans la base à l'ouverture de l'espace et au rattachement (`recus.prestataires`, champs de l'objet seulement, tracé au journal, ⟳ Actualiser) ; un prestataire concerne le SI quand le SI est dans son périmètre ou qu'un actif couvert est un actif du SI. Cadre en lecture seule : type, criticité, accès à distance (permanent signalé, moyen), niveau d'exigence, score de la dernière évaluation, écarts ouverts et en retard, date d'évaluation ; repères accès permanent et écarts en retard.

### Changements
- `site:evaluationsPrestataires` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_si_prestataires.py`.

## [1.21.0] — 2026-10

### Ajouts
- **🗄️ Inventaires › Mots de passe** : WerbMap ne stocke aucun secret et le dit ; **arborescence proposée du coffre-fort** (KeePass), calculée depuis la Liste des SI et les inventaires : un dossier par SI, un sous-dossier par équipement (TAG, libellé, type ; un équipement de plusieurs SI rangé dans le premier, cité dans les autres), *Hors SI*, *Domaine (Active Directory)* à structurer selon les OU ; **téléchargement .txt** ; tableau « une fiche par compte » (utilisateur, administrateur, service, local d'équipement, générique, bris de glace) avec le registre WerbExploitation correspondant (comptes à privilège, comptes génériques, sans mot de passe) ; règles d'échange des secrets.
- Guide **« Les mots de passe : coffre-fort, comptes et partage »** : pourquoi un coffre-fort ; créer le coffre KeePass pas à pas (téléchargement officiel, mot de passe maître et fichier clé, Argon2, emplacement, sauvegarde, verrouillage) ; structure SI › TAG › fiches et contenu d'une fiche ; **qu'est-ce qu'un bon mot de passe** (un mot de passe différent par compte, le coffre retenant à la place de l'utilisateur ; longueur et phrase de passe ; changement immédiat sur soupçon de compromission, périodique raisonnable pour les comptes à privilège, pas de changement imposé trop souvent, d'après le guide SP 800-63B du NIST) ; types de comptes ; Active Directory (domaine, OU, GPO, LAPS) ; ce qui va dans WerbExploitation ; politique d'échange des secrets (interdit en clair par courriel, lien éphémère de confiance comme Password Pusher, canaux séparés) ; **surveillance et exigences envers les prestataires** (dérives fréquentes, exigences de cahier des charges ou de plan d'assurance sécurité : aucun mot de passe par défaut ou commun, remise sécurisée, comptes nominatifs, accès distant maîtrisé, départs, incidents, fin de contrat, contrôle ; surveillance à la réception, revues des comptes, journaux, tests d'intrusion, sensibilisation) ; check-list.

### Développement
- `tests/test_guides.py` : 3 guides, page Mots de passe.

## [1.20.0] — 2026-10

### Ajouts
- **Guides pour débuter** (charte §7.4), dans le menu ❓ Aide et en cartes dans le guide du module :
  - **Les actifs d'un système et leur rôle** : pourquoi tout inventorier ; pour chaque type d'actif de l'inventaire (réseau, serveurs et stockage, postes et mobiles, OT, sûreté et bâtiment, équipements du quotidien) son rôle, s'il a une fonction de sécurité (oui, en partie, non) et ce qu'un attaquant peut en faire ; champs de WerbMap utiles à la sécurité ; pièges fréquents.
  - **Les étages de la cybersécurité : à quoi sert chaque outil** : défense en profondeur par étages (gouvernance, connaître, cloisonner, identités, machines, données, détecter, répondre) ; pour chaque outil, ce qu'il fait, **ce qu'il ne fait pas** et une image (le pare-feu est un douanier qui ne contrôle que ce qu'on lui demande : un flux autorisé reste un chemin pour l'attaquant) ; idées reçues ; récapitulatif en une page ; par où commencer.

### Changements
- Lecteur de guides commun (`guides.js`, copie conforme de la charte) intégré au livrable ; `sources/build.py` intègre `guides/*.md` (`window.WERB_GUIDES`).

### Développement
- Test `tests/test_guides.py`.

## [1.19.0] — 2026-10

### Ajouts
- **Remédiations des tests d'intrusion dans la fiche SI** (MAP-7.4c) : `site:remediations`, publié par WerbPentest 1.6.0, est copié dans la base à l'ouverture de l'espace et au rattachement (`recus.remediations`, champs de l'objet seulement, tracé au journal, ⟳ Actualiser) ; une ligne concerne le SI quand son actif (TAG) est un actif du SI. Tableau 🔗 en lecture seule sous les priorités saisies, par mission et par actif (vulnérabilités ouvertes critiques, élevées, moyennes, faibles ; actions ouvertes, en retard ; prochaine échéance), avec trois repères : critiques ou élevées ouvertes, actions en retard, prochaine échéance. Indicateur **Remédiations ouvertes (tests d'intrusion)** (dont en retard). Repris dans la fiche Word (indicateurs et section 8) avec la date de réception.

### Changements
- `site:remediations` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_si_remediations.py`.

## [1.18.0] — 2026-10

### Ajouts
- **Registre de sauvegardes dans la fiche SI** (MAP-7.4b) : `site:sauvegardes`, publié par WerbExploitation 1.7.0, est copié dans la base à l'ouverture de l'espace et au rattachement (`recus.sauvegardes`, tracé au journal, ⟳ Actualiser) ; une sauvegarde concerne le SI quand sa source (`actifSource`) est un actif du SI. Tableau 🔗 en lecture seule sous les critères saisis, avec deux repères : sauvegarde hors ligne (BCK_3) active, tests de restauration à jour. Repris dans la fiche Word (section 5) avec sa date de réception.

### Changements
- `site:sauvegardes` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_si_sauvegardes.py`.

## [1.17.0] — 2026-10

### Ajouts
- **Sélection multiple et archivage** (TRV-4, charte §7.7) dans le Plan IP, les coffrets, actifs réseau, machines physiques et virtuelles, la matrice de flux, les routes et le NAT (procédures : sélection et suppression) : case par ligne, « tout sélectionner », barre **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer**, **✕ Désélectionner**. Une ligne archivée est déplacée dans la réserve de la base (`archives`, avec date et auteur) : hors publication `site:actifs`, contrôles, TAG proposés, fiches SI et exports ; case « Archivées (n) » pour l'afficher grisée. Désarchivage refusé si le TAG a été repris par une ligne active.
- **Chercher / remplacer** (TRV-5) : bouton **🔁** de chaque table ; colonnes de texte libre seulement (ni TAG, ni adresse IP, ni code de procédure, ni liste, ni référence à un TAG), lignes affichées, aperçu avant d'appliquer.
- **Largeur des colonnes à la souris** (TRV-6) : poignée au bord des en-têtes (sans déclencher le tri), double-clic pour la largeur automatique ; largeurs enregistrées dans la base (`largeurs`), « ↔ Largeurs par défaut ».

### Changements
- Mentions de **WerbIEC62443** (ex-WerbTools_IEC62443, renommé pour suivre WerbNIS2) dans l'aide et la documentation.
- Contrôles : une adresse du Plan IP dont l'actif est archivé est signalée « TAG archivé : adresse encore réservée au Plan IP » (au lieu de « absent des inventaires ») ; idem pour un actif aboutissant.
- Socle 1.9.0 (au lieu de 1.8.0).

### Développement
- Test `tests/test_tables.py`.

## [1.16.0] — 2026-10

### Ajouts
- Bandeau aligné sur la charte : boutons au format commun (icône + libellé, icônes seules sous 1280 px), 📑 pour « Enregistrer sous… » et libellé « Fermer » ; le bouton ☰ propre à WerbMap est conservé (menu dans `#side`).

### Changements
- Socle 1.8.0 (au lieu de 1.7.1).

### Développement
- Test `tests/test_theme.py` : socle 1.8.0.

## [1.15.1] — 2026-10

### Ajouts
- **Base de démonstration : 4 fiches SI d'exemple** (Inventaires › Liste des SI) — SI Supervision ligne 1, SI Infrastructure et services IT, SI Bureautique du site, SI Sûreté (vidéo et contrôle d'accès, avec un réseau isolé). Chacune a ses VLAN, ses besoins D / I / C, un RACI complet (un seul A et au moins un R par tâche), sauvegardes, redondance, synthèse des risques, priorités de remédiation et score : un exemple d'usage prêt à ouvrir. Ajoutées par l'outil (version 5 de la base, auteur admin.demo) : la chaîne d'intégrité reste valide.
- Guide (README) : étape « Liste des SI » dans la découverte de la base DEMO, captures de la liste et d'une fiche.

### Développement
- `tests/demo_si.py` : régénère les fiches SI d'exemple de la base DEMO. `tests/captures.py` : captures 11 (Liste des SI) et 12 (fiche SI). `test_si.py`, `test_si_tri.py`, `test_si_liens.py` partent d'une liste vidée.

## [1.15.0] — 2026-10

### Ajouts
- **Liste des SI : tri et filtre** (MAP-9). Tri par clic sur l'en-tête de chaque colonne, comme les autres tables (▲ A→Z, ▼ Z→A, 3ᵉ clic : sans tri ; D / I / C, flux, actifs, P1, risque EBIOS et score dans l'ordre numérique ; fiche sans valeur en fin de liste). Filtre texte 🔍 sur le nom, la fonction, le périmètre, les VLAN (ID et nom) et les TAG des actifs du SI, avec le compteur « n SI sur N ». « ➖ Fiche SI » ne supprime que les fiches cochées et affichées. Disponible aussi pour un lecteur ; rien n'est enregistré.

### Développement
- `tests/test_si_tri.py` (17 contrôles).

## [1.14.0] — 2026-10

### Changements
- **Plan IP : doublons tolérés en ID VLAN 1** (MAP-10). Les réseaux d'ID VLAN 1 (réseaux isolés) réutilisent souvent le même adressage : une adresse en ID VLAN 1 n'est plus en erreur pour un doublon, ni sur la ligne (case rouge) ni dans les contrôles. Le doublon reste signalé en **information** (« Doublon toléré en ID VLAN 1 », adresses listées). Les doublons sur les autres ID VLAN restent en erreur.
- **Saisie en masse du Plan IP** : une adresse en ID VLAN 1 se rapproche par adresse **et** réseau ; deux adresses identiques de deux réseaux isolés ne sont plus confondues.

### Développement
- `tests/test_plan_ip.py` (10 contrôles).

## [1.13.0] — 2026-10

### Ajouts
- **Fiche SI alimentée par WerbEBIOS** (MAP-7.4, lot 7.4a) : les risques publiés par l'analyse EBIOS du site (`site:syntheseRisques`) sont lus à l'ouverture de l'espace, au rattachement au site ou par **Liste des SI › ⟳ Actualiser**, et copiés dans la base (fiche complète hors espace ; réception tracée au journal). Un risque concerne un SI quand un actif (TAG) de ses biens supports est un actif du SI.
  - Fiche : tableau **Risques EBIOS du SI** (réf., risque, gravité, vraisemblance, niveaux brut et résiduel avec leur libellé, traitement, actifs du SI concernés), en lecture seule à côté de la synthèse saisie ; indicateur **Risque EBIOS le plus élevé (brut → résiduel)**, avec la date de réception.
  - Liste des SI : colonne **Risque EBIOS**.
  - Fiche Word : indicateur et tableau des risques EBIOS du SI.
- **Publication `site:si`** : nom, fonction, D / I / C, ID des VLAN et TAG des actifs de chaque fiche SI, pour que WerbEBIOS les reprenne comme biens supports. Le RACI et les saisies de la fiche ne sont pas publiés.

### Changements
- `module.json › echanges` : `site:si` publié ; `groupe:echelles` (déjà lu depuis la 1.9.0) et `site:syntheseRisques` déclarés comme lus.

### Développement
- `tests/test_si_liens.py` (21 contrôles).

## [1.12.0] — 2026-10

### Ajouts
- **Renommer le TAG** (MAP-5) : bouton ✎ à côté du TAG d'un actif réseau, d'une machine physique ou virtuelle ou d'un coffret, réservé à l'administrateur. Le nouveau TAG doit être libre (casse ignorée) ; les références de la base suivent : Plan IP (TAG et actif aboutissant), coffret des actifs et des machines, hyperviseur des VM, routes, règles de NAT, matrice de flux. Confirmation avec le décompte des références, renommage et chaque référence tracés au journal, rappel de publier l'inventaire pour les autres modules.

### Changements
- **TAG verrouillé après création** (MAP-5) : dans les tables Actifs réseau, Machines physiques, Machines virtuelles et Coffrets, le TAG d'une ligne enregistrée est en lecture seule (identifiant repris par WerbAssets, WerbRecette, WerbPentest, WerbExploitation). Une ligne créée garde son TAG modifiable jusqu'au prochain enregistrement ; un TAG vide reste saisissable. Libellé et emplacement restent modifiables.
- Référentiels : un remplacement d'abréviation proposé par le groupe renvoie au renommage du TAG par l'administrateur.

### Développement
- `tests/test_tag.py` (29 contrôles).

## [1.11.0] — 2026-10

### Ajouts
- **Publication `site:actifs`** (MAP-6) : `modele` (colonne Modèle d'un actif réseau, Modèle d'une machine physique), `firmware` (version firmware d'un actif réseau) et `commentaire`, repris par WerbAssets. Les modules qui lisent une publication antérieure ne sont pas gênés (champs facultatifs).

### Développement
- `tests/test_actifs.py` : champs publiés.

## [1.10.0] — 2026-10

### Changements
- **Actifs réseau › Modèle** (MAP-4) : la colonne « Référence » s'appelle « Modèle » à l'écran, à l'impression, dans le modèle de saisie et les exports Excel. Clé interne `reference` inchangée (bases et publication existantes). Import Excel / CSV et import complet : l'ancien en-tête « Référence » reste reconnu ; l'export dans un classeur d'origine remplit « Modèle » ou « Référence ». La « Référence » des informations de la base et les « Références » des procédures ne changent pas.

### Corrections
- **Page Actifs réseau deux fois trop haute** (MAP-3) : les cellules de lien (`td.url`) étaient en `display:flex` ; sorties du modèle de tableau, les deux colonnes de lien s'empilaient dans une même cellule anonyme (lignes de 66 px, colonnes décalées). Le flex passe dans un bloc intérieur : une ligne par actif (34 px), colonnes alignées. Concerne toutes les tables avec un lien (actifs réseau, machines). Lien long tronqué « … », entier au survol, toujours cliquable.

### Développement
- Colonnes : `xa` liste d'anciens en-têtes acceptés à l'import (`colCle`).
- Test `tests/test_actifs.py`.

## [1.9.0] — 2026-10

### Ajouts
- **Inventaires › Liste des SI** (MAP-7) : tableau des systèmes d'information du site, **➕ Fiche SI** / **➖ Fiche SI** (fiches cochées, confirmation), un clic ouvre la **fiche de synthèse** du SI, d'après la maquette « Exemple_Page_synthèse SI ».
- Fiche : nom, fonction, périmètre ; **VLAN du SI** (plusieurs, choisis dans la Table IP VLAN) ; jauges **D / I / C** sur l'échelle de gravité d'EBIOS RM, reçue du groupe (`groupe:echelles`) à l'ouverture de l'espace et copiée dans la base ; indicateurs ; **VLAN du SI ⇄ VLAN en échange** ; **RACI** propre au SI ; sauvegardes ; redondance et continuité ; synthèse des risques ; priorités de remédiation (P1 / P2 / P3 / Conforme) ; actifs du SI ; commentaire.
- Données **calculées depuis WerbMap**, en lecture seule (🗄️) : nombre de VLAN, flux inter-VLAN autorisés et VLAN en échange (Matrice de flux ; un hôte cité par son TAG est rattaché à son VLAN par le Plan IP), actifs du SI (Plan IP), nombre de priorités P1. Score de risque brut (/100, borné) et maturité : saisis.
- RACI : acteurs pris dans Référentiels › Rôles (listes du groupe, charte §5.9 : un rôle retiré mais employé reste, signalé ⚠) ; R rouge, A bleu, C orange, I vert ; une valeur par case ; un seul A et au moins un R par tâche, signalés sinon, aussi dans les contrôles du tableau de bord.
- **⬇ Imprimer Word** : fiche `.docx` (bibliothèque docx embarquée), habillée du **modèle Word de l'entreprise** (charte §7.2 : modèle commun de l'espace ou fichier, copié dans la base) ; jauges en ★ et cases colorées. Disponible en lecture seule.
- Contrôles : SI sans VLAN, VLAN du SI absent de la Table IP VLAN, RACI incomplet.

### Format de données
- **Schéma 5** : `si` (fiches SI), `echelleDIC` (copie de l'échelle du groupe), `modeles.word` (modèle Word). Une base au schéma 4 s'ouvre sans modification ; les versions antérieures refusent une base au schéma 5 au lieu d'en perdre les fiches SI.

### Développement
- Bibliothèques figées `sources/vendor/bibliotheques.js` (JSZip 3.10.1, docx 9.8.1, empreinte contrôlée par `sources/build.py`) et composant commun `modele-word.js` (copie conforme de la charte).
- Test `tests/test_si.py`.

## [1.8.0] — 2026-10

### Ajouts
- **Zone d'un actif réseau** (MAP-2) : colonne *Zone* (liste des zones des Référentiels) dans la table *Actifs réseau*. La zone saisie fait foi ; elle prime dans la publication WerbSMSI (`site:actifs`) et dans le calcul des conduits.
- Colonne calculée *Zone (VLAN)* : zone(s) des VLAN des adresses IP de l'actif (Plan IP → Matrice VLAN), avec **⚠ conflit** quand la zone saisie n'en fait pas partie.
- Contrôles du tableau de bord : conflit de zone avec la Matrice VLAN (alerte), zone hors référentiel (alerte), zone non renseignée avec la zone proposée (info). Aucun conflit n'est corrigé automatiquement.
- Bouton **🧭 Zones proposées** : renseigne la zone des actifs qui n'en ont pas quand tous leurs VLAN sont dans la même zone, après confirmation, une ligne de journal par actif (éditeur ou administrateur).
- Modèle de saisie, export et import Excel : colonne *Zone*.

### Format de données
- Champ `zone` facultatif sur les lignes de `rsx`, schéma inchangé (4) : une base existante s'ouvre sans modification, ses actifs sans zone gardent la zone déduite de leurs VLAN.

### Développement
- Test `tests/test_zone.py`.

## [1.7.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5, socle 1.7.1) : bouton 🖥️ / ☀️ / 🌙 du bandeau — **Auto** (suit Windows, par défaut), **Clair**, **Sombre** ; thème reçu du portail WerbSMSI dans le lien d'ouverture. Rien n'est mémorisé ; impression et exports toujours en clair.

### Changements
- Socle 1.7.1 (au lieu de 1.6.0) : le bouton du thème se place dans le bandeau, devant le bandeau du verrou.
- Feuille de style de `WerbMap.html` : couleurs écrites en dur passées en variables. Les variables propres à WerbMap (`--mut`, `--pri`, `--pri2`, `--err`, `--head`) reçoivent une valeur sombre ; fonds sous texte blanc sur des variables « fond » foncées dans les deux thèmes (bandeau `--head-fond`, bouton principal et sélecteurs `--pri-fond`) ; en-têtes et filets de tableau, survol, champs en erreur, bandeau d'alerte, lignes en attente, fenêtres (connexion, imports), étiquettes Oui / Non, bilans d'import en masse.
- Matrice VLAN : teintes de criticité (Rouge, Orange, Jaune, Vert) et de statut (en service, réservé, en cours) avec un équivalent sombre, légende et compteurs compris. Impression de la matrice, exports Excel et Word inchangés, en clair.

### Développement
- Test `tests/test_theme.py` : base de démonstration (compte administrateur) avec Windows en sombre puis en clair, les 18 entrées du menu sans fond clair ni texte sombre sur fond sombre, criticité de la matrice VLAN dans les deux thèmes, bandeau foncé, valeurs claires inchangées, cycle du bouton, impression en clair, rien dans le stockage du navigateur.

## [1.6.0] — 2026-10

### Ajouts
- **Listes de choix du groupe** (charte §5.9, socle 1.6.0) : types d'actif, types de machine, abréviations des TAG (paires `PRÉFIXE_ = description`), couches switch, types de NAT, rôles et domaines de procédure sont déclarés dans `module.json › listes` et reçoivent les valeurs publiées par le groupe (`groupe:listes`, portail WerbSMSI 1.4.0). Zones, pare-feux et dénominations des réseaux restent propres au site.
  - Fusion **automatique** après la connexion et à l'ouverture de l'espace (*Administration › Intégration WerbSMSI*) : valeurs ajoutées par le groupe, valeurs propres au site conservées, valeur retirée par le groupe mais employée dans l'inventaire conservée et signalée ⚠ (pour une abréviation : nombre de TAG qui commencent par ce préfixe). Message dans la barre d'état, changements tracés au journal (rôle Éditeur ou Administrateur ; en lecture seule, la fusion est seulement affichée).
  - *Administration › Référentiels* : valeurs 🏢 du groupe affichées à part, **non modifiables** ; la zone de saisie ne contient que les valeurs 📍 propres au site.
  - **Remplacements proposés** (valeur renommée par le groupe, autre écriture d'une valeur du groupe) : bouton *Remplacer* pour un administrateur, qui met à jour l'inventaire ligne par ligne au journal. Une abréviation n'est jamais remplacée automatiquement : un TAG est un identifiant stable repris par les autres modules.
  - Copie des valeurs du groupe gardée dans la base (`inventaire.listesGroupe`), enregistrée avec la version et couverte par la chaîne d'intégrité.

### Développement
- `socle.js` 1.6.0 de la charte WerbSMSI.
- Test `tests/test_listes.py`.

## [1.5.0] — 2026-10

### Ajouts
- **Saisie en masse** sur le Plan IP, les coffrets, les actifs réseau et les machines physiques et virtuelles :
  - **⇩ Modèle de saisie** : classeur `.xlsx` aux titres du classeur d'inventaire, listes déroulantes des valeurs de la base (réseaux, types, coffrets, hyperviseurs, TAG, Oui/Non), feuille « Mode d'emploi » ; vierge ou avec les lignes existantes.
  - **⇧ Importer des lignes** : classeur `.xlsx`/`.xlsm` ou `.csv` (séparateur `;`, `,` ou tabulation, guillemets, UTF-8 avec ou sans BOM) ; colonnes reconnues par leur titre.
  - Modes « ajouter et mettre à jour » (par TAG, par adresse IP pour le Plan IP ; cellule vide sans effet), « ajouter seulement », « remplacer toute la table ».
  - **Rapport avant application** : ajouts, mises à jour, lignes identiques, rejets motivés (TAG manquant, doublon, TAG d'un autre type d'équipement, IP invalide, réseau inconnu), avertissements (valeur hors liste, coffret ou hyperviseur absent, date non reconnue, adresse hors réseau) ; téléchargeable en CSV. Chaque ajout et chaque champ modifié sont tracés au journal.
- Guide du module : section « Saisie en masse ».

### Développement
- Écriture `.xlsx` factorisée (`paquetXlsx`) ; listes déroulantes (`dataValidations`) dans `sheetXml`.
- `tests/test_saisie_masse.py` (Playwright, Edge) : 26 contrôles. Modèles vérifiés dans Excel 16 (ouverture sans réparation, listes déroulantes), fichier enregistré par Excel réimporté.

## [1.4.0] — 2026-10

### Ajouts
- **Verrou commun des bases** (socle 1.5.0, charte §5.7) : à l'ouverture d'une base déjà ouverte par un collègue, choix entre **lecture seule** et **prise de main** ; bandeau permanent « 🔒 Ouvert par Prénom NOM depuis 14:32 » dans l'en-tête. Le fichier est relu à chaque enregistrement, au retour sur l'onglet et chaque minute : si un collègue a pris la main, le bandeau l'indique et l'enregistrement demande confirmation avant de remplacer son travail. Le verrou est retiré à la fermeture et expire 12 h après le dernier enregistrement.
- Le verrou est pris après la connexion. En lecture seule, l'édition et l'administration sont désactivées quel que soit le rôle ; le contrôle de version concurrente (brouillon et rechargement) est conservé.

### Développement
- `socle.js` 1.5.0 de la charte WerbSMSI.

## [1.3.0] — 2026-10

### Changements
- **Menu latéral commun WerbSMSI** (socle 1.3.0, `WerbSocle.menu`) : mêmes catégories repliables avec emoji et chevron que dans les autres modules, et le titre de chaque catégorie est désormais posé sur un **fond de couleur** pour mieux se repérer. Le bouton ☰ masque toujours le menu.
- Les onglets « en préparation » **Licences**, **Certificats**, **MCO** et **Mises à jour OS** sont retirés : ces registres sont gérés par le nouveau module **WerbExploitation** (rubrique Exploitation), qui reprend les actifs publiés par WerbMap.
- **Actifs publiés enrichis** (`site:actifs`) : famille (`reseau`, `physique`, `virtuelle`), emplacement, coffret, système d'exploitation et version, hyperviseur d'une VM, fonction, marque. WerbExploitation s'en sert pour proposer les actifs par thème et reprendre libellé et emplacement. Toujours ni adresse IP, ni VLAN, ni numéro de série.
- `socle.js` 1.4.0 de la charte WerbSMSI.
- **Ouverture depuis le portail** : le portail WerbSMSI affiche une puce par site (et pour le groupe) sous chaque module ; un clic ouvre ce module avec un lien vers la base. Un bouton « Ouvrir … » demande alors un dossier (espace, site ou dossier du module, au choix) puis ouvre la base, enregistrée ensuite à sa place. Déclaré par `module.json › ouvertureParLien`.

### Ajouts
- Bouton **💾 Enregistrer sous…** : enregistre une nouvelle version dans un autre fichier (copie, autre emplacement), qui devient la base ouverte ; l'ancien fichier n'est pas modifié.
- **⬇ Exporter la publication** (Intégration WerbSMSI) : le contenu publié (zones, conduits, actifs) dans un fichier, à importer dans WerbExploitation sans espace WerbSMSI.
- Menu **❓ Aide › Guide du module** : démarrage, enregistrement et emplacement de la base, intégration WerbSMSI, bon à savoir.
- Bouton **🧪 Base de démonstration** sur l'écran d'accès, à côté de *Ouvrir* et *Créer* : ouvre la base DEMO intégrée au livrable, en mode téléchargement (aucun fichier n'est écrasé), avec le rappel des comptes de démonstration.

### Développement
- Dépôt source reconstitué depuis le paquet 1.2.0 publié (livrable reconstruit identique octet pour octet) ; `sources/build.py` réécrit.
- Nouveau `tests/test_parcours.py` (Playwright pour Python, Edge) : menu commun, création de base, saisie d'actifs, version, rattachement, publication enrichie (18 contrôles).
- `tests/captures.py` régénère les captures du guide (`docs/captures/`) depuis la base DEMO ; menu latéral élargi à 232 px.

## [1.2.0] — 2026-10

Intégration à l'environnement WerbSMSI (charte 1.0), module **Inventaires ICS** au niveau site.

### Ajouts
- Onglet **Administration › Intégration WerbSMSI** : choix de l'espace `SMSI_<GROUPE>`, rattachement de la base à un site, nom publié et **SL-T** de chaque zone de sécurité, aperçu des conduits déduits de la matrice de flux, bouton **Publier**.
- Publication dans `sites/<CODE>/publications/werbmap.json` : zones (SL-T, criticité), conduits entre zones, actifs (TAG, type, zone, libellé, criticité). Ni adresse IP, ni VLAN, ni numéro de série. Publication réservée aux éditeurs, base enregistrée, tracée au journal.
- `module.json`, `SECURITY.md`, empreinte `WerbMap.sha256`, `sources/src/signature.js`, `socle.js` 1.1.0 de la charte.
- Assemblage `sources/build.py` (Python seul) vers `application/WerbMap.html`.
- Test de parcours `tests/test_parcours.py` (Playwright pour Python, Edge installé) : 28 contrôles.

### Changements
- `src/` devient `sources/src/`, `exemple/` devient `exemples/`. Le livrable est `application/WerbMap.html`.
- Extension suggérée des nouvelles bases : `.werbmap.json`.
- La version affichée vient de `signature.js` ; `meta generator` porte la version.
- L'import Excel conserve le rattachement WerbSMSI et les SL-T des zones.
- README réorganisé selon le plan de la charte WerbSMSI.

### Sécurité
- **Rien n'est plus conservé dans le navigateur** : suppression des brouillons automatiques en `localStorage` (ils contenaient toutes les données et les empreintes des mots de passe), de la mémorisation de la dernière base et du modèle Excel personnel en IndexedDB, et des préférences de menu. Les modifications non enregistrées restent en mémoire ; un brouillon peut être téléchargé à la fermeture.
- Les données laissées par WerbMap 1.1 ou antérieur sont effacées à l'ouverture. La purge ne touche pas les autres modules WerbSMSI.
- Politique de sécurité du contenu (CSP) : `default-src 'none'`, sans `'unsafe-eval'`.

### Format de données
- **Schéma 4** : enveloppe WerbSMSI, format `WERBMAP`. `data` contient `version`, `savedAt`, `savedBy`, `comptes`, `inventaire`, `versions`, `journal` ; `integrite` reprend les deux dernières empreintes ; `meta.portee`, `meta.site`, `meta.groupeId` pour une base rattachée.
- Inventaire, comptes et journal sont repris tels quels : la **chaîne d'intégrité** des bases existantes reste valable.
- Les bases `werbhat-vlan-ipam` (schéma 3) restent lues et passent au schéma 4 au prochain enregistrement.
- Base de démonstration renommée `exemples/WerbMap_DEMO.werbmap.json` et convertie au schéma 4 (intégrité des 4 versions vérifiée).

### Suppressions
- Bouton « 🔁 Rouvrir » (dernière base mémorisée) et restauration des brouillons à la connexion.

## [1.1.0] — 2026-10

Intégration du menu latéral et des onglets de routage.

### Fonctionnalités
- **Menu latéral par catégories** : Pilotage, Réseau & adressage, Inventaires, Licences & contrats, Routage & filtrage, Certificats & PKI, Maintien opérationnel, Maintien en sécurité, Documentation, Administration.
- Catégories **Licences & contrats** (onglet Licences), **Certificats & PKI** (onglet Certificats), **Maintien opérationnel** (onglet MCO) et **Maintien en sécurité** (onglet Mises à jour OS) : onglets en préparation, sans saisie. Leurs champs seront alignés sur les classeurs Excel de référence. Chaque catégorie se replie, et le bouton **☰** masque le menu. Ces choix sont mémorisés sur le poste.
- Nouvel onglet **Routes** : une ligne par route (destination, masque ou CIDR, `default`, passerelle, interface, métrique, persistance, état), rattachée à une machine physique ou virtuelle. Le CIDR et le VLAN de destination sont calculés.
- Nouvel onglet **NAT** : type (SNAT, DNAT, PAT, masquerade, 1:1), protocole, interfaces, adresses et ports d'origine et traduits, état, rattachés à une machine physique ou virtuelle.
- Filtre **par actif** et pré-remplissage de l'actif à l'ajout d'une ligne.
- Colonne **Routes / NAT** dans les onglets Machines physiques et Machines virtuelles.
- Renommer le TAG d'une machine met à jour ses routes et ses règles NAT. Supprimer une machine prévient si des lignes y sont rattachées.
- Contrôles de cohérence : actif absent des machines, destination ou masque invalide, route en double, passerelle hors des réseaux de l'actif, adresse NAT non reconnue, NAT sans adresse traduite.
- Nouvelle liste de choix **Types de NAT** dans les Référentiels.
- Tableau de bord : compteurs Routes et Règles NAT.
- Export **Classeur simple** : feuilles `Routes` et `NAT`, réimportables.

- **Cadre de procédures SMSI** (catégorie *Procédures SMSI*) :
  - **Catalogue des procédures** : code, titre, domaine, version, statut (Brouillon, En revue, Validée, Obsolète), propriétaire, approbateur, date de validation, prochaine revue et fréquence, objet, domaine d'application, références, déclencheurs, lien vers le document SMSI.
  - **Fiches de procédure** : étapes rattachées à une procédure, avec phase, section, responsable, moyens, preuve attendue et lien.
  - Présentation **par phase** (étapes regroupées, ordre modifiable par ▲ ▼) et présentation **rédigée** (document SMSI numéroté), exportable en **Word (.doc)** et en PDF.
  - Modèles prêts à adapter : PLM, Mise à jour des systèmes (OS et firmware), Certificats, Licences, MCO, procédure vierge.
  - Contrôles : procédure sans code, en double ou sans étape, validée sans approbateur, revue échue ou non planifiée, étapes sans responsable.
  - Référentiels **Rôles** et **Domaines de procédure**. Compteur « Procédures validées » au tableau de bord.
  - Export simple : feuilles `Procedures` et `Procedures_Etapes` (remplacent `MATRICE PLM`), réimportables.

### Changements
- La « Procédure – matrice PLM » devient la procédure `PRO-PLM-001` du catalogue. Les étapes existantes y sont rattachées automatiquement à l'ouverture d'une base 1.0.
- L'import de la feuille `MATRICE PLM` ne remplace plus une procédure PLM modifiée dans la base.
- **Anonymisation du kit** : le modèle Excel intégré, le modèle vierge et les fichiers DEMO ne contiennent plus de noms de sites ou d'organisation, ni de métadonnées d'auteur, de tenant, d'étiquette de sensibilité ou de bibliothèque SharePoint. La macro VBA propre à un site et son bouton ont été retirés du modèle fourni (les macros des modèles personnels restent conservées à l'export).
- La colonne de la matrice de flux devient **LIAISON INTERCO**. Un en-tête suivi d'un complément (par exemple `LIAISON INTERCO <site>`) reste reconnu, à l'import comme à l'export dans un modèle personnel.
- Le modèle intégré s'appelle `Modele_vierge_Base_Inventaires_actifs.xlsm`.
- Captures d'écran du README régénérées (menu latéral).

### Corrections
- L'import d'un export simple ne demande plus de choisir entre « TableIP_VLAN » et « Journal » : les feuilles de rapport (Anomalies, Versions, Journal, Informations) sont ignorées par la détection.
- Les onglets horizontaux sont remplacés par le menu latéral. Les onglets existants ne changent pas.
- L'import d'un classeur sans feuilles `Routes` / `NAT` (par exemple le classeur modèle) **conserve** les routes et le NAT de la base.

### Compatibilité
- Les bases 1.0 s'ouvrent sans conversion, avec des listes Routes et NAT vides.
- ⚠ Une base enregistrée en 1.1 puis réenregistrée avec WerbMap 1.0 perd ses routes, son NAT et son catalogue de procédures (les étapes sont conservées). Il faut passer tous les postes en 1.1.
- Le classeur modèle `.xlsm` n'a pas de feuilles Routes et NAT. Ces données ne sont donc pas exportées par « Remplir mon classeur modèle ».

## [1.0.0] — 2026-10

Première version publiée sous le nom **WerbMap**.

### Fonctionnalités
- Matrice VLAN 100-499 avec criticité par plage et statut par case (en service, réservé, en cours).
- Réseaux isolés hors plages (VLAN 1…), reportés automatiquement dans la Table IP VLAN.
- Table IP VLAN générée automatiquement : CIDR, masque, passerelle, broadcast, plage d'hôtes, taux d'occupation.
- Plan IP avec prochaine IP libre, contrôle des doublons et des adresses hors réseau.
- Inventaires : coffrets, actifs réseau, machines physiques et virtuelles. Matrice de flux avec export CSV par pare-feu. Procédure PLM.
- Tri A→Z / Z→A sur toutes les colonnes et filtre par ID VLAN.
- Contrôles de cohérence (chevauchements, doublons, TAG inconnus, conventions de nommage).
- Base partagée en JSON sur SharePoint synchronisé, avec détection des conflits et brouillons locaux.
- Comptes et rôles (Administrateur, Éditeur, Lecteur), verrouillage après inactivité.
- Versions numérotées, journal champ par champ, chaîne d'intégrité SHA-256.
- Import Excel par reconnaissance des en-têtes (feuilles `VLAN-xxx`, choix du site).
- Export dans le classeur modèle `.xlsm` (mise en forme, tableaux, formules et macros conservés), export simple `.xlsx`, impression PDF.

### Changements
- Renommage de « Base Inventaires Actifs » en **WerbMap** (titre, en-têtes, exports, icône).
- Les nouvelles bases sont proposées sous le nom `WerbMap_SITE.json`.
- Le format interne des bases est inchangé : les bases existantes restent compatibles.
