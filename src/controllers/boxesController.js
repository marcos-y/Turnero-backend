const Box = require('../models/boxesModel');

exports.getBoxes = async (req, res) => {
    try {
        const { activo } = req.query;
        const boxes = await Box.getAll(activo);
        res.json(boxes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener boxes' });
    }
};

exports.getBoxesCajero = async (req, res) => {
    try {
        const boxes = await Box.getAllBoxCajero();
        res.json(boxes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener boxes' });
    }
};

exports.getBoxById = async (req, res) => {
    try {
        const box = await Box.getById(req.params.id);

        if (!box) {
            return res.status(404).json({ error: 'Box no encontrado' });
        }

        res.json(box);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener box' });
    }
};

exports.createBox = async (req, res) => {
    try {
        const newBox = await Box.create(req.body);
        res.status(201).json(newBox);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear box' });
    }
};

exports.updateBox = async (req, res) => {
    try {
        const updated = await Box.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ error: 'Box no encontrado' });
        }

        res.json({ message: 'Box actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar box' });
    }
};

exports.deleteBox = async (req, res) => {
    try {
        const deleted = await Box.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Box no encontrado' });
        }

        res.json({ message: 'Box desactivado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar box' });
    }
};

/*activa, descativa el ESTADO*/
exports.updateEstado = async (req, res) => {
    try {

        const { activo, cajero_actual } = req.body;

        const ok = await Box.updateEstado(req.params.id, activo, cajero_actual);

        if (!ok) {
            return res.status(404).json({ error: "Box no encontrado" });
        }

        res.json({ message: "Estado actualizado" });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar estado", err });
    }
};