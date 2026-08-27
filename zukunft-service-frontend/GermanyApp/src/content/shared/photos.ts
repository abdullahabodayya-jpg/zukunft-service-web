/**
 * Where every photograph lives. Locale-invariant, defined exactly once.
 *
 * This sits on the spine, next to `services.meta.ts`, for the same reason the
 * slugs do: a photo path is a property of the thing, not of the language. Put
 * these in the two locale files and German and Arabic can drift to different
 * pictures for the same service, which is exactly the class of bug the
 * spine/body split exists to make impossible.
 *
 * THE ALT TEXT IS NOT HERE. Alt text is prose, it is per-locale, and it already
 * lives in the content files as `imageAlt`.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FILENAMES ARE NOT DERIVABLE - do not replace this map with a template string.
 *
 * The office five happen to be `<ServiceId>.jpg`. The cleaning eight are NOT:
 * their filenames are German, our ids are English, and only `restaurants`
 * coincides.
 *
 *     homes        -> cleaning-haeuser-wohnungen     offices -> cleaning-bueros-praxen
 *     retail       -> cleaning-geschaefte            windows -> cleaning-fenster-glas
 *     move-out     -> cleaning-umzug-renovierung     schools -> cleaning-schulen
 *     common-areas -> cleaning-treppenhaus           restaurants -> cleaning-restaurants
 *
 * A `cleaning-${id}.jpg` template compiles, type-checks and silently 404s seven
 * of eight tiles. Keep the mapping explicit and greppable.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Slots whose file has not landed yet stay listed. `photoExists` resolves them
 * at build time and the component renders a tinted plate until the file
 * arrives - see `src/lib/photo.ts`.
 */

import type { ServiceId } from '@/types/content';

const DIR = '/images/services';

/** One per service, including cleaning's own detail-page hero. */
export const SERVICE_PHOTOS: Readonly<Record<ServiceId, string>> = {
  authorities: `${DIR}/authorities.jpg`,
  'marriage-translation': `${DIR}/marriage-translation.jpg`,
  'study-visa': `${DIR}/study-visa.jpg`,
  finance: `${DIR}/finance.jpg`,
  'real-estate': `${DIR}/real-estate.jpg`,
  cleaning: `${DIR}/cleaning.jpg`,
};

/** Keyed by `CleaningType.id`. See the warning above before touching these. */
export const CLEANING_PHOTOS: Readonly<Record<string, string>> = {
  homes: `${DIR}/cleaning-haeuser-wohnungen.jpg`,
  offices: `${DIR}/cleaning-bueros-praxen.jpg`,
  schools: `${DIR}/cleaning-schulen.jpg`,
  restaurants: `${DIR}/cleaning-restaurants.jpg`,
  retail: `${DIR}/cleaning-geschaefte.jpg`,
  'move-out': `${DIR}/cleaning-umzug-renovierung.jpg`,
  'common-areas': `${DIR}/cleaning-treppenhaus.jpg`,
  windows: `${DIR}/cleaning-fenster-glas.jpg`,
};

/** The home-page hero. Kept in the same folder as the rest, per the agreed
 *  convention, even though it is not a service. */
export const HERO_PHOTO = `${DIR}/hero.jpg`;

export function cleaningPhoto(id: string): string | undefined {
  return CLEANING_PHOTOS[id];
}
