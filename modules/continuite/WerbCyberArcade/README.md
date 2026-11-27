# WerbCyberArcade

> Jeu de quiz de sensibilisation cyber, maison et travail (guides ANSSI, Cybermalveillance.gouv.fr) ; défis de l'entreprise publiés par l'équipe SMSI
> Version **1.9.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

La sensibilisation est la première mesure du *Guide d'hygiène informatique* de l'ANSSI destinée aux utilisateurs (mesure 2), et les mêmes réflexes protègent la famille à la maison. Un jeu court, en équipes, retient mieux l'attention qu'un diaporama. WerbCyberArcade se joue dans le navigateur, hors ligne, sans installation ni compte, et n'enregistre rien.

---

## Contenu du paquet

```
WerbCyberArcade/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbCyberArcade.sha256       ← empreinte de l'application
├── application/
│   └── WerbCyberArcade.html     ← le jeu (fichier unique, hors ligne)
└── guides/
    └── 1-Animer_une_session.md  ← guide de l'animateur (❓ Aide)
```

Le dépôt source contient en plus `sources/` (dont `sources/src/questions.js`, le contenu du jeu) et `tests/`.

---

## Démarrage rapide

**Diffusion simple sur un partage de fichiers** : copier `application/WerbCyberArcade.html` dans un dossier du partage (lecture seule pour les joueurs) ; pour ajouter les défis de l'entreprise, y déposer à côté le `defis_entreprise.css` exporté par l'éditeur. Rien d'autre à installer.

1. Ouvrir `application/WerbCyberArcade.html` avec **Microsoft Edge** (ou Chrome, Firefox), directement ou depuis le portail WerbSMSI (rubrique continuité).
2. Choisir le terrain (🏠 maison, 🏢 travail ou les deux), le mode (🕹️ arcade ou 📖 entraînement) et le nombre de défis.
3. **▶ Jouer**. Le guide *Animer une session* (❓ Aide) propose un déroulé de 30 minutes en équipes.

---

## Fonctionnalités

- **Difficulté, parcours, attestation** (1.8.0) : choix 🟢 / 🟠 / 🔴 ; mode 🗺️ Parcours (trois niveaux à débloquer à 70 %) ; 🎓 attestation de sensibilisation imprimable (preuve pour ISO/IEC 27001 A.6.3 et NIS2 4.2-EI/EE) ; 🎯 rejouer ses erreurs ; code défi lié à la version du catalogue ; 204 défis.
- **🎵 Musique de fond rétro** (1.7.0) : piste 8 bits intégrée (MP3 lo-fi de 567 Ko), coupée par défaut, en boucle, assourdie en Hacker mode ; outil `outils/encoder_musique.py` pour la remplacer.
- **Catalogue enrichi** (1.6.0) : 195 défis, niveau de difficulté affiché (🟢 🟠 🔴), troisième guide (essentiels ANSSI des téléphones mobiles), références nommées (OWASP, MITRE ATT&CK, RFC…) ; outil d'import d'une bibliothèque de quiz JSON (`outils/importer_quiz.py`).
- **💀 Hacker mode** (1.5.0) : niveau expert, 24 défis sur les mesures techniques du guide d'hygiène de l'ANSSI (administration, cloisonnement, protocoles, journaux), chrono ×0,7, points ×1,5, ambiance terminal ; terrain `hacker` aussi disponible pour les défis de l'entreprise.
- **Habillage rétro-gaming** (1.4.0) : borne d'arcade animée (étoiles, grille synthwave, titre pixel, envahisseurs, cœurs pixel, « STAGE CLEAR » / « GAME OVER »), sons 8 bits facultatifs (coupés par défaut) ; animations coupées si le système le demande.
- **66 défis** en quatre types : 🧠 quiz, ⚖️ vrai ou faux, 🎣 « Repère le piège » (faux SMS, courriel ou site : toucher les indices), 🧩 « Bon réflexe » (remettre les étapes dans l'ordre).
- **Deux terrains** : à la maison (*Cyber guide famille* de Cybermalveillance.gouv.fr, 35 défis), au travail (*Guide d'hygiène informatique* de l'ANSSI, 31 défis).
- **Deux modes** : arcade (chrono, trois vies, combos, bonus de temps) et entraînement (sans chrono ni vies).
- **Après chaque réponse** : la bonne réponse, l'explication et la source exacte (bonne pratique ou mesure).
- **Fin de partie** : rang, score, bilan par thème, bons réflexes à revoir, défis manqués avec la bonne réponse ; 🖨 PDF pour l'imprimer.
- **Bons réflexes** : une fiche par thème (16 thèmes), et un entraînement sur un seul thème.
- **Meilleurs scores** de la session, par joueur ou équipe : en mémoire seulement.
- **Fichier de défis à côté du jeu** (1.3.0) : l'éditeur produit `defis_entreprise.css` ; déposé dans le même dossier que `WerbCyberArcade.html` sur un partage de fichiers, il donne les défis de l'entreprise à tous les joueurs dès l'ouverture, sans clic ni autorisation.
- **Défis de l'entreprise** (1.2.0) : l'équipe SMSI du groupe crée ses propres défis dans *⚙️ Administration › Défis de l'entreprise* (formulaires, contrôle, essai), les enregistre dans une base du groupe et les **publie** dans l'espace ; les joueurs les reçoivent, mêlés aux défis du jeu, sans reconstruction ni nouvelle version du module.
- **Défi entre collègues** : un code défi par partie, pour rejouer exactement les mêmes questions ; au bilan, le nom du joueur, une **fiche de score** (image), un **courriel prêt à envoyer** et le message à copier pour Teams.
- **📚 Sources** : références complètes des deux guides et des parties utilisées.

---

## Données et format

- **Base des défis de l'entreprise** (1.2.0) : fichier **`*.werbcyberarcade.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBCYBERARCADE`, schéma 1), niveau groupe, rangé dans `groupe/continuite/`. `data` : `titre` (campagne), `defis` (même format que ci-dessous, avec `source` en texte libre interne), `versionPubliee`, `publieLe`. Verrou et journal du socle. Exemple fictif : `exemples/Exemple.werbcyberarcade.json`.
- **Fichier voisin** `defis_entreprise.css` (1.3.0) : feuille de style qui ne porte que des données — `:root { --wca-defis: "<base 64>"; }`, JSON `{ format: "WERBCYBERARCADE-DEFIS", schema: 1, organisation, titre, version, exporteLe, exportePar, defis }`. Produit par l'éditeur, jamais à modifier à la main. Une page ouverte depuis un dossier ne peut pas lire un `.json` voisin sans autorisation ; une feuille de style voisine, si.
- **Publication** `groupe:defisCyber` (objet unique) : `titre`, `version`, `defis` — relue et contrôlée par le jeu (`sources/src/entreprise.js`).
- Le contenu de base du jeu est intégré au livrable : `sources/src/questions.js` (`window.WCA`) — sources, thèmes et bons réflexes, défis — complété par `sources/src/questions_bibliotheque.js` (bibliothèque importée).

| Champ d'un défi | Description |
|---|---|
| `id` | Identifiant unique (`M…` maison, `T…` travail, `P…` piège, `O…` bon réflexe) |
| `lieu` | `maison` ou `travail` |
| `theme` | Clé d'un des 16 thèmes (`mdp`, `hameconnage`, `usb`, `incident`…) |
| `type` | `qcm`, `vf`, `piege` ou `ordre` |
| `src` | Source : `["famille", n]` (bonne pratique n) ou `["hygiene", n]` (mesure n) |
| `q`, `expl` | Énoncé et explication affichée après la réponse |
| `choix` (qcm) | Quatre réponses, la bonne en premier (mélangées à l'affichage) |
| `vrai` (vf) | Réponse attendue |
| `forme`, `entete`, `indiceEntete`, `segments` (piege) | Scène (`sms`, `courriel`, `site`), expéditeur ou adresse, segments `{ t, s, pq }` : texte, indice ou non, pourquoi |
| `etapes` (ordre) | Étapes dans le bon ordre (mélangées à l'affichage) |

- Les scores ne sont pas des données : ils vivent en mémoire le temps de l'onglet.

---

## Intégration WerbSMSI

- Rubrique : **continuité** (à côté de WerbAcademie, qui suit les formations et les sessions de sensibilisation).
- Niveau : **groupe**.
- Objet **publié** (`publications/werbcyberarcade.json`, bouton *📤 Publier* de l'éditeur) : `groupe:defisCyber`.
- Objet **lu** : `groupe:defisCyber` (par le jeu, chez tous les joueurs qui ouvrent le jeu avec l'espace).
- Base au niveau du groupe : `groupe/continuite/` (dossier réservé à l'équipe SMSI) ; la puce du portail ouvre le jeu avec l'espace (défis chargés sans fenêtre) et propose la base dans l'éditeur.
- Sans espace, le jeu fonctionne seul avec ses 66 défis.
- Le module fonctionne seul, sans le portail ni l'espace WerbSMSI.

---

## Sources et droits

Les défis sont rédigés pour WerbCyberArcade : ils reformulent, sans les recopier, trois guides publics et gratuits, et citent pour certains une référence nommée (norme, texte de loi, bonne pratique reconnue : OWASP, MITRE ATT&CK, RFC, RGPD, Code pénal).

| Guide | Éditeur | Adresse |
|---|---|---|
| Cyber guide famille — 10 bonnes pratiques essentielles (v250331) | Cybermalveillance.gouv.fr | https://www.cybermalveillance.gouv.fr/ |
| Guide d'hygiène informatique — 42 mesures (v2.0, 2017) | ANSSI | https://messervices.cyber.gouv.fr/guides/guide-dhygiene-informatique |
| Les essentiels — hygiène numérique des téléphones mobiles, 10 règles (v1.1, 12/2025) | ANSSI | https://cyber.gouv.fr/ |

Les scènes « Repère le piège » sont fictives : numéros, adresses, noms de personnes et de sites sont inventés.

Musique de fond : « 8-bit Retro » de **Monume**, Pixabay (piste 629800), sous licence de contenu Pixabay (utilisation libre, y compris intégrée à une application ; pas de redistribution du fichier seul). Réencodée pour le jeu ; `sources/assets/musique.mp3` ne doit pas être diffusé à part.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante. Seuls les liens vers les deux guides sources sortent, dans un nouvel onglet, à l'initiative du joueur.
- **Rien n'est enregistré pour les joueurs** : ni réponse, ni score, ni nom de joueur ; seule l'équipe SMSI enregistre la base des défis de l'entreprise, sur le drive protégé. Les scores s'effacent à la fermeture de l'onglet.
- **Rien n'est envoyé sans vous** : le courriel de défi s'ouvre dans votre messagerie (lien `mailto:`), vous choisissez les destinataires et l'envoi ; la fiche de score est un fichier image que vous joignez vous-même.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbCyberArcade.sha256` :

```powershell
Get-FileHash .\application\WerbCyberArcade.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder. Les défis sont dans `sources/src/questions.js` (format décrit en tête du fichier et dans le guide de l'animateur) et dans `sources/src/questions_bibliotheque.js`, **produit** par `python outils\importer_quiz.py <bibliotheque.json>` (ne pas le modifier à la main ; `--verifier` contrôle sans écrire). La musique est dans `sources/src/musique.js`, **produit** par `python outils\encoder_musique.py <piste.mp3>` (ffmpeg requis ; options `--kbps`, `--titre`, `--auteur`, `--origine`, `--licence`).

```powershell
python <WerbSMSI>\charte\outils\werb_charte.py construire .
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_jeu.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

---

## Historique des versions

Version courante : **1.9.0** de novembre 2026 — comptes de l'espace : connexion, lecture seule selon le rôle (socle 1.14.0). Précédente : **1.8.0** de novembre 2026 — difficulté, mode Parcours, attestation de sensibilisation, révision des erreurs, 9 défis pièges et bons réflexes, code défi lié au catalogue. Précédente : **1.7.0** de novembre 2026 — musique de fond rétro intégrée, coupée par défaut. Précédente : **1.6.0** de novembre 2026 — catalogue enrichi : 195 défis, niveaux, essentiels ANSSI des téléphones mobiles, outil d'import. Précédente : **1.5.0** de novembre 2026 — Hacker mode : niveau expert, 24 défis techniques, ambiance terminal. Précédente : **1.4.0** de novembre 2026 — habillage rétro-gaming animé des pages du joueur, sons 8 bits facultatifs ; état des défis de l'entreprise déplacé dans l'administration. Précédente : **1.3.0** de novembre 2026 — fichier de défis `defis_entreprise.css` à côté du jeu, lu sans clic ni autorisation. Précédente : **1.2.0** de novembre 2026 — défis de l'entreprise : éditeur de l'équipe SMSI, base du groupe, publication `groupe:defisCyber` reçue par les joueurs. Précédente : **1.1.0** de novembre 2026 — défi entre collègues : code défi, nom du joueur au bilan, fiche de score en image, courriel prêt à envoyer. Précédente : **1.0.0** de novembre 2026 — première version : 66 défis maison et travail, quatre types de défis, modes arcade et entraînement, bilan et bons réflexes. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbCyberArcade** — Développé par **@WerbHat**
