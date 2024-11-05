  const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/controladorAutenticacion');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/registro', AuthController.register);
router.post('/login', AuthController.login);

// Ruta solo accesible por administradores (rol = 10)
router.get('/admin', authMiddleware.verifyToken, authMiddleware.isAdmin, (req, res) => {
  res.json({ message: 'Bienvenido al área administrativa' });
});

// Ruta solo accesible por usuarios regulares (rol = 1)
router.get('/usuario', authMiddleware.verifyToken, authMiddleware.isUser, (req, res) => {
  res.json({ message: 'Bienvenido al área de usuario' });
});

module.exports = router;
