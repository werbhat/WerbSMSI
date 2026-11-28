<!-- WerbSMSI – Développé par @WerbHat : guide de l'assistant IA optionnel (charte §5.12) -->
# L'assistant IA (optionnel)

WerbSMSI fonctionne **complet sans intelligence artificielle**. L'assistant IA est un complément facultatif, **WerbSMSI.AI**, livré séparément : il répond aux questions sur la démarche SMSI, les modules WerbSMSI et les référentiels (NIS2, EBIOS RM, ISO 27001, IEC 62443, RGPD…), **en citant ses sources**. Il fonctionne sur un poste ou un serveur de l'organisation : **aucune donnée ne quitte l'organisation**.

> Sans installation ni déclaration, rien ne change : le portail n'affiche aucun élément de l'assistant et n'envoie **aucune requête**.

## 1. Ce que fait l'assistant, et ce qu'il ne fait pas

| Il fait | Il ne fait pas |
|---|---|
| Expliquer une mesure NIS2, un atelier EBIOS RM, une exigence IEC 62443, un écran d'un module | Décider à votre place, coter une mesure, valider un risque |
| Lire les synthèses publiées de vos sites (NIS2, SI, risques, actifs…) | Lire un site hors de vos droits, ou modifier une donnée |
| Citer la source de chaque réponse : `[NIS2 1.1-EI/EE]`, `[Guide WerbMap › Les mots de passe]` | Inventer : s'il ne trouve pas, il le dit (« je ne trouve pas cette information dans la documentation ») |
| Guider une démarche pas à pas (bouton **M'accompagner**) | Modifier vos bases : vous saisissez vous-même dans les modules |
| Répondre selon vos droits : il ne s'appuie que sur ce que votre compte peut voir | Donner un avis juridique |

Toute réponse porte la mention **« Réponse générée par une IA locale, à vérifier »**.

## 2. Les trois conditions pour qu'il apparaisse

1. **Le kit est installé** sur un poste ou un serveur de l'organisation (dépôt `WerbSMSI_AI`, procédure dans son README) : passerelle sécurisée, modèle de langage local, index de la documentation WerbSMSI.
2. **Il est déclaré dans l'espace** par un administrateur du groupe : *⚙️ Administration › Assistant IA*.
3. **Il répond et prouve son identité** à l'ouverture de l'espace : le portail vérifie qu'il parle bien à la passerelle déclarée.

| Bouton en bas à droite | Signification |
|---|---|
| (aucun) | Assistant non déclaré, désactivé, ou réservé à d'autres sites |
| 🤖 **Assistant** | Prêt |
| 🤖 Indisponible | Déclaré mais injoignable (arrêté, réseau) : le reste du portail fonctionne normalement |
| 🤖 Identité refusée | La passerelle ne détient pas la clé déclarée : **aucune question ne lui est envoyée**. Prévenez l'administrateur du groupe |

## 3. Déclarer l'assistant (administrateur du groupe)

*⚙️ Administration › Assistant IA* :

1. Sur le système IA, lancer `python outils/identite.py voir` : il affiche la **clé publique** de la passerelle et son **empreinte**.
2. Coller la clé dans le champ *Clé publique* ; le portail calcule l'**empreinte** : elle doit être **identique** à celle affichée sur le système IA.
3. Choisir l'**adresse** : `https://127.0.0.1:8443` (l'assistant tourne sur le poste même) ou `https://werbsmsi-ai.interne:8443` (serveur de l'îlot ; ce nom doit pointer vers lui). Aucune autre adresse n'est possible.
4. Cocher les **sites pilotes** pour limiter l'assistant à certains sites (aucun coché : tous les sites).
5. **Tester la passerelle**, puis **Enregistrer la déclaration**. Le fichier `werbsmsi.ia.json` est écrit à la racine de l'espace, avec un journal des modifications ; il faut le droit d'écriture sur cette racine (équipe SMSI du groupe).

Chaque poste qui utilise l'assistant doit **approuver le certificat de l'autorité interne** du système IA (fichier `ac_werbsmsi_ai.crt`, commande indiquée lors de l'installation du kit), sans quoi Edge refuse la connexion et le bouton affiche « Indisponible ».

Pour **arrêter** l'assistant : décocher *Assistant activé* et enregistrer. Le portail redevient exactement tel qu'il est sans IA.

## 4. Utiliser le panneau

- **🤖 Assistant** ouvre le panneau. Des **questions suggérées** et, sur certains écrans, une **démarche guidée** (*M'accompagner*) sont proposées.
- Posez votre question (Entrée pour envoyer, Maj + Entrée pour aller à la ligne). La réponse s'affiche au fil de l'eau ; **■ Arrêter** l'interrompt.
- **Sources** : dépliez la liste sous la réponse (étiquette, version, niveau de confiance des documents externes).
- **Données de vos sites** (portail 1.26.0) : l'assistant peut lire, en **lecture seule**, ce que les modules publient pour un site que **votre compte voit** : synthèse NIS2, systèmes d'information, difficultés de mise à jour, risques, actifs, remédiations, veille. Exemple : « Quels sont les systèmes d'information de LYON ? ». La lecture se fait dans le portail ; la ligne **🔎 Données consultées** sous la réponse indique ce qui a été lu. Il ne modifie jamais rien, et un site hors de vos droits n'est ni lu ni cité.
- **👍 / 👎** : votre avis aide à compléter la documentation (l'équipe SMSI voit les questions restées sans réponse).
- **↺** démarre une nouvelle conversation. La conversation n'est **jamais enregistrée** : elle s'efface à la déconnexion.

## 5. Sécurité, en bref

- Le portail ne peut joindre que **deux adresses fixes**, inscrites dans sa politique de sécurité : aucune autre connexion n'est possible.
- Avant toute question, il vérifie l'**identité** de la passerelle avec la clé déclarée par le groupe.
- La passerelle relit **vos droits** à chaque question : un compte d'un site ne reçoit jamais d'information d'un autre site.
- Les réponses s'affichent en **texte simple** : ni lien, ni image, ni contenu actif.
- Détails : charte §5.12 et documentation de WerbSMSI.AI.
