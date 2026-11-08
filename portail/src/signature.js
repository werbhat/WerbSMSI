/*! WerbSMSI – Développé par @WerbHat */
/* Identité du portail : source unique utilisée par l'interface et l'assemblage (werb_charte.py portail). */
const WERB = Object.freeze((() => {
  const bytes = [68, 195, 169, 118, 101, 108, 111, 112, 112, 195, 169, 32, 112, 97, 114, 32, 64, 87, 101, 114, 98, 72, 97, 116];
  const signature = new TextDecoder("utf-8").decode(new Uint8Array(bytes));
  const produit = "WerbSMSI";
  const version = "1.13.0";
  return {
    id: "werbsmsi",
    produit, version, auteur: "@WerbHat", signature,
    integration: "",
    description: "Portail de l'environnement SMSI : rubriques, modules, espaces groupe et sites, mise en place guidée",
    rubrique: "",
    portees: ["groupe", "site"],
    charte: "1.0",
    ligne: `${produit} v${version} – ${signature}`,
    format: "WERBSMSI-PORTAIL",                                               // le portail ne produit pas de base
    schema: 1,
    formatsLus: [],
    extension: ".werbsmsi.json",
  };
})());
window.WERB = WERB;
console.info(`%c${WERB.produit}%c v${WERB.version} — ${WERB.signature}`, "font-weight:bold;color:#1f3864", "color:#595959");
