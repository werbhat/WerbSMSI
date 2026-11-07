<!-- WerbReferentiels – Développé par @WerbHat -->
# Tableau de correspondances — NIS2, ISO/IEC 27001, NIST CSF, IEC 62443, ANSSI

Le tableau croisé relie chaque exigence NIS2 aux mesures ISO/IEC 27001:2022, aux catégories du NIST CSF 2.0, aux exigences IEC 62443 et aux mesures d'hygiène de l'ANSSI, avec le module WerbSMSI où se trouve la preuve. Il sert d'abord en audit : « telle mesure couvre telle exigence ».

> Les correspondances sont **fonctionnelles** : une mesure d'un référentiel contribue à une exigence d'un autre, elle ne la satisfait pas automatiquement. La conclusion se prend exigence par exigence, avec ses preuves (méthode en fin de page).

## 1. Tableau croisé, par exigence NIS2

| Exigence NIS2 | ISO/IEC 27001:2022 | NIST CSF 2.0 | IEC 62443 | ANSSI (hygiène) | Preuve dans WerbSMSI |
|---|---|---|---|---|---|
| Art. 20 — Gouvernance : approbation, supervision, formation des dirigeants | Cl. 5 ; A.5.1, A.5.2, A.5.4 | GV.OC, GV.RR, GV.PO, GV.OV | 2-1 (organisation et responsabilités) | 39 | WerbGouvernance : politique, rôles, revues de direction |
| 21 a) — Analyse des risques, politiques de sécurité des SI | Cl. 6.1, 8.2, 8.3 ; A.5.1 | GV.RM, ID.RA | 3-2 (risques, zones et conduits) ; 2-1 | 4, 41 | WerbEBIOS (groupe et sites), WerbGouvernance |
| 21 b) — Gestion des incidents | A.5.24 à A.5.28, A.6.8 | DE.AE, RS.MA, RS.AN, RS.MI | 2-1 (réponse aux incidents) ; 3-3 SR 6.1, SR 6.2 | 40 | WerbGouvernance (procédure), WerbExploitation (registre de suivi) |
| 21 c) — Continuité : sauvegardes, reprise, gestion de crise | A.5.29, A.5.30, A.8.13, A.8.14 | PR.DS, PR.IR, RC.RP, RC.CO | 3-3 SR 7.3, SR 7.4 | 37 | WerbExploitation (sauvegardes) |
| 21 d) — Chaîne d'approvisionnement, fournisseurs et prestataires | A.5.19 à A.5.23 | GV.SC | 2-4 (prestataires) ; 4-1 (fournisseurs de produits) | 3, 25 | WerbGouvernance (prestataires cadre), WerbIEC62443 (prestataires du site) |
| 21 e) — Acquisition, développement, maintenance ; traitement des vulnérabilités | A.5.7, A.8.8, A.8.25 à A.8.29, A.8.32 | ID.RA, ID.IM, PR.PS | 2-3 (correctifs) ; 4-1 ; 4-2 | 34, 35 | WerbExploitation (mises à jour, applicatifs), WerbIEC62443 |
| 21 f) — Évaluation de l'efficacité des mesures | Cl. 9.1, 9.2, 9.3, 10 ; A.5.35, A.5.36 | GV.OV, ID.IM | 2-1 (amélioration) ; vérification des SR de 3-3 | 38 | WerbGouvernance (revues, plan d'actions), WerbIEC62443 (taux de conformité) |
| 21 g) — Cyberhygiène et formation | Cl. 7.2, 7.3 ; A.6.3 | PR.AT | 2-1 (sensibilisation, formation) | 1, 2 et socle des 42 mesures | WerbGouvernance (socle de mesures) |
| 21 h) — Cryptographie et chiffrement | A.8.24 | PR.DS | 3-3 SR 4.1, SR 4.3 | 18, 31 | WerbExploitation (certificats) |
| 21 i) — Ressources humaines, contrôle d'accès, gestion des actifs | A.5.9 à A.5.11, A.5.15 à A.5.18, A.6.1 à A.6.5, A.8.2, A.8.3 | ID.AM, PR.AA | 2-1 ; 3-3 SR 1.1, SR 1.3, SR 2.1 | 4 à 9, 29 | WerbMap (actifs), WerbExploitation (comptes et matrices d'accès) |
| 21 j) — Authentification multifacteur, communications sécurisées et d'urgence | A.5.14, A.8.5 | PR.AA | 3-3 SR 1.1 (renforcements multifacteur), SR 1.13 | 13, 32 | WerbExploitation (comptes) |
| Art. 23 — Notification des incidents (24 h, 72 h, un mois) | A.5.5, A.5.24, A.5.26 | RS.CO | 2-1 | 40 | WerbGouvernance (procédure de notification) |
| Mesure technique — Sécurité et segmentation des réseaux | A.8.20 à A.8.22 | PR.IR, PR.PS | 3-2 (zones et conduits) ; 3-3 SR 5.1, SR 5.2 | 19 à 23, 25, 27, 28 | WerbMap (zones, conduits, flux), WerbIEC62443 |
| Mesure technique — Journalisation et détection | A.8.15, A.8.16 | DE.CM, DE.AE | 3-3 SR 2.8, SR 6.1, SR 6.2 | 36 | WerbExploitation (registres) |

Repères : ISO « Cl. » = clause du SMSI, « A.x.y » = mesure de l'Annexe A ; NIST = catégorie du CSF 2.0 ([carte NIST](2-NIST/0-carte.md)) ; IEC 62443 = partie de la série, « SR » = exigence système de 62443-3-3 ; ANSSI = numéro de mesure du [guide d'hygiène](1-ANSSI/1-hygiene_informatique.md).

## 2. Vue par domaine pour un site industriel

Grille indicative pour articuler la cybersécurité industrielle avec les référentiels de gouvernance et de conformité.

| Domaine | IEC 62443 | ISO/IEC 27001:2022 | NIS2 | Repères ANSSI |
|---|---|---|---|---|
| Gouvernance | 2-1 | Clauses 4 et 5 | Gouvernance et responsabilité des dirigeants | Politique de sécurité et gouvernance OT |
| Gestion des risques | 3-2, 2-1 | Clause 6 ; Annexe A selon applicabilité | Mesures de gestion des risques | [Classification industrielle](1-ANSSI/2-systemes_industriels.md) |
| Inventaire des actifs | 2-1, 3-2 | Annexe A, gestion des actifs | Gestion des risques et des actifs concernés | Inventaire et cartographie OT |
| Segmentation réseau | 3-2, 3-3 | Annexe A, sécurité des réseaux | Mesures techniques et organisationnelles | Zones, filtrage et architecture industrielle |
| Identités et accès | 2-1, 3-3, 4-2 | Annexe A, contrôle d'accès et identités | Contrôle d'accès et sécurité des systèmes | Gestion des comptes et accès distants |
| Développement sécurisé | 4-1, 4-2 | Annexe A, développement sécurisé | Sécurité de la chaîne d'approvisionnement et des systèmes | Exigences adaptées aux produits industriels |
| Gestion des vulnérabilités | 2-3, 2-1, 4-1 | Annexe A, vulnérabilités techniques | Traitement des vulnérabilités | Surveillance et traitement des vulnérabilités OT |
| Journalisation et détection | 3-3, 2-1 | Annexe A, journalisation et surveillance | Détection et gestion des incidents | Détection sur les réseaux industriels |
| Incidents | 2-1, 3-3 | Annexe A et clauses 8 à 10 | Gestion et notification des incidents | Procédures de réponse aux incidents |
| Continuité | 2-1, 3-3 | Annexe A et planification opérationnelle | Continuité d'activité et gestion de crise | Sauvegarde, reprise et continuité OT |
| Prestataires | 2-4 | Annexe A, relations fournisseurs | Sécurité de la chaîne d'approvisionnement | Encadrement des interventions externes |
| Audit et amélioration | 2-1 | Clauses 9 et 10 | Supervision et contrôle | Audits et contrôles de sécurité |

## 3. Méthode de mise en correspondance

Pour chaque exigence :

1. Identifier le texte de référence, son édition et son champ d'application.
2. Décrire le risque ou l'objectif de sécurité visé.
3. Identifier les mesures déjà en place (et leur référence dans chaque référentiel, colonnes ci-dessus).
4. Associer les preuves disponibles.
5. Évaluer l'écart.
6. Définir les actions complémentaires.
7. Documenter les justifications et les risques résiduels.
8. Faire valider la conclusion par les responsables compétents.

| ID | Exigence source | Mesure associée | Preuve disponible | Écart | Action | Responsable | Échéance |
|---|---|---|---|---|---|---|---|
| COR-001 | NIS2 21 c) sauvegardes | A.8.13 ; SR 7.3 ; mesure ANSSI 37 | Registre des sauvegardes, test de restauration | À évaluer | À définir | À désigner | À définir |
| COR-002 | À renseigner | À renseigner | À renseigner | À évaluer | À définir | À désigner | À définir |

## 4. Points de vigilance

- Ne pas déclarer une conformité NIS2 sur la seule base d'un alignement ISO/IEC 27001 ou IEC 62443 : NIS2 ajoute des obligations propres (notification, responsabilité des dirigeants, enregistrement).
- Un certificat ISO/IEC 27001 porte sur un **périmètre** : vérifier qu'il couvre les systèmes concernés par NIS2, y compris l'OT.
- Un certificat de produit (IEC 62443-4-2) ne démontre pas la sécurité de l'installation complète (3-3) ni celle de son exploitation (2-1, 2-4).
- Ne pas confondre niveau cible, capacité d'un composant et niveau atteint par un système.
- Citer les éditions : ISO/IEC 27001:2022, NIST CSF 2.0, directive (UE) 2022/2555 et sa transposition nationale.
- Conserver la traçabilité des décisions et des risques résiduels.

Pour aller plus loin : [carte ANSSI](1-ANSSI/0-carte.md) · [carte NIST](2-NIST/0-carte.md) · [obligations NIS2](3-NIS2/1-obligations.md) · [carte ISO/IEC 27001](4-ISO_27001/0-carte.md).
