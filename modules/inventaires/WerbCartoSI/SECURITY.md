# Sécurité — WerbCartoSI

> Version **1.5.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbCartoSI est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, bibliothèques embarquées |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbcartosi.` à l'ouverture et à la fermeture |
| Accès non autorisé à une base | Droits du dossier sur le drive protégé (hors du périmètre de l'outil) |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par un fichier importé | Échappement systématique (`WerbSocle.esc`), pas de gestionnaire d'événement en ligne, contrôle de l'enveloppe à l'ouverture |
| Injection de formules dans un export Excel | Cellules écrites en texte |
| Écrasement du travail d'un collègue | Détection de modification du fichier avant enregistrement, verrou commun |
| Divulgation de l'architecture du site | Schémas jamais copiés dans la base ; rangement dans le dossier du site (droits du drive) ; classification de chaque schéma tracée ; export Excel marqué « Diffusion restreinte » |
| Diffusion de l'architecture par la publication | `site:cartographies` ne contient que des métadonnées (titres, versions, dates, états, identifiants WerbMap déjà publiés) : ni lien, ni chemin, ni description, ni périmètre libre ; fichier rangé dans le dossier du site (droits du drive), lu par l'équipe du groupe |
| Modèle Visio piégé | Seuls les fichiers .vstx et .vsdx sans macros sont acceptés ; le module n'exécute rien, il remplace du texte dans les parties XML et recopie les autres telles quelles ; valeurs du cartouche échappées en XML |
| Écriture hors du dossier prévu | Le module n'écrit le schéma créé qu'à l'endroit choisi par l'utilisateur dans la fenêtre d'enregistrement d'Edge ; il n'écrit jamais dans le dossier des modèles |
| Ouverture d'un lien piégé | Seules les adresses `https://` s'ouvrent, dans un nouvel onglet, sur clic (`noopener noreferrer`) ; les chemins réseau sont seulement copiés |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

<!-- Si 'unsafe-eval' est nécessaire, indiquer ici la bibliothèque qui l'exige. -->

## Limites connues

- Toute personne qui peut lire le fichier de base peut en lire le contenu : il n'est pas chiffré.
- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.
- La présence d'un fichier n'est vérifiable que dans l'espace SMSI ; une adresse web ou un chemin réseau ne sont pas contrôlés depuis le navigateur.
- Le navigateur ne peut pas lancer Visio sur un fichier du disque : le chemin complet est copié pour l'Explorateur. L'ouverture directe (`ms-visio:`, essai, désactivée par défaut) passe par l'autorisation d'Edge et dépend de la version d'Office.
- Un modèle contenant des données réelles les reproduit dans chaque schéma créé : les modèles doivent rester des gabarits vides.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbCartoSI** — Développé par **@WerbHat**
