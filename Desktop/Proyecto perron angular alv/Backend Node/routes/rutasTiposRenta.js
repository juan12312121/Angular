const express = require('express');
const router = express.Router();
const RentalTypesController = require('../controllers/controladorTiposRenta');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); 

// Obtener todos los tipos de renta (accesible para todos los usuarios)
router.get('/', verifyToken, RentalTypesController.getAllRentalTypes);

// Obtener un tipo de renta por ID (accesible para todos los usuarios)
router.get('/:id', verifyToken, RentalTypesController.getRentalTypeById);

// Crear un nuevo tipo de renta (solo para administradores)
router.post('/', verifyToken, isAdmin, RentalTypesController.createRentalType);

// Actualizar un tipo de renta (solo para administradores)
router.put('/:id', verifyToken, isAdmin, RentalTypesController.updateRentalType);

// Eliminar un tipo de renta (solo para administradores)
router.delete('/:id', verifyToken, isAdmin, RentalTypesController.deleteRentalType);

module.exports = router;
