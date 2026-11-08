<!-- WerbGouvernance – Développé par @WerbHat -->
# Élaborer la politique de sécurité (PSSI)

La **politique de sécurité des systèmes d'information** (PSSI) est le document par lequel la direction dit, noir sur blanc : *voici ce que nous protégeons, pourquoi, contre quoi, qui en est responsable, et quelles règles chacun applique*. Elle est le premier document du SMSI : la norme ISO/IEC 27001 l'exige, NIS2 demande des politiques de sécurité approuvées par la direction, et c'est la première pièce qu'un auditeur ou un client demande.

Une bonne PSSI n'est pas un catalogue recopié. C'est un **choix** : des règles proportionnées aux enjeux réels de l'entreprise, que les équipes peuvent appliquer, et dont on peut vérifier l'application.

Ce guide suit la démarche en quatre phases du guide d'élaboration de PSSI de l'ANSSI (édition DCSSI de 2004), dont la méthode reste la référence. Il la met à jour (normes ISO 27001 et 27002 de 2022, NIS2, systèmes industriels) et l'illustre par des exemples de sites de production.

> **À vérifier** : les obligations légales évoluent. Pour celles qui s'appliquent à votre organisation, appuyez-vous sur les référentiels de WerbReferentiels (NIS2, RGPD, CRA, ISO 27001) et, au besoin, sur un juriste.

---

## 1. Ce qu'est une PSSI, et ce qu'elle n'est pas

| Une PSSI, c'est… | Ce n'est pas… |
|---|---|
| La vision de la **direction**, signée par elle | Un document technique écrit seul par l'informatique |
| Des **éléments stratégiques** (enjeux, obligations, besoins, menaces) puis des **règles** | Une liste de produits de sécurité à acheter |
| Des règles **applicables** et **vérifiables** | Une copie de la norme ISO 27002 ou d'un modèle trouvé en ligne |
| Un document **vivant**, revu chaque année | Un classeur rangé une fois signé |
| Le cadre d'où découlent les **procédures**, la **charte utilisateur** et le **socle de mesures** des sites | Le document qui décrit *comment* configurer chaque équipement (c'est le rôle des procédures) |

Elle répond à cinq questions :

- **Pourquoi** protéger : enjeux, obligations, menaces ;
- **Quoi** protéger : les activités et informations essentielles, et leurs besoins de sécurité ;
- **Qui** protège : organisation et responsabilités ;
- **Comment** protéger : les règles de sécurité ;
- **Quand** protéger : tout au long du cycle de vie (projet, exploitation, fin de vie).

---

## 2. La démarche en quatre phases

Chaque phase se termine par une **validation**. C'est ce qui implique la direction pas à pas, au lieu de lui présenter un pavé à signer à la fin.

| Phase | Tâches | Livrable | Validé par |
|---|---|---|---|
| **0 — Préalables** | Organiser le projet ; rassembler le référentiel documentaire | **Note de cadrage** | Direction générale |
| **1 — Éléments stratégiques** | Périmètre ; enjeux ; obligations légales et contractuelles ; échelle de besoins ; besoins de sécurité ; origines des menaces | **Note de stratégie** | Comité de pilotage, puis direction |
| **2 — Principes et règles** | Choisir les principes ; rédiger les règles ; faire les synthèses | **Synthèse des règles** et **synthèse des impacts** | Comité de pilotage, puis direction |
| **3 — Finalisation** | Relire, finaliser et faire signer la PSSI ; bâtir le plan d'action | **PSSI signée** et **plan d'action** | Comité de pilotage, puis direction |

> Une **analyse de risques** préalable (EBIOS Risk Manager, dans WerbEBIOS) simplifie beaucoup la phase 1 : elle fournit l'échelle de besoins, les besoins de sécurité et les sources de risque. Sans elle, la PSSI reste faisable, mais les choix seront moins justifiés.

**Durée indicative** : pour une entreprise de taille moyenne avec un ou deux sites, deux à quatre mois de calendrier, au rythme d'une séance de travail par semaine ou tous les quinze jours. Le travail réel tient en quelques jours par personne ; ce sont les validations qui fixent le rythme.

---

## 3. Phase 0 — Préalables

### Organiser le projet

Une PSSI se conduit comme un **projet**, avec une lettre de mission de la direction.

| Rôle | Qui, typiquement | Ce qu'il fait |
|---|---|---|
| **Commanditaire** | Direction générale | Lance le projet, arbitre, signe |
| **Chef de projet** | RSSI ou responsable SMSI | Anime, rédige, prépare les validations |
| **Comité de pilotage** | Direction, DSI, directeurs de site ou de production, RH, juridique, achats | Valide chaque phase ; deviendra le **comité de sécurité** qui fait vivre la PSSI |
| **Groupe d'experts** | Réseau, OT et automatisme, juridique, sûreté, exploitation | Apporte la connaissance du terrain, vérifie que les règles sont applicables |

Conseils :

- Le comité de pilotage doit réunir des personnes **légitimes pour décider**. Un comité de techniciens produit une PSSI que personne n'applique.
- Faites participer la **production** dès le départ : une règle qui arrête une ligne ne sera pas appliquée.
- Un **tiers neutre** (consultant, RSSI d'une autre entité du groupe) aide à faire émerger les vrais sujets et à dépasser les blocages entre services.

### Rassembler le référentiel documentaire

- [ ] Textes applicables : NIS2 (loi de transposition), RGPD, CRA pour les produits, obligations sectorielles (OIV, OSE, défense, santé…)
- [ ] Contrats clients : clauses de sécurité, plans d'assurance qualité, exigences des donneurs d'ordre
- [ ] Contrats prestataires : télémaintenance, infogérance, hébergement, éditeurs
- [ ] Assurance cyber : exigences de l'assureur
- [ ] Règlement intérieur et charte informatique existante
- [ ] Schéma directeur informatique, cartographie du SI (WerbMap, WerbCartoSI)
- [ ] Analyses de risques existantes (WerbEBIOS), audits et tests d'intrusion récents (WerbPentest, WerbNIS2)
- [ ] Procédures et consignes déjà en vigueur (WerbGouvernance › Procédures)

### La note de cadrage

Deux à quatre pages, validées par la direction :

1. Objectifs du projet et pourquoi maintenant (audit à venir, client, NIS2, incident récent)
2. Périmètre pressenti (tout le groupe, un site, l'IT seulement ou IT et OT)
3. Organisation : commanditaire, chef de projet, comité, experts
4. Démarche et calendrier, avec les dates de validation
5. Moyens : temps des participants, budget éventuel (accompagnement)
6. Livrables attendus

---

## 4. Phase 1 — Éléments stratégiques

C'est la phase la plus importante : tout le reste en découle. La direction doit y être impliquée, pas seulement la valider.

### Tâche 1 : le périmètre

Listez les **domaines d'activité** (production, maintenance, logistique, qualité, RH, finance, commercial, R&D) et les **systèmes** qui les portent, puis décidez ce qui est dans la PSSI et ce qui ne l'est pas.

- Question décisive sur un site industriel : **les systèmes industriels (OT) sont-ils dans le périmètre ?** La réponse devrait presque toujours être oui, avec des règles adaptées.
- Si le groupe est grand, la PSSI du groupe pose le cadre commun ; chaque site le décline (voir § 7).
- Notez les **interfaces** avec l'extérieur : prestataires, clients connectés, maison mère, cloud.

### Tâche 2 : les enjeux et orientations

En quelques lignes chacun : de quoi dépend l'activité, ce qui ferait le plus mal, ce que la direction veut garantir.

> Exemple : *« Notre premier enjeu est la continuité de la production des lignes 1 à 3 : un arrêt de plus de 48 heures met en péril nos livraisons au client principal. Deuxième enjeu : la confidentialité des plans de nos produits, qui font notre avance commerciale. Troisième : la conformité NIS2, exigée par notre statut d'entité importante. »*

### Tâche 3 : les obligations légales, réglementaires et contractuelles

Faites la liste de ce qui s'impose à vous et **qui en est responsable**. Seule une synthèse figurera dans la PSSI ; le détail peut aller en annexe.

| Source | Exemples d'obligations | Où approfondir |
|---|---|---|
| NIS2 | Mesures de gestion des risques, notification des incidents, responsabilité des dirigeants | WerbReferentiels › NIS2, WerbNIS2 |
| RGPD | Registre des traitements, sécurité des données, violations sous 72 h | WerbReferentiels › RGPD, WerbRGPD |
| CRA | Exigences envers les fournisseurs de produits numériques | WerbReferentiels › CRA |
| Contrats clients | Clauses de confidentialité, plan d'assurance sécurité | Service commercial, juridique |
| Assurance cyber | Authentification multifacteur, sauvegardes hors ligne exigées | Contrat d'assurance |

### Tâche 4 : l'échelle de besoins

Une échelle commune permet de dire qu'une activité a un besoin de disponibilité « 4 » et que tout le monde comprenne la même chose. Utilisez **la même échelle que l'analyse de risques** (dans WerbSMSI, l'échelle de gravité publiée par WerbEBIOS au niveau du groupe), pour que la PSSI et EBIOS parlent la même langue.

| Niveau | Disponibilité | Intégrité | Confidentialité |
|---|---|---|---|
| 1 — Mineur | Arrêt de plusieurs jours acceptable | Erreur sans conséquence, corrigée facilement | Information publique |
| 2 — Significatif | Arrêt de 24 à 48 h acceptable | Erreur gênante, détectée et corrigée | Diffusion interne |
| 3 — Grave | Arrêt de quelques heures au plus | Erreur qui touche la qualité produit ou un client | Diffusion restreinte : préjudice si divulgation |
| 4 — Critique | Pas d'arrêt toléré (temps réel) | Erreur qui touche la sécurité des personnes | Confidentiel : préjudice majeur, avantage concurrentiel perdu |

Complétez par **un à trois types d'impact** qui comptent pour vous (financier, image, sécurité des personnes, juridique), avec un exemple chiffré pour chaque niveau.

### Tâche 5 : les besoins de sécurité

Pour chaque domaine d'activité du périmètre, attribuez un niveau sur chaque critère. Retenez la valeur la plus forte quand plusieurs impacts jouent.

| Domaine | D | I | C | Pourquoi |
|---|---|---|---|---|
| Production (supervision, automates) | 4 | 4 | 2 | Arrêt de ligne ; une consigne fausse touche la sécurité |
| Qualité et traçabilité | 2 | 4 | 2 | Traçabilité réglementaire des lots |
| R&D, plans produits | 2 | 3 | 4 | Savoir-faire, avance commerciale |
| RH et paie | 2 | 3 | 3 | Données personnelles, salaires |
| Bureautique, messagerie | 3 | 2 | 2 | Gêne, contournement possible |

### Tâche 6 : les origines des menaces

Il ne s'agit pas de lister les failles, mais **qui ou quoi** pourrait nuire, et comment, en termes simples.

| Origine | Exemple concret | Retenue ? |
|---|---|---|
| Cybercriminels (rançongiciel) | Chiffrement des serveurs et de la supervision, demande de rançon | Oui |
| Prestataire ou fournisseur compromis | Accès de télémaintenance utilisé pour entrer | Oui |
| Salarié négligent ou malveillant | Clé USB infectée branchée sur un poste de supervision ; fuite de plans | Oui |
| Concurrent, espionnage | Vol de plans par hameçonnage ciblé | Oui pour la R&D |
| Événement physique | Incendie du local serveur, coupure électrique | Oui |
| Attaque étatique ciblée | Sabotage d'infrastructure | Non retenue (justifier : ni OIV ni secteur sensible) |

Les menaces **non retenues** sont écrites aussi, avec la raison : c'est ce qui rend la PSSI défendable.

Pour chaque menace retenue, l'ANSSI demande de préciser les **critères** qu'elle peut affecter (disponibilité, intégrité, confidentialité) et de caractériser l'élément menaçant : son **type** (naturel, humain, environnemental), sa **cause** (accidentelle : exposition et ressources ; délibérée : expertise, ressources et motivation) et son **potentiel d'attaque**. Le détail est dans le guide [Accompagner chaque phase de la PSSI](3-Accompagner_les_phases_de_la_PSSI.md).

### La note de stratégie

Elle reprend les six tâches sur quelques pages et devient la **partie I** de la PSSI. Faites-la valider par le comité, puis par la direction, avant d'écrire la moindre règle.

---

## 5. Phase 2 — Principes et règles

### Choisir les principes

Un **principe** est une orientation (« les accès sont nominatifs ») ; une **règle** est sa déclinaison chez vous (« chaque personne dispose d'un compte personnel ; les comptes partagés sont interdits sur les postes de supervision, sauf compte d'urgence sous enveloppe scellée »).

Partez du catalogue ci-dessous et, pour chaque principe :

1. **écartez-le** s'il n'existe rien de concerné chez vous, s'il est hors périmètre, s'il ne porte sur rien d'important pour vos besoins de sécurité, ou si aucune menace retenue ne le justifie (les quatre filtres de l'ANSSI) ;
2. **en cas de doute, gardez-le** ;
3. **justifiez par écrit** chaque principe écarté ;
4. faites **statuer le comité de pilotage** sur la liste retenue.

### Le catalogue, par domaine

Catalogue de départ (**61 principes**, dont 28 « essentiels »), qui reprend le référentiel de principes de l'ANSSI (voir la correspondance ci-dessous) et l'aligne sur l'ISO/IEC 27002:2022, NIS2 et l'IEC 62443 pour les systèmes industriels. Les dix principes ajoutés en version 1.12.0, d'après l'ANSSI, sont proposés en mode complet : documentation de sécurité (GOV-5), vérification et homologation avant mise en service (RSK-4), conservation et destruction (INV-4), postes sensibles (RH-4), verrouillage des sessions (ACC-5), procédures d'exploitation et de maintenance (SYS-6), messagerie (SYS-7), veille (LOG-3), visiteurs (PHY-3), réseaux sans fil (NET-4).

| Domaine | Principes clés |
|---|---|
| **Gouvernance de la sécurité** | Politique approuvée par la direction et revue chaque année ; rôles et responsabilités définis ; comité de sécurité ; gestion des dérogations |
| **Gestion des risques** | Analyse de risques périodique ; risques résiduels acceptés par la direction ; sécurité intégrée aux projets |
| **Inventaire et classification** | Inventaire des actifs et des SI à jour ; propriétaire désigné ; classification des informations |
| **Ressources humaines** | Engagement de confidentialité ; sensibilisation à l'arrivée puis régulière ; formation des dirigeants ; départs gérés (comptes, matériels) |
| **Contrôle d'accès** | Comptes nominatifs ; moindre privilège ; revue périodique des droits ; authentification renforcée pour les accès sensibles et à distance |
| **Administration** | Comptes d'administration séparés ; postes ou réseau d'administration dédiés ; traçabilité des actions d'administration |
| **Réseau et cloisonnement** | Cloisonnement IT et OT, zones et conduits ; filtrage au plus juste ; interconnexions maîtrisées |
| **Postes et serveurs** | Configuration durcie ; mises à jour de sécurité ; protection contre les codes malveillants ; supports amovibles contrôlés |
| **Systèmes industriels (OT)** | Inventaire et cartographie des automatismes ; accès distants via un point d'entrée unique ; modifications d'automates tracées ; correctifs testés avant déploiement |
| **Prestataires et fournisseurs** | Clauses de sécurité dans les contrats ; accès des prestataires encadrés ; exigences envers les produits (CRA) |
| **Journalisation et détection** | Journaux des événements de sécurité conservés et protégés ; surveillance des alertes |
| **Gestion des incidents** | Signalement simple pour tous ; procédure de réponse ; notifications réglementaires (ANSSI, CNIL) ; retour d'expérience |
| **Continuité et sauvegarde** | Sauvegardes testées, dont une copie hors ligne ; plan de reprise ; exercices |
| **Sécurité physique** | Accès aux locaux techniques contrôlés ; protection contre l'incendie et les coupures électriques |
| **Cryptographie** | Chiffrement des postes nomades et des échanges sensibles ; gestion des certificats et des clés |
| **Conformité et contrôle** | Respect des obligations légales ; audits périodiques ; indicateurs suivis en revue de direction |

### Correspondance avec le référentiel de l'ANSSI

Le guide de l'ANSSI (section 3, 2004) propose **166 principes en 16 domaines**. Le catalogue de WerbGouvernance les reprend sous une forme modernisée et regroupée : chaque principe du catalogue indique, dans l'assistant, le document PSSI (annexe B) et l'export Excel, les **principes de l'ANSSI** qu'il reprend. **161 principes de l'ANSSI sont repris** ; **5 sont écartés**, avec leur justification.

| Domaine de l'ANSSI | Principes | Repris par (catalogue WerbGouvernance) | Non repris |
|---|---|---|---|
| PSI — Politique de sécurité | 12 | CTL-1, CTL-2, GOV-1, INV-2, INV-3, RSK-1 | — |
| ORG — Organisation de la sécurité | 17 | CON-3, CRY-1, CTL-3, FOU-1, GOV-2, GOV-3, INC-3, INV-2, LOG-3, NET-3 | — |
| GER — Gestion des risques SSI | 6 | CRY-1, NET-1, NET-2, RSK-1, RSK-2 | — |
| CDV — Sécurité et cycle de vie | 11 | CTL-2, FOU-2, OT-3, OT-4, RSK-3, RSK-4, SYS-1, SYS-3 | — |
| ACR — Assurance et certification | 14 | CTL-2, FOU-3, GOV-5, OT-4, RSK-3, RSK-4, SYS-1 | ACR-10 |
| ASH — Aspects humains | 10 | ACC-1, RH-1, RH-3, RH-4 | ASH-01 |
| PSS — Planification de la continuité des activités | 6 | CON-1, CON-2 | — |
| INC — Gestion des incidents | 7 | CON-3, INC-1, INC-2, INC-4, LOG-2 | — |
| FOR — Sensibilisation et formation | 11 | CON-3, CTL-1, GOV-1, GOV-2, INC-1, RH-1, RH-2 | — |
| EXP — Exploitation | 25 | ADM-2, CRY-1, FOU-1, FOU-2, INV-3, INV-4, LOG-2, LOG-3, NET-2, OT-2, RSK-3, SYS-2, SYS-3, SYS-4, SYS-6, SYS-7 | — |
| ENV — Aspects physiques et environnement | 16 | ACC-5, CON-1, CRY-1, GOV-5, INV-1, INV-4, NET-1, PHY-1, PHY-2, PHY-3 | — |
| AUT — Identification / authentification | 4 | ACC-1, ACC-3 | — |
| CAL — Contrôle d'accès logique aux biens | 14 | ACC-2, ACC-3, ACC-5, ADM-1, FOU-2, NET-1, NET-2, NET-3, NET-4, OT-2 | — |
| JRN — Journalisation | 6 | ADM-3, LOG-1, LOG-2 | — |
| IGC — Infrastructures de gestion des clés | 3 | CRY-2 | — |
| SCP — Signaux compromettants | 4 | NET-4 | SCP-01, SCP-02, SCP-03 |

**Principes de l'ANSSI non repris, et pourquoi :**

- **ASH-01** : Attestation de reconnaissance de responsabilité pour le secret de défense : informations classifiées de défense, hors du périmètre d'une entreprise industrielle non habilitée. Les engagements de tous sont couverts par RH-1.
- **ACR-10** : Agrément d'un système traitant des informations classifiées de défense : même raison. L'homologation, plus générale, est reprise en RSK-4.
- **SCP-01, SCP-02, SCP-03** : Signaux compromettants (zonage, matériel TEMPEST, cages de Faraday) : protections réservées aux informations classifiées de défense. Les transmissions sans fil (SCP-04) sont reprises en NET-4.

Si votre organisation traite des informations classifiées de défense, ces principes redeviennent applicables : reportez-vous au guide de l'ANSSI et à l'IGI 1300.

Quatre principes du catalogue n'ont pas d'équivalent dans le référentiel de 2004 et répondent à des pratiques ou obligations plus récentes : **GOV-4** (dérogations), **ACC-4** (mots de passe par défaut), **SYS-5** (équipements en fin de support) et **OT-1** (inventaire des systèmes industriels).

### Rédiger les règles

Chaque principe retenu devient une ou plusieurs règles. Une bonne règle dit **qui** fait **quoi**, **quand**, et se **vérifie**.

| Qualité | À éviter | Mieux |
|---|---|---|
| Précise | « Les mots de passe doivent être robustes. » | « Les mots de passe des comptes personnels comptent au moins 12 caractères ; les comptes d'administration utilisent une authentification multifacteur. » |
| Applicable | « Aucun poste ne doit avoir de faille. » | « Les correctifs de sécurité critiques sont installés sous 30 jours sur les postes bureautiques ; sur les postes OT, après validation par l'automaticien, lors de l'arrêt programmé suivant. » |
| Vérifiable | « Les accès sont surveillés. » | « Les accès à distance des prestataires sont ouverts à la demande, tracés, et la liste est revue chaque trimestre par le responsable de site. » |
| Proportionnée | Même exigence partout | Niveau **essentiel** pour tous, niveau **renforcé** pour les domaines de besoin 3 ou 4 |

**La graduation des moyens.** Les besoins de la phase 1 fixent le niveau de chaque règle. Exemple pour les sauvegardes :

- **essentiel** : sauvegarde hebdomadaire des serveurs, restauration testée une fois par an ;
- **renforcé** (domaines de disponibilité 4) : sauvegarde quotidienne, copie hors ligne hebdomadaire, restauration testée chaque semestre, ordre de redémarrage écrit.

Faites relire chaque règle par **ceux qui devront l'appliquer** (exploitation, production, maintenance) : c'est le meilleur test d'applicabilité.

### Les deux synthèses

- **Synthèse des règles**, pour le comité de pilotage : les principes retenus et écartés (avec les justifications), les règles proposées, leur niveau.
- **Synthèse des impacts**, pour la direction : ce que les règles coûtent et changent.

| Règle | Coût estimé | Effort interne | Impact sur l'organisation | Échéance proposée |
|---|---|---|---|---|
| Authentification multifacteur des accès distants | Licences | 5 jours | Changement pour les prestataires | 3 mois |
| Copie de sauvegarde hors ligne | Disques, armoire forte | 2 jours puis 1 h par semaine | Rotation des disques par l'exploitation | 1 mois |
| Comptes nominatifs sur la supervision | Aucun | 3 jours par site | Formation des opérateurs | 6 mois |

L'analyse des coûts reste **macroscopique** : l'objectif est que la direction décide en connaissance de cause.

---

## 6. Phase 3 — Finalisation

### Relire avant de signer

- [ ] Les règles sont cohérentes entre elles (pas d'exigence contradictoire)
- [ ] Chaque risque jugé significatif est couvert par au moins une règle
- [ ] Chaque principe retenu a été décliné
- [ ] Chaque règle est applicable avec les pratiques et les moyens actuels, ou figure au plan d'action
- [ ] Le texte est lisible par ses destinataires (une version courte pour tous, la version complète pour les responsables)

### Le plan type

Le plan type de l'ANSSI comporte **deux parties** : les éléments stratégiques (six chapitres) et les règles de sécurité classées par thème. WerbGouvernance y ajoute une **partie III**, qui regroupe ce que la norme ISO/IEC 27001 attend d'une politique (organisation, responsabilités, revue) et ce que l'ANSSI recommande ailleurs dans sa méthode (comité de sécurité, diffusion, sensibilisation).

**Partie I — Éléments stratégiques** (plan type de l'ANSSI)

1. Objet, périmètre et domaine d'application
2. Enjeux et orientations stratégiques
3. Obligations légales, réglementaires et contractuelles
4. Échelle de besoins et types d'impact
5. Besoins de sécurité des domaines d'activité
6. Origines des menaces, retenues et non retenues

**Partie II — Règles de sécurité** (plan type de l'ANSSI), classées par domaine (catalogue du § 5), avec leur niveau (essentiel, renforcé).

**Partie III — Vie de la politique** (complément WerbGouvernance)

- Organisation et responsabilités (rôles, comité de sécurité)
- Gestion des dérogations : qui peut accorder une exception, pour combien de temps, avec quelle compensation
- Diffusion et sensibilisation
- Révision : après tout événement majeur, et au moins tous les cinq ans selon le guide de l'ANSSI (2004) ; WerbGouvernance recommande une revue **annuelle**, avec la revue de direction du SMSI (ISO/IEC 27001 : revue à intervalles planifiés)
- Documents d'application : procédures, charte utilisateur, PSSI de site

### Signer et faire connaître

- La PSSI est **signée par la direction générale**. Inscrivez-la dans WerbGouvernance › *Politique et périmètre* : référence, version, approbateur, date, prochaine revue.
- **Diffusez-la** à tous les acteurs du SI, prestataires et intérimaires compris, sous une forme adaptée : une **charte utilisateur** de deux pages pour tous, la PSSI complète pour les responsables.
- Accompagnez la diffusion d'une **sensibilisation** (WerbAcademie).

### Le plan d'action

La PSSI fixe la cible ; le plan d'action dit comment l'atteindre depuis la situation actuelle. Selon l'ANSSI, chaque responsable d'unité (site, service) et le RSSI (pour les actions générales) établissent les actions prioritaires, en commençant par les **risques les plus significatifs**. Pour chaque action : **objectif et responsable**, **tâches**, **dépendances**, **planning et budget**, **modalités de validation** (comment on vérifie qu'elle est faite). Le plan réunit des actions **organisationnelles ou procédurales** et des actions **techniques** ; il est validé par le comité de sécurité et tenu à jour. Inscrivez les actions dans WerbGouvernance › *Plan d'actions*.

---

## 7. Après la signature : faire vivre la PSSI

| Suite | Ce qu'on fait | Dans WerbSMSI |
|---|---|---|
| **Décliner** | Les règles deviennent des procédures et des mesures appliquées par chaque site | WerbGouvernance › Socle de mesures (publié aux sites), Procédures |
| **Piloter** | Le comité de sécurité suit le plan d'action et les indicateurs | WerbGouvernance › Revues de direction, Plan d'actions |
| **Contrôler** | Audits et contrôles réguliers de l'application | WerbNIS2, WerbIEC62443, WerbPentest |
| **Veiller** | Suivre les menaces et vulnérabilités, adapter les règles | WerbVeille |
| **Réviser** | Après tout événement majeur ; revue annuelle recommandée (l'ANSSI fixe un minimum de cinq ans en 2004) | WerbGouvernance › Politique et périmètre (prochaine revue) |

Dans un **groupe multi-sites**, la PSSI du groupe pose le cadre commun ; chaque site écrit un **plan de sécurité** (ou une PSSI de site) qui applique les règles à ses moyens et à son environnement, notamment aux systèmes industriels. Le socle de mesures de WerbGouvernance est l'outil de cette déclinaison.

---

## 8. L'assistant de WerbGouvernance

**📜 PSSI › Assistant PSSI** suit cette démarche à l'écran : une page par phase, avec le « pourquoi » et un exemple industriel, et une **validation** du comité à la fin de chaque phase. Le bouton **❓ Aide de la phase** ouvre à côté le guide [Accompagner chaque phase de la PSSI](3-Accompagner_les_phases_de_la_PSSI.md) : méthode d'atelier, questions à poser, pièges et critères de validation.

- **Phase 0 et phase 1** sont pré-remplies : périmètre et rôles de la base, échelle de gravité et sources de risque de l'analyse EBIOS du groupe (espace ouvert). Les notes de cadrage et de stratégie s'impriment à tout moment.
- **Phase 2** propose le catalogue de la section 5 en deux modes : **essentiel** (28 principes pré-sélectionnés, pour une première PSSI en quelques séances) ou **complet**. Pour chaque principe : retenu, écarté (justification obligatoire) ou déjà couvert ; la règle proposée existe en niveau essentiel et renforcé, et reste modifiable.
- Chaque règle retenue devient, d'un clic, une **mesure du socle** publiée aux sites : la PSSI pilote ce que les sites appliquent.
- **Phase 3** rassemble le tout dans le **document PSSI** selon le plan type ci-dessus, en PDF et en Word au modèle de l'entreprise. La relecture en cinq points et la validation des phases 0 à 2 précèdent l'**approbation**, qui inscrit la PSSI dans *Politique et périmètre* (prochaine revue à un an). Les règles retenues qui ne sont pas encore en place deviennent des actions du *Plan d'actions*.
- **PSSI › Charte utilisateur** produit la version courte pour tous, à partir des règles retenues qui concernent les utilisateurs : textes à la première personne, modifiables, en PDF et en Word.

## 9. Les erreurs les plus fréquentes

| Erreur | Conséquence | À faire |
|---|---|---|
| Copier un modèle ou la norme ISO 27002 en entier | Cent règles que personne n'applique ; un auditeur le voit tout de suite | Choisir, justifier, proportionner |
| Écrire la PSSI sans la direction | Pas de budget, pas d'arbitrage, pas d'autorité | Valider chaque phase avec elle |
| Oublier les systèmes industriels | Le principal risque d'arrêt n'est pas couvert | Les inclure dans le périmètre, avec des règles adaptées |
| Des règles vagues (« sécuriser », « protéger ») | Impossible à vérifier | Qui, quoi, quand, comment on le vérifie |
| Pas de gestion des dérogations | Contournements cachés | Une procédure de dérogation simple et tracée |
| Signer puis ranger | La PSSI ne correspond plus à la réalité au bout d'un an | Revue annuelle, indicateurs, plan d'action suivi |

---

## 10. Check-list de la PSSI

- [ ] Lettre de mission et note de cadrage validées par la direction
- [ ] Comité de pilotage constitué, avec la production et le juridique
- [ ] Périmètre écrit, systèmes industriels compris ou exclus de façon justifiée
- [ ] Obligations légales et contractuelles recensées, avec leurs responsables
- [ ] Échelle de besoins commune avec l'analyse de risques
- [ ] Besoins de sécurité des domaines d'activité évalués
- [ ] Menaces retenues et non retenues, avec justification
- [ ] Note de stratégie validée
- [ ] Principes retenus et écartés justifiés
- [ ] Règles précises, applicables, vérifiables, graduées
- [ ] Synthèses des règles et des impacts validées
- [ ] PSSI relue, signée, enregistrée dans *Politique et périmètre*
- [ ] Plan d'action inscrit dans *Plan d'actions*
- [ ] Charte utilisateur diffusée, sensibilisation planifiée
- [ ] Date de prochaine revue fixée

---

## Pour aller plus loin

- **Guide pour l'élaboration d'une PSSI**, ANSSI (DCSSI), 2004 : méthode en quatre phases, référentiel de principes et références, disponible sur https://cyber.gouv.fr
- **ISO/IEC 27001:2022** (exigences du SMSI) et **ISO/IEC 27002:2022** (mesures de sécurité) : voir WerbReferentiels › ISO 27001
- **Guide d'hygiène informatique** de l'ANSSI : les mesures essentielles, voir WerbReferentiels › ANSSI
- **NIS2**, **RGPD**, **CRA** : voir les référentiels correspondants dans WerbReferentiels
- Guide [Piloter la sécurité du groupe sans être expert](1-Piloter_le_SMSI.md) : la place de la PSSI dans la roue du SMSI
