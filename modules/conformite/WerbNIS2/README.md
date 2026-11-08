# WerbNIS2

> Conformité NIS2 d'une entité ou d'un site : 20 règles, audit de 152 points en 28 thématiques, couverture, plan d'actions, rapport
> Version **1.8.0** — Développé par **@WerbHat**

---

## Pourquoi cet outil

L'audit NIS2 se tenait dans un classeur Excel (« Règles et audits NIS2 ») : les 20 règles, une grille de points de contrôle cotés OK / PL + / PL − / N/A et un calcul de couverture par thématique. WerbNIS2 reprend ce référentiel dans un outil WerbSMSI : une base par entité ou par site, rangée dans l'espace du groupe, avec la fiche de l'entité et du site, le journal des modifications, un plan d'actions et un rapport signé. Rien n'est installé, tout fonctionne hors ligne.

---

## Contenu du paquet

```
WerbNIS2/
├── README.md                    ← ce fichier
├── CHANGELOG.md                 ← historique des versions
├── SECURITY.md                  ← mesures de sécurité et limites
├── LICENSE                      ← licence MIT
├── module.json                  ← manifeste lu par le portail WerbSMSI
├── WerbNIS2.sha256              ← empreinte de l'application
├── application/
│   └── WerbNIS2.html            ← l'outil (fichier unique)
├── exemples/
│   └── Exemple_LYON.werbnis2.json   ← audit fictif du site LYON (aussi intégré : bouton « Base d'exemple »)
└── guides/
    ├── 0-NIS2_en_clair.md ← guide de débutant, lu dans ❓ Aide
    └── 1-Conduire_audit_NIS2.md ← méthode et cotation, lu dans ❓ Aide
```

Le dépôt source contient en plus `sources/`, `outils/` (extraction du référentiel, base d'exemple) et `tests/`.

---

## Démarrage rapide

1. Ouvrir `application/WerbNIS2.html` avec **Microsoft Edge**, directement ou depuis le portail WerbSMSI (rubrique Conformité & exigences).
2. Saisir son nom, puis **Nouvelle base**, **Ouvrir une base** ou **Base d'exemple**.
3. Renseigner **Entité et site** (le statut essentielle / importante fixe les points applicables), puis coter la **Grille d'audit**.
4. **Enregistrer** (Ctrl+S) dans `groupe/conformite/` ou `sites/<CODE>/conformite/` sur le drive protégé.

> Sous Firefox, l'outil passe en *mode compatibilité* : l'enregistrement se fait par téléchargement du fichier.

---

## Fonctionnalités

### Outils des tables : sélection, archivage, chercher / remplacer, largeur des colonnes

Dans le plan d'actions (la grille de 152 points est normative : ni sélection ni archivage) (charte §7.7) :

- **Sélection multiple** : une case par ligne et « tout sélectionner » ; la barre propose **🗄 Archiver**, **♻ Désarchiver**, **🗑 Supprimer** (définitif, après confirmation) et **✕ Désélectionner**.
- **Archiver** déplace la ligne dans la réserve de la base (date et auteur) : hors plan d'actions, tableau de bord, compteur du menu, rapport d'audit et export Excel ; son identifiant n'est jamais réattribué. Chercher / remplacer : action, responsable, commentaire. Elle se désarchive à l'identique ; « Afficher les archivées » la montre grisée.
- **🔁 Chercher / remplacer** : une colonne de texte libre (ou toutes), avec aperçu avant d'appliquer ; ni identifiant, ni liste de choix, ni date.
- **Largeur des colonnes** : glisser le bord d'un en-tête, double-clic pour revenir à la largeur automatique ; largeurs enregistrées dans la base.
- Tout est tracé au journal.

### Bandeau

**☰** à droite du logo masque ou réaffiche le menu latéral (le contenu prend toute la largeur) ; boutons avec icône **📂 Ouvrir**, **💾 Enregistrer**, **📑 Enregistrer sous…**, **📊 Export Excel** (toute la base : feuille Informations (entité, audit), évaluation de chaque point avec cotation et preuves, règles, plan d'actions), **🖨 PDF** (impression de la page affichée ou enregistrement en PDF par le navigateur), **⏏ Fermer**. Sous 1280 px de large, seules les icônes restent (libellé en infobulle).

- **Tableau de bord** : couverture NIS2, points évalués, écarts, actions ouvertes et en retard, alertes (statut à déterminer, point de contact ANSSI, SIR non recensés, écarts sans action), répartition des cotes et couverture des 28 thématiques.
- **Entité et site** (demande de la feuille Cover du classeur) : identification, assujettissement (statut, annexe, secteur, déclaration), gouvernance et contacts (dirigeant, conseiller, point de contact ANSSI), périmètre (activités, SIR, exclusions justifiées), fiche de l'audit.
- **Les 20 règles NIS2** : lien NIS1, objet, couverture des thématiques qui déclinent la règle, **État actuel** et **Reste à faire**.
- **Grille d'audit** : 152 points en 28 thématiques, cotation OK / PL + / PL − / NC / N/A en un clic, commentaire et preuves par point, filtres (thématique, cote, non évalués, écarts, points EE) et recherche.
- **Schémas d'architecture en preuve** (base de site, 1.7.0) : la couverture publiée par WerbCartoSI (`site:cartographies`) est proposée sous 18 points de la grille, d'après une table de correspondance fixe — CARTOGRAPHIE.a (EX-CARTO, EX-RESEAU) ; CLOISONNEMENT.a à d, FILTRAGE.a et b (EX-ZONES, EX-FLUX) ; ECOSYSTEME.a, CLOISONNEMENT.g et h, ACCES_DISTANTS.a (EX-ACCES) ; ADMINISTRATION.a, g et h (EX-ADMIN) ; CONTINUITE_ACTIVITE.a, d et f (EX-REPRISE) ; ACCES_PHYSIQUES.b (EX-LOCAUX). Encadré : état de chaque catégorie, schémas (version, approbation, prochaine revue), couverture incomplète et publication de plus de 12 mois signalées ; « Citer dans les preuves » ajoute un texte daté. **Jamais de cotation automatique.** Une catégorie hors de la table n'est proposée nulle part.
- **Registre des sauvegardes en preuve** (base de site, 1.8.0, NIS-1) : le registre publié par WerbExploitation (`site:sauvegardes`) est proposé sous **CONTINUITE_ACTIVITE.a** (sauvegardes actives : données, source → destination, catégorie, périodicité, mode), **.c** (tests de restauration : à jour depuis moins d'un an, de plus d'un an, jamais testées) et **.d** (copie hors ligne : catégorie BCK_3). Le schéma EX-REPRISE de WerbCartoSI prouve la conception, le registre le fonctionnement : les deux s'affichent côte à côte. Élément incomplet (aucune sauvegarde active, test manquant ou ancien, pas de copie hors ligne) et publication de plus de 12 mois signalés ; « Citer dans les preuves » ; aucune cotation automatique ; rien au niveau du groupe. Copie dans la base sans chemin, support, chiffrement ni procédure (jamais publiés).
- **Couverture des thématiques** : tableau de la feuille du classeur, avec le détail des cotes.
- **Plan d'actions** : action par écart (un clic depuis le point ou en lot), responsable, échéance, statut.
- **Rapport d'audit** imprimable : contexte, synthèse, couverture, constats, plan d'actions, signature du module.
- **Journal** de chaque modification (avant / après), enregistré avec la base.

### Différences avec le classeur

| Classeur | WerbNIS2 |
|---|---|
| Cotes OK, PL +, PL −, N/A | Ajout de **NC** (non conforme) pour distinguer une mesure absente d'une mise en œuvre partielle |
| Couverture = (OK + PL +) / tous les points de la thématique | Les points **N/A** et ceux réservés aux entités essentielles (entité importante) sont exclus du dénominateur |
| Couverture « Cartographie de l'écosystème » calculée sur d'autres cellules | Calcul identique pour toutes les thématiques |
| Commentaires et sources dans la grille | Repris par point, dans la base de chaque entité ; ceux du classeur ne sont pas importés |

### 📚 Guides d'accompagnement

Dans **❓ Aide**, dans la page *Guide du module* et sur l'accueil, même sans base ouverte (lecteur commun, charte §7.4). Le premier guide, **« NIS2 en clair »** (1.6.0), explique le sujet à un débutant : pourquoi NIS2, qui est concerné (secteurs, taille, entité essentielle ou importante), mesures de gestion des risques, déclaration des incidents (24 h, 72 h, 1 mois), engagement de la direction, sanctions, par où commencer, idées reçues ; renvoi vers le guide d'audit.

### 🌙 Thème clair / sombre

- Bouton 🖥️ / ☀️ / 🌙 du bandeau : **Auto** (thème de Windows, par défaut), **Clair**, **Sombre** ; ouvert depuis le portail WerbSMSI, le module reprend le thème choisi dans le portail (charte §7.5).
- Rien n'est mémorisé. L'impression et les exports restent toujours en clair.

---

## Données et format

- Une base est un fichier **`*.werbnis2.json`** à l'enveloppe commune WerbSMSI (`format` : `WERBNIS2`, schéma 1).
- Contenu de `data` :

| Clé | Type | Description |
|---|---|---|
| `entite` | objet | raison sociale, SIREN, site, statut NIS2, annexe, secteur, contacts, activités, SIR, exclusions |
| `audit` | objet | référence, objet, auditeur(s), dates, classification, périmètre, conclusion |
| `regles` | objet | par numéro de règle (1 à 20) : `etat`, `resteAFaire` |
| `evaluations` | objet | par identifiant de point (`ROLE.b`, `FILTRAGE.c`…) : `statut` (`OK`, `PL+`, `PL-`, `NC`, `NA`), `commentaire`, `preuves`, `majLe`, `par` |
| `actions` | liste | `id`, `point`, `titre`, `responsable`, `echeance`, `statut`, `commentaire` |

- Le référentiel (règles, thématiques, points) n'est pas dans la base : il est intégré au livrable (`sources/src/referentiel.js`), produit par `outils/extraire_referentiel.py` depuis le classeur.
- Formats anciens encore lisibles : *aucun*.

---

## Intégration WerbSMSI

- Rubrique : **conformite**, niveaux **groupe** et **site**.
- Objets **publiés** : *aucun* dans cette version (`site:syntheseConformite` appartient à WerbIEC62443 ; une remontée NIS2 demandera un objet dédié dans la charte).
- Objets **lus** : `site:sauvegardes` (WerbExploitation, 1.8.0 : base de site seulement ; registre des sauvegardes copié dans la base, lu au rattachement et sur ⟳ Actualiser) ; `site:cartographies` (WerbCartoSI 1.3.0, 1.7.0 : base de site seulement ; couverture des schémas d'architecture copiée dans la base, lue au rattachement et sur ⟳ Actualiser) ; `groupe:organisation` et `groupe:sites` (rattachement à l'espace : raison sociale et site repris dans la fiche) ; `groupe:formations` (WerbAcademie 1.4.0 ou plus récent, 1.5.0) : indicateurs de formation du groupe ou du site rattaché (taux de formations à jour, personnes, en retard, jamais suivies, dirigeants à jour, catalogue ; aucun nom), lus au rattachement et sur ⟳ Actualiser, copiés dans la base (`recus.formations`) et proposés comme **élément de preuve** sous les points **RH.b** (programme de sensibilisation), **ROLE.a** (dirigeant, formation exigée par l'article 20 de la directive) et **EXERCICES.a** — bouton « Citer dans les preuves ».
- Emplacement des bases : `groupe/conformite/` au niveau groupe, `sites/<CODE>/conformite/` au niveau site. Le portail ouvre la base depuis sa puce (`ouvertureParLien`).
- Le module fonctionne seul, sans le portail ni l'espace WerbSMSI.

---

## Confidentialité et sécurité

- **Hors ligne par construction** : la politique de sécurité (CSP) de la page bloque toute connexion sortante.
- **Rien dans le navigateur** : les données restent en mémoire puis dans votre fichier. Le stockage du navigateur propre au module est purgé à l'ouverture et à la fermeture.
- **La protection réelle est celle du dossier** où vous rangez la base : un audit NIS2 décrit les faiblesses de l'entité, limitez les droits d'accès du drive.
- **Intégrité** : comparer l'empreinte du fichier à celle publiée dans `WerbNIS2.sha256` :

```powershell
Get-FileHash .\application\WerbNIS2.html -Algorithm SHA256
```

Détails dans [SECURITY.md](SECURITY.md).

---

## Développement

Le nom, la version et l'auteur sont définis dans `sources/src/signature.js` et `module.json`, qui doivent concorder.

```powershell
python outils\extraire_referentiel.py "<chemin>\Règles et audits NIS2.xlsx"   # seulement si le classeur de référence change
python outils\exemples.py --demo <WerbSMSI>\demo\SMSI_GROUPE_DEMO
python <WerbSMSI>\charte\outils\werb_charte.py construire .
python <WerbSMSI>\charte\outils\werb_charte.py empreinte .
python <WerbSMSI>\charte\outils\werb_charte.py audit .
python tests\test_parcours.py                                                 # Playwright pour Python et Microsoft Edge
python tests\test_guides.py
python tests\test_theme.py
python tests\test_tables.py
python tests\test_formation.py
python tests\test_cartographies.py
python tests\test_sauvegardes.py
python <WerbSMSI>\charte\outils\werb_charte.py publier .
```

- `tests/test_theme.py` contrôle le thème avec Windows en sombre puis en clair : chaque entrée du menu sans fond clair ni texte sombre en sombre, cotations inchangées dans les deux thèmes, valeurs claires inchangées, bouton du bandeau, impression en clair ; captures `tests/sortie/theme_*.png`.
- `tests/test_cartographies.py` contrôle les schémas d'architecture reçus de WerbCartoSI (1.7.0) : réception au rattachement du site, élément de preuve sous les 18 points de la table seulement, couverture incomplète signalée, citation datée sans cotation, publication de plus de 12 mois signalée, rien au niveau du groupe, copie sans lien ni chemin.
- `tests/test_sauvegardes.py` contrôle le registre des sauvegardes reçu de WerbExploitation (1.8.0) : réception au rattachement du site, élément de preuve sous CONTINUITE_ACTIVITE.a, c et d seulement, test de restauration manquant et absence de copie hors ligne signalés, copie hors ligne reconnue, citation datée sans cotation, copie dans la base sans chemin ni chiffrement, rien au niveau du groupe.
- `tests/test_formation.py` contrôle les indicateurs de formation reçus de WerbAcademie (1.5.0) : réception au rattachement (site, puis groupe), élément de preuve sous RH.b, ROLE.a et EXERCICES.a seulement, citation dans les preuves (journal), copie dans la base sans nom.
- `tests/test_tables.py` contrôle les outils du plan d'actions (1.4.0) : archivage (compteur, rapport, réserve, auteur, journal), identifiant non réattribué, « Afficher les archivées », désarchivage, suppression multiple, chercher / remplacer, largeur des colonnes enregistrée.

L'extraction ne reprend que le référentiel (règles, thématiques, points) : jamais les cotations, commentaires ou sources du classeur. Le classeur n'est pas versionné (`.gitignore`).

---

## Historique des versions

Version courante : **1.8.0** de novembre 2026 — registre des sauvegardes de WerbExploitation proposé en preuve de la continuité (CONTINUITE_ACTIVITE.a, c, d). Versions précédentes : **1.7.0** de novembre 2026 — couverture des schémas d'architecture de WerbCartoSI proposée en preuve. Versions précédentes : **1.6.0** de novembre 2026 — guide de débutant « NIS2 en clair » ; **1.5.0** d'octobre 2026 — indicateurs de formation de WerbAcademie reçus et proposés comme preuves (RH.b, ROLE.a, EXERCICES.a). Versions précédentes : **1.4.0** d'octobre 2026 — sélection multiple et archivage, chercher / remplacer, largeur des colonnes (socle 1.9.0) ; **1.3.0** d'octobre 2026 — bandeau commun (socle 1.8.0, TRV-7) ; **1.2.0** d'octobre 2026 — thème clair / sombre (socle 1.7.1) ; **1.1.0** d'octobre 2026 — verrou commun des bases (lecture seule ou prise de main, bandeau « Ouvert par … ») ; **1.0.0**. Détail dans [CHANGELOG.md](CHANGELOG.md).

---

**WerbNIS2** — Développé par **@WerbHat**
