const express = require('express');
const router = express.Router();
const controller = require('../controllers/turnoController');

/* Turnos */
router.get('/', controller.getTurnos);
router.get('/visor', controller.getTurnosVisor);
router.get('/:id', controller.getTurnoById);
router.get('/dia/todos', controller.getTurnosByDia);

router.get('/tipo/:tipo_id/:cajero_id', controller.getTurnoByTipo);

router.post('/', controller.createTurno);

router.put('/:id/asignar-box', controller.assignBox);
router.put('/:id/cambiar-box', controller.changeBox);
router.put('/:id/llamar', controller.callTurn);
router.put('/:id/finalizar', controller.finishTurn);
router.put('/:id/factura', controller.saveFactura);

router.delete('/:id', controller.deleteTurno);

/* Ultimos turnos */
router.get('/:id/ultimosId', controller.getUltimosTurnosId);
router.get('/:prefijo/ultimosPrefijo', controller.getUltimosTurnosPrefijo);

/* Metricas */
router.get('/metricas/globales',controller.getMetricasGlobales);
router.get('/:id/metricas',controller.getMetricasPorTurno);
router.get('/metricas/dias',controller.getMetricasPorDia);

module.exports = router;