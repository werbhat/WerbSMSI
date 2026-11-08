<!-- WerbPresta – Développé par @WerbHat -->
# Répondre aux exigences de cybersécurité du client

Ce guide aide un **prestataire** (intégrateur, mainteneur, constructeur, société de services) à répondre au questionnaire de cybersécurité de son client, puis à **mettre en œuvre** les exigences de façon planifiée. Il suit le modèle de questionnaire de WerbPresta : 37 exigences en 13 domaines, inspirées de l'IEC 62443-2-4 (exigences de sécurité pour les prestataires de services des systèmes industriels), de NIS2 et de l'ISO/IEC 27001.

> **Pour l'équipe du site** : remettez ce guide au prestataire avec le questionnaire : dans sa fiche, carte *Cahier d'exigences cyber*, bouton **📘 Guide du prestataire (Word)** (à son nom, exigences de son cahier signalées, sans ces encadrés destinés au site). Vous pouvez aussi le parcourir avec lui lors d'une réunion de lancement. Après l'évaluation, servez-vous du plan de progrès (section 5) pour fixer avec lui les actions des écarts, et suivez-les dans *🤝 Prestataires › Écarts*.

Dans la suite, « **vous** » désigne le prestataire, « **le client** » l'entreprise qui vous confie la prestation.

---

## 1. Pourquoi votre client vous pose ces questions

Une grande partie des attaques contre les sites industriels passe par un tiers : un accès de télémaintenance laissé ouvert, un mot de passe par défaut, une clé USB, le poste d'un intervenant compromis. Votre client a besoin de savoir que vos pratiques ne lui ouvrent pas de porte. Il y est souvent obligé : la directive **NIS2** demande aux entités concernées de maîtriser la sécurité de leur chaîne d'approvisionnement et de leurs prestataires.

Pour vous, c'est aussi un **avantage** : un prestataire qui peut prouver ses bonnes pratiques rassure ses clients, répond plus vite aux appels d'offres et réduit son propre risque (un incident chez un client engage votre responsabilité et votre réputation).

---

## 2. Bien répondre au questionnaire

Pour chaque exigence, vous cochez une réponse et vous indiquez un **commentaire et une preuve**.

| Réponse | Quand la choisir | Ce que vous écrivez |
|---|---|---|
| **Oui** | Vous appliquez l'exigence aujourd'hui, pour toutes vos interventions chez ce client | La preuve : procédure, capture, attestation, extrait de contrat, certificat |
| **Partiel** | Vous l'appliquez en partie (certains intervenants, certains équipements, pas encore systématiquement) | Ce qui est fait, ce qui manque, la mesure prévue et son échéance |
| **Non** | Vous ne l'appliquez pas | La mesure prévue et son échéance, ou une mesure compensatoire |
| **Sans objet** | L'exigence ne concerne pas votre prestation (par exemple, aucun accès à distance) | La raison, en une phrase |

Le client calcule un score : **oui = 1 point, partiel = ½, non = 0** ; « sans objet » n'est pas compté. Repères qu'il utilise : 80 % et plus satisfaisant, 50 à 79 % à améliorer, moins de 50 % insuffisant.

Quelques règles :

- **Un « non » honnête vaut mieux qu'un « oui » sans preuve.** Le client peut vérifier (revue, audit) ; un écart déclaré avec une échéance est un engagement daté, un « oui » démenti est une perte de confiance.
- **Une preuve est un élément vérifiable** : un document daté, une capture de configuration, une attestation de formation, un certificat. « Nous faisons attention » n'est pas une preuve.
- **Ne mettez jamais de mot de passe, de clé ni d'adresse d'accès** dans le questionnaire ou ses pièces jointes.
- **Répondez pour ce client et cette prestation** : décrivez ce que vous faites réellement chez lui, pas une pratique générale.

---

## 3. Les niveaux de maturité de l'IEC 62443-2-4

L'IEC 62443-2-4 décrit la capacité d'un prestataire à tenir ses exigences selon **quatre niveaux de maturité**, issus du modèle CMMI :

| Niveau | Nom | Ce que cela veut dire |
|---|---|---|
| 1 | **Initial** | La pratique existe, mais elle dépend de la personne qui intervient ; elle n'est ni écrite ni vérifiée. |
| 2 | **Maîtrisé** | La pratique est écrite (procédure), les intervenants y sont formés, elle est appliquée. |
| 3 | **Défini** | La pratique est appliquée de la même façon chez tous les clients et sur tous les projets, et vous pouvez le démontrer. |
| 4 | **En amélioration** | La pratique est mesurée et améliorée en continu (indicateurs, retours d'expérience). |

Pour vos réponses : un **« oui »** solide suppose au moins le niveau 2 (une pratique écrite et appliquée) ; une pratique de niveau 1 est souvent un **« partiel »**.

### Une mise en œuvre en quatre paliers

Pour planifier le travail, WerbPresta propose de regrouper les 37 exigences en **quatre paliers**, du plus urgent et du moins coûteux au plus exigeant. C'est une proposition d'ordre de travail, pas une exigence de la norme.

| Palier | Objectif | Exigences |
|---|---|---|
| **1. Les fondamentaux** | Ne pas ouvrir de porte : personnes identifiées, aucun ajout sans accord, mots de passe maîtrisés, incidents signalés | ORG-01, ORG-02, ORG-03, ARC-01, WIF-01, CPT-01, CPT-02, CPT-03, MAL-01, INC-01, FIN-01, FIN-02 |
| **2. Intervenir en sécurité** | Accès à distance, supports et configurations sous contrôle | ARC-02, ARC-03, ARC-04, MAL-02, CPT-04, CFG-01, CFG-02, INC-02, FIN-03 |
| **3. Livrer sûr et documenté** | Ce que vous livrez est documenté, journalisé, maintenable et restaurable | ASS-01, ASS-02, JRN-01, COR-01, SAV-01 |
| **4. Niveau renforcé** | Exigences demandées quand l'accès à distance ou la criticité du périmètre le justifient | ORG-04, ASS-03, ARC-05, WIF-02, SIS-01, CFG-03, JRN-02, CPT-05, MAL-03, COR-02, SAV-02 |

Les paliers 1 à 3 couvrent les **26 exigences essentielles** ; le palier 4 couvre les **11 exigences renforcées**. Le niveau d'exigence demandé par le client (essentiel ou renforcé) figure dans le cahier d'exigences qu'il vous a remis.

---

## 4. Exigence par exigence : comment y arriver

Pour chaque domaine : ce qu'il faut mettre en place, et la preuve à joindre à votre réponse. Les conditions entre parenthèses (*si accès à distance*…) indiquent qu'une exigence ne s'applique que dans cette situation.

### ORG — Organisation et personnel

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **ORG-01** Un référent sécurité | Nommez une personne (et un suppléant) qui répond aux questions de sécurité du client ; donnez-lui le temps de le faire. | Nom, fonction et coordonnées du référent dans votre réponse |
| **ORG-02** Intervenants désignés, formés, informés | Tenez la liste des intervenants affectés au client ; faites-leur suivre une sensibilisation à la cybersécurité industrielle (une demi-journée suffit pour commencer) ; transmettez-leur les règles du site avant la première intervention. | Liste nominative, attestations de formation, accusé de lecture des règles du site |
| **ORG-03** Arrivées et départs signalés | Prévenez le client dès qu'un intervenant rejoint ou quitte l'équipe, le jour même, pour qu'il ouvre ou ferme ses accès. Mettez-le dans votre procédure de départ. | Procédure de départ, exemple de message envoyé |
| **ORG-04** Liste des intervenants habilités *(renforcé)* | Tenez la liste à jour (nom, rôle, date d'habilitation, accès détenus) et revoyez-la au moins une fois par an. | Liste datée |

### ASS — Assurance et documentation

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **ASS-01** Documentation de sécurité à la livraison | Livrez avec chaque installation ou modification : schéma d'architecture, flux réseau, comptes créés (sans mot de passe), configuration de sécurité. Un modèle de dossier réutilisable vous fera gagner du temps. | Exemple de dossier de livraison |
| **ASS-02** Vulnérabilités connues signalées | Suivez les avis de sécurité des fabricants des produits que vous livrez ; informez le client des vulnérabilités qui le concernent et des mesures de contournement. | Procédure de veille, exemple d'avis transmis |
| **ASS-03** Votre dispositif de sécurité *(renforcé)* | Décrivez votre politique de sécurité, vos certifications éventuelles (ISO/IEC 27001, IEC 62443-2-4) ou un **plan d'assurance sécurité** ; acceptez une revue ou un audit du client. | Plan d'assurance sécurité, certificats |

### ARC — Architecture et accès à distance

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **ARC-01** Rien ajouté sans accord écrit | Avant tout ajout d'équipement communicant, de câble ou de flux : demande écrite au client, réponse écrite avant l'intervention ; documentez la modification. | Procédure, exemple de demande et d'accord |
| **ARC-02** Accès à distance par le moyen du client *(si accès à distance)* | Utilisez exclusivement le bastion ou le VPN fourni ou validé par le client ; n'installez jamais de modem, routeur 4G ou logiciel de prise de main à distance sans son accord écrit. | Engagement écrit, liste des moyens d'accès utilisés |
| **ARC-03** Accès ouvert à la demande, puis fermé *(si accès à distance)* | Demandez l'ouverture pour chaque intervention, avec sa durée ; vérifiez la fermeture à la fin ; tenez votre propre registre des connexions. | Registre des connexions, exemple de demande |
| **ARC-04** Double authentification, intervenants désignés *(si accès à distance)* | Activez la double authentification sur tous les comptes d'accès à distance ; un compte par intervenant désigné, jamais de compte partagé. | Capture de configuration, liste des comptes |
| **ARC-05** Poste d'intervention maîtrisé *(renforcé, si accès à distance)* | Postes professionnels gérés par vous : système et logiciels à jour, protection contre les logiciels malveillants, chiffrement du disque, pas d'usage personnel. | Politique de gestion des postes, rapport de conformité |

### WIF — Liaisons sans fil

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **WIF-01** Aucun sans-fil sans accord | N'ajoutez ni n'activez aucun point d'accès, module sans fil ou passerelle cellulaire sans accord écrit ; vérifiez que les équipements livrés n'ont pas de sans-fil actif par défaut. | Procédure, liste des équipements livrés avec leur état sans fil |
| **WIF-02** Sans-fil chiffré et séparé *(renforcé)* | Liaisons autorisées chiffrées (WPA2-Entreprise ou WPA3 au minimum) et séparées du réseau industriel par un pare-feu. | Configuration, schéma |

### SIS — Systèmes instrumentés de sécurité

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **SIS-01** Fonctions de sûreté séparées *(renforcé)* | Ne mélangez pas les fonctions de sûreté (arrêts d'urgence, protections) avec les autres fonctions ; n'intervenez dessus qu'avec la procédure validée par le client et dans le respect de la sécurité fonctionnelle. | Architecture, procédure d'intervention sur les fonctions de sûreté |

### CFG — Gestion de configuration

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **CFG-01** Configurations sauvegardées, versionnées, remises | Après chaque intervention, sauvegardez programmes et configurations, numérotez la version, remettez une copie au client. | Exemple de remise (version, date, empreinte du fichier) |
| **CFG-02** Durcissement | Désactivez services, ports et comptes inutiles avant la livraison ; appliquez une liste de contrôle par type d'équipement. | Listes de contrôle remplies |
| **CFG-03** Modifications tracées et autorisées *(renforcé)* | Tracez chaque modification (date, intervenant, motif, équipement) ; demandez l'accord préalable du client, sauf urgence documentée a posteriori. | Registre des modifications |

### JRN — Journalisation et événements

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **JRN-01** Journaux activés et accessibles | Activez les journaux de sécurité des équipements livrés (connexions, modifications, erreurs) et indiquez au client comment les consulter ou les collecter. | Configuration, note de livraison |
| **JRN-02** Événements constatés transmis *(renforcé)* | Signalez au client tout événement de sécurité constaté pendant vos interventions (connexion inconnue, fichier suspect, configuration modifiée). | Procédure, exemple de signalement |

### CPT — Comptes et mots de passe

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **CPT-01** Pas de mot de passe par défaut ni commun | Changez tous les mots de passe par défaut ; générez un mot de passe unique par équipement et par client avec un gestionnaire de mots de passe. | Procédure de mise en service, capture de la politique de mots de passe |
| **CPT-02** Comptes nominatifs | Un compte par intervenant, à son nom ; aucun compte d'équipe partagé. | Liste des comptes |
| **CPT-03** Identifiants remis par un canal sûr | Jamais de mot de passe en clair par courriel : remise en main propre sous enveloppe, coffre-fort partagé ou deux canaux séparés ; rappelez au client de changer les mots de passe d'administration après la réception. | Procédure de remise |
| **CPT-04** Pas de copie sans besoin, coffre-fort chiffré | Ne gardez les mots de passe du client que si c'est nécessaire et écrit ; dans ce cas, dans un coffre-fort chiffré accessible aux seuls intervenants désignés. | Description du coffre-fort, liste des accès |
| **CPT-05** Moindre privilège, revue annuelle *(renforcé, si privilèges d'administration)* | Demandez seulement les droits nécessaires à la prestation ; revoyez-les avec le client au moins une fois par an. | Compte rendu de revue des droits |

### MAL — Logiciels malveillants et supports amovibles

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **MAL-01** Postes protégés et à jour | Protection contre les logiciels malveillants active et à jour, correctifs du système appliqués sur tous les postes d'intervention. | Rapport de la console d'administration |
| **MAL-02** Supports contrôlés *(si supports amovibles)* | Passez chaque clé ou disque à la station de décontamination du client avant tout branchement ; préférez des supports dédiés au client. | Engagement, consigne remise aux intervenants |
| **MAL-03** Livrables contrôlés et vérifiables *(renforcé)* | Analysez les fichiers et logiciels avant installation ; fournissez leur empreinte (SHA-256) ou une signature pour que le client vérifie leur intégrité. | Exemple d'empreinte fournie |

### COR — Correctifs de sécurité

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **COR-01** Correctifs applicables signalés | Suivez les correctifs publiés par les fabricants ; indiquez au client ceux qui s'appliquent et leur compatibilité qualifiée avec ses installations. | Exemple de bulletin transmis |
| **COR-02** Calendrier ou mesures compensatoires *(renforcé)* | Proposez un calendrier d'application (souvent aux arrêts programmés) ou, si un correctif ne peut pas être appliqué, des mesures compensatoires (filtrage, isolement, surveillance). | Plan de correctifs |

### SAV — Sauvegarde et restauration

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **SAV-01** Procédures de sauvegarde et de restauration fournies | Livrez une procédure écrite, testée, pour sauvegarder et restaurer chaque système livré. | Procédure |
| **SAV-02** Restauration testée à la réception *(renforcé)* | Faites un essai de restauration lors de la réception, avec le client, et consignez le résultat. | Procès-verbal d'essai |

### INC — Incidents de sécurité

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **INC-01** Incident signalé sous 24 heures | Prévenez le client sans délai, au plus tard sous 24 heures, de tout incident chez vous qui peut le toucher : poste volé, fuite, intrusion, compte compromis. Ayez la liste des contacts de vos clients prête. | Procédure de gestion des incidents, liste des contacts |
| **INC-02** Coopération à l'analyse | Fournissez les informations utiles (journaux, chronologie, intervenants) et participez à la résolution. | Engagement, exemple de retour d'expérience |

### FIN — Sous-traitance et fin de contrat

| Exigence | Comment y arriver | Preuve |
|---|---|---|
| **FIN-01** Sous-traitance autorisée et exigences répercutées | Demandez l'accord du client avant de sous-traiter ; reportez ces exigences dans le contrat de votre sous-traitant. | Clause contractuelle |
| **FIN-02** Restitution et destruction attestées | En fin de contrat : restituez ou détruisez les informations et secrets du client, rendez les accès, et attestez-le par écrit. | Modèle d'attestation de fin de contrat |
| **FIN-03** Données personnelles encadrées *(si données personnelles)* | Signez avec le client un contrat de sous-traitance conforme à l'article 28 du RGPD (objet, durée, mesures de sécurité, sous-traitants ultérieurs, fin du traitement). | Contrat de sous-traitance RGPD |

---

## 5. Établir votre plan d'actions

Après l'évaluation, le client vous transmet son rapport et la liste des **écarts** (réponses « partiel » ou « non »). Pour chacun, proposez une action datée :

| Écart | Action proposée | Responsable | Échéance | Preuve attendue |
|---|---|---|---|---|
| ARC-04 : double authentification absente sur le VPN | Activer la double authentification pour les 4 intervenants | Référent sécurité | Fin du mois prochain | Capture de configuration |
| CFG-02 : pas de durcissement systématique | Rédiger une liste de contrôle par type d'automate et l'appliquer aux prochaines livraisons | Responsable technique | 3 mois | Listes de contrôle remplies |

Pour prioriser :

1. **D'abord le palier 1**, puis les exigences qui ferment des accès (ARC, CPT) : ce sont les écarts les plus exploités par les attaquants, et souvent les moins coûteux à corriger.
2. **Écrivez ce que vous faites déjà** : beaucoup de « partiel » deviennent des « oui » dès que la pratique est décrite dans une procédure et que les intervenants y sont formés (passage au niveau de maturité 2).
3. **Généralisez** : appliquez la même pratique chez tous vos clients (niveau 3) ; c'est plus simple à tenir qu'une pratique par client.
4. **Faites le point** avec le client à chaque échéance, puis lors de l'évaluation suivante (au moins une fois par an).

---

## 6. Ressources utiles

- **Guide d'hygiène informatique** de l'ANSSI : les mesures de base d'une organisation, sur https://cyber.gouv.fr
- **La cybersécurité des systèmes industriels** (ANSSI) : méthode de classification et mesures principales, mesures détaillées, sur https://cyber.gouv.fr
- **Cybermalveillance.gouv.fr** : sensibilisation, fiches pratiques et assistance pour les petites entreprises
- **Guide du sous-traitant** de la CNIL : obligations RGPD d'un sous-traitant, sur https://www.cnil.fr
- **IEC 62443-2-4** : exigences de sécurité pour les prestataires de services des systèmes industriels, avec leurs niveaux de maturité ; une certification est possible
- **ISO/IEC 27001** : système de management de la sécurité de l'information, certifiable

Pour l'équipe du site : la méthode d'évaluation est dans le guide [Établir le cahier d'exigences cyber d'un prestataire](2-Etablir_le_cahier_d_exigences.md).
