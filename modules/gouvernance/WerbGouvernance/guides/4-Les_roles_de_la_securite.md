<!-- WerbGouvernance – Développé par @WerbHat -->
# Les rôles de la sécurité : qui fait quoi, et comment

Ce guide complète l'écran **🏛️ Cadre › Rôles** de WerbGouvernance. Pour chaque rôle de l'organisation de la sécurité, il donne la **mission**, les **tâches clés** selon leur rythme, les **décisions** qui lui reviennent, les **pièges** à éviter et les **outils** de WerbSMSI qui l'aident. Il commence par les **principes de conduite** communs à tous.

Le guide [Piloter la sécurité du groupe sans être expert](1-Piloter_le_SMSI.md) donne la vue d'ensemble ; celui-ci entre dans le détail de chaque rôle. Adaptez les intitulés à votre organisation : dans une petite structure, une même personne tient plusieurs rôles, à condition de respecter la séparation des tâches (section 5).

---

## 1. Les principes de conduite communs à tous les rôles

### La posture : la sécurité sert l'entreprise

- **La sécurité sert les objectifs de l'entreprise**, elle ne les remplace pas. Une mesure se justifie par le risque qu'elle réduit, au regard de ce qu'elle coûte et de ce qu'elle gêne.
- **Les personnes d'abord.** Dans un site industriel, la sécurité des personnes passe avant la production et avant la protection des données.
- **Décider selon le risque.** Pour chaque sujet, se demander : que protège-t-on, contre quoi, avec quelle gravité et quelle vraisemblance, à quel coût ?
- **Le risque appartient à la direction.** Le responsable de la sécurité conseille, propose et alerte ; la direction décide et accepte formellement le risque qui reste.

### Les principes de protection

| Principe | Ce que cela veut dire |
|---|---|
| **Disponibilité, intégrité, confidentialité** | Les trois besoins à protéger. Dans l'industrie, la disponibilité et l'intégrité passent souvent avant la confidentialité ; la **traçabilité** (savoir qui a fait quoi) les complète. |
| **Défense en profondeur** | Plusieurs barrières indépendantes : si l'une cède, la suivante tient (cloisonnement, comptes, sauvegardes, détection). |
| **Moindre privilège** | Chacun n'a que les droits nécessaires à sa mission, et seulement le temps nécessaire. |
| **Besoin d'en connaître** | Une information n'est communiquée qu'à ceux qui en ont besoin pour leur travail. |
| **Séparation des tâches** | Une même personne ne demande pas, ne valide pas et ne contrôle pas la même opération sensible. |
| **Sécurité par défaut et dès la conception** | La sécurité se prévoit au début d'un projet ou d'un achat, pas après la mise en service ; les réglages livrés sont les plus sûrs. |

### Diligence et prudence

Un responsable doit pouvoir montrer qu'il a agi **comme un professionnel raisonnable** l'aurait fait :

- **Prudence** : mettre en place les mesures qu'on peut raisonnablement attendre au regard des risques connus.
- **Diligence** : vérifier dans la durée qu'elles sont appliquées et efficaces, et corriger.
- **Preuve** : garder la trace des décisions, des contrôles et des actions (validations, journaux, comptes rendus). Sans preuve, une mesure appliquée ne compte pas lors d'un audit ou après un incident.

La directive **NIS2** (article 20) rend les organes de direction des entités concernées responsables : ils **approuvent** les mesures de gestion des risques, **supervisent** leur mise en œuvre, peuvent être tenus pour responsables en cas de manquement et doivent **suivre une formation**.

### Traiter un risque : quatre options

| Option | Exemple | Qui décide |
|---|---|---|
| **Réduire** | Cloisonner le réseau industriel, ajouter une double authentification | Le responsable du système, sur proposition du responsable de la sécurité |
| **Transférer** | Assurance cyber, clause contractuelle avec un prestataire | La direction (avec les achats et le juridique) |
| **Éviter** | Renoncer à une connexion à distance non indispensable | Le responsable métier, avec la direction si l'activité est touchée |
| **Accepter** | Garder un automate ancien non corrigeable, isolé et surveillé | La **direction**, formellement, avec une échéance de réexamen |

### La déontologie

- **Intégrité** : dire la réalité du niveau de sécurité, y compris les écarts ; ne jamais maquiller un indicateur.
- **Confidentialité** : ce que l'on apprend en exerçant un rôle de sécurité (vulnérabilités, incidents, accès) ne se divulgue pas.
- **Loyauté et légalité** : agir dans le cadre de la loi, du règlement intérieur et de son mandat ; aucun test ni contrôle sans autorisation écrite.
- **Compétence** : connaître ses limites, se former, demander de l'aide plutôt qu'improviser.
- **Signaler** : tout incident, doute ou écart est remonté, sans crainte et sans attendre.

---

## 2. Les rôles du groupe

### Direction générale

**Mission** : fixer l'ambition de sécurité, donner les moyens, décider et rendre compte.

| Rythme | Tâches clés |
|---|---|
| Une fois | Nommer le responsable de la sécurité (RSSI) et le rattacher à la direction ; lui donner un mandat écrit |
| Chaque année | Approuver la PSSI ; présider la revue de direction ; valider le budget et le plan d'actions ; suivre sa formation |
| Selon les besoins | Accepter les risques résiduels ; arbitrer les dérogations à risque élevé ; diriger la cellule de crise |

**Décisions** : approbation de la politique, acceptation des risques, moyens, priorités. **Piège** : déléguer la sécurité « à l'informatique » et ne la découvrir qu'au premier incident. **Dans WerbSMSI** : tableau de bord de WerbGouvernance, Politique et périmètre, revues de direction.

### Comité de sécurité

**Mission** : piloter le SMSI entre deux revues de direction et arbitrer au quotidien ; il réunit la direction des opérations, l'informatique, les directeurs de site, les RH et le RSSI.

| Rythme | Tâches clés |
|---|---|
| Deux à quatre fois par an | Suivre le plan d'actions, l'application du socle par site, les incidents et les écarts ; arbitrer les priorités |
| Selon les besoins | Valider les phases de la PSSI ; examiner les dérogations ; préparer les décisions de la direction |

**Piège** : un comité sans responsable de production, qui décide des règles que personne n'applique. **Dans WerbSMSI** : assistant PSSI (validations), plan d'actions, revues de direction.

### Responsable de la sécurité des systèmes d'information (RSSI)

**Mission** : animer la sécurité pour le groupe ; conseiller la direction ; piloter le SMSI.

| Rythme | Tâches clés |
|---|---|
| En continu | Conseiller les projets et les achats ; suivre la veille sur les menaces ; répondre aux sites ; coordonner les incidents |
| Chaque mois | Suivre le plan d'actions et les indicateurs ; relancer les échéances |
| Chaque année | Faire vivre la PSSI et le socle ; faire analyser les risques ; organiser l'audit interne et la sensibilisation ; préparer la revue de direction |

**Décisions** : propositions de règles et de mesures, avis sur les projets, accord sur les dérogations courantes. **Pièges** : devenir l'exploitant de la sécurité (administrer les pare-feu) au lieu de la piloter ; être juge et partie. Rattaché à la direction, il doit pouvoir faire prévaloir la sécurité face aux autres contraintes. **Dans WerbSMSI** : tous les modules ; en premier lieu WerbGouvernance, WerbEBIOS, WerbNIS2.

### Délégué à la protection des données (DPO)

**Mission** : conseiller et contrôler la conformité au RGPD ; point de contact de la CNIL et des personnes concernées.

| Rythme | Tâches clés |
|---|---|
| En continu | Tenir le registre des traitements ; conseiller sur les analyses d'impact ; traiter les demandes des personnes |
| Sous 72 heures | Préparer la notification à la CNIL d'une violation de données personnelles, avec le RSSI |

**Piège** : traiter seul une violation qui est aussi un incident de sécurité, sans le RSSI. **Dans WerbSMSI** : WerbRGPD.

### Acheteur référent prestataires

**Mission** : faire entrer la sécurité dans les contrats et le choix des fournisseurs.

| Rythme | Tâches clés |
|---|---|
| À chaque achat ou contrat | Intégrer le cahier d'exigences de cybersécurité ; vérifier les exigences du CRA pour les produits numériques ; faire évaluer les prestataires critiques |
| Chaque année | Faire réévaluer les prestataires critiques ; suivre leurs écarts |

**Piège** : signer d'abord et demander la sécurité ensuite. **Dans WerbSMSI** : WerbPresta, référentiel CRA de WerbReferentiels.

### Ressources humaines

**Mission** : faire vivre la sécurité tout au long du parcours des personnes.

| Moment | Tâches clés |
|---|---|
| Arrivée | Clause de confidentialité au contrat, remise et signature de la charte utilisateur, sensibilisation |
| Mobilité | Prévenir pour adapter les droits |
| Départ | Prévenir le jour même pour fermer les accès ; récupérer matériels et badges |

**Piège** : informer l'informatique d'un départ une semaine après. **Dans WerbSMSI** : WerbAcademie, charte utilisateur (PSSI).

---

## 3. Les rôles du site

### Directeur de site

**Mission** : répondre de la sécurité de son site, comme de la sécurité des personnes et de la qualité.

| Rythme | Tâches clés |
|---|---|
| Une fois | Désigner le correspondant cybersécurité et son suppléant |
| Chaque trimestre | Suivre l'application du socle et les écarts du site ; arbitrer les arrêts nécessaires aux correctifs |
| Selon les besoins | Décider des mesures d'urgence sur le site en cas d'incident |

**Piège** : refuser tout arrêt de ligne pour appliquer un correctif, sans mesure compensatoire. **Dans WerbSMSI** : portail (page du site), synthèses publiées.

### Correspondant cybersécurité de site

**Mission** : relayer le SMSI sur le site ; premier interlocuteur en cas d'incident.

| Rythme | Tâches clés |
|---|---|
| En continu | Faire appliquer le socle ; accueillir et encadrer les prestataires ; remonter les incidents au RSSI |
| Chaque mois | Tenir les registres d'exploitation (sauvegardes, comptes, mises à jour) ; suivre les alertes de veille |
| Chaque année | Revoir les droits d'accès ; publier les synthèses du site ; organiser la sensibilisation locale |

**Piège** : tout faire seul, sans appui de la direction du site. **Dans WerbSMSI** : WerbExploitation, WerbMap, WerbPresta, WerbVeille, WerbIEC62443.

### Responsable d'exploitation des systèmes industriels (OT)

**Mission** : maintenir les automatismes et la supervision en condition opérationnelle **et de sécurité**.

| Rythme | Tâches clés |
|---|---|
| À chaque modification | Sauvegarder et versionner les programmes d'automates ; tenir l'architecture et les flux à jour ; faire valider les changements |
| Chaque mois | Contrôler les accès à distance des mainteneurs ; vérifier les sauvegardes |
| Aux arrêts programmés | Appliquer les correctifs qualifiés ; tester les restaurations |

**Piège** : laisser un accès de télémaintenance ouvert « pour gagner du temps ». **Dans WerbSMSI** : WerbMap (zones, flux), WerbCartoSI, WerbExploitation, WerbRecette.

### Administrateurs informatiques

**Mission** : exploiter les systèmes informatiques du site de façon sûre.

| Rythme | Tâches clés |
|---|---|
| En continu | Utiliser un compte d'administration distinct ; appliquer les correctifs ; surveiller les alertes |
| Chaque semaine | Vérifier les sauvegardes et les journaux |
| Chaque trimestre | Supprimer les comptes inutiles ; revoir les droits avec leurs propriétaires |

**Piège** : naviguer sur Internet ou lire sa messagerie avec un compte d'administration. **Dans WerbSMSI** : WerbExploitation (comptes et matrices d'accès), WerbAssets.

### Propriétaire d'un système

**Mission** : répondre d'un système d'information (supervision d'une ligne, gestion de production) du point de vue métier.

| Rythme | Tâches clés |
|---|---|
| Une fois | Exprimer les besoins de disponibilité, d'intégrité et de confidentialité du système |
| Chaque année | Valider les droits d'accès ; accepter ou refuser les risques résiduels de son système, avec la direction |

**Piège** : considérer que la sécurité du système relève uniquement de l'informatique. **Dans WerbSMSI** : fiche SI de WerbMap, WerbEBIOS, WerbPCR.

### Utilisateurs

**Mission** : appliquer la charte utilisateur et signaler.

**Tâches clés** : protéger son compte et son poste, respecter la classification des informations, se former, signaler sans attendre tout comportement anormal. **Dans WerbSMSI** : charte utilisateur, formations de WerbAcademie.

---

## 4. Les rôles transverses

| Rôle | Mission | Tâches clés | Piège |
|---|---|---|---|
| **Propriétaire de procédure** | Tenir une procédure de son domaine | La rédiger, la faire valider, la revoir à l'échéance ou après un changement | Une procédure écrite une fois et jamais relue |
| **Responsable d'action** | Mener une action du plan | Réaliser l'action à l'échéance, fournir la preuve, alerter en cas de retard | Une action sans preuve de réalisation |
| **Auditeur interne** | Vérifier l'application des règles | Préparer et mener l'audit, constater avec des preuves, proposer des actions | Auditer son propre travail |
| **Cellule de crise** | Décider pendant un incident majeur | Qualifier, décider, communiquer, notifier les autorités, tenir la main courante | Improviser les contacts et les rôles le jour de la crise |

---

## 5. La séparation des tâches

Quelques cumuls à éviter, même dans une petite structure. Quand ils ne peuvent pas l'être, prévoyez un contrôle par une autre personne.

| À ne pas cumuler | Pourquoi | Si c'est impossible |
|---|---|---|
| Demander et valider ses propres droits d'accès | Personne ne contrôle l'excès de droits | Validation par le propriétaire du système |
| Administrer un système et contrôler ses journaux | Les traces peuvent être effacées ou ignorées | Revue des journaux par le correspondant ou le RSSI |
| Réaliser un travail et l'auditer | L'audit perd son indépendance | Auditeur d'un autre site ou d'un tiers |
| Piloter la sécurité et l'exploiter seul au quotidien | Le pilote ne voit plus ses propres écarts | Contrôles ponctuels par un tiers |
| Demander et approuver un paiement ou une modification sensible | Fraude ou erreur non détectée | Double validation |

---

## 6. Qui fait quoi : matrice des activités clés

**R** réalise · **A** approuve et répond du résultat · **C** consulté · **I** informé

| Activité | Direction | Comité | RSSI | Correspondant de site | Exploitation OT | Acheteur | RH | DPO |
|---|---|---|---|---|---|---|---|---|
| Rédiger et faire vivre la PSSI | A | C | R | C | C | I | C | C |
| Analyser les risques | A | C | R | C | C | I | I | C |
| Accepter un risque résiduel | A | C | C | I | I | I | I | I |
| Tenir le socle de mesures | I | A | R | C | C | I | I | I |
| Appliquer le socle sur le site | I | I | C | R | R | I | I | I |
| Gérer les accès (arrivée, départ) | I | I | C | R | R | I | R | I |
| Encadrer les prestataires | I | I | C | R | C | A | I | I |
| Traiter un incident de sécurité | I | I | A | R | R | I | I | C |
| Notifier un incident aux autorités | A | I | R | C | I | I | I | R |
| Sensibiliser et former | A | I | R | R | C | I | C | C |
| Mener l'audit interne | I | A | R | C | C | I | I | I |
| Revue de direction | A | C | R | C | I | I | I | C |

Adaptez la matrice à votre organisation et faites-la valider par le comité : elle peut figurer dans la partie III de la PSSI (organisation et responsabilités).

---

## 7. Dans WerbGouvernance

1. **🏛️ Cadre › Rôles** : déclarez les rôles du groupe et les rôles attendus sur chaque site, avec un **titulaire** et un **suppléant** pour chaque rôle clé ; résumez les missions (une à deux lignes) en vous appuyant sur ce guide.
2. Le **tableau de bord** signale un rôle du groupe sans titulaire.
3. **Intégration WerbSMSI › Publier** : les rôles sont publiés pour tous les sites (intitulé, niveau, missions) ; **les titulaires ne sont jamais publiés**, ils restent dans la base du groupe.
4. L'**assistant PSSI** reprend les rôles pour proposer le commanditaire et le chef de projet, et les liste dans la partie III du document PSSI.
