<!-- WerbReferentiels – Développé par @WerbHat -->
# Modèles et check-lists

Modèles à adapter. Le module **WerbRGPD** reprend ces fiches sous forme de formulaires (registre, violations, demandes, sous-traitants).

## Fiche du registre des traitements

| Rubrique | À renseigner |
|---|---|
| Nom du traitement | Ex. « Contrôle d'accès par badge – site de Lyon » |
| Finalité principale, finalités secondaires | |
| Base légale (et intérêt légitime documenté) | |
| Catégories de personnes | Salariés, intérimaires, prestataires, visiteurs, clients… |
| Catégories de données | Identité, coordonnées, vie professionnelle, données de connexion, images, localisation… |
| Données sensibles, données d'infraction | Oui / non, lesquelles, exception de l'article 9 |
| Destinataires internes, externes | |
| Sous-traitants | Nom, contrat article 28 signé (oui / non), date |
| Transferts hors de l'Union | Pays, garantie |
| Durée de conservation (base active, archivage) | |
| Mesures de sécurité | |
| Localisation des données | SI et actifs (TAG) |
| AIPD | Requise ? faite ? date ? |
| Responsable opérationnel, date de mise à jour | |

---

## Check-list de conformité d'un site

- [ ] Un référent RGPD est désigné sur le site, connu du DPO du groupe
- [ ] Le registre recense **tous** les traitements locaux (RH du site, badges, vidéo, OT, visiteurs, véhicules)
- [ ] Chaque traitement a une base légale, une durée de conservation et un responsable opérationnel
- [ ] Les durées de conservation sont **appliquées** (purges, y compris des exports et copies)
- [ ] Les mentions d'information sont en place (livret d'accueil, panneaux, registre des visiteurs)
- [ ] Le CSE a été informé et consulté sur les dispositifs de contrôle de l'activité
- [ ] Les traitements à risque ont une AIPD (biométrie, vidéosurveillance étendue, géolocalisation)
- [ ] Chaque prestataire ayant accès à des données a signé une clause article 28
- [ ] Les transferts hors de l'Union sont identifiés et encadrés
- [ ] Une procédure de gestion des violations existe, testée au moins une fois par an
- [ ] Le registre des violations est tenu, même sans notification
- [ ] Un circuit de traitement des demandes d'exercice des droits existe (délai d'un mois)
- [ ] Les données personnelles sont localisées dans l'inventaire et protégées en conséquence

---

## Procédure de gestion d'une violation de données

| Étape | Qui | Délai depuis la découverte |
|---|---|---|
| 1. Signaler l'incident au référent et au RSSI | Toute personne | Immédiatement |
| 2. Contenir : isoler, couper l'accès, changer les secrets | RSSI, informatique, OT | Heures |
| 3. Qualifier : données touchées, personnes, volume, nature de l'atteinte (confidentialité, intégrité, disponibilité) | DPO, RSSI | Avant 48 h |
| 4. Évaluer le risque pour les personnes : aucun, risque, risque élevé | DPO | Avant 48 h |
| 5. Notifier la CNIL si risque (téléservice), en complétant plus tard si besoin | DPO | **Avant 72 h** |
| 6. Informer les personnes si risque élevé | DPO, direction | Dans les meilleurs délais |
| 7. Si l'incident est aussi un incident NIS2 : signaler à l'ANSSI | RSSI | **24 h** (alerte précoce) |
| 8. Inscrire au registre des violations : faits, effets, mesures, décision motivée | DPO | Toujours |
| 9. Retour d'expérience, actions correctives | RSSI, DPO | Un mois |

---

## Réponse à une demande d'exercice des droits

1. Accusé de réception, date de la demande, délai de réponse (un mois).
2. Vérification de l'identité si doute raisonnable.
3. Recherche dans les traitements concernés (registre : où sont les données).
4. Réponse : données ou action réalisée, ou refus motivé (texte, obligation légale), rappel du droit de saisir la CNIL.
5. Si prolongation (complexité, nombre) : prévenir dans le premier mois, en motivant.
6. Archivage de la demande et de la réponse.

---

## Check-list du contrat de sous-traitance (article 28)

- [ ] Objet, durée, nature et finalité du traitement
- [ ] Types de données et catégories de personnes
- [ ] Traitement uniquement sur instruction documentée du responsable
- [ ] Confidentialité des personnes autorisées
- [ ] Mesures de sécurité (article 32) décrites ou annexées
- [ ] Sous-traitance ultérieure : autorisation préalable, mêmes obligations
- [ ] Assistance pour les droits des personnes, les violations, les AIPD
- [ ] Notification des violations au responsable dans un délai court (fixé au contrat, par exemple 24 h)
- [ ] Sort des données en fin de contrat : restitution, puis suppression des copies
- [ ] Audits et informations nécessaires pour démontrer la conformité
- [ ] Transferts hors de l'Union : interdits ou encadrés (pays, garantie)
