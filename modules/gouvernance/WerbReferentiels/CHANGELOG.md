# Changelog — WerbReferentiels

Toutes les évolutions notables de WerbReferentiels sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).


## [1.5.1] — 2026-11

### Changements
- CRA — *Résumé des articles* : chaque article ou groupe d'articles devient un **sous-titre** (« Article 1 — Objet »), séparé de son texte descriptif, et apparaît dans le sommaire de la page.

## [1.5.0] — 2026-11

### Ajouts
- **CRA — Résumé des articles** (`referentiels/5-CRA/7-Resume_des_articles.md`) : table des 8 chapitres ; résumé chapitre par chapitre (articles 1 à 71 : objet, champ, catégories de produits, obligations des fabricants, signalement 24 h / 72 h / rapport final, importateurs et distributeurs, logiciels libres, conformité et marquage CE, organismes notifiés, surveillance du marché, actes délégués, sanctions, dispositions transitoires et calendrier) ; les 8 annexes ; les articles qui comptent pour un site industriel ; résumé en une phrase. Ajouté à la carte CRA.

## [1.4.0] — 2026-11

### Ajouts
- **Référentiel RGPD** (`referentiels/6-RGPD/`, règlement (UE) 2016/679) : carte ; *Comprendre le RGPD* (donnée personnelle, traitement, responsable, sous-traitant, CNIL, sanctions, principe de responsabilité, liens avec NIS2, ISO 27001 et 27701) ; *Principes et bases légales* (article 5, article 6 avec exemples industriels, données sensibles, durées de conservation recommandées) ; *Droits des personnes* (information, droits des articles 15 à 22, délai d'un mois, cas fréquents) ; *Obligations du responsable* (registre article 30, protection dès la conception, AIPD et neuf critères, violations et 72 h, sous-traitants article 28, transferts, DPO) ; *Sécurité des données et cybersécurité* (article 32, double notification CNIL et ANSSI, correspondance ISO 27001 et 27701, modules WerbSMSI) ; *Cas industriels* (badges, vidéosurveillance, biométrie, journaux des opérateurs, géolocalisation, télémaintenance, visiteurs, santé au travail) ; *Modèles et check-lists* (fiche du registre, check-list de site, procédure de violation, réponse aux demandes, contrat de sous-traitance) ; sources officielles. Renvois vers le module WerbRGPD.

## [1.3.0] — 2026-11

### Ajouts
- **Référentiel CRA** (`referentiels/5-CRA/`, règlement (UE) 2024/2847 sur la cyberrésilience) : carte ; *Comprendre le CRA* (produits concernés et exclus, calendrier — signalement depuis le 11 septembre 2026, application complète le 11 décembre 2027 —, sanctions, liens avec NIS2, IEC 62443, règlement « machines ») ; *Qui est concerné, et comment* (fabricant, importateur, distributeur ; intégrateur ou constructeur de machines : quand devient-on fabricant ; acheteur et exploitant ; classes par défaut, importante I et II, critique ; évaluation de la conformité) ; *Les exigences essentielles* (annexe I parties I et II expliquées avec les preuves attendues, signalement 24 h / 72 h / rapport final, correspondance IEC 62443-4-1 et 4-2) ; *Mettre en œuvre : le fabricant* (feuille de route en 10 étapes, documentation technique, période de support) ; *Mettre en œuvre : l'acheteur et l'exploitant* (inventaire, exigences d'achat, suivi avec les modules WerbSMSI, indicateurs) ; *Modèles et check-lists* (fiche produit, registre, check-lists, clause contractuelle, plan de signalement, tableau de bord) ; sources officielles.

### Changements
- Socle 1.9.0 (au lieu de 1.8.0).

### Développement
- `tests/test_theme.py` : socle 1.9.0 ; le référentiel CRA est contrôlé par `tests/test_referentiels.py` (une catégorie et des pages par dossier).

## [1.2.0] — 2026-10

### Ajouts
- **Bandeau commun** (charte §7.6, socle 1.8.0, TRV-7) : **☰** à droite du logo masque ou réaffiche le menu latéral ; **🖨 PDF** imprime la page affichée ou l'enregistre en PDF (module de lecture : ni base à ouvrir, ni export Excel). Recherche et thème restent dans le bandeau.

### Changements
- Mentions de **WerbIEC62443** (ex-WerbTools_IEC62443, renommé pour suivre WerbNIS2) dans l'aide et la documentation.
- Socle 1.8.0 (au lieu de 1.7.1).

### Développement
- Test `tests/test_bandeau.py` ; `tests/test_theme.py` : socle 1.8.0.

## [1.1.0] — 2026-10

### Ajouts
- **Thème clair / sombre** (charte §7.5, socle 1.7.1) : bouton 🖥️ / ☀️ / 🌙 du bandeau — **Auto** (suit Windows, par défaut), **Clair**, **Sombre** ; thème reçu du portail WerbSMSI dans le lien d'ouverture. Rien n'est mémorisé ; impression et exports toujours en clair.

### Changements
- Socle 1.7.1 (au lieu de 1.4.0) et lecteur de guides 1.2.0 (thème sombre du lecteur, charte §7.4).
- Bouton du thème placé dans le bandeau (`#werb-theme`), à côté de la recherche : ce module de lecture n'a pas de bandeau de verrou.
- `style.css` : les couleurs écrites en dur passent en variables, avec leur valeur sombre : champ de recherche du bandeau, code, surlignage des résultats (`--surligne`), cartes des référentiels, puces, carte mentale et arborescence (nœuds de tête sur `--navy-fond` sous texte blanc, nœuds de second niveau `--rf-bord-2`, traits `--rf-trait`).
- Teintes des référentiels (accueil, fil d'Ariane) : `WerbSocle.teinteCss`, qui suit le thème, au lieu de `WerbSocle.TEINTES`.

### Développement
- Test `tests/test_theme.py` : module ouvert avec Windows en sombre puis en clair, chaque entrée du menu (accueil, cartes et pages des référentiels) sans fond clair ni texte sombre en sombre, carte mentale et arborescence, valeurs claires inchangées, cycle du bouton, impression en clair, rien dans le stockage du navigateur.

## [1.0.0] — 2026-10

### Ajouts
- Premier module de lecture de WerbSMSI (rubrique Gouvernance, niveau groupe) : aucune base, aucune publication.
- Référentiels **ANSSI** (carte, 42 mesures d'hygiène, classification des systèmes industriels, sources), **NIST** (carte du CSF 2.0 et ses 22 catégories, guide, checklist d'audit, plan de mise en œuvre, modèles et registres, sources), **NIS2** (carte, obligations des articles 20, 21 et 23 avec preuves attendues, sources) et **ISO/IEC 27001** (carte, guide ISO/IEC 27000, sources).
- **Tableau de correspondances** NIS2 ↔ ISO/IEC 27001:2022 ↔ NIST CSF 2.0 ↔ IEC 62443 ↔ ANSSI, avec le module WerbSMSI où se trouve la preuve, et vue par domaine pour un site industriel.
- Menu à une catégorie par dossier de `referentiels/` ; carte de chaque référentiel en carte mentale, arborescence ou liste ; liens entre pages ; recherche plein texte ; bouton Précédent du navigateur.
- Test Playwright `tests/test_referentiels.py`.

---

WerbReferentiels — Développé par @WerbHat
