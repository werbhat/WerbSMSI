<!-- WerbReferentiels – Développé par @WerbHat -->
# Carte IEC 62443 — la cybersécurité des systèmes industriels

La série IEC 62443 (ISA/IEC 62443) traite la cybersécurité des systèmes d'automatisation et de contrôle industriels (IACS) : automates, supervision, réseaux d'atelier. Là où ISO/IEC 27001 organise la sécurité de l'**organisation**, IEC 62443 répartit les exigences entre trois **acteurs** — propriétaire d'actifs, intégrateur, fournisseur de produits — et raisonne par **zones**, **conduits** et **niveaux de sécurité** (SL 1 à 4).

- 1-x — Concepts et modèles
  - 1-1 : terminologie, concepts, modèles
  - 1-5 : schéma des profils de sécurité
- 2-x — Programme de sécurité (propriétaire d'actifs, prestataires)
  - 2-1 : programme de sécurité du propriétaire d'actifs
  - 2-3 : gestion des correctifs en environnement industriel
  - 2-4 : exigences envers les prestataires de services (intégration, maintenance)
- 3-x — Exigences du système (propriétaire d'actifs, intégrateur)
  - 3-2 : analyse de risques, zones et conduits, niveau de sécurité cible (SL-T)
  - 3-3 : exigences du système — 7 exigences fondamentales (FR), exigences SR et renforcements RE
- 4-x — Exigences des produits (fournisseur)
  - 4-1 : cycle de développement sécurisé
  - 4-2 : exigences techniques des composants
- Notions clés
  - Zone : ensemble d'actifs qui partagent les mêmes exigences de sécurité
  - Conduit : canal de communication contrôlé entre deux zones
  - SL-T (cible), SL-C (capacité), SL-A (atteint)
  - Défense en profondeur, sûreté de fonctionnement avant tout
- Pages du référentiel
  - [Guide complet IEC 62443](1-Guide_IEC_62443.md)
  - [Checklist d'audit](2-checklist_audit_iec62443.md)
  - [Plan de mise en œuvre](3-plan_de_mise_en_oeuvre_iec62443.md)
  - [Modèles et registres](4-modeles_et_registres_iec62443.md)
  - [Sources officielles](sources.md)

## Les 7 exigences fondamentales (IEC 62443-3-3)

| FR | Exigence | En pratique |
|---|---|---|
| FR 1 | Identification et authentification | Comptes nominatifs, pas de compte partagé ni de mot de passe par défaut |
| FR 2 | Contrôle d'utilisation | Droits au juste besoin, actions sensibles réservées |
| FR 3 | Intégrité du système | Logiciels et configurations maîtrisés, protection contre les codes malveillants |
| FR 4 | Confidentialité des données | Données sensibles protégées au repos et en transit |
| FR 5 | Flux de données restreints | Segmentation en zones, flux filtrés aux conduits |
| FR 6 | Réponse rapide aux événements | Journalisation, détection, réaction |
| FR 7 | Disponibilité des ressources | Sauvegardes, redondance, reprise, résistance au déni de service |

## Qui fait quoi, et dans WerbSMSI

| Acteur | Parties de la série | Ce qui est produit | Dans WerbSMSI |
|---|---|---|---|
| Propriétaire d'actifs (exploitant) | 2-1, 2-3, 3-2 | Programme de sécurité, analyse de risques, zones et conduits, SL-T | WerbMap (zones, conduits, SL-T), WerbEBIOS, WerbExploitation (correctifs) |
| Intégrateur | 2-4, 3-3 | Système conforme aux exigences SR / RE du niveau visé | WerbIEC62443 (exigences 3-3), WerbCartoSI (schémas), WerbRecette |
| Prestataire de services | 2-4 | Pratiques de sécurité en intégration et en maintenance | WerbPresta (cahier d'exigences, évaluation) |
| Fournisseur de produits | 4-1, 4-2 | Produits développés et testés selon le niveau visé | Exigences d'achat ; voir aussi le [CRA](../2-CRA/0-carte.md) |

IEC 62443 complète la [norme ISO/IEC 27001](../4-ISO_27001/0-carte.md) côté atelier ; le [tableau de correspondances](../correspondances.md) relie ses exigences à NIS2, ISO/IEC 27001, NIST et ANSSI.

> Les textes des normes IEC sont protégés par le droit d'auteur : ce module n'en contient que des repères et des synthèses. La série s'acquiert auprès de l'IEC (webstore) ou de l'AFNOR.
