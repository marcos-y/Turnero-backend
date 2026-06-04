const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturasController');

router.get('/', facturasController.getFacturas);
router.get('/:id', facturasController.getFacturaById);
router.post('/', facturasController.createFactura);

module.exports = router;