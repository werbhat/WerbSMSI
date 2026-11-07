# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Listes de choix du groupe depuis le portail (⚙️ Administration, charte §5.9), dans Microsoft Edge (Playwright pour Python).

    python portail/tests/test_listes.py [--visible]

L'espace fictif SMSI_GROUPE_DEMO est copié dans le système de fichiers privé du navigateur ; les manifestes intégrés au portail
ne gardent que deux listes de test (une simple, une en paires), quelles que soient celles des modules publiés. Contrôles : page sans espace,
valeurs par défaut, auteur obligatoire, première publication (publications/werbsmsi.json conforme), ajout, retrait, renommage,
doublon refusé, libellé d'une paire, retour d'une valeur retirée, liste orpheline conservée, fusion par le socle d'un site,
contrôle de l'espace par werb_charte.py.
"""
import argparse
import base64
import functools
import http.server
import json
import subprocess
import sys
import tempfile
import threading
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
LISTES = {
    "werbexploitation": [{"id": "periodicites", "libelle": "Périodicités", "forme": "simple",
                          "defaut": ["Hebdomadaire", "1 mois", "Trimestrielle", "6 mois", "1 an"]}],
    "werbmap": [{"id": "abrev", "libelle": "Abréviations des TAG", "forme": "paires", "defaut": [["SRV_", "Serveur"], ["SW_", "Switch ethernet"]]}],
}
SIMULATION = """
window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI", { create: true });
(() => { let reg; const listes = %s;
  Object.defineProperty(window, "REGISTRE", { configurable: true, get: () => reg, set: v => {
    for (const m of v.modules) if (m.manifeste) { if (listes[m.id]) m.manifeste.listes = listes[m.id]; else delete m.manifeste.listes; }   // seules les listes du test
    reg = v; } }); })();
""" % json.dumps(LISTES, ensure_ascii=False)
OPFS = """async ([action, chemin, texte]) => {
  let d = await navigator.storage.getDirectory(); const parts = chemin.split("/"); const nom = parts.pop();
  for (const p of parts) d = await d.getDirectoryHandle(p, { create: action === "ecrire" });
  if (action === "ecrire") { const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(texte); await w.close(); return null; }
  return await (await (await d.getFileHandle(nom)).getFile()).text();
}"""
PE = "werbexploitation.periodicites"
AB = "werbmap.abrev"


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

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Silencieux, directory=str(RACINE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    demo = {f.relative_to(DEMO).as_posix(): f.read_bytes() for f in DEMO.rglob("*") if f.is_file() and f.suffix in (".json", ".md")}
    with tempfile.TemporaryDirectory() as profil, sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(profil, channel="msedge", headless=not a.visible, viewport={"width": 1400, "height": 900})
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        dialogues = []
        pg.on("dialog", lambda d: (dialogues.append(d.message), d.accept()))
        pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html")
        pg.wait_for_timeout(200); pg.locator("#demo-fen [data-act=demoFermer]").click() if pg.locator("#demo-fen").count() else None   # invitation à la démo (portail 1.8.0)
        opfs = lambda action, chemin, texte=None: pg.evaluate(OPFS, [action, chemin, texte])
        publication = lambda: json.loads(opfs("lire", "SMSI/publications/werbsmsi.json"))
        listes = lambda: {x["id"]: x for x in publication()["data"]["listes"]}
        for chemin, data in demo.items():
            opfs("ecrire", f"SMSI/{chemin}", data.decode("utf-8"))
        pg.wait_for_selector("h1:has-text('WerbSMSI')")

        def ouvrir(cle):
            if not pg.evaluate("l => document.querySelector(`details.lg[data-l='${l}']`).open", cle):
                pg.click(f"details.lg[data-l='{cle}'] summary")

        def saisir(cle, i, texte, p=0):
            ouvrir(cle)
            sel = f".lg-v[data-l='{cle}'][data-i='{i}'][data-p='{p}']"
            pg.fill(sel, texte)
            pg.press(sel, "Tab")
            pg.wait_for_timeout(100)

        def ajouter(cle, *valeurs):
            ouvrir(cle)
            for p, v in enumerate(valeurs):
                pg.fill(f".lg-n[data-l='{cle}'][data-p='{p}']", v)
            pg.click(f"[data-act=lgAjouter][data-l='{cle}']")

        def publier():
            avant = pg.get_attribute("#lgEtat", "data-pub")
            pg.click("[data-act=lgPublier]")
            pg.wait_for_function("v => { const e = document.getElementById('lgEtat'); return e && e.dataset.pub !== v; }", arg=avant)

        print("Page sans espace")
        pg.click("#sidebar [data-wnav=listes]")
        ok(pg.inner_text("#main h1") == "🗂️ Listes de choix du groupe", "menu ⚙️ Administration › Listes de choix du groupe")
        ok("Ouvrez d'abord l'espace" in pg.inner_text("#main") and "2 liste(s) déclarée(s)" in pg.inner_text("#main"), "sans espace : invitation à ouvrir l'espace, listes déclarées comptées")

        print("Première publication")
        pg.click("#sidebar [data-wnav=accueil]")
        pg.click("[data-act=espace]")
        pg.wait_for_selector("h1:has-text('Groupe Démo Industrie')")
        pg.click("#sidebar [data-wnav=listes]")
        txt = pg.inner_text("#main")
        ok("WerbExploitation" in txt and "WerbMap" in txt and "Aucune liste publiée" in txt, "listes rangées par module, rien de publié")
        ok(pg.locator("details.lg .badge:text-is('non publiée')").count() == 2, "deux listes « non publiée »")
        ok(pg.eval_on_selector_all(f".lg-v[data-l='{PE}']", "l => l.map(x => x.value)") == LISTES["werbexploitation"][0]["defaut"], "valeurs par défaut du module proposées")
        pg.click("[data-act=lgPublier]")
        ok("Publiée par" in pg.inner_text("#toasts"), "auteur obligatoire")
        pg.fill("#lgAuteur", "Alice MARTIN")
        publier()
        p = publication()
        ok(p["format"] == "WERBSMSI-PUBLICATION" and p["meta"]["module"] == "werbsmsi" and p["meta"]["portee"] == "groupe"
           and p["meta"]["publiePar"] == "Alice MARTIN" and p["meta"]["groupeId"], "publications/werbsmsi.json : format, module, portée, auteur, groupe")
        l = listes()
        ok(set(l) == {PE, AB} and all(x["source"] == "werbsmsi" and x["majLe"] for x in l.values()), "deux listes publiées, source werbsmsi, date")
        ok(l[PE]["valeurs"] == LISTES["werbexploitation"][0]["defaut"] and l[PE]["retirees"] == [] and l[PE]["renommees"] == {}, "liste simple : valeurs par défaut, ni retrait ni renommage")
        ok(l[AB]["valeurs"] == [["SRV_", "Serveur"], ["SW_", "Switch ethernet"]], "liste en paires publiée")
        ok(len(dialogues) == 1 and "première publication" in dialogues[0], "confirmation avec le résumé des changements")
        ok("Tout est publié" in pg.inner_text("#main") and pg.is_disabled("[data-act=lgPublier]"), "après publication : tout est publié, bouton désactivé")
        copie_site = {"valeurs": l[PE]["valeurs"], "majLe": l[PE]["majLe"]}

        print("Ajout, retrait, renommage")
        saisir(PE, 4, "Annuelle")                           # « 1 an » → « Annuelle »
        pg.click(f"[data-act=lgRetirer][data-l='{PE}'][data-i='1']")   # retire « 1 mois »
        ajouter(PE, "À la demande")
        txt = pg.inner_text(f"details.lg[data-l='{PE}']")
        ok("renommée de « 1 an »" in txt and "nouvelle" in txt, "repères : renommée, nouvelle")
        ok("➕ Annuelle, À la demande" in txt and "➖ 1 mois, 1 an" in txt and "✏️ 1 an → Annuelle" in txt, "écarts avec la publication affichés")
        ajouter(PE, "hebdomadaire")
        ok("en double" in pg.inner_text(f"details.lg[data-l='{PE}']") and pg.is_disabled("[data-act=lgPublier]"), "doublon (casse) signalé, publication bloquée")
        pg.click(f"[data-act=lgRetirer][data-l='{PE}'][data-i='5']")
        saisir(AB, 0, "Serveur Windows ou Linux", 1)        # libellé d'une paire : pas un renommage
        ok("renommée" not in pg.inner_text(f"details.lg[data-l='{AB}']") and "modifiée" in pg.inner_text(f"details.lg[data-l='{AB}']"), "libellé d'une paire modifié : liste modifiée, sans renommage")
        publier()
        l = listes()
        ok(l[PE]["valeurs"] == ["Hebdomadaire", "Trimestrielle", "6 mois", "Annuelle", "À la demande"], f"valeurs publiées : {l[PE]['valeurs']}")
        ok(sorted(l[PE]["retirees"]) == ["1 an", "1 mois"] and l[PE]["renommees"] == {"1 an": "Annuelle"}, "retraits et renommage publiés")
        ok(l[AB]["valeurs"][0] == ["SRV_", "Serveur Windows ou Linux"] and l[AB]["renommees"] == {}, "paire : nouveau libellé publié")
        ok("2 ajoutée(s), 2 retirée(s), 1 renommée(s)" in dialogues[-1], f"résumé de confirmation : {dialogues[-1]!r}")

        print("Fusion dans un site (socle)")
        r = pg.evaluate("""([locale, copie, pub]) => WerbSocle.listes.fusionner(locale, copie, pub, v => ({ "1 an": 12, "1 mois": 0 })[v] || 0)""",
                        [copie_site["valeurs"] + ["Spécifique LYON"], copie_site, l[PE]])
        ok(r["ajoutees"] == ["Annuelle", "À la demande"] and r["supprimees"] == ["1 mois"], "site : valeurs ajoutées reçues, valeur retirée non employée supprimée")
        ok(r["retireesUtilisees"] == [{"valeur": "1 an", "n": 12}] and {"ancien": "1 an", "nouveau": "Annuelle", "n": 12, "motif": "renommage"} in r["propositions"],
           "site : « 1 an » employé conservé ⚠, remplacement par « Annuelle » proposé")
        ok("Spécifique LYON" in r["valeurs"], "site : valeur propre conservée")

        print("Retour d'une valeur, liste orpheline, revenir à la publication")
        ajouter(PE, "1 mois")
        publier()
        l = listes()
        ok("1 mois" in l[PE]["valeurs"] and l[PE]["retirees"] == ["1 an"] and l[PE]["renommees"] == {"1 an": "Annuelle"}, "valeur revenue : retirée des retraits, l'historique des autres gardé")
        p = publication()
        p["data"]["listes"].append({"id": "ancienmodule.types", "valeurs": ["X"], "retirees": [], "renommees": {}, "source": "werbsmsi", "majLe": "2026-10-01"})
        opfs("ecrire", "SMSI/publications/werbsmsi.json", json.dumps(p, ensure_ascii=False))
        pg.click("[data-act=actualiser]")
        pg.wait_for_selector("#toasts :text('Espace relu')")
        ok("ancienmodule.types" in pg.inner_text("#main"), "liste publiée sans module déclarant signalée")
        saisir(PE, 0, "Chaque semaine")
        ok(not pg.is_disabled(f"[data-act=lgAnnuler][data-l='{PE}']"), "modification en cours : retour possible")
        pg.click(f"[data-act=lgAnnuler][data-l='{PE}']")
        ok(pg.input_value(f".lg-v[data-l='{PE}'][data-i='0']") == "Hebdomadaire" and "Tout est publié" in pg.inner_text("#main"), "revenir à la publication")
        saisir(AB, 1, "Commutateur", 1)
        publier()
        ok("ancienmodule.types" in listes() and listes()["ancienmodule.types"]["valeurs"] == ["X"], "liste orpheline conservée telle quelle à la publication")

        print("Contrôle de l'espace (werb_charte.py espace)")
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp) / "SMSI_GROUPE_DEMO"
            for chemin, data in demo.items():
                (dest / chemin).parent.mkdir(parents=True, exist_ok=True)
                (dest / chemin).write_bytes(data)
            (dest / "publications" / "werbsmsi.json").write_text(opfs("lire", "SMSI/publications/werbsmsi.json"), encoding="utf-8")
            r = subprocess.run([sys.executable, str(RACINE / "charte" / "outils" / "werb_charte.py"), "espace", str(dest), "--detail"],
                               capture_output=True, text=True, encoding="utf-8", errors="replace", env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
            lignes = [x for x in r.stdout.splitlines() if "werbsmsi.json" in x or "ERREUR" in x]
            ok(r.returncode == 0 and not any("ERREUR" in x for x in lignes) and any("werbsmsi.json › listes" in x for x in lignes),
               "werbsmsi.json accepté par le contrôle de l'espace (objet listes, source, identifiants)" + ("" if r.returncode == 0 else f" : {lignes}"))
        ctx.close()
    srv.shutdown()

    ok(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs}" if erreurs else ""))
    print(f"\n{'ÉCHEC' if echecs else 'Succès'} : {len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
