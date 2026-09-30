/* =========================================================
   Quentin Person — Portfolio
   Rendu du contenu (content.js) et interactions légères.
   Aucune bibliothèque externe : défilement natif du navigateur.
   ========================================================= */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const W = window.WORKS || [], G = window.GALLERY || [];
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const cover = w => w.cover || (w.youtube ? `https://i.ytimg.com/vi/${w.youtube}/hqdefault.jpg` : '');
  const small = s => /-sm\.webp$|^http|yt-|ui-|cv-/.test(s) ? s : s.replace(/\.webp$/, '-sm.webp');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Compétences ---------- */
  $('#skills').innerHTML = (window.SKILLS || []).map((s, i) =>
    `<article class="skill fade"><span class="skill__n">${pad(i + 1)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>${s.tools ? `<small>${esc(s.tools)}</small>` : ''}</article>`).join('');

  /* ---------- Parcours ---------- */
  const row = list => list.map(e => `<li class="fade"><p class="tl__year">${esc(e.year)}</p><p class="tl__title">${esc(e.title)}</p><p class="tl__place">${esc(e.place)}</p>${e.text ? `<p class="tl__text">${esc(e.text)}</p>` : ''}</li>`).join('');
  $('#tlExp').innerHTML = row(window.EXPERIENCES || []);
  $('#tlEdu').innerHTML = row(window.EDUCATION || []);
  $('#langs').innerHTML = (window.LANGS || []).map(([a, b]) => `<span class="inline">${esc(a)} <b>${esc(b)}</b></span>`).join('');
  $('#tools').textContent = (window.TOOLS || []).join(', ');

  /* ---------- Réalisations : grille éditoriale ---------- */
  // Grille régulière : chaque projet a la même taille, l'ordre de content.js est respecté
  $('#works').innerHTML = W.map((w, i) => `
    <article class="work" data-i="${i}" tabindex="0" role="button" aria-label="${esc(w.title)} — ouvrir">
      <div class="work__media"><img src="${cover(w)}" alt="" loading="lazy" decoding="async"><span class="work__tag">${w.youtube ? 'Lecture' : 'Voir'}</span></div>
      <div class="work__cap"><span class="work__n">${pad(i + 1)}</span><h3 class="work__title">${esc(w.title)}</h3><span class="work__year">${esc(w.year)}</span><p class="work__type">${esc(w.type)}</p></div>
    </article>`).join('');
  $('#worksCount').textContent = `${pad(W.length)} projets`;

  /* ---------- Images & print ---------- */
  const GROUPS = [['illustration', 'Illustration'], ['affiche', 'Affiches'], ['3d', 'Rendus 3D']];
  $('#archive').innerHTML = GROUPS.filter(([g]) => G.some(x => x.group === g)).map(([g, label]) => `
    <div class="arc__group"><p class="mono">${label}</p><div class="arc__row ${g}">${G.map((x, i) => x.group === g ? `<button data-g="${i}" aria-label="Agrandir : ${esc(x.title)}"><img src="${small(x.src)}" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${x.src}'"></button>` : '').join('')}</div></div>`).join('');

  /* ---------- Apparitions au défilement ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); $$('.rv-line', e.target).forEach(l => l.classList.add('in')); io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.fade, .work, .hero__line, .contact__mail').forEach(el => io.observe(el));
  // Décalage léger pour les éléments d'un même groupe
  $$('.skills, .tl__row').forEach(g => $$('.fade', g).forEach((el, i) => el.style.transitionDelay = (i * 60) + 'ms'));
  $$('.hero .rv-line').forEach((el, i) => el.style.transitionDelay = (150 + i * 120) + 'ms');

  /* ---------- Navigation ---------- */
  const nav = $('#nav'); let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('is-solid', y > 40);
    const inkTop = $('#realisations').getBoundingClientRect();
    nav.classList.toggle('on-ink', inkTop.top < 40 && inkTop.bottom > 40);
    if (Math.abs(y - lastY) < 8) return;
    nav.classList.toggle('is-hidden', y > lastY && y > 400);
    lastY = y;
  }, { passive: true });
  const secIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id === 'person' || e.target.classList.contains('profile') ? 'person' : e.target.id;
    $$('[data-link]').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['#person', '.profile', '#realisations', '#contact'].forEach(s => secIO.observe($(s)));

  // Heure de Paris
  const clock = $('#clock');
  const tick = () => { clock.textContent = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).format(new Date()); };
  tick(); setInterval(tick, 30000);

  /* ---------- Fiche réalisation ---------- */
  const sheet = $('#sheet'); let cur = 0, lastFocus = null;
  const embed = id => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="Vidéo" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  const poster = (id, img) => `<div class="poster" data-yt="${id}" role="button" tabindex="0" aria-label="Lire la vidéo" style="background-image:url('${img}')"></div>`;
  const lock = on => { document.documentElement.style.overflow = on ? 'hidden' : ''; };
  function open(i) {
    if (i < 0) return; cur = (i + W.length) % W.length; const w = W[cur];
    const vids = w.youtube ? [{ youtube: w.youtube, label: 'Vidéo 1' }, ...(w.extraVideos || [])] : [];
    $('#sMedia').innerHTML = `<div class="ratio">${w.youtube ? poster(w.youtube, cover(w)) : `<img src="${cover(w)}" alt="${esc(w.title)}">`}</div>` +
      (vids.length > 1 ? `<div class="sheet__alt">${vids.map((v, k) => `<button class="${k ? '' : 'on'}" data-v="${v.youtube}">${esc(v.label || 'Vidéo ' + (k + 1))}</button>`).join('')}</div>` : '');
    $('#sIndex').textContent = `${pad(cur + 1)} / ${pad(W.length)}`;
    $('#sType').textContent = [w.type, w.year].filter(Boolean).join(' — ');
    $('#sTitle').textContent = w.title;
    $('#sSummary').textContent = w.summary || '';
    $('#sDesc').textContent = w.description || '';
    const rowM = (k, v) => v ? `<div><dt>${k}</dt><dd>${v}</dd></div>` : '';
    $('#sMeta').innerHTML = rowM('Contexte', esc(w.context)) + rowM('Compétences', esc((w.skills || []).join(', '))) + rowM('Logiciels', esc((w.tools || []).join(', '))) +
      rowM('Liens', [w.link ? `<a class="link" href="${w.link.url}" target="_blank" rel="noopener">${esc(w.link.label)} <span>↗</span></a>` : '', w.youtube ? `<a class="link" href="https://youtu.be/${w.youtube}" target="_blank" rel="noopener">YouTube <span>↗</span></a>` : ''].filter(Boolean).join(' &nbsp; '));
    if (!sheet.classList.contains('open')) { lastFocus = document.activeElement; sheet.hidden = false; requestAnimationFrame(() => sheet.classList.add('open')); lock(true); }
    sheet.scrollTop = 0; $('#sClose').focus({ preventScroll: true });
  }
  const close = () => { if (!sheet.classList.contains('open')) return; sheet.classList.remove('open'); lock(false); setTimeout(() => { sheet.hidden = true; $('#sMedia').innerHTML = ''; }, 600); lastFocus && lastFocus.focus({ preventScroll: true }); };
  $('#sMedia').addEventListener('click', e => {
    const p = e.target.closest('.poster'); if (p) { p.parentElement.innerHTML = embed(p.dataset.yt); return; }
    const b = e.target.closest('.sheet__alt button'); if (b) { $$('.sheet__alt button').forEach(x => x.classList.toggle('on', x === b)); $('#sMedia .ratio').innerHTML = embed(b.dataset.v); }
  });
  $('#works').addEventListener('click', e => { const w = e.target.closest('.work'); if (w) open(+w.dataset.i); });
  $('#sClose').addEventListener('click', close);
  $('#sPrev').addEventListener('click', () => open(cur - 1));
  $('#sNext').addEventListener('click', () => open(cur + 1));

  /* ---------- Visionneuse images ---------- */
  const viewer = $('#viewer'); let gi = 0;
  const showImg = i => { gi = (i + G.length) % G.length; $('#vImg').src = G[gi].src; $('#vImg').alt = G[gi].title; $('#vCap').textContent = `${G[gi].title} — ${pad(gi + 1)} / ${pad(G.length)}`; };
  $('#archive').addEventListener('click', e => { const b = e.target.closest('[data-g]'); if (!b) return; showImg(+b.dataset.g); viewer.hidden = false; requestAnimationFrame(() => viewer.classList.add('open')); lock(true); });
  const closeV = () => { if (!viewer.classList.contains('open')) return; viewer.classList.remove('open'); lock(false); setTimeout(() => viewer.hidden = true, 600); };
  $('#vClose').addEventListener('click', closeV);
  $('#vPrev').addEventListener('click', () => showImg(gi - 1));
  $('#vNext').addEventListener('click', () => showImg(gi + 1));

  /* ---------- Clavier ---------- */
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.work')) { e.preventDefault(); open(+e.target.dataset.i); }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.poster')) { e.preventDefault(); e.target.parentElement.innerHTML = embed(e.target.dataset.yt); }
    if (e.key === 'Escape') { close(); closeV(); }
    if (viewer.classList.contains('open')) { if (e.key === 'ArrowRight') showImg(gi + 1); if (e.key === 'ArrowLeft') showImg(gi - 1); }
    else if (sheet.classList.contains('open')) { if (e.key === 'ArrowRight') open(cur + 1); if (e.key === 'ArrowLeft') open(cur - 1); }
  });
})();
