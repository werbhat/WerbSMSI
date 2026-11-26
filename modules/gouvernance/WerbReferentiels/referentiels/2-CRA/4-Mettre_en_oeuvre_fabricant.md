<!-- WerbReferentiels – Développé par @WerbHat -->
# Mettre en œuvre : le fabricant

Ce guide s'adresse à une organisation qui **met sur le marché** des produits à éléments numériques : constructeur d'équipements, éditeur de logiciels, constructeur de machines vendues sous sa marque. Il propose une feuille de route en dix étapes, à mener **avant décembre 2027** pour les produits vendus après cette date, et **dès maintenant** pour le signalement.

---

## La feuille de route

| # | Étape | Livrable | Qui |
|---|---|---|---|
| 1 | **Inventorier** les produits mis sur le marché, leurs versions et leurs composants | Registre des produits | Direction produit |
| 2 | **Qualifier** chaque produit : dans le champ ou non, classe (par défaut, I, II, critique), voie d'évaluation | Fiche produit CRA | Responsable conformité |
| 3 | **Organiser le signalement** (urgent : applicable depuis septembre 2026) : veille sur les produits, procédure 24 h / 72 h, point de contact | Procédure de signalement | RSSI produit (PSIRT) |
| 4 | **Mener l'analyse de risques** de chaque produit (usage prévu, environnement, menaces) | Analyse de risques produit | Équipe de conception |
| 5 | **Mesurer l'écart** aux exigences essentielles (annexe I) | Matrice de conformité | Équipe de conception |
| 6 | **Mettre en place le cycle de développement sécurisé** : exigences, revues, tests, gestion des dépendances | Processus de développement (IEC 62443-4-1) | Direction technique |
| 7 | **Produire et tenir la SBOM** de chaque version | SBOM lisible par machine | Équipe de développement |
| 8 | **Organiser le traitement des vulnérabilités** : politique de divulgation, tri, correctifs, avis de sécurité, distribution sécurisée | Politique de divulgation, avis publiés | PSIRT |
| 9 | **Fixer la période de support** et l'annoncer | Période indiquée sur le produit ou sa documentation | Direction produit |
| 10 | **Évaluer la conformité**, rédiger la documentation technique et la **déclaration UE**, apposer le **marquage CE** | Dossier technique, déclaration UE, marquage | Responsable conformité |

Commencez par les étapes **1 à 3** : sans inventaire ni procédure de signalement, une vulnérabilité exploitée découverte demain ne pourra pas être déclarée à temps.

---

## La documentation technique

Elle est rédigée **avant** la mise sur le marché, tenue à jour pendant la période de support et conservée **au moins dix ans** (ou pendant la période de support si elle est plus longue). Elle comprend notamment :

- la description générale du produit : usage prévu, versions logicielles, matériel, interfaces ;
- la conception et le développement : architecture, fonctions de sécurité, processus de traitement des vulnérabilités ;
- l'**analyse de risques** et la façon dont chaque exigence essentielle est satisfaite ;
- la **SBOM** ;
- la **période de support** retenue et sa justification ;
- les normes, spécifications ou certifications appliquées ;
- les rapports d'essais ;
- la déclaration UE de conformité.

## Les informations pour l'utilisateur (annexe II)

Fournies avec le produit, dans une langue comprise par l'utilisateur : fabricant et point de contact pour les vulnérabilités, identification du produit, usage prévu, risques connus, adresse de la déclaration UE, **date de fin de la période de support**, instructions d'installation et de configuration sécurisées, mises à jour, mise hors service sûre.

## La période de support

Le fabricant fixe une période de support qui reflète la **durée d'utilisation attendue** du produit ; elle est d'**au moins cinq ans**, sauf si le produit est prévu pour une durée plus courte. Pendant cette période, il traite les vulnérabilités et fournit les mises à jour de sécurité.

> En industrie, la durée d'exploitation dépasse souvent largement cinq ans. Un fabricant qui annonce une période de support plus longue en fait un argument commercial ; un acheteur vérifie ce point avant tout achat.

---

## Les erreurs à éviter

- **Attendre décembre 2027** : le signalement est déjà applicable, et la conformité d'un produit se construit pendant sa conception.
- **Traiter le CRA comme un dossier papier** : sans processus réel de traitement des vulnérabilités, la documentation ne tient pas.
- **Oublier les composants tiers** : une bibliothèque libre ou un module acheté fait partie du produit ; ses vulnérabilités sont celles du produit.
- **Confondre la classe du produit et celle de ses composants** : c'est la fonction principale qui compte.
- **Ignorer la modification substantielle** : une évolution majeure d'un produit déjà vendu peut appeler une nouvelle évaluation.

## Dans WerbSMSI

| Besoin | Module |
|---|---|
| Analyse de risques du produit ou de la ligne qui l'utilise | WerbEBIOS |
| Exigences de composants, cycle de développement (IEC 62443-4-1, 4-2) | WerbIEC62443 |
| Tests de sécurité du produit, suivi des corrections | WerbPentest |
| Veille sur les vulnérabilités des composants | WerbVeille |
| Procédure de signalement, revue de direction, plan d'actions | WerbGouvernance |

Suite : [Mettre en œuvre : l'acheteur et l'exploitant](5-Acheteur_et_exploitant.md).
