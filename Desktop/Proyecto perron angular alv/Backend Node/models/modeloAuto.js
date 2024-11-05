const db = require('../config/database');

// Modelo para manejar operaciones con carros
const CarModel = {
  getAllCars: (callback) => {
    const query = 'SELECT * FROM carros';
    db.query(query, callback);
  },

  getUserCars: (callback) => {
    const query = `
      SELECT id, marca, modelo, anio, categoria, color, tipo_combustible, precio_diaro, disponibilidad, kilometraje, descripcion, imagen 
      FROM carros
    `;
    db.query(query, callback);
  },
  
  createCar: (carData) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO carros (marca, modelo, categoria, anio, color, tipo_combustible, precio_diaro, disponibilidad, kilometraje, descripcion, imagen, puertas, pasajeros) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(query, [
        carData.marca,
        carData.modelo,
        carData.categoria,
        carData.anio,
        carData.color,
        carData.tipo_combustible,
        carData.precio_diaro,
        carData.disponibilidad,
        carData.kilometraje,
        carData.descripcion,
        carData.imagen,
        carData.puertas,
        carData.pasajeros
      ], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  updateCar: (id, carData, callback) => {
    const query = `
      UPDATE carros 
      SET marca = ?, modelo = ?, categoria = ?, anio = ?, color = ?, tipo_combustible = ?, precio_diaro = ?, disponibilidad = ?, kilometraje = ?, descripcion = ?, imagen = ?, puertas = ?, pasajeros = ? 
      WHERE id = ?
    `;
    db.query(query, [
      carData.marca, 
      carData.modelo, 
      carData.categoria, 
      carData.anio, 
      carData.color, 
      carData.tipo_combustible, 
      carData.precio_diaro, 
      carData.disponibilidad, 
      carData.kilometraje, 
      carData.descripcion, 
      carData.imagen,
      carData.puertas,
      carData.pasajeros,
      id
    ], callback);
  },

  deleteCar: (id, callback) => {
    const query = 'DELETE FROM carros WHERE id = ?';
    db.query(query, [id], callback);
  },

  getCarById: (id, callback) => {
    const query = 'SELECT * FROM carros WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = CarModel;
