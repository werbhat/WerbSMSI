<!-- WerbSMSI – Développé par @WerbHat : guide pour les dirigeants et les débutants en cybersécurité -->
# Démarrer avec WerbSMSI — guide du dirigeant et du débutant

Vous dirigez une entreprise, ou on vient de vous confier « la cyber », et le sujet vous paraît vaste, technique et anxiogène. Ce guide est pour vous. Il explique en termes simples **ce qu'est un SMSI**, **à quoi sert WerbSMSI**, **qui doit faire quoi**, et propose une **feuille de route réaliste** sur douze mois pour mettre la démarche en place dans votre entreprise, avec les seize outils de WerbSMSI.

> WerbSMSI est un outil. Il structure le travail, garde les preuves et évite d'oublier des étapes ; il ne remplace ni l'engagement de la direction, ni le temps des équipes, ni l'avis d'un expert quand il faut trancher.

## 1. Pourquoi s'en occuper maintenant

Dans une entreprise et notamment dans l'industrie, une attaque informatique n'est plus seulement un problème de messagerie : un rançongiciel qui chiffre le serveur de supervision **arrête la production**, parfois pendant des semaines. Les causes sont presque toujours les mêmes : un courriel piégé ouvert par un collaborateur, un accès à distance de prestataire mal protégé, un mot de passe par défaut, un poste non mis à jour, une sauvegarde qui n'avait jamais été testée.

Trois raisons de s'y mettre :

- **La continuité de l'activité** : savoir ce qui est critique au sein de l'entreprise, le protéger et savoir redémarrer.
- **Les obligations** : selon votre secteur et votre taille, la directive européenne **NIS2** (et sa transposition nationale), vos clients ou vos assureurs vous demandent de prouver une démarche de sécurité. NIS2 engage directement la **responsabilité des dirigeants**, qui doivent approuver les mesures, en suivre la mise en œuvre et **se former**.
- **La confiance** : vos donneurs d'ordre évaluent de plus en plus la cybersécurité de leurs fournisseurs — et vous devez faire de même avec les vôtres.

## 2. Le SMSI en cinq minutes

Un **SMSI** (système de management de la sécurité de l'information) n'est pas un logiciel : c'est une **façon d'organiser** la sécurité, qui tourne en boucle et s'améliore chaque année. La norme ISO 27001 la décrit en quatre temps :

| Temps | En clair | Dans WerbSMSI |
|---|---|---|
| **Planifier** | Savoir ce qu'on a, ce qu'on risque, ce qu'on décide | Inventaires, analyse de risques, politique, exigences envers les prestataires, plan d'actions |
| **Faire** | Mettre en place les mesures | Registres d'exploitation, configurations, formation du personnel, plan d'actions suivi |
| **Vérifier** | Contrôler que ça marche vraiment | Tests réseau, tests d'intrusion, audits de conformité, évaluation des prestataires, suivi des formations, veille |
| **Améliorer** | Corriger et décider de la suite | Revue de direction, mise à jour des risques et du plan |

Les mots que vous entendrez :

| Mot | Ce que cela veut dire |
|---|---|
| **Actif** | Ce qui a de la valeur et doit être protégé : un automate, un serveur, une base de données, un réseau |
| **Système d'information (SI)** | Un ensemble d'actifs qui rend un service : la supervision d'une ligne, la paie, la gestion de production |
| **Valeur métier** | Ce que l'entreprise sait faire et doit continuer à faire : produire, livrer, respecter une recette |
| **Événement redouté** | Ce qu'on ne veut pas voir arriver : arrêt de ligne, vol de recettes, altération d'un réglage de sûreté |
| **Risque** | La combinaison d'une gravité (ce que ça coûte) et d'une vraisemblance (la chance que ça arrive) |
| **Mesure** | Ce qu'on met en place pour réduire un risque : sauvegarde, cloisonnement, formation, mot de passe fort |
| **Vulnérabilité** | Une faiblesse exploitable : logiciel non mis à jour, compte par défaut, port ouvert |
| **Sensibilisation** | Former chaque personne aux bons réflexes : reconnaître un courriel piégé, protéger ses mots de passe, signaler |
| **Chaîne d'approvisionnement** | Les fournisseurs et prestataires qui accèdent à vos systèmes : une porte d'entrée fréquente des attaquants |
| **Coffre-fort de mots de passe** | Un logiciel qui range les mots de passe chiffrés (par exemple KeePass), pour ne plus les noter ni les réutiliser |
| **RSSI / référent cyber** | La personne qui pilote la sécurité au quotidien |
| **EBIOS RM** | La méthode française (ANSSI) d'analyse des risques |
| **IEC 62443** | La famille de normes de cybersécurité des systèmes industriels |
| **NIS2** | La directive européenne qui impose des mesures de cybersécurité à de nombreuses entreprises |
| **PCI / PRI** | Plan de continuité informatique (continuer à fonctionner) / plan de reprise informatique (redémarrer après un incident) |
| **RTO / RPO** | Durée d'arrêt acceptable avant redémarrage / quantité de données qu'on accepte de perdre (depuis la dernière sauvegarde) |

## 3. WerbSMSI en un coup d'œil

WerbSMSI est un ensemble de petits outils (les **modules**) réunis par un **portail**. Ses principes :

- **Rien n'est en ligne** : chaque outil est une page qui s'ouvre dans Microsoft Edge, sans serveur ni abonnement. Vos données ne quittent jamais votre réseau.
- **Vos données sont des fichiers**, rangés dans un dossier protégé de votre drive : la sécurité, c'est d'abord **qui a le droit d'ouvrir ce dossier**.
- **Groupe et sites** : le groupe fixe les règles communes (politique, échelles de risque, socle de mesures, catalogue de formations, modèle d'exigences envers les prestataires) ; chaque site décline et tient ses propres inventaires, analyses et registres.
- **Les modules échangent** des synthèses entre eux, jamais de secret ni de nom de personne : l'inventaire alimente l'analyse de risques, qui alimente le plan de continuité ; les prestataires évalués apparaissent dans la fiche de chaque système et dans le plan de reprise ; les indicateurs de formation remontent au portail, au plan de continuité, à l'audit NIS2 et à la revue de direction.

| Étape | Module | La question à laquelle il répond | Niveau | Utilisé par |
|---|---|---|---|---|
| 1. Gouverner | **WerbGouvernance** | Qui est responsable de quoi, quelles règles, quel plan d'actions ? | groupe | Direction, RSSI |
|  | **WerbReferentiels** | Que disent l'ANSSI, le NIST, NIS2, l'ISO 27001 ? | — | Tous (lecture) |
| 2. Connaître son SI | **WerbMap** | Quels réseaux, quels équipements, quels flux, quels systèmes ? Où ranger les mots de passe ? | site | Responsable OT, informatique |
|  | **WerbAssets** | Comment sont configurés nos pare-feu, commutateurs, baies ? | site | Informatique, réseau |
|  | **WerbCartoSI** | Avons-nous des schémas d'architecture à jour, approuvés, et où sont-ils ? | site | Responsable OT, informatique, RSSI |
| 3. Comprendre les risques | **WerbEBIOS** | Que risquons-nous vraiment, et que décidons-nous ? | groupe, site | RSSI, métiers, direction |
| 4. Maîtriser les exigences | **WerbNIS2** | Où en sommes-nous par rapport à NIS2 ? | groupe, site | RSSI, direction |
|  | **WerbIEC62443** | Quelles exigences pour un projet industriel ? | groupe, site | Projets, intégrateurs |
|  | **WerbPresta** | Quels prestataires interviennent, où, avec quels accès, et respectent-ils nos exigences ? | groupe, site | Achats, RSSI, responsables de site |
|  | **WerbRGPD** | Quelles données personnelles traitons-nous, sur quelle base, combien de temps ? Que faire en cas de fuite ? | site | DPO, référent RGPD, RH, sûreté |
| 5. Contrôler le terrain | **WerbExploitation** | Les sauvegardes, mises à jour, comptes, certificats sont-ils suivis ? | site | Informatique, maintenance |
|  | **WerbRecette** | Le réseau bloque-t-il vraiment ce qu'il doit bloquer ? | site | Réseau, recette |
|  | **WerbPentest** | Que trouverait un attaquant ? (test d'intrusion **autorisé**) | site | Prestataire, RSSI |
| 6. Assurer la résilience | **WerbPCR** | Comment continuer à fonctionner (PCI) et redémarrer (PRI) ? | site | RSSI, responsables de site |
|  | **WerbVeille** | Une faille vient-elle d'être publiée sur nos équipements ? | site | Référent cyber |
| 7. Faire vivre le SMSI | **WerbAcademie** | Qui a été formé, à quoi, et qui doit l'être à nouveau ? | groupe | RSSI, RH, managers |

Les modules sont rangés en **sept étapes**, de la gouvernance à la résilience : c'est l'ordre de l'accueil du portail et de l'infographie *Démarrer avec WerbSMSI* (menu ❓ Aide › Infographie : démarrer). Chaque étape s'appuie sur la précédente : sans inventaire fiable, pas de cartographie pertinente ; sans cartographie, pas d'analyse de risque crédible ; sans analyse de risque, pas de décisions efficaces ; sans gouvernance, pas d'amélioration continue.

Vous n'avez **pas besoin de tout utiliser dès le départ**. La feuille de route ci-dessous indique quoi ouvrir, et quand.

## 4. Qui fait quoi

| Rôle | Mission | Temps réaliste |
|---|---|---|
| **Dirigeant (sponsor)** | Décide, donne les moyens, arbitre les risques, se forme, préside la revue annuelle | une demi-journée par trimestre, plus les arbitrages |
| **Référent cyber / RSSI** | Pilote la démarche, tient WerbSMSI à jour, anime les ateliers et les sensibilisations | de 20 % d'un temps plein (PME, un site) à un temps plein (plusieurs sites) |
| **Correspondant de site** | Fait vivre la démarche sur son site : inventaire, registres, prestataires, plan d'actions local | de 1 à 2 jours par mois |
| **Responsable OT / maintenance** | Connaît les automates, la supervision, les fenêtres d'arrêt et les intervenants extérieurs | ateliers ponctuels, inventaire initial |
| **Informatique** | Comptes, sauvegardes, mises à jour, réseau, coffre-fort de mots de passe | intégré au quotidien |
| **RH / managers** | Recensent les personnes à former, libèrent du temps pour les sessions | quelques heures par trimestre |
| **Achats** | Intègrent le cahier d'exigences cyber aux contrats des prestataires | à chaque contrat |
| **Prestataires** | Tests d'intrusion, audits, intégration, maintenance ; répondent au questionnaire d'exigences | selon les besoins |

Sans **un nom en face de chaque rôle**, la démarche s'arrête au bout de trois mois. Nommez le référent cyber avant tout le reste.

## 5. La feuille de route sur douze mois

Les durées valent pour une entreprise de taille moyenne avec un à trois sites et un référent à temps partiel. Elles s'allongent avec le nombre de sites et se raccourcissent avec un accompagnement extérieur. Chaque phase donne des résultats utiles **même si la suivante tarde**.

### Phase 0 — Décider et s'organiser (semaines 1 à 2)

- La direction **annonce** la démarche et nomme le référent cyber et les correspondants de site.
- Le périmètre est fixé : quels sites, quelles activités, quels systèmes (informatique de gestion, systèmes industriels, ou les deux).
- Dans le **portail WerbSMSI**, *🛠️ Outils › Mise en place* : créer l'espace du groupe et des sites, puis appliquer les droits décrits dans `DROITS.md` sur le drive.
- Activer l'historique des versions du drive et prévoir la **sauvegarde de l'espace** (*⚙️ Administration › Sauvegarde et restauration*).
- Dans **WerbGouvernance**, déclarer les **rôles**.
- Dans **WerbAcademie**, créer l'académie du groupe : elle contient d'emblée six formations prêtes à adapter. Planifier tout de suite la session **« Cybersécurité : le rôle des dirigeants »** pour l'équipe de direction.

**Résultat** : une équipe nommée, un espace protégé, une décision écrite de la direction, une direction qui sait ce qu'on attend d'elle.

### Phase 1 — Savoir ce qu'on a (mois 1 à 2)

On ne protège pas ce qu'on ne connaît pas.

- **WerbMap** : réseaux et VLAN, plan d'adressage, équipements (automates, serveurs, postes, commutateurs), flux entre zones, puis la **liste des systèmes d'information** du site. Ses guides *Les actifs d'un système et leur rôle* et *Les étages de la cybersécurité* expliquent aux débutants à quoi sert chaque équipement et chaque outil de sécurité.
- **WerbMap › Mots de passe** : organiser un **coffre-fort** (un dossier par système, un sous-dossier par équipement) ; WerbSMSI ne stocke jamais de mot de passe.
- **WerbExploitation** : registre des **sauvegardes**, des **comptes** (dont les comptes à privilèges et génériques) et des **mises à jour**.
- **WerbPresta** : recenser les **prestataires** qui interviennent sur le site, leur périmètre et surtout leurs **accès à distance**.
- **WerbAssets**, si le réseau industriel est conséquent : configuration des pare-feu et commutateurs.
- **WerbCartoSI** : le **registre des schémas d'architecture** (cartographie, zones et conduits, flux, administration, accès distants) — qui en répond, quand ils ont été revus, où sont les fichiers ; c'est une preuve demandée par NIS2 et l'IEC 62443.

**Gains rapides** à engager dès cette phase, sans attendre l'analyse de risques :

- une sauvegarde **hors ligne** des systèmes critiques, avec un **test de restauration** réellement fait ;
- les **mots de passe par défaut** changés, les comptes inutiles supprimés, les mots de passe rangés dans un coffre-fort ;
- les **accès à distance** (prestataires, télémaintenance) recensés et protégés par une authentification forte ;
- la **séparation** entre le réseau bureautique et le réseau industriel vérifiée ;
- une première **sensibilisation** de tout le personnel (*Hygiène numérique*, WerbAcademie) : la plupart des attaques commencent par un clic.

**Résultat** : une cartographie à jour, des sauvegardes testées, les prestataires connus, le personnel sensibilisé, les failles les plus grossières refermées.

### Phase 2 — Comprendre ses risques (mois 2 à 4)

- **WerbReferentiels** pour se familiariser avec les recommandations de l'ANSSI.
- **WerbEBIOS** au niveau **groupe** : les valeurs métier, les événements redoutés et les **échelles** communes. Un ou deux ateliers d'une demi-journée avec la direction et les métiers suffisent pour démarrer.
- **WerbEBIOS** au niveau **site** : reprendre les éléments du groupe, relier les biens supports aux actifs de WerbMap, intégrer les **prestataires** proposés par WerbPresta (parties prenantes de l'écosystème), identifier les scénarios et décider du traitement de chaque risque.
- **WerbNIS2**, si votre entreprise est concernée : un premier état des lieux par rapport aux exigences.

**Résultat** : une liste de risques classés et des décisions écrites (réduire, accepter, transférer).

### Phase 3 — Fixer les règles et le plan (mois 3 à 6)

- **WerbGouvernance** : la **politique** de sécurité, le **socle de mesures** exigé sur tous les sites, le **plan d'actions** du groupe.
- **WerbPresta** : le **modèle d'exigences** du groupe (inspiré de l'IEC 62443 et de NIS2), puis pour chaque prestataire un **cahier d'exigences cyber** à annexer au contrat et un **questionnaire** à lui faire remplir.
- **WerbAcademie** : adapter les formations à l'entreprise (contacts de signalement, outils autorisés, procédures), recenser les personnes par population (collaborateurs, administrateurs, dirigeants, prestataires, opérateurs) et planifier les sessions.
- **WerbPCR**, **Plan PCI** : pour chaque système d'information, les responsables, les risques, la prévention et la préparation de la reprise ; le plan d'actions par objectif (R#1 à R#10) ; le document Word à présenter à la direction.
- **WerbIEC62443** pour les **projets** industriels : les exigences techniques à imposer aux intégrateurs.

**Résultat** : des règles écrites, des exigences contractuelles envers les prestataires, un plan de formation, un plan d'actions priorisé avec des responsables et des échéances, un plan de continuité informatique par site.

### Phase 4 — Agir et vérifier (mois 4 à 9)

- Mettre en œuvre le plan d'actions et tenir les registres de **WerbExploitation** à jour.
- **WerbAcademie** : animer les sessions (slides générées, feuille d'émargement, quiz), saisir les présences et les résultats.
- **WerbPresta** : **évaluer** les prestataires à partir de leurs réponses, suivre les écarts jusqu'à leur correction.
- **WerbRecette** : vérifier que les flux interdits sont réellement bloqués entre les zones, avant et après chaque changement.
- **WerbPentest** : faire réaliser un **test d'intrusion autorisé** (convention signée) par un prestataire qualifié, puis suivre la remédiation.
- **WerbVeille** : installer le kit de collecte sur un poste connecté, pour être alerté des failles publiées sur **vos** équipements.

**Résultat** : des mesures en place **et contrôlées**, des failles corrigées, des prestataires évalués, un personnel formé, une veille active.

### Phase 5 — Piloter et améliorer (mois 9 à 12, puis chaque année)

- Le **portail** donne la vue d'ensemble : conformité et risques par site, socle de mesures, taux de formation à jour par site et des dirigeants, bases à jour.
- **Revue de direction** annuelle (WerbGouvernance) : où en est-on, quels incidents, quels risques ont changé, où en est la formation, quelles priorités pour l'année suivante.
- **WerbPCR**, **Plan PRI** : bilan d'impact de chaque système (RTO, RPO), dépendances (dont les prestataires), ordre et procédures de reprise ; **tester** la reprise d'un système critique.
- **WerbNIS2** : reprendre l'audit avec les preuves accumulées (formations, plan d'actions, tests).
- Mettre à jour l'analyse de risques.

**Résultat** : une démarche qui tourne seule, et des preuves pour vos clients, votre assureur ou un audit.

## 6. Le rythme de croisière

| Rythme | Activité | Module |
|---|---|---|
| Chaque semaine | Trier les alertes de veille ; vérifier que les sauvegardes ont tourné | WerbVeille, WerbExploitation |
| Chaque mois | Mises à jour, comptes, certificats ; avancement du plan d'actions ; nouveaux arrivants à former | WerbExploitation, WerbGouvernance, WerbAcademie |
| Chaque trimestre | Comité cyber avec la direction (30 minutes : risques, actions, incidents, formation) ; sessions de formation ; publication des indicateurs de formation | Portail, WerbGouvernance, WerbAcademie |
| À chaque changement | Recette réseau, mise à jour de l'inventaire ; nouveau prestataire : cahier d'exigences avant le premier accès | WerbRecette, WerbMap, WerbPresta |
| Chaque année | Revue de direction, mise à jour EBIOS, évaluation des prestataires, test de restauration, test d'intrusion, exercice de reprise, audit NIS2 | WerbGouvernance, WerbEBIOS, WerbPresta, WerbPentest, WerbPCR, WerbNIS2 |
| Tous les deux ans | Renouvellement des formations (délai réglable par formation) ; suppression des personnes parties au-delà de la durée de conservation | WerbAcademie |

## 7. Ce que le dirigeant doit faire

- [ ] Nommer un **référent cyber** et lui donner du temps.
- [ ] **Annoncer** la démarche à l'encadrement.
- [ ] Suivre la formation **« Cybersécurité : le rôle des dirigeants »** (obligation des dirigeants dans NIS2) et la renouveler.
- [ ] Participer à l'atelier sur les **valeurs métier** et les **événements redoutés** (phase 2).
- [ ] **Arbitrer** les risques : ce que l'entreprise accepte, ce qu'elle réduit, à quel coût.
- [ ] **Valider** la politique de sécurité, le plan d'actions et les exigences imposées aux prestataires.
- [ ] Présider un **comité cyber** trimestriel et la **revue de direction** annuelle.
- [ ] **Montrer l'exemple** : mêmes règles pour la direction que pour tous, aucun virement urgent sans contre-appel.

Les questions à poser à votre référent :

1. Si notre serveur de supervision était chiffré demain, combien de temps pour redémarrer ? Est-ce testé ?
2. Qui peut se connecter à distance à nos systèmes industriels, et comment ? Nos prestataires respectent-ils nos exigences ?
3. Quels sont nos trois risques les plus graves, et que faisons-nous pour chacun ?
4. Quelle part du personnel est à jour de sa formation ? Et l'équipe de direction ?
5. Le plan d'actions avance-t-il ? Qu'est-ce qui bloque ?
6. Sommes-nous concernés par NIS2, et où en sommes-nous ?

## 8. Les erreurs à éviter

- **Vouloir tout faire d'un coup** : commencez par un site pilote, puis étendez.
- **Commencer par la conformité** au lieu de l'inventaire et des gains rapides : une sauvegarde testée protège plus qu'un classeur de conformité.
- **Laisser le sujet à l'informatique seule** : les risques sont des décisions de la direction et des métiers.
- **Oublier l'industriel** : automates, supervision et accès des prestataires sont souvent les points les plus faibles.
- **Oublier les prestataires** : un intégrateur avec un accès à distance permanent et un mot de passe partagé est une porte ouverte ; les exigences se fixent **avant** la signature.
- **Former une fois pour toutes** : une sensibilisation s'oublie ; elle se renouvelle et se mesure.
- **Ne jamais tester** : une sauvegarde, un plan de reprise ou un filtrage non testés ne valent rien le jour de l'incident.
- **S'arrêter après le premier audit** : un SMSI vit chaque année.

## 9. Vos premiers pas cette semaine

1. Nommer le référent cyber et le correspondant du site pilote.
2. Ouvrir le **portail WerbSMSI** et créer l'espace (*🛠️ Outils › Mise en place*).
3. Appliquer les droits du dossier (`DROITS.md`) avec votre informatique.
4. Ouvrir **WerbMap** sur le site pilote et commencer l'inventaire des équipements critiques.
5. Lister dans **WerbPresta** les prestataires qui ont un accès à distance au site pilote.
6. Vérifier qu'une **sauvegarde hors ligne** existe pour le système le plus critique, et planifier un test de restauration.
7. Fixer la date de la première sensibilisation *Hygiène numérique* (**WerbAcademie**).

## 10. Pour aller plus loin

- Les **guides de chaque module** (menu ❓ Aide de chaque outil) détaillent leur utilisation pas à pas, notamment :
  - **WerbMap** : *Les actifs d'un système et leur rôle*, *Les étages de la cybersécurité : à quoi sert chaque outil*, *Les mots de passe : coffre-fort, comptes et partage* ;
  - **WerbPresta** : *Recenser les prestataires et leur périmètre*, *Établir le cahier d'exigences cyber d'un prestataire* ;
  - **WerbPCR** : *Établir le Plan PCI*, *Établir le Plan PRI* ;
  - **WerbAcademie** : *Mettre en place l'académie du groupe*.
- **WerbReferentiels** présente les référentiels de l'ANSSI, du NIST, NIS2 et l'ISO 27001, avec leurs sources officielles.
- L'**ANSSI** (cyber.gouv.fr) publie des guides gratuits, notamment le *Guide d'hygiène informatique* et les guides sur la *cybersécurité des systèmes industriels*.
- En cas d'incident : alertez votre référent, isolez sans éteindre, et contactez les dispositifs d'assistance nationaux (cybermalveillance.gouv.fr, CERT-FR pour les entités concernées).
