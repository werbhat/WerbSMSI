<!-- WerbReferentiels – Développé par @WerbHat -->
# Plan de mise en œuvre NIST — Programme de cybersécurité

**Nom du fichier :** `plan_de_mise_en_oeuvre_nist.md`  
**Version :** 1.0

## 1. Objectif

Ce plan décrit une méthode de déploiement fondée sur NIST CSF 2.0, complétée par les publications SP 800 pertinentes.

Il vise à construire un programme mesurable, proportionné aux risques et maintenable dans le temps.

## 2. Gouvernance du projet

|Rôle|Responsabilités|
|---|---|
|Direction|Sponsor, arbitrage et acceptation des risques selon délégation|
|Responsable cybersécurité|Méthode, coordination et suivi|
|Responsable des risques|Critères et registre des risques|
|Responsable informatique|Mise en œuvre technique|
|Responsable OT, si applicable|Contraintes industrielles et validation opérationnelle|
|Responsable des données|Classification et exigences de protection|
|Responsable audit|Évaluation indépendante lorsque requise|
|Responsables métiers|Priorités et conséquences opérationnelles|
|Fournisseurs|Mesures et preuves contractuellement attendues|

## 3. Phase 1 — Cadrage

Actions :

1. Définir le périmètre organisationnel et technique.
2. Identifier les services et processus critiques.
3. Désigner les propriétaires des risques.
4. Définir les objectifs du programme.
5. Fixer les critères d'acceptation des risques.
6. Déterminer les publications et obligations applicables.
7. Organiser la gestion documentaire.

Livrables :

- Note de cadrage.
- RACI.
- Politique de cybersécurité.
- Registre initial des risques.
- Planning du programme.

Critère de sortie : périmètre et gouvernance validés.

## 4. Phase 2 — Établir le profil actuel

**Référence principale :** NIST CSF 2.0.

Actions :

1. Examiner les résultats attendus des six fonctions.
2. Identifier les mesures en place.
3. Recueillir les preuves.
4. Identifier les écarts et incertitudes.
5. Évaluer les pratiques de gouvernance et de gestion des risques.
6. Documenter les dépendances critiques.

Livrables :

- Profil actuel CSF.
- Inventaire des preuves.
- Synthèse des écarts.
- Liste des risques prioritaires.

Le profil actuel doit refléter la situation observée et non uniquement les procédures déclarées.

## 5. Phase 3 — Analyse de risques

**Référence principale :** NIST SP 800-30 Rev. 1.

Actions :

1. Définir les actifs et processus concernés.
2. Identifier les événements redoutés.
3. Examiner les menaces et vulnérabilités.
4. Estimer les conséquences.
5. Évaluer la vraisemblance.
6. Déterminer le niveau de risque selon une méthode documentée.
7. Définir les options de traitement.
8. Faire valider les décisions et risques résiduels.

Livrables :

- Méthodologie d'appréciation.
- Registre de risques.
- Scénarios documentés.
- Plan de traitement.

## 6. Phase 4 — Définir le profil cible

Actions :

1. Identifier les résultats CSF nécessaires au contexte métier.
2. Tenir compte des obligations contractuelles et réglementaires.
3. Définir les objectifs à atteindre.
4. Déterminer les priorités selon les risques.
5. Associer les responsables et preuves attendues.
6. Valider le profil cible avec les décideurs.

Livrables :

- Profil cible CSF.
- Liste des résultats prioritaires.
- Indicateurs de réussite.
- Feuille de route.

Le profil cible doit être réaliste et fondé sur les risques. Il n'est pas nécessaire de viser indistinctement tous les résultats au même niveau de priorité.

## 7. Phase 5 — Sélectionner les contrôles

**Référence principale :** NIST SP 800-53 Rev. 5.

Actions :

1. Sélectionner les contrôles appropriés.
2. Définir les paramètres d'application.
3. Identifier les contrôles communs et les contrôles propres aux systèmes.
4. Définir les responsabilités.
5. Documenter les contrôles hérités de services partagés.
6. Adapter les contrôles aux environnements concernés.
7. Définir les preuves d'efficacité attendues.

Livrables :

- Catalogue des contrôles applicables.
- Matrice de responsabilités.
- Plan d'implémentation.
- Référentiel de preuves.

## 8. Phase 6 — Mise en œuvre

Les actions possibles comprennent :

- Renforcement de la gestion des identités.
- Réduction des privilèges excessifs.
- Gestion des configurations.
- Déploiement des correctifs selon le risque.
- Protection des données sensibles.
- Renforcement de la journalisation.
- Amélioration de la détection.
- Formalisation de la réponse aux incidents.
- Tests de sauvegarde et de restauration.
- Évaluation des fournisseurs critiques.

Pour les systèmes OT, toute modification susceptible d'affecter le procédé doit être évaluée et validée par les responsables opérationnels compétents.

Chaque action doit comporter un responsable, une échéance, un risque traité et un critère de réussite.

## 9. Phase 7 — Évaluation et autorisation

**Référence complémentaire :** NIST SP 800-37 Rev. 2.

Actions :

1. Évaluer la mise en œuvre des contrôles.
2. Vérifier leur efficacité.
3. Documenter les écarts.
4. Déterminer le risque résiduel.
5. Préparer la décision de mise en service ou d'acceptation du risque, selon le modèle de gouvernance retenu.
6. Planifier les actions restantes.

Livrables :

- Rapport d'évaluation.
- Registre des écarts.
- Plan d'actions.
- Décision formelle de l'autorité compétente, lorsqu'applicable.

L'étape d'autorisation du RMF correspond à un processus de gouvernance spécifique ; elle ne doit pas être présentée comme une obligation identique pour toutes les organisations privées.

## 10. Phase 8 — Surveillance continue

Actions :

- Suivre les vulnérabilités.
- Surveiller les journaux et alertes.
- Réviser les accès.
- Vérifier les sauvegardes.
- Réévaluer les risques après les changements importants.
- Contrôler les fournisseurs.
- Réaliser des audits périodiques.
- Mettre à jour les profils CSF.
- Suivre les actions correctives.

## 11. Planning indicatif

|Phase|Durée indicative|Livrable|
|---|---|---|
|Cadrage|1 à 2 semaines|Périmètre et gouvernance|
|Profil actuel|2 à 4 semaines|Évaluation initiale|
|Analyse de risques|2 à 6 semaines|Registre de risques|
|Profil cible|1 à 3 semaines|Objectifs et priorités|
|Sélection des contrôles|2 à 4 semaines|Matrice des contrôles|
|Mise en œuvre|Variable|Mesures opérationnelles|
|Évaluation|2 à 4 semaines|Rapport de validation|
|Surveillance|Continue|Indicateurs et revues|

Les durées sont indicatives et dépendent de la taille, de la complexité et de la maturité de l'organisation.

## 12. Indicateurs de pilotage

|Indicateur|Définition possible|
|---|---|
|Couverture de l'inventaire|Actifs recensés par rapport aux actifs estimés|
|Couverture des risques|Actifs critiques avec risques évalués|
|Couverture des contrôles|Contrôles applicables évalués|
|Correctifs en retard|Vulnérabilités dépassant les délais définis|
|Revue des accès|Comptes examinés sur le périmètre prévu|
|Efficacité des sauvegardes|Restaurations réussies selon les critères établis|
|Détection|Alertes pertinentes traitées selon les objectifs|
|Incidents|Incidents analysés et actions associées|
|Actions correctives|Actions clôturées avec preuves|

Les objectifs chiffrés doivent être déterminés à partir de la situation de référence et des risques.

## 13. Critères de réussite

Le programme doit permettre de démontrer :

- Une gouvernance définie.
- Une connaissance suffisante des actifs et risques.
- Des objectifs de sécurité priorisés.
- Des contrôles adaptés et documentés.
- Des preuves de mise en œuvre et d'efficacité.
- Une gestion des incidents et de la continuité.
- Un suivi des risques résiduels.
- Un mécanisme d'amélioration continue.

## 14. Références

- NIST CSF 2.0 : https://www.nist.gov/cyberframework
- NIST SP 800-30 : [https://csrc.nist.gov/pubs/sp/800/30/r1/final](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- NIST SP 800-37 : https://csrc.nist.gov/pubs/sp/800/37/r2/final
- NIST SP 800-53 : https://csrc.nist.gov/pubs/sp/800/53/r5/final
- NIST SP 800-61 Rev. 3 : [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final)

---

**Fin du plan de mise en œuvre NIST.**