<!-- WerbMap – Développé par @WerbHat -->
# Les actifs d'un système et leur rôle — guide du débutant

> **À qui s'adresse ce guide ?** À celles et ceux qui découvrent la cybersécurité : responsable de site, chef de projet, technicien de maintenance, dirigeant. Aucune connaissance technique n'est supposée.
>
> **Ce que vous saurez à la fin** : à quoi sert chaque type d'équipement de l'inventaire WerbMap, lesquels ont **une fonction de sécurité**, et pourquoi **chacun d'eux peut devenir une porte d'entrée**.

---

## 1. Pourquoi tout inventorier ?

Une règle simple guide toute la cybersécurité : **on ne protège pas ce qu'on ne connaît pas.**

Un attaquant ne passe pas forcément par la porte principale. Il cherche l'équipement oublié : la caméra jamais mise à jour, l'onduleur branché au réseau avec son mot de passe d'usine, le PC de maintenance d'un prestataire. L'inventaire de WerbMap (*🗄️ Inventaires* : coffrets, actifs réseau, machines physiques et virtuelles) sert d'abord à cela : **voir tout ce qui est branché**.

Une image pour fixer les idées : votre système d'information est une **ville**.

| Dans la ville | Dans le système |
|---|---|
| Les routes | Les câbles, la fibre, le WiFi |
| Les carrefours | Les commutateurs (switchs) |
| Les péages entre deux villes | Les routeurs |
| La douane | Le pare-feu |
| Les quartiers | Les zones et les VLAN (*🌐 Réseau & adressage*) |
| Les bâtiments | Les serveurs, les postes, les automates |
| Le plan de la ville | WerbMap |

---

## 2. Trois questions à se poser pour chaque actif

Pour chaque équipement de l'inventaire, posez-vous trois questions :

1. **Que fait-il ?** Son rôle métier ou technique.
2. **A-t-il une fonction de sécurité ?** Protège-t-il quelque chose (filtre, contrôle, surveille, sauvegarde) ?
3. **Que se passe-t-il s'il est compromis ?** Ce qu'un attaquant peut en faire.

La troisième question est la plus importante : **un équipement de sécurité reste un équipement**. Un pare-feu a un système, un mot de passe d'administration et des failles à corriger. S'il est mal tenu, il devient la meilleure porte d'entrée, puisqu'il voit passer tout le trafic.

Dans les tableaux ci-dessous, la colonne « Sécurité » indique :

- **Oui** : sa raison d'être est de protéger ;
- **En partie** : il offre des fonctions de sécurité, à condition de les activer et de les régler ;
- **Non** : il ne protège rien par lui-même ; il faut le protéger.

---

## 3. L'infrastructure réseau : les routes et les carrefours

| Type d'actif | Rôle | Sécurité | S'il est compromis |
|---|---|---|---|
| **Commutateur (Switch)** | Relie les équipements d'un même local ou d'une même zone ; aiguille chaque paquet vers le bon port. C'est un **carrefour**. | **En partie** : il sépare les VLAN, peut bloquer un port inutilisé, n'accepter qu'un équipement connu sur une prise (802.1X, sécurité de port), copier le trafic vers une sonde. | L'attaquant voit ou détourne le trafic du quartier, change les VLAN, coupe la production. |
| **Routeur** | Relie des réseaux différents (deux sites, le site et Internet). C'est le **péage** entre deux villes. | **En partie** : listes de contrôle d'accès simples (qui peut passer), mais il ne regarde pas le contenu. | Il redirige le trafic, ouvre un chemin vers un réseau qui devait rester fermé. |
| **Pare-feu** | Contrôle les flux entre zones : qui parle à qui, sur quel port, dans quel sens. C'est le **douanier** (voir le guide suivant). | **Oui** | Règles modifiées en silence : toutes les portes s'ouvrent. Cible de choix des attaquants. |
| **Point d'accès WiFi** | Prolonge le réseau sans fil. | **En partie** : chiffrement (WPA2 / WPA3), réseau invité séparé. | Le réseau « déborde » sur le parking : un attaquant peut se connecter sans entrer dans le bâtiment. |
| **Passerelle** | Traduit d'un protocole ou d'un réseau à l'autre (par exemple d'un bus industriel vers Ethernet, ou d'un équipement vers le cloud du fournisseur). | **Non**, en général. | Pont caché entre deux mondes : souvent oubliée de l'inventaire et de la matrice de flux. |
| **Répartiteur de charge (Load Balancer)** | Répartit les demandes entre plusieurs serveurs pour tenir la charge et la panne d'un serveur. | **En partie** : certains filtrent les attaques web. | Il voit tout le trafic de l'application, souvent déchiffré. |
| **Boîtier d'accès WAN (box)** | Raccorde le site à l'opérateur. | **En partie** : souvent un petit pare-feu, rarement bien réglé. | Accès Internet non maîtrisé, parfois **à côté** du pare-feu principal. |
| **Panneau de brassage** | Passif : regroupe les câbles dans la baie. | **Non** | Rien en soi, mais une prise brassée et oubliée offre un accès physique au réseau. |
| **Commutateur KVM** | Partage un écran, un clavier et une souris entre plusieurs serveurs. | **Non** | Accès direct à la console des serveurs : à garder dans un local fermé. |

> **À retenir** : le switch et le routeur **acheminent** le trafic. Le pare-feu **décide** de ce qui peut passer. Un VLAN sépare les quartiers, mais sans pare-feu entre eux, la circulation reste libre dès qu'un routeur les relie.

---

## 4. Les serveurs et le stockage : les bâtiments administratifs

| Type d'actif | Rôle | Sécurité | S'il est compromis |
|---|---|---|---|
| **Serveur** | Rend un service : annuaire des comptes, fichiers, base de données, application métier, supervision. | **Non** en soi, sauf s'il porte un service de sécurité (annuaire, antivirus central, journaux, sauvegarde). | Dépend du service. Le serveur d'**annuaire** (les comptes et mots de passe de tout le monde) est la **clé de la ville**. |
| **Hyperviseur** | Fait tourner plusieurs serveurs virtuels sur une même machine (*Machines virtuelles* dans WerbMap). | **Non** | Toutes les machines virtuelles qu'il héberge tombent en même temps : chiffrer un hyperviseur, c'est arrêter dix serveurs d'un coup. |
| **NAS (stockage en réseau)** | Partage des fichiers ; sert souvent de cible de sauvegarde. | **En partie** : instantanés (copies figées), droits d'accès. | Les rançongiciels visent les NAS en premier : **des sauvegardes sur un NAS joignable avec le compte de tous ne protègent de rien**. |
| **SAN, baie de stockage** | Stockage partagé à haute performance pour les serveurs et les hyperviseurs. | **En partie** : instantanés, réplication. | Perte ou chiffrement des données de tous les serveurs qui en dépendent. |

---

## 5. Les postes et les mobiles : les habitants

| Type d'actif | Rôle | Sécurité | S'il est compromis |
|---|---|---|---|
| **Ordinateur de bureau, portable, station de travail** | Travail des utilisateurs : messagerie, bureautique, Internet, outils métier. | **Non** : ce sont eux qu'on protège (antivirus, EDR, correctifs). | **Première porte d'entrée** des attaques (pièce jointe piégée, lien, clé USB). Le **portable** circule : il revient au bureau après avoir été branché ailleurs. |
| **Poste d'ingénierie, PC de maintenance** | Programme les automates, configure les équipements industriels. | **Non** | **Le plus sensible du site** : il a le droit de modifier le procédé. Un portable de prestataire branché sans contrôle contourne toutes les protections du réseau. |
| **Client léger** | Simple écran qui affiche une session hébergée sur un serveur. | **En partie** : peu de données en local. | Moins exposé qu'un PC ; le risque se reporte sur le serveur qui héberge les sessions. |
| **Tablette, smartphone** | Mobilité, messagerie, parfois supervision à distance. | **Non** | Perdu ou volé avec une session ouverte : accès direct aux données et parfois au procédé. |

---

## 6. Le monde industriel (OT) : l'usine

L'**OT** (*Operational Technology*) regroupe les équipements qui pilotent le procédé physique : machines, lignes, fluides, énergie. Sa priorité n'est pas la confidentialité mais la **disponibilité et la sûreté** : une machine qui s'arrête coûte cher, une machine qui fait n'importe quoi peut blesser.

| Type d'actif | Rôle | Sécurité | S'il est compromis |
|---|---|---|---|
| **Automate (PLC)** | Le « cerveau » d'une machine : lit les capteurs et commande les actionneurs, en boucle, des milliers de fois par seconde. | **Non** : la plupart des automates n'ont **ni mot de passe solide ni chiffrement**. Ils obéissent à quiconque leur parle dans leur protocole. | Modification de la logique : arrêt, casse, produit non conforme, danger pour les personnes. |
| **Interface Homme-Machine (IHM)** | L'écran tactile de l'opérateur au pied de la machine. | **Non** | L'opérateur voit des valeurs fausses ou envoie des ordres sans le savoir. |
| **Système SCADA** | La supervision : vue d'ensemble de l'usine, alarmes, historiques, commandes à distance. | **Non** | Vue et commande de **tout** le site à la fois. |
| **PC industriel** | Ordinateur durci pour l'atelier, souvent support d'une IHM ou d'un logiciel de supervision. | **Non** | Souvent un système ancien qu'on ne peut plus mettre à jour : à isoler. |
| **Capteur OT, variateur, robot industriel, compteur électrique** | Mesurer, entraîner un moteur, manipuler, compter l'énergie. | **Non** | Mesures faussées, mouvements imprévus, facturation ou pilotage énergétique erronés. |

> **À retenir** : en OT, on **ne peut pas toujours** installer un antivirus, mettre à jour ou redémarrer un équipement. La protection repose alors sur **ce qui l'entoure** : zones séparées, pare-feu entre bureautique et atelier, accès distants maîtrisés, surveillance passive. C'est l'objet de la norme IEC 62443 (module WerbIEC62443) et des zones de WerbMap.

---

## 7. La sûreté et le bâtiment : les gardiens qu'on oublie

| Type d'actif | Rôle | Sécurité | S'il est compromis |
|---|---|---|---|
| **Caméra, NVR, XVR (enregistreurs vidéo)** | Vidéosurveillance et enregistrement. | **Oui pour la sûreté physique**, **non** pour la cybersécurité. | Ironie fréquente : l'équipement de surveillance est **le plus mal protégé** du réseau (mot de passe d'usine, jamais mis à jour). Il sert alors de point d'appui à l'attaquant, ou d'yeux sur le site. |
| **Lecteur de badge, panneau de contrôle d'accès, lecteur biométrique** | Ouvrir les portes aux seules personnes autorisées. | **Oui pour la sûreté physique** | Portes ouvertes à distance, journal des passages effacé, badges ajoutés. |
| **Interphone** | Appel et ouverture à distance. | **Non** | Ouverture de porte, écoute. |
| **Capteur environnemental** | Température, humidité, fumée, fuite d'eau d'un local technique. | **En partie** : il alerte d'un risque physique. | Fausse alarme ou alarme masquée (surchauffe d'une salle serveurs non signalée). |

---

## 8. Les équipements « de tous les jours » : les portes de service

| Type d'actif | Rôle | Sécurité | S'il est compromis |
|---|---|---|---|
| **Onduleur (UPS)** | Tient l'alimentation pendant une coupure et protège des surtensions. | **Oui pour la disponibilité** : il évite l'arrêt brutal. | Sa carte réseau permet de **couper le courant à distance** ou d'empêcher l'arrêt propre des serveurs. |
| **Imprimante** | Imprimer, numériser, parfois envoyer des courriels. | **Non** | Garde en mémoire les documents numérisés ; souvent jamais mise à jour ; point d'appui discret. |
| **Téléphone VoIP** | Téléphonie par le réseau. | **Non** | Écoute, appels frauduleux, accès au réseau par la prise du téléphone. |
| **Affichage dynamique, mur d'images, télévision** | Afficher des informations. | **Non** | Messages détournés ; souvent reliés à Internet par le fournisseur. |
| **Appareil IoT** | Objet connecté (badgeuse, machine à café, capteur de présence…). | **Non** | Fabriqué au moindre coût, rarement mis à jour : la porte de service idéale. |

---

## 9. Ce qu'il faut renseigner dans WerbMap, et pourquoi

| Champ de WerbMap | Pourquoi c'est utile en sécurité |
|---|---|
| **TAG** | Identifier l'actif sans ambiguïté dans tous les modules (risques, tests d'intrusion, sauvegardes, veille). |
| **Type d'actif** | Savoir quel rôle il joue et quelle protection il demande (ce guide). |
| **Marque, modèle, version firmware** | Savoir s'il est touché par une faille publiée : WerbVeille en tire ses **mots-clés** de veille. |
| **Zone, VLAN, adresse IP** | Savoir dans quel quartier il vit, qui peut lui parler, et le placer dans les zones IEC 62443. |
| **Matrice de flux** | Savoir **par où** il communique : chaque ligne est un laissez-passer accordé (voir le guide suivant). |
| **Liste des SI** | Savoir à quoi il sert pour le métier, et donc ce que coûte sa perte (WerbEBIOS, WerbPCR). |

---

## 10. Les pièges les plus fréquents

- **L'équipement oublié** : présent sur le réseau, absent de l'inventaire. Comparez régulièrement le Plan IP aux adresses réellement vues sur le réseau.
- **Le mot de passe d'usine** : caméras, onduleurs, imprimantes, switchs livrés avec `admin / admin`. Changez-le à la mise en service.
- **L'interface d'administration ouverte à tous** : la page de configuration d'un équipement ne doit être joignable que depuis un poste d'administration.
- **Le « provisoire » qui dure** : un accès ouvert pour un dépannage et jamais refermé.
- **L'équipement de sécurité non tenu** : un pare-feu ou une caméra sans mise à jour depuis des années protège moins qu'il n'expose.

---

**Guide suivant** : [Les étages de la cybersécurité : à quoi sert chaque outil](2-Les_etages_de_la_cybersecurite.md) — pare-feu, antivirus, EDR, sauvegardes, surveillance : ce que chacun fait, et surtout ce qu'il **ne fait pas**.
