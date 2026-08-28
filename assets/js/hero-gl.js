/* =========================================================
   SHUKA COFFEE · Portada WebGL — "el espejo"
   El espejo de mimbre que cuelga en la sala, dibujado varilla a
   varilla, sobre el marrón de la marca (#412E27, el mismo de su
   feed). Dentro se refleja la barra y dos focos cálidos cruzan
   el fondo muy despacio.
   ========================================================= */
(function () {
  'use strict';

  const VERT = `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    #define PI 3.14159265359

    uniform float uTime, uScroll, uReveal, uReady, uTexAspect;
    uniform vec3  uMirror;            /* x: radio del cristal · y: centro Y · z: vuelo de las varillas */
    uniform vec2  uRes, uMouse;
    uniform sampler2D uInside;
    varying vec2  vUv;

    /* --- ruido para el veteado del travertino --- */
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float vnoise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
                 mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++){ v += a * vnoise(p); p *= 2.03; a *= 0.5; }
      return v;
    }

    /* --- una corona de varillas ---------------------------------
       En vez de dibujar cien segmentos, se trabaja en polares: el
       ángulo se parte en N ranuras y cada ranura lleva una varilla,
       con su largo y su desvío propios. Sale O(1) por píxel.
       Devuelve: x cobertura · y avance hacia la punta · z semilla   */
    vec3 wicker(float rad, float ang, float R, float N, float ext, float seed){
      float a  = (ang + PI) / (2.0 * PI) * N;
      float ai = mod(floor(a), N);
      float af = a - floor(a);

      float h1 = hash(vec2(ai, seed));
      float h2 = hash(vec2(ai, seed + 3.7));

      float base  = R * 0.94;
      float outer = base + R * ext * mix(0.30, 1.0, h1);   /* largos muy dispares */
      float t = (rad - base) / max(outer - base, 1e-4);
      if (t < 0.0 || t > 1.0) return vec3(0.0);

      float halfw = mix(0.34, 0.10, t);          /* la varilla afina hacia la punta */
      float wob   = (h2 - 0.5) * 0.30;
      float curve = (h1 - 0.5) * 0.22 * t;       /* no salen del todo rectas */
      float da = abs(af - (0.5 + wob + curve));
      float c = 1.0 - smoothstep(halfw * 0.45, halfw, da);
      c *= 1.0 - smoothstep(0.86, 1.0, t);
      return vec3(c, t, h1);
    }

    void main(){
      float aspect = uRes.x / max(uRes.y, 1.0);
      vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
      float px = 1.4 / uRes.y;                     /* un pixel, para los bordes */

      float R  = uMirror.x;
      float cy = uMirror.y;
      float ext = uMirror.z;
      vec2  q  = p - vec2(0.0, cy);
      float rad = length(q);
      float ang = atan(q.y, q.x);

      /* ---------- el fondo: el marrón de la marca ---------- */
      vec3 brown = vec3(0.255, 0.180, 0.153);      /* #412E27 */
      vec3 deep  = vec3(0.176, 0.118, 0.098);      /* el mismo, en sombra */

      /* apenas una veladura, para que el plano no salga muerto */
      float mottle = fbm(p * vec2(2.6, 3.4));
      vec3 col = mix(brown, deep, mottle * 0.22);

      /* dos focos cálidos cruzando el fondo muy despacio */
      vec2 l1 = vec2(-0.46 + sin(uTime * 0.043) * 0.05, 0.40);
      vec2 l2 = vec2( 0.50 + cos(uTime * 0.037) * 0.05, 0.30);
      float lit = exp(-dot(p - l1, p - l1) * 4.2) + exp(-dot(p - l2, p - l2) * 5.0);
      col += vec3(0.090, 0.060, 0.030) * lit;

      /* el bajo cae un poco */
      col *= 1.0 - smoothstep(0.05, 0.62, -p.y) * 0.14;

      /* sombra del espejo, caída hacia abajo-derecha */
      float shad = 1.0 - smoothstep(R * 0.85, R * (1.05 + ext), length(q - vec2(0.018, -0.020)));
      col *= 1.0 - shad * 0.16;

      /* ---------- el cristal ---------- */
      vec2 c = q / (2.0 * R);
      float ra = 1.0 / max(uTexAspect, 1e-4);
      if (ra > 1.0) c.y /= ra; else c.x *= ra;
      c += uMouse * 0.028;                          /* el reflejo se mueve un poco */
      c.y += uScroll * 0.05;

      vec3 refl = texture2D(uInside, clamp(c + 0.5, 0.001, 0.999)).rgb;
      refl = mix(vec3(dot(refl, vec3(0.299, 0.587, 0.114))), refl, 0.88);
      refl = refl * 1.02 + 0.008;
      refl = mix(deep * 1.25, refl, uReady);        /* mientras carga: cristal apagado */

      refl *= mix(0.74, 1.0, smoothstep(R, R * 0.78, rad));         /* sombra del bisel */
      float sheen = smoothstep(0.30, -0.20, (q.x * 0.7 + q.y) / R); /* brillo diagonal */
      refl += vec3(0.10, 0.10, 0.095) * sheen * 0.32;

      float disc = 1.0 - smoothstep(R - px * 1.5, R, rad);
      col = mix(col, refl, disc);

      float ring = smoothstep(px * 1.7, 0.0, abs(rad - R));
      col = mix(col, vec3(0.145, 0.098, 0.082), ring * 0.55);

      /* ---------- las varillas de mimbre ---------- */
      vec3 w1 = wicker(rad, ang, R, 158.0, ext, 1.0);
      vec3 w2 = wicker(rad, ang, R,  97.0, ext * 0.55, 11.0);
      float cover = max(w1.x, w2.x);
      vec3  wsel  = w1.x >= w2.x ? w1 : w2;

      /* sobre el marrón, el mimbre tiene que encender: crema y tostado */
      vec3 twig = mix(vec3(0.478, 0.396, 0.322), vec3(0.906, 0.855, 0.788),
                      wsel.y * 0.45 + wsel.z * 0.55);
      twig *= 0.82 + 0.24 * cos(ang - 2.25);        /* luz desde arriba-izquierda */
      col = mix(col, twig, cover);

      /* viñeta muy leve para asentar el encuadre */
      col *= 1.0 - smoothstep(0.50, 1.25, length(p * vec2(0.82, 1.0))) * 0.16;

      col = mix(brown, col, uReveal);

      col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const Hero = {
    ok: false,

    init(canvas, imgUrl) {
      if (!canvas || typeof THREE === 'undefined') return false;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
      } catch (e) { return false; }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      this.uniforms = {
        uTime:      { value: 0 },
        uScroll:    { value: 0 },
        uReveal:    { value: 0 },
        uReady:     { value: 0 },
        uTexAspect: { value: 0.75 },
        uMirror:    { value: new THREE.Vector3(0.16, -0.045, 0.90) },
        uRes:       { value: new THREE.Vector2(1, 1) },
        uMouse:     { value: new THREE.Vector2(0, 0) },
        uInside:    { value: new THREE.Texture() }
      };

      const scene = new THREE.Scene();
      scene.add(new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: this.uniforms })
      ));

      this.renderer = renderer;
      this.scene = scene;
      this.camera = new THREE.Camera();
      this.canvas = canvas;
      this.mouse = new THREE.Vector2(0, 0);
      this.target = new THREE.Vector2(0, 0);
      this.visible = true;
      this.ok = true;

      this.resize();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('pointermove', (e) => {
        this.target.set(e.clientX / window.innerWidth - 0.5,
                        0.5 - e.clientY / window.innerHeight);
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(es => { this.visible = es[0].isIntersecting; }, { threshold: 0 })
          .observe(canvas);
      }

      new THREE.TextureLoader().load(imgUrl, (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        this.uniforms.uInside.value = tex;
        this.uniforms.uTexAspect.value = tex.image.width / tex.image.height;
        gsap.to(this.uniforms.uReady, { value: 1, duration: 1.1, ease: 'power2.out' });
        if (this.onTexture) this.onTexture();
      }, undefined, () => { if (this.onTexture) this.onTexture(); });

      return true;
    },

    resize() {
      if (!this.ok) return;
      const r = this.canvas.getBoundingClientRect();
      const w = Math.max(r.width, 1), h = Math.max(r.height, 1);
      this.renderer.setSize(w, h, false);
      this.uniforms.uRes.value.set(w * this.renderer.getPixelRatio(), h * this.renderer.getPixelRatio());

      /* El espejo se mide por fuera, con las varillas incluidas: así nunca
         se sale por los lados y el rótulo siempre encuentra sitio encima. */
      const aspect = w / h;
      const narrow = aspect < 0.95;
      const ext = 0.62;                          /* vuelo de las varillas, en radios */
      const outer = Math.min(narrow ? 0.250 : 0.300, 0.46 * aspect);
      const R  = outer / (0.94 + ext);
      const cy = narrow ? -0.030 : -0.045;

      this.uniforms.uMirror.value.set(R, cy, ext);

      this._rect = {
        left:   w * 0.5 - outer * h,
        width:  2 * outer * h,
        top:    h * (0.5 - cy - outer),
        height: 2 * outer * h,
        radius: R * h
      };
    },

    /* Caja del espejo en píxeles CSS, para colocar el rótulo justo encima. */
    frameRect() { return this._rect || null; },

    setScroll(v) { if (this.ok) this.uniforms.uScroll.value = v; },
    setReveal(v) { if (this.ok) this.uniforms.uReveal.value = v; },

    tick(dt) {
      if (!this.ok || !this.visible) return;
      this.uniforms.uTime.value += dt;
      this.mouse.lerp(this.target, 0.035);
      this.uniforms.uMouse.value.copy(this.mouse);
      this.renderer.render(this.scene, this.camera);
    }
  };

  window.ShukaHero = Hero;
})();
