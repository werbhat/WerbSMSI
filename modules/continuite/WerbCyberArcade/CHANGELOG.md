# Changelog — WerbCyberArcade

Toutes les évolutions notables de WerbCyberArcade sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [1.9.0] — 2026-11

### Modifications
- **Comptes de l'espace** (socle 1.14.0, charte §5.11) : quand le module ouvre un espace qui a des comptes, le ticket transmis par le portail est vérifié ; sans ticket, une fenêtre de connexion s'affiche. Le compte connecté signe le journal et les publications. Une base d'un site sur lequel le compte n'est pas Éditeur s'ouvre en lecture seule (bandeau « Lecture seule · compte … ») ; une publication sans ce rôle est refusée. Hors espace, l'identification reste le nom seul.

### Développement
- Socle 1.14.0 ; tests : espace de démonstration copié sans ses comptes (identification par le nom), socle 1.14.0.

## [1.8.0] — 2026-11

### Ajouts
- **Choix de la difficulté** à l'accueil : 🎲 toutes, 🟢 débutant, 🟠 intermédiaire, 🔴 expert, avec le nombre de défis disponibles. Les 90 défis d'origine ont reçu un niveau : tout le catalogue (204 défis) est classé. Les défis de l'entreprise peuvent avoir une difficulté (éditeur, champ facultatif ; sans difficulté, ils sortent dans toutes).
- **🗺️ Mode Parcours** : trois niveaux de cinq défis, 🟢 → 🟠 → 🔴. Un niveau réussi à 70 % débloque le suivant et rend une vie ; sinon la partie s'arrête. Chrono, vies et combos comme en arcade ; écran « NIVEAU OK » entre deux niveaux, état des niveaux au bilan. Rien n'est retenu après la partie.
- **🎓 Attestation de sensibilisation** : depuis le bilan, une page sobre et imprimable (ou à enregistrer en PDF) — participant (nom obligatoire), organisation, date, partie, résultat, thèmes abordés, guides sources, code défi, version du jeu, zones de signature du participant et de l'équipe SMSI, rappel des exigences couvertes (ISO/IEC 27001 A.6.3, NIS2 4.2-EI/EE, guide d'hygiène ANSSI mesure 2). Envoi préparé par courriel ou texte à copier. Le jeu n'enregistre rien.
- **🎯 Rejouer mes erreurs** : en fin de partie, les défis manqués reviennent, mélangés, sans chrono ; ni code, ni score, ni attestation pour une révision.
- **9 nouveaux défis** « Repère le piège » et « Bon réflexe » pour les thèmes qui n'avaient que des quiz : 💸 faux conseiller bancaire, carte bancaire saisie sur un faux site ; 📲 code d'association demandé par un faux proche, téléphone à vendre ; 🎭 faux courriel RH, faux technicien du support ; 🎩 ordre de mission de test d'intrusion non conforme, phases d'un test ; 🕸️ correction d'une injection SQL.

### Modifications
- **Code défi** : `WCA-<terrain><mode><nombre><difficulté>-<graine><catalogue>` (ex. `WCA-2010-K3Q9ZP7F`). Les deux derniers caractères sont l'empreinte du catalogue de défis : un code créé avec un autre catalogue, ou avant la 1.8.0, est refusé avec une explication au lieu de proposer en silence d'autres questions.
- Charte : difficulté facultative `niveau` des défis de `groupe:defisCyber` (schéma et CHARTE.md).

## [1.7.0] — 2026-11

### Ajouts
- **🎵 Musique de fond rétro** : « 8-bit Retro » de Monume (Pixabay, piste 629800), réencodée en MP3 mono 22,05 kHz à 40 kb/s (son lo-fi assumé, 567 Ko au lieu de 3,6 Mo) et intégrée au livrable. Bouton **🎵 Musique** à côté du bouton Son, **coupée par défaut**, lecture en boucle avec fondu d'entrée, pause quand l'onglet est masqué, reprise là où elle s'était arrêtée. En Hacker mode, la piste est ralentie et assourdie (ambiance terminal).
- Lecture par Web Audio, décodée en mémoire au premier clic : CSP inchangée (pas de `media-src`), aucun accès réseau ; réglage oublié à la fermeture (P2).
- Outil `outils/encoder_musique.py` : réencode un MP3 (ffmpeg) dans `sources/assets/musique.mp3` et produit `sources/src/musique.js` (crédits + piste en base 64). Crédits affichés dans 📚 Sources.

## [1.6.0] — 2026-11

### Ajouts
- **Bibliothèque de quiz importée** : 93 nouveaux quiz (35 au travail, 36 à la maison, 31 en Hacker mode, moins 9 écartés), chacun avec son **niveau** 🟢 débutant, 🟠 intermédiaire ou 🔴 expert, affiché en étiquette pendant la partie.
- **Outil d'import** `outils/importer_quiz.py` : convertit une bibliothèque JSON (terrain, thème, niveau, bonne réponse, trois mauvaises, explication, source) en `sources/src/questions_bibliotheque.js`, intégré au livrable. Table de correspondance des thèmes, sources corrigées question par question, questions écartées ; l'outil refuse une source « exemple fictif » ou une attribution ANSSI non rattachée à une mesure précise.
- **Troisième guide source** : *Les essentiels — hygiène numérique des téléphones mobiles* de l'ANSSI (v1.1, décembre 2025, 10 règles) et 12 défis tirés de ses règles (redémarrage, bornes USB, interfaces sans fil, autorisations, réunions sensibles et mode avion, séparation des usages, messageries chiffrées, mode Isolement, CERT-FR).
- **Onze thèmes** : maison 💸 Arnaques, 🕵️ Vie privée, 📲 Smartphone, 👨‍👩‍👧 Enfants et famille ; travail 🎭 Ingénierie sociale, 🏛️ Architecture de sécurité ; Hacker mode 🎩 Pentest et éthique, 💡 Bases du hacking, 📖 Frameworks et vocabulaire, 🕸️ Attaques web et cloud, 🔑 Cryptographie ; bons réflexes complétés (box Internet, shadow IT et IA, Kerberoasting, mouvement latéral, mémoire vive).
- **Références nommées** (`["texte", "…"]`) : une norme, un texte ou une bonne pratique reconnue (OWASP, MITRE ATT&CK, RFC, RGPD, Code pénal…) ; page 📚 Sources : carte « Autres références ». La source d'un thème réunit désormais tous les guides et références de ses défis.
- Mesures 9 et 34 du guide d'hygiène ajoutées aux mesures citées.

### Écartés à l'import
- TRV-001 (défi propre à une entreprise fictive : il relève des défis de l'entreprise) ; doublons de défis déjà au catalogue : TRV-008, TRV-010, TRV-013, TRV-028, MAI-004, MAI-017, MAI-022, MAI-031.

## [1.5.0] — 2026-11

### Ajouts
- **💀 Hacker mode** : niveau expert, quatrième terrain (`lieu: "hacker"`) avec sa propre liste de **24 défis** tirés des mesures techniques du *Guide d'hygiène informatique* de l'ANSSI (mesures 8, 11, 12, 13, 14, 19, 20, 21, 22, 23, 27, 28, 29, 36, 42) : comptes d'administration nominatifs et distincts, authentification forte, identifiants par défaut, coffre-fort de mots de passe, poste et réseau d'administration, droits d'administration des postes, segmentation et cloisonnement, SSH, Wi-Fi WPA2, passerelle Internet, services exposés, journalisation (un an, NTP), durcissement des postes, produits qualifiés ; un « Repère le piège » (faux support éditeur) et un « Bon réflexe » (mise en service d'un commutateur).
- Quatre thèmes experts (🔐 Authentification, 🛠️ Administration du SI, 🧱 Réseau et cloisonnement, 📜 Journaux et durcissement) et leur page **Bons réflexes › 💀 Hacker mode**.
- Règles du mode : chrono ×0,7, points ×1,5. Ambiance **terminal vert phosphore** (pluie de code, invite `root@smsi:~$`, repère « HACKER MODE »), bannière **ACCESS GRANTED** / **ACCESS DENIED** en fin de partie.
- « Les deux » reste maison et travail, sans les défis experts. Code défi `WCA-3…` pour une partie Hacker mode.
- Éditeur des défis de l'entreprise : terrain **💀 Hacker mode (expert)** pour créer ses propres défis experts ; charte : valeur `hacker` du terrain dans `groupe:defisCyber`.

## [1.4.0] — 2026-11

### Ajouts
- **Habillage rétro-gaming** des pages du joueur (accueil, partie, bilan, meilleurs scores, bons réflexes) : décor de borne d'arcade (ciel étoilé qui scintille, soleil rayé sur l'écran titre, sol en grille « synthwave » qui défile, voile cathodique) ; titre **en police pixel** dessinée dans le jeu (SVG, aucune police externe) et envahisseurs animés ; panneaux et boutons pixel (relief, ombre dure, enfoncement au clic), sélection à curseur clignotant ; apparition de chaque défi par balayage, chrono en segments, **cœurs pixel** qui éclatent à la perte d'une vie, combo enflammé ; « +300 » qui s'envole et éclats de pixels sur une bonne réponse ; bannière pixel **STAGE CLEAR!** ou **GAME OVER**, score qui défile et confettis en fin de partie. Nouveau `sources/src/retro.js`.
- **Sons 8 bits** (Web Audio, aucun fichier) : bouton 🔇 / 🔊, **coupés par défaut**, réglage oublié à la fermeture.
- Animations limitées aux transformations et à l'opacité, toutes coupées si le système demande de limiter les animations ; administration, sources et aide gardent le thème standard ; impression en clair.

### Changements
- L'encart **🏢 Défis de l'entreprise** quitte la page du joueur pour **⚙️ Administration › Défis de l'entreprise** (état des défis chargés, case pour les mêler sur ce poste, chargement depuis l'espace) : le joueur reçoit les défis sans rien voir de ce réglage.

## [1.3.0] — 2026-11

### Ajouts
- **Fichier de défis à côté du jeu** : l'éditeur (⚙️ Défis de l'entreprise) produit **`defis_entreprise.css`** (bouton **⬇ Exporter le fichier de défis**). Déposé dans le même dossier que `WerbCyberArcade.html` sur un partage de fichiers de l'entreprise, il est lu **à l'ouverture du jeu, sans clic ni demande d'accès**, par tous les joueurs. Le jeu peut ainsi être diffusé hors de WerbSMSI : un HTML et un fichier de défis sur un partage.
- Le fichier ne contient que des **données** (propriété `--wca-defis`, JSON encodé en base 64) : le jeu les lit, puis désactive et retire la feuille aussitôt — elle ne peut ni exécuter de code ni changer l'apparence de la page. Défis contrôlés comme une publication (incomplets ignorés et signalés, texte échappé). Fichier absent : jeu normal ; abîmé ou d'un autre format : message.
- Éditeur : **nom de l'entreprise** (affiché aux joueurs, repris dans le fichier) ; deux façons de diffuser, côte à côte — ⬇ fichier à côté du jeu (le plus simple) et 📤 publication dans l'espace WerbSMSI. Numéro de version commun (code défi `-E<version>`), gardé dans la base, journal « Export ».
- Le fichier voisin prime sur la publication de l'espace ; sans lui, le jeu ouvert depuis une puce du portail reprend la publication, comme en 1.2.0.

### Sécurité
- CSP : `style-src 'unsafe-inline' 'self' file:` pour charger la seule feuille de données voisine (aucun accès réseau ; scripts toujours limités au code intégré). Justification dans SECURITY.md.
- Tests : `tests/test_fichier.py` (dossier de partage simulé en file:// : fichier présent, absent, abîmé, d'un autre format, hostile, exporté par l'éditeur puis relu).

## [1.2.0] — 2026-11

### Ajouts
- **Défis de l'entreprise** : l'équipe SMSI du groupe crée ses propres défis (règles internes, contacts, procédures, pièges vus dans l'entreprise) dans **⚙️ Administration › Défis de l'entreprise**, sans rien reconstruire : formulaires pour les quatre types (quiz : bonne réponse puis trois mauvaises ; vrai ou faux ; « Repère le piège » : forme SMS, courriel ou site, en-tête, morceaux du message, indices et leurs explications ; « Bon réflexe » : 3 à 6 étapes dans l'ordre), terrain, thème (dont le nouveau thème 🏢 *Règles de l'entreprise*), explication et source interne. Contrôle de chaque défi (⚠ points à corriger, ✔ prêt), **▶ Essayer** (le défi tel que les joueurs le verront, sans score), dupliquer, supprimer (confirmation).
- **Base du groupe** (format `WERBCYBERARCADE`, schéma 1, `.werbcyberarcade.json`), rangée dans `groupe/continuite/` : enveloppe commune, verrou du socle, journal des ajouts, modifications, suppressions et publications ; ouverture depuis la puce du portail ; base d'exemple fictive.
- **📤 Publier** : objet unique `groupe:defisCyber` dans `publications/werbcyberarcade.json` (lisible par tous les sites), version incrémentée à chaque publication et gardée dans la base ; seuls les défis complets sont publiables.
- **Côté joueurs** : encart **🏢 Défis de l'entreprise** de l'accueil — chargés sans fenêtre quand le jeu est ouvert depuis une puce du portail (raccourci d'espace), sinon par **📂 Charger les défis de l'entreprise** ; case pour les mêler ou non aux défis du jeu. Source affichée « 🏢 Organisation — source interne ». Une publication est une donnée : défis contrôlés, bornés, incomplets ignorés (et signalés), tout texte affiché échappé.
- **Code défi** : suffixe `-E<version>` quand la partie comprend les défis de l'entreprise ; relever le défi exige la même version (message clair sinon).
- Charte WerbSMSI : objet `groupe:defisCyber` (CHARTE.md §5.4, schéma `publication_groupe`, outil). Tests : `tests/test_entreprise.py` (éditeur, enregistrement, publication v1 puis v2, joueur, code défi, publication hostile, base d'exemple).

## [1.1.0] — 2026-11

### Ajouts
- **Défi entre collègues** : chaque partie reçoit un **code défi** (ex. `WCA-200-K3Q9ZP` : terrain, mode, nombre de défis, tirage, thème éventuel). Saisi dans **🎯 Relever un défi** (accueil), il redonne exactement les mêmes défis, dans le même ordre, avec les mêmes réponses mélangées et les mêmes règles ; le code est rappelé pendant la partie et au bilan (« Défi relevé »). Un code n'est garanti que pour une même version du jeu.
- **Nom du joueur en tête du bilan** de fin de partie ; s'il n'a pas été saisi, un champ permet de l'ajouter pour la fiche (le classement de la session est mis à jour).
- **📣 Défier mes collègues** (bilan) : aperçu de la **fiche de score** (image 1200 × 630 : joueur, rang, étoiles, score, réussite, meilleur combo, partie, date, code défi), **📧 Envoyer par courriel** (message prêt dans la messagerie du poste, destinataires au choix : score, rang, code défi et marche à suivre pour relever le défi), **🖼 Télécharger la fiche** (PNG à joindre), **📋 Copier le message** (Teams, messagerie en ligne).
- **Meilleurs scores** : colonne « Code défi » (🎯 pour un défi relevé), pour comparer les joueurs d'un même code.
- Tests : défi entre collègues (nom échappé, courriel, image, copie, code invalide, même tirage, joueur anonyme nommé en fin de partie).

## [1.0.0] — 2026-11

### Ajouts
- **Jeu de sensibilisation à la cybersécurité**, à la maison comme au travail : 66 défis rédigés d'après le *Cyber guide famille* de Cybermalveillance.gouv.fr (10 bonnes pratiques, 35 défis « maison ») et le *Guide d'hygiène informatique* de l'ANSSI (mesures 2, 6, 7, 8, 10, 14, 15, 18, 20, 24, 30, 31, 32, 35, 37, 39 et 40 ; 31 défis « travail »). Chaque explication cite sa source exacte.
- **Quatre types de défis** : 🧠 quiz (réponses mélangées), ⚖️ vrai ou faux, 🎣 « Repère le piège » (faux SMS, courriels et site : toucher les indices, fausses alertes pénalisées ; 5 scènes fictives), 🧩 « Bon réflexe » (remettre des étapes dans l'ordre ; 3 manches).
- **Deux modes** : 🕹️ arcade (chrono par défi, trois vies, combos jusqu'à ×4, bonus de temps) et 📖 entraînement (sans chrono ni vies). Terrain : maison, travail ou les deux ; 10, 20 ou tous les défis ; au moins un piège et un bon réflexe par partie.
- **Fin de partie** : rang (de Cyber-recrue à Cyber-héros), étoiles, score, réussite, meilleur combo, durée ; bilan par thème ; bons réflexes à revoir ; défis manqués avec la bonne réponse ; impression par 🖨 PDF.
- **Bons réflexes** : fiche par thème (16 thèmes, maison et travail) avec ses sources, et entraînement sur un seul thème.
- **Meilleurs scores** de la session (joueur ou équipe), en mémoire seulement : rien n'est enregistré.
- Guide **Animer une session** (❓ Aide) : sources, types de défis, modes, déroulé d'une session de 30 minutes, clavier, ajout de défis.
- Clavier : `1` à `4`, `V` / `F`, `Entrée`. Thème clair / sombre (la borne d'arcade reste sombre, s'imprime en clair), animations désactivées si le système limite les animations.
- Tests : `tests/test_jeu.py` (contenu, partie parfaite, partie perdue au chrono, entraînement, reprise, scores, sources, aide, aucun stockage, aucune erreur).

---

WerbCyberArcade — Développé par @WerbHat
