<!-- WerbVeille – Développé par @WerbHat -->
# WerbVeille Droid : la veille sur téléphone

Ce guide explique comment mettre en service et utiliser l'application Android **WerbVeille Droid** avec le module **WerbVeille** de WerbSMSI : installer l'application, relier un téléphone à la veille d'un site, recevoir les alertes, et surtout **gérer les clés et les certificats** qui protègent l'ensemble.

Il s'adresse au **référent cyber** ou au **responsable de la veille** du site, au **RSSI du groupe** (suivi de tous les sites sur un téléphone, § 5.8), et à la personne qui équipe les téléphones.

---

## 1. En bref

WerbVeille, sur le poste WerbSMSI, connaît le **parc** du site : les produits installés (reçus de WerbExploitation) et les mots-clés de veille. Le téléphone, lui, sait télécharger les **flux publics** de vulnérabilités (catalogue **KEV** de la CISA, CVE récentes du **NVD**) et les **actualités** des sources RSS de la veille. Le rôle de l'application est de les rapprocher **sur le téléphone**, à la fréquence choisie (toutes les 6 heures par défaut), et de prévenir par une notification **sans détail**.

```
  POSTE WERBSMSI  (WerbVeille)              TÉLÉPHONE  (WerbVeille Droid)
  ----------------------------              -----------------------------

                                            1. Réglages (icône ⚙)
                                               Enregistrer le certificat
                                               (clé de l'appareil, dans le Keystore)

              <=======  certificat .pem  (public)  =======

  2. Collecte > Export pour téléphone
     - réduit le parc (ni site, ni TAG)
     - chiffre pour CE téléphone
     - signe avec la clé d'émetteur
       (.wvkey.json + mot de passe)

              =======  fichier .wvdroid.json  (chiffré)  =======>

                                            3. Parc > Importer
                                               vérifie la signature et l'émetteur,
                                               déchiffre, range dans le coffre

                                            4. À la fréquence choisie (1 à 24 h)
                                               KEV + NVD + actualités RSS,
                                               rapprochement sur le téléphone,
                                               notification « N alertes »
```

| Étape | Où | Ce qui se passe | Ce qui circule |
|:--:|---|---|---|
| **1** | Téléphone — *⚙ Réglages* | *Enregistrer le certificat* : la clé de l'appareil est créée dans le Keystore, seul le certificat public sort | certificat `.pem` (public) → poste |
| **2** | WerbVeille — *Collecte › Export pour téléphone* | le parc est réduit (ni site, ni TAG), chiffré pour ce téléphone, signé avec la clé d'émetteur | fichier `.wvdroid.json` (chiffré) → téléphone |
| **3** | Téléphone — *Parc › Importer* | signature et émetteur vérifiés (empreinte comparée au premier import), parc déchiffré et rangé dans le coffre | — |
| **4** | Téléphone, en arrière-plan | à la fréquence choisie : flux publics (KEV, NVD, actualités) téléchargés et rapprochés **sur le téléphone** ; notification sans détail | flux publics : Internet → téléphone ; **rien du parc ne sort** |

Pour le **RSSI du groupe**, le circuit est le même, mais l'export vient de WerbVeille **rattachée au groupe** et réunit tous les sites sous leur alias (§ 5.8).

Le fichier ne circule que **dans un sens** : de WerbVeille vers le téléphone. Le téléphone n'écrit jamais rien dans WerbSMSI, et rien du parc ne part sur Internet.

---

## 2. Les clés et les certificats : qui sert à quoi

Quatre éléments cryptographiques interviennent. Les confondre est la cause la plus fréquente des refus d'import.

| | **Clé de l'appareil** | **Clé d'émetteur WerbVeille** | **Clé de signature de l'APK** | **Clé du coffre du téléphone** |
|---|---|---|---|---|
| **À quoi elle sert** | Seul **ce téléphone** peut lire les exports qui lui sont destinés | Prouver que l'export **vient de votre veille** et n'a pas été modifié | Prouver que l'**application** vient de vous ; autoriser ses mises à jour | Chiffrer le parc et les alertes rangés sur le téléphone |
| **Type** | RSA 3 072 bits | ECDSA P-256 | RSA 3 072 bits | AES-256 |
| **Partie secrète** | dans la puce sécurisée du téléphone (Android Keystore), **jamais exportable** | fichier `WerbVeille_cle_emetteur_<date>.wvkey.json`, chiffré par **mot de passe** | fichier `werbveilledroid_signature.jks`, protégé par **mot de passe** | dans le Keystore du téléphone, jamais exportable |
| **Partie publique** | le **certificat** `WerbVeilleDroid_appareil.pem`, remis à WerbVeille | gardée dans la **base WerbVeille** (empreinte affichée) | dans chaque APK | — |
| **Empreinte** | « Empreinte » dans *Réglages* du téléphone et dans la liste des téléphones de WerbVeille | « Empreinte de l'émetteur » dans WerbVeille et à l'import sur le téléphone | affichée par `apksigner` (guide de signature) | — |
| **Où ranger** | rien à ranger | le **fichier et son mot de passe dans le coffre-fort** | le **fichier et son mot de passe dans le coffre-fort** | rien à ranger |
| **Qui la crée** | l'application, au premier besoin | WerbVeille, *Créer la clé d'émetteur* | `outils/creer_cle_signature.sh` | l'application, automatiquement |

**L'empreinte**, ce sont 64 caractères affichés par groupes de quatre (`8BAA DBFB 32FC 0158 …`). Deux empreintes identiques = la même clé. **Comparer les empreintes est le seul contrôle humain du système** : il se fait deux fois, à l'ajout d'un téléphone et au premier import.

**Le principe en une phrase** : WerbVeille **chiffre avec le certificat du téléphone** (que lui seul peut ouvrir) et **signe avec la clé d'émetteur** (que le téléphone a épinglée) ; le téléphone refuse tout fichier qui ne lui est pas destiné ou qui ne vient pas de l'émetteur épinglé.

---

## 3. Avant de commencer

| Côté poste | Côté téléphone |
|---|---|
| WerbVeille **1.7.0** ou plus récent, la veille du site rattachée à WerbSMSI (*Intégration WerbSMSI*) | Android 8 ou plus récent |
| Les produits du parc reçus de WerbExploitation (*Intégration WerbSMSI › logiciels reçus*) et des mots-clés | Un **verrouillage d'écran** (code, schéma, empreinte) : l'application refuse de s'ouvrir sans |
| Un accès au **coffre-fort de mots de passe** | Un accès Internet (Wi-Fi ou données) pour les flux publics |
| | L'APK signée : `WerbVeilleDroid-<version>.apk`, mise à disposition dans le dossier **`APK` du kit WerbSMSI** (lien dans *Collecte › Export pour téléphone*), avec son empreinte et un README ; pour la produire, voir le guide « Créer la clé de signature et compiler l'APK » du projet WerbVeilleDroid |

---

## 4. Mise en service, pas à pas

### 4.1 Installer l'application (téléphone)

1. Prendre `WerbVeilleDroid-<version>.apk` dans le dossier **`APK` du kit WerbSMSI** (WerbVeille, *Collecte › Export pour téléphone › Application à installer*) et **vérifier son empreinte** avec celle du `README.md` du dossier (`certutil -hashfile WerbVeilleDroid-<version>.apk SHA256`).
2. La copier sur le téléphone (ou `adb install` par câble USB), l'ouvrir, autoriser *Installer des applications inconnues* pour l'application qui l'ouvre.
3. Si une ancienne version est installée et que l'installation est refusée (« conflit avec un package existant »), la désinstaller d'abord.
4. Ouvrir **WerbVeille Droid** : si le téléphone n'a pas de verrouillage d'écran, l'application l'indique ; en définir un dans les paramètres.
5. *Déverrouiller* (empreinte ou code du téléphone), puis **autoriser les notifications**.

### 4.2 Enregistrer le certificat du téléphone (téléphone)

1. Icône **⚙** (en haut, *Réglages*) › *Enregistrer le certificat (.pem)* : choisir un emplacement (par exemple *Téléchargements*). Le fichier `WerbVeilleDroid_appareil.pem` est créé.
2. **Noter l'empreinte** affichée juste au-dessus (ou la laisser à l'écran pour la comparer à l'étape 4.4).
3. Remettre ce fichier au poste WerbSMSI (câble, messagerie, clé USB : il est **public**, sa diffusion ne pose pas de problème).

> La clé privée correspondante ne quitte jamais le téléphone. Si l'on fait *Tout effacer*, une nouvelle clé est créée : le certificat change et doit être remis à nouveau (voir § 7.3).

### 4.3 Créer la clé d'émetteur (WerbVeille, une seule fois)

1. Dans WerbVeille : **🧰 Collecte › Export pour téléphone** › *🔑 Créer la clé d'émetteur…*
2. Saisir un **mot de passe de 12 caractères au moins** (20 conseillés), deux fois. L'enregistrer d'abord dans le **coffre-fort**.
3. WerbVeille télécharge `WerbVeille_cle_emetteur_<date>.wvkey.json`. **Le ranger dans le coffre-fort** (pièce jointe de l'entrée du mot de passe) — jamais dans l'espace WerbSMSI, un dossier synchronisé ou une messagerie.
4. **Enregistrer la base** WerbVeille (💾) : elle garde l'empreinte de l'émetteur (partie publique).
5. Noter l'**empreinte de l'émetteur** affichée : elle sera comparée sur chaque téléphone.

### 4.4 Ajouter le téléphone (WerbVeille)

1. *📱 Téléphones › ＋ Ajouter un téléphone…* › choisir le fichier `.pem` du téléphone.
2. WerbVeille affiche l'**empreinte du certificat** : **la comparer à celle affichée dans *Réglages* du téléphone**. Si elle diffère, annuler : ce n'est pas le bon fichier.
3. Donner un nom parlant (« Astreinte cyber – Pierre », « Téléphone RSSI »), *Enregistrer*, puis **enregistrer la base**.

### 4.5 Exporter le parc (WerbVeille)

1. Vérifier la carte **📦 Contenu de l'export** : nombre de produits, mots-clés, vulnérabilités suivies (CISA KEV, NVD), **sources d'actualités** (actives, en HTTPS sur un domaine public ; les autres sont écartées et comptées), et la liste de ce qui n'est **jamais** exporté (site, TAG, sources internes ou non HTTPS, jetons, alertes, journal).
2. Laisser cochée *Inclure les produits du parc … et la veille NVD sur le téléphone* : le téléphone télécharge le flux NVD complet et compare en local, aucun nom de produit ne sort.
3. Sur la ligne du téléphone : *⬇️ Exporter…*. Une fenêtre rappelle les trois étapes, puis *Choisir le fichier de clé…* ouvre le sélecteur de fichiers : choisir le fichier **de la clé d'émetteur** `WerbVeille_cle_emetteur_<date>.wvkey.json` (depuis le coffre-fort — c'est la clé privée qui signe l'export, elle n'est jamais dans la base) › saisir son mot de passe › le fichier `.wvdroid.json` est **téléchargé** (dossier *Téléchargements* du navigateur).
4. Le fichier `WerbVeilleDroid_<téléphone>_<date>.wvdroid.json` est téléchargé. Il est **chiffré pour ce téléphone seulement** : il peut être transmis par n'importe quel moyen.

### 4.6 Importer le parc (téléphone)

1. Copier le fichier `.wvdroid.json` sur le téléphone.
2. Onglet **Parc** › *Importer le parc* › choisir le fichier.
3. Au **premier import**, la fenêtre « Nouvel émetteur » affiche une empreinte : **la comparer à l'empreinte de l'émetteur affichée dans WerbVeille** (§ 4.3). Identique : *Empreintes identiques : importer*. Différente : *Refuser*.
4. Le téléphone **épingle** cet émetteur : les imports suivants se font sans question, et tout fichier d'un autre émetteur est refusé.
5. La première vérification se lance aussitôt : l'onglet **Alertes** se remplit. Cette première fois, il n'y a **pas de notification** (tout l'existant serait signalé d'un coup) ; ensuite, seules les **nouvelles** alertes sont notifiées.

---

## 5. Utiliser l'application au quotidien

### 5.1 Les notifications

À la fréquence choisie dans *Réglages* (**6 heures** par défaut, réseau requis), l'application télécharge le catalogue KEV et les CVE publiées depuis la dernière vérification (30 jours au plus en arrière), les rapproche du parc et notifie : « **N nouvelle(s) alerte(s) concernent votre parc** ». La notification ne cite **jamais** de produit ni de CVE (elle est lisible sur l'écran verrouillé). Toucher la notification ouvre l'application, qui demande le déverrouillage.

### 5.2 Les onglets

| Onglet | Contenu |
|---|---|
| **Alertes** | Les vulnérabilités qui concernent le parc, de la plus récente à la plus ancienne |
| **KEV** | Le catalogue de la CISA : vulnérabilités **activement exploitées** — dernière copie gardée, avec sa date ; recherche |
| **NVD** | Les CVE du NVD publiées pendant la **durée de conservation** (1 mois par défaut) qui peuvent donner une alerte (score ≥ seuil CVSS du parc, ou pas encore notées), gardées d'une vérification à l'autre ; recherche |
| **Actu** | Les actualités des sources RSS de la veille (durée de conservation) ; filtre *Votre parc* ; recherche (§ 5.5) |
| **Parc** | Ce qui a été importé : date du kit, produits, mots-clés, sources, dernière vérification ; **Détail des sources** (§ 5.5 bis) ; *Importer un nouveau fichier* |

En haut : **Vérifier** lance une vérification immédiate ; l'icône **⚙** ouvre les *Réglages* (certificat de l'appareil, émetteur épinglé, **vérification automatique**, *Tout effacer*) ; *← Retour* revient aux onglets.

### 5.3 Lire une alerte

Dans les onglets Alertes, Actu, KEV et NVD, les **noms des applications du parc** sont en ***gras italique cyan*** et les **mots-clés** en ***gras italique jaune***, dans le titre, le résumé et la raison (sans majuscules ; « S7-1500 » et « S7 1500 » sont reconnus). Dans l'onglet KEV, l'application concernée par la vulnérabilité est toujours en cyan.

- **Badges** : `EXPLOITÉE` (catalogue KEV : attaques en cours), `RANÇONGICIEL` (utilisée dans des campagnes de rançongiciel), sévérité et score CVSS (`CRITICAL 9.8`).
- **Raison**, en couleur :
  - en bleu, **« Produit : … »** — un produit du parc est concerné. « (rapprochement par le nom, à vérifier) » signale un rapprochement sans CPE, moins sûr. « version installée … : vérifier si elle est concernée » : l'application ne compare pas encore les versions.
  - en jaune, **« Mot-clé : … »** — un mot-clé de veille apparaît dans la vulnérabilité.
- Toucher la carte ouvre la **fiche publique du NVD** dans le navigateur (seule la CVE consultée est transmise).

### 5.4 Trier et rechercher

- Filtres **Toutes**, **Parc** (produits du parc), **Mots-clés** ; avec *Mots-clés*, une seconde ligne permet de n'afficher **qu'un mot-clé**.
- **Recherche** : plusieurs termes, tous exigés, sans accents ni majuscules, sur la CVE, le titre, le résumé et la raison. Exemples : `chrome exploitee`, `fortios critical`, `CVE-2026-1234`, `rancongiciel`.
- Filtres et recherche s'effacent au verrouillage.

### 5.5 Les actualités (onglet Actu)

À chaque vérification, le téléphone lit aussi les **sources d'actualités** de la veille (CERT-FR, CISA, éditeurs…), transmises **signées** dans l'export : il ne contacte que ces sites. Il garde les articles de la **durée de conservation** (1 mois par défaut, 1 000 au plus) et les rapproche **en local** du parc, comme les alertes.

- **Toutes (n)** / **Votre parc (n)** : *Votre parc* ne garde que les articles qui citent un produit du parc (et son éditeur s'il est connu) ou un mot-clé, sans les exclusions ; la raison s'affiche sous le titre.
- **Recherche** : mêmes règles que pour les alertes (tous les termes, sans accents ni majuscules), sur le titre, le résumé, la source, la catégorie et la raison.
- Les articles sont **regroupés par jour** (barre verte : « Aujourd'hui », « Hier », puis la date) ; le titre est en bleu clair, le **site d'origine en orange**.
- Toucher un article ouvre la page de la source dans le navigateur.
- Une notification « **N actualité(s) concernent votre parc.** » signale les **nouveaux** articles du parc (jamais à la première lecture, jamais de titre) ; elle se désactive dans *⚙ Réglages › Notifications des actualités*.
- **Sources en erreur** : la liste, en haut de l'onglet, donne la raison pour chaque source (§ 9).

Les sources se gèrent **dans WerbVeille** (*Sources*) : en ajouter, en retirer ou corriger une adresse, puis refaire un export (§ 6). Une source interne, en HTTP, par adresse IP ou sur un port particulier n'est pas transmise.

### 5.5 bis Le détail des sources (onglet Parc)

*Parc › Détail des sources* (le bouton indique le nombre de sources en erreur) ouvre une page qui récapitule :

- **Vulnérabilités** : CISA KEV et NVD — active ou non dans le kit, seuil CVSS, nombre d'éléments gardés, date de la dernière copie ;
- **Actualités**, par catégorie : nom, adresse du flux, pastille **OK** (articles lus), **ERREUR** (avec la raison, § 9) ou **—** (pas encore lue), nombre d'articles gardés, dont ceux du parc, et date du dernier ; filtre *En erreur*.

Toucher une source ouvre son site dans le navigateur. La liste se modifie dans WerbVeille (*Sources*), puis par un nouvel export. *← Retour au parc* (ou le geste retour) referme la page.

### 5.6 Régler la vérification automatique

Icône **⚙ › Vérification automatique** :

| Réglage | Choix | Conseil |
|---|---|---|
| **Fréquence** | 1 h, 3 h, **6 h** (par défaut), 12 h, 24 h, ou **Manuelle** (seulement le bouton *Vérifier*) | 6 h pour un téléphone d'astreinte ; 24 h suffit pour un suivi courant. Une vérification fréquente consomme plus de batterie et de données. |
| **Wi-Fi uniquement** | activé ou non | À activer sur un forfait limité : chaque vérification télécharge le catalogue KEV (environ 1,5 Mo), une ou plusieurs pages du NVD (plusieurs Mo) et les flux d'actualités (quelques Ko à plusieurs Mo chacun). |
| **Notifications** | activées ou non | Désactivées, les vérifications continuent et l'onglet Alertes se remplit, mais rien ne prévient. |
| **Notifications des actualités** | activées ou non | Notifie les nouveaux articles qui concernent le parc ; désactivées, l'onglet Actu se remplit sans prévenir. |
| **Conservation** | **1 mois** (par défaut), 2, 3 ou 6 mois | Durée pendant laquelle les CVE du NVD, les actualités et les alertes qui en découlent restent dans l'application, sans retélécharger. Plus long : plus d'historique, environ 10 Mo de plus par mois. |
| **Taille du texte** (*Affichage*) | −2, −1, **0** (taille d'origine), +1, +2 | S'ajoute au réglage de taille de police du téléphone ; s'applique aussitôt, y compris à l'écran de verrouillage de l'application. |

Le changement s'applique aussitôt et reste mémorisé (dans le coffre chiffré).

**Mémoire entre deux vérifications** : le dernier catalogue KEV et les CVE du NVD sont gardés dans un **tampon chiffré** sur le téléphone. Ouvrir l'application, la verrouiller ou redémarrer le téléphone ne les efface pas : inutile de toucher *Vérifier* pour les revoir. Au verrouillage, ces données **publiques** restent en mémoire (elles réapparaissent aussitôt) ; seuls le parc, les alertes et les actualités sont effacés de l'écran. Après un redémarrage, la relecture du tampon prend quelques secondes (« Chargement de la copie gardée… »).

**Vérification en arrière-plan** : elle tourne téléphone verrouillé et application fermée (tâche planifiée par Android, réseau requis, reprise après un redémarrage du téléphone). La première a lieu **une période après** l'import ou le changement de fréquence (l'import fait déjà une vérification) ; Android peut la décaler (économie d'énergie). La date de la dernière copie s'affiche en haut des onglets KEV et NVD. La **première** vérification charge les 7 derniers jours du NVD (une à deux minutes) ; le tampon se remplit ensuite au fil des vérifications, jusqu'à la durée choisie. Seules les CVE qui peuvent donner une alerte sont gardées (score ≥ seuil CVSS du parc, ou pas encore notées), soit environ 10 Mo par mois (40 000 CVE au plus). Le NVD publie plusieurs centaines de CVE par jour : au rattrapage d'une longue absence, les 10 000 plus récentes sont prises. Si le catalogue KEV ne répond pas, la copie gardée sert (message « copie du … utilisée »). Raccourcir la durée retire aussitôt les CVE et actualités plus anciennes. Android peut décaler une vérification (économie d'énergie, pas de réseau, pas de Wi-Fi) : les CVE publiées entre-temps sont rattrapées, **jusqu'à 30 jours en arrière**. Au-delà (téléphone éteint plus d'un mois, mode manuel oublié), les plus anciennes ne sont plus rapprochées : faire une vérification au moins une fois par mois.

### 5.7 Donner suite à une alerte

Le téléphone **prévient** ; le traitement se fait **dans WerbSMSI** :

1. Vérifier sur la fiche NVD si la **version installée** est concernée.
2. Dans **WerbVeille**, l'alerte correspondante (si la collecte du kit l'a aussi trouvée) passe en *Concerné* ou *Non concerné*, avec un commentaire.
3. Correctif ou mesure : **WerbExploitation** (mise à jour, changement, intervention) ; vulnérabilité exploitée sur un système critique : prévenir le RSSI.

---

### 5.8 Le téléphone du RSSI du groupe

Un RSSI du groupe peut suivre **tous les sites** sur un seul téléphone :

1. Chaque site publie sa veille : WerbVeille du site › *Intégration WerbSMSI* › **Publier** (`site:veille`).
2. Au groupe, une veille WerbVeille **rattachée au groupe** (*Intégration WerbSMSI* › « 🏢 Groupe ») relit ces publications : tableau des sites, alertes des sites, produits et mots-clés (lecture seule).
3. Elle a **sa propre clé d'émetteur** et sa liste de téléphones (*📱 Téléphone › Export groupe pour téléphone*) : mêmes étapes qu'au § 4.3 à 4.6.
4. Sur le téléphone, chaque site apparaît sous un **alias** (« Site 1 », « Usine Nord »…, *Alias des sites* dans WerbVeille au groupe) : jamais son code ni son nom. Les alertes et les actualités indiquent **« Sites : … »** ; une ligne de filtres permet de n'afficher qu'un site ; l'onglet *Parc* présente une fiche par site.

Un téléphone déjà utilisé pour un site doit **oublier l'émetteur** (*⚙ Réglages*) avant de recevoir l'export du groupe : il n'en accepte qu'un.

## 6. Mettre à jour le parc du téléphone

Le téléphone ne voit que le parc du **dernier export**. Refaire un export (§ 4.5) puis l'importer (§ 4.6) quand :

- WerbExploitation a publié de nouveaux produits (nouveau logiciel, nouveau matériel, version changée, CPE ajouté) — après *⟳ Actualiser* dans WerbVeille ;
- les **mots-clés** ou les **exclusions** de WerbVeille ont changé ;
- le score CVSS minimal ou les sources ont changé.

Conseil : un export **chaque mois** et après chaque changement notable du parc. La colonne *Dernier export* de WerbVeille aide à suivre.

---

## 7. Gérer les clés dans la durée

### 7.1 Ajouter un téléphone

§ 4.2 puis § 4.4 à § 4.6 : même clé d'émetteur, nouvel export **pour ce téléphone** (un export est lisible par un seul téléphone).

### 7.2 Remplacer un téléphone

1. Sur le nouveau : installer l'application, enregistrer son certificat (§ 4.2).
2. Dans WerbVeille : ajouter le nouveau téléphone, **retirer l'ancien** (✕), enregistrer la base.
3. Sur l'ancien : *⚙ Réglages › Tout effacer*, puis désinstaller.

### 7.3 Après « Tout effacer » sur un téléphone

*Tout effacer* détruit le parc, les alertes **et les clés** du téléphone : son certificat change, l'émetteur n'est plus épinglé. Pour le remettre en service : enregistrer le **nouveau** certificat, dans WerbVeille **retirer** l'ancienne ligne et **ajouter** le nouveau certificat, exporter, importer (l'empreinte de l'émetteur est de nouveau demandée).

### 7.4 Téléphone perdu ou volé

1. **Tout de suite** : *Tout effacer* à distance par la gestion de flotte si le téléphone y est inscrit ; sinon, l'effacement à distance de Google (*Localiser mon appareil*).
2. Dans WerbVeille : **retirer le téléphone** (✕) et enregistrer la base — plus aucun export ne pourra lui être produit.
3. Évaluer l'exposition : le parc est **chiffré** sur le téléphone, et l'application exige le déverrouillage du téléphone ; un téléphone verrouillé ne livre rien. Un téléphone **déverrouillé** au moment de la perte expose la liste des produits et des alertes (ni site, ni TAG, ni adresse).
4. Informer le RSSI.

### 7.5 Renouveler la clé d'émetteur

À faire si le fichier `.wvkey.json` ou son mot de passe sont **perdus**, **exposés**, ou à l'occasion d'une revue de sécurité.

1. WerbVeille : *Remplacer la clé…* › nouveau mot de passe › ranger le nouveau fichier dans le coffre-fort, **supprimer l'ancien** du coffre-fort, enregistrer la base.
2. Noter la **nouvelle empreinte de l'émetteur**.
3. Sur **chaque téléphone** : *⚙ Réglages › Oublier l'émetteur*, puis importer un export signé par la nouvelle clé en **comparant l'empreinte** (§ 4.6).

> Tant qu'un téléphone n'a pas « oublié » l'ancien émetteur, il **refuse** les exports de la nouvelle clé (« Émetteur inconnu ») : c'est la protection attendue.

### 7.6 Mot de passe de la clé d'émetteur oublié

Il n'existe aucun moyen de le retrouver : c'est voulu. Renouveler la clé (§ 7.5).

### 7.7 Clé de signature de l'APK

Elle ne concerne que l'**installation et les mises à jour de l'application**, pas les exports : voir le guide « Créer la clé de signature et compiler l'APK » du projet WerbVeilleDroid. Toujours signer avec **la même clé**, sinon les téléphones refusent la mise à jour.

### 7.8 Calendrier conseillé

| Quand | Quoi |
|---|---|
| Chaque mois | Export et import du parc sur chaque téléphone ; vérifier que les alertes arrivent |
| À chaque changement notable du parc | Export et import |
| Chaque année (revue de sécurité) | Liste des téléphones à jour (retirer les inutilisés) ; vérifier que le fichier `.wvkey.json` et la clé de l'APK sont bien au coffre-fort avec leur mot de passe ; renouveler la clé d'émetteur si la politique l'exige |
| Départ d'un utilisateur | Retirer son téléphone, *Tout effacer* sur l'appareil |

---

## 8. Sécurité : ce qui circule et ce qui est protégé

| Élément | Où il se trouve | Protection |
|---|---|---|
| Parc complet du site (TAG, machines, site) | WerbSMSI seulement | droits de l'espace WerbSMSI ; **jamais exporté** |
| Parc du groupe (un parc par site, sous alias) | fichier `.wvdroid.json` du groupe, puis téléphone du RSSI | chiffré pour ce téléphone ; alias seulement (table au groupe) ; coffre chiffré |
| Parc minimal (produits, mots-clés, exclusions) | fichier `.wvdroid.json`, puis téléphone | chiffré pour un seul téléphone ; sur le téléphone, coffre chiffré (Keystore) |
| Alertes du parc | téléphone | coffre chiffré ; captures d'écran bloquées ; notifications sans détail |
| Flux KEV et NVD | Internet → téléphone | publics ; HTTPS, sites autorisés seulement |
| Tampon KEV et NVD | téléphone (`flux.bin`) | chiffré par la clé du Keystore, comme le coffre ; hors sauvegarde ; effacé par *Tout effacer* |
| Sources d'actualités | export signé, puis Internet → téléphone | liste signée par l'émetteur (domaines publics en HTTPS seulement) ; analyse XML sans entités externes ; articles de la durée de conservation, dans le coffre |
| Clé d'émetteur (privée) | fichier `.wvkey.json` | mot de passe (PBKDF2 600 000 itérations, AES-256) ; coffre-fort |
| Clé de l'appareil (privée) | Keystore du téléphone | non exportable |

**Règles à respecter**

- Ne jamais écrire un mot de passe (clé d'émetteur, clé de l'APK) dans un fichier, un message, un ticket ou une conversation.
- Comparer **toujours** les empreintes (ajout d'un téléphone, premier import).
- Ne jamais importer sur le téléphone un `config.json` **en clair** en usage réel : l'application l'accepte après avertissement, mais il contient le code du site et les TAG.
- N'installer que l'APK signée par votre clé (empreinte vérifiée).
- Avant tout usage sur un parc réel : **validation du RSSI** (voir la feuille de route du projet WerbVeilleDroid).

---

## 9. Messages et solutions

### Sur le téléphone

| Message | Cause | Solution |
|---|---|---|
| « Verrouillage d'écran requis » | le téléphone n'a ni code, ni schéma, ni empreinte | en définir un dans les paramètres du téléphone |
| « Ce fichier a été chiffré pour un autre appareil. » | export produit pour un autre téléphone, ou pour l'ancien certificat de celui-ci (après *Tout effacer*) | dans WerbVeille, vérifier l'empreinte du téléphone ; remettre le certificat actuel (§ 7.3) ; exporter pour la bonne ligne |
| « Émetteur inconnu : ce fichier ne vient pas du poste autorisé. Refusé. » | export signé par une autre clé que celle épinglée (clé renouvelée, outil Python, autre veille) | si c'est voulu : *⚙ Réglages › Oublier l'émetteur*, puis réimporter en comparant l'empreinte (§ 7.5) ; sinon, ne rien faire et prévenir le RSSI |
| « Signature invalide : fichier modifié ou falsifié. » | fichier abîmé ou modifié en chemin | refaire l'export et le transmettre à nouveau ; si cela se répète, prévenir le RSSI |
| « Déchiffrement impossible : fichier modifié ou destiné à un autre appareil. » | fichier tronqué, ou clés du téléphone changées | refaire l'export ; voir § 7.3 |
| « Fichier non reconnu … » | ce n'est pas un `.wvdroid.json` (ou un `config.json` de kit) | choisir le bon fichier |
| « Fichier trop volumineux (2 Mo au plus). » | mauvais fichier | choisir le `.wvdroid.json` |
| « Fichier non chiffré » (fenêtre) | un `config.json` de kit en clair a été choisi | *Refuser* en usage réel ; exporter depuis WerbVeille |
| « NVD indisponible (HTTP 503) : nouvel essai à la prochaine vérification. » | le NVD est surchargé (fréquent) | rien à faire : le catalogue KEV a été traité, la période NVD manquée sera reprise |
| « NVD injoignable (réseau ou délai dépassé) : nouvel essai à la prochaine vérification. » | le NVD répond trop lentement (fréquent pour un mois de CVE) | rien à faire : KEV et actualités sont traités, le tampon NVD reste disponible, la période manquée sera reprise |
| « Réseau indisponible ou source injoignable. » | pas de connexion | vérifier le Wi-Fi ou les données ; *Vérifier* plus tard |
| *Actu* : « … — déplacée vers *site* : adresse à mettre à jour dans WerbVeille » | la source a changé d'adresse (par exemple le CERT-FR, passé de `www.cert.ssi.gouv.fr` à `cert.cyber.gouv.fr`) ; le téléphone ne suit pas une redirection vers un site non signé | corriger l'adresse dans WerbVeille (*Sources*), puis refaire l'export |
| *Actu* : « … — accès refusé par le site (HTTP 403) » | le site bloque les clients automatiques ou certains réseaux | réessayer plus tard ou depuis un autre réseau ; sinon, désactiver la source dans WerbVeille |
| *Actu* : « … — le site a répondu sans flux RSS (page de protection ?) » | page anti-robot ou page HTML au lieu du flux | vérifier l'adresse du flux dans WerbVeille (*Tester*) |
| *Actu* : « … — injoignable » / « flux illisible » | réseau, ou flux mal formé | *Vérifier* plus tard ; tester la source dans WerbVeille |
| Onglet *Actu* vide, sans erreur | parc exporté par WerbVeille avant 1.8.0 (sans sources), ou aucune source active publique | refaire l'export depuis WerbVeille 1.8.0 ou plus |
| Aucune notification depuis longtemps | aucune nouvelle alerte ; *⚙ Réglages › Notifications* désactivé ; fréquence *Manuelle* ; *Wi-Fi uniquement* sans Wi-Fi ; notifications du téléphone bloquées ; économie d'énergie qui bloque l'application | *Vérifier* à la main ; contrôler *⚙ Réglages › Vérification automatique* ; autoriser les notifications ; exclure l'application de l'optimisation de la batterie |

### Dans WerbVeille

| Message | Cause | Solution |
|---|---|---|
| *Exporter…* ouvre une fenêtre « Ouvrir un fichier » | normal : l'export se signe avec la **clé d'émetteur**, demandée à chaque fois | choisir `WerbVeille_cle_emetteur_<date>.wvkey.json` (coffre-fort), saisir son mot de passe ; le `.wvdroid.json` est ensuite téléchargé |
| « ce fichier n'est pas la clé d'émetteur de cette veille » | fichier de clé d'une autre veille (site ou groupe) ou d'une ancienne clé remplacée | choisir le fichier dont l'empreinte correspond à celle affichée dans la carte *🔑 Clé d'émetteur* |
| Bouton *Exporter…* grisé | pas de clé d'émetteur, base en lecture seule, ou contenu impossible (voir la carte *Contenu de l'export*) | créer la clé (§ 4.3) ; ouvrir la base en écriture ; corriger le point signalé |
| « mot de passe incorrect ou fichier de clé altéré » | mauvais mot de passe, ou fichier abîmé | reprendre le mot de passe et le fichier dans le coffre-fort ; sinon renouveler la clé (§ 7.5) |
| « ce fichier n'est pas la clé d'émetteur de cette veille » | fichier `.wvkey.json` d'une autre veille, ou ancienne clé | choisir la clé dont l'empreinte est affichée dans la carte *Clé d'émetteur* |
| « Certificat refusé : … » | le fichier choisi n'est pas le certificat de l'application | *⚙ Réglages › Enregistrer le certificat* sur le téléphone, puis choisir ce `.pem` |
| « Ce téléphone est déjà enregistré » | même certificat ajouté deux fois | rien à faire ; utiliser la ligne existante |
| « Mot de passe trop court » / « La confirmation ne correspond pas » | à la création de la clé | 12 caractères au moins, saisis deux fois à l'identique |

---

## 10. Listes de contrôle

**Mise en service d'un téléphone**

- [ ] Verrouillage d'écran défini, application installée et déverrouillée, notifications autorisées
- [ ] Certificat enregistré et remis au poste
- [ ] Empreinte du certificat **comparée** à l'ajout dans WerbVeille
- [ ] Base WerbVeille enregistrée
- [ ] Export produit et importé ; empreinte de l'émetteur **comparée**
- [ ] Onglet Alertes rempli après la première vérification

**Clé d'émetteur**

- [ ] Mot de passe (20 caractères) dans le coffre-fort
- [ ] Fichier `.wvkey.json` dans le coffre-fort, nulle part ailleurs
- [ ] Empreinte de l'émetteur notée

---

## 11. Glossaire

| Terme | Définition |
|---|---|
| **Parc minimal** | Ce que reçoit le téléphone : éditeur, produit, version, CPE, mots-clés, exclusions, réglages des sources ; jamais le site, les TAG ni les adresses |
| **Export** | Fichier `.wvdroid.json` produit par WerbVeille : le parc minimal chiffré pour un téléphone et signé |
| **Certificat** | Partie publique de la clé de l'appareil ; permet de chiffrer pour ce téléphone |
| **Émetteur** | La veille qui signe les exports ; identifiée par son empreinte |
| **Épingler** | Le téléphone retient l'empreinte de l'émetteur au premier import et refuse ensuite tout autre émetteur |
| **Empreinte** | Résumé SHA-256 d'une clé, affiché en 16 groupes de 4 caractères ; deux empreintes identiques = la même clé |
| **Keystore** | Zone sécurisée du téléphone où sont créées et utilisées les clés, sans pouvoir les extraire |
| **KEV** | *Known Exploited Vulnerabilities* : catalogue de la CISA des vulnérabilités activement exploitées |
| **NVD** | *National Vulnerability Database* du NIST : toutes les CVE publiées, avec leur score |
| **CVE / CVSS** | Identifiant d'une vulnérabilité / score de gravité de 0 à 10 |
| **CPE** | Identifiant normalisé d'un produit (`cpe:2.3:o:fortinet:fortios`) ; permet un rapprochement sûr avec le NVD |

> Ce guide est tenu dans le projet WerbVeilleDroid (docs/GUIDE_UTILISATION.md) et recopié ici à chaque version de WerbVeille.
