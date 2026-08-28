# Shuka Coffee — Elche

Una sola página, sin build ni dependencias externas: se sube tal cual a cualquier hosting estático
(Netlify, Vercel, Hostinger, un FTP). Librerías, tipografía e imágenes van dentro de la carpeta, así
que no hace ni una petición a terceros — funciona sin conexión y evita el lío del RGPD con Google Fonts.

## Cómo verla

```
python -m http.server 5599
```

y abrir <http://localhost:5599>. (Doble clic en `index.html` también funciona, pero con servidor se ve
exactamente como en producción.)

## De dónde sale el diseño

**La base es su Instagram, no el local.** El feed de @shuka_coffee son dos colores: marrón chocolate y
blanco roto. El marrón es exactamente `#412E27` (muestreado del post del logotipo, ocupa el 94 % del
píxel). La web **alterna los dos por bloques**, que es como funcionan sus publicaciones:

| Bloque | Fondo |
|---|---|
| Portada | marrón |
| El local | blanco roto |
| «If this is your vibe…» | marrón |
| Carta | blanco roto |
| Visítanos | marrón |
| Pie | marrón hondo |

Cada bloque lleva la clase `t-dark` o `t-light` y de ahí salen, por variables, el color de texto, los
filetes, el acento y hasta los botones: para cambiar el orden de la alternancia solo hay que cambiar
esa clase en el HTML, no tocar una sola regla de CSS.

- **Marrón `#412E27`** y **blanco roto `#F7F3ED`**: los dos fondos.
- **Crema `#F4EFE8`** sobre marrón; el propio marrón hace de texto sobre blanco.
- **Acento**: tostado `#C2A78F` en los bloques oscuros, bronce del logo `#99806E` en los claros.
- **El espejo de mimbre** de la sala es la portada, dibujado varilla a varilla sobre el marrón.
- **El arco** de las hornacinas es el recurso de las fotos del bloque «El local».
- Los textos grandes son suyos: *Chic, elegant, classy.* y *If this is your vibe, this is your place.*

Tipografía, siguiendo sus posts:

- **Bodoni Moda itálica** para los titulares — la didone de alto contraste que usan en las piezas de
  Instagram, apilada y con interlineado muy corto.
- **Jost** (200–500) para navegación, carta y textos de apoyo.
- La palabra «Shuka» siempre es el logotipo real en imagen, nunca una fuente imitándolo.

| | |
|---|---|
| Marrón de marca | `#412E27` |
| Marrón hondo (pie y menú) | `#38261F` |
| Blanco roto | `#F7F3ED` |
| Crema (texto sobre marrón) | `#F4EFE8` |
| Tostado (acento en oscuro) | `#C2A78F` |
| Bronce del logotipo (acento en claro) | `#99806E` |

## Estructura

```
index.html                 markup y textos en español
assets/css/fonts.css       Jost y Bodoni Moda itálica (variables, 4 woff2 locales)
assets/css/style.css       todo el diseño · la paleta está en :root
assets/js/data.js          ← CARTA Y TRADUCCIONES: el único archivo a editar
assets/js/hero-gl.js       portada WebGL (el muro de travertino y el espejo de mimbre)
assets/js/main.js          scroll, entrada, menú, pestañas, idioma
assets/vendor/             gsap, ScrollTrigger, lenis y three, servidos en local
assets/brand/              logotipo en dos colores, badge y favicons
assets/img/                barra · sala · rincón
```

## La portada

Es un shader: sobre el marrón de la marca cuelga **el espejo de mimbre**, el mismo que tienen en la sala.
En el cristal se refleja la barra; alrededor, dos coronas de varillas dibujadas de una en una, cada una
con su largo, su desvío y su curvatura, para que la silueta salga irregular como la de verdad — y en
crema, para que enciendan sobre el marrón. Dos focos cálidos cruzan el fondo muy despacio, el espejo
proyecta su sombra y el reflejo se mueve un poco con el ratón.

Truco: las varillas no son cien segmentos dibujados uno a uno, sino coordenadas polares — el ángulo se
parte en N ranuras y cada ranura lleva su varilla. Sale a coste constante por píxel, así que va fino
hasta en un móvil viejo. El rótulo se cuelga desde JS justo encima de la corona, con lo que cuadra con
la geometría real en cualquier pantalla. Si el navegador no soporta WebGL, el canvas se oculta y la
portada queda como una composición centrada normal.

## Qué hay que cambiar antes de publicar

1. **Teléfono.** No está puesto: solo pude verificar `+34 600 72 …` incompleto y preferí no inventarlo.
   Cuando lo tengas, añádelo como un bloque más en `<dl class="info">`.
2. **Fotos.** Las tres son las de baja resolución que hay en Google. Con originales de 2000 px de ancho
   la web gana mucho, sobre todo la de la portada.
3. **Logotipo.** `assets/brand/wordmark*.png` está generado a partir de un JPEG de 439 px, así que a
   tamaño grande se ve algo blando. Si consigues el SVG o el original, sustitúyelo.
4. **Dominio.** Actualiza `og:image` y las metaetiquetas cuando lo tengas.

Los archivos sueltos de la raíz (`local1.webp`, `logo.jpeg`, `estilo.jpg`, los `SaveClip.App_*.jpg`…)
son los originales y las capturas de Instagram que me pasaste. Han servido de referencia; **la web no
los usa** y no deberían subirse: el collage de la vibe lleva fotos de terceros (Adidas, rhode) que no
son suyas.

## La carta

Está transcrita de su carta oficial (`carta-shuka-MOD 27/01/26`, la que enlazan desde Linktree), en sus
dos versiones: los nombres en inglés son los suyos, no traducciones mías — «Cortado» es *Macchiato*,
«Café con leche» es *White coffee*, «Mixto» es *Mixed*.

Cinco pestañas, 64 platos:

| Pestaña | Contiene |
|---|---|
| Café | Cafés · Infusiones eco |
| Tostadas | Tostadas de pan masa madre · Tostas especiales (1–8) |
| Sandwiches & bowls | Pan brioche · Bowls salados · Bowls dulces |
| Brunch | Menú brunch · Dulce · Smoothies · Zumos |
| Bebidas | Refrescos · Cervezas · Vinos |

Todo vive en `assets/js/data.js`, con esta forma: pestaña → grupos → platos. Cada grupo lleva su título
(`t_es` / `t_en`), una nota opcional (`n_es` / `n_en`: el horario de las tostadas, «con leche de coco»
de los smoothies…) y un recuadro de extras opcional (`x_es` / `x_en`). Los platos son
`es · en · d_es · d_en · p`.

Las tostas especiales van numeradas en la carta original, así que ahí el «nombre» es el número: la web
lo detecta sola y le da la vuelta al tratamiento — el número en pequeño y en cursiva, y la descripción
en grande, que es lo que de verdad se lee.

Si cambian precios, basta con tocar ese archivo. Cuando el local actualice el PDF conviene volver a
comparar: esta transcripción es de la revisión del 27 de enero de 2026. El PDF original está en la
carpeta (`carta-shuka-oficial-27ene26.pdf`) pero fuera de git, porque pesa 19 MB; se vuelve a bajar
desde el enlace «CARTA (ES & EN)» de su Linktree.

## Idiomas

El español vive en el HTML; el inglés, en el diccionario `SHUKA_EN` de `data.js`. El botón ES/EN cambia
todo lo marcado con `data-i18n` (texto) o `data-i18n-html` (con saltos de línea) y también la carta entera,
incluidos los títulos de los grupos y las notas.
Para añadir una frase nueva: le pones `data-i18n="clave"` en el HTML y añades `'clave':'…'` al diccionario.

## Dos avisos sobre el CSS

**`clamp()`**: dentro de una expresión matemática de CSS los signos `+` y `-` **necesitan espacios a los
lados**. `clamp(2.1rem,1rem+3.9vw,4.6rem)` es inválido y el navegador tira la declaración entera, así que
el titular se queda en el tamaño por defecto sin avisar de nada. Aquí estaba en siete sitios y ya está
corregido — **la plantilla de Kaia tiene el mismo fallo** en `h2`, `body` y `.casa__lead p`.

**`background: currentColor` junto a `color`** en la misma regla no sirve para invertir un botón: el
fondo se resuelve con el color nuevo y el botón desaparece. Hay que dar los dos colores explícitos
(aquí, `background:var(--ink); color:var(--ground)`).

## Accesibilidad y rendimiento

- HTML semántico, `alt` en todas las imágenes, foco visible, menú móvil con `aria-expanded` y cierre con `Esc`.
- `prefers-reduced-motion` desactiva el scroll suave, los revelados y la animación de entrada.
- El canvas deja de renderizarse cuando la portada sale de pantalla; `devicePixelRatio` limitado a 2.
- Contraste comprobado en los dos temas: crema sobre marrón 11:1, marrón sobre blanco roto 12:1,
  tostado sobre marrón 5,7:1, bronce sobre blanco roto 4,6:1.
- Peso total de la página: ~1,1 MB, la mayor parte tipografía y librerías, todo cacheable.
