/**
 * ZUKUNFT SERVICE - the content model.
 *
 * Spec: docs/research/01-content-and-ia.md §3 · docs/research/03-frontend-architecture.md §5.1
 *
 * There is no i18n library. Content is typed TS data, which makes
 * `tsc --noEmit` the translation-completeness check: a missing Arabic key is a
 * build failure, not a `[missing key]` string in production.
 *
 * THE SPINE / BODY SPLIT is the central idea. The spine - service ids, slugs,
 * icons, ordering, every required key of `SiteContent` - is locale-invariant or
 * `Record<Locale, …>`, so TypeScript errors on any omission. The body -
 * `blocks[]`, `items[]` - may diverge freely between German and Arabic, because
 * the client's two source PDFs genuinely differ in structure, not just wording.
 */

import type { Direction, Locale } from '@/lib/locale';

export type { Direction, Locale };

/** Alias kept for the content-side vocabulary in the research reports. */
export type Dir = Direction;

/** A string that must exist in both locales. */
export type LocalizedString = Record<Locale, string>;

/**
 * Content that has not been signed off by the client must never ship.
 * Any Arabic we author for a gap in the client's PDFs describes regulated
 * activities and needs a named human to approve the wording.
 */
export type ContentStatus = 'final' | 'draft-needs-client-approval';

/* ════════════════════════════════════════════════════════════════════════════
   SERVICES - the six verticals
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * The five OFFICE services. These, and only these, appear in the services grid.
 *
 * Cleaning is deliberately absent: the client separated the two arms, so the
 * grid shows office work and cleaning gets its own section and page.
 */
export const OFFICE_SERVICE_IDS = [
  'authorities', // Einbürgerung, Behörden & Dokumente
  'marriage-translation', // Ehe, Übersetzungen & int. Dokumente
  'study-visa', // Studium, Universität & Visa
  'finance', // Finanz- und Versicherungsthemen
  'real-estate', // Immobilien & Investitionen
] as const;

export type OfficeServiceId = (typeof OFFICE_SERVICE_IDS)[number];

/**
 * EVERY service that has content and a detail page - the office five plus
 * cleaning.
 *
 * Keeping cleaning in this list is what stops the split from silently breaking
 * the contact form. The form's category enum is derived from SERVICE_IDS, and
 * its dropdown option is typed only as `{ value: string }`, so dropping
 * cleaning here would compile, build and deploy cleanly and then reject every
 * cleaning enquiry at runtime. Customers still ask about cleaning; the grid is
 * a presentation choice, not a statement about what the business does.
 */
export const SERVICE_IDS = [...OFFICE_SERVICE_IDS, 'cleaning'] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

/** The contact form's "Worum geht es?" select - the six services plus an
 *  escape hatch, because the brand promise is "you don't know where to start". */
export type ServiceCategory = ServiceId | 'other';

/** The business has two arms and says so itself. This drives the §2 split. */
export type ServiceArm = 'office' | 'cleaning';

/**
 * Selects which scope-boundary notice a service page renders.
 * `high` = the copy is load-bearing for RDG / § 34c / § 34d GewO exposure.
 */
export type LegalSensitivity = 'low' | 'medium' | 'high';

/** lucide-react export name, narrowed so a typo or an upstream rename fails
 *  the build instead of rendering an empty box. */
export type IconName =
  | 'Stamp'
  | 'Languages'
  | 'GraduationCap'
  | 'Landmark'
  | 'Building2'
  | 'CleaningCart'
  | 'HandHeart'
  | 'Layers'
  | 'MessagesSquare'
  | 'Network'
  | 'Route'
  | 'Check'
  | 'Phone'
  | 'Mail'
  | 'Clock'
  | 'MapPin'
  | 'Sparkles'
  | 'FileText'
  | 'ShieldCheck'
  | 'Info';

/**
 * Which edge of a photo survives the crop.
 *
 * LOGICAL BY DESIGN. `start` and `end` flip with the reading direction, so a
 * subject anchored to the reading edge stays anchored in both German and
 * Arabic. `Photo` is the only component allowed to turn these into the
 * physical `object-*` classes CSS actually requires - see the note there for
 * why the RTL gate cannot catch a mistake made anywhere else.
 */
export type ImageFocal = 'center' | 'top' | 'start' | 'end';

export interface ImageRef {
  src: string;
  width: number;
  height: number;
  /** `alt` is per-locale, so it lives in the content, never here. */
  focal?: ImageFocal;
}

/**
 * Locale-invariant service spine. Because the slug lives here and not in the
 * per-locale content, it is structurally impossible for the German and Arabic
 * sites to have different URLs, icons or service ordering - which is what makes
 * the language switch guaranteed to land on the equivalent page.
 */
export interface ServiceMeta {
  id: ServiceId;
  /** German slug, used in BOTH locales. Percent-encoded Arabic looks broken
   *  when pasted into WhatsApp, which is this audience's sharing channel. */
  slug: string;
  icon: IconName;
  arm: ServiceArm;
  legalSensitivity: LegalSensitivity;
}

/* ════════════════════════════════════════════════════════════════════════════
   SERVICE BLOCKS
   The six services have genuinely different internal shapes. Do NOT model
   "flat list service" and "sub-block service" as two types - the same service
   is flat in Arabic and sub-blocked in German, which would make one service two
   types in two languages. Instead every service is ServiceBlock[]: a flat list
   is one untitled list block, sub-blocks are several titled ones.
   ═══════════════════════════════════════════════════════════════════════════ */

interface BlockBase {
  /** Stable across locales wherever the block is shared. */
  id: string;
}

export interface ListBlock extends BlockBase {
  kind: 'list';
  /** Absent ⇒ flat list with no sub-heading. */
  title?: string;
  intro?: string;
  items: readonly string[];
  layout?: 'checks' | 'columns' | 'plain';
}

/** Visually distinct callout. The "Auch nach der Ankunft…" block is this. */
export interface HighlightBlock extends BlockBase {
  kind: 'highlight';
  title: string;
  intro: string;
  items: readonly string[];
  closing?: string;
}

/** Prose with no list. "Übersetzungsservice" is this. */
export interface ProseBlock extends BlockBase {
  kind: 'prose';
  title?: string;
  body: string;
}

/** Scope / legal boundary. `tone` drives styling and is never invented per page. */
export interface NoticeBlock extends BlockBase {
  kind: 'notice';
  tone: 'legal' | 'info';
  title?: string;
  body: string;
}

export type ServiceBlock = ListBlock | HighlightBlock | ProseBlock | NoticeBlock;

/** Renderers switch exhaustively on this; `never` in the default branch means
 *  adding a kind later is a compile error until every renderer handles it. */
export type ServiceBlockKind = ServiceBlock['kind'];

/* ════════════════════════════════════════════════════════════════════════════
   PER-LOCALE SERVICE CONTENT
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Seo {
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface ServiceContent {
  id: ServiceId;
  /** Section label, e.g. "Büroservice" · "الخدمات المكتبية". Never a number. */
  eyebrow: string;
  /** <h1>. Plain domain name - the intro paragraph carries the benefit. */
  title: string;
  cardTitle: string;
  cardDescription: string;
  imageAlt: string;
  intro: string;
  /** Length may differ per locale: DE finance has 3 blocks, AR has 1. */
  blocks: readonly ServiceBlock[];
  /**
   * How the blocks are arranged. 'stack' (the default) runs them down the page.
   * 'grid' lays co-equal groups side by side, which SC11 requires for the
   * Einbuergerung page: three columns on desktop, two plus a full-width third
   * on tablet, stacked on mobile. Only meaningful when every block is a short
   * titled list - a highlight or prose block needs the full measure.
   */
  blockLayout?: 'stack' | 'grid';
  closing?: string;
  /** Hedging text. Mandatory in practice wherever legalSensitivity is 'high'. */
  legalNote?: string;
  seo: Seo;
  faq?: readonly FaqItem[];
  status: ContentStatus;
}

/** Record<> forces all six services to exist in BOTH locales. */
export type ServiceContentMap = Record<Locale, Record<ServiceId, ServiceContent>>;

/* ════════════════════════════════════════════════════════════════════════════
   WHY POINTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const WHY_IDS = [
  'personal',
  'one-hand',
  'multilingual',
  'network',
  'tailored',
] as const;

export type WhyId = (typeof WHY_IDS)[number];

export interface WhyPoint {
  id: WhyId;
  icon: IconName;
  title: string;
  /** Arabic bodies run roughly 2× the German. The design must absorb it. */
  body: string;
}

/* ════════════════════════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════════════════════ */

export type RouteId =
  | 'home'
  | 'services'
  | 'service'
  | 'contact'
  | 'imprint'
  | 'privacy'
  | 'notFound';

export type NavTarget =
  | { kind: 'route'; routeId: Exclude<RouteId, 'service' | 'notFound'> }
  | { kind: 'service'; serviceId: ServiceId }
  /** Always on the home page, e.g. '#ueber-uns'. */
  | { kind: 'anchor'; hash: string }
  | { kind: 'external'; href: string };

export interface NavItem {
  id: string;
  label: string;
  target: NavTarget;
}

export interface NavContent {
  primary: readonly NavItem[];
  footer: readonly NavItem[];
  /** Impressum · Datenschutz. The Impressum label stays the German word in
   *  both locales - case law has rejected "Kontakt", "Legal" and "Info". */
  legal: readonly NavItem[];
}

/* ════════════════════════════════════════════════════════════════════════════
   NAP - name, address, phone. Locale-invariant.
   One shape serves the footer, the info strip, the contact page, the
   LocalBusiness JSON-LD and the Impressum shell.
   ═══════════════════════════════════════════════════════════════════════════ */

export const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

/** Index 0 = Monday, matching `DAY_KEYS` and `formatWeekday`. */
export type DayKey = (typeof DAY_KEYS)[number];

export interface OpeningHour {
  day: DayKey;
  /** 'HH:MM' in 24-hour Latin digits, or null when closed. */
  open: string | null;
  close: string | null;
}

/** Every confirmed field is flagged. The release checklist blocks on a false. */
export interface NapVerification {
  address: boolean;
  phone: boolean;
  email: boolean;
  hours: boolean;
}

export interface NapData {
  /** Impressum-exact, including legal form. Carries a «…» sentinel until the
   *  client confirms it; the sentinel fails a production build. */
  legalName: string;
  /** Never translated, never transliterated - Latin in Arabic copy too. */
  tradeName: 'Zukunft Service';
  legalForm: string;
  managingDirector: string;

  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: 'DE';

  /** '+491773825632' - for tel: hrefs and JSON-LD. */
  phoneE164: `+${string}`;
  /** '+49 177 3825632' - for display. ALWAYS inside <bdi dir="ltr">. */
  phoneDisplay: string;
  /** '491773825632' - digits only, for wa.me. */
  phoneDigits: string;
  whatsappE164: `+${string}`;
  email: string;
  /** Link out only. An embedded Maps iframe transmits the visitor's IP to
   *  Google on load, which would require a consent banner. */
  mapsUrl: string;

  hours: readonly OpeningHour[];

  vatId: string | null;
  registerCourt: string | null;
  registerNumber: string | null;

  availableLanguages: readonly Locale[];
  verified: NapVerification;
}

/* ════════════════════════════════════════════════════════════════════════════
   SITE CONTENT - everything on the home page and in the chrome, per locale
   ═══════════════════════════════════════════════════════════════════════════ */

export interface Cta {
  label: string;
  /** "Unverbindlich und kostenlos anfragen" - microcopy under the CTA, never
   *  relegated to a footnote. */
  hint?: string;
}

export interface SectionHeading {
  eyebrow: string;
  title: string;
  lead?: string;
}

export interface TrustItem {
  id: string;
  icon: IconName;
  label: string;
}

export interface MetaContent {
  siteName: string;
  slogan: string;
  homeTitle: string;
  homeDescription: string;
  /** This locale's own name in its own script: 'Deutsch' / 'العربية'. */
  localeLabel: string;
  /** The OTHER locale's name in ITS own script. A user who reads only Arabic
   *  must be able to find their language. Never "Arabisch", never a flag. */
  switchLabel: string;
  /** Bilingual, e.g. "Zur arabischen Version wechseln – التبديل إلى النسخة العربية". */
  switchAriaLabel: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  lead: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  /** Includes "نتحدث العربية" in Arabic script even on the German page. */
  trust: readonly TrustItem[];
  imageAlt: string;
}

/** The two arms of the business: Büroservice / Reinigungsservice. */
export interface PillarContent {
  id: ServiceArm;
  icon: IconName;
  title: string;
  body: string;
  linkLabel: string;
}

export interface ProcessStep {
  id: string;
  index: string;
  title: string;
  body: string;
}

/** The 3-step strip. A process description makes no outcome promise, which
 *  makes it both the best anxiety-reducer and the legally safest section. */
export interface ProcessContent {
  heading: SectionHeading;
  steps: readonly ProcessStep[];
}

export interface ServicesGridContent {
  heading: SectionHeading;
  /** SC10: "Klare Abläufe · Persönliche Betreuung · Deutsch und Arabisch" */
  trustBadges: readonly string[];
  /**
   * "Mehr zur Leistung" / "تفاصيل الخدمة".
   *
   * NO arrow glyph in this string. The component appends one and flips it per
   * locale. An arrow baked in here is how the German label ended up rendering
   * two of them.
   */
  detailLabel: string;
  note?: string;
}

/**
 * One of the eight cleaning types.
 *
 * Defined once per locale and consumed by BOTH the home section and the
 * cleaning service page. Before this existed the two lists had already drifted:
 * the home page carried ten one-word nouns in German and six sentences in
 * Arabic, while the detail page carried ten of its own. One array, one truth.
 */
export interface CleaningType {
  id: string;
  title: string;
  description: string;
  /** Photo still to be supplied by the client - see SC13. */
  imageAlt: string;
}

export interface CleaningContent {
  heading: SectionHeading;
  /** The eight types. Home and detail page render the same array. */
  types: readonly CleaningType[];
  /** "Zuverlässiges Team · Klare Termine · ..." */
  trustBar: readonly string[];
  ctaTitle: string;
  ctaBody: string;
  cta: Cta;
  closing: string;
  imageAlt: string;
}

export interface WhySectionContent {
  heading: SectionHeading;
  points: readonly WhyPoint[];
}

/**
 * The transparency block: what we actually do (SC6), and who legally has to do
 * the rest (SC7).
 *
 * The old shape was a do/don't pair. The client replaced it: the "don't" list
 * is now stated positively as "for each matter, the right specialist", because
 * a wall of negatives reads as a disclaimer while the same facts framed as
 * routing read as competence. The legal content is identical either way.
 */
export interface ScopeContent {
  heading: SectionHeading;
  /** "Praktische und strukturierte Unterstützung" */
  supportTitle: string;
  /** The six things we do. */
  supportPoints: readonly string[];
  /** Cleaning gets its own strip and is never merged into the office list. */
  cleaningStrip: string;
  /** "Für jedes Anliegen die passende Fachstelle" */
  referralTitle: string;
  referralIntro: string;
  /** Five categories, each naming who may lawfully provide it. */
  referralCategories: readonly string[];
  /** Closing reassurance box. */
  trustTitle: string;
  trustBody: string;
  /** The site-wide disclaimer. Shared with the contact form. */
  notice: string;
}

export interface QuickContactStrings {
  whatsapp: string;
  call: string;
  email: string;
}

export interface ContactContent {
  heading: SectionHeading;
  quickContact: QuickContactStrings;
  /** SC8: asks the visitor NOT to attach documents to a first message. This is
   *  data minimisation - an unsolicited passport scan in an inbox is a problem
   *  the business then owns. */
  privacyNote: string;
  /** "Außerhalb der Öffnungszeiten: schreiben Sie uns - wir melden uns am
   *  nächsten Werktag." Turns a closed office into a captured lead. */
  responseNote: string;
}

export interface InfoStripContent {
  hoursTitle: string;
  addressTitle: string;
  contactTitle: string;
  mapsLabel: string;
  closedLabel: string;
  hoursNote: string;
}

export interface FooterContent {
  slogan: string;
  navTitle: string;
  legalTitle: string;
  /** Contains the literal token `{year}`, replaced at render time. */
  copyright: string;
}

/* ── Contact form strings ─────────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldStrings {
  label: string;
  /** Decoration only. A placeholder is NEVER the label. */
  placeholder?: string;
  hint?: string;
}

export interface SelectFieldStrings extends FieldStrings {
  options: readonly SelectOption[];
}

export interface FormValidationStrings {
  required: string;
  nameTooShort: string;
  emailInvalid: string;
  messageTooShort: string;
  messageTooLong: string;
  phoneInvalid: string;
  phoneRequiredForWhatsapp: string;
}

export interface ContactFormStrings {
  title: string;
  lead: string;
  /** Field 1, deliberately not "Name" - asking a user worried about their
   *  residency status to identify themselves first is the highest-friction
   *  possible opening. Includes a 7th "Sonstiges / not sure" option. */
  service: SelectFieldStrings;
  message: FieldStrings;
  name: FieldStrings;
  email: FieldStrings;
  phone: FieldStrings;
  whatsappOptIn: FieldStrings;
  /** Vormittags (10–13 Uhr) / Nachmittags (13–16 Uhr) / Egal. Never an
   *  evening slot the business cannot honour. */
  preferredTime: SelectFieldStrings;
  /** Visually hidden honeypot. Its label still exists for screen readers. */
  honeypot: FieldStrings;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  errorSummaryTitle: string;
  requiredLabel: string;
  optionalLabel: string;
  /** Always-visible notice beside submit. Art. 6(1)(b)/(f), not consent. */
  privacyNotice: string;
  privacyLinkLabel: string;
  hedgeNotice: string;
  validation: FormValidationStrings;
}

export interface A11yStrings {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  menuLabel: string;
  languageGroupLabel: string;
  breadcrumbLabel: string;
  whatsappFab: string;
  currentPage: string;
  loading: string;
  externalLinkHint: string;
}

/**
 * Everything the chrome and the home page need, in one locale.
 * Every key is required: this is the spine, and `satisfies SiteContent` on the
 * Arabic module turns a missing translation into a compile error.
 */
export interface SiteContent {
  meta: MetaContent;
  nav: NavContent;
  hero: HeroContent;
  pillars: readonly PillarContent[];
  process: ProcessContent;
  services: ServicesGridContent;
  why: WhySectionContent;
  cleaning: CleaningContent;
  scope: ScopeContent;
  contact: ContactContent;
  info: InfoStripContent;
  footer: FooterContent;
  form: ContactFormStrings;
  a11y: A11yStrings;
}

export type SiteContentMap = Record<Locale, SiteContent>;
