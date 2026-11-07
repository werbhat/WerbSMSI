<!-- WerbReferentiels – Développé par @WerbHat -->
# Carte RGPD — règlement (UE) 2016/679 sur la protection des données

Le règlement général sur la protection des données (RGPD) encadre tout **traitement de données personnelles** : toute information qui permet d'identifier, directement ou non, une personne physique. Sur un site industriel, il ne concerne pas seulement les ressources humaines : badges d'accès, vidéosurveillance, identifiants des opérateurs dans la supervision, géolocalisation des véhicules, prestataires en télémaintenance. Il impose de **savoir quelles données on traite, pourquoi, combien de temps, qui y accède**, et de les **protéger**. La sécurité des données (article 32) et la notification des violations (article 33) en font un sujet directement lié au SMSI.

> **À vérifier** : les délais, seuils et montants de ces pages sont ceux du règlement ; les durées de conservation citées sont des recommandations de la CNIL. Les lignes directrices du Comité européen de la protection des données (CEPD) et les référentiels de la CNIL précisent la mise en œuvre : consultez les [sources](sources.md) avant tout engagement.

- [Comprendre le RGPD](1-Comprendre_le_RGPD.md)
  - Ce qu'est une donnée personnelle, un traitement
  - Responsable de traitement, sous-traitant, responsables conjoints
  - Calendrier, autorité de contrôle, sanctions
  - Liens avec NIS2, ISO 27001 et ISO 27701
- [Principes et bases légales](2-Principes_et_bases_legales.md)
  - Les sept principes de l'article 5
  - Les six bases légales de l'article 6
  - Données sensibles et données d'infraction
  - Durées de conservation
- [Droits des personnes](3-Droits_des_personnes.md)
  - Information des personnes
  - Accès, rectification, effacement, limitation, portabilité, opposition
  - Délai d'un mois, vérification de l'identité, refus motivé
- [Obligations du responsable de traitement](4-Obligations_du_responsable.md)
  - Registre des activités de traitement (article 30)
  - Protection dès la conception et par défaut
  - Analyse d'impact (AIPD)
  - Violations de données : 72 h vers la CNIL
  - Sous-traitants (article 28), transferts hors de l'Union, délégué à la protection des données
- [Sécurité des données et cybersécurité](5-Securite_et_cyber.md)
  - Article 32 : mesures adaptées au risque
  - Une violation de données, un incident NIS2 : deux notifications
  - Correspondance avec ISO 27001, ISO 27701 et les modules WerbSMSI
- [Cas industriels](6-Cas_industriels.md)
  - Badges, vidéosurveillance, biométrie, géolocalisation
  - Identifiants des opérateurs dans la supervision et le MES
  - Télémaintenance, prestataires, données des visiteurs
- [Modèles et check-lists](7-Modeles_et_checklists.md)
  - Fiche du registre, check-list de conformité d'un site
  - Procédure de gestion d'une violation de données
  - Réponse à une demande d'exercice des droits
  - Check-list du contrat de sous-traitance
- [Sources officielles](sources.md)

## En une phrase par acteur

| Vous êtes… | Ce que le RGPD vous demande | Où commencer |
|---|---|---|
| **Direction de l'entité** (responsable de traitement) | Démontrer la conformité (principe de responsabilité) : registre, mesures de sécurité, sous-traitants encadrés, violations traitées, droits respectés | [Obligations du responsable](4-Obligations_du_responsable.md) |
| **Délégué à la protection des données (DPO)** ou référent | Informer, conseiller, contrôler, tenir le registre, être le point de contact de la CNIL et des personnes | [Obligations du responsable](4-Obligations_du_responsable.md) |
| **Responsable de site** | Recenser les traitements locaux (badges, vidéo, RH du site), appliquer les durées de conservation, remonter les violations sans délai | [Cas industriels](6-Cas_industriels.md) |
| **RSSI, informatique, OT** | Sécuriser les données (article 32), détecter et qualifier les violations, appliquer la protection dès la conception aux nouveaux systèmes | [Sécurité et cybersécurité](5-Securite_et_cyber.md) |
| **Achats** | Faire signer un contrat de sous-traitance conforme à l'article 28 à tout prestataire qui accède à des données personnelles | [Modèles et check-lists](7-Modeles_et_checklists.md) |

## Dans WerbSMSI

Le module **WerbRGPD** (rubrique Conformité & exigences, niveau site) tient le registre des traitements du site, le registre des violations avec le délai de 72 h, les demandes d'exercice des droits et les sous-traitants. Il relie chaque traitement aux SI et actifs de **WerbMap** (où sont les données) et aux prestataires de **WerbPresta** (qui y accède).
