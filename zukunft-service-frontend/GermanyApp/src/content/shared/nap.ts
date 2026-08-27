/**
 * Confirmed business data - the single source of truth for the footer, the info
 * strip, the contact page, the LocalBusiness JSON-LD and the Impressum shell.
 *
 * Client-confirmed 20 Aug 2026 (docs/PLAN.md §2):
 *   Ruhrallee 55, 44139 Dortmund · +49 177 3825632 · info@zukunftservice.de
 *   Mon–Wed 10:00–16:00 · Thu 10:00–15:00 · Fri 10:00–13:00 · Sat/Sun closed.
 *
 * HOURS ARE NOT UNIFORM. Thursday closes at 15:00 and Friday at 13:00. An
 * earlier build had all five weekdays at 10–16; the client corrected that in the
 * SC1–SC15 change report (SC8) and re-confirmed it on 24 Aug 2026. Do not tidy
 * these back into one Mo–Fr range - they feed `openingHoursSpecification`, which
 * Google prints directly in Search and Maps, and a wrong closing time sends a
 * customer to a locked door.
 *
 * Fields still outstanding carry the «…» sentinel. Every one of them is a
 * mandatory § 5 DDG Impressum field, and they are the client's own business
 * data - the legal name on their Gewerbeanmeldung, their legal form, the
 * responsible person. Nobody else can supply them.
 *
 * They do NOT gate anything. The build passes, every page renders and the site
 * deploys with the sentinels in place. `hasUnresolvedPlaceholders()` is a
 * read-only helper: the Impressum page uses it to show a visible notice so the
 * gap is obvious rather than silently passing as real data. Filling the three
 * strings below is the whole job - no code changes, no redeploy logic.
 */

import type { NapData } from '@/types/content';

/**
 * Opening guillemet. Any string containing it is unconfirmed placeholder data.
 *
 * SCOPE WARNING: « and » are ordinary quotation marks in Arabic, and the
 * content already uses them that way - the contact form's «لست متأكدًا» hint.
 * This test is therefore only safe on the three Impressum fields below, which
 * are proper nouns and never Arabic prose. Widening it to scan content would
 * flag that hint as a placeholder and put a red "incomplete" banner on a
 * finished page. If you ever need a broader check, change the sentinel to a
 * marker prose cannot produce first - do not just extend this one.
 */
export const PLACEHOLDER_PREFIX = '«';

/** True when a value is still an unconfirmed placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.includes(PLACEHOLDER_PREFIX);
}

export const NAP = {
  // All three § 5 DDG fields confirmed by the client on 26 Aug 2026.
  //
  // Einzelunternehmen, as the missing corporate suffix suggested. Under § 5 DDG
  // the Anbieter of a sole proprietorship is the PERSON, so the page has to
  // name Mohamad Zyada as well as the trade name - it does, under
  // `representativeHeading`, which is what makes the provider identifiable.
  // Do not drop that section on the grounds that a sole trader has no
  // "representative": removing it would take the natural person off the page.
  legalName: 'Zukunft Service Dienstleistungen & Reinigung',
  legalForm: 'Einzelunternehmen',
  managingDirector: 'Mohamad Zyada',
  vatId: null,
  registerCourt: null,
  registerNumber: null,

  // ── Confirmed ────────────────────────────────────────────────────────────
  tradeName: 'Zukunft Service',

  street: 'Ruhrallee 55',
  postalCode: '44139',
  city: 'Dortmund',
  region: 'Nordrhein-Westfalen',
  country: 'DE',

  phoneE164: '+491773825632',
  phoneDisplay: '+49 177 3825632',
  phoneDigits: '491773825632',
  whatsappE164: '+491773825632',
  email: 'info@zukunftservice.de',

  // Link out only - never an iframe. An embedded map transmits the visitor's
  // IP to Google on page load, which triggers consent and therefore a banner.
  mapsUrl: 'https://maps.google.com/?q=Ruhrallee+55+44139+Dortmund',

  hours: [
    { day: 'mon', open: '10:00', close: '16:00' },
    { day: 'tue', open: '10:00', close: '16:00' },
    { day: 'wed', open: '10:00', close: '16:00' },
    { day: 'thu', open: '10:00', close: '15:00' },
    { day: 'fri', open: '10:00', close: '13:00' },
    { day: 'sat', open: null, close: null },
    { day: 'sun', open: null, close: null },
  ],

  availableLanguages: ['de', 'ar'],

  verified: {
    address: true,
    phone: true,
    email: true,
    hours: true,
  },
} satisfies NapData;

/** Convenience: the address as one line, e.g. for a JSON-LD `name` fallback. */
export const ADDRESS_ONE_LINE = `${NAP.street}, ${NAP.postalCode} ${NAP.city}`;

/** True while any Impressum field is still a «…» sentinel. */
export function hasUnresolvedPlaceholders(): boolean {
  return (
    isPlaceholder(NAP.legalName) ||
    isPlaceholder(NAP.legalForm) ||
    isPlaceholder(NAP.managingDirector)
  );
}
