# Changelog — WerbRGPD

Toutes les évolutions notables de WerbRGPD sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), numérotation [SemVer](https://semver.org/lang/fr/).





## [1.5.0] — 2026-11

### Modifications
- **Comptes de l'espace** (socle 1.14.0, charte §5.11) : quand le module ouvre un espace qui a des comptes, le ticket transmis par le portail est vérifié ; sans ticket, une fenêtre de connexion s'affiche. Le compte connecté signe le journal et les publications. Une base d'un site sur lequel le compte n'est pas Éditeur s'ouvre en lecture seule (bandeau « Lecture seule · compte … ») ; une publication sans ce rôle est refusée. Hors espace, l'identification reste le nom seul.

### Développement
- Socle 1.14.0 ; tests : espace de démonstration copié sans ses comptes (identification par le nom), socle 1.14.0.

## [1.4.1] — 2026-11

### Corrections
- Liens vers les pages RGPD de WerbReferentiels mis à jour : WerbReferentiels 1.7.0 range ses référentiels par section (réglementation, normes, guides) et le dossier RGPD devient `3-RGPD` (adresses `#guide:3-rgpd-…`, auparavant `6-rgpd`).

## [1.4.0] — 2026-11

### Modifications
- **Aide › « Le RGPD dans WerbReferentiels »** : bouton **📖 Ouvrir la carte RGPD** et raccourcis (principes et bases légales, droits des personnes, obligations du responsable, sécurité et cyber, cas industriels, modèles et listes de contrôle) qui ouvrent le module de lecture WerbReferentiels directement sur la page RGPD, dans un nouvel onglet (adresse `#guide:…`, rien n'est conservé).

### Développement
- Test `tests/test_referentiels.py` (liens de l'aide, ouverture depuis l'emplacement publié dans WerbSMSI).

## [1.3.0] — 2026-11

### Modifications
- **Nommage des fichiers exportés** (socle 1.12.0, charte §7.8) : les rapports, classeurs, documents, CSV et PDF produits par le module commencent par le code du groupe et celui du site, « SIGLE-SITE_ » (« SIGLE_ » pour une base du groupe), par exemple `GDI-LYON_…` ; les codes déjà présents dans le nom ne sont pas répétés. Les fichiers de base gardent leur nom ; hors espace (sigle inconnu), les noms ne changent pas. Titres (page, classeur, rapport Word, feuille Informations) : **nom du site** plutôt que son code.

### Développement
- Socle 1.12.0 (`WerbSocle.nommage` : `contexte`, `fichier`, `nomSite`, `libelleSite`, `nomGroupe`).

## [1.2.0] — 2026-11

### Modifications
- **Ouverture directe de la base demandée par le portail** (socle 1.11.0, charte §5.5) : ouvert depuis la puce d'une base du portail WerbSMSI, l'espace étant chargé dans le portail (🔗 Raccourcis), le module ouvre la base aussitôt, sans le bouton « 📂 Ouvrir … ». Si l'espace n'est pas accessible sans fenêtre (raccourci désactivé, autorisation d'Edge à donner), le bouton reste proposé comme avant.

### Développement
- Socle 1.11.0 (`WerbSocle.lien.ouvrirSansClic()`).

## [1.1.0] — 2026-11

### Modifications
- **Identification unique depuis le portail** (socle 1.10.0, charte §5.5) : ouvert depuis le portail WerbSMSI 1.16.0 (bouton *Ouvrir* ou puce d'une base), le module reprend le nom saisi une fois dans le portail ; l'écran « Votre nom » ne s'affiche plus, le journal, les publications et le verrou de la base reçoivent ce nom. Ouvert seul, le module demande le nom comme avant.

### Développement
- Socle 1.10.0 (`WerbSocle.lien.utilisateur()`, nom transmis dans le lien `#werbsmsi=…`, champ `u`).

## [1.0.0] — 2026-11

### Ajouts
- Création du module (rubrique Conformité & exigences, niveau site ; étude `Etude_NEW_WerbRGPD.md`, pistes RGP-1 à RGP-5).
- **Registre des activités de traitement** (article 30) : finalité, base légale (intérêt légitime documenté, consentement de salariés signalé), personnes, données, données sensibles (exception de l'article 9), destinataires, sous-traitants, transfert hors de l'Union, durée de conservation, mesures de sécurité, localisation dans WerbMap (SI, actifs), critères du CEPD et état de l'analyse d'impact (requise dès deux critères) ; outils des tables (charte §7.7).
- **Violations de données** (articles 33, 34) : échéance des 72 h calculée depuis la découverte, heures restantes puis retard, notification à la CNIL (motif au-delà de 72 h), information des personnes si risque élevé, incident NIS2, clôture.
- **Demandes d'exercice des droits** : échéance d'un mois, prolongation de deux mois motivée, réponse ou refus.
- **Sous-traitants** (article 28) : clause, transfert, délai de notification ; prestataires publiés par WerbPresta proposés.
- Données reçues : `site:si`, `site:actifs` (WerbMap), `site:evaluationsPrestataires` (WerbPresta), copiées dans la base ; listes de choix du groupe (catégories de personnes et de données).
- Tableau de bord et points d'attention, export Excel, journal, thème clair / sombre, verrou commun, guide « Tenir la conformité RGPD du site », base d'exemple fictive (LYON), rangée aussi dans l'espace de démonstration.

### Format de données
- `WERBRGPD`, schéma 1 : `organisme`, `traitements`, `violations`, `demandes`, `sousTraitants`, `archives`, `refs`, `listesGroupe`, `recus`, `largeurs`.

---

WerbRGPD — Développé par @WerbHat
