<!-- WerbReferentiels – Développé par @WerbHat -->
# Guide d'hygiène informatique — les 42 mesures

Synthèse du *Guide d'hygiène informatique — Renforcer la sécurité de son système d'information en 42 mesures* (ANSSI, version 2.0, septembre 2017), publié sous Licence Ouverte / Open Licence (Etalab v1). Les intitulés des mesures sont ceux du guide ; les commentaires sont propres à WerbSMSI.

> Le guide distingue un niveau **standard**, à atteindre par toute entité, et un niveau **renforcé** pour les entités plus exposées ou plus matures. Son outil de suivi permet de coter chaque mesure.

## Les 10 thèmes

| Thème | Mesures | Idée directrice |
|---|---|---|
| I. Sensibiliser et former | 1 à 3 | Les personnes et l'infogérance d'abord |
| II. Connaître le système d'information | 4 à 7 | On ne protège que ce que l'on connaît |
| III. Authentifier et contrôler les accès | 8 à 13 | Un compte par personne, des droits au juste besoin |
| IV. Sécuriser les postes | 14 à 18 | Un niveau minimal partout, géré centralement |
| V. Sécuriser le réseau | 19 à 26 | Cloisonner, filtrer, chiffrer |
| VI. Sécuriser l'administration | 27 à 29 | L'administration est la cible prioritaire |
| VII. Gérer le nomadisme | 30 à 33 | Le terminal hors des murs est exposé |
| VIII. Maintenir le SI à jour | 34 et 35 | Correctifs et fin de support anticipés |
| IX. Superviser, auditer, réagir | 36 à 40 | Voir, contrôler, savoir réagir |
| X. Pour aller plus loin | 41 et 42 | Analyse de risques et produits qualifiés |

## I. Sensibiliser et former

1. Former les équipes opérationnelles à la sécurité des systèmes d'information
2. Sensibiliser les utilisateurs aux bonnes pratiques élémentaires de sécurité informatique
3. Maîtriser les risques de l'infogérance

## II. Connaître le système d'information

4. Identifier les informations et serveurs les plus sensibles et maintenir un schéma du réseau
5. Disposer d'un inventaire exhaustif des comptes privilégiés et le maintenir à jour
6. Organiser les procédures d'arrivée, de départ et de changement de fonction des utilisateurs
7. Autoriser la connexion au réseau de l'entité aux seuls équipements maîtrisés

## III. Authentifier et contrôler les accès

8. Identifier nommément chaque personne accédant au système et distinguer les rôles utilisateur/administrateur
9. Attribuer les bons droits sur les ressources sensibles du système d'information
10. Définir et vérifier des règles de choix et de dimensionnement des mots de passe
11. Protéger les mots de passe stockés sur les systèmes
12. Changer les éléments d'authentification par défaut sur les équipements et services
13. Privilégier lorsque c'est possible une authentification forte

## IV. Sécuriser les postes

14. Mettre en place un niveau de sécurité minimal sur l'ensemble du parc informatique
15. Se protéger des menaces relatives à l'utilisation de supports amovibles
16. Utiliser un outil de gestion centralisée afin d'homogénéiser les politiques de sécurité
17. Activer et configurer le pare-feu local des postes de travail
18. Chiffrer les données sensibles transmises par voie Internet

## V. Sécuriser le réseau

19. Segmenter le réseau et mettre en place un cloisonnement entre ces zones
20. S'assurer de la sécurité des réseaux d'accès Wi-Fi et de la séparation des usages
21. Utiliser des protocoles sécurisés dès qu'ils existent
22. Mettre en place une passerelle d'accès sécurisé à Internet
23. Cloisonner les services visibles depuis Internet du reste du système d'information
24. Protéger sa messagerie professionnelle
25. Sécuriser les interconnexions réseau dédiées avec les partenaires
26. Contrôler et protéger l'accès aux salles serveurs et aux locaux techniques

## VI. Sécuriser l'administration

27. Interdire l'accès à Internet depuis les postes ou serveurs utilisés pour l'administration du système d'information
28. Utiliser un réseau dédié et cloisonné pour l'administration du système d'information
29. Limiter au strict besoin opérationnel les droits d'administration sur les postes de travail

## VII. Gérer le nomadisme

30. Prendre des mesures de sécurisation physique des terminaux nomades
31. Chiffrer les données sensibles, en particulier sur le matériel potentiellement perdable
32. Sécuriser la connexion réseau des postes utilisés en situation de nomadisme
33. Adopter des politiques de sécurité dédiées aux terminaux mobiles

## VIII. Maintenir le système d'information à jour

34. Définir une politique de mise à jour des composants du système d'information
35. Anticiper la fin de la maintenance des logiciels et systèmes et limiter les adhérences logicielles

## IX. Superviser, auditer, réagir

36. Activer et configurer les journaux des composants les plus importants
37. Définir et appliquer une politique de sauvegarde des composants critiques
38. Procéder à des contrôles et audits de sécurité réguliers puis appliquer les actions correctives associées
39. Désigner un référent en sécurité des systèmes d'information et le faire connaître auprès du personnel
40. Définir une procédure de gestion des incidents de sécurité

## X. Pour aller plus loin

41. Mener une analyse de risques formelle
42. Privilégier l'usage de produits et de services qualifiés par l'ANSSI

## Utiliser les 42 mesures dans WerbSMSI

- **Socle de mesures du groupe** : reprendre les mesures retenues dans WerbGouvernance (socle exigé sur tous les sites), avec le niveau visé (standard ou renforcé).
- **Autodiagnostic** : coter chaque mesure (appliquée, partielle, non appliquée, non applicable) et justifier les exclusions.
- **Contexte industriel** : les mesures 19, 25, 27 et 28 se déclinent en zones et conduits (IEC 62443-3-2), cartographiés dans WerbMap.
- **Preuves** : registres de WerbExploitation pour les mesures 5 et 6 (comptes et habilitations), 34 et 35 (mises à jour, applicatifs), 37 (sauvegardes).
- **Correspondances** : chaque mesure est reliée aux exigences NIS2 et ISO/IEC 27001 dans le [tableau de correspondances](../correspondances.md).

Retour à la [carte ANSSI](0-carte.md).
