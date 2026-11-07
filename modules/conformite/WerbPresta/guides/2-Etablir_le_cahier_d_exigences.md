<!-- WerbPresta – Développé par @WerbHat -->
# Établir le cahier d'exigences cyber d'un prestataire

Exiger une bonne hygiène de vos équipes sans l'exiger de vos prestataires laisse une porte ouverte. Ces exigences s'écrivent **avant** de signer : dans le cahier des charges d'un projet, le contrat de maintenance ou un **plan d'assurance sécurité** annexé au contrat. WerbPresta prépare ce document pour chaque prestataire, à partir d'un **modèle de questionnaire** commun.

---

## 1. Le modèle de questionnaire

*📋 Exigences › Modèle de questionnaire* regroupe les exigences en **13 domaines**, inspirés de la norme **IEC 62443-2-4** (exigences envers les prestataires d'intégration et de maintenance des systèmes industriels, domaines SP.01 à SP.12), de **NIS2** (articles 21 et 23) et de l'**ISO 27001** (relations avec les fournisseurs) :

organisation et personnel · assurance et documentation · architecture et accès à distance · liaisons sans fil · systèmes instrumentés de sécurité · gestion de configuration · journalisation · comptes et mots de passe · logiciels malveillants et supports amovibles · correctifs · sauvegarde et restauration · incidents · sous-traitance et fin de contrat.

Chaque exigence porte :

- un **code** (`CPT-01`…) et un **texte**, rédigé pour le prestataire (« Le prestataire… ») ;
- un **niveau** : **essentiel** (tout prestataire) ou **renforcé** (accès à distance ou périmètre critique) ;
- une **condition** éventuelle : elle ne s'applique que si le prestataire a un accès à distance, utilise des supports amovibles, a des privilèges d'administration ou traite des données personnelles ;
- ses **références**.

> Les exigences sont **reformulées** : le texte des normes, protégé, n'est pas recopié. Vérifiez les références sur les textes dont vous disposez.

Le modèle se modifie : texte, niveau, condition, références ; **➕ Exigence** dans un domaine ; suppression ; ordre. **↺ Ajouter les exigences proposées manquantes** rétablit une exigence supprimée par erreur. Changez la **version du modèle** quand vous le révisez : elle figure sur chaque document.

---

## 2. Le cahier d'un prestataire

Dans la fiche du prestataire, la carte **Cahier d'exigences cyber** :

1. **Niveau** : *automatique* par défaut — **renforcé** si la criticité du prestataire est élevée ou très élevée, ou s'il a un accès à distance ; **essentiel** sinon. Vous pouvez imposer l'un ou l'autre.
2. **Exigences proposées** : les essentielles, et les renforcées si le niveau est renforcé, **dont la condition correspond à la situation** décrite dans la fiche. Un mainteneur qui n'intervient que sur site ne reçoit pas les exigences d'accès à distance ; un intégrateur qui traite des données personnelles reçoit l'exigence RGPD.
3. **Ajustement** : décochez une exigence qui ne s'applique pas (« retirée ») ou cochez-en une hors proposition (« ajoutée »). **↺ Revenir à la proposition** annule les ajustements.

Gardez la fiche à jour : si le prestataire obtient un accès à distance, les exigences correspondantes sont proposées d'elles-mêmes.

---

## 3. Les documents

- **📄 Cahier d'exigences (Word)** : objet, périmètre de la prestation (SI, zones, actifs, accès, données), niveau d'exigence et sa justification, exigences retenues par domaine, modalités (réponse au questionnaire, écarts, vérification, échange des secrets). À annexer au contrat.
- **📝 Questionnaire à remettre (Word)** : les mêmes exigences, avec pour chacune une réponse à cocher (**oui, partiel, non, sans objet**) et une colonne **commentaire et preuve** ; un engagement signé en fin de document.

Les deux documents s'habillent du **modèle Word de l'entreprise** (*📋 Exigences › Modèle Word* : modèle commun du dossier `modeles/` de l'espace, ou fichier chargé).

Le cahier de WerbPresta traite de l'**organisation et des pratiques** du prestataire. Les **exigences techniques d'un projet** (exigences IEC 62443-3-3 allouées aux composants et aux zones) font l'objet du cahier distinct de **WerbIEC62443** : les deux se complètent.

---

## 4. Évaluer le prestataire

Quand le prestataire vous retourne le questionnaire complété, saisissez ses réponses dans la carte **Évaluation** de sa fiche :

- pour chaque exigence retenue : **oui**, **partiel**, **non** ou **sans objet**, et le commentaire ou la preuve fournie (la date de l'évaluation se pose à la première réponse) ;
- le **score** se calcule par domaine et au total : oui = 1 point, partiel = ½, non = 0 ; « sans objet » est exclu. Repères : 80 % et plus satisfaisant, 50 à 79 % à améliorer, moins de 50 % insuffisant ;
- chaque **partiel** ou **non** est un **écart** : notez l'**action demandée**, son **échéance**, puis passez-le à **clos** quand elle est faite. Un écart dont l'échéance est dépassée est signalé.

*🤝 Prestataires › Écarts* rassemble les écarts de tous les prestataires, les ouverts d'abord, par échéance.

**📄 Rapport d'évaluation (Word)** présente la synthèse, le score par domaine, les écarts et les réponses détaillées : à transmettre au prestataire avec les actions attendues.

**🗄 Archiver et commencer une nouvelle évaluation** garde la synthèse dans l'**historique** (date, score, nombre d'écarts, version du modèle), efface les réponses pour la prochaine campagne et fixe la **prochaine revue** à 12 mois si elle n'est pas déjà planifiée. Reprenez les écarts encore ouverts dans la nouvelle évaluation.

## 5. Suivre dans la durée

La carte **Suivi** de la fiche garde la trace des **documents reçus** (plan d'assurance sécurité, attestation de certification, rapport d'audit…, avec leur date de validité : un document expiré est signalé) et des **incidents** liés au prestataire et de leur suite.

Le tableau de bord signale : un prestataire critique jamais évalué, une évaluation de plus de 12 mois, des écarts en retard, un score faible, un document expiré.

## 6. Partager avec les autres modules

*⚙️ Base › Intégration WerbSMSI › 📤 Publier* (base enregistrée) met à disposition du site la **synthèse** de chaque prestataire : périmètre, criticité, accès à distance, niveau d'exigence, score par domaine, nombre d'écarts. **Ni contact, ni compte, ni commentaire, ni réponse détaillée** : les détails restent dans WerbPresta.

- **WerbEBIOS** (atelier 3) propose la **maturité cyber** et la **confiance** de la partie prenante correspondante, à partir du score et des écarts : vous validez ou non.
- **WerbMap** affiche, dans la fiche de chaque système d'information, les **prestataires qui y interviennent**.
- **WerbPCR** propose les prestataires comme **dépendances externes** du plan de reprise (PRI).

Republiez après chaque évaluation ou changement de périmètre.
