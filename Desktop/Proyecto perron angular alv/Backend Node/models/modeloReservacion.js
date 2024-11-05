const db = require('../config/database');

const Reservation = {
    // Crear una nueva reserva
    create: (data, callback) => {
        const query = `
            INSERT INTO reservas (id_usuario, id_carro, fecha_inicio, fecha_fin, estado_reserva, monto_reserva, id_tipo_renta)
            VALUES (?, ?, ?, ?, 'Pendiente', ?, ?)
        `;
        db.query(query, [data.id_usuario, data.id_carro, data.fecha_inicio, data.fecha_fin, data.monto_reserva, data.id_tipo_renta], callback);
    },

    // Obtener todas las reservas con detalles de usuario, carro y tipo de renta
    getAll: (callback) => {
        const query = `
            SELECT 
                r.id_reserva, 
                u.nombre_completo AS usuario, 
                c.marca, 
                c.modelo, 
                c.color, 
                tr.nombre_tipo AS tipo_renta, 
                r.fecha_inicio, 
                r.fecha_fin, 
                r.estado_reserva, 
                r.monto_reserva
            FROM reservas r
            JOIN usuarios u ON r.id_usuario = u.id
            JOIN carros c ON r.id_carro = c.id
            JOIN tipos_renta tr ON r.id_tipo_renta = tr.id_tipo_renta
        `;
        db.query(query, callback);
    },

    // Obtener una reserva por ID de usuario
    getByUserId: (userId, callback) => {
        const query = `
            SELECT 
                r.id_reserva, 
                u.nombre_completo AS usuario, 
                c.marca, 
                c.modelo, 
                c.color, 
                tr.nombre_tipo AS tipo_renta, 
                r.fecha_inicio, 
                r.fecha_fin, 
                r.estado_reserva, 
                r.monto_reserva
            FROM reservas r
            JOIN usuarios u ON r.id_usuario = u.id
            JOIN carros c ON r.id_carro = c.id
            JOIN tipos_renta tr ON r.id_tipo_renta = tr.id_tipo_renta
            WHERE r.id_usuario = ?
        `;
        db.query(query, [userId], callback);
    },

    // Obtener una reserva por ID de la reserva
    getById: (reservationId, callback) => {
        const query = `
            SELECT 
                r.id_reserva, 
                u.nombre_completo AS usuario, 
                c.marca, 
                c.modelo, 
                c.color, 
                tr.nombre_tipo AS tipo_renta, 
                r.fecha_inicio, 
                r.fecha_fin, 
                r.estado_reserva, 
                r.monto_reserva
            FROM reservas r
            JOIN usuarios u ON r.id_usuario = u.id
            JOIN carros c ON r.id_carro = c.id
            JOIN tipos_renta tr ON r.id_tipo_renta = tr.id_tipo_renta
            WHERE r.id_reserva = ?
        `;
        db.query(query, [reservationId], callback);
    },

    // Actualizar el estado de la reserva (Confirmada o Cancelada)
    updateStatus: (reservationId, status, callback) => {
        const query = 'UPDATE reservas SET estado_reserva = ? WHERE id_reserva = ?';
        db.query(query, [status, reservationId], callback);
    },

    // Eliminar una reserva
    delete: (reservationId, callback) => {
        const query = 'DELETE FROM reservas WHERE id_reserva = ?';
        db.query(query, [reservationId], callback);
    },
};

module.exports = Reservation;
