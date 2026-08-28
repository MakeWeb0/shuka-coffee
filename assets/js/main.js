/* =========================================================
   SHUKA COFFEE · main.js
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.prototype.slice.call((c || document).querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COARSE  = window.matchMedia('(hover: none), (pointer: coarse)').matches;

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

  /* ---------- portada: los tres vídeos ---------- */
  const videos = $$('.hero__videos video');
  /* Con reduced-motion se congelan en su póster. Y si el navegador
     bloquea el autoplay pese al muted, no pasa nada: el póster ya es
     un fotograma del propio vídeo. */
  videos.forEach(v => {
    v.muted = true;                 /* algunos navegadores lo exigen por JS */
    if (REDUCED) { v.removeAttribute('autoplay'); v.pause(); return; }
    const play = v.play();
    if (play && play.catch) play.catch(() => {});
  });

  /* no gastar batería con la portada fuera de pantalla */
  if (!REDUCED && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) { const p = e.target.play(); if (p && p.catch) p.catch(() => {}); }
        else e.target.pause();
      });
    }, { threshold: 0 });
    videos.forEach(v => io.observe(v));
  }

  (function raf(now) {
    if (lenis) lenis.raf(now);
    requestAnimationFrame(raf);
  })(performance.now());

  /* ---------- entrada ---------- */
  function enter() {
    const tl = gsap.timeline();
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
  } else {
    let started = false;
    const start = () => { if (!started) { started = true; enter(); } };
    /* en cuanto el primer vídeo tenga imagen; y un tope por si falla */
    if (videos[0]) videos[0].addEventListener('loadeddata', start, { once: true });
    setTimeout(start, 1600);
  }

  /* ---------- nav ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
  ['.local__lead .eyebrow', '.local__lead p', '.claim p', '.carta__head',
   '.visita h2', '.info > div', '.visita__cta', '.foot__mark'].forEach(rise);

  /* ---------- El local ----------------------------------------------
     El titular sale línea a línea desde detrás de una máscara, los dos
     arcos se abren de abajo arriba y sus fotos van más lentas que el
     marco al desplazar. Todo se rearma al cambiar de idioma, porque el
     diccionario reescribe el innerHTML del titular. */
  const local = (function () {
    let tweens = [];

    /* Parte el h2 por sus <br> y envuelve cada línea en su máscara.
       Guarda el original en data-raw; el diccionario lo borra al cambiar
       de idioma, y así aquí se vuelve a leer el texto nuevo en vez de
       repintar el viejo. */
    function splitLines(el) {
      if (!el) return [];
      if (!el.dataset.raw) el.dataset.raw = el.innerHTML;
      const html = el.dataset.raw;
      el.innerHTML = html.split(/<br\s*\/?>/i)
        .map(l => '<span class="line"><span>' + l + '</span></span>').join('');
      return $$('.line > span', el);
    }

    function build() {
      tweens.forEach(t => { t.scrollTrigger && t.scrollTrigger.kill(); t.kill && t.kill(); });
      tweens = [];

      const h2 = $('.local__lead h2');
      const lines = splitLines(h2);
      if (REDUCED) { gsap.set(lines, { yPercent: 0 }); return; }

      tweens.push(gsap.from(lines, {
        yPercent: 118, duration: 1.15, ease: 'expo.out', stagger: .085,
        scrollTrigger: { trigger: h2, start: 'top 86%', once: true }
      }));

      $$('.arch').forEach((arch, i) => {
        const frame = $('.arch__frame', arch);
        const img = $('img', arch);
        const cap = $('figcaption', arch);

        /* el arco se abre y la foto se asienta a la vez */
        const tl = gsap.timeline({ scrollTrigger: { trigger: arch, start: 'top 84%', once: true } });
        tl.fromTo(frame,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'expo.inOut' })
          .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0)
          .fromTo(cap, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8, ease: 'power2.out' }, .45)
          /* el filete del pie se dibuja de izquierda a derecha */
          .fromTo(cap, { '--draw': 0 }, { '--draw': 1, duration: .9, ease: 'power2.out' }, .6);
        tweens.push(tl);

        /* parallax: la foto recorre el excedente del marco */
        tweens.push(gsap.fromTo(img,
          { yPercent: -7 },
          {
            yPercent: 7, ease: 'none',
            scrollTrigger: { trigger: arch, start: 'top bottom', end: 'bottom top', scrub: .6 }
          }));

        if (!COARSE) {
          const q = gsap.quickTo(img, 'scale', { duration: .9, ease: 'power3' });
          arch.addEventListener('mouseenter', () => q(1.05));
          arch.addEventListener('mouseleave', () => q(1));
        }

        /* Las dos columnas se separan un punto más al bajar. Apiladas
           en móvil no tiene sentido: solo cuando van una al lado de la otra. */
        if (window.matchMedia('(min-width: 721px)').matches) {
          tweens.push(gsap.fromTo(arch,
            { y: 0 },
            {
              y: i === 0 ? -34 : 34, ease: 'none',
              scrollTrigger: { trigger: '.local__pair', start: 'top bottom', end: 'bottom top', scrub: .8 }
            }));
        }
      });
    }

    build();
    return { rebuild: build };
  })();

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
    /* data-raw si lo hay: el titular del local ya viene troceado en líneas */
    $$('[data-i18n-html]').forEach(el => ES[el.dataset.i18nHtml] = el.dataset.raw || el.innerHTML);
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
        if (v === undefined) return;
        el.innerHTML = v;
        delete el.dataset.raw;      /* para que se vuelva a trocear */
      });
      document.documentElement.lang = l;
      $$('#lang span').forEach((s, i) => s.classList.toggle('is-on', (i === 0) === (l === 'es')));
      carta.setLang && carta.setLang(l);
      local.rebuild && local.rebuild();
      ScrollTrigger.refresh();
    }
    btn.addEventListener('click', () => apply(lang === 'es' ? 'en' : 'es'));
  })();

  $('#year').textContent = new Date().getFullYear();
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
