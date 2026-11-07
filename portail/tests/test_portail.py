# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Test du portail WerbSMSI dans Microsoft Edge (Playwright pour Python, Edge installé).

    pip install playwright
    python portail/tests/test_portail.py [--visible]

L'espace fictif demo/SMSI_GROUPE_DEMO et les paquets publiés sont copiés dans le système de fichiers
privé du navigateur de test (OPFS), qui remplace les sélecteurs de dossier. Profil temporaire, supprimé à la fin."""
import argparse
import os
import functools
import hashlib
import http.server
import json
import sys
import tempfile
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
REGISTRE = json.loads((RACINE / "registre_modules.json").read_text(encoding="utf-8"))
PUBLIES = [m for m in REGISTRE["modules"] if m.get("etat") == "publie"]
LIVRABLES = [f"{m['chemin']}/{json.loads((RACINE / m['chemin'] / 'module.json').read_text(encoding='utf-8'))['entree']}" for m in PUBLIES]

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Dossier « SMSI » pour l'espace, dossier « CODE » pour la vérification des modules (ouverte en lecture).
SIMULATION = """
window.showDirectoryPicker = async o => (await navigator.storage.getDirectory()).getDirectoryHandle(o && o.mode === "read" ? "CODE" : "SMSI", { create: true });
"""
ECRIRE = """async ([chemin, texte]) => {
  let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop();
  for (const p of parts) d = await d.getDirectoryHandle(p, { create: true });
  const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(texte); await w.close();
}"""
LIRE = """async chemin => { let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop(); for (const p of parts) d = await d.getDirectoryHandle(p);
  return (await (await d.getFileHandle(nom)).getFile()).text(); }"""
DOSSIER = """async ([chemin, action]) => {   // action : "existe", "creer" ou "supprimer"
  let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"), nom = parts.pop();
  try { for (const p of parts) d = await d.getDirectoryHandle(p, { create: action === "creer" }); } catch (e) { return false; }
  if (action === "supprimer") { await d.removeEntry(nom, { recursive: true }); return true; }
  try { await d.getDirectoryHandle(nom, { create: action === "creer" }); return true; } catch (e) { return false; }
}"""
# Dossiers de rubrique attendus par niveau : tirés du registre (charte §5.2, §5.3)
RUBS = sorted(REGISTRE["rubriques"], key=lambda r: r["ordre"])
DOSSIERS = {n: [r["id"] for r in RUBS if n in r.get("portees", ["groupe", "site"])] for n in ("groupe", "site")}
EMPREINTES = """async () => {
  const res = {};
  async function parcourir(d, chemin) {
    for await (const [nom, h] of d.entries()) {
      if (h.kind === "directory") await parcourir(h, chemin + nom + "/");
      else res[chemin + nom] = await WerbSocle.sha256(await h.getFile());
    }
  }
  await parcourir(await (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI"), "");
  return res;
}"""


def capture(page, nom, el=None):
    """Capture d'écran si WERB_CAPTURES désigne un dossier (relecture visuelle)."""
    d = os.environ.get("WERB_CAPTURES")
    if d:
        (el or page).screenshot(path=str(Path(d) / f"{nom}.png"))


class Silencieux(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--visible", action="store_true")
    a = ap.parse_args()
    ok = []

    def check(cond, msg):
        ok.append(bool(cond))
        print(("  OK     " if cond else "  ÉCHEC  ") + msg)

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Silencieux, directory=str(RACINE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{srv.server_address[1]}/"
    console, erreurs = [], []
    with tempfile.TemporaryDirectory() as profil, sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(profil, channel="msedge", headless=not a.visible)
        ctx.add_init_script(SIMULATION)
        page = ctx.new_page()
        page.on("console", lambda m: console.append(f"{m.type}: {m.text}"))
        page.on("pageerror", lambda e: erreurs.append(str(e)))
        ctx.on("page", lambda pg: pg.on("dialog", lambda d: d.accept()))
        page.on("dialog", lambda d: d.accept())
        page.goto(base + "portail/WerbSMSI.html")
        page.evaluate("localStorage.setItem('werb.werbmap.preference', '1')")

        print("— Accueil")
        page.wait_for_selector("h1:has-text('WerbSMSI')")
        page.wait_for_timeout(200)
        fen = page.locator("#demo-fen")
        check(fen.count() == 1 and "Découvrir WerbSMSI avec l'espace de démonstration" in fen.inner_text() and "demo/SMSI_GROUPE_DEMO" in page.inner_text("#demo-chemin"),
              "invitation à ouvrir l'espace de démonstration, avec son chemin")
        capture(page, "portail_demo")
        page.click("#demo-fen [data-act=demoFermer]"); page.wait_for_timeout(150)
        check(page.locator("#demo-fen").count() == 0, "« Plus tard » ferme la fenêtre")
        page.click("#sidebar [data-wnav=accueil]") if page.locator("#sidebar [data-wnav=accueil]").count() else None
        page.wait_for_timeout(200)
        check(page.locator("#demo-fen").count() == 0, "fenêtre proposée une seule fois par chargement")
        page.click("#main [data-act=demo]"); page.wait_for_timeout(150)
        check(page.locator("#demo-fen").count() == 1, "bouton « Espace de démonstration… » de l'accueil : fenêtre rouverte")
        page.click("#demo-fen [data-act=demoFermer]"); page.wait_for_timeout(150)
        ETAPES = sorted(REGISTRE["etapes"], key=lambda e: e["ordre"])
        etapes = page.locator("#main .card.rub h2").all_inner_texts()
        check(len(etapes) == len(ETAPES) and all(" ".join(r.split()).endswith(e["libelle"]) and str(e["ordre"]) in r for r, e in zip(etapes, ETAPES)),
              f"{len(ETAPES)} étapes du parcours affichées dans l'ordre ({', '.join(' '.join(r.split()) for r in etapes)})")
        check(page.locator("#etape-competences .tile h3:has-text('WerbAcademie')").count() == 1 and page.locator("#etape-connaitre .tile h3").count() == 3
              and page.locator("#etape-resilience .tile h3:has-text('WerbAcademie')").count() == 0, "WerbAcademie en étape 7, trois modules pour « Connaître son SI »")
        pc = page.inner_text("[data-parcours]")
        check(page.locator("[data-parcours] .pc-etape").count() == 7 and "pas besoin de tout utiliser dès le départ" in pc and "WerbMap · WerbAssets · WerbCartoSI" in pc,
              "accueil : parcours en 7 étapes avec ses modules")
        page.click("[data-parcours] [data-act=allerEtape][data-e=risques]"); page.wait_for_timeout(500)
        check(page.evaluate("Math.abs(document.getElementById('etape-risques').getBoundingClientRect().top) < 200"), "clic sur une étape : défilement jusqu'à ses modules")
        page.click("[data-parcours] [data-nav=infographie]"); page.wait_for_timeout(200)
        check(page.evaluate("(() => { const i = document.querySelector('.card.infographie img'); return !!i && i.src.startsWith('data:image/webp') && i.naturalWidth === 1024; })()")
              and page.locator("#sidebar [data-wnav=infographie]").count() == 1, "infographie : page dans ❓ Aide, image intégrée (WebP 1024 px)")
        page.click("#sidebar [data-wnav=accueil]"); page.wait_for_timeout(150)
        check(page.locator("#sidebar .wm-cat").count() == 4 and page.locator("#sidebar [data-wnav=sauvegarde]").count() == 1, "menu commun : Accueil, Outils, Administration, Aide (sans espace)")
        page.click("#sidebar [data-wnav=aide]")
        lignes_aide = page.locator(".card:has(h2:has-text('Ce que le portail repère')) tbody tr").all_inner_texts()
        manifestes = [json.loads((RACINE / m["chemin"] / "module.json").read_text(encoding="utf-8")) for m in PUBLIES]
        attendu = sum(len(man["portees"]) for man in manifestes if "donnees" in man)   # un module de lecture n'a pas de base
        check(len(lignes_aide) == attendu and any("sites/<CODE>/exploitation/" in l and ".werbexploitation.json" in l for l in lignes_aide),
              f"aide : dossier et extension de chaque module, déduits du registre ({len(lignes_aide)} ligne(s))")
        check(page.locator(".card.etape").count() == 7, "aide : prérequis, 4 étapes, dépannage, bon à savoir")
        capture(page, "portail_aide")
        page.click("#sidebar [data-wnav=accueil]")
        liens = sorted(page.eval_on_selector_all("a.btn.primary", "l => l.map(a => a.getAttribute('href'))"))
        check(liens == sorted(f"../{x}" for x in LIVRABLES), f"un lien par module publié ({len(liens)})")
        check(all(page.request.get(base + "portail/" + l).status == 200 for l in liens), "chaque lien mène au livrable")
        a_integrer = sum(1 for m in REGISTRE["modules"] if m.get("etat") == "a-integrer")
        check(page.locator(".tile .badge:has-text('à intégrer')").count() == a_integrer, f"modules à intégrer signalés ({a_integrer})")

        print("— Guide « Démarrer avec WerbSMSI » (dirigeants et débutants)")
        lien_guide = page.locator(".infobox a[data-nav^='guide:']")
        check(lien_guide.count() == 1 and "Démarrer avec WerbSMSI" in lien_guide.inner_text(), "accueil : guide proposé aux dirigeants et aux débutants")
        lien_guide.click(); page.wait_for_timeout(200)
        guide = page.inner_text("#main")
        check(all(s in guide for s in ("Le SMSI en cinq minutes", "Qui fait quoi", "La feuille de route sur douze mois", "Phase 0", "Phase 5", "Ce que le dirigeant doit faire", "Vos premiers pas cette semaine")),
              "guide affiché : SMSI, rôles, feuille de route en phases, rôle du dirigeant, premiers pas")
        check(all(m in guide for m in ("WerbGouvernance", "WerbEBIOS", "WerbMap", "WerbPCR", "WerbVeille")) and "Développé par @WerbHat" in guide, "guide : modules cités, signature")
        check(page.locator("#sidebar [data-wnav^='guide:']").count() == 1 and page.locator("#sidebar [data-wnav=aide]").count() == 1, "menu ❓ Aide : guide et « Créer la base d'un site »")
        capture(page, "portail_guide_demarrer")
        page.click("#sidebar [data-wnav=accueil]")

        print("— Espace du groupe")
        for f in DEMO.rglob("*"):
            if f.is_file() and f.suffix == ".json":
                page.evaluate(ECRIRE, [f"SMSI/{f.relative_to(DEMO).as_posix()}", f.read_text(encoding="utf-8")])
        # Module renommé (WerbTools_IEC62443 → WerbIEC62443) : base à l'ancienne extension, déclarée sous l'ancien identifiant
        s = json.loads((DEMO / "sites" / "NANTES" / "werbsmsi.site.json").read_text(encoding="utf-8"))
        s["data"]["bases"].append({"module": "werbtools-iec62443", "fichier": "conformite/Ancien.werbtools-iec62443.json", "libelle": "Projet avant renommage"})
        page.evaluate(ECRIRE, ["SMSI/sites/NANTES/werbsmsi.site.json", json.dumps(s, ensure_ascii=False)])
        ancien = (DEMO / "sites" / "LYON" / "conformite" / "Projet_L2.werbiec62443.json").read_text(encoding="utf-8")
        for x, y in (("WerbIEC62443", "WerbTools_IEC62443"), ("WERBIEC62443", "WERBTOOLS-IEC62443")):
            ancien = ancien.replace(x, y)
        page.evaluate(ECRIRE, ["SMSI/sites/NANTES/conformite/Ancien.werbtools-iec62443.json", ancien])
        g = json.loads((DEMO / "werbsmsi.groupe.json").read_text(encoding="utf-8"))
        g["data"]["sites"].append({"code": "PARIS", "nom": "Site sans dossier", "dossier": "sites/PARIS"})
        page.evaluate(ECRIRE, ["SMSI/werbsmsi.groupe.json", json.dumps(g, ensure_ascii=False)])
        # Espace complet : tous les dossiers de rubrique (le démo n'est recopié que pour ses fichiers .json)
        for d in DOSSIERS["groupe"]:
            page.evaluate(DOSSIER, [f"SMSI/groupe/{d}", "creer"])
        for code in ("LYON", "NANTES"):
            for d in DOSSIERS["site"] + ["publications"]:
                page.evaluate(DOSSIER, [f"SMSI/sites/{code}/{d}", "creer"])
        avant = page.evaluate(EMPREINTES)
        page.click("[data-act=espace]")
        page.wait_for_selector("h1:has-text('Groupe Démo Industrie')")
        check(page.locator("#sidebar .wm-cat").count() == 6 and page.locator("#sidebar [data-wnav='site:PARIS'] .wm-n").inner_text() == "🔒", "menu avec l'espace : Groupe et Sites ajoutés, site inaccessible marqué 🔒")
        capture(page, "portail_groupe")
        lignes = page.locator("#main .card").first.locator("tbody tr").all_inner_texts()
        check(any("LYON" in l and "lisible" in l for l in lignes) and any("PARIS" in l and "non accessible" in l for l in lignes), "sites lisibles et site inaccessible distingués")
        conf = page.locator(".card:has(h2:has-text('Conformité par site')) tbody tr").all_inner_texts()
        check(len(conf) == 2 and any("62.5 %" in l for l in conf) and any("41.7 %" in l for l in conf), "conformité consolidée (LYON 62,5 %, NANTES 41,7 %)")
        rq = page.locator(".card:has(h2:has-text('Risques par site')) table").first.locator("tbody tr").all_inner_texts()
        check(any(l.startswith("NANTES") and l.rstrip().endswith("2") for l in rq) and any(l.startswith("LYON") and l.rstrip().endswith("1") for l in rq), "risques consolidés par site (LYON 1, NANTES 2)")
        check(page.is_visible("th:has-text('Résiduel 3 – Élevé')"), "niveaux de risque libellés avec l'échelle du groupe")
        socle = page.locator(".card:has(h2:has-text('Socle de mesures')) tbody tr").all_inner_texts()
        ms1 = next(l for l in socle if l.startswith("MS-01"))
        ms2 = next(l for l in socle if l.startswith("MS-02"))
        check(ms1.count("non appliquée") == 2 and "appliquée" in ms2 and ms2.count("non appliquée") == 1, "socle × sites : MS-01 non appliquée partout, MS-02 appliquée à LYON seulement")
        check(page.is_visible("td:has-text('mesuresSocle (2)')"), "publications du groupe listées avec leurs objets")
        fo = json.loads((DEMO / "publications" / "werbacademie.json").read_text(encoding="utf-8"))["data"]["formations"]
        lf = page.locator("[data-formations] tbody tr").all_inner_texts()
        check(len(lf) == len(fo["parSite"]) + 1 and lf[-1].startswith("Groupe") and f"{fo['global']['taux']} %" in lf[-1]
              and f"{fo['dirigeants']['personnesAJour']} / {fo['dirigeants']['personnes']}" in page.inner_text("[data-formations]"), "formation et sensibilisation : taux par site et du groupe, dirigeants (groupe:formations)")
        check(page.locator("[data-act=creerDossiers]").count() == 0, "espace complet : aucun dossier de rubrique signalé absent")
        ca = json.loads((DEMO / "sites" / "LYON" / "publications" / "werbcartosi.json").read_text(encoding="utf-8"))["data"]["cartographies"]
        lc = page.locator("[data-cartographies] tbody tr").all_inner_texts()
        nc = sum(1 for x in ca if x["etat"] == "couverte")
        check(len(lc) == 1 and lc[0].startswith("LYON") and f"{nc} / {len(ca)}" in lc[0], f"schémas d'architecture par site : LYON {nc} / {len(ca)} exigences couvertes (site:cartographies)")

        print("— Vues site")
        page.click("#sidebar [data-wnav='site:LYON']")
        page.wait_for_selector("h1:has-text('LYON')")
        bases = page.locator(".card:has(h2:has-text('Bases du site')) tbody tr").all_inner_texts()
        n_lyon = len(json.loads((DEMO / "sites" / "LYON" / "werbsmsi.site.json").read_text(encoding="utf-8"))["data"]["bases"])
        check(len(bases) == n_lyon and all("présente" in b for b in bases) and any("NIS2" in b for b in bases) and any("Pentest" in b or "intrusion" in b for b in bases)
              and any("cybersécurité et de reprise" in b for b in bases), f"{n_lyon} bases déclarées et présentes à LYON (dont WerbNIS2, WerbPentest et WerbPCR)")
        check(any("correspondant cyber Lyon" in b and "WerbIEC62443" in b for b in bases), "verrou affiché : projet IEC ouvert par le correspondant")
        check(any("v1.3.0" in b for b in bases), "version de l'outil lue dans la base")
        ly = next(x for x in fo["parSite"] if x["site"] == "LYON")
        lfs = page.locator("[data-formations-site] tbody tr").all_inner_texts()
        check(lfs and lfs[0].startswith("LYON") and f"{ly['taux']} %" in lfs[0] and any("Dirigeants" in l for l in lfs[1:]), "vue site : formation du site et par population (groupe:formations)")
        lcs = page.locator("[data-carto-site] tbody tr").all_inner_texts()
        check(len(lcs) == len(ca) and any("SCH-001" in l for l in lcs) and not any("sharepoint" in l or "schemas/" in l for l in lcs), "vue site : couverture par exigence et schémas, sans chemin")
        page.click("#sidebar [data-wnav='site:NANTES']")
        page.wait_for_selector("h1:has-text('NANTES')")
        check(page.is_visible("td:has-text('non déclarée')"), "base présente mais non déclarée signalée à NANTES")
        bn = page.locator(".card:has(h2:has-text('Bases du site')) tbody tr").all_inner_texts()
        check(any(b.startswith("WerbIEC62443") and "Ancien.werbtools-iec62443.json" in b and "présente" in b for b in bn),
              "module renommé : base déclarée sous l'ancien identifiant, à l'ancienne extension, reconnue comme WerbIEC62443")
        page.click("#sidebar [data-wnav='site:PARIS']")
        check(page.is_visible(".warnbox:has-text('pas accessible')"), "site sans dossier : message d'accès")

        print("— Vérification des modules")
        for f in ["registre_modules.json"] + LIVRABLES:
            page.evaluate(ECRIRE, [f"CODE/{f}", (RACINE / f).read_text(encoding="utf-8")])
        page.click("#sidebar [data-wnav=verif]")
        page.click("[data-act=verifier]")
        page.wait_for_selector("td .badge")
        check(page.locator(".badge.b-ok:has-text('conforme')").count() == len(LIVRABLES) and page.locator(".badge.b-ko").count() == 0, f"{len(LIVRABLES)} livrable(s) conforme(s) à l'empreinte enregistrée")
        page.evaluate(ECRIRE, [f"CODE/{LIVRABLES[0]}", "<!doctype html><p>modifié</p>"])
        page.click("[data-act=verifier]")
        page.wait_for_selector(".badge.b-ko:has-text('EMPREINTE DIFFÉRENTE')")
        check(page.locator(".badge.b-ko").count() == 1, "livrable modifié détecté, les autres restent conformes")

        print("— Lecture seule hors actions explicites, stockage, erreurs")
        check(page.evaluate(EMPREINTES) == avant, "aucun fichier de l'espace modifié par la consultation")
        check(page.evaluate("localStorage.getItem('werb.werbmap.preference')") == "1", "stockage des autres modules intact")
        check(page.evaluate("indexedDB.databases().then(l => l.map(d => d.name))").count("werb.werbsmsi.raccourcis") == 1, "🔗 raccourci d'espace rangé dans werb.werbsmsi.raccourcis (option active)")

        print("— Bases par site et ouverture depuis le portail")
        page.click("#sidebar [data-wnav=groupe]")
        carte = page.locator(".card:has(h2:has-text('Bases par module et par site'))")
        tuile = lambda nom: carte.locator(f".tile:has(h3:has-text('{nom}'))")
        capture(page, "portail_bases_par_site", carte)
        te = tuile("WerbExploitation")
        check(te.locator("a.chip:has-text('LYON')").count() == 1 and te.locator(".chip.vide:has-text('NANTES')").count() == 1 and te.locator(".chip.ferme:has-text('PARIS')").count() == 1,
              "WerbExploitation : LYON ouvrable, NANTES sans base, PARIS fermé")
        check(tuile("WerbGouvernance").locator("a.chip:has-text('Groupe')").count() == 1, "WerbGouvernance : base du groupe ouvrable")
        ti = tuile("WerbIEC62443")
        check(ti.locator("a.chip:has-text('Groupe')").count() == 1 and ti.locator("a.chip:has-text('LYON')").count() == 1, "WerbIEC62443 : niveau groupe et niveau site (puces 🏢 Groupe et 📍 LYON)")
        with ctx.expect_page() as nouvelle:
            ti.locator("a.chip:has-text('Groupe')").click()
        mod = nouvelle.value
        mod.wait_for_selector("#login-name")
        mod.fill("#login-name", "Prénom TEST"); mod.click("[data-act=login]"); mod.click("[data-act=openLink]")
        mod.wait_for_selector("#tb-status .pill:has-text('Groupe')")
        check("Exigences cadre du groupe" in mod.inner_text("#tb-project"), "WerbIEC62443 : projet du groupe ouvert depuis le portail (pastille « Groupe »)")
        mod.click("#sidebar [data-wnav=werbsmsi]")
        check(mod.is_visible("text=Rattaché au groupe") and mod.is_visible("h2:has-text('Niveau groupe')") and not mod.is_visible("text=Publier vers le site"),
              "WerbIEC62443 niveau groupe : socle affiché, pas de publication de site")
        mod.close()
        check(tuile("WerbEBIOS").locator("a.chip:has-text('Groupe')").count() == 1 and tuile("WerbEBIOS").locator("a.chip:has-text('LYON')").count() == 1, "WerbEBIOS : analyses du groupe et de LYON ouvrables depuis leurs puces")
        check(page.locator(".tile:has(h3:has-text('WerbMap')) a.chip:has-text('LYON')").count() >= 1, "puces aussi sous les modules de la rubrique")
        with ctx.expect_page() as nouvelle:
            te.locator("a.chip:has-text('LYON')").click()
        mod = nouvelle.value
        mod.wait_for_selector("#nomUtil")
        mod.evaluate("() => { window.showDirectoryPicker = async () => { throw new Error('sélecteur appelé'); }; }")   # le raccourci doit l'éviter
        mod.fill("#nomUtil", "Prénom TEST"); mod.click("[data-act=entrer]")
        check(mod.is_visible("text=Base demandée par le portail"), "module ouvert sur l'accueil avec la base demandée")
        mod.click("[data-act=ouvrirLien]")
        mod.wait_for_selector("#tb-status:has-text('Site LYON')")
        check("Exploitation_LYON" in mod.inner_text("#tb-base") and "werbsmsi=" not in mod.url, "🔗 raccourci : base du site LYON ouverte sans sélecteur de dossier, lien retiré de l'adresse")
        mod.click("#tb-actions [data-act=enregistrer]")
        mod.fill("#versionCom", "Version de test"); mod.click("#modal-root [data-version] [data-x=oui]")   # WerbExploitation 1.13 : commentaire de version
        mod.wait_for_timeout(400)
        j = json.loads(page.evaluate(LIRE, "SMSI/sites/LYON/exploitation/Exploitation_LYON.werbexploitation.json"))
        check(any(e.get("par") == "Prénom TEST" and e.get("action") in ("Enregistrement", "Version") for e in j["journal"]), "enregistrement à sa place dans l'espace (sans sélecteur de fichier)")
        mod.close()
        page.uncheck("#optRaccourcis")
        page.wait_for_timeout(300)
        with ctx.expect_page() as nouvelle:
            tuile("WerbGouvernance").locator("a.chip:has-text('Groupe')").click()
        mod = nouvelle.value
        mod.wait_for_selector("#nomUtil")
        mod.evaluate("() => { window.showDirectoryPicker = async () => { throw new Error('sélecteur appelé'); }; }")
        mod.fill("#nomUtil", "Prénom TEST"); mod.click("[data-act=entrer]"); mod.click("[data-act=ouvrirLien]")
        mod.wait_for_timeout(400)
        check("sélecteur appelé" in mod.inner_text("#toasts"), "option 🔗 Raccourcis décochée : raccourci effacé, le module redemande le dossier")
        mod.close()
        page.check("#optRaccourcis")
        page.wait_for_timeout(300)
        with ctx.expect_page() as nouvelle:
            tuile("WerbGouvernance").locator("a.chip:has-text('Groupe')").click()
        mod = nouvelle.value
        mod.wait_for_selector("#nomUtil")
        mod.fill("#nomUtil", "Prénom TEST"); mod.click("[data-act=entrer]"); mod.click("[data-act=ouvrirLien]")
        mod.wait_for_selector("#tb-status:has-text('Groupe')")
        check("Gouvernance_GDI" in mod.inner_text("#tb-base"), "WerbGouvernance : base du groupe ouverte depuis l'espace")
        mod.close()

        print("— Mise en place : nouveau module")
        page.click("#sidebar [data-wnav=assistant]")
        page.click("[data-act=onglet][data-k=module]")
        for k, v in {"id": "eva", "produit": "werbUT", "description": "test de texte", "dest": "C:\\Temp\\WerbUT"}.items():
            page.fill(f"[data-form=module][data-k={k}]", v); page.press(f"[data-form=module][data-k={k}]", "Tab")
        page.select_option("[data-form=module][data-k=rubrique]", "inventaires")   # rubrique du seul niveau site
        page.wait_for_timeout(100)
        check(page.is_visible(".err:has-text('proposition : WerbUT')"), "produit « werbUT » refusé avec la proposition « WerbUT »")
        page.fill("[data-form=module][data-k=produit]", "WerbUT"); page.press("[data-form=module][data-k=produit]", "Tab")
        page.wait_for_timeout(100)
        cmd = page.inner_text("pre.cmd")
        check("nouveau --id eva --produit WerbUT --rubrique inventaires --portees site --description 'test de texte'" in cmd, "commande « nouveau » générée, valide")

        print("— Mise en place : création d'un espace, d'un site, déclaration")
        page.click("[data-act=onglet][data-k=espace]")
        page.fill("[data-form=espace][data-k=organisation]", "Groupe Test (fictif)"); page.press("[data-form=espace][data-k=organisation]", "Tab")
        page.fill("[data-form=espace][data-k=sigle]", "tst"); page.press("[data-form=espace][data-k=sigle]", "Tab")
        page.fill("[data-fsite='0'][data-k=code]", "usine1"); page.press("[data-fsite='0'][data-k=code]", "Tab")
        page.fill("[data-fsite='0'][data-k=nom]", "Usine 1 (fictive)"); page.press("[data-fsite='0'][data-k=nom]", "Tab")
        page.wait_for_timeout(100)
        capture(page, "portail_creer_espace")
        check("SMSI_TST/" in page.inner_text("pre.arbo") and "USINE1/" in page.inner_text("pre.arbo"), "aperçu de l'arborescence (sigle et code en majuscules)")
        page.click("[data-act=creerEspace]")
        page.wait_for_selector("h1:has-text('Groupe Test (fictif)')")
        g = json.loads(page.evaluate(LIRE, "SMSI/SMSI_TST/werbsmsi.groupe.json"))
        s = json.loads(page.evaluate(LIRE, "SMSI/SMSI_TST/sites/USINE1/werbsmsi.site.json"))
        check(g["format"] == "WERBSMSI-GROUPE" and g["data"]["sigle"] == "TST" and g["data"]["sites"][0]["code"] == "USINE1" and s["data"]["groupeId"] == g["data"]["groupeId"],
              "espace créé : werbsmsi.groupe.json et site USINE1 reliés par le groupeId")
        check("Droits d'accès" in page.evaluate(LIRE, "SMSI/SMSI_TST/DROITS.md"), "DROITS.md écrit")
        check("continuite" in DOSSIERS["groupe"] and "continuite" in DOSSIERS["site"]
              and all(page.evaluate(DOSSIER, [f"SMSI/SMSI_TST/groupe/{d}", "existe"]) for d in DOSSIERS["groupe"])
              and all(page.evaluate(DOSSIER, [f"SMSI/SMSI_TST/sites/USINE1/{d}", "existe"]) for d in DOSSIERS["site"] + ["publications"]),
              f"dossiers de rubrique tirés du registre (groupe : {', '.join(DOSSIERS['groupe'])} ; site : {', '.join(DOSSIERS['site'])})")
        # Espace créé avant la rubrique « continuite » : dossiers signalés, créés sur action explicite (charte §5.6)
        for d in ("SMSI/SMSI_TST/groupe/continuite", "SMSI/SMSI_TST/sites/USINE1/continuite"):
            page.evaluate(DOSSIER, [d, "supprimer"])
        page.click("#tb-actions [data-act=actualiser]")
        page.wait_for_timeout(300)
        alerte = page.locator(".warnbox:has([data-act=creerDossiers])")
        check(alerte.count() == 1 and "groupe/continuite/" in alerte.inner_text() and "sites/USINE1/continuite/" in alerte.inner_text(), "dossiers de rubrique absents signalés dans la vue groupe")
        page.click("[data-act=creerDossiers]")
        page.wait_for_timeout(300)
        check(page.evaluate(DOSSIER, ["SMSI/SMSI_TST/groupe/continuite", "existe"]) and page.evaluate(DOSSIER, ["SMSI/SMSI_TST/sites/USINE1/continuite", "existe"])
              and page.locator("[data-act=creerDossiers]").count() == 0, "📁 Créer les dossiers manquants : dossiers créés, alerte levée")
        page.click("#sidebar [data-wnav=assistant]")
        page.click("[data-act=onglet][data-k=site]")
        page.fill("[data-form=site][data-k=code]", "usine2"); page.press("[data-form=site][data-k=code]", "Tab")
        page.fill("[data-form=site][data-k=nom]", "Usine 2 (fictive)"); page.press("[data-form=site][data-k=nom]", "Tab")
        page.wait_for_timeout(100)
        page.click("[data-act=creerSite]")
        page.wait_for_selector("h1:has-text('USINE2')")
        g = json.loads(page.evaluate(LIRE, "SMSI/SMSI_TST/werbsmsi.groupe.json"))
        check([x["code"] for x in g["data"]["sites"]] == ["USINE1", "USINE2"], "site USINE2 ajouté à l'espace ouvert")
        page.evaluate(ECRIRE, ["SMSI/SMSI_TST/sites/USINE2/exploitation/Exploitation_USINE2.werbexploitation.json", (DEMO / "sites/LYON/exploitation/Exploitation_LYON.werbexploitation.json").read_text(encoding="utf-8")])
        page.click("#tb-actions [data-act=actualiser]")
        page.click("#sidebar [data-wnav='site:USINE2']")
        page.click("[data-act=declarer]")
        page.wait_for_selector("td .badge:has-text('présente')")
        s = json.loads(page.evaluate(LIRE, "SMSI/SMSI_TST/sites/USINE2/werbsmsi.site.json"))
        check(s["data"]["bases"] == [{"module": "werbexploitation", "fichier": "exploitation/Exploitation_USINE2.werbexploitation.json", "libelle": "Exploitation USINE2"}], "base non déclarée déclarée depuis le portail")

        print("— Verrou des bases (charte §5.7)")
        chemin = "SMSI/SMSI_TST/sites/USINE2/exploitation/Exploitation_USINE2.werbexploitation.json"
        def verrouiller(il_y_a_h):
            j = json.loads(page.evaluate(LIRE, chemin))
            t = page.evaluate(f"new Date(Date.now() - {il_y_a_h} * 3600e3).toISOString()")
            j["verrou"] = {"par": "Carole PETIT", "depuis": t, "vu": t, "session": "autre-poste"}
            page.evaluate(ECRIRE, [chemin, json.dumps(j, ensure_ascii=False)])
            page.click("#tb-actions [data-act=actualiser]")
            page.wait_for_timeout(300)
        verrouiller(0)
        check(page.locator("td:has-text('🔒 Carole PETIT')").count() == 1, "vue du site : « Ouverte par » 🔒 Carole PETIT")
        page.click("#sidebar [data-wnav=groupe]")
        puce = page.locator(".tile:has(h3:has-text('WerbExploitation')) a.chip:has-text('USINE2')").first   # WerbExploitation : tuile au groupe et au site (1.19.0)
        check("🔒" in puce.inner_text() and "Ouverte par Carole PETIT depuis" in (puce.get_attribute("title") or ""), "puce de la base : cadenas et nom de la personne")
        verrouiller(13)
        check("🔒" not in puce.inner_text(), "verrou de plus de 12 h : plus de cadenas")
        page.click("#sidebar [data-wnav='site:USINE2']")
        check(page.locator("td:has-text('Carole PETIT (verrou expiré)')").count() == 1, "vue du site : verrou expiré signalé comme tel")
        csp = [c for c in console if "Content Security Policy" in c]
        check(not csp, "aucune violation de CSP" + (f" : {csp[:2]}" if csp else ""))
        check(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs[:2]}" if erreurs else ""))
        ctx.close()
    srv.shutdown()
    ko = ok.count(False)
    print(f"\n{len(ok) - ko} contrôle(s) réussi(s), {ko} échec(s).")
    return 1 if ko else 0


if __name__ == "__main__":
    sys.exit(main())
