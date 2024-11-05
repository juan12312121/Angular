const db = require('../config/database');

const Maintenance = {
    create: (data, callback) => {
        const query = `
            INSERT INTO mantenimiento (id_carro, tipo_mantenimiento, costo, fecha_mantenimiento, descripcion, mecanico) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(query, [data.id_carro, data.tipo_mantenimiento, data.costo, data.fecha_mantenimiento, data.descripcion, data.mecanico], callback);
    },

    getAll: (callback) => { 
        const query = 'SELECT * FROM mantenimiento';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM mantenimiento WHERE id_mantenimiento = ?';
        db.query(query, [id], callback);
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE mantenimiento 
            SET id_carro = ?, tipo_mantenimiento = ?, costo = ?, fecha_mantenimiento = ?, descripcion = ?, mecanico = ? 
            WHERE id_mantenimiento = ?`;
        db.query(query, [data.id_carro, data.tipo_mantenimiento, data.costo, data.fecha_mantenimiento, data.descripcion, data.mecanico, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM mantenimiento WHERE id_mantenimiento = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Maintenance;
