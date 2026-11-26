# Changelog — WerbCyberArcade

Toutes les évolutions notables de WerbCyberArcade sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

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
