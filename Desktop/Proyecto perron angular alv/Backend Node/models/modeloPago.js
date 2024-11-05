const db = require('../config/database'); 

const PagosModel = {};

// Obtener detalles de la renta y del usuario
PagosModel.obtenerRentaYUsuario = (id_renta, callback) => {
    const rentaQuery = `SELECT r.precio_total, u.nombre_completo 
                        FROM detalle_renta r 
                        JOIN usuarios u ON r.id_usuario = u.id 
                        WHERE r.id = ?`;
    db.query(rentaQuery, [id_renta], callback);
};

// Registrar el pago en la base de datos
PagosModel.registrarPago = (id_renta, monto, metodo_pago, callback) => {
    const registrarPagoQuery = `INSERT INTO pagos (id_renta, monto, metodo_pago) VALUES (?, ?, ?)`;
    db.query(registrarPagoQuery, [id_renta, monto, metodo_pago], callback);
};

// Obtener pagos de un usuario
PagosModel.obtenerPagosUsuario = (id_usuario, callback) => {
    const query = `SELECT p.*, r.precio_total 
                   FROM pagos p 
                   JOIN detalle_renta r ON p.id_renta = r.id 
                   WHERE r.id_usuario = ?`;
    db.query(query, [id_usuario], callback);
};

// Obtener todos los pagos (para admin)
PagosModel.obtenerTodosPagos = (callback) => {
    const query = `SELECT p.*, r.precio_total, u.nombre_completo 
                   FROM pagos p 
                   JOIN detalle_renta r ON p.id_renta = r.id 
                   JOIN usuarios u ON r.id_usuario = u.id`;
    db.query(query, callback);
};

module.exports = PagosModel;
