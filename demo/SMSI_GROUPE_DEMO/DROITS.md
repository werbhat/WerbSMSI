# Droits d'accès recommandés – WerbSMSI

> Généré par werb_charte.py – Développé par @WerbHat. La sécurité des données repose sur ces droits (charte §1, P3).

| Dossier ou fichier | Équipe SMSI groupe | Équipe du site X | Autres sites |
|---|---|---|---|
| `werbsmsi.groupe.json`, `publications/` | lecture-écriture | lecture | lecture |
| `groupe/` | lecture-écriture | aucun | aucun |
| `sites/X/` | lecture (écriture si le groupe administre) | lecture-écriture | aucun |

- `publications/` à la racine est lisible par tous les sites : les modules du groupe n'y publient que ce qui doit être diffusé.
- Désactiver l'héritage des droits sur `groupe/` et sur chaque `sites/<CODE>/`.
- Activer l'historique des versions du drive : il sert de sauvegarde des bases.
