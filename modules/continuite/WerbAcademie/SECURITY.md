# Sécurité — WerbAcademie

> Version **1.4.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbAcademie est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, bibliothèques embarquées |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbacademie.` à l'ouverture et à la fermeture |
| Accès non autorisé à une base | Droits du dossier sur le drive protégé (hors du périmètre de l'outil) |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par un fichier importé | Échappement systématique (`WerbSocle.esc`), pas de gestionnaire d'événement en ligne, contrôle de l'enveloppe à l'ouverture |
| Injection de formules dans un export Excel | Cellules écrites en texte |
| Écrasement du travail d'un collègue | Détection de modification du fichier avant enregistrement |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

<!-- Si 'unsafe-eval' est nécessaire, indiquer ici la bibliothèque qui l'exige. -->

## Limites connues

- Toute personne qui peut lire le fichier de base peut en lire le contenu : il n'est pas chiffré.
- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.
- La base contient des **données personnelles** (nom, fonction, population, site des collaborateurs) : la ranger dans un dossier aux droits restreints ; respecter la durée de conservation indiquée dans le module.
- Les liens des formations ouvrent des sites externes dans un nouvel onglet (`noopener noreferrer`), hors de la page : ils ne contournent pas la CSP du module.
- **Présentation HTML générée** : CSP `default-src 'none'` (scripts et styles en ligne, images `data:` seulement), aucun stockage, aucune requête ; le contenu de la formation y est échappé.
- **PptxGenJS 4.0.1** (MIT) est figé dans le dépôt avec son empreinte ; il contient un `new Function` (polyfill `setImmediate`) jamais appelé par le module, que la CSP sans `unsafe-eval` bloquerait de toute façon.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbAcademie** — Développé par **@WerbHat**
