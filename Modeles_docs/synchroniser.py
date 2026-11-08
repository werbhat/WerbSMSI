# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Contrôle et mise à jour des copies des modèles de documents (Modeles_docs/ est la référence ; copies déclarées dans modeles.json).

    python Modeles_docs/synchroniser.py            ← liste les copies absentes ou différentes du modèle
    python Modeles_docs/synchroniser.py --copier   ← recopie le modèle de référence sur ses copies

Code de retour : 0 si toutes les copies sont à jour (ou viennent d'être recopiées), 1 sinon.
"""
import argparse
import hashlib
import json
import shutil
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent            # WerbSMSI/Modeles_docs
WERBSMSI = ICI.parent                            # WerbSMSI
ENV = WERBSMSI.parent                            # dossier des dépôts (WerbCartoSI, WerbIEC62443…)
INVENTAIRE = ICI / "modeles.json"                # inventaire : modèle de référence → copies qui doivent lui être identiques


def copies() -> dict:
    inv = json.loads(INVENTAIRE.read_text(encoding="utf-8"))
    return {m["fichier"]: [ENV / c for c in m.get("copies", [])] for m in inv["modeles"]}


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def empreinte(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--copier", action="store_true", help="recopier les modèles sur leurs copies absentes ou différentes")
    a = ap.parse_args()
    ecarts = 0
    for ref, liste in copies().items():
        src = ICI / ref
        if not src.is_file():
            print(f"  ABSENT  modèle de référence {ref}")
            ecarts += 1
            continue
        h = empreinte(src)
        for c in liste:
            if not c.parent.is_dir():
                print(f"  —       {c} : dossier absent (dépôt non présent), ignoré")
                continue
            if c.is_file() and empreinte(c) == h:
                print(f"  OK      {c.relative_to(ENV)}")
                continue
            etat = "différent" if c.is_file() else "absent"
            if a.copier:
                shutil.copy2(src, c)
                print(f"  COPIÉ   {c.relative_to(ENV)} ({etat} → {ref})")
            else:
                print(f"  ÉCART   {c.relative_to(ENV)} : {etat} de {ref}")
                ecarts += 1
    connus = set(copies())
    for f in sorted(x for d in ("Word", "Visio", "Excel") if (ICI / d).is_dir() for x in (ICI / d).iterdir() if x.is_file()):
        if f.relative_to(ICI).as_posix() not in connus:
            print(f"  INCONNU {f.relative_to(ICI).as_posix()} : absent de modeles.json (inventaire du portail)")
            ecarts += 1
    print(f"\n{'Copies à mettre à jour : ' + str(ecarts) + ' (relancer avec --copier)' if ecarts else 'Toutes les copies sont à jour.'}")
    return 1 if ecarts else 0


if __name__ == "__main__":
    sys.exit(main())
