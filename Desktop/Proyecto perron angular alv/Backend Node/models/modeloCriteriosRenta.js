const db = require('../config/database');

const CriteriosRenta = {
    // Crear un nuevo criterio de renta
    create: (data, callback) => {
        const query = 'INSERT INTO criterios_renta (descripcion, min_valoraciones, max_incidencias, aplicable_a_tipo_renta) VALUES (?, ?, ?, ?)';
        db.query(query, [data.descripcion, data.min_valoraciones, data.max_incidencias, data.aplicable_a_tipo_renta || null], callback);
    },
    
    // Obtener todos los criterios de renta
    getAll: (callback) => {
        const query = 'SELECT * FROM criterios_renta';
        db.query(query, callback);
    },
    
    // Obtener un criterio de renta por ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM criterios_renta WHERE id_criterio = ?';
        db.query(query, [id], callback);
    },
    
    // Actualizar un criterio de renta
    update: (id, data, callback) => {
        const query = 'UPDATE criterios_renta SET descripcion = ?, min_valoraciones = ?, max_incidencias = ?, aplicable_a_tipo_renta = ? WHERE id_criterio = ?';
        db.query(query, [data.descripcion, data.min_valoraciones, data.max_incidencias, data.aplicable_a_tipo_renta || null, id], callback);
    },
    
    // Eliminar un criterio de renta
    delete: (id, callback) => {
        const query = 'DELETE FROM criterios_renta WHERE id_criterio = ?';
        db.query(query, [id], callback);
    },
};

module.exports = CriteriosRenta;
