<!-- WerbMap – Développé par @WerbHat -->
# Les mots de passe : coffre-fort, comptes et partage

> **À retenir d'abord** : WerbMap, et plus largement WerbSMSI, **ne stocke aucun mot de passe**, et ne le fera pas. Une base WerbSMSI est un fichier JSON lisible, copié, sauvegardé, envoyé à un auditeur : ce n'est pas un coffre-fort. Les secrets vont dans un **gestionnaire de mots de passe** dédié, chiffré, dont la sécurité est éprouvée. Ce guide explique comment en monter un avec **KeePass**, comment l'organiser **en miroir de WerbMap**, et comment partager un secret sans l'exposer.

---

## 1. Pourquoi un coffre-fort, et pas un tableur

| Habitude | Le problème |
|---|---|
| Classeur Excel « mots de passe » | Lisible par quiconque copie le fichier ; une protection Excel se casse en quelques minutes. |
| Post-it, cahier dans la baie | Lisible par tout visiteur, prestataire, agent d'entretien. |
| Courriel ou messagerie | Le secret reste dans les boîtes d'envoi, de réception, les sauvegardes, les journaux, pendant des années. |
| Le même mot de passe partout | Un seul vol ouvre tous les équipements. |
| Mémoire d'une seule personne | Départ, absence, accident : plus personne ne peut administrer. |

Un **gestionnaire de mots de passe** chiffre tous les secrets dans un seul fichier, protégé par un **mot de passe maître** (et idéalement un **fichier clé**). Il génère des mots de passe longs et uniques, les classe, et garde un historique.

---

## 2. Créer le coffre avec KeePass

**KeePass Password Safe** (version 2.x) est un gestionnaire libre, gratuit, utilisable **hors ligne** ; une de ses versions a obtenu une certification de sécurité de premier niveau (CSPN) de l'ANSSI. **KeePassXC** est une alternative compatible (même format de fichier `.kdbx`), multiplateforme. Faites valider l'outil et sa version par votre RSSI.

### Étape par étape

1. **Télécharger** KeePass depuis son site officiel uniquement (`keepass.info`), et vérifier la signature ou l'empreinte du fichier d'installation. Jamais depuis un site de téléchargement tiers.
2. **Créer la base** : *Fichier › Nouveau*. Nommez-la clairement, par exemple `Coffre_SITE.kdbx`.
3. **Protéger la base** :
   - un **mot de passe maître** long (une phrase de passe de 5 à 6 mots au hasard, ou 16 caractères et plus), connu seulement des personnes habilitées ;
   - un **fichier clé**, conservé **ailleurs** que la base (clé USB dans un coffre, poste d'administration) : il faut les deux pour ouvrir ;
   - dans *Fichier › Paramètres de la base › Sécurité*, augmentez le facteur de dérivation de clé (Argon2) pour ralentir une attaque par essais.
4. **Ranger la base** sur un emplacement **protégé et sauvegardé** (partage restreint aux administrateurs), **pas** dans l'espace WerbSMSI, **pas** sur le réseau industriel en accès libre.
5. **Sauvegarder** la base (elle est chiffrée : sa copie peut aller dans la sauvegarde ordinaire) et **tester** son ouverture depuis la sauvegarde. Gardez une copie hors ligne du mot de passe maître et du fichier clé sous enveloppe scellée, dans un coffre physique, pour la **procédure de bris de glace** (§5).
6. **Régler** : verrouillage automatique après quelques minutes d'inactivité, effacement du presse-papiers après 10 à 20 secondes.

---

## 3. Structurer le coffre en miroir de WerbMap

La même organisation que WerbMap rend chaque secret **facile à retrouver** et l'inventaire **facile à contrôler** (un équipement sans fiche dans le coffre, ou une fiche sans équipement, saute aux yeux).

```
Coffre_SITE.kdbx
├── SI – Supervision ligne 2              ← un dossier par système d'information (Liste des SI)
│   ├── SRV_SCADA01                       ← un sous-dossier par équipement, nommé par son TAG
│   │   ├── [Admin] adm-jdupont           ← une fiche par compte
│   │   ├── [Service] svc-historian
│   │   └── [Local] Administrateur local (bris de glace)
│   ├── API_L2_01
│   │   └── [Équipement] Compte de programmation de l'automate
│   └── VM_HIST01
├── SI – Infrastructure
│   └── SW_CORE01
│       └── [Admin] Compte d'administration du commutateur
├── Hors SI                               ← équipements de l'inventaire rattachés à aucun SI
└── Domaine (Active Directory)            ← comptes du domaine, rangés selon les OU (§6)
```

*🗄️ Inventaires › Mots de passe* propose l'**arborescence de votre site**, calculée depuis la Liste des SI et les inventaires (TAG et type de chaque équipement), à reproduire dans KeePass. Elle ne contient aucun secret.

### Le contenu d'une fiche

| Champ KeePass | À renseigner |
|---|---|
| **Titre** | `[Type] identifiant`, par exemple `[Service] svc-sauvegarde` |
| **Nom d'utilisateur** | L'identifiant exact du compte |
| **Mot de passe** | Généré par KeePass (20 caractères et plus quand l'équipement l'accepte) ; jamais réutilisé |
| **URL** | L'adresse d'administration (`https://10.x.x.x`, `ssh://…`) |
| **Notes** | Rôle du compte, propriétaire (personne ou équipe), procédure particulière, date de dernière revue |
| **Expiration** | Date de renouvellement prévue |
| **Champs personnalisés** (onglet *Avancé*) | `TAG` (l'équipement WerbMap), `Type de compte`, `Propriétaire` |

Un équipement qui appartient à plusieurs SI se range dans **le SI principal** ; les autres SI le citent dans les notes. Pas de doublon de fiche : un secret, une seule place.

---

## 4. Qu'est-ce qu'un bon mot de passe ?

### Un mot de passe différent pour chaque compte

C'est **la règle qui compte le plus**. Quand un même mot de passe sert à plusieurs comptes, le vol d'un seul (une fuite chez un site tiers, un poste compromis, un prestataire négligent) ouvre **tous les autres**. Les attaquants essaient systématiquement, sur d'autres services, les mots de passe récupérés dans les fuites.

Le coffre-fort change la donne : **il retient à votre place**. Il n'y a plus de raison de réutiliser un mot de passe « parce qu'il est facile à retenir » : faites l'effort de **diversifier**, et laissez KeePass générer un mot de passe neuf pour chaque compte et chaque équipement. Seul le **mot de passe maître** du coffre, et ceux que l'on tape sans coffre (session Windows), restent à mémoriser.

### Les autres règles

| Règle | Pourquoi |
|---|---|
| **La longueur avant la complexité** : au moins 12 caractères, idéalement une **phrase de passe** de 15 caractères et plus (plusieurs mots sans lien, par exemple `violon-marée-cactus-boussole`) | Chaque caractère ajouté multiplie le temps d'une attaque par essais ; une phrase se retient mieux qu'un mot court truffé de symboles. |
| **Imprévisible** : ni prénom, ni date, ni nom de l'entreprise ou du site, ni mot du dictionnaire seul, ni suite de clavier (`azerty`, `123456`) | Ce sont les premiers essais des outils d'attaque. |
| **Généré par le coffre** pour tout ce qui n'a pas à être tapé de mémoire | Un générateur ne se répète pas et ne suit aucune habitude. |
| **Jamais le mot de passe d'usine** d'un équipement | Les mots de passe par défaut des fabricants sont publiés. |
| **Double authentification** dès que le service ou l'équipement la propose (accès distant, messagerie, comptes d'administration) | Un mot de passe volé ne suffit plus. |
| **Secret** : jamais écrit en clair, jamais prêté, jamais saisi sur une page ouverte depuis un lien reçu | Voir §8. |

### Le changer régulièrement ? Oui, mais pas trop souvent

Pendant longtemps, la règle était de changer son mot de passe tous les 30, 60 ou 90 jours. L'expérience a montré l'effet inverse de celui recherché : obligé de changer trop souvent, l'utilisateur **dérive** vers des mots de passe prévisibles (`Printemps2026!` puis `Ete2026!`, un chiffre ajouté à la fin), les **note** sur un papier ou les **réutilise** ailleurs. Le **NIST** américain (guide SP 800-63B sur l'authentification) a pris acte de ces dérives : il recommande de **ne plus imposer de changement périodique arbitraire**, mais d'**imposer le changement dès qu'une compromission est soupçonnée**, et de refuser les mots de passe connus pour figurer dans des fuites.

En pratique :

- **Changer immédiatement** : au moindre soupçon (clic sur un lien piégé, poste infecté, mot de passe vu ou entendu), quand le compte apparaît dans une fuite publiée, après l'avoir transmis à un prestataire, au départ d'une personne qui connaissait un mot de passe partagé ou de service, et le mot de passe d'usine à la mise en service.
- **Changer périodiquement, à un rythme raisonnable** : les comptes à privilège et les comptes partagés, par exemple **une fois par an**, lors de la revue des comptes (§7).
- **Ne pas imposer** de changement tous les trois mois aux utilisateurs : mieux vaut un mot de passe long, unique et stable, protégé par la double authentification.

---

## 5. Les types de comptes

| Type | Ce que c'est | Bonnes pratiques |
|---|---|---|
| **Compte utilisateur nominatif** | Le compte d'une personne, pour son travail quotidien (messagerie, bureautique, conduite). | Un compte par personne, jamais prêté. Droits limités au besoin. Désactivé à son départ. |
| **Compte administrateur nominatif** | Le compte **séparé** qu'une personne utilise **seulement** pour administrer (`adm-jdupont`). | Jamais pour lire ses courriels ni naviguer. Double authentification si possible. **Énuméré dans WerbExploitation** (§7). |
| **Compte de service** | Utilisé par une application ou un service, pas par une personne : la supervision qui lit une base de données, le logiciel de sauvegarde qui accède aux serveurs (`svc-…`). | Non interactif (connexion ouverte interdite), droits minimaux, mot de passe très long, changé à chaque départ d'un administrateur qui le connaissait. Documenter **qui en dépend** : changer son mot de passe peut arrêter un service. |
| **Compte local d'équipement** | Le compte propre à un équipement hors domaine : switch, pare-feu, automate, IHM, onduleur, caméra. | Mot de passe **unique par équipement** ; **mot de passe d'usine changé** à la mise en service ; une fiche par compte dans le dossier du TAG. |
| **Compte générique ou partagé** | Un compte utilisé par plusieurs personnes (`operateur`, `maintenance`, `admin`). | **À éviter au maximum** : on ne sait pas qui a fait quoi. S'il est inévitable (IHM d'atelier, équipement qui ne gère qu'un compte), le justifier, limiter ses droits, changer le mot de passe à chaque départ, et l'**énumérer dans WerbExploitation** (§7). |
| **Compte par défaut** | Le compte livré par le constructeur (`admin / admin`). | Désactivé, ou renommé et doté d'un mot de passe fort, dès la mise en service. |
| **Compte de bris de glace** | Compte de secours, utilisé seulement quand tout le reste est indisponible (annuaire en panne, administrateurs absents). | Mot de passe sous enveloppe scellée dans un coffre physique ; toute utilisation est tracée, justifiée, puis le mot de passe est changé. |
| **Compte de prestataire** | Accès d'un intervenant extérieur (maintenance, télémaintenance). | Nominatif, limité dans le temps, désactivé hors intervention, passant par un accès contrôlé (bastion). |

---

## 6. Si le site utilise Active Directory

**Active Directory (AD)** est l'**annuaire** de Microsoft : il centralise, pour tout un **domaine** Windows, les comptes des personnes, les comptes de service, les ordinateurs, les groupes et leurs droits. Un utilisateur se connecte avec le même compte sur tous les postes du domaine ; les règles (verrouillage d'écran, mots de passe, logiciels autorisés) s'appliquent par **stratégies de groupe (GPO)**.

L'AD se range en **unités d'organisation (OU)**, des dossiers qui regroupent les objets par site, par service ou par usage (`Domaine › LYON › Serveurs`, `Domaine › LYON › Comptes de service`, `Domaine › Administration › Comptes à privilège`).

Quand un AD est utilisé :

- **inventoriez au maximum en suivant la structure des OU** : dans le coffre, le dossier *Domaine (Active Directory)* reproduit l'arborescence des OU, et chaque compte du domaine (administrateur, service) y a sa fiche, rangée dans son OU ;
- les **équipements hors domaine** (switchs, pare-feu, automates, IHM) restent rangés par **SI et TAG** ;
- les **mots de passe des comptes utilisateurs** du domaine ne vont **pas** dans le coffre : chacun connaît le sien, l'AD le gère ;
- pour l'**administrateur local** de chaque poste et serveur Windows, utilisez **Windows LAPS** : un mot de passe différent par machine, changé automatiquement et stocké dans l'AD avec un accès restreint ; il n'y a plus de mot de passe d'administrateur local commun à toutes les machines ;
- les comptes à privilège du domaine (*Admins du domaine* et équivalents) sont **peu nombreux**, nominatifs, et énumérés dans WerbExploitation.

> Un AD compromis, c'est **tout le système** qui est compromis (guide [Les étages de la cybersécurité](2-Les_etages_de_la_cybersecurite.md), « l'annuaire : le registre des clés »). Ses comptes d'administration méritent la plus grande attention.

---

## 7. Ce qui va dans WerbExploitation, et ce qui n'y va jamais

WerbExploitation tient le **registre** des comptes sensibles (*👤 Comptes & accès*), **sans aucun mot de passe** :

- **Comptes à privilège** : chaque compte d'administration (identifiant, système concerné, titulaire, privilège, date de revue). À revoir au moins une fois par an.
- **Comptes génériques** : chaque compte partagé ou technique, avec sa raison d'être, son privilège et sa revue.

Le registre dit **qui peut quoi** et permet la **revue des accès** ; le coffre garde **le secret**. Les deux se recoupent par l'identifiant du compte et le TAG de l'équipement.

**Jamais** de mot de passe, d'indice de mot de passe ni de fichier clé dans WerbMap, WerbExploitation, un autre module, un ticket, un rapport ou un export Excel.

---

## 8. Échanger un secret : la politique

### Interdit

- Envoyer un **identifiant et son mot de passe en clair** par courriel, messagerie instantanée, SMS, ticket ou document partagé.
- Envoyer **identifiant et mot de passe par le même canal**, même chiffré.
- Dicter un mot de passe dans un lieu ouvert, le laisser sur un tableau blanc, une capture d'écran, un Post-it.
- Réutiliser le mot de passe transmis à un prestataire après la fin de son intervention.

### Recommandé

1. **Éviter de partager** : donner au prestataire son **propre compte**, temporaire, plutôt que le mot de passe d'un compte existant.
2. Si un secret doit être transmis, utiliser un **service de partage éphémère de confiance**, par exemple **Password Pusher** (*pwpush*) : le secret est déposé, un **lien** est envoyé ; le lien **expire** après un nombre de consultations (une seule, idéalement) ou quelques jours, puis le secret est **détruit**. Préférez une **instance hébergée par votre organisation** ou validée par votre RSSI à un service public.
3. **Séparer les canaux** : le lien par courriel, l'identifiant par téléphone (ou l'inverse).
4. **Vérifier l'identité** du destinataire avant l'envoi (rappel sur un numéro connu, pas celui donné dans le message).
5. **Changer le mot de passe** après l'intervention, ou dès qu'un doute existe sur sa diffusion.
6. Pour les **données sensibles** (plans d'adressage, matrices de flux, exports WerbSMSI, sauvegardes de configuration) : partage restreint et chiffré, jamais en pièce jointe à un destinataire extérieur sans accord, classification indiquée.

---

## 9. Surveillance et exigences envers vos prestataires

### Le constat

Vos prestataires (intégrateurs, mainteneurs, éditeurs, installateurs de vidéosurveillance, télémaintenance des constructeurs) **utilisent vos systèmes**, et bien souvent **les ont configurés**. Ils connaissent les comptes d'administration, ont créé les comptes de service, et gardent parfois des accès à distance. Exiger une bonne hygiène de vos collaborateurs **sans l'exiger de vos prestataires** laisse une vulnérabilité majeure : la porte que vous avez fermée reste ouverte de leur côté.

Les dérives les plus fréquentes :

- le **même mot de passe** d'administration chez **tous les clients** du prestataire, parfois le nom de la société suivi de l'année ;
- le **mot de passe d'usine** laissé en place « pour la maintenance » ;
- un **compte générique** (`integrateur`, `maint`) partagé par toute l'équipe du prestataire, jamais désactivé ;
- des identifiants conservés dans un **tableur** ou envoyés **par courriel** au technicien suivant ;
- un **accès à distance permanent** (logiciel de prise de main, routeur 4G posé dans l'armoire) dont personne ne se souvient ;
- un intervenant qui a **quitté le prestataire** et dont le compte reste actif chez vous.

### Exiger : le cahier des charges et le contrat

Ces exigences s'écrivent **avant** de signer : dans le cahier des charges d'un projet, dans le contrat de maintenance, ou dans un **plan d'assurance sécurité** (PAS) annexé au contrat. Elles se répercutent aux **sous-traitants** du prestataire.

| Exigence | Ce qu'on demande |
|---|---|
| **Aucun mot de passe par défaut ni commun** | Mots de passe générés, uniques par équipement et par client ; aucun mot de passe d'usine à la livraison. |
| **Remise sécurisée des identifiants** | À la livraison, liste des comptes créés et remise des secrets par un canal sûr (§8), pour les ranger dans **votre** coffre ; vous changez les mots de passe d'administration après la réception. |
| **Pas de copie conservée sans besoin** | Le prestataire ne garde pas les mots de passe ; s'il en a besoin pour la maintenance, il les conserve dans un coffre chiffré, accessible aux seuls intervenants désignés. |
| **Comptes nominatifs** | Un compte par intervenant, jamais de compte d'équipe partagé ; double authentification sur tout accès distant. |
| **Accès distant maîtrisé** | Uniquement par le moyen fourni ou validé par vous (bastion, VPN avec double authentification), ouvert à la demande, fermé hors intervention, journalisé ; aucun modem ni logiciel de prise de main installé sans accord écrit. |
| **Moindre privilège** | Droits limités aux équipements et aux opérations du contrat. |
| **Mouvements de personnel** | Information sans délai du départ d'un intervenant, pour désactiver son compte. |
| **Incident** | Signalement sans délai (par exemple sous 24 heures) de toute compromission chez le prestataire qui peut toucher vos systèmes : poste volé, fuite, intrusion. |
| **Fin de contrat** | Restitution ou destruction des secrets, désactivation des comptes, attestation écrite. |
| **Contrôle** | Droit d'audit ou de vérification de ces exigences ; participation aux revues des comptes. |

Ces exigences répondent à NIS2 (article 21 : sécurité de la chaîne d'approvisionnement), à l'ISO 27001 (A.5.19 à A.5.22 : relations avec les fournisseurs) et à la norme **IEC 62443-2-4**, consacrée aux exigences de sécurité envers les prestataires d'intégration et de maintenance des systèmes industriels. Les prestataires sous contrat cadre du groupe sont recensés dans WerbGouvernance.

### Surveiller : faire vivre ces exigences

- **À la réception** d'un projet ou d'une intervention : vérifier qu'aucun mot de passe d'usine ou commun ne reste, que chaque compte créé est inventorié (coffre et WerbExploitation) et que les accès distants sont fermés ; la recette (WerbRecette) en garde la trace.
- **Revue des comptes**, au moins une fois par an : chaque compte de prestataire a-t-il encore un titulaire et un contrat ? (WerbExploitation, *Comptes à privilège* et *Comptes génériques*).
- **Journaux des accès distants** : qui s'est connecté, quand, depuis où ; une connexion hors intervention prévue est un incident.
- **Tests d'intrusion** (WerbPentest) : inclure les accès des prestataires et rechercher les mots de passe par défaut ou communs.
- **Sensibilisation** : les prestataires réguliers suivent les mêmes formations que vos équipes (WerbAcademie, population « Prestataires »).
- **Renouvellement du contrat** : c'est le moment de relire les exigences et de constater les écarts.

> **Le prestataire est souvent le maillon le moins visible**. Une intrusion par le compte de télémaintenance d'un fournisseur est l'un des scénarios d'attaque les plus courants dans l'industrie : le pare-feu le laisse passer, puisque le flux est autorisé (guide [Les étages de la cybersécurité](2-Les_etages_de_la_cybersecurite.md)).

---

## 10. Check-list

- [ ] Un coffre KeePass par site (ou par périmètre d'administration), protégé par mot de passe maître **et** fichier clé.
- [ ] Coffre rangé sur un emplacement protégé, sauvegardé, ouverture testée depuis la sauvegarde.
- [ ] Arborescence **SI › TAG › fiches** reprise de WerbMap ; dossier *Domaine* selon les OU si un AD existe.
- [ ] Plus aucun mot de passe d'usine sur les équipements de l'inventaire.
- [ ] Comptes administrateurs **séparés** des comptes du quotidien, et énumérés dans WerbExploitation.
- [ ] Comptes génériques réduits au strict nécessaire, justifiés, énumérés dans WerbExploitation.
- [ ] Windows LAPS pour les administrateurs locaux si un AD existe.
- [ ] Procédure de bris de glace écrite, enveloppe scellée au coffre.
- [ ] Partage des secrets par lien éphémère et canaux séparés ; jamais en clair par courriel.
- [ ] Un mot de passe **différent** pour chaque compte et chaque équipement, généré par le coffre.
- [ ] Changement immédiat sur soupçon de compromission ; pas de changement périodique imposé trop souvent aux utilisateurs.
- [ ] Revue des comptes et renouvellement des mots de passe à privilège et partagés au moins une fois par an, et à chaque départ.
- [ ] Exigences de gestion des mots de passe et des accès écrites dans les contrats et cahiers des charges des prestataires (PAS).
- [ ] À chaque réception : aucun mot de passe d'usine ou commun, comptes du prestataire inventoriés, accès distants fermés.
