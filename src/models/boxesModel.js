const db = require('../config/db');

const getAll = async (activo) => {

    let query = `SELECT * FROM boxes WHERE 1=1`;

    let params = [];

    if (activo !== undefined) {
        query += ` AND activo = ?`;
        params.push(activo);
    };

    const [rows] = await db.query(query, params);
    return rows;
};

const getAllBoxCajero = async () => {

    let query = `SELECT 
                box.id AS box_id,
                box.numero,
                box.descripcion,
                box.activo,
                box.cajero_actual,
                caj.*
                FROM 
                boxes box
                LEFT JOIN cajeros caj ON caj.id = box.cajero_actual
                WHERE box.activo = 1;`;

    const [result] = await db.query(query);

    return result;
};

const getById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM boxes WHERE id = ?`,
        [id]
    );

    return rows[0];
};

const create = async ({ numero, descripcion }) => {
    const [result] = await db.query(
        `INSERT INTO boxes (numero, descripcion, activo) VALUES (?, ?, 0)`,
        [numero, descripcion]
    );

    return {
        id: result.insertId,
        numero,
        descripcion,
        activo: 1
    };
};

const update = async (id, { numero, descripcion, activo }) => {
    const [result] = await db.query(
        `UPDATE boxes 
         SET numero = ?, descripcion = ?, activo = ?
         WHERE id = ?`,
        [numero, descripcion, activo, id]
    );

    return result.affectedRows > 0;
};


const remove = async (id) => {

    const [result] = await db.query(`
        DELETE FROM boxes
        WHERE id = ?
    `, [id]);

    return result;
};


const updateEstado = async (id, activo, cajero_actual) => {

    const [result] = await db.query(
        `UPDATE boxes SET activo = ? ,cajero_actual = ? WHERE id = ?`,
        [activo, cajero_actual, id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    getAll,
    getAllBoxCajero,
    getById,
    create,
    update,
    remove,
    updateEstado
};