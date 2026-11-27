<!-- WerbSMSI – Développé par @WerbHat : guide du tableau de bord GRC du portail -->
# Tableau de bord GRC

Le tableau de bord GRC rassemble, sur une seule page, la gouvernance, les risques et la conformité du groupe. Il s'ouvre depuis le menu **🏢 Groupe › Tableau de bord GRC**, une fois l'espace WerbSMSI ouvert.

Il ne contient aucune donnée propre : il **lit les publications** que les modules déposent dans l'espace (`publications/` du groupe et de chaque site). Il n'écrit rien. Un chiffre faux ou absent se corrige donc dans le module qui le publie, puis par une nouvelle publication.

> Seules les synthèses remontent des sites : niveaux de risque, taux de conformité, compteurs. Les scénarios, les preuves, les commentaires et les noms restent dans les bases des sites.

## 1. Lire la page

- **Périmètre** (en haut à droite) : *Groupe* pour tous les sites lisibles, ou un site. Tout le tableau suit ce choix. Un site absent ou fermé par les droits du drive est signalé et laissé de côté.
- **Chiffres clés** : risques résiduels aux deux plus hauts niveaux de l'échelle du groupe, conformité moyenne (cible 80 %), points bloquants, publications de moins de 90 jours.
- **À traiter** : la liste des points qui demandent une action, les bloquants (trait rouge) en tête, puis par échéance. Chaque ligne indique le site, le module d'origine et l'échéance ; le site ouvre sa page.
- **Conformité par référentiel** : socle de mesures du groupe, NIS2 et IEC 62443, avec une jauge par site.
- **Hygiène et exploitation** : un compteur par site et par sujet. « — » veut dire que le module ne publie rien pour ce site.
- **Risques** : la matrice gravité × vraisemblance, en *Résiduel* ou en *Brut*. Un clic sur une case filtre la liste des risques ; *Tout afficher* retire le filtre.
- **Fraîcheur des publications** : la date de dernière publication de chaque module, pour le groupe et chaque site.

**⟳ Relire** relit les publications sans fermer l'espace, par exemple après une publication faite dans un autre onglet.

## 2. D'où viennent les chiffres

| Bloc | Objet lu | Module qui le publie |
|---|---|---|
| Risques, acceptations | `site:syntheseRisques` | WerbEBIOS (base de site) |
| Couleurs de la matrice, libellés des niveaux | `groupe:echelles` (matrice depuis WerbEBIOS 1.21.0) | WerbEBIOS (base du groupe) |
| Conformité IEC 62443, socle appliqué | `site:syntheseConformite` | WerbIEC62443 |
| Conformité NIS2 | `site:syntheseNis2` | WerbNIS2 1.13.0 (base de site) |
| Socle de mesures | `groupe:mesuresSocle` | WerbGouvernance |
| Sauvegardes, références hors support, difficulté de mise à jour | `site:sauvegardes`, `site:plm`, `site:difficultesMaj` | WerbExploitation |
| Actifs critiques | `site:actifs` | WerbMap |
| Alertes de veille | `site:veille` | WerbVeille |
| Remédiations | `site:remediations` | WerbPentest |
| Prestataires | `site:evaluationsPrestataires` | WerbPresta |
| Formation | `groupe:formations` | WerbAcademie |

Si le groupe n'a pas publié la matrice de ses échelles (WerbEBIOS avant 1.21.0), les couleurs des cases sont estimées et la page le signale.

## 3. Règles de « À traiter »

**Bloquant** (trait rouge) :

- l'acceptation du risque résiduel a expiré ;
- un risque d'un des deux plus hauts niveaux n'a pas de traitement décidé ;
- un risque résiduel au plus haut niveau n'est pas formellement accepté ;
- des actions de remédiation de test d'intrusion sont en retard ;
- des actions du plan NIS2 sont en retard ;
- un actif **critique** (WerbMap) est très difficile à mettre à jour (**N4 ou N5**, WerbExploitation) ;
- une référence installée est hors support.

**À surveiller** (trait orange) :

- une acceptation de risque expire dans les 60 jours ;
- des mesures NIS2 sont non conformes ;
- une synthèse IEC 62443 compte des écarts majeurs ;
- une sauvegarde n'a pas été testée depuis un an, ou ne l'a jamais été ;
- la revue d'un prestataire est dépassée ;
- des alertes de veille « Concerné » sont ouvertes ;
- une publication a plus de 90 jours.

Une ligne en retard (échéance passée) affiche son échéance en rouge.

## 4. Seuils

| Seuil | Valeur |
|---|---|
| Cible de conformité (jauges, chiffre clé) | 80 % : vert au-dessus, orange de 60 à 79 %, rouge en dessous |
| Formations exigées à jour | 80 % : vert au-dessus, orange de 50 à 79 %, rouge en dessous |
| Publication à jour | moins de 90 jours (point orange après 60 jours) |
| Acceptation à renouveler | dans les 60 jours |

## 5. Pour que le tableau soit complet

Chaque site publie depuis ses modules (*Intégration WerbSMSI › Publier*) : WerbEBIOS, WerbIEC62443, WerbNIS2, WerbExploitation, WerbMap, WerbVeille, WerbPentest, WerbPresta. Le groupe publie ses échelles (WerbEBIOS), son socle (WerbGouvernance) et les indicateurs de formation (WerbAcademie). Republier après chaque revue garde la colonne *Fraîcheur* au vert.
