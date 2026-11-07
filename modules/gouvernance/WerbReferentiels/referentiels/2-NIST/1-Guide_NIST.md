<!-- WerbReferentiels – Développé par @WerbHat -->
# Guide complet NIST — Cybersécurité et gestion des risques

**Nom du fichier :** `guide_nist.md`  
**Version :** 1.0  
**Référentiel principal :** NIST Cybersecurity Framework (CSF) 2.0  
**Périmètre :** Gouvernance, gestion des risques, contrôles de sécurité, audit et cybersécurité industrielle.

> Ce document est une synthèse pédagogique. Il ne reproduit pas les publications officielles et ne constitue pas une déclaration de conformité.

## 1. Présentation du NIST

Le National Institute of Standards and Technology (NIST) est un organisme américain qui publie des références techniques, des guides et des cadres méthodologiques, notamment dans les domaines de la cybersécurité, de la gestion des risques et de la protection des systèmes d'information.

Contrairement à une norme unique, le corpus NIST comprend plusieurs publications complémentaires.

Les principales références sont :

- **NIST CSF 2.0** : cadre de gestion des risques de cybersécurité.
- **NIST SP 800-53 Rev. 5** : catalogue de contrôles de sécurité et de confidentialité.
- **NIST SP 800-30 Rev. 1** : méthode d'appréciation des risques.
- **NIST SP 800-37 Rev. 2** : Risk Management Framework (RMF).
- **NIST SP 800-61 Rev. 3** : recommandations de gestion des incidents.
- **NIST SP 800-82 Rev. 3** : sécurité des technologies opérationnelles (OT).

Sources officielles : NIST CSF 2.0, NIST SP 800-53, NIST SP 800-82.

## 2. NIST CSF 2.0 — Structure générale

Le CSF 2.0 organise les résultats attendus de la gestion des risques de cybersécurité en six fonctions.

|Fonction|Objectif|Exemples d'activités|
|---|---|---|
|Govern (GV)|Gouverner|Politique, responsabilités, stratégie, supervision et risques fournisseurs|
|Identify (ID)|Identifier|Inventaire, contexte, risques et dépendances|
|Protect (PR)|Protéger|Identités, accès, sensibilisation, sécurité des données et résilience|
|Detect (DE)|Détecter|Surveillance, analyse d'événements et détection d'anomalies|
|Respond (RS)|Répondre|Gestion des incidents, communication, analyse et limitation des effets|
|Recover (RC)|Rétablir|Restauration, continuité, communication et amélioration après incident|

Les six fonctions sont complémentaires et continues. Elles ne représentent pas nécessairement une succession linéaire d'étapes.

### 2.1 Govern — Gouverner

Cette fonction établit la manière dont l'organisation pilote le risque cyber.

Les activités peuvent inclure :

- La définition de la stratégie de cybersécurité.
- L'attribution des responsabilités.
- L'approbation des politiques.
- La définition de l'appétence et des critères d'acceptation des risques.
- L'intégration de la cybersécurité dans la gestion des risques d'entreprise.
- La supervision des fournisseurs et de la chaîne d'approvisionnement.
- Le suivi des résultats et des décisions de direction.

**Livrables possibles :** politique de sécurité, matrice RACI, registre des risques, stratégie cyber, indicateurs de pilotage.

### 2.2 Identify — Identifier

L'organisation doit comprendre son environnement et les risques qui affectent ses activités.

Les travaux comprennent :

- L'identification des actifs et des données.
- La cartographie des systèmes et des dépendances.
- L'analyse du contexte métier.
- L'identification des menaces et vulnérabilités.
- L'évaluation des conséquences d'une compromission.
- La priorisation des risques.
- La prise en compte des fournisseurs et services externes.

**Livrables possibles :** inventaire, cartographie, analyse de risques, classification des actifs et registre des dépendances.

### 2.3 Protect — Protéger

Cette fonction couvre les mesures destinées à réduire la probabilité ou les conséquences d'un incident.

Exemples :

- Gestion des identités et des accès.
- Authentification et gestion des privilèges.
- Sensibilisation et formation.
- Protection des données.
- Configuration sécurisée.
- Gestion des vulnérabilités.
- Protection des infrastructures et réseaux.
- Sauvegardes et mesures de résilience.

**Livrables possibles :** règles d'accès, configurations de référence, procédures de sauvegarde, politique de correctifs et supports de formation.

### 2.4 Detect — Détecter

La détection vise à identifier rapidement les événements susceptibles de signaler une compromission.

Exemples :

- Collecte et corrélation des journaux.
- Surveillance des systèmes.
- Détection des comportements anormaux.
- Analyse des alertes.
- Gestion des sources de renseignement sur les menaces.
- Définition des procédures d'escalade.

**Livrables possibles :** règles de détection, cas d'usage SOC, procédures de qualification et tableaux de bord.

### 2.5 Respond — Répondre

La réponse vise à contenir l'incident et à en limiter les effets.

Exemples :

- Qualification et priorisation.
- Coordination des équipes.
- Confinement adapté au contexte.
- Investigation technique.
- Communication interne et externe.
- Conservation des éléments de preuve.
- Coordination avec les prestataires concernés.

**Livrables possibles :** plan de réponse aux incidents, fiches réflexes, annuaire de crise et rapports d'incident.

### 2.6 Recover — Rétablir

Le rétablissement vise à restaurer les capacités nécessaires après un incident.

Exemples :

- Restauration des données et configurations.
- Vérification de l'intégrité des systèmes.
- Remise en service progressive.
- Validation du retour à un état maîtrisé.
- Communication sur le rétablissement.
- Retour d'expérience et amélioration.

**Livrables possibles :** plan de reprise, procédures de restauration, résultats de tests et plan d'amélioration.

## 3. Profils organisationnels et niveaux de mise en œuvre

### 3.1 Profil actuel et profil cible

Le CSF permet de décrire un profil actuel et un profil cible.

- **Profil actuel :** résultats de cybersécurité observés dans l'organisation.
- **Profil cible :** résultats que l'organisation souhaite atteindre en fonction de ses risques et objectifs.

La comparaison permet de construire une feuille de route priorisée.

Un profil n'est pas une certification. Il doit être fondé sur des preuves et sur des objectifs adaptés à l'organisation.

### 3.2 Tiers de mise en œuvre

Le CSF 2.0 décrit quatre Tiers caractérisant la rigueur des pratiques de gouvernance et de gestion des risques.

|Tier|Désignation anglaise|Interprétation générale|
|---|---|---|
|1|Partial|Pratiques principalement ponctuelles ou peu formalisées|
|2|Risk Informed|Pratiques informées par le risque, avec formalisation variable|
|3|Repeatable|Pratiques définies, documentées et répétables|
|4|Adaptive|Pratiques adaptatives intégrant l'apprentissage et l'évolution du contexte|

Ces Tiers ne doivent pas être interprétés comme une note universelle de sécurité ni comme des niveaux de certification.

## 4. NIST SP 800-53 Rev. 5 — Catalogue de contrôles

SP 800-53 propose un catalogue de contrôles de sécurité et de confidentialité, adaptable selon le système, le contexte et les risques.

Les familles comprennent notamment :

|Famille|Code|Domaine|
|---|---|---|
|Access Control|AC|Contrôle des accès|
|Awareness and Training|AT|Sensibilisation et formation|
|Audit and Accountability|AU|Journalisation et responsabilité|
|Assessment, Authorization and Monitoring|CA|Évaluation, autorisation et surveillance|
|Configuration Management|CM|Gestion des configurations|
|Contingency Planning|CP|Continuité et reprise|
|Identification and Authentication|IA|Identification et authentification|
|Incident Response|IR|Gestion des incidents|
|Maintenance|MA|Maintenance|
|Media Protection|MP|Protection des supports|
|Physical and Environmental Protection|PE|Sécurité physique et environnementale|
|Planning|PL|Planification|
|Personnel Security|PS|Sécurité du personnel|
|Risk Assessment|RA|Appréciation des risques|
|System and Services Acquisition|SA|Acquisition et développement|
|System and Communications Protection|SC|Protection des systèmes et communications|
|System and Information Integrity|SI|Intégrité des systèmes et informations|
|Supply Chain Risk Management|SR|Risques liés à la chaîne d'approvisionnement|

Cette liste présente des familles importantes, sans prétendre remplacer le catalogue complet.

### Utilisation des contrôles

Pour sélectionner un contrôle :

1. Définir le système et les objectifs de sécurité.
2. Identifier les exigences applicables.
3. Sélectionner une base de contrôles pertinente.
4. Adapter les contrôles au contexte.
5. Définir les responsabilités d'implémentation.
6. Évaluer l'efficacité des mesures.
7. Documenter les écarts et les risques résiduels.

Le catalogue est flexible. Les contrôles doivent être sélectionnés et adaptés selon une méthode justifiée plutôt que déclarés tous obligatoires par défaut.

## 5. NIST SP 800-30 — Appréciation des risques

SP 800-30 fournit des recommandations pour réaliser une appréciation des risques.

Une démarche opérationnelle comprend généralement :

1. Préparer l'appréciation et définir son périmètre.
2. Identifier les sources de menace et les événements redoutés.
3. Examiner les vulnérabilités, les conditions facilitatrices et les mesures existantes.
4. Estimer la vraisemblance et les conséquences.
5. Déterminer les niveaux de risque selon les critères retenus.
6. Documenter les incertitudes et hypothèses.
7. Communiquer les résultats aux décideurs.
8. Réviser l'appréciation lorsque le contexte évolue.

### Registre minimal de risques

|Champ|Description|
|---|---|
|Identifiant|Référence unique|
|Actif ou processus|Élément concerné|
|Scénario|Événement et chemin de compromission|
|Menace|Source ou événement menaçant|
|Vulnérabilité|Faiblesse ou condition facilitatrice|
|Impact|Conséquences opérationnelles et métier|
|Vraisemblance|Estimation selon une méthode définie|
|Risque initial|Niveau avant traitement|
|Traitement|Mesure choisie|
|Risque résiduel|Niveau après traitement|
|Responsable|Propriétaire du risque|
|Échéance|Date de décision ou de traitement|

## 6. NIST SP 800-37 — Risk Management Framework

Le RMF structure la gestion des risques de sécurité et de confidentialité tout au long du cycle de vie des systèmes.

Ses principales étapes sont :

|Étape|Objectif|
|---|---|
|Prepare|Préparer la gestion des risques et les responsabilités|
|Categorize|Catégoriser le système et les informations|
|Select|Sélectionner les contrôles appropriés|
|Implement|Mettre en œuvre les contrôles|
|Assess|Évaluer leur mise en œuvre et leur efficacité|
|Authorize|Décider de l'autorisation d'exploitation selon le modèle applicable|
|Monitor|Surveiller les contrôles et l'évolution des risques|

Ce cadre est particulièrement structuré pour les systèmes concernés par les exigences fédérales américaines. Une organisation française peut en reprendre la logique sans considérer que les règles d'autorisation américaines lui sont automatiquement applicables.

## 7. Gestion des incidents — NIST SP 800-61 Rev. 3

SP 800-61 Rev. 3 intègre la réponse aux incidents dans l'ensemble de la gestion des risques du CSF 2.0.

Les activités couvrent notamment :

- La préparation et la gouvernance.
- La détection et l'analyse.
- La coordination de la réponse.
- Le confinement et la limitation des impacts.
- Le rétablissement des systèmes.
- L'analyse post-incident.
- L'amélioration des contrôles et procédures.

Il convient de consulter la révision 3 comme référence actuelle de cette publication plutôt que de s'appuyer uniquement sur la révision 2.

## 8. NIST SP 800-82 — Cybersécurité OT

SP 800-82 traite de la protection des technologies opérationnelles, notamment les systèmes de contrôle industriels, la supervision et les dispositifs interagissant avec le monde physique.

Les particularités OT comprennent :

- Les contraintes de disponibilité.
- Les exigences de temps réel.
- Les dépendances entre systèmes.
- Les équipements à longue durée de vie.
- Les difficultés de mise à jour.
- Les conséquences physiques possibles d'une compromission.

Les mesures doivent être conçues en tenant compte des contraintes de sûreté de fonctionnement. Une action techniquement pertinente en informatique peut être inadaptée à un procédé industriel si elle est déployée sans analyse et validation.

**Point de version :** SP 800-82 Rev. 3 a été publiée en septembre 2023. Le NIST a annoncé en septembre 2026 un projet de révision 4 soumis à consultation. Il faut donc vérifier l'état de la publication au moment de construire un référentiel formel.

## 9. Articulation entre les publications

|Besoin|Référence de départ|
|---|---|
|Structurer la stratégie cyber|CSF 2.0|
|Définir des contrôles détaillés|SP 800-53 Rev. 5|
|Évaluer les risques|SP 800-30 Rev. 1|
|Organiser le cycle de gestion des risques|SP 800-37 Rev. 2|
|Préparer la réponse aux incidents|SP 800-61 Rev. 3|
|Adapter les mesures à l'OT|SP 800-82 Rev. 3 et publications ultérieures applicables|

## 10. Mise en œuvre dans une organisation

Une démarche de mise en œuvre peut suivre ce cycle :

1. Définir le périmètre et les objectifs.
2. Réaliser un profil actuel CSF.
3. Définir un profil cible.
4. Réaliser l'analyse de risques.
5. Sélectionner les contrôles adaptés.
6. Construire un plan d'action priorisé.
7. Mettre en œuvre les mesures.
8. Vérifier leur efficacité.
9. Suivre les indicateurs et les risques résiduels.
10. Réviser les profils et les contrôles périodiquement.

## 11. Sources officielles

- NIST CSF : https://www.nist.gov/cyberframework
- NIST CSF 2.0 : https://doi.org/10.6028/NIST.CSWP.29
- SP 800-53 Rev. 5 : https://doi.org/10.6028/NIST.SP.800-53r5
- SP 800-30 Rev. 1 : https://doi.org/10.6028/NIST.SP.800-30r1
- SP 800-37 Rev. 2 : https://doi.org/10.6028/NIST.SP.800-37r2
- SP 800-61 Rev. 3 : https://doi.org/10.6028/NIST.SP.800-61r3
- SP 800-82 Rev. 3 : https://doi.org/10.6028/NIST.SP.800-82r3

---

**Fin du guide NIST.**