const express = require('express');
const router = express.Router();
const boxesController = require('../controllers/boxesController');

router.get('/', boxesController.getBoxes);
router.get('/boxesCajero', boxesController.getBoxesCajero);
router.get('/:id', boxesController.getBoxById);
router.post('/', boxesController.createBox);
router.put('/:id', boxesController.updateBox);
//router.delete('/:id', boxesController.deleteBox);
router.put('/:id/estado', boxesController.updateEstado);

module.exports = router;