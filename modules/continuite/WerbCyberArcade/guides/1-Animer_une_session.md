<!-- WerbCyberArcade – Développé par @WerbHat -->
# Animer une session WerbCyberArcade

WerbCyberArcade est un jeu de quiz pour prendre les bons réflexes de cybersécurité, **à la maison comme au travail**. Il se joue seul, en binôme ou en équipes, sur un poste ou projeté en salle. Il fonctionne hors ligne et n'enregistre rien : ni réponse, ni score, ni nom de joueur ne quittent la page.

## D'où viennent les questions

Les défis sont rédigés pour le jeu à partir de trois guides publics, reformulés et jamais recopiés :

| Terrain | Guide | Ce qu'il couvre |
|---|---|---|
| 🏠 À la maison | *Cyber guide famille* de Cybermalveillance.gouv.fr (10 bonnes pratiques) | Mots de passe, sauvegardes, mises à jour, antivirus, achats en ligne, messages suspects, réseaux sociaux, Wi-Fi publics, objets connectés, cyberharcèlement |
| 🏢 Au travail | *Guide d'hygiène informatique* de l'ANSSI (42 mesures) | Les mesures qui concernent chaque collaborateur : poste de travail, messagerie, clés USB, déplacements, réaction à un incident, comptes et données, ingénierie sociale, architecture |
| 🏠 🏢 Les deux | *Les essentiels — hygiène numérique des téléphones mobiles* de l'ANSSI (10 règles) | Mises à jour et redémarrage, appareils inconnus, interfaces sans fil, autorisations, réunions sensibles, séparation des usages, messageries chiffrées |

Certains défis, surtout en Hacker mode, citent une **référence nommée** : une norme ou un référentiel (OWASP, MITRE ATT&CK, RFC), un texte (RGPD, Code pénal) ou une bonne pratique reconnue. Chaque défi porte un **niveau** — 🟢 débutant, 🟠 intermédiaire, 🔴 expert — affiché en étiquette pendant la partie.

Après chaque réponse, le jeu affiche l'explication et la source exacte (numéro de la bonne pratique ou de la mesure). La page **📚 Sources** du menu donne les références complètes et les liens vers les guides.

## Les quatre types de défis

- **🧠 Quiz** : une seule bonne réponse parmi quatre. Les réponses sont mélangées à chaque partie.
- **⚖️ Vrai ou faux** : une affirmation à juger vite.
- **🎣 Repère le piège** : un faux SMS, un faux courriel ou un faux site. Le joueur touche tous les éléments suspects (expéditeur, lien, urgence, demande de mot de passe…), puis valide. Une fausse alerte coûte des points.
- **🧩 Bon réflexe** : remettre dans l'ordre les étapes d'une bonne réaction, par exemple face à un poste attaqué.

## 💀 Hacker mode (niveau expert)

Pour les informaticiens, administrateurs et référents sécurité : un quatrième terrain, **💀 Hacker mode**, avec sa propre liste de défis tirés des mesures techniques du guide d'hygiène de l'ANSSI — comptes d'administration, authentification forte, cloisonnement du réseau, protocoles sécurisés, Wi-Fi d'entreprise, journalisation. Le chrono est 30 % plus court et les points multipliés par 1,5 ; l'écran passe en terminal vert. « Les deux » ne mélange que maison et travail : le Hacker mode se choisit à part. Ses bons réflexes ont leur page (**🛡️ Bons réflexes › 💀 Hacker mode**). L'équipe SMSI peut créer ses propres défis experts dans l'éditeur (terrain *💀 Hacker mode*).

## Difficulté et parcours (1.8.0)

Chaque défi a un niveau : 🟢 débutant, 🟠 intermédiaire ou 🔴 expert. À l'accueil, **Quelle difficulté ?** limite la partie à un niveau (le nombre de défis disponibles s'affiche) ; « Toutes » mélange les trois. Pour un public novice, commencez en 🟢 ; pour une équipe informatique, 🔴 ou le Hacker mode.

Le mode **🗺️ Parcours** enchaîne trois niveaux de cinq défis, du débutant à l'expert. Il faut **70 %** de réussite (quatre défis sur cinq) pour débloquer le niveau suivant, qui rend une vie au passage ; sinon la partie s'arrête. Chrono, vies et combos sont ceux de l'arcade. C'est un bon format de démonstration en ouverture de session : la difficulté monte d'elle-même.

## Rejouer ses erreurs

En fin de partie, **🎯 Rejouer mes erreurs** relance aussitôt les défis manqués, sans chrono, pour fixer la bonne réponse. Une révision ne donne ni code défi, ni score, ni attestation.

## L'attestation de sensibilisation

Depuis le bilan, **🎓 Établir mon attestation** ouvre une page sobre, prête à imprimer ou à enregistrer en PDF : nom du participant (obligatoire), organisation, date, partie jouée, résultat, thèmes abordés, guides sources, code défi et version du jeu, avec deux zones de signature (participant, équipe SMSI). Elle rappelle les exigences qu'elle aide à couvrir : **ISO/IEC 27001 A.6.3** (sensibilisation), **NIS2 4.2-EI/EE** (programme de sensibilisation des utilisateurs) et la **mesure 2** du guide d'hygiène de l'ANSSI.

Le jeu n'enregistre rien : c'est le participant qui imprime, enregistre ou envoie son attestation (**📧 Envoyer à l'équipe SMSI** prépare le courriel). L'équipe SMSI la classe dans son registre de sensibilisation. Le code défi imprimé permet, au besoin, de rejouer exactement la même partie.

## Les deux modes

- **🕹️ Arcade** : chrono, trois vies, combos. Une bonne réponse vaut 100 points plus un bonus de temps, multipliés par le combo (jusqu'à ×4). Une erreur coûte une vie ; la partie s'arrête à la troisième. Idéal pour une session en équipes.
- **📖 Entraînement** : sans chrono ni vies, pour lire les explications à son rythme.

On choisit aussi le terrain (maison, travail ou les deux) et le nombre de défis (10, 20 ou tous). Une partie de 10 défis comprend toujours au moins un « Repère le piège » et un « Bon réflexe » ; deux de chaque à partir de 20.

## Déroulé conseillé d'une session de 30 minutes

1. **Introduction (5 min)** : pourquoi la cybersécurité concerne tout le monde, au bureau comme à la maison. Les mêmes réflexes protègent les deux.
2. **Partie en équipes (15 min)** : projeter le jeu, mode Arcade, 10 ou 20 défis, terrain « Les deux ». Saisir le nom de l'équipe avant de jouer. Faire voter les équipes, puis lire l'explication à voix haute.
3. **Débriefing (10 min)** : afficher le bilan de fin de partie. Les thèmes en rouge et la liste « Les défis manqués » nourrissent la discussion. La page **🛡️ Bons réflexes** sert de support de synthèse.

Pour un tournoi, faites jouer chaque équipe à tour de rôle : la page **🏆 Meilleurs scores** classe les parties de la session. Elle s'efface à la fermeture de l'onglet.

## Lancer un défi entre collègues

Chaque partie a un **code défi**, affiché au bilan (par exemple `WCA-200-K3Q9ZP`). Saisi dans **🎯 Relever un défi** sur l'accueil, il redonne **exactement les mêmes défis**, dans le même ordre et avec les mêmes règles : la comparaison des scores est équitable.

Au bilan, l'encart **📣 Défier mes collègues** propose :

- **📧 Envoyer par courriel** : la messagerie du poste s'ouvre avec un message prêt (score, rang, code défi, marche à suivre). Ajoutez vos collègues en destinataires, puis envoyez.
- **🖼 Télécharger la fiche** : une image de la fiche de score (nom, rang, score, code défi), à joindre au courriel ou à publier sur l'intranet.
- **📋 Copier le message** : pour Teams ou une messagerie en ligne.

Le nom du joueur figure en tête du bilan et sur la fiche ; s'il n'a pas été saisi avant la partie, un champ permet de l'ajouter. Rien n'est envoyé sans vous, et rien n'est enregistré.

Idée d'animation : un **défi de la semaine**. L'animateur joue une partie, envoie le code à toute l'équipe ; chacun relève le défi et répond avec sa fiche de score. Un même code n'est garanti que pour une même version du jeu.

## Après la session

- **🖨 PDF** (bandeau) imprime la page affichée : le bilan d'une partie, ou la fiche des bons réflexes à distribuer.
- Depuis **🛡️ Bons réflexes**, le bouton **S'entraîner** lance une partie sur un seul thème, sans chrono : utile pour revoir un point faible.
- Pour un suivi des formations dans WerbSMSI, enregistrez la session dans **WerbAcademie** (date, public, thème).

## L'habillage rétro

Les pages du joueur (accueil, partie, bilan, scores, bons réflexes) ont un habillage de borne d'arcade : ciel étoilé, grille « synthwave », titre en pixels, envahisseurs, cœurs pixel, points qui s'envolent, « STAGE CLEAR » ou « GAME OVER » en fin de partie. Le bouton **🔇 Son coupé** active des sons 8 bits et le bouton **🎵 Musique coupée** une musique de fond rétro en boucle (tous deux coupés par défaut : pensez-y en salle, la musique se met en pause si l'onglet est masqué ; en Hacker mode, elle est ralentie et assourdie). Les animations s'arrêtent si Windows demande de limiter les animations (*Paramètres › Accessibilité › Effets visuels*). L'administration, les sources et l'aide gardent l'affichage standard.

## Au clavier

| Touche | Effet |
|---|---|
| `1` à `4` | Choisir une réponse de quiz |
| `V` / `F` | Vrai / Faux |
| `Entrée` | Valider un « Repère le piège » ou un « Bon réflexe », puis passer au défi suivant |

## Créer les défis de votre entreprise (équipe SMSI)

**Le plus simple : un fichier à côté du jeu.** Le jeu est un fichier HTML ; posé sur un partage de fichiers de l'entreprise, il suffit de déposer à côté le fichier de défis :

1. Ouvrir WerbCyberArcade, **⚙️ Administration › Défis de l'entreprise**, **✨ Nouvelle base** (puis **💾 Enregistrer**, pour retrouver ses défis la fois suivante avec **📂 Ouvrir une base**).
2. Renseigner le **nom de l'entreprise**, créer les défis (voir ci-dessous), les **▶ Essayer**.
3. **⬇ Exporter le fichier de défis** : enregistrer `defis_entreprise.css` **dans le même dossier que `WerbCyberArcade.html`**, sous ce nom exact.
4. C'est tout : chaque joueur qui ouvre le jeu a les défis de l'entreprise, sans cliquer ni autoriser quoi que ce soit. Pour une mise à jour, exporter de nouveau et remplacer le fichier.

Le fichier ne contient que des données (il ne peut ni exécuter de code ni changer l'apparence du jeu) ; ne le modifiez pas à la main, refaites-le depuis l'éditeur. Gardez le dossier du partage en lecture seule pour les joueurs.

**Avec le portail WerbSMSI**, l'équipe SMSI peut aussi publier les défis dans l'espace du groupe :

Les 66 défis du jeu viennent des guides publics. Pour parler **de chez vous** — qui appeler, où signaler, la charte informatique, un piège déjà reçu — l'équipe SMSI du groupe crée ses propres défis, **sans rien installer ni reconstruire** :

1. Ouvrir WerbCyberArcade depuis la **puce « groupe »** du module dans le portail (l'espace est alors transmis), puis **⚙️ Administration › Défis de l'entreprise**.
2. **✨ Nouvelle base** la première fois, puis **💾 Enregistrer** dans `groupe/continuite/` de l'espace ; les fois suivantes, **📂 Ouvrir la base demandée par le portail**. La base a le verrou commun : un collègue qui l'ouvre en même temps la voit en lecture seule.
3. **➕ Nouveau** : choisir le type (quiz, vrai ou faux, repère le piège, bon réflexe), remplir le formulaire — énoncé, réponses (la bonne d'abord), scène et indices, ou étapes dans l'ordre —, l'explication et une **source interne** (charte, procédure). **✔ Appliquer** ; un défi incomplet est signalé ⚠ avec les points à corriger.
4. **▶ Essayer** : le défi tel que les joueurs le verront, sans compter dans les scores.
5. **📤 Publier** : les défis prêts partent dans `publications/werbcyberarcade.json` (version 1, 2, 3…). La base est enregistrée aussitôt avec le numéro de version.

Les joueurs qui ouvrent le jeu depuis le portail reçoivent les défis sans rien faire. L'état des défis chargés (fichier ou espace), la case pour les mêler ou non aux défis du jeu sur un poste et le chargement depuis l'espace sont dans **⚙️ Administration › Défis de l'entreprise** : la page du joueur n'en montre rien ; les défis y ont leur thème, **🏢 Règles de l'entreprise**, dans les bons réflexes.

À retenir :

- **Rien de confidentiel** : la publication est lisible par tous les sites. Ni adresse IP, ni mot de passe, ni nom de serveur, ni vulnérabilité réelle ; des scènes « piège » fictives.
- **Code défi** : une partie qui contient les défis de l'entreprise a un code en `-E<version>`. Après une nouvelle publication, les anciens codes ne peuvent plus être relevés avec les défis de l'entreprise : prévenez les joueurs d'un défi en cours.

## Ajouter ou modifier des défis du jeu de base

Les défis sont rangés dans `sources/src/questions.js`, dans le dépôt du module. Chacun porte un identifiant unique, un terrain (`maison`, `travail` ou `hacker`), un thème, un type, un niveau (`debutant`, `intermediaire` ou `expert`) et sa source (`["famille", n]`, `["hygiene", n]`, `["mobiles", n]` ou `["texte", "référence"]`). Toute modification du catalogue change son empreinte : les codes défi déjà partagés sont alors refusés, avec une explication. Pour un quiz, la bonne réponse est la première de la liste : le jeu mélange l'ordre à l'affichage. Reconstruire ensuite le module, puis le publier (`werb_charte.py construire`, `empreinte`, `audit`, `publier`).

Les scènes « Repère le piège » sont fictives : numéros, adresses, noms de personnes et de sites sont inventés. Gardez cette règle pour toute nouvelle scène.

**Importer une bibliothèque de quiz (JSON).** `python outils\importer_quiz.py <bibliotheque.json>` convertit chaque question (terrain, thème, niveau, bonne réponse, trois mauvaises, explication, source) en quiz du jeu et écrit `sources/src/questions_bibliotheque.js`. Les tables de l'outil font correspondre les thèmes, corrigent les sources (rattachement à une mesure ou une règle précise) et écartent les doublons ; une source « exemple fictif » ou une attribution vague à l'ANSSI arrête l'import avec la liste des questions à traiter. Les défis propres à votre entreprise ne vont pas dans le catalogue de base : créez-les dans l'éditeur des défis de l'entreprise.
