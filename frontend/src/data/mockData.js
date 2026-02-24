// Static public-facing data only.
// Entity data (rumors, news, reports, team) lives in data/mock/*.js
// and is managed through AdminDataContext.

// ─── News ticker / summary ────────────────────────────────────────────────────
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
