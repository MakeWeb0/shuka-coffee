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
- **La portada** son sus tres vídeos de Instagram en columna, teñidos con el marrón de marca.
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
assets/js/main.js          scroll, entrada, menú, pestañas, idioma
assets/vendor/             gsap, ScrollTrigger y lenis, servidos en local
assets/brand/              logotipo en dos colores, badge y favicons
assets/img/                barra · sala · rincón
assets/video/              los tres vídeos de la portada + sus pósters
```

## La portada

Los tres vídeos que pasaste, en tres columnas a sangre, sonando los tres a la vez y en bucle.
El tono de marca sale de dos capas:

1. Los vídeos van en blanco y negro (`filter: grayscale(1)`) y algo más oscuros.
2. Encima, una capa marrón en `mix-blend-mode: color`, que toma el matiz del marrón y respeta la
   luminosidad del vídeo. Eso es exactamente el duotono de su feed.

El oscurecido que da contraste al rótulo va **dentro** de `.hero__videos`, no en la capa de color:
`mix-blend-mode: color` conserva la luz del fondo, así que una sombra puesta ahí no oscurecería nada.
Si el navegador no soporta `mix-blend-mode`, el `@supports` deja una veladura marrón normal.

Van `muted`, `loop`, `playsinline` y `autoplay`, con un fotograma del propio vídeo como `poster`, así
que si el navegador bloquea el autoplay la portada se ve igual, congelada. Con `prefers-reduced-motion`
se quedan a propósito en el póster, y un IntersectionObserver los pausa al salir de pantalla para no
gastar batería.

Los originales pesaban 5,7 MB entre los tres; recodificados a 540×960 sin audio se quedan en 2,2 MB.
Para reemplazarlos: mismo tamaño y nombre en `assets/video/`, y regenerar el póster con
`ffmpeg -i hero-N.mp4 -frames:v 1 hero-N.jpg`.

## Qué hay que cambiar antes de publicar

1. **Fotos del local.** Las dos de «El local» son las de Google: **382 × 510 px**, y se muestran a unos
   600 × 800, o sea un 1,6× de estiramiento (3× en pantallas Retina). Es lo único que se nota de verdad.
   Pídele al cliente los originales, mínimo 1200 px de ancho, y sustituye `assets/img/sala.webp` y
   `rincon.webp` manteniendo la proporción 3:4. Acuérdate de actualizar los `width`/`height` del HTML.
2. **Dominio.** Cuando lo tengas, pon las URL absolutas en `og:image` y añade `og:url` y
   `<link rel="canonical">`. En el JSON-LD, cambia `"image"` por la URL absoluta.
3. **Google Business.** El JSON-LD ya declara dirección, teléfono y los tres tramos de horario; conviene
   que coincidan exactamente con su ficha de Google.

**Al subir a hosting, sube solo `index.html` y `assets/`.** Lo demás de la raíz es material de
referencia: los originales que me pasaste, las capturas de Instagram, los vídeos sin recodificar y el
PDF de la carta. La web no lo usa, suma 24 MB y el collage de la vibe lleva fotos de terceros (Adidas,
rhode) que no son del local. Los vídeos originales y el PDF ya están fuera de git por tamaño.

## El bloque «El local»

Es donde está el trabajo de scroll:

- El titular sale **línea a línea** desde detrás de una máscara. `splitLines()` lo trocea por sus `<br>`
  y guarda el original en `data-raw`; el diccionario borra ese atributo al cambiar de idioma, así que
  al rearmarse coge el texto nuevo en vez de repintar el viejo.
- Cada arco se **abre de abajo arriba** (`clip-path`) mientras su foto se asienta desde una escala algo
  mayor. Detrás entran el pie de foto y su filete, que se dibuja de izquierda a derecha con una custom
  property registrada (`@property --draw`, que es lo que la hace interpolable).
- **Parallax**: la foto es un 24 % más alta que el marco y recorre ese excedente al desplazar, así que
  nunca asoma un borde.
- Las dos columnas se separan un punto más al bajar, en direcciones opuestas. Solo por encima de
  720 px: apiladas en móvil no tendría sentido.

Todo respeta `prefers-reduced-motion` y se rearma al cambiar de idioma.

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

## SEO

- **JSON-LD de `CafeOrCoffeeShop`** en el `<head>`: nombre, dirección, teléfono, rango de precios, que
  no aceptan reservas y los tres tramos de horario. Es lo que lee Google para la ficha del negocio.
- **Open Graph completo** con una imagen de 1200 × 630 (`assets/brand/og.jpg`) generada a partir de un
  fotograma de sus vídeos, con el mismo duotono marrón y el logotipo encima. Antes era el favicon
  cuadrado, que en WhatsApp o Instagram salía diminuto.
- Criterio con el topónimo: **«Elche» en los textos** (la web está en español) y **«Elx» en la dirección
  postal**, que es como la da el cliente y como figura en Correos. El JSON-LD y el enlace de Google Maps
  usan «Elx».

## Accesibilidad y rendimiento

- HTML semántico, `alt` en todas las imágenes, foco visible, menú móvil con `aria-expanded` y cierre con `Esc`.
- `prefers-reduced-motion` desactiva el scroll suave, los revelados, la animación de entrada y deja
  los vídeos congelados en su póster.
- Los vídeos se pausan cuando la portada sale de pantalla.
- Imágenes y vídeos con `width`/`height` explícitos: nada salta de sitio mientras carga.
- Contraste comprobado en los dos temas: crema sobre marrón 11:1, marrón sobre blanco roto 12:1,
  tostado sobre marrón 5,7:1, bronce sobre blanco roto 4,6:1.
- Peso total de la página: ~3,4 MB, de los que 2,2 MB son los vídeos; todo cacheable.
