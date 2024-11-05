const express = require('express');
const router = express.Router();
const { crearValoracion, getAllValoraciones, getValoracionById } = require('../controllers/controladorCalificacion');
const { verifyToken, isUser, isAdmin } = require('../middlewares/authMiddleware');

// Ruta para crear una nueva valoración (solo para usuarios autenticados)
router.post('/', verifyToken, isUser, crearValoracion);

// Ruta para obtener todas las valoraciones (disponible para administradores o usuarios autenticados)
router.get('/', verifyToken, getAllValoraciones);

// Ruta para obtener una valoración por ID (disponible para administradores o usuarios autenticados)
router.get('/:id', verifyToken, getValoracionById);

module.exports = router;
