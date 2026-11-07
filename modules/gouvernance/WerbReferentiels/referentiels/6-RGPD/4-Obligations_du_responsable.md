<!-- WerbReferentiels – Développé par @WerbHat -->
# Obligations du responsable de traitement

## Le registre des activités de traitement (article 30)

C'est la **pièce centrale** : la CNIL commence presque toujours un contrôle par sa demande. Il est obligatoire au-delà de 250 salariés et, en dessous, dès que le traitement n'est pas occasionnel, présente un risque ou porte sur des données sensibles : en pratique, **toute entreprise** doit en tenir un.

Une fiche par traitement (une **finalité principale**), avec :

| Rubrique | Exemple : contrôle d'accès par badge |
|---|---|
| Nom et coordonnées du responsable, du DPO | Usine de Lyon, DPO du groupe |
| **Finalité** | Contrôler l'accès aux bâtiments et aux zones de production |
| **Base légale** | Intérêt légitime (sécurité des personnes et des biens) |
| **Catégories de personnes** | Salariés, intérimaires, prestataires, visiteurs |
| **Catégories de données** | Identité, photo, numéro de badge, zones autorisées, passages horodatés |
| Données sensibles | Aucune (sans biométrie) |
| **Destinataires** | Service sécurité, ressources humaines en cas d'enquête, société de gardiennage (sous-traitant) |
| Transferts hors de l'Union | Aucun |
| **Durée de conservation** | Badge : durée de l'habilitation ; passages : trois mois |
| **Mesures de sécurité** | Accès nominatifs au logiciel, journalisation, serveur en zone protégée, sauvegardes |
| Où sont les données | SI « Sûreté », serveur du contrôle d'accès (TAG de l'inventaire) |

Le **sous-traitant** tient lui aussi un registre des traitements qu'il effectue pour le compte de ses clients.

---

## Protection des données dès la conception et par défaut (article 25)

Pour tout nouveau système (logiciel, automatisme connecté, caméra, application), la protection des données se pense **au cahier des charges**, pas après la mise en service :

- **dès la conception** : minimisation, pseudonymisation, chiffrement, cloisonnement, purge automatique prévue ;
- **par défaut** : seules les données nécessaires sont collectées, conservées le temps nécessaire, visibles par les seules personnes qui en ont besoin.

Intégrez ces exigences aux cahiers des charges et aux recettes, au même titre que la cybersécurité.

---

## L'analyse d'impact relative à la protection des données (AIPD, article 35)

Obligatoire quand un traitement est **susceptible d'engendrer un risque élevé** pour les droits et libertés des personnes. La CNIL publie une **liste des types de traitements** pour lesquels elle est obligatoire (dont la surveillance constante de l'activité des salariés, les données biométriques, la géolocalisation à grande échelle). À défaut, le CEPD retient neuf critères ; **deux critères réunis imposent en principe une AIPD** :

1. évaluation ou notation (profilage) ;
2. décision automatisée avec effet juridique ou similaire ;
3. **surveillance systématique** ;
4. **données sensibles** ou hautement personnelles ;
5. traitement à grande échelle ;
6. croisement de jeux de données ;
7. **personnes vulnérables** (dont les salariés vis-à-vis de l'employeur) ;
8. usage innovant ou nouvelle technologie ;
9. traitement qui empêche d'exercer un droit ou de bénéficier d'un service ou d'un contrat.

Une AIPD décrit le traitement, évalue sa nécessité et sa proportionnalité, analyse les **risques pour les personnes** (accès illégitime, modification non désirée, disparition des données) et fixe les mesures. Si le risque résiduel reste élevé, la CNIL doit être **consultée avant** la mise en œuvre. La CNIL fournit un outil gratuit (PIA). La méthode est proche d'EBIOS Risk Manager, mais le point de vue est celui de la **personne**, pas de l'entreprise.

---

## Les violations de données (articles 33 et 34)

Une **violation** est un incident de sécurité qui entraîne, de façon accidentelle ou illicite, la **destruction, la perte, l'altération, la divulgation ou l'accès non autorisé** à des données personnelles. Elle touche la **confidentialité** (fuite, accès d'un tiers), l'**intégrité** (modification) ou la **disponibilité** (chiffrement par un rançongiciel, perte sans sauvegarde).

| Étape | Délai | Quand |
|---|---|---|
| **Documenter** la violation dans le registre des violations | Toujours | Même sans notification : faits, effets, mesures prises |
| **Notifier la CNIL** | **72 heures** après en avoir pris connaissance | Sauf si la violation n'est pas susceptible d'engendrer un risque pour les personnes ; au-delà de 72 h, justifier le retard ; une notification peut être complétée ensuite |
| **Informer les personnes** | Dans les meilleurs délais | Si la violation est susceptible d'engendrer un **risque élevé** (sauf données chiffrées inexploitables, mesures qui suppriment le risque, effort disproportionné remplacé par une communication publique) |
| Le **sous-traitant** prévient le responsable | Dans les meilleurs délais | Toujours, dès qu'il a connaissance de la violation |

> Le délai de 72 h commence quand on a une **certitude raisonnable** qu'une violation de données personnelles s'est produite, pas à la fin de l'enquête. Un rançongiciel qui chiffre le serveur RH est une violation (disponibilité, et souvent confidentialité si des données ont été exfiltrées).

---

## Les sous-traitants (article 28)

Le responsable ne fait appel qu'à des sous-traitants présentant des **garanties suffisantes**, et signe avec chacun un **contrat** (ou un avenant) qui précise l'objet, la durée, la nature et la finalité du traitement, les types de données, les catégories de personnes, et les obligations du sous-traitant :

- traiter les données **uniquement sur instruction documentée** ;
- garantir la **confidentialité** des personnes autorisées ;
- assurer la **sécurité** (article 32) ;
- ne recourir à un **autre sous-traitant** qu'avec autorisation, en lui imposant les mêmes obligations ;
- **aider** le responsable à répondre aux demandes de droits, à notifier les violations, à mener les AIPD ;
- **supprimer ou restituer** les données à la fin de la prestation ;
- mettre à disposition les informations nécessaires et permettre les **audits**.

Un prestataire de télémaintenance qui se connecte à un serveur contenant des données personnelles est un sous-traitant, même si ce n'est pas l'objet de son contrat : la clause doit y figurer.

---

## Les transferts hors de l'Union (chapitre V)

Un transfert (y compris un **accès à distance** depuis un pays tiers, ou un hébergement chez un fournisseur hors de l'Union) n'est possible qu'avec une garantie :

- une **décision d'adéquation** de la Commission (le pays offre un niveau de protection équivalent ; pour les États-Unis, seulement vers les entreprises adhérentes au cadre UE-États-Unis de protection des données) ;
- des **clauses contractuelles types** adoptées par la Commission, avec une évaluation de la législation du pays destinataire ;
- des **règles d'entreprise contraignantes** (BCR) au sein d'un groupe.

---

## Le délégué à la protection des données (DPO, articles 37 à 39)

Sa désignation est **obligatoire** pour les autorités publiques, et pour les organismes dont l'activité de base consiste en un **suivi régulier et systématique à grande échelle** ou en un traitement **à grande échelle de données sensibles**. Sinon, elle reste recommandée ; au minimum, désignez un **référent** interne. Le DPO informe, conseille, contrôle, coopère avec la CNIL ; il doit être associé à toutes les questions de protection des données, disposer de moyens et ne pas être en conflit d'intérêts (il ne décide pas des traitements qu'il contrôle).
