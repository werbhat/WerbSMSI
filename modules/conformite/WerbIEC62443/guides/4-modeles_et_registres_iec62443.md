<!-- WerbIEC62443 – Développé par @WerbHat -->
# Modèles et registres IEC 62443 — Cybersécurité industrielle

**Nom du fichier :** `modeles_et_registres_iec62443.md`  
**Version :** 1.0

## 1. Objet du document

Ce document contient des modèles Markdown réutilisables pour constituer un dossier de cybersécurité industrielle.

Les exemples sont des gabarits à compléter. Les valeurs de démonstration ne doivent pas être interprétées comme des résultats d'analyse de risques ou des exigences normatives.

---

## 2. Modèle — Fiche d'identification du système

### Informations générales

|Champ|Valeur|
|---|---|
|Identifiant du système|À renseigner|
|Nom du système|À renseigner|
|Site industriel|À renseigner|
|Responsable opérationnel|À renseigner|
|Responsable technique|À renseigner|
|Responsable cybersécurité OT|À renseigner|
|Fonction industrielle|À renseigner|
|Conséquence d'une indisponibilité|À évaluer|
|Périmètre inclus|À renseigner|
|Interfaces externes|À renseigner|
|Date de création|À renseigner|
|Dernière révision|À renseigner|

### Fonctions et contraintes

- Fonction principale du système :
- Fonctions secondaires :
- Dépendances critiques :
- Contraintes de disponibilité :
- Contraintes de sûreté de fonctionnement :
- Contraintes de maintenance :
- Fenêtres de changement autorisées :
- Exigences réglementaires ou contractuelles :

---

## 3. Modèle — Inventaire des actifs OT

|ID|Actif|Type|Zone|Fabricant|Modèle|Version|Adresse réseau|Criticité|Statut de support|Responsable|
|---|---|---|---|---|---|---|---|---|---|---|
|ACT-001|À renseigner|PLC/HMI/Serveur|À définir|À renseigner|À renseigner|À renseigner|À renseigner|À évaluer|À vérifier|À désigner|
|ACT-002|À renseigner|Switch/Pare-feu|À définir|À renseigner|À renseigner|À renseigner|À renseigner|À évaluer|À vérifier|À désigner|
|ACT-003|À renseigner|Station d'ingénierie|À définir|À renseigner|À renseigner|À renseigner|À renseigner|À évaluer|À vérifier|À désigner|

### Règles de gestion

- Attribuer un identifiant unique à chaque actif.
- Enregistrer la source et la date de vérification des informations.
- Distinguer les versions déclarées des versions réellement vérifiées.
- Identifier les équipements dont la collecte d'informations est limitée.
- Documenter les équipements en fin de support.
- Restreindre l'accès à l'inventaire lorsque celui-ci contient des informations sensibles sur l'architecture.

---

## 4. Modèle — Registre des zones

|ID zone|Nom|Fonction|Actifs inclus|Criticité|Niveau cible justifié|Responsable|Date de validation|
|---|---|---|---|---|---|---|---|
|ZON-001|À définir|À décrire|ACT-001, etc.|À évaluer|À déterminer|À désigner|À renseigner|
|ZON-002|À définir|À décrire|ACT-002, etc.|À évaluer|À déterminer|À désigner|À renseigner|

### Fiche détaillée d'une zone

- Identifiant :
- Objectif opérationnel :
- Liste des actifs :
- Flux entrants autorisés :
- Flux sortants autorisés :
- Menaces principales :
- Conséquences redoutées :
- Mesures existantes :
- Niveau de sécurité cible :
- Justification issue de l'analyse de risques :
- Risques résiduels :
- Responsable de validation :

---

## 5. Modèle — Registre des conduits

|ID conduit|Zone source|Zone destination|Finalité|Protocoles|Flux autorisés|Protection|Journalisation|Responsable|
|---|---|---|---|---|---|---|---|---|
|CON-001|À définir|À définir|À documenter|À renseigner|À définir|À préciser|À préciser|À désigner|
|CON-002|À définir|À définir|À documenter|À renseigner|À définir|À préciser|À préciser|À désigner|

### Fiche détaillée d'un conduit

- Identifiant du conduit :
- Zones reliées :
- Justification métier :
- Initiateur de la communication :
- Destination :
- Protocoles et ports nécessaires :
- Sens de communication :
- Équipements intermédiaires :
- Mécanismes de filtrage :
- Authentification et chiffrement, lorsque pertinents :
- Détection et journalisation :
- Risques associés :
- Niveau cible et justification :
- Tests réalisés :
- Date de revue :
- Approbateur :

Toute règle réseau doit être justifiée par un besoin documenté. Les détails techniques doivent être conservés dans un référentiel à accès contrôlé.

---

## 6. Modèle — Registre des risques

|ID|Actif ou zone|Scénario de risque|Menace|Vulnérabilité|Conséquence|Vraisemblance|Niveau de risque|Traitement|Responsable|
|---|---|---|---|---|---|---|---|---|---|
|RIS-001|À renseigner|À décrire|À analyser|À analyser|À évaluer|À évaluer|À calculer|À décider|À désigner|
|RIS-002|À renseigner|À décrire|À analyser|À analyser|À évaluer|À évaluer|À calculer|À décider|À désigner|

### Fiche détaillée de risque

**Identifiant :** RIS-XXX

**Description du scénario**

- Actif ou fonction concernée :
- Événement redouté :
- Menace :
- Vulnérabilité ou condition facilitatrice :
- Chemin d'attaque possible :
- Mesures préventives existantes :
- Mesures de détection existantes :
- Conséquences sur la production :
- Conséquences sur les personnes et l'environnement :
- Conséquences sur la confidentialité, l'intégrité et la disponibilité :

**Évaluation**

- Méthode d'évaluation :
- Critères de vraisemblance :
- Critères d'impact :
- Niveau de risque initial :
- Critères d'acceptation applicables :

**Traitement**

- Réduction, acceptation, transfert ou évitement :
- Mesures proposées :
- Responsable :
- Échéance :
- Risque résiduel :
- Décision d'acceptation :
- Approbateur :
- Date de révision :

Les niveaux de risque doivent être calculés selon une méthode définie par l'organisation. Il ne faut pas inventer une cotation sans critères d'impact, de vraisemblance et d'acceptation.

---

## 7. Modèle — Plan de traitement des risques

|ID action|Risque associé|Action|Priorité|Responsable|Ressources nécessaires|Échéance|Critère de réussite|Statut|
|---|---|---|---|---|---|---|---|---|
|ACT-CYB-001|RIS-XXX|À définir|À évaluer|À désigner|À estimer|À fixer|Preuve vérifiable|À planifier|
|ACT-CYB-002|RIS-XXX|À définir|À évaluer|À désigner|À estimer|À fixer|Preuve vérifiable|À planifier|

### États possibles

- À planifier.
- Planifiée.
- En cours.
- En attente de validation.
- Bloquée.
- Terminée, preuve à vérifier.
- Clôturée.
- Abandonnée avec justification approuvée.

Une action ne doit être clôturée qu'après vérification du critère de réussite.

---

## 8. Modèle — Registre des preuves d'audit

|ID preuve|Contrôle ou exigence|Document ou élément|Source|Date de collecte|Collecteur|Résultat|Emplacement sécurisé|
|---|---|---|---|---|---|---|---|
|PRE-001|À référencer|À décrire|À préciser|À renseigner|À désigner|À évaluer|À renseigner|
|PRE-002|À référencer|À décrire|À préciser|À renseigner|À désigner|À évaluer|À renseigner|

### Critères de qualité d'une preuve

- Elle est pertinente par rapport au critère audité.
- Sa provenance est connue.
- Sa date est connue.
- Elle est suffisamment précise pour permettre la vérification.
- Son intégrité est préservée.
- Son accès est maîtrisé.
- Les données sensibles sont protégées.

Une procédure écrite démontre qu'une règle est documentée, mais ne prouve pas à elle seule que cette règle est appliquée en pratique. Des configurations, journaux, observations ou entretiens peuvent être nécessaires.

---

## 9. Modèle — Registre des changements industriels

|ID changement|Système concerné|Description|Justification|Risques analysés|Tests requis|Retour arrière|Approbateur|Statut|
|---|---|---|---|---|---|---|---|---|
|CHG-001|À renseigner|À décrire|À préciser|À évaluer|À définir|À définir|À désigner|À planifier|
|CHG-002|À renseigner|À décrire|À préciser|À évaluer|À définir|À définir|À désigner|À planifier|

### Fiche de changement

- Identifiant :
- Demandeur :
- Périmètre :
- Configuration initiale :
- Configuration cible :
- Motif du changement :
- Analyse d'impact cyber :
- Analyse d'impact sur le procédé :
- Analyse d'impact sur la sûreté :
- Sauvegarde préalable :
- Plan de tests :
- Fenêtre d'intervention :
- Plan de retour arrière :
- Résultats des tests :
- Validation opérationnelle :
- Documentation mise à jour :
- Approbation finale :

---

## 10. Modèle — Registre des vulnérabilités et correctifs

|ID|Actif|Vulnérabilité ou avis|Source|Exposition|Criticité contextualisée|Décision|Mesure compensatoire|Échéance|Statut|
|---|---|---|---|---|---|---|---|---|---|
|VUL-001|À renseigner|À référencer|À préciser|À analyser|À évaluer|À décider|À définir|À fixer|Ouvert|
|VUL-002|À renseigner|À référencer|À préciser|À analyser|À évaluer|À décider|À définir|À fixer|Ouvert|

### Décisions possibles

- Correctif applicable après validation.
- Correctif en attente de test.
- Correctif non applicable pour raison technique.
- Risque réduit par une mesure compensatoire.
- Risque accepté formellement.
- Équipement à remplacer.
- Évaluation complémentaire nécessaire.

L'absence de correctif ne doit pas entraîner l'absence de suivi. La décision, le risque résiduel, les mesures compensatoires et la date de réévaluation doivent être documentés.

---

## 11. Modèle — Registre des comptes et accès privilégiés

|ID compte|Système|Type de compte|Responsable|Justification|Privilèges|Mode d'authentification|Date de revue|
|---|---|---|---|---|---|---|---|
|IAM-001|À renseigner|Individuel/service/partagé|À désigner|À préciser|À limiter|À documenter|À renseigner|
|IAM-002|À renseigner|Individuel/service/partagé|À désigner|À préciser|À limiter|À documenter|À renseigner|

### Contrôles de revue

- Le compte est-il toujours nécessaire ?
- Le propriétaire est-il identifié ?
- Les privilèges sont-ils justifiés ?
- Le compte est-il utilisé ?
- L'authentification est-elle adaptée au risque ?
- La création, la modification et la suppression sont-elles tracées ?
- Les comptes techniques ont-ils une procédure de gestion spécifique ?
- Les accès temporaires ont-ils une date d'expiration ou une revue planifiée ?

Ne jamais conserver de mots de passe, de secrets ou de clés privées en clair dans ce registre.

---

## 12. Modèle — Fiche de dérogation

**Identifiant :** DER-XXX

- Demandeur :
- Système ou zone concernée :
- Exigence ou mesure concernée :
- Motif de la dérogation :
- Contraintes opérationnelles :
- Risques induits :
- Mesures compensatoires :
- Risque résiduel :
- Durée de validité :
- Date de réexamen :
- Responsable de suivi :
- Approbateur compétent :
- Conditions de retrait :
- Preuves de validation :

Toute dérogation doit être limitée dans le temps lorsque cela est possible, réexaminée périodiquement et associée à une décision explicite sur le risque résiduel.

---

## 13. Modèle — Plan de sauvegarde et de restauration

|Système|Éléments sauvegardés|Fréquence|Emplacement|Protection|Responsable|Dernier test|Résultat|
|---|---|---|---|---|---|---|---|
|À renseigner|Configuration, programme, documentation|À définir|À sécuriser|À documenter|À désigner|À renseigner|À évaluer|

### Procédure de restauration

1. Identifier le système et la version de référence.
2. Vérifier la disponibilité et l'intégrité de la sauvegarde.
3. Vérifier les dépendances et prérequis.
4. Obtenir l'autorisation opérationnelle.
5. Restaurer dans les conditions prévues.
6. Vérifier les configurations et communications.
7. Tester les fonctions industrielles concernées.
8. Faire valider le retour en service.
9. Documenter le résultat et les écarts.

Les essais doivent être adaptés à la criticité et réalisés sans compromettre la sécurité de l'installation.

---

## 14. Modèle — Tableau de bord de cybersécurité OT

|Indicateur|Définition|Fréquence|Responsable|Objectif|Dernier résultat|
|---|---|---|---|---|---|
|Couverture de l'inventaire|Actifs connus / actifs estimés|Mensuelle|Responsable OT|À définir|À mesurer|
|Revue des accès|Comptes revus / comptes concernés|Trimestrielle ou selon risque|Responsable IAM|À définir|À mesurer|
|Sauvegardes testées|Sauvegardes ayant fait l'objet d'un test concluant|Selon criticité|Maintenance|À définir|À mesurer|
|Vulnérabilités critiques|Nombre de vulnérabilités critiques non traitées|Mensuelle|Cybersécurité OT|À définir|À mesurer|
|Flux documentés|Flux validés / flux identifiés|Trimestrielle|Réseaux OT|À définir|À mesurer|
|Actions en retard|Actions échues non clôturées|Mensuelle|Responsable du programme|À définir|À mesurer|

Les objectifs doivent être définis à partir des risques, de la situation de référence et des capacités de l'organisation.

---

## 15. Règles de gestion documentaire

Pour tous les registres :

- Attribuer un identifiant unique.
- Désigner un propriétaire.
- Définir les droits de lecture et de modification.
- Enregistrer la date de dernière mise à jour.
- Conserver l'historique des modifications.
- Définir une fréquence de revue.
- Protéger les informations techniques sensibles.
- Relier les décisions aux preuves et aux risques correspondants.

## 16. Références

- IEC : https://www.iec.ch/
- ISA/IEC 62443 : https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards
- ANSSI — Classification des systèmes industriels : [https://messervices.cyber.gouv.fr/guides/la-cybersecurite-des-systemes-industriels](https://messervices.cyber.gouv.fr/guides/la-cybersecurite-des-systemes-industriels)
- ANSSI — Mesures détaillées : [https://messervices.cyber.gouv.fr/guides/la-cybersecurite-des-systemes-industriels-mesures-detaillees](https://messervices.cyber.gouv.fr/guides/la-cybersecurite-des-systemes-industriels-mesures-detaillees)

---

**Fin des modèles et registres IEC 62443.**