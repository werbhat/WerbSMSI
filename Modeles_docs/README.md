# Modèles de documents — WerbSMSI

> Inventaire des modèles Word, Visio et Excel de l'environnement — Développé par **@WerbHat**

Ce dossier est **la référence** de tous les modèles de documents. On modifie un modèle ici, puis on met à jour ses copies avec `synchroniser.py` (voir plus bas).

Certains modules et l'espace de démonstration ont besoin d'une **copie** à un endroit précis : l'espace d'un groupe lit ses modèles dans `SMSI_<SIGLE>/modeles/`, et un module livre ses exemples dans son dossier `exemples/`. Ces copies restent à leur place. Elles ne doivent pas être modifiées directement.

## Arborescence

```
Modeles_docs/
├── README.md                ← cet inventaire
├── modeles.json             ← le même inventaire en données : lu par le portail (Outils › Modèles de documents) et par synchroniser.py
├── synchroniser.py          ← contrôle et met à jour les copies des modèles ; signale un fichier absent de modeles.json
├── Word/
│   ├── Modele_entete.docx                 ← modèle d'en-tête de l'entreprise (version réelle)
│   └── Modele_entete_exemple_fictif.docx  ← modèle minimal fictif (démonstration, tests)
├── Visio/
│   ├── Modele_schema_A3_cartouche.vstx
│   ├── Modele_zones_conduits_A3.vstx
│   ├── Modele_acces_distants_A3.vstx
│   ├── Modele_administration_A3.vstx
│   └── Modele_sauvegarde_reprise_A3.vstx
└── Excel/
    └── Modele_Etat_Lieux_Tests_Reseau.xlsx
```

## Word — en-tête et pied de page de l'entreprise (charte §7.2)

Un seul modèle par groupe. Il fournit l'en-tête (logo compris), le pied de page, les marges et les styles des documents produits par les modules. Il s'utilise dans un module par « Modèle commun de l'espace » ou « Charger un modèle… », et il est alors **copié dans la base** du module.

Pour la mise en place, on le dépose une fois dans `SMSI_<SIGLE>/modeles/Modele_entete.docx` de l'espace (lecture pour tous, écriture pour l'équipe SMSI du groupe).

| Fichier | À quoi il sert | Copies à tenir à jour |
|---|---|---|
| `Word/Modele_entete.docx` | Modèle **réel** de l'entreprise : logo, devise en en-tête, balises dans l'en-tête et le pied de page. À déposer dans l'espace de production. | aucune (l'espace de production est hors du dépôt) |
| `Word/Modele_entete_exemple_fictif.docx` | Modèle **minimal fictif** de la démonstration et des tests automatisés. Il contient les balises `{{TITRE}}`, `{{PROJET}}`, `{{REFERENCE}}`, `{{VERSION}}`, `{{DATE}}`, `{{CLASSIFICATION}}` et `{{PRESTATAIRE}}`. | `demo/SMSI_GROUPE_DEMO/modeles/Modele_entete.docx` ; `WerbIEC62443/exemples/Modele_entete_exemple.docx` |

**Balises reconnues** (remplacées par le module ; une balise sans valeur est vidée) : `{{TITRE}}`, `{{PROJET}}`, `{{REFERENCE}}`, `{{VERSION}}`, `{{DATE}}`, `{{CLASSIFICATION}}`, `{{ORGANISATION}}`, `{{SITE}}`, `{{MOA}}`, `{{PRESTATAIRE}}`, `{{MODULE}}`.

**Modules qui l'utilisent** :

| Module | Documents habillés par le modèle |
|---|---|
| WerbGouvernance | Document PSSI et charte utilisateur (PDF et Word) |
| WerbEBIOS | Rapport d'analyse de risques (Word) |
| WerbIEC62443 | Documents de cadrage et plan (Word) |
| WerbPresta | Cahier d'exigences, questionnaire, rapport d'évaluation (Word) |
| WerbPCR | Fiches du plan de continuité et de reprise (Word) |
| WerbAcademie | Feuille d'émargement, quiz (Word) |
| WerbMap | Fiche d'un système d'information (Word) |
| WerbExploitation | Rapport d'une demande de flux (PDF) |

## Visio — modèles de schémas (WerbCartoSI)

Ce sont des modèles A3 avec un **cartouche à balises** (`{{TITRE}}`, `{{ID}}`, `{{SITE}}`, `{{VERSION}}`…). Quand WerbCartoSI crée un schéma depuis un modèle, il remplit le cartouche. Le détail est dans le guide de WerbCartoSI « Préparer les modèles de schémas ».

Pour la mise en place, on les dépose dans `SMSI_<SIGLE>/modeles/schemas/` (modèles du groupe), ou dans le dossier des modèles d'un site.

| Fichier | À quoi il sert | Exigence (NIS2) |
|---|---|---|
| `Visio/Modele_schema_A3_cartouche.vstx` | Tout schéma : une zone de dessin libre et le cartouche à balises | — |
| `Visio/Modele_zones_conduits_A3.vstx` | Zones par criticité avec leur SL-T, conduits et équipement de filtrage, tableau des conduits | EX-ZONES, EX-CARTO (cloisonnement, filtrage, IEC 62443-3-2) |
| `Visio/Modele_acces_distants_A3.vstx` | Tiers et sites extérieurs, point d'entrée unique (VPN, bastion, MFA), zones atteintes, chemins interdits, tableau des accès externes | EX-ACCES |
| `Visio/Modele_administration_A3.vstx` | Poste et réseau d'administration dédiés, bastion, ressources administrées par zone, exceptions justifiées | EX-ADMIN |
| `Visio/Modele_sauvegarde_reprise_A3.vstx` | Flux de sauvegarde, copie hors ligne, restauration testée, ordre de redémarrage avec RTO et RPO | EX-REPRISE |

**Copies à tenir à jour** (identiques au modèle) : `WerbCartoSI/exemples/modeles/` (livrées avec le module) et `demo/SMSI_GROUPE_DEMO/modeles/schemas/` (démonstration).

**Ces modèles sont générés**, pas dessinés à la main : `WerbCartoSI/outils/generer_modeles.py` les écrit ici, à l'octet près identiques d'une génération à l'autre. Pour corriger un modèle, modifiez le script, régénérez (`python outils/generer_modeles.py --apercu <dossier>` depuis WerbCartoSI, aperçu SVG pour relire sans Visio), puis lancez `synchroniser.py --copier`. Si vous retouchez un modèle directement dans Visio, il ne correspond plus au script : reportez la retouche dans le script, ou cessez de régénérer ce modèle.

## Excel

| Fichier | À quoi il sert | Copies |
|---|---|---|
| `Excel/Modele_Etat_Lieux_Tests_Reseau.xlsx` | État des lieux des **tests de connectivité réseau**. Une feuille de relevé (date, source et IP, destination et IP, DNS utilisé, commande exécutée, résultat par protocole : ping, DNS, NTP, SMB, HTTPS, RDP, SSH, autre ; commentaire, résultat global) et une feuille d'aide avec les commandes Windows de chaque test (`ping`, `nslookup`, `tracert`, `w32tm`, `net use`, `Test-NetConnection`, `route print`, `arp -a`) et le résultat attendu. Il sert par exemple à vérifier les flux ouverts après une demande de flux (WerbExploitation). | aucune |

**Modèles Excel générés par les modules** (il n'y a pas de fichier à tenir à jour : le module produit le classeur à la demande, toujours conforme à sa version) :

- **WerbExploitation** : le bouton « ⇩ Modèle Excel » de chaque registre (matériel, logiciels, licences…) produit un classeur vide avec les titres, les listes déroulantes et un mode d'emploi, prêt à remplir puis à importer.
- **Tous les modules** : « Export Excel » produit un export de la base. Ce n'est pas un modèle.

**Exemples de données, qui ne sont pas des modèles** : `WerbMap/exemples/Exemple_Base_Inventaires_actifs_DEMO.xlsm` (classeur d'inventaire rempli avec les données de démonstration, à importer dans une base vide) et `WerbMap/exemples/Export_simple_DEMO.xlsx` (exemple d'export). Ils restent dans le module.

## Dans le portail

**🛠️ Outils › Modèles de documents** (portail 1.13.0) affiche cet inventaire : rôle de chaque modèle, modules qui l'utilisent, balises, emplacement dans l'espace. Une fois l'espace ouvert, la page indique pour chaque modèle s'il est **présent** ou **absent** dans `modeles/` et `modeles/schemas/`, et liste les autres fichiers de ces dossiers. Elle ne modifie jamais l'espace : le dépôt d'un modèle se fait dans l'Explorateur.

L'inventaire du portail vient de `modeles.json`, intégré à l'assemblage du portail (`werb_charte.py portail`). **Ajouter ou modifier un modèle** : mettre à jour `modeles.json` (et cette page), puis réassembler le portail.

## Mettre à jour un modèle

1. Modifiez le fichier dans `Modeles_docs/` (Word, Visio ou Excel).
2. Contrôlez les copies : `python Modeles_docs/synchroniser.py` (lancé depuis le dossier `WerbSMSI`). Le script liste les copies différentes du modèle.
3. Mettez-les à jour : `python Modeles_docs/synchroniser.py --copier`.
4. Pour un modèle livré avec un module (WerbCartoSI, WerbIEC62443), republiez le module (`werb_charte.py publier`) : le paquet publié dans `modules/` reprend ses exemples.
5. Relancez les tests des modules concernés : ils utilisent le modèle fictif de la démonstration.

> Ne mettez dans un modèle ni mot de passe, ni information confidentielle, ni donnée personnelle. Pensez aux propriétés du document (auteur, société), qui sont conservées dans le fichier.
