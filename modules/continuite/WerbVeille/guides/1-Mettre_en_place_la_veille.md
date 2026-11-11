<!-- WerbVeille – Développé par @WerbHat -->
# Mettre en place la veille d'un site

WerbVeille surveille les sources de sécurité (CERT, éditeurs, actualités) et retient les articles qui parlent **des équipements du site**. La page WerbVeille reste hors ligne : la lecture des flux se fait sur une machine connectée à Internet, avec un **kit de collecte**, et les résultats reviennent dans WerbVeille pour être triés.

## 1. Rattacher la veille à son site

*⚙️ Base › Intégration WerbSMSI* : **Choisir l'espace…**, choisir le site, **Rattacher**. L'inventaire WerbMap du site (marques, modèles, systèmes, firmwares) est reçu. La veille se range dans `sites/<CODE>/continuite/`.

## 2. Choisir les sources

*📡 Veille › Sources* : les **42 sources du Feed.csv d'origine** sont proposées (CERT-FR, CISA, NCSC, éditeurs, actualités ; les lignes commentées du fichier sont inactives). Ajoutez les vôtres, ou **importez un autre Feed.csv** (une ligne « adresse,nom » ; une ligne qui commence par `#` est importée désactivée).

« **Tout garder** » : chaque nouvel article de la source devient une alerte, même sans mot-clé. À réserver aux sources peu bavardes et toujours pertinentes (alertes d'un CERT).

**Sources spécialisées** (en tête de la page *Sources*) :

- **Catalogue KEV de la CISA**, activé par défaut : la liste des vulnérabilités que des attaquants exploitent déjà. Une entrée récente qui cite un de vos mots-clés devient une alerte « Vulnérabilités exploitées », avec l'action demandée et l'échéance de la CISA. C'est souvent l'alerte la plus urgente : traitez-la en premier.
- **Revendications de rançongiciels** (ransomware.live), désactivé par défaut : les victimes revendiquées dans les pays choisis, et celles dont le nom cite votre organisation ou un fournisseur surveillé (une attaque chez un fournisseur peut vous toucher). Il faut un **jeton personnel** (gratuit, sur my.ransomware.live), à coller dans `secrets.ini` de la machine de collecte, section `[ransomware_live]`. Les conditions de ransomware.live soumettent l'usage commercial et la redistribution à leur accord écrit et demandent de citer la source : **faites valider l'usage par votre entreprise avant d'activer**.

## 3. Choisir les mots-clés

*📡 Veille › Mots-clés* : **Proposer depuis l'inventaire** liste les marques, modèles, systèmes et firmwares des actifs du site (WerbMap), et les **logiciels et applicatifs installés** sur les machines, OS compris, avec leur version (WerbExploitation), chacun avec ses TAG. Un applicatif n'est proposé que s'il a une référence dans le registre « Logiciels » de WerbExploitation : créez les références signalées « sans référence », puis republiez depuis WerbExploitation. Cochez ce qui est utile ; un terme trop général (« Windows ») produit beaucoup d'alertes. Vous pouvez aussi **importer un target_list.txt** (un mot par ligne).

Un mot-clé est cherché **en mot entier**, sans tenir compte des majuscules, des accents ni des tirets : « S7-300 » trouve « s7 300 », mais « S7 » ne trouve pas « MS700 ». Les **exclusions** écartent un article qui cite un terme parasite (« webinaire »).

## 4. Installer le kit de collecte

*🧰 Collecte › Kit de collecte* : **Télécharger le kit**, puis le copier sur une machine **connectée à Internet** (jamais sur le réseau industriel) et y ouvrir **`Deploiement_WerbVeille.html`**. Cette page guide l'installation étape par étape, donne les commandes à copier, vérifie un fichier de résultats source par source et tient le **suivi du déploiement** : enregistrez-le (fichier) puis importez-le dans WerbVeille (*Collecte › Kit de collecte › Déploiements*) pour garder la trace des machines équipées. Le fichier `LISEZMOI.txt` du kit résume :

- le test des sources : `python werbveille_collecteur.py --tester` (adresses, flux valides, sans rien collecter) ;
- l'essai : `python werbveille_collecteur.py --essai` ;
- la planification : `installer_tache.ps1` (Windows, tous les jours à 07:00) ou une ligne cron (Linux) ;
- les notifications Discord ou Teams, facultatives : l'adresse du webhook va dans `secrets.ini`, **sur la machine de collecte seulement**. Aucun secret n'est saisi dans WerbVeille.

Après toute modification des sources, des mots-clés ou des options, le tableau de bord demande de **régénérer le kit** : remplacez alors `config.json` sur la machine de collecte.

### Les CVE de vos logiciels (NVD)

Les mots-clés trouvent les articles qui parlent de vos produits ; la source **CVE du NVD** va plus loin : elle interroge la base des vulnérabilités du NIST pour chaque logiciel du site publié par WerbExploitation. Elle est **désactivée par défaut**, car le nom et la version de vos logiciels partent alors vers un service public américain.

1. Dans **WerbExploitation › Référentiel logiciel**, renseignez le champ **CPE (NVD)** de chaque logiciel suivi : la forme courte `cpe:2.3:a:éditeur:produit` couvre toutes les versions (`o` pour un système d'exploitation, par exemple `cpe:2.3:o:microsoft:windows_server_2022`). La fiche propose un lien de recherche vers le dictionnaire CPE du NVD. Republiez.
2. Dans WerbVeille, **⟳ Actualiser** (Intégration WerbSMSI), puis **Sources › Sources spécialisées** : cochez **CVE du NVD** et choisissez le score CVSS minimal (7 : vulnérabilités élevées et critiques). Les CVE exploitées (catalogue KEV) sont toujours gardées.
3. Régénérez le kit. Sans clé d'API, le NVD limite le débit (5 requêtes par 30 secondes) : demandez une clé gratuite et collez-la dans `secrets.ini`, section `[nvd]`.
4. Après une collecte, **Veille › Logiciels et CVE** montre les CVE ouvertes de chaque produit et, pour ceux qui n'ont pas de CPE, les CPE proposés : vérifiez le titre, puis reportez la forme courte dans WerbExploitation.

La recherche **par nom** (option) dépanne pour un produit sans CPE, mais trouve aussi des homonymes : ces alertes portent la mention « par nom, à vérifier ».

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
