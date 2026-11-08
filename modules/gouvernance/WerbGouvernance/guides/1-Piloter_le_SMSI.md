<!-- WerbGouvernance – Développé par @WerbHat -->
# Piloter la sécurité du groupe sans être expert

La cybersécurité ne se règle pas une fois pour toutes avec un pare-feu. Elle se **pilote**, comme la qualité ou la sécurité des personnes : des objectifs, des responsables, des règles communes, des contrôles, des décisions, et une amélioration d'année en année. C'est ce qu'on appelle un **SMSI**, système de management de la sécurité de l'information (norme ISO/IEC 27001).

Ce guide s'adresse au dirigeant, au RSSI qui débute et aux correspondants de site. Il explique ce que recouvre ce pilotage et comment WerbGouvernance le soutient. Pour une vue d'ensemble de tout l'environnement, lisez aussi le guide **« Démarrer avec WerbSMSI »** du portail.

---

## 1. Le SMSI en une image : la roue

| Étape | Ce qu'on fait | Dans WerbGouvernance |
|---|---|---|
| **Planifier** | Définir le périmètre, la politique, les rôles, apprécier les risques, choisir les mesures | Politique et périmètre, Rôles, Socle de mesures |
| **Faire** | Appliquer les mesures et les procédures sur les sites | Procédures, fiches de procédure (et les modules des sites) |
| **Vérifier** | Mesurer, auditer, consolider l'état des sites | Tableau de bord, consolidation des sites |
| **Agir** | Décider en revue de direction, corriger les écarts | Revues de direction, Plan d'actions |

Puis la roue repart : chaque année, on fait un peu mieux que l'année précédente. On ne cherche pas la perfection du premier coup, on cherche le **progrès démontrable**.

---

## 2. Les rôles : qui fait quoi

| Rôle | Mission |
|---|---|
| **Direction** | Fixe l'ambition, approuve la politique, donne les moyens, préside la revue de direction. Avec NIS2, elle **approuve les mesures** de sécurité et peut être tenue pour responsable. |
| **RSSI** (responsable de la sécurité des systèmes d'information) | Anime le SMSI pour le groupe : politique, socle, consolidation, plan d'actions, conseil à la direction. |
| **Correspondant cybersécurité de site** | Relais du RSSI sur un site : applique le socle, tient les registres, remonte l'état du site, premier interlocuteur en cas d'incident. |
| **Propriétaires de procédure** | Rédigent et tiennent à jour une procédure de leur domaine. |
| **Responsables d'action** | Mènent une action du plan, à une échéance donnée. |

Un rôle sans titulaire est un trou : le tableau de bord le signale. Un titulaire sans suppléant est un risque : prévoyez-en un pour les rôles clés.

Les tâches clés de chaque rôle, les principes de conduite communs et la matrice « qui fait quoi » sont détaillés dans le guide [Les rôles de la sécurité](4-Les_roles_de_la_securite.md).

---

## 3. La politique et le périmètre

La **politique de sécurité** est un document court, signé par la direction, qui dit **pourquoi** l'entreprise protège ses systèmes, **jusqu'où** et **avec quels engagements**. Ce n'est pas un catalogue technique.

Le **périmètre** dit ce que le SMSI couvre : quelles entités, quels sites, quelles activités. Un périmètre flou rend tout le reste discutable ; un périmètre trop large au départ décourage. Mieux vaut commencer par un site pilote et l'étendre.

La politique a une **date de revue** : on la relit au moins une fois par an, et après tout changement important (acquisition, nouveau site, incident majeur, nouvelle réglementation).

---

## 4. Le socle de mesures : les règles communes à tous les sites

Le **socle** est la liste des mesures que **chaque site doit appliquer**, quelle que soit sa taille : par exemple, cloisonner le réseau industriel du réseau de bureau, supprimer les comptes par défaut, sauvegarder et tester la restauration, sensibiliser le personnel, encadrer les accès à distance des prestataires.

- Chaque mesure dit **ce qui est attendu** et **quelle preuve** le démontre.
- Elle renvoie aux références (ISO/IEC 27001, IEC 62443, NIS2) : un même travail sert plusieurs référentiels.
- Le groupe publie le socle ; chaque site le reprend et dit où il en est.

Le socle évite que chaque site réinvente ses règles, et permet de **comparer** les sites entre eux.

---

## 5. Les procédures

Une procédure décrit **comment** on fait une chose importante, de façon répétable : gérer un nouvel arrivant et un départ, ouvrir un accès à distance à un prestataire, mettre à jour un poste de supervision, réagir à une alerte. Elle a un propriétaire, un approbateur, une version et une date de revue.

Une procédure utile est **courte, à jour et connue** de ceux qui l'appliquent. Une procédure de quarante pages que personne n'a lue ne protège rien.

---

## 6. La revue de direction et le plan d'actions

La **revue de direction** (ISO/IEC 27001 § 9.3) est le rendez-vous où la direction **regarde l'état de la sécurité et décide**. Au moins une fois par an. Elle s'appuie sur des éléments d'entrée :

- l'état des actions décidées à la revue précédente ;
- les résultats d'audit et la conformité des sites (NIS2, IEC 62443, socle) ;
- les risques résiduels issus des analyses de risques ;
- les incidents de l'année et ce qu'on en a appris ;
- la formation et la sensibilisation du personnel ;
- les changements (réglementation, organisation, menaces).

Elle produit des **décisions** : moyens, priorités, risques acceptés. Chaque décision devient une **action** du plan, avec un responsable et une échéance. Une action en retard est relancée, replanifiée ou abandonnée **explicitement** : jamais oubliée.

---

## 7. Ce que le dirigeant doit suivre

Le dirigeant n'a pas besoin de connaître les détails techniques. Il doit pouvoir répondre à ces questions :

- [ ] La politique est-elle approuvée et revue depuis moins d'un an ?
- [ ] Chaque rôle clé a-t-il un titulaire, sur chaque site ?
- [ ] Quelle part du socle chaque site applique-t-il ? Quel site est en retard, et pourquoi ?
- [ ] Quels risques résiduels élevés ont été acceptés, et par qui ?
- [ ] Combien d'actions sont en retard ?
- [ ] Le personnel, et la direction elle-même, sont-ils formés ?
- [ ] La dernière revue de direction a-t-elle eu lieu, et ses décisions sont-elles suivies ?

---

## 8. Les erreurs fréquentes

- **Tout écrire, ne rien appliquer** : des documents parfaits et des sites inchangés. Mesurez sur le terrain.
- **Le RSSI seul** : sans correspondant de site ni soutien de la direction, rien ne bouge.
- **Le plan d'actions qui ne fait que grossir** : trop d'actions, aucune priorité. Mieux vaut dix actions tenues que cent ouvertes.
- **La revue de direction transformée en présentation** : elle doit se conclure par des décisions.

---

## 9. Dans WerbGouvernance

1. **Politique et périmètre** : renseignez l'organisation, le périmètre et la politique (version, approbation, prochaine revue).
2. **Rôles** : déclarez les rôles du groupe et ceux attendus sur chaque site, avec leurs titulaires. Les sites les reprennent (publication du groupe).
3. **Socle de mesures** : listez les mesures exigées, avec leurs références (`ISO27001:A.5.16`, `IEC62443-3-3:SR 1.1`) et la preuve attendue ; publiez-les pour les sites.
4. **Procédures** : tenez le catalogue (propriétaire, approbateur, revue) et rédigez les fiches étape par étape ; la version rédigée s'imprime.
5. **Tableau de bord** : il consolide l'application du socle, la conformité et les risques résiduels publiés par les sites, et signale les revues échues, les actions en retard, les rôles sans titulaire.
6. **Revues de direction** : notez les participants, les éléments d'entrée et les décisions.
7. **Plan d'actions** : une action par décision ou par écart, avec origine, site, responsable, échéance et statut.

> **En résumé** : piloter la sécurité, c'est décider qui fait quoi, fixer des règles communes, regarder régulièrement où l'on en est, et décider. WerbGouvernance garde la trace de chacune de ces étapes.
