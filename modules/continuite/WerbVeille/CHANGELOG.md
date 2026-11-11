# Changelog — WerbVeille

Toutes les évolutions notables de WerbVeille sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

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
