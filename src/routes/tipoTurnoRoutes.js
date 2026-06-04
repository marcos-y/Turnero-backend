const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipoTurnoController');

router.get('/', controller.getTipos);
router.get('/activos', controller.getTiposActivos);
router.get('/:id', controller.getTipoById);
router.post('/', controller.createTipo);
router.put('/:id', controller.updateTipo);
router.put('/:id/estado', controller.updateState);
router.delete('/:id', controller.deleteTipo);

module.exports = router;