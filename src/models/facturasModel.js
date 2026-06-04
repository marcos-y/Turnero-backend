const db = require('../config/db');

const getAll = async () => {
    const [rows] = await db.query(
        `SELECT * FROM facturas ORDER BY id ASC`
    );

    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM facturas WHERE id = ?`,
        [id]
    );

    return rows[0];
};

const create = async (params) => {

    const [result] = await db.query(`INSERT INTO facturas (vendedor_suc,vendedor_id,usrm,usrcar,updated_at,total,tipvta,tippref,tipmovivta,tipent,tipcomp,tipcli,telefono,suc,razon,provincia,pref,precfina,postal,pais,num,lugent_suc,lugent_item,localidad_id,localidad,lista,let,id,fecm,feccar,fec,estordent,estado,direccion,cuit,created_at,condvta,cliente_suc,cliente_id,cativa,canthojas,bonofer,bonbase,barrio_suc,barrio_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[params.vendedor_suc,params.vendedor_id,params.usrm,params.usrcar,params.updated_at,params.total,params.tipvta,params.tippref,params.tipmovivta,params.tipent,params.tipcomp,params.tipcli,params.telefono,params.suc,params.razon,params.provincia,params.pref,params.precfina,params.postal,params.pais,params.num,params.lugent_suc,params.lugent_item,params.localidad_id,params.localidad,params.lista,params.let,params.id,params.fecm,params.feccar,params.fec,params.estordent,params.estado,params.direccion,params.cuit,params.created_at,params.condvta,params.cliente_suc,params.cliente_id,params.cativa,params.canthojas,params.bonofer,params.bonbase,params.barrio_suc,params.barrio_id]);

};

module.exports = {
    getAll,
    getById,
    create
};