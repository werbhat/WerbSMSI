<!-- WerbReferentiels – Développé par @WerbHat -->
# Checklist d'audit NIST — Cybersécurité et gestion des risques

**Nom du fichier :** `checklist_audit_nist.md`  
**Version :** 1.0  
**Référence principale :** NIST CSF 2.0, complété par les familles de contrôles de SP 800-53 Rev. 5.

## 1. Objectif

Cette checklist sert à évaluer les pratiques de cybersécurité, collecter les preuves et documenter les écarts.

Elle est organisée selon les six fonctions du CSF 2.0. Elle constitue une grille de préparation et non une liste exhaustive de toutes les sous-catégories du CSF ou de tous les contrôles SP 800-53.

## 2. Échelle d'évaluation

|Statut|Signification|
|---|---|
|Conforme|Le critère d'audit est satisfait et les preuves sont suffisantes|
|Partiellement conforme|La mesure existe mais reste incomplète|
|Non conforme|Un écart est établi par rapport au critère applicable|
|Non applicable|L'exclusion est justifiée et validée|
|Non évalué|Le point n'a pas encore été examiné|

Chaque point doit être associé à un périmètre, à un critère et à une preuve vérifiable.

## 3. Gouvernance — Govern

|ID|Question d'audit|Preuves attendues|Statut|
|---|---|---|---|
|GOV-01|Une stratégie de cybersécurité est-elle approuvée ?|Stratégie, décision de direction|À évaluer|
|GOV-02|Une politique de sécurité est-elle publiée ?|Politique versionnée|À évaluer|
|GOV-03|Les responsabilités sont-elles définies ?|Organigramme, RACI|À évaluer|
|GOV-04|Les critères d'acceptation des risques sont-ils documentés ?|Méthodologie et validation|À évaluer|
|GOV-05|Les risques cyber sont-ils intégrés à la gestion globale des risques ?|Registres et comptes rendus|À évaluer|
|GOV-06|Les fournisseurs critiques sont-ils évalués ?|Évaluations et contrats|À évaluer|
|GOV-07|La direction examine-t-elle les indicateurs et les écarts ?|Revues de direction|À évaluer|
|GOV-08|Les décisions importantes sont-elles tracées ?|Registre des décisions|À évaluer|

## 4. Identification — Identify

|ID|Question d'audit|Preuves attendues|Statut|
|---|---|---|---|
|ID-01|Les actifs matériels et logiciels sont-ils inventoriés ?|Inventaire actualisé|À évaluer|
|ID-02|Les données sensibles sont-elles identifiées ?|Classification des données|À évaluer|
|ID-03|Les systèmes critiques sont-ils identifiés ?|Analyse d'impact et cartographie|À évaluer|
|ID-04|Les dépendances techniques sont-elles documentées ?|Cartographie des flux|À évaluer|
|ID-05|Une méthode d'appréciation des risques est-elle définie ?|Méthodologie approuvée|À évaluer|
|ID-06|Les risques sont-ils réévalués périodiquement ?|Analyses datées|À évaluer|
|ID-07|Les risques fournisseurs sont-ils intégrés ?|Registre de risques tiers|À évaluer|
|ID-08|Les responsabilités de gestion des actifs sont-elles attribuées ?|Propriétaires des actifs|À évaluer|

## 5. Protection — Protect

|ID|Question d'audit|Preuves attendues|Statut|
|---|---|---|---|
|PR-01|Les comptes et identités sont-ils gérés ?|Procédures IAM|À évaluer|
|PR-02|Les privilèges sont-ils limités au besoin ?|Matrice des habilitations|À évaluer|
|PR-03|Les accès sensibles sont-ils protégés par une authentification adaptée ?|Paramétrage et tests|À évaluer|
|PR-04|Les configurations de référence sont-elles définies ?|Baselines de configuration|À évaluer|
|PR-05|Les correctifs sont-ils gérés selon une procédure ?|Registre des vulnérabilités|À évaluer|
|PR-06|Les données sensibles sont-elles protégées ?|Mesures de chiffrement et d'accès|À évaluer|
|PR-07|Les sauvegardes sont-elles protégées et testées ?|Rapports de sauvegarde et restauration|À évaluer|
|PR-08|La sensibilisation des utilisateurs est-elle organisée ?|Formations et évaluations|À évaluer|
|PR-09|Les changements sont-ils approuvés et tracés ?|Tickets et journaux|À évaluer|

## 6. Détection — Detect

|ID|Question d'audit|Preuves attendues|Statut|
|---|---|---|---|
|DET-01|Les événements de sécurité pertinents sont-ils collectés ?|Politique de journalisation|À évaluer|
|DET-02|Les journaux sont-ils protégés contre les modifications non autorisées ?|Configuration des collecteurs|À évaluer|
|DET-03|Les alertes sont-elles analysées ?|Procédures SOC et tickets|À évaluer|
|DET-04|Les cas d'usage de détection sont-ils définis ?|Catalogue des détections|À évaluer|
|DET-05|Les incidents potentiels sont-ils escaladés ?|Matrice d'escalade|À évaluer|
|DET-06|Les dispositifs de détection sont-ils testés ?|Résultats de tests|À évaluer|
|DET-07|Les sources de renseignement sur les menaces sont-elles exploitées ?|Veille et règles adaptées|À évaluer|

## 7. Réponse — Respond

|ID|Question d'audit|Preuves attendues|Statut|
|---|---|---|---|
|RES-01|Un plan de réponse aux incidents est-il approuvé ?|Plan versionné|À évaluer|
|RES-02|Les rôles de crise sont-ils définis ?|Annuaire et RACI|À évaluer|
|RES-03|Les procédures de qualification sont-elles documentées ?|Procédure de triage|À évaluer|
|RES-04|Les méthodes de confinement sont-elles définies ?|Fiches réflexes|À évaluer|
|RES-05|La conservation des preuves est-elle organisée ?|Procédure et registre|À évaluer|
|RES-06|Les communications internes et externes sont-elles préparées ?|Plan de communication|À évaluer|
|RES-07|Les incidents font-ils l'objet d'un retour d'expérience ?|Rapport post-incident|À évaluer|
|RES-08|Des exercices sont-ils organisés ?|Comptes rendus d'exercices|À évaluer|

## 8. Rétablissement — Recover

|ID|Question d'audit|Preuves attendues|Statut|
|---|---|---|---|
|REC-01|Les services critiques ont-ils des objectifs de reprise ?|Analyse d'impact|À évaluer|
|REC-02|Les procédures de restauration sont-elles documentées ?|Plans de reprise|À évaluer|
|REC-03|Les sauvegardes sont-elles testées par des restaurations ?|Procès-verbaux de tests|À évaluer|
|REC-04|L'intégrité des systèmes est-elle vérifiée avant remise en service ?|Procédures et résultats|À évaluer|
|REC-05|Les responsabilités de validation sont-elles définies ?|Matrice de décision|À évaluer|
|REC-06|Les parties concernées sont-elles informées du rétablissement ?|Plan de communication|À évaluer|
|REC-07|Les enseignements sont-ils intégrés au plan d'amélioration ?|Registre d'actions|À évaluer|

## 9. Contrôles transversaux à approfondir avec SP 800-53

Pour chaque domaine, identifier les contrôles SP 800-53 pertinents, leurs paramètres d'implémentation, les responsabilités et les preuves attendues.

Familles fréquemment utiles :

- AC : Access Control.
- AT : Awareness and Training.
- AU : Audit and Accountability.
- CA : Assessment, Authorization and Monitoring.
- CM : Configuration Management.
- CP : Contingency Planning.
- IA : Identification and Authentication.
- IR : Incident Response.
- RA : Risk Assessment.
- SA : System and Services Acquisition.
- SC : System and Communications Protection.
- SI : System and Information Integrity.
- SR : Supply Chain Risk Management.

La liste des familles ne remplace pas la sélection des contrôles et des éventuelles améliorations applicables au système.

## 10. Synthèse d'audit

|Indicateur|Résultat|
|---|---|
|Points évalués|À renseigner|
|Points conformes|À renseigner|
|Points partiellement conformes|À renseigner|
|Points non conformes|À renseigner|
|Points non applicables|À renseigner|
|Points non évalués|À renseigner|
|Écarts critiques|À renseigner|
|Actions en retard|À renseigner|
|Risques résiduels majeurs|À renseigner|

Ne pas assimiler le pourcentage de points conformes à une mesure universelle du niveau de sécurité.

## 11. Fiche d'écart

- Identifiant :
- Fonction CSF concernée :
- Contrôle ou critère détaillé :
- Système et périmètre :
- Description factuelle :
- Preuves examinées :
- Risque associé :
- Mesure corrective :
- Mesure compensatoire éventuelle :
- Responsable :
- Échéance :
- Preuve de clôture :
- Validation finale :

## 12. Références

- NIST CSF : https://www.nist.gov/cyberframework
- NIST SP 800-53 : https://csrc.nist.gov/pubs/sp/800/53/r5/final
- NIST SP 800-30 : [https://csrc.nist.gov/pubs/sp/800/30/r1/final](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- NIST SP 800-61 Rev. 3 : [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final)

---

**Fin de la checklist d'audit NIST.**