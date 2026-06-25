const Turno = require('../models/turnoModel');

exports.getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.getAll();
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener turnos' });
    }
};

exports.getTurnosVisor = async (req, res) => {
    try {
        const turnos = await Turno.getTurnVisor();
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener turnos' });
    }
};

exports.getTurnoById = async (req, res) => {
    try {
        const turno = await Turno.getById(req.params.id);

        if (!turno) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json(turno);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener turno' });
    }
};

exports.getTurnosByDia = async (req, res) => {
    try {
        const turnos = await Turno.getByDia();

        if (!turnos) {
            return res.status(404).json({ error: 'Turnos no encontrados' });
        }

        res.json(turnos);
    } catch (error) {

        res.status(500).json({ error: 'Error al obtener turnos' });

    }
};

// cada cajero ve su TURNO/S ASIGNADOS por TIPO, BOX y CAJERO ID 
exports.getTurnoByTipo = async (req, res) => {
    try {
        const turno = await Turno.getByTipo(req.params.tipo_id, req.params.cajero_id);

        if (!turno) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json(turno);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener turno', error });
    }
};


exports.createTurno = async (req, res) => {
    try {
        const nuevo = await Turno.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear turno' });
    }
};

exports.assignBox = async (req, res) => {

    try {
        const ok = await Turno.assignBox(req.params.id, req.body);

        if (!ok) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json({ message: 'Box asignado' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al asignar box', error });
    }
};

exports.changeBox = async (req, res) => {

    try {
        const ok = await Turno.changeBox(req.params.id, req.body);

        if (!ok) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json({ message: 'Box asignado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al asignar box', error });
    }
};

exports.callTurn = async (req, res) => {
    try {
        const ok = await Turno.callTurn(req.params.id);

        if (!ok) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json({ message: 'Turno llamado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al llamar turno' });
    }
};

exports.finishTurn = async (req, res) => {
    try {
        const ok = await Turno.finishTurn(req.params.id);

        if (!ok) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json({ message: 'Turno finalizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al finalizar turno' });
    }
};

exports.deleteTurno = async (req, res) => {
    try {
        const ok = await Turno.remove(req.params.id);

        if (!ok) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json({ message: 'Turno eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar turno' });
    }
};

exports.callNextTurn = async (req, res) => {
    try {
        const { box_id, cajero_id } = req.body;

        const turno = await Turno.getNextPending();

        if (!turno) {
            return res.status(404).json({ error: "No hay turnos pendientes" });
        }

        await Turno.assignAndCall(turno.id, box_id, cajero_id);

        res.json(turno);

    } catch (error) {
        res.status(500).json({ error: "Error al llamar turno" });
    }
};

exports.getUltimosTurnosId = async (req, res) => {
  try {
    const prefijo = req.params.id; // 1, 2 o 3

    if (!prefijo) {
      return res.status(400).json({
        ok: false,
        msg: "Debes enviar un prefijo (1, 2 o 3)",
      });
    }

    const turnos = await Turno.getLastTurnosId(prefijo);

    res.json({
      ok: true,
      data: turnos,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener turnos",
    });
  }
};

exports.getUltimosTurnosPrefijo = async (req, res) => {
  try {
    const prefijo = req.params.prefijo;

    if (!prefijo) {
      return res.status(400).json({
        ok: false,
        msg: "Debes enviar un prefijo (CER, GRI, ETC)",
      });
    }

    const turnos = await Turno.getLastTurnosPrefijo(prefijo);

    res.json({
      ok: true,
      data: turnos,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al obtener turnos",
    });
  }
};


exports.getMetricasPorTurno = async (req, res) => {

    try {
        const { id } = req.params;
        const turno = await Turno.obtenerMetricasPorTurno(id);
        if (!turno) {
            return res.status(404).json({
                error: 'Turno no encontrado'
            });
        }
        res.json(turno);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Error obteniendo métricas'
        });
    }
};

exports.getMetricasGlobales = async (req, res) => {

    try {
        const metricas = await Turno.obtenerMetricasGlobales();
        res.json(metricas);

    } catch (error) {

        console.error(error);
        res.status(500).json({
            error: 'Error obteniendo métricas globales'
        });
    }
};

exports.getMetricasPorDia = async (req, res) => {

    try {
        const metricas = await Turno.obtenerMetricasPorDia();
        res.json(metricas);

    } catch (error) {

        console.error(error);
        res.status(500).json({
            error: 'Error obteniendo métricas por día'
        });
    }
};

exports.saveFactura = async (req, res) => {

    try {        

        const ok = await Turno.guardarFactura(req.params.id, req.body.nro_factura, req.body.cliente, req.body.entrega_grande);

        if (!ok) {
            return res.status(404).json({ error: 'Factura no encontrada' });
        }

        res.json({ message: 'Factura ingresada correctamente' });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error al ingresar factura" });
    }
};

