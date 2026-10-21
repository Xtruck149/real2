// Automated checks for the mockup: links, routes, layout on 3 screen sizes, mobile menu,
// forms (validation errors, success, network error) and the demo WhatsApp button.
//
//   npm run build && npm run start   (in another terminal)
//   npm run verify                    (BASE_URL=http://localhost:3000 by default)
//
// Chromium path: CHROMIUM_PATH, otherwise the browser installed by Playwright.
import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const OUT = "verify-output";
const VIEWPORTS = [
  { name: "mobile", width: 360, height: 780, isMobile: true, hasTouch: true },
  { name: "tablette", width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: "ordinateur", width: 1280, height: 860 },
];
mkdirSync(OUT, { recursive: true });

const failures = [];
const log = (ok, msg) => {
  console.log(`${ok ? "✔" : "✘"} ${msg}`);
  if (!ok) failures.push(msg);
};

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });

// 1. Crawl every internal link from the home page.
const ctx = await browser.newContext();
const page = await ctx.newPage();
const seen = new Set();
const queue = ["/"];
const pages = [];
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  log(res?.status() === 200, `HTTP 200 : ${path} (${res?.status()})`);
  if (res?.status() !== 200) continue;
  pages.push(path);
  const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const href of links) {
    if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0].split("?")[0] || "/";
    if (!seen.has(clean) && !clean.startsWith("/api")) queue.push(clean);
  }
}
for (const extra of ["/sitemap.xml", "/robots.txt"]) {
  const r = await page.request.get(BASE + extra);
  log(r.status() === 200, `HTTP 200 : ${extra}`);
}
const missing = await page.request.get(BASE + "/page-qui-n-existe-pas");
log(missing.status() === 404, "Une URL inconnue renvoie bien 404");

// 1b. Demo transparency, search-engine rules, headers and secrets, checked on the served HTML.
const SECRET_PATTERNS = [/vcp_[A-Za-z0-9]{16,}/, /sk_(live|test)_[A-Za-z0-9]{10,}/, /AKIA[0-9A-Z]{16}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/, /ghp_[A-Za-z0-9]{20,}/, /gho_[A-Za-z0-9]{20,}/];
let demo = false;
for (const path of pages) {
  const r = await page.request.get(BASE + path);
  const html = await r.text();
  if (path === "/") {
    demo = /Maquette de démonstration/.test(html);
    const h = r.headers();
    log(h["x-content-type-options"] === "nosniff" && !!h["referrer-policy"] && !!h["permissions-policy"], "en-têtes de sécurité présents (nosniff, referrer-policy, permissions-policy)");
    log(!h["x-powered-by"], "l'en-tête X-Powered-By est masqué");
  }
  const leaked = SECRET_PATTERNS.find((re) => re.test(html));
  log(!leaked, `${path} : aucun secret dans le HTML publié`);
  if (demo) log(/<meta name="robots" content="noindex/.test(html), `${path} : noindex en mode démonstration`);
}
if (demo) {
  const robots = await (await page.request.get(BASE + "/robots.txt")).text();
  log(/Disallow:\s*\//.test(robots), "robots.txt fermé en mode démonstration");
  const home = await (await page.request.get(BASE + "/")).text();
  const ld = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const org = ld[0] ?? {};
  log(org.telephone === undefined && org.email === undefined && org.openingHours === undefined, "JSON-LD : ni téléphone, ni e-mail, ni horaires non confirmés");
  log(org.address?.streetAddress === undefined && org.image === undefined && !(org.sameAs?.length), "JSON-LD : ni adresse, ni image, ni réseaux non confirmés");
  const sm = await (await page.request.get(BASE + "/sitemap.xml")).text();
  log(sm.includes("<loc>"), "sitemap.xml présent et non vide");
  const tel = await page.request.get(BASE + "/contact").then((r) => r.text());
  log(!/href="tel:/.test(tel) && !/href="mailto:/.test(tel) && !/wa\.me\//.test(tel), "/contact : aucun lien tel:, mailto: ou WhatsApp tant que rien n'est confirmé");
}
await ctx.close();

// 2. Layout checks on each page and screen size.
for (const vp of VIEWPORTS) {
  const c = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  const p = await c.newPage();
  const errors = [];
  p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  p.on("pageerror", (e) => errors.push(String(e)));
  for (const path of pages) {
    errors.length = 0;
    await p.goto(BASE + path, { waitUntil: "networkidle" });
    const m = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll("h1").length,
      noAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
      unnamedButtons: [...document.querySelectorAll("button")].filter((b) => !(b.textContent.trim() || b.getAttribute("aria-label"))).length,
      lang: document.documentElement.lang,
      title: document.title,
    }));
    const tag = `[${vp.name}] ${path}`;
    log(m.overflow <= 0, `${tag} : pas de défilement horizontal (${m.overflow}px)`);
    log(m.h1 === 1, `${tag} : un seul h1 (${m.h1})`);
    log(m.noAlt === 0 && m.unnamedButtons === 0, `${tag} : images avec alt et boutons nommés`);
    log(errors.length === 0, `${tag} : aucune erreur console${errors.length ? " — " + errors[0].slice(0, 120) : ""}`);
    if (path === "/" ) log(m.lang === "fr" && m.title.length > 10, `${tag} : langue et titre définis`);
    // Scroll like a visitor so scroll-triggered content appears, then check that nothing stays hidden.
    await p.evaluate(async () => {
      const step = Math.max(200, Math.floor(window.innerHeight * 0.6));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    const stillHidden = await p.evaluate(() => document.querySelectorAll('[data-appear="hidden"]').length);
    log(stillHidden === 0, `${tag} : aucun contenu resté masqué après défilement (${stillHidden})`);
    await p.screenshot({ path: `${OUT}/${vp.name}${path === "/" ? "-accueil" : path.replace(/\//g, "-")}.png`, fullPage: true });
  }

  // 3. Mobile menu.
  if (vp.width < 1024) {
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    const toggle = p.locator('button[aria-controls="menu-mobile"]');
    log(await toggle.isVisible(), `[${vp.name}] bouton du menu mobile visible`);
    await toggle.click();
    log((await toggle.getAttribute("aria-expanded")) === "true" && (await p.locator("#menu-mobile").isVisible()), `[${vp.name}] le menu s'ouvre`);
    await p.keyboard.press("Escape");
    log((await toggle.getAttribute("aria-expanded")) === "false" && !(await p.locator("#menu-mobile").isVisible()), `[${vp.name}] Échap ferme le menu`);
    await toggle.click();
    const target = p.locator("#menu-mobile a").nth(1);
    const href = await target.getAttribute("href");
    await target.click();
    await p.waitForURL(BASE + href);
    await p.locator("#menu-mobile").waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
    log(!(await p.locator("#menu-mobile").isVisible()), `[${vp.name}] le menu se ferme après navigation vers ${href}`);
  }
  await c.close();
}

// 4. Forms: empty submit -> errors, valid submit -> success, API failure -> error message.
const fc = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const fp = await fc.newPage();
const inSevenDays = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
async function fill(form) {
  for (const field of await form.locator("input:not([type=hidden]):not([name=website]), select, textarea").all()) {
    const tag = await field.evaluate((e) => e.tagName.toLowerCase());
    const type = (await field.getAttribute("type")) || "";
    if (type === "checkbox") { await field.check(); continue; }
    if (tag === "select") {
      const values = await field.locator("option").evaluateAll((os) => os.map((o) => o.value).filter(Boolean));
      if (values.length) await field.selectOption(values[0]);
      continue;
    }
    const value = { tel: "07 00 00 00 00", email: "test@example.com", date: inSevenDays, time: "20:00", number: String((await field.getAttribute("min")) || 2) }[type];
    await field.fill(value ?? (tag === "textarea" ? "Message de test pour la vérification automatique." : "Test Démo"));
  }
}
const formPages = [];
for (const path of pages) {
  await fp.goto(BASE + path, { waitUntil: "networkidle" });
  for (const kind of await fp.$$eval("form[data-form]", (fs) => fs.map((f) => f.dataset.form))) formPages.push({ path, kind });
}
log(formPages.length > 0, `formulaires trouvés : ${formPages.map((f) => `${f.kind}@${f.path}`).join(", ")}`);
for (const { path, kind } of formPages) {
  const sel = `form[data-form="${kind}"]`;
  await fp.goto(BASE + path, { waitUntil: "networkidle" });
  await fp.locator(`${sel} button[type=submit]`).click();
  const invalid = await fp.locator(`${sel} [aria-invalid="true"]`).count();
  log(invalid > 0 && (await fp.locator(`${sel} [data-testid=error-summary]`).isVisible()), `[${kind}] envoi vide : ${invalid} champs signalés + récapitulatif`);
  log(await fp.evaluate(() => document.activeElement?.dataset?.testid === "error-summary"), `[${kind}] le focus va au récapitulatif d'erreurs`);

  await fp.route("**/api/demandes", (r) => r.fulfill({ status: 500, body: "{}" }));
  await fill(fp.locator(sel));
  await fp.locator(`${sel} button[type=submit]`).click();
  await fp.locator(`${sel} [data-testid=network-error]`).waitFor({ timeout: 5000 }).catch(() => {});
  log(await fp.locator(`${sel} [data-testid=network-error]`).isVisible(), `[${kind}] panne serveur : message d'erreur affiché, saisie conservée`);
  await fp.unroute("**/api/demandes");

  await fp.route("**/api/demandes", async (r) => { await new Promise((ok) => setTimeout(ok, 600)); await r.continue(); });
  await fp.locator(`${sel} button[type=submit]`).click();
  log((await fp.locator(`${sel} button[type=submit]`).getAttribute("aria-busy")) === "true", `[${kind}] état de chargement pendant l'envoi`);
  const success = fp.locator('[data-state="success"]');
  await success.waitFor({ timeout: 8000 }).catch(() => {});
  log(await success.isVisible(), `[${kind}] envoi valide : message de succès`);
  if (demo) {
    const text = (await success.innerText()).replace(/\s+/g, " ");
    log(/rien n.a été envoyé/i.test(text) && !/bien partie|bien été transmis|bien été envoy/i.test(text), `[${kind}] démonstration : le message de succès n'affirme jamais qu'une demande est partie`);
    await fp.goto(BASE + path, { waitUntil: "networkidle" });
    log(await fp.locator(`${sel} [data-testid=demo-form-note]`).isVisible(), `[${kind}] démonstration : avertissement visible avant l'envoi`);
  }
  await fp.unroute("**/api/demandes");
}

// Server-side validation is enforced even without the browser.
const bad = await fp.request.post(BASE + "/api/demandes", { data: { kind: formPages[0]?.kind, nom: "" } });
log(bad.status() === 422, `API : données invalides refusées (HTTP ${bad.status()})`);
const unknown = await fp.request.post(BASE + "/api/demandes", { data: { kind: "inconnu" } });
log(unknown.status() === 400, `API : type de demande inconnu refusé (HTTP ${unknown.status()})`);
const arrayBody = await fp.request.post(BASE + "/api/demandes", { data: [1, 2, 3] });
log(arrayBody.status() === 400, `API : corps JSON inattendu (tableau) refusé (HTTP ${arrayBody.status()})`);
const garbage = await fp.request.post(BASE + "/api/demandes", { headers: { "content-type": "application/json" }, data: "{pas du json" });
log(garbage.status() === 400, `API : JSON invalide refusé sans erreur serveur (HTTP ${garbage.status()})`);
const foreign = await fp.request.post(BASE + "/api/demandes", { headers: { origin: "https://site-etranger.example" }, data: { kind: formPages[0]?.kind } });
log(foreign.status() === 403, `API : requête d'une autre origine refusée (HTTP ${foreign.status()})`);
const huge = await fp.request.post(BASE + "/api/demandes", { data: { kind: formPages[0]?.kind, message: "x".repeat(20000) } });
log(huge.status() === 413, `API : corps trop volumineux refusé (HTTP ${huge.status()})`);
const trap = await fp.request.post(BASE + "/api/demandes", { data: { kind: formPages[0]?.kind, website: "http://spam.example" } });
const trapBody = await trap.json();
log(trap.status() === 200 && trapBody.reference === "DEMO-IGNORE", "API : champ piège rempli = ignoré en silence, rien n'est traité");
const cache = bad.headers()["cache-control"] ?? "";
log(cache.includes("no-store"), "API : réponses jamais mises en cache");
const okReq = await fp.request.post(BASE + "/api/demandes", {
  data: formPages[0]?.kind === "evenement"
    ? { kind: "evenement", nom: "Test", telephone: "0700000000", typeEvenement: "autre", date: inSevenDays, invites: 10, message: "Message de test automatique.", consentement: true, website: "" }
    : { kind: "reservation", nom: "Test", telephone: "0700000000", date: inSevenDays, heure: "20:00", personnes: 2, consentement: true, website: "" },
});
const okBody = await okReq.json();
log(okReq.status() === 200 && okBody.mode === "demo" && /^DEMO-/.test(okBody.reference), `API : une demande valide est reconnue comme démonstration (${okBody.reference})`);

// 5. WhatsApp in demo mode explains instead of opening a chat.
await fp.goto(BASE + "/", { waitUntil: "networkidle" });
await fp.locator('nav[aria-label="Actions rapides"] a', { hasText: "WhatsApp" }).click();
log(await fp.locator("dialog[open]").isVisible(), "WhatsApp (démo) : fenêtre d'information au lieu d'un vrai numéro");
await fc.close();
await browser.close();

writeFileSync(`${OUT}/rapport.json`, JSON.stringify({ base: BASE, date: new Date().toISOString(), pages, failures }, null, 2));
console.log(`\n${failures.length === 0 ? "TOUT EST VERT" : `${failures.length} ÉCHEC(S)`} — captures et rapport dans ${OUT}/`);
process.exit(failures.length ? 1 : 0);
