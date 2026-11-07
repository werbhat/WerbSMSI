<!-- WerbAssets – Développé par @WerbHat -->
# Maîtriser et durcir les assets du site

Ce guide s'adresse à ceux qui installent, exploitent ou financent les équipements réseau d'un site industriel : pare-feu, switch, baies de brassage, automates, IHM, passerelles, onduleurs communicants. Il défend deux idées :

1. **Un asset mal connu se répare lentement.** Une configuration non documentée ou un raccordement mal repéré dans une baie allongent **toujours** la durée d'interruption après une panne ou une attaque : ils font monter le RTO réel.
2. **Un asset se durcit à sa première configuration.** Le durcir plus tard, une fois en production, est plus long, plus cher et plus risqué.

La dernière partie explique comment tenir WerbAssets pour que ces deux idées deviennent une habitude du site.

---

## 1. Ce que l'on ne connaît pas allonge la reprise

### Le RTO se joue avant l'incident

Le **RTO** (*Recovery Time Objective*, durée maximale d'interruption admissible) se fixe avec le métier dans le plan de reprise informatique (WerbPCR, *Plan PRI*). Ce n'est pas un souhait : le temps réel de reprise est la **somme de durées bien concrètes**, et chacune s'allonge dès qu'il manque une information.

| Étape de la reprise | Ce qui la rallonge quand l'asset est mal connu |
|---|---|
| Comprendre ce qui est tombé | Aucun plan des flux ni des raccordements : on cherche quel équipement porte quel réseau, en interrogeant les uns et les autres |
| Trouver l'équipement et ses câbles | Baie mal identifiée, bandeau sans plan, câbles sans repère : on suit les câbles à la main |
| Remplacer ou réinitialiser | Modèle, version de firmware ou options inconnus : la pièce de rechange n'est pas la bonne, ou ne se comporte pas pareil |
| Reconfigurer | VLAN, ports, règles de filtrage reconstitués de mémoire ou par essais successifs |
| Vérifier | Aucune référence de ce qui est « normal » : on découvre les oublis quand la production les réclame, un par un |

Chaque inconnue transforme quelques minutes en heures. Cumulées, elles transforment une panne de matériel banale en arrêt de production.

### Des situations très courantes

- **Un switch de cellule est remplacé.** Avec la fiche (ports, VLAN par port, ports en tronc, ports bloqués) et la configuration sauvegardée, on restaure et on vérifie. Sans elles, on rebranche port par port en essayant de deviner ce que faisait chaque câble ; un VLAN mal affecté place une machine dans la mauvaise zone, et le défaut n'apparaît que plus tard.
- **Le pare-feu tombe.** Sans sauvegarde de configuration ni fiche des interfaces, les règles se reconstruisent à partir des souvenirs de chacun. Les flux oubliés (télémaintenance, synchronisation d'horloge, remontée vers l'historique) réapparaissent sous forme d'incidents dans les jours qui suivent.
- **Un câble est débranché pendant une intervention.** Sans repère aux deux extrémités ni plan de raccordement, impossible de savoir où il allait. Un petit switch ajouté « provisoirement » dans un coffret et jamais documenté devient une panne fantôme.
- **Le mot de passe d'administration est introuvable.** Il ne reste que le retour aux paramètres d'usine, donc une reconfiguration complète, souvent sans plan.
- **La version de firmware est inconnue.** On installe la plus récente : le comportement change, un automate ne dialogue plus avec sa supervision.
- **Seul le prestataire sait.** Son délai d'intervention (la nuit, le week-end) s'ajoute au RTO.

### Un ordre de grandeur

Les durées ci-dessous sont **illustratives** : elles donnent l'écart typique entre un asset maîtrisé et un asset inconnu, pour le remplacement d'un switch de cellule de 24 ports.

| Ce qui est disponible | Durée typique de remise en service |
|---|---|
| Fiche à jour, configuration sauvegardée et testée, câbles repérés | Environ une heure |
| Fiche à jour, sans sauvegarde de configuration | Deux à trois heures (reconfiguration à la main, d'après la fiche) |
| Ni fiche, ni sauvegarde, ni repère | Une demi-journée à plusieurs jours, puis des défauts découverts après le redémarrage |

L'écart ne vient pas de la compétence des équipes : il vient de **ce qu'elles trouvent en arrivant**.

### Après une cyberattaque, c'est pire

Après une attaque, on ne peut plus faire confiance à la configuration en place : un attaquant a pu ajouter une règle, un compte, une redirection de port. Pour reprendre, il faut savoir **ce qui est légitime**. Sans configuration de référence documentée, on ne distingue pas une règle ajoutée par l'attaquant d'une règle oubliée : il faut tout reconstruire, sans plan, alors même que la pression est la plus forte.

> **Repère** : un RTO de 4 h annoncé dans le PRI n'est tenable que si les fiches des assets du système sont à jour. Sinon, le RTO réel est inconnu, et presque toujours plus long.

### Ce que « connaître un asset en profondeur » veut dire

Pour chaque équipement, on doit pouvoir répondre sans aller le voir :

- **qui il est** : TAG, type, marque, modèle, numéro de série, version de firmware ;
- **où il est** : site, zone, baie, position, bandeau ;
- **comment il est raccordé** : chaque port utilisé, son câble, son repère, ce qu'il y a au bout ;
- **comment il est configuré** : interfaces, VLAN, adresses, règles, adresse d'administration ;
- **qui l'administre et comment on y accède** (le mot de passe, lui, reste dans le coffre-fort, jamais dans la fiche) ;
- **où est la sauvegarde de sa configuration**, et quand sa restauration a été testée ;
- **comment il a été durci**, et ce qui reste à faire.

C'est exactement ce que tient une fiche WerbAssets.

---

## 2. Durcir un asset : de quoi parle-t-on ?

Un équipement sort de l'usine configuré pour **fonctionner partout, facilement** : comptes par défaut, mots de passe connus de tous, services ouverts, tous les ports actifs. C'est pratique pour l'installer, et tout aussi pratique pour un attaquant.

**Durcir** (*hardening*), c'est réduire sa **surface d'attaque** : tout ce qui n'est pas nécessaire à son rôle est retiré, désactivé ou fermé ; ce qui reste est protégé, tracé et tenu à jour. On passe de « fonctionne partout » à **« ne fait que ce qu'on attend de lui, et seulement pour ceux qui doivent »**.

### Les domaines du durcissement

| Domaine | Mesures typiques |
|---|---|
| Mises à jour | Firmware à jour, validé par le constructeur pour l'usage industriel ; version notée dans la fiche |
| Comptes | Compte d'usine supprimé ou désactivé, mots de passe par défaut remplacés, comptes nominatifs, droits au strict nécessaire |
| Authentification | Mots de passe longs conservés dans le coffre-fort, verrouillage après plusieurs erreurs, double authentification quand l'équipement le permet |
| Administration | Protocoles chiffrés (SSH, HTTPS) à la place de Telnet et HTTP ; administration seulement depuis le réseau d'administration ; fermeture de session après inactivité |
| Services | Désactivation de ce qui ne sert pas : serveur web inutile, SNMP v1 et v2c (communauté « public »), UPnP, protocoles de découverte hors besoin, fonctions d'écriture OT non utilisées |
| Ports | Ports inutilisés désactivés ou placés dans un VLAN sans issue ; contrôle des équipements raccordés ; VLAN 1 non utilisé pour les flux |
| Filtrage | Tout est interdit sauf ce qui est explicitement autorisé ; règles au plus juste, sans « tout vers tout » ; protection contre l'usurpation d'adresse (antispoofing) |
| Traçabilité | Horloge synchronisée (NTP), journaux envoyés vers un serveur central (syslog), bannière d'avertissement |
| Sauvegarde | Configuration sauvegardée **après** durcissement, restauration testée |
| Physique | Baie fermée à clé, ports en façade obturés, sélecteur RUN / PROG des automates en position protégée |

### Les particularités d'un site industriel

- On ne met pas à jour un automate comme un poste de bureau : une mise à jour se **valide** avec le constructeur ou l'intégrateur, et se planifie sur un arrêt.
- Quand une mesure est impossible (équipement ancien, logiciel figé), on la **compense** : cloisonnement par le pare-feu, accès limité, surveillance renforcée. La compensation se note dans la fiche.
- Certains équipements supportent mal les analyses réseau : les scans se font **hors production**.
- Références utiles : l'IEC 62443-4-2 (exigences de sécurité des composants), l'IEC 62443-3-3 (exigences du système), les guides de l'ANSSI sur l'hygiène informatique et sur la cybersécurité des systèmes industriels.

Durcir ne doit rien casser : c'est pour cela qu'on teste, et que le bon moment pour le faire est le suivant.

---

## 3. Durcir dès la première configuration

### Pourquoi à la mise en service

|  | À la mise en service | En production |
|---|---|---|
| Arrêt | L'équipement n'est pas encore critique : on redémarre librement | Chaque redémarrage (mise à jour, changement de mode) demande une fenêtre d'arrêt négociée avec la production |
| Flux | Aucun flux métier à casser | Fermer un port ou couper un service peut arrêter un flux que personne n'avait documenté |
| Tests | Scans et captures sans risque | Un scan peut perturber un automate ou une IHM fragile |
| Retour arrière | On recommence | Il faut une procédure de retour arrière, préparée et testée |
| Coût | Quelques heures, prévues dans le projet | Un projet à part, souvent repoussé : la « dette de sécurité » s'accumule |
| Référence | La configuration durcie devient la référence documentée | La référence n'existe pas : on la découvre en même temps qu'on la modifie |

Durcir à la mise en service coûte peu ; durcir en production coûte cher et expose à l'arrêt. Chaque équipement installé sans durcissement est une **dette** que le site paiera plus tard, au pire moment.

### Une procédure, dès la première configuration

La procédure est **écrite**, la même pour tous les équipements d'un même type, et appliquée **avant** le raccordement au réseau de production :

1. **Mettre à jour le firmware** vers la version validée.
2. **Sécuriser l'accès** : type d'interface, authentification, compte d'usine supprimé, mot de passe par défaut remplacé, complexité, politique d'erreur.
3. **Configurer le réseau** : interfaces, VLAN, adresse d'administration, antispoofing.
4. **Désactiver les services** inutiles.
5. **Poser les règles** au plus juste.
6. **Sauvegarder la configuration** et inscrire la sauvegarde au registre.
7. **Analyser hors production** : découverte des ports ouverts, capture des échanges, vulnérabilités connues de la version installée.
8. **Contrôler en production**, une fois raccordé.

Ce sont les **8 étapes et 23 points** de la *Procédure de configuration et de sécurisation* de chaque fiche pare-feu et switch de WerbAssets : chaque point est **Fait**, **À faire** ou **Non applicable**, avec une valeur ou un commentaire, jamais un mot de passe.

Quand l'équipement est livré par un intégrateur, exigez qu'il le livre **durci et documenté** : fiche remplie, procédure suivie, configuration sauvegardée. C'est une clause du cahier d'exigences cyber du prestataire (WerbPresta).

### Durcir un équipement déjà en production

Quand il faut le faire quand même :

1. **Connaître d'abord** : compléter la fiche, observer les flux réels (capture sur un port miroir pendant un cycle de production complet).
2. **Sauvegarder** la configuration actuelle : c'est le retour arrière.
3. **Prioriser** : pare-feu en frontière de zone, équipements joignables à distance, ports accessibles en façade.
4. **Changer par petits lots**, sur une fenêtre de maintenance, avec l'exploitation présente, un équipement à la fois.
5. **Vérifier** les flux après chaque lot ; revenir en arrière au moindre doute.
6. **Mettre à jour la fiche** et sauvegarder la nouvelle configuration.

---

## 4. Bien tenir WerbAssets

### Les principes

- **WerbMap fait foi pour l'inventaire** : un équipement se déclare d'abord dans WerbMap (TAG, type, zone, coffret), qui le publie ; WerbAssets le reprend au rechargement de l'inventaire. *+ Asset hors inventaire* reste provisoire, le temps de le déclarer dans WerbMap.
- **Une base par site**, rangée dans `sites/<CODE>/inventaires/`, avec des droits réservés à l'équipe du site : elle décrit la configuration du réseau.
- **Aucun secret** : ni mot de passe, ni clé, ni fichier de configuration dans WerbAssets. Les mots de passe vont dans le coffre-fort (guide « Les mots de passe » de WerbMap), les configurations dans l'espace de sauvegarde inscrit au registre des sauvegardes (WerbExploitation).
- **Règle d'or : une intervention, une fiche à jour.** Le jour même, par celui qui est intervenu. Le journal garde qui a changé quoi.

### À la mise en service d'un équipement

- [ ] Actif créé dans WerbMap (TAG, type, zone, coffret) et inventaire publié
- [ ] Inventaire rechargé dans WerbAssets, fiche créée (modèle, numéro de série, firmware, administrateur, adresse d'administration)
- [ ] Interfaces, VLAN et ports saisis ; ports inutilisés bloqués
- [ ] Raccordements saisis dans le brassage, câbles repérés aux deux extrémités (repère câble, repère fil / brin, aboutissant)
- [ ] Procédure de configuration et de sécurisation : chaque point **Fait** ou **Non applicable** (avec la raison)
- [ ] Configuration sauvegardée après durcissement, sauvegarde inscrite au registre, restauration testée
- [ ] Mot de passe d'administration rangé dans le coffre-fort
- [ ] Fiche et baie imprimées

### Garder une copie hors de l'outil

Pendant une panne réseau, l'ordinateur qui ouvre WerbAssets peut lui-même être inaccessible. **Imprimez la baie** (*Imprimer la baie* : tous ses bandeaux) et les fiches de ses équipements, et rangez-les dans la baie ou dans le classeur d'exploitation. Remplacez-les à chaque modification importante.

### Saisir sur le terrain

Pour un relevé en baie ou une mise en service de plusieurs équipements, utilisez **Saisie Excel** : *Modèle de saisie* (une ligne par asset de l'inventaire), remplissage sur place, puis *Importer un classeur*. Le rapport montre chaque création, mise à jour ou ligne rejetée **avant** d'appliquer.

### La revue périodique

Chaque mois, ou chaque trimestre sur un petit site, ouvrez le **tableau de bord** et traitez ses points d'attention :

| Point d'attention | Action |
|---|---|
| Inventaire WerbMap absent ou de plus de 90 jours | Faire publier l'inventaire dans WerbMap, puis le recharger |
| Fiches à renseigner | Compléter en priorité les pare-feu et les switch de cœur |
| Points de sécurisation à faire | Planifier, ou noter une mesure compensatoire et passer le point en Non applicable avec sa raison |
| Fiche orpheline | L'équipement a disparu de WerbMap : retiré du site (effacer la fiche) ou oublié dans l'inventaire (le redéclarer) |
| Écart de modèle ou de firmware avec WerbMap | Vérifier sur l'équipement, puis corriger la source fautive |

### Avec les autres modules

- **WerbMap** : l'inventaire, les zones et les systèmes d'information dont les assets font partie.
- **WerbPCR** : le RTO de chaque système et ses procédures de reprise s'appuient sur les fiches WerbAssets. Une procédure qui dit « reconfigurer le switch » doit pouvoir renvoyer à une fiche à jour et à une configuration sauvegardée.
- **WerbExploitation** : le registre des sauvegardes des configurations, les mises à jour de firmware et les interventions.
- **WerbRecette** : la recette réseau après une mise en service ou une modification, et les contrôles de non-régression.
- **WerbPresta** : les exigences envers les intégrateurs et les mainteneurs (livrer durci et documenté).

> **En résumé** : chaque heure passée à documenter et à durcir un équipement à sa mise en service est une heure, souvent bien plus, gagnée le jour où il tombe.
