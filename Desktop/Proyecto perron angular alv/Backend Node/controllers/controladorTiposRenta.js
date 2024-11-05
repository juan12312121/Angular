const RentalTypesModel = require('../models/modeloTiposRenta');

// Obtener todos los tipos de renta
exports.getAllRentalTypes = (req, res) => {
    RentalTypesModel.getAll((err, tiposRenta) => {
        if (err) {
            console.error('Error al obtener los tipos de renta:', err);
            return res.status(500).json({ message: 'Error al obtener los tipos de renta' });
        }
        return res.status(200).json({ data: tiposRenta });
    });
};

// Obtener un tipo de renta por ID
exports.getRentalTypeById = (req, res) => {
    const { id } = req.params;
    RentalTypesModel.getById(id, (err, tipoRenta) => {
        if (err) {
            console.error('Error al obtener el tipo de renta:', err);
            return res.status(500).json({ message: 'Error al obtener el tipo de renta' });
        }
        if (!tipoRenta.length) {
            return res.status(404).json({ message: 'Tipo de renta no encontrado' });
        }
        return res.status(200).json({ data: tipoRenta[0] });
    });
};

// Insertar un nuevo tipo de renta
exports.createRentalType = (req, res) => {
    const { nombre_tipo, descripcion, precio_base } = req.body;
    RentalTypesModel.insert(nombre_tipo, descripcion, precio_base, (err, result) => {
        if (err) {
            console.error('Error al insertar el tipo de renta:', err);
            return res.status(500).json({ message: 'Error al insertar el tipo de renta' });
        }
        return res.status(201).json({ message: 'Tipo de renta creado exitosamente', id: result.insertId });
    });
};

// Actualizar un tipo de renta
exports.updateRentalType = (req, res) => {
    const { id } = req.params;
    const { nombre_tipo, descripcion, precio_base } = req.body;
    RentalTypesModel.update(id, nombre_tipo, descripcion, precio_base, (err) => {
        if (err) {
            console.error('Error al actualizar el tipo de renta:', err);
            return res.status(500).json({ message: 'Error al actualizar el tipo de renta' });
        }
        return res.status(200).json({ message: 'Tipo de renta actualizado exitosamente' });
    });
};

// Eliminar un tipo de renta
exports.deleteRentalType = (req, res) => {
    const { id } = req.params;
    RentalTypesModel.delete(id, (err) => {
        if (err) {
            console.error('Error al eliminar el tipo de renta:', err);
            return res.status(500).json({ message: 'Error al eliminar el tipo de renta' });
        }
        return res.status(200).json({ message: 'Tipo de renta eliminado exitosamente' });
    });
};
