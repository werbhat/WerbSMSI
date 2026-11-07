<!-- WerbAcademie – Développé par @WerbHat -->
# Mettre en place l'académie du groupe

WerbAcademie sert à **concevoir** les formations et sensibilisations à la sécurité, puis à **prouver** qu'elles ont été suivies : qui a été formé, à quoi, quand, et qui doit être formé à nouveau. Ces preuves répondent aux exigences de la norme ISO 27001 (sensibilisation et formation), de la directive NIS2 (formation des dirigeants, cyberhygiène) et de la norme IEC 62443 (formation du personnel d'exploitation et des prestataires).

L'académie est **une seule base pour tout le groupe** : le catalogue est conçu une fois ; chaque personne est rattachée à un site, ce qui permet de suivre la formation site par site.

---

## 1. Créer l'académie et la rattacher au groupe

1. **✨ Nouvelle académie** : elle contient d'emblée les **six formations proposées** (hygiène numérique, usage de l'IA, clés USB, QR codes, mots de passe, et le rôle des dirigeants, réservée à la population « Dirigeants »).
2. *⚙️ Base › Intégration WerbSMSI* : **Choisir l'espace…** (dossier `SMSI_<SIGLE>`), puis **Rattacher au groupe**. La liste des sites du groupe est copiée dans l'académie.
3. **💾 Enregistrer** dans `groupe/continuite/` de l'espace (par exemple `Academie_<SIGLE>.werbacademie.json`). Déclarez la base dans le portail pour qu'elle apparaisse dans la liste des bases du groupe.

---

## 2. Adapter le catalogue

*🎓 Formations › Catalogue* liste les formations. **📝 Ouvrir** une formation pour la modifier :

- **Présentation** : code, titre, objectif pédagogique, durée, publics visés (tous, ou certaines populations), délai de renouvellement (24 mois par défaut).
- **Chapitres** : chaque chapitre contient des **diapos** (un titre, des points clés — un par ligne — et les **notes de l'animateur**) et des **liens** vers des vidéos, des sites ou des documents. Les flèches ↑ ↓ réordonnent chapitres et diapos.
- **Liens** : une adresse `http` ou `https`. Le lien s'ouvre dans un **nouvel onglet** ; une vidéo en ligne n'est jamais intégrée à la page (la page reste hors ligne). Une vidéo stockée sur le réseau de l'entreprise se cite par son chemin dans les notes de l'animateur.
- **Statut** : *Brouillon* tant qu'elle se prépare, *Publiée* quand elle est prête, *Retirée* quand elle n'est plus donnée (préférable à la suppression : l'historique reste lisible).
- **⬆ Nouvelle version** quand le contenu change de façon notable : les sessions garderont la version suivie, preuve de ce qui a été présenté.

Les formations proposées sont **génériques**. Avant de les donner, complétez au minimum :

- le **contact de signalement** de l'entreprise (support informatique, correspondant cybersécurité) ;
- les **outils autorisés** (IA, partage de fichiers, gestionnaire de mots de passe, partage de secrets) ;
- les **procédures** propres au site (station de décontamination des clés USB, validation des virements).

**⧉ Dupliquer** une formation permet d'en créer une variante (par exemple pour les opérateurs OT) ; **↺ Ajouter les formations proposées manquantes** remet une formation proposée supprimée par erreur.

---

## 3. Recenser les personnes, au minimum nécessaire

*👥 Personnes* : pour chaque collaborateur, **son nom**, son **service ou sa fonction**, sa **population** et son **site**. Rien de plus : pas de matricule, de courriel ni de téléphone.

| Population | Qui |
|---|---|
| Collaborateurs | Toute personne qui utilise un poste ou une messagerie de l'entreprise |
| Administrateurs | Personnes qui administrent des systèmes, des réseaux ou des équipements |
| Dirigeants | Direction générale et directions de site (formation exigée par NIS2) |
| Prestataires | Intervenants extérieurs réguliers (maintenance, intégration) |
| Opérateurs OT | Conduite, maintenance et automatisme des installations industrielles |

**Import CSV** : un fichier avec les colonnes `nom ; fonction ; population ; site` (en-tête facultatif, séparateur `;` ou `,`). **⬇ Modèle CSV** donne un exemple. Un aperçu montre les personnes ajoutées, mises à jour (reconnues par leur nom), les lignes ignorées et les valeurs inconnues avant d'appliquer. Toute autre colonne du fichier est **ignorée**.

**Départs** : décochez « Présente » ; la date de départ est renseignée. La personne reste dans les preuves de formation jusqu'à la fin de la **durée de conservation** (36 mois par défaut, réglable), puis elle est signalée « à supprimer » : **🧹 Supprimer** l'efface ; ses participations restent comptées, sans son nom, et son nom est retiré du journal.

> Ces données sont personnelles : la base se range dans un dossier aux droits restreints, et les indicateurs que l'académie publiera plus tard ne contiendront **aucun nom**.

---

## 4. Animer avec les slides

Dans la fiche d'une formation, la carte **🖥️ Slides** produit la présentation à partir du contenu saisi : page de titre, objectif, programme, une diapo par diapo saisie, liens, quiz, conclusion.

- **🖥️ Présentation HTML** : un seul fichier, qui s'ouvre dans Edge **sans Internet**. Flèches ou clic pour avancer, **F** pour le plein écran, **N** pour le **mode animateur** (vos notes sous la diapo et un chronomètre), **R** pour révéler la réponse d'une question du quiz, **Ctrl+P** pour l'imprimer en PDF (une diapo par page).
- **📊 PowerPoint (.pptx)** : à retoucher dans PowerPoint si besoin ; vos notes sont dans les notes du présentateur, les liens sont cliquables, le corrigé du quiz suit les questions.

Le **logo** de l'entreprise se règle une fois dans *📊 Pilotage › Identification* (logo commun du dossier `modeles/` de l'espace, ou fichier). Modifiez le contenu dans l'éditeur, pas dans les fichiers produits : la prochaine génération reprendrait l'ancien texte.

## 5. Préparer le quiz

Dans la fiche d'une formation, la carte **Quiz** se modifie comme le reste : une question, ses choix (un par ligne), la ou les **bonnes réponses** à cocher et une **explication** qui apparaîtra dans le corrigé. Une question est juste quand toutes ses bonnes réponses, et elles seules, sont cochées. Le **seuil de réussite** (80 % par défaut) fixe le nombre de bonnes réponses exigé.

**📝 Quiz papier (Word)** produit la feuille à distribuer (nom, date, cases à cocher) et, en option, le **corrigé** sur une page à part, réservé à l'animateur.

---

## 6. Animer une session et en garder la preuve

1. *🎓 Formations › Sessions* : choisissez la formation, puis **➕ Session**. La session garde la **version** de la formation, son seuil et son nombre de questions : modifier la formation ensuite ne change pas ce qui a été suivi.
2. Renseignez la **date**, le **site**, le **format** (présentiel, distanciel, e-learning externe), l'**animateur** et le lieu ou l'outil.
3. **➕ Personnes concernées du site** inscrit d'un coup les personnes du site dont la population est visée par la formation ; la liste « Ajouter une personne… » complète une à une.
4. **📄 Feuille d'émargement (Word)** : imprimez-la et faites-la signer. Conservez la feuille signée avec les preuves de formation.
5. Après la session, cochez les **présences** d'après la feuille signée et saisissez le **nombre de bonnes réponses** de chacun : le résultat (réussi, échec) est calculé. Sans quiz, la présence suffit.

Le **modèle Word** de l'entreprise (*⚙️ Base › Modèle Word*) habille l'émargement et le quiz papier de votre en-tête et de votre pied de page.

> Supprimer une personne ne fausse pas les comptes : ses participations restent, sans son nom (« Personne supprimée »).

---

## 7. Suivre qui est à jour

*👥 Personnes › Suivi des formations* répond à la question de l'auditeur : **qui doit être formé, à quoi, et qui est en retard ?**

- Chaque personne présente doit suivre les formations **publiées** qui visent sa **population** : une formation « Tous » concerne tout le monde, la formation des dirigeants ne concerne que les dirigeants. Pour ne plus exiger une formation, passez-la en *Brouillon* ou *Retirée*.
- L'**échéance** est la date de la dernière session **réussie**, plus le délai de renouvellement de la formation (24 mois par défaut, réglable dans sa fiche).
- États : **à jour** ; **à renouveler** (échéance dans moins de 2 mois) ; **en retard** ; **jamais suivie**. Une inscription à une session à venir est signalée.
- **📄 Attestation** (liste des *Personnes*) : un document Word par personne, qui reprend ses formations réussies et, si elle est encore présente, sa situation au regard des formations exigées. À remettre à l'intéressé ou à verser au dossier de preuves : il contient des données personnelles.
- Les synthèses **par site** et **par population** donnent le taux de formations à jour ; les **dirigeants** sont mis en avant, la directive NIS2 (article 20) exigeant leur formation.
- **➕ Session** en tête de colonne crée une session de rattrapage pour les personnes affichées (filtrez d'abord sur un site) qui ne sont pas à jour et pas encore inscrites : il reste à fixer la date.

---

## 8. Publier les indicateurs du groupe

*⚙️ Base › Intégration WerbSMSI*, carte **Publication** : un aperçu montre, par site, les personnes, les formations exigées et leur état, et le taux de formations à jour. **📤 Publier les indicateurs** les écrit dans `publications/werbacademie.json` du groupe (`groupe:formations`).

- **Aucun nom** n'est publié : seulement des comptes et des taux, par site, par population et pour les dirigeants. Sur un petit effectif, une ligne peut toutefois correspondre à une seule personne.
- Publier est une **action explicite** : enregistrez d'abord l'académie ; republiez après chaque campagne de sessions.
- Les indicateurs sont lus par le **portail** (tableau du groupe), **WerbPCR** (objectif R#1 « Responsabilités et sensibilisation »), **WerbNIS2** (articles 20 et 21) et **WerbGouvernance** (revue de direction).
