<!-- WerbNIS2 – Développé par @WerbHat -->
# Conduire un audit NIS2 — méthode et cotation

Ce guide accompagne l'audit de conformité NIS2 d'une entité ou d'un site avec WerbNIS2 : préparation, cotation des 152 points de contrôle, plan d'actions et rapport.

## 1. Préparer

- **Statut de l'entité** : entité essentielle (EE) ou entité importante (EI). Il fixe le périmètre : 16 points ne s'appliquent qu'aux entités essentielles (étiquette **EE**).
- **Périmètre** : lister les activités et services de l'entité, leur responsable et les systèmes d'information qui les supportent. Les systèmes non exclus sont les **systèmes d'information réglementés (SIR)** ; une exclusion se justifie.
- **Point de contact** : la personne qui conseille le dirigeant exécutif est le point de contact privilégié de l'ANSSI.
- **Documents à réunir** : PSSI et politiques associées, organisation et RACI, cartographies (SI, écosystème, flux), contrats des prestataires, procédures (MCO/MCS, incidents, crise, sauvegarde), analyses de risques, rapports d'audit antérieurs, preuves de tests et d'exercices.

## 2. Coter

| Cote | Signification | Compte dans la couverture |
|---|---|---|
| OK | Conforme : mesure en place, documentée, preuve consultée | Oui |
| PL + | Partiellement conforme, orientation conforme : la démarche engagée permet d'atteindre l'objectif | Oui |
| PL − | Partiellement conforme, orientation non conforme : la démarche actuelle ne permet pas d'atteindre l'objectif | Non |
| NC | Non conforme : aucune disposition constatée | Non |
| N/A | Non applicable, avec justification | Exclu du calcul |

Pour chaque point :

1. Lire l'exigence en entier : les exemples entre parenthèses illustrent, ils ne s'imposent pas.
2. Chercher la preuve (document, page, configuration, entretien) et la citer dans **Preuves, sources**.
3. Justifier la cote dans **Commentaire** : ce qui est conforme, ce qui manque, l'orientation.
4. Pour une alternative (« lorsque des raisons techniques ou opérationnelles ne permettent pas… »), vérifier les mesures de réduction du risque et leur traçabilité.

> Une cote sans preuve ni justification ne tient pas en audit. Préférer PL − à PL + quand l'orientation n'est pas démontrée.

## 3. Lire la couverture

La couverture d'une thématique est la part des points applicables cotés OK ou PL +. Elle se lit avec le nombre de points évalués : une couverture élevée sur peu de points évalués n'est pas un résultat.

Les 28 thématiques déclinent les 20 règles : la page **Les 20 règles NIS2** agrège la couverture par règle, et permet de résumer l'état actuel et ce qu'il reste à faire.

## 4. Traiter les écarts

- Chaque écart (PL +, PL −, NC) reçoit une action au **plan d'actions**, avec un responsable et une échéance raisonnable (CONFORMITE.b).
- Le bouton « Créer les actions des écarts » prépare une action par écart qui n'en a pas encore.
- Les actions en retard apparaissent au tableau de bord.

## 5. Restituer

Le **rapport d'audit** reprend le contexte, la synthèse, la couverture par thématique, les constats et le plan d'actions, signé par le module. L'imprimer, ou l'enregistrer en PDF avec « Microsoft Print to PDF ».

## Repères

- La grille reprend les règles et les points de contrôle du classeur « Règles et audits NIS2 ». Les textes de référence sont la directive (UE) 2022/2555 et sa transposition nationale.
- Le module de lecture **WerbReferentiels** présente la directive (champ d'application, articles 20, 21 et 23) et ses correspondances avec ISO/IEC 27001, le NIST CSF 2.0 et IEC 62443.
