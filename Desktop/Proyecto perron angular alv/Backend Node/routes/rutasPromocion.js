const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/controladorPromocion');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas de promociones
router.post('/', verifyToken, isAdmin, promotionController.createPromotion);
router.get('/', verifyToken, isAdmin, promotionController.getAllPromotions);
router.get('/:id', verifyToken, isAdmin, promotionController.getPromotionById);
router.put('/:id', verifyToken, isAdmin, promotionController.updatePromotion);
router.delete('/:id', verifyToken, isAdmin, promotionController.deletePromotion);

module.exports = router;
