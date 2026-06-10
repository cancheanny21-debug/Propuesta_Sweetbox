const Postre = require('../models/Postre');
const OpcionPostre = require('../models/OpcionPostre');
const { Op } = require('sequelize');

exports.getAllPostres = async (req, res) => {
  try {
    const { categoria, search } = req.query;
    const whereClause = {};

    if (categoria && categoria !== 'Todos') {
      whereClause.categoria = categoria;
    }

    if (search) {
      whereClause.nombre = {
        [Op.substring]: search
      };
    }

    const postres = await Postre.findAll({
      where: whereClause,
      include: [
        {
          model: OpcionPostre,
          as: 'opciones'
        }
      ]
    });

    return res.json({ postres });
  } catch (error) {
    console.error('Error al obtener postres:', error);
    return res.status(500).json({ error: 'Error al obtener postres del catálogo.' });
  }
};

exports.getPostreById = async (req, res) => {
  try {
    const { id } = req.params;
    const postre = await Postre.findByPk(id, {
      include: [
        {
          model: OpcionPostre,
          as: 'opciones'
        }
      ]
    });

    if (!postre) {
      return res.status(404).json({ error: 'Postre no encontrado.' });
    }

    return res.json({ postre });
  } catch (error) {
    console.error('Error al obtener postre por ID:', error);
    return res.status(500).json({ error: 'Error al obtener detalles del postre.' });
  }
};
