# Changelog — WerbSMSI

Toutes les évolutions notables de l'environnement WerbSMSI (charte, portail, outils communs) sont consignées ici.
Les modules ont chacun leur propre CHANGELOG.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).

## [0.28.0] — 2026-11

### Changements
- **WerbVeille 1.6.0 publié** (VEI-7) : source **CVE du NVD** (API du NIST, désactivée par défaut) — CVE des logiciels et matériels du site par CPE, CPE proposés, vue Logiciels et CVE, badges CVSS / KEV ; clé d'API facultative dans `secrets.ini`.
- **WerbExploitation 1.24.0 publié** (EXP-20) : champ **CPE (NVD)** des références logicielles et matérielles, publié dans `site:plm`. Charte : `site:plm` cite le CPE ; publication de démonstration LYON : CPE des systèmes Microsoft.
- **Charte** : nouvel objet **`site:inventaires`** (relevés d'inventaire des machines : TAG, système, matériel, date, nombre d'applications ; ni applications ni réseau), publié par WerbExploitation, lu par WerbMap. Publication de démonstration LYON complétée (relevés fictifs de PC_ING01 et SRV_NTP01).
- **WerbMap 1.27.0 publié** (MAP-15) : colonne **Inventaire** des machines physiques et virtuelles, consolidation proposée des champs système et matériel depuis les relevés.
- **WerbExploitation 1.23.0 publié** (EXP-19) : publication de `site:inventaires`, colonne Inventaire des actifs WerbMap.
- **WerbExploitation 1.22.0 publié** (EXP-18) : **inventaires de machines** — scripts d'inventaire en lecture seule à télécharger (Windows PowerShell, Linux sh), import des fichiers JSON rattachés au TAG WerbMap, sélection et reprise dans le registre Applicatifs.
- **WerbExploitation 1.21.0 publié** : export **JSON** de la liste des applicatifs utilisés (registre Applicatifs, bouton ⇩ JSON) — produit, éditeur, version, machines, état du référentiel logiciel.
- **WerbPCR 1.7.0 publié** : guide « Approfondir la continuité et la reprise » (durée maximale tolérable, RTO, temps de remise en service, RPO, disponibilité ; bilan d'impact ; stratégies de sauvegarde et de reprise ; points uniques de défaillance ; types de tests ; indicateurs ; normes ISO 22301, ISO/IEC 27031, NIS2, NIST SP 800-34).
- **WerbGouvernance 1.13.0 publié** : guide « Les rôles de la sécurité : qui fait quoi, et comment » (principes de conduite communs, tâches clés de chaque rôle du groupe, du site et transverse, séparation des tâches, matrice qui fait quoi), relié à l'écran Rôles.
- **WerbPresta 1.6.1 publié** : guide du prestataire renommé « Répondre aux exigences de cybersécurité du client » (intitulé plus sobre, vocabulaire de mise en œuvre et de plan d'actions).
- **WerbPresta 1.6.0 publié** : bouton « 📘 Guide du prestataire (Word) » — le guide d'accompagnement à remettre au prestataire, à son nom, exigences de son cahier signalées, habillé du modèle de l'entreprise.
- **WerbPresta 1.5.0 publié** : guide « Accompagner le prestataire dans sa montée en maturité », à remettre au prestataire avec le questionnaire (réponses et preuves, niveaux de maturité de l'IEC 62443-2-4, quatre paliers couvrant les 37 exigences, comment y arriver exigence par exigence, plan de progrès).
- **WerbGouvernance 1.12.1 publié** : choix du mode de la phase 2 de l'assistant PSSI mis en évidence (principes masqués signalés, badge « nouveau · ANSSI »).
- **WerbGouvernance 1.12.0 publié** : catalogue PSSI confronté au référentiel de principes de l'ANSSI (2004, 166 principes) — références ANSSI de chaque principe (assistant, document PSSI, export), 161 repris et 5 écartés avec justification, 10 principes ajoutés (61 au total, mode essentiel inchangé).
- **WerbGouvernance 1.11.1 publié** : guides PSSI (« Élaborer la PSSI », « Accompagner chaque phase de la PSSI ») complétés et corrigés d'après la méthodologie de l'ANSSI (2004) : fiches de synthèse des phases, détail des tâches, conseils et écueils, plan type en deux parties complété d'une partie III, révision, plan d'action.
- **WerbGouvernance 1.11.0 publié** : bouton **❓ Aide de la phase** dans l'assistant PSSI, qui ouvre dans une fenêtre à part le nouveau guide « Accompagner chaque phase de la PSSI » (méthode d'atelier, questions, exemples, pièges, critères de validation), placé sur la phase en cours.
- **WerbVeille 1.5.0 publié** : les logiciels et applicatifs installés publiés par WerbExploitation (`site:plm`, OS compris, avec version et TAG des machines) sont proposés comme mots-clés de veille, à côté de l'inventaire WerbMap ; charte §5.4 : WerbVeille ajouté aux lecteurs de `site:plm`.
- **Portail 1.13.0 — modèles de documents** (MOD) : page **🛠️ Outils › Modèles de documents** — inventaire de `Modeles_docs/modeles.json` intégré à l'assemblage (`werb_charte.py portail` : `window.WERB_MODELES`), par type (Word, Visio, Excel) : rôle, modules, balises, emplacement dans l'espace ; espace ouvert : présence de chaque modèle dans `modeles/` et `modeles/schemas/`, modèles à déposer signalés, fichiers hors inventaire listés ; lecture seule. `synchroniser.py` lit les copies dans `modeles.json` et signale un fichier de `Modeles_docs/` absent de l'inventaire. Test `portail/tests/test_modeles.py`.
- **WerbVeille 1.4.0 publié** (VEI-4) : sources spécialisées du collecteur — catalogue KEV de la CISA (activé par défaut, croisé avec les mots-clés) et revendications de rançongiciels ransomware.live (désactivé par défaut, jeton personnel dans `secrets.ini`, conditions d'utilisation à valider par l'entreprise).
- **WerbNIS2 1.8.0 publié** (NIS-1) : le registre des sauvegardes de WerbExploitation (`site:sauvegardes`) est proposé en preuve de CONTINUITE_ACTIVITE.a, c, d (sauvegardes actives, tests de restauration, copie hors ligne), à côté du schéma EX-REPRISE ; charte §5.4 : WerbNIS2 ajouté aux lecteurs de `site:sauvegardes`.
- **Générateur des modèles Visio** versé dans WerbCartoSI (`outils/generer_modeles.py`, CSI-18) : il écrit les 5 modèles dans `Modeles_docs/Visio/`, identiques à l'octet près aux modèles livrés (test `test_generateur.py`).
- **Modèles de documents regroupés dans `Modeles_docs/`** (Word, Visio, Excel), avec un **inventaire** (`Modeles_docs/README.md` : rôle de chaque modèle, modules qui l'utilisent, balises, copies à tenir à jour) et `synchroniser.py` (contrôle et recopie des copies de la démonstration et des exemples des modules). Le modèle d'en-tête réel de l'entreprise quitte `charte/modeles/` (non versionné) ; le classeur « État des lieux des tests réseau » quitte `Temp/`.
- **WerbGouvernance 1.10.0 publié** (GOU-4, GOU-5) : finalisation de la PSSI — document selon le plan type en PDF et en Word au modèle de l'entreprise, relecture, approbation inscrite dans Politique et périmètre, règles à mettre en œuvre → plan d'actions — et **charte utilisateur** tirée des règles retenues.
- **Espace de démonstration déplacé** : `charte/modeles/donnees/SMSI_GROUPE_DEMO/` → **`demo/SMSI_GROUPE_DEMO/`**, au même niveau que `portail/` (le dossier `charte/` peut ainsi être exclu du dépôt sans perdre la démonstration). Portail (bouton 🧪 Espace de démonstration), tests et outils d'exemples des modules, README et charte mis à jour ; contenu inchangé.

### Ajouts
- **WerbGouvernance 1.9.0 publié** (GOU-1 à GOU-3) : **assistant PSSI** — cadrage, éléments stratégiques (pré-remplis par WerbEBIOS et la base), catalogue de 51 principes en 16 domaines (mode essentiel ou complet, règles à deux niveaux), validation de chaque phase, notes et synthèses imprimables, règle → mesure du socle publié aux sites.
- **WerbExploitation 1.20.0 publié** (EXP-14) : la **base du groupe ne mélange plus les données de site** — rattachement au groupe refusé pour une base de site (base dédiée conseillée), registre prérempli retiré d'une base neuve ; au groupe, référentiels, Excel et aide limités au catalogue.
- **WerbExploitation 1.19.0 et WerbMap 1.26.0 publiés** (EXP-12 / MAP-14, EXP-13 : lots D et E du thème Matériel et PLM) : **état PLM publié** (`site:plm` : références installées, statut, dates, TAG ; ni stock ni fournisseur) et affiché dans la **fiche SI de WerbMap** (cycle de vie des actifs du SI) ; **catalogue matériel et logiciel du groupe** tenu dans une base WerbExploitation de groupe et publié (`groupe:catalogue`), repris par les sites (champs communs non modifiables 🏢, stock et quantités propres au site). Charte : objets `site:plm` et `groupe:catalogue` (§5.4, schémas, outil), rubrique Exploitation ouverte au groupe (§5.2, registre) ; espace de démonstration : base `groupe/exploitation/Exploitation_Groupe.werbexploitation.json` et publications correspondantes.
- **WerbExploitation 1.17.0 publié** (EXP-11, lot C) : **référentiel logiciel**, systèmes d'exploitation compris (éditeur + produit + version, dates PLM, version recommandée, CRA, SBOM) ; installations calculées depuis Applicatifs et l'OS des actifs WerbMap ; **Applicatifs** reprend les données du référentiel (éditeur, version recommandée) et affiche le statut PLM ou la version cible.
- **WerbExploitation 1.16.0 publié** (EXP-10, lot B) : **mouvements de stock** du registre Matériel et PLM — entrées et sorties datées avec motif et TAG concerné, stock mis à jour, quantité toujours modifiable à la main (correction enregistrée comme mouvement), historique simple par référence, feuille Excel des mouvements.
- **WerbExploitation 1.15.0 publié** (EXP-9, lot A du thème « Gestion du matériel ») : registre **Matériel & PLM** — une ligne par référence produit (marque + modèle), stock et stock minimum, **quantité utilisée calculée depuis les actifs de WerbMap**, trois dates PLM et statut, CRA (marquage CE, SBOM, contact vulnérabilités), modèles installés sans référence créés en un clic, alertes au tableau de bord. Publication de démonstration WerbMap (LYON) : marque, modèle et firmware fictifs des actifs.
- **Portail 1.12.0 — parcours en 7 étapes** (POR-7), d'après l'infographie « Démarrer avec WerbSMSI » : 1 Gouverner, 2 Connaître son SI, 3 Comprendre les risques, 4 Maîtriser les exigences, 5 Contrôler le terrain, 6 Assurer la résilience, 7 Faire vivre le SMSI (WerbAcademie). Les modules de l'accueil, des pages Groupe et Site et des paramètres sont présentés par étape, dans cet ordre ; carte « Le parcours WerbSMSI » en tête de l'accueil (étapes cliquables, modules de chaque étape) ; page **❓ Aide › Infographie : démarrer** (image intégrée, WebP) ; guide « Démarrer avec WerbSMSI » : tableau des modules par étape. **Affichage seul** : les rubriques restent les dossiers de rangement des bases, aucune base ne bouge. Registre : `etapes`, `modules[].etape`, `rubriques[].etape` (étape par défaut) ; ordre des rubriques aligné ; médias du portail (`portail/src/medias/`) intégrés à l'assemblage.
- **WerbReferentiels 1.5.1 publié** : guide **« Résumé des articles du CRA »** (un sous-titre par article) — les 8 chapitres (articles 1 à 71) et les 8 annexes résumés, calendrier, sanctions, articles clés pour un site industriel.
- **WerbExploitation 1.14.0 publié** (EXP-8) : **rapport PDF d'une demande de flux habillé du modèle de l'entreprise** (en-tête et logo, pied de page, numéros de page et marges de `modeles/Modele_entete.docx`, charte §7.2 ; lu sans bibliothèque externe) et zone **« Description du projet et des besoins »** au-dessus des actifs.
- **WerbExploitation 1.13.0 publié** (EXP-7) : **versions et historique sur le modèle de WerbMap** — chaque enregistrement crée une version numérotée avec commentaire obligatoire, modifications en cours comptées, page Historique (versions, journal filtrable par version), empreinte SHA-256 chaînée vérifiée à l'ouverture. Charte §5.1 : champ `v` du journal et bloc `integrite` décrits ; schéma de l'enveloppe complété.
- **WerbExploitation 1.12.0 et WerbMap 1.25.1 publiés** (EXP-6) : demandes de flux — colonnes **IP source**, **IP destination**, **service saisi librement** et **commentaire** (justification du besoin) ; un flux est désormais un objet (bases existantes converties à l'ouverture). Le commentaire est publié dans `site:fluxRealises` (charte §5.4, schéma) et repris par WerbMap dans la règle reportée ; les IP restent dans la base du site.
- **WerbExploitation 1.11.1 publié** : dans une demande de flux, le système d'information est affiché par son nom, sans l'identifiant technique de WerbMap.
- **WerbExploitation 1.11.0 publié** (EXP-5) : **saisie simplifiée des demandes de flux** — actifs et flux en lignes à compléter (TAG proposé depuis WerbMap, service qui remplit protocole et port, dupliquer, collage d'une liste ou de colonnes Excel) ; un actif du projet absent de WerbMap est reconnu comme **nouvel actif** et n'est plus signalé « inconnu » dans les flux. Format des données inchangé.
- **WerbExploitation 1.10.0 et WerbMap 1.25.0 publiés** (EXP-4, MAP-13) : une demande de flux passée au statut **Réalisée** est publiée (`site:fluxRealises`, nouvel objet de la charte §5.4 : extrémités, protocole, port, ticket ; ni adressage, ni URL, ni demandeur) et **ajoutée automatiquement à la matrice de flux de WerbMap**, qui reste la référence de ce qui est autorisé (pare-feu à renseigner, pas de doublon, journal).
- **WerbExploitation 1.9.0 publié** (EXP-3) : **demandes de flux réseau** dans le menu Maintien opérationnel, reprise de l'outil « Suivi des demandes de flux » (`Temp/Suivi demande/`) adaptée à la charte — demandes et projets, actifs par TAG WerbMap, SI et VLAN de WerbMap (`site:si`, `site:vlans` désormais lus), CIDR conseillé, extrémités des flux reconnues, historique des statuts, alertes, export Excel, reprise de l'ancien fichier JSON ; plus de stockage dans le navigateur.
- **WerbGouvernance 1.8.0 publié** : guide **« Élaborer la politique de sécurité (PSSI) »** dans ❓ Aide — démarche en quatre phases du guide de l'ANSSI (2004), reformulée et mise à jour (ISO 27001 et 27002:2022, NIS2, RGPD, CRA, IEC 62443) : note de cadrage, éléments stratégiques et note de stratégie, catalogue de principes modernisé en 16 domaines, règles graduées (essentiel, renforcé), synthèses, plan type, signature, plan d'action, déclinaison par site, check-list. Premier pas de l'assistant PSSI (GOU-1 à GOU-5).
- **Portail 1.11.0 — ⚙️ Administration › Paramètres** : premier réglage, les **modules affichés** sur le portail (tous par défaut). Les modules décochés disparaissent des pages Accueil, Groupe (y compris « Bases par module et par site ») et Site ; une rubrique entièrement masquée est retirée ; un renvoi indique le nombre de modules masqués. Un module masqué reste installé : ses bases restent listées (« masqué malgré tout » signalé dans les paramètres). Brouillon jusqu'à « Enregistrer » ; enregistré dans `werbsmsi.groupe.json` (`data.parametres.modulesMasques`, commun à l'organisation). Charte : champ documenté dans `groupe.schema.json` et l'arborescence de l'espace. Test `test_parametres.py`.
- **WerbRGPD 1.0.0 publié** — nouveau module de la rubrique Conformité & exigences, niveau site (RGP-1 à RGP-5 ; étude `Temp/Etude_NEW_WerbRGPD.md`, QCM du 2026-11-06) : **registre des traitements** (article 30 : base légale, données sensibles, destinataires, sous-traitants, transferts, durée, sécurité, localisation dans WerbMap, critères du CEPD et AIPD), **violations de données** (72 h vers la CNIL calculées, risque, information des personnes, incident NIS2), **demandes d'exercice des droits** (un mois, prolongation motivée), **sous-traitants** (article 28, prestataires de WerbPresta proposés) ; lit `site:si`, `site:actifs`, `site:evaluationsPrestataires` ; registre (16 modules) ; base d'exemple rangée dans l'espace de démonstration (`sites/LYON/conformite/`). Guide « Démarrer avec WerbSMSI » complété.
- **WerbReferentiels 1.4.0 publié** : nouveau référentiel **RGPD** (carte, comprendre le RGPD, principes et bases légales, droits des personnes, obligations du responsable, sécurité et cybersécurité, cas industriels, modèles et check-lists, sources officielles).
- **Portail 1.10.0 — bouton « 💾 Sauvegarder l'espace » dans le bandeau** (espace ouvert) : même fonction que ⚙️ Administration › Sauvegarde et restauration, mis en évidence (couleur) tant qu'aucune sauvegarde n'a été faite pendant la session, puis « 💾 Sauvegardé à hh:mm ». Il lance directement l'archive quand « Réalisée par » est déjà renseigné (périmètre de la session), sinon il ouvre la page de sauvegarde sur ce champ. Test `test_sauvegarde.py` complété.
- **WerbCartoSI 1.5.0 publié** : trois modèles Visio prioritaires sur le même gabarit — **Zones et conduits** (EX-ZONES), **Accès distants et interconnexions** (EX-ACCES), **Architecture d'administration** (EX-ADMIN) — dessin, tableau à remplir, légende, cartouche à balises ; rangés aussi dans `modeles/schemas/` de l'espace de démonstration ; guide complété (points NIS2 que chaque modèle aide à prouver).
- **WerbCartoSI 1.4.0 publié** : modèle Visio « Sauvegarde et reprise » (EX-REPRISE) — planche A3 prête à remplir (sauvegardes et leur heure, copie hors ligne, restauration testée, ordre de redémarrage avec RTO et RPO, cartouche à balises), rangé aussi dans `modeles/schemas/` de l'espace de démonstration ; guide complété (ce que l'auditeur lit sur la planche).
- **WerbNIS2 1.7.0 publié** (CSI-11) : base de site — couverture des schémas d'architecture (`site:cartographies`, copiée dans la base) proposée en preuve sous 18 points de la grille d'audit (table de correspondance fixe : cartographie, cloisonnement, filtrage, écosystème, accès distants, administration, continuité — EX-REPRISE → CONTINUITE_ACTIVITE.a, d, f —, accès physiques) ; couverture incomplète et publication de plus de 12 mois signalées ; « Citer dans les preuves » ; aucune cotation automatique. Charte §5.4 : WerbNIS2 ajouté aux lecteurs.
- **WerbMap 1.24.0 publié** (CSI-10) : fiche SI — **schémas d'architecture** reçus de WerbCartoSI (`site:cartographies`, copiés dans la base) : schémas en vigueur liés au SI ou à un de ses actifs, version, état de revue, exigences démontrées ; SI sans schéma signalé. Charte §5.4 : WerbMap ajouté aux lecteurs de `site:cartographies`.
- **Charte §5.4** : nouvel objet **`site:cartographies`** (couverture des exigences par les schémas d'architecture : par catégorie d'exigence, état et schémas en vigueur — métadonnées, dates, SI, zones et actifs liés ; ni fichier, ni chemin, ni description) publié par WerbCartoSI ; `werb_charte.py` (objets reconnus) et schéma de publication de site complétés ; publication de démonstration du site LYON.
- **Portail 1.9.0** : lit `site:cartographies` — vue du site (exigences couvertes par des schémas, couverture par exigence et schémas en vigueur, sans chemin) et vue du groupe (« Schémas d'architecture par site » : couvertes, à revoir, en cours, non couvertes, nombre de schémas, date de publication). Tests du portail complétés.
- **WerbCartoSI 1.3.0 publié** (CSI-9) : publication `site:cartographies` (base enregistrée avant publication, publication à refaire signalée).
- **WerbCartoSI 1.2.0 publié** (CSI-7, CSI-8) : schémas liés aux SI, zones et actifs publiés par WerbMap (`site:si`, `site:zones`, `site:actifs`, copiés dans la base), couverture des SI (SI sans schéma signalé), historique des versions de chaque schéma (approbation, revue sans changement, nouvelle version qui repasse le schéma en brouillon).
- **WerbCartoSI 1.1.0 publié** (CSI-5, CSI-6) : **modèles de schémas Visio** — bibliothèque des modèles communs du groupe (`modeles/schemas/` à la racine de l'espace, à côté du modèle Word d'en-tête) et du site (`sites/<CODE>/inventaires/schemas/modeles/`), description et balises du cartouche détectées ; **création d'un schéma depuis un modèle** (cartouche rempli, nom normalisé `SCH-nnn_Titre_SITE_vX.Y.vsdx`, enregistrement dans le dossier des schémas, fiche pré-remplie en brouillon) ; ouverture directe dans Visio en essai (paramètre). Socle inchangé (1.9.0) : l'écriture du fichier passe par la fenêtre d'enregistrement d'Edge. Espace de démonstration : modèle Visio d'exemple dans `modeles/schemas/`.
- **WerbCartoSI 1.0.0 publié** — nouveau module de la rubrique Inventaires ICS, niveau site (CSI-1 à CSI-4 ; étude `Temp/Etude_NEW_WerbCartoSI.md`) : **registre des schémas d'architecture** — fiche (type, format, classification, propriétaire, responsable, version, statut, revue, approbation simple), exigences couvertes et **couverture par catégorie d'exigence** (repères NIS2, ISO/IEC 27001, IEC 62443, ANSSI), types et catégories en listes de choix du groupe, fichier dans l'espace du site (`sites/<CODE>/inventaires/schemas/`, présence vérifiée, chemin complet copié depuis la racine déclarée), adresse web ou chemin réseau, outils des tables, export Excel de preuve, guide ; registre (15 modules). Espace de démonstration : base du site LYON déclarée et schéma SVG fictif. Guide « Démarrer avec WerbSMSI » complété.
- **Portail 1.8.0 — invitation à l'espace de démonstration** : à l'arrivée sur l'accueil sans espace ouvert, une fenêtre propose d'ouvrir l'espace de démonstration. Le portail retient son emplacement par rapport à lui-même (`../demo/SMSI_GROUPE_DEMO`), affiche le chemin complet (lecteur ou partage réseau), le copie et ouvre le sélecteur de dossier : il ne reste qu'à coller le chemin. Avertissement : les modifications sont écrites dans les fichiers de la démo (copier le dossier pour essayer sans risque). « Plus tard », « Ne plus proposer » (pour la session), bouton **🧪 Espace de démonstration…** sur l'accueil ; contrôle de l'organisation ouverte. Tests du portail complétés (fenêtre, chemin, fermeture, réouverture).
- **WerbReferentiels 1.3.0 publié** (CRA-1) : nouveau référentiel **CRA** (Cyber Resilience Act) — carte, guides pour le comprendre et le mettre en œuvre côté fabricant et côté acheteur / exploitant, modèles et check-lists, sources ; socle 1.9.0.
- **WerbAcademie 1.5.0 publié** (ACA-12) : attestation individuelle de formation en Word (formations réussies, validité, situation au regard des formations exigées).
- **Charte §5.4** : nouvel objet **`site:vlans`** (VLAN du plan : ID, nom, réseau, zone, statut, couche, réseau isolé — **sans adressage**) publié par WerbMap, lu par WerbAssets ; `werb_charte.py` et schéma de publication de site complétés ; publication de démonstration LYON complétée (4 VLAN fictifs).
- **WerbMap 1.23.0 publié** : publication des VLAN du plan (`site:vlans`), aussi dans le fichier exporté sans espace.
- **WerbAssets 1.9.0 publié** : versions de la base — commentaire obligatoire à chaque enregistrement (résumé proposé), page Historique (versions et journal réunis, comme WerbMap), journal numéroté et filtrable par version (comme WerbMap, sans chaîne d'intégrité ni comptes).
- **WerbAssets 1.8.0 publié** : colonne « Position (U) » dans les listes d'assets (saisie sur place) ; **⇩ VLAN de WerbMap** dans les fiches switch et pare-feu.

## [0.27.0] — 2026-11

### Changements
- **Préparation de la publication du projet** : les dates précises sont ramenées au **mois et à l'année** dans la documentation et les manifestes — entrées des CHANGELOG `## [x.y.z] — AAAA-MM`, `module.json › dateVersion` en `AAAA-MM`, « Version courante » et historiques des README (« de novembre 2026 »), commentaires de code. Charte §9, schéma `module.schema.json` et audit (`werb_charte.py`) mis à jour ; le modèle de module suit (`{{MOIS}}` dans le README). Les données d'exemple et de démonstration gardent leurs dates complètes : fictives, elles servent aux calculs (échéances, retards).
- **Date de build** : `construire`, `portail` et les builds propres aux modules n'écrivent plus que le mois et l'année (« build novembre 2026 ») dans l'en-tête du livrable, le pied du menu et la page À propos ; `--date` accepte `AAAA-MM-JJ` ou `AAAA-MM`. Les 14 livrables et le portail sont reconstruits, sans changement de version.
- **Signature d'auteur** : le commentaire qui décrivait son encodage est retiré de `signature.js` (modèle de la charte, portail, 14 modules) ; libellé de l'audit neutre (« signature d'auteur »).

### Sécurité
- Revue des secrets et des données personnelles avant publication : aucun secret (clé, jeton, mot de passe, URL avec identifiants) dans les sources ni dans l'historique git ; auteur des commits en adresse « noreply » ; exemples fictifs (adresses IP de documentation, courriel `exemple.fr`).
- `charte/modeles/Modele_entete.docx` : nom de la personne retiré des métadonnées du document (« dernière modification par » → `@WerbHat`).
- `.gitignore` : sorties des tests (`tests/sortie/`) exclues dans WerbAcademie, WerbPCR, WerbPresta, WerbVeille et WerbSMSI — elles peuvent contenir le nom d'utilisateur et de machine d'une exécution réelle.

## [0.26.0] — 2026-11

### Ajouts
- **Charte §5.4** : nouvel objet **`site:valeursMetier`** (valeurs métier de l'analyse du site : identifiant préfixé par l'étude, nom, nature, description courte ; WerbEBIOS site → WerbPCR) et **valeurs métier portées** par chaque bien support de `site:biensSupports` ; `werb_charte.py` (objets reconnus) et schéma de publication de site complétés.
- **WerbEBIOS 1.9.0 publié** (EBI-2) : publie `site:valeursMetier` et les valeurs métier des biens supports.
- **WerbPCR 1.6.0 publié** (PCR-14) : rubrique **« c — Valeurs métier »** dans les fiches par SI, avant les événements redoutés — valeurs métier proposées et cochées à la création quand un bien support EBIOS contient un actif du SI, saisie libre sans analyse EBIOS ; événements redoutés des valeurs métier cochées en tête, les autres affichables ; rubriques renumérotées **a à g** (fiche, fil conducteur proposé, Word, Excel, guides). Format additif (`vms`, `vmLibres`).
- **WerbAssets 1.7.0 publié** (AST-7) : lecteur de guides (❓ Aide, page d'aide, accueil) et guide **« Maîtriser et durcir les assets du site »** — un asset mal connu (configuration, raccordement de baie) allonge toujours le RTO ; ce que signifie durcir un asset ; durcir dès la première configuration plutôt qu'en production ; bien tenir WerbAssets (check-list de mise en service, copie papier de la baie, revue périodique).
- **Guides de débutant** (GUI-1) dans six modules, lisibles dès l'accueil : **WerbExploitation 1.8.0** « Le maintien en condition opérationnelle et de sécurité en clair » et **WerbGouvernance 1.7.0** « Piloter la sécurité du groupe sans être expert » (lecteur de guides ajouté à ces deux modules) ; **WerbNIS2 1.6.0** « NIS2 en clair » ; **WerbPentest 1.7.0** « Le test d'intrusion en clair » ; **WerbVeille 1.3.0** « La veille de sécurité en clair » ; **WerbPCR 1.6.0** « Continuité et reprise en clair ». Chaque guide explique le sujet (notions, exemples industriels, erreurs fréquentes) puis renvoie au module ; test `test_guides.py` dans chacun.
- `dateVersion` des manifestes de WerbEBIOS, WerbPCR et WerbAssets mis à la date de leur version (l'audit global ne signale plus rien).
- Espace de démonstration : publication du site LYON de WerbEBIOS complétée (`valeursMetier`, valeurs métier du bien support du serveur SCADA) ; plan de LYON régénéré.

### Changements
- **WerbPCR 1.5.0 publié** (PCR-15) : la rubrique f des fiches par SI du PCI devient **« Mesures de continuité (réponse immédiate et mode dégradé) »** — alerte et décision, confinement, bascule sur un secours, mode dégradé, contournement manuel, déclenchement du PRI (type de mesure ajouté) — ; le retour au fonctionnement normal (restauration, redémarrage) relève du PRI, rappelé en lecture seule sous la rubrique (RTO, RPO, mode dégradé, rang de reprise, procédure, sauvegardes). Fil conducteur proposé, définitions, document Word et Excel alignés ; guides « Établir le Plan PCI » (*PCI ou PRI : qui fait quoi*, exemples OT) et « Établir le Plan PRI » complétés. Format additif (`type`), champ `remediation` gardé. Espace de démonstration : plan de LYON mis à jour.

## [0.25.0] — 2026-10

### Ajouts
- **Guide « Démarrer avec WerbSMSI — guide du dirigeant et du débutant »** (`portail/guides/1-Demarrer_avec_WerbSMSI.md`) : pourquoi s'en occuper, le SMSI en cinq minutes (cycle, vocabulaire), WerbSMSI en un coup d'œil (une question par module), qui fait quoi (rôles et temps réaliste), **feuille de route sur douze mois en six phases** (de l'organisation au pilotage, avec les modules à ouvrir et les gains rapides), rythme de croisière, ce que le dirigeant doit faire (cases à cocher, questions à poser), erreurs à éviter, premiers pas de la semaine. **Portail 1.6.0** : guides du portail lus par le composant commun `guides.js` (assemblés par `werb_charte.py portail`, comme ceux des modules), guide proposé à l'accueil, menu ❓ Aide (« Guide pas à pas » renommé « Créer la base d'un site ») ; lien depuis le README.
- **Guide « Démarrer avec WerbSMSI » mis à jour** pour les quatorze modules : WerbPresta et WerbAcademie dans le tableau des modules (avec le niveau groupe / site), vocabulaire (SI, sensibilisation, chaîne d'approvisionnement, coffre-fort, RTO / RPO), rôles RH et achats, feuille de route enrichie (formation des dirigeants dès la phase 0, prestataires et coffre-fort en phase 1, cahier d'exigences et plan de formation en phase 3, sessions et évaluations en phase 4, PRI et audit NIS2 en phase 5), rythme de croisière, questions du dirigeant, erreurs à éviter, premiers pas et guides des modules.
- **Lecteurs de `groupe:formations`** (lot M, ACA-10) : **portail 1.7.0** — carte « Formation et sensibilisation » de la vue groupe (taux de formations à jour par site et du groupe, à renouveler, en retard, jamais suivies, dirigeants à jour, sessions de l'année) et de la vue site (site et populations) ; **WerbPCR 1.4.0** — indicateurs du site sous l'objectif R#1 « Responsabilités et sensibilisation » et dans le document Word ; **WerbNIS2 1.5.0** — indicateurs du groupe ou du site reçus et proposés comme élément de preuve des points RH.b, ROLE.a et EXERCICES.a (« Citer dans les preuves ») ; **WerbGouvernance 1.6.0** — carte du tableau de bord et élément d'entrée de la revue de direction (ISO/IEC 27001 § 9.3), ajouté en un clic à la revue la plus récente.
- **WerbMap 1.22.1 publié** : la retouche du guide « Les mots de passe » faite dans le paquet publié (« tout le système qui est compromis ») est reportée dans les sources du module et le livrable reconstruit (l'audit signalait un guide publié différent de celui intégré).
- **WerbAcademie 1.4.0 publié** (lot M, ACA-9) : publication **`groupe:formations`** — catalogue publié et indicateurs agrégés (groupe, dirigeants, par site, par site × population ; sessions de l'année), **sans aucun nom** — ; objet ajouté à la charte (§5.4), à l'outil de la charte et au schéma de publication du groupe ; publication de démonstration dans l'espace (`publications/werbacademie.json`).
- **WerbAcademie 1.3.0 publié** (lot L, ACA-7, ACA-8) : **suivi des formations** — formations exigées par population, échéance (dernière session réussie + 24 mois), à jour / à renouveler / en retard / jamais, synthèses par site et par population, dirigeants mis en avant (NIS2, art. 20), session de rattrapage — ; sixième formation proposée, *le rôle des dirigeants* ; **purge** des personnes au-delà de la durée de conservation (comptes gardés, nom retiré du journal).
- **WerbAcademie 1.2.0 publié** (lot K, ACA-5, ACA-6) : **sessions** (formation et version suivies, date, site, format, animateur ; participants, présences, nombre de bonnes réponses, réussite calculée), **feuille d'émargement** Word, **éditeur du quiz** (une ou plusieurs bonnes réponses, seuil) et **quiz papier** Word avec le corrigé, modèle Word de l'entreprise ; une personne supprimée reste comptée sans son nom.
- **WerbAcademie 1.1.0 publié** (lot J, ACA-3, ACA-4) : **slides** générées depuis la structure d'une formation — présentation HTML autonome (hors ligne, mode animateur, quiz, impression) et **PowerPoint** modifiable (PptxGenJS 4.0.1 figé, MIT) — avec le logo de l'entreprise (dossier `modeles/` de l'espace ; logo fictif ajouté à l'espace de démonstration).
- **WerbPresta 1.4.0 publié** (PRE-9) : **niveau groupe** — consolidation des évaluations publiées par les sites (par prestataire : sites, criticité, accès permanent, score par site, écarts) et **modèle de questionnaire commun** publié (`groupe:modeleQuestionnaire`, nouvel objet de la charte §5.4, du schéma de publication de groupe et de `werb_charte.py`) et repris par les sites. **Toutes les pistes WerbPresta (PRE-1 à PRE-9) sont faites.**
- **Modules lecteurs de `site:evaluationsPrestataires`** (PRE-8) : **WerbMap 1.22.0** (fiche SI : prestataires qui interviennent), **WerbPCR 1.3.0** (PRI : prestataires proposés en dépendances externes), **WerbEBIOS 1.8.0** (atelier 3 : maturité et confiance des parties prenantes proposées, création de la partie prenante) ; **WerbIEC62443 1.11.0** : le cahier d'exigences renvoie au cahier d'exigences cyber de WerbPresta.
- **WerbPresta 1.3.0 publié** (PRE-7) : publication **`site:evaluationsPrestataires`** (synthèse sans contact ni réponse détaillée), nouvel objet de la charte §5.4, du schéma de publication de site et de `werb_charte.py` ; publication d'exemple dans l'espace de démonstration (LYON).
- **WerbPresta 1.2.0 publié** (PRE-5, PRE-6) : **évaluation** des prestataires (réponses saisies, score par domaine, écarts avec action et échéance, historique, rapport Word), documents reçus, incidents, vue des écarts.
- **WerbPresta 1.1.0 publié** (PRE-3, PRE-4) : **modèle de questionnaire** (13 domaines inspirés de l'IEC 62443-2-4, de NIS2 et de l'ISO 27001 ; exigences reformulées, niveau essentiel ou renforcé, condition d'application ; modifiable) et **cahier d'exigences cyber** de chaque prestataire (niveau automatique, exigences proposées selon sa situation, ajustées) ; cahier et questionnaire à remettre en Word, habillés du modèle de l'entreprise.
- **WerbPresta 1.0.0 publié** — nouveau module de la rubrique Conformité & exigences, niveau site (PRE-1, PRE-2 ; étude et décisions d'octobre 2026) : **liste de référence des prestataires** ; fiche (identité, périmètre : SI, zones et actifs reçus de WerbMap, accès à distance et moyen, privilèges, comptes sans mot de passe, données confiées), criticité calculée, points d'attention (accès permanent, modem, contrat terminé avec accès ouverts…), couverture des actifs ; prestataires proposés depuis WerbGouvernance (`groupe:prestataires`) et WerbIEC62443 (`site:prestataires`) ; registre (14 modules), base d'exemple rangée dans l'espace de démonstration (`sites/LYON/conformite/`).
- **WerbAcademie 1.0.0 publié** — nouveau module de la rubrique Continuité & résilience, niveau groupe (ACA-1, ACA-2 ; étude et feuille de route ACA) : formation et sensibilisation des collaborateurs. Catalogue de formations et éditeur (chapitres, diapos, notes de l'animateur, liens vers des vidéos et des sites en nouvel onglet, statut, version, publics, renouvellement), cinq formations de départ (hygiène numérique, usage de l'IA, clés USB, QR codes, mots de passe) avec quiz, personnes au minimum nécessaire (nom, fonction, population, site ; import CSV ; durée de conservation indiquée), sites reçus du groupe ; registre (13 modules), académie d'exemple rangée dans l'espace de démonstration (`groupe/continuite/`).
- **WerbMap 1.21.0 publié** : page **Mots de passe** dans les inventaires — aucun secret dans WerbSMSI ; arborescence proposée du coffre-fort KeePass (un dossier par SI, un sous-dossier par TAG, Hors SI, Domaine selon les OU de l'AD), téléchargeable ; types de comptes et registre WerbExploitation correspondant ; guide « Les mots de passe » (créer le coffre KeePass, bon mot de passe et rythme de changement d'après le NIST, Active Directory et LAPS, partage des secrets par lien éphémère type Password Pusher, jamais en clair par courriel, exigences et surveillance des prestataires).
- **WerbPCR 1.2.0 publié** (PCR-7) : **Plan PRI — plan de reprise informatique** : bilan d'impact par SI (RTO, RPO, impact, mode dégradé), dépendances (SI du site, externes), **ordre de reprise calculé** (vagues, rétabli au plus tôt comparé au RTO, boucles et incohérences signalées), procédures de reprise par étapes, **contrôle RPO ↔ sauvegardes** reçues de WerbExploitation ; partie 2 du document Word, export Excel, guide « Établir le Plan PRI » ; plan de démonstration LYON complété.
- **WerbMap 1.20.0 publié** : deux guides pour débuter dans ❓ Aide — *Les actifs d'un système et leur rôle* (rôle de chaque type d'actif, fonction de sécurité ou non, ce qu'un attaquant peut en faire) et *Les étages de la cybersécurité* (pare-feu, segmentation, VPN, MFA, bastion, antivirus, EDR, sauvegardes, SIEM, sonde OT… : ce que fait chaque outil, ce qu'il ne fait pas, une image pour s'en souvenir ; idées reçues).
- **WerbVeille 1.2.0 publié** : sources en JSON (📤 export `*.werbveille-sources.json`, 📥 import *compléter* ou *remplacer* avec aperçu) pour corriger les adresses et diffuser la liste aux sites ; **test des sources** par le collecteur (`--tester` : HTTP, durée, redirection permanente = source déplacée, flux valide, source muette ; rapport `WERBVEILLE-TEST`, rien collecté), rapport importé dans *Sources* (↪ adopter la nouvelle adresse, ⏸ désactiver une source morte, une à une ou toutes) et vérifié par la page de déploiement (nouvelle étape « Tester les sources », 9 étapes). La page reste hors ligne : elle ne contacte aucune source (charte §1).
- **WerbVeille 1.1.0 publié** : page de déploiement dans le kit de collecte (guide pas à pas, commandes, vérification d'un résultat source par source, suivi enregistré puis importé dans WerbVeille) ; sources proposées = les 42 du Feed.csv d'origine.
- **WerbPCR 1.1.1 publié** : PCI (plan de continuité informatique) et PRI (plan de reprise informatique) distingués pour la gouvernance — menu « Plan PCI », définitions dans le module, le guide et le document Word (partie 1 : PCI, chapitres PCI 1 à 5 ; partie 2 : PRI, à venir).
- **WerbVeille 1.0.0 publié** (lot G, VEI-1 à VEI-3) — nouveau module de la rubrique Continuité & résilience, *veille sur les menaces et les vulnérabilités* d'un site : sources RSS / Atom (import du Feed.csv), mots-clés proposés depuis l'inventaire WerbMap avec les TAG des actifs (import du target_list.txt), **kit de collecte** hors navigateur (collecteur Python en bibliothèque standard qui corrige le script `Werbhat_scan_Cert.py`, configuration, tâche planifiée ; secrets seulement sur la machine de collecte), import des résultats sans doublon et tri des alertes (liens externes cliquables, charte §1). Dépôt `../WerbVeille` (sans git), registre, veille d'exemple rangée et déclarée dans l'espace de démonstration.
- **WerbPCR 1.1.0 publié** (lot E, PCR-4 à PCR-6) : fiches d'analyse par SI (rubriques a à f ; événements redoutés proposés depuis les risques EBIOS visant les actifs du SI ; risques EBIOS, sauvegardes WerbExploitation et rôles du groupe rappelés), plan d'actions par objectif R#1 à R#10 (rubriques modifiables), document Word du plan au modèle d'entreprise ; plan d'exemple et démo complétés.
- **WerbPCR 1.0.0 publié** (lot D, PCR-1 à PCR-3) — nouveau module de la rubrique Continuité & résilience, *plan de cybersécurité et de reprise* d'un site : volet 1 « Périmètre métier » (événements redoutés de l'analyse EBIOS du site par valeur métier : critères, besoin, impacts, gravité ; description saisie), volet 2 « Approche systémique » (fil conducteur proposé, modifiable), volet 3 « Systèmes d'information » (`site:si` de WerbMap) ; données reçues copiées dans la base. Dépôt `../WerbPCR` (sans git), registre, plan d'exemple fictif rangé et déclaré dans l'espace de démonstration (`sites/LYON/continuite/PCR_LYON.werbpcr.json`).
- **WerbEBIOS 1.7.0 publié** (EBI-1, lot C) : critères (D, I, C, T) et besoin de sécurité des événements redoutés, échelle « Besoin de sécurité » publiée avec `groupe:echelles`, publication au site de `site:evenementsRedoutes` pour WerbPCR ; espace de démonstration complété (analyses du groupe et de LYON, publications : seuls les nouveaux éléments ajoutés).
- **Rubrique « Continuité & résilience »** (`continuite`, ordre 6, groupe et site ; NEW-1) pour les futurs modules WerbPCR (plan de cybersécurité et de reprise) et WerbVeille (veille automatisée) : registre, charte §5.2 et §5.3 (dossiers `groupe/continuite/` et `sites/<CODE>/continuite/`), espace de démonstration. Les dossiers de rubrique sont désormais **tirés du registre** par `werb_charte.py groupe / site / espace` et par le portail (création d'espace et de site, arborescence affichée) : une nouvelle rubrique n'a plus à être recopiée dans le code.
- **Portail : dossiers de rubrique manquants** — un espace créé avant une rubrique est signalé dans la vue groupe, avec **📁 Créer les dossiers manquants** (dossiers vides seulement, charte §5.6) ; `werb_charte.py espace` les signale aussi (avertissement par site).
- **Charte (CHA-3)** : §1 *Liens externes* (lien `<a>` en nouvel onglet sur clic, `noopener noreferrer`, `http(s)` seulement) et *Kits exécutés hors du navigateur* (la page ne lance jamais le kit, échanges par fichiers, bibliothèque standard, secrets jamais dans la base ni dans un export) ; §5.4 : échelle `besoins` dans `groupe:echelles` et objet `site:evenementsRedoutes` (WerbEBIOS → WerbPCR), schémas `publication_groupe` et `publication_site`, objets connus de `werb_charte.py`.
- **WerbRecette 1.8.0 publié** (REC-8) : l'empreinte d'un test ne retient côté source que l'IP saisie sur la ligne ; changer l'IP de la fiche d'une machine ne marque plus « à rejouer » les tests dont elle est la source. Empreintes antérieures converties à l'ouverture quand le test n'a pas changé (aucun « à rejouer » massif), schéma inchangé.
- **MAP-7.4 lot 7.4c** : **WerbPentest 1.6.0** publie les remédiations de chaque mission (`site:remediations` : par actif (TAG), vulnérabilités ouvertes par gravité CVSS, actions ouvertes et en retard, prochaine échéance ; compteurs seulement, aucun texte de vulnérabilité ; identifiants préfixés par la référence de la mission, pour ne remplacer que ses lignes ; archivées exclues) ; **WerbMap 1.19.0** les affiche dans la fiche SI (tableau par mission et actif, repères, indicateur « Remédiations ouvertes », fiche Word). **Espace de démonstration** : cibles de la mission Pentest de LYON reliées aux actifs SRV_SCADA01, PC_ING01 et NAS_BCK01, publication `sites/LYON/publications/werbpentest.json`. MAP-7.4 terminé.

## [0.24.0] — 2026-10

### Ajouts
- **MAP-7.4 lot 7.4b** : **WerbExploitation 1.7.0** publie le registre des sauvegardes (`site:sauvegardes` : sans chemin, procédure ni chiffrement ; archivées exclues) ; **WerbMap 1.18.0** l'affiche dans la fiche SI (sauvegardes dont la source est un actif du SI, repères hors ligne et tests de restauration, fiche Word). **Charte §5.4 et schéma `publication_site`** : TAG des sauvegardes dans `actifSource` / `actifDestination` (le champ `source` de chaque élément est réservé au module qui publie : il était écrasé par le socle). Espace de démonstration : publication `werbexploitation.json` de LYON. Tests `test_publication.py` (WerbExploitation), `test_si_sauvegardes.py` (WerbMap).
- **WerbTools_IEC62443 renommé WerbIEC62443**, sur le modèle de WerbNIS2 : produit `WerbIEC62443`, identifiant `werbiec62443`, format `WERBIEC62443`, bases `.werbiec62443.json`, dépôt `../WerbIEC62443`, paquet `modules/conformite/WerbIEC62443`. **Compatibilité** : les projets existants s'ouvrent (ancien format dans `formatsLus`) et s'enregistrent au nouveau format ; à la première publication, `publications/werbtools-iec62443.json` du site est repris dans `werbiec62443.json` sans perte (autres projets du site compris), puis vidé (`remplacePar`) pour éviter un conflit de propriétaire. Charte §2 : champs facultatifs **`idsAnciens`** et **`donnees.extensionsLues`** d'un module renommé (contrôlés par l'audit) ; le **portail** reconnaît les bases déclarées sous l'ancien identifiant et la puce des bases à l'ancienne extension. Espace de démonstration migré (bases, déclarations, publications de LYON et NANTES). Mentions mises à jour dans WerbGouvernance, WerbNIS2, WerbReferentiels, WerbEBIOS, WerbMap. Tests : `test_renommage.py` (WerbIEC62443), contrôle ajouté à `test_portail.py`.
- **WerbExploitation 1.4.0 publié** (EXP-1, EXP-2) : saisie en masse par Excel de chaque registre (modèle avec listes déroulantes et mode d'emploi, export, import `.xlsx` ou `.csv` en mode Ajouter / Ajouter et mettre à jour / Remplacer, rapport des ajouts, mises à jour et rejets motivés avant application, import désactivé en lecture seule) et export de toute la base en un classeur (feuille Informations puis une feuille par registre, dates au format date d'Excel).
- **WerbGouvernance 1.5.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage (hors publication pour les sites (socle, rôles, prestataires), alertes, tableau de bord et compteurs ; une procédure archivée garde ses fiches), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbEBIOS 1.6.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage (hors cartographie, risques publiés (`site:syntheseRisques`), biens supports publiés, tableau de bord et rapport ; ses liens sont gardés et reviennent au désarchivage. La vue « Risques et traitement » partage les données des scénarios opérationnels et n'offre pas la suppression), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbAssets 1.6.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage (le bandeau archivé, avec ses raccordements, sort du brassage, de l'impression de la baie, des classeurs Excel et des listes ; son TAG reste réservé, et le désarchivage est refusé si un bandeau actif l'a repris. Les listes Pare-feu, Switch, Autres assets et Inventaire WerbMap reçoivent seulement le réglage des largeurs (les actifs viennent de WerbMap)), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbRecette 1.7.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage (le test archivé sort des tests actifs (nouvelles campagnes, tableau de bord, points d'attention, compteur du menu) et un profil ne le recrée pas ; il garde ses résultats dans les campagnes passées, qui l'affichent toujours. Chercher / remplacer porte sur le paramètre et le commentaire des tests affichés (ni TAG, ni adresse, ni liste)), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbPentest 1.5.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage (hors tableau de bord, points d'attention, compteurs du menu, rapport Word et export Excel ; son identifiant n'est jamais réattribué. Une action liée à une vulnérabilité archivée garde son lien (« V-001 (archivée) ») ; supprimer une vulnérabilité laisse ses actions, sans vulnérabilité liée. Chercher / remplacer : désignation des cibles, textes des vulnérabilités (titre, cible, description, impact, recommandation, preuve, chemin d'attaque, références), action et responsable), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbNIS2 1.4.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage (hors plan d'actions, tableau de bord, compteur du menu, rapport d'audit et export Excel ; son identifiant n'est jamais réattribué. Chercher / remplacer : action, responsable, commentaire), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbIEC62443 1.10.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage (hors indicateurs, compteur du menu, publication au site (`site:prestataires`, synthèse), cahier et exports ; son identifiant n'est jamais réattribué. Un prestataire archivé reste dans les lignes de matrice qui le citent (proposé « (archivé) ») ; un prestataire supprimé en est retiré), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbRecette 1.6.1 et WerbAssets 1.5.1 publiés** : correctif du 🖨 PDF du bandeau, qui imprimait une page blanche (la feuille d'impression n'affichait que la zone des rapports, vide hors rapport).
- **WerbMap 1.17.0 publié** (TRV-4, TRV-5, TRV-6, étape 2) : sélection multiple et archivage dans 8 tables (ligne archivée déplacée dans la réserve de la base : hors `site:actifs`, contrôles, fiches SI), chercher / remplacer, largeur des colonnes ; socle 1.9.0.
- **WerbRecette 1.6.0 publié** : six guides pas à pas dans le menu ❓ Aide (comprendre la démarche, renseigner les machines, profils de tests, déclarer les tests, campagnes et scripts, lire les résultats), lisibles aussi depuis l'accueil.
- **Outils des tables d'inventaire** (TRV-4, TRV-5, TRV-6, étape 1) : charte §7.7 et **socle 1.9.0** (`WerbSocle.tables`) — sélection multiple avec barre Archiver / Désarchiver / Supprimer (archiver = masquer en gardant, hors publications et contrôles), fenêtre chercher / remplacer sur une colonne avec aperçu (texte libre seulement), largeur des colonnes à la souris enregistrée dans la base. **WerbExploitation 1.6.0 publié**, module pilote. Les autres modules adoptent le socle 1.9.0 à leur prochaine version.
- **Bandeau commun déployé dans tous les modules** (TRV-7, étape 2) : socle 1.8.0, ☰, boutons avec icône, 🖨 PDF, **📊 Export Excel de toute la base** (feuille Informations puis une feuille par table) — **WerbMap 1.16.0** (bandeau de référence aligné : format commun, 📑), **WerbAssets 1.5.0**, **WerbRecette 1.5.0**, **WerbPentest 1.4.0**, **WerbEBIOS 1.5.0**, **WerbGouvernance 1.4.0**, **WerbNIS2 1.3.0**, **WerbTools_IEC62443 1.9.0** (export et import du classeur complet du projet, 🧹 Purger conservé), **WerbReferentiels 1.2.0** (module de lecture : ☰ et 🖨 PDF seulement). `xlsx.js` commun (dates Excel, listes, feuilles masquées, archive ZIP) dans WerbAssets, WerbRecette, WerbPentest, WerbEBIOS, WerbGouvernance et WerbNIS2. Classeurs exportés vérifiés dans Excel. Test `tests/test_bandeau.py` dans chaque module.
- **Bandeau commun** (TRV-7, étape 1) : charte §7.6 et **socle 1.8.0** (`WerbSocle.bandeau`) — bouton ☰ posé à droite du logo dès qu'un menu latéral existe (menu masqué le temps de l'onglet), boutons d'action standard avec icône (✨ Nouveau, 📂 Ouvrir, 💾 Enregistrer, 📑 Enregistrer sous…, 📥 Import Excel, 📊 Export Excel, 🖨 PDF, ⏏ Fermer), 🖨 PDF traité par le socle (impression du navigateur), icônes seules sous 1280 px. Modèle de module mis à jour. **WerbExploitation 1.5.0 publié**, module pilote. Le portail, réassemblé avec le socle 1.8.0, a aussi le bouton ☰. Les autres modules adoptent le socle 1.8.0 à leur prochaine version (l'audit les signale « à mettre à jour »).
- **WerbMap 1.15.1 publié** : base de démonstration enrichie de 4 fiches SI d'exemple (Liste des SI).
- **WerbMap 1.15.0 publié** (MAP-9) : Liste des SI triable par clic sur l'en-tête et filtrable (nom, fonction, VLAN, TAG des actifs).
- **WerbRecette 1.4.0 publié** (REC-7) : les scripts renvoient la commande réellement exécutée et son message d'erreur ou code retour ; colonne « Commande exécutée » dans la campagne, le rapport et le rapport Excel, pour distinguer une commande erronée d'un écart.
- **WerbMap 1.14.0 publié** (MAP-10) : doublons d'adresse IP tolérés en ID VLAN 1 (réseaux isolés), signalés en information dans les contrôles ; saisie en masse : adresse et réseau comme clé en ID VLAN 1.
- **Charte §5.4 — objets d'échange pour les fiches SI** (MAP-7.4) : `site:si` (WerbMap → WerbEBIOS), `site:sauvegardes` (WerbExploitation → WerbMap), `site:remediations` (WerbPentest → WerbMap, compteurs par actif seulement) ; `site:syntheseRisques` complété des biens supports visés et de leurs actifs (TAG). Schéma `publication_site` et liste des objets de `werb_charte.py` à jour ; règle : un actif se cite par son TAG. Espace de démonstration : un SI dans la publication WerbMap de LYON, actifs du risque dans la publication WerbEBIOS. Étude : `Temp/Etude_MAP-7.4_Fiche_SI_inter-modules.md`.
- **WerbEBIOS 1.4.0 et WerbMap 1.13.0 publiés** (MAP-7.4, lot 7.4a) : WerbMap publie ses fiches SI (`site:si`) et affiche dans chaque fiche les risques EBIOS qui touchent ses actifs (tableau, indicateur du risque le plus élevé, fiche Word), copiés dans la base ; WerbEBIOS reprend un SI comme bien support et publie ses risques avec les actifs de leurs biens supports.
- **WerbMap 1.12.0 publié** (MAP-5) : TAG des actifs réseau, machines, VM et coffrets verrouillé une fois la ligne enregistrée (clé de `site:actifs` reprise par les autres modules) ; **✎ Renommer le TAG** réservé à l'administrateur, avec mise à jour des références de la base (Plan IP, aboutissants, coffrets, hyperviseurs, routes, NAT, matrice de flux) tracée au journal. Libellé et emplacement restent modifiables.

### Corrections
- En-tête de `socle.js` (ligne lue par l'audit) resté à « 1.7.1 » lors des passages aux socles 1.8.0 et 1.9.0 : corrigé dans le modèle (1.9.0) et dans les copies des modules (1.8.0). Sans cela, un module au socle 1.8.0 était refusé (« socle modifié ») au lieu d'être signalé « à mettre à jour ».

## [0.23.0] — 2026-10

### Ajouts
- **WerbMap 1.8.0 publié** (MAP-2) : zone d'un actif réseau saisie sur la ligne, référence publiée dans `site:actifs` et pour les conduits ; zone déduite des VLAN affichée ; conflit avec la Matrice VLAN signalé (ligne et contrôles), jamais corrigé en silence ; reprise des zones proposées tracée au journal.
- **WerbAssets 1.4.0 publié** (lot A : AST-1, AST-2, AST-4, AST-6 ; mention AST-3) : suppression d'une baie WerbAssets avec ses bandeaux, colonnes N° étroites, ports colorés selon l'état (ACTIF / BLOQUÉ), colonne Repère fil/brin des raccordements.
- **MAP-6** : **WerbMap 1.11.0** publie `modele`, `firmware` et `commentaire` dans `site:actifs` (schéma `publication_site` et charte §5.4 complétés) ; **WerbAssets 1.3.0** les affiche dans ses fiches, signale l'écart et propose « Reprendre de WerbMap ».
- **WerbMap 1.10.0 publié** (lot A : MAP-3, MAP-4) : page Actifs réseau d'une ligne par actif (cellules de lien qui sortaient du tableau), « Référence » devient « Modèle » (ancien en-tête reconnu à l'import).
- **WerbMap 1.9.0 publié** (MAP-7) : Inventaires › **Liste des SI** et **fiche de synthèse** d'un SI — VLAN de la Table IP VLAN, D / I / C sur l'échelle de gravité EBIOS (`groupe:echelles`, lu par WerbMap à l'ouverture de l'espace), flux inter-VLAN, VLAN en échange et actifs calculés, RACI propre au SI (rôles des Référentiels), sauvegardes, redondance, risques, priorités ; **export Word au modèle d'entreprise** (JSZip et docx embarqués, `modele-word.js`). Base WerbMap au **schéma 5**.

### Changements
- `groupe:echelles` (charte §5.4) est aussi lu par WerbMap (échelle D / I / C des fiches SI).

### Corrections
- Test `charte/tests/test_verrou_modules.py` fiabilisé (CHA-1) : la lecture du fichier par le test est retentée quand l'autre onglet est en train de l'écrire (`NotReadableError`, JSON incomplet), au lieu d'échouer une fois sur deux.

## [0.22.0] — 2026-10

### Ajouts
- **Thème clair / sombre dans tous les modules** (charte §7.5, étape 2 terminée) : socle 1.7.1, couleurs en variables avec valeurs sombres propres à chaque module, audit sans avertissement, nouveau test `tests/test_theme.py` dans chaque dépôt (chaque entrée du menu avec Windows en sombre puis en clair : aucun fond clair ni texte sombre sur fond sombre, couleurs métier vérifiées, impression en clair) :
  - **WerbRecette 1.3.0** (35 couleurs) et **WerbExploitation 1.3.0** (23 couleurs, planning) ;
  - **WerbPentest 1.3.0** (gravités CVSS inchangées, aide-mémoire sur fond de terminal) ;
  - **WerbAssets 1.2.0** (repères d'état des ports, procédure de sécurisation) ;
  - **WerbNIS2 1.2.0** (cotations inchangées, pourcentages sur les couleurs d'état communes) ;
  - **WerbGouvernance 1.3.0** ;
  - **WerbReferentiels 1.1.0** (bouton du thème dans `#werb-theme` : pas de bandeau de verrou ; carte mentale ; teintes par `teinteCss`) ;
  - **WerbEBIOS 1.3.0** (72 couleurs : tons de risque 1 à 4, cartographies des risques et de l'écosystème ; teintes par `teinteCss`) ;
  - **WerbTools_IEC62443 1.8.0** (44 couleurs ; niveaux SL, statuts de conformité) ;
  - **WerbMap 1.7.0** (feuille de style intégrée et palette propre : valeurs sombres de `--head`, `--pri`, `--mut`, `--err` ; criticités et statuts de la matrice VLAN).
- **Lecteur de guides 1.2.0** (`guides.js`, charte §7.4) : thème sombre du lecteur (document, sommaire, cartes, code, citations, tableaux), titres sous texte blanc sur `--navy-fond` ; repris par WerbPentest, WerbNIS2, WerbReferentiels, WerbEBIOS et WerbTools_IEC62443.

### Corrections
- **Socle 1.7.1** : en sombre, la couleur des champs du socle (`:root[data-theme=sombre] select`, spécificité 0,2,1) l'emportait sur les listes colorées des modules (`select.et.Comp`, même spécificité, déclarée avant) : états du planning, résultats OK / KO sans couleur. La règle passe à une spécificité minimale (`:where(:root)[data-theme=sombre] :where(input…, select, textarea)`, 0,1,0) : une règle du module qui vise un champ par une classe l'emporte ; un champ du module sans classe (`input { background: #fff }`) reste corrigé par le socle.
- Charte §7.5 : règle des champs colorés par le module.
- **Portail 1.5.1** : réassemblé avec le socle 1.7.1.
- Test `charte/tests/test_theme.py` : une liste colorée par le module garde sa couleur en sombre (échoue avec le socle 1.7.0).

## [0.21.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5) :
  - **Socle 1.7.0** : `WerbSocle.theme` — trois modes, **Auto** (thème de Windows, par défaut, suivi en direct), **Clair**, **Sombre**, choisis par un bouton du bandeau (🖥️ → ☀️ → 🌙) placé dans `#werb-theme` ou à défaut devant le bandeau du verrou ; thème effectif sur `<html data-theme>`. Palette sombre validée (`WerbSocle.theme.SOMBRE`) appliquée aux variables communes du portail et des modules (`--bg`, `--card`, `--ink`, `--navy`…), nouvelles variables `--navy-fond` (fonds sous texte blanc), `--th`, `--champ`, `--info-bg` ; éléments communs corrigés (bandeau, bouton principal, champs, en-têtes de tableau, fenêtres, verrou, menu). Teintes du menu commun et des titres de cartes en sombre : `WerbSocle.teinteCss(nom)`. **Impression et exports toujours en clair** (valeurs sombres à l'écran seulement). **Rien n'est mémorisé** : le portail transmet le thème dans le lien (`lien.creer(…, { theme })`, `lien.avecTheme(url, theme)`).
  - **Portail 1.5.0** : bouton du thème dans le bandeau ; feuille de style entièrement en variables (notifications en teintes fixes lisibles dans les deux thèmes) ; liens « Ouvrir » et puces des bases porteurs du thème choisi, mis à jour quand il change.
  - Modèle de module : variables communes, bandeau sur `--navy-fond`.
  - `werb_charte.py audit` : pour un module au socle 1.7.0 ou plus, avertissement sur les couleurs écrites en dur dans `style.css` hors variables et impression (texte blanc sur fond coloré admis).
- Tests `charte/tests/test_theme.py` (27 contrôles) et `portail/tests/test_theme.py` (10 contrôles).

### Changements
- Charte §7.5 (nouvelle). Les modules gardent leur socle jusqu'à leur prochaine version (étape 2 : passage au socle 1.7.0 et conversion de leurs couleurs propres).

## [0.20.0] — 2026-10

### Ajouts
- **WerbRecette 1.2.0 publié**, base au **schéma 2** avec migration automatique sans perte à l'ouverture (les versions antérieures refusent une base au schéma 2 au lieu d'en effacer les nouveaux champs) : IP source et destination sur chaque test (interface imposée au ping et aux tests de port dans les scripts), protocole TCP ou UDP (résultat « non déterminé » pour un UDP sans réponse), profils de tests choisis sur la ligne (le rôle reste une qualification de la machine), IP destination et protocole dans les profils, signalement « à rejouer » d'un test modifié depuis son résultat.

## [0.19.0] — 2026-10

### Ajouts
- **WerbRecette 1.1.0 publié** : les rôles des machines reçoivent les **listes de choix du groupe** (charte §5.9) ; un rôle retiré mais employé (machines, modèles, destinations `@rôle`) est conservé et signalé ⚠, un renommage est proposé et appliqué partout sur demande.
- **WerbPentest 1.2.0 publié** : nouvelle page **⚙️ Base › Référentiels** (types de test, méthodologies, environnements, catégories de vulnérabilité, auparavant écrits dans le code) et réception des listes du groupe.
- Les listes de choix du groupe sont reprises par tous les modules qui ont des listes métier : WerbExploitation, WerbMap, WerbAssets, WerbRecette, WerbPentest. Portail réassemblé : **27 listes** déclarées par 5 modules. WerbGouvernance, WerbEBIOS, WerbNIS2, WerbTools_IEC62443 et WerbReferentiels n'ont que des listes normatives ou déjà publiées par le groupe.

## [0.18.0] — 2026-10

### Ajouts
- **WerbMap 1.6.0 publié** : types d'actif, types de machine, abréviations des TAG (liste en paires), couches switch, types de NAT, rôles et domaines de procédure reçoivent les **listes de choix du groupe** (charte §5.9). Fusion après la connexion et à l'ouverture de l'espace, valeurs du groupe non modifiables dans *Référentiels*, valeur retirée mais employée signalée ⚠, remplacements proposés (jamais pour une abréviation : un TAG est un identifiant stable), copie gardée dans la base et couverte par la chaîne d'intégrité. Zones, pare-feux et réseaux restent propres au site.
- **WerbAssets 1.1.0 publié** : nouvelle page **⚙️ Base › Référentiels** (types de port des switch, des bandeaux, de lien WAN, auparavant écrits dans le code) et réception des listes de choix du groupe, sur le même modèle.
- Portail réassemblé : 21 listes déclarées par 3 modules dans *⚙️ Administration › Listes de choix du groupe*.

### Changements
- `portail/tests/test_listes.py` : les manifestes ne gardent que les listes du test, quelles que soient celles des modules publiés.

## [0.17.0] — 2026-10

### Ajouts
- **WerbExploitation 1.2.0 publié** : premier module qui reçoit les **listes de choix du groupe** (charte §5.9, socle 1.6.0). Ses 11 listes de *Référentiels et thèmes* sont déclarées dans `module.json › listes` et apparaissent donc dans le portail (⚙️ Administration › Listes de choix du groupe). Fusion automatique à l'ouverture de la base, au rattachement au site et à l'ouverture de l'espace ; valeurs 🏢 du groupe non modifiables, valeurs 📍 du site conservées, valeur retirée mais employée signalée ⚠, remplacements proposés (*Remplacer*), copie gardée dans la base pour le travail sans espace.
- Portail réassemblé (manifeste de WerbExploitation 1.2.0 intégré).

## [0.16.0] — 2026-10

### Ajouts
- **Portail 1.4.0 – ⚙️ Administration › Listes de choix du groupe** (charte §5.9) : les listes déclarées par les modules (`module.json › listes`) rangées par module, avec leurs valeurs publiées ou, avant la première publication, celles du module. Ajouter, retirer, modifier une valeur (une valeur publiée dont le texte change est un **renommage** ; pour une liste en paires, seul un changement de clé l'est), revenir à la publication ou aux valeurs par défaut du module ; doublons (casse et accents ignorés) et valeurs vides bloquent la publication. *Publier* (auteur obligatoire, confirmation avec le résumé des changements) écrit `groupe:listes` dans `publications/werbsmsi.json` : retraits dans `retirees`, renommages dans `renommees`, historique gardé tant que la valeur ne revient pas ; listes publiées dont le module ne déclare plus la liste conservées. Refus clair si les droits ne permettent pas d'écrire dans `publications/`.
- Portail réassemblé avec le **socle 1.6.0**.
- Test `portail/tests/test_listes.py` (30 contrôles : page sans espace, première publication, ajout, retrait, renommage, doublon, paires, retour d'une valeur, liste orpheline, fusion par le socle d'un site, contrôle de l'espace), lancé par `werb_charte.py tester`.

## [0.15.0] — 2026-10

### Ajouts
- **Listes de choix du groupe** (charte §5.9) : le groupe fixe le vocabulaire des listes de choix **métier** (types d'actif, périodicités, types de port…), chaque site le reçoit et le complète. Les listes normatives (NIS2, CVSS, IEC 62443) et propres au site (zones, pare-feu) ne sont pas concernées.
  - **Socle 1.6.0** : `WerbSocle.listes` — `lireGroupe` (objet `groupe:listes` de l'espace), `fusionner` / `appliquer` (fusion automatique à l'ouverture d'une base de site : valeurs ajoutées par le groupe, valeurs propres au site conservées, valeur retirée par le groupe mais employée conservée et signalée ⚠, renommages et harmonisations seulement proposés, copie des valeurs du groupe gardée dans la base pour fonctionner sans espace), `proteger` (une valeur du groupe n'est ni modifiable ni supprimable dans un site), `message` (bandeau d'information), repères 🏢 📍 ⚠. Comparaison sans casse ni accents ; listes en paires `[clé, libellé]` comparées par la clé.
  - `module.json › listes` (facultatif) : `id`, `libelle`, `forme` (`simple` ou `paires`), `defaut` ; schéma `module` mis à jour ; contrôlé par `werb_charte.py audit` (identifiants, forme, valeurs par défaut uniques ; avertissement si `groupe:listes` n'est pas consommé).
  - Objet `groupe:listes` (§5.4) publié par le portail dans `publications/werbsmsi.json` ; schéma `publication_groupe` et contrôle de l'espace (`werb_charte.py espace`) mis à jour. La page du portail qui gère et publie ces listes viendra dans la prochaine version.
- Test `charte/tests/test_listes.py` (40 contrôles : chaque règle de fusion, lecture dans un espace, audit de la déclaration), lancé par `werb_charte.py tester`.

### Changements
- Charte §4 (`listes`), §5.4 (`groupe:listes`), §5.6 (publication des listes parmi les écritures du portail), nouvelle section §5.9.
- `charte/tests/test_verrou.py` : version du socle attendue 1.6.0.
- Les modules gardent leur socle 1.5.0 jusqu'à leur prochaine version (l'audit le signale en avertissement) ; le portail sera réassemblé avec le socle 1.6.0 à sa prochaine version.

## [0.14.0] — 2026-10

### Ajouts
- **WerbRecette 1.0.0 publié** (rubrique Exploitation, niveau site) : recette réseau et contrôles de non-régression, d'après le classeur « État des lieux des tests réseau ». Machines publiées par WerbMap (`site:actifs`, `site:zones`) complétées de leur IP, système et rôle ; tests entre machines (ping, DNS, NTP, SMB, HTTPS, RDP, SSH, port TCP, commande) avec l'attendu « doit passer » ou « doit être bloqué » ; modèles par rôle ; campagne de référence et contrôles comparés (régression, écart de sécurité, corrigé) ; pour les lignes choisies, script PowerShell ou bash par machine source et liste des commandes ; import des résultats des scripts ; rapport imprimé et Excel. Rien n'est publié.

## [0.13.0] — 2026-10

### Ajouts
- **WerbAssets 1.0.0 publié** (rubrique Inventaires ICS, niveau site) : fiches de configuration des assets réseau reprises du classeur « Fiche configuration asset ». Assets publiés par WerbMap (`site:actifs`, `site:zones`) rangés par type (pare-feu, switch, autres assets) et par zone ; fiches pare-feu (accès WAN, interfaces et VLAN) et switch (administration, VLAN, ports) avec la procédure de configuration et de sécurisation ; brassage des baies (bandeaux, raccordements) ; fiches orphelines conservées quand un actif disparaît de WerbMap ; un classeur Excel par type (modèle de saisie, export, import avec rapport) ; impression PDF. Rien n'est publié : la configuration des équipements reste dans la base du site.

### Changements
- `portail/tests/test_sauvegarde.py` : le nombre de modules attendu dans le manifeste de sauvegarde est lu dans le registre, au lieu d'être écrit en dur.

## [0.12.0] — 2026-10

### Ajouts
- **Portail 1.3.0 – ⚙️ Administration › Sauvegarde et restauration** (charte §5.8) : archive `.zip` de l'espace complet, du groupe seul ou d'un site, fichiers octet pour octet et manifeste `werbsmsi.sauvegarde.json` (chemins, tailles, dates, SHA-256, versions des modules, date et auteur) ; vérification d'une archive (CRC et empreintes, fichiers hors manifeste) ; restauration fichier par fichier dans l'espace d'origine, avec aperçu des écarts (identique, différent, absent), refus sur une base verrouillée, copie préalable des fichiers remplacés et contrôle de l'empreinte après écriture. Archive écrite dans le fichier choisi par l'utilisateur, rien dans le navigateur.
- Test `portail/tests/test_sauvegarde.py` (25 contrôles), lancé par `werb_charte.py tester`.

### Changements
- Charte §5.6 : la restauration s'ajoute aux écritures du portail ; nouvelle section §5.8. Menu du portail : catégorie ⚙️ Administration.

## [0.11.0] — 2026-10

### Ajouts
- **Verrou commun des bases** (socle 1.5.0, charte §5.7) : `WerbSocle.verrou`. À l'ouverture d'une base déjà ouverte par un collègue : Annuler, Ouvrir en lecture seule ou Prendre la main. Bandeau permanent dans l'en-tête des modules (« 🔒 Ouvert par Prénom NOM depuis 14:32 »). Le fichier est relu à chaque enregistrement, au retour sur l'onglet et chaque minute : une prise de main est signalée, et l'enregistrement demande confirmation avant de remplacer le travail du collègue. Verrou retiré à la fermeture, expiré 12 h après la dernière écriture.
- Modules republiés avec le verrou : **WerbGouvernance 1.2.0**, **WerbExploitation 1.1.0**, **WerbEBIOS 1.2.0** (et lecteur de guides 1.1.0), **WerbNIS2 1.1.0**, **WerbPentest 1.1.0**, **WerbMap 1.4.0** (verrou pris après la connexion, édition désactivée en lecture seule), **WerbTools_IEC62443 1.7.0** (le verrou propre au module est remplacé par celui du socle).
- **Portail 1.2.0** : cadenas 🔒 sur la puce d'une base ouverte par un utilisateur (nom et heure en info-bulle) ; colonne « Ouverte par » limitée aux verrous valables, verrou expiré signalé ; verrou et métadonnées lus aussi pour les bases non déclarées.
- Tests : `charte/tests/test_verrou.py` (socle, 24 contrôles) et `charte/tests/test_verrou_modules.py` (WerbGouvernance, WerbTools_IEC62443 et WerbMap à deux utilisateurs, 17 contrôles), lancés par `werb_charte.py tester` (cible `charte`) ; test du portail : 49 contrôles.

### Changements
- Charte §5.1 : forme du verrou `{ par, depuis, vu, session }` ; nouvelle section §5.7. Modèle de module : emplacement `#werb-verrou` dans l'en-tête.
- WerbReferentiels (module de lecture, sans base) garde le socle 1.4.0 : rien à verrouiller.

### Ajouts (suite)
- **WerbMap 1.5.0 publié** : saisie en masse sur le Plan IP, les coffrets, les actifs réseau et les machines physiques et virtuelles — modèle de saisie Excel (listes déroulantes de la base, mode d'emploi), import de lignes `.xlsx` ou `.csv` (ajouter et mettre à jour par TAG ou adresse IP, ajouter seulement, remplacer), rapport des ajouts, mises à jour et rejets motivés avant application.

## [0.10.0] — 2026-10

### Ajouts
- **WerbTools_IEC62443 1.6.0 publié** : menu **🎯 Cadrage › Note de cadrage** (objectifs, objet de l'évaluation, périmètre, fiche système, contraintes, RACI, approbation tracée, export Word et PDF avec le modèle d'entreprise) et **✅ Exigences › Plan de traitement** (actions, priorités, critères de réussite, règles de clôture, proposition depuis les écarts). Lecteur de guides 1.1.0.
- **`werb_charte.py tester`** : lance les tests Playwright (Edge) du portail et des dépôts de modules du registre, ou de ceux désignés (`portail`, id de module, dossier de dépôt) ; bilan par fichier, code de sortie non nul en cas d'échec. Charte §10, étape 4 bis.

### Corrections
- `index.html` : la redirection vers le portail utilisait une barre oblique inverse (`portail\WerbSMSI.html`), mal interprétée hors de Windows (tablettes).

## [0.9.0] — 2026-10

### Ajouts
- **WerbPentest 1.0.0 publié** dans `modules/exploitation/` (niveau site) : outil de **reporting** de test d'intrusion autorisé (aucune exécution de commande). Mandat et règles d'engagement, périmètre (cibles reliées aux actifs WerbMap), suivi de méthodologie en 7 phases, vulnérabilités cotées en **CVSS v3.1** (calcul local conforme à la spécification FIRST, validé sur 400 vecteurs), plan de remédiation, aide-mémoire de méthodologie par phase, **rapport Word** habillé du modèle d'entreprise commun (JSZip + docx figés). Mission d'exemple fictive déclarée à LYON. Dépôt source `../WerbPentest` (sans git init), test Playwright de 25 contrôles.
- **WerbNIS2 1.0.0 publié** dans `modules/conformite/` (niveaux groupe et site), à partir du classeur « Règles et audits NIS2 » : fiche entité et site (statut essentielle / importante, contacts, activités, SIR), 20 règles NIS2 (lien NIS1, état actuel, reste à faire), grille de 152 points en 28 thématiques cotée OK / PL + / PL − / NC / N/A avec commentaire et preuves, couverture par thématique et par règle (16 points réservés aux entités essentielles), plan d'actions des écarts, rapport imprimable signé. Référentiel extrait par `outils/extraire_referentiel.py` (jamais les évaluations du classeur). Base d'exemple fictive déclarée à LYON dans l'espace de démonstration. Dépôt source `../WerbNIS2` (sans git init), test Playwright de 38 contrôles.
- **WerbReferentiels 1.0.0 publié** dans `modules/gouvernance/` (niveau groupe) : premier **module de lecture**, sans base ni publication. Un dossier par référentiel dans `referentiels/` (ANSSI, NIST, NIS2, ISO 27001), une catégorie du menu par dossier, carte de chaque référentiel (`0-carte.md`) en carte mentale, arborescence ou liste, sources officielles, **tableau de correspondances** NIS2 ↔ ISO/IEC 27001 ↔ NIST CSF 2.0 ↔ IEC 62443 ↔ ANSSI avec le module où se trouve la preuve, recherche plein texte. Ajouter un référentiel = ajouter un dossier et reconstruire. Dépôt source `../WerbReferentiels` (sans git init), test Playwright de 72 contrôles.
- **Module de lecture** (charte §4) : `module.json › donnees` devient facultatif ; sans lui, le module ne publie rien et n'a ni ouverture par lien ni base d'exemple (contrôlé par l'audit) ; schéma `module` mis à jour.
- **Lecteur de guides 1.1.0** (`guides.js`, charte §7.4) : sous-dossiers regroupés (`dossiers()`, `entrees(dossier)`), lecture enchaînée dans le dossier, liens Markdown relatifs entre pages (`[x](../2-NIST/0-carte.md)`) ouverts dans le module, étiquette `.wg-li` sur les éléments de liste. Compatible avec les guides plats d'IEC et d'EBIOS.
- `module.json › guides` : dossier des guides quand il ne s'appelle pas `guides` ; `construire`, `audit` et `publier` le prennent en compte, sous-dossiers compris.

### Changements
- **Licence MIT** : fichier `LICENSE` à la racine de WerbSMSI, de chaque dépôt de module et du modèle de la charte ; `module.json › licence` passe de « Usage interne » à `MIT` ; `publier` copie `LICENSE` dans le paquet. Paquets republiés sans changement de version (livrables HTML identiques).
- **Portail 1.1.1** : un module sans base n'a ni puce de base ni ligne dans le tableau des dossiers ; sa tuile indique « lecture seule, sans base ». Test du portail : 45 contrôles.
- Audit : un composant commun (`guides.js`, `modele-word.js`) d'une version antérieure donne un **avertissement** (à actualiser à la prochaine version du module), comme le socle ; seule une copie modifiée reste une erreur. Les dépôts WerbEBIOS et WerbTools_IEC62443 (guides 1.0.0) sont dans ce cas.

## [0.8.0] — 2026-10

### Ajouts
- **WerbEBIOS 1.0.0 publié** dans `modules/risques/` (niveaux groupe et site) : EBIOS Risk Manager conforme à WerbSMSI — 5 ateliers, référentiel MITRE ATT&CK Enterprise et ICS, cartographies, rapport Word signé, publication du groupe (échelles, valeurs métier, événements redoutés, couples SR/OV), reprise au site, biens supports reliés aux actifs WerbMap, synthèse des risques. Analyses d'exemple (groupe et LYON) dans l'espace de démonstration.
- **WerbExploitation 1.0.0 publié** dans `modules/exploitation/` (rubrique Exploitation, niveau site) : les huit registres FWKSI (registre de suivi, mises à jour, applicatifs, certificats, licences, sauvegardes, interventions, comptes et matrices d'accès). Les champs machine, TAG, source, destination et système associé proposent les actifs publiés par WerbMap, filtrés par thème. Les cinq rubriques ont un module publié.
- **Portail 1.1.0** : vue **Mise en place** (créer un espace `SMSI_<SIGLE>` par formulaire guidé, ajouter un site, préparer un nouveau module avec contrôle des règles et commandes à copier) ; **une puce par site sous chaque module** qui ouvre le module sur la base du site ; bouton **Déclarer** pour une base présente mais non déclarée ; page **❓ Aide › Guide pas à pas** (créer la base d'un site et faire apparaître son raccourci) ; menu commun et titres à emoji sur fond de couleur. Charte §5.5 et §5.6.
- **Socle 1.4.0** : `WerbSocle.lien` (ouverture d'une base de l'espace depuis un lien du portail), `espace.ouvrirFichier`, `adopter`, `creerDossier`, `relire` ; le sélecteur de l'espace rouvre le dernier dossier choisi (identifiant `werbsmsi-espace`, retenu par Edge). Manifeste : `ouvertureParLien`.
- **Menu latéral commun** : `WerbSocle.menu` (socle 1.3.0) affiche des catégories repliables avec emoji, chevron et titre sur fond de couleur (10 teintes). Charte §7.1.
- Espace de démonstration : actifs LYON enrichis (famille, emplacement, OS, hyperviseur), base `exploitation/Exploitation_LYON.werbexploitation.json` déclarée, base de gouvernance du groupe `groupe/gouvernance/Gouvernance_GDI.werbgouvernance.json` déclarée.
- **Bases d'exemple intégrées** : `module.json › exemple` (schéma `module`, charte §4) ; `construire` l'intègre au livrable (`window.WERB_EXEMPLE`). Bouton **🧪 Base d'exemple** à côté de *Nouvelle base* et *Ouvrir* dans WerbGouvernance et WerbExploitation, **🧪 Base de démonstration** dans WerbMap (WerbTools_IEC62443 avait déjà son *Projet d'exemple*).

- **Modèle Word d'entreprise commun** (charte §7.2) : `SMSI_<SIGLE>/modeles/Modele_entete.docx`, repris par WerbEBIOS (rapport) et WerbTools_IEC62443 (cahiers) ; composant commun `modele-word.js` (copie conforme contrôlée par l'audit), balises communes ; le dossier `modeles/` est créé avec l'espace (portail et `werb_charte.py groupe`) ; modèle d'exemple dans l'espace de démonstration. Socle : `espace.fichier()`.

- **Guides d'accompagnement** (charte §7.4) : documents Markdown du dossier `guides/` d'un module, intégrés au livrable et lus dans le menu **❓ Aide** (étapes numérotées, sommaire cliquable, précédent / suivant). Composant commun `guides.js` (copie conforme contrôlée) ; `construire` intègre les guides ; l'audit vérifie qu'ils sont intégrés à jour ; `publier` copie `guides/` dans le paquet. Chaque guide est signé en première ligne (`<!-- <Produit> – Développé par @WerbHat -->`, vérifié par l'audit, affiché dans le bandeau du guide). Modules équipés : **WerbTools_IEC62443 1.5.0** (guide IEC 62443, checklist d'audit, plan de mise en œuvre, modèles et registres) et **WerbEBIOS 1.1.0** (guide méthodologique, cadrage, matrices des ateliers, socle de sécurité, rapport, plan de traitement, registre des risques, checklist qualité).

- **Logo @WerbHat** en haut à gauche du bandeau du portail et de chaque module (charte §7.3), intégré une seule fois dans le socle (`WerbSocle.LOGO`).

### Retraits
- L'ancien module d'analyse de risques (d'un autre auteur) est retiré du registre, du portail et de `modules/` ; WerbEBIOS devient propriétaire de `groupe:echelles`, `groupe:valeursMetier`, `groupe:evenementsRedoutes`, `groupe:sourcesRisque`, `site:biensSupports` et `site:syntheseRisques`. Ses analyses ne sont pas importées. Espace de démonstration converti (`publications/werbebios.json`). Charte §2 et §5.4 mises à jour.

### Changements
- **WerbMap 1.3.0**, **WerbGouvernance 1.1.0**, **WerbTools_IEC62443 1.4.0** publiés avec le menu commun et un menu **❓ Aide** (guide du module) dans chaque module @WerbHat. WerbMap : **Enregistrer sous…** et **export de la publication** en fichier pour WerbExploitation (chaîne contrôlée par le test de WerbMap). WerbTools_IEC62443 s'utilise aussi au **niveau groupe** (exigences cadre, `groupe/conformite/`) ; base d'exemple déclarée dans l'espace de démonstration. WerbMap publie des actifs enrichis et laisse licences, certificats, MCO et mises à jour à WerbExploitation.
- Schéma `publication_site` : champs `famille`, `emplacement`, `coffret`, `os`, `hote`, `fonction`, `marque` des actifs. Charte §5.4 mise à jour.
- `publier` enregistre le dépôt source en chemin relatif (`../WerbMap`) dans `registre_modules.json`.
- Les dépôts sources de WerbMap, WerbGouvernance et WerbTools_IEC62443, supprimés le 23/10, ont été **reconstitués** à côté de WerbSMSI depuis les paquets publiés (livrables reconstruits identiques octet pour octet), étiquetés à leur version d'origine, puis portés aux nouvelles versions.
- **🔗 Raccourcis d'espace** (option du portail, active par défaut) : le portail range la poignée du dossier de l'espace dans `werb.werbsmsi.raccourcis` ; un module ouvert depuis une puce ouvre la base sans passer par l'Explorateur (Edge peut demander d'autoriser l'accès). Effacée à la fermeture du portail ou de l'espace, ou en décochant l'option. Seule exception à P2, décrite en charte §1. Sans raccourci, le module accepte le dossier de l'espace, du site ou du module.
- Test du portail : 42 contrôles (4 bases déclarées à LYON, puces, liens, mise en place).

## [0.7.0] — 2026-10

### Ajouts
- **WerbGouvernance 1.0.0 publié** dans `modules/gouvernance/`, premier module créé avec `werb_charte.py nouveau` : politique, rôles, socle de mesures, prestataires cadre, procédures (import depuis WerbMap), revues de direction, plan d'actions. Publie `groupe:mesuresSocle`, `groupe:roles`, `groupe:prestataires` ; lit les synthèses des sites. Vérifié de bout en bout avec WerbTools_IEC62443, qui calcule l'état de chaque mesure du socle publiée.
- Les quatre rubriques existantes ont chacune un module publié ; portail réassemblé.

## [0.6.0] — 2026-10

### Ajouts
- **Module d'analyse de risques publié** dans `modules/risques/` (module d'un autre auteur, intégré par @WerbHat, retiré en 0.8.0) : niveau groupe (échelles, valeurs métier, événements redoutés, couples SR/OV retenus) et niveau site (reprise des éléments du groupe, synthèse des risques).
- **WerbTools_IEC62443 1.3.1 publié** : les zones publiées sans SL-T ne sont plus importées.
- Trois modules publiés ; portail réassemblé.

### Changements
- **Socle 1.2.0** : `WerbSocle.espace.publier` accepte un objet unique (les échelles du groupe) en plus des listes.
- `audit` : la règle « nom du dossier = produit » ne s'applique qu'aux paquets publiés ; le dépôt source garde le nom choisi par son auteur.

## [0.5.0] — 2026-10

### Ajouts
- **WerbMap 1.2.0 publié** dans `modules/inventaires/` : publication des zones (avec SL-T), conduits et actifs du site ; vérifié de bout en bout avec WerbTools_IEC62443, qui reprend zones et conduits.
- Portail réassemblé avec deux modules publiés ; test du portail piloté par le registre (attentes déduites des modules publiés).

### Changements
- `audit` : une base d'exemple non rattachée à un site (sans `meta.portee`) est acceptée.

## [0.4.0] — 2026-10

### Ajouts
- **Portail `WerbSMSI.html` 1.0.0** (`portail/`), lecture seule : rubriques et modules (état, version, ouverture), vue groupe (sites, conformité par site, risques résiduels, socle de mesures × sites, publications et bases du groupe), vues site (bases déclarées avec verrou et version, bases non déclarées, publications, zones), vérification des empreintes des livrables publiés.
- `werb_charte.py portail` : assemble le portail avec le registre et les manifestes intégrés, publie `portail/WerbSMSI.sha256`. `publier` le réassemble automatiquement.
- `werb_charte.py espace` signale les bases présentes mais non déclarées.
- Test `portail/tests/test_portail.py` (Playwright pour Python, Edge) : 21 contrôles.
- Espace de démonstration enrichi : vraie base WerbTools_IEC62443 1.3.0 à LYON (avec verrou), synthèses de conformité et de risques à LYON et NANTES, base non déclarée à NANTES.

### Changements
- **Socle 1.1.0** : `WerbSocle.espace.lister()` (contenu d'un dossier de l'espace). Les modules au socle 1.0.0 restent valides : l'audit signale une version antérieure (avertissement) et refuse un socle modifié (erreur).

## [0.3.0] — 2026-10

Décisions du cahier des charges et premier module publié. La charte reste en version 1.0 : WerbTools_IEC62443 est le premier module à l'adopter.

### Ajouts
- **Signature par module** : `auteur` et `signature` propres à chaque module ; pour un module d'un autre auteur , mention `Intégré à WerbSMSI par @WerbHat` obligatoire. Le préfixe `Werb` est réservé aux modules @WerbHat.
- Rubrique **Exploitation (MCO/MCS)**, niveau site, pour les registres FWKSI.
- **Fichiers de publication** : un par module (`publications/<id>.json`, au groupe et dans chaque site), écrits sur action explicite *Publier*. Schémas `publication_groupe` et `publication_site`.
- `socle.js` : `WerbSocle.espace` (choix du dossier `SMSI_<GROUPE>` sans mémorisation, lecture du groupe et des sites, fusion des publications, écriture de la publication du module seul).
- Charte §11 **Dépôts git** : un dépôt par module ; WerbSMSI ne reçoit que les paquets publiés.
- `werb_charte.py publier` : copie le paquet audité dans `modules/<rubrique>/<Produit>/` et met à jour le registre (`depot`, `etat`, `version`).
- **WerbTools_IEC62443 1.3.0 publié** dans `modules/conformite/`.

### Changements
- `registre_modules.json` : module d'analyse de risques, champ `depot`.
- `audit` : contrôles de signature selon l'auteur du module ; contrôles de sources ignorés pour un paquet publié.
- `espace` : contrôle des fichiers de publication (module = nom du fichier, portée, site, propriétaire unique par objet).
- Espace `SMSI_GROUPE_DEMO` régénéré au nouveau format.

### Suppressions
- `referentiel_groupe.json` et `referentiel_site.json`, remplacés par les dossiers `publications/`.

## [0.2.0] — 2026-10

Organisation à deux niveaux : groupe et sites. La charte reste en version 1.0, aucun module ne l'ayant encore adoptée.

### Ajouts
- Charte §5.2 à §5.4 : niveaux **groupe** (gouvernance, analyse de risques d'entreprise, applicabilité) et **site** (inventaires, analyses déclinées, exigences) ; espace `SMSI_<GROUPE>/` avec `groupe/` et `sites/<CODE>/` ; droits d'accès recommandés ; descente groupe → sites et remontée de synthèses sites → groupe.
- `module.json › portees` (`groupe`, `site`) et `registre_modules.json › rubriques[].portees`.
- Schémas `groupe`, `site`, `referentiel_groupe` (échelles, valeurs métier, événements redoutés, sources de risque, socle de mesures, rôles, prestataires cadre) et `referentiel_site` (zones, conduits, actifs, biens supports, prestataires, synthèses de risques et de conformité).
- `socle.js` : `meta.portee`, `meta.site` et `meta.groupeId` dans l'enveloppe ; références qualifiées `SITE:ID` (`qualifier`, `decomposer`).
- `werb_charte.py` : commandes `groupe`, `site` et `espace` ; contrôle des portées et des échanges dans `audit`.
- Espace fictif `demo/SMSI_GROUPE_DEMO` (un groupe, sites LYON et NANTES).
- Module prévu `werbgouvernance` au registre.

### Changements
- `echanges` s'écrit `<niveau>:<objet>` (ex. `site:zones`).
- `meta.workspaceId` devient `meta.groupeId`.

### Suppressions
- `workspace.schema.json`, `referentiel_commun.schema.json` et leurs modèles, remplacés par les schémas groupe et site.

## [0.1.0] — 2026-10

### Ajouts
- **Charte 1.0** (`charte/CHARTE.md`) : principes de sécurité, identité des modules, structure de dossier, manifeste `module.json`, enveloppe commune des bases JSON, espace de travail d'un site, échanges par `referentiel_commun.json`, en-têtes de fichiers, livrable HTML, plan de README, CHANGELOG, publication.
- Schémas JSON : `module`, `enveloppe`, `workspace`, `referentiel_commun`.
- Modèle de module : `signature.js`, `socle.js` 1.0.0 (purge limitée au module, enveloppe, ouverture et enregistrement de fichiers, empreinte, échappement), squelette HTML avec CSP, README, CHANGELOG, SECURITY.
- Modèles de données d'un site : `werbsmsi.workspace.json`, `referentiel_commun.json`.
- `registre_modules.json` : quatre rubriques, trois modules à intégrer.
- Outil `werb_charte.py` : commandes `nouveau`, `construire`, `empreinte`, `audit`.

---

WerbSMSI — Développé par @WerbHat
