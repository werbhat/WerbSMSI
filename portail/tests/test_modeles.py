# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Page « Modèles de documents » du portail (1.13.0, MOD) dans Microsoft Edge (Playwright pour Python).

    python portail/tests/test_modeles.py [--visible]

Contrôles : inventaire Modeles_docs/modeles.json intégré au portail (une ligne par modèle, groupés Word, Visio, Excel ; rôle,
modules, balises, emplacement dans l'espace) ; menu Outils › Modèles de documents ; sans espace : « espace non ouvert » ; espace de
démonstration ouvert : modèles présents dans modeles/ et modeles/schemas/ ; modèle retiré de l'espace : absent signalé ; fichier
hors inventaire listé (le logo ne l'est pas) ; l'espace n'est jamais modifié ; aucune erreur JavaScript.
"""
import argparse
import base64
import functools
import http.server
import json
import sys
import tempfile
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
INVENTAIRE = json.loads((RACINE / "Modeles_docs" / "modeles.json").read_text(encoding="utf-8"))["modeles"]

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SIMULATION = """window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI", { create: true });"""
ECRIRE = """async ([chemin, b64]) => {
  let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop();
  for (const p of parts) d = await d.getDirectoryHandle(p, { create: true });
  const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(Uint8Array.from(atob(b64), c => c.charCodeAt(0))); await w.close();
}"""
SUPPRIMER = """async chemin => { let d = await navigator.storage.getDirectory(); const parts = chemin.split("/"); const nom = parts.pop();
  for (const p of parts) d = await d.getDirectoryHandle(p); await d.removeEntry(nom); }"""
LISTER = """async () => { const r = []; async function p(d, c) { for await (const [n, h] of d.entries()) { if (h.kind === "directory") await p(h, c + n + "/"); else r.push(c + n); } }
  await p(await (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI"), ""); return r.sort(); }"""


class Silencieux(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--visible", action="store_true")
    a = ap.parse_args()
    echecs, erreurs = [], []

    def ok(cond, msg):
        print(("  OK    " if cond else "  ÉCHEC ") + msg)
        if not cond:
            echecs.append(msg)

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Silencieux, directory=str(RACINE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    with tempfile.TemporaryDirectory() as profil, sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(profil, channel="msedge", headless=not a.visible)
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        pg.on("dialog", lambda d: d.accept())
        pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html")
        pg.wait_for_selector("h1:has-text('WerbSMSI')"); pg.wait_for_timeout(200)
        if pg.locator("#demo-fen").count():
            pg.click("#demo-fen [data-act=demoFermer]")
        main_ = lambda: pg.inner_text("#main")

        print("Sans espace")
        ok(pg.locator("#sidebar [data-wnav=modeles]").count() == 1, "menu Outils › Modèles de documents")
        pg.click("#sidebar [data-wnav=modeles]"); pg.wait_for_timeout(200)
        lignes = pg.locator("tr[data-modele]")
        ok(lignes.count() == len(INVENTAIRE) and sorted(pg.locator("[data-modeles-type]").evaluate_all("l => l.map(x => x.dataset.modelesType)")) == ["Excel", "Visio", "Word"],
           f"inventaire intégré : {len(INVENTAIRE)} modèles, groupés Word, Visio, Excel")
        w = pg.inner_text("tr[data-modele='Word/Modele_entete.docx']")
        ok("WerbGouvernance" in w and "modeles/Modele_entete.docx" in w and "{{REFERENCE}}" in w and "espace non ouvert" in w, "ligne du modèle Word : rôle, modules, balises, emplacement ; espace non ouvert")
        ok("pas à déposer" in pg.inner_text("tr[data-modele='Excel/Modele_Etat_Lieux_Tests_Reseau.xlsx']"), "modèle sans emplacement : pas à déposer")

        print("Espace de démonstration ouvert")
        for f in DEMO.rglob("*"):
            if f.is_file():
                pg.evaluate(ECRIRE, [f"SMSI/{f.relative_to(DEMO).as_posix()}", base64.b64encode(f.read_bytes()).decode()])
        pg.evaluate(ECRIRE, ["SMSI/modeles/Modele_maison.dotx", base64.b64encode(b"fictif").decode()])
        avant = pg.evaluate(LISTER)
        pg.click("#sidebar [data-wnav=accueil]"); pg.wait_for_timeout(200)
        pg.click("[data-act=espace] >> nth=0")
        pg.wait_for_timeout(1500)
        pg.click("#sidebar [data-wnav=modeles]"); pg.wait_for_timeout(300)
        presents = pg.locator("tr[data-modele] .badge:has-text('présent')").count()
        attendus = sum(1 for m in INVENTAIRE if m["espace"])
        ok(presents == attendus and "Tous les modèles à déposer sont présents" in main_(), f"modèles présents dans modeles/ et modeles/schemas/ ({presents} / {attendus})")
        ok("modeles/Modele_maison.dotx" in main_() and "Logo_entreprise_fictif" not in main_(), "fichier hors inventaire listé ; logo ignoré")
        pg.evaluate(SUPPRIMER, "SMSI/modeles/schemas/Modele_zones_conduits_A3.vstx")
        pg.evaluate("document.querySelector('[data-act=actualiser]') && document.querySelector('[data-act=actualiser]').click()")
        pg.wait_for_timeout(1200)
        pg.click("#sidebar [data-wnav=modeles]"); pg.wait_for_timeout(300)
        ok("absent" in pg.inner_text("tr[data-modele='Visio/Modele_zones_conduits_A3.vstx']") and "1 modèle(s) à déposer" in main_(), "modèle retiré de l'espace : absent signalé")
        apres = pg.evaluate(LISTER)
        ok(set(apres) == set(avant) - {"modeles/schemas/Modele_zones_conduits_A3.vstx"}, "l'espace n'est pas modifié par la page")
        ctx.close()
    srv.shutdown()
    ok(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs}" if erreurs else ""))
    print(f"\n{'ÉCHEC' if echecs else 'Succès'} : {len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
