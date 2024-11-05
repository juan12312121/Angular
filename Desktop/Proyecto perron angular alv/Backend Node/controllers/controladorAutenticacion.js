const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/modeloUsuario');
const dotenv = require('dotenv');

dotenv.config();

// Registro de usuario
exports.register = (req, res) => {
  const { nombreCompleto, username, correo, password, rol } = req.body;

  const userRole = rol ? rol : 1;

  if (!nombreCompleto || !username || !correo || !password) {
    console.log('Registro fallido: Todos los campos son requeridos');
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log('Error al encriptar la contraseña:', err);
      return res.status(500).json({ message: 'Error al encriptar la contraseña' });
    }

    userModel.createUser(nombreCompleto, username, correo, hashedPassword, userRole, (err, result) => {
      if (err) {
        console.log('Error al registrar el usuario:', err);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }

      const token = jwt.sign({ username, rol: userRole }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      console.log('Usuario registrado con éxito:', username);
      res.status(201).json({ message: 'Usuario registrado con éxito', token });
    });
  });
};

// Login de usuario
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Login fallido: Nombre de usuario y contraseña son requeridos');
    return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
  }

  userModel.findUserByUsername(username, (err, results) => {
    if (err) {
      console.log('Error en la base de datos al buscar el usuario:', err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }
    if (results.length === 0) {
      console.log('Usuario no encontrado:', username);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    bcrypt.compare(password, user.contrasena, (err, isMatch) => {
      if (err) {
        console.log('Error al verificar la contraseña:', err);
        return res.status(500).json({ message: 'Error al verificar la contraseña' });
      }
      if (!isMatch) {
        console.log('Contraseña incorrecta para el usuario:', username);
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      const refreshToken = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

      console.log('Login exitoso:', username);
      res.json({ message: 'Login exitoso', token, refreshToken });
    });
  });
};

// Refresh Token
exports.refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    console.log('Refresh token no proporcionado');
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      console.log('Refresh token inválido:', err);
      return res.sendStatus(403);
    }

    const newToken = jwt.sign({ id: decoded.id, rol: decoded.rol }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    console.log('Nuevo token generado para el ID:', decoded.id);
    res.json({ token: newToken });
  });
};
