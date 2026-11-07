# Sécurité — WerbReferentiels

> Version **1.0.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbReferentiels est une page HTML autonome exécutée uniquement dans le navigateur. C'est un **module de lecture** : elle n'ouvre, n'enregistre et ne publie aucun fichier. Elle n'a ni serveur ni compte en ligne.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe ; le module ne manipule aucune donnée de l'entreprise |
| Données laissées sur le poste | Rien n'est écrit dans le stockage du navigateur ; la page affichée est seulement dans l'adresse (`#guide:…`) |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par le contenu Markdown | Lecteur commun `guides.js` : tout le HTML du texte est échappé, liens limités à `http(s)`, `mailto` et aux pages `.md` du module ; pas de gestionnaire d'événement en ligne |
| Lien externe piégé | Liens officiels uniquement, ouverts dans un nouvel onglet avec `rel="noopener noreferrer"`, sur clic de l'utilisateur |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

## Limites connues

- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.
- Les liens des pages *Sources officielles* mènent vers des sites externes : leur contenu et leur disponibilité ne dépendent pas du module.
- Le contenu est une synthèse : il ne remplace pas les textes officiels, dont l'édition doit être vérifiée avant tout audit.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbReferentiels** — Développé par **@WerbHat**
