const TipoTurno = require('../models/tipoTurnoModel');

exports.getTipos = async (req, res) => {
    try {
        const tipos = await TipoTurno.getAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tipos de turnos' });
    }
};

exports.getTiposActivos = async (req, res) => {
    try {
        const tipos = await TipoTurno.getAllActive();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tipos de turnos' });
    }
};

exports.getTipoById = async (req, res) => {
    try {
        const tipo = await TipoTurno.getById(req.params.id);

        if (!tipo) {
            return res.status(404).json({ error: 'Tipo de turno no encontrado' });
        }

        res.json(tipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tipo de turno' });
    }
};

exports.createTipo = async (req, res) => {
    try {
        const nuevo = await TipoTurno.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear tipo de turno', error });
    }
};

exports.updateTipo = async (req, res) => {
    try {
        const updated = await TipoTurno.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ error: 'Tipo de turno no encontrado' });
        }

        res.json({ message: 'Tipo de turno actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tipo de turno' });
    }
};

exports.updateState = async (req, res) => {
    
    try {
        const updated = await TipoTurno.updateState(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ error: 'Tipo de turno no encontrado' });
        }

        res.json({ message: 'Tipo de turno actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar tipo de turno' });
    }
};


exports.deleteTipo = async (req, res) => {
    try {
        const deleted = await TipoTurno.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Tipo de turno no encontrado'});
        }

        res.json({ message: 'Tipo de turno eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar tipo de turno', error });
    }
};