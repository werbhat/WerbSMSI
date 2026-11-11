# WerbSMSI

> Environnement modulaire de gestion d'un SMSI orienté OT, hors ligne, sur bases JSON
> Version **0.25.0** — Développé par **@WerbHat**

> 🧭 **Dirigeant, ou nouveau dans la cybersécurité ?** Commencez par le guide [Démarrer avec WerbSMSI](portail/guides/1-Demarrer_avec_WerbSMSI.md) : le SMSI en termes simples, qui fait quoi, et une feuille de route réaliste sur douze mois. Il se lit aussi dans le portail (❓ Aide).

---

## Principe

WerbSMSI réunit des outils HTML autonomes sous six rubriques, sur deux niveaux : le **groupe** pilote le SMSI, chaque **site** gère ses actifs, ses analyses, ses exigences et son exploitation.

| Rubrique | Groupe | Site | Modules | État |
|---|:-:|:-:|---|---|
| **Gouvernance SMSI** | ✅ | — | WerbGouvernance : politique (assistant PSSI : document en PDF et Word, approbation, charte utilisateur ; guide « Élaborer la PSSI »), rôles, socle de mesures, procédures, revues (indicateurs de formation en élément d'entrée), plan d'actions | **publié (1.13.0)** |
| | | | WerbReferentiels (module de lecture) : ANSSI, NIST, NIS2, ISO 27001, CRA, RGPD — cartes, synthèses, sources officielles, tableau de correspondances | **publié (1.5.1)** |
| **Analyse des risques** | ✅ | ✅ | WerbEBIOS : EBIOS Risk Manager (5 ateliers, MITRE ATT&CK, rapport Word), analyse d'entreprise au groupe, analyses déclinées par site | **publié (1.8.0)** |
| **Inventaires ICS** | — | ✅ | WerbMap : VLAN, adressage, actifs (zone de référence), flux, liste des SI et fiche de synthèse (RACI, D / I / C, Word), listes de choix reçues du groupe | **publié (1.27.0)** |
| | | | WerbAssets : fiches de configuration des assets réseau par type et par zone (pare-feu, switch, brassage des baies, autres équipements), procédure de sécurisation, saisie Excel | **publié (1.9.0)** |
| | | | WerbCartoSI : registre des schémas d'architecture d'un site — fiche (type, propriétaire, version, classification, revue, approbation), exigences couvertes et couverture (NIS2, ISO 27001, IEC 62443, ANSSI), fichier dans l'espace du site (présence vérifiée, chemin complet copié), adresse web ou chemin réseau, export Excel de preuve ; bibliothèque des modèles Visio de l'entreprise et création d'un schéma depuis un modèle (cartouche rempli, nom normalisé) ; liens vers les SI, zones et actifs de WerbMap, couverture des SI, historique des versions ; publication `site:cartographies` lue par le portail ; modèles Visio prêts à remplir (zones et conduits, accès distants, administration, sauvegarde et reprise) | **publié (1.6.0)** |
| **Conformité & exigences** | ✅ | ✅ | WerbIEC62443 au groupe (exigences cadre) et par site | **publié (1.11.0)** |
| | | | WerbNIS2 : audit NIS2 d'une entité ou d'un site (20 règles, 152 points en 28 thématiques, couverture, plan d'actions, rapport ; indicateurs de formation de WerbAcademie, schémas de WerbCartoSI et registre des sauvegardes de WerbExploitation en preuve) | **publié (1.8.0)** |
| | | | WerbPresta : liste de référence des prestataires d'un site — fiche (périmètre : SI, zones et actifs de WerbMap ; accès à distance, privilèges, comptes sans mot de passe, données confiées), criticité calculée, points d'attention, couverture des actifs ; prestataires repris de WerbGouvernance et WerbIEC62443 ; modèle de questionnaire et cahier d'exigences cyber en Word (IEC 62443-2-4, NIS2, ISO 27001), évaluation (score par domaine, écarts), publication `site:evaluationsPrestataires` (WerbEBIOS, WerbMap, WerbPCR), niveau groupe (consolidation des sites, modèle de questionnaire commun) | **publié (1.6.1)** |
| | | | WerbRGPD : conformité RGPD d'un site — registre des traitements (base légale, données sensibles, durées, sous-traitants, transferts, où sont les données dans WerbMap, critères d'AIPD), violations de données (72 h vers la CNIL), demandes d'exercice des droits (un mois), sous-traitants (article 28, repris de WerbPresta) | **publié (1.0.0)** |
| **Exploitation (MCO/MCS)** | ✅ | ✅ | WerbExploitation : registres FWKSI (tâches périodiques, mises à jour, applicatifs, certificats, licences, sauvegardes, interventions, comptes et accès), matériel, logiciels et PLM (références produit, stock et mouvements, référentiel logiciel et OS, cycle de vie, CRA ; catalogue commun au groupe), demandes de flux réseau (reportées dans la matrice de WerbMap une fois réalisées), actifs WerbMap proposés par thème, listes de choix reçues du groupe | **publié (1.24.0)** |
| | | | WerbPentest : rapport de test d'intrusion autorisé (mandat, périmètre, méthodologie, vulnérabilités CVSS 3.1, plan de remédiation, aide-mémoire, rapport Word) | **publié (1.6.0)** |
| | | | WerbRecette : recette réseau et contrôles de non-régression (tests entre machines WerbMap, référence, régressions et écarts de sécurité, scripts PowerShell et bash, rapport) | **publié (1.8.0)** |
| **Continuité & résilience** | ✅ | ✅ | WerbPCR : plan de cybersécurité et de reprise d'un site — **PCI** (plan de continuité informatique : périmètre métier EBIOS, approche systémique, SI WerbMap, fiches par SI, plan d'actions R#1 à R#10, document Word), et **PRI** (plan de reprise informatique : bilan d'impact, RTO / RPO, dépendances, ordre et procédures de reprise, contrôle des sauvegardes) ; indicateurs de formation du site sous R#1 | **publié (1.7.0)** |
| | | | WerbVeille : veille sur les menaces et les vulnérabilités d'un site — sources RSS, mots-clés tirés de l'inventaire WerbMap et des logiciels installés de WerbExploitation, kit de collecte (collecteur Python hors navigateur), import et tri des alertes, vulnérabilités exploitées (CISA KEV) et revendications de rançongiciels | **publié (1.6.0)** |
| | | | WerbAcademie : formation et sensibilisation des collaborateurs du groupe — catalogue de formations (chapitres, diapos, notes de l'animateur, liens vers des vidéos et des sites, quiz), six formations de départ (hygiène numérique, IA, clés USB, QR codes, mots de passe, rôle des dirigeants), personnes au minimum nécessaire (import CSV, durée de conservation) ; slides HTML (mode animateur, quiz) et PowerPoint avec le logo de l'entreprise ; sessions, présences et scores, émargement et quiz papier Word ; suivi des renouvellements par site et par population, dirigeants, purge ; indicateurs publiés sans nom (`groupe:formations`) | **publié (1.4.0)** |

Le groupe **diffuse** aux sites ses échelles de cotation, ses événements redoutés et son socle de mesures. Les sites **remontent** au groupe des synthèses (niveaux de risque, taux de conformité), jamais leurs détails.

- Chaque module s'ouvre seul dans Edge, a **son propre dépôt git** et **se met à jour indépendamment** des autres.
- Les données sont des fichiers JSON sur un **drive protégé** : la sécurité est celle des dossiers, avec un dossier par site pour cloisonner les droits.
- Le navigateur **ne conserve rien** : pas de cache applicatif, pas de stockage local.
- Les modules échangent par des **fichiers de publication**, un par module (`publications/<module>.json`), écrits seulement sur action *Publier*.
- Les modules @WerbHat partagent le **même menu latéral** (socle de la charte) : catégories repliables avec emoji, chevron et titre sur fond de couleur.
- **Thème clair / sombre** commun (charte §7.5) : bouton 🖥️ / ☀️ / 🌙 du bandeau, Auto suit Windows ; le portail transmet le thème au module qu'il ouvre ; impression toujours en clair.
- Les **listes de choix métier** (types d'actif, périodicités…) peuvent être fixées au groupe et sont héritées par les sites, qui gardent leurs valeurs propres (charte §5.9, socle 1.6.0).

Les règles communes sont dans la **[charte](charte/CHARTE.md)**.

---

## Portail

Ouvrir **`portail/WerbSMSI.html`** dans Edge. À l'arrivée, sans espace ouvert, une fenêtre propose d'ouvrir l'**espace de démonstration** livré avec WerbSMSI (`demo/SMSI_GROUPE_DEMO`, groupe fictif, sites LYON et NANTES) : le portail en connaît l'emplacement, affiche et copie son chemin complet, puis ouvre le sélecteur de dossier où il suffit de le coller (un navigateur ne peut pas ouvrir un dossier par son chemin). Le bouton **🧪 Espace de démonstration…** de l'accueil la rouvre.

| Vue | Contenu |
|---|---|
| **Accueil : parcours et modules** | Le **parcours en 7 étapes** (portail 1.12.0, d'après l'infographie « Démarrer avec WerbSMSI » : gouverner, connaître son SI, comprendre les risques, maîtriser les exigences, contrôler le terrain, assurer la résilience, faire vivre le SMSI) puis les modules rangés par étape ; l'infographie dans ❓ Aide ; le guide « Démarrer avec WerbSMSI » proposé aux dirigeants et aux débutants, l'état et la version de chaque module, bouton *Ouvrir* vers le livrable publié |
| **Groupe** (après *Ouvrir l'espace…*) | Sites (lisibles ou fermés par les droits), conformité par site, risques résiduels par site et les plus élevés, socle de mesures × sites, publications et bases du groupe, **bases par module et par site** |
| **Site** | Chiffres clés, bases déclarées (version, dernier auteur, **verrou « ouvert par… »**), bases présentes mais non déclarées (bouton **Déclarer**), publications, zones |
| **Mise en place** | **Créer un espace** (formulaire guidé : organisation, sigle, sites ; crée `SMSI_<SIGLE>` sur le drive), **ajouter un site**, **nouveau module** (contrôle des règles de la charte et commandes `werb_charte.py` prêtes à copier) |
| **❓ Aide** | Guide « Démarrer avec WerbSMSI » (dirigeants et débutants : SMSI en termes simples, rôles, feuille de route sur douze mois ; source `portail/guides/`), « Créer la base d'un site » (pas à pas), à propos |
| **Vérifier les modules** | Choisir le dossier WerbSMSI : l'empreinte SHA-256 de chaque livrable est comparée à celle enregistrée dans le portail |
| **🛠️ Outils › Modèles de documents** | Inventaire des modèles Word, Visio et Excel (`Modeles_docs/modeles.json`, portail 1.13.0) : rôle, modules qui les utilisent, balises, emplacement dans l'espace ; espace ouvert : modèle **présent** ou **absent** dans `modeles/` et `modeles/schemas/`, autres fichiers de ces dossiers. Lecture seule |
| **⚙️ Administration › Sauvegarde et restauration** | **Sauvegarder** l'espace complet, le groupe seul ou un site dans une archive `.zip` avec manifeste d'empreintes ; **vérifier** une archive ; **restaurer** fichier par fichier, avec aperçu des écarts, copie préalable des fichiers remplacés et refus sur une base verrouillée (charte §5.8) Bouton **💾 Sauvegarder l'espace** dans le bandeau (portail 1.10.0) : même sauvegarde, en évidence tant qu'aucune archive n'a été créée dans la session, puis « Sauvegardé à hh:mm » ; il lance l'archive directement quand « Réalisée par » est déjà renseigné, sinon il ouvre la page. |
| **⚙️ Administration › Listes de choix du groupe** | Listes de choix métier déclarées par les modules : ajouter, retirer, renommer des valeurs, puis **publier** `groupe:listes` pour tous les sites (charte §5.9) ; une valeur retirée reste dans un site qui l'emploie, un renommage y est proposé |
| **⚙️ Administration › Paramètres** | Réglages du portail communs à l'organisation, enregistrés dans `werbsmsi.groupe.json` (portail 1.11.0). **Modules affichés** : décocher les modules que l'organisation n'utilise pas pour les retirer des pages Accueil, Groupe et Site (une rubrique entièrement masquée disparaît, un renvoi indique le nombre de modules masqués) ; tout est affiché par défaut. Un module masqué reste installé : ses bases restent listées et signalées, la vérification et la sauvegarde l'incluent. Enregistrement explicite, réservé à qui peut écrire `werbsmsi.groupe.json` (équipe du groupe). |
| **❓ Aide › Guide pas à pas** | Créer la base d'un site, l'enregistrer au bon endroit, la déclarer et l'ouvrir depuis sa puce ; dossier et extension de chaque module (déduits du registre), dépannage |

- Menu commun à tous les modules : catégories 🏠 Accueil, 🏢 Groupe, 📍 Sites, 🛠️ Outils, ⚙️ Administration, ❓ Aide, sur fond de couleur ; titres de cartes et rubriques repérés par un emoji et une couleur.
- **Une puce par site sous chaque module** : 📍 la base du site (un clic ouvre le module sur cette base), grisée si le site n'en a pas, 🔒 si son dossier n'est pas accessible. Avec l'option **🔗 Raccourcis** (barre du portail, active par défaut), le module reçoit le dossier de l'espace et ouvre la base directement ; sinon il demande un dossier (espace, site ou module). La base s'enregistre ensuite à sa place (charte §1 et §5.5).
- Le portail n'écrit que sur action explicite : création d'un espace ou d'un site, déclaration d'une base, restauration choisie fichier par fichier, publication des listes de choix du groupe dans sa propre publication `publications/werbsmsi.json` (charte §5.6, §5.8 et §5.9). Il ne modifie jamais une base ni la publication d'un module hors restauration. Une page web ne peut pas lancer Python : l'espace est créé directement par le portail, avec les mêmes fichiers que `werb_charte.py groupe` et `site` (commandes équivalentes affichées).
- Le registre et les manifestes des modules sont **intégrés au portail** à l'assemblage (`werb_charte.py portail`, relancé automatiquement par `publier`). Son empreinte est publiée dans `portail/WerbSMSI.sha256`. Vérifier le portail puis, depuis le portail, les modules forme une chaîne de confiance.
- Comme les modules : hors ligne, CSP stricte, rien dans le navigateur, dossier de l'espace redemandé à chaque session.
- Tests : `python portail/tests/test_portail.py` (Playwright pour Python, Edge installé), 49 contrôles sur l'espace de démonstration : consolidation, puces et ouverture d'une base dans son module, enregistrement à sa place, création d'espace et de site, déclaration, formulaire de module, verrous ; `python portail/tests/test_sauvegarde.py`, 25 contrôles : archives complète et de site, empreintes, archive altérée ou d'un autre espace, restauration, base verrouillée, copie préalable ; `python portail/tests/test_listes.py`, 30 contrôles : listes de choix du groupe (publication, retraits, renommages, fusion dans un site). Tous les tests : `werb_charte.py tester`.

---

## Arborescence

```
WerbSMSI/                       ← code : partage en lecture seule
├── README.md · CHANGELOG.md
├── registre_modules.json       ← rubriques, niveaux, modules (chemin, dépôt, état, version)
├── charte/
│   ├── CHARTE.md               ← règles communes (identité, signature, données, publications, git…)
│   ├── schemas/                ← module, enveloppe, groupe, site, publication_groupe, publication_site
│   ├── modeles/module/         ← squelette d'un module conforme (dont socle.js : fichiers, espace, liens, menu commun, verrou, listes du groupe, thème)
│   └── outils/werb_charte.py   ← nouveau · construire · empreinte · audit · publier · portail · groupe · site · espace
├── portail/                    ← WerbSMSI.html (assemblé), WerbSMSI.sha256, src/, tests/, guides/
├── demo/SMSI_GROUPE_DEMO/      ← espace de démonstration fictif (1 groupe + 2 sites, modèles), ouvert depuis le portail
├── Modeles_docs/               ← référence des modèles Word, Visio et Excel, avec leur inventaire (README.md) et synchroniser.py (copies)
└── modules/<rubrique>/<Produit>/   ← paquets publiés (livrable, documentation, empreinte, exemples)

SMSI_<GROUPE>/                  ← données : drive protégé
├── werbsmsi.groupe.json        ← groupe, sites, bases du groupe          (lu par tous)
├── publications/               ← diffusé par les modules du groupe       (lu par tous)
├── DROITS.md                   ← droits d'accès à appliquer
├── groupe/                     ← équipe SMSI groupe seulement
│   └── gouvernance/ · risques/ · conformite/ · exploitation/ · continuite/
└── sites/
    └── <CODE>/                 ← équipe du site (+ lecture groupe)
        ├── werbsmsi.site.json
        ├── publications/       ← partagé dans le site et remonté au groupe
        └── inventaires/ · risques/ · conformite/ · exploitation/ · continuite/
```

---

## Utilisation de l'outil de charte

Prérequis : Python 3.10 ou plus récent, sans bibliothèque supplémentaire.

```powershell
# Créer un module conforme (dans son propre dépôt)
python charte\outils\werb_charte.py nouveau --id werbexemple --produit WerbExemple --rubrique exploitation --description "…" --dest D:\Git\WerbExemple

# Dans le dépôt du module : assembler, signer, contrôler, publier dans WerbSMSI
python charte\outils\werb_charte.py construire D:\Git\WerbExemple
python charte\outils\werb_charte.py empreinte  D:\Git\WerbExemple
python charte\outils\werb_charte.py audit      D:\Git\WerbExemple
python charte\outils\werb_charte.py publier    D:\Git\WerbExemple

# Contrôler tous les paquets publiés
python charte\outils\werb_charte.py audit

# Lancer les tests du portail et de tous les dépôts de modules (ou : tester portail werbmap ../WerbEBIOS)
# Prérequis : python -m pip install playwright (les tests pilotent Microsoft Edge)
python charte\outils\werb_charte.py tester

# Créer l'espace de données du groupe, ajouter les sites, contrôler la cohérence
python charte\outils\werb_charte.py groupe --dest "D:\Drive\SMSI_GDI" --organisation "Groupe …" --sigle GDI
python charte\outils\werb_charte.py site   "D:\Drive\SMSI_GDI" --code LYON --nom "Usine de Lyon"
python charte\outils\werb_charte.py espace "D:\Drive\SMSI_GDI"
```

---

## Feuille de route

1. ✅ Charte, schémas, modèles et outil d'audit ; organisation groupe / sites ; publications par module.
2. ✅ WerbIEC62443 1.3.0 : module de référence, publié.
3. ✅ Portail `WerbSMSI.html` 1.0.0 (lecture seule) : rubriques, vue groupe et consolidation, vues site, vérification des empreintes.
4. ✅ WerbMap 1.2.0 : rien dans le navigateur, CSP, base au schéma 4 (chaîne d'intégrité conservée), publication des zones (SL-T), conduits et actifs, reprise par WerbIEC62443.
   Reste : transférer les procédures SMSI à WerbGouvernance.
5. ✅ WerbGouvernance 1.0.0 : politique, rôles, socle de mesures publié pour tous les sites, procédures (import depuis WerbMap), revues, plan d'actions alimenté par les écarts des sites.
6. ✅ Menu latéral commun (socle 1.3.0) dans WerbMap 1.3.0, WerbGouvernance 1.1.0 et WerbIEC62443 1.4.0 ; dépôts sources reconstitués depuis les paquets publiés.
7. ✅ WerbExploitation 1.0.0 : les huit registres FWKSI, actifs publiés par WerbMap (enrichis : famille, emplacement, OS) proposés par thème.
   Reste : retrait des procédures de WerbMap au profit de WerbGouvernance.
8. ✅ Portail 1.1.0 : mise en place guidée (espace, sites, nouveau module), bases par site sous chaque module avec ouverture directe dans le module, déclaration des bases.
9. ✅ WerbEBIOS 1.0.0 : EBIOS Risk Manager conforme à WerbSMSI (menu commun, aide, liens du portail, rapport Word, MITRE ATT&CK).
10. ✅ WerbReferentiels 1.0.0 : premier module de lecture (sans base) ; un dossier par référentiel, carte mentale, tableau de correspondances. Portail 1.1.1, lecteur de guides 1.1.0 (dossiers, liens entre pages).
    Plus tard : base groupe des référentiels applicables par entité (NIS2 : entité essentielle ou importante), reprise par WerbGouvernance.
11. ✅ WerbNIS2 1.0.0 : audit NIS2 repris du classeur « Règles et audits NIS2 » (fiche entité et site, 20 règles, grille cotée, couverture, plan d'actions, rapport).
    Reste : remontée de la conformité NIS2 au groupe (objet d'échange dédié dans la charte).
12. ✅ WerbPentest 1.0.0 : rapport de test d'intrusion autorisé (rubrique Exploitation), outil de reporting — mandat, vulnérabilités CVSS 3.1, remédiation, rapport Word, aide-mémoire de méthodologie (sans exécution).
13. ✅ WerbAssets 1.0.0 : fiches de configuration reprises du classeur « Fiche configuration asset » (pare-feu, switch, brassage des baies, autres assets), assets publiés par WerbMap rangés par type et par zone, procédure de sécurisation, saisie Excel avec rapport d'import.
14. ✅ WerbRecette 1.0.0 : recette réseau reprise du classeur « État des lieux des tests réseau » ; tests entre machines WerbMap (dont les flux qui doivent être bloqués), modèles par rôle, référence et contrôles comparés, scripts de test PowerShell et bash générés pour les lignes choisies, import des résultats, rapport.
    Plus tard : tests proposés depuis la matrice de flux de WerbMap (objet d'échange à publier).
15. ✅ Listes de choix du groupe héritées par les sites : ✅ charte §5.9, `module.json › listes`, fusion dans le socle 1.6.0 ; ✅ portail 1.4.0 (⚙️ Administration › Listes de choix du groupe).
    ✅ WerbExploitation 1.2.0, WerbMap 1.6.0, WerbAssets 1.1.0 et WerbPentest 1.2.0 (avec une page Référentiels), WerbRecette 1.1.0 (rôles des machines).
16. ✅ Thème clair / sombre : socle 1.7.1, charte §7.5, portail 1.5.1, lecteur de guides 1.2.0 ; les 10 modules (WerbGouvernance 1.3.0, WerbReferentiels 1.1.0, WerbEBIOS 1.3.0, WerbMap 1.7.0, WerbAssets 1.2.0, WerbIEC62443 1.8.0, WerbNIS2 1.2.0, WerbExploitation 1.3.0, WerbPentest 1.3.0, WerbRecette 1.3.0).
17. ✅ WerbMap 1.8.0 : zone d'un actif réseau (référence, conflits avec la Matrice VLAN signalés). WerbMap 1.9.0 : Inventaires › Liste des SI, fiche de synthèse d'un SI (VLAN, D / I / C sur l'échelle EBIOS du groupe, flux et VLAN en échange calculés, RACI, risques, priorités), export Word au modèle d'entreprise ; base au schéma 5.
    ✅ Fiche SI alimentée par les autres modules (MAP-7.4) : risques EBIOS (WerbMap 1.13.0, WerbEBIOS 1.4.0), registre des sauvegardes (WerbExploitation 1.7.0, WerbMap 1.18.0), remédiations des tests d'intrusion (WerbPentest 1.6.0, WerbMap 1.19.0), par le TAG des actifs. Plus tard : score de risque calculé (MAP-8).
18. ✅ WerbCartoSI 1.0.0 : registre des schémas d'architecture d'un site, classé par catégorie d'exigence (couverture, revue, approbation, liens vers les fichiers).
    ✅ WerbCartoSI 1.1.0 : modèles Visio (groupe et site) et création d'un schéma depuis un modèle. 1.2.0 : liens WerbMap, couverture des SI, historique des versions. 1.3.0 : publication `site:cartographies`, lue par le portail 1.9.0.
    ✅ WerbMap 1.24.0 : schémas d'architecture dans la fiche SI (`site:cartographies`).
    ✅ WerbNIS2 1.7.0 : couverture des schémas proposée en preuve de 18 points de la grille d'audit d'un site.
    Non retenu pour l'instant : WerbIEC62443 (exigences par projet).
19. ✅ WerbRGPD 1.0.0 : conformité RGPD d'un site (registre, violations, demandes, sous-traitants) ; référentiel RGPD dans WerbReferentiels 1.4.0.
    Plus tard : analyse d'impact structurée, consolidation pour le DPO du groupe.
20. Export de la consolidation.

---

**WerbSMSI** — Développé par **@WerbHat**
