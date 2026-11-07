<!-- WerbMap – Développé par @WerbHat -->
# Les étages de la cybersécurité : à quoi sert chaque outil

> **Objectif** : comprendre ce que fait **vraiment** chaque outil de sécurité (pare-feu, antivirus, EDR, VPN, sauvegardes, SIEM…) et, surtout, **ce qu'il ne fait pas**. La plupart des incidents graves arrivent dans un « angle mort » entre deux outils que l'on croyait suffisants.
>
> Prérequis : [Les actifs d'un système et leur rôle](1-Les_actifs_et_leur_role.md).

---

## 1. Le principe : la défense en profondeur

Pensez à un **château fort**. Il n'a pas qu'un mur : des douves, un pont-levis, des remparts, des gardes à chaque porte, des guetteurs dans les tours, un donjon où l'on se replie, des réserves pour tenir un siège. Aucune de ces protections ne suffit seule ; ensemble, elles obligent l'assaillant à franchir **plusieurs obstacles**, ce qui laisse le temps de le **voir** et de **réagir**.

La cybersécurité fonctionne de la même façon, par **étages** :

| Étage | Question | Exemples d'outils |
|---|---|---|
| 0. Gouvernance et humain | Qui décide, qui fait quoi, chacun sait-il réagir ? | Politique, sensibilisation, procédures (WerbSMSI) |
| 1. Connaître | Qu'avons-nous à protéger ? | Inventaire, cartographie (WerbMap) |
| 2. Cloisonner le réseau | Qui peut parler à qui ? | Pare-feu, segmentation, DMZ, diode, VPN, NAC |
| 3. Contrôler les identités | Qui est qui, et qui a le droit de faire quoi ? | Annuaire, MFA, bastion d'administration |
| 4. Protéger les machines | La machine résiste-t-elle à une attaque ? | Durcissement, correctifs, antivirus, EDR, liste blanche |
| 5. Protéger les données | Peut-on perdre, voler ou chiffrer nos données ? | Sauvegardes, chiffrement |
| 6. Détecter | Verrons-nous l'attaque ? | Journaux, SIEM, SOC, sonde réseau OT |
| 7. Répondre et reprendre | Saurons-nous réagir et redémarrer ? | Plan de réponse, PCI / PRI (WerbPCR), exercices |
| Transverse | Où sont nos faiblesses ? | Veille (WerbVeille), audit, test d'intrusion (WerbPentest) |

Pour chaque outil ci-dessous : **ce qu'il fait**, **ce qu'il ne fait pas**, et une **image** pour s'en souvenir.

---

## 2. Étage 0 — La gouvernance et l'humain

Avant tout outil : des règles, des rôles et des personnes formées. La majorité des attaques commencent par **une personne trompée** (courriel piégé, faux appel du support, clé USB trouvée sur le parking).

- **Ce que ça fait** : chacun sait ce qui est permis, à qui signaler un doute, comment réagir.
- **Ce que ça ne fait pas** : empêcher toute erreur. On sensibilise pour **réduire** le nombre de clics malheureux et pour que le signalement soit **rapide**, pas pour atteindre le zéro faute.
- **L'image** : le **code de la route**. Il ne supprime pas les accidents, mais sans lui, rien d'autre ne fonctionne.

---

## 3. Étage 1 — Connaître

- **Ce que ça fait** : l'inventaire et la cartographie (WerbMap) disent ce qui existe, où, qui en est responsable, et comment c'est relié.
- **Ce que ça ne fait pas** : protéger. Une carte n'arrête personne ; mais **sans carte, on ne sait pas où mettre les gardes**, ni quoi vérifier quand une faille est publiée.
- **L'image** : le **plan du château**. Les assaillants l'étudient ; les défenseurs doivent le connaître mieux qu'eux.

---

## 4. Étage 2 — Cloisonner le réseau

### Le pare-feu : un douanier

Le pare-feu se place **entre deux zones** (Internet et le site, la bureautique et l'atelier) et applique une liste de règles : « tel poste peut parler à tel serveur, sur tel port, dans tel sens ». Tout le reste est refusé.

- **Ce qu'il fait** : il contrôle **les passages** à la frontière. Il vérifie les « papiers » de chaque flux (origine, destination, port, protocole) et refuse ce qui n'est pas prévu.
- **Ce qu'il ne fait pas** :
  - **Il ne surveille que ce qu'on lui demande de surveiller.** Un douanier applique la liste qu'on lui a donnée : si la liste dit « les camions de livraison passent », il laisse passer les camions de livraison, sans regarder ce qu'il y a dedans.
  - **Un flux autorisé reste un chemin pour l'attaquant.** Si le pare-feu autorise le bureau d'études à prendre la main à distance sur le poste d'ingénierie, un attaquant qui a pris le contrôle d'un poste du bureau d'études **utilisera ce même flux** pour se cacher : pour le pare-feu, c'est un passage normal.
  - Il ne voit **rien de ce qui se passe à l'intérieur d'une même zone** : deux machines du même quartier se parlent sans passer par la douane.
  - Il ne voit **pas le contenu chiffré** (la plupart du trafic aujourd'hui), sauf s'il le déchiffre, ce qui demande un réglage particulier.
  - Il ne protège **pas ce qui le contourne** : un modem 4G branché sur un automate par un prestataire, un portable passé d'une zone à l'autre, une clé USB.
- **L'image** : **un douanier**. Il contrôle les papiers à la frontière ; il ne fouille pas chaque valise, il ne voit pas ce qui passe par la forêt, et il laisse entrer quiconque présente un laissez-passer valide, même volé.

> **Lien avec WerbMap** : chaque ligne de la **Matrice de flux** (*🔀 Routage & filtrage*) est un **laissez-passer** accordé. Plus il y en a, plus il y a de chemins. Pour chaque flux : qui l'a demandé, pourquoi, et faut-il le garder ? Un flux « provisoire » jamais refermé est une porte laissée ouverte.

**Pare-feu « nouvelle génération » (NGFW)** : il reconnaît aussi l'application (pas seulement le port), peut inspecter le contenu et bloquer des attaques connues. C'est un douanier qui **ouvre certaines valises** et connaît le signalement de certains contrebandiers. Il reste aveugle à ce qui est nouveau, bien déguisé, ou chiffré sans réglage.

### La segmentation (zones, VLAN) : des cloisons étanches

- **Ce qu'elle fait** : découper le réseau en zones (bureautique, supervision, atelier, sûreté…) pour qu'un incident dans l'une ne se propage pas aux autres.
- **Ce qu'elle ne fait pas** : un **VLAN seul n'est pas une protection**. Il sépare les quartiers, mais dès qu'un routeur ou un switch les relie sans pare-feu, la circulation est libre. La segmentation protège **si et seulement si** un contrôle (pare-feu) se tient entre les zones.
- **L'image** : les **cloisons étanches d'un navire**. Une voie d'eau reste dans un compartiment… à condition que les portes entre compartiments soient fermées.

### La DMZ : le hall d'accueil

- **Ce qu'elle fait** : une zone tampon où l'on place ce qui doit être joignable de l'extérieur (serveur de mise à jour, serveur de fichiers d'échange, rebond d'accès distant). L'extérieur parle à la DMZ, la DMZ parle à l'intérieur ; **jamais l'extérieur directement à l'intérieur**.
- **Ce qu'elle ne fait pas** : protéger un serveur de la DMZ mal tenu. S'il est compromis, il sert de tremplin.
- **L'image** : le **hall d'accueil** d'une entreprise. Les visiteurs y entrent, les bureaux restent fermés.

### La diode de données : un clapet anti-retour

- **Ce qu'elle fait** : laisser passer l'information **dans un seul sens**, physiquement (par exemple de l'atelier vers la bureautique pour remonter des mesures). Rien ne peut revenir.
- **Ce qu'elle ne fait pas** : permettre une commande ou une mise à jour à distance, puisque rien ne remonte ; elle ne vérifie pas non plus le contenu de ce qui sort.
- **L'image** : un **clapet anti-retour** sur une canalisation.

### Le VPN : un tunnel blindé

- **Ce qu'il fait** : il chiffre la communication entre deux points (un télétravailleur et le site, deux sites entre eux). Personne sur le trajet ne peut lire ni modifier ce qui passe.
- **Ce qu'il ne fait pas** :
  - Il ne vérifie **pas ce que transporte** le tunnel : un poste infecté envoie son infection, chiffrée, jusqu'au cœur du réseau.
  - Il ne garantit **pas que la personne au bout est la bonne** : un mot de passe VPN volé ouvre le tunnel à l'attaquant (d'où la MFA, étage 3).
  - Une fois le tunnel ouvert, l'utilisateur est **dans le réseau** : s'il voit tout, l'attaquant aussi.
- **L'image** : un **convoi blindé**. Rien ne peut être volé pendant le trajet ; mais si l'on charge une bombe au départ, le convoi la livre en toute sécurité.

### Le contrôle d'accès au réseau (NAC, 802.1X) : le vigile à la prise

- **Ce qu'il fait** : il n'autorise sur une prise réseau ou sur le WiFi que les équipements connus, et place chacun dans sa zone.
- **Ce qu'il ne fait pas** : vérifier qu'un équipement **connu** n'est pas infecté, ni ce qu'il fait une fois connecté.
- **L'image** : le **vigile à l'entrée du parking** qui ne laisse entrer que les véhicules badgés, sans vérifier l'état du conducteur.

---

## 5. Étage 3 — Contrôler les identités

### L'annuaire des comptes : le registre des clés

- **Ce qu'il fait** : il tient la liste des personnes et des comptes, leurs mots de passe et leurs droits, pour tout le système.
- **Ce qu'il ne fait pas** : distinguer un utilisateur légitime d'un attaquant qui a **volé son mot de passe**. Pour l'annuaire, le bon mot de passe = la bonne personne.
- **L'image** : le **registre des clés** du gardien. Qui le contrôle peut fabriquer toutes les clés : c'est pourquoi l'annuaire est la cible n°1 des rançongiciels.

### La double authentification (MFA) : une deuxième serrure

- **Ce qu'elle fait** : en plus du mot de passe, elle demande une preuve que l'on **possède** (téléphone, clé physique). Un mot de passe volé ne suffit plus.
- **Ce qu'elle ne fait pas** :
  - Elle ne résiste pas à l'utilisateur qui **valide une demande qu'il n'a pas faite** (l'attaquant envoie des notifications jusqu'à ce que l'on accepte par lassitude).
  - Elle ne protège pas une **session déjà ouverte** volée sur un poste infecté.
- **L'image** : une **porte à deux serrures**, dont l'une demande une clé que vous gardez sur vous. Efficace, sauf si vous ouvrez vous-même à qui frappe.

### Le bastion d'administration (PAM) : le sas accompagné

- **Ce qu'il fait** : les administrateurs et les prestataires passent **obligatoirement** par lui pour agir sur les équipements sensibles (serveurs, pare-feu, automates). Il vérifie l'identité, n'ouvre que les équipements autorisés, et **enregistre** les sessions.
- **Ce qu'il ne fait pas** : empêcher un administrateur autorisé (ou son compte volé) de faire une erreur ou un acte malveillant ; il permet de le **voir** et de le **prouver**.
- **L'image** : le **sas d'un local sensible** : on y entre accompagné, un registre note qui entre et une caméra filme ce qu'il fait.

> **Principe clé : le moindre privilège.** Chacun n'a que les droits nécessaires à son travail, et seulement le temps nécessaire. Un compte administrateur utilisé pour lire ses courriels, c'est le passe-partout du château laissé sur la table de la cantine.

---

## 6. Étage 4 — Protéger les machines

### Le durcissement : fermer les portes inutiles

- **Ce qu'il fait** : désactiver les services, comptes et ports qui ne servent pas, changer les mots de passe d'usine, retirer les logiciels inutiles. Moins de portes, moins d'entrées.
- **Ce qu'il ne fait pas** : protéger les portes **qui restent ouvertes** parce qu'elles sont nécessaires.
- **L'image** : **murer les fenêtres** du rez-de-chaussée qui ne servent à rien.

### Les correctifs (mises à jour) : réparer les serrures

- **Ce qu'ils font** : corriger les failles connues. La plupart des attaques réussies exploitent une faille **déjà connue et corrigée** par l'éditeur… mais pas encore installée.
- **Ce qu'ils ne font pas** : protéger contre une faille encore inconnue ; et en OT, ils **ne sont pas toujours possibles** (automate certifié, système ancien, arrêt de production impossible). Il faut alors **compenser** : isoler l'équipement, filtrer ses flux, le surveiller.
- **L'image** : **changer une serrure** dont le modèle de clé circule chez les cambrioleurs.

> **Lien avec WerbVeille** : la veille vous dit **quelles serrures** de votre parc ont un défaut connu (d'après la marque, le modèle et le firmware saisis dans WerbMap).

### L'antivirus : un vaccin

- **Ce qu'il fait** : il reconnaît les programmes malveillants **déjà connus** (leur « signature ») et les bloque avant qu'ils ne s'exécutent.
- **Ce qu'il ne fait pas** :
  - Reconnaître un programme **nouveau** ou modifié pour l'occasion.
  - Voir un attaquant qui n'utilise **aucun programme malveillant** : il se sert des outils normaux du système (console d'administration, prise de main à distance), avec un compte volé. Rien à reconnaître, rien à bloquer.
- **L'image** : un **vaccin**. Très efficace contre les maladies qu'il connaît, sans effet contre un virus nouveau.

### L'EDR : un médecin qui observe le comportement

L'**EDR** (*Endpoint Detection and Response*, détection et réponse sur les postes) est un agent installé sur chaque poste et serveur.

- **Ce qu'il fait** : il observe **le comportement** de la machine (quel programme lance quoi, qui ouvre quels fichiers, qui se connecte où). Il repère ce qui est **anormal** même si c'est inconnu (un traitement de texte qui lance une console d'administration, des milliers de fichiers renommés en une minute). Il peut **isoler** la machine du réseau d'un clic et garde un **historique** pour comprendre ce qui s'est passé.
- **Ce qu'il ne fait pas** :
  - **Il alerte ; quelqu'un doit lire l'alerte et agir.** Un EDR dont personne ne regarde les alertes, c'est une alarme qui sonne dans une maison vide. D'où les offres **MDR** (un prestataire surveille 24 h / 24) ou un **SOC** (étage 6).
  - Il ne protège **pas les machines où il n'est pas installé** : automates, IHM anciennes, caméras, imprimantes, équipements réseau. En OT, une large part du parc ne peut pas recevoir d'agent.
  - Un attaquant qui a les droits d'administrateur peut parfois le **désactiver**.
- **L'image** : un **médecin qui suit le patient en continu**. Il repère des symptômes inhabituels, même d'une maladie inconnue ; encore faut-il que quelqu'un lise son rapport.

**XDR** : un EDR qui croise aussi les informations du réseau, de la messagerie et des identités. Même principe, champ de vision plus large.

### La liste blanche d'applications : la liste des invités

- **Ce qu'elle fait** : seuls les programmes **explicitement autorisés** peuvent s'exécuter ; tout le reste est refusé, connu ou pas. Très adaptée aux postes **stables** de l'OT (IHM, poste de supervision), qui font toujours la même chose.
- **Ce qu'elle ne fait pas** : empêcher l'abus d'un programme **autorisé** (encore lui : l'attaquant se sert des outils légitimes).
- **L'image** : la **liste des invités à l'entrée d'une réception** : qui n'est pas sur la liste n'entre pas, mais un invité peut mal se conduire.

### Le chiffrement du disque : un coffre

- **Ce qu'il fait** : rend les données illisibles si le portable ou le disque est **volé ou perdu**.
- **Ce qu'il ne fait pas** : protéger une machine **allumée et ouverte**. Pour un attaquant qui agit à distance sur un poste en marche, les données sont en clair.
- **L'image** : un **coffre-fort**. Inviolable fermé ; inutile s'il est ouvert pendant la journée.

---

## 7. Étage 5 — Protéger les données

### Les sauvegardes : l'assurance-vie

- **Ce qu'elles font** : permettre de **retrouver** les données et de **reconstruire** les systèmes après une panne, une erreur ou un rançongiciel. C'est souvent **la seule** protection qui sauve l'entreprise quand toutes les autres ont échoué.
- **Ce qu'elles ne font pas** :
  - Protéger d'elles-mêmes : une sauvegarde **joignable** depuis le réseau, avec un compte de l'annuaire, sera **chiffrée avec le reste** par le rançongiciel. Il faut au moins une copie **hors ligne** ou **non modifiable**.
  - Garantir la reprise : une sauvegarde **jamais testée** est une hypothèse, pas une sauvegarde.
  - Empêcher le **vol** des données : restaurer ne rend pas confidentiel ce qui a été copié par l'attaquant.
  - Couvrir l'OT si l'on oublie les **programmes des automates** et les **configurations** des équipements.
- **La règle 3-2-1-1-0** : 3 copies, sur 2 supports différents, dont 1 hors du site, 1 hors ligne ou non modifiable, et 0 erreur au dernier test de restauration.
- **L'image** : une **assurance-vie** dont le contrat serait rangé dans la maison qui brûle, si on ne fait pas attention à l'endroit où on la garde.

> **Lien avec WerbSMSI** : le registre des sauvegardes est tenu dans WerbExploitation et remonte dans la fiche SI de WerbMap.

---

## 8. Étage 6 — Détecter

### Les journaux : la boîte noire

- **Ce qu'ils font** : chaque équipement note ce qui s'y passe (connexions, erreurs, changements). Ils permettent de **comprendre** un incident après coup et d'en **détecter** certains pendant.
- **Ce qu'ils ne font pas** : alerter tout seuls. Des journaux que personne ne lit, ou qui sont effacés au bout de 24 heures, ne servent pas.
- **L'image** : la **boîte noire** d'un avion. Précieuse pour l'enquête, encore faut-il qu'elle enregistre et qu'on la garde.

### Le SIEM : la salle de contrôle

- **Ce qu'il fait** : il **rassemble** les journaux de tous les équipements et **croise** les informations pour repérer un scénario d'attaque (une connexion à 3 h du matin + un compte administrateur créé + une sauvegarde supprimée).
- **Ce qu'il ne fait pas** : voir ce qu'on ne lui envoie pas ; trouver ce pour quoi aucune règle n'a été écrite ; et surtout **agir** : il faut une équipe derrière.
- **L'image** : la **salle de contrôle** qui reçoit les images de toutes les caméras. Inutile si elle est vide, aveugle là où il n'y a pas de caméra.

### Le SOC : les vigiles dans la salle de contrôle

- **Ce qu'il fait** : une équipe (interne ou prestataire) qui **surveille** les alertes (SIEM, EDR), **qualifie** ce qui est grave et **déclenche** la réponse.
- **Ce qu'il ne fait pas** : connaître votre métier à votre place. Il faut lui dire ce qui est critique, qui appeler, et ce qu'il a le droit de couper (en OT, couper une machine peut être plus grave que l'attaque).

### La sonde de détection réseau, notamment OT : l'oreille sur la ligne

- **Ce qu'elle fait** : branchée en **écoute passive** sur le réseau (copie du trafic par le switch), elle comprend les protocoles industriels, **découvre** les équipements (utile pour l'inventaire !), et alerte sur ce qui est anormal : un nouvel équipement, une commande d'écriture vers un automate depuis un poste inhabituel, un téléchargement de programme hors arrêt planifié.
- **Ce qu'elle ne fait pas** : **bloquer** (elle écoute, par choix, pour ne jamais perturber le procédé) ; voir les zones où elle n'est pas branchée ; lire le trafic chiffré.
- **L'image** : un **détecteur de mouvement** relié à une alarme : il ne ferme aucune porte, mais signale le visiteur inattendu.

**IDS / IPS** : l'**IDS** détecte et signale (l'alarme) ; l'**IPS** est placé sur le passage et **bloque** ce qu'il reconnaît (le vigile qui intervient). En OT, on préfère souvent l'IDS : une coupure à tort arrête la production.

---

## 9. Étage 7 — Répondre et reprendre

- **Le plan de réponse à incident** : qui prévenir, qui décide, comment isoler, qui parle à l'extérieur, quelles obligations de déclaration. Écrit **avant** la crise, quand on a la tête froide.
- **Le PCI et le PRI** (module WerbPCR) : comment continuer à travailler en mode dégradé, puis dans quel ordre et en combien de temps redémarrer les systèmes.
- **Les exercices** : un plan jamais joué ne fonctionne pas le jour J.
- **Ce que ça ne fait pas** : empêcher l'attaque. Cet étage **limite les dégâts** et **raccourcit** l'arrêt.
- **L'image** : l'**exercice d'évacuation incendie**. Il n'empêche pas le feu ; il évite que le feu devienne un drame.

---

## 10. Transverse — Trouver ses faiblesses avant l'attaquant

| Outil | Ce qu'il fait | Ce qu'il ne fait pas | L'image |
|---|---|---|---|
| **Veille** (WerbVeille) | Signale les failles publiées qui touchent **vos** équipements. | Corriger : elle déclenche une action, qu'il faut mener. | Le **bulletin météo** : il annonce l'orage, il ne répare pas le toit. |
| **Scanner de vulnérabilités** | Interroge les machines et liste les failles connues. | Être sans risque en OT : un scan actif peut **planter un automate**. En atelier, on préfère l'inventaire passif et la veille. | Le **contrôle technique** de la voiture. |
| **Test d'intrusion** (WerbPentest) | Un expert mandaté tente d'entrer, comme un attaquant, et montre le chemin. | Garantir l'absence de faille : c'est une **photo à un instant donné**, dans un périmètre limité. | Le **cambrioleur mandaté** qui teste vos serrures avec votre accord. |
| **Audit** | Compare votre organisation à un référentiel (IEC 62443, NIS2, ISO 27001). | Vérifier chaque câble : il regarde surtout l'organisation et les preuves. | L'**inspection** des services de sécurité. |

---

## 11. Les idées reçues à oublier

| Idée reçue | Ce qu'il faut savoir |
|---|---|
| « On a un pare-feu, on est protégés. » | Il ne contrôle que la frontière et que ce qu'on lui demande. Tout flux autorisé est un chemin ; tout ce qui le contourne (4G, USB, portable) est invisible. |
| « On a un antivirus, ça suffit. » | Il ne reconnaît que le connu. Un attaquant avec un compte volé et les outils du système ne déclenche rien. |
| « Nos VLAN isolent les réseaux. » | Un VLAN sépare ; seul un contrôle entre les VLAN (pare-feu) protège. |
| « Le VPN sécurise l'accès. » | Il protège le trajet, pas la destination ni la personne. Sans MFA, un mot de passe volé suffit. |
| « Notre réseau industriel n'est pas relié à Internet. » | Les clés USB, les portables de maintenance, les modems des fournisseurs et les passerelles oubliées le relient bel et bien. |
| « On a des sauvegardes. » | Sont-elles hors ligne ? Testées ? Couvrent-elles les automates et les configurations ? |
| « On a un EDR, on verra l'attaque. » | On la verra si quelqu'un lit les alertes, et seulement sur les machines où il est installé. |
| « La MFA nous rend invulnérables. » | Elle bloque l'essentiel des vols de mots de passe, pas l'utilisateur qui valide une demande qu'il n'a pas faite. |
| « On est trop petits pour intéresser un pirate. » | La plupart des attaques sont automatiques : elles visent ce qui est vulnérable, pas ce qui est célèbre. |

---

## 12. Le récapitulatif en une page

| Outil | L'image | Il protège contre… | Il ne protège pas contre… |
|---|---|---|---|
| Inventaire, cartographie | Le plan du château | L'oubli, l'équipement inconnu | Rien directement : il guide tout le reste |
| Pare-feu | Le douanier | Les passages non prévus entre zones | L'abus d'un flux autorisé, le trafic interne à une zone, les contournements |
| Segmentation (VLAN, zones) | Les cloisons étanches | La propagation d'une zone à l'autre | Rien, sans contrôle entre les zones |
| DMZ | Le hall d'accueil | L'accès direct de l'extérieur à l'intérieur | Un serveur de la DMZ mal tenu |
| Diode | Le clapet anti-retour | Tout retour vers la zone protégée | Le contenu de ce qui sort |
| VPN | Le convoi blindé | L'écoute pendant le trajet | Un poste infecté, un mot de passe volé |
| NAC / 802.1X | Le vigile du parking | L'équipement inconnu branché sur une prise | L'équipement connu mais infecté |
| MFA | La deuxième serrure | Le mot de passe volé | La validation par lassitude, la session volée |
| Bastion (PAM) | Le sas accompagné | L'administration non tracée, les accès directs | L'erreur ou l'abus d'un administrateur autorisé (mais il les prouve) |
| Durcissement | Murer les fenêtres inutiles | Les entrées superflues | Les entrées nécessaires |
| Correctifs | Changer la serrure | Les failles connues | Les failles inconnues ; les équipements qu'on ne peut pas mettre à jour |
| Antivirus | Le vaccin | Les programmes malveillants connus | Le nouveau, l'attaque sans programme malveillant |
| EDR | Le médecin qui observe | Les comportements anormaux, même inconnus | Les machines sans agent ; les alertes que personne ne lit |
| Liste blanche | La liste des invités | Tout programme non prévu | L'abus d'un programme autorisé |
| Chiffrement du disque | Le coffre-fort | Le vol ou la perte du matériel | L'attaque sur une machine allumée |
| Sauvegardes | L'assurance-vie | La perte et le chiffrement des données | Le vol des données ; la sauvegarde joignable ou jamais testée |
| Journaux, SIEM | La boîte noire, la salle de contrôle | L'attaque qui passe inaperçue | Ce qui n'est pas journalisé ; l'absence d'équipe |
| Sonde OT, IDS | Le détecteur de mouvement | Le comportement anormal sur le réseau | Rien n'est bloqué ; zones non écoutées |
| Plan de réponse, PCI / PRI | L'exercice d'évacuation | Un arrêt long et désorganisé | L'attaque elle-même |
| Veille | Le bulletin météo | La faille connue qu'on ignorait | Rien sans action derrière |

---

## 13. Par où commencer ?

1. **Connaître** : inventaire complet dans WerbMap, y compris les équipements « oubliés » (caméras, onduleurs, imprimantes, passerelles).
2. **Cloisonner** : séparer la bureautique de l'atelier par un pare-feu, et **revoir la matrice de flux** : chaque flux a une raison et un responsable.
3. **Protéger les comptes** : MFA sur les accès à distance et les comptes d'administration ; plus de mots de passe d'usine.
4. **Sauvegarder** : au moins une copie hors ligne, **testée**, qui couvre aussi les automates.
5. **Tenir à jour** ce qui peut l'être, **isoler et surveiller** ce qui ne peut pas l'être.
6. **Préparer la crise** : qui appeler, comment isoler, comment redémarrer.

Aucun outil n'est une solution à lui seul. **C'est leur empilement, tenu dans la durée, qui protège.**
