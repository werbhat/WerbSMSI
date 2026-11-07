# -*- coding: utf-8 -*-
# WerbSMSI – Développé par @WerbHat
"""Thème clair / sombre du portail (charte §7.5) dans Microsoft Edge (Playwright pour Python).

    python portail/tests/test_theme.py [--visible]

Contrôles : thème de Windows suivi, bouton dans le bandeau du portail, couleurs sombres des tuiles, menus et titres de cartes,
liens « Ouvrir » vers les modules porteurs du thème choisi (et mis à jour quand on le change), impression en clair.
"""
import argparse
import functools
import http.server
import json
import sys
import threading
import urllib.parse
from pathlib import Path

RACINE = Path(__file__).resolve().parents[2]


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
    with sync_playwright() as p:
        nav = p.chromium.launch(channel="msedge", headless=not a.visible)
        pg = nav.new_page(viewport={"width": 1300, "height": 800}, color_scheme="dark")
        pg.on("pageerror", lambda e: erreurs.append(str(e)))
        pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/portail/WerbSMSI.html")
        pg.wait_for_timeout(200); pg.locator("#demo-fen [data-act=demoFermer]").click() if pg.locator("#demo-fen").count() else None   # invitation à la démo (portail 1.8.0)
        pg.wait_for_selector("h1:has-text('WerbSMSI')")
        style = lambda sel, prop: pg.eval_on_selector(sel, f"e => getComputedStyle(e).{prop}")
        liens = lambda: pg.eval_on_selector_all(".tile a.btn.primary", "l => l.map(a => a.getAttribute('href'))")
        theme_lien = lambda h: (json.loads(urllib.parse.unquote(h.split("#werbsmsi=")[1])).get("th") if "#werbsmsi=" in h else None)

        ok(pg.evaluate("[WerbSocle.theme.mode, document.documentElement.dataset.theme]") == ["auto", "sombre"], "Windows en sombre : portail en sombre")
        ok(pg.evaluate("document.querySelector('button.werb-theme').parentElement.id") == "werb-theme" and pg.locator("#topbar button.werb-theme").count() == 1, "bouton du thème dans le bandeau")
        ok(style("body", "backgroundColor") == "rgb(15, 20, 27)" and style(".tile", "backgroundColor") == "rgb(23, 32, 43)" and style("#sidebar", "backgroundColor") == "rgb(23, 32, 43)",
           "fond, tuiles et menu sombres")
        ok(style("h2.tc", "backgroundColor") != "rgb(227, 237, 250)" and "var(--werb-t-" in pg.get_attribute("h2.tc", "style"), "titres de cartes : teinte qui suit le thème")
        ok(liens() and all(theme_lien(h) is None for h in liens()), "mode Auto : liens « Ouvrir » sans thème imposé")
        pg.click("button.werb-theme")   # Clair
        pg.click("button.werb-theme")   # Sombre
        ok(pg.evaluate("WerbSocle.theme.mode") == "sombre" and all(theme_lien(h) == "sombre" for h in liens()), "mode Sombre : liens « Ouvrir » porteurs du thème")
        pg.click("button.werb-theme")   # Auto
        ok(all(theme_lien(h) is None for h in liens()), "retour en Auto : liens mis à jour")
        pg.emulate_media(media="print")
        ok(style("body", "backgroundColor") == "rgb(243, 245, 249)", "impression en clair")
        ok(pg.evaluate("[localStorage.length, sessionStorage.length]")[0] == 0, "rien de nouveau dans le stockage du navigateur")
        nav.close()
    srv.shutdown()

    ok(not erreurs, "aucune erreur JavaScript" + (f" : {erreurs}" if erreurs else ""))
    print(f"\n{'ÉCHEC' if echecs else 'Succès'} : {len(echecs)} contrôle(s) en échec.")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
