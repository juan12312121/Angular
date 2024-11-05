const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/controladorReservacion');

// Crear una nueva reserva
router.post('/', ReservationController.createReservation);

// Obtener todas las reservas
router.get('/', ReservationController.getAllReservations);

// Obtener reservas por ID de usuario
router.get('/usuario/:id_usuario', ReservationController.getReservationByUserId); 

// Obtener reserva por ID de la reserva
router.get('/:id_reserva', ReservationController.getReservationById); 

// Actualizar el estado de la reserva
router.put('/:id_reserva', ReservationController.updateReservationStatus);

// Eliminar una reserva
router.delete('/:id_reserva', ReservationController.deleteReservation); 

module.exports = router;
