<!-- WerbIEC62443 – Développé par @WerbHat -->
# Plan de mise en œuvre IEC 62443

**Nom du fichier :** `plan_de_mise_en_oeuvre_iec62443.md`  
**Version :** 1.0

## 1. Objectif

Ce document définit une feuille de route pour déployer une démarche de cybersécurité industrielle inspirée de la série IEC 62443.

Le calendrier proposé est indicatif. Il doit être adapté à la taille de l'installation, à sa criticité, à ses contraintes de production et aux ressources disponibles.

## 2. Principes directeurs

- Prioriser les risques pour les personnes, les biens, l'environnement et la production.
- Associer les équipes automatisme, exploitation, maintenance, informatique et cybersécurité.
- Documenter les décisions et leurs justifications.
- Éviter les modifications non testées en production.
- Privilégier les mesures compensatoires lorsque les contraintes industrielles empêchent une correction immédiate.
- Intégrer la sécurité au cycle de vie des équipements et aux changements d'architecture.

## 3. Gouvernance du projet

|Rôle|Responsabilités|
|---|---|
|Direction|Mandat, arbitrage et ressources|
|Responsable cybersécurité OT|Coordination, méthode, suivi des risques|
|Responsable automatisme|Architecture et contraintes techniques|
|Responsable production|Continuité et validation opérationnelle|
|Responsable IT/réseaux|Interconnexions, filtrage, identité et supervision|
|Maintenance|Interventions, sauvegardes et gestion des changements|
|Intégrateur|Conception et mise en œuvre des mesures|
|Fournisseurs|Documentation, correctifs et support produit|
|Responsable sûreté de fonctionnement|Analyse des effets des mesures sur les fonctions de sécurité|

## 4. Phase 1 — Cadrage

**Références principales :** IEC 62443-2-1 et IEC 62443-3-2.

Actions :

1. Définir le sponsor et le responsable du projet.
2. Définir le périmètre industriel.
3. Identifier les installations, sites et lignes concernés.
4. Identifier les contraintes de disponibilité et de sécurité physique.
5. Définir les objectifs, livrables et critères d'acceptation.
6. Définir les règles de gestion documentaire.

Livrables :

- Note de cadrage.
- Périmètre du projet.
- RACI.
- Planning.
- Registre initial des risques.

Critère de sortie : périmètre et responsabilités approuvés.

## 5. Phase 2 — Inventaire et cartographie

Actions :

1. Recenser les actifs matériels et logiciels.
2. Identifier les versions et statuts de support.
3. Recenser les comptes et accès privilégiés.
4. Cartographier les flux réseau.
5. Identifier les accès distants et connexions fournisseurs.
6. Documenter les dépendances vers les systèmes d'entreprise et services externes.
7. Identifier les équipements impossibles à scanner ou à modifier sans validation.

Livrables :

- Inventaire OT.
- Cartographie réseau.
- Matrice des flux.
- Registre des dépendances.
- Liste des équipements obsolètes.

Critère de sortie : les actifs et interfaces critiques sont identifiés et les inconnues restantes sont consignées.

## 6. Phase 3 — Analyse de risques

**Référence principale :** IEC 62443-3-2.

Actions :

1. Identifier les fonctions et actifs critiques.
2. Définir les événements redoutés.
3. Construire des scénarios de menace.
4. Examiner les vulnérabilités et protections existantes.
5. Évaluer les conséquences sur le procédé, les personnes, l'environnement et la production.
6. Évaluer les risques selon une méthode approuvée.
7. Identifier les mesures existantes et les risques résiduels.
8. Faire valider les résultats par les responsables métier et techniques.

Livrables :

- Méthode d'analyse de risques.
- Registre des risques.
- Scénarios documentés.
- Décisions de traitement.

Critère de sortie : risques prioritaires et règles d'acceptation approuvés.

## 7. Phase 4 — Zones, conduits et niveaux cibles

**Référence principale :** IEC 62443-3-2.

Actions :

1. Regrouper les actifs en zones cohérentes.
2. Identifier les communications entre zones.
3. Définir les conduits et leurs règles.
4. Évaluer les risques de chaque zone et conduit.
5. Déterminer les niveaux de sécurité cibles pertinents.
6. Comparer les objectifs à la capacité des composants et aux mesures existantes.
7. Documenter les écarts.

Livrables :

- Modèle de zones et conduits.
- Matrice des flux autorisés.
- Justification des niveaux cibles.
- Liste des écarts.

Critère de sortie : architecture cible et objectifs de sécurité approuvés.

## 8. Phase 5 — Plan de traitement

Classer les actions selon leur risque, leur faisabilité et leurs dépendances.

Exemples d'actions :

- Supprimer les accès distants inutiles.
- Renforcer l'authentification des accès d'administration.
- Filtrer les flux interzones.
- Sécuriser les stations d'ingénierie.
- Mettre en place des sauvegardes vérifiées.
- Réduire les comptes et privilèges excessifs.
- Formaliser les procédures de changement.
- Améliorer la détection et la journalisation.
- Traiter les vulnérabilités selon la criticité.
- Mettre en place des mesures compensatoires documentées.

Chaque action doit comporter un responsable, une échéance, un risque traité, une preuve attendue et un critère de validation.

## 9. Phase 6 — Mise en œuvre contrôlée

Avant toute modification :

1. Évaluer les effets possibles sur le procédé.
2. Obtenir l'autorisation de changement.
3. Préparer un plan de test.
4. Vérifier la disponibilité d'une sauvegarde exploitable.
5. Prévoir un retour arrière.
6. Planifier une fenêtre d'intervention.
7. Informer les personnes concernées.

Après intervention :

1. Vérifier les communications autorisées.
2. Tester les fonctions opérationnelles.
3. Vérifier les alarmes et la supervision.
4. Vérifier les fonctions de sécurité concernées.
5. Enregistrer les résultats.
6. Mettre à jour les configurations et documents.

## 10. Phase 7 — Vérification et validation

La validation doit confirmer que les mesures :

- Répondent à l'objectif défini.
- N'introduisent pas de risque opérationnel inacceptable.
- Sont configurées conformément à la conception.
- Sont documentées.
- Sont maintenables par les équipes compétentes.

Livrables :

- Procès-verbaux de tests.
- Registre des preuves.
- Liste des écarts résiduels.
- Approbation de mise en service.

## 11. Phase 8 — Exploitation et amélioration continue

Mettre en place un cycle de suivi régulier comprenant :

- Revue des comptes et accès.
- Suivi des vulnérabilités.
- Gestion des changements.
- Vérification des sauvegardes et restaurations.
- Revue des règles de filtrage.
- Suivi des incidents et alertes.
- Exercices de continuité.
- Réévaluation des risques lors des changements significatifs.
- Audits internes périodiques.

## 12. Planning indicatif

|Phase|Période indicative|Résultat attendu|
|---|---|---|
|Cadrage|Semaines 1–2|Périmètre et gouvernance validés|
|Inventaire|Semaines 2–6|Inventaire et cartographie|
|Analyse de risques|Semaines 5–9|Risques priorisés|
|Zones et conduits|Semaines 8–12|Architecture cible|
|Plan de traitement|Semaines 10–13|Actions priorisées|
|Première mise en œuvre|Semaines 14–20|Mesures prioritaires déployées|
|Vérification|Semaines 18–22|Tests et preuves|
|Exploitation|En continu|Maintien et amélioration|

Ces durées ne constituent pas une exigence normative et ne préjugent pas de la complexité d'un site réel.

## 13. Indicateurs de suivi

- Pourcentage d'actifs critiques inventoriés.
- Pourcentage de flux industriels documentés.
- Nombre de risques critiques sans traitement approuvé.
- Pourcentage d'accès privilégiés revus.
- Pourcentage de sauvegardes critiques testées.
- Nombre de vulnérabilités critiques en dépassement de délai.
- Pourcentage de changements réalisés selon la procédure.
- Pourcentage d'actions correctives clôturées avec preuves.

Définir pour chaque indicateur une méthode de calcul, une fréquence, un responsable et un objectif validé.

## 14. Critères de clôture du projet

Le projet peut être considéré comme arrivé à un jalon de clôture lorsque :

- Le périmètre et les actifs critiques sont documentés.
- L'analyse de risques a été approuvée.
- Les zones, conduits et objectifs sont justifiés.
- Les actions prioritaires sont réalisées ou font l'objet d'une décision formelle.
- Les risques résiduels sont acceptés par les autorités compétentes.
- Les preuves et procédures sont disponibles.
- Le maintien en condition de sécurité est organisé.

La clôture d'un projet ne signifie pas que le système est définitivement sécurisé. Les risques évoluent avec les équipements, les menaces et les usages.

---

**Fin du plan de mise en œuvre.**