# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Sauvegarde et restauration de l'espace depuis le portail (⚙️ Administration), dans Microsoft Edge (Playwright pour Python).

    python portail/tests/test_sauvegarde.py [--visible]

L'espace fictif SMSI_GROUPE_DEMO (JSON, DROITS.md, modèle Word) est copié dans le système de fichiers privé du navigateur ;
les sélecteurs de dossier et de fichier y sont redirigés. Contrôles : archive complète et de site (contenu octet pour octet,
manifeste, empreintes, versions des modules, auteur), vérification d'une archive intègre, altérée ou d'un autre espace,
aperçu des écarts, restauration d'un fichier modifié et d'un fichier supprimé, refus sur une base verrouillée, copie
préalable des fichiers remplacés, rien dans le stockage du navigateur. Chiffrement (portail 1.14.0) : case proposée par défaut,
mot de passe trop court ou mal confirmé refusé, archive zip AES-256 (WinZip AE-1) lue par pyzipper avec le mot de passe et
refusée sans lui, archive AES produite par pyzipper relue par le portail, mot de passe demandé à la lecture (erreur si faux),
restauration depuis une archive chiffrée avec copie préalable chiffrée, mot de passe jamais écrit dans le stockage.
"""
import argparse
import base64
import functools
import hashlib
import http.server
import io
import json
import sys
import tempfile
import threading
import zipfile
from datetime import datetime, timezone
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]
DEMO = RACINE / "demo" / "SMSI_GROUPE_DEMO"
SIMULATION = """
window.showDirectoryPicker = async () => (await navigator.storage.getDirectory()).getDirectoryHandle("SMSI", { create: true });
window.showSaveFilePicker = async ({ suggestedName }) => (await (await navigator.storage.getDirectory()).getDirectoryHandle("SAUV", { create: true })).getFileHandle(suggestedName, { create: true });
window.showOpenFilePicker = async () => [await (await (await navigator.storage.getDirectory()).getDirectoryHandle("SAUV")).getFileHandle(window.__archive)];
"""
OPFS = """async ([action, chemin, b64]) => {
  let d = await navigator.storage.getDirectory(); const parts = chemin.split("/"); const nom = parts.pop();
  for (const p of parts) d = await d.getDirectoryHandle(p, { create: action === "ecrire" });
  if (action === "supprimer") { await d.removeEntry(nom); return null; }
  if (action === "lister") { const l = []; for await (const [n] of (await d.getDirectoryHandle(nom)).entries()) l.push(n); return l.sort(); }
  if (action === "ecrire") { const u = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); const w = await (await d.getFileHandle(nom, { create: true })).createWritable(); await w.write(u); await w.close(); return null; }
  const u = new Uint8Array(await (await (await d.getFileHandle(nom)).getFile()).arrayBuffer()); let s = "";
  for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s);
}"""


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
    demo = {f.relative_to(DEMO).as_posix(): f.read_bytes() for f in DEMO.rglob("*") if f.is_file()}
    with tempfile.TemporaryDirectory() as profil, sync_playwright() as pw:
        ctx = pw.chromium.launch_persistent_context(profil, channel="msedge", headless=not a.visible, viewport={"width": 1400, "height": 900})
        ctx.add_init_script(SIMULATION)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        pg.on("dialog", lambda d: d.accept())
        pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html")
        pg.wait_for_timeout(200); pg.locator("#demo-fen [data-act=demoFermer]").click() if pg.locator("#demo-fen").count() else None   # invitation à la démo (portail 1.8.0)
        opfs = lambda action, chemin, data=None: pg.evaluate(OPFS, [action, chemin, base64.b64encode(data).decode() if data is not None else None])
        lire = lambda chemin: base64.b64decode(opfs("lire", chemin))
        for chemin, data in demo.items():
            opfs("ecrire", f"SMSI/{chemin}", data)
        pg.wait_for_selector("h1:has-text('WerbSMSI')")
        pg.click("[data-act=espace]")
        pg.wait_for_selector("h1:has-text('Groupe Démo Industrie')")
        bt = pg.locator("#topbar [data-act=sauvegarderBandeau]")
        ok(bt.count() == 1 and bt.inner_text() == "💾 Sauvegarder l'espace" and "fait" not in (bt.get_attribute("class") or ""), "bandeau : bouton « Sauvegarder l'espace » mis en évidence")
        bt.click(); pg.wait_for_timeout(200)
        ok(pg.inner_text("#main h1") == "💾 Sauvegarde et restauration" and pg.evaluate("document.activeElement && document.activeElement.id") == "svAuteur", "bandeau : page de sauvegarde ouverte, « Réalisée par » à renseigner")
        pg.click("#sidebar [data-wnav=sauvegarde]")
        ok(pg.inner_text("#main h1") == "💾 Sauvegarde et restauration", "menu ⚙️ Administration › Sauvegarde et restauration")
        # Attente de la fin d'une sauvegarde (data-sauv) ou d'une lecture d'archive (data-archive) : le repère de la vue change
        def action(selecteur, repere):
            avant = pg.get_attribute("#svEtat", f"data-{repere}")
            pg.click(selecteur)
            pg.wait_for_function("([r, v]) => { const e = document.getElementById('svEtat'); return e && e.dataset[r] !== v && !document.querySelector('[data-act=ouvrirSauvegarde][disabled]'); }", arg=[repere, avant])

        print("Sauvegarde complète (en clair)")
        ok(pg.is_checked("#svChiffrer") and pg.locator("#svMdp").count() == 1, "chiffrement proposé par défaut (mot de passe et confirmation)")
        pg.uncheck("#svChiffrer"); pg.wait_for_timeout(100)
        ok(pg.locator("#svMdp").count() == 0 and "Archive en clair" in pg.inner_text("[data-sv-chiffre]"), "case décochée : avertissement « archive en clair »")
        pg.click("[data-act=sauvegarder]")
        ok("Réalisée par" in pg.inner_text("#toasts"), "auteur obligatoire")
        pg.fill("#svAuteur", "Alice MARTIN")
        action("[data-act=sauvegarder]", "sauv")
        archives = opfs("lister", "SAUV")
        ok(len(archives) == 1 and archives[0].startswith("Sauvegarde_GDI_complet_") and archives[0].endswith(".zip"), f"archive écrite dans le fichier choisi : {archives}")
        complete = lire(f"SAUV/{archives[0]}")
        z = zipfile.ZipFile(io.BytesIO(complete))
        ok(z.testzip() is None, "archive .zip valide (lue par Python, CRC contrôlés)")
        m = json.loads(z.read("werbsmsi.sauvegarde.json"))
        noms = sorted(n for n in z.namelist() if n != "werbsmsi.sauvegarde.json")
        ok(noms == sorted(demo), f"tous les fichiers de l'espace sont sauvegardés ({len(noms)})")
        ok(all(z.read(n) == demo[n] for n in noms), "contenu identique octet pour octet (JSON, DROITS.md, modèle Word)")
        ok(all(f["sha256"] == hashlib.sha256(demo[f["chemin"]]).hexdigest() for f in m["data"]["fichiers"]), "manifeste : empreintes SHA-256 exactes")
        publies = sum(x.get("etat") == "publie" for x in json.loads((RACINE / "registre_modules.json").read_text(encoding="utf-8"))["modules"])
        ok(m["format"] == "WERBSMSI-SAUVEGARDE" and m["meta"]["creePar"] == "Alice MARTIN" and m["meta"]["perimetre"] == {"type": "complet"} and len(m["data"]["modules"]) == publies,
           f"manifeste : format, auteur, périmètre, versions des {publies} modules publiés")
        ok("Dernière sauvegarde" in pg.inner_text("#main"), "compte rendu de la sauvegarde")
        ok(bt.inner_text().startswith("💾 Sauvegardé à ") and "fait" in bt.get_attribute("class"), "bandeau : heure de la dernière sauvegarde, bouton apaisé")

        print("Sauvegarde d'un site")
        pg.select_option("#svPerim", "site:LYON")
        action("[data-act=sauvegarder]", "sauv")
        site = next(n for n in opfs("lister", "SAUV") if "_LYON_" in n)
        zs = zipfile.ZipFile(io.BytesIO(lire(f"SAUV/{site}")))
        ok(all(n.startswith("sites/LYON/") for n in zs.namelist() if n != "werbsmsi.sauvegarde.json")
           and len(zs.namelist()) - 1 == sum(1 for c in demo if c.startswith("sites/LYON/")), "site LYON : uniquement sites/LYON/")
        avant = pg.get_attribute("#svEtat", "data-sauv")
        action("#topbar [data-act=sauvegarderBandeau]", "sauv")   # attend une nouvelle sauvegarde terminée
        ok(pg.get_attribute("#svEtat", "data-sauv") != avant and all("_LYON_" in x or "_complet_" in x for x in opfs("lister", "SAUV")) and bt.inner_text().startswith("💾 Sauvegardé à "),
           "bandeau : sauvegarde lancée directement, avec l'auteur et le périmètre de la session (site LYON)")

        print("Vérification")
        pg.evaluate(f"window.__archive = {json.dumps(archives[0])}")
        action("[data-act=ouvrirSauvegarde]", "archive")
        ok(pg.locator("#main .badge:has-text('conformes au manifeste')").count() == 1, "archive complète intègre")
        ok(pg.locator(".svSel:checked").count() == 0 and pg.locator("#main .badge:has-text('identique')").count() == len(demo), "aperçu : tout identique, rien de coché")

        altere = io.BytesIO()
        with zipfile.ZipFile(altere, "w", zipfile.ZIP_DEFLATED) as zw:
            for n in z.namelist():
                d = z.read(n)
                zw.writestr(n, d.replace(b"Lyon", b"LYOn") if n.endswith("Exploitation_LYON.werbexploitation.json") else d)
        opfs("ecrire", "SAUV/altere.zip", altere.getvalue())
        pg.evaluate("window.__archive = 'altere.zip'")
        action("[data-act=ouvrirSauvegarde]", "archive")
        ok("EMPREINTE DIFFÉRENTE" in pg.inner_text("#main") and pg.locator("[data-act=restaurer]").is_disabled(), "archive altérée : signalée, restauration impossible")

        autre = io.BytesIO()
        m2 = json.loads(json.dumps(m)); m2["meta"]["groupeId"] = "autre-groupe"; m2["meta"]["organisation"] = "Autre groupe"
        with zipfile.ZipFile(autre, "w") as zw:
            for n in z.namelist():
                zw.writestr(n, json.dumps(m2) if n == "werbsmsi.sauvegarde.json" else z.read(n))
        opfs("ecrire", "SAUV/autre.zip", autre.getvalue())
        pg.evaluate("window.__archive = 'autre.zip'")
        action("[data-act=ouvrirSauvegarde]", "archive")
        ok("provient d'un autre espace" in pg.inner_text("#main") and pg.locator(".svSel").count() == 0, "archive d'un autre espace : pas de restauration")

        print("Restauration")
        expl, ebios, nis2 = ("sites/LYON/exploitation/Exploitation_LYON.werbexploitation.json", "sites/LYON/risques/EBIOS_LYON_L2.werbebios.json",
                             "sites/LYON/conformite/NIS2_LYON.werbnis2.json")
        opfs("ecrire", f"SMSI/{expl}", demo[expl].replace(b"\"data\"", b"\"modifie\": 1, \"data\"", 1))
        opfs("supprimer", f"SMSI/{ebios}")
        j = json.loads(demo[nis2]); now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        j["verrou"] = {"par": "Carole PETIT", "depuis": now, "vu": now, "session": "autre-poste"}
        opfs("ecrire", f"SMSI/{nis2}", json.dumps(j, ensure_ascii=False, indent=1).encode())
        pg.evaluate(f"window.__archive = {json.dumps(archives[0])}")
        action("[data-act=ouvrirSauvegarde]", "archive")
        ligne = lambda c: pg.locator(f"#main tr:has(td.mono:text-is('{c}'))")
        ok("différent : modifié le" in ligne(expl).inner_text() and ligne(expl).locator(".svSel").is_checked(), "fichier modifié : « différent », coché")
        ok("absent de l'espace" in ligne(ebios).inner_text() and ligne(ebios).locator(".svSel").is_checked(), "fichier supprimé : « absent de l'espace », coché")
        ok("🔒 Carole PETIT" in ligne(nis2).inner_text() and ligne(nis2).locator(".svSel").is_disabled(), "base verrouillée : cadenas, case désactivée")
        ok(pg.locator(".svSel:checked").count() == 2, "seules les différences sont cochées")
        pg.click("[data-act=restaurer]")
        pg.wait_for_selector("#main .infobox:has-text('Restauration du')")
        ok(lire(f"SMSI/{expl}") == demo[expl] and lire(f"SMSI/{ebios}") == demo[ebios], "fichiers restaurés à l'identique (modifié et supprimé)")
        ok(json.loads(lire(f"SMSI/{nis2}"))["verrou"]["par"] == "Carole PETIT", "base verrouillée non touchée")
        avant = next((n for n in opfs("lister", "SAUV") if n.startswith("Avant_restauration_")), None)
        za = zipfile.ZipFile(io.BytesIO(lire(f"SAUV/{avant}"))) if avant else None
        ok(za is not None and za.namelist() == ["werbsmsi.sauvegarde.json", expl] and b"\"modifie\": 1" in za.read(expl),
           "copie préalable : la version remplacée est sauvegardée")
        ok("2 fichier(s) restauré(s)" in pg.inner_text("#main") and pg.locator(".svSel:checked").count() == 0, "compte rendu et aperçu à jour")
        print("Sauvegarde chiffrée")
        import pyzipper
        MDP = "Coffre-Fort#2026!"
        pg.check("#svChiffrer"); pg.wait_for_timeout(100)
        pg.select_option("#svPerim", "complet")
        pg.fill("#svMdp", "court"); pg.fill("#svMdp2", "court"); pg.click("[data-act=sauvegarder]")
        ok("trop court" in pg.inner_text("#toasts"), "mot de passe trop court refusé")
        pg.fill("#svMdp", MDP); pg.fill("#svMdp2", MDP + "x"); pg.click("[data-act=sauvegarder]")
        ok("confirmation ne correspond pas" in pg.inner_text("#toasts"), "confirmation différente refusée")
        pg.fill("#svMdp2", MDP)
        action("[data-act=sauvegarder]", "sauv")
        chiffree = pg.inner_text("#main .infobox b")   # même nom que l'archive en clair si la même minute : remplacée
        ok(chiffree in opfs("lister", "SAUV") and chiffree.startswith("Sauvegarde_GDI_complet_"), f"archive chiffrée écrite : {chiffree}")
        brut = lire(f"SAUV/{chiffree}")
        ok("Mot de passe défini pour cette session" in pg.inner_text("[data-sv-chiffre]") and "chiffrée" in pg.inner_text("#main .infobox"),
           "compte rendu : archive chiffrée, mot de passe gardé pour la session")
        try:
            zipfile.ZipFile(io.BytesIO(brut)).read("werbsmsi.sauvegarde.json"); clair = True
        except RuntimeError:
            clair = False
        ok(not clair and b"Groupe D" not in brut and b'"format"' not in brut, "contenu illisible sans le mot de passe (zipfile refuse, aucun texte en clair)")
        za = pyzipper.AESZipFile(io.BytesIO(brut)); za.setpassword(MDP.encode())
        ok(za.testzip() is None and all(i.flag_bits & 1 for i in za.infolist()), "pyzipper : archive AES valide, tous les fichiers chiffrés (authentification, CRC)")
        mc = json.loads(za.read("werbsmsi.sauvegarde.json"))
        ok(all(za.read(n) == lire(f"SMSI/{n}") for n in demo) and mc["meta"].get("chiffrement", "").startswith("AES-256"), "pyzipper : contenu identique octet pour octet, manifeste « AES-256 »")
        try:
            zb = pyzipper.AESZipFile(io.BytesIO(brut)); zb.setpassword(b"mauvais-mot-de-passe"); zb.read("werbsmsi.sauvegarde.json"); faux = True
        except RuntimeError:
            faux = False
        ok(not faux, "pyzipper : mauvais mot de passe refusé")
        ok(MDP not in json.dumps(pg.evaluate("[Object.entries(localStorage), Object.entries(sessionStorage)]")), "mot de passe absent du stockage du navigateur")

        print("Lecture d'une archive chiffrée")
        pg.click("[data-act=svMdpChanger]"); pg.wait_for_timeout(100)
        ok(pg.locator("#svMdp").count() == 1, "« Changer le mot de passe » : le mot de passe de la session est oublié")
        pg.evaluate(f"window.__archive = {json.dumps(chiffree)}")
        pg.click("[data-act=ouvrirSauvegarde]"); pg.wait_for_selector("[data-sv-attente]")
        ok("est chiffrée" in pg.inner_text("[data-sv-attente]"), "mot de passe demandé à la lecture")
        pg.fill("#svMdpLecture", "mauvais-mot-de-passe"); pg.click("[data-act=svDechiffrer]")
        pg.wait_for_selector("[data-sv-attente]:has-text('Mot de passe incorrect')")
        ok(True, "mauvais mot de passe : « Mot de passe incorrect »")

        def dechiffrer(mdp, entree=False):
            avant = pg.get_attribute("#svEtat", "data-archive")
            pg.fill("#svMdpLecture", mdp)
            if entree:
                pg.press("#svMdpLecture", "Enter")
            else:
                pg.click("[data-act=svDechiffrer]")
            pg.wait_for_function("v => document.getElementById('svEtat').dataset.archive !== v", arg=avant)

        dechiffrer(MDP, entree=True)
        ok(pg.locator("#main .badge:has-text('conformes au manifeste')").count() == 1 and pg.locator("#main .badge:has-text('chiffrée AES-256')").count() == 1,
           "archive déchiffrée (touche Entrée), intègre, marquée chiffrée")

        externe = io.BytesIO()
        with pyzipper.AESZipFile(externe, "w", compression=pyzipper.ZIP_DEFLATED, encryption=pyzipper.WZ_AES) as zw:
            zw.setpassword(b"Mot-de-passe-7zip")
            for n in za.namelist():
                zw.writestr(n, za.read(n))
        opfs("ecrire", "SAUV/externe.zip", externe.getvalue())
        pg.evaluate("window.__archive = 'externe.zip'")
        pg.click("[data-act=ouvrirSauvegarde]"); pg.wait_for_selector("[data-sv-attente]")
        dechiffrer("Mot-de-passe-7zip")
        ok(pg.locator("#main .badge:has-text('conformes au manifeste')").count() == 1, "archive AES produite par un autre outil (pyzipper) relue et vérifiée")

        print("Restauration depuis une archive chiffrée")
        opfs("ecrire", f"SMSI/{expl}", demo[expl].replace(b"\"data\"", b"\"modifie\": 2, \"data\"", 1))
        pg.evaluate(f"window.__archive = {json.dumps(chiffree)}")
        pg.click("[data-act=ouvrirSauvegarde]"); pg.wait_for_selector("[data-sv-attente]")
        dechiffrer(MDP)
        ok(ligne(expl).locator(".svSel").is_checked() and "mot de passe de cette archive" in pg.inner_text("#main"), "fichier modifié coché ; copie préalable annoncée chiffrée")
        pg.click("[data-act=restaurer]")
        pg.wait_for_function("() => document.getElementById('main').innerText.includes('1 fichier(s) restauré(s)')")
        ok(lire(f"SMSI/{expl}") == demo[expl], "fichier restauré à l'identique depuis l'archive chiffrée")
        import re
        copie = (re.search(r"copie préalable : (Avant_restauration_\S+\.zip)", pg.inner_text("#main")) or [None, None])[1]   # même minute : nom réutilisé
        zc = pyzipper.AESZipFile(io.BytesIO(lire(f"SAUV/{copie}"))) if copie else None
        if zc:
            zc.setpassword(MDP.encode())
        ok(zc is not None and b"\"modifie\": 2" in zc.read(expl), "copie préalable chiffrée avec le mot de passe de l'archive")
        ok(pg.evaluate("[localStorage.length, sessionStorage.length]")[1] == 0, "rien de conservé dans le stockage de session")
        ok(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs}" if erreurs else ""))
        ctx.close()
    srv.shutdown()
    print(f"\n{'ÉCHEC' if echecs else 'Succès'} : {len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
