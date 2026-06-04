const db = require('../config/db');

const getTipos = async () => {

    const [rows] = await db.query(`
        SELECT *
        FROM tipos_usuarios
        ORDER BY id_tipo_usuario ASC
    `);

    return rows;
};

const getActivos = async () => {

    const [rows] = await db.query(`
        SELECT *
        FROM tipos_usuarios
        WHERE activo = TRUE
        ORDER BY nombre ASC
    `);

    return rows;
};

const getById = async (id) => {

    const [rows] = await db.query(`
        SELECT *
        FROM tipos_usuarios
        WHERE id_tipo_usuario = ?
    `, [id]);

    return rows[0];
};

const createTipo = async (data) => {

    const [result] = await db.query(`
        INSERT INTO tipos_usuarios
        (nombre, descripcion)
        VALUES (?, ?)
    `, [
        data.nombre,
        data.descripcion
    ]);

    return result;
};

const updateTipo = async (id, data) => {

    const [result] = await db.query(`
        UPDATE tipos_usuarios
        SET
            nombre = ?,
            descripcion = ?,
            activo = ?
        WHERE id_tipo_usuario = ?
    `, [
        data.nombre,
        data.descripcion,
        data.activo,
        id
    ]);

    return result;
};

const updateState = async (id, estado) => {

    const [result] = await db.query(`
        UPDATE tipos_usuarios
        SET activo = ?
        WHERE id_tipo_usuario = ?
    `, [
        estado,
        id
    ]);

    return result;
};

const deleteTipo = async (id) => {

    const [result] = await db.query(`
        DELETE FROM tipos_usuarios
        WHERE id_tipo_usuario = ?
    `, [id]);

    return result;
};

module.exports = {
    getTipos,
    getActivos,
    getById,
    createTipo,
    updateTipo,
    updateState,
    deleteTipo
};