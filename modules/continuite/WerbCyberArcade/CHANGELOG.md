# Changelog — WerbCyberArcade

Toutes les évolutions notables de WerbCyberArcade sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

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
