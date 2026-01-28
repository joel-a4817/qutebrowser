// ==UserScript==
// @name         qute: YouTube + Instagram CSS (scoped)
// @description  Injects declutter CSS only on youtube.com / instagram.com (safe timing)
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @match        *://*.instagram.com/*
// @match        *://instagram.com/*
// @run-at       document-start
// @noframes
// ==/UserScript==

(() => {
  'use strict';

  // ---- PUT YOUR CSS HERE ----
  // Split it so IG rules never touch YT and vice-versa.
  const YT_CSS = `
/*********************************
 * YouTube declutter
 *********************************/

/* (A) Hide right sidebar recommendations on watch pages */
ytd-watch-flexy #secondary,
ytd-watch-flexy ytd-watch-next-secondary-results-renderer {
  display: none !important;
}

/* Expand the main area a bit when sidebar is gone */
ytd-watch-flexy #primary {
  max-width: 100% !important;
}

/* (B) Hide Shorts button in the left guide + mini guide */
ytd-guide-entry-renderer:has(a[title="Shorts"]),
ytd-mini-guide-entry-renderer:has(a[title="Shorts"]),
ytd-guide-entry-renderer:has(a[href^="/shorts"]),
ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]) {
  display: none !important;
}

/* Optional: also hide Shorts shelves/blocks that show up in feeds */
ytd-reel-shelf-renderer {
  display: none !important;
}

/* Hide end of video recommendeds */
.ytp-fullscreen-grid-stills-container {
  display: none !important;
}

/*********************************
 * YouTube: Hide Explore section (and everything under it)
 * Matches your actual Explore links from your dump.
 *********************************/

/* Hide the entire Explore BLOCK by detecting it via any of its child links */
ytd-guide-section-renderer:has(a[href="/gaming"]),
ytd-guide-section-renderer:has(a[href="/podcasts"]),
ytd-guide-section-renderer:has(a[href="/playables"]),
ytd-guide-section-renderer:has(a[href^="/feed/storefront"]),
ytd-guide-section-renderer:has(a[href^="/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"]),
ytd-guide-section-renderer:has(a[href^="/channel/UCYfdidRxbB8Qhf0Nx7ioOYw"]),
ytd-guide-section-renderer:has(a[href^="/channel/UCEgdi0XIXXZ-qJOFPf4JSKw"]),
ytd-guide-section-renderer:has(a[href^="/channel/UCtFRv9O2AHqOZjjynzrv-xg"]),
ytd-guide-section-renderer:has(a[href^="/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ"]) {
  display: none !important;
}

/* Fallback: hide the entries themselves (expanded sidebar) */
ytd-guide-entry-renderer:has(a[href="/gaming"]),
ytd-guide-entry-renderer:has(a[href="/podcasts"]),
ytd-guide-entry-renderer:has(a[href="/playables"]),
ytd-guide-entry-renderer:has(a[href^="/feed/storefront"]),
ytd-guide-entry-renderer:has(a[href^="/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"]),
ytd-guide-entry-renderer:has(a[href^="/channel/UCYfdidRxbB8Qhf0Nx7ioOYw"]),
ytd-guide-entry-renderer:has(a[href^="/channel/UCEgdi0XIXXZ-qJOFPf4JSKw"]),
ytd-guide-entry-renderer:has(a[href^="/channel/UCtFRv9O2AHqOZjjynzrv-xg"]),
ytd-guide-entry-renderer:has(a[href^="/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ"]) {
  display: none !important;
}

/* Mini guide fallback too */
ytd-mini-guide-entry-renderer:has(a[href="/gaming"]),
ytd-mini-guide-entry-renderer:has(a[href="/podcasts"]),
ytd-mini-guide-entry-renderer:has(a[href="/playables"]),
ytd-mini-guide-entry-renderer:has(a[href^="/feed/storefront"]),
ytd-mini-guide-entry-renderer:has(a[href^="/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"]),
ytd-mini-guide-entry-renderer:has(a[href^="/channel/UCYfdidRxbB8Qhf0Nx7ioOYw"]),
ytd-mini-guide-entry-renderer:has(a[href^="/channel/UCEgdi0XIXXZ-qJOFPf4JSKw"]),
ytd-mini-guide-entry-renderer:has(a[href^="/channel/UCtFRv9O2AHqOZjjynzrv-xg"]),
ytd-mini-guide-entry-renderer:has(a[href^="/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ"]) {
  display: none !important;
}


/*********************************
 * YouTube: HIDE HOME PAGE FEED ENTIRELY
 *********************************/

/* Kill the grid feed on the homepage */
ytd-browse[page-subtype="home"] ytd-rich-grid-renderer {
  display: none !important;
}

/* Extra safety: hide the page's main browse results container on Home */
ytd-browse[page-subtype="home"] ytd-two-column-browse-results-renderer {
  display: none !important;
}

/* If YouTube switches to different wrappers, hide the contents container on Home too */
ytd-browse[page-subtype="home"] #contents {
  display: none !important;
}
`;

  const IG_CSS = `
/*********************************
 * Instagram declutter (CSS-only)
 * Keep Stories visible.
 *********************************/

/* Hide Reels + Explore sidebar links (exact match) */
a[href="/reels/"],
a[href="/reels"],
a[href="/explore/"],
a[href="/explore"] {
  display: none !important;
}

/* Also hide Explore if IG adds tracking params */
a[href^="/explore/?"] {
  display: none !important;
}

/* Remove the row container too (prevents blank spacing) */
:where(nav, aside, header, [role="navigation"]) :is(div, li, span):has(> a[href="/reels/"]),
:where(nav, aside, header, [role="navigation"]) :is(div, li, span):has(> a[href="/reels"]),
:where(nav, aside, header, [role="navigation"]) :is(div, li, span):has(> a[href="/explore/"]),
:where(nav, aside, header, [role="navigation"]) :is(div, li, span):has(> a[href="/explore"]),
:where(nav, aside, header, [role="navigation"]) :is(div, li, span):has(> a[href^="/explore/?"]) {
  display: none !important;
}

/* Keep your existing “feed is gone” behavior */
main[role="main"] article {
  display: none !important;
}
main[role="main"] [role="feed"] {
  display: none !important;
}
main[role="main"] [role="status"],
main[role="main"] [role="alert"] {
  display: none !important;
}


/*********************************
 * Instagram: ONLY hide the loading spinner (SAFE)
 *********************************/

/* The actual spinning loader is usually a progressbar */
main[role="main"] [role="progressbar"] {
  display: none !important;
}

/* Some spinners show as a tiny SVG with aria-label "Loading" */
main[role="main"] svg[aria-label="Loading"],
main[role="main"] svg[aria-label="loading"] {
  display: none !important;
}


/*********************************
 * Instagram: ONLY hide the footer / bottom links (SAFE)
 *********************************/

/* Hide footer containers only (no parent :has chains) */
footer,
[role="contentinfo"] {
  display: none !important;
}

/* Hide the exact element with this full class set */
.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1 {
  display: none !important;
}
`;

  function pickCss() {
    const host = location.hostname;
    if (host === 'youtube.com' || host.endsWith('.youtube.com')) return YT_CSS;
    if (host === 'instagram.com' || host.endsWith('.instagram.com')) return IG_CSS;
    return '';
  }

  const css = pickCss();
  if (!css || !css.trim()) return;

  const style = document.createElement('style');
  style.setAttribute('data-qute-site-css', 'yt-ig');
  style.textContent = css;

  // Robust injection: don't touch document directly, and don't assume head/html exists yet.
  const tryInject = () => {
    const target = document.head || document.documentElement;
    if (!target) return false;
    target.appendChild(style);
    return true;
  };

  if (tryInject()) return;

  // If DOM isn't ready yet (common at document-start), wait until head/html appears.
  const obs = new MutationObserver(() => {
    if (tryInject()) obs.disconnect();
  });

  // Observe the documentElement once it exists, otherwise observe document for it.
  // (Observing `document` is fine; appending to `document` is what causes chaos.)
  obs.observe(document, { childList: true, subtree: true });
})();
