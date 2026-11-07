<!-- WerbCartoSI – Développé par @WerbHat -->
# Préparer les modèles de schémas

Des schémas dessinés chacun à sa façon se relisent mal : on ne sait plus quelle version on a sous les yeux, ni qui l'a validée, ni s'il est diffusable. Un **modèle commun** règle cela une fois pour toutes : même format de page, même légende, et surtout un **cartouche** (titre, site, version, date, classification, propriétaire) que WerbCartoSI remplit tout seul à la création.

## 1. Le principe

1. L'entreprise prépare un ou plusieurs **modèles Visio** (.vstx de préférence, ou .vsdx) avec un cartouche contenant des **balises**.
2. Les modèles sont déposés dans l'espace WerbSMSI : modèles **communs** au groupe ou modèles **propres au site**.
3. Dans WerbCartoSI, chaque modèle est **décrit** une fois (nom, type et exigences proposés).
4. **▶ Créer un schéma** : le module copie le modèle, remplit le cartouche, donne au fichier un **nom normalisé** et crée la fiche du schéma en brouillon, déjà liée au fichier.

## 2. Écrire le cartouche

Dans Visio, ouvrez le modèle et écrivez les balises **telles quelles** dans le texte des formes du cartouche, par exemple `Version : {{VERSION}}`.

| Balise | Remplacée par |
|---|---|
| `{{TITRE}}` (ou `{{NOM}}`) | Titre du schéma |
| `{{ID}}` | Identifiant de la fiche (SCH-012) |
| `{{SITE}}`, `{{SITE_NOM}}` | Code et nom du site |
| `{{ORGANISATION}}` | Organisation de l'espace WerbSMSI |
| `{{TYPE}}`, `{{EXIGENCES}}` | Type de schéma, codes des exigences couvertes |
| `{{VERSION}}`, `{{DATE}}`, `{{STATUT}}` | Version, date de création, statut (Brouillon) |
| `{{AUTEUR}}`, `{{PROPRIETAIRE}}` | Votre nom, propriétaire (fonction) |
| `{{CLASSIFICATION}}` | Classification (Diffusion restreinte, Confidentiel…) |

Conseils :

- Tapez chaque balise **d'un seul trait**. Si vous changez la mise en forme au milieu d'une balise, WerbCartoSI la reconnaît quand même, mais c'est plus sûr de l'éviter.
- Les balises peuvent aussi figurer dans les **propriétés du fichier** (Fichier › Informations › Propriétés : titre, sujet, mots-clés) : elles sont remplies de la même façon.
- Une balise inconnue (faute de frappe) reste telle quelle : la page Modèles la signale après description.
- Enregistrez le modèle au format **Modèle Visio (.vstx)** : Visio crée alors un nouveau dessin à chaque ouverture. Les fichiers à macros (.vsdm, .vstm) et l'ancien format (.vsd, .vst) ne sont pas acceptés.
- **Aucune donnée réelle dans un modèle** : ni adresse, ni nom d'équipement, ni mot de passe. C'est un gabarit vide.

## 3. Où déposer les modèles

| Dossier | Pour qui | Qui l'alimente |
|---|---|---|
| `modeles/schemas/` à la racine de l'espace | Tous les sites : modèles communs du groupe | L'équipe SMSI du groupe |
| `sites/<CODE>/inventaires/schemas/modeles/` | Le site seulement | L'équipe du site (📁 Créer le dossier des modèles du site) |

Déposez les fichiers avec l'Explorateur, puis dans WerbCartoSI : *Modèles de schémas* › **🔄 Actualiser**. Un nouveau fichier apparaît « à décrire » : **➕ Décrire** lit ses balises ; donnez-lui un nom, le type et les exigences qu'il sert le plus souvent, et la classification proposée.

Sans espace ouvert (ou pour un essai), **📂 Modèle de mon poste…** utilise un fichier de votre ordinateur pour une création, sans l'ajouter à la bibliothèque.

## 4. Créer un schéma

1. **▶ Créer un schéma** sur la ligne du modèle.
2. Saisissez le titre, ajustez le type, la classification, la version (0.1 par défaut), le propriétaire et les exigences.
3. Le nom du fichier s'affiche : `SCH-012_Zones_et_conduits_ligne_3_LYON_v0.1.vsdx`.
4. **✨ Créer le schéma** : Edge demande où enregistrer. La première fois, allez dans le **dossier des schémas du site** (`sites/<CODE>/inventaires/schemas/`) ; Edge s'en souvient ensuite.
5. La fiche s'ouvre en **brouillon**, liée au fichier. **📋 Copier le chemin**, collez-le dans la barre d'adresse de l'Explorateur : le schéma s'ouvre dans Visio, cartouche déjà rempli.

Si le fichier a été enregistré ailleurs, la fiche le signale (« introuvable ») : déplacez-le dans le dossier des schémas du site, ou corrigez le chemin dans la fiche.

> Le module n'écrit jamais dans le dossier des modèles et ne copie jamais un modèle dans sa base : il le lit, en fait une copie remplie, et c'est vous qui choisissez où l'enregistrer.

## 5. Les modèles fournis

Cinq modèles d'exemple accompagnent le module (dossier `exemples/modeles/`, et `modeles/schemas/` de l'espace de démonstration). Copiez-les dans `modeles/schemas/` de votre espace, adaptez-les à la charte graphique de l'entreprise, puis décrivez-les.

| Modèle | Pour quoi | Ce qu'il contient |
|---|---|---|
| `Modele_schema_A3_cartouche.vstx` | Tout schéma | Une zone de dessin libre et le cartouche à balises |
| `Modele_zones_conduits_A3.vstx` | **EX-ZONES** (et EX-CARTO) | Zones par criticité (couleurs de WerbMap) avec leur SL-T, conduits et équipement de filtrage de chacun, tableau des conduits (de → vers, équipement, SL-T visé, contre-mesures) |
| `Modele_acces_distants_A3.vstx` | **EX-ACCES** | Tiers et sites extérieurs, point d'entrée unique (VPN, bastion, MFA), zones atteintes, chemins interdits (modem 4G, prise en main directe, contournement), tableau des accès externes |
| `Modele_administration_A3.vstx` | **EX-ADMIN** | Poste et réseau d'administration dédiés, bastion, ressources administrées par zone, exceptions justifiées, chemin interdit depuis la bureautique, tableau des ressources administrées |
| `Modele_sauvegarde_reprise_A3.vstx` | **EX-REPRISE** | Zones, flux de sauvegarde avec leur heure, copie hors ligne mise en évidence, restauration testée, ordre de redémarrage avec RTO et RPO |

Toutes les planches spécialisées ont la même organisation : le dessin en haut, un tableau à remplir au milieu (les détails que l'auditeur demande), la légende en bas à gauche, le cartouche en bas à droite. Les chemins **interdits** sont dessinés en rouge pointillé : s'ils existent sur le site, ils sont à supprimer, pas à documenter comme normaux.

| Modèle | Points NIS2 qu'il aide à prouver |
|---|---|
| Zones et conduits | CLOISONNEMENT.a à d, FILTRAGE.a et b (et IEC 62443-3-2) |
| Accès distants et interconnexions | ECOSYSTEME.a, CLOISONNEMENT.g et h, ACCES_DISTANTS.a |
| Architecture d'administration | ADMINISTRATION.a, g et h |
| Sauvegarde et reprise | CONTINUITE_ACTIVITE.a, d et f (et .c par la date du test, à confirmer par le registre de WerbExploitation) |

Le modèle « Sauvegarde et reprise » répond aux questions de l'auditeur sur la continuité :

| Question de l'auditeur | Où sur la planche | Point NIS2 |
|---|---|---|
| Qu'est-ce qui est sauvegardé, et à quelle fréquence ? | Les flèches pleines vers le stockage de sauvegarde, avec leur heure | CONTINUITE_ACTIVITE.a |
| Une copie échappe-t-elle à un rançongiciel ? | Le cadre orange en pointillés : support déconnecté, lieu protégé | CONTINUITE_ACTIVITE.d |
| Dans quel ordre redémarrer, en combien de temps ? | Le bandeau « Ordre de redémarrage », avec RTO et RPO | CONTINUITE_ACTIVITE.f |
| La restauration a-t-elle été testée ? | La flèche en pointillés, avec la date et la durée du dernier essai | CONTINUITE_ACTIVITE.c |

En remplissant la planche :

- remplacez chaque « TAG … » par le TAG réel de WerbMap ;
- n'oubliez pas les **programmes des automates** : sans eux, un automate remplacé ne redémarre pas ;
- écrivez la date et la durée du **dernier test de restauration réel**, pas une intention ;
- gardez le lieu de la copie hors ligne générique (« armoire forte »), jamais son code d'accès.

Le schéma montre l'architecture voulue. La preuve que les sauvegardes tournent et sont testées reste le registre des sauvegardes de WerbExploitation.

## 6. Ouvrir directement dans Visio (essai)

*Référentiels et paramètres* › **Ouverture directe dans Visio (essai)** ajoute un bouton « 🖉 Ouvrir dans Visio » aux fiches des schémas Visio. Il utilise le lien `ms-visio:` d'Office : Edge demande l'autorisation d'ouvrir Visio. Selon la version d'Office, cela fonctionne pour un fichier sur SharePoint ou OneDrive, et pas toujours pour un fichier d'un lecteur réseau. Essayez sur votre poste avant de le recommander ; la copie du chemin reste la méthode sûre.

## Bonnes pratiques

- **Un modèle par usage**, pas un par personne : réseau, zones et conduits, administration, sauvegarde et reprise suffisent souvent.
- **Versionner les modèles** eux-mêmes (`Modele_reseau_v2.vstx`) et retirer de la bibliothèque ceux qui ne doivent plus servir.
- **Une légende commune** dans le modèle (couleurs des zones, symboles des pare-feu, des liaisons distantes) : les schémas de tous les sites se lisent de la même façon.
- **La classification bien visible** dans le cartouche : un schéma imprimé ou envoyé par erreur doit montrer tout de suite qu'il ne se diffuse pas.
