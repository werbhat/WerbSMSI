# Sécurité — WerbIEC62443

> Version **1.4.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbIEC62443 est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne. Les données d'un projet (exigences, statuts, preuves, prestataires) sont **sensibles** : elles décrivent le niveau de sécurité réel d'une installation industrielle.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, bibliothèques embarquées |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbiec62443.` à l'ouverture, à la fermeture et sur *Purger* |
| Effacement des données d'un autre outil | Purge limitée au préfixe du module (en `file://`, toutes les pages partagent le même stockage) |
| Accès non autorisé à un projet | Droits du dossier sur le drive protégé (hors du périmètre de l'outil) |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée (`WerbIEC62443.sha256`, `module.json`) et vérifiée par le portail WerbSMSI |
| Bibliothèque tierce altérée | Fichiers officiels figés, SHA-256 vérifié par `build.py` à chaque assemblage |
| Injection (XSS) par un fichier importé | Échappement systématique, pas de gestionnaire d'événement en ligne, contrôle du format à l'ouverture |
| Écrasement du travail d'un collègue | Verrou (expiration 12 h), détection de modification du fichier avant enregistrement |
| Diffusion excessive vers le groupe | Publication sur action explicite ; seuls taux, compteurs et identité des prestataires (sans contact ni contrat) sont publiés |
| Fuite d'informations dans un export prestataire | Notes internes jamais exportées, chemins réseau retirés, niveau maximal de classification des documents cités |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

`'unsafe-eval'` a été retiré en 1.3.0. JSZip contient un appel `new Function` dans une prothèse de `setImmediate`, qui n'est utilisé que si on lui passe une chaîne au lieu d'une fonction : ce cas ne se produit pas. Les exports Word, Excel et avec modèle d'entreprise sont vérifiés sans `'unsafe-eval'` par `tests/test_parcours.py`.

## Limites connues

- Le fichier projet n'est pas chiffré : toute personne qui peut le lire en lit le contenu. La protection repose sur les droits du dossier.
- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.
- Le nom saisi à l'ouverture sert à la traçabilité ; ce n'est pas une authentification.
- Les poignées de fichiers et de dossiers ne sont pas mémorisées : l'utilisateur rouvre son projet et son espace à chaque session.

## Composants tiers

Fichiers officiels des paquets npm, intégrité vérifiée contre le registre (`dist.integrity`) au moment de l'import, en octobre 2026.

| Bibliothèque | Version | Fichier embarqué | SHA-256 | Licence |
|---|---|---|---|---|
| docx | 9.8.1 | `sources/vendor/docx-9.8.1.iife.js` (`dist/index.iife.js`) | `1a1c55af6242bc9bc1d89cba76f656e79e9b4b3c43228e17bee8cda0b9dffad1` | MIT |
| JSZip | 3.10.1 | `sources/vendor/jszip-3.10.1.min.js` (`dist/jszip.min.js`) | `acc7e41455a80765b5fd9c7ee1b8078a6d160bbbca455aeae854de65c947d59e` | MIT ou GPLv3 |

Intégrité des paquets npm :
- `docx-9.8.1.tgz` : `sha512-bv4yDxgiV9aRyh327HG+V36wG0f23wk32SDhXGQpUhnykVtIPaR1K4ISi8E+DYJ7OcRQRkR8Y70QYlSS08V1cA==`
- `jszip-3.10.1.tgz` : `sha512-xXDvecyTpGLrqFrvkrUSoxxfJI5AH7U8zxxtVclpsUtMCq4JQ290LY8AW5c7Ggnr/Y/oK+bQMbqK2qmtk3pN4g==`

Pour changer de version : télécharger le paquet, vérifier son intégrité contre le registre, copier le fichier dans `sources/vendor/`, mettre à jour `VENDOR` dans `build.py` et ce tableau.

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbIEC62443** — Développé par **@WerbHat**
