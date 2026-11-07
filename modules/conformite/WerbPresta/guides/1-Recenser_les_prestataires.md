<!-- WerbPresta – Développé par @WerbHat -->
# Recenser les prestataires et leur périmètre

Vos prestataires (intégrateurs, mainteneurs, constructeurs, télémaintenance, infogérance) **utilisent vos systèmes et les ont souvent configurés**. Ils sont une partie de votre surface d'attaque : un accès à distance oublié, un mot de passe commun à tous leurs clients ou un compte jamais désactivé suffisent à un attaquant. La directive NIS2 (sécurité de la chaîne d'approvisionnement), l'ISO 27001 (relations avec les fournisseurs) et la norme IEC 62443-2-4 (exigences envers les prestataires des systèmes industriels) demandent de les connaître et de les encadrer.

WerbPresta est la **liste de référence des prestataires** du site. Ce guide sert à **savoir qui intervient, où, et comment** ; le guide suivant traite du cahier d'exigences.

---

## 1. Créer la base et la rattacher au site

1. **✨ Nouvelle base**, puis *⚙️ Base › Intégration WerbSMSI* : **Choisir l'espace…**, choisir le site, **Rattacher**.
2. Sont copiés dans la base : les **systèmes d'information**, les **zones** et les **actifs** publiés par WerbMap, les **prestataires sous contrat cadre** du groupe (WerbGouvernance) et ceux des **projets IEC 62443** du site (WerbIEC62443).
3. **💾 Enregistrer** dans `sites/<CODE>/conformite/` de l'espace.

---

## 2. Recenser les prestataires

*🤝 Prestataires › Liste des prestataires* :

- **➕ Prestataire** crée une fiche (identifiant `PR-001`, `PR-002`…) ;
- en bas de la liste, les prestataires **déjà connus d'un autre module** et absents de la liste sont proposés : **➕ Ajouter** reprend leur nom, leur type et leur origine.

Recensez **tous** ceux qui touchent au système : pas seulement les intégrateurs, mais aussi les constructeurs qui assurent une télémaintenance, l'installateur de la vidéosurveillance, le prestataire de l'onduleur ou de la climatisation s'ils ont un accès réseau.

---

## 3. Remplir la fiche

| Rubrique | Ce qu'on y met |
|---|---|
| **Identité** | Raison sociale, type, statut, contrat et échéance, **interlocuteur sécurité** (sa fonction, pas ses coordonnées), certifications |
| **Périmètre** | Nature des interventions ; **SI**, **zones** et **actifs** cochés. Les actifs d'un SI ou d'une zone cochés sont **couverts d'office** (grisés) ; cochez en plus les actifs isolés |
| **Accès** | Sur site ; **à distance** (aucun, à la demande, permanent) et par quel **moyen** ; privilèges ; **comptes utilisés (identifiants seulement, jamais de mot de passe)** ; supports amovibles |
| **Données** | Ce qui lui est confié ou accessible : configurations, plans, données de production, données personnelles, programmes |
| **Suivi** | Prochaine revue, commentaire |

Les comptes à privilège et les comptes génériques d'un prestataire s'énumèrent aussi dans WerbExploitation ; les mots de passe vont dans le coffre-fort (guide WerbMap « Les mots de passe »).

---

## 4. Lire la criticité

Chaque fiche calcule une **criticité**, détaillée point par point :

| Critère | Points |
|---|---|
| SL-T le plus élevé des zones touchées | 3 ou 4 : 2 points ; 1 ou 2 : 1 point |
| Au moins un actif critique couvert | 1 point |
| Accès à distance | permanent : 2 points ; à la demande : 1 point |
| Privilèges d'administration | 1 point |
| Données sensibles confiées (configurations, plans, données personnelles, programmes) | 1 point |

0 ou 1 point : **faible** ; 2 ou 3 : **modérée** ; 4 ou 5 : **élevée** ; 6 et plus : **très élevée**. La criticité fixera le niveau d'exigence du cahier (essentiel ou renforcé) et le rythme des revues.

---

## 5. Traiter les points d'attention

WerbPresta signale, dans la fiche et au tableau de bord :

- un **accès à distance permanent** : à justifier, ou à ouvrir seulement à la demande ;
- un accès par **modem ou routeur 4G** ou **logiciel de prise de main** : il contourne le pare-feu ; préférez le bastion ou le VPN de l'entreprise ;
- un moyen d'accès à distance non renseigné ;
- un **contrat terminé** dont les accès ou les comptes restent ouverts ;
- un contrat échu, une revue en retard, une criticité élevée sans revue planifiée ;
- un SI, une zone ou un actif qui n'est plus publié par WerbMap.

*🤝 Prestataires › Couverture des actifs* montre, pour chaque actif, **qui y intervient** et avec quel accès : un actif critique entre les mains de trois prestataires mérite une attention particulière.

---

## 6. Au niveau du groupe

Une base WerbPresta rattachée au **🏢 groupe** (*Intégration WerbSMSI*, choix « Groupe », fichier dans `groupe/conformite/`) ne tient pas de fiches : elle **consolide** les évaluations publiées par chaque site. Un même intégrateur présent sur plusieurs sites apparaît sur une seule ligne, avec son score par site, sa criticité la plus forte, ses accès à distance et ses écarts. C'est la vue de la direction ou du RSSI du groupe.

La base du groupe tient aussi le **modèle de questionnaire commun** et le publie pour tous les sites. Chaque site le reçoit dans *📋 Modèle de questionnaire* et choisit de le reprendre : les cahiers d'exigences restent comparables d'un site à l'autre.

## 7. La suite

Le **cahier d'exigences cyber** et le **questionnaire** se préparent depuis la fiche (guide [Établir le cahier d'exigences cyber](2-Etablir_le_cahier_d_exigences.md)). Les prochaines versions ajoutent la **saisie des réponses** du prestataire avec un score par domaine et les écarts, puis la **publication** de l'évaluation (sans contact ni réponse détaillée) pour WerbEBIOS, WerbMap et WerbPCR. Le guide WerbMap « Les mots de passe », chapitre 9, détaille dès maintenant les exigences à écrire dans vos contrats.
