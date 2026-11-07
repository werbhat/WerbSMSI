<!-- WerbReferentiels – Développé par @WerbHat -->
# Comprendre le RGPD

## Pourquoi ce règlement

Le RGPD protège les **personnes** : leur droit à la vie privée et à la maîtrise de ce qu'on sait d'elles. Il ne protège pas les entreprises ni les systèmes ; c'est la différence avec NIS2. Mais une donnée personnelle mal protégée est un risque pour la personne **et** pour l'entreprise : sanction, atteinte à l'image, conflit social.

C'est un **règlement** européen : il s'applique directement dans tous les États membres depuis le **25 mai 2018**. En France, la loi « Informatique et Libertés » de 1978, modifiée en 2018, le complète sur les points laissés aux États (âge du consentement des mineurs, données de santé, etc.).

---

## Les mots à connaître

| Terme | Définition | Exemple industriel |
|---|---|---|
| **Donnée personnelle** | Toute information se rapportant à une personne physique identifiée ou identifiable, directement (nom) ou indirectement (numéro, identifiant, image, voix, combinaison d'éléments) | Nom d'un opérateur, numéro de badge, plaque d'immatriculation, image de caméra, identifiant de connexion à la supervision, adresse IP d'un poste attribué |
| **Traitement** | Toute opération sur ces données : collecte, enregistrement, consultation, modification, transmission, conservation, effacement | Enregistrer les passages de badge, conserver les images de vidéosurveillance, tracer les actions des opérateurs |
| **Responsable de traitement** | Celui qui décide des **finalités** (pourquoi) et des **moyens essentiels** (comment) | L'entité juridique qui exploite l'usine |
| **Sous-traitant** | Celui qui traite les données **pour le compte** du responsable, sur ses instructions | Société de gardiennage, éditeur du logiciel de paie en SaaS, prestataire de télémaintenance qui accède à un serveur contenant des données |
| **Responsables conjoints** | Deux organismes qui décident ensemble des finalités et des moyens | Une maison mère et sa filiale qui partagent un annuaire commun et en fixent ensemble l'usage |
| **Destinataire** | Celui qui reçoit communication des données | Le service paie du groupe, un organisme social |
| **Personne concernée** | La personne dont les données sont traitées | Salariés, intérimaires, visiteurs, prestataires, clients |

> Une donnée **pseudonymisée** (identifiant à la place du nom, avec une table de correspondance quelque part) **reste** une donnée personnelle. Seule une donnée réellement **anonymisée**, sans retour possible à la personne, sort du RGPD.

---

## Qui contrôle, et quelles sanctions

En France, l'autorité de contrôle est la **CNIL**. Elle conseille, reçoit les plaintes et les notifications de violation, contrôle (sur place, en ligne, sur pièces) et sanctionne.

| Manquement | Amende administrative maximale |
|---|---|
| Principes (article 5), bases légales (article 6), conditions du consentement, données sensibles, droits des personnes, transferts hors de l'Union | **20 M€ ou 4 % du chiffre d'affaires annuel mondial**, le montant le plus élevé étant retenu |
| Obligations du responsable et du sous-traitant : protection dès la conception, registre, sécurité, notification des violations, AIPD, DPO, contrat de sous-traitance | **10 M€ ou 2 % du chiffre d'affaires annuel mondial** |

S'y ajoutent les mises en demeure publiques, les injonctions sous astreinte, les actions des personnes (réparation du préjudice) et, en droit français, des sanctions pénales.

---

## Le principe qui change tout : la responsabilité

Avant 2018, on déclarait les fichiers à la CNIL. Depuis le RGPD, il n'y a plus de déclaration : le responsable doit **être conforme et pouvoir le démontrer à tout moment** (article 5.2, « accountability »). Concrètement, la preuve, c'est de la documentation tenue à jour :

- le **registre des activités de traitement** ;
- les **analyses d'impact** (AIPD) des traitements à risque ;
- les **contrats** avec les sous-traitants ;
- le **registre des violations**, y compris celles qui n'ont pas été notifiées ;
- les **demandes d'exercice des droits** et les réponses apportées ;
- les **mentions d'information** et, le cas échéant, les preuves du consentement ;
- les **mesures de sécurité** (politique, procédures, résultats de tests).

C'est exactement la logique d'un SMSI : on documente, on applique, on vérifie.

---

## Liens avec les autres référentiels

| Référentiel | Ce qu'il apporte au RGPD |
|---|---|
| **NIS2** | Mesures de sécurité des systèmes (article 21) qui couvrent l'essentiel de l'article 32 du RGPD ; un même incident peut être à la fois une violation RGPD (CNIL, 72 h) et un incident NIS2 (ANSSI, 24 h puis 72 h) : voir [Sécurité et cybersécurité](5-Securite_et_cyber.md) |
| **ISO/IEC 27001** | Le SMSI fournit le cadre des mesures de sécurité ; la mesure A.5.34 (vie privée et protection des données à caractère personnel) renvoie aux obligations légales |
| **ISO/IEC 27701** | Extension de 27001 et 27002 pour la protection de la vie privée : exigences pour le responsable et le sous-traitant, correspondance avec le RGPD |
| **ANSSI** | Le guide d'hygiène informatique et les guides techniques fournissent les mesures concrètes de sécurité |
| **CNIL** | Guide de la sécurité des données personnelles, référentiels sectoriels (gestion du personnel, contrôle d'accès, vidéoprotection…), modèle de registre, outil PIA pour les AIPD |
