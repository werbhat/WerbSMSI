<!-- WerbIEC62443 – Développé par @WerbHat -->
# Checklist d'audit IEC 62443 — Cybersécurité industrielle

**Nom du fichier :** `checklist_audit_iec62443.md`  
**Version :** 1.0

## 1. Objectif de l'audit

Cette checklist permet de préparer un audit de cybersécurité industrielle, de recueillir les preuves et de suivre les écarts.

Elle constitue une grille de travail inspirée des domaines couverts par IEC 62443. Elle ne reproduit pas l'ensemble des exigences normatives et ne constitue pas, à elle seule, un référentiel de certification.

## 2. Échelle d'évaluation

|Statut|Signification|
|---|---|
|Conforme|Preuves suffisantes démontrant que le critère défini est satisfait|
|Partiellement conforme|Mesure présente mais incomplète ou insuffisamment démontrée|
|Non conforme|Écart identifié par rapport au critère applicable|
|Non applicable|Exclusion justifiée et validée|
|Non évalué|Contrôle non encore examiné|

Un statut ne doit pas être attribué sans préciser le critère d'audit, le périmètre et les preuves examinées.

## 3. Gouvernance et organisation — IEC 62443-2-1

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|GOV-01|Une politique de cybersécurité industrielle est-elle approuvée ?|Politique validée|À évaluer||
|GOV-02|Les rôles et responsabilités OT sont-ils définis ?|Organigramme, matrice RACI|À évaluer||
|GOV-03|Un responsable de la sécurité OT est-il désigné ?|Lettre de mission ou attribution formelle|À évaluer||
|GOV-04|Le périmètre industriel est-il documenté ?|Description du système et limites|À évaluer||
|GOV-05|Les risques sont-ils régulièrement réévalués ?|Analyses datées, comptes rendus|À évaluer||
|GOV-06|Les dérogations sont-elles approuvées ?|Registre des dérogations|À évaluer||
|GOV-07|Les prestataires sont-ils encadrés ?|Contrats, procédures d'accès|À évaluer||
|GOV-08|Des indicateurs de sécurité OT sont-ils suivis ?|Tableau de bord, revues|À évaluer||

## 4. Inventaire et architecture — IEC 62443-3-2

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|ARC-01|Les actifs OT sont-ils inventoriés ?|Inventaire versionné|À évaluer||
|ARC-02|Les dépendances entre systèmes sont-elles identifiées ?|Schémas et documentation technique|À évaluer||
|ARC-03|Les communications IT/OT sont-elles cartographiées ?|Cartographie des flux|À évaluer||
|ARC-04|Les zones sont-elles définies et justifiées ?|Modèle de zones|À évaluer||
|ARC-05|Les conduits sont-ils documentés ?|Matrice des flux et règles|À évaluer||
|ARC-06|Les scénarios de risque sont-ils documentés ?|Registre de risques|À évaluer||
|ARC-07|Les niveaux de sécurité cibles sont-ils justifiés ?|Analyse de risques et décisions|À évaluer||
|ARC-08|Les écarts entre objectifs et mesures existantes sont-ils suivis ?|Plan de traitement|À évaluer||

## 5. Gestion des identités et des accès — IEC 62443-3-3

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|IAM-01|Les comptes individuels sont-ils privilégiés lorsque cela est possible ?|Paramétrage et liste des comptes|À évaluer||
|IAM-02|Les comptes partagés sont-ils justifiés et encadrés ?|Dérogations, procédures de traçabilité|À évaluer||
|IAM-03|Les droits sont-ils limités au besoin opérationnel ?|Matrice des habilitations|À évaluer||
|IAM-04|Les comptes inactifs sont-ils révisés ?|Rapports de revue|À évaluer||
|IAM-05|Les accès distants sont-ils autorisés et maîtrisés ?|Procédure, architecture, journaux|À évaluer||
|IAM-06|Les comptes des prestataires sont-ils temporaires ou contrôlés ?|Registre des accès|À évaluer||
|IAM-07|Les accès privilégiés sont-ils protégés ?|Configuration et procédure d'administration|À évaluer||

## 6. Segmentation et communications — IEC 62443-3-2 et 3-3

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|NET-01|Les flux entre IT et OT sont-ils limités aux besoins validés ?|Règles de filtrage|À évaluer||
|NET-02|Les flux entre zones OT sont-ils maîtrisés ?|Matrice des flux|À évaluer||
|NET-03|Les accès directs depuis Internet sont-ils évités ou strictement contrôlés ?|Architecture, règles de sécurité|À évaluer||
|NET-04|Les règles réseau font-elles l'objet de revues ?|Comptes rendus de revue|À évaluer||
|NET-05|Les réseaux sans fil sont-ils identifiés et sécurisés ?|Inventaire, configuration|À évaluer||
|NET-06|Les connexions d'administration sont-elles contrôlées ?|Schémas et configurations|À évaluer||
|NET-07|Les changements de règles sont-ils tracés ?|Tickets et journaux de changement|À évaluer||

## 7. Durcissement, intégrité et composants

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|TEC-01|Les configurations de référence sont-elles documentées ?|Baselines de configuration|À évaluer||
|TEC-02|Les services inutiles sont-ils désactivés lorsque cela est compatible ?|Rapports de configuration|À évaluer||
|TEC-03|Les supports amovibles sont-ils contrôlés ?|Procédure et journaux|À évaluer||
|TEC-04|Les logiciels installés sont-ils connus ?|Inventaire logiciel|À évaluer||
|TEC-05|Les changements de logique automate sont-ils autorisés et tracés ?|Journaux, sauvegardes, procédures|À évaluer||
|TEC-06|L'intégrité des configurations critiques est-elle vérifiée ?|Comparaisons de configurations|À évaluer||
|TEC-07|Les composants obsolètes sont-ils identifiés ?|Registre d'obsolescence|À évaluer||

## 8. Vulnérabilités et correctifs — IEC 62443-2-3

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|VUL-01|Les avis de sécurité fournisseurs sont-ils suivis ?|Registre de veille|À évaluer||
|VUL-02|Les vulnérabilités sont-elles évaluées selon le contexte industriel ?|Analyses de criticité|À évaluer||
|VUL-03|Les correctifs sont-ils testés avant déploiement ?|Procès-verbaux de tests|À évaluer||
|VUL-04|Les mises à jour sont-elles approuvées et planifiées ?|Tickets de changement|À évaluer||
|VUL-05|Les correctifs impossibles à appliquer font-ils l'objet de mesures compensatoires ?|Dérogations et plan de traitement|À évaluer||
|VUL-06|Un plan de retour arrière est-il prévu ?|Procédure de restauration|À évaluer||

## 9. Sauvegarde, continuité et reprise

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|BCP-01|Les configurations automates et supervision sont-elles sauvegardées ?|Registre et rapports de sauvegarde|À évaluer||
|BCP-02|Les sauvegardes sont-elles protégées contre les modifications non autorisées ?|Architecture et contrôles d'accès|À évaluer||
|BCP-03|Les restaurations sont-elles testées ?|Rapports d'essais|À évaluer||
|BCP-04|Les objectifs de reprise sont-ils définis ?|Analyse d'impact et plans|À évaluer||
|BCP-05|Les procédures de reprise sont-elles disponibles en cas d'indisponibilité du SI ?|Copies accessibles et contrôlées|À évaluer||
|BCP-06|Les conséquences d'une mesure de sécurité sur la sûreté sont-elles analysées ?|Analyses et validations|À évaluer||

## 10. Détection et réponse aux incidents

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|INC-01|Les événements pertinents sont-ils journalisés ?|Politique de journalisation|À évaluer||
|INC-02|Les horloges des équipements sont-elles synchronisées de façon maîtrisée ?|Configuration et contrôles|À évaluer||
|INC-03|Les journaux critiques sont-ils protégés ?|Configuration des collecteurs|À évaluer||
|INC-04|Des scénarios de détection OT sont-ils définis ?|Cas d'usage et règles de détection|À évaluer||
|INC-05|Une procédure de gestion des incidents industriels existe-t-elle ?|Procédure validée|À évaluer||
|INC-06|Les rôles de décision en cas d'incident sont-ils connus ?|Plan de crise et annuaire|À évaluer||
|INC-07|Des exercices sont-ils réalisés ?|Comptes rendus d'exercices|À évaluer||
|INC-08|Les incidents donnent-ils lieu à un retour d'expérience ?|Analyses post-incident|À évaluer||

## 11. Développement et prestataires — IEC 62443-4-1, 4-2 et 2-4

|ID|Point à vérifier|Preuves attendues|Statut|Commentaires|
|---|---|---|---|---|
|SUP-01|Les exigences de cybersécurité sont-elles définies dans les achats ?|Cahiers des charges|À évaluer||
|SUP-02|Les fournisseurs communiquent-ils sur les vulnérabilités ?|Contrats, politique de divulgation|À évaluer||
|SUP-03|Les mises à jour et la durée de support sont-elles documentées ?|Engagements fournisseurs|À évaluer||
|SUP-04|Les accès de maintenance sont-ils encadrés ?|Procédures et journaux|À évaluer||
|SUP-05|Les tests de sécurité des produits sont-ils documentés ?|Rapports et dossiers techniques|À évaluer||

## 12. Synthèse des résultats

|Indicateur|Résultat|
|---|---|
|Nombre de points évalués|À renseigner|
|Nombre de points conformes|À renseigner|
|Nombre de points partiellement conformes|À renseigner|
|Nombre de points non conformes|À renseigner|
|Nombre de points non applicables|À renseigner|
|Nombre de points non évalués|À renseigner|
|Écarts critiques|À renseigner|
|Risques résiduels majeurs|À renseigner|

Ne pas calculer un score global sans méthode documentée de pondération et sans définir ce que le score signifie.

## 13. Fiche d'écart

Pour chaque écart, renseigner :

- Identifiant.
- Périmètre concerné.
- Critère applicable et référence.
- Description factuelle.
- Preuves examinées.
- Risque et conséquences possibles.
- Mesure corrective ou compensatoire.
- Responsable.
- Échéance.
- Validation de clôture.

## 14. Conditions d'utilisation

Avant de considérer l'audit comme une évaluation de conformité IEC 62443, compléter la checklist avec les exigences exactes de l'édition applicable, les profils pertinents et les niveaux de sécurité visés.

---

**Fin de la checklist d'audit.**