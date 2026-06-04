const express = require('express');
const router = express.Router();
const controller = require('../controllers/tiposUsuariosController');

router.get('/', controller.getTipos);
router.get('/activos', controller.getTiposActivos);
router.get('/:id', controller.getTipoById);
router.post('/', controller.createTipo);
//router.put('/:id', controller.updateTipo);
//router.put('/:id/estado', controller.updateState);
//router.put('/:id/tipo', controller.updateType);
//router.delete('/:id', controller.deleteTipo);

module.exports = router;