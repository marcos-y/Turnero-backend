const TipoUsuario = require('../models/tiposUsuariosModel');

exports.getTipos = async (req, res) => {

    try {

        const tipos = await TipoUsuario.getTipos();
        res.json(tipos);

    } catch (error) {

        res.status(500).json({
            error: 'Error al obtener tipos de usuarios',
            details: error.message
        });
    }
};

exports.getTiposActivos = async (req, res) => {

    try {

        const tipos = await TipoUsuario.getActivos();
        res.json(tipos);

    } catch (error) {

        res.status(500).json({
            error: 'Error al obtener tipos activos',
            details: error.message
        });
    }
};

exports.getTipoById = async (req, res) => {

    try {

        const { id } = req.params;
        const tipo = await TipoUsuario.getById(id);

        if (!tipo) {

            return res.status(404).json({
                error: 'Tipo de usuario no encontrado'
            });
        }

        res.json(tipo);

    } catch (error) {

        res.status(500).json({
            error: 'Error al obtener tipo de usuario',
            details: error.message
        });
    }
};

exports.createTipo = async (req, res) => {

    try {

        const data = req.body;
        const result = await TipoUsuario.createTipo(data);

        res.status(201).json({
            message: 'Tipo de usuario creado correctamente',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: 'Error al crear tipo de usuario',
            details: error.message
        });
    }
};

exports.updateTipo = async (req, res) => {

    try {

        const { id } = req.params;
        const data = req.body;

        await TipoUsuario.updateTipo(id, data);

        res.json({
            message: 'Tipo de usuario actualizado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            error: 'Error al actualizar tipo de usuario',
            details: error.message
        });
    }
};

exports.updateState = async (req, res) => {

    try {

        const { id } = req.params;
        const { estado } = req.body;

        await TipoUsuario.updateState(id, estado);

        res.json({
            message: 'Estado actualizado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            error: 'Error al actualizar estado',
            details: error.message
        });
    }
};


exports.updateType = async (req, res) => {

    try {

        const { id } = req.params;
        const { tipo } = req.body;

        await TipoUsuario.updateType(id,tipo);

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

exports.deleteTipo = async (req, res) => {

    try {

        const { id } = req.params;

        await TipoUsuario.deleteTipo(id);

        res.json({
            message: 'Tipo de usuario eliminado correctamente'
        });

    } catch (error) {

        res.status(500).json({
            error: 'Error al eliminar tipo de usuario',
            details: error.message
        });
    }
};