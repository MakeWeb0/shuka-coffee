/* =========================================================
   SHUKA COFFEE · main.js
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- scroll suave ---------- */
  let lenis = null;
  if (!REDUCED && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.5 });
    lenis.on('scroll', ScrollTrigger.update);
  }
  const goTo = (el) => {
    if (lenis) lenis.scrollTo(el, { offset: -56, duration: 1.15 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ---------- portada WebGL ---------- */
  const heroOk = window.ShukaHero && window.ShukaHero.init($('#heroGl'), 'assets/img/barra.webp');
  if (!heroOk && $('#heroGl')) $('#heroGl').style.display = 'none';

  /* El rótulo se cuelga justo encima del espejo: se coloca en píxeles
     porque es el shader quien sabe dónde ha quedado la corona de mimbre. */
  const sign = $('.hero__sign'), mark = $('.hero__mark');

  function placeSign() {
    const r = heroOk && window.ShukaHero.frameRect();
    if (!r) return;
    $('.hero').classList.add('is-gl');
    const gap = Math.max(20, Math.min(44, r.height * 0.10));
    const top = Math.max(r.top - sign.offsetHeight - gap, 84);
    sign.style.top = top + 'px';
  }
  window.addEventListener('resize', placeSign);
  if (!mark.complete) mark.addEventListener('load', placeSign);
  placeSign();

  let last = performance.now();
  (function raf(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (lenis) lenis.raf(now);
    if (heroOk) window.ShukaHero.tick(dt);
    requestAnimationFrame(raf);
  })(last);

  /* ---------- entrada ---------- */
  function enter() {
    const tl = gsap.timeline();
    if (heroOk) {
      tl.to({ v: 0 }, {
        v: 1, duration: 1.5, ease: 'power2.inOut',
        onUpdate: function () { window.ShukaHero.setReveal(this.targets()[0].v); }
      }, 0);
    }
    tl.to('#veil', {
        opacity: 0, duration: 1.0, ease: 'power2.inOut',
        onComplete: () => gsap.set('#veil', { display: 'none' })
      }, 0)
      .fromTo('.nav', { opacity: 0 }, { opacity: 1, duration: .9, ease: 'power2.out' }, .35)
      .to('.hero__sign', { opacity: 1, duration: 1.1, ease: 'power2.out' }, .6)
      .from('.hero__sign', { y: 16, duration: 1.1, ease: 'expo.out' }, .6)
      .fromTo('.hero__cue', { opacity: 0 }, { opacity: .45, duration: .9, ease: 'power2.out' }, 1.0);
  }

  if (REDUCED) {
    gsap.set('#veil', { display: 'none' });
    gsap.set('.hero__sign', { opacity: 1 });
    gsap.set('.hero__cue', { opacity: .45 });
    heroOk && window.ShukaHero.setReveal(1);
  } else if (heroOk) {
    let started = false;
    const start = () => { if (!started) { started = true; enter(); } };
    window.ShukaHero.onTexture = start;
    setTimeout(start, 2200);            /* por si la imagen tarda o falla */
  } else {
    enter();
  }

  /* ---------- nav ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (heroOk) {
    ScrollTrigger.create({
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true,
      onUpdate: s => window.ShukaHero.setScroll(s.progress)
    });
  }

  /* fromTo con immediateRender:false — si no, GSAP graba el opacity:0 del CSS
     como valor de partida y el rótulo se apaga al primer scroll. */
  gsap.fromTo('.hero__sign',
    { y: 0, opacity: 1 },
    {
      y: 70, opacity: 0, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '75% top', scrub: true }
    });
  gsap.fromTo('.hero__cue',
    { opacity: .45 },
    {
      opacity: 0, ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '25% top', scrub: true }
    });

  $$('main section[id]').forEach(sec => {
    const link = $('.nav__links a[href="#' + sec.id + '"]');
    if (!link) return;
    ScrollTrigger.create({
      trigger: sec, start: 'top 45%', end: 'bottom 45%',
      onToggle: s => link.classList.toggle('is-current', s.isActive)
    });
  });

  /* ---------- menú móvil ---------- */
  const overlay = $('#overlay'), burger = $('#burger');
  let menuOpen = false;
  const ovTl = gsap.timeline({ paused: true })
    .set(overlay, { visibility: 'visible' })
    .to(overlay, { clipPath: 'inset(0 0 0% 0)', duration: .7, ease: 'expo.inOut' })
    .fromTo('.overlay__nav a', { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: .7, stagger: .06, ease: 'expo.out' }, '-=0.35')
    .fromTo('.overlay__foot', { opacity: 0 }, { opacity: 1, duration: .6 }, '-=0.4');

  function toggleMenu(open) {
    menuOpen = open;
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    if (open) { ovTl.play(); lenis && lenis.stop(); }
    else { ovTl.reverse(); lenis && lenis.start(); }
  }
  burger.addEventListener('click', () => toggleMenu(!menuOpen));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) toggleMenu(false); });

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const t = id !== '#' && $(id);
      if (!t) return;
      e.preventDefault();
      if (menuOpen) { toggleMenu(false); setTimeout(() => goTo(t), 480); }
      else goTo(t);
    });
  });

  /* ---------- revelados ---------- */
  function rise(sel) {
    $$(sel).forEach(el => {
      el.setAttribute('data-rise', '');
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
  }
  ['.local__lead .eyebrow', '.local__lead h2', '.local__lead p', '.arch', '.claim p', '.carta__head',
   '.visita h2', '.info > div', '.visita__cta', '.foot__mark'].forEach(rise);

  /* ---------- carta ---------- */
  const carta = (function () {
    const list = $('#cartaList'), tabs = $('#cartaTabs');
    if (!list) return {};
    let lang = 'es', current = 'cafe';

    const esc = t => String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    /* Un grupo por subsección de la carta real (Cafés, Infusiones eco…).
       Los platos numerados —las tostas especiales— llevan el número como
       nombre, así que ahí la descripción es lo que hay que destacar. */
    function group(g) {
      const t = lang === 'en' ? g.t_en : g.t_es;
      const n = lang === 'en' ? g.n_en : g.n_es;
      const x = lang === 'en' ? g.x_en : g.x_es;

      const items = (g.items || []).map(it => {
        const name = lang === 'en' ? it.en : it.es;
        const desc = lang === 'en' ? it.d_en : it.d_es;
        const num  = /^\d+$/.test(name);
        return '<div class="item' + (num ? ' item--num' : '') + '">' +
                 '<span class="item__name">' + esc(name) + '</span>' +
                 '<span class="item__price">' + esc(it.p) + ' &euro;</span>' +
                 (desc ? '<span class="item__desc">' + esc(desc) + '</span>' : '') +
               '</div>';
      }).join('');

      return '<section class="group">' +
               '<h3 class="group__title">' + esc(t) + '</h3>' +
               (n ? '<p class="group__note">' + esc(n) + '</p>' : '') +
               '<div class="group__items">' + items + '</div>' +
               (x ? '<p class="group__extras">' + esc(x) + '</p>' : '') +
             '</section>';
    }

    function render(cat, l) {
      current = cat || current;
      lang = l || lang;
      const groups = (window.SHUKA_MENU || {})[current] || [];
      list.innerHTML = groups.map(group).join('');
      gsap.fromTo($$('.group', list), { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: .55, stagger: .06, ease: 'power2.out' });
    }

    tabs.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b || b.classList.contains('is-active')) return;
      $$('button', tabs).forEach(x => {
        x.classList.remove('is-active');
        x.setAttribute('aria-selected', 'false');
      });
      b.classList.add('is-active');
      b.setAttribute('aria-selected', 'true');
      render(b.dataset.tab);
      ScrollTrigger.refresh();
    });

    render('cafe', 'es');
    return { setLang: l => render(null, l) };
  })();

  /* ---------- idioma ---------- */
  (function i18n() {
    const btn = $('#lang');
    const ES = {};
    $$('[data-i18n]').forEach(el => ES[el.dataset.i18n] = el.textContent);
    $$('[data-i18n-html]').forEach(el => ES[el.dataset.i18nHtml] = el.innerHTML);
    const EN = window.SHUKA_EN || {};
    let lang = 'es';

    function apply(l) {
      lang = l;
      const dict = l === 'en' ? EN : ES;
      $$('[data-i18n]').forEach(el => {
        const v = dict[el.dataset.i18n];
        if (v !== undefined) el.textContent = v;
      });
      $$('[data-i18n-html]').forEach(el => {
        const v = dict[el.dataset.i18nHtml];
        if (v !== undefined) el.innerHTML = v;
      });
      document.documentElement.lang = l;
      $$('#lang span').forEach((s, i) => s.classList.toggle('is-on', (i === 0) === (l === 'es')));
      carta.setLang && carta.setLang(l);
      placeSign();
      ScrollTrigger.refresh();
    }
    btn.addEventListener('click', () => apply(lang === 'es' ? 'en' : 'es'));
  })();

  $('#year').textContent = new Date().getFullYear();
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => { placeSign(); ScrollTrigger.refresh(); });
})();
