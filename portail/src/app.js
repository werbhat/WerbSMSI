/*! WerbSMSI – Développé par @WerbHat */
/* Portail WerbSMSI : rubriques et modules publiés, espace du groupe, vues par site, consolidation des synthèses,
   vérification des empreintes, liens vers les bases (un clic ouvre le module sur la base d'un site), mise en place guidée.
   Le portail n'écrit que sur action explicite : création d'un espace ou d'un site, déclaration d'une base, restauration d'une sauvegarde,
   publication des listes de choix du groupe (sa propre publication, publications/werbsmsi.json).
   Le registre et les manifestes des modules sont intégrés à l'assemblage (window.REGISTRE). */
"use strict";
(() => {
  const { esc } = WerbSocle;
  const E = WerbSocle.espace;
  const REG = window.REGISTRE;
  const RUBRIQUES = REG.rubriques.slice().sort((a, b) => a.ordre - b.ordre);
  // Dossiers de rubrique d'un niveau : rubriques du registre qui autorisent ce niveau (groupe/<rubrique>/, sites/<CODE>/<rubrique>/)
  const NIVEAU_DOSSIERS = Object.fromEntries(["groupe", "site"].map(n => [n, RUBRIQUES.filter(r => (r.portees || ["groupe", "site"]).includes(n)).map(r => r.id)]));

  // État en mémoire seulement
  const P = { vue: "accueil", site: "", groupe: null, pubGroupe: null, sites: {}, basesGroupe: null, verif: null, chargement: false, manquants: [],
    raccourcis: WerbSocle.preference.lire("raccourcis", true), raccourciOk: null };

  WerbSocle.activerPurgeAutomatique();

  /* ===================================================== utilitaires */
  const $ = s => document.querySelector(s);
  const frDate = v => {
    if (v === undefined || v === null || v === "") return "";
    const d = typeof v === "number" ? new Date(v) : new Date(v);
    if (isNaN(d)) return String(v);
    const p = n => String(n).padStart(2, "0");
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}${typeof v === "number" || String(v).includes("T") ? ` ${p(d.getHours())}:${p(d.getMinutes())}` : ""}`;
  };
  function toast(msg, type = "") {
    const el = document.createElement("div");
    el.className = "toast " + type; el.textContent = msg;
    $("#toasts").appendChild(el);
    setTimeout(() => el.remove(), type === "err" ? 7000 : 3500);
  }
  const badge = (txt, cls = "") => `<span class="badge ${cls}">${esc(txt)}</span>`;
  const barre = pct => `<div class="row"><div class="bar"><i style="width:${Math.max(0, Math.min(100, Number(pct) || 0))}%"></i></div><span>${esc(pct)} %</span></div>`;
  // Identifiant d'un module renommé (manifeste « idsAnciens ») : bases déclarées et publications sous l'ancien id restent reconnues
  const idActuel = id => (REG.modules.find(m => m.id === id || (m.manifeste && (m.manifeste.idsAnciens || []).includes(id))) || { id }).id;
  const moduleParId = id => REG.modules.find(m => m.id === idActuel(id));
  const libelleModule = id => { const m = moduleParId(id); return m && m.manifeste ? m.manifeste.produit : (m ? m.produit || id : id); };
  // Extension des bases : manifeste publié, sinon règle de la charte (.<id>.json) ; un module de lecture (sans donnees) n'a pas de base
  // Anciennes extensions (« donnees.extensionsLues ») d'un module renommé : ses bases existantes gardent leur puce
  const extensions = REG.modules.filter(m => !m.manifeste || m.manifeste.donnees).flatMap(m => [(m.manifeste && m.manifeste.donnees.extension) || `.${m.id}.json`, ...((m.manifeste && m.manifeste.donnees.extensionsLues) || [])].map(ext => [m.id, ext]));
  const moduleDeFichier = nom => (extensions.find(([, ext]) => nom.endsWith(ext)) || [null])[0];
  const lienModule = m => m.manifeste && m.etat === "publie" ? `../${m.chemin}/${m.manifeste.entree}` : null;
  // Titre de carte : emoji et texte sur fond de couleur (teintes du menu commun). texte : HTML déjà échappé.
  const titre = (emoji, texte, teinte = "bleu", balise = "h2") => {
    const [f, c] = WerbSocle.teinteCss(teinte);   // suit le thème clair / sombre (charte §7.5)
    return `<${balise} class="tc" style="--tf:${f};--tt:${c}"><span class="tc-i">${emoji}</span>${texte}</${balise}>`;
  };
  // Emoji et teinte de chaque rubrique (mêmes repères dans tout le portail)
  const RUB_STYLE = { gouvernance: ["🏛️", "violet"], risques: ["⚠️", "rouge"], inventaires: ["🗄️", "vert"], conformite: ["✅", "cyan"], exploitation: ["🛠️", "orange"], continuite: ["🛟", "bleu"] };
  const rubStyle = id => RUB_STYLE[id] || ["📦", "ardoise"];
  /* Parcours en 7 étapes (1.12.0, infographie « Démarrer avec WerbSMSI ») : présentation des modules sur l'accueil, les pages Groupe
     et Site, et dans les paramètres. Affichage seul : les rubriques restent les dossiers de rangement des bases (groupe/<rubrique>/,
     sites/<CODE>/<rubrique>/). Étape d'un module : registre (module.etape), sinon celle de sa rubrique. */
  const ETAPES = (REG.etapes || []).slice().sort((a, b) => a.ordre - b.ordre);
  const rubriqueDe = m => m.manifeste ? m.manifeste.rubrique : m.rubrique;
  const etapeDe = m => m.etape || (RUBRIQUES.find(r => r.id === rubriqueDe(m)) || {}).etape || "";
  const AUTRES = { id: "", ordre: 99, libelle: "Autres modules", sousTitre: "", emoji: "📦", teinte: "ardoise" };
  const etapesAffichees = () => [...ETAPES, ...(REG.modules.some(m => !ETAPES.some(e => e.id === etapeDe(m))) ? [AUTRES] : [])];
  const modulesEtape = e => REG.modules.filter(m => e.id ? etapeDe(m) === e.id : !ETAPES.some(x => x.id === etapeDe(m)));
  const nomModule = m => m.manifeste ? m.manifeste.produit : m.produit || m.id;

  /* ===================================================== chargement de l'espace */
  async function chargerEspace() {
    P.chargement = true; render();
    try {
      P.groupe = E.groupe;
      P.pubGroupe = await E.publications("groupe");
      LG.brouillon = null;                                   // listes de choix : brouillon repris de la publication relue
      PA.brouillon = null;                                   // paramètres : brouillon repris de werbsmsi.groupe.json
      P.manquants = [];
      P.basesGroupe = await chargerBases("groupe", "", P.groupe.bases || []);
      P.sites = {};
      for (const s of P.groupe.sites || []) P.sites[s.code] = await chargerSite(s.code);
    } finally { P.chargement = false; }
  }

  async function chargerSite(code) {
    const info = await E.site(code);
    if (!info) return { accessible: false };
    return { accessible: true, info, pub: await E.publications("site", code), bases: await chargerBases("site", `sites/${code}/`, info.bases || []) };
  }

  // Bases déclarées (avec métadonnées et verrou) et bases présentes non déclarées.
  async function chargerBases(niveau, prefixe, declarees) {
    const presentes = new Map();
    // Dossier de rubrique absent (rubrique ajoutée au registre après la création de l'espace) : signalé, à créer par l'utilisateur.
    // Seulement si son dossier parent est lisible : un site n'a pas accès à groupe/.
    const parentLisible = (await E.lister(niveau === "groupe" ? "groupe" : prefixe.replace(/\/$/, ""))) !== null;
    for (const d of NIVEAU_DOSSIERS[niveau]) {
      const dossier = niveau === "groupe" ? `groupe/${d}` : `${prefixe}${d}`;
      const l = await E.lister(dossier);
      if (l === null && parentLisible) P.manquants.push(dossier);
      for (const f of l || []) if (f.type === "file" && f.nom.endsWith(".json")) presentes.set(`${dossier}/${f.nom}`, f);
    }
    const res = [];
    for (const b of declarees) {
      const chemin = prefixe + b.fichier;
      const fic = presentes.get(chemin);
      presentes.delete(chemin);
      let meta = null, verrou = null;
      if (fic) { const j = await E.lire(chemin); if (j) { meta = j.meta || null; verrou = j.verrou || null; } }
      res.push({ ...b, module: idActuel(b.module), chemin, present: !!fic, modifie: fic && fic.modifie, meta, verrou, declaree: true });
    }
    for (const [chemin, f] of presentes) {
      const module = moduleDeFichier(f.nom);
      if (!module) continue;
      const j = await E.lire(chemin);
      res.push({ module, fichier: chemin.slice(prefixe.length), chemin, present: true, modifie: f.modifie, meta: j && j.meta || null, verrou: j && j.verrou || null, declaree: false });
    }
    return res;
  }

  /* ===================================================== consolidation (lecture des publications) */
  const sitesAccessibles = () => (P.groupe ? P.groupe.sites || [] : []).filter(s => P.sites[s.code] && P.sites[s.code].accessible);
  const objetsSite = (code, nom) => (((P.sites[code] || {}).pub || {}).objets || {})[nom] || [];
  const publication = (code, module) => { const l = ((P.sites[code] || {}).pub || {}).fichiers || []; return l.find(f => f.module === module) || l.find(f => idActuel(f.module) === module); };
  const libelleNiveau = n => { const e = ((P.pubGroupe || {}).objets || {}).echelles; const l = e && (e.niveauxRisque || []).find(x => x.niveau === n); return l ? `${n} – ${l.libelle}` : String(n); };

  // Indicateurs de formation du groupe (groupe:formations, WerbAcademie) : objet unique, aucun nom
  const formationsGroupe = () => { const f = ((P.pubGroupe || {}).objets || {}).formations; return f && !Array.isArray(f) && f.global ? f : null; };
  const libSiteFormation = c => c === "GROUPE" ? "Groupe (siège)" : c || "Sans site";
  const lignesFormation = l => l.map(x => `<tr><td>${esc(x.libelle)}</td><td>${esc(x.personnes)}</td><td>${esc(x.obligations)}</td><td>${esc(x.ajour)}</td><td>${x.arenouveler ? badge(x.arenouveler, "b-warn") : "0"}</td>
    <td>${x.retard ? badge(x.retard, "b-ko") : "0"}</td><td>${x.jamais ? badge(x.jamais, "b-ko") : "0"}</td><td>${x.taux === null || x.taux === undefined ? "—" : barre(x.taux)}</td></tr>`).join("");
  const enteteFormation = `<thead><tr><th>Périmètre</th><th>Personnes</th><th>Formations exigées</th><th>À jour</th><th>À renouveler</th><th>En retard</th><th>Jamais suivies</th><th>Taux à jour</th></tr></thead>`;

  function etatSocle(code, mesure) {
    const syn = objetsSite(code, "syntheseConformite");
    if (!syn.length) return ["pas de synthèse", ""];
    return syn.some(s => (s.mesuresSocleNonAppliquees || []).includes(mesure)) ? ["non appliquée", "b-ko"] : ["appliquée", "b-ok"];
  }

  /* ===================================================== vues */
  const VUES = {};

  // Lien qui ouvre le module sur une base de l'espace (#werbsmsi=…) ; null si le module ne sait pas l'ouvrir.
  function lienBase(m, b, site = "") {
    const url = lienModule(m);
    return url && m.manifeste.ouvertureParLien ? WerbSocle.lien.creer(url, { groupeId: P.groupe.groupeId, fichier: b.chemin, site, libelle: b.libelle || "", espace: E.nom, theme: WerbSocle.theme.mode }) : null;
  }
  // Verrou valable d'une base (charte §5.7) : texte « Ouverte par X depuis 14:32 », sinon « »
  const ouvertePar = b => WerbSocle.verrou.actif(b.verrou) ? `Ouverte par ${b.verrou.par} ${WerbSocle.verrou.quand(b.verrou.depuis)}` : "";
  // Puce d'une base : lien vers le module ouvert sur la base, sinon copie du chemin. Cadenas si un utilisateur l'a ouverte.
  function puceBase(m, b, etiquette, site = "") {
    const ouverte = ouvertePar(b);
    if (ouverte) etiquette += ` <span class="verrou" aria-label="${esc(ouverte)}">🔒</span>`;
    const titre = `${b.libelle ? b.libelle + " – " : ""}${b.chemin}${b.declaree ? "" : " (non déclarée)"}${b.present ? "" : " (absente)"}${ouverte ? " – " + ouverte : ""}`;
    const cls = `chip${!b.present ? " absente" : !b.declaree ? " nondecl" : ""}`;
    const href = b.present && lienBase(m, b, site);
    return href ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener" title="${esc("Ouvrir dans " + m.manifeste.produit + " : " + titre)}">${etiquette}</a>`
      : `<button class="${cls}" data-act="copierChemin" data-chemin="${esc(b.chemin)}" title="${esc(titre + " – cliquer pour copier le chemin")}">${etiquette}</button>`;
  }
  // Bases de l'espace pour un module : une puce par base du groupe et par site (vue d'ensemble des sites).
  function basesModule(m) {
    const man = m.manifeste;
    if (!E.ouvert || !P.groupe || !man || !man.donnees) return "";
    const nomCourt = (b, l) => l.length > 1 ? ` · ${esc((b.libelle || b.fichier.split("/").pop()).slice(0, 24))}` : "";
    let h = "";
    if (man.portees.includes("groupe")) {
      const bs = (P.basesGroupe || []).filter(b => b.module === m.id);
      h += bs.length ? bs.map(b => puceBase(m, b, `🏢 Groupe${nomCourt(b, bs)}`)).join("") : `<span class="chip vide" title="Aucune base ${esc(man.produit)} au niveau du groupe">🏢 Groupe</span>`;
    }
    if (man.portees.includes("site")) {
      h += (P.groupe.sites || []).map(s => {
        const d = P.sites[s.code] || {};
        if (!d.accessible) return `<span class="chip ferme" title="${esc(s.nom)} : dossier absent ou fermé par les droits du drive">🔒 ${esc(s.code)}</span>`;
        const bs = d.bases.filter(b => b.module === m.id);
        return bs.length ? bs.map(b => puceBase(m, b, `📍 ${esc(s.code)}${nomCourt(b, bs)}`, s.code)).join("")
          : `<span class="chip vide" title="${esc(`${s.nom} : aucune base ${man.produit}`)}">📍 ${esc(s.code)}</span>`;
      }).join("");
    }
    return h ? `<div class="bases"><div class="small muted">Bases de l'espace${man.ouvertureParLien ? " – cliquer pour ouvrir" : " – cliquer pour copier le chemin"}</div><div class="chips">${h}</div></div>` : "";
  }

  function tuileModule(m, niveau) {
    const man = m.manifeste;
    const lien = lienModule(m) && WerbSocle.lien.avecTheme(lienModule(m), WerbSocle.theme.mode);   // thème transmis (charte §7.5)
    const etat = { publie: ["publié", "b-ok"], "a-integrer": ["à intégrer", "b-warn"], "a-creer": ["à créer", ""] }[m.etat] || [m.etat, ""];
    return `<div class="tile"><h3>${esc(man ? man.produit : libelleModule(m.id))}</h3>
      <div class="desc">${esc(man ? man.description : "")}</div>
      <div class="row small" style="margin:6px 0">${badge(etat[0], etat[1])}${man ? `<span class="muted">v${esc(man.version)} · ${man.donnees ? esc(man.portees.join(" + ")) : "📖 lecture seule, sans base"}</span>` : ""}
      ${man && man.auteur !== "@WerbHat" ? `<span class="muted">${esc(man.signature)}</span>` : ""}</div>
      ${lien ? `<a class="btn primary" href="${esc(lien)}" target="_blank" rel="noopener noreferrer">Ouvrir</a>` : `<span class="small muted">Non disponible</span>`}
      ${basesModule(m)}</div>`;
  }

  // Paramètres (⚙️ Administration › Paramètres) : modules masqués du portail, enregistrés dans werbsmsi.groupe.json (communs à l'organisation)
  const masques = () => new Set(E.ouvert && P.groupe && P.groupe.parametres && Array.isArray(P.groupe.parametres.modulesMasques) ? P.groupe.parametres.modulesMasques : []);
  // Modules par étape du parcours (1.12.0 ; avant : par rubrique). niveau : "" (accueil), "groupe" ou "site"
  function rubriquesHtml(niveau) {
    const mq = masques();
    let nMasques = 0;
    const html = etapesAffichees().map(e => {
      const tous = modulesEtape(e).filter(m => !niveau || !m.manifeste || m.manifeste.portees.includes(niveau));
      if (!tous.length && (niveau || !e.id)) return "";   // étape sans module à ce niveau : pas de carte vide
      const mods = tous.filter(m => !mq.has(m.id));
      nMasques += tous.length - mods.length;
      if (tous.length && !mods.length) return "";   // étape dont tous les modules sont masqués : retirée de la page
      const portees = [...new Set(tous.flatMap(m => m.manifeste ? m.manifeste.portees : []))].sort();
      return `<div class="card rub" data-etape="${esc(e.id)}" id="etape-${esc(e.id || "autres")}"><div class="row">${titre(e.emoji, `${e.id ? `<span class="pc-num">${e.ordre}</span>` : ""}${esc(e.libelle)}`, e.teinte)}<span class="small muted">${esc(portees.map(x => x === "groupe" ? "🏢 groupe" : "📍 site").join(" + "))}</span></div>
        ${e.sousTitre ? `<p class="small muted">${esc(e.sousTitre)}</p>` : ""}
        <div class="tiles">${mods.map(m => tuileModule(m, niveau)).join("") || `<span class="small muted">${niveau ? `Aucun module au niveau ${esc(niveau)} pour l'instant.` : "Aucun module."}</span>`}</div></div>`;
    }).join("");
    return html + (nMasques ? `<p class="small muted" data-masques>${nMasques} module(s) masqué(s) de cette page : <a href="#" data-nav="parametres">⚙️ Administration › Paramètres</a>.</p>` : "");
  }
  // Parcours en 7 étapes, en tête de l'accueil (reprend l'infographie « Démarrer avec WerbSMSI »)
  function parcoursHtml() {
    const mq = masques();
    return `<div class="card parcours" data-parcours>${titre("🧭", "Le parcours WerbSMSI — de la gouvernance à la résilience, pas à pas", "bleu")}
      <p class="small"><b>Vous n'avez pas besoin de tout utiliser dès le départ.</b> Commencez par gouverner, connaître et cartographier votre environnement : les analyses de risques, la conformité, les contrôles et la résilience s'appuieront sur des informations fiables et à jour.</p>
      <ol class="pc-etapes">${ETAPES.map(e => { const [f, c] = WerbSocle.teinteCss(e.teinte), mods = modulesEtape(e).filter(m => !mq.has(m.id));
        return `<li><button type="button" class="pc-etape" data-act="allerEtape" data-e="${esc(e.id)}" style="--tf:${f};--tt:${c}" title="Voir les modules de l'étape ${e.ordre}">
          <span class="pc-num">${e.ordre}</span><span class="pc-txt"><b>${e.emoji} ${esc(e.libelle)}</b><span>${esc(e.sousTitre)}</span><span class="pc-mods">${esc(mods.map(nomModule).join(" · ") || "—")}</span></span></button></li>`; }).join("")}</ol>
      <p class="pc-chaine small muted">Sans inventaire fiable, pas de cartographie pertinente. Sans cartographie, pas d'analyse de risque crédible. Sans analyse de risque, pas de décisions efficaces. Sans gouvernance, pas d'amélioration continue.</p>
      <div class="row">${(window.WERB_MEDIAS || {}).infographie_demarrer ? `<button data-nav="infographie">🖼️ Voir l'infographie</button>` : ""}${guideDemarrer() ? `<button data-nav="${esc(guideDemarrer().id)}">📖 ${esc(guideDemarrer().titre)}</button>` : ""}</div></div>`;
  }

  // Guides du portail (portail/guides/) : lecture dans ❓ Aide ; « Démarrer avec WerbSMSI » est proposé à l'accueil
  WerbGuides.guides().forEach(g => { VUES[g.id] = () => WerbGuides.vue(g.id, { lien: id => `data-nav="${id}"` }); });
  const guideDemarrer = () => WerbGuides.guides().find(g => /demarrer/i.test(g.fichier)) || null;
  VUES.accueil = () => `<div class="hero"><h1>🛡️ WerbSMSI</h1><p class="sub">${esc(WERB.description)}</p>
    ${guideDemarrer() ? `<div class="infobox">🧭 <b>Dirigeant, ou nouveau dans la cybersécurité ?</b> Commencez par le guide <a href="#" data-nav="${esc(guideDemarrer().id)}">« ${esc(guideDemarrer().titre)} »</a> : le SMSI en termes simples, qui fait quoi, et une feuille de route réaliste sur douze mois.</div>` : ""}
    ${E.ouvert ? "" : `<div class="infobox">Ouvrez l'espace <code>SMSI_&lt;GROUPE&gt;</code> du drive protégé pour voir le groupe, les sites et la consolidation. Le dossier est redemandé à chaque session.</div>`}
    ${E.disponible ? "" : `<div class="warnbox">Ce navigateur ne permet pas d'ouvrir un dossier : utilisez Microsoft Edge.</div>`}
    <div class="row" style="margin-bottom:16px"><button class="primary" data-act="espace"${E.disponible ? "" : " disabled"}>${E.ouvert ? "Changer d'espace…" : "Ouvrir l'espace…"}</button>
      <button data-act="demo" title="Ouvrir l'espace de démonstration fourni avec WerbSMSI (groupe fictif, sites LYON et NANTES)">🧪 Espace de démonstration…</button>
      <button data-act="assistant" data-k="espace">🏗️ Créer un espace…</button><button data-act="verifier"${E.disponible ? "" : " disabled"}>Vérifier les modules…</button></div>
    ${E.ouvert ? `<div class="infobox small">Sous chaque module, une puce par site : cliquez-la pour ouvrir le module directement sur la base du site.</div>` : ""}</div>
    ${parcoursHtml()}
    ${rubriquesHtml("")}`;
  // Infographie « Démarrer avec WerbSMSI » (❓ Aide), image intégrée au portail
  VUES.infographie = () => {
    const src = (window.WERB_MEDIAS || {}).infographie_demarrer;
    return `<h1>🖼️ Démarrer avec WerbSMSI — l'infographie</h1><p class="sub">Le parcours en 7 étapes, de la gouvernance à la résilience. Chaque étape regroupe les modules de l'accueil ; le guide « Démarrer avec WerbSMSI » détaille qui fait quoi et la feuille de route.</p>
      <div class="row noprint" style="margin-bottom:10px"><button data-nav="accueil">← Accueil</button>${guideDemarrer() ? `<button data-nav="${esc(guideDemarrer().id)}">📖 ${esc(guideDemarrer().titre)}</button>` : ""}<button data-act="imprimerPage">🖨 Imprimer</button></div>
      ${src ? `<div class="card infographie"><img src="${src}" alt="Infographie « Démarrer avec WerbSMSI » : sept étapes — 1 Gouverner (WerbGouvernance, WerbReferentiels), 2 Connaître son SI (WerbMap, WerbAssets, WerbCartoSI), 3 Comprendre les risques (WerbEBIOS), 4 Maîtriser les exigences (WerbNIS2, WerbIEC62443, WerbPresta, WerbRGPD), 5 Contrôler le terrain (WerbExploitation, WerbRecette, WerbPentest), 6 Assurer la résilience (WerbPCR, WerbVeille), 7 Faire vivre le SMSI (WerbAcademie)"></div>` : `<div class="card"><p class="muted">Infographie absente de cette version du portail.</p></div>`}`;
  };

  VUES.groupe = () => {
    const g = P.groupe;
    const sites = g.sites || [];
    const pubG = P.pubGroupe || { objets: {}, fichiers: [] };
    let h = `<h1>🏢 ${esc(g.organisation)}</h1><p class="sub">Vue groupe · ${sites.length} site(s)${g.responsable ? ` · ${esc(g.responsable)}` : ""}</p>`;
    if (P.manquants.length) h += `<div class="warnbox"><b>${P.manquants.length} dossier(s) de rubrique absent(s)</b> : ${P.manquants.map(d => `<code>${esc(d)}/</code>`).join(" ")}.
      Une rubrique a été ajoutée à WerbSMSI après la création de l'espace : ses bases se rangent dans ces dossiers.
      <div class="row" style="margin-top:8px"><button class="primary" data-act="creerDossiers">📁 Créer les dossiers manquants</button><span class="small muted">Dossiers vides seulement : aucun fichier n'est créé ni modifié.</span></div></div>`;
    h += `<div class="card">${titre("🏭", "Sites", "vert")}<div class="tablewrap"><table class="t"><thead><tr><th>Code</th><th>Nom</th><th>Entité</th><th>Accès</th><th>Bases</th><th>Dernière publication</th></tr></thead><tbody>
      ${sites.map(s => {
        const d = P.sites[s.code] || {};
        const derniere = d.accessible ? (d.pub.fichiers || []).map(f => f.publieLe).filter(Boolean).sort().pop() : "";
        return `<tr><td><a href="#" data-site="${esc(s.code)}">${esc(s.code)}</a></td><td>${esc(s.nom)}</td><td>${esc(s.entite || "")}</td>
          <td>${d.accessible ? badge("lisible", "b-ok") : badge("non accessible", "b-warn")}</td><td>${d.accessible ? d.bases.length : "—"}</td><td>${esc(frDate(derniere)) || "—"}</td></tr>`;
      }).join("") || `<tr><td colspan="6" class="empty">Aucun site déclaré.</td></tr>`}</tbody></table></div>
      <p class="small muted">Un site « non accessible » est absent ou fermé par les droits du drive.</p></div>`;

    const conf = sitesAccessibles().flatMap(s => objetsSite(s.code, "syntheseConformite").map(c => ({ site: s.code, c, pub: publication(s.code, c.source) })));
    h += `<div class="card">${titre("✅", "Conformité par site", "cyan")}<div class="tablewrap"><table class="t"><thead><tr><th>Site</th><th>Référentiel</th><th>Périmètre</th><th>Taux</th><th>Conformes</th><th>Écarts</th><th>Mesures du socle non appliquées</th><th>Publié</th></tr></thead><tbody>
      ${conf.map(({ site, c, pub }) => `<tr><td>${esc(site)}</td><td>${esc(c.referentiel)}</td><td>${esc(c.perimetre || "")}</td><td>${barre(c.taux)}</td><td>${esc(c.conformes ?? "")} / ${esc(c.exigences ?? "")}</td>
        <td>${c.ecartsMajeurs ? badge(c.ecartsMajeurs, "b-ko") : "0"}</td><td>${esc((c.mesuresSocleNonAppliquees || []).join(", ") || "—")}</td><td class="small">${pub ? `${esc(frDate(pub.publieLe))}<br>${esc(pub.publiePar || "")} · ${esc(libelleModule(c.source))}` : ""}</td></tr>`).join("") || `<tr><td colspan="8" class="empty">Aucune synthèse de conformité publiée.</td></tr>`}
      </tbody></table></div></div>`;

    // Schémas d'architecture par site (site:cartographies, WerbCartoSI)
    const cartos = sitesAccessibles().map(s => ({ s, c: objetsSite(s.code, "cartographies") })).filter(x => x.c.length);
    h += `<div class="card" data-cartographies>${titre("🗺️", "Schémas d'architecture par site", "cyan")}${cartos.length ? `<div class="tablewrap"><table class="t"><thead><tr><th>Site</th><th>Exigences couvertes</th><th>À revoir</th><th>En cours</th><th>Non couvertes</th><th>Schémas en vigueur</th><th>Publié</th></tr></thead><tbody>
      ${cartos.map(({ s, c }) => { const n = e => c.filter(x => x.etat === e).length, pub = publication(s.code, "werbcartosi"), nb = new Set(c.flatMap(x => (x.schemas || []).map(y => y.id))).size;
        return `<tr><td>${esc(s.code)}</td><td>${barre(Math.round(100 * n("couverte") / c.length))}<span class="small">${n("couverte")} / ${c.length}</span></td><td>${n("arevoir") ? badge(n("arevoir"), "b-warn") : "0"}</td><td>${n("encours")}</td>
        <td>${n("non") ? badge(n("non"), "b-ko") : "0"}</td><td>${nb}</td><td class="small">${pub ? `${esc(frDate(pub.publieLe))}<br>${esc(pub.publiePar || "")}` : ""}</td></tr>`; }).join("")}</tbody></table></div>`
      : `<p class="small muted">Aucune couverture publiée : chaque site publie la sienne depuis WerbCartoSI.</p>`}</div>`;

    const risques = sitesAccessibles().flatMap(s => objetsSite(s.code, "syntheseRisques").map(r => ({ site: s.code, r })));
    const niveaux = [...new Set(risques.map(({ r }) => r.niveauResiduel ?? r.niveauBrut))].sort((a, b) => b - a);
    h += `<div class="card">${titre("⚠️", "Risques par site", "rouge")}
      ${risques.length ? `<div class="tablewrap"><table class="t"><thead><tr><th>Site</th>${niveaux.map(n => `<th>Résiduel ${esc(libelleNiveau(n))}</th>`).join("")}<th>Total</th></tr></thead><tbody>
      ${sitesAccessibles().map(s => { const rs = risques.filter(x => x.site === s.code); return `<tr><td>${esc(s.code)}</td>${niveaux.map(n => `<td>${rs.filter(x => (x.r.niveauResiduel ?? x.r.niveauBrut) === n).length || ""}</td>`).join("")}<td>${rs.length}</td></tr>`; }).join("")}
      </tbody></table></div>
      <h3>Risques résiduels les plus élevés</h3><div class="tablewrap"><table class="t"><thead><tr><th>Site</th><th>Risque</th><th>Événement redouté</th><th>Brut</th><th>Résiduel</th><th>Traitement</th></tr></thead><tbody>
      ${risques.slice().sort((a, b) => (b.r.niveauResiduel ?? b.r.niveauBrut) - (a.r.niveauResiduel ?? a.r.niveauBrut)).slice(0, 10).map(({ site, r }) => `<tr><td>${esc(site)}</td><td>${esc(r.libelle)}</td><td>${esc(r.evenementRedoute || "")}</td><td>${esc(r.niveauBrut)}</td><td>${esc(r.niveauResiduel ?? "")}</td><td>${esc(r.traitement || "")}</td></tr>`).join("")}
      </tbody></table></div>` : `<p class="small muted">Aucune synthèse de risques publiée.</p>`}</div>`;

    const mesures = pubG.objets.mesuresSocle || [];
    h += `<div class="card">${titre("🧱", "Socle de mesures du groupe par site", "violet")}
      ${mesures.length ? `<div class="tablewrap"><table class="t"><thead><tr><th>Mesure</th>${sitesAccessibles().map(s => `<th>${esc(s.code)}</th>`).join("")}</tr></thead><tbody>
      ${mesures.map(m => `<tr><td><strong>${esc(m.id)}</strong> ${esc(m.titre)}${m.obligatoire ? ` <span class="small muted">(obligatoire)</span>` : ""}</td>${sitesAccessibles().map(s => { const [l, c] = etatSocle(s.code, m.id); return `<td>${badge(l, c)}</td>`; }).join("")}</tr>`).join("")}
      </tbody></table></div><p class="small muted">État déduit des synthèses de conformité publiées par chaque site.</p>` : `<p class="small muted">Aucun socle de mesures publié par le groupe.</p>`}</div>`;

    const fo = formationsGroupe();
    h += `<div class="card" data-formations>${titre("🎓", "Formation et sensibilisation", "olive")}
      ${fo ? `<div class="tablewrap"><table class="t">${enteteFormation}<tbody>${lignesFormation([...(fo.parSite || []).map(x => Object.assign({ libelle: libSiteFormation(x.site) }, x)), Object.assign({ libelle: "Groupe" }, fo.global)])}</tbody></table></div>
        <p class="small">Dirigeants à jour de leurs formations (NIS2, article 20) : <strong>${esc(fo.dirigeants ? fo.dirigeants.personnesAJour : 0)} / ${esc(fo.dirigeants ? fo.dirigeants.personnes : 0)}</strong>
          ${fo.dirigeants && fo.dirigeants.personnes && fo.dirigeants.personnesAJour < fo.dirigeants.personnes ? badge("à former", "b-ko") : ""} · sessions des douze derniers mois : <strong>${esc(fo.sessions12Mois ?? 0)}</strong> · ${(fo.catalogue || []).length} formation(s) au catalogue</p>
        <p class="small muted">Publié par ${esc(libelleModule(fo.source))} le ${esc(frDate(fo.majLe))}. Formations exigées : formations publiées qui visent la population de chaque personne ; à jour : dernière session réussie dans le délai de renouvellement. Aucun nom n'est publié.</p>`
        : `<p class="small muted">Aucun indicateur de formation publié : WerbAcademie (niveau groupe) › Intégration WerbSMSI › Publier.</p>`}</div>`;
    h += `<div class="grid g2"><div class="card">${titre("📤", "Publications du groupe", "ambre")}${publicationsHtml(pubG)}</div>
      <div class="card">${titre("🗂️", "Bases du groupe", "ardoise")}${basesHtml(P.basesGroupe || [])}</div></div>`;
    h += `<div class="card">${titre("📍", "Bases par module et par site", "vert")}<p class="small muted">Une puce par site : 📍 base présente (cliquer pour l'ouvrir dans son module), grisée si le site n'a pas de base, 🔒 si le dossier du site n'est pas accessible.</p>
      <div class="tiles">${REG.modules.filter(m => m.manifeste && m.etat === "publie" && !masques().has(m.id)).map(m => `<div class="tile"><h3>${esc(m.manifeste.produit)}</h3>${basesModule(m)}</div>`).join("")}</div></div>`;
    h += `<h2 class="section">🧩 Modules du niveau groupe</h2>${rubriquesHtml("groupe")}`;
    return h;
  };

  function publicationsHtml(pub) {
    const fichiers = pub.fichiers || [];
    if (!fichiers.length) return `<p class="small muted">Aucune publication.</p>`;
    const objetsPar = m => Object.entries(pub.objets || {}).filter(([, v]) => (Array.isArray(v) ? v[0] : v) && (Array.isArray(v) ? v[0].source : v.source) === m);
    return `<table class="t"><thead><tr><th>Module</th><th>Objets</th><th>Publié</th></tr></thead><tbody>
      ${fichiers.map(f => `<tr><td>${esc(libelleModule(f.module))}</td><td class="small">${objetsPar(f.module).map(([k, v]) => `${esc(k)} (${Array.isArray(v) ? v.length : 1})`).join(", ")}</td>
        <td class="small">${esc(frDate(f.publieLe))}<br>${esc(f.publiePar || "")}</td></tr>`).join("")}</tbody></table>
      ${(pub.conflits || []).length ? `<div class="warnbox">Objets publiés par plusieurs modules : ${esc(pub.conflits.map(c => `${c.objet} (${c.modules.join(", ")})`).join(" ; "))}</div>` : ""}`;
  }

  function basesHtml(bases, site = "") {
    if (!bases.length) return `<p class="small muted">Aucune base.</p>`;
    return `<div class="tablewrap"><table class="t"><thead><tr><th>Module</th><th>Base</th><th>État</th><th>Dernière modification</th><th>Ouverte par</th><th></th></tr></thead><tbody>
      ${bases.map(b => {
        const etat = !b.present ? badge("absente", "b-ko") : !b.declaree ? badge("non déclarée", "b-warn") : badge("présente", "b-ok");
        const v = WerbSocle.verrou.actif(b.verrou) ? `🔒 ${esc(b.verrou.par)}<div class="small muted">${esc(WerbSocle.verrou.quand(b.verrou.depuis))}</div>`
          : b.verrou && b.verrou.par ? `<span class="small muted" title="Verrou de plus de ${WerbSocle.verrou.DUREE_H} h : ignoré">${esc(b.verrou.par)} (verrou expiré)</span>` : "";
        const m = b.meta || {}, mod = moduleParId(b.module), href = mod && b.present ? lienBase(mod, b, site) : null;
        return `<tr><td>${esc(libelleModule(b.module))}</td><td>${esc(b.libelle || "")}<div class="mono">${esc(b.fichier)}</div></td><td>${etat}</td>
          <td class="small">${esc(frDate(b.modifie))}${m.modifiePar ? `<br>${esc(m.modifiePar)}` : ""}${m.appVersion ? ` · v${esc(m.appVersion)}` : ""}</td><td>${v}</td>
          <td style="white-space:nowrap">${href ? `<a class="btn small" href="${esc(href)}" target="_blank" rel="noopener">Ouvrir</a>` : ""}
          ${b.present && !b.declaree ? `<button class="small" data-act="declarer" data-chemin="${esc(b.chemin)}" data-module="${esc(b.module)}" data-code="${esc(site)}" title="Ajouter cette base à ${site ? "werbsmsi.site.json" : "werbsmsi.groupe.json"}">Déclarer</button>` : ""}</td></tr>`;
      }).join("")}</tbody></table></div>`;
  }

  VUES.site = () => {
    const s = (P.groupe.sites || []).find(x => x.code === P.site);
    const d = P.sites[P.site] || {};
    if (!s) return `<p>Site inconnu.</p>`;
    if (!d.accessible) return `<h1>📍 ${esc(s.code)} – ${esc(s.nom)}</h1><div class="warnbox">Ce site n'est pas accessible : dossier absent ou droits du drive insuffisants.</div>`;
    const i = d.info;
    let h = `<h1>📍 ${esc(s.code)} – ${esc(i.nom)}</h1><p class="sub">${esc(i.entite || "")}${i.correspondant ? ` · Correspondant : ${esc(i.correspondant)}` : ""}${i.classification ? ` · ${esc(i.classification)}` : ""}</p>`;
    const conf = objetsSite(s.code, "syntheseConformite"), rq = objetsSite(s.code, "syntheseRisques"), zs = objetsSite(s.code, "zones"), ac = objetsSite(s.code, "actifs"), ca = objetsSite(s.code, "cartographies");
    h += `<div class="card"><div class="row" style="gap:28px">
      <div><div class="small muted">Zones publiées</div><strong>${zs.length}</strong></div><div><div class="small muted">Actifs publiés</div><strong>${ac.length}</strong></div>
      <div><div class="small muted">Risques publiés</div><strong>${rq.length}</strong></div>
      <div><div class="small muted">Exigences couvertes par des schémas</div><strong>${ca.length ? `${ca.filter(x => x.etat === "couverte").length} / ${ca.length}` : "—"}</strong></div>
      <div><div class="small muted">Conformité</div>${conf.length ? conf.map(c => `<div class="small">${esc(c.referentiel)} – ${esc(c.perimetre || "")} : <strong>${esc(c.taux)} %</strong></div>`).join("") : "<strong>—</strong>"}</div></div></div>`;
    h += `<div class="card">${titre("🗂️", "Bases du site", "ardoise")}${basesHtml(d.bases, s.code)}
      <p class="small muted">Une base « non déclarée » est présente dans le dossier du site mais absente de <code>werbsmsi.site.json</code> : le bouton <b>Déclarer</b> l'y ajoute. <b>Ouvrir</b> lance le module sur la base.</p></div>`;
    const fo = formationsGroupe(), fs = fo ? (fo.parSite || []).find(x => x.site === s.code) : null;
    if (fs) h += `<div class="card" data-formations-site>${titre("🎓", "Formation et sensibilisation", "olive")}<div class="tablewrap"><table class="t">${enteteFormation}<tbody>
      ${lignesFormation([Object.assign({ libelle: s.code }, fs), ...(fo.indicateurs || []).filter(x => x.site === s.code).map(x => Object.assign({}, x, { libelle: `· ${({ collaborateurs: "Collaborateurs", administrateurs: "Administrateurs", dirigeants: "Dirigeants", prestataires: "Prestataires", operateurs: "Opérateurs OT" })[x.population] || x.population}` }))])}</tbody></table></div>
      <p class="small muted">Indicateurs de l'académie du groupe (${esc(libelleModule(fo.source))}, publiés le ${esc(frDate(fo.majLe))}), sans aucun nom.</p></div>`;
    if (ca.length) {
      const ETATS = { couverte: ["Couverte", "b-ok"], arevoir: ["À revoir", "b-warn"], encours: ["En cours", "b-info"], non: ["Non couverte", "b-ko"] };
      h += `<div class="card" data-carto-site>${titre("🗺️", "Schémas d'architecture", "cyan")}<table class="t"><thead><tr><th>Exigence</th><th>Couverture</th><th>Schémas en vigueur</th></tr></thead><tbody>
        ${ca.map(x => `<tr><td><b>${esc(x.id)}</b> — ${esc(x.libelle)}</td><td>${badge((ETATS[x.etat] || [x.etat])[0], (ETATS[x.etat] || [])[1] || "")}</td>
          <td class="small">${(x.schemas || []).map(y => `${esc(y.id)} ${esc(y.titre)} (v${esc(y.version)}${y.prochaineRevue ? `, revue ${esc(frDate(y.prochaineRevue))}` : ""})`).join("<br>") || `<span class="muted">aucun</span>`}</td></tr>`).join("")}</tbody></table>
        <p class="small muted">Publié par ${esc(libelleModule("werbcartosi"))} : métadonnées seulement, les schémas restent dans le dossier du site.</p></div>`;
    }
    h += `<div class="card">${titre("📤", "Publications du site", "ambre")}${publicationsHtml(d.pub)}</div>`;
    if (zs.length) h += `<div class="card">${titre("🧭", "Zones", "cyan")}<table class="t"><thead><tr><th>ID</th><th>Nom</th><th>SL-T</th><th>Criticité</th></tr></thead><tbody>
      ${zs.map(z => `<tr><td>${esc(z.id)}</td><td>${esc(z.nom)}</td><td>${esc(z.slt ?? "")}</td><td>${esc(z.criticite || "")}</td></tr>`).join("")}</tbody></table></div>`;
    h += `<h2 class="section">🧩 Modules du niveau site</h2>${rubriquesHtml("site")}`;
    return h;
  };

  /* ===================================================== mise en place guidée */
  // Le navigateur ne peut pas lancer Python : le portail crée lui-même l'espace et les sites (mêmes fichiers que
  // werb_charte.py groupe / site) et prépare les commandes de développement à copier (nouveau module).
  const RE_CODE = /^[A-Z0-9][A-Z0-9_-]{0,30}$/;
  const CLASSIFICATIONS = ["Diffusion restreinte", "Confidentiel", "Interne"];
  const F = {
    onglet: "espace",
    espace: { organisation: "", sigle: "", classification: CLASSIFICATIONS[0], responsable: "", sites: [{ code: "", nom: "", entite: "", correspondant: "" }] },
    site: { code: "", nom: "", entite: "", correspondant: "" },
    module: { id: "", produit: "", rubrique: "", portees: [], description: "", dest: "" },
  };
  const DROITS_MD = `# Droits d'accès recommandés – WerbSMSI

> Généré par le portail WerbSMSI – Développé par @WerbHat. La sécurité des données repose sur ces droits (charte §1, P3).

| Dossier ou fichier | Équipe SMSI groupe | Équipe du site X | Autres sites |
|---|---|---|---|
| \`werbsmsi.groupe.json\`, \`publications/\` | lecture-écriture | lecture | lecture |
| \`groupe/\` | lecture-écriture | aucun | aucun |
| \`sites/X/\` | lecture (écriture si le groupe administre) | lecture-écriture | aucun |

- \`modeles/\` contient le modèle Word d'entreprise commun (\`Modele_entete.docx\`), lu par tous les modules : lecture pour tous, écriture pour l'équipe SMSI groupe.
- \`publications/\` à la racine est lisible par tous les sites : les modules du groupe n'y publient que ce qui doit être diffusé.
- Désactiver l'héritage des droits sur \`groupe/\` et sur chaque \`sites/<CODE>/\`.
- Activer l'historique des versions du drive : il sert de sauvegarde des bases.
`;
  const maintenant = () => new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const metaEspace = (gid, portee, site) => Object.assign({ produit: WERB.produit, appVersion: WERB.version, auteur: WERB.auteur, generateur: WERB.ligne,
    creeLe: maintenant().slice(0, 10), modifieLe: maintenant(), modifiePar: "Portail WerbSMSI", groupeId: gid, portee }, site ? { site } : {});
  const docEspace = (fmt, meta, data) => ({ format: fmt, schema: 1, famille: "WERBSMSI", meta, data });
  const DOSSIERS_SITE = [...NIVEAU_DOSSIERS.site, "publications"];
  const psq = v => `'${String(v).replace(/'/g, "''")}'`;   // chaîne PowerShell entre apostrophes

  function erreursEspace(f = F.espace) {
    const e = {};
    if (!f.organisation.trim()) e.organisation = "Nom de l'organisation obligatoire.";
    if (!RE_CODE.test(f.sigle)) e.sigle = "Sigle obligatoire : majuscules, chiffres, _ et - (ex. GDI). Il donne le nom du dossier SMSI_<SIGLE>.";
    const vus = new Set();
    f.sites.forEach((s, i) => {
      if (!s.code && !s.nom) return;   // ligne vide ignorée
      if (!RE_CODE.test(s.code)) e[`site${i}`] = `Site ${i + 1} : code en majuscules, chiffres, _ et - (ex. LYON, SITE_02).`;
      else if (vus.has(s.code)) e[`site${i}`] = `Site ${i + 1} : le code ${s.code} est déjà utilisé.`;
      else if (!s.nom.trim()) e[`site${i}`] = `Site ${i + 1} : nom obligatoire.`;
      vus.add(s.code);
    });
    return e;
  }
  function erreursSite(f = F.site) {
    const e = {};
    if (!RE_CODE.test(f.code)) e.code = "Code en majuscules, chiffres, _ et - (ex. LYON). Il ne change jamais : c'est le nom du dossier du site.";
    else if (P.groupe && (P.groupe.sites || []).some(s => s.code === f.code)) e.code = `Le site ${f.code} existe déjà.`;
    if (!f.nom.trim()) e.nom = "Nom du site obligatoire.";
    return e;
  }
  function erreursModule(f = F.module) {
    const e = {}, rub = RUBRIQUES.find(r => r.id === f.rubrique);
    if (!/^[a-z][a-z0-9-]{1,40}$/.test(f.id)) e.id = "Identifiant : minuscules, chiffres et tirets, 2 caractères min. (ex. werbexemple).";
    else if (REG.modules.some(m => m.id === f.id)) e.id = `L'identifiant ${f.id} est déjà pris par un module du registre.`;
    if (!/^Werb[A-Za-z0-9_]{1,40}$/.test(f.produit)) {
      const corr = /^werb/i.test(f.produit) ? "Werb" + f.produit.slice(4).replace(/[^A-Za-z0-9_]/g, "") : "";
      e.produit = `Produit : préfixe « Werb » (W majuscule), sans espace ni accent${corr && /^Werb[A-Za-z0-9_]{1,40}$/.test(corr) ? ` — proposition : ${corr}` : " (ex. WerbExemple)"}.`;
    }
    if (!rub) e.rubrique = "Choisissez une rubrique du registre.";
    else if (!f.portees.length || f.portees.some(p => !(rub.portees || []).includes(p))) e.portees = `Niveaux autorisés pour cette rubrique : ${(rub.portees || []).join(", ")}.`;
    if (!f.description.trim()) e.description = "Description obligatoire (une phrase).";
    if (!f.dest.trim()) e.dest = "Dossier du dépôt du module (vide ou inexistant), par exemple à côté de WerbSMSI.";
    return e;
  }

  const champ = (form, k, label, err, attrs = "") => `<div><label class="f">${esc(label)}</label><input data-form="${form}" data-k="${k}" value="${esc(F[form][k])}" ${attrs}>${err[k] ? `<div class="err">${esc(err[k])}</div>` : ""}</div>`;
  const commandes = l => `<pre class="cmd">${esc(l.join("\n"))}</pre><button data-act="copierCommandes">📋 Copier les commandes</button>`;

  function ongletEspace() {
    const f = F.espace, err = erreursEspace(), ok = !Object.keys(err).length, sites = f.sites.filter(s => s.code || s.nom);
    const dossier = `SMSI_${f.sigle || "<SIGLE>"}`;
    return `<div class="card">${titre("🏢", "1. Organisation", "violet")}<div class="grid g3">
      ${champ("espace", "organisation", "Organisation (groupe) *", err, 'placeholder="Groupe Industrie"')}
      ${champ("espace", "sigle", "Sigle * (nom du dossier SMSI_<SIGLE>)", err, 'placeholder="GDI" style="text-transform:uppercase"')}
      <div><label class="f">Classification des bases</label><select data-form="espace" data-k="classification">${CLASSIFICATIONS.map(c => `<option${c === f.classification ? " selected" : ""}>${esc(c)}</option>`).join("")}</select></div>
      ${champ("espace", "responsable", "Responsable du SMSI", err, 'placeholder="Prénom NOM – RSSI groupe"')}</div></div>
      <div class="card">${titre("📍", "2. Sites", "vert")}<p class="small muted">Un dossier par site : les droits du drive se donnent site par site. Le code ne change jamais. D'autres sites pourront être ajoutés plus tard.</p>
      <table class="t"><thead><tr><th style="width:130px">Code *</th><th>Nom *</th><th>Entité</th><th>Correspondant</th><th></th></tr></thead><tbody>
      ${f.sites.map((s, i) => `<tr><td><input data-fsite="${i}" data-k="code" value="${esc(s.code)}" placeholder="LYON" style="text-transform:uppercase"></td><td><input data-fsite="${i}" data-k="nom" value="${esc(s.nom)}" placeholder="Usine de Lyon"></td>
        <td><input data-fsite="${i}" data-k="entite" value="${esc(s.entite)}"></td><td><input data-fsite="${i}" data-k="correspondant" value="${esc(s.correspondant)}"></td>
        <td><button class="small" data-act="retirerSite" data-i="${i}" title="Retirer">✕</button></td></tr>${err[`site${i}`] ? `<tr><td colspan="5" class="err">${esc(err[`site${i}`])}</td></tr>` : ""}`).join("")}</tbody></table>
      <button class="small" data-act="ajouterLigneSite" style="margin-top:6px">+ Ajouter un site</button></div>
      <div class="card">${titre("🏗️", "3. Création", "orange")}
      <pre class="arbo">${esc(`${dossier}/
├── werbsmsi.groupe.json      ← groupe, sites, bases du groupe
├── DROITS.md                 ← droits d'accès à appliquer sur le drive
├── publications/
├── modeles/                  ← modèle Word d'entreprise commun (Modele_entete.docx)
├── groupe/  (${NIVEAU_DOSSIERS.groupe.map(d => d + "/").join(" · ")})
└── sites/
${sites.map(s => `    ├── ${s.code || "?"}/  (werbsmsi.site.json, ${DOSSIERS_SITE.map(d => d + "/").join(" · ")})`).join("\n") || "    (aucun site pour l'instant)"}`)}</pre>
      <div class="row"><button class="primary" data-act="creerEspace"${ok && E.disponible ? "" : " disabled"}>📁 Choisir le dossier parent et créer ${esc(dossier)}</button>
      <span class="small muted">${ok ? "Choisissez le dossier du drive protégé qui contiendra l'espace (ex. le partage SMSI)." : "Complétez les champs signalés."}</span></div>
      <details style="margin-top:10px"><summary class="small">Commandes Python équivalentes (pour mémoire ou pour un script)</summary>
      ${commandes([`python .\\charte\\outils\\werb_charte.py groupe --dest ${psq("<dossier parent>\\" + dossier)} --organisation ${psq(f.organisation || "…")}${f.sigle ? ` --sigle ${f.sigle}` : ""} --classification ${psq(f.classification)}`,
        ...sites.map(s => `python .\\charte\\outils\\werb_charte.py site ${psq("<dossier parent>\\" + dossier)} --code ${s.code || "?"} --nom ${psq(s.nom || "…")}${s.entite ? ` --entite ${psq(s.entite)}` : ""}`)])}</details></div>`;
  }

  function ongletSite() {
    if (!E.ouvert || !P.groupe) return `<div class="infobox">Ouvrez d'abord l'espace du groupe (<b>Ouvrir l'espace…</b>) pour lui ajouter un site.</div>`;
    const err = erreursSite(), ok = !Object.keys(err).length;
    return `<div class="card">${titre("📍", `Ajouter un site à « ${esc(P.groupe.organisation)} »`, "vert")}<div class="grid g3">
      ${champ("site", "code", "Code * (nom du dossier, définitif)", err, 'placeholder="NANTES" style="text-transform:uppercase"')}${champ("site", "nom", "Nom *", err)}
      ${champ("site", "entite", "Entité", err)}${champ("site", "correspondant", "Correspondant cybersécurité", err)}</div>
      <div class="row" style="margin-top:12px"><button class="primary" data-act="creerSite"${ok ? "" : " disabled"}>Créer sites/${esc(F.site.code || "<CODE>")}/</button>
      <span class="small muted">Crée le dossier du site et ses sous-dossiers, <code>werbsmsi.site.json</code>, et l'ajoute à <code>werbsmsi.groupe.json</code>. Pensez ensuite aux droits (DROITS.md).</span></div></div>`;
  }

  function ongletModule() {
    const f = F.module, err = erreursModule(), ok = !Object.keys(err).length, rub = RUBRIQUES.find(r => r.id === f.rubrique);
    const cmd = `python .\\charte\\outils\\werb_charte.py nouveau --id ${f.id || "<id>"} --produit ${f.produit || "<Produit>"} --rubrique ${f.rubrique || "<rubrique>"}${f.portees.length ? ` --portees ${f.portees.join(",")}` : ""} --description ${psq(f.description || "…")} --dest ${psq(f.dest || "<dossier du dépôt>")}`;
    const d = psq(f.dest || "<dossier du dépôt>");
    return `<div class="card">${titre("🧩", "Nouveau module (développeur)", "bleu")}<p class="small muted">Le formulaire contrôle les règles de la charte et prépare les commandes à lancer depuis le dossier WerbSMSI, dans PowerShell.</p><div class="grid g3">
      ${champ("module", "id", "Identifiant technique *", err, 'placeholder="werbexemple"')}${champ("module", "produit", "Produit (nom affiché) *", err, 'placeholder="WerbExemple"')}
      <div><label class="f">Rubrique *</label><select data-form="module" data-k="rubrique"><option value="">—</option>${RUBRIQUES.map(r => `<option value="${esc(r.id)}"${r.id === f.rubrique ? " selected" : ""}>${esc(r.libelle)}</option>`).join("")}</select>${err.rubrique ? `<div class="err">${esc(err.rubrique)}</div>` : ""}</div>
      <div><label class="f">Niveaux d'utilisation *</label><div class="row">${(rub ? rub.portees : ["groupe", "site"]).map(p => `<label class="small"><input type="checkbox" data-fport="${p}"${f.portees.includes(p) ? " checked" : ""}> ${p}</label>`).join("")}</div>${err.portees ? `<div class="err">${esc(err.portees)}</div>` : ""}</div>
      ${champ("module", "description", "Description *", err, 'placeholder="Une phrase sur le rôle du module"')}${champ("module", "dest", "Dossier du dépôt *", err, 'placeholder="C:\\\\Git\\\\WerbExemple"')}</div>
      <h3>Commandes</h3>${ok ? commandes([cmd, `# puis, une fois le module écrit :`, `python .\\charte\\outils\\werb_charte.py construire ${d}`, `python .\\charte\\outils\\werb_charte.py empreinte ${d}`,
        `python .\\charte\\outils\\werb_charte.py audit ${d}`, `python .\\charte\\outils\\werb_charte.py publier ${d}`]) : `<p class="small muted">Complétez les champs signalés pour obtenir les commandes.</p>`}</div>`;
  }

  VUES.assistant = () => {
    const tab = (k, l) => `<button class="${F.onglet === k ? "primary" : ""}" data-act="onglet" data-k="${k}">${l}</button>`;
    return `<h1>🛠️ Mise en place</h1><p class="sub">Création de l'espace de données et des sites sur le drive protégé, préparation d'un nouveau module.</p>
      ${E.disponible ? "" : `<div class="warnbox">Ce navigateur ne permet pas d'écrire dans un dossier : utilisez Microsoft Edge.</div>`}
      <div class="row" style="margin-bottom:12px">${tab("espace", "🏗️ Créer un espace")}${tab("site", "📍 Ajouter un site")}${tab("module", "🧩 Nouveau module")}</div>
      ${F.onglet === "espace" ? ongletEspace() : F.onglet === "site" ? ongletSite() : ongletModule()}`;
  };

  async function creerEspace() {
    const f = F.espace, sites = f.sites.filter(s => s.code || s.nom), nomDossier = `SMSI_${f.sigle}`;
    const parent = await showDirectoryPicker({ mode: "readwrite", id: "werbsmsi-parent" });
    try {
      const existant = await parent.getDirectoryHandle(nomDossier);
      for await (const _ of existant.keys()) throw new Error(`Le dossier ${nomDossier} existe déjà dans « ${parent.name} » et n'est pas vide : rien n'a été créé.`);
    } catch (e) { if (e.name !== "NotFoundError" && e.name !== "TypeMismatchError") throw e; }
    const racine = await parent.getDirectoryHandle(nomDossier, { create: true });
    const rep = async chemin => { let d = racine; for (const p of chemin.split("/").filter(Boolean)) d = await d.getDirectoryHandle(p, { create: true }); return d; };
    const ecrire = async (chemin, contenu) => {
      const i = chemin.lastIndexOf("/"), d = await rep(chemin.slice(0, i + 1));
      const w = await (await d.getFileHandle(chemin.slice(i + 1), { create: true })).createWritable();
      await w.write(typeof contenu === "string" ? contenu : JSON.stringify(contenu, null, 1) + "\n"); await w.close();
    };
    const gid = crypto.randomUUID();
    for (const r of NIVEAU_DOSSIERS.groupe) await rep(`groupe/${r}`);
    await rep("publications"); await rep("sites"); await rep("modeles");
    for (const s of sites) {
      for (const r of DOSSIERS_SITE) await rep(`sites/${s.code}/${r}`);
      await ecrire(`sites/${s.code}/werbsmsi.site.json`, docEspace("WERBSMSI-SITE", metaEspace(gid, "site", s.code),
        { groupeId: gid, code: s.code, nom: s.nom.trim(), entite: s.entite.trim(), correspondant: s.correspondant.trim(), classification: f.classification, bases: [] }));
    }
    await ecrire("werbsmsi.groupe.json", docEspace("WERBSMSI-GROUPE", metaEspace(gid, "groupe"), {
      groupeId: gid, organisation: f.organisation.trim(), sigle: f.sigle, entites: [], classification: f.classification, responsable: f.responsable.trim(),
      sites: sites.map(s => ({ code: s.code, nom: s.nom.trim(), dossier: `sites/${s.code}`, entite: s.entite.trim(), actif: true })), bases: [] }));
    await ecrire("DROITS.md", DROITS_MD);
    await E.adopter(racine);
    return { nom: `${parent.name}/${nomDossier}`, sites: sites.length };
  }

  async function creerSite() {
    const f = F.site, g = await E.lire("werbsmsi.groupe.json");
    if (!g || g.format !== "WERBSMSI-GROUPE") throw new Error("werbsmsi.groupe.json illisible : vérifiez vos droits d'écriture sur l'espace.");
    if (g.data.sites.some(s => s.code === f.code)) throw new Error(`Le site ${f.code} existe déjà.`);
    if ((await E.lister(`sites/${f.code}`) || []).length) throw new Error(`Le dossier sites/${f.code} existe déjà et n'est pas vide.`);
    const gid = g.data.groupeId;
    for (const r of DOSSIERS_SITE) await E.creerDossier(`sites/${f.code}/${r}`);
    await E.ecrire(`sites/${f.code}/werbsmsi.site.json`, docEspace("WERBSMSI-SITE", metaEspace(gid, "site", f.code),
      { groupeId: gid, code: f.code, nom: f.nom.trim(), entite: f.entite.trim(), correspondant: f.correspondant.trim(), classification: g.data.classification || "", bases: [] }));
    g.data.sites.push({ code: f.code, nom: f.nom.trim(), dossier: `sites/${f.code}`, entite: f.entite.trim(), actif: true });
    Object.assign(g.meta, { modifieLe: maintenant(), modifiePar: "Portail WerbSMSI" });
    await E.ecrire("werbsmsi.groupe.json", g);
    await E.relire();   // liste des sites à jour
  }

  async function declarer(chemin, module, code) {
    const fichierDesc = code ? `sites/${code}/werbsmsi.site.json` : "werbsmsi.groupe.json";
    const j = await E.lire(fichierDesc);
    if (!j || !j.data) throw new Error(`${fichierDesc} illisible.`);
    const rel = code ? chemin.slice(`sites/${code}/`.length) : chemin;
    if ((j.data.bases || []).some(b => b.fichier === rel)) throw new Error("Base déjà déclarée.");
    const propose = rel.split("/").pop().replace(/\.[^.]+\.json$|\.json$/, "").replace(/_/g, " ");
    const libelle = prompt(`Libellé de la base ${rel} :`, propose);
    if (libelle === null) return false;
    (j.data.bases = j.data.bases || []).push({ module, fichier: rel, libelle: libelle.trim() || propose });
    Object.assign(j.meta || (j.meta = {}), { modifieLe: maintenant(), modifiePar: "Portail WerbSMSI" });
    await E.ecrire(fichierDesc, j);
    return true;
  }

  VUES.verif = () => {
    const v = P.verif;
    let h = `<h1>🔏 Vérification des modules</h1><p class="sub">Compare l'empreinte SHA-256 de chaque livrable publié à celle enregistrée dans le portail lors de son assemblage.</p>
      <div class="row" style="margin-bottom:12px"><button class="primary" data-act="verifier"${E.disponible ? "" : " disabled"}>Choisir le dossier WerbSMSI…</button></div>`;
    if (!v) return h + `<div class="infobox small">Choisissez le dossier <code>WerbSMSI</code> (celui qui contient <code>registre_modules.json</code>). Il est lu, jamais modifié.</div>`;
    return h + `<div class="card"><p class="small muted">Dossier ${esc(v.dossier)} · vérifié le ${esc(frDate(v.le))}</p><table class="t"><thead><tr><th>Module</th><th>Version</th><th>Livrable</th><th>Résultat</th><th>Empreinte calculée</th></tr></thead><tbody>
      ${v.resultats.map(x => `<tr><td>${esc(x.produit)}</td><td>${esc(x.version)}</td><td class="mono">${esc(x.chemin)}</td><td>${badge(x.etat, x.ok ? "b-ok" : "b-ko")}</td><td class="mono">${esc(x.calcule || "")}</td></tr>`).join("") || `<tr><td colspan="5" class="empty">Aucun module publié.</td></tr>`}
      </tbody></table></div>`;
  };

  // Guide pas à pas : créer la base d'un site et faire apparaître son raccourci. Le tableau des dossiers est déduit du registre.
  function dossiersModules() {
    const lignes = [];
    REG.modules.filter(m => m.manifeste && m.manifeste.donnees && m.etat === "publie").forEach(m => {
      const man = m.manifeste, [emo] = rubStyle(man.rubrique);
      man.portees.forEach(n => lignes.push(`<tr><td>${emo} <b>${esc(man.produit)}</b>${man.portees.length > 1 ? ` <span class="small muted">(${n})</span>` : ""}</td>
        <td class="mono">${n === "site" ? `sites/&lt;CODE&gt;/${esc(man.rubrique)}/` : `groupe/${esc(man.rubrique)}/`}</td><td class="mono">${esc(man.donnees.extension)}</td>
        <td>${n === "site" ? "📍 CODE" : "🏢 Groupe"}${man.ouvertureParLien ? "" : ` <span class="small muted">(copie le chemin)</span>`}</td></tr>`));
    });
    return lignes.join("");
  }
  const etape = (n, emoji, texte, teinte, corps) => `<div class="card etape">${titre(emoji, `${n ? `Étape ${n} – ` : ""}${texte}`, teinte)}${corps}</div>`;
  VUES.aide = () => `<h1>❓ Aide – créer la base d'un site et son raccourci</h1>
    <p class="sub">Exemple : WerbExploitation sur le site LYON. Pour les autres modules, seuls le dossier et la fin du nom de fichier changent.</p>
    <div class="card">${titre("🧭", "Ce que le portail repère", "bleu")}
      <p>Le portail affiche une puce pour un fichier rangé <b>directement</b> dans le dossier du module (pas dans un sous-dossier) et dont le nom se termine par <b>l'extension du module</b>. Chemins à partir du dossier de l'espace <code>SMSI_&lt;SIGLE&gt;</code> :</p>
      <div class="tablewrap"><table class="t"><thead><tr><th>Module</th><th>Dossier de la base</th><th>Fin du nom de fichier</th><th>Puce</th></tr></thead><tbody>${dossiersModules()}</tbody></table></div>
      <div class="legende-puces"><span class="chip">📍 LYON</span> base déclarée, un clic l'ouvre · <span class="chip nondecl">📍 LYON</span> présente mais non déclarée (déjà cliquable) ·
      <span class="chip vide">📍 NANTES</span> aucune base · <span class="chip ferme">🔒 PARIS</span> dossier du site inaccessible</div></div>
    ${etape(0, "🏗️", "Prérequis : l'espace et le site existent", "violet", `<ol>
      <li>Ouvrir <code>portail\\WerbSMSI.html</code> dans <b>Microsoft Edge</b>.</li>
      <li>Pas encore d'espace : <b>🛠️ Outils › Mise en place › 🏗️ Créer un espace</b>, remplir l'organisation, le sigle et les sites, puis <b>Choisir le dossier parent et créer</b>.</li>
      <li>Espace existant sans le site : <b>Ouvrir l'espace…</b>, puis <b>Mise en place › 📍 Ajouter un site</b>, code et nom, <b>Créer sites/CODE/</b>.</li>
      <li>Le site apparaît dans <b>📍 Sites</b> du menu, sans 🔒. Un 🔒 indique un dossier absent ou des droits insuffisants sur le drive.</li></ol>
      <p><button data-act="assistant" data-k="espace">🏗️ Ouvrir la mise en place</button></p>`)}
    ${etape(1, "📝", "Créer la base dans le module", "bleu", `<ol>
      <li>Sur la carte <b>WerbExploitation</b>, cliquer <b>Ouvrir</b> : le module s'ouvre dans un nouvel onglet.</li>
      <li>Saisir votre nom, puis <b>✨ Nouvelle base</b>. Le module affiche <b>Intégration WerbSMSI</b>.</li>
      <li><b>Choisir l'espace…</b> : dans la fenêtre de Windows, aller jusqu'au dossier <code>SMSI_&lt;SIGLE&gt;</code> et cliquer « Sélectionner un dossier ».</li>
      <li>Choisir le site <b>LYON</b>, puis <b>Rattacher</b> : la base est liée au site et l'inventaire WerbMap publié est chargé.</li></ol>
      <div class="infobox small"><b>WerbMap</b> : sur l'écran d'accès, <b>➕ Créer une nouvelle base…</b> demande tout de suite l'emplacement (étape 2), puis le compte administrateur ; rattacher ensuite dans <b>Administration › Intégration WerbSMSI</b>.<br>
      <b>WerbIEC62443</b> : <b>Nouveau projet</b>, puis <b>Intégration WerbSMSI</b>. · <b>WerbGouvernance</b> : <b>Nouvelle base</b>, puis rattachement au <b>groupe</b>.</div>`)}
    ${etape(2, "💾", "Enregistrer au bon endroit", "ambre", `<ol>
      <li><b>Enregistrer</b> (Ctrl+S) : le sélecteur d'Edge s'ouvre.</li>
      <li>Aller dans <code>SMSI_&lt;SIGLE&gt;\\sites\\LYON\\exploitation\\</code>.</li>
      <li>Garder le nom proposé <code>Exploitation_LYON.werbexploitation.json</code>. Pour le renommer, garder la fin <code>.werbexploitation.json</code>.</li>
      <li>Valider : les enregistrements suivants écrivent au même endroit, sans sélecteur.</li></ol>
      <div class="warnbox small">Sous Firefox, l'enregistrement télécharge le fichier : le déplacer à la main dans ce dossier.</div>`)}
    ${etape(3, "📍", "Faire apparaître la puce dans le portail", "vert", `<ol>
      <li>Revenir au portail et cliquer <b>Actualiser</b> (en haut à droite) : le portail ne relit l'espace qu'à l'ouverture ou sur ce bouton.</li>
      <li>Sous la carte <b>WerbExploitation</b> (rubrique ou vue groupe › 📍 Bases par module et par site), la puce <span class="chip nondecl">📍 LYON</span> apparaît : base présente, pas encore déclarée.</li>
      <li>Menu <b>📍 Sites › LYON</b>, carte <b>🗂️ Bases du site</b>, ligne « non déclarée » : <b>Déclarer</b>, saisir un libellé, valider.</li>
      <li>La puce passe au vert <span class="chip">📍 LYON</span> : la base est inscrite dans <code>sites/LYON/werbsmsi.site.json</code>.</li></ol>`)}
    ${etape(4, "🚀", "Utiliser le raccourci", "cyan", `<ol>
      <li>Cliquer la puce <span class="chip">📍 LYON</span> : le module s'ouvre dans un nouvel onglet.</li>
      <li>Saisir votre nom ; l'encadré « Base demandée par le portail » propose <b>📂 Ouvrir cette base</b>.</li>
      <li>Avec l'option <b>🔗 Raccourcis</b> du portail (cochée par défaut, en haut à droite), le module reçoit le dossier de l'espace : la base s'ouvre directement ; Edge peut demander d'<b>autoriser</b> l'accès.</li>
      <li>Sans raccourci (portail fermé, option décochée ou refus d'Edge), la fenêtre de Windows demande un <b>dossier</b> : choisir celui de l'espace (<code>SMSI_&lt;SIGLE&gt;</code>), du site (<code>LYON</code>) ou du module (<code>exploitation</code>), puis « Sélectionner un dossier ». Inutile d'aller jusqu'au fichier : la base est trouvée et s'ouvre, puis s'enregistre à sa place.</li>
      <li>Astuce : épinglez le dossier de l'espace dans <b>Accès rapide</b> de l'Explorateur Windows (clic droit › Épingler) ; il sera à un clic dans cette fenêtre.</li></ol>`)}
    ${etape(0, "🩺", "Si la puce n'apparaît pas", "rouge", `<div class="tablewrap"><table class="t"><thead><tr><th>Symptôme</th><th>Cause probable</th></tr></thead><tbody>
      <tr><td>Puce grisée</td><td>Fichier dans un autre dossier ou un sous-dossier (<code>exploitation\\2026\\</code>), ou extension modifiée</td></tr>
      <tr><td>Puce absente après l'enregistrement</td><td>Portail non actualisé (<b>Actualiser</b>)</td></tr>
      <tr><td>🔒 sur le site</td><td>Dossier du site absent ou droits insuffisants sur le drive</td></tr>
      <tr><td>« … pas celui de la base demandée »</td><td>Un autre espace a été choisi dans le sélecteur : choisir l'espace d'origine</td></tr>
      <tr><td>« Le dossier … ne mène pas à … »</td><td>Dossier choisi hors du chemin de la base (autre site, sous-dossier du fichier) : choisir l'espace, le site ou le dossier du module</td></tr>
      <tr><td>Erreur de <code>werb_charte.py espace</code> sur la base</td><td>Base non rattachée au site dans le module (étape 1, point 4)</td></tr></tbody></table></div>`)}
    ${etape(0, "🔐", "Bon à savoir", "ardoise", `<ul>
      <li>Aucune donnée n'est conservée dans le navigateur. Seule exception, l'option <b>🔗 Raccourcis</b> : le portail y range la <b>référence</b> au dossier de l'espace (pas son contenu) pour les modules ouverts depuis ses puces ; elle est effacée à la fermeture du portail, de l'espace, ou en décochant l'option.</li>
      <li>La sécurité est celle du drive : appliquer les droits décrits dans <code>DROITS.md</code> à la racine de l'espace.</li>
      <li>Le portail n'écrit que sur action explicite : création d'un espace ou d'un site, déclaration d'une base. Il ne modifie jamais une base.</li></ul>`)}`;

  VUES.apropos = () => `<h1>ℹ️ À propos</h1><p class="sub">${esc(WERB.description)}</p><div class="card"><table class="t"><tbody>
    <tr><td class="muted" style="width:220px">Produit</td><td><strong>${esc(WERB.produit)}</strong> v${esc(WERB.version)} (build ${esc(window.BUILD_DATE)})</td></tr>
    <tr><td class="muted">Auteur</td><td>${esc(WERB.signature)}</td></tr>
    <tr><td class="muted">Charte</td><td>${esc(WERB.charte)} · socle ${esc(WerbSocle.VERSION)}</td></tr>
    <tr><td class="muted">Registre intégré</td><td>${REG.modules.length} module(s), assemblé en ${esc(REG.assembleLe)}</td></tr>
    <tr><td class="muted">Fonctionnement</td><td>Hors ligne. Aucune donnée conservée dans le navigateur ; le dossier de l'espace est redemandé à chaque session. Écriture seulement sur action explicite : création d'un espace ou d'un site, déclaration d'une base.</td></tr>
  </tbody></table></div><div class="infobox small">Intégrité : comparez l'empreinte de <code>WerbSMSI.html</code> à celle publiée dans <code>portail/WerbSMSI.sha256</code>.<br>Sous Windows, sans droits administrateur : <code>Get-FileHash .\\WerbSMSI.html</code></div>`;

  /* ===================================================== rendu */
  function renderTopbar() {
    $("#tb-espace").textContent = E.ouvert ? `${P.groupe ? P.groupe.organisation : ""} — dossier ${E.nom}` : "Aucun espace ouvert";
    const titre = P.raccourcis ? (P.raccourciOk === false ? "Edge a refusé de mémoriser le dossier : les modules demanderont le dossier." : "Le dossier de l'espace est confié aux modules ouverts depuis les puces : pas de navigation dans l'Explorateur. Effacé à la fermeture du portail.")
      : "Désactivé : chaque module ouvert depuis une puce demandera le dossier de l'espace.";
    $("#tb-actions").innerHTML = E.ouvert ? `<label class="tb-opt" title="${esc(titre)}"><input type="checkbox" id="optRaccourcis"${P.raccourcis ? " checked" : ""}> 🔗 Raccourcis${P.raccourcis && P.raccourciOk === false ? " ⚠" : ""}</label>
      ${boutonSauvegarde()}<button data-act="actualiser">Actualiser</button><button data-act="fermer">Fermer l'espace</button>` : "";
  }
  // Bouton du bandeau : même sauvegarde que ⚙️ Administration › Sauvegarde et restauration, mis en évidence pour qu'elle ne soit pas oubliée.
  // Avant toute sauvegarde de la session, il est en couleur ; ensuite il rappelle l'heure de la dernière archive créée.
  function boutonSauvegarde() {
    const d = SV.derniere, h = d ? new Date(d.le).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "";
    return `<button class="tb-sauv${d ? " fait" : ""}" data-act="sauvegarderBandeau"${SV.travail ? " disabled" : ""} title="${d ? `Dernière sauvegarde de la session à ${h} (${esc(libellePerimetre(d.perimetre))}). Cliquer pour en créer une nouvelle.` : "Aucune sauvegarde de l'espace pendant cette session : créer une archive (Administration › Sauvegarde et restauration)."}">${SV.travail ? "💾 Sauvegarde en cours…" : d ? `💾 Sauvegardé à ${h}` : "💾 Sauvegarder l'espace"}</button>`;
  }
  // Raccourci d'espace (charte §5.5) : mémorisé pour les modules tant que le portail est ouvert, si l'option est active
  async function majRaccourci() {
    if (E.ouvert && P.raccourcis) P.raccourciOk = await E.memoriser();
    else { await E.oublier(); P.raccourciOk = null; }
  }
  // Menu latéral commun (socle) : catégories à emoji sur fond de couleur ; le contenu suit l'espace ouvert
  const MENU = [];
  const menu = WerbSocle.menu($("#sidebar"), MENU, { surNav: id => {
    if (id.startsWith("site:")) { P.vue = "site"; P.site = id.slice(5); } else P.vue = id;
    render(); $("#main").scrollTop = 0;
  } });
  function renderNav() {
    const sites = P.groupe ? P.groupe.sites || [] : [];
    MENU.splice(0, MENU.length, { g: "accueil", i: "🏠", l: "Accueil", c: "bleu", t: [["accueil", "Rubriques et modules"]] },
      ...(P.groupe ? [{ g: "groupe", i: "🏢", l: "Groupe", c: "violet", t: [["groupe", P.groupe.sigle || "Vue groupe"]] },
        { g: "sites", i: "📍", l: "Sites", c: "vert", t: sites.map(s => ["site:" + s.code, s.code]) }] : []),
      { g: "outils", i: "🛠️", l: "Outils", c: "orange", t: [["assistant", "Mise en place"], ["verif", "Vérifier les modules"]] },
      { g: "admin", i: "⚙️", l: "Administration", c: "ardoise", t: [["sauvegarde", "Sauvegarde et restauration"], ["listes", "Listes de choix du groupe"], ["parametres", "Paramètres"]] },
      { g: "aide", i: "❓", l: "Aide", c: "olive", t: [...WerbGuides.entrees(), ...((window.WERB_MEDIAS || {}).infographie_demarrer ? [["infographie", "Infographie : démarrer"]] : []), ["aide", "Créer la base d'un site"], ["apropos", "À propos"]] });
    const cnt = Object.fromEntries(sites.filter(s => !(P.sites[s.code] || {}).accessible).map(s => ["site:" + s.code, "🔒"]));
    menu.rendre({ actif: P.vue === "site" ? "site:" + P.site : P.vue, compteurs: cnt,
      pied: `<footer class="sig"><strong>${esc(WERB.produit)}</strong><br>${esc(WERB.signature)}<br>v${esc(WERB.version)} · ${esc(window.BUILD_DATE)}</footer>` });
  }
  function render() {
    renderTopbar(); renderNav();
    const m = $("#main");
    if (P.chargement) { m.innerHTML = `<p class="muted">Lecture de l'espace…</p>`; return; }
    const vue = (P.vue === "groupe" || P.vue === "site") && !P.groupe ? "accueil" : P.vue;
    m.innerHTML = VUES[vue]();
    if (vue === "accueil") setTimeout(proposerDemo, 0);   // invitation à ouvrir l'espace de démonstration
  }

  /* ===================================================== actions */

  /* ===================================================== sauvegarde et restauration de l'espace (⚙️ Administration) */
  // Archive .zip : les fichiers de l'espace octet pour octet, et le manifeste werbsmsi.sauvegarde.json (chemins, tailles, dates,
  // empreintes SHA-256, versions des modules, date et auteur). Écrite dans le fichier choisi par l'utilisateur et relue depuis le
  // fichier qu'il choisit : rien n'est conservé dans le navigateur (charte §1). Restauration : fichier par fichier, jamais sur une
  // base verrouillée (§5.7), seulement dans l'espace d'origine (même groupeId), après contrôle des empreintes de l'archive.
  const MANIFESTE = "werbsmsi.sauvegarde.json";
  const SV = { perimetre: "complet", auteur: "", derniere: null, archive: null, restauration: null, travail: false };
  const TYPES_ZIP = [{ description: "Sauvegarde WerbSMSI", accept: { "application/zip": [".zip"] } }];
  const enOctets = s => new TextEncoder().encode(s);
  const enTexte = u => new TextDecoder().decode(u);
  const taille = n => n >= 1048576 ? `${(n / 1048576).toFixed(1)} Mo` : n >= 1024 ? `${Math.round(n / 1024)} Ko` : `${n} o`;
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = u => { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = CRC[(c ^ u[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const flux = (u, t) => new Response(new Blob([u]).stream().pipeThrough(t)).arrayBuffer().then(b => new Uint8Array(b));
  const heureDos = ms => { const d = new Date(ms || Date.now()); return [(d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), Math.max(0, d.getFullYear() - 1980) << 9 | (d.getMonth() + 1) << 5 | d.getDate()]; };

  // Archive zip (noms UTF-8, compression deflate si le navigateur la fournit et qu'elle réduit le fichier) : [{ chemin, data, modifie }]
  async function zipper(entrees) {
    const parts = [], central = []; let pos = 0;
    for (const e of entrees) {
      const nom = enOctets(e.chemin), crc = crc32(e.data);
      let data = e.data, meth = 0;
      if (typeof CompressionStream === "function" && e.data.length > 64) {
        try { const z = await flux(e.data, new CompressionStream("deflate-raw")); if (z.length < e.data.length) { data = z; meth = 8; } } catch (x) { /* sans compression */ }
      }
      const [heure, jour] = heureDos(e.modifie);
      const l = new DataView(new ArrayBuffer(30));
      l.setUint32(0, 0x04034b50, true); l.setUint16(4, 20, true); l.setUint16(6, 0x0800, true); l.setUint16(8, meth, true); l.setUint16(10, heure, true); l.setUint16(12, jour, true);
      l.setUint32(14, crc, true); l.setUint32(18, data.length, true); l.setUint32(22, e.data.length, true); l.setUint16(26, nom.length, true);
      parts.push(l.buffer, nom, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, meth, true); c.setUint16(12, heure, true); c.setUint16(14, jour, true);
      c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, e.data.length, true); c.setUint16(28, nom.length, true); c.setUint32(42, pos, true);
      central.push(c.buffer, nom);
      pos += 30 + nom.length + data.length;
    }
    const tc = central.reduce((s, x) => s + (x.byteLength ?? x.length), 0), f = new DataView(new ArrayBuffer(22));
    f.setUint32(0, 0x06054b50, true); f.setUint16(8, entrees.length, true); f.setUint16(10, entrees.length, true); f.setUint32(12, tc, true); f.setUint32(16, pos, true);
    return new Blob([...parts, ...central, f.buffer], { type: "application/zip" });
  }
  // Lecture d'une archive zip : { noms, contient(nom), donnees(nom) → Uint8Array } (méthodes 0 et 8, contrôle CRC)
  function dezipper(buf) {
    const dv = new DataView(buf); let e = buf.byteLength - 22;
    while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error("Ce fichier n'est pas une archive .zip.");
    const n = dv.getUint16(e + 10, true), table = new Map(); let o = dv.getUint32(e + 16, true);
    for (let i = 0; i < n; i++) {
      if (dv.getUint32(o, true) !== 0x02014b50) throw new Error("Archive endommagée (répertoire central).");
      const nl = dv.getUint16(o + 28, true), xl = dv.getUint16(o + 30, true), cl = dv.getUint16(o + 32, true);
      table.set(enTexte(new Uint8Array(buf, o + 46, nl)), { meth: dv.getUint16(o + 10, true), crc: dv.getUint32(o + 16, true), csz: dv.getUint32(o + 20, true), usz: dv.getUint32(o + 24, true), lo: dv.getUint32(o + 42, true) });
      o += 46 + nl + xl + cl;
    }
    return {
      noms: [...table.keys()], contient: nom => table.has(nom),
      async donnees(nom) {
        const f = table.get(nom); if (!f) return null;
        const brut = new Uint8Array(buf, f.lo + 30 + dv.getUint16(f.lo + 26, true) + dv.getUint16(f.lo + 28, true), f.csz);
        const u = f.meth === 0 ? brut.slice() : f.meth === 8 ? await flux(brut, new DecompressionStream("deflate-raw")) : null;
        if (!u) throw new Error(`${nom} : méthode de compression non prise en charge.`);
        if (u.length !== f.usz || crc32(u) !== f.crc) throw new Error(`${nom} : contenu endommagé dans l'archive.`);
        return u;
      },
    };
  }

  // Fichiers d'un périmètre : « complet », « groupe » (tout sauf sites/) ou « site:CODE » (sites/CODE). Dossiers non lisibles notés.
  async function collecter(perimetre) {
    const fichiers = [], illisibles = [];
    async function parcourir(chemin) {
      const l = await E.lister(chemin);
      if (l === null) { illisibles.push(chemin || "."); return; }
      for (const x of l) {
        const c = chemin ? `${chemin}/${x.nom}` : x.nom;
        if (x.type === "directory") await parcourir(c); else fichiers.push({ chemin: c, taille: x.taille, modifie: x.modifie });
      }
    }
    if (perimetre === "complet") await parcourir("");
    else if (perimetre === "groupe") {
      for (const x of (await E.lister("")) || []) {
        if (x.type === "file") fichiers.push({ chemin: x.nom, taille: x.taille, modifie: x.modifie });
        else if (x.nom !== "sites") await parcourir(x.nom);
      }
    } else await parcourir(`sites/${perimetre.slice(5)}`);
    return { fichiers, illisibles };
  }
  const libellePerimetre = p => p === "complet" ? "espace complet" : p === "groupe" ? "groupe seulement" : `site ${p.slice(5)}`;
  const versionsModules = () => REG.modules.filter(m => m.manifeste).map(m => ({ id: m.id, produit: m.manifeste.produit, version: m.manifeste.version }));

  // Écrit l'archive : sélecteur d'Edge (écriture directe dans le fichier choisi), téléchargement à défaut
  async function ecrireArchive(nom, entrees, manifeste) {
    let poignee = null;
    if (typeof showSaveFilePicker === "function") poignee = await showSaveFilePicker({ suggestedName: nom, types: TYPES_ZIP });   // AbortError si annulé
    const blob = await zipper([{ chemin: MANIFESTE, data: enOctets(JSON.stringify(manifeste, null, 1)), modifie: Date.now() }, ...entrees]);
    if (poignee) { const w = await poignee.createWritable(); await w.write(blob); await w.close(); } else WerbSocle.telecharger(blob, nom);
    return { nom: poignee ? poignee.name : nom, taille: blob.size };
  }
  function manifesteDe(perimetre, auteur, fichiers, illisibles, motif = "") {
    const g = P.groupe, jour = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
    return { format: "WERBSMSI-SAUVEGARDE", schema: 1, famille: WerbSocle.FAMILLE,
      meta: { produit: WERB.produit, appVersion: WERB.version, auteur: WERB.auteur, generateur: WERB.ligne, creeLe: jour, creePar: auteur,
        groupeId: g.groupeId, organisation: g.organisation, sigle: g.sigle || "", espace: E.nom,
        perimetre: perimetre.startsWith("site:") ? { type: "site", site: perimetre.slice(5) } : { type: perimetre }, ...(motif ? { motif } : {}) },
      data: { fichiers: fichiers.map(f => ({ chemin: f.chemin, taille: f.taille, modifie: new Date(f.modifie).toISOString(), sha256: f.sha256 })), illisibles, modules: versionsModules() } };
  }
  // Lit les fichiers et calcule leurs empreintes : [{ chemin, data, modifie }] ; un fichier devenu illisible est ajouté à « illisibles »
  async function lireFichiers(fichiers, illisibles) {
    const entrees = [];
    for (const f of fichiers) {
      const file = await E.fichier(f.chemin);
      if (!file) { illisibles.push(f.chemin); continue; }
      const data = new Uint8Array(await file.arrayBuffer());
      Object.assign(f, { taille: data.length, modifie: file.lastModified, sha256: await WerbSocle.sha256(data) });
      entrees.push({ chemin: f.chemin, data, modifie: file.lastModified });
    }
    return entrees;
  }

  // État d'un fichier de l'archive par rapport à l'espace ouvert : identique, différent ou absent ; verrou valable d'une base
  async function comparer(f) {
    const file = await E.fichier(f.chemin);
    if (!file) return { etat: "absent", libelle: "absent de l'espace" };
    const data = new Uint8Array(await file.arrayBuffer()), sha = await WerbSocle.sha256(data);
    let verrou = null, meta = null;
    if (f.chemin.endsWith(".json")) { try { const j = JSON.parse(enTexte(data)); verrou = WerbSocle.verrou.actif(j.verrou) ? j.verrou : null; meta = j.meta || null; } catch (e) { /* pas du JSON */ } }
    return sha === f.sha256 ? { etat: "identique", libelle: "identique", verrou }
      : { etat: "different", libelle: `différent : modifié le ${frDate(file.lastModified)}${meta && meta.modifiePar ? ` par ${meta.modifiePar}` : ""}`, verrou, taille: data.length };
  }
  async function analyserArchive(nom, buf) {
    const z = dezipper(buf);
    if (!z.contient(MANIFESTE)) throw new Error(`${nom} n'est pas une sauvegarde WerbSMSI (manifeste ${MANIFESTE} absent).`);
    let m; try { m = JSON.parse(enTexte(await z.donnees(MANIFESTE))); } catch (e) { throw new Error("Manifeste illisible : " + e.message); }
    if (!m || m.format !== "WERBSMSI-SAUVEGARDE" || !m.data || !Array.isArray(m.data.fichiers)) throw new Error("Manifeste de sauvegarde invalide.");
    if (m.schema > 1) throw new Error("Sauvegarde créée par une version plus récente du portail.");
    const fichiers = [];
    for (const f of m.data.fichiers) {
      const r = { ...f, ok: false, etat: "" };
      if (!z.contient(f.chemin)) r.etat = "absent de l'archive";
      else {
        try { r.data = await z.donnees(f.chemin); const sha = await WerbSocle.sha256(r.data); r.ok = sha === f.sha256; r.etat = r.ok ? "conforme" : "EMPREINTE DIFFÉRENTE"; }
        catch (e) { r.etat = e.message; }
      }
      fichiers.push(r);
    }
    const connus = new Set([MANIFESTE, ...m.data.fichiers.map(f => f.chemin)]);
    const archive = { nom, manifeste: m, fichiers, horsManifeste: z.noms.filter(x => !connus.has(x) && !x.endsWith("/")), le: Date.now() };
    archive.integre = fichiers.every(f => f.ok) && !archive.horsManifeste.length;
    archive.memeEspace = !!(E.ouvert && P.groupe && m.meta && m.meta.groupeId === P.groupe.groupeId);
    if (archive.memeEspace) for (const f of fichiers) if (f.ok) f.espace = await comparer(f);
    return archive;
  }
  // Écriture des octets d'origine : l'API d'espace n'écrit que du JSON mis en forme ; le fichier est créé s'il manque, puis écrit par sa poignée
  async function ecrireBrut(chemin, data) {
    let p;
    try { p = (await E.ouvrirFichier(chemin)).poignee; }
    catch (e) { await E.ecrire(chemin, null); p = (await E.ouvrirFichier(chemin)).poignee; }
    const w = await p.createWritable(); await w.write(data); await w.close();
  }

  /* ===================================================== paramètres (⚙️ Administration) */
  // Brouillon des modules masqués : rien n'est écrit avant « Enregistrer » (le portail n'écrit que sur action explicite)
  const PA = { brouillon: null };
  const brouillonMasques = () => PA.brouillon || (PA.brouillon = masques());
  VUES.parametres = () => {
    let h = `<h1>⚙️ Paramètres</h1><p class="sub">Réglages du portail communs à toute l'organisation, enregistrés dans l'espace (<code>werbsmsi.groupe.json</code>).</p>`;
    if (!E.ouvert) return h + `<div class="card"><p class="muted">Ouvrez d'abord l'espace du groupe (accueil, <b>Ouvrir l'espace…</b>) : les paramètres y sont enregistrés. Sans espace, tous les modules sont affichés.</p></div>`;
    const b = brouillonMasques(), enreg = masques(), change = [...b].sort().join() !== [...enreg].sort().join();
    const basesDe = id => [...(P.basesGroupe || []), ...Object.values(P.sites).flatMap(s => s.bases || [])].filter(x => x.module === id && (x.declaree || x.present)).length;
    h += `<div class="card" data-param-modules>${titre("🧩", "Modules affichés sur le portail", "ardoise")}
      <p class="small muted">Décochez les modules que l'organisation n'utilise pas : ils disparaissent des pages Accueil, Groupe et Site (une étape dont tous les modules sont masqués est retirée). Un module masqué reste installé : ses bases restent listées dans « Bases du site », la vérification des modules et la sauvegarde l'incluent toujours. Par défaut, tout est affiché.</p>
      <div class="tablewrap"><table class="t"><thead><tr><th style="width:90px">Afficher</th><th>Module</th><th>Étape du parcours</th><th>Niveaux</th><th>Bases déclarées</th></tr></thead><tbody>
      ${etapesAffichees().flatMap(r => modulesEtape(r).map(m => { const n = basesDe(m.id), man = m.manifeste;
        return `<tr data-pmod="${esc(m.id)}"><td class="c"><input type="checkbox" class="pmod" data-id="${esc(m.id)}"${b.has(m.id) ? "" : " checked"} style="width:auto" aria-label="Afficher ${esc(man ? man.produit : m.id)}"></td>
          <td><b>${esc(man ? man.produit : libelleModule(m.id))}</b>${man ? ` <span class="small muted">v${esc(man.version)}</span>` : ""}</td><td class="small">${r.id ? `${r.ordre}. ` : ""}${esc(r.libelle)}</td>
          <td class="small">${esc(man ? (man.portees || []).join(" + ") : "")}</td><td>${n ? (b.has(m.id) ? badge(`${n} base(s) : masqué malgré tout`, "b-warn") : `${n}`) : `<span class="muted">—</span>`}</td></tr>`; })).join("")}
      </tbody></table></div>
      <div class="row" style="margin-top:10px"><button class="primary" data-act="paramEnregistrer"${change ? "" : " disabled"}>💾 Enregistrer les paramètres</button>
        <button data-act="paramTout"${b.size ? "" : " disabled"}>Tout afficher</button>${change ? `<button data-act="paramAnnuler">Annuler les changements</button><span class="small" style="color:var(--warn)">● Changements non enregistrés</span>` : ""}
        <span class="small muted">${enreg.size ? `${enreg.size} module(s) masqué(s) actuellement.` : "Tous les modules sont affichés."}</span></div></div>`;
    return h;
  };
  const ACTIONS_PARAMETRES = {
    paramTout() { PA.brouillon = new Set(); render(); },
    paramAnnuler() { PA.brouillon = null; render(); },
    async paramEnregistrer() {
      const b = brouillonMasques();
      try {
        const g = await E.lire("werbsmsi.groupe.json");
        if (!g || g.format !== "WERBSMSI-GROUPE" || !g.data) throw new Error("werbsmsi.groupe.json illisible.");
        g.data.parametres = Object.assign({}, g.data.parametres, { modulesMasques: [...b].sort() });
        Object.assign(g.meta || (g.meta = {}), { modifieLe: maintenant(), modifiePar: "Portail WerbSMSI" });
        await E.ecrire("werbsmsi.groupe.json", g);
        P.groupe = await E.relire(); PA.brouillon = null; render();
        toast(`Paramètres enregistrés : ${b.size ? `${b.size} module(s) masqué(s)` : "tous les modules affichés"}.`, "ok");
      } catch (e) { toast("Enregistrement impossible (droits d'écriture sur werbsmsi.groupe.json, réservés à l'équipe du groupe) : " + e.message, "err"); }
    },
  };

  VUES.sauvegarde = () => {
    const sites = P.groupe ? (P.groupe.sites || []).filter(s => (P.sites[s.code] || {}).accessible) : [];
    let h = `<h1>💾 Sauvegarde et restauration</h1><p class="sub">Archive de l'espace (bases, publications, modèles) avec un manifeste d'empreintes, vérification d'une archive et restauration fichier par fichier.</p>`;
    h += `<div class="card">${titre("📦", "Créer une sauvegarde", "ardoise")}`;
    if (!E.ouvert) h += `<p class="small muted">Ouvrez d'abord l'espace du groupe (accueil, <b>Ouvrir l'espace…</b>).</p>`;
    else {
      const d = SV.derniere;
      h += `<div class="grid g2"><label class="f">Périmètre<select id="svPerim">${[["complet", "Espace complet (groupe et sites)"], ["groupe", "Groupe seulement (sans les sites)"], ...sites.map(s => [`site:${s.code}`, `Site ${s.code} – ${s.nom}`])]
          .map(([v, l]) => `<option value="${esc(v)}"${v === SV.perimetre ? " selected" : ""}>${esc(l)}</option>`).join("")}</select></label>
        <label class="f">Réalisée par<input id="svAuteur" value="${esc(SV.auteur)}" placeholder="Prénom NOM"></label></div>
        <p class="small muted">L'archive contient les fichiers tels qu'ils sont sur le drive et le manifeste <code>${MANIFESTE}</code> : chemin, taille, date et empreinte SHA-256 de chaque fichier, versions des modules, date et auteur. Seuls les dossiers que vos droits permettent de lire sont sauvegardés : une sauvegarde de site respecte le cloisonnement entre sites.</p>
        <div class="row"><button class="primary" data-act="sauvegarder"${SV.travail ? " disabled" : ""}>💾 Créer l'archive…</button></div>
        ${d ? `<div class="infobox small" style="margin-top:10px">Dernière sauvegarde : <b>${esc(d.nom)}</b> · ${esc(libellePerimetre(d.perimetre))} · ${d.n} fichier(s), ${esc(taille(d.taille))} · ${esc(frDate(d.le))}${d.illisibles.length ? `<br>⚠ Non lisibles, donc non sauvegardés : ${esc(d.illisibles.join(", "))}` : ""}</div>` : ""}`;
    }
    h += `</div><div class="card">${titre("🔎", "Vérifier ou restaurer une archive", "ardoise")}
      <p class="small muted">L'archive est lue en mémoire ; chaque empreinte est recalculée et comparée au manifeste. Rien n'est écrit sans votre choix.</p>
      <div class="row"><button data-act="ouvrirSauvegarde"${SV.travail ? " disabled" : ""}>📂 Choisir une archive…</button></div>`;
    const a = SV.archive;
    if (a) {
      const m = a.manifeste.meta || {}, ko = a.fichiers.filter(f => !f.ok);
      h += `<table class="t" style="margin-top:10px"><tbody>
        <tr><td class="muted" style="width:200px">Archive</td><td><b>${esc(a.nom)}</b></td></tr>
        <tr><td class="muted">Organisation</td><td>${esc(m.organisation || "")}${m.sigle ? ` (${esc(m.sigle)})` : ""} · dossier ${esc(m.espace || "")}</td></tr>
        <tr><td class="muted">Périmètre</td><td>${esc(m.perimetre ? (m.perimetre.type === "site" ? "site " + m.perimetre.site : libellePerimetre(m.perimetre.type)) : "")}${m.motif ? ` · ${esc(m.motif)}` : ""}</td></tr>
        <tr><td class="muted">Créée</td><td>le ${esc(frDate(m.creeLe))} par ${esc(m.creePar || "")} · portail ${esc(m.appVersion || "")}</td></tr>
        <tr><td class="muted">Modules</td><td class="small">${esc((a.manifeste.data.modules || []).map(x => `${x.produit} ${x.version}`).join(" · "))}</td></tr>
        <tr><td class="muted">Intégrité</td><td>${a.integre ? badge(`${a.fichiers.length} fichier(s) conformes au manifeste`, "b-ok") : badge(`${ko.length} fichier(s) non conformes${a.horsManifeste.length ? `, ${a.horsManifeste.length} hors manifeste` : ""}`, "b-ko")}</td></tr>
      </tbody></table>`;
      if (ko.length || a.horsManifeste.length) h += `<div class="warnbox">${ko.map(f => `${esc(f.chemin)} : ${esc(f.etat)}`).join("<br>")}${a.horsManifeste.map(x => `<br>${esc(x)} : hors manifeste`).join("")}</div>`;
      if (!E.ouvert) h += `<p class="small muted">Ouvrez l'espace pour comparer l'archive et restaurer des fichiers.</p>`;
      else if (!a.memeEspace) h += `<div class="warnbox">Cette archive provient d'un autre espace (${esc(m.organisation || m.groupeId || "inconnu")}) : la restauration n'est possible que dans l'espace d'origine.</div>`;
      else {
        const etat = f => !f.ok ? badge("non conforme", "b-ko") : f.espace.etat === "identique" ? badge("identique", "b-ok") : f.espace.etat === "absent" ? badge("absent de l'espace", "b-warn") : badge(f.espace.libelle, "b-warn");
        h += `<h3>Restaurer</h3><p class="small muted">Cochez les fichiers à remettre dans l'état de l'archive. Les fichiers identiques sont décochés ; une base ouverte par un utilisateur (🔒) ne peut pas être restaurée.</p>
          <div class="row small" style="margin-bottom:6px"><button class="small" data-act="svCocher" data-v="diff">Cocher les différences</button><button class="small" data-act="svCocher" data-v="rien">Tout décocher</button></div>
          <div class="tablewrap"><table class="t"><thead><tr><th></th><th>Fichier</th><th>Dans l'archive</th><th>Dans l'espace</th><th>Verrou</th></tr></thead><tbody>
          ${a.fichiers.map((f, i) => { const v = f.ok && f.espace.verrou, possible = f.ok && !v;
            return `<tr><td><input type="checkbox" class="svSel" data-i="${i}"${possible && f.espace.etat !== "identique" ? " checked" : ""}${possible ? "" : " disabled"} style="width:auto"></td>
              <td class="mono">${esc(f.chemin)}</td><td class="small">${esc(taille(f.taille || 0))} · ${esc(frDate(f.modifie))}</td><td>${etat(f)}</td>
              <td class="small">${v ? `🔒 ${esc(v.par)} ${esc(WerbSocle.verrou.quand(v.depuis))}` : ""}</td></tr>`; }).join("")}
          </tbody></table></div>
          <label class="row small" style="margin-top:10px"><input type="checkbox" id="svAvant" checked style="width:auto"> Sauvegarder d'abord les fichiers qui seront remplacés (recommandé)</label>
          <div class="row" style="margin-top:8px"><button class="primary danger" data-act="restaurer"${a.integre && !SV.travail ? "" : " disabled"}>♻️ Restaurer la sélection…</button></div>
          ${a.integre ? "" : `<p class="small muted">Restauration impossible : l'archive n'est pas intègre.</p>`}`;
      }
      const r = SV.restauration;
      if (r) h += `<div class="infobox small" style="margin-top:10px"><b>Restauration du ${esc(frDate(r.le))}</b> : ${r.ok.length} fichier(s) restauré(s)${r.avant ? ` · copie préalable : ${esc(r.avant)}` : ""}${r.refus.length ? `<br>⚠ Non restaurés : ${r.refus.map(x => `${esc(x.chemin)} (${esc(x.motif)})`).join(", ")}` : ""}</div>`;
    }
    // Repères de la dernière sauvegarde et de la dernière archive lue (attente des tests, sans effet à l'écran)
    return h + `</div><span hidden id="svEtat" data-sauv="${SV.derniere ? SV.derniere.le : 0}" data-archive="${a ? a.le : 0}"></span>`;
  };
  const ACTIONS_SAUVEGARDE = {
    // Bandeau : ouvre la page de sauvegarde ; lance directement l'archive si « Réalisée par » est déjà connu dans la session
    async sauvegarderBandeau() {
      if (!E.ouvert || SV.travail) return;
      P.vue = "sauvegarde"; render(); $("#main").scrollTop = 0;
      if (SV.auteur) { await ACTIONS_SAUVEGARDE.sauvegarder(); return; }
      const a = $("#svAuteur"); if (a) a.focus();
      toast("Indiquez qui réalise la sauvegarde, puis « Créer l'archive ».", "");
    },
    async sauvegarder() {
      const perimetre = $("#svPerim").value, auteur = $("#svAuteur").value.trim();
      Object.assign(SV, { perimetre, auteur });
      if (!auteur) { toast("Indiquez qui réalise la sauvegarde (Réalisée par).", "err"); $("#svAuteur").focus(); return; }
      const nom = `Sauvegarde_${(P.groupe.sigle || "SMSI").replace(/[^\w-]+/g, "_")}_${perimetre === "complet" ? "complet" : perimetre === "groupe" ? "groupe" : perimetre.slice(5)}_${new Date().toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "_")}.zip`;
      SV.travail = true; render();
      try {
        const { fichiers, illisibles } = await collecter(perimetre);
        const entrees = await lireFichiers(fichiers, illisibles);
        const lus = fichiers.filter(f => f.sha256);
        const r = await ecrireArchive(nom, entrees, manifesteDe(perimetre, auteur, lus, illisibles));
        SV.derniere = { ...r, perimetre, n: lus.length, illisibles, le: Date.now() };
        toast(`Sauvegarde créée : ${lus.length} fichier(s).`, "ok");
      } catch (e) { if (e.name !== "AbortError") toast("Sauvegarde impossible : " + e.message, "err"); }
      finally { SV.travail = false; render(); }
    },
    async ouvrirSauvegarde() {
      let f;
      try {
        if (typeof showOpenFilePicker === "function") { const [h] = await showOpenFilePicker({ types: TYPES_ZIP, multiple: false }); f = await h.getFile(); }
        else f = await new Promise((ok, ko) => { const i = Object.assign(document.createElement("input"), { type: "file", accept: ".zip" }); i.onchange = () => i.files[0] ? ok(i.files[0]) : ko(new DOMException("", "AbortError")); i.click(); });
      } catch (e) { if (e.name !== "AbortError") toast(e.message, "err"); return; }
      SV.travail = true; SV.restauration = null; render();
      try { SV.archive = await analyserArchive(f.name, await f.arrayBuffer()); toast(SV.archive.integre ? "Archive vérifiée : intègre." : "Archive non intègre : voir le détail.", SV.archive.integre ? "ok" : "err"); }
      catch (e) { SV.archive = null; toast("Lecture impossible : " + e.message, "err"); }
      finally { SV.travail = false; render(); }
    },
    svCocher(el) { document.querySelectorAll(".svSel:not(:disabled)").forEach(c => { const f = SV.archive.fichiers[+c.dataset.i]; c.checked = el.dataset.v === "diff" && f.espace.etat !== "identique"; }); },
    async restaurer() {
      const a = SV.archive;
      if (!a || !a.integre || !a.memeEspace) return;
      const choisis = [...document.querySelectorAll(".svSel:checked")].map(c => a.fichiers[+c.dataset.i]);
      if (!choisis.length) { toast("Aucun fichier coché.", "err"); return; }
      const avant = $("#svAvant").checked;
      if (!confirm(`Restaurer ${choisis.length} fichier(s) dans l'état de l'archive du ${frDate(a.manifeste.meta.creeLe)} ?\n\nLes versions actuelles seront remplacées${avant ? " (une copie en est d'abord enregistrée)" : ""}.`)) return;
      SV.travail = true; render();
      const res = { ok: [], refus: [], avant: "", le: Date.now() };
      try {
        // Verrou relu juste avant l'écriture : une base ouverte entre-temps n'est pas restaurée
        const aEcrire = [];
        for (const f of choisis) { const c = await comparer(f); if (c.verrou) res.refus.push({ chemin: f.chemin, motif: `ouverte par ${c.verrou.par}` }); else aEcrire.push({ f, c }); }
        const remplaces = aEcrire.filter(x => x.c.etat === "different").map(x => ({ chemin: x.f.chemin }));
        if (avant && remplaces.length) {
          const ill = [], entrees = await lireFichiers(remplaces, ill);
          const r = await ecrireArchive(`Avant_restauration_${(P.groupe.sigle || "SMSI").replace(/[^\w-]+/g, "_")}_${new Date().toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "_")}.zip`, entrees,
            manifesteDe("complet", SV.auteur || "portail", remplaces.filter(x => x.sha256), ill, `copie avant restauration de ${a.nom}`));
          res.avant = r.nom;
        }
        for (const { f } of aEcrire) {
          try { await ecrireBrut(f.chemin, f.data); const file = await E.fichier(f.chemin), sha = file && await WerbSocle.sha256(new Uint8Array(await file.arrayBuffer()));
            if (sha === f.sha256) res.ok.push(f.chemin); else res.refus.push({ chemin: f.chemin, motif: "empreinte différente après écriture" }); }
          catch (e) { res.refus.push({ chemin: f.chemin, motif: e.message }); }
        }
        SV.restauration = res;
        for (const f of a.fichiers) if (f.ok) f.espace = await comparer(f);
        if (res.ok.some(c => /(^|\/)werbsmsi\.(groupe|site)\.json$/.test(c))) await E.relire();
        await chargerEspace();
        toast(`${res.ok.length} fichier(s) restauré(s)${res.refus.length ? `, ${res.refus.length} non restauré(s)` : ""}.`, res.refus.length ? "err" : "ok");
      } catch (e) { if (e.name !== "AbortError") toast("Restauration interrompue : " + e.message, "err"); else toast("Restauration annulée : la copie préalable n'a pas été enregistrée.", "err"); }
      finally { SV.travail = false; render(); }
    },
  };

  const ACTIONS = {
    assistant(el) { F.onglet = el.dataset.k || F.onglet; P.vue = "assistant"; render(); },
    onglet(el) { F.onglet = el.dataset.k; render(); },
    ajouterLigneSite() { F.espace.sites.push({ code: "", nom: "", entite: "", correspondant: "" }); render(); },
    retirerSite(el) { F.espace.sites.splice(+el.dataset.i, 1); if (!F.espace.sites.length) ACTIONS.ajouterLigneSite(); else render(); },
    async creerEspace() {
      if (Object.keys(erreursEspace()).length) { toast("Complétez les champs signalés.", "err"); return; }
      try {
        const r = await creerEspace();
        await chargerEspace(); await majRaccourci(); P.vue = "groupe";
        F.espace = { organisation: "", sigle: "", classification: CLASSIFICATIONS[0], responsable: "", sites: [{ code: "", nom: "", entite: "", correspondant: "" }] };
        toast(`Espace créé : ${r.nom} (${r.sites} site(s)). Appliquez les droits décrits dans DROITS.md.`, "ok");
      } catch (e) { P.chargement = false; if (e.name !== "AbortError") toast("Création impossible : " + e.message, "err"); }
      render();
    },
    async creerSite() {
      if (Object.keys(erreursSite()).length) return;
      try { const code = F.site.code; await creerSite(); await chargerEspace(); F.site = { code: "", nom: "", entite: "", correspondant: "" }; P.vue = "site"; P.site = code; toast(`Site ${code} créé.`, "ok"); }
      catch (e) { P.chargement = false; toast("Création impossible : " + e.message, "err"); }
      render();
    },
    async declarer(el) {
      try { if (await declarer(el.dataset.chemin, el.dataset.module, el.dataset.code)) { await E.relire(); await chargerEspace(); toast("Base déclarée.", "ok"); } }
      catch (e) { P.chargement = false; toast("Déclaration impossible : " + e.message, "err"); }
      render();
    },
    async copierChemin(el) { await copier(el.dataset.chemin, "Chemin copié (relatif au dossier de l'espace)."); },
    async copierCommandes(el) { await copier(el.previousElementSibling.textContent, "Commandes copiées : collez-les dans PowerShell, depuis le dossier WerbSMSI."); },
    demo() { fenetreDemo(); },
    ouvrirDemo() { ouvrirDemo(); },
    async copierDemo() { await copier(cheminDemo(), "Chemin de l'espace de démonstration copié."); },
    demoFermer() { const f = $("#demo-fen"); if (f) f.remove(); },
    demoMasquer() { WerbSocle.preference.ecrire("demoMasquee", true); const f = $("#demo-fen"); if (f) f.remove(); toast("L'espace de démonstration reste accessible par le bouton de l'accueil.", ""); },
    async espace() {
      try { await E.choisir(); await chargerEspace(); await majRaccourci(); P.vue = "groupe"; toast(`Espace « ${P.groupe.organisation} » ouvert.`, "ok"); }
      catch (e) { P.chargement = false; if (e.name !== "AbortError") toast(e.message, "err"); }
      render();
    },
    async actualiser() { try { await chargerEspace(); toast("Espace relu.", "ok"); } catch (e) { toast(e.message, "err"); } render(); },
    async creerDossiers() {   // écriture sur action explicite (charte §5.6) : dossiers de rubrique vides
      const l = P.manquants.slice();
      try { for (const d of l) await E.creerDossier(d); await chargerEspace(); toast(`${l.length} dossier(s) créé(s).`, "ok"); }
      catch (e) { toast("Création impossible (droits d'écriture sur l'espace ?) : " + e.message, "err"); }
      render();
    },
    async fermer() { E.fermer(); await majRaccourci(); Object.assign(P, { vue: "accueil", site: "", groupe: null, pubGroupe: null, sites: {}, basesGroupe: null }); render(); },
    async verifier() {
      let d;
      try { d = await showDirectoryPicker({ mode: "read" }); } catch (e) { if (e.name !== "AbortError") toast(e.message, "err"); return; }
      try { await d.getFileHandle("registre_modules.json"); } catch (e) { toast("Ce dossier n'est pas le dossier WerbSMSI (registre_modules.json absent).", "err"); return; }
      const resultats = [];
      for (const m of REG.modules.filter(x => x.etat === "publie" && x.manifeste)) {
        const chemin = `${m.chemin}/${m.manifeste.entree}`;
        const r = { produit: m.manifeste.produit, version: m.manifeste.version, chemin };
        try {
          let h = d;
          const parts = chemin.split("/"); const nom = parts.pop();
          for (const p of parts) h = await h.getDirectoryHandle(p);
          r.calcule = await WerbSocle.sha256(await (await h.getFileHandle(nom)).getFile());
          r.ok = r.calcule === m.manifeste.empreinte.valeur;
          r.etat = r.ok ? "conforme" : "EMPREINTE DIFFÉRENTE";
        } catch (e) { r.ok = false; r.etat = "livrable introuvable"; }
        resultats.push(r);
      }
      P.verif = { dossier: d.name, le: Date.now(), resultats };
      P.vue = "verif"; render();
      const ko = resultats.filter(x => !x.ok).length;
      toast(ko ? `${ko} module(s) non conforme(s).` : "Tous les modules publiés sont conformes.", ko ? "err" : "ok");
    },
  };

  Object.assign(ACTIONS, ACTIONS_SAUVEGARDE, ACTIONS_PARAMETRES);

  /* ===================================================== listes de choix du groupe (⚙️ Administration, charte §5.9) */
  // Listes métier déclarées par les modules (module.json › listes, intégrés à l'assemblage), avec leurs valeurs publiées ou, à
  // défaut, celles du module. « Publier » écrit l'objet groupe:listes dans publications/werbsmsi.json : une valeur retirée passe
  // dans « retirees », une valeur renommée dans « renommees » (ancien → nouveau) ; les sites conservent une valeur encore
  // employée et se voient proposer les remplacements (socle). Le brouillon reste en mémoire jusqu'à la publication.
  const LCLE = WerbSocle.listes.cle;
  const cleBrute = v => String(Array.isArray(v) ? v[0] : v);
  const LG = { brouillon: null, auteur: "", ouvertes: new Set(), derniere: 0 };
  const declarees = () => REG.modules.filter(m => m.manifeste && Array.isArray(m.manifeste.listes))
    .flatMap(m => m.manifeste.listes.map(l => ({ ...l, module: m.id, produit: m.manifeste.produit, rubrique: m.rubrique, cle: `${m.id}.${l.id}` })));
  const publiees = () => Object.fromEntries(((P.pubGroupe && P.pubGroupe.objets.listes) || []).filter(x => x && typeof x.id === "string" && Array.isArray(x.valeurs)).map(x => [x.id, x]));
  const copieVal = v => (Array.isArray(v) ? v.slice() : v);
  // Brouillon : par liste, lignes { v, orig } ; orig = valeur publiée dont la ligne est issue (un changement de clé est un renommage)
  function initListes(force = false) {
    if (LG.brouillon && !force) return;
    const pub = publiees();
    LG.brouillon = Object.fromEntries(declarees().map(d => { const p = pub[d.cle];
      return [d.cle, (p ? p.valeurs : d.defaut).map(v => ({ v: copieVal(v), orig: p ? copieVal(v) : null }))]; }));
  }
  function ecartsListe(d) {
    const p = publiees()[d.cle], lignes = LG.brouillon[d.cle] || [];
    const valeurs = lignes.map(x => x.v), avant = p ? p.valeurs : [];
    const ks = new Set(valeurs.map(LCLE)), ka = new Set(avant.map(LCLE));
    const renommees = {};
    for (const x of lignes) if (x.orig !== null && LCLE(x.orig) !== LCLE(x.v) && !ks.has(LCLE(x.orig))) renommees[cleBrute(x.orig)] = cleBrute(x.v);
    const erreurs = [], vus = new Set();
    lignes.forEach((x, i) => {
      const k = LCLE(x.v);
      if (!k) erreurs.push(`ligne ${i + 1} : valeur vide`);
      else if (vus.has(k)) erreurs.push(`ligne ${i + 1} : « ${cleBrute(x.v)} » en double`);
      vus.add(k);
    });
    if (!lignes.length) erreurs.push("liste vide");
    const ajoutees = valeurs.filter(v => !ka.has(LCLE(v))), retirees = avant.filter(v => !ks.has(LCLE(v)));
    return { p, valeurs, ajoutees, retirees, renommees, erreurs, change: !p || JSON.stringify(valeurs) !== JSON.stringify(avant) };
  }
  // Élément publié : les retraits et renommages déjà publiés sont gardés tant que la valeur n'est pas revenue dans la liste
  function elementListe(d, e) {
    const ks = new Set(e.valeurs.map(LCLE)), prec = e.p || {};
    const retirees = new Map([...(prec.retirees || []), ...e.retirees].filter(v => !ks.has(LCLE(v))).map(v => [LCLE(v), v]));
    const renommees = Object.fromEntries(Object.entries({ ...(prec.renommees || {}), ...e.renommees }).filter(([a]) => !ks.has(LCLE(a))));
    return { id: d.cle, valeurs: e.valeurs, retirees: [...retirees.values()], renommees };
  }
  const texteVal = v => (Array.isArray(v) ? `${v[0]} – ${v[1]}` : String(v));

  VUES.listes = () => {
    let h = `<h1>🗂️ Listes de choix du groupe</h1><p class="sub">Vocabulaire commun des listes de choix métier des modules (types d'actif, périodicités…). Chaque site reçoit ces valeurs à l'ouverture de ses bases et garde ses valeurs propres (charte §5.9).</p>`;
    const decl = declarees();
    if (!decl.length) return h + `<div class="card"><p class="muted">Aucun module publié ne déclare encore de liste de choix (<code>module.json › listes</code>).</p></div>`;
    if (!E.ouvert) return h + `<div class="card"><p class="small muted">Ouvrez d'abord l'espace du groupe (accueil, <b>Ouvrir l'espace…</b>) : ${decl.length} liste(s) déclarée(s) par les modules.</p></div>`;
    initListes();
    const ecarts = Object.fromEntries(decl.map(d => [d.cle, ecartsListe(d)]));
    const nChange = decl.filter(d => ecarts[d.cle].change).length, nErr = decl.filter(d => ecarts[d.cle].erreurs.length).length;
    const f = ((P.pubGroupe && P.pubGroupe.fichiers) || []).find(x => x.module === WERB.id);
    h += `<div class="card">${titre("📤", "Publication", "ardoise")}
      <p class="small">${f && publiees() && Object.keys(publiees()).length ? `Dernière publication le <b>${esc(frDate(f.publieLe))}</b> par <b>${esc(f.publiePar || "")}</b>, dans <code>publications/${esc(WERB.id)}.json</code>.` : "Aucune liste publiée : les valeurs proposées sont celles des modules."}</p>
      <div class="grid g2"><label class="f">Publiée par<input id="lgAuteur" value="${esc(LG.auteur)}" placeholder="Prénom NOM"></label></div>
      <p class="small">${nChange ? badge(`${nChange} liste(s) à publier`, "b-warn") : badge("Tout est publié", "b-ok")} ${nErr ? badge(`${nErr} liste(s) à corriger`, "b-ko") : ""}</p>
      <div class="row"><button class="primary" data-act="lgPublier"${nChange && !nErr ? "" : " disabled"}>📤 Publier les listes…</button><button data-act="lgToutAnnuler"${nChange ? "" : " disabled"}>↺ Annuler toutes les modifications</button></div>
      <p class="small muted">Valeur retirée : un site qui l'emploie la garde, signalée ⚠. Valeur renommée (changement du texte d'une valeur publiée) : le remplacement est proposé aux sites. Dans un site, les valeurs du groupe ne sont ni modifiables ni supprimables.</p></div>`;
    for (const m of [...new Set(decl.map(d => d.module))]) {
      const ds = decl.filter(d => d.module === m), [emoji, teinte] = rubStyle(ds[0].rubrique);
      h += `<div class="card">${titre(emoji, esc(ds[0].produit), teinte)}`;
      for (const d of ds) {
        const e = ecarts[d.cle], paires = d.forme === "paires", L = esc(d.cle);
        const etat = e.erreurs.length ? badge("à corriger", "b-ko") : !e.p ? badge("non publiée", "b-warn") : e.change ? badge("modifiée", "b-warn") : badge("publiée", "b-ok");
        const origine = x => x.orig === null ? (e.p ? badge("nouvelle", "b-warn") : "") : LCLE(x.orig) !== LCLE(x.v) ? badge(`renommée de « ${cleBrute(x.orig)} »`, "b-warn") : "";
        const champ = (x, i, j) => `<input class="lg-v" data-l="${L}" data-i="${i}" data-p="${j}" value="${esc(paires ? x.v[j] : x.v)}">`;
        h += `<details class="lg" data-l="${L}"${LG.ouvertes.has(d.cle) || e.erreurs.length ? " open" : ""}><summary><b>${esc(d.libelle)}</b> <span class="small muted mono">${L}</span> · ${LG.brouillon[d.cle].length} valeur(s) ${etat}</summary>
          <div class="tablewrap"><table class="t"><thead><tr>${paires ? "<th>Clé</th><th>Libellé</th>" : "<th>Valeur</th>"}<th></th><th></th></tr></thead><tbody>
          ${LG.brouillon[d.cle].map((x, i) => `<tr><td>${champ(x, i, 0)}</td>${paires ? `<td>${champ(x, i, 1)}</td>` : ""}<td class="small">${origine(x)}</td>
            <td><button class="small" data-act="lgRetirer" data-l="${L}" data-i="${i}" title="Retirer cette valeur">✕</button></td></tr>`).join("")}
          <tr><td><input class="lg-n" data-l="${L}" data-p="0" placeholder="${paires ? "Nouvelle clé" : "Nouvelle valeur"}"></td>${paires ? `<td><input class="lg-n" data-l="${L}" data-p="1" placeholder="Libellé"></td>` : ""}
            <td colspan="2"><button class="small" data-act="lgAjouter" data-l="${L}">➕ Ajouter</button></td></tr></tbody></table></div>
          ${e.erreurs.length ? `<div class="warnbox small">${e.erreurs.map(esc).join("<br>")}</div>` : ""}
          ${e.p && e.change ? `<p class="small">Écarts avec la publication : ${e.ajoutees.length ? `➕ ${esc(e.ajoutees.map(texteVal).join(", "))} ` : ""}${e.retirees.length ? `➖ ${esc(e.retirees.map(texteVal).join(", "))} ` : ""}${Object.keys(e.renommees).length ? `✏️ ${esc(Object.entries(e.renommees).map(([a, b]) => `${a} → ${b}`).join(", "))}` : ""}</p>` : ""}
          <div class="row small"><button class="small" data-act="lgAnnuler" data-l="${L}"${e.p && e.change ? "" : " disabled"}>↺ Revenir à la publication</button><button class="small" data-act="lgDefaut" data-l="${L}">Valeurs par défaut du module</button></div></details>`;
      }
      h += `</div>`;
    }
    const orphelines = Object.keys(publiees()).filter(id => !decl.some(d => d.cle === id));
    if (orphelines.length) h += `<div class="infobox small">Listes publiées dont le module ne déclare plus la liste (conservées telles quelles à la publication) : ${esc(orphelines.join(", "))}</div>`;
    return h + `<span hidden id="lgEtat" data-pub="${LG.derniere}"></span>`;
  };

  const ligneListe = el => LG.brouillon[el.dataset.l];
  const ACTIONS_LISTES = {
    lgAjouter(el) {
      const champs = [...document.querySelectorAll(`.lg-n[data-l="${CSS.escape(el.dataset.l)}"]`)].map(x => x.value.trim());
      if (!champs[0]) { toast("Saisissez la valeur à ajouter.", "err"); return; }
      ligneListe(el).push({ v: champs.length > 1 ? champs : champs[0], orig: null });
      LG.ouvertes.add(el.dataset.l); render();
    },
    lgRetirer(el) { ligneListe(el).splice(+el.dataset.i, 1); LG.ouvertes.add(el.dataset.l); render(); },
    lgAnnuler(el) {
      const p = publiees()[el.dataset.l];
      if (p) LG.brouillon[el.dataset.l] = p.valeurs.map(v => ({ v: copieVal(v), orig: copieVal(v) }));
      render();
    },
    lgDefaut(el) {
      const d = declarees().find(x => x.cle === el.dataset.l), p = publiees()[el.dataset.l];
      const pub = new Map((p ? p.valeurs : []).map(v => [LCLE(v), v]));
      LG.brouillon[el.dataset.l] = d.defaut.map(v => ({ v: copieVal(v), orig: pub.has(LCLE(v)) ? copieVal(pub.get(LCLE(v))) : null }));
      LG.ouvertes.add(el.dataset.l); render();
    },
    lgToutAnnuler() { initListes(true); render(); },
    async lgPublier() {
      LG.auteur = $("#lgAuteur").value.trim();
      if (!LG.auteur) { toast("Indiquez qui publie les listes (Publiée par).", "err"); $("#lgAuteur").focus(); return; }
      const decl = declarees(), ecarts = decl.map(d => [d, ecartsListe(d)]);
      if (ecarts.some(([, e]) => e.erreurs.length)) { toast("Corrigez les listes signalées avant de publier.", "err"); return; }
      const modifiees = ecarts.filter(([, e]) => e.change);
      const resume = modifiees.map(([d, e]) => `• ${d.produit} › ${d.libelle} : ${!e.p ? "première publication" : [e.ajoutees.length && `${e.ajoutees.length} ajoutée(s)`, e.retirees.length && `${e.retirees.length} retirée(s)`, Object.keys(e.renommees).length && `${Object.keys(e.renommees).length} renommée(s)`].filter(Boolean).join(", ") || "ordre ou libellés"}`).join("\n");
      if (!confirm(`Publier les listes de choix du groupe ?\n\n${resume}\n\nChaque site les recevra à la prochaine ouverture de ses bases.`)) return;
      const pub = publiees();
      const elements = [...ecarts.map(([d, e]) => elementListe(d, e)), ...Object.keys(pub).filter(id => !decl.some(d => d.cle === id)).map(id => pub[id])];
      try {
        await E.publier({ niveau: "groupe", objets: { listes: elements }, utilisateur: LG.auteur });
        P.pubGroupe = await E.publications("groupe");
        initListes(true); LG.derniere = Date.now();
        toast(`Listes publiées (${modifiees.length} modifiée(s)).`, "ok");
      } catch (e) {
        toast(["NotAllowedError", "SecurityError"].includes(e.name) ? "Publication refusée : vos droits ne permettent pas d'écrire dans publications/ du groupe." : "Publication impossible : " + e.message, "err");
      }
      render();
    },
  };
  Object.assign(ACTIONS, ACTIONS_LISTES);
  // Saisie dans une liste : le brouillon suit chaque frappe ; à la sortie du champ, rendu (contrôles, écarts) en gardant le champ
  // actif, sauf si l'utilisateur clique un bouton (son action relance le rendu : le bouton n'est pas remplacé sous le clic).
  document.addEventListener("input", e => {
    if (e.target.id === "lgAuteur") { LG.auteur = e.target.value.trim(); return; }
    if (!e.target.matches(".lg-v")) return;
    const d = e.target.dataset, ligne = LG.brouillon[d.l][+d.i];
    if (Array.isArray(ligne.v)) ligne.v[+d.p] = e.target.value.trim(); else ligne.v = e.target.value.trim();
    LG.ouvertes.add(d.l);
  });
  let clicBouton = false;
  document.addEventListener("mousedown", e => { clicBouton = !!e.target.closest("button"); }, true);
  document.addEventListener("mouseup", () => { setTimeout(() => { clicBouton = false; }, 0); }, true);
  document.addEventListener("change", e => {
    if (!e.target.matches(".lg-v")) return;
    setTimeout(() => {
      if (clicBouton) return;
      const a = document.activeElement;
      const sel = a && a.matches && a.matches(".lg-v, .lg-n") ? `.${a.classList[0]}[data-l="${CSS.escape(a.dataset.l)}"][data-p="${a.dataset.p}"]${a.dataset.i !== undefined ? `[data-i="${a.dataset.i}"]` : ""}` : "";
      render();
      const x = sel && document.querySelector(sel); if (x) x.focus();
    }, 0);
  });
  document.addEventListener("toggle", e => { if (e.target.matches && e.target.matches("details.lg")) { if (e.target.open) LG.ouvertes.add(e.target.dataset.l); else LG.ouvertes.delete(e.target.dataset.l); } }, true);

  /* Espace de démonstration : livré avec WerbSMSI, à un emplacement fixe par rapport au portail. Un navigateur ne peut pas ouvrir
     un dossier par son chemin : la fenêtre donne le chemin complet, le copie et ouvre le sélecteur de dossier ; il reste à le coller.
     Proposée à l'arrivée sur l'accueil quand aucun espace n'est ouvert, une fois par chargement de la page ; « Ne plus proposer »
     vaut pour la session (préférence d'affichage du socle, aucune donnée). */
  const DEMO = { relatif: "../demo/SMSI_GROUPE_DEMO", organisation: "Groupe Démo Industrie (fictif)" };
  function cheminDemo() {
    const u = new URL(DEMO.relatif + "/", location.href);
    if (u.protocol !== "file:") return "demo/SMSI_GROUPE_DEMO (dossier WerbSMSI)";
    const p = decodeURIComponent(u.pathname).replace(/\/$/, "");
    if (u.host) return "\\\\" + u.host + p.replace(/\//g, "\\");          // partage réseau (\\serveur\partage\…)
    return /^\/[A-Za-z]:/.test(p) ? p.slice(1).replace(/\//g, "\\") : p;   // C:\…\SMSI_GROUPE_DEMO
  }
  let demoProposee = false;
  function proposerDemo() {
    if (demoProposee || E.ouvert || !E.disponible || P.vue !== "accueil" || WerbSocle.preference.lire("demoMasquee", false)) return;
    demoProposee = true;
    fenetreDemo();
  }
  function fenetreDemo() {
    if ($("#demo-fen")) return;
    const chemin = cheminDemo(), v = document.createElement("div");
    v.id = "demo-fen"; v.className = "fen-back";
    v.innerHTML = `<div class="fen" role="dialog" aria-modal="true" aria-labelledby="demo-titre"><h2 id="demo-titre">🧪 Découvrir WerbSMSI avec l'espace de démonstration</h2>
      <p>WerbSMSI est livré avec un espace d'exemple <b>entièrement fictif</b> : le groupe « ${esc(DEMO.organisation)} », ses sites <b>LYON</b> et <b>NANTES</b>, des bases et des publications pour chaque module. C'est le moyen le plus rapide de voir le portail et les modules fonctionner ensemble.</p>
      <label class="f">Dossier de l'espace de démonstration</label>
      <div class="row"><code class="chemin" id="demo-chemin">${esc(chemin)}</code><button class="small" data-act="copierDemo">📋 Copier</button></div>
      <ol class="small"><li><b>📂 Ouvrir la démo</b> copie ce chemin et ouvre la fenêtre de choix du dossier.</li>
        <li>Dans cette fenêtre, collez le chemin (<b>Ctrl+V</b>) dans la barre d'adresse ou dans le champ « Dossier », puis <b>Sélectionner un dossier</b>.</li>
        <li>Edge demande l'autorisation de modifier le dossier : acceptez.</li></ol>
      <div class="warnbox small">Les modifications faites dans la démo sont écrites dans ses fichiers, dans le dossier de WerbSMSI. Pour l'essayer sans risque, copiez d'abord le dossier <code>SMSI_GROUPE_DEMO</code> ailleurs et ouvrez la copie.</div>
      <div class="fen-a"><button data-act="demoMasquer">Ne plus proposer</button><span class="spacer"></span><button data-act="demoFermer">Plus tard</button><button class="primary" data-act="ouvrirDemo">📂 Ouvrir la démo</button></div></div>`;
    v.addEventListener("keydown", e => { if (e.key === "Escape") v.remove(); });
    document.body.appendChild(v);
    v.querySelector("[data-act=ouvrirDemo]").focus();
  }
  async function ouvrirDemo() {
    const chemin = cheminDemo();
    try { navigator.clipboard.writeText(chemin).catch(() => {}); } catch (e) { /* copie facultative */ }   // sans attendre : le sélecteur a besoin du clic
    const f = $("#demo-fen"); if (f) f.remove();
    try {
      await E.choisir(); await chargerEspace(); await majRaccourci(); P.vue = "groupe";
      if (P.groupe && P.groupe.organisation === DEMO.organisation) toast("Espace de démonstration ouvert : toutes les données sont fictives.", "ok");
      else toast(`Espace « ${P.groupe ? P.groupe.organisation : "?"} » ouvert : ce n'est pas l'espace de démonstration.`, "");
    } catch (e) { P.chargement = false; if (e.name !== "AbortError") toast(e.message, "err"); }
    render();
  }

  async function copier(texte, message) {
    try { await navigator.clipboard.writeText(texte); toast(message, "ok"); }
    catch (e) { toast("Copie impossible : sélectionnez le texte et copiez-le (Ctrl+C).", "err"); }
  }

  // Formulaires de mise en place : la saisie met à jour l'état ; la sortie du champ relance le rendu (contrôles, aperçu)
  function majFormulaire(el) {
    const d = el.dataset;
    const val = /^(code|sigle)$/.test(d.k || "") ? el.value.toUpperCase().trim() : el.value;
    if (d.form) F[d.form][d.k] = val;
    else if (d.fsite !== undefined) F.espace.sites[+d.fsite][d.k] = val;
    else if (d.fport) { const s = new Set(F.module.portees); if (el.checked) s.add(d.fport); else s.delete(d.fport); F.module.portees = ["groupe", "site"].filter(x => s.has(x)); }
    else return false;
    if (d.form === "module" && d.k === "rubrique") { const r = RUBRIQUES.find(x => x.id === val); F.module.portees = r ? (r.portees || []).slice() : []; }
    return true;
  }
  const cleChamp = el => el && el.dataset ? ["form", "fsite", "fport", "k"].filter(k => el.dataset[k] !== undefined).map(k => `[data-${k}="${CSS.escape(el.dataset[k])}"]`).join("") : "";
  document.addEventListener("input", e => { if (e.target.matches("input[type=text], input:not([type])")) majFormulaire(e.target); });
  document.addEventListener("change", async e => {
    if (e.target.matches && e.target.matches("input.pmod")) { const b = brouillonMasques(), id = e.target.dataset.id; if (e.target.checked) b.delete(id); else b.add(id); render(); return; }
    if (e.target.id === "optRaccourcis") {
      P.raccourcis = e.target.checked; WerbSocle.preference.ecrire("raccourcis", P.raccourcis);
      await majRaccourci(); renderTopbar();
      toast(P.raccourcis ? (P.raccourciOk ? "Raccourcis activés : les modules ouverts depuis les puces accèdent directement à l'espace." : "Edge a refusé de mémoriser le dossier.") : "Raccourcis désactivés et effacés.", P.raccourciOk === false ? "err" : "ok");
      return;
    }
    if (!majFormulaire(e.target)) return;
    setTimeout(() => {   // après le déplacement du focus (Tab), qui est restauré
      const cle = cleChamp(document.activeElement);
      render();
      const el = cle && document.querySelector(cle); if (el) el.focus();
    }, 0);
  });

  ACTIONS.allerEtape = el => { const c = document.getElementById("etape-" + el.dataset.e); if (c) c.scrollIntoView({ behavior: "smooth", block: "start" }); };
  if (!ACTIONS.imprimerPage) ACTIONS.imprimerPage = () => window.print();
  document.addEventListener("click", e => {
    const site = e.target.closest("[data-site]");
    if (site) { e.preventDefault(); P.vue = "site"; P.site = site.dataset.site; render(); $("#main").scrollTop = 0; return; }
    const nav = e.target.closest("[data-nav]");
    if (nav) { P.vue = nav.dataset.nav; render(); $("#main").scrollTop = 0; return; }
    const act = e.target.closest("[data-act]");
    if (act && ACTIONS[act.dataset.act]) ACTIONS[act.dataset.act](act, e);
  });

  WerbSocle.theme.surChangement(() => render());   // liens vers les modules : thème choisi (charte §7.5)
  render();
})();
