# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Paramètres du portail (⚙️ Administration › Paramètres, portail 1.11.0) dans Microsoft Edge (Playwright pour Python).

    python portail/tests/test_parametres.py [--visible]

L'espace fictif SMSI_GROUPE_DEMO est copié dans le système de fichiers privé du navigateur. Contrôles : sans espace, message
et tous les modules affichés ; tous les modules cochés par défaut ; brouillon non enregistré signalé ; enregistrement dans
werbsmsi.groupe.json (data.parametres.modulesMasques, auteur) ; modules masqués absents des pages Groupe et Site, rubrique
entièrement masquée retirée, renvoi vers les paramètres ; bases d'un module masqué toujours listées et signalées ; paramètres
relus après rechargement ; « Tout afficher » ; rien dans le stockage du navigateur.
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

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
SIMULATION = """
window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI", { create: true });
"""
OPFS = """async ([action, chemin, b64]) => {
  let d = await navigator.storage.getDirectory(); const parts = chemin.split("/"); const nom = parts.pop();
  for (const p of parts) d = await d.getDirectoryHandle(p, { create: action === "ecrire" });
  if (action === "ecrire") { const u = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(u); await w.close(); return null; }
  return await (await (await d.getFileHandle(nom)).getFile()).text();
}"""
MASQUES = ["werbacademie", "werbpcr", "werbrgpd", "werbveille"]   # dont toute l'étape « Faire vivre le SMSI » et l'étape « Assurer la résilience »

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


class Silencieux(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--visible", action="store_true")
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright

    echecs, erreurs = [], []

    def ok(cond, msg):
        print(("  OK    " if cond else "  ÉCHEC ") + msg)
        if not cond:
            echecs.append(msg)

    registre = json.loads((RACINE / "registre_modules.json").read_text(encoding="utf-8"))
    publies = [m["id"] for m in registre["modules"] if m.get("etat") == "publie"]
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Silencieux, directory=str(RACINE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    demo = {f.relative_to(DEMO).as_posix(): f.read_bytes() for f in DEMO.rglob("*") if f.is_file()}
    url = f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html"
    with tempfile.TemporaryDirectory() as profil, sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(profil, channel="msedge", headless=not a.visible, viewport={"width": 1400, "height": 900})
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        pg.on("dialog", lambda d: d.accept())

        def ouvrir_portail():
            pg.goto(url)
            pg.wait_for_timeout(200)
            if pg.locator("#demo-fen").count():
                pg.locator("#demo-fen [data-act=demoFermer]").click()
            pg.wait_for_selector("h1:has-text('WerbSMSI')")

        ouvrir_portail()
        opfs = lambda action, chemin, data=None: pg.evaluate(OPFS, [action, chemin, base64.b64encode(data).decode() if data is not None else None])
        for chemin, data in demo.items():
            opfs("ecrire", f"SMSI/{chemin}", data)
        titres = lambda: [x.strip() for x in pg.locator("#main .tile h3").all_inner_texts()]

        print("Sans espace")
        pg.click("#sidebar [data-wnav=parametres]")
        ok("Ouvrez d'abord l'espace" in pg.inner_text("#main") and pg.locator("input.pmod").count() == 0, "paramètres : espace à ouvrir, tous les modules affichés")

        print("Paramètres par défaut")
        pg.click("#sidebar [data-wnav=accueil]")
        pg.click("[data-act=espace]")
        pg.wait_for_selector("h1:has-text('Groupe Démo Industrie')")
        ok("WerbAcademie" in titres() and pg.locator("[data-masques]").count() == 0, "page Groupe : tous les modules, aucun masqué")
        pg.click("#sidebar [data-wnav=parametres]")
        ok(pg.locator("input.pmod").count() == len(publies) and pg.locator("input.pmod:not(:checked)").count() == 0, f"{len(publies)} modules, tous cochés par défaut")
        ok(pg.is_disabled("[data-act=paramEnregistrer]"), "rien à enregistrer")

        print("Masquer des modules")
        for m in MASQUES:
            pg.uncheck(f"input.pmod[data-id={m}]")
            pg.wait_for_timeout(60)
        ok("Changements non enregistrés" in pg.inner_text("#main") and pg.is_enabled("[data-act=paramEnregistrer]"), "brouillon signalé, enregistrement possible")
        ok("masqué malgré tout" in pg.inner_text("tr[data-pmod=werbrgpd]"), "WerbRGPD : bases déclarées signalées")
        pg.click("[data-act=paramEnregistrer]")
        pg.wait_for_timeout(400)
        g = json.loads(opfs("lire", "SMSI/werbsmsi.groupe.json"))
        ok(g["data"]["parametres"]["modulesMasques"] == sorted(MASQUES) and g["meta"]["modifiePar"] == "Portail WerbSMSI", "enregistré dans werbsmsi.groupe.json")
        ok(g["data"]["sites"] and g["data"]["groupeId"], "reste du fichier conservé (sites, groupeId)")
        ok("4 module(s) masqué(s) actuellement" in pg.inner_text("#main"), "paramètres : état enregistré affiché")

        print("Pages du portail")
        pg.click("#sidebar [data-wnav=groupe]")
        pg.wait_for_timeout(200)
        t = titres()
        ok("WerbAcademie" not in t and "WerbPCR" not in t and "WerbGouvernance" in t, "page Groupe : modules masqués absents")
        h2 = " ".join(pg.locator("#main .card.rub h2").all_inner_texts())
        ok("Faire vivre le SMSI" not in h2 and "Gouverner" in h2, "étape entièrement masquée retirée (Faire vivre le SMSI)")
        ok(pg.locator("[data-masques] a[data-nav=parametres]").count() == 1, "renvoi vers les paramètres")
        pg.click("#sidebar [data-wnav='site:LYON']")
        pg.wait_for_selector("h1:has-text('LYON')")
        t = titres()
        ok("WerbRGPD" not in t and "WerbVeille" not in t and "WerbMap" in t, "page Site : modules masqués absents")
        ok(any("RGPD" in b for b in pg.locator(".card:has(h2:has-text('Bases du site')) tbody tr").all_inner_texts()), "base RGPD toujours listée dans les bases du site")

        print("Relecture")
        ouvrir_portail()
        pg.click("[data-act=espace]")
        pg.wait_for_selector("h1:has-text('Groupe Démo Industrie')")
        ok("WerbAcademie" not in titres(), "après rechargement : paramètres relus dans l'espace")

        print("Tout afficher")
        pg.click("#sidebar [data-wnav=parametres]")
        pg.click("[data-act=paramTout]")
        ok(pg.locator("input.pmod:not(:checked)").count() == 0, "tout coché")
        pg.click("[data-act=paramEnregistrer]")
        pg.wait_for_timeout(400)
        ok(json.loads(opfs("lire", "SMSI/werbsmsi.groupe.json"))["data"]["parametres"]["modulesMasques"] == [], "enregistré : aucun module masqué")
        pg.click("#sidebar [data-wnav=groupe]")
        pg.wait_for_timeout(200)
        ok("WerbAcademie" in titres() and pg.locator("[data-masques]").count() == 0, "page Groupe : tous les modules de nouveau")
        ok(pg.evaluate("localStorage.length") == 0, "rien dans le stockage durable du navigateur")
        ctx.close()
    srv.shutdown()

    ok(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs}" if erreurs else ""))
    print(f"\n{'ÉCHEC' if echecs else 'Succès'} : {len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
