// controllers/maintenanceController.js
const Maintenance = require('../models/modeloMantenimiento');

// Crear un nuevo mantenimiento
exports.createMaintenance = (req, res) => {
    Maintenance.create(req.body, (error, results) => {
        if (error) {
            console.error("Error al crear mantenimiento:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(201).json({ id_mantenimiento: results.insertId, ...req.body });
    });
};

// Obtener todos los mantenimientos
exports.getAllMaintenances = (req, res) => {
    Maintenance.getAll((error, results) => {
        if (error) {
            console.error("Error al obtener mantenimientos:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
};

// Obtener mantenimiento por ID
exports.getMaintenanceById = (req, res) => {
    const { id } = req.params;
    Maintenance.getById(id, (error, result) => {
        if (error) {
            console.error("Error al obtener mantenimiento:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (!result) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }
        res.status(200).json(result);
    });
};

// Actualizar un mantenimiento
exports.updateMaintenance = (req, res) => {
    const { id } = req.params;
    Maintenance.update(id, req.body, (error, results) => {
        if (error) {
            console.error("Error al actualizar mantenimiento:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }
        res.status(200).json({ message: 'Mantenimiento actualizado con éxito' });
    });
};

// Eliminar un mantenimiento
exports.deleteMaintenance = (req, res) => {
    const { id } = req.params;
    Maintenance.delete(id, (error, results) => {
        if (error) {
            console.error("Error al eliminar mantenimiento:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }
        res.status(200).json({ message: 'Mantenimiento eliminado con éxito' });
    });
};
