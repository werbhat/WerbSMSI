# WerbVeille

> Veille sur les menaces et vulnérabilités d'un site : sources RSS, mots-clés tirés de l'inventaire WerbMap, kit de collecte, tri des alertes
> Version **1.10.5** — Développé par **@WerbHat**

---

## Pourquoi cet outil

Une vulnérabilité publiée sur un automate, un pare-feu ou un système d'exploitation du site doit être repérée tôt. WerbVeille surveille les sources de sécurité (CERT, éditeurs, actualités) et ne retient que les articles qui citent **les équipements du site**, connus par l'inventaire WerbMap.

Il reprend et corrige le script `Werbhat_scan_Cert.py` (flux RSS vers Discord) : la page WerbVeille reste **hors ligne** (charte §1) et pilote un **kit de collecte** à installer sur une machine connectée à Internet. Les résultats reviennent dans WerbVeille, où chaque alerte est triée et reliée aux actifs concernés.

---

## Contenu du paquet

```
WerbVeille/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbVeille.sha256            ← empreinte de l'application
├── application/
│   └── WerbVeille.html          ← l'outil (fichier unique ; le collecteur y est intégré)
├── exemples/                    ← veille d'exemple fictive (site LYON)
└── guides/                      ← guides d'accompagnement (menu ❓ Aide)
    ├── 0-La_veille_en_clair.md ← guide de débutant, lu dans ❓ Aide
    └── 1-Mettre_en_place_la_veille.md
```

---

## Démarrage rapide

1. Ouvrir `application/WerbVeille.html` avec **Microsoft Edge**, directement ou depuis le portail WerbSMSI (rubrique Continuité & résilience).
2. **✨ Nouvelle veille**, puis *⚙️ Base › Intégration WerbSMSI* : rattacher la veille à son site (l'inventaire WerbMap est reçu).
3. *Mots-clés › Proposer depuis l'inventaire*, puis *Collecte › Kit de collecte › Télécharger le kit* ; copier le kit sur une machine connectée et y ouvrir **`Deploiement_WerbVeille.html`**, qui guide et suit l'installation.
4. Rapporter les fichiers de résultats, *Collecte › Importer des résultats*, puis trier les **alertes**. **💾 Enregistrer** dans `sites/<CODE>/continuite/`.

---

## Fonctionnalités

| Menu | Contenu |
|---|---|
| 📊 Pilotage | **Tableau de bord** : alertes par statut, sources et mots-clés actifs, points d'attention (configuration incomplète, kit jamais généré ou à régénérer, aucun import, collecte de plus de 7 jours, flux en erreur, inventaire non reçu), alertes « Concerné ». **Alertes** : date, titre (lien vers l'article, nouvel onglet), source, résumé, mots-clés trouvés, **actifs concernés** (TAG), statut (Nouvelle, À analyser, Concerné, Non concerné, Traitée), commentaire, référence d'action ; filtre par statut, recherche, statut d'une sélection |
| 📡 Veille › Sources | Flux RSS ou Atom : nom, adresse, catégorie, langue, active, **tout garder** (chaque article devient une alerte) ; sources proposées : **les 42 du Feed.csv d'origine** (1.1.0 ; les 3 lignes commentées du fichier sont inactives, « tout garder » sur les alertes du CERT-FR), **↺** ajoute celles qui manquent à une veille existante ; **import d'un Feed.csv** (« adresse,nom », lignes `#` désactivées) ; **📤 export / 📥 import en JSON** (1.2.0, `*.werbveille-sources.json` : corriger les adresses dans un éditeur, diffuser la liste aux autres sites ; *compléter* ou *remplacer*, aperçu avant d'appliquer) ; **🔎 test des sources** (1.2.0) : rapport du collecteur `--tester` importé, colonne « Dernier test » (ok, déplacée, muette, invalide, en erreur ; HTTP, durée, message), **↪ adopter la nouvelle adresse** d'une redirection permanente, **⏸ désactiver** une source morte, une à une ou toutes ensemble |
| 📡 Veille › Mots-clés | Mots-clés et TAG des actifs ; **proposés depuis l'inventaire WerbMap** (marque, modèle, marque + modèle, OS, modèle + firmware) ; **import d'un target_list.txt** ; **exclusions** (termes qui écartent un article) |
| 🧰 Collecte › Kit de collecte | **zip** : **`Deploiement_WerbVeille.html`** (1.1.0, voir ci-dessous), `werbveille_collecteur.py`, `config.json`, `secrets.ini.exemple`, `installer_tache.ps1` (tâche planifiée Windows), `LISEZMOI.txt` (installation, cron Linux) ; options (délai par flux, mémoire des articles vus) ; kit à régénérer signalé quand la configuration change ; **déploiements** : suivis importés, une ligne par machine (étapes faites, kit utilisé, vérification de la collecte), machine sur un kit plus ancien signalée |
| 🧰 Collecte › Importer des résultats | Fichiers `*.werbveille-resultats.json` (plusieurs à la fois) : alertes nouvelles, déjà connues (pas de doublon), flux en erreur ; fichier d'un autre site ou d'un autre format refusé ; historique des imports |
| 🏢 Groupe (veille rattachée au groupe, 1.10.0) | **Tableau des sites**, **Alertes des sites** (par article ou CVE, statut de chaque site), **Produits et mots-clés** × sites — d'après `site:veille`, lecture seule ; **📱 Export groupe pour téléphone** (clé et téléphones du groupe, parc schéma 3) et **Alias des sites** |
| 🧰 Collecte › Export pour téléphone | **Export pour téléphone** (VEI-8) : page **🧰 Collecte › Export pour téléphone**, pour l'application Android **WerbVeille Droid** (projet distinct de WerbSMSI). **Clé d'émetteur** créée dans la page (ECDSA P-256, WebCrypto) : la partie publique et son empreinte sont gardées dans la base, la clé privée est téléchargée dans un fichier `.wvkey.json` chiffré par mot de passe (PBKDF2-SHA256, 600 000 itérations, AES-256-GCM), à ranger dans le coffre-fort, demandé à chaque export. **Téléphones** : certificat enregistré depuis l'application (empreinte affichée à comparer), doublon refusé, retrait = plus d'export possible. **Export** : le parc minimal (mots-clés actifs, exclusions, produits du parc reçus de WerbExploitation — éditeur, produit, version, CPE — et réglages CISA KEV / NVD, et depuis 1.8.0 les **sources d'actualités** actives en HTTPS sur un domaine public, pour l'onglet *Actu*) est chiffré pour le certificat du téléphone (RSA-OAEP SHA-1 + AES-256-GCM) et signé ; jamais le site, les TAG, les sources internes ou non HTTPS, les jetons, les alertes ni le journal. Option (cochée par défaut) : inclure les produits du parc et la veille NVD sur le téléphone même si la source NVD du collecteur est désactivée — le téléphone télécharge le flux NVD complet et compare en local, aucun nom de produit ne sort. Format `WERBVEILLE-DROID-EXPORT` (WerbVeilleDroid › docs/FORMAT_EXPORT.md), vérifié par l'application. |
| ⚙️ Base | Intégration WerbSMSI (rattachement, `site:actifs` de WerbMap, `site:plm` de WerbExploitation, ⟳ Actualiser), journal, à propos |
| ❓ Aide | Guide du module, guides « La veille de sécurité en clair », « Mettre en place la veille d'un site » et « WerbVeille Droid : la veille sur téléphone » (1.7.1) |

Bandeau commun : 📂 Ouvrir, 💾 Enregistrer, 📑 Enregistrer sous…, 📊 Export Excel (informations, alertes, sources, mots-clés), 🖨 PDF, ⏏ Fermer.

### La page de déploiement (kit de collecte, 1.1.0)

`Deploiement_WerbVeille.html` s'ouvre dans un navigateur, sur la machine de collecte, sans Internet ni installation :

- **résumé de la configuration** du kit (site, date, sources actives, mots-clés) et tableau des sources ;
- **9 étapes guidées** — vérifier la machine (Python), proxy, copie du kit, **test des sources** (1.2.0), essai, première collecte, notifications, planification, retour des résultats — avec les **commandes à copier** ;
- **suivi** : étape faite (date), note par étape, machine, installateur, barre de progression ;
- **vérification d'un fichier de résultats** : alertes, sources lues et **sources en erreur** avec leur message, reportées dans le tableau des sources ; ou d'un **test des sources** (1.2.0) : état de chaque source (ok, déplacée, muette, invalide, en erreur) ;
- **💾 Enregistrer le suivi** (`*.werbveille-deploiement.json`) et **📂 Reprendre un suivi** : rien n'est conservé par le navigateur (charte §1) ; le suivi s'importe ensuite dans WerbVeille (*Collecte › Kit de collecte › Déploiements*).

### Le collecteur (kit de collecte)

- Python 3.10 ou plus récent, **bibliothèque standard seulement** (rien à installer) ; flux RSS 2.0, RSS 1.0 et Atom.
- Mot-clé cherché **en mot entier** dans le titre et le résumé, sans tenir compte des majuscules, des accents ni des tirets (« S7-300 » = « s7 300 » ; « S7 » ne trouve pas « MS700 »).
- **Déjà-vus** par empreinte de l'identifiant ou du lien (pas par date : une date aberrante ne bloque plus un flux), purgés après la durée choisie.
- Délai d'attente et taille limitée par flux ; un flux en erreur est noté dans le résultat et dans `collecte.log`, la collecte continue.
- Notifications **Discord ou Teams** facultatives (au plus 20 par collecte), adresses dans `secrets.ini` sur la machine de collecte ; jamais dans WerbVeille.
- **Sources spécialisées** (1.4.0, collecteur 1.3.0, réglées dans *Sources › Sources spécialisées*) :
  - **catalogue KEV de la CISA** (vulnérabilités activement exploitées, JSON public), **activé par défaut** : les entrées ajoutées pendant la durée de mémoire des déjà-vus qui citent un mot-clé (fournisseur, produit, nom, description) deviennent des alertes « Vulnérabilités exploitées » (action demandée, échéance CISA, usage connu par des rançongiciels, TAG des actifs) ;
  - **CVE du NVD** (API 2.0 du NIST, 1.6.0), **désactivé par défaut** : CVE des logiciels et matériels publiés par WerbExploitation (`site:plm`), par **CPE** (toutes versions concernées) ou par nom (option, « à vérifier ») ; CVE publiées ou ajoutées au catalogue KEV pendant la mémoire (119 jours au plus) ; score CVSS minimal (7 par défaut), CVE exploitées et non notées toujours gardées ; CPE proposés pour les produits sans CPE ; clé d'API facultative dans `secrets.ini` (`[nvd] cle`). Vue **Veille › Logiciels et CVE**.
  - **revendications de rançongiciels de ransomware.live** (API api-pro), **désactivé par défaut** : victimes des pays choisis (mois en cours et précédent, secteurs facultatifs) et victimes dont le nom ou le site cite un **nom surveillé** (organisation, filiales, fournisseurs) ; alertes « Rançongiciels ». Il faut un **jeton personnel** (my.ransomware.live), dans `secrets.ini`, section `[ransomware_live]`, sur la machine de collecte : jamais dans WerbVeille. Les conditions de ransomware.live soumettent l'usage commercial et la redistribution à leur accord écrit et demandent de citer la source : faire valider l'usage par l'entreprise avant d'activer.
- `--essai` affiche le résultat sans rien écrire ni mémoriser.
- `--tester` (1.2.0) **teste les sources sans rien collecter** (inactives comprises) : code HTTP, durée, redirection (une redirection **permanente** 301 / 308 = source **déplacée**, nouvelle adresse proposée), flux RSS / Atom valide ou non, nombre d'articles, date du plus récent (plus de 90 jours = source **muette**) ; rapport `resultats/AAAA-MM-JJ_HHMMSS.werbveille-test.json` (format `WERBVEILLE-TEST`) à importer dans WerbVeille. Les déjà-vus ne sont pas touchés.
- La page WerbVeille ne contacte jamais les sources : le test se fait sur la machine de collecte, comme la collecte (charte §1, page hors ligne et CSP stricte).

Corrections par rapport à `Werbhat_scan_Cert.py` : script qui ne démarrait pas (adresses de webhook dans le code), dépendances pip (`feedparser`, `requests`, `bs4`), aucun délai d'attente, arrêt sur un flux en erreur, flux bloqué par une date future, sous-chaîne au lieu du mot entier, message en double par mot trouvé, pause après chaque article.

---

### 📚 Guides d'accompagnement

Dans **❓ Aide**, dans la page *Guide du module* et sur l'accueil, même sans base ouverte (lecteur commun, charte §7.4). Le premier guide, **« La veille de sécurité en clair »** (1.3.0), explique le sujet à un débutant : pourquoi une veille sur ses propres équipements, vocabulaire (CVE, CVSS, avis, CERT, exploitation active), bonnes sources, cinq questions pour juger une alerte, suite à donner, erreurs fréquentes.

## Données et format

- Une base est un fichier **`*.werbveille.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBVEILLE`, schéma 1).
- Contenu de `data` :

| Clé | Type | Description |
|---|---|---|
| `veille` | objet | `nom`, `responsable` |
| `sources` | tableau | `nom`, `url`, `categorie`, `langue`, `actif`, `tout` ; `test` (1.2.0) : dernier test importé — `etat`, `le`, `machine`, `http`, `ms`, `redirection`, `urlFinale`, `articles`, `dernier`, `message` |
| `mots` | tableau | `mot`, `tags` (TAG des actifs), `origine` (`inventaire` ou `manuel`), `actif` |
| `exclusions`, `options` | tableau, objet | termes d'exclusion ; `delai` (s), `joursConserves` |
| `alertes` | tableau | `id` (empreinte de l'article), `source`, `categorie`, `titre`, `lien`, `date`, `resume`, `mots`, `actifs`, `statut`, `commentaire`, `action`, `recueLe`, `par` |
| `imports` | tableau | historique : fichier, date, machine de collecte, articles, nouvelles, flux en erreur |
| `kit` | objet | date et empreinte de la configuration du dernier kit |
| `deploiements` | tableau | suivis importés : machine, installateur, kit utilisé, étapes faites, vérification de la collecte (1.1.0) |
| `recus.actifs` | objet | copie de l'inventaire WerbMap reçu (`site:actifs`) |
| `alias` | tableau | veille du groupe (1.10.0) : `code` du site et son `alias` sur le téléphone du RSSI — jamais exporté |
| `publication` | objet | dernière publication `site:veille` (1.9.0) : `le`, `par`, `alertes` (nombre d'alertes suivies publiées) |
| `telephones` | tableau | téléphones destinataires de l'export (1.7.0) : `nom`, `empreinte` (SHA-256 du certificat), `certificat` (public, Base64), `ajouteLe`, `ajoutePar`, `dernierExport` |
| `emetteur` | objet | partie publique de la clé d'émetteur (1.7.0) : `empreinte`, `cle` (SPKI, Base64), `creeLe` — la clé privée reste dans le fichier `.wvkey.json` du coffre-fort |
| `cpeProposes` | objet | CPE proposés par la dernière collecte NVD pour les produits sans CPE (1.6.0) : produit, éditeur, version, candidats (CPE, titre) |
| `recus.plm` | objet | copie des références installées publiées par WerbExploitation (`site:plm`, 1.5.0) : identifiant, nature (matériel ou logiciel, OS compris), éditeur ou fabricant, produit, version, TAG ; ni statut, ni stock, ni fournisseur |

- **Configuration du kit** (`config.json`, format `WERBVEILLE-CONFIG`), **résultats** (`WERBVEILLE-RESULTATS` : `meta` avec date, machine et site de collecte, `articles`, `erreurs`, `sources`) **suivi de déploiement** (`WERBVEILLE-DEPLOIEMENT` : machine, étapes, notes, vérification), **test des sources** (`WERBVEILLE-TEST`, 1.2.0 : `meta` avec date, machine et site, `sources` avec l'état de chacune) et **liste de sources** (`WERBVEILLE-SOURCES`, 1.2.0 : `meta`, `sources` ; un fichier `{ "sources": [...] }` comme `sources_defaut.json` est aussi accepté).
- Formats anciens encore lisibles : *aucun*.

---

## Intégration WerbSMSI

- Rubrique **Continuité & résilience**, niveaux **site** (veille du site, bases dans `sites/<CODE>/continuite/`) et **groupe** (1.10.0 : consolidation des sites en lecture seule et export groupe pour le téléphone du RSSI, base dans `groupe/continuite/`) ; ouverture depuis le portail (`ouvertureParLien`).
- Objets **lus** : `site:actifs` (WerbMap : marques, modèles, OS, firmwares, TAG), `site:veille` de chaque site (veille du groupe, 1.10.0, lecture seule), `site:plm` (WerbExploitation, 1.5.0 : logiciels et applicatifs installés, OS compris, avec éditeur, produit, version et TAG des machines ; seuls les logiciels qui ont une référence dans le registre « Logiciels » de WerbExploitation sont publiés), `groupe:sites`. Copiés dans la base : la veille reste complète hors espace.
- Objets **publiés** : `site:veille` (1.9.0, bouton **Publier** de *Intégration WerbSMSI*) — indicateurs (alertes par statut, collecte, sources en erreur), parc minimal (règles de l'export pour téléphone : ni TAG, ni source interne) et alertes suivies (À analyser, Concerné, Traitée) avec actifs (TAG), statut et référence d'action ; ni commentaire, ni résumé, ni journal. Lu par WerbVeille groupe (prévu, VEI-9), WerbMap et WerbExploitation (prévus).
- Le module fonctionne seul, sans le portail ni l'espace WerbSMSI.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la CSP de la page bloque toute connexion sortante ; la page ne lance jamais la collecte. Un lien d'alerte s'ouvre dans un nouvel onglet sur clic de l'utilisateur (`noopener noreferrer`, `http` / `https` seulement : charte §1, *Liens externes*).
- **Kit hors navigateur** (charte §1) : échanges par fichiers, secrets (webhooks, jeton ransomware.live, clé NVD) seulement sur la machine de collecte.
- **Source NVD** (1.6.0) : quand elle est activée, le collecteur envoie au NIST le **nom, la version et le CPE** des logiciels et matériels du site — la liste du parc sort donc vers un service public. Jamais les TAG, le nom du site ni les numéros de série.
- **Rien dans le navigateur** : les données restent en mémoire puis dans votre fichier.
- **La protection réelle est celle du dossier** où vous rangez la base.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbVeille.sha256` :

```powershell
Get-FileHash .\application\WerbVeille.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

```powershell
python outils\exemples.py --demo                                   # veille d'exemple, rangée aussi dans l'espace de démonstration
python sources\build.py                                            # intègre aussi collecteur.py, deploiement.html, sources_defaut.json
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_collecteur.py                                    # collecteur seul, sur les flux de tests\donnees (sans Internet)
python tests\test_parcours.py                                      # Playwright pour Python et Microsoft Edge
python tests\test_guides.py
python tests\test_deploiement.py
python tests\test_sources.py
python tests\test_speciales.py
python tests\test_plm.py
python tests\test_nvd_collecteur.py
python tests\test_nvd.py
python tests\test_theme.py
python tests\test_bandeau.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_collecteur.py` exécute le collecteur sur des flux locaux fictifs (RSS, Atom, flux cassé, date en 2122) : bibliothèque standard seulement, mot entier, accents et tirets, exclusions, « tout garder », TAG, date aberrante ignorée, flux en erreur sans arrêt, déjà-vus, mode essai, aucune notification sans secrets, configuration étrangère refusée ; **test des sources** (`--tester`, 1.2.0) sur un serveur HTTP local : flux valide, redirection 301 (déplacée) et 302 (gardée), 404, page web au lieu d'un flux, source muette, source inactive testée, rien collecté.
- `tests/test_collecteur.py` (1.4.0) : sources spécialisées sur un serveur local — catalogue KEV (fenêtre de la mémoire, mots-clés, usage par des rançongiciels), ransomware.live (jeton absent ou refusé noté en erreur, en-tête `X-API-KEY`, pays et noms surveillés, victime ancienne écartée, jeton jamais écrit, déjà-vus).
- `tests/test_speciales.py` (1.4.0) : réglages des sources spécialisées (KEV activé, ransomware.live désactivé par défaut, avertissement, pays contrôlés, noms surveillés, kit refusé sans pays ni nom), kit (config.json sans jeton, section `[ransomware_live]` de secrets.ini.exemple, LISEZMOI), import de résultats du collecteur 1.3.0, enregistrement et relecture.
- `tests/test_nvd_collecteur.py` (1.6.0) : source NVD contre une API simulée — fenêtre de 119 jours, pagination, score minimal, KEV et non notées gardées, CVE ancienne écartée, fusion des produits, recherche par nom, CPE proposés, clé d'API (en-tête, jamais écrite), HTTP 403, déjà-vus.
- `tests/test_nvd.py` (1.6.0) : réglages NVD, kit (produits, CPE, `[nvd]`), import d'un résultat NVD (badges), vue Logiciels et CVE, CPE proposés, enregistrement.
- `tests/test_groupe.py` (1.10.0) : veille du groupe — rattachement (veille de site refusée), menu du groupe, tableau des sites (alias, publication, collecte en retard), alertes regroupées par article avec le statut de chaque site, filtres et recherche, produits communs, alias (refus d'un alias qui trahit un site ou en double, renommage), export groupe (clé du groupe, parc schéma 3 déchiffré, règles propres à chaque site, revalidation, sources unies, ni code ni nom de site ni TAG), base du groupe sans donnée de site, journal.
- `tests/test_publication.py` (1.9.0) : publication `site:veille` — Publier inactif sans espace ou sans enregistrement, fichier écrit au bon endroit (format, portée, module), indicateurs, parc minimal sans TAG ni source interne, alertes suivies seulement avec actifs et sans commentaire ni résumé, rien de sensible, date de publication gardée, journal.
- `tests/test_telephone.py` (1.7.0) : export pour téléphone — clé d'émetteur (mot de passe trop court ou mal confirmé, fichier chiffré), téléphone de test fictif (empreinte, doublon, fichier non certificat), mauvais mot de passe et clé altérée refusés, export vérifié et déchiffré comme le fait l'application (signature, RSA-OAEP, AES-GCM), parc sans site ni TAG, retrait, base sans clé privée ni mot de passe.
- `tests/test_plm.py` (1.5.0) : `site:plm` de WerbExploitation reçu au rattachement ; propositions de mots-clés (produit, éditeur + produit, produit + version, avec les TAG des machines et l'origine ; l'éditeur seul n'est pas proposé ; mot-clé commun à WerbMap et WerbExploitation fusionné) ; publication modifiée relue ; copie dans la base sans statut, stock ni fournisseur.
- `tests/test_parcours.py` parcourt la chaîne complète : rattachement et inventaire, mots-clés proposés et importés, Feed.csv, **kit téléchargé puis son collecteur exécuté** sur les flux locaux, import des résultats (doublons, autre site, fichier étranger), liens externes, statuts, kit à régénérer, enregistrement et relecture, veille d'exemple.
- `tests/test_deploiement.py` (1.1.0, 1.2.0) : sources du Feed.csv d'origine (42, dont 3 inactives) ; page de déploiement du kit (CSP, résumé, 9 étapes, commandes, suivi, vérification d'un test des sources puis d'un résultat source par source, suivi enregistré puis repris, rien dans le navigateur) ; suivi importé dans WerbVeille, déploiement en cours et kit plus ancien signalés.
- `tests/test_sources.py` (1.2.0) : export des sources en JSON ; import *compléter* (aperçu : ajoutée, adresse modifiée, désactivée, ligne invalide ignorée) et *remplacer* (annulé) ; autre format refusé ; test des sources importé (ok, déplacée, muette, invalide, en erreur ; autre site refusé), nouvelle adresse adoptée, sources mortes désactivées une à une puis ensemble, test effacé quand l'adresse change ; base enregistrée et relue, journal.
- `tests/test_theme.py` et `tests/test_bandeau.py` : thème sombre et clair, bandeau commun.
- Sources proposées : `sources/src/sources_defaut.json` (Feed.csv d'origine), partagé par l'application et `outils/exemples.py`.
- Composants tiers figés dans `sources/vendor/bibliotheques.js` (identique aux autres modules) : **JSZip 3.10.1** (licence MIT) pour le zip du kit. `socle.js` et `guides.js` sont des copies conformes de la charte ; `xlsx.js` est la version commune des modules.

---

## Historique des versions

Version courante : **1.10.5** de novembre 2026 — guide du téléphone à jour (application 0.9.0). Versions précédentes : **1.10.4** de novembre 2026 — guide du téléphone à jour (application 0.8.1). Versions précédentes : **1.10.3** de novembre 2026 — guide du téléphone à jour (application 0.8.0). Versions précédentes : **1.10.2** de novembre 2026 — export pour téléphone : étapes expliquées avant le choix du fichier de clé. Versions précédentes : **1.10.1** de novembre 2026 — guide du téléphone : schéma du circuit plus lisible, tableau des étapes. Versions précédentes : **1.10.0** de novembre 2026 — veille du groupe (tableau des sites, alertes des sites, produits et mots-clés, lecture seule) et export groupe pour le téléphone du RSSI (alias, schéma 3). Versions précédentes : **1.9.0** de novembre 2026 — publication `site:veille` pour le groupe (indicateurs, parc minimal, alertes suivies). Versions précédentes : **1.8.2** de novembre 2026 — guide du téléphone à jour (détail des sources, applications mises en évidence : application 0.6.0). Versions précédentes : **1.8.1** de novembre 2026 — guide du téléphone à jour (mémoire des flux et conservation réglable de l'application 0.5.0). Versions précédentes : **1.8.0** de novembre 2026 — sources d'actualités dans l'export pour téléphone (onglet Actu de l'application 0.4.0, parc schéma 2). Versions précédentes : **1.7.3** de novembre 2026 — guide du téléphone à jour (réglages de l'application 0.3.0). Versions précédentes : **1.7.2** de novembre 2026 — lien vers l'application à installer (dossier APK du kit). Versions précédentes : **1.7.1** de novembre 2026 — guide « WerbVeille Droid : la veille sur téléphone ». Versions précédentes : **1.7.0** de novembre 2026 — export chiffré et signé pour l'application WerbVeille Droid. Versions précédentes : **1.6.0** de novembre 2026 — CVE du NVD par CPE (source spécialisée), CPE proposés, vue Logiciels et CVE. Versions précédentes : **1.5.0** de novembre 2026 — logiciels et applicatifs installés reçus de WerbExploitation (`site:plm`) proposés comme mots-clés. Versions précédentes : **1.4.0** de novembre 2026 — sources spécialisées du collecteur : catalogue KEV de la CISA et revendications de rançongiciels ransomware.live (désactivé par défaut, jeton personnel). Versions précédentes : **1.3.0** de novembre 2026 — guide de débutant « La veille de sécurité en clair ». Versions précédentes : **1.2.0** d'octobre 2026 — sources en JSON (export, import compléter / remplacer), test des sources (collecteur `--tester`, rapport importé : adresse déplacée adoptée, source morte désactivée), étape « Tester les sources » dans la page de déploiement. Version précédente : **1.1.0** d'octobre 2026 — page de déploiement dans le kit (guide et suivi sur la machine de collecte, suivi importable), sources par défaut = Feed.csv d'origine. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbVeille** — Développé par **@WerbHat**
