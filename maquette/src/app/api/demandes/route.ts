import { NextResponse } from "next/server";
import { isFormKind, validate } from "@/lib/forms";

/**
 * Receives form requests. In this mockup nothing is stored or forwarded: the data is validated and
 * acknowledged with a "DEMO-" reference, and the response says so (`mode: "demo"`). No reservation is ever
 * confirmed here. See README › "Brancher les formulaires" to connect an e-mail service or a spreadsheet once
 * the establishment has agreed.
 *
 * Protections: same-origin only, small bodies only, JSON only, per-IP rate limit, hidden honeypot field.
 * The rate limit lives in memory, so on a serverless host it is per instance: it slows casual abuse but is not
 * a hard guarantee. A real integration should add a shared store or the platform's firewall rate limiting.
 */

const WINDOW_MS = 60_000;
// Per IP and per minute; raise it for automated tests (see README, "Vérification automatique").
const MAX_PER_WINDOW = Number(process.env.RATE_LIMIT_PER_MINUTE) || 8;
const MAX_BODY_BYTES = 8 * 1024;
const hits = new Map<string, number[]>();

const NO_STORE = { "Cache-Control": "no-store" };
const json = (body: unknown, status: number) => NextResponse.json(body, { status, headers: NO_STORE });

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map small: forget addresses that have been quiet for a window.
  if (hits.size > 5000) for (const [key, times] of hits) if (now - times[times.length - 1] > WINDOW_MS) hits.delete(key);
  return recent.length > MAX_PER_WINDOW;
}

/** Browsers always send Origin on cross-site POSTs: refuse any that does not match this host. */
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients (tests, curl) send none
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ ok: false, error: "Origine non autorisée." }, 403);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return json({ ok: false, error: "Trop de demandes, réessayez dans une minute." }, 429);

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ ok: false, error: "Demande trop volumineuse." }, 413);
  const text = await request.text().catch(() => "");
  if (text.length > MAX_BODY_BYTES) return json({ ok: false, error: "Demande trop volumineuse." }, 413);

  let body: Record<string, unknown> | null = null;
  try {
    const parsed: unknown = JSON.parse(text);
    body = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null;
  } catch {
    body = null;
  }
  if (!body || !isFormKind(body.kind)) return json({ ok: false, error: "Type de demande inconnu." }, 400);

  // Honeypot: people never see this field. Bots that fill it get an answer shaped like a success and nothing else happens.
  if (typeof body.website === "string" && body.website.length > 0) {
    return json({ ok: true, reference: "DEMO-IGNORE", mode: "demo" }, 200);
  }

  const result = validate(body.kind, body);
  if (!result.ok) return json({ ok: false, errors: result.errors }, 422);

  const reference = `DEMO-${body.kind.slice(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
  // Personal data is deliberately not logged.
  console.info(`[demande] ${body.kind} ${reference} (mode démonstration, non transmise)`);
  return json({ ok: true, reference, mode: "demo" }, 200);
}
