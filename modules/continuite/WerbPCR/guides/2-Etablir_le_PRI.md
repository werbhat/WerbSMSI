<!-- WerbPCR – Développé par @WerbHat -->
# Établir le Plan PRI (plan de reprise informatique)

Le **PRI** répond à une seule question : **quand un système d'information est tombé, comment le redémarre-t-on, dans quel ordre et en combien de temps ?** Il complète le [Plan PCI](1-Etablir_le_plan.md), qui prévient l'incident et permet de tenir pendant celui-ci (confinement, secours, mode dégradé : rubrique g des fiches par SI).

| Plan | Question | Dans WerbPCR |
|---|---|---|
| **PCI — Plan de continuité informatique** | Comment les systèmes continuent-ils à fonctionner malgré les menaces ? | Menu **🛟 Plan PCI**, volets 1 à 5 |
| **PRI — Plan de reprise informatique** | Comment revient-on au fonctionnement normal après un incident majeur ? | Menu **🔁 Plan PRI**, volets 1 à 5 |

**Où commence le PRI ?** Quand l'incident survient, le PCI agit d'abord : alerte, confinement, bascule, mode dégradé (rubrique g de la fiche PCI). Le PRI prend le relais quand la mesure « Déclenchement du PRI » de cette rubrique est atteinte, et va jusqu'au retour à la normale : restaurer, reconstruire, redémarrer dans l'ordre, vérifier. Le tableau *PCI ou PRI : qui fait quoi* du [guide du Plan PCI](1-Etablir_le_plan.md) détaille le partage.

Le PRI s'appuie sur ce que publient les autres modules : les **systèmes d'information** de WerbMap, le **registre des sauvegardes** de WerbExploitation, les **rôles** du groupe, et les fiches PCI du plan. Ouvrez l'espace et ⟳ Actualisez avant de commencer (*⚙️ Base › Intégration WerbSMSI*).

---

## 1. Bilan d'impact (BIA)

Pour chaque système d'information, fixez avec le **métier** (pas seulement avec l'informatique) :

- **RTO** (*Recovery Time Objective*, ou **DMIA**, durée maximale d'interruption admissible) : au-delà de combien de temps l'arrêt du système n'est plus acceptable ?
- **RPO** (*Recovery Point Objective*, ou **PDMA**, perte de données maximale admissible) : combien de données, exprimées en durée, accepte-t-on de perdre ? Un RPO de 24 h signifie qu'on accepte de perdre une journée de données : il faut donc au moins une sauvegarde par jour.
- **Impact d'un arrêt** : production, sécurité des personnes, clients, obligations réglementaires.
- **Mode dégradé** : en résumé, comment travailler sans le système (procédure manuelle, autre site, autre outil) et **pendant combien de temps**. Le mode dégradé donne souvent le RTO : si l'atelier tient une équipe en conduite locale, le RTO est d'environ 8 h. Le **détail** (qui fait quoi, dans quel ordre) est dans la rubrique g de la fiche PCI.

Les durées se saisissent simplement : `4 h`, `2 j`, `30 min`, `1 sem`, `1 mois` (un nombre seul compte en heures).

> **Repère** : la colonne « Gravité max. » rappelle la gravité la plus forte des événements redoutés cochés dans la fiche PCI du système. Un système dont l'arrêt est jugé *critique* n'a pas un RTO d'une semaine.

---

## 2. Dépendances

Un système ne redémarre pas seul : la supervision a besoin du réseau, de l'annuaire, du stockage. Pour chaque système :

- **cochez les systèmes du site dont il a besoin** pour redémarrer : ils seront rétablis **avant** lui ;
- **listez ses dépendances externes** : énergie, opérateur réseau, prestataire de maintenance, éditeur, hébergeur, personnel clé. Notez le nom et une précision utile (délai d'intervention contractuel, autonomie d'un onduleur), **jamais un mot de passe ni un numéro d'astreinte** : le plan circule.

WerbPCR signale un système qui dépend d'un autre système au **RTO plus long** que le sien : il ne pourra pas redémarrer à temps. Soit le RTO du système amont doit baisser, soit la dépendance doit être levée.

---

## 3. Ordre de reprise

L'ordre est **calculé**, il ne se saisit pas :

1. **vague 1** : les systèmes qui ne dépendent d'aucun autre système du site ;
2. **vague 2** : ceux qui dépendent de la vague 1, et ainsi de suite ;
3. dans une même vague, le **RTO le plus court** passe en premier.

La colonne **« Rétabli au plus tôt »** additionne la durée de la procédure du système et celle de la plus longue chaîne de systèmes dont il dépend (les procédures d'une même vague se mènent en parallèle). Si elle dépasse le RTO, le plan **ne tient pas** : il faut raccourcir une procédure, revoir une dépendance ou, avec le métier, le RTO.

Une **boucle** (A dépend de B qui dépend de A) est signalée : l'ordre ne peut pas être établi tant qu'elle n'est pas levée.

---

## 4. Procédures de reprise

Une procédure par système, à rédiger avec ceux qui la mèneront :

- **Déclenchement** : qui décide de lancer la reprise, à partir de quelle situation ; reprenez la condition de la mesure « Déclenchement du PRI » de la fiche PCI. Après une attaque, on ne redémarre qu'une fois l'incident **contenu** : restaurer un système encore infecté, c'est recommencer.
- **Étapes**, dans l'ordre : l'action, le responsable (rôles du groupe proposés), la **durée estimée** et la **vérification** qui prouve que l'étape a réussi. Les flèches ↑ ↓ réordonnent les étapes ; la durée totale est calculée.
- **Retour à la normale** : les critères pour déclarer le système rétabli, qui le prononce, la sortie du mode dégradé.

Les **mesures de continuité de la fiche PCI** (rubrique g) et les **sauvegardes** du système sont rappelées en bas de la procédure : elles disent dans quel état on trouve le système (isolé, en mode dégradé) au moment où la reprise commence. La procédure ne les recopie pas.

---

## 5. Contrôle des sauvegardes

Pour chaque système, WerbPCR confronte le **RPO** aux sauvegardes reçues de WerbExploitation (une sauvegarde concerne le système quand son actif source est un actif du système) :

| État | Signification |
|---|---|
| **Conforme** | La sauvegarde la plus fréquente est au moins aussi rapprochée que le RPO, et une restauration a été testée depuis moins d'un an. |
| **À vérifier** | La fréquence convient, mais la restauration n'a jamais été testée, ou plus depuis un an (ou la périodicité n'a pas pu être lue). |
| **Non couvert** | Aucune sauvegarde pour ce système, ou la sauvegarde la plus fréquente est plus espacée que le RPO. |

Une sauvegarde **jamais restaurée** reste une hypothèse. Une sauvegarde **joignable depuis le réseau** sera chiffrée avec le reste par un rançongiciel : gardez au moins une copie hors ligne. Ces points se corrigent dans WerbExploitation ; ⟳ Actualisez ensuite.

---

## 6. Faire vivre le PRI

- Le **tableau de bord** compte les systèmes avec RTO et RPO, les procédures rédigées, les RPO non couverts, et liste les **points d'attention** du PRI.
- Le **document Word** présente le PRI en partie 2 (chapitres PRI 1 à 5), après le PCI.
- Revoyez le PRI **à chaque changement** de l'architecture (nouveau système, nouvelle dépendance), **après chaque exercice** de reprise et **après chaque incident**.
- Un PRI n'a de valeur que **testé** : un exercice de restauration par an et par système critique est un minimum.

La relation entre RTO, durée maximale tolérable et temps de remise en service, le choix des stratégies de sauvegarde et de reprise, et les différents types de tests sont détaillés dans le guide [Approfondir la continuité et la reprise](3-Approfondir_continuite_et_reprise.md).
