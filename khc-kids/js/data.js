/* ============================================================
   KHC KIDS · Colección premium (edición limitada)
   Ropa, puericultura, juguetes y textil del bebé.
   Calidad grande, cómoda y duradera · Precios en $ accesibles.
   Catálogo completo: de 0 a 6 años.
   ============================================================ */

/* ---------- CATEGORÍAS DE LA TIENDA ---------- */
window.KHC_TYPES = [
  { id: 'bebe',  icon: '👶', label: 'Ropa Bebés 0-24m' },
  { id: 'nina',  icon: '👧', label: 'Niñas 1-6 años' },
  { id: 'nino',  icon: '👦', label: 'Niños 1-6 años' },
  { id: 'pueri', icon: '🍼', label: 'Puericultura & Comida' },
  { id: 'jugu',  icon: '🧸', label: 'Juguetes' },
  { id: 'textil', icon: '🧺', label: 'Mantas & Pañales' },
  { id: 'acc',   icon: '🎀', label: 'Accesorios' }
];

var S_BEBE  = ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'];
var S_16    = ['1-2A', '2-3A', '3-4A', '5-6A'];
var S_26    = ['2-3A', '3-4A', '5-6A'];
var S_36    = ['3-4A', '5-6A'];
var U       = ['Talla única'];

window.KHC_PRODUCTS = [

  /* ============================================================
     1 · ROPA BEBÉS · 0-24 MESES
     ============================================================ */
  {
    id: 'p01', name: 'Body de Algodón Suave',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 14, oldPrice: null, img: 'img/01-bodies.jpg',
    units: 7, totalUnits: 40, tag: 'Edición limitada',
    sizes: S_BEBE,
    desc: 'Algodón suave y transpirable, amable con la piel de tu bebé. Costuras planas y cierre fácil para el día a día.'
  },
  {
    id: 'p02', name: 'Pelele de Noche Estrella',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 18, oldPrice: null, img: 'img/02-pelele.jpg',
    units: 5, totalUnits: 35, tag: 'Edición limitada',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    desc: 'Tejido dulce para noches tranquilas. Mantiene su suavidad y su forma lavado tras lavado.'
  },
  {
    id: 'p03', name: 'Conjunto Recién Nacido',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 22, oldPrice: null, img: 'img/03-conjunto-rn.jpg',
    units: 9, totalUnits: 40, tag: 'Nuevo diseño',
    sizes: ['6-12M', '12-18M', '18-24M'],
    desc: 'Dos piezas pensadas para la piel más delicada: cómodo, duradero y con un acabado de boutique.'
  },
  {
    id: 'p13', name: 'Mameluco Fresquito · Pack 2',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-18 meses', gender: 'unisex',
    price: 18, oldPrice: null, img: 'img/t-mameluco.jpg',
    units: 8, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    desc: 'Dos mamelucos ligeros de tirantes, perfectos para los días de calor. Tejido fresco que no marca y botones fáciles.'
  },
  {
    id: 'p14', name: 'Bata Toalla con Capucha',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '6-24 meses', gender: 'unisex',
    price: 20, oldPrice: null, img: 'img/n-bata-toalla.jpg',
    units: 6, totalUnits: 30, tag: 'Edición limitada',
    sizes: ['6-12M', '12-18M', '18-24M'],
    desc: 'Salida de baño con capucha de animalito: abraza, seca y abriga al salir del agua. Rizo suave y súper absorbente.'
  },
  {
    id: 'p15', name: 'Set Regalo Recién Nacido · 5 piezas',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-6 meses', gender: 'unisex',
    price: 28, oldPrice: null, img: 'img/n-setrn.jpg',
    units: 4, totalUnits: 25, tag: 'Últimas unidades',
    sizes: ['0-3M', '3-6M'],
    desc: 'Body, pelele, gorrito, manoplas y escarpines en una caja lista para regalar. El detalle perfecto para dar la bienvenida.'
  },
  {
    id: 'p16', name: 'Enterizo Polar Orejas de Oso',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '3-24 meses', gender: 'unisex',
    price: 26, oldPrice: null, img: 'img/g-enterizo-bebe.jpg',
    units: 6, totalUnits: 30, tag: 'Nuevo diseño',
    sizes: ['3-6M', '6-12M', '12-18M', '18-24M'],
    desc: 'Mullidito por dentro y por fuera, con capucha de orejas que derrite corazones. Abrigo total sin peso para el invierno del bebé.'
  },
  {
    id: 'p63', name: 'Conjunto Punto Clásico Bebé',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 26, oldPrice: null, img: 'img/r-conjunto-punto.jpg',
    units: 6, totalUnits: 30, tag: 'Nuevo diseño',
    sizes: S_BEBE,
    desc: 'Chaquetita y pantalón de punto en crema y camel: abriga sin apretar y viste elegante en cualquier ocasión. Punto suave que no pica.'
  },
  {
    id: 'p64', name: 'Body Volantes de Encaje',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'nina',
    price: 15, oldPrice: null, img: 'img/r-body-volantes.jpg',
    units: 9, totalUnits: 42, tag: 'Edición limitada',
    sizes: S_BEBE,
    desc: 'Body rosa empolvado con volantitos de encaje suave y broches fáciles. Dulce para fotos, cómodo para todo el día.'
  },
  {
    id: 'p70', name: 'Pijama Nubes Pastel · Pack 2',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 16, oldPrice: null, img: 'img/r-pijama-nubes.jpg',
    units: 8, totalUnits: 36, tag: 'Nuevo diseño',
    sizes: S_BEBE,
    desc: 'Dos pijamas de algodón con estampado de nubes y estrellitas: uno rosa, uno celeste. Suavecitos para noches de cuento.'
  },
  {
    id: 'p71', name: 'Conjunto Bautizo Suave',
    type: 'bebe', typeLabel: 'Ropa Bebés', age: 'bebe', ageLabel: '0-18 meses', gender: 'unisex',
    price: 21, oldPrice: null, img: 'img/r-conjunto-bautizo.jpg',
    units: 5, totalUnits: 24, tag: 'Edición limitada',
    sizes: ['3-6M', '6-12M', '12-18M'],
    desc: 'Blusita de punto con cuello de encaje y culotte crema con lacito: el conjunto de los días grandes, a precio pequeño.'
  },

  /* ============================================================
     2 · ROPA NIÑAS · 1-6 AÑOS
     ============================================================ */
  {
    id: 'p04', name: 'Vestido Floral Primavera',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 26, oldPrice: null, img: 'img/04-vestido-floral.jpg',
    units: 6, totalUnits: 45, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Estampado floral exclusivo y vuelo justo para girar sin parar. Tela que resiste el sol y la lavadora.'
  },
  {
    id: 'p05', name: 'Vestido de Tul Ceremonia',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 32, oldPrice: null, img: 'img/07-vestido-tul.jpg',
    units: 4, totalUnits: 30, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Nuestro diseño de ceremonia: tul suave que no pica y un acabado digno de heredarse.'
  },
  {
    id: 'p06', name: 'Conjunto Dulce Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/08-conjunto-nina.jpg',
    units: 8, totalUnits: 40, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Comodidad absoluta para jugar todo el día, con un estilo que enamora en cada foto.'
  },
  {
    id: 'p07', name: 'Vestido Camisero Lino',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 28, oldPrice: null, img: 'img/n-vestido-camisero.jpg',
    units: 6, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: S_26,
    desc: 'Aire de lino, tacto suave y costuras reforzadas. Un básico elevado que dura temporadas.'
  },
  {
    id: 'p08', name: 'Mono Flores Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/n-mono-nina.jpg',
    units: 3, totalUnits: 30, tag: 'Últimas unidades',
    sizes: S_16,
    desc: 'Una sola pieza, mil aventuras. Tejido resistente que aguanta el ritmo de las que no paran.'
  },
  {
    id: 'p17', name: 'Vestido Tropical Hibisco',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 22, oldPrice: null, img: 'img/t-vestido-casual.jpg',
    units: 7, totalUnits: 40, tag: 'Nuevo diseño',
    sizes: S_16,
    desc: 'Fresquito, alegre y con puntilla de volantes. El vestido de todos los días que parece de fiesta.'
  },
  {
    id: 'p18', name: 'Falda Plisada Rosa',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 20, oldPrice: null, img: 'img/n-falda.jpg',
    units: 6, totalUnits: 35, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Pliegues que bailan a cada paso y cintura elástica que no aprieta. Combina con todo su armario.'
  },
  {
    id: 'p19', name: 'Conjunto Top y Falda Tropical',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 26, oldPrice: null, img: 'img/n-top-falda.jpg',
    units: 5, totalUnits: 30, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Dos piezas que se llevan juntas o por separado: tres looks en una sola compra. Fresco y con caída bonita.'
  },
  {
    id: 'p20', name: 'Leggings Suaves · Pack 2',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 16, oldPrice: null, img: 'img/t-leggings.jpg',
    units: 9, totalUnits: 45, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Dos colores, mil combinaciones. Punto elástico grueso que no se transparenta ni hace bolitas.'
  },
  {
    id: 'p21', name: 'Pantalón Fresquito Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 22, oldPrice: null, img: 'img/t-pantalon-nina.jpg',
    units: 7, totalUnits: 38, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Ligero, con bolsillos de verdad y cintura cómoda. Para el parque, la guarde y las fotos de mamá.'
  },
  {
    id: 'p22', name: 'Short con Volante Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 18, oldPrice: null, img: 'img/t-short-nina.jpg',
    units: 8, totalUnits: 36, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Corto deportivo con volante coqueto: libertad para correr con un toque de coletería fina.'
  },
  {
    id: 'p23', name: 'Palazzo Estampado Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '3-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/n-palazzo.jpg',
    units: 5, totalUnits: 30, tag: 'Nuevo diseño',
    sizes: S_36,
    desc: 'Pata ancha y tela con caída: el pantalón más fresco del verano con aire de pequeña fashionista.'
  },
  {
    id: 'p24', name: 'Blusitas Frescas · Pack 3',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/t-blusitas.jpg',
    units: 7, totalUnits: 40, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Tres blusas de tirantes y manga corta en tonos dulces. Algodón peinado que aguanta el juego diario.'
  },
  {
    id: 'p25', name: 'Traje de Baño Sirena',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 21, oldPrice: null, img: 'img/t-bano-nina.jpg',
    units: 6, totalUnits: 32, tag: 'Nuevo diseño',
    sizes: S_16,
    desc: 'Volantes, colores de mar y protección cómoda para horas de piscina. Secado rápido y tallas fieles.'
  },
  {
    id: 'p26', name: 'Camisón Princesa',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 19, oldPrice: null, img: 'img/n-pijama-camison.jpg',
    units: 7, totalUnits: 34, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Para dormir como en un cuento: suave, fresquito y con puntilla. Sueños bonitos garantizados.'
  },
  {
    id: 'p27', name: 'Braguitas Algodón · Pack 5',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 14, oldPrice: null, img: 'img/n-braga.jpg',
    units: 9, totalUnits: 50, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Cinco braguitas de algodón hipoalergénico con gomas suaves que no marcan. El básico mejor hecho.'
  },
  {
    id: 'p28', name: 'Vestido de Fiesta Perlas',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '3-6 años', gender: 'nina',
    price: 36, oldPrice: null, img: 'img/g-vestido-fiesta.jpg',
    units: 4, totalUnits: 25, tag: 'Edición limitada',
    sizes: S_36,
    desc: 'Tul en capas, perlitas cosidas a mano y lazo de satén. El vestido de los cumpleaños inolvidables.'
  },
  {
    id: 'p29', name: 'Jeans Elásticos Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 26, oldPrice: null, img: 'img/g-jeans-nina.jpg',
    units: 6, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: S_26,
    desc: 'Denim suave con bordado floral en el bolsillo y cintura ajustable. El vaquero que sí deja jugar.'
  },
  {
    id: 'p30', name: 'Falda Vaquera Botones',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '3-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/g-falda-denim.jpg',
    units: 5, totalUnits: 30, tag: 'Edición limitada',
    sizes: S_36,
    desc: 'Corte en A con botones delanteros y tela vaquera ligera. Resistente al parque y bonita para merendar.'
  },
  {
    id: 'p31', name: 'Cárdigan Largo de Punto',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '3-6 años', gender: 'nina',
    price: 28, oldPrice: null, img: 'img/g-cardigan-nina.jpg',
    units: 5, totalUnits: 28, tag: 'Nuevo diseño',
    sizes: S_36,
    desc: 'Punto mullido con bolsillos, en rosa empolvado. Ese abrigo ligero que soluciona cualquier salida.'
  },
  {
    id: 'p32', name: 'Conjunto Deportivo Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 26, oldPrice: null, img: 'img/g-deportivo-nina.jpg',
    units: 7, totalUnits: 34, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Top y leggings en lavanda y menta: listos para bailar, estirar y correr. Elástico real, colores que duran.'
  },
  {
    id: 'p65', name: 'Vestido Lino Lazo',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 29, oldPrice: null, img: 'img/r-vestido-lino.jpg',
    units: 5, totalUnits: 28, tag: 'Nuevo diseño',
    sizes: S_26,
    desc: 'Lino crema con cinturón lazo de satén: elegante sin esfuerzo y fresco para toda ocasión. Incluye coletero a juego.'
  },
  {
    id: 'p66', name: 'Cárdigan Perla Botones',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 25, oldPrice: null, img: 'img/r-cardigan-perla.jpg',
    units: 6, totalUnits: 30, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Punto blanco perla con botoncitos nacarados y vincha de lavanda de regalo. El abrigo fino que arregla cualquier look.'
  },
  {
    id: 'p67', name: 'Conjunto Tul Ceremonia Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '3-6 años', gender: 'nina',
    price: 30, oldPrice: null, img: 'img/r-conjunto-tul.jpg',
    units: 4, totalUnits: 24, tag: 'Edición limitada',
    sizes: S_36,
    desc: 'Blusa de tul marfil con falda en capas y faja de satén: dos piezas de ceremonia a precio accesible.'
  },
  {
    id: 'p72', name: 'Blusa Peter Pan Perla',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 15, oldPrice: null, img: 'img/r-blusa-peterpan.jpg',
    units: 10, totalUnits: 44, tag: 'Nuevo diseño',
    sizes: S_26,
    desc: 'Blusa blanca perla con cuello redondo y botoncitos forrados: arregla cualquier look por menos de lo que imaginas.'
  },
  {
    id: 'p73', name: 'Falda Tul Pastel',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-6 años', gender: 'nina',
    price: 14, oldPrice: null, img: 'img/r-falda-tul.jpg',
    units: 11, totalUnits: 46, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Tul en capas rosa empolvado con cintura de satén: gira, vuela y enamora. Combinable con todo su armario.'
  },
  {
    id: 'p74', name: 'Chaqueta Borreguito Lazo',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/r-chaqueta-borrego.jpg',
    units: 6, totalUnits: 28, tag: 'Nuevo diseño',
    sizes: S_16,
    desc: 'Abrigo blandito de borreguito en crema con lacito de satén: calienta abrazando y pinta fotos preciosas.'
  },
  {
    id: 'p75', name: 'Conjunto Blusa y Culotte Volantes',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 19, oldPrice: null, img: 'img/r-conjunto-culotte.jpg',
    units: 8, totalUnits: 34, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Blusa floral con mangas de volante y culotte rosa con lazo lateral: dos piezas que son mil conjuntos.'
  },

  /* ============================================================
     3 · ROPA NIÑOS · 1-6 AÑOS
     ============================================================ */
  {
    id: 'p09', name: 'Pijama Dino',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-6 años', gender: 'nino',
    price: 19, oldPrice: null, img: 'img/05-pijama-dino.jpg',
    units: 7, totalUnits: 45, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Suave por dentro, valiente por fuera. Puños que no aprietan y colores que no se apagan.'
  },
  {
    id: 'p10', name: 'Conjunto Aventurero',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-6 años', gender: 'nino',
    price: 24, oldPrice: null, img: 'img/06-conjunto-nene.jpg',
    units: 8, totalUnits: 40, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Cortes que dejan moverse, saltar y trepar. Refuerzos donde ellos más lo exigen.'
  },
  {
    id: 'p11', name: 'Peto Denim Suave',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-6 años', gender: 'nino',
    price: 26, oldPrice: null, img: 'img/n-peto-nino.jpg',
    units: 5, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: S_16,
    desc: 'El denim de siempre, pero suave de verdad. Duradero, cómodo y con estilo propio.'
  },
  {
    id: 'p12', name: 'Sudadera Nube',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'unisex',
    price: 22, oldPrice: null, img: 'img/09-sudadera.jpg',
    units: 9, totalUnits: 50, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Interior afelpado como una nube. Abriga sin pesar y mantiene su forma temporada tras temporada.'
  },
  {
    id: 'p33', name: 'Camisa de Lino Niño',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 24, oldPrice: null, img: 'img/n-camisa-nino.jpg',
    units: 6, totalUnits: 32, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Lino fresco con cuello mao: arreglado sin sufrir. La camisa de las fotos de familia y los domingos largos.'
  },
  {
    id: 'p34', name: 'Bermuda Chino Niño',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 20, oldPrice: null, img: 'img/n-bermuda-nino.jpg',
    units: 7, totalUnits: 36, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Corte clásico, cintura con goma y tela que estira. De la guarde a la fiesta sin cambiarse.'
  },
  {
    id: 'p35', name: 'Franelas Básicas · Pack 3',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 22, oldPrice: null, img: 'img/t-franelas-nino.jpg',
    units: 8, totalUnits: 42, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Tres franelas en azul, gris y verde salvia de algodón grueso. Cuello reforzado que no cede con los tirones.'
  },
  {
    id: 'p36', name: 'Pantalón Jogger Suave',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-6 años', gender: 'nino',
    price: 19, oldPrice: null, img: 'img/t-pantalon-nino.jpg',
    units: 7, totalUnits: 38, tag: 'Nuevo diseño',
    sizes: S_16,
    desc: 'Felpa ligera con rodillas reforzadas: el pantalón de gatear, correr y caerse sin consecuencias.'
  },
  {
    id: 'p37', name: 'Short Deportivo Fresco',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 17, oldPrice: null, img: 'img/t-short-nino.jpg',
    units: 8, totalUnits: 36, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Tejido respirable de secado rápido para días de juego intenso. Goma suave que no deja marca.'
  },
  {
    id: 'p38', name: 'Traje de Baño Tiburón',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-6 años', gender: 'nino',
    price: 20, oldPrice: null, img: 'img/t-bano-nino.jpg',
    units: 6, totalUnits: 32, tag: 'Nuevo diseño',
    sizes: S_16,
    desc: 'Con estampado de escualo valiente y forro cómodo. Listo para la piscina, la playa y las guerras de agua.'
  },
  {
    id: 'p39', name: 'Jeans Rodillas Reforzadas',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 27, oldPrice: null, img: 'img/g-jeans-nino.jpg',
    units: 6, totalUnits: 34, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Vaquero de verdad pero con estiramiento y refuerzo donde toca. Sobrevive al tobogán y al suelo del parque.'
  },
  {
    id: 'p40', name: 'Chaqueta Cortavientos',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 32, oldPrice: null, img: 'img/g-chaqueta-nino.jpg',
    units: 5, totalUnits: 28, tag: 'Nuevo diseño',
    sizes: S_26,
    desc: 'Ligera, con capucha y repele la llovizna. Se guarda en su propio bolsillo para llevar a todas partes.'
  },
  {
    id: 'p41', name: 'Polos Piqué · Pack 3',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 28, oldPrice: null, img: 'img/g-polo-nino.jpg',
    units: 7, totalUnits: 36, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Tres polos de piqué con detalle bordado: celeste, menta y gris. Arreglado en segundos, cómodo todo el día.'
  },
  {
    id: 'p42', name: 'Conjunto Deportivo Niño',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 25, oldPrice: null, img: 'img/g-deportivo-nino.jpg',
    units: 7, totalUnits: 34, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Franela y short de entreno que respiran de verdad. Para fútbol, bici y todo lo que invente por el camino.'
  },
  {
    id: 'p43', name: 'Pijama Corto Verano',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'unisex',
    price: 17, oldPrice: null, img: 'img/t-pijama-corto.jpg',
    units: 8, totalUnits: 38, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Camiseta y short de punto fino para noches cálidas. Fresco, suave y sin costuras que molestan.'
  },
  {
    id: 'p68', name: 'Conjunto Camisa y Tirantes',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 28, oldPrice: null, img: 'img/r-camisa-tirantes.jpg',
    units: 5, totalUnits: 26, tag: 'Nuevo diseño',
    sizes: S_26,
    desc: 'Camisa blanca de cuello suave con shorts arena y tirantes desmontables: elegante de verdad, cómodo de verdad.'
  },
  {
    id: 'p69', name: 'Chaleco Punto Caballero',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 22, oldPrice: null, img: 'img/r-chaleco-punto.jpg',
    units: 7, totalUnits: 32, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Chaleco de punto verde salvia con camisa crema incluida: el conjunto que viste bonito sin arrugar.'
  },
  {
    id: 'p76', name: 'Pantalón Lino Niño',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 21, oldPrice: null, img: 'img/r-pantalon-lino.jpg',
    units: 7, totalUnits: 30, tag: 'Nuevo diseño',
    sizes: S_26,
    desc: 'Lino color arena con cintura elástica y cordón: fresco para el verano, elegante para la foto familiar.'
  },
  {
    id: 'p77', name: 'Camisa Cuadros Pastel',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-6 años', gender: 'nino',
    price: 18, oldPrice: null, img: 'img/r-camisa-cuadros.jpg',
    units: 9, totalUnits: 38, tag: 'Edición limitada',
    sizes: S_16,
    desc: 'Cuadritos suaves en celeste y crema, algodón que no raspa y cuello que no incomoda. Elegante sin complicarse.'
  },
  {
    id: 'p78', name: 'Jersey Cuello V Punto Fino',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-6 años', gender: 'nino',
    price: 20, oldPrice: null, img: 'img/r-jersey-v.jpg',
    units: 8, totalUnits: 34, tag: 'Edición limitada',
    sizes: S_26,
    desc: 'Punto fino verde salvia con franja crema: el jersey que va con camisa, solo o sobre la guarde.'
  },
  {
    id: 'p79', name: 'Blazer Fino Niño',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '3-6 años', gender: 'nino',
    price: 26, oldPrice: null, img: 'img/r-blazer-nino.jpg',
    units: 5, totalUnits: 24, tag: 'Nuevo diseño',
    sizes: S_36,
    desc: 'Blazer azul grisáceo con parches en los codos y pañuelito de bolsillo: para bodas, bautizos y grandes días.'
  },

  /* ============================================================
     4 · PUERICULTURA & COMIDA · 0-36 MESES
     ============================================================ */
  {
    id: 'p50', name: 'Teteros Cristal Pastel · Pack 2',
    type: 'pueri', typeLabel: 'Puericultura', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 16, oldPrice: null, img: 'img/a-teteros.jpg',
    units: 9, totalUnits: 40, tag: 'Nuevo diseño',
    sizes: U,
    desc: 'Dos teteros de cristal con funda de silicona en rosa y salvia. Tetina de caucho natural, libre de BPA, flujo medio.'
  },
  {
    id: 'p51', name: 'Vaso Entrenador 360° + Popote',
    type: 'pueri', typeLabel: 'Puericultura', age: 'bebe', ageLabel: '6 meses+', gender: 'unisex',
    price: 12, oldPrice: null, img: 'img/a-vaso.jpg',
    units: 10, totalUnits: 40, tag: 'Edición limitada',
    sizes: U,
    desc: 'Vaso 360° a prueba de derrames y vaso de popote suave para el paso del biberón al vaso. Fácil de limpiar.'
  },
  {
    id: 'p52', name: 'Set de Comida con Ventosa · 4 piezas',
    type: 'pueri', typeLabel: 'Puericultura', age: 'bebe', ageLabel: '6 meses+', gender: 'unisex',
    price: 18, oldPrice: null, img: 'img/a-set-comida.jpg',
    units: 8, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: U,
    desc: 'Plato dividido con ventosa que no se voltea, bol con tapa, cuchara y tenedor de silicona. Libre de BPA, apto lavavajillas.'
  },
  {
    id: 'p53', name: 'Baberos de Silicona · Pack 2',
    type: 'pueri', typeLabel: 'Puericultura', age: 'bebe', ageLabel: '6 meses+', gender: 'unisex',
    price: 10, oldPrice: null, img: 'img/a-babero-silicona.jpg',
    units: 12, totalUnits: 48, tag: 'Edición limitada',
    sizes: U,
    desc: 'Baberos enrollables con bolsillo recolector en rosa y amarillo: atrapan la comida, se aclaran en un segundo y duran para siempre.'
  },
  {
    id: 'p54', name: 'Rasca Encías Frutitas',
    type: 'pueri', typeLabel: 'Puericultura', age: 'bebe', ageLabel: '3 meses+', gender: 'unisex',
    price: 9, oldPrice: null, img: 'img/a-rasca-frutas.jpg',
    units: 11, totalUnits: 45, tag: 'Nuevo diseño',
    sizes: U,
    desc: 'Tres mordedores de frutas en silicona alimentaria con aro de madera: alivian las encías y son fáciles de agarrar.'
  },
  {
    id: 'p55', name: 'Mordedor Nube & Estrella',
    type: 'pueri', typeLabel: 'Puericultura', age: 'bebe', ageLabel: '0 meses+', gender: 'unisex',
    price: 8, oldPrice: null, img: 'img/a-rasca-nube.jpg',
    units: 12, totalUnits: 50, tag: 'Edición limitada',
    sizes: U,
    desc: 'Silicona suave en forma de nube y estrellita con aro de haya natural. Ligero, refrigerable y con texturas que calman.'
  },

  /* ============================================================
     5 · JUGUETES · 0-6 AÑOS
     ============================================================ */
  {
    id: 'p56', name: 'Ladrillitos Pastel · 60 piezas',
    type: 'jugu', typeLabel: 'Juguetes', age: 'kids', ageLabel: '1-6 años', gender: 'unisex',
    price: 22, oldPrice: null, img: 'img/j-bloques.jpg',
    units: 7, totalUnits: 30, tag: 'Nuevo diseño',
    sizes: U,
    desc: 'Set de construcción estilo lego en tonos pastel: piezas grandes y redondeadas que apilan y encajan fácil. Motorcitos en marcha.'
  },
  {
    id: 'p57', name: 'Puzzle de Madera Animalitos',
    type: 'jugu', typeLabel: 'Juguetes', age: 'bebe', ageLabel: '1-3 años', gender: 'unisex',
    price: 16, oldPrice: null, img: 'img/j-puzzle-madera.jpg',
    units: 8, totalUnits: 32, tag: 'Edición limitada',
    sizes: U,
    desc: 'Elefante, león y conejo de madera haya con pomos fáciles de agarrar. Primeros puzzles que enseñan y decoran.'
  },
  {
    id: 'p58', name: 'Piano de Patadas Pastel',
    type: 'jugu', typeLabel: 'Juguetes', age: 'bebe', ageLabel: '0-3 años', gender: 'unisex',
    price: 34, oldPrice: null, img: 'img/j-piano.jpg',
    units: 5, totalUnits: 25, tag: 'Nuevo diseño',
    sizes: U,
    desc: 'Gimnasio y piano de patadas con arcos de peluches colgantes: melodías suaves, luces tenues y horas de pataditas felices.'
  },
  {
    id: 'p59', name: 'Cubos Apilables Anidados',
    type: 'jugu', typeLabel: 'Juguetes', age: 'bebe', ageLabel: '0-4 años', gender: 'unisex',
    price: 14, oldPrice: null, img: 'img/j-cubos.jpg',
    units: 9, totalUnits: 38, tag: 'Edición limitada',
    sizes: U,
    desc: 'Diez cubos que se apilan, encajan y esconden sorpresas: enseñan tamaños y números en rosa, salvia y celeste.'
  },

  /* ============================================================
     6 · MANTAS & PAÑALES · TEXTIL DEL BEBÉ
     ============================================================ */
  {
    id: 'p60', name: 'Mantita Muselina · Pack 2',
    type: 'textil', typeLabel: 'Mantas & Pañales', age: 'bebe', ageLabel: '0-3 años', gender: 'unisex',
    price: 18, oldPrice: null, img: 'img/x-mantita-muselina.jpg',
    units: 8, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: U,
    desc: 'Dos arrullos de doble gasa con ribete de pompones, en rosa y salvia: fresquita para el verano, acogedora todo el año.'
  },
  {
    id: 'p61', name: 'Mantita Punto Cuna Calada',
    type: 'textil', typeLabel: 'Mantas & Pañales', age: 'bebe', ageLabel: '0-3 años', gender: 'unisex',
    price: 26, oldPrice: null, img: 'img/x-mantita-cuna.jpg',
    units: 6, totalUnits: 28, tag: 'Edición limitada',
    sizes: U,
    desc: 'Punto grueso en crema y celeste con borde calado: abriga la cuna sin pesar y es la manta de las fotos que se guardan.'
  },
  {
    id: 'p62', name: 'Pañales de Tela Ajustables · Pack 4',
    type: 'textil', typeLabel: 'Mantas & Pañales', age: 'bebe', ageLabel: '0-2 años', gender: 'unisex',
    price: 24, oldPrice: null, img: 'img/x-panales.jpg',
    units: 6, totalUnits: 30, tag: 'Nuevo diseño',
    sizes: ['Talla única · 3-15 kg'],
    desc: 'Cuatro pañales con estampados pastel, capa exterior impermeable e insertos de bambú súper absorbentes. Botones que crecen con tu bebé.'
  },

  /* ============================================================
     7 · ACCESORIOS · 0-6 AÑOS
     ============================================================ */
  {
    id: 'p44', name: 'Baberos Bandana · Pack 3',
    type: 'acc', typeLabel: 'Accesorios', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 12, oldPrice: null, img: 'img/n-baberos.jpg',
    units: 10, totalUnits: 45, tag: 'Edición limitada',
    sizes: U,
    desc: 'Tres bandanas absorbentes con doble capa y cierre a presión. Babitas controladas con mucho estilo.'
  },
  {
    id: 'p45', name: 'Gorra Anti-Sol Bebé',
    type: 'acc', typeLabel: 'Accesorios', age: 'bebe', ageLabel: '6-24 meses', gender: 'unisex',
    price: 9, oldPrice: null, img: 'img/t-gorra-bebe.jpg',
    units: 9, totalUnits: 40, tag: 'Edición limitada',
    sizes: ['6-12M', '12-18M', '18-24M'],
    desc: 'Ala ancha y tela con protección para jugar bajo el sol sin sustos. Ajuste suave que no molesta.'
  },
  {
    id: 'p46', name: 'Gorritos Suaves · Pack 3',
    type: 'acc', typeLabel: 'Accesorios', age: 'bebe', ageLabel: '0-12 meses', gender: 'unisex',
    price: 14, oldPrice: null, img: 'img/t-gorra-pack.jpg',
    units: 8, totalUnits: 38, tag: 'Edición limitada',
    sizes: ['0-3M', '3-6M', '6-12M'],
    desc: 'Tres gorritos de algodón peinado en tonos tiernos. Cubre orejitas sin apretar y combina con todo.'
  },
  {
    id: 'p47', name: 'Calcetines Antideslizantes · 6 pares',
    type: 'acc', typeLabel: 'Accesorios', age: 'bebe', ageLabel: '0-4 años', gender: 'unisex',
    price: 12, oldPrice: null, img: 'img/t-calcetines.jpg',
    units: 10, totalUnits: 50, tag: 'Nuevo diseño',
    sizes: ['0-12M', '12-24M', '2-4A'],
    desc: 'Seis pares con suela de gomita antideslizante: primeros pasos seguros por toda la casa.'
  },
  {
    id: 'p48', name: 'Sandalias Fresh',
    type: 'acc', typeLabel: 'Accesorios', age: 'kids', ageLabel: '2-6 años', gender: 'unisex',
    price: 19, oldPrice: null, img: 'img/t-sandalias.jpg',
    units: 6, totalUnits: 30, tag: 'Edición limitada',
    sizes: ['21', '22', '23', '24', '25', '26'],
    desc: 'Suela flexible, velcro fácil y plantilla blandita. Las sandalias que ellos mismos se ponen y quitan.'
  },
  {
    id: 'p49', name: 'Mochila Animalitos',
    type: 'acc', typeLabel: 'Accesorios', age: 'kids', ageLabel: '1-6 años', gender: 'unisex',
    price: 24, oldPrice: null, img: 'img/n-mochila.jpg',
    units: 5, totalUnits: 28, tag: 'Últimas unidades',
    sizes: U,
    desc: 'Ligera, con tirantes acolchados y bolsillo para la merienda. La compañera oficial de la guarde.'
  }
];
