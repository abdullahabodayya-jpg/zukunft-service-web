/**
 * ARABIC SERVICE CONTENT - the six verticals.
 *
 * Source: the client's Arabic PDF via docs/research/00-source-brief.md §3.
 *
 * THIS IS NOT A TRANSLATION OF THE GERMAN FILE, and the differences are the
 * client's, not ours. The brief records three structural divergences and this
 * file reproduces them rather than flattening them out:
 *
 *   1. `finance` merges Kredite + Insolvenz + Versicherungen into ONE flat list.
 *      German splits them into three titled sub-blocks.
 *   2. `cleaning` lists المنازل and الشقق as separate entries.
 *
 * RETIRED: `study-visa` used to omit the post-arrival block that the German
 * file carries. SC10 card 3 gives the Arabic card the same promise as the
 * German one - housing, registration, enrolment - so the page now has to keep
 * it. Confirmed with the client on 24 Aug 2026.
 *
 * This is exactly why ServiceContent models `blocks` as a free-form array while
 * keeping id, slug, icon and order on the locale-invariant spine: the two
 * languages genuinely differ in body, never in structure-critical metadata.
 *
 * STATUS: every entry is `draft-needs-client-approval`. The German copy is the
 * client's verbatim wording; the Arabic below is authored to their documented
 * Arabic structure and needs a named human to approve it before launch, because
 * it describes regulated activity. See docs/PLAN.md open question 4.
 */

import type { ServiceContent, ServiceId } from '@/types/content';
import { CLEANING_TYPES } from './site';

/** Repeated verbatim in the two high-sensitivity services. Defined once so the
 *  hedge cannot drift between them. */
const LEGAL_NOTE =
  'نقدم في هذا المجال دعمًا تنظيميًا فقط. نحن لا نقدم استشارات قانونية أو ضريبية أو '
  + 'استثمارية أو تأمينية، ولا نتوسط في منح القروض. أما الاستشارة نفسها فيتولاها '
  + 'مختصون مرخصون نحيلك إليهم عند الطلب.';

export const arServices: Record<ServiceId, ServiceContent> = {
  authorities: {
    id: 'authorities',
    eyebrow: 'الخدمات المكتبية',
    title: 'أوراق مرتبة، وخطوات أوضح',
    cardTitle: 'التجنيس والوثائق الرسمية',
    cardDescription:
      'نقدم لك دعمًا إداريًا متخصصًا في معاملات التجنيس والإقامة والوثائق الرسمية، بدءًا من '
      + 'تحضير الطلبات وتدقيق المستندات، وصولًا إلى تنسيق المواعيد ومتابعة الإجراءات.',
    imageAlt: 'أوراق ومعاملات مرتبة على مكتب.',
    intro:
      'من طلبات التجنيس إلى الوثائق المدنية ووثائق السفر، نساعدك في تنظيم المتطلبات وتجهيز '
      + 'الملف والتواصل الإداري مع الجهات المختصة. نتعامل مع وثائق صادرة من دول مختلفة، ومن '
      + 'بينها الوثائق السورية والعراقية.',
    // SC11: three groups instead of one flat list of ten, matching the German.
    blocks: [
      {
        kind: 'list',
        id: 'applications',
        title: 'الطلبات والتجنيس',
        layout: 'checks',
        items: [
          'المساعدة في تجهيز طلب التجنيس وترتيب خطواته.',
          'جمع الأوراق المطلوبة ومراجعة اكتمالها الشكلي.',
          'المساعدة في تعبئة الاستمارات والطلبات بناءً على معلوماتك.',
          'تنظيم المراسلات والتواصل الإداري مع الدوائر الرسمية.',
        ],
      },
      {
        kind: 'list',
        id: 'civil-status',
        title: 'وثائق الأحوال المدنية',
        layout: 'checks',
        items: [
          'تنظيم طلبات شهادات الميلاد وعقود الزواج ووثائق الأحوال المدنية.',
          'تنسيق استخراج بيانات الولادة وإخراجات القيد.',
          'تجهيز الأوراق المطلوبة للتصديق وللمعاملات الرسمية الأخرى.',
        ],
      },
      {
        kind: 'list',
        id: 'foreign-documents',
        title: 'الوثائق الأجنبية ووثائق السفر',
        layout: 'checks',
        items: [
          'تنظيم متطلبات وخطوات الوثائق الصادرة من الخارج، بما فيها الوثائق السورية والعراقية.',
          'المساعدة التنظيمية في معاملات جوازات السفر السورية والعراقية.',
          'ترتيب المتطلبات والخطوات بحسب نوع الوثيقة والجهة المختصة.',
        ],
      },
    ],
    // SC11: the three groups sit side by side, not down the page.
    blockLayout: 'grid',
    closing:
      'لست متأكدًا من الأوراق المطلوبة؟ أخبرنا بنوع معاملتك وبلد إصدار الوثائق، وسنساعدك في '
      + 'ترتيب البداية والخطوات التالية.',
    legalNote: 'إصدار الوثائق والقرارات النهائية يبقى من اختصاص الجهات الرسمية.',
    seo: {
      title: 'التجنيس والوثائق الرسمية في دورتموند',
      description:
        'مساعدة في طلبات التجنيس ووثائق الأحوال المدنية والوثائق الصادرة خارج ألمانيا، ومن '
        + 'بينها الوثائق السورية والعراقية. Zukunft Service في دورتموند.',
    },
    status: 'draft-needs-client-approval',
  },

  'marriage-translation': {
    id: 'marriage-translation',
    eyebrow: 'الخدمات المكتبية',
    title: 'الزواج والترجمة وتصديق الوثائق',
    cardTitle: 'الزواج والترجمات والوثائق الدولية',
    cardDescription:
      'دعم إداري في وثائق الزواج ولم الشمل والوثائق الصادرة خارج ألمانيا، مع تنسيق الترجمات '
      + 'المصدقة لدى مترجمين محلفين أو مخولين.',
    imageAlt: 'وثائق صادرة خارج ألمانيا مرفقة بترجمتها.',
    intro:
      'نساعدك في الوثائق الصادرة خارج ألمانيا وفي المسائل التنظيمية المتعلقة بالترجمة والتصديق وعقد الزواج.',
    blocks: [
      {
        kind: 'list',
        id: 'marriage-main',
        layout: 'checks',
        items: [
          'ترجمة الوثائق عبر مترجمين مناسبين',
          'تجهيز الأوراق اللازمة للتصديق',
          'تجهيز الوثائق الأجنبية لتقديمها إلى الدوائر الألمانية',
          'عقود الزواج والوثائق الأخرى المتعلقة بالزواج',
          'المساعدة في تسجيل الزواج والاعتراف به في ألمانيا',
          'استخراج وثائق الأحوال المدنية والحالة العائلية الناقصة',
        ],
      },
      {
        kind: 'prose',
        id: 'translation-service',
        title: 'خدمة الترجمة',
        body:
          'من خلال شبكة علاقاتنا نوصلك بمترجمين لمختلف الأغراض، كالدوائر الرسمية والوثائق والمواعيد والطلبات والأوراق الشخصية أو التجارية.',
      },
    ],
    seo: {
      title: 'الزواج والترجمة وتصديق الوثائق في دورتموند',
      description:
        'دعم تنظيمي في عقد الزواج والاعتراف بالوثائق الأجنبية والترجمات عبر مترجمين محلفين. Zukunft Service دورتموند.',
    },
    status: 'draft-needs-client-approval',
  },

  'study-visa': {
    id: 'study-visa',
    eyebrow: 'الخدمات المكتبية',
    title: 'الدراسة والجامعات والتأشيرات',
    cardTitle: 'الدراسة والتأشيرات',
    cardDescription:
      'دعم إداري في القبولات الجامعية والتأشيرات الدراسية والسياحية، إضافة إلى ترتيب خطوات '
      + 'الطالب بعد الوصول مثل البحث عن سكن، التسجيل وإجراءات الالتحاق بالجامعة.',
    imageAlt: 'طالبة تحمل أوراق التقديم أمام مبنى جامعي.',
    intro:
      'ترغب في الدراسة في ألمانيا أو أوروبا، أو تحتاج إلى مساعدة في تجهيز طلب تأشيرة؟ نساعدك في الخطوات التنظيمية.',
    blocks: [
      {
        kind: 'list',
        id: 'study',
        title: 'الدراسة والجامعة',
        layout: 'checks',
        items: [
          'البحث عن فرص دراسية مناسبة',
          'المساعدة في التقديم إلى الجامعات',
          'تجهيز أوراق التقديم وتجميعها',
          'المساعدة في إجراءات القبول',
          'تنظيم الوثائق المطلوبة',
          'تجهيز الأوراق اللازمة لتأشيرة الدراسة',
        ],
      },
      {
        kind: 'list',
        id: 'visa',
        title: 'التأشيرات',
        layout: 'columns',
        items: [
          'تأشيرات الدراسة',
          'تأشيرات شنغن',
          'التأشيرات السياحية',
          'تأشيرات الزيارة',
          'تجهيز الأوراق المطلوبة وترتيبها بشكل منظم',
        ],
      },
      {
        // SC10 card 3 promises post-arrival support in Arabic as well as in
        // German, so the Arabic page carries the same block. Mirrors the
        // German `after-arrival` highlight point for point.
        kind: 'highlight',
        id: 'after-arrival',
        title: 'نرافقك أيضًا بعد الوصول',
        intro:
          'لا تنتهي مساندتنا بالحصول على التأشيرة أو بالوصول إلى ألمانيا. في الأشهر الأولى '
          + 'تحديدًا نرافق الطلاب في أهم الخطوات التنظيمية، ونساعدهم على جعل البداية في '
          + 'ألمانيا أسهل ما يمكن.',
        items: [
          'البحث عن سكن مناسب',
          'المساعدة في التسجيل لدى دائرة قيد السكان',
          'التوجيه والمرافقة في المعاملات الرسمية المهمة',
          'تجهيز الأوراق اللازمة',
          'الدعم التنظيمي في كل ما يتعلق بالجامعة وببداية الدراسة',
          'التوجيه في الخطوات الأولى للحياة اليومية في ألمانيا',
        ],
        closing: 'من أول طلب إلى خطواتك الأولى في ألمانيا، نرافقك في طريقك.',
      },
    ],
    seo: {
      title: 'الدراسة والجامعات والتأشيرات في دورتموند',
      description:
        'مساعدة في التقديم الجامعي وإجراءات القبول وتأشيرة الدراسة وتأشيرة شنغن. Zukunft Service دورتموند.',
    },
    status: 'draft-needs-client-approval',
  },

  finance: {
    id: 'finance',
    eyebrow: 'الخدمات المكتبية',
    title: 'الأمور المالية والقروض والتأمين',
    cardTitle: 'الشؤون المالية والتأمين',
    cardDescription:
      'دعم إداري في ترتيب المستندات والمتطلبات المعلنة المتعلقة بالتأمين والتمويل والقروض '
      + 'والإفلاس الشخصي، مع الإحالة إلى جهة مرخصة عند الحاجة.',
    imageAlt: 'أوراق مالية مرتبة وآلة حاسبة على طاولة.',
    intro:
      'في المسائل المالية نقدم لك دعمًا تنظيميًا، ونحيلك عند الحاجة إلى شركاء أو جهات مختصة مناسبة.',
    // NOTE: one flat list here, against three titled sub-blocks in German. That
    // is how the client's Arabic PDF is organised.
    blocks: [
      {
        kind: 'list',
        id: 'finance-main',
        layout: 'checks',
        items: [
          'تجهيز طلبات القروض',
          'تجميع الأوراق والإثباتات المطلوبة',
          'المساعدة في طلبات التمويل',
          'الإحالة إلى شركاء تمويل مناسبين',
          'ترتيب وتجهيز الأوراق المالية',
          'التحضير التنظيمي لإجراء إفلاس شخصي محتمل',
          'التواصل مع جهات استشارية أو شركاء مختصين مناسبين',
          'التأمين على الحياة',
          'الادخار وتأمين المستقبل والتقاعد',
          'تأمين العائلة',
          'الادخار لتغطية مصاريف الوفاة والدفن',
        ],
      },
    ],
    legalNote: LEGAL_NOTE,
    seo: {
      title: 'الأمور المالية والقروض والتأمين: دعم تنظيمي في دورتموند',
      description:
        'تحضير تنظيمي لطلبات القروض والأوراق المالية، وإحالة إلى شركاء مناسبين في التأمين والادخار. من دون استشارة مالية.',
    },
    status: 'draft-needs-client-approval',
  },

  'real-estate': {
    id: 'real-estate',
    eyebrow: 'الخدمات المكتبية',
    title: 'العقارات والاستثمار',
    cardTitle: 'العقارات والاستثمار',
    cardDescription:
      'دعم تنظيمي في معاملات العقارات والوثائق والمواعيد، مع الإحالة إلى جهات مرخصة عندما '
      + 'تتطلب الحالة استشارة أو وساطة متخصصة.',
    imageAlt: 'مخطط عقاري وأوراق على طاولة اجتماعات.',
    intro:
      'ترغب في شراء عقار أو تهتم بفرص الاستثمار؟ نساعدك في التوجيه والتحضير والإحالة إلى الجهات المناسبة.',
    blocks: [
      {
        kind: 'list',
        id: 'property-de',
        title: 'العقارات في ألمانيا',
        layout: 'checks',
        items: [
          'التوجيه في كل ما يتعلق بشراء العقار',
          'التحضير لتمويل عقاري محتمل',
          'تجميع الأوراق المطلوبة',
          'التواصل مع شركاء مناسبين',
          'ترتيب الخطوات التالية لشراء العقار المزمع',
        ],
      },
      {
        kind: 'list',
        id: 'property-dubai',
        title: 'العقارات والاستثمار في دبي',
        layout: 'checks',
        items: [
          'معلومات عن المشاريع العقارية المتاحة',
          'عرض فرص عقارية في دبي',
          'التواصل مع المطورين والشركاء',
          'تنظيم اللقاءات والمواعيد',
          'مرافقة عملية التواصل حتى نهايتها',
        ],
      },
    ],
    closing: 'نقطة تواصل واحدة في ألمانيا لفرصك الاستثمارية في دبي.',
    legalNote: LEGAL_NOTE,
    seo: {
      title: 'العقارات والاستثمار في دورتموند ودبي',
      description:
        'توجيه ومرافقة تنظيمية لشراء العقارات في ألمانيا، وتواصل مع شركاء المشاريع في دبي. نقطة تواصل واحدة في دورتموند.',
    },
    status: 'draft-needs-client-approval',
  },

  cleaning: {
    id: 'cleaning',
    eyebrow: 'خدمة التنظيف',
    title: 'نظافة ترى، وخدمة يعتمد عليها',
    cardTitle: 'خدمة التنظيف',
    cardDescription:
      'تنظيف احترافي للمنازل والمكاتب والمنشآت، لمرة واحدة أو وفق جدول دوري.',
    imageAlt: 'مكتب مضيء بعد التنظيف، مكاتبه مرتبة ونوافذه نظيفة.',
    intro:
      'نقدم تنظيفًا احترافيًا للمنازل والمكاتب والمنشآت، لمرة واحدة أو وفق جدول دوري. بعد '
      + 'معاينة المكان، نحدد معك نطاق العمل والمواعيد بوضوح، ثم ننفذ الخدمة بعناية وفق ما تم '
      + 'الاتفاق عليه.',
    blocks: [
      {
        kind: 'list',
        id: 'cleaning-types',
        title: 'ننظف من بين ما ننظف',
        layout: 'columns',
        items: CLEANING_TYPES.map((type) => type.title),
      },
    ],
    closing:
      'لكل مكان احتياجاته الخاصة. بعد المعاينة، نحدد معك نطاق تنظيف واضحًا ومواعيد مناسبة، '
      + 'لخدمة لمرة واحدة أو لتنظيف دوري.',
    seo: {
      title: 'خدمات التنظيف في دورتموند للمكاتب والشقق والمرافق التجارية',
      description:
        'تنظيف احترافي للشقق والمكاتب والعيادات والمدارس والمطاعم والمرافق التجارية في '
        + 'دورتموند، لمرة واحدة أو بشكل دوري، مع عرض سعر بعد المعاينة.',
    },
    status: 'draft-needs-client-approval',
  },
};
