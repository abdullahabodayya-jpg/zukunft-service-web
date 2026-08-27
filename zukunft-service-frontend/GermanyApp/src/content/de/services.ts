/**
 * GERMAN SERVICE CONTENT - the six verticals, in full.
 *
 * Source: the client's own German PDF, via docs/research/00-source-brief.md §3.
 * The wording here is the client's, lightly normalised for the web. It is NOT
 * authored marketing copy, which matters: four of these six services describe
 * regulated activity, and the client's own phrasing is what they have chosen to
 * stand behind.
 *
 * BLOCK SHAPES: every service is `ServiceBlock[]`. A service with a flat list is
 * one untitled list block; a service with sub-sections is several titled ones.
 * That is deliberate - the same service is flat in Arabic and sub-blocked in
 * German, so modelling "flat service" and "sub-block service" as separate types
 * would make one service two types in two languages.
 *
 * HEDGING IS LOAD-BEARING in `finance` and `real-estate`. Insurance brokerage
 * needs § 34d GewO licensing, property and loan brokerage § 34c / § 34i, and
 * debt counselling is regulated under the RDG. Every verb in those two services
 * is organisational: vorbereiten, zusammenstellen, organisieren, vermitteln an.
 * Never "wir beraten", never "wir vermitteln Kredite".
 */

import type { ServiceContent, ServiceId } from '@/types/content';
import { CLEANING_TYPES } from './site';

export const deServices: Record<ServiceId, ServiceContent> = {
  authorities: {
    id: 'authorities',
    eyebrow: 'Büroservice',
    title: 'Geordnete Unterlagen. Klare nächste Schritte.',
    cardTitle: 'Einbürgerung und offizielle Dokumente',
    cardDescription:
      'Wir bieten Ihnen professionelle administrative Unterstützung bei Einbürgerungs- und '
      + 'Aufenthaltsangelegenheiten sowie offiziellen Dokumenten – von der Vorbereitung der '
      + 'Anträge und Prüfung der Unterlagen bis zur Terminvereinbarung und weiteren '
      + 'Bearbeitung.',
    imageAlt: 'Sortierte Antragsunterlagen und Formulare auf einem Schreibtisch.',
    intro:
      'Von Einbürgerungsanträgen bis zu Personenstands- und Reisedokumenten unterstützen wir '
      + 'Sie bei der Organisation der Anforderungen, der Vorbereitung Ihrer Unterlagen und '
      + 'der administrativen Kommunikation mit zuständigen Stellen. Unsere Unterstützung '
      + 'umfasst Dokumente aus verschiedenen Ländern, darunter auch syrische und irakische '
      + 'Unterlagen.',
    // SC11: one flat list of ten became three groups. Syrian and Iraqi papers
    // now sit inside a group about foreign documents generally, rather than as
    // two singled-out bullets - the service covers documents from many
    // countries, and the grouping says so without making anyone a special case.
    blocks: [
      {
        kind: 'list',
        id: 'applications',
        title: 'Anträge und Einbürgerung',
        layout: 'checks',
        items: [
          'Unterstützung bei der Vorbereitung des Einbürgerungsantrags und der Strukturierung der einzelnen Schritte.',
          'Erforderliche Unterlagen zusammenstellen und auf formale Vollständigkeit prüfen.',
          'Formulare und Anträge anhand Ihrer Angaben ausfüllen.',
          'Schriftverkehr und administrative Kommunikation mit Behörden organisieren.',
        ],
      },
      {
        kind: 'list',
        id: 'civil-status',
        title: 'Personenstandsdokumente',
        layout: 'checks',
        items: [
          'Anträge auf Geburtsurkunden, Heiratsurkunden und Personenstandsdokumente organisieren.',
          'Geburtsnachweise und Registerauszüge koordinieren.',
          'Unterlagen für Beglaubigungen und weitere behördliche Verfahren vorbereiten.',
        ],
      },
      {
        kind: 'list',
        id: 'foreign-documents',
        title: 'Ausländische Dokumente und Reisedokumente',
        layout: 'checks',
        items: [
          'Anforderungen und Abläufe für im Ausland ausgestellte Dokumente organisieren, einschließlich syrischer und irakischer Unterlagen.',
          'Organisatorische Unterstützung bei syrischen und irakischen Passangelegenheiten.',
          'Anforderungen und Schritte nach Dokumentenart und zuständiger Stelle ordnen.',
        ],
      },
    ],
    // SC11: the three groups sit side by side, not down the page.
    blockLayout: 'grid',
    closing:
      'Sie sind unsicher, welche Unterlagen benötigt werden? Teilen Sie uns die Art Ihres '
      + 'Anliegens und das Ausstellungsland Ihrer Dokumente mit. Wir unterstützen Sie dabei, '
      + 'den Einstieg und die nächsten Schritte zu strukturieren.',
    legalNote:
      'Die Ausstellung der Dokumente und abschließende Entscheidungen liegen bei den '
      + 'zuständigen Behörden.',
    seo: {
      title: 'Einbürgerung und offizielle Dokumente in Dortmund',
      description:
        'Unterstützung bei Einbürgerungsanträgen, Personenstandsdokumenten und im Ausland '
        + 'ausgestellten Unterlagen, darunter syrische und irakische Dokumente. Zukunft '
        + 'Service in Dortmund, auf Deutsch und Arabisch.',
    },
    status: 'final',
  },

  'marriage-translation': {
    id: 'marriage-translation',
    eyebrow: 'Büroservice',
    title: 'Ehe, Übersetzungen & internationale Dokumente',
    cardTitle: 'Eheschließung, Übersetzungen und internationale Dokumente',
    cardDescription:
      'Administrative Unterstützung bei Heiratsunterlagen, Familiennachzug und im Ausland '
      + 'ausgestellten Dokumenten sowie Organisation beglaubigter Übersetzungen durch '
      + 'beeidigte oder ermächtigte Übersetzer.',
    imageAlt: 'Ausländische Urkunden mit beigefügter Übersetzung.',
    intro:
      'Wir unterstützen Sie bei ausländischen Dokumenten und organisatorischen Fragen rund um Übersetzung, Beglaubigung und Eheschließung.',
    blocks: [
      {
        kind: 'list',
        id: 'marriage-main',
        layout: 'checks',
        items: [
          'Übersetzung von Dokumenten über geeignete Übersetzer',
          'Vorbereitung von Unterlagen für Beglaubigungen',
          'Vorbereitung ausländischer Urkunden für deutsche Behörden',
          'Heiratsurkunden und weitere Dokumente zur Eheschließung',
          'Unterstützung bei der Registrierung und Anerkennung von Eheschließungen in Deutschland',
          'Beschaffung fehlender Personenstands- und Familienstandsdokumente',
        ],
      },
      {
        kind: 'prose',
        id: 'translation-service',
        title: 'Übersetzungsservice',
        body:
          'Über unser Netzwerk vermitteln wir Übersetzer für unterschiedliche Anliegen, zum Beispiel für Behörden, Dokumente, Termine, Anträge sowie persönliche oder geschäftliche Unterlagen.',
      },
    ],
    seo: {
      title: 'Ehe, Übersetzungen & internationale Dokumente in Dortmund',
      description:
        'Organisatorische Unterstützung bei Eheschließung, Anerkennung ausländischer Urkunden und Übersetzungen über vereidigte Übersetzer. Zukunft Service Dortmund.',
    },
    status: 'final',
  },

  'study-visa': {
    id: 'study-visa',
    eyebrow: 'Büroservice',
    title: 'Studium, Universität & Visa',
    cardTitle: 'Studium und Visa',
    cardDescription:
      'Administrative Unterstützung bei Hochschulzulassungen sowie Studien- und Touristenvisa. '
      + 'Nach der Ankunft unterstützen wir Studierende organisatorisch bei Wohnungssuche, '
      + 'Anmeldung und Immatrikulation.',
    imageAlt: 'Studentin mit Bewerbungsunterlagen vor einem Universitätsgebäude.',
    intro:
      'Sie möchten in Deutschland oder Europa studieren oder benötigen Unterstützung bei der Vorbereitung eines Visumantrags? Wir helfen Ihnen bei den organisatorischen Schritten.',
    blocks: [
      {
        kind: 'list',
        id: 'study',
        title: 'Studium & Universität',
        layout: 'checks',
        items: [
          'Suche nach passenden Studienmöglichkeiten',
          'Unterstützung bei Hochschulbewerbungen',
          'Vorbereitung und Zusammenstellung der Bewerbungsunterlagen',
          'Unterstützung bei Zulassungsverfahren',
          'Organisation erforderlicher Dokumente',
          'Vorbereitung von Unterlagen für ein Studienvisum',
        ],
      },
      {
        kind: 'list',
        id: 'visa',
        title: 'Visa',
        layout: 'columns',
        items: [
          'Studienvisa',
          'Schengen-Visa',
          'Touristenvisa',
          'Besuchsvisa',
          'Vorbereitung und strukturierte Zusammenstellung der erforderlichen Unterlagen',
        ],
      },
      {
        // The strongest differentiator in the whole PDF: support does not stop
        // at the visa. Given its own highlight block rather than a bullet.
        kind: 'highlight',
        id: 'after-arrival',
        title: 'Auch nach der Ankunft sind wir für Sie da',
        intro:
          'Unsere Unterstützung endet nicht mit dem Visum oder der Einreise nach Deutschland. Gerade in der ersten Zeit begleiten wir Studierende bei den wichtigsten organisatorischen Schritten und helfen dabei, den Start in Deutschland so einfach wie möglich zu gestalten.',
        items: [
          'Suche nach einer geeigneten Unterkunft',
          'Unterstützung bei der Anmeldung beim Einwohnermeldeamt',
          'Orientierung und Begleitung bei wichtigen Behördengängen',
          'Vorbereitung notwendiger Unterlagen',
          'Organisatorische Unterstützung rund um Universität und Studienbeginn',
          'Orientierung bei den ersten Schritten im Alltag in Deutschland',
        ],
        closing:
          'Vom ersten Antrag bis zu den ersten Schritten in Deutschland begleiten wir Sie auf Ihrem Weg.',
      },
    ],
    seo: {
      title: 'Studium, Universität & Visa in Dortmund',
      description:
        'Unterstützung bei Hochschulbewerbung, Zulassung, Studienvisum und Schengen-Visum, und auch nach der Ankunft in Deutschland. Zukunft Service Dortmund.',
    },
    status: 'final',
  },

  finance: {
    id: 'finance',
    eyebrow: 'Büroservice',
    title: 'Finanzen, Kredite & Vorsorge',
    cardTitle: 'Finanz- und Versicherungsthemen',
    cardDescription:
      'Administrative Unterstützung bei Unterlagen und veröffentlichten Anforderungen zu '
      + 'Versicherungs-, Finanzierungs-, Kredit- und Privatinsolvenzthemen sowie bei Bedarf '
      + 'Verweis an eine zugelassene Fachstelle.',
    imageAlt: 'Geordnete Finanzunterlagen und ein Taschenrechner auf einem Tisch.',
    intro:
      'Bei finanziellen Themen unterstützen wir Sie organisatorisch und vermitteln bei Bedarf an geeignete Partner oder Fachstellen.',
    blocks: [
      {
        kind: 'list',
        id: 'credit',
        title: 'Kredite & Finanzierung',
        layout: 'checks',
        items: [
          'Vorbereitung von Kreditanfragen',
          'Zusammenstellung erforderlicher Unterlagen und Nachweise',
          'Unterstützung bei Finanzierungsanfragen',
          'Vermittlung an geeignete Finanzierungspartner',
          'Vorbereitung einer möglichen Immobilienfinanzierung',
        ],
      },
      {
        kind: 'list',
        id: 'insolvency',
        title: 'Finanzielle Schwierigkeiten & Insolvenz',
        layout: 'checks',
        items: [
          'Sortierung und Vorbereitung finanzieller Unterlagen',
          'Organisatorische Vorbereitung einer möglichen Privatinsolvenz',
          'Kontaktaufnahme mit geeigneten Beratungsstellen oder Fachpartnern',
          'Zusammenstellung erforderlicher Dokumente',
        ],
      },
      {
        kind: 'list',
        id: 'insurance',
        title: 'Versicherungen & Vorsorge',
        intro: 'Über geeignete Partner vermitteln wir Unterstützung zu Themen wie:',
        layout: 'checks',
        items: [
          'Lebensversicherung',
          'Alters- und Zukunftsvorsorge',
          'Absicherung der Familie',
          'Sterbegeld- und Bestattungsvorsorge',
          'Weitere Versicherungsangebote je nach Bedarf',
        ],
      },
    ],
    legalNote:
      'Wir erbringen in diesem Bereich ausschließlich organisatorische Unterstützung. Wir leisten keine Rechts-, Steuer-, Anlage-, Schuldner- oder Versicherungsberatung und vermitteln keine Kredite. Die Beratung selbst übernehmen zugelassene Fachleute, an die wir Sie auf Wunsch vermitteln.',
    seo: {
      title: 'Finanzen, Kredite & Vorsorge: organisatorische Unterstützung in Dortmund',
      description:
        'Organisatorische Vorbereitung von Kreditanfragen, Unterlagen bei finanziellen Schwierigkeiten und Vermittlung an geeignete Partner für Versicherung und Vorsorge. Keine Finanzberatung.',
    },
    status: 'final',
  },

  'real-estate': {
    id: 'real-estate',
    eyebrow: 'Büroservice',
    title: 'Immobilien & Investitionen',
    cardTitle: 'Immobilien und Investitionen',
    cardDescription:
      'Organisatorische Unterstützung bei Immobilienunterlagen und Terminen sowie Verweis an '
      + 'zugelassene Fachstellen, wenn Beratung oder Vermittlung erforderlich ist.',
    imageAlt: 'Grundriss und Immobilienunterlagen auf einem Besprechungstisch.',
    intro:
      'Sie möchten eine Immobilie kaufen oder interessieren sich für Investitionsmöglichkeiten? Wir unterstützen Sie bei der Orientierung, Vorbereitung und Vermittlung an passende Ansprechpartner.',
    blocks: [
      {
        kind: 'list',
        id: 'property-de',
        title: 'Immobilien in Deutschland',
        layout: 'checks',
        items: [
          'Orientierung rund um den Immobilienkauf',
          'Vorbereitung einer möglichen Immobilienfinanzierung',
          'Zusammenstellung benötigter Unterlagen',
          'Kontakt zu geeigneten Partnern',
          'Strukturierung der nächsten Schritte beim geplanten Immobilienkauf',
        ],
      },
      {
        kind: 'list',
        id: 'property-dubai',
        title: 'Immobilien & Investitionen in Dubai',
        layout: 'checks',
        items: [
          'Informationen zu verfügbaren Immobilienprojekten',
          'Vermittlung von Immobilienangeboten in Dubai',
          'Kontakt zu Projektentwicklern und Partnern',
          'Organisation von Gesprächen und Terminen',
          'Begleitung des Vermittlungsprozesses',
        ],
      },
    ],
    closing: 'Ein Ansprechpartner in Deutschland, für Ihre Möglichkeiten in Dubai.',
    legalNote:
      'Wir erbringen organisatorische Unterstützung und stellen Kontakte her. Eine Anlage-, Rechts- oder Steuerberatung ist damit nicht verbunden, und wir treffen keine Aussage über die Werthaltigkeit oder Rendite eines Objekts. Prüfen Sie jedes Angebot mit fachlicher Begleitung.',
    seo: {
      title: 'Immobilien & Investitionen in Dortmund und Dubai',
      description:
        'Orientierung und organisatorische Begleitung beim Immobilienkauf in Deutschland sowie Kontakt zu Projektpartnern in Dubai. Ein Ansprechpartner in Dortmund.',
    },
    status: 'final',
  },

  cleaning: {
    id: 'cleaning',
    eyebrow: 'Reinigungsservice',
    title: 'Sauberkeit, die man sieht. Service, auf den Sie sich verlassen können.',
    cardTitle: 'Reinigungsservice',
    cardDescription:
      'Professionelle Reinigung für Privathaushalte, Büros und gewerbliche Objekte, einmalig '
      + 'oder regelmäßig.',
    imageAlt: 'Helles, frisch gereinigtes Büro mit aufgeräumten Arbeitsplätzen.',
    intro:
      'Wir bieten professionelle Reinigung für Privathaushalte, Büros und gewerbliche Objekte '
      + '– einmalig oder regelmäßig. Nach der Besichtigung stimmen wir Leistungsumfang und '
      + 'Termine klar mit Ihnen ab und führen die vereinbarten Arbeiten sorgfältig aus.',
    blocks: [
      {
        kind: 'list',
        id: 'cleaning-types',
        title: 'Wir reinigen unter anderem',
        layout: 'columns',
        // Derived from the single source, so this page and the home section can
        // never disagree about which eight types exist.
        items: CLEANING_TYPES.map((type) => type.title),
      },
    ],
    closing:
      'Jedes Objekt hat eigene Anforderungen. Nach der Besichtigung stimmen wir einen klaren '
      + 'Leistungsumfang und passende Termine mit Ihnen ab – für eine einmalige oder '
      + 'regelmäßige Reinigung.',
    seo: {
      title: 'Reinigungsservice in Dortmund für Büro, Wohnung und Gewerbe',
      description:
        'Professionelle Reinigung für Wohnungen, Büros, Praxen, Schulen, Restaurants und '
        + 'Gewerbeobjekte in Dortmund. Einmalig oder regelmäßig, Angebot nach Besichtigung.',
    },
    status: 'final',
  },
};
