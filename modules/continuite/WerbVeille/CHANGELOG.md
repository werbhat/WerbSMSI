# Changelog — WerbVeille

Toutes les évolutions notables de WerbVeille sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).




## [1.15.0] — 2026-11

### Ajouts
- **Assistant IA optionnel** (socle 1.15.0, charte §5.12) : bouton « 🤖 Demander à l'assistant » quand l'assistant WerbSMSI.AI est déclaré dans l'espace et que sa passerelle prouve son identité ; questions suggérées et démarche guidée selon l'écran, réponse citée affichée en texte, sources, 👍/👎. Contexte transmis limité au module, à l'écran et au site de la base (aucune donnée de la base). **Sans déclaration, rien n'est affiché et aucune requête n'est émise.**

### Développement
- Socle 1.15.0 ; CSP : `connect-src` limité aux deux adresses de l'assistant (charte §1, §7).

## [1.14.0] — 2026-11

### Modifications
- **Comptes de l'espace** (socle 1.14.0, charte §5.11) : quand le module ouvre un espace qui a des comptes, le ticket transmis par le portail est vérifié ; sans ticket, une fenêtre de connexion s'affiche. Le compte connecté signe le journal et les publications. Une base d'un site sur lequel le compte n'est pas Éditeur s'ouvre en lecture seule (bandeau « Lecture seule · compte … ») ; une publication sans ce rôle est refusée. Hors espace, l'identification reste le nom seul.

### Développement
- Socle 1.14.0 ; tests : espace de démonstration copié sans ses comptes (identification par le nom), socle 1.14.0.

## [1.13.0] — 2026-11

### Modifications
- **Nommage des fichiers exportés** (socle 1.12.0, charte §7.8) : les rapports, classeurs, documents, CSV et PDF produits par le module commencent par le code du groupe et celui du site, « SIGLE-SITE_ » (« SIGLE_ » pour une base du groupe), par exemple `GDI-LYON_…` ; les codes déjà présents dans le nom ne sont pas répétés. Les fichiers de base gardent leur nom ; hors espace (sigle inconnu), les noms ne changent pas. Titres (page, classeur, rapport Word, feuille Informations) : **nom du site** plutôt que son code.

### Développement
- Socle 1.12.0 (`WerbSocle.nommage` : `contexte`, `fichier`, `nomSite`, `libelleSite`, `nomGroupe`).

## [1.12.0] — 2026-11

### Modifications
- **Ouverture directe de la base demandée par le portail** (socle 1.11.0, charte §5.5) : ouvert depuis la puce d'une base du portail WerbSMSI, l'espace étant chargé dans le portail (🔗 Raccourcis), le module ouvre la base aussitôt, sans le bouton « 📂 Ouvrir … ». Si l'espace n'est pas accessible sans fenêtre (raccourci désactivé, autorisation d'Edge à donner), le bouton reste proposé comme avant.

### Développement
- Socle 1.11.0 (`WerbSocle.lien.ouvrirSansClic()`).

## [1.11.0] — 2026-11

### Modifications
- **Identification unique depuis le portail** (socle 1.10.0, charte §5.5) : ouvert depuis le portail WerbSMSI 1.16.0 (bouton *Ouvrir* ou puce d'une base), le module reprend le nom saisi une fois dans le portail ; l'écran « Votre nom » ne s'affiche plus, le journal, les publications et le verrou de la base reçoivent ce nom. Ouvert seul, le module demande le nom comme avant.

### Développement
- Socle 1.10.0 (`WerbSocle.lien.utilisateur()`, nom transmis dans le lien `#werbsmsi=…`, champ `u`).

## [1.10.5] — 2026-11

### Changements
- Guide « WerbVeille Droid : la veille sur téléphone » à jour de l'application 0.9.0 : favoris, mots-clés perso (propres au téléphone, jamais exportés), barres de date.

## [1.10.4] — 2026-11

### Changements
- Guide « WerbVeille Droid : la veille sur téléphone » à jour de l'application 0.8.1 : actualités regroupées par jour, titre et site d'origine en couleur.

## [1.10.3] — 2026-11

### Changements
- Guide « WerbVeille Droid : la veille sur téléphone » à jour de l'application 0.8.0 : taille du texte, KEV et NVD gardés au verrouillage, fonctionnement de la vérification en arrière-plan.
- **Sources par défaut révisées** (`sources_defaut.json`, 35 sources dont 3 inactives, au lieu de 42) : flux morts retirés (Binary Defense, SentinelOne, ATT, ENISA Publications, Microsoft Sentinel, MSRC Security Update, CERT-FR Avis) ; adresses mises à jour : FR-CERT Alertes → `https://www.cert.cyber.gouv.fr/feed/` (flux général du CERT-FR, « tout garder »), VirusBulletin, Microsoft Security, Cyber-News. Ne concerne que les nouvelles veilles : une veille existante garde ses sources (à corriger dans *Sources*, ou par le test des sources). Tests `test_deploiement` et `test_parcours` adaptés.

## [1.10.2] — 2026-11

### Changements
- *Export pour téléphone* : **Exporter…** affiche d'abord une fenêtre qui explique les trois étapes (choisir le fichier de la **clé d'émetteur** `.wvkey.json`, saisir son mot de passe, fichier `.wvdroid.json` téléchargé) avant d'ouvrir le sélecteur de fichiers ; nom du fichier choisi rappelé dans la saisie du mot de passe ; empreinte attendue rappelée si le fichier n'est pas la bonne clé ; rappel des étapes sous la liste des téléphones. Guide du téléphone : étape 4.5 et dépannage complétés.

## [1.10.1] — 2026-11

### Changements
- Guide « WerbVeille Droid : la veille sur téléphone » : schéma du circuit **redessiné** (lecture de haut en bas, sans cadres qui se décalaient selon la police) et **tableau des étapes** (où, ce qui se passe, ce qui circule) ; téléphone du RSSI du groupe (§ 5.8) ; réglages désignés par l'icône ⚙ partout.

## [1.10.0] — 2026-11

### Ajouts
- **Veille du groupe** (VEI-9) : une veille **rattachée au groupe** (*Intégration WerbSMSI* › « 🏢 Groupe », base dans `groupe/continuite/`) relit la publication `site:veille` de chaque site, **en lecture seule** (rien n'est recopié, aucun statut modifié). Menu du groupe :
  - **Tableau des sites** : publication (date, auteur), dernière collecte (retard au-delà de 7 jours), alertes par statut, « Concerné » ouvertes et la plus ancienne, sources en erreur ; site sans publication signalé ;
  - **Alertes des sites** : regroupées par article (même lien) ou par CVE, avec le statut, les actifs et la référence d'action de chaque site ; filtres site et statut, recherche (titre, CVE, mot-clé, site, TAG) ;
  - **Produits et mots-clés** : matrices produits × sites (version de chacun) et mots-clés × sites, produits communs en tête.
- **Export groupe pour le téléphone** du RSSI (VEI-10) : clé d'émetteur et téléphones **du groupe**, parc **schéma 3** — un parc minimal par site, **revalidé** avec les règles de l'export de site, sous son **alias** ; sources d'actualités unies sans doublon. **Alias des sites** : « Site 1 », « Site 2 »… attribués une fois, jamais réattribués, renommables ; un alias qui contient le code ou le nom d'un site, ou déjà pris, est refusé ; la table reste dans la base du groupe et n'est **jamais exportée**.
- Une veille de site (avec alertes) ne peut pas être rattachée au groupe : créer une nouvelle veille.
- Test `tests/test_groupe.py` (34 contrôles) ; vecteur `tests/sortie/export_werbveille_groupe.json` pour WerbVeille Droid 0.7.0.

## [1.9.0] — 2026-11

### Ajouts
- **Publication `site:veille`** (VEI-5) : bouton **Publier** dans *⚙️ Base › Intégration WerbSMSI* (veille rattachée à son site et enregistrée), qui écrit `sites/<CODE>/publications/werbveille.json`. Contenu : **indicateurs** (alertes par statut, « Concerné » ouvertes et la plus ancienne, dernière collecte, sources actives et en erreur, mots-clés actifs), **parc minimal** (mêmes règles que l'export pour téléphone : ni TAG, ni source interne, ni jeton) et **alertes suivies** (À analyser, Concerné, Traitée ; 365 jours, 500 au plus) avec titre et lien de l'article, CVE, actifs concernés (TAG), statut et référence d'action. **Jamais** : commentaires, résumés, journal, alertes Nouvelle et Non concerné (seulement comptées), clé d'émetteur, téléphones. Aperçu avant publication ; date et auteur de la dernière publication gardés dans la base ; journal.
- Première brique de la **veille au niveau groupe** (étude `Etude_NEW_WerbVeille_Groupe.md`) : WerbVeille groupe lira ces publications (VEI-9), puis préparera l'export groupe pour le téléphone du RSSI (VEI-10).
- Test `tests/test_publication.py` (20 contrôles).

## [1.8.2] — 2026-11

### Changements
- Guide « WerbVeille Droid : la veille sur téléphone » à jour de l'application 0.6.0 : page *Parc › Détail des sources*, noms des applications du parc et mots-clés mis en évidence.

## [1.8.1] — 2026-11

### Changements
- Guide « WerbVeille Droid : la veille sur téléphone » à jour de l'application 0.5.0 : mémoire chiffrée des flux KEV et NVD (plus besoin de revérifier pour les revoir), réglage **Conservation** (1, 2, 3 ou 6 mois), première vérification plus longue (un mois de NVD).

## [1.8.0] — 2026-11

### Ajouts
- *Collecte › Export pour téléphone* : l'export transmet aussi les **sources d'actualités** de la veille (parc minimal **schéma 2**, champ `sources` : nom, adresse, catégorie), pour l'onglet **Actu** de WerbVeille Droid 0.4.0. Seules les sources **actives** en **HTTPS sur un domaine public** partent : ni adresse IP, ni port particulier, ni nom interne (`.local`, `.lan`, `.intranet`, `.corp`…), sans doublon, 100 au plus ; les autres sont écartées et comptées dans la carte *Contenu de l'export*. Même règle que l'outil Python et l'application.
- Guide « WerbVeille Droid : la veille sur téléphone » à jour de l'application 0.4.0 : onglet Actu, réglages sous l'icône ⚙, notification des actualités, sources en erreur.

### Compatibilité
- Les téléphones en 0.3.0 refusent un parc de schéma 2 : mettre l'application à jour (0.4.0) avant le prochain export. Un parc de schéma 1 reste lisible par la 0.4.0.

## [1.7.3] — 2026-11

### Changements
- Guide « WerbVeille Droid : la veille sur téléphone » à jour de l'application 0.3.0 : réglage de la vérification automatique (fréquence, Wi-Fi uniquement, notifications), rattrapage sur 30 jours, dépannage.

## [1.7.2] — 2026-11

### Ajouts
- *Collecte › Export pour téléphone* : **lien vers le dossier `APK` du kit WerbSMSI** (application WerbVeille Droid signée, son empreinte SHA-256 et un README), déduit de l'emplacement du module publié ; ailleurs, l'emplacement est indiqué en clair. Guide « WerbVeille Droid : la veille sur téléphone » : installation depuis ce dossier, avec vérification de l'empreinte.

## [1.7.1] — 2026-11

### Ajouts
- **Guide « WerbVeille Droid : la veille sur téléphone »** (`guides/2-WerbVeille_Droid_sur_telephone.md`, menu ❓ Aide, lien depuis *Collecte › Export pour téléphone*) : circuit, rôle de chaque clé et certificat (clé de l'appareil, clé d'émetteur, clé de signature de l'APK, coffre du téléphone) et contrôle des empreintes, mise en service pas à pas, usage quotidien (notifications, onglets, alertes, filtres, recherche, suite à donner), mise à jour du parc, gestion des clés dans la durée (nouveau téléphone, remplacement, perte, renouvellement de la clé d'émetteur), sécurité, messages et solutions, listes de contrôle, glossaire. Recopié du projet WerbVeilleDroid (`outils/synchroniser_guide_werbveille.py`).

## [1.7.0] — 2026-11

### Ajouts
- **Export pour téléphone** (VEI-8) : page **🧰 Collecte › Export pour téléphone**, pour l'application Android **WerbVeille Droid** (projet distinct de WerbSMSI). **Clé d'émetteur** créée dans la page (ECDSA P-256, WebCrypto) : la partie publique et son empreinte sont gardées dans la base, la clé privée est téléchargée dans un fichier `.wvkey.json` chiffré par mot de passe (PBKDF2-SHA256, 600 000 itérations, AES-256-GCM), à ranger dans le coffre-fort, demandé à chaque export. **Téléphones** : certificat enregistré depuis l'application (empreinte affichée à comparer), doublon refusé, retrait = plus d'export possible. **Export** : le parc minimal (mots-clés actifs, exclusions, produits du parc reçus de WerbExploitation — éditeur, produit, version, CPE — et réglages CISA KEV / NVD) est chiffré pour le certificat du téléphone (RSA-OAEP SHA-1 + AES-256-GCM) et signé ; jamais le site, les TAG, les adresses des sources, les jetons, les alertes ni le journal. Option (cochée par défaut) : inclure les produits du parc et la veille NVD sur le téléphone même si la source NVD du collecteur est désactivée — le téléphone télécharge le flux NVD complet et compare en local, aucun nom de produit ne sort. Format `WERBVEILLE-DROID-EXPORT` (WerbVeilleDroid › docs/FORMAT_EXPORT.md), vérifié par l'application.

### Format de données
- Base : `telephones` (`id`, `nom`, `empreinte` SHA-256 du certificat, `certificat` DER en Base64 — public —, `ajouteLe`, `ajoutePar`, `dernierExport`) et `emetteur` (`empreinte`, `cle` publique SPKI en Base64, `creeLe`) ; jamais de clé privée ni de mot de passe. Champs ignorés par les versions antérieures. Fichier de clé : format `WERBVEILLE-CLE-EMETTEUR` (schéma 1).

## [1.6.0] — 2026-11

### Ajouts
- **CVE du NVD** (VEI-7, collecteur 1.4.0) : nouvelle source spécialisée, **désactivée par défaut**. Pour chaque logiciel (et chaque matériel avec CPE) publié par WerbExploitation dans `site:plm`, le collecteur interroge l'API 2.0 du NVD (NIST) : CVE **par CPE** (`virtualMatchString` : toutes les versions concernées), ou **par nom** pour un produit sans CPE si l'option est cochée (rattachement signalé « à vérifier »). Fenêtre : CVE publiées, ou ajoutées au catalogue KEV, pendant la durée de mémoire (119 jours au plus, limite de l'API) ; **score CVSS minimal** réglable (7 par défaut) ; une CVE exploitée (KEV) ou pas encore notée est toujours gardée ; une CVE commune à plusieurs produits ne fait qu'une alerte. Catégorie « Vulnérabilités (NVD) ».
- **Clé d'API NVD** facultative dans `secrets.ini`, section `[nvd]`, clé `cle` (débit de 50 requêtes par 30 secondes au lieu de 5) ; jamais saisie dans WerbVeille ni écrite dans un résultat.
- **CPE proposés** : pour les logiciels sans CPE, le collecteur interroge l'API des produits du NVD et propose jusqu'à cinq formes courtes `cpe:2.3:a:éditeur:produit`, à reporter dans WerbExploitation (champ CPE, 1.24.0).
- **Alertes** : badges CVSS, « exploitée (KEV) », « non noté », « par nom, à vérifier ».
- **Veille › Logiciels et CVE** : chaque produit reçu, son CPE (ou les CPE proposés), ses machines, ses CVE ouvertes, le CVSS le plus élevé, les CVE exploitées et les liens vers le NVD.
- Avertissement dans *Sources* : les noms, versions et CPE des produits du site sont envoyés au NIST (jamais les TAG ni le nom du site).

### Format de données
- `speciales.nvd`, `speciales.cvssMin`, `speciales.nvdParNom` ; `cpeProposes` (`le`, `items`) ; alertes : `cve`, `cvss`, `gravite`, `exploitee`, `fiabilite` ; `recus.plm.items[].cpe`. Résultats du collecteur : `cpeProposes`. Schéma inchangé.

## [1.5.0] — 2026-11

### Ajouts
- **Logiciels installés en mots-clés** : `site:plm` publié par WerbExploitation est lu au rattachement et sur ⟳ Actualiser, copié dans la base (identifiant, nature, éditeur ou fabricant, produit, version, TAG ; ni statut, ni stock, ni fournisseur), réception tracée au journal ; données reçues complétées.
- *Mots-clés › Proposer depuis l'inventaire* : en plus des actifs WerbMap, produit, éditeur + produit et produit + version des logiciels et applicatifs installés (OS compris), avec les TAG des machines et une colonne **Origine** (WerbMap, WerbExploitation) ; l'éditeur seul n'est pas proposé (trop général). Les alertes, y compris celles du catalogue KEV, sont ainsi reliées aux machines qui portent l'applicatif.

### Changements
- `site:plm` ajouté aux objets lus (`module.json`).

## [1.4.0] — 2026-11

### Ajouts
- **Sources spécialisées** (VEI-4), réglées dans *Sources* et exportées dans `config.json` du kit (collecteur 1.3.0) :
  - **catalogue KEV de la CISA** (vulnérabilités exploitées), activé par défaut, croisé avec les mots-clés ; alertes « Vulnérabilités exploitées » avec action demandée, échéance et usage par des rançongiciels ;
  - **revendications de rançongiciels ransomware.live** (API api-pro), désactivé par défaut : pays, secteurs facultatifs, noms surveillés (organisation, filiales, fournisseurs) ; alertes « Rançongiciels ». Jeton personnel dans `secrets.ini` (section `[ransomware_live]`), jamais dans la base ni dans le kit ; avertissement sur les conditions d'utilisation de ransomware.live.
- Catégories « Vulnérabilités exploitées » et « Rançongiciels » ; `secrets.ini.exemple` et LISEZMOI complétés.

### Format de données
- Ajout sans changement de schéma : `speciales` (`kev`, `rancongiciels`, `pays`, `secteurs`, `noms`). Une veille 1.3.0 s'ouvre avec le KEV activé : le kit est signalé à régénérer.

## [1.3.0] — 2026-11

### Ajouts
- **Guide de débutant « La veille de sécurité en clair »** (`guides/0-La_veille_en_clair.md`) : pourquoi une veille sur ses propres équipements, vocabulaire (CVE, CVSS, avis, CERT, exploitation active), bonnes sources, cinq questions pour juger une alerte, suite à donner, erreurs fréquentes.
- Cartes des guides sur l'accueil : lisibles avant d'ouvrir une base.

### Développement
- Test `tests/test_guides.py`.

## [1.2.0] — 2026-10

### Ajouts
- **Sources en JSON** (*Veille › Sources*) : **📤 Exporter les sources** (`*.werbveille-sources.json`, format `WERBVEILLE-SOURCES`) pour corriger les adresses dans un éditeur ou diffuser la liste aux autres sites ; **📥 Importer des sources** : *compléter* (source reconnue par son nom, sinon par son adresse ; les sources absentes du fichier sont gardées) ou *remplacer* la liste, **aperçu avant d'appliquer** (ajoutées, modifiées avec l'ancienne et la nouvelle adresse, inchangées, retirées, lignes ignorées), journal.
- **Test des sources** : le collecteur lancé avec **`--tester`** vérifie chaque source sans rien collecter (inactives comprises) : code HTTP, durée, redirection permanente (source **déplacée**) ou temporaire, flux RSS / Atom valide, articles, date du plus récent (plus de 90 jours : source **muette**) ; rapport `*.werbveille-test.json` (format `WERBVEILLE-TEST`), déjà-vus intacts.
- **🔎 Importer un test des sources** (*Veille › Sources*) : colonne « Dernier test » (état, date, HTTP, durée, message), **↪ Adopter la nouvelle adresse** d'une source déplacée, **⏸ Désactiver** une source en erreur ou invalide, ou **toutes à la fois** ; test d'un autre site refusé ; test effacé quand l'adresse change.
- **Page de déploiement** : nouvelle étape « 4. Tester les sources » (9 étapes) ; le bouton 🔎 de vérification lit aussi un test des sources (état de chaque source dans le tableau).

### Changements
- LISEZMOI du kit : commande `--tester`. Collecteur 1.2.0.
- La page WerbVeille ne contacte toujours aucune source (charte §1) : le test se fait sur la machine de collecte.

### Format de données
- Champ facultatif `test` sur chaque source (dernier test importé). Fichiers `WERBVEILLE-SOURCES` et `WERBVEILLE-TEST`. Schéma inchangé (1) : une base 1.1.0 s'ouvre telle quelle.

### Développement
- Test `tests/test_sources.py` ; `tests/test_collecteur.py` (test des sources sur un serveur HTTP local) et `tests/test_deploiement.py` (9 étapes, vérification d'un test) complétés.

## [1.1.0] — 2026-10

### Ajouts
- **Page de déploiement dans le kit** (`Deploiement_WerbVeille.html`, à ouvrir en premier sur la machine de collecte) : résumé de la configuration, 8 étapes guidées avec les commandes à copier (Python, proxy, copie, essai, première collecte, notifications, planification, retour des résultats), suivi (fait, date, note, machine, installateur, progression), **vérification d'un fichier de résultats** source par source (lue, en erreur et message), suivi enregistré dans un fichier et repris ; rien dans le navigateur, CSP stricte, sans secret.
- **Déploiements** (*Collecte › Kit de collecte*) : import du suivi d'une machine (`*.werbveille-deploiement.json`, autre site refusé), une ligne par machine ; tableau de bord : déploiement en cours, machine sur un kit plus ancien que le dernier généré.

### Changements
- **Sources proposées = le Feed.csv d'origine** : 42 sources (les 3 lignes commentées du fichier sont inactives ; « tout garder » sur les alertes du CERT-FR), dans `sources/src/sources_defaut.json` partagé avec la veille d'exemple. Une veille existante garde ses sources ; **↺ Ajouter les sources proposées manquantes** complète la liste.
- LISEZMOI du kit : la page de déploiement est à ouvrir en premier.

### Format de données
- Champ `deploiements` ; suivi `WERBVEILLE-DEPLOIEMENT`. Schéma inchangé (1).

### Développement
- Test `tests/test_deploiement.py`.

## [1.0.0] — 2026-10

### Ajouts
- Première version de la **veille sur les menaces et les vulnérabilités** d'un site (rubrique Continuité & résilience, niveau site).
- **Sources** (VEI-1) : flux RSS / Atom, catégorie, langue, active, « tout garder » ; sources proposées (reprises du Feed.csv d'origine) ; import d'un Feed.csv.
- **Mots-clés** (VEI-1) : proposés depuis l'inventaire WerbMap (`site:actifs` : marque, modèle, OS, firmware) avec les TAG des actifs ; import d'un target_list.txt ; exclusions.
- **Kit de collecte** (VEI-2) : zip avec le collecteur Python (bibliothèque standard ; RSS et Atom ; mot entier, sans accents ni tirets ; déjà-vus par empreinte ; délai et erreur par flux ; journal ; notifications Discord / Teams facultatives depuis `secrets.ini`, au plus 20 par collecte ; mode essai), `config.json`, `secrets.ini.exemple`, tâche planifiée Windows, LISEZMOI (cron Linux) ; kit à régénérer signalé.
- **Import et tri des alertes** (VEI-3) : résultats `WERBVEILLE-RESULTATS` (plusieurs fichiers, sans doublon, autre site refusé), flux en erreur, historique ; alertes avec lien externe (nouvel onglet), mots-clés, actifs concernés, statut, commentaire, référence d'action, statut d'une sélection ; tableau de bord et points d'attention.
- Journal, bandeau commun (export Excel, PDF), thème clair / sombre, verrou commun, guide « Mettre en place la veille d'un site », veille d'exemple fictive (LYON) rangée aussi dans l'espace de démonstration.

### Format de données
- `WERBVEILLE`, schéma 1 ; configuration `WERBVEILLE-CONFIG`, résultats `WERBVEILLE-RESULTATS`.

---

WerbVeille — Développé par @WerbHat
