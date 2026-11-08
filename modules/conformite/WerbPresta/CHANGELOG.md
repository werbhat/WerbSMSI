# Changelog — WerbPresta

Toutes les évolutions notables de WerbPresta sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [1.6.1] — 2026-11

### Changements
- Guide du prestataire renommé **« Répondre aux exigences de cybersécurité du client »** (`guides/3-Repondre_aux_exigences.md`) ; page de garde Word : « Guide du prestataire — Répondre aux exigences de cybersécurité » ; vocabulaire de mise en œuvre et de plan d'actions (« Une mise en œuvre en quatre paliers », « Établir votre plan d'actions »). Les niveaux de maturité restent nommés ainsi : c'est le terme de l'IEC 62443-2-4.

## [1.6.0] — 2026-11

### Ajouts
- **📘 Guide du prestataire (Word)**, carte *Cahier d'exigences cyber* de la fiche, à côté du questionnaire : le guide « Accompagner le prestataire dans sa montée en maturité » converti en document Word à remettre au prestataire — page de garde à son nom (site, niveau d'exigence, nombre d'exigences de son cahier, organisation), exigences de son cahier surlignées et signalées « demandée dans votre cahier », passages destinés à l'équipe du site retirés ; habillé du modèle de l'entreprise si l'option est cochée ; export tracé au journal.

## [1.5.0] — 2026-11

### Ajouts
- **Guide « Accompagner le prestataire dans sa montée en maturité »** (`guides/3-Accompagner_le_prestataire.md`, ❓ Aide), à remettre au prestataire avec le questionnaire : pourquoi le client pose ces questions (chaîne d'approvisionnement, NIS2) ; comment répondre (oui, partiel, non, sans objet, preuves, barème) ; niveaux de maturité de l'IEC 62443-2-4 (initial, maîtrisé, défini, en amélioration) ; progression proposée en quatre paliers couvrant les 37 exigences du modèle (26 essentielles en paliers 1 à 3, 11 renforcées en palier 4) ; pour chaque exigence, comment y arriver et la preuve à fournir ; modèle de plan de progrès et priorités ; ressources (ANSSI, Cybermalveillance.gouv.fr, CNIL, IEC 62443-2-4, ISO/IEC 27001).

## [1.4.0] — 2026-10

### Ajouts
- **Niveau groupe** (PRE-9) : une base rattachée au 🏢 groupe (`groupe/conformite/`) reçoit les `site:evaluationsPrestataires` de tous les sites et les **consolide** par prestataire (sites, types, criticité la plus forte, accès à distance permanent, score par site, écarts ouverts et en retard, prochaine revue) ; tableau de bord du groupe (prestataires distincts, sites qui publient, accès permanents, score moyen, écarts en retard, prestataires multi-sites).
- **Modèle de questionnaire commun** : la base du groupe publie `groupe:modeleQuestionnaire` (version et domaines) ; une base de site le reçoit, signale une différence et propose **⇩ Reprendre le modèle du groupe** (ajustements des cahiers gardés quand le code existe encore).

### Changements
- `module.json` : portées `groupe` et `site` ; `groupe:modeleQuestionnaire` publié ; `site:evaluationsPrestataires` et `groupe:modeleQuestionnaire` lus. Objet ajouté à la charte §5.4, au schéma de publication de groupe et à `werb_charte.py`.

### Développement
- Test `tests/test_groupe.py`.

## [1.3.0] — 2026-10

### Ajouts
- **Publication** `site:evaluationsPrestataires` (*Intégration WerbSMSI › 📤 Publier*, PRE-7) : prestataires actifs ou en consultation — nom, type, criticité, périmètre (SI, zones, actifs couverts), accès à distance (mode, moyen), privilèges, supports amovibles, certifications, niveau d'exigence, date et score de l'évaluation (global et par domaine ; à défaut la dernière archivée), écarts ouverts et en retard, prochaine revue. Ni interlocuteur, ni comptes, ni commentaires, ni réponses détaillées. Base enregistrée exigée avant de publier ; une republication remplace les éléments.
- Lecteurs : WerbEBIOS (parties prenantes de l'atelier 3 : maturité et confiance proposées), WerbMap (fiche SI : prestataires qui interviennent), WerbPCR (dépendances externes du PRI).

### Changements
- `module.json` : `echanges.publie` = `site:evaluationsPrestataires` (objet ajouté à la charte §5.4 et au schéma de publication de site).

### Développement
- Test `tests/test_publication.py` (option `--ecrire-demo` : recopie la publication dans l'espace de démonstration).

## [1.2.0] — 2026-10

### Ajouts
- **Évaluation** d'un prestataire (fiche, PRE-5) : réponses saisies par le client à partir du questionnaire retourné (oui / partiel / non / sans objet, commentaire et preuve ; date posée à la première réponse), **score** par domaine et global (oui 1, partiel ½, non 0, sans objet exclu), **écarts** (partiel ou non : action demandée, échéance, statut ouvert / clos, en retard signalé), **rapport d'évaluation Word** (synthèse, score par domaine, écarts, réponses détaillées ; modèle d'entreprise), **archivage** dans un historique (date, score, scores par domaine, écarts, version du modèle) avec prochaine revue à 12 mois.
- **Suivi** (PRE-6) : documents reçus (plan d'assurance sécurité, attestation, rapport d'audit… ; validité, expiré signalé), incidents (date, description, suite) ; vue **Écarts** de tous les prestataires ; tableau de bord : prestataires évalués, score moyen, écarts ouverts ; points d'attention : critique jamais évalué, évaluation de plus de 12 mois, écarts en retard, score faible, document expiré.
- Export Excel : feuilles *Évaluations*, *Écarts*, *Documents et incidents*. Base d'exemple : évaluation de l'intégrateur. Guide « Établir le cahier d'exigences » complété (évaluer, suivre).

### Format de données
- Champs `evaluation`, `historique`, `documents`, `incidents` sur chaque prestataire. Schéma inchangé (1).

### Développement
- Test `tests/test_evaluation.py`.

## [1.1.0] — 2026-10

### Ajouts
- **Modèle de questionnaire** (*📋 Exigences*, PRE-3) : 13 domaines inspirés de l'IEC 62443-2-4 (SP.01 à SP.12), de NIS2 (art. 21, 23) et de l'ISO 27001 (A.5.17 à A.5.24) ; 37 exigences **reformulées** (aucun texte de norme recopié), avec code, niveau essentiel ou renforcé, condition d'application (accès à distance, supports amovibles, privilèges d'administration, données personnelles) et références ; modifiable (texte, niveau, condition, références, ajout, suppression, ordre, version) ; ↺ exigences proposées manquantes.
- **Cahier d'exigences cyber** d'un prestataire (fiche, PRE-4) : niveau automatique (renforcé si criticité élevée ou accès à distance) ou choisi, avec sa justification ; exigences proposées selon le niveau et la situation, ajustées à la main (retirée, ajoutée, retour à la proposition).
- **Documents Word** : cahier d'exigences (objet, périmètre, niveau, exigences retenues par domaine, modalités, renvoi au cahier technique de WerbIEC62443) et questionnaire à remettre (oui / partiel / non / sans objet, commentaire et preuve, engagement) ; habillage du **modèle Word de l'entreprise** (*📋 Exigences › Modèle Word*).
- Export Excel : feuilles *Modèle de questionnaire* et *Cahiers*. Guide « Établir le cahier d'exigences cyber d'un prestataire ».

### Format de données
- Champs `modele` (modèle de questionnaire), `modeles.word`, et `cahier` sur chaque prestataire. Schéma inchangé (1) : une base 1.0.0 s'ouvre avec le modèle proposé.

### Développement
- Test `tests/test_cahier.py`.

## [1.0.0] — 2026-10

### Ajouts
- Première version de **WerbPresta** (rubrique Conformité & exigences, niveau site) : **liste de référence des prestataires** du site (PRE-1, PRE-2).
- **Fiche prestataire** : identité (type, statut, contrat, échéance, interlocuteur sécurité par sa fonction, certifications), **périmètre** (interventions ; SI, zones et actifs reçus de WerbMap, actifs d'un SI ou d'une zone couverts d'office), **accès** (sur site, à distance et moyen, privilèges, comptes sans mot de passe, supports amovibles), données confiées, suivi.
- **Criticité calculée** (SL-T des zones, actifs critiques, accès à distance, privilèges, données sensibles) et détaillée ; **points d'attention** (accès permanent, modem ou logiciel de prise de main, contrat échu ou terminé avec accès ouverts, revue en retard, éléments plus publiés).
- **Prestataires proposés** depuis WerbGouvernance (`groupe:prestataires`) et WerbIEC62443 (`site:prestataires`), ajoutés en un clic.
- **Couverture des actifs** : qui intervient sur chaque actif.
- Tableau de bord, journal, export Excel de toute la base, thème clair / sombre, verrou commun, guide « Recenser les prestataires et leur périmètre », base d'exemple fictive (LYON), rangée aussi dans l'espace de démonstration.

### Format de données
- `WERBPRESTA`, schéma 1 : `prestataires`, `recus`.

---

WerbPresta — Développé par @WerbHat
