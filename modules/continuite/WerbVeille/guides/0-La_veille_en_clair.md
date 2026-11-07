<!-- WerbVeille – Développé par @WerbHat -->
# La veille de sécurité en clair

Chaque semaine, des failles sont découvertes dans des logiciels et des équipements, y compris des automates, des pare-feu, des logiciels de supervision et des passerelles d'accès à distance. Certaines sont exploitées par des attaquants **quelques jours** après leur publication. La **veille de sécurité** consiste à apprendre au plus tôt celles qui concernent **vos** équipements, et à décider quoi faire.

Ce guide explique le vocabulaire, la façon de juger une alerte et la suite à lui donner. Le guide suivant, *Mettre en place la veille d'un site*, détaille l'installation de WerbVeille.

---

## 1. Pourquoi une veille sur ses propres équipements

- **Le temps joue contre vous.** Entre la publication d'une faille et son exploitation, il s'écoule parfois moins d'une semaine. Une mise à jour en industriel demande souvent un arrêt planifié : il faut le savoir tôt pour s'y préparer.
- **Le volume est énorme.** Des dizaines de milliers de vulnérabilités sont publiées chaque année. Lire tout n'a pas de sens ; ce qui compte, c'est **ce qui touche le site**.
- **Personne ne vous préviendra forcément.** Le constructeur publie un avis sur son site ; l'intégrateur qui a installé l'équipement n'est pas toujours sous contrat pour vous alerter.

---

## 2. Le vocabulaire

| Terme | Ce que c'est |
|---|---|
| **Vulnérabilité** | Un défaut d'un logiciel ou d'un équipement qu'un attaquant peut utiliser |
| **CVE** | L'identifiant public d'une vulnérabilité (par exemple CVE-2024-12345) : il permet de parler de la même faille partout |
| **CVSS** | Une note de 0 à 10 qui mesure la gravité d'une vulnérabilité en elle-même (critique à partir de 9, élevée à partir de 7) |
| **Avis de sécurité** | Publication d'un constructeur, d'un éditeur ou d'un CERT : produits touchés, versions, correctif ou contournement |
| **CERT** | Centre de réponse aux incidents ; en France, le **CERT-FR** de l'ANSSI publie avis et alertes |
| **Alerte** | Avis urgent : faille activement exploitée ou menace imminente |
| **Correctif** | Mise à jour qui supprime la faille |
| **Contournement** | Mesure temporaire qui empêche l'exploitation sans corriger (fermer un port, désactiver un service) |
| **Exploitation active** | Des attaquants utilisent déjà la faille ; certains catalogues la recensent, comme le catalogue KEV de l'agence américaine CISA |

---

## 3. Les bonnes sources

- **Les autorités** : CERT-FR (avis, alertes, bulletins d'actualité), et les avis industriels publiés par d'autres CERT nationaux.
- **Les constructeurs et éditeurs** de vos équipements : leurs pages ou flux d'avis de sécurité.
- **Quelques sources d'actualité** reconnues, pour le contexte (campagnes en cours, rançongiciels).

Mieux vaut **peu de sources fiables**, bien filtrées, que cinquante flux que personne ne lit.

---

## 4. Juger une alerte : cinq questions

1. **Est-ce chez nous ?** Le produit et la **version** touchés sont-ils présents sur le site ? (C'est pour cela que l'inventaire doit connaître modèles et versions.)
2. **Est-ce joignable ?** L'équipement est-il exposé à Internet, accessible depuis le réseau de bureau, ou isolé dans une zone fermée ?
3. **Est-ce exploité ?** La faille est-elle déjà utilisée par des attaquants ? Existe-t-il un code d'exploitation public ?
4. **Quelle conséquence ?** Que se passerait-il si elle était exploitée sur cet équipement : arrêt de production, prise de contrôle, fuite de données ?
5. **Que propose le constructeur ?** Correctif, contournement, rien ?

| Situation | Décision type |
|---|---|
| Chez nous, joignable, exploitée | **Urgent** : contournement immédiat, correctif dès que possible |
| Chez nous, peu joignable, non exploitée | **Planifier** le correctif au prochain arrêt, surveiller |
| Chez nous, sans correctif | **Compenser** (cloisonnement, accès restreint) et suivre |
| Pas chez nous | **Écarter** (Non concerné), en notant pourquoi |

---

## 5. Après la décision

Une alerte n'est traitée que lorsque la suite est **tracée** :

- le correctif planifié dans la campagne de mises à jour (WerbExploitation) ;
- l'intervention notée le jour où elle est faite ;
- la nouvelle version de firmware reportée dans l'inventaire (WerbMap) et dans la fiche de l'équipement (WerbAssets) ;
- la mesure compensatoire documentée si le correctif est impossible ;
- l'alerte classée avec sa décision : elle prouve, en audit, que la veille fonctionne.

---

## 6. Les erreurs fréquentes

- **Trop de sources, aucun tri** : la veille devient du bruit et on cesse de la lire.
- **Des mots-clés trop vagues** (« Windows », « réseau ») : tout remonte, rien ne ressort.
- **Ignorer les équipements industriels** parce qu'ils sont « isolés » : ils le sont rarement autant qu'on le croit.
- **Ne garder aucune trace** des décisions : on revérifie dix fois la même alerte.
- **S'arrêter à la note CVSS** sans regarder l'exposition et l'exploitation réelle.

---

## 7. Dans WerbVeille

- **Sources** : une liste proposée (CERT, constructeurs, actualité), à ajuster et à tester.
- **Mots-clés** proposés depuis l'**inventaire WerbMap** (marque, modèle, système d'exploitation, firmware), avec des exclusions : seuls les articles qui parlent des équipements du site sont retenus.
- **Kit de collecte** : la page WerbVeille reste hors ligne ; la lecture des flux se fait sur une machine connectée, et le résultat est importé.
- **Alertes** à trier, avec un statut (Nouvelle, À analyser, Concerné, Non concerné, Traitée), un commentaire qui garde la décision et la référence de l'action.

L'installation pas à pas est dans le guide suivant : [Mettre en place la veille d'un site](1-Mettre_en_place_la_veille.md).

> **En résumé** : la veille sert à savoir tôt ce qui menace **vos** équipements. Elle repose sur un inventaire précis, peu de sources fiables, cinq questions pour juger chaque alerte, et une décision tracée.
