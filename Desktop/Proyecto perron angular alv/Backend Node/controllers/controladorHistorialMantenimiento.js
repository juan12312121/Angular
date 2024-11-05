const HistorialMantenimiento = require('../models/modeloHistorialMantenimiento');

// Crear un nuevo mantenimiento
exports.createMantenimiento = (req, res) => {
    const { id_carro, fecha_mantenimiento, descripcion, costo } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!id_carro || !fecha_mantenimiento || !descripcion || !costo) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    HistorialMantenimiento.create(req.body, (error, results) => {
        if (error) {
            console.error("Error al crear mantenimiento:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(201).json({ id_mantenimiento: results.insertId, ...req.body });
    });
};

// Obtener todos los mantenimientos
exports.getAllMantenimientos = (req, res) => {
    HistorialMantenimiento.getAll((error, results) => {
        if (error) {
            console.error("Error al obtener mantenimientos:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        res.status(200).json(results);
    });
};

// Obtener mantenimiento por ID
exports.getMantenimientoById = (req, res) => {
    const mantenimientoId = req.params.id;

    HistorialMantenimiento.getById(mantenimientoId, (error, results) => {
        if (error) {
            console.error("Error al obtener mantenimiento:", error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }
        res.status(200).json(results[0]);
    });
};

// Actualizar un mantenimiento
exports.updateMantenimiento = (req, res) => {
    const mantenimientoId = req.params.id;

    HistorialMantenimiento.update(mantenimientoId, req.body, (error, results) => {
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
exports.deleteMantenimiento = (req, res) => {
    const mantenimientoId = req.params.id;

    HistorialMantenimiento.delete(mantenimientoId, (error, results) => {
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
