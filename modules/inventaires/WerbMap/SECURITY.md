# Sécurité — WerbMap

> Version **1.3.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbMap est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne. Une base WerbMap décrit le réseau d'un site industriel (VLAN, adressage, équipements, flux autorisés) : c'est une information **sensible**, utile à un attaquant.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe ; seules bibliothèques tierces : JSZip 3.10.1 et docx 9.8.1 (fiche Word), embarquées et figées, empreinte contrôlée au build |
| Données laissées sur le poste | Rien dans le navigateur : modifications en cours en mémoire seulement ; purge des clés `werb.werbmap.` et des données laissées par WerbMap ≤ 1.1 (brouillons avec empreintes des mots de passe, base et modèle mémorisés) |
| Effacement des données d'un autre outil | Purge limitée à WerbMap (en `file://`, toutes les pages partagent le même stockage) |
| Accès non autorisé à une base | Droits du dossier (drive protégé du site ou SharePoint). Les comptes WerbMap tracent et séparent les rôles, ils ne protègent pas le fichier |
| Modification d'une base hors de l'outil | Chaîne d'intégrité SHA-256 des versions (inventaire, comptes, journal) ; alerte « fichier modifié hors de l'outil » |
| Écrasement du travail d'un collègue | Contrôle du numéro de version avant enregistrement ; brouillon téléchargé et rechargement en cas de conflit |
| Session laissée ouverte | Verrouillage après 15 minutes d'inactivité |
| Mots de passe | Empreintes PBKDF2-SHA256 (150 000 itérations, sel aléatoire), jamais en clair |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée (`WerbMap.sha256`, `module.json`) et vérifiée par le portail WerbSMSI |
| Injection (XSS) par un fichier importé | Échappement systématique des valeurs affichées ; liens limités aux schémas `http(s)` et `file` |
| Diffusion excessive vers le groupe | Publication sur action explicite, réservée aux éditeurs ; seuls zones, conduits et identité des actifs sont publiés |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

## Limites connues

- Le fichier de base n'est pas chiffré : toute personne qui peut le lire en lit le contenu, y compris les empreintes des mots de passe des comptes WerbMap. Choisissez des mots de passe propres à WerbMap.
- La chaîne d'intégrité détecte une modification hors de l'outil ; elle ne l'empêche pas et ne protège pas contre un auteur qui recalculerait les empreintes.
- `'unsafe-inline'` est nécessaire, l'outil tenant dans un seul fichier.
- L'export « Remplir mon classeur modèle » conserve les propriétés du modèle de l'entreprise : il ne porte pas la signature de WerbMap dans ses propriétés (l'export « Classeur simple » la porte).

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | Lecture et écriture des classeurs Excel en JavaScript natif (`DecompressionStream`, `CompressionStream`) |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbMap** — Développé par **@WerbHat**
