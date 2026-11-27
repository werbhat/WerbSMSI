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
    raccourcis: WerbSocle.preference.lire("raccourcis", true), raccourciOk: null,
    utilisateur: "", compte: null, expire: 0, ticket: "", comptesData: null, comptesErr: "", messageConnexion: "" };   // compte connecté (1.22.0) ; nom saisi une fois à l'ouverture du portail (1.16.0), transmis aux modules ouverts d'ici ; mémoire seulement

  WerbSocle.activerPurgeAutomatique();
  WerbSocle.comptes.gereParLePortail();   // le portail a sa propre page de connexion (1.22.0) : pas de fenêtre du socle

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

  /* ===================================================== modèles de documents (1.13.0, MOD)
     Inventaire de WerbSMSI/Modeles_docs/modeles.json, intégré à l'assemblage (window.WERB_MODELES) : rôle de chaque modèle, modules
     qui l'utilisent, emplacement dans l'espace. Espace ouvert : présence de chaque modèle dans modeles/ et modeles/schemas/ (lecture seule). */
  const MODELES = Array.isArray(window.WERB_MODELES) ? window.WERB_MODELES : [];
  async function chargerModeles() {
    const r = { lu: false, fichiers: {} };
    for (const d of ["modeles", "modeles/schemas"]) {
      const l = await E.lister(d).catch(() => null);
      if (l) { r.lu = true; l.filter(f => f.type === "file").forEach(f => { r.fichiers[`${d}/${f.nom}`] = f; }); }
    }
    return r;
  }
  /* ===================================================== chargement de l'espace */
  async function chargerEspace() {
    P.chargement = true; render();
    try {
      P.groupe = E.groupe;
      P.comptesErr = "";   // comptes de l'espace (1.22.0)
      try { P.comptesData = await WerbSocle.comptes.lire(); } catch (e) { P.comptesData = null; P.comptesErr = e.message; }
      resynchroniserSession();
      P.pubGroupe = await E.publications("groupe");
      LG.brouillon = null;                                   // listes de choix : brouillon repris de la publication relue
      PA.brouillon = null;                                   // paramètres : brouillon repris de werbsmsi.groupe.json
      P.manquants = [];
      P.basesGroupe = await chargerBases("groupe", "", P.groupe.bases || []);
      P.sites = {};
      for (const s of P.groupe.sites || []) P.sites[s.code] = await chargerSite(s.code);
      P.modeles = await chargerModeles();
      P.luLe = Date.now();   // tableau de bord GRC : heure de lecture des publications
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
  const sitesAccessibles = () => (P.groupe ? P.groupe.sites || [] : []).filter(s => P.sites[s.code] && P.sites[s.code].accessible && (!P.compte || voitSite(s.code)));
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
    return url && m.manifeste.ouvertureParLien ? WerbSocle.lien.creer(url, { groupeId: P.groupe.groupeId, fichier: b.chemin, site, libelle: b.libelle || "", espace: E.nom, theme: WerbSocle.theme.mode, utilisateur: P.utilisateur, ticket: connecte() ? P.ticket : "",
      sigle: P.groupe.sigle || "", organisation: P.groupe.organisation || "", siteNom: ((P.groupe.sites || []).find(x => x.code === site) || {}).nom || "" }) : null;   // sigle, organisation, nom du site : nommage des exports (§7.8)
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
    const lien = lienModule(m) && WerbSocle.lien.avecContexte(lienModule(m), { theme: WerbSocle.theme.mode, utilisateur: P.utilisateur, ticket: connecte() ? P.ticket : "",
      sigle: E.ouvert && P.groupe ? P.groupe.sigle || "" : "", organisation: E.ouvert && P.groupe ? P.groupe.organisation || "" : "" });   // thème (§7.5), nom (§5.5), nommage des exports (§7.8)
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
      <div class="row">${(window.WERB_MEDIAS || {}).infographie_demarrer ? `<button data-nav="infographie">🖼️ Voir l'infographie</button>` : ""}${guideDemarrer() ? `<button data-nav="${esc(guideDemarrer().id)}">📖 ${esc(guideDemarrer().titre)}</button>` : ""}<button data-nav="recueil" title="Tous les guides du portail et des modules, dans un nouvel onglet">📚 Recueil de tous les guides ↗</button></div></div>`;
  }

  // Recueil de tous les guides (portail, guide technique, modules publiés ; charte §7.4) : page autonome produite par
  // werb_charte.py recueil, ouverte dans un nouvel onglet avec le thème du portail (§7.5) pour être lue à côté de WerbSMSI
  const RECUEIL = "../docs/guides/Recueil_guides_WerbSMSI.html";
  const lienRecueil = () => WerbSocle.lien.avecTheme(RECUEIL, WerbSocle.theme.mode);
  const ouvrirRecueil = () => window.open(lienRecueil(), "_blank", "noopener");

  // Guides du portail (portail/guides/) : lecture dans ❓ Aide ; « Démarrer avec WerbSMSI » est proposé à l'accueil
  /* Un guide du portail dans un nouvel onglet (1.24.0) : le recueil s'ouvre directement sur ce guide (#<id du recueil>), dans le thème
     du portail (?theme=), pour le garder à côté du portail ou d'un module. Identifiant du recueil : chemin portail/guides/<fichier>,
     calculé comme le fait le composant des guides (charte §7.4). */
  const idRecueil = g => "guide:" + ("portail/guides/" + g.fichier.replace(/\.md$/i, "")).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const lienGuideOnglet = g => `${RECUEIL}${["clair", "sombre"].includes(WerbSocle.theme.mode) ? `?theme=${WerbSocle.theme.mode}` : ""}#${encodeURIComponent(idRecueil(g))}`;
  const boutonOnglet = g => `<div class="row noprint guide-onglet"><a class="btn" href="${esc(lienGuideOnglet(g))}" target="_blank" rel="noopener" data-guide-onglet="${esc(g.id)}">↗ Ouvrir dans un nouvel onglet</a><span class="small muted">pour garder ce guide à côté du portail ou d'un module</span></div>`;
  WerbGuides.guides().forEach(g => { VUES[g.id] = () => boutonOnglet(g) + WerbGuides.vue(g.id, { lien: id => `data-nav="${id}"` }); });
  const guideDemarrer = () => WerbGuides.guides().find(g => /demarrer/i.test(g.fichier)) || null;
  const guideEnRoute = () => WerbGuides.guides().find(g => /en_route/i.test(g.fichier)) || null;   // premiers pas, station par station (1.23.0)
  VUES.accueil = () => `<div class="hero"><h1>🛡️ WerbSMSI</h1><p class="sub">${esc(WERB.description)}</p>
    ${guideEnRoute() ? `<div class="infobox" data-en-route>🛣️ <b>Première utilisation ?</b> Suivez <a href="#" data-nav="${esc(guideEnRoute().id)}">« ${esc(guideEnRoute().titre)} »</a> : du dossier vide au tableau de bord, en sept stations (espace, comptes, premières bases, publications). <a href="${esc(lienGuideOnglet(guideEnRoute()))}" target="_blank" rel="noopener" data-guide-onglet="accueil">↗ L'ouvrir dans un nouvel onglet</a>, pour le suivre à côté du portail.</div>` : ""}
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
    h += `<div class="card" data-cartographies>${titre("🗺️", "Schémas d'architecture par site", "cyan")}${cartos.length ? `<div class="tablewrap"><table class="t"><thead><tr><th>Site</th><th>Exigences couvertes</th><th>À revoir</th><th>En cours</th><th>Non couvertes</th><th>Non applicables</th><th>Schémas en vigueur</th><th title="Revues de schémas prévues dans les 60 prochains jours">Revues à venir (60 j)</th><th>Publié</th></tr></thead><tbody>
      ${cartos.map(({ s, c }) => { const n = e => c.filter(x => x.etat === e).length, pub = publication(s.code, "werbcartosi"), nb = new Set(c.flatMap(x => (x.schemas || []).map(y => y.id))).size, app = c.length - n("na");   // non applicables hors décompte
        const auj = new Date().toISOString().slice(0, 10), lim = new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10);
        const rv = new Set(c.flatMap(x => (x.schemas || []).filter(y => y.prochaineRevue && y.prochaineRevue >= auj && y.prochaineRevue <= lim).map(y => y.id))).size;   // WerbCartoSI 1.8.0
        return `<tr><td>${esc(s.code)}</td><td>${barre(app ? Math.round(100 * n("couverte") / app) : 100)}<span class="small">${n("couverte")} / ${app}</span></td><td>${n("arevoir") ? badge(n("arevoir"), "b-warn") : "0"}</td><td>${n("encours")}</td>
        <td>${n("non") ? badge(n("non"), "b-ko") : "0"}</td><td>${n("na")}</td><td>${nb}</td><td>${rv ? badge(rv, "b-warn") : "0"}</td><td class="small">${pub ? `${esc(frDate(pub.publieLe))}<br>${esc(pub.publiePar || "")}` : ""}</td></tr>`; }).join("")}</tbody></table></div>`
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

  /* ===================================================== tableau de bord GRC (1.21.0)
     Gouvernance, risques et conformité du groupe, consolidés à partir des publications de l'espace (lecture seule, rien n'est écrit).
     Objets lus : site:syntheseRisques et groupe:echelles (WerbEBIOS), site:syntheseConformite (WerbIEC62443), site:syntheseNis2 (WerbNIS2),
     groupe:mesuresSocle (WerbGouvernance), site:sauvegardes, site:plm, site:difficultesMaj (WerbExploitation), site:actifs (WerbMap),
     site:veille (WerbVeille), site:remediations (WerbPentest), site:evaluationsPrestataires (WerbPresta), groupe:formations (WerbAcademie). */
  const GRC = { perimetre: "tous", vue: "res", cellule: null };
  const GRC_FRAIS = 90, GRC_PROCHE = 60, GRC_CIBLE = 80;   // publication à jour (jours) ; acceptation à renouveler (jours) ; cible de conformité (%)
  const grcAuj = () => new Date().toISOString().slice(0, 10);
  const grcJours = iso => iso ? Math.floor((Date.parse(grcAuj()) - Date.parse(String(iso).slice(0, 10))) / 864e5) : null;
  const grcDans = (iso, j) => !!iso && iso >= grcAuj() && grcJours(iso) >= -j;
  const grcObjet = (code, nom) => ((((P.sites[code] || {}).pub || {}).objets || {})[nom]);
  const grcListe = (code, nom) => { const l = grcObjet(code, nom); return Array.isArray(l) ? l : []; };
  const grcSites = () => sitesAccessibles().filter(s => GRC.perimetre === "tous" || s.code === GRC.perimetre);
  // Échelles du groupe : dimensions, libellés des niveaux et matrice[v − 1][g − 1] (WerbEBIOS 1.21.0) ; sans matrice publiée, grille estimée
  function grcEchelles() {
    const e = ((P.pubGroupe || {}).objets || {}).echelles || {}, dim = k => Math.max(4, ...((e[k] || []).map(x => +x.niveau || 0)));
    const G = dim("gravite"), V = dim("vraisemblance"), N = dim("niveauxRisque");
    const m = Array.isArray(e.matrice) && e.matrice.length >= V && e.matrice.every(l => Array.isArray(l) && l.length >= G) ? e.matrice : null;
    const niveau = (g, v) => m ? +m[v - 1][g - 1] || 0 : Math.min(N, Math.max(1, Math.ceil(g * v / (G * V) * N)));
    const lib = n => ((e.niveauxRisque || []).find(x => +x.niveau === +n) || {}).libelle || (n ? `Niveau ${n}` : "—");
    return { G, V, N, niveau, lib, matrice: !!m, teinte: n => n ? Math.min(4, Math.max(1, Math.ceil(n / N * 4))) : 0 };
  }
  // Risques publiés par les sites : position brute et résiduelle dans la matrice (résiduel non coté = brut)
  function grcRisques(sites = grcSites()) {
    return sites.flatMap(s => grcListe(s.code, "syntheseRisques").map(r => {
      const gb = +r.gravite || 0, vb = +r.vraisemblance || 0, nb = +r.niveauBrut || 0, nr = +(r.niveauResiduel ?? r.niveauBrut) || 0;
      return { site: s.code, r, gb, vb, nb, gr: +r.graviteResiduelle || gb, vr: +r.vraisemblanceResiduelle || vb, nr };
    }));
  }
  const grcPos = x => GRC.vue === "res" ? [x.gr, x.vr, x.nr] : [x.gb, x.vb, x.nb];
  const LIB_TRAIT = { reduire: "Réduire", accepter: "Accepter", transferer: "Transférer", eviter: "Éviter", "a-decider": "À décider" };

  // Conformité par référentiel et par site : socle du groupe (mesures appliquées), NIS2 (couverture), IEC 62443 (moyenne des projets)
  function grcConformite(sites = sitesAccessibles()) {
    const socle = ((P.pubGroupe || {}).objets || {}).mesuresSocle || [];
    const moy = l => l.length ? Math.round(l.reduce((a, b) => a + b, 0) / l.length) : null;
    return [
      { ref: "Socle de mesures du groupe", src: "WerbGouvernance · WerbIEC62443", v: Object.fromEntries(sites.map(s => { const sy = grcListe(s.code, "syntheseConformite");
        if (!socle.length || !sy.length) return [s.code, null];
        const ko = new Set(sy.flatMap(c => c.mesuresSocleNonAppliquees || []));
        return [s.code, Math.round(100 * socle.filter(m => !ko.has(m.id)).length / socle.length)]; })) },
      { ref: "NIS2 (ANSSI)", src: "WerbNIS2", v: Object.fromEntries(sites.map(s => [s.code, moy(grcListe(s.code, "syntheseNis2").map(y => y.couverture).filter(x => x !== null && x !== undefined).map(Number))])) },
      { ref: "IEC 62443-3-3", src: "WerbIEC62443", v: Object.fromEntries(sites.map(s => [s.code, moy(grcListe(s.code, "syntheseConformite").filter(c => /62443/.test(c.referentiel || "")).map(c => Math.round(+c.taux)).filter(Number.isFinite))])) }
    ];
  }
  // Actifs critiques (WerbMap) dont la difficulté de mise à jour est N4 ou N5 (WerbExploitation) ; null : rien de publié
  function grcDifficiles(c, liste = false) {
    const d = grcObjet(c, "difficultesMaj"); if (!Array.isArray(d)) return liste ? [] : null;
    const crit = new Set(grcListe(c, "actifs").filter(a => /critique/i.test(a.criticite || "")).map(a => String(a.id).toUpperCase()));
    const l = d.filter(x => ["N4", "N5"].includes(x.niveau) && crit.has(String(x.tag).toUpperCase()));
    return liste ? l : l.length;
  }
  // Indicateurs d'hygiène par site : éléments à reprendre (null : rien de publié par le module) ; grave : rouge dès 1 ; pct : taux en %
  const GRC_HYG = [
    { lib: "Sauvegardes sans test de restauration depuis un an", obj: "site:sauvegardes", f: c => { const l = grcObjet(c, "sauvegardes"); return Array.isArray(l) ? l.filter(x => ["jamais", "echu"].includes(x.statutTest)).length : null; } },
    { lib: "Références hors support installées", obj: "site:plm", grave: true, f: c => { const l = grcObjet(c, "plm"); return Array.isArray(l) ? l.filter(x => x.gravite === "ko").length : null; } },
    { lib: "Actifs critiques difficiles à mettre à jour (N4, N5)", obj: "site:difficultesMaj", grave: true, f: c => grcDifficiles(c) },
    { lib: "Alertes de veille « Concerné » ouvertes", obj: "site:veille", f: c => { const v = grcObjet(c, "veille"); return v && v.indicateurs ? +v.indicateurs.concerneesOuvertes || 0 : null; } },
    { lib: "Actions de remédiation en retard (tests d'intrusion)", obj: "site:remediations", grave: true, f: c => { const l = grcObjet(c, "remediations"); return Array.isArray(l) ? l.reduce((n, x) => n + (+x.actionsEnRetard || 0), 0) : null; } },
    { lib: "Prestataires dont la revue est dépassée", obj: "site:evaluationsPrestataires", f: c => { const l = grcObjet(c, "evaluationsPrestataires"); return Array.isArray(l) ? l.filter(x => x.prochaineRevue && x.prochaineRevue < grcAuj()).length : null; } },
    { lib: "Formations exigées à jour", obj: "groupe:formations", pct: true, f: c => { const f = formationsGroupe(), x = f && (f.parSite || []).find(y => y.site === c); return x && x.taux !== null && x.taux !== undefined ? +x.taux : null; } }
  ];
  // Publications par module : groupe (périmètre « Groupe » seulement) et sites, avec leur date
  function grcPublications(sites = grcSites()) {
    const lignes = [];
    if (GRC.perimetre === "tous") ((P.pubGroupe || {}).fichiers || []).forEach(f => lignes.push({ ou: "Groupe", module: idActuel(f.module), le: f.publieLe }));
    sites.forEach(s => (((P.sites[s.code] || {}).pub || {}).fichiers || []).forEach(f => lignes.push({ ou: s.code, module: idActuel(f.module), le: f.publieLe })));
    return lignes.filter(p => p.le);
  }
  /* Points à traiter : bloquant (rouge) ou à surveiller (orange), avec le site, le module d'origine et l'échéance.
     Bloquant : acceptation du risque résiduel expirée ; risque d'un des deux plus hauts niveaux sans traitement décidé ; risque résiduel au
     plus haut niveau non accepté ; actions en retard (remédiations, plan NIS2) ; actif critique N4 ou N5 ; référence hors support.
     À surveiller : acceptation qui expire dans les 60 jours ; mesures NIS2 non conformes ; écarts majeurs IEC 62443 ; sauvegarde non testée
     depuis un an ; revue de prestataire dépassée ; alertes de veille « Concerné » ouvertes ; publication de plus de 90 jours. */
  function grcATraiter() {
    const E2 = grcEchelles(), out = [], add = (site, sev, t, d, src, ech = "") => out.push({ site, sev, t, d, src, ech });
    grcRisques().forEach(x => {
      const r = x.r, nom = `${r.id} – ${r.libelle || ""}`;
      if (r.acceptation === "expiree") add(x.site, "ko", "Acceptation du risque résiduel expirée", `${nom} : renouveler l'acceptation ou retraiter le risque.`, "werbebios", r.accepteJusqua || "");
      else if (r.traitement === "a-decider" && x.nr >= E2.N - 1) add(x.site, "ko", "Risque élevé sans traitement décidé", `${nom} (${E2.lib(x.nr)}) : choisir le traitement et le propriétaire du risque.`, "werbebios");
      else if (x.nr >= E2.N && r.acceptation !== "acceptee") add(x.site, "ko", `Risque résiduel « ${E2.lib(x.nr)} » non accepté`, `${nom} : à réduire ou à faire accepter formellement.`, "werbebios");
      else if (r.acceptation === "acceptee" && grcDans(r.accepteJusqua, GRC_PROCHE)) add(x.site, "warn", "Acceptation du risque à renouveler", `${nom} : acceptée jusqu'au ${frDate(r.accepteJusqua)}.`, "werbebios", r.accepteJusqua);
    });
    grcSites().forEach(s => {
      const c = s.code, rem = grcListe(c, "remediations").filter(x => +x.actionsEnRetard > 0), nRem = rem.reduce((a, x) => a + (+x.actionsEnRetard), 0);
      if (nRem) add(c, "ko", `${nRem} action(s) de remédiation en retard`, `Tests d'intrusion, actifs : ${rem.map(x => x.actif).join(", ")}.`, "werbpentest", rem.map(x => x.prochaineEcheance).filter(Boolean).sort()[0] || "");
      grcListe(c, "syntheseNis2").forEach(y => {
        if (+y.actionsEnRetard > 0) add(c, "ko", `${y.actionsEnRetard} action(s) du plan NIS2 en retard`, `${y.actionsOuvertes} action(s) ouverte(s) au plan d'actions NIS2.`, "werbnis2");
        if (+y.nc > 0) add(c, "warn", `${y.nc} mesure(s) NIS2 non conforme(s)`, `Couverture ${y.couverture ?? "—"} %, ${y.nonEvaluees ?? 0} mesure(s) non évaluée(s).`, "werbnis2", y.prochaineEcheance || "");
      });
      grcListe(c, "syntheseConformite").filter(y => +y.ecartsMajeurs > 0).forEach(y => add(c, "warn", `${y.ecartsMajeurs} écart(s) majeur(s) ${y.referentiel || ""}`, `Périmètre ${y.perimetre || "—"} : taux ${y.taux} %.`, y.source || "werbiec62443"));
      const dif = grcDifficiles(c, true);
      if (dif.length) add(c, "ko", `${dif.length} actif(s) critique(s) très difficile(s) à mettre à jour`, `${dif.map(x => `${x.tag} (${x.niveau}, ${x.score}/55)`).join(", ")} : prévoir des mesures compensatoires (cloisonnement, surveillance, durcissement).`, "werbexploitation");
      const plm = grcListe(c, "plm").filter(x => x.gravite === "ko");
      if (plm.length) add(c, "ko", `${plm.length} référence(s) hors support installée(s)`, plm.map(x => [x.produit, x.version].filter(Boolean).join(" ") || x.libelle).join(", ") + ".", "werbexploitation");
      const sv = grcListe(c, "sauvegardes").filter(x => ["jamais", "echu"].includes(x.statutTest));
      if (sv.length) add(c, "warn", `${sv.length} sauvegarde(s) sans test de restauration depuis un an`, sv.map(x => `${x.id} (${x.statutTest === "jamais" ? "jamais testée" : "test du " + frDate(x.dernierTest)})`).join(", ") + ".", "werbexploitation");
      grcListe(c, "evaluationsPrestataires").filter(x => x.prochaineRevue && x.prochaineRevue < grcAuj()).forEach(x => add(c, "warn", `Revue du prestataire ${x.nom} dépassée`, `Criticité ${x.criticite || "—"}${x.distant ? `, accès à distance (${x.distant})` : ""} : relancer l'évaluation.`, "werbpresta", x.prochaineRevue));
      const ve = grcObjet(c, "veille");
      if (ve && ve.indicateurs && +ve.indicateurs.concerneesOuvertes > 0) add(c, "warn", `${ve.indicateurs.concerneesOuvertes} alerte(s) de veille « Concerné » ouverte(s)`, "Vulnérabilités qui touchent le parc du site, à traiter dans WerbVeille.", "werbveille");
    });
    grcPublications().filter(p => grcJours(p.le) > GRC_FRAIS).forEach(p => add(p.ou === "Groupe" ? "" : p.ou, "warn", `Publication ${libelleModule(p.module)} de plus de ${GRC_FRAIS} jours`, `Publiée le ${frDate(String(p.le).slice(0, 10))} (${grcJours(p.le)} jours) : la synthèse peut être dépassée.`, p.module));
    return out.sort((a, b) => (a.sev === b.sev ? 0 : a.sev === "ko" ? -1 : 1) || (a.ech || "9999").localeCompare(b.ech || "9999"));
  }

  VUES.grc = () => {
    if (!P.groupe) return `<h1>📊 Tableau de bord GRC</h1><div class="infobox">Ouvrez l'espace WerbSMSI du groupe pour consolider les publications des sites.</div>`;
    const E2 = grcEchelles(), tous = sitesAccessibles(), sites = grcSites(), risques = grcRisques(), conf = grcConformite(tous), at = grcATraiter();
    const ko = at.filter(a => a.sev === "ko").length, pubs = grcPublications(), aJour = pubs.filter(p => grcJours(p.le) <= GRC_FRAIS).length;
    const hauts = risques.filter(x => x.nr >= E2.N - 1), confV = conf.flatMap(c => sites.map(s => c.v[s.code])).filter(v => v !== null && v !== undefined);
    const moy = confV.length ? Math.round(confV.reduce((a, b) => a + b, 0) / confV.length) : null;
    const etatCmp = v => v >= GRC_CIBLE ? "ok" : v >= 60 ? "warn" : "ko";
    const kpi = (e, l, v, d) => `<div class="grc-kpi" data-etat="${e}"><span class="l">${l}</span><span class="v">${v}</span><span class="d">${d}</span></div>`;
    const thSites = `<thead><tr><th></th>${tous.map(s => `<th class="n${GRC.perimetre === s.code ? " on" : ""}">${esc(s.code)}</th>`).join("")}</tr></thead>`;
    let h = `<div class="grc-entete"><div><h1>📊 Tableau de bord GRC</h1><p class="sub">Gouvernance, risques et conformité de ${esc(P.groupe.organisation)}, consolidés à partir des publications des modules. Seules les synthèses remontent des sites : niveaux, taux et compteurs.</p></div>
      <div class="grc-filtres"><div class="grc-chips" role="group" aria-label="Périmètre">${[["tous", "Groupe"], ...tous.map(s => [s.code, s.code])].map(([k, t]) => `<button type="button" data-act="grcPerimetre" data-p="${esc(k)}" aria-pressed="${GRC.perimetre === k}"${k === "tous" ? ` title="Tous les sites lisibles"` : ` title="${esc((tous.find(s => s.code === k) || {}).nom || "")}"`}>${esc(t)}</button>`).join("")}</div>
      <span class="small muted">Publications lues le ${esc(frDate(P.luLe || Date.now()))} · <a href="#" data-act="grcRelire">⟳ Relire</a></span></div></div>`;
    const nonLus = (P.groupe.sites || []).filter(s => !(P.sites[s.code] || {}).accessible);
    if (nonLus.length) h += `<div class="warnbox">Site(s) non lisible(s), absent(s) du tableau : ${nonLus.map(s => esc(s.code)).join(", ")} (dossier absent ou fermé par les droits du drive).</div>`;
    h += `<section class="grc-kpis" aria-label="Chiffres clés">
      ${kpi(hauts.length ? "ko" : "ok", `Risques résiduels « ${esc(E2.lib(E2.N - 1))} » ou plus`, `${hauts.length} <small>/ ${risques.length}</small>`, `dont ${risques.filter(x => x.nr >= E2.N).length} « ${esc(E2.lib(E2.N))} »`)}
      ${kpi(moy === null ? "" : etatCmp(moy), "Conformité moyenne", moy === null ? "—" : `${moy} <small>%</small>`, `${confV.length} évaluation(s) · cible ${GRC_CIBLE} %`)}
      ${kpi(ko ? "ko" : "ok", "Points bloquants", `${ko}`, `et ${at.length - ko} à surveiller`)}
      ${kpi(aJour < pubs.length ? "warn" : "ok", "Publications à jour", `${aJour} <small>/ ${pubs.length}</small>`, `publiées depuis moins de ${GRC_FRAIS} jours`)}</section>`;
    h += `<div class="grc-2"><section class="card" data-grc-traiter>${titre("📌", "À traiter", "rouge")}<p class="small muted">${ko} bloquant(s), ${at.length - ko} à surveiller. ${(g => g ? `<a href="#" data-nav="${esc(g.id)}">Règles et seuils</a>` : "Règles et seuils : guide du portail.")(WerbGuides.guides().find(x => /tableau_de_bord_grc/i.test(x.fichier)))}</p>
      ${at.length ? `<ul class="grc-todo">${at.map(a => { const retard = a.ech && a.ech < grcAuj();
        return `<li data-sev="${a.sev}"${retard ? " data-retard" : ""}><span class="grc-bar"></span><span class="t">${esc(a.t)}</span><span class="ech">${a.ech ? `${retard ? "en retard · " : ""}${esc(frDate(a.ech))}` : ""}</span>
          <span class="meta">${a.site ? `<a href="#" class="chip" data-site="${esc(a.site)}">📍 ${esc(a.site)}</a>` : `<span class="chip">🏢 Groupe</span>`}<span class="badge">${esc(libelleModule(a.src))}</span><span>${esc(a.d)}</span></span></li>`; }).join("")}</ul>`
        : `<p class="muted">Rien à traiter sur ce périmètre d'après les publications lues.</p>`}</section>
      <div class="grc-pile">
      <section class="card" data-grc-conformite>${titre("✅", "Conformité par référentiel", "cyan")}
        <div class="tablewrap"><table class="t grc-cmp">${thSites}<tbody>
        ${conf.map(c => `<tr><td>${esc(c.ref)}<div class="small muted">${esc(c.src)}</div></td>${tous.map(s => { const v = c.v[s.code];
          return `<td class="${GRC.perimetre === s.code ? "on" : ""}">${v === null || v === undefined ? `<span class="small muted">non publié</span>` : `<div class="grc-jauge" data-etat="${etatCmp(v)}"><span class="rail"><i style="width:${Math.max(0, Math.min(100, v))}%"></i></span><b>${v} %</b></div>`}</td>`; }).join("")}</tr>`).join("")}
        </tbody></table></div><p class="small muted">Cible du groupe : ${GRC_CIBLE} %. Socle : mesures du groupe appliquées d'après les synthèses IEC 62443 ; NIS2 : (OK + PL +) / mesures applicables.</p></section>
      <section class="card" data-grc-hygiene>${titre("🛠️", "Hygiène et exploitation", "orange")}
        <div class="tablewrap"><table class="t grc-cmp">${thSites}<tbody>
        ${GRC_HYG.map(x => `<tr><td>${esc(x.lib)}<div class="mono small muted">${esc(x.obj)}</div></td>${tous.map(s => { const v = x.f(s.code);
          const e = v === null ? "na" : x.pct ? (v >= GRC_CIBLE ? "ok" : v >= 50 ? "warn" : "ko") : v === 0 ? "ok" : x.grave ? "ko" : "warn";
          return `<td class="n${GRC.perimetre === s.code ? " on" : ""}"><span class="grc-etat" data-etat="${e}"${v === null ? ` title="Rien de publié par ce module pour le site"` : ""}>${v === null ? "—" : x.pct ? v + " %" : v}</span></td>`; }).join("")}</tr>`).join("")}
        </tbody></table></div></section></div></div>`;
    // Matrice gravité × vraisemblance, liée à la liste des risques
    const dansCase = x => { const [g, v] = grcPos(x); return !GRC.cellule || (g === GRC.cellule[0] && v === GRC.cellule[1]); };
    const liste = risques.filter(dansCase).sort((a, b) => grcPos(b)[2] - grcPos(a)[2] || grcPos(b)[0] - grcPos(a)[0]);
    let mx = "";
    for (let g = E2.G; g >= 1; g--) {
      mx += `<span class="ax">${g}</span>`;
      for (let v = 1; v <= E2.V; v++) {
        const n = risques.filter(x => { const [a, b] = grcPos(x); return a === g && b === v; }).length, on = !!GRC.cellule && GRC.cellule[0] === g && GRC.cellule[1] === v, niv = E2.niveau(g, v);
        mx += `<button type="button" data-act="grcCase" data-g="${g}" data-v="${v}" data-t="${E2.teinte(niv)}" class="${n ? "" : "zero"}" aria-pressed="${on}" aria-label="Gravité ${g}, vraisemblance ${v} : ${n} risque(s), ${esc(E2.lib(niv))}">${n}</button>`;
      }
    }
    mx += `<span></span>${Array.from({ length: E2.V }, (_, i) => `<span class="ax">${i + 1}</span>`).join("")}`;
    h += `<section class="card" data-grc-risques><div class="row">${titre("⚠️", "Risques", "rouge")}<span class="spacer"></span>
        <span class="grc-seg" role="group" aria-label="Cotation affichée"><button type="button" data-act="grcVue" data-v="res" aria-pressed="${GRC.vue === "res"}">Résiduel</button><button type="button" data-act="grcVue" data-v="brut" aria-pressed="${GRC.vue === "brut"}">Brut</button></span></div>
      ${risques.length ? `<div class="grc-risques"><div class="grc-mxbloc"><div class="grc-mx" style="--g:${E2.G};--v:${E2.V}">${mx}</div><div class="grc-axes small muted"><span>↑ Gravité</span><span>Vraisemblance →</span></div>
        <div class="grc-leg small">${Array.from({ length: E2.N }, (_, i) => `<span><i data-t="${E2.teinte(i + 1)}"></i>${esc(E2.lib(i + 1))}</span>`).join("")}</div>
        ${E2.matrice ? "" : `<p class="small muted" data-grc-estimee>Matrice du groupe non publiée (WerbEBIOS 1.21.0, niveau groupe › Publier) : niveaux des cases estimés.</p>`}</div>
        <div class="grc-liste"><p class="small muted">${GRC.cellule ? `Case G${GRC.cellule[0]} × V${GRC.cellule[1]} : ${liste.length} risque(s) · <a href="#" data-act="grcCase">Tout afficher</a>` : `${liste.length} risque(s) ${GRC.vue === "res" ? "résiduels" : "bruts"}, du plus élevé au plus faible`}</p>
        <div class="tablewrap"><table class="t"><thead><tr><th>Site</th><th>Risque</th><th>Scénario</th><th class="n">G</th><th class="n">V</th><th>Niveau</th><th>Traitement</th><th>Acceptation</th></tr></thead><tbody>
        ${liste.map(x => { const [g, v, n] = grcPos(x), r = x.r, acc = r.acceptation === "expiree" ? badge("expirée", "b-ko") : r.acceptation === "acceptee" ? badge(r.accepteJusqua ? `jusqu'au ${frDate(r.accepteJusqua)}` : "acceptée", "b-ok") : r.acceptation === "a-faire" ? badge("à accepter", "b-warn") : `<span class="small muted">—</span>`;
          return `<tr><td><a href="#" data-site="${esc(x.site)}">${esc(x.site)}</a></td><td class="mono" style="white-space:nowrap">${esc(r.id)}</td><td>${esc(r.libelle || "")}</td><td class="n">${g || "—"}</td><td class="n">${v || "—"}</td>
            <td><span class="grc-niv" data-t="${E2.teinte(n)}">${esc(E2.lib(n))}</span></td><td>${r.traitement === "a-decider" ? badge("À décider", "b-ko") : esc(LIB_TRAIT[r.traitement] || r.traitement || "")}</td><td>${acc}</td></tr>`; }).join("") || `<tr><td colspan="8" class="empty">Aucun risque dans cette case.</td></tr>`}
        </tbody></table></div></div></div>` : `<p class="muted">Aucune synthèse de risques publiée sur ce périmètre (WerbEBIOS, base de site › Intégration WerbSMSI › Publier).</p>`}
      <p class="small muted">Lu dans <code>site:syntheseRisques</code> (WerbEBIOS) · échelles et matrice <code>groupe:echelles</code>.</p></section>`;
    // Fraîcheur des publications
    const cols = GRC.perimetre === "tous" ? ["Groupe", ...sites.map(s => s.code)] : sites.map(s => s.code);
    const mods = [...new Set(pubs.map(p => p.module))].sort((a, b) => libelleModule(a).localeCompare(libelleModule(b), "fr"));
    h += `<section class="card" data-grc-fraicheur>${titre("🕒", "Fraîcheur des publications", "ardoise")}<p class="small muted">Au-delà de ${GRC_FRAIS} jours, la synthèse publiée peut être dépassée.</p>
      ${mods.length ? `<div class="tablewrap"><table class="t"><thead><tr><th>Module</th>${cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>
      ${mods.map(m => `<tr><td>${esc(libelleModule(m))}</td>${cols.map(c => { const p = pubs.find(x => x.ou === c && x.module === m); if (!p) return `<td><span class="small muted">—</span></td>`;
        const j = grcJours(p.le), e = j > GRC_FRAIS ? "ko" : j > GRC_PROCHE ? "warn" : "ok";
        return `<td style="white-space:nowrap"><span class="grc-dot" data-etat="${e}"></span>${esc(frDate(String(p.le).slice(0, 10)))} <span class="small muted">· ${j <= 0 ? "aujourd'hui" : j + " j"}</span></td>`; }).join("")}</tr>`).join("")}
      </tbody></table></div>` : `<p class="muted">Aucune publication.</p>`}</section>`;
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
      const ETATS = { couverte: ["Couverte", "b-ok"], arevoir: ["À revoir", "b-warn"], encours: ["En cours", "b-info"], non: ["Non couverte", "b-ko"], na: ["Non applicable", "b-muted"] };
      h += `<div class="card" data-carto-site>${titre("🗺️", "Schémas d'architecture", "cyan")}<table class="t"><thead><tr><th>Exigence</th><th>Couverture</th><th>Schémas en vigueur</th></tr></thead><tbody>
        ${ca.map(x => `<tr><td><b>${esc(x.id)}</b> — ${esc(x.libelle)}</td><td>${badge((ETATS[x.etat] || [x.etat])[0], (ETATS[x.etat] || [])[1] || "")}</td>
          <td class="small">${x.etat === "na" && x.nonApplicable ? `${esc(x.nonApplicable.justification || "")} <span class="muted">(décidée par ${esc(x.nonApplicable.decidePar || "?")}${x.nonApplicable.decideLe ? ` le ${esc(frDate(x.nonApplicable.decideLe))}` : ""})</span>` : (x.schemas || []).map(y => `${esc(y.id)} ${esc(y.titre)} (v${esc(y.version)}${y.prochaineRevue ? `, revue ${esc(frDate(y.prochaineRevue))}` : ""})`).join("<br>") || `<span class="muted">aucun</span>`}</td></tr>`).join("")}</tbody></table>
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
| \`werbsmsi.groupe.json\`, \`werbsmsi.comptes.json\`, \`publications/\` | lecture-écriture | lecture | lecture |
| \`groupe/\` | lecture-écriture | aucun | aucun |
| \`sites/X/\` | lecture (écriture si le groupe administre) | lecture-écriture | aucun |

- \`modeles/\` contient le modèle Word d'entreprise commun (\`Modele_entete.docx\`), lu par tous les modules : lecture pour tous, écriture pour l'équipe SMSI groupe.
- \`werbsmsi.comptes.json\` (comptes et droits, mots de passe chiffrés) : seule l'équipe SMSI groupe l'écrit ; c'est ce droit d'écriture qui permet de créer le premier compte administrateur.
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
    // Sources publiques du groupe : catalogue de départ publié d'emblée (groupe:sourcesPubliques), à compléter dans ⚙️ Administration
    let sources = 0;
    try {
      const l = (window.WERB_SOURCES_DEFAUT || []).map(spNorm);
      if (l.length) { await E.publier({ niveau: "groupe", objets: { sourcesPubliques: l }, utilisateur: f.responsable.trim() || "Portail WerbSMSI" }); sources = l.length; }
    } catch (e) { /* espace créé : les sources se publient ensuite depuis ⚙️ Administration › Sources publiques */ }
    return { nom: `${parent.name}/${nomDossier}`, sites: sites.length, sources };
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

  VUES.modeles = () => {
    const m = P.modeles, types = [...new Set(MODELES.map(x => x.type))];
    const etat = x => !x.espace ? `<span class="small muted">pas à déposer</span>` : !E.ouvert || !m ? `<span class="small muted">espace non ouvert</span>`
      : m.fichiers[x.espace] ? `${badge("présent", "b-ok")} <span class="small muted">${esc(frDate(new Date(m.fichiers[x.espace].modifie).toISOString()))}</span>` : badge("absent", "b-warn");
    const connus = new Set(MODELES.map(x => x.espace).filter(Boolean));
    const autres = m ? Object.keys(m.fichiers).filter(f => !connus.has(f) && !/^modeles\/[^/]+\.(png|jpe?g|svg)$/i.test(f)) : [];
    const absents = m && E.ouvert ? MODELES.filter(x => x.espace && !m.fichiers[x.espace]) : [];
    return `<h1>📄 Modèles de documents</h1><p class="sub">Les modèles Word, Visio et Excel de l'environnement : à quoi ils servent, quels modules les utilisent et où les déposer dans l'espace.</p>
      <div class="infobox small">Référence des modèles : dossier <code>WerbSMSI/Modeles_docs/</code> de l'environnement (inventaire <code>README.md</code>). Dans l'espace du groupe, déposez le modèle Word dans <code>modeles/</code> et les modèles Visio dans <code>modeles/schemas/</code> : lecture pour tous, écriture pour l'équipe SMSI du groupe. Les modules copient le modèle Word dans leur base (« Modèle commun de l'espace ») ; WerbCartoSI lit les modèles Visio sans les copier.</div>
      ${E.ouvert && m ? (absents.length ? `<div class="warnbox small">${absents.length} modèle(s) à déposer dans l'espace « ${esc((P.groupe || {}).organisation || "")} » : ${absents.map(x => `<code>${esc(x.espace)}</code>`).join(", ")}.</div>` : `<div class="infobox small">Tous les modèles à déposer sont présents dans l'espace « ${esc((P.groupe || {}).organisation || "")} ».</div>`)
        : `<p class="small muted">Ouvrez l'espace (🏢 Groupe) pour vérifier la présence des modèles dans <code>modeles/</code>.</p>`}
      ${types.map(ty => `<div class="card" data-modeles-type="${esc(ty)}">${titre({ Word: "📝", Visio: "🗺️", Excel: "📊", JSON: "📚" }[ty] || "📄", ty === "JSON" ? "Fichiers de données (JSON)" : `Modèles ${ty}`, { Word: "bleu", Visio: "cyan", Excel: "vert", JSON: "olive" }[ty] || "ardoise")}
        <div class="tablewrap"><table class="t"><thead><tr><th style="width:24%">Modèle</th><th>À quoi il sert</th><th style="width:18%">Modules</th><th style="width:20%">Emplacement dans l'espace</th><th style="width:12%">Espace ouvert</th></tr></thead><tbody>
        ${MODELES.filter(x => x.type === ty).map(x => `<tr data-modele="${esc(x.fichier)}"><td><b>${esc(x.titre)}</b><div class="small mono muted">Modeles_docs/${esc(x.fichier)}</div></td>
          <td>${esc(x.role)}${x.balises && x.balises.length ? `<div class="small muted">Balises : ${x.balises.map(b => `{{${esc(b)}}}`).join(" ")}</div>` : ""}</td>
          <td class="small">${esc((x.modules || []).join(", "))}</td><td class="small mono">${x.espace ? esc(x.espace) : "—"}</td><td>${etat(x)}</td></tr>`).join("")}</tbody></table></div></div>`).join("")
        || `<div class="infobox">Aucun inventaire de modèles dans ce portail (Modeles_docs/modeles.json absent à l'assemblage).</div>`}
      ${autres.length ? `<div class="card"><h2>Autres fichiers des dossiers de modèles</h2><p class="small muted">Présents dans l'espace, absents de l'inventaire : modèles propres au groupe, ou fichiers à ranger.</p><ul>${autres.map(f => `<li class="mono small">${esc(f)}</li>`).join("")}</ul></div>` : ""}`;
  };
  VUES.verif = () => {
    const v = P.verif;
    let h = `<h1>🔏 Vérification des modules</h1><p class="sub">Compare l'empreinte SHA-256 de chaque livrable publié à celle enregistrée dans le portail lors de son assemblage.</p>
      <div class="row" style="margin-bottom:12px"><button class="primary" data-act="verifier"${E.disponible ? "" : " disabled"}>Choisir le dossier WerbSMSI…</button></div>`;
    if (!v) return h + `<div class="infobox small">Choisissez le dossier <code>WerbSMSI</code> (celui qui contient <code>registre_modules.json</code>). Il est lu, jamais modifié.</div>`;
    return h + `<div class="card"><p class="small muted">Dossier ${esc(v.dossier)} · vérifié le ${esc(frDate(v.le))}</p><table class="t"><thead><tr><th>Module</th><th>Version</th><th>Livrable</th><th>Résultat</th><th>Empreinte calculée</th></tr></thead><tbody>
      ${v.resultats.map(x => `<tr><td>${esc(x.produit)}</td><td>${esc(x.version)}</td><td class="mono">${esc(x.chemin)}</td><td>${badge(x.etat, x.ok ? "b-ok" : "b-ko")}</td><td class="mono">${esc(x.calcule || "")}</td></tr>`).join("") || `<tr><td colspan="5" class="empty">Aucun module publié.</td></tr>`}
      </tbody></table></div>`;
  };

  VUES.apropos = () => `<h1>ℹ️ À propos</h1><p class="sub">${esc(WERB.description)}</p><div class="card"><table class="t"><tbody>
    <tr><td class="muted" style="width:220px">Produit</td><td><strong>${esc(WERB.produit)}</strong> v${esc(WERB.version)} (build ${esc(window.BUILD_DATE)})</td></tr>
    <tr><td class="muted">Auteur</td><td>${esc(WERB.signature)}</td></tr>
    <tr><td class="muted">Charte</td><td>${esc(WERB.charte)} · socle ${esc(WerbSocle.VERSION)}</td></tr>
    <tr><td class="muted">Registre intégré</td><td>${REG.modules.length} module(s), assemblé en ${esc(REG.assembleLe)}</td></tr>
    <tr><td class="muted">Fonctionnement</td><td>Hors ligne. Aucune donnée conservée dans le navigateur ; le dossier de l'espace est redemandé à chaque session. Écriture seulement sur action explicite : création d'un espace ou d'un site, déclaration d'une base.</td></tr>
  </tbody></table></div><div class="infobox small">Intégrité : comparez l'empreinte de <code>WerbSMSI.html</code> à celle publiée dans <code>portail/WerbSMSI.sha256</code>.<br>Sous Windows, sans droits administrateur : <code>Get-FileHash .\\WerbSMSI.html</code></div>`;

  /* ===================================================== rendu */
  function renderTopbar() {
    const u = $("#tb-user");
    if (u && E.ouvert && connecte()) u.innerHTML = `<button class="tb-user" data-act="monCompte" title="${esc(`Connecté(e) : ${P.compte.login}. Mon compte, mot de passe, déconnexion.`)}">👤 ${esc(P.compte.nom)}</button>`;
    else if (u && E.ouvert && P.groupe) u.innerHTML = `<span class="tb-user anonyme">🔐 Connexion requise</span>`;
    else if (u) u.innerHTML = `<button class="tb-user${P.utilisateur ? "" : " anonyme"}" data-act="identifier" title="${esc(P.utilisateur
      ? `Identifié(e) : ${P.utilisateur}. Les modules ouverts depuis le portail ne redemandent pas votre nom. Cliquer pour changer.`
      : "Indiquez votre nom une fois : les modules ouverts depuis le portail ne le redemanderont pas.")}">👤 ${esc(P.utilisateur || "S'identifier")}</button>`;
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
    if (id === "recueil") { ouvrirRecueil(); return; }        // nouvel onglet : la page du portail ne change pas
    if (id.startsWith("site:")) { P.vue = "site"; P.site = id.slice(5); } else P.vue = id;
    render(); $("#main").scrollTop = 0;
  } });
  function renderNav() {
    const sites = P.groupe ? P.groupe.sites || [] : [];
    const attente = E.ouvert && !!P.groupe && !connecte(), sitesVus = sites.filter(s => !connecte() || voitSite(s.code));
    const tGroupe = [...(voitGroupe() || sitesVus.length ? [["grc", "Tableau de bord GRC"]] : []), ...(voitGroupe() ? [["groupe", P.groupe.sigle || "Vue groupe"]] : [])];
    const tAdmin = E.ouvert ? (adminEspace() ? [["comptes", "Comptes et droits"], ["sauvegarde", "Sauvegarde et restauration"], ["listes", "Listes de choix du groupe"], ["sources", "Sources publiques"], ["parametres", "Paramètres"]] : [])
      : [["sauvegarde", "Sauvegarde et restauration"], ["listes", "Listes de choix du groupe"], ["sources", "Sources publiques"], ["parametres", "Paramètres"]];
    MENU.splice(0, MENU.length, { g: "accueil", i: "🏠", l: "Accueil", c: "bleu", t: [["accueil", "Rubriques et modules"]] },
      ...(P.groupe && !attente ? [...(tGroupe.length ? [{ g: "groupe", i: "🏢", l: "Groupe", c: "violet", t: tGroupe }] : []),
        ...(sitesVus.length ? [{ g: "sites", i: "📍", l: "Sites", c: "vert", t: sitesVus.map(s => ["site:" + s.code, s.code]) }] : [])] : []),
      ...(attente ? [] : [{ g: "outils", i: "🛠️", l: "Outils", c: "orange", t: [...(!E.ouvert || adminEspace() ? [["assistant", "Mise en place"]] : []), ["verif", "Vérifier les modules"], ["modeles", "Modèles de documents"]] },
        ...(tAdmin.length ? [{ g: "admin", i: "⚙️", l: "Administration", c: "ardoise", t: tAdmin }] : [])]),
      { g: "aide", i: "❓", l: "Aide", c: "olive", t: [...WerbGuides.entrees().filter(([id]) => guideEnRoute() && id === guideEnRoute().id), ["recueil", "📚 Recueil de tous les guides ↗"], ...WerbGuides.entrees().filter(([id]) => !guideEnRoute() || id !== guideEnRoute().id), ...((window.WERB_MEDIAS || {}).infographie_demarrer ? [["infographie", "Infographie : démarrer"]] : []), ["apropos", "À propos"]] });
    const cnt = Object.fromEntries(sites.filter(s => !(P.sites[s.code] || {}).accessible).map(s => ["site:" + s.code, "🔒"]));
    menu.rendre({ actif: attente ? "" : P.vue === "site" ? "site:" + P.site : P.vue, compteurs: cnt,
      pied: `<footer class="sig"><strong>${esc(WERB.produit)}</strong><br>${esc(WERB.signature)}<br>v${esc(WERB.version)} · ${esc(window.BUILD_DATE)}</footer>` });
  }
  function render() {
    renderTopbar(); renderNav();
    const m = $("#main");
    if (P.chargement) { m.innerHTML = `<p class="muted">Lecture de l'espace…</p>`; return; }
    if (E.ouvert && P.compte && !connecte()) { fermerSession(); P.messageConnexion = `Session expirée (${CPT.TICKET_H} h) : reconnectez-vous.`; }
    let vue = (P.vue === "groupe" || P.vue === "site") && !P.groupe ? "accueil" : P.vue;
    if (E.ouvert && P.groupe && !connecte()) vue = "connexion";
    else if (!autorise(vue)) vue = "refuse";
    m.innerHTML = VUES[vue]();
    if (vue === "accueil") setTimeout(proposerIdentification, 0);   // identification, puis invitation à ouvrir l'espace de démonstration
  }

  /* ===================================================== actions */

  /* ===================================================== sauvegarde et restauration de l'espace (⚙️ Administration) */
  // Archive .zip : les fichiers de l'espace octet pour octet, et le manifeste werbsmsi.sauvegarde.json (chemins, tailles, dates,
  // empreintes SHA-256, versions des modules, date et auteur). Écrite dans le fichier choisi par l'utilisateur et relue depuis le
  // fichier qu'il choisit : rien n'est conservé dans le navigateur (charte §1). Restauration : fichier par fichier, jamais sur une
  // base verrouillée (§5.7), seulement dans l'espace d'origine (même groupeId), après contrôle des empreintes de l'archive.
  const MANIFESTE = "werbsmsi.sauvegarde.json";
  // chiffrer : case « Chiffrer l'archive » (proposée par défaut) ; mdp : mot de passe validé pour la session (mémoire seulement) ;
  // saisie : champs en cours de frappe ; attente : archive chiffrée lue, en attente de son mot de passe
  const SV = { perimetre: "complet", auteur: "", derniere: null, archive: null, restauration: null, travail: false,
    chiffrer: true, mdp: "", saisie: { m: "", m2: "" }, attente: null };
  const TYPES_ZIP = [{ description: "Sauvegarde WerbSMSI", accept: { "application/zip": [".zip"] } }];
  const enOctets = s => new TextEncoder().encode(s);
  const enTexte = u => new TextDecoder().decode(u);
  const taille = n => n >= 1048576 ? `${(n / 1048576).toFixed(1)} Mo` : n >= 1024 ? `${Math.round(n / 1024)} Ko` : `${n} o`;
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = u => { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = CRC[(c ^ u[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const flux = (u, t) => new Response(new Blob([u]).stream().pipeThrough(t)).arrayBuffer().then(b => new Uint8Array(b));
  /* Chiffrement facultatif de l'archive : format zip AES-256 de WinZip (AE-1), lu par 7-Zip et WinZip. Par fichier : sel aléatoire
     de 16 octets, PBKDF2-HMAC-SHA1 (1 000 itérations, valeur fixée par le format) → clé AES-256, clé HMAC et 2 octets de contrôle
     du mot de passe ; AES en mode compteur (compteur petit-boutiste à partir de 1, imposé par le format, donc calculé ici : WebCrypto
     ne le propose pas) ; code d'authentification HMAC-SHA1 tronqué à 10 octets. Les noms des fichiers restent lisibles, pas leur contenu.
     Le mot de passe n'est gardé qu'en mémoire, le temps de la session ; il n'est écrit nulle part. */
  const MDP_MIN = 12;
  const AES = (() => {
    const S = new Uint8Array(256), T = [0, 1, 2, 3].map(() => new Uint32Array(256));
    const rotl8 = (x, s) => ((x << s) | (x >>> (8 - s))) & 255, xt = a => ((a << 1) ^ (a & 128 ? 0x1b : 0)) & 255;
    let p = 1, q = 1;
    do {
      p = p ^ xt(p);
      q ^= q << 1; q ^= q << 2; q ^= q << 4; q &= 255; if (q & 128) q ^= 0x09;
      S[p] = (q ^ rotl8(q, 1) ^ rotl8(q, 2) ^ rotl8(q, 3) ^ rotl8(q, 4) ^ 0x63) & 255;
    } while (p !== 1);
    S[0] = 0x63;
    for (let x = 0; x < 256; x++) {
      const s = S[x], s2 = xt(s), w = ((s2 << 24) | (s << 16) | (s << 8) | (s2 ^ s)) >>> 0;
      T[0][x] = w; T[1][x] = ((w >>> 8) | (w << 24)) >>> 0; T[2][x] = ((w >>> 16) | (w << 16)) >>> 0; T[3][x] = ((w >>> 24) | (w << 8)) >>> 0;
    }
    const sub = t => ((S[t >>> 24] << 24) | (S[(t >>> 16) & 255] << 16) | (S[(t >>> 8) & 255] << 8) | S[t & 255]) >>> 0;
    function cle(k) {
      const nk = k.length / 4, nr = nk + 6, w = new Uint32Array(4 * (nr + 1)); let rc = 1;
      for (let i = 0; i < nk; i++) w[i] = ((k[4 * i] << 24) | (k[4 * i + 1] << 16) | (k[4 * i + 2] << 8) | k[4 * i + 3]) >>> 0;
      for (let i = nk; i < w.length; i++) {
        let t = w[i - 1];
        if (i % nk === 0) { t = (sub(((t << 8) | (t >>> 24)) >>> 0) ^ (rc << 24)) >>> 0; rc = xt(rc); }
        else if (nk > 6 && i % nk === 4) t = sub(t);
        w[i] = (w[i - nk] ^ t) >>> 0;
      }
      return { w, nr };
    }
    // Chiffre un bloc donné en 4 mots gros-boutistes ; écrit les 16 octets dans out
    function bloc({ w, nr }, a, b, c, d, out) {
      const [T0, T1, T2, T3] = T;
      let s0 = a ^ w[0], s1 = b ^ w[1], s2 = c ^ w[2], s3 = d ^ w[3];
      for (let r = 1; r < nr; r++) {
        const k = 4 * r;
        const t0 = T0[s0 >>> 24] ^ T1[(s1 >>> 16) & 255] ^ T2[(s2 >>> 8) & 255] ^ T3[s3 & 255] ^ w[k];
        const t1 = T0[s1 >>> 24] ^ T1[(s2 >>> 16) & 255] ^ T2[(s3 >>> 8) & 255] ^ T3[s0 & 255] ^ w[k + 1];
        const t2 = T0[s2 >>> 24] ^ T1[(s3 >>> 16) & 255] ^ T2[(s0 >>> 8) & 255] ^ T3[s1 & 255] ^ w[k + 2];
        const t3 = T0[s3 >>> 24] ^ T1[(s0 >>> 16) & 255] ^ T2[(s1 >>> 8) & 255] ^ T3[s2 & 255] ^ w[k + 3];
        s0 = t0; s1 = t1; s2 = t2; s3 = t3;
      }
      const k = 4 * nr, f = (x, y, z, v, m) => ((S[x >>> 24] << 24) | (S[(y >>> 16) & 255] << 16) | (S[(z >>> 8) & 255] << 8) | S[v & 255]) ^ m;
      const o = [f(s0, s1, s2, s3, w[k]), f(s1, s2, s3, s0, w[k + 1]), f(s2, s3, s0, s1, w[k + 2]), f(s3, s0, s1, s2, w[k + 3])];
      for (let i = 0; i < 4; i++) { out[4 * i] = o[i] >>> 24; out[4 * i + 1] = (o[i] >>> 16) & 255; out[4 * i + 2] = (o[i] >>> 8) & 255; out[4 * i + 3] = o[i] & 255; }
    }
    // Mode compteur de WinZip : bloc n (à partir de 1) = n en petit-boutiste sur 16 octets ; chiffrer et déchiffrer sont la même opération
    function ctr(k, u) {
      const ks = cle(k), r = new Uint8Array(u.length), flux = new Uint8Array(16);
      for (let i = 0, n = 1; i < u.length; i += 16, n++) {
        const lo = n >>> 0, hi = Math.floor(n / 4294967296) >>> 0, be = x => ((x & 255) << 24 | ((x >>> 8) & 255) << 16 | ((x >>> 16) & 255) << 8 | (x >>> 24)) >>> 0;
        bloc(ks, be(lo), be(hi), 0, 0, flux);
        for (let j = 0; j < 16 && i + j < u.length; j++) r[i + j] = u[i + j] ^ flux[j];
      }
      return r;
    }
    return { cle, bloc, ctr };
  })();
  // Clés d'un fichier : 32 octets AES, 32 octets HMAC, 2 octets de contrôle du mot de passe (AES-256)
  async function clesAes(mdp, sel) {
    const base = await crypto.subtle.importKey("raw", enOctets(mdp), "PBKDF2", false, ["deriveBits"]);
    const b = new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: sel, iterations: 1000, hash: "SHA-1" }, base, 66 * 8));
    return { aes: b.slice(0, 32), mac: b.slice(32, 64), controle: b.slice(64, 66) };
  }
  const hmac10 = async (cle, u) => new Uint8Array(await crypto.subtle.sign("HMAC", await crypto.subtle.importKey("raw", cle, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]), u)).slice(0, 10);
  // Données d'un fichier chiffré : sel (16) + contrôle (2) + données chiffrées + code d'authentification (10)
  async function chiffrerAes(mdp, u) {
    const sel = crypto.getRandomValues(new Uint8Array(16)), k = await clesAes(mdp, sel), c = AES.ctr(k.aes, u), m = await hmac10(k.mac, c);
    const r = new Uint8Array(16 + 2 + c.length + 10);
    r.set(sel, 0); r.set(k.controle, 16); r.set(c, 18); r.set(m, 18 + c.length);
    return r;
  }
  async function dechiffrerAes(mdp, u, nom) {
    if (!mdp) { const e = new Error("Archive chiffrée : mot de passe nécessaire."); e.code = "MDP"; throw e; }
    if (u.length < 28) throw new Error(`${nom} : contenu chiffré tronqué.`);
    const k = await clesAes(mdp, u.subarray(0, 16));
    if (k.controle[0] !== u[16] || k.controle[1] !== u[17]) { const e = new Error("Mot de passe incorrect."); e.code = "MDP"; throw e; }
    const c = u.subarray(18, u.length - 10), m = await hmac10(k.mac, c);
    if (m.some((x, i) => x !== u[u.length - 10 + i])) throw new Error(`${nom} : contenu chiffré endommagé (code d'authentification).`);
    return AES.ctr(k.aes, c);
  }
  // Champ extra 0x9901 : version AE-1, éditeur « AE », AES-256, méthode de compression réelle
  const extraAes = meth => { const x = new DataView(new ArrayBuffer(11)); x.setUint16(0, 0x9901, true); x.setUint16(2, 7, true); x.setUint16(4, 1, true); x.setUint8(6, 0x41); x.setUint8(7, 0x45); x.setUint8(8, 3); x.setUint16(9, meth, true); return new Uint8Array(x.buffer); };
  const controleMdp = (m, m2) => !m ? "Saisissez le mot de passe de chiffrement." : m.length < MDP_MIN ? `Mot de passe trop court : ${MDP_MIN} caractères au moins.` : m !== m2 ? "La confirmation ne correspond pas au mot de passe." : "";
  const heureDos = ms => { const d = new Date(ms || Date.now()); return [(d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1), Math.max(0, d.getFullYear() - 1980) << 9 | (d.getMonth() + 1) << 5 | d.getDate()]; };

  // Archive zip (noms UTF-8, compression deflate si le navigateur la fournit et qu'elle réduit le fichier) : [{ chemin, data, modifie }] ;
  // avec un mot de passe, chaque fichier est chiffré en AES-256 (méthode 99, champ extra 0x9901, CRC conservé : AE-1)
  async function zipper(entrees, mdp = "") {
    const parts = [], central = []; let pos = 0;
    for (const e of entrees) {
      const nom = enOctets(e.chemin), crc = crc32(e.data);
      let data = e.data, meth = 0;
      if (typeof CompressionStream === "function" && e.data.length > 64) {
        try { const z = await flux(e.data, new CompressionStream("deflate-raw")); if (z.length < e.data.length) { data = z; meth = 8; } } catch (x) { /* sans compression */ }
      }
      const extra = mdp ? extraAes(meth) : new Uint8Array(0), methZip = mdp ? 99 : meth, drapeaux = 0x0800 | (mdp ? 1 : 0), vers = mdp ? 51 : 20;
      if (mdp) data = await chiffrerAes(mdp, data);
      const [heure, jour] = heureDos(e.modifie);
      const l = new DataView(new ArrayBuffer(30));
      l.setUint32(0, 0x04034b50, true); l.setUint16(4, vers, true); l.setUint16(6, drapeaux, true); l.setUint16(8, methZip, true); l.setUint16(10, heure, true); l.setUint16(12, jour, true);
      l.setUint32(14, crc, true); l.setUint32(18, data.length, true); l.setUint32(22, e.data.length, true); l.setUint16(26, nom.length, true); l.setUint16(28, extra.length, true);
      parts.push(l.buffer, nom, extra, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, vers, true); c.setUint16(6, vers, true); c.setUint16(8, drapeaux, true); c.setUint16(10, methZip, true); c.setUint16(12, heure, true); c.setUint16(14, jour, true);
      c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, e.data.length, true); c.setUint16(28, nom.length, true); c.setUint16(30, extra.length, true); c.setUint32(42, pos, true);
      central.push(c.buffer, nom, extra);
      pos += 30 + nom.length + extra.length + data.length;
    }
    const tc = central.reduce((s, x) => s + (x.byteLength ?? x.length), 0), f = new DataView(new ArrayBuffer(22));
    f.setUint32(0, 0x06054b50, true); f.setUint16(8, entrees.length, true); f.setUint16(10, entrees.length, true); f.setUint32(12, tc, true); f.setUint32(16, pos, true);
    return new Blob([...parts, ...central, f.buffer], { type: "application/zip" });
  }
  // Lecture d'une archive zip : { noms, contient(nom), chiffree, donnees(nom) → Uint8Array } (méthodes 0 et 8, contrôle CRC ;
  // fichiers chiffrés en AES de WinZip, méthode 99, avec le mot de passe)
  function dezipper(buf, mdp = "") {
    const dv = new DataView(buf); let e = buf.byteLength - 22;
    while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error("Ce fichier n'est pas une archive .zip.");
    const n = dv.getUint16(e + 10, true), table = new Map(); let o = dv.getUint32(e + 16, true);
    for (let i = 0; i < n; i++) {
      if (dv.getUint32(o, true) !== 0x02014b50) throw new Error("Archive endommagée (répertoire central).");
      const nl = dv.getUint16(o + 28, true), xl = dv.getUint16(o + 30, true), cl = dv.getUint16(o + 32, true);
      const ent = { meth: dv.getUint16(o + 10, true), crc: dv.getUint32(o + 16, true), csz: dv.getUint32(o + 20, true), usz: dv.getUint32(o + 24, true), lo: dv.getUint32(o + 42, true) };
      for (let x = o + 46 + nl, fin = x + xl; x + 4 <= fin; x += 4 + dv.getUint16(x + 2, true)) {
        if (dv.getUint16(x, true) === 0x9901) ent.aes = { version: dv.getUint16(x + 4, true), force: dv.getUint8(x + 8), meth: dv.getUint16(x + 9, true) };
      }
      table.set(enTexte(new Uint8Array(buf, o + 46, nl)), ent);
      o += 46 + nl + xl + cl;
    }
    return {
      noms: [...table.keys()], contient: nom => table.has(nom), chiffree: [...table.values()].some(f => f.meth === 99),
      async donnees(nom) {
        const f = table.get(nom); if (!f) return null;
        let brut = new Uint8Array(buf, f.lo + 30 + dv.getUint16(f.lo + 26, true) + dv.getUint16(f.lo + 28, true), f.csz), meth = f.meth;
        if (meth === 99) {
          if (!f.aes || f.aes.force !== 3) throw new Error(`${nom} : chiffrement non pris en charge (AES-256 de WinZip attendu).`);
          brut = await dechiffrerAes(mdp, brut, nom); meth = f.aes.meth;
        }
        const u = meth === 0 ? brut.slice() : meth === 8 ? await flux(brut, new DecompressionStream("deflate-raw")) : null;
        if (!u) throw new Error(`${nom} : méthode de compression non prise en charge.`);
        if (u.length !== f.usz || ((f.meth !== 99 || f.aes.version === 1) && crc32(u) !== f.crc)) throw new Error(`${nom} : contenu endommagé dans l'archive.`);
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
  async function ecrireArchive(nom, entrees, manifeste, mdp = "") {
    let poignee = null;
    if (typeof showSaveFilePicker === "function") poignee = await showSaveFilePicker({ suggestedName: nom, types: TYPES_ZIP });   // AbortError si annulé
    if (mdp) manifeste.meta.chiffrement = "AES-256 (zip WinZip AE-1)";
    const blob = await zipper([{ chemin: MANIFESTE, data: enOctets(JSON.stringify(manifeste, null, 1)), modifie: Date.now() }, ...entrees], mdp);
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
  async function analyserArchive(nom, buf, mdp = "") {
    const z = dezipper(buf, mdp);
    if (!z.contient(MANIFESTE)) throw new Error(`${nom} n'est pas une sauvegarde WerbSMSI (manifeste ${MANIFESTE} absent).`);
    let m; try { m = JSON.parse(enTexte(await z.donnees(MANIFESTE))); } catch (e) { if (e.code === "MDP") throw e; throw new Error("Manifeste illisible : " + e.message); }
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
    const archive = { nom, manifeste: m, fichiers, horsManifeste: z.noms.filter(x => !connus.has(x) && !x.endsWith("/")), le: Date.now(), chiffree: z.chiffree, mdp: z.chiffree ? mdp : "" };
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
        <div class="sv-chiffre" data-sv-chiffre><label class="row"><input type="checkbox" id="svChiffrer"${SV.chiffrer ? " checked" : ""} style="width:auto"> <b>🔐 Chiffrer l'archive avec un mot de passe</b> <span class="small muted">(AES-256, zip standard : s'ouvre aussi avec 7-Zip ou WinZip)</span></label>
          ${!SV.chiffrer ? `<p class="small" style="color:var(--warn)">⚠ Archive en clair : toute personne qui obtient le fichier lit les bases (vulnérabilités, comptes, architecture). À réserver à un support lui-même protégé.</p>`
            : SV.mdp ? `<div class="row small">${badge("🔒 Mot de passe défini pour cette session", "b-ok")}<button class="small" data-act="svMdpChanger">Changer le mot de passe</button></div>`
            : `<div class="grid g2"><label class="f">Mot de passe (${MDP_MIN} caractères au moins)<input type="password" id="svMdp" autocomplete="new-password" spellcheck="false"></label>
              <label class="f">Confirmation<input type="password" id="svMdp2" autocomplete="new-password" spellcheck="false"></label></div>`}
          ${SV.chiffrer ? `<p class="small muted">Le mot de passe est gardé en mémoire le temps de la session, jamais enregistré. <b>Sans lui, l'archive est irrécupérable</b> : rangez-le dans le coffre-fort de mots de passe, jamais à côté de l'archive. Le contenu des fichiers est chiffré ; leurs noms restent lisibles.</p>` : ""}</div>
        <div class="row"><button class="primary" data-act="sauvegarder"${SV.travail ? " disabled" : ""}>💾 Créer l'archive…</button></div>
        ${d ? `<div class="infobox small" style="margin-top:10px">Dernière sauvegarde : <b>${esc(d.nom)}</b>${d.chiffree ? " 🔐 chiffrée" : " (en clair)"} · ${esc(libellePerimetre(d.perimetre))} · ${d.n} fichier(s), ${esc(taille(d.taille))} · ${esc(frDate(d.le))}${d.illisibles.length ? `<br>⚠ Non lisibles, donc non sauvegardés : ${esc(d.illisibles.join(", "))}` : ""}</div>` : ""}`;
    }
    h += `</div><div class="card">${titre("🔎", "Vérifier ou restaurer une archive", "ardoise")}
      <p class="small muted">L'archive est lue en mémoire ; chaque empreinte est recalculée et comparée au manifeste. Rien n'est écrit sans votre choix.</p>
      <div class="row"><button data-act="ouvrirSauvegarde"${SV.travail ? " disabled" : ""}>📂 Choisir une archive…</button></div>`;
    const a = SV.archive, at = SV.attente;
    if (at) h += `<div class="infobox" style="margin-top:10px" data-sv-attente><b>🔐 ${esc(at.nom)}</b> est chiffrée${at.erreur ? ` — <span style="color:var(--ko)">${esc(at.erreur)}</span>` : ""}.
      <div class="row" style="margin-top:6px"><input type="password" id="svMdpLecture" placeholder="Mot de passe de l'archive" autocomplete="off" spellcheck="false" style="max-width:320px">
      <button class="primary" data-act="svDechiffrer"${SV.travail ? " disabled" : ""}>Déchiffrer et vérifier</button><button data-act="svAttenteAnnuler">Annuler</button></div></div>`;
    if (a) {
      const m = a.manifeste.meta || {}, ko = a.fichiers.filter(f => !f.ok);
      h += `<table class="t" style="margin-top:10px"><tbody>
        <tr><td class="muted" style="width:200px">Archive</td><td><b>${esc(a.nom)}</b> ${a.chiffree ? badge("🔐 chiffrée AES-256", "b-ok") : badge("en clair", "b-warn")}</td></tr>
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
          <label class="row small" style="margin-top:10px"><input type="checkbox" id="svAvant" checked style="width:auto"> Sauvegarder d'abord les fichiers qui seront remplacés (recommandé${a.chiffree ? " ; copie chiffrée avec le mot de passe de cette archive" : SV.chiffrer && SV.mdp ? " ; copie chiffrée avec le mot de passe de la session" : ""})</label>
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
      if (SV.auteur && (!SV.chiffrer || SV.mdp)) { await ACTIONS_SAUVEGARDE.sauvegarder(); return; }
      const a = $(SV.auteur ? "#svMdp" : "#svAuteur"); if (a) a.focus();
      toast(SV.auteur ? "Saisissez le mot de passe de chiffrement, puis « Créer l'archive »." : "Indiquez qui réalise la sauvegarde, puis « Créer l'archive ».", "");
    },
    async sauvegarder() {
      const perimetre = $("#svPerim").value, auteur = $("#svAuteur").value.trim();
      Object.assign(SV, { perimetre, auteur });
      if (!auteur) { toast("Indiquez qui réalise la sauvegarde (Réalisée par).", "err"); $("#svAuteur").focus(); return; }
      if (SV.chiffrer && !SV.mdp) {
        const err = controleMdp(SV.saisie.m, SV.saisie.m2);
        if (err) { toast(err, "err"); const c = $(SV.saisie.m && SV.saisie.m.length >= MDP_MIN ? "#svMdp2" : "#svMdp"); if (c) c.focus(); return; }
        SV.mdp = SV.saisie.m; SV.saisie = { m: "", m2: "" };
      }
      const mdp = SV.chiffrer ? SV.mdp : "";
      // Nom : « SIGLE_ » (espace complet, groupe) ou « SIGLE-SITE_ » (un site), charte §7.8
      const sg = (P.groupe.sigle || "SMSI").replace(/[^\w-]+/g, "_");
      const nom = `${perimetre.startsWith("site:") ? `${sg}-${perimetre.slice(5)}` : sg}_Sauvegarde_${perimetre === "complet" ? "complet" : perimetre === "groupe" ? "groupe" : "site"}_${new Date().toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "_")}.zip`;
      SV.travail = true; render();
      try {
        const { fichiers, illisibles } = await collecter(perimetre);
        const entrees = await lireFichiers(fichiers, illisibles);
        const lus = fichiers.filter(f => f.sha256);
        const r = await ecrireArchive(nom, entrees, manifesteDe(perimetre, auteur, lus, illisibles), mdp);
        SV.derniere = { ...r, perimetre, n: lus.length, illisibles, le: Date.now(), chiffree: !!mdp };
        toast(`Sauvegarde créée${mdp ? ", chiffrée" : " en clair"} : ${lus.length} fichier(s).`, "ok");
      } catch (e) { if (e.name !== "AbortError") toast("Sauvegarde impossible : " + e.message, "err"); }
      finally { SV.travail = false; render(); }
    },
    async ouvrirSauvegarde() {
      let f;
      try {
        if (typeof showOpenFilePicker === "function") { const [h] = await showOpenFilePicker({ types: TYPES_ZIP, multiple: false }); f = await h.getFile(); }
        else f = await new Promise((ok, ko) => { const i = Object.assign(document.createElement("input"), { type: "file", accept: ".zip" }); i.onchange = () => i.files[0] ? ok(i.files[0]) : ko(new DOMException("", "AbortError")); i.click(); });
      } catch (e) { if (e.name !== "AbortError") toast(e.message, "err"); return; }
      SV.travail = true; SV.restauration = null; SV.attente = null; render();
      const buf = await f.arrayBuffer();
      // Archive chiffrée : le mot de passe de la session est essayé d'abord, puis demandé
      try { SV.archive = await analyserArchive(f.name, buf, SV.mdp); toast(SV.archive.integre ? "Archive vérifiée : intègre." : "Archive non intègre : voir le détail.", SV.archive.integre ? "ok" : "err"); }
      catch (e) {
        SV.archive = null;
        if (e.code === "MDP") SV.attente = { nom: f.name, buf, erreur: "" }; else toast("Lecture impossible : " + e.message, "err");
      }
      finally { SV.travail = false; render(); const c = $("#svMdpLecture"); if (c) c.focus(); }
    },
    async svDechiffrer() {
      const at = SV.attente, c = $("#svMdpLecture"), mdp = c ? c.value : "";
      if (!at) return;
      if (!mdp) { toast("Saisissez le mot de passe de l'archive.", "err"); if (c) c.focus(); return; }
      SV.travail = true; render();
      try {
        SV.archive = await analyserArchive(at.nom, at.buf, mdp); SV.attente = null;
        toast(SV.archive.integre ? "Archive déchiffrée et vérifiée : intègre." : "Archive non intègre : voir le détail.", SV.archive.integre ? "ok" : "err");
      } catch (e) { if (e.code === "MDP") at.erreur = e.message; else { SV.attente = null; toast("Lecture impossible : " + e.message, "err"); } }
      finally { SV.travail = false; render(); const x = $("#svMdpLecture"); if (x) x.focus(); }
    },
    svAttenteAnnuler() { SV.attente = null; render(); },
    svMdpChanger() { SV.mdp = ""; SV.saisie = { m: "", m2: "" }; render(); const c = $("#svMdp"); if (c) c.focus(); },
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
          const r = await ecrireArchive(`${(P.groupe.sigle || "SMSI").replace(/[^\w-]+/g, "_")}_Avant_restauration_${new Date().toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "_")}.zip`, entrees,
            manifesteDe("complet", SV.auteur || "portail", remplaces.filter(x => x.sha256), ill, `copie avant restauration de ${a.nom}`), a.chiffree ? a.mdp : SV.chiffrer ? SV.mdp : "");
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
    grcPerimetre(el) { GRC.perimetre = el.dataset.p; GRC.cellule = null; render(); },
    grcVue(el) { GRC.vue = el.dataset.v; GRC.cellule = null; render(); },
    grcCase(el, e) { if (e) e.preventDefault(); const k = el.dataset.g ? [+el.dataset.g, +el.dataset.v] : null; GRC.cellule = k && !(GRC.cellule && GRC.cellule[0] === k[0] && GRC.cellule[1] === k[1]) ? k : null; render(); },
    async grcRelire(el, e) { if (e) e.preventDefault(); await chargerEspace(); render(); toast("Publications relues.", "ok"); },
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
        toast(`Espace créé : ${r.nom} (${r.sites} site(s)${r.sources ? `, ${r.sources} sources publiques` : ""}). Appliquez les droits décrits dans DROITS.md.`, "ok");
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
    identifier() { fenetreIdentification(); },
    identValider() { validerIdentification(); },
    identFermer() { fermerIdentification(); },
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
    async fermer() { E.fermer(); fermerSession(); P.comptesData = null; P.comptesErr = ""; P.messageConnexion = ""; await majRaccourci(); Object.assign(P, { vue: "accueil", site: "", groupe: null, pubGroupe: null, sites: {}, basesGroupe: null }); render(); },
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

  /* ===================================================== sources publiques du groupe (⚙️ Administration, charte §5.4)
     Tableau principal des sources publiques (normes, guides, référentiels, réglementation, sites) commun à tous les modules.
     Le brouillon reste en mémoire jusqu'à « Publier », qui écrit l'objet groupe:sourcesPubliques dans publications/werbsmsi.json ;
     les modules (WerbIEC62443…) y reprennent des sources. Tant que rien n'est publié, le catalogue de départ intégré au portail
     (charte/outils/sources_publiques.py : WerbReferentiels et WerbIEC62443) est proposé. Import et export : CSV (Excel, « ; »)
     et JSON. Une source publiée n'est pas supprimée : elle passe au statut « retirée » (ou « remplacée » par une autre), pour que les
     modules qui l'ont reprise le voient. */
  const SP_TYPES = ["Norme", "Guide", "Référentiel", "Réglementation", "Article", "Site", "Autre"];
  const SP_STATUTS = ["en vigueur", "remplacée", "retirée"];
  const SP_REFS = ["ANSSI", "NIS2", "ISO 27001", "IEC 62443", "NIST", "CRA", "RGPD", "Autre"];
  const SP_CHAMPS = [["id", "Identifiant"], ["type", "Type"], ["titre", "Titre"], ["editeur", "Éditeur"], ["edition", "Édition / version"], ["datePublication", "Publiée le"],
    ["url", "Adresse"], ["consulteLe", "Consultée le"], ["referentiels", "Référentiels"], ["statut", "Statut"], ["remplacePar", "Remplacée par"], ["resume", "Résumé"], ["origine", "Origine"]];
  const SP = { brouillon: null, auteur: "", q: "", type: "", ref: "", statut: "", edit: "", imp: null, derniere: 0 };
  const spTxt = (v, n = 2000) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, n);
  const spDate = v => /^\d{4}-\d{2}-\d{2}$/.test(String(v || "").trim()) ? String(v).trim() : /^(\d{2})\/(\d{2})\/(\d{4})$/.test(String(v || "").trim()) ? String(v).trim().replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3-$2-$1") : "";
  // Source normalisée (import, publication, brouillon)
  function spNorm(x) {
    x = x && typeof x === "object" ? x : {};
    const refs = (Array.isArray(x.referentiels) ? x.referentiels : String(x.referentiels || "").split(/[,;|]/)).map(r => spTxt(r, 40)).filter(Boolean);
    return { id: spTxt(x.id, 40), type: SP_TYPES.includes(spTxt(x.type)) ? spTxt(x.type) : "Autre", titre: spTxt(x.titre, 500), editeur: spTxt(x.editeur, 200), edition: spTxt(x.edition, 100),
      datePublication: spDate(x.datePublication), url: spTxt(x.url, 1000), consulteLe: spDate(x.consulteLe), resume: spTxt(x.resume, 2000), referentiels: [...new Set(refs)],
      statut: SP_STATUTS.includes(spTxt(x.statut)) ? spTxt(x.statut) : "en vigueur", remplacePar: spTxt(x.remplacePar, 40), origine: spTxt(x.origine, 300) };
  }
  const spPubliees = () => { const l = P.pubGroupe && P.pubGroupe.objets.sourcesPubliques; return Array.isArray(l) ? l.map(spNorm) : null; };
  const spCle = s => s.url ? s.url.toLowerCase().replace(/^http:/, "https:").replace(/\/+$/, "") : "titre:" + s.titre.toLowerCase();
  const spComparable = s => JSON.stringify(SP_CHAMPS.map(([k]) => k === "referentiels" ? s[k].join(",") : s[k]));
  function initSources(force = false) {
    if (SP.brouillon && !force) return;
    const pub = spPubliees();
    SP.brouillon = (pub || (window.WERB_SOURCES_DEFAUT || []).map(spNorm)).map(s => ({ ...s, referentiels: s.referentiels.slice() }));
  }
  const spIdSuivant = () => { let n = 0; SP.brouillon.forEach(s => { const m = /^SRC-(\d+)$/.exec(s.id); if (m) n = Math.max(n, +m[1]); }); return `SRC-${String(n + 1).padStart(3, "0")}`; };
  // Contrôles du brouillon : [identifiant, message]
  function spErreurs() {
    const e = [], ids = new Map(), cles = new Map(), connus = new Set(SP.brouillon.map(s => s.id));
    SP.brouillon.forEach((s, i) => {
      const lib = s.id || `ligne ${i + 1}`;
      if (!s.id) e.push([lib, "identifiant vide"]); else if (ids.has(s.id)) e.push([lib, "identifiant en double"]); ids.set(s.id, 1);
      if (!s.titre) e.push([lib, "titre vide"]);
      if (s.url && !/^https?:\/\/\S+$/i.test(s.url)) e.push([lib, "adresse invalide (http:// ou https:// attendu)"]);
      const k = spCle(s); if (s.titre && cles.has(k)) e.push([lib, `même ${s.url ? "adresse" : "titre"} que ${cles.get(k)}`]); else cles.set(k, lib);
      if (s.statut === "remplacée" && !connus.has(s.remplacePar)) e.push([lib, "« remplacée » : indiquez la source qui la remplace (identifiant)"]);
    });
    return e;
  }
  function spEcarts() {
    const pub = spPubliees();
    if (!pub) return { pub: null, ajoutees: SP.brouillon.length, modifiees: 0, retirees: 0, supprimees: [], change: SP.brouillon.length > 0 };
    const pm = new Map(pub.map(s => [s.id, s])), bm = new Set(SP.brouillon.map(s => s.id));
    const ajoutees = SP.brouillon.filter(s => !pm.has(s.id)).length, modifiees = SP.brouillon.filter(s => pm.has(s.id) && spComparable(pm.get(s.id)) !== spComparable(s)).length;
    const supprimees = pub.filter(s => !bm.has(s.id)).map(s => s.id), retirees = SP.brouillon.filter(s => s.statut === "retirée" && pm.has(s.id) && pm.get(s.id).statut !== "retirée").length;
    return { pub, ajoutees, modifiees, retirees, supprimees, change: !!(ajoutees || modifiees || supprimees.length) };
  }
  const spFiltrees = () => SP.brouillon.filter(s => (!SP.type || s.type === SP.type) && (!SP.ref || s.referentiels.includes(SP.ref)) && (!SP.statut || s.statut === SP.statut)
    && (!SP.q || `${s.id} ${s.titre} ${s.editeur} ${s.edition} ${s.url} ${s.resume}`.toLowerCase().includes(SP.q.toLowerCase())));
  const spBadgeStatut = s => badge(s.statut === "remplacée" ? `remplacée par ${s.remplacePar}` : s.statut, s.statut === "en vigueur" ? "b-ok" : s.statut === "remplacée" ? "b-warn" : "b-ko");
  const spOpt = (vals, cur, vide) => (vide !== undefined ? `<option value="">${esc(vide)}</option>` : "") + vals.map(v => `<option value="${esc(v)}"${v === cur ? " selected" : ""}>${esc(v)}</option>`).join("");

  VUES.sources = () => {
    let h = `<h1>📚 Sources publiques du groupe</h1><p class="sub">Tableau principal des normes, guides, référentiels, textes réglementaires et sites de référence : les modules (WerbIEC62443…) y reprennent leurs sources. Gérez-le ici, importez et exportez-le (CSV pour Excel, JSON), puis publiez-le pour tout le groupe.</p>`;
    if (!E.ouvert) return h + `<div class="card"><p class="small muted">Ouvrez d'abord l'espace du groupe (accueil, <b>Ouvrir l'espace…</b>) : ${(window.WERB_SOURCES_DEFAUT || []).length} source(s) sont proposées pour commencer.</p></div>`;
    initSources();
    const e = spEcarts(), err = spErreurs(), f = ((P.pubGroupe && P.pubGroupe.fichiers) || []).find(x => x.module === WERB.id), l = spFiltrees();
    const parRef = SP_REFS.map(r => [r, SP.brouillon.filter(s => s.referentiels.includes(r)).length]).filter(([, n]) => n);
    h += `<div class="card">${titre("📤", "Publication", "ardoise")}
      <p class="small">${e.pub ? `Dernière publication le <b>${esc(frDate(f && f.publieLe))}</b> par <b>${esc((f && f.publiePar) || "")}</b> : ${e.pub.length} source(s), dans <code>publications/${esc(WERB.id)}.json</code>.` : `Aucune source publiée : le catalogue de départ (WerbReferentiels, WerbIEC62443) est proposé.`}</p>
      <div class="grid g2"><label class="f">Publiée par<input id="spAuteur" value="${esc(SP.auteur)}" placeholder="Prénom NOM"></label></div>
      <p class="small">${e.change ? badge(e.pub ? `${e.ajoutees} ajoutée(s), ${e.modifiees} modifiée(s)${e.supprimees.length ? `, ${e.supprimees.length} supprimée(s)` : ""} à publier` : `${SP.brouillon.length} source(s) à publier`, "b-warn") : badge("Tout est publié", "b-ok")} ${err.length ? badge(`${err.length} point(s) à corriger`, "b-ko") : ""}</p>
      <div class="row"><button class="primary" data-act="spPublier"${e.change && !err.length ? "" : " disabled"}>📤 Publier les sources…</button><button data-act="spAnnuler"${e.change ? "" : " disabled"}>↺ Annuler toutes les modifications</button>
        <button data-act="spDepart" title="Ajoute les sources du catalogue de départ absentes du tableau">➕ Reprendre le catalogue de départ</button></div>
      ${err.length ? `<div class="warnbox small" data-sp-erreurs>${err.map(([i, m]) => `<b>${esc(i)}</b> : ${esc(m)}`).join("<br>")}</div>` : ""}</div>
    <div class="card">${titre("🔁", "Import et export", "ardoise")}
      <div class="row"><label class="bt-fichier">📥 Importer un fichier CSV ou JSON…<input type="file" id="spImport" accept=".csv,.json,text/csv,application/json" hidden></label>
        <button data-act="spExportCsv">⬇ Exporter en CSV (Excel)</button><button data-act="spExportJson">⬇ Exporter en JSON</button></div>
      <p class="small muted">CSV : séparateur « ; » ou « , », une ligne d'en-tête (identifiant, type, titre, éditeur, édition, publiée le, adresse, consultée le, référentiels, statut, remplacée par, résumé). Une ligne est rapprochée d'une source existante par son identifiant, sinon par son adresse (ou son titre si elle n'a pas d'adresse) ; un aperçu précède toute modification. Le JSON accepte un export du portail, une liste de sources, ou l'export « pour le catalogue » d'un module.</p>
      ${SP.imp ? spApercuHtml() : ""}</div>`;
    const ed = SP.brouillon.find(s => s.id === SP.edit);
    if (ed) h += spEditionHtml(ed);
    h += `<div class="card">${titre("🗂️", `Tableau des sources (${l.length} / ${SP.brouillon.length})`, "ardoise")}
      <div class="row" style="flex-wrap:wrap;gap:8px"><input id="spQ" value="${esc(SP.q)}" placeholder="🔍 Rechercher (titre, éditeur, adresse…)" style="max-width:320px">
        <select id="spType" style="width:auto">${spOpt(SP_TYPES, SP.type, "Tous les types")}</select><select id="spRef" style="width:auto">${spOpt(SP_REFS, SP.ref, "Tous les référentiels")}</select>
        <select id="spStatut" style="width:auto">${spOpt(SP_STATUTS, SP.statut, "Tous les statuts")}</select><span class="spacer"></span><button class="primary" data-act="spNouvelle">➕ Nouvelle source</button></div>
      <p class="small muted">${parRef.map(([r, n]) => `${esc(r)} ${n}`).join(" · ")}</p>
      <div class="tablewrap"><table class="t" data-sp-table><thead><tr><th>ID</th><th>Type</th><th>Titre</th><th>Éditeur</th><th>Édition</th><th>Référentiels</th><th>Statut</th><th></th></tr></thead><tbody>
      ${l.map(s => `<tr data-sp="${esc(s.id)}"><td class="mono">${esc(s.id)}</td><td>${esc(s.type)}</td><td>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.titre)}</a>` : esc(s.titre)}${s.resume ? `<div class="small muted">${esc(s.resume.slice(0, 140))}${s.resume.length > 140 ? "…" : ""}</div>` : ""}</td>
        <td>${esc(s.editeur)}</td><td>${esc(s.edition)}</td><td class="small">${esc(s.referentiels.join(", "))}</td><td>${spBadgeStatut(s)}</td>
        <td style="white-space:nowrap"><button class="small" data-act="spEditer" data-id="${esc(s.id)}" title="Modifier">✎</button><button class="small" data-act="spRetirer" data-id="${esc(s.id)}" title="${spPubliees() && spPubliees().some(x => x.id === s.id) ? "Retirer (la source publiée reste visible des modules, statut « retirée »)" : "Supprimer (jamais publiée)"}">✕</button></td></tr>`).join("")
        || `<tr><td colspan="8" class="empty">Aucune source.</td></tr>`}</tbody></table></div></div>`;
    return h + `<span hidden id="spEtat" data-pub="${SP.derniere}"></span>`;
  };
  function spEditionHtml(s) {
    const ch = (k, l, t = "text") => `<label class="f">${esc(l)}${t === "area" ? `<textarea data-spf="${k}" rows="3" style="width:100%;display:block">${esc(s[k])}</textarea>` : `<input ${t === "date" ? 'type="date" ' : ""}data-spf="${k}" value="${esc(s[k])}">`}</label>`;
    return `<div class="card" data-sp-edition>${titre("✎", `Source ${esc(s.id)}`, "ardoise")}
      <div class="grid g3">${ch("id", "Identifiant")}<label class="f">Type<select data-spf="type">${spOpt(SP_TYPES, s.type)}</select></label><label class="f">Statut<select data-spf="statut">${spOpt(SP_STATUTS, s.statut)}</select></label></div>
      ${ch("titre", "Titre")}<div class="grid g3">${ch("editeur", "Éditeur")}${ch("edition", "Édition / version")}${ch("datePublication", "Publiée le", "date")}</div>
      <div class="grid g2">${ch("url", "Adresse (https://…)")}${ch("consulteLe", "Consultée le", "date")}</div>
      <label class="f">Référentiels</label><div class="row" style="flex-wrap:wrap;gap:10px">${SP_REFS.map(r => `<label class="small"><input type="checkbox" data-spref="${esc(r)}"${s.referentiels.includes(r) ? " checked" : ""}> ${esc(r)}</label>`).join("")}</div>
      ${s.statut === "remplacée" ? `<label class="f">Remplacée par<select data-spf="remplacePar">${spOpt(SP.brouillon.filter(x => x.id !== s.id).map(x => x.id), s.remplacePar, "—")}</select></label>` : ""}
      ${ch("resume", "Résumé", "area")}<p class="small muted">Origine : ${esc(s.origine || "saisie")}</p>
      <div class="row"><button data-act="spFermer">Fermer</button></div></div>`;
  }
  // ---------- import
  function spCsv(texte) {
    texte = texte.replace(/^﻿/, "");
    const sep = (texte.split(/\r?\n/)[0].match(/;/g) || []).length >= (texte.split(/\r?\n/)[0].match(/,/g) || []).length ? ";" : ",";
    const lignes = []; let l = [], c = "", q = false;
    for (let i = 0; i < texte.length; i++) {
      const ch = texte[i];
      if (q) { if (ch === '"') { if (texte[i + 1] === '"') { c += '"'; i++; } else q = false; } else c += ch; continue; }
      if (ch === '"') q = true; else if (ch === sep) { l.push(c); c = ""; } else if (ch === "\n" || ch === "\r") { if (ch === "\r" && texte[i + 1] === "\n") i++; l.push(c); lignes.push(l); l = []; c = ""; } else c += ch;
    }
    if (c || l.length) { l.push(c); lignes.push(l); }
    const sansAccent = t => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");
    const noms = Object.fromEntries(SP_CHAMPS.flatMap(([k, lib]) => [[sansAccent(k), k], [sansAccent(lib), k]]));
    const tete = (lignes.shift() || []).map(h => noms[sansAccent(h)] || "");
    if (!tete.includes("titre")) throw new Error("colonne « Titre » introuvable dans la ligne d'en-tête");
    return lignes.filter(r => r.some(x => x.trim())).map(r => Object.fromEntries(tete.map((k, i) => [k, r[i] ?? ""]).filter(([k]) => k)));
  }
  function spLireImport(nom, texte) {
    if (/\.json$/i.test(nom) || /^\s*[[{]/.test(texte)) {
      const j = JSON.parse(texte);
      const l = Array.isArray(j) ? j : Array.isArray(j.sources) ? j.sources : j.data && Array.isArray(j.data.sourcesPubliques) ? j.data.sourcesPubliques : null;
      if (!l) throw new Error("aucune liste de sources dans ce fichier JSON");
      return l;
    }
    return spCsv(texte);
  }
  // Aperçu : chaque ligne importée est un ajout, une mise à jour, une source identique, ou ignorée (sans titre)
  function spPreparer(nom, brutes) {
    const parId = new Map(SP.brouillon.map(s => [s.id, s])), parCle = new Map(SP.brouillon.map(s => [spCle(s), s]));
    const lignes = brutes.map(b => {
      const n = spNorm(b);
      if (!n.titre) return { action: "ignorée", n, raison: "sans titre" };
      const cible = (n.id && parId.get(n.id)) || parCle.get(spCle(n));
      if (!cible) return { action: "ajout", n };
      const fusion = spNorm({ ...cible, ...Object.fromEntries(Object.entries(n).filter(([k, v]) => k !== "id" && (Array.isArray(v) ? v.length : v !== "" && !(k === "type" && v === "Autre" && !b.type) && !(k === "statut" && !b.statut)))) });
      fusion.id = cible.id;
      return spComparable(fusion) === spComparable(cible) ? { action: "identique", n: fusion, cible: cible.id } : { action: "mise à jour", n: fusion, cible: cible.id };
    });
    SP.imp = { nom, lignes };
  }
  function spApercuHtml() {
    const L = SP.imp.lignes, nb = a => L.filter(x => x.action === a).length;
    return `<div class="infobox" data-sp-apercu><b>Aperçu de l'import « ${esc(SP.imp.nom)} »</b> : ${badge(`${nb("ajout")} ajout(s)`, "b-ok")} ${badge(`${nb("mise à jour")} mise(s) à jour`, "b-warn")} ${badge(`${nb("identique")} identique(s)`, "")} ${nb("ignorée") ? badge(`${nb("ignorée")} ignorée(s)`, "b-ko") : ""}
      <div class="tablewrap" style="max-height:260px;overflow:auto;margin-top:6px"><table class="t"><tbody>${L.filter(x => x.action !== "identique").map(x => `<tr><td style="width:110px">${esc(x.action)}</td><td class="mono">${esc(x.cible || x.n.id || "nouvel id")}</td><td>${esc(x.n.titre || "—")}</td><td class="small muted">${esc(x.raison || x.n.url)}</td></tr>`).join("") || `<tr><td class="muted">Rien à changer.</td></tr>`}</tbody></table></div>
      <div class="row" style="margin-top:8px"><button class="primary" data-act="spImportOk"${nb("ajout") + nb("mise à jour") ? "" : " disabled"}>Appliquer l'import</button><button data-act="spImportNon">Annuler</button><span class="small muted">Le tableau est modifié en brouillon : publiez ensuite.</span></div></div>`;
  }
  // ---------- export
  const spCsvCellule = v => { const t = Array.isArray(v) ? v.join(", ") : String(v ?? ""); return /[";\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
  const spNomFichier = ext => { const n = `Sources_publiques_${new Date().toISOString().slice(0, 10)}.${ext}`; return WerbSocle.nommage && WerbSocle.nommage.fichier ? WerbSocle.nommage.fichier(n) : n; };
  const ACTIONS_SOURCES = {
    spNouvelle() { initSources(); const s = spNorm({ id: spIdSuivant(), titre: "", origine: "saisie" }); SP.brouillon.unshift(s); SP.edit = s.id; SP.q = SP.type = SP.ref = SP.statut = ""; render(); },
    spEditer(el) { SP.edit = el.dataset.id; render(); window.scrollTo(0, 0); $("#main").scrollTop = 0; },
    spFermer() { SP.edit = ""; render(); },
    spRetirer(el) {
      const i = SP.brouillon.findIndex(s => s.id === el.dataset.id); if (i < 0) return;
      const pub = spPubliees();
      if (pub && pub.some(s => s.id === el.dataset.id)) SP.brouillon[i].statut = "retirée"; else SP.brouillon.splice(i, 1);
      if (SP.edit === el.dataset.id) SP.edit = ""; render();
    },
    spAnnuler() { initSources(true); SP.edit = ""; SP.imp = null; render(); },
    spDepart() {
      initSources(); const cles = new Set(SP.brouillon.map(spCle)); let n = 0;
      (window.WERB_SOURCES_DEFAUT || []).map(spNorm).filter(s => !cles.has(spCle(s))).forEach(s => { s.id = SP.brouillon.some(x => x.id === s.id) ? spIdSuivant() : s.id; SP.brouillon.push(s); n++; });
      toast(n ? `${n} source(s) du catalogue de départ ajoutée(s).` : "Toutes les sources du catalogue de départ sont déjà dans le tableau.", "ok"); render();
    },
    spImportOk() {
      if (!SP.imp) return; let a = 0, m = 0;
      SP.imp.lignes.forEach(x => {
        if (x.action === "ajout") { const s = { ...x.n }; if (!s.id || SP.brouillon.some(y => y.id === s.id)) s.id = spIdSuivant(); if (!s.origine) s.origine = `import ${SP.imp.nom}`; SP.brouillon.push(s); a++; }
        if (x.action === "mise à jour") { const i = SP.brouillon.findIndex(y => y.id === x.cible); if (i >= 0) { SP.brouillon[i] = x.n; m++; } }
      });
      toast(`Import appliqué : ${a} ajout(s), ${m} mise(s) à jour. Publiez pour le diffuser.`, "ok"); SP.imp = null; render();
    },
    spImportNon() { SP.imp = null; render(); },
    spExportCsv() {
      initSources();
      const txt = "﻿" + [SP_CHAMPS.map(([, l]) => l).join(";"), ...SP.brouillon.map(s => SP_CHAMPS.map(([k]) => spCsvCellule(s[k])).join(";"))].join("\r\n");
      WerbSocle.telecharger(new Blob([txt], { type: "text/csv;charset=utf-8" }), spNomFichier("csv")); toast("Export CSV des sources téléchargé.", "ok");
    },
    spExportJson() {
      initSources();
      const j = { format: "WERBSMSI-SOURCES", schema: 1, exporteLe: new Date().toISOString(), sources: SP.brouillon };
      WerbSocle.telecharger(new Blob([JSON.stringify(j, null, 1)], { type: "application/json" }), spNomFichier("json")); toast("Export JSON des sources téléchargé.", "ok");
    },
    async spPublier() {
      SP.auteur = ($("#spAuteur") || {}).value ? $("#spAuteur").value.trim() : SP.auteur;
      if (!SP.auteur) { toast("Indiquez qui publie les sources (Publiée par).", "err"); $("#spAuteur").focus(); return; }
      const err = spErreurs(); if (err.length) { toast("Corrigez les points signalés avant de publier.", "err"); return; }
      const e = spEcarts();
      if (e.supprimees.length && !confirm(`${e.supprimees.length} source(s) publiée(s) ne sont plus dans le tableau (${e.supprimees.join(", ")}). Les modules qui les ont reprises les verront « absentes du catalogue ». Continuer ?`)) return;
      if (!confirm(`Publier ${SP.brouillon.length} source(s) pour tout le groupe ?${e.pub ? `\n\n${e.ajoutees} ajoutée(s), ${e.modifiees} modifiée(s).` : ""}`)) return;
      try {
        await E.publier({ niveau: "groupe", objets: { sourcesPubliques: SP.brouillon.map(spNorm) }, utilisateur: SP.auteur });
        P.pubGroupe = await E.publications("groupe");
        initSources(true); SP.derniere = Date.now();
        toast(`${SP.brouillon.length} source(s) publiée(s).`, "ok");
      } catch (x) {
        toast(["NotAllowedError", "SecurityError"].includes(x.name) ? "Publication refusée : vos droits ne permettent pas d'écrire dans publications/ du groupe." : "Publication impossible : " + x.message, "err");
      }
      render();
    },
  };
  Object.assign(ACTIONS, ACTIONS_SOURCES);
  // Saisie : filtres à la frappe (focus rendu au champ), champs de la fiche à la sortie
  document.addEventListener("input", e => {
    const t = e.target;
    if (t.id === "spAuteur") { SP.auteur = t.value.trim(); return; }
    if (t.id === "spQ") { SP.q = t.value; const pos = t.selectionStart; render(); const f = $("#spQ"); if (f) { f.focus(); f.setSelectionRange(pos, pos); } }
  });
  document.addEventListener("change", async e => {
    const t = e.target;
    if (["spType", "spRef", "spStatut"].includes(t.id)) { SP[{ spType: "type", spRef: "ref", spStatut: "statut" }[t.id]] = t.value; render(); return; }
    if (t.id === "spImport") {
      const f = t.files[0]; t.value = ""; if (!f) return;
      try { initSources(); spPreparer(f.name, spLireImport(f.name, await f.text())); } catch (x) { toast(`Import impossible : ${x.message}`, "err"); SP.imp = null; }
      render(); return;
    }
    const s = SP.brouillon && SP.brouillon.find(x => x.id === SP.edit); if (!s) return;
    if (t.dataset.spref) { const r = t.dataset.spref; s.referentiels = t.checked ? [...new Set([...s.referentiels, r])] : s.referentiels.filter(x => x !== r); render(); return; }
    if (t.dataset.spf) {
      const k = t.dataset.spf, v = k === "id" ? t.value.trim().slice(0, 40) : t.value.trim();
      if (k === "id" && v !== s.id) { SP.brouillon.forEach(x => { if (x.remplacePar === s.id) x.remplacePar = v; }); SP.edit = v; }
      s[k] = v; if (k === "statut" && v !== "remplacée") s.remplacePar = "";
      render();
    }
  });
  // Saisie dans une liste : le brouillon suit chaque frappe ; à la sortie du champ, rendu (contrôles, écarts) en gardant le champ
  // actif, sauf si l'utilisateur clique un bouton (son action relance le rendu : le bouton n'est pas remplacé sous le clic).
  document.addEventListener("input", e => {
    if (e.target.id === "svMdp") { SV.saisie.m = e.target.value; return; }
    if (e.target.id === "svMdp2") { SV.saisie.m2 = e.target.value; return; }
    if (e.target.id === "lgAuteur") { LG.auteur = e.target.value.trim(); return; }
    if (!e.target.matches(".lg-v")) return;
    const d = e.target.dataset, ligne = LG.brouillon[d.l][+d.i];
    if (Array.isArray(ligne.v)) ligne.v[+d.p] = e.target.value.trim(); else ligne.v = e.target.value.trim();
    LG.ouvertes.add(d.l);
  });
  let clicBouton = false;
  document.addEventListener("mousedown", e => { clicBouton = !!e.target.closest("button"); }, true);
  document.addEventListener("mouseup", () => { setTimeout(() => { clicBouton = false; }, 0); }, true);
  // Sauvegarde : case « Chiffrer l'archive » ; Entrée dans le mot de passe d'une archive lance le déchiffrement
  document.addEventListener("change", e => { if (e.target.id === "svChiffrer") { SV.chiffrer = e.target.checked; render(); } });
  document.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.id === "svMdpLecture") { e.preventDefault(); ACTIONS_SAUVEGARDE.svDechiffrer(); } });
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

  /* Identification unique (1.16.0, charte §5.5) : le nom (« Prénom NOM ») est demandé une fois, à l'ouverture du portail, et
     transmis dans le lien des modules ouverts d'ici (#werbsmsi=…, champ u) : leur écran « Votre nom » ne s'affiche pas, le journal et
     le verrou le reçoivent. Il préremplit aussi « Réalisée par » (sauvegarde) et « Publiée par » (listes de choix). Gardé en mémoire
     seulement (rien dans le navigateur, §1) : redemandé au rechargement du portail. Identification déclarative, comme le verrou :
     l'accès aux données reste celui des dossiers du drive (P3) ; les comptes propres à un module (WerbMap) ne sont pas concernés. */
  let identProposee = false;
  function proposerIdentification() {
    if (!identProposee && !P.utilisateur && P.vue === "accueil") { identProposee = true; fenetreIdentification(); return; }
    if (!$("#ident-fen")) proposerDemo();
  }
  function fenetreIdentification() {
    if ($("#ident-fen")) return;
    const v = document.createElement("div");
    v.id = "ident-fen"; v.className = "fen-back";
    v.innerHTML = `<div class="fen" role="dialog" aria-modal="true" aria-labelledby="ident-titre"><h2 id="ident-titre">👤 Qui utilise WerbSMSI ?</h2>
      <p>Indiquez votre nom une seule fois : les modules ouverts depuis le portail le reprennent pour leur journal, leurs publications et le verrou des bases, sans vous le redemander.</p>
      <label class="f" for="identNom">Votre nom</label><input id="identNom" placeholder="Prénom NOM" maxlength="60" autocomplete="name" value="${esc(P.utilisateur)}">
      <p class="small muted">Gardé en mémoire tant que le portail reste ouvert, jamais enregistré. L'accès aux données reste celui des dossiers du drive.</p>
      <div class="fen-a"><span class="spacer"></span><button data-act="identFermer">Plus tard</button><button class="primary" data-act="identValider">Continuer</button></div></div>`;
    v.addEventListener("keydown", e => { if (e.key === "Escape") fermerIdentification(); if (e.key === "Enter" && e.target.id === "identNom") validerIdentification(); });
    document.body.appendChild(v);
    const n = v.querySelector("#identNom"); n.focus(); n.select();
  }
  function fermerIdentification() {
    const f = $("#ident-fen"); if (f) f.remove();
    if (P.vue === "accueil") proposerDemo();
  }
  function validerIdentification() {
    const n = $("#identNom"), nom = WerbSocle.lien.nettoyerNom(n ? n.value : "");
    if (!nom) { toast("Saisissez votre nom (Prénom NOM).", "err"); if (n) n.focus(); return; }
    const ancien = P.utilisateur;
    P.utilisateur = nom;
    if (!SV.auteur || SV.auteur === ancien) SV.auteur = nom;   // « Réalisée par » de la sauvegarde
    if (!LG.auteur || LG.auteur === ancien) LG.auteur = nom;   // « Publiée par » des listes de choix
    const f = $("#ident-fen"); if (f) f.remove();
    render();
    toast(`Bonjour ${nom} : les modules ouverts depuis le portail ne vous redemanderont pas votre nom.`, "ok");
  }

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

  /* ===================================================== comptes de l'espace (portail 1.22.0, socle 1.13.0, charte §5.10)
     À l'ouverture d'un espace : connexion (identifiant, mot de passe), ou création du compte administrateur si l'espace n'a pas encore
     de comptes. Session en mémoire seulement, 12 h. Droits : matrice compte × colonne (GROUPE, chaque site) ; un site se consulte avec
     un rôle sur ce site ou sur le groupe ; administration de l'espace (comptes, paramètres, listes, sources, sauvegarde, mise en place) :
     administrateur du groupe. Sans espace ouvert, l'identification reste déclarative (nom seul), comme les modules ouverts hors espace. */
  const CPT = WerbSocle.comptes;
  const connecte = () => !!P.compte && Date.now() < P.expire;
  const adminEspace = () => connecte() && CPT.administrateurEspace(P.compte);
  const voitGroupe = () => connecte() && CPT.peut(P.compte, CPT.GROUPE);
  const voitSite = code => connecte() && (CPT.peut(P.compte, code) || CPT.peut(P.compte, CPT.GROUPE));
  const libRole = r => CPT.LIBELLES[r] || "—";
  // Pages réservées une fois l'espace ouvert : condition d'accès
  const ACCES = { groupe: () => voitGroupe(), site: () => voitSite(P.site), grc: () => voitGroupe() || sitesAccessibles().length > 0,
    assistant: () => adminEspace(), sauvegarde: () => adminEspace(), listes: () => adminEspace(), sources: () => adminEspace(), parametres: () => adminEspace(), comptes: () => adminEspace() };
  const autorise = vue => !E.ouvert || !ACCES[vue] || ACCES[vue]();

  async function ouvrirSession(c) {
    P.compte = c; P.expire = Date.now() + CPT.TICKET_H * 3600e3; P.compteGroupe = (P.groupe || {}).groupeId || "";
    P.ticket = await CPT.ticket(c).catch(() => "");
    const ancien = P.utilisateur; P.utilisateur = c.nom;
    if (!SV.auteur || SV.auteur === ancien) SV.auteur = c.nom;
    if (!LG.auteur || LG.auteur === ancien) LG.auteur = c.nom;
    if (P.vue === "accueil" || !autorise(P.vue)) { P.vue = voitGroupe() ? "groupe" : (sitesAccessibles()[0] ? "site" : "accueil"); if (P.vue === "site") P.site = sitesAccessibles()[0].code; }   // page demandée à l'ouverture si les droits le permettent
  }
  function fermerSession() { P.compte = null; P.expire = 0; P.ticket = ""; CP.brouillon = null; }
  // Après relecture de l'espace : le compte connecté reprend ses droits du fichier ; désactivé ou supprimé : déconnexion
  function resynchroniserSession() {
    if (!P.compte) return;
    if (P.compteGroupe !== ((P.groupe || {}).groupeId || "")) { fermerSession(); return; }   // autre espace ouvert : nouvelle connexion
    const c = P.comptesData && P.comptesData.comptes.find(x => x.login === P.compte.login && x.actif !== false);
    if (!c) { fermerSession(); toast("Votre compte n'existe plus ou est désactivé : reconnectez-vous.", "err"); return; }
    P.compte = { login: c.login, nom: c.nom, droits: CPT.nettoyerDroits(c.droits) };
  }

  VUES.connexion = () => {
    const g = P.groupe || {};
    if (P.comptesErr) return `<h1>🔐 Connexion</h1><div class="warnbox">${esc(P.comptesErr)}</div>`;
    if (!P.comptesData) return `<h1>🔐 Premier compte de l'espace</h1><p class="sub">${esc(g.organisation || "")} — dossier ${esc(E.nom)}</p>
      <div class="card cx" data-creation-admin><h2>Créer le compte administrateur</h2>
      <p>Cet espace n'a pas encore de comptes. Le premier compte est <b>administrateur du groupe et de tous les sites</b> : il crée ensuite les comptes des équipes et leur attribue des droits dans <b>Administration › Comptes et droits</b>.</p>
      <div class="cx-champs"><label class="f" for="caLogin">Identifiant</label><input id="caLogin" autocomplete="username" placeholder="prenom.nom">
      <label class="f" for="caNom">Nom</label><input id="caNom" autocomplete="name" placeholder="Prénom NOM" value="${esc(P.utilisateur)}">
      <label class="f" for="caMdp">Mot de passe (${CPT.MDP_MIN} caractères au moins)</label><input id="caMdp" type="password" autocomplete="new-password">
      <label class="f" for="caMdp2">Confirmation</label><input id="caMdp2" type="password" autocomplete="new-password"></div>
      <p class="err" id="caErr"></p>
      <div class="row"><button class="primary" data-act="caValider">Créer le compte et entrer</button><button data-act="fermer">Fermer l'espace</button></div>
      <p class="small muted">Le compte est écrit dans <code>${esc(CPT.FICHIER)}</code>, à la racine de l'espace : seule l'équipe SMSI du groupe, qui a le droit d'écriture sur cette racine, peut le créer. Le mot de passe n'est jamais enregistré en clair.</p></div>`;
    return `<h1>🔐 Connexion</h1><p class="sub">${esc(g.organisation || "")} — dossier ${esc(E.nom)}</p>
      <div class="card cx" data-connexion><h2>Se connecter à l'espace</h2>
      ${P.messageConnexion ? `<div class="warnbox">${esc(P.messageConnexion)}</div>` : ""}
      <div class="cx-champs"><label class="f" for="cxLogin">Identifiant</label><input id="cxLogin" autocomplete="username">
      <label class="f" for="cxMdp">Mot de passe</label><input id="cxMdp" type="password" autocomplete="current-password"></div>
      <p class="err" id="cxErr"></p>
      <div class="row"><button class="primary" data-act="cxValider" id="cxGo">Se connecter</button><button data-act="fermer">Fermer l'espace</button></div>
      ${P.comptesData.demo ? `<div class="infobox small" data-demo-comptes>Espace de démonstration : <b>admin.demo</b> / Demo-Admin-2026 (administrateur), <b>tech.demo</b> / Demo-Tech-2026 (éditeur LYON, lecteur NANTES), <b>audit.demo</b> / Demo-Audit-2026 (lecteur partout).</div>` : ""}
      <p class="small muted">Session de ${CPT.TICKET_H} h, gardée en mémoire seulement. Les modules ouverts depuis le portail reprennent votre compte sans vous le redemander. Mot de passe oublié : un administrateur du groupe le réinitialise.</p></div>`;
  };
  VUES.refuse = () => `<h1>⛔ Accès réservé</h1><div class="infobox">Votre compte n'a pas de droit sur cette page. Les droits se donnent dans <b>Administration › Comptes et droits</b>, par un administrateur du groupe.</div>`;

  /* ---------- Administration › Comptes et droits : matrice compte × colonne, brouillon puis enregistrement tracé ---------- */
  const CP = { brouillon: null, revision: 0, filtre: "" };
  const cpVue = c => ({ login: c.login, nom: c.nom, actif: c.actif !== false, droits: { ...CPT.nettoyerDroits(c.droits) } });
  function cpCharger() { const d = P.comptesData; CP.revision = d ? d.revision || 0 : 0; CP.brouillon = d ? d.comptes.map(cpVue) : []; }
  const cpEtat = () => JSON.stringify(CP.brouillon.map(({ _mdp, ...c }) => c));
  const cpModifie = () => !!CP.brouillon && (cpEtat() !== JSON.stringify((P.comptesData ? P.comptesData.comptes : []).map(cpVue)) || CP.brouillon.some(c => c._mdp));
  const cpColonnes = () => { const s = (P.groupe.sites || []).map(x => x.code), autres = [...new Set(CP.brouillon.flatMap(c => Object.keys(c.droits)))].filter(k => k !== CPT.GROUPE && !s.includes(k));
    return [CPT.GROUPE, ...s, ...autres]; };
  function cpControles() {
    const l = [], actifs = CP.brouillon.filter(c => c.actif);
    if (!actifs.some(c => c.droits.GROUPE === "administrateur")) l.push(["ko", "Aucun administrateur du groupe actif : l'espace ne pourrait plus être administré."]);
    const moi = CP.brouillon.find(c => c.login === P.compte.login);
    if (moi && (!moi.actif || moi.droits.GROUPE !== "administrateur")) l.push(["ko", "Vous retirez votre propre droit d'administrateur du groupe : demandez-le à un autre administrateur."]);
    actifs.filter(c => !Object.keys(c.droits).length).forEach(c => l.push(["warn", `${c.login} : compte actif sans aucun droit.`]));
    (P.groupe.sites || []).forEach(s => { if (!actifs.some(c => ["editeur", "administrateur"].includes(c.droits[s.code]))) l.push(["warn", `${s.code} : aucun éditeur ni administrateur pour ce site.`]); });
    cpColonnes().filter(k => k !== CPT.GROUPE && !(P.groupe.sites || []).some(s => s.code === k)).forEach(k => l.push(["warn", `${k} : droits sur un site qui n'est plus déclaré dans l'espace.`]));
    return l;
  }
  VUES.comptes = () => {
    if (!CP.brouillon) cpCharger();
    const cols = cpColonnes(), d = P.comptesData || {}, ctl = cpControles(), bloquant = ctl.some(x => x[0] === "ko"), mod = cpModifie();
    const titreCol = k => k === CPT.GROUPE ? "🏢 Groupe" : `📍 ${k}`;
    const nb = (k, r) => CP.brouillon.filter(c => c.actif && c.droits[k] === r).length;
    const original = new Map((d.comptes || []).map(c => [c.login, c]));
    return `<h1>👥 Comptes et droits</h1><p class="sub">Matrice des rôles par compte : une colonne pour le groupe, une par site. Lecteur : consulte ; Éditeur : modifie les bases ; Administrateur : administre (sur le groupe : comptes, paramètres et administration de l'espace).</p>
      ${mod ? `<div class="warnbox">Modifications non enregistrées.</div>` : ""}
      ${ctl.length ? `<div class="${bloquant ? "warnbox" : "infobox"} small" data-cp-controles>${ctl.map(([n, t]) => `<div>${n === "ko" ? "⛔" : "⚠️"} ${esc(t)}</div>`).join("")}</div>` : ""}
      <div class="card" data-cp-matrice><div class="row cp-noprint">${titre("🧮", "Matrice des droits", "violet")}<span class="spacer"></span>
        <button data-act="cpImprimer">🖨 Imprimer</button><button data-act="cpExporter">⬇ Exporter (CSV)</button>
        <button data-act="cpAnnuler"${mod ? "" : " disabled"}>Annuler</button><button class="primary" data-act="cpEnregistrer"${mod && !bloquant ? "" : " disabled"}>💾 Enregistrer</button></div>
        <p class="small muted cp-imprime">${esc((P.groupe || {}).organisation || "")} — matrice des droits au ${esc(frDate(new Date().toISOString().slice(0, 10)))}, éditée par ${esc(P.compte.nom)} (${esc(P.compte.login)}) · révision ${esc(CP.revision)}</p>
        <div class="tablewrap"><table class="t cp-mx"><thead><tr><th>Compte</th><th>État</th>${cols.map(k => `<th class="n">${esc(titreCol(k))}</th>`).join("")}<th class="cp-noprint"></th></tr></thead><tbody>
        ${CP.brouillon.map(c => { const o = original.get(c.login);
          return `<tr data-cp-compte="${esc(c.login)}"${c.actif ? "" : ` class="cp-inactif"`}><td><b>${esc(c.login)}</b>${c.login === P.compte.login ? ` <span class="small muted">(vous)</span>` : ""}<div class="small muted">${esc(c.nom)}${o ? "" : " · nouveau"}${c._mdp ? " · mot de passe à enregistrer" : o && o.mdpLe ? ` · mot de passe du ${esc(frDate(o.mdpLe.slice(0, 10)))}` : ""}</div></td>
            <td>${c.actif ? badge("actif", "b-ok") : badge("désactivé", "")}</td>
            ${cols.map(k => { const r = c.droits[k] || "";
              return `<td class="n cp-c" data-role="${r}"><select data-cpl="${esc(c.login)}" data-cpc="${esc(k)}" aria-label="${esc(`${c.login} – ${titreCol(k)}`)}"${c.actif ? "" : " disabled"}><option value="">—</option>${CPT.ROLES.map(x => `<option value="${x}"${x === r ? " selected" : ""}>${esc(libRole(x))}</option>`).join("")}</select><span class="cp-txt">${esc(r ? libRole(r) : "—")}</span></td>`; }).join("")}
            <td class="cp-noprint" style="white-space:nowrap"><button class="small" data-act="cpMdp" data-l="${esc(c.login)}" title="Donner un nouveau mot de passe">🔑</button>
              <button class="small" data-act="cpActif" data-l="${esc(c.login)}">${c.actif ? "Désactiver" : "Réactiver"}</button></td></tr>`; }).join("")}
        </tbody><tfoot><tr><td colspan="2" class="small muted">Comptes actifs par rôle</td>${cols.map(k => `<td class="n small">${CPT.ROLES.slice().reverse().map(r => `${libRole(r).slice(0, 3)}. ${nb(k, r)}`).join(" · ")}</td>`).join("")}<td class="cp-noprint"></td></tr></tfoot></table></div>
        <p class="small muted">Un site se consulte avec un rôle sur ce site ou sur le groupe. Un compte n'est jamais supprimé : il est désactivé, pour garder la trace de ce qu'il a fait.</p></div>
      <div class="card cp-noprint" data-cp-ajout>${titre("➕", "Ajouter un compte", "vert")}
        <div class="grid g3"><div><label class="f" for="cpLogin">Identifiant</label><input id="cpLogin" placeholder="prenom.nom" autocomplete="off"></div>
        <div><label class="f" for="cpNom">Nom</label><input id="cpNom" placeholder="Prénom NOM" autocomplete="off"></div>
        <div><label class="f" for="cpMdp">Mot de passe initial (${CPT.MDP_MIN} caractères au moins)</label><input id="cpMdp" type="password" autocomplete="new-password"></div></div>
        <div class="row" style="margin-top:8px"><button class="primary" data-act="cpAjouter">Ajouter à la matrice</button><span class="small muted">Puis choisissez ses rôles dans la matrice et enregistrez. Transmettez le mot de passe initial par un autre canal ; l'utilisateur le change dans 👤 Mon compte.</span></div></div>
      <div class="card" data-cp-journal>${titre("📜", "Journal des comptes", "ardoise")}
        ${(d.journal || []).length ? `<div class="tablewrap"><table class="t"><thead><tr><th>Date</th><th>Par</th><th>Action</th><th>Compte</th><th>Avant</th><th>Après</th></tr></thead><tbody>
        ${d.journal.slice(-200).reverse().map(j => `<tr><td class="small" style="white-space:nowrap">${esc(frDate(j.le))}</td><td>${esc(j.par)}</td><td>${esc(j.action)}</td><td>${esc(j.compte)}</td><td class="small">${esc(j.avant)}</td><td class="small">${esc(j.apres)}</td></tr>`).join("")}
        </tbody></table></div>` : `<p class="small muted">Aucune entrée.</p>`}</div>`;
  };
  function cpCsv() {
    const cols = cpColonnes(), q = v => `"${String(v ?? "").replace(/"/g, '""')}"`, orig = new Map((P.comptesData.comptes || []).map(c => [c.login, c]));
    const lignes = [["Identifiant", "Nom", "État", ...cols.map(k => k === CPT.GROUPE ? "Groupe" : k), "Mot de passe changé le", "Créé le"].map(q).join(";"),
      ...CP.brouillon.map(c => { const o = orig.get(c.login) || {}; return [c.login, c.nom, c.actif ? "actif" : "désactivé", ...cols.map(k => c.droits[k] ? libRole(c.droits[k]) : ""), (o.mdpLe || "").slice(0, 10), (o.creeLe || "").slice(0, 10)].map(q).join(";"); })];
    return "﻿" + lignes.join("\r\n") + "\r\n";
  }
  function fenetreMdp(titreFen, intro, login, avecAncien) {
    const v = document.createElement("div"); v.id = "mdp-fen"; v.className = "fen-back";
    v.innerHTML = `<div class="fen" role="dialog" aria-modal="true" aria-labelledby="mdp-titre"><h2 id="mdp-titre">${esc(titreFen)}</h2><p>${intro}</p>
      ${avecAncien ? `<label class="f" for="mdpAncien">Mot de passe actuel</label><input id="mdpAncien" type="password" autocomplete="current-password">` : ""}
      <label class="f" for="mdpNouveau">Nouveau mot de passe (${CPT.MDP_MIN} caractères au moins)</label><input id="mdpNouveau" type="password" autocomplete="new-password">
      <label class="f" for="mdpConf">Confirmation</label><input id="mdpConf" type="password" autocomplete="new-password"><p class="err" id="mdpErr"></p>
      <div class="fen-a"><span class="spacer"></span><button data-act="mdpFermer">Annuler</button><button class="primary" data-act="mdpValider" data-l="${esc(login)}" data-ancien="${avecAncien ? 1 : 0}">Valider</button></div></div>`;
    v.addEventListener("keydown", e => { if (e.key === "Escape") v.remove(); });
    document.body.appendChild(v); v.querySelector("input").focus();
  }
  function fenetreCompte() {
    if ($("#compte-fen")) return;
    const v = document.createElement("div"), c = P.compte; v.id = "compte-fen"; v.className = "fen-back";
    const droits = Object.entries(c.droits);
    v.innerHTML = `<div class="fen" role="dialog" aria-modal="true" aria-labelledby="compte-titre"><h2 id="compte-titre">👤 ${esc(c.nom)}</h2>
      <p>Connecté(e) à <b>${esc(P.groupe.organisation)}</b> avec l'identifiant <b>${esc(c.login)}</b>, jusqu'à ${esc(frDate(P.expire))}.</p>
      <table class="t"><thead><tr><th>Périmètre</th><th>Rôle</th></tr></thead><tbody>${droits.map(([k, r]) => `<tr><td>${k === CPT.GROUPE ? "🏢 Groupe" : "📍 " + esc(k)}</td><td>${esc(libRole(r))}</td></tr>`).join("") || `<tr><td colspan="2" class="empty">Aucun droit.</td></tr>`}</tbody></table>
      <div class="fen-a"><button data-act="deconnecter">Se déconnecter</button><span class="spacer"></span><button data-act="compteFermer">Fermer</button><button class="primary" data-act="monMdp">🔑 Changer mon mot de passe</button></div></div>`;
    v.addEventListener("keydown", e => { if (e.key === "Escape") v.remove(); });
    document.body.appendChild(v);
  }
  const ACTIONS_COMPTES = {
    async cxValider() {
      const l = $("#cxLogin").value.trim(), m = $("#cxMdp").value, e = $("#cxErr"), b = $("#cxGo");
      if (!l || !m) { e.textContent = "Saisissez l'identifiant et le mot de passe."; return; }
      b.disabled = true; e.textContent = "Vérification…";
      const c = await CPT.connecter(l, m).catch(err => { e.textContent = err.message; return null; });
      if (!c) { b.disabled = false; if (e.textContent === "Vérification…") e.textContent = "Identifiant ou mot de passe incorrect."; $("#cxMdp").value = ""; $("#cxMdp").focus(); return; }
      P.messageConnexion = ""; await ouvrirSession(c); render(); $("#main").scrollTop = 0; toast(`Bonjour ${c.nom}.`, "ok");
    },
    async caValider() {
      const e = $("#caErr"), m = $("#caMdp").value;
      if (m !== $("#caMdp2").value) { e.textContent = "Les deux mots de passe ne correspondent pas."; return; }
      e.textContent = "Création…";
      try { const c = await CPT.creerAdministrateur($("#caLogin").value.trim(), $("#caNom").value, m); P.comptesData = await CPT.lire(); await ouvrirSession(c); render(); toast(`Compte administrateur ${c.login} créé.`, "ok"); }
      catch (err) { e.textContent = err.message; }
    },
    monCompte() { fenetreCompte(); },
    compteFermer() { const f = $("#compte-fen"); if (f) f.remove(); },
    deconnecter() { const f = $("#compte-fen"); if (f) f.remove(); fermerSession(); render(); toast("Déconnecté(e). L'espace reste ouvert.", "ok"); },
    monMdp() { const f = $("#compte-fen"); if (f) f.remove(); fenetreMdp("🔑 Changer mon mot de passe", "Le nouveau mot de passe vaut pour le portail et pour les modules ouverts depuis le portail.", P.compte.login, true); },
    mdpFermer() { const f = $("#mdp-fen"); if (f) f.remove(); },
    async mdpValider(el) {
      const n = $("#mdpNouveau").value, e = $("#mdpErr"), l = el.dataset.l;
      if (n !== $("#mdpConf").value) { e.textContent = "Les deux mots de passe ne correspondent pas."; return; }
      const m = CPT.controlerMdp(n, l); if (m) { e.textContent = m; return; }
      if (el.dataset.ancien === "1") {
        e.textContent = "Enregistrement…";
        try { await CPT.changerMotDePasse(l, $("#mdpAncien").value, n); P.comptesData = await CPT.lire(); CP.brouillon = null; $("#mdp-fen").remove(); toast("Mot de passe changé.", "ok"); render(); }
        catch (err) { e.textContent = err.message; }
        return;
      }
      const c = CP.brouillon.find(x => x.login === l); if (c) c._mdp = n;
      $("#mdp-fen").remove(); render(); toast(`Nouveau mot de passe de ${l} prêt : enregistrez la matrice.`, "ok");
    },
    cpMdp(el) { fenetreMdp(`🔑 Nouveau mot de passe de ${el.dataset.l}`, "Transmettez-le par un autre canal ; l'utilisateur le changera dans 👤 Mon compte.", el.dataset.l, false); },
    cpActif(el) { const c = CP.brouillon.find(x => x.login === el.dataset.l); if (c) { c.actif = !c.actif; render(); } },
    cpAnnuler() { CP.brouillon = null; render(); },
    cpImprimer() { window.print(); },
    cpExporter() { WerbSocle.telecharger(new Blob([cpCsv()], { type: "text/csv;charset=utf-8" }), `Comptes_droits_${(P.groupe.sigle || "ESPACE").replace(/[^\w-]+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`); toast("Matrice exportée (CSV).", "ok"); },
    cpAjouter() {
      const l = $("#cpLogin").value.trim(), n = WerbSocle.lien.nettoyerNom($("#cpNom").value), m = $("#cpMdp").value;
      if (!CPT.identifiantValide(l)) { toast("Identifiant : 3 à 40 caractères parmi lettres, chiffres, point, tiret et soulignement.", "err"); return; }
      if (CP.brouillon.some(c => c.login.toLowerCase() === l.toLowerCase())) { toast("Cet identifiant existe déjà.", "err"); return; }
      if (!n) { toast("Indiquez le nom (Prénom NOM).", "err"); return; }
      const e = CPT.controlerMdp(m, l); if (e) { toast(e, "err"); return; }
      CP.brouillon.push({ login: l, nom: n, actif: true, droits: {}, _mdp: m }); render(); toast(`${l} ajouté : choisissez ses rôles puis enregistrez.`, "ok");
    },
    async cpEnregistrer() {
      if (cpControles().some(x => x[0] === "ko")) return;
      const d = JSON.parse(JSON.stringify(P.comptesData)), par = P.compte.login, anciens = new Map(d.comptes.map(c => [c.login, c])), sortie = [];
      try {
        for (const b of CP.brouillon) {
          let c = anciens.get(b.login);
          if (!c) { c = await CPT.nouveauCompte(b.login, b.nom, b._mdp, b.droits); c.actif = b.actif; CPT.tracer(d, par, "Création", b.login, "", `${b.nom} – ${CPT.texteDroits(b.droits)}`); }
          else {
            const av = CPT.texteDroits(c.droits), ap = CPT.texteDroits(b.droits);
            if (av !== ap) { CPT.tracer(d, par, "Droits", b.login, av, ap); c.droits = CPT.nettoyerDroits(b.droits); }
            if ((c.actif !== false) !== b.actif) { CPT.tracer(d, par, b.actif ? "Réactivation" : "Désactivation", b.login); c.actif = b.actif; }
            if (b._mdp) { const n = await CPT.nouveauCompte(b.login, b.nom, b._mdp, {}); Object.assign(c, { sel: n.sel, iterations: n.iterations, empreinte: n.empreinte, mdpLe: n.mdpLe }); CPT.tracer(d, par, "Mot de passe", b.login, "", "réinitialisé par un administrateur"); }
          }
          sortie.push(c);
        }
        d.comptes = sortie;
        await CPT.ecrire(d, par, CP.revision);
        P.comptesData = await CPT.lire(); CP.brouillon = null; resynchroniserSession(); P.ticket = connecte() ? await CPT.ticket(P.compte).catch(() => "") : "";
        toast("Comptes et droits enregistrés.", "ok");
      } catch (err) { toast(err.message, "err"); }
      render();
    },
  };
  Object.assign(ACTIONS, ACTIONS_COMPTES);
  document.addEventListener("change", e => {
    const s = e.target.closest("select[data-cpl]"); if (!s || !CP.brouillon) return;
    const c = CP.brouillon.find(x => x.login === s.dataset.cpl); if (!c) return;
    if (s.value) c.droits[s.dataset.cpc] = s.value; else delete c.droits[s.dataset.cpc];
    render();
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    if (["cxLogin", "cxMdp"].includes(e.target.id)) ACTIONS.cxValider();
    else if (["caLogin", "caNom", "caMdp", "caMdp2"].includes(e.target.id)) ACTIONS.caValider();
  });

  document.addEventListener("click", e => {
    const site = e.target.closest("[data-site]");
    if (site) { e.preventDefault(); P.vue = "site"; P.site = site.dataset.site; render(); $("#main").scrollTop = 0; return; }
    const nav = e.target.closest("[data-nav]");
    if (nav && nav.dataset.nav === "recueil") { e.preventDefault(); ouvrirRecueil(); return; }   // thème du moment transmis
    if (nav) { P.vue = nav.dataset.nav; render(); $("#main").scrollTop = 0; return; }
    const act = e.target.closest("[data-act]");
    if (act && ACTIONS[act.dataset.act]) ACTIONS[act.dataset.act](act, e);
  });

  WerbSocle.theme.surChangement(() => render());   // liens vers les modules : thème choisi (charte §7.5)
  render();
})();
