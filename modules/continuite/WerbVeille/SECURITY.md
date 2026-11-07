# Sécurité — WerbVeille

> Version **1.0.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbVeille est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, bibliothèques embarquées ; la page ne lance jamais la collecte |
| Lien malveillant dans un flux | Seules les adresses http / https sont cliquables, ouvertes dans un nouvel onglet sur clic (`noopener noreferrer`, pas de référent) ; titre et résumé échappés |
| Résultat de collecte altéré | Format et taille contrôlés, champs relus un par un et tronqués, collecte d'un autre site refusée |
| Fuite d'un secret de notification | Webhooks seulement dans `secrets.ini`, sur la machine de collecte ; jamais saisis ni enregistrés dans WerbVeille, absents du kit |
| Collecteur détourné | Bibliothèque standard seulement ; lit uniquement les adresses de `config.json` (http, https, file) ; taille et délai limités par flux |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbveille.` à l'ouverture et à la fermeture |
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

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| JSZip | 3.10.1 | MIT | Zip du kit de collecte |
| docx | 9.8.1 | MIT | Présente dans le fichier commun des bibliothèques, non utilisée par WerbVeille |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbVeille** — Développé par **@WerbHat**
