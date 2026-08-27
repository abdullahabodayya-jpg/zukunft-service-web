/**
 * ARABIC SITE CONTENT - chrome + home page + form + a11y strings.
 *
 * This is NOT a translation of the German file. It is the Arabic body on the
 * shared spine: the same required keys (TypeScript enforces that via
 * `: SiteContent`), but wording written for an Arabic-speaking reader living in
 * Germany rather than transliterated German.
 *
 * FORBIDDEN COPY - the hedging is load-bearing, exactly as in the German file.
 * Never promise an outcome (نضمن / مضمون / نحصل لك على), never claim regulated
 * advice (استشارة قانونية / ضريبية / تأمينية). Always: نرافقك · نساعدك في ·
 * نجهز · ننظم · نشرح. The authorities decide; we prepare.
 *
 * TYPOGRAPHY: never letter-space Arabic and never uppercase it - both break
 * cursive joining. The `ar` variant in globals.css already forces this off.
 *
 * LATIN RUNS: the brand name Zukunft Service, the address and the phone number
 * stay Latin and must be bidi-isolated by the component that renders them.
 */

import type { CleaningType, SiteContent } from '@/types/content';

/** Defined once so the hedge can never drift between the scope section and the
 *  contact form - the two places a regulator would actually look. */
/** SC13: the eight cleaning types, defined ONCE. See the German file for why. */
export const CLEANING_TYPES: readonly CleaningType[] = [
  {
    id: 'homes',
    title: 'المنازل والشقق',
    description: 'تنظيف شامل لمختلف المساحات السكنية، لمرة واحدة أو بشكل دوري.',
    imageAlt: 'صورة داخلية لمنزل أو شقة نظيفة وحديثة، دون أشخاص.',
  },
  {
    id: 'offices',
    title: 'المكاتب والعيادات',
    description: 'عناية منظمة بمساحات العمل والاستقبال وفق نطاق الخدمة المتفق عليه.',
    imageAlt: 'صورة مكتب أو استقبال عيادة نظيف ومرتب، دون أشخاص.',
  },
  {
    id: 'schools',
    title: 'المدارس',
    description: 'تنظيف منظم للفصول والممرات والمساحات المستخدمة يوميًا.',
    imageAlt: 'صورة فصل أو ممر مدرسي نظيف، دون طلاب أو أشخاص.',
  },
  {
    id: 'restaurants',
    title: 'المطاعم',
    description: 'عناية بمساحات العمل والضيوف وفق الموعد ونطاق الخدمة المتفق عليهما.',
    imageAlt: 'صورة مطعم نظيف ومرتب، دون أشخاص.',
  },
  {
    id: 'retail',
    title: 'المحال والمنشآت التجارية',
    description: 'تنظيف مساحات العرض والعمل بما يتناسب مع طبيعة المكان وأوقات استخدامه.',
    imageAlt: 'صورة متجر أو مساحة تجارية نظيفة، دون أشخاص.',
  },
  {
    id: 'move-out',
    title: 'ما بعد الانتقال أو الترميم',
    description: 'تنظيف شامل بعد الانتقال أو أعمال الترميم، لتجهيز المكان للاستخدام من جديد.',
    imageAlt: 'صورة مساحة فارغة بعد ترميم أو انتقال وقد أصبحت نظيفة، دون عمال.',
  },
  {
    id: 'common-areas',
    title: 'المداخل والأدراج والمساحات المشتركة',
    description: 'عناية دورية بالمساحات كثيرة الاستخدام للحفاظ على مظهر نظيف ومرتب.',
    imageAlt: 'صورة مدخل أو درج أو ممر مشترك نظيف، دون أشخاص.',
  },
  {
    id: 'windows',
    title: 'النوافذ والأسطح الزجاجية',
    description: 'تنظيف النوافذ والواجهات الزجاجية بعناية للحصول على مظهر واضح ومرتب.',
    imageAlt: 'صورة نافذة أو واجهة زجاجية نظيفة وواضحة، دون أشخاص.',
  },
];

const HEDGE_NOTICE =
  'نقدم دعمًا إداريًا وتنظيميًا ولغويًا، ونحيل العميل عند الحاجة إلى جهة مهنية مرخصة. '
  + 'لا نقدم استشارات قانونية أو ضريبية أو تأمينية أو استثمارية، ولا نتوسط في القروض أو '
  + 'التمويل، ولا نضمن قرارات الجهات الرسمية.';

export const arSite: SiteContent = {
  meta: {
    siteName: 'Zukunft Service',
    slogan: 'شريكك في معاملات الدوائر الرسمية والوثائق والحياة اليومية في ألمانيا',
    homeTitle: 'Zukunft Service دورتموند: معاملات ووثائق وخدمات تنظيف',
    homeDescription:
      'مكتب Zukunft Service في دورتموند يرافقك في معاملات التجنيس والدوائر الرسمية والترجمات والدراسة والتأشيرات، ويتولى خدمات التنظيف. نتحدث العربية والألمانية.',
    localeLabel: 'العربية',
    switchLabel: 'Deutsch',
    switchAriaLabel: 'التبديل إلى النسخة الألمانية – Zur deutschen Version wechseln',
  },

  nav: {
    primary: [
      { id: 'services', label: 'خدماتنا', target: { kind: 'route', routeId: 'services' } },
      { id: 'why', label: 'لماذا نحن', target: { kind: 'anchor', hash: '#warum-wir' } },
      {
        id: 'cleaning',
        label: 'التنظيف',
        target: { kind: 'anchor', hash: '#reinigungsservice' },
      },
      { id: 'contact', label: 'تواصل معنا', target: { kind: 'route', routeId: 'contact' } },
    ],
    // Mirrors the German footer: six service links, same order, same targets.
    footer: [
      {
        id: 'authorities',
        label: 'التجنيس والدوائر الرسمية',
        target: { kind: 'service', serviceId: 'authorities' },
      },
      {
        id: 'marriage-translation',
        label: 'الزواج والترجمات',
        target: { kind: 'service', serviceId: 'marriage-translation' },
      },
      {
        id: 'study-visa',
        label: 'الدراسة والتأشيرات',
        target: { kind: 'service', serviceId: 'study-visa' },
      },
      {
        id: 'finance',
        label: 'الشؤون المالية والادخار',
        target: { kind: 'service', serviceId: 'finance' },
      },
      {
        id: 'real-estate',
        label: 'العقارات والاستثمار',
        target: { kind: 'service', serviceId: 'real-estate' },
      },
      {
        id: 'cleaning',
        label: 'خدمة التنظيف',
        target: { kind: 'service', serviceId: 'cleaning' },
      },
    ],
    legal: [
      // "Impressum" stays the German word in both locales: case law has rejected
      // "Kontakt", "Legal" and "Info" as insufficiently clear labels.
      { id: 'imprint', label: 'Impressum', target: { kind: 'route', routeId: 'imprint' } },
      { id: 'privacy', label: 'حماية البيانات', target: { kind: 'route', routeId: 'privacy' } },
    ],
  },

  hero: {
    eyebrow: 'خدمات مكتبية وخدمات تنظيف في دورتموند',
    headline: 'احتياجات مختلفة، وخدمة يمكنك الاعتماد عليها',
    lead:
      'نساندك بخبرة وتنظيم في المعاملات الرسمية، والترجمة، والدراسة والتأشيرات، والخدمات '
      + 'المالية والعقارية. كما نقدم خدمة تنظيف مستقلة للمنازل والمنشآت، تنفذ بعناية '
      + 'والتزام. مهما كانت حاجتك، ستجد فريقًا يستمع إليك ويتابع خدمتك خطوة بخطوة.',
    primaryCta: {
      label: 'اشرح لنا حالتك',
      hint: 'من دون التزام ومن دون رسوم. نرد عليك في أول يوم عمل.',
    },
    secondaryCta: { label: 'تصفح الخدمات' },
    trust: [
      { id: 'languages', icon: 'MessagesSquare', label: 'نتحدث العربية والألمانية' },
      { id: 'local', icon: 'MapPin', label: 'في دورتموند' },
      { id: 'one-hand', icon: 'Layers', label: 'كل شيء في مكان واحد' },
    ],
    // See the German file: the photograph has no people in it.
    imageAlt: 'أوراق ودفتر ومجموعة مفاتيح مرتبة على طاولة خشبية فاتحة قرب النافذة.',
  },

  pillars: [
    {
      id: 'office',
      icon: 'FileText',
      title: 'الخدمات المكتبية',
      body:
        'الطلبات والاستمارات والمواعيد والمراسلات، من التجنيس إلى الترجمات وصولًا إلى الدراسة والتأشيرات. نرتب لك ما يجب أن يجتمع معًا، ونرافقك خطوة بخطوة.',
      linkLabel: 'تصفح الخدمات المكتبية',
    },
    {
      id: 'cleaning',
      icon: 'CleaningCart',
      title: 'خدمة التنظيف',
      body:
        'تنظيف دوري، وتنظيف شامل، وتنظيف بعد الانتقال أو بعد أعمال الترميم، للبيوت والمكاتب والعيادات في دورتموند وما حولها.',
      linkLabel: 'تصفح خدمة التنظيف',
    },
  ],

  process: {
    heading: {
      eyebrow: 'كيف نعمل',
      title: 'من السؤال إلى الحل في ثلاث خطوات',
      lead:
        'لست مضطرًا لمعرفة الدائرة المختصة ولا اسم الاستمارة. اشرح لنا وضعك فقط، ونحن نرتب الباقي.',
    },
    steps: [
      {
        id: 'talk',
        index: '01',
        title: 'تشرح لنا حالتك',
        body:
          'عبر النموذج أو واتساب أو الهاتف، بالعربية أو بالألمانية. لا تحتاج إلى مصطلحات رسمية ولا إلى أوراق جاهزة.',
      },
      {
        id: 'plan',
        index: '02',
        title: 'نرتب لك الأمور ونشرحها',
        body:
          'نوضح لك ما هو المطلوب، وأي جهة هي المختصة، وبأي ترتيب يفضل أن تسير الأمور، بلغة مفهومة بعيدًا عن تعقيد اللغة الرسمية.',
      },
      {
        id: 'do',
        index: '03',
        title: 'نرافقك حتى التنفيذ',
        body:
          'تعبئة الاستمارات، وتنسيق المواعيد، وتجهيز الأوراق، وتنظيم الترجمات. نبقى معك إلى أن تنجز المعاملة.',
      },
    ],
  },

  services: {
    heading: {
      eyebrow: 'الخدمات المكتبية',
      title: 'أنت تشرح طلبك، ونحن نرتب الخطوات',
      lead:
        'نقدم لك دعمًا إداريًا منظمًا في المعاملات الرسمية، والترجمة، والدراسة والتأشيرات، '
        + 'والخدمات المالية والعقارية. نفهم ما تحتاجه، نوضح المطلوب، وننسق الخطوات المتفق '
        + 'عليها بعناية وشفافية، بالعربية أو الألمانية.',
    },
    trustBadges: ['خطوات واضحة', 'متابعة شخصية', 'بالعربية والألمانية'],
    detailLabel: 'تفاصيل الخدمة',
    note:
      'غير متأكد أي خدمة تناسب احتياجك؟ أخبرنا بما تحتاجه وسنوجهك إلى القسم المناسب.',
  },

  why: {
    heading: {
      eyebrow: 'لماذا Zukunft Service؟',
      title: 'الخدمة الجيدة تبدأ بفهم احتياجك',
      lead:
        'نستمع إليك أولًا، ونوضح لك الخطوات بالعربية أو الألمانية، ونقدم كل خدمة بتنظيم '
        + 'وشفافية واهتمام بالتفاصيل، من أول تواصل حتى اكتمالها.',
    },
    points: [
      {
        id: 'personal',
        icon: 'HandHeart',
        title: 'متابعة شخصية وتواصل واضح',
        body:
          'لديك جهة تواصل تعرف تفاصيل طلبك وتهتم بمتابعته، دون أن تضطر إلى شرح كل شيء من '
          + 'جديد في كل مرة.',
      },
      {
        id: 'one-hand',
        icon: 'Layers',
        title: 'خدمات مختلفة، مستوى واحد من العناية',
        body:
          'نقدم لك دعمًا متخصصًا في المعاملات الرسمية، والترجمة، والدراسة والتأشيرات، '
          + 'والخدمات المالية والعقارية، إلى جانب خدمة تنظيف احترافية للمنازل والمنشآت. '
          + 'تختلف طبيعة كل خدمة، لكن يبقى التنظيم والالتزام والاهتمام بالتفاصيل معيارنا في '
          + 'جميعها.',
      },
      {
        id: 'multilingual',
        icon: 'MessagesSquare',
        title: 'وضوح يتجاوز حاجز اللغة',
        body:
          'نتواصل معك بالعربية أو الألمانية، ونشرح المراسلات والإجراءات بلغة مفهومة، لتعرف '
          + 'ما المطلوب منك، ولماذا، وما الخطوة التالية.',
      },
      {
        id: 'network',
        icon: 'Network',
        title: 'الخبرة المناسبة، في الوقت المناسب',
        body:
          'عندما يتطلب طلبك اختصاصًا إضافيًا، نساعدك في الوصول إلى الجهة المناسبة من مكاتب '
          + 'الترجمة والمحاماة والاستشارات، لتعرف إلى من تتوجه دون بحث طويل أو خطوات عشوائية.',
      },
      {
        id: 'tailored',
        icon: 'Route',
        title: 'نبدأ من وضعك، لا من باقة جاهزة',
        body:
          'لكل طلب ظروفه الخاصة. لذلك نفهم حاجتك أولًا، ثم نحدد معك نطاق الخدمة والخطوات '
          + 'المطلوبة بوضوح، دون إضافات لا تحتاجها.',
      },
    ],
  },

  cleaning: {
    heading: {
      eyebrow: 'خدمة التنظيف',
      title: 'نظافة ترى، وخدمة يعتمد عليها',
      lead:
        'سواء احتجت تنظيفًا دوريًا أو لمرة واحدة، نحدد الخدمة وفق نوع المكان ومساحته وطبيعة '
        + 'استخدامه، للمنازل والمكاتب والمنشآت، بمواعيد واضحة وعناية دقيقة بالتفاصيل.',
    },
    types: CLEANING_TYPES,
    trustBar: ['فريق موثوق', 'مواعيد واضحة', 'نطاق عمل متفق عليه', 'عرض سعر بعد المعاينة'],
    ctaTitle: 'مكان أنظف يبدأ بخطوة بسيطة',
    ctaBody:
      'أخبرنا بنوع المكان ومساحته والخدمة المطلوبة. ننسق معك موعدًا للمعاينة، ثم نقدم عرض '
      + 'سعر واضحًا يناسب احتياجك.',
    cta: { label: 'اطلب عرض تنظيف' },
    closing:
      'لكل مكان احتياجاته الخاصة. بعد المعاينة، نحدد معك نطاق تنظيف واضحًا ومواعيد مناسبة، '
      + 'لخدمة لمرة واحدة أو لتنظيف دوري.',
    imageAlt: 'مكتب مضيء بعد التنظيف، مكاتبه مرتبة ونوافذه نظيفة.',
  },

  scope: {
    heading: {
      eyebrow: 'شفافية تبني الثقة',
      title: 'من البداية تعرف ما يمكنك توقعه',
      lead:
        'نشرح لك نطاق الخدمة وخطواتها بلغة واضحة. وإذا احتاج طلبك إلى جهة مهنية مرخصة، '
        + 'نخبرك مبكرًا ونبين لك إلى من يمكنك التوجه، لتتخذ قرارك بثقة وتبقى مطلعًا في كل '
        + 'مرحلة.',
    },
    supportTitle: 'دعم عملي ومنظم',
    supportPoints: [
      'مساعدتك تنظيميًا في تعبئة الطلبات والاستمارات وفق المعلومات التي تزودنا بها.',
      'توضيح المراسلات الألمانية لغويًا وشرح الخطوات المذكورة فيها.',
      'حجز المواعيد وتنسيق التواصل الإداري مع الدوائر والجهات المختصة بموافقتك.',
      'ترتيب المستندات ومراجعة اكتمالها الشكلي وفق المتطلبات الرسمية المعلنة.',
      'تنسيق الترجمات المصدقة لدى مترجمين محلفين أو مخولين.',
      'الحضور معك في المواعيد عند الاتفاق وعندما تسمح الجهة، للدعم اللغوي والتنظيمي.',
    ],
    cleaningStrip:
      'تحديد نطاق العمل بعد المعاينة وتنفيذ التنظيف وفق العرض والمواعيد المتفق عليها.',
    referralTitle: 'لكل موضوع خبيره المناسب',
    referralIntro:
      'بعض الموضوعات تتطلب قانونًا جهة مهنية مرخصة. نوضح لك ذلك مبكرًا ونساعدك في الوصول '
      + 'إلى الاختصاص المناسب، بدل أن تبقى وحدك أمام الخطوة التالية.',
    referralCategories: [
      'الاستشارات القانونية والتمثيل أمام المحاكم يقدمهما محامون أو جهات مخولة قانونًا.',
      'الاستشارات الضريبية يقدمها مستشارون ضريبيون أو جهات مخولة.',
      'الاستشارات أو الوساطة التأمينية والاستثمارية يقدمها مختصون مرخصون.',
      'القروض والتمويل تتم عبر البنوك أو الوسطاء المرخصين؛ ودورنا يقتصر على الدعم التنظيمي.',
      'القرارات الرسمية تصدر عن الجهات المختصة وحدها. نساعد في التحضير والتنظيم ولا نعد بنتيجة محددة.',
    ],
    trustTitle: 'الخطوة التالية تبقى واضحة',
    trustBody:
      'إذا احتاج موضوعك إلى جهة مرخصة، نخبرك بذلك مبكرًا ونساعدك في العثور على جهة مناسبة. '
      + 'اختيارها والتعاقد معها يبقيان بيدك، وهي وحدها المسؤولة عن الاستشارة المهنية.',
    notice: HEDGE_NOTICE,
  },

  contact: {
    heading: {
      eyebrow: 'تواصل معنا',
      title: 'أخبرنا بما تحتاجه وسنوضح لك الخطوة التالية',
      lead:
        'اكتب لنا في بضع جمل ما تحتاجه، واختر طريقة التواصل الأنسب لك. سنتواصل معك ونخبرك '
        + 'بوضوح بما يلزم للبدء.',
    },
    quickContact: {
      whatsapp: 'راسلنا عبر واتساب',
      call: 'اتصل بنا',
      email: 'أرسل بريدًا إلكترونيًا',
    },
    privacyNote:
      'لخصوصيتك، لا ترسل مستندات شخصية في الرسالة الأولى؛ سنخبرك إذا احتجنا إليها لاحقًا.',
    responseNote:
      'يمكنك مراسلتنا في الوقت الذي يناسبك، وسنرد عليك في أقرب وقت خلال ساعات الدوام.',
  },

  info: {
    hoursTitle: 'أوقات الدوام',
    addressTitle: 'العنوان',
    contactTitle: 'التواصل',
    mapsLabel: 'افتح الموقع على الخريطة',
    closedLabel: 'مغلق',
    hoursNote: 'مواعيد أخرى حسب الاتفاق',
  },

  footer: {
    slogan: 'خدمات مكتبية وخدمات تنظيف في دورتموند، بالعربية والألمانية.',
    navTitle: 'الصفحات',
    legalTitle: 'معلومات قانونية',
    copyright: '© {year} Zukunft Service. جميع الحقوق محفوظة.',
  },

  form: {
    title: 'اشرح لنا حالتك',
    lead: 'الحقول المؤشر عليها بنجمة إلزامية. وما عداها اختياري.',
    service: {
      label: 'ما موضوع طلبك؟',
      hint: 'إن لم تكن متأكدًا، اختر «لست متأكدًا».',
      options: [
        { value: 'authorities', label: 'التجنيس والدوائر الرسمية والوثائق' },
        { value: 'marriage-translation', label: 'الزواج والترجمات والوثائق الدولية' },
        { value: 'study-visa', label: 'الدراسة والجامعة والتأشيرات' },
        { value: 'finance', label: 'الشؤون المالية والقروض والادخار' },
        { value: 'real-estate', label: 'العقارات والاستثمار' },
        { value: 'cleaning', label: 'خدمة التنظيف' },
        { value: 'other', label: 'لست متأكدًا / موضوع آخر' },
      ],
    },
    message: {
      label: 'اشرح لنا طلبك',
      placeholder: 'صف وضعك باختصار. بضع جمل تكفي تمامًا.',
      hint: 'من فضلك لا ترسل نسخًا من الهوية أو الوثائق في هذه المرحلة.',
    },
    name: { label: 'الاسم', placeholder: 'الاسم الأول واسم العائلة' },
    email: {
      label: 'البريد الإلكتروني',
      placeholder: 'name@beispiel.de',
      hint: 'سنرسل ردنا إلى هذا العنوان.',
    },
    phone: {
      label: 'رقم الهاتف',
      placeholder: '+49 …',
      hint: 'اختياري، إلا إذا رغبت بالرد عبر واتساب.',
    },
    whatsappOptIn: {
      label: 'لا مانع لدي من الرد عبر واتساب',
      hint: 'نحتاج رقم هاتفك لذلك.',
    },
    preferredTime: {
      label: 'ما هو أنسب وقت للتواصل معك؟',
      options: [
        { value: 'morning', label: 'صباحًا (10–13)' },
        { value: 'afternoon', label: 'بعد الظهر (13–16)' },
        { value: 'any', label: 'لا فرق' },
      ],
    },
    honeypot: { label: 'يرجى ترك هذا الحقل فارغًا' },
    submit: 'إرسال الطلب',
    submitting: 'جار الإرسال …',
    successTitle: 'شكرًا لك، وصلنا طلبك.',
    successBody:
      'استلمنا رسالتك وسنتواصل معك في أول يوم عمل. وإذا كان الأمر عاجلًا، يمكنك الاتصال بنا أو مراسلتنا على واتساب.',
    errorTitle: 'تعذر إرسال الطلب.',
    errorBody:
      'لم نتمكن من إرسال طلبك. حاول مرة أخرى من فضلك، أو راسلنا مباشرة عبر واتساب أو البريد الإلكتروني.',
    errorSummaryTitle: 'يرجى مراجعة هذه البيانات:',
    requiredLabel: 'حقل إلزامي',
    optionalLabel: 'اختياري',
    privacyNotice: 'نستخدم بياناتك لمعالجة طلبك فقط. مزيد من التفاصيل في',
    privacyLinkLabel: 'سياسة حماية البيانات',
    hedgeNotice: HEDGE_NOTICE,
    validation: {
      required: 'يرجى تعبئة هذا الحقل.',
      nameTooShort: 'يرجى كتابة اسمك.',
      emailInvalid: 'يرجى التحقق من بريدك الإلكتروني.',
      messageTooShort: 'يرجى وصف طلبك بجملة واحدة على الأقل.',
      messageTooLong: 'رسالتك طويلة أكثر من اللازم. يرجى اختصارها قليلًا.',
      phoneInvalid: 'يرجى التحقق من رقم هاتفك.',
      phoneRequiredForWhatsapp: 'للرد عبر واتساب نحتاج إلى رقم هاتفك.',
    },
  },

  a11y: {
    skipToContent: 'انتقل إلى المحتوى',
    openMenu: 'افتح القائمة',
    closeMenu: 'أغلق القائمة',
    menuLabel: 'القائمة الرئيسية',
    languageGroupLabel: 'اختر اللغة',
    breadcrumbLabel: 'مسار التنقل',
    whatsappFab: 'راسلنا على واتساب',
    currentPage: 'الصفحة الحالية',
    loading: 'جار التحميل …',
    externalLinkHint: 'يفتح في تبويب جديد',
  },
};
