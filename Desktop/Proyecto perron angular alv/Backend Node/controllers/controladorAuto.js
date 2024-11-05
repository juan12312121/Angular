const carModel = require('../models/modeloAuto');

// Función para obtener todos los carros (para administradores)
exports.getAllCars = (req, res) => {
  carModel.getAllCars((err, results) => {
    if (err) {
      console.error('Error al obtener los carros:', err);
      return res.status(500).json({ message: 'Error al obtener los carros', error: err.message });
    }

    //console.log('Carros obtenidos:', results);
    res.json(results);
  });
};

// Función para obtener un carro específico por ID
exports.getCarById = (req, res) => {
  const id = parseInt(req.params.id);
  carModel.getCarById(id, (err, carro) => {
    if (err) {
      console.error('Error al obtener el carro:', err);
      return res.status(500).json({ message: 'Error al obtener el carro', error: err.message });
    }
    
    if (!carro) {
      console.log(`No se encontró un carro con ID: ${id}`);
      return res.status(404).json({ message: 'Carro no encontrado' });
    }
    
    console.log(`Datos del carro obtenido para ID ${id}:`, carro);
    res.json(carro);
  });
};

// Función para obtener carros visibles para usuarios
exports.getUserCars = (req, res) => {
  carModel.getUserCars((err, results) => {
    if (err) {
      console.error('Error al obtener los carros visibles:', err);
      return res.status(500).json({ message: 'Error al obtener los carros visibles', error: err.message });
    }
    console.log('Carros visibles obtenidos:', results);
    res.json(results);
  });
};
// Función para crear un nuevo carro (solo administradores)
exports.createCar = (req, res) => {
  if (!req.user || req.user.rol !== 10) {
    return res.status(403).json({ message: 'No tienes permisos para crear un carro' });
  }

  const imagenUrl = req.file ? req.file.path : null;
  const nuevoCarro = {
    marca: req.body.marca,
    modelo: req.body.modelo,
    anio: req.body.anio,
    color: req.body.color,
    tipo_combustible: req.body.tipo_combustible,
    precio_diaro: req.body.precio_diaro,
    disponibilidad: req.body.disponibilidad,
    categoria: req.body.categoria,
    imagen: imagenUrl,
    descripcion: req.body.descripcion,
    kilometraje: req.body.kilometraje,
    puertas: req.body.puertas,
    pasajeros: req.body.pasajeros
  };

  if (!nuevoCarro.puertas || !nuevoCarro.pasajeros) {
    return res.status(400).json({ message: 'Los campos puertas y pasajeros son requeridos' });
  }

  carModel.createCar(nuevoCarro)
    .then((results) => res.status(201).json({ message: 'Carro creado exitosamente', carro: results }))
    .catch((err) => res.status(500).json({ message: 'Error al crear el carro', error: err.message }));
};

// Función para actualizar un carro (solo administradores)
exports.updateCar = (req, res) => {
  if (!req.user || req.user.rol !== 10) {
    return res.status(403).json({ message: 'No tienes permisos para actualizar un carro' });
  }

  const { id } = req.params;
  const { marca, modelo, categoria, anio, color, tipo_combustible, precio_diaro, kilometraje, descripcion, disponibilidad, puertas, pasajeros } = req.body;
  const imagen = req.file ? req.file.path : null;

  if (!marca || !modelo || !categoria || !anio || !color || !tipo_combustible || !precio_diaro || !kilometraje || !descripcion || disponibilidad === undefined || !puertas || !pasajeros) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  const carData = { 
    marca, modelo, categoria, anio, color, tipo_combustible, precio_diaro: parseFloat(precio_diaro), 
    kilometraje: parseInt(kilometraje, 10), descripcion, disponibilidad, imagen, puertas, pasajeros 
  };

  carModel.updateCar(id, carData, (err) => {
    if (err) {
      console.error('Error al actualizar el carro:', err);
      return res.status(500).json({ message: 'Error al actualizar el carro', error: err.message });
    }
    res.json({ message: 'Carro actualizado con éxito', carData });
  });  
};

// Función para eliminar un carro (solo administradores)
exports.deleteCar = (req, res) => {
  if (!req.user || req.user.rol !== 10) {
    return res.status(403).json({ message: 'No tienes permisos para eliminar un carro' });
  }

  const { id } = req.params;

  carModel.deleteCar(id, (err) => {
    if (err) {
      console.error('Error al eliminar el carro:', err);
      return res.status(500).json({ message: 'Error al eliminar el carro', error: err.message });
    }
    res.json({ message: 'Carro eliminado con éxito' });
  });
};
