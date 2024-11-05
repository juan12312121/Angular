const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PagosModel = require('../models/modeloPago');

const PagosController = {};

// Crear una sesión de Checkout
PagosController.crearSesionCheckout = async (req, res) => {
    const { id_renta } = req.body;

    PagosModel.obtenerRentaYUsuario(id_renta, async (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la renta.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Renta no encontrada.' });
        }

        const { precio_total, nombre_completo } = results[0];

        // Crear la sesión de checkout
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'MXN', 
                            product_data: {
                                name: `Renta para ${nombre_completo}`,
                            },
                            unit_amount: precio_total * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'http://localhost:3500/success', // Cambia esto según tu frontend
                cancel_url: 'http://localhost:3500/cancel', // Cambia esto según tu frontend
                metadata: {
                    id_renta: id_renta, // Guardar el id_renta en la metadata
                },
            });

            res.json({ url: session.url });
        } catch (err) {
            console.error('Error al crear la sesión de checkout:', err);
            res.status(500).json({ error: 'Error al crear la sesión de checkout.' });
        }
    });
};

// Procesar el resultado del pago vía webhook
PagosController.stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Error del Webhook:', err.message);
        return res.status(400).send(`Error del Webhook: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Registrar el pago en la base de datos
        const { id_renta } = session.metadata;
        const monto = session.amount_total / 100; 
        const metodo_pago = session.payment_method_types[0];

        // Guardar el pago en la base de datos
        PagosModel.registrarPago(id_renta, monto, metodo_pago, (error) => {
            if (error) {
                console.error('Error al registrar el pago:', error);
                return res.status(500).send('Error al registrar el pago');
            }
        });
    }

    res.status(200).send('Webhook recibido');
};

// Obtener pagos de un usuario
PagosController.obtenerPagosUsuario = (req, res) => {
    const { id_usuario } = req.params;

    PagosModel.obtenerPagosUsuario(id_usuario, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los pagos.' });
        }
        res.json(results);
    });
};

// Obtener todos los pagos (para admin)
PagosController.obtenerTodosPagos = (req, res) => {
    PagosModel.obtenerTodosPagos((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los pagos.' });
        }
        res.json(results);
    });
};

module.exports = PagosController;
