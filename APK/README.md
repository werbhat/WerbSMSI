<!-- WerbSMSI – Développé par @WerbHat -->
# Application WerbVeille Droid (Android)

Application Android de veille de vulnérabilités, à utiliser avec le module **WerbVeille** (*Collecte › Export pour téléphone*). Projet distinct de WerbSMSI : ce dossier ne fait que la mettre à disposition.

| | |
|---|---|
| Fichier | **[WerbVeilleDroid-0.8.1.apk](WerbVeilleDroid-0.8.1.apk)** (2389 Ko) |
| Version | 0.8.1 |
| Empreinte SHA-256 du fichier | `CC54 4192 4580 C07E 48B9 AFCB 5D95 528E 5626 3209 6493 FA42 772C CF2E D456 3149` |
| Signé par | CN=WerbHat, OU=WerbVeille Droid, C=FR |
| Empreinte SHA-256 du certificat de signature | `A650 622C AFF6 8CA2 CBC1 4128 8027 7476 9D2E 9FEA 1A7B 6B2D 93D7 27C6 A9D2 6CAF` |
| Android | 8 ou plus récent, avec un verrouillage d'écran |

## Vérifier avant d'installer

L'empreinte du fichier doit être celle ci-dessus (Windows : `certutil -hashfile WerbVeilleDroid-0.8.1.apk SHA256` ; Git Bash : `sha256sum WerbVeilleDroid-0.8.1.apk`), et l'empreinte du certificat de signature doit être la même d'une version à l'autre : une autre empreinte signifie une application qui ne vient pas de vous.

## Installer

1. Copier `WerbVeilleDroid-0.8.1.apk` sur le téléphone (ou, par câble USB : `adb install WerbVeilleDroid-0.8.1.apk`).
2. L'ouvrir et autoriser *Installer des applications inconnues* pour l'application qui l'ouvre. Une ancienne version signée par une autre clé doit d'abord être désinstallée.
3. Suivre le guide **« WerbVeille Droid : la veille sur téléphone »** (WerbVeille › ❓ Aide) : certificat du téléphone, clé d'émetteur, export, import.

Avant tout usage sur un parc réel : validation du RSSI.

*Mis à disposition le 2026-11-14 par `WerbVeilleDroid/outils/publier_apk.sh`.*
