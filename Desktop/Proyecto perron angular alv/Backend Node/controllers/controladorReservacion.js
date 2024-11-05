const Reservation = require('../models/modeloReservacion');

// Crear una nueva reserva
exports.createReservation = (req, res) => {
    const data = {
        id_usuario: req.body.id_usuario,
        id_carro: req.body.id_carro,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        monto_reserva: req.body.monto_reserva,
        id_tipo_renta: req.body.id_tipo_renta,
    };

    Reservation.create(data, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear la reserva.', error: err });
        }
        res.status(201).json({ message: 'Reserva creada con éxito.', result });
    });
};

// Obtener todas las reservas
exports.getAllReservations = (req, res) => {
    Reservation.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las reservas.', error: err });
        }
        res.status(200).json(result);
    });
};

// Obtener reservas por ID de usuario
exports.getReservationByUserId = (req, res) => {
    const userId = req.params.id_usuario;
    Reservation.getByUserId(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la reserva.', error: err });
        }
        res.status(200).json(result);
    });
};

// Obtener reserva por ID de la reserva
exports.getReservationById = (req, res) => {
    const reservationId = req.params.id_reserva;
    Reservation.getById(reservationId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la reserva.', error: err });
        }
        res.status(200).json(result);
    });
};

// Actualizar el estado de la reserva
exports.updateReservationStatus = (req, res) => {
    const reservationId = req.params.id_reserva;
    const status = req.body.estado_reserva;

    Reservation.updateStatus(reservationId, status, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el estado de la reserva.', error: err });
        }
        res.status(200).json({ message: 'Estado de la reserva actualizado con éxito.' });
    });
};

// Eliminar una reserva
exports.deleteReservation = (req, res) => {
    const reservationId = req.params.id_reserva;

    Reservation.delete(reservationId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar la reserva.', error: err });
        }
        res.status(200).json({ message: 'Reserva eliminada con éxito.' });
    });
};
