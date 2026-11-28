# Changelog — WerbPresta

Toutes les évolutions notables de WerbPresta sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).





## [1.13.0] — 2026-11

### Ajouts
- **Assistant IA optionnel** (socle 1.15.0, charte §5.12) : bouton « 🤖 Demander à l'assistant » quand l'assistant WerbSMSI.AI est déclaré dans l'espace et que sa passerelle prouve son identité ; questions suggérées et démarche guidée selon l'écran, réponse citée affichée en texte, sources, 👍/👎. Contexte transmis limité au module, à l'écran et au site de la base (aucune donnée de la base). **Sans déclaration, rien n'est affiché et aucune requête n'est émise.**

### Développement
- Socle 1.15.0 ; CSP : `connect-src` limité aux deux adresses de l'assistant (charte §1, §7).

## [1.12.0] — 2026-11

### Modifications
- **Comptes de l'espace** (socle 1.14.0, charte §5.11) : quand le module ouvre un espace qui a des comptes, le ticket transmis par le portail est vérifié ; sans ticket, une fenêtre de connexion s'affiche. Le compte connecté signe le journal et les publications. Une base d'un site sur lequel le compte n'est pas Éditeur s'ouvre en lecture seule (bandeau « Lecture seule · compte … ») ; une publication sans ce rôle est refusée. Hors espace, l'identification reste le nom seul.

### Développement
- Socle 1.14.0 ; tests : espace de démonstration copié sans ses comptes (identification par le nom), socle 1.14.0.

## [1.11.0] — 2026-11

### Modifications
- **Cahier d'exigences et rapport d'évaluation : nom du site** plutôt que son code (« sur le site Usine de Lyon », page de garde), comme le guide du prestataire et la balise `SITE` du modèle Word (charte §7.8). Le code reste dans les données publiées et la consolidation du groupe.

## [1.10.0] — 2026-11

### Modifications
- **Nommage des fichiers exportés** (socle 1.12.0, charte §7.8) : les rapports, classeurs, documents, CSV et PDF produits par le module commencent par le code du groupe et celui du site, « SIGLE-SITE_ » (« SIGLE_ » pour une base du groupe), par exemple `GDI-LYON_…` ; les codes déjà présents dans le nom ne sont pas répétés. Les fichiers de base gardent leur nom ; hors espace (sigle inconnu), les noms ne changent pas. Titres (page, classeur, rapport Word, feuille Informations) : **nom du site** plutôt que son code.

### Développement
- Socle 1.12.0 (`WerbSocle.nommage` : `contexte`, `fichier`, `nomSite`, `libelleSite`, `nomGroupe`).

## [1.9.0] — 2026-11

### Modifications
- **Ouverture directe de la base demandée par le portail** (socle 1.11.0, charte §5.5) : ouvert depuis la puce d'une base du portail WerbSMSI, l'espace étant chargé dans le portail (🔗 Raccourcis), le module ouvre la base aussitôt, sans le bouton « 📂 Ouvrir … ». Si l'espace n'est pas accessible sans fenêtre (raccourci désactivé, autorisation d'Edge à donner), le bouton reste proposé comme avant.

### Développement
- Socle 1.11.0 (`WerbSocle.lien.ouvrirSansClic()`).

## [1.8.0] — 2026-11

### Modifications
- **Identification unique depuis le portail** (socle 1.10.0, charte §5.5) : ouvert depuis le portail WerbSMSI 1.16.0 (bouton *Ouvrir* ou puce d'une base), le module reprend le nom saisi une fois dans le portail ; l'écran « Votre nom » ne s'affiche plus, le journal, les publications et le verrou de la base reçoivent ce nom. Ouvert seul, le module demande le nom comme avant.

### Développement
- Socle 1.10.0 (`WerbSocle.lien.utilisateur()`, nom transmis dans le lien `#werbsmsi=…`, champ `u`).

## [1.7.0] — 2026-11

### Ajouts
- **Documents en anglais pour le prestataire** : dans la fiche (carte *Cahier d'exigences cyber*), **Langue** Français / English, enregistrée avec le prestataire. En anglais : le **cahier d'exigences** (*Cybersecurity requirements specification* : purpose, scope, requirement level, requirements, terms), le **questionnaire** (*Yes / Partial / No / Not applicable*, commitment) et le **guide du prestataire** (*Meeting your client's cybersecurity requirements*, traduction complète du guide 3 : maturity levels, four steps, requirement by requirement, action plan, resources). Listes de la fiche traduites (type de prestataire, interventions, accès, privilèges, données confiées), niveau et justification, dates au format AAAA-MM-JJ, mentions du modèle Word d'entreprise ; fichiers suffixés `_EN`. Le **rapport d'évaluation**, document interne, reste en français.
- **Modèle de questionnaire bilingue** : intitulé de domaine et **exigence en anglais** à côté du texte français (*Modèle de questionnaire*, export Excel). Les 13 domaines et 37 exigences proposés sont traduits ; une base existante reçoit les traductions à l'ouverture pour les textes non modifiés. Exigence modifiée ou ajoutée sans traduction : texte français repris, signalé dans la fiche et à la génération. Le modèle publié pour le groupe transporte les traductions.

### Format de données
- `prestataires[].cahier.langue` (`fr` ou `en`) ; `modele.domaines[].titre_en`, `modele.domaines[].exigences[].texte_en`. Schéma inchangé.

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
