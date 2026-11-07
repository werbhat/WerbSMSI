<!-- WerbReferentiels – Développé par @WerbHat -->
## Référentiel de management de la sécurité de l’information

**Version du document :** 1.0  
**Référentiel principal :** ISO/IEC 27001:2022  
**Référentiels complémentaires :** ISO/IEC 27000, 27002, 27003, 27004, 27005, 27007, 27008, 27017, 27018, 27019 et 27035.

---

## Sommaire

1. Introduction générale
2. Vue d’ensemble de la famille ISO/IEC 27000
3. Principes fondamentaux de la sécurité de l’information
4. Structure détaillée d’ISO/IEC 27001:2022
5. Annexe A : les 93 contrôles de sécurité
6. ISO/IEC 27002 : bonnes pratiques de sécurité
7. ISO/IEC 27005 : gestion des risques
8. ISO/IEC 27004 : mesure et indicateurs
9. ISO/IEC 27003 : mise en œuvre du SMSI
10. ISO/IEC 27007 et 27008 : audit et évaluation
11. ISO/IEC 27017 et 27018 : sécurité du cloud
12. ISO/IEC 27019 : systèmes industriels du secteur énergétique
13. ISO/IEC 27035 : gestion des incidents
14. Documentation et preuves attendues
15. Méthodologie de mise en œuvre
16. Préparation à l’audit de certification
17. Correspondance avec NIS2, la LPM et les référentiels ANSSI
18. Glossaire
19. Conclusion

---

# 1. Introduction générale

## 1.1 Objectif du guide

La famille ISO/IEC 27000 regroupe des normes et des lignes directrices destinées à organiser, mettre en œuvre, évaluer et améliorer la sécurité de l’information.

Son référentiel central est ISO/IEC 27001, qui définit les exigences applicables à un système de management de la sécurité de l’information (SMSI).

L’objectif de ce guide est de fournir une compréhension structurée de cette famille normative, en précisant :

- le rôle de chaque norme ;
- les exigences de management applicables au SMSI ;
- les principes de l’analyse et du traitement des risques ;
- les contrôles de sécurité à considérer ;
- les éléments de preuve utiles lors d’un audit ;
- les interactions entre gouvernance, mesures techniques et amélioration continue ;
- les possibilités de rapprochement avec les obligations réglementaires et les référentiels sectoriels.

Ce document constitue un support de travail pour les responsables de la sécurité des systèmes d’information (RSSI), les responsables qualité, les équipes informatiques, les auditeurs internes, les responsables de risques et les directions d’organisations.

## 1.2 Qu’est-ce qu’un SMSI ?

Un système de management de la sécurité de l’information est un ensemble cohérent de politiques, de processus, de responsabilités, de moyens et de contrôles permettant de protéger l’information en fonction des risques identifiés.

Il ne se limite pas à l’installation de solutions techniques. Il repose sur une organisation formelle qui permet de décider :

- quelles informations doivent être protégées ;
- contre quelles menaces ;
- avec quel niveau de protection ;
- selon quelles responsabilités ;
- au moyen de quelles mesures ;
- comment vérifier leur efficacité ;
- comment corriger les insuffisances constatées.

Un SMSI doit être adapté au contexte de l'organisation, à ses activités, à ses obligations, à ses partenaires et à ses risques.

## 1.3 Objectifs principaux

Un SMSI vise notamment à :

1. Protéger les informations sensibles et les actifs informationnels.
2. Réduire les risques de perte, de divulgation, de modification non autorisée ou d'indisponibilité.
3. Définir une gouvernance claire de la sécurité.
4. Assurer la cohérence entre les objectifs métier et les objectifs de sécurité.
5. Organiser la gestion des incidents et des crises.
6. Démontrer la maîtrise des risques auprès des clients, partenaires, autorités et auditeurs.
7. Améliorer continuellement les mesures de protection.

## 1.4 Principes fondamentaux

La mise en œuvre d'un SMSI repose sur plusieurs principes complémentaires.

|Principe|Description|
|---|---|
|Approche par les risques|Les mesures sont choisies en fonction des risques identifiés et des critères définis par l'organisation.|
|Responsabilité de la direction|La sécurité est un sujet de gouvernance et non uniquement une responsabilité informatique.|
|Proportionnalité|Les mesures doivent être adaptées aux enjeux, aux risques et aux contraintes opérationnelles.|
|Traçabilité|Les décisions importantes, les contrôles et les résultats doivent pouvoir être démontrés.|
|Amélioration continue|Les résultats d'audits, les incidents et les indicateurs alimentent les améliorations.|
|Intégration aux activités|La sécurité doit être intégrée aux processus métier, aux projets et aux opérations.|

---

# 2. Vue d’ensemble de la famille ISO/IEC 27000

## 2.1 Principales normes

|Norme|Domaine|Rôle dans le dispositif|
|---|---|---|
|ISO/IEC 27000|Vocabulaire et principes généraux|Définit les termes et fournit une vue d'ensemble de la famille.|
|ISO/IEC 27001|Exigences du SMSI|Référentiel principal pour la mise en œuvre et la certification du SMSI.|
|ISO/IEC 27002|Contrôles de sécurité|Fournit des recommandations détaillées pour les mesures de sécurité.|
|ISO/IEC 27003|Mise en œuvre|Guide la conception et le déploiement du SMSI.|
|ISO/IEC 27004|Mesure|Aide à définir et exploiter les mesures de performance et d'efficacité.|
|ISO/IEC 27005|Gestion des risques|Guide l'appréciation et le traitement des risques de sécurité de l'information.|
|ISO/IEC 27007|Audit du SMSI|Fournit des lignes directrices pour les audits des systèmes de management de la sécurité de l'information.|
|ISO/IEC 27008|Évaluation des contrôles|Guide l'évaluation des contrôles de sécurité de l'information.|
|ISO/IEC 27017|Services cloud|Complète les pratiques de sécurité applicables aux services cloud.|
|ISO/IEC 27018|Données personnelles dans le cloud|Traite de la protection des données personnelles dans certains services cloud publics agissant comme sous-traitants.|
|ISO/IEC 27019|Énergie et systèmes industriels|Adapte les pratiques de sécurité aux systèmes de contrôle du secteur énergétique.|
|ISO/IEC 27035|Gestion des incidents|Structure les activités de préparation, de détection, de réponse et d'amélioration après incident.|

La famille comprend également d'autres normes spécialisées, notamment pour la continuité, la protection des données personnelles et différents secteurs d'activité.

## 2.2 Relations entre les normes

Les normes ne remplissent pas toutes la même fonction.

- **ISO/IEC 27001** définit ce que le système de management doit satisfaire.
- **ISO/IEC 27002** aide à déterminer comment concevoir et appliquer des contrôles de sécurité.
- **ISO/IEC 27005** apporte un cadre pour analyser et traiter les risques.
- **ISO/IEC 27004** aide à mesurer les résultats et l'efficacité des mesures.
- **ISO/IEC 27003** accompagne la mise en place du système de management.
- **ISO/IEC 27007 et 27008** soutiennent les activités d'audit et d'évaluation.
- **ISO/IEC 27017, 27018 et 27019** apportent des orientations spécialisées.
- **ISO/IEC 27035** structure la gestion des incidents.

Ces textes sont complémentaires. Leur utilisation doit être adaptée aux besoins de l'organisation et aux exigences de son périmètre.

## 2.3 ISO/IEC 27001 : norme centrale

ISO/IEC 27001 est la norme d'exigences du SMSI. Elle définit les obligations relatives :

- à la compréhension du contexte ;
- au leadership ;
- à la planification ;
- aux ressources et compétences ;
- au fonctionnement ;
- à l'évaluation des performances ;
- à l'amélioration.

Elle contient également l'Annexe A, qui fournit un ensemble de contrôles de référence.

La certification ISO/IEC 27001 porte sur la conformité du SMSI aux exigences applicables de la norme, et non sur une simple vérification de la présence de produits ou de solutions de sécurité.

---

# 3. Principes fondamentaux de la sécurité de l’information

## 3.1 Confidentialité

La confidentialité vise à garantir que l'information n'est accessible qu'aux personnes, processus ou systèmes autorisés.

Exemples de mesures :

- gestion des habilitations ;
- authentification ;
- chiffrement ;
- classification de l'information ;
- protection des documents ;
- encadrement des échanges avec les tiers.

## 3.2 Intégrité

L'intégrité consiste à préserver l'exactitude et la complétude de l'information, ainsi qu'à empêcher les modifications non autorisées.

Exemples :

- contrôle des modifications ;
- gestion des versions ;
- validation des transactions ;
- journalisation ;
- contrôles de cohérence ;
- séparation des responsabilités.

## 3.3 Disponibilité

La disponibilité vise à garantir l'accès à l'information et aux services lorsque cela est nécessaire.

Exemples :

- sauvegardes ;
- redondance ;
- supervision ;
- maintenance préventive ;
- plans de continuité et de reprise ;
- tests de restauration ;
- capacité de réponse aux incidents.

## 3.4 Autres propriétés de sécurité

Selon le contexte, l'organisation peut également considérer :

- l'authenticité ;
- la traçabilité ;
- la non-répudiation ;
- la résilience ;
- la protection de la vie privée.

Ces propriétés complètent les objectifs de confidentialité, d'intégrité et de disponibilité.

## 3.5 Actifs informationnels et dépendances

L'analyse de sécurité doit prendre en compte les informations et les moyens nécessaires à leur traitement.

Exemples d'actifs :

- données clients ;
- données financières ;
- dossiers RH ;
- applications métier ;
- bases de données ;
- infrastructures réseau ;
- postes de travail ;
- services cloud ;
- équipements industriels ;
- contrats et documents de propriété intellectuelle.

Les dépendances sont également importantes : un service métier peut dépendre d'une application, elle-même dépendante d'une base de données, d'un réseau, d'un fournisseur cloud ou d'une alimentation électrique.

L'inventaire des actifs et des dépendances facilite l'analyse des conséquences d'un incident.

---

# 4. Structure détaillée d’ISO/IEC 27001:2022

## 4.1 Organisation générale

ISO/IEC 27001:2022 comprend les clauses 0 à 10, complétées par des annexes.

Les clauses 4 à 10 contiennent les exigences du système de management. L'Annexe A constitue un ensemble de contrôles de référence pour le traitement des risques.

Les clauses 0 à 3 apportent le contexte, le domaine d'application et les références nécessaires à l'interprétation du texte. Elles ne doivent pas être assimilées à des exigences de management supplémentaires équivalentes aux clauses 4 à 10.

## 4.2 Clause 0 — Introduction

Cette partie présente l'objectif de la norme et son approche générale.

Elle explique notamment que la sécurité de l'information doit être organisée dans un système de management cohérent, adapté aux besoins de l'organisation et susceptible d'être amélioré.

L'approche de management s'appuie sur la planification, l'exécution, l'évaluation et l'amélioration. Le cycle PDCA constitue une représentation pédagogique utile de cette logique.

## 4.3 Clause 1 — Domaine d'application

Cette clause précise le domaine d'application de la norme.

ISO/IEC 27001 est conçue pour être applicable aux organisations de tailles et de secteurs différents.

Le périmètre du SMSI doit néanmoins être défini et justifié par l'organisation conformément à la clause 4.3.

## 4.4 Clause 2 — Références normatives

Cette clause identifie les références normatives indispensables à l'application du texte.

ISO/IEC 27000 fournit notamment le vocabulaire commun de la famille.

Les autres normes de la famille peuvent être utilisées comme guides complémentaires sans être automatiquement des exigences de certification.

## 4.5 Clause 3 — Termes et définitions

Cette clause établit le cadre terminologique applicable à la lecture de la norme.

L'utilisation d'un vocabulaire partagé facilite la compréhension entre les équipes de sécurité, les directions métier, les auditeurs et les prestataires.

---

## 4.6 Clause 4 — Contexte de l’organisation

### Objectif

Comprendre l'environnement dans lequel le SMSI doit fonctionner et définir les limites du système de management.

|Sous-clause|Exigence|Mise en œuvre pratique|Éléments de preuve possibles|
|---|---|---|---|
|4.1|Comprendre l'organisation et son contexte|Identifier les enjeux internes et externes pertinents pour la sécurité.|Analyse de contexte, cartographie des enjeux.|
|4.2|Identifier les parties intéressées et leurs exigences|Recenser les clients, autorités, partenaires, fournisseurs et autres parties pertinentes.|Registre des parties intéressées et de leurs exigences.|
|4.3|Déterminer le périmètre du SMSI|Définir les activités, sites, systèmes, services et interfaces couverts.|Document de périmètre approuvé.|
|4.4|Établir et maintenir le SMSI|Définir les processus nécessaires et leurs interactions.|Cartographie des processus, procédures et documentation du SMSI.|

### 4.6.1 Analyse du contexte

L'analyse du contexte peut prendre en compte :

- le secteur d'activité ;
- les contraintes réglementaires ;
- les objectifs stratégiques ;
- la dépendance aux systèmes d'information ;
- les risques liés aux fournisseurs ;
- les exigences contractuelles ;
- les contraintes de continuité ;
- les évolutions technologiques.

### 4.6.2 Parties intéressées

Les parties intéressées peuvent comprendre :

- la direction ;
- les collaborateurs ;
- les clients ;
- les fournisseurs ;
- les sous-traitants ;
- les autorités de contrôle ;
- les organismes de certification ;
- les partenaires techniques.

Il convient de déterminer lesquelles de leurs exigences sont pertinentes pour le SMSI.

### 4.6.3 Définition du périmètre

Le périmètre doit permettre de comprendre précisément ce qui est couvert par le système de management.

Il doit prendre en considération les interfaces et dépendances avec les activités, systèmes et services situés hors du périmètre.

**Exemple :** une entreprise peut inclure dans son SMSI son service de développement logiciel, son infrastructure de production et le support associé, tout en documentant les dépendances vis-à-vis d'un fournisseur cloud.

Un périmètre trop imprécis rend difficile l'évaluation des risques et la préparation de l'audit.

---

## 4.7 Clause 5 — Leadership

### Objectif

Garantir que la direction assume ses responsabilités dans le fonctionnement du SMSI.

|Sous-clause|Exigence|Mise en œuvre pratique|Éléments de preuve possibles|
|---|---|---|---|
|5.1|Leadership et engagement|Intégrer la sécurité aux décisions, attribuer les ressources et soutenir les objectifs.|Comptes rendus de direction, budgets, décisions.|
|5.2|Politique de sécurité|Établir une politique adaptée au contexte et aux objectifs.|Politique approuvée, preuve de communication.|
|5.3|Rôles, responsabilités et autorités|Définir et communiquer les responsabilités relatives au SMSI.|Organigramme, fiches de fonction, matrice RACI.|

### 4.7.1 Engagement de la direction

La direction doit démontrer son engagement, notamment en :

- intégrant les exigences du SMSI aux processus de l'organisation ;
- mettant à disposition les ressources nécessaires ;
- communiquant sur l'importance de la sécurité ;
- soutenant les personnes responsables du SMSI ;
- favorisant l'amélioration continue.

La responsabilité de la sécurité ne peut pas être entièrement déléguée au seul RSSI.

### 4.7.2 Politique de sécurité de l'information

La politique définit les orientations générales de l'organisation.

Elle peut notamment préciser :

- les objectifs de sécurité ;
- les principes de gestion des risques ;
- les responsabilités ;
- les règles générales d'utilisation des ressources ;
- les obligations de conformité ;
- les principes de signalement des incidents ;
- les modalités de révision.

Elle doit être approuvée, communiquée et rendue disponible aux parties concernées selon les exigences applicables.

### 4.7.3 Répartition des responsabilités

Les responsabilités doivent être compréhensibles et cohérentes avec l'organisation.

Exemple de répartition :

|Fonction|Responsabilités possibles|
|---|---|
|Direction|Orientations, arbitrages, ressources et supervision.|
|RSSI|Coordination du dispositif de sécurité et suivi des risques.|
|DSI|Mise en œuvre et exploitation des mesures techniques relevant de son périmètre.|
|Responsables métier|Identification des besoins de protection et validation des risques métier.|
|RH|Intégration des exigences de sécurité dans les processus RH concernés.|
|Juridique et conformité|Analyse des obligations applicables et suivi de leur prise en compte.|
|Collaborateurs|Respect des règles et signalement des événements suspects.|

Cette répartition constitue un exemple d'organisation et doit être adaptée au contexte réel.

---

## 4.8 Clause 6 — Planification

### Objectif

Déterminer les actions à mener face aux risques et opportunités, puis définir les objectifs de sécurité.

|Sous-clause|Exigence|Mise en œuvre pratique|Éléments de preuve possibles|
|---|---|---|---|
|6.1|Actions face aux risques et opportunités|Identifier les risques et opportunités liés au SMSI et planifier les actions nécessaires.|Analyse de contexte, plan d'action.|
|6.1.2|Appréciation des risques de sécurité|Définir et appliquer une méthode cohérente d'appréciation des risques.|Méthodologie, scénarios de risques, registre des risques.|
|6.1.3|Traitement des risques de sécurité|Choisir les options de traitement, sélectionner les contrôles et produire la Déclaration d'applicabilité.|Plan de traitement, justification des contrôles, SoA.|
|6.2|Objectifs de sécurité|Définir des objectifs cohérents, suivis et évaluables.|Indicateurs, objectifs approuvés, plans de suivi.|
|6.3|Planification des changements|Planifier les modifications du SMSI de manière maîtrisée.|Dossiers de changement, analyses d'impact.|

### 4.8.1 Méthodologie d'appréciation des risques

L'organisation doit établir des critères permettant de déterminer :

- comment les risques sont identifiés ;
- comment leurs conséquences et leur vraisemblance sont analysées ;
- comment les niveaux de risque sont évalués ;
- quels risques sont acceptables ;
- quand une nouvelle appréciation est nécessaire.

La méthode doit être cohérente et reproductible.

### 4.8.2 Options de traitement

Les options de traitement peuvent inclure :

- **Réduction :** diminuer la vraisemblance ou les conséquences d'un risque.
- **Évitement :** supprimer l'activité ou la situation génératrice du risque.
- **Partage ou transfert :** répartir certains aspects du risque avec un tiers, dans les limites contractuelles et juridiques applicables.
- **Acceptation :** conserver le risque après une décision appropriée.

Le transfert contractuel ou assurantiel ne supprime pas nécessairement le risque résiduel ni les responsabilités de l'organisation.

### 4.8.3 Objectifs de sécurité

Un objectif doit pouvoir être suivi et évalué.

Exemples d'objectifs internes :

- augmenter la couverture des systèmes critiques par une authentification renforcée ;
- réduire les délais de correction des vulnérabilités prioritaires ;
- améliorer la réussite des tests de restauration ;
- augmenter le taux de réalisation des actions correctives ;
- réduire le délai de détection des incidents majeurs.

Les valeurs cibles et les délais doivent être fixés par l'organisation en fonction de son contexte.

---

## 4.9 Clause 7 — Support

### Objectif

Fournir les moyens humains, techniques, organisationnels et documentaires nécessaires au SMSI.

|Sous-clause|Exigence|Mise en œuvre pratique|Éléments de preuve possibles|
|---|---|---|---|
|7.1|Ressources|Déterminer les moyens nécessaires au fonctionnement du SMSI.|Budget, plan de ressources, affectations.|
|7.2|Compétence|S'assurer que les personnes disposent des compétences nécessaires.|Formations, qualifications, évaluations.|
|7.3|Sensibilisation|Faire connaître les règles et responsabilités de sécurité.|Supports, campagnes, résultats de sensibilisation.|
|7.4|Communication|Définir les modalités de communication pertinentes.|Plan de communication, consignes, procédures.|
|7.5|Informations documentées|Créer, mettre à jour et maîtriser les documents et enregistrements requis.|Référentiel documentaire, historique des versions, droits d'accès.|

### 4.9.1 Compétences et sensibilisation

Les actions de sensibilisation peuvent porter sur :

- le phishing ;
- les mots de passe et l'authentification ;
- la classification des informations ;
- l'utilisation des équipements ;
- le télétravail ;
- la gestion des supports ;
- la déclaration des incidents ;
- les règles de traitement des données personnelles.

Les actions doivent être adaptées aux risques et aux responsabilités des populations concernées.

### 4.9.2 Maîtrise documentaire

La documentation doit être identifiable, accessible aux personnes autorisées et protégée contre les modifications ou suppressions non maîtrisées.

Le dispositif documentaire doit permettre, selon les besoins :

- d'identifier la version applicable ;
- de connaître l'auteur ou l'approbateur ;
- de retrouver les décisions et validations ;
- de conserver les enregistrements requis ;
- de gérer les droits d'accès ;
- de maîtriser la diffusion des informations sensibles.

La norme n'impose pas nécessairement un outil documentaire particulier.

---

## 4.10 Clause 8 — Fonctionnement

### Objectif

Exécuter les processus planifiés et mettre en œuvre les décisions relatives au traitement des risques.

|Sous-clause|Exigence|Mise en œuvre pratique|Éléments de preuve possibles|
|---|---|---|---|
|8.1|Planification et maîtrise opérationnelles|Définir et contrôler les processus nécessaires au SMSI.|Procédures opérationnelles, comptes rendus, dossiers de changement.|
|8.2|Appréciation des risques|Réaliser les appréciations aux intervalles prévus et lorsque des changements significatifs l'exigent.|Registres actualisés, analyses d'impact.|
|8.3|Traitement des risques|Mettre en œuvre le plan de traitement et conserver les preuves pertinentes.|Plan de traitement suivi, tickets, rapports de mise en œuvre.|

### 4.10.1 Maîtrise opérationnelle

Les processus de sécurité doivent être appliqués dans les activités réelles.

Cela peut concerner :

- la gestion des comptes ;
- l'administration des infrastructures ;
- le déploiement des applications ;
- la gestion des changements ;
- les sauvegardes ;
- la gestion des vulnérabilités ;
- la surveillance ;
- les relations avec les fournisseurs.

### 4.10.2 Gestion des changements

Les changements susceptibles d'affecter la sécurité doivent être évalués et maîtrisés.

Une procédure peut prévoir :

1. La demande de changement.
2. L'analyse des impacts.
3. L'identification des risques.
4. La validation par les personnes habilitées.
5. La mise en œuvre.
6. Les tests et vérifications.
7. La mise à jour de la documentation.

Cette démarche doit être adaptée à la criticité et à l'urgence du changement.

---

## 4.11 Clause 9 — Évaluation des performances

### Objectif

Vérifier si le SMSI fonctionne conformément aux exigences et atteint les objectifs définis.

|Sous-clause|Exigence|Mise en œuvre pratique|Éléments de preuve possibles|
|---|---|---|---|
|9.1|Surveillance, mesure, analyse et évaluation|Définir ce qui doit être mesuré, comment et à quelle fréquence.|Tableau de bord, indicateurs, rapports d'analyse.|
|9.2|Audit interne|Planifier et réaliser des audits selon des critères définis.|Programme d'audit, rapports, preuves et constats.|
|9.3|Revue de direction|Examiner périodiquement l'adéquation, la pertinence et l'efficacité du SMSI.|Comptes rendus, décisions, plans d'action.|

### 4.11.1 Mesure de l'efficacité

Un indicateur ne doit pas seulement mesurer l'activité réalisée. Il doit, lorsque cela est possible, contribuer à évaluer le résultat obtenu.

Exemple :

- Indicateur d'activité : nombre de campagnes de sensibilisation réalisées.
- Indicateur de résultat : proportion de collaborateurs ayant correctement identifié les tentatives de phishing lors des exercices.

### 4.11.2 Audit interne

L'audit interne vise à vérifier la conformité du SMSI aux exigences applicables et aux dispositions définies par l'organisation.

Les auditeurs doivent disposer d'une compétence appropriée et agir avec objectivité et impartialité.

Les constats doivent être étayés par des preuves suffisantes.

### 4.11.3 Revue de direction

La revue de direction permet de prendre des décisions sur :

- les évolutions du contexte ;
- les résultats des audits ;
- les indicateurs ;
- les incidents ;
- les non-conformités ;
- l'état des actions correctives ;
- les risques résiduels ;
- les besoins en ressources ;
- les possibilités d'amélioration.

Elle doit déboucher sur des décisions et actions pertinentes, et pas uniquement sur une présentation de tableaux de bord.

---

## 4.12 Clause 10 — Amélioration

### Objectif

Corriger les non-conformités et améliorer continuellement le SMSI.

|Sous-clause|Exigence|Mise en œuvre pratique|Éléments de preuve possibles|
|---|---|---|---|
|10.1|Généralités|Identifier et mettre en œuvre les possibilités d'amélioration.|Plans d'amélioration, décisions, indicateurs.|
|10.2|Non-conformité et action corrective|Réagir aux écarts, en rechercher les causes et évaluer l'efficacité des actions.|Registre des non-conformités, analyses de causes, preuves de clôture.|

### 4.12.1 Traitement d'une non-conformité

Le traitement peut comprendre :

1. L'enregistrement du constat.
2. La mise en œuvre d'une correction immédiate si nécessaire.
3. L'analyse de la cause.
4. L'évaluation de l'existence d'écarts similaires ailleurs.
5. La définition d'une action corrective.
6. La mise en œuvre et le suivi.
7. La vérification de l'efficacité.
8. La clôture documentée.

Une correction immédiate ne garantit pas à elle seule la disparition de la cause.

### 4.12.2 Amélioration continue

Les améliorations peuvent être alimentées par :

- les audits ;
- les incidents ;
- les tests de continuité ;
- les résultats des indicateurs ;
- les changements technologiques ;
- les évolutions réglementaires ;
- les retours des collaborateurs ;
- les évaluations des fournisseurs.

---

# 5. Annexe A : les 93 contrôles de sécurité

## 5.1 Rôle de l'Annexe A

L'Annexe A d'ISO/IEC 27001:2022 présente 93 contrôles de référence répartis en quatre thèmes.

Ces contrôles contribuent au traitement des risques de sécurité de l'information.

Ils ne doivent pas être interprétés comme une liste de 93 mesures automatiquement obligatoires dans toutes les organisations. L'organisation doit déterminer les contrôles nécessaires au traitement des risques, considérer les contrôles de l'Annexe A et justifier les inclusions et exclusions dans sa Déclaration d'applicabilité.

D'autres contrôles peuvent être nécessaires en fonction du contexte et des obligations applicables.

## 5.2 Répartition des contrôles

|Thème|Plage|Nombre|Domaine|
|---|---|---|---|
|A.5 — Contrôles organisationnels|5.1 à 5.37|37|Gouvernance, politiques, responsabilités, fournisseurs, incidents et continuité.|
|A.6 — Contrôles liés aux personnes|6.1 à 6.8|8|Responsabilités humaines, sensibilisation et conditions de travail.|
|A.7 — Contrôles physiques|7.1 à 7.14|14|Protection des locaux, équipements et environnements physiques.|
|A.8 — Contrôles technologiques|8.1 à 8.34|34|Accès, systèmes, données, réseaux, développement et surveillance.|
|**Total**||**93**||

## 5.3 Contrôles organisationnels — A.5

Les contrôles organisationnels définissent le cadre général de gouvernance et de maîtrise des risques.

Ils couvrent notamment :

- les politiques de sécurité ;
- les responsabilités ;
- la séparation des tâches ;
- les relations avec les autorités ;
- les relations avec les groupes spécialisés ;
- la veille sur les menaces ;
- la gestion de projet ;
- l'inventaire des informations et actifs associés ;
- la classification ;
- le transfert d'informations ;
- le contrôle d'accès ;
- la gestion des fournisseurs ;
- la sécurité dans les contrats ;
- la gestion des incidents ;
- la continuité ;
- la conformité aux exigences applicables.

### Exemples de mise en œuvre

|Domaine|Mesure possible|Preuve possible|
|---|---|---|
|Politiques|Politique de sécurité approuvée et diffusée.|Version approuvée, historique de diffusion.|
|Inventaire|Inventaire des actifs et propriétaires.|Registre des actifs, revues périodiques.|
|Classification|Règles de classification et de manipulation.|Politique de classification, exemples d'application.|
|Fournisseurs|Évaluation des risques et exigences contractuelles.|Évaluations, contrats, plans de suivi.|
|Incidents|Procédure de déclaration et de traitement.|Registre des incidents, rapports et actions.|
|Continuité|Plans adaptés aux activités critiques.|Plans, résultats d'exercices, actions correctives.|

## 5.4 Contrôles liés aux personnes — A.6

Ces contrôles traitent les aspects humains de la sécurité.

Ils concernent notamment :

- les vérifications préalables lorsqu'elles sont appropriées et licites ;
- les conditions de travail ;
- la sensibilisation ;
- la formation ;
- les responsabilités en cas de changement de poste ou de départ ;
- les engagements et obligations pertinents ;
- les processus de signalement des événements de sécurité.

### Exemples de mise en œuvre

- Intégrer les consignes de sécurité au parcours d'arrivée.
- Adapter les formations aux rôles et aux risques.
- Retirer ou modifier les habilitations lors d'un départ ou d'un changement de fonction.
- Prévoir un moyen simple de signaler un événement suspect.
- Vérifier que les collaborateurs comprennent les règles applicables.

## 5.5 Contrôles physiques — A.7

Les contrôles physiques protègent les locaux, les équipements et les supports contre les accès non autorisés, les dommages, les pertes et les perturbations.

Ils couvrent notamment :

- les périmètres de sécurité ;
- les contrôles d'entrée ;
- la protection des bureaux et salles sensibles ;
- la surveillance physique ;
- les risques environnementaux ;
- la sécurité des équipements ;
- les supports de stockage ;
- les postes de travail ;
- la protection des équipements hors site.

### Exemples de mise en œuvre

- Contrôler les accès aux salles informatiques.
- Protéger les équipements contre les coupures électriques et les températures excessives.
- Encadrer les interventions des visiteurs.
- Sécuriser les équipements mobiles.
- Définir les règles de destruction des supports.
- Protéger les documents papier sensibles.

## 5.6 Contrôles technologiques — A.8

Les contrôles technologiques concernent les systèmes, applications, réseaux et données.

Ils portent notamment sur :

- les terminaux utilisateurs ;
- les droits d'accès ;
- l'authentification ;
- les capacités de calcul et de stockage ;
- la protection contre les logiciels malveillants ;
- les vulnérabilités ;
- la configuration ;
- la suppression des informations ;
- la prévention des fuites ;
- les sauvegardes ;
- la journalisation ;
- la surveillance ;
- la synchronisation des horloges ;
- les réseaux ;
- le développement sécurisé ;
- les tests ;
- la gestion des changements ;
- la protection des environnements de production.

### Exemples de mise en œuvre

|Domaine|Mesure possible|Preuve possible|
|---|---|---|
|Accès|Attribution des droits selon les besoins.|Matrice des habilitations, revues d'accès.|
|Authentification|Authentification renforcée pour les accès sensibles.|Paramétrage, rapports de couverture.|
|Vulnérabilités|Évaluation et correction selon la criticité.|Rapports de scan, tickets de correction.|
|Sauvegardes|Sauvegardes planifiées et tests de restauration.|Journaux de sauvegarde, rapports de tests.|
|Journalisation|Collecte et protection des journaux pertinents.|Configuration, échantillons de journaux.|
|Développement|Revue de code et tests de sécurité adaptés.|Rapports de revue, résultats des tests.|
|Réseau|Segmentation et filtrage selon les besoins.|Schémas réseau, règles de filtrage.|

## 5.7 Déclaration d'applicabilité (SoA)

La Déclaration d'applicabilité, ou _Statement of Applicability_ (SoA), constitue un document central du SMSI.

Elle identifie les contrôles nécessaires, indique s'ils sont mis en œuvre et justifie les exclusions des contrôles de référence.

Elle doit être cohérente avec l'appréciation des risques et le traitement retenu.

Une structure de travail possible est la suivante :

|Champ|Contenu|
|---|---|
|Identifiant|Référence du contrôle.|
|Contrôle|Intitulé du contrôle de référence.|
|Applicabilité|Applicable ou non applicable.|
|Justification|Motif de l'inclusion ou de l'exclusion.|
|État de mise en œuvre|Non commencé, en cours, déployé ou autre statut interne.|
|Responsable|Fonction chargée du contrôle.|
|Risques associés|Risques que le contrôle contribue à traiter.|
|Preuves|Documents, configurations, rapports ou enregistrements pertinents.|

Les champs relatifs au statut, au responsable et aux preuves constituent une extension de gestion utile ; ils ne remplacent pas les informations exigées par la norme.

---

# 6. ISO/IEC 27002 : bonnes pratiques de sécurité

## 6.1 Objectif

ISO/IEC 27002 fournit des recommandations de mise en œuvre des contrôles de sécurité de l'information.

Elle complète l'Annexe A d'ISO/IEC 27001 en apportant des indications plus détaillées sur les objectifs des contrôles et les moyens envisageables pour les mettre en œuvre.

Elle constitue un guide de bonnes pratiques et non, à elle seule, une norme d'exigences certifiables pour un SMSI.

## 6.2 Organisation des contrôles

L'édition 2022 suit les quatre thèmes utilisés dans l'Annexe A d'ISO/IEC 27001:2022 :

- organisationnel ;
- personnes ;
- physique ;
- technologique.

Les contrôles peuvent également être caractérisés selon différents attributs, ce qui facilite leur recherche et leur analyse.

## 6.3 Utilisation dans un projet de sécurité

Une démarche pratique consiste à :

1. Identifier le risque à traiter.
2. Identifier les contrôles de référence pertinents.
3. Consulter les recommandations de mise en œuvre.
4. Choisir des mesures adaptées au contexte.
5. Définir un responsable et des modalités de contrôle.
6. Documenter les preuves de mise en œuvre.
7. Vérifier l'efficacité du dispositif.

Le choix final doit tenir compte des contraintes métier, des dépendances techniques, des obligations contractuelles et des risques résiduels.

## 6.4 Exemple : gestion des accès

Un besoin de maîtrise des accès peut conduire à examiner :

- les règles de contrôle d'accès ;
- la gestion des identités ;
- les droits privilégiés ;
- l'authentification ;
- les revues périodiques des habilitations ;
- la traçabilité des opérations sensibles.

La solution retenue dépend de l'architecture, de la criticité des systèmes et des exigences applicables.

---

# 7. ISO/IEC 27005 : gestion des risques

## 7.1 Objectif

ISO/IEC 27005 fournit des lignes directrices pour gérer les risques liés à la sécurité de l'information.

Elle aide à mettre en place un processus cohérent avec les exigences de planification et de fonctionnement d'ISO/IEC 27001.

## 7.2 Processus de gestion des risques

### Étape 1 — Définir le contexte

L'organisation définit :

- le périmètre de l'analyse ;
- les objectifs métier ;
- les critères de risque ;
- les niveaux d'acceptation ;
- les responsabilités ;
- les contraintes pertinentes.

### Étape 2 — Identifier les risques

L'identification consiste à recenser les situations susceptibles de compromettre la sécurité.

L'analyse peut considérer :

- les actifs ;
- les événements redoutés ;
- les menaces ;
- les vulnérabilités ;
- les causes ;
- les conséquences ;
- les mesures existantes.

Il est utile de raisonner en scénarios plutôt que de produire uniquement une liste de menaces génériques.

### Étape 3 — Analyser les risques

L'organisation estime le niveau de risque à partir de critères définis.

Une méthode qualitative peut utiliser des niveaux tels que faible, modéré, élevé et critique.

Une méthode quantitative peut exploiter des estimations chiffrées lorsqu'elles sont suffisamment fiables.

La méthode doit être documentée et appliquée de manière cohérente.

### Étape 4 — Évaluer les risques

Les résultats sont comparés aux critères d'acceptation.

L'organisation détermine les risques qui nécessitent un traitement prioritaire et ceux qui peuvent être acceptés dans les conditions prévues.

### Étape 5 — Traiter les risques

Le traitement peut consister à réduire, éviter, partager ou accepter le risque.

Les mesures retenues doivent être planifiées, affectées à des responsables et suivies.

### Étape 6 — Accepter le risque résiduel

Après le traitement, l'organisation évalue le risque restant.

L'acceptation doit être réalisée par une personne disposant de l'autorité appropriée, selon les règles internes.

### Étape 7 — Surveiller et réexaminer

Les risques doivent être réévalués lorsque le contexte, les actifs, les menaces, les vulnérabilités ou les mesures évoluent de façon significative.

## 7.3 Exemple de registre des risques

Exemple fictif destiné à illustrer la structure d'un registre :

|ID|Scénario de risque|Conséquence|Mesures possibles|Responsable|
|---|---|---|---|---|
|R-001|Compromission d'un compte administrateur|Accès non autorisé à des systèmes critiques.|Authentification renforcée, comptes dédiés, journalisation, revues des droits.|Responsable infrastructure|
|R-002|Restauration impossible après une attaque|Interruption prolongée de l'activité.|Sauvegardes protégées, tests de restauration, procédures de reprise.|Responsable exploitation|
|R-003|Divulgation de données par erreur humaine|Atteinte à la confidentialité et conséquences contractuelles ou réglementaires.|Classification, contrôle des partages, sensibilisation, mesures de prévention des fuites.|Responsable métier|
|R-004|Compromission d'un fournisseur|Propagation d'un incident vers les systèmes internes.|Évaluation des fournisseurs, exigences contractuelles, limitation des accès, suivi des risques.|Responsable achats et sécurité|

Ces exemples ne représentent pas une évaluation réelle. Le niveau de risque doit être déterminé à partir des critères et des données de l'organisation.

## 7.4 Exemple de cotation qualitative

Une organisation peut choisir une échelle de vraisemblance et une échelle d'impact.

Exemple purement illustratif :

|Vraisemblance / Impact|Faible|Modéré|Élevé|
|---|---|---|---|
|Faible|Faible|Faible|Modéré|
|Moyenne|Faible|Modéré|Élevé|
|Forte|Modéré|Élevé|Critique|

Cette matrice ne constitue pas une exigence imposée par ISO/IEC 27005. L'organisation doit définir et justifier sa propre méthode.

---

# 8. ISO/IEC 27004 : mesure et indicateurs

## 8.1 Objectif

ISO/IEC 27004 apporte des lignes directrices pour surveiller, mesurer, analyser et évaluer les performances du SMSI et des mesures de sécurité.

La mesure permet de dépasser une approche fondée uniquement sur l'existence de procédures.

## 8.2 Caractéristiques d'un indicateur utile

Un indicateur doit être :

- pertinent au regard d'un objectif ;
- défini sans ambiguïté ;
- calculable à partir de données accessibles ;
- exploitable pour la prise de décision ;
- associé à une fréquence de suivi ;
- interprété dans son contexte.

Il est utile de préciser le responsable, la source de données, la cible et les limites de l'indicateur.

## 8.3 Exemples d'indicateurs

|Domaine|Indicateur possible|Utilité|
|---|---|---|
|Gestion des accès|Proportion des comptes privilégiés couverts par les mesures de protection définies.|Évaluer la couverture des accès sensibles.|
|Vulnérabilités|Nombre de vulnérabilités prioritaires dépassant le délai interne de correction.|Identifier les retards de traitement.|
|Sauvegardes|Taux de tests de restauration réussis.|Évaluer la capacité réelle de restauration.|
|Incidents|Délai médian entre détection et qualification.|Suivre la réactivité du dispositif.|
|Formation|Taux de réalisation des formations prévues.|Suivre la couverture de la sensibilisation.|
|Audit|Proportion des actions correctives clôturées dans les délais convenus.|Évaluer le traitement des écarts.|

## 8.4 Interprétation des résultats

Un indicateur ne doit pas être interprété isolément.

Par exemple, une augmentation du nombre d'incidents déclarés peut correspondre à une dégradation de la situation, mais également à une amélioration du signalement.

L'analyse doit considérer les tendances, la qualité des données, les changements de périmètre et les effets recherchés.

---

# 9. ISO/IEC 27003 : mise en œuvre du SMSI

## 9.1 Objectif

ISO/IEC 27003 accompagne la mise en œuvre d'un SMSI conforme à ISO/IEC 27001.

Elle peut être utilisée pour structurer un projet de déploiement, notamment lorsque l'organisation part d'un dispositif de sécurité incomplet ou dispersé.

## 9.2 Phases d'un projet de mise en œuvre

### Phase 1 — Cadrage

- Définir les objectifs du projet.
- Identifier les parties prenantes.
- Déterminer le périmètre.
- Clarifier les ressources et les responsabilités.
- Établir un calendrier réaliste.

### Phase 2 — État des lieux

- Examiner les pratiques existantes.
- Identifier les écarts par rapport aux exigences.
- Recenser les documents disponibles.
- Analyser les contrôles déjà déployés.
- Identifier les risques prioritaires.

### Phase 3 — Conception

- Définir la gouvernance.
- Élaborer la politique de sécurité.
- Construire la méthode de gestion des risques.
- Définir les objectifs et les indicateurs.
- Organiser la gestion documentaire.

### Phase 4 — Traitement des risques

- Réaliser l'appréciation des risques.
- Choisir les options de traitement.
- Définir les contrôles nécessaires.
- Construire la Déclaration d'applicabilité.
- Affecter les actions aux responsables.

### Phase 5 — Déploiement

- Mettre en œuvre les mesures.
- Formaliser les processus.
- Former et sensibiliser les collaborateurs.
- Organiser la collecte des preuves.
- Suivre les actions et les risques résiduels.

### Phase 6 — Évaluation

- Mesurer les résultats.
- Réaliser les audits internes.
- Traiter les non-conformités.
- Organiser la revue de direction.

### Phase 7 — Préparation à la certification

- Vérifier la cohérence documentaire.
- S'assurer que les processus fonctionnent réellement.
- Préparer les interlocuteurs.
- Vérifier les preuves disponibles.
- Traiter les écarts identifiés avant l'audit externe.

Ces phases constituent une organisation de projet indicative. Elles ne remplacent pas les exigences normatives.

---

# 10. ISO/IEC 27007 et 27008 : audit et évaluation

## 10.1 ISO/IEC 27007

ISO/IEC 27007 fournit des lignes directrices pour l'audit des systèmes de management de la sécurité de l'information.

Elle complète les principes généraux d'audit des systèmes de management.

L'audit peut examiner :

- la conformité aux exigences applicables ;
- la cohérence des processus ;
- l'efficacité des contrôles ;
- la maîtrise des risques ;
- la qualité des preuves ;
- le suivi des actions correctives.

## 10.2 ISO/IEC 27008

ISO/IEC 27008 fournit des lignes directrices pour l'évaluation des contrôles de sécurité de l'information.

L'évaluation peut porter sur la conception d'un contrôle, sa mise en œuvre et son fonctionnement effectif.

Un contrôle documenté n'est pas nécessairement un contrôle efficace : les preuves doivent permettre de vérifier son application réelle.

## 10.3 Différence entre contrôle documentaire et contrôle opérationnel

|Contrôle documentaire|Contrôle opérationnel|
|---|---|
|Une procédure de gestion des accès existe.|Les droits sont attribués, modifiés et retirés conformément à la procédure.|
|Une politique de sauvegarde est approuvée.|Les sauvegardes sont réalisées et les restaurations sont testées.|
|Une procédure de gestion des incidents existe.|Les incidents sont effectivement enregistrés, qualifiés et traités.|
|Une procédure de revue des fournisseurs est définie.|Les fournisseurs concernés sont évalués et les actions sont suivies.|

## 10.4 Cycle d'un audit interne

1. Définition des objectifs et du périmètre.
2. Préparation du programme et des critères.
3. Collecte des documents et des éléments de preuve.
4. Entretiens et vérifications.
5. Analyse des constats.
6. Restitution des résultats.
7. Traitement des non-conformités.
8. Suivi de l'efficacité des actions correctives.

L'audit doit s'appuyer sur des preuves vérifiables et sur des critères définis.

---

# 11. ISO/IEC 27017 et 27018 : sécurité du cloud

## 11.1 ISO/IEC 27017

ISO/IEC 27017 apporte des recommandations de sécurité spécifiques aux services cloud.

Elle prend en considération les responsabilités des fournisseurs de services cloud et des clients qui les utilisent.

Les thèmes concernés peuvent inclure :

- la répartition des responsabilités ;
- la gestion des accès ;
- la protection des environnements cloud ;
- l'administration des services ;
- les opérations ;
- la gestion des incidents ;
- la surveillance et la traçabilité ;
- la suppression ou la restitution des données.

### Points de vigilance pour le client cloud

L'utilisation d'un service cloud ne transfère pas automatiquement l'ensemble des responsabilités de sécurité au fournisseur.

Le client doit notamment comprendre :

- les responsabilités qui lui incombent ;
- les mesures opérées par le fournisseur ;
- les modalités d'accès aux preuves ;
- les conditions de notification des incidents ;
- les mécanismes de sauvegarde et de restauration ;
- les conditions de réversibilité ;
- les risques liés à la dépendance au fournisseur.

## 11.2 ISO/IEC 27018

ISO/IEC 27018 traite de la protection des données personnelles dans certains environnements de cloud public lorsque le fournisseur intervient comme sous-traitant.

Elle complète les mesures générales de sécurité par des recommandations relatives au traitement des données personnelles.

Les sujets à examiner comprennent notamment :

- les finalités de traitement ;
- les responsabilités contractuelles ;
- la transparence ;
- les accès aux données ;
- les incidents affectant les données personnelles ;
- les transferts et sous-traitants ultérieurs ;
- la suppression ou la restitution des données.

ISO/IEC 27018 ne remplace pas les obligations légales applicables en matière de protection des données, notamment celles du RGPD lorsqu'il s'applique.

---

# 12. ISO/IEC 27019 : systèmes industriels du secteur énergétique

## 12.1 Objectif

ISO/IEC 27019 adapte les pratiques de sécurité de l'information aux systèmes de contrôle et d'automatisation utilisés dans le secteur énergétique.

Elle concerne notamment les environnements industriels dans lesquels une interruption, une modification non autorisée ou une défaillance technique peut avoir des conséquences importantes sur les opérations.

Les systèmes concernés peuvent comprendre des composants de contrôle, des systèmes de supervision et des infrastructures industrielles connectées.

## 12.2 Particularités des environnements industriels

Les environnements industriels présentent des contraintes spécifiques :

- exigences élevées de disponibilité ;
- cycles de vie longs des équipements ;
- dépendance à des technologies anciennes ;
- contraintes de maintenance ;
- difficultés de mise à jour ;
- interaction entre systèmes informatiques et équipements physiques ;
- conséquences potentielles sur la sécurité des personnes et la continuité de la production.

Les décisions de sécurité doivent prendre en compte les impératifs opérationnels et la sûreté de fonctionnement.

## 12.3 Principaux axes de sécurité

### Segmentation des réseaux

La segmentation permet de limiter les communications entre les zones industrielles et les systèmes bureautiques.

Elle doit être accompagnée de règles de filtrage, de mécanismes de supervision et d'une maîtrise des flux nécessaires aux opérations.

### Contrôle des accès

Les accès aux systèmes de contrôle doivent être limités aux personnes et aux équipements autorisés.

Les accès distants doivent être encadrés et surveillés en fonction des risques.

### Gestion des changements

Les modifications de configuration doivent être évaluées et testées selon des procédures adaptées à la criticité des installations.

### Surveillance et journalisation

La collecte des événements doit tenir compte des capacités techniques des équipements et des contraintes de fonctionnement.

### Continuité des opérations

Les scénarios de reprise doivent considérer les dépendances industrielles, les pièces de rechange, les équipements de remplacement et les procédures de fonctionnement dégradé.

## 12.4 Exemple d'approche de mise en œuvre

Pour une installation énergétique, une démarche peut consister à :

1. Inventorier les systèmes industriels et leurs dépendances.
2. Identifier les fonctions critiques.
3. Cartographier les flux réseau.
4. Analyser les scénarios de risque.
5. Définir les mesures de segmentation et de contrôle d'accès.
6. Encadrer les interventions des prestataires.
7. Tester les procédures de reprise.
8. Vérifier la capacité de détection et de réponse aux incidents.

Les mesures doivent être adaptées aux équipements concernés et validées par les responsables techniques et opérationnels.

---

# 13. ISO/IEC 27035 : gestion des incidents

## 13.1 Objectif

ISO/IEC 27035 fournit un cadre pour organiser la gestion des incidents de sécurité de l'information.

La gestion des incidents ne consiste pas uniquement à réagir à une attaque. Elle couvre également la préparation, la détection, la qualification, la réponse, la reprise et l'amélioration.

## 13.2 Événement, alerte et incident

Il est utile de distinguer plusieurs notions :

- **Événement :** fait observable susceptible d'avoir une signification pour la sécurité.
- **Alerte :** signal généré par un outil ou une personne nécessitant une analyse.
- **Incident :** événement ou ensemble d'événements répondant aux critères définis par l'organisation et nécessitant une réponse adaptée.

Les critères de qualification doivent être documentés afin de permettre une prise de décision cohérente.

## 13.3 Cycle de gestion des incidents

### Phase 1 — Préparation

- Définir les rôles et responsabilités.
- Établir les procédures de réponse.
- Préparer les outils et moyens de communication.
- Former les équipes.
- Identifier les interlocuteurs internes et externes.
- Préparer les mécanismes d'escalade.

### Phase 2 — Détection et signalement

- Collecter les alertes.
- Recevoir les signalements.
- Identifier les événements suspects.
- Préserver les informations utiles.
- Enregistrer les éléments nécessaires à l'analyse.

### Phase 3 — Évaluation et décision

- Qualifier l'incident.
- Déterminer son périmètre.
- Évaluer les conséquences possibles.
- Définir la priorité.
- Décider des mesures de réponse.
- Déterminer les éventuelles obligations de notification.

### Phase 4 — Réponse

Selon le scénario, la réponse peut inclure :

- l'isolement d'un système ;
- le blocage d'un compte ;
- la restriction d'un accès ;
- la suppression d'un composant malveillant ;
- la correction d'une vulnérabilité ;
- la protection des preuves ;
- la coordination avec les équipes concernées.

Les actions doivent être adaptées à la gravité de l'incident et à la continuité des activités.

### Phase 5 — Reprise

- Restaurer les systèmes selon les procédures prévues.
- Vérifier l'intégrité des données.
- Contrôler l'absence de persistance de la menace lorsque cela est pertinent.
- Surveiller les systèmes rétablis.
- Valider le retour au fonctionnement attendu.

### Phase 6 — Retour d'expérience

- Reconstituer la chronologie.
- Identifier les causes et facteurs contributifs.
- Évaluer l'efficacité de la réponse.
- Déterminer les mesures correctives.
- Mettre à jour les procédures et l'analyse de risques.
- Partager les enseignements pertinents.

## 13.4 Registre des incidents

Le registre peut contenir :

|Champ|Description|
|---|---|
|Identifiant|Référence unique de l'incident.|
|Date de détection|Moment où l'incident a été détecté ou signalé.|
|Source|Outil de supervision, collaborateur, fournisseur ou autre origine.|
|Description|Faits connus et systèmes concernés.|
|Classification|Catégorie et niveau de priorité selon les règles internes.|
|Responsable|Personne ou équipe chargée de la coordination.|
|Actions|Mesures réalisées et décisions prises.|
|Statut|Ouvert, en cours, contenu, résolu ou autre statut défini.|
|Conséquences|Impacts confirmés ou évalués.|
|Retour d'expérience|Causes identifiées, actions correctives et enseignements.|

## 13.5 Exercices de gestion des incidents

Des exercices peuvent être organisés pour évaluer la capacité de réaction de l'organisation.

Exemples :

- compromission d'un compte administrateur ;
- indisponibilité d'une application critique ;
- fuite de données ;
- attaque par rançongiciel ;
- indisponibilité d'un fournisseur essentiel ;
- incident affectant un environnement industriel.

Les exercices doivent être préparés, encadrés et suivis d'un plan d'amélioration.

Les délais de notification externes doivent être déterminés selon les obligations réglementaires et contractuelles effectivement applicables.

---

# 14. Documentation et preuves attendues

## 14.1 Principe général

La documentation du SMSI doit permettre de comprendre les décisions, les responsabilités et le fonctionnement des processus.

Les preuves doivent montrer que les mesures sont réellement appliquées, et pas uniquement prévues dans des documents.

Les documents ci-dessous constituent un inventaire de travail indicatif. Ils ne sont pas tous obligatoires sous cette forme exacte.

## 14.2 Documents de gouvernance

- Périmètre du SMSI.
- Politique de sécurité.
- Objectifs de sécurité.
- Répartition des responsabilités.
- Cartographie des processus.
- Registre des parties intéressées et de leurs exigences pertinentes.
- Plan de communication.
- Comptes rendus de revue de direction.

## 14.3 Documents de gestion des risques

- Méthodologie d'appréciation des risques.
- Critères d'évaluation et d'acceptation.
- Registre des risques.
- Plan de traitement.
- Déclaration d'applicabilité.
- Décisions d'acceptation des risques résiduels.
- Historique des réévaluations.

## 14.4 Documents opérationnels

- Inventaire des actifs.
- Règles de classification.
- Procédures de gestion des accès.
- Procédures de gestion des changements.
- Politique et procédures de sauvegarde.
- Procédures de gestion des incidents.
- Documents relatifs à la continuité.
- Évaluations des fournisseurs.
- Procédures de gestion des vulnérabilités.
- Résultats de tests et vérifications.

## 14.5 Documents d'évaluation et d'amélioration

- Programme d'audit interne.
- Rapports d'audit.
- Résultats des indicateurs.
- Comptes rendus de revue de direction.
- Registre des non-conformités.
- Analyses de causes.
- Plans d'action corrective.
- Preuves de vérification de l'efficacité des actions.

## 14.6 Exemple de matrice de conformité

|Exigence|Dispositif|Preuve attendue|Responsable|Statut|
|---|---|---|---|---|
|Clause 4.3|Définition du périmètre|Document de périmètre validé|RSSI|À évaluer|
|Clause 5.2|Politique de sécurité|Politique approuvée et communiquée|Direction / RSSI|À évaluer|
|Clause 6.1.2|Appréciation des risques|Méthode et registre des risques|RSSI / responsables métier|À évaluer|
|Clause 6.1.3|Traitement des risques|Plan de traitement et SoA|RSSI / responsables de contrôle|À évaluer|
|Clause 7.2|Compétences|Éléments de formation et de qualification|RH / responsables concernés|À évaluer|
|Clause 8.2|Réévaluation des risques|Registres et analyses actualisés|Responsables de risques|À évaluer|
|Clause 9.2|Audit interne|Programme, rapports et constats|Responsable d'audit|À évaluer|
|Clause 9.3|Revue de direction|Compte rendu et décisions|Direction|À évaluer|
|Clause 10.2|Actions correctives|Analyse des causes et preuve d'efficacité|Responsable du processus|À évaluer|

Les statuts doivent être renseignés à partir de constats réels. La présence d'un document ne suffit pas à démontrer la conformité de l'ensemble de l'exigence.

---

# 15. Méthodologie de mise en œuvre

## 15.1 Vue d'ensemble

Une mise en œuvre efficace repose sur une progression maîtrisée, en tenant compte des risques, des ressources disponibles et des priorités métier.

### Étape 1 — Définir le périmètre

Identifier les activités, les systèmes, les sites et les services concernés.

### Étape 2 — Réaliser un diagnostic initial

Comparer les pratiques existantes aux exigences du référentiel et identifier les écarts.

### Étape 3 — Définir la gouvernance

Attribuer les responsabilités et obtenir les décisions de la direction nécessaires au projet.

### Étape 4 — Construire la méthode de gestion des risques

Définir les critères, réaliser l'appréciation des risques et documenter les décisions de traitement.

### Étape 5 — Établir la Déclaration d'applicabilité

Sélectionner les contrôles nécessaires, justifier les exclusions et documenter leur état de mise en œuvre.

### Étape 6 — Déployer les mesures

Mettre en œuvre les mesures techniques, organisationnelles, humaines et physiques retenues.

### Étape 7 — Former et sensibiliser

Adapter les actions aux rôles, aux risques et aux responsabilités des collaborateurs.

### Étape 8 — Mesurer les résultats

Définir des indicateurs pertinents et organiser leur analyse périodique.

### Étape 9 — Réaliser un audit interne

Vérifier la conformité, l'application réelle des processus et l'efficacité des mesures.

### Étape 10 — Organiser la revue de direction

Présenter les résultats, les risques, les écarts et les besoins d'amélioration.

### Étape 11 — Corriger les écarts

Traiter les non-conformités, vérifier les actions correctives et préparer l'audit externe si une certification est visée.

## 15.2 Priorisation des actions

Les priorités doivent être établies en tenant compte :

- de la gravité des risques ;
- des conséquences métier ;
- des obligations applicables ;
- des dépendances techniques ;
- des délais de mise en œuvre ;
- des ressources disponibles ;
- de l'efficacité attendue des mesures.

Une action techniquement simple peut être prioritaire si elle traite un risque majeur. Inversement, un projet coûteux ne doit pas être considéré comme prioritaire uniquement parce qu'il est visible.

---

# 16. Préparation à l'audit de certification

## 16.1 Objectif

L'audit de certification vise à évaluer si le SMSI satisfait aux exigences applicables d'ISO/IEC 27001.

Il porte sur la documentation, les processus, les décisions, les preuves opérationnelles et l'amélioration continue.

La certification est délivrée par un organisme de certification compétent, selon le dispositif applicable.

## 16.2 Principaux axes de vérification

### Gouvernance

- Le périmètre est-il défini ?
- Le contexte est-il analysé ?
- La direction démontre-t-elle son engagement ?
- Les responsabilités sont-elles claires ?

### Gestion des risques

- La méthode est-elle définie et appliquée ?
- Les risques sont-ils évalués selon les critères établis ?
- Les décisions de traitement sont-elles documentées ?
- Les risques résiduels sont-ils traités selon les règles internes ?

### Contrôles de sécurité

- Les contrôles sélectionnés sont-ils mis en œuvre ?
- Les exclusions sont-elles justifiées ?
- Les mesures fonctionnent-elles réellement ?
- Les preuves sont-elles suffisantes ?

### Évaluation des performances

- Les indicateurs sont-ils pertinents ?
- Les audits internes sont-ils planifiés et réalisés ?
- Les résultats sont-ils examinés par la direction ?

### Amélioration

- Les non-conformités sont-elles traitées ?
- Les causes sont-elles analysées ?
- L'efficacité des actions correctives est-elle vérifiée ?

## 16.3 Checklist de préparation

- [ ] Le périmètre du SMSI est documenté et approuvé.
- [ ] Les parties intéressées et leurs exigences pertinentes sont identifiées.
- [ ] La politique de sécurité est approuvée et communiquée.
- [ ] Les rôles et responsabilités sont définis.
- [ ] La méthodologie d'appréciation des risques est formalisée.
- [ ] Le registre des risques est à jour.
- [ ] Le plan de traitement est suivi.
- [ ] La Déclaration d'applicabilité est cohérente avec le traitement des risques.
- [ ] Les objectifs de sécurité sont suivis.
- [ ] Les compétences et actions de sensibilisation sont documentées.
- [ ] Les processus opérationnels fonctionnent.
- [ ] Les indicateurs sont exploités.
- [ ] L'audit interne a été réalisé.
- [ ] La revue de direction a été tenue.
- [ ] Les non-conformités et actions correctives sont suivies.
- [ ] Les preuves sont accessibles aux personnes autorisées.

Cette checklist est un outil préparatoire et ne remplace pas l'évaluation de toutes les exigences applicables de la norme.

---

# 17. Correspondance avec NIS2, la LPM et les référentiels ANSSI

## 17.1 Principe général

ISO/IEC 27001, NIS2, la loi de programmation militaire (LPM) et les référentiels de l'ANSSI répondent à des objectifs différents.

ISO/IEC 27001 fournit un cadre de management certifiable. Les textes réglementaires définissent des obligations applicables à certaines entités et à certaines activités. Les référentiels techniques peuvent préciser des pratiques ou des exigences particulières.

Une certification ISO/IEC 27001 ne démontre donc pas automatiquement la conformité à NIS2, à la LPM ou à l'ensemble des exigences de l'ANSSI.

La correspondance doit être établie à partir des textes applicables, du statut de l'entité et de son périmètre réel.

## 17.2 Correspondance indicative

|Domaine|ISO/IEC 27001|NIS2|LPM / ANSSI|
|---|---|---|---|
|Gouvernance|Leadership, politique et responsabilités.|Gouvernance et responsabilité des organes de direction selon le régime applicable.|Exigences spécifiques selon le statut de l'entité et les prescriptions applicables.|
|Gestion des risques|Appréciation et traitement des risques.|Gestion des risques et mesures de sécurité prévues par le régime applicable.|Mesures et référentiels spécifiques selon les obligations de l'entité.|
|Gestion des incidents|Processus, contrôles et amélioration.|Gestion et notification des incidents selon les critères et délais applicables.|Dispositifs et obligations spécifiques pour les entités concernées.|
|Continuité|Prise en compte de la continuité et des risques associés.|Résilience et continuité dans le cadre des obligations applicables.|Exigences particulières pour les activités et systèmes concernés.|
|Contrôle des accès|Contrôles organisationnels et technologiques.|Mesures de gestion des risques pertinentes.|Mesures techniques ou organisationnelles selon les prescriptions applicables.|
|Fournisseurs|Gestion des relations et des risques liés aux tiers.|Sécurité de la chaîne d'approvisionnement selon les exigences applicables.|Exigences sectorielles et contractuelles spécifiques.|
|Audit et contrôle|Audit interne et évaluation des performances.|Contrôles et supervision selon le régime applicable.|Contrôles, audits ou évaluations selon les textes concernés.|

Cette matrice présente des correspondances thématiques et non une équivalence juridique entre les référentiels.

## 17.3 Méthode pour établir une correspondance fiable

1. Identifier le statut juridique et sectoriel de l'organisation.
2. Déterminer les textes et prescriptions effectivement applicables.
3. Identifier les exigences précises de chaque texte.
4. Associer chaque exigence à un processus, un contrôle ou une preuve.
5. Identifier les exigences sans correspondance suffisante.
6. Définir les actions complémentaires nécessaires.
7. Mettre à jour la matrice lors des évolutions réglementaires.

La correspondance doit être vérifiée à partir des versions en vigueur des textes et des prescriptions officielles pertinentes.

---

# 18. Glossaire

|Terme|Définition opérationnelle|
|---|---|
|SMSI|Système de management de la sécurité de l'information.|
|SMSI|Autre appellation française couramment utilisée pour le système de management de la sécurité de l'information.|
|RSSI|Responsable de la sécurité des systèmes d'information.|
|Actif|Élément ayant de la valeur pour l'organisation et nécessitant éventuellement une protection.|
|Menace|Cause potentielle d'un incident indésirable.|
|Vulnérabilité|Faiblesse susceptible d'être exploitée ou de contribuer à un incident.|
|Risque|Effet de l'incertitude sur les objectifs ; dans le contexte de la sécurité, il est analysé selon les critères définis par l'organisation.|
|Risque résiduel|Risque restant après la mise en œuvre du traitement.|
|Contrôle|Mesure qui maintient ou modifie le risque.|
|SoA|Déclaration d'applicabilité, document décrivant les contrôles nécessaires, leur état et les justifications pertinentes.|
|Audit interne|Évaluation menée pour vérifier la conformité et l'efficacité du SMSI.|
|Non-conformité|Non-satisfaction d'une exigence applicable.|
|Action corrective|Action visant à traiter la cause d'une non-conformité afin d'éviter sa réapparition.|
|Indicateur|Mesure utilisée pour suivre un phénomène ou évaluer un résultat.|
|Incident de sécurité|Événement ou ensemble d'événements répondant aux critères de qualification définis par l'organisation.|
|ICS|_Industrial Control Systems_, systèmes de contrôle industriels.|
|SCADA|_Supervisory Control and Data Acquisition_, systèmes de supervision et d'acquisition de données.|
|PDCA|Cycle Planifier, Déployer, Vérifier, Agir, utilisé pour représenter l'amélioration continue.|
|NIS2|Directive européenne relative à un niveau élevé commun de cybersécurité, dont l'application dépend notamment de sa transposition et du champ concerné.|
|LPM|Loi de programmation militaire, dont certaines dispositions encadrent la sécurité des systèmes d'information d'entités spécifiques.|
|ANSSI|Agence nationale de la sécurité des systèmes d'information en France.|

---

# 19. Conclusion

La famille ISO/IEC 27000 fournit un cadre structuré pour organiser la sécurité de l'information et l'intégrer au fonctionnement général d'une organisation.

ISO/IEC 27001 définit les exigences du système de management. Les normes complémentaires apportent des recommandations pour la mise en œuvre des contrôles, l'analyse des risques, la mesure de l'efficacité, l'audit, la gestion des incidents et la prise en compte de contextes spécialisés.

La réussite d'un SMSI dépend de plusieurs facteurs :

- un périmètre clairement défini ;
- une gouvernance impliquant la direction ;
- une analyse des risques cohérente ;
- des contrôles proportionnés et réellement appliqués ;
- des responsabilités explicites ;
- des preuves fiables ;
- des évaluations périodiques ;
- une amélioration continue.

La certification ne doit pas être considérée comme une finalité isolée. Elle constitue un moyen de démontrer que le système de management répond aux exigences applicables et fonctionne de manière structurée.

Le SMSI doit rester adapté aux évolutions de l'organisation, aux menaces, aux technologies et aux obligations réglementaires.

---

## Références documentaires à consulter

Pour une utilisation normative, un audit ou un projet de certification, consulter les éditions officielles applicables des documents suivants :

- ISO/IEC 27000 — Systèmes de management de la sécurité de l'information : vue d'ensemble et vocabulaire.
- ISO/IEC 27001:2022 — Systèmes de management de la sécurité de l'information : exigences.
- ISO/IEC 27002:2022 — Mesures de sécurité de l'information.
- ISO/IEC 27003 — Lignes directrices pour la mise en œuvre d'un SMSI.
- ISO/IEC 27004 — Surveillance, mesure, analyse et évaluation.
- ISO/IEC 27005 — Gestion des risques de sécurité de l'information.
- ISO/IEC 27007 — Lignes directrices pour l'audit des SMSI.
- ISO/IEC 27008 — Lignes directrices pour l'évaluation des contrôles de sécurité de l'information.
- ISO/IEC 27017 — Mesures de sécurité pour les services cloud.
- ISO/IEC 27018 — Protection des données personnelles dans les services cloud publics concernés.
- ISO/IEC 27019 — Sécurité de l'information dans le secteur énergétique.
- Série ISO/IEC 27035 — Gestion des incidents de sécurité de l'information.
- Directive (UE) 2022/2555, dite NIS2, et textes nationaux de transposition applicables.
- Textes applicables de la LPM et publications officielles de l'ANSSI correspondant au statut de l'entité.

**Note de référence :** ce guide est un document de synthèse et de travail. Il ne reproduit pas le texte intégral des normes ISO et ne remplace pas leur consultation officielle. Avant une certification ou une évaluation de conformité réglementaire, vérifier les éditions, amendements et textes juridiques en vigueur.