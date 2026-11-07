# Changelog — WerbCartoSI

Toutes les évolutions notables de WerbCartoSI sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [1.5.0] — 2026-11

### Ajouts
- **Trois modèles Visio prioritaires** (`exemples/modeles/`, aussi dans `modeles/schemas/` de l'espace de démonstration), planches A3 prêtes à remplir sur le gabarit de « Sauvegarde et reprise » (dessin, tableau à remplir, légende, cartouche à balises) :
  - **Zones et conduits** (EX-ZONES, EX-CARTO) : zones par criticité (couleurs de WerbMap) et SL-T, conduits et équipements de filtrage, tableau des conduits ;
  - **Accès distants et interconnexions** (EX-ACCES) : tiers et sites extérieurs, point d'entrée unique (VPN, bastion, MFA), zones atteintes, chemins interdits, tableau des accès externes ;
  - **Architecture d'administration** (EX-ADMIN) : poste et réseau d'administration dédiés, bastion, ressources administrées, exceptions, chemin interdit depuis la bureautique, tableau des ressources.
- Modèles décrits dans la bibliothèque des bases d'exemple et de démonstration (type et exigences proposés) ; guide « Préparer les modèles de schémas » complété (modèles fournis, points NIS2 que chacun aide à prouver).

## [1.4.0] — 2026-11

### Ajouts
- **Modèle Visio « Sauvegarde et reprise »** (`exemples/modeles/Modele_sauvegarde_reprise_A3.vstx`, aussi dans `modeles/schemas/` de l'espace de démonstration) pour la catégorie EX-REPRISE : planche A3 prête à remplir — zones, flux de sauvegarde avec leur heure, copie hors ligne mise en évidence, restauration testée (date, durée), ordre de redémarrage en cinq étapes avec RTO et RPO, légende, cartouche à balises. Décrit dans la bibliothèque des bases d'exemple et de démonstration (type « Sauvegarde et reprise », exigence EX-REPRISE).
- Guide « Préparer les modèles de schémas » : les modèles fournis, et ce que l'auditeur lit sur la planche de reprise (points NIS2 CONTINUITE_ACTIVITE.a, c, d, f).

## [1.3.0] — 2026-11

### Ajouts
- **Publication `site:cartographies`** (CSI-9, charte §5.4) : Intégration WerbSMSI › 📤 Publier la couverture, dans `sites/<CODE>/publications/werbcartosi.json` — par catégorie d'exigence, état de couverture et schémas en vigueur (identifiant, titre, type, version, statut, état, classification, dates d'approbation, de revue et prochaine revue, SI, zones, actifs). Ni fichier, ni chemin, ni description, ni périmètre libre, ni historique. Base à enregistrer avant de publier ; dernière publication enregistrée dans la base et tracée au journal.
- **Publication à refaire** signalée quand la couverture publiée ne correspond plus à la base (schéma approuvé, revue dépassée, nouvelle version…) : point d'attention, repère « ! » dans le menu, badge ; couverture jamais publiée signalée de même.
- Lue par le **portail 1.9.0** (vue du site : exigences couvertes et schémas ; vue du groupe : schémas d'architecture par site). Espace de démonstration : publication du site LYON.

### Format de données
- Ajout sans changement de schéma : `publication` (date, auteur, nombres, empreinte du contenu publié).

## [1.2.0] — 2026-11

### Ajouts
- **Liens vers WerbMap** (CSI-7) : `site:si`, `site:zones` et `site:actifs` lus à l'ouverture de l'espace et copiés dans la base (réception tracée au journal) ; fiche du schéma : **périmètre WerbMap** (SI, zones, actifs cochés, filtre des actifs, actifs des SI rappelés) ; référence absente de la dernière publication signalée (fiche et points d'attention) ; **couverture des SI** (page Couverture des exigences, SI sans schéma au tableau de bord) ; filtre du registre par SI.
- **Historique des versions** (CSI-8) : création, approbation (approbateur, date), **revue sans changement** (date de revue du jour, prochaine revue recalculée), **nouvelle version** (version suivante proposée, nature du changement exigée ; un schéma approuvé repasse en brouillon, l'exigence n'est plus couverte tant que la nouvelle version n'est pas approuvée).
- Export Excel : feuilles **Historique des versions** et **Couverture des SI**, colonnes SI, zones et actifs dans la feuille Schémas. Base d'exemple : liens et historique fictifs.

### Format de données
- Ajouts sans changement de schéma : `schemas[].sis`, `zones`, `actifs`, `historique` ; `recus` (copie des publications de WerbMap).

## [1.1.0] — 2026-11

### Ajouts
- **Modèles de schémas** (CSI-5) : bibliothèque des modèles Visio (.vstx, .vsdx) — modèles communs du groupe dans `modeles/schemas/` à la racine de l'espace, modèles du site dans `sites/<CODE>/inventaires/schemas/modeles/` (📁 création du dossier) ; ➕ Décrire (nom, type, exigences et classification proposés), balises du cartouche détectées, balises inconnues signalées ; modèle décrit mais absent signalé ; modèle du poste pour une création ponctuelle.
- **Créer un schéma depuis un modèle** (CSI-6) : nom normalisé `SCH-nnn_Titre_SITE_vX.Y.vsdx`, cartouche rempli (`{{TITRE}}`, `{{ID}}`, `{{SITE}}`, `{{SITE_NOM}}`, `{{ORGANISATION}}`, `{{TYPE}}`, `{{EXIGENCES}}`, `{{VERSION}}`, `{{DATE}}`, `{{AUTEUR}}`, `{{PROPRIETAIRE}}`, `{{CLASSIFICATION}}`, `{{STATUT}}`), aussi dans les propriétés du fichier ; modèle .vstx converti en dessin .vsdx ; enregistrement dans le dossier des schémas (Edge retient le dossier) ; fiche créée en brouillon, liée au fichier, présence vérifiée ; modèle d'origine dans la fiche, l'export et le journal.
- Composant `visio.js` : archives Visio lues et réécrites sans bibliothèque ; seules les parties XML à balises sont recompressées, les autres (images, données binaires) sont recopiées octet pour octet ; balise coupée par une mise en forme reconnue ; fichiers à macros et ancien format refusés.
- **Ouverture directe dans Visio (essai)**, paramètre désactivé par défaut : lien `ms-visio:` d'Office depuis la fiche (adresse web, ou chemin complet depuis la racine déclarée).
- Export Excel : feuille **Modèles** ; guide « Préparer les modèles de schémas » ; modèle Visio d'exemple (A3, cartouche à balises), aussi dans l'espace de démonstration (`modeles/schemas/`).

### Format de données
- Ajouts sans changement de schéma : `modeles` (modèles décrits), `parametres.visioDirect`, `schemas[].modele`. Une base 1.1.0 rouverte en 1.0.0 perd ces ajouts à l'enregistrement.

## [1.0.0] — 2026-11

### Ajouts
- Création du module (rubrique Inventaires ICS, niveau site ; étude `Etude_NEW_WerbCartoSI.md`, pistes CSI-1 à CSI-4) : **registre des schémas d'architecture** d'un site.
- Fiche d'un schéma : titre, type, format, classification, objet, périmètre ; **exigences couvertes** ; propriétaire, responsable de la mise à jour, version ; statut (brouillon, en validation, approuvé, obsolète) avec **approbation** (approbateur exigé, date posée) ; dates de création, de revue, prochaine revue calculée ou saisie.
- **Fichier** : dans l'espace SMSI du site (choix dans le dossier des schémas, présence vérifiée, chemin complet copié depuis la racine déclarée), adresse web ouverte dans un nouvel onglet, chemin réseau copié. Les schémas ne sont jamais copiés dans la base.
- Registre **classé par catégorie d'exigence**, filtres et recherche ; **couverture des exigences** (couverte, à revoir, en cours, non couverte) avec l'attendu et les repères NIS2, ISO/IEC 27001, IEC 62443, ANSSI.
- **Listes de choix du groupe** (charte §5.9) : types de schémas et catégories d'exigence (forme paires), valeurs du site en complément.
- Liste à plat : sélection multiple, archivage (identifiant jamais réattribué), chercher / remplacer, largeur des colonnes (charte §7.7).
- Tableau de bord et points d'attention, export Excel (couverture, schémas par exigence, schémas, archivés), journal, thème clair / sombre, verrou commun, guide « Tenir le registre des schémas d'architecture », base d'exemple fictive (LYON), rangée aussi dans l'espace de démonstration avec un schéma SVG fictif.

### Format de données
- `WERBCARTOSI`, schéma 1 : `schemas`, `archives`, `refs`, `listesGroupe`, `parametres`, `largeurs`.

---

WerbCartoSI — Développé par @WerbHat
