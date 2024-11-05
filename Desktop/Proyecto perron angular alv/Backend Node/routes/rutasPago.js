    const express = require('express');
    const PagosController = require('../controllers/controladorPago');
    const { verifyToken, isAdmin, isUser } = require('../middlewares/authMiddleware');

    const router = express.Router();

    // Crear sesión de Checkout (acceso para usuarios regulares)
    router.post('/checkout', verifyToken, isUser, PagosController.crearSesionCheckout);

    // Webhook de Stripe (acceso público, sin necesidad de autenticación)
    router.post('/webhook', express.raw({ type: 'application/json' }), PagosController.stripeWebhook);

    // Obtener pagos de un usuario (acceso para usuarios regulares)
    router.get('/usuario/:id_usuario', verifyToken, isUser, PagosController.obtenerPagosUsuario);

    // Obtener todos los pagos (acceso solo para administradores)
    router.get('/admin/pagos', verifyToken, isAdmin, PagosController.obtenerTodosPagos);

    module.exports = router;
