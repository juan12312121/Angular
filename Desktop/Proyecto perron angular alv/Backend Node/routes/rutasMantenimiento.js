const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/controladorMantenimiento');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // Assuming you have these middleware functions

// Crear un nuevo mantenimiento
router.post('/', verifyToken, maintenanceController.createMaintenance); 

// Obtener todos los mantenimientos para el usuario autenticado
router.get('/', verifyToken, maintenanceController.getAllMaintenances); 

// Obtener mantenimiento por ID (solo para administradores)
router.get('/:id', verifyToken, isAdmin, maintenanceController.getMaintenanceById); 

// Actualizar un mantenimiento (solo administradores)
router.put('/:id', verifyToken, isAdmin, maintenanceController.updateMaintenance); 

// Eliminar un mantenimiento (solo administradores)
router.delete('/:id', verifyToken, isAdmin, maintenanceController.deleteMaintenance); 

module.exports = router;
