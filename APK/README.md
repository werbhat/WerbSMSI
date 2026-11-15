<!-- WerbSMSI – Développé par @WerbHat -->
# Application WerbVeille Droid (Android)

Application Android de veille de vulnérabilités, à utiliser avec le module **WerbVeille** (*Collecte › Export pour téléphone*). Projet distinct de WerbSMSI : ce dossier ne fait que la mettre à disposition.

| | |
|---|---|
| Fichier | **[WerbVeilleDroid-0.9.0.apk](WerbVeilleDroid-0.9.0.apk)** (2405 Ko) |
| Version | 0.9.0 |
| Empreinte SHA-256 du fichier | `40B1 2E9A 924E 44D0 F4BD 818C E9F1 2996 B0D8 FEAC F880 64DB D4E5 932C 3DCC 9354` |
| Signé par | CN=WerbHat, OU=WerbVeille Droid, C=FR |
| Empreinte SHA-256 du certificat de signature | `A650 622C AFF6 8CA2 CBC1 4128 8027 7476 9D2E 9FEA 1A7B 6B2D 93D7 27C6 A9D2 6CAF` |
| Android | 8 ou plus récent, avec un verrouillage d'écran |

## Vérifier avant d'installer

L'empreinte du fichier doit être celle ci-dessus (Windows : `certutil -hashfile WerbVeilleDroid-0.9.0.apk SHA256` ; Git Bash : `sha256sum WerbVeilleDroid-0.9.0.apk`), et l'empreinte du certificat de signature doit être la même d'une version à l'autre : une autre empreinte signifie une application qui ne vient pas de vous.

## Installer

1. Copier `WerbVeilleDroid-0.9.0.apk` sur le téléphone (ou, par câble USB : `adb install WerbVeilleDroid-0.9.0.apk`).
2. L'ouvrir et autoriser *Installer des applications inconnues* pour l'application qui l'ouvre. Une ancienne version signée par une autre clé doit d'abord être désinstallée.
3. Suivre le guide **« WerbVeille Droid : la veille sur téléphone »** (WerbVeille › ❓ Aide) : certificat du téléphone, clé d'émetteur, export, import.

Avant tout usage sur un parc réel : validation du RSSI.

*Mis à disposition le 2026-11-15 par `WerbVeilleDroid/outils/publier_apk.sh`.*
