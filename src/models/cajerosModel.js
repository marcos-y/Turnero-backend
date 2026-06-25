const db = require('../config/db');

const getAll = async (activo) => {

    let query = `
        SELECT * FROM cajeros 
        WHERE 1=1
    `;
    let params = [];

    if (activo !== undefined) {
        query += ` AND activo = ?`;
        params.push(activo);
    }

    const [rows] = await db.query(query, params);
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        `SELECT id, nombre, usuario, activo, creado_en 
         FROM cajeros 
         WHERE id = ?`,
        [id]
    );

    return rows[0];
};

const getByUsuario = async (usuario) => {
    const [rows] = await db.query(
        `SELECT * FROM cajeros WHERE usuario = ? AND activo = 1`,
        [usuario]
    );

    return rows[0];
};

const getDynamicData = async (id) => {

    const [columns] = await db.query(
        `SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'turnero'
        AND table_name = 'cajeros'
        AND column_name LIKE '%tipo_turno%';`);

    if (columns.length === 0) {
        return [];
    }
    const columnNames = columns.map(c => c.column_name);

    // 2. Armar SELECT dinámico
    const cols = columnNames
        .map(col => `\`${col}\``)
        .join(", ");

    const [rows] = await db.query(
        `SELECT ${cols}
         FROM cajeros WHERE id = ${id}`
    );

    return rows;
};


const create = async ({ nombre, usuario, password }) => {
    const [result] = await db.query(
        `INSERT INTO cajeros (nombre, usuario, password, activo) VALUES (?, ?, ?, 0)`,
        [nombre, usuario, password]
    );

    return {
        id: result.insertId,
        nombre,
        usuario,
        activo: 1
    };
};

const update = async (id, { nombre, usuario, activo }) => {
    const [result] = await db.query(
        `UPDATE cajeros 
         SET nombre = ?, usuario = ?, activo = ?
         WHERE id = ?`,
        [nombre, usuario, activo, id]
    );

    return result.affectedRows > 0;
};

const updateEstado = async (id, activo) => {
    const [result] = await db.query(
        `UPDATE cajeros SET activo = ? WHERE id = ?`,
        [activo, id]
    );

    return result.affectedRows > 0;
};

const updateTipo = async (tipo, id) => {

    const [result] = await db.query(
        `UPDATE cajeros SET id_tipo_usuario = ? WHERE id = ?`,
        [tipo, id]
    );

    return result.affectedRows > 0;
};

const updatePassword = async (id, password) => {
    const [result] = await db.query(
        `UPDATE cajeros SET password = ? WHERE id = ?`,
        [password, id]
    );

    return result.affectedRows > 0;
};

const assignType = async (tipoId, id) => {

    const [result] = await db.query(
        `UPDATE cajeros SET tipo_turno_${tipoId} = ? WHERE id = ?`,
        [tipoId, id]
    );

    return result.affectedRows > 0;
};

const removeType = async (tipoId, id) => {


    const [result] = await db.query(
        `UPDATE cajeros SET tipo_turno_${tipoId} = null WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};

const remove = async (id) => {
    const [result] = await db.query(
        `UPDATE cajeros SET activo = 0 WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};

const delet = async (id) => {

    const [result] = await db.query(`
        DELETE FROM cajeros
        WHERE id = ?
    `, [id]);

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    updatePassword,
    remove,
    delet,
    getByUsuario,
    getDynamicData,
    updateEstado,
    assignType,
    removeType,
    updateTipo
};