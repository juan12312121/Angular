const db = require('../config/database');

// Modelo para manejar operaciones con usuarios
const UserModel = {
  // Crear un nuevo usuario
  createUser: (nombreCompleto, nombreUsuario, correo, hashedPassword, rol, callback) => {
    const query = 'INSERT INTO usuarios (nombre_completo, nombre_usuario, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombreCompleto, nombreUsuario, correo, hashedPassword, rol], callback);
  },

  // Encontrar un usuario por su nombre de usuario
  findUserByUsername: (nombreUsuario, callback) => {
    const query = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';
    db.query(query, [nombreUsuario], callback);
  },

  // Encontrar un usuario por su refresh token (si decides implementarlo)
  findUserByRefreshToken: (refreshToken, callback) => {
    const query = 'SELECT * FROM usuarios WHERE refresh_token = ?'; // Si decides almacenar refresh_token en el futuro
    db.query(query, [refreshToken], callback);
  }
};

module.exports = UserModel;
