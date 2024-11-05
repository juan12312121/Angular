const express = require('express');
const router = express.Router();
const reportController = require('../controllers/controladorReporte');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Crear un nuevo reporte
router.post('/', verifyToken, reportController.createReporte); 

// Obtener todos los reportes (solo administradores)
router.get('/', verifyToken, isAdmin, reportController.getAllReportes); 

// Obtener reportes por ID de usuario
router.get('/user', verifyToken, reportController.getReportesByUser); 

// Eliminar un reporte (solo administradores)
router.delete('/:id', verifyToken, isAdmin, reportController.deleteReporte); 

module.exports = router;
