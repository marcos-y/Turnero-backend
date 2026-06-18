const express = require('express');
const router = express.Router();
const cajerosController = require('../controllers/cajerosController');

router.get('/', cajerosController.getCajeros);
router.get('/:id', cajerosController.getCajeroById);
router.get('/:id/cajeroData', cajerosController.getDynamicDataCajero);
router.post('/', cajerosController.createCajero);

router.put('/:id', cajerosController.updateCajero);
router.put('/:id/password', cajerosController.updatePassword);
router.put('/:id/estado', cajerosController.updateEstado);
router.put('/:id/tipo', cajerosController.updateType);

router.delete('/:id', cajerosController.deleteCajero);
router.delete('/:id/delete', cajerosController.destroyCajero);

router.put('/:id/asignarTipoTurno', cajerosController.assignType);
router.put('/:id/removerTipoTurno', cajerosController.removeType);

module.exports = router;