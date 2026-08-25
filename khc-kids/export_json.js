// exporta el catálogo de la tienda a JSON para generar el catálogo en PDF
global.window = {};
require('./js/data.js');
process.stdout.write(JSON.stringify({ products: window.KHC_PRODUCTS, types: window.KHC_TYPES }));
