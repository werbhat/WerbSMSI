<!-- WerbPCR – Développé par @WerbHat -->
# Approfondir la continuité et la reprise

Ce guide va plus loin que [Continuité et reprise en clair](0-Continuite_et_reprise_en_clair.md). Il s'adresse au RSSI, au responsable d'exploitation et à ceux qui fixent les objectifs de continuité avec le métier. Il précise les **indicateurs de temps** et leurs relations, la conduite d'un **bilan d'impact**, le choix des **stratégies de sauvegarde et de reprise**, la **résilience** des installations, les **tests** et le **suivi**, avec les références normatives.

---

## 1. Les indicateurs de temps et leurs relations

### Les définitions

| Indicateur | Question | Qui le fixe |
|---|---|---|
| **Durée maximale tolérable d'interruption** (DMIA ; en anglais MTPD ou MTD) | Au-delà de quelle durée l'arrêt d'une activité met-il l'entreprise en péril (pertes, client perdu, sanction, danger) ? | La **direction** et le **métier** |
| **RTO** — objectif de délai de reprise | En combien de temps s'engage-t-on à remettre le système en service ? | Le **métier** avec l'informatique ; il doit rester **inférieur** à la durée maximale tolérable |
| **Temps de remise en service métier** (en anglais WRT) | Une fois le système techniquement rétabli, combien de temps pour vérifier les données, rattraper le retard, reprendre la production ? | Le **métier** |
| **RPO** — perte de données maximale admissible (PDMA) | Jusqu'à quel point dans le passé doit-on pouvoir restaurer les données ? | Le **métier**, selon ce qui peut se ressaisir ou se reconstituer |
| **Niveau minimal de continuité** (en anglais MBCO) | Quel niveau d'activité réduit est acceptable pendant l'incident (une ligne sur trois, les commandes urgentes seulement) ? | La **direction** et le **métier** |

### La règle de cohérence

> **RTO + temps de remise en service métier ≤ durée maximale tolérable d'interruption**

Exemple sur une ligne d'emboutissage : la direction estime qu'au-delà de **48 heures** d'arrêt les livraisons au client principal sont compromises (durée maximale tolérable). Après le redémarrage de la supervision, il faut **8 heures** pour contrôler les recettes et relancer la ligne (temps de remise en service). Le RTO de la supervision ne peut donc pas dépasser **40 heures** ; on retiendra par prudence **24 heures**.

Dans WerbPCR, la colonne RTO du bilan d'impact contient **l'objectif retenu** : fixez-le en tenant compte de cette règle. Le guide [Établir le Plan PRI](2-Etablir_le_PRI.md) emploie le sigle DMIA à côté du RTO ; retenez que, strictement, la durée maximale tolérable est la limite à ne pas franchir, et que le RTO est l'engagement pris en dessous de cette limite.

### Le RPO se lit vers le passé

Le RPO ne mesure pas une durée d'arrêt mais **une quantité de données perdues**, exprimée en temps : avec une sauvegarde chaque nuit à 2 h, un incident à 17 h fait perdre jusqu'à 15 heures de données. Le RPO fixe donc la **fréquence** minimale des sauvegardes ou de la réplication.

### Les indicateurs de fiabilité

| Indicateur | Définition | Usage |
|---|---|---|
| **MTBF** — temps moyen entre défaillances | Durée moyenne de bon fonctionnement entre deux pannes | Choisir un matériel, prévoir la maintenance préventive |
| **MTTR** — temps moyen de réparation ou de rétablissement | Durée moyenne pour remettre en service après une panne | Comparer au RTO : si le MTTR dépasse le RTO, une redondance est nécessaire |
| **Disponibilité** | MTBF ÷ (MTBF + MTTR) | Fixer un niveau de service |

Ce que représente un taux de disponibilité, sur une année de fonctionnement continu :

| Disponibilité | Arrêt cumulé admis par an |
|---|---|
| 99 % | 3,65 jours |
| 99,9 % | 8,76 heures |
| 99,99 % | 52,6 minutes |
| 99,999 % | 5,3 minutes |

Chaque « 9 » supplémentaire coûte nettement plus cher : redondance, maintenance, surveillance. Ne promettez que ce que le métier a réellement besoin d'obtenir.

---

## 2. Conduire le bilan d'impact

Le bilan d'impact (BIA) relie les activités de l'entreprise aux systèmes qui les portent, et en déduit les objectifs. Il se mène **avec le métier**, en ateliers courts.

### Les étapes

1. **Lister les activités** du site et leurs livrables (produire la pièce X, expédier, garantir la traçabilité qualité).
2. **Identifier pour chaque activité** les systèmes, les données, les personnes, les fournisseurs et les locaux dont elle dépend.
3. **Évaluer l'impact d'un arrêt dans le temps** : après 1 heure, 8 heures, 24 heures, 3 jours, une semaine, sur plusieurs axes.
4. **En déduire la durée maximale tolérable**, puis le RTO, le RPO et le niveau minimal de continuité.
5. **Recenser les ressources minimales** pour fonctionner en mode dégradé (personnes, postes, documents, pièces).
6. **Prioriser** : les activités les plus urgentes déterminent l'ordre de reprise.
7. **Faire valider** par la direction : les objectifs engagent des moyens.

### L'impact dans le temps

| Axe d'impact | 1 h | 8 h | 24 h | 3 jours | 1 semaine |
|---|---|---|---|---|---|
| Production | négligeable | une équipe perdue | une journée perdue | retard client | rupture de livraison |
| Sécurité des personnes | — | — | — | — | — |
| Obligations (client, réglementation) | — | — | traçabilité à reconstituer | non-conformité | pénalités |
| Financier | — | 20 k€ | 60 k€ | 200 k€ | 500 k€ et plus |
| Image | — | — | — | client informé | client perdu |

*Exemple fictif.* La durée maximale tolérable se lit là où l'impact devient inacceptable pour la direction (ici entre 3 jours et une semaine). Si un axe touche à la **sécurité des personnes**, il prime sur tous les autres.

### Les pièges du bilan d'impact

- Interroger seulement l'informatique : le RTO devient technique au lieu d'être métier.
- Oublier les **pics d'activité** (fin de mois, campagne saisonnière) : l'impact n'est pas le même toute l'année.
- Oublier les **dépendances cachées** : licences à jeton, clés matérielles, serveur de temps, annuaire, prestataire unique.
- Fixer tous les objectifs au plus court : le plan devient impossible à financer.

---

## 3. Du RPO à la stratégie de sauvegarde

### Les types de sauvegarde

| Type | Ce qui est copié | Restauration |
|---|---|---|
| **Complète** | Tout | La plus simple : une seule sauvegarde à restaurer |
| **Incrémentale** | Ce qui a changé depuis la **dernière sauvegarde**, quelle qu'elle soit | La dernière complète, puis **toutes** les incrémentales dans l'ordre : plus longue et plus fragile |
| **Différentielle** | Ce qui a changé depuis la **dernière complète** | La dernière complète, puis la dernière différentielle |
| **Instantané** (*snapshot*) | L'état d'un volume à un instant | Très rapide, mais souvent sur le même stockage : ce n'est **pas** une sauvegarde à lui seul |
| **Réplication** | Copie continue vers un autre stockage ou site | RPO très court ; **réplique aussi les erreurs et le chiffrement** d'un rançongiciel |

La réplication **synchrone** (écriture confirmée sur les deux sites) donne un RPO proche de zéro mais exige un lien rapide et proche ; la réplication **asynchrone** accepte un léger décalage.

### La règle 3-2-1, et ses compléments

- **3** copies des données (la donnée de production et deux sauvegardes),
- sur **2** supports différents,
- dont **1** hors du site.

Face aux rançongiciels, on y ajoute souvent : **1** copie **hors ligne ou non modifiable** (support déconnecté, stockage immuable) et **0** erreur à la vérification (les restaurations sont testées). Une sauvegarde joignable depuis le réseau sera chiffrée avec le reste.

### La conservation

Gardez plusieurs générations, par exemple **quotidiennes** sur deux semaines, **hebdomadaires** sur deux mois, **mensuelles** sur un an. Une compromission peut rester invisible plusieurs semaines : une seule génération récente ne suffit pas pour revenir à un état sain.

### Ce qu'il faut sauvegarder dans un site industriel

- les **programmes d'automates** et les configurations des équipements réseau, à chaque modification, avec leur version ;
- les **images** des postes de supervision et d'ingénierie (système, logiciels, paramètres), pour reconstruire vite ;
- les **historiques** et les données de traçabilité ;
- les **licences**, clés logicielles et procédures d'activation (souvent oubliées, elles bloquent la reprise) ;
- la **documentation** de reprise, consultable hors du réseau touché.

Protégez les sauvegardes comme les données qu'elles contiennent : **chiffrement**, accès limité, et clés de chiffrement elles-mêmes conservées en lieu sûr, hors du système sauvegardé.

---

## 4. Du RTO à la stratégie de reprise

### Les options, du plus rapide au plus économique

| Stratégie | Délai de reprise indicatif | Coût | Dans l'industrie |
|---|---|---|---|
| **Redondance active** (grappe, équipement doublé en fonctionnement) | Secondes à minutes | Très élevé | Serveurs de supervision redondants, réseau en boucle |
| **Secours chaud** : matériel prêt, données à jour | Minutes à quelques heures | Élevé | Poste de supervision de secours installé et à jour |
| **Secours tiède** : matériel prêt, données à restaurer | Heures à quelques jours | Moyen | Serveur de secours sans données, image prête |
| **Secours froid** : local et énergie, matériel à installer | Jours à semaines | Faible | Salle de repli, matériel à commander |
| **Pièces de rechange et contrats** | Selon le stock et le délai garanti | Variable | Automates et cartes de rechange préchargés, contrat avec délai d'intervention garanti |
| **Hébergement externe ou en nuage** | Heures | Variable | Pour les systèmes de gestion ; rarement pour le contrôle-commande |

### Trouver l'équilibre

Plus le RTO est court, plus la stratégie coûte cher ; plus il est long, plus l'arrêt coûte cher. Le bon objectif est celui où le **coût de la stratégie** reste inférieur au **coût de l'arrêt** évité. Présentez à la direction deux ou trois options chiffrées pour les systèmes critiques, plutôt qu'un seul chiffre.

### Après une cyberattaque

La reprise après une attaque diffère d'une reprise après une panne :

- **contenir d'abord** : isoler, comprendre le mode d'intrusion, s'assurer que l'attaquant n'a plus d'accès ;
- **restaurer une génération saine**, antérieure à la compromission, sur un matériel ou un réseau assaini ;
- **changer les secrets** (mots de passe, comptes d'administration, clés) avant de reconnecter ;
- **surveiller renforcé** les jours suivants.

Le RTO réel après une attaque est souvent bien plus long qu'après une panne : prévoyez-le dans le bilan d'impact.

---

## 5. Concevoir pour durer : supprimer les points uniques de défaillance

Un point unique de défaillance est un élément dont la panne arrête tout. Pour chaque système critique, cherchez-les :

| Domaine | Exemples de points uniques | Parades |
|---|---|---|
| **Énergie** | Une seule alimentation, pas d'onduleur | Double alimentation, onduleur dimensionné, groupe électrogène testé |
| **Matériel** | Un seul serveur de supervision | Serveur redondant ou de secours, pièces de rechange |
| **Stockage** | Un seul disque | RAID (qui protège d'une panne de disque, **pas** d'une erreur ou d'un chiffrement : ce n'est pas une sauvegarde) |
| **Réseau** | Un seul commutateur cœur, un seul lien | Équipements doublés, boucle, liens de secours |
| **Personnes** | Un seul automaticien connaît le programme | Suppléant formé, documentation à jour |
| **Fournisseurs** | Un seul prestataire capable d'intervenir | Contrat avec délai garanti, second prestataire qualifié |
| **Lieux** | Un seul local technique | Répartition sur deux locaux, protection incendie et eau |

---

## 6. Tester les plans

Un plan non testé est une hypothèse. Les tests vont du plus léger au plus réaliste ; chacun a sa place.

| Type de test | Ce qu'on fait | Risque pour la production | Fréquence conseillée |
|---|---|---|---|
| **Relecture** | Chaque responsable relit sa partie et vérifie contacts, versions, accès | Aucun | À chaque mise à jour, au moins une fois par an |
| **Exercice sur table** | Un scénario est déroulé en salle, étape par étape, avec les acteurs | Aucun | Une fois par an |
| **Simulation** | Les équipes jouent le scénario avec leurs outils, sans toucher à la production | Faible | Une fois par an pour les scénarios majeurs |
| **Test de restauration** | Restaurer réellement une sauvegarde sur un environnement de test, et vérifier | Faible | Au moins une fois par an et par système critique |
| **Test en parallèle** | Démarrer le système de secours à côté de la production, sans bascule | Faible à moyen | Selon la criticité |
| **Bascule complète** | Arrêter la production et basculer réellement sur le secours | Élevé | Rare, préparé, pendant un arrêt programmé |

Pour chaque test :

1. fixer un **objectif** mesurable (restaurer la supervision en moins de 8 heures, avec moins de 24 heures de données perdues) ;
2. **mesurer** le délai et la perte de données réellement obtenus, et les comparer au RTO et au RPO ;
3. noter les **écarts** (mot de passe introuvable, sauvegarde incomplète, procédure fausse) ;
4. **corriger** le plan et suivre les actions ;
5. **conserver la preuve** (compte rendu daté) : c'est elle qu'un auditeur ou une autorité demandera.

---

## 7. La crise et la communication

Un incident majeur se gère aussi par la décision et la communication :

- une **cellule de crise** désignée à l'avance (décideur, technique, métier, communication, juridique), avec un lieu et des moyens de liaison qui ne dépendent pas du système touché ;
- une **main courante** datée des décisions et des actions ;
- des **messages préparés** pour les équipes, les clients, les partenaires ;
- les **notifications** obligatoires : pour une entité concernée par NIS2, une alerte précoce à l'autorité dans les 24 heures, une notification dans les 72 heures et un rapport final dans le mois ; pour une violation de données personnelles, la CNIL dans les 72 heures (WerbRGPD).

---

## 8. Faire vivre les plans

### Quand les revoir

- à chaque **changement** d'architecture : nouveau système, nouvelle dépendance, nouveau prestataire ;
- après chaque **test** et chaque **incident** ;
- au moins **une fois par an**, en revue de direction.

### Les indicateurs à suivre

| Indicateur | Cible indicative |
|---|---|
| Part des systèmes critiques avec RTO et RPO validés par le métier | 100 % |
| Part des systèmes critiques dont la restauration a été testée dans l'année | 100 % |
| Écart entre le délai de reprise mesuré en test et le RTO | Nul ou négatif |
| Part des sauvegardes couvrant le RPO, dont une copie hors ligne | 100 % |
| Actions issues des tests et incidents soldées dans les délais | En progression |

---

## 9. Références

- **ISO 22301:2019** : exigences d'un système de management de la continuité d'activité ; **ISO 22313** : lignes directrices pour sa mise en œuvre.
- **ISO/IEC 27031** : préparation des technologies de l'information et de la communication à la continuité d'activité.
- **ISO/IEC 27001:2022**, annexe A : sécurité de l'information lors d'une perturbation (A.5.29), préparation des TIC à la continuité (A.5.30), sauvegarde des informations (A.8.13), redondance des moyens de traitement (A.8.14).
- **NIS2**, article 21, paragraphe 2, point c : continuité des activités, gestion des sauvegardes, reprise après sinistre et gestion des crises ; article 23 : notification des incidents importants.
- **NIST SP 800-34** (révision 1) : guide de planification de la continuité des systèmes d'information.

---

## 10. Dans WerbPCR

| Notion du guide | Où la saisir |
|---|---|
| Activités, événements redoutés, impacts | Plan PCI, volets 1 et 4 (repris de l'analyse EBIOS) |
| RTO, RPO, impact, mode dégradé | Plan PRI › 1. Bilan d'impact |
| Dépendances et points uniques de défaillance | Plan PRI › 2. Dépendances |
| Ordre de reprise, délai de reprise au plus tôt | Plan PRI › 3. Ordre de reprise (calculé) |
| Procédures de reprise, vérifications | Plan PRI › 4. Procédures de reprise |
| Sauvegardes face au RPO, restaurations testées | Plan PRI › 5. Contrôle des sauvegardes (registre de WerbExploitation) |
| Mesures de continuité, mode dégradé détaillé | Plan PCI, fiche du SI, rubrique g |
| Actions issues du bilan, des tests et des incidents | Plan PCI, volet 5 — Plan d'actions |
