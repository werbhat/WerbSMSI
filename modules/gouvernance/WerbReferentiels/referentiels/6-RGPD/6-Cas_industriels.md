<!-- WerbReferentiels – Développé par @WerbHat -->
# Cas industriels

Sur un site de production, les données personnelles ne sont pas que dans le logiciel de paie. Voici les traitements qu'on oublie le plus souvent dans le registre, avec les points de vigilance.

## Contrôle d'accès par badge

- **Finalité** : sécurité des personnes et des biens, accès aux zones à risque.
- **Base** : intérêt légitime.
- **Vigilance** : ne pas détourner les passages de badge pour contrôler les horaires sans information spécifique ; conserver les passages **trois mois** ; limiter la consultation au service sécurité.
- **Biométrie** (empreinte, reconnaissance faciale) : donnée sensible ; seulement si une nécessité forte le justifie (zone à risque élevé), sur la base du règlement type de la CNIL, avec gabarit maîtrisé par la personne quand c'est possible, et une **AIPD**.

## Vidéosurveillance

- **Finalité** : sécurité des biens et des personnes, sûreté du site.
- **Vigilance** : ne pas filmer en continu un poste de travail (sauf circonstance particulière : manipulation d'argent, risque spécifique), ni les zones de pause, ni les locaux syndicaux ; panneau d'information ; **un mois** de conservation au plus ; accès nominatif et journalisé aux images ; information et consultation du **CSE**.
- **Caméras sur la voie publique** : relèvent du code de la sécurité intérieure (autorisation préfectorale) ; filmer l'extérieur au minimum.

## Identifiants des opérateurs dans la supervision et le MES

- Les **journaux** d'une supervision ou d'un MES (qui a lancé quelle commande, quand) contiennent des données personnelles dès qu'un compte est nominatif.
- **Finalité** : sécurité, traçabilité des actions sur un procédé critique, qualité.
- **Vigilance** : c'est légitime et souvent nécessaire pour la cybersécurité ; ce qui pose problème, c'est la **réutilisation** pour évaluer la performance individuelle sans information ni consultation. Inscrivez ce traitement au registre et fixez une durée.

## Géolocalisation des véhicules

- **Finalités admises** : sécurité, optimisation des tournées, preuve d'une intervention, suivi du temps de travail quand il ne peut être fait autrement.
- **Vigilance** : pas de géolocalisation hors du temps de travail (bouton de désactivation pour l'usage privé autorisé), pas pour contrôler le respect des limitations de vitesse, pas pour les représentants du personnel dans leur mandat ; **deux mois** de conservation en principe ; AIPD si systématique.

## Télémaintenance et prestataires

- Un intégrateur qui se connecte au serveur de supervision, un éditeur qui assiste à distance le logiciel RH : ce sont des **sous-traitants** dès qu'ils peuvent accéder à des données personnelles.
- **Vigilance** : clause de l'article 28 dans le contrat, accès à la demande et tracés, **transfert hors de l'Union** si le support est assuré depuis un pays tiers.

## Visiteurs, intérimaires, prestataires sur site

- Registre des visiteurs, plan de prévention, habilitations, accueil sécurité : autant de données sur des **personnes extérieures**.
- **Vigilance** : information au registre d'accueil, durée de conservation courte, pas de copie de pièce d'identité conservée sans nécessité.

## Santé et sécurité au travail

- Accidents du travail, aptitudes, expositions (bruit, produits chimiques), habilitations électriques.
- **Vigilance** : les **données de santé** relèvent du médecin du travail ; l'employeur ne connaît que l'**aptitude** ou l'inaptitude, pas le diagnostic. Accès très restreint aux déclarations d'accident.

---

## Les erreurs les plus fréquentes

| Erreur | Ce qu'il faut faire |
|---|---|
| Un registre limité aux traitements RH | Recenser aussi la sûreté (badges, vidéo), l'OT (journaux nominatifs), les visiteurs, les véhicules |
| Des exports Excel conservés indéfiniment sur un partage | Appliquer les durées aux copies ; ranger les exports dans un espace à droits restreints |
| Des comptes génériques partagés sur la supervision | Comptes nominatifs : meilleure sécurité **et** traçabilité légitime ; inscrire le traitement au registre |
| Aucune clause RGPD dans le contrat de télémaintenance | Avenant article 28 ; accès à distance maîtrisés (voir WerbPresta) |
| Un rançongiciel traité seulement comme incident technique | Qualifier aussi la violation de données : 72 h vers la CNIL |
