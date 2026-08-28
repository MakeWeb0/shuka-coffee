/* =========================================================
   SHUKA COFFEE · datos editables
   Carta y traducciones. Es el único archivo que hay que
   tocar para cambiar platos, precios o el texto en inglés.
   ========================================================= */

window.SHUKA_MENU = {
  cafe: [
    { es:'Espresso',      en:'Espresso',       d_es:'Tueste de especialidad',            d_en:'Specialty roast',                p:'1,60' },
    { es:'Cortado',       en:'Cortado',        d_es:'Corto y con cuerpo',                d_en:'Short and full bodied',          p:'1,70' },
    { es:'Flat white',    en:'Flat White',     d_es:'Doble ristretto, leche sedosa',     d_en:'Double ristretto, silky milk',   p:'2,60' },
    { es:'Cappuccino',    en:'Cappuccino',     d_es:'',                                  d_en:'',                               p:'2,40' },
    { es:'Iced latte',    en:'Iced Latte',     d_es:'Sobre hielo, leche a elegir',       d_en:'Over ice, milk of your choice',  p:'2,90' },
    { es:'Matcha latte',  en:'Matcha Latte',   d_es:'Grado ceremonial, frío o caliente', d_en:'Ceremonial grade, hot or iced',  p:'3,60' },
    { es:'Chai latte',    en:'Chai Latte',     d_es:'Especiado, infusionado en casa',    d_en:'Spiced, brewed in house',        p:'3,40' },
    { es:'Filtrado V60',  en:'V60 Pour Over',  d_es:'Origen rotativo',                   d_en:'Rotating single origin',         p:'3,20' }
  ],
  brunch: [
    { es:'Tosta de aguacate', en:'Avocado Toast', d_es:'Huevo poché, lima y chile suave', d_en:'Poached egg, lime, mild chilli', p:'8,50' },
    { es:'Tosta de salmón',   en:'Salmon Toast',  d_es:'Queso crema, eneldo y encurtidos', d_en:'Cream cheese, dill, pickles',   p:'9,50' },
    { es:'Tosta de tomate',   en:'Tomato Toast',  d_es:'Jamón, AOVE y sal en escamas',     d_en:'Ham, olive oil, flaky salt',    p:'6,90' },
    { es:'Huevos benedict',   en:'Eggs Benedict', d_es:'Holandesa, muffin y bacon',        d_en:'Hollandaise, muffin, bacon',    p:'9,90' },
    { es:'Croissant mixto',   en:'Ham & Cheese Croissant', d_es:'De obrador, cada mañana', d_en:'From the bakery, every morning', p:'4,50' }
  ],
  bowls: [
    { es:'Bowl de salmón',  en:'Salmon Bowl',   d_es:'Arroz, edamame, aguacate y sésamo', d_en:'Rice, edamame, avocado, sesame', p:'12,50' },
    { es:'Poke de pollo',   en:'Chicken Poke',  d_es:'Marinado teriyaki y mango',         d_en:'Teriyaki marinade and mango',    p:'11,90' },
    { es:'Açaí bowl',       en:'Açaí Bowl',     d_es:'Granola, plátano y crema de cacahuete', d_en:'Granola, banana, peanut butter', p:'7,90' },
    { es:'Yogur griego',    en:'Greek Yogurt',  d_es:'Frutos rojos, granola y miel',      d_en:'Berries, granola, honey',        p:'6,50' },
    { es:'Porridge de avena', en:'Oat Porridge', d_es:'Bebida vegetal, canela y fruta',   d_en:'Plant milk, cinnamon, fruit',    p:'6,20' }
  ],
  dulce: [
    { es:'Carrot cake',           en:'Carrot Cake',      d_es:'Frosting de queso y nuez',  d_en:'Cream cheese frosting, walnut', p:'4,20' },
    { es:'Cheesecake',            en:'Cheesecake',       d_es:'Horneada, textura cremosa', d_en:'Baked, creamy texture',         p:'4,50' },
    { es:'Banana bread',          en:'Banana Bread',     d_es:'Templado, con mantequilla', d_en:'Warm, with butter',             p:'3,90' },
    { es:'Cookie',                en:'Cookie',           d_es:'Chocolate belga y sal',     d_en:'Belgian chocolate and salt',    p:'2,80' },
    { es:'Croissant de almendra', en:'Almond Croissant', d_es:'Relleno de frangipane',     d_en:'Frangipane filling',            p:'3,20' }
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
  'carta.t1':'Coffee', 'carta.t2':'Toast', 'carta.t3':'Bowls', 'carta.t4':'Sweet',
  'carta.note':'Sample menu · subject to season and availability',

  'visita.title':'Plaza de la Fruta,<br>number 24.',
  'visita.dir':'Address', 'visita.hor':'Opening hours', 'visita.res':'Bookings', 'visita.sig':'Follow us',
  'visita.dirV':'Plaza de la Fruta, 24<br>03202 Elche · Alicante',
  'visita.horV':'Monday to Friday · 8:30 — 16:00<br>Saturday · 8:30 — 14:00<br>Sunday · closed',
  'visita.resV':'No booking. Just walk in.',
  'visita.cta1':'Get directions', 'visita.cta2':'See Instagram'
};
