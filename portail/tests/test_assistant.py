# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Assistant IA optionnel (phase 3a) dans Microsoft Edge (Playwright pour Python) : les DEUX cas de la politique « IA optionnelle ».

    python portail/tests/test_assistant.py [--visible]

Portail assemblé (portail/WerbSMSI.html). Espace de démonstration copié dans le système de fichiers privé du navigateur.
Le cas 2 utilise le kit WerbSMSI.AI du dossier voisin (../WerbSMSI_AI, avec son environnement .venv) ; s'il est absent,
seul le cas 1 est joué : WerbSMSI ne dépend jamais de l'assistant (charte §5.12).
Cas 1 « WerbSMSI seul » : aucune déclaration ⇒ aucune requête vers les adresses de l'assistant, aucun élément affiché,
  page d'administration « Aucune déclaration ».
Cas 2 « WerbSMSI + kit » : passerelle WerbSMSI.AI réelle (moteur simulé) sur https://127.0.0.1:8443 ; déclaration par
  l'administrateur (test de la passerelle, empreinte, journal) ; panneau : suggestions, démarche (mode A), réponse en flux
  avec citation et sources, 👍 enregistré ; un éditeur de site voit le panneau mais pas l'administration ;
  fausse clé ⇒ identité refusée et aucune question envoyée ; désactivation ⇒ plus rien ; passerelle arrêtée ⇒ « Indisponible »,
  portail intact ; aucune erreur JavaScript.
Le certificat de l'autorité interne d'essai n'est pas installé sur le poste : le contexte du navigateur ignore la vérification
TLS pour CET essai (la chaîne est vérifiée par les tests de la passerelle).
"""
import argparse
import functools
import http.server
import json
import ssl
import subprocess
import sys
import tempfile
import threading
import time
import urllib.request
from pathlib import Path

ICI = Path(__file__).resolve().parent
RACINE = ICI.parents[1]
KIT = RACINE.parent / "WerbSMSI_AI"
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
CAPTURES = ICI / "sortie" / "assistant"
PY_KIT = KIT / ".venv" / ("Scripts/python.exe" if sys.platform == "win32" else "bin/python")
KIT_ESSAI = KIT / "atelier" / "outils_dev" / "kit_essai.py"
IA = ("127.0.0.1:8443", "werbsmsi-ai.interne")
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SIMULATION = """window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI", { create: true });"""
ECRIRE = """async ([chemin, texte]) => { let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop(); for (const p of parts) d = await d.getDirectoryHandle(p, { create: true });
  const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(texte); await w.close(); }"""
LIRE = """async chemin => { let d = await navigator.storage.getDirectory();
  const parts = chemin.split("/"); const nom = parts.pop(); for (const p of parts) d = await d.getDirectoryHandle(p);
  return (await (await d.getFileHandle(nom)).getFile()).text(); }"""


class Silencieux(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def sante_ok() -> bool:
    try:
        urllib.request.urlopen("https://127.0.0.1:8443/sante", context=ssl._create_unverified_context(), timeout=2)
        return True
    except OSError:
        return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--visible", action="store_true")
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright
    if sante_ok():
        print("Un service répond déjà sur 127.0.0.1:8443 : l'arrêter avant le test."); return 1
    echecs, erreurs, requetes = [], [], []

    def ok(cond, msg):
        print(("  OK    " if cond else "  ÉCHEC ") + msg)
        if not cond:
            echecs.append(msg)

    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Silencieux, directory=str(RACINE)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    origine = f"http://127.0.0.1:{srv.server_address[1]}"
    tmp = Path(tempfile.mkdtemp(prefix="werbsmsi_ia_essai_"))
    kit = None
    with sync_playwright() as p:
        nav = p.chromium.launch(channel="msedge", headless=not a.visible)
        ctx = nav.new_context(viewport={"width": 1440, "height": 900}, ignore_https_errors=True)
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        # Journal du navigateur : une requête refusée quand la passerelle est arrêtée est le cas testé, pas une erreur du portail
        pg.on("console", lambda m: m.type == "error" and "ERR_CONNECTION_REFUSED" not in m.text and erreurs.append(m.text))
        pg.on("request", lambda r: requetes.append((r.method, r.url)))
        resultats_outils = []                                   # phase 4 : ce que le portail renvoie à la passerelle
        pg.on("request", lambda r: r.url.endswith("/resultat_outil") and resultats_outils.append(json.loads(r.post_data)))
        pg.goto(f"{origine}/portail/WerbSMSI.html")
        pg.wait_for_timeout(300)
        for f in ("#ident-fen [data-act=identFermer]", "#demo-fen [data-act=demoFermer]"):
            if pg.locator(f).count():
                pg.click(f); pg.wait_for_timeout(150)
        for f in DEMO.rglob("*.json"):
            pg.evaluate(ECRIRE, [f"SMSI/{f.relative_to(DEMO).as_posix()}", f.read_text(encoding="utf-8")])
        lire = lambda c: json.loads(pg.evaluate(LIRE, c))
        ecrire = lambda c, d: pg.evaluate(ECRIRE, [c, json.dumps(d, ensure_ascii=False)])
        vers_ia = lambda: [u for _, u in requetes if any(x in u for x in IA)]
        menu = lambda: pg.locator("#sidebar [data-wnav]").evaluate_all("l => l.map(x => x.dataset.wnav)")
        aller = lambda v: (pg.click(f"#sidebar [data-wnav='{v}']"), pg.wait_for_timeout(250))

        def attendre(expr, delai=20000):
            for _ in range(delai // 200):
                if pg.evaluate(f"() => !!({expr})"):
                    return True
                pg.wait_for_timeout(200)
            return False

        def connexion(login, mdp):
            pg.fill("#cxLogin", login); pg.fill("#cxMdp", mdp); pg.click("[data-act=cxValider]")
            attendre("!document.querySelector('[data-connexion]')"); pg.wait_for_timeout(300)

        def rouvrir():
            aller("accueil"); pg.click("[data-act=espace]"); pg.wait_for_timeout(800)

        lanceur = lambda: pg.evaluate("() => { const b = document.querySelector('#werb-ia .ia-lanceur'); return b ? b.textContent.trim() : ''; }")

        print("Cas 1 — WerbSMSI seul (aucune déclaration)")
        pg.click("[data-act=espace]"); pg.wait_for_selector("[data-connexion]")
        connexion("admin.demo", "Demo-Admin-2026")
        for v in ("accueil", "grc", "groupe", "site:LYON", "parametres"):
            aller(v)
        ok(not vers_ia(), "aucune requête vers les adresses de l'assistant")
        ok(pg.evaluate("() => { const r = document.getElementById('werb-ia'); return r && r.hidden && r.innerHTML === ''; }"), "aucun élément de l'assistant affiché")
        ok("ia" in menu(), "administrateur du groupe : Administration › Assistant IA présent")
        aller("ia")
        ok("Aucune déclaration" in pg.inner_text("#main") and not vers_ia(), "page d'administration : « Aucune déclaration », toujours aucune requête")

        if not (PY_KIT.exists() and KIT_ESSAI.exists()):
            print(f"Cas 2 non joué : kit WerbSMSI.AI absent ({KIT}) — WerbSMSI fonctionne sans lui.")
            ok(not erreurs, f"aucune erreur JavaScript ({erreurs[:3]})")
            nav.close(); srv.shutdown()
            print()
            print("✔ tous les contrôles réussis" if not echecs else f"✘ {len(echecs)} échec(s)")
            return 1 if echecs else 0
        print("Cas 2 — WerbSMSI + kit WerbSMSI.AI")
        prep = json.loads(subprocess.run([str(PY_KIT), str(KIT_ESSAI), str(tmp), str(DEMO / "werbsmsi.comptes.json"), origine],
                                         capture_output=True, text=True, encoding="utf-8", check=True).stdout.strip().splitlines()[-1])
        journal_kit = (tmp / "passerelle.log").open("w", encoding="utf-8")
        kit = subprocess.Popen([str(PY_KIT), str(KIT / "outils" / "passerelle.py"), "--config", prep["config"]], stdout=journal_kit, stderr=journal_kit)
        for _ in range(60):
            if sante_ok():
                break
            time.sleep(0.5)
        ok(sante_ok(), "passerelle d'essai démarrée (moteur simulé)")
        aller("ia")
        pg.fill("[data-ia-champ=cle]", json.dumps({"cle_publique": prep["jwk"], "empreinte": prep["empreinte"]}))
        pg.check("[data-ia-champ=actif]"); pg.wait_for_timeout(300)
        ok(pg.inner_text("[data-ia-empreinte]") == prep["empreinte"], "empreinte RFC 7638 calculée dans le navigateur = celle du système IA")
        pg.click("[data-act=iaTester]")
        ok(attendre("document.querySelector('#main .infobox.small') && document.querySelector('#main .infobox.small').textContent.includes('Actif')"), "test de la passerelle : identité vérifiée")
        CAPTURES.mkdir(parents=True, exist_ok=True)
        pg.screenshot(path=str(CAPTURES / "1_administration_assistant_ia.png"), full_page=False)
        pg.click("[data-act=iaEnregistrer]")
        ok(attendre("document.querySelector('#werb-ia .ia-lanceur') && document.querySelector('#werb-ia .ia-lanceur').textContent.includes('Assistant')"), f"déclaration enregistrée, assistant actif ({lanceur()!r})")
        d = lire("SMSI/werbsmsi.ia.json")
        ok(d["format"] == "WERBSMSI-IA" and d["data"]["actif"] and d["data"]["empreinte"] == prep["empreinte"] and d["data"]["adresse"] == "https://127.0.0.1:8443"
           and len(d["data"]["journal"]) == 1 and d["data"]["journal"][0]["par"] == "admin.demo", "werbsmsi.ia.json : format, adresse, empreinte, journal")

        aller("accueil")
        pg.click("#werb-ia .ia-lanceur")
        ok(attendre("document.querySelectorAll('.ia-sugg button').length > 0"), "panneau ouvert : questions suggérées")
        pg.screenshot(path=str(CAPTURES / "2_panneau_suggestions.png"))
        ok(pg.locator(".ia-sugg button.primary", has_text="demarrage-smsi").count() == 1, "écran d'accueil : démarche « demarrage-smsi » proposée (mode A)")
        pg.fill("#iaQuestion", "Que demande la mesure NIS2 1.1-EI/EE ?"); pg.press("#iaQuestion", "Enter")
        ok(attendre("document.querySelector('.ia-r .ia-pied')"), "réponse reçue en flux jusqu'à la fin")
        pg.click(".ia-src summary"); pg.wait_for_timeout(150)
        pg.screenshot(path=str(CAPTURES / "3_reponse_citee.png"))
        rep = pg.inner_text(".ia-r .ia-txt")
        ok("[NIS2 1.1-EI/EE]" in rep and pg.locator(".ia-src li").count() >= 1, f"réponse citée et sources listées ({rep[:60]!r}…)")
        ok("IA locale, à vérifier" in pg.inner_text(".ia-r .ia-pied"), "mention « IA locale, à vérifier »")
        pg.click(".ia-pied [data-note='+']"); pg.wait_for_timeout(600)
        retours = (tmp / "donnees" / "journaux" / "retours.jsonl")
        ok(retours.exists() and json.loads(retours.read_text(encoding="utf-8").splitlines()[-1])["note"] == "+", "👍 enregistré par la passerelle")
        pg.click("[data-act=iaNouveau]"); pg.wait_for_timeout(200)
        pg.click(".ia-sugg button.primary"); attendre("document.querySelector('.ia-r .ia-pied')")
        ok(pg.locator(".ia-r .warnbox").count() == 0, "démarche guidée lancée sans erreur (skill publiée, empreinte vérifiée)")

        print("Phase 4 — outils en lecture seule sur les données des sites")
        pg.click("[data-act=iaNouveau]"); pg.wait_for_timeout(200)
        pg.fill("#iaQuestion", "Quels sont les systèmes d'information de LYON ?"); pg.press("#iaQuestion", "Enter")
        ok(attendre("document.querySelector('.ia-r .ia-pied')"), "réponse reçue après exécution de l'outil dans le portail")
        rep = pg.inner_text(".ia-r")
        ok("SI-SUPERVISION" in rep, "la réponse s'appuie sur la publication site:si de LYON (lue dans le portail)")
        ok("Données consultées (lecture seule) : lister_si (LYON)" in rep, "données consultées affichées à l'utilisateur")
        r0 = resultats_outils[-1]["resultat"] if resultats_outils else {}
        champs = {k for e in r0.get("elements", []) for k in e}
        ok(r0.get("site") == "LYON" and r0.get("total") == 1 and champs <= {"id", "nom", "fonction", "d", "i", "c", "nbActifs", "vlans"},
           f"résultat renvoyé réduit aux champs utiles ({sorted(champs)})")
        pg.click("[data-act=iaNouveau]"); pg.wait_for_timeout(200)
        pg.fill("#iaQuestion", "Où en est la synthèse NIS2 de LYON ?"); pg.press("#iaQuestion", "Enter")
        attendre("document.querySelector('.ia-r .ia-pied')")
        r1 = resultats_outils[-1]["resultat"] if resultats_outils else {}
        ok(r1.get("elements") and r1["elements"][0].get("couverture") == 62 and "objectifs" not in r1["elements"][0],
           "synthèse NIS2 de LYON lue (couverture 62 %), détail des objectifs non transmis")
        n_questions = sum(1 for m, u in requetes if m == "POST" and u.endswith("/question"))

        print("Éditeur de site")
        pg.click("#tb-user [data-act=monCompte]"); pg.wait_for_timeout(200)
        if pg.locator("[data-act=deconnecter]").count():
            pg.click("[data-act=deconnecter]"); pg.wait_for_timeout(300)
            if not pg.locator("[data-connexion]").count():
                rouvrir()
            if pg.locator("[data-connexion]").count():
                connexion("tech.demo", "Demo-Tech-2026")
                ok("ia" not in menu() and "Assistant" in lanceur(), "tech.demo : pas d'administration de l'assistant, mais le panneau est disponible")
                pg.evaluate("() => { const a = document.createElement('a'); a.dataset.nav = 'ia'; document.body.appendChild(a); a.click(); a.remove(); }")
                pg.wait_for_timeout(250)
                ok("Accès réservé" in pg.inner_text("#main"), "tech.demo : accès direct à la page d'administration refusé")
                pg.click("#tb-user [data-act=monCompte]"); pg.wait_for_timeout(200); pg.click("[data-act=deconnecter]"); pg.wait_for_timeout(300)
                if not pg.locator("[data-connexion]").count():
                    rouvrir()
                connexion("admin.demo", "Demo-Admin-2026")
        else:
            print("  (déconnexion non trouvée : cas de l'éditeur non joué)")

        print("Fausse passerelle, désactivation, passerelle arrêtée")
        d = lire("SMSI/werbsmsi.ia.json"); d["data"]["cle_publique"] = prep["jwk_autre"]; ecrire("SMSI/werbsmsi.ia.json", d)
        rouvrir()
        ok(attendre("document.querySelector('#werb-ia .ia-lanceur') && document.querySelector('#werb-ia .ia-lanceur').textContent.includes('Identité refusée')"), f"clé déclarée différente : « Identité refusée » ({lanceur()!r})")
        pg.click("#werb-ia .ia-lanceur"); pg.wait_for_timeout(300)
        ok(pg.locator(".ia-panneau").count() == 0 and sum(1 for m, u in requetes if m == "POST" and u.endswith("/question")) == n_questions, "aucune question envoyée à une passerelle non vérifiée")
        d["data"]["cle_publique"] = prep["jwk"]; d["data"]["actif"] = False; ecrire("SMSI/werbsmsi.ia.json", d)
        rouvrir(); pg.wait_for_timeout(500)
        ok(pg.evaluate("() => document.getElementById('werb-ia').hidden"), "déclaration désactivée : plus aucun élément de l'assistant")
        d["data"]["actif"] = True; ecrire("SMSI/werbsmsi.ia.json", d)
        kit.terminate(); kit.wait(10); kit = None
        rouvrir()
        ok(attendre("document.querySelector('#werb-ia .ia-lanceur') && document.querySelector('#werb-ia .ia-lanceur').textContent.includes('Indisponible')"), f"passerelle arrêtée : « Indisponible » ({lanceur()!r})")
        pg.screenshot(path=str(CAPTURES / "4_indisponible.png"))
        aller("groupe")
        ok("Groupe Démo Industrie" in pg.inner_text("#main h1"), "portail intact quand l'assistant est indisponible")
        ok(not erreurs, f"aucune erreur JavaScript ({erreurs[:3]})")
        nav.close()
    if kit:
        kit.terminate()
    srv.shutdown()
    print(f"\n{'✔ tous les contrôles réussis' if not echecs else f'✘ {len(echecs)} échec(s)'}")
    return 1 if echecs else 0


def principal() -> int:
    """Arrête toujours la passerelle d'essai, même si un contrôle plante."""
    try:
        return main()
    finally:
        subprocess.run(["powershell", "-NoProfile", "-Command",
                        "Get-CimInstance Win32_Process -Filter \"Name='python.exe'\" | Where-Object { $_.CommandLine -like '*werbsmsi_ia_essai_*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"],
                       capture_output=True)


if __name__ == "__main__":
    sys.exit(principal())
