(() => {
  "use strict";
  const BASE = window.SITE, I = window.I18N;
  const L = { tiktok: "https://www.tiktok.com/@kenzyakato", tiktokHandle: "@kenzyakato", ...BASE.profile.links };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const thumb = id => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
  const pad = n => String(n).padStart(2, "0");
  const app = $("#app"), root = document.documentElement;

  /* ---------- language ---------- */
  const CODES = I.langs.map(l => l.code);
  let lang = I.defaultLang;
  try { const s = localStorage.getItem("kk-lang"); if (CODES.includes(s)) lang = s; } catch (e) {}
  let T, D, P;
  const merge = (list, tr) => list.map(x => ({ ...x, ...((tr || {})[x.id] || {}) }));
  function buildData() {
    T = I.ui[lang] || I.ui.ja;
    const c = (lang === "ja" ? null : I.content[lang]) || {};
    D = {
      ...BASE,
      profile: { ...BASE.profile, ...(c.profile || {}), links: L },
      tags: { ...BASE.tags, ...(c.tags || {}) },
      works: merge(BASE.works, c.works),
      recent: merge(BASE.recent, c.recent),
      tech: merge(BASE.tech, c.tech)
    };
    P = D.profile;
  }
  const KANA = /[\u3040-\u30ff]/;
  const jaAttr = s => (lang !== "ja" && KANA.test(s || "") ? ' lang="ja"' : "");
  const O = s => (jaAttr(s) ? `<span lang="ja">${esc(s)}</span>` : esc(s)); // 原文（日本語）の作品名などに lang="ja"
  const workById = id => D.works.find(w => w.id === id);
  const techById = id => D.tech.find(t => t.id === id);
  const recentById = id => D.recent.find(r => r.id === id);
  const docTitle = (...parts) => parts.join(T.sep);

  function applyStatic() {
    root.lang = lang;
    $$("[data-i18n]").forEach(el => { el.textContent = T[el.dataset.i18n]; });
    $$("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", T[el.dataset.i18nAria]));
    $("#ftrTiktok").setAttribute("aria-label", T.tiktokAria);
    $("#ftrRole").innerHTML = `${O(P.kana)} ／ ${esc(P.role)}`;
    $('meta[name="description"]').setAttribute("content", T.metaDesc);
    $$(".lang [data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    applyMotion();
  }
  $$(".lang [data-lang]").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    try { localStorage.setItem("kk-lang", lang); } catch (e) {}
    buildData(); applyStatic();
    route({ keep: true });
    b.focus();
  }));

  /* ---------- motion ---------- */
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  let motionPref = null;
  try { motionPref = localStorage.getItem("kk-motion"); } catch (e) {}
  const reduced = () => (motionPref ? motionPref === "reduce" : mq.matches);
  function applyMotion() {
    const r = reduced();
    root.dataset.motion = r ? "reduce" : "full";
    const b = $("#motionBtn");
    b.setAttribute("aria-pressed", String(r));
    b.title = T.motionTitle;
    b.setAttribute("aria-label", `MOTION: ${r ? T.motionReduced : T.motionFull} — ${T.motionTitle}`);
    $(".mb-v", b).textContent = r ? T.motionReduced : T.motionFull;
  }
  $("#motionBtn").addEventListener("click", () => {
    motionPref = reduced() ? "full" : "reduce";
    try { localStorage.setItem("kk-motion", motionPref); } catch (e) {}
    applyMotion();
  });
  mq.addEventListener?.("change", applyMotion);

  /* ---------- mobile menu ---------- */
  const menuBtn = $("#menuBtn"), gnav = $("#gnav");
  const setMenu = open => { menuBtn.setAttribute("aria-expanded", String(open)); gnav.classList.toggle("open", open); };
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  gnav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
  });
  $("#skipBtn").addEventListener("click", () => { const h = $("h1", app) || app; h.focus(); });

  /* ---------- partials ---------- */
  const tagName = t => D.tags[t] || t;
  const mediaURL = w => w.externalUrl || `https://www.youtube.com/watch?v=${w.yt}`;
  const thumbHTML = (w, hud = "") => w.externalUrl ? externalThumb(w) : `
    <div class="thumb" style="--img:url('${thumb(w.yt)}')">
      <div class="t t-base"></div><div class="t t-r"></div><div class="t t-w"></div><div class="t-scan"></div>${hud}
    </div>`;
  const videoHTML = w => w.externalUrl ? `<a class="ext-video" href="${esc(w.externalUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(T.externalVideo)}: ${esc(w.title)}">${externalThumb(w)}<span class="more">${esc(T.watchBilibili)}</span></a>` : `
    <button class="video" type="button" data-yt="${esc(w.yt)}" data-title="${esc(w.title)}" aria-label="${esc(T.videoAria(w.title))}">
      <img src="${thumb(w.yt)}" alt="" loading="lazy">
      <span class="play" aria-hidden="true"></span>
      <span class="vnote">${esc(T.videoNote)}</span>
    </button>`;
  const glH1 = (text, extra = "") => `<h1 class="h1" tabindex="-1"${jaAttr(text)}${extra}><span class="sr-only">${esc(text)}</span><span class="gl" data-text="${esc(text)}" aria-hidden="true">${esc(text)}</span></h1>`;
  /* 外部動画（Bilibili）のローカルカバー。読み込み失敗時は BILIBILI 字板＋説明。動画は埋め込まない */
  const externalThumb = w => `
    <div class="ext-thumb${w.cover ? "" : " is-missing"}">
      ${w.cover ? `<img class="ext-cover" src="${esc(w.cover)}" alt="" loading="lazy" decoding="async">` : ""}
      <div class="ext-fallback">${plate("BILIBILI")}<p class="ext-miss">${esc(T.coverMissing)}</p></div>
    </div>`;
  document.addEventListener("load", e => {
    const img = e.target; if (!(img instanceof HTMLImageElement) || !img.classList.contains("ext-cover")) return;
    img.closest(".ext-thumb")?.classList.add("is-loaded");
  }, true);
  document.addEventListener("error", e => {
    const img = e.target; if (!(img instanceof HTMLImageElement) || !img.classList.contains("ext-cover")) return;
    const box = img.closest(".ext-thumb"); if (!box) return;
    box.classList.remove("is-loaded"); box.classList.add("is-missing"); img.remove();
  }, true);

  const MOCAP_SETUP_IDS = new Set(["lady-crazy", "bubblin", "bubblin-teaser", "v", "kiss-kitsune", "namida"]);
  const plate = name => `<div class="rc-plate" aria-hidden="true"><span>${esc(name)}</span></div>`;
  /* Concept illustrations: illustrative only, not actual system screens. */
  const M = 'font-family="IBM Plex Mono,monospace"';
  const demoTag = `<rect x="262" y="10" width="48" height="16" fill="#e0201b"/><text x="286" y="22" ${M} font-size="9" font-weight="600" fill="#0b0b0c" text-anchor="middle">DEMO</text>`;
  const arrow = (x, y) => `<g class="ca-pulse"><line x1="${x}" y1="${y}" x2="${x + 22}" y2="${y}" stroke="#e0201b" stroke-width="2"/><path d="M${x + 22} ${y - 5}L${x + 30} ${y}L${x + 22} ${y + 5}Z" fill="#e0201b"/></g>`;
  const SVG = {
    "timeline-automation": `
      ${[60, 80, 100, 120, 140, 180, 200, 220, 240, 260, 280, 300].map(x => `<line x1="${x}" y1="36" x2="${x}" y2="150" stroke="#1f1f24"/>`).join("")}
      ${["A", "B", "C"].map((l, k) => `<text x="16" y="${62 + k * 36}" ${M} font-size="10" fill="#93939a">${l}</text>`).join("")}
      <rect x="44" y="46" width="26" height="18" fill="#3a3a41"/><rect x="78" y="52" width="40" height="18" fill="#3a3a41"/><rect x="122" y="44" width="18" height="18" fill="#3a3a41"/>
      <rect x="52" y="88" width="34" height="18" fill="#5a5a62"/><rect x="96" y="82" width="22" height="18" fill="#5a5a62"/><rect x="108" y="94" width="30" height="18" fill="#5a5a62" opacity=".7"/>
      <rect x="40" y="126" width="20" height="18" fill="#3a3a41"/><rect x="70" y="120" width="46" height="18" fill="#3a3a41"/><rect x="124" y="130" width="16" height="14" fill="#3a3a41"/>
      ${arrow(146, 95)}
      <g class="ca-shift"><rect x="184" y="50" width="36" height="18" fill="#e0201b"/><rect x="224" y="50" width="36" height="18" fill="#e0201b"/><rect x="264" y="50" width="36" height="18" fill="#e0201b"/></g>
      <rect x="184" y="86" width="56" height="18" fill="#ecebe8"/><rect x="244" y="86" width="56" height="18" fill="#ecebe8"/>
      <rect x="184" y="122" width="116" height="18" fill="#5a5a62"/>
      <text x="16" y="22" ${M} font-size="9" fill="#93939a">FICTIONAL TIMELINE</text>`,
    "focus-assist": `
      <defs><filter id="ca-blur-fa"><feGaussianBlur stdDeviation="3.2"/></filter></defs>
      <circle cx="70" cy="104" r="24" fill="#5a5a62" filter="url(#ca-blur-fa)"/>
      <path d="M248 132L272 84L296 132Z" fill="#3a3a41" filter="url(#ca-blur-fa)"/>
      <rect x="136" y="74" width="48" height="48" fill="#ecebe8"/>
      <g class="ca-pulse" stroke="#e0201b" stroke-width="2.5" fill="none">
        <path d="M120 70V58H132"/><path d="M188 58H200V70"/><path d="M200 126V138H188"/><path d="M132 138H120V126"/>
      </g>
      <line x1="160" y1="150" x2="160" y2="162" stroke="#e0201b"/><text x="160" y="172" ${M} font-size="9" fill="#93939a" text-anchor="middle">DEMO SUBJECT</text>
      <text x="16" y="22" ${M} font-size="9" fill="#93939a">FICTIONAL SHOT</text>`,
    "recording-data-organize": `
      <g fill="#1b1b20" stroke="#5a5a62">
        <rect x="30" y="60" width="46" height="32" transform="rotate(-10 53 76)"/>
        <rect x="64" y="86" width="46" height="32" transform="rotate(8 87 102)"/>
        <rect x="36" y="112" width="46" height="32" transform="rotate(-4 59 128)"/>
        <rect x="82" y="50" width="46" height="32" transform="rotate(14 105 66)"/>
      </g>
      ${arrow(140, 100)}
      ${[0, 1, 2].map(k => `<g transform="translate(${182 + k * 44} 40)"><text x="18" y="8" ${M} font-size="8" fill="#93939a" text-anchor="middle">G${k + 1}</text><line x1="0" y1="14" x2="36" y2="14" stroke="${k === 0 ? "#e0201b" : "#5a5a62"}" stroke-width="2"/>${[0, 1, 2].slice(0, 3 - (k === 2 ? 1 : 0)).map(n => `<rect x="0" y="${22 + n * 30}" width="36" height="24" fill="${k === 0 ? "#ecebe8" : "#3a3a41"}"/><rect x="5" y="${30 + n * 30}" width="18" height="3" fill="${k === 0 ? "#0b0b0c" : "#5a5a62"}"/>`).join("")}</g>`).join("")}
      <text x="16" y="22" ${M} font-size="9" fill="#93939a">FICTIONAL CARDS</text>`,
    "participatory-live-system": `
      ${[[24, 44, "#ecebe8"], [54, 84, "#5a5a62"], [20, 122, "#3a3a41"]].map(([x, y, c]) => `<g><rect x="${x}" y="${y}" width="78" height="26" fill="${c}"/><path d="M${x + 12} ${y + 26}L${x + 12} ${y + 34}L${x + 22} ${y + 26}Z" fill="${c}"/><text x="${x + 8}" y="${y + 17}" ${M} font-size="9" fill="${c === "#ecebe8" ? "#0b0b0c" : "#ecebe8"}">DEMO</text></g>`).join("")}
      ${arrow(120, 96)}
      <rect x="166" y="40" width="138" height="116" fill="none" stroke="#3a3a41"/>
      <rect x="176" y="132" width="52" height="8" fill="#5a5a62"/><rect x="240" y="112" width="54" height="8" fill="#5a5a62"/>
      <circle cx="200" cy="120" r="10" fill="#e0201b"/>
      <g class="ca-shift" fill="#ecebe8"><path d="M246 60L254 74L238 74Z"/><path d="M276 78L284 92L268 92Z"/><rect x="222" y="72" width="10" height="10"/></g>
      <text x="16" y="22" ${M} font-size="9" fill="#93939a">FICTIONAL COMMENTS / GAME</text>`,
    "live-support-client-ui": `
      <rect x="20" y="34" width="280" height="132" fill="#16161a" stroke="#3a3a41"/>
      <rect x="20" y="34" width="280" height="14" fill="#1f1f24"/><rect x="28" y="39" width="5" height="5" fill="#e0201b"/><rect x="37" y="39" width="5" height="5" fill="#5a5a62"/>
      <rect x="32" y="58" width="150" height="96" fill="#0b0b0c" stroke="#3a3a41"/>
      <rect x="92" y="88" width="30" height="30" fill="#ecebe8"/><line x1="107" y1="66" x2="107" y2="146" stroke="#e0201b" stroke-dasharray="3 3"/><line x1="40" y1="103" x2="174" y2="103" stroke="#e0201b" stroke-dasharray="3 3"/>
      ${[0, 1, 2].map(k => `<line x1="196" y1="${68 + k * 18}" x2="288" y2="${68 + k * 18}" stroke="#3a3a41" stroke-width="3"/><rect class="${k === 1 ? "ca-shift" : ""}" x="${214 + k * 22}" y="${63 + k * 18}" width="8" height="10" fill="${k === 1 ? "#e0201b" : "#ecebe8"}"/>`).join("")}
      <rect x="196" y="122" width="42" height="14" fill="#ecebe8"/><rect x="246" y="122" width="42" height="14" fill="none" stroke="#5a5a62"/><rect x="196" y="140" width="92" height="8" fill="#3a3a41"/>
      <text x="16" y="22" ${M} font-size="9" fill="#93939a">DEMO PANEL (FICTIONAL)</text>`,
    "live-support-materials": `
      ${[0, 1, 2].map(k => `<g transform="translate(24 ${40 + k * 40})"><rect width="56" height="32" fill="${k === 0 ? "#ecebe8" : "#3a3a41"}"/>${k === 0 ? `<circle cx="16" cy="16" r="8" fill="#e0201b"/>` : k === 1 ? `<path d="M10 24L18 8L26 24Z" fill="#ecebe8"/>` : `<rect x="9" y="9" width="14" height="14" fill="#5a5a62"/>`}<text x="32" y="20" ${M} font-size="7" fill="${k === 0 ? "#0b0b0c" : "#93939a"}">DEMO</text></g>`).join("")}
      ${arrow(96, 96)}
      <path d="M150 150L300 150L280 112L170 112Z" fill="#1b1b20" stroke="#3a3a41"/>
      <line x1="170" y1="112" x2="170" y2="40" stroke="#26262b"/><line x1="280" y1="112" x2="280" y2="40" stroke="#26262b"/><line x1="170" y1="40" x2="280" y2="40" stroke="#26262b"/>
      <path d="M222 40L196 124L252 124Z" fill="#ecebe8" opacity=".08"/>
      <g class="ca-shift"><circle cx="222" cy="116" r="9" fill="#e0201b"/></g><path d="M254 128L262 112L270 128Z" fill="#ecebe8"/><rect x="186" y="118" width="12" height="12" fill="#5a5a62"/>
      <text x="16" y="22" ${M} font-size="9" fill="#93939a">FICTIONAL STAGE</text>`
  };
  const conceptArt = id => SVG[id] ? `
    <figure class="ca">
      <div class="ca-art"><svg viewBox="0 0 320 180" aria-hidden="true" focusable="false"><rect width="320" height="180" fill="#111113"/>${SVG[id]}${demoTag}</svg></div>
      <figcaption class="ca-cap"><span lang="ja">イメージ図・実際のシステム画面ではありません</span><span lang="en">Concept illustration — not an actual system screen</span><span lang="zh-CN">概念示意图，并非实际系统界面</span></figcaption>
    </figure>` : "";
  const techCard = (t, i) => `
    <a class="tcard" href="#/tech/${t.id}">
      <span class="tc-top"><span>CASE ${pad(i + 1)}</span><span>${esc(t.kind)}</span></span>
      <span class="tc-name">${esc(t.name)}</span>
      <p>${esc(t.summary)}</p>
      <span class="tc-go">${esc(T.viewDetail)}</span>
    </a>`;
  const recentCard = (r, i) => `
    <a class="rc-card" href="#/recent/${r.id}">
      <span class="tc-top"><span>RECENT ${pad(i + 1)}</span><span>${esc(r.kind)}</span></span>
      ${r.yt ? thumbHTML(r) : `<div class="ca-thumb">${conceptArt(r.id)}</div>`}
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.text)}</p>
      <span class="tc-go">${esc(T.viewDetail)}</span>
    </a>`;
  const recentSection = () => `<div class="rc-grid">${D.recent.map(recentCard).join("")}</div>`;
  const workCard = (w, i) => `
    <a class="wcard" href="#/works/${w.id}" style="animation-delay:${Math.min(i, 8) * 40}ms">
      ${thumbHTML(w)}
      <span class="cr"><span>${O(w.credit || "WORK")}</span><span>${pad(D.works.indexOf(w) + 1)}</span></span>
      <h3>${O(w.title)}</h3>
      <p>${esc(w.roles.slice(0, 3).join(T.roleSep))}${w.roles.length > 3 ? esc(T.moreRoles(w.roles.length - 3)) : ""}</p>
    </a>`;
  const channelBlock = () => `
    <section class="chan" aria-labelledby="chan-h">
      <span class="chan-bg" aria-hidden="true">CHANNEL</span>
      <div class="chan-in">
        <div>
          <p class="kicker">PERSONAL CHANNEL</p>
          <h2 id="chan-h">${esc(T.chanH)}</h2>
          <p>${esc(T.chanP)}</p>
          <p class="hd">${esc(L.channelHandle)}</p>
        </div>
        <div>
          <a class="btn" href="${L.channel}" target="_blank" rel="noopener">${esc(T.openYT)} <span aria-hidden="true">↗</span></a>
          <div class="chan-sub"><a href="${L.x}" target="_blank" rel="noopener">X ↗</a><a href="${L.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="${esc(T.tiktokAria)}">TikTok ↗</a><a href="${L.booth}" target="_blank" rel="noopener">BOOTH ↗</a></div>
        </div>
      </div>
    </section>`;
  const avatarHTML = (label = "ID // KZK") => `
    <div class="ava">
      <span class="ava-tick t1" aria-hidden="true"></span><span class="ava-tick t2" aria-hidden="true"></span>
      <div class="ava-frame">
        <span class="ava-lbl" aria-hidden="true">${label}</span>
        <img src="${P.avatar}" alt="${esc(T.avatarAlt)}">
        <img class="sl sl1" src="${P.avatar}" alt="" aria-hidden="true">
        <img class="sl sl2" src="${P.avatar}" alt="" aria-hidden="true">
      </div>
    </div>`;
  const crumbs = (href, label, cur) => `<nav class="crumbs" aria-label="${esc(T.crumbsAria)}"><a href="#/">${esc(T.navHome)}</a><span aria-hidden="true">/</span><a href="${href}">${esc(label)}</a><span aria-hidden="true">/</span><span aria-current="page"${jaAttr(cur)}>${esc(cur)}</span></nav>`;
  const pn = (aria, base, prev, next, key = "title") => `
    <nav class="pn" aria-label="${esc(aria)}">
      <a href="#/${base}/${prev.id}" aria-label="${esc(T.prev)}: ${esc(prev[key])}"><small aria-hidden="true">← ${esc(T.prev)}</small><b${jaAttr(prev[key])}>${esc(prev[key])}</b></a>
      <a class="nx" href="#/${base}/${next.id}" aria-label="${esc(T.next)}: ${esc(next[key])}"><small aria-hidden="true">${esc(T.next)} →</small><b${jaAttr(next[key])}>${esc(next[key])}</b></a>
    </nav>`;

  /* ---------- views ---------- */
  let scIndex = 0;
  function viewHome() {
    const feat = D.featured.map(workById).filter(Boolean);
    const [l1, l2, stop] = T.taglineLines;
    return {
      title: `${P.handle}（${P.kana}）${T.sep}${P.role}`, nav: "home",
      html: `
      <section class="hero" aria-labelledby="hero-h">
        <div class="scan" aria-hidden="true"></div>
        <span class="hero-bgtxt" aria-hidden="true">KENZYAKATO</span>
        <div class="wrap hero-grid">
          <div>
            <p class="boot"><span class="dot" aria-hidden="true"></span><span id="bootTxt">UNITY × VTUBER TECHNICAL PRODUCTION</span><span class="caret" aria-hidden="true"></span></p>
            <h1 id="hero-h" tabindex="-1">
              <span class="sr-only">${esc(P.tagline)}</span>
              <span aria-hidden="true">
                <span class="ln gl" data-text="${esc(l1)}">${esc(l1)}</span>
                <span class="ln ln2 gl d2" data-text="${esc(l2 + stop)}">${esc(l2)}<span class="stop">${esc(stop)}</span></span>
              </span>
            </h1>
            <p class="hero-id"><b>KENZYAKATO</b><span>${O(P.kana)} ／ ${esc(P.role)}</span></p>
            <p class="hero-lead">${esc(P.lead)}</p>
            <p class="hero-lead" style="margin-top:12px">${esc(P.capability)}</p>
            <div class="hero-cta">
              <a class="btn" href="#/works">${esc(T.ctaWorks)} <span aria-hidden="true">→</span></a>
              <a class="btn ghost" href="#/tech">${esc(T.ctaTech)}</a>
            </div>
            <a class="hero-ch" href="${L.channel}" target="_blank" rel="noopener">
              <span class="yt" aria-hidden="true"></span>
              <span>${esc(T.channel)} <span aria-hidden="true">↗</span><small>${esc(L.channelHandle)}</small></span>
            </a>
          </div>
          <div>
            ${avatarHTML("ID // KZK-01")}
            <dl class="ava-meta">
              <dt>HANDLE</dt><dd>KenzyaKato</dd>
              <dt>FIELD</dt><dd>Unity / VTuber / 3DCG / VR</dd>
              <dt>LANG</dt><dd>${P.languages.map(esc).join(" / ")}</dd>
            </dl>
          </div>
        </div>
        <div class="hero-strip" aria-hidden="true"><ul class="wrap"><li>RECORDING SETUP</li><li>TIMELINE</li><li>GIMMICK</li><li>LIGHTING</li><li>VFX</li><li>RECORDING</li><li>RENDERING</li><li>TOOLS</li></ul></div>
      </section>

      <section class="sec" aria-labelledby="rc-h" style="border-top:0">
        <div class="wrap">
          <div class="sec-h">
            <div><p class="kicker">RECENT SYSTEMS &amp; TOOLS</p><h2 class="h2" id="rc-h">${esc(T.recentH)}</h2>
            <p class="rc-lead">${esc(P.capability)}</p></div>
            <a class="more" href="#/recent">${esc(T.toList)}</a>
          </div>
          ${recentSection()}
        </div>
      </section>

      <section class="sec showcase" aria-labelledby="sc-h">
        <div class="scan" aria-hidden="true"></div>
        <div class="wrap" style="position:relative;z-index:3">
          <div class="sec-h">
            <div><p class="kicker">SELECTED WORKS</p><h2 class="h2" id="sc-h">${esc(T.worksH)}</h2>
            <p class="rc-lead">${esc(T.worksNote)}</p></div>
            <a class="more" href="#/works">${esc(T.allWorks(D.works.length))}</a>
          </div>
          <div class="sc" data-showcase>
            <div class="sc-list" role="tablist" aria-label="${esc(T.tabsAria)}" aria-orientation="vertical">
              ${feat.map((w, i) => `<button class="sc-tab" role="tab" id="sct-${w.id}" aria-controls="sc-panel" aria-selected="false" tabindex="-1" data-i="${i}">
                <i>${pad(i + 1)}</i><b>${O(w.title)}</b><small>${O(w.credit || "—")}</small></button>`).join("")}
            </div>
            <div class="sc-panel" id="sc-panel" role="tabpanel" aria-live="polite"></div>
          </div>
        </div>
      </section>

      <section class="sec" aria-labelledby="tech-h">
        <div class="wrap">
          <div class="sec-h">
            <div><p class="kicker">TECHNICAL CASES</p><h2 class="h2" id="tech-h">${esc(T.techH)}</h2></div>
            <a class="more" href="#/tech">${esc(T.toList)}</a>
          </div>
          <div class="tech-grid">${D.tech.map(techCard).join("")}</div>
        </div>
      </section>

      ${channelBlock()}

      <section class="sec" aria-labelledby="ct-h" style="border-top:0">
        <div class="wrap contact">
          <div><p class="kicker">CONTACT</p><h2 class="h2" id="ct-h" style="margin-bottom:24px">${esc(T.contactH)}</h2>
          <a class="mail" href="mailto:${L.email}">${esc(L.email)}</a></div>
          <a class="more" href="#/about">${esc(T.toProfile)}</a>
        </div>
      </section>`,
      mount: () => mountShowcase(feat)
    };
  }

  function mountShowcase(feat) {
    const box = $("[data-showcase]"); if (!box) return;
    const tabs = $$(".sc-tab", box), panel = $("#sc-panel", box);
    const show = (i, focus, anim = true) => {
      scIndex = (i + feat.length) % feat.length;
      const w = feat[scIndex];
      tabs.forEach((t, k) => { const on = k === scIndex; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
      panel.setAttribute("aria-labelledby", `sct-${w.id}`);
      panel.innerHTML = `
        <a href="#/works/${w.id}" aria-label="${esc(T.detailAria(w.title))}">${thumbHTML(w, `<span class="sc-hud"><b>●</b> ${pad(scIndex + 1)} / ${pad(feat.length)}</span>`)}</a>
        <div class="sc-info">
          <div><p class="cr">${O(w.credit || "WORK")}</p><h3${jaAttr(w.title)}>${esc(w.title)}</h3></div>
          <a class="btn ghost" href="#/works/${w.id}">${esc(T.detailRoles)}</a>
          <div class="chips">${w.roles.map(r => `<span class="chip">${esc(r)}</span>`).join("")}</div>
        </div>`;
      panel.classList.remove("swap");
      if (anim) { void panel.offsetWidth; panel.classList.add("swap"); }
      if (focus) tabs[scIndex].focus();
    };
    tabs.forEach((t, k) => t.addEventListener("click", () => show(k)));
    $(".sc-list", box).addEventListener("keydown", e => {
      const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key in map) { e.preventDefault(); show(scIndex + map[e.key], true); }
      else if (e.key === "Home") { e.preventDefault(); show(0, true); }
      else if (e.key === "End") { e.preventDefault(); show(feat.length - 1, true); }
    });
    show(scIndex, false, false);
  }

  function viewWorks(q) {
    const tag = q.get("tag");
    const used = [...new Set(D.works.flatMap(w => w.tags))].filter(t => D.tags[t]);
    const list = tag ? D.works.filter(w => w.tags.includes(tag)) : D.works;
    const count = t => D.works.filter(w => w.tags.includes(t)).length;
    return {
      title: docTitle(T.worksH, P.handle), nav: "works",
      html: `
      <section class="page-head">
        <div class="scan" aria-hidden="true"></div>
        <div class="wrap" style="position:relative;z-index:3">
          <p class="kicker">PARTICIPATED WORKS</p>
          ${glH1(T.worksH)}
          <p class="lead">${esc(T.worksLead)}</p>
        </div>
      </section>
      <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">
        <div class="filters" role="group" aria-label="${esc(T.filterAria)}">
          <button class="fbtn" type="button" data-tag="" aria-pressed="${!tag}">${esc(T.all)} <small>${D.works.length}</small></button>
          ${used.map(t => `<button class="fbtn" type="button" data-tag="${t}" aria-pressed="${tag === t}">${esc(tagName(t))} <small>${count(t)}</small></button>`).join("")}
        </div>
        <p class="fcount" aria-live="polite">${T.count(list.length, D.works.length)}${tag ? `　—　${esc(tagName(tag))}` : ""}</p>
        ${list.length ? `<div class="wgrid enter">${list.map(workCard).join("")}</div>`
          : `<p class="lead" style="color:var(--mute)">${esc(T.empty)}</p><p style="margin-top:20px"><a class="more" href="#/works">${esc(T.showAll)} →</a></p>`}
      </section>`,
      mount() {
        $$(".fbtn").forEach(b => b.addEventListener("click", () => {
          const t = b.dataset.tag;
          keepFocus = `.fbtn[data-tag="${t}"]`;
          location.hash = t ? `#/works?tag=${t}` : "#/works";
        }));
      }
    };
  }

  function viewWork(id) {
    const w = workById(id); if (!w) return viewNotFound();
    const i = D.works.indexOf(w), prev = D.works[(i - 1 + D.works.length) % D.works.length], next = D.works[(i + 1) % D.works.length];
    return {
      title: docTitle(w.title, T.worksH, P.handle), nav: "works",
      html: `
      <section class="page-head">
        <div class="wrap">
          ${crumbs("#/works", T.worksH, w.title)}
          <p class="kicker">WORK ${pad(i + 1)}${w.credit ? ` — ${O(w.credit)}` : ""}</p>
          ${glH1(w.title)}
        </div>
      </section>
      <div class="wrap">
        <div class="detail">
          <div style="display:flex;flex-direction:column;gap:20px">${videoHTML(w)}${w.note ? `<p style="color:var(--mute)">${esc(w.note)}</p>` : ""}</div>
          <aside class="side">
            <dl class="kv"><dt>${esc(T.setupK)}</dt><dd>${esc(w.setupV || T.setupV)}</dd>${MOCAP_SETUP_IDS.has(w.id) ? `<dt>${esc(T.mocapK)}</dt><dd>${esc(T.mocapV)}</dd>` : ""}${w.officialTitle ? `<dt>${esc(T.officialK)}</dt><dd${jaAttr(w.officialTitle)}>${esc(w.officialTitle)}</dd>` : ""}${w.publisher ? `<dt>${esc(T.publisherK)}</dt><dd>${esc(w.publisher)}</dd>` : ""}${w.published ? `<dt>${esc(T.publishedK)}</dt><dd>${esc(w.published)}</dd>` : ""}</dl>
            <div><p class="dl-h">${esc(T.rolesH)}</p><ol class="roles">${w.roles.map(r => `<li>${esc(r)}</li>`).join("")}</ol></div>
            <div><p class="dl-h">${esc(T.tagsH)}</p><div class="tagl">${w.tags.map(t => `<a href="#/works?tag=${t}">${esc(tagName(t))}</a>`).join("")}</div></div>
            <a class="more" href="${esc(mediaURL(w))}" target="_blank" rel="noopener noreferrer">${esc(w.externalUrl ? T.watchBilibili : T.watchYT)}</a>
          </aside>
        </div>
        ${pn(T.pnWorks, "works", prev, next)}
      </div>`
    };
  }

  function viewRecentList() {
    return {
      title: docTitle(T.recentTitle, P.handle), nav: "recent",
      html: `
      <section class="page-head">
        <div class="wrap">
          <p class="kicker">RECENT SYSTEMS &amp; TOOLS</p>
          ${glH1(T.recentTitle)}
          <p class="lead">${esc(P.capability)}</p>
        </div>
      </section>
      <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">${recentSection()}</section>`
    };
  }

  function viewRecent(id) {
    const r = recentById(id); if (!r) return viewNotFound();
    const list = D.recent, i = list.indexOf(r), prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
    return {
      title: docTitle(r.title, T.recentTitle, P.handle), nav: "recent",
      html: `
      <section class="page-head">
        <div class="wrap">
          ${crumbs("#/recent", T.recentTitle, r.title)}
          <p class="kicker">RECENT ${pad(i + 1)} — ${esc(r.kind)}</p>
          ${glH1(r.title, ' style="font-size:clamp(28px,4.6vw,60px);line-height:1.2"')}
        </div>
      </section>
      <div class="wrap">
        <div class="detail">
          <div style="display:flex;flex-direction:column;gap:32px">
            ${r.yt ? videoHTML(r) : conceptArt(r.id)}
            <p class="rc-text">${esc(r.text)}</p>${r.note ? `<p style="color:var(--mute)">${esc(r.note)}</p>` : ""}
            ${r.yt ? conceptArt(r.id) : ""}
          </div>
          <aside class="side">
            ${r.facts.length ? `<dl class="kv">${r.facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}
            ${r.yt ? `<a class="more" href="https://www.youtube.com/watch?v=${esc(r.yt)}" target="_blank" rel="noopener">${esc(T.watchYT)}</a>` : ""}
          </aside>
        </div>
        ${pn(T.pnRecent, "recent", prev, next)}
      </div>`
    };
  }

  function viewTechList() {
    return {
      title: docTitle(T.techH, P.handle), nav: "tech",
      html: `
      <section class="page-head">
        <div class="wrap">
          <p class="kicker">TECHNICAL CASES</p>
          ${glH1(T.techH)}
          <p class="lead">${esc(T.techLead)}</p>
        </div>
      </section>
      <section class="wrap" style="padding-bottom:clamp(64px,8vw,112px)">
        ${D.tech.map((t, i) => `
        <a class="trow${SVG[t.id] ? " trow-ca" : ""}" href="#/tech/${t.id}">
          <span class="idx">${pad(i + 1)}</span>
          <span><h2>${esc(t.name)}</h2><p class="kind">${esc(t.kind)}</p><p>${esc(t.summary)}</p></span>
          ${conceptArt(t.id)}
        </a>`).join("")}
        ${D.recent.map((r, i) => `
        <a class="trow trow-ca" href="#/recent/${r.id}">
          <span class="idx">${pad(D.tech.length + i + 1)}</span>
          <span><span class="x-badge">${esc(T.navRecent)}</span><h2 class="trow-h-long"${jaAttr(r.title)}>${esc(r.title)}</h2><p class="kind">${esc(r.kind)}</p><p>${esc(r.text)}</p></span>
          ${conceptArt(r.id)}
        </a>`).join("")}
      </section>`
    };
  }

  function viewTech(id) {
    const t = techById(id); if (!t) return viewNotFound();
    const i = D.tech.indexOf(t), prev = D.tech[(i - 1 + D.tech.length) % D.tech.length], next = D.tech[(i + 1) % D.tech.length];
    return {
      title: docTitle(t.name, T.techH, P.handle), nav: "tech",
      html: `
      <section class="page-head">
        <div class="wrap">
          ${crumbs("#/tech", T.techH, t.name)}
          <div class="tech-hero${t.research ? " research" : ""}">
            <div>
              <p class="kicker">CASE ${pad(i + 1)} — ${esc(t.kind)}</p>
              ${glH1(t.name, ' style="font-size:clamp(30px,5vw,64px);line-height:1.2"')}
              <p class="lead" style="color:#c9c8c4">${esc(t.summary)}</p>
            </div>
            ${conceptArt(t.id)}
          </div>
        </div>
      </section>
      <div class="wrap" style="display:flex;flex-direction:column;gap:clamp(48px,6vw,80px);padding-bottom:clamp(48px,6vw,80px)">
        ${t.research ? `<section class="research-detail" aria-label="${esc(T.researchK)}"><div class="detail"><div>${videoHTML({...t,title:t.name})}</div><aside class="side"><dl class="kv"><dt>${esc(T.researchK)}</dt><dd>${esc(t.kind)}</dd><dt>${esc(T.environmentK)}</dt><dd>${esc(t.environment)}</dd></dl><a class="more" href="${esc(t.repository)}" target="_blank" rel="noopener noreferrer">${esc(T.repoLink)}</a></aside></div></section>` : ""}
        ${pn(T.pnTech, "tech", prev, next, "name").replace('class="pn"', 'class="pn" style="margin:0"')}
      </div>`
    };
  }

  function viewAbout() {
    const sep = "<span aria-hidden=\"true\" class=\"r\">/</span>";
    return {
      title: docTitle(T.aboutTitle, P.handle), nav: "about",
      html: `
      <section class="page-head">
        <div class="wrap">
          <p class="kicker">PROFILE &amp; CONTACT</p>
          ${glH1(T.aboutH)}
        </div>
      </section>
      <div class="wrap about">
        ${avatarHTML("KENZYAKATO")}
        <div class="about-body">
          <div>
            <p style="font:400 clamp(28px,3vw,40px)/1.2 var(--f-lat);letter-spacing:.06em">KENZYAKATO</p>
            <p style="color:var(--mute);margin:6px 0 24px">${O(P.kana)} ／ ${esc(P.role)}</p>
            <p class="txt">${esc(P.lead)}</p>
            <p class="txt" style="margin-top:16px">${esc(P.capability)}</p>
          </div>
          <dl class="kv">
            <dt>FIELD</dt><dd>${P.areas.map(esc).join(sep)}</dd>
            <dt>LANGUAGE</dt><dd>${P.languages.map(esc).join(sep)}</dd>
          </dl>
          <section aria-labelledby="ab-ct">
            <p class="kicker" id="ab-ct">CONTACT</p>
            <a class="mail" href="mailto:${L.email}">${esc(L.email)}</a>
            <dl class="kv" style="margin-top:32px">
              <dt>YOUTUBE</dt><dd><a href="${L.channel}" target="_blank" rel="noopener">${esc(L.channelHandle)} ↗</a></dd>
              <dt>X</dt><dd><a href="${L.x}" target="_blank" rel="noopener">@kenzyakato ↗</a></dd>
              <dt>TIKTOK</dt><dd><a href="${L.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="${esc(T.tiktokAria)}">${esc(L.tiktokHandle)} ↗</a></dd>
              <dt>BOOTH</dt><dd><a href="${L.booth}" target="_blank" rel="noopener">hanzawanaoki.booth.pm ↗</a></dd>
              <dt>${esc(T.oldSite)}</dt><dd><a href="${L.source}" target="_blank" rel="noopener">Google Sites ↗</a></dd>
            </dl>
          </section>
        </div>
      </div>
      ${channelBlock()}`
    };
  }

  function viewNotFound() {
    return { title: docTitle(T.nfTitle, P.handle), nav: "",
      html: `<section class="page-head"><div class="wrap"><p class="kicker">404</p>${glH1("NOT FOUND", ' style="font-family:var(--f-lat)"')}<p class="lead">${esc(T.nfLead)}</p><p style="margin-top:28px"><a class="btn" href="#/">${esc(T.nfBack)}</a></p></div></section>` };
  }

  /* ---------- video lazy embed ---------- */
  app.addEventListener("click", e => {
    const b = e.target.closest(".video[data-yt]"); if (!b) return;
    const f = document.createElement("iframe");
    f.className = "vframe";
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt)}?rel=0`;
    f.title = T.iframeTitle(b.dataset.title);
    f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    f.referrerPolicy = "strict-origin-when-cross-origin";
    b.replaceWith(f);
    f.focus();
  });

  /* ---------- router ---------- */
  let first = true, keepFocus = null, lastPath = null;
  function route(opts = {}) {
    const raw = location.hash.replace(/^#/, "") || "/";
    if (!raw.startsWith("/")) return;
    const [path, qs = ""] = raw.split("?");
    const parts = path.split("/").filter(Boolean), q = new URLSearchParams(qs);
    if (path !== lastPath && !opts.keep) scIndex = 0;
    lastPath = path;
    let v;
    if (!parts.length) v = viewHome();
    else if (parts[0] === "works") v = parts[1] ? viewWork(parts[1]) : viewWorks(q);
    else if (parts[0] === "recent") v = parts[1] ? viewRecent(parts[1]) : viewRecentList();
    else if (parts[0] === "tech") v = parts[1] ? viewTech(parts[1]) : viewTechList();
    else if (parts[0] === "about") v = viewAbout();
    else v = viewNotFound();

    const y = window.scrollY;
    const sameFilterPage = keepFocus && parts[0] === "works" && !parts[1];
    app.innerHTML = v.html;
    app.classList.remove("route-in");
    if (!first && !sameFilterPage && !opts.keep) { void app.offsetWidth; app.classList.add("route-in"); }
    document.title = v.title;
    $$("[data-nav]").forEach(a => a.dataset.nav === v.nav ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    v.mount && v.mount();
    if (opts.keep) window.scrollTo(0, y);
    else if (sameFilterPage) $(keepFocus)?.focus();
    else {
      window.scrollTo(0, 0);
      if (!first) $("h1", app)?.focus({ preventScroll: true });
    }
    keepFocus = null;
    if (!reduced() && !opts.keep) bootType();
    first = false;
  }
  function bootType() {
    const el = $("#bootTxt"); if (!el) return;
    const full = el.textContent; let n = 0; el.textContent = "";
    const tick = () => { if (!el.isConnected) return; el.textContent = full.slice(0, ++n); if (n < full.length) setTimeout(tick, 28); };
    tick();
  }

  buildData(); applyStatic();
  window.addEventListener("hashchange", () => route());
  route();
})();
