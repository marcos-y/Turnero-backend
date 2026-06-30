const db = require('../config/db');

const getAll = async () => {
    const [rows] = await db.query(
        `SELECT * FROM tipos_turno ORDER BY id ASC`
    );

    return rows;
};

const getAllActive = async () => {
    const [rows] = await db.query(
        `SELECT * FROM tipos_turno WHERE estado = 1 ORDER BY id ASC`
    );

    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM tipos_turno WHERE id = ?`,
        [id]
    );

    return rows[0];
};

const create = async ({ codigo, descripcion, color, prefijo }) => {

    const [result] = await db.query(
        `INSERT INTO tipos_turno (codigo, descripcion, color, prefijo) VALUES (?, ?, ?, ?)`,
        [codigo, descripcion, color, prefijo]
    );

    let lastId = await db.query(`SELECT LAST_INSERT_ID() FROM tipos_turno`);
    console.log(lastId[0][0]['LAST_INSERT_ID()']);

    const [result2] = await db.query(
       `ALTER TABLE cajeros ADD tipo_turno_${lastId[0][0]['LAST_INSERT_ID()']} VARCHAR(4);`,
    );

    return {
        id: result.insertId,
        codigo,
        descripcion,
        prefijo,
        color: color || '#0dcaf0'
    };
};

const update = async (id, { descripcion, color, prefijo }) => {
    const [result] = await db.query(
        `UPDATE tipos_turno 
         SET descripcion = ?, color = ?, prefijo = ?
         WHERE id = ?`,
        [descripcion, color, prefijo, id]
    );

    return result.affectedRows > 0;
};

const updateState = async (id, { estado }) => {

    const [result] = await db.query(
        `UPDATE tipos_turno 
         SET estado = ?
         WHERE id = ?`,
        [estado, id]
    );

    return result.affectedRows > 0;
};

const remove = async (id) => {

    /*1_ Elimino los turnos con ese tipo de TURNO*/
    //const [result] = await db.query(
    //    `DELETE FROM turnos WHERE tipo_id = ?`,
    //    [id]
    //);

    /*2_ Elimino el tipo de turno*/
    const [result] = await db.query(
        `DELETE FROM tipos_turno WHERE id = ?`,
        [id]
    );

    /*3_ Elimino el tipo de turno de todos los USUARIOS */
    const [result2] = await db.query(
        `ALTER TABLE cajeros DROP COLUMN tipo_turno_${id};`,
    );
    
    return result2.affectedRows > 0;
};


module.exports = {
    getAll,
    getAllActive,
    getById,
    create,
    update,
    updateState,
    remove
};