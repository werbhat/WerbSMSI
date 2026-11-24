<!-- WerbSMSI – Développé par @WerbHat -->
# Application WerbTagDroid (Android)

Lecture des **étiquettes d'actifs chiffrées et signées** produites par le module **WerbMap** (*Inventaires › Étiquettes*). Projet distinct de WerbSMSI : ce dossier ne fait que la mettre à disposition. Sans réseau, en lecture seule, rien n'est stocké sur le téléphone.

| | |
|---|---|
| Fichier | **[WerbTagDroid-0.5.0.apk](WerbTagDroid-0.5.0.apk)** (1796 Ko) |
| Version | 0.5.0 |
| Empreinte SHA-256 du fichier | `2D75 E2EC 0E27 930C F2B0 FB4B 7CCB BD87 D33F C4C8 5648 677F A781 A624 E324 0B33` |
| Signé par | CN=WerbHat, OU=WerbTagDroid, C=FR |
| Empreinte SHA-256 du certificat de signature | `436A 090C 2A78 D5B0 C275 A5D7 D6BF 5496 DD78 4790 A222 799A EC05 2915 D11E 1DD5` (clé dédiée à WerbTagDroid, la même d'une version à l'autre) |
| Émetteur des étiquettes compilé | `5CB9 654B 6B18 78E1 E136 30C3 B3F9 188F 46A4 B5D5 87C6 8E88 3B1A 712B 9430 1DB0` — doit être l'**empreinte de l'émetteur** affichée par WerbMap (*Inventaires › Étiquettes › Clés de l'émetteur*) |
| Android | 8 ou plus récent, caméra |

## Vérifier avant d'installer

L'empreinte du fichier doit être celle ci-dessus (Windows : `certutil -hashfile WerbTagDroid-0.5.0.apk SHA256` ; Git Bash : `sha256sum WerbTagDroid-0.5.0.apk`), l'empreinte du certificat de signature la même d'une version à l'autre, et l'émetteur compilé celui de votre site : une APK compilée pour un autre émetteur refuse toutes vos étiquettes (« Étiquette non authentique »).

## Installer

1. Copier `WerbTagDroid-0.5.0.apk` sur le téléphone (ou, par câble USB : `adb install WerbTagDroid-0.5.0.apk`).
2. L'ouvrir et autoriser *Installer des applications inconnues* pour l'application qui l'ouvre. Une version d'essai (signée par la clé de mise au point) doit d'abord être désinstallée.
3. Autoriser la caméra au premier lancement.

## Mettre en service (badge de clés)

L'application ne contient **aucune clé de site** : elles sont remises par un **badge de clés**, à chaque ouverture.

1. Dans l'application : **📤 Enrôler ce téléphone** → enregistrer `WerbTagDroid_<identifiant>.pem` et le remettre au poste WerbMap.
2. WerbMap › *Inventaires › Étiquettes* (fichier de clés de l'émetteur ouvert) : **📥 Enrôler** le téléphone — l'identifiant doit être celui affiché par l'application — puis **🔑 Badge** : imprimer le badge, remettre le **code à usage unique à part**.
3. À l'ouverture de l'application : scanner le badge, saisir le code ; les étiquettes se lisent jusqu'à la fermeture, 15 minutes d'inactivité ou la fin du badge.

Avant tout usage sur un site réel : validation du RSSI.

*Mis à disposition le 2026-11-24 par `WerbTagDroid/outils/publier_apk.sh`.*
