const db = require('../config/database');

const RentalTypesModel = {
    // Obtener todos los tipos de renta
    getAll: (callback) => {
        const sql = `SELECT * FROM tipos_renta`;
        db.query(sql, callback);
    },

    // Obtener un tipo de renta por ID
    getById: (id, callback) => {
        const sql = `SELECT * FROM tipos_renta WHERE id_tipo_renta = ?`;
        db.query(sql, [id], callback);
    },

    // Insertar un nuevo tipo de renta
    insert: (nombre_tipo, descripcion, precio_base, callback) => {
        const sql = `INSERT INTO tipos_renta (nombre_tipo, descripcion, precio_base) VALUES (?, ?, ?)`;
        db.query(sql, [nombre_tipo, descripcion, precio_base], callback);
    },

    // Actualizar un tipo de renta
    update: (id, nombre_tipo, descripcion, precio_base, callback) => {
        const sql = `UPDATE tipos_renta SET nombre_tipo = ?, descripcion = ?, precio_base = ? WHERE id_tipo_renta = ?`;
        db.query(sql, [nombre_tipo, descripcion, precio_base, id], callback);
    },

    // Eliminar un tipo de renta
    delete: (id, callback) => {
        const sql = `DELETE FROM tipos_renta WHERE id_tipo_renta = ?`;
        db.query(sql, [id], callback);
    },
};

module.exports = RentalTypesModel;
