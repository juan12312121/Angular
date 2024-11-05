// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Asegúrate de importar path

// Importar rutas
const rutasAutenticacion = require('./routes/rutasAutenticacion');
const rutasAuto = require('./routes/rutasAuto');
const rutasIncidente = require('./routes/rutasIncidente');
const rutasFactura = require('./routes/rutasFactura');
const rutasSeguro = require('./routes/rutasSeguro');
const rutasHistorialIncidentes = require('./routes/rutasHistorialIncidentes');
const rutasHistorialMantenimiento = require('./routes/rutasHistorialMantenimiento');
const rutasMantenimiento = require('./routes/rutasMantenimiento');
const rutasPromocion = require('./routes/rutasPromocion');
const rutasCriteriosRenta = require('./routes/rutasCriteriosRenta');
const rutasDetalleRenta = require('./routes/rutasDetalleRenta');
const rutasDevoluciones = require('./routes/rutasDevoluciones');
const rutasReporte = require('./routes/rutasReporte');
const rutasTipoMantenimiento = require('./routes/rutasTipoMantenimiento');
const rutasHistorialUsuario = require('./routes/rutasHistorialUsuario');
const rutasCalificacion = require('./routes/rutasCalificacion');
const rutasTiposRenta = require('./routes/rutasTiposRenta');
const rutasHistorialPromocion = require('./routes/rutasHistorialPromocion');
const rutasReservacion = require('./routes/rutasReservacion');
const rutasPago = require('./routes/rutasPago');
const rutasUpload = require('./routes/rutasUpload');

const { verifyToken } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

// Servir archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Aquí usamos path

// Rutas
app.use('/carros', rutasAuto);
app.use('/criterio-renta', rutasCriteriosRenta);
app.use('/devoluciones', rutasDevoluciones);
app.use('/facturas', rutasFactura);
app.use('/historial-mantenimiento', rutasHistorialMantenimiento);
app.use('/historial-usuarios', rutasHistorialUsuario);
app.use('/historial-incidencias', rutasHistorialIncidentes);
app.use('/incidencias', rutasIncidente);
app.use('/promociones', rutasPromocion);
app.use('/reportes', rutasReporte);
app.use('/seguros', rutasSeguro);
app.use('/tipo-mantenimiento', rutasTipoMantenimiento);
app.use('/usuario', rutasAutenticacion);
app.use('/valoracion', rutasCalificacion);
app.use('/mantenimiento', rutasMantenimiento);
app.use('/detalle-renta', rutasDetalleRenta);
app.use('/tipo-renta', rutasTiposRenta);
app.use('/historial-promociones', rutasHistorialPromocion);
app.use('/reservas', rutasReservacion);
app.use('/pagos', rutasPago);
app.use('/upload', rutasUpload);

// Ruta protegida para verificar el token
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso concedido', userId: req.user.id });
});

// Inicializar el servidor
const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
