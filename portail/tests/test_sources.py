# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Sources publiques du groupe depuis le portail (⚙️ Administration, objet groupe:sourcesPubliques), dans Microsoft Edge (Playwright).

    python portail/tests/test_sources.py [--visible]

L'espace fictif SMSI_GROUPE_DEMO est copié dans le système de fichiers privé du navigateur. Contrôles : page sans espace (catalogue
de départ annoncé) ; catalogue de départ proposé, filtres ; auteur obligatoire ; première publication (publications/werbsmsi.json,
listes de choix conservées) ; nouvelle source (adresse invalide refusée, référentiels) ; source publiée retirée (jamais supprimée),
remplacée (remplaçante exigée) ; export CSV et JSON ; import CSV avec aperçu (ajout, mise à jour, ignorée, identiques) ; aucune
erreur JavaScript.
"""
import argparse
import functools
import http.server
import json
import sys
import tempfile
import threading
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
DEFAUT = json.loads((RACINE / "portail" / "src" / "sources_defaut.json").read_text(encoding="utf-8"))["sources"]
SIMULATION = """window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI", { create: true });"""
OPFS = """async ([action, chemin, texte]) => {
  let d = await navigator.storage.getDirectory(); const parts = chemin.split("/"); const nom = parts.pop();
  for (const p of parts) d = await d.getDirectoryHandle(p, { create: action === "ecrire" });
  if (action === "ecrire") { const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(texte); await w.close(); return null; }
  return await (await (await d.getFileHandle(nom)).getFile()).text();
}"""

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


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
    with tempfile.TemporaryDirectory() as profil, tempfile.TemporaryDirectory() as tmp, sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(profil, channel="msedge", headless=not a.visible, viewport={"width": 1400, "height": 950}, accept_downloads=True)
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        pg.on("dialog", lambda d: d.accept())
        pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html")
        pg.wait_for_timeout(200)
        if pg.locator("#ident-fen").count():
            pg.locator("#ident-fen [data-act=identFermer]").click()
        pg.wait_for_timeout(150)
        if pg.locator("#demo-fen").count():
            pg.locator("#demo-fen [data-act=demoFermer]").click()
        opfs = lambda action, chemin, texte=None: pg.evaluate(OPFS, [action, chemin, texte])
        pub = lambda: json.loads(opfs("lire", "SMSI/publications/werbsmsi.json"))["data"]
        for chemin, data in demo.items():
            opfs("ecrire", f"SMSI/{chemin}", data.decode("utf-8"))
        listes_avant = json.loads(demo["publications/werbsmsi.json"].decode("utf-8"))["data"].get("listes") if "publications/werbsmsi.json" in demo else None
        lignes = lambda: pg.locator("[data-sp-table] tbody tr[data-sp]").count()

        def publier():
            avant = pg.get_attribute("#spEtat", "data-pub")
            pg.click("[data-act=spPublier]")
            pg.wait_for_function("v => { const e = document.getElementById('spEtat'); return e && e.dataset.pub !== v; }", arg=avant)

        def champ(k, v):
            pg.fill(f"[data-sp-edition] [data-spf={k}]", v); pg.press(f"[data-sp-edition] [data-spf={k}]", "Tab"); pg.wait_for_timeout(100)

        print("Sans espace")
        pg.click("#sidebar [data-wnav=sources]")
        ok(pg.inner_text("#main h1") == "📚 Sources publiques du groupe" and f"{len(DEFAUT)} source(s) sont proposées" in pg.inner_text("#main"), "menu ⚙️ Administration › Sources publiques : catalogue de départ annoncé")

        print("Catalogue de départ et première publication")
        pg.click("#sidebar [data-wnav=accueil]"); pg.click("[data-act=espace]"); pg.wait_for_selector("h1:has-text('Groupe Démo Industrie')")
        pg.click("#sidebar [data-wnav=sources]")
        ok(lignes() == len(DEFAUT) and "Aucune source publiée" in pg.inner_text("#main"), f"{len(DEFAUT)} sources de départ (WerbReferentiels, WerbIEC62443)")
        pg.select_option("#spRef", "RGPD"); ok(lignes() == sum("RGPD" in s["referentiels"] for s in DEFAUT), "filtre par référentiel")
        pg.select_option("#spRef", ""); pg.fill("#spQ", "EBIOS"); pg.wait_for_timeout(150)
        ok(lignes() == 1 and pg.input_value("#spQ") == "EBIOS", "recherche (le champ garde la saisie)")
        pg.fill("#spQ", ""); pg.wait_for_timeout(150)
        pg.click("[data-act=spPublier]")
        ok("Publiée par" in pg.inner_text("#toasts"), "auteur obligatoire")
        pg.fill("#spAuteur", "Alice MARTIN"); publier()
        d = pub()
        ok(len(d["sourcesPubliques"]) == len(DEFAUT) and all(s["source"] == "werbsmsi" and s["majLe"] for s in d["sourcesPubliques"]), "publications/werbsmsi.json : sourcesPubliques, source et date")
        ok(d.get("listes") == listes_avant, "listes de choix du groupe conservées")
        ok("Tout est publié" in pg.inner_text("#main"), "état : tout est publié")

        print("Nouvelle source, retrait, remplacement")
        pg.click("[data-act=spNouvelle]")
        nid = pg.input_value("[data-sp-edition] [data-spf=id]")
        champ("titre", "Recommandations de sécurité relatives à un système GNU/Linux"); champ("editeur", "ANSSI"); champ("url", "ftp://exemple")
        ok("adresse invalide" in pg.inner_text("[data-sp-erreurs]") and pg.locator("[data-act=spPublier]").is_disabled(), "adresse invalide refusée")
        champ("url", "https://cyber.gouv.fr/publications/recommandations-de-securite-relatives-un-systeme-gnulinux")
        pg.check("[data-sp-edition] [data-spref=ANSSI]"); pg.wait_for_timeout(100)
        pg.click("[data-act=spEditer][data-id=SRC-002]")
        pg.select_option("[data-sp-edition] [data-spf=statut]", "remplacée"); pg.wait_for_timeout(100)
        ok("indiquez la source qui la remplace" in pg.inner_text("[data-sp-erreurs]"), "« remplacée » sans remplaçante refusée")
        pg.select_option("[data-sp-edition] [data-spf=remplacePar]", "SRC-001"); pg.wait_for_timeout(100)
        pg.click("[data-act=spFermer]")
        pg.click("[data-act=spRetirer][data-id=SRC-003]")
        ok("retirée" in pg.inner_text("tr[data-sp=SRC-003]") and "remplacée par SRC-001" in pg.inner_text("tr[data-sp=SRC-002]"), "source publiée retirée (gardée), source remplacée")
        publier()
        d = {s["id"]: s for s in pub()["sourcesPubliques"]}
        ok(len(d) == len(DEFAUT) + 1 and d[nid]["referentiels"] == ["ANSSI"] and d["SRC-003"]["statut"] == "retirée" and d["SRC-002"]["remplacePar"] == "SRC-001", f"publiés : {nid} ajoutée, SRC-003 retirée, SRC-002 remplacée")

        print("Export et import")
        with pg.expect_download() as t:
            pg.click("[data-act=spExportCsv]")
        csv = Path(tmp) / "export.csv"; t.value.save_as(csv)
        texte = csv.read_text(encoding="utf-8-sig")
        ok(texte.startswith("Identifiant;Type;Titre;Éditeur") and len(texte.strip().splitlines()) == len(DEFAUT) + 2 and t.value.suggested_filename.endswith(".csv"), "export CSV : en-tête, une ligne par source")
        with pg.expect_download() as t:
            pg.click("[data-act=spExportJson]")
        js = Path(tmp) / "export.json"; t.value.save_as(js)
        ok(json.loads(js.read_text(encoding="utf-8"))["format"] == "WERBSMSI-SOURCES", "export JSON : format WERBSMSI-SOURCES")
        l = texte.splitlines()
        l[4] = l[4].replace(l[4].split(";")[2], "Titre corrigé à l'import", 1)
        l.append(";Guide;Guide de l'ANSSI importé;ANSSI;v1;;https://cyber.gouv.fr/guide-importe;;ANSSI, NIS2;;;Ajouté par import;")
        l.append(";Guide;;ANSSI;;;https://cyber.gouv.fr/sans-titre;;;;;;")
        imp = Path(tmp) / "import.csv"; imp.write_text("\r\n".join(l), encoding="utf-8-sig")
        pg.set_input_files("#spImport", str(imp)); pg.wait_for_timeout(300)
        ap_ = pg.inner_text("[data-sp-apercu]")
        ok("1 ajout(s)" in ap_ and "1 mise(s) à jour" in ap_ and "1 ignorée(s)" in ap_ and f"{len(DEFAUT)} identique(s)" in ap_, "aperçu : 1 ajout, 1 mise à jour, 1 ignorée, le reste identique")
        pg.click("[data-act=spImportOk]"); pg.wait_for_timeout(200)
        ok(lignes() == len(DEFAUT) + 2 and "Titre corrigé à l'import" in pg.inner_text("[data-sp-table]"), "import appliqué au brouillon")
        publier()
        nouv = [s for s in pub()["sourcesPubliques"] if s["url"] == "https://cyber.gouv.fr/guide-importe"]
        ok(len(nouv) == 1 and nouv[0]["referentiels"] == ["ANSSI", "NIS2"] and nouv[0]["id"].startswith("SRC-") and "import" in nouv[0]["origine"], "source importée publiée : identifiant attribué, référentiels, origine")
        ok(not erreurs, "aucune erreur JavaScript" + ("" if not erreurs else " : " + " | ".join(erreurs[:3])))
        ctx.close()
    srv.shutdown()
    print(("\nÉCHEC : " if echecs else "\nSuccès : ") + f"{len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
