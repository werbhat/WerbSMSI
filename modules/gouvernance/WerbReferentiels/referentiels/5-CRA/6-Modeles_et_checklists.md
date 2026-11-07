<!-- WerbReferentiels – Développé par @WerbHat -->
# Modèles et check-lists

Modèles à reprendre dans un tableur ou dans les modules WerbSMSI. Les exemples sont **fictifs**.

---

## Fiche produit CRA

| Rubrique | Contenu | Exemple fictif |
|---|---|---|
| Produit | Désignation, fabricant, modèle | Commutateur industriel 16 ports, Constructeur A, modèle SW-16G |
| Identifiant | TAG ou référence interne | SW_CORE01 |
| Version | Firmware ou logiciel installé | 10.12 |
| Localisation | Site, zone, baie | LYON, zone Supervision, baie BAIE-01 |
| Responsable | Fonction en charge de l'équipement | Administrateur réseau du site |
| Criticité de l'usage | D'après l'analyse de risques | Élevée (cœur du réseau de supervision) |
| Classe CRA probable | Par défaut, I, II, critique | Important, classe I (commutateur) |
| Mise sur le marché | Avant ou après le 11/12/2027 | Avant : CRA non applicable à ce produit |
| Déclaration UE | Adresse, date | — |
| Fin de la période de support | Date annoncée par le fabricant | 12/2029 |
| Point de contact vulnérabilités | Adresse ou formulaire | psirt@exemple.fr |
| Avis de sécurité | Page du fabricant | (adresse de la page des avis) |
| SBOM | Disponible, sur demande, non | Sur demande |
| Statut | Conforme, partiellement conforme, non conforme, à évaluer | Partiellement conforme (pas de SBOM fournie) |
| Actions | Référence au plan d'actions | PA-2026-014 : demander la SBOM au fabricant |

## Registre des produits (colonnes)

`TAG` · `Produit` · `Fabricant` · `Modèle` · `Version` · `Site` · `Zone` · `Criticité` · `Classe CRA` · `Mise sur le marché` · `Fin de support` · `Point de contact` · `SBOM` · `Statut` · `Action`

> Les sept premières colonnes viennent de l'inventaire WerbMap ; les autres se complètent avec le fabricant.

---

## Check-list fabricant

- [ ] Produits mis sur le marché inventoriés, avec leurs versions et leurs composants
- [ ] Chaque produit qualifié : champ, classe, voie d'évaluation de la conformité
- [ ] **Procédure de signalement** 24 h / 72 h / rapport final en place, rôles nommés, accès à la plateforme de signalement
- [ ] Point de contact vulnérabilités publié ; politique de divulgation coordonnée publiée
- [ ] Analyse de risques documentée pour chaque produit
- [ ] Matrice des exigences essentielles (annexe I, parties I et II) renseignée, avec les preuves
- [ ] Cycle de développement sécurisé appliqué (exigences, revues, tests, dépendances)
- [ ] SBOM produite à chaque version et conservée
- [ ] Période de support fixée, justifiée et annoncée
- [ ] Mises à jour de sécurité signées, distribuées gratuitement, avec avis publiés
- [ ] Documentation technique complète, conservée dix ans
- [ ] Évaluation de la conformité réalisée (contrôle interne ou organisme notifié), déclaration UE signée, marquage CE apposé
- [ ] Informations pour l'utilisateur (annexe II) fournies avec le produit

## Check-list achat

- [ ] Le produit est-il dans le champ du CRA ? sa classe ?
- [ ] Mis sur le marché après le 11/12/2027 : déclaration UE et marquage CE fournis
- [ ] Date de fin de support connue et compatible avec la durée d'exploitation
- [ ] Point de contact vulnérabilités et page des avis connus
- [ ] SBOM fournie ou disponible sur demande
- [ ] Mises à jour gratuites, signées ; procédure de mise à jour documentée
- [ ] Guide de configuration sécurisée fourni ; aucun mot de passe par défaut commun
- [ ] Engagement d'information en cas de vulnérabilité exploitée
- [ ] Clauses reprises dans le contrat ; pièces vérifiées et rangées à la réception
- [ ] Produit ajouté à l'inventaire (WerbMap) avec son statut CRA

---

## Modèle de clause contractuelle

> *Le fournisseur garantit que les produits comportant des éléments numériques livrés au titre du présent contrat et mis sur le marché à compter du 11 décembre 2027 sont conformes au règlement (UE) 2024/2847 et fournit la déclaration UE de conformité correspondante. Il indique pour chaque produit la date de fin de la période de support, pendant laquelle il fournit gratuitement les mises à jour de sécurité, et communique le point de contact pour le signalement des vulnérabilités. Il informe l'acheteur, sans délai, de toute vulnérabilité activement exploitée ou de tout incident grave affectant un produit livré, ainsi que des mesures d'atténuation. Il fournit, sur demande, la nomenclature logicielle (SBOM) des produits livrés.*

À adapter avec le service juridique ; pour les produits déjà sur le marché, conserver les engagements de support, d'information et de SBOM.

---

## Plan de signalement d'une vulnérabilité exploitée (fabricant)

| Délai | Action | Responsable | Contenu |
|---|---|---|---|
| H0 | Connaissance d'une exploitation active (client, veille, chercheur) | PSIRT | Ouverture du dossier, horodatage |
| < 24 h | **Alerte précoce** sur la plateforme de signalement | Responsable du signalement | Produit, existence de l'exploitation, États membres concernés si connus |
| < 72 h | **Notification** | Responsable du signalement | Description, nature de l'exploitation, mesures correctives ou d'atténuation, gravité estimée |
| Au plus vite | **Information des utilisateurs** | Communication, PSIRT | Avis de sécurité, mesures à appliquer |
| ≤ 14 jours après le correctif | **Rapport final** | Responsable du signalement | Description complète, gravité, impact, cause, informations sur l'acteur malveillant si connues, correctifs |
| Après clôture | Retour d'expérience | PSIRT, direction technique | Cause, amélioration du processus |

---

## Tableau de bord CRA (proposition)

| Indicateur | Calcul | Seuil d'alerte proposé |
|---|---|---|
| Produits recensés avec statut CRA | Produits du registre au statut renseigné / produits de l'inventaire | < 80 % |
| Fin de support connue | Produits avec date de fin de support / produits du registre | < 70 % |
| Produits en fin de support < 24 mois | Nombre | > 0 sans plan de remplacement |
| Vulnérabilités exploitées ouvertes | Nombre, sur les produits du site | > 0 depuis plus de 7 jours |
| Achats avec clauses CRA | Contrats de l'année avec clauses / contrats d'achat de produits numériques | < 100 % |

Suite : [Résumé des articles](7-Resume_des_articles.md) · retour à la [carte CRA](0-carte.md).
