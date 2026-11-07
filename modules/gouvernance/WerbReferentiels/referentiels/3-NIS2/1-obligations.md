<!-- WerbReferentiels – Développé par @WerbHat -->
# Obligations NIS2 — mesures, notification et preuves attendues

Synthèse des articles 20, 21 et 23 de la directive (UE) 2022/2555. Le texte qui s'impose à une entité est celui de la **transposition nationale** et de ses textes d'application : cette page sert à préparer et à structurer les preuves, pas à conclure sur la conformité.

## Gouvernance (article 20)

- Les **organes de direction** approuvent les mesures de gestion des risques en matière de cybersécurité et supervisent leur mise en œuvre.
- Ils peuvent être tenus **responsables** des manquements.
- Ils suivent une **formation** et sont encouragés à en proposer une, régulièrement, à l'ensemble du personnel.

**Preuves attendues** : décision de la direction approuvant la politique et le plan de mesures, comptes rendus de revue de direction, attestations de formation des dirigeants.

## Mesures de gestion des risques (article 21)

Les mesures sont **techniques, opérationnelles et organisationnelles**, appropriées et proportionnées au risque, fondées sur une approche « tous risques » qui protège les réseaux, les systèmes d'information et leur environnement physique. Elles couvrent au moins :

| Point | Domaine | Exemples de preuves | Module WerbSMSI |
|---|---|---|---|
| a) | Politiques d'analyse des risques et de sécurité des systèmes d'information | PSSI, méthode et rapport d'analyse de risques, plan de traitement | WerbGouvernance, WerbEBIOS |
| b) | Gestion des incidents | Procédure, registre des incidents, retours d'expérience | WerbGouvernance, WerbExploitation |
| c) | Continuité des activités : sauvegardes, reprise après sinistre, gestion de crise | PCA/PRA, registre des sauvegardes, tests de restauration, exercices de crise | WerbExploitation |
| d) | Sécurité de la chaîne d'approvisionnement, relations avec les fournisseurs et prestataires | Clauses de sécurité, évaluation des fournisseurs, liste des prestataires | WerbGouvernance, WerbIEC62443 |
| e) | Sécurité de l'acquisition, du développement et de la maintenance des systèmes, y compris le traitement et la divulgation des vulnérabilités | Exigences dans les achats, veille et traitement des vulnérabilités, registre des mises à jour | WerbExploitation, WerbIEC62443 |
| f) | Politiques et procédures d'évaluation de l'efficacité des mesures | Indicateurs, audits internes, contrôles, plan d'actions | WerbGouvernance |
| g) | Cyberhygiène de base et formation à la cybersécurité | Plan de sensibilisation, supports, présence ; socle d'hygiène (ANSSI) | WerbGouvernance |
| h) | Cryptographie et, le cas échéant, chiffrement | Politique cryptographique, inventaire des usages, gestion des certificats | WerbExploitation (certificats) |
| i) | Sécurité des ressources humaines, contrôle d'accès, gestion des actifs | Procédures d'arrivée et de départ, revue des droits, inventaire des actifs | WerbMap, WerbExploitation |
| j) | Authentification multifacteur ou continue, communications sécurisées (voix, vidéo, texte), communications d'urgence sécurisées | Périmètre de la MFA, moyens de communication de crise | WerbExploitation (comptes) |

Les entités tiennent compte des **vulnérabilités propres à chaque fournisseur** et de la qualité de leurs pratiques (art. 21 §3). Pour certaines entités numériques, le règlement d'exécution (UE) 2024/2690 précise les exigences techniques et méthodologiques.

## Notification des incidents (article 23)

Un incident est **important** s'il a causé ou peut causer une perturbation opérationnelle grave des services ou des pertes financières pour l'entité, ou s'il a affecté ou peut affecter d'autres personnes en causant des dommages matériels ou non matériels considérables.

| Étape | Délai | Contenu |
|---|---|---|
| Alerte précoce | Sans retard injustifié, au plus tard **24 h** après en avoir eu connaissance | Suspicion d'acte illicite ou malveillant, effet transfrontière possible |
| Notification d'incident | Au plus tard **72 h** après en avoir eu connaissance | Mise à jour de l'alerte, évaluation initiale (gravité, impact), indicateurs de compromission |
| Rapport intermédiaire | À la demande de l'autorité ou du CSIRT | État de la situation |
| Rapport final | Au plus tard **un mois** après la notification | Description détaillée, type de menace ou cause, mesures d'atténuation, effet transfrontière |
| Rapport d'avancement | Si l'incident est toujours en cours à l'échéance du rapport final | Puis rapport final dans le mois suivant son traitement |

L'entité informe aussi, le cas échéant, les **destinataires de ses services** des incidents susceptibles de les affecter et des mesures qu'ils peuvent prendre.

**Preuves attendues** : procédure de notification avec les critères d'incident important, contacts de l'autorité et du CSIRT, modèles de notification, traces des notifications envoyées.

## Prochaine étape

Relier chaque point à une mesure existante, à sa preuve et à son écart : voir le [tableau de correspondances](../correspondances.md), qui rapproche ces obligations d'ISO/IEC 27001, du NIST CSF 2.0, d'IEC 62443 et des mesures d'hygiène de l'ANSSI.

Retour à la [carte NIS2](0-carte.md).
