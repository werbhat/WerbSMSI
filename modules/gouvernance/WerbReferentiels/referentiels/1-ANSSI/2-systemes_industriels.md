<!-- WerbReferentiels – Développé par @WerbHat -->
# Systèmes industriels — la classification ANSSI

Synthèse des guides *La cybersécurité des systèmes industriels* de l'ANSSI : la **méthode de classification et les mesures principales**, et les **mesures détaillées**. Elle donne les repères ; la classification d'une installation se fait avec les guides eux-mêmes (voir les [sources](sources.md)).

## Le principe

Chaque système industriel reçoit une **classe de cybersécurité** de 1 à 3, déterminée par :

- la **gravité** des conséquences d'une attaque (impacts humains, environnementaux, sur la production et sur les services rendus) ;
- la **vraisemblance** d'une attaque, appréciée à partir de l'exposition du système (fonctionnalités, connectivité, utilisateurs) et de son attractivité pour un attaquant.

Plus la classe est élevée, plus les mesures sont nombreuses et plus le contrôle est fort.

## Les trois classes

| Classe | Situation | Ce que cela implique |
|---|---|---|
| 1 | Risque ou impact d'une attaque faible | Mesures appliquées sous la responsabilité de l'entité |
| 2 | Risque ou impact significatif | Mesures plus exigeantes ; l'entité doit pouvoir démontrer leur mise en œuvre |
| 3 | Risque ou impact critique | Exigences les plus fortes, homologation et contrôles renforcés, interconnexions très encadrées |

> La classe s'apprécie par **système** (ou par zone), pas pour toute l'usine : une même installation peut contenir des systèmes de classes différentes. Les échanges entre classes se traitent comme des conduits.

## Les familles de mesures

- **Organisationnelles** : rôles et responsabilités, inventaire et cartographie, analyse de risques, gestion des intervenants et des prestataires, formation, gestion des incidents, veille, audits.
- **Techniques** : cloisonnement et filtrage, sécurisation des accès distants, gestion des comptes et authentification, durcissement des équipements, journalisation et détection, sauvegardes, gestion des supports amovibles, maintien en condition de sécurité.
- **Cycle de vie** : la sécurité s'intègre dès la spécification, puis pendant l'exploitation, la maintenance et le retrait du système.

## Articulation avec les autres référentiels

| Notion ANSSI | Équivalent IEC 62443 | Dans WerbSMSI |
|---|---|---|
| Classe de cybersécurité | Niveau de sécurité cible (SL-T) d'une zone | WerbMap (zones), WerbIEC62443 |
| Cartographie et inventaire | 62443-2-1, 62443-3-2 | WerbMap (actifs, flux) |
| Analyse de risques | 62443-3-2 | WerbEBIOS (site) |
| Mesures techniques | 62443-3-3 (exigences système) | WerbIEC62443 |
| Intervenants extérieurs | 62443-2-4 | WerbGouvernance, WerbIEC62443 |

Le lien entre classe ANSSI et niveau SL-T n'est pas une conversion automatique : il se justifie zone par zone, à partir de l'analyse de risques.

Voir aussi la [carte ANSSI](0-carte.md) et le [tableau de correspondances](../correspondances.md).
