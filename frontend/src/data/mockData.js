// Category values use language-agnostic English keys.
// They are resolved to display labels via i18n: t(`categories.${category}`)
// Content fields (title, description, etc.) remain in Arabic —
// when connected to the backend, the API will return them in the active language.

// ─── Rumors ──────────────────────────────────────────────────────────────────
export const rumors = [
  {
    id: 1,
    title: 'شائعة حول تأثير مياه الشرب على الصحة العامة',
    description:
      'تداولت مواقع التواصل الاجتماعي معلومات مضللة حول تأثير مياه الشرب في المناطق الشمالية على صحة السكان، وقد تبيّن عدم صحتها بعد التحقق من قِبَل الجهات الصحية المختصة. وأكدت وزارة الصحة أن جميع محطات معالجة المياه تعمل وفق المعايير الدولية المعتمدة، وأن نتائج الفحوصات المخبرية لا تشير إلى أي تلوث أو خلل.',
    status: 'false',
    category: 'health',
    date: 'منذ ساعتين',
    verifiedAt: '22 فبراير 2026، 04:30 م',
    image: 'https://placehold.co/800x450/00334a/ffffff?text=شائعة+1',
    source: 'وزارة الصحة',
  },
  {
    id: 2,
    title: 'ادعاءات بشأن انقطاع خدمات الاتصالات في المنطقة الشرقية',
    description:
      'انتشرت ادعاءات حول انقطاع كامل لخدمات الاتصالات في المنطقة الشرقية، إلا أن الجهات المختصة أكدت أن الخدمة تعمل بصورة طبيعية مع صيانة مجدولة محدودة في بعض المناطق. وأوضح المتحدث باسم هيئة الاتصالات أن حجم التغطية لم يتأثر بشكل ملحوظ وأن الشائعة لا أساس لها من الصحة.',
    status: 'unverified',
    category: 'security',
    date: 'منذ 5 ساعات',
    verifiedAt: 'قيد التحقق',
    image: 'https://placehold.co/800x450/2d4a5c/ffffff?text=شائعة+2',
    source: 'جاري التحقق',
  },
  {
    id: 3,
    title: 'تقارير عن ارتفاع غير مبرر في أسعار المواد الغذائية',
    description:
      'تناقلت وسائل التواصل تقارير عن ارتفاع حاد في أسعار المواد الغذائية الأساسية، وقد أكدت وزارة التجارة صحة بعض هذه التقارير وأرجعتها إلى ضغوط سلسلة الإمداد العالمية مع اتخاذ الإجراءات اللازمة للسيطرة على الأسعار. وأشارت الوزارة إلى أنها رفعت حالة المراقبة في أسواق التجزئة الرئيسية.',
    status: 'confirmed',
    category: 'economy',
    date: 'منذ يوم',
    verifiedAt: '21 فبراير 2026، 10:00 ص',
    image: 'https://placehold.co/800x450/1a3a2a/ffffff?text=شائعة+3',
    source: 'وزارة التجارة',
  },
  {
    id: 4,
    title: 'شائعة حول إغلاق بعض المدارس بسبب تلوث بيئي',
    description:
      'تداول مستخدمون ادعاءات بإغلاق عدد من المدارس في العاصمة بسبب مستويات تلوث بيئية خطيرة، وقد نفت وزارة التعليم هذه الادعاءات جملةً وتفصيلاً مؤكدةً أن جميع المدارس تعمل بشكل طبيعي وفق الجدول الدراسي المعتمد. كما أكدت الوزارة أن المدارس تخضع لعمليات تفتيش دورية منتظمة.',
    status: 'false',
    category: 'education',
    date: 'منذ يومين',
    verifiedAt: '20 فبراير 2026، 02:15 م',
    image: 'https://placehold.co/800x450/3a1a1a/ffffff?text=شائعة+4',
    source: 'وزارة التعليم',
  },
]

// ─── News ─────────────────────────────────────────────────────────────────────
export const news = [
  {
    id: 1,
    title: 'إطلاق حملة وطنية للتوعية بمكافحة الشائعات والمعلومات المضللة',
    description:
      'أطلقت الجهات المختصة حملة وطنية شاملة تهدف إلى رفع الوعي بأهمية التحقق من المعلومات قبل تداولها. وتضمنت الحملة ورش عمل ميدانية وندوات عبر الإنترنت، وشارك فيها أكثر من خمسين خبيراً من مختلف القطاعات. كما أُطلقت حزمة من الأدوات الرقمية المجانية للمواطنين للتحقق من الأخبار بشكل مستقل.',
    category: 'security',
    categoryColor: 'bg-[#00334a]/10 text-[#00334a]',
    date: '24 فبراير 2026',
    location: 'الرياض',
    image: 'https://placehold.co/900x500/00334a/ffffff?text=خبر+رئيسي',
    isFeatured: true,
    tags: ['عاجل', 'مباشر', 'رسمي'],
  },
  {
    id: 2,
    title: 'المنصة الرسمية تُطلق نظام تنبيهات فورية للشائعات',
    description:
      'أعلنت منصة فلتر عن إطلاق نظام تنبيهات فوري يمكّن المواطنين من استقبال تحديثات لحظية حول آخر الشائعات المتداولة وحالة التحقق منها عبر تطبيق الهاتف الذكي والبريد الإلكتروني. يعتمد النظام على خوارزميات الذكاء الاصطناعي لرصد الشائعات وتصنيفها قبل إشعار المستخدمين.',
    category: 'tech',
    categoryColor: 'bg-accent/10 text-accent',
    date: '23 فبراير 2026',
    location: 'الرياض',
    image: 'https://placehold.co/800x450/2d4a5c/ffffff?text=خبر+2',
    isFeatured: false,
  },
  {
    id: 3,
    title: 'اتفاقية تعاون مع المراكز الإعلامية لمكافحة التضليل',
    description:
      'وقّعت منصة فلتر اتفاقية تعاون استراتيجية مع عدد من المراكز الإعلامية المحلية البارزة لتعزيز جهود مكافحة المعلومات المضللة وتوحيد معايير التحقق على المستوى الوطني. تشمل الاتفاقية تبادل الخبرات وتوفير التدريب المتخصص لفرق التحرير.',
    category: 'media',
    categoryColor: 'bg-[#f9a825]/10 text-[#f9a825]',
    date: '22 فبراير 2026',
    location: 'جدة',
    image: 'https://placehold.co/800x450/1a3a2a/ffffff?text=خبر+3',
    isFeatured: false,
  },
  {
    id: 4,
    title: 'ورشة عمل تدريبية حول أدوات التحقق الرقمي',
    description:
      'نظّمت المنصة ورشة عمل تدريبية متخصصة تناولت أحدث أدوات التحقق الرقمي وأساليب كشف التزوير في الصور والمقاطع المرئية. حضر الورشة أكثر من مئة متخصص من قطاعات الإعلام والأمن والتعليم، وخرجت بتوصيات عملية لتعزيز منظومة التحقق الوطنية.',
    category: 'training',
    categoryColor: 'bg-[#2e7d32]/10 text-[#2e7d32]',
    date: '20 فبراير 2026',
    location: 'الدمام',
    image: 'https://placehold.co/800x450/003344/ffffff?text=خبر+4',
    isFeatured: false,
  },
]

export const newsTicker = [
  { id: 1, text: 'تحديث: التحقق من 3 شائعات جديدة تخص قطاع الصحة', status: 'false' },
  { id: 2, text: 'عاجل: إصدار بيان رسمي حول الوضع الأمني في المنطقة الغربية', status: 'confirmed' },
  { id: 3, text: 'جاري التحقق: ادعاءات حول تغييرات في منظومة التعليم', status: 'unverified' },
  { id: 4, text: 'مؤكد: الجهات المختصة تنفي شائعات ارتفاع أسعار الوقود', status: 'false' },
  { id: 5, text: 'تحديث: 132 قضية تحت المراجعة هذا الأسبوع', status: 'confirmed' },
]

// sectorKey maps to news.sectors.* translation keys
export const newsSummary = [
  { id: 1, sectorKey: 'economy',  count: 14, icon: 'TrendingUp', color: 'text-[#f9a825]' },
  { id: 2, sectorKey: 'health',   count: 8,  icon: 'Heart',      color: 'text-[#c62828]' },
  { id: 3, sectorKey: 'security', count: 11, icon: 'Shield',     color: 'text-[#00334a]' },
  { id: 4, sectorKey: 'culture',  count: 5,  icon: 'BookOpen',   color: 'text-[#2e7d32]' },
]

// ─── Reports ──────────────────────────────────────────────────────────────────
export const reports = [
  {
    id: 1,
    title: 'التقرير الربعي للشائعات — الربع الأول 2026',
    description:
      'تقرير شامل يرصد ويحلل الشائعات والمعلومات المضللة الأكثر تداولاً خلال الربع الأول من عام 2026. يتضمن التقرير إحصاءات تفصيلية حسب القطاع والمنطقة الجغرافية، وتحليلاً لأسباب الانتشار، وتوصيات عملية للحد من تداول المعلومات المضللة. صدر التقرير بمشاركة 12 جهة حكومية ومؤسسة إعلامية.',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    pages: 48,
    date: '01 فبراير 2026',
    image: 'https://placehold.co/900x500/00334a/ffffff?text=التقرير+الربعي',
    isFeatured: true,
    category: 'periodic',
  },
  {
    id: 2,
    title: 'تقرير الشائعات الصحية 2025',
    description:
      'رصد وتحليل الشائعات الصحية الأكثر انتشاراً وتأثيراً على المجتمع خلال عام 2025. يكشف التقرير عن الأنماط الشائعة في الشائعات الصحية ويقدم توصيات للجهات المختصة لمواجهتها.',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    pages: 32,
    date: '15 يناير 2026',
    image: 'https://placehold.co/800x450/2d4a5c/ffffff?text=تقرير+صحي',
    isFeatured: false,
    category: 'health',
  },
  {
    id: 3,
    title: 'تقرير التحقق من وسائل التواصل الاجتماعي',
    description:
      'دراسة معمّقة حول آليات انتشار الشائعات عبر منصات التواصل الاجتماعي وأثرها على الرأي العام. يشمل التقرير تحليل بيانات أكثر من ألف منشور مشكوك فيه وتتبع مسارات انتشارها.',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    pages: 56,
    date: '10 يناير 2026',
    image: 'https://placehold.co/800x450/1a3a2a/ffffff?text=تقرير+تواصل',
    isFeatured: false,
    category: 'tech',
  },
  {
    id: 4,
    title: 'التقرير السنوي الشامل 2025',
    description:
      'نظرة سنوية شاملة على جميع الشائعات والمعلومات التي تم التحقق منها خلال عام 2025. يوثّق التقرير 248 قضية موزعة على ثمانية قطاعات، مع مقارنة بالأعوام السابقة وتوقعات للعام القادم.',
    fileType: 'PDF',
    fileSize: '5.6 MB',
    pages: 96,
    date: '01 يناير 2026',
    image: 'https://placehold.co/800x450/003344/ffffff?text=التقرير+السنوي',
    isFeatured: false,
    category: 'periodic',
  },
]

// ─── Archive ──────────────────────────────────────────────────────────────────
export const archiveStats = {
  total:     { count: 132, weeklyChange: 5, percentage: 70 },
  confirmed: { count: 58,  percentage: 44 },
  false:     { count: 42,  percentage: 32 },
}

export const archiveHistory = [
  { id: 1, date: '22 فبراير 2026', status: 'false',      category: 'health'   },
  { id: 2, date: '21 فبراير 2026', status: 'confirmed',  category: 'security' },
  { id: 3, date: '20 فبراير 2026', status: 'unverified', category: 'economy'  },
  { id: 4, date: '19 فبراير 2026', status: 'false',      category: 'education'},
  { id: 5, date: '18 فبراير 2026', status: 'confirmed',  category: 'health'   },
  { id: 6, date: '17 فبراير 2026', status: 'false',      category: 'security' },
]

export const archiveTimeline = [
  { id: 1, title: 'شائعة صحية جديدة',    date: '22 فبراير 2026', status: 'false'      },
  { id: 2, title: 'تقرير أمني رسمي',     date: '21 فبراير 2026', status: 'confirmed'  },
  { id: 3, title: 'ادعاءات اقتصادية',    date: '20 فبراير 2026', status: 'unverified' },
  { id: 4, title: 'بيان وزارة التعليم', date: '19 فبراير 2026', status: 'confirmed'  },
]

export const archiveYears = [
  { year: 2026, total: 132, confirmed: 58, false: 42, unverified: 32 },
  { year: 2025, total: 248, confirmed: 110, false: 95, unverified: 43 },
  { year: 2024, total: 196, confirmed: 78,  false: 82, unverified: 36 },
]

// ─── Team ─────────────────────────────────────────────────────────────────────
export const teamMembers = [
  {
    id: 1,
    name: 'د. سارة الأحمدي',
    role: 'رئيسة فريق التحقق',
    email: 'sarah.ahmadi@filter.sa',
    description: 'خبيرة في التحقق من المعلومات ومكافحة الشائعات بخبرة تتجاوز 12 عاماً في المجال الإعلامي والأمني.',
    skills: ['التحقق من الحقائق', 'تحليل البيانات', 'الأمن الرقمي'],
    image: 'https://placehold.co/200x200/00334a/ffffff?text=سأ',
    initials: 'سأ',
  },
  {
    id: 2,
    name: 'م. خالد المطيري',
    role: 'مدير التقنية والبنية التحتية',
    email: 'khalid.mutairi@filter.sa',
    description: 'متخصص في تطوير أنظمة التحقق الآلي وتقنيات الذكاء الاصطناعي لرصد المعلومات المضللة وتحليلها.',
    skills: ['الذكاء الاصطناعي', 'تطوير الأنظمة', 'تحليل البيانات'],
    image: 'https://placehold.co/200x200/2d4a5c/ffffff?text=خم',
    initials: 'خم',
  },
  {
    id: 3,
    name: 'أ. نورة الشمري',
    role: 'محللة المحتوى الإعلامي',
    email: 'noura.shamri@filter.sa',
    description: 'متخصصة في تحليل المحتوى الرقمي ورصد الشائعات عبر منصات التواصل الاجتماعي وإعداد التقارير التحليلية.',
    skills: ['تحليل المحتوى', 'إدارة وسائل التواصل', 'التقارير'],
    image: 'https://placehold.co/200x200/1a3a2a/ffffff?text=نش',
    initials: 'نش',
  },
]

// ─── More / Help ──────────────────────────────────────────────────────────────
export const howToSteps = [
  {
    id: 1,
    step: '01',
    title: 'ابحث عن المعلومة',
    description: 'أدخل الموضوع أو النص الذي تريد التحقق منه في خانة البحث أو استخدم أداة الفلترة المتقدمة.',
    image: 'https://placehold.co/400x240/00334a/ffffff?text=خطوة+1',
  },
  {
    id: 2,
    step: '02',
    title: 'راجع نتائج التحقق',
    description: 'اطّلع على حالة التحقق من المعلومة وتفاصيل المصادر الرسمية التي استُند إليها في التقييم.',
    image: 'https://placehold.co/400x240/2d4a5c/ffffff?text=خطوة+2',
  },
  {
    id: 3,
    step: '03',
    title: 'شارك النتيجة',
    description: 'ساهم في نشر المعلومة الصحيحة من خلال مشاركة نتيجة التحقق مع أصدقائك وعائلتك.',
    image: 'https://placehold.co/400x240/1a3a2a/ffffff?text=خطوة+3',
  },
]

export const policies = [
  {
    id: 1,
    title: 'سياسة الخصوصية',
    description: 'نلتزم بحماية بيانات المستخدمين وفق أعلى معايير الخصوصية وأحكام الأنظمة المعمول بها.',
    icon: 'Shield',
  },
  {
    id: 2,
    title: 'سياسة الشفافية',
    description: 'نُفصح عن منهجية التحقق ومصادرنا بشكل كامل لضمان ثقة الجمهور بنتائج التحقق.',
    icon: 'Eye',
  },
  {
    id: 3,
    title: 'دعم المجتمع',
    description: 'ندعم المجتمع بتقديم أدوات التحقق مجاناً وتوفير التدريب والتوعية لجميع الفئات.',
    icon: 'Users',
  },
]

// ─── Homepage Quick Links ─────────────────────────────────────────────────────
export const quickLinks = [
  {
    id: 1,
    title: 'عن المنصة',
    description: 'تعرّف على مهمة فلتر ودورها في مكافحة الشائعات والمعلومات المضللة.',
    icon: 'Info',
    href: '/more',
  },
  {
    id: 2,
    title: 'سياسة الخصوصية',
    description: 'اطّلع على كيفية تعاملنا مع بياناتك وحمايتها وفق أعلى المعايير.',
    icon: 'Lock',
    href: '/more',
  },
  {
    id: 3,
    title: 'تواصل معنا',
    description: 'للاستفسارات والبلاغات والتعاون، تواصل مع فريقنا المتخصص مباشرةً.',
    icon: 'Mail',
    href: '/more',
  },
]
