import type { Fact } from "@/content/types";

/** Demo mode is the default: banner on every page and no search-engine indexing. */
export const isDemo = process.env.NEXT_PUBLIC_SITE_MODE !== "production";

/**
 * Public URL: the explicit setting wins; on Vercel the production domain assigned by the platform is used;
 * otherwise local development. No URL is ever guessed.
 */
const platformHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (platformHost ? `https://${platformHost}` : "http://localhost:3000")).replace(/\/$/, "");

/**
 * The WhatsApp number comes from the environment, or from the config only once the
 * establishment has confirmed it. A demo build never opens a chat with a real number.
 */
export function resolveWhatsapp(configured: Fact | null): string | null {
  const fromEnv = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  if (fromEnv.length >= 8) return fromEnv;
  if (configured?.status === "confirme") return configured.value.replace(/\D/g, "");
  return null;
}

export function telHref(fact: Fact | null): string | null {
  if (!fact || fact.status !== "confirme") return null;
  return `tel:${fact.value.replace(/[^\d+]/g, "")}`;
}
