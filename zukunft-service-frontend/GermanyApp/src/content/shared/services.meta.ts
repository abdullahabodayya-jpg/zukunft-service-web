/**
 * The locale-invariant service spine.
 *
 * Slugs are German in BOTH locales and defined exactly once, here. That is what
 * guarantees the language switch always has a target and always lands on the
 * equivalent page. Localized Arabic slugs were rejected because percent-encoded
 * Arabic (`/ar/%D8%A7%D9%84%D8%AE...`) looks broken when pasted into WhatsApp,
 * which is this audience's primary sharing channel.
 *
 * Because icon and slug live here rather than in the per-locale content,
 * it is structurally impossible for the German and Arabic sites to disagree
 * about URLs, iconography or ordering.
 *
 * Taxonomy source: docs/research/01-content-and-ia.md §5.
 */

import {
  OFFICE_SERVICE_IDS,
  SERVICE_IDS,
  type ServiceId,
  type ServiceMeta,
} from '@/types/content';

export const SERVICE_META: Record<ServiceId, ServiceMeta> = {
  authorities: {
    id: 'authorities',
    slug: 'einbuergerung-behoerden-dokumente',
    // A stamped document - the single most recognisable object in this world.
    icon: 'Stamp',
    arm: 'office',
    // Naturalisation and authority work sits near the RDG boundary.
    legalSensitivity: 'medium',
  },
  'marriage-translation': {
    id: 'marriage-translation',
    slug: 'ehe-uebersetzungen-dokumente',
    // Two scripts - mirrors the whole site's bilingual premise.
    icon: 'Languages',
    arm: 'office',
    legalSensitivity: 'medium',
  },
  'study-visa': {
    id: 'study-visa',
    slug: 'studium-universitaet-visa',
    icon: 'GraduationCap',
    arm: 'office',
    legalSensitivity: 'medium',
  },
  finance: {
    id: 'finance',
    slug: 'finanzen-kredite-vorsorge',
    // An institution, deliberately NOT a coin or money bag: the copy must not
    // imply that we handle money.
    icon: 'Landmark',
    arm: 'office',
    // "Lebensversicherung, Alters- und Zukunftsvorsorge" is § 34d GewO
    // territory. Highest-risk copy on the site.
    legalSensitivity: 'high',
  },
  'real-estate': {
    id: 'real-estate',
    slug: 'immobilien-investitionen',
    icon: 'Building2',
    arm: 'office',
    // § 34c / § 34i GewO - real estate and loan brokerage, incl. Dubai.
    legalSensitivity: 'high',
  },
  cleaning: {
    id: 'cleaning',
    slug: 'reinigungsservice',
    icon: 'CleaningCart',
    // The second arm of the business. Deliberately NOT in the office grid
    // (SC9) - it has its own home section and its own page.
    arm: 'cleaning',
    legalSensitivity: 'low',
  },
};

/**
 * All six, in the client's own order. Routing, the sitemap and static params
 * use this - every one of them has a page.
 *
 * Do NOT render the grid from this list; use OFFICE_SERVICES_IN_ORDER.
 */
export const SERVICES_IN_ORDER: readonly ServiceMeta[] = SERVICE_IDS.map(
  (id) => SERVICE_META[id],
);

/** The five office services, in order. This is what the services grid renders. */
export const OFFICE_SERVICES_IN_ORDER: readonly ServiceMeta[] = OFFICE_SERVICE_IDS.map(
  (id) => SERVICE_META[id],
);

/** Slug → id, for resolving a `[slug]` route param. */
export const SERVICE_ID_BY_SLUG: Readonly<Record<string, ServiceId>> = Object.fromEntries(
  SERVICE_IDS.map((id) => [SERVICE_META[id].slug, id] as const),
);

export function getServiceMeta(id: ServiceId): ServiceMeta {
  return SERVICE_META[id];
}

export function serviceSlug(id: ServiceId): string {
  return SERVICE_META[id].slug;
}

/** `undefined` for an unknown slug - the route should then call `notFound()`. */
export function serviceIdFromSlug(slug: string): ServiceId | undefined {
  return SERVICE_ID_BY_SLUG[slug];
}

/**
 * The other OFFICE services, for the "you might also need" row at the foot of a
 * service page. Office-only on purpose: cleaning is a different arm of the
 * business and surfacing it here would undo the separation the grid enforces.
 */
export function siblingServices(id: ServiceId, count = 3): readonly ServiceMeta[] {
  return OFFICE_SERVICES_IN_ORDER.filter((meta) => meta.id !== id).slice(0, count);
}
