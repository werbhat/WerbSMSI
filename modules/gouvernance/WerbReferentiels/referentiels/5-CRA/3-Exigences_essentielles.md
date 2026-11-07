<!-- WerbReferentiels – Développé par @WerbHat -->
# Les exigences essentielles

L'**annexe I** du règlement fixe deux familles d'exigences. Elles sont formulées en **objectifs** : le fabricant choisit les moyens, et les démontre dans sa documentation technique. Les normes harmonisées, en cours de rédaction, donneront une présomption de conformité.

---

## Partie I — Propriétés de sécurité du produit

Le produit est conçu, développé et fabriqué pour garantir un niveau de cybersécurité **adapté aux risques**, sur la base d'une **analyse de risques** documentée. En particulier :

| # | Exigence (formulation simplifiée) | Ce que cela veut dire en pratique | Preuve attendue |
|---|---|---|---|
| 1 | Mis sur le marché **sans vulnérabilité exploitable connue** | Analyse des vulnérabilités des composants avant la livraison | Rapport d'analyse, SBOM confrontée aux bases de vulnérabilités |
| 2 | **Configuration sécurisée par défaut**, avec retour à l'état d'origine possible | Pas de mot de passe par défaut commun, services inutiles désactivés | Guide de configuration, tests de la configuration d'usine |
| 3 | Vulnérabilités corrigeables par des **mises à jour de sécurité**, automatiques si pertinent, que l'utilisateur peut différer ou refuser | Mécanisme de mise à jour, notification de l'utilisateur | Procédure de mise à jour, historique des versions |
| 4 | **Protection contre l'accès non autorisé** : authentification, gestion des identités et des accès | Comptes nominatifs, mots de passe robustes, verrouillage | Description des mécanismes d'authentification |
| 5 | **Confidentialité** des données stockées, transmises ou traitées (chiffrement) | Chiffrement des flux d'administration et des secrets | Liste des algorithmes, gestion des clés |
| 6 | **Intégrité** des données, programmes et configuration | Signature des firmwares, contrôle d'intégrité au démarrage | Description de la chaîne de confiance |
| 7 | **Minimisation des données** : seulement celles nécessaires à l'usage prévu | Pas de télémétrie superflue | Inventaire des données traitées |
| 8 | **Disponibilité** des fonctions essentielles, y compris après un incident, et résistance au déni de service | Comportement en cas de saturation, mode dégradé | Tests de robustesse |
| 9 | **Limiter l'effet** du produit sur la disponibilité des autres appareils ou réseaux | Pas de diffusion massive, limitation de débit | Tests en réseau |
| 10 | **Surface d'attaque réduite**, y compris les interfaces externes | Ports et services au strict nécessaire | Liste des interfaces et justification |
| 11 | **Réduire l'impact** d'un incident (cloisonnement, mécanismes d'atténuation) | Séparation des privilèges, durcissement | Architecture de sécurité |
| 12 | **Journalisation** des activités internes pertinentes, désactivable par l'utilisateur | Journaux d'accès et de modification de configuration | Liste des événements journalisés |
| 13 | **Effacement** sûr et facile de toutes les données et paramètres, et transfert sécurisé si prévu | Fonction de remise à zéro | Procédure de fin de vie |

---

## Partie II — Traitement des vulnérabilités

Pendant toute la **période de support**, le fabricant :

| # | Exigence (formulation simplifiée) | En pratique |
|---|---|---|
| 1 | Identifie et documente les vulnérabilités et composants, notamment par une **nomenclature logicielle (SBOM)** dans un format lisible par machine, au moins pour les dépendances de premier niveau | SBOM à jour à chaque version ; transmise aux autorités sur demande |
| 2 | **Traite et corrige sans délai** les vulnérabilités, notamment par des mises à jour de sécurité, séparées des évolutions fonctionnelles quand c'est possible | Processus de tri, priorisation et correction |
| 3 | **Teste et revoit régulièrement** la sécurité du produit | Tests d'intrusion, revues de code, analyses automatisées |
| 4 | **Publie** les informations sur les vulnérabilités corrigées (description, produits concernés, impact, gravité, correction) | Avis de sécurité publics |
| 5 | Applique une **politique de divulgation coordonnée** des vulnérabilités | Politique publiée, délais annoncés |
| 6 | Facilite le **signalement** des vulnérabilités par une adresse de contact | Point de contact unique, accusé de réception |
| 7 | **Distribue les mises à jour de façon sécurisée** | Mises à jour signées, canal authentifié |
| 8 | Diffuse les correctifs **sans délai et gratuitement**, avec des conseils aux utilisateurs | Bulletins avec mesures de contournement |

---

## Le signalement (article 14) — applicable depuis le 11 septembre 2026

Le fabricant signale, par la **plateforme unique de signalement** gérée par l'ENISA, au CSIRT coordinateur de son État et à l'ENISA :

| Événement | Alerte précoce | Notification | Rapport final |
|---|---|---|---|
| **Vulnérabilité activement exploitée** dans son produit | **24 h** après en avoir eu connaissance | **72 h** | Au plus tard **14 jours** après la mise à disposition d'une mesure corrective |
| **Incident grave** ayant un impact sur la sécurité du produit | **24 h** | **72 h** | **Un mois** après la notification |

Il **informe aussi les utilisateurs** concernés, et si besoin le public, de la vulnérabilité ou de l'incident et des mesures d'atténuation.

> Pour un fabricant qui est aussi une entité NIS2, un même événement peut appeler **deux signalements** : celui du CRA (le produit) et celui de NIS2 (l'organisation). Préparez une procédure unique qui distingue les deux.

---

## Correspondance avec IEC 62443

Pour un produit industriel, la série IEC 62443 est la base technique la plus proche du CRA.

| Exigence CRA | IEC 62443-4-1 (développement sécurisé) | IEC 62443-4-2 (exigences des composants) |
|---|---|---|
| Analyse de risques (partie I) | SR (exigences de sécurité), SD-1 (modèle de menace) | — |
| Configuration sécurisée par défaut (I.2) | SG (guides de sécurité, durcissement) | CR 7.7 (fonctionnalité minimale) |
| Contrôle d'accès, authentification (I.4) | — | CR 1.1 à CR 1.14, CR 2.1 |
| Confidentialité, intégrité (I.5, I.6) | — | CR 3.1, CR 3.4, CR 4.1, CR 4.3 ; EDR / HDR 3.14 (intégrité du démarrage) |
| Disponibilité, déni de service (I.8) | — | CR 7.1, CR 7.2 |
| Journalisation (I.12) | — | CR 2.8, CR 2.9, CR 6.1 |
| Mises à jour sécurisées (I.3, II.7) | SUM (gestion des mises à jour de sécurité) | CR 3.10 ; EDR 3.12 |
| Traitement des vulnérabilités, divulgation (partie II) | DM (gestion des défauts de sécurité), SVV (vérification et validation) | — |

Le tableau est **fonctionnel** : appliquer IEC 62443-4-1 et 4-2 aide fortement, sans valoir présomption de conformité tant que les normes harmonisées du CRA ne sont pas publiées. Voir aussi le [tableau de correspondances](../correspondances.md).

Suite : [Mettre en œuvre : le fabricant](4-Mettre_en_oeuvre_fabricant.md).
