const Cajero = require('../models/cajerosModel');

exports.getCajeros = async (req, res) => {
    try {
        const { activo } = req.query;
        const cajeros = await Cajero.getAll(activo);
        res.json(cajeros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cajeros', error });
    }
};

exports.getCajeroById = async (req, res) => {
    try {
        const cajero = await Cajero.getById(req.params.id);

        if (!cajero) {
            return res.status(404).json({ error: 'Cajero no encontrado' });
        }

        res.json(cajero);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cajero' });
    }
};

exports.createCajero = async (req, res) => {
    try {
        const nuevo = await Cajero.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear cajero' });
    }
};

exports.getDynamicDataCajero = async (req, res) => {
    try {
        const nuevo = await Cajero.getDynamicData(req.params.id);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cajero' });
    }
};

exports.updateCajero = async (req, res) => {
    try {
        const updated = await Cajero.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ error: 'Cajero no encontrado' });
        }

        res.json({ message: 'Cajero actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cajero' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body;

        const updated = await Cajero.updatePassword(req.params.id, password);

        if (!updated) {
            return res.status(404).json({ error: 'Cajero no encontrado' });
        }

        res.json({ message: 'Password actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar password' });
    }
};

/*DESACTIVA EL CAJERO, no lo elimina PERMANENTE*/
exports.deleteCajero = async (req, res) => {
    try {
        const deleted = await Cajero.remove(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Cajero no encontrado' });
        }

        res.json({ message: 'Cajero desactivado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cajero' });
    }
};

exports.destroyCajero = async (req, res) => {
    try {
        const deleted = await Cajero.delet(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Cajero no encontrado' });
        }

        res.json({ message: 'Cajero desactivado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cajero' });
    }
};


/*ACTIVA / DESACTIVA EL CAJERO, no lo elimina PERMANENTE*/
exports.updateEstado = async (req, res) => {
    try {
        const { activo } = req.body;

        const ok = await Cajero.updateEstado(req.params.id, activo);

        if (!ok) {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.json({ message: "Estado actualizado" });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar estado" });
    }
};

exports.updateType = async (req, res) => {

    try {
        const { tipo } = req.body;
        const { id } = req.params;

        await Cajero.updateTipo(tipo,id);

        res.json({
            message: 'Tipo actualizado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            error: 'Error al actualizar tipo',
            details: error.message
        });
    }
};


exports.assignType = async (req, res) => {
    try {
        const { tipoId } = req.body;

        let id = req.params.id;

        const ok = await Cajero.assignType(tipoId, id);

        console.log(ok)

        if (!ok) {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.json({ message: "Estado actualizado" });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar estado", error });
    }
};

exports.removeType = async (req, res) => {
    try {
        const { tipoId } = req.body;

        let id = req.params.id;

        const ok = await Cajero.removeType(tipoId, id);

        console.log(ok)

        if (!ok) {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.json({ message: "Tipo actualizado" });

    } catch (error) {
        res.status(500).json({ error: "Error al remover tipo", error });
    }
};