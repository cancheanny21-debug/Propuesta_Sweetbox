const sequelize = require('./db');
const Postre = require('../models/Postre');
const OpcionPostre = require('../models/OpcionPostre');

const postresMuestra = [
  {
    nombre: 'Personalized Rainbow Cake',
    categoria: 'Pasteles',
    descripcion: 'Delicioso pastel multicolor de vainilla, ideal para cumpleaños y eventos especiales.',
    precio: 25.00,
    imagen_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60',
    calificacion: 4.8,
    opciones: [
      { tipo: 'sabor', valor: 'Vainilla' },
      { tipo: 'sabor', valor: 'Chocolate' },
      { tipo: 'sabor', valor: 'Red Velvet' },
      { tipo: 'relleno', valor: 'Fresa' },
      { tipo: 'relleno', valor: 'Nutella' },
      { tipo: 'relleno', valor: 'Crema Pastelera' }
    ]
  },
  {
    nombre: 'Choco-Berry Delight',
    categoria: 'Pasteles',
    descripcion: 'Pastel de chocolate belga cubierto con fresas frescas y ganache de chocolate oscuro.',
    precio: 28.50,
    imagen_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80',
    calificacion: 4.9,
    opciones: [
      { tipo: 'sabor', valor: 'Chocolate Oscuro' },
      { tipo: 'sabor', valor: 'Chocolate de Leche' },
      { tipo: 'relleno', valor: 'Fresa' },
      { tipo: 'relleno', valor: 'Frambuesa' }
    ]
  },
  {
    nombre: 'Box of Macarons',
    categoria: 'Galletas',
    descripcion: 'Elegante caja de macarons surtidos de sabores tradicionales franceses.',
    precio: 15.00,
    imagen_url: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&auto=format&fit=crop&q=60',
    calificacion: 4.5,
    opciones: []
  },
  {
    nombre: 'Cupcake Arcoíris',
    categoria: 'Cupcakes',
    descripcion: 'Cupcake decorado con betún de colores y chispitas brillantes.',
    precio: 3.50,
    imagen_url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&auto=format&fit=crop&q=60',
    calificacion: 4.7,
    opciones: [
      { tipo: 'sabor', valor: 'Vainilla' },
      { tipo: 'sabor', valor: 'Red Velvet' }
    ]
  },
  {
    nombre: 'Brownie de Chocolate y Nuez',
    categoria: 'Brownies',
    descripcion: 'Brownie meloso con chispas de chocolate y trocitos de nuez pecana.',
    precio: 4.00,
    imagen_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60',
    calificacion: 4.6,
    opciones: []
  },
  {
    nombre: 'Galletas de Chispas de Chocolate',
    categoria: 'Galletas',
    descripcion: 'Galletas clásicas americanas súper crujientes con chispas de chocolate semi-amargo.',
    precio: 2.50,
    imagen_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60',
    calificacion: 4.4,
    opciones: []
  }
];

const seedDatabase = async () => {
  try {
    // Sincronizar modelos
    await sequelize.sync({ force: false });

    // Verificar si ya existen postres para evitar duplicados
    const count = await Postre.count();
    if (count > 0) {
      console.log('🌱 La base de datos ya contiene postres. Omitiendo seed.');
      return;
    }

    console.log('🌱 Poblando la base de datos de SweetBox...');

    for (const p of postresMuestra) {
      const { opciones, ...datosPostre } = p;
      const nuevoPostre = await Postre.create(datosPostre);

      if (opciones && opciones.length > 0) {
        const opcionesConId = opciones.map(o => ({
          ...o,
          postre_id: nuevoPostre.id
        }));
        await OpcionPostre.bulkCreate(opcionesConId);
      }
    }

    console.log('✅ Base de datos poblada exitosamente.');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  }
};

module.exports = seedDatabase;
