<!-- WerbIEC62443 – Développé par @WerbHat -->
## Référentiel de cybersécurité des systèmes d'automatisation et de contrôle industriels

**Version du document :** 1.0  
**Référentiel principal :** série IEC 62443  
**Domaine :** cybersécurité industrielle, OT, ICS, SCADA et systèmes de contrôle-commande  
**Public cible :** RSSI, responsables OT, automaticiens, intégrateurs industriels, exploitants, fabricants, auditeurs et responsables de la continuité des opérations.

---

## Sommaire

1. Introduction générale
2. Vue d'ensemble de la série IEC 62443
3. Principes fondamentaux de la cybersécurité industrielle
4. IEC 62443-1-x : concepts, terminologie et modèles
5. IEC 62443-2-x : programmes de sécurité et prestataires
6. IEC 62443-3-2 : analyse des risques industriels
7. IEC 62443-3-3 : exigences de sécurité des systèmes
8. Les niveaux de sécurité SL 1 à SL 4
9. IEC 62443-4-x : sécurité des produits industriels
10. Architecture industrielle : zones et conduits
11. Mesures opérationnelles de cybersécurité OT
12. Gestion des incidents industriels
13. Documentation et preuves attendues
14. Méthodologie de mise en œuvre
15. Préparation à un audit IEC 62443
16. Correspondance avec ISO/IEC 27001, NIS2, LPM et ANSSI
17. Exemple pratique : sécurisation d'un système industriel
18. Glossaire
19. Conclusion

---

# 1. Introduction générale

## 1.1 Objectif du guide

La série IEC 62443 constitue un ensemble de normes et de documents techniques destinés à améliorer la cybersécurité des systèmes d'automatisation et de contrôle industriels.

Elle s'applique notamment aux environnements industriels dans lesquels des équipements informatiques et électroniques pilotent ou supervisent des processus physiques.

Ces environnements peuvent être présents dans :

- l'industrie manufacturière ;
- les secteurs de l'énergie et de l'eau ;
- la chimie et la pétrochimie ;
- les transports ;
- l'agroalimentaire ;
- les bâtiments automatisés ;
- les infrastructures critiques ;
- les installations de production et de distribution.

L'objectif de ce guide est de présenter les principaux documents de la série IEC 62443, leurs domaines d'application, les concepts techniques essentiels et les démarches permettant de les mettre en œuvre.

Il fournit notamment un cadre de travail pour :

- identifier les actifs industriels ;
- analyser les risques cyber ;
- segmenter les réseaux industriels ;
- déterminer les niveaux de sécurité cibles ;
- définir les exigences applicables aux systèmes ;
- sécuriser les équipements et les logiciels ;
- organiser la maintenance et les interventions ;
- préparer les audits et évaluations de conformité.

Ce document est une synthèse pratique. Il ne remplace pas les éditions officielles des normes.

## 1.2 Qu'est-ce que la cybersécurité industrielle ?

La cybersécurité industrielle consiste à protéger les systèmes, les équipements, les communications et les processus numériques qui participent au fonctionnement d'une installation industrielle.

Contrairement à un système informatique bureautique classique, un système industriel interagit souvent directement avec des équipements physiques : moteurs, pompes, vannes, capteurs, robots, chaînes de production ou systèmes de régulation.

Une compromission peut donc avoir des conséquences sur :

- la disponibilité d'une ligne de production ;
- la qualité d'un produit ;
- l'intégrité d'un procédé ;
- la sécurité des personnes ;
- l'environnement ;
- la continuité d'un service essentiel ;
- les équipements industriels eux-mêmes.

La cybersécurité OT doit être conçue en tenant compte des contraintes du procédé, de la sûreté de fonctionnement et des exigences de production.

## 1.3 Qu'est-ce qu'un IACS ?

IACS signifie _Industrial Automation and Control System_, ou système d'automatisation et de contrôle industriels.

Un IACS ne se limite pas à un automate programmable. Il englobe les éléments techniques, humains et organisationnels nécessaires au contrôle et à la supervision d'un procédé industriel.

Exemples de composants :

- automates programmables industriels (PLC ou API) ;
- systèmes SCADA ;
- systèmes DCS de contrôle distribué ;
- interfaces homme-machine (HMI ou IHM) ;
- capteurs et actionneurs intelligents ;
- stations d'ingénierie ;
- serveurs d'historisation ;
- réseaux industriels ;
- passerelles de communication ;
- postes de maintenance ;
- systèmes de supervision et de gestion technique.

L'environnement étudié doit inclure les dépendances pertinentes, les utilisateurs, les procédures et les services nécessaires à l'exploitation.

## 1.4 Particularités de l'environnement OT

|Critère|Informatique IT classique|Environnement OT|
|---|---|---|
|Priorité dominante|Confidentialité, intégrité et disponibilité selon le contexte.|Disponibilité, intégrité du procédé et sécurité des opérations, sans négliger la confidentialité.|
|Cycle de vie|Renouvellement généralement plus fréquent.|Équipements pouvant rester en service pendant de nombreuses années.|
|Mises à jour|Déploiements relativement fréquents selon les politiques internes.|Mises à jour parfois contraintes par les arrêts de production et la validation industrielle.|
|Tolérance aux interruptions|Variable selon les services.|Souvent très faible pour les fonctions critiques.|
|Protocoles|Protocoles IT courants et services applicatifs.|Protocoles industriels spécialisés, parfois anciens ou peu sécurisés.|
|Conséquences d'un incident|Perte de données, indisponibilité, fraude ou divulgation.|Conséquences informatiques, opérationnelles, physiques ou environnementales.|
|Validation des changements|Tests et procédures de déploiement.|Tests tenant compte du procédé, de l'automatisme et des contraintes de sûreté.|

Cette distinction est indicative. Les priorités exactes dépendent du système et de son contexte opérationnel.

## 1.5 Objectifs d'une démarche IEC 62443

Une démarche fondée sur IEC 62443 vise notamment à :

1. Maîtriser les risques de cybersécurité affectant les systèmes industriels.
2. Définir une gouvernance adaptée aux activités OT.
3. Organiser la segmentation des architectures industrielles.
4. Déterminer les exigences de sécurité nécessaires à chaque zone.
5. Réduire les possibilités d'accès non autorisé.
6. Encadrer les fournisseurs, les intégrateurs et les mainteneurs.
7. Sécuriser le cycle de vie des produits industriels.
8. Améliorer la détection et la gestion des incidents.
9. Maintenir la sécurité pendant toute la durée de vie des installations.

---

# 2. Vue d'ensemble de la série IEC 62443

## 2.1 Organisation générale

La série IEC 62443 est organisée en plusieurs groupes de documents couvrant les concepts généraux, les programmes de sécurité, les exigences applicables aux systèmes et les exigences applicables aux composants.

Les quatre grands ensembles à retenir sont :

- **IEC 62443-1-x :** concepts, terminologie et modèles ;
- **IEC 62443-2-x :** programmes de sécurité, exploitation et prestataires ;
- **IEC 62443-3-x :** analyse des risques et exigences de sécurité des systèmes ;
- **IEC 62443-4-x :** développement sécurisé et exigences techniques des composants.

Chaque document a un objectif spécifique. Il convient de vérifier son statut exact : norme internationale, spécification technique, rapport technique ou document en cours d'élaboration.

## 2.2 Principaux documents

|Document|Objet principal|Utilisation|
|---|---|---|
|IEC TS 62443-1-1|Terminologie, concepts et modèles|Comprendre les notions fondamentales de sécurité industrielle.|
|IEC 62443-1-2|Glossaire maître de la série, publié sous forme de rapport technique|Harmoniser la terminologie.|
|IEC TR 62443-1-3|Métriques de conformité de sécurité des systèmes|Examiner des approches de mesure de la conformité.|
|IEC TR 62443-1-4|Cycle de vie et cas d'utilisation|Comprendre certains modèles de cycle de vie et scénarios d'utilisation.|
|IEC TS 62443-1-5|Schéma des profils de sécurité IEC 62443|Structurer des profils de sécurité spécifiques.|
|IEC 62443-2-1|Programme de sécurité du propriétaire d'actifs|Organiser le programme de cybersécurité industrielle.|
|IEC TR 62443-2-2|Dispositif de protection de la sécurité IACS|Apporter des orientations relatives au dispositif de protection.|
|IEC TR 62443-2-3|Gestion des correctifs en environnement IACS|Encadrer le processus de gestion des correctifs.|
|IEC 62443-2-4|Exigences de programme de sécurité des prestataires de services IACS|Évaluer et encadrer les intégrateurs et mainteneurs.|
|IEC TR 62443-3-1|Technologies de sécurité des systèmes IACS|Examiner les technologies de sécurité applicables.|
|IEC 62443-3-2|Appréciation des risques pour la conception du système|Définir le périmètre, les zones, les conduits et les niveaux de sécurité cibles.|
|IEC 62443-3-3|Exigences de sécurité des systèmes et niveaux de sécurité|Définir les exigences applicables à un système industriel.|
|IEC 62443-4-1|Exigences du cycle de développement sécurisé des produits|Évaluer les processus de développement des fabricants.|
|IEC 62443-4-2|Exigences techniques de sécurité des composants IACS|Évaluer les capacités de sécurité des produits.|

**Point de vigilance :** les éditions et statuts peuvent différer entre les publications IEC et les publications nationales ou ISA. Par exemple, ANSI/ISA-62443-2-1:2024 est une édition publiée par ISA ; il ne faut pas lui attribuer automatiquement le même statut ou la même date qu'une publication IEC. Les catalogues officiels doivent être consultés pour vérifier les versions applicables.

## 2.3 Choisir les normes selon le besoin

|Besoin|Documents à examiner en priorité|
|---|---|
|Construire un programme de cybersécurité OT|IEC 62443-2-1|
|Encadrer un prestataire de maintenance industrielle|IEC 62443-2-4|
|Analyser les risques d'une installation|IEC 62443-3-2|
|Définir les exigences techniques d'un système|IEC 62443-3-3|
|Sécuriser un automate ou un composant industriel|IEC 62443-4-2|
|Évaluer le développement sécurisé d'un produit|IEC 62443-4-1|
|Organiser une architecture par zones et conduits|IEC 62443-3-2, complétée par IEC 62443-3-3|
|Organiser les correctifs industriels|IEC TR 62443-2-3 et les exigences pertinentes du programme de sécurité|
|Mettre en place une gouvernance industrielle globale|Plusieurs documents des séries 2-x, 3-x et 4-x selon le périmètre|

## 2.4 Les trois catégories d'acteurs

La série 62443 distingue des rôles qui ont des responsabilités complémentaires.

### Propriétaire d'actifs (_Asset Owner_)

Il exploite l'installation ou en porte la responsabilité.

Ses responsabilités peuvent comprendre :

- définir les objectifs de sécurité ;
- identifier les risques ;
- financer les mesures ;
- définir les règles d'exploitation ;
- encadrer les fournisseurs ;
- gérer les incidents ;
- maintenir les protections pendant le cycle de vie.

### Intégrateur de systèmes (_System Integrator_)

Il conçoit, assemble, configure ou met en service tout ou partie d'un système industriel.

Ses responsabilités peuvent comprendre :

- intégrer les exigences de sécurité dans l'architecture ;
- définir les zones et les conduits ;
- configurer les équipements ;
- tester les fonctions de sécurité ;
- documenter l'architecture ;
- transmettre les dossiers techniques à l'exploitant.

### Fournisseur de produits (_Product Supplier_)

Il conçoit ou commercialise des produits utilisés dans un système industriel.

Ses responsabilités peuvent comprendre :

- développer les produits selon un processus sécurisé ;
- traiter les vulnérabilités ;
- publier les informations de sécurité nécessaires ;
- fournir des mécanismes de configuration sécurisée ;
- assurer le suivi du produit pendant son cycle de vie.

Ces responsabilités doivent être précisées dans les contrats, les spécifications et les documents de projet.

---

# 3. Principes fondamentaux de la cybersécurité industrielle

## 3.1 Défense en profondeur

La défense en profondeur consiste à déployer plusieurs couches de protection complémentaires afin qu'une seule défaillance ne compromette pas l'ensemble du système.

Exemples :

- séparation des réseaux IT et OT ;
- filtrage entre les zones ;
- contrôle des accès distants ;
- authentification renforcée ;
- durcissement des systèmes ;
- surveillance des événements ;
- sauvegardes protégées ;
- procédures de réponse aux incidents.

La défense en profondeur doit être conçue selon les risques. L'accumulation de produits de sécurité sans architecture cohérente ne garantit pas une protection efficace.

## 3.2 Réduction de la surface d'attaque

La surface d'attaque regroupe les points d'entrée et les mécanismes susceptibles d'être exploités.

Sa réduction peut passer par :

- la suppression des services inutiles ;
- la restriction des ports et protocoles ;
- la limitation des accès administratifs ;
- le contrôle des connexions distantes ;
- la désactivation des comptes inutilisés ;
- la suppression des logiciels non nécessaires ;
- la maîtrise des supports amovibles ;
- la limitation des flux entre les zones.

## 3.3 Approche par les risques

IEC 62443 ne repose pas sur une configuration identique pour toutes les installations.

Les mesures doivent être déterminées à partir de l'architecture, des fonctions, des menaces, des vulnérabilités et des conséquences possibles.

Une installation de traitement d'eau, une ligne d'assemblage automobile et un système de gestion technique du bâtiment peuvent nécessiter des niveaux de protection différents.

## 3.4 Sécurité et sûreté de fonctionnement

La cybersécurité industrielle doit être coordonnée avec les activités de sûreté de fonctionnement.

Une mesure de sécurité mal conçue peut provoquer une interruption de production ou perturber un procédé.

Par exemple, un blocage réseau peut empêcher une commande nécessaire au maintien du procédé. Inversement, l'absence de filtrage peut permettre une commande non autorisée.

Les modifications doivent donc être évaluées conjointement par les responsables OT, les automaticiens, les équipes cybersécurité et les responsables de procédé.

La cybersécurité ne remplace pas les normes de sécurité fonctionnelle, telles que celles applicables aux systèmes instrumentés de sécurité.

## 3.5 Sécurité pendant tout le cycle de vie

La protection d'un système industriel doit couvrir :

1. La conception.
2. L'acquisition des équipements.
3. L'intégration.
4. La mise en service.
5. L'exploitation.
6. La maintenance.
7. La gestion des vulnérabilités.
8. Les modifications.
9. Le remplacement et la fin de vie.

Une architecture sécurisée à sa mise en service peut devenir vulnérable si les accès, les équipements ou les dépendances évoluent sans contrôle.

---

# 4. IEC 62443-1-x : concepts, terminologie et modèles

## 4.1 Objectif

Les documents de la série 1-x fournissent les concepts nécessaires à une compréhension commune de la cybersécurité industrielle.

Ils permettent de définir les rôles, les modèles de sécurité et les termes utilisés dans les autres documents de la série.

## 4.2 IEC TS 62443-1-1

Cette spécification technique présente notamment les concepts, la terminologie et les modèles fondamentaux de la série.

Les notions essentielles comprennent :

- les systèmes IACS ;
- les niveaux de sécurité ;
- les zones ;
- les conduits ;
- les fonctions fondamentales de sécurité ;
- les rôles des acteurs ;
- les modèles de sécurité industrielle.

Elle sert de base conceptuelle pour l'interprétation des autres documents.

## 4.3 IEC 62443-1-2

Ce document concerne le glossaire de la série et contribue à l'utilisation cohérente des termes.

Il est particulièrement utile lors de la rédaction de spécifications, de contrats, de rapports d'audit et de dossiers d'architecture.

## 4.4 IEC 62443-1-3 et IEC 62443-1-4

Ces documents de type rapport technique traitent respectivement de sujets tels que les métriques de conformité et certains modèles de cycle de vie ou cas d'utilisation.

Ils apportent des orientations complémentaires, mais ne doivent pas être considérés automatiquement comme des normes d'exigences applicables de la même manière que IEC 62443-3-3.

## 4.5 IEC TS 62443-1-5

Cette spécification technique définit un schéma pour élaborer des profils de sécurité IEC 62443.

Un profil permet de structurer un ensemble d'exigences adaptées à un contexte, un secteur ou un type de système.

L'utilisation d'un profil doit être associée à une définition claire de son périmètre, de ses exigences et de son mode d'évaluation.

---

# 5. IEC 62443-2-x : programmes de sécurité et prestataires

## 5.1 IEC 62443-2-1 — Programme de sécurité du propriétaire d'actifs

### Objectif

Ce document traite du programme de cybersécurité du propriétaire d'actifs industriels.

Il concerne l'organisation des activités nécessaires pour gérer la sécurité pendant l'exploitation des systèmes industriels.

Les sujets à examiner peuvent comprendre :

- la gouvernance ;
- les politiques et procédures ;
- l'organisation des responsabilités ;
- la gestion des risques ;
- la gestion des actifs ;
- la sécurité des accès ;
- la gestion des changements ;
- les vulnérabilités et les correctifs ;
- la surveillance ;
- la gestion des incidents ;
- la continuité des opérations ;
- la formation ;
- l'amélioration continue.

### Mise en œuvre pratique

Un programme de sécurité OT peut comprendre :

- une politique de cybersécurité industrielle ;
- une cartographie des systèmes ;
- une méthode d'analyse des risques ;
- des procédures de maintenance ;
- un processus de gestion des accès ;
- un processus de gestion des correctifs ;
- des règles d'intervention des prestataires ;
- un plan de réponse aux incidents ;
- des indicateurs de suivi.

Le programme doit être adapté aux risques et aux caractéristiques de l'installation.

## 5.2 IEC TR 62443-2-2 — Dispositif de protection de la sécurité IACS

Ce rapport technique apporte des orientations relatives au dispositif de protection d'un système industriel.

Il complète la démarche de gouvernance et de maîtrise opérationnelle par une réflexion sur les mécanismes de protection et leur organisation.

Il peut être utilisé pour examiner la cohérence entre les mesures de sécurité, l'architecture et les objectifs de protection.

## 5.3 IEC TR 62443-2-3 — Gestion des correctifs

### Objectif

La gestion des correctifs consiste à identifier, évaluer, tester, déployer et suivre les mises à jour destinées à corriger des vulnérabilités ou des défauts.

Dans les environnements industriels, elle présente des contraintes particulières.

Un correctif peut modifier le comportement d'un équipement, perturber une communication industrielle ou nécessiter un arrêt de production.

### Processus recommandé

1. Recenser les équipements et versions concernés.
2. Identifier les avis de sécurité et les correctifs disponibles.
3. Évaluer la vulnérabilité et les conséquences possibles.
4. Vérifier les dépendances et la compatibilité.
5. Définir une stratégie de test.
6. Valider le changement avec les responsables concernés.
7. Déployer le correctif pendant une fenêtre adaptée.
8. Vérifier le fonctionnement du procédé.
9. Documenter le résultat.
10. Définir une mesure compensatoire lorsque le correctif ne peut pas être appliqué.

Une mesure compensatoire peut comprendre une restriction d'accès, un filtrage réseau renforcé ou une limitation des connexions. Elle ne doit pas être considérée comme équivalente au correctif sans analyse de risques.

## 5.4 IEC 62443-2-4 — Prestataires de services IACS

### Objectif

Ce document définit des exigences de programme de sécurité pour les prestataires intervenant sur les systèmes d'automatisation et de contrôle industriels.

Il concerne notamment les intégrateurs, les mainteneurs et les fournisseurs de services industriels.

### Points à contrôler

- compétences des intervenants ;
- procédures d'intervention ;
- gestion des comptes et accès ;
- protection des informations ;
- maîtrise des outils de maintenance ;
- gestion des changements ;
- traitement des vulnérabilités ;
- gestion des incidents ;
- documentation des opérations ;
- encadrement des sous-traitants.

### Exemple de contrôle fournisseur

|Domaine|Question d'évaluation|
|---|---|
|Accès distant|Les accès sont-ils autorisés, limités, tracés et désactivés après usage ?|
|Comptes|Les comptes individuels sont-ils privilégiés lorsque cela est possible ?|
|Maintenance|Les changements sont-ils documentés et validés ?|
|Outils|Les postes de maintenance sont-ils maîtrisés et protégés ?|
|Compétences|Les intervenants disposent-ils des compétences requises ?|
|Incidents|Le prestataire sait-il signaler rapidement un incident affectant l'installation ?|
|Sous-traitance|Les exigences de sécurité sont-elles répercutées aux sous-traitants concernés ?|

L'évaluation doit s'appuyer sur les exigences applicables au service et sur des preuves vérifiables.

---

# 6. IEC 62443-3-2 : analyse des risques industriels

## 6.1 Objectif

IEC 62443-3-2 traite de l'appréciation des risques de cybersécurité lors de la conception d'un système industriel.

Elle fournit une démarche structurée pour :

- définir le système étudié ;
- le partitionner en zones et conduits ;
- apprécier les risques par zone et conduit ;
- déterminer les niveaux de sécurité cibles ;
- documenter les exigences de sécurité.

## 6.2 Étape 1 — Définir le système étudié

Le _System Under Consideration_ (SUC) est le système dont le périmètre est évalué.

Il faut préciser :

- les équipements concernés ;
- les fonctions industrielles ;
- les interfaces ;
- les connexions externes ;
- les utilisateurs ;
- les dépendances ;
- les limites de responsabilité.

Un périmètre mal défini risque de laisser de côté des connexions importantes ou des systèmes nécessaires au fonctionnement.

### Exemple

Pour une ligne de production, le périmètre peut comprendre :

- les automates de ligne ;
- les IHM ;
- le serveur de supervision ;
- la station d'ingénierie ;
- les équipements réseau ;
- les connexions de maintenance ;
- les interfaces avec le système de production.

Le périmètre exact doit être défini selon l'installation réelle.

## 6.3 Étape 2 — Inventorier les actifs et les communications

L'inventaire doit permettre d'identifier les actifs, leurs caractéristiques et leurs dépendances.

Les informations utiles peuvent comprendre :

- identifiant de l'actif ;
- fonction ;
- constructeur et modèle ;
- version matérielle et logicielle ;
- système d'exploitation ;
- adresse réseau ;
- protocole industriel ;
- propriétaire ;
- criticité ;
- dépendances ;
- état du support constructeur.

Il faut également identifier les communications entre les équipements et les systèmes externes.

## 6.4 Étape 3 — Définir les événements redoutés

Les événements redoutés correspondent aux conséquences que l'organisation cherche à éviter ou à limiter.

Exemples :

- arrêt d'une ligne de production ;
- modification non autorisée d'une consigne ;
- perte de supervision ;
- indisponibilité d'un système de contrôle ;
- altération des données de procédé ;
- perte de capacité de maintenance ;
- perturbation d'une fonction critique.

L'analyse doit considérer les impacts sur la production, les personnes, l'environnement, les équipements et les obligations applicables.

## 6.5 Étape 4 — Identifier les scénarios de risque

Un scénario peut combiner :

- un acteur ou une menace ;
- un point d'entrée ;
- une vulnérabilité ;
- une séquence d'actions ;
- un actif cible ;
- une conséquence opérationnelle.

Exemple :

> Un accès distant de maintenance insuffisamment protégé est compromis. L'attaquant atteint une station d'ingénierie et tente de modifier la configuration d'un automate, ce qui peut provoquer une perturbation du procédé.

Ce scénario doit être évalué à partir de l'architecture réelle, des mesures existantes et des conséquences possibles.

## 6.6 Étape 5 — Définir les zones et les conduits

Les actifs ayant des besoins de sécurité comparables peuvent être regroupés dans une zone.

Les communications entre zones sont organisées au moyen de conduits soumis à des exigences de sécurité.

Cette démarche permet de limiter les communications aux flux nécessaires et de renforcer les frontières de sécurité.

## 6.7 Étape 6 — Évaluer les risques

L'analyse doit prendre en compte :

- la vraisemblance des scénarios ;
- les vulnérabilités ;
- les mesures existantes ;
- les conséquences ;
- les critères de risque de l'organisation.

Une matrice qualitative peut être utilisée, à condition que les critères et les règles de décision soient documentés.

## 6.8 Étape 7 — Déterminer les niveaux de sécurité cibles

Le _Target Security Level_ (SL-T) correspond au niveau de sécurité cible déterminé pour une zone ou un conduit.

Il est défini en fonction des risques et des exigences de sécurité retenues.

Le niveau cible ne doit pas être choisi uniquement en fonction de la présence d'un équipement ou d'une technologie. Il doit être justifié par l'analyse.

## 6.9 Étape 8 — Documenter les exigences

Les résultats doivent permettre de produire notamment :

- une description du système ;
- un inventaire des actifs ;
- des schémas de zones et conduits ;
- une analyse des risques ;
- les niveaux de sécurité cibles ;
- une spécification des exigences de cybersécurité ;
- un plan de traitement ;
- les hypothèses et contraintes de conception.

Ces éléments doivent être maintenus à jour lorsque l'architecture ou les risques évoluent.

---

# 7. IEC 62443-3-3 : exigences de sécurité des systèmes

## 7.1 Objectif

IEC 62443-3-3 définit des exigences de sécurité applicables aux systèmes d'automatisation et de contrôle industriels.

Elle associe les exigences système aux sept exigences fondamentales de sécurité et aux niveaux de capacité de sécurité.

Elle sert de référence pour spécifier et évaluer les capacités de sécurité d'un système.

## 7.2 Les sept exigences fondamentales

La série utilise sept _Foundational Requirements_ (FR).

|Référence|Exigence fondamentale|Objectif|
|---|---|---|
|FR 1|Identification et authentification|Identifier les utilisateurs et entités et vérifier leur identité.|
|FR 2|Contrôle d'utilisation|Limiter l'utilisation des fonctions et ressources aux autorisations accordées.|
|FR 3|Intégrité du système|Protéger les systèmes contre les modifications non autorisées et préserver leur intégrité.|
|FR 4|Confidentialité des données|Protéger les informations contre les divulgations non autorisées.|
|FR 5|Flux de données restreints|Limiter les communications aux flux autorisés.|
|FR 6|Réponse rapide aux événements|Détecter les événements pertinents et permettre une réponse adaptée.|
|FR 7|Disponibilité des ressources|Préserver la disponibilité des systèmes et ressources nécessaires.|

Ces exigences sont complémentaires. Leur importance relative dépend de la fonction du système et de son analyse de risques.

## 7.3 FR 1 — Identification et authentification

Les systèmes doivent disposer de mécanismes adaptés pour identifier et authentifier les utilisateurs et les autres entités concernées.

Mesures possibles :

- comptes individuels ;
- authentification adaptée à la criticité ;
- gestion des comptes de service ;
- protection des identifiants ;
- contrôle des accès distants ;
- gestion des comptes temporaires.

Dans certains environnements industriels anciens, les capacités techniques peuvent être limitées. Les restrictions doivent alors être évaluées et compensées selon les risques.

## 7.4 FR 2 — Contrôle d'utilisation

Le contrôle d'utilisation vise à limiter les opérations réalisables par chaque utilisateur ou entité.

Mesures possibles :

- gestion des rôles ;
- principe du moindre privilège ;
- séparation des comptes d'administration ;
- limitation des fonctions sensibles ;
- revue des habilitations ;
- contrôle des actions de maintenance.

## 7.5 FR 3 — Intégrité du système

L'intégrité vise à protéger les systèmes, configurations et logiciels contre les modifications non autorisées.

Mesures possibles :

- contrôle des changements ;
- validation des configurations ;
- protection des logiciels ;
- gestion des vulnérabilités ;
- vérification des programmes chargés ;
- journalisation des opérations sensibles.

## 7.6 FR 4 — Confidentialité des données

Cette exigence vise à protéger les données sensibles lorsque leur divulgation présente un risque.

Mesures possibles :

- restriction des accès ;
- chiffrement lorsque cela est approprié ;
- protection des données de configuration ;
- sécurisation des communications ;
- contrôle des exports de données.

Les mécanismes doivent être compatibles avec les contraintes de performance, les équipements et les protocoles industriels.

## 7.7 FR 5 — Flux de données restreints

Cette exigence vise à limiter les communications entre les systèmes et composants.

Mesures possibles :

- segmentation réseau ;
- filtrage des flux ;
- séparation des zones ;
- contrôle des accès distants ;
- restriction des protocoles ;
- limitation des communications interzones.

## 7.8 FR 6 — Réponse rapide aux événements

Cette exigence concerne la capacité à détecter les événements pertinents et à réagir.

Mesures possibles :

- journalisation ;
- supervision ;
- détection des anomalies ;
- centralisation des événements lorsque cela est possible ;
- procédures d'escalade ;
- coordination avec les équipes de réponse aux incidents.

La surveillance doit tenir compte des capacités des équipements et des conséquences possibles d'une collecte excessive.

## 7.9 FR 7 — Disponibilité des ressources

Cette exigence vise à préserver le fonctionnement des systèmes et la disponibilité des ressources nécessaires.

Mesures possibles :

- protection contre les saturations ;
- limitation des accès ;
- sauvegardes ;
- redondance adaptée ;
- capacité de restauration ;
- surveillance de l'état des équipements ;
- procédures de fonctionnement dégradé.

La redondance seule ne garantit pas la disponibilité si les composants redondants partagent les mêmes dépendances ou vulnérabilités.

## 7.10 Utilisation de la norme

Une démarche de conception peut suivre le processus suivant :

1. Définir le système étudié.
2. Déterminer les zones et conduits.
3. Établir les niveaux de sécurité cibles.
4. Définir les exigences applicables à chaque zone et conduit.
5. Examiner les capacités des composants.
6. Concevoir l'architecture.
7. Vérifier la mise en œuvre.
8. Documenter les écarts et les mesures compensatoires.

Les exigences détaillées doivent être consultées dans l'édition officielle applicable d'IEC 62443-3-3.

---

# 8. Les niveaux de sécurité SL 1 à SL 4

## 8.1 Objectif

Les niveaux de sécurité permettent de caractériser les capacités de sécurité nécessaires face à différents niveaux de menace.

Ils doivent être interprétés dans le contexte du système, de ses zones, de ses conduits et des risques identifiés.

Ils ne constituent pas une simple notation globale de maturité de l'organisation.

## 8.2 Présentation des niveaux

|Niveau|Orientation générale|
|---|---|
|SL 1|Protection contre une violation fortuite ou accidentelle.|
|SL 2|Protection contre une violation intentionnelle au moyen de ressources simples, de compétences générales et d'une motivation limitée.|
|SL 3|Protection contre une violation intentionnelle au moyen de ressources et compétences spécialisées et d'une motivation plus importante.|
|SL 4|Protection contre une violation intentionnelle au moyen de ressources et compétences très importantes et d'une motivation élevée.|

Ces descriptions sont des synthèses générales. Les définitions normatives précises et les exigences associées doivent être consultées dans les textes officiels.

## 8.3 Les différentes notions de niveau de sécurité

Il est important de distinguer plusieurs notions.

- **SL-T — Target Security Level :** niveau de sécurité cible déterminé par l'analyse des risques.
- **SL-C — Capability Security Level :** niveau de capacité de sécurité associé aux capacités d'un système ou composant.
- **SL-A — Achieved Security Level :** niveau de sécurité atteint par un système ou une zone dans les conditions de l'évaluation considérée.

Ces notions ne sont pas interchangeables.

Un composant annoncé comme capable d'atteindre un niveau donné ne garantit pas que le système complet atteint ce niveau dans son environnement réel.

## 8.4 Exemple d'utilisation

Une installation peut comprendre :

|Zone|Fonction|Niveau cible|
|---|---|---|
|Zone A|Supervision de production|SL-T déterminé par l'analyse|
|Zone B|Automates de contrôle|SL-T déterminé par l'analyse|
|Zone C|Maintenance distante|SL-T déterminé par l'analyse|
|Zone D|Services d'entreprise|SL-T déterminé par l'analyse|

Aucune valeur ne doit être attribuée automatiquement à ces zones. Les niveaux doivent résulter de l'analyse des risques, des scénarios retenus et des exigences applicables.

## 8.5 Limites d'une approche fondée uniquement sur le niveau

Le niveau de sécurité ne remplace pas :

- l'analyse des risques ;
- la définition des exigences ;
- la vérification de l'architecture ;
- la validation des configurations ;
- la gestion des vulnérabilités ;
- la surveillance ;
- les procédures d'exploitation.

Une installation peut disposer de composants performants sans être suffisamment protégée si les connexions, les comptes ou les procédures sont mal maîtrisés.

---

# 9. IEC 62443-4-x : sécurité des produits industriels

## 9.1 IEC 62443-4-1 — Cycle de développement sécurisé

### Objectif

IEC 62443-4-1 définit des exigences relatives au cycle de développement sécurisé des produits utilisés dans les systèmes industriels.

Elle s'adresse principalement aux fabricants et fournisseurs de produits.

Elle traite du processus de développement et de maintenance, et non uniquement de la sécurité technique d'un produit livré.

### Principaux domaines

- gestion du processus de développement sécurisé ;
- définition des exigences de sécurité ;
- conception sécurisée ;
- mise en œuvre ;
- vérification et validation ;
- gestion des vulnérabilités ;
- traitement des défauts de sécurité ;
- production et publication des informations de sécurité ;
- maintenance du produit pendant son cycle de vie.

### Questions à examiner chez un fabricant

- Le fabricant définit-il des exigences de sécurité pour ses produits ?
- Les risques sont-ils analysés pendant la conception ?
- Des tests de sécurité sont-ils réalisés ?
- Les vulnérabilités peuvent-elles être signalées ?
- Le fabricant dispose-t-il d'un processus de correction ?
- Les mises à jour sont-elles documentées ?
- Les conditions de fin de support sont-elles communiquées ?

Les preuves doivent porter sur les processus réellement appliqués et sur le périmètre évalué.

## 9.2 IEC 62443-4-2 — Exigences techniques des composants

### Objectif

IEC 62443-4-2 définit les exigences techniques de cybersécurité applicables aux composants d'un système IACS.

Les catégories de composants comprennent notamment :

- les dispositifs embarqués ;
- les composants réseau ;
- les composants hôtes ;
- les applications logicielles.

### Exemples de mesures à examiner

- authentification ;
- contrôle d'utilisation ;
- intégrité des logiciels et configurations ;
- protection des communications ;
- restriction des flux ;
- journalisation ;
- gestion des erreurs ;
- disponibilité des ressources ;
- configuration sécurisée ;
- gestion des interfaces.

Les exigences exactes dépendent du composant, de ses capacités et des exigences normatives applicables.

## 9.3 Différence entre 4-1 et 4-2

|Document|Objet principal|Question centrale|
|---|---|---|
|IEC 62443-4-1|Processus de développement sécurisé|Le fabricant développe-t-il et maintient-il ses produits selon un processus sécurisé ?|
|IEC 62443-4-2|Capacités techniques du composant|Le composant dispose-t-il des capacités techniques de sécurité requises ?|

Les deux documents sont complémentaires.

Un processus de développement sécurisé ne prouve pas à lui seul que toutes les exigences techniques d'un produit sont satisfaites. Inversement, un produit présentant des fonctions de sécurité ne démontre pas à lui seul que son cycle de développement est maîtrisé.

## 9.4 Évaluation d'un produit industriel

Lors de l'acquisition d'un produit, il est utile de demander :

- la référence exacte du produit et sa version ;
- les documents de sécurité disponibles ;
- les fonctions de sécurité prises en charge ;
- les paramètres de configuration sécurisée ;
- les exigences de compatibilité ;
- les avis de sécurité ;
- la politique de correctifs ;
- la durée de support annoncée ;
- les résultats d'évaluation ou certifications applicables, si disponibles.

Une déclaration de conformité ou un certificat doit être examiné en fonction de son périmètre, de sa version, des exigences évaluées et de l'organisme qui l'a délivré.

---

# 10. Architecture industrielle : zones et conduits

## 10.1 Objectif de la segmentation

La segmentation permet de limiter les communications et de réduire les possibilités de propagation d'un incident.

IEC 62443-3-2 fournit le cadre pour partitionner le système étudié en zones et conduits en fonction des risques et des exigences de sécurité.

Une architecture segmentée doit être documentée et vérifiable.

## 10.2 Définition d'une zone

Une zone est un regroupement logique ou physique d'actifs partageant des exigences de sécurité communes.

Exemples :

- zone des automates ;
- zone des interfaces homme-machine ;
- zone des serveurs de supervision ;
- zone des stations d'ingénierie ;
- zone des systèmes instrumentés de sécurité ;
- zone des services de maintenance.

Les regroupements doivent être justifiés par les fonctions, les risques et les besoins de communication.

## 10.3 Définition d'un conduit

Un conduit regroupe des canaux de communication entre deux zones ou davantage, soumis à des exigences de sécurité communes.

Il peut s'appuyer sur des mécanismes tels que :

- pare-feu ;
- filtrage industriel ;
- passerelles ;
- contrôle des connexions ;
- dispositifs de transfert ;
- mécanismes de surveillance ;
- connexions distantes maîtrisées.

Un conduit n'est pas nécessairement un équipement physique unique. Il représente un ensemble logique de communications et de protections.

## 10.4 Exemple d'architecture de référence

```
                     Réseau d'entreprise IT
                              |
                    Pare-feu IT / OT
                              |
                  Zone tampon industrielle
                    (DMZ industrielle)
                              |
                  Filtrage interzones OT
                              |
                    Zone de supervision
                    SCADA / serveurs HMI
                              |
                  Conduit industriel contrôlé
                              |
                     Zone de contrôle
                       PLC / API
                              |
                  Réseaux de terrain
                              |
                    Capteurs / actionneurs
```

Ce schéma est un exemple pédagogique, pas une architecture imposée par la norme. La conception réelle doit découler de l'analyse des risques et des contraintes de fonctionnement.

## 10.5 Principes de conception

Une architecture industrielle doit notamment considérer :

- le principe du moindre privilège ;
- les flux nécessaires uniquement ;
- la séparation des fonctions ;
- les connexions distantes ;
- la protection des accès d'administration ;
- les dépendances entre zones ;
- la résilience ;
- les besoins de maintenance ;
- les conséquences d'une défaillance du filtrage.

La présence d'une DMZ industrielle ne garantit pas à elle seule une architecture conforme ou sécurisée. Les règles de communication et les mécanismes de contrôle doivent être adaptés et vérifiés.

## 10.6 Flux réseau à documenter

Pour chaque communication importante, il est utile de préciser :

|Champ|Exemple de contenu|
|---|---|
|Source|Serveur SCADA|
|Destination|Automate de ligne|
|Protocole|Protocole industriel utilisé|
|Sens du flux|Unidirectionnel ou bidirectionnel selon le besoin|
|Justification|Fonction opérationnelle nécessaire|
|Protection|Filtrage, authentification ou autre mesure pertinente|
|Responsable|Propriétaire de la communication|
|Validation|Date et autorité ayant approuvé le flux|

Les règles doivent être vérifiées sur les équipements et réexaminées après les changements significatifs.

---

# 11. Mesures opérationnelles de cybersécurité OT

## 11.1 Gestion des actifs

L'inventaire constitue un préalable à l'analyse des risques et à la gestion des vulnérabilités.

Il doit permettre d'identifier les équipements, leurs versions, leurs fonctions et leurs dépendances.

Les actifs critiques et les équipements en fin de support doivent être identifiés.

## 11.2 Gestion des identités et des accès

Les accès doivent être limités aux besoins opérationnels.

Les mesures peuvent inclure :

- comptes individuels lorsque cela est possible ;
- comptes administratifs séparés ;
- restriction des droits ;
- gestion des comptes de prestataires ;
- désactivation des comptes inutilisés ;
- revue périodique des habilitations ;
- traçabilité des accès sensibles.

Les limitations des équipements anciens doivent être documentées et compensées lorsque cela est nécessaire.

## 11.3 Accès distants

Les accès distants constituent un risque important lorsqu'ils permettent d'atteindre des équipements industriels.

Les règles de sécurité peuvent comprendre :

- autorisation préalable ;
- authentification renforcée ;
- limitation des équipements autorisés ;
- passage par une infrastructure contrôlée ;
- durée d'accès limitée ;
- traçabilité ;
- supervision ;
- désactivation après intervention ;
- procédure d'urgence documentée.

Les accès directs non maîtrisés depuis Internet vers les équipements de contrôle doivent être évités.

## 11.4 Gestion des vulnérabilités

La gestion des vulnérabilités doit tenir compte :

- de l'exposition ;
- de la criticité de l'équipement ;
- de l'exploitabilité ;
- des conséquences sur le procédé ;
- des correctifs disponibles ;
- de la compatibilité ;
- des mesures compensatoires.

Une vulnérabilité critique sur un système industriel ne peut pas toujours être corrigée immédiatement. Le risque doit alors être documenté et les mesures compensatoires suivies.

## 11.5 Sauvegarde et restauration

Les sauvegardes industrielles doivent couvrir les éléments nécessaires à la reprise :

- programmes d'automates ;
- configurations ;
- projets d'ingénierie ;
- configurations réseau ;
- bases de données ;
- serveurs de supervision ;
- documents de conception ;
- paramètres nécessaires à la remise en service.

Il est important de tester la restauration et de vérifier que les sauvegardes sont exploitables.

Les copies doivent être protégées contre les accès non autorisés et les altérations.

## 11.6 Surveillance et journalisation

La surveillance doit être adaptée aux équipements et aux risques.

Elle peut inclure :

- connexions administratives ;
- modifications de configuration ;
- accès distants ;
- événements de sécurité ;
- changements de programmes ;
- communications inhabituelles ;
- indisponibilités ;
- événements des dispositifs réseau.

La collecte ne doit pas perturber le fonctionnement du procédé. Les mécanismes de surveillance doivent être testés et validés dans des conditions adaptées.

## 11.7 Supports amovibles

Les supports amovibles peuvent introduire des logiciels malveillants ou permettre des transferts de données non autorisés.

Les mesures possibles comprennent :

- règles d'utilisation ;
- contrôle des supports ;
- analyse avant introduction ;
- poste dédié de transfert ;
- journalisation ;
- limitation des usages ;
- procédures adaptées aux environnements isolés.

## 11.8 Gestion des changements

Tout changement susceptible d'affecter la sécurité ou le fonctionnement doit être évalué.

Le processus peut comprendre :

1. Une demande documentée.
2. Une analyse d'impact.
3. Une analyse de risques si nécessaire.
4. Une validation.
5. Des tests.
6. Une fenêtre d'intervention adaptée.
7. Une procédure de retour arrière.
8. Une vérification après changement.
9. Une mise à jour de la documentation.

---

# 12. Gestion des incidents industriels

## 12.1 Objectif

La gestion des incidents OT vise à détecter, qualifier, contenir et résoudre les événements susceptibles d'affecter la cybersécurité ou le fonctionnement industriel.

Elle doit être coordonnée avec les processus généraux de gestion des incidents de l'organisation.

## 12.2 Exemples d'incidents OT

- modification non autorisée d'un programme d'automate ;
- compromission d'une station d'ingénierie ;
- accès distant suspect ;
- propagation d'un logiciel malveillant ;
- indisponibilité d'un serveur SCADA ;
- altération de données de supervision ;
- saturation d'un réseau industriel ;
- compromission d'un fournisseur ;
- perte de maîtrise d'un compte privilégié.

## 12.3 Phases de réponse

### Préparation

- définir les rôles ;
- documenter les scénarios ;
- préparer les procédures ;
- identifier les systèmes critiques ;
- définir les contacts d'urgence ;
- organiser les exercices.

### Détection et qualification

- analyser les alertes ;
- confirmer les faits ;
- identifier le périmètre ;
- évaluer les conséquences ;
- préserver les preuves disponibles.

### Containment et réponse

- limiter les accès compromis ;
- isoler les systèmes si cela est approprié ;
- protéger les fonctions essentielles ;
- coordonner les actions avec les équipes OT ;
- éviter les interventions susceptibles de déstabiliser le procédé.

### Reprise

- restaurer les systèmes selon les procédures validées ;
- vérifier les configurations ;
- contrôler les programmes et les données ;
- surveiller les systèmes remis en service ;
- confirmer le fonctionnement attendu.

### Retour d'expérience

- reconstituer la chronologie ;
- déterminer les causes ;
- analyser les faiblesses ;
- définir les actions correctives ;
- actualiser les risques ;
- améliorer les procédures.

## 12.4 Particularités de la réponse aux incidents OT

Une action classique en informatique, telle que l'arrêt immédiat d'un serveur, peut avoir des conséquences imprévues sur un procédé industriel.

Les décisions de confinement et de reprise doivent donc être coordonnées entre les responsables de la cybersécurité, les automaticiens, les exploitants et, lorsque cela est pertinent, les responsables de sûreté de fonctionnement.

Les règles de notification doivent être déterminées en fonction des obligations légales, sectorielles et contractuelles applicables.

---

# 13. Documentation et preuves attendues

## 13.1 Principe général

La documentation doit permettre de démontrer que les risques ont été analysés, que les exigences ont été définies et que les mesures sont appliquées.

La liste ci-dessous est un inventaire de travail. Tous les documents ne sont pas nécessairement exigés sous cette forme exacte par chaque partie de la série.

## 13.2 Documentation de gouvernance

- Politique de cybersécurité OT.
- Programme de sécurité industrielle.
- Définition du périmètre.
- Rôles et responsabilités.
- Procédures de maintenance.
- Exigences applicables aux fournisseurs.
- Plan de gestion des incidents.
- Programme de formation.

## 13.3 Documentation technique

- Inventaire des actifs.
- Schémas d'architecture.
- Cartographie des flux.
- Description des zones et conduits.
- Règles de filtrage.
- Matrice des accès.
- Configuration des accès distants.
- Inventaire des versions et dépendances.
- Dossiers de configuration.
- Dossiers de sauvegarde et de restauration.

## 13.4 Documentation des risques

- Description du système étudié.
- Méthode d'appréciation des risques.
- Registre des scénarios de risque.
- Critères d'acceptation.
- Niveaux de sécurité cibles.
- Spécification des exigences de cybersécurité.
- Plan de traitement.
- Justification des mesures compensatoires.
- Décisions d'acceptation des risques résiduels.

## 13.5 Documentation de maintenance

- Procédure de gestion des correctifs.
- Registre des vulnérabilités.
- Historique des changements.
- Rapports de tests.
- Comptes rendus d'intervention.
- Liste des comptes de maintenance.
- Historique des accès distants.
- État du support constructeur.

## 13.6 Documentation d'audit

- Programme d'évaluation.
- Critères et périmètre.
- Rapports de vérification.
- Résultats des tests.
- Constats et écarts.
- Actions correctives.
- Preuves de clôture.
- Vérification de l'efficacité des actions.

## 13.7 Exemple de matrice de conformité

|Domaine|Attendu|Preuve possible|Responsable|
|---|---|---|---|
|Gouvernance OT|Programme de sécurité défini|Politique, procédures, responsabilités|Responsable OT / RSSI|
|Inventaire|Actifs identifiés|Inventaire vérifié|Responsable automatisme|
|Analyse des risques|Scénarios évalués|Rapport de risques|Équipe OT / cybersécurité|
|Zones et conduits|Architecture segmentée|Schémas et règles de flux|Architecte OT|
|Accès distants|Connexions maîtrisées|Paramétrages, journaux, procédures|Exploitation / réseau|
|Correctifs|Processus de traitement défini|Registre, tests, décisions|Maintenance / OT|
|Sauvegardes|Configurations récupérables|Rapports et tests de restauration|Exploitation|
|Incidents|Réponse organisée|Procédure, exercices, rapports|Équipe de réponse|
|Produits|Capacités de sécurité évaluées|Dossiers produits et preuves disponibles|Achats / intégration|
|Amélioration|Écarts suivis|Plans d'action et vérifications|Responsable du programme|

Les preuves doivent correspondre au périmètre et aux exigences effectivement évalués.

---

# 14. Méthodologie de mise en œuvre

## 14.1 Phase 1 — Cadrage

- Définir les objectifs du projet.
- Identifier les installations concernées.
- Déterminer les limites du périmètre.
- Identifier les parties prenantes.
- Définir les responsabilités.
- Planifier les ressources.

## 14.2 Phase 2 — État des lieux

- Recenser les actifs.
- Collecter les schémas réseau.
- Identifier les accès distants.
- Examiner les pratiques de maintenance.
- Identifier les systèmes en fin de support.
- Analyser les mesures de sécurité existantes.

## 14.3 Phase 3 — Analyse des risques

- Définir le système étudié.
- Identifier les événements redoutés.
- Construire les scénarios.
- Évaluer les risques.
- Identifier les mesures existantes.
- Déterminer les traitements nécessaires.

## 14.4 Phase 4 — Conception de l'architecture

- Définir les zones.
- Définir les conduits.
- Identifier les flux nécessaires.
- Déterminer les niveaux de sécurité cibles.
- Définir les exigences de sécurité.
- Évaluer les dépendances et les contraintes opérationnelles.

## 14.5 Phase 5 — Plan de traitement

Les actions doivent être classées en fonction des risques et de leur faisabilité.

Exemples :

- supprimer les accès non autorisés ;
- renforcer les accès distants ;
- segmenter les réseaux ;
- améliorer les sauvegardes ;
- renforcer la gestion des changements ;
- mettre à jour les équipements lorsque cela est possible ;
- déployer des mesures compensatoires pour les systèmes anciens.

## 14.6 Phase 6 — Déploiement

- valider les changements ;
- tester les configurations ;
- appliquer les mesures ;
- documenter les écarts ;
- former les intervenants ;
- vérifier le fonctionnement du procédé.

## 14.7 Phase 7 — Vérification

- vérifier l'architecture ;
- contrôler les règles de communication ;
- examiner les habilitations ;
- tester les sauvegardes ;
- vérifier les procédures ;
- examiner les preuves ;
- traiter les écarts identifiés.

## 14.8 Phase 8 — Maintien en condition de sécurité

Le maintien en condition de sécurité doit intégrer :

- la surveillance des vulnérabilités ;
- les correctifs ;
- la gestion des changements ;
- la revue des accès ;
- l'actualisation des inventaires ;
- le suivi des fournisseurs ;
- la réponse aux incidents ;
- la réévaluation des risques.

La sécurité doit être réexaminée lorsque l'architecture, les fonctions, les menaces ou les conditions d'exploitation évoluent de manière significative.

---

# 15. Préparation à un audit IEC 62443

## 15.1 Définir l'objet de l'évaluation

Une évaluation doit préciser ce qui est examiné :

- un programme de sécurité de l'exploitant ;
- un prestataire de services ;
- une architecture industrielle ;
- un système complet ;
- un composant ;
- un processus de développement de produit.

Les critères et les preuves attendues diffèrent selon le périmètre.

## 15.2 Questions de vérification

### Gouvernance

- Le programme de cybersécurité OT est-il défini ?
- Les rôles et responsabilités sont-ils formalisés ?
- Les risques sont-ils suivis ?
- Les prestataires sont-ils encadrés ?

### Architecture

- Le périmètre est-il clairement défini ?
- Les actifs sont-ils inventoriés ?
- Les zones et conduits sont-ils documentés ?
- Les flux sont-ils justifiés ?
- Les niveaux de sécurité cibles sont-ils argumentés ?

### Sécurité technique

- Les accès sont-ils maîtrisés ?
- Les systèmes sont-ils configurés de manière sécurisée ?
- Les flux non nécessaires sont-ils limités ?
- Les événements pertinents sont-ils surveillés ?
- Les sauvegardes sont-elles testées ?

### Exploitation

- Les correctifs sont-ils évalués et suivis ?
- Les changements sont-ils maîtrisés ?
- Les interventions sont-elles tracées ?
- Les risques des équipements anciens sont-ils documentés ?

### Réponse aux incidents

- Les rôles sont-ils définis ?
- Les procédures sont-elles disponibles ?
- Les équipes connaissent-elles les consignes ?
- Des exercices ont-ils été réalisés ?
- Les retours d'expérience donnent-ils lieu à des actions ?

## 15.3 Checklist d'audit

- [ ] Le périmètre du système étudié est défini.
- [ ] Les actifs industriels sont inventoriés.
- [ ] Les dépendances et interfaces sont identifiées.
- [ ] Les scénarios de risque sont documentés.
- [ ] Les zones et conduits sont définis.
- [ ] Les niveaux de sécurité cibles sont justifiés.
- [ ] Les exigences de sécurité sont documentées.
- [ ] Les flux réseau sont autorisés et maîtrisés.
- [ ] Les accès administratifs sont encadrés.
- [ ] Les accès distants sont contrôlés.
- [ ] Les vulnérabilités sont suivies.
- [ ] Les correctifs font l'objet d'une analyse adaptée.
- [ ] Les configurations sont sauvegardées.
- [ ] Les procédures de restauration sont testées.
- [ ] Les changements sont maîtrisés.
- [ ] Les fournisseurs et prestataires sont évalués.
- [ ] Les incidents sont traités selon des procédures définies.
- [ ] Les preuves de sécurité sont conservées.
- [ ] Les écarts font l'objet d'actions correctives.

Cette checklist est indicative. Elle ne constitue pas une liste exhaustive des exigences normatives et ne permet pas, à elle seule, de déclarer un système conforme.

## 15.4 Conformité et certification

Une évaluation IEC 62443 doit être associée à un périmètre, une partie de la série, des critères et des preuves précis.

Une certification portant sur un produit ne démontre pas automatiquement la conformité de l'ensemble de l'installation. De même, l'évaluation d'un programme de sécurité ne prouve pas que chaque composant technique satisfait à toutes les exigences applicables.

Les déclarations de conformité doivent toujours préciser le périmètre concerné.

---

# 16. Correspondance avec ISO/IEC 27001, NIS2, LPM et ANSSI

## 16.1 Complémentarité entre ISO/IEC 27001 et IEC 62443

ISO/IEC 27001 et IEC 62443 sont complémentaires.

ISO/IEC 27001 organise la gouvernance générale de la sécurité de l'information. IEC 62443 apporte un cadre spécialisé pour les environnements industriels.

|Sujet|ISO/IEC 27001|IEC 62443|
|---|---|---|
|Gouvernance|SGSI et responsabilités générales|Programme de cybersécurité industrielle|
|Gestion des risques|Risques de sécurité de l'information|Risques spécifiques aux systèmes industriels|
|Architecture|Contrôles de sécurité adaptés au risque|Zones, conduits et exigences système|
|Accès|Gestion des accès et identités|Exigences adaptées aux systèmes IACS|
|Fournisseurs|Gestion des risques liés aux tiers|Exigences spécialisées pour les prestataires et produits industriels|
|Développement|Contrôles liés au développement sécurisé|Exigences dédiées au cycle de développement et aux composants IACS|
|Incidents|Processus de gestion et d'amélioration|Prise en compte des contraintes et conséquences industrielles|
|Audit|Évaluation du SGSI|Évaluation selon le document et le périmètre IEC 62443 retenus|

La mise en œuvre d'IEC 62443 ne dispense pas de satisfaire aux exigences du SGSI lorsque celui-ci est applicable. Inversement, une certification ISO/IEC 27001 ne prouve pas automatiquement la conformité aux exigences spécifiques d'IEC 62443.

## 16.2 Correspondance indicative avec NIS2

NIS2 concerne la cybersécurité de certaines entités et activités selon les conditions prévues par le droit applicable.

Les mesures d'IEC 62443 peuvent contribuer à traiter des sujets tels que :

- la gestion des risques ;
- la sécurité des systèmes ;
- la gestion des incidents ;
- la continuité ;
- la sécurité de la chaîne d'approvisionnement ;
- la gestion des vulnérabilités ;
- la maîtrise des accès.

Cependant, une correspondance thématique n'est pas une équivalence juridique. L'applicabilité et les obligations doivent être vérifiées à partir des textes en vigueur, de leur transposition nationale et du statut de l'organisation.

## 16.3 Correspondance avec la LPM et les référentiels ANSSI

Les entités concernées par des obligations spécifiques peuvent devoir appliquer des prescriptions supplémentaires en matière de sécurité des systèmes d'information.

IEC 62443 peut contribuer à structurer certains travaux, notamment :

- la segmentation ;
- l'analyse de risques ;
- la maîtrise des accès ;
- la gestion des changements ;
- la surveillance ;
- le traitement des incidents ;
- la sécurisation des systèmes industriels.

La correspondance exacte doit être déterminée à partir des exigences applicables à l'entité et au système concerné. Il ne faut pas présumer qu'une certification IEC 62443 satisfait automatiquement aux obligations de la LPM ou aux prescriptions de l'ANSSI.

## 16.4 Construire une matrice de correspondance

Une matrice de travail peut comprendre les champs suivants :

|Champ|Description|
|---|---|
|Référence IEC 62443|Partie, clause ou exigence pertinente.|
|Exigence réglementaire|Référence exacte du texte applicable.|
|Contrôle interne|Mesure mise en œuvre.|
|Périmètre|Système, zone, composant ou processus concerné.|
|Responsable|Personne ou fonction chargée de la mesure.|
|Preuve|Élément démontrant l'application du contrôle.|
|Écart|Différence entre l'exigence et la situation observée.|
|Action|Mesure nécessaire pour traiter l'écart.|

La matrice doit être validée à partir des textes officiels et actualisée lors de leurs évolutions.

---

# 17. Exemple pratique : sécurisation d'un système industriel

## 17.1 Contexte fictif

Une entreprise exploite une ligne de production automatisée composée de :

- plusieurs automates ;
- des interfaces homme-machine ;
- un serveur SCADA ;
- une station d'ingénierie ;
- un réseau industriel Ethernet ;
- une connexion de maintenance externe ;
- un système informatique de gestion de production.

L'objectif est de réduire les risques de compromission tout en préservant la continuité de la production.

## 17.2 État des lieux initial

L'évaluation révèle les situations suivantes :

- les flux entre le réseau bureautique et le réseau industriel sont insuffisamment documentés ;
- plusieurs équipements utilisent des comptes partagés ;
- la station d'ingénierie dispose de droits étendus ;
- les sauvegardes des programmes d'automates ne sont pas régulièrement testées ;
- les connexions de maintenance ne sont pas toutes revues ;
- les correctifs sont appliqués de manière ponctuelle ;
- l'inventaire des versions n'est pas complet.

Ces constats sont fictifs et servent uniquement à illustrer la démarche.

## 17.3 Analyse des risques

|ID|Scénario|Conséquence possible|Traitement envisagé|
|---|---|---|---|
|R-01|Compromission d'un accès distant|Accès non autorisé au réseau OT.|Contrôle des connexions, authentification renforcée, journalisation.|
|R-02|Compromission de la station d'ingénierie|Modification non autorisée d'un programme automate.|Durcissement, limitation des droits, sauvegarde et contrôle des modifications.|
|R-03|Propagation depuis le réseau bureautique|Indisponibilité de systèmes industriels.|Segmentation et filtrage des flux.|
|R-04|Échec de restauration|Prolongation d'un arrêt de production.|Sauvegardes protégées et tests de restauration.|
|R-05|Vulnérabilité d'un équipement ancien|Exploitation d'une faiblesse connue.|Évaluation de risque, restriction d'accès et mesure compensatoire si nécessaire.|

Le niveau de risque doit être évalué avec les critères définis par l'entreprise.

## 17.4 Architecture cible

L'architecture envisagée comprend :

- un réseau d'entreprise ;
- une frontière de sécurité IT/OT ;
- une zone tampon industrielle ;
- une zone de supervision ;
- une zone de contrôle ;
- des réseaux de terrain ;
- un accès de maintenance contrôlé.

Les flux sont limités aux besoins opérationnels validés.

La conception doit vérifier que les communications nécessaires à la production, à la supervision et à la maintenance restent disponibles.

## 17.5 Plan d'action

|Priorité indicative|Action|Résultat attendu|
|---|---|---|
|Élevée|Documenter les actifs et les flux.|Visibilité sur le périmètre et les dépendances.|
|Élevée|Encadrer les accès distants.|Réduction des accès non maîtrisés.|
|Élevée|Sauvegarder les configurations critiques et tester les restaurations.|Amélioration de la capacité de reprise.|
|Élevée|Contrôler les droits d'administration.|Réduction des privilèges excessifs.|
|Moyenne à élevée|Segmenter les réseaux selon l'analyse des risques.|Limitation de la propagation entre zones.|
|Moyenne à élevée|Structurer la gestion des vulnérabilités et correctifs.|Traitement plus cohérent des faiblesses connues.|
|Moyenne|Formaliser les procédures de réponse aux incidents.|Amélioration de la préparation et de la coordination.|
|Moyenne|Former les équipes OT et les prestataires.|Amélioration de l'application des procédures.|

Les priorités réelles doivent être établies après analyse des risques, des conséquences métier et des contraintes de mise en œuvre.

## 17.6 Indicateurs de suivi

Exemples d'indicateurs internes :

- proportion d'actifs industriels inventoriés ;
- proportion de flux réseau documentés et validés ;
- nombre d'accès distants non conformes ;
- proportion de comptes privilégiés revus ;
- taux de réussite des tests de restauration ;
- nombre de vulnérabilités prioritaires non traitées dans les délais définis ;
- proportion des changements industriels disposant d'une validation documentée ;
- délai de traitement des incidents OT.

Les objectifs et seuils doivent être définis par l'organisation en fonction de ses risques.

---

# 18. Glossaire

|Terme|Définition|
|---|---|
|IEC|Commission électrotechnique internationale.|
|ISA|International Society of Automation.|
|OT|Operational Technology : technologies utilisées pour surveiller ou contrôler des processus physiques.|
|IACS|Industrial Automation and Control System : système d'automatisation et de contrôle industriels.|
|ICS|Industrial Control System : système de contrôle industriel.|
|SCADA|Supervisory Control and Data Acquisition : supervision et acquisition de données.|
|DCS|Distributed Control System : système de contrôle distribué.|
|PLC / API|Programmable Logic Controller / automate programmable industriel.|
|HMI / IHM|Human-Machine Interface / interface homme-machine.|
|SUC|System Under Consideration : système faisant l'objet de l'analyse.|
|Zone|Regroupement logique ou physique d'actifs partageant des exigences de sécurité communes.|
|Conduit|Regroupement de canaux de communication entre zones soumis à des exigences de sécurité communes.|
|FR|Foundational Requirement : exigence fondamentale de sécurité.|
|SL|Security Level : niveau de sécurité dans le cadre IEC 62443.|
|SL-T|Target Security Level : niveau de sécurité cible.|
|SL-C|Capability Security Level : niveau de capacité de sécurité.|
|SL-A|Achieved Security Level : niveau de sécurité atteint dans le cadre de l'évaluation concernée.|
|IAC|Identification and Authentication Control : identification et authentification.|
|UC|Use Control : contrôle d'utilisation.|
|SI|System Integrity : intégrité du système.|
|DC|Data Confidentiality : confidentialité des données.|
|RDF|Restricted Data Flow : restriction des flux de données.|
|TRE|Timely Response to Events : réponse rapide aux événements.|
|RA|Resource Availability : disponibilité des ressources.|
|DMZ industrielle|Zone tampon permettant de contrôler les échanges entre des réseaux de niveaux de confiance différents.|
|Durcissement|Réduction des fonctions, services, comptes et configurations inutiles ou risqués.|
|Mesure compensatoire|Mesure destinée à réduire un risque lorsque la mesure initialement prévue ne peut pas être appliquée ou ne suffit pas.|
|Sûreté de fonctionnement|Aptitude d'un système à accomplir sa fonction de manière fiable et sûre dans les conditions prévues.|
|Maintenance OT|Activités de maintien en condition opérationnelle et de sécurité des systèmes industriels.|

---

# 19. Conclusion

La série IEC 62443 fournit un cadre de référence pour maîtriser la cybersécurité des systèmes d'automatisation et de contrôle industriels.

Elle traite à la fois des responsabilités organisationnelles, des risques de conception, de l'architecture des systèmes, des capacités techniques des composants et du cycle de vie des produits.

Les principaux enseignements sont les suivants :

- la cybersécurité industrielle doit être fondée sur les risques ;
- l'inventaire et la compréhension des dépendances sont indispensables ;
- les zones et conduits permettent de structurer la protection des communications ;
- les niveaux de sécurité cibles doivent être justifiés par l'analyse ;
- les systèmes et composants doivent satisfaire aux exigences adaptées à leur fonction ;
- les fournisseurs et intégrateurs doivent être intégrés au dispositif de sécurité ;
- les contraintes de disponibilité et de sûreté de fonctionnement doivent être prises en compte ;
- la sécurité doit être maintenue tout au long du cycle de vie.

IEC 62443 ne se résume pas à la segmentation réseau ou à l'application de mesures techniques. Elle implique une démarche globale associant les personnes, les processus et les technologies.

La conformité doit être évaluée selon le document applicable, son édition, le périmètre concerné et les preuves disponibles.

---

## Références documentaires

Pour une utilisation normative ou un projet d'évaluation, consulter les éditions officielles applicables :

- IEC TS 62443-1-1 — Terminologie, concepts et modèles.
- IEC 62443-2-1 — Programme de sécurité du propriétaire d'actifs.
- IEC TR 62443-2-2 — Dispositif de protection de la sécurité IACS.
- IEC TR 62443-2-3 — Gestion des correctifs en environnement IACS.
- IEC 62443-2-4 — Exigences de programme de sécurité des prestataires de services IACS.
- IEC 62443-3-2:2020 — Appréciation des risques de sécurité pour la conception du système.
- IEC 62443-3-3 — Exigences de sécurité des systèmes et niveaux de sécurité.
- IEC 62443-4-1 — Exigences du cycle de développement sécurisé des produits.
- IEC 62443-4-2 — Exigences techniques de sécurité des composants IACS.
- IEC TS 62443-1-5:2023 — Schéma des profils de sécurité IEC 62443.

Les références, éditions, amendements et statuts doivent être vérifiés dans le catalogue officiel IEC et, lorsque cela est pertinent, dans le catalogue ISA.

### Sources officielles et complémentaires

- IEC — Série IEC 62443 et documents de normalisation : https://www.iec.ch/
- IEC Webstore — IEC 62443-3-2:2020 : [https://webstore.iec.ch/en/publication/30727](https://webstore.iec.ch/en/publication/30727)
- IEC Webstore — IEC TS 62443-1-5:2023 : [https://webstore.iec.ch/en/publication/67461](https://webstore.iec.ch/en/publication/67461)
- ISA — Présentation de la série ISA/IEC 62443 : [https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards)
- ANSSI — Référentiels et recommandations de cybersécurité : https://cyber.gouv.fr/

**Note :** ce guide est une synthèse pédagogique et opérationnelle. Il ne reproduit pas les textes normatifs intégraux et ne constitue pas, à lui seul, une preuve de conformité à IEC 62443.