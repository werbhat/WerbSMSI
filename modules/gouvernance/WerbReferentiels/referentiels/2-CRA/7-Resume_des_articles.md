<!-- WerbReferentiels – Développé par @WerbHat -->
# Résumé des articles du CRA

Le règlement (UE) 2024/2847 compte **71 articles**, répartis en **8 chapitres**, et **8 annexes**. Cette page donne, chapitre par chapitre, ce que dit chaque groupe d'articles, pour savoir où chercher dans le texte. Elle ne remplace pas le règlement : vérifiez toujours l'article exact dans les [sources](sources.md).

| Chapitre | Articles | Sujet |
|---|---|---|
| I | 1 à 12 | Dispositions générales |
| II | 13 à 26 | Obligations des opérateurs économiques, logiciels libres |
| III | 27 à 34 | Conformité du produit |
| IV | 35 à 51 | Notification des organismes d'évaluation de la conformité |
| V | 52 à 60 | Surveillance du marché et contrôle |
| VI | 61 et 62 | Actes délégués et comité |
| VII | 63 à 65 | Confidentialité et sanctions |
| VIII | 66 à 71 | Dispositions transitoires et finales |

---

## Chapitre I — Dispositions générales (articles 1 à 12)

### Article 1 — Objet

Fixe les règles de mise à disposition sur le marché des **produits comportant des éléments numériques** (matériels et logiciels, avec leurs solutions de traitement de données à distance) : exigences essentielles de cybersécurité pour leur conception, leur développement et leur production, exigences de traitement des vulnérabilités, obligations des opérateurs économiques, surveillance du marché.

### Article 2 — Champ d'application

Tout produit dont l'usage prévu comprend une connexion de données, directe ou indirecte, à un appareil ou à un réseau. Sont **exclus** les produits déjà couverts par des règles sectorielles : dispositifs médicaux et de diagnostic in vitro, véhicules à moteur, aviation civile, équipements marins. Sont aussi exclus les produits développés exclusivement pour la sécurité nationale ou la défense, et les pièces de rechange identiques.

### Article 3 — Définitions

Produit, fabricant, mise sur le marché, modification substantielle, vulnérabilité activement exploitée, incident grave, période de support, gestionnaire de logiciels libres…

### Article 4 — Libre circulation

Un État ne peut pas entraver la mise à disposition d'un produit conforme. Les prototypes, les salons et les versions de test d'un logiciel peuvent être présentés sous conditions.

### Article 5 — Achats ou utilisation des produits

Un État peut imposer des exigences de cybersécurité supplémentaires pour acheter ou utiliser des produits à des fins précises, si elles restent cohérentes avec le règlement.

### Article 6 — Exigences applicables aux produits

Un produit ne peut être mis à disposition que s'il respecte les **exigences essentielles** de l'annexe I et si le fabricant applique les processus de traitement des vulnérabilités.

### Article 7 — Produits importants

Deux classes, I et II, listées à l'**annexe III** (par exemple routeurs, commutateurs, systèmes d'exploitation en classe I ; pare-feu, détection d'intrusion, hyperviseurs en classe II). Leur évaluation de la conformité est plus exigeante.

### Article 8 — Produits critiques

Listés à l'**annexe IV** (boîtiers de sécurité matériels, passerelles de compteurs intelligents, cartes à puce). La Commission peut leur imposer une **certification européenne** de cybersécurité.

> Le règlement ne parle pas de « produits standards » : un produit qui n'est ni important ni critique relève de la **catégorie par défaut**, la plus courante (voir [Qui est concerné](2-Qui_est_concerne.md)).

### Articles 9 à 12

Consultation des parties prenantes (art. 9) ; renforcement des compétences en cybersécurité (art. 10) ; articulation avec le règlement sur la sécurité générale des produits (art. 11) ; systèmes d'IA à haut risque : le respect des exigences du CRA vaut présomption de conformité aux exigences de cybersécurité du règlement sur l'IA (art. 12).

---

## Chapitre II — Obligations des opérateurs économiques (articles 13 à 26)

### Article 13 — Fabricants

Le cœur du règlement. Le fabricant doit :
- **évaluer les risques** de cybersécurité du produit et en tenir compte de la conception à la maintenance (sécurité dès la conception) ;
- respecter les **exigences essentielles** de l'annexe I ;
- fixer une **période de support** adaptée à la durée d'utilisation prévue, **au moins cinq ans** sauf usage plus court, et traiter les vulnérabilités pendant cette période ;
- fournir les **mises à jour de sécurité** gratuitement, séparées des mises à jour fonctionnelles quand c'est possible ;
- tenir la **documentation technique** et la déclaration UE de conformité pendant **dix ans** ;
- s'assurer que les **composants tiers**, y compris libres, ne compromettent pas la sécurité du produit.

### Article 14 — Signalement

Le fabricant signale, **en même temps au CSIRT coordinateur** de son État **et à l'ENISA**, par la **plateforme unique de signalement** : toute **vulnérabilité activement exploitée** et tout **incident grave** affectant la sécurité du produit. Délais : alerte précoce sous **24 heures**, notification sous **72 heures**, rapport final sous **14 jours** après la mise à disposition d'un correctif (vulnérabilité) ou **un mois** après la notification (incident). Il informe aussi les utilisateurs concernés.

### Articles 15 à 17

Signalement volontaire par toute personne (art. 15) ; plateforme unique de signalement gérée par l'ENISA (art. 16) ; autres règles du signalement, dont la confidentialité et le rapport technique de l'ENISA (art. 17).

### Article 18 — Mandataires

Un fabricant établi hors de l'Union peut désigner un mandataire, par écrit.

### Articles 19 et 20 — Importateurs et distributeurs

Ils vérifient, avant de vendre, le **marquage CE**, la **déclaration UE de conformité**, la documentation et l'identification du fabricant. Ils ne mettent pas sur le marché un produit qu'ils savent non conforme et informent le fabricant d'une vulnérabilité dont ils ont connaissance.

### Articles 21 et 22 — Quand on devient fabricant

Un importateur ou un distributeur qui vend un produit **sous son nom ou sa marque**, ou toute personne qui y apporte une **modification substantielle**, prend les obligations du fabricant. C'est le point d'attention des intégrateurs et des constructeurs de machines.

### Article 23 — Identification

Les opérateurs économiques indiquent aux autorités, pendant dix ans, de qui ils ont reçu un produit et à qui ils l'ont fourni.

### Articles 24 à 26 — Logiciels libres

Régime allégé pour les **gestionnaires de logiciels libres** (fondations, organisations qui soutiennent durablement un projet utilisé commercialement) : politique de cybersécurité, coopération avec les autorités, signalement (art. 24). Attestations volontaires de sécurité (art. 25). Guides de la Commission (art. 26). Le logiciel libre développé et fourni **hors activité commerciale** n'est pas un produit au sens du règlement.

---

## Chapitre III — Conformité du produit (articles 27 à 34)

### Article 27 — Présomption de conformité

Un produit conforme aux **normes harmonisées**, à des spécifications communes ou à une certification européenne est présumé respecter les exigences correspondantes.

### Article 28 — Déclaration UE de conformité

Le fabricant atteste, par écrit, que les exigences sont respectées (modèle à l'annexe V, version simplifiée à l'annexe VI).

### Articles 29 et 30 — Marquage CE

Principes et règles d'apposition ; le marquage est visible sur le produit, son emballage ou la déclaration pour un logiciel.

### Article 31 — Documentation technique

Contenu à l'annexe VII : description du produit, conception, évaluation des risques, période de support, traitement des vulnérabilités, normes appliquées.

### Article 32 — Procédures d'évaluation de la conformité

Selon la classe : **contrôle interne** (module A) pour la catégorie par défaut ; pour la classe I, contrôle interne seulement si une norme harmonisée ou une certification est entièrement appliquée, sinon **tiers** ; pour la classe II, **évaluation par un organisme notifié** obligatoire ; pour les produits critiques, **certification européenne** si elle est exigée. Procédures détaillées à l'annexe VIII.

### Articles 33 et 34

Mesures de soutien aux microentreprises et aux PME (art. 33) ; accords de reconnaissance mutuelle avec des pays tiers (art. 34).

---

## Chapitre IV — Notification des organismes d'évaluation de la conformité (articles 35 à 51)

Ces articles définissent qui peut évaluer un produit à la place du fabricant :
- les **autorités notifiantes** désignées par chaque État et leurs obligations ;
- les **exigences** applicables aux organismes notifiés : indépendance, impartialité, compétence, confidentialité, assurance ;
- la procédure de **notification** à la Commission, les numéros d'identification, la contestation de la compétence d'un organisme ;
- les **obligations opérationnelles** des organismes notifiés, les recours contre leurs décisions, la coordination entre eux.

Ce chapitre s'applique depuis le **11 juin 2026**, pour que des organismes soient prêts avant l'application complète.

---

## Chapitre V — Surveillance du marché et contrôle (articles 52 à 60)

Chaque État désigne une ou plusieurs **autorités de surveillance du marché**, qui peuvent :
- **contrôler** les produits et accéder aux données et à la documentation (art. 52 et 53) ;
- exiger des **mesures correctives**, la **restriction**, le **retrait** ou le **rappel** d'un produit présentant un risque important de cybersécurité (art. 54) ;
- agir même contre un produit **conforme** qui présente un risque important (art. 57), ou pour une **non-conformité formelle** : marquage CE absent, déclaration manquante… (art. 58).

La Commission arbitre au niveau de l'Union (art. 55 et 56). Les autorités mènent des **actions conjointes** et des **opérations de contrôle coordonnées** (art. 59 et 60).

---

## Chapitre VI — Actes délégués et comité (articles 61 et 62)

La Commission peut, par **actes délégués**, notamment mettre à jour la liste des produits importants, désigner les produits critiques soumis à une certification européenne et préciser certaines exigences (art. 61). Un **comité** des États membres l'assiste pour les actes d'exécution (art. 62).

---

## Chapitre VII — Confidentialité et sanctions (articles 63 à 65)

### Article 63 — Confidentialité

Les autorités et les organismes protègent les informations reçues : secrets d'affaires, code source, sécurité nationale.

### Article 64 — Sanctions

Les États fixent des amendes administratives, jusqu'à :

| Manquement | Plafond |
|---|---|
| Exigences essentielles (annexe I), obligations des articles 13 et 14 | 15 M€ ou 2,5 % du chiffre d'affaires annuel mondial |
| Autres obligations du règlement | 10 M€ ou 2 % |
| Informations inexactes, incomplètes ou trompeuses aux autorités ou organismes notifiés | 5 M€ ou 1 % |

Le montant retenu est le plus élevé des deux. Les micro et petites entreprises ne sont pas sanctionnées pour le seul dépassement du délai de 24 heures de l'alerte précoce, et les gestionnaires de logiciels libres ne reçoivent pas d'amende.

### Article 65 — Actions représentatives

Les consommateurs peuvent agir collectivement contre une violation du règlement.

---

## Chapitre VIII — Dispositions transitoires et finales (articles 66 à 71)

### Articles 66 à 68

Modifications d'autres textes de l'Union (surveillance du marché, actions représentatives…).

### Article 69 — Dispositions transitoires

Un produit mis sur le marché **avant le 11 décembre 2027** n'est soumis aux exigences que s'il fait ensuite l'objet d'une **modification substantielle** ; l'**article 14** (signalement) s'applique toutefois à tous les produits, y compris ceux déjà sur le marché.

### Article 70 — Évaluation

Rapports de la Commission sur l'application du règlement.

### Article 71 — Entrée en vigueur et application

Le règlement entre en vigueur le vingtième jour suivant sa publication et s'applique par étapes :

| Date | Étape |
|---|---|
| 10 décembre 2024 | Entrée en vigueur |
| 11 juin 2026 | Chapitre IV : organismes d'évaluation de la conformité |
| **11 septembre 2026** | **Article 14 : signalement** des vulnérabilités activement exploitées et des incidents graves |
| **11 décembre 2027** | **Application complète** |

---

## Les annexes

| Annexe | Contenu |
|---|---|
| I | **Exigences essentielles** : partie I, propriétés de sécurité du produit ; partie II, traitement des vulnérabilités (voir [Les exigences essentielles](3-Exigences_essentielles.md)) |
| II | Informations et instructions pour l'utilisateur |
| III | Liste des **produits importants** (classes I et II) |
| IV | Liste des **produits critiques** |
| V | Déclaration UE de conformité |
| VI | Déclaration UE de conformité simplifiée |
| VII | Contenu de la documentation technique |
| VIII | Procédures d'évaluation de la conformité |

---

## Pour un site industriel : les articles qui comptent

| Article | Pourquoi il compte en OT | Ce que fait le site |
|---|---|---|
| 13 | Période de support, mises à jour, SBOM : souvent plus courte que la durée de vie d'un automate ou d'un pare-feu (15 à 20 ans) | Demander la période de support et la nomenclature logicielle avant l'achat |
| 14 | Le fabricant signale les vulnérabilités exploitées et prévient ses utilisateurs | Avoir un contact déclaré chez chaque fournisseur et suivre ses avis de sécurité |
| 21 et 22 | Un intégrateur ou un constructeur de machines devient fabricant s'il vend sous son nom ou modifie substantiellement | Clarifier le statut CRA de chaque intégrateur dans le contrat |
| 7, 8, 32 et annexes III, IV | Routeurs, commutateurs, pare-feu industriels sont des produits importants : évaluation plus stricte | Vérifier la classe et la déclaration UE de conformité à la réception |
| 69 | Les produits installés avant décembre 2027 restent hors exigences, sauf modification substantielle | Inventorier ces produits et leur fin de support (WerbAssets, WerbMap) |

Voir aussi [Mettre en œuvre : l'acheteur et l'exploitant](5-Acheteur_et_exploitant.md).

---

## En une phrase

Le CRA impose aux fabricants de produits numériques — logiciels, équipements réseau, caméras, automates, objets connectés, applications — d'intégrer la cybersécurité dès la conception, de traiter les vulnérabilités pendant toute la période de support et de démontrer la conformité avant la mise sur le marché de l'Union ; les importateurs et distributeurs le vérifient, les autorités de surveillance du marché le contrôlent.

Retour à la [carte CRA](0-carte.md).
