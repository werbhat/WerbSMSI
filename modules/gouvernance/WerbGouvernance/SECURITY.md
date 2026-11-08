# Sécurité — WerbGouvernance

> Version **1.10.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbGouvernance est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne. La base de gouvernance décrit l'organisation de la sécurité du groupe, son socle de mesures et ses écarts : elle est **sensible** et se range dans `groupe/gouvernance/`, réservé à l'équipe SMSI du groupe.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe ; bibliothèques Word embarquées dans le fichier |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbgouvernance.` à l'ouverture et à la fermeture |
| Accès non autorisé à la base | Droits du dossier `groupe/` sur le drive protégé (hors du périmètre de l'outil) |
| Application modifiée | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail WerbSMSI |
| Injection (XSS) par un fichier ouvert ou importé | Échappement systématique de toutes les valeurs affichées, normalisation des données à l'ouverture, contrôle du format |
| Écrasement du travail d'un collègue | Détection de modification du fichier avant enregistrement |
| Diffusion excessive vers les sites | Publication sur action explicite, base enregistrée, auteur tracé ; titulaires des rôles et contacts des prestataires jamais publiés |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

## Limites connues

- Le fichier de base n'est pas chiffré : toute personne qui peut le lire en lit le contenu.
- Le nom saisi à l'ouverture sert à la traçabilité ; ce n'est pas une authentification.
- `'unsafe-inline'` est nécessaire, l'outil tenant dans un seul fichier.
- Le modèle de l'entreprise (.docx) est copié dans la base : n'y mettez pas d'information plus sensible que la base elle-même. Les documents produits (PSSI, charte) portent la classification choisie ; leur diffusion relève de l'utilisateur.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| JSZip | 3.10.1 | MIT (ou GPLv3) | Lecture et écriture des archives .docx (modèle de l'entreprise) |
| docx | 9.8.1 | MIT | Génération des documents Word (PSSI, charte utilisateur) |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbGouvernance** — Développé par **@WerbHat**
