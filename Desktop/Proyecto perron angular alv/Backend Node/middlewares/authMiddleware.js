const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware para verificar si el usuario está autenticado
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });

    // Guardar información del usuario en el request
    req.user = decoded;
    next();
  });
};

// Middleware para verificar si el usuario es administrador
exports.isAdmin = (req, res, next) => {
  if (req.user.rol !== 10) {
    return res.status(403).json({ message: 'No tienes permisos de administrador' });
  }
  next();
};

// Middleware para verificar si el usuario es regular (nivel 1)
exports.isUser = (req, res, next) => {
  if (req.user.rol !== 1) {
    return res.status(403).json({ message: 'Acceso denegado para este rol' });
  }
  next();
};
