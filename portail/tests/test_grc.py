# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Tableau de bord GRC du portail (1.21.0) dans Microsoft Edge (Playwright pour Python).

    python portail/tests/test_grc.py [--visible]

Espace de démonstration (demo/SMSI_GROUPE_DEMO) copié dans le système de fichiers privé du navigateur (OPFS), date du navigateur
figée au 27/11/2026. Contrôles : menu Groupe › Tableau de bord GRC ; chiffres clés ; « À traiter » (acceptation expirée, risque sans
traitement décidé, acceptation à renouveler, actions NIS2 en retard, actif critique N4, sauvegarde jamais testée…), bloquants en tête ;
conformité par référentiel (socle, NIS2, IEC 62443) et hygiène par site ; matrice gravité × vraisemblance colorée avec la matrice du
groupe, filtre d'une case, bascule brut / résiduel ; périmètre d'un site ; fraîcheur des publications ; lien vers la page d'un site ;
matrice non publiée : niveaux estimés et signalés ; thème sombre ; rien d'écrit dans l'espace ; aucune erreur JavaScript.
Captures dans portail/tests/sortie/grc_*.png.
"""
import argparse
import functools
import http.server
import json
import sys
import threading
from datetime import datetime
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
SORTIE = Path(__file__).resolve().parent / "sortie"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SIMULATION = """window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI", { create: true });"""
ECRIRE = """async ([chemin, texte]) => { let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop(); for (const p of parts) d = await d.getDirectoryHandle(p, { create: true });
  const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(texte); await w.close(); }"""
EMPREINTES = """async () => { const res = {};
  async function parcourir(d, c) { for await (const [n, h] of d.entries()) { if (h.kind === "directory") await parcourir(h, c + n + "/"); else { const f = await h.getFile(); res[c + n] = f.size + ":" + f.lastModified; } } }
  await parcourir(await (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI"), ""); return res; }"""


class Silencieux(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--visible", action="store_true")
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright

    SORTIE.mkdir(exist_ok=True)
    echecs, erreurs = [], []

    def ok(cond, msg):
        print(("  OK    " if cond else "  ÉCHEC ") + msg)
        if not cond:
            echecs.append(msg)

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Silencieux, directory=str(RACINE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    with sync_playwright() as p:
        nav = p.chromium.launch(channel="msedge", headless=not a.visible)
        ctx = nav.new_context(viewport={"width": 1440, "height": 900}, color_scheme="light")
        ctx.clock.install(time=datetime(2026, 11, 27, 9, 0, 0))
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and erreurs.append(m.text))
        pg.on("dialog", lambda d: d.accept())
        pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html")
        pg.wait_for_timeout(300)
        if pg.locator("#ident-fen").count():
            pg.click("#ident-fen [data-act=identFermer]"); pg.wait_for_timeout(150)
        if pg.locator("#demo-fen").count():
            pg.click("#demo-fen [data-act=demoFermer]"); pg.wait_for_timeout(150)

        print("Espace de démonstration")
        for f in DEMO.rglob("*.json"):
            pg.evaluate(ECRIRE, [f"SMSI/{f.relative_to(DEMO).as_posix()}", f.read_text(encoding="utf-8")])
        avant = pg.evaluate(EMPREINTES)
        pg.click("[data-act=espace]"); pg.wait_for_selector("h1:has-text('Groupe Démo Industrie')")
        ok(pg.locator("#sidebar [data-wnav=grc]").count() == 1, "menu Groupe : « Tableau de bord GRC »")
        pg.click("#sidebar [data-wnav=grc]"); pg.wait_for_timeout(250)
        main = lambda: pg.inner_text("#main")
        ok("Tableau de bord GRC" in main() and pg.locator(".grc-chips button").count() == 3, "page affichée, périmètres Groupe, LYON, NANTES")

        print("Chiffres clés")
        kp = pg.locator(".grc-kpi").all_inner_texts()
        ok(len(kp) == 4, "quatre chiffres clés")
        ok("Risques résiduels « Élevé » ou plus" in kp[0] and "3 / 5" in " ".join(kp[0].split()), f"risques résiduels élevés ou plus : 3 / 5 ({' '.join(kp[0].split())})")
        ok("Conformité moyenne" in kp[1] and "%" in kp[1], f"conformité moyenne ({' '.join(kp[1].split())})")
        ok(pg.locator(".grc-kpi[data-etat=ko]").count() >= 1, "état rouge sur au moins un chiffre clé")

        print("À traiter")
        items = pg.locator("[data-grc-traiter] li")
        textes = [" ".join(t.split()) for t in items.all_inner_texts()]
        sev = items.evaluate_all("l => l.map(x => x.dataset.sev)")
        ok(sev == sorted(sev, key=lambda s: 0 if s == "ko" else 1), "bloquants en tête")
        cherche = lambda *mots: next((t for t in textes if all(m in t for m in mots)), "")
        ok(cherche("Acceptation du risque résiduel expirée", "R-NAN-01", "NANTES"), "acceptation expirée (R-NAN-01, NANTES)")
        ok(cherche("Risque élevé sans traitement décidé", "R-NAN-03"), "risque sans traitement décidé (R-NAN-03)")
        ok(cherche("Acceptation du risque à renouveler", "R-LYON-01", "31/12/2026"), "acceptation à renouveler dans les 60 jours (R-LYON-01)")
        ok(cherche("2 action(s) du plan NIS2 en retard", "LYON"), "actions du plan NIS2 en retard (site:syntheseNis2)")
        ok(cherche("7 mesure(s) NIS2 non conforme(s)"), "mesures NIS2 non conformes")
        ok(cherche("sauvegarde(s) sans test de restauration", "BCK_002"), "sauvegarde jamais testée (BCK_002)")
        ok(cherche("écart(s) majeur(s) IEC 62443-3-3", "NANTES"), "écarts majeurs IEC 62443")
        ok(all(pg.locator("[data-grc-traiter] li").nth(i).locator(".badge").count() == 1 for i in range(min(3, len(textes)))), "module d'origine indiqué")

        print("Conformité et hygiène")
        conf = [" ".join(t.split()) for t in pg.locator("[data-grc-conformite] tbody tr").all_inner_texts()]
        ok(len(conf) == 3 and conf[0].startswith("Socle") and "50 %" in conf[0] and "0 %" in conf[0], f"socle du groupe : LYON 50 %, NANTES 0 % ({conf[0]})")
        ok(conf[1].startswith("NIS2") and "62 %" in conf[1] and "non publié" in conf[1], f"NIS2 : LYON 62 %, NANTES non publié ({conf[1]})")
        ok(conf[2].startswith("IEC 62443") and "63 %" in conf[2] and "42 %" in conf[2], f"IEC 62443 : 63 % et 42 % ({conf[2]})")
        hyg = [" ".join(t.split()) for t in pg.locator("[data-grc-hygiene] tbody tr").all_inner_texts()]
        ok(len(hyg) == 7 and hyg[0].startswith("Sauvegardes") and hyg[0].endswith("1 —"), f"hygiène : sauvegardes LYON 1, NANTES non publié ({hyg[0]})")
        ok(any(t.startswith("Formations exigées à jour") and "6 %" in t and "27 %" in t for t in hyg), "hygiène : formations à jour par site (groupe:formations)")

        print("Risques")
        cases = pg.locator(".grc-mx button")
        ok(cases.count() == 16, "matrice 4 × 4")
        teinte = lambda g, v: pg.get_attribute(f".grc-mx button[data-g='{g}'][data-v='{v}']", "data-t")
        ok(teinte(4, 4) == "4" and teinte(1, 1) == "1" and teinte(3, 2) == "3" and pg.locator("[data-grc-estimee]").count() == 0, "cases colorées avec la matrice publiée par le groupe")
        nb = lambda: pg.locator("[data-grc-risques] tbody tr").count()
        ok(nb() == 5, f"5 risques listés ({nb()})")
        ok(pg.inner_text(".grc-mx button[data-g='4'][data-v='2']") == "2", "résiduel : 2 risques en G4 × V2")
        pg.click(".grc-mx button[data-g='4'][data-v='2']"); pg.wait_for_timeout(150)
        ok(nb() == 2 and "Case G4 × V2" in pg.inner_text("[data-grc-risques]"), "clic sur une case : liste filtrée")
        pg.click("[data-grc-risques] a[data-act=grcCase]"); pg.wait_for_timeout(150)
        ok(nb() == 5, "« Tout afficher »")
        pg.click("[data-act=grcVue][data-v=brut]"); pg.wait_for_timeout(150)
        ok(pg.inner_text(".grc-mx button[data-g='4'][data-v='3']") == "2" and pg.inner_text(".grc-mx button[data-g='4'][data-v='4']") == "1", "brut : G4 × V3 (2), G4 × V4 (1)")
        pg.click("[data-act=grcVue][data-v=res]"); pg.wait_for_timeout(150)
        pg.screenshot(path=str(SORTIE / "grc_clair.png"), full_page=True)

        print("Périmètre d'un site")
        pg.click(".grc-chips button[data-p=LYON]"); pg.wait_for_timeout(200)
        ok(pg.get_attribute(".grc-chips button[data-p=LYON]", "aria-pressed") == "true" and nb() == 2, "LYON : 2 risques")
        ok(not any("NANTES" in " ".join(t.split()) for t in pg.locator("[data-grc-traiter] li").all_inner_texts()), "À traiter : LYON seulement")
        ok(pg.locator("[data-grc-conformite] td.on").count() == 3 and pg.locator("[data-grc-fraicheur] thead th").all_inner_texts() == ["Module", "LYON"], "colonne LYON mise en avant ; fraîcheur du site seul")
        pg.click("[data-grc-risques] tbody a[data-site=LYON]"); pg.wait_for_timeout(200)
        ok(pg.locator("h1").first.inner_text().find("LYON") >= 0 or "LYON" in pg.inner_text("#main h1"), "lien vers la page du site")
        pg.click("#sidebar [data-wnav=grc]"); pg.wait_for_timeout(200)
        pg.click(".grc-chips button[data-p=tous]"); pg.wait_for_timeout(200)
        fr = [" ".join(t.split()) for t in pg.locator("[data-grc-fraicheur] tbody tr").all_inner_texts()]
        ok(pg.locator("[data-grc-fraicheur] thead th").all_inner_texts() == ["Module", "Groupe", "LYON", "NANTES"] and any(t.startswith("WerbNIS2") and "25/11/2026" in t for t in fr),
           "fraîcheur : groupe et sites, publication NIS2 du 25/11/2026")

        print("Thème sombre")
        pg.emulate_media(color_scheme="dark"); pg.wait_for_timeout(250)
        fond = pg.eval_on_selector(".grc-mx button[data-t='4']", "e => getComputedStyle(e).backgroundColor")
        ok(pg.evaluate("document.documentElement.dataset.theme") == "sombre" and fond == "rgb(110, 38, 33)", f"niveaux de risque en teintes sombres ({fond})")
        pg.screenshot(path=str(SORTIE / "grc_sombre.png"), full_page=True)
        pg.emulate_media(color_scheme="light")

        print("Matrice du groupe non publiée")
        g = json.loads((DEMO / "publications" / "werbebios.json").read_text(encoding="utf-8"))
        g["data"]["echelles"].pop("matrice", None)
        pg.evaluate(ECRIRE, ["SMSI/publications/werbebios.json", json.dumps(g, ensure_ascii=False)])
        pg.click("[data-act=grcRelire]"); pg.wait_for_timeout(500)
        ok(pg.locator("[data-grc-estimee]").count() == 1 and pg.locator(".grc-mx button").count() == 16, "niveaux des cases estimés et signalés")
        pg.evaluate(ECRIRE, ["SMSI/publications/werbebios.json", (DEMO / "publications" / "werbebios.json").read_text(encoding="utf-8")])
        apres = pg.evaluate(EMPREINTES)
        apres.pop("publications/werbebios.json", None); avant.pop("publications/werbebios.json", None)
        ok(apres == avant, "rien d'écrit dans l'espace par le tableau de bord")
        nav.close()

    ok(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs[:3]}" if erreurs else ""))
    print(f"\n{'ÉCHEC' if echecs else 'Succès'} : {len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
