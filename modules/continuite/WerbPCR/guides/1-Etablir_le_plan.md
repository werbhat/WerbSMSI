<!-- WerbPCR – Développé par @WerbHat -->
# Établir le Plan PCI (plan de continuité informatique)

WerbPCR tient le **plan de cybersécurité et de reprise** d'un site. Ce plan réunit deux plans distincts, que la gouvernance doit pouvoir nommer sans ambiguïté :

| Plan | Question à laquelle il répond | Contenu | Dans WerbPCR |
|---|---|---|---|
| **PCI — Plan de continuité informatique** | Comment les systèmes d'information du site **continuent-ils à fonctionner** malgré les menaces ? | Périmètre métier, analyse de chaque système, mesures de prévention, mesures de continuité pendant l'incident (confinement, secours, mode dégradé), plan d'actions | Menu **🛟 Plan PCI**, volets 1 à 5 |
| **PRI — Plan de reprise informatique** | Comment **revient-on au fonctionnement normal** après un incident majeur ? | Bilan d'impact, durée maximale d'interruption (RTO), perte de données admissible (RPO), dépendances, ordre et procédures de reprise | Menu **🔁 Plan PRI**, volets 1 à 5 (guide [Établir le Plan PRI](2-Etablir_le_PRI.md)) |

Le PCI réduit la probabilité et l'effet d'un incident, et permet de **tenir pendant** celui-ci ; le PRI organise le **retour à la normale**. Dans un comité, une revue ou un audit, parlez du **PCI** pour la prévention et la continuité, du **PRI** pour la restauration et le redémarrage. Ce guide traite du **Plan PCI**.

## PCI ou PRI : qui fait quoi

La frontière suit la chronologie d'un incident. Les normes de continuité (ISO 22301, ISO/IEC 27031) et les guides de l'ANSSI la placent au même endroit :

| | PCI — continuité | PRI — reprise |
|---|---|---|
| **But** | Continuer à fonctionner **pendant** l'incident, même moins bien | Revenir au **fonctionnement normal** |
| **Quand** | Dès la détection, dans les minutes et les heures qui suivent | Une fois l'incident contenu, jusqu'au retour complet |
| **Contenu** | Alerte et décision, confinement, bascule sur un secours ou une redondance, mode dégradé, contournement manuel, critères qui déclenchent le PRI | Restauration des données, reconstruction ou remplacement, ordre de redémarrage, RTO et RPO, vérifications avant remise en service |
| **Dans WerbPCR** | Fiche par SI, **rubrique g** | **🔁 Plan PRI** (bilan d'impact, dépendances, ordre, procédures, sauvegardes) |

**Exemples en environnement industriel** (rubrique g du PCI) :

- passer une ligne en **conduite locale** aux pupitres quand la supervision est perdue, avec des relevés manuels ;
- **îloter** une cellule : la couper du reste du réseau et la laisser tourner sur ses automates ;
- basculer sur le **serveur de secours** ou le second poste de supervision ;
- isoler un VLAN au pare-feu pour arrêter la propagation d'un rançongiciel ;
- arrêter la ligne **en sécurité** si aucun mode dégradé n'est sûr.

**Restaurer le serveur depuis une sauvegarde, réinstaller un poste, recharger le programme d'un automate** : ce sont des étapes du PRI, pas des mesures de continuité.

**Du PCI au PRI.** La dernière mesure de la rubrique g dit **quand on bascule dans le PRI** : mode dégradé qui ne tient plus (au-delà de sa durée), compromission confirmée, matériel détruit. Le PRI part de là : sa procédure commence par vérifier que l'incident est contenu, puis restaure.

Un mot sur le vocabulaire : en cybersécurité, **remédiation** désigne la reprise de contrôle d'un système compromis (nettoyage, éradication, durcissement). Elle se mène avec les équipes de réponse à incident et précède souvent la reprise du PRI. WerbPCR ne l'emploie plus pour la rubrique g.

Le Plan PCI part de ce que les autres modules connaissent déjà : rien n'est ressaisi.

## 1. Préparer les données

Avant d'ouvrir le plan, deux publications doivent exister pour le site :

- l'**analyse EBIOS du site** (WerbEBIOS 1.7.0 ou plus récent ; **1.9.0** pour les valeurs métier et leurs biens supports) : ses événements redoutés, avec leur **critère** (disponibilité, intégrité, confidentialité, traçabilité) et leur **besoin de sécurité**, ses valeurs métier et les biens supports qui les portent, reliés aux actifs de WerbMap ;
- l'**inventaire WerbMap** du site : ses **systèmes d'information** (Liste des SI).

Dans chacun de ces modules : *Intégration WerbSMSI › Publier*.

## 2. Rattacher le plan à son site

Dans *⚙️ Base › Intégration WerbSMSI* : **Choisir l'espace…**, choisir le site, **Rattacher**. Les événements redoutés, les systèmes d'information et les échelles du groupe sont copiés dans le plan. Après une nouvelle publication dans WerbEBIOS ou WerbMap, **⟳ Actualiser** les reprend.

Le plan se range dans `sites/<CODE>/continuite/`.

## 3. Plan PCI, volet 1 — Périmètre métier

Un tableau par **valeur métier** : chaque événement redouté qui la menace, son critère, son besoin de sécurité, ses impacts et sa gravité. Ces colonnes viennent de l'analyse EBIOS : pour les corriger, corrigez l'analyse puis actualisez.

Seule la **description** se saisit ici : précisez ce que l'événement veut dire concrètement pour le site (quelle ligne, quelle durée, quel client). Elle est gardée à chaque actualisation.

## 4. Plan PCI, volet 2 — Approche systémique

Ce texte explique au lecteur du PCI **comment chaque système est analysé** : description, responsables, événements redoutés, risques, mesures de prévention, mesures de continuité ; il renvoie au PRI pour le retour au fonctionnement normal. Le texte proposé convient à la plupart des sites ; **✎ Modifier le texte** pour l'adapter, **↺ Rétablir le texte proposé** pour revenir en arrière.

## 5. Plan PCI, volet 3 — Systèmes d'information

La liste des SI du site, avec leurs besoins D / I / C. Un SI manquant ou mal décrit se corrige dans WerbMap. **➕ Créer** ouvre la fiche du SI.

## 6. Plan PCI, volet 4 — Fiches par SI

Chaque fiche suit la structure du fil conducteur :

- **a — Description** : la fonction, les VLAN et les actifs viennent de WerbMap ; complétez par une description du système.
- **b — Responsables** : un rôle par ligne (les rôles du groupe sont proposés), la personne, son rôle pendant une crise et son suppléant.
- **c — Valeurs métier** : les processus et les informations essentiels que le système porte. Dans l'analyse EBIOS, chaque **bien support** porte des valeurs métier et contient des actifs de WerbMap : quand un bien support contient un actif du SI, ses valeurs métier sont **proposées** (🔗) et cochées à la création de la fiche. Décochez celles que le système ne porte pas vraiment, cochez celles qui manquent. Sans analyse EBIOS (ou pour une valeur métier qu'elle ne connaît pas), saisissez-les dans *Autres valeurs métier*. C'est le lien entre le métier et le système : il dit **ce que l'on perd** quand le système tombe.
- **d — Événements redoutés** : cochez ceux qui concernent le système. Quand des valeurs métier sont cochées en c, leurs événements redoutés passent en tête ; les autres restent accessibles (**▸ Afficher les autres**). Quand un risque de l'analyse EBIOS vise un actif du SI, son événement redouté est **proposé** et coché à la création de la fiche.
- **e — Risques identifiés** : les causes (attaque, erreur humaine, défaillance, sinistre, fournisseur…) ; les risques EBIOS qui visent le SI sont rappelés en dessous.
- **f — Mitigation** : les mesures de prévention, leur état (en place, prévue, à étudier) et leur référence de suivi.
- **g — Mesures de continuité (réponse immédiate et mode dégradé)** : ce qui est fait dès que le risque se réalise pour **tenir** (voir *PCI ou PRI : qui fait quoi* plus haut). Une ligne par mesure, dans l'ordre : son **type** (alerte et décision, confinement, bascule sur un secours, mode dégradé, contournement manuel, déclenchement du PRI), la mesure, le délai de mise en œuvre et le responsable. Terminez par la mesure **« Déclenchement du PRI »** : à partir de quand on passe à la reprise. En dessous, un **renvoi au Plan PRI** rappelle, en lecture seule, le RTO et le RPO, le mode dégradé du bilan d'impact, le rang du SI dans l'ordre de reprise, sa procédure et l'état de ses sauvegardes ; **→ Procédure de reprise du PRI** l'ouvre. La restauration et le redémarrage s'écrivent dans le PRI, pas ici.

> **Repère** : le bilan d'impact du PRI demande aussi un « mode dégradé ». Il en donne le **résumé** (comment, combien de temps) qui sert à fixer le RTO ; la rubrique g en donne le **détail** opérationnel (qui fait quoi, dans quel ordre).

## 7. Plan PCI, volet 5 — Plan d'actions

Les objectifs **R#1 à R#10** sont proposés, chacun avec ses rubriques (par exemple, pour R#3 : segmentation réseau, accès distant, réseaux sans fil). Pour chaque rubrique : un titre, l'identifiant de l'action, une description et le lien vers l'élément de suivi dans WerbSMSI (par exemple l'action du plan d'actions de WerbGouvernance). Objectifs et rubriques se modifient, s'ajoutent, se suppriment et se réordonnent.

## 8. Le document Word

*📄 Document › Document Word* produit le plan, habillé du **modèle Word de l'entreprise** (modèle commun de l'espace `modeles/` ou fichier .docx). Il commence par les définitions du PCI et du PRI, puis présente le **Plan PCI** en partie 1 (chapitres PCI 1 à PCI 5). Le **Plan PRI** suit en partie 2 (chapitres PRI 1 à PRI 5).

## Bonnes pratiques

- Publiez l'analyse EBIOS **avant** de créer les fiches : les valeurs métier et les événements redoutés proposés en dépendent. Dans WerbEBIOS, reliez chaque bien support à ses actifs WerbMap et à ses valeurs métier : sans ce lien, rien n'est proposé.
- Rédigez la rubrique g **avec l'exploitation** (production, maintenance) : un mode dégradé qui n'a jamais été pratiqué ne tiendra pas pendant une crise. Exercez-le au moins une fois par an.
- Publiez l'analyse EBIOS **avant** de rédiger les descriptions : les identifiants des événements redoutés relient chaque description à son événement.
- Une description signalée « sans événement publié » appartient à un événement retiré ou archivé dans EBIOS : supprimez-la ou réintégrez l'événement.
- Le plan décrit des faiblesses et des modes de reprise : **classez-le** et rangez-le avec les mêmes droits que l'analyse de risques.
