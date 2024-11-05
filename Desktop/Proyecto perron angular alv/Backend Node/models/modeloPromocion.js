const db = require('../config/database');

// Modelo para manejar operaciones con promociones
const PromotionModel = {
  // Crear una nueva promoción
  createPromotion: (nombre, descuento, fechaInicio, fechaFin, callback) => {
    const query = 'INSERT INTO promociones (nombre, descuento, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, descuento, fechaInicio, fechaFin], callback);
  },

  // Obtener todas las promociones
  getAllPromotions: (callback) => {
    const query = 'SELECT * FROM promociones';
    db.query(query, callback);
  },

  // Obtener una promoción por ID
  getPromotionById: (id, callback) => {
    const query = 'SELECT * FROM promociones WHERE id_promocion = ?';
    db.query(query, [id], callback);
  },

  // Actualizar una promoción
  updatePromotion: (id, nombre, descuento, fechaInicio, fechaFin, callback) => {
    const query = 'UPDATE promociones SET nombre = ?, descuento = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_promocion = ?';
    db.query(query, [nombre, descuento, fechaInicio, fechaFin, id], callback);
  },

  // Eliminar una promoción
  deletePromotion: (id, callback) => {
    const query = 'DELETE FROM promociones WHERE id_promocion = ?';
    db.query(query, [id], callback);
  }
};

module.exports = PromotionModel;
