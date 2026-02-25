<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\Report;
use App\Models\Rumor;
use App\Models\Setting;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // ── Admin User ────────────────────────────────────────────────────────
        User::firstOrCreate(
            ['email' => 'admin@filter.org'],
            [
                'name'     => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        // ── Sample Rumors ─────────────────────────────────────────────────────
        $rumors = [
            [
                'title'        => 'شائعة انتشار فيروس جديد في المنطقة',
                'description'  => 'تداول مستخدمون على وسائل التواصل الاجتماعي ادعاءات بانتشار فيروس جديد في المنطقة.',
                'status'       => 'false',
                'category'     => 'health',
                'source'       => 'وزارة الصحة',
                'publish_date' => '2026-02-24',
            ],
            [
                'title'        => 'ادعاءات بشأن اختراق أمني في البنية التحتية',
                'description'  => 'انتشرت ادعاءات حول اختراق أمني مزعوم طال البنية التحتية الرقمية.',
                'status'       => 'unverified',
                'category'     => 'security',
                'source'       => null,
                'publish_date' => '2026-02-20',
            ],
            [
                'title'        => 'شائعة عن تغيير سعر الصرف',
                'description'  => 'تداولت شائعات عن اجتماع طارئ للبنك المركزي لتغيير سياسة سعر الصرف.',
                'status'       => 'confirmed',
                'category'     => 'economy',
                'source'       => 'البنك المركزي',
                'publish_date' => '2026-02-15',
            ],
        ];

        foreach ($rumors as $rumor) {
            Rumor::firstOrCreate(['title' => $rumor['title']], $rumor);
        }

        // ── Sample News ───────────────────────────────────────────────────────
        $newsItems = [
            [
                'title'        => 'إطلاق منصة جديدة للتحقق من المعلومات',
                'description'  => 'أعلنت منظمة فلتر عن إطلاق منصتها الجديدة للتحقق من صحة المعلومات المتداولة.',
                'category'     => 'tech',
                'location'     => 'الرياض',
                'is_featured'  => true,
                'tags'         => ['عاجل', 'رسمي'],
                'publish_date' => '2026-02-24',
            ],
            [
                'title'        => 'ورشة عمل حول الأمن الرقمي',
                'description'  => 'تستضيف المنظمة ورشة عمل متخصصة في الأمن الرقمي للصحفيين.',
                'category'     => 'training',
                'location'     => 'جدة',
                'is_featured'  => false,
                'tags'         => ['تدريب'],
                'publish_date' => '2026-02-18',
            ],
        ];

        foreach ($newsItems as $item) {
            News::firstOrCreate(['title' => $item['title']], $item);
        }

        // ── Sample Reports ────────────────────────────────────────────────────
        $reports = [
            [
                'title'           => 'التقرير الدوري للمعلومات المضللة — فبراير 2026',
                'description'     => 'يرصد هذا التقرير أبرز حالات المعلومات المضللة التي وثقتها المنظمة خلال شهر فبراير 2026.',
                'category'        => 'periodic',
                'file_pages'      => 24,
                'file_size_bytes' => 2516582,
                'is_featured'     => true,
                'publish_date'    => '2026-02-01',
            ],
            [
                'title'           => 'تقرير المعلومات الصحية المضللة 2025',
                'description'     => 'تحليل شامل للمعلومات الصحية المضللة التي انتشرت خلال عام 2025.',
                'category'        => 'health',
                'file_pages'      => 48,
                'file_size_bytes' => 5242880,
                'is_featured'     => false,
                'publish_date'    => '2026-01-15',
            ],
        ];

        foreach ($reports as $report) {
            Report::firstOrCreate(['title' => $report['title']], $report);
        }

        // ── Sample Team Members ───────────────────────────────────────────────
        $team = [
            [
                'name'        => 'د. سارة الأحمدي',
                'role'        => 'رئيسة فريق التحقق',
                'email'       => 'sara@filter.org',
                'description' => 'خبيرة في التحقق من الحقائق والأمن الرقمي.',
                'skills'      => ['التحقق من الحقائق', 'تحليل البيانات', 'الأمن الرقمي'],
                'initials'    => 'سأ',
                'sort_order'  => 1,
            ],
            [
                'name'        => 'م. خالد العمري',
                'role'        => 'محلل البيانات',
                'email'       => 'khalid@filter.org',
                'description' => 'متخصص في تحليل البيانات الضخمة ورصد الأنماط.',
                'skills'      => ['Python', 'تحليل البيانات', 'التعلم الآلي'],
                'initials'    => 'خع',
                'sort_order'  => 2,
            ],
            [
                'name'        => 'أ. نورة القحطاني',
                'role'        => 'محررة المحتوى',
                'email'       => 'noura@filter.org',
                'description' => 'محررة متخصصة في الصحافة الرقمية وتدقيق المحتوى.',
                'skills'      => ['الصحافة الرقمية', 'تحرير المحتوى', 'SEO'],
                'initials'    => 'نق',
                'sort_order'  => 3,
            ],
        ];

        foreach ($team as $member) {
            TeamMember::firstOrCreate(['email' => $member['email']], $member);
        }

        // ── Default Settings ──────────────────────────────────────────────────
        $settings = [
            [
                'section'  => 'site',
                'key'      => 'siteIdentity',
                'title_en' => 'Site Identity',
                'title_ar' => 'هوية الموقع',
                'value_en' => 'Filter Organization',
                'value_ar' => 'منظمة فلتر',
                'status'   => 'active',
            ],
            [
                'section'  => 'announcement',
                'key'      => 'announcementText',
                'title_en' => 'Announcement Banner',
                'title_ar' => 'نص الإعلان',
                'value_en' => 'Welcome to Filter Organization — your trusted source for fact-checking.',
                'value_ar' => 'مرحباً بك في منظمة فلتر — مصدرك الموثوق للتحقق من الحقائق.',
                'status'   => 'active',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
