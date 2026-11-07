<!-- WerbReferentiels – Développé par @WerbHat -->
# Carte NIST — le Cybersecurity Framework 2.0 et les publications associées

Le NIST (National Institute of Standards and Technology, États-Unis) publie le Cybersecurity Framework (CSF) 2.0 : six fonctions, 22 catégories, pour décrire et piloter la cybersécurité d'une organisation, quelle que soit sa taille. Les publications de la série SP 800 détaillent les contrôles, l'analyse de risques et la cybersécurité industrielle.

- GOUVERNER (GV)
  - GV.OC — Contexte de l'organisation
  - GV.RM — Stratégie de gestion des risques
  - GV.RR — Rôles, responsabilités et autorités
  - GV.PO — Politique
  - GV.OV — Supervision
  - GV.SC — Risques cyber de la chaîne d'approvisionnement
- IDENTIFIER (ID)
  - ID.AM — Gestion des actifs
  - ID.RA — Appréciation des risques
  - ID.IM — Amélioration
- PROTÉGER (PR)
  - PR.AA — Identités, authentification et contrôle d'accès
  - PR.AT — Sensibilisation et formation
  - PR.DS — Sécurité des données
  - PR.PS — Sécurité des plateformes
  - PR.IR — Résilience de l'infrastructure technique
- DÉTECTER (DE)
  - DE.CM — Surveillance continue
  - DE.AE — Analyse des événements indésirables
- RÉPONDRE (RS)
  - RS.MA — Gestion des incidents
  - RS.AN — Analyse des incidents
  - RS.CO — Communication et signalement
  - RS.MI — Atténuation des incidents
- RÉTABLIR (RC)
  - RC.RP — Exécution du plan de rétablissement
  - RC.CO — Communication pendant le rétablissement
- Pages du référentiel
  - [Guide NIST](1-Guide_NIST.md)
  - [Checklist d'audit](2-checklist_audit_nist.md)
  - [Plan de mise en œuvre](3-plan_de_mise_en_oeuvre_nist.md)
  - [Modèles et registres](4-modeles_et_registres_nist.md)
  - [Sources officielles](sources.md)

## Les publications à connaître

| Publication | Objet | Usage dans le SMSI |
|---|---|---|
| CSF 2.0 (CSWP 29) | Cadre : fonctions, catégories, sous-catégories, profils, niveaux (tiers) | Profil actuel et profil cible, feuille de route |
| SP 800-53 Rev. 5 | Catalogue de contrôles de sécurité et de vie privée | Choix et formulation de mesures |
| SP 800-30 Rev. 1 | Conduite d'une appréciation des risques | Méthode alternative ou complément d'EBIOS RM |
| SP 800-37 Rev. 2 | Risk Management Framework (cycle d'autorisation des systèmes) | Proche de l'homologation française |
| SP 800-61 Rev. 3 | Gestion des incidents, alignée sur le CSF 2.0 | Procédure de réponse aux incidents |
| SP 800-82 Rev. 3 | Sécurité des technologies opérationnelles (OT) | Sites industriels, avec IEC 62443 |

## Profils et niveaux de mise en œuvre

- **Profil actuel / profil cible** : pour chaque catégorie retenue, la situation d'aujourd'hui et celle visée ; l'écart donne le plan d'actions.
- **Tiers 1 à 4** (partiel, informé des risques, reproductible, adaptatif) : la maturité de la gouvernance et de la gestion des risques, pas un score de conformité.

Le CSF ne se certifie pas : il sert de langage commun. Son articulation avec ISO/IEC 27001, NIS2 et IEC 62443 est dans le [tableau de correspondances](../correspondances.md).
