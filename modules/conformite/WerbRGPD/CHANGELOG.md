# Changelog — WerbRGPD

Toutes les évolutions notables de WerbRGPD sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [1.0.0] — 2026-11

### Ajouts
- Création du module (rubrique Conformité & exigences, niveau site ; étude `Etude_NEW_WerbRGPD.md`, pistes RGP-1 à RGP-5).
- **Registre des activités de traitement** (article 30) : finalité, base légale (intérêt légitime documenté, consentement de salariés signalé), personnes, données, données sensibles (exception de l'article 9), destinataires, sous-traitants, transfert hors de l'Union, durée de conservation, mesures de sécurité, localisation dans WerbMap (SI, actifs), critères du CEPD et état de l'analyse d'impact (requise dès deux critères) ; outils des tables (charte §7.7).
- **Violations de données** (articles 33, 34) : échéance des 72 h calculée depuis la découverte, heures restantes puis retard, notification à la CNIL (motif au-delà de 72 h), information des personnes si risque élevé, incident NIS2, clôture.
- **Demandes d'exercice des droits** : échéance d'un mois, prolongation de deux mois motivée, réponse ou refus.
- **Sous-traitants** (article 28) : clause, transfert, délai de notification ; prestataires publiés par WerbPresta proposés.
- Données reçues : `site:si`, `site:actifs` (WerbMap), `site:evaluationsPrestataires` (WerbPresta), copiées dans la base ; listes de choix du groupe (catégories de personnes et de données).
- Tableau de bord et points d'attention, export Excel, journal, thème clair / sombre, verrou commun, guide « Tenir la conformité RGPD du site », base d'exemple fictive (LYON), rangée aussi dans l'espace de démonstration.

### Format de données
- `WERBRGPD`, schéma 1 : `organisme`, `traitements`, `violations`, `demandes`, `sousTraitants`, `archives`, `refs`, `listesGroupe`, `recus`, `largeurs`.

---

WerbRGPD — Développé par @WerbHat
