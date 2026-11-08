# Sécurité — WerbNIS2

> Version **1.8.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbNIS2 est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne. Une base WerbNIS2 décrit les écarts de sécurité d'une entité : c'est une information sensible, à protéger comme telle.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbnis2.` à l'ouverture et à la fermeture |
| Accès non autorisé à une base | Droits du dossier sur le drive protégé (hors du périmètre de l'outil) : réserver `sites/<CODE>/conformite/` à l'équipe du site et au groupe |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par un fichier importé | Échappement systématique (`WerbSocle.esc`), pas de gestionnaire d'événement en ligne, contrôle de l'enveloppe et des identifiants de points à l'ouverture |
| Écrasement du travail d'un collègue | Détection de modification du fichier avant enregistrement |
| Évaluations réelles dans le dépôt source | L'extracteur ne reprend que le référentiel du classeur ; le classeur est exclu du dépôt (`.gitignore`) ; l'exemple est fictif |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

## Limites connues

- Toute personne qui peut lire le fichier de base peut en lire le contenu : il n'est pas chiffré.
- Le rapport imprimé ou enregistré en PDF sort du périmètre de l'outil : le classer et le diffuser selon sa classification.
- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbNIS2** — Développé par **@WerbHat**
