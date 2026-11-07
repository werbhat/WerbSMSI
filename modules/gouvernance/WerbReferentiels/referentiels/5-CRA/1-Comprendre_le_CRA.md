<!-- WerbReferentiels – Développé par @WerbHat -->
# Comprendre le CRA

## Pourquoi un règlement sur les produits

NIS2 oblige les **organisations** à se protéger. Mais une organisation dépend des produits qu'elle achète : un pare-feu livré avec un mot de passe par défaut, un automate dont le firmware n'est plus maintenu, un logiciel dont personne ne sait de quelles bibliothèques il est fait. Le CRA prend le problème à la source : **un produit numérique vendu dans l'Union doit être sûr dès sa conception, et le rester pendant sa durée de vie**.

C'est la même logique que le marquage CE pour la sécurité électrique : le fabricant démontre la conformité, appose le marquage, et les autorités de surveillance du marché contrôlent.

C'est un **règlement** : il s'applique directement dans tous les États membres, sans transposition nationale (contrairement à NIS2).

---

## Quels produits

Un **produit comportant des éléments numériques** est un logiciel ou un matériel, avec ses solutions de traitement de données à distance, dont l'usage prévu comprend une **connexion de données**, directe ou indirecte, logique ou physique, à un appareil ou à un réseau.

| Concernés (exemples) | Exclus ou couverts ailleurs |
|---|---|
| Pare-feu, routeurs, commutateurs, passerelles, VPN | Dispositifs médicaux et de diagnostic in vitro (règlements dédiés) |
| Automates programmables, IHM, variateurs communicants, capteurs connectés | Véhicules à moteur soumis à homologation, aviation civile, équipements marins |
| Systèmes d'exploitation, hyperviseurs, logiciels de supervision, logiciels métiers vendus | Produits développés exclusivement pour la défense ou la sécurité nationale |
| Antivirus, gestionnaires de mots de passe, outils de gestion de réseau | Logiciel libre développé et fourni **hors activité commerciale** |
| Objets connectés grand public et professionnels | Services en ligne (SaaS) — sauf le traitement à distance indispensable à une fonction du produit ; les services relèvent de NIS2 |

> Un **logiciel développé pour son propre usage** et jamais mis sur le marché n'est pas concerné. Un logiciel vendu ou fourni dans le cadre d'une activité commerciale l'est, même gratuit.

---

## Le calendrier

| Date | Étape |
|---|---|
| 10 décembre 2024 | Entrée en vigueur du règlement |
| 11 juin 2026 | Dispositions relatives aux organismes notifiés (évaluation par un tiers) |
| **11 septembre 2026** | **Obligation de signalement** des vulnérabilités activement exploitées et des incidents graves (article 14) — **déjà applicable**, y compris pour les produits déjà sur le marché |
| **11 décembre 2027** | **Application complète** : exigences essentielles, évaluation de la conformité, marquage CE pour tout produit mis sur le marché à partir de cette date |

Un produit mis sur le marché **avant** le 11 décembre 2027 n'a pas à être rendu conforme rétroactivement aux exigences essentielles, sauf modification substantielle ultérieure. En revanche, l'obligation de signalement s'applique à tous les produits dès septembre 2026.

---

## Sanctions et surveillance

Les autorités de **surveillance du marché** de chaque État contrôlent les produits ; elles peuvent exiger des mesures correctives, le retrait ou le rappel d'un produit.

| Manquement | Amende maximale |
|---|---|
| Exigences essentielles, obligations du fabricant (dont le signalement) | 15 M€ ou 2,5 % du chiffre d'affaires annuel mondial (le plus élevé) |
| Autres obligations (importateurs, distributeurs, documentation…) | 10 M€ ou 2 % |
| Informations inexactes, incomplètes ou trompeuses fournies aux autorités | 5 M€ ou 1 % |

Le risque le plus concret reste commercial : sans marquage CE au titre du CRA, un produit ne pourra plus être vendu dans l'Union à partir de décembre 2027.

---

## Les liens avec les autres référentiels

| Texte | Ce qu'il vise | Lien avec le CRA |
|---|---|---|
| **NIS2** ([carte](../3-NIS2/0-carte.md)) | Les **organisations** de secteurs critiques | NIS2 demande de sécuriser la chaîne d'approvisionnement (art. 21 d) ; le CRA rend les produits achetés plus sûrs. Un incident sur un produit peut déclencher les deux signalements, à des destinataires différents. |
| **IEC 62443-4-1 et 4-2** | Cycle de développement sécurisé et exigences des **composants** industriels | Base technique la plus proche des exigences essentielles pour l'OT ; les normes harmonisées du CRA sont en cours d'élaboration. |
| **Règlement « machines » (UE) 2023/1230** | Sécurité des machines, y compris la protection contre la corruption (accès malveillant) | Applicable en janvier 2027 ; une machine connectée relève des deux textes, chacun pour sa partie. |
| **ISO/IEC 27001** ([carte](../4-ISO_27001/0-carte.md)) | Le système de management de la sécurité | Les mesures fournisseurs (A.5.19 à A.5.23) et de vulnérabilités (A.8.8) s'appuient sur les engagements CRA des fabricants. |
| **RED** (équipements radio, acte délégué cybersécurité) | Équipements radio connectés | Exigences de cybersécurité depuis août 2025 ; le CRA prendra le relais pour ces produits. |

Suite : [Qui est concerné, et comment](2-Qui_est_concerne.md).
