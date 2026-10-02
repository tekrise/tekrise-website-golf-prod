/* ============================================================
   SITE CONFIG — TEKRISE Golf (golf.tekrise.app).

   The golf twin of the tennis site's site-config.js. The two sites are
   separate folders on purpose (multi-sport Phase 3, decision D-3): the
   tennis site still lives in the sibling repo tekrise-web and moves to
   websites/tennis/ later.

   Every page reads from here, so the domain and the contact inbox are
   set in ONE place.
   ============================================================ */
(function () {
  var SITE_DOMAIN   = 'golf.tekrise.app';   // no protocol, no trailing slash
  var CONTACT_EMAIL = 'hello@tekrise.app';  // one shared inbox for both sports
  // Direct APK download (sideload path for regions without Google Play, e.g.
  // mainland China). Hosted on a public Cloudflare R2 bucket, NOT GitHub — the
  // repo name must never end up in a public-facing URL. The only place this
  // should ever be written; get.html reads it from here.
  var APK_URL = 'https://dl.tekrise.app/tekrise-golf.apk';
  // Donations (Ko-fi) — same shared page as tennis, not a golf-specific one.
  var KOFI_URL = 'https://ko-fi.com/tekrise';

  // ---------------------------------------------------------------
  // GOLF Supabase project. Both values are PUBLIC by design (the anon key is
  // the same one that ships in the mobile app; data is protected by RLS, not
  // by hiding this key). Used ONLY by reset-password.html.
  //
  // TODO(phase 3): fill these in from the golf Supabase project
  //   (Dashboard -> Project Settings -> API), ledger values V2 and V3 in
  //   docs/claude/multi-sport-phase3-plan.md. They MUST be the GOLF project,
  //   never the tennis one -- a golf user's reset link is only valid against
  //   the project that issued it.
  //
  // Until they are filled, reset-password.html refuses to run and says so,
  // rather than failing with an opaque network error.
  // ---------------------------------------------------------------
  // Use the PUBLISHABLE key (sb_publishable_...), not the legacy `anon` JWT:
  // Supabase deletes the legacy keys in late 2026. Either works today.
  var SUPABASE_URL = 'https://vajjkbsddfmhullklrns.supabase.co';
  var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SQgnx4PCb2-rIO7RtvNj1Q_LfUE_48o';

  var configured = SUPABASE_URL.indexOf('YOUR_GOLF_PROJECT_REF') === -1 &&
                   SUPABASE_PUBLISHABLE_KEY.indexOf('YOUR_GOLF_PUBLISHABLE_KEY') === -1;
  if (!configured && window.console && console.warn) {
    console.warn('[tekrise-golf] site-config.js still holds placeholder Supabase ' +
                 'values — password reset will not work until they are filled in.');
  }

  window.TEKRISE_SITE = {
    domain: SITE_DOMAIN,
    email: CONTACT_EMAIL,
    apkUrl: APK_URL,
    kofiUrl: KOFI_URL,
    supabaseUrl: SUPABASE_URL,
    // Kept under this name: it is what createClient()'s second argument is
    // called, and reset-password.html already reads it.
    supabaseAnonKey: SUPABASE_PUBLISHABLE_KEY,
    configured: configured,
  };

  function fill() {
    // <span data-site-domain></span>  →  golf.tekrise.app
    document.querySelectorAll('[data-site-domain]').forEach(function (el) {
      el.textContent = SITE_DOMAIN;
    });
    // <a data-site-email></a>  →  hello@tekrise.app (+ mailto: on links)
    document.querySelectorAll('[data-site-email]').forEach(function (el) {
      el.textContent = CONTACT_EMAIL;
      if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + CONTACT_EMAIL);
    });
    // <span data-site-year></span>  →  current year (footer copyright)
    document.querySelectorAll('[data-site-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fill);
  } else {
    fill();
  }
})();
