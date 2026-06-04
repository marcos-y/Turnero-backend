const Facturas = require('../models/facturasModel');

exports.getFacturas = async (req, res) => {
    try {
        const factura = await Facturas.getAll();
        res.json(factura);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener facturas' });
    }
};

exports.getFacturaById = async (req, res) => {
    try {
        const factura = await Facturas.getById(req.params.id);

        if (!factura) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }

        res.json(factura);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cajero' });
    }
};

exports.createFactura = async (req, res) => {
    try {
        console.log(req.body)
        const nuevo = await Facturas.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear factura', error });
    }
};
