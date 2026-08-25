/* ============================================================
   KHC KIDS · Colección premium (edición limitada)
   Ropa de gran calidad, cómoda, duradera y exclusiva.
   Cada diseño se fabrica en pocas unidades.
   ============================================================ */
window.KHC_TYPES = [
  { id: 'bebe', label: 'Bebés 0-24m' },
  { id: 'nina', label: 'Niñas' },
  { id: 'nino', label: 'Niños' }
];

window.KHC_PRODUCTS = [
  {
    id: 'p01', name: 'Body de Algodón Suave',
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '0-24 meses', gender: 'unisex',
    price: 14, oldPrice: null, img: 'img/01-bodies.jpg',
    units: 7, totalUnits: 40, tag: 'Edición limitada',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
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
    type: 'bebe', typeLabel: 'Bebés', age: 'bebe', ageLabel: '6-24 meses', gender: 'unisex',
    price: 22, oldPrice: null, img: 'img/03-conjunto-rn.jpg',
    units: 9, totalUnits: 40, tag: 'Nuevo diseño',
    sizes: ['6-12M', '12-18M', '18-24M'],
    desc: 'Dos piezas pensadas para la piel más delicada: cómodo, duradero y con un acabado de boutique.'
  },
  {
    id: 'p04', name: 'Vestido Floral Primavera',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 26, oldPrice: null, img: 'img/04-vestido-floral.jpg',
    units: 6, totalUnits: 45, tag: 'Edición limitada',
    sizes: ['1-2A', '2-3A', '3-4A', '5-6A'],
    desc: 'Estampado floral exclusivo y vuelo justo para girar sin parar. Tela que resiste el sol y la lavadora.'
  },
  {
    id: 'p05', name: 'Vestido de Tul Ceremonia',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-8 años', gender: 'nina',
    price: 32, oldPrice: null, img: 'img/07-vestido-tul.jpg',
    units: 4, totalUnits: 30, tag: 'Edición limitada',
    sizes: ['1-2A', '2-3A', '3-4A', '5-6A', '7-8A'],
    desc: 'Nuestro diseño de ceremonia: tul suave que no pica y un acabado digno de heredarse.'
  },
  {
    id: 'p06', name: 'Conjunto Dulce Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/08-conjunto-nina.jpg',
    units: 8, totalUnits: 40, tag: 'Edición limitada',
    sizes: ['1-2A', '2-3A', '3-4A', '5-6A'],
    desc: 'Comodidad absoluta para jugar todo el día, con un estilo que enamora en cada foto.'
  },
  {
    id: 'p07', name: 'Vestido Camisero Lino',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '2-10 años', gender: 'nina',
    price: 28, oldPrice: null, img: 'img/n-vestido-camisero.jpg',
    units: 6, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: ['2-3A', '3-4A', '5-6A', '7-8A', '9-10A'],
    desc: 'Aire de lino, tacto suave y costuras reforzadas. Un básico elevado que dura temporadas.'
  },
  {
    id: 'p08', name: 'Mono Flores Niña',
    type: 'nina', typeLabel: 'Niñas', age: 'nina', ageLabel: '1-6 años', gender: 'nina',
    price: 24, oldPrice: null, img: 'img/n-mono-nina.jpg',
    units: 3, totalUnits: 30, tag: 'Últimas unidades',
    sizes: ['1-2A', '2-3A', '3-4A', '5-6A'],
    desc: 'Una sola pieza, mil aventuras. Tejido resistente que aguanta el ritmo de las que no paran.'
  },
  {
    id: 'p09', name: 'Pijama Dino',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-8 años', gender: 'nino',
    price: 19, oldPrice: null, img: 'img/05-pijama-dino.jpg',
    units: 7, totalUnits: 45, tag: 'Edición limitada',
    sizes: ['1-2A', '2-3A', '3-4A', '5-6A', '7-8A'],
    desc: 'Suave por dentro, valiente por fuera. Puños que no aprietan y colores que no se apagan.'
  },
  {
    id: 'p10', name: 'Conjunto Aventurero',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-6 años', gender: 'nino',
    price: 24, oldPrice: null, img: 'img/06-conjunto-nene.jpg',
    units: 8, totalUnits: 40, tag: 'Edición limitada',
    sizes: ['1-2A', '2-3A', '3-4A', '5-6A'],
    desc: 'Cortes que dejan moverse, saltar y trepar. Refuerzos donde ellos más lo exigen.'
  },
  {
    id: 'p11', name: 'Peto Denim Suave',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '1-8 años', gender: 'nino',
    price: 26, oldPrice: null, img: 'img/n-peto-nino.jpg',
    units: 5, totalUnits: 35, tag: 'Nuevo diseño',
    sizes: ['1-2A', '2-3A', '3-4A', '5-6A', '7-8A'],
    desc: 'El denim de siempre, pero suave de verdad. Duradero, cómodo y con estilo propio.'
  },
  {
    id: 'p12', name: 'Sudadera Nube',
    type: 'nino', typeLabel: 'Niños', age: 'nino', ageLabel: '2-10 años', gender: 'unisex',
    price: 22, oldPrice: null, img: 'img/09-sudadera.jpg',
    units: 9, totalUnits: 50, tag: 'Edición limitada',
    sizes: ['2-3A', '3-4A', '5-6A', '7-8A', '9-10A'],
    desc: 'Interior afelpado como una nube. Abriga sin pesar y mantiene su forma temporada tras temporada.'
  }
];
