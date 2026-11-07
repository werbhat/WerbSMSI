# WerbRGPD

> Conformité RGPD d'un site : registre des traitements, violations de données (72 h), demandes d'exercice des droits, sous-traitants
> Version **1.0.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

Le RGPD ne demande plus de déclarer ses fichiers : il demande d'**être conforme et de pouvoir le prouver** (principe de responsabilité, article 5.2). Sur un site industriel, les données personnelles ne sont pas que dans la paie : badges, vidéosurveillance, comptes nominatifs de la supervision, registre des visiteurs, géolocalisation des véhicules, prestataires en télémaintenance. WerbRGPD tient pour le **site** les quatre registres qui font la preuve — traitements, violations de données, demandes d'exercice des droits, sous-traitants —, calcule les délais du règlement (72 h vers la CNIL, un mois pour répondre) et relie chaque traitement à l'inventaire de WerbMap (où sont les données) et aux prestataires de WerbPresta (qui y accède).

---

## Contenu du paquet

```
WerbRGPD/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── LICENSE                      ← licence MIT
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbRGPD.sha256              ← empreinte de l'application
├── application/
│   └── WerbRGPD.html            ← l'outil (fichier unique)
├── exemples/
│   └── Exemple_LYON.werbrgpd.json   ← base fictive du site LYON (aussi intégrée : bouton « Base d'exemple »)
└── guides/
    └── 1-Tenir_la_conformite_RGPD_du_site.md   ← guide, lu dans ❓ Aide
```

Le dépôt source contient en plus `sources/` et `tests/`. Le référentiel **RGPD** de WerbReferentiels (1.4.0) détaille le règlement.

---

## Démarrage rapide

1. Ouvrir `application/WerbRGPD.html` dans **Microsoft Edge**, saisir son nom.
2. **🧪 Base d'exemple** pour découvrir, ou **✨ Nouvelle base**.
3. *Intégration WerbSMSI* : ouvrir l'espace, rattacher la base au site ; ranger la base dans `sites/<CODE>/conformite/`.
4. *Organisme et référentiels* : responsable de traitement, DPO, référent du site, contact pour les droits.
5. *Registre des traitements* : **➕ Traitement**, une fiche par finalité.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier.

---

## Fonctionnalités

| Écran | Contenu |
|---|---|
| **Tableau de bord** | Traitements, traitements à compléter, AIPD à faire, violations à notifier (72 h), demandes en cours et en retard, sous-traitants sans clause ; violations à notifier en tête ; points d'attention cliquables |
| **Registre des traitements** (article 30) | Fiche par finalité : nom, état (en service, en projet, arrêté), responsable ; **base légale** (intérêt légitime documenté, consentement de salariés signalé) ; personnes, données, **données sensibles** (exception de l'article 9 exigée) ; destinataires, **sous-traitants**, **transfert hors de l'Union** (garantie) ; **durée de conservation** ; mesures de sécurité ; **où sont les données** (SI et actifs de WerbMap, filtre des actifs, référence disparue signalée) ; **critères du CEPD** et état de l'**AIPD** (requise dès deux critères, les données sensibles comptant pour un). Liste avec filtres, sélection multiple, archivage, chercher / remplacer, largeur des colonnes (charte §7.7) |
| **Violations de données** (articles 33, 34) | Découverte (date et heure), nature (confidentialité, intégrité, disponibilité), traitements, personnes ; **risque** (aucun, risque, élevé) ; **échéance des 72 h**, heures restantes puis retard ; notification à la CNIL (date et heure posées, référence, motif du retard au-delà de 72 h) ; information des personnes si risque élevé (ou exception motivée) ; incident NIS2 ; mesures, clôture |
| **Demandes d'exercice des droits** (articles 15 à 22) | Réception, droit exercé, demandeur décrit sans données superflues, traitements ; **échéance d'un mois**, prolongation de deux mois (motif exigé) ; identité vérifiée ; réponse ou refus motivé |
| **Sous-traitants** (article 28) | Clause signée, en cours, absente ; date ; transfert hors de l'Union et garantie ; délai de notification des violations prévu au contrat ; traitements confiés ; **prestataires publiés par WerbPresta proposés** (➕ Sous-traitant) |
| **Organisme et référentiels** | Responsable de traitement, DPO, référent du site, contact pour les droits ; catégories de personnes et de données : valeurs du groupe 🏢 (listes de choix, charte §5.9) et du site 📍 |
| **Export Excel** | Informations, registre des traitements, violations, demandes, sous-traitants, archivés |
| **Journal** | Chaque modification (avant / après), enregistrée avec la base |

---

## Données et format

Base JSON `.werbrgpd.json`, format `WERBRGPD`, schéma 1, dans l'enveloppe WerbSMSI (meta, verrou, journal, data).

| Clé | Type | Description |
|---|---|---|
| `site` | objet | `nom` du site |
| `organisme` | objet | `responsable`, `dpo`, `referent`, `contact` |
| `traitements` | liste | `id` (TRT-nnn, jamais réattribué), `nom`, `finalite`, `base`, `interet`, `personnes`, `donnees`, `sensibles`, `justifSensibles`, `destinataires`, `sousTraitants` (ST-nnn), `horsUE`, `pays`, `garantie`, `conservation`, `mesures`, `sis`, `actifs` (TAG), `criteres`, `aipd`, `aipdLe`, `responsable`, `statut`, `majLe`, `commentaire` |
| `violations` | liste | `id` (VIO-nnn), `titre`, `decouverteLe` (date et heure), `description`, `natures`, `traitements`, `personnesNb`, `risque`, `cnil`, `cnilLe`, `cnilRef`, `retard`, `informees`, `informeesLe`, `motifNonInfo`, `nis2`, `mesures`, `close`, `closeLe` |
| `demandes` | liste | `id` (DRT-nnn), `recueLe`, `demandeur`, `droit`, `traitements`, `identite`, `prolongee`, `motifProlongation`, `statut`, `reponduLe`, `reponse` |
| `sousTraitants` | liste | `id` (ST-nnn), `nom`, `presta` (identifiant WerbPresta), `service`, `contrat`, `contratLe`, `horsUE`, `pays`, `garantie`, `delaiH`, `commentaire` |
| `archives` | objet | `traitements` archivés, avec `archive` (`le`, `par`) |
| `refs` | objet | `personnes`, `donnees` : valeurs du groupe puis du site |
| `listesGroupe` | objet | copie des listes publiées par le groupe |
| `recus` | objet | copie des publications reçues : `si`, `actifs` (WerbMap), `prestataires` (WerbPresta) |
| `largeurs` | objet | largeurs des colonnes du registre |

---

## Intégration WerbSMSI

- Rubrique **Conformité & exigences**, niveau **site** ; base dans `sites/<CODE>/conformite/` ; ouverture depuis le portail (`ouvertureParLien`).
- Objets **lus** : `groupe:sites` (rattachement), `groupe:listes` (catégories de personnes et de données, charte §5.9), `site:si` et `site:actifs` (WerbMap : où sont les données), `site:evaluationsPrestataires` (WerbPresta : prestataires proposés comme sous-traitants). Copiés dans la base ; lus à l'ouverture de l'espace, au rattachement et sur ⟳ Actualiser.
- **Publication** : aucune dans cette version (une synthèse pour le DPO du groupe est une évolution possible).

---

## Confidentialité et sécurité

- La base décrit des **traitements**, pas des personnes : le demandeur d'un droit est décrit sans données superflues ; ne pas y saisir de données nominatives inutiles.
- Elle révèle néanmoins des informations sensibles (violations, sous-traitants, mesures de sécurité) : ranger la base et l'export Excel dans le dossier du site (droits du drive), classification « Diffusion restreinte ».
- Hors ligne, CSP stricte, rien dans le navigateur. Voir [SECURITY.md](SECURITY.md).

---

## Développement

- Module créé avec `werb_charte.py nouveau` et assemblé par `werb_charte.py construire` : `sources/src/index.html` reçoit `style.css` et les scripts `signature.js`, `socle.js`, `guides.js`, `xlsx.js`, `app.js` (ordre fixé par `module.json › sources`), précédés des guides et de la base d'exemple.

```powershell
python <WerbSMSI>\charte\outils\werb_charte.py construire . --date AAAA-MM-JJ
python tests\test_parcours.py                      # Playwright pour Python, Edge installé
python tests\test_guides.py
python tests\test_theme.py
python tests\test_bandeau.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` contrôle, dans l'espace de démonstration : CSP, base d'exemple (violation en retard en tête, points d'attention), registre (filtre, fiche, nouveau traitement : consentement de salariés, intérêt légitime, donnée biométrique, critères et AIPD requise, localisation dans WerbMap), sous-traitants repris de WerbPresta, violation (heures restantes, notification, risque élevé, information, notification hors délai), demande (un mois, prolongation, réponse), organisme et listes, export Excel, enregistrement et relecture, rien dans le navigateur.
- `tests/test_guides.py`, `tests/test_theme.py`, `tests/test_bandeau.py` : guides, thème clair / sombre, bandeau commun.

---

## Historique des versions

Version courante : **1.0.0** de novembre 2026 — première version : registre des traitements, violations de données, demandes d'exercice des droits, sous-traitants, liens WerbMap et WerbPresta. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbRGPD** — Développé par **@WerbHat**
