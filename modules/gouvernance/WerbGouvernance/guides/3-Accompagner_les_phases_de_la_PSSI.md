<!-- WerbGouvernance – Développé par @WerbHat -->
# Accompagner chaque phase de la PSSI

Ce guide accompagne l'**assistant PSSI** de WerbGouvernance, phase par phase. Il s'ouvre depuis le bouton **❓ Aide de la phase**, dans une fenêtre à côté de l'assistant : on lit et on saisit en même temps.

Pour chaque phase, il donne d'abord **ce que demande la méthode de l'ANSSI** : objectifs, acteurs, éléments d'entrée et de sortie, tâches, validation. Ces éléments reprennent les fiches de synthèse du *Guide pour l'élaboration d'une PSSI* (DCSSI, section 2 « Méthodologie », version du 3 mars 2004). Viennent ensuite le **détail de chaque tâche**, le **pas à pas dans l'assistant**, la manière d'**animer l'atelier**, un **exemple** de site de production, les **pièges** à éviter et les **critères** pour faire valider la phase.

La méthode générale, le catalogue et le plan type sont dans le guide [Élaborer la politique de sécurité (PSSI)](2-Elaborer_la_PSSI.md).

> **Ce qui vient de l'ANSSI et ce qui vient de WerbSMSI.** Les objectifs, acteurs, entrées, sorties, tâches, validateurs, conseils et écueils marqués « ANSSI » sont repris du guide de 2004. Les durées, les exemples, les questions d'atelier et les critères de validation sont des **propositions de WerbSMSI** pour un groupe industriel : à adapter à votre organisation.

---

## Les conditions de réussite

La méthodologie de l'ANSSI pose, avant toute phase, des conditions sans lesquelles la démarche « n'a pas de sens » :

- une **implication forte de l'encadrement au plus haut niveau** ;
- des **moyens humains significatifs**, pour le chef de projet mais aussi pour tous les acteurs (techniques, fonctionnels, décideurs) ;
- l'**implication active des responsables techniques et fonctionnels** ;
- la prise en compte, dès le départ, des **moyens financiers et humains de la mise en œuvre** du futur plan d'action ;
- le respect des **pratiques et usages** existants : ne pas « révolutionner les méthodes de travail qui ont, dans la plupart des cas, fait leurs preuves ».

La démarche doit aussi être :

- **consensuelle**, avec des points de validation réguliers ;
- **globale** : tous les risques et tous les moyens de sécurité, techniques, physiques et organisationnels ;
- idéalement menée avec un **tiers** (prestation d'assistance) dont la neutralité aide à franchir les barrières entre services. Dans un groupe, le RSSI d'une autre entité peut jouer ce rôle.

> **Validations** : selon l'ANSSI, la note de cadrage est validée par la **direction générale** ; les livrables des phases 1, 2 et 3 sont validés par le **comité de pilotage, puis par la direction générale**. Dans l'assistant, la validation de chaque phase enregistre la décision du comité ; présentez ensuite le livrable à la direction et notez-le dans le commentaire de validation.

---

## Phase 0 — Cadrage

### Ce que demande la méthode (ANSSI)

| Élément | Ce que prévoit la méthode |
|---|---|
| **Objectifs** | Définir les objectifs et les moyens de l'élaboration de la PSSI ; constituer le référentiel documentaire |
| **Acteurs** | Le responsable sécurité, ou l'initiateur du projet PSSI |
| **En entrée** | Le référentiel de l'organisme |
| **En sortie** | La note de cadrage ; le référentiel documentaire |
| **Tâches** | 1. Organisation du projet · 2. Constitution du référentiel |
| **Validation** | Note de cadrage : la hiérarchie au plus haut niveau, par défaut la **direction générale** |

La phase doit permettre à la direction générale de **décider du lancement** sur la base d'un cadre formalisé (objectifs et moyens).

### Tâche 1 : organiser le projet

La PSSI est conduite **comme un projet à part entière**. L'ANSSI demande de :

- **nommer un chef de projet**, missionné au plus haut niveau ;
- **constituer un comité de pilotage** : les principaux représentants des maîtrises d'ouvrage (les métiers, la production) et des maîtrises d'œuvre (informatique, automatisme), animé par le RSSI. Il pourra devenir ensuite le **comité de sécurité** qui fait vivre la PSSI ;
- **constituer un groupe d'experts** compétents sur les thèmes du périmètre : juridique, organisation de la sécurité, systèmes, architecture réseau ; dans l'industrie, ajoutez automatisme et maintenance ;
- **attribuer un budget**, **formaliser des objectifs détaillés**, **établir un calendrier**.

Une étape préliminaire de gestion de projet comporte trois volets :

1. la **description d'ensemble** de l'organisation du projet, des systèmes d'information en place et des domaines visés ;
2. la **formalisation du cadre d'intervention** : méthode, acteurs, calendrier, résultats attendus, champ d'application ;
3. la **rédaction de la note de cadrage**, validée par la direction générale et **diffusée**.

> **Écueil (ANSSI)** : l'indispensable, c'est un comité de pilotage dont les membres sont **représentatifs** de la maîtrise d'ouvrage et **légitimes pour décider**.
>
> **Conseil (ANSSI)** : que la PSSI soit globale ou limitée à une application, le cadre doit être clair dès le départ : l'organisation et le budget (temps, argent, ressources) en dépendent.

### Tâche 2 : constituer le référentiel documentaire

Le contexte de chaque organisme est différent ; il faut le saisir **le plus tôt possible**. La base documentaire regroupe, selon l'ANSSI :

- **aspects légaux et réglementaires** : lois applicables (protection des données personnelles, fraude informatique, secret des correspondances, cryptologie, propriété intellectuelle), règlement intérieur, obligations propres au secteur ; aujourd'hui, ajoutez **NIS2, RGPD, CRA** et les exigences de votre secteur ;
- **principes d'éthique** : protection de la vie privée, clauses éthiques des contrats ;
- **obligations contractuelles** envers les clients et partenaires (contrats de coopération, de prestation, garanties, conventions de preuve) ;
- **obligations contractuelles des prestataires et partenaires** ;
- le **référentiel de sécurité interne** : schéma directeur informatique et sécurité, **analyses de risques**, **résultats d'audits** ;
- le **référentiel des systèmes d'information** : cartographies, inventaires.

Dans WerbSMSI, une bonne partie de ce référentiel existe déjà : inventaires et cartographies (WerbMap, WerbCartoSI), analyse de risques (WerbEBIOS), conformité (WerbNIS2, WerbIEC62443), textes (WerbReferentiels).

### Pas à pas dans l'assistant

1. **Objectifs** : deux ou trois phrases sur ce que la PSSI doit apporter.
2. **Pourquoi maintenant** : l'événement déclencheur, qui donne l'urgence et aide à obtenir les moyens.
3. **Périmètre pressenti** : groupe entier ou site pilote, informatique seule ou aussi systèmes industriels. Il sera précisé en phase 1.
4. **Organisation** : commanditaire et chef de projet (proposés parmi les rôles de la base), comité, experts.
5. **Calendrier** et **moyens** : une date de validation par phase, le temps des participants, le budget éventuel (accompagnement).
6. **Référentiel documentaire** : cochez ce qui est rassemblé ; ce qui manque devient une tâche du chef de projet.

### Animer la réunion de lancement

Durée proposée : 1 heure, avec le commanditaire.

- « Qu'est-ce qui vous empêcherait de dormir : un arrêt de production, une fuite de plans, une amende, un client perdu ? »
- « Qui doit être autour de la table pour que les règles soient appliquées sur les sites ? »
- « Quel budget et combien de jours pouvez-vous y consacrer, vous et vos directeurs ? »
- « Quelle date de signature visez-vous, et pourquoi ? »

### Exemple

> *Objectifs* : doter le groupe d'une PSSI approuvée avant l'audit NIS2 de juin, applicable aux trois sites, informatique et automatismes compris. *Pourquoi maintenant* : désignation comme entité importante au titre de NIS2 ; questionnaire de sécurité d'un client automobile. *Comité* : directeur des opérations (président), DSI, directeurs des trois sites, DRH, RSSI (animateur). *Experts* : architecte réseau, responsable automatisme, juriste, acheteur. *Calendrier* : cadrage en janvier, stratégie en février, règles en mars et avril, signature en mai.

### Pièges à éviter

- **Un comité sans la production** : les règles ne seront pas appliquées sur les lignes.
- **Un chef de projet sans temps ni mandat** : l'ANSSI demande qu'il soit missionné au plus haut niveau.
- **Oublier le budget de mise en œuvre** : la PSSI produira un plan d'action qui coûtera ; la direction doit le savoir dès le lancement.
- **Rassembler les documents en dernier** : ils nourrissent toutes les phases suivantes.

### Critères pour valider la phase

- [ ] Le commanditaire et le chef de projet sont nommés, et le chef de projet a un mandat et du temps.
- [ ] Le comité réunit maîtrise d'ouvrage (dont la production) et maîtrise d'œuvre, avec des membres légitimes pour décider.
- [ ] Le budget, les objectifs détaillés et le calendrier (une date par phase) sont écrits.
- [ ] Les documents manquants du référentiel ont un responsable et une date.
- [ ] La note de cadrage est validée par la direction générale, puis diffusée.

---

## Phase 1 — Éléments stratégiques

### Ce que demande la méthode (ANSSI)

| Élément | Ce que prévoit la méthode |
|---|---|
| **Objectifs** | Déterminer les axes stratégiques et les grandes orientations dont découlera la PSSI : périmètre, contexte, enjeux, référentiel réglementaire, échelle de besoins, besoins de sécurité, origines des menaces |
| **Acteurs** | Chef de projet, représentants de la maîtrise d'ouvrage, direction générale, responsable juridique |
| **En entrée** | Le référentiel documentaire |
| **En sortie** | La note de stratégie de sécurité |
| **Tâches** | 1. Périmètre · 2. Enjeux et orientations stratégiques · 3. Aspects légaux et réglementaires · 4. Échelle de besoins · 5. Besoins de sécurité · 6. Origines des menaces |
| **Validation** | Note de stratégie : **comité de pilotage, puis direction générale** |

L'ANSSI insiste sur **l'importance capitale** de cette phase et sur l'**implication forte de la direction générale**, pour identifier les besoins et les menaces comme pour valider la cible.

### Tâche 1 : le périmètre

Décrire les domaines d'activité à couvrir et affiner le périmètre, **y compris les échanges avec l'extérieur**. La démarche :

1. formaliser une **vision globale** du système d'information (une cartographie suffit) ;
2. **lister tous les domaines d'activité** : les métiers, et les services de production, de gestion et de support (réseau d'entreprise, infogérance…) ;
3. **sélectionner et décrire les domaines essentiels** et leurs interactions ;
4. dire **ce qui est dans le périmètre et ce qui en est exclu** ;
5. si possible, identifier les fonctions et informations de chaque domaine.

> **Conseil (ANSSI)** : préférez des domaines où **un responsable unique** peut imposer les règles.
>
> **Écueil (ANSSI)** : dans une PSSI globale, on ne peut pas étudier tous les systèmes. Faites une liste assez complète, puis étudiez un **échantillon représentatif** ; les systèmes non étudiés héritent des mesures des autres. Des **sous-périmètres** demandant un traitement particulier peuvent être identifiés : dans l'industrie, c'est typiquement le cas des systèmes de production.

### Tâche 2 : les enjeux et orientations stratégiques

Présenter les enjeux du périmètre et les **contraintes générales** de l'organisme, à partir du contexte métier, des missions, du patrimoine et des valeurs. L'ANSSI cite les éléments à considérer : l'évolution prévue du système d'information, sa contribution à long terme et à la qualité du service, les contraintes externes à satisfaire, la rentabilité, les contraintes techniques, financières et d'environnement. Le résultat est une **synthèse** qui figure dans la PSSI.

> **Conseil (ANSSI)** : un schéma directeur existant facilite cette tâche ; une **analyse de risques** du périmètre permet généralement d'identifier les enjeux.

### Tâche 3 : les aspects légaux, réglementaires et contractuels

Obtenir la **liste précise des obligations** : lois et règlements applicables, clauses contractuelles (y compris celles des prestataires), et les **rôles et responsabilités** qui en découlent. Seule une **synthèse** figure dans la PSSI ; le détail peut aller en annexe.

> **Conseils (ANSSI)** : s'assurer que **tous les engagements contractuels** sont connus et traduits en exigences ou en règles est difficile, mais fondamental. Au besoin, faites appel à une **prestation juridique** pour l'inventaire des exigences.

### Tâche 4 : l'échelle de besoins

Définir une échelle pour exprimer les besoins de sécurité. Elle sert le **principe de gradation des moyens** : protéger chaque domaine selon ses besoins et les menaces qui le visent, plutôt que tout au maximum.

1. **Choisir les critères** : disponibilité, intégrité, confidentialité ; l'ANSSI admet d'autres critères si besoin (preuve, contrôle, anonymat, fiabilité). Dans l'industrie, la **sécurité des personnes** peut être un critère ou un impact.
2. **Graduer chaque critère** avec des valeurs de référence **objectives, explicites et propres à l'organisme**, présentées dans un tableau à double entrée (critères en colonnes, niveaux en lignes). L'ANSSI cite une échelle de 0 (aucune atteinte) à 4 (atteinte très importante), avec le même nombre de niveaux pour chaque critère ; l'assistant utilise 1 à 4, aligné sur l'échelle de gravité de WerbEBIOS.
3. **Lister les impacts** pertinents (image, infraction aux lois, pertes financières…) : **1 à 3 impacts**, chacun illustré par des **exemples concrets** de conséquences.

Si une **classification** existe déjà dans l'entreprise, partez d'elle.

> **Écueil (ANSSI)** : une classification ne règle pas à elle seule les règles de sécurité ; elle fixe des obligations et sert d'indicateur.
>
> **Conseil (ANSSI)** : une classification générale de la disponibilité et de l'intégrité n'est pas toujours pertinente ; quand peu d'éléments sont concernés, des règles au cas par cas sont plus simples.

### Tâche 5 : les besoins de sécurité

Pour **chaque domaine d'activité et chaque critère**, choisir le niveau de l'échelle au regard des impacts retenus. **La valeur la plus élevée l'emporte.** Exemples de l'ANSSI : un domaine qui doit rester confidentiel pour bien fonctionner vaut 3 sur 4 ; un domaine qui doit travailler en temps réel vaut 4 sur 4 en disponibilité.

Ces besoins serviront aux règles (phase 2) et à **toute étude de sécurité** ultérieure dans le périmètre.

### Tâche 6 : les origines des menaces

Identifier et caractériser les origines des menaces : les **éléments menaçants** et leurs **méthodes d'attaque**.

> **Écueil (ANSSI)** : il ne s'agit **pas** de lister les vulnérabilités ou les points faibles de l'existant, ni les risques, mais les origines des menaces dont les règles devront tenir compte.

1. Établir la liste des **méthodes d'attaque** pertinentes (incendie, vol de documents, altération des données…), **indépendamment des besoins de sécurité**. Une méthode est retenue si sa réalisation a un impact sur le périmètre.
2. Pour chaque méthode retenue : les **critères** qu'elle peut affecter, et les **éléments menaçants** qui pourraient l'employer, caractérisés par :
   - leur **type** : naturel, humain, environnemental ;
   - leur **cause** : accidentelle (préciser l'exposition et les ressources) ou délibérée (préciser l'expertise, les ressources et la motivation) ;
   - leur **potentiel d'attaque** estimé.
3. **Justifier explicitement** les menaces non retenues.

> **Conseils (ANSSI)** : ne retenez que les menaces **réellement significatives et concrètes**, décrites **sans jargon** et illustrées par des **exemples tirés de vos métiers**. Une méthode d'analyse de risques (EBIOS) fournit une liste de départ : dans l'assistant, reprenez les sources de risque de WerbEBIOS.

### Pas à pas dans l'assistant

1. **Tâche 1** : listez les domaines d'activité (proposés par l'assistant) et les systèmes qui les portent ; décochez ce qui est hors périmètre ; répondez à la question des systèmes industriels ; décrivez les interfaces avec l'extérieur.
2. **Tâche 2** : quelques lignes de la direction sur les enjeux et orientations.
3. **Tâche 3** : pour chaque texte proposé (NIS2, RGPD, CRA, IEC 62443, contrats, assurance), dites s'il s'applique et qui en répond.
4. **Tâche 4** : reprenez l'échelle de gravité de WerbEBIOS (bouton ⇩) et décrivez chaque niveau en mots concrets ; notez les 1 à 3 types d'impact qui comptent, avec un exemple chiffré.
5. **Tâche 5** : pour chaque domaine retenu, un niveau de 1 à 4 en disponibilité, intégrité et confidentialité, avec une justification d'une ligne.
6. **Tâche 6** : reprenez les sources de risque de WerbEBIOS (bouton ⇩), complétez, et justifiez les menaces non retenues.

### Animer l'atelier des besoins

Durée proposée : 2 heures, avec les responsables des domaines. Pour chaque domaine, posez les trois questions et demandez toujours un exemple chiffré :

- **Disponibilité** : « Combien de temps la ligne peut-elle s'arrêter avant que ce soit grave ? Une heure ? Une journée ? Une semaine ? »
- **Intégrité** : « Que se passe-t-il si une recette, un programme d'automate ou une consigne est faux sans qu'on le voie ? »
- **Confidentialité** : « Qu'est-ce qu'un concurrent ou un attaquant gagnerait à lire ces données ? »

Si deux participants donnent des niveaux différents, retenez le plus élevé (règle de l'ANSSI) et notez pourquoi.

### Exemple

> *Enjeux* : « Premier enjeu : la continuité des lignes d'emboutissage ; un arrêt de plus de 48 heures met en péril les livraisons au client principal. Deuxième : la confidentialité des plans et des outillages. Troisième : la conformité NIS2 et la sécurité des personnes. » *Impacts retenus* : perte de production (exemple : 1 jour d'arrêt = 200 k€), atteinte à la sécurité des personnes, sanction réglementaire. *Besoins* : Production D 4, I 4, C 2 ; Bureau d'études D 2, I 3, C 4 ; Paie D 2, I 3, C 3. *Menace retenue* : rançongiciel introduit par l'accès à distance d'un mainteneur (humain, délibéré, potentiel élevé : groupes organisés). *Menace non retenue* : « espionnage étatique : aucune activité sensible pour un État, pas d'antécédent dans le secteur ».

### Pièges à éviter

- **Rédiger les enjeux sans la direction** : la PSSI perd sa légitimité.
- **Tout coter 4** : si tout est critique, rien ne l'est, et les règles renforcées deviennent inapplicables.
- **Lister des vulnérabilités au lieu des menaces** (écueil cité par l'ANSSI).
- **Oublier les échanges avec l'extérieur** : mainteneurs, accès à distance des constructeurs, maison mère, cloud.

### Critères pour valider la phase

- [ ] Le périmètre dit ce qui est inclus, exclu et pourquoi, avec les échanges vers l'extérieur.
- [ ] La direction a écrit ou relu les enjeux.
- [ ] Chaque obligation applicable a un responsable.
- [ ] L'échelle a des valeurs de référence concrètes, et 1 à 3 impacts illustrés.
- [ ] Chaque domaine retenu a ses besoins, justifiés.
- [ ] Les menaces retenues sont caractérisées ; les menaces non retenues sont justifiées.
- [ ] La note de stratégie est validée par le comité, puis par la direction générale.

---

## Phase 2 — Principes et règles

### Ce que demande la méthode (ANSSI)

| Élément | Ce que prévoit la méthode |
|---|---|
| **Objectifs** | Sélectionner, concevoir, documenter et valider la déclinaison des principes généraux et des choix stratégiques en un **corpus de règles directement applicables** |
| **Acteurs** | Direction générale, comité de pilotage, groupe d'experts |
| **En entrée** | La note de cadrage ; la note de stratégie |
| **En sortie** | La note de synthèse justificative des choix de règles ; la note de synthèse des impacts organisationnels et financiers |
| **Tâches** | 1. Choix des principes · 2. Élaboration des règles · 3. Notes de synthèse |
| **Validation** | Les deux notes : **comité de pilotage, puis direction générale** |

Les points essentiels selon l'ANSSI : **cohérence** des règles, **applicabilité**, **auditabilité** de l'ensemble.

### Tâche 1 : choisir les principes

Le choix s'appuie sur le référentiel des systèmes d'information (note de cadrage) et sur le périmètre, les besoins et les menaces retenues (note de stratégie). L'ANSSI procède par **quatre filtres successifs** :

1. **Les entités existantes** : un principe qui ne porte sur aucune entité de l'organisme (logiciel, matériel, réseau, organisation, site, personnel) est écarté.
2. **Le périmètre** : on écarte les principes hors du périmètre de la PSSI.
3. **Les besoins** : on ne retient que les principes qui portent sur des entités supportant des informations ou des fonctions qui comptent pour l'organisme.
4. **Les menaces** : on écarte les principes qui ne concernent pas les entités visées par les menaces retenues.

Le **comité de pilotage statue** ensuite sur la liste des principes retenus.

> **Conseils (ANSSI)** : l'analyse se fait à grands traits et **garde le principe en cas de doute**. Chaque principe écarté est **justifié** : cette traçabilité permet de maîtriser l'effet d'une évolution des besoins.

### Tâche 2 : élaborer les règles

Chaque principe retenu est décliné en **une ou plusieurs règles** adaptées au contexte :

- la formulation de la règle reflète **les menaces qu'elle couvre** et **les critères** (disponibilité, intégrité, confidentialité) qu'elles peuvent affecter ;
- le **niveau** de la règle découle des **besoins de sécurité** : il doit être en rapport avec le risque encouru (dans l'assistant : niveau essentiel ou renforcé) ;
- le **référentiel** (obligations, systèmes, sécurité existante) assure la cohérence avec les moyens techniques et budgétaires ;
- les règles sont **consolidées par des entretiens avec les responsables de leur mise en œuvre**.

> **Conseils (ANSSI)** : la pertinence d'une règle tient au **rapport entre son impact et son efficacité**. Impliquer la maîtrise d'œuvre et les responsables garantit l'**applicabilité** et l'**adhésion**. Chaque règle s'appuie sur une **argumentation** tirée des éléments stratégiques. Estimez les **coûts de mise en œuvre** pour faire des choix cohérents avec les ressources.

### Tâche 3 : les notes de synthèse

Deux notes, pour deux destinataires :

1. le **groupe d'experts** rédige, pour le **comité de pilotage**, une note qui **justifie les choix** de principes et leur déclinaison en règles (dans l'assistant : la synthèse des règles) ;
2. le **comité de pilotage**, s'il entérine ces choix, propose à la **direction générale** une note qui expose les choix et leurs **impacts organisationnels et financiers** (dans l'assistant : la synthèse des impacts).

> **Conseils (ANSSI)** : la note au comité permet de décider de la mise en œuvre des règles ; la note à la direction présente **très clairement les enjeux et les coûts** ; l'analyse des coûts reste macroscopique.

### Pas à pas dans l'assistant

1. Commencez en **mode essentiel** (28 principes) pour une première PSSI ; passez en mode complet pour une version plus mûre.
2. Pour chaque principe : **retenu**, **écarté** (justification obligatoire, en citant le filtre qui l'écarte) ou **déjà couvert** (dites par quoi).
3. Pour un principe retenu, partez de la **règle proposée**, au niveau **essentiel** ou **renforcé** (conseillé quand un domaine a un besoin de 3 ou 4), puis adaptez-la.
4. Renseignez les **impacts** des règles qui coûtent : coût, effort interne, impact sur l'organisation, échéance.
5. Envoyez les règles retenues au **socle de mesures** : elles seront publiées aux sites.
6. Imprimez les **synthèses** : la synthèse des règles pour le comité, la synthèse des impacts pour la direction.

### Animer un atelier par domaine

Durée proposée : 2 heures, avec les experts d'un ou deux domaines. Pour chaque principe :

- « Le faisons-nous déjà ? Où est la preuve ? » → *déjà couvert*, avec la référence.
- « Est-ce que cela nous concerne : avons-nous l'entité, est-elle dans le périmètre, porte-t-elle quelque chose d'important, est-elle visée par une menace retenue ? » → sinon *écarté*, avec le filtre en justification.
- « La règle proposée est-elle applicable chez nous, sur tous les sites, y compris en atelier ? » → l'adapter.
- « Qui fait quoi, quand, et comment le vérifie-t-on ? » → une bonne règle répond aux quatre.

Une règle qui ne peut pas être appliquée aujourd'hui reste une règle : elle ira au **plan d'action** en phase 3.

### Bien écrire une règle

| À éviter | Mieux |
|---|---|
| « Les accès doivent être sécurisés. » | « Tout accès à distance aux systèmes industriels passe par la passerelle du groupe, avec double authentification, et il est journalisé. » |
| « Les mots de passe sont robustes. » | « Les mots de passe font au moins 12 caractères ; les comptes d'administration utilisent la double authentification. » |
| « Les sauvegardes sont faites régulièrement. » | « Les serveurs de production sont sauvegardés chaque jour ; une copie est hors ligne ; une restauration est testée chaque année. » |

### Pièges à éviter

- **Retenir tout le catalogue** sans l'avoir filtré : la PSSI devient inapplicable.
- **Écarter sans justification** : la traçabilité demandée par l'ANSSI est perdue.
- **Écrire les règles sans ceux qui les appliqueront** : l'ANSSI demande de les consolider par des entretiens avec les responsables de la mise en œuvre.
- **Oublier l'industriel** : vérifiez que chaque règle est applicable en atelier (arrêts de ligne, postes partagés, automates anciens), ou prévoyez une variante.
- **Ne pas chiffrer** : sans la synthèse des impacts, la direction ne peut pas décider.

### Critères pour valider la phase

- [ ] Chaque principe affiché a une décision ; chaque principe écarté est justifié.
- [ ] Chaque règle dit qui fait quoi, quand, et comment on le vérifie (auditabilité).
- [ ] Les règles sont cohérentes entre elles et ont été relues par ceux qui les appliqueront.
- [ ] Les règles coûteuses ont leurs impacts.
- [ ] La synthèse des règles est validée par le comité ; la synthèse des impacts par la direction générale.

---

## Phase 3 — Finalisation

### Ce que demande la méthode (ANSSI)

| Élément | Ce que prévoit la méthode |
|---|---|
| **Objectifs** | Conduire l'étape ultime de validation de la PSSI et du plan d'action associé par la direction générale |
| **Acteurs** | Comité de pilotage, groupe d'experts |
| **En entrée** | Les règles retenues, validées |
| **En sortie** | La PSSI validée ; le plan d'application de la PSSI, avec un plan d'action selon les priorités définies |
| **Tâches** | 1. Finalisation et validation de la PSSI · 2. Élaboration et validation du plan d'action |
| **Validation** | PSSI et plan d'action : **comité de pilotage, puis direction générale** |

Une fois la PSSI revue et validée par le comité, un **document de synthèse** soutient sa présentation à la direction. L'implication des **futurs responsables de la mise en œuvre** est fondamentale pour obtenir ensuite les ressources et fixer les délais.

### Tâche 1 : finaliser et valider la PSSI

Avant la validation finale, une **revue de cohérence** vérifie, selon l'ANSSI :

- la **cohérence** des règles énoncées ;
- l'**exhaustivité de la couverture des risques** jugés significatifs ;
- la **traduction complète** des principes et règles jugés pertinents ;
- l'**applicabilité** des exigences et des règles au regard des pratiques en vigueur.

La revue peut conduire à **normaliser ou simplifier** le texte, notamment dans un document de synthèse pour la direction. Le document final est **validé et signé par la hiérarchie**.

> **Conseil (ANSSI)** : constituez un **comité de sécurité** chargé de valider le contenu de la PSSI et de la faire évoluer dans le temps ; le comité de pilotage peut le devenir.

### Tâche 2 : élaborer et valider le plan d'action

Le plan d'action fait passer de la situation actuelle à la cible. Selon l'ANSSI :

- chaque **responsable d'unité** (site, division, service) et le **RSSI** (pour les actions générales) établissent les actions prioritaires, par rapport à l'existant ;
- la **priorité** va aux **risques jugés les plus significatifs** ;
- chaque action précise : son **objectif** et son **responsable**, la **démarche** (liste des tâches), ses **dépendances**, une estimation du **planning** et du **budget**, les **modalités de validation** ;
- le plan comprend des actions **méthodologiques, organisationnelles ou procédurales**, et des actions **techniques** sur les éléments communs du système d'information ;
- il est **validé par le comité de sécurité** et **tenu à jour** : ses priorités évoluent avec le système d'information, les budgets et l'organisation.

La PSSI est ensuite mise en œuvre dans chaque site au moyen d'un **plan de sécurité** qui décline les règles en mesures adaptées à ses moyens et à son environnement : dans WerbSMSI, c'est le **socle de mesures** publié aux sites.

> **Conseil (ANSSI)** : la planification s'appuie sur la cible (la PSSI) **et** sur la situation actuelle : contraintes d'organisation, obligations, capacité des équipes à avancer. Programmez les actions en tenant compte de leurs enchaînements.

### Diffuser et réviser

L'ANSSI demande de :

- **diffuser largement** la PSSI aux acteurs internes et externes (prestataires, sous-traitants, stagiaires), **sous une forme adaptée** aux destinataires, éventuellement simplifiée ;
- **accompagner la diffusion** d'une communication et d'une **sensibilisation** du personnel ;
- **réexaminer la PSSI** après tout événement majeur affectant la mission ou la vie de l'organisme, **et au moins tous les cinq ans** (guide de 2004).

> **Recommandation WerbSMSI** : alignez la révision sur la **revue de direction annuelle** du SMSI. La norme ISO/IEC 27001 fait revoir le SMSI à intervalles planifiés, et une PSSI revue chaque année suit mieux l'évolution des menaces et des obligations (NIS2) que le minimum de cinq ans de 2004.

### Pas à pas dans l'assistant

1. Donnez au document sa **référence**, sa **version** et sa **classification**.
2. Adaptez les textes de la **partie III** (organisation, dérogations, diffusion, révision, documents d'application). Cette partie complète le plan type de l'ANSSI, qui ne comporte que les parties I et II.
3. Ouvrez l'**aperçu**, puis produisez le **PDF** ou le **Word** au modèle de l'entreprise pour la relecture.
4. Faites la **relecture** avec le comité et cochez les cinq points (les quatre de l'ANSSI, plus la lisibilité pour les destinataires).
5. Indiquez les règles **déjà en place**, puis **créez les actions** des autres (origine « PSSI ») ; dans le plan d'actions, complétez pour chacune le responsable, les tâches, les dépendances, le budget et la manière de vérifier qu'elle est terminée.
6. Enregistrez l'**approbation** de la direction : elle met à jour *Politique et périmètre*.
7. Préparez la **charte utilisateur** (PSSI › Charte utilisateur) et sa diffusion.

### Animer la relecture

Durée proposée : 2 heures avec le comité ; envoyez le document une semaine avant. Passez les quatre points de la revue de l'ANSSI, puis :

- « Une règle vous paraît-elle impossible à appliquer sur votre site ? » → l'adapter, ou prévoir une dérogation ou une action.
- « Manque-t-il une règle face à un risque significatif ? » → revenir en phase 2 pour ce point.
- « Le plan d'action est-il réaliste avec nos moyens ? » → étaler les échéances plutôt que retirer des règles.

### La charte utilisateur

L'ANSSI recommande une diffusion « sous une forme simplifiée et didactique » et des documents dont « le contenu et la forme » sont adaptés aux destinataires. La charte utilisateur est cette forme courte :

- deux pages, à la **première personne** (« je verrouille mon poste »), sans jargon ;
- seulement les règles qui concernent **tous** les collaborateurs ; adaptez les textes proposés à votre vocabulaire ;
- validée par les RH (lien avec le règlement intérieur) et, le cas échéant, présentée aux représentants du personnel ;
- remise à l'arrivée et signée, accompagnée d'une **sensibilisation** (WerbAcademie).

### Pièges à éviter

- **Signer sans la revue de cohérence** : c'est souvent là que la production découvre les règles.
- **Un plan d'action sans responsables ni budget** : la PSSI reste une intention.
- **Diffuser la PSSI complète à tous** : les collaborateurs lisent la charte ; la PSSI complète va aux responsables.
- **Ne pas dater la prochaine revue**.

### Critères pour approuver

- [ ] Les phases 0 à 2 sont validées, sans modification en suspens.
- [ ] La revue de cohérence (quatre points de l'ANSSI, plus la lisibilité) est faite.
- [ ] Chaque règle retenue est en place ou figure au plan d'action, avec un responsable.
- [ ] Le plan d'action est validé par le comité ; la PSSI et le plan sont présentés à la direction générale avec un document de synthèse.
- [ ] La charte utilisateur est prête et sa diffusion prévue ; la prochaine revue est datée.

---

## Après la PSSI : les quatre suites

La méthodologie de l'ANSSI fixe quatre suites à l'élaboration :

1. **Décliner** les règles en procédures applicables aux systèmes et applications (WerbGouvernance › Procédures, socle de mesures).
2. **Piloter** le plan d'action prioritaire par une entité de suivi (le comité de sécurité ; WerbGouvernance › Plan d'actions, revues de direction).
3. **Auditer** l'application de la PSSI par des contrôles réguliers et des tableaux de bord ; les résultats peuvent faire réviser les règles (WerbNIS2, WerbIEC62443, WerbPentest).
4. **Veiller** : une organisation d'alerte et de veille maintient le niveau de sécurité dans le temps (WerbVeille).

---

## Pour aller plus loin

- Guide [Élaborer la politique de sécurité (PSSI)](2-Elaborer_la_PSSI.md) : démarche, catalogue par domaine, plan type, check-list.
- **Guide pour l'élaboration d'une PSSI**, DCSSI (aujourd'hui ANSSI), version du 3 mars 2004 : section 1 « Introduction », section 2 « Méthodologie », section 3 « Principes de sécurité », section 4 « Références SSI », et le mémento.
- **ISO/IEC 27001:2022**, **ISO/IEC 27002:2022**, **NIS2** : voir WerbReferentiels.
