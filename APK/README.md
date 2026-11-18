<!-- WerbSMSI – Développé par @WerbHat -->
# Application WerbVeille Droid (Android)

Application Android de veille de vulnérabilités, à utiliser avec le module **WerbVeille** (*Collecte › Export pour téléphone*). Projet distinct de WerbSMSI : ce dossier ne fait que la mettre à disposition.

| | |
|---|---|
| Fichier | **[WerbVeilleDroid-1.0.2.apk](WerbVeilleDroid-1.0.2.apk)** (2437 Ko) |
| Version | 1.0.2 |
| Empreinte SHA-256 du fichier | `BFE0 8A22 E9A0 1E1F 1AF4 4614 EFDD 0F4E D76E CB15 94EB 4043 DFCD 3932 A0A1 7754` |
| Signé par | CN=WerbHat, OU=WerbVeille Droid, C=FR |
| Empreinte SHA-256 du certificat de signature | `A650 622C AFF6 8CA2 CBC1 4128 8027 7476 9D2E 9FEA 1A7B 6B2D 93D7 27C6 A9D2 6CAF` |
| Android | 8 ou plus récent, avec un verrouillage d'écran |

## Vérifier avant d'installer

L'empreinte du fichier doit être celle ci-dessus (Windows : `certutil -hashfile WerbVeilleDroid-1.0.2.apk SHA256` ; Git Bash : `sha256sum WerbVeilleDroid-1.0.2.apk`), et l'empreinte du certificat de signature doit être la même d'une version à l'autre : une autre empreinte signifie une application qui ne vient pas de vous.

## Installer

1. Copier `WerbVeilleDroid-1.0.2.apk` sur le téléphone (ou, par câble USB : `adb install WerbVeilleDroid-1.0.2.apk`).
2. L'ouvrir et autoriser *Installer des applications inconnues* pour l'application qui l'ouvre. Une ancienne version signée par une autre clé doit d'abord être désinstallée.
3. Suivre le guide **« WerbVeille Droid : la veille sur téléphone »** (WerbVeille › ❓ Aide) : certificat du téléphone, clé d'émetteur, export, import.

Avant tout usage sur un parc réel : validation du RSSI.

*Mis à disposition le 2026-11-18 par `WerbVeilleDroid/outils/publier_apk.sh`.*
