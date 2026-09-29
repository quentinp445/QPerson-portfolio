/* =========================================================
   Quentin Person — Portfolio : interactions
   Le contenu se modifie dans assets/js/content.js
   ========================================================= */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const P = window.PROJECTS || [], G = window.GALLERY || [];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const PLAY = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.5 1.5l6 3.5-6 3.5z"/></svg>';
  const CAT = { montage: 'Montage', motion: 'Motion', '3d': '3D', contenu: 'Contenu', design: 'Design' };
  const thumb = p => p.cover || (p.youtube ? `https://i.ytimg.com/vi/${p.youtube}/hqdefault.jpg` : '');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- RENDU ---------------- */
  // Bandeau
  const words = (window.SITE?.disciplines || []);
  $('#marquee').innerHTML = [...words, ...words, ...words].map(w => `<span>${esc(w)}</span>`).join('');

  // Mur d'images du hero
  const wallImgs = [...P.map(thumb), ...G.filter(g => g.group === '3d').map(g => g.src.replace('.webp', '-sm.webp'))].filter(Boolean);
  const wall = $('#wall');
  for (let r = 0; r < 4; r++) {
    const row = document.createElement('div'); row.className = 'wall__row';
    const set = wallImgs.slice(r * 4).concat(wallImgs.slice(0, r * 4));
    row.innerHTML = [...set, ...set].slice(0, 14).map(src => `<img src="${src}" alt="" loading="lazy" decoding="async">`).join('');
    wall.appendChild(row);
  }

  // Projets à la une
  const featured = P.filter(p => p.featured);
  $('#featured').innerHTML = featured.map((p, i) => `
    <article class="feat" data-id="${p.id}" data-cursor="${p.youtube ? 'Lecture' : 'Voir'}" tabindex="0" role="button" aria-label="Ouvrir ${esc(p.title)}" style="--acc:${p.accent || 'var(--accent)'}">
      <div class="feat__media"><img src="${thumb(p)}" alt="${esc(p.title)}" loading="lazy" class="px">${p.youtube ? `<span class="feat__play">${PLAY}</span>` : ''}</div>
      <div class="feat__text">
        <span class="feat__index">${String(i + 1).padStart(2, '0')}</span>
        <p class="feat__kicker">${esc(p.kicker)}${p.year ? ' · ' + esc(p.year) : ''}</p>
        <h3 class="feat__title">${esc(p.title)}</h3>
        <p class="feat__summary">${esc(p.summary)}</p>
        <div class="tags">${(p.skills || []).slice(0, 4).map((s, k) => `<span class="tag ${k === 0 ? 'tag--hot' : ''}">${esc(s)}</span>`).join('')}</div>
        <span class="more">Voir le projet <i></i></span>
      </div>
    </article>`).join('');

  // Grille complète
  $('#grid').innerHTML = P.map(p => `
    <article class="card reveal-up" data-id="${p.id}" data-cat="${(p.category || []).join(' ')}" data-cursor="${p.youtube ? 'Lecture' : 'Voir'}" tabindex="0" role="button" aria-label="Ouvrir ${esc(p.title)}">
      <div class="card__media"><img src="${thumb(p)}" alt="${esc(p.title)}" loading="lazy" decoding="async">
        <span class="card__badge">${(p.category || []).map(c => CAT[c] || c).join(' · ')}</span>
        ${p.youtube ? `<span class="card__play">${PLAY}</span>` : ''}</div>
      <div class="card__body"><p class="card__kicker">${esc(p.kicker)}</p><h3 class="card__title">${esc(p.title)}</h3><p class="card__sum">${esc(p.summary)}</p></div>
    </article>`).join('');

  // Galerie
  const masonry = $('#masonry');
  let gGroup = '3d';
  const renderGallery = () => {
    const items = G.filter(g => g.group === gGroup);
    masonry.dataset.group = gGroup;
    masonry.innerHTML = items.map((g, i) => `<figure class="m-item" data-i="${i}" data-cursor="Zoom"><img src="${g.thumb || g.src.replace('.webp', '-sm.webp')}" alt="${esc(g.title)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${g.src}'"><figcaption>${esc(g.title)}</figcaption></figure>`).join('');
    $('#viewer3d').classList.toggle('is-off', gGroup !== '3d');
    if (hasGSAP && !reduce) gsap.from($$('.m-item', masonry), { opacity: 0, y: 40, duration: .8, stagger: .05, ease: 'power3.out', onComplete: () => ScrollTrigger.refresh() });
    else if (hasGSAP) ScrollTrigger.refresh();
  };
  renderGallery();

  // Logiciels + parcours
  $('#tools').innerHTML = (window.TOOLS || []).map(t => `<li>${esc(t)}</li>`).join('');
  const tl = (list, withType) => list.map(e => `<li class="reveal-up"><p class="tl__year">${esc(e.year)}${withType && e.type ? ' · ' + esc(e.type) : ''}</p><h4 class="tl__title">${esc(e.title)}</h4>${e.place ? `<p class="tl__place">${esc(e.place)}</p>` : ''}${e.text ? `<p class="tl__text">${esc(e.text)}</p>` : ''}</li>`).join('');
  $('#tlExp').innerHTML = tl(window.EXPERIENCES || [], true) + '<span class="tl__fill"></span>';
  $('#tlEdu').innerHTML = tl(window.EDUCATION || [], false) + '<span class="tl__fill"></span>';

  /* ---------------- DECOUPAGE LETTRES ---------------- */
  $$('.split').forEach(el => {
    el.innerHTML = el.textContent.split(' ').map(w => `<span class="word">${[...w].map(c => `<span class="ch">${c}</span>`).join('')}</span>`).join(' ');
  });

  /* ---------------- SCROLL FLUIDE ---------------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGSAP) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
    else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  }
  const goTo = (target) => { if (target === 0) { lenis ? lenis.scrollTo(0) : scrollTo({ top: 0, behavior: 'smooth' }); return; } const el = $(target); if (!el) return; lenis ? lenis.scrollTo(el, { offset: -70 }) : el.scrollIntoView({ behavior: 'smooth' }); };
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2 && id !== '#') return;
    e.preventDefault(); closeMenu(); goTo(id === '#top' || id === '#' ? 0 : id);
  }));

  /* ---------------- INTRO ---------------- */
  const loader = $('.loader');
  const startHero = () => {
    if (!hasGSAP || reduce) { document.documentElement.classList.add('no-anim'); return; }
    const tlh = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tlh.to('.hero__title .ch', { y: 0, duration: 1.3, stagger: .035 })
       .to('.hero .reveal-up', { opacity: 1, y: 0, duration: 1, stagger: .09 }, '-=.9');
  };
  requestAnimationFrame(() => { const b = $('.loader__bar i'); if (b) b.style.width = '100%'; });
  const hideLoader = () => { if (!loader || loader.classList.contains('is-done')) return; loader.classList.add('is-done'); setTimeout(() => loader.remove(), 1200); setTimeout(startHero, 350); };
  window.addEventListener('load', () => setTimeout(hideLoader, 700));
  setTimeout(hideLoader, 2600); // sécurité

  /* ---------------- ANIMATIONS AU SCROLL ---------------- */
  if (hasGSAP && !reduce) {
    gsap.registerPlugin(ScrollTrigger);

    // Apparitions
    ScrollTrigger.batch('.reveal-up:not(.hero .reveal-up)', {
      start: 'top 88%', once: true,
      onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1, stagger: .08, ease: 'power3.out' })
    });
    // Titre contact
    gsap.to('.contact__title .ch', { y: 0, duration: 1.2, stagger: .03, ease: 'expo.out', scrollTrigger: { trigger: '.contact', start: 'top 70%' } });

    // Projets à la une : entrée + parallax image
    $$('.feat').forEach(f => {
      gsap.from(f.querySelector('.feat__media'), { clipPath: 'inset(12% 12% 12% 12% round 18px)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: f, start: 'top 80%' } });
      gsap.from(f.querySelectorAll('.feat__text > *'), { opacity: 0, y: 30, duration: 1, stagger: .07, ease: 'power3.out', scrollTrigger: { trigger: f, start: 'top 75%' } });
      gsap.fromTo(f.querySelector('.px'), { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: f, scrub: true } });
    });

    // Mur d'images du hero
    $$('.wall__row').forEach((r, i) => gsap.fromTo(r, { x: i % 2 ? -300 : 0 }, { x: i % 2 ? 0 : -300, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } }));
    gsap.to('.hero__inner', { yPercent: 18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Bandeau : vitesse liée au scroll
    const track = $('#marquee'); let mx = 0, vel = 0;
    ScrollTrigger.create({ onUpdate: s => { vel = s.getVelocity() / 300; } });
    gsap.ticker.add(() => { mx -= 1 + Math.min(Math.abs(vel), 14); vel *= .92; const w = track.scrollWidth / 3; if (-mx >= w) mx += w; track.style.transform = `translate3d(${mx}px,0,0)`; });

    // Parallax portrait
    $$('.parallax').forEach(el => gsap.fromTo(el, { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el.parentElement, scrub: true } }));
    gsap.from('.about__shape', { scaleY: .3, transformOrigin: 'bottom', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.about', start: 'top 70%' } });

    // Timeline qui se remplit
    $$('.tl').forEach(l => gsap.to(l.querySelector('.tl__fill'), { height: 'calc(100% - 16px)', ease: 'none', scrollTrigger: { trigger: l, start: 'top 70%', end: 'bottom 60%', scrub: true } }));

    // Compteurs
    $$('[data-count]').forEach(el => {
      const o = { v: 0 };
      gsap.to(o, { v: +el.dataset.count, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true }, onUpdate: () => el.textContent = Math.round(o.v) });
    });

    // Barre de progression
    gsap.to('.progress i', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .2 } });
  } else {
    document.documentElement.classList.add('no-anim');
    $$('[data-count]').forEach(el => el.textContent = el.dataset.count);
    const bar = $('.progress i');
    addEventListener('scroll', () => { const h = document.documentElement; bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight)})`; }, { passive: true });
  }

  /* ---------------- NAVIGATION ---------------- */
  const nav = $('#nav'); let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > lastY && y > 500 && !document.body.classList.contains('menu-open'));
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  const secs = ['projets', 'videos', 'galerie', 'apropos', 'parcours'].map(id => document.getElementById(id));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) $$('[data-link]').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => s && io.observe(s));

  // Menu mobile
  const burger = $('.nav__burger'), menu = $('.menu');
  function closeMenu() { menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); lenis && lenis.start(); }
  burger.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open); document.body.classList.toggle('menu-open', open);
    open ? lenis && lenis.stop() : lenis && lenis.start();
  });

  /* ---------------- TEXTE QUI TOURNE ---------------- */
  const rot = $('#rot'), rw = ['motion design', 'montage vidéo', '3D', 'graphisme', 'direction artistique', 'contenu social', 'shorts & reels'];
  let ri = 0;
  if (!reduce) setInterval(() => {
    rot.classList.remove('is-in'); rot.classList.add('is-out');
    setTimeout(() => { ri = (ri + 1) % rw.length; rot.textContent = rw[ri]; rot.classList.remove('is-out'); rot.classList.add('is-in'); }, 330);
  }, 2200);

  /* ---------------- CURSEUR ---------------- */
  const cur = $('.cursor'), curL = $('.cursor__label');
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
    const loop = () => { cx += (x - cx) * .18; cy += (y - cy) * .18; cur.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor]');
      if (t) { curL.textContent = t.dataset.cursor; cur.classList.add('is-big'); } else cur.classList.remove('is-big');
    });
    // Effet aimant sur les boutons
    $$('.btn, .copy').forEach(b => {
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; });
      b.addEventListener('mouseleave', () => b.style.transform = '');
    });
  }
  // Halo sur les cartes services
  $$('.service').forEach(s => s.addEventListener('mousemove', e => { const r = s.getBoundingClientRect(); s.style.setProperty('--mx', (e.clientX - r.left) + 'px'); s.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));

  /* ---------------- FILTRES ---------------- */
  $$('.filter').forEach(b => b.addEventListener('click', () => {
    $$('.filter').forEach(x => x.classList.toggle('is-active', x === b));
    const f = b.dataset.filter;
    const cards = $$('.card');
    cards.forEach(c => c.classList.toggle('is-hidden', f !== 'all' && !c.dataset.cat.split(' ').includes(f)));
    const shown = cards.filter(c => !c.classList.contains('is-hidden'));
    if (hasGSAP && !reduce) gsap.fromTo(shown, { opacity: 0, y: 30, scale: .98 }, { opacity: 1, y: 0, scale: 1, duration: .6, stagger: .05, ease: 'power3.out' });
    else shown.forEach(c => { c.style.opacity = 1; c.style.transform = 'none'; });
    hasGSAP && ScrollTrigger.refresh();
  }));
  $$('.gfilter').forEach(b => b.addEventListener('click', () => {
    $$('.gfilter').forEach(x => x.classList.toggle('is-active', x === b));
    gGroup = b.dataset.g; renderGallery();
  }));

  /* ---------------- FENETRE PROJET ---------------- */
  const modal = $('#modal'); let cur_i = 0, lastFocus = null;
  const embed = id => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="Vidéo YouTube" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  const lite = id => `<div class="lite" style="background-image:url('${(P.find(p => p.youtube === id) || {}).cover || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}')" data-yt="${id}" role="button" aria-label="Lire la vidéo" tabindex="0"><span>${PLAY}</span></div>`;
  const openProject = (id) => {
    cur_i = P.findIndex(p => p.id === id); if (cur_i < 0) return;
    const p = P[cur_i];
    const vids = p.youtube ? [{ youtube: p.youtube, label: 'Vidéo 1' }, ...(p.extraVideos || [])] : [];
    $('#modalMedia').innerHTML = p.youtube
      ? `<div class="ratio">${lite(p.youtube)}</div>${vids.length > 1 ? `<div class="modal__extra">${vids.map((v, k) => `<button data-v="${v.youtube}" class="${k ? '' : 'is-active'}">${esc(v.label || 'Vidéo ' + (k + 1))}</button>`).join('')}</div>` : ''}`
      : `<div class="ratio"><img src="${thumb(p)}" alt="${esc(p.title)}"></div>`;
    $('#modalKicker').textContent = [p.kicker, p.year, p.role].filter(Boolean).join(' · ');
    $('#modalTitle').textContent = p.title;
    $('#modalSummary').textContent = p.summary || '';
    $('#modalDesc').textContent = p.description || '';
    $('#modalMeta').innerHTML =
      (p.skills?.length ? `<div><h5>Compétences</h5><div class="tags">${p.skills.map((s, k) => `<span class="tag ${k < 2 ? 'tag--hot' : ''}">${esc(s)}</span>`).join('')}</div></div>` : '') +
      (p.tools?.length ? `<div><h5>Logiciels</h5><div class="tags">${p.tools.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></div>` : '') +
      (p.link ? `<div><a class="btn btn--sm" href="${p.link.url}" target="_blank" rel="noopener">${esc(p.link.label)} ↗</a></div>` : '') +
      (p.youtube ? `<div><a class="tag" href="https://youtu.be/${p.youtube}" target="_blank" rel="noopener">Ouvrir sur YouTube ↗</a></div>` : '');
    $$('.modal__extra button').forEach(b => b.addEventListener('click', () => {
      $$('.modal__extra button').forEach(x => x.classList.toggle('is-active', x === b));
      $('#modalMedia .ratio').innerHTML = lite(b.dataset.v);
    }));
    if (modal.hidden) { lastFocus = document.activeElement; modal.hidden = false; lenis && lenis.stop(); document.body.style.overflow = 'hidden'; }
    $('.modal__panel').scrollTop = 0;
    $('.modal__close').focus();
  };
  $('#modalMedia').addEventListener('click', e => { const l = e.target.closest('.lite'); if (l) l.parentElement.innerHTML = embed(l.dataset.yt); });
  $('#modalMedia').addEventListener('keydown', e => { const l = e.target.closest('.lite'); if (l && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); l.parentElement.innerHTML = embed(l.dataset.yt); } });
  const closeModal = () => { if (modal.hidden) return; modal.hidden = true; $('#modalMedia').innerHTML = ''; lenis && lenis.start(); document.body.style.overflow = ''; lastFocus && lastFocus.focus(); };
  document.addEventListener('click', e => {
    const card = e.target.closest('.feat, .card'); if (card) openProject(card.dataset.id);
    if (e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.feat, .card')) { e.preventDefault(); openProject(e.target.dataset.id); }
  });
  $('#modalPrev').addEventListener('click', () => openProject(P[(cur_i - 1 + P.length) % P.length].id));
  $('#modalNext').addEventListener('click', () => openProject(P[(cur_i + 1) % P.length].id));

  /* ---------------- VISIONNEUSE IMAGES ---------------- */
  const lb = $('#lightbox'); let li = 0;
  const lbItems = () => G.filter(g => g.group === gGroup);
  const showLb = i => { const it = lbItems(); li = (i + it.length) % it.length; $('#lbImg').src = it[li].src; $('#lbImg').alt = it[li].title; $('#lbCap').textContent = `${it[li].title} · ${li + 1} / ${it.length}`; };
  masonry.addEventListener('click', e => { const f = e.target.closest('.m-item'); if (!f) return; showLb(+f.dataset.i); lb.hidden = false; lenis && lenis.stop(); document.body.style.overflow = 'hidden'; });
  const closeLb = () => { lb.hidden = true; lenis && lenis.start(); document.body.style.overflow = ''; };
  $('.lightbox__prev').addEventListener('click', () => showLb(li - 1));
  $('.lightbox__next').addEventListener('click', () => showLb(li + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('[data-lclose]')) closeLb(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); if (!lb.hidden) closeLb(); closeMenu(); }
    if (!lb.hidden && e.key === 'ArrowRight') showLb(li + 1);
    if (!lb.hidden && e.key === 'ArrowLeft') showLb(li - 1);
    if (!modal.hidden && e.key === 'ArrowRight' && !e.target.closest('iframe')) $('#modalNext').click();
    if (!modal.hidden && e.key === 'ArrowLeft') $('#modalPrev').click();
  });

  /* ---------------- COPIER E-MAIL ---------------- */
  $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copié ✓'; b.classList.add('is-ok'); setTimeout(() => { b.textContent = 'Copier'; b.classList.remove('is-ok'); }, 2000); }
    catch { location.href = 'mailto:' + b.dataset.copy; }
  }));

  /* ---------------- MODELE 3D (chargé seulement si visible) ---------------- */
  const stage = $('#mvStage');
  const mvIO = new IntersectionObserver(es => {
    if (!es[0].isIntersecting) return; mvIO.disconnect();
    const s = document.createElement('script'); s.type = 'module';
    s.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js';
    s.onload = () => { stage.innerHTML = '<model-viewer src="assets/models/epee.glb" alt="Épée double modélisée sous Blender" camera-controls auto-rotate rotation-per-second="18deg" camera-orbit="0deg 80deg auto" orientation="0deg 0deg -38deg" field-of-view="26deg" disable-zoom interaction-prompt="none" shadow-intensity="1" exposure="1.1"></model-viewer>'; };
    s.onerror = () => $('#viewer3d').classList.add('is-off');
    document.head.appendChild(s);
  }, { rootMargin: '300px' });
  mvIO.observe(stage);
})();
