/* ===== helpers ===== */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== année ===== */
$('#year').textContent = new Date().getFullYear();

/* ===== menu actif ===== */
const navLinks = $$('[data-nav]');
const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navLinks.forEach(l=>{ const on = l.getAttribute('href') === '#' + e.target.id; l.classList.toggle('active', on); l.setAttribute('aria-current', on ? 'page' : 'false'); });
    }
  });
},{threshold:0.6});
sections.forEach(s=>spy.observe(s));

/* ===== scroll doux ===== */
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ev=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      ev.preventDefault();
      const el = $(id);
      if(!el) return;
      const headH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
      const y = el.getBoundingClientRect().top + window.scrollY - headH;
      window.scrollTo({top:y, behavior:'smooth'});
    }
  });
});

/* ===== Révélations ===== */
(() => {
  const els = $$('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-inview')); return; }
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('is-inview'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  els.forEach(el => io.observe(el));
})();
window.addEventListener('DOMContentLoaded', () => document.body.classList.add('is-ready'));

/* ===== Accordéons : switch ON/OFF par section ===== */
const collapses = $$('[data-collapse]');
collapses.forEach(box => {
  const header  = $('.collapse__header', box);
  const toggle  = $('.collapse__toggle', box);
  const content = $('.collapse__content', box);

  content.style.height = '0px';
  content.style.overflow = 'hidden';

  function setOpen(open){
    header.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-checked', String(open));
    box.classList.toggle('is-open', open);

    if (prefersReduced) { content.style.height = open ? 'auto' : '0px'; return; }

    if (open) {
      content.style.display = 'block';
      const h = content.scrollHeight;
      content.style.height = '0px';
      requestAnimationFrame(() => { content.style.height = h + 'px'; });
      content.addEventListener('transitionend', function te(e){
        if (e.propertyName === 'height'){ content.style.height = 'auto'; content.removeEventListener('transitionend', te); }
      });
    } else {
      const h = content.scrollHeight;
      content.style.height = h + 'px';
      requestAnimationFrame(() => { content.style.height = '0px'; });
    }
  }

  function toggleOpen(){ setOpen(header.getAttribute('aria-expanded') !== 'true'); }

  // clic sur barre ou switch
  header.addEventListener('click', (e)=> {
    // si clic exactement sur le switch, on laisse faire; sinon on bascule aussi
    if (!e.target.classList.contains('mini-switch')) toggleOpen();
  });
  toggle.addEventListener('click', (e)=> { e.stopPropagation(); toggleOpen(); });

  // accessibilité clavier
  header.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleOpen(); }
  });
});

/* ===== Thème + swap typo ===== */
const root = document.documentElement;
const themeSwitch = $('#themeSwitch');
const folioImg = $('#folioImg');

function setFolioSrc() {
  folioImg.setAttribute('src', root.getAttribute('data-theme') === 'light' ? 'typo2.png' : 'typo.png');
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
setFolioSrc();

function updateThemeSwitchUI(){
  const isDark = root.getAttribute('data-theme') !== 'light';
  themeSwitch.setAttribute('aria-checked', String(isDark));
  themeSwitch.classList.toggle('is-light', !isDark);
}
updateThemeSwitchUI();

themeSwitch.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeSwitchUI();
  setFolioSrc();
  document.body.classList.add('theme-xfade');
  setTimeout(()=>document.body.classList.remove('theme-xfade'), 350);
});

/* ===== Micro-parallax sur le HERO ===== */
(() => {
  if (prefersReduced) return;
  const hero = $('.hero--split');
  if (!hero) return;
  let raf = null;
  const strength = { x: 14, y: 10 };

  function onMove(e){
    const r = hero.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    const px = Math.max(-1, Math.min(1, dx)) * strength.x;
    const py = Math.max(-1, Math.min(1, dy)) * strength.y;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      hero.style.setProperty('--px', px.toFixed(2) + 'px');
      hero.style.setProperty('--py', py.toFixed(2) + 'px');
    });
  }

  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--px', '0px');
    hero.style.setProperty('--py', '0px');
  });
})();

/* ===== Anti-chevauchement titre / objet 3D ===== */
function separateHeroItems(){
  const title  = $('.hero__left .display');
  const viewer = $('.viewer');
  if (!title || !viewer) return;

  viewer.style.marginLeft = '';
  viewer.style.setProperty('--viewer-scale', '1');

  if (window.innerWidth < 980) return;

  const tr = title.getBoundingClientRect();
  const vr = viewer.getBoundingClientRect();
  const padding = 24;

  if (tr.right > vr.left - padding) {
    const push = tr.right - vr.left + padding;
    viewer.style.marginLeft = push + 'px';

    const vr2 = viewer.getBoundingClientRect();
    if (tr.right > vr2.left - 12) {
      viewer.style.setProperty('--viewer-scale', '0.93');
    }
  }
}
const debounce = (fn, d=120) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),d); }; };
window.addEventListener('load', separateHeroItems);
window.addEventListener('resize', debounce(separateHeroItems));
document.fonts && document.fonts.ready && document.fonts.ready.then(separateHeroItems);


/* ===== Réalisations: YouTube switchers & carousels ===== */
function setYouTube(player, id, autoplay=true){
  if (!player || !id) return;
  const params = 'rel=0&modestbranding=1&playsinline=1' + (autoplay ? '&autoplay=1' : '');
  player.src = 'https://www.youtube.com/embed/' + id + '?' + params;
}

function setupMotion(){
  const block = document.querySelector('#realisations .motion');
  if (!block) return;
  const player = block.querySelector('#motionPlayer');
  const first = block.querySelector('.motion-list .video-thumb');
  const thumbs = block.querySelectorAll('.motion-list .video-thumb');
  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbs.forEach(b => b.classList.remove('is-selected')); btn.classList.add('is-selected');
      thumbs.forEach(b => b.setAttribute('aria-selected','false')); btn.setAttribute('aria-selected','true');
      setYouTube(player, btn.dataset.yt, true);
    });
  });
  if (first) setYouTube(player, first.dataset.yt, false);
}


function setup3D(){
  const block = document.querySelector('#realisations .threeD');
  if (!block) return;
  const main = block.querySelector('#threeDMain');
  const items = block.querySelectorAll('.carousel__item');
  const prev = block.querySelector('.carousel__prev');
  const next = block.querySelector('.carousel__next');
  const track = block.querySelector('.carousel__track');

  function select(btn, scrollInto=false){
    items.forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    const imgSrc = btn.dataset.img || (btn.querySelector('img') ? btn.querySelector('img').getAttribute('src') : '');
    const imgAlt = btn.querySelector('img') ? btn.querySelector('img').getAttribute('alt') : 'Aperçu 3D';
    if (main){
      main.src = imgSrc;
      main.alt = imgAlt;
    }
    if (scrollInto && track){
      const left = btn.offsetLeft - 20;
      track.scrollTo({ left, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  }

  items.forEach(btn => btn.addEventListener('click', () => select(btn, true)));
  if (items[0]) select(items[0], false);

  function scrollByDir(dir){
    const delta = Math.round(track.clientWidth * 0.9) * dir;
    track.scrollBy({ left: delta, behavior: prefersReduced ? 'auto' : 'smooth' });
  }
  if (prev) prev.addEventListener('click', () => scrollByDir(-1));
  if (next) next.addEventListener('click', () => scrollByDir(1));
}
document.addEventListener('DOMContentLoaded', () => {
  setupMotion();
  setup3D();
});
/* ===== I18N FR/EN ===== */
(() => {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);

  const dict = {
    fr: {
      // META / ARIA
      'meta.title': 'Portfolio – Quentin Person',
      'meta.desc' : 'Portfolio de Quentin Person – Motion design, 3D et Graphisme.',
      'aria.home': 'Accueil — Quentin Person',
      'aria.mainnav': 'Navigation principale',
      'aria.theme': 'Basculer mode sombre/clair',
      'aria.lang': 'Changer de langue',
      'hero.modelAlt': 'Objet 3D décoratif',
      'skip': 'Aller au contenu',

      // NAV
      'nav.about': 'Présentation',
      'nav.projects': 'Projets',
      'nav.works': 'Réalisations',
      'nav.contact': 'Contact',

      // HERO
      'hero.cta': 'Voir mes projets',
      'disc.motion': 'Motion design',
      'disc.3d': '3D',
      'disc.graphism': 'Graphisme',

      // ABOUT
      'about.h2': 'Présentation',
      'about.h2pseudo': 'Qui suis-je',
      'about.top.student': 'Quentin Person · Étudiant (BUT MMI – 3ᵉ année)',
      'about.top.passion': 'Passion : culture pop, 3D, animation, dessin',
      'about.hello': 'HELLO!',
      'about.paragraph': `Je m’appelle <strong>Quentin PERSON</strong>, j’ai <strong>21 ans</strong> et je suis en
      <strong>3ᵉ année de BUT MMI</strong>. J’ai des <strong>compétences pluridisciplinaires</strong>
      (graphisme, montage, UI, etc.) avec une <strong>spécialisation en motion design, 3D et animation</strong> — des
      domaines qui me passionnent. Curieux, nourri par la <strong>culture pop</strong> et le <strong>dessin</strong>,
      j’ai une vraie <strong>soif d’apprendre</strong> et de progresser projet après projet.`,

      'about.lang.title': 'Langues',
      'about.lang.fr': 'Français',
      'about.lang.fr-level': 'C2 · natif',
      'about.lang.en': 'Anglais',
      'about.lang.en-level': 'B2 · autonome',

      'skills.title': 'Compétences',
      'skills.soft.1': 'Rigueur',
      'skills.soft.2': 'Curiosité',
      'skills.soft.3': 'Collaboration',
      'skills.soft.4': 'Autonomie',

      'collapse.education': 'Parcours',
      'collapse.experience': 'Expérience',
      'collapse.tools': 'Outils',

      // SECTIONS
      'projects.title': 'Projets',
      'works.title': 'Mes réalisations',
      'works.motion': 'Motion',
      'works.personal': 'personnelles',
      'works.3d': '3D',
      'works.illus': 'Illustration & Graphisme',

      // CONTACT
      'contact.title': 'Contact',
      'contact.cta': 'Me contacter',
    },

    en: {
      // META / ARIA
      'meta.title': 'Portfolio – Quentin Person',
      'meta.desc' : 'Portfolio of Quentin Person — Motion design, 3D and graphic design.',
      'aria.home': 'Home — Quentin Person',
      'aria.mainnav': 'Main navigation',
      'aria.theme': 'Toggle dark/light mode',
      'aria.lang': 'Change language',
      'hero.modelAlt': 'Decorative 3D object',
      'skip': 'Skip to content',

      // NAV
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.works': 'Works',
      'nav.contact': 'Contact',

      // HERO
      'hero.cta': 'See my projects',
      'disc.motion': 'Motion design',
      'disc.3d': '3D',
      'disc.graphism': 'Graphic design',

      // ABOUT
      'about.h2': 'About',
      'about.h2pseudo': 'About me',
      'about.top.student': 'Quentin Person · Student (BUT MMI – Year 3)',
      'about.top.passion': 'Passions: pop culture, 3D, animation, drawing',
      'about.hello': 'HELLO!',
      'about.paragraph': `My name is <strong>Quentin PERSON</strong>, I’m <strong>21</strong> and currently in
      <strong>Year 3 of the BUT MMI</strong>. I have <strong>multidisciplinary skills</strong>
      (graphic design, editing, UI, etc.) with a <strong>focus on motion design, 3D and animation</strong> —
      fields I’m passionate about. Curious, fuelled by <strong>pop culture</strong> and <strong>drawing</strong>,
      I have a strong <strong>drive to learn</strong> and improve, project after project.`,

      'about.lang.title': 'Languages',
      'about.lang.fr': 'French',
      'about.lang.fr-level': 'C2 · native',
      'about.lang.en': 'English',
      'about.lang.en-level': 'B2 · independent user',

      'skills.title': 'Skills',
      'skills.soft.1': 'Rigor',
      'skills.soft.2': 'Curiosity',
      'skills.soft.3': 'Teamwork',
      'skills.soft.4': 'Autonomy',

      'collapse.education': 'Education',
      'collapse.experience': 'Experience',
      'collapse.tools': 'Tools',

      // SECTIONS
      'projects.title': 'Projects',
      'works.title': 'My work',
      'works.motion': 'Motion',
      'works.personal': 'personal',
      'works.3d': '3D',
      'works.illus': 'Illustration & Graphic Design',

      // CONTACT
      'contact.title': 'Contact',
      'contact.cta': 'Contact me',
    }
  };

  const map = [
    // Text nodes
    {sel: '.skip-link', key: 'skip'},
    {sel: 'nav.menu a[href="#about"]', key: 'nav.about'},
    {sel: 'nav.menu a[href="#projets"]', key: 'nav.projects'},
    {sel: 'nav.menu a[href="#realisations"]', key: 'nav.works'},
    {sel: 'nav.menu a[href="#contact"]', key: 'nav.contact'},
    {sel: '.cta .btn--primary', key: 'hero.cta'},
    {sel: '.disciplines .pill:nth-child(1)', key: 'disc.motion'},
    {sel: '.disciplines .pill:nth-child(2)', key: 'disc.3d'},
    {sel: '.disciplines .pill:nth-child(3)', key: 'disc.graphism'},

    // About titles
    {sel: '#aboutTitle', key: 'about.h2'},
    // pseudo-content via attribute
    {sel: '#aboutTitle', key: 'about.h2pseudo', attr: 'data-about-title'},

    // About top line
    {sel: '.about-topline .about-small.with-icon', key: 'about.top.student'},
    {sel: '.about-topline .about-small.right', key: 'about.top.passion'},

    // About paragraph with HTML
    {sel: '.about-paragraph', key: 'about.paragraph', html: true},

    // Info cards
    {sel: '.lang-card .info-title', key: 'about.lang.title'},
    {sel: '.lang-card .lang:nth-child(1) .lang-name', key: 'about.lang.fr'},
    {sel: '.lang-card .lang:nth-child(1) .lang-level', key: 'about.lang.fr-level'},
    {sel: '.lang-card .lang:nth-child(2) .lang-name', key: 'about.lang.en'},
    {sel: '.lang-card .lang:nth-child(2) .lang-level', key: 'about.lang.en-level'},

    {sel: '.skills-card .info-title', key: 'skills.title'},

    // Soft skills
    {sel: '.softskills li:nth-child(1)', key: 'skills.soft.1'},
    {sel: '.softskills li:nth-child(2)', key: 'skills.soft.2'},
    {sel: '.softskills li:nth-child(3)', key: 'skills.soft.3'},
    {sel: '.softskills li:nth-child(4)', key: 'skills.soft.4'},

    // Collapses (headers labels)
    {sel: '.about-row2 .collapse:nth-of-type(1) .info-title', key: 'collapse.education'},
    {sel: '.about-row2 .collapse:nth-of-type(2) .info-title', key: 'collapse.experience'},
    {sel: '.about-row2 .collapse:nth-of-type(3) .info-title', key: 'collapse.tools'},

    // Section titles
    {sel: '#projectsTitle', key: 'projects.title'},
    {sel: '#worksTitle', key: 'works.title'},
    {sel: '.work-block.motion .work-head h3', key: 'works.motion'},
    {sel: '.work-block.motion .work-tag', key: 'works.personal'},
    {sel: '.work-block.threeD .work-head h3', key: 'works.3d'},
    {sel: '.work-block.illus .work-head h3', key: 'works.illus'},

    // Contact
    {sel: '#contactTitle', key: 'contact.title'},
    {sel: '#contact .btn--primary', key: 'contact.cta'},
  ];

  const attrMap = [
    {sel: 'a.brand', attr: 'aria-label', key: 'aria.home'},
    {sel: 'nav.menu', attr: 'aria-label', key: 'aria.mainnav'},
    {sel: '#themeSwitch', attr: 'aria-label', key: 'aria.theme'},
    {sel: '.lang-switch', attr: 'aria-label', key: 'aria.lang'},
    {sel: '#side-object', attr: 'alt', key: 'hero.modelAlt'},
  ];

  function applyLang(lang){
    const t = (k) => (dict[lang] && dict[lang][k]) ?? (dict.fr[k] ?? '');

    // html[lang]
    document.documentElement.setAttribute('lang', lang);

    // Title + meta
    document.title = t('meta.title');
    const mDesc = document.querySelector('meta[name="description"]');
    if (mDesc) mDesc.setAttribute('content', t('meta.desc'));
    const mOgDesc = document.querySelector('meta[property="og:description"]');
    if (mOgDesc) mOgDesc.setAttribute('content', t('meta.desc'));

    // Text nodes
    map.forEach(({sel, key, html, attr}) => {
      const el = $(sel);
      if (!el) return;
      const val = t(key);
      if (attr) { el.setAttribute(attr, val); return; }
      if (html) { el.innerHTML = val; }
      else { el.textContent = val; }
    });

    // Attributes
    attrMap.forEach(({sel, attr, key}) => {
      const el = $(sel); if (!el) return;
      el.setAttribute(attr, t(key));
    });

    // Toggle button states
    document.querySelectorAll('.btn-lang').forEach(b=>{
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  function setLang(lang){
    localStorage.setItem('lang', lang);
    applyLang(lang);
  }

  // Init
  const saved = localStorage.getItem('lang');
  const initial = saved || (document.documentElement.getAttribute('lang') || 'fr').startsWith('en') ? 'en' : 'fr';
  applyLang(initial);

  // Events
  document.querySelectorAll('.btn-lang').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });
})();
/* ===== Lightbox Illustrations ===== */
(() => {
  const box = document.getElementById('lightbox');
  if(!box) return;
  const img = box.querySelector('.lightbox__img');
  const closeBtn = box.querySelector('.lightbox__close');

  function open(src, alt=''){
    img.src = src; img.alt = alt;
    box.classList.add('is-open');
    box.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    img.src = ''; img.alt = '';
  }

  document.querySelectorAll('.gallery-grid a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const src = a.getAttribute('href');
      const alt = a.querySelector('img')?.alt || '';
      open(src, alt);
    });
  });

  closeBtn.addEventListener('click', close);
  box.addEventListener('click', (e)=>{ if(e.target === box) close(); });
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
})();
/* ===== Masonry auto-span pour la galerie Illustrations ===== */
(() => {
  const grid = document.querySelector('.section.works .gallery-grid');
  if (!grid) return;

  function getNumber(v){ return parseFloat(String(v).replace('px','')) || 0; }

  function spanItem(item){
    const img = item.querySelector('img');
    if (!img) return;
    const gridStyles = getComputedStyle(grid);
    const rowH = getNumber(gridStyles.getPropertyValue('grid-auto-rows')) || 8;
    const gap  = getNumber(gridStyles.getPropertyValue('gap'));
    const itemStyles = getComputedStyle(item);

    // hauteur réelle du contenu (image) + bordures intérieures (ici 0)
    const h = img.getBoundingClientRect().height
            + getNumber(itemStyles.paddingTop)
            + getNumber(itemStyles.paddingBottom);

    const span = Math.ceil((h + gap) / (rowH + gap));
    item.style.gridRowEnd = `span ${span}`;
  }

  function relayout(){
    grid.querySelectorAll('.gallery-item').forEach(spanItem);
  }

  // recalcul au chargement des images + au resize
  grid.querySelectorAll('img').forEach(img => {
    if (img.complete) spanItem(img.closest('.gallery-item'));
    else img.addEventListener('load', () => spanItem(img.closest('.gallery-item')));
  });

  window.addEventListener('resize', (typeof debounce === 'function')
    ? debounce(relayout, 120)
    : relayout
  );

  // première passe
  relayout();
})();
/* ===== HERO : ARIA quand on masque l'objet 3D sur petits écrans ===== */
(function(){
  const mv = document.getElementById('side-object');
  const right = document.querySelector('.hero__right');
  if(!mv || !right) return;
  const mm = window.matchMedia('(max-width: 540px)');
  const update = () => {
    const hide = mm.matches;
    right.setAttribute('aria-hidden', String(hide));
    mv.setAttribute('aria-hidden', String(hide));
  };
  update();
  mm.addEventListener('change', update);
})();

/* ===== Works : injecter un bouton Hide/Show sur chaque bloc ===== */
(function(){
  const blocks = document.querySelectorAll('.section.works .work-block');
  if(!blocks.length) return;

  // utilitaire animation (même logique que tes accordéons)
  function setOpen(block, body, open){
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    block.classList.toggle('is-collapsed', !open);

    if (prefersReduced){ body.style.height = open ? 'auto' : '0px'; return; }

    if (open){
      body.style.display = 'block';
      const h = body.scrollHeight;
      body.style.height = '0px';
      requestAnimationFrame(()=>{ body.style.height = h + 'px'; });
      body.addEventListener('transitionend', function te(e){
        if (e.propertyName === 'height'){ body.style.height = 'auto'; body.removeEventListener('transitionend', te); }
      });
    }else{
      const h = body.scrollHeight;
      body.style.height = h + 'px';
      requestAnimationFrame(()=>{ body.style.height = '0px'; });
    }
  }

  function label(open){
    const en = (document.documentElement.getAttribute('lang') || 'fr').startsWith('en');
    return {
      text: open ? (en ? 'Hide' : 'Masquer') : (en ? 'Show' : 'Afficher'),
      aria: open ? (en ? 'Hide section' : 'Masquer la section') : (en ? 'Show section' : 'Afficher la section')
    };
  }

  blocks.forEach(block=>{
    const head = block.querySelector('.work-head');
    if(!head) return;

    // 1) créer un wrapper .work-body et y déplacer tout le contenu sauf .work-head
    const body = document.createElement('div');
    body.className = 'work-body';
    const toMove = [];
    for (let n = head.nextSibling; n; n = n.nextSibling) toMove.push(n);
    toMove.forEach(n => body.appendChild(n));
    block.appendChild(body);
    body.style.height = 'auto';

    // 2) ajouter le bouton
    const btn = document.createElement('button');
    btn.className = 'work-toggle';
    btn.setAttribute('type','button');
    btn.setAttribute('aria-expanded','true');
    btn.innerHTML = `
      <svg class="ico on" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12 18 19.5 12 19.5 1.5 12 1.5 12Z" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/>
      </svg>
      <svg class="ico off" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 2l20 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M3 7s4.5-3 9-3 9 3 9 3M6 19s3 2 7 2 7-2 7-2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
      <span class="txt"></span>
    `;
    head.appendChild(btn);

    // 3) état initial + interactions
    const setText = () => {
      const open = !block.classList.contains('is-collapsed');
      const t = label(open);
      btn.querySelector('.txt').textContent = t.text;
      btn.setAttribute('aria-label', t.aria);
      btn.setAttribute('aria-expanded', String(open));
    };

    btn.addEventListener('click', ()=>{
      const open = !block.classList.contains('is-collapsed');
      setOpen(block, body, !open);
      setText();
    });

    // init
    setText();
  });
})();
