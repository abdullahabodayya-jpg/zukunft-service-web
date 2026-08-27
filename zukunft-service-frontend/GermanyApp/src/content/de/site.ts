/**
 * GERMAN SITE CONTENT - chrome + home page + form + a11y strings.
 *
 * Source: docs/research/00-source-brief.md §2/§3 (the client's PDFs) and
 * docs/research/01-content-and-ia.md §2/§6. Everything here is either the
 * client's own wording or a process description built from it.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * FORBIDDEN COPY - do not "improve" these strings. The hedging is load-bearing.
 * Never write: „wir beraten", „rechtliche Beratung", „Steuerberatung",
 * „Schuldnerberatung", „garantiert", „100 %", „wir besorgen Ihnen ein Visum",
 * „wir erledigen Ihre Einbürgerung", „beglaubigte Übersetzung" as our own
 * service, „amtlich anerkannt", „offizieller Partner", invented social proof.
 * Always: unterstützen bei · begleiten · vorbereiten · zusammenstellen ·
 * organisieren · strukturieren · vermitteln an. Behörden entscheiden, wir
 * bereiten vor.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { CleaningType, SiteContent } from '@/types/content';

/**
 * The standing scope boundary. Appears on the home page, on the three
 * high-sensitivity service pages and under the contact form. One wording, used
 * everywhere, so it can never drift into a claim in one place and a hedge in
 * another.
 */
/**
 * SC13: the eight cleaning types, defined ONCE.
 *
 * Both the home section and the cleaning service page render this array. They
 * previously carried separate lists that had already drifted: ten one-word
 * nouns here, six sentences in Arabic, ten more on the detail page.
 *
 * Each entry carries `imageAlt` because SC13 requires a photo per card. The
 * photos are not in the repo - the client supplies them - so the alt text is
 * written first and the image slot fills in once the files land.
 */
export const CLEANING_TYPES: readonly CleaningType[] = [
  {
    id: 'homes',
    title: 'Häuser und Wohnungen',
    description: 'Gründliche einmalige oder regelmäßige Reinigung verschiedener Wohnbereiche.',
    imageAlt: 'Helle, moderne Wohnung nach der Reinigung, ohne Personen.',
  },
  {
    id: 'offices',
    title: 'Büros und Praxen',
    description: 'Strukturierte Reinigung von Arbeits- und Empfangsbereichen nach Vereinbarung.',
    imageAlt: 'Aufgeräumter Empfangsbereich einer Praxis, ohne Personen.',
  },
  {
    id: 'schools',
    title: 'Schulen',
    description: 'Strukturierte Reinigung von Unterrichts- und Gemeinschaftsbereichen.',
    imageAlt: 'Sauberer Klassenraum oder Schulflur, ohne Personen.',
  },
  {
    id: 'restaurants',
    title: 'Restaurants',
    description: 'Sorgfältige Reinigung von Arbeits- und Gästebereichen nach Vereinbarung.',
    imageAlt: 'Sauberes, eingedecktes Restaurant, ohne Gäste.',
  },
  {
    id: 'retail',
    title: 'Geschäfte und Gewerbeobjekte',
    description:
      'Reinigung von Verkaufs- und Arbeitsbereichen, abgestimmt auf Nutzung und Betriebszeiten.',
    imageAlt: 'Saubere Verkaufsfläche eines Geschäfts, ohne Personen.',
  },
  {
    id: 'move-out',
    title: 'Umzugs- und Renovierungsreinigung',
    description:
      'Gründliche Reinigung nach Umzug oder Renovierungsarbeiten, damit die Räume wieder '
      + 'bezugs- oder nutzungsbereit sind.',
    imageAlt: 'Leerer, frisch gereinigter Raum nach Renovierung, ohne Handwerker.',
  },
  {
    id: 'common-areas',
    title: 'Eingänge, Treppenhäuser und Gemeinschaftsflächen',
    description: 'Regelmäßige Pflege stark genutzter Bereiche für einen gepflegten Eindruck.',
    imageAlt: 'Sauberes Treppenhaus oder Hauseingang, ohne Personen.',
  },
  {
    id: 'windows',
    title: 'Fenster- und Glasreinigung',
    description:
      'Sorgfältige Reinigung von Fenstern und Glasflächen für einen klaren, gepflegten Eindruck.',
    imageAlt: 'Klar geputzte Fensterfront, ohne Personen.',
  },
];

const HEDGE_NOTICE =
  'Wir bieten administrative, organisatorische und sprachliche Unterstützung und verweisen '
  + 'bei Bedarf an zugelassene Fachstellen. Wir bieten keine Rechts-, Steuer-, Versicherungs- '
  + 'oder Anlageberatung, vermitteln keine Kredite oder Finanzierungen und garantieren keine '
  + 'behördlichen Entscheidungen.';

export const deSite: SiteContent = {
  meta: {
    siteName: 'Zukunft Service',
    slogan: 'Viele Anliegen. Ein Ansprechpartner.',
    homeTitle: 'Zukunft Service | Dienstleistungen & Reinigung in Dortmund',
    homeDescription:
      'Büroservice, Dokumentenhilfe und professioneller Reinigungsservice in Dortmund – '
      + 'persönlich, mehrsprachig und Schritt für Schritt.',
    localeLabel: 'Deutsch',
    // The other locale's name in its own script. A user who reads only Arabic
    // must be able to find their language without reading German.
    switchLabel: 'العربية',
    switchAriaLabel: 'Zur arabischen Version wechseln – التبديل إلى النسخة العربية',
  },

  nav: {
    primary: [
      // Every target below points at a section id that actually exists. The
      // previous '#ueber-uns' anchor had no matching section and scrolled
      // nowhere. Structure is kept identical to the Arabic nav so the language
      // switch does not change the menu under the reader.
      { id: 'services', label: 'Leistungen', target: { kind: 'route', routeId: 'services' } },
      { id: 'why', label: 'Warum wir', target: { kind: 'anchor', hash: '#warum-wir' } },
      { id: 'cleaning', label: 'Reinigung', target: { kind: 'anchor', hash: '#reinigungsservice' } },
      { id: 'contact', label: 'Kontakt', target: { kind: 'route', routeId: 'contact' } },
    ],
    footer: [
      {
        id: 'authorities',
        label: 'Einbürgerung & Behörden',
        target: { kind: 'service', serviceId: 'authorities' },
      },
      {
        id: 'marriage-translation',
        label: 'Ehe & Übersetzungen',
        target: { kind: 'service', serviceId: 'marriage-translation' },
      },
      {
        id: 'study-visa',
        label: 'Studium & Visa',
        target: { kind: 'service', serviceId: 'study-visa' },
      },
      {
        id: 'finance',
        label: 'Finanzen & Vorsorge',
        target: { kind: 'service', serviceId: 'finance' },
      },
      {
        id: 'real-estate',
        label: 'Immobilien & Investitionen',
        target: { kind: 'service', serviceId: 'real-estate' },
      },
      {
        id: 'cleaning',
        label: 'Reinigungsservice',
        target: { kind: 'service', serviceId: 'cleaning' },
      },
    ],
    // The Impressum label stays the German word in both locales - case law has
    // rejected "Kontakt", "Legal" and "Info" as substitutes.
    legal: [
      { id: 'imprint', label: 'Impressum', target: { kind: 'route', routeId: 'imprint' } },
      { id: 'privacy', label: 'Datenschutz', target: { kind: 'route', routeId: 'privacy' } },
    ],
  },

  hero: {
    eyebrow: 'Dienstleistungen & Reinigung in Dortmund',
    headline: 'Unterschiedliche Anliegen. Ein Service, auf den Sie sich verlassen können.',
    lead:
      'Wir unterstützen Sie kompetent und strukturiert bei Behördenangelegenheiten, '
      + 'Übersetzungen, Studium und Visa sowie bei Finanz- und Immobilienthemen. Zusätzlich '
      + 'bieten wir einen eigenständigen Reinigungsservice für private und gewerbliche '
      + 'Objekte – sorgfältig und zuverlässig ausgeführt. Was auch immer Ihr Anliegen ist: '
      + 'Unser Team hört Ihnen zu und begleitet Sie Schritt für Schritt.',
    primaryCta: {
      label: 'Anliegen schildern',
      hint: 'Unverbindlich und kostenlos anfragen',
    },
    secondaryCta: { label: 'Leistungen ansehen' },
    trust: [
      { id: 'personal', icon: 'HandHeart', label: 'Persönliche Begleitung' },
      // In Arabic script on the GERMAN page, deliberately: a large share of this
      // audience lands on /de/ from Google and must see it in one second.
      { id: 'languages', icon: 'MessagesSquare', label: 'Wir sprechen Arabisch · نتحدث العربية' },
      { id: 'steps', icon: 'Route', label: 'Klare nächste Schritte' },
    ],
    // Rewritten with the photograph: the whole set is deliberately free of
    // people, so the old "zwei Personen" wording described a picture that does
    // not exist. Alt text has to match the image that actually ships.
    imageAlt:
      'Unterlagen, ein Notizbuch und ein Schlüsselbund, geordnet auf einem hellen '
      + 'Holztisch am Fenster.',
  },

  pillars: [
    {
      id: 'office',
      icon: 'FileText',
      title: 'Büroservice',
      body:
        'Behörden, Dokumente, Studium und Visa, Finanzen und Immobilien: Wir bereiten Ihre '
        + 'Unterlagen vor, ordnen die notwendigen Schritte und vermitteln bei Bedarf an '
        + 'geeignete Fachstellen.',
      linkLabel: 'Büroservice ansehen',
    },
    {
      id: 'cleaning',
      icon: 'CleaningCart',
      title: 'Reinigungsservice',
      body:
        'Professionelle Reinigung für Privatkunden, Unternehmen und Einrichtungen – '
        + 'einmalig oder regelmäßig, passend zu Ihrem Bedarf.',
      linkLabel: 'Reinigungsservice ansehen',
    },
  ],

  process: {
    heading: {
      eyebrow: 'So arbeiten wir',
      title: 'In drei Schritten zur Klarheit',
      lead:
        'Sie müssen nicht wissen, welches Formular Sie brauchen. Sie müssen uns nur erzählen, '
        + 'worum es geht.',
    },
    steps: [
      {
        id: 'schildern',
        index: '01',
        title: 'Anliegen schildern',
        body:
          'Sie beschreiben uns kurz Ihre Situation – auf Deutsch oder Arabisch, über das '
          + 'Formular, per WhatsApp oder am Telefon.',
      },
      {
        id: 'sortieren',
        index: '02',
        title: 'Gemeinsam sortieren',
        body:
          'Wir gehen durch, welche Unterlagen nötig sind, was bereits vorliegt und was noch '
          + 'fehlt.',
      },
      {
        id: 'schritte',
        index: '03',
        title: 'Nächste Schritte',
        body:
          'Sie erhalten eine klare Reihenfolge. Wo Fachwissen erforderlich ist, vermitteln wir '
          + 'an eine geeignete Fachstelle.',
      },
    ],
  },

  services: {
    heading: {
      eyebrow: 'Büroservice',
      title: 'Sie schildern Ihr Anliegen. Wir strukturieren die nächsten Schritte.',
      lead:
        'Wir bieten Ihnen strukturierte administrative Unterstützung bei '
        + 'Behördenangelegenheiten, Übersetzungen, Studium und Visa sowie bei Finanz- und '
        + 'Immobilienthemen. Wir verstehen Ihren Bedarf, erläutern die Anforderungen und '
        + 'koordinieren die vereinbarten Schritte sorgfältig und transparent – auf Deutsch '
        + 'oder Arabisch.',
    },
    trustBadges: ['Klare Abläufe', 'Persönliche Betreuung', 'Deutsch und Arabisch'],
    detailLabel: 'Mehr zur Leistung',
    note:
      'Sie sind unsicher, welche Leistung zu Ihrem Anliegen passt? Teilen Sie uns mit, was '
      + 'Sie benötigen – wir leiten Sie an den passenden Bereich weiter.',
  },

  why: {
    heading: {
      eyebrow: 'Warum Zukunft Service?',
      title: 'Guter Service beginnt damit, Ihr Anliegen zu verstehen.',
      lead:
        'Wir hören Ihnen zuerst zu, erklären die einzelnen Schritte verständlich auf Deutsch '
        + 'oder Arabisch und führen jede Leistung strukturiert, transparent und sorgfältig aus '
        + '– vom ersten Kontakt bis zum Abschluss.',
    },
    points: [
      {
        id: 'personal',
        icon: 'HandHeart',
        title: 'Persönliche Betreuung und klare Kommunikation',
        body:
          'Sie haben eine feste Ansprechperson, die Ihr Anliegen kennt und sich zuverlässig '
          + 'darum kümmert – ohne dass Sie bei jedem Kontakt alles erneut erklären müssen.',
      },
      {
        id: 'one-hand',
        icon: 'Layers',
        title: 'Unterschiedliche Leistungen. Derselbe hohe Anspruch.',
        body:
          'Wir bieten Ihnen professionelle Unterstützung bei Behördenangelegenheiten, '
          + 'Übersetzungen, Studium und Visa sowie bei Finanz- und Immobilienthemen. Daneben '
          + 'bieten wir einen professionellen Reinigungsservice für private und gewerbliche '
          + 'Objekte. Jede Leistung ist anders – unser Anspruch an Organisation, '
          + 'Zuverlässigkeit und Sorgfalt bleibt derselbe.',
      },
      {
        id: 'multilingual',
        icon: 'MessagesSquare',
        title: 'Klarheit über Sprachgrenzen hinweg',
        body:
          'Wir kommunizieren mit Ihnen auf Deutsch oder Arabisch und erklären Schreiben und '
          + 'Abläufe verständlich. So wissen Sie, was benötigt wird, warum es erforderlich ist '
          + 'und wie es weitergeht.',
      },
      {
        id: 'network',
        icon: 'Network',
        title: 'Die passende Expertise zur richtigen Zeit',
        body:
          'Wenn Ihr Anliegen zusätzliche Expertise erfordert, unterstützen wir Sie bei der '
          + 'Suche nach einer passenden Fachstelle, etwa einem Übersetzungsbüro, einer Kanzlei '
          + 'oder einer Beratungsstelle – damit Sie ohne lange Suche oder unnötige Umwege '
          + 'weiterkommen.',
      },
      {
        id: 'tailored',
        icon: 'Route',
        title: 'Wir beginnen mit Ihrer Situation – nicht mit einem Standardpaket.',
        body:
          'Jedes Anliegen ist anders. Deshalb verstehen wir zuerst Ihren Bedarf und legen '
          + 'anschließend gemeinsam mit Ihnen den passenden Leistungsumfang und die '
          + 'erforderlichen Schritte fest – ohne unnötige Zusatzleistungen.',
      },
    ],
  },

  cleaning: {
    heading: {
      eyebrow: 'Reinigungsservice',
      title: 'Sauberkeit, die man sieht. Service, auf den Sie sich verlassen können.',
      lead:
        'Ob regelmäßige Reinigung oder einmaliger Einsatz: Wir stimmen die Leistung auf Art, '
        + 'Größe und Nutzung des Objekts ab – für Privathaushalte, Büros und gewerbliche '
        + 'Räume, mit klaren Terminen und Sorgfalt bis ins Detail.',
    },
    types: CLEANING_TYPES,
    trustBar: [
      'Zuverlässiges Team',
      'Klare Termine',
      'Abgestimmter Leistungsumfang',
      'Angebot nach Besichtigung',
    ],
    ctaTitle: 'Ein sauberer Ort beginnt mit einem einfachen Schritt.',
    ctaBody:
      'Teilen Sie uns Art, Größe und gewünschten Reinigungsumfang mit. Wir vereinbaren eine '
      + 'Besichtigung und erstellen anschließend ein klares, passendes Angebot.',
    cta: { label: 'Reinigungsangebot anfordern' },
    closing:
      'Jedes Objekt hat eigene Anforderungen. Nach der Besichtigung stimmen wir einen klaren '
      + 'Leistungsumfang und passende Termine mit Ihnen ab – für eine einmalige oder '
      + 'regelmäßige Reinigung.',
    imageAlt: 'Helles, frisch gereinigtes Büro mit aufgeräumten Arbeitsplätzen.',
  },

  scope: {
    heading: {
      eyebrow: 'Transparenz schafft Vertrauen',
      title: 'Von Anfang an wissen Sie, was Sie erwarten können.',
      lead:
        'Wir erläutern Ihnen Leistungsumfang und Ablauf verständlich. Erfordert Ihr Anliegen '
        + 'eine zugelassene Fachstelle, informieren wir Sie frühzeitig und zeigen Ihnen, an '
        + 'wen Sie sich wenden können – damit Sie gut informiert entscheiden und in jeder '
        + 'Phase den Überblick behalten.',
    },
    supportTitle: 'Praktische und strukturierte Unterstützung',
    supportPoints: [
      'Organisatorische Unterstützung beim Ausfüllen von Anträgen und Formularen anhand Ihrer Angaben.',
      'Deutschsprachige Schreiben verständlich wiedergeben und die darin genannten Schritte erläutern.',
      'Termine vereinbaren und die organisatorische Kommunikation mit Behörden und Fachstellen mit Ihrer Zustimmung koordinieren.',
      'Unterlagen ordnen und anhand veröffentlichter behördlicher Anforderungen auf formale Vollständigkeit prüfen.',
      'Beglaubigte Übersetzungen bei beeidigten oder ermächtigten Übersetzern organisieren.',
      'Begleitung zu Terminen nach Vereinbarung und soweit die jeweilige Stelle dies zulässt – als sprachliche und organisatorische Unterstützung.',
    ],
    cleaningStrip:
      'Den Leistungsumfang nach der Besichtigung festlegen und die Reinigung gemäß Angebot '
      + 'und vereinbarten Terminen ausführen.',
    referralTitle: 'Für jedes Anliegen die passende Fachstelle',
    referralIntro:
      'Bestimmte Leistungen dürfen gesetzlich nur von entsprechend zugelassenen Fachstellen '
      + 'erbracht werden. Wir weisen Sie frühzeitig darauf hin und helfen Ihnen, den '
      + 'passenden Kontakt zu finden.',
    referralCategories: [
      'Rechtsberatung und Vertretung vor Gericht erfolgen durch Rechtsanwälte oder gesetzlich befugte Stellen.',
      'Steuerberatung erfolgt durch Steuerberater oder entsprechend befugte Stellen.',
      'Versicherungs- und Anlageberatung oder -vermittlung erfolgt durch zugelassene Fachpersonen.',
      'Kredite und Finanzierungen erfolgen über Banken oder zugelassene Vermittler; unsere Unterstützung ist rein organisatorisch.',
      'Behördliche Entscheidungen treffen ausschließlich die zuständigen Stellen. Wir unterstützen bei Vorbereitung und Organisation und versprechen kein bestimmtes Ergebnis.',
    ],
    trustTitle: 'Der nächste Schritt bleibt klar',
    trustBody:
      'Wenn Ihr Anliegen eine zugelassene Fachstelle erfordert, informieren wir Sie frühzeitig '
      + 'und helfen bei der Suche nach einem passenden Kontakt. Auswahl und Beauftragung '
      + 'liegen bei Ihnen; die fachliche Beratung erfolgt ausschließlich durch die jeweilige '
      + 'Fachstelle.',
    notice: HEDGE_NOTICE,
  },

  contact: {
    heading: {
      eyebrow: 'Kontaktieren Sie uns',
      title: 'Teilen Sie uns Ihr Anliegen mit – wir erklären Ihnen den nächsten Schritt.',
      lead:
        'Beschreiben Sie uns Ihr Anliegen in wenigen Sätzen und wählen Sie den Kontaktweg, '
        + 'der für Sie am besten passt. Wir melden uns bei Ihnen und erklären verständlich, '
        + 'was für den nächsten Schritt benötigt wird.',
    },
    quickContact: {
      whatsapp: 'Per WhatsApp schreiben',
      call: 'Jetzt anrufen',
      email: 'E-Mail senden',
    },
    privacyNote:
      'Zum Schutz Ihrer Daten senden Sie bitte in der ersten Nachricht keine persönlichen '
      + 'Dokumente. Wir teilen Ihnen mit, falls diese später benötigt werden.',
    responseNote:
      'Sie können uns jederzeit schreiben. Wir antworten Ihnen so bald wie möglich während '
      + 'unserer Öffnungszeiten.',
  },

  info: {
    hoursTitle: 'Öffnungszeiten',
    addressTitle: 'Adresse',
    contactTitle: 'Kontakt',
    mapsLabel: 'Route öffnen',
    closedLabel: 'Geschlossen',
    hoursNote: 'Weitere Termine nach Vereinbarung',
  },

  footer: {
    slogan: 'Viele Lösungen. Ein Ansprechpartner.',
    navTitle: 'Leistungen',
    legalTitle: 'Rechtliches',
    copyright: '© {year} Zukunft Service. Alle Rechte vorbehalten.',
  },

  form: {
    title: 'Ihr Anliegen',
    lead:
      'Felder mit Sternchen sind Pflichtfelder. Wir antworten in der Sprache, in der Sie uns '
      + 'schreiben.',
    service: {
      label: 'Worum geht es?',
      hint: 'Sie sind sich nicht sicher? Wählen Sie „Sonstiges" – das ist völlig in Ordnung.',
      options: [
        { value: 'authorities', label: 'Einbürgerung, Behörden & Dokumente' },
        { value: 'marriage-translation', label: 'Ehe, Übersetzungen & Dokumente' },
        { value: 'study-visa', label: 'Studium, Universität & Visa' },
        { value: 'finance', label: 'Finanzen, Kredite & Vorsorge' },
        { value: 'real-estate', label: 'Immobilien & Investitionen' },
        { value: 'cleaning', label: 'Reinigungsservice' },
        { value: 'other', label: 'Sonstiges / Ich bin mir nicht sicher' },
      ],
    },
    message: {
      label: 'Beschreiben Sie kurz Ihre Situation',
      hint:
        'Bitte senden Sie hier keine Ausweis-, Akten- oder Vorgangsnummern. Solche Angaben '
        + 'besprechen wir persönlich.',
    },
    name: { label: 'Name' },
    email: {
      label: 'E-Mail-Adresse',
      hint: 'Hierüber antworten wir Ihnen.',
    },
    phone: {
      label: 'Telefonnummer',
      hint: 'Mit Ländervorwahl, zum Beispiel 0049 für Deutschland oder 00963 für Syrien.',
    },
    whatsappOptIn: {
      label: 'Sie dürfen mir per WhatsApp antworten',
      hint: 'Dafür benötigen wir Ihre Telefonnummer.',
    },
    preferredTime: {
      label: 'Bevorzugte Kontaktzeit',
      options: [
        { value: 'morning', label: 'Vormittags (10–13 Uhr)' },
        { value: 'afternoon', label: 'Nachmittags (13–16 Uhr)' },
        { value: 'any', label: 'Egal' },
      ],
    },
    honeypot: { label: 'Dieses Feld bitte frei lassen' },
    submit: 'Anfrage senden',
    submitting: 'Wird gesendet …',
    successTitle: 'Vielen Dank.',
    successBody:
      'Ihre Anfrage ist bei uns eingegangen. Wir melden uns in der Regel innerhalb eines '
      + 'Werktages.',
    errorTitle: 'Die Nachricht konnte nicht gesendet werden.',
    errorBody: 'Bitte versuchen Sie es erneut oder schreiben Sie uns per WhatsApp.',
    errorSummaryTitle: 'Bitte prüfen Sie diese Angaben:',
    requiredLabel: 'Pflichtfeld',
    optionalLabel: 'Optional',
    privacyNotice:
      'Ihre Angaben verwenden wir ausschließlich, um Ihre Anfrage zu bearbeiten. Weitere '
      + 'Hinweise finden Sie in der',
    privacyLinkLabel: 'Datenschutzerklärung',
    hedgeNotice: HEDGE_NOTICE,
    validation: {
      required: 'Dieses Feld wird benötigt.',
      nameTooShort: 'Bitte geben Sie mindestens zwei Zeichen ein.',
      emailInvalid: 'Bitte prüfen Sie die E-Mail-Adresse.',
      messageTooShort: 'Bitte beschreiben Sie Ihr Anliegen in mindestens zehn Zeichen.',
      messageTooLong: 'Bitte fassen Sie sich etwas kürzer – höchstens 2.000 Zeichen.',
      phoneInvalid: 'Bitte prüfen Sie die Telefonnummer.',
      phoneRequiredForWhatsapp:
        'Für eine Antwort per WhatsApp benötigen wir Ihre Telefonnummer.',
    },
  },

  a11y: {
    skipToContent: 'Zum Inhalt springen',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    menuLabel: 'Hauptnavigation',
    languageGroupLabel: 'Sprache',
    breadcrumbLabel: 'Sie sind hier',
    whatsappFab: 'Per WhatsApp schreiben',
    currentPage: 'Aktuelle Seite',
    loading: 'Wird geladen …',
    externalLinkHint: 'Öffnet in einem neuen Tab',
  },
};
