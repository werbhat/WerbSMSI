# Changelog — WerbVeille

Toutes les évolutions notables de WerbVeille sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

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
