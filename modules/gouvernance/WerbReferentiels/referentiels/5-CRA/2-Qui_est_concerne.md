<!-- WerbReferentiels – Développé par @WerbHat -->
# Qui est concerné, et comment

## Les acteurs

| Acteur | Définition | Obligations principales |
|---|---|---|
| **Fabricant** | Conçoit ou fait concevoir un produit et le met sur le marché **sous son nom ou sa marque** | Exigences essentielles, analyse de risques, traitement des vulnérabilités, signalement, documentation technique, évaluation de la conformité, déclaration UE, marquage CE, période de support |
| **Mandataire** | Représente un fabricant hors Union, sur mandat écrit | Les tâches prévues par le mandat (tenir la documentation à disposition, coopérer avec les autorités) |
| **Importateur** | Met sur le marché de l'Union un produit d'un fabricant hors Union | Vérifier l'évaluation de conformité, le marquage CE, la documentation, le point de contact pour les vulnérabilités ; informer le fabricant d'une vulnérabilité |
| **Distributeur** | Rend le produit disponible, sans être fabricant ni importateur | Vérifier le marquage CE et la documentation ; ne pas distribuer un produit qu'il sait non conforme |
| **Gestionnaire de logiciel libre** (*steward*) | Soutient durablement un logiciel libre destiné à un usage commercial | Régime allégé : politique de cybersécurité, coopération avec les autorités, signalement |

> L'**acheteur** et l'**exploitant** (un site industriel qui installe et utilise ces produits) ne figurent pas dans ce tableau : le CRA ne leur impose rien directement. Leur intérêt est ailleurs : voir plus bas.

---

## Intégrateurs et constructeurs de machines : quand devient-on fabricant ?

C'est la question la plus fréquente en environnement industriel. Vous êtes **considéré comme fabricant** lorsque :

- vous mettez sur le marché un produit **sous votre nom ou votre marque**, même si vous ne l'avez pas conçu (marque blanche) ;
- vous apportez une **modification substantielle** à un produit déjà sur le marché : un changement qui affecte sa conformité aux exigences essentielles ou modifie l'usage prévu (par exemple un firmware modifié, une fonction réseau ajoutée) ;
- vous **vendez une machine ou un ensemble** qui constitue lui-même un produit à éléments numériques (une cellule robotisée communicante vendue sous votre nom).

Vous **n'êtes pas** fabricant au sens du CRA lorsque vous **configurez et installez**, pour un client, des produits déjà marqués CE sans les modifier ni les revendre sous votre nom : vous restez responsable de la qualité de votre intégration (cahier d'exigences, IEC 62443-2-4), pas de la conformité CRA des composants.

| Situation | Statut CRA probable |
|---|---|
| Vous paramétrez un automate du marché et livrez le programme au client | Pas fabricant de l'automate ; votre programme sur mesure, non mis sur le marché, n'est pas un produit au sens du CRA |
| Vous vendez une machine standard, sous votre marque, avec un automate et une IHM connectés | Fabricant de la machine en tant que produit à éléments numériques ; exigez la conformité CRA de vos composants |
| Vous développez et vendez un logiciel de supervision | Fabricant du logiciel |
| Vous modifiez le firmware d'un équipement acheté avant de le revendre | Fabricant (modification substantielle) |
| Vous développez un outil interne utilisé seulement par votre entreprise | Hors champ (pas de mise sur le marché) |

> Ces cas sont indicatifs : la qualification se fait produit par produit, avec les guides de la Commission et, si besoin, un conseil juridique.

---

## L'acheteur et l'exploitant : un levier

Un site industriel, une DSI ou un RSSI n'ont pas d'obligation au titre du CRA quand ils achètent et exploitent des produits. Mais le règlement leur donne des **arguments opposables** aux fournisseurs :

- exiger le **marquage CE au titre du CRA** et la **déclaration UE de conformité** pour tout produit mis sur le marché après décembre 2027 ;
- connaître la **période de support** (durée des mises à jour de sécurité) **avant** l'achat, et la comparer à la durée d'exploitation prévue — souvent 15 à 20 ans en industrie ;
- obtenir un **point de contact** pour signaler une vulnérabilité et les **avis de sécurité** du fabricant ;
- demander la **nomenclature logicielle (SBOM)**, au moins sur demande ;
- savoir comment les **mises à jour** sont distribuées et vérifiées.

C'est l'objet du guide [l'acheteur et l'exploitant](5-Acheteur_et_exploitant.md).

---

## Les classes de produits

| Classe | Exemples | Évaluation de la conformité |
|---|---|---|
| **Produit par défaut** (la grande majorité) | Capteur connecté simple, logiciel métier, imprimante, la plupart des automates et IHM | **Contrôle interne** par le fabricant (module A) |
| **Important — classe I** (annexe III) | Systèmes d'exploitation, routeurs, modems, **commutateurs**, VPN, gestionnaires d'identité et de mots de passe, antivirus, outils de gestion de réseau, SIEM, PKI, objets connectés de sécurité (caméras, serrures…) | Contrôle interne **seulement si** une norme harmonisée, une spécification commune ou une certification européenne est appliquée entièrement ; sinon **tiers** (organisme notifié) |
| **Important — classe II** (annexe III) | **Pare-feu**, systèmes de détection et de prévention d'intrusion, hyperviseurs et environnements de conteneurs, microprocesseurs et microcontrôleurs résistants à l'effraction | **Évaluation par un tiers** obligatoire (examen UE de type + conformité au type, ou assurance qualité complète) |
| **Critique** (annexe IV) | Boîtiers de sécurité matériels (HSM), passerelles de compteurs intelligents, cartes à puce et éléments sécurisés | **Certification européenne de cybersécurité** lorsqu'un acte de la Commission l'exige, sinon comme la classe II |

La classe dépend de la **fonction principale** du produit, pas du fait qu'il en intègre un autre : une machine qui contient un commutateur n'est pas, de ce seul fait, un produit important.

> La liste exacte des catégories et leurs descriptions techniques sont fixées par le règlement et un acte d'exécution : vérifiez la classe de chaque produit avec les [sources](sources.md).

Suite : [Les exigences essentielles](3-Exigences_essentielles.md).
