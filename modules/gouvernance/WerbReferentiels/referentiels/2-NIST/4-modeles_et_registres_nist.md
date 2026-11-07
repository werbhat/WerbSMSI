<!-- WerbReferentiels – Développé par @WerbHat -->
# Modèles et registres NIST — Cybersécurité

**Nom du fichier :** `modeles_et_registres_nist.md`  
**Version :** 1.0

## 1. Objet

Ce document rassemble des modèles de travail pour mettre en œuvre et maintenir un programme de cybersécurité inspiré du NIST CSF 2.0 et des publications SP 800.

Les modèles doivent être adaptés au contexte, aux obligations applicables et aux règles de gestion documentaire de l'organisation.

## 2. Modèle — Fiche d'identification d'un système

|Champ|Valeur|
|---|---|
|Identifiant|À renseigner|
|Nom du système|À renseigner|
|Propriétaire métier|À désigner|
|Responsable technique|À désigner|
|Responsable sécurité|À désigner|
|Fonction métier|À décrire|
|Données traitées|À classifier|
|Criticité|À évaluer|
|Dépendances|À documenter|
|Fournisseurs|À renseigner|
|Périmètre|À définir|
|Dernière revue|À renseigner|

### Analyse complémentaire

- Fonction principale :
- Conséquences d'une indisponibilité :
- Conséquences d'une altération :
- Conséquences d'une divulgation :
- Exigences de disponibilité :
- Objectifs de reprise :
- Interfaces externes :
- Contraintes techniques :
- Exigences contractuelles et réglementaires :

---

## 3. Modèle — Inventaire des actifs

|ID|Nom de l'actif|Type|Propriétaire|Environnement|Criticité|Données sensibles|Version|Statut de support|
|---|---|---|---|---|---|---|---|---|
|ACT-001|À renseigner|Serveur/application/poste|À désigner|À définir|À évaluer|À classifier|À renseigner|À vérifier|
|ACT-002|À renseigner|Équipement réseau|À désigner|À définir|À évaluer|À classifier|À renseigner|À vérifier|

### Règles de gestion

- Utiliser un identifiant unique.
- Attribuer un propriétaire à chaque actif important.
- Documenter la date de vérification.
- Identifier les actifs exposés à Internet.
- Documenter les dépendances critiques.
- Contrôler l'accès à l'inventaire.
- Réviser les informations lors des changements.

---

## 4. Modèle — Profil actuel NIST CSF 2.0

|Fonction|Résultat attendu|Situation observée|Preuves|Écart|Priorité|
|---|---|---|---|---|---|
|Govern|À définir|À évaluer|À collecter|À analyser|À définir|
|Identify|À définir|À évaluer|À collecter|À analyser|À définir|
|Protect|À définir|À évaluer|À collecter|À analyser|À définir|
|Detect|À définir|À évaluer|À collecter|À analyser|À définir|
|Respond|À définir|À évaluer|À collecter|À analyser|À définir|
|Recover|À définir|À évaluer|À collecter|À analyser|À définir|

### Fiche détaillée d'un résultat

- Fonction :
- Catégorie et sous-catégorie CSF :
- Périmètre :
- Résultat attendu :
- Situation actuelle :
- Preuves :
- Incertitudes :
- Risque associé :
- Résultat cible :
- Action nécessaire :
- Responsable :
- Échéance :

Le profil actuel décrit les résultats observés. Il ne doit pas être renseigné uniquement sur la base des procédures théoriques.

---

## 5. Modèle — Profil cible NIST CSF 2.0

|ID|Fonction|Résultat cible|Justification métier|Risque traité|Responsable|Échéance|
|---|---|---|---|---|---|---|
|CIB-001|Govern|À définir|À documenter|À associer|À désigner|À fixer|
|CIB-002|Identify|À définir|À documenter|À associer|À désigner|À fixer|
|CIB-003|Protect|À définir|À documenter|À associer|À désigner|À fixer|
|CIB-004|Detect|À définir|À documenter|À associer|À désigner|À fixer|
|CIB-005|Respond|À définir|À documenter|À associer|À désigner|À fixer|
|CIB-006|Recover|À définir|À documenter|À associer|À désigner|À fixer|

Le profil cible doit refléter les besoins réels de l'organisation et être approuvé par les responsables compétents.

---

## 6. Modèle — Registre des risques

|ID|Actif|Scénario|Menace|Vulnérabilité|Impact|Vraisemblance|Niveau de risque|Traitement|
|---|---|---|---|---|---|---|---|---|
|RIS-001|À renseigner|À décrire|À analyser|À analyser|À évaluer|À évaluer|À calculer|À décider|
|RIS-002|À renseigner|À décrire|À analyser|À analyser|À évaluer|À évaluer|À calculer|À décider|

### Fiche détaillée de risque

**Identifiant :** RIS-XXX

**Contexte**

- Actif ou processus :
- Propriétaire du risque :
- Événement redouté :
- Source de menace :
- Vulnérabilité ou condition facilitatrice :
- Mesures existantes :

**Évaluation**

- Méthode de cotation :
- Critères d'impact :
- Critères de vraisemblance :
- Niveau initial :
- Justification :
- Incertitudes :

**Traitement**

- Option choisie :
- Mesures proposées :
- Responsable :
- Échéance :
- Niveau résiduel :
- Décision d'acceptation :
- Approbateur :
- Date de réexamen :

Les critères de cotation et d'acceptation doivent être définis avant l'évaluation. Les niveaux ne doivent pas être inventés a posteriori pour justifier une décision.

---

## 7. Modèle — Matrice des contrôles NIST SP 800-53

|ID|Famille|Référence du contrôle|Applicabilité|Implémentation|Responsable|Preuve|Évaluation|
|---|---|---|---|---|---|---|---|
|CTL-001|AC|À sélectionner|À évaluer|À documenter|À désigner|À collecter|À évaluer|
|CTL-002|IA|À sélectionner|À évaluer|À documenter|À désigner|À collecter|À évaluer|
|CTL-003|AU|À sélectionner|À évaluer|À documenter|À désigner|À collecter|À évaluer|
|CTL-004|CM|À sélectionner|À évaluer|À documenter|À désigner|À collecter|À évaluer|
|CTL-005|IR|À sélectionner|À évaluer|À documenter|À désigner|À collecter|À évaluer|

### Informations à conserver pour chaque contrôle

- Référence exacte et version de la publication.
- Intitulé officiel.
- Objectif de sécurité.
- Applicabilité.
- Paramètres ou exigences spécifiques.
- Responsabilité d'implémentation.
- Contrôles hérités d'un service partagé.
- Preuves de mise en œuvre.
- Méthode d'évaluation.
- Résultat.
- Écart éventuel.
- Plan de correction.

La sélection des contrôles doit être fondée sur le périmètre, les risques et les exigences applicables. Cette matrice n'est pas un inventaire exhaustif de SP 800-53.

---

## 8. Modèle — Plan d'action

|ID|Écart ou risque|Action|Priorité|Responsable|Échéance|Preuve de réussite|Statut|
|---|---|---|---|---|---|---|---|
|POA-001|À préciser|À définir|À évaluer|À désigner|À fixer|À définir|À planifier|
|POA-002|À préciser|À définir|À évaluer|À désigner|À fixer|À définir|À planifier|

### États possibles

- À planifier.
- En cours.
- En attente de validation.
- Bloquée.
- Terminée, preuve à vérifier.
- Clôturée.
- Abandonnée avec justification approuvée.

Chaque action doit être associée à un risque ou à un objectif explicite.

---

## 9. Modèle — Registre des preuves

|ID|Contrôle ou objectif|Preuve|Source|Date|Collecteur|Résultat|Emplacement|
|---|---|---|---|---|---|---|---|
|PRE-001|À référencer|À décrire|À renseigner|À renseigner|À désigner|À évaluer|À renseigner|
|PRE-002|À référencer|À décrire|À renseigner|À renseigner|À désigner|À évaluer|À renseigner|

### Critères de qualité

- Pertinence par rapport au contrôle.
- Provenance identifiable.
- Date et périmètre connus.
- Intégrité préservée.
- Accès maîtrisé.
- Possibilité de reproduire la vérification.

Une politique démontre qu'une règle existe dans la documentation. Elle ne prouve pas, à elle seule, que cette règle est appliquée efficacement.

---

## 10. Modèle — Registre des incidents

|ID|Date|Système concerné|Type d'incident|Gravité|Statut|Responsable|Actions|
|---|---|---|---|---|---|---|---|
|INC-001|À renseigner|À préciser|À qualifier|À évaluer|Ouvert|À désigner|À définir|
|INC-002|À renseigner|À préciser|À qualifier|À évaluer|Ouvert|À désigner|À définir|

### Fiche détaillée d'incident

- Identifiant :
- Date de détection :
- Source du signalement :
- Systèmes concernés :
- Description factuelle :
- Indicateurs observés :
- Évaluation de l'impact :
- Décision de qualification :
- Responsable de l'incident :
- Actions de confinement :
- Actions d'éradication :
- Actions de rétablissement :
- Éléments de preuve conservés :
- Communications effectuées :
- Décisions et validations :
- Analyse de cause :
- Mesures correctives :
- Date de clôture :

Les délais et obligations de notification doivent être déterminés selon les textes et contrats applicables. Ce modèle ne remplace pas les procédures réglementaires de notification.

---

## 11. Modèle — Plan de réponse aux incidents

### Préparation

- Responsable de réponse :
- Suppléant :
- Équipe technique :
- Équipe métier :
- Contacts des fournisseurs :
- Contacts de crise :
- Procédure d'escalade :
- Emplacement des procédures :
- Moyens de communication alternatifs :

### Détection et analyse

- Sources d'alerte :
- Critères de qualification :
- Critères de gravité :
- Méthode de collecte des preuves :
- Procédure d'escalade :
- Règles de conservation :

### Réponse

- Autorité habilitée à décider du confinement :
- Mesures autorisées :
- Restrictions opérationnelles :
- Coordination avec les fournisseurs :
- Exigences de notification :
- Critères de clôture :

### Rétablissement

- Conditions de restauration :
- Vérification de l'intégrité :
- Validation métier :
- Surveillance renforcée :
- Communication du rétablissement :
- Retour d'expérience :

Ce plan doit être testé au moyen d'exercices adaptés au périmètre et aux conséquences potentielles d'un incident.

---

## 12. Modèle — Continuité et restauration

|Service|Criticité|Objectif de reprise|Perte de données acceptable|Sauvegarde|Test de restauration|
|---|---|---|---|---|---|
|À renseigner|À évaluer|À définir|À définir|À documenter|À planifier|

### Fiche de restauration

- Service :
- Responsable :
- Dépendances :
- Sauvegarde de référence :
- Vérification d'intégrité :
- Conditions de restauration :
- Tests fonctionnels :
- Validation métier :
- Résultat :
- Écarts :
- Date du prochain test :

Les objectifs de reprise doivent être établis à partir d'une analyse d'impact métier et des contraintes réelles des systèmes.

---

## 13. Modèle — Registre fournisseurs

|ID|Fournisseur|Service|Criticité|Accès aux données|Accès au SI|Évaluation|Actions|
|---|---|---|---|---|---|---|---|
|FOUR-001|À renseigner|À décrire|À évaluer|À préciser|À préciser|À planifier|À définir|
|FOUR-002|À renseigner|À décrire|À évaluer|À préciser|À préciser|À planifier|À définir|

### Points de contrôle

- Criticité du service.
- Données et systèmes accessibles.
- Sous-traitants et dépendances.
- Engagements de sécurité.
- Gestion des vulnérabilités.
- Notification des incidents.
- Continuité du service.
- Conditions de fin de contrat.
- Suppression ou restitution des données.
- Réévaluation périodique.

---

## 14. Modèle — Tableau de bord de cybersécurité

|Indicateur|Définition|Fréquence|Responsable|Objectif|
|---|---|---|---|---|
|Couverture de l'inventaire|Actifs recensés par rapport aux actifs estimés|Mensuelle|Gestion des actifs|À définir|
|Risques évalués|Actifs critiques dont les risques ont été analysés|Mensuelle|Gestion des risques|À définir|
|Contrôles évalués|Contrôles applicables disposant d'une évaluation|Trimestrielle|Sécurité|À définir|
|Vulnérabilités critiques|Vulnérabilités prioritaires non traitées|Mensuelle|Exploitation|À définir|
|Revue des accès|Comptes revus selon le calendrier|Trimestrielle|IAM|À définir|
|Sauvegardes testées|Restaurations ayant satisfait les critères|Selon criticité|Exploitation|À définir|
|Incidents analysés|Incidents ayant une analyse documentée|Mensuelle|Réponse aux incidents|À définir|
|Actions en retard|Actions échues non clôturées|Mensuelle|Responsable du programme|À définir|

Pour chaque indicateur, définir une méthode de calcul, une source de données, un responsable et les limites d'interprétation.

---

## 15. Règles de gestion documentaire

- Attribuer un identifiant unique à chaque registre.
- Désigner un propriétaire.
- Définir les droits d'accès.
- Enregistrer la date de dernière révision.
- Conserver l'historique des modifications.
- Relier les contrôles aux preuves.
- Relier les écarts aux actions correctives.
- Protéger les informations techniques sensibles.
- Prévoir des revues périodiques.

## 16. Références officielles

- NIST CSF : https://www.nist.gov/cyberframework
- NIST SP 800-53 : https://csrc.nist.gov/pubs/sp/800/53/r5/final
- NIST SP 800-30 : [https://csrc.nist.gov/pubs/sp/800/30/r1/final](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- NIST SP 800-37 : https://csrc.nist.gov/pubs/sp/800/37/r2/final
- NIST SP 800-61 Rev. 3 : [https://csrc.nist.gov/pubs/sp/800/61/r3/final](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- NIST SP 800-82 Rev. 3 : https://csrc.nist.gov/pubs/sp/800/82/r3/final

---

**Fin des modèles et registres NIST.**