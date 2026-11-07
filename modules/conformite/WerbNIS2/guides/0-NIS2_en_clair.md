<!-- WerbNIS2 – Développé par @WerbHat -->
# NIS2 en clair

La directive européenne **NIS2** (directive (UE) 2022/2555) élargit fortement le nombre d'entreprises tenues de protéger leurs systèmes d'information et de déclarer leurs incidents. Ce guide explique, sans jargon juridique, **qui est concerné**, **ce qui est demandé** et **ce que cela change pour la direction**. Le guide suivant, *Conduire un audit NIS2*, explique comment mesurer l'écart avec WerbNIS2.

> **À vérifier** : la directive est transposée dans le droit de chaque pays, puis précisée par des textes d'application et les référentiels de l'autorité nationale (l'ANSSI en France). Les seuils, délais et montants ci-dessous sont ceux de la directive : vérifiez toujours les textes en vigueur pour votre entité.

---

## 1. Pourquoi NIS2

La première directive (NIS, 2016) visait quelques centaines d'opérateurs. Depuis, les attaques par rançongiciel ont touché des hôpitaux, des collectivités, des industriels et leurs fournisseurs. NIS2 étend les obligations à **des milliers d'entités** de taille moyenne et grande, dans de nombreux secteurs, et rend la direction responsable.

---

## 2. Suis-je concerné ?

Trois questions, dans l'ordre :

1. **Mon activité figure-t-elle dans un secteur de la directive ?** Secteurs « hautement critiques » (énergie, transports, santé, eau potable et eaux usées, infrastructures numériques, administration…) et « autres secteurs critiques » (services postaux, gestion des déchets, chimie, alimentaire, **fabrication** de nombreux produits : machines, équipements électriques, véhicules, dispositifs médicaux, électronique…).
2. **Quelle est ma taille ?** En règle générale, les **moyennes entreprises** (à partir de 50 salariés ou plus de 10 M€ de chiffre d'affaires) et les **grandes** sont concernées ; certaines entités le sont quelle que soit leur taille.
3. **Quelle est ma catégorie ?**

| Catégorie | Qui, en général | Contrôle |
|---|---|---|
| **Entité essentielle (EE)** | Grandes entreprises des secteurs hautement critiques, et quelques cas désignés | Contrôles possibles à tout moment |
| **Entité importante (EI)** | Les autres entités concernées | Contrôles surtout après un incident ou un signalement |

Un groupe est concerné entité par entité : une filiale de production peut l'être alors qu'une autre ne l'est pas. Même non concerné, un sous-traitant le devient souvent **indirectement** : ses clients soumis à NIS2 lui imposeront des exigences par contrat.

---

## 3. Ce que la directive demande

### Gérer les risques

L'entité prend des mesures **proportionnées à ses risques** (article 21 de la directive). Elles couvrent au minimum :

- l'analyse des risques et la politique de sécurité ;
- la gestion des incidents ;
- la continuité d'activité : sauvegardes, reprise, gestion de crise ;
- la sécurité de la chaîne d'approvisionnement (fournisseurs, prestataires) ;
- la sécurité dans l'acquisition, le développement et la maintenance des systèmes, y compris le traitement des vulnérabilités ;
- l'évaluation de l'efficacité des mesures ;
- l'hygiène informatique et la formation ;
- la cryptographie et le chiffrement ;
- la sécurité des ressources humaines, le contrôle d'accès et la gestion des actifs ;
- l'authentification multifacteur et les communications sécurisées quand c'est approprié.

### Déclarer les incidents importants

| Délai | Ce qu'on envoie à l'autorité |
|---|---|
| **24 h** après en avoir eu connaissance | Une **alerte précoce** : un incident important est en cours, est-il malveillant, peut-il toucher d'autres pays ? |
| **72 h** | La **notification** : première évaluation, gravité, impact, indicateurs de compromission |
| **1 mois** | Le **rapport final** : description détaillée, cause probable, mesures prises |

Ces délais supposent d'être **prêt avant** : savoir détecter, savoir qui décide qu'un incident est important, savoir qui déclare et comment.

### Engager la direction

Les organes de direction **approuvent** les mesures de gestion des risques, **supervisent** leur mise en œuvre, **suivent une formation** et peuvent être **tenus pour responsables** des manquements.

---

## 4. Les sanctions

| Catégorie | Amende maximale prévue par la directive |
|---|---|
| Entité essentielle | 10 M€ ou 2 % du chiffre d'affaires mondial annuel (le plus élevé des deux) |
| Entité importante | 7 M€ ou 1,4 % du chiffre d'affaires mondial annuel (le plus élevé des deux) |

S'y ajoutent des injonctions, des audits imposés et, pour les entités essentielles, la possibilité d'écarter temporairement un dirigeant. Le risque le plus concret reste toutefois l'incident lui-même : arrêt de production, perte de clients, coût de la reprise.

---

## 5. Par où commencer

1. **Vérifier le statut** de chaque entité du groupe (secteur, taille, catégorie) et s'enregistrer auprès de l'autorité si nécessaire.
2. **Nommer un responsable** et un point de contact, informer et former la direction.
3. **Délimiter le périmètre** : activités, services, systèmes d'information qui les supportent.
4. **Mesurer l'écart** avec les exigences (c'est l'audit de WerbNIS2).
5. **Préparer la déclaration des incidents** : procédure, rôles, modèles, exercice.
6. **Planifier les actions** par priorité, et suivre leur avancement en revue de direction.

Une organisation qui tient déjà un SMSI (ISO/IEC 27001) ou une démarche IEC 62443 a fait une grande partie du chemin : les mêmes preuves servent.

---

## 6. Les idées reçues

- **« Nous sommes trop petits. »** Le critère de taille ne suffit pas toujours, et les clients soumis à NIS2 répercutent leurs exigences sur leurs fournisseurs.
- **« C'est un sujet informatique. »** NIS2 vise explicitement la direction, la continuité d'activité, les fournisseurs et les ressources humaines.
- **« Il suffit d'acheter une solution. »** Aucun produit ne rend conforme : ce sont l'organisation, les mesures et leurs preuves qui comptent.
- **« L'informatique industrielle n'est pas concernée. »** Les systèmes qui supportent les activités du périmètre le sont, qu'ils soient de bureau ou industriels.

---

## 7. Dans WerbNIS2

- **Entité et site** : identification, assujettissement (statut EE ou EI, secteur, déclaration), dirigeant et point de contact, périmètre et systèmes d'information réglementés (SIR).
- **Grille d'audit** : 152 points de contrôle en 28 thématiques, qui déclinent **20 règles** ; chacun se cote (OK, PL +, PL −, NC, N/A) avec sa preuve et sa justification.
- **Couverture** par thématique et par règle, **plan d'actions** des écarts, **rapport** d'audit imprimable.
- Les indicateurs de formation publiés par WerbAcademie sont rappelés en regard des points qui demandent une preuve de formation.

La méthode détaillée est dans le guide suivant : [Conduire un audit NIS2](1-Conduire_audit_NIS2.md).

> **En résumé** : NIS2 demande de connaître ses risques, de s'en protéger de façon proportionnée, d'être prêt à déclarer un incident en 24 heures, et d'impliquer la direction. Le premier pas est de savoir où l'on en est.
