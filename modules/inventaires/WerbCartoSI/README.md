# WerbCartoSI

> Registre des schémas d'architecture d'un site : exigences couvertes, versions, revues, approbation, liens vers les fichiers
> Version **1.14.2** — Développé par **@WerbHat**

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
    ├── 2-Preparer_les_modeles_de_schemas.md
    ├── 3-Les_schemas_attendus_un_par_un.md  ← objectif de chaque catégorie d'exigence, exemple annoté, repères
    └── images/                              ← exemples annotés (SVG, site fictif), intégrés au livrable
```

Le dépôt source contient en plus `sources/`, `tests/` et `outils/`.

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
| **Tableau de bord** | Schémas en vigueur, approuvés et à jour, revue dépassée, en cours, exigences couvertes (hors non applicables), schémas attendus par SI couverts, obsolètes ; points d'attention (exigence non couverte, SI sans schéma ou schéma attendu absent pour un SI, non-applicabilité à revoir, schéma sans propriétaire, sans lien, introuvable dans l'espace, revue dépassée) ; couverture des exigences |
| **Registre des schémas** | Classé **par catégorie d'exigence** (un schéma qui couvre plusieurs exigences apparaît sous chacune ; « Sans exigence » à classer) ; filtres (exigence, type, statut, revue dépassée) et recherche ; **liste à plat** avec sélection multiple, archivage, chercher / remplacer, largeur des colonnes (charte §7.7) |
| **Fiche d'un schéma** | Titre, type, format, classification, objet, périmètre ; exigences couvertes ; propriétaire, responsable de la mise à jour, version, statut (brouillon, en validation, approuvé, obsolète), approbateur et date (exigés pour « Approuvé »), dates de création, de revue, prochaine revue (calculée : dernière revue + fréquence, ou saisie) ; fichier |
| **Fichier** | *Dans l'espace SMSI du site* : choix parmi les fichiers du dossier des schémas, présence vérifiée, **chemin complet copié** (racine déclarée + chemin dans l'espace) ; *adresse web* (SharePoint, OneDrive, Git) ouverte dans un nouvel onglet ; *chemin réseau* copié |
| **Périmètre WerbMap** | Dans la fiche : SI, zones et actifs (TAG) publiés par WerbMap, cochés (filtre des actifs) ; actifs des SI cochés rappelés ; référence absente de la dernière publication signalée. Données reçues copiées dans la base (travail sans l'espace) |
| **Approbation** | **Contrôles avant approbation** (8 cases, toutes exigées : cartouche, légende, TAG, chemins interdits, exceptions, aucun secret, comparaison au terrain, exigences), inscrits dans l'historique ; **empreinte SHA-256** du fichier relevée dans l'espace (ou depuis un fichier du poste pour un lien web ou réseau) ; **instantané du périmètre WerbMap** (actifs représentés, conduits de leurs zones) |
| **Revue déclenchée** | Un schéma approuvé passe **à revoir** quand sa revue est dépassée, quand **WerbMap a changé** depuis l'instantané (actifs ou conduits ajoutés ou retirés, listés dans la fiche) ou quand le **fichier a été modifié** depuis l'approbation (empreinte différente, vérifiée à l'ouverture de l'espace, à la revue ou sur un fichier du poste) ; revue sans changement refusée si le fichier a changé ; « Approuver à nouveau » |
| **Matrice des flux** | Annexe de la fiche d'un schéma `EX-FLUX` ou `EX-ZONES` : règles actives de la matrice de flux de WerbMap (`site:flux`) dont une extrémité est représentée par le schéma — source et destination avec leur zone, protocole, port, action, pare-feu, justification ; **à examiner** : flux entre zones sans pare-feu, sans justification, « any », adresse saisie ; point d'attention ; **annexe Excel** (`SCH-nnn_Matrice_flux_SITE_date.xlsx`) |
| **Dossier de preuve** | 📊 Pilotage : en-tête (site, date, auteur, classification), synthèse, puis **une page par catégorie d'exigence** — objectif, repères, portée, non-applicabilité, schémas en vigueur (version, statut, propriétaire, approbation, contrôles, revue, **empreinte SHA-256**), couverture par SI, matrice des flux ; filtre par exigence, matrice facultative ; 🖨 Imprimer / PDF |
| **Échéances** | Revues des schémas approuvés et des non-applicabilités : en retard, dans l'horizon choisi (30 à 180 jours), au-delà ; indicateur « revues dans les 60 jours » au tableau de bord, menu signalé à 30 jours |
| **Historique des versions** | Création, approbation (approbateur), revue sans changement (prochaine revue recalculée), **nouvelle version** (version suivante proposée, nature du changement exigée, retour en brouillon : l'exigence n'est plus couverte tant que la version n'est pas approuvée) |
| **Modèles de schémas** | Bibliothèque des modèles Visio (.vstx, .vsdx) : modèles communs du groupe (`modeles/schemas/` à la racine de l'espace) et du site (`sites/<CODE>/inventaires/schemas/modeles/`) ; ➕ Décrire (nom, type, exigences et classification proposés, balises du cartouche détectées, balises inconnues signalées) ; modèle du poste pour une création ponctuelle |
| **Créer depuis un modèle** | Titre, type, classification, version, propriétaire, exigences ; **nom normalisé** `SCH-nnn_Titre_SITE_vX.Y.vsdx` ; cartouche rempli (balises `{{TITRE}}`, `{{ID}}`, `{{SITE}}`, `{{VERSION}}`, `{{DATE}}`, `{{AUTEUR}}`, `{{CLASSIFICATION}}`…, aussi dans les propriétés du fichier) ; enregistrement dans le dossier des schémas (Edge s'en souvient) ; fiche créée en brouillon, liée au fichier, présence vérifiée |
| **Ébauche depuis WerbMap** | *Modèles de schémas* : schéma « Zones et conduits » généré à partir de WerbMap (tout le site ou un SI) — zones colorées par criticité avec leur SL-T, actifs (TAG · libellé), conduits (sens, pare-feu de la matrice ; sans pare-feu : rouge pointillé), tableau des conduits, légende, cartouche rempli ; **aperçu** dans le module, **⬇ aperçu SVG**, **✨ Créer le schéma** : dessin Visio `.vsdx` A3 enregistré dans le dossier des schémas, fiche brouillon (EX-ZONES, EX-CARTO, SI et zones liés). Une ébauche se reprend à la main et se compare au terrain avant approbation |
| **Ouverture directe dans Visio** | Essai, désactivé par défaut : lien `ms-visio:` d'Office depuis la fiche d'un schéma Visio (adresse web, ou chemin complet depuis la racine déclarée) |
| **Couverture des exigences** | Par catégorie : couverte, à revoir, en cours, non couverte, **non applicable** ; schémas qui la couvrent ; portée, attendu et repères (NIS2, ISO/IEC 27001, IEC 62443, ANSSI) ; **couverture par SI** de WerbMap : sensibilité du SI (D, I, C, zones, actifs critiques) et une case par exigence attendue (chaque SI ou SI sensibles), détail au clic ; filtre du registre par SI |
| **Non applicable, justifié** | Exigence écartée pour le site ou pour un SI : justification, fonction qui décide et date exigées ; revue à la même fréquence que les schémas (✔ Revue faite), retrait ; sort du décompte, publiée avec sa justification |
| **Publication** | `site:cartographies` (Intégration WerbSMSI › 📤 Publier la couverture) : par catégorie d'exigence, état de couverture et schémas en vigueur (métadonnées, dates, SI, zones et actifs liés) — ni fichier, ni chemin, ni description ; lue par le portail (vues du site et du groupe) et la fiche SI de WerbMap ; base à enregistrer avant publication ; publication à refaire signalée (point d'attention, menu, badge) |
| **Référentiels et paramètres** | Racine de l'espace, fréquence de revue, seuil D, I, C d'un SI sensible ; catégories d'exigence (avec leur **portée** : chaque SI, SI sensibles, le site) et types de schémas : valeurs du groupe 🏢 (listes de choix, charte §5.9) et du site 📍 |
| **Export Excel** | Informations, couverture des exigences, schémas par exigence, schémas (avec SI, zones, actifs), archivés, historique des versions (avec l'empreinte), couverture des SI (sensibilité, une colonne par exigence attendue), non-applicabilités, échéances, modèles : la preuve à fournir en audit |
| **Journal** | Chaque modification (avant / après), enregistrée avec la base |

Catégories d'exigence proposées — **EX = exigence** : ce qu'un schéma doit démontrer, quel que soit son dessin (ni un exemple, ni un numéro de schéma, qui est `SCH-nnn`) :

| Code | Catégorie | Ce que le schéma démontre |
|---|---|---|
| `EX-CARTO` | Cartographie du SI | quels SI existent, qui en répond, leur criticité, leurs interconnexions, les exclusions justifiées |
| `EX-ZONES` | Zones et conduits | zones de même exigence (criticité, SL-T), conduits identifiés et filtrés |
| `EX-FLUX` | Flux et filtrage | chaque flux autorisé, son sens, l'équipement qui le filtre, sa justification |
| `EX-RESEAU` | Plan d'adressage et réseau physique | baies, liens, ports, VLAN par zone |
| `EX-ADMIN` | Architecture d'administration | postes, comptes et réseau d'administration dédiés, bastion, exceptions justifiées |
| `EX-ACCES` | Accès distants et interconnexions | point d'entrée unique, authentification multifacteur, cible et durée de chaque accès |
| `EX-REPRISE` | Sauvegarde et reprise | sauvegardes, copie hors ligne, test de restauration, ordre de redémarrage (RTO, RPO) |
| `EX-LOCAUX` | Locaux techniques et baies | accès aux locaux, alimentation, climatisation, incendie, câblage |

Chaque catégorie porte ses **repères** précis : codes des objectifs de sécurité NIS2 de l'ANSSI (ceux de WerbNIS2), articles de la directive, mesures de l'ISO/IEC 27001:2022, exigences IEC 62443-3-2 (ZCR) et 62443-3-3 (SR), mesures du guide d'hygiène de l'ANSSI. Le guide **« Les schémas attendus, un par un »** donne pour chacune l'objectif, les questions de l'auditeur, un **exemple annoté** sur un site fictif et ce qu'il ne faut pas mettre dans le schéma.

---

## Données et format

Base JSON `.werbcartosi.json`, format `WERBCARTOSI`, schéma 1, dans l'enveloppe WerbSMSI (meta, verrou, journal, data).

| Clé | Type | Description |
|---|---|---|
| `site` | objet | `nom` du site |
| `schemas` | liste | `id` (SCH-nnn, jamais réattribué), `titre`, `type`, `exigences` (codes), `description`, `perimetre`, `proprietaire`, `responsable`, `version`, `classification`, `format`, `statut`, `creeLe`, `revueLe`, `prochaineRevue`, `approbateur`, `approuveLe`, `lien` (`type` : espace, https ou chemin ; `valeur`), `commentaire`, `modele` (modèle d'origine), `sis`, `zones`, `actifs` (identifiants WerbMap), `historique` (`evenement` : Création, Approbation, Revue, Nouvelle version ; `version`, `precedente`, `date`, `par`, `approbateur`, `commentaire`, `fichier`, `empreinte`, `controles`), `empreinte` (`sha256`, `taille`, `le`, `version`, `source` : espace ou poste — fichier approuvé), `instantane` (`le`, `actifs`, `conduits` — périmètre WerbMap à l'approbation ou à la dernière revue) |
| `archives` | objet | `schemas` archivés, avec `archive` (`le`, `par`) |
| `refs` | objet | `types` (liste), `exigences` (paires code, libellé) : valeurs du groupe puis du site |
| `listesGroupe` | objet | copie des listes publiées par le groupe (travail sans l'espace) |
| `parametres` | objet | `racine` de l'espace sur le disque, `revueMois`, `visioDirect` (ouverture directe, essai), `seuilDIC` (SI sensible, 3 par défaut), `portees` (portée des exigences qui diffère de la valeur proposée : `si`, `sensibles`, `site`) |
| `nonApplicables` | liste | `exigence`, `si` (vide : tout le site), `justification`, `decidePar` (fonction), `decideLe`, `revueLe` |
| `recus` | objet | copie des publications de WerbMap : `si` (avec `d`, `i`, `c`), `zones` (avec `criticite`, `slt`), `actifs` (avec `criticite`), `conduits` (`de`, `vers`), `flux` (règles de la matrice : `src`, `dst`, `zoneSrc`, `zoneDst`, `proto`, `port`, `action`, `fw`, `justification`) (`items`, `majLe`) |
| `publication` | objet | dernière publication : `le`, `par`, `exigences`, `schemas`, `empreinte` (contenu publié, pour signaler une publication à refaire) |
| `modeles` | liste | modèles décrits : `fichier` (chemin dans l'espace), `origine` (groupe, site), `nom`, `type`, `exigences`, `classification`, `description`, `balises`, `inconnues`, `analyseLe` |
| `largeurs` | objet | largeurs des colonnes de la liste à plat |

Les schémas et les modèles ne sont **jamais copiés** dans la base : elle n'en garde que la référence.

---

## Intégration WerbSMSI

- Rubrique **Inventaires ICS**, niveau **site** ; base dans `sites/<CODE>/inventaires/`, schémas dans `sites/<CODE>/inventaires/schemas/`, modèles du site dans `…/schemas/modeles/`, modèles communs dans `modeles/schemas/` à la racine de l'espace (lecture seule pour le module) ; ouverture depuis le portail (`ouvertureParLien`).
- Objets **lus** : `groupe:sites` (rattachement), `groupe:listes` (types et catégories d'exigence, charte §5.9), `site:si`, `site:zones`, `site:actifs`, `site:conduits`, `site:flux` (WerbMap : périmètre des schémas, instantané et revue déclenchée, annexe « Matrice des flux » (WerbMap 1.30.0), couverture des SI ; copiés dans la base).
- Objet **publié** : `site:cartographies` dans `sites/<CODE>/publications/werbcartosi.json` (charte §5.4) — par catégorie d'exigence : code, libellé, origine (groupe ou site), état (`couverte`, `arevoir`, `encours`, `non`, `na`), décision de non-applicabilité (`nonApplicable` : justification, fonction, dates) et schémas en vigueur (identifiant, titre, type, version, statut, état, classification, dates d'approbation, de revue et prochaine revue, SI, zones, actifs). **Ni fichier, ni chemin, ni description, ni périmètre libre, ni historique.** Lu par le portail, par la fiche SI de WerbMap (1.24.0) et par WerbNIS2 (1.7.0, preuves de la grille d'audit d'un site ; état `na` lu depuis la 1.8.1).

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
python tests\test_applicabilite.py        # non applicable, couverture par SI
python tests\test_revues.py               # empreinte, contrôles, revue déclenchée par WerbMap, échéances
python tests\test_flux_dossier.py         # annexe « Matrice des flux », dossier de preuve
python tests\test_ebauche.py              # ébauche « Zones et conduits » ; --visio : fichier ouvert par Visio (COM)
python tests\test_guides.py
python tests\test_theme.py
python tests\test_bandeau.py
python tests\test_generateur.py        # modèles Visio reproductibles
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` contrôle, dans l'espace de démonstration : CSP, base d'exemple (registre par exigence, couverture, points d'attention), rattachement au site LYON, présence des fichiers (présent, introuvable), choix d'un fichier dans le dossier des schémas, chemin complet copié, nouvelle fiche (exigence, approbation refusée sans approbateur puis acceptée, prochaine revue calculée), liste à plat (archivage, désarchivage, chercher / remplacer), référentiels (exigence et type du site), export Excel, enregistrement et relecture, rien dans le navigateur.
- `tests/test_ebauche.py` : carte « Ébauche » (sans WerbMap : message ; aperçu SVG : zones, actifs, conduit, pare-feu, cartouche), périmètre d'un SI, création (archive Visio valide : dessin A3, formes, ni balise ni adresse ; fiche brouillon : type, exigences, SI et zones, historique ; fichier dans le dossier des schémas), publication plus grande (6 zones sur deux rangées, conduit sans pare-feu en pointillé, sens double), aperçu SVG ; `--visio` : le fichier est ouvert par Visio installé sur le poste (automation COM, export PNG).
- `tests/test_flux_dossier.py` : règles de flux reçues de WerbMap ; annexe d'un schéma de flux et de zones (règles du périmètre, points à examiner), absente d'un schéma de sauvegarde ; point d'attention ; annexe Excel ; dossier de preuve (en-tête, une section par exigence, approbation et empreinte, couverture par SI, matrice, filtre, impression, PDF de plusieurs pages) ; règles copiées sans adresse.
- `tests/test_revues.py` : empreinte relevée dans l'espace (égale au SHA-256 du fichier), instantané pris à la revue, publication WerbMap modifiée (schéma à revoir, écarts, exigence à revoir, point d'attention, revue qui reprend l'instantané), fichier modifié (signalé, revue sans changement refusée, nouvelle approbation : contrôles tous exigés, nouvelle empreinte), fichier du poste comparé, approbation depuis le statut (contrôles d'abord, annulation), nouvelle version (empreinte effacée), échéances (retard, horizon, menu, indicateur), feuille Échéances, enregistrement.
- `tests/test_applicabilite.py` : ancien libellé renommé à l'ouverture, sensibilité d'un SI reçue de WerbMap, couverture SI × exigence (colonnes selon la portée, cases, détail), point d'attention d'un schéma attendu absent, non-applicabilité d'un SI et du site (justification, fonction, date exigées ; revue ; retrait ; journal), indicateurs hors non applicables, portée et seuil, publication (état `na`), export Excel, relecture.
- `tests/test_modeles.py` : bibliothèque (modèle du groupe, modèle du site déposé et décrit), création depuis un modèle (nom normalisé, dossier des schémas, fiche pré-remplie), fichier produit (dessin .vsdx, cartouche rempli et échappé, balise coupée par une mise en forme, balise inconnue, parties binaires recopiées), modèle du poste, fichier à macros refusé, ouverture directe dans Visio, feuille Modèles, enregistrement.
- `tests/test_liens_versions.py` : données de WerbMap copiées et reçues (publication modifiée : SI ajouté, actif retiré), référence absente et SI sans schéma signalés, liens et filtres, couverture des SI, revue sans changement, nouvelle version, approbation, export, enregistrement.
- `tests/test_publication.py` : couverture jamais publiée signalée, publication refusée sur une base non enregistrée, fichier publié (enveloppe, une entrée par exigence, états, schémas en vigueur, liens WerbMap), aucune donnée sensible, publication à refaire signalée, republication qui remplace la précédente.
- `tests/test_guides.py`, `tests/test_theme.py`, `tests/test_bandeau.py` : guides, thème clair / sombre, bandeau commun.
- `tests/test_generateur.py` : les 5 modèles régénérés sont identiques, à l'octet près, aux modèles livrés, à la référence `WerbSMSI/Modeles_docs/Visio/` et à l'espace de démonstration ; archive de modèle Visio avec cartouche à balises ; aperçu SVG ; seconde génération sans changement.

**Modèles Visio d'exemple** : ils sont produits par `outils/generer_modeles.py` (CSI-18), pas dessinés à la main. Pour corriger ou ajouter un modèle, modifiez le script, puis :

```powershell
python outils\generer_modeles.py --apercu tests\sortie\apercu   # écrit dans WerbSMSI\Modeles_docs\Visio (référence) ; aperçu SVG à relire
python <WerbSMSI>\Modeles_docs\synchroniser.py --copier             # recopie sur exemples\modeles et l'espace de démonstration
```

Puis relisez le modèle dans Visio et republiez le module (nouvelle version). Les archives sont reproductibles : régénérer sans rien changer ne modifie aucun fichier.

**Exemples annotés du guide** : `guides/images/*.svg` sont produits par `outils/generer_illustrations.py` (mêmes conventions graphiques que les modèles Visio, site fictif « Site EXEMPLE », repères numérotés expliqués dans le guide 3). Pour en corriger un, modifiez le script, régénérez (`python outils\generer_illustrations.py`), relisez les images, puis reconstruisez : `werb_charte.py construire` les intègre au livrable en `data:` (lecteur de guides 1.3.0).

---

## Historique des versions

Version courante : **1.14.2** de novembre 2026 — guide : référentiel NIS2 sans numéro de version. Précédente : **1.14.1** de novembre 2026 — repères au référentiel nommé **NIS2** partout. Précédente : **1.14.0** de novembre 2026 — repères NIS2 aux identifiants du référentiel NIS2 (WerbNIS2 1.12.0). Précédente : **1.13.0** de novembre 2026 — fichiers exportés nommés « SIGLE-SITE_… », nom du site dans les titres (socle 1.12.0). Précédente : **1.12.0** de novembre 2026 — base demandée par le portail ouverte directement quand l'espace est chargé dans le portail (socle 1.11.0). Précédente : **1.11.0** de novembre 2026 — identification unique : ouvert depuis le portail WerbSMSI, le module reprend le nom saisi dans le portail, sans écran « Votre nom » (socle 1.10.0). Précédente : **1.10.3** de novembre 2026 — cases des SI liés d'un schéma : nom du SI seul. 1.10.2 : SI affichés par leur nom seul partout (détail d'une exigence, dossier de preuve, filtre, périmètre de l'ébauche, tableau de bord). 1.10.1 : couverture par SI : nom du SI seul, sans son identifiant. 1.10.0 : ébauche « Zones et conduits » générée depuis WerbMap (aperçu, Visio, fiche brouillon). 1.9.0 : annexe « Matrice des flux » tirée de WerbMap et dossier de preuve imprimable. 1.8.0 : empreinte du fichier approuvé, contrôles avant approbation, revue déclenchée par les changements de WerbMap, vue Échéances. 1.7.0 : non-applicabilité justifiée (site ou SI) et couverture SI × exigence selon la portée de l'exigence et la sensibilité du SI ; ancien libellé « Flux et cloisonnement » renommé à l'ouverture. 1.6.0 : guide « Les schémas attendus, un par un » avec un exemple annoté par catégorie d'exigence, repères précis et corrigés, codes EX- expliqués. 1.5.0 : modèles Visio « Zones et conduits », « Accès distants et interconnexions », « Architecture d'administration ». 1.4.0 : modèle « Sauvegarde et reprise ». 1.3.0 : publication de la couverture des exigences (`site:cartographies`). 1.2.0 : liens vers WerbMap, couverture des SI, historique des versions. 1.1.0 : modèles de schémas Visio et création depuis un modèle. 1.0.0 : registre des schémas d'architecture d'un site par catégorie d'exigence. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbCartoSI** — Développé par **@WerbHat**
