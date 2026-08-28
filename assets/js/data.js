/* =========================================================
   SHUKA COFFEE · datos editables
   Carta y traducciones. Es el único archivo que hay que
   tocar para cambiar platos, precios o el texto en inglés.

   Transcrita de su carta oficial (carta-shuka-MOD 27/01/26),
   la que enlazan desde Linktree, en sus dos versiones.

   Estructura: pestaña -> grupos -> platos.
     t     título del grupo (es / en)
     n     nota del grupo, opcional (horario, tipo de pan…)
     x     recuadro de extras del grupo, opcional
     items es · en · d_es · d_en (descripción) · p (precio)
   ========================================================= */

window.SHUKA_MENU = {

  /* ---------------- CAFÉ ---------------- */
  cafe: [
    {
      t_es:'Cafés', t_en:'Coffees',
      n_es:'Extra leche vegetal +0,50 · soja, avena, almendra o coco',
      n_en:'Plant-based milk +0,50 · soya, oat, almond or coconut',
      items:[
        { es:'Espresso', en:'Espresso',
          d_es:'Espresso de 30 ml', d_en:'30 ml espresso', p:'1,50' },
        { es:'Cortado', en:'Macchiato',
          d_es:'Espresso de 30 ml + leche emulsionada en taza de espresso. Doble shot +0,50',
          d_en:'30 ml espresso + frothed milk, served in an espresso cup. Double shot +0,50', p:'1,80' },
        { es:'Café con leche', en:'White coffee',
          d_es:'Espresso de 30 ml + leche emulsionada en taza de 170 ml. Doble shot +0,50',
          d_en:'30 ml espresso + frothed milk, served in a 170 ml cup. Double shot +0,50', p:'2,00' },
        { es:'Café con leche L', en:'Large white coffee',
          d_es:'Espresso doble de 60 ml + leche emulsionada en taza de 230 ml',
          d_en:'Double espresso (60 ml) + frothed milk, served in a 230/270 ml cup', p:'3,00' },
        { es:'Capuccino', en:'Capuccino',
          d_es:'Espresso doble de 60 ml + canela + leche emulsionada',
          d_en:'Double espresso (60 ml) + cinnamon on top + frothed milk', p:'3,50' },
        { es:'Americano', en:'Americano',
          d_es:'Taza de 150–170 ml, un 80 % agua + doble espresso encima',
          d_en:'150–170 ml cup with 80 % water + double espresso', p:'2,20' },
        { es:'Iced latte', en:'Iced latte',
          d_es:'300 ml de leche emulsionada + doble espresso de 60 ml',
          d_en:'300 ml frothed milk + 60 ml double espresso', p:'3,20' },
        { es:'Bombón', en:'Bombon',
          d_es:'Espresso de 30 ml + leche condensada',
          d_en:'30 ml espresso + condensed milk', p:'2,20' }
      ]
    },
    {
      t_es:'Infusiones eco', t_en:'Organic teas & infusions',
      items:[
        { es:'Matcha ecológico (caliente)', en:'Organic matcha (hot)', d_es:'', d_en:'', p:'3,50' },
        { es:'Iced matcha latte',           en:'Iced matcha latte',    d_es:'', d_en:'', p:'3,50' },
        { es:'Roibos',                      en:'Rooibos',              d_es:'', d_en:'', p:'2,50' },
        { es:'Manzanilla',                  en:'Camomile',             d_es:'', d_en:'', p:'2,50' },
        { es:'Poleo menta',                 en:'Peppermint',           d_es:'', d_en:'', p:'2,50' },
        { es:'Té verde',                    en:'Green tea',            d_es:'', d_en:'', p:'2,50' },
        { es:'Té negro',                    en:'Black tea',            d_es:'', d_en:'', p:'2,50' },
        { es:'Frutas del bosque',           en:'Mixed berries',        d_es:'', d_en:'', p:'2,50' }
      ]
    }
  ],

  /* ---------------- TOSTADAS ---------------- */
  tostadas: [
    {
      t_es:'Tostadas de pan masa madre', t_en:'Sourdough toasts',
      n_es:'De 8:00 a 13:00 · masa madre integral y de cereales +0,30 €',
      n_en:'From 8:00 to 13:00 · wholemeal and multigrain sourdough +0,30 €',
      x_es:'Extras · queso fresco 1 € · queso manchego 1 € · jamón de bellota 2,50 € · tomate natural 0,50 € · tortilla francesa 3,00 €',
      x_en:'Extras · fresh cheese 1 € · manchego cheese 1 € · acorn-fed ham 2,50 € · fresh tomato 0,50 € · fresh omelette 3,00 €',
      items:[
        { es:'Jamón de bellota',                en:'Acorn-fed ham',                   d_es:'', d_en:'', p:'4,50' },
        { es:'Queso manchego',                  en:'Manchego cheese',                 d_es:'', d_en:'', p:'3,50' },
        { es:'Queso fresco',                    en:'Fresh cheese',                    d_es:'', d_en:'', p:'3,50' },
        { es:'Salmón',                          en:'Salmon',                          d_es:'', d_en:'', p:'3,90' },
        { es:'Pavo',                            en:'Turkey',                          d_es:'', d_en:'', p:'3,50' },
        { es:'Aguacate',                        en:'Avocado',                         d_es:'', d_en:'', p:'3,90' },
        { es:'Tomate',                          en:'Tomato',                          d_es:'', d_en:'', p:'2,50' },
        { es:'Aceite virgen extra (Elizondo)',  en:'Extra virgin olive oil (Elizondo)', d_es:'', d_en:'', p:'2,30' }
      ]
    },
    {
      t_es:'Tostas especiales de pan masa madre', t_en:'Special toasts (sourdough)',
      n_es:'Disponemos de pan sin gluten',
      n_en:'Gluten-free bread available',
      items:[
        { es:'1', en:'1', d_es:'Aguacate & huevos revueltos con brotes verdes',
                          d_en:'Avocado & scrambled eggs with green sprouts', p:'7,50' },
        { es:'2', en:'2', d_es:'Crema de cacahuete ecológico, banana & coco rallado',
                          d_en:'Organic peanut butter, banana & grated coconut', p:'5,00' },
        { es:'3', en:'3', d_es:'Queso crema, rúcula, aguacate, huevo revuelto & granola salada',
                          d_en:'Cream cheese, rocket, avocado, scrambled egg & savoury granola', p:'8,90' },
        { es:'4', en:'4', d_es:'Jamón de bellota',
                          d_en:'Acorn-fed ham', p:'6,00' },
        { es:'5', en:'5', d_es:'Salmón, queso crema, pepino, rúcula & granola salada',
                          d_en:'Salmon, cream cheese, cucumber, rocket & savoury granola', p:'8,90' },
        { es:'6', en:'6', d_es:'Queso ricotta, tomate raf, rúcula & pesto',
                          d_en:'Ricotta cheese, raf tomato, rocket & pesto', p:'8,90' },
        { es:'7', en:'7', d_es:'Rulo de cabra, rúcula, nueces, miel & brotes',
                          d_en:'Goat cheese, rocket, walnuts, honey & sprouts', p:'8,50' },
        { es:'8', en:'8', d_es:'Tosta de temporada (pregúntanos)',
                          d_en:'Seasonal toast (ask your server)', p:'8,90' }
      ]
    }
  ],

  /* ---------------- SANDWICHES & BOWLS ---------------- */
  bowls: [
    {
      t_es:'Sandwiches con pan brioche', t_en:'Sandwiches on brioche bread',
      items:[
        { es:'Salmón', en:'Salmon',
          d_es:'Queso crema, pepino, cebolla encurtida & rúcula',
          d_en:'Cream cheese, cucumber, pickled onion & rocket', p:'8,90' },
        { es:'Shuka', en:'Shuka',
          d_es:'Jamón natural, tomate, queso emmental, rúcula, huevo ecológico & copos de chile',
          d_en:'Natural ham, tomato, emmental cheese, rocket, organic egg & chilli flakes', p:'8,90' },
        { es:'Mixto', en:'Mixed',
          d_es:'Jamón natural, queso emmental, mantequilla & pan brioche',
          d_en:'Natural ham, emmental cheese, butter & brioche bun', p:'5,50' },
        { es:'Salmón y huevo', en:'Salmon & egg',
          d_es:'Salmón, aguacate & huevos revueltos',
          d_en:'Salmon, avocado & scrambled eggs', p:'8,90' },
        { es:'Salmón y queso', en:'Salmon & cream cheese',
          d_es:'Salmón, aguacate & queso crema',
          d_en:'Salmon, avocado & cream cheese', p:'8,90' }
      ]
    },
    {
      t_es:'Bowls salados', t_en:'Bowls · savoury',
      items:[
        { es:'Salmón', en:'Salmon',
          d_es:'Salmón, nueces, pepino, aguacate, tomate raf, rúcula & pan de masa madre',
          d_en:'Salmon, walnuts, cucumber, avocado, raf tomato, rocket & sourdough bread', p:'9,90' },
        { es:'Pavo', en:'Turkey',
          d_es:'Pavo, nueces, tomate raf, huevos revueltos ecológicos, aguacate, pepino, rúcula & pan de masa madre',
          d_en:'Turkey, walnuts, raf tomato, scrambled organic eggs, avocado, cucumber, rocket & sourdough bread', p:'9,90' },
        { es:'Huevos revueltos', en:'Scrambled eggs',
          d_es:'Tomate raf, salmón, nueces, pepino, aguacate, rúcula, zumaque, huevos revueltos & pan de masa madre',
          d_en:'Raf tomato, salmon, walnuts, cucumber, avocado, rocket, sumac, scrambled eggs & sourdough bread', p:'9,90' }
      ]
    },
    {
      t_es:'Bowls dulces', t_en:'Bowls · sweet',
      items:[
        { es:'Shuka', en:'Shuka',
          d_es:'Arándanos, banana, mango, crema de cacahuete ecológico, frambuesa, coco rallado, granola & yogur griego',
          d_en:'Blueberries, banana, mango, organic peanut butter, raspberry, fresh & grated coconut, granola & greek yoghurt', p:'7,90' },
        { es:'Mango', en:'Mango',
          d_es:'Mousse de mango fresco, frambuesa, banana & coco rallado',
          d_en:'Fresh mango mousse, raspberry, banana & fresh coconut pieces', p:'7,90' }
      ]
    }
  ],

  /* ---------------- BRUNCH & DULCE ---------------- */
  brunch: [
    {
      t_es:'Menú brunch', t_en:'Brunch menu',
      n_es:'De lunes a viernes de 8:30 a 12:30',
      n_en:'Monday to Friday, 8:30 – 12:30',
      items:[
        { es:'Café + zumo de naranja + tosta especial + bowl dulce',
          en:'Coffee + fresh orange juice + special toast + sweet bowl',
          d_es:'Café incluido: cortado y café con leche · tostas incluidas: 1, 3, 5 y 6 · bowl dulce incluido: bowl Shuka · extra leche vegetal +0,50',
          d_en:'Coffee included: macchiato and white coffee · toasts included: 1, 3, 5 and 6 · sweet bowl included: bowl Shuka · plant-based milk +0,50',
          p:'17,50' }
      ]
    },
    {
      t_es:'Dulce', t_en:'Sweet treats',
      items:[
        { es:'Bizcocho', en:'Cake', d_es:'Bizcocho de zanahoria', d_en:'Carrot cake', p:'3,30' }
      ]
    },
    {
      t_es:'Smoothies', t_en:'Smoothies',
      n_es:'Con leche de coco', n_en:'With coconut milk',
      items:[
        { es:'Banana · mango',                    en:'Banana · mango',                       d_es:'', d_en:'', p:'6,50' },
        { es:'Fresas · banana',                   en:'Strawberry · banana',                  d_es:'', d_en:'', p:'6,50' },
        { es:'Piña · banana · ginger · cúrcuma',  en:'Pineapple · banana · ginger · turmeric', d_es:'', d_en:'', p:'6,50' },
        { es:'Frambuesa · piña · mango',          en:'Raspberry · pineapple · mango',        d_es:'', d_en:'', p:'6,50' }
      ]
    },
    {
      t_es:'Zumos', t_en:'Juices',
      n_es:'Zumos Pago', n_en:'Pago juices available',
      items:[
        { es:'Zumo de piña',            en:'Pineapple juice',    d_es:'', d_en:'', p:'3,00' },
        { es:'Zumo de melocotón',       en:'Peach juice',        d_es:'', d_en:'', p:'3,00' },
        { es:'Zumo de naranja natural', en:'Fresh orange juice', d_es:'', d_en:'', p:'3,30' }
      ]
    }
  ],

  /* ---------------- BEBIDAS ---------------- */
  bebidas: [
    {
      t_es:'Refrescos', t_en:'Soft drinks',
      items:[
        { es:'Coca Cola',        en:'Coca Cola',        d_es:'', d_en:'', p:'3,00' },
        { es:'Coca Cola Zero',   en:'Coca Cola Zero',   d_es:'', d_en:'', p:'3,00' },
        { es:'Fanta de naranja', en:'Fanta orange',     d_es:'', d_en:'', p:'3,00' },
        { es:'Fanta de limón',   en:'Fanta lemon',      d_es:'', d_en:'', p:'3,00' },
        { es:'Aquarius naranja', en:'Aquarius orange',  d_es:'', d_en:'', p:'3,00' },
        { es:'Aquarius limón',   en:'Aquarius lemon',   d_es:'', d_en:'', p:'3,00' },
        { es:'Nestea',           en:'Nestea',           d_es:'', d_en:'', p:'3,00' },
        { es:'Agua',             en:'Still water',      d_es:'', d_en:'', p:'2,00' },
        { es:'Agua con gas',     en:'Sparkling water',  d_es:'', d_en:'', p:'3,00' }
      ]
    },
    {
      t_es:'Cervezas', t_en:'Beers',
      items:[
        { es:'Heineken (33 cl)', en:'Heineken (33 cl)', d_es:'', d_en:'', p:'3,00' },
        { es:'Sin alcohol',      en:'Alcohol-free',     d_es:'', d_en:'', p:'3,00' }
      ]
    },
    {
      t_es:'Vinos', t_en:'Wine',
      n_es:'Copas', n_en:'By the glass',
      items:[
        { es:'Blanco', en:'White', d_es:'', d_en:'', p:'3,50' },
        { es:'Tinto',  en:'Red',   d_es:'', d_en:'', p:'3,50' }
      ]
    }
  ]
};

/* --------- diccionario EN (el español vive en el HTML) --------- */
window.SHUKA_EN = {
  'nav.local':'The place', 'nav.carta':'Menu', 'nav.visita':'Visit us', 'nav.cta':'Directions',

  'ov.hours':'Mon — Fri · 8:30 — 16:00<br>Saturday · 8:30 — 14:00',

  'hero.cue':'Step inside',

  'local.eyebrow':'Chic, elegant, classy.',
  'local.title':'Travertine, arches<br>and warm light in<br>the heart of Elche.',
  'local.p1':'Specialty coffee from first thing, bowls and toast until late afternoon. No booking: you arrive, you sit down, you stay.',
  'local.cap1':'The room',
  'local.cap2':'The corner',

  'carta.title':'Menu',
  'carta.t1':'Coffee', 'carta.t2':'Toasts', 'carta.t3':'Sandwiches & bowls',
  'carta.t4':'Brunch', 'carta.t5':'Drinks',
  'carta.note':'Allergen information available at the counter · prices in euros, VAT included',

  'visita.title':'Plaza de la Fruta,<br>number 24.',
  'visita.dir':'Address', 'visita.hor':'Opening hours', 'visita.res':'Bookings', 'visita.sig':'Follow us',
  'visita.dirV':'Plaza de la Fruta, 24<br>03202 Elche · Alicante',
  'visita.horV':'Monday to Friday · 8:30 — 16:00<br>Saturday · 8:30 — 14:00<br>Sunday · closed',
  'visita.resV':'No booking. Just walk in.',
  'visita.cta1':'Get directions', 'visita.cta2':'See Instagram'
};
