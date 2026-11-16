<!-- WerbCartoSI – Développé par @WerbHat -->
# Tenir le registre des schémas d'architecture

Un auditeur NIS2, ISO 27001 ou IEC 62443 pose toujours les mêmes questions : **avez-vous un schéma de votre architecture ? est-il à jour ? qui l'a validé ? montrez-le-moi.** Un schéma qui existe mais que personne ne retrouve, ou dont la dernière version date de cinq ans, ne prouve rien. Et le jour d'un incident, c'est ce schéma que l'équipe ouvrira en premier.

WerbCartoSI tient le **registre** des schémas d'un site. Il ne dessine pas : les schémas restent dans leurs fichiers (Visio, PDF…) ; le registre dit **ce qu'ils démontrent, qui en répond, quand ils ont été revus, et où ils sont**.

## 1. Le principe : un schéma, une fiche, une ou plusieurs exigences

| Notion | Ce que c'est | Exemple |
|---|---|---|
| **Type de schéma** | Sa nature | Réseau logique, zones et conduits, architecture d'administration |
| **Catégorie d'exigence** (code `EX-…`) | Ce qu'il permet de démontrer | `EX-ZONES` « Zones et conduits » (NIS2 CLOISONNEMENT, IEC 62443-3-2), `EX-CARTO` « Cartographie du SI » (NIS2 CARTOGRAPHIE.a, ISO/IEC 27001 A.5.9) |
| **Couverture** | L'exigence a-t-elle au moins un schéma approuvé et revu à temps ? | Couverte, à revoir, en cours, non couverte |

**EX = exigence** : `EX-ZONES` se lit « exigence : zones et conduits ». Ce n'est ni un exemple, ni un numéro de schéma (les schémas sont numérotés `SCH-001`…).

Un même schéma peut couvrir plusieurs exigences : un schéma des zones et conduits sert aussi la cartographie du SI. Ce que chaque catégorie attend, avec un exemple annoté : [Les schémas attendus, un par un](3-Les_schemas_attendus_un_par_un.md).

Les catégories d'exigence et les types sont des **listes de choix du groupe** : le RSSI les ajuste une fois dans le portail (*Administration › Listes de choix du groupe*), tous les sites parlent le même langage. Chaque site peut ajouter ses propres valeurs.

## 2. Mettre en place

1. **Ouvrir l'espace et rattacher la base au site** (*⚙️ Base › Intégration WerbSMSI*). Ranger la base dans `sites/<CODE>/inventaires/`.
2. **Créer le dossier des schémas** (bouton 📁 de la même page) : `sites/<CODE>/inventaires/schemas/`. Il hérite des droits du dossier du site : seule l'équipe du site y accède.
3. **Déclarer la racine de l'espace** (*Référentiels et paramètres*), par exemple `S:\SMSI_GROUPE` ou `\\serveur\partage\SMSI_GROUPE`. Le navigateur ne connaît pas l'emplacement du dossier sur le disque : cette racine permet au module de reconstituer le chemin complet de chaque fichier.
4. **Fixer la fréquence de revue** par défaut (12 mois proposés).

## 3. Enregistrer un schéma

Deux façons de commencer : **depuis un modèle** (*Modèles de schémas* › ▶ Créer un schéma : le fichier Visio est créé, cartouche rempli, et la fiche est pré-remplie — voir le guide [Préparer les modèles de schémas](2-Preparer_les_modeles_de_schemas.md)), ou pour un schéma qui existe déjà, *Registre des schémas* › **➕ Schéma**, puis la fiche :

- **Identification** : titre, type, format, **classification** (un schéma d'architecture est presque toujours en *Diffusion restreinte* ou *Confidentiel*), objet, périmètre.
- **Exigences couvertes** : cochez ce que le schéma démontre.
- **Responsabilités** : le **propriétaire** (la fonction qui répond du schéma) et le **responsable de la mise à jour**.
- **Cycle de vie** : version, statut, dates de création, de dernière revue et d'approbation, prochaine revue (calculée ou saisie).
- **Fichier** :
  - *dans l'espace SMSI du site* (recommandé) : **📁 Choisir dans le dossier des schémas** propose les fichiers rangés ; le module **vérifie leur présence** et **📋 copie le chemin complet**, à coller dans la barre d'adresse de l'Explorateur pour ouvrir le fichier dans Visio ;
  - *adresse web* (SharePoint, OneDrive, Git) : **🌐 Ouvrir** dans un nouvel onglet ;
  - *chemin réseau* : **📋** copie le chemin.

> Un navigateur ne peut pas lancer Visio directement sur un fichier du disque : c'est pourquoi le module copie le chemin complet plutôt que d'ouvrir le fichier.

## 4. Lier le schéma à l'inventaire WerbMap

Quand l'espace est ouvert et que le site a publié son inventaire depuis WerbMap, la fiche propose un **Périmètre WerbMap** : cochez les **SI**, les **zones** et, si besoin, les **actifs** (par leur TAG) que le schéma représente.

- *Couverture des exigences* montre alors la **couverture de chaque SI** : un SI sans schéma approuvé est signalé au tableau de bord. C'est la question que pose l'auditeur : « montrez-moi le schéma de ce système ».
- Si un SI, une zone ou un actif disparaît de WerbMap (renommé ou retiré), la fiche le signale : le schéma est probablement à revoir.
- Les données reçues sont copiées dans la base : la fiche reste lisible sans l'espace.

## 5. Approuver et revoir

| Statut | Signification |
|---|---|
| Brouillon | En cours de dessin |
| En validation | Soumis au propriétaire ou au RSSI |
| **Approuvé** | Validé : l'**approbateur** (fonction) est obligatoire, la date d'approbation est posée au jour |
| Obsolète | Remplacé ou plus valable : il sort de la couverture, la fiche reste pour la trace |

À chaque **revue** (une fois par an au moins, et après tout changement d'architecture) : vérifiez le schéma, mettez à jour la **version** et la **date de revue**, et l'**approbation** si le schéma a changé. Un schéma approuvé dont la revue est dépassée passe « à revoir » : l'exigence qu'il couvre n'est plus démontrée.

Deux boutons de la fiche tiennent l'**historique des versions** :

- **✔ Revue faite, sans changement** : le schéma a été vérifié et reste juste ; la date de revue passe au jour, la prochaine revue est recalculée.
- **📌 Nouvelle version…** : le schéma a changé ; saisissez la nouvelle version (proposée) et la **nature du changement**. Un schéma approuvé repasse en **brouillon** : l'exigence qu'il couvre n'est plus démontrée tant que la nouvelle version n'est pas approuvée.

Chaque approbation y est aussi inscrite, avec l'approbateur. L'auditeur voit ainsi qui a validé quelle version, et quand.

**Approuver, c'est contrôler.** Passer le statut à *Approuvé* ouvre la liste des contrôles avant approbation (cartouche, légende, TAG, chemins interdits, exceptions, aucun secret, comparaison au terrain, exigences ; détail au guide [Les schémas attendus, un par un](3-Les_schemas_attendus_un_par_un.md), §11). Les huit sont exigés ; ils sont gardés dans l'historique avec l'approbation.

**Le fichier approuvé est figé par son empreinte.** À l'approbation, le module calcule l'empreinte SHA-256 du fichier rangé dans l'espace (pour un schéma sur SharePoint ou sur un partage : 📂 *Relever depuis un fichier du poste*). Si le fichier change ensuite sans nouvelle version, le schéma passe *à revoir* : le schéma montré en audit ne serait plus celui qui a été approuvé. Deux sorties : 📌 *Nouvelle version* si le dessin a changé, *Approuver à nouveau* si la modification est mineure (avec les contrôles). La revue « sans changement » est alors refusée.

**WerbMap déclenche la revue.** À l'approbation et à chaque revue, le module prend un **instantané** du périmètre du schéma dans WerbMap : les actifs qu'il représente (liés, des SI liés, des zones liées) et les conduits entre zones qui les touchent. Quand WerbMap publie un actif ou un conduit ajouté ou retiré, le schéma passe *à revoir* et la fiche liste les écarts. Si le schéma reste juste, ✔ *Revue faite* (l'instantané est repris, les écarts examinés sont tracés) ; sinon 📌 *Nouvelle version*.

**Préparer les revues.** *📊 Pilotage › Échéances* liste les revues des schémas et des non-applicabilités : en retard, dans les 30 à 180 jours, au-delà. Le menu signale celles à moins de 30 jours.

Un schéma qui n'a plus lieu d'être : **Obsolète** (il reste visible et tracé) ou **archivage** (*Liste à plat*, sélection, 🗄 Archiver : il sort du registre, son identifiant n'est jamais réattribué).

## 6. Couverture par SI et exigences non applicables

Une exigence couverte « quelque part » ne suffit pas : l'auditeur choisit un système et demande **son** schéma. *Couverture des exigences › Couverture par SI* croise les SI publiés par WerbMap et les exigences.

**Quelles exigences sont attendues pour un SI ?** Chaque catégorie a une **portée**, réglable dans *Référentiels et paramètres* :

| Portée | Signification | Par défaut |
|---|---|---|
| **Chaque SI** | Un schéma par SI | `EX-CARTO` |
| **Les SI sensibles** | Un schéma pour chaque SI sensible | `EX-ZONES`, `EX-FLUX`, `EX-ADMIN`, `EX-REPRISE` |
| **Le site (une fois)** | Un schéma pour tout le site, hors tableau par SI | `EX-RESEAU`, `EX-ACCES`, `EX-LOCAUX` |

Un SI est **sensible** quand WerbMap le dit : D, I ou C au seuil (3 par défaut, réglable), un actif dans une zone *process* ou *métier critique* (ou de SL-T 2 et plus), ou un actif critique. Un SI que WerbMap n'a pas encore coté en D, I, C est traité comme sensible, par prudence : cotez-le dans WerbMap.

**Quand une case est-elle couverte ?** Un schéma approuvé et revu à temps vise l'exigence **et** il est lié au SI, ou à une zone où le SI a des actifs (fiche du schéma › *Périmètre WerbMap*). Une case « ✕ Absent » est un schéma à produire, ou un schéma existant qu'il faut lier. Le tableau de bord le signale.

**Non applicable, justifié.** Certaines exigences ne concernent pas le site, ou un SI : pas d'accès distant, pas de local technique propre, un SI administré uniquement en local. Ne laissez pas l'exigence « non couverte » : déclarez-la **non applicable** (bouton *Non applicable…* de l'exigence, ou d'une case du tableau par SI). Trois éléments sont exigés, ceux qu'un auditeur attend :

1. la **justification**, écrite pour être relue par quelqu'un qui ne connaît pas le site ;
2. la **fonction** qui décide (RSSI du site, direction du site), pas un nom ;
3. la **date** de la décision.

La décision se **revoit** comme un schéma (même fréquence) : *✔ Revue faite* confirme qu'elle reste vraie ; un changement d'architecture (nouvel accès distant, nouvelle salle) peut la rendre fausse, retirez-la alors. Les exigences non applicables sortent du décompte des exigences couvertes, sont publiées avec leur justification et sont proposées dans WerbNIS2 comme élément de preuve.

> Non applicable n'est pas « pas encore fait ». Une exigence qui s'applique mais n'a pas de schéma reste non couverte : c'est un écart à traiter, pas à masquer.

## 7. Suivre et prouver

- Le **tableau de bord** liste les points d'attention : exigence non couverte, schéma sans propriétaire, sans lien, introuvable dans l'espace, revue dépassée.
- *Couverture des exigences* donne, pour chaque catégorie, l'état et les schémas qui la couvrent, avec les **repères** (articles NIS2, mesures ISO, exigences IEC 62443) qui la demandent.
- **📤 Publier la couverture** (*Intégration WerbSMSI*) : le portail affiche alors, pour le site et pour le groupe, les exigences couvertes par des schémas. Seules des métadonnées sont publiées (titres, versions, dates), jamais l'emplacement des fichiers ni la description de l'architecture. Quand la couverture change, le module signale qu'il faut publier à nouveau. La fiche SI de WerbMap affiche les schémas de chaque SI, et l'audit NIS2 du site (WerbNIS2) les propose comme preuves des points de cartographie, de cloisonnement, de filtrage, d'administration, d'accès distants, de continuité et d'accès physiques.
- **📊 Export Excel** : couverture des exigences, schémas par exigence, liste complète. C'est la preuve à fournir en audit ou à verser dans WerbNIS2 et WerbIEC62443. Le classeur décrit l'architecture du site : rangez-le avec les mêmes droits que les schémas.

### Matrice des flux et dossier de preuve

- Un schéma de flux montre les conduits ; l'auditeur demande aussi **chaque flux** : source, destination, port, qui le filtre, pourquoi. La fiche d'un schéma `EX-FLUX` ou `EX-ZONES` reprend en **annexe** les règles de la matrice de flux de WerbMap qui touchent son périmètre, et signale celles à examiner : flux entre zones sans pare-feu, sans justification, règle « any ». Corrigez-les dans WerbMap, publiez, puis 📊 *Annexe Excel* pour joindre la matrice au schéma.
- *📊 Pilotage › Dossier de preuve* rassemble tout pour l'audit : une page par catégorie d'exigence, avec l'objectif, les repères, la décision de non-applicabilité, les schémas (approbation, contrôles, empreinte), la couverture par SI et la matrice des flux. 🖨 *Imprimer / PDF* ; le jour de l'audit, ouvrez les schémas depuis leur fichier : l'empreinte montre que c'est la version approuvée.

## Bonnes pratiques

- **Un nom de fichier qui porte l'identifiant** : `SCH-012_Reseau_logique_L2_v1.3.vsdx`. On retrouve la fiche depuis le fichier, et l'inverse.
- **Un cartouche dans chaque schéma** : titre, site, version, date, classification, propriétaire. Un schéma imprimé ou copié garde ainsi son contexte.
- **Pas de secret dans un schéma** : ni mot de passe, ni clé, ni configuration complète. Les adresses et les noms d'équipements suffisent.
- **Revoir après chaque changement** : un nouvel équipement, un nouveau flux ou une nouvelle interconnexion rendent le schéma faux, donc dangereux en cas d'incident.
- **Dessiner à partir de l'inventaire** : les actifs, zones, VLAN et flux de WerbMap sont la source ; le schéma les représente, il ne les remplace pas.
