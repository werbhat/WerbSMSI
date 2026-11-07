# WerbPresta

> Prestataires d'un site : fiche, périmètre et actifs où ils interviennent, accès, criticité, questionnaire et cahier d'exigences cyber (IEC 62443-2-4, NIS2)
> Version **1.4.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

Les prestataires (intégrateurs, mainteneurs, constructeurs, télémaintenance) utilisent les systèmes du site et les ont souvent configurés : un accès à distance oublié, un mot de passe commun à tous leurs clients ou un compte jamais désactivé ouvrent la porte à un attaquant. NIS2 (article 21 : chaîne d'approvisionnement), l'ISO 27001 (A.5.19 à A.5.23) et l'IEC 62443-2-4 demandent de les connaître et de les encadrer.

Jusqu'ici, le prestataire apparaissait dans WerbGouvernance (contrats cadre), WerbIEC62443 (projets) et WerbEBIOS (parties prenantes), sans lien. **WerbPresta devient la liste de référence des prestataires du site** (décision d'octobre 2026) : il reprend ceux des autres modules, décrit **où** et **comment** chacun intervient, et calcule sa **criticité**.

La 1.0.0 couvre le recensement (fiche, périmètre et actifs, accès, criticité, couverture des actifs) ; la 1.1.0 le **modèle de questionnaire** et le **cahier d'exigences cyber** de chaque prestataire, en Word ; la 1.2.0 l'**évaluation** (réponses, score par domaine, écarts, historique, rapport Word) et le suivi (documents, incidents) ; la 1.3.0 la **publication** de l'évaluation pour WerbEBIOS, WerbMap et WerbPCR ; la 1.4.0 le **niveau groupe** (consolidation des sites, modèle de questionnaire commun). la publication pour WerbEBIOS, WerbMap et WerbPCR, puis le niveau groupe (feuille de route PRE).

---

## Contenu du paquet

```
WerbPresta/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbPresta.sha256           ← empreinte de l'application
├── application/
│   └── WerbPresta.html         ← l'outil (fichier unique)
├── exemples/
│   └── Exemple_LYON.werbpresta.json     ← base d'exemple fictive (intégrée au livrable)
├── guides/
│   ├── 1-Recenser_les_prestataires.md   ← guides lus dans ❓ Aide
│   └── 2-Etablir_le_cahier_d_exigences.md
├── outils/
│   └── exemples.py              ← produit la base d'exemple (et la range dans l'espace de démonstration)
├── sources/
│   ├── build.py                 ← assemblage du livrable
│   ├── src/                     ← index.html, style.css, scripts, questionnaire_defaut.json (modèle de questionnaire proposé)
│   └── vendor/bibliotheques.js  ← JSZip et docx figés (empreinte contrôlée)
└── tests/                       ← tests Playwright dans Microsoft Edge
```

---

## Démarrage rapide

1. Copier `application/WerbPresta.html` sur le poste ou sur un partage en lecture seule.
2. L'ouvrir avec **Microsoft Edge** (ou Google Chrome), directement ou depuis le portail WerbSMSI.
3. **📂 Ouvrir une base**, ou **✨ Nouvelle base**, puis *Intégration WerbSMSI* › rattacher le site, et **💾 Enregistrer** (Ctrl+S) dans `sites/<CODE>/conformite/`.
4. **🧪 Base d'exemple** : trois prestataires fictifs du site LYON.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier.

---

## Fonctionnalités

| Menu | Contenu |
|---|---|
| 📊 Pilotage › Tableau de bord | Prestataires actifs, avec accès à distance, avec accès permanent, actifs couverts ; prestataires par criticité ; points d'attention de toutes les fiches |
| 🤝 Prestataires › Liste | ID (`PR-001`…), raison sociale, type, statut, SI, zones, actifs couverts, accès à distance, criticité, échéance, points d'attention ; **➕ Prestataire** ; **prestataires proposés** (publiés par WerbGouvernance ou WerbIEC62443, absents de la liste) ajoutés en un clic ; suppression avec confirmation |
| 🤝 Fiche prestataire | **Identité** (type, statut, contrat, échéance, interlocuteur sécurité par sa fonction, certifications) ; **périmètre** (interventions, SI, zones et actifs reçus de WerbMap ; actifs d'un SI ou d'une zone couverts d'office ; filtre) ; **accès** (sur site, à distance : aucun / à la demande / permanent, moyen, privilèges, comptes **sans mot de passe**, supports amovibles) ; **données confiées** ; **criticité** détaillée ; suivi (prochaine revue, commentaire) |
| 🤝 Fiche › Cahier d'exigences cyber | **Niveau** automatique (renforcé si criticité élevée ou accès à distance) ou choisi ; **exigences proposées** (essentielles, renforcées selon le niveau, dont la condition correspond à la situation : accès à distance, supports, privilèges, données personnelles), ajustées (retirée, ajoutée, ↺ revenir à la proposition) ; **📄 cahier d'exigences** et **📝 questionnaire à remettre** en Word (oui / partiel / non / sans objet, commentaire et preuve, engagement), habillés du modèle de l'entreprise (1.1.0) |
| 🤝 Fiche › Évaluation | Réponses du prestataire saisies par le client (**oui / partiel / non / sans objet**, commentaire et preuve), **score** par domaine et global (oui 1, partiel ½, non 0, sans objet exclu), **écarts** (action demandée, échéance, statut, en retard signalé), **📄 rapport d'évaluation Word**, **🗄 archivage** (historique : date, score, écarts, version du modèle ; prochaine revue à 12 mois) (1.2.0) |
| 🤝 Fiche › Suivi | Prochaine revue, commentaire, **documents reçus** (type, libellé, date, validité ; expiré signalé), **incidents** (date, description, suite) (1.2.0) |
| 🤝 Écarts | Écarts de tous les prestataires : ouverts d'abord, par échéance, en retard signalés (1.2.0) |
| 📋 Exigences › Modèle de questionnaire | **13 domaines** inspirés de l'IEC 62443-2-4 (SP.01 à SP.12), de NIS2 (art. 21, 23) et de l'ISO 27001 ; exigences **reformulées** (code, texte, niveau essentiel ou renforcé, condition, références) ; modifiables, ajoutées, supprimées, réordonnées ; ↺ exigences proposées manquantes ; version du modèle (1.1.0) |
| 📋 Exigences › Modèle Word | Modèle Word de l'entreprise (modèle commun de l'espace ou fichier) pour habiller les documents |
| 🤝 Couverture des actifs | Pour chaque actif publié par WerbMap : les prestataires qui y interviennent et leur accès à distance |
| 🏢 Base du groupe (1.4.0) | Rattachée au **groupe** : **consolidation** des évaluations publiées par les sites (par prestataire, comparés par le nom : sites, types, criticité la plus forte, accès à distance permanent, score par site, écarts ouverts et en retard, prochaine revue) ; tableau de bord du groupe ; **📤 Publier le modèle de questionnaire** commun (`groupe:modeleQuestionnaire`) |
| 📋 Modèle de questionnaire (site) | Modèle commun du groupe reçu : différence signalée, **⇩ Reprendre le modèle du groupe** (les ajustements des cahiers sont gardés quand le code existe encore), « à jour » sinon (1.4.0) |
| ⚙️ Base | Intégration WerbSMSI (rattachement, ⟳ Actualiser, données reçues, **📤 Publier** l'évaluation des prestataires : `site:evaluationsPrestataires`, 1.3.0), journal, à propos |
| ❓ Aide | Guide du module, guides « Recenser les prestataires et leur périmètre » et « Établir le cahier d'exigences cyber d'un prestataire » |

Bandeau commun : 📂 Ouvrir, 💾 Enregistrer, 📑 Enregistrer sous…, 📊 Export Excel (informations, prestataires, périmètre par actif, accès, modèle de questionnaire, cahiers, évaluations, écarts, documents et incidents), 🖨 PDF, ⏏ Fermer.

### Criticité et points d'attention

Criticité = SL-T le plus élevé des zones touchées (≥ 3 : 2 points ; 1 ou 2 : 1 point) + actif critique couvert (1) + accès à distance (permanent 2, à la demande 1) + privilèges d'administration (1) + données sensibles confiées (1). 0-1 faible, 2-3 modérée, 4-5 élevée, 6 et plus très élevée.

Points d'attention : aucun périmètre ; accès à distance permanent ; accès par modem, routeur 4G ou logiciel de prise de main (contourne le pare-feu) ; moyen d'accès non renseigné ; SI, zone ou actif plus publié par WerbMap ; contrat échu ; contrat terminé avec accès ou comptes ouverts ; revue en retard ; criticité élevée sans revue planifiée.

---

## Données et format

- Une base est un fichier **`*.werbpresta.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBPRESTA`, schéma 1).
- Contenu de `data` :

| Clé | Type | Description |
|---|---|---|
| `prestataires` | tableau | `id`, `nom`, `type`, `statut` (`actif`, `consultation`, `termine`), `contrat`, `echeance`, `interlocuteur`, `certifications`, `certifAutre`, `origine`, `perimetre` { `sis`, `zones`, `actifs` (TAG), `interventions`, `description` }, `acces` { `surSite`, `distant` (`aucun`, `demande`, `permanent`), `moyen`, `privileges`, `comptes` (identifiants, jamais de mot de passe), `supports` }, `donnees`, `prochaineRevue`, `commentaire`, `cahier` { `niveau` (`auto`, `essentiel`, `renforce`), `exclues`, `incluses` (codes d'exigences) } (1.1.0) ; `evaluation` { `date`, `evaluateur`, `reponses` { `<code>`: { `rep` (`oui`, `partiel`, `non`, `so`), `commentaire`, `action`, `echeance`, `statut` (`ouvert`, `clos`) } } }, `historique` [{ `date`, `evaluateur`, `score`, `scores` (par domaine), `ecarts`, `modeleVersion` }], `documents` [{ `type`, `libelle`, `date`, `validite` }], `incidents` [{ `date`, `description`, `suite` }] (1.2.0) |
| `modele` | objet | modèle de questionnaire (1.1.0) : `version`, `domaines` [{ `code`, `titre`, `refs`, `exigences` [{ `code`, `texte`, `niveau`, `condition` (`distant`, `supports`, `admin`, `donneesPerso` ou vide), `refs` }] }] ; absent : modèle proposé |
| `modeles.word` | objet | modèle Word de l'entreprise (charte §7.2) |
| `recus` | objet | copies reçues : `si`, `zones`, `actifs` (WerbMap), `prestatairesGroupe` (`groupe:prestataires`), `prestatairesSite` (`site:prestataires`) — `{ items, majLe, source }` |
| `largeurs` | objet | largeurs de colonnes (réservé) |

- Formats anciens encore lisibles : *aucun*.

---

## Intégration WerbSMSI

- Rubrique : **conformite**
- Niveau(x) d'utilisation : **groupe** (consolidation, modèle commun, 1.4.0) et **site**
- Objets **publiés** (`publications/werbpresta.json`, sur action *Publier*) : *aucun*
- Objets **lus** : `site:si`, `site:zones`, `site:actifs` (WerbMap) ; `groupe:prestataires` (WerbGouvernance) ; `site:prestataires` (WerbIEC62443). Objet **publié** (1.3.0, sur action *📤 Publier*, base enregistrée) : `site:evaluationsPrestataires` — prestataires actifs ou en consultation : nom, type, criticité, périmètre (SI, zones, actifs couverts), accès à distance, privilèges, certifications, niveau d'exigence, date et score de l'évaluation (global et par domaine ; à défaut la dernière archivée), écarts ouverts et en retard, prochaine revue. **Ni interlocuteur, ni comptes, ni commentaires, ni réponses détaillées.** Lu par WerbEBIOS (parties prenantes), WerbMap (fiche SI) et WerbPCR (dépendances externes du PRI).
- Emplacement des bases : `sites/<CODE>/conformite/` ; base du groupe dans `groupe/conformite/` (1.4.0). Le groupe publie `groupe:modeleQuestionnaire` (objet unique : version et domaines) et lit les `site:evaluationsPrestataires` de tous les sites.
- Le module fonctionne seul, sans le portail ni l'espace WerbSMSI.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante.
- **Rien dans le navigateur** : les données restent en mémoire puis dans votre fichier. Le stockage du navigateur propre au module est purgé à l'ouverture et à la fermeture.
- **La protection réelle est celle du dossier** où vous rangez la base : limitez les droits d'accès du drive.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbPresta.sha256` :

```powershell
Get-FileHash .\application\WerbPresta.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder.

```powershell
python outils\exemples.py --demo                                   # base d'exemple, rangée aussi dans l'espace de démonstration
python sources\build.py
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_parcours.py                                      # Playwright pour Python et Microsoft Edge
python tests\test_cahier.py
python tests\test_evaluation.py
python tests\test_groupe.py
python tests\test_publication.py                                   # --ecrire-demo : recopie la publication dans l'espace de démonstration
python tests\test_theme.py
python tests\test_bandeau.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_parcours.py` : rattachement et réception (WerbMap, WerbGouvernance, WerbIEC62443), prestataires proposés puis ajoutés, fiche (identité, certifications, interventions, SI, zone et actifs, actifs hérités, filtre), criticité calculée, points d'attention (accès permanent, modem, moyen manquant, contrat terminé, actif plus publié), couverture des actifs, enregistrement et relecture, suppression, base d'exemple, rien dans le navigateur.
- `tests/test_cahier.py` (1.1.0) : modèle proposé (13 domaines, références, conditions), modifié (texte, exigence ajoutée, supprimée puis rétablie, version) ; cahier d'un prestataire (niveau automatique et justification, exigences proposées selon la situation, retirée, ajoutée, niveau choisi, retour à la proposition) ; cahier et questionnaire Word (exigences retenues seulement, habillage du modèle de l'entreprise) ; export Excel ; enregistrement et relecture.
- `tests/test_evaluation.py` (1.2.0) : score de l'évaluation d'exemple et par domaine, écarts (en retard), vue des écarts, saisie (date posée, écart créé par un « non », clos), rapport d'évaluation Word, archivage et historique, documents (expiré) et incidents, points d'attention, export Excel, enregistrement et relecture.
- `tests/test_groupe.py` (1.4.0) : base rattachée au groupe, consolidation de deux sites (prestataire regroupé, score par site, criticité la plus forte, accès permanent, écarts en retard), vues de site signalées, modèle publié (`groupe:modeleQuestionnaire`, déclaré par la charte), reprise du modèle par une base de site.
- `tests/test_publication.py` (1.3.0) : objet déclaré par la charte et le schéma, publication impossible avant l'enregistrement, fichier du site, éléments publiés (périmètre, actifs couverts, accès, niveau d'exigence, score et scores par domaine, écarts), aucun interlocuteur, compte, commentaire ni réponse détaillée, republication qui remplace.
- `tests/test_theme.py` et `tests/test_bandeau.py` : thème sombre et clair (menu et fiche), bandeau commun et export Excel.
- Composants tiers figés dans `sources/vendor/bibliotheques.js` (identique aux autres modules) : JSZip 3.10.1 et docx 9.8.1 (licence MIT), pour le cahier d'exigences et le questionnaire Word. `socle.js`, `guides.js` et `modele-word.js` sont des copies conformes de la charte ; `xlsx.js` est la version commune des modules.

---

## Historique des versions

Version courante : **1.4.0** d'octobre 2026 — niveau groupe : consolidation des évaluations des sites, modèle de questionnaire commun publié et repris par les sites. Version précédente : **1.3.0** d'octobre 2026 — publication `site:evaluationsPrestataires` pour WerbEBIOS, WerbMap et WerbPCR. Version précédente : **1.2.0** d'octobre 2026 — évaluation des prestataires (réponses, score par domaine, écarts, historique, rapport Word), documents reçus et incidents. Version précédente : **1.1.0** d'octobre 2026 — modèle de questionnaire (13 domaines, IEC 62443-2-4, NIS2, ISO 27001), cahier d'exigences cyber et questionnaire Word par prestataire. Version précédente : **1.0.0** d'octobre 2026 — première version : liste de référence des prestataires du site, fiche (périmètre et actifs, accès, données), criticité, couverture des actifs. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbPresta** — Développé par **@WerbHat**
