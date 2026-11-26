# Sécurité — WerbCyberArcade

> Version **1.4.0** — Développé par **@WerbHat**

## Modèle de sécurité

WerbCyberArcade est une page HTML autonome exécutée uniquement dans le navigateur. Elle n'a ni serveur ni compte en ligne. Les joueurs n'enregistrent rien. Depuis 1.2.0, l'équipe SMSI du groupe tient une **base des défis de l'entreprise** (`groupe/continuite/`, enveloppe commune, verrou, journal) et la **publie** dans l'espace (`groupe:defisCyber`).

| Menace | Mesure |
|---|---|
| Fuite de données vers Internet | CSP `default-src 'none'`, aucune ressource externe, aucune bibliothèque tierce |
| Données laissées sur le poste | Rien n'est enregistré : ni réponse, ni score, ni nom de joueur. Les meilleurs scores vivent en mémoire le temps de l'onglet ; aucun stockage du navigateur (contrôlé par `tests/test_jeu.py`) |
| Outil modifié | Livrable sur partage en lecture seule, empreinte SHA-256 publiée et vérifiée par le portail |
| Injection (XSS) par le nom saisi | Échappement systématique (`WerbSocle.esc`) de tout texte affiché, nom de joueur compris (contrôlé par le test) ; pas de gestionnaire d'événement en ligne |
| Partage du score (1.1.0) | Rien ne part de la page : le courriel est un lien `mailto:` ouvert dans la messagerie du poste (destinataires et envoi décidés par le joueur) ; la fiche est une image produite localement (canevas) et téléchargée ; « Copier le message » n'écrit que dans le presse-papiers. Le message ne contient que le nom saisi, le score, le rang et le code défi — aucune réponse ni donnée de l'entreprise |
| Publication des défis de l'entreprise (1.2.0) | Donnée, jamais du code : chaque défi est contrôlé et borné (`entreprise.js` : types, longueurs, 300 défis au plus), un défi incomplet ou inconnu est ignoré et signalé, tout texte est affiché échappé (contrôlé par `tests/test_entreprise.py` avec une publication hostile) |
| Diffusion d'informations internes | La publication est lisible par **tous les sites** : l'éditeur le rappelle (ni adresse IP, ni mot de passe, ni nom de serveur, ni vulnérabilité réelle ; scènes fictives). Les droits du drive limitent l'écriture de `groupe/` et de `publications/` à l'équipe SMSI |
| Fichier de défis voisin `defis_entreprise.css` (1.3.0) | Chargé comme feuille de style (CSP `style-src 'self' file:`), jamais comme script : il ne peut pas exécuter de code. Le jeu lit la propriété `--wca-defis`, puis **désactive et retire** la feuille : ses éventuelles règles de style n'ont aucun effet. Données contrôlées comme une publication. Pas de vérification d'empreinte (choix assumé) : la protection est celle du dossier du partage, en lecture seule pour les joueurs |
| Sons 8 bits (1.4.0) | Produits par le navigateur (Web Audio), aucun fichier ni accès réseau ; coupés par défaut, réglage gardé en mémoire seulement |
| Code défi saisi | Lu par une expression stricte (`WCA-…`) ; un code non reconnu est refusé avec un message, jamais interprété |
| Lien piégé dans une scène « Repère le piège » | Les adresses des scènes sont du texte, jamais des liens ; elles sont fictives. Seules les deux sources officielles (page 📚 Sources) sont des liens, ouverts dans un nouvel onglet, `noopener noreferrer` |

## Politique de sécurité du contenu

```
default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline' 'self' file:; img-src data: blob:; font-src data:; connect-src blob: data:; worker-src blob:; form-action 'none'; base-uri 'none'
```

## Limites connues

- `'unsafe-inline'` est nécessaire, l'application tenant dans un seul fichier.
- `style-src 'self' file:` (1.3.0) autorise une feuille de style posée à côté du jeu : c'est le seul moyen, pour une page ouverte depuis un dossier ou un partage, de lire un fichier voisin sans demander d'autorisation. Aucun accès réseau n'est ouvert ; les scripts restent limités au code intégré.
- Le jeu est un outil de sensibilisation : il ne mesure ni ne certifie le niveau d'une personne. Pour suivre les formations, utiliser WerbAcademie.

## Composants tiers

| Bibliothèque | Version | Licence | Rôle |
|---|---|---|---|
| *aucune* | | | |

## Signaler une vulnérabilité

Ne pas la publier. Contacter l'auteur directement avec les étapes de reproduction.

---

**WerbCyberArcade** — Développé par **@WerbHat**
