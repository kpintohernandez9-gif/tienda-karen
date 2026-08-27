/* ============================================================
   KHC KIDS · Colección premium (edición limitada)
   Ropa de gran calidad, cómoda, duradera y exclusiva.
   Cada diseño se fabrica en pocas unidades.
   Catálogo completo: solo de 0 a 6 años.
   ============================================================ */
window.KHC_TYPES = [
  { id: 'bebe', label: 'Bebés 0-24m' },
  { id: 'nina', label: 'Niñas 1-6 años' },
  { id: 'nino', label: 'Niños 1-6 años' },
  { id: 'acc',  label: 'Accesorios' }
];

var S_BEBE  = ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'];
var S_16    = ['1-2A', '2-3A', '3-4A', '5-6A'];
var S_26    = ['2-3A', '3-4A', '5-6A'];
var S_36    = ['3-4A', '5-6A'];

window.KHC_PRODUCTS = [
  /* ---------------- BEBÉS · 0-24 MESES ---------------- */
  {
    id: 'p01', name: 'Body de Algodón Suave',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 14, oldPrice: null, img: 'img/01-bodies.jpg',
    units: 7, totalUnits: 40, tag: 'Edición limitada',
    sizes: S_BEBE,
    desc: 'Algodón suave y transpirable, amable con la piel de tu bebé. Costuras planas y cierre fácil para el día a día.'
  },
  {
    id: 'p02', name: 'Pelele de Noche Estrella',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 18, oldPrice: null, img: 'img/02-pelele.jpg',
    units: 5, totalUnits: 35, tag: 'Edición limitada',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    desc: 'Tejido dulce para noches tranquilas. Mantiene su suavidad y su forma lavado tras lavado.'
  },
  {
    id: 'p03', name: 'Conjunto Recién Nacido',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 22, oldPrice: null, img: 'img/03-conjunto-rn.jpg',
    units: 9, totalUnits: 40, tag: 'Nuevo diseño',
    sizes: ['6-12M', '12-18M', '18-24M'],
    desc: 'Dos piezas pensadas para la piel más delicada: cómodo, duradero y con un acabado de boutique.'
  },
  {
    id: 'p13', name: 'Mameluco Fresquito · Pack 2',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '0-18 meses', gender: 'unisex',
    price: 18, oldPrice: null, img: 'img/t-mameluco.jpg',
    units: 8, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    desc: 'Dos mamelucos ligeros de tirantes, perfectos para los días de calor. Tejido fresco que no marca y botones fáciles.'
  },
  {
    id: 'p14', name: 'Bata Toalla con Capucha',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '6-24 meses', gender: 'unisex',
    price: 20, oldPrice: null, img: 'img/n-bata-toalla.jpg',
    units: 6, totalUnits: 30, tag: 'Edición limitada',
    sizes: ['6-12M', '12-18M', '18-24M'],
    desc: 'Salida de baño con capucha de animalito: abraza, seca y abriga al salir del agua. Rizo suave y súper absorbente.'
  },
  {
    id: 'p15', name: 'Set Regalo Recién Nacido · 5 piezas',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '0-6 meses', gender: 'unisex',
    price: 28, oldPrice: null, img: 'img/n-setrn.jpg',
    units: 4, totalUnits: 25, tag: 'Últimas unidades',
    sizes: ['0-3M', '3-6M'],
    desc: 'Body, pelele, gorrito, manoplas y escarpines en una caja lista para regalar. El detalle perfecto para dar la bienvenida.'
  },
  {
    id: 'p16', name: 'Enterizo Polar Orejas de Oso',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '3-24 meses', gender: 'unisex',
    price: 26, oldPrice: null, img: 'img/g-enterizo-bebe.jpg',
    units: 6, totalUnits: 30, tag: 'Nuevo diseño',
    sizes: ['3-6M', '6-12M', '12-18M', '18-24M'],
    desc: 'Mullidito por dentro y por fuera, con capucha de orejas que derrite corazones. Abrigo total sin peso para el invierno del bebé.'
  },

  /* ---------------- NIÑAS · 1-6 AÑOS ---------------- */
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

  /* ---------------- NIÑOS · 1-6 AÑOS ---------------- */
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

  /* ---------------- ACCESORIOS · 0-6 AÑOS ---------------- */
  {
    id: 'p44', name: 'Baberos Bandana · Pack 3',
    type: 'acc', typeLabel: 'Accesorios', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 12, oldPrice: null, img: 'img/n-baberos.jpg',
    units: 10, totalUnits: 45, tag: 'Edición limitada',
    sizes: ['Talla única'],
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
    sizes: ['Talla única'],
    desc: 'Ligera, con tirantes acolchados y bolsillo para la merienda. La compañera oficial de la guarde.'
  }
];
