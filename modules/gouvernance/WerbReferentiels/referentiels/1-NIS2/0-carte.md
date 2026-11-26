<!-- WerbReferentiels – Développé par @WerbHat -->
# Carte NIS2 — directive (UE) 2022/2555 sur un niveau élevé commun de cybersécurité

La directive NIS2 remplace la directive NIS de 2016. Elle élargit le nombre de secteurs et d'entités concernés, impose des mesures de gestion des risques, la notification des incidents et engage la responsabilité des dirigeants. Les obligations précises dépendent de sa **transposition nationale** : en France, se reporter à l'ANSSI et à MonEspaceNIS2 (voir les [sources](sources.md)).

- Champ d'application
  - Annexe I : 11 secteurs hautement critiques
  - Annexe II : 7 autres secteurs critiques
  - En principe moyennes et grandes entreprises
  - Entités essentielles (EE) et entités importantes (EI)
- Gouvernance (art. 20)
  - La direction approuve les mesures et en supervise l'application
  - Responsabilité des dirigeants
  - Formation obligatoire des membres de la direction
- [Mesures de gestion des risques (art. 21)](1-obligations.md)
  - 10 domaines, de l'analyse de risques à l'authentification multifacteur
  - Approche « tous risques », proportionnée à l'exposition
- [Notification des incidents (art. 23)](1-obligations.md)
  - Alerte précoce sous 24 h
  - Notification sous 72 h
  - Rapport final sous un mois
- Supervision et sanctions (art. 31 à 36)
  - EE : contrôle a priori et a posteriori
  - EI : contrôle a posteriori
  - Amendes administratives plafonnées
- Textes liés
  - Règlement d'exécution (UE) 2024/2690 : mesures techniques pour les entités numériques
  - [Correspondance avec ISO 27001, NIST et IEC 62443](../correspondances.md)
- [Sources officielles](sources.md)

## Les secteurs

| Annexe I — secteurs hautement critiques | Annexe II — autres secteurs critiques |
|---|---|
| Énergie (électricité, réseaux de chaleur, pétrole, gaz, hydrogène) | Services postaux et d'expédition |
| Transports (aérien, ferroviaire, par eau, routier) | Gestion des déchets |
| Secteur bancaire | Fabrication, production et distribution de produits chimiques |
| Infrastructures des marchés financiers | Production, transformation et distribution des denrées alimentaires |
| Santé | Fabrication (dispositifs médicaux, électronique, équipements électriques, machines, véhicules…) |
| Eau potable | Fournisseurs numériques (places de marché, moteurs de recherche, réseaux sociaux) |
| Eaux usées | Recherche |
| Infrastructures numériques | |
| Gestion des services TIC (entre entreprises) | |
| Administration publique | |
| Espace | |

## Entité essentielle ou importante

En règle générale, une **grande entreprise** d'un secteur de l'annexe I est une entité **essentielle** ; les autres entités du champ (moyennes entreprises de l'annexe I, entreprises de l'annexe II) sont des entités **importantes**. Certaines entités sont concernées quelle que soit leur taille (fournisseurs DNS, registres de noms de domaine, prestataires de services de confiance qualifiés, entités désignées par l'État…). La qualification d'une entité se vérifie avec les critères de la transposition nationale.

| | Entité essentielle | Entité importante |
|---|---|---|
| Mesures (art. 21) et notification (art. 23) | Oui | Oui |
| Supervision | A priori et a posteriori | A posteriori, sur indices |
| Amende maximale | au moins 10 M€ ou 2 % du chiffre d'affaires annuel mondial | au moins 7 M€ ou 1,4 % du chiffre d'affaires annuel mondial |

> Pour un groupe multisite, l'assujettissement s'apprécie par entité juridique : c'est un point d'entrée de la base groupe envisagée dans WerbGouvernance (référentiels applicables par entité).
