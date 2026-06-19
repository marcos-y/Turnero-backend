const db = require('../config/db');

const getAll = async () => {
    const [rows] = await db.query(`
        SELECT 
        t.id,
        t.codigo,
        t.tipo_id,
        t.box_id,
        t.cajero_id,
        t.estado,
        t.creado_en,
        t.llamado_en,
        t.finalizado_en,
        t.derivado,
        tipos_tur.descripcion,
        tipos_tur.color
        FROM turnos t
        LEFT JOIN tipos_turno tipos_tur ON t.tipo_id = tipos_tur.id
        WHERE t.estado = 'pendiente' or t.estado = 'en_atencion'
        LIMIT 7;
    `);

    return rows;
};

const getTurnVisor = async () => {

    const [rows] = await db.query(`
    SELECT *
    FROM (
    SELECT
        t.*,
        tt.descripcion,
        tt.color,
        ROW_NUMBER() OVER(PARTITION BY tipo_id ORDER BY id) AS rn
    FROM turnos t
    LEFT JOIN tipos_turno tt
        ON tt.id = t.tipo_id
     WHERE (t.estado = 'pendiente' or t.estado = 'en_atencion')
    ) x
    WHERE rn = 1
    ORDER BY id DESC
    LIMIT 5;`);

    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM turnos WHERE id = ?`,
        [id]
    );

    return rows[0];
};


const getByDia = async () => {

    const [rows] = await db.query(
        `SELECT 
        t.id,
        t.codigo,
        t.tipo_id,
        t.box_id,
        t.cajero_id,
        t.estado,
        t.duracion_minutos,
        t.duracion_espera,
        t.creado_en,
        t.llamado_en,
        t.finalizado_en,
        t.derivado,
        tipos_tur.descripcion,
        c.nombre AS cajero_nombre
        FROM turnos t
        LEFT JOIN tipos_turno tipos_tur ON t.tipo_id = tipos_tur.id
        LEFT JOIN cajeros c ON c.ID = t.cajero_id
        WHERE 
        t.estado IN ('pendiente', 'en_atencion', 'finalizado')
        AND (
            t.creado_en >= CURRENT_DATE()
            AND t.creado_en < CURRENT_DATE() + INTERVAL 1 DAY
        );`
    );

    return rows;
};

// cada cajero ve su TURNO/S ASIGNADOS por TIPO, y CAJERO ID 
const getByTipo = async (tipo_id, cajero_id) => {

    const ids = tipo_id.replaceAll('"', '').split(',').map(Number);

    const [rows] = await db.query(
        `SELECT 
        t.id,
        t.codigo,
        t.tipo_id,
        t.box_id,
        t.cajero_id,
        t.estado,
        t.creado_en,
        t.llamado_en,
        t.finalizado_en,
        t.derivado,
        tipos_tur.descripcion,
        tipos_tur.color
        FROM turnos t
        LEFT JOIN tipos_turno tipos_tur ON t.tipo_id = tipos_tur.id
        WHERE t.tipo_id IN (?) AND (t.cajero_id = ? OR t.cajero_id IS NULL) AND t.estado = 'pendiente'
        ORDER BY id ;`,
        [ids, cajero_id]
    );

    return rows;
};


const create = async ({ codigo, tipo_id }) => {

    const [result] = await db.query(
        `INSERT INTO turnos (codigo, tipo_id) VALUES (?, ?)`,
        [codigo, tipo_id]
    );

    return {
        id: result.insertId,
        codigo,
        tipo_id,
        estado: 'pendiente'
    };
};

/*ASIGNAR BOX si no tiene BOX ni CAJERO o SI ES DERIVADO (Con BOX y CAJERO)*/
const assignBox = async (id, { box_id, cajero_id }) => {

    let sql = `UPDATE turnos 
         SET box_id = ?, cajero_id = ?, estado = 'en_atencion', llamado_en = NOW()
         WHERE id = ?`;

    if (!box_id) {
        sql += 'AND (box_id IS NULL AND cajero_id IS NULL);';
    };

    const [result] = await db.query(sql, [box_id, cajero_id, id]);

    return result.affectedRows > 0;
};

/*CAMBIO EL BOX (ID TURNO) y PONE EN PENDIENTE - DERIVAR - cambiar TIPO DE TURNO*/
const changeBox = async (id, { tipo_id, cajero_id, box_id }) => {

    const [result] = await db.query(
        `UPDATE turnos 
         SET tipo_id = ?, cajero_id = ?, box_id = ?, estado = 'pendiente', derivado = 'si'
         WHERE id = ? AND estado = 'en_atencion'`,
        [tipo_id, cajero_id, box_id, id]
    );

    return result.affectedRows > 0;
};

/*pone el BOX en Rojo*/
const callTurn = async (id) => {
    const [result] = await db.query(
        `UPDATE turnos 
         SET estado = 'en_atencion', llamado_en = NOW()
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};

/*estado en Finalizado*/
const finishTurn = async (id) => {
    const [result] = await db.query(
        `UPDATE turnos 
         SET estado = 'finalizado', finalizado_en = NOW(), duracion_minutos = TIMESTAMPDIFF(MINUTE, creado_en, NOW()), duracion_espera = TIMESTAMPDIFF(MINUTE, creado_en, llamado_en)
         WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};

const remove = async (id) => {
    const [result] = await db.query(
        `DELETE FROM turnos WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};

const getLastTurnosId = async (prefijo) => {

    let tipo_id = prefijo;

    const [rows] = await db.query(
        `SELECT codigo, tipo_id, estado, creado_en, derivado
     FROM turnos
     WHERE tipo_id = ?
     ORDER BY creado_en DESC
     LIMIT 1`,
        [tipo_id]
    );

    return rows;
};

const getLastTurnosPrefijo = async (prefijo) => {

    const [rows] = await db.query(
        `SELECT codigo, tipo_id, estado, creado_en, derivado
     FROM turnos
     WHERE codigo LIKE ?
     ORDER BY creado_en DESC
     LIMIT 1`,
        [`%${prefijo}%`]
    );

    return rows;
};

const obtenerMetricasPorTurno = async (id) => {

    const [rows] = await db.query(`
        SELECT
            id,

            creado_en,
            llamado_en,
            finalizado_en,

            TIMESTAMPDIFF(
                SECOND,
                creado_en,
                llamado_en
            ) AS tiempo_espera,

            TIMESTAMPDIFF(
                SECOND,
                llamado_en,
                finalizado_en
            ) AS tiempo_atencion,

            TIMESTAMPDIFF(
                SECOND,
                creado_en,
                finalizado_en
            ) AS lead_time

        FROM turnos
        WHERE id = ?
    `, [id]);

    return rows[0];
};

const obtenerMetricasGlobales = async () => {

    /*
    Métricas
    1. Tiempo de espera
    Desde que se crea el turno hasta que lo llaman.
    llamado_en - creado_en
    SQL:
    TIMESTAMPDIFF(SECOND, creado_en, llamado_en)

    2. Tiempo de atención
    Desde que lo llaman hasta que termina.
    finalizado_en - llamado_en
    SQL:
    TIMESTAMPDIFF(SECOND, llamado_en, finalizado_en)

    3. Lead Time
    Tiempo total del proceso.
    finalizado_en - creado_en
    SQL:
    TIMESTAMPDIFF(SECOND, creado_en, finalizado_en)
    */


    const [rows] = await db.query(`
        SELECT

            COUNT(*) AS total_turnos,

            AVG(
                TIMESTAMPDIFF(
                    SECOND,
                    creado_en,
                    llamado_en
                )
            ) AS promedio_espera,

            AVG(
                TIMESTAMPDIFF(
                    SECOND,
                    llamado_en,
                    finalizado_en
                )
            ) AS promedio_atencion,

            AVG(
                TIMESTAMPDIFF(
                    SECOND,
                    creado_en,
                    finalizado_en
                )
            ) AS promedio_lead_time

        FROM turnos
        WHERE llamado_en IS NOT NULL
          AND finalizado_en IS NOT NULL
    `);

    return rows[0];
};

const obtenerMetricasPorDia = async () => {

    const [rows] = await db.query(`
        SELECT

            DATE(creado_en) AS fecha,

            COUNT(*) AS total_turnos,

            AVG(
                TIMESTAMPDIFF(
                    SECOND,
                    creado_en,
                    llamado_en
                )
            ) AS promedio_espera,

            AVG(
                TIMESTAMPDIFF(
                    SECOND,
                    llamado_en,
                    finalizado_en
                )
            ) AS promedio_atencion,

            AVG(
                TIMESTAMPDIFF(
                    SECOND,
                    creado_en,
                    finalizado_en
                )
            ) AS promedio_lead_time

        FROM turnos

        WHERE llamado_en IS NOT NULL
          AND finalizado_en IS NOT NULL

        GROUP BY DATE(creado_en)

        ORDER BY DATE(creado_en) ASC
    `);

    return rows;
};

module.exports = {
    getAll,
    getTurnVisor,
    getById,
    getByTipo,
    getByDia,
    create,
    assignBox,
    changeBox,
    callTurn,
    finishTurn,
    remove,
    getLastTurnosId,
    getLastTurnosPrefijo,
    obtenerMetricasPorTurno,
    obtenerMetricasGlobales,
    obtenerMetricasPorDia
};