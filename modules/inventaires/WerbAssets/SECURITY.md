# Sécurité — WerbAssets

> Version **1.0.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbAssets est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, bibliothèques embarquées |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbassets.` à l'ouverture et à la fermeture |
| Accès non autorisé à une base | Droits du dossier sur le drive protégé (hors du périmètre de l'outil) |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par un fichier importé | Échappement systématique (`WerbSocle.esc`), pas de gestionnaire d'événement en ligne, contrôle de l'enveloppe à l'ouverture |
| Injection de formules dans un export Excel | Cellules écrites en texte |
| Écrasement du travail d'un collègue | Verrou commun des bases (socle 1.5.0) et détection de modification du fichier avant enregistrement |
| Divulgation de la configuration réseau | Rien n'est publié vers l'espace : adresses IP, VLAN, numéros de série et raccordements restent dans la base du site (`sites/<CODE>/inventaires/`) |
| Secrets dans la base | La procédure de sécurisation n'enregistre que l'état d'un point (fait, à faire, non applicable) ; l'interface rappelle de ne jamais saisir de mot de passe ni de clé |
| Classeur Excel piégé à l'import | Archive lue par le navigateur (20 Mo au plus), valeurs lues comme du texte, aucune formule ni macro exécutée, rapport avant toute modification |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

<!-- Si 'unsafe-eval' est nécessaire, indiquer ici la bibliothèque qui l'exige. -->

## Limites connues

- Toute personne qui peut lire le fichier de base peut en lire le contenu : il n'est pas chiffré.
- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.
- Les classeurs Excel exportés et les impressions PDF contiennent la configuration des équipements : ils doivent être rangés avec les mêmes droits que la base et supprimés après usage.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbAssets** — Développé par **@WerbHat**
