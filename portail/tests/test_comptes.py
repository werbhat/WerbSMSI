# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Comptes de l'espace (portail 1.22.0, socle 1.13.0, charte §5.10) dans Microsoft Edge (Playwright pour Python).

    python portail/tests/test_comptes.py [--visible]

Espace de démonstration (comptes admin.demo, tech.demo, audit.demo) copié dans le système de fichiers privé du navigateur.
Contrôles : connexion exigée à l'ouverture de l'espace (menu réduit, page de connexion) ; mot de passe faux refusé ; administrateur :
tableau de bord, menu Administration › Comptes et droits ; matrice compte × colonne (Groupe, LYON, NANTES) ; changement d'un rôle,
ajout d'un compte, désactivation, contrôle « aucun administrateur du groupe » ; enregistrement (révision, journal, mot de passe
jamais en clair) ; export CSV ; ticket dans les liens des modules, vérifié par le socle, refusé s'il est modifié ; changement de mot
de passe ; déconnexion ; éditeur d'un site : pas de vue groupe ni d'administration, un seul site ; session expirée après 12 h ;
nouvel espace sans comptes : création du compte administrateur (contrôles du mot de passe) ; aucune erreur JavaScript.
"""
import argparse
import functools
import http.server
import json
import sys
import threading
import urllib.parse
from datetime import datetime
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
SORTIE = Path(__file__).resolve().parent / "sortie"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SIMULATION = """window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle(window.__dossier || "SMSI", { create: true });"""
ECRIRE = """async ([chemin, texte]) => { let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop(); for (const p of parts) d = await d.getDirectoryHandle(p, { create: true });
  const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(texte); await w.close(); }"""
LIRE = """async chemin => { let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop(); for (const p of parts) d = await d.getDirectoryHandle(p);
  return (await (await d.getFileHandle(nom)).getFile()).text(); }"""


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
        ctx = nav.new_context(viewport={"width": 1440, "height": 900}, accept_downloads=True)
        ctx.clock.install(time=datetime(2026, 11, 27, 9, 0, 0))
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and erreurs.append(m.text))
        pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html")
        pg.wait_for_timeout(300)
        for f in ("#ident-fen [data-act=identFermer]", "#demo-fen [data-act=demoFermer]"):
            if pg.locator(f).count():
                pg.click(f); pg.wait_for_timeout(150)
        for f in DEMO.rglob("*.json"):
            pg.evaluate(ECRIRE, [f"SMSI/{f.relative_to(DEMO).as_posix()}", f.read_text(encoding="utf-8")])
        lire = lambda c: json.loads(pg.evaluate(LIRE, c))
        def attendre(expr, delai=30000):
            for _ in range(delai // 200):
                if pg.evaluate(f"() => !!({expr})"):
                    return True
                pg.wait_for_timeout(200)
            return False
        menu = lambda: pg.locator("#sidebar [data-wnav]").evaluate_all("l => l.map(x => x.dataset.wnav)")

        def connexion(login, mdp):
            pg.fill("#cxLogin", login); pg.fill("#cxMdp", mdp); pg.click("[data-act=cxValider]")
            attendre("!document.querySelector('[data-connexion]') || document.querySelector('#cxErr').textContent.includes('incorrect')")
            pg.wait_for_timeout(200)

        print("Ouverture de l'espace")
        pg.click("[data-act=espace]"); pg.wait_for_selector("[data-connexion]")
        ok("demo" not in menu() and "groupe" not in menu() and "comptes" not in menu() and "site:LYON" not in menu(), f"avant connexion : menu réduit ({menu()})")
        ok(pg.locator("[data-demo-comptes]").count() == 1 and "Connexion requise" in pg.inner_text("#tb-user"), "page de connexion, comptes de démonstration indiqués, bandeau")
        connexion("admin.demo", "mauvais-mot-de-passe")
        ok("Identifiant ou mot de passe incorrect" in pg.inner_text("#cxErr") and pg.locator("[data-connexion]").count() == 1, "mot de passe faux refusé")

        print("Administrateur")
        connexion("ADMIN.demo", "Demo-Admin-2026")
        ok("Groupe Démo Industrie" in pg.inner_text("#main h1") and "Administrateur DEMO" in pg.inner_text("#tb-user"), "connecté (identifiant sans casse) : page du groupe, nom dans le bandeau")
        m = menu()
        ok(all(x in m for x in ("grc", "groupe", "site:LYON", "site:NANTES", "comptes", "parametres", "assistant")), "menu complet d'un administrateur du groupe")
        hrefs = pg.eval_on_selector_all("a[href*='werbsmsi=']", "l => l.map(a => a.getAttribute('href'))") or []
        pg.click("#sidebar [data-wnav=accueil]"); pg.wait_for_timeout(200)
        hrefs = pg.eval_on_selector_all("#main .tile a.btn.primary", "l => l.map(a => a.getAttribute('href'))")
        dec = lambda h: json.loads(urllib.parse.unquote(h.split("#werbsmsi=")[1]))
        tk = [dec(h).get("t") for h in hrefs if "#werbsmsi=" in h]
        ok(tk and all(tk) and all(dec(h).get("u") == "Administrateur DEMO" for h in hrefs if "#werbsmsi=" in h), f"liens des {len(tk)} modules : nom et ticket transmis")
        v = pg.evaluate("t => WerbSocle.comptes.verifierTicket(t)", tk[0])
        ok(v and v["login"] == "admin.demo" and v["droits"]["GROUPE"] == "administrateur", "ticket vérifié par le socle (compte et droits relus)")
        corps, sig = tk[0].split(".")
        faux = corps[:-2] + ("AA" if corps[-2:] != "AA" else "BB") + "." + sig
        ok(pg.evaluate("t => WerbSocle.comptes.verifierTicket(t)", faux) is None, "ticket modifié : refusé")

        print("Comptes et droits")
        pg.click("#sidebar [data-wnav=comptes]"); pg.wait_for_selector("[data-cp-matrice]")
        ths = [x.strip() for x in pg.locator(".cp-mx thead th").all_inner_texts()]
        ok(ths[2:5] == ["🏢 Groupe", "📍 LYON", "📍 NANTES"] and pg.locator(".cp-mx tbody tr").count() == 3, f"matrice : 3 comptes × Groupe, LYON, NANTES ({ths})")
        sel = lambda l, c: f"select[data-cpl='{l}'][data-cpc='{c}']"
        ok(pg.input_value(sel("tech.demo", "LYON")) == "editeur" and pg.input_value(sel("tech.demo", "GROUPE")) == "", "rôles de la démonstration")
        ok(pg.get_attribute(f"td:has({sel('admin.demo', 'GROUPE')})", "data-role") == "administrateur", "case colorée selon le rôle")
        pg.select_option(sel("tech.demo", "NANTES"), "editeur"); pg.wait_for_timeout(150)
        ok("Modifications non enregistrées" in pg.inner_text("#main") and pg.is_enabled("[data-act=cpEnregistrer]"), "brouillon signalé")
        pg.select_option(sel("admin.demo", "GROUPE"), "editeur"); pg.wait_for_timeout(150)
        ok(pg.is_disabled("[data-act=cpEnregistrer]") and "Aucun administrateur du groupe actif" in pg.inner_text("[data-cp-controles]"), "plus d'administrateur du groupe : enregistrement bloqué")
        pg.select_option(sel("admin.demo", "GROUPE"), "administrateur"); pg.wait_for_timeout(150)
        pg.fill("#cpLogin", "rssi.lyon"); pg.fill("#cpNom", "Camille RSSI"); pg.fill("#cpMdp", "court")
        pg.click("[data-act=cpAjouter]"); pg.wait_for_timeout(150)
        ok(pg.locator("[data-cp-compte='rssi.lyon']").count() == 0 and "12 caractères" in pg.inner_text("#toasts"), "mot de passe trop court refusé")
        pg.fill("#cpMdp", "Lyon-Secret-2026!"); pg.click("[data-act=cpAjouter]"); pg.wait_for_timeout(150)
        ok(pg.locator("[data-cp-compte='rssi.lyon']").count() == 1, "compte ajouté à la matrice")
        ok("rssi.lyon : compte actif sans aucun droit" in pg.inner_text("[data-cp-controles]"), "compte sans droit signalé")
        pg.select_option(sel("rssi.lyon", "LYON"), "administrateur"); pg.wait_for_timeout(150)
        pg.click("[data-cp-compte='audit.demo'] [data-act=cpActif]"); pg.wait_for_timeout(150)
        pg.click("[data-act=cpEnregistrer]")
        attendre("document.querySelector('#toasts').textContent.includes('enregistrés')")
        d = lire("SMSI/werbsmsi.comptes.json")["data"]
        rs = next(c for c in d["comptes"] if c["login"] == "rssi.lyon")
        brut = pg.evaluate(LIRE, "SMSI/werbsmsi.comptes.json")
        ok(d["revision"] == 2 and rs["droits"] == {"LYON": "administrateur"} and rs["iterations"] == 600000 and "Lyon-Secret-2026" not in brut, "enregistré : révision 2, droits, mot de passe jamais en clair")
        ok(next(c for c in d["comptes"] if c["login"] == "tech.demo")["droits"]["NANTES"] == "editeur" and next(c for c in d["comptes"] if c["login"] == "audit.demo")["actif"] is False, "rôle changé, compte désactivé")
        acts = [(j["action"], j["compte"]) for j in d["journal"][-4:]]
        ok(("Droits", "tech.demo") in acts and ("Création", "rssi.lyon") in acts and ("Désactivation", "audit.demo") in acts and all(j["par"] == "admin.demo" for j in d["journal"][-3:]), f"journal : droits, création, désactivation par admin.demo ({acts})")
        ok("Création" in pg.inner_text("[data-cp-journal]"), "journal affiché")
        with pg.expect_download() as dl:
            pg.click("[data-act=cpExporter]")
        csv = Path(dl.value.path()).read_text(encoding="utf-8-sig")
        ok(csv.splitlines()[0].startswith('"Identifiant";"Nom";"État";"Groupe";"LYON";"NANTES"') and '"rssi.lyon";"Camille RSSI";"actif";"";"Administrateur";""' in csv, "export CSV de la matrice")
        pg.emulate_media(media="print"); pg.screenshot(path=str(SORTIE / "comptes_impression.png"), full_page=True); pg.emulate_media(media="screen")
        pg.screenshot(path=str(SORTIE / "comptes_matrice.png"), full_page=True)

        print("Mon compte")
        pg.click("#tb-user [data-act=monCompte]"); pg.click("[data-act=monMdp]")
        pg.fill("#mdpAncien", "Demo-Admin-2026"); pg.fill("#mdpNouveau", "Nouveau-Admin-2026"); pg.fill("#mdpConf", "Nouveau-Admin-2026")
        pg.click("[data-act=mdpValider]")
        attendre("document.querySelector('#toasts').textContent.includes('Mot de passe changé')")
        ok(lire("SMSI/werbsmsi.comptes.json")["data"]["journal"][-1]["action"] == "Mot de passe", "mot de passe changé, tracé au journal")
        pg.click("#tb-user [data-act=monCompte]"); pg.click("[data-act=deconnecter]"); pg.wait_for_selector("[data-connexion]")
        ok(True, "déconnexion : retour à la connexion, espace toujours ouvert")
        connexion("admin.demo", "Demo-Admin-2026")
        ok(pg.locator("[data-connexion]").count() == 1, "ancien mot de passe refusé")

        print("Éditeur d'un site")
        connexion("rssi.lyon", "Lyon-Secret-2026!")
        m = menu()
        ok("site:LYON" in m and "site:NANTES" not in m and "groupe" not in m and "comptes" not in m and "assistant" not in m, f"menu : LYON seulement, ni groupe ni administration ({m})")
        ok("LYON" in pg.inner_text("#main h1"), "arrivée sur la page de son site")
        pg.click("#sidebar [data-wnav=grc]"); pg.wait_for_timeout(200)
        ok(pg.locator("[data-grc-traiter]").count() == 1 and pg.locator(".grc-chips button").count() == 2, "tableau de bord limité à ses sites")
        pg.evaluate("document.querySelector('#sidebar') && 0")
        pg.locator("#main").evaluate("m => { const a = document.createElement('a'); a.href = '#'; a.dataset.nav = 'comptes'; a.id = 'forcer'; a.textContent = 'x'; m.appendChild(a); }")
        pg.click("#forcer"); pg.wait_for_timeout(150)
        ok("Accès réservé" in pg.inner_text("#main"), "page d'administration demandée directement : accès réservé")

        print("Session de 12 h")
        pg.clock.fast_forward("12:30:00")
        pg.click("#sidebar [data-wnav=accueil]"); pg.wait_for_timeout(300)
        ok(pg.locator("[data-connexion]").count() == 1 and "Session expirée" in pg.inner_text("#main"), "session expirée : reconnexion demandée")

        print("Nouvel espace sans comptes")
        pg.click("[data-act=fermer]"); pg.wait_for_timeout(200)
        g = json.loads((DEMO / "werbsmsi.groupe.json").read_text(encoding="utf-8"))
        g["data"]["groupeId"] = "11111111-2222-3333-4444-555555555555"; g["data"]["organisation"] = "Espace neuf (test)"
        pg.evaluate(ECRIRE, ["NEUF/werbsmsi.groupe.json", json.dumps(g, ensure_ascii=False)])
        pg.evaluate("window.__dossier = 'NEUF'")
        pg.click("[data-act=espace]"); pg.wait_for_selector("[data-creation-admin]")
        ok("administrateur du groupe et de tous les sites" in pg.inner_text("[data-creation-admin]"), "espace sans comptes : création du compte administrateur proposée")
        pg.fill("#caLogin", "premier.admin"); pg.fill("#caNom", "Dominique ADMIN"); pg.fill("#caMdp", "premier.admin-2026"); pg.fill("#caMdp2", "premier.admin-2026")
        pg.click("[data-act=caValider]"); pg.wait_for_timeout(300)
        ok("ne doit pas contenir l'identifiant" in pg.inner_text("#caErr"), "mot de passe contenant l'identifiant refusé")
        pg.fill("#caMdp", "Mot-de-passe-solide-1"); pg.fill("#caMdp2", "Mot-de-passe-solide-1")
        pg.click("[data-act=caValider]"); pg.wait_for_selector("#tb-user [data-act=monCompte]", timeout=30000)
        d = lire("NEUF/werbsmsi.comptes.json")["data"]
        ok(len(d["comptes"]) == 1 and d["comptes"][0]["droits"] == {"GROUPE": "administrateur", "LYON": "administrateur", "NANTES": "administrateur"} and len(d["cle"]) == 64
           and d["journal"][0]["action"] == "Création" and d["groupeId"] == g["data"]["groupeId"], "premier compte : administrateur du groupe et des sites, clé des tickets, journal")
        ok("comptes" in menu(), "administrateur connecté")
        nav.close()

    ok(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs[:3]}" if erreurs else ""))
    print(f"\n{'ÉCHEC' if echecs else 'Succès'} : {len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
