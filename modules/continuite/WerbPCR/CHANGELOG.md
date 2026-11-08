# Changelog — WerbPCR

Toutes les évolutions notables de WerbPCR sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [1.7.0] — 2026-11

### Ajouts
- **Guide « Approfondir la continuité et la reprise »** (`guides/3-Approfondir_continuite_et_reprise.md`) : indicateurs de temps et leurs relations (durée maximale tolérable d'interruption, RTO, temps de remise en service métier, RPO, niveau minimal de continuité ; règle RTO + remise en service ≤ durée maximale tolérable ; MTBF, MTTR, disponibilité et arrêt admis par an) ; conduite du bilan d'impact (étapes, impact dans le temps, pièges) ; du RPO à la stratégie de sauvegarde (complète, incrémentale, différentielle, instantané, réplication ; règle 3-2-1 et copie hors ligne ; conservation ; ce qu'il faut sauvegarder dans un site industriel) ; du RTO à la stratégie de reprise (redondance, secours chaud, tiède, froid, pièces de rechange ; équilibre coût de la stratégie et coût de l'arrêt ; reprise après une cyberattaque) ; points uniques de défaillance ; six types de tests et leur conduite ; crise, communication et notifications ; indicateurs ; références (ISO 22301, ISO 22313, ISO/IEC 27031, ISO/IEC 27001:2022, NIS2, NIST SP 800-34) ; correspondance avec les écrans de WerbPCR.
- Renvois depuis les guides « Continuité et reprise en clair » et « Établir le Plan PRI ».

## [1.6.0] — 2026-11

### Ajouts
- **Guide de débutant « Continuité et reprise en clair »** (`guides/0-Continuite_et_reprise_en_clair.md`) : PCA, PCI, PRI et gestion de crise, chronologie d'un incident, RTO, RPO et mode dégradé avec des exemples industriels, bilan d'impact, ce qui se prépare avant, erreurs fréquentes, les deux plans dans WerbPCR.
- Cartes des guides sur l'accueil : lisibles avant d'ouvrir une base.
- **Fiches par SI, rubrique « c — Valeurs métier »** (PCR-14), avant les événements redoutés : valeurs métier de l'analyse EBIOS du site à cocher (identifiant, nom, description, nature, biens supports du SI qui la portent, nombre d'événements redoutés). Une valeur métier est **proposée** (🔗) quand un bien support EBIOS contient un actif du SI et la porte ; les proposées sont cochées à la création de la fiche, **⇩ Cocher les proposées** ensuite. Valeurs métier **saisies** en dessous (sans analyse EBIOS, ou absentes de l'analyse). Une valeur métier cochée qui n'est plus publiée reste affichée, signalée.
- **Rubrique d — Événements redoutés** : quand des valeurs métier sont cochées, elle montre d'abord leurs événements redoutés, ceux déjà cochés et ceux proposés ; **▸ Afficher les autres** déplie le reste.
- Intégration WerbSMSI : `site:valeursMetier` et `site:biensSupports` (WerbEBIOS 1.9.0) reçus et copiés dans la base (`recus.valeursMetier`, `recus.biensSupports`). Avec une analyse EBIOS plus ancienne, les valeurs métier sont celles des événements redoutés reçus (pas de proposition).

### Changements
- Rubriques **renumérotées a à g** : c valeurs métier, d événements redoutés, e risques, f mesures de prévention, g mesures de continuité — fiche, compteur « x/7 rubriques », fil conducteur proposé (rubrique a recentrée sur la description, rubrique c ajoutée), document Word (tableau des valeurs métier de la fiche), Excel (« c. Valeur métier »), aide, renvois du PRI (« rubrique g »), guides. Un plan qui garde le texte proposé d'une version précédente (1.1.0, 1.4.0 ou 1.5.0) reçoit le nouveau à l'ouverture.
- `site:valeursMetier` et `site:biensSupports` ajoutés aux objets lus (`module.json`).
- Plan d'exemple : valeurs métier de la supervision cochées (VM-01, VM-03, portées par le bien support du serveur SCADA).

### Format de données
- Additif : `fiches.<SI>.vms` (identifiants des valeurs métier cochées) et `fiches.<SI>.vmLibres` (valeurs métier saisies : nom, description). Les fiches existantes s'ouvrent avec des listes vides.

### Développement
- Test `tests/test_guides.py`.

## [1.5.0] — 2026-11

### Changements
- **PCI, rubrique f** (PCR-15) : « Mesures de reprise (remédiation) » devient **« Mesures de continuité (réponse immédiate et mode dégradé) »**, conformément à la pratique (ISO 22301, ISO/IEC 27031) : le PCI dit comment **tenir pendant l'incident** (alerte et décision, confinement, bascule sur un secours, mode dégradé, contournement manuel, déclenchement du PRI), le PRI comment **revenir au fonctionnement normal** (restauration, redémarrage, vérifications). Colonnes : ordre, **type de mesure** (nouveau), mesure de continuité, délai de mise en œuvre, responsable, référence de suivi.
- La rubrique f n'affiche plus les sauvegardes du SI : elle **renvoie au Plan PRI** en lecture seule (RTO, RPO, mode dégradé du bilan d'impact, rang et vague dans l'ordre de reprise, procédure, état du contrôle des sauvegardes), avec les liens vers le bilan d'impact et la procédure. Même renvoi dans le document Word.
- **Fil conducteur proposé** (volet 2) : rubrique f et structure prévention / continuité / reprise réécrites. Un plan qui garde le texte proposé d'une version précédente reçoit le nouveau à l'ouverture ; un texte adapté n'est pas modifié.
- Définitions du PCI et du PRI (tableau de bord, aide, document Word), procédure du PRI (rappel « Mesures de continuité de la fiche PCI »), bilan d'impact (mode dégradé : résumé, détail dans la rubrique f), Excel (« f. Continuité »).
- **Guides** : « Établir le Plan PCI » — section *PCI ou PRI : qui fait quoi* (tableau, exemples OT, du PCI au PRI) et rubrique f réécrite ; « Établir le Plan PRI » — point de départ du PRI (ce que le PCI a déjà fait), mode dégradé résumé, rappels.
- Plan d'exemple : rubrique f en mesures de continuité (alerte, confinement, conduite locale, déclenchement du PRI).

### Format de données
- Additif : champ `type` dans les lignes de `fiches.<SI>.remediation` (vide pour les lignes existantes). Le nom du champ `remediation` est gardé : aucune migration.

## [1.4.0] — 2026-10

### Ajouts
- **Objectif R#1 « Responsabilités et sensibilisation »** (ACA-10) : carte *Formation et sensibilisation du site* avec les indicateurs publiés par WerbAcademie (`groupe:formations`) — ligne du site, par population, groupe pour comparaison ; personnes, formations exigées, à jour, à renouveler, en retard, jamais, taux ; catalogue — sans aucun nom. Phrase de synthèse sous l'objectif R#1 dans le document Word.
- Intégration WerbSMSI : `groupe:formations` reçu et copié dans la base (`recus.formations` : site, populations, groupe, catalogue).

### Changements
- `groupe:formations` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_formation.py`.

## [1.3.0] — 2026-10

### Ajouts
- **PRI › 2. Dépendances** : les prestataires publiés par WerbPresta (`site:evaluationsPrestataires`, PRE-8) qui interviennent sur le SI (SI dans leur périmètre ou actif couvert) sont proposés ; **➕ Dépendance externe** les ajoute (type déduit : prestataire de maintenance, éditeur ou fournisseur, hébergeur ; commentaire sans numéro d'astreinte) ; un prestataire déjà en dépendance est signalé.
- Intégration WerbSMSI : `site:evaluationsPrestataires` reçu et copié dans la base (`recus.prestataires`).

### Changements
- `site:evaluationsPrestataires` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_pri_prestataires.py`.

## [1.2.0] — 2026-10

### Ajouts
- **Plan PRI — plan de reprise informatique** (PCR-7), menu **🔁 Plan PRI** :
  - **1. Bilan d'impact (BIA)** : par SI, **RTO** (DMIA) et **RPO** (PDMA) saisis en durées (« 4 h », « 2 j », « 30 min », « 1 sem », « 1 mois » ; nombre seul = heures ; illisible refusée), impact d'un arrêt, mode dégradé ; repères : besoins D / I / C, gravité la plus forte des ER de la fiche PCI.
  - **2. Dépendances** : SI du site dont il dépend ; dépendances externes (énergie, opérateur, prestataire, éditeur, hébergeur, autre site, personnel clé) sans secret.
  - **3. Ordre de reprise** calculé : vagues de dépendances, RTO le plus court d'abord ; **rétabli au plus tôt** (procédure + plus longue chaîne de dépendances) comparé au RTO ; boucle de dépendances et SI dépendant d'un SI au RTO plus long signalés.
  - **4. Procédures de reprise** : déclenchement, étapes ordonnées (action, responsable avec les rôles du groupe, durée, vérification), durée totale, retour à la normale ; rappel des mesures de reprise de la fiche PCI et des sauvegardes du SI.
  - **5. Contrôle des sauvegardes** : RPO confronté à la sauvegarde la plus fréquente du SI (registre WerbExploitation) et au dernier test de restauration (moins d'un an) : conforme, à vérifier, non couvert.
- Tableau de bord : SI avec RTO et RPO, procédures rédigées, RPO non couverts, points d'attention du PRI ; PRI d'un SI retiré de WerbMap signalé et supprimable.
- **Document Word, partie 2 « Plan PRI »** (chapitres PRI 1 à 5) ; **export Excel** : feuilles *PRI - Ordre de reprise*, *PRI - Procédures*, *PRI - Dépendances externes*, *PRI - Sauvegardes*.
- Guide **« Établir le Plan PRI (plan de reprise informatique) »** ; plan d'exemple : PRI de la supervision de la ligne 2.

### Changements
- Définitions PCI / PRI, aide et guide du Plan PCI : le PRI n'est plus « à venir ».

### Format de données
- Champ `pri.sis` (PRI par SI ; RTO et RPO en heures). Schéma inchangé (1) : un plan 1.1.x s'ouvre avec un PRI vide.

### Développement
- Test `tests/test_pri.py`.

## [1.1.1] — 2026-10

### Changements
- **PCI et PRI distingués** pour la gouvernance : le menu « Plan » devient **« Plan PCI »** (plan de continuité informatique, volets 1 à 5) ; chaque volet l'indique (« Plan PCI, volet n ») ; définitions du **PCI** et du **PRI** (plan de reprise informatique, à venir) dans le tableau de bord et l'aide.
- **Document Word** : page de garde « Partie 1 — Plan de continuité informatique (PCI) », tableau de définitions PCI / PRI, chapitres numérotés **PCI 1 à PCI 5** ; le PRI viendra en partie 2.
- **Guide** « Établir le Plan PCI (plan de continuité informatique) » : définitions et usage des deux termes en tête, volets présentés comme « Plan PCI, volet n » ; la rubrique f (remédiation) renvoie au PRI pour les procédures détaillées de redémarrage.
- **Fil conducteur** proposé : « Le plan de continuité informatique (PCI) examine… », et renvoi au PRI pour la reprise détaillée. Un plan qui gardait le texte proposé de la 1.1.0 passe au nouveau texte à l'ouverture ; un texte adapté n'est pas modifié.
- Description du module (manifeste) : PCI, puis PRI.

## [1.1.0] — 2026-10

### Ajouts
- **Volet 4 « Fiches par SI »** (PCR-4) : une fiche par système d'information, créée depuis le volet 3 ou la liste des fiches, avec les rubriques du fil conducteur — a description (données WerbMap + saisie), b responsables (rôles publiés par le groupe proposés), c événements redoutés à cocher (ceux qu'un risque EBIOS relie à un actif du SI sont proposés et cochés à la création, **⇩** coche les nouveaux), d risques identifiés (type, description) et risques EBIOS visant le SI, e mitigation (mesure, état, référence de suivi), f remédiation (ordre, action, délai, responsable, référence de suivi) et sauvegardes du SI ; fiche d'un SI retiré de WerbMap gardée, signalée (tableau de bord), supprimable.
- **Volet 5 « Plan d'actions »** (PCR-5) : objectifs proposés R#1 à R#10 et leurs rubriques (titre, ID plan d'action, description, lien de l'élément de suivi dans WerbSMSI) ; objectifs et rubriques modifiables, ajoutables, supprimables, réordonnables ; **↺** rétablit les objectifs proposés manquants. Le lien de suivi est un texte libre (forme définitive à venir).
- **Document Word** (PCR-6) : page de garde, cinq volets, une section par fiche SI et par objectif, fil conducteur mis en forme ; modèle Word de l'entreprise (modèle commun de l'espace ou fichier, charte §7.2).
- Réception de `site:syntheseRisques`, `site:sauvegardes` et `groupe:roles` ; export Excel complété (fiches SI, plan d'actions) ; tableau de bord (fiches rédigées, objectifs développés).

### Format de données
- Champs `fiches`, `objectifs`, `modeles.word` et données reçues `risques`, `sauvegardes`, `roles` ; schéma inchangé (1). Un plan 1.0.0 s'ouvre sans perte (objectifs proposés ajoutés).

### Développement
- Test `tests/test_fiches.py` ; plan d'exemple complété (fiche du SI de supervision).

## [1.0.0] — 2026-10

### Ajouts
- Première version du **plan de cybersécurité et de reprise** d'un site (rubrique Continuité & résilience, niveau site).
- **Volet 1 « Périmètre métier »** : par valeur métier, événements redoutés de l'analyse EBIOS du site (`site:evenementsRedoutes`, WerbEBIOS 1.7.0) avec critères de sécurité, besoin de sécurité, impacts et gravité, en lecture seule ; description saisie par événement, gardée à chaque réception ; descriptions orphelines signalées.
- **Volet 2 « Approche systémique »** : fil conducteur proposé (a. description, b. responsables, c. événements redoutés, d. risques, e. mitigation, f. remédiation), modifiable pour le site, rétablissable.
- **Volet 3 « Systèmes d'information »** : SI publiés par WerbMap (`site:si`) avec besoins D / I / C, VLAN et actifs.
- **Intégration WerbSMSI** : rattachement au site, réception à l'ouverture de l'espace et sur ⟳ Actualiser, copie dans la base (`recus`), échelles du groupe (`groupe:echelles` : gravité, besoins) ; ouverture depuis le portail.
- Tableau de bord, identification du plan, journal, bandeau commun (export Excel de toute la base, PDF), thème clair / sombre, verrou commun des bases, guide « Établir le plan ».
- Plan d'exemple fictif du site LYON (`outils/exemples.py`), rangé aussi dans l'espace de démonstration de la charte.

### Format de données
- `WERBPCR`, schéma 1.

---

WerbPCR — Développé par @WerbHat
