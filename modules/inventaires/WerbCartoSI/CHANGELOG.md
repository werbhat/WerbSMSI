# Changelog — WerbCartoSI

Toutes les évolutions notables de WerbCartoSI sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).





## [1.14.2] — 2026-11

### Changements
- Guide « Les schémas attendus un par un » : référentiel NIS2 cité sans numéro de version.

## [1.14.1] — 2026-11

### Changements
- Repères des catégories d'exigence et guides : repères écrits « NIS2 5.A.1-EI/EE » ; le référentiel est nommé **NIS2** partout.

## [1.14.0] — 2026-11

### Modifications
- **Repères NIS2 aux identifiants du référentiel NIS2** (WerbNIS2 1.12.0) : les catégories d'exigence et les guides citent les identifiants des moyens acceptables de conformité du référentiel NIS2 (5.A.1-EI/EE, 7.A.1-EI/EE à 7.A.4-EE, 13.1-EI/EE…) à la place des points de la grille 2025 (CARTOGRAPHIE.a, CLOISONNEMENT.a…) ; le suffixe EI/EE ou EE indique si la mesure est attendue d'une entité importante.

## [1.13.0] — 2026-11

### Modifications
- **Nommage des fichiers exportés** (socle 1.12.0, charte §7.8) : les rapports, classeurs, documents, CSV et PDF produits par le module commencent par le code du groupe et celui du site, « SIGLE-SITE_ » (« SIGLE_ » pour une base du groupe), par exemple `GDI-LYON_…` ; les codes déjà présents dans le nom ne sont pas répétés. Les fichiers de base gardent leur nom ; hors espace (sigle inconnu), les noms ne changent pas. Schémas Visio créés depuis un modèle : nom proposé préfixé de même. Titres (page, classeur, rapport Word, feuille Informations) : **nom du site** plutôt que son code.

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

## [1.10.3] — 2026-11

### Changements
- Fiche d'un schéma › *Périmètre WerbMap* : les cases des **systèmes d'information** liés affichent le nom du SI seul, sans son identifiant (repli sur l'identifiant si le SI n'a pas de nom). Zones et actifs gardent leur identifiant (TAG).

## [1.10.2] — 2026-11

### Changements
- Les SI sont désormais affichés par leur **nom** seul partout où l'identifiant technique apparaissait encore (repli sur l'identifiant si le SI n'a pas de nom) : tableau « Par système d'information » du détail d'une exigence et du dossier de preuve, liste de filtre par SI, choix du périmètre de l'ébauche « Zones et conduits » (et mention du périmètre dans l'ébauche et la fiche créée), points d'attention du tableau de bord. L'identifiant reste la clé des liens, des données et du journal.

## [1.10.1] — 2026-11

### Changements
- *Couverture des exigences › Couverture par SI (WerbMap)* : chaque SI est affiché par son **nom** seul, sans son identifiant technique (repli sur l'identifiant si le SI n'a pas de nom) ; de même dans le détail d'une case et le formulaire « Déclarer non applicable » d'un SI. L'identifiant reste la clé des liens et des données.

## [1.10.0] — 2026-11

### Ajouts
- **Ébauche « Zones et conduits » depuis WerbMap** (*Modèles de schémas*) : premier schéma dessiné à partir des données publiées par WerbMap, pour tout le site ou pour un SI — zones rangées du moins au plus critique (couleurs de WerbMap, SL-T, nombre d'actifs), actifs de chaque zone (TAG · libellé, « … et n autres » au-delà de la place), conduits entre zones (sens publié, pare-feu tiré de la matrice de flux ; conduit sans pare-feu en rouge pointillé ; tracé à angles droits), tableau des conduits (pare-feu, flux autorisés, règles à examiner), légende, cartouche rempli (identifiant, site, exigences, version 0.1, propriétaire, auteur, classification). **Aperçu** dans le module, **⬇ Aperçu SVG**, **✨ Créer le schéma** : dessin Visio `.vsdx` A3 paysage (mêmes conventions que les modèles), nom normalisé, enregistré dans le dossier des schémas ; fiche créée en brouillon (type « Zones et conduits », EX-ZONES, EX-CARTO, SI et zones liés, historique). Une ébauche se reprend à la main : elle se compare au terrain avant approbation (contrôles avant approbation).
- `visio.js` : paquet `.vsdx` complet d'une page (dessin), à partir de formes. Nouveau composant `ebauche.js`.

### Tests
- `tests/test_ebauche.py` (`--visio` : le fichier produit est ouvert par Visio, automation COM).

## [1.9.0] — 2026-11

### Ajouts
- **Annexe « Matrice des flux »** : dans la fiche d'un schéma `EX-FLUX` ou `EX-ZONES`, les règles actives de la matrice de flux de WerbMap (`site:flux`, WerbMap 1.30.0, copiées dans la base) dont une extrémité est représentée par le schéma (actifs liés, des SI et des zones liés) : source et destination avec leur zone, protocole, port, action, pare-feu, justification. Points **à examiner** (jamais corrigés ici : la matrice se corrige dans WerbMap) : flux autorisé entre zones sans pare-feu désigné, sans justification, « any », adresse saisie au lieu d'un TAG. Point d'attention pour un schéma de flux en vigueur. **📊 Annexe Excel** (informations du schéma et matrice), classée Diffusion restreinte.
- **Dossier de preuve** (📊 Pilotage) : document imprimable à remettre à l'auditeur — en-tête (site, date, auteur, base, classification, couverture), synthèse, puis une page par catégorie d'exigence : objectif, repères, portée, décision de non-applicabilité, schémas en vigueur (version, statut et raisons de revoir, propriétaire, approbateur et date, contrôles faits, dernière et prochaine revue, **empreinte SHA-256**), couverture par SI, matrice des flux pour `EX-FLUX`. Filtre par exigence, matrice facultative, 🖨 Imprimer / PDF.

### Tests
- `tests/test_flux_dossier.py`.

## [1.8.0] — 2026-11

### Ajouts
- **Empreinte du fichier approuvé** : à l'approbation, l'empreinte SHA-256 du fichier du schéma est relevée dans l'espace (ou, pour un lien web ou réseau, depuis le fichier du poste : 📂). Elle est revérifiée à l'ouverture de l'espace, à la revue et sur demande (🔎) ; un **fichier modifié depuis l'approbation** fait passer le schéma « à revoir » (point d'attention, badge), la **revue sans changement est refusée** ; « Approuver à nouveau » ou 📌 Nouvelle version. Empreinte gardée dans l'historique (colonne Empreinte) ; rien du fichier n'est copié dans la base.
- **Contrôles avant approbation** : passer un schéma à « Approuvé » ouvre la liste du guide (cartouche, légende, TAG, chemins interdits, exceptions, aucun secret, comparaison au terrain, exigences) ; les 8 contrôles sont exigés et inscrits dans l'historique avec l'approbation.
- **Revue déclenchée par WerbMap** : instantané du périmètre (actifs représentés : liés, des SI liés, des zones liées ; conduits qui touchent leurs zones) pris à l'approbation et à chaque revue ; quand la publication de WerbMap change (actif ou conduit ajouté ou retiré), le schéma passe « à revoir » avec la liste des écarts (fiche, point d'attention) ; ✔ Revue faite reprend l'instantané et trace les écarts examinés. `site:conduits` lu et copié dans la base.
- **Échéances** (📊 Pilotage) : revues des schémas approuvés et des non-applicabilités — en retard, dans l'horizon (30, 60, 90 ou 180 jours), au-delà ; indicateur « Revues dans les 60 jours » au tableau de bord ; menu signalé pour les revues à moins de 30 jours ; feuille Excel *Échéances*.
- Portail : colonne « Revues à venir (60 j) » dans les schémas d'architecture par site (dates de revue déjà publiées).

### Modifications
- Un schéma approuvé est « à revoir » pour l'une de ces raisons, affichées en badges : revue dépassée, WerbMap a changé, fichier modifié.
- Une nouvelle version efface l'empreinte et l'instantané (relevés à la prochaine approbation ; les précédents restent dans l'historique).

### Tests
- `tests/test_revues.py` ; tests du parcours, des liens et de la publication : approbation par les contrôles.

## [1.7.0] — 2026-11

### Ajouts
- **Non applicable, justifié** : une catégorie d'exigence se déclare non applicable pour le site (*Couverture des exigences*, colonne Applicabilité) ou pour un SI (case du tableau par SI). Justification, fonction qui décide et date exigées ; revue à la même fréquence que les schémas (✔ Revue faite, point d'attention quand elle est dépassée), retrait ; journal. Une exigence non applicable sort du décompte des exigences couvertes et n'est plus signalée « non couverte ».
- **Couverture par SI** (*Couverture des exigences*) : pour chaque SI publié par WerbMap, une case par catégorie attendue — couverte, à revoir, en cours, absente, non applicable — selon la **portée** de la catégorie (chaque SI, SI sensibles, le site : réglable dans *Référentiels et paramètres*, `EX-CARTO` pour chaque SI, `EX-ZONES`, `EX-FLUX`, `EX-ADMIN`, `EX-REPRISE` pour les SI sensibles par défaut) et la **sensibilité** du SI (D, I ou C au seuil réglable, zone process ou métier critique, SL-T 2 et plus, actif critique ; D, I, C non cotés : sensible par prudence). Une case est couverte par un schéma approuvé et à jour lié au SI ou à l'une de ses zones. Détail au clic (raison, schémas, non-applicabilité). Point d'attention « schéma attendu absent » et indicateur au tableau de bord.
- Publication `site:cartographies` : état `na` et décision `nonApplicable` (justification, fonction, dates) ; schéma de publication de la charte mis à jour. Lu par le portail et WerbNIS2 1.8.1.
- Export Excel : portée et non-applicabilité dans *Couverture des exigences* ; sensibilité et une colonne par catégorie attendue dans *Couverture des SI* ; feuille *Non-applicabilités*.
- Données reçues de WerbMap : D, I, C des SI, criticité et SL-T des zones, criticité des actifs.

### Modifications
- **Ancien libellé renommé** : une base qui propose encore « Flux et cloisonnement » pour `EX-FLUX` passe à « Flux et filtrage » à l'ouverture (journal ; base à enregistrer). Si la liste publiée par le groupe garde l'ancien libellé, elle reste prioritaire : à corriger dans le portail (*Administration › Listes de choix du groupe*).
- Guide « Tenir le registre des schémas » : nouvelle section *Couverture par SI et exigences non applicables*.

### Tests
- `tests/test_applicabilite.py` : renommage, sensibilité, matrice, non-applicabilité (SI et site, champs exigés, revue, retrait), portée et seuil, publication, export, relecture.

## [1.6.0] — 2026-11

### Ajouts
- **Guide « Les schémas attendus, un par un »** (❓ Aide) : pour chacune des 8 catégories d'exigence, l'objectif du schéma, les questions de l'auditeur, un **exemple annoté** (image), ce que montre l'exemple point par point, ce qu'il ne faut pas mettre dans le schéma, et un tableau de repères ; correspondance entre types de schémas et catégories ; ordre conseillé ; liste de contrôle avant approbation.
- **Huit exemples annotés** (`guides/images/*.svg`) dessinés sur une usine fictive (« Site EXEMPLE ») : cartographie, zones et conduits, flux et filtrage, plan d'adressage et réseau physique, administration, accès distants, sauvegarde et reprise, locaux techniques. Repères numérotés, conventions des modèles Visio (couleurs de criticité de WerbMap, filtrage en sarcelle, chemins interdits en rouge pointillé), cartouche. Agrandis au clic. Produits par `outils/generer_illustrations.py`.
- **Codes « EX- » expliqués** : EX = exigence (catégorie de ce que le schéma démontre, ni un exemple ni un numéro de schéma) — encadré dans *Couverture des exigences*, rappel dans *Référentiels et paramètres* et dans la fiche (objectif de chaque exigence au survol), lien vers le guide.

### Corrections
- **Repères des catégories d'exigence** revus et précisés : codes des objectifs de sécurité NIS2 de l'ANSSI (ceux de WerbNIS2 : RECENSEMENT_SI, CARTOGRAPHIE.a, CLOISONNEMENT.a à d, g, h, FILTRAGE.a et b, COMPTES_ADMIN, ADMINISTRATION.a, g, h, ACCES_DISTANTS.a, ECOSYSTEME.a, CONTINUITE_ACTIVITE.a, c, d, f, ACCES_PHYSIQUES.b) ; ISO/IEC 27001:2022 complétée (A.8.5, A.8.14, A.8.15, A.5.19 à A.5.22, A.6.7, A.7.11, A.7.12) ; IEC 62443 précisé (ZCR 1, ZCR 3, SR 1.1, SR 2.1, SR 2.8, SR 7.3, SR 7.4, SR 7.8 au lieu de « SR 1.x ») ; guide d'hygiène de l'ANSSI : cartographie = **mesure 4** (et non 3), mesures 7, 19, 22, 23, 25 à 29, 37 citées. Objectif de chaque catégorie réécrit.
- Libellé proposé de `EX-FLUX` : « Flux et filtrage » (au lieu de « Flux et cloisonnement », le cloisonnement relevant de `EX-ZONES`). Les bases existantes gardent leur libellé ; les codes ne changent pas.

### Développement
- Lecteur de guides **1.3.0** (composant de la charte) : images des guides intégrées en `data:` par `werb_charte.py construire`.

### Outils
- **Générateur des modèles Visio** dans le dépôt (CSI-18) : `outils/generer_modeles.py` produit les 5 modèles d'exemple (cartouche, zones et conduits, accès distants, administration, sauvegarde et reprise) dans la référence `WerbSMSI/Modeles_docs/Visio/`, à l'octet près identiques aux modèles livrés ; option `--apercu` (aperçu SVG pour relire sans Visio). Test `tests/test_generateur.py`. Paquet publié inchangé (le dossier `outils/` n'est pas livré).
- **Générateur des exemples annotés** : `outils/generer_illustrations.py`.

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
