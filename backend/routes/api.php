<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\MediaController;
use App\Http\Controllers\Api\V1\NewsController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\ReportController;
use App\Http\Controllers\Api\V1\RumorController;
use App\Http\Controllers\Api\V1\SettingController;
use App\Http\Controllers\Api\V1\TeamMemberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — v1
|--------------------------------------------------------------------------
|
| All routes are prefixed with /api/v1 (the /api prefix comes from
| bootstrap/app.php → withRouting → api).
|
| Public (read-only) routes sit outside the auth middleware.
| Write operations require a valid Sanctum token:
|   Authorization: Bearer {token}
|
*/

Route::prefix('v1')->name('v1.')->group(function () {

    // ── Authentication ────────────────────────────────────────────────────────
    Route::post('auth/login', [AuthController::class, 'login'])->name('auth.login');

    // ── Public read-only endpoints ────────────────────────────────────────────
    // The public site reads these without authentication.
    // Pages/posts only return "published" content to unauthenticated callers
    // (enforced in the controllers via the scopePublished scope).

    Route::get('rumors',            [RumorController::class,      'index'])->name('rumors.index');
    Route::get('rumors/{rumor}',    [RumorController::class,      'show'])->name('rumors.show');

    Route::get('news',              [NewsController::class,        'index'])->name('news.index');
    Route::get('news/{news}',       [NewsController::class,        'show'])->name('news.show');

    Route::get('reports',           [ReportController::class,      'index'])->name('reports.index');
    Route::get('reports/{report}',  [ReportController::class,      'show'])->name('reports.show');

    Route::get('team',                          [TeamMemberController::class, 'index'])->name('team.index');
    Route::get('team/{teamMember}',             [TeamMemberController::class, 'show'])->name('team.show');

    Route::get('pages',             [PageController::class,        'index'])->name('pages.index');
    Route::get('pages/{page}',      [PageController::class,        'show'])->name('pages.show');

    Route::get('posts',             [PostController::class,        'index'])->name('posts.index');
    Route::get('posts/{post}',      [PostController::class,        'show'])->name('posts.show');

    Route::get('media',             [MediaController::class,       'index'])->name('media.index');
    Route::get('media/{media}',     [MediaController::class,       'show'])->name('media.show');

    Route::get('settings',          [SettingController::class,     'index'])->name('settings.index');
    Route::get('settings/{setting}',[SettingController::class,     'show'])->name('settings.show');

    // ── Protected admin endpoints (require valid Sanctum token) ───────────────
    Route::middleware('auth:sanctum')->group(function () {

        // Auth
        Route::post('auth/logout', [AuthController::class, 'logout'])->name('auth.logout');
        Route::get('auth/me',      [AuthController::class, 'me'])->name('auth.me');

        // Dashboard
        Route::get('dashboard', [DashboardController::class, 'stats'])->name('dashboard.stats');

        // Rumors — write
        Route::post('rumors',           [RumorController::class, 'store'])->name('rumors.store');
        Route::put('rumors/{rumor}',    [RumorController::class, 'update'])->name('rumors.update');
        Route::delete('rumors/{rumor}', [RumorController::class, 'destroy'])->name('rumors.destroy');

        // News — write
        Route::post('news',         [NewsController::class, 'store'])->name('news.store');
        Route::put('news/{news}',   [NewsController::class, 'update'])->name('news.update');
        Route::delete('news/{news}',[NewsController::class, 'destroy'])->name('news.destroy');

        // Reports — write
        Route::post('reports',            [ReportController::class, 'store'])->name('reports.store');
        Route::put('reports/{report}',    [ReportController::class, 'update'])->name('reports.update');
        Route::delete('reports/{report}', [ReportController::class, 'destroy'])->name('reports.destroy');

        // Team — write
        Route::post('team',                   [TeamMemberController::class, 'store'])->name('team.store');
        Route::put('team/{teamMember}',       [TeamMemberController::class, 'update'])->name('team.update');
        Route::delete('team/{teamMember}',    [TeamMemberController::class, 'destroy'])->name('team.destroy');

        // Pages — write
        Route::post('pages',          [PageController::class, 'store'])->name('pages.store');
        Route::put('pages/{page}',    [PageController::class, 'update'])->name('pages.update');
        Route::delete('pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy');

        // Posts — write
        Route::post('posts',          [PostController::class, 'store'])->name('posts.store');
        Route::put('posts/{post}',    [PostController::class, 'update'])->name('posts.update');
        Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

        // Media — write (upload requires multipart/form-data)
        Route::post('media',            [MediaController::class, 'store'])->name('media.store');
        Route::delete('media/{media}',  [MediaController::class, 'destroy'])->name('media.destroy');

        // Settings — write
        Route::post('settings',             [SettingController::class, 'store'])->name('settings.store');
        Route::put('settings/{setting}',    [SettingController::class, 'update'])->name('settings.update');
        Route::delete('settings/{setting}', [SettingController::class, 'destroy'])->name('settings.destroy');
    });
});
