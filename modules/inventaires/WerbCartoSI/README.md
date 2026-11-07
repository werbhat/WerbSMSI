# WerbCartoSI

> Registre des schémas d'architecture d'un site : exigences couvertes, versions, revues, approbation, liens vers les fichiers
> Version **1.5.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

NIS2, ISO/IEC 27001, IEC 62443 et l'ANSSI demandent de **disposer de schémas d'architecture à jour** : cartographie du SI, zones et conduits, flux, administration, accès distants, reprise. En audit, il faut montrer que ces schémas existent, qu'ils sont revus et approuvés, et les retrouver. WerbCartoSI tient ce **registre** pour un site : chaque schéma a sa fiche (propriétaire, version, revue, approbation, classification, fichier) et indique **les exigences qu'il permet de démontrer**. Le module ne dessine pas : les schémas restent dans leurs fichiers (Visio, PDF…), rangés de préférence dans l'espace SMSI du site. Il tient aussi la **bibliothèque des modèles Visio** de l'entreprise et crée un schéma depuis un modèle, cartouche rempli.

---

## Contenu du paquet

```
WerbCartoSI/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── LICENSE                      ← licence MIT
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbCartoSI.sha256           ← empreinte de l'application
├── application/
│   └── WerbCartoSI.html         ← l'outil (fichier unique)
├── exemples/
│   ├── Exemple_LYON.werbcartosi.json   ← registre fictif du site LYON (aussi intégré : bouton « Base d'exemple »)
│   └── modeles/
│       ├── Modele_schema_A3_cartouche.vstx   ← modèle Visio d'exemple (A3, cartouche à balises)
│       ├── Modele_zones_conduits_A3.vstx     ← « Zones et conduits » (EX-ZONES)
│       ├── Modele_acces_distants_A3.vstx     ← « Accès distants et interconnexions » (EX-ACCES)
│       ├── Modele_administration_A3.vstx     ← « Architecture d'administration » (EX-ADMIN)
│       └── Modele_sauvegarde_reprise_A3.vstx ← « Sauvegarde et reprise » (EX-REPRISE)
└── guides/
    ├── 1-Tenir_le_registre_des_schemas.md   ← guides, lus dans ❓ Aide
    └── 2-Preparer_les_modeles_de_schemas.md
```

Le dépôt source contient en plus `sources/` et `tests/`.

---

## Démarrage rapide

1. Ouvrir `application/WerbCartoSI.html` dans **Microsoft Edge**, saisir son nom.
2. **🧪 Base d'exemple** pour découvrir, ou **✨ Nouvelle base**.
3. *Intégration WerbSMSI* : ouvrir l'espace, rattacher la base au site, **📁 Créer le dossier des schémas** ; ranger la base dans `sites/<CODE>/inventaires/`.
4. *Référentiels et paramètres* : déclarer la **racine de l'espace** sur le disque.
5. *Registre des schémas* : **➕ Schéma**, compléter la fiche, choisir le fichier.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier.

---

## Fonctionnalités

| Écran | Contenu |
|---|---|
| **Tableau de bord** | Schémas en vigueur, approuvés et à jour, revue dépassée, en cours, exigences couvertes, obsolètes ; points d'attention (exigence non couverte, schéma sans propriétaire, sans lien, introuvable dans l'espace, revue dépassée) ; couverture des exigences |
| **Registre des schémas** | Classé **par catégorie d'exigence** (un schéma qui couvre plusieurs exigences apparaît sous chacune ; « Sans exigence » à classer) ; filtres (exigence, type, statut, revue dépassée) et recherche ; **liste à plat** avec sélection multiple, archivage, chercher / remplacer, largeur des colonnes (charte §7.7) |
| **Fiche d'un schéma** | Titre, type, format, classification, objet, périmètre ; exigences couvertes ; propriétaire, responsable de la mise à jour, version, statut (brouillon, en validation, approuvé, obsolète), approbateur et date (exigés pour « Approuvé »), dates de création, de revue, prochaine revue (calculée : dernière revue + fréquence, ou saisie) ; fichier |
| **Fichier** | *Dans l'espace SMSI du site* : choix parmi les fichiers du dossier des schémas, présence vérifiée, **chemin complet copié** (racine déclarée + chemin dans l'espace) ; *adresse web* (SharePoint, OneDrive, Git) ouverte dans un nouvel onglet ; *chemin réseau* copié |
| **Périmètre WerbMap** | Dans la fiche : SI, zones et actifs (TAG) publiés par WerbMap, cochés (filtre des actifs) ; actifs des SI cochés rappelés ; référence absente de la dernière publication signalée. Données reçues copiées dans la base (travail sans l'espace) |
| **Historique des versions** | Création, approbation (approbateur), revue sans changement (prochaine revue recalculée), **nouvelle version** (version suivante proposée, nature du changement exigée, retour en brouillon : l'exigence n'est plus couverte tant que la version n'est pas approuvée) |
| **Modèles de schémas** | Bibliothèque des modèles Visio (.vstx, .vsdx) : modèles communs du groupe (`modeles/schemas/` à la racine de l'espace) et du site (`sites/<CODE>/inventaires/schemas/modeles/`) ; ➕ Décrire (nom, type, exigences et classification proposés, balises du cartouche détectées, balises inconnues signalées) ; modèle du poste pour une création ponctuelle |
| **Créer depuis un modèle** | Titre, type, classification, version, propriétaire, exigences ; **nom normalisé** `SCH-nnn_Titre_SITE_vX.Y.vsdx` ; cartouche rempli (balises `{{TITRE}}`, `{{ID}}`, `{{SITE}}`, `{{VERSION}}`, `{{DATE}}`, `{{AUTEUR}}`, `{{CLASSIFICATION}}`…, aussi dans les propriétés du fichier) ; enregistrement dans le dossier des schémas (Edge s'en souvient) ; fiche créée en brouillon, liée au fichier, présence vérifiée |
| **Ouverture directe dans Visio** | Essai, désactivé par défaut : lien `ms-visio:` d'Office depuis la fiche d'un schéma Visio (adresse web, ou chemin complet depuis la racine déclarée) |
| **Couverture des exigences** | Par catégorie : couverte, à revoir, en cours, non couverte ; schémas qui la couvrent ; attendu et repères (NIS2, ISO/IEC 27001, IEC 62443, ANSSI) ; **couverture des SI** de WerbMap (SI sans schéma signalé au tableau de bord) ; filtre du registre par SI |
| **Publication** | `site:cartographies` (Intégration WerbSMSI › 📤 Publier la couverture) : par catégorie d'exigence, état de couverture et schémas en vigueur (métadonnées, dates, SI, zones et actifs liés) — ni fichier, ni chemin, ni description ; lue par le portail (vues du site et du groupe) et la fiche SI de WerbMap ; base à enregistrer avant publication ; publication à refaire signalée (point d'attention, menu, badge) |
| **Référentiels et paramètres** | Racine de l'espace, fréquence de revue ; catégories d'exigence et types de schémas : valeurs du groupe 🏢 (listes de choix, charte §5.9) et du site 📍 |
| **Export Excel** | Informations, couverture des exigences, schémas par exigence, schémas (avec SI, zones, actifs), archivés, historique des versions, couverture des SI, modèles : la preuve à fournir en audit |
| **Journal** | Chaque modification (avant / après), enregistrée avec la base |

Catégories d'exigence proposées : cartographie du SI, zones et conduits, flux et cloisonnement, plan d'adressage et réseau physique, architecture d'administration, accès distants et interconnexions, sauvegarde et reprise, locaux techniques et baies.

---

## Données et format

Base JSON `.werbcartosi.json`, format `WERBCARTOSI`, schéma 1, dans l'enveloppe WerbSMSI (meta, verrou, journal, data).

| Clé | Type | Description |
|---|---|---|
| `site` | objet | `nom` du site |
| `schemas` | liste | `id` (SCH-nnn, jamais réattribué), `titre`, `type`, `exigences` (codes), `description`, `perimetre`, `proprietaire`, `responsable`, `version`, `classification`, `format`, `statut`, `creeLe`, `revueLe`, `prochaineRevue`, `approbateur`, `approuveLe`, `lien` (`type` : espace, https ou chemin ; `valeur`), `commentaire`, `modele` (modèle d'origine), `sis`, `zones`, `actifs` (identifiants WerbMap), `historique` (`evenement` : Création, Approbation, Revue, Nouvelle version ; `version`, `precedente`, `date`, `par`, `approbateur`, `commentaire`, `fichier`) |
| `archives` | objet | `schemas` archivés, avec `archive` (`le`, `par`) |
| `refs` | objet | `types` (liste), `exigences` (paires code, libellé) : valeurs du groupe puis du site |
| `listesGroupe` | objet | copie des listes publiées par le groupe (travail sans l'espace) |
| `parametres` | objet | `racine` de l'espace sur le disque, `revueMois`, `visioDirect` (ouverture directe, essai) |
| `recus` | objet | copie des publications de WerbMap : `si`, `zones`, `actifs` (`items`, `majLe`) |
| `publication` | objet | dernière publication : `le`, `par`, `exigences`, `schemas`, `empreinte` (contenu publié, pour signaler une publication à refaire) |
| `modeles` | liste | modèles décrits : `fichier` (chemin dans l'espace), `origine` (groupe, site), `nom`, `type`, `exigences`, `classification`, `description`, `balises`, `inconnues`, `analyseLe` |
| `largeurs` | objet | largeurs des colonnes de la liste à plat |

Les schémas et les modèles ne sont **jamais copiés** dans la base : elle n'en garde que la référence.

---

## Intégration WerbSMSI

- Rubrique **Inventaires ICS**, niveau **site** ; base dans `sites/<CODE>/inventaires/`, schémas dans `sites/<CODE>/inventaires/schemas/`, modèles du site dans `…/schemas/modeles/`, modèles communs dans `modeles/schemas/` à la racine de l'espace (lecture seule pour le module) ; ouverture depuis le portail (`ouvertureParLien`).
- Objets **lus** : `groupe:sites` (rattachement), `groupe:listes` (types et catégories d'exigence, charte §5.9), `site:si`, `site:zones`, `site:actifs` (WerbMap : périmètre des schémas, couverture des SI ; copiés dans la base).
- Objet **publié** : `site:cartographies` dans `sites/<CODE>/publications/werbcartosi.json` (charte §5.4) — par catégorie d'exigence : code, libellé, origine (groupe ou site), état (`couverte`, `arevoir`, `encours`, `non`) et schémas en vigueur (identifiant, titre, type, version, statut, état, classification, dates d'approbation, de revue et prochaine revue, SI, zones, actifs). **Ni fichier, ni chemin, ni description, ni périmètre libre, ni historique.** Lu par le portail, par la fiche SI de WerbMap (1.24.0) et par WerbNIS2 (1.7.0, preuves de la grille d'audit d'un site).

---

## Confidentialité et sécurité

- Un schéma d'architecture décrit le réseau et les points de passage d'un attaquant : il se range dans le dossier du site, réservé à son équipe. La base et l'export Excel se rangent avec les mêmes droits.
- La base ne contient ni le contenu des schémas ni aucun secret ; la classification de chaque schéma est tracée. La publication ne diffuse que des métadonnées (titres, versions, dates, identifiants WerbMap) : ni emplacement des fichiers, ni description de l'architecture.
- Modèles : seuls les fichiers Visio sans macros (.vstx, .vsdx) sont acceptés ; le module les lit sans les modifier et n'écrit le schéma créé qu'à l'endroit choisi dans la fenêtre d'enregistrement d'Edge. Les valeurs du cartouche sont échappées en XML.
- Hors ligne, CSP stricte, rien dans le navigateur ; les liens web s'ouvrent dans un nouvel onglet, sur action de l'utilisateur. Voir [SECURITY.md](SECURITY.md).

---

## Développement

- Module créé avec `werb_charte.py nouveau` et assemblé par `werb_charte.py construire` : `sources/src/index.html` reçoit `style.css` et les scripts `signature.js`, `socle.js`, `guides.js`, `xlsx.js`, `visio.js` (archives Visio et balises), `app.js` (ordre fixé par `module.json › sources`), précédés des guides et de la base d'exemple.

```powershell
python <WerbSMSI>\charte\outils\werb_charte.py construire . --date AAAA-MM-JJ
python tests\test_parcours.py                      # Playwright pour Python, Edge installé
python tests\test_modeles.py
python tests\test_liens_versions.py
python tests\test_publication.py          # --demo : régénère la publication de démonstration
python tests\test_guides.py
python tests\test_theme.py
python tests\test_bandeau.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` contrôle, dans l'espace de démonstration : CSP, base d'exemple (registre par exigence, couverture, points d'attention), rattachement au site LYON, présence des fichiers (présent, introuvable), choix d'un fichier dans le dossier des schémas, chemin complet copié, nouvelle fiche (exigence, approbation refusée sans approbateur puis acceptée, prochaine revue calculée), liste à plat (archivage, désarchivage, chercher / remplacer), référentiels (exigence et type du site), export Excel, enregistrement et relecture, rien dans le navigateur.
- `tests/test_modeles.py` : bibliothèque (modèle du groupe, modèle du site déposé et décrit), création depuis un modèle (nom normalisé, dossier des schémas, fiche pré-remplie), fichier produit (dessin .vsdx, cartouche rempli et échappé, balise coupée par une mise en forme, balise inconnue, parties binaires recopiées), modèle du poste, fichier à macros refusé, ouverture directe dans Visio, feuille Modèles, enregistrement.
- `tests/test_liens_versions.py` : données de WerbMap copiées et reçues (publication modifiée : SI ajouté, actif retiré), référence absente et SI sans schéma signalés, liens et filtres, couverture des SI, revue sans changement, nouvelle version, approbation, export, enregistrement.
- `tests/test_publication.py` : couverture jamais publiée signalée, publication refusée sur une base non enregistrée, fichier publié (enveloppe, une entrée par exigence, états, schémas en vigueur, liens WerbMap), aucune donnée sensible, publication à refaire signalée, republication qui remplace la précédente.
- `tests/test_guides.py`, `tests/test_theme.py`, `tests/test_bandeau.py` : guides, thème clair / sombre, bandeau commun.

---

## Historique des versions

Version courante : **1.5.0** de novembre 2026 — modèles Visio « Zones et conduits », « Accès distants et interconnexions », « Architecture d'administration ». 1.4.0 : modèle « Sauvegarde et reprise ». 1.3.0 : publication de la couverture des exigences (`site:cartographies`). 1.2.0 : liens vers WerbMap, couverture des SI, historique des versions. 1.1.0 : modèles de schémas Visio et création depuis un modèle. 1.0.0 : registre des schémas d'architecture d'un site par catégorie d'exigence. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbCartoSI** — Développé par **@WerbHat**
