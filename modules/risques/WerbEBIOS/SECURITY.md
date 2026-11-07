# Sécurité — WerbEBIOS

> Version **1.0.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbEBIOS est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, bibliothèques embarquées et figées (empreinte contrôlée à l'assemblage) |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbebios.` à l'ouverture et à la fermeture |
| Accès non autorisé à une analyse | Droits des dossiers `groupe/risques/` et `sites/<CODE>/risques/` sur le drive protégé (hors du périmètre de l'outil) |
| Diffusion excessive vers le groupe | Publication explicite ; au site, seuls les niveaux de risque et les biens supports (nom, actifs) sont publiés, jamais les scénarios |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par un fichier ouvert ou une publication | Échappement systématique (`WerbSocle.esc`), pas de gestionnaire d'événement en ligne, contrôle de l'enveloppe et normalisation des données à l'ouverture |
| Injection de formules dans un export CSV | Cellule commençant par `=`, `+`, `-` ou `@` préfixée d'une apostrophe |
| Écrasement du travail d'un collègue | Détection de modification du fichier avant enregistrement |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

## Limites connues

- Toute personne qui peut lire le fichier d'analyse peut en lire le contenu : il n'est pas chiffré.
- Le nom saisi à l'ouverture sert à la traçabilité du journal, pas à l'authentification.
- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| JSZip | 3.10.1 | MIT (ou GPLv3) | Archive du document Word |
| docx | 9.8.1 | MIT | Génération du rapport Word |

Les deux bibliothèques sont regroupées dans `sources/vendor/bibliotheques.js`, identique à celui de WerbIEC62443 (SHA-256 `b656aea1f9fdcc6f945cf83ef3cff99c448ebf2ecc0b5e85738a048a6f124d06`, contrôlé par `build.py`).

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbEBIOS** — Développé par **@WerbHat**
