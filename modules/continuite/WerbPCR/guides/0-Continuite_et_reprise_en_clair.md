<!-- WerbPCR – Développé par @WerbHat -->
# Continuité et reprise en clair

Une panne de serveur, un incendie dans un local technique, un rançongiciel qui chiffre la supervision : un jour, un système d'information du site s'arrêtera. La question n'est pas *si*, mais **combien de temps** la production pourra tenir, et **combien de temps** il faudra pour revenir à la normale.

Ce guide explique, sans jargon, les notions de continuité et de reprise : à quoi servent les plans, ce que veulent dire RTO, RPO et mode dégradé, et pourquoi tout se prépare **avant** l'incident. Les deux guides suivants détaillent l'établissement du Plan PCI et du Plan PRI dans WerbPCR.

---

## 1. Les plans : qui fait quoi

| Sigle | Nom | Question |
|---|---|---|
| **PCA** | Plan de continuité d'activité | Comment l'**entreprise** continue-t-elle à servir ses clients malgré un sinistre ? (tout : personnes, locaux, fournisseurs, informatique) |
| **PCI** | Plan de continuité informatique | Comment les **systèmes d'information** continuent-ils à fonctionner, même moins bien, pendant l'incident ? |
| **PRI** (ou PRA) | Plan de reprise informatique (ou d'activité) | Comment **revient-on au fonctionnement normal** après l'incident : restaurer, reconstruire, redémarrer ? |
| **Gestion de crise** | — | Qui décide, qui communique, pendant les heures difficiles ? |

Le PCI et le PRI sont la partie informatique du PCA. WerbPCR tient les deux pour un site : le **Plan PCI** et le **Plan PRI**.

---

## 2. Le temps d'un incident

Un incident suit toujours la même chronologie :

1. **Détection** : quelqu'un ou quelque chose remarque l'anomalie.
2. **Réponse immédiate** : alerter, décider, isoler pour stopper la propagation.
3. **Continuité** : on tient comme on peut — secours, mode dégradé, conduite manuelle. *C'est le PCI.*
4. **Reprise** : on restaure, on reconstruit, on redémarre dans l'ordre, on vérifie. *C'est le PRI.*
5. **Retour à la normale** et **retour d'expérience** : qu'a-t-on appris, que corrige-t-on ?

Plus les étapes 2 à 4 sont préparées, plus l'arrêt est court.

---

## 3. Les trois notions clés

### RTO : combien de temps peut-on s'en passer ?

Le **RTO** (*Recovery Time Objective*, ou DMIA : durée maximale d'interruption admissible) est la durée au-delà de laquelle l'arrêt d'un système **n'est plus acceptable** pour le métier.

- Supervision d'une ligne qui tient une équipe en conduite locale : RTO d'environ 8 heures.
- Système de traçabilité exigé par un client : peut-être 24 heures, si les données se ressaisissent ensuite.
- Messagerie du site : quelques jours, si le téléphone prend le relais.

Le RTO se fixe **avec le métier** (production, qualité, logistique), pas seulement avec l'informatique.

### RPO : combien de données peut-on perdre ?

Le **RPO** (*Recovery Point Objective*, ou PDMA : perte de données maximale admissible) dit combien de données, exprimées en durée, on accepte de perdre. Un RPO de 24 heures signifie qu'on accepte de perdre une journée de données : il faut donc **au moins une sauvegarde par jour**.

Pour un programme d'automate qui change rarement, un RPO d'un mois peut suffire. Pour un historique de production réglementaire, il peut être d'une heure.

### Mode dégradé : comment travailler sans le système ?

Le **mode dégradé** est la façon de continuer **sans** le système, ou avec un système réduit : conduite locale aux pupitres, relevés sur papier, poste de secours, autre site. Il a une **durée de tenue** : au-delà, il ne suffit plus. Cette durée donne souvent le RTO.

> **Repère** : un mode dégradé qui n'a jamais été pratiqué n'existe pas vraiment. Exercez-le avec les équipes de production.

---

## 4. Le bilan d'impact (BIA)

Avant d'écrire un plan, on se demande pour chaque système : **que se passe-t-il s'il s'arrête ?**

| Question | Exemple de réponse |
|---|---|
| Quelles activités en dépendent ? | La ligne 2, l'expédition |
| Quel impact après 1 h, 8 h, 24 h, une semaine ? | Rien / perte d'une équipe / retards clients / pénalités |
| Existe-t-il un mode dégradé, et combien de temps tient-il ? | Conduite locale, une équipe |
| Quelles données ne doivent pas être perdues ? | Recettes, historique de production |
| De quoi dépend-il pour redémarrer ? | Réseau, annuaire, serveur de fichiers, prestataire |

C'est le **bilan d'impact** (*Business Impact Analysis*). Il donne le RTO, le RPO et l'ordre de reprise.

---

## 5. Pourquoi tout se prépare avant

Pendant l'incident, on manque de tout : de temps, d'informations, parfois de réseau et de personnes. Ce qui n'a pas été préparé ne se fera pas, ou se fera mal :

- **Sauvegardes** : existent-elles, sont-elles **hors ligne**, a-t-on déjà réussi à les restaurer ?
- **Documentation** : configurations, raccordements, comptes, procédures — à jour et accessibles **hors du réseau touché** (copie papier, poste isolé).
- **Contacts** : qui appeler, à toute heure, chez soi et chez les prestataires.
- **Décisions** : qui déclare l'incident, qui décide d'isoler, qui lance la reprise.
- **Ordre** : quel système redémarre en premier, et de quoi a-t-il besoin.

Après une **cyberattaque**, une règle de plus : on ne redémarre qu'une fois l'incident **contenu** et la cause comprise. Restaurer un système sur un réseau encore compromis, c'est recommencer.

---

## 6. Les erreurs fréquentes

- **Un RTO fixé par l'informatique seule**, sans le métier : il est soit irréaliste, soit inutilement coûteux.
- **Un plan jamais testé** : il échoue au premier vrai incident, sur un détail (mot de passe introuvable, sauvegarde illisible).
- **Les dépendances oubliées** : le système redémarre, mais l'annuaire ou le réseau dont il a besoin ne sont pas là.
- **Le plan rangé sur le serveur qui vient de tomber.**
- **Confondre continuité et reprise** : tenir pendant l'incident et revenir à la normale demandent des mesures différentes.

---

## 7. Dans WerbPCR

| Plan | Ce que vous y faites | Guide |
|---|---|---|
| **Plan PCI** | Périmètre métier (valeurs métier et événements redoutés de l'analyse EBIOS), approche systémique, systèmes d'information du site, une fiche par système (valeurs métier, événements redoutés, risques, mesures de prévention, **mesures de continuité**), plan d'actions | [Établir le Plan PCI](1-Etablir_le_plan.md) |
| **Plan PRI** | Bilan d'impact (RTO, RPO, impact, mode dégradé), dépendances, ordre de reprise calculé, procédures de reprise, contrôle des sauvegardes face au RPO | [Établir le Plan PRI](2-Etablir_le_PRI.md) |

WerbPCR reprend ce que les autres modules connaissent déjà : l'analyse de risques (WerbEBIOS), les systèmes d'information (WerbMap), le registre des sauvegardes (WerbExploitation), les rôles (WerbGouvernance), les prestataires (WerbPresta). Le document Word réunit les deux plans, au modèle de l'entreprise.

> **En résumé** : la continuité, c'est tenir pendant l'incident ; la reprise, c'est revenir à la normale. Les deux se mesurent en heures (RTO, RPO), se fixent avec le métier, et se préparent avant — sauvegardes testées, documentation accessible, décisions et ordre de reprise écrits.
