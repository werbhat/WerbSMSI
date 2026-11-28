# Changelog — WerbAcademie

Toutes les évolutions notables de WerbAcademie sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).




## [1.12.0] — 2026-11

### Ajouts
- **Assistant IA optionnel** (socle 1.15.0, charte §5.12) : bouton « 🤖 Demander à l'assistant » quand l'assistant WerbSMSI.AI est déclaré dans l'espace et que sa passerelle prouve son identité ; questions suggérées et démarche guidée selon l'écran, réponse citée affichée en texte, sources, 👍/👎. Contexte transmis limité au module, à l'écran et au site de la base (aucune donnée de la base). **Sans déclaration, rien n'est affiché et aucune requête n'est émise.**

### Développement
- Socle 1.15.0 ; CSP : `connect-src` limité aux deux adresses de l'assistant (charte §1, §7).

## [1.11.0] — 2026-11

### Modifications
- **Comptes de l'espace** (socle 1.14.0, charte §5.11) : quand le module ouvre un espace qui a des comptes, le ticket transmis par le portail est vérifié ; sans ticket, une fenêtre de connexion s'affiche. Le compte connecté signe le journal et les publications. Une base d'un site sur lequel le compte n'est pas Éditeur s'ouvre en lecture seule (bandeau « Lecture seule · compte … ») ; une publication sans ce rôle est refusée. Hors espace, l'identification reste le nom seul.

### Développement
- Socle 1.14.0 ; tests : espace de démonstration copié sans ses comptes (identification par le nom), socle 1.14.0.

## [1.10.0] — 2026-11

### Modifications
- **Nommage des fichiers exportés** (socle 1.12.0, charte §7.8) : les rapports, classeurs, documents, CSV et PDF produits par le module commencent par le code du groupe et celui du site, « SIGLE-SITE_ » (« SIGLE_ » pour une base du groupe), par exemple `GDI-LYON_…` ; les codes déjà présents dans le nom ne sont pas répétés. Les fichiers de base gardent leur nom ; hors espace (sigle inconnu), les noms ne changent pas.

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
- Sources 1.7.0 récupérées des copies de conflit Synology (`_conflits_synology/WerbAcademie`) : le dépôt contenait encore les sources 1.5.0 ; reconstruction identique au livrable 1.7.0 publié.

## [1.7.0] — 2026-11

### Ajouts
- **Échange de formations entre académies**, depuis le catalogue :
  - **⬇** sur chaque ligne du catalogue et **⬇ Exporter (JSON)** dans la fiche : une formation ; **⬇ Exporter le catalogue** : toutes les formations. Fichier `*.werbformation.json` (format `WERBACADEMIE-FORMATIONS`, schéma 1) : formations sans identifiants, avec l'académie, la date et l'auteur de l'export ; **aucune personne ni session**.
  - **⇩ Importer des formations…** : ce fichier, une base WerbAcademie (son catalogue seulement), un objet `{ formations: [...] }`, une liste ou une formation seule. **Aperçu** avant d'appliquer : formation nouvelle, identique, code existant (version, statut, sessions), en double dans le fichier, liens invalides, éléments ignorés ; **choix par formation** : ajouter, remplacer le contenu, ajouter en copie, ignorer (formations identiques ou de code existant ignorées par défaut).
  - Ajout et copie : formation en **brouillon** (à relire puis publier), copie au code libre (`-IMPORT`). Remplacement, après confirmation : contenu et version repris, identifiant, statut et sessions gardés ; si la version est la même alors que des sessions existent, l'aperçu invite à passer une nouvelle version. Exports et imports tracés au journal.
  - Fichiers refusés : JSON invalide, format inconnu, schéma plus récent, plus de 200 formations, aucune formation exploitable. Contenu borné et contrôlé comme à l'ouverture d'une base.

### Format de données
- Aucun champ nouveau dans la base. Nouveau fichier d'échange `*.werbformation.json` (README, « Échange de formations »).

### Développement
- Test `tests/test_echange.py`.

## [1.6.0] — 2026-11

### Ajouts
- **Septième formation proposée** : *Cyber : à la maison comme à l'usine* (ACA-CYB), sensibilisation d'une heure pour les collaborateurs et les opérateurs OT peu à l'aise avec l'informatique. Fil rouge : une situation vécue à la maison, la même à l'usine, un seul réflexe. 11 chapitres, 28 diapos avec les notes de l'animateur (durée indiquée par chapitre) : pouvoir repartir après une attaque ou une panne ; données précieuses et copie ailleurs (incendie, vol, panne) ; l'histoire de « Julien », des informations banales (réseaux sociaux, fuite du numéro de sécurité sociale, IBAN) jusqu'au crédit à son nom, et le même escalier à l'usine (faux RIB fournisseur, élévation de privilèges) ; menaces communes ; incidents fréquents en industrie (clés USB et erreurs, internes ou de prestataires) ; clés USB et smartphones (OTG, recharge sur une machine) ; QR codes ; faux Wi-Fi, faux portails et passerelles 4G posées sur les machines ; mails piégés ; intelligence artificielle (données confiées, voix imitées) ; carte réflexe. Quiz de 9 questions (seuil 75 %). Proposée en **brouillon** : elle recoupe en partie ACA-HYG, ACA-USB, ACA-QR et ACA-IA et ne devient exigée qu'une fois publiée. « ↺ Ajouter les formations proposées manquantes » l'ajoute à une académie existante.

### Développement
- `tests/test_parcours.py` : sept formations de départ, ACA-CYB en brouillon.

## [1.5.0] — 2026-11

### Ajouts
- **Attestation individuelle de formation** (ACA-12), en Word, depuis la liste des personnes (bouton 📄) : identité (nom, fonction, site, population), organisation et académie ; formations **réussies** (session réalisée, présence, quiz au seuil ou formation sans quiz) avec version, date, format, durée, résultat en % et date de validité (« échue » si dépassée) ; pour une personne présente, **situation au regard des formations exigées** pour sa population (état, dernière réussite, échéance) ; responsable des formations, lieu, date et signature ; mention des données personnelles. Habillée du modèle Word de l'entreprise si demandé. Bouton désactivé sans formation réussie. Tracée au journal (nom retiré par la purge, comme les autres traces).

### Développement
- Test `tests/test_attestation.py`.

## [1.4.0] — 2026-10

### Ajouts
- **Publication `groupe:formations`** (ACA-9), *Base › Intégration WerbSMSI* : catalogue publié et indicateurs agrégés — groupe, dirigeants, par site, par site × population (personnes, personnes à jour, formations exigées, à jour, à renouveler, en retard, jamais, taux), sessions et réussites des douze derniers mois — dans `publications/werbacademie.json` du groupe ; **aucun nom ni identifiant de personne**. Aperçu par site avant publication ; action explicite, après enregistrement, tracée au journal (date de la dernière publication affichée).
- Point d'attention : indicateurs jamais publiés.
- Lecteurs (ACA-10) : portail WerbSMSI (tableau du groupe), WerbPCR (objectif R#1), WerbNIS2 (articles 20 et 21), WerbGouvernance (revue de direction).

### Format de données
- Aucun champ nouveau dans la base. Objet de publication `groupe:formations` ajouté à la charte (§5.4) et au schéma de publication du groupe.

### Développement
- Test `tests/test_publication.py` (`--ecrire-demo` : publication recopiée dans l'espace de démonstration).

## [1.3.0] — 2026-10

### Ajouts
- **Suivi des formations** (ACA-7), menu *Personnes › Suivi des formations* : formations exigées de chaque personne présente (formations **publiées** qui visent sa population) ; échéance = dernière session réussie + délai de renouvellement de la formation ; état à jour, à renouveler (échéance dans moins de 2 mois), en retard, jamais suivie ; inscription à une session à venir signalée ; indicateurs, **dirigeants** mis en avant (NIS2, article 20), synthèses par site et par population, matrice par personne et filtres.
- **Session de rattrapage** : depuis le suivi, une session par formation pour les personnes affichées pas à jour et pas encore inscrites.
- Tableau de bord : taux de formations à jour, dirigeants à jour, formations à jour par site ; points d'attention : formations en retard ou jamais suivies, dirigeants pas à jour.
- **Sixième formation proposée** : *Cybersécurité : le rôle des dirigeants* (ACA-DIR, dirigeants seulement) — responsabilités NIS2 (article 20), pilotage des risques, fournisseurs, crise et notification (24 h, 72 h, un mois), quiz de 4 questions. « ↺ Ajouter les formations proposées manquantes » l'ajoute à une académie existante.
- **Purge** (ACA-8), *Personnes* : les personnes parties depuis plus que la durée de conservation (36 mois par défaut, réglable) sont supprimées en un clic ; leurs participations restent comptées sans nom, leur nom est retiré du journal.
- Export Excel : feuille *Suivi*.
- Académie d'exemple : session de la formation des dirigeants.

### Changements
- La suppression d'une personne retire aussi son nom du journal.

### Format de données
- Aucun champ nouveau. Schéma inchangé (1).

### Développement
- Test `tests/test_suivi.py`.

## [1.2.0] — 2026-10

### Ajouts
- **Sessions** (ACA-5), menu *Formations › Sessions* : formation suivie, avec sa **version**, son seuil de réussite et son nombre de questions gardés à la création (preuve de ce qui a été présenté, même si la formation change ou disparaît) ; date, site ou plusieurs sites, format (présentiel, distanciel, e-learning externe), durée, animateur, lieu ou outil, notes ; état (planifiée, réalisée, scores à saisir) ; filtres par formation et par site.
- **Participants** : personnes concernées du site (population visée par la formation) en un clic, ajout une à une, retrait ; présence (✓ tous présents) et nombre de bonnes réponses saisis par l'animateur ; **résultat calculé** : réussi, échec, score à saisir, absent ; bilan de la session.
- **Feuille d'émargement** Word : formation et version, date, durée, format, lieu, site, animateur, une ligne de signature par inscrit et cinq lignes libres.
- **Éditeur du quiz** (ACA-6), fiche d'une formation : questions, choix, une ou plusieurs bonnes réponses (qui suivent leur texte quand les choix sont réordonnés), explication, ordre, seuil de réussite. **Quiz papier** Word à distribuer, avec en option le **corrigé** réservé à l'animateur.
- **Modèle Word de l'entreprise** (*Base › Modèle Word*) : en-tête, pied de page et styles appliqués à l'émargement et au quiz papier ; modèle commun du dossier `modeles/` de l'espace ou fichier, copié dans la base.
- Tableau de bord : sessions réalisées, formations réussies ; points d'attention : question sans bonne réponse, session réalisée avec des scores à saisir ou sans présence.
- Export Excel : feuilles *Sessions* et *Participations*.
- Académie d'exemple : cinq sessions fictives (présences, scores, une absence, des échecs, une session planifiée).

### Changements
- La suppression d'une personne garde ses participations, sans son nom (« Personne supprimée » : population et site seuls), pour que les comptes des sessions restent justes.

### Format de données
- Champs `sessions` et `modeles` (voir README). Schéma inchangé (1) : une base 1.1.0 s'ouvre sans perte.

### Développement
- Test `tests/test_sessions.py`.

## [1.1.0] — 2026-10

### Ajouts
- **Slides** générées depuis la structure d'une formation (ACA-3, ACA-4), carte « 🖥️ Slides » de la fiche : page de titre, objectif et publics, programme, sections, diapos (points clés, notes de l'animateur), pour aller plus loin (liens), quiz (une diapo par question), fin.
- **Présentation HTML autonome** : fichier unique, hors ligne (CSP stricte, images intégrées, aucune ressource externe, rien dans le navigateur) ; navigation au clavier et au clic, plein écran (F), **mode animateur** (N : notes, chronomètre), réponse du quiz révélée à la demande (R), impression en PDF une diapo par page ; liens en nouvel onglet.
- **PowerPoint (.pptx) modifiable** (PptxGenJS) : masque (bandeau, logo, pied de page, numéro de diapo), notes de l'animateur dans les notes PowerPoint, liens cliquables, quiz puis **corrigé** (bonnes réponses marquées, explication) ; options : inclure le quiz, corrigé à la fin.
- **Logo des slides** (*Identification*) : logo commun du dossier `modeles/` de l'espace (nom commençant par « logo ») ou fichier PNG / JPEG (signature vérifiée, 2 Mo au plus), copié dans la base. Académie d'exemple : logo fictif de l'espace de démonstration.

### Format de données
- Champ `logo` (nom, type, base64). Schéma inchangé (1).

### Sécurité
- **PptxGenJS 4.0.1** (licence MIT) figé dans `sources/vendor/pptxgen.bundle.js` : téléchargé une fois depuis le registre npm officiel, intégrité SHA-512 vérifiée, empreinte SHA-256 contrôlée à chaque assemblage ; aucune ressource chargée à l'exécution. Le bundle contient un `new Function` dans un polyfill de `setImmediate`, jamais appelé par le module (la CSP de la page n'autorise pas `unsafe-eval`).

### Développement
- Test `tests/test_slides.py`.

## [1.0.0] — 2026-10

### Ajouts
- Première version de **WerbAcademie** (rubrique Continuité & résilience, niveau groupe) : formation et sensibilisation des collaborateurs du groupe (ACA-1, ACA-2).
- **Catalogue de formations** et **éditeur** : présentation (code, titre, objectif, durée, publics visés, renouvellement en mois), chapitres, diapos (titre, points clés, notes de l'animateur), liens vers des vidéos, des sites ou des documents (http ou https, nouvel onglet, jamais intégrés), statut (brouillon, publiée, retirée), nouvelle version ; duplication, suppression ; quiz affiché.
- **Cinq formations de départ** : hygiène numérique, usage de l'IA, usage des clés USB, usage des QR codes, gestion des mots de passe (diapos, notes, liens publics, quiz) ; ↺ pour rétablir une formation proposée manquante.
- **Personnes** au minimum nécessaire : nom, service ou fonction, population (collaborateurs, administrateurs, dirigeants, prestataires, opérateurs OT), site ; import CSV avec aperçu (ajout, mise à jour par le nom, valeurs inconnues, colonnes en trop ignorées), modèle CSV ; départs datés ; **durée de conservation** indiquée et réglable (36 mois), personnes à supprimer signalées.
- Intégration WerbSMSI au niveau du groupe (sites reçus de `groupe:sites`), tableau de bord (points d'attention, personnes par population et par site), journal, export Excel de toute la base, thème clair / sombre, verrou commun, guide « Mettre en place l'académie du groupe », académie d'exemple fictive (rangée aussi dans l'espace de démonstration).

### Format de données
- `WERBACADEMIE`, schéma 1 : `academie`, `formations`, `personnes`, `parametres`, `recus.sites`.

---

WerbAcademie — Développé par @WerbHat
