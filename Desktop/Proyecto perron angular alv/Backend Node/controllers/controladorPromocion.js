const PromotionModel = require('../models/modeloPromocion');

// Crear una nueva promoción
exports.createPromotion = (req, res) => {
    const { codigo_promocion, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;

    // Calcular estado basado en las fechas
    const today = new Date();
    const estado = (new Date(fecha_inicio) <= today && new Date(fecha_fin) >= today) ? 'activo' : 'expirado';

    PromotionModel.createPromotion(codigo_promocion, descripcion, descuento, fecha_inicio, fecha_fin, estado, (error, results) => {
        if (error) {
            console.error('Error al crear promoción:', error);
            return res.status(500).json({ message: 'Error al crear promoción', error: error.message });
        }
        res.status(201).json({
            id_promocion: results.insertId, 
            codigo_promocion, 
            descripcion, 
            descuento, 
            fecha_inicio, 
            fecha_fin, 
            estado
        });
    });
};

// Obtener todas las promociones
exports.getAllPromotions = (req, res) => {
    PromotionModel.getAllPromotions((error, results) => {
        if (error) {
            console.error('Error al obtener promociones:', error);
            return res.status(500).json({ message: 'Error al obtener promociones', error: error.message });
        }
        res.status(200).json(results);
    });
};

// Obtener una promoción por ID
exports.getPromotionById = (req, res) => {
    const { id } = req.params;
    PromotionModel.getPromotionById(id, (error, results) => {
        if (error) {
            console.error('Error al obtener promoción:', error);
            return res.status(500).json({ message: 'Error al obtener promoción', error: error.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Promoción no encontrada' });
        }
        res.status(200).json(results[0]);
    });
};

// Actualizar una promoción
exports.updatePromotion = (req, res) => {
    const { id } = req.params;
    const { codigo_promocion, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;

    // Calcular estado basado en las fechas
    const today = new Date();
    const estado = (new Date(fecha_inicio) <= today && new Date(fecha_fin) >= today) ? 'activo' : 'expirado';

    PromotionModel.updatePromotion(id, codigo_promocion, descripcion, descuento, fecha_inicio, fecha_fin, estado, (error, results) => {
        if (error) {
            console.error('Error al actualizar promoción:', error);
            return res.status(500).json({ message: 'Error al actualizar promoción', error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Promoción no encontrada' });
        }
        res.status(200).json({ message: 'Promoción actualizada exitosamente' });
    });
};

// Eliminar una promoción
exports.deletePromotion = (req, res) => {
    const { id } = req.params;
    PromotionModel.deletePromotion(id, (error, results) => {
        if (error) {
            console.error('Error al eliminar promoción:', error);
            return res.status(500).json({ message: 'Error al eliminar promoción', error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Promoción no encontrada' });
        }
        res.status(204).send(); // 204 No Content
    });
};
