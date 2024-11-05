const db = require('../config/database');

// Modelo para manejar operaciones con valoraciones
const RatingModel = {
  // Crear una  nueva valoración
  createValoracion: (id_renta, id_carro, id_usuario, valoracion, comentario, callback) => {
    const query = 'INSERT INTO valoraciones (id_renta, id_carro, id_usuario, valoracion, comentario) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id_renta, id_carro, id_usuario, valoracion, comentario], callback);
  },

  // Obtener todas las valoraciones
  getAllValoraciones: (callback) => {
    const query = 'SELECT * FROM valoraciones';
    db.query(query, callback);
  },

  // Obtener una valoración por ID
  getValoracionById: (id, callback) => {
    const query = 'SELECT * FROM valoraciones WHERE id_valoracion = ?';
    db.query(query, [id], callback);
  },

  // Actualizar una valoración
  updateValoracion: (id, id_renta, id_carro, id_usuario, valoracion, comentario, callback) => {
    const query = 'UPDATE valoraciones SET id_renta = ?, id_carro = ?, id_usuario = ?, valoracion = ?, comentario = ? WHERE id_valoracion = ?';
    db.query(query, [id_renta, id_carro, id_usuario, valoracion, comentario, id], callback);
  },

  // Eliminar una valoración
  deleteValoracion: (id, callback) => {
    const query = 'DELETE FROM valoraciones WHERE id_valoracion = ?';
    db.query(query, [id], callback);
  }
};

module.exports = RatingModel;
