# Changelog — WerbEBIOS

Toutes les évolutions notables de WerbEBIOS sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).





## [1.21.0] — 2026-11

### Ajouts
- **Synthèse des risques publiée** (`site:syntheseRisques`) complétée pour le **tableau de bord GRC du portail** : gravité et vraisemblance résiduelles (`graviteResiduelle`, `vraisemblanceResiduelle`, quand le risque résiduel est coté), état de l'acceptation du risque résiduel (`acceptation` : `acceptee`, `expiree`, `a-faire`) et ses dates (`accepteLe`, `accepteJusqua`). Le nom de la personne qui accepte n'est pas publié.
- **Échelles publiées par le groupe** (`groupe:echelles`) : la **matrice** gravité × vraisemblance → niveau de risque s'y ajoute (`matrice[v − 1][g − 1]`), pour que le tableau de bord du portail colore sa matrice comme l'analyse. Les sites ne reprennent toujours que les libellés.

### Développement
- `tests/test_evenements.py` : contrôle des nouveaux champs.

## [1.20.0] — 2026-11

### Ajouts
- **Difficulté de mise à jour reçue de WerbExploitation** (`site:difficultesMaj`, WerbExploitation 1.40.0) : chargée avec l'inventaire WerbMap (*Intégration WerbSMSI › ⟳ Charger…*), gardée dans l'analyse (TAG, niveau N1 à N5, libellé, score sur 55, date ; ni le détail des évaluations ni les notes), trace au journal.
- **Biens supports** (atelier 1) : colonne **Difficulté MAJ** — niveau le plus difficile parmi les actifs WerbMap du bien support, actif concerné, score, nombre d'actifs évalués s'ils ne le sont pas tous ; N4 et N5 en alerte.
- **Scénarios opérationnels** (atelier 4) : colonne **Difficulté MAJ des biens visés**, même synthèse sur les actifs des biens supports visés.

### Choix
- **Aide à la cotation, sans effet sur elle** : un actif difficile à mettre à jour reste exposé longtemps après la sortie d'un correctif, ce que l'analyste peut retenir en cotant la vraisemblance. Le guide EBIOS RM ne décrit pas ce facteur : c'est un **complément du module**, et ni la vraisemblance proposée ni la cotation ne changent.

### Développement
- `tests/test_difficulte_maj.py`.

## [1.19.1] — 2026-11

### Développement
- Composant **guides.js 1.3.0** de la charte (images dans les guides), à la place de la 1.2.0 : l'avertissement de l'audit disparaît.

## [1.19.0] — 2026-11

### Modifications — vérification de l'atelier 4 sur le guide EBIOS RM (ANSSI, version 1.5 de septembre 2024)
Le guide demande de coter la **vraisemblance élémentaire** de chaque action élémentaire (jugement d'expert ou métriques, en confrontant les ressources et la motivation de la source de risque au socle de sécurité et aux vulnérabilités), puis d'évaluer la **vraisemblance globale** à partir de ces vraisemblances élémentaires, « par exemple » sur le **mode opératoire de moindre effort** pour la source de risque ; ou de l'estimer directement (**méthode expresse**, moins précise). Il ne décrit ni échelle de probabilité de succès, ni échelle de difficulté technique, ni grille les combinant : le détail est renvoyé à un supplément de fiches méthodologiques, non fourni.
- Méthode **« vraisemblances élémentaires »** (ancienne « standard ») : chaque action est cotée sur l'échelle de vraisemblance **V1 à V4** (au lieu d'une échelle de probabilité de succès propre au module).
- Méthode **avancée** (probabilité de succès × difficulté technique) conservée mais présentée comme **complément du module, hors guide**, dans la fiche, les échelles et le rapport.
- **Modes opératoires** : colonne **MO** (MO1 à MO4) dans la séquence d'attaque ; les actions d'un même mode opératoire s'enchaînent, des modes opératoires différents sont des alternatives. Vraisemblance proposée = celle du **mode opératoire de moindre effort** (le plus vraisemblable), chaque mode opératoire valant son action la moins vraisemblable (règle du module, indiquée comme telle). Graphe d'attaque : flèches par mode opératoire (MO2 en tirets, MO3 en pointillés), mention « MO2 · » sur les actions ; rapport Word idem.
- **Échelle de vraisemblance** : descriptions du guide (V1 « La source de risque a peu de chance d'atteindre son objectif visé… » à V4 « … va certainement atteindre son objectif visé… ») pour les nouvelles analyses ; les analyses existantes gardent leurs descriptions.
- Nouveau point d'attention, demandé par le guide (« faire un rapprochement entre la vraisemblance et la pertinence du couple SR/OV ») : vraisemblance à rapprocher de la pertinence du couple quand l'écart est d'au moins 2 niveaux.

## [1.18.0] — 2026-11

### Ajouts
- **Liens vers le site MITRE ATT&CK** sur la page *Référentiel MITRE ATT&CK* : site, matrices Enterprise et ICS, nouveautés des versions, données STIX ; chaque tactique et chaque technique (sous-techniques comprises) renvoie à sa fiche sur attack.mitre.org, dans un nouvel onglet.
- **Mise à jour du référentiel dans le module** : bouton **📥 Choisir les fichiers STIX…** (fichiers `enterprise-attack.json` et/ou `ics-attack.json` téléchargés chez MITRE) ; rapport des changements avant application (renommées, remplacées, ajoutées, retirées, matrices non fournies), mode sélection ou complet ; application **à la session** ou **enregistrement dans l'espace WerbSMSI** (`modeles/WerbEBIOS_mitre-attack.json`, auteur et date). À l'ouverture de l'espace, ce référentiel remplace celui embarqué s'il est plus récent (un référentiel d'espace plus ancien est ignoré et signalé) ; **↺ Revenir au référentiel embarqué**. Les analyses ne sont pas modifiées.
- **Référentiel embarqué mis à jour : ATT&CK Enterprise v20.1 et ICS v20.1** (données du 5 novembre 2026), 21 tactiques et 116 techniques : T1219 renommée « Remote Access Tools » ; techniques révoquées par MITRE remplacées par celles qu'il indique : T1562 → T1685 *Disable or Modify Tools*, T0857 → T1693.001 *System Firmware*, T0839 → T1693.002 *Module Firmware*, T0855 → T1692.001 *Command Message*, T0856 → T1692.002 *Reporting Message*.

### Modifications
- `outils/maj_mitre.py` : une technique révoquée est désormais **remplacée** à la même place par celle que MITRE indique (auparavant retirée) ; les sous-techniques ajoutées comme remplaçantes sont reconnues aux mises à jour suivantes.

### Développement
- `sources/src/mitre-maj.js` (`EbiosMitreMaj`) : règles de mise à jour du référentiel, sans état, identiques à l'outil en ligne de commande. Test `tests/test_mitre_import.py` (liens, import, session, espace, rechargement, référentiel d'espace plus ancien).

## [1.17.0] — 2026-11

### Ajouts
- **Version du référentiel MITRE ATT&CK** affichée en tête de la page *Référentiel MITRE ATT&CK* (versions Enterprise et ICS, date des données, nombre de tactiques et de techniques, date de mise à jour), dans *À propos* et dans la mention finale du rapport Word. Le référentiel actuel est indiqué « version ATT&CK non relevée » tant que l'outil n'a pas été passé.
- **Outil `outils/maj_mitre.py`** : met à jour le référentiel embarqué à partir des données STIX publiées par MITRE (github.com/mitre-attack/attack-stix-data), en fichiers locaux ou téléchargées avec `--telecharger` (aucun accès réseau sans cette option). Mode *sélection* (par défaut : noms mis à jour, techniques révoquées ou dépréciées retirées avec leur remplaçante signalée) ou `--complet` (toutes les techniques actives de chaque tactique, sans sous-technique). Rapport seul par défaut, écriture avec `--ecrire` ; le bloc est délimité par les repères `<mitre:debut>` / `<mitre:fin>` de `referentiels.js`.

### Modifications
- **Portefeuille plus rapide** : inventaire des dossiers `risques/` en parallèle ; seuls les fichiers nouveaux ou modifiés depuis la dernière lecture (date ou taille) sont relus et recalculés, les autres viennent d'un cache de session (en mémoire : rien n'est conservé dans le navigateur) ; lectures par lots de 6 en parallèle ; vignettes affichées au fil de la lecture avec un compteur ; bilan affiché (« 44 fichier(s) en 63 ms : 40 lu(s), 4 depuis le cache »).

### Développement
- **Calculs EBIOS RM extraits dans `sources/src/calculs.js`** (`EbiosCalculs`) : fonctions sans état qui reçoivent l'analyse en paramètre (pertinence, menace et zones, gravité, niveaux brut et résiduel, vraisemblance des actions et proposée, acceptation, points d'attention, KPI), date du jour injectable, `EbiosCalculs.pour(A)` pour des fonctions liées. `app.js` les applique à l'analyse ouverte ; le portefeuille calcule les autres analyses sans plus remplacer la variable globale de l'analyse ouverte.
- Tests : `tests/test_calculs.py` (calculs seuls, résultats attendus calculés à la main, date fixée, deux analyses côte à côte, analyse non modifiée), `tests/test_maj_mitre.py` (outil MITRE sur bundles STIX synthétiques et copie de `referentiels.js`) ; `test_portefeuille.py` complété (cache, 44 analyses, fichier modifié seul relu).

## [1.16.0] — 2026-11

### Ajouts — compléments du guide EBIOS Risk Manager
- **Atelier 2 · cartographie des sources de risque** (page Couples SR/OV) : un secteur par source de risque, chaque couple placé sur l'anneau de sa pertinence (centre = 4), plein s'il est retenu, creux s'il est écarté ; légende triée par pertinence.
- **Atelier 3 · menace résiduelle de l'écosystème** : dans la fiche d'une partie prenante, **mesures sur l'écosystème** (mesures du PACS) et **cotation résiduelle** (dépendance, pénétration, maturité, confiance après mesures ; une valeur vide reprend la cotation initiale) ; colonnes **Menace résiduelle** et **Zone résiduelle**. La cartographie de l'écosystème montre la **menace initiale et la menace résiduelle** côte à côte, avec le passage de zone. Mesures : colonne « Parties prenantes traitées ».
- **Atelier 4 · méthodes de cotation de la vraisemblance** : par scénario opérationnel, méthode **expresse** (cotation directe), **standard** (probabilité de succès de chaque action) ou **avancée** (probabilité de succès et difficulté technique, combinées par une grille). **Vraisemblance proposée** = celle de l'action la moins vraisemblable, avec le bouton **Appliquer** ; colonne « V proposée ». Échelles *Probabilité de succès* (1 à 4), *Difficulté technique* (0 à 4) et grille 4 × 5 modifiables dans Base › Échelles et matrice (grille par défaut à adapter).
- **Atelier 4 · graphe d'attaque** dans la fiche du scénario opérationnel : une colonne par phase (Connaître, Rentrer, Trouver, Exploiter), les actions numérotées dans l'ordre de la séquence, reliées par des flèches, bordées selon leur vraisemblance.
- **Atelier 5 · cadre de suivi des risques** : **propriétaire du risque** ; **acceptation formelle** du risque résiduel (accepté par, le, valable jusqu'au) et colonne Acceptation (à accepter, acceptée, expirée) ; carte **Cadre de suivi des risques** (instance, périodicité, dernière et prochaine revue, indicateurs) avec **✔ Revue effectuée aujourd'hui** qui calcule la prochaine revue.
- Points d'attention : partie prenante restant en zone de danger après mesures, mesures sans cotation résiduelle, actions à coter, vraisemblance différente de la valeur proposée, risque résiduel non accepté, acceptation expirée, cadre de suivi non défini, revue en retard.
- KPI : « Risques résiduels acceptés formellement » ; « Parties prenantes en zone de danger » compte désormais la zone après mesures.
- Rapport Word : § 4.2 *Mesures sur l'écosystème et menace résiduelle*, méthode de cotation et cotation des actions au § 5, § 6.6 *Cadre de suivi des risques* (avec propriétaires et acceptations).

## [1.15.0] — 2026-11

### Ajouts
- **Portefeuille des analyses** (menu **🗂️ Analyses › Portefeuille et KPI**, en tête du menu, et bouton de l'accueil sans analyse ouverte) : pilotage des analyses EBIOS RM d'année en année. Une analyse = une **référence** (préfixe des publications) = un fichier ; chaque revue est une nouvelle analyse, l'historique est conservé.
  - Lecture de l'espace WerbSMSI : `groupe/risques/` et `sites/<CODE>/risques/`, sous-dossiers compris (`risques/archives/`…), sans prendre de verrou ; l'analyse ouverte est ajoutée avec ses KPI du moment.
  - **Vignettes** rangées par périmètre (groupe, sites), de la plus récente à la plus ancienne : année, référence, statut, nom, date, version, origine, niveaux de risque bruts et résiduels (barres), risques, taux de traitement, mesures terminées, conformité au socle, points à traiter ; signalements « référence en double » et « référence à renseigner ». Filtres périmètre et statut.
  - **📂 Ouvrir** depuis une vignette (verrou de la base pris comme à l'ouverture habituelle).
  - **⧉ Dupliquer** (une vignette ou l'analyse ouverte) : nouvelle référence proposée (année avancée, jamais une référence existante, contrôle à la saisie), nom et version ; tout le contenu est repris, statut « En cours », origine tracée au journal ; option pour effacer les vraisemblances et cotations résiduelles à réévaluer. La copie est créée dans le dossier de l'analyse d'origine (`EBIOS_<site>_<référence>.werbebios.json`, refus si le fichier existe) ; hors espace, « Enregistrer sous » est proposé. L'analyse d'origine n'est pas modifiée.
  - **Évolution des KPI** d'un périmètre : 15 indicateurs (risques, risques bruts et résiduels élevés, réduction du risque, risques traités, mesures, mesures terminées, mesures en retard, conformité au socle, parties prenantes en zone de danger, points à traiter, valeurs métier, événements redoutés, couples retenus, scénarios stratégiques) et barres de niveaux, des analyses les plus anciennes aux plus récentes, avec tendance ▲ ▼ (vert = amélioration, rouge = dégradation).
- Étude : **statut de l'analyse** (En cours, Validée, Archivée) et **Dupliquée de** (référence d'origine).
- Point d'attention « Référence de l'étude non renseignée ».

### Modifications
- **Nom de fichier proposé à l'enregistrement** : `EBIOS_<site ou Groupe>_<référence>.werbebios.json` (auparavant `EBIOS_<site>.werbebios.json`), pour ne pas écraser l'analyse de l'année précédente. Les fichiers existants gardent leur nom.

## [1.14.0] — 2026-11

### Ajouts
- **Note « 💡 Aide à la saisie de cette page »** sous le titre de 20 pages (tableau de bord, cartographies, toutes les pages des ateliers 1 à 5, rapport, échelles, intégration WerbSMSI, journal) : à quoi sert la page, ce qu'il faut renseigner champ par champ (ou comment la lire) et conseils de méthode EBIOS RM. Le bouton **−** en haut à droite réduit la note, **+** la rouvre ; l'état est gardé page par page pendant la session (rien n'est conservé dans le navigateur). Masqué à l'impression.

### Modifications
- Présentation de l'atelier 5 : la **figure 3 du guide EBIOS Risk Manager** (lien entre les différents ateliers) remplace le schéma redessiné.

### Développement
- `sources/figures/*.png` : figures intégrées en URI `data:` par `build.py` (`window.WERB_FIGURES`).

## [1.13.0] — 2026-11

### Ajouts
- **Page « Présentation » en tête de chaque menu d'atelier** (A1 à A5) : descriptif de l'atelier repris du guide EBIOS Risk Manager de l'ANSSI (« Une démarche itérative en 5 ateliers »), notes du guide (approche par conformité à l'atelier 1, itérations entre ateliers 3 et 4, appréciation des risques aux ateliers 2 à 4, scénario de risque à l'atelier 5), pages du menu avec leur nombre de lignes, fil des 5 ateliers et lien vers l'atelier suivant.
- Atelier 5 : schéma du **lien entre les différents ateliers** (figure 3 du guide) : couple SR/OV → scénarios stratégiques (gravité) → scénarios opérationnels (vraisemblance) → scénarios de risque (niveau de risque).

## [1.12.0] — 2026-11

### Modifications
- **Nommage des fichiers exportés** (socle 1.12.0, charte §7.8) : les rapports, classeurs, documents, CSV et PDF produits par le module commencent par le code du groupe et celui du site, « SIGLE-SITE_ » (« SIGLE_ » pour une base du groupe), par exemple `GDI-LYON_…` ; les codes déjà présents dans le nom ne sont pas répétés. Les fichiers de base gardent leur nom ; hors espace (sigle inconnu), les noms ne changent pas. Titres (page, classeur, rapport Word, feuille Informations) : **nom du site** plutôt que son code.

### Développement
- Socle 1.12.0 (`WerbSocle.nommage` : `contexte`, `fichier`, `nomSite`, `libelleSite`, `nomGroupe`).

## [1.11.0] — 2026-11

### Modifications
- **Ouverture directe de la base demandée par le portail** (socle 1.11.0, charte §5.5) : ouvert depuis la puce d'une base du portail WerbSMSI, l'espace étant chargé dans le portail (🔗 Raccourcis), le module ouvre la base aussitôt, sans le bouton « 📂 Ouvrir … ». Si l'espace n'est pas accessible sans fenêtre (raccourci désactivé, autorisation d'Edge à donner), le bouton reste proposé comme avant.

### Développement
- Socle 1.11.0 (`WerbSocle.lien.ouvrirSansClic()`).

## [1.10.0] — 2026-11

### Modifications
- **Identification unique depuis le portail** (socle 1.10.0, charte §5.5) : ouvert depuis le portail WerbSMSI 1.16.0 (bouton *Ouvrir* ou puce d'une base), le module reprend le nom saisi une fois dans le portail ; l'écran « Votre nom » ne s'affiche plus, le journal, les publications et le verrou de la base reçoivent ce nom. Ouvert seul, le module demande le nom comme avant.

### Développement
- Socle 1.10.0 (`WerbSocle.lien.utilisateur()`, nom transmis dans le lien `#werbsmsi=…`, champ `u`).

## [1.9.0] — 2026-11

### Ajouts
- **Publication au site** (EBI-2, pour WerbPCR PCR-14) : `site:valeursMetier` (identifiant préfixé par la référence de l'étude, nom, nature, description courte) et, pour chaque bien support de `site:biensSupports`, les **valeurs métier qu'il porte** (`valeursMetier`, identifiants préfixés). WerbPCR en déduit les valeurs métier de chaque système d'information : celles des biens supports qui contiennent un actif du SI.

### Changements
- `site:valeursMetier` ajouté aux objets publiés (`module.json`) ; textes de la publication du site complétés.

### Format de données
- Publication du site : objet `valeursMetier` et champ `valeursMetier` des biens supports ajoutés (additif). La base de l'analyse ne change pas.

## [1.8.0] — 2026-10

### Ajouts
- **Atelier 3 › Parties prenantes** : les prestataires évalués dans WerbPresta (`site:evaluationsPrestataires`, PRE-8), reçus avec l'inventaire du site, **proposent** la **maturité cyber** (score ≥ 80 % : niveau maximal ; ≥ 60 % : un cran dessous ; ≥ 40 % : deux crans ; sinon 1) et la **confiance** (écart en retard : 1 ; certifié sans écart ouvert : maximal ; ≤ 2 écarts ouverts : un cran dessous ; sinon deux crans) ; **Appliquer** à la partie prenante choisie (proposée par son nom) ou **créer** la partie prenante (catégorie déduite du type) ; rien n'est appliqué sans action ; origine tracée au journal.
- Intégration WerbSMSI : *Charger les actifs et les SI publiés par WerbMap et les prestataires de WerbPresta* (`inventaire.prestataires`).

### Changements
- `site:evaluationsPrestataires` ajouté aux objets lus (`module.json`).

### Développement
- Test `tests/test_prestataires.py`.

## [1.7.0] — 2026-10

### Ajouts
- **Critères de sécurité** d'un événement redouté (Disponibilité, Intégrité, Confidentialité, Traçabilité ; plusieurs) et **besoin de sécurité**, coté sur une nouvelle échelle **« Besoin de sécurité »** (Base › Échelles et matrice : 1 Faible, 2 Modéré, 3 Fort, 4 Très fort, libellés et descriptions modifiables). Colonnes du tableau, de la fiche, du rapport Word (2.4) et de l'export Excel (EBI-1).
- **Publication au site de `site:evenementsRedoutes`** : identifiant préfixé par l'étude, valeur métier (identifiant et nom), description, critères, besoin, impacts, gravité, référence du groupe ; ER archivés exclus ; ni scénario, ni chemin d'attaque, ni justification. Lu par WerbPCR (périmètre métier du plan de cybersécurité et de reprise).
- Au groupe, l'échelle `besoins` est publiée avec les autres échelles, et chaque ER avec ses critères et son besoin ; **⇩ Reprendre du groupe** les reprend au site (le groupe fait foi ; un ER du groupe sans critères garde la saisie du site).

### Format de données
- Champs `criteres` et `besoin` des ER, échelle `echelles.besoins` ; schéma inchangé (1). Une analyse antérieure s'ouvre sans perte : échelle par défaut, champs vides.

### Développement
- Test `tests/test_evenements.py` ; analyses d'exemple et générateur `outils/exemples.py` complétés (critères et besoins, données fictives).


## [1.6.0] — 2026-10

### Ajouts
- **Sélection multiple et archivage** (TRV-4, charte §7.7) dans les tableaux des ateliers 1 à 5 (valeurs métier, biens supports, événements redoutés, sources de risque, parties prenantes, scénarios stratégiques et opérationnels, mesures…) et la vue « Risques et traitement » : case par ligne, « tout sélectionner », barre **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer**, **✕ Désélectionner**. Une ligne archivée est déplacée dans la réserve de la base (`archives`, date et auteur) : hors cartographie, risques publiés (`site:syntheseRisques`), biens supports publiés, tableau de bord et rapport ; ses liens sont gardés et reviennent au désarchivage. La vue « Risques et traitement » partage les données des scénarios opérationnels et n'offre pas la suppression.
- **Chercher / remplacer** (TRV-5) : colonne de texte libre choisie (ou toutes), aperçu avant d'appliquer ; identifiants, listes de choix et dates exclus.
- **Largeur des colonnes à la souris** (TRV-6) : poignée au bord des en-têtes, double-clic pour la largeur automatique ; largeurs enregistrées dans la base (`largeurs`), « ↔ Largeurs par défaut ».

### Changements
- Mentions de **WerbIEC62443** (ex-WerbTools_IEC62443, renommé pour suivre WerbNIS2) dans l'aide et la documentation.
- Socle 1.9.0 (au lieu de 1.8.0).

### Développement
- Test `tests/test_tables.py`.

## [1.5.0] — 2026-10

### Ajouts
- **Bandeau commun** (charte §7.6, socle 1.8.0, TRV-7) : **☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute l'analyse : feuille Informations puis une feuille par tableau des ateliers (missions, valeurs métier, biens supports, événements redoutés, socle, couples SR/OV, parties prenantes, scénarios, risques, mesures…)), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

### Changements
- Socle 1.8.0 (au lieu de 1.7.1).
- `xlsx.js` : version commune des modules WerbSMSI (dates au format date d'Excel, listes déroulantes, feuilles masquées).

### Développement
- Test `tests/test_bandeau.py` ; `tests/test_theme.py` : socle 1.8.0.

## [1.4.0] — 2026-10

### Ajouts
- **Systèmes d'information de WerbMap** (MAP-7.4, objet `site:si`) : chargés avec les actifs (**⟳ Charger les actifs et les SI publiés par WerbMap**) et copiés dans l'analyse. Carte « Systèmes d'information (WerbMap) » d'Intégration WerbSMSI : D / I / C et actifs de chaque SI, **Créer le bien support** (type *Système (ensemble)*, nom, actifs et description repris du SI, référence du SI gardée) puis **Mettre à jour** quand le nom ou les actifs du SI ont changé (écart signalé « à mettre à jour »). Création et mise à jour tracées au journal. Fiche d'un bien support : champ « SI WerbMap ».

### Changements
- **Publication `site:syntheseRisques`** : chaque risque porte les **biens supports visés** (`biensSupports`, identifiants publiés) et les **TAG de leurs actifs** (`actifs`). WerbMap 1.13 rattache ainsi les risques à ses fiches SI. Les scénarios restent dans l'analyse.

### Développement
- `tests/test_parcours.py` : SI listé, bien support créé depuis le SI (enregistré avec sa référence, journal), risques publiés avec leurs biens supports et leurs actifs.

## [1.3.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5, socle 1.7.1) : bouton 🖥️ / ☀️ / 🌙 du bandeau — **Auto** (suit Windows, par défaut), **Clair**, **Sombre** ; thème reçu du portail WerbSMSI dans le lien d'ouverture. Rien n'est mémorisé ; impression et exports toujours en clair.

### Changements
- Socle 1.7.1 (au lieu de 1.5.0) et lecteur de guides 1.2.0 (thème sombre du lecteur, charte §7.4).
- `style.css` : les 72 couleurs écrites en dur passent en variables, avec leur valeur sombre. Tons de risque 1 (vert) à 4 (rouge) en fond, bordure et texte (`--r1-bg` … `--r4-t`) : cases de la cartographie, bandeaux de gravité et de vraisemblance, tuiles d'échelle, jalons, phases d'attaque ; textes de niveau, étiquettes, planning, pastilles. Variables communes complétées (`--navy-fond`, `--info-bg`, `--th`, `--champ`) ; notifications sur teintes fixes.
- Pastilles de niveau (1 à 4, sous texte blanc) : couleurs inchangées dans les deux thèmes, en variables (`--niv1` … `--niv4`).
- Cartographie de l'écosystème (SVG) : zones et libellés sur les tons de risque, lisibles en sombre ; points des parties prenantes inchangés.
- Titres colorés des catalogues et de la base de connaissances : `WerbSocle.teinteCss`, qui suit le thème, au lieu de `WerbSocle.TEINTES`.

### Développement
- Test `tests/test_theme.py` : analyse d'exemple avec Windows en sombre puis en clair, les 31 entrées du menu (guides compris) sans fond clair ni texte sombre en sombre, case de niveau 1 de la cartographie et zone de veille de l'écosystème dans les deux thèmes, pastilles de niveau inchangées, valeurs claires inchangées, cycle du bouton, impression en clair, rien dans le stockage du navigateur.

## [1.2.0] — 2026-10

### Ajouts
- **Verrou commun des bases** (socle 1.5.0, charte §5.7) : à l'ouverture d'une base déjà ouverte par un collègue, choix entre **lecture seule** et **prise de main** ; bandeau permanent « 🔒 Ouvert par Prénom NOM depuis 14:32 » dans l'en-tête. Le fichier est relu à chaque enregistrement, au retour sur l'onglet et chaque minute : si un collègue a pris la main, le bandeau l'indique et l'enregistrement demande confirmation avant de remplacer son travail. Le verrou est retiré à la fermeture et expire 12 h après le dernier enregistrement.
- En lecture seule, les modifications restent possibles en mémoire, mais l'enregistrement demande de reprendre la main (« Enregistrer sous » produit une copie).

### Développement
- `socle.js` 1.5.0 de la charte WerbSMSI.
- `guides.js` 1.1.0 de la charte (copie conforme) : sans effet sur les guides plats du module.

## [1.1.0] — 2026-10

### Ajouts
- **Guides d'accompagnement** dans le menu **❓ Aide** (charte §7.4) : guide méthodologique EBIOS RM, cadrage de l'analyse, matrices des ateliers, évaluation du socle de sécurité, rapport d'analyse, plan de traitement, registre des risques, checklist qualité. Chacun s'affiche en mode lecture : étapes numérotées, sommaire cliquable, tableaux, cases à cocher, document précédent et suivant. Les guides sont aussi présentés sur la page *Guide du module* et sur l'écran d'accueil, sans analyse ouverte.
- Les guides sont les fichiers Markdown du dossier `guides/` du module, signés en première ligne : les modifier, en ajouter ou en retirer, puis reconstruire (`python sources/build.py`). L'ordre suit le nom des fichiers (`1-…`, `2-…`).

### Développement
- Composant `guides.js` 1.0.0 de la charte WerbSMSI (copie conforme auditée).

## [1.0.0] — 2026-10

Première version : module **Analyse des risques** de WerbSMSI, aux niveaux groupe et site (charte 1.0).

### Ajouts
- Les **5 ateliers EBIOS Risk Manager** : cadrage, missions, valeurs métier, biens supports, événements redoutés, socle ; couples SR/OV et pertinence ; parties prenantes (menace, zones), cartographie de l'écosystème, scénarios stratégiques ; scénarios opérationnels avec séquence Connaître / Rentrer / Trouver / Exploiter ; traitement, mesures du PACS, risques résiduels.
- Référentiel **MITRE ATT&CK** Enterprise et ICS (plus de 110 techniques, rattachées aux phases EBIOS), consultable et proposé dans les séquences d'attaque.
- Page **Couples SR/OV** : échelles de motivation, ressources et activité en tuiles ; catalogues numérotés des sources de risque (SR) et objectifs visés (OV), prédéfinis et complétables ; création de plusieurs couples d'un coup (un par objectif coché, doublons refusés) ; récapitulatif ; liaison événements redoutés ↔ couples.
- Page **Parties prenantes** : bandeau des échelles de dépendance, pénétration, maturité et confiance, et formule de menace avec les seuils de l'analyse ; libellés des cotations dans le tableau et dans Base › Échelles.
- Page **Scénarios opérationnels** : modes opératoires (Connaître → Rentrer → Trouver → Exploiter) et bandeau de l'échelle de vraisemblance (V1 à V4, nombre de scénarios par niveau).
- Page **Risques et traitement** : cartographie compacte gravité × vraisemblance avec la liste des risques (bascule brut / résiduel) et échelle des jalons du PACS (J1 court terme, J2 moyen terme, J3 long terme) ; champ **Jalon** des mesures, repris dans le rapport Word.
- Page **Aide › Base de connaissances** : sources de risque, objectifs visés, types de valeurs métier (liste enrichie, proposée dans le champ Nature), échelles de gravité, vraisemblance, parties prenantes et couples SR/OV, types d'impacts, de biens supports, de parties prenantes, phases d'attaque, types de mesures et jalons du PACS.
- Page Événements redoutés : bandeau de l'échelle de gravité (G1 Mineure à G4 Critique, description au survol, nombre d'événements par niveau).
- Échelles, matrice de risque et seuils de l'écosystème modifiables ; cartographies des risques avant / après traitement ; tableau de bord et points d'attention.
- **Rapport Word** complet et signé (bibliothèque docx embarquée), exports CSV ; habillage par le **modèle Word d'entreprise** (en-tête, pied de page, logo, marges, styles, balises `{{…}}`), commun aux modules : repris du dossier `modeles/` de l'espace ou chargé depuis un fichier, et copié dans l'analyse.
- Intégration WerbSMSI : publication du groupe (échelles, valeurs métier, événements redoutés, couples retenus) ; au site, reprise du groupe et du socle de WerbGouvernance, biens supports reliés aux actifs WerbMap, publication des biens supports et de la synthèse des risques.
- Menu latéral commun (socle 1.4.0), menu ❓ Aide, ouverture depuis le portail (`ouvertureParLien`), analyse d'exemple intégrée.
- Analyses d'exemple fictives (groupe et site LYON), test de parcours Playwright / Edge (36 contrôles).

### Format de données
- `WERBEBIOS`, schéma 1, enveloppe WerbSMSI.

---

WerbEBIOS — Développé par @WerbHat
