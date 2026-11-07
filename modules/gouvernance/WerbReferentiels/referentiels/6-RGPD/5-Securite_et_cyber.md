<!-- WerbReferentiels – Développé par @WerbHat -->
# Sécurité des données et cybersécurité

## Article 32 : une sécurité adaptée au risque

Le responsable et le sous-traitant mettent en œuvre des **mesures techniques et organisationnelles appropriées** au risque, compte tenu de l'état des connaissances, des coûts, de la nature du traitement et de la gravité pour les personnes. Le texte cite notamment :

- la **pseudonymisation** et le **chiffrement** ;
- des moyens garantissant la **confidentialité, l'intégrité, la disponibilité et la résilience** des systèmes ;
- la capacité de **rétablir** la disponibilité et l'accès aux données en cas d'incident (sauvegardes, reprise) ;
- une procédure pour **tester et évaluer régulièrement** l'efficacité des mesures.

Le RGPD ne donne pas de liste fermée : c'est au responsable de justifier que ses mesures sont à la hauteur du risque. Un SMSI fondé sur ISO 27001 et les mesures NIS2 en fournit l'essentiel, à condition de **repérer où sont les données personnelles** et de leur appliquer le bon niveau de protection.

---

## Les mesures qui comptent le plus

| Domaine | Mesure | Module WerbSMSI |
|---|---|---|
| Savoir où sont les données | Rattacher chaque traitement à ses SI et actifs | WerbRGPD (registre) relié à WerbMap |
| Contrôle d'accès | Comptes nominatifs, droits au besoin d'en connaître, revue périodique, suppression au départ | WerbExploitation (comptes et accès) |
| Traçabilité | Journaliser les accès aux données sensibles (images, RH, santé) | WerbExploitation, WerbIEC62443 |
| Cloisonnement | Données RH et sûreté hors des réseaux de production, filtrage | WerbMap (zones, flux), WerbCartoSI (schémas) |
| Chiffrement | Postes nomades, supports amovibles, sauvegardes externalisées, échanges | WerbExploitation (certificats) |
| Sauvegarde et reprise | Sauvegardes testées, copie hors ligne | WerbExploitation (sauvegardes), WerbPCR |
| Prestataires | Contrat article 28, accès à distance maîtrisés | WerbPresta |
| Sensibilisation | Former aux bons réflexes (pièces jointes, envoi de fichiers, rangement) | WerbAcademie |
| Purge | Supprimer à l'échéance, y compris les copies | WerbRGPD (durées) |

---

## Une violation de données, un incident NIS2 : deux notifications

Un même événement peut déclencher **deux obligations indépendantes** :

| | RGPD (violation de données) | NIS2 (incident important) |
|---|---|---|
| Ce qui est protégé | Les personnes dont les données sont touchées | La continuité des services de l'entité |
| Destinataire | **CNIL** | **ANSSI** (CERT-FR) en France |
| Délais | **72 h** après en avoir pris connaissance, si risque pour les personnes | **24 h** alerte précoce, **72 h** notification, **un mois** rapport final |
| Information des personnes | Si risque élevé | Information des destinataires des services, si nécessaire |

Exemple : un rançongiciel chiffre le serveur de supervision et le serveur RH, avec exfiltration. C'est un incident NIS2 (production arrêtée) **et** une violation de données (fichiers RH exfiltrés). Les deux notifications sont dues, par deux circuits. Préparez-les ensemble dans la procédure de gestion des incidents, avec un seul pilote.

---

## Correspondance avec ISO/IEC 27001 et 27701

| Exigence RGPD | ISO/IEC 27001:2022 (annexe A) | ISO/IEC 27701 |
|---|---|---|
| Article 5.2 — Responsabilité | Clauses 4 à 10 (le SMSI lui-même) | Extension du SMSI au système de management de la vie privée |
| Article 25 — Protection dès la conception | A.5.8, A.8.25 à A.8.28 | Exigences « privacy by design » |
| Article 28 — Sous-traitants | A.5.19 à A.5.22 | Obligations du responsable envers ses sous-traitants, obligations du sous-traitant |
| Article 30 — Registre | A.5.9 (inventaire), A.5.34 | Documentation des traitements |
| Article 32 — Sécurité | Ensemble des mesures, notamment A.5.15, A.8.5, A.8.11, A.8.13, A.8.24 | — |
| Articles 33 et 34 — Violations | A.5.24 à A.5.28 | Gestion des violations de données |
| Article 35 — AIPD | Clause 6.1 (appréciation des risques) | Analyse d'impact sur la vie privée |
| A.5.34 — Vie privée et protection des données à caractère personnel | Identifier et respecter les obligations légales | Mise en œuvre détaillée |
