<!-- WerbVeille – Développé par @WerbHat -->
# Mettre en place la veille d'un site

WerbVeille surveille les sources de sécurité (CERT, éditeurs, actualités) et retient les articles qui parlent **des équipements du site**. La page WerbVeille reste hors ligne : la lecture des flux se fait sur une machine connectée à Internet, avec un **kit de collecte**, et les résultats reviennent dans WerbVeille pour être triés.

## 1. Rattacher la veille à son site

*⚙️ Base › Intégration WerbSMSI* : **Choisir l'espace…**, choisir le site, **Rattacher**. L'inventaire WerbMap du site (marques, modèles, systèmes, firmwares) est reçu. La veille se range dans `sites/<CODE>/continuite/`.

## 2. Choisir les sources

*📡 Veille › Sources* : les **42 sources du Feed.csv d'origine** sont proposées (CERT-FR, CISA, NCSC, éditeurs, actualités ; les lignes commentées du fichier sont inactives). Ajoutez les vôtres, ou **importez un autre Feed.csv** (une ligne « adresse,nom » ; une ligne qui commence par `#` est importée désactivée).

« **Tout garder** » : chaque nouvel article de la source devient une alerte, même sans mot-clé. À réserver aux sources peu bavardes et toujours pertinentes (alertes d'un CERT).

## 3. Choisir les mots-clés

*📡 Veille › Mots-clés* : **Proposer depuis l'inventaire WerbMap** liste les marques, modèles, systèmes et firmwares des actifs du site, avec leurs TAG. Cochez ce qui est utile ; un terme trop général (« Windows ») produit beaucoup d'alertes. Vous pouvez aussi **importer un target_list.txt** (un mot par ligne).

Un mot-clé est cherché **en mot entier**, sans tenir compte des majuscules, des accents ni des tirets : « S7-300 » trouve « s7 300 », mais « S7 » ne trouve pas « MS700 ». Les **exclusions** écartent un article qui cite un terme parasite (« webinaire »).

## 4. Installer le kit de collecte

*🧰 Collecte › Kit de collecte* : **Télécharger le kit**, puis le copier sur une machine **connectée à Internet** (jamais sur le réseau industriel) et y ouvrir **`Deploiement_WerbVeille.html`**. Cette page guide l'installation étape par étape, donne les commandes à copier, vérifie un fichier de résultats source par source et tient le **suivi du déploiement** : enregistrez-le (fichier) puis importez-le dans WerbVeille (*Collecte › Kit de collecte › Déploiements*) pour garder la trace des machines équipées. Le fichier `LISEZMOI.txt` du kit résume :

- le test des sources : `python werbveille_collecteur.py --tester` (adresses, flux valides, sans rien collecter) ;
- l'essai : `python werbveille_collecteur.py --essai` ;
- la planification : `installer_tache.ps1` (Windows, tous les jours à 07:00) ou une ligne cron (Linux) ;
- les notifications Discord ou Teams, facultatives : l'adresse du webhook va dans `secrets.ini`, **sur la machine de collecte seulement**. Aucun secret n'est saisi dans WerbVeille.

Après toute modification des sources, des mots-clés ou des options, le tableau de bord demande de **régénérer le kit** : remplacez alors `config.json` sur la machine de collecte.

## 5. Importer et trier les alertes

Rapportez les fichiers du dossier `resultats/` du kit, puis *🧰 Collecte › Importer des résultats* (plusieurs fichiers à la fois). Une alerte déjà importée n'est pas recréée ; le rapport signale les **flux en erreur** (adresse morte, flux mal formé).

Dans *📊 Pilotage › Alertes*, chaque alerte montre la source, les mots-clés trouvés et les **actifs concernés**. Le titre ouvre l'article dans un nouvel onglet. Donnez un statut :

- **À analyser** : à lire ;
- **Concerné** : le site est exposé ; notez l'analyse et la référence de l'action (plan d'actions, mise à jour) ;
- **Non concerné** : version, configuration ou usage non exposés ;
- **Traitée** : l'action est faite.

Cochez plusieurs alertes pour leur donner le même statut d'un coup.

## Bonnes pratiques

- Importez les résultats au moins une fois par semaine : le tableau de bord signale une collecte de plus de 7 jours.
- Une source en erreur à chaque collecte a probablement changé d'adresse. Lancez `python werbveille_collecteur.py --tester` sur la machine de collecte, puis *📡 Veille › Sources › 🔎 Importer un test des sources* : une source **déplacée** (redirection permanente) propose **↪ Adopter la nouvelle adresse**, une source **en erreur** ou **invalide** propose **⏸ Désactiver**, une source **muette** (rien depuis 90 jours) est à revoir. Régénérez ensuite le kit.
- Pour corriger beaucoup d'adresses, ou donner la même liste à plusieurs sites : **📤 Exporter les sources (JSON)**, corrigez le fichier dans un éditeur, puis **📥 Importer des sources (JSON)** sur chaque veille (*compléter* met à jour les sources reconnues par leur nom et ajoute les nouvelles ; un aperçu montre les changements avant de les appliquer).
- Les alertes « Concerné » alimentent la remédiation : mise à jour (WerbExploitation), action du plan (WerbGouvernance, WerbPCR).
