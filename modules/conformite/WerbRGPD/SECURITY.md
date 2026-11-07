# Sécurité — WerbRGPD

> Version **1.0.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbRGPD est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne.

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, bibliothèques embarquées |
| Données laissées sur le poste | Aucun stockage navigateur des données ; purge des clés `werb.werbrgpd.` à l'ouverture et à la fermeture |
| Accès non autorisé à une base | Droits du dossier sur le drive protégé (hors du périmètre de l'outil) |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par un fichier importé | Échappement systématique (`WerbSocle.esc`), pas de gestionnaire d'événement en ligne, contrôle de l'enveloppe à l'ouverture |
| Injection de formules dans un export Excel | Cellules écrites en texte |
| Écrasement du travail d'un collègue | Détection de modification du fichier avant enregistrement, verrou commun |
| Base transformée en fichier de personnes | La base décrit des traitements ; le demandeur d'un droit est décrit sans données superflues ; aucune copie de pièce d'identité |
| Divulgation d'informations sensibles (violations, sous-traitants, mesures) | Base et export rangés dans le dossier du site (droits du drive), export marqué « Diffusion restreinte » |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

<!-- Si 'unsafe-eval' est nécessaire, indiquer ici la bibliothèque qui l'exige. -->

## Limites connues

- Toute personne qui peut lire le fichier de base peut en lire le contenu : il n'est pas chiffré.
- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.
- Les délais (72 h, un mois) sont calculés avec l'horloge du poste ; ils guident, ils ne remplacent pas la décision du DPO.
- Les durées et critères affichés suivent le règlement et les lignes directrices du CEPD à la date de la version : vérifier les sources (référentiel RGPD de WerbReferentiels).

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbRGPD** — Développé par **@WerbHat**
