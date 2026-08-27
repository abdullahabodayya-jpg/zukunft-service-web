/**
 * The site origin, resolved once.
 *
 * WHY THIS EXISTS: `process.env.NEXT_PUBLIC_SITE_URL ?? fallback` looks correct
 * and is not. `??` only substitutes for null and undefined, so an environment
 * variable that is DEFINED BUT EMPTY - the normal result of adding a key in a
 * CI dashboard and leaving the value blank - passes straight through as ''.
 * `new URL('')` then throws, and because metadataBase and the sitemap are
 * evaluated during prerendering, the whole build dies with a bare
 * "TypeError: Invalid URL" at the collecting-page-data step.
 *
 * That is exactly how the first Vercel deploy of this project failed.
 *
 * So: treat empty and whitespace as missing, validate by parsing, and fall back
 * rather than crash. Returning `.origin` also normalises away a trailing slash,
 * which otherwise produces `https://host//de` in the sitemap.
 *
 * WHY THE VERCEL HOST IS READ HERE rather than pasted in as a constant: this
 * project has now been deployed under three different generated hostnames
 * (germany-app-zeta, germany-app-three, germany-app-2ac1). Vercel mints a new
 * one every time the project is recreated, so any hostname hard-coded in source
 * is stale by the next redeploy - and a stale origin here silently poisons the
 * canonical tags, the sitemap and the JSON-LD rather than failing loudly.
 * Reading the host Vercel itself injects is correct on every deployment without
 * anyone remembering to update a file.
 *
 * ORDER OF PRECEDENCE, most specific first:
 *   1. NEXT_PUBLIC_SITE_URL  - set this to https://zukunftservice.de at launch
 *   2. VERCEL_PROJECT_PRODUCTION_URL - whatever Vercel is currently serving
 *   3. FALLBACK_ORIGIN - the client's real domain
 *
 * Every consumer of SITE_URL is server-side (robots, sitemap, layout metadata,
 * JSON-LD) and every page is prerendered, so an unprefixed environment variable
 * is available exactly where it is read. Do not import SITE_URL into a client
 * component without moving to a NEXT_PUBLIC_ variable first.
 */

const FALLBACK_ORIGIN = 'https://zukunftservice.de';

/** Parses to an origin, or undefined. Never throws - see the note above. */
function toOrigin(value: string | undefined): string | undefined {
  const raw = value?.trim();
  if (raw === undefined || raw.length === 0) return undefined;

  try {
    return new URL(raw).origin;
  } catch {
    return undefined;
  }
}

function resolveSiteUrl(): string {
  // Vercel injects the bare host with no scheme, e.g. "germany-app-2ac1.vercel.app".
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  return (
    toOrigin(process.env.NEXT_PUBLIC_SITE_URL)
    ?? toOrigin(vercelHost === undefined || vercelHost.length === 0 ? undefined : `https://${vercelHost}`)
    ?? FALLBACK_ORIGIN
  );
}

/** Absolute origin, no trailing slash. Safe to interpolate and to pass to URL. */
export const SITE_URL = resolveSiteUrl();
