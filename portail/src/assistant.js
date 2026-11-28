/*! WerbSMSI – Développé par @WerbHat */
/* Assistant IA optionnel (WerbSMSI.AI) : panneau du portail, phase 3a.
   Politique « IA optionnelle » : WerbSMSI fonctionne complet sans l'assistant. Trois verrous, tous nécessaires :
   1. capacité  : ce code est livré mais inerte ; la CSP n'autorise que les deux ADRESSES ci-dessous ;
   2. déclaration : werbsmsi.ia.json à la racine de l'espace, écrit par un administrateur du groupe (droit d'écriture sur la racine) ;
      ABSENT ⇒ aucune requête réseau, aucun élément affiché ;
   3. présence : /sante, contrat d'API, puis preuve d'identité (défi signé ECDSA P-256 vérifié avec la clé DÉCLARÉE, jamais
      avec celle que renvoie la passerelle).
   Les réponses du modèle sont affichées en texte (textContent / échappement) : jamais interprétées comme HTML.
   Phase 4 (portail 1.26.0) : outils en lecture seule exécutés ici, sur les publications des sites visibles du compte.
   Contrat d'API : WerbSMSI_AI/atelier/integration_portail/contrat_api.md. */
"use strict";
window.WerbAssistant = (() => {
  const FICHIER = "werbsmsi.ia.json", FORMAT = "WERBSMSI-IA";
  const ADRESSES = Object.freeze(["https://127.0.0.1:8443", "https://werbsmsi-ai.interne:8443"]);   // identiques à la CSP (connect-src)
  const CONTRATS = Object.freeze(["1"]);
  const DOMAINE = "WERBSMSI-IA/identite/v1:";
  const MENTION = "Réponse générée par une IA locale, à vérifier.";
  const ETATS = { eteint: "Non déclaré", desactive: "Désactivé", invalide: "Déclaration invalide", verification: "Vérification…",
    actif: "Actif", indisponible: "Indisponible", refuse: "Identité refusée" };

  let C = null;                       // accès au portail, fourni par init()
  const S = { decl: null, revision: 0, etat: "eteint", detail: "", ouvert: false, conv: [], abandon: null, etape: "",
    suggestions: null, brouillon: null, test: null, empreinte: "", enregistrement: false };
  let racine = null;

  /* ----------------------------------------------------------------- utilitaires */
  const esc = s => C.esc(s);
  const b64u = octets => btoa(String.fromCharCode(...new Uint8Array(octets))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const deb64u = s => Uint8Array.from(atob(String(s).replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
  const jwkValide = j => j && typeof j === "object" && j.kty === "EC" && j.crv === "P-256" && /^[A-Za-z0-9_-]{43}$/.test(j.x || "") && /^[A-Za-z0-9_-]{43}$/.test(j.y || "");
  async function empreinteJwk(j) {   // RFC 7638 : membres crv, kty, x, y triés, sans espace
    const canon = JSON.stringify({ crv: j.crv, kty: j.kty, x: j.x, y: j.y });
    return "sha256:" + b64u(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canon)));
  }
  const delai = ms => AbortSignal.timeout(ms);
  const compte = () => C.compte();
  const sitesAutorises = () => (S.decl && Array.isArray(S.decl.sites) ? S.decl.sites : []);
  // L'assistant sert-il ce compte ? Connecté, et site pilote autorisé si la déclaration en limite la liste
  const pourCompte = () => {
    if (!compte()) return false;
    const s = sitesAutorises();
    return !s.length || s.some(code => C.voitSite(code));
  };

  /* ----------------------------------------------------------------- verrou 2 : déclaration */
  async function charger() {
    Object.assign(S, { decl: null, revision: 0, etat: "eteint", detail: "", ouvert: false, conv: [], suggestions: null, brouillon: null, test: null });
    if (S.abandon) { S.abandon.abort(); S.abandon = null; }
    let j = null;
    try { j = await C.E.lire(FICHIER); } catch (e) { j = null; }
    if (!j) { afficher(); return; }                                    // pas de déclaration : rien, aucune requête
    const d = j.data || {};
    S.revision = d.revision || 0;
    if (j.format !== FORMAT || !ADRESSES.includes(d.adresse) || !jwkValide(d.cle_publique)) {
      S.decl = d; S.etat = "invalide"; S.detail = "format, adresse ou clé publique non reconnus"; afficher(); return;
    }
    S.decl = d;
    if (!d.actif) { S.etat = "desactive"; afficher(); return; }
    S.etat = "verification"; afficher();
    verifier().then(afficher);                                         // n'attend pas : l'ouverture de l'espace n'est pas ralentie
  }

  /* ----------------------------------------------------------------- verrou 3 : présence et identité */
  async function sonder(adresse, jwk) {
    const sante = await fetch(`${adresse}/sante`, { signal: delai(2500), cache: "no-store" });
    if (!sante.ok && sante.status !== 503) throw new Error(`/sante : HTTP ${sante.status}`);
    if (sante.status === 503) return { etat: "indisponible", detail: "la passerelle signale un état dégradé" };
    const v = await (await fetch(`${adresse}/version`, { signal: delai(2500), cache: "no-store" })).json();
    if (!CONTRATS.includes(String(v.contrat_api))) return { etat: "indisponible", detail: `contrat d'API ${v.contrat_api} non pris en charge par ce portail` };
    const defi = b64u(crypto.getRandomValues(new Uint8Array(32)));
    const r = await fetch(`${adresse}/identite`, { method: "POST", signal: delai(2500), headers: { "Content-Type": "application/json" }, body: JSON.stringify({ defi }) });
    if (!r.ok) return { etat: "refuse", detail: `/identite : HTTP ${r.status}` };
    const rep = await r.json();
    const cle = await crypto.subtle.importKey("jwk", { kty: "EC", crv: "P-256", x: jwk.x, y: jwk.y }, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, cle, deb64u(rep.signature), new TextEncoder().encode(DOMAINE + defi));
    return ok ? { etat: "actif", detail: `identité vérifiée (${await empreinteJwk(jwk)})`, version: v }
      : { etat: "refuse", detail: "la passerelle ne détient pas la clé déclarée : aucune question ne lui sera envoyée" };
  }
  async function verifier() {
    try { Object.assign(S, await sonder(S.decl.adresse, S.decl.cle_publique)); }
    catch (e) { S.etat = "indisponible"; S.detail = e.name === "TimeoutError" ? "la passerelle ne répond pas" : "passerelle injoignable"; }
    if (S.etat === "refuse") C.toast("Assistant IA : identité de la passerelle refusée. Prévenez l'administrateur du groupe.", "err");
  }

  /* ----------------------------------------------------------------- outils en lecture seule (phase 4, option A)
     Le modèle demande un outil ; la passerelle le contrôle (liste blanche, paramètres, droits, limites) puis le portail
     l'exécute ICI, sur les publications des sites qu'il a déjà chargées (objets partagés, sans secret ni nom de personne).
     Seconde barrière : seul un site que le compte connecté peut voir est lu. Résultats réduits aux champs utiles. */
  const MAX = 60;
  const liste = (l, champs) => { const t = Array.isArray(l) ? l : []; return { total: t.length, elements: t.slice(0, MAX).map(e => Object.fromEntries(champs.filter(k => e[k] !== undefined).map(k => [k, e[k]]))) }; };
  const rang = n => ["N1", "N2", "N3", "N4", "N5"].indexOf(n);
  const contient = (v, f) => !f || String(v || "").toLowerCase().includes(String(f).toLowerCase());
  const OUTILS = {
    lire_synthese_nis2: (o, p) => liste(o.syntheseNis2, ["id", "referentiel", "statut", "couverture", "mesures", "applicables", "evaluees", "ok", "plPlus", "plMoins", "nc", "na", "nonEvaluees", "actionsOuvertes", "actionsEnRetard", "prochaineEcheance", "derniereEvaluation", "majLe"]),
    lister_si: (o, p) => {
      const si = (Array.isArray(o.si) ? o.si : []).map(s => ({ ...s, nbActifs: (s.actifs || []).length, besoinMax: Math.max(s.d || 0, s.i || 0, s.c || 0) }));
      const garde = p.filtre === "critiques" ? si.filter(s => s.besoinMax >= 3) : si;
      return { ...liste(garde, ["id", "nom", "fonction", "d", "i", "c", "nbActifs", "vlans"]),
        ...(["sans_responsable", "exclus"].includes(p.filtre) ? { remarque: `filtre « ${p.filtre} » non disponible : la publication site:si ne porte pas cette information` } : {}) };
    },
    difficultes_maj: (o, p) => liste((o.difficultesMaj || []).filter(d => rang(d.niveau) >= rang(p.niveau_min)), ["tag", "niveau", "libelleNiveau", "score", "evalueLe"]),
    synthese_risques: (o, p) => liste(o.syntheseRisques, ["id", "libelle", "gravite", "vraisemblance", "niveauBrut", "graviteResiduelle", "vraisemblanceResiduelle", "niveauResiduel", "traitement", "acceptation", "accepteLe", "accepteJusqua", "majLe"]),
    lister_actifs: (o, p) => liste((o.actifs || []).filter(a => contient(a.type, p.type) && contient(a.zone, p.zone)), ["id", "type", "famille", "zone", "criticite", "libelle", "marque", "modele"]),
    remediations_ouvertes: (o, p) => liste((o.remediations || []).filter(r => (r.actionsOuvertes || 0) > 0 || (r.critiques || 0) + (r.elevees || 0) > 0),
      ["id", "actif", "mission", "critiques", "elevees", "moyennes", "actionsOuvertes", "actionsEnRetard", "prochaineEcheance"]),
    veille_recente: (o, p) => (o.veille && !Array.isArray(o.veille) ? { veille: o.veille, remarque: "indicateurs publiés par WerbVeille (dernière collecte)" } : { remarque: "aucune veille publiée pour ce site" }),
  };
  function executerOutil(appel) {
    const p = appel.parametres || {}, f = OUTILS[appel.nom];
    if (!f) return { erreur: "outil inconnu du portail" };
    if (!p.site || !C.voitSite(p.site)) return { erreur: "site non accessible depuis ce compte" };
    const pub = C.publications(p.site);
    if (!pub) return { erreur: "publications du site non chargées (site fermé ou dossier inaccessible)" };
    try { return { site: p.site, ...f(pub.objets || {}, p) }; } catch (e) { return { erreur: "lecture impossible" }; }
  }

  /* ----------------------------------------------------------------- panneau */
  function contexte() {
    const v = C.vue();
    return { module: "Portail", ecran: v.vue, ...(v.vue === "site" && v.site ? { site: v.site, niveau: "site" } : { niveau: "groupe" }) };
  }
  function afficher() {
    if (!racine) return;
    const declare = S.decl && S.decl.actif && S.etat !== "invalide";
    if (!declare || !pourCompte()) {                                   // éteint pour ce compte : rien d'affiché
      if (!compte()) { S.ouvert = false; S.conv = []; }
      racine.hidden = true; racine.innerHTML = ""; return;
    }
    racine.hidden = false;
    const actif = S.etat === "actif";
    const bouton = `<button class="ia-lanceur${actif ? "" : " inactif"}" data-act="iaBascule" title="${esc(actif ? "Ouvrir l'assistant IA local" : `Assistant IA ${ETATS[S.etat].toLowerCase()} : ${S.detail}`)}">🤖 ${actif ? "Assistant" : esc(ETATS[S.etat])}</button>`;
    if (!S.ouvert || !actif) { racine.innerHTML = bouton; return; }
    const ctx = contexte();
    const msgs = S.conv.map((m, i) => m.role === "user" ? `<div class="ia-q">${esc(m.texte)}</div>`
      : `<div class="ia-r" data-ia-msg="${i}"><div class="ia-txt"></div>${m.proposition ? `<div class="ia-prop">Démarche guidée proposée : <b>${esc(m.proposition.nom)}</b> — ${esc(m.proposition.description)} <button class="small" data-act="iaSkill" data-skill="${esc(m.proposition.nom)}" data-i="${i}">M'accompagner</button></div>` : ""}
        ${m.sources && m.sources.length ? `<details class="ia-src"><summary>${m.sources.length} source(s)</summary><ul>${m.sources.map(s => `<li title="${esc(s.source || "")}"><b>${esc(s.etiquette)}</b>${s.version ? ` <span class="muted">v${esc(s.version)}</span>` : ""}${s.confiance && s.confiance !== "interne" ? ` <span class="badge">${esc(s.confiance)}</span>` : ""}</li>`).join("")}</ul></details>` : ""}
        ${m.outils && m.outils.length ? `<div class="small muted">🔎 Données consultées (lecture seule) : ${esc(m.outils.join(", "))}</div>` : ""}
        ${m.fin ? `<div class="ia-pied"><span class="muted small">${esc(MENTION)}</span>${m.note ? `<span class="small">Merci pour votre avis.</span>` : `<button class="small" data-act="iaRetour" data-note="+" data-i="${i}" title="Réponse utile">👍</button><button class="small" data-act="iaRetour" data-note="-" data-i="${i}" title="Réponse à améliorer">👎</button>`}</div>` : ""}
        ${m.erreur ? `<div class="warnbox small">${esc(m.erreur)}</div>` : ""}</div>`).join("");
    const sugg = !S.conv.length && S.suggestions ? `<div class="ia-sugg">${S.suggestions.questions.map(q => `<button class="small" data-act="iaSuggestion" data-q="${esc(q)}">${esc(q)}</button>`).join("")}
      ${S.suggestions.skills.map(s => `<button class="small primary" data-act="iaSkill" data-skill="${esc(s.nom)}" title="${esc(s.description)}">M'accompagner : ${esc(s.nom)}</button>`).join("")}</div>` : "";
    racine.innerHTML = `${bouton}<section class="ia-panneau" role="dialog" aria-label="Assistant IA">
      <header><b>🤖 Assistant IA local</b><span class="muted small">${esc(ctx.niveau === "site" ? `site ${ctx.site}` : "groupe")} · ${esc(ctx.ecran)}</span><button class="small" data-act="iaNouveau" title="Nouvelle conversation">↺</button><button class="small" data-act="iaBascule" title="Fermer">✕</button></header>
      <div class="ia-fil">${sugg}${msgs}${S.abandon ? `<div class="ia-etape small muted">⏳ ${esc(S.etape || "…")}</div>` : ""}</div>
      <footer><textarea id="iaQuestion" rows="2" maxlength="2000" placeholder="Votre question sur la démarche SMSI, les modules ou les référentiels…"${S.abandon ? " disabled" : ""}></textarea>
        ${S.abandon ? `<button data-act="iaStop">■ Arrêter</button>` : `<button class="primary" data-act="iaEnvoyer">Envoyer</button>`}</footer>
      <p class="small muted ia-mention">${esc(MENTION)} Les réponses citent la documentation WerbSMSI ; aucune donnée ne quitte l'organisation.</p></section>`;
    S.conv.forEach((m, i) => { if (m.role === "assistant") { const n = racine.querySelector(`[data-ia-msg="${i}"] .ia-txt`); if (n) n.textContent = m.texte; } });
    const fil = racine.querySelector(".ia-fil"); if (fil) fil.scrollTop = fil.scrollHeight;
  }

  const entetes = () => ({ "Content-Type": "application/json", Authorization: `WerbTicket ${C.ticket()}` });
  async function chargerSuggestions() {
    const ctx = contexte();
    try {
      const r = await fetch(`${S.decl.adresse}/suggestions?module=Portail&ecran=${encodeURIComponent(ctx.ecran)}`, { headers: entetes(), signal: delai(4000) });
      S.suggestions = r.ok ? await r.json() : { questions: [], skills: [] };
    } catch (e) { S.suggestions = { questions: [], skills: [] }; }
    afficher();
  }

  async function envoyer(question, skill = null) {
    question = String(question || "").trim();
    if (!question || S.abandon || S.etat !== "actif") return;
    const historique = S.conv.filter(m => !m.erreur).slice(-6).map(m => ({ role: m.role, content: m.texte.slice(0, 4000) }));
    S.conv.push({ role: "user", texte: question });
    const rep = { role: "assistant", texte: "", sources: [], fin: false, question };
    S.conv.push(rep);
    S.abandon = new AbortController(); S.etape = "envoi"; afficher();
    const ctx = contexte();
    try {
      const r = await fetch(`${S.decl.adresse}/question`, { method: "POST", headers: entetes(), signal: S.abandon.signal,
        body: JSON.stringify({ question, historique, contexte_page: ctx, skill, site: ctx.site || "", flux: true, outils_client: Object.keys(OUTILS) }) });
      if (!r.ok) {
        const msg = { 401: "Session expirée : reconnectez-vous au portail.", 413: "Question trop longue.", 429: "Trop de questions : patientez une minute.",
          503: "Assistant indisponible pour le moment." }[r.status] || `Erreur ${r.status}.`;
        rep.erreur = msg; if (r.status === 503) S.etat = "indisponible";
      } else await lireFlux(r.body, rep);
    } catch (e) { rep.erreur = e.name === "AbortError" ? "Réponse arrêtée." : "Assistant injoignable."; }
    S.abandon = null; S.etape = ""; afficher();
  }
  async function lireFlux(corps, rep) {
    const lecteur = corps.getReader(), dec = new TextDecoder();
    let tampon = "";
    const noeud = () => racine.querySelector(`[data-ia-msg="${S.conv.indexOf(rep)}"] .ia-txt`);
    for (;;) {
      const { value, done } = await lecteur.read();
      if (done) break;
      tampon += dec.decode(value, { stream: true });
      let k;
      while ((k = tampon.indexOf("\n\n")) >= 0) {
        const bloc = tampon.slice(0, k); tampon = tampon.slice(k + 2);
        const ligne = bloc.split("\n").find(l => l.startsWith("data: "));
        if (!ligne) continue;
        const ev = JSON.parse(ligne.slice(6));
        if (ev.type === "texte") { rep.texte += ev.texte; const n = noeud(); if (n) n.textContent = rep.texte; }   // texte seul, jamais HTML
        else if (ev.type === "etape") { S.etape = { recherche: "recherche dans la documentation", generation: "rédaction de la réponse", reformulation: "reformulation", skill: "chargement de la démarche" }[ev.etape] || ev.etape; const e = racine.querySelector(".ia-etape"); if (e) e.textContent = "⏳ " + S.etape; }
        else if (ev.type === "sources") rep.sources = ev.sources || [];
        else if (ev.type === "proposition_skill") rep.proposition = ev.skill;
        else if (ev.type === "outil") {                                // phase 4 : exécuté ici, résultat renvoyé à la passerelle
          const a = ev.appel || {};
          S.etape = `lecture des données : ${a.nom}${a.parametres && a.parametres.site ? ` (${a.parametres.site})` : ""}`;
          const e = racine.querySelector(".ia-etape"); if (e) e.textContent = "⏳ " + S.etape;
          (rep.outils = rep.outils || []).push(`${a.nom}${a.parametres && a.parametres.site ? ` (${a.parametres.site})` : ""}`);
          try { await fetch(`${S.decl.adresse}/resultat_outil`, { method: "POST", headers: entetes(), signal: delai(8000),
            body: JSON.stringify({ trace: ev.trace, appel: a.id, resultat: executerOutil(a) }) }); } catch (x) { /* la passerelle signalera le délai */ }
        }
        else if (ev.type === "fin") { rep.fin = true; rep.trace = ev.trace; }
        else if (ev.type === "erreur") rep.erreur = ev.message;
      }
    }
  }

  /* ----------------------------------------------------------------- Administration › Assistant IA (verrou 2) */
  function brouillon() {
    if (!S.brouillon) {
      const d = S.decl || {};
      S.brouillon = { actif: !!d.actif, adresse: ADRESSES.includes(d.adresse) ? d.adresse : ADRESSES[0],
        cle: d.cle_publique ? JSON.stringify(d.cle_publique) : "", sites: Array.isArray(d.sites) ? d.sites.slice() : [] };
      majEmpreinte();
    }
    return S.brouillon;
  }
  function cleBrouillon() { try { const j = JSON.parse(S.brouillon.cle || ""); const c = j.cle_publique || j; return jwkValide(c) ? c : null; } catch (e) { return null; } }
  async function majEmpreinte() { const c = S.brouillon && cleBrouillon(); S.empreinte = c ? await empreinteJwk(c) : ""; const n = document.querySelector("[data-ia-empreinte]"); if (n) n.textContent = S.empreinte || "—"; }

  function vueAdmin() {
    const b = brouillon(), g = C.groupe() || {}, journal = (S.decl && S.decl.journal) || [];
    const etat = S.decl ? `${esc(ETATS[S.etat])}${S.detail ? ` — ${esc(S.detail)}` : ""}` : "Aucune déclaration : l'assistant est éteint (aucune requête réseau).";
    return `<h1>🤖 Assistant IA (optionnel)</h1><p class="sub">WerbSMSI fonctionne complet sans assistant. Il ne s'active que si le kit WerbSMSI.AI est installé <b>et</b> déclaré ici.</p>
      <div class="card"><h2>État</h2><p>${etat}</p>${(svc => svc ? `<p class="small">Kit <b>${esc(svc.produit)}</b> ${esc(svc.version)} — service optionnel livré séparément (dépôt <code>${esc(svc.depot)}</code>), contrat d'API ${esc(svc.contratApi)}. ${esc(svc.description)}</p>` : "")(((window.REGISTRE || {}).services || []).find(s => s.id === "werbsmsi-ai"))}
        <p class="small muted">Fichier <code>${FICHIER}</code> à la racine de l'espace : seule l'équipe SMSI du groupe, qui a le droit d'écriture sur cette racine, peut le créer ou le modifier.</p></div>
      <div class="card" data-ia-admin><h2>Déclaration</h2>
        <p><label><input type="checkbox" data-ia-champ="actif"${b.actif ? " checked" : ""}> Assistant activé</label></p>
        <p><label>Adresse de la passerelle<br><select data-ia-champ="adresse">${ADRESSES.map(a => `<option${a === b.adresse ? " selected" : ""}>${esc(a)}</option>`).join("")}</select></label>
          <br><span class="small muted">Seules ces deux adresses sont autorisées par le portail (poste autonome, îlot isolé).</span></p>
        <p><label>Clé publique de la passerelle (JSON affiché par <code>python outils/identite.py voir</code>)<br>
          <textarea data-ia-champ="cle" rows="4" style="width:100%;font-family:Consolas,monospace">${esc(b.cle)}</textarea></label>
          <br><span class="small">Empreinte : <code data-ia-empreinte>${esc(S.empreinte || "—")}</code> — à comparer avec celle affichée sur le système IA.</span></p>
        <p>Sites pilotes <span class="small muted">(aucun coché : tous les sites)</span><br>${(g.sites || []).map(s => `<label class="ia-site"><input type="checkbox" data-ia-site="${esc(s.code)}"${b.sites.includes(s.code) ? " checked" : ""}> ${esc(s.code)}</label>`).join(" ")}</p>
        <div class="row"><button data-act="iaTester">Tester la passerelle</button><button class="primary" data-act="iaEnregistrer"${S.enregistrement ? " disabled" : ""}>Enregistrer la déclaration</button></div>
        ${S.test ? `<div class="${S.test.etat === "actif" ? "infobox" : "warnbox"} small">Test : ${esc(ETATS[S.test.etat] || S.test.etat)} — ${esc(S.test.detail)}</div>` : ""}</div>
      <div class="card"><h2>Journal</h2>${journal.length ? `<table class="t"><thead><tr><th>Date</th><th>Par</th><th>Action</th><th>Détail</th></tr></thead><tbody>${journal.slice().reverse().map(x => `<tr><td>${esc(String(x.le).slice(0, 16).replace("T", " "))}</td><td>${esc(x.par)}</td><td>${esc(x.action)}</td><td class="small">${esc(x.apres)}</td></tr>`).join("")}</tbody></table>` : `<p class="small muted">Aucune modification.</p>`}</div>`;
  }

  async function enregistrer() {
    const b = brouillon(), cle = cleBrouillon(), c = compte();
    if (!c || !C.adminEspace()) { C.toast("Réservé à un administrateur du groupe.", "err"); return; }
    if (!ADRESSES.includes(b.adresse)) { C.toast("Adresse non autorisée par le portail.", "err"); return; }
    if (b.actif && !cle) { C.toast("Clé publique absente ou invalide (JWK EC P-256 attendu).", "err"); return; }
    S.enregistrement = true; C.render();
    try {
      const actuel = await C.E.lire(FICHIER).catch(() => null);
      const rev = (actuel && actuel.data && actuel.data.revision) || 0;
      if (rev !== S.revision) throw new Error("La déclaration a été modifiée par un autre administrateur : rouvrez la page.");
      const avant = actuel ? actuel.data : {};
      const empreinte = cle ? await empreinteJwk(cle) : "";
      const data = { actif: b.actif, adresse: b.adresse, cle_publique: cle, empreinte, sites: b.sites.slice().sort(), revision: rev + 1,
        declare_par: c.login, declare_le: C.maintenant(), journal: [...((avant && avant.journal) || [])] };
      const resume = x => x ? `${x.actif ? "activé" : "désactivé"}, ${x.adresse}, ${x.empreinte || "sans clé"}, sites : ${(x.sites || []).join(" ") || "tous"}` : "";
      data.journal.push({ le: C.maintenant(), par: c.login, action: actuel ? "Modification" : "Déclaration", avant: resume(avant && avant.adresse ? avant : null), apres: resume(data) });
      try { await C.E.ecrire(FICHIER, C.docEspace(FORMAT, C.metaEspace((C.groupe() || {}).groupeId || "", "groupe"), data)); }
      catch (e) { throw new Error("Écriture impossible à la racine de l'espace : seule l'équipe SMSI du groupe peut déclarer l'assistant."); }
      C.toast(b.actif ? "Assistant déclaré : vérification de la passerelle…" : "Assistant désactivé.", "ok");
      await charger();
    } catch (e) { C.toast(e.message, "err"); }
    S.enregistrement = false; C.render();
  }

  /* ----------------------------------------------------------------- actions (data-act) */
  const actions = {
    iaBascule: () => { S.ouvert = !S.ouvert; afficher(); if (S.ouvert && !S.suggestions) chargerSuggestions(); if (S.ouvert) { const t = document.getElementById("iaQuestion"); if (t) t.focus(); } },
    iaNouveau: () => { if (S.abandon) return; S.conv = []; afficher(); },
    iaEnvoyer: () => { const t = document.getElementById("iaQuestion"); if (t) envoyer(t.value); },
    iaStop: () => { if (S.abandon) S.abandon.abort(); },
    iaSuggestion: el => envoyer(el.dataset.q),
    iaSkill: el => { const i = Number(el.dataset.i); const q = Number.isInteger(i) && S.conv[i] ? S.conv[i].question : "Par où commencer ?"; envoyer(q, el.dataset.skill); },
    iaRetour: async el => {
      const m = S.conv[Number(el.dataset.i)]; if (!m || !m.trace || m.note) return;
      m.note = el.dataset.note; afficher();
      try { await fetch(`${S.decl.adresse}/retour`, { method: "POST", headers: entetes(), signal: delai(4000), body: JSON.stringify({ trace: m.trace, note: m.note, question: m.question.slice(0, 2000) }) }); }
      catch (e) { /* avis perdu : sans conséquence */ }
    },
    iaTester: async () => {
      const b = brouillon(), cle = cleBrouillon();
      if (!cle) { S.test = { etat: "invalide", detail: "clé publique absente ou invalide" }; C.render(); return; }
      S.test = { etat: "verification", detail: b.adresse }; C.render();
      try { S.test = await sonder(b.adresse, cle); } catch (e) { S.test = { etat: "indisponible", detail: "passerelle injoignable (démarrée ? certificat de l'autorité interne approuvé sur ce poste ?)" }; }
      C.render();
    },
    iaEnregistrer: () => enregistrer(),
  };

  function init(acces) {
    C = acces;
    racine = document.createElement("div");
    racine.id = "werb-ia"; racine.hidden = true;
    document.body.appendChild(racine);
    document.addEventListener("input", e => {
      const ch = e.target.dataset && e.target.dataset.iaChamp; if (!ch || !S.brouillon) return;
      S.brouillon[ch] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      if (ch === "cle") majEmpreinte();
    });
    document.addEventListener("change", e => {
      const ch = e.target.dataset && (e.target.dataset.iaChamp || e.target.dataset.iaSite); if (!ch || !S.brouillon) return;
      if (e.target.dataset.iaSite) { const s = new Set(S.brouillon.sites); if (e.target.checked) s.add(ch); else s.delete(ch); S.brouillon.sites = [...s]; }
      else S.brouillon[ch] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    });
    document.addEventListener("keydown", e => { if (e.target.id === "iaQuestion" && e.key === "Enter" && !e.shiftKey) { e.preventDefault(); actions.iaEnvoyer(); } });
  }

  return Object.freeze({ init, charger, afficher, vueAdmin, actions, ADRESSES, FICHIER, etat: () => ({ etat: S.etat, detail: S.detail, declare: !!S.decl }) });
})();
