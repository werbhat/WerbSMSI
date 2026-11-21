<!-- WerbNIS2 – Développé par @WerbHat -->
# Conduire un audit NIS2 — méthode et cotation

Ce guide accompagne l'audit de conformité NIS2 d'une entité ou d'un site avec WerbNIS2 : préparation, cotation des moyens acceptables de conformité du **référentiel NIS2**, plan d'actions et rapport.

## 1. Préparer

- **Statut de l'entité** : entité essentielle (EE) ou entité importante (EI). Il fixe le périmètre. Le référentiel NIS2 précise, pour chacun de ses 152 moyens acceptables, s'il est **attendu d'une EI** et **attendu d'une EE** : chaque mesure porte les étiquettes **EI ✓ / ✗** et **EE ✓ / ✗**.
  - Une **entité importante** est évaluée sur les **76** mesures attendues d'une EI ; les 76 autres, réservées aux entités essentielles (dont tous les moyens des objectifs 16 à 20), sont **hors périmètre** et exclues de la couverture.
  - Une **entité essentielle** est évaluée sur les **152** mesures.
  - Tant que le statut est « à déterminer », toutes les mesures restent proposées.
  - Le filtre **Applicabilité** de la grille montre les mesures applicables à l'entité, celles attendues d'une EI, celles réservées aux EE, ou celles hors périmètre.
- **Périmètre** : lister les activités et services de l'entité, leur responsable et les systèmes d'information qui les supportent. Les systèmes non exclus sont les **systèmes d'information réglementés (SIR)** ; une exclusion se justifie.
- **Point de contact** : la personne qui conseille le dirigeant exécutif est le point de contact privilégié de l'ANSSI (mesure 2.A.2-EE).
- **Documents à réunir** : PSSI et politiques associées, organisation et RACI, cartographies (SI, écosystème, flux), contrats des prestataires, procédures (MCO/MCS, incidents, crise, sauvegarde), analyses de risques, rapports d'audit antérieurs, preuves de tests et d'exercices.

## 2. Coter

| Cote | Signification | Compte dans la couverture |
|---|---|---|
| OK | Conforme : mesure en place, documentée, preuve consultée | Oui |
| PL + | Partiellement conforme, orientation conforme : la démarche engagée permet d'atteindre l'objectif | Oui |
| PL − | Partiellement conforme, orientation non conforme : la démarche actuelle ne permet pas d'atteindre l'objectif | Non |
| NC | Non conforme : aucune disposition constatée | Non |
| N/A | Non applicable, avec justification | Exclu du calcul |

Pour chaque mesure :

1. Lire l'exigence en entier : les exemples entre parenthèses illustrent, ils ne s'imposent pas.
2. Chercher la preuve (document, page, configuration, entretien) et la citer dans **Preuves, sources**.
3. Justifier la cote dans **Commentaire** : ce qui est conforme, ce qui manque, l'orientation.
4. Pour une alternative (« lorsque des raisons techniques ou opérationnelles ne permettent pas… »), vérifier les mesures de réduction du risque et leur traçabilité.

> Une cote sans preuve ni justification ne tient pas en audit. Préférer PL − à PL + quand l'orientation n'est pas démontrée.

## 3. Lire la couverture

La couverture d'une rubrique est la part des mesures applicables cotées OK ou PL +. Elle se lit avec le nombre de mesures évaluées : une couverture élevée sur peu de mesures évaluées n'est pas un résultat.

Les 28 rubriques (2.A Rôles et responsabilités, 5.B Maintien en condition opérationnelle et de sécurité…) déclinent les **20 objectifs de sécurité** : la page **Les 20 objectifs** agrège la couverture par objectif, rappelle l'objectif (son atteinte est obligatoire), son pilier (gouvernance, protection, défense, résilience), les articles de la directive et la justification, et permet de résumer l'état actuel et ce qu'il reste à faire. Les moyens acceptables ne sont pas obligatoires : ils permettent de démontrer l'atteinte de l'objectif ; une autre mesure peut convenir si elle atteint le même objectif.

## 4. Traiter les écarts

- Chaque écart (PL +, PL −, NC) reçoit une action au **plan d'actions**, avec un responsable et une échéance raisonnable (2.C.2-EI/EE).
- Le bouton « Créer les actions des écarts » prépare une action par écart qui n'en a pas encore.
- Les actions en retard apparaissent au tableau de bord.

## 5. Restituer

Le **rapport d'audit** reprend le contexte, la synthèse, la couverture par rubrique, les constats et le plan d'actions, signé par le module. L'imprimer, ou l'enregistrer en PDF avec « Microsoft Print to PDF ».

## Repères

- La grille reprend le **référentiel NIS2 du 17/03/2026** (document de travail) : 20 objectifs de sécurité, 152 moyens acceptables de conformité avec leurs identifiants officiels (1.1-EI/EE, 5.B.1-EE…) et leurs colonnes « Attendu d'une EI / d'une EE ». Deux mesures du document ont un identifiant qui ne concorde pas avec ces colonnes (12.6-EI/EE, non attendue d'une EI ; 14.5-EE, attendue d'une EI) : la colonne fait foi, le module le signale (⚠). Les textes de référence sont la directive (UE) 2022/2555 et sa transposition nationale.
- **Bases créées avant WerbNIS2 1.12.0** (grille 2025, 152 points en 28 thématiques) : à l'ouverture, chaque cotation est reportée sur la mesure NIS2 correspondante (146 points sur 152). Les cotations sans correspondance restent visibles dans **Base › Reprise de la grille 2025**, à reporter à la main ; enregistrer la base conserve la reprise.
- Le module de lecture **WerbReferentiels** présente la directive (champ d'application, articles 20, 21 et 23) et ses correspondances avec ISO/IEC 27001, le NIST CSF 2.0 et IEC 62443.
