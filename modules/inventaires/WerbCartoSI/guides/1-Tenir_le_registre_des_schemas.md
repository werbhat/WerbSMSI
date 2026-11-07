<!-- WerbCartoSI – Développé par @WerbHat -->
# Tenir le registre des schémas d'architecture

Un auditeur NIS2, ISO 27001 ou IEC 62443 pose toujours les mêmes questions : **avez-vous un schéma de votre architecture ? est-il à jour ? qui l'a validé ? montrez-le-moi.** Un schéma qui existe mais que personne ne retrouve, ou dont la dernière version date de cinq ans, ne prouve rien. Et le jour d'un incident, c'est ce schéma que l'équipe ouvrira en premier.

WerbCartoSI tient le **registre** des schémas d'un site. Il ne dessine pas : les schémas restent dans leurs fichiers (Visio, PDF…) ; le registre dit **ce qu'ils démontrent, qui en répond, quand ils ont été revus, et où ils sont**.

## 1. Le principe : un schéma, une fiche, une ou plusieurs exigences

| Notion | Ce que c'est | Exemple |
|---|---|---|
| **Type de schéma** | Sa nature | Réseau logique, zones et conduits, architecture d'administration |
| **Catégorie d'exigence** | Ce qu'il permet de démontrer | « Zones et conduits » (IEC 62443-3-2), « Cartographie du SI » (NIS2, ISO A.5.9) |
| **Couverture** | L'exigence a-t-elle au moins un schéma approuvé et revu à temps ? | Couverte, à revoir, en cours, non couverte |

Un même schéma peut couvrir plusieurs exigences : un schéma des zones et conduits sert aussi la cartographie du SI.

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

Un schéma qui n'a plus lieu d'être : **Obsolète** (il reste visible et tracé) ou **archivage** (*Liste à plat*, sélection, 🗄 Archiver : il sort du registre, son identifiant n'est jamais réattribué).

## 6. Suivre et prouver

- Le **tableau de bord** liste les points d'attention : exigence non couverte, schéma sans propriétaire, sans lien, introuvable dans l'espace, revue dépassée.
- *Couverture des exigences* donne, pour chaque catégorie, l'état et les schémas qui la couvrent, avec les **repères** (articles NIS2, mesures ISO, exigences IEC 62443) qui la demandent.
- **📤 Publier la couverture** (*Intégration WerbSMSI*) : le portail affiche alors, pour le site et pour le groupe, les exigences couvertes par des schémas. Seules des métadonnées sont publiées (titres, versions, dates), jamais l'emplacement des fichiers ni la description de l'architecture. Quand la couverture change, le module signale qu'il faut publier à nouveau. La fiche SI de WerbMap affiche les schémas de chaque SI, et l'audit NIS2 du site (WerbNIS2) les propose comme preuves des points de cartographie, de cloisonnement, de filtrage, d'administration, d'accès distants, de continuité et d'accès physiques.
- **📊 Export Excel** : couverture des exigences, schémas par exigence, liste complète. C'est la preuve à fournir en audit ou à verser dans WerbNIS2 et WerbIEC62443. Le classeur décrit l'architecture du site : rangez-le avec les mêmes droits que les schémas.

## Bonnes pratiques

- **Un nom de fichier qui porte l'identifiant** : `SCH-012_Reseau_logique_L2_v1.3.vsdx`. On retrouve la fiche depuis le fichier, et l'inverse.
- **Un cartouche dans chaque schéma** : titre, site, version, date, classification, propriétaire. Un schéma imprimé ou copié garde ainsi son contexte.
- **Pas de secret dans un schéma** : ni mot de passe, ni clé, ni configuration complète. Les adresses et les noms d'équipements suffisent.
- **Revoir après chaque changement** : un nouvel équipement, un nouveau flux ou une nouvelle interconnexion rendent le schéma faux, donc dangereux en cas d'incident.
- **Dessiner à partir de l'inventaire** : les actifs, zones, VLAN et flux de WerbMap sont la source ; le schéma les représente, il ne les remplace pas.
