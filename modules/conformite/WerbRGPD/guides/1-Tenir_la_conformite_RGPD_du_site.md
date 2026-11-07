<!-- WerbRGPD – Développé par @WerbHat -->
# Tenir la conformité RGPD du site

Le RGPD ne demande plus de déclarer ses fichiers : il demande d'**être conforme et de pouvoir le prouver** à tout moment. Pour un site industriel, la preuve tient en quatre registres : les traitements, les violations de données, les demandes des personnes et les sous-traitants. WerbRGPD les tient pour le site, relie chaque traitement à l'inventaire de WerbMap (où sont les données) et aux prestataires de WerbPresta (qui y accède), et calcule les délais que le règlement impose.

Le référentiel **RGPD** de WerbReferentiels explique le règlement en détail ; ce guide explique comment s'en servir ici.

## 1. Mettre en place

1. **Intégration WerbSMSI** : ouvrez l'espace, rattachez la base au site. Les SI et actifs publiés par WerbMap et les prestataires publiés par WerbPresta sont copiés dans la base. Rangez la base dans `sites/<CODE>/conformite/`.
2. **Organisme et référentiels** : indiquez le responsable de traitement (l'entité), le DPO du groupe, le **référent RGPD du site** et le contact pour l'exercice des droits.
3. Les **catégories de personnes et de données** sont des listes de choix du groupe ; le site peut en ajouter.

## 2. Le registre des traitements

Une fiche par traitement, c'est-à-dire par **finalité** : « contrôle d'accès par badge », « vidéosurveillance », « journaux des opérateurs de la supervision », « gestion du personnel du site ». N'oubliez pas les traitements qu'on ne voit pas : badges, caméras, comptes nominatifs dans l'OT, registre des visiteurs, géolocalisation des véhicules.

| Rubrique | Ce que le module vérifie |
|---|---|
| Finalité et **base légale** | Base choisie ; intérêt légitime documenté ; alerte si le consentement est la base pour des salariés |
| Personnes, données, **données sensibles** | Exception de l'article 9 indiquée dès qu'une donnée sensible est cochée |
| Destinataires, **sous-traitants**, transferts | Clause de l'article 28 signée ; garantie pour un transfert hors de l'Union |
| **Durée de conservation** | Durée fixée |
| Mesures de sécurité | Décrites |
| **Où sont les données** | SI et actifs de WerbMap cochés ; signalé si un élément disparaît de WerbMap |
| **AIPD** | Critères du CEPD cochés : à partir de deux (les données sensibles comptent pour un), l'AIPD est requise et suivie |

Un traitement qui n'existe plus passe à l'état **Arrêté** (il reste au registre) ; l'**archivage** le sort du registre sans réattribuer son identifiant.

## 3. Les violations de données

Toute violation est inscrite, **même sans notification** : c'est une obligation (article 33.5).

1. **➕ Violation** : la date et l'heure de découverte sont posées à l'instant ; le délai de **72 heures** vers la CNIL en part.
2. Décrivez les faits, la **nature** (confidentialité, intégrité, disponibilité) et les **traitements** touchés.
3. Évaluez le **risque pour les personnes** :
   - *aucun risque* : documentez pourquoi, pas de notification ;
   - *risque* : notification à la CNIL ; le module affiche les **heures restantes**, puis le **retard** ;
   - *risque élevé* : notification **et** information des personnes, ou motif de l'exception.
4. Cochez **« Notifiée à la CNIL »** (la date et l'heure sont posées) et indiquez la référence. Une notification après 72 h demande un **motif du retard**.
5. Si l'incident est aussi un **incident NIS2**, cochez-le : le signalement à l'ANSSI suit son propre calendrier (24 h, 72 h, un mois).

Le tableau de bord met en tête les violations à notifier.

## 4. Les demandes d'exercice des droits

**➕ Demande** : date de réception, droit exercé, traitements concernés. Le module calcule l'échéance d'**un mois**, ou trois mois si vous cochez la prolongation (à motiver et à annoncer à la personne dans le premier mois). Une demande non répondue à l'échéance est signalée.

Décrivez le demandeur sans données superflues (« salarié, atelier 2 ») : la base décrit la demande, elle n'est pas un fichier de personnes.

## 5. Les sous-traitants

Les prestataires publiés par WerbPresta apparaissent en bas de la page **Sous-traitants** : **➕ Sous-traitant** reprend ceux qui peuvent accéder à des données personnelles (télémaintenance, gardiennage, éditeur en SaaS). Suivez pour chacun la clause de l'article 28 (signée, en cours, absente), le transfert hors de l'Union et le délai de notification des violations prévu au contrat. Puis cochez-le dans la fiche des traitements qu'il touche.

## 6. Prouver

- Le **tableau de bord** liste les points d'attention : traitement incomplet, AIPD à faire, violation à notifier, demande en retard, sous-traitant sans clause.
- **📊 Export Excel** produit le registre des traitements et les autres tableaux, à présenter en contrôle ou au DPO du groupe. Le classeur est en diffusion restreinte.

## Bonnes pratiques

- **Commencer par le terrain** : faire le tour du site avec le responsable sûreté, le responsable RH et le responsable OT, plutôt que de partir des logiciels.
- **Appliquer les durées** : une purge automatique vaut mieux qu'une durée écrite ; pensez aux exports Excel et aux boîtes de messagerie.
- **Préparer la violation avant qu'elle arrive** : qui décide, qui notifie, avec quel modèle ; exercez-vous une fois par an avec la procédure de crise.
- **Comptes nominatifs dans l'OT** : meilleure sécurité et traçabilité légitime, à condition d'inscrire le traitement et de ne pas le détourner vers l'évaluation des personnes.
